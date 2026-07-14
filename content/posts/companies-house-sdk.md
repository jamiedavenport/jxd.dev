---
title: "Build log: the Companies House SDK we wanted to use"
lane: Build log
summary: The official SDK is internal plumbing and the community clients are dead. So we built a modern, fully typed one, and let AI keep the spec honest.
date: 2026-07-14
tags: [typescript, open-source, build-log, ai-native]
featured: true
---

<!-- SCAFFOLD. Each section has notes on what to write. Delete the comments as you fill them in. -->

<!-- Opening: 2-3 blunt paragraphs, no heading. State the problem: every UK company builds against Companies House eventually, and the tooling is bad. The official SDK is built for their internal web services (ERIC headers, OAuth propagation, dual clients). The community clients were last published 6-10 years ago. Land the punchline: so we built @jxdltd/companies-house and put it on npm. -->

## What we shipped

<!-- The facts, fast. All 34 Public Data API endpoints, fully typed requests and responses. Zero dependencies, ESM, native fetch. One code snippet: createCompaniesHouseClient + getCompanyProfile for Tesco. Link npm package and docs site (companies-house.jxd.dev). -->

## The official spec is broken, so we stopped repairing it

<!-- The war story and the most interesting section. First version downloaded the official Swagger 2.0 spec and patched it: 374 lines of repair code, nine classes of defect, one fix alone correcting 132 occurrences of a construct that silently collapsed types to unknown. And repair still could not add fields upstream never wrote down (search results missing title, address_snippet, all pagination fields). Conclusion: repairing a broken source is a treadmill. We now maintain our own OpenAPI 3.1 document from primary sources. -->

## AI maintains the spec, tests keep it honest

<!-- The AI-native angle, in workshop-tools terms (models draft, engineers decide). Two Claude Code skills: one builds the spec from scratch by reading the live docs and Companies House's own SDK source (where endpoints ship before they are documented), one refreshes it in place. Strict rule: never invent, report gaps. The git diff is the review surface. Then the trust mechanism: every endpoint runs against the live API daily in CI, so upstream drift shows up as a red build, not a bug report. -->

## Thin by design

<!-- Design decisions and the reasoning. No retry or rate-limit policy baked in: you wrap fetch, we stay out of the way. Isolated clients, nothing global. Calls return { data, error, response } instead of throwing; throwOnError when you want it. Maybe one sentence on why thin beats clever in an SDK. -->

## Use it

<!-- Close short. npm install @jxdltd/companies-house, link the docs and the GitHub repo, MIT. One line inviting issues for anything the API does that the types do not. -->
