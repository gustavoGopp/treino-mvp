# Lote C3 · Rosca na máquina (`rosca-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na máquina de rosca, o tronco um pouco à frente, os dois braços deitados no apoio inclinado, os cotovelos no eixo da máquina, as mãos na barra com a palma para cima; os antebraços sobem juntos até o fim e descem até quase esticar. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-maquina.md`. Cartão do app: `src/conteudo/exercicios/rosca-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-maquina.json`.
- Animação: `src/engine/novo/exercicios/rosca-maquina.ts`, sobre o núcleo novo das máquinas de braço (`exercicios/maquina-de-braco.ts`), que o tríceps na máquina também usa. Regras medidas: `src/engine/novo/regras/maquinas-de-braco.ts` (e, das famílias aprovadas, a pilha das cadeiras, as mãos no pegador das máquinas de empurrar e as das roscas).
- A peça: `src/engine/novo/pecas-de-cena/rosca-maquina.ts` (a função comum `maquinaDeBraco`, com o modelo `ROSCA_NA_MAQUINA`), medidas em `src/engine/novo/dados/objetos/rosca-maquina.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-rosca-maquina.png`.
- Quadros grandes: `../quadros/rosca-maquina.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras: o cotovelo alinhado ao eixo, os braços apoiados, "sobe até o fim e desce controlando até o cotovelo quase estender". O manual público da Hammer Strength (HS-BC) dá o ajuste ("adjust the seat height so the back of arms rest fully on arm pad, aligning the elbows with the machine pivot", "leaning forward slightly"). O que nenhuma das duas dá em número saiu da rosca Scott aprovada (o estofado que amassa 1 cm sob o tríceps, a palma a 85°, os erros) e das máquinas sentadas aprovadas (o glúteo que afunda 1 cm, o joelho a 90°, cinco placas), com o selo `desenho` e o motivo em cada linha. **O que é calculado, e não escolhido** (uma vez por corpo, em `calibragens.ts`): o quanto o ombro sobe da face do apoio para o tríceps amassar 1 cm com o cotovelo no eixo; a bacia (o ombro cai onde o braço, do cotovelo no eixo, chega); a altura do assento (ele sobe até o glúteo); onde ficam os pés (joelho a 90°); a distância do eixo ao centro da mão (o pegador corre na alavanca até ela).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Assento na altura em que o cotovelo fica alinhado com o eixo | consenso | o assento sobe até 47 cm do chão (o curso é 40 a 62); o centro dos dois cotovelos fica a 0 cm do eixo no ciclo inteiro | sim |
| Braços apoiados na almofada ("back of arms rest fully on arm pad") | consenso | o ponto mais fundo do tríceps amassa o estofado 1 cm, nos dois braços, do começo ao fim; o centro do ombro fica 1,6° mais longe da face que o cotovelo; a axila chega ao alto do apoio | sim |
| "Leaning forward slightly", "chest up" (manual) | consenso | a bacia inclina 15° à frente; o peito fica a 0,6 cm do alto do apoio; a lombar fica 3° menos curva que em pé (limite 5°) | sim |
| Sentado (glúteo no assento) | consenso | o glúteo e a coxa afundam 1 cm no assento; a bacia 21,9 cm atrás da borda da frente; não se mexe (0 cm) | sim |
| A mão presa no pegador o tempo todo (pedido do lote) | consenso | as mãos ficam a 0 cm do centro da borracha da barra; o pegador anda num arco de 33,7 cm em volta do eixo, e a mão com ele | sim |
| Sobe até o fim | consenso | em cima, o cotovelo dobra 120°, com o antebraço a 11,6° da vertical (sem passar dela) | sim |
| Desce controlando até o cotovelo quase estender | consenso | 2,5 s; embaixo, o cotovelo dobra 12° (não trava) | sim |
| Palma para cima (a barra reta da máquina) | consenso | o antebraço supinado 85° o ciclo inteiro | sim |
| Só o antebraço se mexe | consenso | a base do pescoço anda 0 cm; o ritmo é suave (salto de 5,9% da velocidade de pico, limite 25%) e o ciclo emenda (0 cm) | sim |
| A máquina funciona (as placas sobem com a alavanca) | desenho | a alavanca gira de 60° a 168°; as placas sobem de 0 a 20,7 cm, no arco do came (raio 11 cm), e apoiam embaixo | sim |
| A barra não bate no rosto | desenho | a linha entre as duas mãos passa a no mínimo 6,3 cm da pele (cabeça), no alto | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-maquina`): **0 falhas, 2 avisos**: as linhas de desenho da ficha de movimento (assento.amassa, apoio.amassa, lombar.sentado, cervical, cabeca, pes.meiaDistancia, joelho, maos.supinacao, placas), e o antebraço "só ajuda a firmar", fora da lista do conteúdo (como nas outras roscas aprovadas). O corpo entra no máximo 1 cm num estofado (o tríceps no apoio e o glúteo no assento).

