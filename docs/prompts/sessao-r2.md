# Prompt: marco R2 (acompanhamento personalizado)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 02/11/2026, ao fim da sessão do marco R1b. Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai continuar os **marcos de código** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

**Onde o projeto está (02/11/2026)**
- M0 a M5 estão em produção. A pesquisa v2 (`docs/pesquisa-v2/`, T1 a T7 e T9) está aprovada.
- **O R0b, o R0c, o R1 e o R1b foram aprovados e estão na `main`** (ver `docs/devlog.md`, entradas R1 e R1b).
- **O que o R1b deixou pronto** (é a base do R2):
  - **Vários locais:** `estado.locais` (cada um com nome e inventário), `localPrincipalId` (o programa é montado para ele) e `ultimoLocalId`. Helpers puros em `src/storage/esquema.ts` (`localPrincipal`, `localDoTreino`, `localDoPrograma`, `localDaSessao`…). Cada sessão guarda o `localId`; a sessão antiga, sem local, conta como do 1º local.
  - **Treino do dia no local:** `diaNoLocal` em `src/domain/locais/index.ts` troca cada vaga impossível ali pelo equivalente, com o motivo (`local.treino-do-dia`). No treino, `diaDoTreino` e `opcoesDaCarga` ficam em `src/features/treino/acoes.ts`.
  - **Calibração na 1ª série:** `calibrar`, `emCalibracao` e `semCalibracao` em `src/domain/progressao/calibracao.ts` (`progressao.calibracao`, casos C1 a C7). A série de acerto fica no histórico com `calibracao: true` e fora da dupla progressão. Hoje ela vale na 1ª vez de um exercício e na 1ª vez de uma máquina num local; a volta de mais de 26 semanas ficou para o R2.
  - **Histórico por exercício:** `historicoDoExercicio(historico, exId, local?)` em `src/domain/sessao/index.ts`. Nas máquinas (placa, anilhas, contrapeso), a carga é lida por local; nos halteres, no kettlebell, na barra e no peso do corpo, em qualquer local (`progressao.troca-equivalente`).
  - **"Prefiro este":** `estado.preferidos` (função → exercício), no desempate do gerador (`selecao.preferencia`).
  - **Estado salvo:** versão 6 (`src/storage/esquema.ts`, migrações em `src/storage/migracao.ts`).
  - **Testes:** 408 unitários e 55 no navegador.
- **O que ainda não existe** (é o R2):
  - a **semana do programa** conta semanas do calendário desde a 1ª sessão (`semanaDoPrograma` em `src/domain/sessao`), e a volta gradual só sai da resposta "semanas parado" do cadastro (`fases` em `src/domain/gerador/index.ts`, por `perfil.semanasParado`). Quem treina e some 30 dias volta como se nunca tivesse parado (medido no T6, seção 0);
  - `sugerirSemanaLeve` existe em `src/domain/progressao/index.ts`, mas nenhuma tela a usa;
  - não há tela da semana nem evolução por exercício.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo, sem profissional de Educação Física por agora;
  - ficam fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada;
  - nada vem pré-marcado: um atalho, uma preferência ou um toque opcional é algo que a pessoa escolhe;
  - nada muda no programa sem a escolha da pessoa (o programa salvo só muda quando ela pede);
  - as personas são fictícias (`tests/personas/`): a Ana tem 45 min; a Carla, os 46 equipamentos; o Bruno, o "prédio" e a "academia do bairro";
  - **as 5 decisões do T6** (no topo de `docs/pesquisa-v2/07-progressao-e-acompanhamento.md`):
    1. a semana leve é sugerida só com sinal, sem o gatilho "a cada 6–8 semanas";
    2. a carga cai −15% em pausas de 8 a 26 semanas, e acima de 26 semanas o app propõe refazer o nível;
    3. a semana do programa conta as semanas com treino, e não o calendário;
    4. entra o toque opcional "hoje foi: leve / normal / pesado demais" no fim do treino;
    5. depois de 3 de 4 semanas abaixo do planejado, o app oferece um programa com menos dias (nada muda sem a escolha da pessoa).
</contexto>

