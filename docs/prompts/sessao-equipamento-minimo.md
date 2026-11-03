# Prompt: treino com equipamento mínimo (nada, ou um aparelho só)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 03/11/2026, depois das três sessões de revisão (auditoria do treino → anatomia → design), a partir de uma
> falha que o Gustavo viu no uso: **quem treina sem nada, ou só com um aparelho, recebe um programa pior do que deveria.**
> A auditoria de 02/11 mediu o caso e o mandou para o backlog (achados 6 e 8). Esta sessão o trata como tema próprio.
> O Gustavo revisa este prompt antes de usar.

---

<contexto>
Você vai conduzir a **sessão de equipamento mínimo** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco"). O dono é o Gustavo. Ele não é programador nem da área de exercício, anatomia ou design: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

O seu papel é o de um **pesquisador e revisor independente para o cenário de equipamento mínimo**: a pessoa que não tem nada (treina no quarto, na sala, no hotel), ou que tem **um aparelho só** (uma barra fixa de porta, um par de halteres, um elástico, um kettlebell, uma fita de suspensão, uma bola, um step, um banco). A meta é que o programa desse cenário seja **tão bem fundamentado, tão seguro e tão bem guiado** quanto o da academia completa, dentro do que a evidência permite. Onde a evidência não permitir, o app precisa dizer isso com clareza, nunca fingir que o treino está completo.

**Onde o projeto está (03/11/2026)**
- Tudo até a reformulação visual está na `main` (ver `docs/devlog.md`, da auditoria do treino em diante): M0 a M5, R0b, R0c, R1, R1b, R2, R4, a auditoria do treino, a revisão de anatomia e a revisão de design. A pesquisa v2 (`docs/pesquisa-v2/`) está aprovada e prevalece sobre a v1 onde houver conflito.
- **O R3 (uso real) está em andamento noutra sessão:** o Gustavo treina 4 semanas só com o app (02/11 a 29/11), no branch `r3-uso-real`. **Não mexa nesse branch.**
- **A base:**
  - **106 exercícios** em `src/domain/biblioteca/exercicios.json` (schema zod em `src/domain/biblioteca/index.ts`): `padrao`, `musculos`, `requer` (capacidades), `complexidade`, `faixaReps`, `articulacoes`, `carga`, `animacaoId`. 31 têm animação, 38 têm cartão de texto, 37 não têm guia nenhum (a frequência de cada um está em `docs/revisoes/auditoria/inventario.md`).
  - **46 equipamentos** em `src/domain/taxonomia/equipamentos.ts`. O gerador trata o equipamento **por capacidade** (`capacidades(inv)`): o peso do corpo é a capacidade `apoio`, que sempre existe ("parede, porta, cadeira"). **Não existe item "peso do corpo" nem "nenhum"**: "nada" é o inventário vazio `{}`. Os 3 atalhos da tela (`taxonomia/atalhos.ts`) são casa, condomínio e academia; **não há atalho "sem equipamento"**. No cadastro (`src/features/onboarding/Inventario.tsx`), o único sinal é o texto de ajuda "Sem nada marcado, o programa usa o peso do corpo".
  - **As funções** (as "vagas" que o gerador preenche) em `src/domain/gerador/funcoes.json` e `funcoes.ts`: 22 funções, cada uma com níveis de preferência. Quando nenhum exercício do inventário atende a função, `resolver(vaga)` devolve nulo e **a vaga some do dia sem aviso próprio** (`src/domain/gerador/index.ts`, por volta das linhas 172 e 248). Só 3 funções têm o campo `lacuna` (extensora, abdução, panturrilha sentada), e só uma tem `seNada` (flexão de joelho → dobrar o quadril). A falta aparece depois, por músculo, em `avisosDeMeta` ("costas 0 de 6 séries, porque nenhum exercício possível com o seu equipamento"). O aviso `equipamento.sem-puxada-vertical` só dispara se a puxada caiu para o nível 2; **sem nenhuma puxada, ele não aparece**.
  - **A progressão sem kg** usa uma escada única de 4 degraus para tudo (`ESCADA_PESO_CORPO` em `src/domain/progressao/index.ts`: mais repetições → descida de 3 s → variação mais difícil → carga externa), que não usa a escada da flexão já aprovada (`equipamento.flexao-por-supino`) nem o número de intensidades do elástico. Na auditoria, a flexão e a remada com elástico ficaram **16 semanas sem subir** no modelo (achado 8).
  - **As regras com selo e fonte** em `docs/pesquisa/regras.md` (gera `src/domain/regras/regras.json` com `node scripts/gerar-regras.mjs`; a sincronia é testada em `tests/repo/regras-sync.test.ts`), as fontes em `docs/pesquisa/fontes.md` (o formato é exigido por `tests/repo/pesquisa.test.ts`) e o método dos selos em `docs/pesquisa/00-metodo.md`.
  - **As personas fictícias** em `tests/personas/index.ts`: Ana (halteres e banco), Bruno (prédio com polia), Carla (academia completa), Diego (elásticos e barra fixa de porta) e o 2º local do Bruno. **Nenhuma persona treina sem equipamento nem com um aparelho só.** Os testes de propriedade de `tests/unit/gerador.test.ts` só varrem os inventários dessas 4 personas.
  - **O teste de estresse** da auditoria (`npm run auditoria`; `scripts/auditoria/cenarios.ts`, `estresse.ts`, `progressao.ts`, `base.ts`) já tem os cenários `peso-corpo` (`{}`), `elasticos` e `halteres`, mas não os outros 43 itens isolados nem os pares comuns em casa. A saída fica em `docs/revisoes/auditoria/`.
