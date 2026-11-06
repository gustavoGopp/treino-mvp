# Prompt: R5a, o registro que não engana (dor guardada, treino vazio, progressão que não trava, ajustes do gerador)

> Rascunho escrito na sessão de próximos passos (06/11/2026), a partir de `docs/revisoes/proximos-passos.md` (parte 2, marco R5a) e dos relatórios `proximos-passos/c-fluxo.md`, `d-longo-prazo.md`, `a-qualidade.md` e `b-monte-e-avaliador.md`. Só vale se o Gustavo escolher este marco. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir o **R5a, "o registro que não engana"**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**Por que este marco.** A sessão de próximos passos (06/11) percorreu o app como as 6 personas e simulou 24 e 52 semanas de uso com o código real. O que mais pesou não foi uma função nova, foi o que hoje engana a pessoa sem ela perceber:
- **A nota de dor do "Senti algo" não fica guardada** (0 de 6 personas). `Treino.tsx:238` só mostra a mensagem de `avaliarDor`; o campo `dor` da série existe (`src/storage/esquema.ts:113`) e nunca é preenchido. Por isso a redução de carga com dor de 3 a 5 e a "dor que se repete" da semana leve, que traz o aviso de avaliação profissional, nunca disparam.
- **"Começar" e "Terminar" sem nenhuma série conta como treino feito e pula o dia** (6 de 6). `proximoDia` (`src/domain/sessao/index.ts:52`) conta qualquer sessão com `fim`.
- **A calibração da carga nunca termina** quando o próximo peso disponível é um salto grande (62 de 492 corridas no simulador; até 31 sessões).
- **O "Agora não" da semana leve dura só até o próximo treino**: quem recusa vê a oferta 46 a 107 vezes em 24 semanas.
- **A semana leve é sugerida na fase de aprendizado do iniciante**, e a estagnação é contada no exercício da vaga que a pessoa trocou (e não no que ela fez).
- **No gerador**: com 30 min, 69,6% dos programas têm um dia acima do tempo (a proteção do abdômen e da panturrilha); o mesmo exercício em todos os dias em 29,6% da grade reduzida; o ombro lateral a zero no Corpo todo 6x sem equipamento; 3 dias com 11 séries de peito numa sessão (teto 10); e o avaliador da frente B achou o glúteo sem extensão de quadril no Corpo todo A/B quando o stiff não é possível (6,3%), dois afundos no mesmo dia (2,4%) e o teto da sessão que não conta as séries indiretas (0,5%).

**Leia primeiro:** o `CLAUDE.md`; `docs/revisoes/proximos-passos.md` (parte 2); `docs/revisoes/proximos-passos/c-fluxo.md` (opção B e os pedidos), `d-longo-prazo.md` (opção 1, pedidos D1 a D4, e o simulador descrito em "Como reproduzir"), `a-qualidade.md` (pacote A e pedidos ao domínio 1 e 3), `b-monte-e-avaliador.md` (pedidos ao domínio 2 a 4); `docs/pesquisa/00-metodo.md` e `docs/pesquisa/regras.md` (as regras `seguranca.dor.*`, `progressao.calibracao`, `deload.semana-leve`, `iniciante.fase-aprendizado`, `tempo.musculo-protegido`, `volume.sessao.teto`, `selecao.variacao`); `src/domain/sessao/`, `src/domain/progressao/`, `src/domain/acompanhamento/`, `src/domain/gerador/`; `src/features/treino/acoes.ts` e `src/features/acompanhamento/acoes.ts`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado; as personas são fictícias (`tests/personas/`).
- **O redesign visual** (outra sessão; prompt em `docs/prompts/sessao-redesign-visual.md`) está refazendo `src/styles.css`, `src/features/app/ui.tsx`, as telas e `tests/e2e/`. Antes de começar, veja se o lote em curso dele já foi para a `main`; se não, combine com o Gustavo: este marco mexe na **lógica** de `src/features/treino/acoes.ts` e `src/features/acompanhamento/acoes.ts` e em `src/domain/`, nunca no visual. O que for tela (a dor registrada na série, o fim com exercício interrompido, "Descartar este treino", corrigir um treino, a linha da semana leve recusada, o fim da calibração) vai como pedido à sessão de design, já listado em `proximos-passos.md`, seção 2.5, itens 1 a 6. Se uma função precisar de um botão que ainda não existe, faça o mínimo funcional com os componentes de hoje e registre o pedido.
- **O estado guardado não muda de versão neste marco.** O "Agora não" passa a valer por 7 dias (data, sem número guardado). Se aparecer uma razão para mudar o esquema, pare e pergunte: a versão 8 está reservada ao redesign (dias planejados) e tem de ser decidida uma vez só.
- Branch nova a partir da `main` (`r5a-registro` ou outro nome que a sessão indicar). Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar, avisando-o para exportar os dados antes ("Meus dados" → "Guardar uma cópia").
- Toda mudança de regra passa primeiro por `docs/pesquisa/regras.md` (selo e fonte), depois pelo código e pelos testes. Gerador determinístico: sem `Math.random` nem `Date.now` em `src/domain/`. Nenhuma mudança no gerador sem o antes e o depois das 6 personas (`npx vitest run` mostra os snapshots; `-u` só depois do "aprovar").
- Rede liberada (PubMed, PMC, Crossref). Nunca contorne bloqueio anti-robô. Nada de inventar estudo.

