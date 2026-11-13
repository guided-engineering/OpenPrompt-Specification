# Guided Engineering

*Uma prática para trabalhar com agentes de código: contratos de tarefa, Skills portáteis e evidência.*

Você diz o que deve ser verdade. O agente faz o trabalho em unidades pequenas e
verificadas. Toda afirmação de "pronto" aponta para uma evidência.

O Guided Engineering não adiciona nenhum runtime. Ele usa o agente que você já
tem, duas [Agent Skills](https://agentskills.io) portáteis e um contrato
pequeno: o **prompt OPS** (OpenPrompt Specification), uma definição de tarefa
validada que declara um objetivo, as restrições, os passos e as verificações
que decidem a conclusão.

🌐 Site: <https://guided-engineering.github.io/OpenPrompt-Specification/> ·
🇺🇸 [Read in English](./README.md)

> O contrato, a prática e o site estão em inglês. Este README é o ponto de
> entrada em português e acompanha o README em inglês.

---

## A ideia em uma tabela

| Conceito | Responsabilidade |
|---|---|
| **Humano** | Define a intenção, as restrições e as decisões materiais; continua responsável. |
| **Agente** | O executor, ou um perfil de execução nomeado e configurado em uma ferramenta de agentes real. |
| **Skill** | Uma capacidade reutilizável empacotada como `SKILL.md`. Estende um agente; não é um agente. |
| **Prompt OPS** | O contrato da tarefa: intenção, contexto, restrições, ações, resultados esperados. |
| **Plano** | A sequência de mudanças e verificações derivada de um prompt, para uma tarefa específica. |
| **Evidência** | Arquivos, diffs, resultados de comandos e observações que sustentam uma afirmação de conclusão. |

Uma definição de agente é configuração; uma execução de agente faz o trabalho.
Nomear um agente em um prompt não inicia nada, não concede nada e não prova
nenhuma revisão. Uma Skill não é um agente. Um agente nunca aprova: quem aprova
é uma pessoa.

## O ciclo

**Inspecionar → validar a intenção e o contrato → planejar → executar a unidade
autorizada → verificar → diagnosticar e corrigir se justificado → verificar de
novo → registrar a evidência → decidir a próxima unidade.**

Uma verificação que falha é diagnosticada antes de ser tocada. Um teste nunca é
enfraquecido para passar. Uma verificação que passou antes da última edição é
executada de novo. Detalhes: [`.guides/practice.md`](./.guides/practice.md).

## Um exemplo pequeno que funciona

Uma pessoa escreve um pedido:

> Os slugs que saem de `packages/slug` estão errados nas URLs dos artigos. Um
> título como `a  --  b` vira `a------b` … Mantenha pequeno: não adicione
> dependências, não mude o nome da função e não toque nos testes.

O pedido vira um prompt OPS (resumido; o arquivo completo é
[`examples/project/.guides/prompts/prompt.slug.clean-separators.yaml`](./examples/project/.guides/prompts/prompt.slug.clean-separators.yaml)):

```yaml
apiVersion: guided-engineering/v1
id: slug.clean-separators
version: 1
title: Make slugify collapse repeated separators and trim hyphens at the edges
agent: guided-engineer
workspace: ./packages/slug
objective: |
  `slugify` returns clean slugs: exactly one hyphen between words and no hyphen
  at the start or the end.
context: |
  `packages/slug` is a dependency-free package tested with `node --test`.
constraints:
  - Change only `src/slug.mjs`.
  - Do not edit, skip, or delete any test.
steps:
  - id: reproduce
    title: Reproduce the failure
    actions:
      - Run `node --test` in the workspace and record which tests fail.
  - id: fix
    title: Correct the separator handling
    actions:
      - Change the implementation so a run of separators becomes one hyphen.
output:
  - file: src/slug.mjs
verification:
  - id: unit-tests
    expect: All four tests pass.
    run: node --test
```

O agente planeja, executa e deixa uma entrada de worklog que registra quais
verificações rodaram depois da última edição e o que mostraram. A cadeia
inteira (pedido, prompt, plano, evidência) está em
[`examples/project/`](./examples/project/) e é verificada de novo por
`npm run example`.

## Use no seu projeto

1. **Instale as Skills** na sua ferramenta de agentes. Com a
   [CLI `skills`](https://github.com/vercel-labs/skills):

   ```bash
   npx skills add guided-engineering/skills
   ```

   Ferramenta por ferramenta, incluindo o que foi e o que não foi testado:
   [`guided-engineering/skills`](https://github.com/guided-engineering/skills).

2. **Peça um contrato.** Descreva uma mudança como você faria normalmente e
   peça que ela seja escrita como um prompt OPS. A `ops-author` grava o prompt
   em `.guides/prompts/`, pergunta sobre a ambiguidade que importa e valida o
   resultado. Leia; este é o momento de corrigir o escopo.

3. **Peça um plano e depois a execução.** A `ops-execute` valida o prompt,
   planeja com uma verificação para cada tarefa, faz a mudança, verifica depois
   da última edição e registra uma entrada de worklog em
   `.guides/operation/worklog/`.

4. **Decida.** Revise o diff e a evidência. A decisão é sua.

Nada mais é necessário. As Skills trazem o validador e o texto do contrato com
elas. Um prompt OPS nomeia um agente, e `guided-engineer`, o padrão, é
simplesmente a sessão do agente que lê o prompt. Instalar uma Skill não
instala nenhum perfil de agente.

## O que há neste repositório

Este repositório é a fonte normativa do contrato e da prática.

| Caminho | Conteúdo |
|---|---|
| [`.guides/ops-contract.md`](./.guides/ops-contract.md) | **O contrato.** Campos, regras de resolução, conclusão, modos de pedido, entradas de worklog, códigos de erro. |
| [`.guides/practice.md`](./.guides/practice.md) | A prática: quem faz o quê, a jornada, o ciclo. |
| [`.guides/schemas/`](./.guides/schemas/) | JSON Schemas: prompt, mapa de agentes, entrada de worklog, ADR. |
| [`tools/ops-validate/`](./tools/ops-validate/), [`dist/ops-validate.mjs`](./dist/ops-validate.mjs) | O validador e seu pacote em um único arquivo, sem dependências. |
| [`examples/`](./examples/) | Exemplos válidos, inválidos, de conversão e de ponta a ponta. |
| [`templates/`](./templates/) | Pontos de partida para um prompt, um mapa de agentes, uma entrada de worklog, um ADR. |
| [`.guides/conversion.md`](./.guides/conversion.md) | O que substituiu o quê, para documentos escritos antes da reformulação. |
| [`.guides/testing/skills-study/`](./.guides/testing/skills-study/) | O estudo local das Skills: protocolo, casos, harness, resultados. |
| [`docs/`](./docs/) | O site gerado. |

As Skills ficam em [`guided-engineering/skills`](https://github.com/guided-engineering/skills).

## Valide

```bash
npm ci
npm test            # testes do contrato: exemplos válidos e inválidos, CLI, pacote
npm run validate    # todos os artefatos ativos deste repositório
node dist/ops-validate.mjs caminho/do/prompt.yaml   # um arquivo, em qualquer lugar, sem instalar nada
```

Um documento é um prompt OPS válido quando o validador o aceita. O validador
rejeita, entre outras coisas, um `agent` ausente ou não resolvido, campos
desconhecidos, chaves YAML duplicadas, caminhos que saem do workspace, um
prompt sem verificação e uma entrada de worklog que afirma conclusão sem
verificações aprovadas. Veja [`VALIDATION.md`](./VALIDATION.md).

## Ajuda? O que um estudo local encontrou

Um estudo local pequeno comparou o mesmo agente, com o mesmo contrato, com e
sem as duas Skills: cinco tarefas, uma execução por tarefa e condição, um
modelo.

| Tarefa | Sem Skills | Com Skills |
|---|---:|---:|
| C1 Escrever um prompt a partir de um pedido | 100 | 100 |
| C2 Converter e melhorar um prompt legado | 100 | 100 |
| C3 Planejar um prompt em um workspace aninhado | 90 | 100 |
| C4 Executar um prompt contra um bug | 90 | 90 |
| C5 Retomar a partir de um checkpoint registrado (caso reservado) | 100 | 100 |

**O estudo não mostra que as Skills melhoram o trabalho, e não mostra nenhum
caso em que elas o pioraram.** O agente já pontuava no topo, ou perto dele, sem
elas, então não havia espaço para mostrar um ganho. A única nota mais alta, C3,
vem de um ponto que a linha de base perdeu para o avaliador e não para a
tarefa. A Skill certa foi carregada em seis de seis sondagens e nas cinco
tarefas. Tempo e tokens ficaram dentro de poucos por cento, com uma exceção
(C1, 72% mais tokens processados).

O que o estudo não pôde medir é aquilo para que as Skills servem. Todo projeto
de teste já continha o contrato e o validador, e as Skills existem para levar
os dois a um projeto que não tem nenhum.

Também está registrado: a pontuação de três tarefas foi corrigida depois da
primeira execução, e essas execuções foram repetidas; a ocultação da quinta
tarefa não pôde ser verificada; e uma frase da `ops-author` induz a erro sobre
um campo obrigatório até que o validador corrija. Cada execução e cada limite
estão [no relatório](./.guides/testing/skills-study/results/report.md) e
[na página de resultados](https://guided-engineering.github.io/OpenPrompt-Specification/results.html)
(em inglês).

## Histórico

Este projeto se descrevia como um framework de Spec-Driven Development em que
os prompts eram atribuídos a rótulos de papéis. Esse desenho foi substituído,
não estendido: documentos anteriores não são válidos no contrato atual e são
convertidos com [`.guides/conversion.md`](./.guides/conversion.md). As razões
estão registradas no
[ADR 0002](./.guides/architecture/adr/0002-refound-on-agents-skills-and-ops-contracts.md),
e a árvore anterior está no histórico do Git, no commit
[`ca82040`](https://github.com/guided-engineering/OpenPrompt-Specification/tree/ca820409df0aebe2b4669aa168ebc82d6bcecd48).

## Roadmap e licença

O que está feito e o que não está: [`ROADMAP.md`](./ROADMAP.md) (em inglês).

MIT © Guided Engineering Team. Veja [`LICENSE`](./LICENSE).
