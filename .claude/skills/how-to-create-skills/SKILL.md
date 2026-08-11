---
name: how-to-create-skills
description: How to author and organize skills in this repo's `.claude/skills/` — the domain/general taxonomy, the composability principle (split knowledge from method), SKILL.md frontmatter, naming, and when to split vs combine a skill. Use whenever creating a new skill, editing an existing one, splitting a monolithic skill, or deciding where a skill belongs. Triggers on "create a skill", "new skill", "add a skill", "organize skills", "skill structure".
---

# How to Create Skills

This is the meta-skill. It defines the conventions every other skill in `.claude/skills/` follows. **This skill is intentionally exempt from those conventions** — it lives at the top level with no domain, because it describes the system rather than participating in it.

## The one principle: split *knowledge* from *method*, then compose

A skill is either:
- **Domain knowledge** — *what exists and where it lives* (a map): resource/versioning structure, file paths, conventions, entry points. No domain-map skill exists here yet — the closest thing today is `AGENTS.md` plus `.ai/guidelines/research-order.md`.
- **A general process** — *how to do something*, independent of domain (a method): investigating drift, documenting, opening a PR. Example: `investigation`, `general/documentation`.

Never fuse the two. If a domain-map skill is added later (e.g. `v2` once the next API version gets its own resource modules), there should not be a `v2-investigation` skill — there should be `v2` (the map) and `investigation` (the method), composed together. The cross-product emerges from composition, not from a bespoke combined skill.

**Why:** the method is reusable across every version/resource, and the map is reusable across every process. Fusing them forces you to re-teach the investigation method for each version and re-map the resources for each activity.

### How composition works in practice
- A general process skill says: *"pair me with the relevant domain skill for the map."*
- A domain skill says: *"for investigating drift, also load `investigation`; for a new method, also load `general/documentation`."*
- Cross-reference by skill `name` in prose so the reader knows what to load alongside.

## Folder taxonomy: domain → sub-domain → process → skill-name

Organize the path from most-specific domain down to the leaf. Cross-cutting process skills that belong to no single domain live under `general/`.

```
.claude/skills/
├── how-to-create-skills/     ← this meta-skill (exempt from the pattern)
├── <domain>/                 ← domain knowledge (git, v2, …)
│   ├── SKILL.md              ← the domain map itself (optional)
│   └── <sub-domain-or-process>/SKILL.md
└── general/                  ← domain-agnostic process skills
    └── <process>/SKILL.md    ← performance, investigation, documentation, handoff, …
```

Rules:
- **Domain first.** If a skill is about *one* domain, nest it under that domain (`git/pull-request`).
- **General bucket.** If a skill's method applies across domains, put it in `general/` (`general/performance`).
- Any `SKILL.md` anywhere under `.claude/skills/**` is discovered — folders are for humans, the `name` field is the identifier.
- Prefer the **most general** phrasing a skill can honestly carry. Keep repo-specific specifics (class names, endpoint paths) inside the skill, but frame the transferable method first.

## Deciding: split or combine?

| Signal | Action |
|---|---|
| The skill mixes "where the code is" with "how to profile/debug it" | **Split** into a domain skill + a `general/` process skill |
| Two skills always get loaded together and neither stands alone | Consider **combining** — but first check whether one is really a sub-domain of the other |
| A process skill keeps accreting domain-specific class/resource names | Move those facts into the **domain** skill; keep the method general |
| A domain skill starts explaining testing/PR mechanics in depth | Move that into a **general** process skill and cross-reference |

## SKILL.md format

```markdown
---
name: <kebab-case, unique across all skills>
description: <what it does + WHEN to use it + trigger phrases. This is the ONLY thing the model sees when deciding to load the skill — make it match how people actually phrase the task. For composables, name the skills to load alongside.>
argument-hint: "<optional, for slash-invoked skills>"
disable-model-invocation: true   # optional — manual /invoke only
---

# Title

Body: tables and short imperative steps first, prose last. Cross-reference
composable skills by name. Note file:line references but tell the reader to
verify them against current code.
```

Frontmatter notes:
- **`name`** must be unique and stable — it's the slash command and the invocation id. Renaming breaks existing references, so rename deliberately.
- **`description`** is load-bearing: it's matched against the user's request to auto-activate the skill. Lead with capability, then "Use when…", then trigger phrases.
- **`disable-model-invocation: true`** makes the skill manual-only (`/name …`). Use for router/workflow skills that shouldn't fire automatically.

## Authoring checklist
1. Is this **knowledge** or **method**? Put it in the right place; don't fuse.
2. Does an existing skill already cover it? Extend that instead of duplicating.
3. Can the wording be more general without losing accuracy? Generalize.
4. Name the composable siblings to load alongside.
5. Write the `description` the way a user would ask for it.
6. Keep the body scannable: tables + steps first.
