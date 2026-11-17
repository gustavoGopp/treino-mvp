# Lote 7 · Adução de quadril deitado de lado, sem carga (`aducao-deitado`)

De 15/11/2026. Deitado sobre o lado direito, **de frente para quem vê**, a cabeça apoiada no braço de baixo, a mão de cima espalmada no chão à frente do ombro. A perna de cima (a esquerda) dobrada, com o pé chapado no chão 30 cm à frente da linha do corpo; a perna de baixo (a direita, a que trabalha) estendida em linha com o corpo, a um dedo do chão, sobe 18° em 1 s, segura 1 s e desce em 2 s, sem descansar. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/aducao-deitado.md` (a mesma técnica da `aducao-caneleira`).
- Ficha de movimento: `src/engine/novo/dados/movimentos/aducao-deitado.json`.
- Animação: `src/engine/novo/exercicios/aducao-deitado.ts`, sobre o núcleo do corpo deitado (`quadril-deitado-de-lado.ts`, da `abducao-deitado`) e um núcleo novo da adução, `exercicios/quadril-fechar-deitado.ts` (serve também à `aducao-caneleira`). O núcleo deitado ganhou a opção `deFrente` (a frente do corpo para quem olha).
- Por que deitado sobre o lado direito: em exercício de um lado só, quem trabalha é o `R`; na adução quem trabalha é a perna de baixo.
- Por que de frente (e não de costas, como a abdução): o desenho dos adutores fica na face da frente da coxa (a face de dentro não tem desenho, `boneco.ts`, `musculosVisiveis`). De costas, nenhuma vista mostrava os adutores (área do principal 0 cm² de frente e de cima); de frente, 69 cm².
- Regras novas (`regras/quadril-abrir-e-fechar.ts`): `quadril-pe-de-cima-no-chao-a-frente`, `quadril-aducao-curso-curto`, `quadril-perna-de-baixo-nao-descansa`; e as da abdução que servem aqui.
- Folha: `../prototipos/folha-aducao-deitado.png`. Quadros: `../quadros/aducao-deitado.png`.

## Vistas

`frontal` (padrão: o corpo inteiro, a perna de baixo subindo no plano da tela, os adutores à vista) e `cima` (a da correção de 04/11: mostra o pé de cima no chão à frente da perna de baixo). A `quina` e a `quinaTras` foram testadas: o corpo fica visto pela cabeça ou pelos pés. Os três erros ficam de frente.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de lado, cabeça no braço de baixo | consenso | o eixo dos quadris na vertical (0°); a bacia no chão (0 cm), o lado do peito a 1,5 cm; a cabeça a 0,5 cm do braço; o ponto mais baixo do corpo a 0 cm | sim |
| Perna de cima dobrada, com o pé no chão à frente da perna de baixo | consenso | quadril a 67,7°, joelho a 119,6°; o calcanhar e a bola do pé no chão (0 cm), 30 cm à frente do joelho de baixo; o pé não sai do lugar | sim |
| Perna de baixo estendida, em linha com o corpo | consenso | joelho reto (0°), 0° de flexão do quadril | sim |
| Sobe num curso curto, só até onde o quadril fica parado | consenso | fecha de 2° a 20° (18° de curso); o tornozelo sobe 25,6 cm; a bacia anda 0 cm e o peito gira 0° | sim |
| Embaixo, a um dedo do chão, sem descansar | consenso (app) | a pele da coxa de baixo fica a 1,5 cm do chão (o tornozelo, mais fino, a ~5 cm) | sim |
| ~1 s subindo, 1 s parado, ~2 s descendo | consenso | 1 s, 1 s, 2 s; maior salto de velocidade 5,1% do pico | sim |
| As pernas não se atravessam | desenho | a menor folga entre as pernas é 13,9 cm | sim |

Conferência automática: **0 falha, 2 avisos**: as linhas de desenho da ficha de movimento e o modo Músculos (de frente, 69 cm² dos adutores; de cima, 0 cm²: a vista de cima não serve ao modo Músculos).

## Erros

- **Girar o tronco** (de frente): o tronco e a bacia rolam 30° para trás, a perna sobe 28° e gira 30° para fora (os dedos para o teto). A linha vermelha é a dos ombros.
- **Subir com tranco** (de frente): o impulso joga a perna a 30° (o topo certo é 18°). A velocidade em si não aparece num quadro parado.
- **Descansar a perna no chão** (de frente, no começo do movimento): a perna deita no chão (a pele amassa 0,5 cm).

## Músculos

Principal: `adutores:R` (a forma clássica dos adutores, criada em 04/11). Sem secundário. De frente, a mancha aparece no alto da face de dentro da coxa de baixo, perto da virilha; parte dela fica atrás da canela da perna de cima. De cima, o desenho não mostra os adutores (a face de dentro não tem desenho): no modo Músculos, só a vista de frente serve.

## Correções já feitas, respeitadas

- 04/11: "a adução merece a vista de cima, como a abdução; ainda tem só a vista lateral". Agora tem a de cima como segunda vista.
- 04/11: adutores em vermelho (forma `adutores`).

## O que não ficou bom

- **O ombro de baixo sobe além do ritmo do braço** (30° de clavícula, sem fonte), como na abdução: é o que deixa a cabeça apoiar no braço sem dobrar o pescoço 45°.
- **De frente, a mão de cima cruza na frente do peito** até o chão. É o apoio que a pessoa faz, mas tapa um pouco o peito.
- **A perna de cima tapa parte dos adutores** no fim da subida (a canela dela passa na frente da coxa de baixo). Não tentei mudar: a ficha pede o pé de cima à frente da perna de baixo, e é a canela dele que passa na frente.
- **Sem colchonete**, pelo mesmo motivo da abdução.
