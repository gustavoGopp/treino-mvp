# Lote A5 · Tríceps na polia com barra reta (`triceps-barra-reta`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de frente para a torre, a meio passo; polia no alto, a barra reta curta da polia nas duas mãos, por cima, na largura dos ombros; o tronco 15° à frente. Os cotovelos ficam parados ao lado das costelas e só os antebraços descem até os braços ficarem retos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-barra-reta.md`. Cartão do app: `src/conteudo/exercicios/triceps-barra-reta.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-barra-reta.json`.
- Animação: `src/engine/novo/exercicios/triceps-barra-reta.ts` (o corpo como no tríceps na corda aprovado; a coluna e o cabo de `polia-bracos.ts`; a barra de `pecas-de-cena/polia-braco-barra-reta.ts`, a mesma da rosca na polia). Regra nova: `src/engine/novo/regras/uma-torre.ts` (`triceps-barra-antebraco-acima-da-horizontal`).
- Quadros grandes: `../quadros/triceps-barra-reta.png`. Sem folha: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá número. As distâncias saíram do tríceps na corda aprovado (`triceps-corda.json`: pés, joelhos destravados, peito a 15°, pescoço, braço ao lado das costelas, cabo a 20° da vertical em cima e o erro do tronco), cada linha com a fonte `corda`. Dois números saem do texto: em cima, "os antebraços passam um pouco da horizontal" (o cotovelo dobra 105°, o antebraço fica 15° acima da horizontal); embaixo, "braços retos" (o cotovelo estende até 4°, ou até onde a barra passa a 1,5 cm das coxas: a conta dá 5,7°). A largura da pegada segue a correção de 04/11 da rosca na polia (a barra reta tem largura fixa: mãos a 36–38 cm).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polia no alto, com a barra reta | consenso | a roldana no ponto mais alto da coluna (193 cm), 69 cm à frente do meio da pelve; o cabo sai da ponta do mosquetão a 15° da vertical em cima e 23° embaixo | sim |
| Em pé de frente para a torre, tronco um pouco inclinado | consenso | o peito 15° à frente da vertical, parado (0° de variação; a lombar e a torácica não mudam) | sim |
| Cotovelos junto ao corpo | consenso | a pele do braço a 0,2 cm da pele do tronco; o braço 15° à frente da linha do tronco (na vertical) | sim |
| Mãos na barra na largura dos ombros | consenso | os centros das mãos a 36,8 cm, o ciclo todo (a distância entre os centros dos ombros); cada mão no eixo da barra (0 cm) | sim |
| Pegada por cima (a barra reta) | consenso | o polegar para dentro, ao longo da barra (100%); a pronação do antebraço fica em 90° (aviso: acima da média de 80°, abaixo do máximo de 108°) | sim |
| Estende os cotovelos com os cotovelos parados | consenso | o cotovelo anda 0 cm (no mundo e no tronco) enquanto vai de 105° a 5,7° | sim |
| Embaixo, os braços retos | consenso | o cotovelo dobra 5,7° (a barra passa a 3,2 cm da pele das coxas) | sim |
| Volta (~2 s) até os antebraços passarem um pouco da horizontal | consenso | 2 s; em cima, o antebraço 15° acima da horizontal | sim |
| O cabo reto da roldana à barra; a pilha sobe | desenho | o cabo passa a no mínimo 6 cm da pele; anda 50,3 cm e a pilha sobe 25,1 cm (a relação 2:1) | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) A pronação do antebraço em 90° (é a pegada por cima numa barra reta; dentro do máximo observado). (2) As linhas da ficha de movimento que são escolha de desenho (`pe.z`, `pelve.z`, `cervical`, `cabeca`, `braco.paraDentro`, `barra.folga`, `cabo.inclinacao`, `pilha.folga`; as seis primeiras vêm do tríceps na corda). (3) O modo Músculos abre de trás (tríceps: 218 cm²); de lado, ele aparece pouco (56 cm²), como no tríceps na corda.

## As vistas

