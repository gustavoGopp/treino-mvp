# Lote A2 · Caminhada lateral com mini-band (`caminhada-lateral-mini-band`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto) e **o primeiro exercício do motor novo em que os pés saem do lugar**. Em pé, meio agachado, o tronco reto um pouco inclinado à frente, as mãos na cintura; a mini-band em volta das duas coxas, logo acima dos joelhos. O pé direito dá um passo para o lado, o esquerdo acompanha devagar até a largura do quadril, sem juntar; depois o mesmo para o outro lado, e o corpo volta ao lugar do começo (o ciclo fecha). **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/caminhada-lateral-mini-band.md`. Cartão do app: `src/conteudo/exercicios/caminhada-lateral-mini-band.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/caminhada-lateral-mini-band.json`.
- Animação: `src/engine/novo/exercicios/caminhada-lateral-mini-band.ts` (sem núcleo: o corpo em pé sai de `resolverTronco`/`resolverMembros`, com as mãos na cintura do afundo aprovado, `maosNaCintura`). A faixa é a peça aprovada da abdução com mini-band (`lacoNasCoxas`), sem mudança. Regras medidas: `regras/caminhada-lateral.ts` (três) e a `quadril-faixa-acima-dos-joelhos` da abdução com mini-band aprovada.
- Quadros grandes: `../quadros/caminhada-lateral-mini-band.png`. Sem folha.

## Como o passo foi feito

O ciclo tem quatro trechos em `u` (0 a 1): o pé direito sai (0 → 0,25), o esquerdo acompanha (0,25 → 0,5), o esquerdo volta para o lado dele (0,5 → 0,75), o direito acompanha (0,75 → 1). O cartão manda "conte os passos para um lado e volte para o outro": a animação mostra um passo para cada lado, e o último quadro é igual ao primeiro. O pé que anda é "apoiado no ar" (a bola do pé numa altura acima do chão, como o pé de trás do afundo para trás aprovado): ele sobe 3 cm antes de andar para o lado e só apoia depois de chegar, para não arrastar no chão. O quadril fica no meio dos dois pés, na altura em que o joelho dobra 30° com os pés na largura do quadril, e para a frente onde o centro de massa cai sobre o meio dos pés.

## Mudança em arquivo comum (a menor possível)

`src/engine/novo/conferir.ts`: um contato pode terminar em `:noChao` (`pe.R:noChao`). Ele vale só nos quadros em que a bola do pé está no chão (até 0,05 cm acima); em cada trecho seguido de quadros apoiados, o pé não pode sair do lugar (tolerância 0,1 cm, a mesma dos outros contatos). Sem isso, a ficha não tinha como dizer "o pé fica preso enquanto apoia": os contatos de hoje valem para o ciclo inteiro, e aqui nenhum pé fica parado o ciclo inteiro. Os contatos que já existiam são lidos como antes; a conferência de todas as 100 animações continua sem falha, e nenhum outro arquivo de preparo mudou.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mini-band acima dos joelhos | consenso | o meio da faixa a 8 cm do centro do joelho (a borda de baixo a 5,5 cm), como na abdução com mini-band aprovada | sim |
| Pés na largura do quadril no começo | consenso | os pés a 20 cm um do outro (os quadris a 16,7 cm) | sim |
| Meio agachado: joelhos e quadril levemente dobrados | consenso | os joelhos dobram de 24° (pés afastados) a 42° (a perna no ar); o quadril, 32° a 35° | sim |
| Tronco reto, sem balançar | consenso | o peito inclina 16,3° à frente, parado; 0° para o lado | sim |
| O passo para o lado, pés além do quadril | consenso | o pé anda 22 cm; os pés ficam a 42 cm um do outro | sim |
| O outro pé acompanha, sem juntar | consenso | volta a 20 cm do outro (a largura do quadril) | sim |
| Cada pé fica no lugar enquanto apoia | consenso | cada pé fica no chão em 76% do ciclo e desloca 0 cm enquanto apoia (`pe.R:noChao`, `pe.L:noChao`) | sim |
| Dedos para a frente | consenso | os dedos dos dois pés a 0° da frente | sim |
| A mini-band nunca fica frouxa | consenso | de 1,3 vez (pés na largura do quadril) a 1,6 vez (pés afastados); nunca abaixo de 1 | sim |
| Equilíbrio | — | o centro de massa fica sempre sobre o apoio dos pés (de frente para trás) | sim |

**Conferência automática: 0 falha, 4 avisos.** (1) Dorsiflexão do tornozelo de 15,9° (acima da média, dentro da amplitude): é o meio agachado com o tronco inclinado. (2) O elástico no primeiro quadro está no menos esticado (1,3), e a regra geral espera o mais esticado ali. (3) As linhas de desenho (`passo`, `passo.altura`, `maos.naCintura.acima`). (4) De frente, o glúteo não aparece (0 cm²): o modo Músculos abre de três quartos por trás (359 cm²), por medida.

Ritmo: o maior salto de velocidade é 11,9% do pico (limite 15%), no joelho da perna que dá o passo.

## As vistas

**De frente** (a primeira): o passo, os pés afastados e a faixa nos joelhos. **De três quartos por trás** (a segunda, padrão do modo Músculos): o glúteo, a faixa e o meio agachado. De lado, um pé esconde o outro e o passo não aparece.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Joelhos para dentro | de frente | no fim do passo, os joelhos giram 18° para dentro da linha dos pés: ficam a 24,9 cm um do outro (o certo: 30,2 cm) e a faixa afrouxa de 1,56 para 1,41 vez |
| Balançar o tronco | de frente | o tronco joga para o lado do passo: 8,5° de inclinação; a base do pescoço sai 6,3 cm da linha do quadril |
| Deixar a mini-band frouxa | de frente | o pé que acompanha vem até 8 cm do outro (o certo: 20 cm); os joelhos ficam a 14 cm e a faixa cai para 1,14 vez (o certo nunca fica abaixo de 1,29) |

## O que não ficou bom

- **"Frouxa" não fica frouxa de verdade:** com os pés juntos, a faixa de 61 cm ainda dá a volta nas duas coxas esticada 1,14 vez (é a conta da medida real). O que se lê é o pé que junta e a perna em vermelho; a faixa em si muda pouco no desenho (fica 4% mais larga).
- **De frente, o meio agachado quase não se vê** (o joelho dobrado aponta para quem olha). Ele aparece na vista de três quartos.
- **O pé sobe só 3 cm** (passo raso, arrastado, que não solta a tensão): no quadro parado, o pé no ar quase não se distingue do pé no chão; em movimento, lê-se.
- **Um passo para cada lado:** o cartão fala em contar vários passos para um lado; a animação mostra um, para o ciclo fechar sem o corpo sair do quadro.
