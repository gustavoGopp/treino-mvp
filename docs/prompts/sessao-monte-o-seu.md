# Prompt: "Monte o seu treino", o editor com o avaliador ao lado (rascunho)

> Rascunho escrito no fechamento do R5b (09/11/2026), a partir de `docs/revisoes/proximos-passos/b-monte-e-avaliador.md` (opção c e "O desenho da edição"), do devlog do R5b e do `docs/backlog.md` ("Do R5b"). **Ainda não escolhido:** o Gustavo decide se e quando ele vem (a ordem da parte 3 de `revisoes/proximos-passos.md` põe o R5c, abrir para família e amigos, antes). **A decidir antes de começar, junto com a sessão do redesign:** a versão nova do estado guardado, uma vez só, com os dias planejados que o redesign pediu (v8) e o que mais estiver na fila (`proximos-passos.md`, 2.5, "Um choque a registrar"). Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir o marco **"Monte o seu treino"** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**Por que este marco.** O Gustavo decidiu (06/11) que "monte o seu" é para **quem já treina e tem um programa próprio**, que ele aceita **só exercícios da biblioteca** a princípio, e que a IA para ler um programa de fora fica para depois. O R5b fez a régua: o avaliador (`src/domain/avaliador/`), uma função pura que olha qualquer programa e devolve o veredito e os achados com regra, selo e próximo passo, inclusive a sugestão concreta ("troque leg press por cadeira extensora no treino C"). Ele já avalia os 4 programas publicados de `tests/unit/programas-publicados.ts` como um treinador avaliaria, e a régua do gerador fecha em 0 "ajustar" sem aviso. Falta o editor: copiar o programa que a pessoa já faz, ou mudar o gerado, e ouvir o avaliador a cada mudança.

**Leia primeiro:** o `CLAUDE.md`; `docs/revisoes/proximos-passos/b-monte-e-avaliador.md` (opção c, "O desenho da edição" e "Riscos: o que bloqueia e o que só orienta"); o devlog do R5b; `src/domain/avaliador/index.ts` (`avaliar`, `completar`, `ProgramaParaAvaliar`); `src/storage/esquema.ts` e `tests/unit/armazenamento.test.ts` (as migrações); `src/features/programa/Programa.tsx` ("Atualizar programa" e "Sobre o programa"); a proposta do redesign para a folha do exercício.

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo, nunca a conta de trabalho. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado; as personas são fictícias (`tests/personas/`).
- **A versão nova do estado** é a combinada com o redesign (uma só), com migração N → N+1 testada e o teste "exporta e volta igual".
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar.
- Toda regra nova entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte (ex.: `edicao.escolha-da-pessoa`, o porquê de um exercício que a pessoa pôs).

**O que fazer, nesta ordem**
1. **O modelo de dado** (`b-monte-e-avaliador.md`, "O desenho da edição"): `origem` (`gerador`, `editado`, `montado`), `base` (o gerado de onde saiu), `escolhido` por exercício; `metas` e `volumeSemanal` recalculados a cada edição; os `avisos` do programa editado passam a ser a saída do avaliador. A prescrição de um exercício que a pessoa pôs vem de `prescrever` (já exportada) e a avaliação de `avaliar`.
2. **"Atualizar programa" nunca apaga o trabalho da pessoa**: com `origem` diferente de `gerador`, "Manter o meu" é o padrão; "Ver o novo lado a lado" e "Trocar pelo novo" (confirmado, com o anterior guardado para desfazer).
3. **O editor**, com a tela que o design entregar (pedidos B-3 e B-4): na folha do exercício, "Trocar por…" (as alternativas e a biblioteca filtrada por músculo), o stepper de séries (1 a 10, com o achado aparecendo acima de 4) e "Tirar"; no dia, reordenar e "+ exercício"; e "montar do zero" (dias e exercícios da biblioteca). O avaliador roda a cada mudança, e a pessoa pode manter um programa com achados: só a segurança bloqueia.
4. **Progressão, histórico, locais, semana leve e volta da pausa** com programas editados (`b-monte-e-avaliador.md` lista o que conferir: a progressão é por `exId`; o 2º local troca por função; `proximoDia` usa os `id` dos dias).

**Aceite (medido)**
- Os 4 programas publicados digitados pela tela dão a mesma avaliação que no teste; um programa editado e um montado passam pela exportação e voltam iguais; um estado da versão anterior migra sem mudar o programa.
- Nenhum programa editado perde histórico nem progressão (teste com as 6 personas).
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos; os textos novos revisados pelo Gustavo.

**O que não fazer**
- Não use IA para ler programas (fica para depois deste marco).
- Não bloqueie nada que não seja segurança.
- Não troque a lógica "vaga por função, nunca por equipamento" nem o determinismo.
- Não afirme nada sobre treino sem selo e fonte.
