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

## Correção de 19/11 (peso dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), a regra `peso-fora-do-corpo` (a superfície do peso contra o volume do corpo, fora as mãos que seguram, no ciclo e em cada erro em 9 instantes; tolerância de 0,5 cm) e a checagem de pesos da conferência da pintura foram passadas em todas as animações com peso livre. Nesta, **no erro "Halter escorregando"** (da metade em diante), o halter ia sempre a 22 cm do joelho, e a cabeça de dentro, que passa por cima da outra coxa, **entrava 10,3 cm na barriga** (12,2 cm pela checagem da pintura). O ciclo e os outros erros não tinham peso dentro do corpo.

**A mudança.**

- No erro, o halter escorrega pela coxa, para o quadril (a coxa fica inclinada para lá), **até a cabeça de dentro encostar na barriga, e para ali**: o maior escorregão em que ela não entra na barriga, menos meio centímetro (`erro.halter.encosto` e `erro.halter.recuo`; o halter desenhado já entrava 1,1 cm no primeiro toque do prisma da regra), e não mais que os 22 cm de antes. Calibrado no fim da subida e guardado no preparo (`panturrilha-sentada-halter:halter-escorregado`): no corpo do app, 10,2 cm do joelho.
- O ciclo e os outros dois erros não mudam.

| medido (homem) | antes | depois |
|---|---|---|
| a cabeça do halter entra no corpo (erro "Halter escorregando") | 10,3 cm (barriga) | 0 cm |
| onde o halter para no erro | 22 cm do joelho | 10,2 cm do joelho (8 no certo) |

A ficha liga `peso-fora-do-corpo`: medida no estado de antes, ela falha (10,3 cm, no tronco, no erro "Halter escorregando"); no de agora, passa (o peso não entra no corpo). O antes e depois está em `correcao-das-antigas/panturrilha-sentada-halter-peso.png`; os quadros grandes foram regravados (`quadros/panturrilha-sentada-halter.png`) e olhados vista por vista, quadro a quadro e erro a erro, nos dois lados do corpo. A conferência automática dá **0 falhas e 3 avisos** (antes: 0 falhas e 4 avisos, entre eles o de pesos).

**O que ainda não ficou bom.**
- **O escorregão ficou curto** (2,2 cm além do lugar certo) e o erro se lê menos que antes: com o halter de 33 cm atravessado na coxa, a cabeça de dentro passa por cima da outra coxa e chega à barriga logo. É o que acontece nesse corpo; para o erro se ler mais, ele teria de ser outro (o halter escorregando para fora da coxa, com a mão esquerda solta, como diz o cartão: "uma mão solta e o halter desliza da coxa"). Não fiz, porque muda o erro aprovado; fica para o Gustavo decidir.

## Erro novo de 19/11 (o halter desliza da coxa)

O Gustavo decidiu, em 19/11: "pode mudar o erro, como diz o cartão". O cartão diz, para "Halter escorregando": "Uma mão solta e o halter desliza da coxa. As duas mãos nele, a série inteira." O erro da correção da manhã (o halter escorregando pela coxa até a barriga) ficava só 2,2 cm além do lugar certo e quase não se lia.

**O que o erro mostra agora (de frente).**

- **A mão esquerda solta** a cabeça de dentro no primeiro quarto do erro: sobe 4 cm, aberta, e vai só um pedaço do caminho atrás do halter (`erro.halter.maoSoltaAte`, `erro.halter.maoSobe`, `erro.halter.maoSegue`), sem tocá-lo.
- **O halter desliza para fora da coxa direita**, ao longo do cabo (24 cm, `erro.halter.saiDeLado`, nos primeiros 70% do erro): passa da beirada da toalha, que fica parada na coxa.
- **E gira e desce pela lateral da coxa** (65° em volta do eixo da coxa, a partir de 30% do erro, `erro.halter.gira`): a cabeça de fora desce ao lado da coxa e a de dentro fica apoiada na beirada da toalha. O quanto ele desce não é escolhido: em 9 instantes do erro, o halter desce até o primeiro toque na toalha ou nas coxas e para 0,3 cm acima (`erro.halter.folga`); entre os instantes, a reta. A conta fica guardada no preparo (`panturrilha-sentada-halter:halter-de-lado`).
- **A mão direita continua segurando** a cabeça de fora e vai com o halter.
- **A vista do erro passou de lado para de frente.** De lado, o halter sai na direção de quem olha e quase não anda no desenho. De frente, o deslize para fora e o giro se leem de relance. Testei as outras: de três quartos pela frente (`quina`), o halter termina em pé ao lado da coxa, parte atrás do braço direito, e o deslize vem na direção de quem olha; de cima, o braço direito tapa a cabeça de fora. A linha do erro passou para o braço esquerdo (a mão que solta), com o fantasma tracejado do lugar certo dela.
- O ciclo, os outros dois erros, a pose e as peças (o banco, o step, a toalha, o halter) não mudam.

