import { COURSE_REGISTRY, STAR_DOMAINS, type StarDomainId } from "./course-registry";
import type { StudyPlanTier } from "./progress-code";

export interface StudyPlanTierMeta {
  id: StudyPlanTier;
  label: string;
  shortLabel: string;
  badge: string;
  description: string;
  filterSummary: string;
}

export const STUDY_PLAN_TIERS: Record<StudyPlanTier, StudyPlanTierMeta> = {
  full: {
    id: "full",
    label: "Full Mastery Curriculum",
    shortLabel: "FULL MASTERY",
    badge: "TIER 01 // FULL",
    description:
      "Complete academic sequence covering all lecture monographs, laboratory exercises, problem sets, and comprehensive review guides.",
    filterSummary: "Includes all lecture notes, exercises ([EX]), problem sets ([PS]), and reviewers ([REV]).",
  },
  core: {
    id: "core",
    label: "Core Concepts Track",
    shortLabel: "CORE CONCEPTS",
    badge: "TIER 02 // CORE",
    description:
      "Focused conceptual sequence targeting primary lecture monographs and theoretical foundations while skipping supplemental exercises.",
    filterSummary: "Includes primary lecture monographs; excludes [EX], [PS], [QZ], and [ANS] utility files.",
  },
  cram: {
    id: "cram",
    label: "High-Yield Exam Review",
    shortLabel: "EXAM REVIEW",
    badge: "TIER 03 // REVIEW",
    description:
      "Accelerated exam preparation track prioritizing synthesis reviewers, reference handouts, and foundational introductory notes.",
    filterSummary: "Prioritizes [REV] study guides, [HO] handouts, finals reviewers, and core overview notes.",
  },
};

export const STUDY_PLAN_TIER_LIST: StudyPlanTierMeta[] = [
  STUDY_PLAN_TIERS.full,
  STUDY_PLAN_TIERS.core,
  STUDY_PLAN_TIERS.cram,
];

const UTILITY_PREFIX_RE = /^\[(EX|PS|QZ|ANS)\]/i;
const REVIEW_PREFIX_RE = /^\[(REV|HO)\]/i;
const REVIEW_KEYWORD_RE =
  /(review|reviewer|cheat\s*sheet|summary|finals|midterm|mock|synthesis|overview|introduction|fundamentals|architecture)/i;

/**
 * Determines whether a note or directory item belongs in the selected Study Plan tier.
 */
export function matchesStudyPlanTier(
  itemName: string,
  itemPath: string,
  tier: StudyPlanTier,
  indexInList = 0
): boolean {
  if (tier === "full") return true;

  const cleanName = itemName.trim();
  const lowerPath = itemPath.toLowerCase();

  if (tier === "core") {
    if (UTILITY_PREFIX_RE.test(cleanName)) return false;
    if (
      lowerPath.includes("/exercises/") ||
      lowerPath.includes("/assessments/") ||
      lowerPath.endsWith("-answers") ||
      lowerPath.endsWith("-mock")
    ) {
      return false;
    }
    return true;
  }

  if (tier === "cram") {
    if (UTILITY_PREFIX_RE.test(cleanName)) return false;
    if (REVIEW_PREFIX_RE.test(cleanName)) return true;
    if (REVIEW_KEYWORD_RE.test(cleanName) || REVIEW_KEYWORD_RE.test(lowerPath)) {
      return true;
    }
    // Always keep the first 3 foundational items of a module/course if no explicit reviewer tag
    return indexInList < 3;
  }

  return true;
}

export interface CourseStudyRoadmapItem {
  code: string;
  name: string;
  domain: StarDomainId;
  domainLabel: string;
  track: string;
  totalNotes: number;
  targetNotesForTier: number;
  completedInCourse: number;
  percent: number;
  href: string;
  relatedCourses: string[];
}

/**
 * Computes per-course completion metrics scaled to the active Study Plan Tier.
 */
export function computeCourseRoadmap(
  completedNotes: string[],
  tier: StudyPlanTier,
  domainFilter: StarDomainId | "all" = "all"
): CourseStudyRoadmapItem[] {
  const completedByCourse = new Map<string, number>();

  for (const url of completedNotes) {
    const clean = url.replace(/^\/notes\//, "");
    const slash = clean.indexOf("/");
    const code = (slash === -1 ? clean : clean.slice(0, slash)).toUpperCase();
    if (code) {
      completedByCourse.set(code, (completedByCourse.get(code) || 0) + 1);
    }
  }

  return COURSE_REGISTRY.filter((course) =>
    domainFilter === "all" ? true : course.category === domainFilter
  ).map((course) => {
    const code = course.code.toUpperCase();
    const rawCount = course.count || 1;
    const tierFactor = tier === "full" ? 1 : tier === "core" ? 0.78 : 0.35;
    const targetNotesForTier = Math.max(1, Math.round(rawCount * tierFactor));
    const completedInCourse = completedByCourse.get(code) || 0;
    const percent = Math.min(
      100,
      Math.round((completedInCourse / targetNotesForTier) * 100)
    );
    const domainMeta = STAR_DOMAINS[course.category] || STAR_DOMAINS.systems;

    return {
      code,
      name: course.name,
      domain: course.category,
      domainLabel: domainMeta.label,
      track: course.track,
      totalNotes: rawCount,
      targetNotesForTier,
      completedInCourse,
      percent,
      href: course.href,
      relatedCourses: course.relatedCourses,
    };
  });
}
