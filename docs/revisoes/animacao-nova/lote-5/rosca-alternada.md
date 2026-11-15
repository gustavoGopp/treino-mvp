# Lote 5 · Rosca alternada com halteres (`rosca-alternada`)

De 15/11/2026. Primeira animação da família das roscas no motor novo. Em pé, um halter em cada mão, palmas para a frente, um braço de cada vez, o cotovelo parado ao lado do tronco. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-alternada.md` (aprovada em 01/11/2026).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-alternada.json`.
- Animação: `src/engine/novo/exercicios/rosca-alternada.ts`, sobre o núcleo comum da família (`exercicios/dobrar-o-cotovelo.ts`), que a martelo, a com kettlebell e a inclinada também usam.
- Regras novas medidas: `src/engine/novo/regras/roscas.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-rosca-alternada.png`. Quadros grandes: `../quadros/rosca-alternada.png`.

## Como o núcleo resolve cada quadro

- **O corpo:** em pé, joelhos a 5°, pés na largura do quadril. O quadril sai do equilíbrio (o centro de massa do corpo com os dois halteres embaixo sobre o meio do pé), pelo núcleo dos stiffs (`dobrarOQuadril`, sem dobrar), e fica **parado** o ciclo todo: o braço que sobe não move o tronco. O centro de massa anda para a frente quando o halter sobe, mas fica dentro do apoio dos pés.
- **O braço:** o úmero tem uma direção fixa no tórax (aberto 17° para o lado, 0° à frente); o antebraço dobra no plano do braço (o cotovelo é uma dobradiça). O polegar fica 64° para fora da posição neutra (palma para a frente) e o cabo do halter atravessa a palma na direção do polegar.
- **Um braço de cada vez:** o parâmetro do movimento vai de 0 a 1 no braço direito e de 2 a 3 no esquerdo (0 e 2 são a mesma pose, os dois embaixo). Assim as fases da ficha de movimento são as do app: embaixo, direito sobe, topo, direito desce, esquerdo sobe, topo, esquerdo desce.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril | consenso | pés a 9 cm do meio, dedos para a frente; não saem do lugar (0 cm) | sim |
| Halteres ao lado do corpo, palmas para a frente | consenso | antebraço supinado 64° (90° = palma toda para a frente; média da população 87,5°); o halter fica do lado de fora da coxa | sim (ver abaixo) |
| Um braço de cada vez | consenso | enquanto o direito sobe, a mão esquerda não anda (0 cm); depois o esquerdo faz o mesmo | sim |
| O cotovelo fica parado ao lado do tronco; só o antebraço sobe | consenso | o cotovelo anda 0 cm enquanto dobra de 8° a 132°; o braço fica 0° à frente da linha do tronco e 17° aberto para o lado | sim |
| Tronco parado, sem jogar o corpo para trás | consenso | a base do pescoço anda 0 cm; o quadril dobra 2,3° (em pé) | sim |
| Embaixo: braço estendido | consenso | o cotovelo dobra 8° (sem travar) | sim |
| Topo: halter perto do ombro, cotovelo ainda ao lado do tronco | consenso (app) | o centro da pegada fica a 26,3 cm do centro do ombro, 8 cm abaixo dele e à frente; o cotovelo dobra 132° (a média da população é 148°) | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s e 2,2 s, com pausa de 0,4 s em cima e 0,5 s embaixo; salto de velocidade de 6,1% (limite 15%) | sim |
| O halter não atravessa o corpo (desenho) | — | a menor folga entre o halter e a pele, no ciclo inteiro e nos três erros, é 0,4 cm (do antebraço, junto ao punho da mão que segura); a cabeça de dentro do halter fica à frente da coxa | sim |
| Equilíbrio | — | o centro de massa (corpo + 2 × 11,3 kg) fica sempre dentro do apoio dos pés | sim |

