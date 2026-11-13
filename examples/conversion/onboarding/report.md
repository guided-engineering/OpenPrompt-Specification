# Conversion report: `base.onboarding.generate`

| | |
|---|---|
| Legacy input | [`legacy.yaml`](./legacy.yaml), byte-identical to `prompt.onboarding.yaml` at commit [`c2c06ae`](https://github.com/guided-engineering/OpenPrompt-Specification/blob/c2c06ae/prompt.onboarding.yaml) (blob `8c8ca13`) |
| Canonical output | [`.guides/prompts/prompt.onboarding.yaml`](./.guides/prompts/prompt.onboarding.yaml) |
| Converted by | hand, following [`.guides/conversion.md`](../../../.guides/conversion.md) |

The legacy file is rejected by the validator (`legacy-api-version`,
`legacy-persona`, `legacy-field`, `agent-missing`, `verification-missing`). The
canonical file is accepted.

## What changed

| Legacy | Canonical | Why |
|---|---|---|
| `apiVersion: ops/v1` | `apiVersion: guided-engineering/v1` | The document was converted to the canonical contract. Changing only this line would not have made it valid. |
| `$schema: .guides/schemas/prompt.schema.json` | removed | The path was relative to the repository root, not to the file, and named the earlier schema. `$schema` is optional. |
| `persona: DocumentationEngineer` | `agent: guided-engineer` | See "Decisions" below. |
| `category: base` | tag `base` | Classification has no execution meaning. |
| `difficulty: intermediate` | removed | No execution meaning. The value was also outside the legacy enum. |
| `language: english` | removed | It described the language of the prompt itself. |
| `output[].language: portuguese` | constraint and output rule "Written in Brazilian Portuguese" | The field mixed file format and natural language. The requirement is now stated where it is checked. |
| `dependencies` listing `.guides/` folders | `inputs: [.guides/]` plus one dependency sentence | An input must exist; the sub-folders are optional per project, so a missing one is reported as a gap. |
| 2 steps, 15 actions | 3 steps, 19 actions | A verification step was added. Vague actions were made checkable (below). |
| no checks | 4 `verification` checks | A prompt without a check cannot be completed. |
| `version: 1` | `version: 2` | The task definition changed in substance. |

## Vague actions made concrete

| Legacy action | Canonical action |
|---|---|
| "Read and integrate relevant content from `.guides/*`." | List what exists, note what is missing, and record the source file of each fact. |
| "Provide local setup and development instructions." | Give them "exactly as documented"; an undocumented topic is written as "não documentado". |
| "Append a section with contributors based on Git history." | Named command, named section title, and a check that compares the two. |

## Decisions the converter made

- **Persona to agent.** `DocumentationEngineer` was a role label. It was not in
  the persona list of its own time, and no agent map declares it. The task
  needs no special tools or profile, so it now names the default agent, which
  resolves to the current executor. The role's intent, careful and grounded
  documentation, is carried by the constraints, not by a label.
- **"Describe personas and their responsibilities."** The project's persona
  catalogue no longer exists. The action now asks for "who does what in the
  project", including the agent map when there is one. This is a change of
  content, not only of wording.

## Left for a human

- **Author emails.** The legacy prompt publishes contributor names and emails
  from the Git history in a document. That intent is preserved, but it is a
  privacy decision, so the canonical prompt lists it as a stop condition until
  a human confirms it.
- **Nothing was dropped silently.** Every legacy field is accounted for in the
  table above.
