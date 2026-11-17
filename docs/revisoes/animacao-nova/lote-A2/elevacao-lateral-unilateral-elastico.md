# Lote A2 · Elevação lateral unilateral com elástico preso sob o pé do outro lado (`elevacao-lateral-unilateral-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé; o pé esquerdo pisa no tubo com pegadores perto de uma ponta; a mão direita segura o pegador da outra ponta, e o tubo sobe do pé esquerdo cruzando à frente do corpo até ela. Só o braço direito sobe, para o lado e um pouco à frente, até a altura do ombro; a mão esquerda fica solta ao lado do corpo. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral-unilateral-elastico.md`. Cartão do app: `src/conteudo/exercicios/elevacao-lateral-unilateral-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-lateral-unilateral-elastico.json`.
- Animação: `src/engine/novo/exercicios/elevacao-lateral-unilateral-elastico.ts`. O braço que sobe é o das elevações aprovadas (`noPlano`, de `elevar-o-braco.ts`, já exportada; o mesmo plano, giro do cotovelo e pegada); o corpo é montado no próprio arquivo (o núcleo das elevações move os dois braços e não inclina a coluna para o lado, que o erro "inclinar o tronco" pede). Reaproveita `folgaDasPernas` (`dobrar-o-quadril.ts`), `bracoDaRosca` (`dobrar-o-cotovelo.ts`), `fioPorFora` (`elastico-faixa.ts`), `bordasDaSola` (`rosca-elastico.ts`) e `bordasNaPonta` (`rosca-martelo-elastico.ts`, deste lote), todas já exportadas.
- Regras medidas novas: `src/engine/novo/regras/elevacao-lateral-unilateral-elastico.ts` (`elastico-unilateral-cruza-a-frente`, `elastico-unilateral-na-mao-que-trabalha`, `elastico-unilateral-esticado-desde-embaixo`). A regra comum `elastico-nas-maos` não serve (ela exige elástico nas duas mãos).
- Quadros grandes: `../quadros/elevacao-lateral-unilateral-elastico.png`. **Sem folha** ao lado da de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a posição (elástico sob o pé do lado oposto, cruzando à frente do corpo), o movimento (braço para o lado até a altura do ombro, `coratella2020`), a segurança (pé inteiro, `ng2022`) e uma opinião ("com o elástico cruzado, a tensão já começa embaixo"). O resto saiu das animações aprovadas: a **elevação lateral com elástico** (postura, plano do braço, altura no alto, cotovelo, pegada, folga embaixo, erro de encolher), a **elevação lateral unilateral na polia** (um braço só, o cabo cruzando à frente, as regras) e a **rosca com kettlebell** (a mão solta ao lado do corpo).

## Onde o pé pisa: o elástico fecha a conta

O cartão diz "pise com o pé inteiro numa ponta do elástico". Com o tubo de 48 pol da tabela (121,9 cm), pisar no pegador deixaria o trecho entre o pé e a mão com uns 110 cm, e com o braço embaixo a mão fica a 70 cm do pé: **sobrariam cerca de 40 cm de tubo frouxo embaixo**, e a ficha diz que a tensão já começa embaixo. Por isso o pé pisa no tubo perto de uma ponta, e não no pegador: o trecho entre o pé e a mão tem 63,7 cm em repouso (escolhido para estar 1,1 vez esticado com o braço embaixo, `elastico.esticaEmbaixo`, escolha de desenho a partir da opinião da ficha), e o resto do tubo (47 cm), com o outro pegador, fica no chão do lado de fora do pé esquerdo, frouxo. Esse trecho livre estica de **1,1 a 2,3 vezes** (o máximo do fabricante é 3).

