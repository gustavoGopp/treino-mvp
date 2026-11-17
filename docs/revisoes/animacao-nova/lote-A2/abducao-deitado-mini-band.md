# Lote A2 · Abdução deitado de lado com mini-band (`abducao-deitado-mini-band`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado sobre o lado esquerdo, de costas para quem vê, a cabeça no braço de baixo, a perna de baixo dobrada; a mini-band em volta dos dois tornozelos. A perna de cima sobe estendida, um pouco atrás da linha do corpo, e a faixa estica entre os tornozelos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-deitado-mini-band.md`. Cartão do app: `src/conteudo/exercicios/abducao-deitado-mini-band.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-deitado-mini-band.json`.
- Animação: `src/engine/novo/exercicios/abducao-deitado-mini-band.ts`, sobre o núcleo da abdução deitado aprovada (`quadril-abrir-deitado.ts`, sem mudança). A faixa nos tornozelos é a peça nova `lacoNasCanelas` em `pecas-de-cena/mini-band.ts` (acréscimo; ver abaixo). Regra medida nova: `regras/mini-band.ts` (`mini-band-nos-tornozelos`).
- Quadros grandes: `../quadros/abducao-deitado-mini-band.png`. Sem folha (não havia animação de hoje).

## Onde os números saem

A ficha da técnica e o cartão não dão números. O corpo deitado, o braço de baixo, a mão de cima, a perna de cima 10° atrás da linha do corpo, o pé com os dedos para a frente e os três erros saem da abdução deitado aprovada (fonte `aprovada`, mesmas linhas). Mudaram três coisas, por causa da faixa, cada uma com o motivo na ficha de movimento:

- **A perna de baixo dobra menos** (coxa 35° à frente e joelho a 70°, contra 45° e 90° na aprovada): com 45° e 90°, o tornozelo de baixo ficava longe do de cima e a faixa já começava 1,3 vez esticada; agora começa 1,1 vez ("pernas quase juntas" embaixo, faixa já firme).
- **O alto da subida é 30°** (na aprovada, 35°): com a faixa nos tornozelos, 35° esticavam a faixa 2,5 vezes, o máximo do fabricante; 30° esticam 2,3 vezes. O cartão pede "até onde a perna sobe sem o quadril rolar" e diz que a cintura dobra acima de ~45°.
- **O erro "subir alto demais" vai a 46°** (na aprovada, 58°): mais que isso passaria do máximo do fabricante (a 46°, 2,46 vezes).

A faixa fica com o meio a 7 cm do centro do tornozelo, ao longo da canela (a borda de baixo a 4,5 cm, acima dos maléolos): o cartão diz "em volta dos tornozelos" sem número (selo `consenso`, fonte `app`). Sem colchonete, como as duas abduções deitado aprovadas (o cartão o lista, mas ele não muda o movimento).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de lado, a cabeça no braço de baixo | consenso | a bacia a 0 cm do chão, o peito a 1,5 cm; a cabeça a 0,5 cm do braço de baixo | sim |
| Quadril empilhado, sem rolar para trás | consenso | o eixo dos quadris fica a 0° da vertical; a bacia anda 0 cm e o peito gira 0° no ciclo | sim |
| A perna de baixo dobrada (cartão) | desenho | coxa 35° à frente, joelho a 70°; o joelho de baixo não sai do lugar (0 cm) | sim |
| Mini-band nos tornozelos | consenso | o meio da faixa a 7,0 cm do centro de cada tornozelo, nos dois, o ciclo todo (não escorrega); a borda de baixo a 4,5 cm | sim |
| A faixa estica (e não fica frouxa) | consenso | de 1,1 vez (embaixo) a 2,3 vezes (em cima); o máximo do fabricante é 2,5 | sim |
| Perna de cima estendida e um pouco para trás | um estudo | 10° atrás da linha do corpo, joelho dobrado 0° | sim |
| Dedos para a frente | consenso | os dedos ficam a no máximo 20° da frente do corpo | sim |
| Embaixo, as pernas quase juntas | consenso | a perna de cima começa 8° para dentro da linha do quadril; a menor folga entre as pernas é de 4,1 cm (não se atravessam) | sim |
| Em cima, até onde a perna sobe sem o quadril rolar | consenso | 30° (ver acima) | sim |
| Sobe ~1 s, pausa curta, desce ~2 s | consenso | 1,1 s, 1 s, 2 s; o maior salto de velocidade é 4,7% do pico (limite 15%) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) O elástico "em cima" (o primeiro quadro do ciclo) está 1,1 vez esticado, e a regra geral espera o mais esticado ali; aqui o primeiro quadro é a perna embaixo, o menos esticado, como na abdução sentado com mini-band aprovada. (2) As linhas de desenho (as mesmas da abdução deitado aprovada, mais a perna de baixo).

## As vistas

As mesmas da abdução deitado aprovada: **de frente** (padrão: a perna subindo, o quadril empilhado, a faixa inteira entre os tornozelos; Músculos 217 cm²) e **de cima** (a perna atrás da linha do corpo; 155 cm²). De três quartos fica só para o erro de rolar.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Rolar o quadril para trás | três quartos | a bacia rola 30° para trás, a perna sobe pela frente (25° de flexão do quadril) e os dedos viram para o teto; a faixa chega a 2,50 vezes |
| Levar a perna para a frente | de cima | a perna sobe 25° à frente da linha do corpo (a faixa: 2,41 vezes) |
| Subir alto demais com tranco | de frente | a perna vai a 46° e a cintura dobra 10° para o lado de cima (precedente aprovado na abdução deitado); a faixa, 2,46 vezes |

Todos com consequência visível; nenhum ficou de fora.

## O equipamento

- **Mini-band:** a da tabela (`dados/objetos/mini-band.json`: laço de 61 cm, 5,1 cm de largura, estica até 2,5 vezes), desenhada com a peça aprovada da abdução sentado (a faixa larga com borda escura e brilho, que estreita ao esticar). Nos tornozelos, as duas canelas não ficam paralelas (a de baixo está dobrada), e por isso a faixa é calculada por uma função nova, `lacoNasCanelas`: cada canela é cortada na perpendicular dela, e a faixa é o fecho das duas seções, reta entre elas.

## Mudança em arquivo comum

`src/engine/novo/pecas-de-cena/mini-band.ts` (peça aprovada da abdução com mini-band): **acréscimo** da função `lacoNasCanelas` e do campo opcional `parte` no `Laco` (por omissão, `coxa`: o desenho de quem já usa a peça não muda; o preparo da `abducao-mini-band` saiu igual).

## Correções já feitas que esta animação respeita

Do `correcoes-ja-feitas.md`: a mini-band afina quando estica (abdução com mini-band, 04/11); "deitado de lado, o motor mantém a pelve nivelada" (o quadril empilhado). Não há correção registrada para este id.

## O que não ficou bom

- **A faixa por baixo da canela de baixo** encosta no chão (ela passa entre a canela deitada e o chão, com 0,45 mm de folga): de frente não se vê; de cima, não aparece.
- **O erro de rolar chega a 2,50 vezes**, exatamente o máximo do fabricante. Não passa, mas está no limite.
- **O alto ficou em 30°**, 5° abaixo da abdução sem carga aprovada, por causa da faixa (medido acima). Se o Gustavo comparar as duas lado a lado, a com faixa sobe menos — é o que a faixa real faria.
