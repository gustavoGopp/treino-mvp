# Lote 5 · Rosca alternada com halteres (`rosca-alternada`)

De 15/11/2026. Primeira animação da família das roscas no motor novo. Em pé, um halter em cada mão, palmas para a frente, um braço de cada vez, o cotovelo parado ao lado do tronco. Ainda não está ligada às telas do app. **Refeita em 15/11/2026 com o halter sextavado de 10 lb** (`dados/objetos/halter-leve.json`): os braços passaram de 17° para 6° de abertura e a palma de 64° para 85° (ver `relatorio-halter-leve.md`).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-alternada.md` (aprovada em 01/11/2026).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-alternada.json`.
- Animação: `src/engine/novo/exercicios/rosca-alternada.ts`, sobre o núcleo comum da família (`exercicios/dobrar-o-cotovelo.ts`), que a martelo, a com kettlebell e a inclinada também usam.
- Regras novas medidas: `src/engine/novo/regras/roscas.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-rosca-alternada.png`. Quadros grandes: `../quadros/rosca-alternada.png`.

## Como o núcleo resolve cada quadro

- **O corpo:** em pé, joelhos a 5°, pés na largura do quadril. O quadril sai do equilíbrio (o centro de massa do corpo com os dois halteres embaixo sobre o meio do pé), pelo núcleo dos stiffs (`dobrarOQuadril`, sem dobrar), e fica **parado** o ciclo todo: o braço que sobe não move o tronco. O centro de massa anda para a frente quando o halter sobe, mas fica dentro do apoio dos pés.
- **O braço:** o úmero tem uma direção fixa no tórax (aberto 6° para o lado, 5° à frente); o antebraço dobra no plano do braço (o cotovelo é uma dobradiça). O polegar fica 85° para fora da posição neutra (palma para a frente) e o cabo do halter de 10 lb atravessa a palma na direção do polegar.
- **Um braço de cada vez:** o parâmetro do movimento vai de 0 a 1 no braço direito e de 2 a 3 no esquerdo (0 e 2 são a mesma pose, os dois embaixo). Assim as fases da ficha de movimento são as do app: embaixo, direito sobe, topo, direito desce, esquerdo sobe, topo, esquerdo desce.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril | consenso | pés a 9 cm do meio, dedos para a frente; não saem do lugar (0 cm) | sim |
| Halteres ao lado do corpo, palmas para a frente | consenso | antebraço supinado 85° (90° = palma toda para a frente; média da população 87,5°); a cabeça de dentro do halter fica na frente da coxa | sim |
| Um braço de cada vez | consenso | enquanto o direito sobe, a mão esquerda não anda (0 cm); depois o esquerdo faz o mesmo | sim |
| O cotovelo fica parado ao lado do tronco; só o antebraço sobe | consenso | o cotovelo anda 0 cm enquanto dobra de 12° a 132°; o braço fica 5° à frente da linha do tronco e 6° aberto para o lado | sim |
| Tronco parado, sem jogar o corpo para trás | consenso | a base do pescoço anda 0 cm; o quadril dobra 2,3° (em pé) | sim |
| Embaixo: braço estendido | consenso | o cotovelo dobra 12° (sem travar) | sim |
| Topo: halter perto do ombro, cotovelo ainda ao lado do tronco | consenso (app) | o centro da pegada fica a 26,3 cm do centro do ombro, 6,3 cm abaixo dele e à frente, com o braço 5° à frente da linha do tronco; o cotovelo dobra 132° (a média da população é 148°) | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s e 2,2 s, com pausa de 0,4 s em cima e 0,5 s embaixo; salto de velocidade de 5,9% (limite 15%) | sim |
| O halter não atravessa o corpo (desenho) | — | a menor folga entre as cabeças do halter (medida até a quina do sextavado) e a pele é −0,2 cm, na frente da coxa, embaixo; a regra aceita até −0,5 cm e nos quadros a cabeça de dentro fica na frente da coxa | sim |
| Equilíbrio | — | o centro de massa (corpo + 2 × 4,5 kg) fica sempre dentro do apoio dos pés | sim |

**Por que o braço vai 5° à frente e o cotovelo fica a 12° embaixo:** com o halter de 10 lb (26,7 cm, cabeças de 10,2 cm), o braço aberto 6° (como na martelo) e a palma a 85°, a cabeça de dentro passa na frente da coxa. Com o braço na vertical e o cotovelo a 8°, ela raspa a coxa no começo da subida (−0,8 cm a −1,0 cm, medido; −0,3 cm com o braço 3° à frente). Com 5° à frente e 12° embaixo, a folga fica em −0,1 a −0,2 cm, na quina do sextavado, e não se vê. Testei também a mão encostada na cabeça de dentro do halter (como na inclinada): aqui não muda nada, porque o que encosta é a face da cabeça na frente da coxa. Com a palma a 90° a folga cai para −1,0 cm; ficou 85°. A ficha não dá número para nenhuma dessas medidas (selo `desenho`, menos o cotovelo embaixo, que é "sem travar").

