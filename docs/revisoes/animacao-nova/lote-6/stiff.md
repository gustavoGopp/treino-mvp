# Lote 6 · Stiff com halteres (`stiff`)

De 15/11/2026. Primeira animação da família dos stiffs (dobrar o quadril) no motor novo. Um halter em cada mão, na frente das coxas, palmas para as pernas. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/stiff.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/stiff.json`.
- Animação: `src/engine/novo/exercicios/stiff.ts`, sobre o núcleo comum da família (`exercicios/dobrar-o-quadril.ts`), que os outros três stiffs usam.
- Regras novas medidas: `src/engine/novo/regras/stiffs.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-stiff.png`. Quadros grandes: `../quadros/stiff.png`.

## Como o núcleo resolve cada quadro

- **O quadril:** o joelho de apoio tem o ângulo da ficha; a distância do quadril ao tornozelo sai dele, e o quanto o quadril vai para trás sai do equilíbrio (o centro de massa do corpo com os halteres sobre o meio do pé), como no `agachar.ts`.
- **As mãos:** os cotovelos ficam quase estendidos (4°) e o braço gira no ombro até a cabeça do halter ficar a 1 cm da pele da coxa ou da canela (a perna é um tubo de seção oval que segue a tabela do corpo). Vindo da frente para trás, para a carga nunca passar para trás das pernas. Rente às pernas, o halter sobe um pouco na frente do joelho e volta para a canela; esse contorno é seguido em 25 pontos e alisado, sem descer abaixo da folga, para a mão e o quadril não mudarem de rumo de repente.
- **Até onde desce:** a ficha diz "para muita gente os halteres chegam perto do meio da canela". A inclinação do tronco embaixo não é dada: sai dessa altura (o centro da pegada no meio da canela).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, apontando para a frente | consenso | pés a 9 cm do meio (os centros do quadril ficam a 8,35), dedos para a frente; não saem do lugar (0 cm) | sim |
| Halteres na frente das coxas, palmas para você | consenso | em pé, o centro do halter fica 19 cm à frente do centro da bacia, com o cabo atravessado; palmas para as pernas | sim |
| Joelhos levemente dobrados; o ângulo fica quase igual a série toda | consenso | o joelho dobra de 8° (em pé) a 15° (embaixo) | sim |
| Em pé: quadril estendido, sem jogar o tronco para trás | consenso | o quadril dobra 7° e o peito fica 1° à frente da vertical | sim |
| Descida em ~2–3 s, levando o quadril para trás | consenso | 2,5 s; o quadril vai 21 cm para trás e desce 4,5 cm (de 90 para 86 cm) | sim |
| Quem dobra é o quadril, com a coluna neutra | consenso | o quadril dobra 105° do alto até embaixo (112° no fim); a lombar não flexiona além da curva de repouso (0°) | sim |
| Halteres rentes às coxas e às canelas | consenso | da cabeça do halter (até o canto) à pele: de 0,6 a 3,9 cm na descida; não atravessa a perna em nenhum quadro | sim |
| Embaixo: halteres perto do meio da canela (para muita gente; depende da flexibilidade) | consenso | o centro da pegada para a 28 cm do chão, a 51% da canela; o peito fica a 2° da horizontal | sim (ver abaixo) |
| Subida em ~1–1,5 s, sem jogar o tronco para trás | consenso | 1,3 s, pelo mesmo caminho | sim |
| Equilíbrio | consenso | o centro de massa (corpo + 2 × 11,3 kg) fica sobre o meio do pé em todos os quadros (0 cm) | sim |

**A nota antiga sem correção (`correcoes-ja-feitas.md`, 04/11):** "halteres do stiff param na altura do joelho; o texto diz perto do meio da canela, mas depende da flexibilidade". Aqui segui a ficha: o centro da pegada chega a 28 cm do chão (o meio da canela do corpo é 28,3 cm), contra a altura do joelho na animação de hoje. O preço é a amplitude: para chegar lá com a coluna neutra e o joelho a 15°, o peito fica quase na horizontal (88° da vertical) e o quadril dobra 112°. É possível para quem tem o posterior da coxa flexível, e é isso que a ficha diz ("para muita gente"), mas é mais fundo que a animação de hoje. Se o Gustavo preferir uma posição mais conservadora, basta trocar `maos.embaixo` (0,5 da canela) na ficha de movimento: o tronco embaixo é recalculado. Não achei nas fontes do projeto um número para a flexibilidade do posterior com o joelho dobrado; não inventei.

Conferência automática: 0 falha. Avisos: as linhas da ficha de movimento que são escolha de desenho (os ângulos do joelho, a posição das mãos, a folga de 1 cm, o peso do halter) e a vista de lado, que não serve ao modo Músculos (de lado aparecem 67 cm² do posterior da coxa; de três quartos, de trás, 394 cm²). O ritmo fica suave (salto de 12,9%, com limite de 15%). A pronação do antebraço chega a 44° (média 80°).

## As vistas

De frente, embaixo, o tronco tapa tudo (só se veem o alto da cabeça, as pernas e os halteres), e de trás o tronco some atrás do quadril. A segunda vista é a de **três quartos, de trás** (`quinaTras`): ela mostra o quadril indo para trás, as pernas, os dois halteres e o posterior da coxa, e é a vista padrão do modo Músculos. A primeira é a de lado.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Coluna arredondada (de lado) | a bacia inclina 12° menos que no certo, a lombar flexiona 24° e a torácica 6° a mais; o halter desce 3 cm a mais (25 cm do chão). A cabeça fica no mínimo a 63 cm do chão (no certo, 73), 14 cm acima do centro do joelho: o tronco curva sem ficar com a cabeça na altura do joelho (o exagero apontado numa revisão anterior) |
| Agachar em vez de levar o quadril para trás (de lado) | os joelhos dobram 62° (o certo: 15°), o quadril desce para 73 cm e o peito inclina só 43° |
| Halteres longe das pernas (de lado) | embaixo, os halteres ficam cerca de 16 cm à frente da pele da canela (o centro da pegada 23 cm à frente do tornozelo, contra 9 no certo); o quadril vai 7 cm mais para trás para equilibrar |

## O equipamento

- **Halteres:** o sextavado de 25 lb da tabela de objetos (33 cm, cabeças de 13,7 cm), um em cada mão, pendendo na vertical com o cabo atravessado. Como o halter é comprido, os dois ficam lado a lado na frente das coxas, com meio centímetro entre as cabeças de dentro; de frente, parecem quase uma barra. É a geometria do halter da tabela, não um defeito do desenho.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Glúteo em laranja (secundário), posteriores da coxa em vermelho (principal): é o que a biblioteca conta, decidido na revisão de anatomia de 02/11/2026 ("os dois stiffs ficam iguais"). Respeitada.
- Nota sem correção de 04/11/2026 (halteres na altura do joelho × meio da canela): aqui chegam ao meio da canela, como a ficha diz.

## Músculos

Posteriores da coxa (principal) e glúteo (secundário). A animação de hoje também desenhava os eretores da coluna; o desenho do Boneco novo não tem esse grupo (`dados/musculos.json`), e a biblioteca não o conta. Ficou fora.

## O que não ficou bom

- **A descida é funda:** o peito chega a 2° da horizontal para o halter chegar ao meio da canela com a lombar neutra. É o que a ficha pede, mas é a posição de quem tem boa flexibilidade (ver acima).
- **De frente, os dois halteres parecem uma barra:** é a medida do halter de 25 lb (33 cm); não mudei a pegada porque a ficha pede palmas para as pernas.
