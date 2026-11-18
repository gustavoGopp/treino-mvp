# Lote C1 · Coice na máquina de glúteo (`coice-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). De quatro apoios na máquina de glúteo: o joelho esquerdo na almofada, os antebraços nos apoios e as mãos nos pegadores; a sola do pé direito na plataforma da alavanca, que gira num eixo na linha do quadril; a coxa vai de sob o peito (o quadril dobrado ~90°) até a linha do tronco, com o joelho a 90°. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/coice-maquina.md`. Cartão do app: `src/conteudo/exercicios/coice-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/coice-maquina.json`.
- Animação: `src/engine/novo/exercicios/coice-maquina.ts`, sobre o núcleo dos exercícios em quatro apoios (`exercicios/quatro-apoios.ts`, o dos coices com elástico e com caneleira aprovados), sem mudar nada nele: usa a perna de apoio e o tronco com os desvios dos erros; a frente (antebraços nos apoios) é deste arquivo. Regras medidas: `src/engine/novo/regras/coice-maquina.ts`, mais duas dos coices em quatro apoios (`coice-coxa-na-linha-do-tronco`, `coice-quadril-nao-gira`, em `regras/quatro-apoios.ts`), com o mesmo id.
- A máquina (peça nova): `src/engine/novo/pecas-de-cena/gluteo-maquina.ts`, medidas em `src/engine/novo/dados/objetos/gluteo-maquina.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-gluteo-maquina.png`.
- Quadros grandes: `../quadros/coice-maquina.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Qual máquina

A ficha da técnica e o cartão pedem a de **quatro apoios com a sola na plataforma**: "tronco apoiado (peito ou antebraços na almofada), um pé na plataforma ou na alavanca; o outro joelho apoiado". As fichas que o plano listava (Life Fitness SS-GL, Hammer Strength HS-HG, Movement Next Glute) e o cartão de equipamento de hoje são de máquinas em pé (outro tipo); as de quatro apoios lidas são a Precor GSL0617 (o tamanho total) e a Atlantis C-122 (os apoios dos antebraços, a plataforma de borracha). Escolhi os antebraços (e não o peito) na almofada, como a Atlantis, a Movement e o cartão de hoje.

## Onde os números saem

A ficha da técnica dá a técnica em palavras e um número (o quadril dobrado ~90° no começo). O caminho da coxa, o joelho a 90°, a lombar, o pescoço, o ritmo e os erros são os do coice com caneleira aprovado. **A inclinação das costas não é escolhida:** com o braço na vertical e o antebraço deitado, as costas inclinam até a parte de baixo do cotovelo encostar no topo do apoio (50 cm do chão, de desenho); deu 11,9° de subida dos ombros. **O quadril fica no eixo:** a almofada dos joelhos regula na altura (27,7 cm) para o centro do quadril cair na linha do eixo (74 cm). **A plataforma não é posta a olho:** no começo, a face dela fica na sola (0,3 cm de amassado); a distância ao eixo (66 cm) e o giro dela em relação à alavanca ficam fixos, e no ciclo a alavanca gira com a perna.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Tronco apoiado (antebraços na almofada) | consenso | os antebraços ficam a −0,2 cm do topo dos apoios (afundam no estofado), o cotovelo a 1,5 cm da vertical do ombro; as mãos fecham nos pegadores em pé e não se mexem (0 cm); a linha dos ombros ao quadril sobe 11,9° à frente | sim |
| O outro joelho apoiado | consenso | o joelho esquerdo fica a −0,4 cm do topo da almofada; a canela deita nela para trás; o joelho e o pé de apoio não se mexem (0 cm) | sim |
| Um pé na plataforma | consenso | a pele da sola fica a −0,3 cm da face da plataforma (amassa a borracha), o ciclo todo; a plataforma fica a 66 cm do eixo (a alavanca não estica) | sim |
| Começa com o quadril dobrado ~90° | consenso | no começo, o quadril mede 88,9° de flexão; a coxa fica 12° à frente da vertical, com o joelho sob o peito, ao lado da almofada | sim |
| Empurra para trás estendendo o quadril até a coxa alinhar com o tronco | consenso | no alto, a coxa faz 0° com a linha do tronco (o joelho a 0 cm dela); o quadril vai de 88,9° a −1,2° | sim |
| A lombar não arqueia no fim; o movimento é do quadril | consenso | a bacia gira 0° no ciclo; o joelho fica a 90° o tempo todo; o centro do quadril direito fica a 0 cm da linha do eixo | sim |
| Volta controlando | consenso | empurra em 1 s, pausa de 0,5 s, volta em 2 s; o ritmo é suave (salto de 5,2% da velocidade de pico, limite 25%); o último quadro emenda no primeiro (0 cm) | sim |
| Sem girar o quadril | consenso | a linha dos quadris fica a 0° da horizontal, a bacia não anda (0 cm), a coxa não abre (0°) | sim |
| A máquina funciona (o cuidado 13) | consenso | a alavanca gira com a coxa (diferença de 0°); as placas sobem 17,3 cm, exatamente o arco do came (raio de 11 cm × 90° girados) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs coice-maquina`): 0 falha, 2 avisos.** (1) A flexão plantar do tornozelo de apoio (80,7°, acima da média de 56,7° e abaixo do máximo de 90°): é o peito do pé esquerdo deitado na almofada, o mesmo aviso do coice com caneleira aprovado. (2) As linhas da ficha de movimento que são escolha de desenho (`cervical`, `umero.aFrente`, `antebraco.paraDentro`, `apoio.amassa`, `pe.flexaoPlantar`, `plataforma.amassa`, `quadro.ate`, `placas`).

