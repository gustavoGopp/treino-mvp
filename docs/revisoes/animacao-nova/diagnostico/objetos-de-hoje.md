# Objetos de hoje × medidas reais

Diagnóstico de 12/11/2026. Compara os objetos desenhados hoje (peças de cena do motor, objetos dentro de `equip()` dos exercícios e os 49 desenhos de cartão) com as medidas de `pesquisa/04-objetos.md`. Nada em `src/`, `public/`, `tests/` ou nos scripts existentes foi alterado.

Regras deste documento:
- Nenhuma medida real veio de memória. Só valem as de `04-objetos.md`, citadas pela chave da fonte (IWF20, IPF26, ROGUE-FB, RITFIT-HEX...). Conversões de polegada para cm são minhas (1 pol = 2,54 cm) e estão marcadas "conv.".
- Onde a pesquisa não tem a medida, está escrito "sem medida de referência". Onde ela veio só de resumo de busca, está "BUSCA, não verificado" e a linha NÃO conta como comparação.
- Medidas do código estão em cm, lidas do código-fonte (não medidas na tela). Nos cartões, o gerador (`scripts/desenhos-equipamento/`) descreve cada aparelho em cm num espaço 3D e projeta em 3/4; por isso as medidas dos cartões abaixo são as do modelo 3D, não do SVG. A projeção em perspectiva muda as proporções que se veem; o "o que se vê" vem das imagens.
- No gerador está escrito: "Medidas em cm, aproximadas de aparelhos reais (escolha de desenho, não especificação de fabricante)". Ou seja, os cartões nunca foram conferidos contra fichas. Este é o primeiro cotejo.

Arquivos de apoio nesta pasta: `equipamento-hoje-cartao.png` (49 cartões a 96 px, fundo claro e escuro), `equipamento-hoje-ampliado-1.png`, `-2.png`, `-3.png` (300 px). Script que gera as imagens: `scripts/animacao-nova/folha-equipamento-hoje.cjs`. Obs.: no app o cartão tem 112 x 84 px (nota do `todos.mjs`); usei 96 x 72 como pedido, que é mais exigente.

## Resumo

- Parte 1 (peças de cena e objetos de `equip()`): 58 linhas comparáveis. **21 com diferença maior que 10%**, 7 dentro de 10%, 4 "depende" (a referência é uma faixa ou há mais de uma relação válida) e **26 sem medida de referência** (a pesquisa não tem a medida, ou só tem em resumo de busca).
- Parte 2 (49 cartões): as proporções saem de um modelo 3D "aproximado" (nunca conferido). Contra as fichas de máquina, o padrão é: comprimento e altura próximos (de -12% a +20%, com exceções), **largura 30% a 60% menor**. Sem medida de referência (total ou parcial) para cerca de 12 dos 49: acessórios de polia (4), caneleiras, paralelas, elásticos, suspensão, bola, estação de remada, multifuncional (só BUSCA) e barra fixa (altura e comprimento).
- **15 grupos de cartões que se confundem** a 96 px (3 já conhecidos: supino × desenvolvimento, extensora × flexora, smith × rack; 12 novos, 2 deles com confiança alta).
- Parte 3 (12 objetos nos dois lugares): só a bola, o step (no cartão) e o kettlebell (proporção) batem razoavelmente; nos outros 9 a forma ou as proporções não batem entre cena e cartão.
- Achados de maior efeito: ver "Os 10 problemas mais graves", no fim.

---

## Parte 1. Peças de cena e objetos de `equip()`

Colunas: peça | onde (arquivo:linha) | medida no código (cm) | medida real (chave) | diferença | classe | observação.
Classe: `>10%` (diferença maior que 10% contra a referência), `<=10%`, `depende` (a referência é uma faixa e o código fica dentro ou entre dois valores), `sem ref` (pesquisa sem a medida, ou só BUSCA).
Diferença = (código − real) / real. Para faixas, mostro as duas pontas.

### 1.1 Peças de `src/engine/desenho.ts`

