# Lote A3 · Elevação lateral unilateral com halter, segurando num apoio (`elevacao-lateral-unilateral`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de lado para a parede, a mão esquerda espalmada nela só para equilibrar; o tronco fica inclinado 15° para longe da parede, parado; o braço direito, com um halter leve, sobe para o lado e um pouco à frente até a altura do ombro. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral-unilateral.md`. Cartão do app: `src/conteudo/exercicios/elevacao-lateral-unilateral.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/elevacao-lateral-unilateral.json`.
- Animação: `src/engine/novo/exercicios/elevacao-lateral-unilateral.ts`. O braço que sobe é o das elevações aprovadas (`noPlano`, de `elevar-o-braco.ts`, já exportada: o mesmo plano, giro do cotovelo e pegada, como fez a elevação unilateral com elástico); o corpo é montado no próprio arquivo, porque o núcleo das elevações move os dois braços e não inclina o tronco para o lado. A mão na parede é a da abdução em pé com elástico, e a parede é a peça `pecas-de-cena/parede-ao-lado.ts`, sem mudança. Reaproveita `folgaDasPernas` (`dobrar-o-quadril.ts`). **Nenhum arquivo comum mudou.**
- Regras: duas novas em `src/engine/novo/regras/elevacao-lateral-unilateral.ts` (`elevacao-unilateral-tronco-inclinado-para-longe-do-apoio`, `elevacao-unilateral-peso-entre-os-pes`), uma linha em `regras/registro.ts`. As outras já existiam: as das elevações (`regras/ombros.ts`), `tronco-quase-parado` (`conferir.ts`) e a mão na parede da abdução (`abducao-em-pe-mao-na-parede`, que mede a palma esquerda contra a face da parede à esquerda: serve igual).
- Quadros grandes: `../quadros/elevacao-lateral-unilateral.png`. Sem folha (não há animação de hoje).

## Onde os números saem

A ficha da técnica dá a posição (de lado para um apoio, tronco inclinado 10–20°, a mão livre só equilibra; consenso, "leaning lateral raise") e o movimento (braço para o lado até a altura do ombro, cotovelo na frente da mão; `coratella2020`). O cartão acrescenta o halter ao lado da coxa, o cotovelo levemente dobrado, os tempos (~1 s, pausa curta, ~2 s) e que a mão não segura o peso do corpo (decisão do Gustavo). O resto saiu das animações aprovadas: a **elevação lateral com halteres** (pés, joelhos, bacia 12° à frente, plano do braço a 30°, cotovelo a 15° com o giro de 50°, pegada, folga embaixo, o halter leve, o erro de encolher), a **elevação lateral unilateral na polia** (um braço só, de lado para o apoio, a mão de dentro nele) e a **abdução em pé com elástico** (a mão espalmada na parede, os dedos para cima, e a peça da parede).

## A inclinação do tronco e o peso

O cartão pede o tronco "levemente inclinado para longe do apoio (10 a 20°)" **e** que a mão livre "só equilibra". As duas coisas juntas pedem que o centro de massa continue sobre os pés com o tronco inclinado: se o corpo inteiro tombasse como uma tábua, a partir dos pés, quem seguraria o peso seria a mão (o "leaning lateral raise" de academia, que se pendura num poste; o cartão proíbe). Então a bacia vai 7,2 cm para o lado da parede, as duas pernas inclinam juntas, e o tronco inclina 15° para o outro lado (o meio da faixa do cartão). Medido: o centro de massa (corpo + halter) fica entre os pés, de −1,5 a 3,1 cm do meio deles (as bordas de dentro dos pés ficam a 4,1 cm), e anda de −1,6 a 1 cm do meio do pé de frente para trás.

