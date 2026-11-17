# Lote A2 · Abdução de quadril em pé com elástico preso sob o outro pé (`abducao-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de lado para a parede (à esquerda), a mão esquerda espalmada nela, a direita na cintura; o peso no pé esquerdo, que pisa no elástico; o elástico dá a volta na perna direita logo acima do tornozelo. A perna direita abre para o lado, estendida, com os dedos para a frente, e volta até quase encostar na outra. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-elastico.md`. Cartão do app: `src/conteudo/exercicios/abducao-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-elastico.json`.
- Animação: `src/engine/novo/exercicios/abducao-elastico.ts` (nova, sem núcleo de outra: a abdução deitado e a com mini-band aprovadas são deitada e sentada). Regras medidas novas: `src/engine/novo/regras/abducao-em-pe.ts`. Peça de cena nova: `src/engine/novo/pecas-de-cena/parede-ao-lado.ts` (a parede da panturrilha em pé no chão, girada). Objeto novo: `src/engine/novo/dados/objetos/elastico-longo-pisado.json`.
- Quadros grandes: `../quadros/abducao-elastico.png`. **Sem folha** (não havia animação).

## Onde os números saem

A ficha da técnica dá a técnica em palavras: de lado para a parede, elástico sob o pé de dentro e no tornozelo de fora (consenso); perna para o lado, estendida, dedos para a frente, tronco reto (`macadam2015`, um estudo); a mão na parede para o equilíbrio. **Nenhum número.** O que falta saiu de:

- **A amplitude:** 25° de abertura da coxa na bacia (selo `desenho`). A ficha não dá número; o pedido é "sobe pouco", sem o tronco inclinar nem a bacia subir. Fica abaixo da média de 40° da AAOS e dos 35° da abdução deitado aprovada, porque em pé, com a bacia parada, a perna abre menos. Embaixo, a perna de fora fica a 2 cm da outra ("quase encostar", o cartão), o que dá 3,2° de abertura.
- **O equilíbrio numa perna:** o corpo inteiro anda para cima do pé de apoio enquanto a perna abre (a bacia vai de 8,5 a 11 cm para o lado da parede, nivelada); o centro de massa fica sobre o meio do pé de apoio (calibrado embaixo e em cima, e misturado no caminho). A mão "só equilibra" (o cartão).
- **A mão na parede:** espalmada, os dedos para cima, como na panturrilha em pé no chão aprovada; o punho 5 cm acima do ombro e o cotovelo dobrado 80°, apontando para o chão. A distância da parede sai daí (o punho fica uns 43 cm para o lado do ombro). Com a mão mais baixa e o braço esticado até a parede, o punho dobrava 97° para trás (a conferência falhou).
- **A mão de fora na cintura:** a do afundo com o peso do corpo aprovado.
- **O pé de fora no ar:** embaixo, ele só roça o chão (0 cm), sem apoiar; para isso o joelho de fora dobra 8,7° (o resto do tempo, o mesmo; "estendida", sem travar).

