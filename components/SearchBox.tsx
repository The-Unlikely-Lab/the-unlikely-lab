"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { withBase } from "@/lib/paths";

type Entry = { title: string; url: string; kind: string; description: string };

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[]>([]);
  useEffect(() => {
    fetch(withBase("/search-index.json"))
      .then((r) => (r.ok ? r.json() : []))
      .then((j) => setIndex(Array.isArray(j) ? j : []))
      .catch(() => {});
  }, []);
  const query = q.trim().toLowerCase();
  const results =
    query.length < 2
      ? []
      : index
          .filter((e) =>
            `${e.title} ${e.description} ${e.kind}`.toLowerCase().includes(query),
          )
          .slice(0, 8);
  return (
    <div className={compact ? "w-full" : "w-full max-w-prose"}>
      <label htmlFor={compact ? "site-search-m" : "site-search"} className="sr-only">
        Search research and notes
      </label>
      <input
        id={compact ? "site-search-m" : "site-search"}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search research, notes, publications…"
        autoComplete="off"
        className="w-full border border-neutral-300 bg-white px-3 py-2 text-[15px] text-black placeholder:text-neutral-400"
      />
      {query.length >= 2 && (
        <ul className="mt-2 divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {results.length === 0 && (
            <li className="px-3 py-2 text-sm text-neutral-500">No matches.</li>
          )}
          {results.map((r) => (
            <li key={r.url} className="px-3 py-2">
              <p className="font-mono text-[11px] tracking-wide text-neutral-500 uppercase">
                {r.kind}
              </p>
              <Link href={r.url} className="text-[15px] font-medium">
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
