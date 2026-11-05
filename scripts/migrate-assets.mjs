// One-time asset migration, run after convert-from-gitbook.mjs:
//   1. moves .gitbook/assets to assets (git sees a rename),
//   2. deletes files no page references (history keeps them),
//   3. shrinks large screenshots: anything wider than 2000 px is resized, and
//      any PNG or JPEG over 400 KB becomes a WebP at quality 85; references in
//      the pages are rewritten to the new names.
//
//   node scripts/migrate-assets.mjs            # do it
//   node scripts/migrate-assets.mjs --dry-run  # only report

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry-run");
const OLD_DIR = path.join(ROOT, ".gitbook", "assets");
const ASSETS_DIR = path.join(ROOT, "assets");
const MAX_WIDTH = 2000;
const CONVERT_OVER_BYTES = 400 * 1024;

function listMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "assets") continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) listMarkdown(p, out);
    else if (entry.name.endsWith(".md") && entry.name !== "CONTRIBUTING.md") out.push(p);
  }
  return out;
}

// Every "assets/<name>" reference in the pages, decoded to a file name.
function referencedNames(pages) {
  const names = new Set();
  for (const file of pages) {
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(/\]\((?:\.\.\/)*assets\/([^)\s"]+)/g)) names.add(decodeURIComponent(m[1]));
  }
  return names;
}

function encodeName(name) {
  return encodeURIComponent(name).replace(/%2C/g, ",").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

async function main() {
  if (fs.existsSync(OLD_DIR)) {
    if (!DRY) {
      fs.renameSync(OLD_DIR, ASSETS_DIR);
      if (fs.readdirSync(path.join(ROOT, ".gitbook")).length === 0) fs.rmdirSync(path.join(ROOT, ".gitbook"));
    }
    console.log("moved .gitbook/assets to assets");
  }
  const pages = listMarkdown(ROOT).filter(f => path.basename(f) !== "SUMMARY.md");
  const referenced = referencedNames(pages);
  const DIR = fs.existsSync(ASSETS_DIR) ? ASSETS_DIR : OLD_DIR;
  const all = fs.readdirSync(DIR);

  const orphans = all.filter(name => !referenced.has(name));
  let orphanBytes = 0;
  for (const name of orphans) {
    orphanBytes += fs.statSync(path.join(DIR, name)).size;
    if (!DRY) fs.rmSync(path.join(DIR, name));
  }
  console.log(`orphans: ${orphans.length} files, ${(orphanBytes / 1048576).toFixed(1)} MB`);
  fs.writeFileSync(path.join(ROOT, "scripts", "orphan-assets.txt"), orphans.sort().join("\n") + "\n");

  const missing = [...referenced].filter(name => !all.includes(name));
  if (missing.length) console.log("MISSING referenced files:\n  " + missing.join("\n  "));

  const renames = new Map();
  let before = 0;
  let after = 0;
  for (const name of all.filter(n => referenced.has(n))) {
    const file = path.join(DIR, name);
    const ext = path.extname(name).toLowerCase();
    const size = fs.statSync(file).size;
    before += size;
    if (![".png", ".jpg", ".jpeg"].includes(ext)) {
      after += size;
      continue;
    }
    const meta = await sharp(file).metadata();
    const tooWide = (meta.width || 0) > MAX_WIDTH;
    const tooBig = size > CONVERT_OVER_BYTES;
    if (!tooWide && !tooBig) {
      after += size;
      continue;
    }
    const newName = name.replace(/\.(png|jpe?g)$/i, ".webp");
    const out = path.join(DIR, newName);
    let pipeline = sharp(file);
    if (tooWide) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    const buffer = await pipeline.webp({ quality: 85 }).toBuffer();
    after += buffer.length;
    console.log(`${(size / 1048576).toFixed(1)} MB -> ${(buffer.length / 1024).toFixed(0)} KB  ${name}`);
    if (!DRY) {
      fs.writeFileSync(out, buffer);
      if (out !== file) fs.rmSync(file);
    }
    if (newName !== name) renames.set(name, newName);
  }
  console.log(`referenced assets: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);

  if (!DRY && renames.size) {
    for (const file of pages) {
      let text = fs.readFileSync(file, "utf8");
      let changed = false;
      for (const [from, to] of renames) {
        const re = new RegExp("(assets/)" + encodeName(from).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=[)\\s\"])", "g");
        if (re.test(text)) {
          text = text.replace(re, "$1" + encodeName(to));
          changed = true;
        }
      }
      if (changed) fs.writeFileSync(file, text);
    }
    console.log(`rewrote references for ${renames.size} renamed files`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
