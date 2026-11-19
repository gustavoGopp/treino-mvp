# Lote C1 · Agachamento no hack (`hack`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). De costas no encosto do carro, os ombros sob as almofadas, as mãos nos pegadores ao lado delas, os pés parados no meio da chapa; o carro desce na guia a 45° até o joelho passar de 90° e volta sem travar. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/hack.md`. Cartão do app: `src/conteudo/exercicios/hack.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/hack.json`.
- Animação: `src/engine/novo/exercicios/hack.ts`. Regras: `src/engine/novo/regras/leg-press.ts` (família "no trilho").
- Peça nova: `src/engine/novo/pecas-de-cena/hack.ts` com `dados/objetos/hack.json`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-hack.png`.
- Quadros grandes: `../quadros/hack.png`. Sem folha ao lado da de hoje (não havia animação).

## Onde os números saem

A ficha da técnica dá a técnica em palavras (consenso, `nsca2021` não verificado), a profundidade ("o joelho passar de 90°", por analogia com `kubo2019`) e a cadência (~2–3 s descendo, `cadencia.repeticao`). **O ângulo do carro, 45°, é da página pública da Hammer Strength PL-HSQ2** ("with a 45-degree pressing angle"). O corpo anda com o carro: o tronco não gira (as costas ficam no encosto) e a bacia desce na linha da guia. Uma calibração mede, na superfície do Boneco, a inclinação da bacia em que as escápulas e o glúteo encostam juntos no encosto, a distância da bacia à face dele e onde fica o alto dos ombros, sob as almofadas. Em cada quadro, a posição do carro sai do ângulo do joelho da ficha (a distância do quadril ao tornozelo; conta de segundo grau).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Costas e ombros apoiados no encosto, ombros sob as almofadas | consenso | as escápulas e a bacia a −1 cm da face do encosto e o alto dos ombros a 1 cm dentro das almofadas (afundam 1 cm), em todos os quadros; a lombar achatada 10°, sem mudar | sim |
| Pés no meio da plataforma, na largura do quadril ou dos ombros | consenso | o meio de cada pé no centro da chapa, a 15 cm do meio do corpo; as pontas 15° para fora; os pés parados (0 cm) | sim |
| Solta a trava antes da 1ª repetição | consenso | as alavancas abertas o ciclo inteiro: o carro anda de 3 cm acima a 31,7 cm abaixo do suporte de cima da trava | sim |
| Desce até o joelho passar de 90°, sem a lombar descolar | um estudo (`kubo2019`, por analogia) | 2,4 s; embaixo o joelho dobra 105°, o quadril 71,3°; a lombar e a bacia ficam no encosto | sim |
| Joelhos na direção dos pés | consenso | o plano da perna fica a 0° da direção dos dedos (os joelhos abrem 17,9° com os pés) | sim |
| Sobe sem travar os joelhos | moderada (`cadencia.repeticao`) | 1,3 s; em cima o joelho dobra 12° | sim |
| O carro corre a 45° | medida (Hammer Strength PL-HSQ2) | o encosto sai 0 cm da linha da guia, a 45° do chão | sim |
| Mãos nos pegadores | consenso | as mãos a 0 cm do meio dos pegadores do carro (andam com ele); o cotovelo dobra 145° (a média da tabela é 148°) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs hack`): **0 falhas, 2 avisos.**

- **Provisórios:** a lombar, o pescoço, a cabeça, o quanto afunda, a anilha e a regulagem da trava.
- **Músculos de frente: 0 cm²** no pior dos três instantes (as coxas apontam para quem olha). A vista de frente fica para o erro dos joelhos e para o rótulo "joelhos na direção dos pés"; o modo Músculos abre de lado (358 cm²).

O tornozelo vai de 39,8° esticado (em cima: o corpo deitado a 45° no encosto, o pé na chapa) a 5,4° esticado embaixo, sem aviso. O resto: proporções exatas, ritmo suave (5,2%), simetria e fecho em 0 cm; o corpo afunda no máximo 2,1 cm no estofado (tolerância 2,5).

## Os erros (os quatro do cartão, na mesma ordem)

| Erro | O que o desenho mostra (medido) | Vista, instante |
|---|---|---|
| Descer pouco | embaixo, o joelho para a 60° (no certo, 105°) | lateral, fim da descida |
| Lombar descola | desce até o joelho a 115,8°; a bacia gira 22° para trás e a lombar arredonda o mesmo tanto, com os ombros parados nas almofadas: a bacia sai do encosto (anda 8 cm) | lateral, fim da descida |
| Joelhos para dentro | os joelhos giram 16° para dentro, mais no meio do caminho: o joelho direito vai de 17,3 a 11,9 cm do meio, com o pé a 15 cm | de frente, meio do caminho |
| Travar os joelhos | em cima, o joelho estica até 1,8° (no certo, 12°) | lateral, começo |

Todos os erros do cartão têm consequência visível; nenhum ficou sem desenho.

## O equipamento

