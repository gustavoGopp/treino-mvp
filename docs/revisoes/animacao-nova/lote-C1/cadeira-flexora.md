# Lote C1 · Flexão de joelho na cadeira flexora, sentado (`cadeira-flexora`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto), na cadeira flexora aprovada pelo Gustavo na Parte B (`pecas-de-cena/cadeira-flexora.ts`, `folha-cadeira-flexora.png`). Sentado e encostado, as mãos nas alças, a trava presa nas coxas logo acima do joelho, o rolo atrás do tornozelo; as duas canelas dobram juntas para baixo e para trás, a alavanca gira no eixo ao lado do joelho e as placas sobem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/cadeira-flexora.md`. Cartão do app: `src/conteudo/exercicios/cadeira-flexora.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/cadeira-flexora.json`.
- Animação: `src/engine/novo/exercicios/cadeira-flexora.ts`, sobre o núcleo novo das cadeiras de joelho (`exercicios/cadeira-de-joelho.ts`), que a cadeira extensora também usa. Regras medidas: `src/engine/novo/regras/cadeiras.ts`.
- Quadros grandes: `../quadros/cadeira-flexora.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras. O que ela não dá em número saiu das animações sentadas aprovadas (a lombar menos curva sentado, o pescoço que compensa a inclinação do peito, o glúteo que afunda 1 cm, o ritmo do erro de tranco: `extensao-joelho-mini-band` e `extensao-joelho-caneleira`), com selo `desenho` e o motivo em cada linha. **A posição do corpo e as regulagens da máquina não são números escolhidos:** saem de condições, uma vez por corpo (gravadas no preparo):

- o centro do joelho cai no eixo da máquina (a regra da técnica); como a coxa tem o comprimento da tabela, o quadril fica num arco em volta do eixo, e a altura dele nesse arco é a que põe o glúteo e a coxa no assento, afundando 1 cm;
- o tronco deita até as costas ficarem paralelas ao encosto (a folga de baixo igual à de cima) e volta 6° para a frente (a ficha: "inclinar um pouco o tronco à frente alonga mais os posteriores", maeo2021); a lombar continua no encosto;
- o encosto anda até tocar as costas (regulado em 8,4 cm dos 16 de curso: cabe no curso); o rolo corre na alavanca até o centro dele ficar a 38 cm do joelho, atrás da canela (40,0 cm do eixo); a trava desce até afundar 0,5 cm nas coxas (face de baixo a 69,4 cm do chão);
- a posição inicial da alavanca (a regulagem "start position") é onde ela fica com os joelhos quase esticados: as placas apoiam ali e sobem o arco do came (raio × ângulo girado).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Encosto ajustado para o joelho ficar alinhado com o eixo | consenso | o centro dos dois joelhos fica a 0 cm do eixo em todo o ciclo | sim |
| O rolo de cima trava a coxa logo acima do joelho | consenso | a trava (a almofada da peça aprovada, 22 cm ao longo da coxa, a 4 cm da borda do assento) afunda 0,5 cm na pele de cima das coxas, parada | sim |
| O rolo de baixo fica atrás do tornozelo | consenso | o rolo encosta na pele atrás da perna (0 cm de folga) e toca a canela sempre a 38 cm do joelho, sem escorregar (0 cm) | sim |
| Dobra os joelhos trazendo os calcanhares para baixo e para trás até onde der | consenso | o joelho vai de 10° a 115°; a alavanca gira de 74,6° a −30,4° (105°); as placas sobem 20,2 cm, no arco do came (0 cm de diferença) | sim |
| Início: joelhos quase esticados | consenso | 10° de flexão; as placas apoiam (0 cm) | sim |
| Pausa curta no fim; volta controlada, sem bater as placas | consenso | 0,6 s no fim; volta em 2 s, com velocidade suave; embaixo as placas chegam a 0 cm, sem passar | sim |
| Sentado e encostado (um pouco à frente alonga mais) | consenso / um estudo | o glúteo e a coxa afundam 1 cm no assento; a lombar no encosto (0 cm); o tronco 6° menos deitado que o encosto; a bacia não se mexe (0 cm); o quadril dobra 79° | sim |
| Mãos nas alças (escolha de desenho: o cartão não diz) | desenho | as mãos fecham nas alças da peça aprovada (0 cm do meio delas, sem falta de alcance), os ombros 25° à frente | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs cadeira-flexora`): 0 falha, 1 aviso.** O aviso: as linhas da ficha de movimento que são escolha de desenho (`assento.amassa`, `lombar.sentado`, `pescoco.compensa`, `maos.naAlca`, `maos.prot`, `rolo.amassa`, `pe.flexaoPlantar`, `placas`). O corpo encosta nos estofados até 1 cm (tolerância 2,5); o ponto mais baixo do corpo fica a 10,4 cm do chão.

