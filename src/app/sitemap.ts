import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import { getVaultIndex } from "@/lib/vault-index";
import { SIMULATOR_LIST } from "@/lib/simulator-registry";

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
    {
      url: `${baseUrl}/simulators`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  for (const sim of SIMULATOR_LIST) {
    routes.push({
      url: `${baseUrl}/simulators?id=${encodeURIComponent(sim.id)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  const index = await getVaultIndex();

  for (const courseCode of index.courses.keys()) {
    routes.push({
      url: `${baseUrl}/notes/${encodeURIComponent(courseCode)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

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
