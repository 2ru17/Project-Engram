import Script from "next/script";
import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  Cinzel_Decorative,
  Shippori_Mincho,
  Yuji_Boku,
  Cormorant_Garamond,
  Geist,
} from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AtmosphereProvider } from "@/components/atmosphere/AtmosphereProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  variable: "--font-zen-display",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-zen-decor",
  weight: ["700", "900"],
  subsets: ["latin"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-zen-serif",
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  preload: false,
});

const yujiBoku = Yuji_Boku({
  variable: "--font-zen-brush",
  weight: ["400"],
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-wuxia-primary",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PROJECT ENGRAM",
    default: "PROJECT ENGRAM // 銘印",
  },
  description:
    "Project Engram — Academic Knowledge Vault, Relational Concept Graph, and Computer Science Monograph Archive",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://2ru17-project-engram.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PROJECT ENGRAM // 銘印",
    description:
      "Academic Knowledge Vault, Relational Concept Graph, and Computer Science Monograph Archive",
    siteName: "Project Engram",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Project Engram // 銘印 - Computer Science Knowledge Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROJECT ENGRAM // 銘印",
    description:
      "Academic Knowledge Vault, Relational Concept Graph, and Computer Science Monograph Archive",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        geist.variable,
        cinzel.variable,
        cinzelDecorative.variable,
        shipporiMincho.variable,
        yujiBoku.variable,
        cormorant.variable
      )}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('engram-theme') || 'dark';
                  var p = localStorage.getItem('engram-perf') || 'full';
                  document.documentElement.setAttribute('data-theme', t);
                  document.documentElement.setAttribute('data-perf', p);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "2RU17",
              jobTitle: "Computer Science & Security Scholar",
              url: "https://project-engram-2ru17.vercel.app",
              sameAs: ["https://github.com/2ru17"],
            }),
          }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <AtmosphereProvider />
          <TopNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
