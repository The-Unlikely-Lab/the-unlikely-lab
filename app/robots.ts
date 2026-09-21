import type { MetadataRoute } from "next";

const SITE_URL = "https://the-unlikely-lab.github.io/the-unlikely-lab";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
