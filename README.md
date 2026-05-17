# Guided Engineering

*A Spec-Driven Development (SDD) framework.*

OpenPrompt-Specification
Version: 0.5.0 — see [`ROADMAP.md`](./ROADMAP.md) for the delivery history and Phase 6+ outlook.

~~Vibe Coding~~ → **Guided Engineering** is a structured, traceable, and executable framework for **Spec-Driven Development**: versioned specifications drive every downstream artifact (code, tests, ADRs, worklogs) through modular prompts, personas, and reproducible documentation.

This project uses versioned YAML prompts, schema validation, personas, and categorized outputs to enable human–machine collaboration with high observability, reproducibility, and minimal complexity.

> **Brand:** Guided Engineering. **Methodology:** SDD. See [`.guides/sdd-process.md`](./.guides/sdd-process.md) for the lifecycle.

---

## ❓ Why Guided Engineering?

Because modern software is too complex to be left to chance.

Teams face:

* Fragmented tools and chaotic handoffs.
* Hidden knowledge and undocumented decisions.
* Low reproducibility and onboarding friction.
* Over-reliance on opaque automation.

**Guided Engineering** addresses these pain points by:

* Treating **engineering as a traceable process**, not an ad-hoc craft.
* Shifting from unstructured communication to **structured execution**.
* Giving engineers **control over AI** through validated, readable prompts.
* Creating a long-term **memory** of why, how, and by whom something was done.

It allows teams to **move fast without losing context**, and **automate without losing control**.

> It's not just about doing things faster. It's about doing them *understandably*.

---

## 🚫 What Guided Engineering *is not*

To avoid confusion, it’s important to be clear on what this practice **does not aim to be**:

| ❌ Not This                     | ✅ But Instead                                     |
| ------------------------------ | ------------------------------------------------- |
| A no-code tool                 | A human-led system for *codifying intent*         |
| A replacement for engineers    | A **framework for engineers to lead AI**          |
| An automation-first approach   | An **explainability-first** methodology           |
| A documentation generator      | A **documentation-first** execution model         |
| A black-box assistant          | A **white-box process** with full visibility      |
| A generic AI prompt collection | A **validated, version-controlled** prompt system |
| DevOps boilerplate factory     | A **customizable, observable** execution flow     |
| Magic AI glue                  | A **disciplined orchestration of agents**         |

**Guided Engineering is not about replacing expertise** — it's about structuring it.

It's not automation **for its own sake**, but rather **augmentation with purpose**.


## 👨‍🏫 What is Guided Engineering?

Guided Engineering is not just a tool, it's a **practice**.

It defines a new way of working where **engineers coordinate agents** (e.g., LLMs, tools, automations) to execute small, traceable tasks. The human leads the process; the machine assists with precision and context.

Key aspects:
- Discipline and explainability over chaotic automation.
- Every task is represented by a validated, version-controlled prompt.
- Clear personas define responsibilities for each type of activity.
- All outputs are observable, auditable, and reproducible.


```bash
[👤] Human
   ├─ Plans
   ├─ Selects Prompts
   └─ Orchestrates Execution
        ↓
[🎯] Structured Prompt (.yml)
   ├─ YAML + Schema + Persona
   └─ Defines Inputs, Steps, Outputs
        ↓
[🤖] Execution Agent (LLM)
   ├─ GPT, Claude, Copilot, etc.
   └─ Executes Prompt with Context
        ↓
[📂] Outputs (Markdown)
   ├─ Docs, Reports, Assessments
   └─ Stored in `.guides/` folder
        ↓
[🔁] Continuous Cycle
   ├─ Plan
   ├─ Execute
   ├─ Document
   └─ Learn
        ↺ (Feeds back to Prompts)

```

---

## 🧭 The Practice (Human-led)

At its core, Guided Engineering is a **human-led practice** that organizes the SDLC using guided steps and structured decision-making.

