---
$schema: ../../schemas/adr.schema.json
apiVersion: guided-engineering/v1
adrId: 0001-choose-spec-format
title: Use YAML with JSON Schema validation as the canonical spec format
status: accepted
date: '2026-05-17'
context: |
  Guided Engineering adopts Spec-Driven Development as its methodology
  (see .guides/sdd-process.md). SDD requires a single source of truth
  per feature that is human-readable, machine-validatable, version-
  controllable, and authorable without specialized tooling. The team
  needs to pick one concrete format and commit to it before authoring
  the first reference example, because every downstream artifact
  (prompt schemas, traceability matrix, ADRs, conformance reports)
  inherits this choice.

  Constraints in play:
    1. Spec-first repository — no runtime, no CLI shipped with the
       framework (see ROADMAP §9). The chosen format must be usable
       with plain text editors plus a freely available validator.
    2. The framework already uses JSON Schema for prompt and persona
       validation since v0.1.0 — the schema substrate exists.
    3. Specs must be diff-friendly for PR review (specs change often
       in early phases and reviewers read the diff, not the file).
    4. Specs must be authorable by product strategists, not only by
       engineers — markup overhead has to be low.
    5. Specs reference other specs, requirements, and acceptance
       criteria by ID. Cross-document references must be cheap.

decision: |
  All SDD artifacts in this repository are authored as YAML and
  validated against JSON Schema draft-07 contracts under
  .guides/schemas/. Spec files live at .guides/specs/spec.<id>.yaml.
  ADRs are Markdown files with a YAML front-matter block that
  validates against adr.schema.json. The Markdown body is the
  readable record; the front-matter is the contract.

consequences: |
  Becomes easier:
    - Authoring: YAML is the lowest-friction format that supports
      comments, multi-line strings, and nested structures.
    - Validation: JSON Schema draft-07 is widely supported (ajv-cli,
      Python jsonschema, IntelliJ, VS Code) and works offline.
    - Reuse: the framework already validates prompts and personas
      with JSON Schema. Specs join the same substrate.
    - Diff review: line-based diffs read well for YAML changes.

  Becomes harder:
    - JSON Schema $ref resolution requires care when schemas live in
      sibling files (resolved during Phase 3 by dropping absolute
      $id URIs in favor of file:// relative refs).
    - YAML's indentation sensitivity and implicit-typing surprises
      (unquoted colons, ambiguous strings) force discipline. We
      mitigate this with the linting pass in prompt.spec.validate.yaml
      and the manual VALIDATION.md protocol.

  Reversibility:
    - Moderate. The decision propagates to every spec, ADR, schema,
      and prompt authored after this ADR. Migrating to a different
      format (e.g. TOML or a custom DSL) would require rewriting
      every artifact and every validation snippet. Cost grows linearly
      with the size of .guides/specs/, .guides/architecture/adr/, and
      .guides/traceability/.

alternativesConsidered:
  - JSON only — rejected. No comments, awkward multi-line strings,
    poor diff readability. Authoring overhead too high for product
    personas.
  - TOML — rejected. Limited support for nested arrays of objects
    (acceptanceCriteria with dataExamples) and weaker tooling story
    for schema validation.
  - A custom DSL (e.g. Gherkin for acceptance criteria) — rejected.
    Would require a parser, would not share the existing prompt and
    persona substrate, and would lock specs to one tool. Spec-first
    constraint rules this out.
  - OpenAPI — rejected as the primary format. OpenAPI is excellent for
    describing HTTP surfaces but does not naturally express
    requirements, acceptance criteria, or traceability matrices. Can
    still be referenced from a spec when an HTTP surface is part of
    the feature.
  - Markdown with embedded YAML blocks — rejected. The Markdown body
    is the readable record; making it also the contract gives
    validators a much harder parsing job. ADRs use this hybrid
    intentionally because the prose IS the value of an ADR; specs do
    not need that affordance.

relatedAdrs: []
relatedSpecs:
  - example.user-login
---

# 0001 — Use YAML with JSON Schema validation as the canonical spec format

Status: **accepted** · Date: 2026-05-17

## Context

Guided Engineering adopts Spec-Driven Development as its methodology. SDD requires a single source of truth per feature that is human-readable, machine-validatable, version-controllable, and authorable without specialized tooling. The team needs to pick one concrete format and commit to it before authoring the first reference example, because every downstream artifact inherits this choice.

Five constraints anchor the decision:

1. **Spec-first repository.** No runtime, no CLI ships with the framework (see ROADMAP §9). The format must work with plain text editors plus a freely available validator.
2. **Existing substrate.** Prompts and personas already validate against JSON Schema draft-07. The schema substrate exists.
3. **Diff-friendly.** Specs change frequently in early phases; reviewers read the diff, not the file.
4. **Authorable by product.** Specs cannot be engineer-only. Markup overhead must stay low.
5. **Cheap cross-references.** Specs link to requirements, acceptance criteria, ADRs, and matrices by ID; the format must not penalize this.

## Decision

All SDD artifacts in this repository are authored as **YAML** and validated against **JSON Schema draft-07** contracts under `.guides/schemas/`. Spec files live at `.guides/specs/spec.<id>.yaml`. ADRs (this file included) are Markdown bodies with a YAML front-matter block that validates against `adr.schema.json` — the front-matter is the contract, the prose is the readable record.

## Consequences

**Becomes easier.**

- Authoring. YAML is the lowest-friction format that supports comments, multi-line strings, and nested structures.
- Validation. JSON Schema draft-07 is widely supported (`ajv-cli`, Python `jsonschema`, IntelliJ, VS Code) and works offline.
- Reuse. Prompts, personas, and specs share one substrate.
- Diff review. Line-based diffs read well for YAML changes.

**Becomes harder.**

- `$ref` resolution requires care when schemas live in sibling files (handled in Phase 3 by dropping absolute `$id` URIs in favor of relative `file://` refs).
- YAML's indentation sensitivity and implicit-typing surprises (unquoted colons, ambiguous strings) force discipline. Mitigated by the linting pass in `prompt.spec.validate.yaml` and the manual `VALIDATION.md` protocol.

**Reversibility — moderate.** The decision propagates to every spec, ADR, schema, and prompt authored after this ADR. Migrating would require rewriting every artifact and every validation snippet. Cost grows linearly with the contents of `.guides/specs/`, `.guides/architecture/adr/`, and `.guides/traceability/`. A future ADR may supersede this one if a meaningfully better format emerges; until then, this decision stands.

## Alternatives considered

- **JSON only** — no comments, awkward multi-line strings, poor diff readability, authoring overhead too high for product personas.
- **TOML** — limited support for nested arrays of objects, weaker tooling story for schema validation.
- **A custom DSL (e.g. Gherkin for ACs)** — would require a parser, would not share the prompt/persona substrate, would lock specs to one tool. The spec-first constraint rules this out.
- **OpenAPI as the primary format** — excellent for HTTP surfaces but does not naturally express requirements, ACs, or traceability matrices. May still be referenced from a spec when an HTTP surface is part of the feature.
- **Markdown with embedded YAML blocks** — the Markdown body is the readable record; making it also the contract makes validation harder. ADRs use this hybrid intentionally; specs do not need that affordance.

## Related

- Spec realized: [`example.user-login`](../../specs/spec.example.user-login.yaml).
- Methodology: [`.guides/sdd-process.md`](../../sdd-process.md).
- Roadmap context: this ADR formalizes the decision implicit since v0.1.0 and made explicit during Phase 3.
