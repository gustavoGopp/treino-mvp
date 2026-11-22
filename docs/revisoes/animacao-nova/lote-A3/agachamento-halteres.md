# Lote A3 · Agachamento com 2 halteres ao lado do corpo (`agachamento-halteres`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, pés na largura dos ombros com as pontas um pouco para fora, um halter de 25 lb em cada mão, braços estendidos ao lado do corpo; desce até a coxa passar da horizontal e sobe sem travar os joelhos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/agachamento-halteres.md`. Cartão do app: `src/conteudo/exercicios/agachamento-halteres.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/agachamento-halteres.json`.
- Animação: `src/engine/novo/exercicios/agachamento-halteres.ts`, sobre o núcleo comum dos agachamentos (`exercicios/agachar.ts`) e a conta da folga até as pernas do núcleo dos stiffs (`folgaDasPernas`, já exportada; nada mudou nele).
- Regra nova: `halteres-ao-lado-do-corpo` em `src/engine/novo/regras/agachamento-halteres.ts` (usa `folgaDaCarga`, já exportada em `regras/stiffs.ts`). Também usa a regra existente `carga-nao-encosta-nos-pes`.
- Quadros grandes: `../quadros/agachamento-halteres.png`. **Sem folha** (o exercício não tinha animação).

## Onde os números saem

A ficha manda seguir, por analogia, o goblet aprovado. Do agachamento com o peso do corpo aprovado (que é o goblet sem carga e com os calcanhares no chão, como pede este cartão) vêm a amplitude (joelho a 126°, selo moderada: amplitude completa), as pontas a 15° para fora, a inclinação do peito embaixo (33°, selo `desenho`) e os erros desenhados. A largura dos pés sai da tabela do corpo: "pés na largura dos ombros" = o centro de cada pé a meia largura biacromial (20,4 cm). **O braço não tem ângulo escolhido:** ele pende estendido e abre de lado só o que precisa para a cabeça do halter passar a 1,5 cm da pele da coxa ou da canela (medido na superfície do Boneco, como no stiff aprovado). Abrir o braço de lado não muda o centro de massa para a frente nem para trás, e o quadril fica onde o equilíbrio o põe.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura dos ombros, pontas um pouco para fora | consenso | centro de cada pé a 20,4 cm do meio; pontas a 15° | sim |
| Um halter em cada mão, ao lado do corpo, braços estendidos | consenso | cotovelo a 4° o tempo todo; o halter pende na vertical, cabo para a frente; o braço abre 7,2° em pé e 11,7° embaixo; da cabeça do halter à pele da coxa ou da canela, de 1 a 3,5 cm; o centro do halter fica no mínimo 6,1 cm por fora do joelho e do tornozelo | sim |
| Desce ~2–3 s, senta para trás e para baixo, até a coxa passar da horizontal | moderada | 2,4 s; embaixo, o joelho dobra 126°, o quadril dobra 135,5° e o centro do quadril fica 8,7 cm abaixo do centro do joelho | sim |
| Peito aberto, coluna reta | consenso | o peito inclina 34° embaixo; a lombar não dobra além da curva de repouso (0°) | sim |
| Joelhos na direção dos pés | consenso | o joelho anda a 8,2° da direção do pé, visto de cima | sim |
| Calcanhar no chão | consenso | o centro de massa (corpo + 2 halteres) fica a no máximo 0,3 cm do meio do pé | sim |
| Sobe empurrando o chão, sem travar os joelhos no topo | consenso | 1,3 s; em cima, o joelho dobra 8°; o último quadro emenda no primeiro (0 cm) | sim |
| O halter não bate no chão nem no pé (desenho) | desenho | o fundo do halter fica no mínimo a 9,3 cm do chão; embaixo, a 4 cm da pele do pé | sim |

**Conferência automática: 0 falha, 4 avisos**, os mesmos do agachamento com o peso do corpo aprovado (que tem 137,3° e 25,4°): (1) flexão do quadril embaixo, 135,5°; (2) dorsiflexão do tornozelo, 27,2°; (3) as linhas da ficha que são escolha de desenho; (4) de frente, o quadríceps quase não aparece (0 cm²) e o modo Músculos abre de lado (323 cm²).

## As vistas

As dos agachamentos aprovados: **de lado** (padrão: a descida, o calcanhar no chão e o tronco) e **de frente** (os joelhos na direção dos pés e os halteres por fora das pernas).

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Calcanhar sai do chão | de lado | o pé gira 14° na bola: o calcanhar sobe 4,8 cm e o centro de massa vai para a bola do pé; o joelho vai 9,8 cm mais para a frente (o mesmo desenho do agachamento com o peso do corpo aprovado) |
| Tronco cai para a frente | de lado | o peito inclina 53° (no certo, 34°) e a lombar dobra 30° além da curva de repouso ("dobrar a coluna para alcançar o fundo"); o fundo do halter chega a 3,2 cm do chão |
| Joelhos para dentro | de frente | cada joelho fica 10,3 cm mais para dentro que no certo, fora da linha do pé |

Nenhum erro ficou fora. O cartão diz "fechar os joelhos na subida"; o quadro parado é o de baixo (instante 1), como nos agachamentos aprovados.

## O equipamento

Dois halteres de 25 lb (11,3 kg) da tabela de objetos; os dois entram no equilíbrio.

## Correções já feitas que esta animação respeita

- Os músculos da biblioteca (quadríceps; glúteos e adutores), como os agachamentos aprovados (adutores, achado 6 da revisão de anatomia).
- O halter pende na vertical; o calcanhar fica no chão (não há anilha sob o calcanhar: o cartão não pede).

## O que não ficou bom

- **O rótulo "peito aberto"** aponta para a base do pescoço (`c7`), atrás. Tentei o ponto do esterno: de lado ele cai atrás do braço e o fio atravessava o rosto embaixo. Ficou o de trás, que fica limpo nos três quadros.
- **De lado, embaixo, o halter fica na frente do pé** (está ao lado dele, 4 cm por fora, mas de lado se sobrepõem). De frente se lê que ele passa por fora.
- **A cabeça embaixo** olha para baixo e à frente (o pescoço acompanha um quarto da inclinação do peito, como no agachamento com o peso do corpo aprovado).
- **Custo:** cada quadro custa 8 ms no computador (o goblet, 2,4 ms; o stiff unilateral aprovado, 20 ms), porque o braço é calculado contra a perna em duas passadas.
