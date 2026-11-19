# Lote 4 · Remada unilateral com halter apoiada no banco (`remada-unilateral`)

De 15/11/2026. Primeira da família das remadas com peso livre, sobre o núcleo novo `exercicios/remada.ts` (o tronco parado e o braço que puxa). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral.md`. Cartão: `src/conteudo/exercicios/remada-unilateral.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-unilateral.json`.
- Animação: `src/engine/novo/exercicios/remada-unilateral.ts`; núcleo: `src/engine/novo/exercicios/remada.ts`.
- Regras medidas novas (da família): `src/engine/novo/regras/remadas.ts`.
- Peças: o banco reto (`bancoReto`) e o halter, sem mudança.
- Folha: `../prototipos/folha-remada-unilateral.png`. Quadros grandes: `../quadros/remada-unilateral.png`.

## Como a geometria foi montada

1. **O tronco** fica parado com o peito a 75° da vertical (a ficha: "~15° acima da horizontal") e a coluna sem flexão além da curva de repouso.
2. **O joelho esquerdo** apoia no estofado (a pele amassa 0,5 cm) com a canela deitada; a altura do quadril sai daí.
3. **A mão esquerda** fica espalmada no banco, na vertical do ombro. O ângulo da coxa de apoio é o único em que a mão chega ao banco com o cotovelo de apoio a 6° (`resolver1`): deu a coxa quase na vertical, com o joelho logo à frente do quadril (9,9 cm).
4. **O pé esquerdo** gira no tornozelo até o peito do pé encostar no estofado (`resolver1` na superfície do pé).
5. **O pé direito** fica 10 cm para fora da linha do quadril e anda para a frente ou para trás até o joelho direito ficar a 10°. Num corpo de pernas curtas (o da mulher), o pé não chegaria ao chão com esse joelho: a coxa de apoio inclina até o quadril baixar o bastante, e o cotovelo de apoio dobra mais (medido: 26,5° na mulher; 6° no homem).
6. **O braço que puxa** (núcleo): o braço gira no ombro, de pendurado (3° atrás da vertical, 8° para fora) até 26° além da linha das costas e 16° para fora; o antebraço pende embaixo do cotovelo (na vertical no fim), então o halter pende na vertical embaixo da mão. A pegada é neutra de verdade: o polegar aponta para a frente do antebraço (pronação medida de 90° em todo o ciclo). A escápula vai de +6 (à frente) a −10 (junta à coluna).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Joelho e mão do mesmo lado no banco, mão embaixo do ombro | consenso | mão a 0 cm e joelho a −0,5 cm do tampo; o meio da mão a 2,2 cm da vertical do ombro; mão e joelho parados (0 cm) | sim |
| O outro pé no chão, um pouco para o lado, joelho levemente dobrado | consenso (cartão) | pé 10 cm para fora da linha do quadril, parado; joelho a 10° | sim |
| Costas retas, quase paralelas ao chão (~15°) | consenso | peito a 13,7° da horizontal; lombar sem flexão (0°) | sim |
| Tronco parado, sem girar | consenso | base do pescoço e bacia andam 0 cm; o tórax gira 0° | sim |
| Começo: braço estendido, ombro solto para baixo | consenso (cartão) | cotovelo a 3°; clavícula 6° à frente | sim |
| Cotovelo para trás, perto do corpo | consenso | o braço se afasta no máximo 16° do lado do tronco | sim |
| Fim: cotovelo passando a linha do tronco | consenso (cartão) | o centro do cotovelo fica 5,4 cm além da linha das costas; o cotovelo dobra 102° | sim |
| Fim: halter ao lado do quadril | consenso | a mão fica a 67% do caminho do ombro ao quadril, ao longo do tronco | sim |
| Pegada neutra (palma para o banco) | consenso | pronação de 90° o ciclo todo | sim |
| O halter pende sem atravessar a perna nem o banco | (desenho) | a no mínimo 0,3 cm da pele (o antebraço, junto à mão que segura; a coxa fica a 2,6 cm ou mais) e 13,2 cm do banco | sim |
| A escápula se junta no fim | consenso (guia de hoje) | a clavícula vai 10,7° para trás do começo ao fim | sim |
| ~1 s puxando, 1 s parado, ~2 s voltando | consenso | 1,1 s / 1 s / 2,1 s (a pausa inicial de 0,45 s é a de hoje) | sim |

Conferência automática (homem e mulher): **0 falha, 2 avisos.** (1) Extensão do punho de 92° na mão espalmada no banco, acima da média do quadro de amplitudes: é a mão de apoio, a mesma situação da flexão (que dá 94°). (2) As linhas de desenho da ficha de movimento (pescoço, apoio, escápulas, ângulos do braço, carga).

Músculos: dorsal e meio das costas (`trapMedInf`) do lado direito em vermelho; ombro de trás e bíceps em laranja. A vista padrão do modo Músculos é a de três quartos, de trás (220 cm² do principal; de lado, 176 cm²). Testei as seis vistas: de cima mostra mais músculo (388 cm²), mas de cima a puxada vai na direção de quem olha e a técnica não se lê; de trás mostra quase só o quadril (159 cm²); de frente, 0.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Girar o tronco | três quartos, de trás | a coluna gira 18° no fim (35% na lombar, o resto na torácica), como hoje; o peito abre para o lado do braço que puxa; o halter continua fora da coxa (0,5 cm: aqui o núcleo afasta o braço o necessário) |
| Arredondar as costas | lado | lombar +22° e torácica +22°; a bacia vira para trás o bastante para o ombro de apoio ficar à mesma distância da mão (a mão não sai do banco): as costas fazem uma corcunda, sem os ombros caírem |
| Não estender o braço (quadro parado no começo) | lado | a volta para a 45% do caminho: o cotovelo fica dobrado ~45° |

**Folga da carga (núcleo):** se num quadro a carga chegaria a menos de 0,5 cm da pele das pernas ou do tronco (num corpo menor, ou num erro que move o tronco), o núcleo afasta os braços que puxam do corpo só o necessário (`resolver1`, contínuo: zero enquanto a folga basta). No homem, no movimento certo, isso não acontece.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Aprovada no lote 1 de 01/11 sem correção registrada; os ids dos erros (`girar`, `arredondar`, `curta`) e os músculos (dorsal e meio das costas; ombro de trás e bíceps) são os de hoje.
- O halter pende na vertical e o peso aparece (seção 7 do guia).

## O que não ficou bom

- **De lado, no começo, o halter aparece desenhado por cima do banco** (`lateral:tec:f0`): ele fica 28 cm para o lado de fora, na frente do banco, mas de perfil as duas figuras se sobrepõem e pode parecer que o halter está apoiado no banco. É a mesma leitura de uma foto de lado; não mudei a geometria por isso.
- O pé de apoio fica de sola para cima com o calcanhar alto (como numa pessoa de verdade com o peito do pé no banco); de lado ele lembra uma ponta.

## Correção de 19/11 (halter dentro do corpo)

Depois do aviso do Gustavo na remada sem banco ("o halter tá puxando pra dentro do próprio corpo"), medi esta com as mesmas regras. **Nada mudou aqui.**
- `peso-fora-do-corpo` (as cabeças do halter contra a superfície do corpo, no ciclo e em cada erro em 9 instantes): **0 cm**; o halter não entra no corpo.
- `remada-carga-pintada-no-lugar` (a ordem de pintura do halter contra o corpo, nas vistas do guia): passa (de lado, o halter é pintado na frente do tronco com 19,8 cm de folga; de três quartos de trás, nada se cruza).
- O fim da puxada: a mão fica 18,4 cm à frente do centro do quadril e 12,2 cm abaixo dele, a 67% do caminho do ombro ao quadril. Com o tronco quase deitado (13,7° acima da horizontal), é ao lado das costelas de baixo, com o antebraço na vertical: é a remada de verdade, e não o defeito da remada sem banco. A regra `remada-sem-banco-carga-ao-lado-do-quadril` é das remadas sem banco e não vale aqui.
