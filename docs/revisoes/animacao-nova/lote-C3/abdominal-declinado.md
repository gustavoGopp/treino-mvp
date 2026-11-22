# Lote C3 · Abdominal no banco declinado (`abdominal-declinado`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado no banco declinado a −20°, a cabeça para baixo, os joelhos dobrados por cima dos rolos de trás dos joelhos e os tornozelos presos debaixo dos rolos da frente; as mãos cruzadas no peito. A coluna enrola até as costas saírem do banco, com a bacia parada. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/abdominal-declinado.md`. Cartão do app: `src/conteudo/exercicios/abdominal-declinado.json` (só leitura). Nenhuma correção anterior em `correcoes-ja-feitas.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/abdominal-declinado.json`.
- Animação: `src/engine/novo/exercicios/abdominal-declinado.ts`, sobre o núcleo dos abdominais aprovado (`exercicios/abdominal.ts`: a base deitada, a coluna que enrola, as mãos cruzadas), sem mudança nele. Regras medidas novas: `src/engine/novo/regras/banco-declinado.ts`.
- Peça nova: o banco declinado (`pecas-de-cena/banco-declinado.ts`, `dados/objetos/banco-declinado.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-banco-declinado.png`).
- Quadros grandes: `../quadros/abdominal-declinado.png`. Sem folha ao lado da animação de hoje (não havia animação).

## Onde os números saem

A ficha da técnica segue, por analogia, o abdominal no chão, e não dá números. A animação é o **abdominal no chão aprovado** levado para o banco: o corpo é montado deitado no chão pelo núcleo aprovado (as costas, o glúteo e a cabeça encostando, medidos na superfície do Boneco, a lombar firme 15°) e girado o ângulo do banco em volta do eixo x, com o chão virando a face do encosto. O pescoço que acompanha, as mãos cruzadas, a torácica no topo (45°) e o erro de puxar o pescoço são os do aprovado. O que muda: a lombar enrola 15° no topo (no chão, 5°), porque o cartão pede "até as costas saírem do banco"; as pernas e os rolos.