<tarefa>
Fazer o **marco R2**: o app percebe sozinho quando a pessoa para e volta, mostra "a sua semana", a evolução de cada exercício e sugere a semana leve só quando há sinal.
A pesquisa já está aprovada (T6); este marco não precisa de pesquisa nova. As fontes do escopo são:
- a linha R2 e o critério 6 de `docs/PLANO-MVP.md` (seções a e i);
- as seções 3 a 8 de `docs/pesquisa-v2/07-progressao-e-acompanhamento.md`, com as regras propostas (seção 7) e os casos de teste P1 a P9, W1 a W7, E1 a E4 e S1 a S5;
- a regra `tempo.calibracao`, aprovada no T4 (`docs/pesquisa-v2/05-montagem-da-sessao.md`);
- o esboço das telas do T6 na página "Diagnóstico do treino-mvp".

1. **Pausas detectadas sozinhas** (`readaptacao.durante-uso`, nova; `readaptacao.semana1`, revista):
   - a pausa é contada em dias, do fim da última sessão terminada até hoje, para o programa inteiro e em qualquer local;
   - até 13 dias: normal, com a mesma carga. De 14 a 20: na 1ª sessão de cada dia, RIR +1, com a mesma carga. De 21 a 56: volta gradual com carga −10%. De 57 a 182: carga −15%. Acima de 182: o app propõe refazer o nível e, com o aceite, a volta começa pela calibração na 1ª série, a partir da última carga −20%;
   - a carga da volta vem pré-preenchida, arredondada para baixo no inventário do local de hoje. Nas máquinas, parte da última carga **naquele local**; sem registro ali, a calibração da 1ª série (como no R1b);
   - a semana do programa passa a contar as semanas com treino desde o início do bloco. O bloco recomeça na volta de uma pausa de 21 dias ou mais;
   - a mensagem de volta segue a seção 3 do T6, sem culpa ("Bem-vindo de volta! Faz 22 dias do último treino…").
2. **"A sua semana"** (`acompanhamento.semana` e `acompanhamento.mensagens`, novas):
   - treinos feitos × planejados (segunda a domingo), em qualquer local;
   - séries efetivas por músculo, fracionadas (a série indireta vale 0,5), contra a meta **da semana** (na volta e na fase de aprendizado, a meta é o que foi prescrito naquela semana). Conta o exercício que foi feito de verdade, inclusive o que entrou numa troca de local ou pela alternativa;
   - os 4 estados, em cores neutras e sem vermelho: "na meta", "crescendo", "mantendo" e "ainda não treinou nesta semana";
   - "6 das últimas 8 semanas com treino", e nunca uma sequência que zera;
   - as mensagens da seção 4.4, inclusive a revisão da meta (decisão 5): a oferta de um programa com menos dias, que só muda com o aceite.
3. **Evolução por exercício** (`acompanhamento.evolucao`, nova):
   - a melhor série de cada sessão, com as marcas "subiu a carga" e "recorde";
   - a placa nas máquinas, o degrau no peso do corpo e no elástico, e nunca uma carga máxima estimada;
   - as séries de acerto da calibração e as de amplitude encurtada não contam como recorde;
   - nas máquinas, a evolução é separada por local (a placa de uma torre não vale na outra) e mostra o nome do local; a alternativa tem a sua própria evolução (caso E4).
4. **Semana leve sugerida** (`deload.semana-leve`, revista):
   - os gatilhos são 2 exercícios estagnados, "pesado demais" em 2 dos últimos 3 treinos, ou dor de 3 a 5 no mesmo exercício em 2 sessões seguidas, somada ao aviso de dor e de avaliação;
   - não sugere nas 3 semanas depois de uma volta;
   - é sempre opcional e manual, com o texto "para descansar, não para crescer";
   - o toque "hoje foi: leve / normal / pesado demais" fica no fim do treino, opcional e sem nada marcado (decisão 4).