- **O guia:** o app **não usa vídeo**. O guia é o Boneco, desenhado pelo motor em `src/engine/` (SVG a partir de poses, sem React). Uma animação é um módulo `src/engine/exercicios/<id>.ts`; o texto fica separado em `src/conteudo/exercicios/<id>.json`. Exercício sem animação aprovada aparece como **cartão de texto**, escrito a partir de uma ficha de técnica em `docs/pesquisa/animacoes/<id>.md`. O processo de uma animação nova está em `docs/pesquisa/animacoes/README.md` (ficha → poses → folha de contatos com `ik=0` → aprovação do Gustavo → linha de base). Vídeos do YouTube "servem só como referência visual de movimento, nunca como fonte de regra" (`docs/pesquisa/09-decisoes-m3.md`).
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo, sem profissional de Educação Física por agora, mas o app precisa funcionar para quem tem menos do que ele;
  - ficam fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada; o Boneco só muda com a aprovação dele, folha a folha;
  - nada vem pré-marcado, e nada muda no programa sem a escolha da pessoa;
  - a restrição de fluxo sanguíneo (BFR) nunca é prescrita (`equipamento.bfr`);
  - a fila das animações aprovada em 01/11 (família P → máquina de perna → elástico → …; `docs/pesquisa-v2/08-equipamentos-v2.md`, seção 6) pode ser **reavaliada só para o que esta sessão acrescentar**, e a decisão é dele;
  - fora do MVP: nutrição, login e nuvem, pagamentos, app nativo, social, relógios, outros objetivos, treinador humano, cardio prescrito e deload automático (`CLAUDE.md`).
</contexto>

<o_que_ja_se_sabe>
Tudo abaixo foi **medido** com dados fictícios e pode ser refeito com `npm run auditoria`. Reconfira antes de confiar: os números são de 02/11/2026.

