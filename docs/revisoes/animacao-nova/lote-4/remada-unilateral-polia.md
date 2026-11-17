# Lote 4 · Remada unilateral na polia baixa, em pé, com estribo (`remada-unilateral-polia`)

De 15/11/2026. Segunda da família "puxar na polia". O corpo parado é o da remada unilateral sem banco (`exercicios/remada-sem-banco.ts`, usado como está); o braço que puxa é o do núcleo `exercicios/polia-puxar.ts` (`bracoPeloCabo`: o antebraço na linha do cabo, como na puxada unilateral). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-polia.md`. Cartão: `src/conteudo/exercicios/remada-unilateral-polia.json`. Animação de hoje: `src/engine/exercicios/remada-unilateral-polia.ts`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral-polia.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral-polia.ts`.
- Regras: as das remadas com peso livre (`regras/remadas.ts`) e da suspensão (`escapulas-se-juntam`) como estão; da família, `polia-puxar-cabo-na-direcao-da-polia` e `polia-puxar-puxador-e-cabo-livres`.
- Folha: `../prototipos/folha-remada-unilateral-polia.png`. Quadros grandes: `../quadros/remada-unilateral-polia.png`.

## Como a geometria foi montada

1. **O corpo parado** sai da base da remada sem banco (`baseSemBanco`): pé esquerdo à frente, direito (o do lado que puxa) atrás com o calcanhar 15° levantado, 66 cm de um tornozelo ao outro; a mão esquerda espalmada na coxa da frente, no ponto em que o cotovelo de apoio fica a 12°. Mudei dois números dessa base (são linhas desta ficha): o peito a **50°** da vertical (lá, 55°) e o joelho da frente a **40°** (lá, 30°). Ver "o que não ficou bom".
2. **A coluna de polia** com a roldana no ponto mais baixo (17,8 cm), 42 cm à frente do ombro direito e 2 cm para fora dele.
3. **O braço que puxa:** o antebraço aponta para o ponto em que o cabo sai da roldana (o cabo é reto da roldana ao estribo); o braço gira de estendido para a polia (cotovelo a 6°) até o fim, 22° além da linha das costas e 14° para fora. A escápula vai de 8° à frente ("ombro alongado à frente") a 10° para trás.
4. **A pilha** fica 2 cm levantada com o braço estendido ("até a placa sair do lugar") e sobe metade do curso do cabo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Base escalonada: o pé do lado que puxa atrás | consenso | o tornozelo direito 66 cm atrás do esquerdo; os pés parados (0 cm) | sim |
| Mão livre firme na coxa da frente | consenso | a 0,3 cm da pele da coxa, a 86% do caminho do quadril ao joelho, parada (0 cm) | sim |
| Tronco inclinado à frente, costas retas | consenso | peito a 51,3° da vertical; lombar sem flexão (0°) | sim |
| O tronco fica no mesmo lugar, sem girar | consenso | base do pescoço e bacia andam 0 cm; o tórax gira 0° | sim |
| Começo: braço estendido em direção à polia | consenso (cartão) | cotovelo a 6°, o braço apontando para a roldana | sim |
| O cabo reto da polia à mão | (desenho) | o antebraço desvia no máximo 0,2° da linha do cabo | sim |
| Cotovelo para trás, em direção ao quadril, perto do corpo | consenso | o braço se afasta no máximo 14,6° do lado do tronco | sim |
| Fim: cotovelo passando a linha das costas | consenso (cartão) | 3,5 cm além da linha das costas | sim |
| Fim: mão ao lado do quadril | consenso (cartão) | a mão a 51,3% do caminho do ombro ao quadril, ao longo do tronco | sim (no limite: a regra pede 50%) |
| No fim a escápula se junta à coluna | consenso | a clavícula vai 12,2° para trás | sim |
| A placa sai do lugar com o braço estendido | consenso | a pilha 2 cm levantada no começo; sobe 19,9 cm (o cabo anda 39,8 cm, 2:1) | sim |
| O cabo e o estribo não atravessam o corpo nem as pernas | (desenho) | a no mínimo 12,5 cm da pele | sim |
| Equilíbrio | (mecânica) | o centro de massa sempre dentro do apoio dos pés | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática (homem): **0 falha, 2 avisos.** (1) Dorsiflexão do tornozelo de trás de 19,9° (média 14,8°, máximo observado 48°): a perna de trás inclina à frente com o passo de 66 cm (na remada sem banco, 17,8°). (2) As linhas de desenho da ficha de movimento. Na mulher: 0 falha, 2 avisos (dorsiflexão 21°); o cotovelo passa 0,9 cm das costas e a mão fica a 50,3%.

Músculos: dorsal e meio das costas do lado direito em vermelho, ombro de trás e bíceps em laranja. Vistas: de lado e de três quartos, de trás (`quinaTras`). A vista padrão do modo Músculos fica a de três quartos, de trás (314 cm² do principal; de lado, 176). A mão livre na coxa não aparece de três quartos de trás (fica atrás do corpo); de três quartos de frente a coluna tapava o braço que puxa.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | três quartos, de trás | a coluna gira 18° no fim (35% na lombar), a mão livre continua na coxa |
| Arredondar as costas | lado | lombar +22° e torácica +22°; a bacia vira para trás até o ombro de apoio ficar à mesma distância da mão (a mão não sai da coxa) |
| Não estender o braço (quadro parado no começo) | lado | a volta para a 45% do caminho |

## Correções já feitas que esta animação respeita

- Polia baixa a 20/22 cm do chão nas remadas unilaterais (`correcoes-ja-feitas.md`; aqui a roldana a 17,8 cm, a altura mínima da coluna da tabela).
- Coluna de polia: o cabo reto da roldana à mão e a pilha que sobe.

## O que não ficou bom

- **O tronco e o joelho da frente não são os da remada sem banco.** Com a polia baixa à frente, o cabo puxa a mão para a frente: com o peito a 55° (o da remada sem banco), para a mão chegar ao lado do quadril no fim (a regra pede 50% do caminho do ombro ao quadril) a roldana tinha de ficar a 25–30 cm do ombro, e aí a cabeça ficava em cima da coluna, de lado. Com o peito a 50° e a roldana a 42 cm, a cabeça fica livre e a mão chega, no limite (51,3%). Com o peito a 50°, a mão livre só alcança a coxa com o joelho da frente a 40°. O cotovelo passa das costas com 22° (e não 26°). Quadro: `quadros/remada-unilateral-polia.png`, `lateral:tec:f1`.
- **A dica "cotovelo para o quadril" ficou de fora:** de três quartos de trás o fio dela atravessava as costas. A trajetória do cotovelo mostra o mesmo.
- **O corpo é menor no quadro** do que nas remadas com halter: a coluna (2,39 m) entra no enquadramento, como na puxada unilateral e no tríceps na corda.
- A pegada fica de 17° a 26° além da neutra para o lado da palma para cima (a ficha não pede pegada; não pus a regra da pegada neutra).
