---
name: investigation
description: General method for investigating why an SDK method is failing or behaving unexpectedly before changing code — pin the symptom, check the real `api` endpoint first, map every call site, and find the true cause (SDK bug vs. API drift vs. consumer version skew) before writing a fix. Use for failing integration tests, `front`-reported bugs, and suspected SDK/API drift. Triggers on "investigate", "root cause", "debug", "why is this failing", "drift", "test failing".
---

# Investigation — Root-Cause Method

A reusable method for getting from a symptom to the true cause before writing a fix, adapted for a
thin SDK that has no runtime of its own — the vast majority of "bugs" here are actually **drift**
between this SDK and `api`, not logic bugs.

> **Verify against current `api` behavior before asserting — the backend moves.** Do not propose a
> fix until you've confirmed what the real endpoint does right now, not what it did when the SDK
> method was written.

## Method
1. **Pin the symptom.** From a failing integration test, get the exact test name, assertion, and
   actual vs. expected values. From a `front`-reported bug, get the exact method call (args) and
   observed vs. expected behavior.
2. **Locate the code.** Start from the implicated resource file in `src/api/v1/{Resource}.js` →
   the method in question → `src/api/v1/index.js` for how it's wired up. This repo's code is flat
   and shallow — there's rarely more than one or two files to trace through.
3. **Check `api` first, before assuming the SDK is wrong.** Since this SDK has no independent
   business logic, the most common root cause is that `api`'s route, controller, or response shape
   changed and the sync rule (`AGENTS.md`) was missed. Find the real endpoint in `api` and compare
   its current behavior to what the SDK method assumes.
4. **Map affected call sites.** Grep `front` for every call to the implicated method — a fix that
   changes params or return shape without checking all callers reintroduces the bug for a
   different caller. Also check sibling SDK methods for the same pattern (e.g. a shared
   param-passing helper) in case the drift is systemic, not local to one method.
5. **Classify the true cause:**
   - **SDK bug** — the method never matched `api` correctly, and a test/report just caught it.
   - **API drift** — `api` changed and the SDK sync rule (per `AGENTS.md`) wasn't followed.
   - **Version skew** — the SDK is already correct, but `front` (or another consumer) is pinned to
     an older published version. Check the consumer's `package.json` for the installed version
     against the current one.
6. **Plan the fix with downstream impact in mind.** State what changes, whether it's `v1`-safe or
   needs `v2` (per the freeze rule), and how you'll verify — then update/add the integration test
   that fails before the fix and passes after.

## Evidence sources

- **A failing integration test against a live `api` is the primary and strongest signal** — per
  `AGENTS.md`, this is the artifact that proves the SDK and `api` agree. Reproduce or run the
  relevant test in `tests/integration/api/v1/` before proposing a fix.
- **`api`'s actual response shape** — this repo has no logs, no Telescope, no error tracker of its
  own. If the SDK's assumption about a response looks wrong, check it via `api`'s own Telescope
  (`/telescope`, local) or logs (`storage/logs/laravel.log`) in the `api` repo — don't guess from
  the SDK side alone.
- **`api`'s route/controller source** — the ground truth for path, params, and response shape.
  Read it directly rather than inferring from the SDK's existing (possibly stale) assumption.
- **No third-party error tracker or APM exists in this repo** — don't assume Datadog/Sentry/Bugsnag
  are wired up here; they aren't.
