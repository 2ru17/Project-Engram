"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "./ThemeProvider";
import {
  encodeProgressCode,
  decodeProgressCode,
  type StudyPlanTier,
} from "@/lib/progress-code";

const STORAGE_KEY = "engram-study-state-v2";

export interface LastVisitedRecord {
  url: string;
  title: string;
  courseCode?: string;
  timestamp: number;
}

interface StoredStudyState {
  tier: StudyPlanTier;
  focusCourse: string;
  completedNotes: string[];
  lastVisited: LastVisitedRecord | null;
}

interface ImportOutcome {
  ok: boolean;
  message: string;
  importedCount?: number;
}

interface StudyPlanContextType {
  tier: StudyPlanTier;
  focusCourse: string;
  completedNotes: string[];
  completedCount: number;
  lastVisited: LastVisitedRecord | null;
  isSyncModalOpen: boolean;
  setSyncModalOpen: (open: boolean) => void;
  setTier: (tier: StudyPlanTier) => void;
  setFocusCourse: (course: string) => void;
  isNoteCompleted: (url: string) => boolean;
  toggleNoteCompleted: (url: string, title?: string) => void;
  markNoteVisited: (url: string, title: string, courseCode?: string) => void;
  exportProgressCode: () => string;
  importProgressCode: (
    rawCode: string,
    mode: "merge" | "overwrite"
  ) => ImportOutcome;
  resetProgress: () => void;
}

const StudyPlanContext = createContext<StudyPlanContextType | undefined>(
  undefined
);

function normalizeNoteUrl(rawUrl: string): string {
  try {
    const decoded = decodeURIComponent(rawUrl).trim().replace(/\/$/, "");
    if (!decoded) return "";
    return decoded.startsWith("/") ? decoded : `/${decoded}`;
  } catch {
    return rawUrl.trim().replace(/\/$/, "");
  }
}

