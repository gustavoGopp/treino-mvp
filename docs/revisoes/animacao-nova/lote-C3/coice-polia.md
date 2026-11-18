# Lote C3 · Coice na polia com tornozeleira (`coice-polia`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de frente para a coluna de polia, as mãos nos montantes da frente dela; a tornozeleira na perna direita (a de perto, de lado), presa ao cabo da roldana mais baixa; a perna vai de à frente do corpo até a coxa passar um pouco da linha do corpo. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/coice-polia.md`. Cartão do app: `src/conteudo/exercicios/coice-polia.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/coice-polia.json`.
- Animação: `src/engine/novo/exercicios/coice-polia.ts`, com o núcleo novo `exercicios/polia-no-tornozelo.ts`; a tornozeleira nova (`pecas-de-cena/tornozeleira.ts`) e a coluna aprovada. Regras novas em `regras/avulsos-c3.ts`; as do peso no pé de apoio (`regras/abducao-em-pe.ts`) e das polias (`regras/polia-bracos.ts`) como estão.
- Quadros grandes: `../quadros/coice-polia.png`.

## Em pé ou em quatro apoios

A ficha da técnica pede o coice **em pé** ("de frente para a torre, mãos apoiadas nela"), e o cartão também. Os coices aprovados (`quatro-apoios.ts`, com caneleira, elástico e na máquina) são em quatro apoios, com o joelho a 90°: não servem. O corpo em pé segue a abdução na polia (o equilíbrio sobre o pé de apoio da abdução com elástico aprovada).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De frente para a torre, mãos apoiadas nela | consenso | as duas mãos fecham nos montantes da frente da coluna, a 112 cm do chão (0 cm do eixo, paradas), os cotovelos a 20° no começo | sim |
| Polia no ponto mais baixo, tornozeleira na perna que trabalha | consenso | o carrinho a 17,8 cm; a tornozeleira 2 cm acima do centro do tornozelo, assentada (0,7 cm além da pele) | sim |
| Tronco levemente inclinado à frente | consenso | o peito a 13,3° da vertical, parado (a bacia gira 12° sobre o quadril de apoio, com a coluna neutra) | sim |
| Leva a perna para trás até a coxa passar um pouco da linha do corpo; volta até a frente do corpo | um estudo | de lado, a coxa vai de 22,3° à frente da vertical a 18,1° atrás dela, 8,9° além da linha do corpo (que desce dos ombros ao quadril) | sim |
| Joelho quase estendido | um estudo | **8° o ciclo todo** (limite da ficha de movimento, `joelho.maximo`: 15°); o pé passa embaixo do quadril a 1 cm do chão | sim |
| Sem arquear a lombar | consenso | a lombar não passa da curva de repouso (0°) | sim |
| (O peso no pé de apoio; a bacia parada) | consenso | o centro de massa de 37% a 37,2% do calcanhar à ponta do pé de apoio, sobre o eixo dele; a bacia sobe 3,9° do lado que trabalha e fica assim o ciclo todo (não rola nem gira no movimento); o tórax fica reto (0,9°); a coxa abre 5° para o lado (o pé passa ao lado do outro) | sim |
| O cabo da roldana ao tornozelo, a pilha que sobe | consenso | o cabo a no mínimo 7,2 cm da pele; anda 43,2 cm e a pilha sobe 21,6 cm (relação 2:1) | sim |

**Conferência automática: 0 falha, 1 aviso** (as linhas que são escolha de desenho).

## A revisão de 18/11: o joelho que trabalha

Na primeira versão, o joelho dobrava até 34° no meio do chute, e o rótulo dizia "joelho quase estendido". A conta: com a bacia nivelada e o joelho de apoio a 3°, a perna livre estendida e na vertical é ~1 cm mais comprida que a distância do quadril ao chão, e o calcanhar fica 7,2 cm abaixo do tornozelo. Das saídas propostas:
- **o tronco mais inclinado à frente** não muda a altura do quadril (a bacia gira em volta dele): não ajuda;
- **o joelho de apoio mais dobrado** abaixa o quadril e piora (cada grau a mais tira altura);
- **a perna começando mais à frente** não muda o meio do caminho, onde a coxa passa pela vertical;
- **a bacia subindo do lado que trabalha** resolve: 4° (`bacia.sobe`) levantam o quadril que trabalha 1,2 cm. Com a abertura de 5° (0,3 cm), o joelho fica em 8° e o pé passa a 1 cm do chão.

A bacia sobe em volta do quadril de apoio, que fica no lugar, e fica parada assim o ciclo todo (3,9° medidos; não rola no movimento). A coluna devolve a inclinação, metade na lombar e metade na torácica: o tórax fica reto (0,9°). É o que o corpo faz em pé num pé só para a perna livre passar, e não é o erro "embalar" (o tronco não balança) nem "arquear a lombar" (a lombar não se estende). A regra `coice-polia-joelho-quase-estendido` mede o joelho em todos os quadros (até 15°), e `coice-polia-bacia-nao-gira` aceita até 5° de bacia, parada. O pé da perna que trabalha fica com a sola perto da horizontal (dobra até 14° para cima, abaixo da média da tabela de amplitudes).

## As vistas

**De lado** (padrão): a perna indo para trás, o joelho, a lombar parada, o cabo e a pilha. **De três quartos, por trás** (segunda e a do modo Músculos): o glúteo da perna que trabalha. De trás, a perna vem para quem olha e some; de frente, a coluna cobre o corpo.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar | de lado | a lombar arqueia 16° no fim e a coxa vai a 36° atrás da vertical; o tronco sobe (o peito a 2,7° para trás da vertical) |
| Dobrar o joelho | de lado | o joelho dobra até 75° no fim: vira uma flexora |
| Embalar | de lado | o tronco cai 16° a mais à frente (o peito a 29,3°) enquanto a perna vai para trás; os cotovelos dobram até 92° |

## Os dois lados

As duas mãos nos montantes (0 cm do eixo de cada um, paradas); o pé de apoio parado; a perna que trabalha com a tornozeleira. Olhei a mão e a perna de longe nas duas vistas.

## O que não ficou bom

- **A bacia fica 3,9° mais alta do lado que trabalha.** De trás se percebe pouco; o tórax fica reto. É a saída que deixa o joelho quase estendido.
- **No erro de arquear a lombar, o tronco sobe e os braços esticam** (cotovelo a 2°): as mãos ficam presas na torre.
- A tornozeleira tem a argola e o mosquetão provisórios.

**Risco de o Gustavo não gostar: médio** (é o primeiro coice em pé do motor; a bacia levemente alta do lado que trabalha).
