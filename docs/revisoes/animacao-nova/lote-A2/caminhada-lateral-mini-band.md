# Lote A2 · Caminhada lateral com mini-band (`caminhada-lateral-mini-band`)

De 17/11/2026, com a segunda volta do mesmo dia (abaixo). Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto) e **o primeiro exercício do motor novo em que os pés saem do lugar**. Em pé, meio agachado, o tronco reto um pouco inclinado à frente, as mãos na cintura; a mini-band em volta das duas coxas, logo acima dos joelhos. O pé direito dá um passo largo para o lado, o esquerdo acompanha devagar até a largura do quadril, sem juntar; dois passos para a direita, dois de volta, e o corpo volta ao lugar do começo (o ciclo fecha). **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/caminhada-lateral-mini-band.md`. Cartão do app: `src/conteudo/exercicios/caminhada-lateral-mini-band.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/caminhada-lateral-mini-band.json`.
- Animação: `src/engine/novo/exercicios/caminhada-lateral-mini-band.ts` (sem núcleo: o corpo em pé sai de `resolverTronco`/`resolverMembros`, com as mãos na cintura do afundo aprovado, `maosNaCintura`). A faixa é a peça aprovada da abdução com mini-band (`lacoNasCoxas`), sem mudança. Regras medidas: `regras/caminhada-lateral.ts` (três) e a `quadril-faixa-acima-dos-joelhos` da abdução com mini-band aprovada.
- Quadros grandes: `../quadros/caminhada-lateral-mini-band.png`. Sem folha.

## A segunda volta (pedido de quem integra, 17/11)

Na primeira versão, de frente, o começo, o meio e o fim pareciam a mesma pessoa parada em pé: o pé subia 3 cm, o passo era de 22 cm (pés a 42 cm), o joelho dobrava 30° e o ciclo tinha um passo para cada lado. Mudou:

| | Antes | Agora |
|---|---|---|
| O pé que anda sobe | 3 cm | 9 cm (selo `desenho`: o cartão não dá número) |
| O passo | 22 cm (pés a 42 cm) | 46 cm (pés a 66 cm) |
| A faixa no passo | 1,6 vez | 1,9 vez |
| Meio agachado (joelhos com os pés na largura do quadril) | 30° | 40° |
| O ciclo | um passo para cada lado | dois passos para a direita e dois de volta (8 trechos, 9,4 s) |
| A vista que o app abre | de frente | de três quartos pela frente |

**Por que a faixa não chega ao máximo do fabricante (2,5 vezes):** para isso, os joelhos precisariam ficar a ~58 cm um do outro (a faixa de 61 cm dá a volta nas duas coxas). Com o quadril na altura do meio agachado, a perna de apoio endireita conforme o passo abre: com 46 cm de passo ela ainda dobra 20°; com 50 cm, 14° (quase reta); com 56 cm (e o joelho a 45° no começo), a faixa chega só a 2,0 vezes e a perna fica a 16°. Quem limita o passo é a perna, não a faixa: abrir mais pede baixar o quadril (sair do meio agachado do cartão) ou travar o joelho. Escolhi o maior passo que mantém a perna de apoio dobrada.

## Como o passo foi feito

O ciclo tem oito trechos de 1/8 em `u`: o pé direito abre, o esquerdo acompanha, o direito abre, o esquerdo acompanha; depois o esquerdo abre para o outro lado e o direito acompanha, duas vezes. O último quadro é igual ao primeiro. O pé que anda é "apoiado no ar" (a bola do pé numa altura acima do chão, como o pé de trás do afundo para trás aprovado): ele sobe antes de andar para o lado e só apoia depois de chegar, para não arrastar no chão. O quadril fica no meio dos dois pés, na altura em que o joelho dobra 40° com os pés na largura do quadril, e para a frente onde o centro de massa cai sobre o meio dos pés.

## Mudança em arquivo comum (a menor possível)

`src/engine/novo/conferir.ts`: um contato pode terminar em `:noChao` (`pe.R:noChao`). Ele vale só nos quadros em que a bola do pé está no chão (até 0,05 cm acima); em cada trecho seguido de quadros apoiados, o pé não pode sair do lugar (tolerância 0,1 cm, a mesma dos outros contatos). Sem isso, a ficha não tinha como dizer "o pé fica preso enquanto apoia": os contatos de hoje valem para o ciclo inteiro, e aqui nenhum pé fica parado o ciclo inteiro. Os contatos que já existiam são lidos como antes; a conferência de todas as 100 animações continua sem falha, e nenhum outro arquivo de preparo mudou.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mini-band acima dos joelhos | consenso | o meio da faixa a 8 cm do centro do joelho (a borda de baixo a 5,5 cm), como na abdução com mini-band aprovada | sim |
| Pés na largura do quadril no começo | consenso | os pés a 20 cm um do outro (os quadris a 16,7 cm) | sim |
| Meio agachado: joelhos e quadril levemente dobrados | consenso | as pernas apoiadas dobram o joelho de 20° (no passo largo) a 40° (pés na largura do quadril); o quadril, 31° a 40° | sim |
| Tronco reto, sem balançar | consenso | o peito inclina 16,3° à frente, parado; 0° para o lado | sim |
| O passo para o lado, pés além do quadril | consenso | o pé sobe 9 cm e anda 46 cm; os pés ficam a 66 cm um do outro | sim |
| O outro pé acompanha, sem juntar | consenso | volta a 20 cm do outro (a largura do quadril) | sim |
| Cada pé fica no lugar enquanto apoia | consenso | cada pé fica no chão em 72% do ciclo e desloca 0 cm enquanto apoia (`pe.R:noChao`, `pe.L:noChao`) | sim |
| Dedos para a frente | consenso | os dedos dos dois pés a 0° da frente | sim |
| A mini-band nunca fica frouxa | consenso | de 1,3 vez (pés na largura do quadril) a 1,9 vez (no passo); nunca abaixo de 1 | sim |
| Equilíbrio | — | o centro de massa fica sempre sobre o apoio dos pés (de frente para trás) | sim |

**Conferência automática: 0 falha, 4 avisos.** (1) Dorsiflexão do tornozelo de 26° (acima da média, dentro da amplitude): é o meio agachado de 40° com o tronco inclinado. (2) O elástico no primeiro quadro está no menos esticado (1,3), e a regra geral espera o mais esticado ali. (3) As linhas de desenho (`passo`, `passo.altura`, `maos.naCintura.acima`). (4) De três quartos pela frente o glúteo quase não aparece (17 cm²) e de frente nada (0 cm²): o modo Músculos abre de três quartos por trás (359 cm²), por medida.

Ritmo: o maior salto de velocidade é 12,2% do pico (limite 15%), no joelho da perna que dá o passo.

## As vistas

Testei de frente, de três quartos pela frente e de três quartos por trás, nos três quadros (começo, meio e fim do primeiro passo), e escolhi pela leitura de relance:

- **De três quartos pela frente** (a primeira, a que o app abre): é a única em que o meio agachado aparece (os joelhos e o quadril dobrados, o tronco inclinado) junto com o passo largo e a faixa. Ponto fraco: o pé que sobe é o de perto de quem olha, e o passo vem um pouco na direção dela, então a subida do pé se lê menos que de frente.
- **De frente** (a segunda, e a dos erros): a largura do passo, o pé no ar (9 cm) e a faixa esticada se leem melhor; o meio agachado quase não se vê (o joelho dobrado aponta para quem olha).
- **De três quartos por trás** (a terceira): o glúteo, para o modo Músculos.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Joelhos para dentro | de frente | no fim do passo, os joelhos giram 18° para dentro da linha dos pés: ficam a 37,6 cm um do outro (o certo: 41,6 cm) e a faixa afrouxa de 1,86 para 1,74 vez |
| Balançar o tronco | de frente | o tronco joga para o lado do passo enquanto o pé abre, e volta enquanto o outro acompanha: 8,5° de inclinação no fim do passo; a base do pescoço sai 6,3 cm da linha do quadril |
| Deixar a mini-band frouxa | de frente | no primeiro passo, o pé que acompanha vem até 8 cm do outro (o certo: 20 cm); os joelhos ficam a 14,5 cm e a faixa cai para 1,15 vez (o certo nunca fica abaixo de 1,30) |

## O que não ficou bom

- **"Frouxa" não fica frouxa de verdade:** com os pés juntos, a faixa de 61 cm ainda dá a volta nas duas coxas esticada 1,15 vez (é a conta da medida real). O que se lê é o pé que junta e a perna em vermelho; a faixa em si muda pouco no desenho.
- **A faixa não chega ao máximo do fabricante** (1,9 vez, contra 2,5): o limite é a perna (ver acima).
- **Na vista que o app abre, a subida do pé se lê menos que de frente** (o pé que anda é o de perto e vem um pouco na direção de quem olha).
- **40° de joelho** é mais que "levemente dobrado" ao pé da letra; com 30°, o meio agachado não se via e a perna de apoio ficava reta no passo largo.
