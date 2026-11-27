## Summary
- **Scope:** (e.g., Simulator Workbench / Course Monograph / Platform UI / Documentation)
- **Affected Courses, Simulators, or Routes:**

## Content & Vault Sync Reminder
> **Content Hygiene & Sync:** Author academic monographs directly in `./content/Main Notes/` (or when syncing from a local Obsidian vault, use `rsync -av --delete --prune-empty-dirs --include='*/' --include='*.md' --exclude='*' "<OBSIDIAN_VAULT>/Main Notes/" "./content/Main Notes/"`), and synchronize `COURSE_REGISTRY` counts with `npm run sync:counts`.

## Verification Checklist
- [ ] `npm run sync:counts` — Synchronized per-course monograph counts in `src/lib/course-registry.ts` (if notes were added, moved, or removed)
- [ ] `npm run validate:notes` — Passed all 6 vault, frontmatter, MCQ parser, Mermaid, and codebase invariant gates
- [ ] `npm run typecheck` — Passed `tsc --noEmit` with zero TypeScript errors
- [ ] `npm run lint` — Passed `eslint` with zero warnings or errors
- [ ] `npm run build` — Completed production `next build` cleanly
