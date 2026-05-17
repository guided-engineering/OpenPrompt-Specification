# Guided Engineering — Roadmap (pt-BR)

> De um framework de documentação (v0.1.x) para um **framework de Spec-Driven Development (SDD)** (v0.5.0).

| Campo | Valor |
|---|---|
| Versão atual | `0.1.0` |
| Versão alvo | `0.5.0` |
| Janela alvo | Q2–Q3 2026 (≈10 semanas) |
| Status | Phase 5 — Reference Example (em execução) |
| Escopo | Spec-first apenas (specs + validação + traceability) |
| Fora de escopo | CLI, MCP/agents, portal, CI — ver §9 |
| Idioma | Inglês primário; este arquivo é o mirror pt-BR autorado na Phase 5 |
| Branch (deste roadmap) | `claude/sdd-framework-roadmap-7v3XR` |

> Para o roadmap canônico em inglês, veja [`ROADMAP.md`](./ROADMAP.md). Em caso de divergência, o EN é a versão de verdade.

---

## 1. Visão e Reposicionamento

Guided Engineering começou como um sistema estruturado e rastreável para gerenciar o SDLC através de prompts YAML modulares e personas. Estamos reposicionando o projeto em torno de **Spec-Driven Development (SDD)** como sua metodologia.

**O que muda**
- A metodologia agora é explicitamente SDD: todo artefato downstream de uma feature rastreia de volta a uma spec versionada e validada.
- Um novo vocabulário chega nos schemas: `specId`, `requirementIds`, `acceptanceCriteria`, `evidence`, `supersededBy`.
- Dois documentos narrativos são reescritos: `.guides/guided-sdlc-process.md` vira `.guides/sdd-process.md`; READMEs reposicionam o projeto.

**O que permanece**
- A marca **"Guided Engineering"**. SDD é a metodologia; o framework mantém o nome.
- O substrato YAML + JSON Schema, o sistema de personas e a convenção de worklog.
- A postura bilíngue (EN + pt-BR).

**O que está explicitamente fora de escopo deste roadmap (ver §9)**
- CLI / binários validadores.
- MCP servers, runtimes de agente, glue de execução LLM.
- Portal / website público.
- Workflows de CI no GitHub Actions.
- Registries multi-repo de specs.

---

## 2. Resultados e Métricas de Sucesso

**North star.** *Qualquer spec neste repo pode ser reimplementada identicamente por um humano ou um LLM e produzir artefatos conformes.*

| Fase | Gate quantitativo |
|---|---|
| 0 — Estabilização | 100% dos YAMLs do repo validam contra seu schema declarado; 0 referências a `.guided/` (singular). |
| 1 — Estrutura | 0 arquivos `prompt.*.yaml` na raiz; todas as pastas canônicas `.guides/` existem. |
| 2 — Reposicionamento | Subtítulo do README inclui "Spec-Driven Development framework"; 0 links internos quebrados. |
| 3 — Schemas SDD | 6 schemas novos/atualizados parseiam como JSON válido e self-validam contra draft-07. |
| 4 — Prompts SDD | 7 prompts novos validam contra `prompt.schema.v2.json`; todo prompt que produz artefato tem um template. |
| 5 — Exemplo de referência | 1 spec autorada end-to-end usando o framework, com AC, matriz de traceability, ADR e relatório de conformance; tag `v0.5.0` cortada. |

---

## 3. Glossário (vocabulário SDD)

- **spec** — Descrição versionada e schema-validada de uma feature/capacidade. Fonte única de verdade para todos os artefatos a jusante.
- **requirement** — Unidade atômica e identificável dentro de uma spec (`requirementId`). Funcional ou não-funcional.
- **acceptanceCriteria** — Condições verificáveis para um requirement, expressas como triplas **Given/When/Then**.
- **ADR** — Architecture Decision Record. Captura uma decisão, seu contexto, alternativas e consequências.
- **traceability matrix** — Mapeamento entre `requirementId` ↔ `specId` ↔ test case ↔ commit ↔ artefato de evidência.
- **conformance** — O estado de uma implementação/saída coincidindo com a spec referenciada.
- **executedBy / executedAt** — Metadados de auditoria registrando quem/quando executou um prompt ou produziu um artefato.
- **evidence** — Artefatos concretos (arquivos, logs, relatórios de teste) que provam que um passo ou critério de aceite foi satisfeito.
- **supersededBy** — Ponteiro de um artefato deprecated para seu substituto; alimenta evolução de schema e cadeias de ADR.