## Os erros

| Erro do cartão (na ordem) | O que o quadro mostra | Medido |
|---|---|---|
| Tirar o braço do apoio | na subida, o braço gira 20° no ombro para fora da face e o tronco vai 16° para trás: o cotovelo descola do estofado e sai do eixo; a mão continua presa na barra, que segue o arco dela | no alto, o cotovelo fica 11 cm acima e 8 cm atrás do eixo, dobrado só 47° (a subida vem do ombro e das costas); o braço não entra no estofado (no máximo 0,4 cm, na ponta de cima) |
| Descer pouco | a descida para com o cotovelo dobrado 55° | o antebraço para 43° acima do certo |

Por que o tronco vai para trás no erro: com a mão presa na barra, que só anda no arco dela em volta do eixo, o cotovelo não pode sair do apoio com o tronco parado (o braço que gira no ombro levaria a mão para fora do arco; medido: não há ângulo do cotovelo, de 0° a 170°, que feche a conta). Para o cotovelo sair, o ombro tem de ir para trás, que é o "roubar com as costas" de quem tira o braço do apoio.

## O equipamento

A máquina de rosca é nova (a folha da peça mostra o cartão de hoje ao lado e as medidas). O que se lê nos quadros: o came cinza no eixo, atrás do cotovelo (a dica "cotovelo no eixo"), o apoio dos braços inclinado sob o braço, a pilha que sobe com a alavanca e, de três quartos, a alavanca e a barra atravessada com as borrachas. O apoio é **partido no meio** (um vão de 28 cm para o peito): com o apoio inteiro, o peito do corpo da tabela entrava nele em qualquer inclinação do tronco (medido; detalhes no resumo). O fixo da máquina (a base, o assento, a coluna e a torre) é pintado atrás do corpo, como cenário; o apoio dos braços, a alavanca e a pilha entram na ordem de profundidade.

## Vistas

`lateral` (a que o app abre: o cotovelo no eixo, o braço no apoio e o antebraço que sobe se leem de relance) e `quina` (de três quartos pela frente: a barra nas mãos, a alavanca e o apoio partido). O modo Músculos abre de lado (o bíceps por cima do braço, fora do apoio).

## O que não ficou bom

- **De lado, a alavanca e a barra quase não aparecem:** a alavanca fica do lado esquerdo, atrás do antebraço, e corre na linha dele (a mão está na barra, a alavanca gira no eixo do cotovelo); a barra é vista de ponta, na mão. A máquina de lado se lê pelo came no cotovelo, pelo apoio e pela pilha; a alavanca aparece de três quartos. Pôr o came do lado de perto esconderia o cotovelo, que é a dica.
- **O apoio partido** é uma escolha minha, não a do cartão de hoje (apoio inteiro). Está explicado na folha.
- **No alto, o punho fica perto do rosto** (a barra passa a 6,3 cm da pele); com 125° de cotovelo ficava mais perto. Ficou em 120°.

Risco de o Gustavo não gostar: **médio** — o movimento e o encaixe se leem bem, mas a peça muda o desenho do cartão (o apoio partido, a torre ao lado) e de lado a alavanca some atrás do antebraço.
