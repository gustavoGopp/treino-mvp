# Frente C: o que falta de função e de texto no uso do app (06/11/2026)

**Em uma olhada.** Percorri o app da `main` por script como as 6 personas (173 capturas, 6 estados semeados por persona, mais o Bruno com 2 locais e com dor no ombro). O caminho principal funciona: o treino abre em 1 toque, a troca de local explica cada troca, a volta da pausa e a semana leve aparecem com texto sem culpa. Os problemas que o redesign **não** cobre são de função e de texto, não de tela: (1) a nota de dor do "Senti algo" **não é guardada em nenhuma série** (0 de 6 personas), e por isso 2 regras de segurança que dependem dela nunca disparam no uso real; (2) "Começar" e "Terminar" sem registrar nada grava um "Treino concluído" e **pula o dia na rotação** (6 de 6 personas); (3) **28 de 137 vagas (20%)** não têm alternativa, e o texto de segurança manda "use a alternativa" mesmo assim; (4) **18 de 20 avisos** do programa não dizem o que fazer, contra a regra do próprio projeto (`acompanhamento.mensagens`: "fato + próximo passo"); (5) o "porquê" de 61% dos exercícios só tem os 5 textos genéricos; (6) quando o programa muda (divisão, "Prefiro", minutos), a pessoa aceita sem ver o que muda, e a mensagem diz "regras novas" mesmo quando a mudança foi dela. Recomendo começar por um pacote pequeno de correção do registro (opção B, ~2 dias), depois o pacote de textos (opção A).

> Selos de `docs/pesquisa/00-metodo.md`: `robusta`, `moderada`, `um estudo`, `consenso`, `[opinião]`, `[mercado]`. **[medido]** = saiu de um script desta frente (ver "Como reproduzir"). As personas são as fictícias de `tests/personas/index.ts`; `privado/` não foi lido.

## 1. O que existe hoje

Hoje é quinta, 05/11/2026 no relógio fixo dos scripts (o mesmo dos testes e2e de acompanhamento).

| Função | Onde | Regra | Medido |
|---|---|---|---|
| Porquê de cada exercício | `Programa.tsx` → "Detalhes" de cada cartão; `porqueDoExercicio` em `src/domain/gerador/index.ts` | `selecao.funcao-da-vaga`, `selecao.equivalencia`, `reps.faixa.por-tipo`, `rir.alvo`, `descanso.por-tipo` + regras de função | 1 toque; 5 a 8 itens por exercício (média 5,4 a 6,0 por persona); 137 exercícios nos 6 programas |
| Avisos e porquê do programa | "Sobre o programa: avisos e o porquê" | `volume.semanal.alvo`, `tempo.corte`, `equipamento.*`, `volume.prioridade.competicao` | 1 toque; a tela vai de 130–264 palavras para 469–809 |
| Ajustes ("Dá para ajustar") | faixa no topo, `opcoesDeAjuste` (`src/domain/gerador/opcoes.ts`) | `tempo.corte` | aparece para Ana, Carla, Elisa e Fábio (4 de 6) |
| Treino do dia, série, descanso | `Treino.tsx` | `progressao.*`, `tempo.aquecimento`, `rir.leitura` | 1 toque para começar; 1ª série: 3 toques (carga vazia na 1ª vez, RIR, "Série feita") |
| "Senti algo" | `Treino.tsx`, `avaliarDor` e `avaliarSinal` (`src/domain/triagem`) | `seguranca.dor.escala`, `seguranca.alerta.*`, `seguranca.sem-diagnostico` | dor aguda → alternativa em 3 toques |
| Desfazer | "Desfazer a última série" (`desfazerSerie`) | — | só a última série do exercício aberto, só com o treino em andamento |
| Troca só no treino e "Prefiro este" | folha "Trocar" e "Detalhes" (`Prefiro.tsx`) | `selecao.preferencia` | trocar para sempre: 3 toques (Detalhes → Prefiro → Atualizar), em 86 de 137 exercícios (os que mostram "Prefiro") |
| Evitar um exercício | `/comecar/restricoes`, só por "Refazer as respostas" | — | 6 toques e 4 telas do cadastro (triagem incluída) até a tela; o redesign já põe em Meus dados (item `objetivo`) |
| Divisão | "Mudar a rotina ou a divisão" | `divisao.recomendacao`, `divisao.equivalencia` | 5 toques até o programa novo |
| Vários locais | "Onde vou treinar hoje?" | `local.treino-do-dia` | Bruno: 1 toque, 6 trocas listadas com o motivo ("Aqui não tem polia baixa: … → …") |
| Pausa, semana leve, evolução | `mensagemDeVolta`, `semanaLeveDeHoje`, `evolucaoDoExercicio` | `readaptacao.durante-uso`, `deload.semana-leve`, `acompanhamento.semana` | 6 de 6 personas veem "Bem-vindo de volta!" depois de 27 dias; 6 de 6 veem a semana leve no histórico estagnado |
| Exportar e importar | `Dados.tsx`, `src/storage/arquivo.ts` | — | exportar 2 toques (arquivo de 98 kB na Ana); importar num aparelho limpo, 3 toques; 14 de 14 sessões voltam |