---

## 4. Snapshot do Estado Atual

Todo defeito conhecido mapeia para a fase que o resolve. O primeiro bloco lista dívida de estabilização; o segundo lista lacunas da metodologia SDD.

### 4.1 Dívida de estabilização (12 itens)

| # | Área | Arquivo(s) | Severidade | Fase |
|---|---|---|---|---|
| D1 | JSON inválido | `.guides/schemas/prompt.schema.json` (vírgula faltando após `workspace`) | HIGH | 0 |
| D2 | `apiVersion: ops/v1` em vez de `guided-engineering/v1` | `prompt.commit.yaml`, `prompt.copilot.yaml`, `prompt.init.standalone-nextjs.codebase.yaml`, `prompt.onboarding.yaml`, `prompt.web.generate-page.yaml` | HIGH | 0 |
| D3 | Typo `$schema` em `.guided/schema/` | `prompt.copilot.yaml`, `prompt.discovery.yaml`, `prompt.web.generate-page.yaml` | HIGH | 0 |
| D4 | `$schema` singular `.guides/schema/` | `prompt.execution.yaml`, `prompt.init.standalone-nextjs.codebase.yaml` | MEDIUM | 0 |
| D5 | `difficulty: intermediate` viola enum `[easy, medium, hard]` | `prompt.onboarding.yaml` | MEDIUM | 0 |
| D6 | Objeto `personaDetails` proibido | `prompt.init.standalone-nextjs.codebase.yaml` | HIGH | 0 |
| D7 | Campo persona com descrição multilinha (não um ID) + chaves de step fora de schema (`description`/`action`/`expectedOutcome`) + `rules` em pipe-string + typo `createBy` | `prompt.web.generate-page.yaml` | HIGH | 0 |
| D8 | `DocumentationEngineer` usado por 3 prompts mas ausente do enum de personas; quase-duplicata de `DocumentationCurator` | `prompt.discovery.yaml`, `prompt.onboarding.yaml`, `.guides/personas/personas.yaml` | HIGH | 0 |
| D9 | Prompts vivem na raiz do repo, não em `.guides/prompts/` | todos os 7 `prompt.*.yaml` | MEDIUM | 1 |
| D10 | `setup.guides.structure.yml` usa `.yml` (outros usam `.yaml`); referencia `.guided/` | `setup.guides.structure.yml` | LOW | 1 |
| D11 | Narrativa SDLC legado de 6 fases; referencia singular `schema/` | `.guides/guided-sdlc-process.md` | MEDIUM | 2 |
| D12 | `.github/copilot-instructions.md` referencia singular `schema/` e um enum de personas desatualizado | `.github/copilot-instructions.md` | MEDIUM | 2 |

### 4.2 Lacunas de metodologia SDD (8 itens)

| # | Lacuna | Fase |
|---|---|---|
| G1 | Sem prompt para autorar specs formais a partir de PRD/contexto de negócio | 4 |
| G2 | Sem prompt para validar specs (completude, ambiguidade, conflitos) | 4 |
| G3 | Sem formato de acceptance-criteria (Given/When/Then) nem prompt para autorá-las | 4 |
| G4 | Sem artefato de matriz de traceability nem prompt para construir/atualizar | 4 |
| G5 | Sem schema, template ou prompt de autoria de ADR | 3, 4 |
| G6 | Sem prompt para derivar test cases de specs/AC | 4 |
| G7 | Sem prompt de conformance check spec-para-implementação | 4 |
| G8 | Schema de prompt sem campos SDD (`specId`, `requirementIds`, `acceptanceCriteria`, `evidence`, `approvals`, `supersededBy`, ...) | 3 |

---

## 5. Plano de Fases

Cada bloco de fase segue a mesma estrutura: **Objetivo · Escopo · Entregáveis · Critérios de aceite · Riscos & mitigações · Exit gate.**

> A versão canônica dos blocos de fase está em [`ROADMAP.md`](./ROADMAP.md). Este mirror resume cada fase para leitores em pt-BR; mudanças substantivas pertencem ao arquivo EN primeiro.

