# Lote A2 · Remada unilateral com elástico sob o pé da frente (`remada-unilateral-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). O pé esquerdo à frente, pisando inteiro no meio do tubo; o direito atrás; o tronco inclinado com as costas retas, a mão esquerda apoiada na coxa da frente; a mão direita segura as duas pontas do tubo e o cotovelo vai para trás, rente ao corpo, até a mão chegar perto do quadril. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-elastico.md`. Cartão do app: `src/conteudo/exercicios/remada-unilateral-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral-elastico.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral-elastico.ts`. O corpo parado é o da remada unilateral sem banco aprovada (`remada-sem-banco.ts`, usado como está), o braço que puxa é o do núcleo das remadas (`remada.ts`, com a opção nova `carga: 'elastico'`) e o tubo pisado sai do núcleo novo `exercicios/elastico-pisado.ts`.
- Quadros grandes: `../quadros/remada-unilateral-elastico.png`. **Sem folha** (não havia animação).

## Onde os números saem

A ficha da técnica não dá número. A base (tronco a 55°, joelho da frente a 30°, perna de trás a 8° com o calcanhar 15° no ar, passo de 66 cm, a mão na coxa com o cotovelo a 12°), o braço que puxa e os erros de girar e de arredondar saem da **remada unilateral sem banco aprovada** (fonte `semBanco`). O tubo é o da tabela (48 pol). **Como o tubo fica:** o cartão diz "pisando com o pé inteiro no meio do elástico" e "a ponta do elástico na mão do lado de trás". Pisado no meio, o tubo tem duas pontas; elas sobem juntas até a mão direita, que segura os dois pegadores. É o que fecha a conta sem voltas na mão: dobrado ao meio, cada trecho tem uns 50 cm do pé à mão, e com o braço estendido o tubo fica a 1,0 vez o comprimento em repouso (esticado, sem folga). Sob a sola, os dois trechos passam lado a lado, a 3 cm um do outro, e a dobra fica embaixo da borda de fora do pé.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pé da frente inteiro sobre o elástico, no meio dele | consenso | os dois trechos passam sob a sola de 47% a 62% do caminho do calcanhar à bola do pé, a 0,6 cm do chão; o calcanhar no chão (0 cm); os pés não andam (0 cm) | sim |
| Um pé à frente, o outro atrás (o do lado da mão que puxa) | consenso | o tornozelo direito fica 66 cm atrás do esquerdo | sim |
| Tronco inclinado, costas retas | consenso | o peito a 56,3° da vertical; a lombar não dobra além da curva de repouso (0°) | sim |
| Mão livre apoiada na coxa da frente, parada | consenso | a mão a 0,2 cm da pele da coxa, a 88% do caminho do quadril ao joelho; ela anda 0 cm e o cotovelo fica a 12° | sim |
| Braço estendido no começo | consenso | o cotovelo dobra 3° | sim |
| Cotovelo para trás, perto do corpo, sem girar o tronco | consenso | o braço se afasta no máximo 16° do lado do tronco; o tórax gira 0° e a bacia anda 0 cm | sim |
| Fim: mão perto do quadril, cotovelo atrás do tronco | consenso | a mão a 87% do caminho do ombro ao quadril; o cotovelo 5,4 cm além da linha das costas | sim |
| A escápula se junta à coluna (da sem banco aprovada) | consenso | a clavícula vai 13,1° para trás | sim |
| ~1 s puxando, pausa curta, ~2 s voltando | consenso | 1,1 s, 0,6 s, 2,1 s; salto de velocidade de 7,4% do pico; o ciclo emenda (0 cm) | sim |
| O elástico estica e não atravessa o corpo | física | de 1,0 vez (braço estendido) a 1,4 vez (no fim); máximo do fabricante 3 vezes. Passa a no mínimo 3,2 cm da pele (canela da frente) | sim |
| O centro de massa sobre os pés | mecânica | sempre dentro do apoio | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) Dorsiflexão de 17,8° no tornozelo de trás: é o mesmo aviso da remada unilateral sem banco aprovada (a mesma base). (2) O elástico estica de 1,0 a 1,4 vez, mais no fim que no começo do ciclo (a regra geral espera o contrário; mesmo aviso das remadas com elástico aprovadas). (3) As linhas de escolha de desenho (as da sem banco e as do tubo). Músculos: o modo abre de três quartos de trás, como a sem banco.