1. **Com o inventário vazio, só 7 exercícios são possíveis** (`docs/revisoes/auditoria/estresse.md`, "exercícios possíveis"): flexão, agachamento, afundo, búlgaro (complexidade 2), ponte de glúteo, panturrilha no chão e abdominal no chão. **Nenhum é de puxar, de posteriores da coxa, de ombro ou de braço.**
2. **14 das 22 funções ficam sem opção** (`estresse.md`, "funções sem opção"): crucifixo, puxar vertical, puxar horizontal, empurrar vertical, elevação lateral, ombro posterior, bíceps, os dois de tríceps, extensora, flexão de joelho, dobrar o quadril, abdução, adução e panturrilha sentada. Empurrar horizontal, agachar e extensão de quadril dependem de **um exercício só**.
3. **Volume médio por músculo no cenário `peso-corpo`** (`estresse.md`, tabela do volume): peito 5,1 séries; **costas, ombro lateral, ombro posterior, bíceps e posteriores: 0**; tríceps 2,6 (só séries indiretas da flexão); quadríceps 6,2; glúteos 8,1; panturrilha 7,5; abdômen 4,3. **100% dos programas** ficam abaixo da meta nesses cinco músculos.
4. **Exemplo real** (`estresse.md`, `equilibrio.sem-puxar` e `volume.zero.costas`): peso do corpo · iniciante · Corpo todo A/B · 20 min: A = agachamento 2, flexão 2, panturrilha no chão 4; B = afundo 2, flexão 2, abdominal 4. Quatro séries de empurrar e nenhuma de puxar na semana.
5. **Por músculo, em `docs/revisoes/auditoria/cobertura.md`:** `peso-corpo` tem 1 exercício de peito, 0 de costas, 0 de ombro, 0 de bíceps, 0 de tríceps, 3 de quadríceps, 0 de posteriores, 1 de glúteos, 1 de panturrilha, 1 de abdômen. Com **um aparelho só**: barra fixa abre 10 exercícios (costas e abdômen pendurado); halteres sem banco, 21; elásticos, 19; suspensão, kettlebell, paralelas e bola, 8 cada (um exercício a mais que o vazio). A remada invertida pede `barra_baixa` (rack ou smith), embora `docs/pesquisa/05-equipamento-limitado.md` cite "mesa robusta".
6. **Guia:** no diagnóstico de 01/11 (`docs/planejamento/2026-11-diagnostico.md`, seção 5), **45% das aparições de exercício ficam sem animação** só com o peso do corpo, e **70%** no inventário do Diego (elásticos e barra fixa). É o cenário com menos guia do app.
7. **O que a pesquisa já diz** (`docs/pesquisa/05-equipamento-limitado.md`, v1, e `pesquisa-v2/04`, `08`, `09`): carga baixa até perto da falha cresce o músculo como carga alta (robusta); flexão ≈ supino com esforço equiparado (um estudo); elástico dá força comparável, hipertrofia é inferência (moderada para força); sem puxada vertical, remadas mantêm o volume de costas com evidência fraca para o latíssimo; o equipamento não decide o crescimento (robusta). **Lacunas registradas:** nenhum estudo de hipertrofia com calistenia de longo prazo em treinados ou mulheres, nem com suspensão; nenhum dado de hipertrofia com pullover ou puxada com elástico; pausas e 1,5 repetição sem ensaio.
8. **Decisões anteriores sobre o tema:** achado 6 da auditoria (entraram 4 exercícios só com halteres; o nórdico e opções sem máquina para o reto femoral ficaram "para depois") e achado 8 (escada por exercício no peso do corpo e no elástico: **backlog, R5**). `docs/backlog.md`, seção "Da auditoria do treino".
</o_que_ja_se_sabe>

<tarefa>
Conduzir a sessão em cinco partes. O aceite é: **o Gustavo decide, item a item, o que entra, o que vai para o backlog e o que fica como está.** Nada muda no programa, nos dados, nos snapshots ou no Boneco antes dessa decisão.

**Parte A: o mapa do cenário mínimo (medido, por script, reproduzível)**
1. Estender `scripts/auditoria/cenarios.ts` (ou um script novo em `scripts/auditoria/`, ligado ao `npm run auditoria`) com: o inventário vazio; **cada um dos 46 itens sozinho**, com atributos fictícios típicos (halteres de um par só, elástico de uma intensidade só, kettlebell de um peso só, polia simples fixa…); e os pares mais prováveis em casa (barra fixa de porta + elásticos, halteres + bola, suspensão + elásticos, banco só + halteres leves, step + elásticos). Variar nível, dias (2 a 6), minutos (20 a 150), dor por região e prioridade, como a grade da auditoria. Determinístico: duas rodadas geram arquivos idênticos. Saída em `docs/revisoes/equipamento-minimo/`.
2. Medir e mostrar, com números:
   - **cobertura:** por músculo e por função, quantos exercícios existem, quais vagas ficam com uma opção ou nenhuma, e quais músculos ficam com 0 série na semana;
   - **o que o app diz:** em cada vaga sem opção, aparece aviso por vaga, só por músculo, ou nada? O motivo é verdadeiro ("nenhum exercício possível com o seu equipamento") e diz **o que compraria mais volume** (uma barra de porta, um elástico)?
   - **equilíbrio:** empurrar × puxar, joelho × quadril, por programa;
   - **tempo:** dias de 20 e 30 min com 3 exercícios de peso do corpo (sobra tempo? o app propõe mais séries ou mais exercícios?);
   - **progressão:** o "praticante simulado" de `scripts/auditoria/progressao.ts` por 16 semanas com a escada genérica, exercício por exercício (flexão, agachamento, afundo, búlgaro, ponte, panturrilha, abdominal, e os de um aparelho só): quantas semanas até subir de degrau, e onde trava;
   - **guia:** proporção das prescrições sem animação e sem cartão, por cenário;
   - **segurança:** com dor no joelho, no punho, no ombro ou na lombar, o que sobra no cenário vazio, e se o dia fica vazio ou só com abdominal.