| peça | onde | medida no código (cm) | medida real (chave) | diferença | classe | observação |
|---|---|---|---|---|---|---|
| halter `dumbbell3`, comprimento total | desenho.ts:158-169 | cabo 16 (±8) + cabeças de x=7 a 11 de cada lado: total 22 | RITFIT-HEX comprimento total 9,5 a 15,2 pol = 24,1 a 38,6 cm (5 a 60 lb, conv.) | −9% (5 lb) a −43% (60 lb) | >10% | peça única para todos os pesos; só bate com o halter mais leve |
| halter, diâmetro da cabeça | desenho.ts:162 (raio 7) | Ø14 | RITFIT-HEX altura da cabeça 2,6 a 6,4 pol = 6,6 a 16,3 cm | dentro da faixa (≈ 20 a 45 lb) | <=10% | a cabeça é redonda (disco); os fabricantes lidos (RITFIT-HEX, ROGUE-HEX) são sextavados |
| halter, Ø do cabo | desenho.ts:163 (traço 2,6) | 2,6 | RITFIT-HEX 1,1 pol = 2,8 cm (5 e 10 lb); 1,3 pol = 3,3 cm (15 a 60 lb); ROGUE-HEX 2,5 cm até 10 lb, 3,5 cm acima | −7% a −21% | >10% | |
| halter, comprimento do cabo e espessura de cada cabeça | desenho.ts:163-165 | cabo 16; cabeça 4 de espessura | sem medida de referência | n/a | sem ref | RITFIT-HEX dá só comprimento total, largura e altura da cabeça |
| halter antigo `dumbbell` (Clássico, só p/ teste de equivalência) | desenho.ts:110 | cabo 18 entre centros, círculos Ø14 | idem | idem | sem ref | não aparece mais no app (estilo Clássico saiu) |
| halter vertical `dumbbellV` (goblet) | desenho.ts:185; goblet.ts:22 | 20 de cabo, barras transversais 18 de largura e traço 4 | RITFIT-HEX: comprimento 24,1 a 38,6; largura da cabeça 7,6 a 18,8 cm (conv.) | comprimento 24 (com o traço) ≈ 5 lb; largura 18 = 60 lb | <=10% | parece um halter pesado e curto ao mesmo tempo |
| kettlebell, altura (alça ao chão) | desenho.ts:175-184 | alça em G, bola a 12 abaixo, raio 9: 21 (22 contando a meia espessura da alça) | ELEIKO-KB 28 cm; ROGUE-CKB 28,2 cm (comp.) | −21% a −25% | >10% | cena usa a mesma bola para todo peso (coerente com competição) |
| kettlebell, Ø/largura do corpo | desenho.ts:183 (raio 9) | Ø18 | ROGUE-CKB largura 20,8 cm | −13% | >10% | ELEIKO-KB: diâmetro "não consta" |
| kettlebell, Ø da alça | desenho.ts:182 (traço 2,4) | 2,4 | ROGUE-CKB 3,3 cm; ROGUE-KB 3,0 a 4,4 cm (ferro fundido, conv.) | −27% | >10% | |
| kettlebell, distância entre as hastes da alça | desenho.ts:180-181 | 10 (m=5) com uma mão; com duas mãos = distância entre as mãos (10 a 14) | ROGUE-CKB 12,3 cm | −19% a +14% | depende | |
| kettlebell, base plana | desenho.ts:183 | esfera completa, sem base | ROGUE-CKB base Ø14 cm | a bola não repousa em base | >10% | só importa se o kettlebell for apoiado no chão; na cena é sempre segurado |
| torre da polia, altura | desenho.ts:115-116 | 238 | LF-DAPS 240 cm; LF-HS26 237; LF-CC 239 | −0,8% a +0,4% | <=10% | |
| torre, largura x profundidade da coluna | desenho.ts:115 | 20 x 14 | LF-DAPS 114 x 158 e LF-CC 381 x 72 são da estação inteira, não da coluna | n/a | sem ref | a cena desenha só uma coluna |
| torre, pilha de pesos | desenho.ts:118 | 14 largura x 44 altura x 10 profundidade (sobe com `liftOf`) | "não encontrei a largura nem a altura de cada placa da pilha" (04, seção 7) | n/a | sem ref | |
| torre, Ø da polia | desenho.ts:121 (raio 3,2) | Ø6,4 | ROGUE-SLING roldana 6 pol = 15,2 cm | −58% | >10% | referência é polia de rack (monster lite), não de máquina; é a única lida |
| torre, altura da polia | py nos `tower:{...}` (ex. face-pull.ts:23, abdominal-polia.ts:19) | mínima 12 (elevacao-lateral.ts:23); máxima 212 (abdominal-polia) | LF-DAPS: mais baixa 17 cm, mais alta 200 cm | mín. −29% (−5 cm); máx. +6% | >10% | em cm absolutos, a mínima é pouca coisa |
| pilha sobe quanto do curso do cabo | desenho.ts:124 `liftOf`: (L − L0) x 0,5, máx. 95 | razão 0,5 | LF-CC relação 2:1 (razão 0,5); LF-DAPS 4:1 (razão 0,25); ROGUE-SLING 1:1 (razão 1,0). Curso 366 cm / 4 = 91,5 cm de pilha (conv.) | 0% vs 2:1; +100% vs 4:1; −50% vs 1:1 | depende | o teto de 95 bate com 91,5 (+4%). A escolha de 2:1 é razoável mas não é a única |
| cabo de aço, espessura | desenho.ts:125 (traço 1) | 1 | ROGUE-SLING 1/4 pol = 0,64 cm (aço); capa de 5-6 mm "NÃO VERIFICADO" | +57% | >10% | traço de 1 cm em uma cena em que o cabo real tem 0,6 |
| corda de tríceps | desenho.ts:186-191 | 28 de cada lado (do anel à mão), pontas Ø4,8 (raio 2,4), traço 2 | ROGUE-TRI comprimento total 28 pol = 71 cm (com as pontas de borracha); "cabo duplicado ~11,5 pol" = 29 cm | −61% se os 71 cm forem de cada lado; −21% se forem a abertura total (56) | >10% | a leitura da fonte é ambígua; o número 28 coincide com 28 pol: vale conferir se foi lido como cm. Ø da corda e das bolas: sem medida de referência |
| pegador do elástico `bandHandle` | desenho.ts:152 | 9 de comprimento, Ø2,6 | sem medida de referência (RBANDITZ não traz pegador; "tubos com pegadores: sem medidas lidas") | n/a | sem ref | |
| faixa do elástico `band`, largura | desenho.ts:131-138 | 3,4 (afina até 1,9 ao dobro) | RBANDITZ larguras: 0,64 / 1,27 / 1,9 / 2,86 / 4,45 / 6,35 / 10,2 cm (1/4, 1/2, 3/4, 1 1/8, 1 3/4, 2 1/2, 4 pol, conv.) | +19% vs Robust; −24% vs Power | depende | cai entre "Robust" e "Power"; espessura e alongamento 2 a 2,5x: sem medida de referência |
| poste do elástico | desenho.ts:144-150 | Ø5; base 14 x 14 x 4; altura max(alt+12, 60); anel Ø6 | sem medida de referência | n/a | sem ref | convenção de desenho (já registrada) |
| barra fixa `pullBar`, Ø | desenho.ts:194 (traço 3,4) | 3,4 | ROGUE-JAM 1,125 pol = 2,86 cm (28,6 mm) | +19% | >10% | |
| barra fixa, comprimento e pontas | desenho.ts:194-195 | 124 reta; 160 com as pontas anguladas | ROGUE-JAM: parte lisa central 17,4 pol = 44 cm; "comprimento total não informado" | n/a | sem ref | |
| barra fixa, altura | desenho.ts:194 | 230 (travessa a 238) | ROGUE-JAM "altura de instalação: NÃO VERIFICADO" | n/a | sem ref | |
| barra fixa, afastamento da parede | desenho.ts:196 | montantes a 8 cm atrás da barra | ROGUE-JAM 7 pol = 17,8 cm até o centro da barra | −55% | >10% | a referência é uma barra de parede; a cena desenha pórtico. Comparação fraca |
| fita de suspensão `suspensao`, âncora | desenho.ts:209-226; ANC=205 (yt-suspensao.ts:11) | 205 | "6 pés a 6 pés 2 pol" = 183 a 188 cm (BUSCA, não verificado) | +9% a +12% | sem ref | só busca |
| fita, largura e pegador | desenho.ts:219-224 | tronco 2,4; fitas 1,8; pegador 9 de largura, Ø2,6; berço de pé 12 | TRX-FIT: "sem as medidas pedidas"; argolas: fita 38 mm (BUSCA, não verificado) | n/a | sem ref | |
| paralelas | desenho.ts:231-235 (105, meia 25) | 50 entre as barras; 60 de comprimento; Ø3,4; barras a 105 | "distância entre barras 45-60 cm, diâmetro: não confirmado"; Rogue P-3 e Rig Mount: BUSCA | n/a | sem ref | |
| caneleira | desenho.ts:240-245 | caixa 13 x 13 x 9, tira Ø1,6 a 7 cm do tornozelo | "caneleiras: sem medidas lidas" | n/a | sem ref | |
| mini-band, largura | desenho.ts:251-257 | 3,4 (duas faixas a 12 uma da outra) | RAWX-MINI 2 pol = 5,1 cm | −33% | >10% | |
| mini-band, comprimento do laço | idem | depende da pose (duas faixas entre as coxas, 18% acima dos joelhos); não medi | RAWX-MINI 12 pol = 30,5 cm | não medido | sem ref | rodar `scripts/medir-animacao.mjs abducao-mini-band` dá o número |
| roda abdominal | desenho.ts:262-268 | roda Ø18 (raio 9), largura 3,2, pegadores 9 | Rogue 7,25 pol (18,4 cm) de roda, 14,5 pol (36,8 cm) entre as empunhaduras: BUSCA, não verificado | −2% no Ø (BUSCA) | sem ref | só busca |

