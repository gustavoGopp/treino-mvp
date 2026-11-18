# Os vinte cuidados, animação por animação

Gerado por `scripts/animacao-nova/qa-md.mjs` a partir da conferência automática (`prototipos/conferencia.json`), da lista de aprovadas (`src/engine/novo/aprovados.ts`) e do andamento. São 160 animações.

Cada célula diz **como** o cuidado foi conferido naquela animação:

- **M**: medido pela conferência automática, sem falha nem aviso.
- **M!**: medido, com um aviso (a lista está no fim).
- **O**: visto a olho nos quadros grandes (a última coluna leva à imagem).
- **C**: vale para todas, porque vem do corpo ou do traço aprovados.
- **–**: não se aplica a essa animação.
- **✗**: não cumprido (explicado no fim).

Contagem das 3040 células dos cuidados 1 a 19: M 1229, M! 126, O 1166, C 480, – 22, ✗ 17.

## O que cada cuidado pede e como foi conferido

| nº | Cuidado | Como foi conferido |
|---|---|---|
| 1 | O movimento nasce nas articulações certas, na ordem certa | regras da ficha do movimento, medidas quadro a quadro (grupo "Ficha" da conferência) |
| 2 | Nenhuma articulação dobra para onde não dobra, nem além do que dobra | amplitudes de cada articulação contra as tabelas (CDC, AAOS) e comprimento dos ossos (grupos "Amplitudes" e "Proporções") |
| 3 | O ritmo é o do exercício, sem movimento de robô nem de mola | maior salto de velocidade entre dois quadros (grupo "Ritmo") |
| 4 | O peso aparece (equilíbrio, halter na vertical, cabo reto, elástico que afina) | centro de massa sobre o apoio e quanto o cabo ou o elástico estica (grupos "Equilíbrio" e "Cabos"); onde nenhum dos dois se aplica (deitado, pendurado, sem cabo), a olho |
| 5 | Os contatos são firmes (mão, pé, costas no banco) | pontos presos que não saem do lugar, nada abaixo do chão, o corpo não atravessa peça (grupos "Contatos", "Chão" e "Objetos") |
| 6 | A mão e o pé são desenhados de verdade | vem do corpo aprovado em 13/11/2026 (mão com dedos e polegar, pé com calcanhar); as pegadas de cada animação entram no cuidado 5 |
| 7 | A cabeça e o olhar seguem a técnica | a olho, nos quadros grandes |
| 8 | O músculo está no lugar certo, com a forma certa | o realçado é o do conteúdo do app (grupo "Músculos"); a forma e o lugar vêm do corpo aprovado e da auditoria de anatomia |
| 9 | Principal, secundário e "só ajuda" se distinguem sem depender só da cor | vem do desenho aprovado: o principal leva as linhas de divisão do músculo, o secundário é liso e o que só ajuda é listrado, com o contorno tracejado |
| 10 | A vista padrão de cada modo é escolhida por medida | área do músculo principal virada para quem olha, em cada vista (grupo "Músculos") |
| 11 | Nada importante fica escondido | a olho, nos quadros grandes; onde uma vista esconde, a segunda vista resolve |
| 12 | O objeto é reconhecível | a olho, na cena; "–" onde a cena não tem objeto |
| 13 | O objeto funciona | a olho, no movimento (o cabo acompanha a mão, a roda gira, o banco inclina); "–" onde a cena não tem objeto |
| 14 | O erro aparece como erro de verdade, medido contra o certo | cada erro do app tem o seu desenho, com o certo tracejado atrás (teste tests/unit/motor-novo-ponte.test.ts) |
| 15 | Rótulos e setas fora do corpo, sem se sobrepor | a olho, nos quadros grandes (no máximo dois rótulos por vista) |
| 16 | Um traço só | vem do motor: a mesma espessura de linha e a mesma luz em tudo |
| 17 | Legível na miniatura, a 320 px, nos temas claro e escuro | a olho: o quadro do tema escuro em cada imagem de quadros e as miniaturas de 96 px na folha |
| 18 | O quadro parado também ensina | a olho: os quadros de começo, meio e fim |
| 19 | O ciclo fecha sem tranco | o último quadro emenda no primeiro (grupo "Ciclo") |
| 20 | Conferido a olho em tamanho grande, por quem fez e por um revisor | quem viu: G (folha) = o Gustavo aprovou na folha; G (quadros) = o Gustavo aprovou vendo os quadros grandes; D = feita por um subagente, conferida quadro a quadro por quem integrou e aprovada por delegação do Gustavo (15/11/2026) |

O que **não** foi feito: não houve um revisor independente animação por animação (cuidado 20). A revisão independente (`revisao-independente/`) foi do corpo e das regras do motor. Nas animações marcadas com D, quem fez foi um subagente e quem conferiu foi quem integrou; o Gustavo viu só as de maior risco.

## A tabela

