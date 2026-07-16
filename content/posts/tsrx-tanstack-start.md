---
title: "TSRX in TanStack Start: what we like, and three bugs we filed"
lane: Build log
summary: TanStack Start is our default for new TypeScript projects. We paired it with TSRX, a JSX successor built for co-located structure and AI-native codebases, and stress-tested every language feature. Client-side it's a clear win. SSR has real seams, and we're filing them upstream.
date: 2026-07-16
tags: [typescript, tanstack, react, ai-native, build-log]
featured: true
---

[TanStack Start](https://tanstack.com/start) is our default for new TypeScript projects: file-based routing, SSR, and type safety that actually holds together end to end. So when we came across [TSRX](https://tsrx.dev), a spiritual successor to JSX that compiles to React, we wanted to see how it held up inside the stack we already reach for.

This is both things at once: a tutorial for wiring TSRX into TanStack Start, and a write-up of why we rate it. We built a stress-test app that exercises every TSRX language feature against TanStack Start's SSR pipeline, one route per feature. The [repo](https://github.com/jamiedavenport/example-tsrx-tanstack) is public and there's a [live demo](https://tanstack-start-app.jxd.workers.dev) if you want to poke at it yourself.

## Why we like TSRX

JSX has always drawn a hard line: components are functions, and inside a function's return statement, control flow has to happen as expressions. That's why every non-trivial component ends up with a ternary for conditionals and a `.map()` for lists, styling shipped off to a separate file or a `css` template string, and locals threaded through render helpers just to keep the JSX readable.

TSRX drops that constraint. JSX elements are statements, not expressions, so `if`, `for`, `switch`, and `try` become real control flow inside the template body, styles live in a `<style>` block scoped to the component, and locals sit right next to the markup that uses them. Nothing about React's runtime semantics changes. It compiles down to the same component tree.

Take a user list that needs per-row status badges and an empty state. In JSX, a `@switch`-shaped branch has no statement form, so the status-to-class and status-to-label mapping moves into lookup objects, the badge becomes its own component just to hold that logic, and scoped styling isn't a thing JSX has at all, so it moves to a CSS module in a separate file:

```tsx
// JSX — UserList.tsx
import styles from "./UserList.module.css";

type User = { id: number; name: string; status: "active" | "invited" | "suspended" };

const BADGE_CLASS: Record<User["status"], string> = {
  active: styles.badgeActive,
  invited: styles.badgeInvited,
  suspended: styles.badgeSuspended,
};
const BADGE_TEXT: Record<User["status"], string> = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
};

function Badge({ status }: { status: User["status"] }) {
  return <span className={BADGE_CLASS[status]}>{BADGE_TEXT[status]}</span>;
}

export function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p className={styles.empty}>No users yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id} className={styles.row}>
          <span>{user.name}</span>
          <Badge status={user.status} />
        </li>
      ))}
    </ul>
  );
}
```

```css
/* JSX — UserList.module.css */
.list { list-style: none; padding: 0; }
.row { display: flex; justify-content: space-between; padding: 0.5rem 0; }
.badgeActive, .badgeInvited, .badgeSuspended { color: white; padding: 0.15rem 0.6rem; border-radius: 999px; }
.badgeActive { background: seagreen; }
.badgeInvited { background: steelblue; }
.badgeSuspended { background: crimson; }
.empty { color: #888; font-style: italic; }
```

The same component in TSRX is one function, one file: `@switch` branches inline instead of needing lookup tables and a component split out just to hold them, `@for`/`@empty` handles the list-versus-empty-state as one construct instead of an early return, and the `<style>` block sits next to the markup it styles instead of a CSS module a folder over:

```tsx
// TSRX — UserList.tsrx
type User = { id: number; name: string; status: "active" | "invited" | "suspended" };

export function UserList({ users }: { users: User[] }) @{
  <>
    <ul className="list">
      @for (const user of users; key user.id) {
        <li className="row">
          <span>{user.name}</span>
          @switch (user.status) {
            @case "active": {
              <span className="badge badge-active">Active</span>
            }
            @case "invited": {
              <span className="badge badge-invited">Invited</span>
            }
            @default: {
              <span className="badge badge-suspended">Suspended</span>
            }
          }
        </li>
      } @empty {
        <li className="empty">No users yet.</li>
      }
    </ul>

    <style>
      .list { list-style: none; padding: 0; }
      .row { display: flex; justify-content: space-between; padding: 0.5rem 0; }
      .badge { color: white; padding: 0.15rem 0.6rem; border-radius: 999px; }
      .badge-active { background: seagreen; }
      .badge-invited { background: steelblue; }
      .badge-suspended { background: crimson; }
      .empty { color: #888; font-style: italic; }
    </style>
  </>
}
```

Same behavior, same styling, one file instead of three artifacts (component, lookup tables, CSS module). Nothing about React's runtime semantics changes, it compiles down to the same component tree either way, but the TSRX version reads like the markup and styling it produces, in the order you'd think about them.

That co-location isn't only about human readability. TSRX's own pitch is that it's built for "an agentic era," and the reasoning tracks with how these models actually work: they perform best when the information relevant to a change sits close together in the context, not scattered across a lookup table here, a `.map()` there, and a CSS module in another file. A model editing a TSRX component sees the structure, the styling, and the control flow it needs in one place. We noticed this ourselves generating TSRX components with Claude Code: less hallucinated prop-drilling, less reaching for a stray lookup object to tame branching that a `@switch` handles directly.

## Setting it up

Wiring TSRX into an existing TanStack Start project is four steps:

1. Install `@tsrx/react` and `@tsrx/vite-plugin-react`, and add the plugin to your Vite config alongside `tanstackStart()`:

```ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsrxReact from '@tsrx/vite-plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tanstackStart(), tsrxReact(), viteReact()],
})
```

2. Install `@tsrx/typescript-plugin`.
3. Wire it into `tsconfig.json`, both as a compiler plugin and in `include`, so TypeScript resolves `.tsrx` files instead of erroring on them:

```json
{
  "include": ["**/*.ts", "**/*.tsx", "**/*.tsrx"],
  "compilerOptions": {
    "plugins": [{ "name": "@tsrx/typescript-plugin" }]
  }
}
```

4. Install the [Ripple TS VS Code extension](https://marketplace.visualstudio.com/items?itemName=Ripple-TS.ripple-ts-vscode-plugin) for syntax highlighting and editor support. Without it `.tsrx` files are readable but look like broken TypeScript in the editor.

That's the whole integration. No config beyond a Vite plugin, a TypeScript plugin, and an editor extension.

## Where it breaks: three bugs at the seam

These surfaced while stress-testing every TSRX language feature against TanStack Start's real SSR pipeline, one route per feature, rather than a single polished demo. We've filed them upstream as [a single issue on TanStack Router](https://github.com/TanStack/router/issues/7836). Full root-cause detail is in the [repo's README](https://github.com/jamiedavenport/example-tsrx-tanstack) if you want it; here's the short version of each, why it happens, and what to do instead.

**SSR CSS goes missing in dev.** TSRX's scoped `<style>` blocks don't render in the initial SSR HTML during `vite dev`, only after client hydration, which produces a flash of unstyled content. Production `vite build` is unaffected. It comes down to how TanStack Start's dev server resolves CSS from virtual modules, a pattern TSRX's compiled output uses, and not something TSRX itself does wrong. Use `vite build` and `vite preview` rather than `vite dev` if you need to verify scoped styles are actually present in the SSR output.

**`.tsrx` files can't be route files.** TanStack Router's file-walker only recognizes a fixed set of extensions for route files, and `.tsrx` isn't one of them. Workaround: keep route files as plain `.tsx`, and import your `.tsrx` components into them. That's what every route in our stress-test app does, and it costs nothing in practice.

**`@try`/`@catch` doesn't protect server rendering.** TSRX compiles `@try`/`@catch` to a standard React error boundary, and error boundaries are a client-only mechanism, they don't run during SSR. So a component that throws inside a `@try` during server rendering takes down the whole document, not just that boundary, and React falls back to full client-side rendering for the entire page. This is standard React behavior rather than a TSRX defect, but it's worth knowing before you rely on `@try`/`@catch` as an SSR safety net: it isn't one. Wrap anything that can throw during data fetching in your own server-side handling instead, and treat `@try`/`@catch` as a client-side concern only.

## Takeaways

Client-side, TSRX is a clean win: the DX gain from co-locating structure, styling, and control flow is real, and it held up across every language feature we threw at it. The rough edges are specifically about the SSR handshake with TanStack Start's dev server and router generator, not the language itself, and none of them are hard to work around today. We'd rather find these by stress-testing every feature against a real SSR pipeline and file the fixes than quietly work around them and let the next team rediscover each one from scratch.
