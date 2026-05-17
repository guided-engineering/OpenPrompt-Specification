---
$schema: ../.guides/schemas/adr.schema.json
apiVersion: guided-engineering/v1
adrId: 0000-example-decision
title: Example architectural decision
status: proposed
date: '2026-05-17'
context: |
  Forces in play and why a decision is needed. State the situation,
  the constraints (technical, regulatory, deadline, cost), and the
  options being weighed.
decision: |
  The decision, stated in active voice in one or two sentences.
  "We will use X for Y because Z."
consequences: |
  What becomes easier. What becomes harder. Reversibility note: list
  what would have to change if this ADR is later superseded.
alternativesConsidered:
  - Alternative A — rejected because <reason>
  - Alternative B — rejected because <reason>
  - Do nothing — rejected because <reason>
relatedAdrs: []
relatedSpecs: []
---

# 0000 — Example architectural decision

Status: **proposed** · Date: 2026-05-17

## Context

Forces in play and why a decision is needed. The YAML front-matter
block above is the contract; this Markdown body is the readable
record. The two must agree.

## Decision

The decision, in prose.

## Consequences

Trade-offs accepted, including reversibility.

## Alternatives considered

- **Alternative A** — rejected because …
- **Alternative B** — rejected because …
- **Do nothing** — rejected because …