As mesmas do tríceps na corda aprovado: **de lado** (padrão: o cotovelo parado, o antebraço que desce, o tronco, o cabo e a pilha) e **de trás** (os cotovelos colados; é a vista do erro de abrir os cotovelos e a padrão do modo Músculos). De trás, a barra fica escondida pelo corpo (só as pontas aparecem embaixo). De três quartos de frente, a barra aparece inteira, mas o corpo fica menor e o erro dos cotovelos se lê pior.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir os cotovelos | de trás, em cima | as mãos seguem na barra, no mesmo lugar; o cotovelo gira para fora: o braço abre 39° para o lado e vai 26° à frente (o certo: 0° e 15°), e o cotovelo anda 20 cm |
| Usar o tronco | de lado, embaixo | o peito vai de 15° a 34° à frente enquanto a barra desce, com a torácica 8° arredondada (como no tríceps na corda) |
| Volta curta | de lado, em cima | em cima, o cotovelo dobra só 55° (o certo: 105°): o antebraço para bem abaixo da horizontal |

Nenhum erro ficou sem desenho.

## O equipamento

- **Coluna de polia:** a da tabela de objetos, cortada em cima a 208 cm (a roldana e o carrinho aparecem; o corpo fica maior no quadro).
- **Barra reta:** a de 20 pol da Rogue (`dados/objetos/polia-braco-barra-reta.json`, a mesma da rosca na polia, que é o acessório "barra reta para polia" da taxonomia). A altura da aba e o mosquetão seguem provisórios (sem ficha).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Vale a da rosca na polia (04/11): a barra reta não "encolhe"; as mãos ficam a 36,8 cm o ciclo todo.

## O que não ficou bom

- **O rótulo "estende até o fim"** (no punho) tem o fio cruzando o antebraço no quadro de cima, porque o lado da torre não tem espaço e os dois textos ficam à esquerda; o mesmo acontece no "só o antebraço se mexe" da rosca na polia aprovada. Tentei pôr o texto acima do corpo: o quadro abria até mostrar a coluna inteira e o fio cruzava a cabeça.
- **De trás, a barra não aparece** no quadro de cima (fica atrás do corpo). O erro de abrir os cotovelos se lê pelos braços.
- **A força do cabo não entra no equilíbrio**, como em todas as animações na polia.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (M6) achou que, no erro "Usar o tronco", de lado, o cabo atravessa a cabeça (7,8 cm) e o tronco (3,7 cm). A animação saiu da aprovação até a correção.

**A causa.** O erro debruçava o tronco até 34° com o quadril parado: a cabeça e o peito iam à frente, para dentro da linha do cabo, que continua reto da barra à roldana, no alto e à frente.

**A mudança** (só no erro, dentro do que a ficha diz: "o tronco debruça sobre a barra enquanto as mãos descem"):

1. O tronco debruça até 30° (era 34°; `erro.tronco.inclinacao`).
2. Linha nova da ficha, `erro.tronco.quadrilAtras` (14 cm, selo desenho): ao debruçar, o quadril vai para trás (os pés parados), como quem se apoia na barra; a cabeça e o peito ficam atrás do cabo.

**A regra nova** (comum, `cabos-fora-do-corpo-nos-erros`, em `regras/vistas-do-guia.ts`, ligada só nas fichas do tríceps com barra reta, da puxada com barra reta e da rosca de costas): em cada erro, em 6 instantes (0, 1/4, 1/2, 3/4, 1 e o instante do erro), cada cabo e cada fita do engate (os fios do quadro, fora os riscos da pilha), de meio em meio centímetro, contra o corpo inteiro (os dois lados): quanto entram em cada parte, medido na elipse do anel do Boneco interpolado ali. Não podem entrar mais de 0,5 cm. Ficam de fora as mãos que seguram e, delas, o antebraço a até 8 cm do punho, como na regra do cabo no ciclo (`polia-braco-cabos-livres-do-corpo`, que só olha o ciclo certo).

| | antes (`1828c0e`) | depois |
|---|---|---|
| "Usar o tronco": quanto o cabo entra no corpo (pior instante) | **8,8 cm (cabeça)** | passa a 0,6 cm do peito |
| "Abrir os cotovelos" e "Volta curta" | passa a 2,6 cm da cabeça | igual |
| o tronco no fim do erro | 34° da vertical, quadril parado | 30°, quadril 14 cm para trás (o certo: 15°) |

(A auditoria mediu 7,8 cm em u = 1; a regra mede seis instantes e acha 8,8 cm. A diferença é a amostragem.)

Rodada no estado de antes (o exercício e a ficha de `1828c0e`, com a regra nova), a conferência dá **1 falha** (esta regra). No estado novo: **0 falhas**, os mesmos avisos de antes.

