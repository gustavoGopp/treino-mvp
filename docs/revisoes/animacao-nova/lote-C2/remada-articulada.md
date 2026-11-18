# Lote C2 · Remada articulada (`remada-articulada`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na máquina, o peito no apoio, os pés no chão; as mãos presas nos pegadores de pé, que pendem de dois braços com o eixo no alto, à frente. Puxa levando os cotovelos para trás, rentes ao corpo, e volta até alongar as escápulas para a frente. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/remada-articulada.md`. Cartão do app: `src/conteudo/exercicios/remada-articulada.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-articulada.json`.
- Animação: `src/engine/novo/exercicios/remada-articulada.ts`. Do núcleo das máquinas de empurrar sentado (`exercicios/maquina-de-empurrar.ts`, aprovado) usa o tronco sentado (`troncoNaMaquina`), os pés no chão (`pesNoChao`), o glúteo no assento medido na pele (`apoioNoAssentoDaMaquina`) e a linha do peito (`linhaDoPeito`), sem mudar nada nele. O resto (o peito no apoio, a regulagem, o braço que puxa) fica no arquivo do exercício, porque o núcleo calibra contra um encosto atrás e empurra.
- Regras medidas: `src/engine/novo/regras/remada-articulada.ts` (quatro novas), mais as das remadas (`regras/remadas.ts`, `regras/suspensao.ts`, `regras/ombros.ts`, `conferir.ts`), a das mãos nos pegadores (`regras/maquinas-de-empurrar.ts`) e a da pilha (`regras/cadeiras.ts`), com as mesmas marcas.
- A peça: o modelo `REMADA_ARTICULADA` da função comum `pecas-de-cena/maquina-de-empurrar.ts` (acréscimo, ver abaixo) e o desenho em `pecas-de-cena/remada-articulada.ts`; medidas em `src/engine/novo/dados/objetos/remada-articulada.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-remada-articulada.png`.
- Quadros grandes: `../quadros/remada-articulada.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem número. O resto vem das animações aprovadas parecidas (selo `desenho` ou `consenso`, cada linha diz de onde): o sentar das máquinas aprovadas (1 cm de estofado, o pescoço que devolve 70% da inclinação do peito), o braço que puxa e os erros da remada apoiada aprovada (as escápulas −10° no fim, o tronco que levanta, os ombros que sobem 8°, a volta que para em 45%), os tempos da remada apoiada (~1 s puxando, 1 s segurando, ~2 s voltando).

**Nada da pose é posto à mão; a máquina se regula para o corpo, como quem treina faz antes da série** (uma vez por corpo, guardado em `calibragens.ts`):
- o glúteo no meio do assento (o ponto mais baixo da bacia 2 cm à frente do meio dele), afundando 1 cm; o tronco inclinado 10° à frente (o peito, como o apoio); **o apoio do peito**, que corre para a frente e para trás (a Precor e a Life Fitness: "adjustable chest pad", "KNOB, ADJ"), vem até o peito e afunda 1 cm: deu a face a **8,7 cm** à frente da borda do assento (o curso desenhado vai de −5 a 25);
- **a altura do assento**: sobe ou desce até o centro da mão, com os braços estendidos, ficar na linha do meio do peito (`altura.peito` da tabela): deu **48,6 cm** (o curso desenhado vai de 36 a 58);
- **a posição inicial dos braços da máquina**: onde o cotovelo dobra 6° (braços estendidos, sem travar), com as escápulas à frente: deu −18,5°;
- **o fim**: onde o braço de quem treina passa 20° além da linha do tronco, visto de lado: deu 20,7°.

As mãos não andam numa reta: cada uma fica presa no pegador, e o pegador anda num arco em volta do eixo do braço da máquina (76 cm de raio); o braço de quem treina se resolve até a mão, com o cotovelo apontando para baixo no começo e para trás no fim.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Assento na altura em que os pegadores ficam na linha do peito com os braços estendidos | consenso | com o assento a 48,6 cm, o centro da mão fica a 0 cm da linha do meio do peito no começo, com o cotovelo dobrado 6° | sim |
| Peito apoiado na almofada durante toda a série | consenso | o peito afunda 1 cm no apoio o ciclo todo (a parte que encosta é a do meio do peito; o apoio tem 25 × 19 cm); o glúteo 1 cm dentro do assento; a base do pescoço e a bacia não andam (0 cm), o tórax não gira (0°) | sim |
| Puxa levando os cotovelos para trás, rentes ao corpo | consenso | no fim, o centro do cotovelo fica 2 cm além da linha das costas (o braço 20° atrás do tronco); o braço se afasta no máximo 24,3° do lado do tronco (o limite das remadas é 30°) | sim |
| Início: braços estendidos, escápulas à frente | consenso | no começo, o cotovelo dobra 6°; a clavícula vai 10° à frente; a mão fica 63 cm à frente da articulação do ombro e 11,5 cm abaixo dela | sim |
| Fim: escápulas juntas (as remadas aprovadas) | consenso | a clavícula vai 13,5° para trás do começo ao fim | sim |
| Ombros baixos (dica do app) | consenso | a clavícula não sobe além do ritmo do ombro (0°); a ponta do ombro desce 0,3 cm na puxada | sim |
| As mãos nos pegadores o movimento todo | consenso | a no máximo 0 cm do centro do pegador; nenhuma falta de alcance | sim |
| Pegada neutra (o pegador de pé) | desenho | o antebraço fica de 82° a 111° (90° = polegar para cima, palmas uma para a outra) | sim |
| O pegador anda num arco (a máquina) | desenho | raio constante de 76 cm em volta do eixo; a mão anda 51 cm para trás e 0,8 cm para cima (flecha de 4,4 cm: desce um pouco no meio e volta); os pegadores se afastam de 40,3 para 43,9 cm entre as mãos (o eixo inclinado 2°: a Precor e a Life Fitness, "diverging") | sim |
| As placas sobem com os braços | desenho | 0 cm no começo (apoiadas), 8,9 cm no fim: o arco do came de 26 cm, a 0 cm do esperado | sim |
| Costas retas | consenso | a lombar 5° menos curva que em pé (sentado sem encosto), parada | sim |
| Ritmo (da remada apoiada aprovada) | consenso | 0,45 s alongado, puxa em 1,1 s, segura 1 s, volta em 2,1 s; salto de velocidade de 12,2% do pico (limite 15%); o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs remada-articulada`): 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`assento.amassa`, `peito.amassa`, `bacia.noAssento`, `tronco.aFrente`, `lombar.sentado`, `pescoco.compensa`, `pes.meiaDistancia`, `joelho`, `cotovelo.fora`, `cotovelo.desce`, `cotovelo.pouco`, `placas`). (2) O modo Músculos abre de três quartos por trás (as costas: 671 cm²); de lado, as costas quase não aparecem (175 cm²). O corpo entra até 1,3 cm no estofado (o glúteo e o peito afundam 1 cm; a tolerância é 2,5). Flexão do cotovelo no fim: 146,5° (dentro da amplitude).

