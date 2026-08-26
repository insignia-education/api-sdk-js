# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Status: Active — the sole client for `insignia-education/api`.**
> A thin, zero-runtime-dependency JavaScript SDK wrapping the Laravel 12 backend
> [`insignia-education/api`](../api). Consumed by
> [`insignia-education/front`](../front) (React 19 + Vite 8 SPA) and
> [`insignia-education/api-mcp`](../api-mcp) (remote MCP server) — neither calls `api`
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
| [`front`](../front) | A consumer. Talks to `api` exclusively through this package — a method missing here is a method `front` cannot use. |
| [`api-mcp`](../api-mcp) | A consumer. Remote MCP server for claude.ai — every call to `api` goes through this package. See its `AGENTS.md`'s "api-sdk-js sync rule". |

This SDK has no independent purpose — it only exists to mirror `api`. When in doubt about what a
method should do, the answer is "whatever the matching `api` endpoint does," not a judgment call
made here.

## Deployment / publish (GitHub Actions — read this before touching `master`)

`.github/workflows/npm-publish-github-packages.yml` runs on every push to `master`. It is **not**
a manual `npm publish` a human runs by hand — merging a PR to `master` is the trigger, and that
merge is a human action, so the "never publish on your own initiative" rule in `AGENTS.md` still
applies to *merging to master*, not just to running `npm publish` directly.

What the workflow actually does: installs, builds, then `npm publish`. That's it — it does **not**
bump the version (the pre-commit hook already forces that before the commit even lands), and it
does **not** touch `front` or any other consumer repo.

**Practical implications:**
- The version published is exactly whatever `package.json` says at the commit that landed on
  `master`. If that version is already on npm (e.g. someone forgot to bump it), the publish step
  fails loudly — there's no silent overwrite or skip.
- Nothing else updates automatically: after a merge here, a human still has to pin the exact new
  version (no `^`/`~`) in `front/package.json` and run `npm install` there — see this repo's
  `AGENTS.md` and `front/AGENTS.md`'s API ↔ SDK sync rule.
- Publishes via npm's OIDC trusted publishing (`permissions: id-token: write`) — no `NPM_TOKEN` or
  other secret, and no cross-repo permissions, are needed anymore.
