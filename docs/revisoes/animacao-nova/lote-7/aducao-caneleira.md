# Lote 7 · Adução de quadril deitado de lado, com caneleira (`aducao-caneleira`)

De 15/11/2026. A mesma pose e o mesmo movimento da `aducao-deitado` (ver `aducao-deitado.md`: deitado sobre o lado direito, de frente para quem vê, o pé de cima no chão à frente, a perna de baixo subindo 18°), com a caneleira de 2 lb no tornozelo da perna de baixo. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/aducao-caneleira.md`. Ficha de movimento: `src/engine/novo/dados/movimentos/aducao-caneleira.json` (as linhas da `aducao-deitado`, mais `caneleira.massa`; títulos dos erros e dicas do texto do app desta versão: "Girar o quadril", "Descansar no chão", "desce devagar").
- Animação: `src/engine/novo/exercicios/aducao-caneleira.ts`, sobre os núcleos `quadril-deitado-de-lado.ts` e `quadril-fechar-deitado.ts`.
- Peça: a caneleira (`pecas-de-cena/caneleira.ts`, da `abducao-caneleira`; medidas da Cuff Original de 2 lb).
- Regra: `quadril-caneleira-presa-no-tornozelo` (a faixa não escorrega e não entra no chão).
- Folha: `../prototipos/folha-aducao-caneleira.png`. Quadros: `../quadros/aducao-caneleira.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Caneleira bem presa no tornozelo da perna de baixo | consenso | o centro da faixa a 7,4 cm do centro do tornozelo o ciclo inteiro; o ponto mais baixo da faixa fica 4,8 cm acima do chão embaixo | sim |
| Deitado de lado, cabeça no braço de baixo | consenso | bacia no chão (0 cm), peito a 1,5 cm, cabeça a 0,5 cm do braço | sim |
| Perna de cima dobrada, com o pé apoiado no chão à frente da perna de baixo | consenso | o pé chapado no chão (0 cm), 30 cm à frente do joelho de baixo, parado | sim |
| A perna de baixo sobe estendida até onde o quadril fica parado; o movimento é curto | consenso | fecha 18° (de 2° a 20°), joelho reto; a bacia anda 0 cm e o peito gira 0° | sim |
| Descida ~2 s, até quase encostar no chão, sem descansar | consenso | 2 s; embaixo, a pele da coxa a 1,5 cm do chão | sim |
| Um colchonete | consenso | **não desenhado** (como na `abducao-caneleira`) | não |

Conferência automática: **0 falha, 2 avisos**: as linhas de desenho da ficha de movimento e o modo Músculos (de frente, 69 cm² dos adutores; de cima, 0 cm²: a vista de cima não serve a esse modo).

## Erros

Os mesmos da `aducao-deitado`, com os títulos do app desta versão: girar o quadril (o tronco rola 30° para trás e a perna sobe 28°), subir com tranco (a perna vai a 30°), descansar no chão (a perna deita no chão). A caneleira vai com a perna errada, na cor dela (a correção de 04/11 a pintava de vermelho no erro; aqui as peças de cena não têm cor de erro).

## Músculos

`adutores:R`, como na `aducao-deitado`: de frente, no alto da face de dentro da coxa de baixo; de cima, o desenho não mostra os adutores.

## O que não ficou bom

- **Sem colchonete**, embora a ficha peça um (o motivo está em `abducao-caneleira.md`).
- O ombro de baixo que sobe 30°, a mão de cima que cruza na frente do peito e a canela de cima que tapa parte dos adutores, como na `aducao-deitado`.
