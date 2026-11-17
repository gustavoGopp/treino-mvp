# Lote A4 · Elevação lateral com caneleira presa no punho (`elevacao-lateral-caneleira`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés na largura do quadril, uma caneleira presa em cada antebraço, logo acima do punho; a mão fica relaxada (a caneleira não é segurada). Os braços sobem para os lados e um pouco à frente até a altura dos ombros, com os cotovelos levemente dobrados e conduzindo, e voltam ao lado do corpo. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral-caneleira.md`. Cartão do app: `src/conteudo/exercicios/elevacao-lateral-caneleira.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-lateral-caneleira.json`.
- Animação: `src/engine/novo/exercicios/elevacao-lateral-caneleira.ts`, sobre o núcleo das elevações aprovadas (`exercicios/elevar-o-braco.ts`, `criarElevacao`), com um modo novo, `'caneleira'`.
- Regra nova: `elevacao-caneleira-presa-no-antebraco`, em `src/engine/novo/regras/elevacao-lateral-caneleira.ts` (uma linha em `regras/registro.ts`). As outras são as das elevações aprovadas (`regras/ombros.ts` e `conferir.ts`), que servem igual.
- Quadros grandes: `../quadros/elevacao-lateral-caneleira.png`. Sem folha (não há animação de hoje).

## Mudanças em arquivos comuns (só aditivas)

1. **`exercicios/elevar-o-braco.ts`:** um quarto valor em `MaosDaElevacao`, `'caneleira'`. Nele, a mão fica relaxada (forma `'relaxada'`, sem diâmetro de pegada), a carga de cada lado fica no centro da caneleira (no equilíbrio), a folga até a coxa embaixo conta a mão e a caneleira em volta do antebraço, e o quadro desenha uma caneleira em cada antebraço, com as marcas `caneleiraR`/`caneleiraL`. Os outros três modos (`halteres`, `polia`, `elastico`) seguem pelos mesmos caminhos de antes, linha por linha.
2. **`pecas-de-cena/caneleira.ts`:** uma função nova, `caneleiraNoAntebraco(e, k, fora, acima)`: a mesma faixa, em volta do antebraço, com a borda de baixo `acima` cm acima do centro do punho, e o raio medido na pele do Boneco (como `caneleiraNaPerna` faz na canela). O desenho da faixa (`caneleira`) não mudou.

Conferido: `npm run conferir:animacao` sem falha em todas as animações, e o `preparo.mjs` só gravou arquivos novos (os três deste lote) e o `registro.ts` gerado; o preparo das animações aprovadas (as quatro elevações do núcleo e as três caneleiras) ficou igual.

## Onde os números saem

