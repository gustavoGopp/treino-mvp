# Prompt: continuação da sessão de catálogo (animações, conferência e fechamento)

> Escrito ao fim da sessão de catálogo completo (04/11/2026), a pedido do Gustavo. Cole o texto abaixo, a partir de "Você vai continuar", numa sessão nova.

---

Você vai continuar a **sessão de catálogo completo** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco").

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

Leia primeiro:
- o `CLAUDE.md`, que traz os princípios não negociáveis;
- o plano da sessão anterior, resumido abaixo;
- os documentos citados em cada item.

## Regras desta continuação
- **Conta:** o projeto é acessado só pelas contas pessoais do Gustavo, nunca pela conta de trabalho. Tudo o que é produzido fica no git, e só no git: **nada de publicar páginas, artefatos ou documentos fora do repositório**.
- **Não mexa no branch `r3-uso-real`** (o R3, uso real, roda noutra sessão). `privado/` nunca é versionado nem usado.
- **Branch de trabalho:** `claude/focused-shannon-7243on`. Ela tem **~23 commits à frente da `main`** (`b7cbb7b`) e ainda **não foi para a `main`**.
  - Inclui um commit de lint duplicado com a `main` (`7da03ee` × `b7cbb7b`).
  - Na ida para a `main`: rebase em cima dela ou merge, **sem forçar push**, e só com o ok do Gustavo.
- **Decisões, sempre uma por vez:**
  - mostre a evidência, o efeito medido e as opções, sem nada marcado de antemão;
  - mudança nos programas das personas (snapshots) só entra depois que o Gustavo vê o antes e o depois.
- **Preferência dele, dita em 04/11:** "quero sempre a melhor recomendação e mais apropriada, e que todos os treinos tenham a animação".
  - O gerador desempata, entre exercícios equivalentes, pelo que tem animação aprovada. A equivalência entre equipamentos tem evidência **robusta**.
  - Toda animação nova que entra muda programas: mostre o antes e o depois.

## Onde o projeto está (04/11/2026)
O que já está decidido e feito nesta branch (detalhes em `docs/revisoes/equipamento-minimo.md`, seções "Decisões da sessão de fechamento", e no histórico do git):

- **Pesquisa:**
  - `docs/pesquisa-v2/11-catalogo-completo.md` (catálogo, com a lista de entrada medida em B.3);
  - `docs/pesquisa-v2/12-outros-objetivos.md` (o Gustavo escolheu a opção b, a pergunta de objetivo, já implementada);
  - as correções do doc 11 aplicadas no `04` e em `regras.md` (inclui a regra nova `tecnica.parcial-alongada`).
  - No bíceps, a sugestão do 11 **não** foi aplicada: Kobayashi 2026, relido, mostra o total igual.
- **3 itens novos:** caneleiras de peso, mini-band e roda abdominal.
  - Nomes alternativos: TRX ou argolas, GHD, pendular, abdução em pé.
  - Colete e sandbag não entram (o sandbag fica como improvisado, como a mochila).
- **Exercícios novos na biblioteca** (135 exercícios no total), com ficha (`docs/pesquisa/animacoes/<id>.md`) e cartão de texto (`src/conteudo/exercicios/<id>.json`).
- **Boneco novo (acabamento A2):**
  - auditoria independente em `docs/revisoes/boneco-acabamento/` (relatório, piloto e lote);
  - o Gustavo escolheu a proposta 2 e pediu os ombros arredondados;
  - aprovado no lote, hoje é o padrão do estilo "Boneco";
  - o halter é desenhado em 3D (`dumbbell3`); o estilo Clássico continua igual ao guia original.
- **Animações aprovadas e no app nesta sessão (12):**
  - remada unilateral sem banco e rosca martelo;
  - polia: tríceps francês unilateral, remada unilateral e crucifixo invertido;
  - kettlebell: remada, stiff, rosca, tríceps francês, afundo, desenvolvimento unilateral e ponte.
  - A peça `kettlebell` está em `src/engine/desenho.ts`.
  - Com as duas mãos, use `{ maos: [mão direita, mão esquerda] }`: a alça passa pelas duas mãos.
- **Pedido do Gustavo que vale para toda animação:** **nenhum objeto "voando"**. Num objeto seguro com as duas mãos, as mãos ficam na largura real da pegada (~10–14 cm), e o objeto encosta no corpo quando apoiado nele. Confira com `node scripts/medir-animacao.mjs <id>`.
- **Escadas:** degraus de step e banco, e a escada própria dos exercícios de suspensão, da bola e da roda.
- **Faltam animação:** 83 dos 135 exercícios.
  - 12 deles são do elástico longo, que **esperam o R4 do boneco** (decisão do Gustavo).
  - A mini-band, que também usa elástico, sai agora (decisão dele).

## O que fazer, nesta ordem

### 1. Terminar as famílias novas, folha a folha
Ordem: ganho ÷ custo do doc 11, B.3.

- **Suspensão (5):** `rosca-suspensao`, `yt-suspensao`, `triceps-suspensao` (complemento, não "acima da cabeça"), `flexao-joelho-suspensao` (nível 4) e `bulgaro-suspensao`.
  - Antes, a peça nova: fita com âncora no alto e pegadores.
  - Veja se a `remada-suspensao`, que já existe na biblioteca, ganha a animação junto.
- **Bola e paralelas (3):** `abdominal-bola`, `ponte-pes-bola` e `elevacao-joelhos-paralelas`. Antes, a peça `paralelas`.
- **Caneleiras (3):** `extensao-joelho-caneleira`, `abducao-caneleira` e `aducao-caneleira`. Antes, a caneleira: uma caixa no tornozelo.
- **Mini-band (1):** `abducao-mini-band`, com um laço curto feito com a peça `band`.
- **Roda abdominal (1):** `roda-abdominal`. Antes, a peça nova.

