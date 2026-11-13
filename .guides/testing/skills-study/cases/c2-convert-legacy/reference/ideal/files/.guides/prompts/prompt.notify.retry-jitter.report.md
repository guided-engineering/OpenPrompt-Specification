# Conversion report: notify.retry-jitter

Source: `legacy/prompt.retry.yaml` (unchanged). Result: `.guides/prompts/prompt.notify.retry-jitter.yaml`.

## What changed

| Legacy | Canonical | Why |
|---|---|---|
| `apiVersion: ops/v1` | `guided-engineering/v1` | converted, not relabelled |
| `$schema: .guided/schema/prompt.schema.json` | removed | wrong path, optional field |
| `persona: ReliabilityEngineer` | `agent: guided-engineer` | see decisions |
| `category: implementation` | tag | no execution meaning |
| `difficulty: intermediate` | removed | no execution meaning |
| step `if: jitterEnabled == true` | stop condition | conditions are not evaluated; the variable is undeclared |
| step `retries: 3`, `onFailure: continue` | removed | a failed check is repaired within limits, never skipped |
| output `rules` as one block string | list of rules | one rule per item |
| output `language: javascript` | removed | the extension shows the format |
| `version: 1.2.0` | `version: 2` | integer content revision |
| `createBy` | `createdBy` | typo |
| vague actions | concrete actions | see the steps |
| no checks | `verification` with `npm test` | a prompt needs a check |

## Could not map

- `ReliabilityEngineer` is not an agent of this project. The task needs no special profile, so it names the default agent.

## For a person to decide

- Whether jitter is always on. The legacy step ran only when `jitterEnabled == true`, a value nobody declares, and the existing test expects un-jittered delays.
