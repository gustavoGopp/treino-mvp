# Relatório: pike e extensão de tríceps com o peso do corpo

Ramo: `worktree-agent-af2799493be848cf6`, em cima de `d28725f`. O diretório de trabalho tinha sido criado em `06d4066`; alinhei o ramo a `d28725f` com `git reset --hard`, antes de qualquer mudança. Não fiz push, merge nem PR.

Commits:

| Commit | O que entrou |
|---|---|
| `9d97040` | o pike |
| `3e7080c` | a extensão de tríceps |
| o último commit do ramo | este relatório |

`npm run check` passou, e `npm run conferir:animacao` ficou sem falha em todas as 13 animações. As conferências escritas estão em `lote-2/pike.md` e `lote-2/extensao-triceps-peso-corpo.md`.

## Pike (`pike`)

**Conferência automática: 0 falha, 1 aviso.** O aviso é o das linhas da ficha que são escolha de desenho: `maos.aFrenteDosPes` 94 cm, `calcanhar.sobe` 30°, `quadril.cima` 105°, `cabeca.aoChao` 5 cm e `pescoco.flexao` 0°.

**O que a conferência mediu:**

| Item | Medido |
|---|---|
| Mãos e pés | não saem do lugar (0 cm) |
| Cotovelo | 10° → 95° |
| Flexão do quadril | 105° → 99° |
| Quadril | sobe 87 → 75 cm, anda 17 cm para a frente |
| Cabeça | desce de 23,6 cm a 5,0 cm do chão, 1,7 cm à frente da linha das palmas, entre as mãos; nunca abaixo do chão nem nas mãos |
| Ombros | no mínimo 8,4 cm atrás das palmas |
| Elevação do braço | 141° → 101° (média 170°) |
| Clavícula | 14,7° a 16,5° (ritmo automático) |
| Punho | dobra no máximo 69,7° |
| Ritmo | salto de 12,2% |

**O que não ficou bom:**
- De frente, no cinza, a cabeça quase não se distingue (sem cabelo); na cor de pele se lê bem.
- O cotovelo dobra menos que hoje (95° contra 132°): a descida para quando a cabeça chega a 5 cm, na linha das mãos.
- O V ficou mais fechado que o de hoje.
- O erro "quadril desce" é uma pose de desenho: os ombros ficam 9,7 cm à frente das palmas.

**Risco de o Gustavo não gostar: baixo a médio.** Segue a ficha e a flexão aprovada, com as mesmas vistas e erros de hoje. O que pode incomodar é a descida mais curta e a cabeça pouco legível de frente no cinza.

## Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

**Divergência com o pedido.** O pedido dizia "no chão". A ficha da técnica e o cartão pedem um apoio fixo na altura da cintura (o chão de joelhos é só o último degrau da progressão), e a ficha manda. Fiz com a bancada, como a animação de hoje: o antebraço não apoia em nada, e a conferência do chão mede 0 cm.

**Conferência automática: 0 falha, 5 avisos.**
1. A elevação do braço chega a 179,9° (média 170°, máximo 192°).
2. A dorsiflexão do tornozelo chega a 25° (média 15°).
3. A supinação do antebraço chega a 94,1°. É a medida do motor para a mão espalmada com o cotovelo para a frente; não ajustei e vale olhar.
4. As linhas de desenho: `maos.dentroDaBeirada`, `pes.atrasDaBeirada`, `pes.meiaDistancia`, `calcanhar.sobe`, `cotovelo.cima`, `testa.aoApoio` e `pescoco.flexao`.
5. A vista de lado não serve ao modo Músculos; o padrão é a de cima (182 cm² do tríceps visíveis).

**O que a conferência mediu:**

| Item | Medido |
|---|---|
| Mãos e pés | não saem do lugar (0 cm) |
| Corpo | reto (mínimo 176,6°), inclina de 42° a 52° da vertical |
| Cotovelo | 25° → 106°, reto para a frente (o plano do braço abre 0,6°) |
| Cabeça | embaixo, a 6,0 cm da bancada |
| Braço | elevado 178° embaixo |
| Punho | dobra no máximo 68° |
| Corpo dentro da bancada | 0 cm |
| Ritmo | salto de 9,3% |

