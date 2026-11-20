# Lote A5 · Supino na polia com o banco plano entre as torres (`supino-polia`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado no banco plano, no meio das duas torres da polia dupla, com as polias embaixo e um estribo em cada mão: as mãos saem do lado do peito e sobem até quase estender os cotovelos, um pouco para dentro; os cabos sobem do chão até as mãos, por fora do banco. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/supino-polia.md`. Cartão do app: `src/conteudo/exercicios/supino-polia.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-polia.json`.
- Animação: `src/engine/novo/exercicios/supino-polia.ts`, sobre o núcleo novo dos supinos na polia com o banco entre as torres (`exercicios/polia-banco.ts`), que o supino inclinado na polia também usa. As colunas, os estribos e os cabos são os do núcleo da polia aprovado (`exercicios/polia-bracos.ts`). Regras medidas: `src/engine/novo/regras/polia-banco.ts` (e as do núcleo da polia, `regras/polia-bracos.ts`).
- Quadros grandes: `../quadros/supino-polia.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras e diz que ela segue, por analogia, o supino reto com halteres. Por isso o corpo é o do supino reto aprovado: a nádega no banco, o banco posto pela cabeça (3 cm do topo da cabeça à ponta), os pés no chão, o braço embaixo a 50° do tronco e 14° abaixo do plano das costas, com o antebraço na vertical, e a pegada girada 25°. Cada linha da ficha de movimento diz de onde veio (selo `desenho`, fonte `supinoReto`). A máquina é a do crucifixo na polia aprovado (roldanas a 96 cm do meio) com as polias embaixo (o carro a 22 cm do chão, como no tríceps francês na polia aprovado). O banco fica no meio das torres; cada roldana fica na linha do meio do caminho das mãos.

**Uma diferença do supino reto aprovado, de propósito:** lá, medido na superfície do Boneco, as costas ficam 2,6 cm e a nuca 7,7 cm acima do tampo do banco. Aqui o cartão pede "escápulas juntas e apoiadas", então a pelve gira para trás até as costas amassarem o estofado 1 cm, e o pescoço dobra até a nuca apoiar do mesmo jeito (uma calibração por corpo, guardada no preparo). O desenho é o mesmo, só mais encostado.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco plano no meio das duas torres | consenso | o meio do banco fica a 0 cm do meio das duas roldanas; os dois cabos têm o mesmo comprimento o ciclo todo (diferença 0 cm) | sim |
| Polias embaixo, um estribo em cada polia | consenso | o centro de cada roldana a 22 cm do chão, a 96 cm do meio; cada mão segura um estribo | sim |
| Os cabos sobem do chão até as mãos, por fora do banco (pedido desta tarefa) | consenso | abaixo do alto do banco, os cabos passam no mínimo 45 cm por fora da largura dele (a base, 56 cm); da roldana ao elo, cada cabo é reto e passa a no mínimo 2 cm da pele (o antebraço, embaixo) | sim |
| A pilha sobe o curso do cabo dividido pela relação da máquina | consenso | o cabo anda 44,5 cm e cada pilha sobe 22,2 cm (2:1); embaixo, a pilha já sai 2 cm (o cabo tenso no alongado) | sim |
| Deitado, escápulas juntas e apoiadas, pés no chão | consenso | costas e nuca amassam o estofado 1 cm, o glúteo 0 cm, o ciclo todo; a clavícula 9° para trás e 4° para baixo; os pés não saem do lugar (0 cm) | sim |
| Início: mãos na altura do peito, ao lado dele, cotovelos a ~30–60° do tronco | consenso | o braço a 50° do tronco (no plano das costas), o antebraço na vertical (0°), a mão 22 cm abaixo da linha dos ombros, ao longo do tronco, e 26 cm acima do centro do ombro | sim |
| Empurra para cima e um pouco para dentro, até quase estender os cotovelos | consenso | no topo, o cotovelo dobra 14°, as mãos ficam 8 cm para dentro dos ombros e na vertical deles, de lado (0 cm) | sim |
| Volta em ~2 s até um alongamento confortável do peito | consenso | 2,2 s; o ritmo é suave (salto de 4,4% da velocidade de pico); o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (o corpo do supino reto aprovado, a distância das roldanas, a folga da pilha). (2) O modo Músculos abre de cima (peito: 457 cm²); de três quartos, por trás, o peito aparece pouco (86 cm²), como de lado no supino reto aprovado.

## As vistas

Medido e olhado: **de três quartos, pela cabeça** (`quinaTras`, a vista que o app abre no modo Técnica) e **de cima** (padrão do modo Músculos, 457 cm²; mostra os cotovelos a 50° e o banco no meio).

- **De lado** (a vista do supino reto aprovado) não serve: as roldanas ficam ao lado do peito, então o cabo de perto aparece como uma linha vertical que desce da mão e atravessa o banco no desenho (de fato ele passa 45 cm por fora). As colunas, que são cenário, não aparecem de perfil.
- **De frente (pelos pés) e de trás (pela cabeça)** mostram muito bem as duas torres e os cabos subindo, mas as coxas (ou a cabeça) tapam o tronco, e de frente a figura lembra uma pessoa sentada de braços para cima.
- De três quartos, pela cabeça, lê-se de relance a pessoa deitada no banco, as duas torres e os dois cabos subindo do chão. No quadro de baixo (f0), o antebraço do lado de longe fica sobre a barriga, efeito do ângulo.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Banco fora do meio | de cima | o banco e a pessoa ficam 22 cm para a esquerda do meio das torres. Embaixo, o cabo da direita fica com 84,7 cm e o da esquerda com 50,6 cm (o certo: 66,3 e 66,3); a pilha da direita sobe 11 cm e a da esquerda fica no repouso; no topo, as pilhas ficam a 33 e 17 cm (o certo: 24 e 24) |
| Cotovelos abertos a 90° | de cima | embaixo, o braço fica a 88° do tronco (o certo: 50°), em cruz |
| Soltar a volta | não desenhado | é erro de ritmo: o cartão só diz "deixar a placa puxar o braço de uma vez perde a parte alongada", sem nada visível na pose. Fica fora da ficha; quem integra põe na lista `SEM_DESENHO` do teste da ponte |

No erro do banco, do lado de perto da torre o cabo embaixo fica mais curto que o repouso: na vida real ele afrouxa e a pilha desce até o fim; no desenho o cabo continua reto (o motor desenha cabo sempre reto) e a pilha fica parada no repouso.

## O equipamento

- **Colunas:** as da tabela (coluna de polia regulável, 2,39 m), como cenário: pintadas atrás do corpo e cortadas pela borda do quadro, para o corpo ocupar o quadro. A relação 2:1 da pilha é a da tabela.
- **Estribos:** os da tabela, a pegada no centro da mão, o elo do lado da roldana.
- **Banco reto:** o da tabela, o mesmo do supino reto aprovado.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Das correções da polia, vale a montagem em cm (polia baixa a 22 cm, a de 04/11) e a câmera que não fica com o corpo pequeno por causa da coluna alta (as colunas são cenário). Do supino reto, vale a cabeça apoiada com o banco posto pela cabeça (15/11).

## O que não ficou bom

- **A vista que abre é de três quartos, não de lado como nos supinos aprovados.** Tentei de lado, de frente, de trás e as duas de três quartos (olhadas nos quadros); só esta mostra as torres e os cabos sem o cabo atravessar o banco no desenho. É uma escolha que o Gustavo pode querer rever.
- **No quadro de baixo (f0), de três quartos**, o antebraço de longe passa sobre a barriga e o de perto fica junto da cabeça: é o ângulo, não a pose (a pose medida é a do supino reto).
- **No erro do banco fora do meio**, o cabo do lado de perto continua reto embaixo, quando na vida real afrouxaria (ver acima).
- **O antebraço passa a 2 cm do cabo** embaixo: não encosta, mas fica perto.

## Correção de 20/11 (fio ou peso dentro do corpo)

A conferência dos fios (`conferir-pintura.ts`, tolerância de 1 cm) acusava **o cabo e a fita do estribo 1,2 cm dentro do antebraço esquerdo** no erro "Banco fora do meio", no topo (u = 1).

**A causa, medida.** No erro, o banco e o corpo vão 22 cm para a esquerda: a roldana da esquerda fica a 65 cm da mão na horizontal (no certo, 87 cm), e o cabo dela sobe mais em pé, a uns 43° da vertical, rente ao antebraço esquerdo, que no topo desce do punho para fora a 14° da vertical. O estribo pende para o lado do cabo, mas só pode girar em volta da pegada: com as palmas a 25° uma para a outra (a pegada do certo), a pegada fica quase de lado a lado, a parte do cabo que vai para fora não conta, e o elo fica quase embaixo da mão, junto do punho. Dali, a fita e o cabo atravessavam o antebraço de 7 a 9 cm do punho. Diminuir o desvio não resolvia bem: com o banco 12 cm fora do meio, o cabo ainda entrava 0,6 cm (e a regra pede até 0,5).

**A mudança.** No erro, a mão do lado da torre mais perto (a esquerda) gira o estribo para o lado do cabo: as palmas a 50° (`erro.banco.giro`; no certo e na mão direita, 25°). O estribo pende mais para fora, o elo sai do lado do antebraço, e o cabo passa por fora dele. O banco continua 22 cm fora do meio (o erro não diminuiu); o resto do corpo, o ciclo e o outro erro não mudam. O núcleo `polia-banco.ts` (só destes dois supinos) lê a linha apenas na ficha que a tem.

| medido (homem) | antes | depois |
|---|---|---|
| o cabo e a fita do estribo dentro do antebraço esquerdo, conferência dos fios (erro "Banco fora do meio", u = 1) | 1,2 cm | 0 (nada além da tolerância) |
| regra `cabos-fora-do-corpo-nos-erros`, erro "Banco fora do meio" | entra 1,2 cm (a fita, no antebraço esquerdo) | passa a no mínimo 1,1 cm da pele |
| a mesma regra, erro "Cotovelos abertos a 90°" | entra 0,2 cm | entra 0,2 cm |
| pintura: achados e área somada | 6, 29,2 cm² | 6, 28,9 cm² |

A ficha liga `cabos-fora-do-corpo-nos-erros`: no estado de antes ela falha; no de agora, passa. Na pintura, nenhum achado cresceu (o braço esquerdo de cima, por cima do cabo, passou de 2,3 para 2 cm²). O antes e depois está em `../correcao-das-antigas/supino-polia-fio-ou-peso.png`; os quadros grandes foram regravados com o erro também no topo (`cima:err:f1:banco` e `quinaTras:err:f1:banco`) e olhados de cima e de três quartos, nos dois braços. A conferência automática dá **1 falha e 2 avisos** (antes: 2 falhas, a de fios e a de pintura, e 2 avisos); a de pintura é a de antes. O enquadramento de cima mudou menos de 0,2 cm (o estribo girado).

**O que ainda não ficou bom.**
- De cima, no erro, os dois estribos ficam em ângulos diferentes (a esquerda a 50°, a direita a 25°). É pequeno, e cabe no erro ("um lado puxa mais que o outro"), mas não é algo que a ficha da técnica descreva.