**Nota sobre a semeadura.** Semeando o estado com o inventário da persona "cru", o Bruno e a Carla viam "Há uma versão nova do seu programa" logo ao abrir. A causa é que o app lê o inventário pelo zod, com os valores padrão, e gera um programa um pouco diferente. Passando o inventário pelo `inventarioSchema` antes de gerar, a faixa some [medido]. O redesign registra a mesma faixa no Bruno e na Carla (`medidas.md`, linha 40). É provável que seja o mesmo artefato, mas não conferi o script dele.

## 2. O que falta (medido)

### 2.1 Tabela dos caminhos
Toques contados a partir da tela anterior. "Problema": **F** = função que falta, **T** = texto que não explica, **P** = pede mais do que precisa, **—** = nenhum.

| Caminho | Passo | O que a pessoa quer | O que o app faz | Toques | Texto que aparece | Problema |
|---|---|---|---|---:|---|---|
| Programa | ver por que o exercício está ali | saber o motivo | "Detalhes" abre 5–8 linhas | 1 | "Vaga de agachar: entre as opções do seu equipamento, a melhor para esta função." + reps, RIR, descanso | **T**: em 84 de 137 exercícios (61%) só aparecem os 5 textos genéricos; 2 de 137 citam o foco escolhido pela pessoa |
| Programa | ver por que um músculo ficou abaixo | entender a meta | "Sobre o programa" | 1 | Ana: "Abaixo da meta por falta de tempo: quadríceps 6 de 8…" | **T**: 15 casos músculo × persona programados abaixo da meta; 5 sem aviso nenhum (Ana ombro lateral 4 de 6; Diego ombro lateral 5/6, ombro posterior 4/6, panturrilha 4/6; Elisa panturrilha 4/6), por regra: não prioritário só avisa abaixo de 4 |
| Programa | ajustar | uma saída | "Ver opções" | 1 | Fábio: só "Manter 4 treinos de 45 min" | **T/P**: a faixa promete "Dá para ajustar" e não há opção real |
| Programa | mudar a divisão | ver o efeito | Meus dados → Mudar → escolher → Salvar → "Atualizar" | 5 | "cerca de 10 exercícios por treino"; depois só "Há uma versão nova do seu programa." e "Programa atualizado com as regras novas." | **T**: nada diz o que muda antes de aceitar; a mensagem atribui a mudança a "regras novas" (3 de 3 caminhos: divisão, "Prefiro", minutos) |
| Programa | trocar para sempre | não ver mais aquele exercício | Detalhes → "Prefiro X" → Atualizar | 3 | "Preferência salva. Ela entra quando você atualizar o programa…" | **F** em parte: 51 de 137 exercícios sem "Prefiro" (sem equivalente no mesmo nível); a lista inclui o próprio exercício atual |
| Programa | ver a próxima semana ou o bloco | planejar | só as fases em texto ("Semana 1–2… 3+: Programa completo") | 1 | "Os exercícios ficam os mesmos por 4 a 8 semanas; o programa só muda quando você pede." | **F**: não há bloco 2; regerar dá o mesmo programa (determinístico), e a regra `selecao.manter-no-bloco` ("ao trocar de bloco, varia dentro da mesma função") não tem código |
| Treino | 1ª série na 1ª vez | registrar | a carga vem vazia ("Escolha") | 3 | "Calibração da carga. 1ª vez neste exercício: comece com uma carga que pareça fácil…" | — (o redesign trata a tela) |
| Senti algo | dor 4 | ser orientada e registrar | aviso "Reduza a carga em 10–20%…" | 2 | o aviso, com selo | **F**: a nota não fica em nenhuma série (`dor: null` em 6 de 6) |
| Senti algo | dor aguda | parar e trocar | encerra o exercício e abre a troca | 2 | "Pare este exercício e use a alternativa. Se o sintoma continuar, procure avaliação profissional." | **T**: em 28 de 137 vagas não há alternativa ("Este exercício não tem alternativa com o seu equipamento") |
| Senti algo | alternativa | seguir o treino | troca só neste treino | 1 | "No lugar de agachamento búlgaro com apoio, só neste treino." | — |
| Fim | terminar | ver o que fez | "Treino concluído" sem confirmação | 1 | "Para a próxima vez: Agachamento búlgaro… Calibrar" | **T**: o exercício interrompido por dor volta como sugestão ("Calibrar" ou "Manter") sem menção à dor (6 de 6 personas) |
| Fim | terminar sem registrar nada | desistir de hoje | grava a sessão, diz "Treino concluído · 0 exercícios" e a rotação anda | 2 | "Treino concluído Corpo todo C 0 exercícios 0 séries" | **F**: 6 de 6 personas pulam o dia (Ana C → A; Carla Puxar → Pernas); `descartarSessao` existe em `acoes.ts`, sem botão |
| Semana | ver a semana | saber se está bem | treinos, séries por músculo, ofertas | 1 | "Ombro (lateral) 0 de 6"; "Quadríceps 2 de 8 mantendo" | **T**: a meta mostrada é a do nível, não a do programa: a Ana nunca chega a 8 no quadríceps, porque o programa planeja 6, e a tela não diz isso |
| Evolução | ver o progresso | 1 exercício | lista da melhor série por treino, com "recorde" | 3 | "05/10 5 kg × 8 … 02/11 5 kg × 12 recorde" | — (o redesign resume em 1 linha) |
| Histórico | corrigir um registro errado | apagar ou editar | não há caminho depois de "Terminar" | — | — | **F** |
| Treino livre | registrar um treino fora do plano | anotar o que fez | só os dias do programa; no treino, só as alternativas da vaga | — | — | **F** |
| Pular um dia | faltar terça | continuar | a rotação segue do último treino feito; a faixa diz "Se der, o Corpo todo C cabe até domingo." | 0 | — | — (14 dias ou menos não muda nada; 14 a 20, RIR +1; 21 ou mais, a volta) |
| Pausa | voltar depois de 27 dias | voltar sem culpa | cartão "Bem-vindo de volta!", carga −10% já preenchida | 0 | "Faz 27 dias do último treino. Estas 2 semanas vão mais leves…" | — (o redesign deixa a volta como a única mensagem) |
| Estagnado | entender por que a carga não sobe | um próximo passo | "Hoje: mesma carga" | 0 | "Três sessões sem melhora: 1) alargue a faixa; 2) reduza 10% e reconstrua; 3) semana leve; 4) troque por uma variação equivalente." | **T**: 4 saídas, nenhuma com botão; já está no backlog (F.2, "uma saída por vez") |
| Semana leve | aceitar ou não | — | "Semana leve? (opcional)… Fazer a semana leve / Agora não" | 1 | "Motivo: 13 exercícios sem progresso em 3 treinos; 'pesado demais' em 2 dos últimos 3 treinos." | — |
| 2 locais (Bruno) | treinar no bairro | saber o que muda | 6 trocas com o motivo; a carga do supino vem do histórico | 1 | "Aqui não tem polia alta: puxada… → barra fixa." | — |
| Dor na triagem (Bruno, ombro 3) | saber o efeito | ver no programa | lembrete dentro de "Detalhes" em 18 de 32 exercícios; nada no topo | 1 por exercício | "Você marcou o ombro (dor 3 hoje): se doer acima de 5 numa série, pare e use a alternativa." | — (o redesign leva o resumo da dor ao topo do programa, item `cinco-telas`) |
| Meus dados | exportar e importar | cópia de segurança | arquivo JSON; a importação substitui tudo | 2 e 3 | "Arquivo exportado. Guarde-o num lugar seguro: ele tem seus dados de saúde." | — |
| Meus dados | evitar um exercício | tirar do programa | refazer o cadastro desde a triagem | 6 até a tela | "Algum exercício que você quer evitar? (opcional)" | **P** (o redesign cobre: item `objetivo`) |