### 1.2 Objetos desenhados dentro de `equip()` dos exercícios

| peça | onde | medida no código (cm) | medida real (chave) | diferença | classe | observação |
|---|---|---|---|---|---|---|
| banco reto do supino, largura | supino-reto.ts:21 | 26 (meia 13) | IPF26 29 a 32; ROGUE-FB 30,5 | −10% a −19% | >10% | faixa típica do banco reto: 28-31 |
| banco reto do supino, altura do topo | supino-reto.ts:21 | 45 (42,5 + 2,5) | IPF26 42 a 45; ROGUE-FB 45,7 | 0% a −1,5% | <=10% | |
| banco reto do supino, comprimento | supino-reto.ts:21 | 108 | IPF26 mínimo 1,22 m; ROGUE-FB total 47 pol = 119 cm | −11,5% (IPF) / −9% (Rogue) | >10% | IPF é mínimo, não alvo; o estofado inteiro do Rogue não consta |
| banco reto, espessura do estofado | supino-reto.ts:21 | 5 | ROGUE-FB 2,5 pol = 6,35 cm; GYMGEAR-MAB 7 cm | −21% / −29% | >10% | |
| banco curto (assento 26 x 34), altura do topo | desenvolvimento.ts:21, extensao-joelho-caneleira.ts:29, abducao-mini-band.ts:29, panturrilha-sentada-halter.ts:31, triceps-frances-halter.ts:25 | 47,5 (45 + 2,5) | IPF26 42 a 45; faixa típica 41 a 46 (04, seção 3) | +5% a +13% (IPF); +3% (faixa) | depende | o supino-reto usa 45, estes usam 47,5 |
| banco curto, largura | idem | 26 | faixa típica 27 a 31 (seção 4) | −4% a −16% | >10% | |
| banco curto, comprimento do assento | idem | 34 (meia 17) | sem medida de referência (comprimento do assento separado: "nenhuma ficha lida traz") | n/a | sem ref | |
| banco da remada unilateral, `BANCO` | remada-unilateral.ts:9,33 | 112 x 26, topo a 46,5 | IPF26 ≥122; faixa 43 a 47 de altura | −8% (comprimento); +3% a +8% (altura) | <=10% | |
| banco inclinado (supino inclinado), estofado total | supino-inclinado.ts:22-23 | assento 34 + encosto 74 = 108; topo do assento a 48,6 (46 + 2,6) | ROGUE-AB3 estofado 52 pol = 132 cm; altura plana 17,5 pol = 44,5 cm (conv.) | −18% (comprimento); +9% (altura) | >10% | encosto a 30 graus: cabe nos ângulos do ROGUE-AB3 (0, 15, 30...) |
| banco do desenvolvimento, estofado total | desenvolvimento.ts:21-22 | assento 34 + encosto 68 = 102; encosto a 78 graus | ROGUE-AB3 132 cm | −23% | >10% | 78 graus não está nos 10 ângulos do ROGUE-AB3 (75 e 85); comparação por ângulo não é exata |
| banco da rosca inclinada, estofado total | rosca-inclinada.ts:21-22 | 34 + 72 = 106; encosto a 50 graus | ROGUE-AB3 132 cm; ângulos 45 e 52,5 | −20% | >10% | |
| banco da remada apoiada | remada-apoiada.ts:26-27 | assento 22 x 26, topo a 45,5; encosto 80 x 28 a 40 graus | ROGUE-AB3; HS24 | encosto 80 vs ? | sem ref | encosto separado: "nenhuma ficha lida traz" |
| banco da remada baixa | remada-baixa.ts:26 | 90 x 26 x 6, topo a 45 | sem medida de referência | n/a | sem ref | espessura 6 é a maior de todos |
| banco do búlgaro, altura | bulgaro.ts:24 | topo a 45; 26 de largura; 62 de comprimento | IPF26 42-45 | 0% | <=10% | |
| apoio do pé traseiro do búlgaro (peso do corpo) | bulgaro-peso-corpo.ts:25 | 42 x 40, topo a 45 | sem medida de referência | n/a | sem ref | |
| anilha sob o calcanhar (goblet) | goblet.ts:21 | duas caixas 14 x 18 x 3,2 (não é disco) | "anilha de calcanhar: sem medidas lidas"; para comparar a escala: IWF20 5 kg Ø23-26 x 2,65 cm; ROGUE-STEEL 2,5 lb Ø16 cm | n/a | sem ref | desenhada como caixa, não como disco |
| colchonete | abdominal-chao.ts:25, abducao-*.ts, ponte-gluteo*.ts, abertura-t-deitado.ts:32, remada-elastico.ts:30, flexao-joelho-suspensao.ts:29 | 60 x 1,2 x 140 (abdominal), 190 (abdução, abertura em T), 148 (ponte), 100 (ponte com pés na bola), 88 (flexão na suspensão); abdominal na polia e puxada com elástico: 50 x 3 x 70 | sem medida de referência | n/a | sem ref | mesma peça, 5 comprimentos |
| almofada, toalha, tapete dos joelhos | nordico.ts:38 (44 x 2,4 x 24); roda-abdominal.ts:30 (44 x 2,4 x 28); flexao-joelho-deslizante.ts:29 (48 x 3,2 x 52) | | sem medida de referência | n/a | sem ref | |
| bola suíça | compartilhado.ts BALL=28; flexao-bola.ts:26; abdominal-bola.ts:27; ponte-pes-bola.ts:28 | Ø56 | MERRITHEW 55 cm (150-160 cm de altura), 65 (161-180), 75 (181-200) | +2% vs 55; −14% vs 65 | <=10% | o motor não sabe a altura da pessoa; só o tamanho de 55 |
| degrau (step) | panturrilha.ts:24; panturrilha-degrau.ts:30 | 68 x 15 x 32 | GG-STEP superfície 108 x 41 cm; alturas 9, 15, 21 | altura 0%; comprimento −37%; largura −22% | >10% | altura certa, a superfície é bem menor |
| caixa de apoio dos pés (flexão com pés elevados) | flexao-pes-elevados.ts:29 | 80 x 45 x 54 | IPF26 blocos de supino até 30 cm (outro uso); sem medida para esta caixa | n/a | sem ref | |
| bancada (extensão de tríceps) | extensao-triceps-peso-corpo.ts:32 | 70 x 90 x 56 | sem medida de referência | n/a | sem ref | |
| parede da panturrilha | panturrilha-chao.ts:24; panturrilha-degrau.ts:31 | 90 x 180 x 4 | sem medida de referência | n/a | sem ref | |
| apoio dos pés (panturrilha sentada) | panturrilha-sentada-halter.ts:33 | 44 x 8 x 12 | sem medida de referência | n/a | sem ref | |
| sofá do nórdico | nordico.ts:41-45 | assento 100 x 16 x 36, encosto 96 x 36 x 8 | sem medida de referência | n/a | sem ref | |
| cabo da polia unilateral e puxada (tower) | `tower:` em 14 arquivos | ver 1.4 | ver 1.1 | | | |

