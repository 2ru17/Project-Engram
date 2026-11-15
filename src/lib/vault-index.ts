import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { COURSE_REGISTRY, getCourseInfo, type StarDomainId } from "./course-registry";
import { parseMCQSection } from "./mcq-parser";

export interface IndexedNote {
  /** Deterministic 0..N-1 index sorted by canonicalSlug.toLowerCase() */
  bitIndex: number;
  /** Lowercase canonical slug, e.g. "csopesy/process management/cpu scheduling" */
  id: string;
  /** Note display name without .md */
  name: string;
  /** Course code in uppercase, e.g. "CSOPESY" */
  courseCode: string;
  /** Relative path inside the course directory without .md */
  courseRelPath: string;
  /** Canonical slug: "<COURSE>/<courseRelPath>" */
  canonicalSlug: string;
  /** Canonical URL path: "/notes/<COURSE>/<courseRelPath>" */
  canonicalUrl: string;
  /** Legacy path relative to Main Notes without .md */
  legacyRelPath: string;
  /** Absolute disk path to the .md file */
  fullPath: string;
  /** Clean text excerpt (~200 chars) */
  excerpt: string;
  /** Word count of the note body */
  wordCount: number;
  /** Number of MCQ questions detected in the note */
  mcqCount: number;
  /** Estimated study time in minutes (reading + MCQs) */
  estimatedMinutes: number;
  /** Whether this is a utility file ([EX], [PS], [QZ], [REV], [HO], [ANS], [SP]) */
  isUtility: boolean;
  /** Outgoing wikilink target names (original case) */
  wikilinks: string[];
  /** Lowercase tag/hub names referenced by #[[Tag]] or tags frontmatter */
  tags: string[];
  /** Previous topic wikilink from References & Navigation, if any */
  prevTopic?: string;
  /** Next topic wikilink from References & Navigation, if any */
  nextTopic?: string;
}

export interface IndexedCourseDir {
  courseCode: string;
  diskPath: string;
  legacyRelPrefix: string;
}

export interface DirectoryTreeNode {
  name: string;
  path: string;
  courseTitle?: string;
  domain?: StarDomainId;
  domainLabel?: string;
  track?: string;
  count?: number;
  children?: {
    folders: DirectoryTreeNode[];
    files: { name: string; path: string }[];
  };
}

export interface VaultIndex {
  baseContentDir: string;
  courses: Map<string, IndexedCourseDir>;
  notes: IndexedNote[];
  noteByCanonicalId: Map<string, IndexedNote>;
  noteByLegacyId: Map<string, IndexedNote>;
  noteByName: Map<string, IndexedNote>;
  builtAt: number;
}

const YEAR_FOLDER_REGEX = /^(1st|2nd|3rd|4th)\s+Year$/i;
const TERM_FOLDER_REGEX = /^Term\s+\d+$/i;
const UTILITY_PREFIX_REGEX = /^\[(EX|PS|HO|REV|QZ|ANS|SP)\]/i;

type ParsedNoteMetadata = Pick<
  IndexedNote,
  | "excerpt"
  | "wordCount"
  | "mcqCount"
  | "estimatedMinutes"
  | "isUtility"
  | "wikilinks"
  | "tags"
  | "prevTopic"
  | "nextTopic"
>;

interface CachedFileEntry {
  mtimeMs: number;
  size: number;
  contentHash: string;
  meta: ParsedNoteMetadata;
}

const globalForCache = globalThis as typeof globalThis & {
  __engramFileParseCache?: Map<string, CachedFileEntry>;
};

const fileParseCache: Map<string, CachedFileEntry> =
  globalForCache.__engramFileParseCache ??
  (globalForCache.__engramFileParseCache = new Map<string, CachedFileEntry>());

let cachedVaultIndex: VaultIndex | null = null;
let inflightIndexPromise: Promise<VaultIndex> | null = null;

async function mapConcurrent<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  if (items.length === 0) return [];
  const results = new Array<R>(items.length);
  let cursor = 0;
  const workerCount = Math.min(Math.max(1, concurrency), items.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (true) {
        const idx = cursor++;
        if (idx >= items.length) break;
        results[idx] = await worker(items[idx]);
      }
    })
  );
  return results;
}

