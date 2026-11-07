# Prompt: R5-CL, biblioteca ampliada (mais opções de exercício para todas as combinações de equipamento)

> Rascunho escrito na sessão de próximos passos (06/11/2026), depois das duas rodadas extras pedidas pelo Gustavo (corpo livre e biblioteca ampliada), a partir de `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, `f-corpo-livre.md`, `docs/pesquisa-v2/16-corpo-livre-e-casa.md` e `17-biblioteca-ampliada.md`. Substitui o rascunho anterior deste arquivo (só corpo livre). Só vale se o Gustavo escolher este marco. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.
>
> **Atualização de 07/11/2026 (decisões da parte 3 de `docs/revisoes/proximos-passos.md`):** é o **2º marco** da ordem R5a → R5-CL → R5d → R5-anim → R5b → R5c, conduzida pela sessão de `sessao-desenvolvimento.md`. Os cartões de texto ficam até o R5-anim, que anima os 5 de corpo livre mais prescritos (medido: os dias com 3 ou mais cartões caem de 74,9% para 19,5%).

---

Você vai conduzir o **R5-CL, "biblioteca ampliada"**, do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase. **Ele pediu para não decidir questões técnicas:** decida você, registre o motivo e mostre o efeito medido; leve a ele só o que for decisão de produto.

**Por que este marco.** Em 06/11 o Gustavo testou o app sem equipamento, com foco nos superiores, e recebeu treinos curtos e genéricos. Duas rodadas de pesquisa (programas de treinadores, YouTube, lacunas de equipamento, PubMed, o que faz um treino agradável) e um protótipo descartável mediram o que fazer:
- **32 exercícios novos** (de 139 para 171), em todos os equipamentos: 6 de corpo livre, 19 com halteres, elástico, banco e barra, 7 de um equipamento só. A lista, os níveis em `funcoes.json` e o motivo de cada um estão em `g-biblioteca-ampliada.md` (seção 2) e em `17` (partes G2 a G4, "Onde cada um entra").
- **Duas proteções do equilíbrio da coxa** (quadríceps ÷ posteriores entre 0,5 e 2): no corte de tempo (`cortarTempo`, `cabe`) e no ajuste de 30 minutos do R5a.
- **Medido** na grade de 108.900 programas (55 cenários de equipamento × níveis × dias × minutos × focos × dor), com a régua da frente G5 em dois níveis (defeitos que não podem piorar; notas que devem melhorar): programas sem dor sem nenhum defeito de 73,4% para 83,8%, nenhum defeito pior; repetir o mesmo exercício em todos os dias sem alternativa de 44,1% para 15,6%; exercícios diferentes por semana de 12,9 para 15,8; sem nada, exercícios por dia de 4,9 para 5,4. **Custo:** 74,9% dos programas com um dia de 3 ou mais cartões de texto (era 8,4%), até as animações chegarem.
- **Duas revisões cegas** por treinadores independentes: a versão final melhor em 12 das 18 personas, pior em nenhuma.
- **Ficaram de fora, com o motivo:** a rosca sem carga (um estudo só; a revisão cega mostrou que ela ocupa o tempo do foco), o crucifixo no chão com halteres, a elevação lateral na parede, a panturrilha com halter numa perna só, e tudo o que `16` recusou (porta, toalha, mesa, objetos como carga).

**Leia primeiro:** o `CLAUDE.md`; `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md` inteiro; `docs/pesquisa-v2/17-biblioteca-ampliada.md` (resumo, partes G3 e G4, as entradas JSON e a tabela "Onde cada um entra") e `16-corpo-livre-e-casa.md` (as entradas de corpo livre); `docs/revisoes/proximos-passos/a-qualidade.md` (pacote A, o ajuste de 30 min); `docs/pesquisa/00-metodo.md`, `docs/pesquisa/regras.md`; `src/domain/biblioteca/`, `src/domain/gerador/` (`funcoes.json`, `index.ts`: `contextoDeSelecao`, `cortarTempo`), `src/domain/progressao/escadas.json`, `scripts/auditoria/qualidade.ts` e `cenarios-55.ts`.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado; as personas são fictícias.
- **Exercício sem animação aprovada aparece como cartão textual**, nunca com animação improvisada (`CLAUDE.md`). Os 32 cartões são escritos a partir de uma ficha de técnica, com a montagem segura (`16` e `17` trazem a de cada um, e os vídeos de referência visual de `17`, G2, servem ao autor do cartão).
- O visual é do redesign: cartões, avisos e a fila de animação são pedidos ao design (`g-biblioteca-ampliada.md`). Faça o mínimo funcional com os componentes de hoje.
- **O estado guardado não muda de versão.** Se aparecer motivo, pare e pergunte (a versão 8 está reservada ao redesign).
- Os itens de casa só como apoio, sem carga; nada de porta com toalha, lençol, mesa ou objeto como peso (decisões do Gustavo).
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar, avisando-o para exportar os dados antes.
- Toda regra nova ou mudada entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte. Gerador determinístico. Nenhuma mudança no gerador sem o antes e o depois das 6 personas.
- Rede liberada (PubMed, PMC, Crossref, YouTube para referência). Nunca contorne bloqueio anti-robô. Nada de inventar estudo.

**O que fazer, nesta ordem**
1. **A régua da G5 em `scripts/auditoria/qualidade.ts`** (os defeitos e as notas de `g-biblioteca-ampliada.md`, seção 1), e a grade de 108.900 programas como script de auditoria determinístico, conferido por `auditoria:verificar`. Reproduza a linha de base da `main` (73,4% dos programas sem dor sem defeito).
2. **O ajuste de 30 minutos do R5a** (se ainda não veio), com a proteção da coxa.
3. **A proteção da coxa no corte de tempo.** Teste: 0 programa com a coxa fora de 0,5–2 na grade.
4. **Os 32 exercícios**, em lotes (corpo livre; halteres e banco; elástico; um equipamento só), cada lote com a regra, os cartões, os testes, a grade e as personas.
5. **Os avisos de lacuna pelo que o programa tem de fato** (não dizer "ombro de trás sem exercício" com a abertura em T no programa).

**Aceite (medido)**
- Na grade: nenhum defeito pior que na `main`; programas sem dor sem defeito ≥ 83%; repetir sem alternativa ≤ 16%; sem nada, exercícios por dia ≥ 5,3 e exercícios diferentes por semana ≥ 12,5; coxa desequilibrada 0%.
- O caso do Gustavo (intermediário, sem nada, 3 e 4 dias, 60 min, foco nos superiores) mostrado antes e depois, exercício por exercício.
- Bruno e Carla iguais; os snapshots das outras personas revisados pelo Gustavo.
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos.

**Fechamento.** `docs/devlog.md` (o antes e o depois do caso do Gustavo, uma tabela da grade e o rascunho de post), `docs/backlog.md` (a fila de animação, com os 5 de corpo livre primeiro; e o marco seguinte: o foco que muda a distribuição, o 1º degrau da escada pelo nível e a regressão da barra fixa, `g-biblioteca-ampliada.md`, seção 5), o recado ao R3 se o programa dele mudar, e parar para a revisão do Gustavo.

**O que não fazer**
- Não use objeto como carga, nem porta, toalha na porta, lençol ou mesa.
- Não conte superman nem Y-T-W como série de costas.
- Não faça animação nova neste marco, nem troque o desempate para "animado primeiro" (medido: faz o mesmo exercício se repetir havendo opção em 29,5% dos programas).
- Não troque a lógica "vaga por função, nunca por equipamento", nem o determinismo.
- Não afirme nada sobre treino sem selo e fonte.
