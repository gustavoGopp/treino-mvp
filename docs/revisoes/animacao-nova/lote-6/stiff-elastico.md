# Lote 6 · Stiff com elástico (`stiff-elastico`)

De 15/11/2026. Terceira animação da família dos stiffs e a primeira deste exercício (hoje o app mostra um cartão de texto). O tubo de elástico passa por baixo dos dois pés e sobe até as mãos, na frente das coxas. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/stiff-elastico.md` (a técnica é a do `stiff` aprovado, com o elástico no lugar dos halteres).
- Ficha de movimento: `src/engine/novo/dados/movimentos/stiff-elastico.json`.
- Animação: `src/engine/novo/exercicios/stiff-elastico.ts` (o corpo vem do núcleo `exercicios/dobrar-o-quadril.ts`; o tubo é desenhado neste arquivo).
- Folha: `../prototipos/folha-stiff-elastico.png` (não há animação de hoje para pôr ao lado). Quadros grandes: `../quadros/stiff-elastico.png`.

## O tubo

- **Caminho:** de cada mão, o tubo desce pelo lado de fora da perna até a borda de fora do pé, passa por baixo do meio da sola (de fora para dentro), cruza para o outro pé e sobe do outro lado. Onde a reta da mão ao pé entraria na perna, o tubo passa por fora dela (1 cm de folga). O tubo afina ao esticar (o desenho do elástico já faz isso).
- **"Segure curto: lá embaixo, o elástico ainda deve estar um pouco esticado"** (texto do app). Com o tubo da tabela (121,9 cm em repouso) e este corpo, sem encurtar, ele ficaria frouxo embaixo (o caminho das mãos aos pés mede uns 70 cm). Para estar esticado embaixo, ele dá **uma volta em cada mão**, por cima do pegador (raio de 4,5 cm). A ficha da técnica cita "uma volta na mão" como o passo seguinte da escada do elástico; aqui ela já entra na montagem. É escolha de desenho, a conferir com o Gustavo (ver "o que não ficou bom").
- **Quanto estica (medido):** de 1,1 vezes embaixo a 1,9 vezes em pé (133 a 232 cm), sempre esticado e mais esticado em cima, como a ficha diz ("pesa mais em pé, e quase nada embaixo"). O máximo do fabricante é 3 vezes. A conta trata o tubo inteiro, voltas incluídas, como esticado por igual.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Os dois pés no meio do elástico, na largura do quadril, apontando para a frente | consenso | pés a 9 cm do meio; o tubo passa sob o meio da sola dos dois pés; os pés não saem do lugar (0 cm) | sim |
| Cada mão segura uma ponta na frente das coxas, palmas para você | consenso | mãos a 13 cm do meio, na frente das coxas, segurando o pegador atravessado, palmas para as pernas | sim |
| Joelhos levemente dobrados, quase no mesmo ângulo | consenso | de 8° a 15° | sim |
| Descida ~2–3 s: o quadril vai para trás; as mãos descem rentes às coxas e às canelas | consenso | 2,5 s; o quadril dobra 110° e vai 23 cm para trás; da mão à pele da perna, de 0,8 a 3,5 cm | sim |
| Embaixo: posterior alongado, coluna neutra (depende da flexibilidade) | consenso | as mãos param a 28 cm do chão (meio da canela, como no `stiff`); a lombar não flexiona (0°); o peito fica a 1,5° além da horizontal | sim (ver o `stiff`) |
| Subida ~1–1,5 s, sem jogar o tronco para trás | consenso | 1,3 s; em pé, o quadril dobra 4° e o peito fica 1° à frente da vertical | sim |
| O elástico estica mais em cima | consenso (física) | 1,9 vezes em pé, 1,1 embaixo | sim |

Conferência automática: 0 falha. Avisos: as linhas da ficha de movimento que são escolha de desenho (os ângulos do joelho, a posição das mãos, o raio da mão e da volta, as folgas) e a vista de lado, que não serve ao modo Músculos (a padrão é a de três quartos, de trás: 406 cm²). O ritmo fica suave (6,7%).

**O equilíbrio não conta a força do elástico:** o centro de massa é só o do corpo (sobre o meio do pé). O elástico puxa as mãos para baixo, e essa força depende do elástico de cada pessoa; ela não entra na conta.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Coluna arredondada (de lado) | a bacia inclina 12° menos, a lombar flexiona 24° e a torácica 6° a mais; as mãos descem 3 cm a mais; a cabeça fica no mínimo a 59 cm do chão (no certo, 69), 10 cm acima do centro do joelho |
| Agachar em vez de levar o quadril para trás (de lado) | os joelhos dobram 62°, o quadril desce para 76 cm e o peito inclina 43° |
| Mãos longe das pernas (de lado) | embaixo, as mãos ficam 20,6 cm à frente do tornozelo (no certo, 4,5), e o tubo vai inclinado até o pé |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- O elástico afina ao esticar e fica mais esticado onde a ficha diz (05/11, as 12 do elástico). Respeitada.
- Glúteo em laranja e posteriores da coxa em vermelho, como o `stiff` (02/11). Respeitada.

## O que não ficou bom

- **A volta na mão é uma escolha minha:** sem ela, o tubo da tabela fica frouxo embaixo; com ela, ele está esticado embaixo, como o texto pede. Na ficha da técnica a volta na mão aparece como progressão. Se o Gustavo preferir outro jeito (um elástico mais curto, ou um elástico longo de faixa), é trocar o caminho do tubo; anotei em `pedidos-stiffs.md`.
- **De lado, o fio do rótulo "mãos rentes às pernas" passa por cima da coxa** para chegar à mão (o texto fica fora do corpo).
