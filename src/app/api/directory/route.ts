import { NextResponse } from "next/server";
import { buildCourseDirectoryTree } from "@/lib/vault-index";

export const dynamic = "force-static";

export async function GET() {
  try {
    const tree = await buildCourseDirectoryTree();
    return NextResponse.json(tree);
  } catch {
    return NextResponse.json({ folders: [], files: [] });
  }
}
