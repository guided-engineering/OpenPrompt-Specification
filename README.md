# Guided Engineering


**Guided Engineering** is a structured, traceable, and executable system for managing the entire software development lifecycle (SDLC) through modular prompts, intelligent agents, and reproducible documentation.

This project uses versioned YAML prompts, schema validation, personas, and categorized outputs to enable human–machine collaboration with high observability, reproducibility, and minimal complexity.



---

## 🔍 What is Guided Engineering?

* A disciplined approach to building, evolving, auditing, and maintaining software.
* Built around **structured prompts** validated against shared schemas.
* Uses specialized **personas** to execute each prompt with clear roles and best practices.
* Every output is written to `.guides/`, enabling full traceability, documentation, and audit.

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

* **Everything is a prompt**: Executable, explainable and version-controlled YAML.
* **Small steps**: Every prompt performs one clear task with observable outputs.
* **Personas over roles**: Each prompt is assigned to a persona with defined responsibilities.
* **Traceable outputs**: Every action must generate a file in `.guides/`.
* **Human-led by design**: AI and agents assist, but direction, judgment, and intent come from humans.
* **Explainability over automation**: Prompts must be readable, auditable, and reproducible by a human at any time.
* **Minimize cognitive load**: All outputs and flows must be simple, observable, and contextual.

---

## 🧠 How it works

1. A prompt (YAML) defines an objective, context, steps, and expected output.
2. The prompt is assigned to a **persona** that represents the executor (human or agent).
3. Each step is declarative and uses natural language with imperative clarity.
4. Execution of the prompt generates Markdown outputs stored in `.guides/`.
5. All prompts and schemas are versioned and validated locally.

---

## 🧩 Example Prompts

* `prompt.discovery.yml`: Full technical assessment of a project.

---

## 📌 Contributors

This project is maintained using the `Guided Engineering` model itself — all changes are proposed, executed, and documented via prompts and personas.

---

## 📖 Resources

* Prompt schema: `.guides/schema/prompt.schema.json`
* Persona list: `.guides/personas/personas.yml`
* Templates:

  * `.guides/prompts/template.prompt.yml`
  * `.guides/personas/template.persona.yml`

---

## 📜 License

MIT © Guided Engineering Team
___

🧠 Designed by minds, executed by machines.
