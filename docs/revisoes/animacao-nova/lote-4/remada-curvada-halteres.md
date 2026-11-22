# Lote 4 · Remada curvada com halteres (`remada-curvada-halteres`)

De 15/11/2026. Terceira da família das remadas com peso livre: o corpo parado é o do stiff (`exercicios/dobrar-o-quadril.ts`, importado sem mudança) e os dois braços puxam com o núcleo `exercicios/remada.ts`. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-curvada-halteres.md`. Cartão: `src/conteudo/exercicios/remada-curvada-halteres.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-curvada-halteres.json`.
- Animação: `src/engine/novo/exercicios/remada-curvada-halteres.ts`.
- Folha: `../prototipos/folha-remada-curvada-halteres.png`. Quadros grandes: `../quadros/remada-curvada-halteres.png`.

## Como a geometria foi montada

1. **O corpo parado** sai de `dobrarOQuadril` (o núcleo dos stiffs): pés paralelos a 9 cm do meio, joelhos a 20°, o peito a 62° da vertical (hoje: ~60°) com a lombar sem flexão; o quadril vai para trás até o centro de massa (corpo + os dois halteres pendurados embaixo dos ombros) ficar sobre o meio do pé. Esse quadril e esse tronco ficam parados a série toda (o quadril não é recalculado a cada quadro, para o tronco não andar).
2. **Os dois braços** puxam como na remada unilateral (de pendurados a 26° além da linha das costas, 16° para fora, antebraço pendendo embaixo do cotovelo, pegada neutra, escápulas de +6 a −10), espelhados.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, joelhos levemente dobrados | consenso | pés a 9 cm do meio, parados (0 cm); joelhos a 20° | sim |
| Tronco bem inclinado, costas retas, abdômen firme | consenso | peito a 63,3° da vertical; lombar sem flexão (0°) | sim |
| Tronco parado (sem subir o tronco) | consenso | base do pescoço e bacia andam 0 cm; o tórax gira 0° | sim |
| Halteres pendurados, pegada neutra | consenso | cotovelo a 3° no começo; pronação de 90° o ciclo todo | sim |
| Cotovelos para trás, perto do corpo | consenso | o braço se afasta no máximo 16° do lado do tronco | sim |
| Fim: cotovelos atrás do tronco, halteres perto do quadril | consenso (cartão) | o cotovelo fica 5,4 cm além da linha das costas; a mão a 81% do caminho do ombro ao quadril | sim |
| Os halteres não atravessam as pernas | (desenho) | a no mínimo 0,3 cm da pele (o antebraço junto à mão; a coxa fica a 3,7 cm ou mais) | sim |
| As escápulas se juntam no fim | consenso (guia de hoje) | a clavícula vai 12,3° para trás | sim |
| Equilíbrio | (mecânica) | o centro de massa fica sempre dentro do apoio dos pés | sim |
| Simetria | — | esquerda = espelho da direita (0 cm) | sim |
| ~1 s puxando, pausa curta, ~2 s voltando | consenso | 1,1 s / 0,6 s / 2,1 s (como hoje) | sim |

Conferência automática (homem e mulher): **0 falha, 2 avisos.** (1) As linhas de desenho da ficha de movimento. (2) Músculos: de lado o principal quase não aparece (176 cm²); a vista padrão do modo Músculos é a de três quartos, de trás (551 cm²), que é a segunda vista. Testei também de trás (485 cm²) e de cima (684 cm²): de cima a puxada vai na direção de quem olha.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar as costas (`e1`) | lado | lombar +22°, torácica +22°; a bacia vira para trás até a base do pescoço ficar na mesma altura (corcunda, os ombros não caem) |
| Subir o tronco (`e2`) | lado | o tronco sobe 25° na puxada (hoje: de ~60° para ~35°), girando no quadril; os halteres sobem junto |
| Encolher os ombros (`e3`) | de trás | as escápulas sobem +8 no fim (hoje: +8) |
| Puxar só com os braços (`e4`) | lado | o braço fica a 12° da vertical (embaixo do ombro) e o antebraço dobra 75° para a frente, como numa rosca; o halter não chega ao quadril |

Os halteres não atravessam as pernas nos erros (no `e2`, o mais perto: 0,5 cm da coxa, com o núcleo afastando os braços o necessário).

**Folga da carga (núcleo):** se num quadro a carga chegaria a menos de 0,5 cm da pele das pernas ou do tronco (num corpo menor, ou num erro que move o tronco), o núcleo afasta os braços que puxam do corpo só o necessário (`resolver1`, contínuo: zero enquanto a folga basta). No homem, no movimento certo, isso não acontece.

## Correções já feitas que esta animação respeita

- 10/11: "sai da remada sem banco (dois braços) com as pernas do stiff" — é o que esta faz, agora com os núcleos novos.
- 10/11: dorsal e meio das costas em vermelho; bíceps e ombro de trás em laranja.
- Os ids dos erros (`e1` a `e4`) e os títulos são os do cartão.

## O que não ficou bom

- Nada que eu tenha visto nos quadros grandes. No erro "encolher os ombros" de trás, os braços puxados aparecem quase na vertical (o braço vai para trás, na direção de quem olha); o que se lê é a linha dos ombros subindo, que é o erro.

## Correção de 19/11 (halter dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), medi todas as aprovadas com peso livre com a regra nova `peso-fora-do-corpo` (as cabeças do halter contra a superfície do corpo, no ciclo e em cada erro em 9 instantes). Nesta, **no erro "Puxar só com os braços"** (no fim), o antebraço dobra 75° para a frente, como numa rosca, mas o halter ficava sempre deitado: a cabeça de trás entrava **2,2 cm no antebraço direito**. A regra de antes (`carga-livre-do-corpo-e-do-banco`) não via, porque mede só o ciclo.

**A mudança.** Opção nova do núcleo `exercicios/remada.ts`, `halterGiraComAMao` (aditiva; desligada, nada muda): no erro "só com os braços", o halter gira com a mão, com o cabo atravessado na palma, como numa rosca martelo. O ciclo e os outros três erros não mudam (medido: 0 cm de diferença na mão, no cotovelo e nas cabeças do halter, em 21 instantes); o preparo muda só no enquadramento de lado, que conta a pose do erro.

| medido (homem) | antes | depois |
|---|---|---|
| a cabeça do halter entra no corpo (ciclo e erros) | 2,2 cm (antebraço direito, erro "Puxar só com os braços", fim) | 0 cm |
| pintura de lado, braço direito × halter, no mesmo erro | −2,8 cm (ordem errada) | não se cruzam mais |

A conferência automática dá **0 falhas e 1 aviso** (o de antes). A ficha liga `peso-fora-do-corpo`. O antes e depois está em `correcao-das-antigas/remada-curvada-halteres-halter.png`; os quadros grandes foram regravados (`quadros/remada-curvada-halteres.png`).

**O que ainda não ficou bom.**
- De três quartos de trás, a perna esquerda esconde um pedaço do halter esquerdo e é pintada antes dele (folga de pintura de −2,1 cm, medida pela regra `remada-carga-pintada-no-lugar`, que não liguei nesta ficha). Já era assim; não corrigi, porque não é o peso dentro do corpo.
- No erro, o halter fica quase em pé ao lado do punho (o antebraço quase deitado): é o que uma rosca martelo faz, mas lê-se diferente do quadro de antes, e o rótulo do erro fica perto da cabeça de cima do halter.
- A mão termina 13,1 cm à frente do centro do quadril e 8,6 cm abaixo dele (80,6% do caminho do ombro ao quadril). É a remada com o tronco a 63°, em que a ficha pede "perto do quadril"; não mudei.
