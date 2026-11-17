# Lote 3 · Desenvolvimento com elástico (`desenvolvimento-elastico`)

De 15/11/2026. O desenvolvimento em pé, com um tubo com pegadores de 60 pol.

- **Postura:** em pé, os dois pés pisam no meio do tubo, na largura do quadril, joelhos destravados (8°), tronco na vertical e parado.
- **Braço:** o do desenvolvimento aprovado (`exercicios/empurrar-para-cima.ts`): antebraço na vertical, das mãos na altura das orelhas, com os cotovelos 30° à frente do plano do corpo, até os braços quase estendidos sobre os ombros. Palmas para a frente, o pegador atravessado na mão.
- **Tubo:** a fita sai da mão fechada pela palma, para baixo e para a frente; o tubo desce na frente do antebraço e pelo lado do corpo até a borda de fora do pé, contornando o corpo (`elastico-faixa.ts`), e passa por baixo dos dois pés.

Ainda não está ligada às telas do app.

- **Fontes:** a ficha da técnica (`docs/pesquisa/animacoes/desenvolvimento-elastico.md`, que manda partir do desenvolvimento aprovado) e o texto do app (`src/conteudo/exercicios/desenvolvimento-elastico.json`).
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/desenvolvimento-elastico.json`. O braço vem do `desenvolvimento`; a postura em pé e o erro de arquear em pé, do `desenvolvimento-unilateral-kettlebell`.
- **Animação:** `src/engine/novo/exercicios/desenvolvimento-elastico.ts`, com o núcleo `criarDesenvolvimento(ficha, 'elastico')` (abaixo).
- **Objeto novo:** `dados/objetos/elastico-tubo-longo.json` (`elasticoTuboLongo`), registrado em `dados/objetos/registro.ts`.
- **Regras:** as do desenvolvimento (`carga-na-altura-das-orelhas`, `cotovelos-um-pouco-a-frente`, `antebraco-na-vertical`, `bracos-quase-estendidos-sobre-os-ombros`), as comuns `lombar-neutra`, `tronco-quase-parado` e `peso-perto-do-meio-do-pe`, e quatro dos elásticos (`elastico-pisado-no-meio-da-sola`, `elastico-livre-do-corpo`, `elastico-nas-maos`, `elastico-bracos-juntos`). Nenhuma regra nova. A `carga-longe-da-cabeca` não entra: sem halter, ela não mede nada.
- **Folha:** `../prototipos/folha-desenvolvimento-elastico.png`. **Quadros:** `../quadros/desenvolvimento-elastico.png`.

## Mudanças em arquivos comuns (aditivas)

1. **`exercicios/empurrar-para-cima.ts`:** `CargaDoDesenvolvimento` ganhou `'elastico'`: em pé, os dois braços com o pegador (3,3 cm) e as palmas para a frente, sem carga no equilíbrio; o quadril fica parado na média dos ângulos de equilíbrio da subida (como no kettlebell, sem a conta da bola). O quadro sai só com o corpo e o chão.
2. **`exercicios/rosca-elastico.ts`:** a função `bordasDaSola` passou a ser exportada (só a palavra `export`).

O resumo SHA-1 dos quadros e do enquadramento do `desenvolvimento`, do `desenvolvimento-unilateral-kettlebell` e da `rosca-elastico` dá o mesmo antes e depois.

## O elástico: o tubo de 48 pol não fecha a conta

Com o tubo da tabela (121,9 cm, máximo de 3 vezes), a conta dá cerca de 2,8 vezes embaixo e 3,5 vezes em cima, no homem: passa do máximo do fabricante com os braços estendidos. A saída foi um tubo mais longo, com medidas de fabricante:

| Medida | Valor | Tipo | Fonte |
|---|---|---|---|
| Tubo em repouso (`comp`) | 152,4 cm (60 pol) | medida | Spartan by Power Systems, Covered Resistance Tube ("Tube is 60\" (5')"); a Life Fitness vende um tubo com a mesma medida e a mesma capa de náilon |
| Estiramento máximo (`esticaAte`) | 3,3 vezes | derivada | Spartan: "can stretch to 199\"" → 199 / 60. A página não diz se os 199 pol contam os pegadores |
| Diâmetro do tubo | 1,2 cm | **provisória** | a página não dá; o desenho usa o do tubo da tabela (a capa deixa o real mais grosso) |
| Pegador e fita | 12,7 cm e 8,9 cm | **provisória** | a página não dá; o desenho usa os do tubo da tabela (Rogue) |

O laço de 41 pol (`elasticoLongo`) não serve aqui: preso nos pés e seguro nas duas mãos, o trecho de cima do laço passaria na frente do rosto, embaixo.

| Corpo | Embaixo | Em cima |
|---|---|---|
| Homem | 2,3 vezes (344 cm) | 2,8 vezes (428 cm) |
| Mulher | 2,1 vezes (316 cm) | 2,6 vezes (392 cm) |

Já está bem esticado nas orelhas ("o elástico já deve estar um pouco esticado", diz o cartão), estica mais em cima e fica abaixo do máximo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Os dois pés no meio do elástico, na largura do quadril | consenso | Pés a 9 cm do meio; o tubo passa sob a sola a 50% do caminho do calcanhar à bola; o pé fica inteiro no chão. | sim |
| Cada mão segura uma ponta | consenso | O pegador atravessado na palma, a mão fechada nele. | sim |
| Mãos na altura das orelhas | consenso | O centro da mão fica 0,3 cm abaixo da orelha (mulher: 1 cm). | sim |
| Cotovelos um pouco à frente (~20° a ~45°) | consenso | 30° à frente do plano do corpo | sim |
| Antebraços na vertical | consenso | desvio de 0° | sim |
| Em cima, braços quase estendidos sobre os ombros | consenso | O cotovelo dobra 11°; a mão fica a 5,8 cm da vertical do ombro. | sim |
| Abdômen e glúteo firmes, lombar sem arquear | consenso | A lombar fica na curva de repouso (0°); a base do pescoço anda 0 cm. | sim |
| Joelhos destravados | consenso | 8° | sim |
| O elástico estica mais em cima | consenso (física) | 2,3 vezes embaixo, 2,8 em cima | sim |
| ~1–1,5 s subindo, ~2–3 s descendo | consenso | 1,3 s e 2,4 s | sim |

O tubo passa a no mínimo 0,6 cm da pele (antebraço; mulher: 0,4 cm), onde encosta. As mãos ficam a 46–90 cm uma da outra. O centro de massa anda de −0,7 a 0,4 cm do meio do pé. A elevação do braço chega a 169,6°: com os 80° do desenvolvimento sentado, em pé dava 170,6°, acima da média da tabela de amplitudes, e o úmero ficou em 79°.

**Conferência automática:** `conferir.mjs` dá **0 falha e 3 avisos**:

1. **"Mais esticado em cima":** o ciclo começa embaixo, onde o tubo estica menos. É o certo.
2. **Linhas de desenho da ficha:** `cervical`, `cabeca`, `elastico.pontaAFrente`, `elastico.folga`.
3. **De frente, a frente do ombro não aparece** (0 cm², contra 40 de lado): fica fora do modo Músculos, como no desenvolvimento aprovado.

Ritmo: o maior salto é de 9,3%.

## As vistas

- **De lado** (a primeira): os cotovelos à frente, o antebraço na vertical, a lombar parada e o tubo do pé à mão, pela frente do antebraço.
- **De frente:** os dois pés no meio do tubo e as mãos que sobem e fecham um pouco.
- **Frente do ombro visível (cm², o pior de três instantes, homem/mulher):** de lado 40/37; de três quartos 38/34; de cima 25/23; de frente 0/0; de trás 73/66 e de três quartos por trás 73/66. Olhei os quadros de trás: o desenho põe a mancha da frente do ombro na parte de trás do braço levantado, o que lê como o ombro errado. **A vista padrão do modo Músculos fica a de lado**, como no desenvolvimento aprovado.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Arquear a lombar (de lado, em cima) | A lombar arqueia 20°, as costas de cima 8°, e o peito vai para trás (os números do desenvolvimento em pé com kettlebell). |
| Cotovelos para trás (de cima, embaixo) | Os cotovelos ficam 15° atrás da linha do corpo. |
| Descer pouco (de frente, embaixo) | A descida para com o úmero 35° acima da horizontal. |

## O que não ficou bom

- **A vista de lado tem um rótulo só** ("abdômen firme, lombar parada"). "Cotovelos um pouco à frente" ficava ao lado do corpo e, em cima, o fio cruzava a cabeça; acima do corpo (o campo `acima`), o quadro abria e o corpo ficava pequeno, e o fio descia pelo antebraço. Saiu. O cotovelo à frente aparece no erro "Cotovelos para trás" e na trajetória.
- **De lado, em cima,** o tubo do lado de perto passa na frente do corpo, como uma linha vertical sobre o ombro e o tronco: é onde ele passa (por fora, mais perto de quem olha), como na rosca com elástico.
- **O tubo de 60 pol** é outro elástico, e não o tubo da tabela. O máximo de 3,3 vezes vem de uma frase de um fabricante só.

## Risco de o Gustavo não gostar: médio

O braço é o do desenvolvimento aprovado, mas a pose em pé é nova para os dois braços, o tubo é outro (60 pol, com medidas parte provisórias) e a vista de lado perdeu o rótulo do cotovelo.
