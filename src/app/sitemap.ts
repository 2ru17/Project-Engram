import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import { getVaultIndex } from "@/lib/vault-index";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://2ru17-project-engram.vercel.app";
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const index = await getVaultIndex();

  // Add Course Star hub URLs
  for (const courseCode of index.courses.keys()) {
    routes.push({
      url: `${baseUrl}/notes/${encodeURIComponent(courseCode)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // Add canonical Note URLs
  for (const note of index.notes) {
    let lastModified = now;
    try {
      const stat = await fs.stat(/*turbopackIgnore: true*/ note.fullPath);
      lastModified = stat.mtime;
    } catch {
      // Fallback to now
    }

    const encodedSlug = note.canonicalSlug
      .split("/")
      .map((s) => encodeURIComponent(s))
      .join("/");

    routes.push({
      url: `${baseUrl}/notes/${encodedSlug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return routes;
}
