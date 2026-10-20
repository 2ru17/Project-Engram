"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { STAR_DOMAINS, type StarDomainId } from "@/lib/course-registry";
import { useStudyPlan } from "@/components/StudyPlanProvider";
import { matchesStudyPlanTier } from "@/lib/study-plans";

function isAncestorOfActive(folderPath: string, activePath: string) {
  if (!activePath || !folderPath) return false;
  const cleanFolder = folderPath.replace(/\/$/, "").toLowerCase();
  const cleanActive = activePath.replace(/\/$/, "").toLowerCase();
  return cleanActive.startsWith(cleanFolder + "/") || cleanActive === cleanFolder;
}

function filterTree(
  node: any,
  query: string,
  domainFilter: StarDomainId | "all"
): { folders: any[]; files: any[] } {
  const lower = query.toLowerCase().trim();

  const filteredFiles = (node.files || []).filter((f: any) =>
    !lower ? true : f.name.toLowerCase().includes(lower)
  );

  const filteredFolders = (node.folders || [])
    .map((folder: any) => {
      if (domainFilter !== "all" && folder.domain && folder.domain !== domainFilter) {
        return null;
      }

      const nameMatches =
        !lower ||
        folder.name.toLowerCase().includes(lower) ||
        (folder.courseTitle && folder.courseTitle.toLowerCase().includes(lower));

      const filteredChildren = folder.children
        ? filterTree(
            folder.children,
            nameMatches && lower && folder.name.toLowerCase().includes(lower)
              ? ""
              : query,
            "all"
          )
        : { folders: [], files: [] };

      const hasChildren =
        filteredChildren.folders.length > 0 || filteredChildren.files.length > 0;

      if (!lower || nameMatches || hasChildren) {
        return {
          ...folder,
          children: filteredChildren,
        };
      }
      return null;
    })
    .filter(Boolean);

  return {
    folders: filteredFolders,
    files: filteredFiles,
  };
}

