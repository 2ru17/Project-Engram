import Script from "next/script";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StudyPlanProvider } from "@/components/StudyPlanProvider";
import ProgressCodeModal from "@/components/ProgressCodeModal";
import { AtmosphereProvider } from "@/components/atmosphere/AtmosphereProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://2ru17-project-engram.vercel.app";

export const metadata: Metadata = {
  title: {
    template: "%s | PROJECT ENGRAM",
    default:
      "PROJECT ENGRAM // 銘印 — Computer Science Knowledge Archive & Interactive Simulators",
  },
  description:
    "Project Engram: Open-source Computer Science academic monograph archive, relational force-directed concept graph, and 29 interactive engineering workbenches across Systems, Theory, Networks, Security, and Software Engineering.",
  keywords: [
    "Computer Science",
    "Project Engram",
    "Systems Architecture",
    "Cybersecurity",
    "Network Engineering",
    "Algorithms",
    "Operating Systems",
    "Interactive Simulators",
    "Knowledge Graph",
    "Academic Monographs",
  ],
  authors: [{ name: "2RU17", url: "https://github.com/2ru17" }],
  creator: "2RU17",
  publisher: "Project Engram",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PROJECT ENGRAM // 銘印",
    description:
      "Open-source Computer Science academic monograph archive, relational concept graph, and 29 interactive engineering workbenches.",
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
      "Open-source Computer Science academic monograph archive, relational concept graph, and 29 interactive engineering workbenches.",
    images: ["/twitter-image"],
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
    <html lang="ja" suppressHydrationWarning className="font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Loaded in App Router root layout to bypass Turbopack next/font/google #99114 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:wght@300;400;500;600&family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Shippori+Mincho:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;700&family=Yuji+Boku&display=swap"
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var u = localStorage.getItem('engram-universe') || 'cyber-zen';
                  var t = localStorage.getItem('engram-theme') || 'dark';
                  var p = localStorage.getItem('engram-perf') || 'full';
                  var lightUniverses = { 'neo-brutalism': true, 'minimalism': true, 'broken-grid': true };
                  var darkUniverses = { 'parallax': true };
                  var effectiveTheme = lightUniverses[u] ? 'light' : (darkUniverses[u] ? 'dark' : t);
                  document.documentElement.setAttribute('data-universe', u);
                  document.documentElement.setAttribute('data-theme', effectiveTheme);
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
              url: SITE_URL,
              sameAs: ["https://github.com/2ru17"],
            }),
          }}
        />
        <ThemeProvider>
          <StudyPlanProvider>
            <ScrollProgress />
            <AtmosphereProvider />
            <TopNav />
            <ProgressCodeModal />
            {children}
            <CookieConsentBanner />
            <Analytics />
          </StudyPlanProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