## As vistas

**De lado** (padrão do modo Técnica e da miniatura): o joelho no meio do came, a canela que dobra, o rolo atrás do tornozelo e a trava sobre as coxas. A alavanca e a torre ficam do lado esquerdo de quem senta (a peça aprovada), atrás das pernas: o came aparece como um disco em volta do joelho, que é o que ensina "joelho no eixo". **De três quartos pela frente** (segunda vista): a trava sobre as duas coxas, o rolo atrás das duas canelas, a alavanca e a pilha subindo. Os posteriores (o principal) aparecem de lado, por baixo da coxa; de três quartos, pouco.

## Erros (os quatro do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Rolo da coxa solto | de lado | a trava fica 6 cm acima das coxas e, no fim da flexão, o quadril sobe 5 cm do banco (a coxa gira em volta do joelho, que segue no eixo); as costas descolam 0,9 cm do encosto |
| Dar tranco | de lado | no meio da flexão, o joelho já está a 108° (o certo: 62°): a perna jogada pelo embalo; as placas já subiram 18,9 cm (o certo: 10,1) |
| Joelho fora do eixo | de lado | o encosto regulado 6 cm para trás: o joelho fica 6 cm atrás do eixo e o rolo escorrega pela canela (de 43,4 cm do joelho no começo a 33,1 cm no fim) |
| Não estender na volta | de lado | na volta, o joelho para dobrado a 45° (o certo: 10°); as placas não chegam a apoiar (6,7 cm acima) |

"Dar tranco" é erro de ritmo; o que se desenha é a consequência visível ("o peso sobe no embalo"), como no "Chutar a perna" da extensão com caneleira aprovada (o mesmo expoente 4). Os quatro erros têm desenho; nenhum fica fora.

## O equipamento

- **Cadeira flexora:** a peça aprovada, sem mudança no desenho nem nos volumes por padrão. Acrescentei duas opções desligadas por padrão (`OpcoesDaPeca`): `travaAParte` (a trava das coxas sai da estrutura numa peça própria, para ser pintada por cima das coxas enquanto a estrutura fica atrás do corpo; sem isso, a trava sumia atrás das pernas) e `cantosRedondos` (na conferência, cada estofado vira duas caixas em cruz, sem os cantos, como o desenho os arredonda: sem isso, a panturrilha passava 2,6 cm pelo canto vivo da caixa do assento por volta de 100° de joelho, onde o desenho tem o canto redondo). Conferi que a peça, sem as opções, desenha exatamente o mesmo SVG de antes (comparação byte a byte de 12 desenhos: duas regulagens, três ângulos da alavanca e duas câmeras, mais os volumes e os pontos).
- **Regulagens para o corpo do app:** encosto em 8,4 cm (de 16), rolo a 40,0 cm do eixo, trava a 69,4 cm do chão, posição inicial da alavanca a 74,6°, 5 placas no pino.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação).

## O que não ficou bom

- **As mãos só chegam às alças com o tronco 6° à frente do encosto e os ombros 25° à frente.** A peça aprovada põe a borracha das alças 6 a 18 cm à frente do meio do assento; com o tronco colado no encosto de 20°, faltavam 1,7 cm de alcance. A ficha permite "inclinar um pouco o tronco à frente" (maeo2021), e é o que ficou; o número (6°) é de desenho. Com 8°, a barriga encostava na trava (2,1 cm).
- **A trava é grande:** a almofada da peça aprovada tem 22 cm ao longo da coxa e cobre do joelho até o meio da coxa, não só "logo acima do joelho". É a medida aprovada; não mexi.
- **De três quartos, o músculo principal aparece pouco** (os posteriores ficam por baixo da coxa, contra o assento). O modo Músculos abre de lado, onde a faixa vermelha embaixo da coxa se lê.
- **O fio do rótulo "coxa travada"** vai até o quadril (o ponto da coxa que o rótulo aceita) e passa pelo antebraço.
- **O pé, no fim, fica a 10 cm do chão e um pouco à frente do pé do assento:** é o "até onde der" desta máquina com o assento de 50 cm (de desenho, na peça aprovada). Mais de 115° e a canela chega ao pé do assento.

## Correção de 18/11 (auditoria)

A auditoria de 18/11 (`../auditoria-fase-c.md`) tirou esta animação da aprovação. O que ela achou, a causa, o que mudou e os números antes e depois (corpo do app; "anéis" = os do Boneco, medidos como na auditoria: o ponto de cada anel mais perto de quem olha, se está na frente do rolo e foi pintado por baixo dele).