**O elástico:** o cartão pede "um elástico em laço, ou longo com um nó". Usei o laço longo da tabela (41 pol, `elastico-longo.json`, o mesmo do tríceps com elástico aprovado). Pisado pelo pé inteiro, ele fica preso: só o trecho entre o lado de dentro do pé que pisa e o tornozelo de fora estica; o resto do laço passa sob a sola e fica deitado no chão, do lado da parede, sem esticar. Para a conferência medir o alongamento do trecho que estica, criei o objeto `elasticoLongoPisado` (`dados/objetos/elastico-longo-pisado.json`): o comprimento em repouso desse trecho (47 cm, **escolha de desenho**: quem pisa escolhe onde pisar, e o desenho pisa onde a faixa fica esticada com as pernas juntas) e o alongamento máximo da mesma faixa (2,5 vezes, RubberBanditz, a mesma fonte do laço longo). Não usei a mini band: no app ela é outro equipamento (`mini_band`), e este exercício pede "elásticos".

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De lado para a parede, a mão de dentro nela | consenso | a palma a 0 cm da face da parede, parada no ciclo (0 cm) | sim |
| Elástico sob o pé de dentro (pé inteiro) | consenso | as duas camadas passam sob a sola de 47% a 62% do caminho do calcanhar à bola do pé, a 0,2 cm do chão; o calcanhar no chão; o pé não anda (0 cm) | sim |
| ... e em volta do tornozelo de fora | consenso | a volta fica 4 cm acima do centro do tornozelo, assentada na pele (0,5 cm além dela, metade da espessura e a meia) | sim |
| Perna para o lado, estendida | um estudo | a coxa abre de 3,2° a 25° na bacia; o joelho de fora dobra 8,7° | sim |
| Dedos para a frente | um estudo | os dedos do pé que sobe ficam a 0° da frente do corpo | sim |
| Tronco reto (a bacia não sobe nem gira; o tronco não inclina) | consenso | a bacia sobe 0° de um lado e gira 0°; o tronco inclina 0° para o lado | sim |
| Até a perna quase encostar na outra | consenso | 2 cm entre os pés, embaixo; a menor folga entre as pernas no ciclo é 1,7 cm | sim |
| Equilíbrio numa perna, a mão só equilibra | consenso | o centro de massa fica a 37% do caminho do calcanhar à ponta do pé de apoio, a 0 cm do eixo dele, o ciclo todo | sim |
| ~1 s abrindo, pausa curta, ~2 s voltando | consenso | 1,1 s, 0,6 s, 2,1 s; salto de velocidade de 4,7% do pico; o ciclo emenda (0 cm) | sim |
| O elástico estica e não atravessa o corpo | física | o trecho que estica vai de 1,0 vez (pernas juntas) a 2,0 vezes (aberto); máximo do fabricante 2,5 vezes. Passa a no mínimo 0,9 cm da pele (canela) | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) O elástico estica de 1,0 a 2,0 vezes, mais no fim que no começo do ciclo (a regra geral espera o contrário). (2) As linhas de escolha de desenho (amplitude, mão na parede, mão na cintura, pé no ar, elástico). (3) Músculos: de frente o glúteo não aparece (0 cm²); o modo Músculos abre de trás (217 cm²).

## As vistas

**De frente** (padrão do modo Técnica): a perna que abre para o lado, o tronco reto, os dedos para a frente e o elástico do pé de apoio ao tornozelo. **De trás** (a segunda, e a padrão do modo Músculos): o glúteo que trabalha. De lado, a parede vira o fundo inteiro do quadro e a perna que abre fica na direção de quem olha; de cima, o corpo vira uma cruz. A parede é cenário (pintada atrás e fora do enquadramento).

## Erros (dois dos três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Inclinar o tronco | de frente | o tronco cai 15° para o lado da parede e a bacia sobe 6° do lado da perna que abre (em volta do quadril de apoio); a coxa abre os mesmos 25° na bacia e a perna sobe mais ("a perna sobe mais, sem o glúteo"). O elástico estica 2,4 vezes |
| Girar o pé para fora | de frente | a perna gira 35° para fora e os dedos apontam para o lado (o número do erro de rolar da abdução deitado aprovada) |
| Balançar a perna | — | **não desenhado.** A descrição do cartão é só ritmo ("o embalo tira o trabalho do glúteo; abra e volte devagar") e não diz uma consequência visível. Quem integra põe a exceção na lista `SEM_DESENHO` do teste da ponte |

## O equipamento

- **Elástico:** o laço longo de 41 pol da tabela, desenhado como a faixa do tríceps com elástico aprovado (a faixa chata, afinando ao esticar), em dois pedaços: o que estica e o resto do laço, no chão.
- **Parede:** a mesma parede lisa e clara da panturrilha em pé no chão (as mesmas cores), de lado.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das do elástico: a faixa afina ao esticar e se desenha onde ela passa (sob o pé, em volta da perna). Da abdução deitado: glúteo (um desenho só, que não separa o médio) do lado que trabalha.

## Mudança em arquivo comum

Nenhuma no motor. `exercicios/elastico-pisado.ts` (núcleo novo, meu) ganhou um parâmetro opcional para a espessura do elástico.

## O que não ficou bom

- **O joelho de fora dobra 8,7°** para o pé não raspar no chão embaixo (com a bacia nivelada, a perna de fora alcança o chão). A ficha pede "estendida": é "quase estendida, sem travar".
- **A volta do elástico na perna** se vê pouco de frente (o tornozelo é fino e a faixa tem 1,3 cm); de trás ela aparece melhor.
- **A sobra do laço no chão** (uns 70 cm de cada camada, do lado da parede) aparece de frente e de trás como uma linha no chão, e de cima como uma faixa comprida para a frente. É o que o laço longo faz quando é pisado, mas pode confundir.
- **O objeto `elasticoLongoPisado`** é uma escolha de desenho (o comprimento do trecho que estica), não uma medida de fabricante: a conferência mede o alongamento contra ele.
- **No erro de inclinar,** o fio do título passa perto da mão na parede.
