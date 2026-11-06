// One-time conversion of the GitBook export into plain GitHub Markdown.
// Run once from the repo root, review the diff, commit. Kept for
// reproducibility; delete after the cutover.
//
//   node scripts/convert-from-gitbook.mjs
//
// What it does, per page: GitBook hint blocks become GitHub alerts, steppers
// become numbered step headings, embeds become bare URLs, file blocks become
// links, HTML figures become Markdown images with the caption as the title,
// HTML tables become GFM tables, custom heading anchors move to an <a id> line
// above the heading, escaped spaces are unescaped, asset paths move from
// .gitbook/assets to assets, and a few broken links are repaired. It also drops
// the junk page and its SUMMARY section and the .gitbook.yaml.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HINT_KIND = { info: "NOTE", success: "TIP", warning: "WARNING", danger: "CAUTION" };

function listMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) listMarkdown(p, out);
    else if (entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function unescapeEntities(s) {
  return s
    .replace(/&#xNAN;/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

// Asset references: ".gitbook/assets/x y.png" in any of GitBook's spellings
// becomes "assets/x%20y.png" (spaces encoded, no angle brackets).
function assetPath(ref) {
  let r = ref.trim();
  if (r.startsWith("<") && r.endsWith(">")) r = r.slice(1, -1);
  r = r.replace(/\.gitbook\/assets\//, "assets/");
  try {
    r = decodeURIComponent(r);
  } catch {
    /* keep as is */
  }
  // Parentheses are encoded too: a ")" inside a Markdown link target ends it.
  return r
    .split("/")
    .map((seg, i, a) => (i === a.length - 1 ? encodeURIComponent(seg).replace(/%2C/g, ",").replace(/\(/g, "%28").replace(/\)/g, "%29") : seg))
    .join("/");
}

function inlineHtmlToMd(s) {
  return s
    .replace(/<a href="([^"]+)">(.*?)<\/a>/g, "[$2]($1)")
    .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
    .replace(/<em>(.*?)<\/em>/g, "*$1*")
    .replace(/<code>(.*?)<\/code>/g, "`$1`")
    .replace(/<sup><sub>(.*?)<\/sub><\/sup>/g, "<sup>$1</sup>")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<p>(.*?)<\/p>/g, "$1 ")
    .replace(/<img [^>]*black check for chart[^>]*>/g, "Yes")
    .replace(/<(?!\/?(sup|sub)\b)[^>]+>/g, "")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
}

// GitBook writes each table as a single line of HTML.
function htmlTableToMd(html) {
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(m =>
    [...m[1].matchAll(/<t[hd]\b([^>]*)>([\s\S]*?)<\/t[hd]>/g)].map(c => ({ attrs: c[1], html: c[2] })),
  );
  if (!rows.length) return html;
  const headerTypes = rows[0].map(c => (/data-type="checkbox"/.test(c.attrs) ? "checkbox" : "text"));
  // Feature matrices mark support with a check-mark image and leave the cell
  // empty otherwise; both forms become Yes / No.
  const usesChecks = /black check for chart/.test(html);
  const cell = (c, i, isBody) => {
    let text = inlineHtmlToMd(unescapeEntities(c.html));
    if (headerTypes[i] === "checkbox") text = text === "true" ? "Yes" : text === "false" ? "No" : text;
    if (usesChecks && isBody && i > 0 && text === "") text = "No";
    return text;
  };
  const header = rows[0].map((c, i) => cell(c, i, false));
  const width = header.length;
  const line = cells => "| " + Array.from({ length: width }, (_, i) => cells[i] ?? "").join(" | ") + " |";
  const out = [line(header), "|" + " --- |".repeat(width)];
  for (const row of rows.slice(1)) out.push(line(row.map((c, i) => cell(c, i, true))));
  return out.join("\n");
}

// <figure><img src alt width><figcaption><p>caption</p></figcaption></figure>
const FIGURE =
  /(<div[^>]*>\s*)?<figure>\s*<img src="([^"]+)"(?: alt="([^"]*)")?(?: width="[^"]*")?(?: height="[^"]*")?\s*\/?>\s*(?:<figcaption>(?:<p>)?([\s\S]*?)(?:<\/p>)?<\/figcaption>)?\s*<\/figure>\s*(<\/div>)?/g;
const DIV_IMG = /<div[^>]*>\s*<img src="([^"]+)"(?: alt="([^"]*)")?(?: width="[^"]*")?\s*\/?>\s*<\/div>/g;

function imageMd(src, alt, caption) {
  const title = caption ? ` "${unescapeEntities(caption).replace(/<[^>]+>/g, "").replace(/"/g, "'").trim()}"` : "";
  return `![${unescapeEntities(alt || "").replace(/"/g, "'")}](${assetPath(src)}${title})`;
}

function relativeTo(fromFile, targetFile) {
  let rel = path.relative(path.dirname(fromFile), targetFile).split(path.sep).join("/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel.replace(/^\.\//, "");
}

function inlineTransforms(line, file, pages, warnings) {
  // Figures and bare images.
  line = line.replace(FIGURE, (_, _d, src, alt, caption) => imageMd(src, alt, caption));
  line = line.replace(DIV_IMG, (_, src, alt) => imageMd(src, alt, ""));

  // Entities and GitBook escapes. A leading or trailing escaped space is an
  // editor artefact, not content.
  line = line.replace(/^(\s*)(?:&#x20;)+/, "$1").replace(/(?:&#x20;)+\s*$/, "");
  line = unescapeEntities(line);
  line = line.replace(/\s+$/, m => (m === "\\" ? m : m.endsWith("\\") ? "\\" : ""));

  // Links.
  line = line.replace(/\]\(\.\/?#([^)]+)\)/g, "](README.md#$1)");
  line = line.replace(/\]\(https:\/\/docs\.rad\.live\/rad\/?([^)#]*)(#[^)]*)?\)/g, (m, p, hash) => {
    const target = resolveDocsPath(p, pages);
    if (!target) {
      warnings.push(`unresolved docs.rad.live link ${m}`);
      return m;
    }
    return `](${relativeTo(file, target)}${hash || ""})`;
  });
  line = line.replace(
    /\]\(https:\/\/app\.gitbook\.com\/[^)]*\/getting-started-creators-studios-publishers\/distribute-your-fast-channel\)/,
    `](${relativeTo(file, path.join(ROOT, "getting-started-creators-studios-publishers/distribute-your-fast-channel.md"))})`,
  );

  // Known-broken links in the source: a GitBook-hosted copy of a video that
  // also lives in assets, an anchor that never existed, and a heading that
  // linked to itself instead of the site.
  line = line.replace(/https:\/\/files\.gitbook\.com\/[^)\s]*selection_bug\.mp4[^)\s]*/g, () =>
    relativeTo(file, path.join(ROOT, ".gitbook/assets/selection_bug.mp4")).replace(".gitbook/assets/", "assets/"),
  );
  line = line.replace(/adding-external-rss-feeds-to-your-library\.md#viewing-feeds-on-rad-tv/g, "adding-external-rss-feeds-to-your-library.md");
  line = line.replace(/^## Visit \[RadTV\.com\]\(rad-tv-for-web\.md#[^)]*\) and start watching now!$/, "## Visit [rad.live](https://rad.live/) and start watching now!");

  // Asset paths in any remaining Markdown links or images.
  line = line.replace(/\]\((<?[^)]*\.gitbook\/assets\/[^)]*>?)\)/g, (_, ref) => `](${assetPath(ref)})`);
  return line;
}

