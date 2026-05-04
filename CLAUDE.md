# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is Bun (see `bun.lock`).

- `bun install` — install dependencies
- `bun run dev` — start Astro dev server
- `bun run build` — production build (output goes to `dist/`, deployed via Vercel adapter)
- `bun run preview` — preview the production build locally

There is no test runner, linter, or formatter configured. TypeScript uses `astro/tsconfigs/strict` — type checking happens via `astro check` / editor integration, not a script.

## Architecture

Astro 5 static-mostly site for `jxd.dev` (personal site of Jamie Davenport), deployed to Vercel via `@astrojs/vercel`. Tailwind v4 is wired in through the Vite plugin (`@tailwindcss/vite`), not a PostCSS config — global styles and the `@plugin "@tailwindcss/typography"` directive live in `src/styles/global.css`.

### Pages and rendering modes

Pages live in `src/pages/`. Most pages are statically generated. Two things to know:

- `src/pages/contact.astro` opts out of prerendering (`export const prerender = false`) because it handles a POST from an Astro Action. If you change that page, keep that flag — without it the form submission won't work on Vercel.
- `src/pages/blog/[slug].astro` uses `getStaticPaths` against the `blog` content collection, so adding/removing an MDX file under `src/content/blog/` is enough to add/remove a route — no manual route table.

### Content collection

Defined in `src/content.config.ts`. The `blog` collection globs `./src/content/blog/*.mdx` with a Zod schema requiring `title`, `summary`, `date` (coerced), `slug`, and an optional `ranking` (default 50). Posts must include all required frontmatter or the build fails.

### Server-side bits at build time

A few pages do real network work during the build — be aware before assuming the build is purely local:

- `src/components/nav.astro` paginates `api.github.com/users/jamiedavenport/repos` to compute total star count. Wrapped in try/catch so a failure renders without the count rather than breaking the build.
- `src/pages/directory.astro` runs `open-graph-scraper` against a hardcoded list of external URLs to render link cards. Each fetch is try/caught individually.
- `src/actions/index.ts` defines a `contact` Astro Action that sends mail via Resend (`RESEND_API_KEY` env var). This runs on the Vercel serverless adapter, not at build.

### Layout

Every page wraps `src/layouts/BaseLayout.astro`, which owns the two-column shell, header/footer/nav, OG/Twitter meta, the Geist Mono font (loaded via Astro's experimental `fontProviders.fontsource()`), and a third-party analytics script (`databuddy.cc`). New pages should pass `title`, `description`, and `ogUrl` so meta stays accurate.

### Visual conventions

The look is deliberate — monospaced section headings styled like filenames (`PROJECTS.md`, `BLOG.md`, `CONTACT.md`, etc.), gray-on-white, hairline `border-gray-200` dividers, no rounded corners on cards/grids. When adding sections, follow the existing pattern (`<h2 class="font-mono font-medium text-xs text-gray-500 mb-4">SOMETHING.md</h2>`) rather than introducing a new heading style.