### 1.3 A mesma peça com medidas diferentes

| peça | variação | observação |
|---|---|---|
| banco: altura do topo | 45 (supino-reto, remada baixa, búlgaro) · 45,5 (remada apoiada) · 46,5 (remada unilateral) · 47,5 (banco curto, 5 arquivos) · 48,6 (inclinado) | 3,6 cm (8%) entre o mais baixo e o mais alto; IPF26 diz 42 a 45 |
| banco: largura | 26 em quase todos; 28 no encosto da remada apoiada | |
| banco: comprimento | 108 · 112 · 90 · 62 · 34 (assento) | cada exercício tem o seu |
| banco: estofado | espessura 5 (quase todos), 5,2 (inclinado 2,6 x 2), 6 (remada baixa) | |
| encosto: ângulo | 78 (desenvolvimento), 40 (remada apoiada), 50 (rosca inclinada), 30 (supino inclinado) | cada exercício tem o seu |
| colchonete | comprimento 88, 100, 140, 148, 190; largura 60 | |
| polia (altura `py`) | 12, 20, 22, 66, 132, 140, 150, 160, 205, 210, 212 | faz sentido: cada exercício pede uma altura (a referência é a faixa 17 a 200) |
| torre (posição x, z) | 14 posições diferentes | normal: depende do exercício |
| halter / kettlebell / faixa | uma medida só (22 / bola Ø18 / 3,4) | coerente, mas todos os pesos iguais |
| barra fixa | pegada pronada 68, supinada 42 (decisão já registrada) | peça única |
| corda | Ø fixo, abertura 33-61 (tríceps) e 18-54 (face pull) | |

### 1.4 Resumo da Parte 1
Contagem das linhas da tabela 1.1 e 1.2 (por classe): 21 com diferença >10%, 7 <=10%, 4 "depende", 26 sem referência. As linhas que dizem "n/a" na diferença e têm classe "sem ref" são as peças em que a pesquisa não tem medida. Há 11 variações de uma mesma peça entre exercícios (1.3), as mais relevantes: altura do topo do banco (45 a 48,6), comprimento do colchonete (88 a 190) e altura da polia.

---

## Parte 2. Os 49 desenhos de cartão

Como ler: o gerador descreve cada aparelho em cm num espaço 3D (aprovado como "aproximado"). As proporções abaixo são do modelo 3D (comprimento do chão, largura do chão, altura). A referência de máquinas são as fichas C x L x A de `04-objetos.md`, seção 13 (LF-HS26, HS24, MV-NEXT, TG-HOME, MAGNUM-LP, GG-LP). Proporção alt/comp = altura / comprimento. Só aparece uma referência quando há ficha lida; senão "sem medida de referência". "Confunde com" vem da imagem a 96 px (`equipamento-hoje-cartao.png`) e das ampliadas.

### 2.1 Halteres, anilhas, kettlebell, caneleiras

| arquivo | o que é | proporções medidas no desenho | proporção real (fonte) | diferença | o que identifica / aparece | confunde com |
|---|---|---|---|---|---|---|
| halteres_fixos.svg | rack de 2 andares com 8 halteres sextavados | cabo 13, Ø do cabo 3,4, comprimento total 23,8 (r=6) a 32,1 (r=10,6), cabeça Ø12 a 21 | RITFIT-HEX: cabo 2,8-3,3; total 24,1-38,6; cabeça 6,6-16,3 cm (conv.) | cabo +3%; total −1% a −17%; cabeça circunscrita 12-21 vs 16,3 máx. (+30%) | halteres sextavados em rack: aparece bem, é único | nenhum |
| anilhas_e_manoplas.svg | pilha de anilhas + halter regulável montado | anilhas Ø32, 26, 21, 17; espessura 3,2 a 2,6; manopla 44 de comprimento, Ø2,8; pega 12 | ROGUE-STEEL Ø 450/400/325/228/190/160/134/112/90 mm; barra regulável 14 pol = 35 cm, cabo 25 mm (BUSCA, não verificado) | anilhas dentro da série; manopla +26% e cabo +12% vs BUSCA | pilha de discos + halter com disco nas pontas: aparece | nenhum |
| kettlebell.svg | 2 kettlebells (16 e 8 kg) | alt/Ø 1,29; alça/Ø corpo 0,135; altura do 8 kg = 63% do 16 kg; rótulo "16 kg" | ROGUE-CKB: 28,2/20,8 = 1,36; 3,3/20,8 = 0,159; competição = mesma altura em todos os pesos; ferro fundido: altura por peso "varia", sem números | −5%; −15%; 8 kg menor: depende (competição seria igual) | bola + alça + etiqueta azul: aparece | nenhum |
| caneleiras.svg | duas faixas acolchoadas com bolsos de peso | faixa 96 x 26 (em unidade de desenho), ponta de velcro 34, argola em D | caneleiras: sem medida de referência | n/a | faixa comprida com velcro azul: aparece; só não mostra o uso | acessorio_polia_tornozeleira (braçadeira cinza com azul) |

### 2.2 Bancos

