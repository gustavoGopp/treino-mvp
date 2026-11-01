# Prompt: marco R0b (o gerador com a divisão escolhida e as vagas por função)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 01/11/2026, ao fim da sessão que fez o tema T7 da pesquisa v2.
> Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai começar os **marcos de código** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão (quando um termo técnico for inevitável, explique em uma frase).

**Onde o projeto está (01/11/2026)**
- Os marcos M0 a M5 estão prontos e em produção: gerador, cadastro, foto do equipamento, treino com registro e progressão.
- A **pesquisa v2** (`docs/pesquisa-v2/`, temas T1 a T7) está **aprovada inteira**. Ela refez a base do programa sem tomar como certo o programa pessoal de referência (`referencia/programa-fase-1.md`, histórico).
- **Nada da pesquisa v2 entrou ainda em `docs/pesquisa/regras.md` nem no código.** Ela entra nos marcos R0b, R0c, R1 e R2 (`docs/PLANO-MVP.md`, seção i).
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo; família e amigos podem testar, mas o plano não depende disso;
  - **não há profissional de Educação Física no projeto por agora.** As regras de segurança e a triagem não mudam;
  - fora por agora: foto do corpo e biotipo, e idade, peso, sexo e altura no perfil;
  - **qualidade do guia:** exercício sem animação aprovada aparece como cartão de texto, nunca com uma animação improvisada (`CLAUDE.md`).

**O que a pesquisa v2 decidiu e que o R0b aplica** (leia os arquivos; não reabra as decisões):
- `01-divisao-e-frequencia.md`: a divisão é **escolhida pela pessoa** entre opções equivalentes (tabela por número de dias; o app recomenda uma, sem pré-marcar; 6 dias passa a ser aceito).
- `02-panorama-da-evidencia.md`: os **4 ajustes**: descanso dos multiarticulares em 90–120 s; semana leve só com sinal; drop set e séries pareadas antes na escada de tempo; sobrecarga na descida em estudo (não entra).
- `04-exercicios-por-musculo.md` (T3): a vaga pede uma **função**, não um equipamento; as regras `selecao.funcao-da-vaga`, `selecao.alongado`, `selecao.exercicios-por-musculo`, `selecao.isolador-obrigatorio` (extensora, tríceps acima da cabeça, panturrilha em pé), `selecao.equivalencia`, `selecao.manter-no-bloco`; os modelos de dia por função (seção 4).
- `05-montagem-da-sessao.md` (T4): a tabela "minutos → exercícios", o descanso de 105 s e a **nova escada de cortes** (primeiro técnicas que mantêm o volume; nunca cortar um músculo prioritário antes de um não prioritário).
- `08-equipamentos-v2.md` (T7): a **tabela 2.1 (funções em níveis)** é o dado que o R0b usa para preencher cada vaga; os padrões novos `extensao-quadril`, `abducao-quadril` e `aducao-quadril`; o músculo `adutores` **sem meta** (como o `ombro_anterior`); `selecao.gluteo`; a meta do R0 reescrita: **0 equipamento sem exercício possível**.
- `06` (T5) e `07` (T6) são de R1 e R2: não entram aqui, salvo o descanso (`02`).
</contexto>

<objetivo>
Fazer o **marco R0b**: o gerador com a divisão escolhida, as vagas por função e os 4 ajustes aprovados.

1. **`docs/pesquisa/regras.md` e `src/domain/regras/regras.json`:** entram as regras aprovadas no `01`, `02`, `04`, `05` e `08` que mexem no gerador, cada uma com selo e fonte, e as fontes novas em `docs/pesquisa/fontes.md`. Há um teste que confere `regras.md` contra o JSON (`tests/repo/regras-sync.test.ts`, `scripts/gerar-regras.mjs`): mantenha os dois em sincronia.
2. **Divisão escolhida:** as opções por número de dias do `01`, com a recomendada explicada e nada pré-marcado. O perfil passa a guardar a divisão escolhida, com migração do estado salvo (já existe uma migração de versão em `src/`; siga o mesmo padrão e teste).
3. **Vagas por função:** os modelos de dia viram listas de funções (`src/domain/gerador/divisoes.ts`), e a tabela 2.1 do `08` vira dado validado com zod. Sai o campo `ordem` da biblioteca: o desempate passa a ser estabilidade (só para iniciante), carga possível e variedade entre os dias. A extensora entra sempre que houver. Os padrões novos de glúteo entram, e a `ponte-gluteo` muda para `extensao-quadril`.
4. **Tempo:** descanso de 105 s nos multiarticulares e a nova escada de cortes do `05`.
5. **Testes:**
   - cada regra nova tem teste no Vitest;
   - os snapshots das 4 personas (`tests/unit/__snapshots__/gerador.test.ts.snap`) mudam **só com revisão**: mostre ao Gustavo o antes e o depois de cada um;
   - as metas do R0 medidas com a persona Carla (academia completa): 45 ou mais exercícios distintos (com os exercícios que já existem, o número real pode ser menor; diga quanto falta para o R0c), 0 equipamento sem exercício possível, 2 ou mais alternativas de outro equipamento por exercício, e aviso com o motivo verdadeiro quando a meta de um músculo não for atingida.

**Fica para o R0c, não faça aqui:** os 21 equipamentos e os 29 exercícios novos, os ids novos na visão, os atalhos na tela (R1), as animações e os desenhos de equipamento.

**Pronto quando:** `npm run check` e `npm run test:e2e` passam, as regras novas estão em `regras.md` com selo, os snapshots revistos foram aprovados pelo Gustavo e o devlog do marco está escrito.
</objetivo>

<como_trabalhar>
1. **Leia primeiro:** `CLAUDE.md`, `docs/PLANO-MVP.md` (seções a e i), `docs/pesquisa-v2/` (`01`, `02`, `04`, `05` e `08`, seções 2.1, 3.1 e 7), `docs/pesquisa/regras.md` e o código de `src/domain/gerador/`, `src/domain/biblioteca/`, `src/domain/regras/` e `tests/unit/gerador.test.ts`.
2. **Plano antes do código:** mostre ao Gustavo, em linguagem simples, o que muda no programa de cada persona antes de mexer nos snapshots.
3. **Determinístico:** sem `Math.random` nem `Date.now` em `src/domain/`. A mesma entrada gera a mesma saída.
4. **Commits:** pequenos, em pt-BR, no imperativo, num branch. A `main` só depois da aprovação do marco.
5. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (slug `5cae90d2-05e5-438d-a138-2eeca6023832`). Use `get_artifact` antes de editar e acrescente no topo uma seção do R0b com o antes e o depois dos programas das personas.
6. **Nunca use nada de `privado/`** em arquivos versionados. O T8 (o programa do Gustavo) é feito na máquina dele, depois do R0b.
7. **Pendências do Gustavo** estão em `docs/backlog.md` (a chave da Anthropic, os 2 projetos extras na Vercel, o limite compartilhado da foto). Lembre-as só se fizer sentido.
</como_trabalhar>

<entrega>
Ao fim do marco, atualize o `docs/devlog.md` (o que mudou, imagem ou GIF, rascunho de post) e diga em poucas linhas, em pt-BR simples:
- o que mudou no programa de cada persona;
- o que ficou para o R0c;
- o que precisa da decisão dele.

Depois pare e espere a revisão. Quando o R0b for aprovado, proponha o prompt do R0c.
</entrega>
