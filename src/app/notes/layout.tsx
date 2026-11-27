import type { Metadata } from "next";
import { TOTAL_COURSE_COUNT, TOTAL_MONOGRAPH_COUNT } from "@/lib/course-registry";

export const metadata: Metadata = {
  title: "Knowledge Graph & Archive",
  description:
    `Interactive force-directed concept graph and curricular directory across ${TOTAL_COURSE_COUNT} Computer Science courses and ${TOTAL_MONOGRAPH_COUNT} verified monographs.`,
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "Knowledge Graph & Archive | PROJECT ENGRAM",
    description:
      `Explore ${TOTAL_COURSE_COUNT} Computer Science courses and ${TOTAL_MONOGRAPH_COUNT} verified monographs in a force-directed knowledge graph or structured directory.`,
    type: "website",
    url: "/notes",
  },
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
