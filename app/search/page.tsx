import type { Metadata } from "next";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "Search",
  description: "Search research studies, notes, and publications at The Unlikely Lab.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div>
      <header className="mb-6 border-b border-neutral-200 pb-6">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">Search</h1>
        <p className="mt-3 max-w-prose text-[16px] leading-7 text-neutral-700">
          Search across research studies, notes, publications, and code at The
          Unlikely Lab.
        </p>
      </header>
      <SearchBox />
    </div>
  );
}
