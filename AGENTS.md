# Instructions for agents working in this repository

This repository is the normative source of the **OPS prompt contract** and of
the Guided Engineering practice. It holds schemas, a validator, examples and
documentation. The Skills that agents load live in another repository,
`guided-engineering/skills`.

## Read first

- [`.guides/ops-contract.md`](./.guides/ops-contract.md): the contract. Normative.
- [`.guides/practice.md`](./.guides/practice.md): how the contract is used.
- [`.guides/conversion.md`](./.guides/conversion.md): what replaced what.

## Commands

```bash
npm ci               # install the pinned development dependencies
npm test             # contract tests: valid and invalid examples, CLI, bundle
npm run validate     # validate every active artifact of this repository
npm run build        # rebuild dist/ops-validate.mjs after changing a schema or the validator
npm run check:refs   # links, schema references, retired vocabulary
npm run example      # run the end-to-end example
```

Run `npm test` and `npm run validate` before proposing a change. A failing
check is reported with its output; it is never worked around by weakening a
test, editing a fixture to match the result, or skipping a check.

## Rules of this repository

- The JSON Schemas under `.guides/schemas/` are the single source of structure.
  The validator imports them; documentation describes them. Change the schema
  first, then the validator, then the documents, then rebuild the bundle.
- `dist/ops-validate.mjs` is generated. Never edit it by hand. `npm test` fails
  when it does not match the sources.
- Files under `examples/invalid/` are invalid on purpose. Each states the error
  code it must produce, and `expected.json` lists them. Do not "fix" them.
- `examples/conversion/*/legacy.yaml` is historical input, byte-identical to a
  blob in Git history. Do not edit it.
- An executor is an `agent`. Do not reintroduce `persona` as an executor, a
  parallel schema file such as `prompt.schema.v3.json`, or a second copy of the
  contract. "User persona" in the product-research sense is fine.
- Accepted ADRs are not rewritten. A new decision gets a new ADR.
- Files use LF line endings (`.gitattributes`). Frozen study inputs and bundled
  copies are compared by hash.
- Quote YAML text that contains `: `.

## Where things are

| Path | Content |
|---|---|
| `.guides/schemas/` | Canonical schemas: prompt, agent map, worklog entry, ADR |
| `.guides/prompts/` | This repository's own OPS prompts |
| `.guides/agents/agents.yaml` | This repository's agent map |
| `.guides/operation/worklog/` | Worklog entries |
| `.guides/assessment/`, `.guides/testing/`, `.guides/traceability/` | Assessment, test and study evidence, requirement maps |
| `tools/ops-validate/` | Validator source and tests |
| `dist/ops-validate.mjs` | The dependency-free bundle |
| `examples/` | Valid, invalid, conversion and end-to-end examples |
| `templates/` | Starting points for a prompt, an agent map, a worklog entry, an ADR |
| `docs/` | The website |

## Working with evidence

When you execute an OPS prompt here, record a worklog entry under
`.guides/operation/worklog/`. State which host and model actually ran; write
`UNKNOWN` for what you cannot observe. Record approvals only when a human gave
them, with a reference to where. Never write one yourself.