export default function DirectoryView() {
  const [tree, setTree] = useState<{ folders: any[]; files: any[] }>({
    folders: [],
    files: [],
  });
  const [loading, setLoading] = useState(true);
  const [rawQuery, setRawQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState<StarDomainId | "all">("all");
  const pathname = usePathname();
  const activePath = decodeURIComponent(pathname || "");

  useEffect(() => {
    fetch("/api/directory")
      .then((res) => res.json())
      .then((data) => {
        setTree(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(rawQuery), 180);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  const filteredTree = useMemo(() => {
    return filterTree(tree, searchQuery, domainFilter);
  }, [tree, searchQuery, domainFilter]);

  const matchCount = useMemo(() => {
    const count = (n: { folders: any[]; files: any[] }): number => {
      let c = (n.files || []).length;
      for (const f of n.folders || []) {
        if (f.children) c += count(f.children);
      }
      return c;
    };
    return count(filteredTree);
  }, [filteredTree]);

  const totalCount = useMemo(() => {
    const count = (n: { folders: any[]; files: any[] }): number => {
      let c = (n.files || []).length;
      for (const f of n.folders || []) {
        if (f.children) c += count(f.children);
      }
      return c;
    };
    return count(tree);
  }, [tree]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-t-2 border-[var(--zen-cyan)] rounded-full animate-spin" />
          <span className="font-mono text-xs text-[var(--zen-ink-muted)] tracking-widest uppercase">
            LOADING ARCHIVE...
          </span>
        </div>
      </div>
    );
  }

  const isEmpty = filteredTree.folders.length === 0 && filteredTree.files.length === 0;

  return (
    <div className="w-full h-full flex flex-col min-h-0 text-[var(--zen-frost)]">
      {/* Omnibar Fast Search with Japanese Corner Brackets 『 』 */}
      <div className="mb-3 shrink-0 space-y-2.5">
        <div className="relative w-full">
          <span
            className="pointer-events-none absolute -left-2 -top-2.5 font-mono text-base text-[var(--zen-cyan)] select-none z-10"
            aria-hidden="true"
          >
            『
          </span>
          <span
            className="pointer-events-none absolute -right-2 -bottom-2.5 font-mono text-base text-[var(--zen-cyan)] select-none z-10"
            aria-hidden="true"
          >
            』
          </span>

          <div className="relative flex items-center">
            <svg
              className="absolute left-3.5 w-4 h-4 text-[var(--zen-cyan)] pointer-events-none shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="archive-filter-input"
              type="text"
              value={rawQuery}
              onChange={(e) => setRawQuery(e.target.value)}
              placeholder="Filter courses or monographs..."
              aria-label="Filter courses or monographs"
              className="w-full pl-9 pr-8 py-2 bg-[var(--zen-card)] border border-[var(--zen-border)] text-xs font-mono tracking-wide text-[var(--zen-snow)] placeholder-[var(--zen-ink-muted)] rounded-none backdrop-blur-xl focus:outline-none focus:border-[var(--zen-cyan)] focus:ring-1 focus:ring-[var(--zen-cyan)]/40 transition-all shadow-sm"
            />
            {rawQuery && (
              <button
                onClick={() => setRawQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Domain Filter Strip */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: "all", label: "ALL" },
            { id: "systems", label: "SYSTEMS" },
            { id: "theory", label: "THEORY" },
            { id: "security", label: "SECURITY" },
            { id: "software", label: "SOFTWARE" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDomainFilter(tab.id as any)}
              className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded border transition-all ${
                domainFilter === tab.id
                  ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-semibold"
                  : "border-[var(--zen-border)]/60 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Telemetry Indicator */}
        <div className="flex items-center justify-between px-1 text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] select-none">
          <span className="flex items-center gap-1.5">
            <span className="text-[var(--zen-cyan)] text-[9px]">◇</span>
            <span>
              {rawQuery.trim() || domainFilter !== "all"
                ? `${filteredTree.folders.length} COURSES · ${matchCount} NOTES`
                : `${tree.folders.length} COURSES · ${totalCount || 527} NOTES`}
            </span>
          </span>
          {(rawQuery || domainFilter !== "all") && (
            <button
              onClick={() => {
                setRawQuery("");
                setDomainFilter("all");
              }}
              className="text-[var(--zen-cyan)] hover:underline uppercase text-[9px]"
            >
              RESET
            </button>
          )}
        </div>
      </div>

      {/* Star Directory Tree Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-16 custom-scrollbar">
        {isEmpty ? (
          <div className="text-center py-12 px-4 flex flex-col items-center gap-2 text-[var(--zen-ink-muted)]">
            <span className="text-base text-[var(--zen-cyan)]">◇</span>
            <p className="font-mono text-xs tracking-wider text-[var(--zen-snow)] uppercase">
              NO COURSES OR MONOGRAPHS MATCHING &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => {
                setRawQuery("");
                setDomainFilter("all");
              }}
              className="mt-3 px-3 py-1 border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[11px] font-mono text-[var(--zen-cyan)] bg-[var(--zen-void)] transition-all"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTree.folders.map((folder: any, i: number) => (
              <FolderNode
                key={folder.path}
                folder={folder}
                index={i}
                depth={0}
                activePath={activePath}
                isSearching={Boolean(searchQuery.trim())}
              />
            ))}
            {filteredTree.files.map((file: any, i: number) => (
              <FileNode
                key={file.path}
                file={file}
                index={i}
                activePath={activePath}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FolderNode({
  folder,
  index,
  depth,
  activePath,
  isSearching,
}: {
  folder: any;
  index: number;
  depth: number;
  activePath: string;
  isSearching: boolean;
}) {
  const router = useRouter();
  const isAncestor = isAncestorOfActive(folder.path, activePath);
  const [isOpen, setIsOpen] = useState(isAncestor || isSearching);
  const hasChildren =
    (folder.children?.folders?.length || 0) > 0 ||
    (folder.children?.files?.length || 0) > 0;

  useEffect(() => {
    if (isAncestor) {
      setIsOpen(true);
    }
  }, [isAncestor, activePath]);

  useEffect(() => {
    if (isSearching) {
      setIsOpen(true);
    }
  }, [isSearching]);

  const domainColor =
    folder.domain && STAR_DOMAINS[folder.domain as StarDomainId]
      ? STAR_DOMAINS[folder.domain as StarDomainId].color
      : "var(--zen-cyan)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg border transition-all duration-200 group ${
          isAncestor
            ? "border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 text-[var(--zen-snow)]"
            : depth === 0
            ? "border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)]/40 text-[var(--zen-frost)]"
            : "border-transparent hover:bg-[var(--zen-card-hover)] text-[var(--zen-frost)] hover:text-[var(--zen-snow)]"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex-1 flex items-center gap-2 min-w-0 text-left"
        >
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[10px] shrink-0 ${
              isAncestor
                ? "text-[var(--zen-cyan)]"
                : "text-[var(--zen-ink-muted)] group-hover:text-[var(--zen-cyan)]"
            }`}
          >
            ▶
          </motion.span>

          {depth === 0 ? (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: domainColor }}
                />
                <span
                  className={`font-mono text-xs font-bold tracking-wider ${
                    isAncestor ? "text-[var(--zen-cyan)]" : "text-[var(--zen-snow)]"
                  }`}
                >
                  {folder.name}
                </span>
                {folder.track && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)] uppercase">
                    {folder.track}
                  </span>
                )}
              </div>
              {folder.courseTitle && (
                <p className="text-[11px] text-[var(--zen-ink-muted)] truncate mt-0.5">
                  {folder.courseTitle}
                </p>
              )}
            </div>
          ) : (
            <span
              className={`font-mono tracking-wider truncate text-xs ${
                isAncestor ? "text-[var(--zen-cyan)] font-semibold" : ""
              }`}
            >
              {folder.name.toUpperCase()}
            </span>
          )}
        </button>

        <div className="flex items-center gap-1.5 shrink-0 pl-2">
          {depth === 0 && (
            <button
              onClick={() => router.push(folder.path)}
              title={`Open ${folder.name} Star Hub`}
              className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
            >
              HUB →
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse folder" : "Expand folder"}
            className="font-mono text-xs text-[var(--zen-ink-muted)] hover:text-[var(--zen-frost)] px-1"
          >
            {isOpen ? "−" : "+"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-l border-[var(--zen-border)] ml-3 pl-2.5 mt-1 space-y-1"
          >
            {folder.children.folders?.map((subFolder: any, i: number) => (
              <FolderNode
                key={subFolder.path}
                folder={subFolder}
                index={i}
                depth={depth + 1}
                activePath={activePath}
                isSearching={isSearching}
              />
            ))}
            {folder.children.files?.map((file: any, i: number) => (
              <FileNode
                key={file.path}
                file={file}
                index={i}
                activePath={activePath}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FileNode({
  file,
  index,
  activePath,
}: {
  file: any;
  index: number;
  activePath: string;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLDivElement>(null);
  const { isNoteCompleted, tier } = useStudyPlan();

  const cleanActive = (activePath || "").replace(/\/$/, "").toLowerCase();
  const cleanFile = file.path.replace(/\/$/, "").toLowerCase();
  const isActive = cleanActive === cleanFile;
  const completed = isNoteCompleted(file.path);

  useEffect(() => {
    if (isActive && fileRef.current) {
      const timer = setTimeout(() => {
        fileRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!matchesStudyPlanTier(file.name, file.path, tier, index)) {
    return null;
  }

  return (
    <motion.div
      ref={fileRef}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.012, 0.2), ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <button
        onClick={() => router.push(file.path)}
        className={`flex items-center gap-2 group text-left w-full px-2.5 py-1.5 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 shadow-[0_0_12px_rgba(0,229,255,0.2)] font-medium"
            : completed
            ? "text-[var(--zen-cyan)]/90 hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)] border border-transparent"
            : "text-[var(--zen-frost)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)] border border-transparent"
        }`}
      >
        <span
          className={`text-[9px] font-mono shrink-0 transition-transform ${
            isActive || completed
              ? "text-[var(--zen-cyan)] font-bold"
              : "text-[var(--zen-ink-muted)] group-hover:text-[var(--zen-cyan)]"
          }`}
        >
          {completed ? "[x]" : "◇"}
        </span>
        <span className="text-xs font-sans leading-snug break-words truncate">
          {file.name}
        </span>
      </button>
    </motion.div>
  );
}