### 2.2 Os avisos de cada persona (programa recém-gerado)
"Diz o que fazer" = o texto traz um próximo passo que a pessoa pode tomar.

| Persona | Avisos | `regraId` | Dizem o que fazer |
|---|---:|---|---:|
| Ana | 7 | `equipamento.sem-puxada-vertical`, `equipamento.escada-carga-leve`, `selecao.isolador-obrigatorio`, `tempo.corte` ×3, `volume.prioridade.competicao` | 1 (`volume.prioridade.competicao`: "escolha um grupo só, ou aumente os minutos ou os dias") |
| Bruno | 1 | `tempo.corte` | 0 (só informa as superséries) |
| Carla | 2 | `volume.semanal.alvo`, `volume.prioridade.competicao` | 1 |
| Diego | 2 | `equipamento.escada-carga-leve`, `tempo.corte` | 0 |
| Elisa | 5 | `equipamento.escada-carga-leve`, `selecao.isolador-obrigatorio`, `tempo.corte`, `equipamento.sem-ancoragem`, `volume.semanal.alvo` | 0 |
| Fábio | 3 | `equipamento.escada-carga-leve`, `selecao.isolador-obrigatorio`, `volume.semanal.alvo` | 0 |
| **Total** | **20** | | **2 de 20** |

