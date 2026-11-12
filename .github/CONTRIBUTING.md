# Contributing to the Rad TV docs

These pages are published at https://rad.live/docs/. Every merged change goes live within a few minutes.

## How to change something

The Rad team edits pages in the docs editor: open a page on rad.live/docs while logged in with your Rad employee account and use "Edit this page". The editor saves drafts as pull requests, shows a preview, and publishes after the `check` workflow passes.

To change something on GitHub instead:

1. Find the page under `pages/`. The file path is the URL: `pages/getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/sideloading.md` is `rad.live/docs/getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/sideloading/`.
2. Edit it on GitHub or in a branch, and open a pull request. The `check` workflow validates titles, links, images, the sidebar and redirects.

For a new page, add the file under its parent's folder: `pages/section/new-page.md`, or `pages/section/parent-page/new-page.md` for a page under another page. It appears at the end of its parent in the sidebar. To change the order, edit `nav.json`.

## Writing rules

- Frontmatter: `title` is the page title (shown as its heading and in the sidebar). `description` is the summary shown in search results; write one, under 160 characters. `hidden: true` keeps a page off the sidebar but still reachable by URL. The body does not repeat the title as an H1.
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

- Images live in `assets/`. Reference them from the repo root and put the caption in the title: `![alt text](/assets/file.png "Caption shown under the image")`. Several images on one line show side by side. Keep images under 2 MB and at most 2000 px wide; screenshots as WebP or PNG.
- Downloads (PDFs, sample files) also live in `assets/`: `[the sample feed](/assets/sample-feed.xml)`. Keep them under 20 MB; video belongs on Rad TV or YouTube, not in the repo.
- Link to another docs page by its address, `[encoding guide](/docs/getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/video-encoding/)`, or by a relative path to its file, `[encoding guide](video-encoding.md)`. Link to a heading with `#heading-text-slug`. The check confirms the page and heading exist.
- A heading that outside links depend on gets a stable anchor above it: `<a id="my-anchor"></a>` on its own line, then a blank line, then the heading.
- A YouTube or Rad TV video link alone on its own line becomes an embedded player. Any other URL alone on a line becomes a link card.
- Allowed inline HTML: `<a id>`, `<br>`, `<sup>`, `<sub>`, `<kbd>`, `<details>`, `<summary>`. Everything else is stripped on the site.
- No em dashes. Use a comma, a colon or a new sentence.

## Renaming or removing a page

The file path is the URL, so a rename or a delete breaks links and search results unless the old URL redirects. Add the old URL and its replacement to `redirects.json`:

```json
{
  "/getting-started-subscribers-viewers/old-name": "/getting-started-subscribers-viewers/new-name"
}
```

The check fails when a URL disappears without a redirect entry. Moving a file without changing its URL (for example `a/b.md` to `a/b/README.md`) needs none.

## Running the check locally

```bash
npm ci
npm run check
```
