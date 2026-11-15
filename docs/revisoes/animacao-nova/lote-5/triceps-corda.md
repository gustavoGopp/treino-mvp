# Lote 5 · Tríceps na polia com corda (`triceps-corda`)

De 15/11/2026. O tríceps com a corda empurrando para baixo, no motor novo. Em pé, de frente para a coluna, a polia no alto, os pés na largura do quadril, o tronco levemente inclinado à frente; os cotovelos colados ao lado do tronco e só o antebraço desce. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-corda.md`; texto do app: `src/conteudo/exercicios/triceps-corda.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-corda.json`.
- Animação: `src/engine/novo/exercicios/triceps-corda.ts` (arquivo próprio: o braço ao lado do corpo não cabe no núcleo do francês, que deixa o braço acima da cabeça). Usa a corda (`pecas-de-cena/corda-triceps.ts`) e a coluna de polia (`pecas.ts`) como estão.
- Regras novas medidas: `src/engine/novo/regras/triceps-corda.ts` (prefixo `triceps-corda-`). Usa também duas regras do francês que servem como estão: `triceps-frances-corda-livre-da-cabeca` (a corda e o cabo não encostam no corpo) e `triceps-frances-corda-na-mao` (cada ramo esticado da mão à bucha).
- Folha ao lado da de hoje: `../prototipos/folha-triceps-corda.png`. Quadros grandes: `../quadros/triceps-corda.png`.

## Como cada quadro é resolvido

- **O braço parado:** o braço (ombro → cotovelo) é uma direção fixa no tronco, 15° à frente da linha do tronco (com o tronco a 15°, fica na vertical) e 2° para o meio, até a pele do braço encostar ao lado das costelas. O cotovelo não anda (0 cm).
- **Só o antebraço:** ele dobra de 112° (em cima) a 4° (embaixo), à frente. Em cima ele gira em volta do braço até as duas mãos ficarem a 13 cm uma da outra (cada uma num ramo, junto da ponta); esse giro volta a zero, sem tranco, até embaixo, e as mãos terminam embaixo dos cotovelos, ao lado das coxas: a corda abre sozinha, de 13 para 32,4 cm.
- **A pegada:** neutra, com o polegar para cima e para trás em cima e para a frente embaixo; a corda sai do lado do polegar e vai reta até a bucha.
- **A polia:** a roldana no alto da coluna (193 cm, a altura máxima da tabela). A coluna fica à frente, onde o cabo, em cima, sai 20° da vertical: a "meio passo" do texto do app. A pilha sobe o curso do cabo dividido pela relação (2:1).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Carro no ponto mais alto, com a corda; de frente para a torre, a cerca de meio passo | consenso | roldana a 193 cm; o cabo sai 20° da vertical em cima; a base da coluna começa a uns 28 cm da ponta dos pés | sim |
| Pés na largura do quadril; joelhos destravados | consenso | cada pé a 11 cm do meio; joelhos a 10°; os pés não saem do lugar | sim |
| Tronco levemente inclinado à frente (até ~20°), parado | consenso | o peito fica a 15° da vertical em todos os quadros; a lombar e a torácica não mudam | sim |
| Cotovelos colados nas laterais do tronco | consenso | a pele do braço fica de 0,1 a 0,7 cm da pele do tronco; o braço fica 15° à frente da linha do tronco | sim |
| Em cima: mãos na altura do peito, cotovelos dobrados | consenso | cotovelo a 112°; o centro da mão fica 13 cm abaixo do acrômio, ao longo do tronco (o peito vai de 10,4 cm, na axila, a 31,6 cm, na 10ª costela) | sim |
| Extensão em ~1 s; no fim, abre a corda e leva as mãos para os lados das coxas | consenso | 1 s; as mãos vão de 13 a 32,4 cm uma da outra; embaixo, o centro da mão fica 7,8 cm para fora do centro do quadril | sim |
| Embaixo: cotovelo totalmente estendido; segure um instante | consenso | cotovelo a 4°; pausa de 0,5 s | sim |
| Volta em ~2 s, sem os cotovelos saírem do lugar | consenso | 2 s, pelo mesmo caminho; o cotovelo anda 0 cm | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs triceps-corda`): **0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho: a posição dos pés e da pelve, o pescoço, quanto o braço vai para o meio, a distância das mãos em cima e a inclinação do cabo). Medidas: ritmo com salto de 7% (limite 15%); a pilha sobe 29,9 cm para 59,8 cm de cabo (2:1); a corda e o cabo passam a no mínimo 3,7 cm da pele (a coxa, embaixo); cada ramo fica esticado com 25,2 cm em todos os quadros; supinação do antebraço até 62° (a pegada neutra), pronação 1,6°, punho reto; centro de massa sempre dentro do apoio dos pés.

## As vistas

- **De lado** (a primeira): o tronco inclinado e parado, o cotovelo parado ao lado do tronco, o antebraço que desce, a corda, o cabo e a pilha que sobe.
- **De trás** (a segunda): os cotovelos colados dos dois lados, a corda que abre embaixo e o tríceps. Tríceps visível (cm²): de trás 208, de três quartos de trás 161, de lado 56, de três quartos 24, de frente 0. **A vista padrão do modo Músculos é a de trás.**
- De frente ficou de fora: a coluna fica entre a câmera e o corpo.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Cotovelos sobem e saem do tronco (de lado; quadro parado em cima) | em cima, o braço sobe 45° à frente do tronco (no certo, 15°) e o cotovelo dobra 115°: as mãos sobem acima do peito; embaixo, volta ao certo |
| Debruçar o tronco (de lado; quadro parado embaixo) | o peito vai de 15° a 34° da vertical enquanto as mãos descem, com 8° de flexão da torácica: o corpo cai sobre a corda |

## O equipamento

- **Corda de tríceps:** a peça do francês, sem mudança (71,1 cm, ramos de 29,2 cm, Rogue; diâmetro de 2,5 cm, living.fit; ponta e bucha provisórias).
- **Coluna de polia:** a da tabela de objetos, com a roldana na altura máxima (193 cm, Life Fitness) e a pilha que sobe.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- A vista de lado como principal no tríceps (auditoria do acabamento, 04/11).
- A corda abre no tríceps (04/11): aqui abre de 13 a 32,4 cm. A animação de hoje abria até 61 cm; com os ramos da corda da Rogue (25,2 cm livres), a abertura máxima possível é de uns 42 cm, e 32,4 cm leva as mãos para os lados das coxas.
- Os músculos seguem a biblioteca (tríceps principal, sem secundário).

## O que não ficou bom

- **No modo Trajetória, o fio do nome "mãos" passa de leve pela frente da coxa** (`lateral:traj:f1`). O nome vai para o lado de fora da caixa do ciclo, e a coluna ocupa o lado direito; o fim da trajetória (as mãos ao lado das coxas) fica perto do corpo. Afastei a coluna (o cabo saindo 20° da vertical, em vez de 12°), o que abriu espaço entre o corpo e a coluna, mas o arranjo dos rótulos (`rotulos.ts`, comum) continua escolhendo a esquerda. Não mexi no arquivo comum.
- **De trás, a corda e o cabo quase não aparecem** (ficam na frente do corpo); só as pontas de borracha aparecem embaixo, ao lado das coxas. A vista de lado mostra a corda.
