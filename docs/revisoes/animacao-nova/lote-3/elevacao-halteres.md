# Lote 3 · Elevação lateral com halteres (`elevacao-halteres`)

De 15/11/2026. Segunda animação da família dos ombros no motor novo. A ficha da técnica confirma que é a **elevação lateral** (não a frontal), em pé, com o tronco levemente inclinado à frente. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-halteres.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-halteres.json`.
- Animação: `src/engine/novo/exercicios/elevacao-halteres.ts`, sobre o núcleo comum das elevações (`exercicios/elevar-o-braco.ts`, descrito em `elevacao-lateral.md`).
- Regras medidas: `src/engine/novo/regras/ombros.ts` (as mesmas da polia) e `tronco-levemente-a-frente` (`conferir.ts`).
- Folha ao lado da de hoje: `../prototipos/folha-elevacao-halteres.png`. Quadros grandes: `../quadros/elevacao-halteres.png`.

## O que muda em relação à polia

- Os dois braços sobem (simétrico), com um halter em cada mão, o cabo na direção do polegar (palmas para dentro embaixo, para baixo no alto).
- A bacia inclina 12° à frente com a coluna neutra (o peito fica 13° à frente da vertical); o quadril fica parado no ângulo do equilíbrio do meio da subida, com os halteres na conta.
- Embaixo, o braço pende num plano 75° à frente do plano do corpo (55° até 15/11/2026, com o halter de 25 lb), e a elevação do braço sai da folga de 1,5 cm entre a cabeça do halter e a pele da coxa. O braço passa para o plano da subida na primeira metade do caminho.
- **Desde 15/11/2026 (lote 5), o halter é o sextavado de 10 lb** (`dados/objetos/halter-leve.json`): ver `../lote-5/relatorio-halter-leve.md`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, joelhos destravados | consenso | pés a 9 cm do meio; joelhos a 10°; os pés não saem do lugar (0 cm) | sim |
| Tronco levemente inclinado à frente | consenso | peito a 13,3° da vertical (a regra pede de 5° a 25°); a base do pescoço não se move (0 cm) | sim |
| Halteres na frente das coxas, palmas para dentro, cotovelos levemente dobrados | consenso | palmas para dentro, cotovelos a 15°; o centro da mão fica 16 cm para fora do meio do corpo e 19,5 cm à frente do centro da bacia, na frente da coxa, com a cabeça do halter a 2,7 cm da pele da coxa (antes, com o halter de 25 lb: 23 cm para fora, ao lado da coxa) | sim |
| Subida ~1–1,5 s; braços para fora e um pouco à frente | consenso | 1,3 s; no alto, o braço fica 30,5° à frente do plano do corpo (o texto aceita ~20° a ~40°) | sim |
| Cotovelo um pouco acima da mão | consenso | no alto, o cotovelo fica 8,1 cm acima do centro da mão | sim |
| Topo: braços na linha dos ombros | consenso | o cotovelo fica 0,4 cm abaixo do centro do ombro (o úmero a 89° da vertical) | sim |
| Ombro longe da orelha | consenso | a clavícula sobe de 11° a 14,5°, só o ritmo normal (0° a mais); a ponta do ombro sobe 1,3 cm | sim |
| Descida ~2 s, controlando | consenso | 2,1 s, pelo mesmo caminho | sim |
| Equilíbrio | mecânica | com o quadril parado, o centro de massa (corpo + 2 × 4,5 kg) anda de −1,7 a +2,0 cm do meio do pé (a regra pede a metade do meio do pé, ±5 cm) | sim |

Conferência automática: **0 falha**. Avisos: as linhas que são escolha de desenho (joelho, inclinação do tronco, pescoço, transição do plano, cotovelo e o giro dele, a folga e a massa do halter), a frente do ombro listrada como "só ajuda" (decisão de 02/11) e a vista de cima, que não serve ao modo Músculos (10 cm² da lateral do ombro, contra 78 de frente). Ritmo: salto de 13,4% (limite 15%; com o plano de baixo a 75° e a transição em 40%, era 16,8%, por isso a transição passou a 50%). Supinação do antebraço até 15,5°.

**Por que o quadril fica parado:** no núcleo dos stiffs, o quadril sai do equilíbrio de cada quadro; com os halteres subindo à frente, a bacia andava 5 cm para trás e a base do pescoço 5,2 cm, e a regra "sem embalo: o tronco fica parado" falhava. Com o quadril parado no ângulo do meio da subida, o tronco não se mexe e o centro de massa anda ±2,3 cm no pé. Por isso a regra do equilíbrio aqui é "perto do meio do pé" (metade do meio), e não "sobre o meio do pé" (±1 cm) dos stiffs.

## As vistas

A primeira é a **de frente** (a do guia de hoje e a que mais mostra a lateral do ombro). A segunda é a **de cima**: mostra os braços 30° à frente do corpo e o erro "virar elevação frontal". De lado o braço que vai para o lado parece ir para a frente (limite registrado em `correcoes-ja-feitas.md`); de trás repete a de frente; de três quartos um braço fica atrás do corpo.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Balançar o tronco (de lado) | embaixo o peito começa 31° à frente, com os joelhos a 24°; no alto ele foi jogado para trás: peito 8,7° atrás da vertical, lombar arqueada 12°, joelhos estendidos (10°) |
| Encolher os ombros (de frente) | no alto, a clavícula sobe 18° além do ritmo (32,5° contra 14,5°): o centro do ombro sobe 4 cm |
| Virar elevação frontal (de cima) | no alto, os braços ficam 80° à frente do plano do corpo (no certo, 30°); as mãos vão 61 cm à frente e a 48 cm uma da outra |

## O equipamento

- **Halteres:** o sextavado de 10 lb da tabela de objetos (`halterLeve`: 26,7 cm, cabeças de 10,2 × 9,1 cm, cabo de 2,8 × 13 cm, 4,5 kg; RitFit e Titan), com o cabo na direção do polegar. A carga na conta do equilíbrio é a massa dele, 4,5 kg (a ficha pede "halteres leves"). Até 15/11 era o de 25 lb, o único da tabela, com 5 kg na conta.

## Correções já feitas que esta animação respeita

- Sem o trapézio de cima; frente do ombro listrada, lateral em vermelho (achado 3 da anatomia, 02/11).
- Limite de profundidade da vista de lado: a segunda vista é a de cima.

## Músculos

Lateral do ombro dos dois lados (principal) e frente do ombro listrada (só ajuda). O trapézio de cima não aparece.

## O que não ficou bom

- **Resolvido em 15/11 (lote 5): "na frente das coxas".** Com o halter de 25 lb a mão ficava 23 cm para fora do meio do corpo, ao lado da coxa. Com o de 10 lb e o plano de baixo a 75°, a mão fica a 16 cm, na frente da coxa (quadro `frontal:tec:f0`). Só trocar o halter, com o plano a 55°, punha a mão a 21,7 cm (ainda ao lado). O preço: no começo da subida o braço sai mais para a frente antes de abrir para o lado (até a metade do caminho), e de cima, embaixo, os halteres ficam meio escondidos pelos ombros (`cima:tec:f0`).
- ~~O halter é o de 25 lb~~: desde 15/11 é o de 10 lb, com a massa dele (4,5 kg) na conta.