A conferência automática mede o tubo inteiro de ponta a ponta (o trecho no chão não estica): de 1,1 a 1,7 vez. O quanto estica o trecho que trabalha é a regra nova `elastico-unilateral-esticado-desde-embaixo`, que lê o comprimento em repouso numa marca do quadro.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, o pé inteiro no elástico | consenso | os dois pés parados (0 cm); o tubo passa sob a sola esquerda a 50% do caminho do calcanhar à bola, a 0,6 cm do chão; o calcanhar no chão | sim |
| Elástico sob o pé do lado oposto, cruzando à frente do corpo | consenso | o tubo sai de sob o pé esquerdo e passa diante da perna direita de 20 a 52 cm do chão, no mínimo 0,7 cm à frente da pele dela; em nenhum ponto entra no corpo (mínimo de 0,4 cm da canela) | sim |
| A ponta na mão do lado oposto; a outra mão (não diz) | consenso | o centro da mão direita fica a 0 cm do pegador; a mão esquerda, solta, fica no mínimo a 44 cm do tubo | sim |
| Embaixo: braço ao lado da coxa, cotovelo levemente dobrado | consenso | o braço fica 7° aberto, com o pegador a 1,5 cm da coxa; o cotovelo dobra 15° o ciclo todo | sim |
| Braço para o lado até a altura do ombro | consenso | no alto, o cotovelo fica 0,4 cm abaixo do centro do ombro (o braço a 89° da vertical); o braço sobe 30° à frente do plano do corpo | sim |
| "Cotovelo lidera" | consenso | no alto, o cotovelo fica 8,1 cm acima do centro da mão | sim |
| Ombro baixo, longe da orelha | consenso | a clavícula sobe 0° além do ritmo normal do ombro | sim |
| Tronco parado | consenso | a base do pescoço não se mexe (0 cm); o centro de massa anda de −0,5 a 0,4 cm do meio do pé | sim |
| ~1 s subindo, pausa curta, ~2 s descendo | consenso | 1,1 s, 0,3 s e 2,1 s (mais 0,4 s embaixo, com o elástico já tenso); salto de velocidade de 6,7% (limite 15%) | sim |
| A tensão já começa embaixo (opinião da ficha) | desenho | o trecho entre o pé e a mão estica 1,1 vez embaixo e 2,3 vezes no alto | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) O tubo inteiro estica mais no alto do que no primeiro quadro (o aviso mede "mais esticado no começo"; aqui ele estica ao subir, como deve). (2) As linhas de escolha de desenho: as da elevação com elástico aprovada (`joelho`, `tronco`, `cervical`, `cabeca`, `cotovelo`, `cotovelo.giro`, `carga.folga`, `elastico.folga`), a mão solta (`livre.paraFora`, `livre.cotovelo`) e onde o pé pisa (`elastico.esticaEmbaixo`).

## As vistas

As da elevação lateral unilateral na polia aprovada: **de frente** (padrão dos modos Técnica e Músculos: o braço subindo para o lado, o tubo cruzando à frente das pernas, o pé no tubo) e **de cima** (o braço um pouco à frente do corpo, "cotovelo lidera"). De lado, o braço que sobe aponta para quem olha e o pé que pisa fica atrás do outro.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Encolher o ombro | de frente | no alto, a clavícula direita sobe 18° além do ritmo normal (32,5° contra 14,5°) |
| Inclinar o tronco | de frente | enquanto o braço sobe, a coluna tomba para o lado do pé que pisa: o peito vai a 11° da vertical, para a esquerda (a lombar e as costas de cima dobram 14° para o lado); a pelve e os pés ficam no lugar |
| Pisar só com a ponta do pé | de três quartos, por trás | o pé esquerdo fica na ponta: o calcanhar sobe 20° (6,8 cm) e o joelho esquerdo dobra 36°; o tubo, que embaixo passa sob a bola do pé, escorrega para a frente enquanto estica e no alto já está na borda da ponta dos dedos (0,4 cm à frente dela) |

"Inclinar o tronco": o cartão diz "o corpo balança para subir". Na elevação com os dois braços o balanço é para trás; com um braço só e o elástico cruzado, desenhei o tronco tombando para o lado contrário ao braço, que é a inclinação que de frente se lê. A direção e os 14° são escolha de desenho. O erro do pé usa o mesmo desenho da rosca martelo com elástico (deste lote); a vista de três quartos por trás é a única em que o calcanhar do pé esquerdo aparece sem o outro pé na frente.

## O equipamento

- **Elástico:** o tubo com pegadores de 48 pol da tabela (Rogue; máximo de 3 vezes, TheraBand). O trecho esticado afina ao esticar e é desenhado em pedaços de 4 cm, cada um na sua profundidade (desenhado de uma vez, o tubo sumia atrás da canela direita). O resto do tubo e o outro pegador ficam no chão, sem esticar.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Das correções das elevações e do elástico, valem: a frente do ombro listrada ("só ajuda"), sem o trapézio de cima; o braço no plano da escápula; o tubo afina ao esticar e, onde passa sob o pé, é isso que se desenha; rótulos fora do corpo.

## O que não ficou bom

- **O rótulo "pé inteiro no elástico"** fica à direita, embaixo, perto do tubo que sobra no chão (o texto passa por cima dele). Testei o rótulo acima do pé: o fio atravessava o corpo inteiro. Ficou o de lado.
- **No erro do pé, o joelho esquerdo dobra 36°**, pelo mesmo motivo da rosca martelo com elástico (o quadril não sobe daquele lado).
- **O tubo que sobra no chão** abre a cena para a direita (47 cm de tubo e o pegador), e de cima o pegador no chão aparece grande. É o que acontece de verdade quando se pisa perto da ponta, mas é um elemento a mais no quadro.
- **De cima, no começo, a mão e o pegador quase somem embaixo do ombro.**

## Risco de o Gustavo não gostar

**Médio.** A técnica confere em tudo e a vista de frente se lê, mas há escolhas novas que ele não viu em nenhuma aprovada: pisar no tubo perto da ponta (com o resto no chão) em vez de pisar no pegador, o erro "inclinar o tronco" para o lado e o erro do pé visto de três quartos por trás.
