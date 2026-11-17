# Lote 4 · Puxada com elástico ancorado no alto (`puxada-elastico`)

De 15/11/2026. Ajoelhado no colchonete, de frente para uma porta fechada, com o meio do tubo com pegadores preso no topo da porta (a âncora de porta fica do lado de lá); uma ponta em cada mão. No alongado, os braços ficam estendidos para cima e para a frente, com os ombros subindo. Na puxada, os ombros descem primeiro e os cotovelos vão até o lado das costelas, com as mãos perto dos ombros. Ainda não está ligada às telas do app.

- **Fontes:** a ficha da técnica (`docs/pesquisa/animacoes/puxada-elastico.md`) e o texto do app (`src/conteudo/exercicios/puxada-elastico.json`).
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/puxada-elastico.json`. O corpo ajoelhado, o braço e os erros vêm da `puxada-unilateral` aprovada.
- **Animação:** `src/engine/novo/exercicios/puxada-elastico.ts`.
  - O corpo ajoelhado e a conta do braço são os da `puxada-unilateral` (copiados, sem mexer nela), agora com os dois braços.
  - O antebraço aponta sempre para a âncora. O elástico puxa a mão em linha reta até ela, como o cabo puxa até a polia.
- **Peça nova:** `pecas-de-cena/elastico-ancora-no-alto.ts`.
  - É a porta com a âncora no topo, ou na altura da testa, no vão da dobradiça.
  - Tem o desenho da porta de `porta-com-ancora.ts`, mas virada: aqui quem treina fica de frente para a porta, e não de costas.
  - A porta e o trecho do tubo perto da âncora são cenário. O tubo sai pela borda do quadro, como na flexão de joelho com elástico.
- **Regras:**
  - novas: `elastico-puxada-cotovelos-nas-costelas` e `elastico-antebraco-na-linha-do-elastico`;
  - dos elásticos: `elastico-livre-do-corpo` e `elastico-nas-maos`;
  - comuns: `ombro-desce` e `tronco-quase-parado`.
- **Folha:** `../prototipos/folha-puxada-elastico.png`. **Quadros:** `../quadros/puxada-elastico.png`.

## O elástico

Fica o tubo da tabela: 121,9 cm, estiramento máximo de 3 vezes. A porta fica onde o tubo já estica 1,12 vez com os braços estendidos. A alça da âncora fica a 205 cm do chão, e a face da porta, 86 cm à frente dos joelhos ("a cerca de um passo"). No fim, o tubo estica 2,1 vezes no homem e 2,0 vezes na mulher. Não precisou do elástico longo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Elástico preso no alto, numa porta fechada, com a âncora do lado de lá | consenso | A alça fica a 205 cm do chão, no meio da porta, e a espuma fica do lado de lá. | sim |
| Ajoelhado, de frente para o ponto, a cerca de um passo; colchonete sob os joelhos | consenso | A face da porta fica 86 cm à frente dos joelhos. Joelhos e pés não saem do lugar. | sim |
| Braços estendidos para cima e um pouco à frente; já esticado | consenso | O tubo estica 1,12 vez. A mão fica 44 cm acima e 45 cm à frente do ombro. | em parte (ver abaixo) |
| No alongado, os ombros sobem; na puxada, descem primeiro | consenso | A ponta do ombro desce 5 cm do início ao fim. | sim |
| Fim: cotovelos ao lado das costelas, mãos perto dos ombros | consenso | O cotovelo fica na altura de 108,9 cm do corpo em pé, entre a crista do quadril (106,5 cm) e a axila (133,2 cm). A mão fica a 17,9 cm do ombro. | sim |
| Tronco parado, reto ou levemente para trás | consenso | O tronco fica 6° para trás, e a base do pescoço anda 0 cm. | sim |
| O elástico pesa mais no fim | consenso (física) | 2,1 vezes no fim | sim |
| ~1 s puxando, ~2 s voltando | consenso | 1,0 s e 2,0 s | sim |

O antebraço segue a linha do elástico (0° de desvio). O tubo passa a no mínimo 14,4 cm da pele.

**Conferência automática:** `conferir.mjs` dá **0 falha e 3 avisos no homem** (4 na mulher):

1. **Flexão plantar do tornozelo de 80,7°:** o peito do pé fica no colchonete. É o mesmo aviso da puxada unilateral aprovada.
2. **"Mais esticado em cima":** o ciclo começa no alongado, onde o tubo estica menos. É o certo para a puxada.
3. **As linhas de desenho da ficha.**
4. **Só na mulher, flexão do cotovelo de 154,9° no fim:** a puxada unilateral aprovada tem 151,6°.

## As vistas

- **De lado** (a primeira vista): mostra o tronco parado, o braço que desce até as costelas, o tubo e a porta.
- **De trás:** mostra os ombros que descem, os dois tubos e o erro de encolher.
- **Dorsal visível (cm²):**

  | Vista | Área |
  |---|---|
  | De trás | 553 |
  | De três quartos, de trás | 399 |
  | De lado | 176 |

  **A vista padrão do modo Músculos é a de trás.**

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Jogar o tronco para trás (de lado, no fim) | O tronco vai de 6° a 30° para trás. |
| Ombros encolhidos (de trás, no fim) | A clavícula fica 14° elevada no fim. |
| Não alongar em cima (de lado, no alongado) | Volta só até 45% do caminho. |

## Correções já feitas que esta animação respeita

- O ombro de trás é secundário, em laranja (decisão de 06/11), com o bíceps. A dorsal é a principal.
- A âncora é a porta que o cartão descreve. O poste da animação de hoje era escolha de desenho do R4.

## O que não ficou bom

- **Os braços, no alongado, ficam a uns 45° da vertical,** e não "para cima e um pouco à frente". Com o tubo de 48 pol preso no topo da porta (205 cm), as mãos só chegam mais perto da vertical da âncora se o tubo ficar frouxo. Para o braço ficar mais em pé, seria preciso um ponto mais alto (uma barra) ou um elástico mais curto. A puxada unilateral aprovada tem o mesmo ângulo até a polia.
- **No alongado, o fio de "tronco parado" passa sobre o ombro direito levantado** (`lateral:tec:f0`). É o mesmo ponto e o mesmo rótulo da puxada unilateral aprovada. Testei a lombar como ponto, e o fio entrava no corpo em todos os quadros.
- **No modo Trajetória, o fio de "cotovelo" passa pelas costas** até o cotovelo, que no fim fica ao lado do tronco. Com "mãos", o nome caía em cima da porta.
- **De trás, a porta inteira aparece atrás do corpo,** como fundo.

## Risco de o Gustavo não gostar: médio

O ângulo dos braços no alongado é o principal motivo, junto com a porta como fundo na vista de trás. A pose ajoelhada e o braço seguem a puxada unilateral aprovada.
