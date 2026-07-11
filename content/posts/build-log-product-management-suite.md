---
title: "Build log: a product management suite"
lane: Build log
summary: Code, issues, documents, meetings, and CI in one place. Notes from building our own tooling.
order: 3
---

Every JXD engagement runs on tooling we built ourselves. This post is about the largest piece: a product management suite that puts code, issues, documents, meetings, and CI in one place.

## Why build it at all

The standard stack for a small engagement is a repository host, an issue tracker, a docs wiki, a meetings doc, and a CI dashboard. Five tabs, five sources of truth, and the connections between them live in people's heads. For a consultancy that promises radical transparency, that is a problem: clients should see the same view we do, without a tour guide.

So issues link to the commits that close them, documents link to the decisions they record, and meeting notes link to both. When we send a weekly note, it is assembled from things that actually happened, not from memory.

## What building it taught us

Dogfooding is the fastest review cycle there is. Rough edges get found on Monday and fixed by Wednesday because we feel them ourselves. It also keeps our template honest: the suite is built on the same foundation we use for client work, so every improvement flows both ways.

The suite is also our proof of craft. Anyone can claim production-grade standards. Showing a client the tool you built, running your own delivery on it, is more convincing than a slide about values.