| arquivo | o que é | proporções medidas | proporção real (fonte) | diferença | o que identifica / aparece | confunde com |
|---|---|---|---|---|---|---|
| banco_reto.svg | banco reto | estofado 120 x 28, espessura 9, topo a 48; comp/larg 4,3 | ROGUE-FB 119 x 30,5, topo 45,7, pad 6,35 (comp/larg 3,9); IPF26 ≥122 x 29-32, topo 42-45 | comp +1%; larg −8%; topo +5%; espessura +42%; razão +10% | prancha azul sobre 2 cavaletes: aparece | step (prancha azul) |
| banco_regulavel.svg | banco regulável | assento 38 x 28; encosto 82 x 28 a 40 graus; espessura 9; base 112; assento a 49 | ROGUE-AB3: estofado total 132 cm, largura 28,6, altura plana 44,5, base 143,5; GYMGEAR-MAB espessura 7 cm | estofado 120 (−9%); largura −2%; assento +10%; base −22%; espessura +29% | encosto inclinado azul + assento: aparece | nenhum |
| banco_scott.svg | banco Scott com barra W | apoio dos braços 46 x 50 a 38 graus; assento 34 x 34 a 59; base 96 x 52; altura 92 | LF-HS26 119 x 84 x 117; HS24 100 x 92 x 110 | alt/comp 0,96 vs 0,98 / 1,10; larg/comp 0,54 vs 0,71 / 0,92 | almofada inclinada + assento + barra W com anilhas: aparece | rosca_maquina (almofada inclinada + assento) |
| banco_romano.svg | banco romano (hiperextensão) | base 116 x 54; altura ~95; 2 rolos de pé Ø10 e apoio do quadril | LF-HS26 127 x 94 x 97; HS24 150 x 72 x 110 | alt/comp 0,82 vs 0,76 / 0,73 (+8% a +12%); larg/comp 0,47 vs 0,74 / 0,48 | A de apoio inclinado + rolos: aparece | hack (rampa inclinada com almofada) |

### 2.3 Polias e acessórios

| arquivo | o que é | proporções medidas | proporção real (fonte) | diferença | o que identifica / aparece | confunde com |
|---|---|---|---|---|---|---|
| estacao_polia_dupla.svg | crossover | 2 torres 42 x 34 x 222, ~303 entre as extremas, polia a 150, pilha 24 x 72 x 12 | LF-CC 381 x 72 x 239 (alt/larg 0,63); LF-DAPS 114 x 158 x 240 (uma coluna) | alt −7%; larg −20%; alt/larg 0,73 vs 0,63 (+16%) | 2 torres + barra no alto, 2 pegadores: aparece | smith, rack (pórtico alto) em tamanho pequeno |
| polia_simples.svg | polia ajustável, 1 torre | torre 34 x 30 x 210, pista com carrinho de 112 a 128, pegador em D | LF-DAPS 240 cm | alt −12% | só uma coluna alta: a "máquina" some; carrinho e pegador pequenos | estacao_puxada (mesma torre) |
| acessorio_polia_corda.svg | corda de tríceps | ~66 cm de altura com o anel, pontas Ø6,4 de borracha, abertura ±15 | ROGUE-TRI 28 pol = 71 cm total | −7% | duas cordas em V com batente preto: aparece | acessorio_polia_triangulo e suspensao (V) |
| acessorio_polia_triangulo.svg | triângulo | V de 36 de altura, 30 na base, pegada Ø4,4 | sem medida de referência | n/a | triângulo de aço com anel: aparece | acessorio_polia_estribo |
| acessorio_polia_barra_reta.svg | barra reta | 54 cm de barra, Ø3,2, pegadas 16 de cada lado | sem medida de referência (GG-LAT 48 pol é barra de puxada, não esta) | n/a | barra horizontal com anel central: aparece | nenhum |
| acessorio_polia_estribo.svg | estribo (alça em D) | alça 20 de largura, 21 de altura, pegador Ø4,8 | sem medida de referência | n/a | alça preta triangular + pegador branco: aparece | acessorio_polia_triangulo |
| acessorio_polia_tornozeleira.svg | tornozeleira | anel Ø20, largura 10, D de 9 | sem medida de referência | n/a | braçadeira em anel azul + preto: aparece | caneleiras |
| estacao_puxada.svg | puxador alto | torre 34 x 30 x 220; barra lat 70 cm, Ø3; banco 38 a 44; 2 rolos de coxa | LF-HS26 SS-PD 145 x 142 x 194; HS24 138 x 84 x 227; MV-NEXT 153 x 137,5 x 195; GG-LAT 48 pol = 122 cm | alt 220 vs 194-227 (−3% a +13%); barra −43% | torre + barra no alto + banco: aparece, pequeno a 96 px | multifuncional |
| estacao_remada.svg | remada baixa | banco 130; torre 190; apoio dos pés a 54 | sem ficha de estação de remada baixa; LF SS-RW 124 x 140 x 148 é outra máquina | n/a | banco comprido + apoio de pés + torre: aparece | nenhum |
| multifuncional.svg | estação multifuncional | base 134 x 92; torre 210; banco com encosto, voador, rolos | LF-UC 105 x 175 x 181 (cm, conv.) e TG Multi Hip 124 x 112 x 175: "NÃO VERIFICADO" | alt +16% a +20% | muitos acessórios juntos: aparece; "bagunça" | estacao_puxada, voador |

### 2.4 Barras e estruturas

| arquivo | o que é | proporções medidas | proporção real (fonte) | diferença | o que identifica / aparece | confunde com |
|---|---|---|---|---|---|---|
| barra_fixa.svg | barra fixa em batente de porta | batente 91 x 222; barra 73 cm, Ø3,8, a 192 | ROGUE-JAM Ø2,86 cm; altura e comprimento: sem medida de referência | Ø +33% | batente bege + barra: aparece | nenhum |
| barra_longa.svg | barra olímpica com anilhas | total 220; Ø barra 2,6; manga 42 x Ø5; entre mangas 136; anilhas Ø45 x 4; razão comp/Ø anilha 4,9 | IWF20: 220; Ø 2,8 (grip); manga 41,5 x 5; 131; anilha 45; IPF26 28-29 mm, 131-132 | 0%; −7% a −10%; +1%; +4%; 0% | barra longa + anilhas nas pontas: aparece | barra_w (à distância) |
| barra_w.svg | barra W (EZ) | total 120; Ø2,6; manga 24; curva ±3,4 | ELEIKO-CURL 131,6 cm; manga carregável 23 cm; ângulos da curva: não constam | −9%; +4% | barra com zigue-zague + anilhas: aparece pouco a 96 px | barra_longa |
| paralelas.svg | paralelas | barras a 58 de distância, 82 de comprimento, Ø4,8, a 106 | sem medida de referência | n/a | duas barras sobre montantes: aparece | rack_de_agachamento (grade) |
| barra_hexagonal.svg | barra hexagonal | hexágono 48 x 68; cabos a 24 de distância, Ø4,4; manga Ø5 x 30; anilhas Ø45 | ROGUE-TB1: largura 72,4; cabos Ø3,4, 63,5 centro a centro; manga Ø4,85 x 40,6 carregáveis; 226 total | largura −34%; espaçamento −62%; cabo +29%; manga −26% | hexágono + anilhas grandes: aparece | nenhum |
| rack_de_agachamento.svg | gaiola de agachamento | base 118 x 120; altura 224; gancho a 143; barras de segurança a 72 | IPF26 altura do rack 100 a 170 cm (suportes); LF-HS26 197 x 168 x 192; HS24 150 x 176 x 186 | alt +17% a +20%; base −21% a −40% | gaiola com barra e anilhas: aparece | smith |
| smith.svg | smith | base 90 x 200; altura 230; barra a 128; 2 guias | LF-HS26 125 x 221 x 237; HS24 127 x 220 x 237 | alt −3%; comp −9%; larg −28%; alt/comp 1,15 vs 1,07 (+6%) | gaiola com guias verticais: aparece fraco | rack_de_agachamento |

