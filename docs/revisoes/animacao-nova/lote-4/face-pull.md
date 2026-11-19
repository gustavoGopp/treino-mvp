# Lote 4 · Face pull com corda (`face-pull`)

De 15/11/2026. Terceira animação da família "braços na polia" (`polia-braco`). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/face-pull.md`; texto do app: `src/conteudo/exercicios/face-pull.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/face-pull.json`.
- Animação: `src/engine/novo/exercicios/face-pull.ts`, sobre o núcleo `exercicios/polia-bracos.ts`; a corda é a peça pronta `pecas-de-cena/corda-triceps.ts`.
- Regras novas medidas: `src/engine/novo/regras/polia-bracos.ts` (`polia-braco-polia-na-altura-da-testa`, `-bracos-estendidos-no-rosto`, `-maos-ao-lado-das-orelhas`, `-cotovelos-altos`); usa também `polia-braco-escapulas-juntam-sem-encolher`, `polia-braco-cabos-livres-do-corpo` e as duas regras da corda do tríceps francês (`triceps-frances-corda-na-mao`, `triceps-frances-corda-livre-da-cabeca`).
- Folha ao lado da de hoje: `../prototipos/folha-face-pull.png`. Quadros grandes: `../quadros/face-pull.png`.

## Como resolve cada quadro

- **O corpo em pé:** pés na largura do quadril, joelhos a 10°, o peito 3° para trás ("reto ou levemente inclinado para trás"); a pelve parada onde o centro de massa (braços no meio do caminho) cai no meio do pé.
- **As mãos:** dois pontos no referencial do tórax. No começo, braços estendidos (cotovelo a 10°) à frente, na altura do rosto (4 cm abaixo do trágio), a 8 cm do meio cada uma. No fim, ao lado das orelhas: 14 cm do meio, 3 cm acima do trágio e 10 cm à frente dele. A mão anda em linha de um ao outro e abre para os lados no fim do caminho ("puxe abrindo as mãos").
- **O braço:** chega à mão pelo cotovelo apontado para fora (para baixo no começo, para fora, um pouco para cima e para trás no fim: cotovelos altos). A pegada vai de 30° de pronação (palmas para baixo) a 20° de supinação ("mostra o bíceps").
- **As escápulas:** 6° à frente no começo ("o ombro pode ir um pouco à frente"), 8° para trás do ritmo no fim (juntas), ombros 2° abaixo do ritmo o tempo todo.
- **A corda e a coluna:** cada mão fecha num ramo, perto da ponta; os ramos ficam esticados até a bucha; o cabo vai reto da bucha à roldana. A coluna fica à frente, com a roldana 9 cm acima do trágio (testa) e onde o cabo, com os braços estendidos, tem 28 cm. A pilha sobe o curso do cabo dividido por 2.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica e o texto do app pedem | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Carro na altura da testa ou um pouco acima, com a corda | consenso | o centro da roldana 9 cm acima do trágio (171 cm; o alto da cabeça fica 13 cm acima do trágio) | sim |
| 1–2 passos para trás, pilha levantada com os braços estendidos | consenso | roldana 101 cm à frente da pelve; no começo o cabo tem 28 cm e a pilha já está 2 cm acima do repouso | sim |
| Pés na largura do quadril; tronco reto ou levemente para trás | consenso | bolas dos pés a 11 cm do meio; peito 3° atrás da vertical | sim |
| Início: braços estendidos à frente, na altura do rosto | consenso | cotovelo a 10,7°; o centro da mão 4 cm abaixo do trágio, 61 cm à frente do ombro | sim |
| Puxada ~1 s, abrindo as mãos, cotovelos altos | consenso | 1 s; as mãos vão de 16 a 28 cm uma da outra; da metade em diante o cotovelo fica no mínimo 4,1 cm acima do centro do ombro | sim |
| Fim: mãos ao lado das orelhas, cotovelos na linha do corpo | consenso | mãos 3 cm acima do trágio e 10 cm à frente dele, 14 cm do meio (fora da cabeça, de 15 cm); o cotovelo 17 cm acima do ombro e 5,6 cm atrás da linha do ombro; cotovelo a 132° | sim |
| Antebraços apontando para cima | consenso | o antebraço sobe do cotovelo para a mão, inclinado para dentro (a corda de 29 cm não deixa as mãos se afastarem mais: ver "O que não ficou bom") | em parte |
| Escápulas juntas no fim; ombros longe das orelhas | consenso | a clavícula vai de 6° à frente a 8° atrás do ritmo; as raízes das escápulas se aproximam 3,3 cm; a clavícula nunca sobe além do ritmo | sim |
| Corda nas mãos, esticada | medida | cada ramo esticado da mão à bucha, 25,2 cm em todos os quadros | sim |
| A corda e o cabo sem encostar no rosto | consenso | no mínimo 1,2 cm (no fim, a bucha fica 1 a 2 cm à frente do rosto); o cabo, 6,8 cm | sim |
| Peito parado | consenso | a base do pescoço anda 0 cm | sim |
| Cabo e pilha | medida | o cabo anda 54,2 cm e a pilha sobe 27,1 cm (2:1) | sim |

Conferência automática: **0 falha**. Avisos: (1) as linhas que são escolha de desenho (joelho, pescoço, cabeça, a distância das mãos no começo, quanto a mão fica à frente do trágio no fim); (2) músculos: de cima o ombro de trás não aparece no fim (0 cm²), então a vista padrão do modo Músculos é a de lado (37 cm² no pior instante). Ritmo: 7,3% (limite 15%).

## As vistas

A primeira é a **de cima** (correção de 05/11: o face pull abre de cima, onde se vêem as mãos abrindo ao lado da cabeça e a corda em V). A segunda é a **de lado**, a do guia de hoje: mostra os cotovelos altos, o tronco parado e os erros "cotovelos baixos" e "jogar o tronco para trás", e é a padrão do modo Músculos. Medi o ombro de trás nas seis vistas (pior instante): de lado 37 cm², de três quartos por trás 34, de trás 0 (no começo, braços à frente), de cima 0. Para a de lado passar de 30 cm², o cotovelo vai 5,6 cm para trás da linha do ombro no fim (dentro de "na linha do corpo").

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Cotovelos baixos (de lado, no fim) | os cotovelos apontam para baixo, junto do tronco (o braço a 45° do tronco, contra 125° no certo); as mãos param na altura do queixo, 22 cm abaixo do trágio: vira remada |
| Jogar o tronco para trás (de lado, no fim) | o peito vai de 3° a 18° atrás da vertical, com a lombar arqueada 10°; as mãos vão junto com o tronco |
| Encolher os ombros (de trás, no fim) | a clavícula sobe 16° além do ritmo (31,5° contra 13,8° no certo): a ponta do ombro sobe 4,3 cm; o pescoço dobra e a cabeça vai 1,6 cm à frente |

## Correções já feitas que esta animação respeita

- Abre de cima (05/11), com a corda e o cabo como peças próprias (a corda do tríceps, com as medidas da Rogue), sem o "triângulo comprido" de antes.
- Músculos da biblioteca: ombro de trás principal; costas (a parte do meio do trapézio) secundárias.

## O que não ficou bom

- **Os antebraços não ficam "apontando para cima" na vertical**: com a corda de 29 cm (Rogue) cada ramo tem 21 cm livres, e as mãos não podem ficar a mais de ~14 cm do meio sem a bucha encostar no rosto. Com as mãos ao lado das orelhas e os cotovelos altos, o antebraço sobe inclinado para dentro (cotovelo a 132°). Tentei mãos mais afastadas (16 cm) e mais atrás (4 cm à frente do trágio): a corda entrava no rosto (−0,3 cm).
- **De lado, no fim, o braço de perto cobre parte do rosto** (quadro `lateral:tec:f1`): é a vista de lado com as mãos na cabeça. A de cima mostra a mesma pose sem cobrir.
- **No erro "encolher", a cabeça quase não vai à frente** (1,6 cm): o que se lê é o ombro subindo, de trás. Levar a cabeça mais à frente com as mãos na corda fazia o rosto entrar na corda.


## Correção de 19/11 (cabeça de cima; auditoria das aprovadas antigas)

O Gustavo autorizou em 19/11 corrigir as aprovadas antigas com o defeito achado nas auditorias das fases A e B: de cima, a cabeça fica dentro da silhueta dos ombros, e o contorno único do Boneco (um só, por fora) não a desenhava; sobrava o calombo do rosto. A vista de cima é uma das duas do exercício (`vistas`).

**A mudança.** O quadro liga, só na vista de cima (`viesNaVista: { cima: { cabeca: 1 } }`), a opção `cabeca` do Boneco (acréscimo de 18/11, desligada por padrão; a mesma das elevações corrigidas e do quadril na máquina): a cabeça é pintada de novo por cima do corpo, com o contorno próprio. A pose, o movimento, as peças, os rótulos e as outras vistas não mudam; o núcleo comum, quando há, também não (o exercício embrulha o quadro dele). A ficha liga a regra comum `cabeca-aparece-em-cada-vista` (`src/engine/novo/regras/vistas-do-guia.ts`).

| vista de cima | antes (`72d00fc`) | depois |
|---|---|---|
| quadros em que a cabeça sumiria / com contorno próprio | 5 / **0** | 5 / 5 |
| eixo do tórax e quem olha (mínimo); contorno da cabeça dentro da silhueta (máximo); a cabeça à frente do tronco (máximo) | 3,0°; 100%; 13,3 cm | iguais (a pose não mudou) |

No estado de antes, com a regra na ficha, a conferência dá 1 falha (esta regra). No estado novo: 0 falhas e os mesmos avisos de antes. O antes e depois está em `correcao-das-antigas/face-pull.png`; os quadros grandes foram regravados (`quadros/face-pull.png`).
