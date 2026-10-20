import { promises as fs } from "fs";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import MarkdownRender from "@/components/MarkdownRender";
import ClientNoteLayout from "@/components/ClientNoteLayout";
import CourseDirectoryFilter from "@/components/CourseDirectoryFilter";
import Link from "next/link";
import GithubSlugger from "github-slugger";
import { execFile } from "child_process";
import { promisify } from "util";
import { resolveVaultSlug } from "@/lib/vault-index";
import { getCourseInfo } from "@/lib/course-registry";

const execFileAsync = promisify(execFile);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }> | { slug: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = (resolvedParams?.slug || []).map(decodeURIComponent);
  if (slugArray.length === 0) {
    return { title: "Monograph" };
  }

  const resolved = await resolveVaultSlug(slugArray);

  if (resolved.kind === "redirect") {
    return { title: "Redirecting..." };
  }

  const title = resolved.title;
  let description =
    resolved.kind === "virtual"
      ? `Structural Virtual Concept Hub connecting relational records in Project Engram for ${title}.`
      : resolved.kind === "directory"
      ? getCourseInfo(resolved.courseCode)?.desc ||
        `Course directory and module index in Project Engram for ${title}.`
      : resolved.note?.excerpt ||
        `Curated academic monograph and study reference in Project Engram for ${title}.`;

  const canonicalPath = `/notes/${resolved.canonicalSlugArray
    .map(encodeURIComponent)
    .join("/")}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | PROJECT ENGRAM`,
      description,
      type: "article",
      url: canonicalPath,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${title} - Project Engram`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PROJECT ENGRAM`,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string[] }> | { slug: string[] };
}) {
  const resolvedParams = await params;
  const slugArray = (resolvedParams?.slug || []).map(decodeURIComponent);

  if (slugArray.length === 0) {
    notFound();
  }

  const resolved = await resolveVaultSlug(slugArray);

  // 1. Automatic 308 Permanent Redirect for legacy 4-Year / Term URLs
  if (resolved.kind === "redirect") {
    permanentRedirect(resolved.redirectUrl);
  }

  const title = resolved.title;
  const parentUrl = "/notes";

  let fileContent = "";
  let lastUpdated: string | null = null;
  const toc: { text: string; depth: number; slug: string }[] = [];

  if (resolved.kind === "note") {
    fileContent = await fs.readFile(
      /*turbopackIgnore: true*/ resolved.fullPath,
      "utf-8"
    );

    try {
      const { stdout } = await execFileAsync("git", [
        "log",
        "-1",
        "--format=%cd",
        "--date=short",
        "--",
        resolved.fullPath,
      ]);
      const gitDate = stdout.trim();
      lastUpdated = gitDate || new Date().toISOString().split("T")[0];
    } catch {
      lastUpdated = new Date().toISOString().split("T")[0];
    }

    const slugger = new GithubSlugger();
    const lines = fileContent.split("\n");
    let inCodeBlock = false;
    for (const line of lines) {
      if (line.trim().startsWith("```")) inCodeBlock = !inCodeBlock;
      if (!inCodeBlock) {
        const match = line.match(/^(#{1,3})\s+(.+)$/);
        if (match) {
          const depth = match[1].length;
          let text = match[2].trim();
          text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/[*_~`]/g, "");
          const slug = slugger.slug(text);
          toc.push({ text, depth, slug });
        }
      }
    }
  }

  // Generate BreadcrumbList schema using canonical year-agnostic hierarchy
  const breadcrumbs = resolved.canonicalSlugArray.map((slug, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: slug,
    item: `https://project-engram-2ru17.vercel.app/notes/${resolved.canonicalSlugArray
      .slice(0, idx + 1)
      .map(encodeURIComponent)
      .join("/")}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };

  const courseMeta =
    resolved.kind === "directory" || resolved.kind === "note"
      ? getCourseInfo(resolved.courseCode)
      : undefined;

  return (
    <ClientNoteLayout
      title={title}
      parentUrl={parentUrl}
      toc={toc}
      lastUpdated={lastUpdated}
      isMonograph={resolved.kind === "note"}
      courseCode={resolved.kind !== "virtual" ? resolved.courseCode : undefined}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {resolved.kind === "virtual" ? (
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
              Structural Virtual Concept Hub connecting relational records across the
              Project Engram Knowledge Graph.
            </p>
          </div>

          {resolved.backlinks.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-[var(--zen-border)] pb-3">
                <span className="text-xs font-mono tracking-widest text-[var(--zen-cyan)] uppercase font-semibold">
                  CONNECTED ARCHIVE ENTRIES ({resolved.backlinks.length})
                </span>
                <span className="text-[10px] font-mono text-[var(--zen-ink-muted)]">
                  関連記録
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 universe-bento-grid">
                {resolved.backlinks.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div className="universe-card p-4 rounded-lg border border-[var(--zen-border)] hover:border-[var(--zen-cyan)]/60 bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)] transition-all duration-300 group flex items-center justify-between shadow-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:-translate-y-0.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-[var(--zen-cyan)]/40 text-[var(--zen-cyan)] shrink-0">
                          {item.courseCode}
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
                <span>RETURN TO KNOWLEDGE GRAPH</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      ) : resolved.kind === "directory" ? (
        <div className="space-y-6">
          {/* Course / Module Header Banner */}
          <div className="border-b border-[var(--zen-border)] pb-6 mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 font-bold uppercase">
                {resolved.courseCode}
              </span>
              {courseMeta && (
                <>
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] border border-[var(--zen-border)] bg-[var(--zen-card)] uppercase">
                    {courseMeta.categoryLabel}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider text-[var(--zen-frost)] border border-[var(--zen-border)] bg-[var(--zen-card)] uppercase">
                    TRACK: {courseMeta.track}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <h1
                className="text-2xl sm:text-3xl font-semibold text-[var(--zen-snow)] tracking-wider uppercase"
                style={{ fontFamily: "var(--font-zen-display, serif)" }}
              >
                {title.toUpperCase()}
              </h1>
              <span className="text-xs font-mono text-[var(--zen-ink-muted)] uppercase shrink-0">
                科目目録
              </span>
            </div>

            {courseMeta && resolved.canonicalSlugArray.length === 1 && (
              <p className="mt-3 text-sm text-[var(--zen-ink-muted)] leading-relaxed max-w-2xl">
                {courseMeta.desc}
              </p>
            )}

            {/* Related Courses */}
            {courseMeta &&
              courseMeta.relatedCourses.length > 0 &&
              resolved.canonicalSlugArray.length === 1 && (
                <div className="mt-4 pt-4 border-t border-[var(--zen-border)]/50 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--zen-ink-muted)] uppercase mr-1">
                    RELATED COURSES:
                  </span>
                  {courseMeta.relatedCourses.map((relCode) => (
                    <Link
                      key={relCode}
                      href={`/notes/${relCode}`}
                      className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] transition-all"
                    >
                      {relCode} →
                    </Link>
                  ))}
                </div>
              )}
          </div>

          <CourseDirectoryFilter
            courseCode={resolved.courseCode}
            items={resolved.items}
          />
        </div>
      ) : (
        <MarkdownRender content={fileContent} />
      )}
    </ClientNoteLayout>
  );
}
