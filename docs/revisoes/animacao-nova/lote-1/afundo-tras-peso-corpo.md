# Lote 1 · Afundo para trás com o peso do corpo (`afundo-tras-peso-corpo`)

De 15/11/2026. Sexta animação do lote 1, e a primeira em que um pé sai do chão: o boneco começa em pé, com os pés juntos, o pé de trás passa pelo ar e apoia na ponta, e o quadril desce. Embaixo, é a posição do afundo com o peso do corpo aprovado. **Aprovada pelo Gustavo em 15/11/2026 ("aprovada, segue para o búlgaro").** Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/afundo-tras-peso-corpo.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/afundo-tras-peso-corpo.json`.
- Animação: `src/engine/novo/exercicios/afundo-tras-peso-corpo.ts`, sobre o núcleo dos afundos (`afundar.ts`).
- Folha ao lado da de hoje: `../prototipos/folha-afundo-tras-peso-corpo.png`. Quadros grandes: `../parada-do-corpo/16-afundo-para-tras.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Início em pé, mãos na cintura | consenso | em pé, os dois pés lado a lado (18 cm de um ao outro, nenhum à frente), joelhos a 8°, mãos na cintura | sim |
| Passo largo para trás | consenso | o pé de trás sai do chão, passa a no máximo 22 cm de altura e apoia na ponta; do tornozelo da frente ao de trás ficam 85,2 cm | sim |
| O pé da frente não sai do lugar | consenso | 0 cm de deslocamento no ciclo inteiro | sim |
| Tronco quase vertical | consenso | o peito inclina no máximo 5,3° | sim |
| O peso no pé da frente | consenso | embaixo, o centro de massa fica a 61% do caminho entre a ponta do pé de trás e o tornozelo da frente (mais perto do pé da frente) | sim |
| Descida até o joelho de trás quase tocar o chão, em ~2 a 3 s | consenso | 2,6 s para o passo e a descida juntos; embaixo, a pele do joelho de trás fica a 4 cm do chão | sim |
| Joelho alinhado com o pé da frente | consenso | de frente, o joelho da frente fica sobre o pé (a linha tracejada) | sim |
| Volta | consenso | 1,5 s, o mesmo caminho ao contrário, até os pés juntos | sim |

Como o passo e a descida se juntam: o pé apoia a 60% do caminho, e o quadril desce do começo ao fim, sem parar no meio (em 2,6 s, o quadril anda 39,5 cm para trás e desce de 90,4 para 50,1 cm).

Conferência automática: 0 falha. Dois avisos próprios desta animação: a dorsiflexão do tornozelo de trás (32°, como nos outros afundos) e o ritmo da volta, com um salto de velocidade de 15,7% no joelho da frente (o limite do "suave" é 15%; acima de 25% seria tranco). Na volta, o joelho da perna que dá o passo chega a 2,9 m/s.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 8 cm para dentro |
| Descer pouco (de lado) | o quadril para a 64 cm (o certo: 50) e o joelho de trás fica a 23 cm do chão |
| Empurrar com o pé de trás (de lado) | o quadril fica 13 cm mais para trás, perto do pé de trás; o tronco recua 2,7°; a canela da frente deita 16° para trás e o centro de massa vai 14 cm para trás |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- O boneco começa em pé com os pés juntos e o pé de trás passa pelo ar até apoiar na ponta (10/11/2026). Respeitada.
- Os adutores da perna da frente, "como o afundo aprovado" (10/11/2026). Respeitada.
- No quadro "Em pé", o rótulo "passo largo para trás" apontava para o chão vazio. Mudou: o rótulo agora acompanha a ponta do pé de trás.
- A cadeira para o equilíbrio fica no texto, e não no desenho. Mantido.

## O que não ficou bom

- O erro "descer pouco" para um pouco mais baixo que o de hoje (64 cm contra 70), porque aqui o caminho inclui o passo.
- No erro "empurrar com o pé de trás", o corpo inteiro e as duas pernas ficam vermelhos; a leitura depende mais do corpo tracejado atrás do que da cor.
- De frente, uma perna fica atrás da outra, como nos outros afundos.
- Enquanto o pé de trás está no ar, o corpo está apoiado num pé só; a conferência do equilíbrio ainda mede o apoio como se fossem os dois pés.
