# Próximos passos do treino-mvp: o retrato e a proposta (sessão de 06/11/2026)

> Branch `claude/happy-fermat-zty3eo`, a partir da `main` `0bbcbd2`. Esta sessão é, na prática, a proposta do **R5 ("decidir com o uso")** do `PLANO-MVP.md`. Só documentos: nada em `src/`, `tests/` ou `scripts/` mudou. Dados fictícios (as 6 personas de `tests/personas/`); nada de `privado/`.
>
> **Como ler.** A parte 1 é o retrato do app de hoje, com cada número tirado de um comando ou de um arquivo (a fonte está ao lado). A parte 2 junta os relatórios das cinco frentes (`proximos-passos/a-qualidade.md` a `e-produto.md`) numa matriz, propõe 2 ou 3 marcos e lista os pedidos à sessão de design. Quem escolhe é o Gustavo.
>
> **Respostas do Gustavo que guiaram a sessão (06/11):** o app abre para **família e amigos** nos próximos meses, não para o público; "monte o seu treino" é para **quem já treina e tem programa próprio**; o avaliador aceita **só exercícios do app** a princípio, e a IA pode vir depois; ainda **não há incômodos anotados do R3**.

---

## Parte 1. O app hoje

### 1.1 As medidas de saúde do código (rodadas nesta sessão, na `main` `0bbcbd2`)

| Comando | Resultado | Tempo |
|---|---|---|
| `npm run check` (lint + tipos + unitários) | **670 testes em 42 arquivos, todos passando** | 34 s |
| `npm run test:e2e -- --trace off` (Playwright, Pixel 7, build + preview) | **48 testes, todos passando** (10 arquivos: cadastro 13, treino 7, guia 6, acompanhamento 5, telas 3, foto 3, início 2, locais 2, corpo livre 1, laboratório 1) | 2,2 min |
| `npm run auditoria` (estresse, progressão, base, anatomia, mínimo, catálogo, qualidade) | **os 8 passos terminaram, e todos os arquivos regerados saíram idênticos aos guardados na `main`** (`git status` limpo depois da rodada). A 1ª tentativa parou no limite de 30 min do terminal no 5º passo (a máquina estava dividida com as 5 frentes); os 4 passos restantes rodaram em seguida. `npm run auditoria:verificar` (duas rodadas seguidas) não foi repetido: a comparação com a rodada que gerou os arquivos da `main` mede o mesmo determinismo | ~50 min no total (19 min só os 4 últimos passos) |

### 1.2 O que cada tela faz (`src/App.tsx`, `src/features/`)

| Rota | Tela | O que a pessoa faz ali |
|---|---|---|
| `/` | Boas-vindas (`onboarding/BoasVindas.tsx`) | lê o que o app faz e o que não faz (não diagnostica) e começa |
| `/comecar/triagem` | Triagem (`Triagem.tsx`) | responde as perguntas de saúde no estilo do PAR-Q+; um "sim" pede a confirmação de avaliação profissional |
| `/comecar/nivel` | Nível (`Nivel.tsx`) | diz há quanto tempo treina e se está voltando de pausa |
| `/comecar/rotina` | Rotina (`Rotina.tsx`) | escolhe dias, minutos, objetivo e prioridades |
| `/comecar/inventario` | Equipamento (`Inventario.tsx`, `FotoEquipamento.tsx`) | marca o equipamento por atalho, item a item ou por foto (a foto é a única coisa que sai do aparelho) |
| `/comecar/restricoes` | Restrições (`Restricoes.tsx`) | marca dores e exercícios a evitar |
| `/programa` | Início e programa (`programa/Programa.tsx`, `Prefiro.tsx`, `CartaoTexto.tsx`) | vê os dias, o "porquê", os avisos; escolhe a divisão entre as oferecidas; diz "Prefiro este" entre equivalentes; "Atualizar programa" |
| `/treino` | Treino (`treino/Treino.tsx`, `Temporizador.tsx`) | registra carga × repetições × RIR, descansa com o relógio, troca pela alternativa naquela sessão, "Senti algo" |
| `/treino/fim` | Fim do treino (`Resumo.tsx`) | vê o que fez e a sugestão para a próxima vez |
| `/semana` | A sua semana (`acompanhamento/Semana.tsx`, `SemanaLeve.tsx`) | treinos da semana, séries por músculo contra a meta, semana leve sugerida |
| `/evolucao/:exId` | Evolução (`Evolucao.tsx`) | a melhor série de cada treino de um exercício |
| `/locais`, `/locais/:id` | Locais (`locais/Locais.tsx`) | cadastra mais de um lugar de treino, cada um com o seu equipamento, e escolhe onde treina hoje |
| `/dados` | Meus dados (`dados/Dados.tsx`, `EstiloBoneco.tsx`) | guarda e restaura uma cópia (JSON), escolhe o estilo do Boneco, apaga tudo |
| `/guia/:id` | Guia (`guia/Guia.tsx`) | a animação do exercício (Boneco), os músculos, os erros comuns e a prescrição da pessoa |
| `/dev/gerador`, `/lab/boneco` | Telas de teste | só no desenvolvimento |

**O que a pessoa não consegue fazer hoje** (conferido no código): montar um dia, acrescentar ou tirar um exercício do programa, mudar séries, trocar um exercício para sempre fora dos equivalentes do mesmo nível, ou avaliar um programa que não saiu do gerador. O estado guardado está na versão 7 (`src/storage/esquema.ts`, `VERSAO_ESTADO = 7`).

