import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  getAllResearch,
  getResearch,
  type ResearchFrontmatter,
} from "@/lib/content";
import { getPaperSlugs } from "@/lib/paper";
import { mdxComponents } from "@/components/MdxComponents";
import ResearchHeader from "@/components/ResearchHeader";
import PublicationInfo from "@/components/PublicationInfo";
import CiteBox from "@/components/CiteBox";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import { withBase } from "@/lib/paths";

const SITE_URL = "https://the-unlikely-lab.github.io/the-unlikely-lab";

export function generateStaticParams() {
  return getAllResearch().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getResearch(slug);
  if (!doc) return {};
  const fm = doc.frontmatter as ResearchFrontmatter;
  const canonical = `/research/${slug}`;
  const authors = fm.publication?.authors?.map((name) => ({ name }));
  return {
    title: fm.title,
    description: fm.description,
    keywords: fm.tags,
    authors,
    alternates: { canonical },
    openGraph: {
      title: `${fm.title} | The Unlikely Lab`,
      description: fm.description,
      type: "article",
      url: canonical,
      authors: fm.publication?.authors,
    },
    other: {
      ...(fm.publication?.title
        ? { "citation_title": fm.publication.title }
        : { "citation_title": fm.title }),
      ...(fm.publication?.authors
        ? { "citation_author": fm.publication.authors }
        : {}),
      ...(fm.publication?.doi
        ? {
            "citation_doi": fm.publication.doi,
            "citation_pdf_url": `${SITE_URL}/research/${slug}/assets/paper.pdf`,
          }
        : {}),
    },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paperSlugs = getPaperSlugs();
  const doc = getResearch(slug);
  if (!doc) notFound();
  const frontmatter = doc.frontmatter as ResearchFrontmatter;

  // Full HTML article is available when the paper build artifacts exist
  const paperAvailable = paperSlugs.includes(slug);

  const { content } = await compileMDX({
    source: doc.body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  return (
    <article>
      <ArticleJsonLd slug={slug} frontmatter={frontmatter} />
      <p className="mb-6 text-sm">
        <Link href="/research">← All research</Link>
      </p>
      <ResearchHeader frontmatter={frontmatter} />
      <PublicationInfo publication={frontmatter.publication} />

      {paperAvailable && (
        <section className="mb-10 border border-neutral-200 bg-neutral-50 px-4 py-4">
          <h2 className="text-base font-semibold">Read the full paper</h2>
          <p className="mt-1 text-[15px] text-neutral-700">
            The complete manuscript is available as a native HTML article, with
            rendered equations, figures, tables, and linked references.
          </p>
          <p className="mt-3 flex gap-3 font-mono text-sm">
            <Link
              href={`/research/${slug}/paper`}
              className="border border-neutral-800 px-3 py-1 no-underline hover:bg-neutral-100"
            >
              HTML
            </Link>
            <a
              href={withBase(`/research/${slug}/assets/paper.pdf`)}
              className="border border-neutral-300 px-3 py-1 no-underline hover:bg-neutral-100"
            >
              PDF
            </a>
          </p>
        </section>
      )}

      <div className="mdx">{content}</div>

      <CiteBox slug={slug} frontmatter={frontmatter} />

      {(frontmatter.codeUrl || frontmatter.dataUrl) && (
        <footer className="mt-12 border-t border-neutral-200 pt-5 text-[15px]">
          <h2 className="text-base font-semibold">Code and data</h2>
          <ul className="mt-2 space-y-1">
            {frontmatter.codeUrl && (
              <li>
                Code:{" "}
                <a href={frontmatter.codeUrl} rel="noopener noreferrer">
                  {frontmatter.codeUrl}
                </a>
              </li>
            )}
            {frontmatter.dataUrl && (
              <li>
                Data:{" "}
                <a href={frontmatter.dataUrl} rel="noopener noreferrer">
                  {frontmatter.dataUrl}
                </a>
              </li>
            )}
          </ul>
        </footer>
      )}

      <footer className="mt-10 text-sm">
        <Link href="/research">← All research</Link>
      </footer>
    </article>
  );
}
