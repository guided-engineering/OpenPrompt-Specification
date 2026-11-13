# Refoundation: independent coverage audit

## 1. What this is

An independent audit, dated **2026-11-13**, of two questions:

1. Did the translation of the request in `.guides/product/refoundation-request.md`
   (the bootstrap) into two OPS prompts lose anything?
2. Did retiring the spec, requirement, acceptance-criterion, test-case and
   traceability-matrix layer (and the persona catalogue) drop a function that is
   still needed?

The reviewer took no part in the translation, changed no file except this one,
ran no `claude` command, and opened nothing under
`.guides/testing/skills-study/cases/c5-resume-heldout/` or
`.guides/testing/skills-study/results/`. A schema-valid prompt and a generated
map were not accepted as proof of coverage: every sentence of the bootstrap was
compared with the text of the requirements, steps, checks, constraints and stop
conditions.

| Repository | Branch | Git HEAD when this file was written |
|---|---|---|
| A, `OpenPrompt-Specification` | `refoundation/agents-skills-ops` | `afbe49198a6635f5d878028689a1f7db4409ff77` |
| B, `guided-engineering-skills` | `main` | `54ec84281e7d617e52127d1916f5085157a26a46` |

**The repository moved during the audit.** HEAD of A was `b79d401` at the start
and advanced through `c78f140` and `a5dfe71` to `afbe491`. None of those commits
changed the bootstrap, either prompt, either map, the contract, the conversion
guide or the schemas. `c78f140` changed the study protocol, its amendments and
its harness; this audit uses the protocol as it is at `afbe491`. The working
tree of A also held uncommitted edits to ADR 0002 and to the run record; both
were read as found. Blob ids of what was audited (`git hash-object`):

| File | Blob | State |
|---|---|---|
| A `.guides/product/refoundation-request.md` (SHA-256 `c4c8bcf8…55818`) | `005caae3ea` | committed |
| A `.guides/prompts/prompt.refoundation.yaml` (**P1**) | `065a249a73` | committed |
| B `.guides/prompts/prompt.skills-repository.yaml` (**P2**) | `0071ba26e4` | committed |
| A `.guides/testing/skills-study/protocol.md` | `1189f742cb` | committed |
| A `.guides/ops-contract.md` | `bedb0a8b90` | committed |
| A `.guides/architecture/adr/0002-…md` | `73e1329d89` | uncommitted edit |
| A `.guides/operation/worklog/2026-11-13.refoundation.md` | `a03ec9d7de` | uncommitted edit |

**Files read.** Repository A: the bootstrap, P1,
`.guides/traceability/refoundation.requirements.md`, `.guides/ops-contract.md`,
ADR 0002, `.guides/conversion.md`, the prompt, worklog, agents and ADR schemas,
`.guides/testing/skills-study/protocol.md`, the run record; and, to decide what
a check can decide: `.guides/practice.md`, `.guides/agents/agents.yaml`,
`.guides/assessment/refoundation-assessment.md`, `VALIDATION.md`, `AGENTS.md`,
`package.json`, both templates, `tools/ops-validate/lib/validate.mjs`,
`tools/ops-validate/cli.mjs`, `tools/trace.mjs`, `tools/check-refs.mjs`,
`tools/build-site.mjs`, `tools/run-example.mjs`, and in the study folder
`amendments.md`, `study.config.json`, `frozen.json`, `harness/report.mjs`,
`harness/run.mjs`, `harness/freeze.mjs`, `harness/selfcheck.mjs`. Repository B:
P2, `.guides/traceability/skills-repository.requirements.md`, `package.json`,
`tools/check.mjs`, `tools/sync-ops.mjs`, `test/structure.test.mjs`. From Git
history at `ca82040`: `spec`, `requirement`, `acceptance-criterion`,
`test-cases`, `traceability`, `worklog`, `persona` schemas,
`prompt.schema.v2.json`, `.guides/sdd-process.md`,
`.guides/personas/personas.yaml`, and section 7 of `ROADMAP.md`.

**Commands run, all read-only.** `git` (`rev-parse`, `status`, `log`, `show`,
`diff`, `ls-tree`, `hash-object`), and `node dist/ops-validate.mjs` on P1, P2
and the run record. Result: both prompts and the run record validate, and both
generated maps match their prompts.

**Not verified.** The oracles of C1 to C4 were not read; whether they encode the
expected behaviour of each case is taken on reference. The Skills do not exist
yet.

### How the classes were applied

- The unit is one bootstrap obligation: each Outcome and Boundary, each row of
  the "Execution contract", each numbered Action, each sentence or bullet of a
  Verification or Reporting block, each case, threshold, table of limits, site
  section, deliverable row and completion-report item. 194 in total.
- **COVERED**: a requirement states every operative clause, a step carries it
  and a check that can decide it lists it. Condensed wording is accepted.
- **COVERED BY REFERENCE**: the requirement names the subject and the specifics
  are only in the bootstrap or the protocol.
- **PARTIAL**: an operative clause (a prohibition, a number, a condition, a
  thing to record) is in no requirement, constraint, stop condition, step or
  check of either prompt.