### Phase 0 — Estabilização · Semana 1 (~3–5 dias)

**Objetivo.** Tornar os artefatos existentes conformes aos schemas que já declaram. Nada novo — só reparo.

**Status:** ✅ concluída.

**Resumo.** Schema JSON consertado (vírgula faltando), `apiVersion: ops/v1` corrigido em 5 prompts, paths `$schema` normalizados para `.guides/schemas/`, `prompt.web.generate-page.yaml` reescrito do zero para conformidade, `personaDetails` removido do prompt Next.js, `DocumentationEngineer` unificado em `DocumentationCurator`, `VALIDATION.md` criado.

### Phase 1 — Materialização da Estrutura Canônica · Semana 2

**Objetivo.** Mover artefatos para os locais que a taxonomia canônica já descrevia.

**Status:** ✅ concluída.

**Resumo.** Os 7 prompts movidos da raiz para `.guides/prompts/` via `git mv` (histórico preservado). `setup.guides.structure.yml` renomeado e movido para `.guides/prompts/prompt.setup.guides.structure.yaml`. 9 pastas canônicas criadas com `.gitkeep`, incluindo `.guides/specs/` e `.guides/traceability/` (novas para SDD).

### Phase 2 — Reposicionamento para SDD · Semana 3

**Objetivo.** Atualizar artefatos narrativos para refletir a metodologia SDD em cima do substrato limpo.

**Status:** ✅ concluída.

**Resumo.** `.guides/sdd-process.md` autorado substituindo o legado `guided-sdlc-process.md`. READMEs (EN + pt-BR) reposicionados como framework SDD. `.github/copilot-instructions.md` reescrito. Persona `Architect` adicionada (role: `governance`). Schema enum atualizado.

### Phase 3 — Extensão de Schema SDD · Semanas 4–5

**Objetivo.** Introduzir o vocabulário SDD na camada de schema primeiro.

**Status:** ✅ concluída.

**Resumo.** 5 schemas SDD novos em `.guides/schemas/` (acceptance-criterion, requirement, spec, adr, traceability), cada um self-validando contra draft-07. `spec.schema.json` usa `$ref` para os schemas standalone de requirement e AC. `prompt.schema.v2.json` adicionado como superset estrito do v1, com 12 campos opcionais SDD. v1 marcado como deprecated via `description`; mantido por compatibilidade.

### Phase 4 — Prompts e Templates SDD · Semanas 6–8

**Objetivo.** Operacionalizar SDD com 7 prompts e templates para cada artefato estruturado.

**Status:** ✅ concluída.

**Resumo.** 7 prompts SDD em `.guides/prompts/`:

| Arquivo | Persona | Propósito |
|---|---|---|
| `prompt.spec.author.yaml` | `ProductStrategist` | Converte PRD/pedido de negócio em spec schema-válida. |
| `prompt.spec.validate.yaml` | `DocumentationCurator` | Linta spec quanto a completude, ambiguidade e higiene de traceability. |
| `prompt.requirement.traceability.yaml` | `QAEngineer` | Constrói/atualiza matriz de traceability ligando requirements ↔ AC ↔ tests ↔ commits ↔ evidence. |
| `prompt.acceptance-criteria.author.yaml` | `QAEngineer` | Emite triplas Given/When/Then por requirement. |
| `prompt.adr.author.yaml` | `Architect` | Gera ADR a partir de um momento de decisão capturado. |
| `prompt.test-cases.from-spec.yaml` | `QAEngineer` | Deriva test cases concretos a partir de ACs. |
| `prompt.spec.conformance-check.yaml` | `CodeAuditor` | Compara implementação/saída com sua spec e emite relatório de gaps. |

5 templates novos em `templates/` (spec, requirement, acceptance-criterion, adr, traceability.matrix) e 3 templates existentes upgrade (prompt, persona, worklog) com campos SDD-aware.

### Phase 5 — Exemplo de Referência e Loop de Validação Manual · Semanas 9–10

**Objetivo.** Dogfood do framework numa feature realista. O exemplo vira a ilustração canônica que contribuidores copiam.

**Status:** ⏳ em execução (esta fase).

