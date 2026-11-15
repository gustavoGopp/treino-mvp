# Lote 6 · Stiff unilateral com halter (`stiff-unilateral`)

De 15/11/2026. Quarta animação da família dos stiffs. Apoio na perna direita (o lado que trabalha, o de perto na vista de lado), halter na mão direita, a perna esquerda sobe para trás em linha com o tronco. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/stiff-unilateral.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/stiff-unilateral.json`.
- Animação: `src/engine/novo/exercicios/stiff-unilateral.ts`, sobre o núcleo `exercicios/dobrar-o-quadril.ts` com apoio num pé só.
- Folha ao lado da de hoje: `../prototipos/folha-stiff-unilateral.png`. Quadros grandes: `../quadros/stiff-unilateral.png`.

## Como o núcleo resolve o apoio num pé

O quadril de apoio fica à distância do tornozelo que o ângulo do joelho dá; o quanto ele vai para trás e o quanto a bacia vai para o lado saem do equilíbrio: o centro de massa (corpo + halter) sobre o meio do pé de apoio, para a frente e de lado. Por isso a bacia vai 6,9 cm para cima do pé de apoio (o pé de apoio fica 6 cm para dentro da linha do quadril), como faz quem fica numa perna só. A perna livre segue a linha que vai da base do pescoço à bacia; em cima ela pende, com o joelho dobrado o bastante para o pé sair do chão.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Apoio numa perna, joelho levemente dobrado e fixo | consenso | o joelho de apoio dobra de 10° (em pé) a 16° (embaixo); o pé de apoio não sai do lugar (0 cm) | sim |
| Halter na mão do lado da perna de apoio, perto da perna | consenso | na mão direita, pendendo na vertical com o cabo atravessado; da cabeça do halter à pele da perna, de 0,3 a 3,9 cm | sim |
| O quadril vai para trás e o tronco desce | consenso | o quadril dobra 92° e vai 15 cm para trás | sim |
| Fim: tronco quase paralelo ao chão | consenso | o peito fica a 11° da horizontal (inclinação pedida: 78°) | sim |
| A perna livre sobe atrás, em linha com o tronco | consenso | embaixo, a perna livre faz 2° com a linha do tronco; o joelho dela fica a 4° | sim |
| Quadril nivelado o tempo todo | consenso | os dois quadris ficam na mesma altura (0 cm de diferença) | sim |
| Coluna reta | consenso | a lombar não flexiona (0°) | sim |
| Olhar à frente e para baixo | consenso | o pescoço fica 6° estendido em relação à linha do tronco | sim |
| Equilíbrio num pé só | consenso | o centro de massa fica sobre o meio do pé de apoio (0 cm para a frente e 0 cm de lado) em todos os quadros | sim |
| Cadência ~2–3 s descendo, pausa curta, ~1–1,5 s subindo | consenso | 2,5 s; 0,45 s; 1,4 s | sim |

**Até onde o halter desce:** a ficha dá o tronco ("quase paralelo ao chão"), não a altura do halter. Com o tronco a 11° da horizontal, o centro da pegada para a 39 cm do chão, um pouco abaixo do joelho (a 75% da canela, de baixo para cima). A flexão do quadril chega a 97,5°.

Conferência automática: 0 falha. Avisos: as linhas da ficha de movimento que são escolha de desenho (a posição do pé de apoio, os ângulos dos joelhos e da perna livre, os cotovelos, a folga do halter, o peso do halter) e a vista de lado, que não serve ao modo Músculos (a padrão é a de três quartos, de trás: 218 cm²). O ritmo fica suave (7,2%). O equilíbrio automático da conferência só olha para a frente e para trás (do calcanhar mais atrás à ponta mais à frente); a regra nova `peso-sobre-o-pe-de-apoio` mede o pé de apoio de verdade, nas duas direções.

## As vistas

A de lado (padrão: a perna livre e o tronco numa linha) e a de três quartos, de trás, no lugar da de frente da animação de hoje: de frente, embaixo, o tronco tapa o corpo; de trás, a perna livre vem na direção de quem olha e vira um borrão. De três quartos, de trás, leem-se a perna livre, o quadril nivelado, o halter e o posterior da coxa; o erro "abrir o quadril" também é mostrado nela.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Abrir o quadril (de três quartos, de trás) | a bacia gira 24° em torno do tronco para o lado da perna livre: o quadril esquerdo fica 6,6 cm mais alto que o direito e a perna livre vira para fora |
| Arredondar as costas (de lado) | a bacia inclina 12° menos, a lombar flexiona 24° e a torácica 6° a mais; a cabeça fica no mínimo a 76 cm do chão (no certo, 86), bem acima do joelho |
| Agachar (de lado) | o joelho de apoio dobra 55° (o certo: 16°), o quadril desce para 79 cm e o peito inclina 43°; a perna livre fica para trás com o joelho dobrado |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Glúteo em laranja (secundário) dos dois lados e posteriores da coxa da perna de apoio em vermelho (02/11/2026, "os dois stiffs ficam iguais"). A ficha da técnica ainda diz "glúteo da perna de apoio" como primário; segui a correção e anotei em `pedidos-stiffs.md`.
- A animação de hoje apoiava na perna esquerda; o guia novo pede o lado que trabalha à direita (o de perto na vista de lado). Aqui o apoio e o halter são do lado direito.

## Músculos

Posteriores da coxa da perna de apoio (principal) e glúteos dos dois lados (secundários). A ficha da técnica lista os eretores da coluna como secundário; o desenho do Boneco novo não tem esse grupo e a biblioteca não o conta.

## O que não ficou bom

- **De três quartos, de trás, o fio do rótulo "quadril nivelado" passa por cima da coxa de apoio** para chegar ao quadril (o texto fica fora do corpo).
- **A mão livre (a esquerda) só pende**: a ficha sugere apoiar numa parede quando falta equilíbrio, mas isso é variação, não é desenhado.
