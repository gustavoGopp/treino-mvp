# Lote A2 · Coice de glúteo em quatro apoios com elástico (`coice-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto) e **o primeiro exercício em quatro apoios do motor novo**. Mãos sob os ombros e joelhos sob o quadril, no colchonete, as costas retas. A perna direita (perto de quem olha de lado) trabalha: com o joelho dobrado a 90° o tempo todo, a coxa vai de sob o quadril até a linha do tronco, empurrando o pé para trás e para cima. O laço do elástico passa pela sola do pé direito; a outra ponta do laço fica presa no colchonete sob as duas mãos. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/coice-elastico.md`. Cartão do app: `src/conteudo/exercicios/coice-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/coice-elastico.json`.
- **Núcleo novo:** `src/engine/novo/exercicios/quatro-apoios.ts` (`emQuatroApoios`, `calibrarQuatroApoios`, `troncoEmQuatroApoios`, `maosNoPiso`, `pernaDeApoio`). Genérico: quem chama dá a pose da perna direita a partir do tronco (e põe no pé o que quiser: o laço aqui, a caneleira no coice com caneleira, lote A4); nos erros, a bacia pode virar para a frente (a lombar arqueia, o peito fica) e rolar para o lado da perna que trabalha (em volta do quadril de apoio).
- Animação: `src/engine/novo/exercicios/coice-elastico.ts`. Regras medidas: `regras/quatro-apoios.ts` (quatro).
- Quadros grandes: `../quadros/coice-elastico.png`. Sem folha.

## Onde os números saem

O que o núcleo resolve, em vez de receber pronto: a altura do quadril (o joelho de apoio no colchonete, com o raio da perna no joelho acima do tampo, e a coxa na vertical: "joelhos sob o quadril"); a inclinação das costas (a mão chega ao colchonete sob o ombro com o cotovelo a 5°: "mãos sob os ombros"; o ombro anda com o braço, e a conta se repete com o ombro de verdade); e, no coice, o alto da coxa: **a coxa termina na linha que vai da base do pescoço ao quadril** (o cartão: "até a coxa ficar na linha do tronco"), medida no corpo resolvido, e não um ângulo escolhido. O joelho de apoio, a canela deitada para trás e o peito do pé no colchonete são os da roda abdominal aprovada; as mãos espalmadas e o olhar no chão à frente das mãos, os da flexão aprovada.

**O elástico** é o longo em laço da tabela (41 pol, `dados/objetos/elastico-longo.json`: volta de 208 cm, estica até 2,5 vezes), como no tríceps com elástico aprovado: o tubo de 48 pol não chega das mãos ao pé e de volta (as duas pontas precisariam de ~105 cm cada, só no começo). O cartão diz "o laço na sola de um pé; as pontas presas sob as mãos": aqui o laço passa pela sola, e a outra ponta dele fica no colchonete, de uma palma à outra. Os dois trechos vão de cada mão até a sola pelo caminho mais curto que contorna o corpo por baixo (`fioPorFora`, de `elastico-faixa.ts`): passam sob a coxa, o joelho e a canela da perna que trabalha; o da mão esquerda cruza entre as coxas e contorna a coxa de apoio pelo lado de dentro.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Quatro apoios: mãos sob os ombros | consenso | o centro da palma a no máximo 2 cm da vertical do ombro; o cotovelo dobrado 5°; as mãos não saem do lugar (0 cm) | sim |
| Joelhos sob o quadril | consenso | o joelho de apoio a 0 cm da vertical do quadril, no tampo do colchonete (−0,4 cm: amassa), parado (0 cm) | sim |
| Costas retas, abdômen firme | consenso | a lombar 6° menos curva que em pé, parada (a bacia gira 0° no ciclo); a linha dos ombros ao quadril sobe 15,8° à frente: é a conta dos braços (mais longos que as coxas) com as mãos sob os ombros e os joelhos sob o quadril | sim |
| Início: joelho sob o quadril | consenso | a coxa 12° atrás da vertical, o joelho ~1 cm acima do colchonete (com a coxa na vertical, ele estaria apoiado) | sim |
| Estende até a coxa ficar na linha do tronco | consenso | no alto, a coxa faz 0° com a linha do tronco | sim |
| Sem arquear a lombar | consenso | a bacia e a lombar não se mexem no ciclo (0°) | sim |
| Joelho dobrado (a ficha: os posteriores não contam) | consenso | o joelho a 90° do começo ao fim | sim |
| Quadril de frente para o chão | consenso | a linha dos quadris a 0° da horizontal; a coxa abre 0° para o lado | sim |
| Laço na sola, pontas sob as mãos | consenso | o laço passa a 0,2 cm do meio da sola; as pontas, a 1,8 cm do centro da palma, sob a mão | sim |
| O elástico estica | consenso | de 1,3 vez (embaixo) a 1,6 vez (no alto); o máximo do fabricante é 2,5 | sim |
| Coice ~1 s, pausa curta, volta ~2 s | consenso | 1 s, 0,6 s, 2 s; o maior salto de velocidade é 5,2% do pico | sim |
| Punhos e joelhos no colchonete | consenso | o colchonete da tabela (100 × 50 × 1,5 cm, provisório) sob as mãos (com os dedos) e os joelhos; as pontas dos pés passam da ponta de trás dele | em parte |