**O que não ficou bom:**
- A pose é bem diferente da de hoje, que foi aprovada. Hoje o corpo fica mais em pé (32° a 47°), o cotovelo desce abaixo da beirada e o braço fica a cerca de 81° do tronco. Aqui o braço vai à linha do tronco, como a ficha pede ("braços acima da cabeça").
- Os pés tiveram de recuar para 132 cm da beirada (hoje ~112). Com 112, o cotovelo passava à frente da mão e o punho dobrava 109° (falha; o máximo observado é 95°).
- As mãos estão espalmadas, e não segurando a beirada.
- De lado, embaixo, a cabeça some entre os braços, e o rótulo "só o cotovelo dobra" fica perto da cabeça.

**Risco de o Gustavo não gostar: alto.** A pose muda bastante em relação à animação aprovada (corpo mais deitado, braço acima da cabeça, pés mais longe). Há ainda a divergência chão × bancada, a decidir com ele.

## Arquivos comuns que mexi (só acréscimo de linha)

| Arquivo | O que mudou |
|---|---|
| `src/engine/novo/exercicios/registro.ts` | as linhas `pike` e `extensaoTricepsPesoCorpo` |
| `src/engine/novo/regras/registro.ts` | a linha `apoioNoChao`: as regras novas da família |
| `src/engine/novo/dados/objetos/registro.ts` | a linha `bancada`: o objeto novo |

Não mexi em `flexao.ts`, `conferir.ts`, `pecas.ts` nem em nenhum outro arquivo comum. Também não alterei o desenho do corpo. Os arquivos gerais regenerados pela conferência (`prototipos/conferencia.*`) foram desfeitos antes dos commits.

**Arquivos novos:**
- O núcleo da família: `exercicios/apoio-no-chao.ts`.
- As regras: `regras/apoio-no-chao.ts`, com `quadril-continua-alto`, `cabeca-desce-entre-as-maos`, `pernas-estendidas`, `cotovelos-para-tras-a-meio-caminho`, `so-o-cotovelo-dobra`, `cotovelos-para-a-frente`, `testa-perto-do-apoio` e `braco-acima-da-cabeca`.
- A peça: `pecas-de-cena/bancada.ts` e `dados/objetos/bancada.json`.
- As duas fichas de movimento e os dois exercícios.
- A documentação e as imagens de `lote-2/`.

## Medidas provisórias

**Bancada.** A altura de 90 cm, o tampo de 2 cm, os pés de 8 cm e a profundidade de 60 cm têm fonte: a página pública da Cubro sobre a linha IKEA METOD, lida em 15/11/2026 (https://helpcenter.cubrodesign.com/en/ikea-metod-structures-catalogue). Ficam provisórias, `a-conferir`:
- quanto o tampo passa da frente do gabinete (2 cm);
- o recuo do rodapé (5 cm).

A largura de 120 cm é escolha de desenho.

**Fichas de movimento (selo "desenho", precisam do ok do Gustavo):**
- Pike: `maos.aFrenteDosPes` (94 cm), `calcanhar.sobe` (30°), `quadril.cima` (105°), `cabeca.aoChao` (5 cm), `pescoco.flexao` (0°) e os números dos erros.
- Tríceps: `pes.atrasDaBeirada` (132 cm), `maos.dentroDaBeirada` (1 cm), `cotovelo.cima` (25°), `testa.aoApoio` (6 cm), `calcanhar.sobe` (30°), `pes.meiaDistancia` (8,7 cm), `pescoco.flexao` (0°) e os números dos erros.

**Limites de regras que escolhi** (a ficha não dá número):
- cabeça entre 1 e 9 cm do chão e a até 3 cm da linha das mãos;
- joelho até 15°;
- abertura do cotovelo de 30° a 60° no pike e até 20° no tríceps;
- testa entre 1 e 10 cm da bancada;
- braço acima da cabeça = elevação de 150° ou mais.