### 2.5 Máquinas (alt/comp e larg/comp do modelo contra as fichas)

| arquivo | o que é | proporções medidas | proporção real (fonte) | diferença | o que identifica / aparece | confunde com |
|---|---|---|---|---|---|---|
| cadeira_extensora.svg | extensora | 158 x 64 x 160; alt/comp 1,01; larg/comp 0,40 | LF 167 x 106 x 148; HS 120 x 105 x 163; MV 137 x 110 x 146 (alt/comp 0,89 / 1,36 / 1,06; larg/comp 0,63 / 0,88 / 0,80) | alt/comp dentro; larg/comp −37% a −54% | came redonda no joelho e rolo à frente da canela: aparece pouco | cadeira_flexora |
| cadeira_flexora.svg | flexora sentada | 170 x 64 x 160; alt/comp 0,94 | LF 156 x 102 x 148; HS 140 x 87 x 140; MV 153 x 108 x 146 (alt/comp 0,95 / 1,0 / 0,95) | alt/comp −1% a −6%; larg −26% a −41% | alavanca longa para a frente + trava das coxas: aparece | cadeira_extensora |
| mesa_flexora.svg | mesa flexora | 160 x 50 x ~90 (sem pilha); alt/comp 0,56 | LF 159 x 106 x 148; HS 166 x 100 x 140; MV 155 x 108 x 146 (alt/comp 0,84 a 0,94) | alt −33% a −40%; larg/comp 0,31 vs 0,64-0,70 | duas almofadas deitadas + rolo + 1 anilha: aparece | panturrilha_sentada_maquina |
| supino_maquina.svg | supino | 144 x 80 x 172; alt/comp 1,19 | LF 144 x 144 x 148; HS 105 x 145 x 163; MV 124 x 138 x 146; TG 141 x 143 x 167 (alt/comp 1,03 / 1,55 / 1,18 / 1,18) | alt/comp dentro; larg/comp 0,56 vs 1,0-1,4 (−45% a −60%) | braços que vêm de cima + pino de anilha: aparece | desenvolvimento_maquina, remada_articulada |
| voador.svg | voador | ~106 x 98 x 200; alt/comp 1,9 | LF 203 x 198 x 204; HS 125 x 143 x 181; MV 158 x 135 x 199 (alt/comp 1,0 / 1,45 / 1,26) | +31% a +90% | 2 asas com almofada vertical: aparece | triceps_maquina, multifuncional |
| desenvolvimento_maquina.svg | desenvolvimento | 120 x 80 x ~170; alt/comp 1,42 | LF 164 x 145 x 185; HS 153 x 143 x 163; MV 155 x 144 x 146 (1,13 / 1,07 / 0,94) | +26% a +51% | pegadas acima da cabeça + anilha: aparece | supino_maquina, remada_articulada |
| remada_articulada.svg | remada articulada | 140 x 80 x ~155; alt/comp 1,1 | LF 124 x 140 x 148; HS 133 x 87 x 181; MV 120 x 129 x 146 (1,19 / 1,36 / 1,22) | −8% a −19% | apoio de peito inclinado + disco: aparece | supino_maquina, desenvolvimento_maquina |
| graviton.svg | graviton (assistida) | 124 x 80 x 236; alt/comp 1,9 | LF 163 x 149 x 222; HS 117 x 115 x 221 (1,36 / 1,89) | alt +6%; larg/comp −30% a −46% | duas colunas altas, pegadas no alto, degrau: aparece pouco | panturrilha_em_pe_maquina |
| rosca_maquina.svg | rosca | 120 x 76 x 150; alt/comp 1,25 | LF 122 x 160 x 148; HS 115 x 105 x 140; MV 123 x 146 x 146 (1,21 / 1,22 / 1,19) | +3% a +5%; larg −28% a −52% | almofada inclinada + torre: aparece | banco_scott, gluteo_maquina |
| triceps_maquina.svg | tríceps | 124 x 80 x 170; alt/comp 1,37 | LF 135 x 111 x 148; HS 115 x 112 x 140; MV 126 x 108 x 146 (1,10 / 1,22 / 1,16) | +12% a +25% | pegadas verticais ao lado do quadril: aparece pouco | abdominal_maquina, voador |
| abdominal_maquina.svg | abdominal | 144 x 80 x 170; alt/comp 1,18 | LF 134 x 118 x 148; HS 158 x 89 x 143; MV 141 x 114 x 146; TG 139 x 103 x 140 (1,10 / 0,91 / 1,04 / 1,01) | +7% a +30% | almofadas sobre o peito + rolos dos pés: aparece | triceps_maquina |
| gluteo_maquina.svg | glúteo | 160 x 60 x 150; alt/comp 0,94 | LF 186 x 98 x 148; HS 166 x 100 x 183; MV 102 x 90 x 146 (0,80 / 1,10 / 1,43) | dentro; larg −33% a −40% | apoio de peito + alavanca do pé atrás: aparece pouco | rosca_maquina |
| panturrilha_em_pe_maquina.svg | panturrilha em pé | 108 x 80 x ~200; alt/comp 1,85 | HS 148 x 115 x 182 (1,23) | +50%; comp −27% | ombreiras + degrau: aparece | graviton |
| panturrilha_sentada_maquina.svg | panturrilha sentada | 110 x 40 x ~66; alt/comp 0,6 | LF 155 x 74 x 107; HS 124 x 84 x 137; HS-HC 155 x 82 x 140 (0,69 / 1,10 / 0,90) | −13% a −45% | almofada sobre o joelho + bloco dos pés: aparece | mesa_flexora |
| leg_press.svg | leg press 45° | trilho a 45° (vetor 1,1); 216 x 68 x ~110; alt/comp 0,51 | MAGNUM-LP 229 x 171 x 158; GG-LP 238 x 219 x 137; HS24 176 x 130 x 145 (0,69 / 0,58 / 0,82); ângulo: "vem do nome" | alt/comp −12% a −38%; larg −48% a −69% | trilho inclinado + chapa de pés + anilhas: aparece | hack |
| hack.svg | hack | guia a 47° (vetor 0,68; 0,73); 172 x 68 x ~123; alt/comp 0,72 | HS24 216 x 155 x 153 (0,71); ângulo da guia: não consta | alt/comp +1%; larg −56% | guia inclinada + ombreiras: aparece | leg_press |
| cadeira_abdutora_adutora.svg | abdutora/adutora | 112 x 106 x 171 | LF 160 x 168 x 148; HS 155 x 67 x 140; MV 167 x 81 x 146 (alt/lado maior 0,87 a 0,90) | alt/lado maior 1,5: +70% | assento + almofadas laterais + torre: aparece | cadeira_extensora |
| esteira.svg | esteira | 192 x 78 x ~146; alt/comp 0,76 | LF-HS26 209 x 92 x 142 e 212 x 92 x 147 (0,68 / 0,69); TG-HOME superfície a 24 cm | alt/comp +10%; larg/comp −8%; superfície a 16-19 vs 24 (−21% a −33%) | plataforma + corrimão + painel: aparece, é único | nenhum |