Dois cuidados: (a) parte dos avisos não tem o que fazer porque o projeto **decidiu** que o app não sugere compra (`equipamento.sem-ancoragem`, `equipamento.escada-carga-leve`); para esses, o próximo passo honesto é "não precisa fazer nada: o resto do programa compensa o que dá", e isso também é um próximo passo; (b) o aviso "Corpo todo C: deve levar ~46 min, mais que os 45 min que você tem" (Ana) tem uma saída real, na faixa de ajustes, mas o texto não aponta para ela.

### 2.3 Respostas às perguntas de função
| Pergunta | Resposta medida |
|---|---|
| Entende por que um exercício está no programa? | Em parte. 1 toque, mas em 61% dos exercícios o porquê é genérico; o músculo que ele serve, a prioridade e a razão de ele ter ganhado das outras opções não aparecem. |
| Por que a meta de um músculo não foi atingida? | Em 10 de 15 casos, sim (em "Sobre"); em 5, não há aviso. Na "Semana", nenhum dos 15 é explicado. |
| O que a prioridade faz? | Na rotina: "Os grupos prioritários recebem mais séries; os outros ficam no mínimo que já gera resultado." O número (~12 contra ~6) só aparece em "Sobre" (`volume.semanal.alvo`). |
| O que muda com outra divisão? | Antes: "cada músculo N vezes, cerca de N exercícios por treino". Depois: só a faixa "versão nova", sem lista. |
| Vê a próxima semana ou um bloco? | Não. Só a semana de hoje; as fases são texto. Não há bloco 2. |
| Muda um exercício para sempre? | Sim, em 63% (86 de 137), por "Prefiro" + "Atualizar" (3 toques); no resto, só refazendo o cadastro. |
| Registra um treino fora do plano? | Não. |
| Desfaz um registro errado? | Só a última série, durante o treino. Depois de "Terminar", não. Um "Terminar" sem querer vira treino concluído e pula o dia. |
| O que acontece se pular um dia? | Nada de ruim: a rotação continua e a faixa da semana diz o que ainda cabe. |

### 2.4 Achados de função que ninguém tinha medido
1. **A dor do "Senti algo" não é guardada.** O esquema já tem `serie.dor` (`src/storage/esquema.ts`), mas nenhuma linha de `src/features/` grava esse campo (busca por `dor:` nos arquivos de `src/features/treino`: 0 resultado). Efeito: a regra da progressão "Dor entre 3 e 5/10: reduza a carga…" (`sugerirProgressao`, `seguranca.dor.escala`) e a "dor que se repete" da semana leve (`dorQueSeRepete`, com o aviso de avaliação) **nunca disparam no uso real**. Só disparam nos testes, que semeiam a dor direto no estado.
2. **Treino vazio conta.** `proximoDia` (`src/domain/sessao/index.ts`) usa `s.fim`, e não `treinoFeito` (que exige 1 série). A semana, a pausa e a semana leve já usam `treinoFeito`; só a rotação não usa.
3. **Vagas sem alternativa.** Ana 5 de 19, Diego 5 de 18, Elisa 10 de 11, Fábio 8 de 20 (Bruno e Carla, 0). Causa: `alternativas()` só busca o mesmo músculo **em outro equipamento**; no corpo livre, tudo é "peso do corpo". Em 16 das 28 vagas há outro exercício possível do mesmo músculo primário (ex.: agachamento → afundo com o peso do corpo), sem filtrar o nível nem a triagem: é um teto, não uma promessa [medido].
4. **Bloco sem fim.** `selecao.manter-no-bloco` (moderada, `kassiano2022`) promete variar ao trocar de bloco; nenhum código conta as semanas do bloco nem varia a escolha. Com o R3 em curso (4 semanas), o Gustavo chega à semana 5 sem nenhuma oferta.

