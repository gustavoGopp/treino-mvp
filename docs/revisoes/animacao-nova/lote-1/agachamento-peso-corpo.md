# Lote 1 · Agachamento com o peso do corpo (`agachamento-peso-corpo`)

De 15/11/2026. Primeira animação do lote 1, feita depois de o Gustavo fechar o corpo ("pode fechar o corpo e começar o lote 1"). **Ainda sem a aprovação dele na folha: não está no app.**

- Ficha da técnica: `docs/pesquisa/animacoes/agachamento-peso-corpo.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/agachamento-peso-corpo.json`.
- Animação: `src/engine/novo/exercicios/agachamento-peso-corpo.ts`, sobre o núcleo comum dos agachamentos (`agachar.ts`), que também move o goblet (conferido: o goblet saiu idêntico depois da mudança).
- Folha ao lado da de hoje: `../prototipos/folha-agachamento-peso-corpo.png`. Quadros grandes: `../parada-do-corpo/11-agachamento-peso-corpo.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés um pouco mais abertos que o quadril, pontas levemente para fora | consenso | pés a 19 cm do meio (a meia largura do quadril é 16,2), pontas 15° para fora | sim |
| Calcanhares no chão, sem anilha | consenso | o pé não sai do lugar no ciclo (0 cm); o centro de massa fica a no máximo 0,3 cm do meio do pé | sim |
| Braços estendidos à frente, mais ou menos na altura dos ombros, mãos se aproximando, a repetição toda | consenso | o punho fica na altura do ombro (0,0 cm de diferença) em cima e embaixo; as mãos a 17,6 cm uma da outra; cotovelo a 6° | sim |
| Descida de ~2–3 s; subida de ~1–1,5 s | consenso | descida 2,4 s, pausa 0,45 s, subida 1,3 s (as mesmas do goblet aprovado) | sim |
| Joelhos para a frente e para fora, na direção dos pés | consenso | o joelho anda numa direção a 5,1° da direção do pé (visto de cima) | sim |
| O tronco inclina um pouco mais que no goblet | consenso | peito a 33° embaixo (27° no goblet); a ficha não dá número: escolha de desenho | sim, com escolha de desenho |
| Embaixo, quadril abaixo da altura do joelho (agachamento completo) | moderada | o centro do quadril fica 10 cm abaixo do centro do joelho (quadril a 35,8 cm do chão, joelho a 45,8) | sim |
| Lombar neutra | consenso | flexão da lombar além da curva de repouso: 0° | sim |
| O joelho pode passar da ponta do pé | consenso | passa; o rótulo diz isso | sim |

Amplitudes (conferência automática, 0 falha): joelho 126° (média 140°); quadril 137° (média 132°, máximo 159°: **aviso**, acima da média); dorsiflexão do tornozelo 25° (média 14,8°, máximo 48°: **aviso**). Os dois avisos são próprios do agachamento completo sem calcanhar elevado; no goblet, com a anilha, a dorsiflexão é 23°.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelhos para dentro (de frente) | cada joelho cai 10,9 cm para dentro em relação ao certo, e continua assim embaixo |
| Calcanhar sai do chão (de lado) | o pé gira 14° na bola: o calcanhar sobe 4,8 cm (a folha aprovada em 04/11 tinha 5 cm) e o peso vai para a bola do pé |
| Descer pouco (de lado) | para com o joelho a 72°: o quadril fica a 70,3 cm do chão, 22,6 cm acima do joelho |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Profundidade: agachamento completo, com o quadril abaixo do joelho e o calcanhar no chão (04/11/2026). Respeitada. As alturas aprovadas eram 32 cm (quadril) e 41 cm (joelho) no boneco de hoje, que tem outras proporções; no corpo novo são 35,8 e 45,8 cm, com a mesma relação (o quadril 9 a 10 cm abaixo do joelho).
- Adutores no desenho, como secundário. Respeitada (quadríceps principal; glúteo e adutores secundários, como a biblioteca).

## Músculos e vistas

O realçado bate com o conteúdo do app (principal: quadríceps; secundários: glúteos e adutores). A vista de lado é a do modo Músculos (347 cm² do principal à vista); a de frente não serve a esse modo (embaixo, a coxa aponta para quem olha e o músculo não aparece) e fica para a Técnica e para o erro do joelho.

## O que não ficou bom

- De frente, os braços estendidos apontam para quem olha e viram dois volumes na frente do peito.
- De lado, o rótulo "joelho pode passar do pé" fica do lado das costas e o fio atravessa a coxa em pé.
- Os adutores só aparecem de frente e, nessa vista, somem embaixo: na prática, quem olha de lado não vê os adutores.
