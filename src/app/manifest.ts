import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Engram — Computer Science Knowledge Archive & Interactive Simulators",
    short_name: "Project Engram",
    description:
      "Open-source Computer Science academic monograph archive, relational force-directed concept graph, and interactive engineering workbenches.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1017",
    theme_color: "#0d1017",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
