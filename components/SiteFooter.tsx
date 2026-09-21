import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 text-sm text-neutral-600 sm:px-6">
        <p className="font-mono text-xs font-semibold tracking-widest text-black uppercase">
          The Unlikely Lab
        </p>
        <p className="mt-2">Learning the expected.</p>
        <p>Searching for the unexpected.</p>
        <nav aria-label="Footer" className="mt-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
            <li><Link href="/research">Research</Link></li>
            <li><Link href="/publications">Publications</Link></li>
            <li><Link href="/notes">Notes</Link></li>
            <li><Link href="/people">People</Link></li>
            <li><Link href="/code">Code</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/search">Search</Link></li>
            <li><Link href="/feed.xml">RSS</Link></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
          </ul>
        </nav>
        <p className="mt-4 max-w-prose text-[13px] text-neutral-500">
          Independent research in machine learning, density estimation, anomaly
          detection, and collider physics with CMS Open Data.
        </p>
        <p className="mt-2 text-neutral-500">© 2026 Hitesh Rasineni &amp; Bhavishya Chebrolu</p>
      </div>
    </footer>
  );
}

