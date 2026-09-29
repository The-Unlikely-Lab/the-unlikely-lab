import Link from "next/link";
export type Crumb = { label: string; href?: string };
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-neutral-500 dark:text-neutral-400">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li><Link href="/" className="underline decoration-neutral-300 underline-offset-2 hover:text-black dark:hover:text-white">Home</Link></li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">/</span>
            {c.href ? (<Link href={c.href} className="underline decoration-neutral-300 underline-offset-2 hover:text-black dark:hover:text-white">{c.label}</Link>) : (<span aria-current="page" className="text-neutral-700 dark:text-neutral-300">{c.label}</span>)}
          </li>
        ))}
      </ol>
    </nav>
  );
}

