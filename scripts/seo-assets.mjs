import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const outDir = path.join(root, "public");

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let currentKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const v = kv[2].trim();
      if (v === "" || v === "[" || v === "{") {
        data[currentKey] = [];
      } else {
        data[currentKey] = v.replace(/^["']|["']$/g, "");
      }
    } else {
      const item = line.match(/^\s*-\s*(.*)$/);
      if (item && currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        data[currentKey].push(item[1].replace(/^["']|["']$/g, ""));
      }
    }
  }
  return { data, body: raw.slice(m[0].length) };
}

function readResearch() {
  const dir = path.join(root, "content", "research");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const f = path.join(dir, d.name, "index.mdx");
      if (!fs.existsSync(f)) return null;
      const { data } = parseFrontmatter(fs.readFileSync(f, "utf8"));
      return { slug: d.name, title: data.title ?? d.name, description: data.description ?? "", tags: Array.isArray(data.tags) ? data.tags : [] };
    })
    .filter(Boolean)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function readNotes() {
  const dir = path.join(root, "content", "notes");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data } = parseFrontmatter(raw);
      const slug = path.basename(f, path.extname(f));
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? data.category ?? "",
        category: data.category ?? "Notes",
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

const SITE = "https://the-unlikely-lab.github.io/the-unlikely-lab";
const research = readResearch();
const notes = readNotes();

// search-index.json (consumed by SearchBox via withBase("/search-index.json"))
const entries = [
  { title: "The Unlikely Lab", url: "/", kind: "lab", description: "Machine learning, density estimation, anomaly detection, collider physics" },
  { title: "Research", url: "/research", kind: "section", description: "Density estimation and anomaly detection with CMS Open Data" },
  { title: "Publications", url: "/publications", kind: "section", description: "Preprints from The Unlikely Lab" },
  { title: "Notes", url: "/notes", kind: "section", description: "Mathematical and physics notebook" },
  { title: "People", url: "/people", kind: "section", description: "Hitesh Rasineni and Bhavishya Chebrolu" },
  { title: "Code", url: "/code", kind: "section", description: "Analysis pipelines and reproducibility" },
  { title: "About", url: "/about", kind: "section", description: "About The Unlikely Lab" },
];
for (const r of research) {
  entries.push({ title: r.title, url: `/research/${r.slug}`, kind: "research", description: `${r.description} ${r.tags.join(" ")}` });
  entries.push({ title: `${r.title} — full paper`, url: `/research/${r.slug}/paper`, kind: "paper", description: r.description });
}
for (const n of notes) {
  entries.push({ title: n.title, url: `/notes/${n.slug}`, kind: `note · ${n.category}`, description: `${n.description} ${n.tags.join(" ")}` });
}
fs.writeFileSync(path.join(outDir, "search-index.json"), JSON.stringify(entries));

// feed.xml (RSS 2.0)
const items = [
  { loc: `${SITE}/`, title: "The Unlikely Lab", desc: "Machine learning for collider physics" },
  { loc: `${SITE}/research/`, title: "Research", desc: "Research studies" },
  { loc: `${SITE}/publications/`, title: "Publications", desc: "Preprints" },
  { loc: `${SITE}/notes/`, title: "Notes", desc: "Scientific notebook" },
  { loc: `${SITE}/people/`, title: "People", desc: "Researchers" },
  ...research.map((r) => ({ loc: `${SITE}/research/${r.slug}/`, title: r.title, desc: r.description })),
  ...notes.map((n) => ({ loc: `${SITE}/notes/${n.slug}/`, title: n.title, desc: n.description })),
];
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0"><channel>` +
  `<title>The Unlikely Lab</title><link>${SITE}/</link>` +
  `<description>Research in machine learning, density estimation, anomaly detection, and collider physics.</description>` +
  items.map((i) => `<item><title>${esc(i.title)}</title><link>${esc(i.loc)}</link><guid>${esc(i.loc)}</guid><description>${esc(i.desc)}</description></item>`).join("") +
  `</channel></rss>`;
fs.writeFileSync(path.join(outDir, "feed.xml"), xml);
console.log(`seo-assets: wrote search-index.json (${entries.length} entries) + feed.xml (${items.length} items)`);
