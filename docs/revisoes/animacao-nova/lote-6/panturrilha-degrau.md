# Lote 6 · Panturrilha no degrau da escada (`panturrilha-degrau`)

De 15/11/2026. As duas pernas, a bola dos pés na beirada do primeiro degrau de uma escada, os calcanhares no ar; a mão esquerda no corrimão só para equilibrar, a direita solta. Pausa embaixo com o calcanhar bem abaixo do degrau, sobe na ponta dos pés, desce em 2,5 s. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-degrau.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-degrau.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-degrau.ts`, sobre o núcleo `exercicios/elevar-o-calcanhar.ts` (descrito em `panturrilha-chao.md`).
- **Peça nova: a escada** (`pecas-de-cena/degrau.ts`, `escada`; medidas em `dados/objetos/escada.json`, da ABNT NBR 9077:2001, na cópia pública do MPRJ): degrau de 17 cm (faixa da norma: 16 a 18), piso de 29,5 cm (fórmula de Blondel, 2h + b = 63,5), corrimão de 4,5 cm de diâmetro (38 a 65 mm) a 86 cm acima da linha das quinas (80 a 92 cm), em montantes que saem de cada degrau. Três degraus no quadro, de pedra clara, com volume e luz. É cenário na pintura (atrás do corpo): os pés pisam no degrau e o corrimão fica do lado de lá. Antes disso, o montante perto da quina passava por cima da canela na vista de lado (corrigido).
- Regras: as da família (`regras/panturrilhas.ts`).
- Folha: `../prototipos/folha-panturrilha-degrau.png`. Quadros: `../quadros/panturrilha-degrau.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Ponta dos pés na beirada do degrau, calcanhares no ar | consenso | a bola do pé 2 cm para dentro da quina do degrau de 17 cm; o calcanhar fica 19,9 cm atrás da bola, no ar; os pés não saem do lugar (0 cm) | sim |
| Pés na largura do quadril, apontando para a frente | consenso | 9 cm do meio, dedos para a frente | sim |
| Uma mão no corrimão, só para equilibrar | consenso | a mão esquerda no corrimão, 22 cm à frente da bola do pé, a 116,8 cm do chão; parada (0 cm); o cotovelo vai de 86° (embaixo) a 54° (em cima) | sim |
| Descida até o calcanhar ficar bem abaixo do degrau, com pausa no alongamento | um estudo (`kassiano2023b`) | embaixo, o calcanhar fica 6 cm abaixo da beirada (6,4 na animação de hoje), parado 1,5 s | sim (ver a dorsiflexão) |
| Subida na ponta dos pés | consenso | o calcanhar sobe até 13,9 cm acima do degrau (como hoje); flexão plantar de 40,9° | sim |
| Joelhos estendidos (o texto: sem dobrar para dar impulso) | consenso | 4° o ciclo todo | sim |
| Equilíbrio (o corpo sobe reto) | consenso (mecânica) | o centro de massa fica a 0 cm da vertical da bola do pé em todos os quadros; a cabeça anda 1,8 cm para a frente e para trás | sim |

**A dorsiflexão embaixo:** 29,3° (aviso da conferência: média 14,8°, máximo observado 48°, CDC). Ela soma duas coisas: o calcanhar 6 cm abaixo da beirada (17,5°) e a inclinação das pernas para a frente que põe o centro de massa sobre a bola do pé, que é o único apoio (11,8°). A média do CDC é passiva e sem carga; aqui o peso do corpo estica a panturrilha, que é o objetivo do exercício. A animação de hoje chegava a 32°. Para ficar abaixo de 20°, o calcanhar teria de descer só uns 2,5 cm, o que deixa de ser "bem abaixo do degrau". Mantive os 6 cm e deixo o número aqui para o Gustavo decidir.

Conferência automática: **0 falha, 2 avisos** (a dorsiflexão, acima; as linhas de desenho da ficha de movimento). Ritmo: salto máximo de 5,8%.

## As vistas

- **De lado** (a primeira): o calcanhar abaixo da quina e na ponta dos pés, com a escada atrás.
- **Três quartos, de trás** (`quinaTras`): mostra as duas panturrilhas (vista padrão do modo Músculos), os calcanhares para fora do degrau e a mão no corrimão. De frente, a escada fica entre a câmera e as pernas; de trás, o corrimão some atrás do corpo.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Descer pouco (de lado) | embaixo o calcanhar para na altura do degrau (0 cm), sem passar a beirada |
| Puxar com a mão (de lado) | o corpo inteiro inclina em linha: embaixo pende para trás, pendurado no braço (o centro de massa 4,8 cm atrás da bola do pé); em cima o braço puxa o corpo para a frente (8 cm à frente) e o cotovelo fica mais dobrado (72° contra 54°) |
| Quicar embaixo | **não desenhado** (ver abaixo) |

## Correções já feitas que esta animação respeita

- `correcoes-ja-feitas.md`: "Degrau = a peça do step (caixa de 15 cm) [...] corrimão do cartão aparece como parede" e "Peças de cena inexistentes [...] escada inteira". Agora há uma escada com degraus e corrimão de verdade, com as medidas da norma; a mão segura o corrimão, como o texto do app pede.
- Panturrilha em vermelho, sem secundário (a biblioteca).

## Medidas provisórias

`bola.daBeirada` (2 cm), `calcanhar.topo` (13,9 cm, da animação de hoje), `corrimao.aFrenteDaBola` (22 cm), `corrimao.aoLado` (40 cm), `bracoLivre.paraFora` (6°); na escada, a largura (90 cm, a norma pede no mínimo 80), quantos degraus aparecem (3) e a seção dos montantes (3 cm, provisória: a norma não dá).

## O que não ficou bom

- **O erro "quicar embaixo" ficou de fora.** É um erro de ritmo (não parar 1 a 2 s embaixo). No motor novo o erro só muda a pose em cada ponto do movimento, não o tempo das fases; a única forma de "não parar embaixo" seria não chegar embaixo, e isso desenha o erro "descer pouco" de novo. Preferi não desenhar um erro duplicado. O texto do app continua descrevendo o erro; se o Gustavo quiser, ele precisa de uma fase por erro no motor (mudança comum, não fiz).
- **A dorsiflexão embaixo passa da média** (29,3°): ver acima.
- **No erro "puxar com a mão", o braço que puxa é o de longe** na vista de lado (o corrimão fica do lado esquerdo para não passar na frente do corpo): o cotovelo aparece atrás do tronco, e a linha vermelha do braço é que mostra a diferença.
