# Lote C1 · Mesa flexora (deitado) (`mesa-flexora`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado de bruços na mesa flexora, com o joelho no eixo da máquina e o rolo logo acima do calcanhar; os joelhos dobram até o rolo chegar perto do glúteo e voltam até as pernas quase estenderem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/mesa-flexora.md`. Cartão do app: `src/conteudo/exercicios/mesa-flexora.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/mesa-flexora.json`.
- Animação: `src/engine/novo/exercicios/mesa-flexora.ts`. Regras medidas: `src/engine/novo/regras/mesa-flexora.ts`.
- A máquina (peça nova): `src/engine/novo/pecas-de-cena/mesa-flexora.ts`, medidas em `src/engine/novo/dados/objetos/mesa-flexora.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-mesa-flexora.png`.
- Quadros grandes: `../quadros/mesa-flexora.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras (consenso, `nsca2021`, não verificado). O que ela não dá em número saiu da flexão de joelho com elástico aprovada (deitado de bruços, a mesma técnica: o joelho quase estendido a 12°, a lombar, o ritmo, o erro do quadril) ou é de desenho, com o motivo na ficha de movimento. **O corpo não é posto a olho no estofado:** os joelhos ficam na linha do eixo (o joelho alinhado com o eixo, a ficha); a coxa gira em volta do joelho e a bacia inclina até a pele da coxa e da frente da bacia encostar no estofado das coxas e a da barriga e do peito encostar no estofado do peito (1 cm de amassado), medido na superfície do Boneco. **O rolo também não:** a distância dele à canela é a que deixa a pele encostada nele (0,3 cm de amassado), medida na pele, 3 cm acima do centro do tornozelo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de bruços, quadril apoiado | consenso | a coxa e a frente da bacia ficam a −1 cm do topo do estofado das coxas, a barriga e o peito a −1 cm do topo do estofado do peito (negativo = afunda no estofado; a parte de cima do peito fica de 2 a 4 cm acima, porque o tórax é mais curvo que a barriga); a bacia não se mexe (0 cm). O quadril fica dobrado 13° (a dobra do estofado); a lombar fica 16° menos curva que em pé | sim |
| O joelho alinhado com o eixo da máquina | consenso | o centro de cada joelho fica a 0 cm da linha do eixo, o ciclo todo | sim |
| Mãos nos pegadores | consenso | as mãos fecham nos pegadores, à frente e abaixo da ponta do estofado do peito (0 cm), com o cotovelo dobrado 94° | sim |
| Rolo ajustado logo acima do calcanhar | consenso | o rolo encosta atrás da perna, 1,1 cm acima do centro do tornozelo (no tendão), a −0,3 cm da pele (amassa o estofado do rolo), o ciclo todo | sim |
| Pés relaxados, pernas quase estendidas | consenso | o joelho começa dobrado 12°; o pé fica solto, 30° além do ângulo reto com a canela | sim |
| Dobra os joelhos até o rolo chegar perto do glúteo, sem levantar o quadril | consenso | o joelho vai a 125° (a ficha não dá o ângulo; a média de referência é 140°); no fim, o rolo fica a 9,4 cm do glúteo; a bacia não sai do lugar | sim |
| Volta ~2–3 s até as pernas quase estenderem | consenso | dobra em 1,1 s, pausa de 0,4 s, volta em 2,5 s até 12°; o último quadro emenda no primeiro (0 cm) | sim |
| A máquina funciona (o cuidado 13) | consenso | a alavanca gira com a canela (diferença de 0°); as placas do pino sobem 21,7 cm, exatamente o arco do came (raio de 11 cm × ângulo girado) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs mesa-flexora`): 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`lombar`, `cervical`, `estofado.amassa`, `quadro.ate`, `rolo.amassa`, `placas`). (2) O modo Músculos abre de cima (posteriores: 596 cm²); de lado, o músculo quase não aparece (67 cm²), porque os posteriores ficam na parte de trás da coxa, virada para cima.

## As vistas

- **De lado** (padrão do modo Técnica): mostra o joelho no eixo (o came atrás dele), o rolo acompanhando a canela, o quadril no estofado e a pilha subindo atrás da cabeça.
- **De cima** (padrão do modo Músculos, 596 cm²): os posteriores das duas coxas e o rolo atravessado sobre as pernas.
- De três quartos (pela frente, `quina`, nos quadros grandes): mostra o corpo deitado em cima dos dois estofados, as mãos nos pegadores e o rolo sobre as pernas. Ficou fora das duas vistas do app porque a torre ocupa metade do quadro. De três quartos por trás (`quinaTras`), a torre e o came cobrem o quadril: troquei esse quadro pelo de três quartos pela frente.

