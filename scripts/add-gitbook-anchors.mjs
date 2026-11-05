// One-time: GitBook's heading ids differ from github-slugger's in a few ways
// (it keeps dots, collapses "/" to one hyphen, numbers duplicates on its own
// scheme, and our step headings gained a "Step N:" prefix). Any deep link into
// the old docs would break at those headings. This fetches the live GitBook
// id of every h2/h3 and, where it differs from the id we emit, adds a stable
// <a id> anchor above the heading. Run once before cutover; commit the result.
//
//   node scripts/add-gitbook-anchors.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OLD = "https://docs.rad.live/rad";
const SKIP = new Set(["SUMMARY.md", "CONTRIBUTING.md"]);

function listMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", "assets", "scripts", ".github", ".git"].includes(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) listMarkdown(p, out);
    else if (entry.name.endsWith(".md") && !SKIP.has(entry.name)) out.push(p);
  }
  return out;
}

function oldUrl(file) {
  let rel = path.relative(ROOT, file).split(path.sep).join("/").replace(/\.md$/, "");
  if (rel.endsWith("/README")) rel = rel.slice(0, -"/README".length);
  if (rel === "README") rel = "";
  return rel ? `${OLD}/${rel}` : OLD;
}

const norm = s =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/^step \d+:\s*/i, "")
    .replace(/[*_`]/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

async function main() {
  let added = 0;
  const unmatched = [];
  for (const file of listMarkdown(ROOT)) {
    const url = oldUrl(file);
    let html;
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (rad-docs anchors)" }, signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
    } catch (e) {
      console.log("fetch failed", url, e.message);
      process.exitCode = 1;
      continue;
    }
    const main = /<main[^>]*>([\s\S]*)<\/main>/.exec(html);
    const body = main ? main[1] : html;
    const old = [...body.matchAll(/<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)].map(m => ({ id: m[2], text: norm(m[3]) }));

    const raw = fs.readFileSync(file, "utf8");
    const parsed = matter(raw);
    const lines = parsed.content.split("\n");
    const slugger = new GithubSlugger();
    const ours = new Set(raw.match(/<a id="([^"]+)">/g)?.map(a => /id="([^"]+)"/.exec(a)[1]) || []);
    const headings = [];
    lines.forEach((line, i) => {
      const m = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
      if (!m) return;
      const text = m[2].replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").trim();
      const id = slugger.slug(text);
      ours.add(id);
      headings.push({ line: i, text: norm(m[2]), id });
    });

    const inserts = [];
    for (const h of old) {
      if (ours.has(h.id)) continue;
      const candidates = headings.filter(x => x.text === h.text);
      if (candidates.length !== 1) {
        unmatched.push(`${path.relative(ROOT, file)}: #${h.id} ("${h.text}") -> ${candidates.length} candidates`);
        continue;
      }
      inserts.push({ line: candidates[0].line, id: h.id });
    }
    if (!inserts.length) continue;
    inserts.sort((a, b) => b.line - a.line);
    for (const ins of inserts) {
      const before = lines[ins.line - 1] ?? "";
      const anchor = `<a id="${ins.id}"></a>`;
      if (before.trim() === anchor) continue;
      lines.splice(ins.line, 0, anchor, "");
      added++;
    }
    const front = Object.keys(parsed.data).length ? matter.stringify("", parsed.data).trim() + "\n\n" : "";
    fs.writeFileSync(file, front + lines.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "") + "\n");
    console.log(`${path.relative(ROOT, file)}: +${inserts.length} anchors`);
  }
  for (const u of unmatched) console.log("UNMATCHED " + u);
  console.log(`added ${added} anchors, ${unmatched.length} unmatched`);
}

main();