### 1.3 As regras, por selo (`src/domain/regras/regras.json`, contado por script)

**141 regras**: 7 robustas, 26 moderadas, 15 de um estudo e **93 de consenso** (66%). O consenso é a maior fatia porque o selo vai para o número, não para o tema (`docs/pesquisa/00-metodo.md`): "10 séries por semana rendem mais que menos de 10" é robusta, mas "iniciante começa com 6 a 10" é consenso.

| Família | Regras | Família | Regras |
|---|---:|---|---:|
| `selecao.*` (que exercício entra) | 28 | `seguranca.*` | 11 |
| `progressao.*` | 17 | `objetivo.*` | 7 |
| `tempo.*` | 13 | `divisao.*`, `rir.*`, `tecnica.*` | 6 cada |
| `volume.*` | 12 | `readaptacao.*` | 5 |
| `equipamento.*` | 12 | outras 9 famílias | 1 a 4 cada |

As fontes: 331 em `docs/pesquisa/fontes.md` (contadas por linha de chave). Uma regra existe e **nenhum código a usa**: `selecao.variacao` ("manter os exercícios no bloco de 4 a 8 semanas e variar de forma sistemática dentro da função", moderada; `grep` vazio em `src/domain/`).

### 1.4 A biblioteca e o catálogo por cenário de equipamento

- **139 exercícios** (69 compostos, 70 isoladores), **82 com animação** e os outros com cartão de texto ou "animação em breve"; **22 funções** com níveis de preferência (`src/domain/gerador/funcoes.json`). Contado em `exercicios.json` e `funcoes.json`.
- **Intermediário e avançado veem as mesmas opções:** só 9 dos 139 ficam fora do iniciante, e nenhum é só do avançado (`docs/revisoes/catalogo/grade.md`).
- **Onde a biblioteca é fina** (opções por músculo no avançado, somando os padrões; `docs/revisoes/catalogo/grade.md`, `npm run auditoria:catalogo`):

| Músculo | sem nada | só elásticos | só halteres | casa | condomínio | academia |
|---|---:|---:|---:|---:|---:|---:|
| peito | 2 | 4 | 3 | 5 | 6 | 16 |
| costas | **0** | 2 | 2 | 4 | 6 | 16 |
| ombro lateral | **0** | **1** | **1** | 2 | **1** | 2 |
| ombro posterior | **0** | **1** | **1** | 2 | 2 | 4 |
| bíceps | **0** | **1** | 2 | 3 | 3 | 8 |
| tríceps | **1** | 2 | 2 | 3 | 2 | 9 |
| quadríceps | 3 | 5 | 7 | 9 | 8 | 14 |
| posteriores da coxa | 2 | 4 | 4 | 6 | 5 | 9 |
| glúteos | 2 | 2 | 3 | 3 | 4 | 10 |
| panturrilha | **1** | **1** | 2 | 2 | 2 | 7 |
| abdômen | **1** | **1** | **1** | **1** | 2 | 5 |

Em negrito, 0 ou 1 opção: ali não há como variar o exercício sem trocar o equipamento. O ombro lateral tem no máximo 3 opções mesmo na academia mais completa (`academia+`).

### 1.5 A grade de qualidade (`docs/revisoes/qualidade/grade.md`, `npm run auditoria:qualidade`)

911.625 programas: 55 cenários de equipamento × 3 níveis × 2 a 6 dias × 30 a 90 min × 13 prioridades × 15 situações de dor, mais os casos com um exercício evitado. 0 bloqueado.

| Medida | Valor | De onde |
|---|---:|---|
| Dias com até 3 exercícios, 45 min ou mais, sem dor e sem exercício evitado | 6,6% | grade.md, "Exercícios por dia" |
| Idem, com dor ou exercício evitado incluídos | 9% | idem |
| Mediana de exercícios por dia, 45 a 90 min (sem dor) | 6 | idem |
| Programas cujo dia mais longo usa menos de 70% dos minutos (todos) | 25,2% | grade.md, "Suspeitos" |
| Na academia completa, 45 min ou mais | 24,7% | grade.md, "Por cenário" |
| Uso baixo sem aviso de sobra | 2% | "Suspeitos" |
| O mesmo exercício em todos os dias | 39,9% | "Suspeitos" |
| Idem, havendo outro equivalente possível | 0,6% | "Suspeitos" |
| Prioritário abaixo da meta com tempo sobrando | 4% | "Suspeitos" |
| Músculo acima do teto; dia acima dos minutos sem aviso; dia vazio ou só com abdominal | 0; 0; 0 | `qualidade-treinos.md`, F.9 |

O que isso quer dizer: o gerador está certo na conta que importa (séries por músculo por semana dentro da meta e do teto, nenhum dia vazio), mas **deixa tempo sem usar** em um de cada quatro programas e **repete o mesmo exercício em todos os dias** em dois de cada cinco, quase sempre porque não há outro possível com aquele equipamento (só 0,6% repetem havendo alternativa). A prioridade funciona como "foco com manutenção" (`docs/revisoes/qualidade-treinos.md`, Parte D).

### 1.6 O backlog, por frente e por estado (`docs/backlog.md`)

