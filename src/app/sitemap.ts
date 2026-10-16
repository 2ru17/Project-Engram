import type { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://2ru17-project-engram.vercel.app';
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const contentDir = path.join(process.cwd(), 'content', 'Main Notes');

  async function walk(dir: string) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const relPath = path
            .relative(contentDir, fullPath)
            .replace(/\.md$/, '')
            .split(path.sep)
            .map(segment => encodeURIComponent(segment))
            .join('/');

          let lastModified = now;
          try {
            const stat = await fs.stat(fullPath);
            lastModified = stat.mtime;
          } catch {
            // Fallback to now
          }

          routes.push({
            url: `${baseUrl}/notes/${relPath}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      }
    } catch {
      // Content dir missing or unreadable
    }
  }

  await walk(contentDir);

  return routes;
}