Antes (até 15/11, com o halter de 25 lb): braço aberto 17° e palma a 64°, porque a cabeça de dentro do halter de 33 cm entrava 3 a 4 cm na coxa.

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-alternada`): **0 falha, 3 avisos**: as linhas da ficha de movimento que são escolha de desenho (joelho, abertura do braço, braço à frente, supinação, peso do halter); o antebraço em "só ajuda" (listrado), que é a correção de 04/11 das roscas e não está na lista do conteúdo; e a vista de lado, que não serve ao modo Músculos (ver abaixo).

## As vistas

- **De lado** (padrão da técnica): mostra o cotovelo parado, o tronco parado e o antebraço subindo. O braço esquerdo, do outro lado, fica quase todo atrás do corpo quando sobe.
- **De frente**: mostra a alternância (um halter em cima, o outro embaixo) e o bíceps. É a vista padrão do modo Músculos, medida: de frente 193 cm² do bíceps; de três quartos (`quina`) 124 cm²; de lado 53 cm² (não serve).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Balançar o tronco (de lado) | enquanto o halter sobe, o peito vai 12° para trás e a lombar arqueia 6°; a base do pescoço vai 10,5 cm para trás; os pés não saem do lugar e o centro de massa fica no apoio |
| Cotovelo vai para a frente (de lado) | o braço sobe 35° à frente do tronco enquanto o antebraço dobra 115°: o cotovelo anda 16 cm para a frente e o halter chega à altura do queixo, à frente do rosto |
| Não estender o braço (de lado) | embaixo, o cotovelo para dobrado 55° (os dois braços); o halter fica 13 cm acima de onde fica no certo |

## O equipamento

- **Halteres:** o sextavado de 10 lb da tabela de objetos (`halterLeve`: 26,7 cm, cabeças de 10,2 × 9,1 cm, cabo de 2,8 × 13 cm, 4,5 kg; RitFit e Titan), no gerador realista, com o cabo atravessando a palma; a mão é pintada por cima do cabo.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Antebraço "só ajuda" (listrado) nas roscas (04/11, `SO_AJUDA`). Respeitada.
- A vista de lado como principal nas roscas (auditoria do acabamento, 04/11). Respeitada na técnica; no modo Músculos a vista de frente mostra mais o bíceps (medido) e vira a padrão.
- Aprovação sem correção de 01/11 (lote 1): o ritmo, um braço de cada vez e os três erros seguem a animação aprovada.

## Músculos

Bíceps (principal) e antebraço (só ajuda, listrado). A ficha da técnica lista o antebraço como secundário; segui a correção de 04/11 (`SO_AJUDA`), e a biblioteca conta só o bíceps. O braquial não existe como grupo no desenho (`dados/musculos.json`).

## O que não ficou bom

- **O braço vai 5° à frente da linha do tronco** (e não 0°), para a cabeça de dentro do halter não raspar a coxa no começo da subida. De lado mal se vê (`quadros/rosca-alternada.png`, "lateral:tec:f0"); a regra do cotovelo ao lado do tronco aceita até 10°.
- **A palma fica a 85°**, não a 90°: de frente lê-se "palma para a frente".
- **De frente, embaixo, a cabeça de dentro do halter fica na frente da coxa** ("frontal:tec:f0"): é o que acontece com a palma para a frente e o braço colado; não atravessa (−0,2 cm na quina).

## Correção de 19/11 (peso dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), a regra `peso-fora-do-corpo` (a superfície do peso contra o volume do corpo, fora as mãos que seguram, no ciclo e em cada erro em 9 instantes; tolerância de 0,5 cm) e a checagem de pesos da conferência da pintura foram passadas em todas as animações com peso livre. Nesta, **com o braço embaixo, a cabeça de dentro do halter entrava 3,4 cm na coxa**, nos dois lados, no ciclo inteiro (o braço que não sobe fica embaixo) e nos erros "Balançar o tronco" e "Cotovelo vai para a frente" (3,7 cm pela checagem da pintura). A regra de antes (`carga-fora-do-corpo-na-rosca`) tomava a cabeça por um cilindro e não via; a ficha dizia "−0,3 cm medido".

**A mudança.**

- O braço abre **10° para o lado**, e não 6° (`braco.paraFora`): a cabeça de dentro encosta na coxa sem entrar. Com 9°, ela ainda entrava 0,7 cm. A ficha da técnica pede "cotovelo ao lado do tronco" e não dá número; os 10° continuam ao lado do tronco.
- O resto do movimento não muda (o braço sobe no mesmo plano, 4° mais aberto).

| medido (homem) | antes | depois |
|---|---|---|
| a cabeça do halter entra no corpo | 3,4 cm (coxa, nos dois lados) | 0 cm |
| abertura do braço | 6° | 10° |

A ficha liga `peso-fora-do-corpo`: medida no estado de antes, ela falha (3,4 cm, na coxa esquerda, no erro "Balançar o tronco" (e na direita, no ciclo)); no de agora, passa (o peso não entra no corpo). O antes e depois está em `correcao-das-antigas/rosca-alternada-peso.png`; os quadros grandes foram regravados (`quadros/rosca-alternada.png`) e olhados vista por vista, quadro a quadro e erro a erro, nos dois lados do corpo. A conferência automática dá **0 falhas e 3 avisos** (antes: 0 falhas e 4 avisos, entre eles o de pesos).

**O que ainda não ficou bom.**
- A rosca martelo usa o mesmo núcleo com a pegada neutra (o cabo de frente para trás) e não tem o problema; não mudei.
