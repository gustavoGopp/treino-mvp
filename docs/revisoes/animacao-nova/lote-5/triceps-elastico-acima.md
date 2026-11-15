# Lote 5 · Tríceps acima da cabeça com elástico (`triceps-elastico-acima`)

De 15/11/2026. É o tríceps francês com o elástico. A pessoa fica em pé, um pé à frente do outro, com o tronco quase vertical. O pé de trás pisa no meio de um elástico longo em laço. As duas pontas sobem pelas costas, e as duas mãos seguram juntas a ponta de cima, atrás da cabeça. Os braços ficam parados ao lado das orelhas, e só os antebraços estendem. A animação ainda não está ligada às telas do app.

- **Ficha da técnica:** `docs/pesquisa/animacoes/triceps-elastico-acima.md`. **Texto do app:** `src/conteudo/exercicios/triceps-elastico-acima.json`.
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/triceps-elastico-acima.json`. Os ângulos do braço e do cotovelo vêm do `triceps-frances` aprovado.
- **Animação:** `src/engine/novo/exercicios/triceps-elastico-acima.ts`, sobre o núcleo `exercicios/triceps-frances-base.ts`. O núcleo ganhou a carga `elastico`, numa mudança aditiva descrita abaixo.
- **Núcleo novo dos elásticos:** `exercicios/elastico-faixa.ts`. Ele calcula o caminho do elástico esticado em volta do corpo: o caminho mais curto que contorna a pele pelo lado pedido, no plano entre as duas pontas.
- **Peça nova:** `pecas-de-cena/elastico-longo.ts`. É a faixa chata, que estreita ao esticar. O objeto novo fica em `dados/objetos/elastico-longo.json`.
- **Regras novas:** `regras/elasticos.ts`, com os ids `elastico-pisado-no-meio-da-sola`, `elastico-livre-do-corpo` e `elastico-nas-maos`. A animação também usa cinco regras do francês, que servem como estão: braço parado, cotovelos perto da cabeça, alonga atrás da cabeça, estende em cima e costas retas.
- **Folha:** `../prototipos/folha-triceps-elastico-acima.png`. **Quadros grandes:** `../quadros/triceps-elastico-acima.png`.

## Por que outro elástico

O tubo da tabela tem 121,9 cm e estica no máximo 3 vezes. O caminho que a ficha pede vai das mãos atrás da cabeça, pelas costas, até o pé de trás, e volta. Nesta pose ele mede de 328 a 438 cm, ou seja, de 2,7 a 3,6 vezes o tubo. Isso passa do máximo do fabricante, e foi o que travou a tentativa anterior.

O cartão admite "um elástico longo". Por isso entrou o elástico em laço de 41 pol (`elasticoLongo`):

| Medida | Valor | Tipo | Fonte |
|---|---|---|---|
| Laço deitado | 104,1 cm | medida | RubberBanditz |
| Volta inteira (`comp`) | 208,3 cm | derivada | 2 × 41 pol |
| Largura da faixa média | 1,27 cm | medida | RubberBanditz |
| Espessura | 4,5 mm | medida | Serious Steel #1 |
| Estiramento máximo (`esticaAte`) | 2,5 vezes | medida | RubberBanditz: "can stretch 2.5 times its resting length" |
| Diâmetro da faixa franzida na mão | 2,2 cm | provisória | — |

Com ele, a faixa estica de 1,6 a 2,1 vezes no homem e de 1,5 a 1,9 vezes na mulher. Nunca fica frouxa e nunca passa de 2,5.

## O que mudou no núcleo do francês (aditivo)

- A carga `elastico`: em pé, como a corda e o estribo, com a pegada neutra do estribo e o diâmetro da faixa franzida na mão. O núcleo devolve só o corpo e o chão; quem usa o núcleo monta a faixa.
- O ramo da polia alta passou de `else if (emPe)` para `else if (carga === 'corda')`. Para a corda, o resultado é o mesmo.
- Os quatro tríceps franceses já feitos (`triceps-frances`, `-halter`, `-kettlebell`, `-polia-unilateral`) dão saída idêntica com o núcleo antigo e com o novo. Conferi assim:
  - o resumo SHA-1 de todos os quadros de 21 instantes, com todos os erros e os dois corpos, é o mesmo;
  - a saída de `conferir.mjs` é a mesma.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Em pé, um pé à frente do outro; o pé de trás pisa no meio do elástico | consenso | O pé direito fica 22 cm à frente e o esquerdo 12 cm atrás, inteiro no chão. A faixa passa a 50% do caminho do calcanhar à bola do pé, a 0,2 cm do chão. Os pés não saem do lugar. | sim |
| As pontas sobem pelas costas; as mãos as seguram juntas atrás da cabeça | consenso | A faixa passa a no mínimo 0,5 cm da pele (tronco). O centro de cada mão fica sobre a faixa (0 cm). As mãos ficam a 14 cm uma da outra, de centro a centro. | sim |
| Com as mãos atrás da cabeça, o elástico já um pouco esticado | consenso | 1,6 vezes no alongado (1,5 na mulher) | sim |
| O elástico estica mais com os braços estendidos, sem passar do máximo | consenso (física) | 2,1 vezes em cima (1,9 na mulher); o máximo do fabricante é 2,5 | sim |
| Joelhos destravados, abdômen firme | consenso | O joelho da frente fica a 20°. O peito fica a 3° da vertical, parado, e a lombar não muda. | sim |
| Braços acima da cabeça, ao lado das orelhas, cotovelos perto da cabeça | consenso | O braço fica a 170,4° do braço pendurado e 6° para o meio. Os cotovelos ficam a 29,9 cm um do outro (ombros: 40,8 cm). | sim |
| Alongado: mãos atrás da cabeça, cotovelos bem dobrados | consenso | O cotovelo fica a 134,8°, e o centro da mão, 20,9 cm atrás da parte de trás da cabeça. | sim |
| Só o cotovelo estende; os cotovelos ficam parados | consenso | O cotovelo anda 0 cm e o braço gira 0°. O cotovelo vai de 134,8° a 8°. | sim |
| ~1 s estendendo, ~2–3 s voltando | consenso | 1,1 s e 2,4 s | sim |

**Conferência automática:** `node scripts/animacao-nova/conferir.mjs triceps-elastico-acima` dá **0 falha e 3 avisos**:

1. **Dorsiflexão do tornozelo de trás:** 16,6° no homem e 19,5° na mulher, acima da média de 14,8°. O pé de trás fica inteiro no chão para prender a faixa, com a perna inclinada para trás.
2. **"Mais esticado em cima":** o ciclo começa no alongado, como pede o texto do app ("Alongado" é a primeira fase), e ali a faixa estica menos. Isso é o certo para este exercício. A ficha diz que a tensão é menor atrás da cabeça.
3. **Linhas da ficha de movimento que são escolha de desenho.**

Ritmo: o maior salto é de 6,5%. O centro de massa fica sempre dentro do apoio dos pés.

## As vistas

- **De lado** (a primeira vista): mostra o braço parado, o antebraço que vai para trás da cabeça, a faixa esticada até o pé de trás e o pé de trás pisando na faixa.
- **De frente** (a segunda vista): mostra os cotovelos perto da cabeça e o erro de abrir os cotovelos.
- **Tríceps visível (cm²):**

  | Vista | Área |
  |---|---|
  | De três quartos | 100 |
  | De frente | 67 |
  | De lado | 61 |
  | De três quartos, de trás | 19 |
  | De cima | 16 |
  | De trás | 0 |

  Testei a de três quartos. De três quartos, o corpo fica de costas, a faixa passa por cima do braço e o erro de abrir não se lê. Ficou a de frente. **A vista padrão do modo Músculos é a de frente.**

## Erros

| Erro (texto do app) | Quadro | O que o boneco faz |
|---|---|---|
| Abrir os cotovelos | de frente, no alongado | O braço abre 22° para fora e fecha estendendo; as mãos continuam na faixa. |
| Cotovelos sobem e descem | de lado, no alongado | O braço desce à frente até 135°, como um pullover. |
| Arquear as costas | de lado, em cima | A lombar estende 12° e a torácica 4° enquanto as mãos sobem. |
| Não alongar atrás da cabeça | de lado, no alongado | A volta para com o cotovelo a 90°. |

## O equipamento

O elástico longo em laço é uma peça própria do gerador realista (`pecas-de-cena/elastico-longo.ts`):

- é uma faixa chata, com a borda escura, a face na cor do elástico dos outros cartões e um filete claro no meio;
- tem a largura de fábrica dividida pela raiz de quanto estica;
- é pintada em pedaços de 4 cm, cada um na sua profundidade.

## Correções já feitas que esta animação respeita

- Onde o elástico passa sob os pés ou pelas costas, é isso que se desenha (05/11).
- O erro `arco` pedido pelo cartão (05/11).
- O músculo é o tríceps principal, sem secundário, como na biblioteca.

## O que não ficou bom

- **De frente, com os braços estendidos,** aparecem dois traços curtos da faixa entre os antebraços, logo abaixo das mãos (`frontal:tec:f1`). É onde a faixa sai das mãos e desce para trás da cabeça; na pose, ela passa ali de verdade.
- **As mãos ficam a 14 cm uma da outra, de centro a centro,** e não coladas. Com 11 cm, o giro do antebraço que o núcleo resolve a cada quadro dá um tranco (61% de salto de velocidade). Ficou o valor sem tranco.
- **O passo é curto:** 22 cm à frente e 12 cm atrás. Hoje o passo é de 24 e 26 cm. Com o pé de trás inteiro no chão sobre a faixa, um passo mais longo deixa a perna de trás sem alcance.
- **O braço fica a 170,4°,** e não aos 166,6° do francês aprovado. Com o tronco em pé (no francês, ele inclina 27°), os 166,6° deixavam as mãos 14 cm à frente da cabeça em cima, e a faixa passava pelos lados da cabeça. A elevação média do ombro é 170°.

## Risco de o Gustavo não gostar: médio

O exercício usa um elástico que não está na tabela de hoje: o laço de 41 pol, no lugar do tubo com pegadores. Ele é diferente do que a animação de hoje mostra. O estiramento máximo vem de um fabricante só (RubberBanditz). A pose em pé, o braço e os erros seguem o francês aprovado.