| Achado | Causa | O que mudou | Antes | Depois |
|---|---|---|---|---|
| **Três quartos, o ciclo todo: o rolo, atrás das canelas, pintado na frente das pernas** (grave) | O Boneco entra na ordem de pintura pelo centro do corpo (a perna de perto vai junto com o tronco, sentado lá atrás); o rolo, a alavanca, a luva e a haste entram cada um pelo próprio centro, mais perto de quem olha. Não era só o rolo: a alavanca e a luva (do lado de fora da perna de longe) também saíam por cima das pernas, em cinza, que a medida da auditoria não via | A parte que se mexe vai para trás na ordem de pintura (`pintura.movelAtras` e `pintura.roloAtras`, 60 cm cada, na ficha; opção `dz` da peça, desligada por padrão). O desenho não muda | anéis por baixo do rolo, no pior quadro do ciclo: canela direita 5 de 13, pé direito 14 de 20, pé esquerdo 7 de 20 (no começo, 7 e 6 de 20, como a auditoria) | 0 em todas as canelas e pés, nos dois lados, nas duas vistas, na técnica e nos quatro erros |
| De lado, erro "Joelho fora do eixo": o encosto pintado sobre as costas (médio) | Não reproduzi. O encosto vai na estrutura, que é cenário (pintada numa camada abaixo de todo o corpo); medindo como a auditoria descreve (o pixel de cada anel do tronco e das coxas na tela), nenhum anel fica por baixo de estofado, antes e depois. Nos quadros grandes (antes e depois), as costas ficam por cima do encosto | Nada no desenho; a regra nova confere a ordem | 0 anéis | 0 anéis |
| De lado, erro "Rolo da coxa solto": as mãos sobem da alça (médio) | Com a bacia 5 cm acima do banco, o braço (já quase esticado na técnica, cotovelo a 9°) não alcançava a alça | Nos erros, os ombros descem (as mãos empurram as alças) até 10° da clavícula (`erro.ombros.desceMax`, de desenho); se nem assim alcançam, a bacia sobe só o que os braços deixam (calibrado uma vez por corpo) | mãos a 4,6 cm da alça | 0,0 cm; os ombros descem 10° e a bacia sobe 2,8 cm (pedidos 5) |
| (achado aqui) Erro "Joelho fora do eixo": as mãos também saíam da alça | O corpo recua 6 cm e as alças não | O mesmo | 1,7 cm | 0,0 cm (os ombros descem 6,9°) |
| (achado aqui) Erro "Joelho fora do eixo": o rolo solto no fim | O rolo escorregava calculado pela linha da canela, e a canela afina perto do tornozelo | No erro, o rolo encosta na pele de verdade (canela e pé) | o rolo a 2,7 cm da canela no fim | encostado (−0,3 cm na canela, −0,5 no pé) |

**O que ainda sobra, medido:** de três quartos, com os joelhos quase esticados, a frente do rolo (que fica embaixo do calcanhar) tapa de verdade uma tira da sola junto do calcanhar, e o rolo, pintado atrás das pernas, fica por baixo dela: 3 pontos da face do rolo (cerca de 9 cm²) na perna direita e 2 na esquerda. Escolhi o rolo inteiro atrás (o que se lê é o rolo atrás das canelas, que era o erro); a regra aceita até 5 pontos por perna, e diz isso. O erro "Joelho fora do eixo" ainda tem a canela 2,8 cm dentro do assento (achado pequeno da auditoria, fora deste pedido; não mexi).

**A conferência nova (`cadeira-flexora-pintura-e-maos`, em `regras/cadeiras.ts`)** mede, nas duas vistas declaradas, na técnica (um quadro a cada seis) e em cada erro (no começo, no meio e no fim), nos dois lados do corpo, com o mesmo desenho que o app pinta (o Boneco com os ajustes do quadro e a máquina com o recorte do rolo): os anéis das canelas e dos pés na frente do rolo e pintados por baixo dele (até 1 por parte: a linha de contato); o contrário, os pontos da face do rolo na frente das pernas e pintados por baixo delas (até 5 por perna, a 1,5 cm da borda da perna na tela); o encosto e o assento pintados antes do tronco; e as duas mãos a no máximo 0,5 cm do meio da alça, também nos erros. No estado antigo ela falha (canela direita 5/13, pé direito 14/20, pé esquerdo 7/20; mãos a 4,6 cm no "Rolo da coxa solto"); agora passa.

**Conferência automática:** `node scripts/animacao-nova/conferir.mjs cadeira-flexora`: 0 falhas, 1 aviso (as linhas de desenho da ficha, agora com `erro.ombros.desceMax` e `pintura.movelAtras`). A folha da peça (`folha-pecas.mjs cadeira-flexora`) saiu igual, byte a byte. Quadros grandes regravados (`../quadros/cadeira-flexora.png`, agora com o meio de três quartos); olhei também os quatro erros de três quartos.
