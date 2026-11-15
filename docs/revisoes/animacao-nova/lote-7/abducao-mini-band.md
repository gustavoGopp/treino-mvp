# Lote 7 · Abdução de quadril sentado, com mini-band (`abducao-mini-band`)

De 15/11/2026. Sentado na beira de uma cadeira firme, costas retas, as mãos segurando as bordas dos lados do assento, os pés chapados no chão na largura do quadril; a mini band em volta das duas coxas, logo acima dos joelhos, já esticada. Os joelhos abrem em 1 s (os pés parados), seguram 1 s e voltam em 2 s. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-mini-band.md`. Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-mini-band.json`.
- Animação: `src/engine/novo/exercicios/abducao-mini-band.ts`, sobre o núcleo sentado novo `exercicios/quadril-sentado-na-cadeira.ts` (serve também à `extensao-joelho-caneleira`): a altura da bacia sai do glúteo e da coxa apoiados no assento (amassando 1 cm, medido na superfície do Boneco), a distância dos pés sai do joelho a 90°, as mãos seguram as bordas dos lados do assento. Os joelhos abrem girando em volta da linha do quadril ao tornozelo (o pé fica parado e a coxa abre); o giro é calibrado pela abertura da coxa pedida na ficha.
- Equipamento: a cadeira firme (`pecas-de-cena/cadeira.ts`, a mesma do búlgaro com o peso do corpo; a ficha aceita banco ou cadeira), pintada atrás do corpo (`cenario`): sentado nela, sem isso os pés da frente dela eram pintados por cima das pernas, de frente.
- **Peça nova: a mini band** (`pecas-de-cena/mini-band.ts`, medidas em `dados/objetos/mini-band.json`). Medidas de fabricante: a Synergee Mini Bands (página pública da living.fit, lida em 15/11): 12 × 2 pol (o laço de 61 cm de volta em repouso, 5,1 cm de largura), 0,9 mm de espessura (a média); o máximo de 2,5 vezes é da RubberBanditz de 12 pol (outro fabricante, a mesma faixa; a Synergee não diz). O desenho parte do cartão de hoje (`mini_band`, a faixa larga na cor de ação, borda escura e brilho): um anel por fora das duas coxas (no plano perpendicular a elas, meia volta por fora de cada coxa e dois trechos retos, por cima e por baixo), com a largura ao longo da coxa e estreitando ao esticar; cada pedaço é pintado na sua profundidade. Está declarada em `fios` (`elastico`, `estica: true`, `objeto: 'miniBand'`).
- Regras novas: `quadril-sentado-reto-na-cadeira`, `quadril-faixa-acima-dos-joelhos`, `quadril-joelhos-abrem`.
- Folha: `../prototipos/folha-abducao-mini-band.png`. Quadros: `../quadros/abducao-mini-band.png`.

## Vistas

`frontal` (padrão: os joelhos abrindo e a faixa esticando) e `lateral` (as costas retas, o erro de embalar o tronco e o glúteo no modo Músculos). A `quina` lê bem a faixa, mas no modo Músculos mostra só 8 cm² do glúteo; a `lateral`, 155 cm²; de frente, 0.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado na beira do assento, costas retas, mãos na lateral do assento | consenso | o centro do quadril a 14 cm da borda da frente; o glúteo e a coxa de −1,2 a −1 cm do tampo (amassam); o peito a 1,3° da vertical, parado (0 cm); as mãos nas bordas dos lados do assento | sim |
| Pés no chão na largura do quadril | consenso | a bola do pé a 10 cm do meio; os pés não saem do lugar (0 cm) | sim |
| A faixa nas coxas, logo acima dos joelhos (não sobre o joelho), sem enrolar | consenso | o meio da faixa a 8 cm do centro do joelho (a borda de baixo a 5,5 cm) | sim |
| Já um pouco esticada no início | consenso | 1,4 vezes o comprimento em repouso (88,4 cm de volta) | sim |
| Abre os joelhos até o fim confortável; pausa de ~1 s | consenso | os joelhos vão de 20,7 cm a 51,6 cm um do outro; a coxa abre de 2,8° a 25°; 1 s parado | sim |
| A faixa pesa mais com os joelhos abertos | consenso | estica de 1,3 a 2,1 vezes (máximo do fabricante: 2,5); medida refeita em 15/11 com a faixa assentada na pele das coxas | sim |
| Volta em ~2 s, sem os joelhos baterem | consenso | 2 s; maior salto de velocidade 5,3% do pico | sim |

