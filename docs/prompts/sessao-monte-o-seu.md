# Prompt: "Monte o seu treino", com o avaliador como régua

> Rascunho escrito no fim do R5b (07/11/2026), a partir de `docs/revisoes/proximos-passos/b-monte-e-avaliador.md` (opção c, "O desenho da edição", os riscos e os pedidos ao design 3 e 4) e de `docs/revisoes/r5b/README.md`. Só vale se o Gustavo escolher este marco, e **depois** de a versão 8 do estado guardado estar decidida com o redesign (ver "Regras desta sessão"). Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir o marco **"Monte o seu treino"** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**Por que este marco.** O Gustavo quer que **quem já treina e tem um programa próprio** possa trazê-lo para o app (decisão de 06/11), só com exercícios da biblioteca (a leitura por IA de um programa de fora fica para depois). O R5b fez o avaliador (`src/domain/avaliador/`): ele recebe qualquer programa e diz, com o selo, o que um treinador apontaria, ou "está bom". Nos 4 programas publicados de `tests/publicados/`, ele acha 6 a 10 séries num exercício só, músculos sem série e dias acima do tempo; nos programas do gerador, 80,8% saem "está bom" ou "só limite". Falta deixar a pessoa **editar o programa gerado e montar um do zero**, com o avaliador ao lado, e sem nunca apagar o trabalho dela num "Atualizar".

**Leia primeiro:** o `CLAUDE.md`; `docs/revisoes/r5b/README.md` e `medidas.md`; `docs/revisoes/proximos-passos/b-monte-e-avaliador.md` (seções 5 e 6: "O desenho da edição", "Migração", "Atualizar programa com um programa editado", "Riscos: o que bloqueia e o que só orienta"); `src/domain/avaliador/index.ts`; `src/domain/gerador/index.ts` (`prescrever`, `porqueEspecifico`); `src/storage/esquema.ts` e `tests/unit/armazenamento.test.ts` (as migrações); `src/features/programa/Programa.tsx`; o estado do redesign na `main` (`docs/revisoes/redesign/` ou o branch dele).

**Regras desta sessão**
- Conta: só as contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca a da Futurum. Tudo fica no git, e só no git.
- Não mexa no branch `r3-uso-real`. `privado/` nunca é versionado nem usado; as personas são fictícias (`tests/personas/`).
- **A versão do estado guardado.** Este marco pede uma versão nova (`origem`, `base`, `anterior` no programa salvo; `escolhido` no exercício). O redesign reservou a **versão 8** para os dias planejados, e o degrau, os gatilhos pelo dado real e a variação por blocos também pedem versão nova (`proximos-passos.md`, seção 2.5, "Um choque a registrar"). **Antes de qualquer código, pare e pergunte ao Gustavo** se a v8 já foi para a `main`: se sim, esta é a 8 → 9; se não, combine com a sessão do redesign uma versão só. A migração é aditiva (nada inventado; `origem` ausente vale "gerador"), com teste de ida e volta pela exportação.
- Branch nova a partir da `main`. Commits pequenos, em pt-BR e no imperativo, com push. Ida para a `main` só com o ok do Gustavo, por merge sem forçar, avisando-o para exportar os dados antes ("Meus dados" → "Guardar uma cópia").
- Toda regra nova entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte (no mínimo `edicao.escolha-da-pessoa`: o porquê de um exercício que a pessoa pôs; `edicao.atualizar`: nunca substituir um programa editado sem a escolha dela). Domínio puro e testado; o gerador continua determinístico, e a lógica "vaga por função, nunca por equipamento" não muda.
- **O avaliador não muda de régua.** Ele já mede qualquer programa; aqui ele só passa a rodar a cada edição. Só a segurança bloqueia (`avaliador.gravidade`): o exercício que carrega uma região com dor acima de 5 não entra no treino do dia, com a alternativa e o aviso de avaliação; o resto só orienta e não insiste.
- Rede liberada (PubMed, PMC, Crossref). Nunca contorne bloqueio anti-robô. Nada de inventar estudo.

**O que fazer, nesta ordem**
1. **A versão do estado** (depois da resposta do Gustavo): `origem` (`gerador` | `editado` | `montado`), `base` (o programa gerado de onde saiu), `anterior` (para desfazer uma troca), `escolhido` no exercício. Migração e teste de exportação e importação.
2. **O domínio da edição**, puro: acrescentar, tirar e trocar um exercício (da biblioteca, filtrada por função e por músculo), mudar séries (1 a 10, com o achado aparecendo acima de 4) e a ordem, criar e apagar um dia. A cada mudança, `metas` e `volumeSemanal` são recalculados (`metasDoPerfil`, `volumePorMusculo`), e os `avisos` do programa editado passam a ser a saída do avaliador. O exercício novo ganha a prescrição de `prescrever` e o porquê "você escolheu este" (`edicao.escolha-da-pessoa`) com o porquê específico da vaga.
3. **"Atualizar programa" com um programa editado**: nunca substitui sozinho. Três saídas: **manter o meu** (o padrão), **ver o novo lado a lado** (uma função pura de diferença entre dois programas, com teste de propriedade: a diferença de um programa com ele mesmo é vazia) e **trocar pelo novo** (com confirmação; o meu fica em `anterior`).
4. **Progressão, histórico, locais, semana leve e volta**: conferir com teste que tudo segue por `exId` e pelos `id` dos dias (um dia novo ganha `id` novo e estável); o exercício novo começa pela calibração; o 2º local troca por função também nos exercícios sem `funcao` (`diaNoLocal`).
5. **As telas** (pedidos ao design 3 e 4 de `b-monte-e-avaliador.md`; se o lote do redesign ainda não estiver na `main`, o mínimo funcional com os componentes de hoje e o pedido registrado): na folha do exercício, "Trocar por...", o passo de séries e "Tirar"; no dia, reordenar e "+ exercício"; "Montar do zero" no cadastro, para quem já treina; o diálogo do "Atualizar". Áreas de toque de 44 px, uso com uma mão.
6. **Medir**: os 4 programas publicados digitados pela tela (e2e), com os achados iguais aos do domínio; uma persona fictícia nova, "quem já treina com programa próprio", que copia um programa e corrige 2 achados.

**Aceite (medido)**
- Um estado da versão anterior migra sem mudar o programa; um programa editado passa pela exportação e volta igual; "Atualizar" nunca apaga um programa editado (teste e e2e).
- Os 4 programas publicados, montados pela tela, dão os mesmos achados de `tests/publicados/` (e2e).
- Uma edição que põe um exercício numa região com dor acima de 5 é bloqueada no treino do dia, com a alternativa e o aviso de avaliação; nenhuma outra edição é bloqueada.
- `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos; os textos novos revisados pelo Gustavo.

**Fechamento.** `docs/devlog.md` (com um antes e depois de um programa publicado corrigido na tela e o rascunho de post), `docs/backlog.md`, o recado ao R3 (o programa do Gustavo continua "gerado" até ele editar) e parar para a revisão do Gustavo.

**O que não fazer**
- Não use IA para ler programas (fica para depois, com a opção d de `b-monte-e-avaliador.md`).
- Não bloqueie nada que não seja segurança; não insista a cada abertura.
- Não troque a lógica "vaga por função, nunca por equipamento" nem o determinismo.
- Não afirme nada sobre treino sem selo e fonte. Não há estudo que compare um programa montado pela pessoa com um prescrito (`b-monte-e-avaliador.md`, seção 3): o texto não promete ganho por montar o próprio treino.
