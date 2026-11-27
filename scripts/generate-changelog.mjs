#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_MAIN_DIR = path.join(PROJECT_ROOT, "content", "Main Notes");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "src", "data", "changelog.generated.json");

const REPO_OWNER = "2ru17";
const REPO_NAME = "Project-Engram";
const COMMIT_URL_BASE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/commit`;
const GITHUB_API_COMMITS_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=25`;

const FULL_GIT_MIN_COMMITS = 6; // git rev-list --count HEAD > 5
const GIT_COMMIT_LIMIT = 30;
const MAX_STORED_NOTES_PER_BUCKET = 50;
const MAX_GITHUB_DETAIL_REQUESTS = process.env.GITHUB_TOKEN ? 20 : 12;
const GITHUB_DETAIL_CONCURRENCY = 4;
const API_TIMEOUT_MS = 10000;

const YEAR_FOLDER_REGEX = /^(1st|2nd|3rd|4th)\s+Year$/i;
const TERM_FOLDER_REGEX = /^Term\s+\d+$/i;
const CONVENTIONAL_PREFIX_REGEX =
  /^(?:feat|fix|docs|content|chore|refactor|perf|style|test|build|ci|security|add|revert)(?:\(([^)]+)\))?(!)?:\s*(.+)$/i;
const MERGE_SUBJECT_REGEX =
  /^(?:merge\s+(?:pull request|branch|remote-tracking branch|tag)\b|merge:)/i;
const BOT_NAME_REGEX =
  /(?:\[bot\]$|^(?:dependabot|renovate|github-actions|vercel|codecov|semantic-release)(?:\[bot\])?$)/i;
const DETAIL_WORTHY_SUBJECT_REGEX =
  /^(?:content|feat|add|docs|fix|refactor)\b|\b(?:notes?|monographs?|quizzes?|arcana|problem|reviewer|simulators?|workbenc(?:h|hes)|diagrams?|registry|pipeline|errata)\b|\b(?:CC|CS|NS|LB|ST|TH|PR)[A-Z0-9]{3,5}\b/i;

function normalizeSlash(p) {
  return String(p || "").replace(/\\/g, "/").replace(/^\.\//, "");
}

function unquoteGitPath(rawPath) {
  const trimmed = String(rawPath || "").trim();
  if (!trimmed.startsWith('"') || !trimmed.endsWith('"')) {
    return normalizeSlash(trimmed);
  }
  const inner = trimmed.slice(1, -1);
  // Decode standard C-style git escapes if core.quotePath was ever active
  const bytes = [];
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === "\\" && i + 1 < inner.length) {
      const next = inner[i + 1];
      if (/[0-7]{3}/.test(inner.slice(i + 1, i + 4))) {
        bytes.push(parseInt(inner.slice(i + 1, i + 4), 8));
        i += 3;
        continue;
      }
      const escapeMap = { n: 10, r: 13, t: 9, b: 8, f: 12, "\\": 92, '"': 34 };
      if (next in escapeMap) {
        bytes.push(escapeMap[next]);
        i += 1;
        continue;
      }
    }
    const chunk = Buffer.from(inner[i], "utf8");
    for (const b of chunk) bytes.push(b);
  }
  return normalizeSlash(Buffer.from(bytes).toString("utf8"));
}

function isContentMarkdownPath(filePath) {
  const norm = normalizeSlash(filePath);
  return norm.startsWith("content/Main Notes/") && norm.toLowerCase().endsWith(".md");
}

function isSimulatorPath(filePath) {
  return normalizeSlash(filePath).startsWith("src/components/simulators/");
}

