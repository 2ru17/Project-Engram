"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";

function isAncestorOfActive(folderPath: string, activePath: string) {
  if (!activePath || !folderPath) return false;
  const cleanFolder = folderPath.replace(/\/$/, "").toLowerCase();
  const cleanActive = activePath.replace(/\/$/, "").toLowerCase();
  return cleanActive.startsWith(cleanFolder + "/") || cleanActive === cleanFolder;
}

function filterTree(node: any, query: string): { folders: any[]; files: any[] } {
  if (!query.trim()) return node;
  const lower = query.toLowerCase().trim();

  const filteredFiles = (node.files || []).filter((f: any) =>
    f.name.toLowerCase().includes(lower)
  );

  const filteredFolders = (node.folders || [])
    .map((folder: any) => {
      const nameMatches = folder.name.toLowerCase().includes(lower);
      const filteredChildren = filterTree(folder.children, query);
      const hasChildren =
        filteredChildren.folders.length > 0 || filteredChildren.files.length > 0;

      if (nameMatches || hasChildren) {
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
    const timer = setTimeout(() => setSearchQuery(rawQuery), 200);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  const filteredTree = useMemo(() => {
    return filterTree(tree, searchQuery);
  }, [tree, searchQuery]);

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
            PARSING TREE...
          </span>
        </div>
      </div>
    );
  }

  const isEmpty = filteredTree.folders.length === 0 && filteredTree.files.length === 0;

  return (
    <div className="w-full h-full flex flex-col min-h-0 text-[var(--zen-frost)]">
      {/* Transferred Omnibar Fast Search with Japanese Corner Brackets 『 』 */}
      <div className="mb-4 shrink-0">
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
              placeholder="Filter monographs..."
              aria-label="Filter monographs"
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

          {/* Quick Telemetry Indicator */}
          <div className="flex items-center justify-between mt-1 px-1 text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] select-none">
            <span className="flex items-center gap-1.5">
              <span className="text-[var(--zen-cyan)] text-[9px]">◇</span>
              <span>{rawQuery.trim() ? `${matchCount} MATCHES` : `${totalCount || 519} MONOGRAPHS`}</span>
            </span>
            {rawQuery && (
              <button
                onClick={() => setRawQuery("")}
                className="text-[var(--zen-cyan)] hover:underline uppercase text-[9px]"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bamboo Scroll Tree Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-16 custom-scrollbar">
        {isEmpty ? (
          <div className="text-center py-12 px-4 flex flex-col items-center gap-2 text-[var(--zen-ink-muted)]">
            <span className="text-base text-[var(--zen-cyan)]">◇</span>
            <p className="font-mono text-xs tracking-wider text-[var(--zen-snow)] uppercase">
              NO MONOGRAPHS MATCHING &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[11px] font-mono text-[var(--zen-ink-muted)]">
              // 該当目録なし
            </p>
            <button
              onClick={() => setRawQuery("")}
              className="mt-3 px-3 py-1 border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[11px] font-mono text-[var(--zen-cyan)] bg-[var(--zen-void)] transition-all"
            >
              CLEAR QUERY
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
  const isAncestor = isAncestorOfActive(folder.path, activePath);
  const [isOpen, setIsOpen] = useState(isAncestor || depth === 0 || isSearching);
  const hasChildren =
    (folder.children?.folders?.length || 0) > 0 || (folder.children?.files?.length || 0) > 0;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="w-full"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg border transition-all duration-200 group text-left ${
          isAncestor
            ? "border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 text-[var(--zen-snow)]"
            : depth === 0
            ? "border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-border)] text-[var(--zen-frost)]"
            : "border-transparent hover:bg-[var(--zen-card-hover)] text-[var(--zen-frost)] hover:text-[var(--zen-snow)]"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className={`text-[10px] shrink-0 ${
              isAncestor ? "text-[var(--zen-cyan)]" : "text-[var(--zen-ink-muted)] group-hover:text-[var(--zen-cyan)]"
            }`}
          >
            ▶
          </motion.span>
          <span
            className={`font-mono tracking-wider truncate ${
              depth === 0 ? "text-xs font-semibold" : "text-xs font-normal"
            } ${isAncestor ? "text-[var(--zen-cyan)] font-semibold" : ""}`}
          >
            {folder.name.toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-[9px] text-[var(--zen-ink-muted)] shrink-0 pl-2 group-hover:text-[var(--zen-frost)]">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
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

  const cleanActive = (activePath || "").replace(/\/$/, "").toLowerCase();
  const cleanFile = file.path.replace(/\/$/, "").toLowerCase();
  const isActive = cleanActive === cleanFile;

  useEffect(() => {
    if (isActive && fileRef.current) {
      const timer = setTimeout(() => {
        fileRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <motion.div
      ref={fileRef}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.015 }}
      className="w-full"
    >
      <button
        onClick={() => router.push(file.path)}
        className={`flex items-center gap-2 group text-left w-full px-2.5 py-1.5 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 shadow-[0_0_12px_rgba(0,229,255,0.2)] font-medium"
            : "text-[var(--zen-frost)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)] border border-transparent"
        }`}
      >
        <span
          className={`text-[9px] shrink-0 transition-transform ${
            isActive
              ? "text-[var(--zen-cyan)] scale-125"
              : "text-[var(--zen-ink-muted)] group-hover:text-[var(--zen-cyan)]"
          }`}
        >
          ◇
        </span>
        <span className="text-xs font-sans leading-snug break-words truncate">
          {file.name}
        </span>
      </button>
    </motion.div>
  );
}
