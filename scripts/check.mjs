// Validates the docs before they are published. Runs on every PR (see
// .github/workflows/check.yml) and locally with `npm run check`.
//
// The pages live in docs.config.json's contentDir ("pages"); the sidebar is
// nav.json. A page the sidebar does not list yet (new in the editor) is placed
// under its parent by the site build, so that is not an error. Older checkouts
// keep the pages at the root with SUMMARY.md, and the check still reads them.
//
// Errors fail the check: a sidebar entry whose page does not exist or that is
// listed twice, a page with no title or with two (a `title` in the frontmatter
// and an H1 in the body), a SUMMARY.md label that differs from its page's
// title, a link or anchor that does not resolve, an image that does not exist
// or is too large, a linked file over 20 MB, leftover GitBook markup, or a
// removed URL without a redirect. Warnings are printed but do not fail: a
// missing description, an em dash.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { imageSize } from "image-size";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 2000;
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const NOT_PAGES = new Set(["SUMMARY.md", "CONTRIBUTING.md"]);
const SKIP_DIRS = new Set(["node_modules", "assets", "scripts", ".github", ".git"]);
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, "docs.config.json"), "utf8"));
// "pages", "./pages" and "pages/" all mean pages; "." (or unset) is the repo root.
const CONTENT_DIR = path.posix.normalize(CONFIG.contentDir || ".").replace(/^\.\/|\/+$/g, "") || ".";
const CONTENT = path.join(ROOT, CONTENT_DIR);

const errors = [];
const warnings = [];
const error = (file, msg) => errors.push(`${rel(file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${rel(file)}: ${msg}`);
const rel = f => path.relative(ROOT, f).split(path.sep).join("/");

function listMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) listMarkdown(p, out);
    else if (entry.name.endsWith(".md") && !NOT_PAGES.has(entry.name)) out.push(p);
  }
  return out;
}

// Content-relative "getting-started/foo.md" -> "/getting-started/foo",
// "x/README.md" -> "/x", "README.md" -> "/"
function contentUrl(contentPath) {
  let p = "/" + contentPath.replace(/\.md$/, "");
  if (p.endsWith("/README")) p = p.slice(0, -"/README".length) || "/";
  if (p === "/README") p = "/";
  return p;
}
export function urlPath(file) {
  return contentUrl(path.relative(CONTENT, file).split(path.sep).join("/"));
}

// The sidebar, as { file, label, source }. nav.json holds a tree of
// { page, children } where page is a content-relative path without ".md"
// ("a/b", "a/README"); labels are the pages' titles. SUMMARY.md (older
// checkouts) carries labels that must equal the titles.
function navEntries() {
  const navFile = path.join(ROOT, "nav.json");
  if (!fs.existsSync(navFile)) {
    const text = fs.readFileSync(path.join(ROOT, "SUMMARY.md"), "utf8");
    const entries = [];
    for (const line of text.split(/\r?\n/)) {
      const m = /^(\s*)\* \[([^\]]+)\]\(([^)]+)\)\s*$/.exec(line);
      if (m) entries.push({ label: m[2].trim(), file: path.join(ROOT, m[3]), source: path.join(ROOT, "SUMMARY.md") });
    }
    return entries;
  }
  const entries = [];
  const walkNav = items => {
    for (const item of items || []) {
      entries.push({ label: null, file: navPageFile(item.page), ref: item.page, source: navFile });
      walkNav(item.children);
    }
  };
  walkNav(JSON.parse(fs.readFileSync(navFile, "utf8")).items);
  return entries;
}

// "a/b" -> a/b.md, else a/b/README.md (a README reference may be lower case).
function navPageFile(ref) {
  const p = String(ref || "").replace(/\.md$/i, "").replace(/(^|\/)readme$/i, "$1README");
  const direct = path.join(CONTENT, `${p}.md`);
  return fs.existsSync(direct) ? direct : path.join(CONTENT, p, "README.md");
}

const parser = unified().use(remarkParse).use(remarkGfm);

function analyse(file) {
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const tree = parser.parse(parsed.content);
  const slugger = new GithubSlugger();
  const anchors = new Set();
  const links = [];
  const images = [];
  let h1 = null;
  visit(tree, node => {
    if (node.type === "heading") {
      const text = toString(node);
      anchors.add(slugger.slug(text));
      if (node.depth === 1 && h1 === null) h1 = text.trim();
    }
    // An <a id> line is inline HTML inside a paragraph, so the open and close
    // tags arrive as separate nodes; match the open tag alone.
    if (node.type === "html") for (const m of node.value.matchAll(/<a id="([^"]+)">/g)) anchors.add(m[1]);
    if (node.type === "link" || node.type === "definition") links.push({ url: node.url, line: node.position?.start.line });
    if (node.type === "image") images.push({ url: node.url, line: node.position?.start.line });
  });
  // The title is the frontmatter `title` (pages saved by the editor) or the
  // first H1 (pages written by hand). Never both.
  const fmTitle = typeof parsed.data.title === "string" ? parsed.data.title.trim() : null;
  return { raw, data: parsed.data, h1, title: fmTitle || h1, fmTitle, anchors, links, images };
}

