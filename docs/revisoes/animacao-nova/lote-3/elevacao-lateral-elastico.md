# Lote 3 · Elevação lateral com elástico (`elevacao-lateral-elastico`)

De 15/11/2026. A elevação lateral com o tubo com pegadores da tabela.

- **Postura:** em pé, os dois pés pisam no meio do tubo, na largura do quadril, e cada mão segura um pegador, ao lado das coxas.
- **Braço:** o da elevação com halteres aprovada (`elevacao-halteres`). Os dois braços sobem para fora e 30° à frente do plano do corpo, com o cotovelo dobrado 15° e um pouco acima da mão, até a linha do ombro.
- **Tubo:** de cada pegador, desce pelo lado de fora da perna até a borda de fora do pé, passa por baixo dos dois pés e pelo chão entre eles (o caminho da rosca com elástico).

Ainda não está ligada às telas do app.

- **Fontes:**
  - ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral-elastico.md` (ela manda partir da elevação com halteres aprovada);
  - texto do app: `src/conteudo/exercicios/elevacao-lateral-elastico.json`.
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/elevacao-lateral-elastico.json`. Os ângulos do braço, do tronco e os erros vêm da `elevacao-halteres`.
- **Animação:** `src/engine/novo/exercicios/elevacao-lateral-elastico.ts`.
  - Usa o núcleo `exercicios/elevar-o-braco.ts`, com uma opção nova: `criarElevacao(ficha, 'elastico')` (abaixo).
  - O caminho do tubo é o `tuboDaRosca` de `exercicios/rosca-elastico.ts`, sem mudança; o pegador é a peça `pecas-de-cena/elastico-pegador.ts`.
- **Regras:** as da elevação com halteres (`tronco-levemente-a-frente`, `braco-no-plano-da-escapula`, `braco-na-linha-do-ombro`, `cotovelo-acima-da-mao`, `ombro-sem-encolher`, `carga-sem-encostar-nas-pernas`, `tronco-quase-parado`, `peso-perto-do-meio-do-pe`) e três dos elásticos (`elastico-pisado-no-meio-da-sola`, `elastico-livre-do-corpo`, `elastico-nas-maos`). Nenhuma regra nova.
- **Folha:** `../prototipos/folha-elevacao-lateral-elastico.png`. **Quadros:** `../quadros/elevacao-lateral-elastico.png`.

## Mudanças em arquivos comuns (aditivas)

1. **`exercicios/elevar-o-braco.ts`:** o tipo `MaosDaElevacao` ganhou `'elastico'`. Com ela: o pegador do elástico (3,3 cm) na mão, nenhuma carga no equilíbrio, e a folga até a coxa medida ao longo do pegador (cinco esferas do raio dele). O quadro sai só com o corpo e o chão; quem desenha o elástico é a variação.
2. **`movimento.ts`, `rotulos.ts`, `cena.ts`:** o rótulo da ficha ganhou o campo opcional `acima: true`, que põe o texto só acima do corpo (o quadro abre até ele caber). Sem ele, "ombro longe da orelha" ia para o lado esquerdo, em três linhas, e no alto o fio cruzava o braço levantado até a ponta do ombro. Na elevação com halteres o texto já ficava acima, mas por acaso: lá o quadro abria por causa da largura dos halteres.

**Nada muda em quem já existia:** um resumo SHA-1 de todos os quadros (21 instantes, os erros, os dois corpos) e do enquadramento das vistas dá o mesmo nas 62 animações, antes e depois.

## O elástico

Fica o tubo da tabela: 121,9 cm, estiramento máximo de 3 vezes.

| Corpo | Embaixo | Em cima |
|---|---|---|
| Homem | 1,3 vezes (160 cm) | 2,5 vezes (306 cm) |
| Mulher | 1,2 vezes (150 cm) | 2,3 vezes (280 cm) |