### 2.6 Outros acessórios

| arquivo | o que é | proporções medidas | proporção real (fonte) | diferença | o que identifica / aparece | confunde com |
|---|---|---|---|---|---|---|
| elasticos.svg | 2 tubos em arco com pegadores | tubo 3,4 de espessura em 100 de arco; pegador 18 x 9 | RBANDITZ (faixas planas, 0,64 a 10,2 cm de largura); "tubos com pegadores: sem medidas lidas" | n/a | arco azul + arco cinza com pegadores: aparece | mini_band |
| mini_band.svg | dois anéis finos | espessura/Ø 0,06 (7 / 112); 2º anel 72 | RAWX-MINI 12 x 2 pol (30,5 x 5,1): se 30,5 for o desenho plano de um laço, Ø ≈ 9,7 e espessura/Ø ≈ 0,52 (hipótese minha) | desenho 8x mais fino | 2 anéis azul e cinza: aparece; não parece faixa | elasticos |
| step.svg | step | 100 x 38 x 18 (prato + suportes); comp/larg 2,63 | GG-STEP 108 x 41 x 9/15/21; comp/larg 2,63 | comp −7%; larg −7%; razão 0%; alt +20% (vs 15) | prancha azul com ranhuras e 2 calços: aparece | banco_reto |
| bola_suica.svg | bola | Ø ≈ 96 de 120 do desenho; sem objeto de comparação | MERRITHEW 55-75 cm | não mensurável | esfera azul com costuras: aparece | nenhum |
| suspensao.svg | fita de suspensão | âncora no alto, fita 67, pegador 18 de largura (0,27 da fita), fivelas azuis | TRX-FIT: sem as medidas; argola/âncora BUSCA | n/a | V de fitas com pegadores: aparece | acessorio_polia_corda, triângulo |
| roda_abdominal.svg | roda | roda Ø22, largura 8, eixo 44; eixo/Ø 2,0 | Rogue 36,8 / 18,4 = 2,0 (BUSCA, não verificado) | 0% (BUSCA) | roda grossa azul + eixo: aparece; parece pneu/anilha | nenhum |

### 2.7 Pares e grupos que se confundem no cartão (vistos em `equipamento-hoje-cartao.png`)

Confiança: A = os dois diferem só em detalhes pequenos, olhei lado a lado e não os distingo a 96 px; M = parecidos mas com 1 traço que ajuda.

| # | grupo | o que os separa de fato | confiança | já registrado antes? |
|---|---|---|---|---|
| 1 | supino_maquina × desenvolvimento_maquina (× remada_articulada) | altura das pegadas e direção dos braços | A | sim (backlog) |
| 2 | cadeira_extensora × cadeira_flexora | sentido da alavanca (para baixo, para a frente) | A | sim |
| 3 | smith × rack_de_agachamento | guias verticais cromadas × barras de segurança | A | sim |
| 4 | leg_press × hack | 45° das fichas × guia mais em pé; ambos com chapa de pé e anilhas | M | não |
| 5 | barra_longa × barra_w | zigue-zague no meio | A | não |
| 6 | acessorio_polia_triangulo × acessorio_polia_estribo | 2 aros (triângulo × alça preta) | A | parcial (diagnóstico de 01/11) |
| 7 | acessorio_polia_corda × suspensao | corda preta × fitas com fivela azul; ambas V | M | parcial |
| 8 | elasticos × mini_band | arco alto × anel deitado | M | não |
| 9 | mesa_flexora × panturrilha_sentada_maquina | número de almofadas, rolo | M | não |
| 10 | banco_scott × rosca_maquina | barra W com anilhas × torre | M | não |
| 11 | estacao_puxada × multifuncional | tudo que a multifuncional junta | M | não |
| 12 | triceps_maquina × abdominal_maquina × voador | pegadas e almofadas azuis soltas | M | não |
| 13 | caneleiras × acessorio_polia_tornozeleira | faixa × anel | M | não |
| 14 | banco_reto × step | pernas × calços | M | não |
| 15 | graviton × panturrilha_em_pe_maquina | degrau e pegadas | M | não |

Também registrados antes e que não consegui reproduzir como "confusão": o backlog fala de polia simples e puxador alto "pequenos", glúteo "genérico", corda "garfo" e hack sem versão pendular. Confirmo que polia_simples é só uma coluna (sem nada que a distinga de uma torre qualquer) e que a corda lê como garfo a 96 px.

---

## Parte 3. Coerência cena × cartão