## 3. O que a evidência diz

| Pergunta | Resposta | Selo | Fontes (PMID ou DOI, status) |
|---|---|---|---|
| Dar o motivo de uma tarefa ajuda a pessoa a assumi-la? | Num experimento, dar um motivo que faça sentido, reconhecer o que a pessoa sente e oferecer escolha levaram a mais autorregulação depois | um estudo | Deci 1994, PMID 8169757, DOI 10.1111/j.1467-6494.1994.tb00797.x (resumo lido no PubMed) |
| Intervenções que apoiam a autonomia mudam o comportamento de saúde? | Sim, com efeito pequeno a médio, heterogêneo, em parte pela motivação autônoma | moderada | Ntoumanis 2021, PMID 31983293, DOI 10.1080/17437199.2020.1718529 (resumo lido no PubMed) |
| Motivação autônoma prevê a adesão ao exercício? | Sim, na revisão sistemática de autodeterminação e atividade física | moderada | `teixeira2012` (chave existente, PMID 22726453) |
| Registrar e ver o progresso ajuda a chegar à meta? | Sim, mais quando o progresso fica registrado | moderada | `harkin2016` (PMID 26479070), `michie2009` (PMID 19916637), chaves existentes |
| Vale registrar a dor por sessão para decidir a próxima? | O modelo de monitorar a dor (até 5 de 10, olhando a resposta no dia seguinte) é a base da regra do app; ele pressupõe a nota registrada | um estudo (consenso na regra) | `silbernagel2007` (chave existente), regra `seguranca.dor.escala` |
| Desfazer e sair de um estado errado | "Controle e liberdade do usuário" (desfazer, sair) é um dos princípios de usabilidade mais citados | consenso | Nielsen 1994, DOI 10.1145/191666.191729 (metadados no Crossref; texto não lido) |
| A mensagem deve trazer o próximo passo? | Regra do projeto: "fato + próximo passo" | consenso | `acompanhamento.mensagens` (`michie2009`, `momma2022`, `ren2024`, `garciahermoso2023`) |
| O que apps de musculação oferecem? | O Hevy lista "Start Empty Workout" (treino livre), "Add and Remove Sets" e "Previous Workout Values" na página de recursos | [mercado] | hevyapp.com/features, lida em 06/11/2026 (não é evidência) |
| Explicar mais aumenta a confiança no app de treino? | Não achei estudo direto em app de musculação; a ponte é a teoria da autodeterminação, acima | [opinião] | — |

## 4. Valor para quem usa

- **Todas as personas, no 1º "Terminar" sem querer** (a 4 px do "Senti algo" hoje, segundo o redesign): o dia some da rotação. O redesign põe uma confirmação, mas a confirmação ainda grava a sessão vazia.
- **Quem sente dor (Bruno, com o ombro)**: a nota que ele dá não volta. No fim do treino, o mesmo exercício aparece em "Para a próxima vez" como se nada tivesse acontecido (no Bruno, "Calibrar · próxima: 1 kg"), e a semana leve por dor que se repete não aparece.
- **Elisa e Fábio (sem equipamento ou só a barra)**: em 10 de 11 e 8 de 20 vagas, o caminho de segurança termina em "não tem alternativa", sem dizer o que fazer.
- **Ana e Elisa (iniciantes com avisos)**: 7 e 5 avisos em "Sobre", 1 e 0 com um próximo passo. O que mais ajuda é dizer "não precisa fazer nada" quando for o caso [opinião].
- **O Gustavo no R3, da semana 5 em diante**: nada novo no programa. É aí que a regra do bloco deveria entrar [opinião, com `selecao.manter-no-bloco`].
- **Valor baixo** [opinião]: o treino livre, para quem segue o programa à risca, que é o público do MVP.

## 5. Opções

