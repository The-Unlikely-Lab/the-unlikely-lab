import fs from "fs";
import path from "path";

// Minimal post-build SEO/security audit for the static export in out/.
// Fails the build if critical discoverability files or tags are missing.
const out = path.join(process.cwd(), "out");
const fail = [];
const warn = [];

function mustFile(rel) {
  if (!fs.existsSync(path.join(out, rel))) fail.push(`missing file: ${rel}`);
}
mustFile("sitemap.xml");
mustFile("robots.txt");
mustFile("feed.xml");
mustFile("search-index.json");
mustFile("manifest.webmanifest");
mustFile(".nojekyll");

function checkHtml(rel, checks) {
  const f = path.join(out, rel);
  if (!fs.existsSync(f)) {
    fail.push(`missing html: ${rel}`);
    return;
  }
  const html = fs.readFileSync(f, "utf8");
  for (const [label, re, critical] of checks) {
    if (!re.test(html)) (critical ? fail : warn).push(`${rel}: missing ${label}`);
  }
}

const common = [
  ["canonical", /<link rel="canonical"/i, true],
  ["og:site_name or og:title", /og:(site_name|title)/i, true],
  ["robots meta", /<meta name="robots"/i, false],
  ["json-ld", /application\/ld\+json/i, true],
];
checkHtml("index.html", [...common, ["skip link", /Skip to content/i, false]]);
checkHtml("research/index.html", common);
checkHtml("notes/index.html", common);
checkHtml("publications/index.html", common);
checkHtml("people/index.html", common);
checkHtml("search/index.html", common);

// External-link hygiene on home page markup
{
  const home = path.join(out, "index.html");
  if (fs.existsSync(home)) {
    const html = fs.readFileSync(home, "utf8");
    const ext = [...html.matchAll(/<a[^>]+href="https?:\/\/[^"]+"[^>]*>/gi)];
    const bad = ext.filter((m) => !/rel="[^"]*noopener/i.test(m[0]));
    if (bad.length > 0) warn.push(`home: ${bad.length} external link(s) without rel=noopener`);
  }
}

for (const w of warn) console.warn("SEO WARN:", w);
if (fail.length > 0) {
  console.error("SEO CHECK FAILED:");
  for (const f of fail) console.error(" -", f);
  process.exit(1);
}
console.log("SEO check passed.");
