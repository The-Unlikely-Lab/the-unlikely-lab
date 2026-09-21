import type { MetadataRoute } from "next";
import { getAllResearch, getAllNotes } from "@/lib/content";
import { getPaperSlugs } from "@/lib/paper";

const SITE_URL = "https://the-unlikely-lab.github.io/the-unlikely-lab";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    "",
    "/research",
    "/notes",
    "/code",
    "/about",
    "/publications",
    "/people",
    "/search",
  ].map((p) => ({ url: `${base}${p || "/"}`, lastModified: now }));
  for (const r of getAllResearch()) {
    urls.push({ url: `${base}/research/${r.slug}/`, lastModified: now });
  }
  for (const s of getPaperSlugs()) {
    urls.push({ url: `${base}/research/${s}/paper/`, lastModified: now });
  }
  for (const n of getAllNotes()) {
    urls.push({ url: `${base}/notes/${n.slug}/`, lastModified: now });
  }
  return urls;
}

