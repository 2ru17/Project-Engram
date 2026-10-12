import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import MarkdownRender from '@/components/MarkdownRender';
import ClientNoteLayout from '@/components/ClientNoteLayout';
import Link from 'next/link';
import GithubSlugger from 'github-slugger';
import { execFile } from 'child_process';
import { promisify } from 'util';
const execFileAsync = promisify(execFile);


async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

// Recursive vault search for a note by filename/title
async function findNoteInVault(dir: string, targetName: string): Promise<{ fullPath: string, relativePath: string } | null> {
  try {
    const items = await fs.readdir(/*turbopackIgnore: true*/ dir);
    for (const item of items) {
      if (item.startsWith('.')) continue;
      const full = path.join(dir, item);
      const stat = await fs.stat(/*turbopackIgnore: true*/ full);
      if (stat.isDirectory()) {
        const found = await findNoteInVault(full, targetName);
        if (found) return found;
      } else if (item.toLowerCase().endsWith('.md')) {
        const cleanName = item.replace(/\.md$/i, '');
        if (cleanName.toLowerCase() === targetName.toLowerCase()) {
          const baseContentDir = path.join(process.cwd(), 'content', 'Main Notes');
          const rel = path.relative(baseContentDir, full).replace(/\.md$/i, '');
          return { fullPath: full, relativePath: rel };
        }
      }
    }
  } catch {
    return null;
  }
  return null;
}

// Find all notes in vault that reference a tag or virtual hub
async function findBacklinksInVault(dir: string, hubName: string): Promise<{ name: string, path: string }[]> {
  const results: { name: string, path: string }[] = [];
  const baseContentDir = path.join(process.cwd(), 'content', 'Main Notes');
  const lowerHub = hubName.toLowerCase();

  async function scan(currentDir: string) {
    try {
      const items = await fs.readdir(/*turbopackIgnore: true*/ currentDir);
      for (const item of items) {
        if (item.startsWith('.')) continue;
        const full = path.join(currentDir, item);
        const stat = await fs.stat(/*turbopackIgnore: true*/ full);
        if (stat.isDirectory()) {
          await scan(full);
        } else if (item.toLowerCase().endsWith('.md')) {
          const content = await fs.readFile(/*turbopackIgnore: true*/ full, 'utf-8');
          if (
            content.toLowerCase().includes(`[[${lowerHub}]]`) ||
            content.toLowerCase().includes(`[[${lowerHub}|`) ||
            content.toLowerCase().includes(`#[[${lowerHub}]]`) ||
            content.toLowerCase().includes(`tags: [${lowerHub}`)
          ) {
            const rel = path.relative(baseContentDir, full).replace(/\.md$/i, '');
            results.push({
              name: item.replace(/\.md$/i, ''),
              path: `/notes/${rel}`
            });
          }
        }
      }
    } catch {
      return;
    }
  }

  await scan(dir);
  return results;
}

