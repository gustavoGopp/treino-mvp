# Lote 2 · Flexão com o quadril alto (`pike`)

De 15/11/2026; refeita na rodada de correção do mesmo dia (seção "Rodada de correção" no fim). Mãos espalmadas e pontas dos pés presas no chão, como na flexão aprovada; o quadril bem alto, o corpo num V de cabeça para baixo. **Ainda não foi vista pelo Gustavo.** Não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/pike.md`. Cartão: `src/conteudo/exercicios/pike.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/pike.json`.
- Animação: `src/engine/novo/exercicios/pike.ts`, sobre o núcleo da família (`exercicios/apoio-no-chao.ts`: pés na ponta com o calcanhar parado, mão espalmada num plano, ponto mais baixo de uma parte do corpo). Não usa nem altera `flexao.ts`; repete as ideias dela (mão plantada pelo punho e pelos dedos, os mesmos 12 cm além do ombro).
- Regras medidas novas: `src/engine/novo/regras/apoio-no-chao.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-pike.png`. Quadros grandes: `../quadros/pike.png`.

## Como a pose é montada

Dois ângulos descrevem o corpo: o das pernas (do tornozelo ao quadril, acima do chão) e o do tronco (abaixo da horizontal). O tornozelo fica parado (o calcanhar levantado 35°, a bola do pé presa), e as pernas ficam estendidas (joelho a 5°). Os braços alcançam as mãos paradas.

- **Em cima**, os dois ângulos saem do cotovelo quase estendido (10°) e da flexão do quadril do V (105°, a de hoje).
- **Embaixo**, saem de onde a cabeça chega: o ponto mais baixo dela a 5 cm do chão e na linha das mãos, 8 cm à frente do centro das palmas (entre o punho e a ponta dos dedos).
- No meio, os dois ângulos andam juntos, com o ritmo de mínimo solavanco do motor.

Nada foi ajustado a olho: os quatro números (cotovelo, quadril, altura e linha da cabeça) são linhas da ficha, e a conferência mede o resultado.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mãos no chão um pouco mais abertas que os ombros | consenso | centro da mão a 30,2 cm do meio do corpo (o centro do ombro a 18,4), como na flexão aprovada; as mãos não saem do lugar (0 cm) | sim |
| Quadril bem alto, corpo num V de cabeça para baixo | consenso | em cima, o quadril a 87,5 cm do chão e dobrado 105° | sim |
| Pernas estendidas, na ponta dos pés | consenso | joelho a 5° o ciclo inteiro; bola e ponta do pé paradas (0 cm), calcanhar levantado e parado | sim |
| Descida em ~2 s: os cotovelos dobram para trás | consenso | 2,0 s; o cotovelo vai de 10° a 97,5°; embaixo, o plano do braço abre 48° do plano do meio do corpo (a meio caminho), com o cotovelo do lado dos pés | sim |
| A cabeça desce entre as mãos, até a linha delas, perto do chão | consenso | o ponto mais baixo da cabeça desce de 23,9 cm para 5,0 cm do chão; embaixo fica 13,2 cm à frente da linha dos punhos (a ponta dos dedos fica a 19,2) e no meio das mãos (a ±30 cm); no caminho, nunca abaixo de 5 cm | sim |
| O quadril continua alto e vai um pouco para a frente, girando sobre os pés com as pernas estendidas | consenso | o quadril desce de 87,5 para 72 cm e anda 21 cm para a frente; a flexão do quadril vai de 105° a 91°; o quadril fica no mínimo 31 cm acima dos ombros, e os ombros no mínimo 1,2 cm atrás do centro das palmas | sim |
| Subida em ~1 s, sem baixar o quadril | consenso | 1,0 s, pelo mesmo caminho | sim |
| Músculos: frente do ombro principal; lateral do ombro e tríceps secundários | consenso | `deltAnt` principal, `deltLat` e `triceps` secundários. A vista padrão do modo Músculos é a `quina` (60 cm² do principal visíveis, contra 52 de lado) | sim |

**Ombro acima da cabeça.** A elevação do braço em relação ao tronco vai de 140° (em cima) a 88° (embaixo), dentro da média (170°). A clavícula sobe de 14,1° a 16,5° (o ritmo escapuloumeral automático do motor); nenhuma elevação ou protração extra da escápula foi pedida. O punho dobra no máximo 71° (média 70°, máximo 95°: aviso); o tornozelo vai de 5,5° de flexão plantar a 12,6° de dorsiflexão.

**Pescoço e cabeça.** A cabeça fica na linha do tronco (`pescoco.flexao` = 0, escolha de desenho: a ficha não diz para onde olhar). Ela não atravessa o chão (mínimo 5 cm; o rosto fica acima disso) nem as mãos (fica no meio delas, 30 cm de cada lado).

Conferência automática: **0 falha, 2 avisos.** A extensão do punho chega a 71° em cima (1° acima da média). As linhas que são escolha de desenho: `maos.aFrenteDosPes` (94 cm, de hoje), `calcanhar.sobe` (35°), `quadril.cima` (105°, de hoje), `cabeca.aoChao` (5 cm), `cabeca.naLinhaDasMaos` (8 cm) e `pescoco.flexao` (0°). O ritmo fica suave (salto de 12,9%, limite 15%).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Quadril desce e vira flexão | de lado | embaixo, o quadril fica a 64 cm (o certo: 72) e dobra só 75° (o certo: 91°); os ombros passam 9,7 cm à frente do centro das palmas (o certo: 1,2 cm atrás); a cabeça para a 5 cm do chão, à frente das mãos |
| Cotovelos abertos para os lados | `quina` | o plano do braço abre 87° (o certo: 48°); o cotovelo vai a 46 cm do meio do corpo (o certo: 40) |
| Descer pouco | de lado | o cotovelo para em 64° (o certo: 97,5°) e a cabeça a 16 cm do chão (o certo: 5) |

## O equipamento

Nenhum: só o chão. Nenhuma peça nova.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- "Aprovada com as duas vistas (a de frente fica porque mostra o erro de abrir os cotovelos)": no motor novo a vista de frente virou um borrão (as costas e o quadril tapam a cabeça). A segunda vista passou a ser a `quina`, que mostra a cabeça descendo entre as mãos e os cotovelos; o erro `cot` abre nela.
- "As mãos ficam plantadas" (antes subiam 5 cm e abriam 7 cm): aqui elas não saem do lugar (0 cm medidos no punho, que é o que a conferência acompanha).

## O que não ficou bom

- **A descida é mais curta que a de hoje** (cotovelo a 97,5° contra 132°), e não há como ir mais fundo dentro da ficha. O que limita é a cabeça chegar ao chão: com o ponto mais baixo dela a 5 cm, o cotovelo fica entre 93° e 108° qualquer que seja a distância das mãos aos pés (80 a 110 cm) ou o lugar da cabeça (0 a 25 cm à frente das palmas). Mesmo com a cabeça encostando no chão (0 cm), o cotovelo chegaria a 107°. Os 132° de hoje não cabem nas medidas do Boneco novo sem a cabeça atravessar o chão.

## Rodada de correção (15/11/2026)

O que mudou:

- **Segunda vista.** Testei `frontal`, `quina`, `quinaTras`, `cima` e `posterior` nos três instantes. Fiquei com a `quina`, onde se vê a cabeça descer entre as mãos e os cotovelos irem para trás. Na `frontal` e na `posterior`, as costas e o quadril tapam a cabeça. Na `quinaTras`, as pernas ficam na frente. Na `cima`, só se veem as costas. O erro "cotovelos abertos" passou para a `quina`. Na `cima` ele se lê ainda melhor, mas ficaria fora das duas vistas do exercício.
- **Cabeça e mãos embaixo.** O ponto mais baixo da cabeça passou do centro das palmas (0 cm) para 8 cm à frente dele, entre o punho e a ponta dos dedos. De lado, ela não se embola mais com a mão de perto e o antebraço. A regra `cabeca-desce-entre-as-maos` passou a pedir a cabeça entre o punho e a ponta dos dedos e no mínimo a 3 cm do chão (antes: a até 3 cm do centro das palmas).
- **Calcanhar.** Subiu de 30° para 35°, porque a dorsiflexão do tornozelo embaixo passava da média (18,6°) com a cabeça mais à frente.
- **Profundidade.** Veja "O que não ficou bom": o número que limita é a altura da cabeça.
- **Rótulos.** Dois de lado ("quadril alto", "cabeça entre as mãos") e um na `quina` ("cabeça desce entre as mãos"), em minúsculas, sem ponto e fora do corpo.
- **Nove itens da seção 8.** Olhei quadro a quadro, com a cor de pele e o tema escuro nas duas vistas (`../quadros/pike.png`).
