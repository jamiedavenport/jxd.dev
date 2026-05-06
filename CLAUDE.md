# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo origin

This repo was forked from `policystack.dev` (TanStack Start landing page) and stripped down to bare infra. All product/blog content was removed; the MDX, Shiki, OG-generation, and SEO pipelines were kept intact for re-use. If you find empty manifests or `content/blog/` with no posts, that's expected — the wiring is there, the content isn't.

## Commands

```bash
pnpm dev          # vite dev on http://localhost:3000
pnpm build        # runs `pnpm og` then `vite build` (client + SSR + nitro)
pnpm preview      # serve the .output/ build
pnpm og           # regenerate OG images only
```

There is no test runner and no lint command configured. Type checking happens implicitly via `vite build` (`tsc --noEmit` is not wired separately).

## Stack

TanStack Start (Vite + Nitro + React 19), Tailwind v4, content-collections for MDX, Shiki for syntax highlighting, satori + resvg for OG image generation. File-based routing under `src/routes/`.

## Path aliases

- `#/*` and `@/*` both resolve to `./src/*` (defined in both `tsconfig.json` and `package.json#imports`).
- `content-collections` resolves to `./.content-collections/generated` — the build artifact produced by the `@content-collections/vite` plugin.

## MDX + Shiki codeblock chrome (non-obvious)

Code fences in MDX support `file=` and `tag=` meta strings, e.g.:

````mdx
```ts file="example.ts" tag="server"
const x = 1
```
````

Pipeline:
1. `parseChromeMeta` (`src/lib/rehype-codeblock-chrome.ts`) parses the meta string.
2. `shikiChromeTransformer` writes `data-file` / `data-tag` attributes onto the `<pre>` element.
3. The MDX `pre` component override (`src/components/mdx-components.tsx`) reads those attributes and wraps the block in `WindowFrame` (`src/components/CodeBlock.tsx`) — giving you the macOS-style window chrome with the file name as the title.

For non-MDX usage (e.g. a route loader), call `highlight()` from `src/lib/shiki.ts` — it's a `createServerFn` that returns pre-rendered HTML strings. The highlighter instance is created lazily and cached for the process lifetime. Then pass the HTML to `<CodeBlock html={...} />`.

The custom theme lives at `src/lib/shiki-mono-theme.json` and is used in both the route-loader path and the MDX rehype path.

## OG image generation

`pnpm build` runs `scripts/og/generate.ts` first. It:

- Loads Geist Mono TTFs from `node_modules/geist/dist/fonts/geist-mono` (so `geist` must stay in devDependencies).
- Renders each entry in `scripts/og/manifest.ts` (`staticEntries`) plus one card per `.mdx` file in `content/blog/`.
- Writes PNGs to `public/og/...` and skips re-rendering when the input's content hash (stored in a sibling `.hash` file) is unchanged.
- Templates live in `scripts/og/template.tsx` (`pageCard`, `postCard`).

To add a new static OG image, append to `staticEntries` and rerun `pnpm og`.

## SEO helper

`src/lib/seo.ts` exports `pageMeta({ title, description, path, image?, type?, publishedTime? })` — call it from a route's `head:` to get a consistent set of `<title>`, `description`, OpenGraph, Twitter, and canonical-link tags. Update `SITE_URL` / `SITE_NAME` there when the brand is finalized.

## Content collections

`content-collections.ts` defines a single `posts` collection reading `content/blog/*.mdx`. The schema is intentionally loose (`tag` and `author` are optional `z.string()`) so adding posts doesn't require schema migration. Each post gets `slug`, `body` (compiled MDX), and `readingTime` injected by the transform. Import via `import { allPosts } from "content-collections"`.

## Devtools

`src/routes/__root.tsx` mounts `TanStackDevtools` unconditionally — `@tanstack/devtools-vite` strips it from production bundles automatically. Don't gate it manually.
