# Guided Engineering (PT-BR)

*Um framework de Spec-Driven Development (SDD).*

OpenPrompt-Specification
Versão: 0.1.0 — veja [`ROADMAP.md`](./ROADMAP.md) para o caminho até v0.5.0.

~~Vibe Coding~~ → **Guided Engineering** é um framework estruturado, rastreável e executável para **Spec-Driven Development**: especificações versionadas guiam todo artefato a jusante (código, testes, ADRs, worklogs) por meio de prompts modulares, personas e documentação reprodutível.

Este projeto utiliza prompts YAML versionados, validação por schema, personas e saídas categorizadas para viabilizar a colaboração humano–máquina com alta observabilidade, reprodutibilidade e complexidade mínima.

> **Marca:** Guided Engineering. **Metodologia:** SDD. Veja [`.guides/sdd-process.md`](./.guides/sdd-process.md) para o ciclo de vida.

---

## ❓ Por que Guided Engineering?

Porque software moderno é complexo demais para depender da sorte.

Equipes enfrentam:

* Ferramentas fragmentadas e handoffs caóticos.
* Conhecimento oculto e decisões não documentadas.
* Baixa reprodutibilidade e fricção no onboarding.
* Dependência excessiva de automações opacas.

**Guided Engineering** resolve esses problemas ao:

* Tratar **engenharia como um processo rastreável**, não um ofício improvisado.
* Substituir comunicação desestruturada por **execução estruturada**.
* Dar aos engenheiros **controle sobre a IA** via prompts validados e legíveis.
* Criar uma **memória de longo prazo** do porquê, como e por quem algo foi feito.

Permite que equipes **avancem rápido sem perder o contexto**, e **automatem sem perder o controle**.

> Não se trata apenas de fazer mais rápido. Trata-se de fazer *compreensivelmente*.

---

## 🚫 O que Guided Engineering *não é*

Para evitar confusões, é importante deixar claro o que esta prática **não pretende ser**:

| ❌ Não é isto                     | ✅ Mas sim                                                 |
| -------------------------------- | --------------------------------------------------------- |
| Uma ferramenta no-code           | Um sistema liderado por humanos para *codificar intenção* |
| Um substituto para engenheiros   | Um **framework para engenheiros conduzirem IA**           |
| Um modelo automation-first       | Uma metodologia **explainability-first**                  |
| Um gerador de documentação       | Um modelo de execução **documentation-first**             |
| Um assistente black-box          | Um processo **white-box** com visibilidade total          |
| Uma coleção genérica de prompts  | Um sistema de prompts **validados e versionados**         |
| Um gerador de boilerplate DevOps | Um fluxo de execução **personalizável e observável**      |
| Uma cola mágica de IA            | Uma **orquestração disciplinada de agentes**              |

**Guided Engineering não é sobre substituir expertise** — é sobre estruturá-la.

Não é automação **por si só**, mas sim **augmentação com propósito**.

---

## 👨‍🏫 O que é Guided Engineering?

Guided Engineering não é só uma ferramenta, é uma **prática**.

Define uma nova forma de trabalhar onde **engenheiros coordenam agentes** (ex: LLMs, ferramentas, automações) para executar tarefas pequenas e rastreáveis. O humano lidera o processo; a máquina assiste com precisão e contexto.

Aspectos-chave:

* Disciplina e explicabilidade no lugar de automação caótica.
* Toda tarefa é representada por um prompt validado e versionado.
* Personas claras definem responsabilidades por tipo de atividade.
* Toda saída é observável, auditável e reproduzível.

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

## 🧭 A Prática (Human-led)

No seu núcleo, Guided Engineering é uma **prática liderada por humanos** que organiza o SDLC em passos guiados e decisões estruturadas.

### Princípios fundamentais da prática:

* Engenheiros **orquestram agentes** por meio de fluxos guiados por prompt.
* Tarefas são **declarativas** e **rastreáveis** – nunca implícitas ou opacas.
* O SDLC vira um processo auditável, do discovery à manutenção.
* Personas representam papéis reais da engenharia (ex: QA Analyst, SRE, Code Auditor).
* Documentação não é um anexo – é protagonista.

---

## 📦 Os Artefatos (Conhecimento Estruturado)

Guided Engineering depende de artefatos versionados e estruturados para guiar a execução e preservar rastreabilidade.

### Principais tipos de artefatos:

* **YAML** prompts (`*.yaml`): Definem intenção, contexto, persona e etapas de execução.
* **YAML** specs (`*.yaml` em `.guides/specs/`): Fonte única e versionada de verdade para cada feature.
* Documentação **Markdown** (`*.md`): Capturam saídas estruturadas, decisões, playbooks, ADRs.
* Schemas **JSON** (`*.json`): Impõem estrutura, consistência e validação.

Todos são armazenados em uma pasta canônica `.guides/`, categorizados por função.

---

## 🏗️ A Saída (Software com Direção)

Projetos desenvolvidos com Guided Engineering apresentam as seguintes características:

* Cada decisão, plano e teste é **documentado como prompt e saída**.
* Os projetos são **autodocumentados**, **autoexplicativos** e **reproduzíveis**.
* Nada depende de conhecimento tribal – tudo é explícito e preservado.
* Transições, auditorias e onboarding são naturais graças ao contexto rico.

Isso garante que os sistemas não apenas sejam bem construídos — mas **compreensíveis**.

---

## 🛠️ A Ferramentação (Apoio à Execução)

Guided Engineering é apoiado por um ecossistema crescente de ferramentas que automatizam, estruturam e simplificam sua prática:

* **CLIs** para executar prompts, gerar documentação e validar saídas.
* **Portais** para navegação visual do conteúdo `.guides/`.
* **DevTools & extensões** para integrar prompts e personas ao fluxo de trabalho.
* **Templates & generators** para scaffolding validado de projetos e personas.

Essas ferramentas atuam como assistentes – **nunca substitutos do julgamento do engenheiro**.

---

## 📁 Estrutura do Projeto (`.guides/`)

| Pasta               | Propósito                                                                  |
| ------------------- | -------------------------------------------------------------------------- |
| `base/`             | Estrutura do projeto e guias de setup                                      |
| `product/`          | Requisitos de produto, roadmap, personas de usuário                        |
| `specs/`            | **Specs SDD** — fonte única versionada de verdade por feature              |
| `traceability/`     | **Matrizes SDD** — requirement ↔ spec ↔ test ↔ commit ↔ evidence          |
| `assessment/`       | Avaliações completas de código, stack, riscos                              |
| `architecture/`     | Camadas de arquitetura, regras, plugins                                    |
| `architecture/adr/` | Architecture Decision Records (ADRs)                                       |
| `testing/`          | Estratégias de teste, cobertura, documentação de riscos                    |
| `operation/`        | Worklogs, changelogs, relatórios de validação/conformância, FAQ            |
| `prompts/`          | Prompts executáveis YAML por categoria e persona                           |
| `personas/`         | Papéis responsáveis pelos prompts (ex: Dev, QA, Architect, Auditor)        |
| `schemas/`          | Schemas JSON para validar prompts, personas, specs, ADRs                   |

---

## ✅ Princípios Centrais

* **Tudo é um prompt**: YAML executável, explicável e versionado.
* **Passos pequenos**: Cada prompt executa uma tarefa clara com saída observável.
* **Personas acima de cargos**: Cada prompt tem uma persona responsável definida.
* **Saídas rastreáveis**: Cada ação gera um arquivo na `.guides/`.
* **Liderança humana por design**: IA auxilia, mas direção e julgamento vêm do humano.
* **Explicabilidade acima da automação**: Prompts devem ser legíveis e auditáveis.
* **Carga cognitiva mínima**: Tudo deve ser simples, observável e contextual.

---

## 🧠 Como Funciona

1. Um prompt (YAML) define um objetivo, contexto, etapas e saída esperada.
2. O prompt é atribuído a uma **persona** que representa o executor (humano ou agente).
3. Cada etapa é declarativa e usa linguagem natural com clareza imperativa.
4. A execução do prompt gera saídas em Markdown armazenadas em `.guides/`.
5. Todos os prompts e schemas são versionados e validados localmente.

---

## 🧩 Exemplos de Prompts

Todos os prompts vivem em [`.guides/prompts/`](./.guides/prompts/):

* `prompt.discovery.yaml` — avaliação técnica completa de um projeto (primeiro prompt).
* `prompt.onboarding.yaml` — gera um arquivo de onboarding completo para engenheiros.
* `prompt.commit.yaml` — analisa mudanças pendentes e aplica um Conventional Commit.
* `prompt.web.generate-page.yaml` — gera uma página Next.js localizada com i18n + testes + worklog.

Os prompts SDD (`prompt.spec.author.yaml`, `prompt.spec.validate.yaml`, `prompt.adr.author.yaml`, ...) chegam na Phase 4 do roadmap.

---

## 📌 Contribuidores

Este projeto é mantido usando o próprio modelo de `Guided Engineering` — todas as mudanças são propostas, executadas e documentadas via prompts e personas.

---

## 📖 Recursos

* Metodologia: [`.guides/sdd-process.md`](./.guides/sdd-process.md)
* Roadmap até v0.5.0: [`ROADMAP.md`](./ROADMAP.md)
* Protocolo de validação manual: [`VALIDATION.md`](./VALIDATION.md)
* Schema de prompt: [`.guides/schemas/prompt.schema.json`](./.guides/schemas/prompt.schema.json)
* Schema de persona: [`.guides/schemas/persona.schema.json`](./.guides/schemas/persona.schema.json)
* Lista de personas: [`.guides/personas/personas.yaml`](./.guides/personas/personas.yaml)
* Templates:

  * [`templates/template.prompt.yaml`](./templates/template.prompt.yaml)
  * [`templates/template.persona.yaml`](./templates/template.persona.yaml)
  * [`templates/template.worklog.md`](./templates/template.worklog.md)

---

## 📜 Licença

MIT © Guided Engineering Team

---

🧠 Designed by minds, executed by machines.