### Core tenets of the practice:
- Engineers **orchestrate agents** through prompt-driven workflows.
- Tasks are **declarative** and **traceable** - never implicit or opaque.
- The SDLC becomes an auditable process, from discovery to maintenance.
- Personas represent real engineering roles (e.g., QA Analyst, SRE, Code Auditor).
- Documentation is not an afterthought - it’s a first-class citizen.

---

## 📦 The Artefacts (Structured Knowledge)

Guided Engineering relies on structured, versioned artefacts to guide execution and preserve traceability.

### Main artefact types:
- **YAML** prompts (`*.yaml`): Define intent, context, persona, and execution steps.
- **YAML** specs (`*.yaml` under `.guides/specs/`): Versioned source of truth for every feature.
- **Markdown** documentation (`*.md`): Capture structured outputs, decisions, playbooks, ADRs.
- **JSON** schemas (`*.json`): Enforce structure, consistency, and validation.

Artefacts are stored in a canonical `.guides/` folder, categorized by function.

---

## 🏗️ The Output (Software Built with Guidance)

Software projects developed using Guided Engineering exhibit the following characteristics:
- Every decision, plan, and test is **documented as a prompt and output**.
- Projects are **self-documenting**, **self-explanatory**, and **reproducible**.
- No tribal knowledge - everything is explicit and preserved.
- Transitions, audits, and onboarding become seamless due to rich context.

This ensures systems are not only built well - they’re **built understandably**.

---

## 🛠️ The Tooling (Execution Support)

Guided Engineering is supported by a growing ecosystem of tools that automate, scaffold, and simplify the use of the practice:

- **CLIs** to run prompts, generate documentation, and validate outputs.
- **Portals** for browsing `.guides/` content visually.
- **DevTools & extensions** to integrate prompts and personas into daily workflows.
- **Templates & generators** to scaffold projects and personas with validated structure.

These tools serve as assistants - never as replacements for engineering judgment.

---

## 📁 Project Structure (`.guides/`)

| Folder              | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `base/`             | Project-level structure and setup guides                             |
| `product/`          | Product requirements, roadmap, user personas                         |
| `specs/`            | **SDD specs** — versioned source of truth for every feature          |
| `traceability/`     | **SDD matrices** — requirement ↔ spec ↔ test ↔ commit ↔ evidence    |
| `assessment/`       | Full assessments of codebase, stack, risks, entities                 |
| `architecture/`     | Architectural layers, stack, rules, plugins                          |
| `architecture/adr/` | Architecture Decision Records (ADRs)                                 |
| `testing/`          | Test strategies, coverage, risk documentation                        |
| `operation/`        | Worklogs, changelogs, validation reports, conformance reports, FAQ   |
| `prompts/`          | Executable YAML prompts by category and persona                      |
| `personas/`         | Roles responsible for prompts (e.g., Dev, QA, Architect, Auditor)    |
| `schemas/`          | JSON Schema files to validate prompts, personas, specs, ADRs         |

---

## ✅ Core Principles

- **Everything is a prompt**: Executable, explainable and version-controlled YAML.
- **Small steps**: Every prompt performs one clear task with observable outputs.
- **Personas over roles**: Each prompt is assigned to a persona with defined responsibilities.
- **Traceable outputs**: Every action must generate a file in `.guides/`.
- **Human-led by design**: AI and agents assist, but direction, judgment, and intent come from humans.
- **Explainability over automation**: Prompts must be readable, auditable, and reproducible by a human at any time.
- **Minimize cognitive load**: All outputs and flows must be simple, observable, and contextual.

---

## 🧠 How it works

1. A prompt (YAML) defines an objective, context, steps, and expected output.
2. The prompt is assigned to a **persona** that represents the executor (human or agent).
3. Each step is declarative and uses natural language with imperative clarity.
4. Execution of the prompt generates Markdown outputs stored in `.guides/`.
5. All prompts and schemas are versioned and validated locally.

---

## 🧩 Example Prompts

All prompts live under [`.guides/prompts/`](./.guides/prompts/):

