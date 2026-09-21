import type { ResearchFrontmatter } from "@/lib/content";

const SITE_URL = "https://the-unlikely-lab.github.io/the-unlikely-lab";

export default function ArticleJsonLd({
  slug,
  frontmatter,
}: {
  slug: string;
  frontmatter: ResearchFrontmatter;
}) {
  const pub = frontmatter.publication;
  const json = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub?.title ?? frontmatter.title,
    description: frontmatter.description,
    url: `${SITE_URL}/research/${slug}/`,
    author: (pub?.authors ?? []).map((name) => ({ "@type": "Person", name })),
    publisher: {
      "@type": "ResearchOrganization",
      name: "The Unlikely Lab",
      url: `${SITE_URL}/`,
    },
    ...(pub?.doi ? { doi: pub.doi, sameAs: [`https://doi.org/${pub.doi}`] } : {}),
    keywords: (frontmatter.tags ?? []).join(", "),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
