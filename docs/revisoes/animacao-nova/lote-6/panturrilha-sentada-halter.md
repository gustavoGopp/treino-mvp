# Lote 6 · Panturrilha sentada com halter no joelho (`panturrilha-sentada-halter`)

De 15/11/2026. Sentado na ponta do banco reto, o tronco reto e parado; a bola dos pés na beirada de um degrau baixo (o step, na altura de 15 cm), os calcanhares no ar; o halter deitado atravessado sobre a coxa direita, perto do joelho, sobre uma toalha dobrada, com as duas palmas em cima das cabeças. O ciclo começa pela descida (como o cartão e a animação de hoje): desce em 2 s, pausa de 1 s embaixo, sobe em 1 s. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-sentada-halter.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-sentada-halter.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-sentada-halter.ts` (o pé gira na bola como nas panturrilhas em pé; o quadril fica parado no banco). É a primeira animação sentada do motor novo: o arquivo resolve a altura do quadril (o glúteo e a coxa apoiam no tampo do banco, amassando 1 cm, medido na superfície do Boneco), a distância do degrau (a que deixa o joelho a 90°) e a altura do halter (as cabeças à espessura da toalha da superfície das coxas do Boneco).
- Peças: o banco reto (`bancoReto`, só a ponta conta no enquadramento), o step (peça nova da família, `pecas-de-cena/degrau.ts`), o halter e a toalha dobrada (uma faixa de felpa, na cor da toalha da flexão de joelho deslizante, deitada na coxa debaixo do halter).
- Regras novas: `joelhos-a-90-sentado` e `halter-sobre-a-coxa-perto-do-joelho` (`regras/panturrilhas.ts`); `tronco-quase-parado` já existia.
- Folha: `../prototipos/folha-panturrilha-sentada-halter.png`. Quadros: `../quadros/panturrilha-sentada-halter.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado, joelhos a ~90°, pés na largura do quadril | consenso | sentado na ponta do banco de 43,5 cm, o centro do quadril a 52,2 cm do chão; o joelho de 85,5° (em cima) a 90° (calcanhar na altura do apoio) e 86,3° embaixo; pés a 9 cm do meio | sim |
| A ponta dos pés num apoio baixo (uma anilha, um livro grosso, um degrau) | consenso | a bola do pé 2 cm para dentro da beirada do step de 15 cm (o degrau); os pés não saem do lugar (0 cm) | sim (ver abaixo) |
| O halter deitado sobre a coxa, perto do joelho, com uma toalha dobrada por baixo | consenso | o cabo atravessado sobre a coxa direita, 8 cm do centro do joelho ao longo da coxa (6 cm na animação de hoje), 15,8 cm acima do eixo da coxa; a toalha de 2 cm entre as cabeças e a coxa | sim |
| As duas mãos segurando o halter a série inteira | consenso | as duas palmas em cima das duas cabeças, os dedos para o joelho; andam com o halter | sim |
| Descida ~2 s até o alongamento máximo; pausa ~1 s embaixo | um estudo (`kassiano2023b`) | 2 s; o calcanhar desce 8,5 cm abaixo da beirada (dorsiflexão de 14,3°); 1 s parado | sim |
| Subida ~1 s, o calcanhar o mais alto possível, sem o tronco levantar | consenso | 1 s; o calcanhar 10 cm acima do apoio (flexão plantar de 54,4°); a base do pescoço não se move (0 cm) | sim |

Conferência automática: **0 falha, 2 avisos**: as linhas de desenho da ficha de movimento e a pronação do antebraço esquerdo (93,6°; média 80°, máximo observado 108°, CDC): a mão esquerda vem do outro lado do corpo para a cabeça de dentro do halter, espalmada; com os dedos apontando um pouco para dentro (parâmetro `maoL.paraDentro`) a pronação caiu de 137° (falha) para 93,6°. Ritmo: salto máximo de 6,4%.

**O apoio dos pés:** a ficha pede "um apoio baixo" e cita "um degrau". Usei o step da família (15 cm): a anilha da tabela tem 2,4 cm, o que deixa o calcanhar descer pouco, e um livro grosso não tem medida pública. Com 15 cm, a coxa sobe um pouco do quadril ao joelho (o quadril a 52 cm, o joelho a 60–66 cm).

## As vistas

- **De lado** (a primeira e a do modo Músculos: 105 cm² da panturrilha à vista, contra 87 de três quartos): o calcanhar descendo abaixo da beirada e subindo, o tronco parado, o halter na coxa.
- **De três quartos, pela frente** (`quina`): o halter atravessado na coxa com as duas mãos, a toalha, os dois pés no degrau. Testei a de três quartos de trás (o banco fica na frente das pernas), a de trás (o banco e o tronco tapam as pernas) e a de frente (as coxas vêm para a câmera e o halter parece no peito).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Amplitude curta (de lado) | o calcanhar só faz 40% do caminho, em volta do meio: de 3 cm abaixo a 4,7 cm acima do apoio (o certo: de 8,5 abaixo a 10 acima) |
| Levantar o tronco (de lado) | na subida a lombar estende 10° e a torácica 12°: a cabeça vai 15 cm para trás |
| Halter escorregando (de lado) | o halter escorrega para 22 cm do joelho, e as mãos vão com ele |

## Correções já feitas que esta animação respeita

- `correcoes-ja-feitas.md`: "Halter em 3D encostado na coxa, 6,5 cm acima do joelho; o ciclo começa pela descida (como o cartão), em 4 fases." Respeitado: halter 3D atravessado na coxa perto do joelho, ciclo em 4 fases começando pela descida. E o defeito do diagnóstico de hoje (o calcanhar atravessava o chão em 1,55 cm) não existe aqui: o calcanhar desce abaixo do degrau, no ar.
- Panturrilha em vermelho, sem secundário (a biblioteca).

## Medidas provisórias

`assento.amassa` (1 cm), `banco.frenteDoQuadril` (10 cm), `bola.daBeirada` (2 cm), `calcanhar.embaixo` (8,5 cm, escolhido pela dorsiflexão), `calcanhar.topo` (10 cm), `halter.doJoelho` (8 cm), `maoL.paraDentro` (0,6), `toalha.esp` (2 cm, das 4 camadas da toalha da tabela, cuja espessura é provisória).

## O que não ficou bom

- **A cabeça de dentro do halter passa por cima da outra coxa.** Com os pés na largura do quadril, as coxas ficam quase encostadas, e o halter de 33 cm atravessado numa coxa só apoia também na outra (a altura dele é calculada pela coxa mais alta debaixo dele). É o que acontece na vida real com esse halter; não mudei a largura dos pés, que a ficha pede.
- **A pronação da mão esquerda passa da média** (93,6°): ver acima.
- **O corpo fica menor no quadro de lado** que nas panturrilhas em pé (sentado, com o banco e o degrau dos dois lados). Só a ponta do banco conta no enquadramento (25 cm).