export function isLegacyYearSegment(segment: string): boolean {
  return YEAR_FOLDER_REGEX.test(segment.trim());
}

function isWithinDir(targetPath: string, baseDir: string): boolean {
  const normalizedBase = path.resolve(baseDir) + path.sep;
  const normalizedTarget = path.resolve(targetPath);
  return (
    normalizedTarget.startsWith(normalizedBase) ||
    normalizedTarget === path.resolve(baseDir)
  );
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(/*turbopackIgnore: true*/ p);
    return true;
  } catch {
    return false;
  }
}

async function discoverCourseDirs(baseContentDir: string): Promise<IndexedCourseDir[]> {
  const discovered: IndexedCourseDir[] = [];
  if (!(await pathExists(baseContentDir))) return discovered;

  const topEntries = await fs.readdir(/*turbopackIgnore: true*/ baseContentDir, {
    withFileTypes: true,
  });

  for (const entry of topEntries) {
    if (entry.name.startsWith(".") || !entry.isDirectory()) continue;
    const topPath = path.join(baseContentDir, entry.name);

    if (YEAR_FOLDER_REGEX.test(entry.name)) {
      // Descend into Year -> Term -> Course
      const yearSubEntries = await fs.readdir(/*turbopackIgnore: true*/ topPath, {
        withFileTypes: true,
      });
      for (const sub of yearSubEntries) {
        if (sub.name.startsWith(".") || !sub.isDirectory()) continue;
        const subPath = path.join(topPath, sub.name);

        if (TERM_FOLDER_REGEX.test(sub.name)) {
          const courseEntries = await fs.readdir(/*turbopackIgnore: true*/ subPath, {
            withFileTypes: true,
          });
          for (const courseEntry of courseEntries) {
            if (courseEntry.name.startsWith(".") || !courseEntry.isDirectory()) continue;
            const courseDiskPath = path.join(subPath, courseEntry.name);
            const legacyRelPrefix = `${entry.name}/${sub.name}/${courseEntry.name}`;
            discovered.push({
              courseCode: courseEntry.name.toUpperCase(),
              diskPath: courseDiskPath,
              legacyRelPrefix,
            });
          }
        } else {
          // Course placed directly under Year folder
          const legacyRelPrefix = `${entry.name}/${sub.name}`;
          discovered.push({
            courseCode: sub.name.toUpperCase(),
            diskPath: subPath,
            legacyRelPrefix,
          });
        }
      }
    } else {
      // Course placed directly at top-level of Main Notes (e.g. future ST courses)
      discovered.push({
        courseCode: entry.name.toUpperCase(),
        diskPath: topPath,
        legacyRelPrefix: entry.name,
      });
    }
  }

  return discovered;
}

