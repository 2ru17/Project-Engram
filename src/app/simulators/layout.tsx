import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive CS Simulators",
  description:
    "29 curriculum-mapped Computer Science interactive engineering workbenches covering RISC-V pipelines, virtual memory paging, TCP congestion control, cryptography, B+ trees, automata, and electronic circuits.",
  alternates: {
    canonical: "/simulators",
  },
  openGraph: {
    title: "Interactive CS Simulators | PROJECT ENGRAM",
    description:
      "29 interactive Computer Science workbenches across Systems, Networking, Cybersecurity, Theory, and Software Engineering.",
    type: "website",
    url: "/simulators",
  },
};

export default function SimulatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