**Conferência automática: 0 falha, 4 avisos.** (1) Flexão plantar de 80,7° no pé de apoio (o peito do pé no colchonete, como na roda abdominal aprovada). (2) Extensão do punho de 92,7° (a mão espalmada sob o ombro, com o braço na vertical: é a posição de quatro apoios). (3) O elástico no primeiro quadro está no menos esticado (1,3), e a regra geral espera o mais esticado ali. (4) As linhas de desenho (`cotovelo`, `cervical`, `pe.flexaoPlantar`, `elastico.folga`, `elastico.paraDentro`, `colchonete.recua`).

## As vistas

**De lado** (a primeira, a que o app abre): a coxa chegando à linha do tronco, a lombar parada e o elástico por baixo. **De três quartos por trás** (a segunda; padrão do modo Músculos, 205 cm² contra 155 de lado): o glúteo e o laço. De frente, as costas escondem a perna.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar no fim | de lado | a coxa passa 20° da linha do tronco (o tornozelo sobe 16 cm a mais) e a bacia vira 14° para a frente: a lombar arqueia 14°, com o peito parado |
| Girar o quadril | de trás | a bacia rola 15° para o lado da perna que trabalha, em volta do quadril de apoio (o peito fica de frente para o chão), e a coxa abre 20° para fora: o pé vai 19 cm para o lado |

**Não desenhado:** "Chutar com embalo" ("O embalo tira o trabalho do glúteo. Suba e desça devagar."). A descrição é só de ritmo, sem consequência visível na pose. Fica fora da ficha (quem integra põe a exceção em `SEM_DESENHO`).

## Mudanças em arquivo comum

- `src/engine/novo/exercicios/elastico-faixa.ts` (núcleo dos elásticos aprovados): **acréscimo** do campo opcional `aceita` em `OpcoesDoFio` (um filtro dos pontos da pele que o elástico contorna). Sem ele, o trecho da mão direita contornava a perna de apoio por baixo (ia até o colchonete atrás do joelho de apoio). Quem não passa o campo não muda (nenhum preparo mudou).

## Correções já feitas que esta animação respeita

Não há correção registrada para este id. Da anatomia (achado 1): sem posteriores no coice (só o glúteo da perna que trabalha). Da roda abdominal: o joelho e a canela deitados no colchonete. Do tríceps com elástico: o elástico longo quando o tubo não alcança.

## O que não ficou bom