A ficha da técnica dá a montagem (caneleira no antebraço, acima do punho, velcro firme; consenso, `17`, G3) e o movimento (braços para os lados até a altura dos ombros; consenso, `coratella2020`). O cartão acrescenta os pés na largura do quadril, os braços ao lado do corpo embaixo, os cotovelos levemente dobrados, "cotovelo lidera", "ombros longe das orelhas" e os tempos (~1 s, pausa curta, ~2 s). O resto saiu das elevações aprovadas (com halteres e com elástico, o mesmo núcleo): joelhos destravados (10°), bacia 12° à frente, braço no plano de 30°, topo de 96° no tórax, cotovelo a 15° com o giro de 50°, folga de 1,5 cm embaixo e os números dos erros. A caneleira é a da tabela (`dados/objetos/caneleira.json`: a Cuff de 2 lb, "Wrist and Ankle Weight", 0,91 kg), com a borda de baixo 2 cm acima do centro do punho (a mesma distância que a tabela usa acima do tornozelo).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Caneleira no antebraço, acima do punho, sem escorregar | consenso | o centro da faixa fica a 7,4 cm do centro do punho, no eixo do antebraço (a 0 cm dele), o ciclo todo; a borda de baixo a 2 cm do punho | sim |
| A mão não segura a caneleira | consenso | a mão fica relaxada o ciclo todo | sim |
| Em pé, pés na largura do quadril | consenso | os pés a 9 cm do meio, parados (0 cm); o centro de massa (corpo + caneleiras) anda de −1,4 a 1 cm do meio do pé | sim |
| Embaixo, braços ao lado do corpo | consenso | o braço pende no plano da subida (30° à frente), 10° aberto: a mão e a caneleira ficam ao lado da coxa, a 4,3 cm da pele (o mais perto no ciclo) | sim |
| Braços para os lados até a altura dos ombros | consenso | no alto, o cotovelo fica 0,4 cm abaixo do centro do ombro (o braço a 89° da vertical), 30,5° à frente do plano do corpo, visto de cima | sim |
| Cotovelos levemente dobrados; "cotovelo lidera" | consenso | o cotovelo dobra 15° o ciclo todo; no alto, ele fica 8,1 cm acima do centro da mão | sim |
| "Ombros longe das orelhas" | consenso | a clavícula sobe no máximo 0° além do ritmo normal do ombro; a ponta do ombro sobe 1,3 cm com o braço | sim |
| Tronco parado | consenso | a base do pescoço se move 0 cm; o peito fica inclinado 13,3° à frente (o das elevações aprovadas) | sim |
| ~1 s subindo, pausa curta, ~2 s descendo | consenso | 1,1 s, 0,4 s e 2 s; salto de velocidade de 6,7% | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs elevacao-lateral-caneleira`): **0 falha, 3 avisos.** (1) As linhas da ficha que são escolha de desenho (joelho, tronco, pescoço, cabeça, plano, pegada, o tamanho da mão na conta da folga, folga e carga). (2) A frente do ombro listrada como "só ajuda", a mesma diferença aceita das outras elevações. (3) De cima, o músculo principal quase não aparece (20 cm²; de frente, 78 cm²): o modo Músculos abre de frente, como na elevação com halteres aprovada.

### As vistas

De **frente** (a padrão, como nas elevações aprovadas): os dois braços subindo até a linha dos ombros, as caneleiras nos antebraços e os ombros baixos. De **cima** (a segunda, como nas aprovadas): os braços um pouco à frente do corpo. Embaixo, de cima, as caneleiras aparecem dos lados dos ombros (o antebraço sai para fora do braço, visto de cima): é o que se vê de verdade, não um erro de pintura (conferi pondo a faixa mais para trás na pintura: o quadro não muda).

## Erros

O cartão tem três erros. Dois viraram desenho, na ordem do app; um ficou de fora.

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Encolher os ombros ("o trapézio de cima assume") | de frente | no alto, a clavícula sobe 18° além do ritmo (32,5° contra 14,5°); a ponta do ombro fica 4 cm mais alta que no certo |
| Balançar o corpo ("o embalo tira o trabalho do ombro; tronco parado") | de lado | a bacia começa inclinada 30° à frente (no certo, 12°), com os joelhos dobrados 24°, e é jogado para trás para dar o impulso: no alto, o peito fica 8,7° atrás da vertical, com a lombar arqueada 12° (o "Balançar o tronco" das elevações aprovadas) |
| Parar longe da falha | — | **não desenhado:** é esforço (quantas repetições faltavam), sem nenhuma consequência visível no movimento; quem integra põe a exceção na lista `SEM_DESENHO` do teste da ponte (como "Parar longe da falha" da extensão com mini band) |

## O equipamento

- **Caneleira de 2 lb** (`dados/objetos/caneleira.json`, a Cuff "Wrist and Ankle Weight", que o fabricante vende para punho e tornozelo): a mesma peça da abdução e da extensão com caneleira aprovadas, fechada em volta do antebraço. A faixa (10,8 cm de largura) cobre do punho até perto do meio do antebraço.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Não há correção registrada para este exercício (ele nunca teve animação).
- **Caneleira** (seção 3, peças de cena): a faixa acompanha o membro e fica vermelha na figura do erro quando o membro erra.
- **Achado 3 da revisão de anatomia:** nas elevações laterais, o trapézio de cima fica fora do desenho; a frente do ombro fica listrada ("só ajuda"). `papeis` = `deltLat` (principal) e `deltAnt` (só ajuda), como na elevação com halteres.

## O que não ficou bom

- **No alto, de frente, o fio do rótulo "cotovelo lidera"** passa por cima da caneleira e do antebraço até o cotovelo (o mesmo rótulo, no mesmo ponto, das elevações aprovadas).
- **A mão relaxada é a do Boneco,** a mesma dos braços soltos das outras animações: de frente, parece uma luva. Não mexi no desenho da mão.
- **A faixa no antebraço tem 10,8 cm** (a medida da tabela): no antebraço, ela parece mais larga que no tornozelo, porque o antebraço é mais curto que a canela.
