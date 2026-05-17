# Retrofitting Spec-Driven Development into an existing codebase

This guide is for teams who already ship software and want to adopt Guided Engineering's SDD methodology without a clean-room rewrite. It maps the messy state of a real project onto the canonical SDD artifacts.

> Greenfield path. If you are starting a new project, copy the `example.user-login` reference example and follow the prompts top to bottom — this guide is overkill for that case.

## When retrofit is worth doing

- You have working code but ambiguous requirements; new contributors keep asking the same questions.
- Specs live in Confluence/Notion/Jira tickets — they exist, but they are not the source of truth, and they drift from the code.
- ADRs are scattered across PR descriptions, Slack threads, and engineers' heads.
- Tests exist but their connection to requirements is implicit.
- Auditors or security reviewers ask "where is the requirement?" and the team cannot point to a single artifact.

If none of those resonate, stay with what you have.

## When retrofit is NOT worth doing

- The project is in active rewrite and the new system will adopt SDD from day one — wait, do not retrofit a doomed surface.
- The team is < 3 people who already share context — the overhead does not pay back.
- Compliance pressure is forcing a heavyweight process (ISO 9001, FDA, etc.) — those frameworks impose their own artifact taxonomy and SDD cannot replace them; integrate, do not retrofit.

## The three-step retrofit

### Step 1. Inventory

Spend a half day enumerating what already exists, not building anything new.

For each capability the system delivers:

| Source | Maps to |
|---|---|
| PRD / product brief / ticket | `.guides/specs/spec.<id>.yaml` `businessContext` and one or more `requirements[]` |
| Acceptance criteria in a ticket | `acceptanceCriteria[]` (Given/When/Then triples) |
| Tests in the source tree | `.guides/testing/test-cases.<id>.yaml` (descriptors, not runnable code) |
| Architecture decisions in PRs / Slack / wikis | `.guides/architecture/adr/NNNN-<slug>.md` |
| Test-to-requirement links (often implicit) | `.guides/traceability/matrix.<id>.yaml` |
| Incident reports, postmortems | Feed back into the spec as new requirements or `relatedSpecs[]` |

Output of Step 1: a single CSV or table listing every artifact, where it currently lives, and which SDD location it maps to. **No SDD files written yet.**

### Step 2. Backfill the schemas

Take the inventory and produce the SDD artifacts, capability by capability. Order:

1. **Specs first.** Convert each capability's PRD/brief into `.guides/specs/spec.<id>.yaml` using `prompt.spec.author.yaml`. Status starts at `draft`. Run `prompt.spec.validate.yaml` to lint each one before moving on.

2. **ADRs second.** Capture every architecturally significant decision that already shaped the code, using `prompt.adr.author.yaml`. Status: `accepted` (the decision is already in production). The `alternativesConsidered[]` may be reconstructed from PR discussions or postmortems — flag any that you cannot reconstruct rather than fabricating.

3. **Test cases third.** Use `prompt.test-cases.from-spec.yaml` to derive test-case descriptors from the acceptance criteria. Cross-reference your existing test files in the `evidence[]` of each test case. Test cases here are descriptors; the runnable tests already exist in the source tree.

4. **Traceability matrix last.** Use `prompt.requirement.traceability.yaml` to wire everything together. The `commits[]` field for retrofitted requirements is populated by `git log --grep` or by inspection of the files implementing each requirement.

Output of Step 2: the canonical `.guides/` tree, fully populated, validating against the v0.5.0 schemas.

### Step 3. Cut over

Switch the team's source of truth from the previous home (Confluence, Jira, Slack) to `.guides/`. This is a contract change, not a tooling change:

- Update the team's README or contributing guide to say "specs live in `.guides/specs/` from this date forward."
- Set the validation protocol from `VALIDATION.md` as a PR requirement.
- Run a Conform pass via `prompt.spec.conformance-check.yaml` against the retrofitted specs. Expect mostly `PASS-WITH-GAPS` — the gaps will be the implicit decisions and undocumented edge cases that the retrofit surfaces. File one worklog entry per gap.
- Stop maintaining the old artifacts. Either delete them or replace their content with a redirect to `.guides/`.

The retrofit is complete when the team stops asking "should I update the spec or the wiki?" and answers it the same way every time.

## What goes wrong

- **Boil-the-ocean retrofit.** Doing every capability at once produces 60 specs of declining quality. Pick three high-traffic capabilities first; let the team see the value, then expand.
- **Spec inflation.** Backfilled specs tend to over-document because the author retrofits from a finished implementation. Resist — write the spec at the level of intent, not at the level of code.
- **ADR archaeology fatigue.** Recovering `alternativesConsidered[]` from old PRs is painful. Set a one-paragraph budget per ADR; if reconstruction takes longer, mark the alternative as `unknown — retrofit` and move on.
- **Traceability gaps treated as bugs.** They are not bugs; they are findings. Each gap is a worklog item with an owner. The matrix is a living artifact.

## Related artifacts

- Methodology overview: [`../sdd-process.md`](../sdd-process.md).
- Reference example (greenfield): [`../specs/spec.example.user-login.yaml`](../specs/spec.example.user-login.yaml).
- Validation protocol: [`../../VALIDATION.md`](../../VALIDATION.md).
- Roadmap (governance, deprecation policy): [`../../ROADMAP.md`](../../ROADMAP.md).
