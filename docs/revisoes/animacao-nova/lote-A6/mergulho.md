# Lote A6 · Mergulho nas paralelas (`mergulho`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Corpo sustentado nas paralelas com os braços estendidos e os ombros longe das orelhas; desce com o tronco um pouco à frente até o braço ficar quase paralelo ao chão e volta até estender os cotovelos, sem travar. As pernas ficam paradas, dobradas, com os pés para trás. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/mergulho.md`. Cartão do app: `src/conteudo/exercicios/mergulho.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/mergulho.json`.
- Animação: `src/engine/novo/exercicios/mergulho.ts`, sobre o núcleo do corpo sustentado pelas mãos (`exercicios/pendurado.ts`, como a elevação de joelhos nas paralelas aprovada) e a peça das paralelas que já existe (`pecas-de-cena/paralelas.ts`). Regras medidas: `src/engine/novo/regras/mergulho.ts` e as do corpo pendurado (`regras/pendurado.ts`).
- Quadros grandes: `../quadros/mergulho.png`. **Sem folha** (não há animação de hoje para comparar).

## Onde os números saem

A ficha da técnica não dá números (consenso, `nsca2021` não verificado). O que ela não dá saiu da elevação de joelhos nas paralelas aprovada (a escápula baixa, para onde o cotovelo aponta, os pés soltos) e da barra fixa aprovada (o erro de balançar), com selo `desenho` e o motivo em cada linha. **O fim da descida não é um ângulo de cotovelo escolhido:** é o cotovelo em que o braço (do ombro ao cotovelo) chega a 12° abaixo da horizontal com o corpo parado no prumo das mãos, calibrado por bisseção (`calibragem`, gravado no preparo). O corpo fica em equilíbrio em todos os quadros: o centro de massa na vertical das mãos (o tronco vai à frente e as pernas, para trás).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Braços estendidos nas paralelas (em cima) | consenso | em cima, o cotovelo dobra 8° | sim |
| Ombros longe das orelhas | consenso | do alto do ombro à base do crânio, ao longo do tronco: no mínimo 20,8 cm no caminho (em pé, parado: 18,7 cm); a clavícula fica de 1° a 2,6° de elevação | sim |
| Tronco levemente inclinado à frente | consenso | o tórax inclina 7,3° à frente da vertical em cima e 23,3° embaixo | sim |
| Desce até o braço ficar quase paralelo ao chão, sem dor no ombro | consenso | embaixo, o braço fica 12° abaixo da horizontal (o cotovelo um pouco abaixo do ombro) e o cotovelo dobra 104,8°; no caminho, o braço nunca passa da horizontal | sim |
| Empurra até estender os cotovelos, sem travar | consenso | volta aos 8° de cima, pelo mesmo caminho; o último quadro emenda no primeiro (0 cm) | sim |
| "Pernas paradas" (cartão) | consenso | o quadril (8,5°) e o joelho (69,9°) não mudam no ciclo; o pé fica a no mínimo 64,9 cm do chão | sim |
| Corpo parado (sem balanço) | consenso | o centro de massa fica a 0 cm da vertical das mãos em todos os quadros | sim |
| As mãos nas barras | consenso | o centro da pegada fica no eixo da barra (0 cm), com a mão fechada no diâmetro dela, e não anda; o corpo fica a no mínimo 1,8 cm das barras (o antebraço) | sim |
| Tempo | consenso | descida de 2,2 s, pausa de 0,25 s embaixo, subida de 1,3 s (o cartão não dá número: escolha de desenho, com a descida mais lenta que a subida) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas de desenho da ficha de movimento (`tronco.cima`, `polo.*`, `pescoco`, `quadril`, `joelho`, `pe.plantar`, `pernas.juntas`). (2) O modo Músculos abre de frente (peito: 464 cm²); de lado o principal aparece pouco (142 cm²: o tríceps, atrás do braço).

## As vistas

**De lado** (padrão do modo Técnica): mostra a descida, o braço chegando perto da horizontal, o tronco à frente e as pernas paradas. **De frente** (segunda vista, padrão do modo Músculos: o peito, 464 cm²): mostra os ombros longe das orelhas. De três quartos pela frente a descida se lê muito bem, mas o peito aparece pouco (153 cm²) e, em cima, só se vê um braço: ficou de fora.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Descer demais | de lado | o ombro passa abaixo do cotovelo (o braço 7° acima da horizontal; o cotovelo dobra 117°, contra 105° no certo) e, no fundo, o ombro rola para a frente e sobe: a clavícula sobe a 19,5° (no certo, 2,6°) e o alto do ombro fica a 16,2 cm da base do crânio (no certo, 20,8) |
| Balançar | de lado | no meio da subida, as pernas chutam para a frente (o quadril dobra até 55° e o joelho estica até 25°) e o centro de massa sai 9 cm à frente das mãos |
| Amplitude curta | de lado | embaixo, o braço para a 48° da horizontal (o cotovelo dobra só 51,5°) |

"Descer demais" foi limitado pelo corpo: com o cotovelo além de uns 130°, o braço do Boneco já não alcança as barras com o corpo no prumo; o erro mostra o ombro abaixo do cotovelo e rolando, que é a consequência que o cartão descreve.

## O equipamento

As paralelas são a peça aprovada da elevação de joelhos nas paralelas (Body-Solid: barras a 132,4 cm do chão, 50,8 cm entre elas, Ø 4,4 cm), sem mudança. A estrutura até o chão é cenário.

## Correções já feitas que esta animação respeita

`correcoes-ja-feitas.md`, item 12 da anatomia: peito e tríceps como principais (mantido); a frente do ombro em laranja (a biblioteca). A auditoria Fable ("incoerência 2") concordou em contar o tríceps inteiro.

## O que não ficou bom

- **De frente, a descida quase não aparece:** os cotovelos vão para trás e somem atrás do braço; a vista de frente serve aos ombros e ao peito. De três quartos a descida se lê melhor, mas o peito some (ver "As vistas").
- **As pernas dobradas com os pés para trás** são escolha de desenho (a ficha não diz); com as barras a 132 cm, as pernas esticadas também não chegariam ao chão.
- **No erro "Balançar"**, de lado, as pernas esticadas para a frente ficam desenhadas por cima do montante das paralelas (só sobreposição; elas não encostam nele).