3. Para cada problema, **3 exemplos concretos** (inventário, programa gerado e o que está errado), no formato de `docs/revisoes/auditoria/estresse.md`.

**Parte B: pesquisa aprofundada (perguntas fechadas, com selo e fonte)**
No método de `docs/pesquisa-v2/PLANO-DOS-TEMAS.md`: perguntas fechadas → buscas registradas (`scripts/pesquisa/pubmed.py s <termos>` e `a <PMIDs>`; se a rede bloquear, registre e use o que der para ler) → hierarquia das fontes → nível de leitura → **selo por número, não por tema** → entregável. As perguntas:
1. **Hipertrofia só com o peso do corpo.** O que existe de ensaio e de meta-análise sobre calistenia e treino sem carga externa (flexão, agachamento, afundo, búlgaro), em treinados e não treinados, homens e mulheres: o que vale como robusta, moderada, um estudo ou consenso. Carga baixa até perto da falha (`schoenfeld2017b`, `lopez2021`) já é robusta; o que falta é saber **até onde o peso do corpo chega** (teto de repetições, alavanca, unilateral, excêntrica lenta) antes de a progressão parar.
2. **Puxar sem equipamento.** O que existe de verdade: remada invertida na mesa (que mesa aguenta?), na porta com toalha ou lençol, remada com objeto doméstico (mochila, galão), "superman" e variações. O que a literatura sustenta para costas e para o latíssimo. Diga com clareza **o que não dá para resolver sem um ponto de ancoragem** e qual item o app deve recomendar comprar primeiro (barra fixa de porta, elástico, fita de suspensão), com **o volume que cada ausência custa** (séries de costas, de bíceps, de ombro posterior por semana).
3. **Posteriores da coxa e glúteo sem carga.** Nórdico (há um estudo citado na auditoria, `morin2025`, mas exige técnica e ancoragem dos pés), stiff unilateral sem peso, ponte unilateral, flexão de joelho deslizante (toalha no chão liso), ponte com os pés elevados numa cadeira. Selo de cada um e risco (joelho e posteriores no nórdico).
4. **Ombro e braços sem carga.** Pike push-up e variações elevadas (ombro anterior), flexão fechada ou diamante (tríceps), mergulho no banco ou na cadeira (ombro: `selecao.mergulho` já limita o mergulho nas paralelas), elevação lateral e rosca com objeto doméstico. Onde a evidência é só consenso, diga.
5. **Com um aparelho só**, aparelho por aparelho (barra fixa, elásticos, halteres sem banco, kettlebell, suspensão, paralelas, bola suíça, step, banco só): o que o aparelho destrava, o que ainda falta, e **a escada de progressão própria** de cada exercício (achado 8 da auditoria: escada por exercício; elásticos por intensidade de 1 a N; a flexão pela escada já aprovada em `equipamento.flexao-por-supino`). Rever as faixas largas (8–20, 12–25, 15–30), com que a escada quase não anda.
6. **Segurança e triagem nesses exercícios:** joelho no búlgaro e no nórdico, punho na flexão, ombro no pike e no mergulho na cadeira, lombar no "superman", cadeira ou mesa que escorrega. O que entra em `articulacoes` (há um teste por padrão de movimento, `tests/unit/articulacoes.test.ts`) e na montagem segura do cartão (`seguranca.montagem`).
7. **Vídeos como referência visual.** Para cada exercício novo, 1 ou 2 vídeos de canais ou treinadores reconhecidos, registrados na ficha como **"referência visual de movimento, não fonte de regra"** (`09-decisoes-m3.md`). Eles ajudam a escrever as poses do Boneco e os erros comuns. **Nenhum vídeo entra no app.**

Para cada pergunta: o que a evidência diz (tabela Princípio / O que a evidência diz / Selo / Fontes, como em `pesquisa-v2/04`), o que fica sem resposta, e as buscas registradas. Resultado em `docs/pesquisa-v2/10-equipamento-minimo.md`, no formato dos temas da v2. Fonte não lida no original fica como não verificada; o que for opinião sua vem marcado **[opinião]**; "não achei estudo" é uma resposta válida e preferível a uma fonte inventada.