**O que fazer, nesta ordem (uma decisão por vez, com o antes e o depois)**
1. **O registro** (`c-fluxo.md`, opção B): a nota de dor do "Senti algo" vai para a série em andamento ou para a última feita do exercício; `proximoDia` passa a contar só sessões com pelo menos uma série (`treinoFeito`); "Terminar" com 0 série oferece descartar (a função `descartarSessao` já existe); apagar ou corrigir o último treino. Testes: unitários da regra e um e2e por persona (dor 4 guardada e carga reduzida na próxima; começar e terminar sem série mantém o dia).
2. **A progressão** (`d-longo-prazo.md`, opção 1, a a d): a saída da calibração (com o caso "4 kg dá R = 24, 5 kg dá R = 12" no teste); o "Agora não" por 7 dias; a carência na fase de aprendizado; a estagnação pelo exercício feito na vaga (`noLugarDe`). Rode o simulador da frente D (reconstrua-o a partir da descrição do relatório, no scratchpad) antes e depois.
3. **A leitura do export** (`d-longo-prazo.md`, opção 1 e): um script em `scripts/` que lê um export JSON passado por caminho e imprime os tipos de sugestão, os "estagnados", as semanas leves e as calibrações longas. Nunca versione um export real; o teste usa um export fictício de persona. O Gustavo roda no export dele, e só os números agregados vão para o devlog, se ele quiser.
4. **Os ajustes do gerador** (`a-qualidade.md`, pacote A, e `b-monte-e-avaliador.md`, pedidos 2 a 4): 30 min protege com 2 séries e troca por um isolador do dia; descer um nível da função antes de repetir o mesmo exercício em todos os dias; o pike no Corpo todo 6x; o teto da sessão na distribuição de séries contando as indiretas; a extensão de quadril quando a vaga de dobrar o quadril fica vazia; o desempate do agachar quando o dia já tem um afundo. Cada um com a regra, o teste, a grade (`npm run auditoria:qualidade`) e as personas.
5. **A checagem lateral**: a faixa "Há uma versão nova do seu programa" que a frente C e o redesign viram no Bruno e na Carla com o estado semeado. Confirme se é artefato do teste ou defeito.

**Aceite (medido)**
- e2e nas 6 personas: a nota de dor de 3 a 5 aparece na série guardada e reduz a carga da próxima sessão; "Começar" + "Terminar" sem série mantém o mesmo dia e oferece descartar.
- Simulador: 0 corrida com mais de 3 sessões só de calibração; a oferta recusada volta no máximo 1 vez por semana; 0 semana leve na fase de aprendizado.
- Grade: dias de 30 min acima do tempo ≤ 50%; o mesmo exercício em todos os dias ≤ 20% na grade reduzida de `a-qualidade.md`; 0 dia com mais de 10 séries de um músculo numa sessão, contando as indiretas; extensão de quadril em todo programa em que a ponte é possível.
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos; snapshots revisados pelo Gustavo.

**Fechamento.** `docs/devlog.md` (o que mudou, uma tabela de antes e depois, o rascunho de post), `docs/backlog.md`, o recado ao R3 (`docs/prompts/recado-r3-r5a.md`: o que muda no uso do Gustavo, porque a dor passa a ser guardada e mais avisos e semanas leves podem aparecer) e parar para a revisão do Gustavo.

**O que não fazer**
- Não mude o visual nem `src/styles.css`; não crie telas novas além do mínimo funcional.
- Não mude a versão do estado guardado.
- Não mexa nos gatilhos numéricos da semana leve e do "estagnado" (3 sessões, 2 exercícios): eles esperam o export do R3 (`d-longo-prazo.md`, opção 2).
- Não troque a lógica "vaga por função, nunca por equipamento" nem o determinismo.
- Não afirme nada sobre treino sem selo e fonte.