**Os rolos encostam por medida:** cada par sai do joelho (ou de 4 cm acima do tornozelo) até a pele da perna mais perto ficar a 4 cm do eixo (o raio de 5 cm menos 1 cm que amassa). A conta fica guardada (`calibragem`, chave `abdominal-declinado:rolos`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco declinado, pés presos nos rolos | consenso | o encosto a −20° (o do meio dos três declínios da Life Fitness); a pele das pernas encosta nos quatro rolos (amassa 1 cm); os pés não saem do lugar (0 cm) | sim |
| Deitado, joelhos dobrados | consenso | o joelho dobra 100°; a coxa sobe 60° acima do encosto | sim |
| Mãos cruzadas no peito, sem puxar o pescoço | consenso | os punhos andam 0 cm em relação ao tórax; a mão mais perto da cabeça fica a 9,8 cm dela | sim |
| Início: costas no banco | consenso | embaixo, as costas na altura das escápulas encostam na face (0 cm), e a cabeça também | sim |
| Enrola a coluna até as costas saírem do banco | consenso | em cima, as costas na altura das escápulas ficam a 7,7 cm da face; o ponto mais perto da lombar, a 0,1 cm (a parte de baixo dela continua apoiada) | sim |
| Quem sobe é a coluna (a bacia fica) | consenso | a pele do glúteo fica a 0 cm da face o ciclo todo; o centro do quadril anda 0 cm | sim |
| O pescoço acompanha | consenso | a cabeça dobra sobre o alto do tórax até 13° além do que dobra em pé (limite 20°) | sim |
| Desce em ~2–3 s, sem relaxar no fundo | consenso | descida de 2,5 s, subida de 1 s, pausa de 0,4 s embaixo; o ritmo não dá salto (5,2% da velocidade de pico) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs abdominal-declinado`): **0 falhas, 1 aviso** (as linhas de desenho da ficha de movimento, cada uma com o motivo). O corpo não entra no encosto (0 cm). O ponto mais baixo do corpo fica a 33 cm do chão.

## As vistas

`lateral` (a que o app abre) e `quina`, como o abdominal no chão aprovado. De lado, o enrolar da coluna sobre a bacia parada se lê de relance, com as pernas presas nos rolos; de três quartos, os dois pares de rolos e o encosto. No modo Músculos, o abdômen aparece em parte atrás dos braços cruzados, como no abdominal no chão aprovado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro do cartão | O que o boneco faz | Vista |
|---|---|---|
| Puxar o pescoço | o queixo vai ao peito (o pescoço 30°, a cabeça mais 20°) e as costas mal saem do banco (a coluna enrola 30% do certo), como no abdominal no chão aprovado | lateral, em cima |
| Subir com a coluna reta | a coluna não enrola: o quadril dobra 35° e o tronco sobe como uma tábua; a bacia assenta de novo no encosto | lateral, em cima |
| Impulso ("jogar os braços para ganhar embalo") | os braços estendidos vêm de trás da cabeça para a frente, girando 150° no ombro na subida | lateral, em cima |

Todos os erros do cartão estão desenhados. No erro "puxar o pescoço", as mãos continuam cruzadas no peito, como no abdominal no chão aprovado (o cartão diz "as mãos puxam a cabeça"; a consequência visível desenhada é o queixo no peito).

## O equipamento

Peça nova (folha: `folha-banco-declinado.png`). **Não há cartão de hoje do banco declinado:** no app, ele é o banco regulável com a marca "declina" (`banco_declinavel`). O banco regulável aprovado (Rogue AB-3, de 0° a 85°) não declina e não tem onde prender as pernas, então não serve com uma opção nova. A peça nova segue a Life Fitness LBR-DB (185 × 73 × 104 cm, o encosto de +10° a −30°, o pivô perto do centro, os rolos na ponta) e a largura do encosto da Hammer Strength FW-DB (29,2 cm). De desenho: o comprimento do encosto (100 cm, do glúteo à cabeça), a altura, os rolos (10 cm, como os do banco romano) e onde eles ficam (do corpo da tabela). Os rolos dos tornozelos se prendem nos dos joelhos por duas chapas de lado, por fora das pernas; o poste sobe entre as pernas.

## Mudança em arquivo comum

Nenhuma. O núcleo dos abdominais (`baseDeCostas`, `troncoEnrolado`, `bracosCruzados`, `regioesDasCostas`), `pelveAoChao` e as regras `abdominal-pescoco-acompanha` e `abdominal-maos-no-peito` são usados como estão.

## O que não ficou bom

- A peça desenhada tem 143 cm de comprimento, contra 185 da Life Fitness: a estrutura de trás é mais curta (a ficha não dá onde ficam o pivô e os rolos).
- No modo Músculos, de lado, os braços cruzados tapam parte do abdômen (o mesmo do abdominal no chão aprovado).
- De lado, a chapa de perto que liga os dois pares de rolos passa na frente da canela (ela está por fora da perna, mais perto de quem olha).
- Na folha, ao mudar o ângulo, o pé da ponta da cabeça e a escada mudam de comprimento (o desenho os liga ao encosto; a ficha não diz como o ângulo trava).

**Risco de o Gustavo não gostar: médio.** O movimento é o abdominal no chão que ele aprovou, mas o banco é peça nova sem cartão de hoje, e as coxas quase em pé (80° do chão), com as canelas quase na horizontal, podem estranhar.

## Correção de 18/11 (auditoria)

A auditoria da fase C (`../auditoria-fase-c.md`) apontou, de lado, no erro "Puxar o pescoço", o estofado do banco pintado sobre a borda de baixo do tronco (6 de 13 anéis; o tronco 2,4 cm acima do estofado), por empate de profundidade, e, de três quartos, dois achados pequenos: o rolo dos pés sobre o peito do pé de longe (4 de 20 anéis) e o estofado sobre a nuca no começo (4 de 17).

**O achado principal não se confirma no desenho que o app mostra.** De lado, o encosto é pintado 40 cm atrás do seu centro (o `dz` da peça, `ATRAS`): fica em −40 de profundidade, e o corpo em 0, em todos os quadros do ciclo e dos três erros; não há empate. A medida 1 da auditoria, refeita sobre o desenho do erro (como o app o mostra, com o corpo do erro), dá 0 anel do tronco por baixo do estofado em todos os instantes do erro (u = 0, 0,06, 0,5, 0,94 e 1); conferindo pixel por pixel, a pele do tronco fica por cima do estofado. O número da auditoria sai quando a pose do erro é medida sobre o desenho da **técnica** (refazendo assim: 7 de 13 anéis do tronco): no instante 1 da técnica a coluna está enrolada e o banco aparece onde, no erro, o tronco ainda está deitado. O quadro da auditoria (`../auditoria-fase-c/05-...png`) também mostra a pele por cima do banco. O mesmo engano explica dois achados de outro exercício (o mergulho no graviton, de lado e no erro dos ombros encolhidos; ver `../lote-C2/mergulho-graviton.md`).

**Os achados pequenos, de três quartos:**
- **A nuca no começo (4 de 17):** não aparece. Os pontos medidos ficam fora do contorno desenhado da cabeça (pintando o corpo sozinho, aqueles pixels já não são do corpo); a cabeça deitada no banco é pintada por cima dele.
- **O rolo dos tornozelos sobre os pés:** existe, pequeno, e **não foi corrigido**. Pela medida 1, 2 de 20 anéis do pé direito e 5 de 20 do esquerdo; pela conferência nova (todos os anéis na frente do rolo e sobre ele na tela, a 0,5 cm da borda), o rolo esquerdo cobre 6 anéis do pé direito e 4 do esquerdo, e o rolo esquerdo dos joelhos 1 anel da canela direita. O rolo amassa o peito do pé, e o pé passa dos dois lados dele; com um item de pintura por rolo, nenhuma ordem acerta as duas coisas. Tentei subir o corpo na pintura de três quartos (acima dos rolos de longe e abaixo dos de perto): o pé direito ficou certo, mas os dois rolos dos joelhos sumiram atrás das pernas (o de perto, que deve aparecer, também). Voltei atrás. O conserto de verdade é desenhar cada rolo em dois pedaços (o que fica na frente do pé e o que fica atrás), uma mudança no desenho da peça, que este pedido não permite. No quadro, os pés aparecem presos embaixo dos rolos, como na máquina.

**O que mudou:** nada no desenho. Entrou a conferência nova `abdominal-declinado-corpo-por-cima-do-banco` (`regras/banco-declinado.ts`, com a medida em `regras/pintura-sobre-o-estofado.ts`): nas duas vistas e nos três erros (u = 0,25, 0,5, 0,75 e 1), conta, para o encosto, os anéis da cabeça, do tronco, da bacia e dos braços e pernas **dos dois lados** que ficam na frente dele e por cima dele na tela, e quantos o pintor põe por baixo; para os rolos, o mesmo sem as pernas (pelo motivo acima). Ela passa antes e depois: nenhum anel do corpo fica na frente do encosto e por cima dele na tela (de lado ele é visto de perfil; de três quartos, de raspão, com a face quase de lado), nem na frente de um rolo, fora as pernas. **Ela não pode falhar no estado antigo, porque o defeito principal não existe nele**; fica na ficha para pegá-lo se a ordem de pintura do banco mudar.

**Conferência automática:** 0 falha, 1 aviso (o mesmo de antes).