function parseNoteMetadata(
  rawContent: string,
  fileName: string,
  canonicalSlug?: string
): ParsedNoteMetadata {
  // Strip YAML frontmatter
  const withoutFrontmatter = rawContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

  // Extract tags from #[[Tag]]
  const tags: string[] = [];
  const tagMatches = [...rawContent.matchAll(/#\[\[([^\[\]]+)\]\]/g)];
  for (const m of tagMatches) {
    const t = m[1].split("|")[0].trim().toLowerCase();
    if (t && !tags.includes(t)) tags.push(t);
  }

  // Extract wikilinks [[Target|Alias]]
  const wikilinks: string[] = [];
  const wikiMatches = [...withoutFrontmatter.matchAll(/\[\[([^\[\]]+)\]\]/g)];
  for (const m of wikiMatches) {
    const rawTarget = m[1].split("|")[0].split("#")[0].trim();
    if (rawTarget && !wikilinks.includes(rawTarget)) {
      wikilinks.push(rawTarget);
    }
  }

  // Extract Previous / Next Topic from References & Navigation
  let prevTopic: string | undefined;
  let nextTopic: string | undefined;
  const prevMatch = withoutFrontmatter.match(
    /(?:Previous(?:\s+Topic|\s+Note)?|Prev)\s*:\s*\[\[([^\[\]|#]+)(?:[|#][^\[\]]*)?\]\]/i
  );
  if (prevMatch) prevTopic = prevMatch[1].trim();

  const nextMatch = withoutFrontmatter.match(
    /(?:Next(?:\s+Topic|\s+Note)?)\s*:\s*\[\[([^\[\]|#]+)(?:[|#][^\[\]]*)?\]\]/i
  );
  if (nextMatch) nextTopic = nextMatch[1].trim();

  // Extract assessments via unified Canvas-style parser
  const { articleContent, mcqItems } = parseMCQSection(withoutFrontmatter, canonicalSlug);
  const mcqCount = mcqItems.length;

  // Clean body for excerpt and word count
  const cleanBody = articleContent
    .replace(/> \[!info\] Document Metadata[\s\S]*?(?=\n\n[^>]|$)/i, "")
    .replace(/\u{1F3F7}\uFE0F\s*Tags:.*?\n/giu, "")
    .replace(/\*\*\u{1F3F7}\uFE0F\s*Tags:\*\*.*?\n/giu, "")
    .replace(/\*\*Tags:\*\*.*?\n/gi, "")
    .replace(/[#*`_\[\]>]/g, "")
    .trim();

  const words = cleanBody ? cleanBody.split(/\s+/).length : 0;
  const readingMins = Math.max(2, Math.ceil(words / 200));
  const mcqMins = Math.ceil(mcqCount * 1.2);
  const estimatedMinutes = readingMins + mcqMins;

  const flatExcerpt = cleanBody.replace(/\s+/g, " ").trim();
  const excerpt =
    flatExcerpt.slice(0, 200) + (flatExcerpt.length > 200 ? "..." : "");

  const isUtility =
    UTILITY_PREFIX_REGEX.test(fileName) ||
    /mock|answer|reviewer/i.test(fileName);

  return {
    excerpt,
    wordCount: words,
    mcqCount,
    estimatedMinutes,
    isUtility,
    wikilinks,
    tags,
    prevTopic,
    nextTopic,
  };
}

interface DiscoveredNoteFile {
  courseDir: IndexedCourseDir;
  fullPath: string;
  name: string;
  courseRelPath: string;
  canonicalSlug: string;
  legacyRelPath: string;
}

async function readCachedNoteMetadata(
  item: DiscoveredNoteFile
): Promise<Omit<IndexedNote, "bitIndex"> | null> {
  try {
    const stat = await fs.stat(/*turbopackIgnore: true*/ item.fullPath);
    const cached = fileParseCache.get(item.fullPath);

    let meta: ParsedNoteMetadata;
    if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
      meta = cached.meta;
    } else {
      const rawContent = await fs.readFile(
        /*turbopackIgnore: true*/ item.fullPath,
        "utf-8"
      );
      const contentHash = createHash("sha256").update(rawContent).digest("hex");

      if (cached && cached.contentHash === contentHash) {
        meta = cached.meta;
        fileParseCache.set(item.fullPath, {
          mtimeMs: stat.mtimeMs,
          size: stat.size,
          contentHash,
          meta,
        });
      } else {
        meta = parseNoteMetadata(rawContent, item.name, item.canonicalSlug);
        fileParseCache.set(item.fullPath, {
          mtimeMs: stat.mtimeMs,
          size: stat.size,
          contentHash,
          meta,
        });
      }
    }

    return {
      id: item.canonicalSlug.toLowerCase(),
      name: item.name,
      courseCode: item.courseDir.courseCode,
      courseRelPath: item.courseRelPath,
      canonicalSlug: item.canonicalSlug,
      canonicalUrl: `/notes/${item.canonicalSlug}`,
      legacyRelPath: item.legacyRelPath,
      fullPath: item.fullPath,
      ...meta,
    };
  } catch (err) {
    console.warn(`[VAULT_INDEX_WARN]: Failed to index ${item.canonicalSlug}:`, err);
    return null;
  }
}

async function buildVaultIndexInternal(): Promise<VaultIndex> {
  const baseContentDir = path.join(process.cwd(), "content", "Main Notes");
  const courses = new Map<string, IndexedCourseDir>();
  const discoveredFiles: DiscoveredNoteFile[] = [];

  const discoveredCourses = await discoverCourseDirs(baseContentDir);
  for (const c of discoveredCourses) {
    courses.set(c.courseCode, c);
  }

  await mapConcurrent(discoveredCourses, 8, async (courseDir) => {
    async function collectCourseFiles(currentDir: string): Promise<void> {
      let entries;
      try {
        entries = await fs.readdir(/*turbopackIgnore: true*/ currentDir, {
          withFileTypes: true,
        });
      } catch (err) {
        console.warn(`[VAULT_INDEX_WARN]: Unable to read dir ${currentDir}:`, err);
        return;
      }

      const subDirs: string[] = [];
      for (const entry of entries) {
        if (entry.name.startsWith(".")) continue;
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          subDirs.push(fullPath);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
          const name = entry.name.replace(/\.md$/i, "");
          if (
            name.includes("_chunk_") ||
            name.toLowerCase().includes("artifact")
          ) {
            continue;
          }

          const courseRelPath = path
            .relative(courseDir.diskPath, fullPath)
            .replace(/\.md$/i, "")
            .replace(/\\/g, "/");
          const canonicalSlug = `${courseDir.courseCode}/${courseRelPath}`;
          const legacyRelPath = `${courseDir.legacyRelPrefix}/${courseRelPath}`;

          discoveredFiles.push({
            courseDir,
            fullPath,
            name,
            courseRelPath,
            canonicalSlug,
            legacyRelPath,
          });
        }
      }

      if (subDirs.length > 0) {
        await Promise.all(subDirs.map((d) => collectCourseFiles(d)));
      }
    }

    await collectCourseFiles(courseDir.diskPath);
  });

  const parsedResults = await mapConcurrent(discoveredFiles, 16, readCachedNoteMetadata);
  const rawNotes = parsedResults.filter(
    (n): n is Omit<IndexedNote, "bitIndex"> => n !== null
  );

  // Deterministic ordering by canonicalSlug.toLowerCase() for bitmask stability
  rawNotes.sort((a, b) => a.id.localeCompare(b.id));

  const notes: IndexedNote[] = rawNotes.map((n, idx) => ({
    ...n,
    bitIndex: idx,
  }));

  const noteByCanonicalId = new Map<string, IndexedNote>();
  const noteByLegacyId = new Map<string, IndexedNote>();
  const noteByName = new Map<string, IndexedNote>();

  for (const note of notes) {
    noteByCanonicalId.set(note.id, note);
    noteByLegacyId.set(note.legacyRelPath.toLowerCase(), note);
    // Prefer standard lecture notes over utility files if names collide
    const lowerName = note.name.toLowerCase();
    if (!noteByName.has(lowerName) || !note.isUtility) {
      noteByName.set(lowerName, note);
    }
  }

  return {
    baseContentDir,
    courses,
    notes,
    noteByCanonicalId,
    noteByLegacyId,
    noteByName,
    builtAt: Date.now(),
  };
}

export async function getVaultIndex(): Promise<VaultIndex> {
  if (cachedVaultIndex) return cachedVaultIndex;
  if (!inflightIndexPromise) {
    inflightIndexPromise = buildVaultIndexInternal()
      .then((idx) => {
        cachedVaultIndex = idx;
        inflightIndexPromise = null;
        return idx;
      })
      .catch((err) => {
        inflightIndexPromise = null;
        throw err;
      });
  }
  return inflightIndexPromise;
}

export async function buildCourseDirectoryTree(): Promise<{
  folders: DirectoryTreeNode[];
  files: { name: string; path: string }[];
}> {
  const index = await getVaultIndex();

  async function buildSubtree(
    dirDiskPath: string,
    canonicalPrefix: string
  ): Promise<{
    folders: DirectoryTreeNode[];
    files: { name: string; path: string }[];
  }> {
    let entries;
    try {
      entries = await fs.readdir(/*turbopackIgnore: true*/ dirDiskPath, {
        withFileTypes: true,
      });
    } catch {
      return { folders: [], files: [] };
    }

    const dirTasks: Promise<DirectoryTreeNode | null>[] = [];
    const files: { name: string; path: string }[] = [];

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(dirDiskPath, entry.name);
      const nextCanonical = `${canonicalPrefix}/${entry.name}`;

      if (entry.isDirectory()) {
        dirTasks.push(
          buildSubtree(fullPath, nextCanonical).then((children) =>
            children.folders.length > 0 || children.files.length > 0
              ? {
                  name: entry.name,
                  path: `/notes/${nextCanonical}`,
                  children,
                }
              : null
          )
        );
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        const cleanName = entry.name.replace(/\.md$/i, "");
        if (
          cleanName.includes("_chunk_") ||
          cleanName.toLowerCase().includes("artifact")
        ) {
          continue;
        }
        files.push({
          name: cleanName,
          path: `/notes/${canonicalPrefix}/${cleanName}`,
        });
      }
    }

    const folderResults = await Promise.all(dirTasks);
    const folders = folderResults.filter(
      (f): f is DirectoryTreeNode => f !== null
    );

    folders.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    return { folders, files };
  }

  // Order top-level Course Stars by COURSE_REGISTRY order, then any newly added vault courses
  const registryOrder = new Map<string, number>(
    COURSE_REGISTRY.map((c, idx) => [c.code.toUpperCase(), idx])
  );

  const sortedCourses = [...index.courses.values()].sort((a, b) => {
    const orderA = registryOrder.get(a.courseCode) ?? 999;
    const orderB = registryOrder.get(b.courseCode) ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.courseCode.localeCompare(b.courseCode);
  });

  const subtrees = await mapConcurrent(sortedCourses, 8, async (courseDir) => ({
    courseDir,
    children: await buildSubtree(courseDir.diskPath, courseDir.courseCode),
  }));

  const topFolders: DirectoryTreeNode[] = [];
  for (const { courseDir, children } of subtrees) {
    if (children.folders.length === 0 && children.files.length === 0) continue;

    const info = getCourseInfo(courseDir.courseCode);
    topFolders.push({
      name: courseDir.courseCode,
      path: `/notes/${courseDir.courseCode}`,
      courseTitle: info?.name || courseDir.courseCode,
      domain: info?.category || "systems",
      domainLabel: info?.categoryLabel || "Computer Science",
      track: info?.track || "General",
      count: info?.count,
      children,
    });
  }

  return { folders: topFolders, files: [] };
}

export type ResolvedSlugResult =
  | {
      kind: "redirect";
      redirectUrl: string;
    }
  | {
      kind: "directory";
      courseCode: string;
      title: string;
      canonicalSlugArray: string[];
      items: { name: string; path: string; isDir: boolean }[];
    }
  | {
      kind: "note";
      courseCode: string;
      title: string;
      fullPath: string;
      canonicalSlugArray: string[];
      note?: IndexedNote;
    }
  | {
      kind: "virtual";
      title: string;
      canonicalSlugArray: string[];
      backlinks: { name: string; path: string; courseCode: string }[];
    };

export async function resolveVaultSlug(
  slugArray: string[]
): Promise<ResolvedSlugResult> {
  const index = await getVaultIndex();

  // 1. Detect Legacy 4-Year URLs: /notes/1st Year/Term 1/CCPROG1/... -> /notes/CCPROG1/...
  if (slugArray.length > 0 && isLegacyYearSegment(slugArray[0])) {
    if (slugArray.length >= 3 && TERM_FOLDER_REGEX.test(slugArray[1].trim())) {
      const stripped = slugArray.slice(2);
      return {
        kind: "redirect",
        redirectUrl: `/notes/${stripped.map(encodeURIComponent).join("/")}`,
      };
    }
    if (slugArray.length >= 2 && !TERM_FOLDER_REGEX.test(slugArray[1].trim())) {
      const stripped = slugArray.slice(1);
      return {
        kind: "redirect",
        redirectUrl: `/notes/${stripped.map(encodeURIComponent).join("/")}`,
      };
    }
    return {
      kind: "redirect",
      redirectUrl: "/notes?view=directory",
    };
  }

  // 2. Canonical Course-Rooted Path: /notes/<COURSE>/...
  const candidateCourse = slugArray[0]?.toUpperCase();
  const courseDir = candidateCourse ? index.courses.get(candidateCourse) : undefined;

  if (courseDir) {
    const subSegments = slugArray.slice(1);
    const targetDiskPath = path.join(courseDir.diskPath, ...subSegments);

    if (!isWithinDir(targetDiskPath, courseDir.diskPath)) {
      return {
        kind: "virtual",
        title: slugArray[slugArray.length - 1] || courseDir.courseCode,
        canonicalSlugArray: slugArray,
        backlinks: [],
      };
    }

    // Check if directory
    if (await pathExists(targetDiskPath)) {
      const stat = await fs.stat(/*turbopackIgnore: true*/ targetDiskPath);
      if (stat.isDirectory()) {
        const rawItems = await fs.readdir(
          /*turbopackIgnore: true*/ targetDiskPath,
          { withFileTypes: true }
        );
        const canonicalSlugArray = [courseDir.courseCode, ...subSegments];
        const items: { name: string; path: string; isDir: boolean }[] = [];

        for (const entry of rawItems) {
          if (entry.name.startsWith(".")) continue;
          const isDir = entry.isDirectory();
          const cleanName = isDir ? entry.name : entry.name.replace(/\.md$/i, "");
          if (!isDir && !entry.name.toLowerCase().endsWith(".md")) continue;
          if (
            cleanName.includes("_chunk_") ||
            cleanName.toLowerCase().includes("artifact")
          ) {
            continue;
          }
          items.push({
            name: cleanName,
            path: `/notes/${[...canonicalSlugArray, cleanName].join("/")}`,
            isDir,
          });
        }

        items.sort((a, b) => {
          if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
          return a.name.localeCompare(b.name, undefined, { numeric: true });
        });

        const title =
          subSegments.length === 0
            ? `${courseDir.courseCode}: ${
                getCourseInfo(courseDir.courseCode)?.name || courseDir.courseCode
              }`
            : subSegments[subSegments.length - 1];

        return {
          kind: "directory",
          courseCode: courseDir.courseCode,
          title,
          canonicalSlugArray,
          items,
        };
      }

      if (stat.isFile() && targetDiskPath.toLowerCase().endsWith(".md")) {
        const canonicalSlugArray = [
          courseDir.courseCode,
          ...subSegments.map((s, i) =>
            i === subSegments.length - 1 ? s.replace(/\.md$/i, "") : s
          ),
        ];
        const canonicalId = canonicalSlugArray.join("/").toLowerCase();
        return {
          kind: "note",
          courseCode: courseDir.courseCode,
          title: path.basename(targetDiskPath, ".md"),
          fullPath: targetDiskPath,
          canonicalSlugArray,
          note: index.noteByCanonicalId.get(canonicalId),
        };
      }
    }

    // Check if targetDiskPath + ".md" exists
    const mdCandidate = `${targetDiskPath}.md`;
    if (await pathExists(mdCandidate)) {
      const canonicalSlugArray = [courseDir.courseCode, ...subSegments];
      const canonicalId = canonicalSlugArray.join("/").toLowerCase();
      return {
        kind: "note",
        courseCode: courseDir.courseCode,
        title: path.basename(mdCandidate, ".md"),
        fullPath: mdCandidate,
        canonicalSlugArray,
        note: index.noteByCanonicalId.get(canonicalId),
      };
    }
  }

  // 3. Fallback: Resolve by Note Name (e.g. wikilink /notes/CPU%20Scheduling)
  const leafName = slugArray[slugArray.length - 1] || "";
  const matchedNote = index.noteByName.get(leafName.toLowerCase());
  if (matchedNote) {
    return {
      kind: "note",
      courseCode: matchedNote.courseCode,
      title: matchedNote.name,
      fullPath: matchedNote.fullPath,
      canonicalSlugArray: matchedNote.canonicalSlug.split("/"),
      note: matchedNote,
    };
  }

  // 4. Virtual Concept / Constellation Hub with Backlinks
  const lowerHub = leafName.toLowerCase();
  const backlinks: { name: string; path: string; courseCode: string }[] = [];

  for (const note of index.notes) {
    const linksToHub =
      note.courseCode.toLowerCase() === lowerHub ||
      note.tags.includes(lowerHub) ||
      note.wikilinks.some((w) => w.toLowerCase() === lowerHub) ||
      (lowerHub === "computer science" && true);

    if (linksToHub) {
      backlinks.push({
        name: note.name,
        path: note.canonicalUrl,
        courseCode: note.courseCode,
      });
    }
  }

  return {
    kind: "virtual",
    title: leafName,
    canonicalSlugArray: slugArray,
    backlinks,
  };
}