| Animação | Lote | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | Imagem |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `abdominal-bola` | 7 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abdominal-bola.png) |
| `abdominal-chao` | 7 | M | M | M | O | M | C | O | M! | C | M | O | – | – | M | O | C | O | O | M | D | [quadros](quadros/abdominal-chao.png) |
| `abdominal-invertido` | 7 | M | M | M | O | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | D | [quadros](quadros/abdominal-invertido.png) |
| `abdominal-polia` | 7 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abdominal-polia.png) |
| `abducao-caneleira` | 7 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abducao-caneleira.png) |
| `abducao-deitado` | 7 | M | M | M | O | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | G (quadros) | [quadros](quadros/abducao-deitado.png) |
| `abducao-deitado-mini-band` | ? | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abducao-deitado-mini-band.png) |
| `abducao-elastico` | ? | M | M | M | M! | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/abducao-elastico.png) |
| `abducao-maquina` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abducao-maquina.png) |
| `abducao-mini-band` | 7 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abducao-mini-band.png) |
| `abertura-elastico` | ? | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abertura-elastico.png) |
| `abertura-t-deitado` | 7 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/abertura-t-deitado.png) |
| `aducao-caneleira` | 7 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/aducao-caneleira.png) |
| `aducao-deitado` | 7 | M | M | M | O | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | D | [quadros](quadros/aducao-deitado.png) |
| `aducao-maquina` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/aducao-maquina.png) |
| `afundo` | 1 | M | M! | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [folha](prototipos/folha-afundo.png) |
| `afundo-kettlebell` | 1 | M | M! | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [folha](prototipos/folha-afundo-kettlebell.png) |
| `afundo-peso-corpo` | 1 | M | M! | M | M | M | C | O | M! | C | M | O | – | – | M | O | C | O | O | M | D | [folha](prototipos/folha-afundo-peso-corpo.png) |
| `afundo-tras` | ? | M | M! | M! | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/afundo-tras.png) |
| `afundo-tras-peso-corpo` | 1 | M | M! | M! | M | M | C | O | M! | C | M | O | – | – | M | O | C | O | O | M | D | [folha](prototipos/folha-afundo-tras-peso-corpo.png) |
| `agachamento-barra` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/agachamento-barra.png) |
| `agachamento-elastico` | 1 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [folha](prototipos/folha-agachamento-elastico.png) |
| `agachamento-halteres` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/agachamento-halteres.png) |
| `agachamento-peso-corpo` | 1 | M | M! | M | M | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | D | [folha](prototipos/folha-agachamento-peso-corpo.png) |
| `agachamento-smith` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/agachamento-smith.png) |
| `barra-fixa` | 4 | M | M | M! | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/barra-fixa.png) |
| `barra-fixa-graviton` | ? | M | M | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/barra-fixa-graviton.png) |
| `barra-fixa-negativa` | ? | M | M! | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/barra-fixa-negativa.png) |
| `barra-fixa-supinada` | 4 | M | M! | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/barra-fixa-supinada.png) |
| `bulgaro` | 1 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/bulgaro.png) |
| `bulgaro-peso-corpo` | 1 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/bulgaro-peso-corpo.png) |
| `bulgaro-suspensao` | 1 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/bulgaro-suspensao.png) |
| `cadeira-extensora` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/cadeira-extensora.png) |
| `cadeira-flexora` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/cadeira-flexora.png) |
| `caminhada-lateral-mini-band` | ? | M | M! | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/caminhada-lateral-mini-band.png) |
| `coice-caneleira` | ? | M | M! | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/coice-caneleira.png) |
| `coice-elastico` | ? | M | M! | M | M! | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/coice-elastico.png) |
| `coice-maquina` | ? | M | M! | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | não aprovada | [quadros](quadros/coice-maquina.png) |
| `crucifixo-elastico` | 3 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-elastico.png) |
| `crucifixo-halteres` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-halteres.png) |
| `crucifixo-inclinado-halteres` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-inclinado-halteres.png) |
| `crucifixo-inverso` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/crucifixo-inverso.png) |
| `crucifixo-invertido-caneleira` | ? | M | M! | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/crucifixo-invertido-caneleira.png) |
| `crucifixo-invertido-curvado` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-invertido-curvado.png) |
| `crucifixo-invertido-polia` | 3 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-invertido-polia.png) |
| `crucifixo-invertido-sentado` | ? | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-invertido-sentado.png) |
| `crucifixo-polia` | 3 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-polia.png) |
| `crucifixo-polia-baixo` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/crucifixo-polia-baixo.png) |
| `desenvolvimento` | 3 | M | M | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/desenvolvimento.png) |
| `desenvolvimento-barra` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/desenvolvimento-barra.png) |
| `desenvolvimento-elastico` | 3 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/desenvolvimento-elastico.png) |
| `desenvolvimento-em-pe-halteres` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/desenvolvimento-em-pe-halteres.png) |
| `desenvolvimento-maquina` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/desenvolvimento-maquina.png) |
| `desenvolvimento-unilateral` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/desenvolvimento-unilateral.png) |
| `desenvolvimento-unilateral-kettlebell` | 3 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/desenvolvimento-unilateral-kettlebell.png) |
| `elevacao-halteres` | 3 | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-halteres.png) |
| `elevacao-joelhos` | 7 | M | M! | M! | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-joelhos.png) |
| `elevacao-joelhos-paralelas` | 7 | M | M | M! | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-joelhos-paralelas.png) |
| `elevacao-lateral` | 3 | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-lateral.png) |
| `elevacao-lateral-caneleira` | ? | M | M | M | M | M | C | O | M! | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/elevacao-lateral-caneleira.png) |
| `elevacao-lateral-deitado` | ? | M | M | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-lateral-deitado.png) |
| `elevacao-lateral-elastico` | 3 | M | M | M | M! | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-lateral-elastico.png) |
| `elevacao-lateral-unilateral` | ? | M | M | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-lateral-unilateral.png) |
| `elevacao-lateral-unilateral-elastico` | ? | M | M | M | M! | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/elevacao-lateral-unilateral-elastico.png) |
| `extensao-joelho-caneleira` | 7 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/extensao-joelho-caneleira.png) |
| `extensao-joelho-elastico` | 7 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/extensao-joelho-elastico.png) |
| `extensao-joelho-mini-band` | ? | M | M | M | M! | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/extensao-joelho-mini-band.png) |
| `extensao-triceps-peso-corpo` | 2 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/extensao-triceps-peso-corpo.png) |
| `face-pull` | 4 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/face-pull.png) |
| `face-pull-elastico` | 4 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/face-pull-elastico.png) |
| `face-pull-suspensao` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/face-pull-suspensao.png) |
| `flexao` | 0 | M | M! | M! | O | M | C | O | M! | C | M | O | – | – | M | O | C | O | O | M | G (quadros) | [quadros](quadros/flexao.png) |
| `flexao-bola` | 2 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/flexao-bola.png) |
| `flexao-elastico` | 2 | M | M! | M! | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/flexao-elastico.png) |
| `flexao-fechada` | 2 | M | M! | M! | O | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | D | [quadros](quadros/flexao-fechada.png) |
| `flexao-joelho-deslizante` | 6 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/flexao-joelho-deslizante.png) |
| `flexao-joelho-elastico` | 6 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/flexao-joelho-elastico.png) |
| `flexao-joelho-suspensao` | 6 | M | M | M! | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/flexao-joelho-suspensao.png) |
| `flexao-pes-elevados` | 2 | M | M! | M! | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/flexao-pes-elevados.png) |
| `goblet` | 0 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/goblet.png) |
| `goblet-kettlebell` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/goblet-kettlebell.png) |
| `hack` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/hack.png) |
| `hip-thrust` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | não aprovada | [quadros](quadros/hip-thrust.png) |
| `leg-press` | ? | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/leg-press.png) |
| `mergulho` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/mergulho.png) |
| `mergulho-graviton` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/mergulho-graviton.png) |
| `mesa-flexora` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/mesa-flexora.png) |
| `nordico` | 6 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/nordico.png) |
| `panturrilha` | 6 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/panturrilha.png) |
| `panturrilha-b` | 6 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/panturrilha-b.png) |
| `panturrilha-chao` | 6 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/panturrilha-chao.png) |
| `panturrilha-degrau` | 6 | M | M! | M | M | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/panturrilha-degrau.png) |
| `panturrilha-leg-press` | ? | M | M! | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | não aprovada | [quadros](quadros/panturrilha-leg-press.png) |
| `panturrilha-sentada-halter` | 6 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/panturrilha-sentada-halter.png) |
| `pike` | 2 | M | M! | M | O | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | D | [quadros](quadros/pike.png) |
| `ponte-gluteo` | 6 | M | M | M | O | M | C | O | M | C | M | O | – | – | M | O | C | O | O | M | D | [quadros](quadros/ponte-gluteo.png) |
| `ponte-gluteo-halter` | 6 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/ponte-gluteo-halter.png) |
| `ponte-kettlebell` | 6 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/ponte-kettlebell.png) |
| `ponte-pes-bola` | 6 | M | M! | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/ponte-pes-bola.png) |
| `pull-through` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/pull-through.png) |
| `puxada-barra-reta` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/puxada-barra-reta.png) |
| `puxada-elastico` | 4 | M | M! | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/puxada-elastico.png) |
| `puxada-frente` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/puxada-frente.png) |
| `puxada-unilateral` | 0 | M | M! | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/puxada-unilateral.png) |
| `remada-apoiada` | 4 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-apoiada.png) |
| `remada-articulada` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-articulada.png) |
| `remada-baixa` | 4 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-baixa.png) |
| `remada-baixa-estacao` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-baixa-estacao.png) |
| `remada-barra` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | não aprovada | [quadros](quadros/remada-barra.png) |
| `remada-curvada-elastico` | ? | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-curvada-elastico.png) |
| `remada-curvada-halteres` | 4 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-curvada-halteres.png) |
| `remada-elastico` | 4 | M | M | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-elastico.png) |
| `remada-suspensao` | 4 | M | M | M! | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-suspensao.png) |
| `remada-unilateral` | 4 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-unilateral.png) |
| `remada-unilateral-elastico` | ? | M | M! | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-unilateral-elastico.png) |
| `remada-unilateral-kettlebell` | 4 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-unilateral-kettlebell.png) |
| `remada-unilateral-polia` | 4 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-unilateral-polia.png) |
| `remada-unilateral-sem-banco` | 4 | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/remada-unilateral-sem-banco.png) |
| `roda-abdominal` | 7 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/roda-abdominal.png) |
| `rosca-alternada` | 5 | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/rosca-alternada.png) |
| `rosca-barra-w` | ? | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-barra-w.png) |
| `rosca-concentrada` | ? | M | M! | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-concentrada.png) |
| `rosca-elastico` | 5 | M | M | M | M! | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-elastico.png) |
| `rosca-inclinada` | 5 | M | M | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/rosca-inclinada.png) |
| `rosca-kettlebell` | 5 | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-kettlebell.png) |
| `rosca-martelo` | 5 | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-martelo.png) |
| `rosca-martelo-elastico` | ? | M | M | M | M! | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-martelo-elastico.png) |
| `rosca-polia` | 5 | M | M! | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-polia.png) |
| `rosca-polia-costas` | ? | M | M! | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-polia-costas.png) |
| `rosca-scott-banco-inclinado` | ? | M | M | M | O | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/rosca-scott-banco-inclinado.png) |
| `rosca-suspensao` | 5 | M | M | M | M | M | C | O | M! | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/rosca-suspensao.png) |
| `stiff` | 6 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/stiff.png) |
| `stiff-elastico` | 6 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/stiff-elastico.png) |
| `stiff-kettlebell` | 6 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/stiff-kettlebell.png) |
| `stiff-unilateral` | 6 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/stiff-unilateral.png) |
| `stiff-unilateral-kettlebell` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/stiff-unilateral-kettlebell.png) |
| `supino-barra` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | G (quadros) | [quadros](quadros/supino-barra.png) |
| `supino-chao-halteres` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/supino-chao-halteres.png) |
| `supino-inclinado` | 3 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/supino-inclinado.png) |
| `supino-inclinado-polia` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/supino-inclinado-polia.png) |
| `supino-maquina` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/supino-maquina.png) |
| `supino-polia` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/supino-polia.png) |
| `supino-reto` | 0 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/supino-reto.png) |
| `supino-smith` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/supino-smith.png) |
| `terra-hexagonal` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/terra-hexagonal.png) |
| `terra-romeno-barra` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | não aprovada | [quadros](quadros/terra-romeno-barra.png) |
| `triceps-barra-reta` | ? | M | M! | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-barra-reta.png) |
| `triceps-corda` | 5 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-corda.png) |
| `triceps-elastico-acima` | 5 | M | M! | M | M! | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-elastico-acima.png) |
| `triceps-elastico-alto` | ? | M | M | M | M! | M | C | O | M | C | M | O | O | O | ✗ | O | C | O | O | M | D | [quadros](quadros/triceps-elastico-alto.png) |
| `triceps-frances` | 5 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-frances.png) |
| `triceps-frances-halter` | 5 | M | M! | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-frances-halter.png) |
| `triceps-frances-kettlebell` | 5 | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-frances-kettlebell.png) |
| `triceps-frances-polia-unilateral` | 5 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-frances-polia-unilateral.png) |
| `triceps-frances-unilateral-halter` | ? | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-frances-unilateral-halter.png) |
| `triceps-suspensao` | 5 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | G (quadros) | [quadros](quadros/triceps-suspensao.png) |
| `triceps-testa-halteres` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/triceps-testa-halteres.png) |
| `voador` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/voador.png) |
| `voador-invertido` | ? | M | M | M | O | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/voador-invertido.png) |
| `yt-suspensao` | 4 | M | M | M | M | M | C | O | M | C | M | O | O | O | M | O | C | O | O | M | D | [quadros](quadros/yt-suspensao.png) |

