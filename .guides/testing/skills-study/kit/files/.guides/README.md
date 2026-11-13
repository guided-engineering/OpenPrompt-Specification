# OPS in this project

This project uses OPS prompts: validated task contracts for work that an agent
carries out.

| What | Where |
|---|---|
| The contract (normative) | `.guides/ops-contract.md` |
| Converting documents of the earlier contract | `.guides/conversion.md` |
| Schemas | `.guides/schemas/` |
| Prompts | `.guides/prompts/prompt.<name>.yaml` |
| Worklog entries | `.guides/operation/worklog/<entryId>.md` |

Validate a prompt or a worklog entry:

```
node .guides/tools/ops-validate.mjs <file>
node .guides/tools/ops-validate.mjs --resolve <prompt>
node .guides/tools/ops-validate.mjs --help
```

`.guides/tools/ops-validate.mjs` is a generated bundle. Run it; do not open it.