## As vistas

**De lado** (padrão do modo Técnica): mostra a puxada, o peito no apoio e o cotovelo indo para trás. Os dois braços da máquina são pintados atrás do corpo nessa vista: o de longe porque está atrás, e o de perto como corte de ilustração (como no supino na máquina aprovado), senão o tubo dele cobriria a mão e o braço direito. O tubo de cada braço é dobrado (sai do eixo 20° à frente e dobra a 50 cm dele): de lado, ele fica longe do rosto em todo o caminho (reto, ele passava rente à frente do rosto e do pescoço no meio e no fim da puxada). O apoio do peito e a estrutura são cenário (atrás do corpo: o peito é pintado por cima do apoio, e não o contrário); a coluna da frente fica no enquadramento. A torre fica depois da coluna, na frente: atrás das costas fica só o vão, e os rótulos de lado ("peito na almofada") e os nomes do modo Trajetória ("mão", "cotovelo") ficam ali, sem cair em cima da torre nem da coluna.

**De três quartos por trás** (padrão do modo Músculos; a mesma segunda vista da remada apoiada aprovada): mostra as costas, as escápulas que se juntam, os dois cotovelos indo para trás e a máquina inteira, com os pegadores. **De trás** fica para o erro dos ombros (a linha dos dois ombros). De frente, a coluna e o apoio ficam entre quem olha e o corpo; de três quartos pela frente, os braços da máquina tapam o tronco: as duas ficaram de fora.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Tirar o peito da almofada | de lado, no fim | na puxada, o tronco vai 16° para trás (de 10° à frente para 6° para trás): a base do pescoço recua 16,9 cm e o peito sai 6,3 cm do apoio (10,9 cm na parte de cima); as mãos continuam nos pegadores e o cotovelo dobra menos (124° contra 146°): o corpo ajudou a puxar |
| Encolher os ombros | de trás, no fim | a clavícula sobe 8° a mais no fim (18,5° contra 10,5°): a ponta do ombro sobe 2 cm |
| Não estender os braços | de lado, no começo | a volta para em 45% do caminho: o cotovelo fica dobrado 95° e a clavícula fica 2,4° para trás do começo certo (as escápulas não vão à frente) |

Erro sem desenho: nenhum (os três têm consequência visível na pose).

## O equipamento

