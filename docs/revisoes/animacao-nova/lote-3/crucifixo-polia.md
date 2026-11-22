# Lote 3 · Crucifixo na polia (crossover) (`crucifixo-polia`)

De 15/11/2026. Primeira animação da família "braços na polia" (`polia-braco`) no motor novo. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-polia.md`; texto do app: `src/conteudo/exercicios/crucifixo-polia.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-polia.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-polia.ts`, sobre o núcleo novo `exercicios/polia-bracos.ts` (o corpo em pé parado, o braço em arco, as colunas com cabo e pilha), que os outros três da família também usam.
- Regras novas medidas: `src/engine/novo/regras/polia-bracos.ts` (ids `polia-braco-*`).
- Folha ao lado da de hoje: `../prototipos/folha-crucifixo-polia.png`. Quadros grandes: `../quadros/crucifixo-polia.png`.

## Como resolve cada quadro

- **O corpo em pé:** um pé à frente do outro (o direito 22 cm à frente do meio, o esquerdo 26 cm atrás, com o calcanhar de trás 25° levantado). A altura da pelve sai do joelho da frente a 12°; a inclinação da pelve sai do peito a 12° da vertical (com as costas de cima 4° estendidas: "peito alto"). A pelve fica **parada** no ponto em que o centro de massa, com os braços no meio do arco, cai no meio do caminho entre a bola do pé de trás e o meio do pé da frente.
- **O braço:** pela linha do ombro ao centro da pegada (`bracoNaLinha`, da fita), com o cotovelo **sempre a 20°**. A linha gira no tórax de 95° (um pouco atrás da linha do corpo) até o giro em que os centros das duas pegadas ficam a 9 cm (uma largura de mão; `resolver1`), descendo de 6° a 10° abaixo do plano do tórax. O cotovelo aponta para fora, para trás e um pouco para baixo; a pegada vai de 60° a 30° de supinação a partir da neutra (palma do estribo para a frente no alongado, palmas uma para a outra no fim).
- **A escápula:** a clavícula fica 6° mais para trás que o ritmo normal do ombro a série toda ("ombros para trás").
- **As colunas:** duas torres da tabela de objetos, uma de cada lado, com a roldana na altura do centro do ombro (calculada do corpo, no alongado), 96 cm para o lado e 45 cm atrás do meio da pelve. Cada mão segura o estribo da coluna do seu lado; cada cabo (`cabo`, `cabo2`) vai reto do elo do estribo à roldana; cada pilha sobe o curso do seu cabo dividido por 2, mais 2 cm de "cabo tenso" no alongado. As torres entram como cenário (cortadas em cima pelo quadro).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica e o texto do app pedem | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Os dois carros na altura do ombro, com estribos | consenso | o centro das duas roldanas a 0 cm da altura do centro do ombro (136,3 cm) | sim |
| 1–2 passos à frente da linha das torres, cabo tenso com os braços abertos | consenso | roldanas 45 cm atrás do meio da pelve; o pé da frente a ~85 cm da linha das torres; no alongado o cabo tem 34,7 cm e a pilha já sai 2 cm | sim |
| Um pé à frente do outro, joelhos levemente dobrados | consenso | pés a 48 cm um do outro (bola a bola); joelho da frente 12°, o de trás 50° (calcanhar levantado 25°) | sim |
| Tronco levemente inclinado à frente, peito alto | consenso | peito a 12° da vertical, parado (a base do pescoço anda 0 cm) | sim |
| Ombros para trás | consenso | a clavícula fica 6° mais para trás que o ritmo normal, o ciclo todo | sim |
| Cotovelos levemente dobrados, o mesmo ângulo a série toda | consenso | 20,0° em todos os quadros | sim |
| Alongado: mãos na linha do corpo ou um pouco atrás | consenso | o centro da mão fica 5,5 cm atrás da linha do ombro (no tórax), 5,3 cm abaixo do ombro | sim |
| Fechamento ~1–1,5 s, em arco; mãos se encontram | consenso | 1,3 s; os centros das mãos terminam a 9 cm um do outro, 61 cm à frente de C7 | sim |
| Fim: na frente da parte de baixo do peito | consenso | o centro da mão 21,1 cm abaixo de C7 medido no tórax (parte de baixo do peito: de 18,3 a 39,5 cm); 23,4 cm abaixo do ombro na vertical | sim |
| Abertura ~2–3 s | consenso | 2,5 s, pelo mesmo arco | sim |
| Cabo reto, sem atravessar o corpo | consenso | os dois cabos passam a no mínimo 3,0 cm da pele (o mais perto: o antebraço, perto do fim) | sim |
| Cabos e pilhas | medida | cada cabo anda 96 cm e a sua pilha sobe 48 cm (2:1) | sim |
| Equilíbrio | mecânica | o centro de massa anda de −9,5 a −6,1 cm (z), entre os dois pés, sempre dentro do apoio | sim |

Conferência automática: **0 falha**. Avisos: (1) as linhas que são escolha de desenho (pés, calcanhar de trás, onde cai o peso, pescoço, cabeça, abertura das colunas, altura da mão no alongado, supinação da pegada); (2) músculos: de cima o peitoral não aparece (0 cm²), por isso a vista padrão do modo Músculos é a de frente (499 cm²). Ritmo: salto de 4,5% (limite 15%).

## As vistas

A primeira é a **de cima**, como pede a correção de 05/11 (`correcoes-ja-feitas.md`: os crucifixos abrem de cima, que mostra o arco das mãos e o cotovelo fixo). A segunda é a **de frente** (a de hoje), que mostra as duas colunas, a altura dos carros e é a padrão do modo Músculos. Testei a de três quartos (`quina`): a coluna da frente cobre o corpo.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Transformar em supino (de cima, no alongado) | o cotovelo dobra 95° e a mão vem para o lado do peito (30 cm à frente da linha do ombro); ao fechar o cotovelo estica até os 20° do certo |
| Abrir demais (de cima, no alongado) | a mão vai 33 cm atrás da linha do ombro (certo: 5,5 cm) e a clavícula vai 12° para a frente (o ombro rola: retração de 18° contra 36° no certo) |
| Usar o tronco (de lado, no fim) | o peito vai de 12° a 32° da vertical e as costas de cima arredondam 18°; a pelve fica parada |

## Correções já feitas que esta animação respeita

- Abre na vista de cima (05/11, Proposta 3 do R4).
- Músculos da revisão de anatomia: peitoral principal, frente do ombro secundária.

## O que não ficou bom

- **De lado, no erro "Usar o tronco", o cabo da direita passa na frente do tronco** (quadro `lateral:err:f1:tronco`). Não encosta (fica entre quem olha e o corpo: a coluna da direita está do lado de quem olha), e as colunas, como cenário, não aparecem de perfil, então o cabo parece ir para o nada. É o mesmo do "balançar o tronco" da elevação lateral aprovada. Tentei a vista de três quartos para esse erro: a coluna fica na frente do corpo e ficou pior.
- **O cabo corre perto do antebraço no fim do fechamento** (3 cm). É o que acontece no crossover de verdade; para chegar a isso, o cotovelo aponta um pouco para baixo (com ele para cima, o cabo encostava no antebraço).


## Correção de 19/11 (cabeça de cima; auditoria das aprovadas antigas)

O Gustavo autorizou em 19/11 corrigir as aprovadas antigas com o defeito achado nas auditorias das fases A e B: de cima, a cabeça fica dentro da silhueta dos ombros, e o contorno único do Boneco (um só, por fora) não a desenhava; sobrava o calombo do rosto. A vista de cima é uma das duas do exercício (`vistas`).

**A mudança.** O quadro liga, só na vista de cima (`viesNaVista: { cima: { cabeca: 1 } }`), a opção `cabeca` do Boneco (acréscimo de 18/11, desligada por padrão; a mesma das elevações corrigidas e do quadril na máquina): a cabeça é pintada de novo por cima do corpo, com o contorno próprio. A pose, o movimento, as peças, os rótulos e as outras vistas não mudam; o núcleo comum, quando há, também não (o exercício embrulha o quadro dele). A ficha liga a regra comum `cabeca-aparece-em-cada-vista` (`src/engine/novo/regras/vistas-do-guia.ts`).

| vista de cima | antes (`72d00fc`) | depois |
|---|---|---|
| quadros em que a cabeça sumiria / com contorno próprio | 11 / **0** | 11 / 11 |
| eixo do tórax e quem olha (mínimo); contorno da cabeça dentro da silhueta (máximo); a cabeça à frente do tronco (máximo) | 12,0°; 56,3%; 13,6 cm | iguais (a pose não mudou) |

No estado de antes, com a regra na ficha, a conferência dá 1 falha (esta regra). No estado novo: 0 falhas e os mesmos avisos de antes. O antes e depois está em `correcao-das-antigas/crucifixo-polia.png`; os quadros grandes foram regravados (`quadros/crucifixo-polia.png`).
