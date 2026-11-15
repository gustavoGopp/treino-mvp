# Lote 3 · Crucifixo invertido na polia, cabos cruzados (`crucifixo-invertido-polia`)

De 15/11/2026. Segunda animação da família "braços na polia" (`polia-braco`). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-invertido-polia.md`; texto do app: `src/conteudo/exercicios/crucifixo-invertido-polia.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-invertido-polia.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-invertido-polia.ts`, sobre o núcleo `exercicios/polia-bracos.ts`.
- Regras novas medidas: `src/engine/novo/regras/polia-bracos.ts` (`polia-braco-cabos-cruzados`, `-bracos-quase-retos`, `-cruzados-a-frente`, `-maos-perto-da-linha-do-corpo`, `-escapulas-juntam-sem-encolher`, `-antebracos-nao-se-atravessam`, além das comuns da família).
- Folha ao lado da de hoje: `../prototipos/folha-crucifixo-invertido-polia.png`. Quadros grandes: `../quadros/crucifixo-invertido-polia.png`.

## Como resolve cada quadro

- **O corpo em pé:** pés na largura do quadril, joelhos a 10°, peito a 3° da vertical; a pelve parada onde o centro de massa (braços no meio do caminho) cai no meio do pé.
- **O braço:** pela linha do ombro à mão, quase reto (cotovelo fixo a 10°), girando no tórax de cruzado à frente até 88° (a mão perto da linha do corpo). No começo, o braço direito passa 6° por cima e o esquerdo 6° por baixo (as mãos cruzam o meio do corpo em 5 cm; os antebraços se cruzam sem se atravessar); esse desnível some, sem tranco, nos primeiros 40% da abertura. A altura média dos braços é acertada uma vez (`elAjuste`, `resolver1`) para os dois cabos terem o mesmo comprimento no começo, senão as duas pilhas não sobem juntas.
- **As escápulas:** um pouco à frente no começo (4° além do ritmo), juntas sem força no fim (8° para trás do ritmo), com os ombros 2° abaixo do ritmo o tempo todo.
- **As colunas:** à frente e dos lados, roldanas na altura do centro do ombro, 110 cm para o lado e 125 cm à frente da pelve. Cabos cruzados: a mão direita segura o estribo da coluna da esquerda (`cabo`) e a esquerda, o da direita (`cabo2`); cada pilha sobe o curso do seu cabo dividido por 2.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica e o texto do app pedem | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polias na altura dos ombros | consenso | o centro das roldanas a 0 cm da altura do centro do ombro | sim |
| Cabos cruzados (a mão direita segura o cabo da esquerda) | consenso | `cabo`: mão direita → coluna da esquerda; `cabo2`: mão esquerda → coluna da direita | sim |
| Um passo para trás; braços estendidos à frente, na altura dos ombros, cruzados | consenso | mãos 58 cm à frente do ombro, cruzando o meio do corpo em 5 cm; a direita 9,5 cm acima e a esquerda 3,8 cm abaixo da altura do ombro | sim |
| Cotovelos levemente dobrados e fixos (braços quase retos) | consenso | 10,0° em todos os quadros | sim |
| Pés na largura do quadril | consenso | bolas dos pés a 11 cm do meio | sim |
| Abertura ~1 s, até as mãos perto da linha do corpo | consenso | 1,1 s; no fim, o centro da mão 2,2 cm à frente da linha do ombro e 5,8 cm acima da altura do centro do ombro | sim |
| Escápulas: juntar sem força, ombros longe das orelhas | consenso | a clavícula vai de 4° à frente a 8° atrás do ritmo; as raízes das escápulas se aproximam 3,4 cm; a clavícula nunca sobe além do ritmo (−2°) | sim |
| Volta ~2 s | consenso | 2,2 s | sim |
| Cabos sem encostar no corpo | consenso | no mínimo 8,4 cm da pele | sim |
| Os antebraços cruzados não se atravessam | desenho | folga mínima de 1,9 cm entre os dois | sim |
| Cabos e pilhas | medida | cada cabo anda 103,9 cm e a sua pilha sobe 52,0 cm (2:1) | sim |
| Tronco parado | consenso | a base do pescoço anda 0 cm | sim |

Conferência automática: **0 falha**. Avisos: (1) as linhas que são escolha de desenho (joelho, tronco, pescoço, cabeça, abertura das colunas, o desnível dos braços e quando ele some, a supinação da pegada, a folga da pilha); (2) músculos: de trás o ombro posterior some no começo (braços à frente: 0 cm² no pior instante; 112 cm² no fim), então a vista padrão do modo Músculos é a de cima (69 cm² no pior instante). Ritmo: 7,5% (limite 15%).

## As vistas

A primeira é a **de cima** (correção de 05/11: abre de cima; mostra o arco, os cabos cruzados e os braços quase retos) e é a padrão do modo Músculos. A segunda é a **de trás**, que mostra os ombros baixos, as escápulas e o erro "encolher". Testei de frente (os braços cruzados cobrem o peito; o músculo some no fim) e as duas de três quartos (as colunas à frente cobrem o corpo e o encolhem no quadro).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Encolher os ombros (de trás, no fim) | a clavícula sobe 16° além do ritmo (30,4° contra 12,4° no certo); a ponta do ombro sobe 4,3 cm |
| Dobrar os cotovelos (de cima, no fim) | o cotovelo dobra até 85° e vai para trás; a mão para 22 cm à frente da linha do ombro (no certo, 2 cm): vira remada |
| Jogar o tronco para trás (de lado, no fim) | o peito vai de 3° à frente a 14° atrás da vertical, com a lombar arqueada 10° |

## Correções já feitas que esta animação respeita

- Abre na vista de cima (05/11).
- Montagem com os cabos cruzados (04/11). A altura de 132 cm da conferência de 04/11 era do motor de hoje; aqui a roldana fica na altura do centro do ombro do corpo da tabela (141 cm), que é o que o texto pede.
- Só o ombro de trás como principal, sem secundário (achado 5 da anatomia).

## O que não ficou bom

- **De lado, no erro "Jogar o tronco para trás", o cabo da mão direita passa na frente do rosto** (quadro `lateral:err:f1:balanco`). Em 3D ele fica a mais de 40 cm do rosto (vai da mão, ao lado do corpo, para a coluna da esquerda, à frente); de perfil a linha cruza a cabeça. Testei as vistas de três quartos para esse erro: a coluna da frente cobre o corpo e o corpo encolhe no quadro; ficou a de lado.
- **De cima, o corpo fica na parte de cima do quadro**, com os cabos compridos até as colunas, 125 cm à frente. As colunas mais perto deixavam os cabos cruzados passarem pelas mãos no meio da abertura (medido: 0,1 cm). O corpo de cima é menor que de trás.
- A altura da mão no começo não é igual nos dois braços (+9,5 e −3,8 cm do ombro): é o desnível para os antebraços não se atravessarem.
