# Lote 1 · Afundo com kettlebell no peito (`afundo-kettlebell`)

De 15/11/2026. Quinta animação do lote 1. É o afundo estático (a mesma peça dos dois já aprovados, `afundo-estatico.ts`) com o kettlebell junto ao peito. **Ainda sem a aprovação do Gustavo na folha: não está no app.**

- Ficha da técnica: `docs/pesquisa/animacoes/afundo-kettlebell.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/afundo-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/afundo-kettlebell.ts`.
- Peça nova: o kettlebell, com as medidas do modelo de competição da Rogue na tabela de objetos (28,2 cm de altura, bola de 20,8 cm, alça de 3,3 cm com 12,3 cm entre as hastes, base de 14 cm; o mesmo tamanho para todos os pesos). A bola é desenhada lisa e com volume, como no cartão `kettlebell` do app.
- Folha ao lado da de hoje: `../prototipos/folha-afundo-kettlebell.png`. Quadros grandes: `../parada-do-corpo/15-afundo-kettlebell.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Kettlebell junto ao peito, base para baixo | consenso | a bola fica a 0,8 cm do peito, com a base para baixo; pende na vertical | sim |
| Mãos nos lados da alça | consenso | cada mão segura uma haste da alça: as mãos ficam a 12,3 cm uma da outra (a distância entre as hastes), 4,6 cm abaixo do ombro | sim |
| Cotovelos perto do corpo | consenso | o cotovelo fica 3,6 cm para fora da linha do ombro e aponta para baixo; dobra 132° | sim |
| Passo largo, pé da frente inteiro no chão, pé de trás na ponta; pés na largura do quadril | consenso | o mesmo do afundo com o peso do corpo: 85 cm entre os tornozelos, pés a 9 cm do meio | sim |
| Tronco quase vertical, peso mais na perna da frente | consenso | o peito inclina 5,3°; o centro de massa (corpo e kettlebell) fica 11 cm à frente do meio do apoio | sim |
| Descida de ~2–3 s, reta, levando o joelho de trás em direção ao chão | consenso | 2,3 s; o quadril não anda para a frente nem para trás; o joelho de trás chega a 4 cm do chão | sim |
| Subida de ~1–1,5 s; os pés não saem do lugar | consenso | 1,3 s; os dois pés ficam presos | sim |

O kettlebell não se mexe nas mãos (a distância da mão ao meio da alça varia 0,1 cm no ciclo). A bola fica 14,6 cm abaixo das mãos, debaixo do meio delas.

Amplitudes (conferência automática, 0 falha): um aviso, a dorsiflexão do tornozelo de trás (32°), o mesmo do afundo com o peso do corpo.

## Erros

| Erro (ficha da técnica) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 8 cm para dentro |
| Tronco cai para a frente, o kettlebell puxa o peito (de lado) | o peito inclina 37°; o kettlebell continua encostado no peito e pende na vertical |
| Descer pouco (de lado) | desce 40% do caminho |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- "O kettlebell nunca fica solto entre as mãos": a alça passa pelas duas mãos e a bola fica embaixo do meio (04/11/2026). Respeitada, e medida pela conferência.
- "Nenhum objeto voando": num objeto seguro com as duas mãos, as mãos ficam na largura real da pegada (cerca de 10 a 14 cm) e o objeto encosta no corpo (04/11/2026). Respeitada: 12,3 cm, e a bola encostada no peito.
- Os adutores da perna da frente entram no desenho. Respeitada.

## O que não ficou bom

- O sombreado da bola saiu escuro: de longe ela parece quase toda preta, com um brilho pequeno.
- A alça é desenhada com três cilindros retos (duas hastes e a barra de cima), com as quinas vivas; a do cartão do app é curva.
- De lado, o antebraço e a mão de perto escondem metade da bola.
- O kettlebell não tem a etiqueta do peso que o cartão do app tem.