- **MISSING**: nothing carries it.
- **MISPLACED**: the text is carried, but where it cannot work: the only check
  that lists it cannot decide it, or it sits in a construct whose meaning in
  the contract contradicts it. Two rules of the contract were applied
  literally. Section 5: "A check with `run` passes when the command exits with
  code 0", so a `run` check decides only what its command can fail on. Section
  5 again: when a stop condition applies "the executor stops and reports
  instead of continuing". A prohibition that exists only as a constraint is
  also MISPLACED, because no check lists a constraint.
- When a clause is missing and the rest is also unverifiable, the class is
  PARTIAL and the row says both.

## 2. Summary counts

| Class | Count |
|---|---:|
| COVERED | 130 |
| COVERED BY REFERENCE | 28 |
| PARTIAL | 9 |
| MISSING | 1 |
| MISPLACED | 26 |
| **Obligations** | **194** |

| Bootstrap part | Obligations | Covered | By reference | Partial | Missing | Misplaced |
|---|---:|---:|---:|---:|---:|---:|
| Execution contract | 12 | 9 | 0 | 0 | 0 | 3 |
| Outcomes | 6 | 6 | 0 | 0 | 0 | 0 |
| Boundaries | 7 | 4 | 0 | 0 | 0 | 3 |
| 1 Inspect | 11 | 7 | 3 | 1 | 0 | 0 |
| 2 Practice and contract | 21 | 19 | 0 | 2 | 0 | 0 |
| 3 Study definition | 27 | 9 | 12 | 1 | 0 | 5 |
| 4 Baseline | 7 | 6 | 0 | 1 | 0 | 0 |
| 5 Skills | 26 | 24 | 0 | 1 | 0 | 1 |
| 6 Measurement | 10 | 1 | 0 | 1 | 0 | 8 |
| 7 Consolidation | 14 | 11 | 0 | 0 | 1 | 2 |
| 8 Skills repository | 10 | 8 | 0 | 0 | 0 | 2 |
| 9 Website | 14 | 8 | 5 | 0 | 0 | 1 |
| 10 Deliverables | 15 | 13 | 0 | 1 | 0 | 1 |
| 11 Completion report | 12 | 5 | 6 | 1 | 0 | 0 |
| 12 References | 2 | 0 | 2 | 0 | 0 | 0 |

Reading of the numbers: the *text* of the bootstrap is almost entirely present
(1 sentence missing, 9 with a lost clause). The weakness is *verification*: 26
obligations are stated but cannot be decided where they were put. Ten of them
hang on one check whose command cannot fail (root cause A below), and four sit
in the prompt of the repository that cannot observe them.

## 3. Obligations that are PARTIAL, MISSING or MISPLACED

### Root causes shared by several rows

- **RC-A. `measurement-recorded` cannot fail.** P1 gives this check
  `run: npm run study:report`. `harness/report.mjs` writes `results.json` and
  `report.generated.md` and contains no failing exit; it reports an incomplete
  study, an exceeded ceiling or a missing record and still exits 0. Fourteen
  requirements hang on it (O4, O5, B7, S9, M1 to M9, K2), and for ten bootstrap
  obligations it is the only check. Smallest fix: delete the `run` line, so the
  check passes only when the executor observes `expect` and says how; extend
  `expect` with the process clauses named in the rows; add one check
  `study-inputs-frozen` with `run: npm run study:frozen` and requirements
  B7, D17, K2. That script already exists and fails on any unrecorded change.
- **RC-B. Fallbacks written as stop conditions.** P1 stop conditions 4, 5 and
  6 and P2 stop conditions 1 and 4 describe situations in which the bootstrap
  says to keep working locally. Under the contract a stop condition halts the
  run. Smallest fix: write 4 and 5 as conditional action text (contract section
  5: "A condition is written into the action text") and scope 6 and P2-4 to the
  publication step, "after every local step is done".
- **RC-C. Hand-offs between the two prompts.** P2's steps run in the order
  written, but `refine-once` needs P1's `measure` and `publish` needs P1's
  `measure` and `consolidate`. Only the first hand-off (baseline before any
  Skill content) is a dependency and a stop condition.
- **RC-D. Checks that write.** `npm run trace` and `npm run site` regenerate
  their output and pass whether or not the committed file was current. Both
  tools have a `--check` mode that only compares.

### Table

Severity is the reviewer's estimate of consequence, not part of the class.

