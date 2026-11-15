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
- Embaixo, o braço pende num plano 55° à frente do plano do corpo, e a elevação do braço sai da folga de 1,5 cm entre a cabeça do halter e a pele da coxa.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, joelhos destravados | consenso | pés a 9 cm do meio; joelhos a 10°; os pés não saem do lugar (0 cm) | sim |
| Tronco levemente inclinado à frente | consenso | peito a 13,3° da vertical (a regra pede de 5° a 25°); a base do pescoço não se move (0 cm) | sim |
| Halteres na frente das coxas, palmas para dentro, cotovelos levemente dobrados | consenso | palmas para dentro, cotovelos a 15°; o centro da mão fica 23 cm para fora do meio do corpo e 17 cm à frente do centro da bacia, com a cabeça do halter a 2,2 cm da pele da coxa (ver "O que não ficou bom") | em parte |
| Subida ~1–1,5 s; braços para fora e um pouco à frente | consenso | 1,3 s; no alto, o braço fica 30,5° à frente do plano do corpo (o texto aceita ~20° a ~40°) | sim |
| Cotovelo um pouco acima da mão | consenso | no alto, o cotovelo fica 8,1 cm acima do centro da mão | sim |
| Topo: braços na linha dos ombros | consenso | o cotovelo fica 0,4 cm abaixo do centro do ombro (o úmero a 89° da vertical) | sim |
| Ombro longe da orelha | consenso | a clavícula sobe de 11° a 14,5°, só o ritmo normal (0° a mais); a ponta do ombro sobe 1,3 cm | sim |
| Descida ~2 s, controlando | consenso | 2,1 s, pelo mesmo caminho | sim |
| Equilíbrio | mecânica | com o quadril parado, o centro de massa (corpo + 2 × 5 kg) anda de −2,3 a +2,2 cm do meio do pé (a regra pede a metade do meio do pé, ±5 cm) | sim |

Conferência automática: **0 falha**. Avisos: as linhas que são escolha de desenho (joelho, inclinação do tronco, pescoço, transição do plano, cotovelo e o giro dele, a folga e a massa do halter), a frente do ombro listrada como "só ajuda" (decisão de 02/11) e a vista de cima, que não serve ao modo Músculos (24 cm² da lateral do ombro, contra 78 de frente). Ritmo: salto de 13% (limite 15%). Supinação do antebraço até 15,5°.

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

- **Halteres:** o sextavado da tabela de objetos (33 cm, cabeças de 13,7 cm), com o cabo na direção do polegar. A carga na conta do equilíbrio é 5 kg (a ficha pede "halteres leves"; o desenho é o mesmo halter de 25 lb, que é o único da tabela).

## Correções já feitas que esta animação respeita

- Sem o trapézio de cima; frente do ombro listrada, lateral em vermelho (achado 3 da anatomia, 02/11).
- Limite de profundidade da vista de lado: a segunda vista é a de cima.

## Músculos

Lateral do ombro dos dois lados (principal) e frente do ombro listrada (só ajuda). O trapézio de cima não aparece.

## O que não ficou bom

- **"Na frente das coxas" vira "ao lado e à frente das coxas":** com a palma para dentro, o halter de 33 cm fica com o cabo para a frente; para a cabeça dele não atravessar a coxa, a mão fica 23 cm para fora do meio do corpo (quadro `frontal:tec:f0`). Tentei pôr o braço mais à frente (plano de 55°, contra 30° na subida); mais que isso, o braço passa a subir à frente antes de ir para o lado. Com um halter menor (os halteres leves de verdade são mais curtos) a mão ficaria mais perto da coxa; a tabela só tem o de 25 lb.
- **O halter é o de 25 lb da tabela, desenhado igual nos dois exercícios:** para uma elevação lateral ele é grande. A massa na conta é 5 kg (escolha de desenho).