**Parte C: relatório e decisão**
1. `docs/revisoes/equipamento-minimo.md`: os achados **priorizados por gravidade × frequência** (gravidade alta: segurança ou o app prescreve ou ensina algo errado; média: o treino fica pior do que poderia; baixa: texto ou detalhe), cada um com o problema, os 3 exemplos, a evidência (selo e chave), a proposta e o esforço. Inclua **o que está bom**: a auditoria mostrou que o cenário é seguro e honesto (nenhum dia vazio, aviso em todo músculo abaixo da meta); diga onde isso continua valendo.
2. **A lista de exercícios novos propostos**, com, para cada um: função e nível em `funcoes.json`, músculos, `requer`, `articulacoes`, faixa de repetições, escada de progressão, selo, fonte e referência visual; e **o que cada um muda nos números** da Parte A (estimativa marcada como tal).
3. Uma seção nova na página **"Diagnóstico do treino-mvp"** ([link](https://claude.ai/artifact/CSoACEwQ4zikyku3WXCn3s)), visual e em linguagem simples, abaixo da seção mais recente. Leia a versão publicada logo antes de publicar, porque outras sessões também a atualizam. Nada de dado pessoal.
4. **Parada para a decisão do Gustavo**, item a item, com nada pré-marcado. As perguntas que só ele decide estão em `<perguntas_para_o_gustavo>`.

**Parte D: as correções aprovadas, num branch próprio (`equipamento-minimo`, a partir da `main`)**
- **Exercícios novos:** entrada em `exercicios.json` (`carga: "peso-corpo"`, `animacaoId: null`), posição nos níveis de `funcoes.json`, ficha em `docs/pesquisa/animacoes/<id>.md` (tabela Ponto / O que a animação mostra / Selo / Fonte; seção Músculos com selo; seção Fontes com o status de leitura), cartão em `src/conteudo/exercicios/<id>.json` validado por `src/conteudo/schema.ts`, fontes novas em `fontes.md` no formato exigido, e os testes de esquema passando (`tests/unit/dados-dominio.test.ts`).
- **Regras:** toda regra nova ou revista entra primeiro em `docs/pesquisa/regras.md`, com selo e fonte, e só então no código (`node scripts/gerar-regras.mjs`). Candidatas: aviso por vaga quando a função fica sem opção (hoje só 3 funções têm `lacuna`), `seNada` onde fizer sentido (puxar vertical → puxar horizontal, por exemplo), escada por exercício para peso do corpo e elástico (`progressao.incremento.peso-corporal`), recomendação de compra quando o inventário é vazio (se o Gustavo aprovar), e a `rir.carga-baixa` nesses exercícios.
- **Testes:** uma **persona nova sem equipamento** (ex.: "Elisa", iniciante, 3 dias de 30 min, só o peso do corpo) e uma **com um aparelho só** (ex.: "Fábio", intermediário, só uma barra fixa de porta), em `tests/personas/index.ts`, com snapshot revisado pelo Gustavo; um teste de propriedade em `gerador.test.ts` que varre `{}` e **cada item isolado** ("nenhum dia vazio; todo músculo que tem exercício possível recebe série; toda vaga sem opção tem aviso com motivo verdadeiro; nenhum exercício pede o que o inventário não tem"); e um e2e do caminho "não marco nada" no cadastro até o primeiro treino.
- **Antes e depois:** `npm run auditoria` antes e depois das correções, com a tabela antes × depois no relatório (como no fim de `auditoria-treino.md`). Os snapshots das personas atuais só mudam com a revisão do Gustavo, mostrando o antes e o depois.

**Parte E: as animações dos exercícios novos**
Pelo ritual de `docs/pesquisa/animacoes/README.md`: poses em `src/engine/exercicios/revisao/<id>.ts` (crie a pasta; `scripts/folha-animacao.mjs` procura nela primeiro), no mesmo formato das 31 existentes, no estilo do Boneco; `node scripts/folha-animacao.mjs <id> --estilo=a` com `ik=0` na animação e em cada erro; a **folha de contatos para o Gustavo**, uma a uma. Só com o ok dele: `node scripts/aprovar-animacao.mjs <animacao> <exercicio>`, regravar `novas.json` (`ATUALIZAR_NOVAS=1 npx playwright test --project=motor`) e `estilo-a.json` (`ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor estilo-a`). Até lá, o exercício aparece como cartão de texto. Os exercícios de peso do corpo são da família **P** (1 unidade cada: nada novo no motor), então cabem nesta sessão; os que pedem peça nova no motor (toalha na porta, mesa, cadeira) entram na fila com o custo estimado, e o Gustavo decide a ordem. **As 31 animações e a linha de base do Boneco não mudam.**

**Fica fora**
- O branch `r3-uso-real` e o acompanhamento do uso real.
- O visual do Boneco, a anatomia dos exercícios existentes e as telas (foram as três sessões anteriores).
- BFR (`equipamento.bfr`), nutrição, cardio e o resto do que o `CLAUDE.md` tira do MVP.
- Qualquer regra, número ou exercício sem selo e fonte.
- Qualquer mudança no programa, nos snapshots ou no Boneco sem o ok do Gustavo.

**Pronto quando**
- o mapa e o estresse do cenário mínimo estão versionados e ligados ao `npm run auditoria`, com os números em `docs/revisoes/equipamento-minimo/`;
- `docs/pesquisa-v2/10-equipamento-minimo.md` responde às 7 perguntas, com selos, fontes, lacunas e buscas registradas;
- o relatório e a seção da página estão prontos, e as decisões do Gustavo estão registradas no relatório;
- as correções aprovadas entraram com teste, as duas personas novas existem com snapshot aprovado, e o e2e do cadastro vazio passa;
- os exercícios aprovados têm ficha, cartão e, quando aprovada, animação na linha de base;
- `npm run check`, `npm run test:e2e` e `npm run auditoria` passam, e a tabela antes × depois está no relatório;
- o devlog está atualizado (o que mudou, uma imagem ou GIF do programa de quem não tem nada, rascunho de post), e a sessão parou para a revisão.
</tarefa>

<perguntas_para_o_gustavo>
Estas decisões são dele. Apresente cada uma com a evidência, o efeito medido e as opções, **sem nada pré-marcado**, na parada da Parte C.
1. **"Não tenho nada" vira um botão no cadastro?** Hoje é só um texto de ajuda. Um 4º atalho ("só o peso do corpo") deixaria a escolha explícita, como os outros 3 (`equipamento.atalhos`).
2. **O app pode sugerir comprar um item?** Se sim, qual primeiro (barra fixa de porta, elástico, suspensão) e com que texto, mostrando o volume que a ausência custa. A regra `equipamento.escada-carga-leve` já termina em "sugerir comprar carga"; o cenário vazio não tem equivalente.
3. **A remada invertida na mesa entra como exercício?** A literatura cita "mesa robusta", mas o app não vê a mesa. Opções: entrar com a montagem segura em destaque; entrar só como alternativa; não entrar.
4. **Exercícios com objeto doméstico** (mochila, galão de água) entram como carga? Ganham volume de costas e braços; não têm kg confiável nem estudo.
5. **A fila das animações muda?** Os exercícios de peso do corpo são baratos (família P) e cobrem o cenário com menos guia do app (45% a 70% sem animação), mas a fila aprovada em 01/11 põe a máquina de perna antes do elástico porque o público principal treina numa academia.
6. **Quem treina sem nada e é avançado:** o app diz com clareza que o peso do corpo tem teto para hipertrofia em treinados (se a pesquisa confirmar), ou monta o programa sem o aviso?
</perguntas_para_o_gustavo>

<exemplo_de_achado>
Formato de cada achado do relatório (o mesmo de `docs/revisoes/auditoria-treino.md`). Exemplo com um caso real, a confirmar na Parte A:

### N. Sem equipamento, a vaga de puxar some sem aviso e as costas ficam com 0 série
**Problema.** Com o inventário vazio, nenhum exercício atende "puxar vertical" nem "puxar horizontal". `resolver(vaga)` devolve nulo e a vaga some do dia (`src/domain/gerador/index.ts`, ~linha 248). Nenhuma das duas funções tem `lacuna`, então não há aviso por vaga; o aviso `equipamento.sem-puxada-vertical` não dispara porque não há puxada de nível 2; só o aviso por músculo aparece. A pessoa vê 4 séries de empurrar e nenhuma de puxar, sem saber o que resolveria isso.

**Exemplos** (`docs/revisoes/equipamento-minimo/estresse.md`, `equilibrio.sem-puxar`):
- vazio · iniciante · Corpo todo A/B · 20 min: A = agachamento 2, flexão 2, panturrilha 4; B = afundo 2, flexão 2, abdominal 4.
- vazio · intermediário · Superior/Inferior 2x · 60 min: Superior A e B só com flexão (2 variações) e abdominal.
- só bola suíça · iniciante · A/B/C · 45 min: idem, com a flexão na bola.

**Evidência.** consenso (`consenso-projeto`) para "a vaga sem opção precisa de aviso com motivo e saída"; robusta (`volume.semanal.dose-resposta`) para "0 série de costas na semana não cresce costas"; um estudo (`fenwick2009`, EMG) para a remada invertida como substituta da puxada, com a ressalva de que EMG não mede crescimento.

**Proposta.** (a) `lacuna` nas funções de puxar, com texto que diz o que falta e o que compraria mais volume; (b) 1 ou 2 exercícios de puxar sem equipamento, se a Parte B sustentar; (c) teste de propriedade: toda vaga sem opção tem aviso.

**Esforço.** Pequeno para (a) e (c); médio para (b), com ficha, cartão e animação.
</exemplo_de_achado>

<como_trabalhar>
1. **Leia primeiro:** `CLAUDE.md`, `docs/PLANO-MVP.md`, `docs/backlog.md`, `docs/devlog.md` (da auditoria do treino em diante), `docs/pesquisa/00-metodo.md`, `docs/pesquisa/05-equipamento-limitado.md`, `docs/pesquisa-v2/README.md`, `PLANO-DOS-TEMAS.md` e os temas `04`, `08` e `09`, `docs/pesquisa/regras.md`, `docs/revisoes/auditoria-treino.md` com `auditoria/cobertura.md` e `auditoria/estresse.md`, `docs/pesquisa/animacoes/README.md` e uma ficha pronta (ex.: `remada-unilateral.md`), `src/domain/gerador/index.ts`, `funcoes.json`, `src/domain/taxonomia/equipamentos.ts`, `src/domain/progressao/index.ts`, `scripts/auditoria/cenarios.ts` e `tests/personas/index.ts`.
2. **Plano antes de medir:** antes de rodar o estresse grande e antes das buscas, mostre ao Gustavo, em linguagem simples, o que vai medir, como, e as 7 perguntas da pesquisa. Pergunte só o que só ele pode decidir; o resto, decida e registre.
3. **Postura de auditor:** não confie numa conclusão anterior só porque foi aprovada; reconfira e aponte o que estiver fraco. Diga também o que está bom.
4. **Evidência:** toda afirmação técnica tem selo (robusta, moderada, um estudo ou consenso) e fonte. Nada de estudo inventado. Fonte não lida no original fica como não verificada. EMG mede ativação, não crescimento. "Ausência de estudo não é prova de que algo não funciona", mas também não vira regra com selo acima de consenso. O que for opinião sua, diga que é.
5. **Vídeo é referência visual, não fonte.** Registre o canal e o título na ficha; nunca cite vídeo como apoio de uma regra ou de um número.
6. **Precisão vale mais que quantidade** (`CLAUDE.md`): melhor 6 exercícios novos bem fundamentados e bem guiados do que 20 rasos. Um exercício que a evidência não sustenta, ou que não dá para guiar com segurança em texto, não entra.
7. **Determinismo e dados separados do código:** sem `Math.random` nem `Date.now` em `src/domain/`; exercícios, funções e regras ficam em dados validados com zod; a mesma entrada gera a mesma saída.
8. **Privacidade:** nada de `privado/` em arquivo versionado; os testes e as imagens usam as personas fictícias; `tests/repo/privacidade.test.ts` tem de continuar passando.
9. **Regressão:** as 31 animações e a linha de base do Boneco (`tests/visual/linha-de-base/estilo-a.json`) não mudam nesta sessão. Animação nova só entra no app depois da folha aprovada.
10. **Commits:** pequenos, em pt-BR e no imperativo, no branch `equipamento-minimo`, criado a partir da `main`. A `main` só recebe algo com o ok do Gustavo; antes, lembre-o de exportar os dados ("Meus dados" → "Guardar uma cópia"), porque ele está usando o app no R3.
11. **Ao fim:** atualize o devlog, anote em `docs/backlog.md` o que ficou para depois (com o motivo), e pare para a revisão.
</como_trabalhar>
