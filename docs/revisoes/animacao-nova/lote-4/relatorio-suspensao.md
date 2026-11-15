# Lote 4 · Relatório da família da fita com as duas mãos (remada, rosca, tríceps, T)

Ramo: `worktree-agent-a682e8e1f801e3195`. Commits: `6ccd078` (remada e núcleo), `a5c5bc9` (rosca), `c9542d4` (tríceps), `979a556` (T), e o commit deste relatório. Os quatro foram feitos. Conferência escrita de cada um nesta pasta.

## O que vale para os quatro

- **Núcleo novo** `src/engine/novo/exercicios/na-fita.ts`: pés presos (nos calcanhares com a ponta para cima, ou na ponta dos pés), corpo reto que gira no tornozelo, mãos fechadas nos pegadores. Cada variação diz onde ficam os braços no tronco; o **ângulo do corpo sai da fita** (`resolver1`: o único em que o pegador fica no comprimento da fita). O comprimento sai da posição inicial da ficha. As duas fitas medem a mesma coisa o ciclo inteiro (variação 0 cm, `estica: false`).
- **Âncora a 182,9 cm** (a do fabricante, como o búlgaro na suspensão), e não os 205 cm de hoje. Por isso as fitas e a posição dos pés mudaram em relação a hoje (abaixo, por exercício).
- **Regras novas** em `src/engine/novo/regras/suspensao.ts` (mãos nos pegadores, calcanhares no chão, ponta dos pés, corpo sobe/vai à frente com a fita, mãos ao lado do peito, cotovelos rentes, antebraço na linha da fita, escápulas se juntam, palmas, cotovelos parados, mãos perto da testa, fita por cima da cabeça, braços quase retos, mãos na linha dos ombros). A `corpo-em-linha` é a de `conferir.ts`.
- **Contatos:** a ficha declara `pegador.R` e `pegador.L` além dos pés. A conferência não conhece esse nome e só o pula (a mão é medida pela regra `maos-nos-pegadores`); com ele, ela também deixa de exigir o centro de massa sobre os pés, o que não vale aqui (o corpo está pendurado nas mãos). É um uso do campo que o integrador deve conhecer.
- **Músculos:** dorsal, `trapMedInf`, `deltPost`, `biceps`, `triceps` e `antebraco` existem no desenho; nenhum faltou.

## Arquivos comuns mexidos (todos aditivos)

- `src/engine/novo/pecas-de-cena/suspensao.ts`: (1) `pontoDeDivisao` exportado (para a fita puxar a mão nessa direção); (2) opção `vigaComoCenario`: a viga e a ponta da fita de ancoragem vão para uma peça à parte com `cenario: true` (atrás do corpo, fora do enquadramento), para o corpo não encolher no quadro; (3) com essa opção, na vista de cima a viga não é desenhada (ficava parecendo um degrau sob os pés). Sem a opção, nada muda: `conferir.mjs bulgaro-suspensao` segue com 0 falha e os mesmos 3 avisos.
- Uma linha em `exercicios/registro.ts` por exercício e uma em `regras/registro.ts`.
- `npm run conferir:animacao`: 0 falha em todas as animações (os arquivos gerais regenerados foram desfeitos).

## Remada na suspensão (`6ccd078`)

- **Conferência automática:** 0 falha, 2 avisos: ritmo (salto de 17,3% da velocidade de pico na mão, no começo da puxada; falha seria 25%) e as linhas de escolha de desenho.
- **O que não ficou bom:** os pés ficam 20 cm antes da vertical da âncora (hoje, 30 cm além): com a âncora do fabricante e os pés além dela, as mãos só chegavam ao peito com o corpo passando da vertical (medido). De trás, no começo, as mãos ficam atrás da cabeça (testei `quinaTras`, pior). O corpo sobe de 55° a 32,7° (hoje, a 21°).
- **Risco de o dono não gostar: médio.** Lê-se como remada, mas a posição dos pés e o fim (mãos na altura alta do peito, cotovelo junto do tronco) mudaram em relação ao aprovado de hoje.
- **Provisórias:** pés (−20 cm), ângulo inicial 55°, ponta do pé 25°, braço 30° atrás no fim, polegar, escápulas (+6 / −10 / −1); fita resultante 96,5 cm.

## Rosca na suspensão (`a5c5bc9`)

- **Conferência automática:** 0 falha, 2 avisos: escolhas de desenho e o antebraço como "só ajuda" fora da lista da biblioteca (é a correção de 04/11).
- **O que não ficou bom:** de lado, no fim, a mão aparece sobre o contorno da cabeça (ela está ao lado, a 12 cm da superfície; com 128° de cotovelo ficava em cima da testa, baixei para 115°). O quadril caído desce 17 cm, mais forte que na remada.
- **Risco: médio.** A segunda vista passou a ser a de cima (a mesma de hoje; de frente o bíceps não aparecia: 0 cm²).
- **Provisórias:** as da remada (mesma partida), cotovelo 115° no fim, polegar 0,4 para cima; fita 97,7 cm.

## Tríceps na suspensão (`c9542d4`)

- **Conferência automática:** 0 falha, 1 aviso (escolhas de desenho).
- **O que não ficou bom:** as mãos param em frente ao alto da testa (20 cm acima do centro da cabeça); baixar o braço faz a fita encostar na cabeça (0 cm, medido) e dobrar menos deixa as mãos longe (falha). Os cotovelos ficam parados no tronco, mas no mundo descem 30 cm (o corpo inclina 17°); hoje a altura do cotovelo ficava parada. Os pés foram para 50 cm atrás da âncora (hoje, 30): com 30, a fita passava a 0,2 cm da cabeça. O apoio é na ponta dos pés (a ficha não diz; hoje é nos calcanhares).
- **Risco: médio**, puxando para alto pelo apoio na ponta e pela mão acima da testa.
- **Provisórias:** pés 50 cm atrás, calcanhar 35°, ângulo inicial 24°, braço a 115° no tronco, cotovelo 100° no fim, polegar girado 20°; fita 82 cm.

## T na suspensão (`979a556`)

- **Conferência automática:** 0 falha, 2 avisos: escolhas de desenho e a vista de lado, que não serve ao modo Músculos (4 cm² do ombro de trás; a padrão é a de trás, 54 cm²).
- **O que não ficou bom:** de lado, no T, o pegador fica desenhado sobre o ombro (ele está 81 cm para o lado). O "encolher os ombros" quase não se vê (o ombro sobe 1,6 cm com os mesmos +7 de hoje). Partida a 65° e pés 35 cm antes da âncora (hoje, 60° e 12 cm além), senão a fita ficava curta e o corpo passava da vertical.
- **Risco: baixo.** De trás o T se lê bem e o corpo sobe de 65° a 18,8°, como hoje.
- **Provisórias:** pés −35 cm, ângulo inicial 65°, cotovelo 10°, polegar, escápulas; fita 129,7 cm.

## Medidas provisórias do equipamento (do lote 1, não mudaram)

Largura da fita (3,8 cm), mosquetão (10 cm), pegador (14 × 3,5 cm), berço (9 × 6 cm), viga (só de desenho).
