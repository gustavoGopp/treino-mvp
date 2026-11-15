# Lote 6 · Flexão nórdica (`nordico`)

De 15/11/2026. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/nordico.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/nordico.json`.
- Animação: `src/engine/novo/exercicios/nordico.ts` (com o colchonete da tabela dobrado ao meio, desenhado ali mesmo).
- Peça de cena nova: o sofá, `src/engine/novo/pecas-de-cena/sofa.ts`, com as medidas em `src/engine/novo/dados/objetos/sofa.json` (IKEA HYLTARP, página pública do fabricante lida em 15/11/2026: altura livre debaixo dele de 14 cm, assento a 47,9 cm, 93 cm de fundo, 232 cm de largura; a espessura da almofada e o lado dos pés são provisórios).
- Regras novas (`src/engine/novo/regras/nordico.ts`): `nordico-corpo-reto`, `nordico-desce-devagar`, `nordico-calcanhares-presos`, `nordico-joelhos-na-almofada`, `nordico-maos-tocam-o-chao`.
- Folha ao lado da de hoje: `../prototipos/folha-nordico.png`. Quadros grandes: `../quadros/nordico.png`.

## Como cada quadro é resolvido

- **A perna de baixo, uma vez por corpo** (ela não se mexe no ciclo): o joelho sobe ou desce e a canela inclina até o joelho e a canela perto do tornozelo encostarem no colchonete dobrado (3 cm, afundando 0,8 cm). O pé estica (de grau em grau, sem a ponta passar do colchonete) até o alto do calcanhar apertar 0,5 cm a parte de baixo do sofá. O sofá é posto com a borda da frente 7 cm além do calcanhar.
- **O toque das mãos:** o giro do corpo em que o braço, a 93% do alcance e 18° à frente da vertical, leva o punho ao chão (61° no homem, 62° na mulher). Ali fica o ponto de apoio de cada mão.
- **Cada quadro:** o quadril no arco em volta dos joelhos, a bacia e a coxa na mesma inclinação (o corpo reto, sem dobrar a lombar). O giro é linear em u: o toque em 0,8 (fim da descida lenta) e um quarto a mais com as mãos no chão (~15°; hoje, 14°). As mãos esperam na frente do peito, saem a 30% do giro e descem pela reta do ombro ao ponto de apoio, com o braço no alcance, até tocar o chão; depois, os cotovelos dobram como numa flexão.
- **As fases:** ajoelhado (0,6 s), descida lenta (4 s, até as mãos), mãos amortecem (0,6 s), volta empurrando o chão (0,5 s) e volta a ajoelhar (1,3 s). A volta foi dividida em duas no toque das mãos: com uma fase só, o cotovelo, que começa a dobrar no toque, dava tranco (até 90% de salto de velocidade).

## O que a fonte pede × o que o boneco faz (medido) × confere?

Medidas no homem; entre parênteses, na mulher.

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Calcanhares presos sob o assento de um sofá | consenso | o alto do calcanhar fica 0,5 cm acima da parte de baixo do sofá, apertando (0,5 cm abaixo dela, na mulher: o pé dela, esticado ao máximo sem a ponta passar do colchonete, não alcança os 14 cm), 7 cm para dentro da borda; a regra aceita até 1 cm de folga | sim (mulher: encostado, sem apertar) |
| Tíbias no chão, joelhos numa almofada (colchonete dobrado) | consenso | o joelho afunda de 0,8 a 1,2 cm e a canela perto do tornozelo 0,8 cm no colchonete dobrado; joelhos e pés não saem do lugar (0 cm) | sim |
| Corpo reto: joelho, quadril e cabeça em linha | consenso | no mínimo 178,4° (175,5°) | sim |
| O corpo gira em torno dos joelhos, sem dobrar o quadril | consenso | a coxa gira de 0° a 61,1° (61,9°) da vertical até o toque; o quadril não dobra (0°) | sim |
| Devagar: 3 a 5 s (4 s na animação) | consenso | 3,8 s do ajoelhado até as mãos (a fase dura 4 s; o quadril começa a sair do lugar logo depois do começo) | sim |
| Mãos na frente do peito; tocam o chão e os cotovelos dobram, como numa flexão | consenso | no meio da descida, a palma fica a 71,5 cm (63,3 cm) do chão; no toque, a 0 cm; embaixo, o cotovelo dobra 115° | sim |
| Volta empurrando o chão | consenso | o mesmo caminho, em 1,8 s; maior salto de velocidade 8,6% (9,2%) | sim |

Conferência automática: **0 falha, 4 avisos**: flexão plantar do tornozelo de 73,8° (72°; média 56,7°, máximo observado 90°), que é o pé esticado com o peito do pé para baixo de quem está ajoelhado com o calcanhar preso; pronação do antebraço de 94,4° (86,1°), na mão espalmada no chão; as linhas de desenho da ficha (`almofada.amassa`, `calcanhar.sobOSofa`, `calcanhar.aperta`, `maos.aparam`, `maos.alcance`, `maos.aFrente`, `embaixo.giro`); de três quartos, o músculo principal quase não aparece (11 cm², contra 67 cm² de lado): o modo Músculos fica de lado.

## As vistas

- **De lado** (padrão da técnica e do modo Músculos): o corpo reto girando em volta dos joelhos, o calcanhar debaixo do sofá, as mãos.
- **De três quartos, de frente (`quina`):** o sofá inteiro, os dois joelhos e as duas mãos. Testei a de frente (a descida vem na direção de quem olha), a de cima (o corpo encurta) e as de trás (`posterior`, `quinaTras`: o sofá cobre o corpo).

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Dobrar o quadril (de lado, quadro no toque) | a coxa gira só 45% do giro do corpo e o tronco cai 30° à frente dela; as mãos descem até onde o braço alcança |
| Desabar no começo (de lado, quadro a 30% da descida) | o corpo chega às mãos com 30% do tempo da descida |

## Correções já feitas que esta animação respeita

- O sofá "mais parecido com um sofá" e inteiro no quadro (04/11): pés curtos, base, almofada do assento, encosto e braço; os calcanhares presos por baixo. Aqui ele sai da ficha de um sofá de verdade, no gerador realista. O braço do lado de cá não é desenhado, e os pés do sofá são pintados atrás do corpo: de lado, eles cairiam em cima dos pés da pessoa (que ficam no meio do sofá, debaixo dele).

## Músculos

Posteriores da coxa (principal), sem secundário, como a biblioteca e a ficha.

## O que não ficou bom

- **Na mulher, o calcanhar só encosta no sofá (0,5 cm de folga), sem apertar:** com o pé esticado ao máximo, o calcanhar dela chega a 13,5 cm, e a altura livre debaixo do sofá da ficha é 14 cm. A regra aceita até 1 cm de folga (a tolerância de contato das outras regras). Em casa, a saída é mais uma dobra do colchonete; não pus no desenho porque mudaria a canela, que precisa ficar no colchonete.
- **De três quartos, o sofá (232 cm) ocupa metade do quadro** ("quina:tec:f0"): o corpo fica menor que de lado.
- **O fio de "calcanhares presos" desce por cima do sofá** até o calcanhar ("lateral:tec:f0"); não cruza o corpo.