| Frente | Pendente (a decidir) | Decidido, falta fazer | Descartado ou fora |
|---|---|---|---|
| **A. Qualidade e variação** | D-3 (até 2 focos), D-4 (prioridade puxa frequência), D-5 ("só este grupo"), E-c (mais séries quando sobra tempo), B.4 (barra fixa baixa), B.9, B.14, B.17, C.5, C.6, F.5, F.9 (os 3 custos), B.6 ("Prefiro" entre níveis), C.1 (rosca com barra longa, francês com barra), cascata no 2º local, escada por exercício (achado 8) | panturrilha no degrau (falta cartão e animação); "aqui dá para fazer também…" no local maior (R1b, para depois) | remada invertida na mesa; mochila e galão como carga; nórdico invertido em vaga obrigatória (B.14, não recomendado) |
| **B. Monte o seu e avaliador** | (nada: frente nova) | | |
| **C. Fluxo e função** | F.3 (RIR explicado; ordem dos avisos), F.1 (texto do bloqueio da triagem), B.2 (texto do "porquê" do nível 2), gráfico da evolução, apagar um local, esteira no inventário antigo | cartões de texto dos ~40 exercícios antigos; fichas e cartões dos 37 sem guia (lotes de 5) | |
| **D. Longo prazo** | F.2 ("estagnado" em 3 sessões: medir no R3), achado 11, tabela de Nuzzo 2024, calibração na volta de pausa de mais de 26 semanas | | deload automático (fora do MVP); idade e acima de 65 anos (decisão do Gustavo) |
| **E. Produto e abertura** | limite da visão compartilhado, termos de uso e formulário de opinião, licença do PAR-Q+, textos do Guia do MS 2021, `zod` 4 (F.7), testes de propriedade (F.4), 17 fontes sem ficha e 14 não verificadas, Larsen 2025 e `kassiano2026` | chave na Vercel e projetos extras (Gustavo); cronometrar o cadastro; menor anilha (T8) | triagem com perguntas de acompanhamento e revisão por profissional (de lado, decisão do Gustavo); foto do corpo, biotipo, idade, peso, sexo e altura no perfil; outros objetivos opção (c) |
| **Guia e Boneco** (fora das frentes; é do R5 de animação e do design) | rodada com o especialista; R4 D.3 itens 4 a 7; 55 exercícios sem animação (blocos A, C, B, D, E); correções das animações originais; enquadramento da puxada unilateral; fita de suspensão | ordem da fila (A, C, B, D, E) | |

### 1.7 O que o redesign está mudando (lido em `origin/claude/inspiring-rubin-njhaz8`, `docs/revisoes/redesign/proposta.md`)

O redesign trata como dado, e esta sessão não refaz:
- **Estrutura do treino:** o painel da série preso embaixo, com carga, repetições, RIR e "Série feita" sempre à vista (hoje o RIR fica escondido em 24 de 24 casos medidos); o descanso no topo sem cobrir o registro (de 2 para 1 toque obrigatório por série); "Senti algo" fixo no topo direito; "Terminar" com confirmação; a tela acesa no treino inteiro.
- **Cadastro:** 6 → 5 telas; a saúde numa pergunta; **o objetivo sai do cadastro** (vai para Meus dados e uma oferta depois do 1º treino); as prioridades ficam.
- **Início, fim e semana:** um cartão "Hoje"; no máximo 1 oferta por abertura; no fim, primeiro "o que mudou hoje".
- **Sistema visual:** cor Giz e grafite (preferida do Gustavo), letra Atkinson servida pelo app, 16 peças, toque 48/56/64 px; o selo de evidência passa a abrir as fontes (`src/conteudo/fontes.json`).
- **Pedidos do redesign ao domínio** (seção 8 da proposta), que entram na matriz da parte 2: (1) `fontes.json` para o selo abrir a referência; (2) dias planejados (`rotina.diasPlanejados`, estado v8 com migração); (3) marcas por sessão e por semana (recorde, subiu a carga); (4) resumo curto da calibração e da sugestão; (5) `restricoes` ausente vale como listas vazias.
- **Medido por ele e fora do escopo dele:** o Lighthouse dá **59 a 73 de desempenho** no celular simulado, abaixo da meta de 90 do critério 8; a causa é o JavaScript (um pacote único de 1 MB com o motor e a biblioteca em todas as telas). Acessibilidade 93 a 100.

---

## Parte 2. A proposta

> Feita a partir dos cinco relatórios em `docs/revisoes/proximos-passos/`. Cada número vem do relatório citado, onde está o comando que o mede. As fontes novas dos relatórios foram conferidas no PubMed ou no Crossref antes de entrar em `docs/pesquisa/fontes.md` (37 chaves novas e 5 atualizadas nas cinco frentes, de 331 para 368; mais 56 novas e 4 atualizadas na rodada extra de corpo livre, frente F, até 424). Dois achados foram conferidos por mim direto no código, porque mudam a ordem: a nota de dor que não fica guardada e o treino vazio que conta como feito.

### 2.1 O que as frentes encontraram, em uma linha cada

