# Lote C2 · Puxada pela frente na estação (`puxada-frente`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na estação de puxada, de frente para a torre, os pés no chão e as coxas presas sob os rolos; a barra longa de puxada nas duas mãos, por cima. Os braços puxam a barra da roldana de cima até a parte de cima do peito, à frente do rosto, e a devolvem até estenderem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/puxada-frente.md`. Cartão do app: `src/conteudo/exercicios/puxada-frente.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/puxada-frente.json`.
- Animação: `src/engine/novo/exercicios/puxada-frente.ts`. O braço, a barra e os erros seguem a puxada ajoelhado com a barra reta aprovada (`exercicios/puxada-barra-reta.ts`, lote A5), com a conta copiada (nada dela foi mudado nem exportado).
- Peças novas: a estação de puxada e a barra longa de puxada (`pecas-de-cena/estacao-puxada.ts`, `pecas-de-cena/torre-da-estacao.ts`, `dados/objetos/estacao-puxada.json`); a folha delas é `docs/revisoes/animacoes-restantes/pecas/folha-estacao-puxada.png`.
- Regras medidas: `src/engine/novo/regras/estacoes.ts`.
- Quadros grandes: `../quadros/puxada-frente.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras e um número: a pegada a ~1 a 1,5 vez a largura dos ombros (EMG, moderada). O que ela não dá em número saiu da puxada ajoelhado aprovada (o ombro que sobe em cima e desce no fim, a barra 6 cm abaixo do centro dos ombros, a folga de 1 cm do peito, para onde o cotovelo aponta, os três erros) e das animações sentadas aprovadas (o glúteo que afunda 1 cm), com selo `desenho` e a fonte dita em cada linha. O que o corpo resolve (calibrado uma vez, gravado em `calibragens.ts`): a altura do quadril (o glúteo e as coxas apoiam no assento), onde ficam os pés (o joelho dobra 85°), a altura dos rolos (afundam 0,5 cm no alto das coxas), a barra em cima (na linha do meio dos ombros à roldana, o cotovelo dobrando 8°) e no fim (no alto do peito, a 1 cm da pele).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado, coxas presas sob a almofada | consenso | o glúteo afunda 1 cm no assento (45 cm do chão); cada rolo afunda 0,4 cm na coxa, 8,4 cm atrás do centro do joelho, no começo e no fim; os pés no chão (0 cm), o joelho a 85°; a bacia não anda (0 cm) | sim |
| "Almofada das coxas ajustada para prender as pernas" (cartão) | consenso | os rolos descem na coluna deles até as coxas: eixo a 62,6 cm do chão | sim |
| Braços estendidos em cima | consenso | em cima, o cotovelo dobra 8°, o braço apontando para a roldana | sim |
| Pegada pronada, mãos a ~1 a 1,5 vez a largura dos ombros | moderada | os centros das mãos a 56 cm (1,37 vez os 40,8 cm entre os acrômios), parados na barra (0 cm do eixo), a 5,8 cm do fim do trecho reto; o polegar aponta para dentro (99%) | sim |
| A barra desce à frente do rosto, nunca atrás da nuca | um estudo | nos 16 quadros em que a barra passa na altura do rosto e do pescoço, ela fica no mínimo 3,1 cm à frente da pele | sim |
| Até a parte de cima do peito | um estudo | no fim, o centro da barra fica 9,8 cm abaixo da fúrcula do esterno, ao longo do tronco (a linha das axilas fica a 10,3 cm), e a barra a 1,2 cm da pele | sim |
| Cotovelos para baixo e para trás (puxada aprovada) | desenho | no fim, o cotovelo fica 22,3 cm abaixo do centro do ombro e 7,5 cm atrás dele | sim |
| O ombro desce no fim (puxada aprovada) | desenho | a ponta do ombro desce 4,9 cm do começo ao fim | sim |
| "Tronco quase parado" (cartão) | consenso | o peito fica a 8° atrás da vertical o ciclo todo; a base do pescoço não anda (0 cm) | sim |
| Volta até os braços estenderem, sem soltar o peso | consenso | 2 s de volta; em cima, as placas do pino ficam 2 cm acima das outras (o peso não encosta); o último quadro emenda no primeiro (0 cm) | sim |
| A barra e o cabo não atravessam o corpo | desenho | a barra passa a no mínimo 1,2 cm da pele (do peito, no fim); o cabo, a 6,3 cm | sim |
| O cabo sai reto da roldana até o mosquetão; a pilha sobe o que o cabo anda (1:1) | desenho | a saída fica na borda da roldana (5,5 cm do centro) e o mosquetão a 13 cm do meio das mãos o ciclo todo; o cabo anda 70,5 cm e as placas sobem 70,5 cm (a relação 1:1 da estação) | sim |

O cabo vai de 19 cm (em cima) a 89,5 cm (no fim), quase na vertical: a roldana de cima fica em cima da barra no fim.

**Conferência automática (`node scripts/animacao-nova/conferir.mjs puxada-frente`): 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`assento.amassa`, `assento.quadril`, `pes.meiaDistancia`, `joelho`, `cervical`, `cabeca`, `ombro.sobe`, `ombro.desce`, `barra.folga`, `cotovelo.polo`, `cotovelo.poloAtras`, `placas`). (2) O modo Músculos abre de três quartos por trás (as costas: 581 cm²); de lado o principal aparece pouco (176 cm²), como na puxada aprovada. Ritmo: salto de 10,8% da velocidade de pico (limite 25%).

## As vistas

Como a puxada aprovada: **de lado** (padrão do modo Técnica: a barra descendo à frente do rosto até o peito, o tronco quase parado, os rolos nas coxas, a roldana e as placas subindo) e **de três quartos por trás** (as costas e os dois braços puxando a barra longa; padrão do modo Músculos). De frente e de três quartos pela frente a torre fica entre quem olha e o corpo; de cima, a cabeça some nos ombros e o corpo vira um borrão: não servem.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Puxar atrás da nuca | de três quartos por trás | a cabeça vai à frente (o pescoço dobra 22°, o queixo 10°) e a barra passa por cima dela e desce atrás, até a nuca: no fim o centro dela fica 8,2 cm atrás do centro da cabeça e 9 cm acima do centro dos ombros, com os cotovelos para os lados (como na puxada aprovada) |
| Jogar o tronco para trás | de lado | o peito vai de 8° a 30° atrás da vertical enquanto a barra desce (o corpo balança para descer a barra); as coxas continuam presas sob os rolos |
| Não estender os braços | de lado | a volta para na metade do caminho (45%): em cima, o cotovelo fica dobrado a 117° |

## O equipamento

- **Estação de puxada (peça nova):** o tamanho das fichas da Life Fitness SS-PD (145 × 142 × 194 cm), da Hammer Strength HS-PD (138 × 84 × 227), da Movement (152,8 × 137,5 × 194,8) e da Spirit CSS-LATP (147 × 121 × 231). **Relação do cabo 1:1 e pilha de 17 placas, da ficha da Spirit** ("Pulley Ratio 1"). Desenhada com 144 cm de comprimento e 212 cm de altura: com os 194 cm da Life Fitness, a roldana de cima ficaria na altura do mosquetão com os braços estendidos de quem senta. Altura do assento, posição dos rolos e da roldana de cima: de desenho, do corpo da tabela (nenhuma ficha lida dá). Espessura das placas: provisória (a da coluna de polia).
- **Barra longa de puxada (peça nova):** 48 pol (121,9 cm), 28 mm, trecho reto de 30 pol (76,2 cm), da Titan; a Gym Gear e a REP também têm 48 pol. As pontas caem 25° (de desenho: nenhuma ficha dá o ângulo). A aba e o mosquetão são os da barra reta curta (provisórios). Não é a barra reta de 20 pol, que fica curta para a puxada.
- **O cabo** sai do mosquetão, sobe reto até a roldana de cima, corre por baixo do braço até a roldana do alto da torre e desce até a haste do pino; a pilha sobe o que o cabo anda.
- **A pintura:** o assento e a base são cenário (atrás do corpo, que senta sobre eles); os rolos, a torre, a barra e o cabo, na ordem de profundidade. O quadro mostra a frente da torre e a roldana de cima (nada sai solto pela borda).

## Mudança em arquivo comum

- `conferir.ts` e `movimento.ts`: a conferência da pilha lia sempre a relação da coluna de polia (2:1). Agora, se o cabo do quadro declarar um objeto (`fios: [{ id: 'cabo', ..., objeto: 'estacaoPuxada' }]`, o campo que já servia aos elásticos), ela lê a relação desse objeto. Sem o campo, nada muda (nenhum cabo aprovado o declara; o preparo das outras animações não mudou).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício (ele nunca teve animação). O backlog anotou que o cartão do puxador alto "fica pequeno"; a peça nova não muda o cartão de hoje. A nota de que a barra reta de 20 pol é curta para a puxada (`notas-para-o-fechamento.md`) foi respeitada: aqui a barra é a longa, nova.

## O que não ficou bom

- **De lado, no fim, o fio do rótulo "barra à frente do rosto" cruza o prumo do tronco e passa pelo pescoço** (a barra fica à frente do peito e o rótulo, do lado das costas, porque a torre ocupa o lado da frente). Na puxada aprovada os fios também atravessam o corpo; tentei apontar o rótulo do tronco para a lombar para os dois fios não se cruzarem, e eles não se cruzam.
- **A torre deixa o corpo menor que numa animação sem máquina** (a roldana de cima fica a 2 m e entra no quadro); o corpo ocupa cerca de 60% da altura do quadro, como na puxada ajoelhado aprovada.
- **As placas do pino sobem 70 cm** (a relação 1:1 da ficha): em cima elas aparecem soltas no meio da torre. É como a máquina funciona, mas pode estranhar quem olha.
- **A barra fica 9,8 cm abaixo da fúrcula, a 0,5 cm do limite de baixo da regra** (a linha das axilas mais 6 cm); é o mesmo número da puxada aprovada (6 cm abaixo do centro dos ombros).

**Risco de o Gustavo não gostar: médio.** O corpo, a barra e os erros são os da puxada aprovada, e as vistas se leem; o risco está na peça nova (a primeira estação de polia com assento e a primeira barra de puxada, com medidas de função de desenho) e no tamanho do corpo ao lado da torre de 2,1 m.