function convertBody(body, file, pages) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let i = 0;
  let step = 0;
  const warnings = [];
  while (i < lines.length) {
    let line = lines[i];

    // Steppers: each step becomes a numbered heading.
    if (/^\s*\{% stepper %\}\s*$/.test(line)) {
      step = 0;
      i++;
      continue;
    }
    if (/^\s*\{% endstepper %\}\s*$/.test(line) || /^\s*\{% endstep %\}\s*$/.test(line)) {
      i++;
      continue;
    }
    if (/^\s*\{% step %\}\s*$/.test(line)) {
      step++;
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      const heading = /^(#{1,6})\s+(.*)$/.exec(lines[j] ?? "");
      if (heading) {
        out.push(`${heading[1]} Step ${step}: ${heading[2].trim()}`);
        i = j + 1;
      } else {
        out.push(`### Step ${step}`);
        out.push("");
        i++;
      }
      continue;
    }

    // Hints: GitHub alert blockquotes.
    const hint = /^(\s*)\{% hint style="(\w+)" %\}\s*$/.exec(line);
    if (hint) {
      const indent = hint[1];
      const kind = HINT_KIND[hint[2]] || "NOTE";
      const bodyLines = [];
      i++;
      while (i < lines.length && !/^\s*\{% endhint %\}\s*$/.test(lines[i])) bodyLines.push(lines[i].slice(indent.length)), i++;
      i++; // endhint
      while (bodyLines.length && bodyLines[bodyLines.length - 1].trim() === "") bodyLines.pop();
      while (bodyLines.length && bodyLines[0].trim() === "") bodyLines.shift();
      out.push(`${indent}> [!${kind}]`);
      for (const b of bodyLines) out.push(b.trim() === "" ? `${indent}>` : `${indent}> ${inlineTransforms(b, file, pages, warnings)}`);
      continue;
    }

    // Embeds: the URL alone on a line, then any caption text.
    const embed = /^(\s*)\{% embed url="([^"]+)" %\}\s*$/.exec(line);
    if (embed) {
      const indent = embed[1];
      out.push(`${indent}${embed[2]}`);
      i++;
      const bodyLines = [];
      let j = i;
      while (j < lines.length && !/^\s*\{% endembed %\}\s*$/.test(lines[j]) && !/\{%/.test(lines[j]) && j - i < 6) bodyLines.push(lines[j]), j++;
      if (j < lines.length && /^\s*\{% endembed %\}\s*$/.test(lines[j])) {
        out.push("");
        for (const b of bodyLines) out.push(b);
        i = j + 1;
      }
      continue;
    }

    // File blocks: a link.
    const fileBlock = /^(\s*)\{% file src="([^"]+)" %\}\s*$/.exec(line);
    if (fileBlock) {
      const indent = fileBlock[1];
      const bodyLines = [];
      i++;
      while (i < lines.length && !/^\s*\{% endfile %\}\s*$/.test(lines[i])) bodyLines.push(lines[i].trim()), i++;
      i++;
      const src = assetPath(fileBlock[2]);
      const label = bodyLines.filter(Boolean).join(" ") || decodeURIComponent(path.basename(src));
      out.push(`${indent}[${label}](${src})`);
      continue;
    }

    // Headings with a custom anchor: the anchor moves to the line above.
    const anchored = /^(#{1,6})\s+(.*?)\s*<a href="#([^"]+)" id="([^"]+)"><\/a>\s*$/.exec(line);
    if (anchored) {
      // The blank line matters: an HTML block runs until a blank line, so
      // without it the heading would be swallowed into the <a> block.
      out.push(`<a id="${anchored[4]}"></a>`);
      out.push("");
      line = `${anchored[1]} ${anchored[2].replace(/^\*\*(.*)\*\*$/, "$1")}`;
    }

    // Tables.
    if (/^\s*<table/.test(line)) {
      let html = line;
      while (!/<\/table>/.test(html) && i + 1 < lines.length) html += "\n" + lines[++i];
      out.push(htmlTableToMd(html));
      i++;
      continue;
    }

    line = inlineTransforms(line, file, pages, warnings);

    if (/\{%/.test(line)) warnings.push(`unconverted block on line ${i + 1}: ${line.trim()}`);
    out.push(line);
    i++;
  }
  return { text: out.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "") + "\n", warnings };
}

