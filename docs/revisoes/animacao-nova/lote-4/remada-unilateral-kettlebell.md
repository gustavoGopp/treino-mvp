# Lote 4 · Remada unilateral com kettlebell (`remada-unilateral-kettlebell`)

De 15/11/2026. Quarta da família das remadas com peso livre: o mesmo corpo parado da remada sem banco (`exercicios/remada-sem-banco.ts`) e o mesmo braço que puxa (`exercicios/remada.ts`), com o kettlebell pendurado pela alça no lugar do halter (a ficha: "só entra com animação própria, com o kettlebell desenhado, e não como halter"). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-kettlebell.md`. Cartão: `src/conteudo/exercicios/remada-unilateral-kettlebell.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral-kettlebell.ts`.
- O kettlebell na mão é o de `kettlebellNaMao` (`exercicios/dobrar-o-cotovelo.ts`, importado, sem mudança): a barra da alça atravessa a palma e a bola pende embaixo; o desenho é o `formaDoKettlebell` de `equipamento.ts`.
- Folha: `../prototipos/folha-remada-unilateral-kettlebell.png`. Quadros grandes: `../quadros/remada-unilateral-kettlebell.png`.

## Como a geometria foi montada

A mesma da remada unilateral sem banco (ver `remada-unilateral-sem-banco.md`): peito a 55° da vertical, pé esquerdo à frente (joelho a 30°), pé do lado do kettlebell atrás (joelho a 8°, calcanhar 15° levantado), 66 cm de um tornozelo ao outro, mão livre espalmada na coxa da frente com o cotovelo de apoio a 12°. A mão direita segura a alça com a palma virada para o corpo (a alça vai de frente para trás) e a bola pende embaixo dela.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés afastados, um à frente; o do lado do kettlebell atrás | consenso | o tornozelo direito fica 66 cm atrás do esquerdo; os pés parados (0 cm) | sim |
| Mão livre firme na coxa da frente | consenso | a mão fica a 0,2 cm da pele da coxa, a 88% do caminho do quadril ao joelho, parada | sim |
| Mão na alça, palma virada para o corpo; o kettlebell pendurado embaixo do ombro | consenso | pronação de 90° o ciclo todo; no começo o cotovelo dobra 3° e a bola pende embaixo da mão | sim |
| Tronco inclinado à frente, costas retas, sem girar | consenso | peito a 56,3° da vertical; lombar 0°; tronco parado (0 cm, 0°) | sim |
| Cotovelo para trás, em direção ao quadril | consenso | o braço se afasta no máximo 16° do lado do tronco; no fim, o cotovelo fica 5,4 cm além da linha das costas | sim |
| O kettlebell termina ao lado do quadril | consenso | a mão a 87% do caminho do ombro ao quadril | sim |
| O kettlebell não atravessa o corpo | (desenho) | a bola fica a no mínimo 6 cm da pele (homem) e 3,2 cm (mulher) | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática (homem e mulher): **0 falha, 2 avisos**, os mesmos da remada sem banco: dorsiflexão do tornozelo de trás de 17,8° (mulher 19,1°; média 14,8°, máximo observado 48°) e as linhas de desenho da ficha de movimento.

Músculos: dorsal e meio das costas do lado direito em vermelho; ombro de trás e bíceps em laranja. Vista padrão do modo Músculos: de lado (176 cm²), pela mesma razão da remada sem banco (a segunda vista é a de três quartos, de frente, a única em que a mão livre na coxa aparece; de três quartos, de trás, mostraria 299 cm²).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | três quartos, de trás | a coluna gira 18° no fim; a mão livre continua na coxa |
| Arredondar as costas | lado | lombar +22°, torácica +22°; a mão livre continua na coxa |
| Não estender o braço (quadro parado no começo) | lado | a volta para a 45% do caminho |

Nos erros, a bola fica a no mínimo 1,5 cm (homem) e 0,5 cm (mulher) da pele.

## Correções já feitas que esta animação respeita

- Decisão de 04/11: o kettlebell desenhado, e não um halter.
- O kettlebell pende na vertical; o peso aparece.

## O que não ficou bom

- **Na vista de três quartos, de frente, no fim da puxada, a coxa de trás tapa metade da bola** (`quina:tec:f1` e o tema escuro): a bola fica 6 cm ao lado da coxa, mas por esse ângulo a coxa passa na frente dela, e a bola cortada pode parecer atravessada. Na vista de lado ela aparece inteira. Não troquei a vista porque é a única em que a mão livre na coxa aparece.
- A dica "cotovelo para o quadril" ficou de fora da vista de lado (o fio atravessaria as costas); a trajetória mostra o mesmo.
