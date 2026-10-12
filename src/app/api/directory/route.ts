import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  const contentDir = path.join(process.cwd(), 'content', 'Main Notes');
  
  try {
    await fs.access(contentDir);
  } catch {
    return NextResponse.json({ folders: [], files: [] });
  }

  type TreeNode = { name: string, path: string, children?: { folders: TreeNode[], files: {name: string, path: string}[] } };
  async function getTree(dir: string, currentPath: string = ''): Promise<{ folders: TreeNode[], files: {name: string, path: string}[] }> {
    const itemsRaw = await fs.readdir(dir);
    const items = itemsRaw.filter(f => !f.startsWith('.'));
    const folders = [];
    const files = [];

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativeUrl = currentPath ? `${currentPath}/${item}` : item;
      
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        folders.push({
          name: item,
          path: `/notes/${relativeUrl}`,
          children: await getTree(fullPath, relativeUrl)
        });
      } else if (item.endsWith('.md')) {
        files.push({
          name: item.replace('.md', ''),
          path: `/notes/${relativeUrl}`.replace('.md', '')
        });
      }
    }

    return { folders, files };
  }

  const tree = await getTree(contentDir);
  return NextResponse.json(tree);
}
