import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Graph & Archive",
  description:
    "Interactive force-directed concept graph and curricular directory across 26 Computer Science courses and 559 verified monographs.",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "Knowledge Graph & Archive | PROJECT ENGRAM",
    description:
      "Explore 26 Computer Science courses and 559 verified monographs in a force-directed knowledge graph or structured directory.",
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