- **As pontas dos pés passam da ponta de trás do colchonete** (ele tem 100 cm, medida provisória da tabela; das pontas dos dedos das mãos às dos pés são ~125 cm). Escolhi pôr no colchonete as mãos e os joelhos (o que a ficha pede); de três quartos por trás, o pé de apoio aparece além da borda, 1,5 cm acima do chão.
- **O trecho do elástico da mão esquerda**, de lado, passa por cima da coxa de apoio na imagem (ele está entre as coxas, mais perto de quem olha); medido, fica fora da pele dela (6 cm do eixo no começo, 11 cm no alto).
- **As costas sobem 15,8° para os ombros.** É a conta das proporções com "mãos sob os ombros, joelhos sob o quadril", mas quem espera as costas "paralelas ao chão" pode estranhar.
- **O rótulo "coxa na linha do tronco"** aponta para o joelho, que no quadro do começo está embaixo: o texto fala do fim do movimento.
- **De trás, o erro de girar o quadril** é o quadro mais carregado (a perna em vermelho, os dois trechos do elástico e os braços); lê-se, mas pede atenção.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (G1) achou que, de três quartos por trás, o colchonete era pintado por cima do corpo em todo o ciclo, nos dois lados: joelhos, canelas, pés e mãos. **Causa:** o colchonete é um item só, pintado pela profundidade do meio dele; desse ângulo o meio dele fica mais perto de quem olha que o meio do corpo de quatro apoios, que está em cima dele.

**O que mudou.**
- A peça comum `colchonete` ganhou a opção `noFundo` (desligada por padrão): pintado na profundidade do canto mais longe de quem olha (o centro do arredondado mais longe, mais o raio dele). O desenho e a caixa do enquadramento não mudam. Só este exercício e o coice com caneleira a ligam.
- A regra nova `coice-elastico-colchonete-embaixo` mede, em cada vista do guia (lateral, três quartos de trás e, no erro, por trás), quanto cada parte do corpo, dos dois lados, é pintada à frente do colchonete, e a folga da mão e do joelho que apoiam até a borda dele.
- Ela achou a ponta dos dedos 0,7 cm além da ponta da frente do colchonete: `colchonete.recua` passou de −13 para −11 cm (o colchonete 2 cm para a frente).

**Antes → depois** (pior quadro, cm de pintura à frente do colchonete; negativo = coberto):

| vista | tronco e perna direita | perna esquerda | braço direito | braço esquerdo |
|---|---|---|---|---|
| três quartos de trás | −9,0 → 43,7 | −14,0 → 38,7 | −14,6 → 38,2 | −32,7 → 20,1 |
| lateral | 0,0 → 25,0 | −8,3 → 16,7 | 16,2 → 41,2 | −16,6 → 8,4 |
| por trás (erro "Girar o quadril") | −28,2 → 21,8 | −28,2 → 21,8 | −35,3 → 14,7 | −35,4 → 14,6 |

A mão direita e a esquerda ficam 1,3 cm para dentro da borda (antes, −0,7); os joelhos, 14,2 (direito) e 13,7 (esquerdo). No teste por pixel da auditoria (o corpo pintado numa cor só), a cor do colchonete aparecia em 51 a 67 pontos de pele de três quartos por trás; agora em nenhum. A regra falha no estado antigo e passa no novo; a conferência automática dá 0 falha e os mesmos 4 avisos.

Como a ordem de pintura é medida (a regra nova, com o núcleo em `src/engine/novo/regras/ordem-de-pintura.ts`): em cada vista do guia (as do exercício e as dos erros), a cada 3 quadros do movimento certo e em cada erro no começo, no meio e no fim, um raio sai de cada ponto do eixo da peça até quem olha e de cada ponto da pele virada para quem olha (a 85% do raio) até quem olha; se ele atravessa o corpo (os dois lados, cada grupo à parte), aquela parte do corpo tem de ser pintada depois do item que pinta a peça; se atravessa a peça, antes. A folga é a diferença de profundidade de pintura (cm; negativa = ordem errada). Contam só os cruzamentos de 4 pontos ou mais; a pele que fica dentro de outra parte do corpo ou dentro da própria peça não conta; quando a mesma parte esconde e é escondida pela mesma peça, vale o lado com mais pontos.

**O que ainda não ficou bom.**
- **O elástico passa por cima da canela de perto em alguns quadros**, de três quartos por trás no começo: o trecho que vai da borda de dentro da sola até a mão esquerda, por baixo do corpo, é pintado pedaço a pedaço pela profundidade de cada um e sai por cima da canela direita, que está na frente dele. Antes o colchonete cobria esse lugar e escondia o defeito; agora ele aparece (uns 10 cm de faixa sobre a canela, que se lê como a faixa enrolada no pé). Não mexi na faixa, que é outra peça; fica para quem fizer a próxima rodada.
- **O pé de apoio continua além da ponta de trás do colchonete**, 1,7 cm acima do chão (o pequeno da auditoria): com o colchonete 2 cm mais para a frente, passa 2 cm a mais. O colchonete de 100 cm (medida provisória da tabela) não cabe o corpo de quatro apoios dos dedos das mãos aos pés.

