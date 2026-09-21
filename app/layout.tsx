import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://the-unlikely-lab.github.io/the-unlikely-lab";
const SITE_NAME = "The Unlikely Lab";
const SITE_DESC =
  "The Unlikely Lab — an independent research lab for machine learning, density estimation, anomaly detection, and collider physics with CMS Open Data.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Unlikely Lab — Machine Learning for Collider Physics",
    template: "%s | The Unlikely Lab",
  },
  description: SITE_DESC,
  keywords: [
    "The Unlikely Lab",
    "Unlikely Lab physics",
    "machine learning collider physics",
    "density estimation",
    "neural spline flows",
    "anomaly detection CMS Open Data",
    "mono-Z dark matter search",
    "dijet anomaly detection",
    "normalizing flows high-energy physics",
    "Hitesh Rasineni",
    "Bhavishya Chebrolu",
  ],
  authors: [{ name: "Hitesh Rasineni" }, { name: "Bhavishya Chebrolu" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "The Unlikely Lab — Machine Learning for Collider Physics",
    description: SITE_DESC,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unlikely Lab — Machine Learning for Collider Physics",
    description: SITE_DESC,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  category: "research",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ResearchOrganization",
      "@id": `${SITE_URL}/#lab`,
      name: SITE_NAME,
      alternateName: ["Unlikely Lab", "The Unlikely Lab physics"],
      url: `${SITE_URL}/`,
      slogan: "Learning the expected. Searching for the unexpected.",
      description: SITE_DESC,
      foundingDate: "2025",
      founder: [
        { "@type": "Person", name: "Hitesh Rasineni" },
        { "@type": "Person", name: "Bhavishya Chebrolu" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#lab` },
      inLanguage: "en",
    },
  ];
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:underline"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main
          id="main-content"
          className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6"
        >
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        {/* Privacy-friendly analytics (Plausible, no cookies). */}
        <Script
          strategy="lazyOnload"
          data-domain="the-unlikely-lab.github.io"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}

