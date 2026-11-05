# Contributing to the Rad TV docs

These pages are published at https://rad.live/docs/. Every merged change goes live within about twenty minutes.

## How to change something

1. Open the page on rad.live/docs and use the "Edit this page" link, or find the file here. The file path is the URL: `getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/sideloading.md` is `rad.live/docs/getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/sideloading/`.
2. Edit it on GitHub or in a branch, and open a pull request. The `check` workflow validates links, images and structure. A maintainer reviews and merges.

For a new page: add the file, add a line to `SUMMARY.md` where it belongs in the navigation, and give it a `description`.

## Writing rules

- The first line after the frontmatter is the H1. It is the page title and must match the label in `SUMMARY.md`.
- Frontmatter has two fields. `description` is the summary shown in search results (write one, keep it under 160 characters). `hidden: true` keeps a page off the navigation but still reachable by URL.
- Plain GitHub Markdown. Code fences carry a language. Tables are GitHub tables.
- Callouts use GitHub alerts:

  ```markdown
  > [!NOTE]
  > Something useful to know.

  > [!TIP]
  > A shortcut.

  > [!WARNING]
  > Something that can go wrong.

  > [!CAUTION]
  > Something destructive.
  ```

- Images live in `assets/`. Reference them with a relative path, and put the caption in the title: `![alt text](../assets/file.png "Caption shown under the image")`. Keep images under 2 MB and at most 2000 px wide; screenshots as WebP or PNG.
- Links between pages are relative paths to the `.md` file: `[encoding guide](video-encoding.md)`, `[the PS5 section](../rad-tv-for-ps5-ps-vr2/README.md)`. Link to a heading with `#heading-text-slug`.
- A heading that outside links depend on gets a stable anchor above it: `<a id="my-anchor"></a>` on its own line, then a blank line, then the heading.
- A YouTube link alone on its own line becomes an embedded player. Any other URL alone on a line becomes a link card.
- Allowed inline HTML: `<a id>`, `<br>`, `<sup>`, `<sub>`, `<kbd>`, `<details>`, `<summary>`. Everything else is stripped on the site.
- No em dashes. Use a comma, a colon or a new sentence.

## Renaming or removing a page

The file path is the URL, so a rename or a delete breaks links and search results unless the old URL redirects. Add the old path and its replacement to `redirects.json`:

```json
{
  "/getting-started-subscribers-viewers/old-name": "/getting-started-subscribers-viewers/new-name"
}
```

The check fails on a rename without a redirect entry.

## Running the check locally

```bash
npm ci
npm run check
```