export default async function NotePage({ params }: { params: Promise<{ slug: string[] }> | { slug: string[] } }) {
  const resolvedParams = await params;
  const slugArray = (resolvedParams?.slug || []).map(decodeURIComponent);
  
  if (slugArray.length === 0) {
    notFound();
  }

  const baseDir = path.join(process.cwd(), 'content', 'Main Notes');
  let targetPath = path.join(baseDir, ...slugArray);
  let isVirtual = false;
  let backlinks: { name: string, path: string }[] = [];
  
  if (!(await fileExists(targetPath))) {
    if (await fileExists(targetPath + '.md')) {
      targetPath += '.md';
    } else {
      // Try finding the note recursively anywhere in the vault
      const deepMatch = await findNoteInVault(baseDir, slugArray[slugArray.length - 1]);
      if (deepMatch) {
        targetPath = deepMatch.fullPath;
      } else {
        // If not a physical file, check if it's a virtual hub with backlinks
        backlinks = await findBacklinksInVault(baseDir, slugArray[slugArray.length - 1]);
        isVirtual = true;
      }
    }
  }
  
  let isDir = false;
  if (!isVirtual && await fileExists(targetPath)) {
    const statObj = await fs.stat(/*turbopackIgnore: true*/ targetPath);
    isDir = statObj.isDirectory();
  }

  const title = isVirtual 
    ? slugArray[slugArray.length - 1] 
    : (isDir ? path.basename(targetPath) : path.basename(targetPath, '.md'));
  const parentUrl = '/notes';
  
  let items: { name: string, path: string }[] = [];
  
  if (!isVirtual && isDir) {
    const dirItems = (await fs.readdir(/*turbopackIgnore: true*/ targetPath)).filter(f => !f.startsWith('.'));
    for (const item of dirItems) {
      const itemPath = path.join(targetPath, item);
      const isItemDir = (await fs.stat(/*turbopackIgnore: true*/ itemPath)).isDirectory();
      const linkPath = '/notes/' + slugArray.join('/') + '/' + (isItemDir ? item : item.replace('.md', ''));
      items.push({ name: item.replace('.md', ''), path: linkPath });
    }
  }
  
  let fileContent = '';
  let lastUpdated: string | null = null;
  let toc: { text: string, depth: number, slug: string }[] = [];

  if (!isVirtual && !isDir && await fileExists(targetPath)) {
    fileContent = await fs.readFile(/*turbopackIgnore: true*/ targetPath, 'utf-8');
    
    try {
      const { stdout } = await execFileAsync('git', ['log', '-1', '--format=%cd', '--date=short', '--', targetPath]);
      const gitDate = stdout.trim();
      if (gitDate) {
        lastUpdated = gitDate;
      } else {
        lastUpdated = new Date().toISOString().split('T')[0];
      }
    } catch (e) {
      lastUpdated = new Date().toISOString().split('T')[0];
    }

    const slugger = new GithubSlugger();
    const lines = fileContent.split('\n');
    let inCodeBlock = false;
    for (const line of lines) {
      if (line.trim().startsWith('```')) inCodeBlock = !inCodeBlock;
      if (!inCodeBlock) {
        const match = line.match(/^(#{1,3})\s+(.+)$/);
        if (match) {
          const depth = match[1].length;
          let text = match[2].trim();
          text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/[*_~`]/g, '');
          const slug = slugger.slug(text);
          toc.push({ text, depth, slug });
        }
      }
    }
  }

  // Generate breadcrumb list schema
  const breadcrumbs = slugArray.map((slug, idx) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "name": slug,
    "item": `https://project-engram-2ru17.vercel.app/notes/${slugArray.slice(0, idx + 1).join('/')}`
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };

  return (
    <ClientNoteLayout title={title} parentUrl={parentUrl} toc={toc} lastUpdated={lastUpdated}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {isVirtual ? (
        <div className="py-8">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="w-12 h-12 rounded-full border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
              <span className="text-[var(--zen-cyan)] text-xl">◇</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-semibold text-[var(--zen-snow)] mb-3 tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-zen-display, serif)" }}
            >
              {title}
            </h1>
            <p className="text-[var(--zen-ink-muted)] max-w-lg leading-relaxed text-sm">
              Structural Virtual Concept Hub connecting relational records across the archive constellation.
            </p>
          </div>

          {backlinks.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-[var(--zen-border)] pb-3">
                <span className="text-xs font-mono tracking-widest text-[var(--zen-cyan)] uppercase font-semibold">
                  CONNECTED ARCHIVE ENTRIES ({backlinks.length})
                </span>
                <span className="text-[10px] font-mono text-[var(--zen-ink-muted)]">関連記録</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {backlinks.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div className="p-4 rounded-lg border border-[var(--zen-border)] hover:border-[var(--zen-cyan)]/60 bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)] transition-all duration-300 group flex items-center justify-between shadow-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:-translate-y-0.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[var(--zen-cyan)] text-xs shrink-0 group-hover:rotate-45 transition-transform duration-300">
                          ◇
                        </span>
                        <span className="text-sm font-medium text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[var(--zen-cyan)] text-xs opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-[var(--zen-border)] bg-[var(--zen-card)] rounded-xl p-8">
              <p className="text-[var(--zen-ink-muted)] text-sm mb-6">
                No connected records currently backlinked to this concept hub.
              </p>
              <Link
                href="/notes?view=graph"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[var(--zen-cyan)]/40 hover:border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 text-xs font-mono tracking-wider text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
              >
                <span>RETURN TO GRAPH</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      ) : isDir ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--zen-border)] pb-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[var(--zen-cyan)] text-lg">◇</span>
              <h1
                className="text-2xl sm:text-3xl font-semibold text-[var(--zen-snow)] tracking-wider uppercase"
                style={{ fontFamily: "var(--font-zen-display, serif)" }}
              >
                {title.toUpperCase()}
              </h1>
            </div>
            <span className="text-xs font-mono text-[var(--zen-ink-muted)] uppercase">目録分類</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <Link key={item.path} href={item.path}>
                <div className="p-4 rounded-lg border border-[var(--zen-border)] hover:border-[var(--zen-cyan)]/60 bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)] transition-all duration-300 group flex items-center justify-between shadow-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:-translate-y-0.5">
                  <span className="text-sm font-medium text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors truncate">
                    {item.name}
                  </span>
                  <span className="text-[var(--zen-cyan)] text-xs opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <MarkdownRender content={fileContent} />
      )}
    </ClientNoteLayout>
  );
}