| objeto | cena (cm) | cartão (modelo, cm) | real (chave) | batem? |
|---|---|---|---|---|
| halter | cabeça redonda Ø14, cabo 16, total 22, Ø cabo 2,6 | cabeça sextavada Ø12-21, cabo 13, total 24-32, Ø cabo 3,4 | RITFIT-HEX total 24-39, cabo 2,8-3,3 | forma não (redonda × sextavada); cabo 16 × 13 (+23%); nenhum dos dois alcança os halteres médios e pesados |
| kettlebell | bola Ø18, alça 2,4, alt 21 | alt/Ø 1,29; alça/corpo 0,135; base plana | ROGUE-CKB alt/Ø 1,36; alça/corpo 0,159 | proporção do cartão (1,29) fica entre a cena (1,17) e o real (1,36); alça fina nos dois |
| banco | topo 45 a 48,6; larg 26; espessura 5; comp 62-112 | topo 48; larg 28; espessura 9; comp 120 | IPF26/ROGUE-FB: topo 45-46, larg 29-32, esp 6,4 | espessura não (5 × 9 vs 6,4); altura +6%; larg −7%; ambos aquém na largura |
| polia / torre | torre 20 x 14 x 238; polia Ø6,4; pilha 14 x 44 x 10 | torre 34 x 30 x 210-222; polia Ø9; pilha 24 x 72 x 12 | LF-DAPS alt 240; ROGUE-SLING Ø15,2 | altura +7% a +13% de diferença entre eles; largura da coluna 20 × 34 (−41%); polia 6,4 × 9 (−29%); ambas menores que a real |
| barra fixa | pórtico com montantes, barra 124 (reta), Ø3,4, a 230 | batente de porta 91 x 222, barra 73, Ø3,8, a 192 | ROGUE-JAM Ø2,86 | não: forma diferente, altura −17%, comprimento −41%, Ø +12% |
| bola | Ø56 (círculo) | esfera azul com costuras (sem escala) | MERRITHEW 55-75 | sim, na ideia; cor e traço diferentes |
| elástico | faixa plana 3,4 afinando a 1,9; pegador barra 9 | tubo redondo 3,4 com pegador em alça | RBANDITZ faixas planas | forma não (faixa × tubo com pegador) |
| fita | tronco único + 2 fitas, pegador 9 (0,11 da fita), sem fivela | fita única, fivelas azuis, pegador 18 (0,27 da fita) | TRX-FIT sem medidas | pegador 2,5x maior no cartão; cartão tem fivela, cena não |
| paralelas | 50 entre barras, 60, Ø3,4, a 105 | 58 entre barras, 82, Ø4,8, a 106 | sem medida de referência | altura bate; distância +16%, comprimento +37%, Ø +41% no cartão |
| roda | Ø18, largura 3,2 | Ø22, largura 8, eixo/Ø 2,0 | BUSCA 18-19 cm de Ø | Ø +22% no cartão; largura 2,5x |
| caneleira | caixa 13 x 13 x 9 com tira | faixa comprida 96 x 26 com velcro | sem medida de referência | não: formas diferentes |
| mini-band | 2 faixas planas 3,4, laço pelas coxas | 2 anéis finos (espessura/Ø 0,06) | RAWX-MINI 5,1 cm de largura | formas diferentes: faixa plana × aro fino |
| step | 68 x 32 x 15 | 100 x 38 x 18 | GG-STEP 108 x 41 x 9/15/21 | cena −37% / −22% / 0%; cartão −7% / −7% / +20%; o cartão é o mais próximo |

---

## Os 10 problemas mais graves

1. **15 grupos de cartões que se confundem a 96 px** (3 já eram conhecidos). O pior é a família "máquina de assento + torre" (supino, desenvolvimento, remada articulada; extensora, flexora; tríceps, abdominal, voador). Com o cartão como único apoio para a pessoa marcar o que tem, este é o defeito de maior efeito. Ver 2.7.
2. **Máquinas do cartão sistematicamente estreitas e, em vários, altas demais.** Largura/comprimento 30% a 60% abaixo das fichas em quase todas (supino −45% a −60%, extensora −37% a −54%, hack −56%, leg press −48% a −69%); altura do rack +17% a +20%, voador +31% a +90%, desenvolvimento +26% a +51%, panturrilha em pé +50%. As fichas (LF-HS26, HS24, MV-NEXT) estão em 04, seção 13.
3. **Polia de cena:** roldana Ø6,4 contra 15,2 (−58%), cabo com traço de 1 cm contra 0,64 (+57%), e a coluna isolada sem referência. A razão 0,5 da pilha só bate com a relação 2:1 (LF-CC); com a de 4:1 (LF-DAPS) a pilha deveria subir a metade.
4. **Kettlebell de cena pequeno:** altura 21 a 22 contra 28 (−21% a −25%), Ø18 contra 20,8 (−13%), alça 2,4 contra 3,3 (−27%), sem base plana. Afeta as 7 animações com kettlebell.
5. **Halter de cena:** total 22 contra 24 a 39 (até −43%), cabo 2,6 contra 2,8-3,3, cabeça redonda; no cartão, sextavado, com cabo 13. As duas versões não combinam entre si.
6. **Barra fixa: cena e cartão são objetos diferentes** (pórtico de 230 e Ø3,4 × batente de 192 e Ø3,8) e os dois estão acima do Ø real (2,86). Altura e comprimento reais: sem medida de referência.
7. **Step de cena:** 68 x 32 contra 108 x 41 (−37% e −22%). Altura de 15 correta. O cartão está mais perto (−7%).
8. **Bancos:** largura 26 contra 29-32 (−10% a −19%), comprimento do supino 108 contra 119-122 (−9% a −12%), estofado inclinado 102-108 contra 132 (−18% a −23%), altura do topo variando 45 a 48,6 entre exercícios, espessura 5 (cena) × 9 (cartão) contra 6,35.
9. **Barra hexagonal do cartão:** cabos a 24 cm de distância contra 63,5, largura 48 contra 72,4 (−34%), manga carregável −26%.
10. **Formas diferentes entre cena e cartão** para elástico (faixa × tubo), mini-band (faixa plana × aro fino de 0,06 do Ø), caneleira (caixa × faixa), pegador da fita (0,11 × 0,27), paralelas (+16% a +41%) e a anilha sob o calcanhar (caixa em vez de disco). E o ponto de atenção da corda de tríceps: 28 cm de cada lado contra 28 pol (71 cm) em ROGUE-TRI, que merece conferência de unidade.

Lacunas da pesquisa que impedem concluir (sem medida de referência): comprimento do assento e do encosto do banco, altura da instalação da barra fixa, distância das paralelas, caneleiras e anilha de calcanhar, pegadores e tubos de elástico, espessura das faixas, fita de suspensão, largura e altura da placa da pilha, diâmetro do cabo com capa, ângulo do hack e do smith, colchonete, caixas e bancadas.
