# Guided Engineering - Software Development Lifecycle (SDLC)

This document describes the Software Development Lifecycle (SDLC) used in the **Guided Engineering** project. The lifecycle is designed to be **human-led**, **prompt-driven**, and fully **traceable** through structured documentation and specialized personas.

---

## 🔁 Overview

The SDLC in Guided Engineering is structured into six main phases:

1. **Strategy / Discovery**
2. **Analysis & Design**
3. **Implementation**
4. **Testing**
5. **Deploy**
6. **Maintenance & Operation**

Each phase is driven by validated YAML prompts, executed by personas, and documented in the `.guides/` directory.

---

## 1. 🧭 Strategy / Discovery

* Define project goals, scope, and constraints
* Execute discovery prompts using specialized personas
* Generate discovery outputs:

  * `assessment.summary.md`
  * `assessment.structure.md`
  * `assessment.stack.md`
  * `assessment.plugins.md`
  * `assessment.risks.md`
  * `assessment.entities.md`
  * `assessment.personas.md`
* Setup local development guide:

  * `architecture.setup.md`

### Output Directory:

```
.guides/assessment/
.guides/architecture/setup.md
```

---

## 2. 📐 Analysis & Design

* Refine entities and data flows
* Document stack and architecture
* Define rules and design guides
* Create decision records (ADRs)

### Artifacts:

* `architecture.stack.md`
* `architecture.entities.md`
* `architecture.context.md`
* `architecture.rules.md`
* `architecture.guides.md`
* `architecture.adr/`

---

## 3. 🏗️ Implementation

* Use prompts to guide development tasks
* Personas generate code (CLI, API, backend, etc.)
* Features can be tested in dry-run mode
* All outputs stored in version-controlled folders

---

## 4. 🧪 Testing

* Define testing strategy and scope
* Generate test playbooks via prompt
* Document gaps and risks
* Track coverage and improvements

### Artifacts:

* `testing.strategy.md`
* `testing.playbook.md`
* `testing.coverage.md`
* `testing.risks.md`

---

## 5. 🚀 Deploy

* Build and deploy environments
* Validate staging and production
* Automate release notes and version tracking
* Keep changelogs updated

### Artifacts:

* `operation/changelog.md`
* `operation/deploy.md`

---

## 6. 🛠️ Maintenance & Operation

* Troubleshooting guides
* Operational logs and support tracking
* Frequently asked questions
* Continuous improvements

### Artifacts:

* `operation/worklog.md`
* `operation/troubleshooting.md`
* `operation/faq.md`

---

## 📂 Canonical Folder Structure

```
.guides/
├── architecture/
├── assessment/
├── operation/
├── product/
├── prompts/
├── personas/
├── schema/
├── testing/
```

---

## 🔒 Core Principles

* **Human-led**: Prompts augment but never replace decision-making
* **Explainability over automation**: All outputs are documented
* **Minimize cognitive load**: Clear, versioned, and modular prompts
* **KISS & YAGNI**: Simplicity and pragmatism over complexity

---

## ✅ Validations

* All prompts are validated against `.guides/schema/prompt.schema.json`
* Personas are matched using `.guides/personas/personas.yml`

---

This SDLC ensures that every phase is traceable, documented, and guided by reusable prompts to maintain high reliability and transparency throughout the software lifecycle.
