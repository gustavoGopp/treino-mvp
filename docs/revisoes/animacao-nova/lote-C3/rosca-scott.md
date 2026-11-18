# Lote C3 · Rosca Scott no banco Scott (`rosca-scott`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no banco Scott, a parte de trás dos dois braços deitada na almofada a 45°, as axilas na borda de cima; a barra W nas duas mãos, pegada nas partes inclinadas, uma anilha de 5 kg de cada lado. Só os antebraços se mexem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-scott.md`. Cartão do app: `src/conteudo/exercicios/rosca-scott.json` (só leitura). Nenhuma correção anterior em `correcoes-ja-feitas.md` (o exercício nunca teve animação).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-scott.json`.
- Animação: `src/engine/novo/exercicios/rosca-scott.ts`. Regras medidas novas: `src/engine/novo/regras/banco-scott.ts`.
- Peça nova: o banco Scott (`pecas-de-cena/banco-scott.ts`, `dados/objetos/banco-scott.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-banco-scott.png`). A barra W é a peça aprovada (`pecas-de-cena/barra-w.ts`), sem mudança.
- Quadros grandes: `../quadros/rosca-scott.png`. Sem folha ao lado da animação de hoje (não havia animação).

## Onde os números saem

O cartão diz "barra W ou halter"; a animação usa a barra W, a primeira das duas (e a da biblioteca: `[banco_scott, barra_w]`). A técnica segue a **rosca Scott no banco inclinado, aprovada pelo Gustavo** (`rosca-scott-banco-inclinado`): o braço paralelo à face do estofado, o centro do ombro 8 cm além da borda de cima, o estofado amassando 1 cm, o cotovelo de 14° a 125°, o pescoço um pouco estendido (olhar à frente) e os três erros com os mesmos números. Da rosca com barra W aprovada vêm a barra (uma anilha de 5 kg de cada lado) e a pegada (a mão girada pela parte inclinada da barra, o antebraço aberto o que leva a mão ao meio dela). O que muda: são os dois braços, a pessoa está sentada e a almofada tem 45° (da ficha da Deltech DF308), em vez dos 60° do encosto do banco regulável.