A peça nova (folha `folha-hack.png`): o tamanho da Hammer Strength PL-HSQ (216 × 155 × 153 cm; desenhada com 218 × 155 × 153), o carro a 45°, a massa dele (57 kg), a trava de duas posições e os 4 pinos de guardar anilhas (página da PL-HSQ2). A página diz que a chapa dos pés regula 8° ("equivalent of both a 3° and 10° heel wedge"), **sem dizer o ângulo dela**: a chapa fica com a ponta 15° acima do calcanhar, como no cartão de hoje (com o corpo deitado a 45°, a chapa reta deixaria o tornozelo esticado demais em cima), tipo `desenho`. Onde a chapa fica em relação ao encosto (45 cm atrás dela, na altura do centro), a distância entre as guias e o comprimento dos pinos (que fecham a largura da ficha) e a altura do alto das guias (que fecha o comprimento) são `derivada`, com o motivo.

Na cena, o lado de perto (a guia, o pino com as anilhas, a alavanca) vai para trás do corpo, como cenário. A estrutura e o carro são pintados atrás do corpo (eles ficam do lado das costas; a ordem pelo centro punha as travessas do carro na frente das pernas, de frente). O quadro corta o chão e o alto do montante de trás.

## O que não ficou bom

- **A chapa a 15° não tem fonte**: é a do cartão de hoje. A Hammer Strength só diz que ela muda 8°.
- **O rótulo "lombar no encosto"** fica acima do corpo, com a linha passando pelo braço até a lombar; "desce fundo" aponta para o joelho.
- **De lado, a almofada do ombro de perto fica atrás da cabeça**: é onde ela está (sobre o trapézio), mas de perfil parece encostada na nuca.
- O cotovelo dobra 145° para a mão chegar ao pegador ao lado do ombro (perto da média da tabela, 148°).

**Risco de o Gustavo não gostar: médio.** O hack se reconhece e funciona; a chapa sem fonte e a almofada do ombro de perfil são os pontos a olhar.

## Correção de 19/11 (auditoria, pequenos)

**Como medi.** No desenho que o app pinta (o mesmo `ex.quadro`, o mesmo Boneco e o mesmo desenho da máquina), em cada vista declarada e na de cada erro, na técnica e em cada erro, nos dois lados. A entrada na pele densa (`src/engine/novo/pele-densa.ts`): 36 pontos por anel e 3 anéis no meio de dois vizinhos, e não os 12 pontos por anel da conferência automática; a medida é a da conferência (a menor distância do ponto às faces da caixa), com a mesma tolerância de 2,5 cm.

**O achado da auditoria: o braço entra 3,1 cm no encosto, junto da axila. Não se confirma como entrada.** O 3,1 é o quanto a pele do braço fica atrás da face da frente do encosto (medi 3,2), mas nesse ponto ela está a 0,4 cm da borda do lado dele: o braço passa raspando a quina do encosto. Medida como a conferência mede (a menor distância até sair da caixa), na pele densa, o braço entra 1,6 cm, dentro da tolerância. Não mexi no braço para isso (no polo do cotovelo, o melhor que achei foi 2,5 cm atrás da face, com os cotovelos ainda mais abertos).

**O que a medida densa achou no lugar: as almofadas dos ombros.** Com os 12 pontos por anel, a calibração punha o alto dos ombros 1 cm dentro da almofada (o `amassa` da ficha); na pele desenhada, entre os pontos e entre o anel de C7 e o de baixo dele, a pele sobe mais, e a almofada entrava **4,0 cm** no alto dos ombros, ao longo da guia (2,8 cm na medida da conferência, a menor distância até sair da caixa; com 12 pontos, ela media 2,1).

**O que mudou (a regulagem medida para o corpo).** `exercicios/hack.ts`, `noCarro`: o alto dos ombros sob as almofadas é medido na pele densa. O corpo fica 3,0 cm mais baixo no carro, ao longo da guia; o carro, na mesma conta do joelho, um pouco mais alto. A regra `costas-e-ombros-no-encosto-do-hack` (`regras/leg-press.ts`) também mede na pele densa.

| | antes | depois |
|---|---|---|
| alto dos ombros dentro das almofadas, ao longo da guia (pele densa) | 4,0 cm | 1,0 cm (o `amassa`) |
| entrada do tronco nas almofadas (pele densa) | 2,8 cm | 0,9 cm |
| braço no encosto (entrada, pele densa) | 1,6 cm | 2,1 cm |
| braço atrás da face do encosto, na borda | 3,2 cm | 3,1 cm |
| "o corpo atravessa uma peça" (conferência, 12 pontos) | 2,1 cm | 1,1 cm |

**Conferência nova:** `hack-pele-nos-estofados`: a pele densa contra o encosto, as almofadas, a chapa e as outras caixas, na técnica (um quadro a cada três) e nos quatro erros (u de 0 a 1, de 1/8 em 1/8). Antes: falha (tronco 2,8 cm na almofada). Depois: passa (braços 2,1 cm; bacia 1 cm).

**Conferência automática:** 0 falha, 2 avisos (os de antes). Preparo do `hack` regravado (as calibrações do corpo no carro mudam).

**O que ainda não ficou bom:** o braço continua passando pela quina do encosto (3,1 cm atrás da face, a 0,4 cm da borda do lado). Não aparece de lado nem de frente, mas é o que a auditoria viu. Os 1 a 2 anéis pintados por baixo do encosto ou da ombreira nos erros de lado (outro achado pequeno da auditoria) não são deste lote.