Embaixo o tubo fica pouco esticado, sem ficar frouxo ("quase nenhuma tensão embaixo", diz a ficha); estica mais em cima e não passa do máximo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Os dois pés no meio do elástico, na largura do quadril, de tênis | consenso | Os pés ficam a 9 cm do meio. O tubo passa sob a sola a 50% do caminho do calcanhar à bola; o pé fica inteiro no chão (o calcanhar a 0 cm). | sim |
| Cada mão segura uma ponta, ao lado das coxas | consenso | O pegador fica atravessado na palma (palma para dentro), a 1,8 cm da pele da coxa (mulher: 1,3 cm). | sim |
| Joelhos destravados | consenso | 10° (o da elevação com halteres) | sim |
| Tronco levemente inclinado à frente | consenso | O peito inclina 13,3°, parado (a base do pescoço anda 0 cm). | sim |
| Palmas para dentro, cotovelos levemente dobrados | consenso | Pegada neutra; o cotovelo dobra 15° o ciclo todo. | sim |
| Os braços para fora e um pouco à frente (~20° a ~40°) | consenso | 30,5° à frente do plano do corpo, no alto | sim |
| O cotovelo um pouco acima da mão | consenso | No alto, o cotovelo fica 8,1 cm acima do centro da mão. | sim |
| Até a linha dos ombros | consenso | No alto, o cotovelo fica 0,4 cm abaixo do centro do ombro. | sim |
| Ombro longe da orelha | consenso | A clavícula não sobe além do ritmo normal do ombro (0°); a ponta do ombro sobe 1,3 cm com o braço. | sim |
| O elástico estica mais em cima | consenso (física) | 1,3 vezes embaixo, 2,5 vezes em cima | sim |
| ~1–1,5 s subindo, ~2 s descendo | consenso | 1,3 s e 2,1 s | sim |

O tubo passa a no mínimo 2,7 cm da pele (canela). O centro de massa anda de −1,1 a 0,8 cm do meio do pé.

**Conferência automática:** `conferir.mjs` dá **0 falha e 4 avisos**:

1. **"Mais esticado em cima":** o ciclo começa embaixo, como no texto do app, e é ali que o tubo estica menos. É o certo para a elevação (é o mesmo aviso da rosca com elástico).
2. **Linhas de desenho da ficha:** as mesmas da elevação com halteres (`joelho`, `tronco`, `cervical`, `cabeca`, `plano.transicao`, `cotovelo`, `cotovelo.giro`, `carga.folga`) e `elastico.folgaNaPerna`.
3. **A frente do ombro "só ajuda":** como na elevação com halteres aprovada. A ficha desta elevação diz "sem secundário".
4. **A vista de cima mostra pouco do principal** (17 cm², contra 78 de frente): fica fora do modo Músculos, como na elevação com halteres.

Ritmo: o maior salto é de 5,9%. O centro de massa fica sempre dentro do apoio.

## As vistas

- **De frente** (a primeira vista): os dois braços subindo até a linha do ombro, o ombro baixo e o tubo dos pés às mãos.
- **De cima:** o braço um pouco à frente do corpo (o plano da escápula), como na elevação com halteres.
- **Lateral do ombro visível (cm², o pior dos três instantes):**

  | Vista | Homem | Mulher |
  |---|---|---|
  | De frente | 78 | 71 |
  | De três quartos | 55 | 50 |
  | De lado | 23 | 20 |
  | De trás | 19 | 18 |
  | De cima | 17 | 19 |

  **A vista padrão do modo Músculos é a de frente.**

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Balançar o tronco (de lado, em cima) | O tronco começa a 30° e é jogado para trás, com a lombar arqueada 12° e os joelhos estendendo (os números da elevação com halteres). |
| Encolher os ombros (de frente, em cima) | A clavícula sobe 18° além do ritmo normal. |
| Virar elevação frontal (de cima, em cima) | O braço sobe 80° à frente do plano do corpo. |

O tubo acompanha as mãos em todos os erros.

## O que não ficou bom

- **De cima, embaixo,** o corpo visto pela cabeça é um borrão, como na elevação com halteres aprovada (o mesmo enquadramento). No meio e no alto, a vista de cima mostra bem o plano do braço.
- **O rótulo "pise no meio do elástico"** de hoje não entrou: os dois rótulos da vista de frente são as dicas do app (`cues`), e o máximo é dois.

## Risco de o Gustavo não gostar: baixo

O braço, o corpo, os erros e as vistas são os da elevação com halteres aprovada; o tubo é o da tabela, pelo mesmo caminho da rosca com elástico. A única novidade visível é o rótulo de cima, que fica onde já ficava na elevação com halteres.