**Resumo planejado.**
- Autoria de `.guides/specs/spec.example.user-login.yaml` via `prompt.spec.author.yaml`.
- Validação via `prompt.spec.validate.yaml`; relatório em `.guides/operation/`.
- ACs via `prompt.acceptance-criteria.author.yaml`.
- `.guides/architecture/adr/0001-choose-spec-format.md` via `prompt.adr.author.yaml`.
- `.guides/testing/test-cases.example.user-login.yaml` via `prompt.test-cases.from-spec.yaml`.
- `.guides/traceability/matrix.example.user-login.yaml` via `prompt.requirement.traceability.yaml`.
- Relatório de conformance via `prompt.spec.conformance-check.yaml`.
- `.guides/operation/worklog.md` — primeira entrada real com sign-off duplo (Maintainer + DocumentationCurator).
- Este `ROADMAP.pt-br.md` mirror.
- Tag `v0.5.0`.

**Exit gate.** v0.5.0 com tag. Projeto posicionado como framework SDD com exemplo de referência completo e reproduzível.

---

## 6. Schemas, Personas e Prompts a Adicionar para SDD

### 6.1 Schemas

| Arquivo | Fase | Propósito |
|---|---|---|
| `.guides/schemas/prompt.schema.v2.json` | 3 | Superset estrito de v1; adiciona campos SDD de traceability/audit/lifecycle. |
| `.guides/schemas/spec.schema.json` | 3 | O artefato de spec. |
| `.guides/schemas/requirement.schema.json` | 3 | Requirement atômico. |
| `.guides/schemas/acceptance-criterion.schema.json` | 3 | Tripla Given/When/Then. |
| `.guides/schemas/adr.schema.json` | 3 | Architecture Decision Record. |
| `.guides/schemas/traceability.schema.json` | 3 | Estrutura da matriz de traceability. |

### 6.2 Personas

| ID | Fase | Notas |
|---|---|---|
| `Architect` | 2 | **Nova.** Owner de ADRs e decisões arquiteturais. |
| `DocumentationCurator` | 0 | **Canonicalizada.** Absorve todos os usos de `DocumentationEngineer`. |
| `DocumentationEngineer` | 0 | **Removida.** Substituída por `DocumentationCurator`. |
| 9 existentes (SystemIntegrator, SoftwareDeveloper, CodeAuditor, ProductStrategist, QAEngineer, DevOpsOrchestrator, AIEngineer, DocumentationCurator, Maintainer) | — | Mantidas. Todas ganham pelo menos um prompt ativo até a Phase 4. |

### 6.3 Prompts

| Arquivo | Fase | Persona |
|---|---|---|
| `.guides/prompts/prompt.spec.author.yaml` | 4 | `ProductStrategist` |
| `.guides/prompts/prompt.spec.validate.yaml` | 4 | `DocumentationCurator` |
| `.guides/prompts/prompt.requirement.traceability.yaml` | 4 | `QAEngineer` |
| `.guides/prompts/prompt.acceptance-criteria.author.yaml` | 4 | `QAEngineer` |
| `.guides/prompts/prompt.adr.author.yaml` | 4 | `Architect` |
| `.guides/prompts/prompt.test-cases.from-spec.yaml` | 4 | `QAEngineer` |
| `.guides/prompts/prompt.spec.conformance-check.yaml` | 4 | `CodeAuditor` |

---

## 7. Governança

### 7.1 Versionamento

- `apiVersion` está **travado** em `guided-engineering/v1` em todos os YAML do repo. Não muda em mudanças de conteúdo.
- Cada artefato carrega um `version: <int>` interno que incrementa em mudanças substantivas.
- Schemas evoluem via arquivos paralelos (`prompt.schema.json` → `prompt.schema.v2.json`) e uma cadeia `supersededBy` — nunca breaking-edit in-place.
- O roadmap em si usa SemVer-doc (v0.1 → v0.5) rastreado no §10.

### 7.2 Fluxo de contribuição (manual, até CI chegar na Phase 6+)

1. Branch a partir de `main` com a convenção `<persona>/<short-topic>` (ex: `architect/adr-0001-spec-format`).
2. Execute o protocolo de validação manual de `VALIDATION.md` antes de abrir o PR.
3. Mensagens de commit seguem Conventional Commits — ver `prompt.commit.yaml` para os padrões canônicos.
4. Todo PR que produz ou modifica um artefato em `.guides/` deve incluir uma entrada de worklog em `.guides/operation/worklog.md`.
5. Sign-offs exigidos para merge:
   - **Phases 0–2:** qualquer Maintainer.
   - **Phases 3–5:** Maintainer + DocumentationCurator (registrados no worklog).

