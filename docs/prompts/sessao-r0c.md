# Prompt: marco R0c (o catálogo ampliado de equipamentos e exercícios)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão do marco R0b. Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar os **marcos de código** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão (quando um termo técnico for inevitável, explique em uma frase).

**Onde o projeto está (01/11/2026)**
- M0 a M5 em produção. A pesquisa v2 (`docs/pesquisa-v2/`, T1 a T7) está aprovada.
- **O R0b foi aprovado** (branch `r0b-gerador-por-funcao`; ver `docs/devlog.md`, entrada R0b):
  - divisão escolhida (`src/domain/gerador/divisoes.ts`);
  - vagas por função (`src/domain/gerador/funcoes.json`, a tabela 2.1 do T7 só com os ids que já existiam);
  - descanso de 105 s e a nova escada de cortes com drop set;
  - estado na versão 3.
- **Decisões do Gustavo que valem agora:**
  - público principal é ele mesmo;
  - sem profissional de Educação Física por agora (segurança e triagem não mudam);
  - fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada;
  - no desempate entre equivalentes, entra a animação aprovada; sem drop set nas semanas de RIR 3–4; com polia, a puxada ganha da barra fixa pela "carga possível".

**O que o R0b mediu e o R0c precisa fechar** (`tests/unit/metas-r0.test.ts`, inventário da Carla, 540 programas):
- 39 exercícios distintos usados, para a meta de 45 (faltam 6);
- equipamento sem exercício possível: as **paralelas** (a esteira fica fora por decisão);
- 12 exercícios com menos de 2 alternativas de outro equipamento: crucifixo inverso, desenvolvimento (2), elevação lateral (2), face pull, panturrilha no step (2), ponte de glúteo, tríceps (3);
- 1 exercício possível que não aparece nem como vaga nem como alternativa: o agachamento com o peso do corpo.

**O que a pesquisa v2 decidiu e o R0c aplica** (leia `docs/pesquisa-v2/08-equipamentos-v2.md`, seções 1, 1.1, 2, 4, 5, 7.2 e 8; não reabra as decisões):
- a lista final de 46 equipamentos (21 novos), por capacidade, com o multifuncional ligando as estações marcadas;
- a polia simples fixa passa a dar `polia_alta` ou `polia_baixa`;
- os 5 tipos de carga (seção 1.1);
- os 29 exercícios novos da seção 5, cada um com a ficha em `docs/pesquisa/animacoes/<id>.md`;
- o agachamento livre passa a ser descrito como "profundo";
- os adutores como secundário dos agachamentos profundos e do afundo;
- as dicas para não confundir na foto (seção 4).
</contexto>

<tarefa>
Fazer o **marco R0c**: o catálogo ampliado.

1. **Taxonomia** (`src/domain/taxonomia/equipamentos.ts`):
   - os 21 ids novos e os atributos da seção 1.1 em `inventarioSchema`;
   - as capacidades novas, com o multifuncional por estações e a polia simples com `altura`;
   - `cargasKettlebell`;
   - uma migração do estado salvo (v3 → v4) para a `polia_simples` antiga (`alturaRegulavel` → `altura`), com teste.
2. **Biblioteca** (`src/domain/biblioteca/exercicios.json`):
   - os 29 exercícios, com `animacaoId: null`, os campos pela ficha e os testes de esquema;
   - a tag `profundo` no agachamento com barra;
   - os adutores como secundário;
   - o cartão de texto de cada um em `src/conteudo/exercicios/`.
3. **Funções** (`src/domain/gerador/funcoes.json`): os ids novos nos níveis da tabela 2.1. Regras novas da seção 7.1 que mexem no gerador, com selo e fonte em `regras.md` e as fontes em `fontes.md`:
   - `equipamento.capacidades`;
   - `selecao.mergulho`;
   - `seguranca.montagem`;
   - o selo do complemento de peito.
4. **Registro da carga:** os tipos novos (anilha por lado, contrapeso no graviton, kettlebell), mais as regras `progressao.incremento.*` da seção 7.1.
5. **Visão** (`src/domain/visao/`, `api/`): os ids novos no esquema e as 14 dicas de desambiguação no pedido (`visao.desambiguacao`). O eval com fotos reais continua na máquina do Gustavo; ele precisa da chave da Anthropic, que está em `docs/backlog.md`.
6. **Testes:**
   - cada regra nova com teste no Vitest;
   - as listas `FALTA_R0C_*` de `tests/unit/metas-r0.test.ts` zeradas: 45 ou mais exercícios distintos, as paralelas com uso, 2 ou mais alternativas de outro equipamento em todo exercício;
   - os snapshots das 4 personas mudam só com revisão: mostre ao Gustavo o antes e o depois de cada um.

Fica para depois:
- os atalhos na tela de equipamento, a esteira fora da lista e a pergunta da menor anilha (R1);
- as animações dos exercícios novos (em lotes, pela fila da seção 6, cada uma com a folha de contatos para aprovação; não entram neste marco);
- os desenhos dos 21 equipamentos novos na lista (se não couberem, cartão de texto com o nome).

**Pronto quando:**
- `npm run check` e `npm run test:e2e` passam;
- as metas do R0 estão atingidas no teste;
- as regras novas estão em `regras.md` com selo;
- os snapshots revistos foram aprovados pelo Gustavo;
- o devlog do marco está escrito.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:**
   - `CLAUDE.md` e o `docs/devlog.md` (entrada R0b);
   - o `08-equipamentos-v2.md` e as fichas de `docs/pesquisa/animacoes/`;
   - `src/domain/taxonomia/`, `src/domain/biblioteca/` e `src/domain/gerador/`;
   - `tests/unit/metas-r0.test.ts`.
2. **Plano antes do código:** mostre ao Gustavo, em linguagem simples, o que muda no programa de cada persona antes de mexer nos snapshots.
3. **Determinístico:** sem `Math.random` nem `Date.now` em `src/domain/`.
4. **Commits:** pequenos, em pt-BR, no imperativo, num branch criado a partir do R0b (ou da `main`, se o R0b já tiver entrado nela). A `main` só depois da aprovação do marco.
5. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`). Use `get_artifact` antes de editar e acrescente no topo uma seção do R0c com o antes e o depois e as metas do R0 medidas.
6. Nunca use nada de `privado/` em arquivos versionados.
7. Pendências do Gustavo estão em `docs/backlog.md`.

Ao fim do marco:
- atualize o `docs/devlog.md` (o que mudou, imagem ou GIF, rascunho de post);
- diga em poucas linhas, em pt-BR simples, o que mudou no programa de cada persona, o que ficou para o R1 e o que precisa da decisão dele.

Depois pare e espere a revisão.
</como_trabalhar>
