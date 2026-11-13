# Validation

Every artifact in this repository is validated by one tool, `ops-validate`,
which is tested against valid and deliberately invalid examples.

## In this repository

Requires Node.js 20 or newer.

```bash
npm ci
npm test            # the contract tests
npm run validate    # every active artifact, found by convention
```

`npm run validate` checks:

| Artifact | Found at | Schema |
|---|---|---|
| The schemas themselves | `.guides/schemas/*.json` | draft-07 meta-schema, compiled in strict mode |
| Agent map | `.guides/agents/agents.yaml` | `agents.schema.json` |
| OPS prompts | `.guides/prompts/*.yaml` | `prompt.schema.json` |
| Worklog entries | `.guides/operation/worklog/*.md` (front matter) | `worklog.schema.json` |
| ADRs | `.guides/architecture/adr/*.md` (front matter) | `adr.schema.json` |
| Templates | `templates/template.*` | by kind |
| Examples | `examples/valid/`, and every example project under `examples/` | by kind |

Files under `examples/invalid/` are excluded from `npm run validate` and
covered by `npm test`, which requires each of them to be rejected with the
error code named in `examples/invalid/expected.json`.

## One file, anywhere

```bash
node tools/ops-validate/cli.mjs path/to/prompt.x.yaml          # here, from source
node dist/ops-validate.mjs path/to/prompt.x.yaml               # anywhere, no install
node dist/ops-validate.mjs --resolve path/to/prompt.x.yaml     # also show how references resolved
node dist/ops-validate.mjs --json path/to/prompt.x.yaml        # machine-readable
node dist/ops-validate.mjs --version                           # contract identity: schema hashes
```

`dist/ops-validate.mjs` is a single file with no dependencies. Copy it into
another project, or use the copy that ships inside the Skills. Exit code 0
means valid, 1 invalid, 2 the command could not run.

The artifact kind is inferred from the file name (`prompt.*.yaml`,
`agents.yaml`, `*/worklog/*.md`, `*/adr/*.md`); pass `--kind` otherwise.

## What is checked beyond the schema

- YAML: exactly one document, unique mapping keys, YAML 1.2.
- Formats: `date-time` and `date` are asserted, not assumed.
- `agent` resolves in the agent map; a declared native profile file exists.
- `workspace`, `inputs` and outputs resolve inside the repository; inputs exist.
- `$schema`, when present, leads to the canonical schema.
- Step, check, requirement and agent ids are unique; requirement references close.
- A worklog entry is `completed` only with every step done and every check
  passed; an approval is never attributed to the agent.
- Fields of the earlier contract are named, with what replaced them.

The rules and the list of error codes are in
[`.guides/ops-contract.md`](./.guides/ops-contract.md), section 8.

## When a check fails

Fix the document. If the document is right and the rule is wrong, change the
schema or the validator, add or adjust an example under `examples/` that pins
the behavior, and rebuild the bundle with `npm run build`. Do not weaken a rule
to make a document pass.

## Before and after

The same tests were run against the validation that was canonical at commit
`ca82040` and against this validator. The outputs are kept:

| Run | Result | File |
|---|---|---|
| Validation of `ca82040` (`OPS_VALIDATOR_IMPL=./legacy-baseline.mjs`) | 52 of 60 fail | [`.guides/testing/contract/red.legacy-baseline.tap.txt`](./.guides/testing/contract/red.legacy-baseline.tap.txt) |
| This validator | 60 of 60 pass | [`.guides/testing/contract/green.canonical.tap.txt`](./.guides/testing/contract/green.canonical.tap.txt) |

The defects of the earlier validation procedure are listed in
[`.guides/assessment/refoundation-assessment.md`](./.guides/assessment/refoundation-assessment.md).