export function StudyPlanProvider({ children }: { children: React.ReactNode }) {
  const {
    universe,
    theme,
    isLite,
    setUniverse,
    toggleTheme,
    togglePerfMode,
  } = useTheme();

  const [tier, setTierState] = useState<StudyPlanTier>("full");
  const [focusCourse, setFocusCourseState] = useState<string>("ALL");
  const [completedNotes, setCompletedNotes] = useState<string[]>([]);
  const [lastVisited, setLastVisited] = useState<LastVisitedRecord | null>(
    null
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSyncModalOpen, setSyncModalOpen] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredStudyState>;
        if (
          parsed.tier === "full" ||
          parsed.tier === "core" ||
          parsed.tier === "cram"
        ) {
          setTierState(parsed.tier);
        }
        if (typeof parsed.focusCourse === "string" && parsed.focusCourse) {
          setFocusCourseState(parsed.focusCourse.toUpperCase());
        }
        if (Array.isArray(parsed.completedNotes)) {
          setCompletedNotes(
            Array.from(
              new Set(
                parsed.completedNotes
                  .filter((u): u is string => typeof u === "string")
                  .map(normalizeNoteUrl)
                  .filter(Boolean)
              )
            )
          );
        }
        if (
          parsed.lastVisited &&
          typeof parsed.lastVisited.url === "string" &&
          typeof parsed.lastVisited.title === "string"
        ) {
          setLastVisited({
            url: normalizeNoteUrl(parsed.lastVisited.url),
            title: parsed.lastVisited.title,
            courseCode: parsed.lastVisited.courseCode,
            timestamp: parsed.lastVisited.timestamp || Date.now(),
          });
        }
      }
    } catch {
      // Ignore storage read errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage whenever state updates
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave: StoredStudyState = {
        tier,
        focusCourse,
        completedNotes,
        lastVisited,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Ignore storage write errors
    }
  }, [tier, focusCourse, completedNotes, lastVisited, isHydrated]);

  const setTier = useCallback((nextTier: StudyPlanTier) => {
    setTierState(nextTier);
  }, []);

  const setFocusCourse = useCallback((nextCourse: string) => {
    setFocusCourseState((nextCourse || "ALL").toUpperCase());
  }, []);

  const completedSet = useMemo(
    () => new Set(completedNotes.map((u) => u.toLowerCase())),
    [completedNotes]
  );

  const isNoteCompleted = useCallback(
    (url: string) => {
      const norm = normalizeNoteUrl(url).toLowerCase();
      return completedSet.has(norm);
    },
    [completedSet]
  );

  const toggleNoteCompleted = useCallback((url: string, _title?: string) => {
    const norm = normalizeNoteUrl(url);
    if (!norm) return;
    const lower = norm.toLowerCase();

    setCompletedNotes((prev) => {
      const exists = prev.some((u) => u.toLowerCase() === lower);
      if (exists) {
        return prev.filter((u) => u.toLowerCase() !== lower);
      }
      return [...prev, norm];
    });
  }, []);

  const markNoteVisited = useCallback(
    (url: string, title: string, courseCode?: string) => {
      const norm = normalizeNoteUrl(url);
      if (!norm) return;
      setLastVisited((prev) => {
        if (prev && prev.url === norm && prev.title === title) {
          return prev;
        }
        return {
          url: norm,
          title,
          courseCode,
          timestamp: Date.now(),
        };
      });
    },
    []
  );

  const exportProgressCode = useCallback(() => {
    return encodeProgressCode({
      version: 2,
      universe,
      theme,
      isLite,
      tier,
      focusCourse,
      completedNotes,
      lastVisited: lastVisited
        ? {
            url: lastVisited.url,
            title: lastVisited.title,
            courseCode: lastVisited.courseCode,
          }
        : null,
    });
  }, [
    universe,
    theme,
    isLite,
    tier,
    focusCourse,
    completedNotes,
    lastVisited,
  ]);

  const importProgressCode = useCallback(
    (rawCode: string, mode: "merge" | "overwrite"): ImportOutcome => {
      const decoded = decodeProgressCode(rawCode);
      if (!decoded.ok || !decoded.snapshot) {
        return {
          ok: false,
          message: decoded.error || "Invalid progress code.",
        };
      }

      const snap = decoded.snapshot;
      const incomingNotes = snap.completedNotes
        .map(normalizeNoteUrl)
        .filter(Boolean);

      if (mode === "overwrite") {
        setCompletedNotes(incomingNotes);
        setTierState(snap.tier);
        setFocusCourseState(snap.focusCourse || "ALL");
        if (snap.lastVisited) {
          setLastVisited({
            url: normalizeNoteUrl(snap.lastVisited.url),
            title: snap.lastVisited.title,
            courseCode: snap.lastVisited.courseCode,
            timestamp: Date.now(),
          });
        } else {
          setLastVisited(null);
        }

        if (snap.universe !== universe) {
          setUniverse(snap.universe);
        }
        if (snap.universe === "cyber-zen" && snap.theme !== theme) {
          toggleTheme();
        }
        if (snap.isLite !== isLite) {
          togglePerfMode();
        }

        return {
          ok: true,
          message: `Restored profile (${incomingNotes.length} completed notes, ${snap.tier.toUpperCase()} tier, ${snap.universe.toUpperCase()} universe).`,
          importedCount: incomingNotes.length,
        };
      }

      // Merge mode
      setCompletedNotes((prev) => {
        const map = new Map<string, string>();
        for (const p of prev) map.set(p.toLowerCase(), p);
        for (const inc of incomingNotes) map.set(inc.toLowerCase(), inc);
        return Array.from(map.values());
      });
      setTierState(snap.tier);
      if (snap.focusCourse && snap.focusCourse !== "ALL") {
        setFocusCourseState(snap.focusCourse);
      }
      if (snap.lastVisited) {
        setLastVisited({
          url: normalizeNoteUrl(snap.lastVisited.url),
          title: snap.lastVisited.title,
          courseCode: snap.lastVisited.courseCode,
          timestamp: Date.now(),
        });
      }

      return {
        ok: true,
        message: `Merged ${incomingNotes.length} notes from code into current device progress.`,
        importedCount: incomingNotes.length,
      };
    },
    [universe, theme, isLite, setUniverse, toggleTheme, togglePerfMode]
  );

  const resetProgress = useCallback(() => {
    setCompletedNotes([]);
    setLastVisited(null);
    setTierState("full");
    setFocusCourseState("ALL");
  }, []);

  return (
    <StudyPlanContext.Provider
      value={{
        tier,
        focusCourse,
        completedNotes,
        completedCount: completedNotes.length,
        lastVisited,
        isSyncModalOpen,
        setSyncModalOpen,
        setTier,
        setFocusCourse,
        isNoteCompleted,
        toggleNoteCompleted,
        markNoteVisited,
        exportProgressCode,
        importProgressCode,
        resetProgress,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  );
}

export function useStudyPlan() {
  const ctx = useContext(StudyPlanContext);
  if (!ctx) {
    throw new Error("useStudyPlan must be used within a StudyPlanProvider");
  }
  return ctx;
}