| | A. Pacote de textos do porquê | B. Corrigir o registro | C. Trocas e prévia | D. Bloco 2 e treino livre |
|---|---|---|---|---|
| O que é | Porquê específico por exercício (músculo, foco, por que ganhou das outras); avisos com o próximo passo, inclusive "não precisa fazer nada"; texto de segurança para vaga sem alternativa; "regras novas" → a causa real; a Semana diz a meta do programa | Gravar a nota de dor na série; treino sem série não anda a rotação; "Descartar este treino" (a função já existe); apagar ou corrigir o último treino | Alternativas do mesmo músculo e do mesmo equipamento quando não há outro equipamento; "usar sempre este" no treino; prévia do que muda antes de "Atualizar" (função de diferença entre 2 programas) | Variação determinística ao fim de 4–8 semanas; registrar um treino fora do plano |
| Esforço | 2–3 dias | ~2 dias | 3–4 dias | 5–7 dias, mais a pesquisa curta do bloco |
| Risco | Mexe em textos com `regraId` e nos snapshots das personas (revisão do Gustavo) | Regras de dor passam a disparar de verdade: mais avisos e semanas leves no R3 (é o esperado, mas muda o uso) | As alternativas mudam o critério 4 e os snapshots; a prévia pede um teste de propriedade | Alto: estado novo, progressão de exercício que entra e sai, conta da semana |
| Regra | Nenhuma nova; textos de `avisosDeMeta`, `porqueDoExercicio`, `avaliarDor`/`avaliarSinal` | `proximoDia` passa a usar `treinoFeito` | `selecao.equivalencia` ganha o caso "sem outro equipamento" (decisão do Gustavo) | `selecao.manter-no-bloco` ganha código; treino livre pede regra de como conta na semana |
| Dado | Nenhum | Nenhum | Nenhum | Talvez as tabelas de variação por função |
| Armazenamento (`src/storage/`) | Nada | Nada: `serie.dor` já existe; apagar uma sessão é só tirá-la do histórico (com teste) | Nada | Versão 8 com migração (`bloco` e treinos livres): **choca com a versão 8 que o redesign pede** para os dias planejados (pedido ao domínio 2); precisa juntar as duas numa versão só |
| Dependências | Nenhuma | Nenhuma | A de "usar sempre este" depende da folha "Trocar" do redesign | Depende de A (o porquê da troca de bloco) e do uso do R3 |
| Choque com o redesign | Baixo: o redesign mantém os textos e muda a ordem (item `uma-mensagem`); os textos novos entram nas mesmas peças | Baixo: o item `terminar` confirma; B decide o que a confirmação faz com 0 série | Médio: a folha do exercício e a do "Trocar" são do lote 2 e do lote 4 | Médio: estado v8 |
| Choque com o R3 | Os textos mudam no meio do uso (aviso no devlog) | **Desejável antes do fim do R3**: hoje o R3 não registra a dor | Pequeno | Grande: muda o programa do Gustavo durante o uso real |

## 6. Recomendação

**B primeiro, depois A** (juntas, ~4–5 dias), e C em seguida, com a parte das alternativas antes da prévia.

- **B** é pequena, não mexe no armazenamento, e corrige dois defeitos de função que afetam 6 de 6 personas, um deles de segurança (a dor não registrada desliga 2 regras com avaliação profissional). Durante o R3 é o que mais vale, porque o export do Gustavo passa a ter a dor e os treinos reais, sem sessões vazias, e é dele que saem as decisões de "estagnado" que o backlog deixou para o R3 (F.2, achado 11).
- **A** cumpre a regra que o projeto já tem (`acompanhamento.mensagens`: "fato + próximo passo"), que hoje vale para 2 de 20 avisos, e se apoia na evidência de dar o motivo (Deci 1994, um estudo; Ntoumanis 2021, moderada). Não muda regra nem estado.
- **D** fica para depois do R3, quando o uso mostrar se o bloco 2 faz falta, e com a versão 8 do estado decidida uma vez só, junto com a do redesign.

## Pedidos à sessão de design (só tela)

1. **"Senti algo" mostra o que ficou guardado.** Depois de uma nota de 3 a 5, uma linha na própria série ("dor 4 registrada nesta série") e o lugar onde ela volta (fim do treino, próxima vez). Motivo: hoje a nota some em 6 de 6 personas (depende de B). Encaixa na folha do item `folhas`, sem mudar os textos de segurança.
2. **Fim do treino com exercício interrompido.** Linha "Interrompido: búlgaro (dor aguda)" e o lembrete de avaliação, antes de "Para a próxima vez". Motivo: em 6 de 6 personas, "Para a próxima vez" sugere o exercício interrompido sem menção à dor. Encaixa no item `fim` ("O que mudou hoje").
3. **Terminar sem nenhuma série.** A confirmação do item `terminar` ganha a saída "Descartar este treino" quando há 0 série ("Você não registrou nenhuma série. Descartar / Guardar mesmo assim"). Motivo: 6 de 6 pulam o dia. Não choca: estende o item.
4. **A faixa "versão nova" mostra o que muda antes de aceitar.** Ex.:
   ```
   Seu programa muda assim:
   Corpo todo C: 6 → 8 exercícios, ~46 → ~60 min
   Entra: extensão de joelho · Sai: —
   [Atualizar]  [Agora não]
   ```
   Motivo: 3 de 3 caminhos (divisão, "Prefiro", minutos) aceitam sem ver nada. Depende do pedido ao domínio 5. Encaixa no item `uma-mensagem` (é uma das ofertas).
