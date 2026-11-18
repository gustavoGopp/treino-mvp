# Prompt: a ordem entre exercícios equivalentes no gerador

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 18/11/2026, na sessão das animações restantes, depois da decisão do Gustavo ("pode seguir com a sua recomendação").

---

<contexto>
O treino-mvp é um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência e conduz o treino com um guia animado. O dono é o Gustavo: não é programador nem da área de exercício, decide olhando exemplos, quer uma decisão por vez, em português simples, com a sua recomendação.

O gerador (`src/domain/gerador/index.ts`) escolhe, para cada vaga, um exercício dos níveis de uma função (`src/domain/gerador/funcoes.ts`). Entre exercícios do mesmo nível, a chave de desempate é: evitar repetir no último dia, um afundo por dia, dor leve, estabilidade para o iniciante, a carga possível com o equipamento, a variedade entre os dias, a preferência da pessoa e, por último, **"o que o guia já mostra animado"** (`animacaoId`). Se tudo empata, decide `ordemFixa` (a ordem alfabética do id), que existe só para a mesma entrada dar a mesma saída.

A frente das animações restantes (`docs/revisoes/animacoes-restantes/plano.md`) está animando os 81 exercícios que ainda eram cartão de texto. Com todos animados, o critério "tem animação" deixa de separar alguém e **a ordem alfabética passa a decidir**: medido em 3.751 programas do teste de estresse, ligar só a fase A (42 exercícios) muda 80% dos programas, e as maiores trocas são `bulgaro → agachamento-halteres` (387), `goblet → agachamento-halteres` (353), `ponte-gluteo → coice-elastico` (153), `rosca-martelo → rosca-concentrada` (122), `bulgaro → afundo-tras` (117). Nas personas: a Ana e o Bruno trocam o búlgaro pelo agachamento com halteres; o Diego troca a ponte de glúteo pelo coice com elástico. Nenhuma dessas trocas vem de evidência. Resultado completo: `docs/revisoes/animacoes-restantes/efeito-no-treino.json`; o script: `scripts/animacao-nova/efeito-no-treino.ts` (liga os lotes só na memória e compara).
</contexto>

<tarefa>
1. Leia `CLAUDE.md`, a seção 4 do plano das animações restantes e o gerador (a chave de desempate e `motivoDaEscolha`, que explica a escolha ao usuário).
2. Proponha ao Gustavo como o gerador deve escolher entre equivalentes quando a animação não separar mais ninguém, com evidência e fonte para cada critério (a base está em `docs/pesquisa/` e `docs/pesquisa-v2/`, que prevalece). Opções a considerar: uma ordem de preferência dentro de cada nível das funções (o primeiro do nível é o preferido, com o motivo e a fonte); critérios novos medidos (amplitude, estabilidade, carga possível); ou manter a ordem alfabética, dizendo o que isso significa. Recomende uma.
3. Mostre, com o script do efeito, o que muda nas personas e na amostra do estresse com a proposta, contra hoje e contra "todos animados com a ordem alfabética". O ideal é que, com todos animados, os programas de hoje mudem o mínimo e só por motivo.
4. Depois do ok do Gustavo, implemente no domínio, com testes (100% das regras testadas), a regra nova na página "Entenda o treino" com o nível de evidência e a fonte, e o texto do porquê da escolha atualizado.
</tarefa>

<como_trabalhar>
- Ramo novo a partir da `main`; nada na `main` sem o ok dele; commits pequenos, em pt-BR, no imperativo.
- Não mexa em `src/engine/`, nas animações nem no `animacaoId` da biblioteca (isso é da frente das animações).
- Só páginas públicas na pesquisa; não invente estudo nem número.
- Ao terminar, avise no `docs/backlog.md` que a frente das animações pode ligar a fase A.
</como_trabalhar>
