# Conversion report: `legacy/prompt.retry.yaml` → `prompt.notify.retry-jitter.yaml`

Source: `legacy/prompt.retry.yaml` (earlier contract, `ops/v1`, version `1.2.0`), left unchanged.
Result: `.guides/prompts/prompt.notify.retry-jitter.yaml`. `ops-validate --resolve` reports it as valid, with `agent: guided-engineer` resolving through the built-in map to the current executor.

## What changed

| Legacy | Now | Note |
|---|---|---|
| `$schema: .guided/schema/prompt.schema.json` | `$schema: ../schemas/prompt.schema.json` | The old path was misspelled (`.guided/schema`) and did not exist. |
| `apiVersion: ops/v1` | `guided-engineering/v1` | Changed only after the whole document was converted. |
| `version: 1.2.0` | `version: 1` | This is the first revision under the new contract. |
| `persona: ReliabilityEngineer` | `agent: guided-engineer` | See "Decisions" below. |
| `category: implementation` | `tags: [implementation, reliability]` | |
| `difficulty: intermediate` | removed | It had no execution meaning. |
| `createBy` (typo) | `createdBy: platform-team` | |
| `context` | `context`, expanded | Now records the current code, the exact-value test that jitter breaks, and the equal-jitter formula. |
| `dependencies: Node.js 20` | `dependencies` (Node.js 20 or later, npm) + `inputs` | The paths the task reads are now `inputs`. |
| — | `objective` | New. It states the end state so it can be checked: the formula, the bounds, the default `random`, and passing tests. |
| Vague actions ("Look at the retry code", "Make the delays better", "Update tests as needed") | Concrete imperative actions | Includes the exact expected values for injected `random`. |
| `steps[1].if: jitterEnabled == true` | removed; constraint "jitter is always applied" + stop condition | See "Could not map". |
| `steps[1].retries: 3` | `limits.repairAttempts: 3` | Now one limit per failing check for the whole run, not per step. |
| `steps[1].onFailure: continue` | removed | Under the contract, a failed check is repaired or the run is `blocked`. It is never skipped. |
| `output[].language` | removed | The file extension already shows the language. |
| `output[0].rules` (a block string) | a list, plus requirements R1–R3 | The three original rules are kept word for word in meaning. |
| — | `requirements` R1–R5, `verification` (6 checks), `constraints`, `stopConditions`, `limits.timeBudgetMinutes: 30` | New. Every requirement is covered by at least one check. |

## What could not be mapped

- **`if: jitterEnabled == true`.** Nothing in the workspace defines `jitterEnabled`: no config, no env var, no parameter. The legacy output rules also require jitter unconditionally ("Each delay MUST stay within …"). So the condition is dropped and jitter is always on. If the executor finds a reason it must be switchable, a stop condition makes it stop and ask instead of inventing a flag.
- **`onFailure: continue`.** The contract has no equivalent. Continuing past a failure contradicts "completed means proven".
- **`persona: ReliabilityEngineer`.** This was never one of the catalogue personas, and the repository has no `.guides/agents/agents.yaml`. Its intent (reliability focus) went into `tags` and `context`.

## Decisions a person has to make

1. **Agent.** `guided-engineer` is the only agent that exists (built-in map). If a dedicated reliability profile is wanted, someone has to create `.guides/agents/agents.yaml` with a real profile and then change `agent`. No id was invented.
2. **Jitter on/off.** The prompt assumes jitter is always applied. Confirm this, or say where a `jitterEnabled` switch should come from.
3. **Rounding.** The prompt asks for unrounded (fractional) millisecond delays. Integer delays would need a rule, for example `Math.round`. Note that with very small `baseMs` (such as 1), rounding down can break the 0.5x lower bound.
4. **Upper bound.** Because `Math.random()` returns values in [0, 1), the 1.0x bound is never actually reached. The rule is written as inclusive (`<=`), matching the legacy "[0.5x, 1.0x]". Change it if a strict bound matters.
5. **Existing callers.** None were found in this workspace. If code elsewhere (for example the real notification sender) relies on exact delays, the stop condition will trigger.
6. **Version / id.** The id is kept as `notify.retry-jitter` and the version restarts at `1`. Bump it if you consider this a continuation of `1.2.0`.

## How the result was checked

- `node .guides/tools/ops-validate.mjs --resolve` on the new prompt: valid, and the agent and all inputs and outputs resolve.
- The `run` commands were tried in a throwaway copy of `src/`, `test/` and `package.json` in a temp directory, which was then deleted. Nothing was implemented in the repository:
  - Against the current code, `deterministic-jitter` fails (exit 1). `default-random-bounds` and `empty-attempts` pass, which is expected: unjittered delays are inside the bounds. So the deterministic check is the one that detects missing jitter.
  - Against a scratch equal-jitter implementation, all three pass (exit 0).
  - The `scope` check (`git diff --quiet HEAD -- …`) exits 0 on the current tree.
- `tests-pass` (`npm test`) was not run against a jittered version. Its result depends on the tests the executor writes.