## Os avisos e o que não foi cumprido

Dois avisos aparecem em quase todas e não entram na lista abaixo:

- **Cuidado 1, linhas provisórias** (0 animações): linhas da ficha do movimento que são escolha de desenho, sem número na ficha da técnica. Estão listadas, animação por animação, em `prototipos/conferencia.md`.
- **Cuidado 8, diferenças de músculo aceitas** (36 animações): o desenho realça um músculo dentro de um grupo que o conteúdo trata como um só, ou não tem o músculo separado (por exemplo, o glúteo médio). Estão em `prototipos/conferencia.md` e nos `pedidos-ao-conteudo.md`.

Os demais:

- `abdominal-polia`
  - cuidado 2: flexão plantar do tornozelo → 80,7°
- `abducao-deitado-mini-band`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,1 a 2,3 vezes (68 a 141,1 cm); em cima, 1,1 vezes
- `abducao-elastico`
  - cuidado 14: o erro "Balançar a perna" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1 a 2 vezes (48,2 a 93,7 cm); em cima, 1 vezes
- `abducao-mini-band`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 2,1 vezes (79,8 a 130,9 cm); em cima, 1,3 vezes
- `abertura-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1 a 1,9 vezes (215,5 a 386,3 cm); em cima, 1 vezes
- `abertura-t-deitado`
  - cuidado 2: flexão plantar do tornozelo → 60°
- `afundo`
  - cuidado 2: extensão do quadril → 23,5°
  - cuidado 2: dorsiflexão do tornozelo → 31,8°
- `afundo-kettlebell`
  - cuidado 2: dorsiflexão do tornozelo → 31,8°
- `afundo-peso-corpo`
  - cuidado 2: dorsiflexão do tornozelo → 31,8°
- `afundo-tras`
  - cuidado 2: dorsiflexão do tornozelo → 31,8°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 15,7% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 147,4 cm/s
- `afundo-tras-peso-corpo`
  - cuidado 2: dorsiflexão do tornozelo → 31,8°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 15,7% da velocidade de pico (joelho direito, Volta · concêntrica); pico de 147,4 cm/s
- `agachamento-barra`
  - cuidado 2: flexão do cotovelo → 154,8°
  - cuidado 2: dorsiflexão do tornozelo → 34,4°
- `agachamento-elastico`
  - cuidado 2: flexão do cotovelo → 152,6°
  - cuidado 2: dorsiflexão do tornozelo → 29,9°
  - cuidado 2: pronação do antebraço (a partir do polegar para cima) → 81,2°
- `agachamento-halteres`
  - cuidado 2: flexão do quadril → 135,5°
  - cuidado 2: dorsiflexão do tornozelo → 27,2°
- `agachamento-peso-corpo`
  - cuidado 2: flexão do quadril → 137,3°
  - cuidado 2: dorsiflexão do tornozelo → 25,4°
- `agachamento-smith`
  - cuidado 14: o erro "Esquecer a trava" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: dorsiflexão do tornozelo → 29,4°
- `barra-fixa`
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 15,5% da velocidade de pico (cotovelo direito, Escápulas descem e sobe · concêntrica); pico de 159,2 cm/s
- `barra-fixa-negativa`
  - cuidado 2: flexão do joelho (máxima no ciclo) → 148,9°
- `barra-fixa-supinada`
  - cuidado 2: elevação do braço → 171,2°
  - cuidado 2: supinação do antebraço → 93,8°
- `bulgaro`
  - cuidado 2: extensão do quadril → 22,7°
- `bulgaro-peso-corpo`
  - cuidado 2: extensão do quadril → 25°
- `caminhada-lateral-mini-band`
  - cuidado 2: dorsiflexão do tornozelo → 26°
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 1,9 vezes (79,2 a 113,7 cm); em cima, 1,3 vezes
- `coice-caneleira`
  - cuidado 14: o erro "Parar longe da falha" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: flexão plantar do tornozelo → 80,7°
  - cuidado 2: extensão do punho → 92,7°
- `coice-elastico`
  - cuidado 14: o erro "Chutar com embalo" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: flexão plantar do tornozelo → 80,7°
  - cuidado 2: extensão do punho → 92,7°
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 1,6 vezes (262,3 a 341,9 cm); em cima, 1,3 vezes
- `coice-maquina`
  - cuidado 14: o erro "Soltar a volta" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: flexão plantar do tornozelo → 80,7°
- `crucifixo-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 1,7 vezes (198,1 a 263,6 cm); em cima, 1,3 vezes
- `crucifixo-inverso`
  - cuidado 14: o erro "Carga pesada demais" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `crucifixo-invertido-caneleira`
  - cuidado 14: o erro "Parar longe da falha" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: flexão do quadril → 144,8°