**Correção de 18/11 (revisão de quem integra):** de três quartos, o corpo saía pintado embaixo do estofado. A causa: o gerador pinta cada peça na profundidade do meio dela, e o meio do estofado das coxas (comprido e deitado sob o corpo) ficava mais perto de quem olha, de três quartos, que o meio do tronco; ele era pintado por cima do tronco e das pernas. Agora os estofados, a viga e os pés embaixo deles são pintados na profundidade do canto deles mais longe de quem olha (um `dz` por peça, calculado na própria peça), e o corpo deitado fica por cima em qualquer vista. De lado e de cima, nada mudou.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Levantar o quadril | de lado | o quadril sobe 9 cm do estofado (o joelho fica no eixo e a coxa gira em volta dele); a bacia vira 28° para a frente e a lombar arqueia o mesmo tanto, com o peito no estofado; no fim, o quadril mede 56° de flexão (o certo: 13°) |
| Rolo no lugar errado | de lado | o rolo regulado no meio da panturrilha (a 55% da canela, a 26 cm do eixo; o certo fica a 41 cm), e não logo acima do calcanhar. O corpo faz o movimento certo, por isso o desenho não pinta parte do corpo de vermelho (como no erro do elástico no pescoço, aprovado): a linha vai do joelho ao tornozelo e o ponto marca o tornozelo, onde o rolo devia estar |

**Sem desenho:** "Volta solta" ("deixar a placa cair perde a parte alongada") é erro de ritmo: a pose é a mesma do movimento certo, só mais rápida na volta. Não inventei consequência; o guia mostra o movimento certo com o texto do erro, como o "Soltar a volta" do supino entre as torres. Quem integra põe a exceção em `SEM_DESENHO` do teste da ponte.

## O modo Trajetória

Só o caminho do calcanhar. O do rolo andava junto com ele, a 6 cm, e os dois nomes ficavam um sobre o outro (correção de 18/11).

## O equipamento

A mesa flexora é peça nova (folha `folha-mesa-flexora.png`). O tamanho total vem das fichas da Life Fitness SS-LC (159 × 106 × 148 cm), da Hammer Strength HS-LC, da Movement Next e da Precor RSL0606; a espessura dos estofados (6,5 cm) e a frase do estofado inclinado que alinha o joelho com o eixo, da Precor. A dobra no quadril (o das coxas sobe 20°, o do peito desce 10°), a altura do eixo (64 cm) e o resto de dentro da máquina são de desenho. O came, a alavanca, o rolo e a pilha têm as medidas da cadeira flexora aprovada e são desenhados do mesmo jeito; a cadeira flexora não mudou (nem o desenho, nem o preparo). No quadro, a torre de 148 cm é cortada pela borda em 112 cm (como a torre da polia).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). O cartão de hoje da mesa flexora se confundia com o da panturrilha sentada (`diagnostico/objetos-de-hoje.md`, par 9): a peça nova tem a torre, a dobra e a alavanca do joelho, e a folha mostra os dois cartões lado a lado.

## O que não ficou bom

- **A dobra do estofado é mais marcada que a do cartão de hoje** (20° no das coxas, contra uns 10° no cartão). Com 10°, a barriga do Boneco ficava no alto da dobra e o peito não deitava no estofado (só deitava com a lombar dobrando 60°, uma corcunda). Nenhuma ficha dá o ângulo.
- **A parte de cima do peito fica de 2 a 4 cm acima do estofado** (o tórax do Boneco é mais curvo que a barriga); de lado, lê-se como o peito apoiado.
- **A torre fica atrás da cabeça e dos braços, na vista de lado.** No meio do estofado ela ficava atrás do quadril e os rótulos caíam sobre ela; na ponta da frente, os rótulos ficam livres, mas a cabeça e as mãos se desenham na frente dos montantes.
- **O erro do rolo não pinta o corpo de vermelho:** o que erra é a regulagem da máquina.
- **No erro do quadril, o título encosta no montante da torre**, atrás dele.

## Correção de 19/11 (auditoria, pequenos)

**O achado da auditoria: de cima, no fim, o rolo é pintado sobre os calcanhares, que ficam 1,8 cm acima dele. Confirma-se.** No desenho real (u = 1), de cima, cada pé passa 2,9 cm por cima do rolo em planta (o pé vai de z = −2,2 a 18,6 cm, e o rolo de 15,7 a 26,7), e toda a pele do pé nessa faixa fica acima do topo do rolo (o mais baixo, 0,5 cm abaixo: o calcanhar encostado nele). O rolo entra na ordem de pintura acima do corpo, e os pés vão no item do corpo: ele os cobria. Medida de pintura com margem zero: 6 anéis de cada pé por baixo do rolo (no quadro grande, a borda de cima do rolo cortava os calcanhares).