- **A. Qualidade e variação** (`a-qualidade.md`): os custos que a sessão de 06/11 deixou caem com ajustes de 1 dia (dias de 30 min acima do tempo: 69,6% → 48,1%; o mesmo exercício em todos os dias: 29,6% → 18,4%). A "prioridade puxa frequência" (D-4), como está escrita no backlog, quase não tem efeito: o teto da sessão explica 4 de 5.301 casos. O que funciona é **um 2º exercício de outra função** para o prioritário (avançado abaixo da meta: 64,9% → 55,1%). **Variar os exercícios por blocos** mostra ganho só na academia (24 → 37,7 exercícios diferentes em 24 semanas; em casa, 17,6 → 18,5), sem ganho de músculo (moderada, `kassiano2022`, `kassiano2025var`).
- **B. Avaliador e "monte o seu"** (`b-monte-e-avaliador.md`): um protótipo do avaliador, com o domínio de hoje, diz "está bom" em 59,8% de 2.682 programas do gerador, acha algo que o gerador não avisa em 17,4% e achou **3 defeitos reais do gerador** (glúteo sem extensão de quadril no Corpo todo A/B em 6,3%; dois afundos no dia em 2,4%; o teto de 10 séries por sessão que não conta as indiretas em 0,5%). Nos 4 programas publicados que digitou (protocolos de ensaios), aponta o que um treinador apontaria. Só o avaliador custa 2 a 3 dias e não muda o estado guardado; montar do zero, 9 a 13 dias no total.
- **C. Fluxo e função** (`c-fluxo.md`): **a nota de dor do "Senti algo" não fica guardada** (0 de 6 personas; conferido: `Treino.tsx:238` só mostra a mensagem, e o campo `dor` da série existe em `esquema.ts:113`), e por isso a redução de carga com dor de 3 a 5 e a "dor que se repete" (com o aviso de avaliação) nunca disparam. **"Começar" e "Terminar" sem nenhuma série conta como treino feito e pula o dia** (6 de 6; conferido: `proximoDia`, `sessao/index.ts:52`). 2 de 20 avisos dizem o que fazer; 61% dos exercícios têm só o "porquê" genérico; 20% das vagas não têm alternativa e o texto manda usá-la.
- **D. Longo prazo** (`d-longo-prazo.md`), num simulador de 24 e 52 semanas com o código real: **4 defeitos de lógica**, todos visíveis no 1º ou 2º mês: a calibração que nunca termina quando o salto de carga é grande (62 de 492 corridas, até 31 sessões); o "Agora não" da semana leve que dura só até o próximo treino (a oferta volta 46 a 107 vezes em 24 semanas); a semana leve sugerida na fase de aprendizado do iniciante; a estagnação contada no exercício que a pessoa não faz mais. O nível nunca é reavaliado. Não há estudo de hipertrofia com mais de 1 ano em quem já treina.
- **E. Abrir para família e amigos** (`e-produto.md`): o app funciona sem rede depois da 1ª visita (5 de 5 passos). Faltam: o texto da foto exato (3 telas dizem "não fica guardada no servidor", mas a Anthropic guarda o que a API recebe por até 30 dias, `anthropic-retencao`) e o consentimento destacado (LGPD, art. 11); termos de uso; uma saída quando a tela quebra (há 0 tela de erro: a página fica branca, sem caminho até "Exportar"); e proteção contra a perda de dados (o Safari apaga o armazenamento de um site não instalado depois de 7 dias de uso sem visita, `webkit2020`). O teto de gasto no console da Anthropic protege mais o bolso que o limite compartilhado.

- **F. Corpo livre e casa** (`f-corpo-livre.md`, rodada extra pedida pelo Gustavo depois de testar o app sem equipamento e com foco nos superiores): numa grade de 15.300 programas só de corpo livre, a semana com foco nos superiores tem **1,9 exercício diferente de superiores**, e o mesmo exercício aparece em todos os dias em 69,3% dos programas. A biblioteca tem só 3 exercícios de superiores possíveis sem nada. A pesquisa achou **7 exercícios novos** (extensão de tríceps com o peso do corpo, flexão com os pés elevados, rosca sem carga, abertura em T deitado, panturrilha no degrau, afundo para trás, abdominal invertido). Num protótipo, os superiores diferentes vão a 5,3, a repetição em todos os dias cai para 30,8% e o bíceps e o ombro de trás saem do zero. As costas continuam sem saída honesta. O custo: com 30 min, os programas com um dia acima do tempo vão de 42% a 71,3%, o que pede o ajuste de 30 min da frente A junto.

### 2.2 A matriz

Valor: **alto** (corrige algo errado ou abre um uso que o Gustavo pediu), **médio** (melhora o que já funciona), **baixo**. Esforço em dias de uma sessão como esta. Selo: o da regra que sustenta a mudança. "Estado" diz se mexe no que fica guardado no celular (`src/storage/`, hoje versão 7). ★ marca a minha recomendação para agora; ☆, para depois; sem marca, não recomendo agora.