## As vistas

- **De lado** (padrão do modo Técnica e do modo Músculos): mostra a coxa saindo de sob o peito até a linha do tronco, a sola na plataforma e o glúteo direito inteiro.
- **De três quartos pela frente** (`quina`, a segunda vista, a dos coices aprovados): mostra a almofada só sob o joelho de apoio, os apoios dos antebraços e a alavanca do lado de fora da perna.
- De trás (`posterior`) fica para o erro de girar o quadril, como no coice com caneleira.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar | de lado | a perna sobe 20° acima da linha do tronco e a bacia vira 14° para a frente, com a lombar arqueando o mesmo tanto e o peito parado (os números do coice com caneleira aprovado); no fim, o quadril mede −7° (passa da linha) |
| Girar o quadril | de trás | a bacia rola 16° para o lado da perna que trabalha, em volta do quadril de apoio, e a coxa abre 21°; a plataforma, que só gira no eixo, fica onde a alavanca a leva (o pé escorrega para o lado dela) |

**Sem desenho:** "Soltar a volta" ("a volta sem controle") é erro de ritmo: a pose é a do movimento certo, só mais rápida na volta. Não inventei consequência; o guia mostra o movimento certo com o texto do erro, como o "Soltar a volta" do supino entre as torres. Quem integra põe a exceção em `SEM_DESENHO` do teste da ponte.

## O equipamento

A máquina de glúteo de quatro apoios é peça nova (folha `folha-gluteo-maquina.png`). O tamanho total vem da Precor GSL0617 (127 × 132 × 145 cm, torre de 148 cm), que diz que o movimento fica no quadril ("isolating movement at the hip joint"): o eixo da alavanca fica na linha do quadril. A Atlantis C-122 dá os apoios dos antebraços com os pegadores e a plataforma de borracha. O resto é de desenho. O came e a pilha têm as medidas da cadeira flexora aprovada. **A alavanca, o came e o pé do eixo ficam do lado de fora da perna direita, do lado de quem olha de lado, e são pintados atrás do corpo** (o mesmo corte de ilustração do lado de perto do smith, aprovado): senão cobririam o glúteo e a coxa. No quadro, a torre é cortada pela borda em 126 cm.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. O backlog registra que o cartão de hoje "a máquina de glúteo é genérica" (`correcoes-ja-feitas.md`, desenhos pequenos ou genéricos): a peça nova tem a almofada dos joelhos, os apoios dos antebraços, o came no eixo, a plataforma do pé e a torre.

## O que não ficou bom

- **A máquina não é a das fichas do plano nem a do cartão de equipamento de hoje** (os dois são de máquina em pé). A técnica manda a de quatro apoios; se a academia típica tiver a em pé, o cartão de equipamento e a animação vão mostrar máquinas diferentes. É decisão do Gustavo qual das duas o app mostra (ver o resumo do grupo).
- **A alavanca é pintada atrás do corpo.** De lado, ela parece passar por trás da perna, quando está do lado de fora dela; o came, no quadril, fica escondido. É o corte do smith, mas aqui a peça é móvel e se nota mais.
- **A almofada dos joelhos é uma só, sob o joelho de apoio** (a Precor tem duas, "double knee pad"): com duas, o joelho que trabalha não chegaria sob o peito e o quadril começaria dobrado 65°, e não ~90°.
- **De lado, a cabeça e as mãos ficam na frente da torre** (a torre fica na frente, do outro lado). Os rótulos ficam livres.
- **No erro de girar o quadril, a sola sai da plataforma para o lado** (a plataforma só gira no eixo). É o que acontece, mas o pé parece pisar no ar.