- `prompt.discovery.yaml` — full technical assessment of a project (first prompt).
- `prompt.onboarding.yaml` — generate a complete onboarding file for engineers.
- `prompt.commit.yaml` — analyse pending changes and apply a Conventional Commit.
- `prompt.web.generate-page.yaml` — generate a localized Next.js page with i18n + tests + worklog.

SDD prompts (`prompt.spec.author.yaml`, `prompt.spec.validate.yaml`, `prompt.adr.author.yaml`, `prompt.requirement.traceability.yaml`, `prompt.acceptance-criteria.author.yaml`, `prompt.test-cases.from-spec.yaml`, `prompt.spec.conformance-check.yaml`) operationalize the methodology.

## 🧪 Reference Example

The canonical illustration of the full SDD loop lives at [`.guides/specs/spec.example.user-login.yaml`](./.guides/specs/spec.example.user-login.yaml). It exercises every stage end-to-end:

| Stage | Artifact |
|---|---|
| 1. Spec | [`.guides/specs/spec.example.user-login.yaml`](./.guides/specs/spec.example.user-login.yaml) |
| 2. Validate | [`.guides/operation/spec-validation.example.user-login.md`](./.guides/operation/spec-validation.example.user-login.md) |
| 3. Design | [`.guides/architecture/adr/0001-choose-spec-format.md`](./.guides/architecture/adr/0001-choose-spec-format.md) |
| 4. Test cases | [`.guides/testing/test-cases.example.user-login.yaml`](./.guides/testing/test-cases.example.user-login.yaml) |
| Cross-cutting | [`.guides/traceability/matrix.example.user-login.yaml`](./.guides/traceability/matrix.example.user-login.yaml) |
| 5. Conform | [`.guides/operation/conformance.example.user-login.md`](./.guides/operation/conformance.example.user-login.md) |
| Audit | [`.guides/operation/worklog.md`](./.guides/operation/worklog.md) |

Copy the spec into your own `.guides/specs/` folder, adapt the IDs, and follow the prompts top to bottom.

> **Heads-up.** This repository is spec-first, so the example has no backing implementation. Its conformance report records the verdict `DEMO`; a consuming project that implements the spec re-runs `prompt.spec.conformance-check.yaml` against its source tree and produces a real `PASS | PASS-WITH-GAPS | FAIL` verdict.
---

## 📌 Contributors

This project is maintained using the `Guided Engineering` model itself - all changes are proposed, executed, and documented via prompts and personas.

---

## 📖 Resources

- Methodology: [`.guides/sdd-process.md`](./.guides/sdd-process.md)
- Roadmap to v0.5.0: [`ROADMAP.md`](./ROADMAP.md)
- Manual validation protocol: [`VALIDATION.md`](./VALIDATION.md)
- Prompt schema (canonical, SDD-aware): [`.guides/schemas/prompt.schema.v2.json`](./.guides/schemas/prompt.schema.v2.json)
- Prompt schema v1 (deprecated): [`.guides/schemas/prompt.schema.json`](./.guides/schemas/prompt.schema.json)
- Persona schema: [`.guides/schemas/persona.schema.json`](./.guides/schemas/persona.schema.json)
- SDD artifact schemas:
  - [`.guides/schemas/spec.schema.json`](./.guides/schemas/spec.schema.json)
  - [`.guides/schemas/requirement.schema.json`](./.guides/schemas/requirement.schema.json)
  - [`.guides/schemas/acceptance-criterion.schema.json`](./.guides/schemas/acceptance-criterion.schema.json)
  - [`.guides/schemas/adr.schema.json`](./.guides/schemas/adr.schema.json)
  - [`.guides/schemas/traceability.schema.json`](./.guides/schemas/traceability.schema.json)
- Persona list: [`.guides/personas/personas.yaml`](./.guides/personas/personas.yaml)
- Templates:
  - [`templates/template.prompt.yaml`](./templates/template.prompt.yaml)
  - [`templates/template.persona.yaml`](./templates/template.persona.yaml)
  - [`templates/template.worklog.md`](./templates/template.worklog.md)

---

## 📜 License

MIT © Guided Engineering Team

---

🧠 Designed by minds, executed by machines.
