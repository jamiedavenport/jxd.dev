# jxd.dev

The JXD Ltd website. Built with Astro and Tailwind CSS, managed with Bun, and deployed to Cloudflare Workers as static assets. It mirrors the setup of `jamiedavenport.me`.

## Setup

Install [mise](https://mise.jdx.dev/getting-started.html), then run:

```sh
mise trust
mise install
bun install --frozen-lockfile
bun run dev
```

`mise.toml` pins Bun and Node.js. The development server runs at `http://localhost:4321`.

## Commands

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `bun run dev`          | Start the Astro development server              |
| `bun run check`        | Check Astro and TypeScript files                |
| `bun run format`       | Check formatting                                |
| `bun run format:fix`   | Fix formatting                                  |
| `bun run lint`         | Run type-aware linting                          |
| `bun run lint:fix`     | Apply lint fixes                                |
| `bun run build`        | Build the static site into `dist/`              |
| `bun run preview`      | Preview the production build locally            |
| `bun run deploy:check` | Check, build, and dry-run Cloudflare deployment |
| `bun run deploy`       | Check, build, and deploy to Cloudflare Workers  |

## Deployment

`wrangler.jsonc` deploys `dist/` to the Worker named `jxd-dev` with a custom 404 page. `jxd.dev` and `www.jxd.dev` are both custom domains and both serve the site. Canonical links use `https://jxd.dev`. `public/_redirects` sends retired URLs to the homepage.

For noninteractive deployment, set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in `mise.local.toml` (gitignored) or the deployment environment.

## Editing

- `src/pages/index.astro`: homepage
- `src/content/blog/<slug>/index.mdx`: posts, served at `/blog/<slug>/`
- `src/content/work/<slug>/index.mdx`: case studies, listed in the homepage table and served at `/work/<slug>/`
- `src/lib/policystack.ts`: PolicyStack config for `/privacy/` and `/cookies/`
- `src/layouts/Layout.astro`: shared document, metadata and analytics
- `public/`: assets copied directly into the build

Post frontmatter:

```yaml
---
title: "My article"
description: "Shown in the header, search results and link previews."
publishedAt: 2026-09-08
updatedAt: 2026-09-10 # Optional
draft: true # Optional; drafts only appear in development
---
```

Case study frontmatter adds `client`, `summary` (the table line), `icon` (a square image in `public/images/`) and an optional `website`.
