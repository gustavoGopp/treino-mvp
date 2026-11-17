# Lote 6 · Panturrilha em pé no step (`panturrilha-b`)

De 15/11/2026. As duas pernas: a bola dos dois pés na borda do step, os calcanhares para fora; um halter na mão direita e a mão esquerda na coluna da estação. Pausa de 2 s alongado, sobe em 1 s, segura no topo, desce em 2 s. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-bilateral-step.md` (guia original, consenso).
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-b.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-b.ts`, sobre `exercicios/panturrilha-no-step.ts` (o mesmo da `panturrilha`) e o núcleo `exercicios/elevar-o-calcanhar.ts`. O step e a coluna são os da `panturrilha` (ver `panturrilha.md`).
- Folha: `../prototipos/folha-panturrilha-b.png`. Quadros: `../quadros/panturrilha-b.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pontas dos dois pés na borda do step, calcanhares para fora | consenso | a bola dos pés 2 cm para dentro da borda do step de 15 cm; os pés não saem do lugar (0 cm) | sim |
| Pés na largura do quadril, apontando para a frente | consenso | 9 cm do meio, dedos para a frente | sim |
| Joelhos quase estendidos e parados | consenso | o direito a 4°, o esquerdo a 5,7° a 5,8° (a bacia vai 3,5 cm para a esquerda para equilibrar o halter da direita, e a perna esquerda fica um pouco mais curta até o pé) | sim |
| Um halter numa mão e a outra mão na estação | consenso | halter de 25 lb na mão direita, pendendo na vertical; a mão esquerda no trilho da coluna a 105 cm do chão, parada (0 cm); o cotovelo vai de 72° (embaixo) a 25° (em cima) | sim |
| Alongado: calcanhares abaixo da borda, 2 s | consenso | 6,4 cm abaixo (como hoje), 2 s parado | sim (ver a dorsiflexão) |
| Subida ~1 s, o máximo na ponta dos pés; topo ~1 s; descida ~2 s | consenso | 1 s até 13,9 cm acima do step (como hoje); 0,8 s; 2 s | sim |
| Equilíbrio | consenso (mecânica) | o centro de massa (corpo + 11,3 kg) a 0 cm da vertical da bola dos pés para a frente, e no meio dos dois pés de lado; a cabeça anda 1,4 cm | sim |

**A dorsiflexão embaixo:** 31,4° (aviso; média 14,8°, máximo observado 48°, CDC); hoje, 32°. Mesma conta do degrau e da unilateral.

Conferência automática: **0 falha, 3 avisos** (a dorsiflexão; as linhas de desenho; de lado o músculo principal quase não aparece, 108 cm² contra 364 de trás: por isso o modo Músculos abre de trás). Ritmo: salto máximo de 5,8%.

## As vistas

- **De lado** (a primeira): o calcanhar abaixo da borda e na ponta dos pés.
- **De trás** (`posterior`): as duas panturrilhas lado a lado (364 cm² à vista, contra 108 de lado; vista padrão do modo Músculos), os dois pés no step e a mão na coluna. Testei a de três quartos de trás (a da unilateral): nela uma perna tapa a outra e só uma panturrilha aparece.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Não descer os calcanhares (de lado) | embaixo os calcanhares param 1,5 cm acima da borda do step (como hoje) |
| Dobrar e esticar os joelhos (de lado) | embaixo os joelhos dobram 25° e esticam na subida |

## Medidas provisórias

As mesmas da unilateral (todas as distâncias da ficha de movimento são escolha de desenho ou vêm da animação de hoje), com a mão na coluna a 47 cm do meio e 105 cm de altura, e o step 22 cm à direita do meio do corpo.

## O que não ficou bom

- **O cotovelo da mão na coluna,** como na unilateral: vai de 72° embaixo a 25° em cima; de trás, embaixo, o braço sai um pouco "de asa". Com o cotovelo apontado para trás, ele aparecia atrás das costas na vista de lado; a mão mais alta não alcançava em cima.
- **A pegada na coluna fica inclinada** (o polegar para cima e um pouco para a frente): com o polegar na vertical, o antebraço passava da supinação média (102°, aviso). Num trilho vertical, a mão um pouco inclinada é o meio-termo; muda só a mão esquerda.
- A dorsiflexão embaixo (ver acima).

## Arquivo comum mexido

`scripts/animacao-nova/conferir.mjs`: a conferência procurava os músculos na biblioteca só pelo id da ficha (`panturrilha-b`), e o exercício da biblioteca se chama `panturrilha-bilateral-step` (com `animacaoId: "panturrilha-b"`). Sem achar, ela dava a falha "o exercício não está na biblioteca do app". Agora, quando não acha pelo id, procura pelo `animacaoId`. Mudança aditiva: os outros exercícios continuam achando pelo id, como antes.
