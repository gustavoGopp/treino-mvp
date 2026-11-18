# Lote C1 · Cadeira extensora (`cadeira-extensora`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto), na peça nova da cadeira extensora (`pecas-de-cena/cadeira-extensora.ts`, a irmã da cadeira flexora aprovada; folha em `docs/revisoes/animacoes-restantes/pecas/folha-cadeira-extensora.png`). Sentado e encostado no encosto reclinado, as mãos nas alças ao lado do quadril, o rolo na frente da canela, logo acima do pé; as duas canelas sobem juntas de bem dobradas a quase esticadas, a alavanca gira para a frente e para cima e as placas sobem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/cadeira-extensora.md`. Cartão do app: `src/conteudo/exercicios/cadeira-extensora.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/cadeira-extensora.json`.
- Animação: `src/engine/novo/exercicios/cadeira-extensora.ts`, sobre o núcleo das cadeiras de joelho (`exercicios/cadeira-de-joelho.ts`, o mesmo da cadeira flexora). Regras medidas: `src/engine/novo/regras/cadeiras.ts`.
- Quadros grandes: `../quadros/cadeira-extensora.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

Como na cadeira flexora (ver `cadeira-flexora.md`): o joelho no eixo e o glúteo no assento dão a bacia; o tronco deita até as costas ficarem paralelas ao encosto de 20° (aqui sem voltar à frente: a ficha pede o quadril encostado, e o app, "recline-o um pouco"); o encosto anda até as costas (7,9 cm dos 16 de curso), o rolo corre na alavanca até o centro dele ficar a 36 cm do joelho, na frente da canela (36,9 cm do eixo); a posição inicial da alavanca é a dos joelhos bem dobrados (6,9°), onde as placas apoiam. O que a ficha não dá em número saiu das extensões sentadas aprovadas (`extensao-joelho-mini-band`, `extensao-joelho-caneleira`), com selo `desenho` e o motivo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Encosto ajustado para o joelho ficar alinhado com o eixo | consenso | o centro dos dois joelhos fica a 0 cm do eixo em todo o ciclo | sim |
| O rolo apoia na frente da canela, logo acima do pé | consenso | o rolo afunda 0,4 cm na pele da frente da canela e toca sempre a 36 cm do joelho (a borda de baixo dele 1,5 cm acima do tornozelo), sem escorregar (0 cm) | sim |
| Estende os joelhos até quase esticar; pausa de ~1 s | consenso | o joelho vai de 95° a 10°; 1 s em cima; a alavanca gira de 6,9° a 91,9° (85°) e as placas sobem 16,3 cm, no arco do came (0 cm de diferença) | sim |
| Descida controlada até os joelhos dobrarem bem, sem bater as placas | consenso | 2 s, com velocidade suave; embaixo, 95°, o pé a 11,6 cm do chão; as placas chegam a 0 cm, sem passar | sim |
| Quadril encostado no banco e mãos nas alças: o tronco não ajuda | consenso | o glúteo e a coxa afundam 1 cm no assento; as costas no encosto (0 cm); a bacia e as mãos não se mexem (0 cm); o quadril dobra 60° (encosto reclinado: o cartão pede "recline um pouco") | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs cadeira-extensora`): 0 falha, 1 aviso.** O aviso: as linhas da ficha de movimento que são escolha de desenho (`assento.amassa`, `lombar.sentado`, `pescoco.compensa`, `maos.prot`, `rolo.amassa`, `pe.flexaoPlantar`, `placas`). O corpo encosta nos estofados até 2,1 cm (a panturrilha, embaixo, contra a frente do assento; tolerância 2,5).

## As vistas

**De lado** (padrão do modo Técnica): o joelho no meio do came, a canela que sobe e o rolo na frente dela; o quadríceps, em vermelho, se lê inteiro no modo Músculos. **De três quartos pela frente** (segunda vista; é a que o preparo escolheu para a miniatura): o rolo na frente das duas canelas, a alavanca e a pilha subindo. Como na flexora, a alavanca e a torre ficam do lado esquerdo de quem senta, atrás das pernas na vista de lado.

## Erros (os quatro do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Dar tranco | de lado | no meio da subida, o joelho já está a 15° (o certo: 52°): a perna jogada pelo embalo; as placas já subiram 15,3 cm (o certo: 8,2) |
| Tirar o quadril do banco | de lado | no alto, o quadril sobe 6 cm do assento (a coxa gira em volta do joelho, que segue no eixo) e o tronco deita 3,4° a mais, o que precisa para as costas continuarem no encosto (medido, não escolhido) |
| Joelho fora do eixo | de lado | o encosto regulado 6 cm para trás: o joelho fica 6 cm atrás do eixo e o rolo escorrega pela canela (de 36,2 cm do joelho embaixo a 42,1 cm em cima, já sobre o peito do pé) |
| Descer rápido | de lado | no meio da descida, o joelho já está a 90° (o certo: 52°) e as placas a 1 cm de bater (o certo: 8,2 cm) |

"Dar tranco" e "Descer rápido" são erros de ritmo; o que se desenha é a consequência visível que o cartão dá ("o peso sobe no embalo"; "as placas batem"), como o "Chutar a perna" e o "Deixar a perna cair" da extensão com caneleira aprovada (o mesmo expoente 4). Os quatro erros têm desenho; nenhum fica fora.

## O equipamento

- **Cadeira extensora (peça nova):** ver `resumo-cadeiras.md` e a folha. Regulagens para o corpo do app: encosto em 7,9 cm (de 16), rolo a 36,9 cm do eixo, posição inicial da alavanca a 6,9°, 5 placas no pino.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação).

## O que não ficou bom

- **As alças ficam ao lado do quadril (8 cm atrás do meio do assento), escolha de desenho:** com o assento reto e o tronco encostado, as alças no lugar das da flexora ficavam 5 cm além do alcance. Não achei ficha pública que dê o lugar das alças.
- **No erro do joelho fora do eixo**, a diferença se lê pelo ponto do joelho fora do centro do came e pelo rolo que sobe para o peito do pé; é sutil no tamanho da miniatura.
- **No erro do quadril**, o tronco deita só 3,4° a mais (o que o encosto deixa); o que se vê é a bacia fora do assento, mais que o tronco "ajudando".
- **O assento a 56 cm é de desenho** (as fichas não dão): é o que deixa o pé fora do chão com o joelho a 95°.
