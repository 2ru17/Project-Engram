## Summary
- **Scope:** (e.g., Simulator Workbench / Course Monograph / Platform UI / Documentation)
- **Affected Courses, Simulators, or Routes:**

## Content & Vault Sync Reminder
> **Vault First, Then Sync:** If this PR modifies or adds academic monographs, always author changes in the primary Obsidian vault first (`/home/2ru17/Documents/Obsidian/2ru17-engram-vault/main/Main Notes/`), sync into `content/Main Notes/` via `rsync -av --delete`, and synchronize `COURSE_REGISTRY` counts with `npm run sync:counts`.

## Verification Checklist
- [ ] `npm run sync:counts` — Synchronized per-course monograph counts in `src/lib/course-registry.ts` (if notes were added, moved, or removed)
- [ ] `npm run validate:notes` — Passed all 6 vault, frontmatter, MCQ parser, Mermaid, and codebase invariant gates
- [ ] `npm run typecheck` — Passed `tsc --noEmit` with zero TypeScript errors
- [ ] `npm run lint` — Passed `eslint` with zero warnings or errors
- [ ] `npm run build` — Completed production `next build` cleanly