function parseContentNotePath(filePath) {
  const norm = normalizeSlash(filePath);
  if (!isContentMarkdownPath(norm)) return null;

  const afterMain = norm.slice("content/Main Notes/".length);
  const segments = afterMain.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  let course = "";
  let relInsideCourse = [];

  if (
    segments.length >= 4 &&
    YEAR_FOLDER_REGEX.test(segments[0]) &&
    TERM_FOLDER_REGEX.test(segments[1])
  ) {
    course = segments[2].toUpperCase();
    relInsideCourse = segments.slice(3);
  } else if (
    segments.length >= 3 &&
    YEAR_FOLDER_REGEX.test(segments[0]) &&
    !TERM_FOLDER_REGEX.test(segments[1])
  ) {
    course = segments[1].toUpperCase();
    relInsideCourse = segments.slice(2);
  } else {
    course = segments[0].toUpperCase();
    relInsideCourse = segments.slice(1);
  }

  if (!course || relInsideCourse.length === 0) return null;

  const lastSeg = relInsideCourse[relInsideCourse.length - 1];
  const title = lastSeg.replace(/\.md$/i, "");
  if (
    !title ||
    title.includes("_chunk_") ||
    title.toLowerCase().includes("artifact")
  ) {
    return null;
  }

  const slugParts = [course, ...relInsideCourse.slice(0, -1), title];
  const href = `/notes/${slugParts.map((s) => encodeURIComponent(s)).join("/")}`;

  return {
    course,
    title,
    href,
    relPath: norm,
  };
}

function normalizeLegacyModuleSpacing(relPath) {
  return relPath
    .split("/")
    .map((segment) =>
      segment.replace(
        /^((?:Module|Ch|Chapter)\s+\d+)-\s*/i,
        "$1 - "
      )
    )
    .join("/");
}

async function loadVaultDiskLookup() {
  const byExactRelPath = new Map();
  const byLowerRelPath = new Map();
  const byCourseAndTitle = new Map();

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    const subDirs = [];
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        subDirs.push(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        const relToProject = normalizeSlash(path.relative(PROJECT_ROOT, fullPath));
        const parsed = parseContentNotePath(relToProject);
        if (!parsed) continue;

        byExactRelPath.set(parsed.relPath, parsed);
        byLowerRelPath.set(parsed.relPath.toLowerCase(), parsed);

        const isUtility = /^\[(EX|PS|HO|REV|QZ|ANS|SP)\]/i.test(parsed.title);
        const key = `${parsed.course}::${parsed.title.toLowerCase()}`;
        const existing = byCourseAndTitle.get(key);
        if (!existing || (!isUtility && /^\[(EX|PS|HO|REV|QZ|ANS|SP)\]/i.test(existing.title))) {
          byCourseAndTitle.set(key, parsed);
        }
      }
    }

    if (subDirs.length > 0) {
      await Promise.all(subDirs.map((sub) => walk(sub)));
    }
  }

  await walk(CONTENT_MAIN_DIR);

  const hasDiskNotes = byExactRelPath.size > 0;

  function resolveHref(parsed) {
    if (!hasDiskNotes) {
      return parsed.href;
    }

    const exact = byExactRelPath.get(parsed.relPath) ?? byLowerRelPath.get(parsed.relPath.toLowerCase());
    if (exact) return exact.href;

    const spacedPath = normalizeLegacyModuleSpacing(parsed.relPath);
    const spacedMatch = byLowerRelPath.get(spacedPath.toLowerCase());
    if (spacedMatch) return spacedMatch.href;

    const byTitle = byCourseAndTitle.get(`${parsed.course}::${parsed.title.toLowerCase()}`);
    if (byTitle) return byTitle.href;

    const strippedTitle = parsed.title
      .replace(/^\[HO\]\s+/i, "")
      .replace(new RegExp(`^${parsed.course}\\s+\\d+\\s*-\\s*`, "i"), "")
      .trim();
    if (strippedTitle && strippedTitle !== parsed.title) {
      const strippedMatch = byCourseAndTitle.get(
        `${parsed.course}::${strippedTitle.toLowerCase()}`
      );
      if (strippedMatch) return strippedMatch.href;
    }

    return undefined;
  }

  return { hasDiskNotes, resolveHref };
}

function cleanCommitTitle(rawSubject) {
  const trimmed = String(rawSubject || "").trim();
  if (!trimmed) return "Repository update";

  const match = trimmed.match(CONVENTIONAL_PREFIX_REGEX);
  const body = match ? match[3].trim() : trimmed;
  if (!body) return trimmed;
  return body.charAt(0).toUpperCase() + body.slice(1);
}

