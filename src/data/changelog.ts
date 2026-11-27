import generatedEntries from "./changelog.generated.json";

export type ChangelogCategory = "notes" | "simulators" | "platform";

export interface ChangelogNoteLink {
  title: string;
  course: string;
  href?: string;
}

export interface ChangelogRemovedNote {
  title: string;
  course: string;
}

export interface ChangelogEntry {
  sha: string;
  shortSha: string;
  date: string;
  title: string;
  commitUrl: string;
  category: ChangelogCategory;
  courses: string[];
  notes: {
    added: ChangelogNoteLink[];
    updated: ChangelogNoteLink[];
    removed: ChangelogRemovedNote[];
  };
  noteCounts?: {
    added: number;
    updated: number;
    removed: number;
  };
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] =
  generatedEntries as unknown as ChangelogEntry[];

export const LATEST_CHANGELOG_VERSION =
  CHANGELOG_ENTRIES[0]?.shortSha ?? "baseline";
