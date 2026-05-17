# GitHub Copilot Instructions for Guided Engineering

This repository follows the **Guided Engineering** framework, which adopts **Spec-Driven Development (SDD)** as its methodology. Specifications drive every downstream artifact (code, tests, ADRs, worklogs) and live under `.guides/`.

Read [`.guides/sdd-process.md`](../.guides/sdd-process.md) for the full lifecycle and [`ROADMAP.md`](../ROADMAP.md) for the current phase.

## Core Principles

- **Spec is the source of truth.** Every change traces back to a `specId` and one or more `requirementIds`.
- **Everything is a prompt.** All tasks are defined as executable, versioned YAML prompts.
- **Small steps.** Each prompt performs one clear task with observable outputs.
- **Personas over roles.** Every prompt is assigned to a specialized persona (`SystemIntegrator`, `SoftwareDeveloper`, `CodeAuditor`, `Architect`, …).
- **Traceable outputs.** All actions generate files in `.guides/` for a full audit trail.
- **Human-led by design.** AI assists, but humans provide direction and judgment.
- **Explainability over automation.** Prompts must be readable, auditable, and reproducible by hand.

## Project Structure Guidelines

### Documentation & Specifications

All documentation, specs, and prompts live under `.guides/`:

- `.guides/specs/` — versioned SDD specs (source of truth per feature).
- `.guides/traceability/` — requirement ↔ spec ↔ test ↔ commit ↔ evidence matrices.
- `.guides/architecture/` — system design; `.guides/architecture/adr/` for ADRs.
- `.guides/assessment/` — project analysis and discovery.
- `.guides/operation/` — worklogs, validation reports, conformance reports, FAQ.
- `.guides/product/` — PRDs, roadmap inputs.
- `.guides/testing/` — test strategy and playbooks.
- `.guides/prompts/` — executable YAML prompts.
- `.guides/personas/` — persona definitions (`personas.yaml`).
- `.guides/schemas/` — validation schemas: `prompt.schema.v2.json` (canonical), `prompt.schema.json` (v1, deprecated), `persona.schema.json`, and the SDD artifact schemas (`spec`, `requirement`, `acceptance-criterion`, `adr`, `traceability`, `test-cases`).

### Code Organization

- Store source code in `src/` (project-dependent; this repo is spec-first and ships no runtime code yet).
- Use TypeScript with strict mode enabled when projects do ship code.
- Follow ESLint and Prettier configurations of the consuming project.

### Prompt Development

- All prompts must validate against `.guides/schemas/prompt.schema.v2.json` (canonical since Phase 3). `prompt.schema.json` (v1) is retained for backward compatibility during the v0.x window and should not be the target of new prompts.
- **Required fields:** `apiVersion`, `id`, `title`, `persona`, `category`, `difficulty`, `context`, `steps`, `output`, `version`.
- **`apiVersion`** is locked at `guided-engineering/v1` for every YAML in the repo.
- **`version`** is an integer ≥ 1; bump on substantive change, never use SemVer strings.
- **Valid persona IDs (canonical list — keep in sync with `.guides/personas/personas.yaml`):** `SystemIntegrator`, `SoftwareDeveloper`, `CodeAuditor`, `ProductStrategist`, `QAEngineer`, `DevOpsOrchestrator`, `AIEngineer`, `DocumentationCurator`, `Maintainer`, `Architect`.
- **Categories:** `setup`, `analysis`, `design`, `implementation`, `testing`, `deployment`, `maintenance`, `operation`, `base`.
- **Difficulty levels:** `easy`, `medium`, `hard` (no other values).
- **Step keys allowed by schema:** `id`, `title`, `actions`, `output`, `timeout`, `retries`, `onFailure`, `if`. Anything else fails validation (`additionalProperties: false`).

### Development Workflow

- Generate a worklog entry for every PR under `.guides/operation/worklog.md`.
- Reference the `specId` and `requirementIds` you closed in the worklog.
- Validate all YAML against schemas before opening a PR (see [`VALIDATION.md`](../VALIDATION.md)).
- Document decisions and rationale via ADRs under `.guides/architecture/adr/`.

## Behavioral Guidelines

1. **Always check `.guides/` first** for existing specs, prompts, and standards before proposing new ones.
2. **Suggest prompt-based solutions** when users describe tasks or workflows.
3. **Recommend appropriate personas**:
   - `ProductStrategist` for spec authoring; `DocumentationCurator` for validation.
   - `Architect` for ADRs and structural decisions.
   - `SoftwareDeveloper` for implementation; `QAEngineer` for tests and traceability.
   - `CodeAuditor` for conformance checks; `Maintainer` for evolution and deprecation.
4. **Enforce schema validation.** Don't propose YAML that would fail `prompt.schema.json` — check fields, types, enums.
5. **Generate traceable outputs** in `.guides/` for every activity.
6. **Use TypeScript strict mode** when generating code for consuming projects.
7. **Follow established folder structure** and naming conventions.
8. **Create step-by-step instructions** using imperative verbs.
9. **Include proper error handling** in prompts (`onFailure`, `retries`).
10. **Maintain version control** for all prompts and documentation; use `supersededBy` for deprecation, never breaking-edit a published artifact.

## Code Quality Standards

- Use TypeScript with strict mode enabled.
- Follow ESLint and Prettier configurations.
- Write tests for all code paths.
- Include JSDoc comments for public APIs.
- Validate all JSON Schema files against the draft-07 meta-schema.

## File Naming Conventions

- **Prompts:** `prompt.<category>.yaml` or `prompt.<specific-task>.yaml` (always `.yaml`, never `.yml`).
- **Specs:** `spec.<feature-id>.yaml` under `.guides/specs/`.
- **ADRs:** `NNNN-<short-title>.md` under `.guides/architecture/adr/` (4-digit sequential, kebab-case title).
- **Personas:** `personas.yaml` for the canonical list.
- **Schemas:** `<artifact>.schema.json` (or `<artifact>.schema.v<N>.json` for versioned supersets).
- **Documentation:** `<category>.<specific>.md`.
- **File names:** kebab-case.
- **Step IDs inside prompts:** kebab-case (e.g., `validate-environment`, `load-next-task`).
- **Persona IDs:** PascalCase (e.g., `SoftwareDeveloper`, `Architect`).
- **Spec / requirement / AC IDs:** lowercase with dots/hyphens (e.g., `user-login`, `req.auth.001`).

When suggesting code or documentation changes, always consider the Guided Engineering methodology and ensure suggestions align with the SDD lifecycle and the established schemas.
