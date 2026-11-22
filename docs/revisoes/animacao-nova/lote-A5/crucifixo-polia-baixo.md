# Lote A5 · Crucifixo na polia de baixo para cima (`crucifixo-polia-baixo`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé no meio das duas torres da polia dupla, com as duas polias embaixo, um pé à frente, tronco reto; os braços, com o cotovelo levemente dobrado e fixo, sobem em arco de baixo e um pouco atrás (ao lado do quadril) até as mãos se encontrarem à frente, na altura do peito. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-polia-baixo.md`. Cartão do app: `src/conteudo/exercicios/crucifixo-polia-baixo.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-polia-baixo.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-polia-baixo.ts`, sobre o núcleo da polia aprovado (`exercicios/polia-bracos.ts`: o corpo em pé parado, o braço em arco no tórax, as colunas e os cabos), no molde do crucifixo na polia aprovado (`crucifixo-polia.ts`). Regras medidas: `src/engine/novo/regras/crucifixo-polia-baixo.ts`, as do núcleo da polia (`regras/polia-bracos.ts`) e a do tronco parado (`conferir.ts`).
- Quadros grandes: `../quadros/crucifixo-polia-baixo.png`. **Sem folha** ao lado da animação de hoje.

## Onde os números saem

A ficha da técnica diz que a técnica segue, por analogia, o crucifixo na polia. Dele vêm a máquina (roldanas a 96 cm do meio), os pés (um à frente, 22 cm à frente e 26 cm atrás do meio, o calcanhar de trás um pouco erguido), o joelho destravado (12°), o cotovelo fixo a 20°, o fim do arco (os centros das mãos a 9 cm) e a folga da pilha. As polias ficam embaixo (22 cm, a polia baixa dos exercícios aprovados). O que é deste exercício: o começo do arco (a linha do ombro à mão 100° da frente, 62° abaixo do plano do tórax: "braços ao lado do corpo, um pouco atrás", "abertos e baixos"), o fim na altura do peito (2° acima do plano do tórax), o tronco reto (4°) e as roldanas 30 cm atrás da pelve (escolha de desenho: a pessoa um pouco à frente da linha das torres). O fim do arco não é um ângulo escolhido: é o giro em que as mãos se encontram (`resolver1`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| As duas polias embaixo, um estribo em cada | consenso | o centro de cada roldana a 22 cm do chão; cada mão segura o estribo da coluna do seu lado | sim |
| Em pé no meio das torres, um pé à frente, tronco reto | consenso | as roldanas a 96 cm do meio, uma de cada lado; o pé direito à frente; o peito a 4° da vertical e parado (a base do pescoço anda 0 cm); os pés não saem do lugar (0 cm) e o centro de massa fica sempre dentro do apoio | sim |
| Início: braços ao lado do corpo, um pouco atrás, abertos e baixos, cotovelos levemente dobrados | consenso | o centro da mão 5 cm atrás da linha do ombro, 25 cm abaixo da altura da cintura e 39 cm para fora do quadril; o cotovelo a 20° | sim |
| Leva as mãos para a frente e para cima, até se encontrarem na altura do peito ou do queixo | consenso | no fim, os centros das mãos a 9 cm um do outro, 7,5 cm abaixo de C7 no tórax (do queixo à linha do peito: de 0 a 22 cm) e 62 cm à frente | sim |
| Cotovelo no mesmo ângulo (dica do app) | consenso | o cotovelo fica de 20° a 20° no ciclo | sim |
| Cada cabo reto da roldana à mão; a pilha sobe o curso dividido pela relação | consenso | os cabos passam a no mínimo 6,9 cm da pele; o cabo anda 95,9 cm e cada pilha sobe 47,9 cm (2:1) | sim |
| Volta em ~2 s abrindo os braços até sentir o peito alongar | consenso | 2,2 s; ritmo suave (salto de 6% da velocidade de pico); o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho. (2) O modo Músculos abre de frente (peito: 496 cm²); de cima, o peito quase não aparece (57 cm²). O desenho não separa a parte de cima do peito (a clavicular), que é o alvo do cartão: o peitoral inteiro fica em vermelho, a frente do ombro em laranja.

## As vistas

Medido e olhado: **de frente** (a vista que o app abre no modo Técnica, como no crucifixo na polia aprovado do motor novo, e padrão do modo Músculos) e **de cima**.

O pedido lembrava que os crucifixos na polia abrem de cima (decisão do Gustavo de 05/11/2026, no guia antigo). Olhei as duas e fiquei com a de frente para abrir: neste crucifixo o arco é **de baixo para cima**, e de cima a subida das mãos (do lado do quadril até o peito) não aparece, só a ida para a frente. De frente se lê de relance o arco, as duas polias embaixo e os cabos subindo; é também a vista que o crucifixo na polia aprovado no motor novo abre (`vistas: ['frontal', 'cima']`). De cima fica como segunda vista, para o arco visto de cima e o cotovelo fixo. Se o Gustavo preferir manter a regra "crucifixo abre de cima", basta inverter a ordem das vistas.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Dobrar e esticar os cotovelos | de lado | embaixo, o cotovelo dobra 95° (o certo: 20°) e a mão vem para a frente do quadril, 17 cm mais alta e 16 cm mais à frente; ao subir, o cotovelo estica até os 20° do certo, como num empurrar |
| Balançar o tronco | de lado | o peito inclina 18° à frente embaixo (pega embalo) e joga para 12° atrás da vertical em cima, com a lombar arqueada 12° (o certo fica a 4° o tempo todo) |
| Encolher os ombros | de frente | em cima, a clavícula sobe 22° além do ritmo normal: a ponta do ombro sobe 5,1 cm, para as orelhas |

Os três erros são de pose; nenhum é só ritmo, então todos estão desenhados.

## O equipamento

- **Colunas:** as da tabela, como cenário (pintadas atrás do corpo, cortadas pela borda); de lado não aparecem (os cabos vão para trás e para baixo), como no erro do tronco do crucifixo na polia aprovado.
- **Estribos:** os da tabela.

## Correções já feitas que esta animação respeita

Do crucifixo na polia: o cotovelo "levemente dobrado e fixo" (20° o ciclo todo) e as colunas como cenário para o corpo ocupar o quadro. Da polia em geral: a polia baixa a 22 cm (04/11). Ver a nota sobre a vista de cima, acima.

## O que não ficou bom

- **A pilha sobe 48 cm** no ciclo (o cabo anda 96 cm: das mãos ao lado do quadril até o peito, com as polias embaixo). É a conta certa da relação 2:1, mas é muito mais que nos outros exercícios na polia; numa coluna de 2,39 m ela cabe.
- **No erro de encolher os ombros,** de frente, a diferença (5 cm) se lê, mas a mancha vermelha é pequena (só o ombro e o braço de perto ficam em vermelho).
- **De frente, no fim**, os braços vêm para a frente e ficam encurtados pela perspectiva (as mãos se encontram na frente do peito), como no crucifixo na polia aprovado.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (G7) achou que, de lado, os cabos terminam no ar: a saída de cada cabo fica a 24 a 26 cm do chão e a 85 cm da borda do quadro, sem coluna nenhuma. As duas colunas eram cenário, e `equipamento.ts` não desenha coluna de cenário de perfil. A animação saiu da aprovação até a correção.

**A mudança.**

1. **Peça comum, acréscimo:** a coluna (`{ t: 'torre' }` em `pecas.ts`) ganhou o campo opcional `deLado` (desligado por padrão). A coluna de cenário com `deLado`, vista de perfil, é desenhada como equipamento: na ordem certa de pintura (ela fica atrás do corpo) e, com `cortadaEmCima`, no enquadramento até essa altura, para os textos não ficarem por cima dela. Nas outras vistas continua cenário. `equipamento.ts` passou a perguntar a `torreNaVista` (exportada) se a coluna aparece; para quem não usa o campo, a resposta é a mesma de antes.
2. **No exercício:** a coluna de longe (a esquerda; de lado, quem olha está à direita da pessoa) leva `deLado` e `cortadaEmCima` = `coluna.deLado.noQuadro` (100 cm, linha nova da ficha, selo desenho). De lado, as duas roldanas caem no mesmo ponto da tela: os dois cabos terminam na roldana dela, atrás do corpo. A coluna de perto continua de fora de perfil (ficaria na frente do corpo e o esconderia).
3. De frente nada muda (o quadro e o enquadramento de frente são os mesmos; o preparo só mudou na vista de lado: o quadro anda 7 cm para a esquerda, do mesmo tamanho).

**A regra nova** (`crucifixo-baixo-cabos-terminam-na-roldana`, em `regras/crucifixo-polia-baixo.ts`): em cada vista do guia (frente e lado, as do exercício e as dos erros), no ciclo (5 instantes) e em cada erro na vista dele (começo, meio e fim), conta as colunas que aparecem naquela vista e mede, na tela, a distância da saída de cada um dos dois cabos (o direito e o esquerdo) ao centro da roldana mais perto, que tem de ficar até o raio dela (o cabo sai na borda) com meio centímetro de folga.

| | antes (`1828c0e`) | depois |
|---|---|---|
| de lado: colunas que aparecem | **0** (os cabos terminam no ar, a até 25,6 cm do chão) | 1 (a de longe) |
| de lado: saída de cada cabo ao centro da roldana, na tela | sem roldana | até 3,6 cm (raio 5,5) |
| de frente: colunas; saída ao centro da roldana | 2; 5,5 cm | 2; 5,5 cm |

Rodada no estado de antes (o exercício de `1828c0e`, com a regra nova), a conferência dá **1 falha** (esta regra). No estado novo: **0 falhas**, os mesmos avisos de antes (a lista dos provisórios ganhou `coluna.deLado.noQuadro`).

**Olhado nos quadros** (`quadros/crucifixo-polia-baixo.png`): de lado, no começo, no meio e no fim, nos erros "Dobrar e esticar os cotovelos" e "Balançar o tronco", no tema escuro e no cor de pele, a coluna fica atrás da pessoa, com a pilha, e os cabos descem da mão à roldana embaixo dela. O cabo de perto passa na frente da perna de perto (está mais perto de quem olha); o de longe some atrás do corpo. De frente, igual a antes.

**O que ainda não ficou bom.** Com a coluna no quadro, o nome do erro "Dobrar e esticar os cotovelos" passou para o lado direito do corpo (do lado esquerdo não cabe mais entre a coluna e a borda), e a linha dele atravessa o peito até o cotovelo, que fica atrás do tronco. A coluna de perto não aparece de lado: é um recorte de desenho (ela estaria entre quem olha e a pessoa), dito aqui para não parecer que há uma coluna só.