| # | Opção (frente) | Valor | Esforço | Evidência (selo) | Risco | Estado | Dependência e choque | Rec. |
|---|---|---|---|---|---|---|---|---|
| 1 | **Corrigir o registro**: gravar a dor na série; treino sem série não conta nem anda a rotação; descartar ou apagar um treino (C, opção B) | **alto** (segurança: liga 2 regras com aviso de avaliação) | 2 | regras de segurança já aprovadas (`seguranca.dor.escala`, consenso) | baixo; mais avisos e semanas leves no R3, que é o esperado | nada (o campo existe) | nenhuma; desejável durante o R3 (o export passa a ter a dor) | ★ |
| 2 | **4 correções da progressão + leitura do export** (D, opção 1) | **alto** (falhas de lógica no 1º e 2º mês) | 1,5 | `progressao.calibracao`, `deload.semana-leve` (consenso) | baixo | nada (o "Agora não" por data, 7 dias) | o script do export é a medida do achado 11 e do F.2 que o backlog pede | ★ |
| 3 | **Ajustes pequenos do gerador** (A, pacote A) + **as 3 correções que o avaliador achou** (B) | médio | 1 + 1 | `tempo.musculo-protegido`, `volume.sessao.teto` (consenso); `selecao.*` | baixo; muda os snapshots da Ana e do Diego e 25% dos programas da grade | nada | o programa do Gustavo no R3 só muda se ele atualizar | ★ |
| 4 | **O avaliador, sozinho** (B, opção a), aplicado ao programa salvo e usado como régua nos testes e na auditoria | **alto** (é a base do "monte o seu") | 2–3 | regras de volume e frequência (robusta a consenso); 2 regras novas: empurrar × puxar (consenso, limiar a decidir) e frente × trás da coxa ([opinião]) | baixo | nada | exportar `prescrever` do gerador; a tela é pedido ao design | ★ |
| 5 | **Textos do porquê e avisos com o próximo passo** (C, opção A) | médio-alto (confiança; cumpre `acompanhamento.mensagens`) | 2–3 | explicar o motivo: `deci1994` (um estudo), `ntoumanis2021` (moderada) | baixo; os textos mudam no meio do R3 | nada | junta bem com o avaliador (a saída dele vira os avisos do programa) | ★ |
| 6 | **Abrir para família e amigos**: foto exata e consentimento, termos, tela de erro com "Exportar", aviso de instalação e "última cópia", canal de problema, teto de gasto (E, P1–P6) | **alto** se for abrir; nenhum se não | 3,5–4,5 + advogado + 30 min do Gustavo | `lgpd`, `anpd2-2022` (consenso, norma) | baixo no código; o advogado não tem preço com fonte | nada (a data da cópia no `localStorage`) | as telas são do redesign (lote 3 da foto) | ★ |
| 7 | "Como ler o seu treino" para quem nunca treinou (E, B2) | médio | 0,5–1 | `rir.leitura` (moderada), `iniciante.fase-aprendizado` (consenso) | baixo | nada | tela do design | ★ (no marco de abrir) |
| 8 | Panturrilha no degrau de casa (A, pacote E) | médio (88,9% dos programas fora da academia) | 1 + tela | um estudo × 2 (`selecao.panturrilha-alongada`) | baixo; nota de segurança [opinião] | item novo no inventário: migração | as animações já existem | ☆ |
| 9 | 2º exercício para o prioritário + "escolha até 2" (A, pacote B; substitui a D-4 do backlog) | médio (quem tem foco; avançado) | 1,5 + tela | moderada (2º exercício); consenso (o dia) | médio (o exercício no dia errado) | nada | as prioridades ficam no cadastro (redesign, decisão 6) | ☆ |
| 10 | Alternativas quando não há outro equipamento; "usar sempre este"; prévia antes de "Atualizar" (C, opção C) | médio | 3–4 | `selecao.equivalencia` (muda: decisão do Gustavo) | médio (snapshots, critério 4) | nada | a folha "Trocar" é do redesign | ☆ |
| 11 | **Montar o próprio treino do zero**, com edição (B, opção c) | **alto** para quem já treina e tem programa (o público que o Gustavo escolheu) | +6 a 10 depois do avaliador | sem estudo que compare programa montado pela pessoa com prescrito (B, seção 3); motivação autônoma, `teixeira2012` (moderada) | médio-alto (a pessoa pode montar algo sem sentido: o avaliador orienta; só segurança bloqueia) | **versão nova com migração** (`origem`, `base`, `anterior`) | depende do 4; "Atualizar" nunca apaga um programa editado; tela nova do design | ☆ (depois do 4, quando for abrir para quem já treina) |
| 12 | Gatilhos da semana leve e do "estagnado" pelo dado real; recalibrar quando a faixa muda; revisão do nível oferecida aos ~6 meses (D, opção 2) | médio (aparece no mês 6 ou numa troca de objetivo) | 2,5 | consenso (`nivel.revisao` nova) | médio | versão nova | o export do R3 | ☆ (depois do R3) |
| 13 | Usar o tempo que sobra para todos (A, pacote C; backlog E-c) | baixo-médio | 1 | contradiz o texto aprovado em 06/11 ("foco com manutenção", D-1) | alto em produto (dilui o foco) | nada | decisão de produto do Gustavo | — |
| 14 | Variação por blocos (A, pacote D; D, opção 3) | baixo (sem ganho de músculo, moderada; ganho só na academia) | 3–4 | moderada (empate) | médio (11 a 14% das séries recalibram; mais exercícios sem guia) | versão nova | depois do R3, só se o uso mostrar tédio ou platô | — |
| 15 | Ler um programa de fora por IA (B, opção d) | médio para quem já treina | +3 a 5 depois do 11 | — (a IA só transcreve; a avaliação continua das regras) | alto (custo ~US$ 0,05 a 0,10 por programa, estimativa; privacidade; erro de leitura) | nada além do 11 | o Gustavo decidiu "depois" | — |
| 16 | Limite compartilhado da visão (E, B1) | baixo com 10 a 30 pessoas e o teto de gasto feito | 0,5–1 | — | baixo | nada | Upstash grátis (`upstash-preco`) | ☆ |
| 17 | Dívida de fontes, dependências (zod 4, react-router 7), testes de propriedade (E, B4–B6) | médio (base) | 0,5–4 | — | baixo; zod e router conflitam com o redesign em curso | nada | depois do lote do redesign | ☆ |
| 18 | Eval da foto com fotos reais (E, B3) | médio (critério 3) | 0,5 + 15 min do Gustavo | — | baixo | nada | é do R3 | ☆ (no R3) |
| 19 | PAR-Q+ oficial e revisão por um CREF (E, B8) | médio-alto se abrir a outras pessoas | — | — | custo a orçar | nada | estava "de lado" (01/11); abrir a outras pessoas é um motivo novo para reconsiderar [opinião] | decisão do Gustavo |
| 20 | Pedidos do redesign ao domínio (proposta, seção 8): dias planejados (v8), marcas por sessão, resumo curto da sugestão, `restricoes` ausente vazia | médio (é o redesign que agenda) | — | — | baixo | o dos dias planejados pede a **v8** | **coordenar a v8 uma vez só**: as opções 8, 11, 12 e 14 também pedem versão nova | do redesign |
| 21 | **Corpo livre e casa: 7 exercícios novos** (extensão de tríceps, flexão com os pés elevados, rosca sem carga, abertura em T, panturrilha no degrau, afundo para trás, abdominal invertido) e degraus novos no fim das escadas (F; inclui a 8) | **alto** para quem treina sem nada (é o público do teste do Gustavo) | ~4 + 7 cartões textuais | um estudo a consenso, por exercício (`16-corpo-livre-e-casa.md`); a rosca sem carga só com o texto completo de `counts2016` | médio: com 30 min, mais dias passam do tempo (42% → 71,3%); a rosca sem carga é um estudo só | a carga `sem-carga` pode mudar o registro da série (conferir; se pedir versão nova, junta com a v8); o degrau como item de cadastro pede migração | o ajuste de 30 min da opção 3 no mesmo marco; snapshots de Ana, Diego, Elisa e Fábio | ★ |

