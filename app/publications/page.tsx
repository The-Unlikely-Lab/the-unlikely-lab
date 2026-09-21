import type { Metadata } from "next";
import Link from "next/link";
import { getAllResearch } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Publications from The Unlikely Lab — preprints on mono-Z dark matter searches, hadronic Z sensitivity, and dijet anomaly detection with CMS Open Data.",
  alternates: { canonical: "/publications" },
};

export default function PublicationsPage() {
  const research = getAllResearch();
  const items = research.map((r) => ({
    title: r.publication?.title ?? r.title,
    authors: r.publication?.authors ?? [],
    venue: r.publication?.journal,
    doi: r.publication?.doi,
    preprint: r.publication?.preprint,
    slug: r.slug,
    description: r.description,
  }));
  return (
    <div>
      <header className="mb-8 border-b border-neutral-200 pb-6">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">Publications</h1>
        <p className="mt-3 max-w-prose text-[16px] leading-7 text-neutral-700">
          Preprints and manuscripts from The Unlikely Lab on machine learning
          for collider physics, density estimation, and anomaly detection.
        </p>
      </header>
      <ul className="divide-y divide-neutral-200">
        {items.map((p) => (
          <li key={p.slug} className="py-5">
            <Link href={`/research/${p.slug}`} className="text-[17px] font-medium">
              {p.title}
            </Link>
            {p.authors.length > 0 && (
              <p className="mt-1 text-[15px] text-neutral-700">{p.authors.join(", ")}</p>
            )}
            <p className="mt-1 max-w-prose text-[15px] leading-6 text-neutral-600">
              {p.venue ?? "Preprint"}
              {p.doi ? ` · DOI: ${p.doi}` : ""}
            </p>
            <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm">
              <Link href={`/research/${p.slug}/paper`}>HTML</Link>
              {p.preprint && (
                <a href={p.preprint} rel="noopener noreferrer">Preprint</a>
              )}
              {p.doi && (
                <a href={`https://doi.org/${p.doi}`} rel="noopener noreferrer">DOI</a>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
