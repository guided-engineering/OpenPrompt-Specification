# Guided Engineering

**Guided Engineering** é um sistema estruturado, rastreável e executável para gerenciar todo o ciclo de vida de desenvolvimento de software (SDLC) por meio de *prompts* modulares, agentes inteligentes e documentação reprodutível.

Este projeto utiliza prompts YAML versionados, validação por schema, personas especializadas e saídas categorizadas para habilitar a colaboração humano–máquina com alta observabilidade, reprodutibilidade e complexidade mínima.

---

## 👨‍🏫 O que é Guided Engineering?

Guided Engineering não é apenas uma ferramenta - é uma **prática**.

Ela define uma nova forma de trabalhar, onde **engenheiros coordenam agentes** (como LLMs, ferramentas ou automações) para executar tarefas pequenas e rastreáveis. O humano lidera o processo; a máquina assiste com precisão e contexto.

Aspectos-chave:
- Disciplina e explicabilidade no lugar de automação caótica.
- Cada tarefa é representada por um prompt validado e versionado.
- Personas definem responsabilidades de forma clara para cada tipo de atividade.
- Todas as saídas são observáveis, auditáveis e reprodutíveis.

---

## 🧭 A Prática (Coordenação liderada por humanos)

No núcleo do Guided Engineering está uma **prática liderada por humanos**, que organiza o SDLC com passos guiados e decisões estruturadas.

### Princípios fundamentais da prática:
- Engenheiros **orquestram agentes** por meio de fluxos orientados por prompts.
- As tarefas são **declarativas** e **rastreáveis** - nada é implícito ou obscuro.
- O ciclo de vida do software se torna um processo auditável, da descoberta à manutenção.
- Personas representam papéis reais da engenharia (como QA, SRE, Auditor de Código).
- A documentação é um artefato de primeira classe, não um subproduto.

---

## 📦 Os Artefatos (Conhecimento estruturado)

Guided Engineering depende de artefatos estruturados e versionados para guiar a execução e preservar a rastreabilidade.

### Principais tipos de artefatos:
- **YAML** (`*.yml`): Prompts que definem objetivo, contexto, persona e passos de execução.
- **Markdown** (`*.md`): Captura saídas estruturadas, decisões, playbooks e registros.
- **JSON** (`*.json`): Schemas de validação e estruturas de dados intermediários.

Todos os artefatos são armazenados em uma pasta canônica chamada `.guides/`, organizados por função.

---

## 🏗️ O Resultado (Software construído com orientação)

Projetos desenvolvidos com Guided Engineering apresentam as seguintes características:
- Toda decisão, plano e teste é **documentado como prompt e como saída**.
- Os projetos são **autoexplicativos**, **reprodutíveis** e **governáveis**.
- Nenhum conhecimento fica "na cabeça de alguém" - tudo é explícito e registrado.
- Transições de equipe, auditorias e onboarding se tornam mais simples e seguros.

Isso garante que sistemas não apenas sejam bem construídos, mas **construídos de forma compreensível**.

---

## 🛠️ As Ferramentas (Apoio à execução)

Guided Engineering é apoiado por um ecossistema crescente de ferramentas que automatizam, estruturam e facilitam o uso da prática:

- **CLIs** para executar prompts, gerar documentação e validar saídas.
- **Portais** para navegação visual dos conteúdos da pasta `.guides/`.
- **DevTools e extensões** para integrar prompts e personas ao fluxo de trabalho do desenvolvedor.
- **Templates e geradores** para estruturar novos projetos, prompts e personas com padrões validados.

Essas ferramentas são assistentes - nunca substitutos do julgamento do engenheiro.

---

## 📁 Estrutura do Projeto (`.guides/`)

| Pasta           | Finalidade                                               |
| --------------- | -------------------------------------------------------- |
| `base/`         | Estrutura do projeto e guias de setup                    |
| `product/`      | Requisitos de produto, roadmap, personas de usuário      |
| `assessment/`   | Avaliações técnicas de código, stack, riscos, entidades  |
| `architecture/` | Arquitetura, stack, regras e plugins                     |
| `testing/`      | Estratégias de teste, cobertura e riscos                 |
| `operation/`    | Worklogs, changelogs, troubleshooting, FAQ               |
| `prompts/`      | Prompts YAML executáveis por categoria e persona         |
| `personas/`     | Personas responsáveis pela execução de cada prompt       |
| `schema/`       | Schemas JSON para validação de prompts e personas        |

---

## ✅ Princípios centrais

- **Tudo é um prompt**: YAML executável, explicável e versionado.
- **Passos pequenos**: Cada prompt realiza uma tarefa clara com saídas observáveis.
- **Personas antes de papéis**: Cada prompt pertence a uma persona com responsabilidades definidas.
- **Saídas rastreáveis**: Toda ação deve gerar um arquivo em `.guides/`.
- **Liderança humana por design**: Agentes ajudam, mas a direção e o julgamento são humanos.
- **Explicabilidade antes da automação**: Tudo deve ser legível, auditável e reprodutível por uma pessoa.
- **Redução da carga cognitiva**: Tudo deve ser simples, observável e contextual.

---

## 🧠 Como funciona

1. Um prompt (`.yml`) define objetivo, contexto, passos e saída esperada.
2. O prompt é atribuído a uma **persona** que representa o executor (humano ou agente).
3. Cada passo é descritivo e utiliza linguagem natural com clareza imperativa.
4. A execução do prompt gera saídas Markdown na pasta `.guides/`.
5. Todos os prompts e schemas são versionados e validados localmente.

---

## 🧩 Exemplos de Prompts

- `prompt.discovery.yml`: Assessment técnico completo de um repositório.
- `setup.onionos.environment.yml`: Setup e execução local do projeto.
- `testing.strategy.unified.yml`: Estratégia unificada de testes.

---

## 📌 Contribuidores

Este projeto é mantido usando o próprio modelo de `Guided Engineering` - todas as mudanças são propostas, executadas e documentadas por meio de prompts e personas.

---

## 📖 Recursos

- Schema de prompt: `.guides/schema/prompt.schema.json`
- Lista de personas: `.guides/personas/personas.yml`
- Templates:
  - `.guides/prompts/template.prompt.yml`
  - `.guides/personas/template.persona.yml`

---

## 📜 Licença

MIT © Guided Engineering Team

---

🧠 Projetado por mentes, executado por máquinas.
