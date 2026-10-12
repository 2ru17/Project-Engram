import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  const baseContentDir = path.join(process.cwd(), 'content', 'Main Notes');
  const nodes: { id: string, name: string, group: number, path: string, isVirtual?: boolean, excerpt?: string }[] = [];
  const links: { source: string, target: string }[] = [];
  
  try {
    await fs.access(baseContentDir);
  } catch {
    return NextResponse.json({ nodes, links });
  }

  const virtualNodesMap = new Map<string, string>();
  // Map to resolve wikilinks (which only use filename) to actual node IDs
  const nameToIdMap = new Map<string, string>();

  async function walk(dir: string, group: number = 1) {
    const items = await fs.readdir(dir);
    for (const item of items) {
      if (item.startsWith('.')) continue;
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      const isDir = stat.isDirectory();
      
      if (isDir) {
        await walk(fullPath, group + 1);
      } else if (item.endsWith('.md')) {
        const name = item.replace('.md', '');
        
        // Skip artifact chunks and generated summaries
        if (name.includes('_chunk_') || name.toLowerCase().includes('artifact')) continue;
        
        const relPath = path.relative(baseContentDir, fullPath).replace('.md', '').replace(/\\/g, '/');
        const id = relPath.toLowerCase(); // Use path as unique ID
        
        nameToIdMap.set(name.toLowerCase(), id); // Store mapping for wikilinks
        
        const content = await fs.readFile(fullPath, 'utf-8');
        
        // Strip YAML frontmatter
        let cleanContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
        // Strip Document Metadata callout
        cleanContent = cleanContent.replace(/> \[!info\] Document Metadata[\s\S]*?(?=\n\n[^>]|$)/i, "");
        // Strip markdown formatting and tags
        cleanContent = cleanContent.replace(/🏷️ Tags: .*?\n/g, '').replace(/[#*`_\[\]>]/g, '').trim();
        
        // Extract a longer excerpt
        const excerpt = cleanContent.slice(0, 200) + (cleanContent.length > 200 ? '...' : '');
        
        nodes.push({ id, name, group, path: '/notes/' + relPath, excerpt });
        
        // Parse wikilinks
        const matches = [...content.matchAll(/\[\[([^\[\]]+)\]\]/g)];
        for (const match of matches) {
          const rawTarget = match[1];
          const targetOriginal = rawTarget.split('|')[0].split('#')[0].trim();
          const targetName = targetOriginal.toLowerCase();
          
          if (targetName) {
            // We push the literal targetName for now, we will resolve it in a second pass
            links.push({ source: id, target: targetName });
            if (!virtualNodesMap.has(targetName)) {
              virtualNodesMap.set(targetName, targetOriginal);
            }
          }
        }
      }
    }
  }

  await walk(baseContentDir);

  // Resolve links using the nameToIdMap
  const resolvedLinks: { source: string, target: string }[] = [];
  const nodeIds = new Set(nodes.map(n => n.id));
  
  for (const link of links) {
    // If the target filename maps to a real path ID, use that
    const resolvedTarget = nameToIdMap.has(link.target) ? nameToIdMap.get(link.target)! : link.target;
    resolvedLinks.push({ source: link.source, target: resolvedTarget });
    
    if (!nodeIds.has(resolvedTarget)) {
      const originalName = virtualNodesMap.get(link.target) || link.target;
      nodes.push({
        id: resolvedTarget,
        name: originalName,
        group: 0,
        path: '/notes/' + link.target, // Make it route to a virtual hub page
        isVirtual: true,
        excerpt: 'This is a structural tag hub connecting related modules across the archive.'
      });
      nodeIds.add(resolvedTarget);
    }
  }

  return NextResponse.json({ nodes, links: resolvedLinks });

}
