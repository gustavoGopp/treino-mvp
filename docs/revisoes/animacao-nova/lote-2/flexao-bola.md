# Lote 2 · Flexão de joelho na bola suíça (`flexao-bola`)

De 15/11/2026, refeita na rodada de correção do mesmo dia. Ainda não aprovada nem ligada às telas do app.

**Não é uma flexão de braço.** O pedido do lote chamava este exercício de "flexão com apoio na bola", mas a ficha da técnica, o texto do app e a animação de hoje dizem outra coisa: é a **flexão de joelho** (posteriores da coxa), deitado de costas, com os calcanhares em cima da bola. A ficha manda.

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-bola.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-bola.json`.
- Animação: `src/engine/novo/exercicios/flexao-bola.ts`, sobre a ponte de costas do núcleo das flexões de joelho deitado (`exercicios/flexao-joelho.ts`, `ponteDeCostas`). Esse núcleo não mudou: a deslizante e a com elástico seguem com 0 falha.
- Peça de cena: a bola suíça, `src/engine/novo/pecas-de-cena/bola-suica.ts`, com as medidas em `src/engine/novo/dados/objetos/bola-suica.json`.
- Regras (em `regras/flexoes.ts`): `bola-linha-no-inicio`, `bola-joelhos-a-90`, `bola-quadril-sobe`, `bola-quadril-alto`, `bola-costas-e-cabeca-no-chao`, `bola-pes-na-bola`, `bola-pernas-fora-da-bola`, mais `em-linha-no-fim` (das flexões de joelho).
- Folha ao lado da de hoje: `../prototipos/folha-flexao-bola.png`. Quadros grandes: `../quadros/flexao-bola.png`.

## O que mudou na correção

- **A pose sai do núcleo da ponte de costas.** Antes, a parte de cima das costas se arredondava 25° para a pose fechar; isso saiu. Agora as costas e a cabeça ficam apoiadas no chão, a coxa vem da conta que põe o pé na bola, e os ombros não escorregam (0,2 cm). No fim, o pescoço dobra 53°: é o que o próprio núcleo calcula para a cabeça apoiar no chão com ombros, quadril e joelhos em linha e os pés no alto de uma bola de 65 cm. Com a bola de 55 cm, o pescoço dobraria quase o mesmo (48°), e o tornozelo passaria do máximo.
- **A bola é desenhada como o kettlebell dos cartões:** um círculo liso com gradiente radial na tela e um brilho, igual em todas as vistas, cortado reto onde encosta no chão. A costura é discreta (opacidade 0,28). A cor é a do estofado do banco, puxada 30% para um cinza azulado, para não dominar o quadro. Antes, de lado, o gradiente ficava dentro de um grupo girado, não aparecia, e a bola saía chapada.
- **Com as pernas estendidas, o calcanhar apoia 7 cm atrás do alto da bola** (do lado do corpo). Assim a panturrilha passa por cima dela, e não por dentro, como acontecia antes (2,5 cm).
- **A segunda vista é a de três quartos (`quina`).** De cima, as pernas tapavam o corpo; de três quartos por trás (`quinaTras`), o quadril tapava o tronco.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, braços no chão abertos ~30° do corpo, palmas para baixo | consenso | as costas e a nuca ficam de −0,3 a 0,2 cm do chão, e a cabeça a 0 cm; o ombro anda 0,2 cm; as mãos ficam paradas no chão, abertas 30°, com o cotovelo dobrado 21° a 25° | sim |
| Calcanhares em cima da bola, pernas estendidas | consenso | o joelho dobra 6°; o pé encosta na bola (0,9 a 1,4 cm para dentro: a bola cede) | sim |
| Começo: ombros, quadril e calcanhares em linha, quadril alto | consenso | de lado, 180°; a bacia fica a 16,8 cm do chão | sim |
| Puxada ~1 s: os calcanhares puxam a bola para o glúteo, e o quadril sobe ainda mais | consenso | 1,0 s; a bola rola 37 cm; o centro da pelve sobe de 28,2 para 52,2 cm | sim |
| Fim: joelhos a ~90°, pés em cima da bola, ombros, quadril e joelhos em linha | consenso | o joelho dobra 90°, e a sola deita no alto da bola; de lado, ombro, quadril e joelho fazem 170,8° | sim |
| Volta ~2 s, sem deixar o quadril descer | consenso | 2,0 s, pelo mesmo caminho; a bacia fica no mínimo a 16,8 cm do chão | sim |

Conferência automática: **0 falha**. Avisos: flexão plantar do tornozelo 61,8° no fim (média 56,7°, máximo 90°), porque o pé deita em cima da bola com a canela inclinada; e as linhas de desenho da ficha (`bracos.alcance`, `pe.afundaNaBola`, `ombro.z`, `bola.alemDoCalcanhar`). O ritmo fica suave: o maior salto é de 8,1%.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril cai ao puxar (de lado) | a bacia sobe só 15% do que sobe no certo, e o quadril dobra 59° para o pé chegar à bola; no fim, a pelve fica a 32 cm (no certo, 52) e ombro, quadril e joelho fazem 122° |
| Quadril encosta no chão na volta (de lado; quadro parado no começo) | a pele do glúteo chega a 1 cm do chão, com os calcanhares na bola |
| Puxar pouco (de lado) | para com o joelho a 44° (o certo é 90°) e a pelve a 40 cm |

## A bola

- **65 cm de diâmetro:** é o tamanho que o guia da Gymnic indica para quem tem de 1,60 a 1,83 m (o Boneco tem 1,76 m). A fonte é a página pública do revendedor Gray Line Medical, "Gymnic Balls", lida em 15/11/2026.
- **Amassa 1,5 cm embaixo.** Essa medida é **provisória** e não tem fonte.
- **Rola com o pé:** a costura gira junto, e não há bola escorregando.

## Músculos

O principal é o posterior da coxa, e o secundário, o glúteo, dos dois lados, como a biblioteca conta. A vista do modo Músculos é a de lado.

## Os nove itens do padrão (seção 8 do guia), nos quadros grandes

1. **O corpo parece uma pessoa fazendo o exercício:** as costas não se arredondam, nada atravessa o chão nem a bola. O pescoço dobra 53° no fim, apoiado no chão; ver abaixo.
2. **Rosto e cabeça:** a nuca apoia no chão, e o rosto fica livre.
3. **O corpo ocupa o quadro:** a bola é grande (65 cm), mas o corpo ocupa a maior parte do quadro, como no búlgaro.
4. **As duas vistas se leem:** de lado e de três quartos.
5. **A bola** tem luz e brilho, no molde do kettlebell.
6. **Mãos e pés:** as mãos ficam espalmadas no chão; os pés apoiam na bola.
7. **Os erros** se leem.
8. **Rótulos:** dois de lado ("quadril alto", "calcanhar no glúteo"), fora do corpo e da bola.
9. **Tema escuro e cor de pele:** conferidos nos quadros grandes.

## O que não ficou bom (com o que tentei)

- **O pescoço dobra 53° no fim.** O núcleo põe a cabeça apoiada no chão. Com ombros, quadril e joelhos em linha e os pés no alto da bola, o tronco fica a uns 45° do chão, e a nuca precisa dobrar isso. Tentei a bola de 55 cm (o pescoço ficou em 48°, e o tornozelo passou do máximo). Tirar a cabeça do chão deixaria o rosto no ar, o que a ficha não pede. Fica para o Gustavo decidir.
- **A ponte alta ainda é a pose que mais muda** contra a animação de hoje: a pelve chega a 52 cm, e hoje chega a 52.

## Risco de o Gustavo não gostar

**Médio.** A geometria agora é a do núcleo aprovado, e a bola segue o desenho do kettlebell. Fica o pescoço dobrado no fim, que é próprio da ponte alta, e o fato de o exercício não ser o que o nome do pedido sugeria.
