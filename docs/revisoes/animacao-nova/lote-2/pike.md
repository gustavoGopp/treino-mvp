# Lote 2 · Flexão com o quadril alto (`pike`)

De 15/11/2026. Mãos espalmadas e pontas dos pés presas no chão, como na flexão aprovada; o quadril bem alto, o corpo num V de cabeça para baixo. **Ainda não foi vista pelo Gustavo.** Não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/pike.md`. Cartão: `src/conteudo/exercicios/pike.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/pike.json`.
- Animação: `src/engine/novo/exercicios/pike.ts`, sobre o núcleo da família (`exercicios/apoio-no-chao.ts`: pés na ponta com o calcanhar parado, mão espalmada num plano, ponto mais baixo de uma parte do corpo). Não usa nem altera `flexao.ts`; repete as ideias dela (mão plantada pelo punho e pelos dedos, os mesmos 12 cm além do ombro).
- Regras medidas novas: `src/engine/novo/regras/apoio-no-chao.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-pike.png`. Quadros grandes: `../quadros/pike.png`.

## Como a pose é montada

Dois ângulos descrevem o corpo: o das pernas (do tornozelo ao quadril, acima do chão) e o do tronco (abaixo da horizontal). O tornozelo fica parado (o calcanhar levantado 30°, a bola do pé presa), e as pernas ficam estendidas (joelho a 5°). Os braços alcançam as mãos paradas.

- **Em cima**, os dois ângulos saem do cotovelo quase estendido (10°) e da flexão do quadril do V (105°, a de hoje).
- **Embaixo**, saem de onde a cabeça chega: o ponto mais baixo dela a 5 cm do chão e na linha das mãos.
- No meio, os dois ângulos andam juntos, com o ritmo de mínimo solavanco do motor.

Nada foi ajustado a olho: os quatro números (cotovelo, quadril, altura e linha da cabeça) são linhas da ficha, e a conferência mede o resultado.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mãos no chão um pouco mais abertas que os ombros | consenso | centro da mão a 30,2 cm do meio do corpo (o centro do ombro a 18,4), como na flexão aprovada; as mãos não saem do lugar (0 cm) | sim |
| Quadril bem alto, corpo num V de cabeça para baixo | consenso | em cima, o quadril a 87 cm do chão e dobrado 105°; o tronco 41° abaixo da horizontal | sim |
| Pernas estendidas, na ponta dos pés | consenso | joelho a 5° o ciclo inteiro; bola e ponta do pé paradas (0 cm), calcanhar levantado e parado | sim |
| Descida em ~2 s: os cotovelos dobram para trás | consenso | 2,0 s; o cotovelo vai de 10° a 95°; embaixo, o plano do braço abre 52° do plano do meio do corpo (a meio caminho), com o cotovelo do lado dos pés | sim |
| A cabeça desce entre as mãos, até a linha delas, perto do chão | consenso | o ponto mais baixo da cabeça desce de 23,6 cm para 5,0 cm do chão, 1,7 cm à frente da linha do centro das palmas e no meio delas (as mãos a ±30 cm); no caminho, nunca abaixo de 5 cm | sim |
| O quadril continua alto e vai um pouco para a frente, girando sobre os pés com as pernas estendidas | consenso | o quadril desce de 87 para 75 cm e anda 17 cm para a frente; a flexão do quadril vai de 105° a 99°; o quadril fica no mínimo 31 cm acima dos ombros, e os ombros no mínimo 8,4 cm atrás do centro das palmas | sim |
| Subida em ~1 s, sem baixar o quadril | consenso | 1,0 s, pelo mesmo caminho | sim |
| Músculos: frente do ombro principal; lateral do ombro e tríceps secundários | consenso | `deltAnt` principal, `deltLat` e `triceps` secundários. A vista padrão do modo Músculos é a de frente (112 cm² do principal visíveis, contra 51 de lado) | sim |

**Ombro acima da cabeça.** A elevação do braço em relação ao tronco vai de 141° (em cima) a 101° (embaixo), dentro da média (170°). A clavícula sobe de 14,7° a 16,5° (o ritmo escapuloumeral automático do motor); nenhuma elevação ou protração extra da escápula foi pedida. O punho dobra no máximo 69,7° (média 70°, sem aviso); o tornozelo vai de 0,7° de flexão plantar a 13,7° de dorsiflexão.

**Pescoço e cabeça.** A cabeça fica na linha do tronco (`pescoco.flexao` = 0, escolha de desenho: a ficha não diz para onde olhar). Ela não atravessa o chão (mínimo 5 cm) nem as mãos (fica no meio delas, 30 cm de cada lado).

Conferência automática: **0 falha, 1 aviso.** O aviso é o das linhas que são escolha de desenho: `maos.aFrenteDosPes` (94 cm, de hoje), `calcanhar.sobe` (30°, de hoje), `quadril.cima` (105°, de hoje), `cabeca.aoChao` (5 cm) e `pescoco.flexao` (0°). O ritmo fica suave (salto de 12,2%, limite 15%).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Quadril desce e vira flexão | de lado | embaixo, o quadril fica a 63 cm (o certo: 75) e dobra só 73° (o certo: 99°); os ombros passam 9,7 cm à frente do centro das palmas (o certo: 8,4 cm atrás); a cabeça para a 5 cm do chão, à frente das mãos |
| Cotovelos abertos para os lados | de frente | o plano do braço abre 90° (o certo: 52°); o cotovelo vai a 45 cm do meio do corpo (o certo: 41) |
| Descer pouco | de lado | o cotovelo para em 63° (o certo: 95°) e a cabeça a 16 cm do chão (o certo: 5) |

## O equipamento

Nenhum: só o chão. Nenhuma peça nova.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- "Aprovada com as duas vistas (a de frente fica porque mostra o erro de abrir os cotovelos)": as mesmas duas vistas, `lateral` e `frontal`, e o erro `cot` abre de frente.
- "As mãos ficam plantadas" (antes subiam 5 cm e abriam 7 cm): aqui elas não saem do lugar (0 cm medidos no punho, que é o que a conferência acompanha).

## O que não ficou bom

- **De frente, no estilo cinza, a cabeça quase não se distingue:** sem o cabelo, ela vira uma forma clara no meio das costas, perto do chão. Na cor de pele (cabelo escuro) se lê bem. O rótulo "cabeça desce entre as mãos" aponta para ela.
- **O cotovelo dobra menos que hoje** (95° contra 132° hoje): aqui a descida para quando a cabeça chega a 5 cm do chão, na linha das mãos, como a ficha pede; hoje a cabeça ia mais para baixo e para a frente. Vale olhar se a descida parece curta.
- **O V está mais fechado que o de hoje:** as mãos ficam a 94 cm da bola do pé (escolha de desenho tirada de hoje), mas o tronco do Boneco novo é mais comprido; o corpo fica um pouco mais compacto que na folha de hoje.
- **No erro "quadril desce", o ombro passa à frente das mãos com o cotovelo bem dobrado (97°):** lê-se como flexão, mas a pose é uma escolha de desenho (8 cm à frente, a ficha não dá número).
- O texto de hoje "a cabeça desce até a linha das mãos" virou o rótulo curto do cartão ("cabeça entre as mãos").
