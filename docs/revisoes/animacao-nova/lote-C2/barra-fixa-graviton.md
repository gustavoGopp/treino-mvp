# Lote C2 · Barra fixa assistida no graviton (`barra-fixa-graviton`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Ajoelhado na almofada do graviton, pegada pronada a 1,5 vez a largura dos ombros: puxa o corpo até o queixo passar das alças e desce até os braços estenderem. A almofada sobe e desce com os joelhos, numa alavanca que gira num eixo preso às colunas, e a pilha sobe quando ela desce (o contrapeso). **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/barra-fixa-graviton.md`. Cartão do app: `src/conteudo/exercicios/barra-fixa-graviton.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/barra-fixa-graviton.json`.
- Animação: `src/engine/novo/exercicios/barra-fixa-graviton.ts`, sobre o núcleo novo do corpo ajoelhado na almofada (`exercicios/graviton.ts`, que o mergulho no graviton também usa) e o núcleo aprovado do corpo pendurado (`exercicios/pendurado.ts`, sem mudança). Regras medidas: `src/engine/novo/regras/graviton.ts`, mais as da barra fixa aprovada (`regras/pendurado.ts`).
- A peça: `src/engine/novo/pecas-de-cena/graviton.ts`, medidas em `dados/objetos/graviton.json`, folha em `docs/revisoes/animacoes-restantes/pecas/folha-graviton.png`.
- Quadros grandes: `../quadros/barra-fixa-graviton.png`. Sem folha ao lado da animação de hoje (não havia animação).

## Onde os números saem

A ficha da técnica manda fazer "igual à barra fixa". Por isso **os braços, as escápulas e o tronco usam os mesmos números da barra fixa aprovada** (`barra-fixa.json`), um a um (fonte `barra` na ficha de movimento): o cotovelo a 8° embaixo, as escápulas descem até 30% da subida, os braços puxam a partir de 24%, o tronco vai 6° para trás no topo, o queixo 3 cm acima, para onde o cotovelo aponta. A subida também anda pela dobra do cotovelo, como lá.

O que muda é **o que segura o corpo**. Na barra aprovada, o corpo pende das mãos, e a bacia vai para a frente ou para trás até o centro de massa ficar na vertical delas. Aqui os joelhos ficam na almofada, que empurra para cima: a bacia sai de duas condições, (1) o braço alcança a alça com a dobra de cotovelo do quadro (a mesma conta da aprovada) e (2) o centro do joelho fica à distância certa do eixo da alavanca. O ângulo da alavanca sai daí; a canela deita ao longo da almofada, com a frente dela no topo do estofado (como o joelho no chão em quatro apoios). As pernas: as coxas quase na vertical (o quadril a 3° e, no topo, a −3°, para a coxa ficar no mesmo ângulo do chão quando a bacia gira 6° para trás), os pés soltos atrás, a ponta esticada. São escolha de desenho: a ficha só diz "joelhos na plataforma".

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Joelhos na plataforma de apoio | consenso | a frente das canelas fica a −0,4 cm do topo da almofada (amassa o estofado 0,4 cm) nas duas pernas, em todos os quadros; o joelho anda 0 cm ao longo da almofada | sim |
| A plataforma sobe e desce com o corpo; o contrapeso ajuda | consenso | a almofada vai de 49,4 cm (braços estendidos) a 103,8 cm do chão (topo); a alavanca gira de −28,6° a +26,4° (7,6° abaixo do batente de cima); as placas ficam 16,4 cm acima do repouso embaixo e 2 cm no topo (o arco do came, diferença 0 cm) | sim |
| Pegada pronada a ~1 a 1,5 vez a largura dos ombros | consenso | o polegar aponta para dentro (no mínimo 91%); as mãos a 1,5 vez a largura dos ombros (61,2 cm de centro a centro) | sim |
| As mãos seguram as alças | consenso | o centro da pegada a 0 cm do eixo da alça, a mão fechada no diâmetro dela (3,9 cm); a pegada anda 0 cm | sim |
| Embaixo, os braços estendidos | consenso | o cotovelo dobra 8° | sim |
| Primeiro as escápulas descem (da barra fixa) | consenso | quando o cotovelo começa a dobrar, o ombro já desceu 2,6 cm (de 4,2 cm) e o corpo já subiu 3,9 cm | sim |
| Sobe até o queixo passar da barra | consenso | no topo, o queixo fica 3 cm acima do alto das alças; a frente do peito fica 10,7 cm à frente da linha delas (as alças são duas, uma de cada lado, e o peito passa entre elas) | sim |
| Ombros longe das orelhas (da barra fixa) | consenso | do alto do ombro à base do crânio: 16,1 cm embaixo e 20,4 cm no topo (em pé: 18,7 cm) | sim |
| Cotovelos para os lados das costelas (da barra fixa) | consenso | no topo, o cotovelo fica 18,6 cm abaixo do ombro e 6,5 cm à frente da linha da coluna (o peito tem 22,6 cm de fundo) | sim |
| "Corpo parado" (cartão) | consenso | a bacia sobe 54,5 cm e anda 7,2 cm para a frente e para trás (13% do que sobe; limite 20%): é o arco da almofada, que leva o joelho 7 cm para a frente nas pontas do caminho | sim |
| O corpo não atravessa as alças | consenso | fora as mãos, a pele fica a no mínimo 2,2 cm das alças (o antebraço) | sim |
| Ritmo (~1–1,5 s subindo, ~2–3 s descendo) | consenso | 1,5 s e 2,6 s, os da barra fixa aprovada; salto de velocidade de 15% do pico (limite 25%) | sim |

