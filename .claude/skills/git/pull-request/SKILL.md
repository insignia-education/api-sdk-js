---
name: create-pull-request-api-sdk-js
description: Create a pull request following insignia-education conventions for this repo — no Jira link, no PR template, but a repo-specific pre-flight checklist (endpoint exists in api, integration test present, v1-freeze respected, publish-pipeline awareness). Use whenever creating a PR in `api-sdk-js`.
---

# Create Pull Request — insignia-education/api-sdk-js

No `.github/PULL_REQUEST_TEMPLATE.md` exists in this repo — write a plain body with `## Summary`
and `## Test plan` sections (see the repo-level PR instructions for the exact mechanics of
`gh pr create`). This skill adds the checks specific to this repo, on top of that.

## Pre-flight checklist

- **The `api` endpoint is real and already merged/available.** Never add a speculative SDK method
  for an endpoint that doesn't exist yet in `api` — confirm the route/controller is merged (and,
  ideally, deployed somewhere reachable) before opening this PR. Per `AGENTS.md`'s sync rule, this
  SDK follows `api`; it never leads it.
- **An integration test was added or updated.** Per `AGENTS.md`, a new/changed method isn't
  verified until its test in `tests/integration/api/v1/` passes against a locally running `api`.
  A PR that changes a resource method without a corresponding test change is incomplete — call it
  out explicitly if deferring this is unavoidable.
- **Test coverage includes missing/malformed params and permissions per role**, not just the happy
  path — per `AGENTS.md`'s testing coverage requirements.
- **`v1` freeze respected.** If the diff touches `src/api/v1/`, confirm it's additive (new
  method/resource) and not a breaking change to an existing method's signature or return shape, and
  that `InsigniaApiV1`'s constructor is unchanged. A breaking change belongs under a future
  `src/api/v2/`, not a `v1` edit.
- **No runtime dependency added**, no hardcoded base URL, no hardcoded human-readable string in
  source (errors must expose `status`/`data` only — see `AGENTS.md`'s i18n rule).
- **Merging this PR to `master` is a deploy action, not a routine merge.** Per `CLAUDE.md`'s
  deployment section, a push to `master` (unless `[skip ci]`) auto-bumps this package's patch
  version, publishes it to npm, pushes a direct commit to `front`'s `beta` branch, and opens a PR
  against `front`'s `master` — all without further human action beyond the merge itself. Don't
  merge here as though it's a no-op; know that it triggers all of the above.

## Body format

```
## Summary
<1-3 bullets>

## Test plan
<checklist of what was tested / how to verify>
```

Omit sections that would be empty. No ticket link, no deployment labels — this repo doesn't use
them.
