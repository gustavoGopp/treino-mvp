# Lote 5 · Rosca com elástico (`rosca-elastico`)

De 15/11/2026. A rosca com o tubo com pegadores da tabela.

- **Postura:** em pé, os dois pés pisam no meio do tubo, na largura do quadril, e cada mão segura um pegador.
- **Braço:** o da rosca alternada aprovada. O úmero fica parado ao lado do tronco e só o antebraço sobe, com os dois braços juntos e as palmas para a frente.
- **Tubo:** de cada pegador, desce pelo lado de fora da perna até a borda de fora do pé. Passa por baixo dos dois pés e pelo chão entre eles.

Ainda não está ligada às telas do app.

- **Fontes:**
  - ficha da técnica: `docs/pesquisa/animacoes/rosca-elastico.md`;
  - texto do app: `src/conteudo/exercicios/rosca-elastico.json`.
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/rosca-elastico.json`. Os ângulos do braço e os erros vêm da `rosca-alternada`.
- **Animação:** `src/engine/novo/exercicios/rosca-elastico.ts`.
  - Usa `bracoDaRosca` e `corpoEmPe` de `exercicios/dobrar-o-cotovelo.ts` sem mexer neles.
  - O caminho do tubo sai de `exercicios/elastico-faixa.ts`.
- **Peça nova:** `pecas-de-cena/elastico-pegador.ts`, o pegador do tubo com o mesmo desenho do de `equipamento.ts`.
  - A pegada é pintada atrás da mão. De frente, em cima, ela ficava por cima dos punhos, como uma barra preta.
  - O `equipamento.ts` não foi alterado.
- **Regras:**
  - usa quatro regras das roscas (`cotovelo-parado-na-rosca`, `braco-estendido-embaixo-na-rosca`, `carga-perto-do-ombro-no-topo`, `palma-para-a-frente-na-rosca`) e a comum `tronco-quase-parado`;
  - usa três regras dos elásticos (`elastico-pisado-no-meio-da-sola`, `elastico-livre-do-corpo`, `elastico-nas-maos`);
  - ganhou uma regra nova, `elastico-bracos-juntos`.
- **Folha:** `../prototipos/folha-rosca-elastico.png`. **Quadros:** `../quadros/rosca-elastico.png`.

## O elástico

Fica o tubo da tabela: 121,9 cm, estiramento máximo de 3 vezes.

| Corpo | Embaixo | Em cima |
|---|---|---|
| Homem | 1,4 vezes (168 cm) | 2,3 vezes (277 cm) |
| Mulher | 1,3 vezes | 2,1 vezes |

O tubo já começa um pouco esticado, estica mais em cima, como a ficha diz, e não passa do máximo. Não precisou do elástico longo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Os dois pés no meio do elástico, na largura do quadril | consenso | Os pés ficam a 9 cm do meio. O tubo passa sob a sola a 50% do caminho do calcanhar à bola do pé; o pé fica inteiro no chão. | sim |
| Cada mão segura uma ponta | consenso | O pegador fica atravessado na palma, e a mão fecha nele (diâmetro de 3,3 cm). | sim |
| Já um pouco esticado com os braços estendidos | consenso | 1,4 vezes | sim |
| Braços estendidos embaixo | consenso | O cotovelo fica a 8°. | sim |
| Palmas para a frente | consenso | O antebraço fica supinado 80°. | sim |
| Cotovelos ao lado do tronco, parados; os dois antebraços sobem juntos | consenso | O cotovelo anda 0 cm. O braço fica 0° à frente e 12° aberto. A diferença entre os dois cotovelos é 0°. | sim |
| Topo: mãos perto dos ombros | consenso | A pegada fica a 26,3 cm do centro do ombro, com o cotovelo a 132°. | sim |
| Tronco parado | consenso | A base do pescoço anda 0 cm. | sim |
| O elástico estica mais em cima | consenso (física) | 2,3 vezes em cima | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s e 2,2 s | sim |

O tubo passa a no mínimo 3,1 cm da pele (canela).

**Conferência automática:** `conferir.mjs` dá **0 falha e 2 avisos**:

1. **"Mais esticado em cima":** o ciclo começa embaixo, como no texto do app, e é ali que o tubo estica menos. É o certo para a rosca. O aviso foi escrito para o agachamento, que começa em pé.
2. **Linhas de desenho da ficha:** `braco.paraFora` e `elastico.folgaNaPerna`.

Ritmo: o maior salto é de 6,1%. O centro de massa fica sempre dentro do apoio.

A regra `elastico-nas-maos` mede a pegada contra o pegador, que o desenho põe no centro da mão. Por isso ela dá 0 cm por construção.

## As vistas

- **De lado** (a primeira vista): mostra o cotovelo parado, o antebraço que sobe e o tubo do pé à mão.
- **De frente:** mostra os dois pés no meio do elástico, os dois braços juntos e o bíceps.
- **Bíceps visível (cm²):**

  | Vista | Área |
  |---|---|
  | De frente | 192 |
  | De três quartos | 124 |
  | De lado | 53 |

  **A vista padrão do modo Músculos é a de frente.** A de lado fica fora do modo Músculos (menos de um terço da melhor), e a conferência completa dá esse aviso. Nas roscas aprovadas é igual.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Balançar o tronco (de lado, em cima) | O peito vai 12° para trás e a lombar arqueia 6°; o quadril vai à frente pelo equilíbrio (os números da alternada). |
| Cotovelos vão para a frente (de lado, em cima) | O braço sobe 35° à frente e o cotovelo dobra só até 115°. |
| Não estender os braços (de lado, embaixo) | O cotovelo fica dobrado 55°. |

## O que não ficou bom

- **De frente, embaixo,** as mãos ficam a 63 cm uma da outra. O braço abre 12° e a palma vira para a frente, então os pegadores ficam afastados das coxas. Com o braço mais fechado, o pegador (12,7 cm) entra na coxa.
- **De frente, em cima,** aparece um pouco da fita do pegador saindo do punho para o tubo. É onde ela passa.

## Risco de o Gustavo não gostar: baixo

O braço, os erros e as vistas são os da rosca alternada aprovada. O elástico é o tubo da tabela, como no stiff e no agachamento com elástico.