**O que mudou.** A peça (`pecas-de-cena/mesa-flexora.ts`) ganhou duas opções, desligadas por padrão: `naFrenteDoRolo` (o rolo não cobre as partes do corpo dadas onde elas ficam na frente dele: o mesmo recorte do rolo da cadeira extensora, `recortarORolo`, agora exportado de `pecas-de-cena/cadeira-flexora.ts`, com uma opção nova, desligada por padrão, de testar só o ponto do anel mais perto de quem olha) e `hasteAtras` (a haste que atravessa o rolo vai 2 cm para trás na ordem: de cima, em parte da subida, perto de u = 0,8, ela saía pintada por cima do rolo, o que já acontecia antes). O exercício passa os anéis dos dois pés e a haste para trás. A cadeira extensora e a flexora não mudam.

| de cima | antes | depois |
|---|---|---|
| anéis de cada pé na frente do rolo e pintados por baixo dele, no fim | 6 de 6 (margem 0) | 0 |
| o pior quadro, na técnica e nos erros, nas duas vistas | — | 0 de 9 em cada pé |
| a haste por cima do rolo, u = 0,8 | sim | não |

**Conferência nova:** `mesa-flexora-pes-por-cima-do-rolo` (`regras/mesa-flexora.ts`): nas duas vistas e na de cada erro, na técnica e nos dois erros, os anéis das canelas e dos pés dos dois lados que ficam na frente do rolo e por cima dele na tela (a mais de 0,5 cm da borda dele) não podem ficar por baixo dele, contando o recorte. Depois: passa.

**Conferência automática:** 0 falha, 2 avisos (os de antes). O preparo não muda. Quadros refeitos.

**O que ainda não ficou bom:** no recorte, o calcanhar aparece sem a linha de contorno escura por cima do rolo (o recorte mostra o pé que está embaixo, como na cadeira extensora). Na vista de três quartos, que o exercício não declara, não conferi.

## Correção de 19/11 (o furo do recorte)

**O que estava errado (medido em [`../pintor-por-pares/mesa-flexora-de-cima-medida.png`](../pintor-por-pares/mesa-flexora-de-cima-medida.png)).** Com o pintor por pares, o rolo é pintado por cima das pernas de cima, no começo e no erro "Rolo no lugar errado", e está certo: o rolo fica 9 a 10 cm acima da pele. O defeito era o recorte da correção anterior (`recortarORolo` com a opção de testar só o ponto do anel mais perto de quem olha): cada anel do pé era decidido por um ponto só, mas o furo era o casco do par de anéis inteiro. De cima, no começo, o casco abria no rolo dois furos em U, e por eles apareciam o pé e a haste, que ficam 8 a 24 cm abaixo do rolo. No fim (u = 1) o recorte é necessário: o calcanhar sobe 3,2 cm acima do topo do rolo. A conferência da pintura não via a máscara do item e deu "sem achado" com os furos.

**O que mudou.**

- **O furo, faceta por faceta** (`pecas-de-cena/cadeira-flexora.ts`, `recortarORolo`, que a mesa usa): cada faceta da malha do pé (entre os anéis i e i + 1, nos pontos k e k + 1 do anel, e as tampas das pontas), virada para quem olha, só é furada quando os quatro cantos, na pele, têm o caminho livre até quem olha (o raio não atravessa o rolo, na conta exata do cilindro). Cada canto sai 0,4 cm para fora da pele (o traço do contorno), só onde esse ponto também é livre: na beira em que o pé passa para trás do rolo, o furo para na pele. Só entram as facetas na caixa do rolo na tela; todas vão num caminho só, no mesmo sentido (sem fresta entre vizinhas). A opção de um ponto só saiu.
- **A haste também leva a máscara.** No erro "Rolo no lugar errado", de cima, no fim, o pé fica na frente do rolo e o furo é certo, mas a haste que atravessa o rolo era pintada depois do pé e aparecia pelo furo, por cima dele (15 cm² em cada pé). Agora a máscara vale para a haste e o rolo, e a pele atrás da haste, onde ela sai do rolo, não é furada. O pintor por pares continua ligado e a haste continua 2 cm para trás na ordem (`hasteAtras`).
- **A conferência da pintura vê a máscara** (`conferir-pintura.ts`): a peça guarda os furos no item (`Item.fora`, na tela, como os remendos do pintor); dentro deles a peça não conta como pintada, e a pele que aparece por um furo estando atrás da peça vira achado ("parte do corpo pintada sobre a peça, a peça está na frente"). Na beira do furo (um ponto da grade, 0,5 cm), por onde ele passa da pele de propósito para mostrar o traço, a pele que aparece não conta.
- **A regra pelos dois lados** (`mesa-flexora-pes-por-cima-do-rolo`, `regras/mesa-flexora.ts`): além dos anéis na frente do rolo que ele não pode cobrir, os anéis atrás dele (a face do rolo a mais de 1 cm da pele) não podem aparecer por cima dele, nem por um furo nem pela ordem, salvo quando outra pele fica entre o rolo e quem olha naquele ponto. A regra mede com o pintor ligado na animação (o por pares, com os remendos) e lê os furos no item.

