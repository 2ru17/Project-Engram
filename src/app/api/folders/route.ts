import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const contentDir = path.join(process.cwd(), 'content');
  
  try {
    await fs.access(contentDir);
  } catch {
    return NextResponse.json([]);
  }
  
  const itemsRaw = await fs.readdir(contentDir);
  const items = [];
  
  for (const f of itemsRaw) {
    if (f.startsWith('.')) continue;
    const stat = await fs.stat(path.join(contentDir, f));
    if (stat.isDirectory()) {
      items.push({ name: f });
    }
  }
    
  return NextResponse.json(items);
}
