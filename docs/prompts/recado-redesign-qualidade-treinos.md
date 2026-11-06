# Recado para a sessão do redesign visual: o que a sessão de qualidade dos treinos muda (06/11/2026)

Este recado é da sessão de qualidade dos treinos gerados (`docs/prompts/sessao-qualidade-treinos.md`, `docs/revisoes/qualidade-treinos.md`). Ela foi para a `main` em 06/11/2026, no merge `6cb49d5`, com o ok do Gustavo. Ela **não mexeu** na branch do redesign (`claude/inspiring-rubin-njhaz8`) nem em telas: só no gerador (`src/domain/`), na biblioteca, em 2 animações, nas regras, nas fontes e nos testes.

## O que acontece ao juntar a `main` nova com o redesign (medido em 06/11, numa cópia descartável)
- **Conflito de texto: nenhum.** O `git merge origin/main` na branch do redesign (`0911601`) entra sozinho.
- **Falham 2 testes unitários**, os dois do `fontes.json` do redesign:
  - `tests/repo/fontes-sync.test.ts`;
  - `tests/unit/fontes.test.ts`, no caso "toda fonte citada numa regra existe no arquivo".

  Eles falham porque a sessão de qualidade acrescentou 94 fontes a `docs/pesquisa/fontes.md`, renomeou 7 chaves e passou as regras de 134 para 141.
- **Conserto, um comando só:** `node scripts/gerar-fontes.mjs`. Ele grava 175 de 175 fontes em `src/conteudo/fontes.json`: 101 linhas a mais e 16 a menos. Depois dele:
  - `npm run check` passa inteiro, com 674 testes;
  - `npm run test:e2e` também, com 79 passando e 13 pulados, que são os `fixme` já previstos em `cenarios.spec.ts`.
- Sugestão de commit depois do merge: "Regera as fontes do selo depois da sessão de qualidade dos treinos".

## O que as telas passam a receber do gerador
Nada mudou nos campos do programa nem no armazenamento: a lista de divisões só ganhou `ct-6x`. O que muda é o conteúdo.
- **Dias com mais exercícios:** quem tem pouco equipamento recebe 1 ou 2 exercícios a mais por dia. Na grade, os dias com 3 exercícios ou menos, com 45 min ou mais, caíram de 16,5% para 6,6%. Na academia completa, a contagem não muda.
- **Mais séries por exercício nos dias com vaga vazia:** até 4 séries (antes eram mais comuns 2 e 3).
- **Textos novos ou mais longos** (o "porquê" e os avisos). Os mais longos são estes:
  - **Aviso de focos que disputam o tempo** (`volume.prioridade.competicao`), o maior de todos: "Seus focos disputam o mesmo tempo: peito 11 de 12 e costas 11 de 12 séries por semana. Com 3 treinos de 45 min não cabe tudo: para o foco render, escolha um grupo só, ou aumente os minutos ou os dias." É o texto real do Bruno com 3 treinos de 45 min e foco em peito e costas. Com "Pernas" entre os focos, ele ganha mais uma frase; a Carla recebe esse aviso.
  - **O porquê do foco** (`volume.semanal.alvo`): "Foco em peito e costas: ~12 séries por semana, para crescer mais rápido. Os outros músculos ficam com ~6: continuam crescendo, mais devagar." Sem foco, a frase começa por "Sem grupo de foco".
  - **O porquê das séries a mais** (`tempo.sobra-series`): "Nos dias com vaga sem exercício possível, o tempo que sobrou virou série: …"
  - **O porquê de um exercício que entrou no lugar de outro** (`selecao.vaga-sem-equipamento`) e **o de um exercício protegido** (`tempo.musculo-protegido`, abdômen e panturrilha), um por exercício.
  - **O aviso de tempo sobrando** (`tempo.sobra`), que agora também aparece com dor e começa por "Com o que dá para fazer hoje".
- **Uma divisão nova, "Corpo todo 6x".** Só aparece para quem tem 6 dias e não tem como puxar. Ela não entra nas opções da tela de rotina, mas pode aparecer no título do programa.
- **Acompanhamento:** na volta da pausa da Ana, o abdominal protegido entra no Corpo todo A. A semana dela passa a contar "9 de 16" séries, e o búlgaro aparece como "Meta: 1 × 8–12 (cada lado) · RIR 3–4" (`tests/e2e/acompanhamento.spec.ts`).
- **O selo de cada regra** agora tem 141 regras e 175 fontes para abrir. O selo de 2 regras subiu e o de 1 desceu (Parte F da revisão):
  - `ordem.sessao` e `selecao.multi-mono` subiram para moderada;
  - `volume.serie-indireta.peso` desceu para um estudo.

## O que conferir nas telas do redesign
1. Os avisos longos acima, com a letra a 125% e o zoom de 200%. Os testes de texto cortado passaram na cópia, mas com as personas dos testes, que talvez não recebam o aviso de focos.
2. Os dias com 6 a 8 exercícios no início e na semana, a 360 px.
3. O porquê de exercício "no lugar de" e "protegido", dentro do cartão do exercício e na folha do selo.