Conferência automática: **0 falha, 3 avisos**: (1) as linhas de desenho da ficha de movimento (o joelho a 90° e o quanto o assento amassa); (2) o modo Músculos: de lado, 155 cm² do glúteo (padrão do modo); de frente, 0 cm² (não serve a esse modo); (3) a regra do elástico, que espera o elástico mais esticado no começo do ciclo (como no agachamento, que começa em cima): aqui o ciclo começa com os joelhos fechados, na ordem do cartão, e a faixa estica mais no fim da abertura, que é o que a ficha pede.

## Erros

- **Embalar o tronco** (de lado): na abertura, o tronco vai para trás (lombar 10°, costas de cima 12°); as mãos continuam no assento.
- **Soltar a volta** (de frente, no começo): a faixa fecha os joelhos de uma vez, e eles passam da largura do quadril até quase baterem.
- **Tirar os pés do lugar** (de frente): os pés abrem 10 cm cada um junto com os joelhos.

## Músculos

Principal: `gluteo` (os dois lados). O desenho tem um glúteo só, que não separa o glúteo médio (o principal da abdução), e sentado ele fica de costas: só a vista de lado mostra a mancha, atrás do quadril. De frente o modo Músculos não serve.

## Correções já feitas, respeitadas

- 04/11 (`correcoes-ja-feitas.md`): o laço feito em volta das coxas, ~18% acima dos joelhos (aqui, 8 cm: a borda de baixo fica fora do joelho), afinando quando os joelhos abrem; os erros `tronco`, `solta`, `pes`.

## O que não ficou bom

- ~~De frente, a faixa aparece como um anel em volta do colo~~: corrigido em 15/11, a pedido do Gustavo (ver "Ajuste da faixa", abaixo).
- **O glúteo médio não existe no desenho**: o modo Músculos mostra o glúteo de lado, sentado.
- **A cadeira é pintada atrás do corpo em todas as vistas** (`cenario`). Nos quadros do lote isso está certo (ela fica debaixo e atrás do corpo), mas não é uma pintura por profundidade de verdade.

## Ajuste da faixa (15/11/2026, a pedido do Gustavo: "só ajuste as animações com o elástico desse bloco")

O que estava ruim: de frente, a faixa era um contorno fino em volta do colo, pintado por cima dos joelhos; não se lia como faixa presa nas pernas.

O que mudou em `pecas-de-cena/mini-band.ts`:

- **A faixa assenta na pele.** Antes era um anel de raio fixo (o maior raio da coxa naquele trecho). Agora, em cada corte perpendicular às coxas, o contorno dela é o fecho das duas seções da pele do Boneco (assenta por fora de cada coxa e vai reta de uma à outra, por cima e por baixo). Como a coxa engrossa do joelho para o quadril, a borda de trás fica mais larga e mais alta que a da frente, e a faixa aparece como faixa também de frente.
- **As pernas escondem a faixa.** Cada pedaço só é pintado se quem olha o vê: o que assenta numa coxa aparece do lado dela virado para quem olha, e o que passa por trás de um joelho, de uma canela ou da outra coxa fica escondido. O que sobra é pintado por cima das pernas.
- **A medida do quanto estica mudou** porque a volta ficou justa na pele: de 1,3 a 2,1 vezes (79,8 a 130,9 cm), contra 1,4 a 2,3 do anel de raio fixo. Continua já esticada no começo e abaixo do máximo de 2,5 do fabricante.

Vistas: entrou a de três quartos (`quina`) como terceira vista, onde a faixa aparece na largura dela (5 cm) abraçando a coxa; a de frente continua a que abre (os joelhos abrindo) e a de lado a do modo Músculos. De cima (fora das vistas do exercício) a faixa aparece inteira por cima das duas coxas, o que confere a geometria.

Conferência automática depois do ajuste: 0 falha, 3 avisos (os mesmos). Quadros: `quadros/abducao-mini-band.png`.

O que ainda não é perfeito: de três quartos, com os joelhos abertos, aparece entre as duas pernas um pedaço do trecho de baixo da faixa (a face de dentro, escura). É o que se veria, mas é um pedaço pequeno solto no meio do quadro.
