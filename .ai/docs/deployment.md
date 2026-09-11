# Deployment / publish (GitHub Actions)

Read this before touching `master`.

`.github/workflows/npm-publish-github-packages.yml` runs on every push to `master`. It is **not**
a manual `npm publish` a human runs by hand — merging a PR to `master` is the trigger, and that
merge is a human action, so AGENTS.md's "never publish on your own initiative" rule still applies
to *merging to master*, not just to running `npm publish` directly.

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
