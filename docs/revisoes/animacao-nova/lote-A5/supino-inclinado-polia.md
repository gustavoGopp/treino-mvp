# Lote A5 · Supino inclinado na polia, com o banco entre as torres (`supino-inclinado-polia`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no banco regulável a 30°, no meio das duas torres da polia dupla, com as polias embaixo e um estribo em cada mão: as mãos saem do lado do peito e sobem até quase estender os cotovelos, um pouco para dentro; os cabos sobem do chão até as mãos, por fora do banco. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/supino-inclinado-polia.md`. Cartão do app: `src/conteudo/exercicios/supino-inclinado-polia.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-inclinado-polia.json`.
- Animação: `src/engine/novo/exercicios/supino-inclinado-polia.ts`, sobre o núcleo dos supinos na polia com o banco entre as torres (`exercicios/polia-banco.ts`, do mesmo lote). Regras medidas: `src/engine/novo/regras/polia-banco.ts`, as do núcleo da polia (`regras/polia-bracos.ts`) e as do supino inclinado aprovado para o encosto e o apoio (`regras/supino-inclinado.ts`).
- Quadros grandes: `../quadros/supino-inclinado-polia.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica diz que a técnica segue, por analogia, o supino inclinado com halteres. O corpo sentado é o do supino inclinado aprovado: o mesmo banco regulável a 30° e a mesma calibração do assento (a bacia no assento, o sacro, as costas e a nuca no encosto), chamada da função `sentar` que já era exportada de `supino-inclinado.ts` (nada mudou lá; o preparo dele continua igual). O braço embaixo também é o de lá (45° do tronco no plano das costas, 12° abaixo dele, antebraço na vertical, pegada girada 25°). A máquina é a do crucifixo na polia aprovado (roldanas a 96 cm do meio) com as polias embaixo (22 cm). O cartão aceita de 30° a 45°: fiquei com 30°, o ângulo do supino inclinado aprovado.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco inclinado a ~30–45° no meio das duas torres | consenso | o encosto a 30° do chão; o meio do banco a 0 cm do meio das duas roldanas; os dois cabos com o mesmo comprimento o ciclo todo (diferença 0 cm) | sim |
| Polias embaixo, um estribo em cada polia | consenso | o centro de cada roldana a 22 cm do chão, a 96 cm do meio; cada mão segura um estribo | sim |
| Os cabos sobem do chão até as mãos, por fora do banco (pedido desta tarefa) | consenso | abaixo do alto do encosto, os cabos passam no mínimo 9,4 cm por fora da largura do banco (a base, 63 cm); cada cabo é reto e passa a no mínimo 0,8 cm da pele (o antebraço, embaixo) | sim, com folga pequena no antebraço |
| A pilha sobe o curso do cabo dividido pela relação da máquina | consenso | o cabo anda 51,6 cm e cada pilha sobe 25,8 cm (2:1); embaixo, a pilha já sai 2 cm | sim |
| Sentado, costas e escápulas no encosto, pés no chão | consenso | costas e glúteo amassam o estofado 1 cm, a nuca 0,7 cm, o ciclo todo; a clavícula 9° para trás e 4° para baixo; os pés e a pelve não saem do lugar (0 cm) | sim |
| Início: mãos na altura do peito, cotovelos a ~30–60° do tronco | consenso | o braço a 45° do tronco (no plano das costas), o antebraço na vertical (0°), a mão 5 cm abaixo da linha dos ombros, ao longo do tronco, e 24 cm à frente do centro do ombro | sim |
| Empurra para cima e um pouco para dentro, até quase estender os cotovelos | consenso | no topo, o cotovelo dobra 14°, as mãos ficam 8 cm para dentro dos ombros e na vertical deles, de lado (0 cm) | sim |
| Volta em ~2 s até um alongamento confortável do peito | consenso | 2,2 s; ritmo suave (salto de 5,1% da velocidade de pico); o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (os pés, o braço embaixo e a pegada do supino inclinado aprovado, a distância das roldanas, a folga da pilha). (2) O modo Músculos abre de cima (peito: 455 cm²); de três quartos, o peito aparece pouco (103 cm²). O desenho não separa a parte de cima do peito (a clavicular), que é o alvo do cartão: o peitoral inteiro fica em vermelho, como no supino inclinado aprovado.

## As vistas

Medido e olhado: **de três quartos, pela frente** (`quina`, a vista que o app abre no modo Técnica, a mesma do crucifixo inclinado aprovado) e **de cima** (padrão do modo Músculos, 455 cm²; mostra os cotovelos a 45° e o banco no meio).

- **De lado** (a vista do supino inclinado aprovado) não serve: o cabo de perto aparece como uma linha vertical que desce da mão e atravessa o banco no desenho.
- **De frente** mostrava bem as torres e os cabos, mas no estilo com cor de pele o encosto é pintado por cima do tronco (acontece também no supino inclinado aprovado visto de frente, que não usa essa vista). Não mexi no pintor (arquivo comum); fica registrado.
- **De três quartos por trás**, o encosto tapa o corpo.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Banco fora do meio | de cima | o banco e a pessoa ficam 22 cm para a esquerda do meio das torres. Embaixo, o cabo da direita fica com 95,1 cm e o da esquerda com 65,0 cm (o certo: 78,5 e 78,5); a pilha da direita sobe 10 cm e a da esquerda fica no repouso; no topo, as pilhas ficam a 35 e 21 cm (o certo: 28 e 28) |
| Tirar as costas do encosto | de três quartos | enquanto a carga sobe, a lombar arqueia 18° e as costas de cima estendem 8°, e a pelve (parada no assento) gira 24° à frente: no topo, o meio das costas sai 9–10 cm do encosto, a nuca 10 cm, e a linha do quadril ao ombro fica 11° mais em pé (de 22° para 33°); o glúteo fica no assento (0 cm) |
| Soltar a volta | não desenhado | é erro de ritmo: o cartão só diz "deixar a placa puxar o braço de uma vez perde a parte alongada", sem nada visível na pose. Fica fora da ficha; quem integra põe na lista `SEM_DESENHO` do teste da ponte |

No erro das costas, a primeira tentativa (a pelve girando 34°) deixava a pessoa quase sentada reta, com a cabeça 24 cm fora do encosto: exagerado. Baixei para 24°. No erro do banco, do lado de perto da torre o cabo embaixo fica mais curto que o repouso: na vida real ele afrouxa; no desenho continua reto e a pilha fica no repouso.

## O equipamento

- **Colunas:** as da tabela, como cenário (pintadas atrás do corpo, cortadas pela borda).
- **Estribos:** os da tabela.
- **Banco regulável:** o do supino inclinado aprovado (30°, com a marca do ângulo).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Da polia, vale a polia baixa a 22 cm e o corpo grande no quadro (colunas como cenário). Do supino inclinado, o corpo apoiado no encosto pela calibração aprovada.

## O que não ficou bom

- **A vista que abre é de três quartos, não de lado como no supino inclinado aprovado** (ver "As vistas").
- **De três quartos, a coluna de perto ocupa a esquerda do quadro** (atrás do corpo) e **o rótulo "sobe e fecha um pouco" encosta na borda dela** em cima: entre as duas colunas sobra pouco espaço para o texto. Tentei ancorar na mão esquerda e na direita, com e sem "acima"; nas duas o texto toca uma das colunas (cenário, com o contorno claro do texto por cima).
- **O cabo passa a 0,8 cm da pele do antebraço** embaixo: não encosta (a regra pede 0,5 cm), mas fica rente.
- **No erro do banco fora do meio**, o cabo do lado de perto continua reto embaixo, quando na vida real afrouxaria.
- O encosto pintado por cima do tronco **de frente, no estilo com cor de pele**, é do pintor comum (também no aprovado); esta animação não usa a vista de frente.

## Correção de 20/11 (fio ou peso dentro do corpo)

A conferência dos fios (`conferir-pintura.ts`, tolerância de 1 cm) acusava **o cabo e a fita do estribo 1,7 cm dentro do antebraço esquerdo** no erro "Banco fora do meio", no topo (u = 1).

**A causa, medida.** No erro, o banco e o corpo vão 22 cm para a esquerda: a roldana da esquerda fica a 65 cm da mão na horizontal (no certo, 87 cm), e o cabo sobe mais em pé, a uns 34° da vertical, rente ao antebraço esquerdo, que no topo desce do punho para fora a 14° da vertical. O estribo só gira em volta da pegada: com as palmas a 25° uma para a outra, o elo fica quase embaixo da mão, junto do punho, e dali a fita e o cabo atravessavam o antebraço de 6,5 a 13 cm do punho. Diminuir o desvio não resolvia: com o banco 12 cm fora do meio, o cabo ainda entrava 1,2 cm. Endireitar o antebraço esquerdo (sem os 14° para dentro) também resolvia, mas deixava a mão 6,5 cm mais para fora; fiquei com o giro da pegada, que muda menos.

**A mudança.** No erro, a mão do lado da torre mais perto (a esquerda) gira o estribo para o lado do cabo: as palmas a 50° (`erro.banco.giro`; no certo e na mão direita, 25°). O elo sai do lado do antebraço e o cabo passa por fora dele. O banco continua 22 cm fora do meio (o erro não diminuiu); o resto do corpo, o ciclo e o outro erro não mudam.

| medido (homem) | antes | depois |
|---|---|---|
| o cabo e a fita do estribo dentro do antebraço esquerdo, conferência dos fios (erro "Banco fora do meio", u = 1) | 1,7 cm | 0 (nada além da tolerância) |
| regra `cabos-fora-do-corpo-nos-erros`, erro "Banco fora do meio" | entra 1,7 cm (o cabo, no antebraço esquerdo) | passa a no mínimo 0,1 cm da pele |
| a mesma regra, erro "Tirar as costas do encosto" | entra 0,4 cm | entra 0,4 cm |
| pintura: achados e área somada | 10, 76,8 cm² | 9, 75,3 cm² |

A ficha liga `cabos-fora-do-corpo-nos-erros`: no estado de antes ela falha; no de agora, passa. Na pintura, nenhum achado cresceu (o do antebraço esquerdo de cima sobre o estribo sumiu; o do estribo sobre o antebraço direito, de três quartos, passou de 4 para 3,8 cm²). O antes e depois está em `../correcao-das-antigas/supino-inclinado-polia-fio-ou-peso.png`; os quadros grandes foram regravados com o erro também no topo (`cima:err:f1:banco` e `quina:err:f1:banco`) e olhados de cima e de três quartos, nos dois braços. A conferência automática dá **1 falha e 2 avisos** (antes: 2 falhas, a de fios e a de pintura, e 2 avisos); a de pintura é a de antes. O enquadramento de cima mudou menos de 0,1 cm.

**O que ainda não ficou bom.**
- No topo do erro, o cabo da esquerda passa rente ao antebraço (0,1 cm da pele, pela regra): não entra, mas encosta. Com as palmas a 45°, entrava 0,2 cm.
- De cima, no erro, os dois estribos ficam em ângulos diferentes (a esquerda a 50°, a direita a 25°).
