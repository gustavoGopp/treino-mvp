# Lote A4 · Crucifixo invertido sentado com caneleira presa no punho (`crucifixo-invertido-caneleira`)

De 17/11/2026. Primeira animação deste exercício (até aqui, cartão de texto; sem animação de hoje). É o crucifixo invertido sentado com halteres (`crucifixo-invertido-sentado.md`, ao lado) com outra carga: uma caneleira fechada em volta de cada antebraço, logo acima do punho, e a mão relaxada, sem segurar nada. **Ainda não aprovada nem ligada ao app.**

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-invertido-caneleira.md` ("o mesmo do crucifixo invertido sentado com halteres"); cartão: `src/conteudo/exercicios/crucifixo-invertido-caneleira.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-invertido-caneleira.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-invertido-caneleira.ts`, sobre o núcleo comum `exercicios/crucifixo-invertido-sentado-base.ts` com a carga `'caneleira'`.
- **Onde a caneleira entra no lugar do halter** (no núcleo, `criarCrucifixoSentado`): (1) a mão passa de `forma: 'pegada'` com o cabo do halter para `forma: 'relaxada'`; (2) no quadro, no lugar de `halterNaMao`, entra `caneleiraNoAntebraco` (no núcleo): o eixo do antebraço do punho ao cotovelo, a borda de baixo da faixa `caneleira.acimaDoPunho` cm acima do centro do punho, o raio medido na pele do antebraço; o desenho é a peça aprovada `pecas-de-cena/caneleira.ts` (a mesma do tornozelo), sem mudança; (3) a carga do equilíbrio vai para o centro da faixa; (4) no começo, o ponto mais baixo é a ponta dos dedos (e não a cabeça do halter).
- Regras: as do núcleo (`regras/sentado-na-ponta.ts`), mais `crucifixo-sentado-caneleira-presa-no-punho`. Sem "atrás das panturrilhas" (o cartão diz só "braços pendurados") e sem "palmas uma para a outra" (o cartão não fala da mão).
- Quadros grandes: `../quadros/crucifixo-invertido-caneleira.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado na ponta da cadeira, pés juntos, peito nas coxas | consenso | o mesmo do de halteres: quadril a 12 cm da borda, pés a 6 cm do meio, o peito amassa 1 cm as coxas do começo ao fim, base do pescoço parada (0 cm); pescoço a 3,8° do neutro | sim |
| Caneleira presa no antebraço, logo acima do punho; "se escorregar, pare" | consenso | a borda de baixo da faixa fica a 1 cm do centro do punho nos dois braços, o ciclo todo (não anda); a faixa (10,8 cm) cobre até 12 cm acima do punho; a mão fica livre | sim |
| Braços pendurados, cotovelos levemente dobrados | consenso | a ponta dos dedos fica 2 cm acima do chão; a linha do ombro à mão fica 31,9° da vertical (o chão não deixa menos: a mão aberta é mais comprida que a mão com o halter); cotovelo a 15° o ciclo todo | sim, com nota |
| Abre para os lados até a altura dos ombros | um estudo | a mão vai 30,7 cm para o lado e sobe 48,5 cm (anda 7,6 cm para a frente); no fim, 5° abaixo da horizontal, na linha dos ombros | sim |
| (Sem juntar as escápulas, achado 5) | consenso | a clavícula fica 2° abaixo do ritmo; no fim, 2° atrás dele | sim |
| A caneleira não bate em nada | desenho | a faixa fica a no mínimo 6,8 cm da pele (fora o antebraço em que está presa), 33,1 cm da cadeira e 15,5 cm do chão | sim |
| ~1 s, pausa curta, ~2 s | consenso | igual ao de halteres; salto de velocidade de 5,2% do pico | sim |

**Conferência automática: 0 falha, 2 avisos**: a flexão do quadril (144,8°, como no de halteres) e as linhas de desenho da ficha. Músculos: ombro de trás, 72 cm² de cima (padrão do modo Músculos), 58 cm² de três quartos.

## As vistas

As mesmas do de halteres: **três quartos, de trás** (a que abre) e **de cima**. A caneleira aparece nas duas.

## Erros

| Erro (texto do app) | Desenhado? | O que o boneco faz (medido) |
|---|---|---|
| Levantar o tronco | sim, três quartos, de trás | a bacia endireita 25°; o peito sai 9 cm das coxas; a base do pescoço sobe 25,5 cm |
| Virar remada | sim, três quartos, de trás | o cotovelo dobra até 85° e a mão fica embaixo dele |
| Parar longe da falha | **não** | é só esforço: a repetição de quem para longe da falha é igual à certa (a descrição do cartão não dá consequência visível). Deixado fora da ficha, como pede a seção 9 do guia; quem integra põe a exceção em `SEM_DESENHO` do teste da ponte |

## O que não ficou bom

- **O começo abre 31,9°** (pior que os 23,3° do de halteres), porque a mão relaxada é mais comprida que a mão fechada no halter e a ponta dos dedos tocaria o chão. Tentei a mão em concha (piorou: 33,9°, os dedos dobram para baixo). Lê-se como os braços já um pouco abertos no começo; é o ponto mais fraco desta animação.
- O resto é o do de halteres (quadril 144,8°, barriga 3,8 cm nos anéis, a cadeira pintada atrás do corpo).
- **A tira de velcro** na cor de ação ocupa boa parte da faixa no antebraço fino (é a peça aprovada, sem mudança; no tornozelo ela parece igual).