## As vistas

**De lado** (padrão do modo Técnica): o tronco parado, o braço que puxa perto do corpo e os dois trechos do tubo descendo até o pé da frente. **De três quartos** (a segunda): o tronco que não gira e a mão na coxa. As mesmas da sem banco aprovada.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | de três quartos | o peito abre para o lado do braço que puxa: a coluna gira 18° no fim (o erro da sem banco aprovada); o tubo estica 1,5 vez |
| Arredondar as costas | de lado | a lombar e a parte de cima das costas curvam 22° cada (o erro da sem banco) |
| Pisar só com a ponta do pé | de lado | o calcanhar da frente sobe 25° (a bola do pé no chão) e o tubo fica sob a ponta dos dedos (97% do caminho do calcanhar à ponta), de onde ele escapa. O quadril fica onde estava (a perna de trás, quase estendida, não deixa o corpo subir): o joelho da frente dobra mais, e a mão de apoio vai junto com a coxa, no mesmo ponto dela. O elástico escapando e voltando no rosto não é desenhado |

## O equipamento

- **Tubo com pegadores:** o da tabela (48 pol). Os **dois pegadores juntos na mão direita**: desenhados um ao lado do outro ao longo da pegada (deslocados 0,9 cm cada um), dentro da mão fechada, com as duas fitas saindo dela.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das do elástico: o tubo afina ao esticar e passa sob o pé que pisa. Da sem banco: costas do lado que puxa em vermelho, bíceps e ombro de trás em laranja.

## Mudança em arquivo comum

A mesma da curvada com elástico: `carga: 'elastico'` no `exercicios/remada.ts` (aditiva; o preparo das outras remadas não muda). O `remada-sem-banco.ts` aprovado é usado como está (`baseSemBanco` e `peleDaCoxa` já eram exportados).

## O que não ficou bom

- **Os dois pegadores numa mão só** são uma leitura do cartão ("pisando no meio" + "a ponta do elástico na mão"); de lado, aparecem como duas barrinhas pretas lado a lado, com um "V" de fitas embaixo do punho. Lê-se como pegador, mas não é um desenho que o Gustavo já tenha visto.
- **Tirei o rótulo "cotovelo para trás"**: de lado (no fim) e de três quartos (no começo), o fio dele atravessava as costas. Ficaram "costas retas" (de lado) e "tronco sem girar" (de três quartos); o caminho do cotovelo aparece no modo Trajetória.
- **Na vista de três quartos, a dobra do tubo** aparece como um pequeno "V" roxo ao lado de fora do pé da frente.
- **No erro do pé**, o joelho da frente dobra mais em vez de o corpo subir (com a perna de trás quase estendida, o corpo não tem como subir sem tirar o pé de trás do lugar).

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (M4) achou a mão de apoio (a esquerda) dentro da coxa da frente: o centro da pegada a 2,3 cm do eixo da coxa (40% do raio) e o antebraço entrando 6,3 cm nela; de três quartos só aparecia um pedaço da mão solto na frente do joelho. A animação saiu da aprovação até a correção.

**A causa.** A base das remadas sem banco (`exercicios/remada-sem-banco.ts`) pousa a mão no ponto da pele da coxa que `peleDaCoxa` acha: os pontos da pele a até 2,5 cm do plano naquele ponto da coxa, e o mais alto deles na direção da frente da coxa. No ponto em que a mão pousa (a 88% do caminho do quadril ao joelho), entre dois anéis da coxa, a função não achava ponto nenhum e devolvia o próprio eixo: a mão era posta 2,4 cm acima do eixo, dentro da coxa. (As remadas sem banco aprovadas, com halter e com kettlebell, usam a mesma base e têm a mesma mão dentro da coxa: não foram tocadas; ver a resposta da sessão.)