| medido (homem, no erro "Halter escorregando") | antes (de manhã) | agora |
|---|---|---|
| a mão esquerda | no halter (andava com ele) | solta: sai 12,4 cm do lugar na cabeça de dentro; fica de 3,1 a 8,8 cm do halter depois de soltar; entra 0 cm nele |
| a mão direita (o centro dela ao centro da cabeça de fora) | 8,6 cm | 8,6 cm o erro inteiro (segura) |
| onde o halter vai | pela coxa, para o quadril: 10,2 cm do joelho (2,2 cm além do certo) | para fora: o centro dele termina 18,1 cm por fora da lateral da coxa direita |
| a cabeça de fora | — | desce 19,6 cm (termina na altura da parte de baixo da coxa, ao lado dela) |
| o giro do halter | 0° | 65° |
| o halter dentro do corpo (regra `peso-fora-do-corpo`, ciclo e erros, 207 quadros) | 0 cm | 0 cm |
| a menor folga do halter ao corpo, fora a mão direita que segura (17 instantes do erro) | — | 1,3 cm (antebraço direito, que segura); 1,9 cm da coxa direita, quando ele passa por cima da toalha; 2,7 cm da mão esquerda depois de soltar; no fim, mais de 10 cm da coxa |
| o halter dentro da toalha (33 instantes do erro) | — | 0 cm |

**Regras.** A ficha liga duas regras novas (`regras/panturrilhas.ts`), além de `peso-fora-do-corpo`:

- `panturrilha-sentada-maos-no-halter`: no ciclo, as duas mãos ficam paradas no halter (o centro de cada mão ao centro da cabeça que ela segura não muda: 8,6 e 9,2 cm); no erro, a direita continua parada no halter (8,6 cm o erro inteiro) e a esquerda solta: sai pelo menos 4 cm do lugar, não entra no halter (medido pela superfície, com a mão contando como corpo) e fica de 0,5 a 12 cm dele depois de soltar.
- `panturrilha-sentada-halter-sai-de-lado`: no fim do erro, o centro do halter fica por fora da lateral da coxa e a cabeça de fora desceu; em 33 instantes, o halter não entra na toalha.

Para medir a mão que soltou, a medida comum `pesoNoCorpo` (`regras/peso-fora-do-corpo.ts`) ganhou um segundo argumento opcional (`partes`: só as partes que ele aceita; `maosSoltas`: as mãos que contam mesmo perto do peso). Sem ele, a medida é a mesma de antes: nenhuma outra animação muda (o preparo das outras 170 não mudou).

Conferência automática: **0 falhas e 3 avisos** (os mesmos três de antes: a pronação da mão esquerda, as linhas de desenho e a pintura). O aviso de pintura ganhou dois achados de frente, porque a vista de frente passou a ser conferida: a toalha pintada por cima do alto das duas coxas, junto dos joelhos, no fim da subida (2 e 1,8 cm², em 1 quadro; ver abaixo).

Os quadros grandes (`quadros/panturrilha-sentada-halter.png`) foram regravados com o erro de frente no começo, no meio e no fim, de três quartos, de cima, com a cor de pele e no tema escuro; olhei o erro de frente, de três quartos, de cima e de lado, no começo, em três instantes do meio e no fim, nos dois lados do corpo (e medi 17 a 33 instantes). O antes e depois (o erro da correção de 19/11 de manhã, de lado, e o novo, de frente, no começo, no meio e no fim) está em `correcao-das-antigas/panturrilha-sentada-halter-peso.png`.

**O que ainda não ficou bom.**

- **O halter termina longe da coxa** (o centro a 18 cm da lateral dela), e não encostado nela. A toalha é desenhada como uma placa reta de 37 cm, que passa 13 cm da lateral da coxa; para descer, o halter precisa passar da beirada dela. Não mudei a toalha (ela faz parte da pose do ciclo).
- **A pintura da toalha de frente:** no fim da subida, a borda da toalha fica pintada por cima do alto dos joelhos (2 cm², poucos traços). É da toalha de sempre, vista de frente pela primeira vez; não mudei a ordem de pintura dela, que mudaria as outras vistas.
- **A mão esquerda, de frente, fica na frente do peito,** perto do braço direito: lê-se como a mão que soltou, mas os dedos apontam para quem olha e a mão fica curta no desenho.
- **O meio do erro é pouco físico:** o halter passa da beirada da toalha ainda deitado, com a cabeça de fora no ar, antes de girar; quem o sustenta é a mão direita.