function isMergeCommit({ parents, subject }) {
  if (Array.isArray(parents) && parents.length > 1) return true;
  return MERGE_SUBJECT_REGEX.test(String(subject || "").trim());
}

function isBotCommit({ authorName, authorLogin, authorType }) {
  if (authorType === "Bot") return true;
  if (authorName && BOT_NAME_REGEX.test(authorName.trim())) return true;
  if (authorLogin && BOT_NAME_REGEX.test(authorLogin.trim())) return true;
  return false;
}

function classifyCommit(files, rawSubject, hasFileData) {
  if (files.some((f) => isContentMarkdownPath(f.path) || (f.previousPath && isContentMarkdownPath(f.previousPath)))) {
    return "notes";
  }
  if (files.some((f) => isSimulatorPath(f.path) || (f.previousPath && isSimulatorPath(f.previousPath)))) {
    return "simulators";
  }
  if (!hasFileData) {
    const subj = String(rawSubject || "");
    if (/^(?:content)\b|\b(?:notes?|monographs?|quizzes?|arcana|study guide|errata)\b/i.test(subj)) {
      return "notes";
    }
    if (/\b(?:simulators?|workbenc(?:h|hes)|circuit scenes?)\b/i.test(subj)) {
      return "simulators";
    }
  }
  return "platform";
}

function buildCommitEntry(commit, diskLookup) {
  const coursesSet = new Set();
  const addedMap = new Map();
  const updatedMap = new Map();
  const removedMap = new Map();

  for (const file of commit.files) {
    const status = file.status;
    if (status === "R" || status === "C") {
      const targetParsed = parseContentNotePath(file.path);
      if (targetParsed) {
        coursesSet.add(targetParsed.course);
        const href = diskLookup.resolveHref(targetParsed);
        updatedMap.set(targetParsed.relPath, {
          title: targetParsed.title,
          course: targetParsed.course,
          ...(href ? { href } : {}),
        });
      } else if (status === "R" && file.previousPath) {
        const prevParsed = parseContentNotePath(file.previousPath);
        if (prevParsed) {
          coursesSet.add(prevParsed.course);
          removedMap.set(prevParsed.relPath, {
            title: prevParsed.title,
            course: prevParsed.course,
          });
        }
      }
      continue;
    }

    const parsed = parseContentNotePath(file.path);
    if (!parsed) continue;

    coursesSet.add(parsed.course);
    const key = parsed.relPath;

    if (status === "A") {
      const href = diskLookup.resolveHref(parsed);
      addedMap.set(key, {
        title: parsed.title,
        course: parsed.course,
        ...(href ? { href } : {}),
      });
    } else if (status === "D") {
      removedMap.set(key, {
        title: parsed.title,
        course: parsed.course,
      });
    } else {
      const href = diskLookup.resolveHref(parsed);
      updatedMap.set(key, {
        title: parsed.title,
        course: parsed.course,
        ...(href ? { href } : {}),
      });
    }
  }

  // Ensure a note isn't listed in multiple buckets if status changed within a commit
  for (const key of addedMap.keys()) {
    updatedMap.delete(key);
    removedMap.delete(key);
  }
  for (const key of updatedMap.keys()) {
    removedMap.delete(key);
  }

  const sortNotes = (a, b) =>
    a.course.localeCompare(b.course) ||
    a.title.localeCompare(b.title, undefined, { numeric: true });

  const addedAll = Array.from(addedMap.values()).sort(sortNotes);
  const updatedAll = Array.from(updatedMap.values()).sort(sortNotes);
  const removedAll = Array.from(removedMap.values()).sort(sortNotes);

  const category = classifyCommit(commit.files, commit.subject, commit.hasFileData);

  return {
    sha: commit.sha,
    shortSha: commit.shortSha,
    date: commit.date,
    title: cleanCommitTitle(commit.subject),
    commitUrl: `${COMMIT_URL_BASE}/${commit.sha}`,
    category,
    courses: Array.from(coursesSet).sort(),
    notes: {
      added: addedAll.slice(0, MAX_STORED_NOTES_PER_BUCKET),
      updated: updatedAll.slice(0, MAX_STORED_NOTES_PER_BUCKET),
      removed: removedAll.slice(0, MAX_STORED_NOTES_PER_BUCKET),
    },
    noteCounts: {
      added: addedAll.length,
      updated: updatedAll.length,
      removed: removedAll.length,
    },
  };
}

