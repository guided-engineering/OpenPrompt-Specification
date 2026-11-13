# An OPS example, end to end

One small change, followed from the request to the evidence. Everything on this
page is read from [`examples/project/`](../examples/project/) when the site is
built, and that example is executed by `npm run example`: the prompt and the
worklog entries are validated and the prompt's checks are run again.

This is an **illustrative example**. It is not one of the measured study cases;
those are on the [results page](results.html).

## 1. The request

What a person wrote, in plain language:

{{body:examples/project/request.md}}

## 2. The OPS prompt

The same request as a task contract. It names the workspace, states an
objective that can be checked, carries the constraints, orders the work, and
lists the checks that decide completion. Nothing has been changed yet at this
point; the person reads this and corrects it before any code is touched.

{{file:examples/project/.guides/prompts/prompt.slug.clean-separators.yaml|yaml}}

Validated with:

```bash
node dist/ops-validate.mjs --resolve examples/project/.guides/prompts/prompt.slug.clean-separators.yaml
```

## 3. The plan

Asked to plan, the agent validates the prompt, resolves where the work
happens, and writes a plan in which every task has a check. A plan is recorded
as a worklog entry with `mode: plan`, and it cannot claim that anything ran.

{{body:examples/project/.guides/operation/worklog/2026-11-13.slug-clean-separators-plan.md}}

## 4. The evidence

Asked to execute, the agent reproduces the failure, makes the change, runs the
checks again after the last edit, and records what it observed. The front
matter of the entry is the checkpoint and the index of evidence:

{{frontmatter:examples/project/.guides/operation/worklog/2026-11-13.slug-clean-separators.md}}

And the readable record:

{{body:examples/project/.guides/operation/worklog/2026-11-13.slug-clean-separators.md}}

## 5. The decision

The entry has no `approvals`. The agent executed and reported; whether the
change is merged is a person's decision, and when it is made it is recorded as
that person's, with a reference to where it was given.
