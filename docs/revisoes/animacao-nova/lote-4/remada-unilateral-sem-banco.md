# Lote 4 · Remada unilateral com halter, sem banco (`remada-unilateral-sem-banco`)

De 15/11/2026. Segunda da família das remadas com peso livre: o braço que puxa é o do núcleo `exercicios/remada.ts` (o mesmo da remada no banco); o corpo parado sai da base nova `exercicios/remada-sem-banco.ts`, que também serve à remada com kettlebell. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-sem-banco.md`. Cartão: `src/conteudo/exercicios/remada-unilateral-sem-banco.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral-sem-banco.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral-sem-banco.ts`; base: `exercicios/remada-sem-banco.ts`; núcleo: `exercicios/remada.ts`.
- Regras novas: `pe-da-carga-atras` e `mao-de-apoio-na-coxa` (em `regras/remadas.ts`).
- Folha: `../prototipos/folha-remada-unilateral-sem-banco.png`. Quadros grandes: `../quadros/remada-unilateral-sem-banco.png`.

## Como a geometria foi montada

1. **O tronco** parado com o peito a 55° da vertical (a ficha só diz "inclinado à frente"; hoje: ~45–60°), coluna sem flexão.
2. **Os pés:** o esquerdo à frente, o direito (do lado do halter) atrás, cada um 2 cm para fora da linha do quadril; o de trás com o calcanhar 15° levantado. Cada pé fica onde o joelho dele dobra o que a ficha de movimento pede (frente 30°, trás 8°, pela lei dos cossenos), e a altura do quadril é a que dá 66 cm de um tornozelo ao outro (`resolver1`).
3. **A mão livre** espalmada na pele da coxa da frente (medida na superfície do Boneco), os dedos para o joelho, o polegar para dentro; o ponto ao longo da coxa é o único em que o cotovelo de apoio fica a 12° (`resolver1`): deu 88% do caminho do quadril ao joelho, logo acima do joelho.
4. **O braço que puxa:** o mesmo da remada no banco (de pendurado a 26° além da linha das costas, 16° para fora, antebraço pendendo embaixo do cotovelo, pegada neutra, escápula de +6 a −10).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés afastados, um à frente; o do lado do halter atrás | consenso | o tornozelo direito fica 66 cm atrás do esquerdo; os dois pés parados (0 cm) | sim |
| Mão livre firme na coxa da frente | consenso | a mão fica a 0,2 cm da pele da coxa, a 88% do caminho do quadril ao joelho, parada (0 cm); cotovelo de apoio a 12° | sim |
| Tronco inclinado à frente, costas retas | consenso | peito a 56,3° da vertical; lombar sem flexão (0°) | sim |
| Sem girar o tronco (tronco parado) | consenso | base do pescoço e bacia andam 0 cm; o tórax gira 0° | sim |
| Começo: braço estendido, halter embaixo do ombro | consenso (cartão) | cotovelo a 3°; o halter pende embaixo do ombro, um pouco para fora | sim |
| Cotovelo para trás, em direção ao quadril, perto do corpo | consenso | o braço se afasta no máximo 16° do lado do tronco | sim |
| Fim: cotovelo passando a linha das costas, halter ao lado do quadril | consenso | o cotovelo fica 5,4 cm além da linha das costas; a mão a 87% do caminho do ombro ao quadril | sim |
| Pegada neutra (palma virada para o corpo) | consenso | pronação de 90° o ciclo todo | sim |
| O halter não atravessa o corpo | (desenho) | a no mínimo 0,3 cm da pele (o antebraço junto à mão; a coxa fica a 4 cm ou mais) | sim |
| Equilíbrio | (mecânica) | o centro de massa (corpo + halter) fica sempre dentro do apoio dos pés | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s | sim |

Conferência automática (homem e mulher): **0 falha, 2 avisos.** (1) Dorsiflexão do tornozelo de trás de 17,8° (na mulher, 19,1°) (média 14,8°, máximo observado 48°): a perna de trás inclina à frente com o passo de 66 cm; com o calcanhar a 20° a mão deixava de alcançar a coxa com o cotovelo quase estendido, então fiquei com 15°. (2) As linhas de desenho da ficha de movimento.

Músculos: dorsal e meio das costas do lado direito em vermelho; ombro de trás e bíceps em laranja. As vistas são a de lado e a de três quartos, de frente (`quina`); a vista padrão do modo Músculos fica a de lado (176 cm² do principal). De trás (282 cm²), de três quartos de trás (299) e de cima (310) mostram mais o músculo, mas em nenhuma delas a mão livre na coxa aparece (fica escondida atrás do corpo), e a mão na coxa é o que distingue este exercício: escolhi a de três quartos, de frente, para a segunda vista. O erro "girar" fica na de três quartos, de trás, onde ele se lê.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | três quartos, de trás | a coluna gira 18° no fim; a mão livre continua na coxa (o cotovelo de apoio dobra até 32°) |
| Arredondar as costas | lado | lombar +22° e torácica +22°; a bacia vira para trás até o ombro de apoio ficar à mesma distância da mão (a mão não sai da coxa) |
| Não estender o braço (quadro parado no começo) | lado | a volta para a 45% do caminho |

**Folga da carga (núcleo):** se num quadro a carga chegaria a menos de 0,5 cm da pele das pernas ou do tronco (num corpo menor, ou num erro que move o tronco), o núcleo afasta os braços que puxam do corpo só o necessário (`resolver1`, contínuo: zero enquanto a folga basta). No homem, no movimento certo, isso não acontece.

## Correções já feitas que esta animação respeita

- `remada-unilateral-sem-banco` motivou o acabamento A2 (04/11): mão em luva por cima do cabo e braço destacado do tronco, ok no desenho novo.
- "Linha-guia do rótulo movido atravessa o corpo quando a âncora está escondida (mão livre na coxa)" (`correcoes-ja-feitas.md`): o rótulo "mão firme na coxa" fica só na vista de três quartos, de frente, onde a mão aparece; de lado ele não é usado.

## O que não ficou bom

- **De lado, a mão livre na coxa não aparece** (fica atrás da perna e do braço direitos): é o lado de longe. Por isso o rótulo dela foi para a outra vista, e o modo Músculos fica de lado, que mostra menos o músculo que a vista de trás. Risco de o Gustavo preferir a de três quartos, de trás, como segunda vista.
- A dica "cotovelo para o quadril" ficou de fora: de lado, o fio dela atravessava as costas no fim da puxada; a trajetória do cotovelo mostra o mesmo.


## Correção de 19/11 (mão de apoio; auditoria das aprovadas antigas)

O Gustavo autorizou em 19/11 corrigir as aprovadas antigas com o defeito achado nas auditorias: a mão de apoio entrava na coxa da frente. A base das remadas sem banco (`./remada-sem-banco.ts`) procura o ponto da pele da coxa entre pontos a até 2,5 cm de um plano; entre dois anéis afastados ela não acha nenhum e põe a mão perto do eixo da coxa. É o mesmo defeito, e a mesma correção, da remada unilateral com elástico (M4).

**A mudança.** A base passa a usar a opção `pele: peleDaCoxaNaSuperficie` (acréscimo de 19/11, desligada por padrão: o anel da coxa interpolado e a elipse dele). Com a mão pousada na pele, o braço de apoio quase estendido levava o meio da mão além do joelho (com 12° pedidos, o cotovelo não chegava a menos de 22° e o centro da mão ficava a 104% do caminho do quadril ao joelho; a regra antiga `mao-de-apoio-na-coxa` falhava): o cotovelo de apoio da ficha (`apoio.cotovelo`) vai de **12° a 40°**, o mesmo da remada com elástico. A pose do resto do corpo, o braço que puxa, o halter, os rótulos e os erros não mudam. A ficha liga a regra `remada-elastico-mao-de-apoio-sobre-a-coxa` (`src/engine/novo/regras/remada-unilateral-elastico.ts`), que mede no ciclo e nos erros.

| mão de apoio (ciclo e erros) | antes (`72d00fc`) | depois |
|---|---|---|
| centro da mão até o eixo da coxa | 2,3 cm | 8,9 cm |
| centro da mão fora da pele da coxa (negativo = dentro) | −3,8 cm | +2,7 cm |
| a pele da mão entra na coxa | 5,7 cm | 0 cm |
| a pele do antebraço entra na coxa | 6,8 cm (6,7 no ciclo) | 0,9 cm (0,8 no ciclo; o amassado aceito é 1 cm) |
| onde fica o centro da mão (quadril → joelho) | 88,2% | 97,2% |
| centro da mão até a borda lateral da coxa | 4,7 cm | 3,7 cm |
| a mão até a pele da coxa | 0,2 cm | 0,5 cm |
| cotovelo de apoio | 12° (32° no erro "Girar o tronco") | 40° (51° no erro "Girar o tronco") |

A conferência dá 0 falhas antes e depois (a regra nova não estava ligada antes; ligada no estado de antes, ela falha). O antes e depois está em `correcao-das-antigas/remada-unilateral-sem-banco.png` (de três quartos inteiro e de perto, e de lado de perto); os quadros grandes foram regravados (`quadros/remada-unilateral-sem-banco.png`).

**O que ainda não ficou bom.** A mão pousa perto do joelho (97% do caminho), e não no meio da coxa; de três quartos aparece só um pedaço da palma sobre a coxa, perto do joelho, como na remada com elástico aprovada.

## Correção de 19/11 (halter dentro do corpo)

O Gustavo viu a imagem da correção da mão de apoio e avisou: "o halter tá ficando errado pensando realisticamente, ele tá puxando pra dentro do próprio corpo".

**A medida (antes, `1d036a8`).** Medi as cabeças do halter contra a superfície do corpo, e não contra o eixo: os pontos das faces e das arestas de cada cabeça (o prisma que a conferência usa, a cada ~1 cm) contra o volume do Boneco, anel por anel, com o anel interpolado no ponto (regra nova `peso-fora-do-corpo`). Em 120 quadros (o ciclo e cada erro em 9 instantes), nos dois lados do corpo, **nenhuma cabeça entra no corpo** (0 cm): no fim da puxada a cabeça fica a 4,9 cm da pele (da cintura), e a 1,2 cm no pior erro ("Girar o tronco"). O que o Gustavo viu é real, mas é outra coisa, e está medido:

1. **Onde a puxada terminava.** Com o tronco a 55° da vertical e o antebraço na vertical até o fim, o cotovelo já estava no limite de trás e a mão terminava **9,9 cm à frente do centro do quadril e 7,2 cm abaixo dele**: o halter embaixo da barriga, com a cabeça da frente na altura da virilha. De lado e de três quartos, ele ficava na frente da virilha e da coxa, como se a puxada fosse para dentro do corpo, e não "para o quadril", como a ficha da técnica pede.
2. **A ordem de pintura de três quartos.** O halter fica na frente da perna direita (a de perto), mas era pintado atrás dela: a perna de perto vai no item do corpo, pintado pela profundidade média do tronco, que de três quartos fica mais perto de quem olha. Folga de pintura de **−7,3 cm** (negativo = ordem errada), pior no meio da puxada: a cabeça de trás aparecia cortada pela coxa, como se entrasse nela (é o quadro "três quartos · no caminho" do antes e depois).

**A mudança.**
- Núcleo `exercicios/remada.ts`, opção nova `recuoDoAntebraco` (aditiva; desligada, nada muda): o antebraço que puxa inclina para trás, em direção ao quadril, de 0 no começo a `braco.fim.recuo` = **20°** no fim, num arco; o halter gira com a mão (o cabo fica atravessado na palma; a pegada neutra continua a 90°). Testei 0, 10, 20, 30 e 40°: com 30° ou mais, a folga da carga afasta o braço do corpo e o ritmo dá tranco (15,7% com 30°; 26,1%, falha, com 40°).
- `exercicios/remada-unilateral-sem-banco.ts`: na vista de três quartos, o corpo, as pernas e o braço de apoio vão `pintura.quina.atras` = 25 cm para trás na pintura (`viesNaVista`; a ordem entre eles não muda e o braço que puxa fica onde está). Medido pela regra de pintura, nenhuma parte do corpo esconde o halter nessa vista, em nenhum quadro.
- A base, o tronco, as pernas, a mão de apoio (a correção da mão na coxa, de hoje) e os erros não mudam.

| medido (homem; ciclo e erros) | antes | depois |
|---|---|---|
| a cabeça do halter entra no corpo (`peso-fora-do-corpo`, tolerância 0,5 cm) | 0 cm | 0 cm |
| folga da cabeça até a pele, no fim da puxada | 4,9 cm (cintura) | 2,1 cm (bacia) |
| folga no pior erro | 1,2 cm ("Girar o tronco") | 1,2 cm ("Arredondar as costas") |
| centro da pegada no fim × centro do quadril (`remada-sem-banco-carga-ao-lado-do-quadril`) | 9,9 cm à frente, 7,2 cm abaixo (falha) | 1,6 cm atrás, 5,2 cm abaixo |
| a mão no fim, ao longo do tronco (ombro → quadril) | 87,3% | 102,6% |
| folga de pintura de três quartos, perna direita (`remada-carga-pintada-no-lugar`) | −7,3 cm (falha) | +11,9 cm |
| cotovelo que puxa, no fim | 83° | 63° |
| cotovelo passa a linha das costas | 5,4 cm | 5,4 cm |
| mão de apoio (regra da remada com elástico) | 97,2%, 2,7 cm fora da pele, antebraço 0,9 cm | igual |
| ritmo (maior salto) | 7,4% | 7,4% |

A conferência automática dá **0 falhas e 2 avisos** (os mesmos de antes: a dorsiflexão do tornozelo de trás e as linhas de desenho, agora com `braco.fim.recuo` e `pintura.quina.atras`). As três regras novas estão ligadas na ficha; no estado de antes, `peso-fora-do-corpo` passa (o halter não entrava no corpo), e as outras duas falham. No corpo da mulher (que o app não usa), as três passam.

O antes e depois está em `correcao-das-antigas/remada-unilateral-sem-banco-halter.png` (de lado, o fim da puxada; de três quartos, no caminho e no fim). Os quadros grandes foram regravados (`quadros/remada-unilateral-sem-banco.png`); olhei cada vista, cada quadro e cada erro, o lado de perto e o de longe, na cor de pele e no tema escuro.

**O que ainda não ficou bom.**
- Com o antebraço inclinado, o cotovelo dobra menos no fim (63°, contra os ~90° de uma remada com o tronco quase deitado): é a remada "para o quadril", que a ficha pede, mas com o tronco a 55° a mão só chega ao quadril assim. Se o Gustavo quiser o antebraço na vertical, a saída é inclinar mais o tronco (a ficha não dá número; hoje: 45–60°), o que mexe na base e na mão de apoio.
- O halter fica inclinado 20° no fim (o meio da cabeça da frente uns 8 cm mais baixo que o da de trás), porque gira com a mão. De lado, isso se vê.
- A folga do halter até a bacia caiu de 4,9 para 2,1 cm no fim: ele passa rente ao quadril, sem entrar.