A remada articulada é peça nova (folha: `docs/revisoes/animacoes-restantes/pecas/folha-remada-articulada.png`), o terceiro modelo da máquina de empurrar sentado aprovada: o mesmo assento com pino, os mesmos braços independentes, o mesmo came e a mesma torre com a pilha; no lugar do encosto, o apoio do peito na frente (25,4 × 19,4 cm, da lista de peças da Life Fitness SS-RW), num tubo que sai da coluna, com o botão de regular; o eixo a 170 cm do chão, 36 cm à frente da borda do assento, numa viga que sai da coluna da frente; os braços de 76 cm (dobrados 20°, a 50 cm do eixo) que pendem dele e giram para trás; a torre à esquerda de quem senta, depois da coluna; os pegadores de pé, inclinados 20° para dentro. Todas as medidas e as fontes estão no arquivo de objetos e na folha.

**Mudança no arquivo comum (aditiva):** em `pecas-de-cena/maquina-de-empurrar.ts`, o modelo ganhou três campos opcionais (`puxa`: o braço gira para trás; `pegador: 'vertical'`: o pegador de pé na ponta de um toco; `apoio: 'peito'`), o valor `'frente'` do eixo, o campo opcional `apoio` (a regulagem do apoio do peito) e a função `faceDoApoioDoPeito`; `bracoNoAngulo` devolve também `dirBorracha` (a direção da borracha do pegador; no atravessado, a mesma de `dirPegador`). Sem os campos, as contas são as mesmas de antes: o preparo do supino e do desenvolvimento na máquina não mudou (`preparo.mjs` só regravou o arquivo da remada e o registro).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Das remadas aprovadas: as escápulas que se juntam no fim, o cotovelo além da linha das costas, as mesmas cores dos músculos (costas em vermelho; bíceps e ombro de trás em laranja, correção de 10/11).

## Pedidos (texto do app ou lista de músculos)

Nenhum.

## O que não ficou bom

- **O cotovelo dobra 146° no fim**, e a mão para na frente do peito, ao lado do apoio. Com o peito no apoio e a mão presa no pegador, levar o cotovelo 20° além do tronco pede isso; com 15°, o cotovelo não passava a linha das costas. O cotovelo desce até a altura da cintura (o ombro fica 11 cm acima da linha do peito).
- **O fio do nome "mão", no modo Trajetória, atravessa o braço** até a mão: o nome fica no vão atrás das costas (à direita não cabe, entre a coluna e a borda do quadro).
- **De três quartos por trás, a torre fica atrás da cabeça** (ela está na frente, depois da coluna). Com a torre à direita de quem senta, os rótulos dessa vista e o de trás caíam em cima dela; ficou à esquerda.
- **A estrutura não é a do cartão de hoje.** O cartão tem a coluna inclinada até o eixo e anilhas nos pinos; aqui a coluna sobe reta na frente (de lado, a inclinada passava atrás das mãos no começo), os braços são dobrados e a carga é a pilha (as fichas lidas e o texto do app), numa torre na frente. No tamanho do cartão, a peça nova é um quadro alto e menos reconhecível que o cartão.
- **O apoio do peito é pequeno** (a medida da Life Fitness, 25 × 19 cm): encosta só no meio do peito, e de lado ele quase some atrás do braço no fim.

**Risco de o Gustavo não gostar: médio.** A pose e a máquina fecham pela medida, os erros se leem e a máquina funciona (os braços giram no eixo, as mãos andam no arco, a pilha sobe); o risco está na peça (a coluna, os braços dobrados e a carga diferentes do cartão de hoje) e no cotovelo muito dobrado no fim.

## Revisão de 18/11/2026 (pedido de quem integra)

1. **De lado, o braço da máquina cortava a cabeça na diagonal** (em f0,5 e f1). Os dois braços já eram pintados atrás do corpo de lado (o de perto como corte de ilustração, a opção `bracoDePertoAtras`), mas o tubo reto passava rente à frente do rosto e aparecia dos dois lados da cabeça. Agora o tubo é dobrado (sai do eixo 20° à frente e dobra a 50 cm dele; `bracoDobra` e `bracoDobraEm` no arquivo de objetos, de desenho): o arco do pegador não muda, e de lado o braço fica longe do rosto em todos os quadros (técnica, músculos, trajetória, pele e erros). O pegador e a mão continuam onde estavam.
2. **Os nomes do modo Trajetória ficavam sobre a torre.** A torre foi para a frente, depois da coluna (à esquerda de quem senta, como antes): atrás das costas fica só o vão, e os nomes "mão" e "cotovelo" (e o rótulo "peito na almofada") ficam ali. Tentei a torre à direita de quem senta: os rótulos de três quartos por trás e o de trás caíam em cima dela.

A conferência continua com 0 falha e 2 avisos (os mesmos); o supino e o desenvolvimento na máquina não mudaram (a mudança é só no desenho da peça da remada).
