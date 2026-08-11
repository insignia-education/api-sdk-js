# Research Order

Before writing or changing a resource method, follow this lookup sequence. This repo has no
business logic of its own — it only mirrors `api` — so the order below front-loads "what does the
real endpoint do" before any SDK code gets touched.

### 1. Define Terms & Understand Structure (`AGENTS.md`)
* **`AGENTS.md`** (repo root) — Start here for API versioning rules, the resource-class
  convention, method-naming (HTTP verbs), the i18n rule, testing coverage requirements, and the
  "Never do" list.

### 2. Check the matching endpoint in `api`
* This SDK exists purely to mirror [`insignia-education/api`](../api). Before writing or changing
  a method, find the real endpoint it wraps — route (`routes/api.php` / `routes/v3/`), controller,
  and response shape — in the `api` repo. The SDK method's params, path, and error surface must
  match what's actually there, not what seems plausible.
* If the endpoint doesn't exist yet in `api`, stop — do not add a speculative SDK method ahead of
  the backend. Per `AGENTS.md`'s sync rule, the SDK follows `api`, never the other way around.

### 3. Check sibling resource files (`src/api/v1/*.js`)
* Once the target endpoint is confirmed, look at 1-2 existing files in `src/api/v1/` for the
  established shape — constructor pattern, method naming, how query params vs. path params vs.
  body are handled, how `upload()` is used for multipart. Match the established pattern rather
  than inventing a new one.

### 4. Explore further only if still unclear
* `src/api/index.js` and `src/index.js` for the base client / URL-construction behavior.
* `tests/integration/api/v1/` for an existing test against the same or a similar endpoint, as a
  template for the new/changed test.
