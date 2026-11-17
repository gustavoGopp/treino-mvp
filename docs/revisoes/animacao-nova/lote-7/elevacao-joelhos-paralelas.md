# Lote 7 · Elevação de joelhos nas paralelas (`elevacao-joelhos-paralelas`)

De 15/11/2026. O mesmo movimento da elevação de joelhos na barra (`exercicios/pendurado-joelhos.ts`), com o corpo sustentado pelas mãos embaixo, nas paralelas (`exercicios/pendurado.ts` com as mãos abaixo dos ombros). Peça de cena nova: `pecas-de-cena/paralelas.ts`, medidas em `dados/objetos/paralelas.json`. Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-joelhos-paralelas.md`. Cartão: `src/conteudo/exercicios/elevacao-joelhos-paralelas.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-joelhos-paralelas.json`.
- Animação: `src/engine/novo/exercicios/elevacao-joelhos-paralelas.ts`. Regras: `src/engine/novo/regras/pendurado.ts`.
- Folha: `../prototipos/folha-elevacao-joelhos-paralelas.png`. Quadros grandes: `../quadros/elevacao-joelhos-paralelas.png`.

## Apoio: braços retos ou antebraços?

A ficha aceita os dois ("com os braços retos, ou nos antebraços, se houver almofadas"); o cartão do app começa pelos braços retos ("Sustente o corpo nas paralelas com os braços retos") e a fase "Pendurado" diz "Braços retos, corpo parado". A animação mostra os **braços retos**, as mãos fechadas nas barras (polegar para a frente), e o apoio nos antebraços fica no texto.

## Como a geometria foi montada

1. **As mãos embaixo, nas barras** (a 132,4 cm, 50,8 cm de centro a centro), os braços retos (cotovelo a 6°), apontando o cotovelo para trás, e os ombros longe das orelhas: a escápula 10° abaixo do ritmo do ombro, o ciclo inteiro (a ficha pede "empurre as barras para baixo").
2. **As pernas e a pelve** fazem o mesmo da barra (quadril até 82°, joelho até 95°, a pelve enrola 25° a partir de 35% da subida).
3. **O corpo parado:** o centro de massa na vertical das mãos em todos os quadros (o ombro vai 17 cm para trás quando as pernas sobem, e os braços inclinam).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Corpo sustentado nas paralelas com os braços retos | consenso | o cotovelo a 6° o ciclo inteiro; o centro da pegada a 0 cm do eixo de cada barra, com a mão fechada no diâmetro dela (4,4 cm) | sim |
| Ombros longe das orelhas | consenso | a clavícula a 1° de elevação o ciclo inteiro; do alto do ombro à base do crânio, 21,3 cm (em pé, parado: 18,7 cm) | sim |
| Corpo parado, pernas juntas e penduradas | consenso | o centro de massa a 0 cm da vertical das mãos; embaixo, o joelho a 5° e os pés a 50,4 cm do chão | sim |
| Sobe os joelhos e, no fim, enrola a pelve | consenso (escamilla2006 para a escolha) | a bacia gira 25° para trás em relação ao tórax e a lombar dobra 25° | sim |
| Em cima: joelhos pelo menos na altura do quadril | consenso | no topo, o centro do joelho 14,8 cm acima do centro do quadril | sim |
| O corpo fica entre as barras | (desenho) | a pele fica a no mínimo 2,2 cm da superfície das barras | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s / 0,5 s / 2 s | sim |

Conferência automática: **0 falha, 2 avisos.** (1) Ritmo: 16,2% da velocidade de pico, no quadril (o mesmo da barra: a bacia vai para trás e depois para cima quando a pelve enrola). (2) Linhas de escolha de desenho. Músculos: a vista padrão é **de frente** (236 cm² do abdômen; de lado, 134 cm²).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balançar o corpo | de lado (no começo) | as pernas vão 25° para trás e a lombar arqueia 12°; no meio da subida o centro de massa sai 10 cm à frente das mãos; no topo, a pelve só enrola 7,5° |
| Só levantar as pernas | de lado | a pelve não enrola: no topo, o joelho fica 2,9 cm abaixo do quadril (no certo, 14,8 cm acima) |
| Afundar nos ombros | de frente | os ombros sobem até as orelhas (a clavícula a 25°, no certo 1°) e o corpo afunda 6,2 cm entre as barras |

## O equipamento

Peça nova: as paralelas de chão (estação de paralelas). Medidas de fabricante (Body-Solid Dip Station, lidas na página da loja, com o trecho em `dados/objetos/paralelas.json`): altura total 134,6 cm (53 pol), distância entre as barras de 19 a 21 pol (desenhadas paralelas a 50,8 cm, a média), barras de 4,4 cm (1 ¾ pol), base de 101,6 × 68,6 cm, tubo de 5,1 × 7,6 cm. **Provisório:** a altura das barras (132,4 cm) é a altura total menos meio diâmetro, porque a página não dá a altura da barra; e o comprimento de cada barra (60 cm) é de desenho.

A animação de hoje usava 105 cm de altura e 50 cm entre as barras, sem fonte; com 105 cm e os braços retos, os pés ficariam a cerca de 23 cm do chão. Com a medida do fabricante, os pés ficam a 50 cm, e o cartão já fala em subir pelo banco ou step.

Duas peças: as barras com o alto dos montantes (o equipamento, que entra no enquadramento) e o resto da estrutura até o chão (cenário: atrás do corpo e cortado pelo quadro, porque os pés ficam a meio metro do chão e a estrutura inteira deixava o corpo pequeno no quadro).

## Correções já feitas que esta animação respeita

- Oblíquos "só ajuda" (listrados) na elevação nas paralelas (04/11): sim.
- Paralelas como peça nova (04/11): as medidas de hoje (105 cm, 50 cm) trocadas pelas do fabricante.

## O que não ficou bom

- **De lado, a barra de perto passa na frente do corpo** (na altura do quadril e das mãos): é a geometria real das paralelas vistas de lado. A técnica se lê, e a vista de frente mostra os ombros e os braços.
- A altura das barras é derivada (a altura total da estação, sem a altura da barra na página).
- Ritmo de 16,2% (aviso), como na barra.
