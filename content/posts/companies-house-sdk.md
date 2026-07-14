---
title: "Companies House's API spec is broken. Ours isn't."
lane: Build log
summary: It took 374 lines of code to keep the official spec usable. We deleted them, built a curated spec from primary sources, and shipped the SDK Companies House should have.
date: 2026-07-14
tags: [typescript, open-source, build-log, ai-native]
featured: true
---

We needed the Companies House API for a project. We could have called it directly with `fetch` and moved on. Plenty of teams do.

But the tooling around the API for the UK's company register, the open data that KYC checks and company due diligence are built on, is in a poor state. The official Node SDK is built for Companies House's own internal services: it exists to propagate auth between their web apps, speaks ERIC (their internal routing layer), and covers the public API only partially. The community clients were last published between six and ten years ago. And the official OpenAPI spec, the thing every generated client depends on, is broken in ways we will get to shortly.

So we had a choice: work around it quietly, or build the client we wanted and leave things better than we found them. We built. This post is about what we shipped and, more usefully, how.

## What we shipped

[`@jxdltd/companies-house`](https://www.npmjs.com/package/@jxdltd/companies-house) is a TypeScript SDK covering all 34 endpoints of the Companies House Public Data API, with fully typed request parameters and responses. Zero runtime dependencies, ESM, built on native `fetch`.

```ts
import { createCompaniesHouseClient } from "@jxdltd/companies-house";

const ch = createCompaniesHouseClient({ apiKey: process.env.CH_API_KEY! });

const { data } = await ch.getCompanyProfile({
  path: { company_number: "00445790" },
});

console.log(data?.company_name); // "TESCO PLC"
```

Docs live at [companies-house.jxd.dev](https://companies-house.jxd.dev). The interesting part is not the SDK. It is the spec behind it.

## The official spec is broken, so we stopped repairing it

Our first version did the diligent thing: download the official Swagger 2.0 spec and fix it. That pipeline grew to 374 lines of repair code across nine distinct fix passes, each one correcting a different class of upstream defect. An undeclared auth scheme. Path templates that disagreed with their own parameter names. Pre-Swagger parameter syntax. Pagination parameters wrongly marked required. `$ref` URLs pointing at Companies House's own localhost.

The worst defect looks harmless:

```json
{ "type": "object", "items": { "$ref": "#/definitions/officerSummary" } }
```

JSON Schema has no `items` keyword on objects, so every tool silently reads this as `{}`: untyped. It appears 132 times in the official spec. That single defect is why generated Companies House clients are full of `unknown`.

Repair had a harder limit, though: you cannot repair what was never written down. The official spec omits fields the API has returned for years. Search results are missing `title`, `address_snippet`, `matches`, and every pagination field. Advanced and dissolved search results have essentially no item schema at all. Newer additions like the ECCTA identity verification fields are absent, and whole endpoints exist in Companies House's own SDK before they appear in any documentation.

Every new upstream defect meant writing another fix, forever. That is a treadmill, not a pipeline. So we deleted the repair code and now maintain our own OpenAPI 3.1 document, built from primary sources: the live Developer Hub documentation, cross-checked against the source of Companies House's own SDK, where endpoints ship before they are documented.

## The spec is the product, the client is generated

The OpenAPI document is the single source of truth. [Hey API](https://heyapi.dev/) generates the entire client from it: every method, every request type, every response type. The only hand-written runtime code in the published package is a 38-line factory that wires up auth and lets you swap the `fetch` implementation.

Fix the spec, regenerate, and the client is correct by construction. We also ship the document itself as `@jxdltd/companies-house/openapi.json`, so if you would rather generate a Python or Go client than use ours, take it.

## AI maintains the spec, tests keep it honest

A curated spec is only better than a broken one if curation does not rot. Ours is maintained by two Claude Code skills, checked into the repo like any other code. One builds the spec from scratch by reading the Developer Hub and the official SDK source. One refreshes it in place when upstream may have drifted. Both run under a strict rule: never invent, report gaps. Anything found only in the SDK source is quarantined until proven to answer to API-key auth. The git diff is the review surface, and an engineer reads it before anything merges.

This is how we use AI generally: models draft, engineers decide. But you should not have to trust our process, so there is a second mechanism that does not involve trust at all. Every day at 06:00 UTC, CI runs the full integration suite against the live API, exercising every endpoint with real companies. If Companies House changes shape, we find out as a red build the same morning, not as your bug report.

## Thin by design

The SDK ships no retry, timeout, or rate-limit policy, deliberately. Policy belongs to your application, not your SDK; every policy an SDK bakes in is one you eventually have to work around. Instead, the client accepts any spec-compliant `fetch`, so bringing your own policy is a few lines. Here it is with [ky](https://github.com/sindresorhus/ky):

```ts
import ky from "ky";
import { createCompaniesHouseClient } from "@jxdltd/companies-house";

const ch = createCompaniesHouseClient({
  apiKey: process.env.CH_API_KEY!,
  fetch: (input, init) =>
    ky(input, {
      ...init,
      timeout: 5_000,
      retry: 2,
      // Let non-2xx responses flow back so the SDK can return { data, error }
      throwHttpErrors: false,
    }),
});
```

If you want zero dependencies, `fetch(input, { ...init, signal: AbortSignal.timeout(5_000) })` gets you timeouts in one line.

The same philosophy runs through the rest of the API. Clients are isolated, so nothing is global or shared and you can run several with different keys. Calls return `{ data, error, response }` instead of throwing, with `throwOnError` when you want the other behaviour.

## What we would do in Companies House's shoes

The official spec is wrong for a structural reason: it is written by hand, after the fact, about code it has no connection to. No amount of diligence fixes that arrangement. The fix is to invert it: make the contract the source of truth, implement the server against it, and generate the spec. In TypeScript, [oRPC](https://orpc.unnoq.com/) does exactly this:

```ts
import { oc } from "@orpc/contract";
import { implement } from "@orpc/server";
import { OpenAPIGenerator } from "@orpc/openapi";
import * as z from "zod";

// 1. The contract is the source of truth
const getCompanyProfile = oc
  .route({ method: "GET", path: "/company/{company_number}" })
  .input(z.object({ company_number: z.string() }))
  .output(CompanyProfile);

export const contract = { getCompanyProfile /* ... */ };

// 2. The server implements the contract; drift is a compile error
const os = implement(contract);

// 3. The OpenAPI document is generated, never written
const spec = await new OpenAPIGenerator({
  converters: [new ZodToJsonSchemaConverter()], // oRPC's Zod integration
}).generate(contract, {
  info: { title: "Companies House Public Data API", version: "1.0.0" },
});
```

The spec stops being documentation and becomes a build artefact. It cannot lie, because the compiler checks it against the running server. Everything in our repair saga, the phantom fields, the impossible types, the undocumented endpoints, becomes structurally impossible.

## The rest of the stack

A side project survives on low maintenance, so the tooling is deliberately boring. [Vite+](https://viteplus.dev/) gives us one tool for the lot: `vp check` formats, lints, and type checks, `vp pack` builds the publishable package, and Vitest runs the live integration tests. pnpm workspaces with catalog-pinned dependencies mean one place to bump a version, Changesets cuts releases from CI, and the docs site is Astro Starlight with a [Scalar](https://scalar.com/) API reference rendered from the same OpenAPI document that generates the client. One artefact, three outputs.

## Fix the spec, or take ours

Two asks, addressed to Companies House directly.

First: fix the official spec. Publish OpenAPI 3.x, run it through a validator, and ideally generate it from the code that serves the API. Every consumer of your API is paying the repair cost today, in their own 374 lines.

Second, and we mean this sincerely: take ours. The curated OpenAPI 3.1 document is MIT licensed, verified against your own API every morning, and we would genuinely love for it to become redundant. Adopt it, fork it, or just diff it against yours to find the gaps. We are easy to find.

This is not point-scoring. Companies House's data is a public asset and the API behind it is good. The developer experience around it deserves to be as good.

## Use it

```sh
npm install @jxdltd/companies-house
```

Docs at [companies-house.jxd.dev](https://companies-house.jxd.dev), source on [GitHub](https://github.com/jamiedavenport/companies-house), MIT licensed. If you find something the API does that the types do not, [open an issue](https://github.com/jamiedavenport/companies-house/issues). The spec gets fixed, the client gets regenerated, and everyone's types get better.
