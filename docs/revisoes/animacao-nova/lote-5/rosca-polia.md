# Lote 5 · Rosca direta na polia com barra reta (`rosca-polia`)

De 15/11/2026. Quarta animação da família "braços na polia" (`polia-braco`). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-polia.md`; texto do app: `src/conteudo/exercicios/rosca-polia.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-polia.json`.
- Animação: `src/engine/novo/exercicios/rosca-polia.ts`, sobre o núcleo `exercicios/polia-bracos.ts` (corpo em pé, coluna e cabo) e o braço da rosca (`bracoDaRosca`, de `exercicios/dobrar-o-cotovelo.ts`, importado sem mudar).
- Peça nova: `src/engine/novo/pecas-de-cena/polia-braco-barra-reta.ts`, com as medidas em `src/engine/novo/dados/objetos/polia-braco-barra-reta.json` (objeto `barraRetaPolia`).
- Regras novas medidas: `src/engine/novo/regras/polia-bracos.ts` (`polia-braco-polia-embaixo`, `-barra-na-largura-dos-ombros`, `-barra-fora-do-corpo`); usa também as regras das roscas (`cotovelo-parado-na-rosca`, `braco-estendido-embaixo-na-rosca`, `carga-perto-do-ombro-no-topo`, `palma-para-a-frente-na-rosca`) e `polia-braco-ombros-para-tras`, `polia-braco-cabos-livres-do-corpo`.
- Folha ao lado da de hoje: `../prototipos/folha-rosca-polia.png`. Quadros grandes: `../quadros/rosca-polia.png`.

## Como resolve cada quadro

- **O corpo em pé:** pés na largura do quadril, joelhos a 10°, tronco reto; a pelve parada onde o centro de massa (braços no meio do caminho) cai no meio do pé.
- **O braço:** o úmero parado ao lado do tronco, 8° à frente da linha dele e sem abrir (`bracoDaRosca`); o antebraço dobra em volta de um eixo de lado a lado, aberto 2° para fora (o ângulo de carregamento), palmas para cima. Assim o centro de cada mão fica sempre à mesma distância do meio: a barra reta não muda de largura (a correção de 04/11).
- **Embaixo:** o cotovelo dobra o mínimo da ficha (10°) ou o que a barra precisa para passar 1,5 cm à frente das coxas (`resolver1`, com a barra como fila de esferas): deu 14,5°.
- **A barra e a coluna:** a barra atravessa as duas palmas; a aba e o mosquetão saem do meio dela na linha do cabo, que vai reto até a roldana no ponto mais baixo da coluna (17,8 cm), 52 cm à frente da pelve. A pilha sobe o curso do cabo dividido por 2, com 2 cm de "cabo tenso" embaixo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica e o texto do app pedem | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Carro no ponto mais baixo, com a barra reta; de frente para a torre, a meio passo | consenso | roldana a 17,8 cm do chão, 52 cm à frente do meio da pelve | sim |
| Pés na largura do quadril, joelhos destravados | consenso | bolas dos pés a 11 cm do meio; joelhos a 10° | sim |
| Pegada por baixo, na largura dos ombros (barra de largura fixa: 36–38 cm) | consenso | palmas supinadas de 89,9° a 90,8°; mãos a 37,8 cm o ciclo todo, cada uma no eixo da barra | sim |
| Cotovelos encostados nas laterais, ombros para trás | consenso | o cotovelo anda 0 cm; o braço 8° à frente da linha do tronco, 0° para o lado; a clavícula 6° atrás do ritmo | sim |
| Embaixo: braços quase estendidos, cabo tenso, barra na altura das coxas | consenso | cotovelo a 14,5°; a barra a 78 cm do chão, 2,6 cm à frente da pele das coxas; a pilha já sai 2 cm | sim |
| Subida ~1 s, dobrando só o cotovelo | consenso | 1,1 s; o cotovelo vai de 14,5° a 132° | sim |
| Em cima: barra perto dos ombros, cotovelos no lugar | consenso | o centro da mão a 26,3 cm do centro do ombro (4,4 cm abaixo dele) | sim |
| Descida ~2–3 s | consenso | 2,4 s | sim |
| Cabo reto, sem encostar no corpo | consenso | no mínimo 9,9 cm da pele | sim |
| Tronco parado | consenso | a base do pescoço anda 0 cm | sim |
| Cabo e pilha | medida | o cabo anda 49,9 cm e a pilha sobe 25,0 cm (2:1) | sim |

Conferência automática: **0 falha**. Avisos: (1) supinação de 90,8° (palmas para cima numa barra: fica no limite da média); (2) linhas de desenho: pescoço, cabeça, o ângulo de carregamento (2°) e a folga da barra; (3) músculos: o antebraço aparece como "só ajuda" (como nas outras roscas, correção de 04/11), fora da lista do conteúdo. Ritmo: 5,8% (limite 15%).

## As vistas

A primeira é a **de lado** (a de hoje): cotovelo parado, só o antebraço sobe, o cabo até a roldana. A segunda é a **de três quartos pela frente** (`quina`): mostra a barra nas duas mãos, a largura da pegada e a coluna; é a padrão do modo Músculos (bíceps: 119 cm² no pior instante, contra 55 de lado). Testei de frente: a coluna fica entre quem olha e o corpo e cobre o boneco (o bíceps mede 193 cm², mas o corpo some atrás da coluna); de trás e de três quartos por trás, o bíceps não aparece (0).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Cotovelos vão para a frente (de lado, no fim) | o braço vai de 8° a 48° à frente da linha do tronco: o cotovelo anda 17,7 cm para a frente e 10,5 cm para cima, e a barra passa da altura do ombro |
| Balançar o tronco (de lado, no fim) | o peito começa 10° à frente e termina 14° atrás da vertical, com a lombar arqueada 12° |

## O equipamento

- **Barra reta curta (nova):** Rogue Stainless Straight Lat Bar, 20 pol (50,8 cm), 28,5 mm de diâmetro, 3,0 kg, aba giratória de 3/8 pol (página lida por resumo automático). A altura da aba (5 cm) e o mosquetão (8 cm) são **provisórios** (a página não dá). Desenho do gerador realista: barra de aço, aba de aço e mosquetão preto.
- **Coluna e cabo:** as peças da tabela, com a pilha.

## Correções já feitas que esta animação respeita

- A barra reta tem largura fixa: as mãos a 36–38 cm o ciclo todo (04/11; medido: 37,8 cm sem variar).
- O antebraço "só ajuda" (como nas outras roscas).

## O que não ficou bom

- **Embaixo o cotovelo fica a 14,5°**, e não nos 10° do mínimo da ficha: com 10°, a barra (50,8 cm, mais larga que o quadril) entrava nas coxas. A regra das roscas aceita até 15°.
- **A trajetória do cotovelo não aparece** (quadro `lateral:traj:f1`): o cotovelo não anda, e a linha dele tem tamanho zero; só a da barra fica com nome.
