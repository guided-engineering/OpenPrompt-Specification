# Specification sources and contribution

## Where things live

| Repository | Owns |
|---|---|
| [`guided-engineering/OpenPrompt-Specification`](https://github.com/guided-engineering/OpenPrompt-Specification) | The normative contract and the practice: schemas, validator, examples, conversion guide, study evidence, and this website. |
| [`guided-engineering/skills`](https://github.com/guided-engineering/skills) | The `ops-author` and `ops-execute` Skills, their installation, their tests, and host integration notes. |

The Skills carry a copy of the schemas and the validator so that they work in a
project that has neither. That copy is synchronized by script and records the
revision and hashes it came from. The contract is defined in one place only.

## The specification

| Document | What it is |
|---|---|
| [The OPS prompt contract](contract.html) | Normative. Fields, resolution rules, completion, request modes, worklog entries, error codes, compatibility boundary. |
| [The practice](practice.html) | How the contract is used: the journey and the loop. |
| [Converting from the earlier contract](conversion.html) | Field map and replacement table for documents written before the reformulation. |
| [Design record](../.guides/architecture/adr/0002-refound-on-agents-skills-and-ops-contracts.md) | Why the project was rebuilt, what was considered, and the acceptance criteria. |

## Schemas and validator

The schemas are served here at the addresses their `$id` names:

| Artifact | Schema |
|---|---|
| OPS prompt | [`schemas/prompt.schema.json`](schemas/prompt.schema.json) |
| Agent map | [`schemas/agents.schema.json`](schemas/agents.schema.json) |
| Worklog entry | [`schemas/worklog.schema.json`](schemas/worklog.schema.json) |
| Architecture Decision Record | [`schemas/adr.schema.json`](schemas/adr.schema.json) |

The validator is one file with no dependencies. It needs Node.js 20 or newer.

```bash
curl -fsSLO https://guided-engineering.github.io/OpenPrompt-Specification/ops-validate.mjs
node ops-validate.mjs --help
node ops-validate.mjs .guides/prompts/prompt.my-task.yaml
```

Its third-party notices are in [`ops-validate.licenses.txt`](ops-validate.licenses.txt).
A schema alone cannot check that an agent resolves, that a path stays inside its
workspace or that a worklog entry claims no more than it shows; the validator
does. A document is a valid OPS prompt when the validator accepts it.

## Examples

| Example | Shows |
|---|---|
| [`examples/project/`](../examples/project/) | A request, its prompt, the plan and the evidence of a run. It is executed by `npm run example`. |
| [`examples/valid/`](../examples/valid/) | The smallest valid prompt and two worklog entries, one blocked and one completed. |
| [`examples/invalid/`](../examples/invalid/) | One file per rejection, each naming the error code it must produce. |
| [`examples/conversion/onboarding/`](../examples/conversion/onboarding/report.md) | A real first-generation prompt, taken verbatim from history, and its conversion. |

## Checking a change

```bash
git clone https://github.com/guided-engineering/OpenPrompt-Specification
cd OpenPrompt-Specification
npm ci
npm test              # contract tests: valid and invalid examples, CLI, bundle
npm run validate      # every active artifact of the repository
npm run check:refs    # links, schema references, retired vocabulary
npm run example       # the end-to-end example
npm run site          # regenerate this website into docs/
```

The rules of the repository are in [`AGENTS.md`](../AGENTS.md): the schemas are
the single source of structure, the bundle and this site are generated, the
invalid examples are invalid on purpose, and a failing check is reported with
its output and never worked around.

## Proposing a change

1. Open an issue or a pull request against `OpenPrompt-Specification` for the
   contract, or against `skills` for a Skill.
2. A change to the contract changes the schema first, then the validator, then
   the documents, and adds or adjusts an example that pins the behavior.
3. A change to a Skill states which observed failure it addresses. The study
   protocol in [`.guides/testing/skills-study/`](../.guides/testing/skills-study/protocol.md)
   shows how a claim of improvement is tested.

The license of both repositories is MIT.
