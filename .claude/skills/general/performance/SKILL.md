---
name: performance
description: Minimal performance checklist for this thin HTTP client SDK — there is very little performance surface here (no rendering, no queries, no server). Use when a consumer reports a resource method being called redundantly or a method doing unnecessary work per call. Triggers on "performance", "slow", "redundant calls", "optimize", "duplicate requests".
---

# Performance — Minimal Checklist

This is a thin, zero-dependency HTTP wrapper. It has no database, no rendering, no compute-heavy
work, and no server process — most of the performance surface that a full application has simply
doesn't exist here. Don't manufacture a heavier profiling process than the codebase warrants; this
skill is intentionally short.

The two things actually worth checking:

1. **Redundant/duplicate calls from a consumer using a method in a loop.** A resource method is a
   1:1 wrapper around one `api` call — if `front` (or another consumer) calls the same method
   repeatedly inside a loop with the same or overlapping args, that's a consumer-side batching
   problem, not something to fix inside the SDK method itself. Flag it to the consumer rather than
   adding caching/batching logic into a resource class (that would violate thin-wrapper discipline
   — see `AGENTS.md` and the `senior-software-developer`/`senior-code-reviewer` agents).
2. **Unnecessary payload transformation or cloning per call.** A resource method should pass
   params/body through to the client with the minimum work needed to shape the HTTP request — no
   deep-cloning, no reshaping the response, no redundant `JSON.parse(JSON.stringify(...))`-style
   copies. If a method is doing more than constructing the call and returning the client's
   response, that's very likely a correctness/scope issue (see `general/investigation` and the
   thin-wrapper rule), not just a performance one.

If a real latency problem is reported, it is almost certainly in `api` (query performance, N+1,
slow external integration) or in network conditions — not in this SDK. Point the investigation at
`api`'s own performance tooling (see its `AGENTS.md`/performance skill) rather than profiling this
repo.
