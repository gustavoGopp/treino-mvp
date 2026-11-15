# Lote 4 · Remada sentada com elástico (`remada-elastico`)

De 15/11/2026. A pessoa fica sentada no colchonete, com as pernas estendidas, os joelhos um pouco dobrados e os pés quase em pé. O meio do tubo com pegadores passa pela sola dos dois pés, e cada mão segura um pegador, com as palmas uma para a outra.

- **Alongado:** os braços ficam estendidos para os pés, com o tronco 12° à frente e as escápulas abertas.
- **Puxada:** o tronco volta à vertical, as escápulas se juntam e os cotovelos vão para trás, rentes ao corpo, até as mãos ficarem ao lado do abdômen.

A animação ainda não está ligada às telas do app.

- **Fontes:** a ficha da técnica (`docs/pesquisa/animacoes/remada-elastico.md`) e o texto do app (`src/conteudo/exercicios/remada-elastico.json`).
- **Ficha de movimento:** `src/engine/novo/dados/movimentos/remada-elastico.json`. A escápula e os erros seguem a ficha da `remada-suspensao`.
- **Animação:** `src/engine/novo/exercicios/remada-elastico.ts`.
  - É uma pose sentada nova. A pelve fica na altura em que a nádega afunda 1 cm no colchonete, e o tornozelo fica na distância que dá 20° de joelho, com o calcanhar no colchonete.
  - Não usa nenhum núcleo comum além de `exercicios/elastico-faixa.ts`.
  - O nome do arquivo começa com `remada`, como o dos colegas das remadas com peso livre. Ele é o id do exercício (o guia pede `exercicios/<id>.ts`). O núcleo e as regras desta família começam com `elastico-`.
- **Peças:** o colchonete da tabela e o pegador na mão (`pecas-de-cena/elastico-pegador.ts`).
- **Regras:**
  - novas: `elastico-remada-tronco-volta-a-vertical`, `elastico-remada-maos-ao-lado-do-abdomen` e `elastico-na-sola-dos-pes`, para o pé fora do chão;
  - dos elásticos: `elastico-livre-do-corpo` e `elastico-nas-maos`;
  - da suspensão: `cotovelos-rentes-na-fita`, `escapulas-se-juntam` e `palmas-uma-para-a-outra`. Elas medem só o esqueleto e servem como estão.
- **Folha:** `../prototipos/folha-remada-elastico.png`. **Quadros:** `../quadros/remada-elastico.png`.

## O elástico

Fica o tubo da tabela: 121,9 cm, estiramento máximo de 3 vezes.

Das mãos estendidas até a sola, o caminho é curto. Sem nada a mais, o tubo ficaria frouxo no alongado (cerca de 95 cm de caminho contra 122 de tubo). O cartão pede o contrário: "com os braços estendidos, o elástico já deve estar um pouco esticado".

A saída é a mesma do stiff com elástico: segurar curto. O tubo dá duas voltas em cada mão, por cima do pegador, com raio de 2,4 cm. Com uma volta só, ele começava quase frouxo.

| Corpo | Alongado | Fim |
|---|---|---|
| Homem | 1,3 vezes (154 cm) | 2,2 vezes (265 cm) |
| Mulher | 1,2 vezes | 2,1 vezes |

