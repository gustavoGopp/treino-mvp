# Prompt: R5-CL, corpo livre e casa (variedade de verdade para quem treina sem equipamento)

> Rascunho escrito na sessão de próximos passos (06/11/2026), na rodada extra pedida pelo Gustavo, a partir de `docs/revisoes/proximos-passos/f-corpo-livre.md` e de `docs/pesquisa-v2/16-corpo-livre-e-casa.md`. Só vale se o Gustavo escolher este marco. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir o **R5-CL, "corpo livre e casa"**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**Por que este marco.** Em 06/11 o Gustavo testou o app com "Corpo livre" (nada marcado) e foco nos superiores e recebeu treinos de corpo todo com 3 a 6 exercícios genéricos. Uma grade de 15.300 programas só de corpo livre mostrou a causa: a biblioteca tem 3 exercícios de superiores possíveis sem nada (`flexao`, `flexao-fechada`, `pike`). Com foco nos superiores, a semana tem 1,9 exercício diferente de superiores; o mesmo exercício aparece em todos os dias em 69,3% dos programas; costas, bíceps e ombro de trás ficam a zero. A pesquisa (três frentes, `pesquisa-v2/16`) aprovou 7 exercícios novos, e um protótipo mediu o efeito: 5,3 exercícios diferentes de superiores na semana, a repetição em todos os dias em 30,8%, o bíceps e o ombro de trás fora do zero, e o caso do Gustavo (intermediário, 3 dias, 60 min) com 7 a 8 exercícios por dia em vez de 5 a 6. As costas continuam sem saída honesta. O custo medido: com 30 min, os programas com um dia acima do tempo vão de 42% a 71,3%. Por isso este marco vai **junto do ajuste de 30 minutos** da frente A (R5a); se o R5a não veio antes, o ajuste entra aqui.

**Os limites que o Gustavo decidiu.** Itens de casa só como apoio, sem carga (cadeira, parede, chão, toalha, degrau, sofá, cama). Mochila, galão e garrafa como peso não entram. Porta com toalha, batente, lençol e mesa não entram (0 estudo de segurança; o dado novo sobre treinar pendurado em casa é de lesão, `shabbir2026`).

**Leia primeiro:** o `CLAUDE.md`; `docs/revisoes/proximos-passos/f-corpo-livre.md` inteiro (a grade, os pacotes E, P e L, o caso do Gustavo antes e depois, os pedidos); `docs/pesquisa-v2/16-corpo-livre-e-casa.md` (as tabelas de candidatos, as entradas JSON propostas, as perguntas em aberto) e `10-equipamento-minimo.md`; `docs/revisoes/proximos-passos/a-qualidade.md` (pacote A, o ajuste de 30 min); `docs/pesquisa/00-metodo.md` e `docs/pesquisa/regras.md` (`selecao.triceps-acima-cabeca`, `selecao.panturrilha-alongada`, `equipamento.sem-ancoragem`, `divisao.sem-puxar`, `tempo.sobra-series`, `tempo.musculo-protegido`); `src/domain/biblioteca/`, `src/domain/gerador/funcoes.json`, `src/domain/progressao/escadas.json`, `src/storage/esquema.ts`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado; as personas são fictícias.
- **Exercício sem animação aprovada aparece como cartão textual**, nunca com uma animação improvisada (`CLAUDE.md`). Os 7 cartões são escritos a partir de uma ficha de técnica, com a montagem segura. As animações entram depois, na fila do R5 de animação.
- O visual é do redesign: o cartão, o registro de série sem carga e o texto do aviso das costas são pedidos ao design (`f-corpo-livre.md`); faça o mínimo funcional com os componentes de hoje.
- **O estado guardado:** confira no começo se a carga `sem-carga` cabe no registro de série de hoje (`esquema.ts`). Se pedir versão nova, pare e pergunte: a versão 8 está reservada ao redesign e tem de ser decidida uma vez só. O mesmo vale para o degrau, se ele virar item de cadastro. Os degraus novos de escada entram **só no fim** das escadas (o degrau é guardado como índice, `esquema.ts:106`).
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar, avisando-o para exportar os dados antes.
- Toda regra nova entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte. Gerador determinístico. Nenhuma mudança no gerador sem o antes e o depois das 6 personas.
- Rede liberada (PubMed, PMC, Crossref). Nunca contorne bloqueio anti-robô. Nada de inventar estudo.

**O que fazer, nesta ordem (uma decisão por vez, com o antes e o depois)**
1. **Versionar a grade de corpo livre** como script de auditoria (`npm run auditoria:corpo-livre`, determinístico, conferido por `auditoria:verificar`), reproduzindo a linha de base de `f-corpo-livre.md` (15.300 programas; com foco nos superiores, 1,9 superiores diferentes por semana).
2. **Decisões do Gustavo antes do código:** a complexidade da flexão com os pés elevados (3: o iniciante chega a ela pela escada; 2: entra no 1º programa); se o degrau "pés elevados" sai da escada da flexão; se o degrau da escada é "apoio" (todos têm) ou item de cadastro.
3. **Pacote L (pernas e abdômen)** e **pacote E (empurrar)**: `panturrilha-degrau`, `afundo-tras-peso-corpo`, `abdominal-invertido`, `extensao-triceps-peso-corpo`, `flexao-pes-elevados`; o arqueiro e o agachamento até a cadeira com uma perna no fim das escadas. Cada um com a regra, o cartão, o teste e a grade.
4. **Pacote P (puxar e isolar):** `abertura-t-deitado` (nível 3 de `ombro-posterior`). A `rosca-sem-carga` (nível 4 de `biceps`) **só depois de ler o texto completo de `counts2016`** (Elsevier; se a rede bloquear, peça o PDF ao Gustavo por `privado/`): séries, repetições, tempo de contração e o que o grupo de controle fez. Se a leitura não sustentar, a rosca sem carga não entra, e o bíceps continua a zero com o aviso.
5. **O ajuste de 30 minutos** (se o R5a não o trouxe) e o texto novo do aviso `equipamento.sem-ancoragem`.

**Aceite (medido)**
- Na grade de corpo livre: com foco nos superiores, ≥ 5 exercícios diferentes de superiores por semana e ≥ 5 exercícios por dia com 60 min; o mesmo exercício em todos os dias ≤ 35%; dias com até 4 exercícios (45 min ou mais) ≤ 20%; ombro de trás a zero ≤ 15%; bíceps a zero ≤ 1% (se a rosca sem carga entrar); com 30 min, dia acima do tempo ≤ 50%; costas a zero continua com o aviso.
- O caso do Gustavo (intermediário, 3 e 4 dias, 60 min, foco nos superiores) mostrado antes e depois, exercício por exercício.
- Bruno e Carla iguais; os snapshots de Ana, Diego, Elisa e Fábio revisados pelo Gustavo.
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos.

**Fechamento.** `docs/devlog.md` (o antes e o depois do caso do Gustavo e o rascunho de post), `docs/backlog.md`, o recado ao R3 se o programa dele mudar, e parar para a revisão do Gustavo.

**O que não fazer**
- Não use objeto como carga, nem porta, toalha na porta, lençol ou mesa.
- Não conte superman nem Y-T-W como série de costas.
- Não faça animação nova neste marco.
- Não troque a lógica "vaga por função, nunca por equipamento", nem a divisão de quem não tem como puxar (o corpo todo fica, com a explicação).
- Não afirme nada sobre treino sem selo e fonte.
