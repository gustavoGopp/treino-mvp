# Lote 1 · Búlgaro com o peso do corpo (`bulgaro-peso-corpo`)

De 15/11/2026. Feito sobre o núcleo dos búlgaros (`bulgaro-base.ts`), com a mesma pose do búlgaro aprovado (`bulgaro.md`): o peito do pé de trás no assento de uma cadeira firme, encostada na parede, com o encosto do lado de lá; as duas mãos na cintura; sem halter e sem a coluna. Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/bulgaro-peso-corpo.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/bulgaro-peso-corpo.json`.
- Animação: `src/engine/novo/exercicios/bulgaro-peso-corpo.ts` (`criarBulgaro(ficha, 'cintura', 'cadeira')`).
- Peça de cena nova: a cadeira e a parede (`src/engine/novo/pecas-de-cena/cadeira.ts`), com as medidas em `src/engine/novo/dados/objetos/cadeira.json`.
- Folha ao lado da de hoje: `../prototipos/folha-bulgaro-peso-corpo.png`. Quadros grandes: `../quadros/bulgaro-peso-corpo.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Peito do pé de trás no assento de uma cadeira firme (~45 cm), cadarço para baixo | consenso | assento a 45,1 cm (cadeira de ficha pública); o pé fica de sola para cima, encostado no tampo (0 cm de folga), e o tornozelo não sai do lugar (0 cm) | sim |
| Cadeira encostada na parede, com o encosto do lado de lá | consenso | o encosto fica do lado oposto à pessoa e a parede logo atrás dele (a parede só aparece de lado; de frente ela cobriria o fundo) | sim |
| Pé da frente longe o bastante para o calcanhar ficar no chão embaixo | consenso | calcanhar e bola do pé da frente a 0 cm do chão o ciclo inteiro; embaixo, o joelho da frente fica 1,9 cm atrás do tornozelo | sim |
| Mãos na cintura | consenso | as duas mãos na cintura, 11 cm acima do centro do quadril, cotovelos para fora | sim |
| Tronco levemente inclinado à frente | consenso | o peito fica 16° para a frente, do começo ao fim | sim |
| Peso na perna da frente | consenso | o centro de massa fica a 60 a 61% do caminho entre o tornozelo de trás e o da frente | sim |
| Em cima: joelho da frente quase estendido, pés fixos | consenso | o joelho da frente dobra 14°; o pé da frente não se desloca (0 cm) | sim |
| Descida em ~2 a 3 s, reta | consenso | 2,3 s; o quadril desce de 78 para 42 cm sem ir para a frente nem para trás (0 cm) | sim |
| Embaixo: coxa da frente perto da horizontal | consenso | 10,6° abaixo da horizontal | sim |
| Embaixo: joelho de trás a poucos centímetros do chão | consenso | a pele do joelho de trás fica a 5 cm do chão (o centro do joelho a 10 cm) | sim |
| Subida em ~1 a 1,5 s, empurrando com o pé da frente inteiro | consenso | 1,3 s, pelo mesmo caminho | sim |

**Por que 5 cm e não os 4 do búlgaro aprovado.** O assento da cadeira (45,1 cm) fica 1,6 cm mais alto que o banco (43,5 cm). Com o joelho de trás a 4 cm, o quadril descia até 38 cm (3,4 cm abaixo do aprovado), a coxa da frente passava 15,2° abaixo da horizontal (falha: o limite é 15°) e a extensão do quadril de trás chegava a 30°. Com 5 cm, o quadril para em 41,6 cm, como no aprovado (41,7), e a coxa fica a 10,6°. Continua "a poucos centímetros".

Conferência automática: **0 falha, 3 avisos**: a extensão do quadril de trás chega a 25° embaixo (acima da média, dentro do máximo observado; no aprovado, 22,7°); as linhas da ficha de movimento que são escolha de desenho (as distâncias dos pés, iguais às do aprovado, e a altura das mãos, igual à do afundo com o peso do corpo); e a vista de frente, que não serve ao modo Músculos (o quadríceps fica escondido atrás do joelho, como no aprovado). A vista padrão do modo Músculos é a de lado. Ritmo suave (salto de 9,8%, limite de 15%). A canela de trás encosta até 1,3 cm na borda do assento (tolerância 2,5 cm). A flexão plantar do tornozelo de trás chega a 50° em cima (média 57°).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 7,8 cm para dentro, sem cruzar o meio do corpo (fica a 0,5 cm dele) |
| Pé da frente perto da cadeira (de lado) | o pé da frente fica 18 cm mais perto da cadeira (como na animação de hoje) e, embaixo, o calcanhar sobe 11 cm; o joelho da frente dobra 120° (o certo: 98°) |
| Descer pouco (de lado) | o quadril para a 61 cm (o certo: 42) e o centro do joelho de trás fica a 21 cm do chão |

## O equipamento

- **Cadeira:** a STEFAN da IKEA (madeira, quatro pés, sem rodinhas, não dobrável), pela ficha pública: assento a 45,1 cm, 41,9 × 37,1 cm, encosto a 89,9 cm, 48,9 cm de profundidade total. A espessura do tampo (3 cm) e o lado dos pés (3,5 cm) são provisórios (a ficha não traz). A ficha da técnica pede "~45 cm": confere. Não há cartão de equipamento da cadeira no app (ela não é equipamento da lista); o desenho usa o mesmo gerador realista dos bancos, em madeira escura.
- **Parede:** cenário (pintada atrás do corpo, fora do enquadramento), só de lado, em cinza claro.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Os adutores da perna da frente entram no desenho (02/11 e 04/11): respeitada (`adutores:R` secundário; aparecem de frente).
- O glúteo em laranja (secundário), como no búlgaro aprovado: respeitada.
- A nota do joelho de trás a 14 cm na animação de hoje ("o texto diz a poucos centímetros"): aqui ele fica a 5 cm.

## O que não ficou bom

- **O joelho de trás fica a 5 cm, e não a 4 como no aprovado**, por causa do assento mais alto (explicado acima). A diferença não se vê, mas é uma mudança contra o aprovado.
- **A extensão do quadril de trás vai a 25°** (aprovado: 22,7°), acima da média de 18,5° do CDC e dentro do máximo observado (42°).
- **A cadeira é desenhada sem cartão de referência do app**: tampo, pés, travessas e uma tábua no encosto, sem curva nem detalhe. De frente, o encosto e o assento ficam quase todos escondidos atrás do corpo.
- **De lado, a parede fica na borda esquerda do quadro**, como uma faixa cinza alta; não tem rótulo ("cadeira na parede", que a animação de hoje tinha, saiu: os rótulos do motor novo apontam para o corpo).
- **Erro "pé da frente perto da cadeira":** o quanto o calcanhar sobe (34°) veio da animação de hoje, não de uma medida, como no aprovado.
- **O rótulo do erro "pé da frente perto da cadeira"** quebra em quatro linhas ao lado do pé.