**A mudança.**

1. **Núcleo comum, acréscimo:** `remada-sem-banco.ts` ganhou `peleDaCoxaNaSuperficie` (o mesmo ponto, medido na superfície de verdade: o anel da coxa interpolado entre os dois vizinhos e a saída da direção na elipse dele) e uma opção `pele` em `baseSemBanco`, que por padrão continua `peleDaCoxa`. As remadas aprovadas não passam a opção e ficam iguais.
2. **No exercício:** a base usa `peleDaCoxaNaSuperficie`, e o erro "Pisar só com a ponta do pé" também (lá a mão acompanha a coxa). No erro, o ponto da coxa passou a ser o do meio da palma, e não o centro da pegada (alguns centímetros adiante: a mão escorregava para o joelho).
3. **Na ficha:** `apoio.cotovelo` foi de 12° para 40° (selo desenho). Com a mão pousada na pele, 6 cm acima de onde ficava, o braço quase estendido levava o meio da mão além do joelho (104% do caminho); com 40°, ela fica a 97%, na coxa, logo acima do joelho. O cotovelo de apoio fica escondido atrás do tronco nas duas vistas.

**A regra nova** (`remada-elastico-mao-de-apoio-sobre-a-coxa`, em `regras/remada-unilateral-elastico.ts`): no ciclo (5 instantes) e em cada erro (começo, meio, fim e o instante dele), mede onde fica o centro da mão de apoio ao longo da coxa (de 40% a 100% do caminho do quadril ao joelho), quanto ele fica fora da pele (na elipse do anel da coxa ali; tem de ser 0 ou mais), a folga dele até a borda lateral da coxa (tem de ficar sobre ela, e não ao lado), quanto a pele da mão e a do antebraço entram na coxa (até 1,5 e 1 cm, o amassado da pele) e se a mão encosta (a até 1,5 cm). É uma remada de um braço só: a mão direita segura o elástico e não apoia, por isso a regra mede um lado só.

| | antes (`1828c0e`) | depois |
|---|---|---|
| centro da mão ao longo da coxa (do quadril ao joelho) | 88,2% a 92,4% | 97,2% |
| centro da mão fora da pele da coxa (negativo = dentro), pior quadro | **−3,8 cm** (no erro "Arredondar as costas") | +2,7 cm |
| centro da mão até a borda lateral da coxa | 4,7 cm para dentro | 3,7 cm para dentro |
| a pele da mão entra na coxa | **5,7 cm** | 0 cm |
| a pele do antebraço entra na coxa | **6,8 cm** (erro "Girar o tronco") | até 1 cm (erro "Pisar só com a ponta do pé"; 0 no ciclo) |
| o cotovelo de apoio | 12° | 40° |

Rodada no estado de antes (o exercício e a ficha de `1828c0e`, com a regra nova), a conferência dá **1 falha** (esta regra). No estado novo: **0 falhas**, os mesmos avisos de antes; a regra antiga "mão livre apoiada na coxa da frente" passa (0,5 cm da pele, a 97,2%).

**Olhado nos quadros** (`quadros/remada-unilateral-elastico.png`): de três quartos, a mão esquerda aparece inteira, espalmada sobre a frente da coxa, logo acima do joelho, com o antebraço descendo até ela; de lado ela aparece na frente da coxa de longe. Nos três erros a mão fica no mesmo ponto da coxa.

**O que ainda não ficou bom.** A mão pousa perto do joelho (97% do caminho), e não no meio da coxa: com o tronco a 56° da vertical, o ombro fica quase sobre o joelho, e pôr a mão mais alto pediria o cotovelo bem dobrado (60° para 84%). No erro "Pisar só com a ponta do pé", o antebraço encosta 1 cm na coxa (no limite do amassado da pele). As remadas sem banco aprovadas seguem com a mão dentro da coxa.