5. **Escolher a divisão com a prévia na pessoa.** Cada opção diz, para o equipamento e os minutos dela, os dias, os exercícios por dia, os minutos e as metas atingidas, antes de "Salvar". Motivo: hoje "cerca de 10 exercícios por treino" genérico e 5 toques até ver o resultado. Depende do pedido ao domínio 5.
6. **Histórico que se corrige.** Na Semana e na Evolução, abrir um treino feito e corrigir uma série ou apagar o treino, com confirmação. Motivo: hoje há 0 caminho depois de "Terminar". Tela nova; não esbarra em decisão do redesign.
7. **A Semana separa a meta do programa.** Ex.: "Quadríceps 2 de 6 (o seu programa planeja 6 de 8: falta tempo)". Motivo: 15 casos músculo × persona em que a meta mostrada é inalcançável. Encaixa no item `semana`.
8. **Folha do exercício com o porquê específico primeiro.** 1 linha do motivo próprio no topo, os 5 genéricos recolhidos. Motivo: 61% dos exercícios só têm os genéricos. Encaixa na folha proposta pelo agente 4 (4.x, "tocar na linha abre uma folha") e depende de A.
9. **"Usar sempre este" na folha "Trocar" do treino**, com o efeito escrito e sem listar o próprio exercício como opção. Motivo: hoje o "Prefiro" só entra quando a pessoa atualiza, e, no Bruno, 1 dos 2 botões era "Prefiro supino inclinado com halteres", o exercício que já estava. Encaixa no item `folhas`.

## Pedidos ao domínio

1. **`proximoDia` usar `treinoFeito`.** Teste: começar e terminar sem série mantém o mesmo dia. Motivo: 6 de 6 personas pulam o dia.
2. **Alternativas quando não há outro equipamento.** Em `alternativas()`, se não houver de outro equipamento, entram as do mesmo músculo e do mesmo equipamento, respeitando o nível e a triagem. Motivo: 28 de 137 vagas sem alternativa; até 16 com candidato. Muda `selecao.equivalencia` e os snapshots (decisão do Gustavo).
3. **Texto de segurança sem alternativa.** `avaliarDor` e `avaliarSinal` recebem se há alternativa e, sem ela, dizem "pare este exercício e siga para o próximo; se o sintoma continuar, procure avaliação profissional". Motivo: as 28 vagas. Mexe num texto de segurança: revisão do Gustavo.
4. **Avisos com o próximo passo** em `avisosDeMeta` e nos avisos de equipamento e de tempo, incluindo "não precisa fazer nada" quando a causa é o equipamento (sem sugerir compra, como mandam `equipamento.sem-ancoragem` e `equipamento.escada-carga-leve`). Motivo: 2 de 20.
5. **Diferença entre 2 programas**: função pura `diferencaDeProgramas(salvo, novo)`, com o que entra e sai por dia, os minutos e os avisos que mudam. Base dos pedidos de design 4 e 5. Teste de propriedade: a diferença de um programa com ele mesmo é vazia.
6. **Porquê específico do exercício** em `porqueDoExercicio`: o músculo da vaga, se ele é foco e quantas séries tem, e por que ganhou das outras opções possíveis (o nível da função já é calculado). Motivo: 61% só com genéricos.
7. **A meta do programa na semana**: `resumoDaSemana` devolve, por músculo, a meta planejada e o motivo, quando ela fica abaixo da meta do nível. Motivo: 15 casos, 5 sem aviso.
8. **`opcoesDeAjuste` sem opção real devolve vazio** (não só "Manter"). Motivo: o Fábio vê "Dá para ajustar" e só tem "Manter".
9. **(Para a opção D, depois do R3)** variação de bloco em `selecao.manter-no-bloco`: entrada `bloco` no perfil, que escolhe outro exercício do mesmo nível da função, de forma determinística. Pede uma pesquisa curta e a versão 8 do estado, junto com a do redesign.

