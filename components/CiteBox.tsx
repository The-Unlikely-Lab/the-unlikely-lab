import Link from "next/link";
import type { ResearchFrontmatter } from "@/lib/content";

function bibtex(slug: string, fm: ResearchFrontmatter): string {
  const key = slug.replace(/[^a-z0-9]+/gi, "");
  const authors = (fm.publication?.authors ?? []).join(" and ");
  const title = fm.publication?.title ?? fm.title;
  const doi = fm.publication?.doi ? `\n  doi = {${fm.publication.doi}},` : "";
  return `@misc{${key},\n  title = {${title}},${authors ? `\n  author = {${authors}},` : ""}\n  howpublished = {The Unlikely Lab},${doi}\n  url = {https://the-unlikely-lab.github.io/the-unlikely-lab/research/${slug}/}\n}`;
}

export default function CiteBox({
  slug,
  frontmatter,
}: {
  slug: string;
  frontmatter: ResearchFrontmatter;
}) {
  const pub = frontmatter.publication;
  if (!pub && !frontmatter.codeUrl) return null;
  return (
    <section aria-label="Cite this work" className="mt-10 border border-neutral-200 bg-neutral-50 px-4 py-4">
      <h2 className="text-base font-semibold">Cite this work</h2>
      {pub?.authors && <p className="mt-1 text-[15px] text-neutral-700">{pub.authors.join(", ")}</p>}
      <p className="mt-0.5 text-[15px] font-medium">{pub?.title ?? frontmatter.title}</p>
      {pub?.doi && (
        <p className="mt-1 font-mono text-sm">
          <a href={`https://doi.org/${pub.doi}`} rel="noopener noreferrer">
            doi:{pub.doi}
          </a>
        </p>
      )}
      <details className="mt-2">
        <summary className="cursor-pointer text-[15px] underline underline-offset-2">
          BibTeX
        </summary>
        <pre className="mt-2 overflow-x-auto border border-neutral-200 bg-white p-3 font-mono text-[13px] leading-5">
          {bibtex(slug, frontmatter)}
        </pre>
      </details>
      <p className="mt-2 text-[14px]">
        <Link href={`/research/${slug}/paper`}>Full HTML article</Link>
      </p>
    </section>
  );
}
