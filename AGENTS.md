# Insignia Education — API SDK (JavaScript)

## Requirements
- Node 24 LTS (`nvm use 24`)

## Quick start
```bash
nvm use 24
npm install
npm test       # runs Jest test suite
npm run lint   # ESLint
```

## What this is
A zero-dependency JavaScript SDK that wraps the Insignia Education API (`/api/v1`).
Consumed by `insignia-education/front` via `@insignia-education/api-sdk-js`.

## API versioning
The SDK is versioned to match the API:

- `src/index.js` — base client
- `src/api/index.js` — appends `/api` to the base URL
- `src/api/v1/index.js` — appends `/v1` → all requests land at `<host>/api/v1/...`
- **v1 is being finalized. Once stable it is permanently frozen.**
- A future v2 API will live in `src/api/v2/index.js` (new class, new resource modules).
- Never modify the URL construction logic in `v1/` to point at a different version.
- Tests for each version live in `tests/integration/api/v1/` — mirror this structure for v2+.
- The `upload(path, formData)` method on `Client` sends multipart — use `api.files.upload(fd)` for any file upload, never raw `fetch()`.

## Structure
```
src/
├── index.js            ← main export
├── api/v1/
│   ├── index.js        ← InsigniaApiV1 class (root client)
│   ├── Auth.js         ← /auth endpoints
│   ├── Courses.js      ← /courses endpoints
│   ├── Users.js        ← /users endpoints
│   └── ...             ← one file per API resource
```

## Usage pattern
```js
import InsigniaApiV1 from '@insignia-education/api-sdk-js/api/v1';
const api = new InsigniaApiV1('http://localhost:8000');

api.auth.login({ email, password });
api.courses.get(null, { page: 1 });
api.users.cashReceivers();
```

## Conventions
- One class per API resource
- Methods match HTTP verbs: `get`, `post`, `put`, `patch`, `delete`
- No external runtime dependencies — only Node built-ins
- ESM modules (`"type": "module"`)

## Adding a new resource
1. Create `src/api/v1/ResourceName.js` with a class that receives the client
2. Register it in `src/api/v1/index.js`
3. Write integration tests in `tests/integration/api/v1/resource-name.test.js`

Verify a new/changed method by running its integration test against a locally running `api`
(`npm test`), not by scripting one-off `curl`/fetch calls in a shell. The integration test is the
artifact that proves the SDK and the API agree, and it's what keeps both repos in sync going
forward — a curl call proves nothing once the terminal closes.

## Testing coverage requirements

Same pattern as `api`'s endpoint tests (see its `AGENTS.md`), applied per SDK method:

- **Missing/malformed params** — call each method with required params omitted and with wrong-format values; confirm the SDK surfaces the API's validation error correctly rather than swallowing it or throwing something unrelated.
- **Permissions** — exercise each method as every relevant user role (including unauthenticated) against the API and confirm the SDK surfaces 401/403 correctly — not just the happy-path success response for the one role the method was built for.

## Internationalisation (i18n)
The SDK is language-neutral — it must never contain human-readable strings.

- Do not include hardcoded error messages or labels in SDK source.
- Error objects thrown by the SDK must expose a machine-readable `status` (HTTP code) and `data` (raw API body). The consuming app handles translation.
- Do not add locale/language logic to the SDK — that belongs to the frontend.

## API ↔ SDK sync rule

**This SDK must stay in sync with [`insignia-education/api`](../api) at all times.** Any endpoint added, renamed, or removed in the API must be reflected here in the same task/commit.

- New endpoint in `api` → new method in the correct `src/api/v1/*.js` class
- Removed endpoint → remove or deprecate the corresponding SDK method
- Never leave the SDK behind the API; the `front` repo relies solely on this SDK

## Consumption — never symlink

Consumers (`front`, `api`) must install this package the normal npm way — **never** via a symlink
(`npm link`, a manual `ln -s` into a consumer's `node_modules`, etc.), even for local iteration.

- A symlinked package looks like it works, but an `npm install`/`npm ci` in the consumer repo can
  silently replace the link with a stale registry copy — the consumer keeps running old SDK code
  with no error, and edits stop propagating until someone notices at runtime.
- Instead: bump this package's version (`npm version patch|minor`) and have the human publish it
  (`npm publish`), then bump the version range in the consumer's `package.json` and run
  `npm install` there.
- Never publish on your own initiative — publishing is a human action.

## Never do
- Don't add runtime dependencies
- Don't change the constructor signature of `InsigniaApiV1`
- Don't hardcode API base URLs — always receive from constructor
- Don't let the SDK lag behind `api` — update both in the same task
- Don't symlink this package into a consumer's `node_modules` — publish it instead


---

## Working Style

- **Think before coding.** State your assumptions out loud. If the request is ambiguous, ask. If a simpler approach exists, push back. Stop when confused — name what is unclear; do not pick one interpretation and run.
- **Simplicity first.** Write the minimum code that solves the problem. No speculative abstractions. No flexibility nobody asked for. The test: would a senior engineer call this overcomplicated?
- **Surgical changes.** Touch only what the task requires. Do not improve neighboring code. Do not refactor what is not broken. Every changed line must trace back to the request.
- **Goal-driven execution.** Turn vague instructions into verifiable targets before writing a line. "Add validation" becomes "write tests for invalid inputs, then make them pass."
## Git

- **NEVER commit in the agent's or Claude's name.** All commits must be authored solely by the human developer. Do not add `Co-Authored-By` trailers that name Claude or any AI agent — in shared/collaborative repositories this would falsely attribute work and obscure accountability.


## Communication style
- Respond as briefly as possible. Caveman mode: shortest answer that works. No fluff, no summaries, no "here is what I did".

---

## Git safety (CRITICAL — read every session)

**DO NOT MESS WITH GIT.** DO NOT run `git checkout`, `git stash`, `git reset`, `git restore`,
`git clean`, or any command that discards or overwrites working-tree changes. These repos often
carry large amounts of **uncommitted** work, and these commands will destroy it irreversibly.

If you need to change the current branch: **commit the work first, or ask the user to commit.**
Never revert, discard, or overwrite changes via git without explicit permission from the user.
