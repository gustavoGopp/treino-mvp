# Prompt: R5d, o foco que aparece (o grupo escolhido recebe atenção de verdade)

> Escrito na sessão de próximos passos (07/11/2026), a partir das decisões da parte 3 de `docs/revisoes/proximos-passos.md`, de `docs/revisoes/proximos-passos/a-qualidade.md` (pacote B) e de `g-biblioteca-ampliada.md` (seções 5 e 6). É o 3º marco da ordem: vem depois do R5a e do R5-CL, porque mede o foco com a biblioteca ampliada e com a régua da G5 já na auditoria. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova, ou siga-o dentro da sessão de desenvolvimento (`sessao-desenvolvimento.md`).

---

Você vai conduzir o **R5d, "o foco que aparece"**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase. **Ele decide o produto; as decisões técnicas são suas**, sempre com o motivo e o efeito medido.

**Por que este marco.** Na sessão de próximos passos, duas revisões cegas por treinadores independentes (que não sabiam qual semana era de qual versão do app) apontaram, nas duas versões, a mesma falha: **o grupo que a pessoa escolheu como foco recebe quase o mesmo volume que o resto**, e o app diz que "não cabe" enquanto gasta séries em abdominal, elevação lateral ou braço de quem não é foco. Na régua da frente G5, é a nota **C2 "foco invisível"**: o prioritário não passa da mediana dos outros músculos em ~29% dos programas sem dor (42% no iniciante, cuja meta de foco é 8 contra 6 dos outros). No caso que motivou a sessão (intermediário, sem nada, foco nos superiores, 60 min), as pernas, que não são foco, recebem 11 a 12 séries por semana, tanto quanto o peito. A frente A mediu o caminho: a "prioridade puxa frequência" escrita no backlog (D-4) quase não tem efeito (o teto da sessão explica 4 de 5.301 casos); **um 2º exercício de outra função para o prioritário** (D-4c) baixa o prioritário abaixo da meta de 45,3% para 40,5% (avançado: de 64,9% para 55,1%). E os treinadores também apontaram: o avançado sem equipamento recebe os mesmos exercícios do iniciante, e o iniciante com barra fixa recebe a barra sem a versão assistida.

**O que entra (decidido em 07/11):**
1. **O 2º exercício do prioritário** (D-4c): quando o prioritário fica abaixo da meta, ele ganha um exercício de outra função do mesmo músculo, de preferência num dia da mesma região (nunca panturrilha num dia de "Puxar"). Regra nova `volume.prioridade.segundo-exercicio` (moderada para o 2º exercício; consenso para a escolha do dia).
2. **Cortar primeiro o que não é foco:** nos cortes de tempo (`cortarTempo`) e no preenchimento do tempo que sobra (`tempo.sobra-series`), os isoladores dos grupos que não são foco saem antes e entram depois; o tempo que sobra vai primeiro para o foco até a meta, e só então para os outros, que não descem do piso dos não prioritários (`volume.semanal.minimo-eficaz`, 4 a 6 séries por semana).
3. **"Escolha até 2 grupos de foco"** no cadastro (D-3), sem bloquear; "pernas" conta como 3 músculos. A tela é pedido ao design.
4. **O 1º degrau da escada pelo nível:** no corpo livre e no elástico, o intermediário e o avançado não começam pelo degrau do iniciante (`src/domain/progressao/escadas.json`). O degrau inicial é um valor de partida, não muda o estado guardado (o degrau é guardado como índice, `src/storage/esquema.ts`); confira e, se mudar, pare e pergunte.
5. **A regressão da barra fixa:** para o iniciante, a barra só na descida (`barra-fixa-negativa`, que o R5-CL pôs no fim de `puxar-vertical`) vem antes da barra, até a pessoa fazer repetições completas; a passagem para a barra é uma regra de progressão (consenso; `schoenfeld2017`, `fukunaga2022` em `docs/pesquisa/fontes.md`).
6. **Os avisos de lacuna pelo que o programa tem de fato:** não dizer "ombro de trás sem exercício" com a abertura em T no programa, nem "costas só com remadas" com puxada de elástico.
7. **O texto da meta do iniciante:** dizer por que o foco do iniciante é 8 séries e os outros 6, ou propor mudar (a G5 deixou a pergunta; decida com a evidência de `docs/pesquisa-v2/15-prioridade-e-manutencao.md` e registre).

