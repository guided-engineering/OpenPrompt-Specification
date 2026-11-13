# Examples

Everything here is checked by `npm test`, `npm run validate` or
`npm run example`. Nothing here is a measured study case; those live under
[`.guides/testing/skills-study/`](../.guides/testing/skills-study/protocol.md).

| Directory | What it shows | Checked by |
|---|---|---|
| [`project/`](./project/) | **The end-to-end example.** A request, its OPS prompt, the plan, and the worklog entry of the run, in a tiny repository with a nested workspace. Illustrative. | `npm run example` |
| [`valid/`](./valid/) | The smallest valid prompt, and two worklog entries: an honest blocked run and a completed one with a human approval. | `npm run validate` |
| [`invalid/`](./invalid/) | One file per rejection. Each starts with a comment naming the error code it must produce; [`expected.json`](./invalid/expected.json) lists them. They are invalid on purpose. | `npm test` |
| [`conversion/onboarding/`](./conversion/onboarding/report.md) | A first-generation prompt taken verbatim from Git history, its canonical conversion, and a report of every decision. | `npm test` |

`invalid/` and each example project are repository roots of their own: they
contain a `.guides/` folder, so the validator resolves agents, workspaces and
inputs against them and not against this repository.

## Try the validator

```bash
node dist/ops-validate.mjs examples/valid/prompt.minimal.yaml
node dist/ops-validate.mjs --resolve examples/project/.guides/prompts/prompt.slug.clean-separators.yaml
node dist/ops-validate.mjs examples/invalid/prompt.actor-conflict.yaml
```

The third command exits with code 1 and explains why: the file declares two
contradictory actors, and the validator does not choose between them.