5. **Calibração do tempo** (`tempo.calibracao`, T4): depois de 3 sessões, o tempo estimado de cada treino se ajusta ao tempo real registrado, como pede o T4.
6. **Regras:** as da seção 7 do T6 que ainda faltam em `regras.md` (`rir.leitura` revista, `readaptacao.durante-uso`, `readaptacao.semana1`, `acompanhamento.*`, `deload.semana-leve`, `tempo.calibracao`), com selo e fonte, e as fontes novas em `fontes.md` (a `progressao.calibracao` já entrou no R1b). Rode `node scripts/gerar-regras.mjs`.
7. **Estado salvo:** se precisar guardar algo novo (por exemplo, o toque "hoje foi"), crie a versão 7, com migração e teste. A migração não inventa nada que a pessoa não deu, e a exportação e a importação em JSON continuam funcionando.
8. **Testes:**
   - os casos P1 a P9, W1 a W7, E1 a E4 e S1 a S5 viram testes do Vitest. O critério 6 fica coberto por P1, P3, W1 e W2;
   - casos novos com os locais: a pausa conta treinos de qualquer local; o Bruno volta de 30 dias na academia do bairro, e a carga da volta da máquina vem da última carga **daquele** local; a semana conta o treino feito em qualquer local;
   - teste de propriedade: com qualquer sequência de datas de treino, a semana do programa nunca volta para trás dentro de um bloco, e nenhuma pausa de até 13 dias muda a carga;
   - no navegador: a pessoa volta depois de 22 dias e vê a mensagem e a carga reduzida; abre "a sua semana"; vê a evolução de um exercício; e, com o sinal, recebe a sugestão da semana leve;
   - os snapshots das personas mudam só com revisão. Mostre ao Gustavo o antes e o depois de cada um.

Fica para depois:
- as animações dos exercícios novos e os desenhos dos 21 equipamentos;
- os cartões de texto dos exercícios antigos sem animação;
- apagar um local, e oferecer o que um local a mais permite (no backlog, desde o R1b).

**Pronto quando:**
- `npm run check` e `npm run test:e2e` passam;
- o plano das telas foi aprovado pelo Gustavo antes do código;
- as regras novas ou revistas estão em `regras.md`, com selo;
- os snapshots revistos foram aprovados;
- o devlog do marco está escrito.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:**
   - o `CLAUDE.md` e o `docs/devlog.md` (entradas R1 e R1b);
   - o `docs/PLANO-MVP.md` (seções a e i);
   - as fontes do escopo citadas acima;
   - o código em `src/domain/sessao/`, `src/domain/progressao/`, `src/domain/locais/`, `src/domain/gerador/` (fases e `prescricaoDaSemana`), `src/storage/`, `src/features/treino/` e `src/features/programa/`.
2. **Plano antes do código:**
   - a pesquisa já está aprovada, mas as telas são novas: mostre ao Gustavo, em linguagem simples e com esboços, a tela da volta de uma pausa, "a sua semana", a evolução e a sugestão da semana leve;
   - mostre também o que muda no treino de cada persona. Por exemplo: o Bruno, que treinou 2 semanas e sumiu 30 dias, voltando na academia do bairro;
   - pergunte o que só ele pode decidir: por exemplo, onde fica "a sua semana" no app, e se as séries de acerto da calibração contam como séries efetivas na semana (a recomendação é contar, quando o RIR for 4 ou menos, como manda `rir.serie-efetiva`);
   - o código só começa com o ok dele.
3. **Determinístico:** sem `Math.random` nem `Date.now` em `src/domain/`. A data de hoje entra como parâmetro, como já é feito em `src/domain/sessao`.
4. **Segurança:** a regra de dor, os sinais de alerta e o "pare e use a alternativa" valem igual. A semana leve soma à regra de dor e nunca a substitui.
5. **Mensagens sem culpa:** nunca "você falhou", "perdeu" ou "deveria", nada de risco de morte na tela e nenhuma comparação com outras pessoas (`acompanhamento.mensagens`).
6. **Commits:** pequenos, em pt-BR e no imperativo, num branch criado a partir da `main`. A `main` só recebe o marco depois da aprovação dele.
7. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (https://claude.ai/artifact/CSoACEwQ4zikyku3WXCn3s):
   - leia a página antes de editar;
   - acrescente no topo uma seção do R2, com os prints da volta de uma pausa, de "a sua semana", da evolução e da semana leve, e com o que mudou em cada persona;
   - as imagens vão como arquivos da página. Os arquivos precisam estar dentro do repositório, numa pasta ignorada pelo git, como `reports/` (o teste do navegador já guarda prints lá com `PRINTS=1`; veja `tests/e2e/locais.spec.ts`).
8. **Nunca use nada de `privado/`** em arquivos versionados.
9. **Pendências do Gustavo** estão em `docs/backlog.md`: a chave da Anthropic para o eval da foto, a cronometragem do cadastro no celular e a menor anilha da academia dele.

Ao fim do marco:
- atualize o `docs/devlog.md` com o que mudou, uma imagem ou GIF e o rascunho de post;
- diga em poucas linhas, em pt-BR simples, o que mudou no treino de cada persona, o que fica para o R3 (uso real) e o que precisa da decisão do Gustavo.

Depois pare e espere a revisão.
</como_trabalhar>