**Olhado nos quadros** (`quadros/triceps-barra-reta.png`): no erro, de lado, o tronco vermelho debruça sobre a barra com o quadril para trás, e o cabo sobe da barra rente ao peito e à frente do rosto, sem cruzá-los; o tronco certo, tracejado, fica bem mais em pé. Os outros dois erros, de trás e de lado, e o ciclo não mudaram.

**O que ainda não ficou bom.** O cabo passa a 0,6 cm do peito no fim do erro: é o que a geometria deixa (a barra desce rente às coxas e o cabo sobe dela quase junto ao corpo). O debruçar é um pouco menor que antes (30° contra 34°), compensado pelo quadril para trás.

## Correção de 20/11 (fio ou peso dentro do corpo)

A conferência dos pesos (`conferir-pintura.ts`, tolerância de 1 cm) acusava **a barra 7,1 cm dentro das duas coxas** no fim do erro "Usar o tronco" (u = 1). Esse erro tinha sido mudado em 19/11 para o cabo não atravessar a cabeça: o tronco debruça 30° e o quadril vai 14 cm para trás.

**A causa, medida.** Os braços ficam presos ao tronco (o cotovelo junto das costelas); com o tronco 30° à frente e o quadril para trás, eles vão junto, e com o cotovelo do movimento certo embaixo (5,7°, estendido) as mãos ficavam 21 cm atrás de onde ficam no certo, dentro das coxas (agora, 12 cm atrás, à frente delas).

**A mudança.** Nesse erro, embaixo, o cotovelo dobra o que a barra precisa para passar à mesma folga das coxas que no movimento certo (`barra.folga`, 1,5 cm): 21,3°, calibrado e guardado no preparo (`triceps-barra-reta:tronco-embaixo`). Daí para cima ele dobra como antes, até os 105° do começo. É o que o cartão descreve ("debruçar sobre a barra para descer a carga"): quem debruça não termina de estender os cotovelos. O tronco (30°), o quadril (14 cm para trás), o começo do erro, o ciclo e os outros dois erros não mudam. A amplitude do erro não diminuiu.

| medido (homem) | antes | depois |
|---|---|---|
| a barra dentro das coxas (conferência dos pesos; erro "Usar o tronco", u = 1) | 7,1 cm (as duas coxas) | 0 (nada além da tolerância) |
| cotovelo embaixo, no erro | 5,7° | 21,3° |
| o cabo até a pele, regra `cabos-fora-do-corpo-nos-erros`, nesse erro | 0,6 cm (o tronco) | 4,5 cm (a cabeça) |
| pintura: achados e área somada | 3, 3,5 cm² | 2, 5,0 cm² |

**As regras.** A ficha já liga `cabos-fora-do-corpo-nos-erros`, e ela passava antes e passa agora: ela mede o cabo, e o que entrava era a barra. A regra `peso-fora-do-corpo` não foi ligada: ela só conta a barra quando o quadro tem carga (`cargas`), e na polia a carga é a pilha, que não entra no equilíbrio do corpo; ligada, ela passaria no estado de antes e no de agora sem ver a barra. Quem mede a barra aqui é a conferência dos pesos (na pintura), que falhava antes e passa agora.

**A pintura.** De trás, no fim desse erro, antes a barra inteira era pintada por cima das coxas (ela estava dentro delas, e a conferência conta isso como contato, por isso só 3,5 cm²); agora ela fica atrás das coxas e só o meio dela (a aba e o mosquetão) aparece no vão entre elas, como deve, mas a borda da aba é pintada por cima da beira de dentro das coxas: 3 cm² na direita e 2 cm² na esquerda (antes 1,5 e 1; o da bacia, 1 cm², sumiu). No desenho, a barra atravessando as coxas de trás sumiu (ver `../correcao-das-antigas/triceps-barra-reta-fio-ou-peso.png`).

Os quadros grandes foram regravados, com o erro também de trás (`posterior:err:f1:tronco`), e olhados nas duas vistas, nos dois lados do corpo. A conferência automática dá **1 falha e 3 avisos** (antes: 2 falhas, a de pesos e a de pintura, e 3 avisos).

**O que ainda não ficou bom.**
- A área da pintura errada de trás, nesse erro, cresceu 1,5 cm² (a aba no vão entre as coxas, ver acima). Não mexi na ordem de pintura da barra, que é a mesma da rosca na polia aprovada.
- No fim do erro, o cotovelo fica dobrado 21° (no certo, 6°): lê-se como "não estendeu", junto do tronco debruçado; não é algo que o cartão descreva em número.