**Os números** (área dos furos dentro do rolo na tela, numa grade de 0,1 cm; "errado" = o rolo fica na frente de toda a pele ali, contando 0,5 cm de traço; técnica e erros, u = 0, 0,25, 0,5, 0,75, 0,9 e 1):

| de cima | antes | depois |
|---|---|---|
| técnica, u = 0: furo errado | 126 cm² | 0 |
| técnica, u = 1: furo certo / errado | 31,7 / 0 cm² | 31,7 / 0 cm² |
| erro "Rolo no lugar errado": furo errado | 0 | 0 |
| erro "Levantar o quadril", u = 0: furo errado | 126 cm² | 0 |
| todos os quadros medidos, de cima: furo errado / certo | 371 / 227 cm² | 0 / 227 cm² |
| de três quartos (vista dos quadros grandes): furo errado | 837 cm² | 0 |

| conferência | antes | depois |
|---|---|---|
| a regra, de cima: anéis atrás do rolo que aparecem por cima dele | 5 de 5 em cada canela e cada pé (técnica, quadro 1) | 0 de 7 em cada canela, 0 de 5 em cada pé |
| a regra, de cima: anéis na frente do rolo cobertos por ele | 0 de 9 em cada pé | 0 de 9 em cada pé |
| a pintura, vendo a máscara | o rolo furado sobre os pés (22,8 cm² cada) e as canelas (4 cm²), a haste sobre os pés pelo furo (15,3 cm² cada) | nada |
| a pintura, como estava (sem ver a máscara) | o rolo sobre os pés no erro do rolo, 42 cm² cada (os furos certos, que ela não via) | — |

O "antes" da regra e da pintura que vê a máscara foi medido no recorte antigo com os furos guardados no item (o mesmo desenho de antes).

**O desenho.** Só a mesa flexora e a cadeira extensora mudam (abaixo, e em `cadeira-extensora.md`); as outras 169 dão o mesmo SVG, caractere por caractere, em 15.210 quadros (12 tempos na técnica, 3 no cor de pele e escuro, 6 nos músculos e 2 na trajetória em cada vista do guia, 6 de cada erro em cada vista, e a miniatura). Na mesa, o SVG muda nos 71 quadros da amostra (a máscara mudou de forma em todos); os pixels, a 480 × 360, em 61, até 0,26% da figura (de cima, no começo: os furos em U somem).

**Conferência automática:** `node scripts/animacao-nova/conferir.mjs mesa-flexora`: 0 falha (antes, 1: a pintura), 2 avisos (os de antes). Folha do pintor regravada ([`../pintor-por-pares/mesa-flexora.png`](../pintor-por-pares/mesa-flexora.png): hoje 358 cm², 10 achados, por pares 0; a de antes dizia 442 → 84 cm², porque a conferência não via os furos). Quadros grandes regravados (`../quadros/mesa-flexora.png`, agora com o pintor por pares, como o app: `scripts/animacao-nova/olhar.mjs` passou a entregar o pintor ao motor). Olhei de lado e de cima o começo, o meio e o fim, os dois erros nas duas vistas e de três quartos.

**O que ainda não ficou bom:**

- Onde o calcanhar fica pouco acima da beira do rolo (de cima, na volta, perto de u = 0,3 e 0,8), o furo aparece como dentes pequenos na borda de cima do rolo, de alguns milímetros: é o pé que está mesmo na frente dele ali (o rolo baixa na beira), mas no zoom lê-se como um serrilhado no contorno do rolo. No tamanho do app, menos de um pixel.
- Num zoom grande, a folga de 0,4 cm do furo mostra uma faixa fina do que está atrás do rolo (o fundo ou a coxa) junto do contorno do pé; no tamanho do app, o traço do contorno (2,5 px) a cobre.
- A regra de contato de 1 cm da conferência da pintura continua apagando o calcanhar que encosta no rolo no fim (u = 1): quem confere esse trecho é a regra da mesa, que não usa essa tolerância para os anéis na frente do rolo.
