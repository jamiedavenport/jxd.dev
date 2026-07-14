---
title: "Build log: the Companies House SDK we wanted to use"
lane: Build log
summary: The official SDK is internal plumbing and the community clients are dead. So we built a modern, fully typed one, and let AI keep the spec honest.
date: 2026-07-14
tags: [typescript, open-source, build-log, ai-native]
featured: true
---

<!-- SCAFFOLD. Each section has notes on what to write. Snippets are real and verified; tweak, don't invent. Delete the comments as you fill them in. -->

<!-- Opening: 2-3 blunt paragraphs, no heading. The honest origin: we needed the Companies House API for a project. We could have called it directly with fetch and moved on. But the tooling around it is in a bad state: the official SDK is built for their internal web services (ERIC headers, OAuth propagation, dual clients) and covers the public API only partially, and the community clients were last published 6-10 years ago. We would rather leave things better than we found them, so we built the client we wanted and put it on npm. -->

## What we shipped

<!-- The facts, fast. All 34 Public Data API endpoints, fully typed requests and responses. Zero dependencies, ESM, native fetch. Link npm package and docs site (companies-house.jxd.dev). -->

```ts
import { createCompaniesHouseClient } from "@jxdltd/companies-house";

const ch = createCompaniesHouseClient({ apiKey: process.env.CH_API_KEY! });

const { data } = await ch.getCompanyProfile({
  path: { company_number: "00445790" },
});

console.log(data?.company_name); // "TESCO PLC"
```

## The official spec is broken, so we stopped repairing it

<!-- The war story. First version downloaded the official Swagger 2.0 spec and patched it: 374 lines of repair code, nine classes of defect. Show the worst one: -->

```json
{ "type": "object", "items": { "$ref": "#/definitions/officerSummary" } }
```

<!-- JSON Schema has no items on objects, so every tool silently reads this as {}: untyped. It appears 132 times in the official spec, which is why generated types came out as unknown. And repair could not add fields upstream never wrote down (search results missing title, address_snippet, all pagination fields). Conclusion: repairing a broken source is a treadmill. We now maintain our own OpenAPI 3.1 document from primary sources. -->

## The spec is the product, the client is generated

<!-- The code generation story. The OpenAPI document is the single source of truth. Hey API (openapi-ts) generates the entire client from it: every method, every request type, every response type. The only hand-written runtime code in the package is a 38-line factory that wires up auth and fetch. Fix the spec, regenerate, and the client is correct by construction. We also ship the spec itself in the package as @jxdltd/companies-house/openapi.json, so you can generate your own client in another language if you want. -->

## AI maintains the spec, tests keep it honest

<!-- The AI-native angle, in workshop-tools terms (models draft, engineers decide). Two Claude Code skills: one builds the spec from scratch by reading the live Developer Hub docs and Companies House's own SDK source (where endpoints ship before they are documented), one refreshes it in place. Strict rule: never invent, report gaps. The git diff is the review surface. Then the trust mechanism: every endpoint runs against the live API daily in CI, so upstream drift shows up as a red build, not a bug report. -->

## Thin by design

<!-- Design decisions and the reasoning. No retry, timeout, or rate-limit policy baked in: policy belongs to the application, not the SDK. The fetch option takes any spec-compliant fetch, so bringing your own policy is a few lines. Example with ky, which speaks real Request/Response: -->

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

<!-- If you want zero dependencies, the native equivalent for timeouts alone is fetch(input, { ...init, signal: AbortSignal.timeout(5_000) }). Worth a one-line mention. -->

<!-- Also cover: isolated clients, nothing global or shared; calls return { data, error, response } instead of throwing; throwOnError when you want it. One sentence on why thin beats clever in an SDK: every policy we bake in is one you have to work around. -->

## What we would do in Companies House's shoes

<!-- The constructive bit. Their spec is wrong because it is written by hand, after the fact, about code it has no connection to. The fix is to invert the relationship: contract-first. Define the API as a typed contract, implement the server against the contract so drift is a compile error, and generate the OpenAPI document from the same contract. oRPC does exactly this in TypeScript: -->

```ts
import { oc } from "@orpc/contract";
import { implement } from "@orpc/server";
import { OpenAPIGenerator } from "@orpc/openapi";

// 1. The contract is the source of truth
const getCompanyProfile = oc
  .route({ method: "GET", path: "/company/{company_number}" })
  .input(z.object({ company_number: z.string() }))
  .output(CompanyProfile);

export const contract = { getCompanyProfile /* ... */ };

// 2. The server implements the contract; drift is a type error
const os = implement(contract);

// 3. The OpenAPI document is generated, never written
const spec = await new OpenAPIGenerator({
  converters: [new ZodToJsonSchemaConverter()],
}).generate(contract, {
  info: { title: "Companies House Public Data API", version: "1.0.0" },
});
```

<!-- Punchline: the spec stops being documentation and becomes a build artifact. It cannot lie, because the compiler checks it against the running server. Our whole spec-repair saga would be structurally impossible. -->

## The rest of the stack

<!-- Short section, list-like, on the tooling that keeps a side project maintainable. The theme: a two-package monorepo should not need twelve configs. Vite+ (vp) is the headline: one tool for build, test, lint, format, and type checking; vp check runs the lot, vp pack builds the publishable package, Vitest is baked in for the live integration tests. Then one line each: pnpm workspaces with catalog-pinned dependencies (one place to bump a version), Changesets for versioned npm releases from CI, Astro Starlight + Scalar rendering the docs site and interactive API reference from the same OpenAPI document that generates the client. Point back to the theme: low maintenance is what makes a free SDK sustainable. -->

## Fix the spec, or take ours

<!-- The CTA. Two asks, addressed to Companies House directly. 1) Fix the official spec: publish OpenAPI 3.x, validate it, generate it from code if possible; every consumer of your API is paying the repair cost today. 2) Or adopt ours: the curated OpenAPI 3.1 document is MIT licensed, verified daily against your own API, and we would genuinely love for it to become redundant. Link the spec package and invite contact. Blunt but generous in tone: we are not point-scoring, we want the ecosystem fixed. -->

## Use it

<!-- Close short. npm install @jxdltd/companies-house, link the docs site and the GitHub repo, MIT. One line inviting issues for anything the API does that the types do not. -->
