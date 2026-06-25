import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const POSTS_DIR = join(ROOT, "content/blog");
const PROJECTS_DIR = join(ROOT, "content/projects");
const OUT = join(ROOT, "public/sitemap.xml");

const SITE_URL = "https://jxd.dev";

type Entry = { loc: string; lastmod?: string; priority: string; changefreq: string };

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return data;
}

function loadMdx(dir: string): { slug: string; date?: string }[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const data = parseFrontmatter(readFileSync(join(dir, file), "utf8"));
      return { slug: file.replace(/\.mdx$/, ""), date: data.date };
    });
}

function buildXml(entries: Entry[]): string {
  const urls = entries
    .map((e) => {
      const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${e.loc}</loc>${lastmod}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function main() {
  const posts = loadMdx(POSTS_DIR).sort((a, b) =>
    (a.date ?? "") < (b.date ?? "") ? 1 : -1,
  );
  const projects = loadMdx(PROJECTS_DIR).sort((a, b) =>
    (a.date ?? "") < (b.date ?? "") ? 1 : -1,
  );
  const entries: Entry[] = [
    { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
    ...projects.map((p) => ({
      loc: `${SITE_URL}/project/${p.slug}`,
      lastmod: p.date,
      changefreq: "monthly",
      priority: "0.8",
    })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/writing/${p.slug}`,
      lastmod: p.date,
      changefreq: "yearly",
      priority: "0.7",
    })),
  ];
  writeFileSync(OUT, buildXml(entries));
  console.log(`sitemap: wrote ${entries.length} URLs to public/sitemap.xml`);
}

main();