Comparação com a barra fixa aprovada: lá a bacia sobe 53,8 cm; aqui, 54,5 cm (a alça fica 16,6 cm mais baixa que a barra da torre, e o corpo inteiro também).

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (as da barra fixa aprovada, que lá também eram, e as das pernas ajoelhadas). (2) Os músculos: o trapézio do meio como secundário dentro de "costas" e o antebraço como "só ajuda", as mesmas diferenças aceitas da barra fixa aprovada.

## As vistas

**De lado** é a padrão do modo Técnica: mostra o queixo passando a alça, a almofada subindo e descendo com os joelhos e a pilha (o contrapeso), que entra no enquadramento. **De três quartos, por trás** é a segunda e a padrão do modo Músculos (o dorsal: 369 cm²; de lado, 176 cm²). Testei também: por trás (como a barra aprovada), mas embaixo a almofada, que inclina para quem olha, fica pintada por cima das canelas e, no topo, tapa as pernas (a oclusão é a de verdade, e a vista não se lê); de três quartos pela frente, a máquina fica entre quem olha e o corpo; de cima, um borrão.

## Erros (os dois do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Encurtar a descida | de lado | embaixo, o cotovelo fica dobrado 75° (o certo: 8°), o mesmo da meia repetição da barra fixa aprovada; a almofada para mais alto |
| Balançar | de lado | no meio da subida, o quadril dobra até 50° e o tronco tomba 12° à frente (a bacia vai para trás em volta dos joelhos, que continuam na almofada) e, no começo, a lombar arqueia 14° |

O balanço é desenhado em volta dos joelhos porque eles ficam presos na almofada: o chute das pernas da barra fixa aprovada não é possível aqui.

## O equipamento

O graviton novo (`pecas-de-cena/graviton.ts`): duas colunas com uma alça de barra no alto de cada uma (as alças são duas, como no cartão de hoje: na paralela a cabeça passa entre elas) e uma alça de paralela no meio, os degraus por fora, a torre da pilha à frente e a almofada na alavanca. As medidas e as fontes estão na folha da peça. Nesta animação, as alças de paralela (que passam na frente da cintura, de lado) vão para trás do corpo, como cenário; a estrutura toda é cenário, cortada pela borda do quadro; a alavanca, a almofada e o came são pintados na ordem certa de profundidade, com a almofada um pouco para trás (as canelas ficam por cima dela).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício (ele nunca teve animação). Respeita as da barra fixa: a pegada de 1,5 vez (e não 1,8) e a cabeça que passa atrás da alça no topo.

## O que não ficou bom

- **A almofada inclina bastante:** de −29° (embaixo) a +26° (no topo). No topo, os pés ficam levantados atrás. É a consequência de uma almofada presa a uma alavanca que gira; com o eixo nas colunas (como no cartão de hoje), o raio da alavanca fica em 59 cm. Um raio maior inclinaria menos, mas poria o eixo dentro da torre da pilha. Nenhuma ficha lida diz como a almofada anda (a Atlantis fala de "a linear bearing mechanism"; se for um trilho, a almofada ficaria na horizontal). Se o Gustavo preferir a almofada sempre na horizontal, a troca é na peça (um trilho vertical) e no núcleo (o joelho para de andar em arco).
- **O peito passa 10,7 cm à frente da linha das alças no topo.** Não há barra entre as alças, então nada é atravessado; mas o corpo fica um pouco mais à frente que na barra aprovada (lá o peito para atrás da barra).
- **Os fios dos rótulos de lado cruzam o braço levantado** nos quadros de baixo (como na barra fixa aprovada).