| # | Bootstrap | Exact quote | Class | What is missing | Smallest fix |
|---|---|---|---|---|---|
| F-01 | Execution contract, L7 | "Do not design a parallel v3 product, a permanent legacy runtime, or a new orchestration framework." | MISPLACED, low | Only P1 constraint 1 carries it. No requirement, so no check. D7 covers the v3 schema only, M3 the study only. | P1: append the three prohibitions to X1 and list X1 in `final-report`, with one `expect` clause. |
| F-02 | Execution contract, L9 | "translate this plan into executable OPS YAML without losing its requirements, scope, checks, or stop conditions" | MISPLACED, high | X3 and D16 are listed only by `plan-translated`. Its command `npm run trace` regenerates the map from P1 and exits 0 whenever P1 validates (RC-D). It does not read P2, the bootstrap or the run record. A map derived from the translation cannot show what the translation left out; this audit found 1 missing and 9 partial obligations behind a passing check. | P1 `plan-translated`: `run: npm run trace -- --check`. P1: new check `translation-audited`, no `run`, requirements X3 and D16, expecting a clause-level audit against the request with every open row closed or accepted by the human; declare this file in `output`. P2: declare its own map in `output` and add a check that compares it. |
| F-03 | Execution contract, L20 | "Write prompts, Skills, schemas, and technical documentation in English; keep the existing Portuguese README aligned" | MISPLACED, low | X2's only check is `references-clean` (`npm run check:refs`: links, script names, retired names, persona uses). It cannot decide language. P2 has no language rule. | P1: move X2 to `consolidated` and add "written in English" to its `expect`. P2: one constraint. |
| F-04 | Boundaries, L34 | "Preserve user edits, repository history, credentials, and unrelated projects. Use isolated branches or worktrees." | MISPLACED, medium | B2, and X1's "preserving Git history", are attached to step `inspect` and check `assessment-complete`, which is evaluated when the assessment is written and whose `expect` does not mention preservation. Nothing decides it after the publication steps. | P1: add B2 to steps `coordinate-publication` and `report` and to check `final-report`; `expect` clause "the branch descends from ca82040 with no rewritten or force-pushed history, and no unrelated file, credential or user edit was changed". |
| F-05 | Boundaries, L35 | "Do not introduce a hosted backend, database, MCP server, daemon, general agent runtime, custom package manager, or benchmark platform." | MISPLACED, low | B3 is listed only by `design-recorded`, whose `expect` does not state it and which is evaluated before the study harness, the Skill scripts and the site exist. | P1: add B3 to `final-report` with an `expect` clause naming the seven excluded things. |
| F-06 | Boundaries, L39 | "Never modify the evaluation to obtain a favorable result." | MISPLACED, medium | B7's only check is `measurement-recorded` (RC-A). Constraint 6 repeats it. | RC-A: the new check `study-inputs-frozen`. |
| F-07 | 1, action 6, L50 | "Do not claim universal compatibility." | PARTIAL, low | Not in I6 and in no constraint. | P1 I6: append "and claim no universal compatibility". |
| F-08 | 2, action 4, L80 | "Keep host configuration thin, reference the Skills, and document unsupported fields." | PARTIAL, low | "reference the Skills" is neither in D5 (P1) nor in P8 or P10 (P2). | P2 P8: append "host configuration refers to the Skills and does not copy their procedures". |
| F-09 | 2, Verification, L94 | "do not recursively execute or regenerate the bootstrap" | PARTIAL, medium | D16 keeps "resume from the first incomplete phase" and drops the prohibition. Step `define-contract` still orders "Translate the bootstrap into this prompt…", which a later run would repeat. Whether completed phases are linked to evidence is decided by no check (F-02): from `84fb616` to `afbe491` the committed run record shows `predefine-study` and `record-baseline` as `pending` while `plan-translated` is `pass`; only the uncommitted working copy corrects it. | P1: constraint "Do not re-execute or regenerate the translation; on a later run verify the existing prompts and resume from the first step the run record does not show as done". Reword the action to "Translate the bootstrap … once". |
| F-10 | 3, cases, L123 | "Hide its detailed fixture, expected solution, and results from the Skill author until the final candidate is frozen." | MISPLACED, low | S4 is listed only by `study-preregistered`, which is evaluated at pre-registration (run record, working copy: `pass` before any Skill exists). The clause can only be decided after the freeze. | P1: add S4 to `measurement-recorded` and move the "stayed sealed until…" clause there. |
| F-11 | 3, score, L151 | "Do not declare the study complete when required pairs are missing." | MISPLACED, medium | S9's only check is `measurement-recorded` (RC-A). | RC-A. |
| F-12 | 3, conditions, L161 | "Record exposed values exactly; mark settings the client does not expose as `UNKNOWN` without inferring them." | MISPLACED, low | S10's only check is `contract-frozen`, whose `expect` covers the kit manifest, not the client, model, effort, permissions and tools of each record. | P1: add S10 to `measurement-recorded`; `expect` clause "every record shows the same client version, model, effort, permissions and tools, or UNKNOWN". |
| F-13 | 3, conditions, L167 | "Keep the first baseline results; never rerun a bad answer until it passes." | MISPLACED, low | S12's only check is `study-preregistered`: the protocol *states* the order. That the runs *followed* it is decided by no check. P2 has no hand-off for the order (RC-C). | P1: add S12 to `measurement-recorded`; `expect` clause "the ledger shows the pre-registered order and one admissible observation per case and condition, with earlier attempts kept". |
| F-14 | 3, budget table, L177 | Row "Maximum evaluation attempts": "19" without refinement, "24" with refinement | PARTIAL, medium | S13 and P1 stop condition 5 state 24 only. The 19 exists in protocol section 8 (since `c78f140`) and in `harness/report.mjs`, not in the prompt, so the prompt's own stop would fire five attempts late in a study without refinement. | P1 S13 and stop condition 5: "19 evaluation attempts without a refinement, 24 with one". |
| F-15 | 3, limits, L179 | "Cap the evaluated runs at two hours and 24 attempts, whichever comes first." | MISPLACED, medium | The numbers are in S13, but the cap acts through stop condition 5 (RC-B): the contract halts the whole run, while the bootstrap only ends the evaluated runs, leaves the rest `NOT_RUN`, and goes on to sections 7 to 11. No harness script and no check enforces the cap (RC-A). | Replace stop condition 5 by an action in `measure`: "When the cap is reached, run nothing further, record the remaining runs as NOT_RUN, report the study as incomplete, and continue with the next step." |
| F-16 | 4, action 5, L191 | "Continue producing local artifacts, but keep effectiveness and publication claims explicitly unverified." | PARTIAL, high | The sentence is in neither prompt. BL5 ends at NOT_RUN. Stop condition 4 turns the fallback into a halt (RC-B). `baseline-recorded` expects "the four WITHOUT_SKILLS records" and has no NOT_RUN branch, so the fallback can never pass its own check. P2 stop condition 1 ("baseline evidence … not committed yet") would then block the Skills for good. | P1 BL5: append the sentence. Replace stop condition 4 by action text in `record-baseline`. `baseline-recorded`: add "or the comparisons are recorded NOT_RUN with the reason and the exact commands". P2 stop condition 1: "scored records, or the NOT_RUN record with its reason". P1 R2: "effectiveness and publication claims are marked unverified when the study did not run". |
| F-17 | 5, packaging 9, L235 | "Keep the profile or mapping identical across scored conditions; only Skill availability changes." | MISPLACED, low | P9 is a rule about how the study is run. It sits in P2 and is listed by `host-notes-honest`, which reads a README. The study runs in repository A, where D17, S10 and the run records carry it. | P2: remove P9 from `host-notes-honest` and say in its text that it is verified in repository A; or P1 S10: append "no Skill procedure in the baseline profile, task text identical". |
| F-18 | 5, Verification, L240 | "Use the reference validator when available and record its version; structural validation alone is not proof of behavioral quality." | PARTIAL, low | P11 drops the second half. No check `expect` asks for the recorded validator version. P11 is attached to `integrate-hosts` and `refine-once`, not to `author-skills`, where the work is done. | P2: add P11 to step `author-skills`; append the caution to P11; `candidates-preserved`: add "the reference validator's version and result are recorded". |
| F-19 | 6, action 1, L246 | "Apply the frozen rubric to actual artifacts and traces." | MISPLACED, medium | M1: RC-A. | RC-A. |
| F-20 | 6, action 2, L247 | "Compare each result with its baseline." | MISPLACED, medium | M2: RC-A. | RC-A. |
| F-21 | 6, action 4, L249 | "Freeze the final candidate before accessing C5's results." and "Do not tune against C5 afterward." | MISPLACED, medium | M4 states it in P1, but the files it protects are in repository B. P2 has no constraint against changing `skills/` after the freeze (its repair cycles, `integrate-hosts` and a re-sync of bundled material all can), no hand-off before `refine-once` and `publish` (RC-C), and no check that the published Skills are the measured candidate. `tools/sync-ops.mjs --check` compares the bundle with its own record, not with the current contract. Verification in P1: RC-A. | P2: stop conditions "The INITIAL_SKILLS results of C1 to C4 are not recorded yet" (for `refine-once`) and "The final candidate has not been measured, or the OPS consolidation is not finished" (for `publish`). P2 constraint: "After the final candidate is frozen, change nothing under `skills/`; a later change is a new, unmeasured candidate and is disclosed". P2 `published`: add "the published Skill directories are byte-identical to the final measured candidate, or the difference is disclosed and its effectiveness marked unverified". |
| F-22 | 6, action 5, L250 | "Verify actual loading from client evidence." | MISPLACED, medium | M5: RC-A. | RC-A. |
| F-23 | 6, action 6, L251 | "perform at most two smoke checks: one authoring example and one planning or execution example" | MISPLACED, low | M6: RC-A. The composition of the two checks is only in the bootstrap. | RC-A. |
| F-24 | 6, action 7, L252 | "Preserve them for follow-up work." | PARTIAL, low | Not in M7. Nothing ties activation or smoke failures to the roadmap gaps (K8) or the report's next actions (R2). | P1 M7: append "and are kept as follow-up items in the report and the roadmap". |
| F-25 | 6, reporting, L256 | "State missing telemetry." | MISPLACED, medium | M8, with the per-attempt fields of the same paragraph: RC-A. | RC-A. |
| F-26 | 6, reporting, L258 | "Include every attempted run in the accounting." | MISPLACED, medium | M9: RC-A. | RC-A. |
| F-27 | 6, reporting, L260 | "Do not claim statistical significance, a reliability percentage, universal superiority, or general productivity gains" | MISPLACED, medium | M9: RC-A. | RC-A. |
| F-28 | 7, action 2, L267 | "invalidate affected comparisons. Re-run affected matched conditions only within the existing budget" | MISPLACED, medium | K2 belongs to step `consolidate`, but its only check is `measurement-recorded` (RC-A). The list of inputs that trigger it is only in the bootstrap and in protocol section 9. | RC-A. Also list K2 in `consolidated`: "no frozen evaluated input changed after measurement, or the affected comparisons are marked invalid or unverified". |
| F-29 | 7, Verification, L279 | "Review the complete diff against the refoundation objectives." | MISPLACED, low | In K9, whose only check is `npm run check:refs`. The check that expects the review, `consolidated`, does not list K9. | P1: add K9 to `consolidated`. |
| F-30 | 7, Verification, L279 | "Do not broaden verification beyond a remaining risk or required repository gate." | MISSING, low | In neither prompt. | P1: one constraint, or append to K9. |
| F-31 | 8, action 1, L285 | "licensing based on verified project permissions" | MISPLACED, low | G1's only check is `structure` (`npm test`), which cannot decide licensing, documentation, integration examples or supported-client status. `LICENSE` is an output without rules and is untracked in repository B at this snapshot. | P2: add G1 to `host-notes-honest`; `expect` clause "LICENSE states the licence the owner confirmed, and where that confirmation is recorded"; one rule on the `LICENSE` output. |
| F-32 | 8, action 5, L289 | "Prepare coherent commits and reviewable branches for both repositories." | MISPLACED, low | G5, G6 and G8 speak for both repositories but live in P2, which can observe only repository B. P1 has no requirement for its own half (reviewable branch, existing protections, no automatic merge, an open pull request told apart from a merged change): only two actions in `coordinate-publication` and stop condition 3. | P1: one requirement on `coordinate-publication` and `final-report`: "The OPS changes are coherent commits on a reviewable branch, proposed by pull request under the existing rules and never merged automatically; an open pull request and a merged change are told apart." |
| F-33 | 9, Verification, L318 | "Verify the documented installation and example on the supported primary client." | MISPLACED, low | In W5's text. No action of `publish-site` performs it and the `expect` of `site-public` does not include it. | P1: add the action to `publish-site` and the clause to `site-public`. |
| F-34 | 10, table, L338 | Row "Worklog and final report": "Files changed, commands, outcomes, decisions, unresolved gaps, real commits/PRs/URLs" | PARTIAL, low | The final report has no declared artifact. P1 `output` lists no file for it, so `final-report` has nothing fixed to read. | P1: declare the report file in `output`, or say in R2 that the body of the run record is the final report. |
| F-35 | 10, L340 | "Keep bulky raw run output out of installable Skill folders" | MISPLACED, low | Carried by P1 R1 and checked in P1, but the folders are in repository B. Repository B has a test for it and no requirement. | P2 P3 or G1: append "no evaluation output inside a Skill folder", so that `structure` lists it. |
| F-36 | 11, L353 | "Name the unresolved requirement rather than calling a partial result complete." | PARTIAL, low | Not in R2. `final-report` asks for "exact blockers" only. | P1 R2: append "naming each requirement that remains unresolved". |

