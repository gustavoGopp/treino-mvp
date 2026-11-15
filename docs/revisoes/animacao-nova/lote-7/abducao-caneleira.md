# Lote 7 · Abdução de quadril deitado de lado, com caneleira (`abducao-caneleira`)

De 15/11/2026. A mesma pose e o mesmo movimento da `abducao-deitado` (ver `abducao-deitado.md`: o corpo deitado de lado, as vistas, a cabeça no braço, os erros), com uma caneleira de 2 lb presa no tornozelo da perna de cima. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-caneleira.md`. Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-caneleira.json` (as linhas da `abducao-deitado`, mais `caneleira.massa`).
- Animação: `src/engine/novo/exercicios/abducao-caneleira.ts`, sobre os núcleos `quadril-deitado-de-lado.ts` e `quadril-abrir-deitado.ts`.
- **Peça nova: a caneleira** (`pecas-de-cena/caneleira.ts`, medidas em `dados/objetos/caneleira.json`). Medidas de fabricante (a Cuff Original de 2 lb, página pública da Global Industrial, lida em 15/11): 30,5 cm de comprimento aberta, 10,8 cm de largura, 1,27 cm de espessura, 0,91 kg. O desenho parte do cartão de hoje (`scripts/desenhos-equipamento/realista/itens.mjs`, `caneleiras`): a faixa grafite acolchoada, fechada em volta da canela 2 cm acima do centro do tornozelo (logo acima dos maléolos), com o raio da canela medido na superfície do Boneco mais a espessura da faixa, e a tira de velcro na cor de ação dando a volta no meio. Ela acompanha a canela e entra nas cargas do quadro (0,91 kg no centro da faixa).
- Regra nova: `quadril-caneleira-presa-no-tornozelo` (o centro da faixa não sai do lugar na canela).
- Folha: `../prototipos/folha-abducao-caneleira.png`. Quadros: `../quadros/abducao-caneleira.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Caneleira bem presa no tornozelo da perna de cima | consenso | a faixa de 10,8 cm, com o centro a 7,4 cm do centro do tornozelo ao longo da canela, o ciclo inteiro (não escorrega) | sim |
| Deitado de lado, cabeça no braço de baixo | consenso | igual à `abducao-deitado`: bacia no chão (0 cm), peito a 1,5 cm, cabeça a 0,5 cm do braço, ponto mais baixo −0,3 cm | sim |
| Perna de baixo dobrada; perna de cima estendida, um pouco atrás | consenso | coxa de baixo 45°, joelho 90°; perna de cima reta, 10° atrás | sim |
| Quadril empilhado; dedos para a frente | consenso | eixo dos quadris a 0° da vertical, bacia parada; dedos a 20° da frente | sim |
| Sobe até onde o quadril não rola nem a cintura dobra; não precisa subir muito | consenso | de −8° a 35° | sim |
| ~1 s subindo, 1 s parado, ~2 s descendo | consenso | 1,1 s, 1 s, 2 s; maior salto de velocidade 4,7% do pico | sim |
| Um colchonete | consenso | **não desenhado** (ver abaixo) | não |

Conferência automática: **0 falha, 1 aviso** (as linhas de desenho da ficha de movimento, agora com a massa da caneleira).

## Erros

Os mesmos três da `abducao-deitado` (rolar o quadril, de três quartos; perna para a frente, de cima; alto demais com tranco, de frente). A caneleira vai com a perna errada. A correção de 04/11 pedia a caneleira vermelha na figura do erro; no motor novo o erro pinta só o corpo, e a caneleira fica na cor dela (as peças de cena não têm cor de erro).

## Músculos

Como na `abducao-deitado`: `gluteo:R`, que no desenho não separa o glúteo médio.

## O que não ficou bom

- **Sem colchonete**, embora a ficha peça um: o da tabela (`colchonete`, 100 × 50 cm, medidas provisórias, "sem medida lida") é curto para o corpo deitado de lado, e a peça `colchonete` de `pecas.ts` deita ao longo de z (o corpo aqui deita ao longo de x). Não mexi em `pecas.ts` (fora do que posso mexer). Um tapete com medida de fabricante, numa peça própria, resolve.
- **A caneleira é desenhada por cima da perna** (a peça vai para a frente na pintura, porque envolve a canela). Nos quadros do lote ela nunca fica atrás de outra parte do corpo; se um dia ficar, vai aparecer por cima.
- **A tira de velcro** (4 cm, na cor de ação) tem medida provisória.
- O resto é o que está na `abducao-deitado.md` (o ombro de baixo que sobe 30°, o degrauzinho na emenda do pescoço, a mão de cima pelo vão debaixo da cabeça, o glúteo em bloco).