function resolveDocsPath(p, pages) {
  const clean = p.replace(/\/$/, "").replace(/\.md$/, "");
  if (clean === "" || clean === "readme") return path.join(ROOT, "README.md");
  for (const candidate of [clean + ".md", clean + "/README.md"]) {
    const abs = path.join(ROOT, candidate);
    if (pages.has(abs)) return abs;
  }
  return null;
}

function convertFile(file, pages) {
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const data = {};
  if (parsed.data.description) data.description = String(parsed.data.description).replace(/\s+/g, " ").trim();
  if (parsed.data.hidden) data.hidden = true;
  const { text, warnings } = convertBody(parsed.content.replace(/^(\r?\n)+/, ""), file, pages);
  const front = Object.keys(data).length ? matter.stringify("", data).trim() + "\n\n" : "";
  fs.writeFileSync(file, front + text);
  return warnings;
}

function main() {
  for (const junk of JUNK_PAGES) {
    const p = path.join(ROOT, junk);
    if (fs.existsSync(p)) {
      fs.rmSync(p);
      const dir = path.dirname(p);
      if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
      console.log("deleted", junk);
    }
  }
  const files = listMarkdown(ROOT).filter(f => path.basename(f) !== "SUMMARY.md");
  const pages = new Set(files);
  let total = 0;
  for (const file of files) {
    const warnings = convertFile(file, pages);
    total++;
    for (const w of warnings) console.log(`WARN ${path.relative(ROOT, file)}: ${w}`);
  }
  // SUMMARY: drop the junk section, keep everything else as it is.
  const summaryPath = path.join(ROOT, "SUMMARY.md");
  let summary = fs.readFileSync(summaryPath, "utf8").replace(/\r\n/g, "\n");
  fs.writeFileSync(summaryPath, summary.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "") + "\n");
  for (const f of [".gitbook.yaml"]) if (fs.existsSync(path.join(ROOT, f))) fs.rmSync(path.join(ROOT, f));
  console.log(`converted ${total} pages`);
}

main();