Fora da matriz, porque as frentes mediram e não recomendam: C.5 (o ombro de trás sai em 273 programas de 45 min), B.17 e B.9 ([opinião]), B.14 (um estudo sem controle), B.4 (sem ganho de volume, risco não estudado), D-5 (+1,1 ponto de foco), a D-4 como escrita (0,08% dos casos). Detalhes em `a-qualidade.md`, seção 5.

### 2.3 Qual parte desenvolver mais, e por quê

**A minha recomendação: primeiro deixar o app confiável no uso de todo dia, depois dar variedade de verdade a quem treina sem equipamento, depois construir o avaliador (que vira o "monte o seu"), e só então abrir para família e amigos.**

- **(Rodada extra, 06/11) O corpo livre é a parte do gerador mais fraca, e a que o Gustavo sentiu no teste.** Não é falta de regra: é a biblioteca, com 3 exercícios de superiores possíveis sem nada. Com 7 exercícios novos, todos com o selo dito e sem objeto como carga, o caso dele passa de 5 a 6 exercícios por dia (46 a 56 min) para 7 a 8 (60 min), com o bíceps e o ombro de trás saindo do zero. Ele vem logo depois do R5a porque usa o ajuste de 30 minutos que o R5a traz; se o Gustavo preferir começar por ele, o ajuste de 30 minutos vai junto.

- **O que mais vale agora não é uma função nova, é consertar o que hoje engana a pessoa sem ela perceber.** A dor que não fica guardada é de segurança; a calibração sem fim e a oferta que volta a cada treino aparecem no 1º mês; o treino vazio pula o dia. Todos estão medidos, custam pouco, não mudam o estado guardado e melhoram o dado do próprio R3 (o export do Gustavo passa a ter a dor e os treinos reais).
- **Das frentes que o Gustavo citou, a que mais rende é o avaliador.** Ele é a base do "monte o seu treino" (sem ele, montar é só uma planilha), já mostrou 3 defeitos reais do gerador e passa a medir a qualidade de qualquer programa, inclusive os do gerador, nos testes. Custa 2 a 3 dias porque quase tudo já existe no domínio.
- **A variação entre semanas e as combinações por dia estão em bom estado onde há equipamento** (no corpo livre, ver acima). As combinações seguem a pesquisa (`14-combinacoes-por-dia.md`); a monotonia cai com um ajuste de 1 dia; e a variação por blocos não tem ganho de músculo (moderada), só ganho na academia, e mexe na progressão no meio do R3. Fica para depois do R3, se o uso pedir.
- **A experiência de uso** (o visual) é do redesign. O que esta sessão achou de função (registro, textos, trocas) entra nos marcos 1 e 2 e na lista de pedidos ao design.
- **A ordem entre o marco 2 e o 3 é escolha do Gustavo:** se ele quiser mandar o link para alguém antes do avaliador, o marco 3 vem primeiro, porque não depende dos outros.

### 2.4 Os marcos propostos, na ordem

Nenhum dos quatro deve mudar a versão do estado guardado (a v8 fica para ser decidida uma vez só, junto com a do redesign); o único ponto a conferir é a série sem carga do R5-CL. Os prompts estão em `docs/prompts/`. O R5-CL entrou depois da rodada extra de 06/11; a ordem recomendada é R5a, R5-CL, R5b, R5c.

