# Lote 4 · Face pull com elástico (`face-pull-elastico`)

De 15/11/2026. Refeito depois da tentativa que não entrou (`relatorio-elasticos.md`, o fim): agora com a pose dos braços do face pull na polia aprovado, que deixa a parte de trás do ombro aparecer de lado. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/face-pull-elastico.md`; texto do app: `src/conteudo/exercicios/face-pull-elastico.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/face-pull-elastico.json`.
- Animação: `src/engine/novo/exercicios/face-pull-elastico.ts`, sobre o núcleo `exercicios/polia-bracos.ts` (o corpo em pé, o equilíbrio e a pegada). As mãos e os cotovelos seguem o mesmo caminho de `exercicios/face-pull.ts`.
- Peças prontas: a porta com a âncora no vão da dobradiça (`pecas-de-cena/elastico-ancora-no-alto.ts`) e o pegador na mão (`pecas-de-cena/elastico-pegador.ts`).
- Regras novas medidas (em `regras/elasticos.ts`):
  - `elastico-face-pull-ancora-na-altura-da-testa`;
  - `elastico-face-pull-esticado-no-comeco`.
- Regras reaproveitadas:
  - do face pull na polia: `polia-braco-bracos-estendidos-no-rosto`, `-maos-ao-lado-das-orelhas`, `-cotovelos-altos` e `-escapulas-juntam-sem-encolher`;
  - dos elásticos: `elastico-nas-maos`, `elastico-livre-do-corpo` e `elastico-bracos-juntos`;
  - comum: `tronco-quase-parado`.
- Folha ao lado da de hoje: `../prototipos/folha-face-pull-elastico.png`. Quadros grandes: `../quadros/face-pull-elastico.png`.

## O elástico

É o tubo com pegadores de 48 pol (objeto `elastico`, 121,9 cm, que estica até 3 vezes). Do começo ao fim, ele vai de 1,15 a 2,0 vezes o comprimento em repouso: fecha a conta, nunca frouxo e longe do máximo. O tubo de 60 pol também fecharia, mas com a porta mais longe (o que encolhe o corpo no quadro); a faixa em laço de 41 pol não tem pegadores, e o cartão fala em "uma ponta em cada mão".

O meio do tubo dá a volta na alça de uma âncora de porta. A âncora fica no vão do lado da dobradiça, na altura da testa, numa porta fechada à frente da pessoa. A porta fica onde o tubo, com os braços estendidos, já tem 1,15 vez o comprimento em repouso ("dê passos para trás até o elástico ficar esticado"). Medido: a alça fica 73 cm à frente das mãos estendidas, e a face da porta, 133 cm à frente da pelve. A porta, a âncora e o tubo a mais de 40 cm das mãos são cenário.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica e o texto do app pedem | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| O meio do elástico preso na altura da testa, numa porta fechada, com a âncora do lado de lá | consenso | a alça fica 9 cm acima do trágio (o alto da cabeça fica 13 cm acima); a espuma fica do lado de lá da porta | sim |
| Passos para trás até o elástico ficar esticado com os braços estendidos | consenso | no começo, o tubo estica 1,15 vez (140 cm) | sim |
| O elástico estica mais no fim (a tensão é maior com as mãos perto do rosto) | consenso | o tubo cresce o caminho todo e chega a 2,0 vezes (245 cm) | sim |
| Pés na largura do quadril; tronco reto | consenso | as bolas dos pés ficam a 11 cm do meio; o peito fica 3° atrás da vertical, como no face pull aprovado | sim |
| Início: braços estendidos à frente, na altura do rosto, palmas para baixo | consenso | o cotovelo dobra 10,8°; o centro da mão fica 4 cm abaixo do trágio; a pronação é de 30° | sim |
| Puxada ~1 s, abrindo as mãos, cotovelos altos | consenso | dura 1 s; as mãos vão de 20 a 36 cm uma da outra; da metade em diante, o cotovelo fica no mínimo 3,9 cm acima do centro do ombro | sim |
| Fim: mãos ao lado das orelhas, cotovelos na linha do corpo | consenso | as mãos ficam 3 cm acima do trágio, 10 cm à frente dele e a 18 cm do meio (fora da cabeça, que tem 15 cm de largura); o cotovelo fica 13,4 cm acima do ombro e 7,4 cm atrás da linha dele; o cotovelo dobra 132° | sim |
| Antebraços apontando para cima | consenso | o antebraço sobe do cotovelo para a mão, inclinado para dentro (72° da vertical): ver "O que não ficou bom" | em parte |
| O ombro pode ir um pouco à frente; as escápulas se juntam no fim, sem encolher | consenso | a clavícula vai de 6° à frente a 8° atrás do ritmo; as raízes das escápulas se aproximam 3,5 cm; a clavícula nunca sobe além do ritmo (no máximo, −2°) | sim |
| Uma ponta em cada mão | medida | cada mão fecha num pegador (`forma: 'pegada'`, diâmetro de 3,3 cm) | sim |
| O elástico não atravessa o rosto nem os braços | consenso | o tubo passa a no mínimo 10 cm da pele (cabeça) | sim |
| Peito parado | consenso | a base do pescoço anda 0 cm | sim |

Conferência automática: **0 falha**, no homem e na mulher.

Avisos:

1. **"Mais esticado em cima":** é o aviso geral do elástico. Ele espera que o tubo esteja mais esticado no primeiro quadro, como no agachamento. Aqui é o contrário, e de propósito: a ficha pede a tensão maior no fim. A regra `elastico-face-pull-esticado-no-comeco` mede isso.
2. **As linhas que são escolha de desenho:** `joelho`, `cervical`, `cabeca`, `elastico.noQuadro`, `inicio.maos` e `fim.aFrente`.
3. **Músculos:** de lado, o ombro de trás aparece com 33 cm² no pior instante (é a vista padrão do modo Músculos). De cima, aparece com 0 cm², como no face pull aprovado.

Ritmo: 7,4% (o limite é 15%).

## As vistas

A primeira vista é a **de lado**: mostra o corpo grande, os cotovelos altos, o tronco parado, a âncora na altura da testa e os erros "cotovelos baixos" e "jogar o tronco para trás". A segunda é a **de cima**: mostra as mãos abrindo ao lado da cabeça e os dois ramos do tubo em V até a âncora (correção de 05/11). É a mesma ordem do face pull na polia, depois de juntado.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Cotovelos baixos (de lado, no fim) | os cotovelos apontam para baixo, junto do tronco, e as mãos param na altura do queixo, 22 cm abaixo do trágio: vira remada |
| Jogar o tronco para trás (de lado, no fim) | o peito vai de 3° a 18° atrás da vertical, com a lombar arqueada 10°; as mãos vão junto com o tronco |
| Encolher os ombros (de trás, no fim) | a clavícula sobe 16° além do ritmo e o pescoço dobra, com a cabeça à frente |

## Correções já feitas que esta animação respeita

- No face pull, a vista de cima mostra as mãos abrindo ao lado da cabeça (05/11). Aqui ela é a segunda vista, porque a primeira tem de mostrar o corpo grande (guia, seção 7).
- A faixa afina ao esticar (05/11): o tubo é desenhado com o diâmetro dividido pela raiz do quanto estica.
- Músculos da biblioteca: o ombro de trás é o principal; as costas (a parte do meio do trapézio), o secundário.

## O que não ficou bom

- **Os antebraços não ficam "apontando para cima" na vertical.** No fim, o antebraço fica a 72° da vertical, inclinado para dentro. Sem a corda, as mãos já abrem mais que na polia (18 cm do meio, contra 14).
  - Tentei abri-las mais (20 a 26 cm) e trazê-las mais para trás. O antebraço chegou a 40° da vertical, mas o ombro de trás, de lado, caiu para 4 a 21 cm², abaixo do mínimo de 30.
  - Com os cotovelos ainda mais para trás, ele volta a aparecer, mas o cotovelo sai da "linha do corpo" (mais de 10 cm atrás dela).
  - O limite é o desenho do ombro de trás, que não posso mudar. Fiquei com a pose do face pull aprovado, um pouco mais aberta.
- **De lado, no fim, o braço de perto cobre parte do rosto, e o tubo passa na frente dele no desenho** (quadro `lateral:tec:f1`). No espaço, o tubo fica a 10 cm da pele. É o mesmo do face pull aprovado.
- **De trás (só no erro "encolher"), a porta aparece como fundo,** com o vão da dobradiça no meio, atrás das pernas.


## Correção de 19/11 (cabeça de cima; auditoria das aprovadas antigas)

O Gustavo autorizou em 19/11 corrigir as aprovadas antigas com o defeito achado nas auditorias das fases A e B: de cima, a cabeça fica dentro da silhueta dos ombros, e o contorno único do Boneco (um só, por fora) não a desenhava; sobrava o calombo do rosto. A vista de cima é uma das duas do exercício (`vistas`).

**A mudança.** O quadro liga, só na vista de cima (`viesNaVista: { cima: { cabeca: 1 } }`), a opção `cabeca` do Boneco (acréscimo de 18/11, desligada por padrão; a mesma das elevações corrigidas e do quadril na máquina): a cabeça é pintada de novo por cima do corpo, com o contorno próprio. A pose, o movimento, as peças, os rótulos e as outras vistas não mudam; o núcleo comum, quando há, também não (o exercício embrulha o quadro dele). A ficha liga a regra comum `cabeca-aparece-em-cada-vista` (`src/engine/novo/regras/vistas-do-guia.ts`).

| vista de cima | antes (`72d00fc`) | depois |
|---|---|---|
| quadros em que a cabeça sumiria / com contorno próprio | 5 / **0** | 5 / 5 |
| eixo do tórax e quem olha (mínimo); contorno da cabeça dentro da silhueta (máximo); a cabeça à frente do tronco (máximo) | 3,0°; 100%; 13,3 cm | iguais (a pose não mudou) |

No estado de antes, com a regra na ficha, a conferência dá 1 falha (esta regra). No estado novo: 0 falhas e os mesmos avisos de antes. O antes e depois está em `correcao-das-antigas/face-pull-elastico.png`; os quadros grandes foram regravados (`quadros/face-pull-elastico.png`).
