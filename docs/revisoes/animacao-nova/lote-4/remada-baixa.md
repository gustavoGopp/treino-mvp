# Lote 4 · Remada baixa com triângulo (`remada-baixa`)

De 15/11/2026. Primeira da família "puxar na polia" (núcleo novo `exercicios/polia-puxar.ts`, regras em `regras/polia-puxar.ts`). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-baixa.md`. Cartão: `src/conteudo/exercicios/remada-baixa.json`. Animação de hoje: `src/engine/exercicios/remada-baixa.ts`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-baixa.json`.
- Animação: `src/engine/novo/exercicios/remada-baixa.ts`; núcleo: `exercicios/polia-puxar.ts`.
- Peça de cena nova: o triângulo, `pecas-de-cena/triangulo-remada.ts`, com as medidas em `dados/objetos/triangulo-remada.json` (Rogue Grip Triangle: pegadas de 7 pol, 1,31 pol de diâmetro, 6 pol entre os centros, chapas de 0,25 pol; a profundidade da ponta é provisória).
- Regras novas: `polia-puxar-sentado-na-ponta-do-banco`, `polia-puxar-tronco-volta-a-vertical`, `polia-puxar-triangulo-no-abdomen`, `polia-puxar-cotovelos-atras-do-tronco`, `polia-puxar-cabo-quase-horizontal`, `polia-puxar-puxador-e-cabo-livres`, `polia-puxar-antebraco-fora-do-tronco`. Usadas como estão: `lombar-neutra`, `braco-estendido-no-comeco`, `cotovelo-rente-na-remada`, `escapulas-se-juntam`, `palmas-uma-para-a-outra`.
- Folha: `../prototipos/folha-remada-baixa.png`. Quadros grandes: `../quadros/remada-baixa.png`.

## Como a geometria foi montada

1. **Sentado na ponta do banco reto**, de frente para a coluna, um pé de cada lado do banco (a bola do pé a 22 cm do meio). A altura do quadril sai do ponto mais baixo do glúteo e das coxas no tampo (amassando 1 cm); o pé vai para a frente até o joelho dobrar 80° (`resolver1`). O centro do quadril fica 12 cm atrás da ponta do estofado.
2. **O tronco** é dado pela inclinação do peito (e não pela bacia): de 12° à frente no alongado (a ficha: "até ~10–15°") até a vertical no fim (a ficha: "o tronco volta à vertical"); a coluna não dobra. A bacia gira em volta do quadril, parada no banco.
3. **O caminho das mãos** é a linha do cabo: reta e horizontal, a 19 cm acima do centro do quadril (o triângulo na parte de cima do abdômen; a pegada de baixo passa a 5,5 cm das coxas). No fim, as mãos ficam a 1 cm da pele da barriga (medido na superfície do Boneco); no começo, onde os cotovelos dobram só 8°.
4. **A coluna de polia:** a roldana com o alto dela na altura das mãos (o cabo sai pelo alto, horizontal: "polia na altura do umbigo, o cabo quase horizontal"), 45 cm à frente da ponta do triângulo no alongado (hoje: ~45 cm). A pilha fica 2 cm levantada no alongado ("com os braços estendidos, a pilha ainda precisa ficar levantada") e sobe metade do curso do cabo.
5. **Os braços** vão às pegadas do triângulo (15,2 cm entre os centros), polegar para cima (pegada neutra). O cotovelo aponta para baixo e um pouco para fora no alongado e para trás e para fora no fim (o antebraço passa ao lado da cintura). As escápulas vão de 8° à frente (abertas) a 15° para trás (juntas).
6. **O triângulo** fica com a ponta para a roldana, as pegadas em pé; o cabo sai reto da roldana até o pino da ponta.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Sente na ponta do banco, pés firmes no chão, joelhos dobrados | consenso | glúteo 1,3 cm dentro do estofado (amassa), quadril 12 cm atrás da ponta; calcanhar e bola do pé no chão (0 cm), parados; joelho a 80° | sim |
| Alongado: tronco até ~10–15° à frente, coluna neutra | consenso | peito a 12° da vertical; lombar sem flexão (0°) | sim |
| Puxada: o tronco volta à vertical (sem virar o motor) | consenso | o peito termina a 0°, nunca passa para trás (0°); a bacia não sai do lugar (0 cm) | sim |
| Alongado: braços estendidos, escápulas abertas | consenso | cotovelos a 8°; clavícula 8° à frente | sim |
| Cotovelos para trás, rentes ao corpo | consenso | o braço se afasta no máximo 12,6° do lado do tronco | sim |
| Fim: triângulo no abdômen | consenso | as mãos a 1 cm da pele da barriga | sim |
| Fim: cotovelos atrás do tronco | consenso | o centro dos cotovelos 0,6 cm atrás da pele das costas na altura deles | sim (no limite; ver abaixo) |
| No fim as escápulas se juntam | consenso | a clavícula vai 17,2° para trás do começo ao fim | sim |
| Pegada neutra no triângulo | consenso | antebraço de 76,6° a 81,5° (90° = polegar para cima) | sim |
| Polia na altura do umbigo, cabo quase horizontal | consenso | o cabo fica a 0,1° da horizontal | sim |
| Com os braços estendidos, a pilha levantada | consenso | a pilha fica 2 cm acima do apoio no alongado e sobe 19,5 cm (o cabo anda 39,1 cm, relação 2:1) | sim |
| O cabo e o triângulo não atravessam o corpo, as pernas nem o banco | (desenho) | a no mínimo 5,5 cm da pele (coxa) e 17,2 cm do banco | sim |
| O antebraço passa ao lado da cintura | (desenho) | entra no máximo 0,3 cm na pele do tronco (encosta) | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática (homem): **0 falha, 2 avisos.** (1) As linhas de desenho da ficha de movimento (pescoço e cabeça, o banco, a largura dos pés, o joelho, a altura das mãos, a distância da coluna, para onde o cotovelo aponta, a elevação da escápula). (2) Músculos: de três quartos o principal quase não aparece (138 cm²); a vista padrão do modo Músculos fica a de trás (829 cm²).

