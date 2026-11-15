# Lote 7 · Extensão de joelho sentado, com caneleira (`extensao-joelho-caneleira`)

De 15/11/2026. Sentado na cadeira firme encostada na parede, costas retas, as mãos nas bordas dos lados do assento, as coxas apoiadas; o pé esquerdo chapado no chão; a perna direita, com a caneleira de 2 lb no tornozelo, pende com o joelho a 88° e o pé fora do chão. Só a canela sobe, em 1 s, até o joelho quase esticar (10°); segura 1 s; desce em 2 s. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/extensao-joelho-caneleira.md`. Ficha de movimento: `src/engine/novo/dados/movimentos/extensao-joelho-caneleira.json`.
- Animação: `src/engine/novo/exercicios/extensao-joelho-caneleira.ts`, sobre o núcleo sentado `quadril-sentado-na-cadeira.ts` (o da `abducao-mini-band`). A coxa direita fica na direção da coxa com o pé no chão, posta na horizontal (deitada no assento até a borda); a canela gira em volta do eixo do joelho.
- Equipamento: a cadeira firme e a parede (`pecas-de-cena/cadeira.ts`, como no búlgaro com o peso do corpo: a montagem segura da ficha), a cadeira pintada atrás do corpo; a caneleira (`pecas-de-cena/caneleira.ts`).
- Regras novas (`regras/extensao-joelho-caneleira.ts`, com o nome do exercício nos ids para não bater com a extensão com elástico): `extensao-joelho-caneleira-coxa-parada`, `extensao-joelho-caneleira-quase-esticado`; e `quadril-sentado-reto-na-cadeira` e `quadril-caneleira-presa-no-tornozelo`, da família.
- Folha: `../prototipos/folha-extensao-joelho-caneleira.png`. Quadros: `../quadros/extensao-joelho-caneleira.png`.

## Vistas

`lateral` (padrão: a perna direita de perfil, do lado de quem olha; o quadríceps à vista, 357 cm²) e `quina` (a cadeira, a caneleira e a perna de três quartos). De frente, a perna vem na direção de quem olha e o quadríceps some (0 cm²).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Caneleira bem presa no tornozelo; cadeira firme, sem rodinhas, encostada na parede | consenso | a faixa a 7,4 cm do centro do tornozelo o ciclo inteiro; a cadeira de madeira (assento a 45,1 cm) com a parede atrás do encosto | sim |
| Sentado, costas retas, mãos na lateral do assento; coxas apoiadas | consenso | o glúteo e a coxa a −1 cm do tampo (amassam); o quadril a 24 cm da borda; o peito a 1,3° da vertical, parado (0 cm); as mãos a 0,3 cm das bordas do assento | sim |
| Embaixo, joelho bem dobrado, pé fora do chão | consenso (app) | joelho a 88°; o pé a 4,3 cm do chão | sim |
| Estende o joelho até quase esticar, sem tranco; a coxa não sai do assento | consenso | joelho a 10° em cima; a coxa gira 0° e o joelho anda 0 cm | sim |
| ~1 s em cima, onde a caneleira pesa mais | consenso | 1 s parado | sim |
| Descida ~2 s, controlada, até o joelho dobrar bem | consenso | 2 s, até 88° | sim |

Conferência automática: **0 falha, 1 aviso** (as linhas de desenho da ficha de movimento). Atenção: o item de ritmo da conferência sai "sem movimento", porque ela acompanha o quadril, a cabeça, as mãos, o cotovelo e o joelho, e aqui só a canela e o pé andam. A suavidade vem do perfil de mínimo solavanco das fases, como nas outras.

## Erros

- **Chutar a perna** (no meio da subida): a perna já está quase em cima, jogada por impulso.
- **Tirar a coxa do assento** (em cima): a coxa sobe 12° do assento e o tronco vai para trás (lombar 6°, costas de cima 6°, até perto do encosto). Com 10° e 12°, como no guia de hoje, as costas atravessavam o encosto da cadeira.
- **Deixar a perna cair** (no meio da descida): a perna já caiu quase até embaixo.

## Músculos

`quadriceps:R`, sem secundário. O desenho tem o quadríceps inteiro (não separa o reto femoral, e a ficha não promete o reto femoral).

## Correções já feitas, respeitadas

- 04/11: a caneleira acompanha a canela. (A caneleira vermelha na figura do erro não foi mantida: as peças de cena do motor novo não têm cor de erro.)

## O que não ficou bom

- **O pé fica só 4,3 cm acima do chão embaixo**, com o joelho a 88°. A cadeira da tabela tem 45,1 cm de assento; com o joelho mais dobrado, o pé encostava no chão (a ficha manda, sem cadeira alta o bastante, usar a beira da cama ou do sofá). Pus o pé neutro (sem flexão plantar) para não encostar.
- **O texto dos rótulos e do nome do erro "Tirar a coxa do assento" fica por cima da parede** (que é só cenário), do lado esquerdo do quadro: do lado direito, o fio cruzava a perna esticada.
- **De frente (vista que não está na lista), a caneleira aparece por cima do tronco**: ela vai para a frente na pintura de propósito (envolve a canela); nas duas vistas da animação isso não acontece.