- `crucifixo-invertido-sentado`
  - cuidado 2: flexão do quadril → 144,8°
- `desenvolvimento-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 2,3 a 2,8 vezes (344,4 a 428 cm); em cima, 2,3 vezes
- `desenvolvimento-unilateral-kettlebell`
  - cuidado 2: flexão do cotovelo → 150°
  - cuidado 2: elevação do braço → 173,3°
- `elevacao-joelhos`
  - cuidado 2: elevação do braço → 170,6°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 15,9% da velocidade de pico (quadril, Subida · concêntrica); pico de 273,9 cm/s
- `elevacao-joelhos-paralelas`
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 16,2% da velocidade de pico (quadril, Subida · concêntrica); pico de 247,9 cm/s
- `elevacao-lateral-caneleira`
  - cuidado 14: o erro "Parar longe da falha" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `elevacao-lateral-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 2,5 vezes (160,2 a 306,4 cm); em cima, 1,3 vezes
- `elevacao-lateral-unilateral-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,1 a 1,7 vezes (128,3 a 204,8 cm); em cima, 1,1 vezes
- `extensao-joelho-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,2 a 1,4 vezes (140,2 a 174 cm); em cima, 1,2 vezes
- `extensao-joelho-mini-band`
  - cuidado 14: o erro "Parar longe da falha" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,1 a 2,3 vezes (68 a 139,4 cm); em cima, 1,1 vezes
