# Lote 1 · Afundo estático com o peso do corpo (`afundo-peso-corpo`)

De 15/11/2026. Terceira animação do lote 1 e a primeira sobre o núcleo dos afundos (`afundar.ts`): um pé à frente, inteiro no chão, e outro atrás, na ponta; os pés não saem do lugar e o quadril sobe e desce entre eles. **Aprovada pelo Gustavo na folha em 15/11/2026 ("aprovada").** Ainda não está no app: falta ligar o motor novo às telas.

- Ficha da técnica: `docs/pesquisa/animacoes/afundo-peso-corpo.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/afundo-peso-corpo.json`.
- Animação: `src/engine/novo/exercicios/afundo-peso-corpo.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-afundo-peso-corpo.png`. Quadros grandes: `../parada-do-corpo/13-afundo-peso-corpo.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Passo largo | consenso | do tornozelo da frente ao de trás: 85,2 cm (na animação aprovada de hoje, 80 cm num corpo um pouco menor); a ficha não dá número: o quadril fica 39,5 cm atrás do tornozelo da frente, como hoje | sim, com número tirado da animação de hoje |
| Pé da frente inteiro no chão | consenso | o calcanhar e a bola do pé da frente não saem do chão (0 cm) | sim |
| Pé de trás na ponta | consenso | apoiado na bola do pé, com o calcanhar levantado 66°; os dedos dobram 66° (a média é 70°) | sim |
| Pés na largura do quadril, como trilhos | consenso | cada pé a 9 cm do meio (os centros do quadril ficam a 8,35) | sim |
| Mãos na cintura, cotovelos para fora | consenso | as mãos na lateral da bacia, 11 cm acima do centro do quadril; os cotovelos apontam para fora e um pouco para trás | sim |
| Tronco quase vertical, peso mais na perna da frente | consenso | o peito inclina 5,3°; o centro de massa fica 9 cm à frente do meio do apoio (mais perto do pé da frente) | sim |
| Descida de ~2–3 s, reta | consenso | 2,3 s; o quadril não anda nada para a frente nem para trás (0 cm) | sim |
| O joelho de trás desce até ficar a poucos centímetros do chão | consenso | embaixo, a pele do joelho de trás fica a 4 cm do chão | sim |
| Subida de ~1–1,5 s; os pés não saem do lugar | consenso | 1,3 s; os dois pés ficam presos (0 cm de deslocamento) | sim |

O que sai como consequência, e a ficha não pede: embaixo, os dois joelhos dobram cerca de 91°, e a canela da frente fica na vertical (o joelho 1,8 cm à frente do tornozelo). Em cima, o joelho da frente fica a 14° (quase estendido, sem travar) e o de trás a 35°.

Amplitudes (conferência automática, 0 falha): um aviso, a dorsiflexão do tornozelo de trás (32°; a média é 14,8° e o máximo observado, 48°), que é o pé apoiado na ponta com a canela quase deitada.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 8 cm para dentro e chega à linha do meio do corpo |
| Tronco cai para a frente (de lado) | o peito inclina 37° (5° no certo); o centro de massa vai 10 cm para a frente |
| Descer pouco (de lado) | desce só 40% do caminho: o joelho da frente para em 59° e o de trás fica a 27 cm do chão |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- O glúteo é secundário (laranja), e não principal, como a biblioteca conta (02/11/2026). Respeitada.
- Os adutores da perna da frente entram no desenho (02/11 e 04/11/2026). Respeitada: quadríceps da frente principal; glúteo e adutores da frente e quadríceps de trás, secundários.
- O modo Músculos abre na vista em que o principal aparece mais, no afundo de lado (03/11/2026). Respeitada, e agora por medida: de lado, 354 cm²; de frente, o principal não aparece embaixo.

## O que não ficou bom

- De frente, uma perna fica atrás da outra e o desenho se lê mal; serve para o erro do joelho e pouco mais. (O guia de hoje tem o mesmo limite, anotado em 03/11.)
- No erro do joelho, as duas pernas ficam vermelhas, e só a da frente erra.
- O quadríceps da perna de trás aparece como secundário, e a biblioteca só tem "quadríceps" como principal: fica como diferença aceita, igual ao guia de hoje.
- A parede ou a cadeira para o equilíbrio fica só no texto, como hoje.