**Mulher: 2 falhas** (a conferência do repositório roda só no homem; eu rodei as duas). Com os mesmos números, no fim o cotovelo dela fica 2,4 cm à frente da pele das costas e o antebraço entra 3 cm na cintura. Tentei: escápula mais para trás (20° e 25°: o cotovelo anda menos de 1 cm), mãos mais altas ou mais baixas (15 a 23 cm acima do quadril), cotovelo mais ou menos aberto. No corpo dela, com o antebraço mais curto em relação à profundidade do tronco, ou o cotovelo passa das costas ou o antebraço fica fora da cintura: as duas coisas juntas não fecham com as mãos encostando na barriga.

## Vistas

As vistas são **três quartos de frente (`quina`) e de trás (`posterior`)**, com a coluna de polia como cenário (pintada atrás do corpo e cortada pelo quadro). Tentei primeiro de lado com a coluna inteira: a coluna (2,39 m) manda no enquadramento e o corpo sentado ficava com menos da metade da altura do quadro (bem menor que no tríceps na corda). Como cenário, a coluna some de perfil (é o que `pecas.ts` faz com ela), por isso a vista de lado saiu. De três quartos se leem o tronco, os cotovelos indo para trás, o triângulo na mão e o cabo até a roldana; de trás, as escápulas se juntando e o erro de encolher.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balançar o tronco | três quartos | o peito vai de 30° à frente no alongado a 16° para trás no fim (hoje: 34° e −18°); as mãos seguem a linha do cabo e terminam na barriga |
| Arredondar a coluna no alongamento (quadro parado no começo) | três quartos | no alongado a lombar curva 14° e a torácica 24°, o pescoço estende 10°; as mãos vão mais longe (cotovelos ainda a 8°); a curva se desfaz até o fim |
| Encolher os ombros no fim | de trás | no fim as clavículas sobem 14° |

## Correções já feitas que esta animação respeita

- Coluna de polia e cabo (`correcoes-ja-feitas.md`, torre / cabo de polia): o cabo é reto da roldana ao puxador e a pilha sobe; a câmera não depende mais da torre (ela é cenário).
- A polia na altura do umbigo, com o cabo quase horizontal (o `note` do cartão).

## O que não ficou bom

- **No corpo da mulher**, os cotovelos não passam das costas no fim e o antebraço entra 3 cm na cintura (acima). No homem os dois passam, mas no limite (0,6 cm atrás das costas; o antebraço encosta, 0,3 cm). Quadro: `quadros/remada-baixa.png`, `quina:tec:f1`.
- **Sem a vista de lado.** O perfil é o jeito clássico de mostrar a remada; aqui ele custava o tamanho do corpo (ou a coluna sumia). Risco de o Gustavo preferir o perfil com o corpo menor.
- **A trajetória** mostra só o cotovelo: com "mãos" junto, um dos dois nomes caía em cima do banco.
- **O triângulo** é o da Rogue (chapas em cima e embaixo, pegadas em pé), e não o quadro em V do cartão de equipamento de hoje: no do cartão a barra de baixo passaria entre os punhos. A profundidade dele (15,9 cm, da linha das pegadas à ponta) é provisória.