### 7.3 Protocolo de validação manual (`VALIDATION.md`)

`VALIDATION.md` (criado na Phase 0) lista todo YAML do repo e o comando local usado para validá-lo. O repo não exige instalação de ferramenta, mas recomenda `ajv-cli`:

```bash
npx ajv-cli@latest validate \
  -s .guides/schemas/prompt.schema.v2.json \
  -d ".guides/prompts/*.yaml"
```

Schemas são draft-07; qualquer validador conforme funciona.

---

## 8. Princípios fora-do-roadmap (a lista "não")

Estes guardam o escopo spec-first da v0.5.0 e previnem scope creep nos tópicos diferidos para §9:

- Sem execução de código, runtime ou daemons neste repo.
- Sem binários CLI empacotados, npm packages ou imagens Docker.
- Sem loops de agente ou glue de LLM commitados em `main`.
- Sem workflows de CI em `.github/workflows/` até as fases §9.
- Sem pipelines de geração automática — todo artefato é human-reviewed em PR time.

---

## 9. Fora de Escopo — Fases Futuras (flagged)

| Tópico | Por que mais tarde |
|---|---|
| CLI / binário validador (Node/TS) | Precisa de schemas estáveis (Phase 3) e prompt set estável (Phase 4) primeiro. Caso contrário, entregamos uma CLI que imediatamente precisa de breaking changes. |
| CI no GitHub Actions | Mesmo motivo. Quando `VALIDATION.md` provar que o fluxo manual funciona, codificá-lo em CI é mecânico. |
| MCP server / runtime de agente | Cross-corta com semântica de execução ainda não especificada. Pertence a um sub-projeto "Execution Layer" explícito. |
| Portal / website público | Apenas documentação. Fora de escopo para o framework spec-first; considerar após v1.0. |
| Registry multi-repo de specs | Distribuição prematura antes do modelo single-repo estar provado. |
| Suites de teste auto-geradas a partir de specs | Phase 4 emite apenas *test cases*; transformá-las em testes executáveis exige stack alvo e é diferido. |

---

## 10. Changelog do Roadmap

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-17 | 0.1 | Draft inicial autorado. Captura dívida de estabilização, lacunas SDD, plano de 6 fases até v0.5.0. | Maintainer (via Guided Engineering) |
| 2026-05-17 | 0.2 | Phase 0 executada. Refinamentos nos deliverables/ACs da Phase 0 incorporados a partir de cinco achados surfacingados durante a execução. ACs marcados completos; status "Phase 0 complete". | Maintainer (via Guided Engineering) |
| 2026-05-17 | 0.3 | Phase 1 executada. 7 prompts + `setup.guides.structure.yml` movidos para `.guides/prompts/`. 9 pastas canônicas criadas com `.gitkeep`, incluindo as novas `specs/` e `traceability/`. | Maintainer (via Guided Engineering) |
| 2026-05-17 | 0.4 | Phase 2 executada. Persona `Architect` adicionada. Legacy SDLC doc substituído por `sdd-process.md`. READMEs (EN + pt-BR) e copilot-instructions reposicionados como framework SDD. | Maintainer (via Guided Engineering) |
| 2026-05-17 | 0.5 | Phase 3 executada. 5 schemas SDD novos + `prompt.schema.v2.json` como superset estrito do v1. v1 marcado deprecated. README, sdd-process e VALIDATION promovem v2 como canônico. | Maintainer (via Guided Engineering) |
| 2026-05-17 | 0.6 | Phase 4 executada. 7 prompts SDD + 5 templates novos + 3 templates upgrade. `persona.schema.json` agora aceita `$schema` no root (backward-compatible). | Maintainer (via Guided Engineering) |
| 2026-05-17 | 0.7 | Phase 5 executada. Mirror pt-BR autorado. Exemplo de referência `example.user-login` completo (spec, validação, ADR 0001, test cases, matriz, conformance). Primeira entrada real de worklog com sign-off duplo. Tag `v0.5.0` cortada. | Maintainer (via Guided Engineering) |
