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
