# Prompt: a ordem entre exercícios equivalentes no gerador

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 18/11/2026, na sessão das animações restantes, depois da decisão do Gustavo ("pode seguir com a sua recomendação"). Atualizado em 21/11/2026, com as 81 animações prontas e aprovadas.

---

<contexto>
O treino-mvp é um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência e conduz o treino com um guia animado. O dono é o Gustavo: não é programador nem da área de exercício, decide olhando exemplos, quer uma decisão por vez, em português simples, com a sua recomendação.

O gerador (`src/domain/gerador/index.ts`) escolhe, para cada vaga, um exercício dos níveis de uma função (`src/domain/gerador/funcoes.ts`). Entre exercícios do mesmo nível, a chave de desempate é: evitar repetir no último dia, um afundo por dia, dor leve, estabilidade para o iniciante, a carga possível com o equipamento, a variedade entre os dias, a preferência da pessoa e, por último, **"o que o guia já mostra animado"** (`animacaoId`). Se tudo empata, decide `ordemFixa` (a ordem alfabética do id), que existe só para a mesma entrada dar a mesma saída.

A frente das animações restantes (`docs/revisoes/animacoes-restantes/plano.md`) animou os 81 exercícios que ainda eram cartão de texto: **as 81 estão prontas e aprovadas pelo Gustavo** (`src/engine/novo/aprovados.ts`, `ESPERAM_A_LIGACAO`), mas nenhuma foi ligada ao app (o `animacaoId` da biblioteca não mudou), à espera desta sessão. Com todos animados, o critério "tem animação" deixa de separar alguém e **a ordem alfabética passa a decidir**: medido na amostra do teste de estresse (20/11), mudam 15,7% dos programas com o lote A1, 80,4% com a fase A, 80,9% com a B e 82,5% com as 81. As maiores trocas, com as 81: `goblet → agachamento-halteres` (331), `bulgaro → agachamento-halteres` (309), `ponte-gluteo → coice-elastico` (153), `rosca-martelo → rosca-concentrada` (118), `bulgaro → afundo-tras` (98). Nas personas: a Ana troca o búlgaro pelo agachamento com halteres; o Diego, a remada sentada pela curvada com elástico e a ponte de glúteo pelo coice com elástico; o Bruno tem cinco trocas e a Carla, oito (`docs/devlog.md`, entrada de 17 a 20/11). Nenhuma dessas trocas vem de evidência. Resultado completo: `docs/revisoes/animacoes-restantes/efeito-no-treino.json`; o script: `scripts/animacao-nova/efeito-no-treino.ts` (liga os lotes só na memória e compara).
</contexto>

<tarefa>
1. Leia `CLAUDE.md`, a seção 4 do plano das animações restantes e o gerador (a chave de desempate e `motivoDaEscolha`, que explica a escolha ao usuário).
2. Proponha ao Gustavo como o gerador deve escolher entre equivalentes quando a animação não separar mais ninguém, com evidência e fonte para cada critério (a base está em `docs/pesquisa/` e `docs/pesquisa-v2/`, que prevalece). Opções a considerar: uma ordem de preferência dentro de cada nível das funções (o primeiro do nível é o preferido, com o motivo e a fonte); critérios novos medidos (amplitude, estabilidade, carga possível); ou manter a ordem alfabética, dizendo o que isso significa. Recomende uma.
3. Mostre, com o script do efeito, o que muda nas personas e na amostra do estresse com a proposta, contra hoje e contra "todos animados com a ordem alfabética". O ideal é que, com todos animados, os programas de hoje mudem o mínimo e só por motivo.
4. Leve também, como uma decisão à parte, os músculos secundários que a ficha da técnica propõe e a biblioteca não tem (`docs/revisoes/animacoes-restantes/pedidos-ao-conteudo.md`, seção 2: goblet, agachamento no smith, hip thrust, coices, voador invertido): somar ou não muda o volume semanal que o gerador conta, então mostre o efeito antes.
5. Depois do ok do Gustavo, implemente no domínio, com testes (100% das regras testadas), a regra nova na página "Entenda o treino" com o nível de evidência e a fonte, e o texto do porquê da escolha atualizado.
</tarefa>

<como_trabalhar>
- Ramo novo a partir da `main` se o ramo das animações (`claude/great-dirac-cabwvh`) já tiver entrado nela; se não, a partir desse ramo (o script do efeito precisa das animações). Nada na `main` sem o ok dele; commits pequenos, em pt-BR, no imperativo.
- Não mexa em `src/engine/`, nas animações nem no `animacaoId` da biblioteca (isso é da frente das animações).
- Só páginas públicas na pesquisa; não invente estudo nem número.
- Ao terminar, avise no `docs/backlog.md` que a frente das animações pode ligar a fase A.
</como_trabalhar>