| Marco | Entregáveis | Aceite (medido) | Esforço |
|---|---|---|---|
| **R5a O registro que não engana** (`sessao-r5a-registro-confiavel.md`) | Matriz 1, 2 e 3: a nota de dor gravada na série; o treino sem série não conta nem anda a rotação, com "Descartar este treino"; apagar ou corrigir o último treino; a calibração com saída; o "Agora não" que dura 7 dias; nem semana leve nem "estagnado" na fase de aprendizado; a estagnação pelo exercício feito na vaga; o script que lê um export (o Gustavo roda no aparelho); os ajustes pequenos do gerador (30 min, um nível abaixo antes de repetir em todos os dias, o pike no Corpo todo 6x) e as 3 correções que o avaliador achou | Nas 6 personas por e2e: a nota de dor de 3 a 5 aparece na série guardada e reduz a carga da próxima; "Começar" + "Terminar" sem série mantém o mesmo dia. No simulador da frente D: 0 corrida com mais de 3 sessões só de calibração; a oferta recusada volta no máximo 1 vez por semana; 0 semana leve na fase de aprendizado. Na grade: dias de 30 min acima do tempo ≤ 50%; o mesmo exercício em todos os dias ≤ 20% na grade reduzida; 0 dia com mais de 10 séries de um músculo, contando as indiretas; glúteo com extensão de quadril em todo programa em que a ponte é possível. `npm run check`, `test:e2e`, `auditoria:verificar` limpos; snapshots revisados pelo Gustavo | 4–5 dias |
| **R5-CL Corpo livre e casa** (`sessao-r5-corpo-livre.md`) | Matriz 21: os 7 exercícios novos com cartão textual (sem animação) e a montagem segura; as funções e as regras em `regras.md`; a carga `sem-carga` para a rosca sem carga (só depois de ler o texto completo de `counts2016`); os degraus novos só no fim das escadas (o arqueiro na flexão, a cadeira no agachamento); o texto novo do aviso das costas; decidir se o degrau é apoio ou item de cadastro | Na grade de corpo livre de `f-corpo-livre.md` (refeita como script versionado): com foco nos superiores, ≥ 5 exercícios diferentes de superiores por semana e ≥ 5 exercícios por dia com 60 min; o mesmo exercício em todos os dias ≤ 35%; dias com até 4 exercícios (45 min ou mais) ≤ 20%; bíceps a zero ≤ 1% (se a rosca sem carga entrar) e ombro de trás a zero ≤ 15%; com 30 min, dia acima do tempo ≤ 50% (com o ajuste do R5a); costas a zero continua com o aviso; Bruno e Carla iguais; snapshots de Ana, Diego, Elisa e Fábio revisados pelo Gustavo | ~4 dias + 7 cartões |
| **R5b O avaliador e o porquê** (`sessao-r5b-avaliador.md`) | Matriz 4 e 5: `src/domain/avaliador/`, puro e testado, que recebe qualquer programa com exercícios da biblioteca e devolve achados com `regraId`, selo e o que ajustar, ou "está bom"; aplicado ao programa salvo ("Como está o seu programa") e como teste de propriedade e coluna nova da auditoria; as regras novas em `regras.md` (empurrar × puxar, com o limiar decidido pelo Gustavo; frente × trás da coxa; a complexidade por nível com `regraId`); os avisos com o próximo passo e o porquê específico de cada exercício | O avaliador diz "está bom" ou só "limite do equipamento" em ≥ 80% dos programas da grade reduzida e encontra 0 problema de segurança neles; nos 4 programas publicados de `b-monte-e-avaliador.md`, reproduz os achados do protótipo; 20 de 20 avisos do programa com "fato + próximo passo"; porquê específico em ≥ 90% dos exercícios das 6 personas; a tela segue o pedido ao design | 4–6 dias |
| **R5c Abrir para família e amigos** (`sessao-r5c-abrir-familia.md`) | Matriz 6 e 7: o texto exato da foto, com a regra `privacidade.foto` e a caixa de consentimento antes do 1º envio; a página de termos e privacidade (rascunho para o advogado); a tela de erro com "Exportar meus dados", "Avisar um problema" e a versão; o aviso de instalar no iPhone; "última cópia há N dias"; o aviso quando o navegador nega o armazenamento persistente; o canal de problema; "Como ler o seu treino"; com o Gustavo: o teto de gasto e um convite por pessoa | e2e: um erro forçado numa tela mostra a saída e o export funciona dali; a caixa de consentimento aparece antes do 1º envio e não depois; "última cópia" aparece em Meus dados; 0 tela com "não fica guardada no servidor" sem dizer para onde a foto vai. O Gustavo confirma o teto de gasto e a revisão do advogado no devlog | 4–5 dias + advogado |

Depois dos quatro, na ordem que o uso indicar: o **"monte o seu treino" do zero** (matriz 11, com a v8 coordenada), o 2º exercício do prioritário (9), as trocas e a prévia (10), e, depois do R3, os gatilhos pelo dado real (12).

### 2.5 Pedidos à sessão de design

Só tela, em texto. O motivo medido está no relatório citado. Os que encostam numa decisão do redesign dizem qual.