De onde vem a inclinação: primeiro tentei uma parte na bacia (o quadril do lado da parede subindo). Com 0,4 da inclinação na bacia, a perna do lado da parede não alcançava o chão (falha); com 0,2, um joelho dobrava 17° e o outro 3°. Ficou a bacia nivelada (`tronco.lado.naBacia` = 0), com a inclinação na lombar e nas costas de cima, meio a meio, e o pescoço na linha: os joelhos ficam a 9° e 11°. Visto de frente, é uma inclinação de lado na cintura.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De lado para o apoio, a mão livre nele | consenso | a parede fica à esquerda, a 61 cm do pé esquerdo; a palma esquerda encosta nela (0 cm o ciclo todo), os dedos para cima, o punho na altura do ombro e 5 cm à frente; o cotovelo esquerdo dobrado 60°; o punho estende 60,6° (a média do corpo é 70°) | sim |
| A mão livre só equilibra (não pendurar o peso do corpo) | consenso | o centro de massa fica entre os pés (de −1,5 a 3,1 cm do meio, as bordas de dentro a 4,1 cm) e sobre o meio do pé (de −1,6 a 1 cm); a bacia não se mexe (0 cm) | sim |
| Tronco levemente inclinado para longe do apoio (10–20°) | consenso | o tronco (eixo do tórax, de frente) fica inclinado 15° para o lado do braço, longe da parede, o ciclo todo | sim |
| Tronco parado (o erro "jogar o tronco") | consenso | a base do pescoço se move 0 cm | sim |
| Halter ao lado da coxa, cotovelo levemente dobrado | consenso | embaixo, o halter fica a 0,5 cm da pele da coxa, ao lado dela; o cotovelo dobra 15° o ciclo todo | sim |
| Braço para o lado até a altura do ombro | consenso | no alto, o cotovelo fica na altura do centro do ombro (0 cm), o braço a 90° da vertical; no tórax, como o tronco inclina para o lado do braço, a elevação é de 109° (na elevação com halteres, 96°) | sim |
| Para o lado e um pouco à frente (plano da escápula) | consenso | no alto, o braço fica 29,6° à frente do plano do corpo, visto de cima | sim |
| Cotovelo na frente da mão / "cotovelo lidera" | consenso | no alto, o cotovelo fica 6,8 cm acima do centro da mão | sim |
| Ombro longe da orelha, sem encolher | consenso | a clavícula sobe no máximo 0° além do ritmo normal; a ponta do ombro sobe 1,9 cm com o braço | sim |
| ~1 s subindo, pausa curta, ~2 s descendo | consenso | 1,1 s, 0,3 s e 2,1 s | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs elevacao-lateral-unilateral`): **0 falha, 3 avisos**. Os avisos: as linhas da ficha que são escolha de desenho (joelho, tronco à frente, de onde vem a inclinação, pescoço, cotovelo, folga, carga e as três da mão na parede); a frente do ombro listrada como "só ajuda" (a mesma diferença aceita das outras elevações); e a vista de cima, que mostra pouco do músculo principal (2 cm²; o modo Músculos abre de frente, com 35 cm²; a elevação unilateral com elástico aprovada tem o mesmo aviso, com 8 cm²). O ritmo fica suave (salto de 5%, na subida); o braço chega a 109°; o joelho a 11°.

### As vistas

De **frente** (a padrão, como nas outras elevações unilaterais): o tronco inclinado para longe da parede, a mão nela, o braço subindo até a linha do ombro e o halter ao lado da coxa embaixo. De **cima** (a segunda, como nas aprovadas): o braço um pouco à frente do corpo e o cotovelo conduzindo. De trás também se lê (`posterior:tec:f1`), mas repete a de frente.

## Erros

O cartão tem três erros; os três viraram desenho, na ordem do app.

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Encolher o ombro ("o trapézio de cima assume") | de frente | no alto, a clavícula sobe 18° além do ritmo; a ponta do ombro fica 4,2 cm mais alta que no certo |
| Jogar o tronco ("o corpo balança para subir o halter") | de frente | embaixo, o tronco cai mais para o lado do halter (24°, em vez de 15°); na subida é jogado em direção à parede até ficar reto (0°): a base do pescoço anda 14,7 cm de lado. A bacia e os pés ficam; a mão segue na parede (o cotovelo esquerdo dobra de 37° a 84°). O braço pende igual no mundo embaixo, para o halter não entrar na coxa (folga de 4,2 cm) |
| Subir acima do ombro ("o trapézio trabalha mais") | de frente | o braço sobe 30° além do certo: o cotovelo fica 15,2 cm acima do ombro e a mão 27 cm |

**"Jogar o tronco" × a técnica:** a inclinação de 15° é a técnica (o cartão a pede, parada); o erro é o tronco que se mexe para dar impulso. No desenho, o certo fica inclinado e parado; no erro, o tronco balança.

## O equipamento

- **Halter sextavado de 10 lb** (`dados/objetos/halter-leve.json`): o cartão diz só "um halter"; é o das elevações laterais aprovadas.
- **Parede** (`pecas-de-cena/parede-ao-lado.ts`, cenário): o cartão aceita "parede, batente ou móvel pesado"; ficou a parede, a mesma da abdução em pé, onde a mão só pode encostar (não dá para se pendurar nela, que é o que o cartão pede).

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- **Achado 3 da revisão de anatomia** (linhas 61 e 187): nas elevações laterais, o trapézio de cima sai do desenho; a frente do ombro fica listrada ("só ajuda"). Respeitada: `papeis` = `deltLat:R` (principal) e `deltAnt:R` (só ajuda), como na unilateral na polia.

## O que não ficou bom

- **A inclinação vem toda da coluna**, com a bacia nivelada (ver acima). De frente, lê-se como o tronco inclinado na cintura. Se o Gustavo quiser o corpo inteiro inclinado a partir dos pés (como no "leaning lateral raise" de poste), a mão passa a segurar o peso, o que o cartão proíbe.
- **O rótulo "Jogar o tronco"** fica à direita, colado na faixa da parede (o corpo vai da mão do halter à mão na parede, e não sobra lado livre); o fio passa por cima do ombro esquerdo.
- **De cima, embaixo, o halter fica meio escondido sob o ombro** (`cima:tec:f0`); no alto ele aparece inteiro.
- **O punho da mão na parede estende 60,6°**, abaixo da média de 70° (sem aviso), mas é bastante; com a mão mais baixa na parede ou o cotovelo menos dobrado, ela passaria da média.
