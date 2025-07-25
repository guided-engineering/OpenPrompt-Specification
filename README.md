# Guided Engineering

OpenPrompt-Specification 
Version: 0.1.0

~~Vibe Coding~~ -> **Guided Engineering** is a structured, traceable, and executable system for managing the entire software development lifecycle (SDLC) through modular prompts, intelligent agents, and reproducible documentation.

This project uses versioned YAML prompts, schema validation, personas, and categorized outputs to enable human–machine collaboration with high observability, reproducibility, and minimal complexity.

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
- **YAML** prompts (`*.yml`): Define intent, context, persona, and execution steps.
- **Markdown** documentation (`*.md`): Capture structured outputs, decisions, playbooks.
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

| Folder          | Purpose                                                |
| --------------- | ------------------------------------------------------ |
| `base/`         | Project-level structure and setup guides               |
| `product/`      | Product requirements, roadmap, user personas           |
| `assessment/`   | Full assessments of codebase, stack, risks, entities   |
| `architecture/` | Architectural layers, stack, rules, plugins            |
| `testing/`      | Test strategies, coverage, risk documentation          |
| `operation/`    | Worklogs, changelogs, troubleshooting, FAQ             |
| `prompts/`      | Executable YAML prompts by category and persona        |
| `personas/`     | Roles responsible for prompts (e.g., Dev, QA, Auditor) |
| `schema/`       | JSON Schema files to validate prompts and personas     |

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

- `prompt.discovery.yml`: Full technical assessment of a project (first prompt).
- `prompt.onboarding.yaml`: Generate a complete onboarding file for engineers.
---

## 📌 Contributors

This project is maintained using the `Guided Engineering` model itself - all changes are proposed, executed, and documented via prompts and personas.

---

## 📖 Resources

- Prompt schema: `.guides/schema/prompt.schema.json`
- Persona list: `.guides/personas/personas.yml`
- Templates:
  - `.guides/prompts/template.prompt.yml`
  - `.guides/personas/template.persona.yml`

---

## 📜 License

MIT © Guided Engineering Team

---

🧠 Designed by minds, executed by machines.