function main() {
  const nav = navEntries();
  const listed = new Map();
  const pages = listMarkdown(CONTENT);
  const info = new Map();
  for (const file of pages) info.set(file, analyse(file));

  for (const entry of nav) {
    const name = entry.ref ?? entry.label;
    if (!info.has(entry.file)) error(entry.source, `entry "${name}" points at a missing page ${rel(entry.file)}`);
    else if (listed.has(entry.file)) error(entry.source, `lists ${rel(entry.file)} twice`);
    listed.set(entry.file, entry);
  }

  for (const [file, page] of info) {
    const entry = listed.get(file);
    if (page.fmTitle && page.h1) error(file, `has both a frontmatter title and an H1 ("${page.h1}"); keep one`);
    if (!page.title) error(file, "no title: add a `title` to the frontmatter or an H1");
    if (entry?.label && page.title && entry.label !== page.title) error(file, `title "${page.title}" differs from SUMMARY label "${entry.label}"`);
    if (!page.data.description) warn(file, "no description in frontmatter");
    if (/\{%|\.gitbook\//.test(page.raw)) error(file, "GitBook markup or .gitbook/ path left over");
    if (page.raw.includes(String.fromCharCode(8212))) warn(file, "contains an em dash");
    // The editor names a new page's file from its title and keeps accented
    // letters and dots, which make awkward addresses ("café-guide-2.0").
    // A folder page is README.md exactly; "readme.md" or "index.md" beside it
    // would be a second page competing for the same address.
    if (/^(readme|index)\.md$/i.test(path.basename(file)) && path.basename(file) !== "README.md")
      error(file, "a page file may not be named readme or index; README.md is the folder's own page");
    if (/[^a-z0-9-]/.test(path.basename(file, ".md")) && path.basename(file) !== "README.md")
      warn(file, "file name has characters other than a-z, 0-9 and hyphens; consider a plainer title before it is linked");

    for (const { url, line } of page.links) {
      // A link to a docs page by its address on the site, "/docs/a/b/" or
      // "https://rad.live/docs/a/b/" (what the editor's users paste from the
      // browser). It must name a page that exists, and its anchor if any.
      const site = /^(?:https:\/\/(?:www\.)?rad\.live)?\/docs(\/[^#?]*)?(?:\?[^#]*)?(#.*)?$/.exec(url);
      if (site) {
        const p = (site[1] || "/").replace(/^\/+|\/+$/g, "");
        const candidates = p ? [`${p}.md`, `${p}/README.md`] : ["README.md"];
        const targetFile = candidates.map(c => path.join(CONTENT, c)).find(f => info.has(f));
        if (!targetFile) {
          error(file, `line ${line}: no docs page at ${url}`);
          continue;
        }
        let hash = site[2] ? site[2].slice(1) : "";
        try {
          hash = decodeURIComponent(hash);
        } catch {
          /* checked as written */
        }
        if (hash && !info.get(targetFile).anchors.has(hash)) error(file, `line ${line}: anchor #${hash} not found in ${rel(targetFile)}`);
        continue;
      }
      if (/^(https?:|mailto:|tel:)/.test(url)) continue;
      // A file in assets/ (a download: PDF, sample feed, zip), linked the way
      // the editor writes it. It must exist and stay a reasonable size.
      if (url.startsWith("/assets/")) {
        let decoded = url.split("#")[0];
        try {
          decoded = decodeURIComponent(decoded);
        } catch {
          /* checked as written */
        }
        const asset = path.join(ROOT, decoded.slice(1));
        if (!fs.existsSync(asset)) error(file, `line ${line}: linked file does not exist: ${url}`);
        else if (fs.statSync(asset).size > MAX_FILE_BYTES)
          error(file, `line ${line}: linked file over 20 MB (${(fs.statSync(asset).size / 1048576).toFixed(1)} MB): ${url}`);
        continue;
      }
      // Any other site path ("/pricing/") is a link to rad.live outside the docs.
      if (url.startsWith("/")) continue;
      const [target, hash] = url.split("#");
      let targetFile = file;
      if (target) {
        targetFile = path.resolve(path.dirname(file), decodeURIComponent(target));
        if (!fs.existsSync(targetFile)) {
          error(file, `line ${line}: link target does not exist: ${url}`);
          continue;
        }
        if (targetFile.endsWith(".md") && !info.has(targetFile) && !NOT_PAGES.has(path.basename(targetFile)))
          error(file, `line ${line}: links to a Markdown file outside the docs: ${url}`);
      }
      if (hash && targetFile.endsWith(".md")) {
        const anchors = info.get(targetFile)?.anchors;
        if (anchors && !anchors.has(hash)) error(file, `line ${line}: anchor #${hash} not found in ${rel(targetFile)}`);
      }
    }

    for (const { url, line } of page.images) {
      if (/^https?:/.test(url)) {
        warn(file, `line ${line}: remote image ${url}`);
        continue;
      }
      // "/assets/x.webp" (what the editor inserts) is relative to the repo
      // root; anything else is relative to the page.
      const decoded = decodeURIComponent(url);
      const target = decoded.startsWith("/assets/")
        ? path.join(ROOT, decoded.slice(1))
        : path.resolve(path.dirname(file), decoded);
      if (!fs.existsSync(target)) {
        error(file, `line ${line}: image does not exist: ${url}`);
        continue;
      }
      const size = fs.statSync(target).size;
      if (size > MAX_IMAGE_BYTES) error(file, `line ${line}: image over 2 MB (${(size / 1048576).toFixed(1)} MB): ${url}`);
      try {
        const dim = imageSize(fs.readFileSync(target));
        if ((dim.width || 0) > MAX_IMAGE_WIDTH) error(file, `line ${line}: image wider than ${MAX_IMAGE_WIDTH}px (${dim.width}px): ${url}`);
      } catch {
        /* not a raster image we can measure (svg etc.) */
      }
    }
  }

  checkRenames();
  checkRedirectTargets();

  for (const w of warnings) console.log("warning: " + w);
  for (const e of errors) console.log("error: " + e);
  console.log(`\n${pages.length} pages, ${errors.length} errors, ${warnings.length} warnings`);
  process.exit(errors.length ? 1 : 0);
}

// Every redirect lands somewhere real: a page in these docs, or another Rad
// site (https on rad.live or a subdomain, such as developers.rad.live, where
// the developer API docs moved). rad.live's build drops any other address.
function checkRedirectTargets() {
  const file = path.join(ROOT, "redirects.json");
  if (!fs.existsSync(file)) return;
  const redirects = JSON.parse(fs.readFileSync(file, "utf8"));
  const liveUrls = new Set(listMarkdown(CONTENT).map(urlPath));
  for (const [from, to] of Object.entries(redirects)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(to)) {
      if (!/^https:\/\/([a-z0-9-]+\.)*rad\.live(\/[^\s]*)?$/.test(to))
        error(file, `"${from}" redirects to ${to}: only https addresses on rad.live or its subdomains are allowed`);
    } else if (!liveUrls.has(to)) error(file, `"${from}" redirects to ${to}, which is not a page`);
    if (liveUrls.has(from)) error(file, `"${from}" is both a page and a redirect`);
  }
}

// A renamed or deleted page changes its URL. The old URL must be in
// redirects.json so links and search results keep working.
function checkRenames() {
  const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : "origin/master";
  let diff = "";
  try {
    diff = execSync(`git diff --name-status --diff-filter=RD ${base}...HEAD -- "*.md"`, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return; // not in a git checkout with that base; CI always is
  }
  const redirects = fs.existsSync(path.join(ROOT, "redirects.json")) ? JSON.parse(fs.readFileSync(path.join(ROOT, "redirects.json"), "utf8")) : {};
  // What matters is the URL, not the file: a page moved without changing its
  // URL (the move under pages/, or README.md <-> folder/README.md) needs no
  // redirect.
  const liveUrls = new Set(listMarkdown(CONTENT).map(urlPath));
  for (const line of diff.split("\n")) {
    const parts = line.split("\t");
    const oldFile = parts[1];
    if (!oldFile || NOT_PAGES.has(path.basename(oldFile)) || oldFile.startsWith(".github/")) continue;
    // A path under the content directory, or at the root before the move.
    const prefix = CONTENT_DIR === "." ? "" : `${CONTENT_DIR}/`;
    const oldUrl = contentUrl(prefix && oldFile.startsWith(prefix) ? oldFile.slice(prefix.length) : oldFile);
    if (liveUrls.has(oldUrl)) continue;
    if (!(oldUrl in redirects)) errors.push(`${oldFile}: its URL "${oldUrl}" is gone, but redirects.json has no entry for it`);
  }
}

main();