O elástico longo em laço (208 cm) ficaria ainda mais frouxo aqui.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido, homem) | Confere? |
|---|---|---|---|
| Sentado no chão (colchonete), pernas estendidas, joelhos um pouco dobrados | consenso | Os joelhos ficam a 20°, e a pelve não sai do lugar (0 cm). O ponto mais baixo do corpo fica no colchonete. | sim |
| O meio do elástico pela sola dos dois pés | consenso | O tubo passa a 50% do caminho do calcanhar à bola, a 0,6 cm da sola. | sim |
| Palmas uma para a outra | consenso | O antebraço fica de 82° a 100° (90° = palmas uma para a outra). | sim |
| Alongado: braços estendidos para os pés, tronco ~10–15° à frente, escápulas abertas | consenso | O peito fica a 12°. O cotovelo fica a 11,6°, e a mão 23° abaixo da horizontal do ombro. | sim |
| Puxada: o tronco volta à vertical, as escápulas se juntam | consenso | O peito vai de 12° a 0°, sem mudar a lombar. A clavícula vai 13,9° para trás. | sim |
| Fim: mãos ao lado do abdômen, cotovelos atrás do tronco, rentes | consenso | A mão fica na altura de 108,5 cm do corpo em pé, entre a crista do quadril (106,5 cm) e a costela de baixo (112 cm). O cotovelo fica 23,6 cm atrás da linha do tronco, e o braço se afasta 16,5° do lado. | sim |
| Ombros longe das orelhas | consenso | A elevação da escápula no fim é de −1°. | sim |
| Já um pouco esticado no início | consenso | 1,3 vezes | sim |
| ~1 s puxando, 1 s segurando, ~2 s voltando | consenso | 1,1 s, 1 s e 2,1 s | sim |

O tubo passa a no mínimo 2,3 cm da pele (canela).

**Conferência automática:** `conferir.mjs` dá **0 falha e 2 avisos**:

1. **"Mais esticado em cima":** o ciclo começa no alongado, onde o tubo estica menos. É o certo para a remada.
2. **As linhas de desenho da ficha.**

Ritmo: o maior salto é de 11% (a mão sai do alongado devagar, para o cotovelo não dar tranco).

## As vistas

- **De lado** (a primeira vista): mostra o tronco que volta à vertical, o cotovelo que passa para trás e o tubo das mãos aos pés.
- **De trás:** mostra as escápulas que se juntam, os cotovelos rentes e o erro de encolher.
- **Costas visíveis (cm²):**

  | Vista | Área |
  |---|---|
  | De trás | 829 |
  | De três quartos, de trás | 629 |
  | De lado | 176 |

  **A vista padrão do modo Músculos é a de trás.** De lado ficam 176 cm², menos de um terço da melhor; a conferência completa dá o aviso, e essa vista sai do modo Músculos.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Balançar o tronco (de lado, no fim) | O tronco vai de 24° à frente a 14° para trás da vertical. |
| Arredondar a coluna no alongamento (de lado, no alongado) | A lombar dobra 16° e a torácica 22° além da neutra. |
| Encolher os ombros no fim (de trás) | A escápula sobe 8°. |

## Correções já feitas que esta animação respeita

- A vista de lado fica, e a de trás entra: de trás, o corpo sentado não some, e o erro de encolher aparece (05/11).
- Os rótulos ficam fora do corpo (R4).
- Os músculos são os da biblioteca: costas (dorsal e meio das costas) como principal, e ombro de trás e bíceps como secundários.

## O que não ficou bom

- **A vista de lado tem um rótulo só** ("elástico na sola dos pés"). Tentei "peito alto" no C7 e no ombro de trás, e "cotovelos rentes, para trás" no cotovelo. Os três fios cruzavam a cabeça ou o braço em algum quadro. "Cotovelos rentes" foi para a vista de trás. "Peito alto" ficou de fora; a dica continua no texto da fase.
- **De trás, o fio de "junta as escápulas no fim" atravessa o trapézio** até o C7, no meio das costas. É o mesmo ponto da remada na suspensão.
- **As duas voltas do tubo em cada mão** aparecem como um borrão azul em volta do punho no alongado (`lateral:tec:f0`).

## Risco de o Gustavo não gostar: médio

- **A pose sentada é nova**, sem núcleo aprovado.
- **O tubo com duas voltas em cada mão** é uma escolha de montagem que o cartão não descreve. O cartão diz só "cada mão segura uma ponta". É o que deixa o tubo esticado com os braços estendidos.