**A regulagem sai do corpo, não de um número escolhido:** o assento fica a 50 cm (a faixa do banco é 47 a 62 cm), com os pés inteiros no chão e o joelho a 85°; a bacia desce até o glúteo amassar 1 cm o assento; a almofada sobe até a borda de cima ficar onde o ombro cai 8 cm além dela e o tríceps encosta. Deu a almofada a 100,9 cm, dentro da faixa do banco (84 a 109 cm) (100,5 cm até a correção de 18/11, abaixo). A conta fica guardada (`calibragem`, chave `rosca-scott:parado`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco na altura em que o tronco fica reto | consenso | a linha da bacia à base do pescoço fica 1,2° da vertical (a bacia 4° à frente); assento a 50 cm, almofada a 100,9 cm, as duas dentro da regulagem do banco; o glúteo amassa 1 cm o assento, com o meio da bacia 3,8 cm à frente do meio dele | sim |
| Parte de trás do braço inteira apoiada na almofada | consenso | nos dois braços, em todos os quadros: no alto da almofada a pele amassa 1 cm, no meio 0,2 cm, e no cotovelo fica a 0,4 cm da face; a pele fica 7,1 a 8,2 cm dentro das bordas laterais e o cotovelo 4,2 cm antes da borda de baixo; nas vistas que veem a face (três quartos e de frente), os dois braços são pintados por cima da almofada; o cotovelo anda 0 cm | sim |
| Axilas encostadas na borda | consenso | o centro do ombro fica 8 cm além da borda de cima; nos 6 cm de cima da almofada, a pele do braço amassa 1 cm; o peito amassa 2,2 cm a almofada (a Precor diz que a almofada "amortece o peito e o braço") | sim |
| Desce até o cotovelo quase estender, sem soltar o peso | consenso | embaixo, o cotovelo para dobrado 14° (o mínimo do ciclo) | sim |
| Desce controlando (~2–3 s) | consenso | descida de 2,6 s, subida de 1 s; o ritmo não dá salto (6% da velocidade de pico) | sim |
| Sobe sem tirar o braço até o antebraço ficar quase vertical | consenso | em cima, o cotovelo dobra 125° e o antebraço fica 10° antes da vertical (o peso continua no bíceps); a pegada a 29,8 cm do centro do ombro | sim |
| Barra W, pegada nas partes inclinadas, palmas para cima | consenso | o centro da pegada no eixo e no meio da parte inclinada (0 cm), a linha da palma na linha dela (0°); supinação de 67° (90° menos os 23° da parte inclinada); as mãos a 37 cm uma da outra em todo o ciclo | sim |
| A barra não atravessa nada | desenho | a menor folga até a pele (fora as mãos) é 3,4 cm (antebraço); até a almofada, 12,4 cm; passa 13,3 cm acima dos ganchos do suporte | sim |
| Só o antebraço se mexe | consenso | a base do pescoço anda 0 cm; a bacia e os pés, 0 cm; a lombar sem flexão (0°) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-scott`): **0 falhas, 2 avisos**. Os avisos: (1) as linhas de desenho da ficha de movimento (assento, amassa, braço paralelo, pescoço e cabeça, joelho, pés, anilhas), cada uma com o motivo no campo `o`; (2) o antebraço aparece como "só ajuda", fora da lista do conteúdo (bíceps), como em todas as roscas aprovadas. O corpo entra até 2,2 cm num estofado (o peito na almofada e o glúteo no assento, dentro da tolerância de 2,5 cm).

## As vistas

`lateral` (a que o app abre) e `quina`. De lado, o arco dos antebraços e o braço deitado na almofada se leem de relance. Como na rosca com barra W aprovada, em cima a anilha de perto passa na frente do queixo (ela está 42 cm ao lado da cabeça, fora do corpo: a regra mede 3,4 cm de folga mínima). De três quartos, a almofada, os dois braços e a barra aparecem inteiros. Os músculos: de lado e de três quartos o bíceps aparece; o modo Músculos abre de lado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro do cartão | O que o boneco faz | Vista |
|---|---|---|
| Tirar o braço da almofada | na subida, os braços giram 30° no ombro para fora da almofada e o cotovelo dobra só 100°: o cotovelo descola e o ombro ajuda | lateral, em cima |
| Soltar o peso embaixo ("o cotovelo trava de uma vez") | embaixo, o cotovelo estica até 0° (travado); a barra continua 6 cm acima dos ganchos | lateral, embaixo |
| Descer pouco | a volta para com o cotovelo dobrado 55° | lateral, embaixo |

Todos os erros do cartão estão desenhados.

## O equipamento

O banco Scott é peça nova (folha: `folha-banco-scott.png`): a almofada a 45° com 61 × 30,5 × 5 cm, o assento de 23 × 30,5 cm e as faixas de regulagem vêm da Deltech DF308; o tamanho total fica entre os da Precor, da Life Fitness e da Hammer Strength. De desenho (sem ficha): a distância do assento à almofada (9 cm, do corpo da tabela), o poste de viés com o pé 54 cm à frente da borda da almofada (as canelas ficam dos dois lados dele e a travessa da frente fica à frente das pontas dos pés) e os ganchos da barra. A almofada regula num tubo em pé preso no alto do poste de viés, perto da borda de baixo dela (com o tubo no meio da almofada, ele entrava na barriga). Pintura: o assento vai para trás (a pessoa senta por cima), o poste e o tubo da almofada vão um pouco para trás (ficam entre as pernas).

## Mudança em arquivo comum

Nenhuma. As peças e núcleos aprovados (barra W, regras das roscas e da barra W) são usados como estão; nada foi exportado de novo.

## O que não ficou bom

- De três quartos, o braço de longe cobre a ponta de longe da almofada: o contorno dele passa até 1,7 cm da borda na tela (veja a correção de 18/11, abaixo).
- De lado, em cima, a anilha de perto cobre o queixo (é a mesma coisa da rosca com barra W aprovada; a anilha está ao lado da cabeça).
- A peça desenhada tem 88 cm de fundo, contra 102 da Deltech: o poste de viés não precisa ir mais longe para as pernas passarem.

**Risco de o Gustavo não gostar: médio.** A técnica copia a Scott que ele aprovou, mas a peça é nova e quem olha pode estranhar a almofada mais baixa e deitada (45°) que a do cartão de hoje e a anilha na frente do rosto em cima, na vista de lado.

## Correção de 18/11

O Gustavo apontou: de três quartos (`quina`), o braço de longe (o esquerdo) ficava fora da almofada, em vez de deitado em cima dela. A animação saiu da aprovação até a correção.

**A causa: a ordem de pintura, e não a pose nem a almofada.** Medido no estado de antes (`a2a2aad`), nos dois braços e em todos os quadros (o ciclo e os três erros):

- **A almofada está certa.** A ficha da Deltech DF308 dá "Arm pad size- 24" W x 12" H x 2" thick": 61 cm de lado a lado (W) e 30,5 cm na rampa (H). A peça usa assim (`almofadaLarg` 61, `almofadaComp` 30,5), e a face é desenhada nessa direção (o estofado tem 61 cm no eixo x). A folha da Precor DBR0202 só diz que a almofada é "oversized", sem número: não há ficha lida com uma almofada mais larga.
- **Os dois braços estão na mesma posição e em cima da almofada.** O centro do ombro, o meio do braço e o cotovelo ficam a 18,6 cm do meio do banco, nos dois lados, em todos os quadros (o braço desce reto pela rampa); a pele do braço vai de 13 a 24,8 cm do meio, e sobre a almofada até 23,4 cm. Com as bordas a 30,5 cm, sobra almofada dos dois lados: 7,1 cm no alto, 8 cm no meio, 8,2 cm no cotovelo. A pegada da barra W não afasta os cotovelos (as mãos ficam a 18,5 cm do meio, com o cotovelo).
- **A pintura escondia o braço.** O Boneco pinta o braço de longe 5 cm atrás do tronco (22,2 cm de profundidade, de três quartos); o gerador pinta a almofada pelo centro dela, que fica na frente do tronco (29 cm). A almofada era pintada por cima do braço de longe, e o que sobrava dele à vista era a parte que passa da borda de longe na tela: parecia um braço por fora da almofada. O braço de perto era pintado bem à frente (26,4 cm à frente da almofada) e saía certo. De frente, os dois braços já eram pintados por cima (10,1 cm à frente).

**A mudança.**

1. De três quartos, o braço de longe vai 12 cm para a frente na pintura (`viesNaVista: { quina: { bracoL: 12 } }` no quadro do exercício): fica 4,9 cm à frente da almofada e na frente do tronco (ele está deitado na face, que fica na frente do peito), e 21 cm atrás do braço de perto. Vale para o movimento e para os três erros (no "Tirar o braço da almofada", os braços saem por cima, e continuam pintados por cima da almofada).
2. A conta da altura da almofada passou a pôr o 1 cm de amassado (`apoio.amassa`) no ponto mais fundo do braço **sobre a almofada**. Antes ela usava o braço inteiro, e o ponto mais fundo era o alto do braço, 9 cm além da borda de cima, fora da almofada: sobre a almofada, o tríceps amassava só 0,4 cm no alto, descolava 0,4 cm no meio e 1 cm no cotovelo. Agora: amassa 1 cm no alto e 0,2 cm no meio, e o cotovelo fica a 0,4 cm da face (o braço afina para o cotovelo). A almofada subiu 0,4 cm (de 100,5 para 100,9 cm, dentro da regulagem), o peito passou a amassar 2,2 cm (era 1,6; a tolerância é 2,5) e a bacia ficou 3,8 cm à frente do meio do assento (era 4,2).
3. A peça exporta `centroDaAlmofada` (o mesmo ponto que o gerador usa para ordenar a pintura), sem mudar o desenho: a folha da peça regerada saiu igual.

**A regra nova.** `banco-scott-bracos-na-almofada` (em `regras/banco-scott.ts`) media só o ponto mais fundo do braço direito contra o plano da face. Agora mede, a cada 3 quadros, **nos dois braços** e em três trechos (a axila: os 6 cm de cima da almofada; o meio do trecho do braço sobre a almofada; o cotovelo: o último décimo do braço):

- quanto o ponto mais fundo da pele amassa a face, no pior quadro e no melhor: descola no máximo 0,5 cm (1 cm na axila, onde o braço dobra sobre a borda) e amassa no máximo 2,5 cm;
- a menor folga da pele até a **borda lateral** do lado dela (tem de ficar dentro), e a do cotovelo até a borda de baixo;
- **a pintura**: nas vistas do exercício e na de frente, quando a face está virada para quem olha, cada braço tem de ser pintado depois da almofada (a profundidade do item do braço, com o ajuste do quadro naquela vista, contra a do centro da almofada);
- e, como antes, que o cotovelo não anda (até 1 cm) e dobra pelo menos 90°.

| | antes (`a2a2aad`) | depois |
|---|---|---|
| amassa no alto / meio / cotovelo, nos dois braços (cm, negativo = descola) | 0,4 / −0,4 / **−1** | 1 / 0,2 / −0,4 |
| folga da pele até a borda lateral, alto / meio / cotovelo (cm) | 7,1 / 8 / 8,2 | 7,1 / 8 / 8,2 |
| o cotovelo antes da borda de baixo (cm) | 4,2 | 4,2 |
| de três quartos, braço direito / esquerdo pintado à frente da almofada (cm) | 26,4 / **−6,8** | 26,1 / 4,9 |
| de frente, os dois braços pintados à frente da almofada (cm) | 10,1 | 9,7 |

Rodada no estado de antes (o exercício e o preparo de `a2a2aad`, com a regra nova), a conferência dá **1 falha**: o braço esquerdo pintado 6,8 cm atrás da almofada de três quartos, e o cotovelo descolado 1 cm. No estado novo: **0 falhas, os mesmos 2 avisos de antes**.

**O que ainda se vê, de três quartos.** O braço está deitado em cima da almofada, com 7,1 a 8,2 cm de almofada para fora dele. Mas a vista de três quartos olha 55° de lado e de cima: o braço tem quase 12 cm de grossura e fica acima da face, e na tela ele se desloca para o lado de longe. Medido na tela, entre as bordas laterais da almofada: o braço de perto fica 5,3 a 7,2 cm para dentro; o contorno do braço de longe passa da borda de longe de 0,2 cm (no cotovelo) a 1,7 cm (no alto). Ou seja, o braço de longe aparece por cima da ponta de longe da almofada, cobrindo-a, e não com almofada sobrando do lado de fora, como do lado de perto. Isso é o que a geometria dá com a almofada de 61 cm da ficha e os ombros do corpo da tabela (os centros a 37,2 cm um do outro); fechar os cotovelos ou alargar a almofada mudaria a técnica ou o aparelho sem fonte, e não foi feito. De cima (vista que o exercício não usa), o pintor não consegue pôr a almofada entre os ombros (acima dela) e as coxas (debaixo dela), que são um item só: fica fora da regra.