- `extensao-triceps-peso-corpo`
  - cuidado 2: elevação do braço → 179,9°
  - cuidado 2: dorsiflexão do tornozelo → 25°
  - cuidado 2: supinação do antebraço → 94,1°
- `face-pull-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,1 a 2 vezes (140,2 a 245 cm); em cima, 1,1 vezes
- `flexao`
  - cuidado 2: extensão do punho → 94,3°
  - cuidado 2: extensão dos dedos do pé → 76,1°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 16,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 75,3 cm/s
- `flexao-bola`
  - cuidado 2: flexão plantar do tornozelo → 61,8°
- `flexao-elastico`
  - cuidado 2: extensão do punho → 94,3°
  - cuidado 2: extensão dos dedos do pé → 76,1°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 16,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 75,3 cm/s
- `flexao-fechada`
  - cuidado 2: pronação do antebraço (a partir do polegar para cima) → 84,5°
  - cuidado 2: extensão do punho → 94,6°
  - cuidado 2: extensão dos dedos do pé → 76,1°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 17,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 77,9 cm/s
- `flexao-joelho-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,2 a 2,2 vezes (146,3 a 264,8 cm); em cima, 1,2 vezes
- `flexao-joelho-suspensao`
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 20,2% da velocidade de pico (cabeça, Puxada · concêntrica); pico de 87,6 cm/s
- `flexao-pes-elevados`
  - cuidado 2: dorsiflexão do tornozelo → 27°
  - cuidado 2: extensão do punho → 93°
  - cuidado 2: extensão dos dedos do pé → 80,3°
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 15,4% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 66,4 cm/s
- `goblet`
  - cuidado 2: dorsiflexão do tornozelo → 21,5°
- `goblet-kettlebell`
  - cuidado 2: dorsiflexão do tornozelo → 27,4°
- `leg-press`
  - cuidado 2: dorsiflexão do tornozelo → 34,6°
- `mesa-flexora`
  - cuidado 14: o erro "Volta solta" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `nordico`
  - cuidado 2: flexão plantar do tornozelo → 73,8°
  - cuidado 2: pronação do antebraço (a partir do polegar para cima) → 94,4°
