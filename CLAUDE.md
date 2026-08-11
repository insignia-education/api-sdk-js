# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Status: Active — the sole client for `insignia-education/api`.**
> A thin, zero-runtime-dependency JavaScript SDK wrapping the Laravel 12 backend
> [`insignia-education/api`](../api). Its only consumer is
> [`insignia-education/front`](../front) (React 19 + Vite 8 SPA) — `front` never calls `api`
> directly. `v1` is being finalized and will be permanently frozen once stable; a future `v2`
> is added alongside `v1`, never in place of it.

---

> The canonical agent-readable version of these instructions is **`AGENTS.md`** (same directory). Both
> files are kept in sync; CLAUDE.md adds Claude Code–specific detail where needed. Read `AGENTS.md` first
> for versioning rules, structure, conventions, testing coverage requirements, the i18n rule, the
> API↔SDK sync rule, and the "Never do" list — none of that is repeated here.

---

## Related repos

| Repo | Role |
|---|---|
| [`api`](../api) | Laravel backend this SDK wraps. Any endpoint added, renamed, or removed there must be mirrored here in the same task — see `AGENTS.md`'s sync rule. |
| [`front`](../front) | The sole consumer. Talks to `api` exclusively through this package — a method missing here is a method `front` cannot use. |

This SDK has no independent purpose — it only exists to mirror `api`. When in doubt about what a
method should do, the answer is "whatever the matching `api` endpoint does," not a judgment call
made here.

## Deployment / publish (GitHub Actions — read this before touching `master`)

`.github/workflows/npm-publish-github-packages.yml` runs on every push to `master` (skipped only
if the commit message contains `[skip ci]`). It is **not** a manual `npm publish` a human runs by
hand — merging a PR to `master` is the trigger, and that merge is a human action, so the "never
publish on your own initiative" rule in `AGENTS.md` still applies to *merging to master*, not just
to running `npm publish` directly.

What the workflow actually does, in order:

1. **`bump-and-publish`** — bumps the patch version (`npm version patch -m "chore: release v%s
   [skip ci]"`), pushes the version-bump commit + tag back to `master`, then publishes the package
   to npm (`npm publish --access public`, using `secrets.NPM_TOKEN`).
2. **`sync-front`** (runs after publish, waits 15s for npm registry propagation) — automatically
   syncs `front` using `secrets.FRONT_REPO_PAT`:
   - **`beta` branch**: checks it out, runs `npm install @insignia-education/api-sdk-js@<new
     version>`, commits, and **pushes directly** — no review step.
   - **`master` branch**: checks it out, runs the same install, and **opens a PR** against
     `front`'s `master` (`chore/bump-api-sdk-js-<version>`) for human review — it does not merge
     itself.

**Practical implications:**
- Merging a PR to this repo's `master` is not just "ship the SDK change" — it also auto-bumps
  `front`'s `beta` branch with no human in the loop, and opens (but does not merge) a PR against
  `front`'s `master`. Treat a `master` merge here as a deploy action, not a routine commit.
- There is no manual "bump the consumer's `package.json`" step to perform for `beta` — CI already
  does it. A human only needs to review/merge the auto-opened PR against `front`'s `master`.
- Requires `secrets.NPM_TOKEN` (npm publish) and `secrets.FRONT_REPO_PAT` (push to `front` +
  open PRs there) to be configured on this repo.
