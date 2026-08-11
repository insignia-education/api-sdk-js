---
name: documentation
description: "Where documentation lives in this repo and how to place a new doc. This SDK is already flat (one class per API resource in `src/api/v1/`) — there is no domain taxonomy to maintain here, just placement conventions. Use whenever writing new SDK docs or deciding where a doc belongs. Triggers on 'write docs', 'document this', 'where does this doc go'."
---

# Documentation — Placement & Organization

## No domain taxonomy here — and that's deliberate

`api`'s equivalent skill maps ~90 service classes into named domains (Courses, Payments, Users &
Access, …) because that codebase has real cross-cutting business logic to group. This repo doesn't
have that problem: `src/api/v1/` is already a flat, one-file-per-resource structure (`Auth.js`,
`Courses.js`, `Users.js`, `Payments.js`, …), and each file already **is** the unit of
documentation-worthy scope. Inventing a domain grouping on top of an already-flat structure would
add a layer of indirection with no payoff — don't do it.

## Where a doc goes

| Scope | Location |
|---|---|
| Cross-cutting (versioning rules, auth/token handling, error shape, testing conventions, publish pipeline) | `AGENTS.md` / `CLAUDE.md` (this repo keeps cross-cutting concerns in these two files, not a separate `docs/` tree) |
| A single resource's quirks (non-obvious param, an `api` inconsistency the SDK has to work around, a deprecated method) | A comment block directly above the method/class in `src/api/v1/{Resource}.js` |
| A pattern shared by several resource files (e.g. how pagination params are passed, how `upload()` is used) | `AGENTS.md`'s Conventions section — propose an addition there rather than a new file |

Most "documentation" in this repo should be a comment at the point of use, not a separate
Markdown file — a thin wrapper's quirks are only useful in the same place a developer is already
looking when they touch that method. Reserve `AGENTS.md`/`CLAUDE.md` edits for rules that apply
across every resource file (and remember: `AGENTS.md` itself is not to be rewritten casually — it's
the canonical source of truth; propose additions, don't restructure it).

## If a standalone doc is genuinely warranted

This would be rare for a thin SDK, but if a resource or a versioning decision needs more than a
code comment can carry (e.g. explaining a `v1`→`v2` migration path, or a non-obvious mapping
between several SDK methods and a multi-step `api` flow):

- Place it at `docs/{topic}.md` (create the top-level `docs/` folder if it doesn't exist yet — it
  doesn't today).
- Use `kebab-case.md`, named after the concept (`v2-migration.md`, not `V2-Migration-Notes.md`).
- Start with a `# Title` heading, reference source files by path from repo root
  (`src/api/v1/Courses.js`), and keep it short — this is a wrapper library, not a domain with deep
  business rules to narrate.
- Cross-link it from `AGENTS.md` if it's something every contributor should know about.

## Before writing a doc, check research order

Follow `.ai/guidelines/research-order.md` first — most "documentation questions" about this repo
are actually answered by `AGENTS.md` or by the matching endpoint in `api`, not by a doc that needs
to be written.