- `panturrilha`
  - cuidado 2: dorsiflexão do tornozelo → 30,5°
- `panturrilha-b`
  - cuidado 2: dorsiflexão do tornozelo → 31,4°
- `panturrilha-degrau`
  - cuidado 14: o erro "Quicar embaixo" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: dorsiflexão do tornozelo → 29,3°
- `panturrilha-leg-press`
  - cuidado 14: o erro "Quicar embaixo" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 2: dorsiflexão do tornozelo → 18,8°
- `panturrilha-sentada-halter`
  - cuidado 2: pronação do antebraço (a partir do polegar para cima) → 93,6°
- `pike`
  - cuidado 2: extensão do punho → 71°
- `ponte-pes-bola`
  - cuidado 2: dorsiflexão do tornozelo → 27,2°
- `puxada-barra-reta`
  - cuidado 2: flexão plantar do tornozelo → 80,7°
- `puxada-elastico`
  - cuidado 2: flexão plantar do tornozelo → 80,7°
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,1 a 2,1 vezes (136,5 a 253,5 cm); em cima, 1,1 vezes
- `puxada-unilateral`
  - cuidado 2: flexão do cotovelo → 151,6°
  - cuidado 2: flexão plantar do tornozelo → 80,7°
- `remada-curvada-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 1,7 vezes (155 a 212,1 cm); em cima, 1,3 vezes
- `remada-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,3 a 2,2 vezes (153,9 a 265,4 cm); em cima, 1,3 vezes
- `remada-suspensao`
  - cuidado 3: maior salto de velocidade entre dois quadros (a 60 quadros por segundo) → 17,3% da velocidade de pico (mão direita, Puxada · concêntrica); pico de 212,5 cm/s
- `remada-unilateral`
  - cuidado 2: extensão do punho → 92,3°
- `remada-unilateral-elastico`
  - cuidado 2: dorsiflexão do tornozelo → 17,8°
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1 a 1,4 vezes (123,2 a 174,7 cm); em cima, 1 vezes
- `remada-unilateral-kettlebell`
  - cuidado 2: dorsiflexão do tornozelo → 17,8°
- `remada-unilateral-polia`
  - cuidado 2: dorsiflexão do tornozelo → 19,9°
- `remada-unilateral-sem-banco`
  - cuidado 2: dorsiflexão do tornozelo → 17,8°
- `roda-abdominal`
  - cuidado 2: flexão plantar do tornozelo → 80,7°
- `rosca-concentrada`
  - cuidado 2: flexão do quadril → 136°