Fora de `src/domain/`, mas de função (opção B, em `src/features/treino/acoes.ts`): gravar a nota de dor na série em andamento ou na última feita; ligar `descartarSessao`; apagar ou corrigir uma sessão do histórico.

## Fontes novas (para conferência)

| Chave sugerida | Autor e ano | Título | Periódico | PMID / DOI | Status |
|---|---|---|---|---|---|
| `deci1994` | Deci EL, Eghrari H, Patrick BC, Leone DR (1994) | Facilitating internalization: the self-determination theory perspective | J Pers 62(1):119–142 | PMID 8169757 · DOI 10.1111/j.1467-6494.1994.tb00797.x | resumo lido no PubMed (efetch), 06/11/2026 |
| `ntoumanis2021` | Ntoumanis N, Ng JYY, Prestwich A, et al. (2021) | A meta-analysis of self-determination theory-informed intervention studies in the health domain: effects on motivation, health behavior, physical, and psychological health | Health Psychol Rev 15(2):214–244 | PMID 31983293 · DOI 10.1080/17437199.2020.1718529 | resumo lido no PubMed (73 estudos; efeitos pequenos a médios, heterogêneos); texto completo não lido (Taylor & Francis) |
| `nielsen1994` | Nielsen J (1994) | Enhancing the explanatory power of usability heuristics | Proceedings of the SIGCHI Conference on Human Factors in Computing Systems | DOI 10.1145/191666.191729 | só metadados no Crossref; texto não lido |
| — | Hevy | Página de recursos ("Start Empty Workout", "Add and Remove Sets") | hevyapp.com/features | — | página lida em 06/11/2026; [mercado], não é evidência |

Descartada: Lewthwaite 2015 (PMID 25732095), sobre a escolha no aprendizado motor. Ela trata de uma escolha sem relação com a tarefa, e eu sei que essa linha tem dúvidas de replicação, mas não verifiquei a meta-análise que as levanta. Não entra.

## Como reproduzir

Os scripts ficam no scratchpad desta frente e serão descartados; rodam contra o app da `main`.

```
cd /home/user/treino-mvp
npx vite build --outDir <scratchpad>/frente-c/dist
npx vite preview --outDir <scratchpad>/frente-c/dist --port 4310 --strictPort   # em segundo plano
npx vite-node --root /tmp <scratchpad>/frente-c/semear.ts        # o --root /tmp é preciso: sem ele o vite-node não acha o arquivo no scratchpad
node <scratchpad>/frente-c/percorrer.cjs                          # todas as personas e os extras
node <scratchpad>/frente-c/prefiro.cjs
node <scratchpad>/frente-c/divisao.cjs carla "Corpo todo 5x"
npx vite-node --root /tmp <scratchpad>/frente-c/altpossiveis.ts
```

- `semear.ts`: gera, por persona, o estado salvo (versão 7), com o programa do gerador e 4 cenários: novo, 4 semanas de histórico, pausa de 27 dias e estagnado com "pesado". Mais o Bruno com 2 locais e o Bruno com o ombro 3/10. Valida cada estado com o `estadoSchema`.
- `percorrer.cjs`: Playwright no Pixel 7, com o relógio fixo em 05/11/2026 12:00 (Brasília). Grava o estado no IndexedDB (`keyval-store`) e percorre o programa, o porquê, "Sobre", os ajustes, o treino, o "Senti algo" (dor 4, dor aguda, alternativa), o fim, o treino vazio, o histórico, a semana, a evolução, a pausa, o estagnado, Meus dados (exportar e importar num aparelho limpo), a rotina, a versão nova, os 2 locais e a dor da triagem. Saída: `resultado.json` (texto, selos com `regraId`, avisos, toques) e `shots/` (173 capturas).
- `prefiro.cjs`: mede "trocar para sempre" (Detalhes → Prefiro → Atualizar) e o caminho até "algo a evitar".
- `divisao.cjs`: mede a troca de divisão (o que aparece antes e depois de "Atualizar").
- `altpossiveis.ts`: para cada vaga sem alternativa, conta os exercícios possíveis do mesmo músculo primário (sem filtrar nível nem triagem).
- `difere.ts`: confere que o perfil semeado gera o mesmo programa (o achado do inventário pelo zod).
- Contagens à mão, a partir de `resultado.json`: os avisos com próximo passo (seção 2.2) e a busca por `dor:` em `src/features/treino` (seção 2.4).
