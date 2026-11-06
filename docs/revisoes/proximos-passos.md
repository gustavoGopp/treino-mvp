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

*(Escrita depois dos relatórios das cinco frentes.)*