- `rosca-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,4 a 2,3 vezes (168,4 a 277,1 cm); em cima, 1,4 vezes
- `rosca-martelo-elastico`
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,4 a 2,3 vezes (166,7 a 277 cm); em cima, 1,4 vezes
- `rosca-polia`
  - cuidado 2: supinação do antebraço → 90,8°
- `rosca-polia-costas`
  - cuidado 2: supinação do antebraço → 91,1°
- `supino-barra`
  - cuidado 14: o erro "Quicar a barra no peito" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `supino-inclinado-polia`
  - cuidado 14: o erro "Soltar a volta" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `supino-polia`
  - cuidado 14: o erro "Soltar a volta" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `supino-smith`
  - cuidado 14: o erro "Quicar a barra" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
- `terra-hexagonal`
  - cuidado 2: flexão do quadril → 135,2°
- `triceps-barra-reta`
  - cuidado 2: pronação do antebraço (a partir do polegar para cima) → 90°
- `triceps-elastico-acima`
  - cuidado 2: dorsiflexão do tornozelo → 16,6°
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,6 a 2,1 vezes (327,8 a 438,4 cm); em cima, 1,6 vezes
- `triceps-elastico-alto`
  - cuidado 14: o erro "Não testar o ponto alto" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo
  - cuidado 4: elástico: quanto estica no ciclo (1 = comprimento em repouso) → de 1,5 a 2,3 vezes (178,9 a 286,1 cm); em cima, 1,5 vezes
- `triceps-frances-halter`
  - cuidado 2: pronação do antebraço (a partir do polegar para cima) → 104,6°

## O que o andamento registra de cada uma

- `abdominal-bola`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `abdominal-chao`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `abdominal-invertido`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `abdominal-polia`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `abducao-caneleira`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a pose da abdução deitado, com a caneleira, que é peça nova; sem colchonete)
- `abducao-deitado`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas, só ajuste as animações com o elástico desse bloco"): o primeiro corpo deitado de lado do motor novo, visto de costas
- `abducao-deitado-mini-band`: (sem linha no andamento)
- `abducao-elastico`: (sem linha no andamento)
- `abducao-maquina`: (sem linha no andamento)
- `abducao-mini-band`: aprovada por delegação em 16/11/2026 ("O único problema é que quando ele abre a band parece que a mão está pra dentro, ajuste isso e seguimos. Não quero olhar mais nenhuma"): a faixa refeita em 15/11 e, de frente, a mão escondida atrás da coxa que abre
- `abertura-elastico`: (sem linha no andamento)
- `abertura-t-deitado`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `aducao-caneleira`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `aducao-deitado`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (deitado de lado, visto de frente)
- `aducao-maquina`: (sem linha no andamento)
- `afundo`: aprovada na folha
- `afundo-kettlebell`: aprovada na folha
- `afundo-peso-corpo`: aprovada na folha
- `afundo-tras`: (sem linha no andamento)
- `afundo-tras-peso-corpo`: aprovada na folha
- `agachamento-barra`: (sem linha no andamento)
- `agachamento-elastico`: aprovada na folha
- `agachamento-halteres`: (sem linha no andamento)
- `agachamento-peso-corpo`: aprovada na folha
- `agachamento-smith`: (sem linha no andamento)
- `barra-fixa`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a pegada ficou em 1,5 vez a largura dos ombros, como a pesquisa diz; a de hoje usa 1,8. A estação de barra é peça nova, a 229 cm)
- `barra-fixa-graviton`: (sem linha no andamento)
- `barra-fixa-negativa`: (sem linha no andamento)
- `barra-fixa-supinada`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `bulgaro`: aprovada na folha
- `bulgaro-peso-corpo`: aprovada por delegação (risco baixo)
- `bulgaro-suspensao`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (depois da correção: o berço com uma tira de cada lado do pé, o pé girando no berço)
- `cadeira-extensora`: (sem linha no andamento)
- `cadeira-flexora`: (sem linha no andamento)
- `caminhada-lateral-mini-band`: (sem linha no andamento)
- `coice-caneleira`: (sem linha no andamento)
- `coice-elastico`: (sem linha no andamento)
- `coice-maquina`: (sem linha no andamento)
- `crucifixo-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o tubo de 60 pol preso numa porta atrás, na altura do peito)
- `crucifixo-halteres`: (sem linha no andamento)
- `crucifixo-inclinado-halteres`: (sem linha no andamento)
- `crucifixo-inverso`: (sem linha no andamento)
- `crucifixo-invertido-caneleira`: (sem linha no andamento)
- `crucifixo-invertido-curvado`: (sem linha no andamento)
- `crucifixo-invertido-polia`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a vista padrão passou a ser a de trás)
- `crucifixo-invertido-sentado`: (sem linha no andamento)
- `crucifixo-polia`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (duas colunas; a vista padrão passou a ser a de frente)
- `crucifixo-polia-baixo`: (sem linha no andamento)
- `desenvolvimento`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (sentado, com encosto; o banco regulável agora é um desenho só, o mesmo da rosca inclinada)
- `desenvolvimento-barra`: (sem linha no andamento)
- `desenvolvimento-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (em pé; com um tubo de 60 pol, que é objeto novo: o de 48 pol passaria do máximo do fabricante)
- `desenvolvimento-em-pe-halteres`: (sem linha no andamento)
- `desenvolvimento-maquina`: (sem linha no andamento)
- `desenvolvimento-unilateral`: (sem linha no andamento)
- `desenvolvimento-unilateral-kettlebell`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `elevacao-halteres`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (com o halter de 10 lb: os halteres ficam na frente das coxas embaixo)
- `elevacao-joelhos`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o corpo recua um pouco quando as pernas sobem, para ficar parado)
- `elevacao-joelhos-paralelas`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (braços retos; as paralelas ficaram a 132 cm, pela medida do fabricante; as de hoje têm 105)
- `elevacao-lateral`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (é a elevação lateral de um braço na polia, como a ficha e o app dizem)
- `elevacao-lateral-caneleira`: (sem linha no andamento)
- `elevacao-lateral-deitado`: (sem linha no andamento)
- `elevacao-lateral-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `elevacao-lateral-unilateral`: (sem linha no andamento)
- `elevacao-lateral-unilateral-elastico`: (sem linha no andamento)
- `extensao-joelho-caneleira`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `extensao-joelho-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (sentado na ponta do banco; o joelho dobra 69° embaixo, porque mais que isso o pé encosta no chão)
- `extensao-joelho-mini-band`: (sem linha no andamento)
- `extensao-triceps-peso-corpo`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): pose diferente da de hoje: braços acima da cabeça, como a ficha pede
- `face-pull`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a vista padrão passou a ser a de lado; o ombro de trás aparece o bastante com o cotovelo 5,6 cm atrás da linha do ombro)
- `face-pull-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a pose dos braços do face pull na polia; os antebraços não chegam à vertical)
- `face-pull-suspensao`: (sem linha no andamento)
- `flexao`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas, só ajuste as animações com o elástico desse bloco"): uma das quatro primeiras, de antes dos lotes
- `flexao-bola`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): é a flexão de joelho na bola; o pescoço dobra 53° no fim
- `flexao-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (vistas: de lado e de cima)
- `flexao-fechada`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `flexao-joelho-deslizante`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (depois da correção: segunda vista de três quartos, toalha visível, erro da lombar refeito)
- `flexao-joelho-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (depois da correção: o corpo ocupa o quadro, pose de bruços refeita, o pé dentro do pegador)
- `flexao-joelho-suspensao`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): joelho a 110° no fim, e não o calcanhar no glúteo; de lado a fita é uma linha fina
- `flexao-pes-elevados`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): o peito para a 8,5 cm do chão
- `goblet`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas, só ajuste as animações com o elástico desse bloco"): uma das quatro primeiras, de antes dos lotes
- `goblet-kettlebell`: (sem linha no andamento)
- `hack`: (sem linha no andamento)
- `hip-thrust`: (sem linha no andamento)
- `leg-press`: (sem linha no andamento)
- `mergulho`: (sem linha no andamento)
- `mergulho-graviton`: (sem linha no andamento)
- `mesa-flexora`: (sem linha no andamento)
- `nordico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (os calcanhares presos debaixo de um sofá, que é peça nova; o quadro mostra só o trecho do sofá onde os pés prendem)
- `panturrilha`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `panturrilha-b`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `panturrilha-chao`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): sobe com as duas pernas e desce com uma, como a ficha de 12/11 pede; a de hoje desce com as duas
- `panturrilha-degrau`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o erro "quicar embaixo" não foi desenhado: é erro de ritmo, e o motor novo ainda não muda o tempo das fases por erro)
- `panturrilha-leg-press`: (sem linha no andamento)
- `panturrilha-sentada-halter`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a primeira pose sentada do motor novo)
- `pike`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (depois da correção: segunda vista de três quartos; a descida é mais curta que a de hoje porque a cabeça chega ao chão)
- `ponte-gluteo`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `ponte-gluteo-halter`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): a vista de cima se lê mal; no topo o cotovelo sobe a 24 cm do chão
- `ponte-kettlebell`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): de lado o kettlebell deitado é uma forma preta grande; no topo os cotovelos ficam a 31 cm do chão
- `ponte-pes-bola`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o joelho dobra uns 39° no topo, como na animação de hoje)
- `pull-through`: (sem linha no andamento)
- `puxada-barra-reta`: (sem linha no andamento)
- `puxada-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o tubo preso no alto de uma porta)
- `puxada-frente`: (sem linha no andamento)
- `puxada-unilateral`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas, só ajuste as animações com o elástico desse bloco"): uma das quatro primeiras, de antes dos lotes
- `remada-apoiada`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o banco passa entre as pernas, com os pés dos lados dele; no corpo da mulher duas regras ainda falham)
- `remada-articulada`: (sem linha no andamento)
- `remada-baixa`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (sentado no banco, com o triângulo; vistas de três quartos e de trás; no corpo da mulher duas regras ainda falham)
- `remada-baixa-estacao`: (sem linha no andamento)
- `remada-barra`: (sem linha no andamento)
- `remada-curvada-elastico`: (sem linha no andamento)
- `remada-curvada-halteres`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `remada-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (sentado no chão; duas voltas do tubo em cada mão, para ele não ficar frouxo)
- `remada-suspensao`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (o ponto de prender a fita fica a 183 cm, a altura do fabricante; hoje 205)
- `remada-unilateral`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `remada-unilateral-elastico`: (sem linha no andamento)
- `remada-unilateral-kettlebell`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `remada-unilateral-polia`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a coluna passou a ser cortada em cima pelo quadro, para o corpo ocupar o quadro)
- `remada-unilateral-sem-banco`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `roda-abdominal`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (a roda é peça nova e gira conforme anda)
- `rosca-alternada`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas", pela segunda vez): refeita com o halter de 10 lb, com os braços junto do corpo (6°) e a palma para a frente
- `rosca-barra-w`: (sem linha no andamento)
- `rosca-concentrada`: (sem linha no andamento)
- `rosca-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `rosca-inclinada`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas", pela segunda vez): com o halter de 10 lb; de frente os braços abrem 25°, para o halter não entrar no quadril
- `rosca-kettlebell`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `rosca-martelo`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (com o halter de 10 lb)
- `rosca-martelo-elastico`: (sem linha no andamento)
- `rosca-polia`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (com a barra reta, que é peça nova; a coluna é cortada em cima pelo quadro)
- `rosca-polia-costas`: (sem linha no andamento)
- `rosca-scott-banco-inclinado`: (sem linha no andamento)
- `rosca-suspensao`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `stiff`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (desce até o meio da canela, como a ficha pede; hoje para no joelho)
- `stiff-elastico`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (uma volta do elástico em cada mão, para ele não ficar frouxo embaixo)
- `stiff-kettlebell`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `stiff-unilateral`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `stiff-unilateral-kettlebell`: (sem linha no andamento)
- `supino-barra`: (sem linha no andamento)
- `supino-chao-halteres`: (sem linha no andamento)
- `supino-inclinado`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas", pela segunda vez): encosto a 30°, com o ângulo marcado no banco e no rótulo
- `supino-inclinado-polia`: (sem linha no andamento)
- `supino-maquina`: (sem linha no andamento)
- `supino-polia`: (sem linha no andamento)
- `supino-reto`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas, só ajuste as animações com o elástico desse bloco"): uma das quatro primeiras, de antes dos lotes
- `supino-smith`: (sem linha no andamento)
- `terra-hexagonal`: (sem linha no andamento)
- `terra-romeno-barra`: (sem linha no andamento)
- `triceps-barra-reta`: (sem linha no andamento)
- `triceps-corda`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `triceps-elastico-acima`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (com a faixa em laço de 41 pol, que é objeto novo)
- `triceps-elastico-alto`: (sem linha no andamento)
- `triceps-frances`: feita e conferida quadro a quadro por quem integra; aprovada por delegação (na polia, com a corda, que é peça nova)
- `triceps-frances-halter`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `triceps-frances-kettlebell`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `triceps-frances-polia-unilateral`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
- `triceps-frances-unilateral-halter`: (sem linha no andamento)
- `triceps-suspensao`: aprovada pelo Gustavo em 15/11/2026, vendo os quadros ("podem ficar assim, segue com as próximas"): apoio na ponta dos pés e mãos acima da testa, diferentes da de hoje
- `triceps-testa-halteres`: (sem linha no andamento)
- `voador`: (sem linha no andamento)
- `voador-invertido`: (sem linha no andamento)
- `yt-suspensao`: feita e conferida quadro a quadro por quem integra; aprovada por delegação