**Por que o braço abre 17° e a palma fica a 64°:** o halter da tabela de objetos tem 33 cm (cabeças de 13,7 cm). Com a palma toda para a frente e o braço colado ao corpo, a cabeça de dentro do halter entra 3 a 4 cm na coxa (medido). Testei combinações de abertura do braço (8° a 17°), braço à frente (0° a 12°), cotovelo embaixo (6° a 15°) e supinação (50° a 75°): só com o braço aberto 17° e a palma um pouco virada para dentro (64°) o halter não atravessa a coxa em nenhum quadro, nem quando começa a subir (a cabeça de dentro passa rente à frente da coxa). Levar o cotovelo à frente também resolvia, mas contradiz "cotovelo parado ao lado do tronco". É uma pessoa com os braços um pouco afastados do corpo, como acontece com um halter grande; de lado não aparece. A ficha não dá número para nenhuma das duas medidas (selo `desenho`).

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-alternada`): **0 falha, 3 avisos**: as linhas da ficha de movimento que são escolha de desenho (joelho, abertura do braço, supinação, peso do halter); o antebraço em "só ajuda" (listrado), que é a correção de 04/11 das roscas e não está na lista do conteúdo; e a vista de lado, que não serve ao modo Músculos (ver abaixo).

## As vistas

- **De lado** (padrão da técnica): mostra o cotovelo parado, o tronco parado e o antebraço subindo. O braço esquerdo, do outro lado, fica quase todo atrás do corpo quando sobe.
- **De frente**: mostra a alternância (um halter em cima, o outro embaixo) e o bíceps. É a vista padrão do modo Músculos, medida: de frente 192 cm² do bíceps; de três quartos (`quina`) 124 cm²; de lado 53 cm² (não serve).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Balançar o tronco (de lado) | enquanto o halter sobe, o peito vai 12° para trás e a lombar arqueia 6°; a base do pescoço vai 10,5 cm para trás; os pés não saem do lugar e o centro de massa fica no apoio |
| Cotovelo vai para a frente (de lado) | o braço sobe 35° à frente do tronco enquanto o antebraço dobra 115°: o cotovelo anda 16 cm para a frente e o halter chega à altura do queixo, à frente do rosto |
| Não estender o braço (de lado) | embaixo, o cotovelo para dobrado 55° (os dois braços); o halter fica 13 cm acima de onde fica no certo |

## O equipamento

- **Halteres:** o sextavado de 25 lb da tabela de objetos (33 cm, cabeças de 13,7 cm), no gerador realista, com o cabo atravessando a palma; a mão é pintada por cima do cabo.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Antebraço "só ajuda" (listrado) nas roscas (04/11, `SO_AJUDA`). Respeitada.
- A vista de lado como principal nas roscas (auditoria do acabamento, 04/11). Respeitada na técnica; no modo Músculos a vista de frente mostra mais o bíceps (medido) e vira a padrão.
- Aprovação sem correção de 01/11 (lote 1): o ritmo, um braço de cada vez e os três erros seguem a animação aprovada.

## Músculos

Bíceps (principal) e antebraço (só ajuda, listrado). A ficha da técnica lista o antebraço como secundário; segui a correção de 04/11 (`SO_AJUDA`), e a biblioteca conta só o bíceps. O braquial não existe como grupo no desenho (`dados/musculos.json`).

## O que não ficou bom

- **Os braços ficam abertos 17°** para o halter de 33 cm não atravessar a coxa (ver acima). De frente, embaixo, os halteres ficam bem do lado de fora das coxas. O texto do app diz "cotovelos encostados ao lado do tronco"; com esse halter e a palma para a frente, não cabe. Se o Gustavo preferir os braços colados, a saída é começar com a palma mais virada para dentro (girando na subida) ou um halter menor; nenhuma das duas é o que a ficha pede hoje.
- **A palma fica a 64° da neutra**, não a 90°: de frente lê-se "palma para a frente", mas não toda.