async function getGitCommitCount() {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["rev-list", "--count", "HEAD"],
      { cwd: PROJECT_ROOT, timeout: 5000 }
    );
    const parsed = Number.parseInt(stdout.trim(), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

async function fetchFullGitCommits() {
  const { stdout } = await execFileAsync(
    "git",
    [
      "-c",
      "core.quotePath=false",
      "log",
      "-n",
      String(GIT_COMMIT_LIMIT),
      "--no-merges",
      "--name-status",
      "--date=iso-strict",
      "--pretty=format:===COMMIT===%n%H|%h|%aI|%P|%an|%s",
    ],
    { cwd: PROJECT_ROOT, maxBuffer: 32 * 1024 * 1024, timeout: 15000 }
  );

  const commits = [];
  const rawBlocks = stdout.split("===COMMIT===").slice(1);

  for (const block of rawBlocks) {
    const lines = block
      .split(/\r?\n/)
      .map((l) => l.trimEnd())
      .filter((l) => l.length > 0);
    if (lines.length === 0) continue;

    const headerParts = lines[0].split("|");
    if (headerParts.length < 6) continue;

    const [sha, shortSha, date, parentsRaw, authorName, ...subjectParts] = headerParts;
    const subject = subjectParts.join("|").trim();
    const parents = parentsRaw.trim().split(/\s+/).filter(Boolean);

    if (
      isMergeCommit({ parents, subject }) ||
      isBotCommit({ authorName })
    ) {
      continue;
    }

    const files = [];
    for (const fileLine of lines.slice(1)) {
      const cols = fileLine.split("\t");
      if (cols.length < 2) continue;
      const statusChar = cols[0].trim().charAt(0).toUpperCase();
      if ((statusChar === "R" || statusChar === "C") && cols.length >= 3) {
        files.push({
          status: statusChar,
          previousPath: unquoteGitPath(cols[1]),
          path: unquoteGitPath(cols[2]),
        });
      } else {
        files.push({
          status: statusChar || "M",
          path: unquoteGitPath(cols[1]),
        });
      }
    }

    commits.push({
      sha: sha.trim(),
      shortSha: shortSha.trim(),
      date: date.trim(),
      subject,
      files,
      hasFileData: true,
    });
  }

  return commits;
}

function buildGitHubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Project-Engram-Changelog-Generator",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchJsonWithTimeout(url, headers) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) {
      const error = new Error(`GitHub API HTTP ${res.status}`);
      error.status = res.status;
      throw error;
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function mapGitHubFileStatus(status) {
  switch (status) {
    case "added":
    case "copied":
      return "A";
    case "removed":
      return "D";
    case "renamed":
      return "R";
    default:
      return "M";
  }
}

async function fetchGitHubShallowCommits() {
  const headers = buildGitHubHeaders();
  const rawList = await fetchJsonWithTimeout(GITHUB_API_COMMITS_URL, headers);
  if (!Array.isArray(rawList)) {
    throw new Error("GitHub API commits payload was not an array");
  }

  const filtered = [];
  for (const item of rawList) {
    const sha = item?.sha;
    const message = item?.commit?.message || "";
    const subject = message.split(/\r?\n/)[0].trim();
    const date =
      item?.commit?.author?.date || item?.commit?.committer?.date || "";
    const parents = Array.isArray(item?.parents) ? item.parents : [];

    if (!sha || !date) continue;
    if (
      isMergeCommit({ parents, subject }) ||
      isBotCommit({
        authorName: item?.commit?.author?.name,
        authorLogin: item?.author?.login,
        authorType: item?.author?.type,
      })
    ) {
      continue;
    }

    filtered.push({
      sha,
      shortSha: sha.slice(0, 7),
      date,
      subject,
      files: [],
      hasFileData: false,
    });
  }

  const detailCandidates = filtered
    .filter((c) => DETAIL_WORTHY_SUBJECT_REGEX.test(c.subject))
    .slice(0, MAX_GITHUB_DETAIL_REQUESTS);

  let rateLimited = false;
  let cursor = 0;

  async function detailWorker() {
    while (cursor < detailCandidates.length && !rateLimited) {
      const target = detailCandidates[cursor++];
      try {
        const detail = await fetchJsonWithTimeout(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${encodeURIComponent(
            target.sha
          )}`,
          headers
        );
        if (Array.isArray(detail?.files)) {
          target.files = detail.files.map((f) => ({
            status: mapGitHubFileStatus(f.status),
            path: normalizeSlash(f.filename),
            ...(f.previous_filename
              ? { previousPath: normalizeSlash(f.previous_filename) }
              : {}),
          }));
          target.hasFileData = true;
        }
      } catch (err) {
        if (err?.status === 403 || err?.status === 429) {
          rateLimited = true;
          break;
        }
      }
    }
  }

  if (detailCandidates.length > 0) {
    await Promise.all(
      Array.from(
        { length: Math.min(GITHUB_DETAIL_CONCURRENCY, detailCandidates.length) },
        () => detailWorker()
      )
    );
  }

  return filtered;
}

async function readExistingValidChangelog() {
  try {
    const raw = await fs.readFile(OUTPUT_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? raw : null;
  } catch {
    return null;
  }
}

async function writeIfChanged(serialized) {
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  try {
    const existing = await fs.readFile(OUTPUT_PATH, "utf8");
    if (existing === serialized) {
      return false;
    }
  } catch {
    // File does not exist yet
  }
  await fs.writeFile(OUTPUT_PATH, serialized, "utf8");
  return true;
}

async function main() {
  const diskLookup = await loadVaultDiskLookup();
  const commitCount = await getGitCommitCount();

  let rawCommits = null;
  let sourceMode = "none";

  if (commitCount >= FULL_GIT_MIN_COMMITS) {
    try {
      rawCommits = await fetchFullGitCommits();
      sourceMode = `full-git (${commitCount} commits in history)`;
    } catch (err) {
      console.warn(
        `[generate-changelog] Full git log failed (${err.message}); falling back to GitHub API.`
      );
    }
  }

  if (!rawCommits || rawCommits.length === 0) {
    try {
      rawCommits = await fetchGitHubShallowCommits();
      sourceMode = "github-api (shallow fallback)";
    } catch (err) {
      console.warn(
        `[generate-changelog] GitHub API fallback unavailable (${err.message}).`
      );
    }
  }

  if (!rawCommits || rawCommits.length === 0) {
    const existing = await readExistingValidChangelog();
    if (existing !== null) {
      console.log(
        "[generate-changelog] Offline/rate-limited fallback: preserved existing src/data/changelog.generated.json."
      );
      return;
    }
    await writeIfChanged("[]\n");
    console.log(
      "[generate-changelog] Offline/rate-limited fallback: wrote empty array to src/data/changelog.generated.json."
    );
    return;
  }

  const entries = rawCommits.map((commit) => buildCommitEntry(commit, diskLookup));
  const serialized = `${JSON.stringify(entries, null, 2)}\n`;
  const wrote = await writeIfChanged(serialized);

  console.log(
    `[generate-changelog] ${wrote ? "Updated" : "Verified"} ${entries.length} changelog entries via ${sourceMode}.`
  );
}

main().catch(async (err) => {
  console.warn(`[generate-changelog] Unexpected error (${err?.message || err}); preserving fallback.`);
  const existing = await readExistingValidChangelog();
  if (existing === null) {
    await writeIfChanged("[]\n");
  }
  process.exit(0);
});