**Para o R5a**
1. **A dor registrada aparece na série** ("dor 4 registrada nesta série") e volta no fim do treino e na próxima vez (C-1). Encaixa na folha do "Senti algo" (item `folhas`), sem mudar os textos de segurança.
2. **Fim do treino com exercício interrompido**: "Interrompido: búlgaro (dor aguda)" e o lembrete de avaliação, antes de "Para a próxima vez" (C-2; hoje 6 de 6 sugerem o exercício interrompido sem citar a dor). Encaixa no item `fim`.
3. **Terminar sem nenhuma série**: a confirmação do item `terminar` ganha "Descartar este treino / Guardar mesmo assim" (C-3).
4. **Corrigir uma série ou apagar um treino** na Semana e na Evolução, com confirmação (C-6). Tela nova.
5. **A semana leve recusada vira uma linha discreta em "A sua semana"**, não um cartão no início a cada treino (D-1). Ajuda a regra "1 oferta por abertura" do redesign.
6. **Fim da calibração**: uma frase curta quando o app decide a carga (D-3).

**Para o R5b**
7. **"Como está o seu programa"**: em 1 linha "Está bom: nada a ajustar", ou os achados agrupados por tipo (segurança, ajustar, limites) com as superfícies "alerta", "aviso" e "informação" do redesign; a tabela por músculo recolhida (B-1, B-2; esboço em `b-monte-e-avaliador.md`).
8. **A folha do exercício começa pelo porquê específico**, com os genéricos recolhidos (C-8).
9. **A Semana separa a meta do programa**: "Quadríceps 2 de 6 (o seu programa planeja 6 de 8: falta tempo)" (C-7). Encaixa no item `semana`.
10. **"Estagnado" com uma saída por vez** e "Outras opções" recolhidas (D-2).

**Para o R5c**
11. **Caixa de consentimento na tela da foto** (lote 3 do redesign), com "para onde vai" em uma linha (E-4).
12. **Tela de erro** com "Exportar meus dados", "Avisar um problema", "Tentar de novo" e a versão (E-3).
13. **Aviso de instalar no iPhone**, uma vez, só fora da tela de início (E-1).
14. **"Última cópia: há N dias"** em Meus dados e um lembrete no início que nunca cubra "Começar" (E-2).
15. **Link para os termos** nas boas-vindas e em Meus dados (E-5).
16. **"Como ler o seu treino"**: uma folha antes do 1º treino ou no 1º toque em "RIR" (E-6).
17. **Ícone do iPhone** (`apple-touch-icon` 180 px) no lote 5 (E-7).

**Para o R5-CL** (`f-corpo-livre.md`, pedidos ao design)
- **Cartões textuais dos 7 exercícios novos**, com a montagem segura: a mão no corrimão no degrau; a cadeira encostada na parede para os pés elevados; a testa sobre uma toalha dobrada na abertura em T.
- **Registro de série sem carga** (a rosca sem carga): só repetições e esforço, sem o campo de carga.
- **O aviso das costas sem equipamento** com o texto novo: o que falta, por que não há substituto honesto e o que resolve.
- **Se o degrau virar item de cadastro:** uma linha "Degrau de escada ou soleira firme" na lista de casa (o mesmo pedido A-2).

**Para depois** (só se o marco vier): o editor e o "Atualizar" que nunca apaga um programa editado (B-3, B-4); a prévia do que muda antes de "Atualizar" e na escolha da divisão (C-4, C-5); "usar sempre este" na folha "Trocar" (C-9); "escolha até 2" nas prioridades (A-1); o degrau na lista de casa (A-2); a oferta de bloco novo e de revisão do nível (A-3, D-4, D-5, D-6).

**Um choque a registrar, sem decisão minha:** o redesign reservou a **versão 8 do estado** para os dias planejados. O "monte o seu" (11), os gatilhos pelo dado real (12), a variação por blocos (14) e o degrau (8) também pedem versão nova. Proposta: juntar tudo o que for entrar numa versão só, decidida quando o 1º desses marcos vier. Os três marcos propostos não mexem no estado.

### 2.6 O que fica para depois, e por quê

- **Variação por blocos** (14): sem ganho de músculo (moderada), ganho de variedade só na academia, custo medido de recalibração e mexe na progressão no meio do R3. Reabrir se o uso mostrar tédio ou platô.
- **Usar todo o tempo que sobra** (13): contradiz o "foco com manutenção" aprovado em 06/11. É decisão de produto; o efeito está medido em `a-qualidade.md` se o Gustavo quiser.
- **Gatilhos pelo dado real e revisão do nível** (12): os números dependem do export do R3, e a revisão do nível só aparece no 6º mês.
- **Ler um programa por IA** (15): o Gustavo decidiu "depois", e ela só faz sentido depois do "monte o seu".
- **Dependências e testes** (17): esperar o lote técnico do redesign, que mexe nos mesmos arquivos.
- **Animações e Boneco**: a fila (A, C, B, D, E), a rodada com o especialista e o R4 D.3 seguem com a sessão de design e o R5 de animação; nada aqui muda essa ordem.
- **Um achado lateral, não conferido:** a frente C viu a faixa "Há uma versão nova do seu programa" para o Bruno e a Carla sem razão aparente, ao semear o inventário sem passar pelo zod; o redesign registra a mesma faixa (`medidas.md`). Provavelmente é um artefato do estado semeado; vale uma checagem rápida no R5a.