### 2. A fila dos outros exercícios sem animação
Meta: "que todos os treinos tenham animação".

- Monte a fila pela frequência nos programas (`npm run auditoria`, `docs/revisoes/auditoria/inventario.md`) e pelo custo de animação (`pesquisa-v2/08`, seção 6).
- Mostre a fila ao Gustavo antes de começar.
- Os 12 do elástico longo ficam para depois do R4, até ele decidir o contrário.

### 3. Conferir as 40 animações antigas (decisão do Gustavo)
- Uma a uma, contra a ficha e as fontes: posição inicial, caminho, fim e erros, com `scripts/medir-animacao.mjs`.
- O que estiver errado vira folha nova para ele aprovar.
- Na sessão anterior, o tríceps francês com halter já foi corrigido (as mãos juntas na anilha).

### 4. Fechamento
- `npm run check`, `npm run test:e2e` e `npm run auditoria`. A auditoria roda duas vezes, e o `diff` precisa sair vazio.
- Escreva o relatório `docs/revisoes/catalogo-completo.md`:
  - o antes e o depois do mapa do catálogo (`docs/revisoes/catalogo/`, vagas com 0 e com 1 opção por cenário);
  - o que mudou nos programas das personas;
  - as decisões.
- Atualize:
  - o `docs/devlog.md`: o que mudou, uma imagem e o rascunho de post;
  - o `docs/backlog.md`: os 12 do elástico depois do R4; a seção do Diagnóstico, que deve ser colada só pela conta certa; as ideias da opção (c) dos objetivos; e as 17 fontes do `10` que ainda não estão no `fontes.md`;
  - o recado ao R3 (`docs/prompts/recado-r3-equipamento-minimo.md`, ou um novo).
- **Pendências de leitura** (o PubMed bloqueou): Larsen 2025 do leg press (40113586, a chave `larsen2025b`) e "back squat" × smith em `kassiano2026`.
- Pare para a revisão do Gustavo. A ida para a `main` é só com o ok dele.

## O ritual de cada folha (o que funcionou nesta sessão)
1. **Pose em revisão:** a pose vai em `src/engine/exercicios/revisao/<id>.ts`. Parta da animação aprovada mais parecida: copie e ajuste os imports de `'../desenho'` para `'../../desenho'`.
   - Os ids dos erros são **os mesmos** da ficha ou do cartão.
   - Se um erro precisa mudar o equipamento (ex.: o punho dobrado no desenvolvimento com kettlebell), passe um parâmetro na pose e leia `sk.pose.<nome>` no `equip`.
2. **Folha:** `node scripts/folha-animacao.mjs <id> docs/revisoes/catalogo/folhas/<id>.png --estilo=a` (o `a2` é o mesmo boneco).
   - Olhe a folha você mesmo antes de mostrar: rótulos cortados, objeto solto, pé atravessando o equipamento, figura pequena demais.
   - Para ver quadros grandes, gere um HTML com `montarSvgEstilo` e tire o print com o Playwright.
3. **Medidas e conferência escrita:**
   - meça com `node scripts/medir-animacao.mjs <id>` (as juntas em cada fase, a cinemática ik = 0 e a distância entre as mãos);
   - escreva a conferência em `docs/revisoes/catalogo/conferencia/<id>.md`, com uma tabela "o que a fonte pede × o que o boneco faz (medido) × confere?" (ver as que já existem);
   - mostre ao Gustavo a folha e a conferência, e espere o "aprovar".
4. **Texto do guia:** monte `src/conteudo/revisao/<id>.json` a partir do cartão, acrescentando `feel`, `feelNote`, `breath`, `check`, `vary` e `extLabels`, e mantendo os mesmos `errors`. O schema é `conteudoExercicioSchema`, em `src/conteudo/schema.ts`.
   - O `target` e o `feel` citam os músculos primários e secundários (veja `tests/unit/anatomia.test.ts`).
5. **Aprovação:** `node scripts/aprovar-animacao.mjs <id> <id>` e **logo depois `git add -A`**. Sem isso, o `textos.test` falha com ENOENT.
6. **Desenho dos músculos (`src/engine/estilo/musculos.ts`):**
   - em `LISTA`, todo secundário da biblioteca precisa aparecer no desenho, e todo agachar ou afundo leva os adutores;
   - em `SO_AJUDA`, o que o desenho mostra e a biblioteca não conta (ex.: o antebraço nas roscas);
   - testes com listas fixas, como a extensão de quadril em `anatomia.test.ts` e `funcoes.test.ts`, ganham o id novo.
7. **Testes:**
   - rode `npm run check`;
   - se os snapshots das personas mudarem (o desempate passa a escolher o animado), mostre ao Gustavo e só então rode `npx vitest run -u`;
   - ajuste as asserções fixas de `tests/unit/locais.test.ts` sem enfraquecê-las.
8. **Linhas de base:**
   - grave com `ATUALIZAR_NOVAS=1 ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor`;
   - rode de novo sem as variáveis, para confirmar;
   - localmente, o Chromium já instalado pede o Playwright 1.63.0 fixado.
9. **Commit pequeno, em pt-BR e no imperativo, e push.**

## Exercícios novos na biblioteca
- Linhas em `exercicios.json`: o formato é `JSON.stringify(d, null, 1)`, sem quebra de linha no fim.
- Linhas em `funcoes.json`: um objeto por linha.
- O gerador usa só o 1º nível possível de cada vaga, então não ponha um exercício novo num nível que tire opções que já existem.
