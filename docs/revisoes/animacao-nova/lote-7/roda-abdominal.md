# Lote 7 · Rolamento com a roda abdominal, de joelhos (`roda-abdominal`)

De 15/11/2026. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/roda-abdominal.md`; texto do app: `src/conteudo/exercicios/roda-abdominal.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/roda-abdominal.json`.
- Animação: `src/engine/novo/exercicios/roda-abdominal.ts`.
- Peça nova: `src/engine/novo/pecas-de-cena/roda-abdominal.ts`, com as medidas em `src/engine/novo/dados/objetos/roda-abdominal.json` (objeto `rodaAbdominal`). O desenho parte do cartão de hoje (`scripts/desenhos-equipamento/realista/itens.mjs`, `roda_abdominal`).
- Regras novas medidas: `src/engine/novo/regras/roda-abdominal.ts`, com oito regras `roda-abdominal-*`.
- Folha ao lado da de hoje: `../prototipos/folha-roda-abdominal.png`. Quadros grandes: `../quadros/roda-abdominal.png`.

## A roda

| Medida | Valor | Tipo | Fonte |
|---|---|---|---|
| diâmetro da roda | 20,3 cm (8 pol) | medida | Rogue Ab Wheel, página pública do produto |
| largura da roda | 7,6 cm (3 pol) | medida | idem |
| de ponta a ponta | 40,6 cm (16 pol) | medida | idem |
| pegador: comprimento e diâmetro | 13,3 cm (5,25 pol) e 3,2 cm (1,25 pol) | medida | idem |
| eixo à mostra entre a roda e o pegador | 3,2 cm | derivada | (16 − 3 − 2 × 5,25) / 2 pol |
| cubo e eixo | 12,8 cm e 2,2 cm | desenho | cartão de hoje |

O guia do produto da Rogue dá outra roda, de 7,25 pol. Usei a página do produto.

O desenho segue o gerador realista, como o kettlebell e o banco:

- a banda de borracha;
- o cubo na cor de ação, dos dois lados;
- o eixo cromado;
- os pegadores de borracha.

A roda rola sem escorregar: ela gira o quanto andou dividido pelo raio, e três furos no cubo giram com ela. Os pegadores ficam parados na mão. Cada mão fecha num pegador (`forma: 'pegada'`, com o diâmetro dele). O polegar fica para dentro e a palma, para baixo.

## Como resolve cada quadro

- **Os joelhos e as canelas ficam parados no colchonete.** A canela fica deitada para trás, e o peito do pé, no colchonete (as pernas da puxada unilateral ajoelhada). O joelho fica em z = 0. O colchonete fica atrás, e a roda rola no chão, à frente dele.
- **O corpo tem dois ângulos:**
  - o da coxa: o quanto o quadril vai à frente do joelho;
  - o da dobra do quadril: o quanto o tronco fica dobrado sobre a coxa.

  A lombar fica 4° menos curvada que em pé ("costelas para baixo, pelve um pouco enrolada") o caminho todo.
- **No começo:** a coxa fica quase na vertical (4°). A dobra do quadril é a que põe os ombros em cima da roda, com o braço estendido (cotovelo a 8°) na vertical.
- **No ponto mais longe:** o quadril fica estendido, com o corpo reto dos joelhos aos ombros. A coxa fica onde essa linha dá 37° com o chão (correção de 04/11; a ficha só diz "até onde a lombar não arqueia").
- **No meio:** a roda anda do começo ao fim, e o quadril se abre na mesma proporção. A coxa sai do braço estendido: ela vai à frente até o cotovelo dobrar os 8° da ficha. Com isso, o braço fica com o mesmo ângulo o caminho todo, e o quadril vai à frente junto com a roda.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica e o texto do app pedem | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Ajoelhado no colchonete; os joelhos parados | consenso | os joelhos e os pés andam 0 cm no ciclo | sim |
| Roda embaixo dos ombros, braços estendidos | consenso | no começo, o centro do ombro fica 0,1 cm atrás do eixo da roda; o cotovelo dobra 8° | sim |
| Braços quase retos o caminho todo | consenso | o cotovelo fica a 8,0° na ida inteira | sim |
| Mãos nos pegadores | medida | o centro de cada mão fica no meio do pegador (0 cm) | sim |
| A roda rola no chão | medida | ela anda 65,2 cm e gira 368°; o arco girado e o caminho diferem 0 cm | sim |
| O quadril acompanha, numa linha só com o tronco | consenso | o quadril anda 30 cm à frente (46% do que a roda anda) e vai à frente o caminho todo; a dobra do quadril vai de 53° a 0° | sim |
| Só até onde a lombar não arqueia | consenso | a lombar fica 4° menos curvada que em pé em toda a ida (nunca afunda) | sim |
| Ponto mais longe: corpo reto dos joelhos aos ombros | consenso | a linha dos joelhos aos ombros fica a 37° do chão; o quadril fica 0,2 cm acima dela; o quadril dobra 0° | sim |
| O rosto e o peito não encostam no chão | consenso | a cabeça fica no mínimo a 54 cm do chão; o peito e a barriga, a 23 cm | sim |
| Ida ~2–3 s; ponto mais longe; volta ~1–2 s | consenso | ida de 2,5 s, pausa de 0,5 s, volta de 1,5 s; pausa de 0,5 s ajoelhado; ritmo de 4,1% (limite 15%) | sim |

Conferência automática: **0 falha**. Na mulher, também 0 falha: a roda anda 58 cm.

Avisos:

1. **Flexão plantar de 80,7°:** o peito do pé fica no colchonete, como na puxada unilateral aprovada.
2. **As linhas que são escolha de desenho:** `joelhos.meiaDistancia`, `colchonete.z`, `inicio.coxa` e `cervical`.

Músculos: de lado, o abdômen aparece com 159 cm² (é a vista padrão do modo Músculos). De três quartos pela frente, aparece com 144. Os oblíquos ficam listrados ("só ajudam", correção de 03/11).

## As vistas

Testei as candidatas e medi o abdômen em cada uma (cm²):

| Vista | Abdômen |
|---|---|
| de lado | 159 |
| de três quartos pela frente | 144 |
| de frente | 132 |
| de cima | 0 |
| de trás | 0 |
| de três quartos por trás | 0 |

- A primeira vista é a **de lado**: o corpo grande, a linha dos joelhos aos ombros, a lombar e a roda andando.
- A segunda é a **de três quartos pela frente** (`quina`): mostra a roda com os dois pegadores, as duas mãos fechadas neles e a barriga.
- A de cima não serve: o corpo fica deitado sobre o abdômen, e de cima a roda vira um traço sob a cabeça.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Arquear a lombar (de lado, no ponto mais longe) | a lombar afunda 16° além da curva de quem está em pé, e o quadril passa da linha (o quadril estendido 6°). A pelve fica 5 cm mais baixa que no movimento certo, e a barriga, a 18 cm do chão |
| Deixar o quadril para trás (de lado, no fim) | a coxa fica parada quase na vertical, e o tronco deita (a dobra do quadril vai de 53° a 75°). Só os braços vão à frente: o ombro dobra até 122°, e a cabeça fica a 39 cm do chão |
| Ir rápido demais (de lado, aos 30% da ida) | o corpo já chegou quase ao ponto mais longe: ele chega com 35% do tempo da ida |

## Correções já feitas que esta animação respeita

- A amplitude é a do corpo a 37° do chão (04/11), e a ficha manda parar antes de a lombar arquear: a roda anda 65 cm no homem (57 na animação de hoje, que tinha outro boneco).
- Os oblíquos só ajudam (03/11): estão listrados; o abdômen é o principal.
- A roda tem 9 cm de raio no chão, com o eixo pelas duas mãos e um pegador de cada lado (04/11). Agora o raio é o da Rogue, 10,2 cm.

## O que não ficou bom

- **Os dois rótulos ficam lado a lado, acima das costas,** e os fios descem até o quadril e a lombar, cruzando o contorno das costas. Eles não se cruzam. É o mesmo jeito do face pull aprovado ("peito parado" desce até o C7).
- **O erro "arquear a lombar" é discreto,** de propósito ("sem exagero"): o que se lê é a linha vermelha dobrando no quadril e a barriga mais baixa. Se o dono quiser mais visível, a ficha tem o número (`erro.lombar.lombar`).
