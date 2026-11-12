# Rad TV docs

The source of [rad.live/docs](https://rad.live/docs/). Every merge to `master` is published to the site within a few minutes.

- `pages/` holds the docs pages, one Markdown file each. A page's path is its address: `pages/a/b.md` and `pages/a/b/README.md` are both served at `rad.live/docs/a/b/`.
- `nav.json` is the sidebar: the order and nesting of the pages. A page it does not list appears at the end of its parent section.
- `assets/` holds images and downloadable files.
- `redirects.json` sends old addresses to new ones.

The Rad team edits these pages in the docs editor at rad.live/docs-edit/. To change something on GitHub instead, see [the contributing guide](.github/CONTRIBUTING.md). Every pull request runs `npm run check`, which validates titles, links, images, the sidebar and redirects.