**Leia primeiro:** o `CLAUDE.md`; a parte 3 de `docs/revisoes/proximos-passos.md`; `docs/revisoes/proximos-passos/a-qualidade.md` (pacote B, a D-4c medida, os pedidos ao domínio 4); `g-biblioteca-ampliada.md` (seções 1, 5 e 6: a régua, o que os treinadores criticaram, como foi a revisão cega); `docs/pesquisa-v2/15-prioridade-e-manutencao.md`, `14-combinacoes-por-dia.md` e `17-biblioteca-ampliada.md` (parte G5, a régua); `docs/revisoes/qualidade-treinos.md` (Parte D, o que a prioridade faz); `src/domain/gerador/index.ts` (`metasDoPerfil`, `cortarTempo`, a sobra de tempo, os avisos), `divisoes.ts`, `funcoes.json`; `src/domain/progressao/escadas.json`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real` nem na branch do redesign. `privado/` nunca é versionado nem usado; as personas são fictícias.
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar.
- Toda regra nova ou mudada entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte. Gerador determinístico. **Nenhuma mudança no gerador sem o antes e o depois das 6 personas** e da grade (`npm run auditoria:qualidade`, com a régua da G5 que o R5-CL pôs na auditoria).
- **A régua em dois níveis:** nenhum defeito pode piorar em relação à `main`; uma mudança só entra se melhora alguma nota.
- O visual é do redesign: a tela do "escolha até 2" e os textos novos são pedidos ao design.
- Rede liberada (PubMed, PMC, Crossref). Nunca contorne bloqueio anti-robô. Nada de inventar estudo.

**O que fazer, nesta ordem**
1. **A linha de base:** a grade e as 18 personas de `g-biblioteca-ampliada.md` (as 6 de `tests/personas/` e as 12 de teste, que a sessão de biblioteca deve ter versionado; se não, recrie-as como fictícias em `tests/personas/` e diga), com a nota C2 por nível e por cenário.
2. **Itens 2 e 1** (cortar primeiro o que não é foco; o 2º exercício do prioritário), um de cada vez, medidos.
3. **Itens 4 e 5** (o degrau inicial pelo nível; a regressão da barra), medidos nas personas sem equipamento e com barra fixa.
4. **Itens 6, 7 e 3** (avisos, texto da meta, "escolha até 2").
5. **Revisão cega:** um subagente no papel de treinador independente recebe as 36 semanas (as 18 personas, a `main` e a versão nova, embaralhadas), só com as semanas e um briefing, e dá as notas eficiente, agradável e adequada, como em `g-biblioteca-ampliada.md`, seção 6.

**Aceite (medido)**
- Nenhum defeito da régua pior que na `main`; C1 (foco abaixo da meta com tempo) ≤ o da `main`.
- **C2 "foco invisível" ≤ 15%** dos programas sem dor (era ~29%), e o iniciante ≤ 20%.
- O caso do Gustavo (intermediário, sem nada, 3 e 4 dias, 60 min, foco nos superiores): as séries semanais de peito e tríceps acima das de quadríceps e posteriores, que ficam perto do piso dos não prioritários (`volume.semanal.minimo-eficaz`).
- O avançado sem equipamento não recebe o 1º degrau do iniciante; o iniciante só com barra fixa recebe a negativa antes da barra.
- Na revisão cega, nenhuma persona pior e a nota "eficiente" maior que a da `main`.
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos; snapshots revisados pelo Gustavo.

**Fechamento.** `docs/devlog.md` (o antes e o depois do caso do Gustavo, a tabela da régua, a revisão cega e o rascunho de post), `docs/backlog.md`, o recado ao R3 se o programa do Gustavo mudar, e parar para a revisão dele.

**O que não fazer**
- Não crie o modo "só este grupo" que zera os outros (D-5): o piso dos não prioritários fica.
- Não use todo o tempo que sobra para todos os músculos (E-c, descartado em 07/11).
- Não troque a lógica "vaga por função, nunca por equipamento", nem o determinismo.
- Não afirme nada sobre treino sem selo e fonte.
