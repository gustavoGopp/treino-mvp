# Lote 3 · Elevação lateral unilateral na polia (`elevacao-lateral`)

De 15/11/2026. Primeira animação da família dos ombros no motor novo. **Atenção ao pedido:** a tarefa chamou este id de "elevação lateral com halteres", mas a ficha da técnica (`docs/pesquisa/animacoes/elevacao-lateral.md`), o texto do app e a animação de hoje são da **elevação lateral unilateral na polia** (a de halteres é `elevacao-halteres`). A ficha manda: esta é a da polia. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-lateral.json`.
- Animação: `src/engine/novo/exercicios/elevacao-lateral.ts`, sobre o núcleo comum das elevações (`exercicios/elevar-o-braco.ts`), que a elevação com halteres também usa.
- Regras novas medidas: `src/engine/novo/regras/ombros.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-elevacao-lateral.png`. Quadros grandes: `../quadros/elevacao-lateral.png`.

## Como o núcleo resolve cada quadro

- **O corpo em pé:** o núcleo dos stiffs (`dobrar-o-quadril.ts`) com o joelho a 8° e a bacia sem inclinar. O ângulo do quadril sai do equilíbrio do meio da subida e fica **parado** o ciclo todo (é o "sem embalo"): só o braço se mexe. Para isso o núcleo dos stiffs ganhou um campo opcional (`alfa`, ver "Arquivos comuns").
- **O braço:** dado por direções, no referencial do tórax. O úmero sobe num plano 30° à frente do plano do corpo (o plano da escápula), do braço pendurado até a linha do ombro. Embaixo, o braço pende num plano mais à frente e para dentro (105°), para a mão ficar na frente do quadril; ele passa para o plano de 30° nos primeiros 60% do caminho, sem tranco. O cotovelo fica dobrado 15° o ciclo todo; o plano em que ele dobra começa para a frente e, conforme o braço sobe, gira 50° para baixo (o úmero gira para dentro: "cotovelo conduz"), de modo que no alto o cotovelo fica um pouco acima da mão.
- **A escápula:** a clavícula sobe e gira com o braço pelo ritmo do esqueleto (McClure 2001, já no motor). No certo não há elevação a mais; no erro "encolher", a clavícula sobe 18° além do ritmo.
- **Embaixo:** a elevação do braço sai da folga da mão (uma esfera de 4 cm) até a pele da coxa (3 cm), e não de um ângulo escolhido.
- **A polia:** a torre da tabela de objetos à esquerda, de lado para a pessoa, com a polia no ponto mais baixo (17,8 cm); a mão esquerda segura o trilho a 58 cm do meio do corpo, na altura da cintura, parada. O cabo vai reto da roldana ao estribo; a pilha sobe o curso do cabo dividido pela relação 2:1, com 2 cm de "cabo tenso" embaixo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De lado para a torre, a cerca de um passo; carro no ponto mais baixo, com estribo | consenso | torre à esquerda, trilho a 58 cm do meio do corpo (hoje: 52 cm); polia a 17,8 cm do chão | sim |
| Mão mais longe da torre no estribo; o cabo passa na frente do corpo | consenso | a mão direita segura o estribo; o cabo passa no mínimo a 2 cm da pele (nunca encosta) | sim |
| A outra mão segura a coluna | consenso | a mão esquerda no trilho, parada (0 cm no ciclo), cotovelo a 81° | sim |
| Tronco reto (pode inclinar um pouco para longe da torre) | consenso | peito a 1,3° da vertical; a base do pescoço não se move (0 cm). Não usei a inclinação opcional | sim |
| Embaixo: mão na frente do quadril, cabo tenso | consenso | o centro da mão fica 5 cm para fora do meio do corpo e 16 cm à frente, na altura de 80 cm (na frente do quadril direito), a 1,8 cm da pele da coxa; a pilha já sai 2 cm | sim |
| Subida ~1–1,5 s; braço para fora e um pouco à frente | consenso | 1,3 s; no alto, o braço fica 30° à frente do plano do corpo (o texto aceita ~20° a ~40°) | sim |
| Cotovelo levemente dobrado e um pouco acima da mão | consenso | cotovelo a 15° o tempo todo; no alto, o cotovelo fica 4,3 cm acima do centro da mão | sim |
| Topo: braço na linha do ombro | consenso | o cotovelo fica 2,3 cm acima do centro do ombro (o úmero a 94° da vertical) | sim |
| Ombro longe da orelha (o ombro não sobe junto) | consenso | a clavícula sobe de 11,1° a 14,5°, só o ritmo normal (0° a mais); a ponta do ombro sobe 0,9 cm | sim |
| Descida ~2 s, até a frente do quadril | consenso | 2,1 s, pelo mesmo caminho | sim |
| Cabo e pilha | medida | o cabo anda 92,9 cm e a pilha sobe 46,4 cm (2:1) | sim |
| Equilíbrio | mecânica | o centro de massa fica a no máximo 0,2 cm do meio do pé | sim |

Conferência automática: **0 falha**. Avisos: as linhas que são escolha de desenho (pés, joelho, pescoço, a transição do plano, cotovelo e o giro dele, a folga e o raio da mão, a altura da mão na torre e onde fica a torre) e a frente do ombro listrada como "só ajuda" (fora da lista do conteúdo, que só conta a lateral; é a decisão de 02/11). Ritmo: salto de 12,6% (limite 15%). Supinação do antebraço até 34° (média 87,5°).

## As vistas

A primeira é a **de frente** (a do guia de hoje e a que mais mostra a lateral do ombro: 33 cm² contra 14 de cima). A segunda é a **de cima**: é a única que mostra o braço 30° à frente do corpo e o erro "virar elevação frontal" (de lado, como o limite registrado em `correcoes-ja-feitas.md`, o braço que vai para o lado parece ir para a frente). Testei também de trás (boa, mas repete a de frente), as duas de três quartos (o braço que sobe fica atrás do corpo ou aponta para quem olha) e a de lado.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Balançar o tronco (de lado) | embaixo o peito começa 19° à frente, com os joelhos a 22°; no alto ele foi jogado para trás: peito 8,7° atrás da vertical, lombar arqueada 12° |
| Encolher o ombro (de frente) | no alto, a clavícula sobe 18° além do ritmo (32,5° contra 14,5° no certo): o centro do ombro sobe 4,3 cm |
| Virar elevação frontal (de cima) | no alto, o braço fica 80° à frente do plano do corpo (no certo, 30°); a mão vai 61 cm à frente do corpo |

## O equipamento

- **Torre da polia:** a peça do motor (`torre`, tabela de objetos: 239 cm, polia de 17,8 a 193 cm, relação 2:1). Ela entra como **cenário** (atrás do corpo, cortada em cima pelo quadro), senão a torre de 2,4 m encolhe o corpo; o pé da torre, a roldana de baixo e a pilha aparecem. A coluna fica 6 cm à frente do meio do corpo, para o cabo passar na frente das pernas.
- **Estribo e cabo:** as peças da puxada unilateral.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Sem o trapézio de cima, que o texto apresenta como sinal de erro; a frente do ombro fica listrada ("só ajuda"), a lateral em vermelho (achado 3 da anatomia, 02/11).
- Limite de profundidade: a vista de lado não mostra o plano do braço; aqui a segunda vista é a de cima.

## Músculos

Lateral do ombro direito (principal) e frente do ombro direito listrada (só ajuda), como o desenho de hoje depois da revisão de anatomia. O trapézio de cima não aparece.

## O que não ficou bom

- **Os dois rótulos de frente ficam juntos à esquerda:** no alto, o fio de "ombro longe da orelha" corre ao longo do braço levantado até o ombro (quadro `frontal:tec:f1`). O texto não cobre o corpo, mas o fio passa por cima do braço; é a regra de posição dos rótulos do motor (o lado do ponto), que não mudei.
- **De cima, embaixo, a mão quase some sob o ombro** (quadro `cima:tec:f0`): é a vista a pino; o começo se lê melhor de frente.
