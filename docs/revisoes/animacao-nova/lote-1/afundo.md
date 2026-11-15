# Lote 1 · Afundo estático com halteres (`afundo`)

De 15/11/2026. Quarta animação do lote 1. É o afundo com o peso do corpo (aprovado no mesmo dia) com um halter em cada mão; os dois saem da mesma peça (`afundo-estatico.ts`), e o aprovado saiu idêntico depois da mudança. **Ainda sem a aprovação do Gustavo na folha: não está no app.**

- Ficha da técnica: `docs/pesquisa/animacoes/afundo.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/afundo.json`.
- Animação: `src/engine/novo/exercicios/afundo.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-afundo.png`. Quadros grandes: `../parada-do-corpo/14-afundo-halteres.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Passo largo: pé da frente inteiro no chão, pé de trás apoiado na ponta | consenso | 85 cm entre os tornozelos embaixo; o pé da frente não sai do chão (0 cm); o de trás apoia na bola do pé | sim, com o tamanho do passo tirado da animação de hoje |
| Pés na largura do quadril, como trilhos | consenso | cada pé a 9 cm do meio | sim |
| Tronco quase vertical, peso mais na perna da frente | consenso | o peito inclina 5,3°; o centro de massa (corpo e halteres) fica 10 cm à frente do meio do apoio | sim |
| Em cima, os dois joelhos quase estendidos (parar um pouco antes de estender totalmente) | consenso | o joelho da frente a 14° e o de trás a 19° | sim |
| Descida de ~2–3 s, reta | consenso | 2,3 s; o quadril não anda para a frente nem para trás (0 cm) | sim |
| Embaixo, joelho de trás a poucos centímetros do chão | consenso | a pele do joelho de trás fica a 4 cm do chão | sim |
| Embaixo, coxa da frente perto da horizontal | consenso | a coxa da frente fica a 1,2° da horizontal | sim |
| Subida de ~1–1,5 s, empurrando com o pé da frente inteiro | consenso | 1,3 s; os pés ficam presos | sim |

Os halteres (o texto do app; a ficha da técnica não descreve os braços): um em cada mão, os braços pendendo na vertical ao lado do corpo, abertos 7° para o halter não bater na coxa, com o cabo apontando para a frente. O halter não se mexe na mão (0 cm) e pende na vertical também no erro do tronco.

Para os dois joelhos ficarem quase estendidos em cima, o calcanhar de trás fica mais baixo em cima (50°) e sobe conforme o joelho desce (66° embaixo); a ponta do pé não sai do lugar. No afundo com o peso do corpo, já aprovado, o calcanhar não muda e o joelho de trás fica a 35° em cima; aquela ficha não pede os dois joelhos estendidos.

Amplitudes (conferência automática, 0 falha): dois avisos. A extensão do quadril de trás, em cima, chega a 23,5° (média 18,5°, máximo 42°), e a dorsiflexão do tornozelo de trás a 32° (média 14,8°, máximo 48°).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 8 cm para dentro, até a linha do meio do corpo |
| Tronco cai para a frente (de lado) | o peito inclina 37°; os halteres continuam pendendo na vertical e descem com os ombros |
| Descer pouco (de lado) | desce 40% do caminho: o joelho de trás para a 27 cm do chão |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- O glúteo deixou de ser principal e passou a secundário, como a biblioteca conta (02/11/2026). Respeitada.
- Os adutores da perna da frente entram no desenho (02/11/2026). Respeitada.
- O modo Músculos abre de lado (03/11/2026). Respeitada, por medida (354 cm² de lado; de frente o principal não aparece embaixo).

## O que não ficou bom

- De lado, o halter de perto fica na frente do quadril e da coxa e esconde parte do glúteo no modo Músculos.
- De frente, uma perna fica atrás da outra (o mesmo limite do afundo com o peso do corpo).
- Os halteres são de 25 lb (11,3 kg), a única medida de fabricante lida até agora; a troca para peças em quilos continua pendente.