Editing P1 or P2 changes a definition that a run record already names. Raise
`version` and note the change in the run record, or the entry will be
cross-checked against text it did not run.

## 4. COVERED BY REFERENCE

For P1 the bootstrap is a declared `input`. For P2 it is not and cannot be (a
prompt's paths stay inside its workspace); P2 reaches it only through the prose
of `context` and the sibling-checkout dependency. P2's requirements are close
to verbatim, so it leans on the reference very little.

| Bootstrap | Requirement that names it | Where the specifics are | Agrees with the bootstrap? |
|---|---|---|---|
| 1 action 1, L45: `AGENTS.md`, `GUIDED.md`, `CLAUDE.md`, `.github` instructions | I1, "repository instructions" | bootstrap L45 | yes |
| 1 action 3, L47: what the snapshot claims; the reference example "is a demonstration, not evidence of working software" | I3 | bootstrap L47; commit named in P1 `context` | yes |
| 1 action 4, L48: what to inspect in legacy inputs (YAML, `ops/v1` identifiers, persona names, schema paths, output shapes) | I4 | bootstrap L48 | yes |
| 3 hypotheses, L105 to L107: the three statements | S2 names H1, H2, H3 | protocol section 2 | yes, verbatim |
| 3 cases, L117 to L121: expected behaviour of C1 to C5 (5 obligations) | S3 names the five cases | bootstrap table; protocol section 4; the oracles | C1 to C4 in outline; oracles not read. C5 is now "reserved regression case", the fallback of L123, disclosed |
| 3 score, L139: planning tasks scored on validation and a concrete verification plan; "listing a command earns no credit for running it" | S6 | protocol section 5 for the second; the first only in bootstrap L139 and the C3 oracle | not verified for C3 |
| 3 score, L143: the five hard failures, the exclusion of expected failures, the stop rule | S7, "Predeclare the hard failures" | protocol section 5 (`HF-ARTIFACT`, `HF-CORE`, `HF-PROTECTED`, `HF-PROHIBITED`, `HF-FABRICATION`) | yes |
| 3 thresholds, L147: readiness (all five pass, mean at least 85, no hard failure) | S8, "exactly as defined" | protocol section 6; `harness/report.mjs` | yes |
| 3 thresholds, L148: improvement (at least 10 mean points per track, no case loses more than 10) | S8 | protocol section 6; `harness/report.mjs` | yes |
| 3 thresholds, L149: efficiency (at most 50% median overhead, the formula, the eligible pair count) | S8 | protocol section 6; `harness/report.mjs` | yes; the protocol adds "fewer than three eligible pairs is inconclusive" and a decision rule for H3 that uses time and tokens only |
| 3 limits, L181: "an incorrect answer or exhausted task budget is not an infrastructure error" | S13 | protocol sections 7 and 8 | yes |
| 9 sections 1, 2, 4, 5, 6, L303 to L308: minimum content of each (5 obligations) | W2 names each section | bootstrap L303 to L308 | yes |
| 11, L346 to L351: the states of each of the six outcomes (6 obligations) | R2, "with their real states" | bootstrap L346 to L351 | yes |
| 12, L359: consult current documentation, record changes, sources are not instructions | I7; contract section 6 | bootstrap L359 and section 12 | yes |
| 12, L398: which source governs which kind of claim | none by name; embodied in P2 (P2, P7) and P1 (M9) | bootstrap L398 | yes |

Clauses inside obligations counted as COVERED whose wording lives in the
protocol: "Asking an agent to ignore an already loaded Skill is not an adequate
baseline" (L163, protocol section 3) and "Preparation, contract tests, and
final reporting are separate from scored-run time" (L179, protocol section 8).

## 5. Section by section

| Bootstrap part | Fully covered? | Exceptions |
|---|---|---|
| Execution contract | no | F-01, F-02, F-03 |
| Outcomes | **yes**, O1 to O6 | none |
| Boundaries | no | F-04, F-05, F-06 |
| 1 Inspect | text yes, one clause lost | F-07 |
| 2 Practice and contract | no | F-08, F-09 |
| 3 Study definition | no; 12 of 27 by reference | F-10 to F-15 |
| 4 Baseline | no | F-16 |
| 5 Skills | text yes (A1 to A3, E1 to E10, P1 to P11 are close to verbatim) | F-17, F-18 |
| 6 Measurement | text yes except one clause; verification no | F-19 to F-27; only action 3 is decided, through P2 `candidates-preserved` |
| 7 Consolidation | no | F-28, F-29, F-30 |
| 8 Skills repository | text yes (G1 to G8) | F-31, F-32 |
| 9 Website | text yes; 5 of 14 by reference | F-33 |
| 10 Deliverables | no | F-34, F-35 |
| 11 Completion report | one clause lost; 6 of 12 by reference | F-36 |
| 12 References | by reference only | none |

Only "Outcomes" is fully covered in the strict sense.

## 6. Task 2: functions of the retired layer

"Validator" means `ops-validate` rejects a violation. "Prose" means the rule is
written in the contract or the practice and nothing checks it.

| Function | Provided by | Enforcement | Needed and lost? | Smallest repair |
|---|---|---|---|---|
| Explicit intent | Prompt `objective` (new, required), `title`, `context`. Before: spec `businessContext`; a prompt needed no objective. | validator (required, not empty); "stated so it can be checked" is prose | no | none |
| Constraints | Prompt `constraints`, `stopConditions`, `limits`; the workspace as write boundary (contract 4.2). Before: no constraint field; persona principles; requirement priority `wont`. | validator for shape, ranges and declared paths; obeying them is prose; no check lists a constraint (F-01) | no | `practice.md`, one sentence: a constraint that must be proven is also written as a requirement. |
| Expected outcomes | `objective`, `output[].file` and `rules`, `verification[].expect`. Before: acceptance criteria in Given/When/Then with data examples. | validator: `output` present, at least one check with `expect`. Not enforced: that a declared output exists when a run is `completed`; output `rules` unless a check repeats them | no | `ops-contract.md` section 5, "Completion": add "and every declared output exists". |
| Verification of outcomes | `verification` checks; worklog `checks[]`; rules `completed-without-proof`, `plan-claims-execution`, `record-unknown-check`. Before: test cases and a Markdown conformance report; nothing mechanical. | validator for structure and for "completed needs every check passed". Prose only: checks run after the last change; `result: pass` with a non-zero `exitCode` validates; nothing says a `run` command must be able to fail (RC-A, RC-D) | no; see the two "yes" rows below | Validator: reject `pass` with an `exitCode` other than 0, and require `command` and `exitCode` when the prompt's check has `run`. |
| Resolvable executor and workspace | `agent` resolved through `.guides/agents/agents.yaml` or the built-in map; `--resolve`; `workspace`, `inputs`. Before: `persona` from a closed list of labels; a pattern for `workspace`. | validator (`agent-missing`, `agent-unresolved`, `agent-profile-missing`, `workspace-not-found`, `path-invalid`, `input-not-found`). What actually ran (`executor`) is self-reported. | no | none |
| Human decisions and approvals | Worklog `approvals[]` with `by`, `at`, `scope`, optional `reference`; ADR `status`; practice steps "Review" and "Decision". Before: approvals and sign-offs attributed to persona labels; spec `status` from draft to approved. | validator: shape, and `approval-by-agent` when `by` equals the agent, host, model or profile. Prose: review before execution. `reference` is optional, so an approval with no source validates. | no | Optional hardening: make `reference` required in `worklog.schema.json`. |
| Traceability from a requirement to the evidence that it was completed | Prompt `requirements` referenced by steps and checks; the generated map; worklog `checks[]` with `result`, `command`, `exitCode`, `at`, `evidence`; `prompt.id`, `version`, `sha256`. Before: a matrix from requirement to criterion, test case, commits and evidence, and a verdict per requirement. | validator: every requirement has a check; an entry and its prompt agree on ids. Prose or absent: `evidence`, `command`, `exitCode` and `at` are all optional, so a bare `pass` validates; `prompt.sha256` is never compared; no artifact joins requirement, result and evidence; one check may list many requirements (14 on `measurement-recorded`), so a pass does not say which requirement it proved | **yes**, the last link | `ops-validate --trace`: accept a worklog entry and print result, time and evidence per requirement. Validator: a `pass` needs `at` and either `command` with `exitCode: 0` or one `evidence` item. No schema change. |
| Risk level and business context | `context`, free text. `riskLevel` and `businessContext` are rejected with a pointer to `context`. | prose | no | none. Nothing in the old layer acted on `riskLevel`; a team that wants the signal can use a tag or a constraint. |
| Supersession and deprecation | ADRs keep `status` and `supersededBy`. Prompts: integer `version`, deletion, Git history; the "Retired files" table of `conversion.md`. A worklog entry that names a deleted prompt stays valid. | ADR: validator for shape only. Prompts: prose | no | `practice.md`, one sentence: the commit or run record that deletes a prompt names what replaces it. `adr.schema.json`: `relatedSpecs` still says "specIds", a retired concept; reword it. |
| Test cases distinct from checks | No artifact. Checks, plus the project's own tests. | absent, by decision | **yes** for the function, not for the artifact: nothing makes a check specific to its requirement or able to fail, so one generic command can "cover" any number of requirements (RC-A is an instance) | `ops-contract.md` section 5 or `practice.md` "Verify", and the `ops-author` Skill: "A check names an observation that would differ if the requirement were not met; a `run` command exits non-zero in that case; a behaviour change records the failing run before the fix." |
| Ownership and accountability | Concept text ("Human … stays accountable"); optional `createdBy`, which records authorship; worklog `executor` and `approvals[].by`; the repository ownership table. Before: spec `owners[]` and `createdBy`, both required, holding persona labels. | prose. No field names the accountable human of a prompt or of a run; in P1 and P2 `createdBy` names the agent | **yes** | `ops-contract.md` section 3: define `createdBy` as "the accountable human or team, then the authoring tool"; name the requesting human there in both prompts. No schema change. |
| Other: where a requirement comes from | A text convention, "(section)" at the end of each requirement. Before: requirement `source` and `rationale`. | absent as a field; the convention is not documented and carries no line reference | **yes**, small; it is what this audit had to reconstruct by hand | `ops-contract.md` section 3: document the convention, or allow an optional `source` on a requirement and print it in the map. |
| Other: one request, several prompts | Prose in `context`. Requirement ids are local to a prompt; there is no combined map; hand-offs are free-text dependencies. Before: `specId`, global `requirementIds`, `parentPromptId`. | absent | **yes**; this task is two prompts (RC-C, F-21, F-32) | `ops-contract.md` section 4.2, after "A task that spans two repositories is two prompts": each prompt names the others by id and repository, and each hand-off is a dependency and a stop condition in the receiving prompt. `tools/trace.mjs`: one map over both prompts. |
| Other: lifecycle state of a definition, follow-up of gaps, independent review, requirement priority | Run state in worklog `status`; "Next unit" in the entry body and the roadmap; the human's decision step; nothing for priority | prose or absent | no | none |

**When to repair.** `ops-contract.md`, `conversion.md`, the prompt, agents and
worklog schemas and the validator bundle are frozen study inputs
(`.guides/testing/skills-study/kit/manifest.json`), and `adr.schema.json` is
embedded in the validator. A repair to any of them belongs to step
`consolidate` and falls under K2: the comparisons for the changed bytes are run
again within the budget or reported as unverified, and the budget is fully
planned (protocol section 8: 19 of 19). `practice.md`, the templates,
`tools/trace.mjs`, the Skills (not written yet) and both prompts are outside the
kit and can be repaired now.

## 7. In the prompts but not in the bootstrap

### P1

1. **Tool choices as dependencies**: Node.js 20, the GitHub CLI with
   organization rights, Claude Code as the client. The bootstrap says "the
   already configured agent" and names no runtime.
2. **A purpose-built validator and a distributable bundle**
   (`dist/ops-validate.mjs` as an output; action "Implement the validator rules
   a schema cannot express"), with a vocabulary of about thirty error codes. The
   bootstrap asks for "working validation commands", not for a new tool. ADR
   0002 records the consequence ("depends on Node.js to validate").
3. **An agent map** (`agents.schema.json`, `.guides/agents/agents.yaml`) as a
   new artifact. The bootstrap asks to "define how it resolves" and warns
   against an "OPS registry" that clients would load.
4. **A separate `practice.md`**, beside the contract, the ADR, the assessment
   and the conversion guide. The bootstrap says "Avoid a document for every
   small decision."
5. **A study harness and oracle self-checks with reference solutions**
   (`npm run study:selfcheck`; `oracles-self-check` expects "every reference
   solution reaches the designed score"). Compatible with action 4.1; worth one
   look against "no … benchmark platform" (B3, F-05).
6. **Environment probes with an agent** (action "Verify with probes that the
   baseline condition exposes no candidate Skill…"). The protocol counts these
   sessions, the harness smoke case and the authoring of C5 as preparation,
   outside the attempt ceiling; the bootstrap's table has no such row.
7. **`limits.repairAttempts: 2` for the whole task.** The bootstrap's two
   cycles are for execution tasks inside the study. Read literally, a
   repository check that fails three times (`references-clean` is failing by
   design until `consolidate`) blocks the run.
8. **Stop condition 1**, "A directory that conflicts with the planned Skills
   checkout already exists." The bootstrap says never overwrite it; it does not
   say stop.
9. **Writes outside P1's workspace.** P1's action "Translate the bootstrap into
   this prompt and the Skills repository prompt" writes into the sibling
   checkout (the assessment says that checkout was "created during the work";
   its first commit holds the task prompt only), and study runs keep workspaces
   in a third directory. Contract section 4.2 exempts only the run's worklog
   entry and scratch files that are not kept. P1 also lists that checkout as a
   dependency, that is, as something that exists beforehand.
10. **A site generator** (`tools/build-site.mjs`, `site/` sources, the `marked`
    dependency). No site existed, so something had to be built; it is new code.
11. **Constraint 6 is wider than the bootstrap**: "a fixture, an oracle or a
    threshold". Three oracles were nevertheless changed after their baseline
    runs; this is disclosed in `amendments.md` and paid for with reruns.

### P2

1. **The objective fixes that every Skill bundles the validator** ("carries a
   mechanically synchronized copy of the canonical OPS schemas and validator"),
   and the tests of repository B already require `scripts/ops-validate.mjs` in
   both Skills. Bootstrap 5.4 and P2's own P4 allow a script only for work
   "demonstrated by the baseline". The justification must come from the
   baseline gap list, which this audit did not open.
2. **Node.js 22.20** as a dependency "for the `skills` CLI". P1 says 20, and
   both `package.json` files say 20.
3. **A 300-line limit** for `SKILL.md` in `tools/check.mjs` (the bootstrap says
   "substantially less than" 500), and output rules taken from the Agent Skills
   specification (name equals directory, description at most 1024 characters).
4. **"default branch … as intended"** in `published`.
5. P2 declares no `inputs` and neither declares nor checks its own requirement
   map.

### The protocol (a referenced resource)

Statuses `TIMEOUT` and, in the report, "rerun pending"; "anchor" assertions;
the rule that fewer than three eligible pairs is inconclusive; a decision rule
for H3; corrective reruns after an oracle repair, counted as evaluation
attempts; "No further oracle changes".

## Appendix: observations outside the classification

- **Repaired while this audit ran** (commit `c78f140`): the protocol's own rule
  that let a changed oracle re-score stored attempts without a rerun was
  withdrawn and section 9 now says "or an oracle", as bootstrap L267 does; the
  ceiling of 19 attempts without a refinement entered protocol section 8; C5
  is called a reserved regression case, as L123 requires when the separation
  cannot be shown. These were findings of this audit until then and are no
  longer listed.
- **Still at odds with the bootstrap, and disclosed**: C5 was delivered and
  frozen after the baseline runs (`amendments.md` section 6). Bootstrap L113
  and L129, and S3 in P1, ask for the assertions of every case "before the
  baseline". The run record (working copy) nevertheless marks
  `study-preregistered` as `pass`; the wording of that check ("Protocol, cases,
  oracles and harness were committed before the first scored run") has no
  branch for a late case or for oracles changed after their run.
- **Condensations that lost no operative clause** (not counted): L48 "do not
  require attachments from an unseen conversation"; L77 "Avoid a document for
  every small decision"; L82 "do not confuse schema dialects or content
  revisions with a product-release strategy"; L86 "do not ship an archive of
  duplicated instructions as the new onboarding path"; L113 "avoid network
  services, large dependency installations, and production systems"; L181
  "Those cycles are not independent repetitions"; L236 "Do not assume that the
  Skills CLI installs repository-level agent definitions"; L258 "Activation
  probes and smoke checks must not increase the scored sample size"; L273 "not
  a successor-release migration"; L290 "do not introduce repeated generic
  approval gates". Each is implied by the requirement that replaced it or is
  stated in the contract or the protocol.
- **K9 and "formatting"**: K9 keeps "formatting … checks". The repository has
  no formatting command; "applicable" covers that, so it is not a finding.
