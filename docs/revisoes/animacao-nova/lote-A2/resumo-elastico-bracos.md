# Lote A2 · Resumo: os quatro de braço com elástico, em pé

De 17/11/2026. Primeiras animações de quatro exercícios que até aqui eram só cartão de texto: o tríceps com elástico preso no alto (`triceps-elastico-alto`), a elevação lateral unilateral com o elástico sob o pé do outro lado (`elevacao-lateral-unilateral-elastico`), a rosca martelo com elástico (`rosca-martelo-elastico`) e a abertura com o elástico entre as mãos (`abertura-elastico`). **Nenhuma foi revista pelo Gustavo**; não estão em `aprovados.ts` nem no catálogo do guia (quem integra faz isso).

Conferências escritas nesta pasta (uma por exercício); quadros grandes em `../quadros/<id>.png`. Sem folha ao lado da de hoje: não existe animação de hoje destes exercícios.

## Resultado da conferência automática

| Exercício | Falhas | Avisos |
|---|---|---|
| `rosca-martelo-elastico` | 0 | 4, os mesmos da rosca com elástico aprovada: o tubo estica mais em cima do que no primeiro quadro; escolhas de desenho (`braco.paraFora`, `elastico.folgaNaPerna`); o antebraço "só ajuda"; de lado o bíceps aparece pouco (o modo Músculos abre de frente, 192 cm²) |
| `triceps-elastico-alto` | 0 | 3: o tubo estica mais embaixo do que no primeiro quadro; escolhas de desenho (pescoço, cabeça, braço para dentro, pegada, onde fica a porta, tubo no quadro); de lado o tríceps aparece pouco (o modo Músculos abre de trás, 218 cm²) |
| `elevacao-lateral-unilateral-elastico` | 0 | 4: o tubo estica mais no alto do que no primeiro quadro; escolhas de desenho (as da elevação com elástico aprovada, a mão solta, onde o pé pisa); a frente do ombro "só ajuda" (como nas elevações aprovadas); de cima o ombro aparece pouco (o modo Músculos abre de frente, 39 cm², um ombro só) |
| `abertura-elastico` | 0 | 3: o laço estica mais no fim do que no primeiro quadro; escolhas de desenho (corpo do face pull com elástico, onde a mão segura a faixa); de cima o ombro de trás não aparece (o modo Músculos abre de trás, 52 cm²) |

`npm run conferir:animacao`: 0 falha nas 100 animações; `preparo.mjs conferir`: as tabelas conferem. `npm run check`: só falha o teste da ponte (`tests/unit/motor-novo-ponte.test.ts`), em dois pontos esperados: "todas as animações estão aprovadas e no catálogo" (as quatro ainda não estão) e "os erros têm os títulos do texto do app" no `triceps-elastico-alto` (o erro "Não testar o ponto alto" ficou sem desenho; quem integra o põe em `SEM_DESENHO`).

## Erros

- Rosca martelo: os três do cartão (cotovelos para a frente, balançar o tronco, pisar só com a ponta do pé).
- Tríceps no alto: dois dos três. **"Não testar o ponto alto" não foi desenhado**: é um cuidado antes da série (puxar forte uma vez); o movimento é o mesmo com e sem o teste, e a consequência (o elástico solto voltando no rosto) é um acidente, não uma posição.
- Elevação unilateral: os três (encolher o ombro, inclinar o tronco, pisar só com a ponta do pé).
- Abertura: os três (dobrar os cotovelos, encolher os ombros, soltar uma ponta).
- "Pisar só com a ponta do pé" (dois exercícios): o pé que segura o elástico fica na ponta (o calcanhar sobe 20°) e o tubo escorrega da bola do pé para a borda dos dedos enquanto estica: é o elástico que escapa, como o cartão diz.

## O elástico fecha a conta

- Rosca martelo: o tubo de 48 pol pisado no meio pelos dois pés (o da rosca com elástico aprovada): de 1,4 a 2,3 vezes (máximo 3).
- Tríceps no alto: o tubo de 48 pol preso pelo meio no topo da porta: de 1,5 a 2,3 vezes.
- Elevação unilateral: pisando no pegador, sobrariam ~40 cm de tubo frouxo com o braço embaixo (e a ficha diz que a tensão já começa embaixo). O pé pisa no tubo perto da ponta e o resto (47 cm, com o outro pegador) fica no chão: o trecho entre o pé e a mão estica de 1,1 a 2,3 vezes.
- Abertura: com o tubo com pegadores as mãos começariam a 140 cm; com o laço seguro pelas pontas, a ~100 cm. A faixa é o laço de 41 pol dobrado, seguro mais fechado (76 cm entre as mãos), com as pontas penduradas fora dos punhos: de 1,05 a 2,2 vezes entre as mãos (máximo 2,5).
- Nos dois últimos, a conferência comum mede o elástico inteiro (o trecho no chão ou pendurado não estica) e uma regra nova de cada um mede o trecho que trabalha, pelo comprimento em repouso guardado numa marca do quadro (`trechoLivre`).

## Mudança em arquivo comum

Nenhuma. Só as linhas nos registros (`exercicios/registro.ts`, `regras/registro.ts`) e os arquivos de preparo. Reaproveitei só funções já exportadas (`polia-bracos.ts`, `elevar-o-braco.ts`, `dobrar-o-cotovelo.ts`, `dobrar-o-quadril.ts`, `elastico-faixa.ts`, `rosca-elastico.ts`) e as peças de cena da porta, do pegador e da faixa, sem mudar nada nelas. A única exportação nova é de um arquivo deste lote (`bordasNaPonta`, de `rosca-martelo-elastico.ts`, usada pela elevação unilateral).

## Regras medidas novas

- `regras/triceps-elastico-alto.ts`: a âncora acima da cabeça e à frente.
- `regras/elevacao-lateral-unilateral-elastico.ts`: o tubo sai de sob o pé esquerdo e passa diante da perna direita; só a mão direita segura; o trecho livre esticado desde embaixo.
- `regras/abertura-elastico.ts`: começo à frente na altura do peito; abre em diagonal; braços quase retos; palmas para baixo; no fim a faixa perto do peito e abaixo do rosto; quanto a faixa estica entre as mãos.

## Riscos

- **Rosca martelo com elástico: baixo.** É a rosca com elástico aprovada com a pegada da rosca martelo aprovada. Ponto fraco: no erro do pé o joelho dobra 36° (o quadril não sobe daquele lado).
- **Tríceps com elástico no alto: baixo.** É o tríceps na polia aprovado com a âncora da puxada com elástico aprovada. Ponto fraco: de lado o pegador quase não aparece.
- **Elevação lateral unilateral com elástico: médio.** Escolhas novas que ele não viu: pisar no tubo perto da ponta (com o resto no chão), o tronco que tomba para o lado no erro "inclinar o tronco" e o erro do pé visto de três quartos por trás; o rótulo do pé fica perto do tubo no chão.
- **Abertura com elástico: médio.** O laço dobrado com as pontas penduradas (para caber no máximo do fabricante), o erro "soltar uma ponta" com a faixa no ar (curva escolhida, não simulada), e de trás os braços estendidos parecem dobrados no começo.