## Correção de 19/11 (colchonete)

Os dois pontos que a correção da auditoria deixou: o colchonete de 100 cm (medida provisória da tabela) não cabia o corpo de quatro apoios, e o pé de apoio ficava além da ponta de trás, 1,7 cm acima do chão; e, de três quartos por trás, o trecho do elástico que passa entre as pernas era pintado por cima da canela de perto.

**O colchonete.** Medida lida na página pública do fabricante, sem login: Gaiam Essentials Fitness Mat (10 mm), colchonete de exercício de espuma NBR, "72" x 23.6" x 10mm thick" (https://www.gaiam.com/products/gaiam-essentials-fitness-mat-10mm, lida em 19/11/2026; a outra versão do mesmo colchonete na loja dá 24 × 72 pol). Fica em `src/engine/novo/dados/objetos/colchonete-comprido.json` (`colchoneteComprido`): **182,9 × 59,9 × 1 cm**, as três com tipo `medida`.
- A peça comum `colchonete` ganhou a opção `comprido` (desligada por padrão; `pecas.ts`, com `medidasDoColchonete`, e o desenho em `equipamento.ts`): com ela, a peça usa as três medidas do colchonete medido. As outras dez animações aprovadas que usam o colchonete não ligam a opção e não mudam (o preparo delas é o mesmo; só os dois coices mudaram).
- Os dois coices ligam a opção. O corpo apoia no tampo de 1 cm (antes, 1,5): fica 0,5 cm mais baixo, com as mesmas contas.
- `colchonete.recua` passou de −11 para −25 cm: o colchonete fica sob o meio do corpo, com 28,6 cm de sobra à frente da ponta dos dedos e 28,6 cm atrás da ponta do pé de apoio; dos lados, 7,2 cm além da mão.
- O colchonete inteiro deixava o corpo 10% menor no quadro de três quartos por trás. A peça ganhou também a opção `noQuadro` (desligada por padrão; `equipamento.ts`): só o trecho do meio, com o comprimento dado, conta para o enquadramento. Linha nova `colchonete.noQuadro` (140 cm, desenho: os ~126 cm das pontas dos dedos às pontas dos pés de apoio, mais 7 cm de cada lado). Contra o quadro de antes (com o colchonete de 100 cm), a largura da cena de lado foi de 217,6 para 205,9 cm (o corpo 5% maior), e a de três quartos por trás, de 152 para 158,4 cm (o corpo 4% menor).
- A ponta do pé que trabalha, no começo, entrava 0,8 cm no chão (o pé em ângulo reto com a canela); com o colchonete embaixo dela, entraria 2,3 cm nele. Linha nova `pe.flexaoPlantar.inicio` (15°, desenho): no começo o tornozelo fica solto, o pé vai 15° além do ângulo reto e volta a ele no alto; a ponta fica 0,6 cm acima do tampo.

**O elástico atrás da canela de perto.** A faixa é pintada pedaço a pedaço, cada um na profundidade do meio dele; o Boneco pinta o tronco, a bacia, a cabeça e as pernas de perto num item só, na profundidade do tronco. De três quartos por trás, o meio do trecho entre as pernas fica mais perto de quem olha que o tronco, e ele saía por cima da canela de perto. A peça da faixa (`pecas-de-cena/elastico-longo.ts`) ganhou a opção `profundidade` (desligada por padrão: as outras animações com a faixa não mudam), e este exercício a usa (`pinturaDaFaixa`): para cada parte do Boneco, dos dois lados, conta-se em quantos pontos do pedaço ela fica na frente dele e em quantos atrás (um raio até quem olha, como na regra de pintura); o pedaço vai para trás do item de cada parte que o esconde e para a frente do item de cada parte que ele esconde, com meio centímetro de folga, nas profundidades em que o app pinta esses itens. A palma (em cima das pontas do laço) e o pé (o laço dá a volta na sola, encostado nela) não contam, aqui e na regra. `realista/base.d.mts` passou a declarar o `rot` que `base.mjs` já tinha.

**A regra `coice-elastico-colchonete-embaixo`, ampliada.** Mede também, nos dois lados: a folga até a borda do resto da canela e do pé que encostam no tampo (até 1,5 cm acima dele); a altura do ponto mais baixo de cada pé sobre o que está embaixo dele (o tampo, dentro das bordas, ou o chão), com o pé de apoio de −1 a 1 cm e o outro sem afundar mais de 1 cm; e a pintura do elástico contra cada parte do Boneco, em cada vista do guia (`regraDePintura`, de `regras/ordem-de-pintura.ts`). Ela falha no estado antigo (com a regra nova e os arquivos do exercício e da ficha de antes) e passa no novo.

**Antes → depois** (pior quadro do ciclo e dos erros):

| medida | antes | depois |
|---|---|---|
| colchonete | 100 × 50 × 1,5 cm (provisório) | 182,9 × 59,9 × 1 cm (medido) |
| pé esquerdo (de apoio): folga até a borda | −9,2 cm (além da ponta de trás; a ponta do pé 24,4 cm além, na auditoria) | 19,7 cm |
| pé esquerdo: ponto mais baixo sobre o que está embaixo | 1,7 a 1,8 cm (no ar, sobre o chão) | 0,2 a 0,3 cm (no tampo) |
| canela esquerda: folga até a borda | −7,9 cm | 19,7 cm |
| pé direito (o que trabalha), no começo | 25 cm além da ponta, 0,8 cm dentro do chão | 19,5 cm dentro, 0,6 cm acima do tampo |
| mãos / joelho direito / joelho esquerdo | 1,3 / 14,2 / 13,7 cm | 7,8 / 19,2 / 18,7 cm |
| elástico contra a perna direita (de perto), "na frente" | lateral −1,7; três quartos de trás −55,3; por trás (erro "Girar o quadril") −70,6 | 0,5 nas três |
| elástico contra a perna esquerda, "na frente" (por trás) | −32,3 | 8,8 |
| elástico contra o braço direito, "na frente" | −0,6 / −1 / −5,3 | 0,5 / 0,5 / 0,5 |
| colchonete por baixo de tudo (o pior grupo) | 8,4 (braço esquerdo, de lado) | 13,3 |

(Nas linhas de pintura, cm de profundidade de pintura; negativo = na ordem errada; "na frente" = a parte esconde o elástico.) **Conferência automática: 0 falha e os mesmos 4 avisos** (no 4º, as linhas novas `pe.flexaoPlantar.inicio` e `colchonete.noQuadro` entram na lista das escolhas de desenho). `node scripts/animacao-nova/preparo.mjs conferir`: só os dois coices mudaram.

**Olhei** cada vista e cada erro, nos dois lados (de lado, três quartos de trás, por trás no erro de girar, e as de cor de pele): o colchonete cabe o corpo inteiro, o pé de apoio fica no tampo, e, de três quartos por trás, o trecho entre as pernas some atrás da canela de perto e volta a aparecer entre o joelho e a mão esquerda.

**O que ainda não ficou bom.**
- **O colchonete comprido passa do corpo** (vai de 92 cm atrás a 91 cm à frente do meio do corpo): de três quartos por trás, o corpo ficou 4% menor no quadro que antes, e a ponta do colchonete chega perto da borda do quadro.
- **No desenho de cor de pele, por trás, no erro de girar o quadril**, o cabelo entra no item do tronco e muda a profundidade dele: em alguns pedaços do elástico que correm por baixo da perna levantada e passam na frente do braço direito, não há profundidade que sirva aos dois desenhos. Vale a do cinza (o dos erros, e o que a regra mede).
- **Onde o laço dá a volta na sola** e onde ele passa sob a palma, a mesma parte do corpo fica na frente e atrás do mesmo pedaço; a pintura e a regra deixam o pé e a palma de fora.
- O que já estava na lista e segue igual: as costas sobem 15,8° para os ombros, o rótulo "coxa na linha do tronco" aponta para o joelho embaixo no começo, e o erro de girar, de trás, é o quadro mais carregado.
