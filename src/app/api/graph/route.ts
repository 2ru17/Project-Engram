import { NextResponse } from "next/server";
import { getVaultIndex } from "@/lib/vault-index";
import { COURSE_REGISTRY, getCourseInfo, type StarDomainId } from "@/lib/course-registry";

export const dynamic = "force-static";

export interface GraphNodePayload {
  id: string;
  name: string;
  subtitle?: string;
  tier: "sun" | "star" | "satellite" | "hub";
  courseCode?: string;
  domain?: StarDomainId;
  domainLabel?: string;
  track?: string;
  group: number;
  path: string;
  isVirtual?: boolean;
  excerpt?: string;
  noteCount?: number;
  estimatedMinutes?: number;
  fx?: number;
  fy?: number;
}

export interface GraphLinkPayload {
  source: string;
  target: string;
  kind: "solar" | "constellation" | "orbital" | "wikilink";
}

export async function GET() {
  const index = await getVaultIndex();
  const nodes: GraphNodePayload[] = [];
  const links: GraphLinkPayload[] = [];
  const nodeIds = new Set<string>();
  const linkKeys = new Set<string>();

  const addLink = (
    source: string,
    target: string,
    kind: GraphLinkPayload["kind"]
  ) => {
    if (!source || !target || source === target) return;
    const [a, b] = source < target ? [source, target] : [target, source];
    const key = `${a}:::${b}`;
    if (linkKeys.has(key)) return;
    linkKeys.add(key);
    links.push({ source, target, kind });
  };

  // 1. Central Star / Sun: COMPUTER SCIENCE pinned at (0, 0)
  const sunId = "sun:computer-science";
  nodes.push({
    id: sunId,
    name: "COMPUTER SCIENCE",
    subtitle: "Central Knowledge Star // 中枢恒星",
    tier: "sun",
    group: 0,
    path: "/notes?view=directory",
    excerpt:
      "The Central Sun of Project Engram — gravitational core uniting Systems & Architecture, Algorithms & Theory, Networks & Cybersecurity, and Software Engineering stars across all tracks (Core CS, NIS, ST).",
    noteCount: index.notes.length,
    fx: 0,
    fy: 0,
  });
  nodeIds.add(sunId);

  // Count actual notes per course
  const notesPerCourse = new Map<string, number>();
  for (const note of index.notes) {
    notesPerCourse.set(
      note.courseCode,
      (notesPerCourse.get(note.courseCode) || 0) + 1
    );
  }

  // Merge COURSE_REGISTRY with any newly added course folders in the vault
  const allCourseCodes = new Set<string>([
    ...COURSE_REGISTRY.map((c) => c.code.toUpperCase()),
    ...index.courses.keys(),
  ]);

  // 2. Course Stars (Orbiting the Central CS Sun & interconnected via Constellation Bridges)
  for (const code of allCourseCodes) {
    const info = getCourseInfo(code);
    const noteCount = notesPerCourse.get(code) ?? info?.count ?? 0;
    if (noteCount === 0 && !info) continue;

    const starId = `star:${code.toLowerCase()}`;
    const domain: StarDomainId = info?.category || "systems";

    nodes.push({
      id: starId,
      name: code,
      subtitle: info?.name || code,
      tier: "star",
      courseCode: code,
      domain,
      domainLabel: info?.categoryLabel || "Computer Science",
      track: info?.track || "General",
      group: 1,
      path: `/notes/${code}`,
      excerpt:
        info?.desc ||
        `Subject Star for ${code} indexing ${noteCount} academic monographs.`,
      noteCount,
    });
    nodeIds.add(starId);

    // Connect every Course Star to the Central CS Sun
    addLink(sunId, starId, "solar");
  }

  // Add Course-to-Course Constellation Bridges (prerequisite & conceptual links)
  for (const course of COURSE_REGISTRY) {
    const srcStarId = `star:${course.code.toLowerCase()}`;
    if (!nodeIds.has(srcStarId)) continue;
    for (const relCode of course.relatedCourses || []) {
      const tgtStarId = `star:${relCode.toLowerCase()}`;
      if (nodeIds.has(tgtStarId)) {
        addLink(srcStarId, tgtStarId, "constellation");
      }
    }
  }

  // 3. Topic / Note Satellites (Orbiting their parent Course Star)
  const pendingWikilinks: { sourceNoteId: string; rawTarget: string }[] = [];

  for (const note of index.notes) {
    const info = getCourseInfo(note.courseCode);
    const domain: StarDomainId = info?.category || "systems";
    const parentStarId = `star:${note.courseCode.toLowerCase()}`;

    nodes.push({
      id: note.id,
      name: note.name,
      subtitle: `${note.courseCode} · ${note.estimatedMinutes} min read`,
      tier: "satellite",
      courseCode: note.courseCode,
      domain,
      domainLabel: info?.categoryLabel || "Computer Science",
      track: info?.track || "Core CS",
      group: 2,
      path: note.canonicalUrl,
      excerpt: note.excerpt,
      estimatedMinutes: note.estimatedMinutes,
    });
    nodeIds.add(note.id);

    // Connect satellite note to its Course Star
    if (nodeIds.has(parentStarId)) {
      addLink(parentStarId, note.id, "orbital");
    } else {
      addLink(sunId, note.id, "orbital");
    }

    for (const target of note.wikilinks) {
      pendingWikilinks.push({ sourceNoteId: note.id, rawTarget: target });
    }
  }

  // 4. Resolve Wikilinks across notes and stars
  for (const { sourceNoteId, rawTarget } of pendingWikilinks) {
    const lower = rawTarget.toLowerCase().trim();
    if (!lower) continue;

    if (lower === "computer science" || lower === "project engram") {
      addLink(sourceNoteId, sunId, "wikilink");
      continue;
    }

    const asCourseStar = `star:${lower}`;
    if (nodeIds.has(asCourseStar)) {
      addLink(sourceNoteId, asCourseStar, "wikilink");
      continue;
    }

    const matchedNote = index.noteByName.get(lower);
    if (matchedNote && nodeIds.has(matchedNote.id)) {
      addLink(sourceNoteId, matchedNote.id, "wikilink");
    }
  }

  return NextResponse.json({ nodes, links });
}
