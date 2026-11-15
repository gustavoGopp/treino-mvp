# Lote 2 · Flexão de joelho na bola suíça (`flexao-bola`)

De 15/11/2026. Quarta animação do lote 2. Ainda não aprovada nem ligada às telas do app.

**Atenção: não é uma flexão de braço.** O pedido do lote chamava este exercício de "flexão com apoio na bola", mas a ficha da técnica, o texto do app e a animação de hoje dizem outra coisa: é a **flexão de joelho** (posteriores da coxa), deitado de costas, com os calcanhares em cima da bola. A ficha manda; foi isso que fiz. Por isso ele não usa o núcleo das flexões de braço (`flexionar.ts`) e tem o próprio arquivo.

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-bola.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-bola.json`.
- Animação: `src/engine/novo/exercicios/flexao-bola.ts`.
- Peça nova: a bola suíça, `src/engine/novo/pecas-de-cena/bola-suica.ts`, com as medidas em `src/engine/novo/dados/objetos/bola-suica.json`.
- Regras novas (em `regras/flexoes.ts`): `bola-linha-no-inicio`, `bola-linha-no-fim`, `bola-joelhos-a-90`, `bola-quadril-sobe`, `bola-quadril-alto`, `bola-pes-na-bola`, `bola-pernas-fora-da-bola`, `bola-costas-no-chao`.
- Folha ao lado da de hoje: `../prototipos/folha-flexao-bola.png`. Quadros grandes: `../quadros/flexao-bola.png`.

## A bola

- **Tamanho:** 65 cm de diâmetro, a bola que o guia de tamanhos da Gymnic indica para quem tem de 1,60 a 1,83 m (o Boneco tem 1,76 m). Fonte: a página pública do revendedor Gray Line Medical (graylinemedical.com, "Gymnic Balls"), guia lido em 15/11/2026. A animação de hoje usa uma bola de 56 cm (raio 28).
- **Amassa:** a bola achata 1,5 cm embaixo, onde encosta no chão (o centro fica a 31 cm, e não a 32,5). **Medida provisória** (`tipo: provisoria`, sem fonte): depende da pressão da bola.
- **Rola:** a bola fica debaixo do ponto em que o pé apoia (o calcanhar no começo, o meio da sola no fim) e anda junto com ele, 43 cm; uma costura (um meridiano) gira com ela (76°), para o giro aparecer. Nada de bola que escorrega.
- **O pé apoia sem atravessar:** o pé encosta na superfície da bola (de −0,1 a 0,1 cm dela, medido na pele do Boneco).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de costas, braços no chão abertos ~30° do corpo, palmas para baixo | consenso | a parte de cima das costas fica a 0,4 a 0,6 cm do chão o ciclo inteiro; as mãos ficam paradas no chão (0 cm), abertas 30°, com o cotovelo dobrado 27° a 28° | sim |
| Calcanhares em cima da bola, pernas estendidas | consenso | no começo, o joelho dobra 6° e o calcanhar fica no alto da bola | sim |
| Começo: ombros, quadril e calcanhares em linha, quadril alto | consenso | de lado, ombro, quadril e calcanhar fazem 171,8°; a bacia fica a 19,8 cm do chão | sim |
| Puxada ~1 s: os calcanhares puxam a bola para o glúteo, o quadril sobe ainda mais | consenso | 1,0 s; a bola rola 43 cm para o glúteo; o centro da pelve sobe de 32,4 para 54 cm | sim |
| Fim: joelhos a ~90°, pés em cima da bola, ombros, quadril e joelhos em linha | consenso | o joelho dobra 90°; o meio da sola fica no alto da bola; ombro, quadril e joelho fazem 179° | sim |
| Volta ~2 s, sem deixar o quadril descer; o quadril não encosta no chão | consenso | 2,0 s pelo mesmo caminho; a bacia fica a no mínimo 19,8 cm do chão | sim |

**Como o corpo é montado:** a parte de cima das costas fica no mesmo lugar do chão e o tronco gira sobre ela; a coxa segue a linha do ombro ao quadril (o quadril não dobra: fica 4,9° estendido, a curva de repouso da lombar). Para cada flexão do joelho, a inclinação do tronco é a que põe o pé em cima da bola. A parte de cima das costas se arredonda 25° (`toracica.flexao`): sem isso, com o quadril alto no fim, o apoio ia para a base do pescoço e a cabeça atravessava o chão. O pescoço dobra o bastante para a cabeça apoiar no chão (de −3° no começo a 50° no fim, em linha reta com a inclinação do tronco, para não dar trancos).

Conferência automática: **0 falha**. Avisos: flexão plantar do tornozelo 61,4° no fim (média 56,7°, máximo 90°: o pé deita em cima da bola com a canela inclinada); as linhas de desenho da ficha (`bracos.alcance`, `cabeca.aoChao`, `cabeca.fracaoDoPescoco`, `toracica.flexao`, `pe.afundaNaBola`); a vista de cima, que não serve ao modo Músculos (de lado, 67 cm², é a padrão). O ritmo fica suave (salto de 7%).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril cai ao puxar (de lado) | o quadril dobra 40° quando os joelhos dobram; no fim, a pelve fica a 36,9 cm (o certo: 54) e ombro, quadril e joelho fazem 135,5° (o certo: 179°) |
| Quadril encosta no chão na volta (de lado; quadro parado no começo) | o quadril dobra 38° e a bacia chega a 1,4 cm do chão, com os calcanhares ainda na bola |
| Puxar pouco (de lado) | para com o joelho a 44° (o certo: 90°) e a pelve a 43,7 cm |

## Músculos

Principal: posteriores da coxa; secundário: glúteo (biblioteca e revisão de anatomia de 02/11/2026), dos dois lados. A animação de hoje põe também a panturrilha em laranja; aqui não, porque a ficha da técnica e a biblioteca não a contam. Vista do modo Músculos: de lado. A segunda vista é a de cima (mostra os braços abertos 30°); a vista de três quartos não tem par no guia de hoje, e a folha não abria com ela.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

Não há correção registrada para a `flexao-bola`. Os músculos seguem a revisão de anatomia de 02/11/2026.

## O que não ficou bom

- **O nome do pedido** ("flexão com apoio na bola") não bate com o exercício: se a ideia era uma flexão de braço com as mãos ou os pés na bola, ela não existe na biblioteca nem tem ficha, e não foi feita.
- **O tronco fica muito inclinado no fim** (a pelve a 54 cm, como na animação de hoje, 52 cm): o apoio fica nas escápulas, com o pescoço dobrado 50°. É o que a geometria pede para ombros, quadril e joelhos ficarem em linha com os pés em cima de uma bola de 65 cm; com a bola de 56 cm de hoje seria menos.
- **No erro "quadril encosta na volta",** o pescoço segue a regra do movimento certo e estende 46°: a cabeça fica um pouco jogada para trás.
- **A bola é um círculo desenhado à mão** (como o kettlebell): a sombra é só um gradiente; de cima, a luz não acompanha a vista.
- **A bola amassa 1,5 cm só embaixo**, não onde o pé apoia, e o número é provisório.
- **O cotovelo fica dobrado 27°** (a mão parada no chão, a 97% do alcance do braço): a ficha diz "braços no chão", sem dizer estendidos.
- **A panturrilha** saiu do realce (estava na de hoje); ver "Músculos".

## Risco de o Gustavo não gostar

**Alto.** É um exercício diferente do que o pedido descrevia, a bola é uma peça nova desenhada à mão, e a posição de cima (tronco muito inclinado, pescoço bem dobrado) é a que mais muda contra a animação de hoje.
