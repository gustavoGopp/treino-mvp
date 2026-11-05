# Prompt: redesign visual completo do treino-mvp, com uma equipe de agentes

> Para colar no início de uma nova sessão do Claude Code, **em modo plano**, com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 05/11/2026 a pedido do Gustavo. A sessão começa planejando (Fase 0), para em cada ponto de decisão e só
> implementa o que o Gustavo aprovar. Tudo abaixo desta linha é o prompt.

---

<contexto>
Você vai conduzir o **redesign visual completo** do **treino-mvp**, um web app (PWA, Vite + React + TypeScript, sem biblioteca de UI) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino na academia com um guia animado (o "Boneco"), temporizador de descanso e sugestões de progressão. O dono é o Gustavo. Ele não é programador nem designer: fala de produto e de experiência, prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

**Por que este redesign.** Em 03/11/2026 houve uma reformulação visual (a "v2": `docs/revisoes/design-v2.md`, entrada "Revisão de design e reformulação visual" no `docs/devlog.md`). Ela acertou em princípios (uma pergunta por tela, o botão principal embaixo, toques de 48 px, uma cor para ação) e resolveu medidas (0 toque pequeno, 0 contraste baixo). Mas foi uma reforma sobre a estrutura antiga, feita por uma sessão só, com tempo curto. O Gustavo quer agora o **melhor app possível para quem usa**, sem compromisso com nada do visual atual: a estrutura das telas, a navegação, as cores, a letra, os componentes e as transições podem ser 100% refeitos. O que vale é a experiência de uso, medida e com fonte.

**Onde o projeto está (leia antes de qualquer proposta)**
- `CLAUDE.md`: os princípios do projeto. Não são negociáveis e estão repetidos na seção "o que não muda".
- `docs/PLANO-MVP.md`, seção a: os critérios mensuráveis (cadastro em até 1 min e 15 toques; uso com uma mão; acessibilidade no Lighthouse ≥ 90).
- `docs/revisoes/design.md` e `docs/revisoes/design-v2.md`: as duas rodadas anteriores, com as medições, as fontes e o que ficou para depois. São **insumo, não limite**: aprenda com os números e com as fontes, e descarte o que não ajudar.
- `docs/devlog.md`: as entradas de 03/11 a 05/11 dizem o que entrou no app depois da v2 (legenda do Boneco, equipamento mínimo, catálogo, R4 do erro sobre o certo).
- `docs/backlog.md`: o que já foi decidido deixar de fora, para não propor de novo sem motivo novo.
- `src/features/`: as telas (onboarding, programa, treino, guia, acompanhamento, dados, locais). `src/features/app/ui.tsx` tem as peças comuns. `src/styles.css` (600 linhas) é todo o estilo.
- `src/storage/esquema.ts`: os 6 passos do cadastro (`PASSOS`) e o estado guardado no aparelho.
- `tests/e2e/`: os testes no navegador, no Pixel 7 e a 360 px, com os critérios de toque (`toque.ts`) e de contraste (`contraste.ts`). `scripts/design/`: capturas, medidas e o protótipo da v2.
- `tests/personas/index.ts`: as 6 personas fictícias (Ana, Bruno, Carla, Diego, Elisa e Fábio), do iniciante sem equipamento à avançada com academia completa, e o Bruno com 2 locais.
- `src/engine/`: o motor do Boneco, com 82 animações e a linha de base visual `tests/visual/linha-de-base/estilo-a.json`. **O desenho do Boneco não entra neste redesign.**

**Como as telas se encadeiam hoje.** Boas-vindas → triagem (PAR-Q+) → experiência → rotina → equipamento (lugar, lista ou foto) → confirmar → programa (início, com barra fixa Treino/Semana/Meus dados) → treino (uma série por vez, descanso, "Senti algo") → fim do treino → semana e evolução por exercício. O guia de cada exercício (`/guia/:id`) abre do programa e do treino. Rotas e componentes podem mudar; o estado guardado (`src/storage/`) só muda com migração e teste.
</contexto>

<missao>
Entregar, em duas etapas separadas por decisões do Gustavo:

1. **Uma proposta de redesign completa**, fundamentada e medida, com um sistema visual (letra, cor, espaço, componentes, movimento), um **protótipo navegável** de todas as telas no celular, nos temas claro e escuro, o antes e o depois em imagem, e uma tabela de decisões item a item.
2. **A implementação do que for aprovado**, em lotes pequenos, cada um com testes e medidas, sem quebrar os critérios do projeto.

O foco, na ordem: **(a)** a tela de treino e o guia, usados na academia, suados, com uma mão e de relance; **(b)** o cadastro, que precisa ser rápido e **parecer** rápido, para não desmotivar antes do primeiro treino; **(c)** o início, o fim do treino e a semana, que fazem a pessoa voltar; **(d)** o resto (meus dados, locais, evolução).
</missao>

<o_que_nao_muda>
Estas regras valem acima de qualquer proposta de design. Se uma ideia esbarrar numa delas, registre a ideia com o conflito e deixe a decisão para o Gustavo, em vez de contorná-la.
- **O Boneco:** `src/engine/` e a linha de base `estilo-a.json` não mudam. O palco pode mudar de moldura, tamanho, posição e controles em volta, e a paleta do app precisa conviver com as cores do Boneco (vermelho e laranja dos músculos, verde e azul das trajetórias, vermelho tracejado do erro). As cores internas do palco (`--stage`, `--fig`, `--mus-p`...) ficam como estão.
- **Evidência visível:** toda regra mostrada ao usuário mantém o selo (robusta, moderada, um estudo, consenso) e o caminho até a fonte. O selo pode ganhar outra forma, nunca sumir.
- **Segurança sempre à mão:** no treino, o caminho para "Senti algo" (dor, formigamento, tontura) fica visível sem rolar, em qualquer estado da tela. A montagem segura de um exercício nunca fica recolhida por padrão.
- **Privacidade (LGPD):** nada de `privado/` em arquivo versionado, captura ou protótipo; só as personas fictícias. Se propuser trocar a letra, considere que hoje ela vem do Google Fonts (um pedido externo por visita): a opção de servir a letra do próprio app conta como ponto positivo.
- **Uso na academia:** mobile-first, pt-BR, toque de 44 px no mínimo (48 é o piso de hoje; não regrida), `prefers-reduced-motion` respeitado, contraste da WCAG 2.2 (4,5:1 texto, 3:1 controle), nada que dependa só da cor (daltonismo), uma mão só, sem rolagem lateral a 360 px.
- **Gerador e domínio:** `src/domain/` não muda por causa do design. Se uma tela pedir um dado que o domínio não tem, registre como pedido ao domínio, com teste, para decisão separada.
- **Poucas dependências:** CSS e React puros. Uma biblioteca nova (de componentes, animação, ícones) só entra com justificativa medida (tamanho do bundle antes e depois) e aprovação do Gustavo.
- **Os critérios dos testes continuam:** os testes e2e podem mudar de seletor e de fluxo para acompanhar as telas novas, mas os critérios (toque, contraste, "Série feita" visível sem rolar, contagem de toques do cadastro, privacidade) ficam, e passam a cobrir todas as telas.
- **Motivação sem manipulação:** nada de sequência que "quebra", cobrança por falta, confete ou notificação de culpa. A posição do projeto está em `design-v2.md`, seção 2 ("Exercício e motivação"). Ela pode ser revista com evidência nova, mas a revisão é uma proposta ao Gustavo, não uma decisão sua.
</o_que_nao_muda>

<equipe>
Você é o **orquestrador e diretor de design**. Os outros papéis são **subagentes** que você lança com o Agent tool. Lance em paralelo os que não dependem um do outro. Cada briefing que você escrever para um subagente precisa ter: o objetivo em uma frase, o que já está decidido ou descartado (a seção "o que não muda" e as decisões do backlog), os arquivos e documentos que ele deve ler, o escopo exato (telas e perguntas), o formato de entrega e o pedido de marcar cada afirmação como **[medido]**, **[fonte]** (com selo e referência) ou **[opinião]**. Um subagente não recebe a sua hipótese para confirmar: recebe a pergunta e o material. Quando um agente terminar, o relatório dele vai para `docs/revisoes/redesign/<agente>.md`, e você só usa o que puder localizar no relatório.

**Agente 1: Retenção e motivação (o que faz a pessoa voltar).**
Pergunta: o que, nas telas de início, fim do treino, semana e evolução, faz a pessoa abrir o app no dia certo, começar o treino e sentir que progrediu, sem manipulação? Estude: as técnicas de mudança de comportamento com evidência em apps de atividade física (retorno sobre o desempenho, metas, autoeficácia, autonomia), o que a literatura diz sobre gamificação e o que o projeto já decidiu. Olhe os apps de referência que o Gustavo e o público conhecem (Strong, Hevy, Fitbod, Freeletics, Nike Training Club, Duolingo como contraste) e descreva o que cada um faz nessas telas, o que tem evidência e o que é só hábito de mercado. Entregue: os 5 momentos que mais importam para a volta (ex.: a primeira abertura depois do primeiro treino; a volta depois de faltar), uma proposta de tela ou componente para cada um, com rascunho em texto ou ASCII, e a lista do que **não** fazer, com motivo.

**Agente 2: Cadastro rápido, de verdade e na sensação.**
Pergunta: como o caminho da abertura até o primeiro programa fica o mais curto possível em toques e em tempo, e **parece** ainda mais curto a quem preenche? Meça o de hoje por script (Playwright, Pixel 7 e 360 px): toques, caracteres digitados, telas, alturas de rolagem, tempo de um robô e tempo estimado de uma pessoa (use o modelo KLM/GOMS, com fonte), para as 6 personas e para o caminho sem condição de saúde. Estude: percepção de tempo e de progresso (limites de resposta de 0,1 s, 1 s e 10 s; indicadores de progresso; gradiente de meta; progresso adiantado; "uma coisa por página" do GOV.UK; padrões e avanço automático; o custo de cada pergunta e quais podem sair ou ir para depois do primeiro treino). Avalie a tela de equipamento em separado: lugar, lista, foto; o que "academia completa" supõe; o que a foto promete e quanto demora. Entregue: o fluxo proposto tela a tela, com a contagem prevista de toques e a estimativa de tempo, a lista das perguntas que saem ou se movem (cada uma com o efeito no gerador, conferido em `src/domain/`), e as regras de "sensação de velocidade" que a implementação deve cumprir (resposta ao toque em menos de 100 ms, transição de no máximo 200 ms, nunca um spinner sem contexto, o que fazer enquanto a foto é analisada).

**Agente 3: Treino ao vivo e guia, na academia.**
Pergunta: como a tela de treino e o guia funcionam com uma mão, de relance, entre séries, com a tela molhada, a luz forte e o barulho? Meça o de hoje (alcance do polegar nas alturas de 640 e 780 px; o que fica visível sem rolar em cada estado: série, descanso, troca, dor; quantos toques por série e por treino nas personas). Estude: alcance do polegar, lei de Fitts, uso em relance, legibilidade a distância (a pessoa deixa o celular no banco), algarismos tabulares, feedback tátil e sonoro do fim do descanso (com permissão e respeito ao silencioso), tela sempre acesa durante o treino (Wake Lock, com fallback), o que o Boneco precisa de espaço e de controles em volta, e como os erros e os músculos entram sem roubar a cena. Entregue: a tela de treino e o guia estado por estado (antes da série, durante, descanso, troca de exercício, "Senti algo", fim), com rascunho, o que fica fixo e o que rola, os tamanhos de letra e de toque, e a lista de interações que precisam de teste e2e.

**Agente 4: Organização visual e hierarquia.**
Pergunta: qual é a arquitetura de informação e o sistema de layout que fazem cada tela se entender em um relance e o app inteiro parecer uma coisa só? Estude: hierarquia tipográfica (escala, pesos, comprimento de linha), ritmo de espaço, densidade por tela (o treino precisa de menos; a semana aguenta mais), navegação (a barra fixa de hoje: fica? muda? o que entra nela?), padrões de cartão, lista, folha inferior e diálogo, estados vazios, de erro e de carregamento, ícones (os 21 ícones de equipamento que faltam estão no backlog), e como o selo de evidência e a fonte aparecem sem virar ruído. Faça o inventário dos componentes que as telas de hoje usam (conte, em `src/features/` e `src/styles.css`) e proponha o conjunto mínimo que cobre tudo. Entregue: o mapa de navegação proposto, a escala tipográfica e de espaço, a lista de componentes com cada estado, e um esboço de cada tela em ASCII ou em HTML estático, mostrando a hierarquia sem cor.

**Agente 5: Cor, tema e identidade.**
Pergunta: qual paleta, nos temas claro e escuro, dá ao app uma identidade própria, legível na academia e em paz com as cores do Boneco? Estude: contraste WCAG 2.2 e APCA (como leitura complementar), daltonismo (Okabe e Ito; simule protanopia, deuteranopia e tritanopia nas telas), cor semântica (ação, feito, atenção, alerta de saúde, descanso) separada de cor de marca, o tema escuro (cinza em vez de preto, saturação), a cor do palco do Boneco como restrição, e a letra (a Atkinson Hyperlegible Next de hoje foi escolhida por legibilidade; confira os algarismos tabulares e proponha alternativas só se houver ganho medido). Gere as paletas por script (OKLCH ou similar), com as razões de contraste calculadas para cada par texto/fundo e controle/fundo nos dois temas, e teste cada cor sobre o palco do Boneco. Entregue: 2 ou 3 direções de identidade (com nome, intenção e uma tela de exemplo cada), a paleta de cada uma com as razões calculadas, a recomendação sua e a lista de tokens CSS prontos para `:root`.

**Agente 6: Crítico independente, acessibilidade e medição.**
Entra **depois** dos agentes 1 a 5, com o protótipo e os relatórios, e **sem** as suas conclusões como orquestrador. Pergunta: o que, na proposta, vai falhar com gente de verdade, com leitor de tela, com baixa visão, com tremor nas mãos, num celular barato e lento, no sol, offline? Confira item a item: os critérios de "o que não muda", a WCAG 2.2 nível AA, foco e ordem de leitura, nomes acessíveis, `prefers-reduced-motion`, tamanho e espaçamento de toque, rolagem lateral a 360 px, desempenho (tamanho do bundle, LCP e INP no Lighthouse em modo celular, com rede lenta) e privacidade. Procure também o que foi afirmado sem fonte ou sem medida nos relatórios 1 a 5. Entregue: a lista de problemas por gravidade (bloqueia, grave, pequeno), cada um com a tela, a evidência e a correção proposta, e a lista de afirmações dos outros agentes que não se sustentam.

**Você, orquestrador:** escreve os briefings, lê os relatórios, resolve conflitos entre eles (o agente 2 quer tirar uma pergunta que o agente 3 precisa; o agente 5 quer uma cor que o agente 6 reprova) registrando a decisão e o motivo, monta o sistema visual e o protótipo, e apresenta ao Gustavo. Você não faz o trabalho dos agentes de novo, nem aceita um relatório sem localizar nele a medida ou a fonte de cada afirmação importante.
</equipe>

<fases>
**Fase 0: plano (você está em modo plano).** Leia o material de "onde o projeto está". Apresente ao Gustavo, antes de criar qualquer arquivo: a equipe (com ajustes, se achar que um papel sobra ou falta, dizendo por quê), os briefings resumidos em 3 linhas cada, a ordem e o paralelismo, os pontos de parada para decisão, e até 5 perguntas cujas respostas mudariam o trabalho (por exemplo: o nome "treino-mvp" e um ícone de app entram no redesign? Há uma referência visual de que ele gosta ou não gosta? Ele quer testar o protótipo com uma mão antes da implementação?). Espere a aprovação do plano.

**Fase 1: pesquisa e propostas em paralelo.** Lance os agentes 1 a 5 ao mesmo tempo, cada um com o briefing completo. Enquanto eles trabalham, gere o inventário de capturas do app de hoje (Playwright, as 6 personas, claro e escuro, Pixel 7 e 360 px) em `docs/revisoes/redesign/antes/`, por script, não à mão. Receba os relatórios em `docs/revisoes/redesign/`.

**Fase 2: síntese e protótipo.** Com os 5 relatórios, escreva `docs/revisoes/redesign/proposta.md`: os princípios (poucos, cada um com fonte ou marcado como opinião), o sistema visual (tokens, letra, escala, componentes, movimento), o mapa de navegação e cada tela com o antes e o depois. Monte o **protótipo navegável** de todas as telas, nos dois temas, com o Boneco real (use `scripts/design/prototipo/gerar.mjs` como ponto de partida para rasterizar o Boneco do motor; não desenhe um Boneco novo). O protótipo é HTML estático em `docs/revisoes/redesign/prototipo/`, e também publicado como artifact, para o Gustavo abrir no celular e testar com uma mão. Gere as imagens do antes e do depois lado a lado, por tela.

**Fase 3: crítica independente.** Lance o agente 6 com o protótipo e os relatórios. Corrija no protótipo o que ele apontar como "bloqueia" e "grave", registre o que você discordou e por quê, e inclua o relatório dele na proposta.

**Fase 4: parada para decisão do Gustavo.** Apresente a proposta com a tabela de decisões, **item a item, nada pré-marcado**, cada item com: o que muda, a imagem do antes e do depois, a evidência (selo e fonte, ou "opinião"), o que muda de regra ou de dado (se mudar), o custo estimado em lotes de implementação e o risco. Inclua as direções de identidade do agente 5 como escolha separada. Pare e espere.

**Fase 5: implementação em lotes.** Num branch próprio a partir da `main`, na ordem que o Gustavo aprovar, com esta sugestão: (1) tokens, letra, componentes base e os testes de toque e contraste cobrindo todas as telas; (2) treino e guia; (3) cadastro; (4) início, fim do treino, semana e evolução; (5) meus dados, locais e o resto. Cada lote: um commit por mudança, em pt-BR e no imperativo; `npm run check` e `npm run test:e2e` verdes; a regressão visual do Boneco intocada (`npx playwright test --project=motor`); as medidas do lote (toques, contraste, toque, Lighthouse) registradas em `docs/revisoes/redesign/medidas.md`; capturas novas em `docs/img/`. Ao fim de cada lote, pare para o Gustavo olhar no celular antes do próximo.

**Fase 6: fechamento.** Entrada no `docs/devlog.md` (o que mudou, as imagens ou GIF, as medidas antes e depois, o rascunho de post), `docs/backlog.md` com o que ficou para depois, e a `main` só com o ok do Gustavo. Antes de mesclar, lembre-o de exportar os dados do app ("Meus dados" → "Guardar uma cópia").
</fases>

<criterios_de_sucesso>
A proposta e a implementação são medidas contra isto. Reporte cada número antes e depois; se um critério não puder ser medido, diga por quê em vez de estimá-lo.
- **Cadastro:** até 15 toques e 0 caractere da abertura ao programa para quem não tem condição de saúde (critério 1 do plano), sem contar a tela de equipamento; com "academia completa", a tela de equipamento em até 15 s. Meta de proposta: menos toques que hoje (13) ou o mesmo número com menos telas e menos rolagem. Estimativa de tempo por KLM e, se o Gustavo topar, a cronometragem dele no celular.
- **Sensação de velocidade:** toda ação responde visualmente em menos de 100 ms; transições de tela de no máximo 200 ms e desligadas com `prefers-reduced-motion`; nenhuma espera acima de 1 s sem progresso visível; o avanço automático só onde a pessoa já vê o que escolheu e consegue voltar com um toque.
- **Treino:** "Série feita" (ou o equivalente) visível sem rolar em todas as séries, a 412 e a 360 px; "Senti algo" visível em todos os estados; os números da série legíveis a um braço de distância (teste com a captura reduzida a 50%); a sessão inteira feita com uma mão no Pixel 7, por script e pelo Gustavo.
- **Acessibilidade:** 0 toque abaixo de 44 px (piso de 48 nos controles principais); 0 texto abaixo do contraste da WCAG; foco visível e ordem de leitura certa em todas as telas; Lighthouse acessibilidade ≥ 90 (meta: 100) em todas as rotas; as três simulações de daltonismo sem perda de informação.
- **Desempenho:** bundle de produção não maior que o de hoje (meça antes) sem justificativa aprovada; Lighthouse desempenho ≥ 90 no modo celular com rede lenta; a letra sem bloquear a primeira pintura.
- **Regressão:** o projeto `motor` verde com a linha de base intocada; `npm run check` e `npm run test:e2e` verdes; `tests/repo/privacidade.test.ts` verde.
- **Retenção:** sem métrica de uso real nesta sessão (o app não coleta nada). O critério é a revisão do agente 6 e a lista dos 5 momentos do agente 1 cobertos na tela, cada um com a fonte.
</criterios_de_sucesso>

<formato_dos_relatorios>
Todo achado, em qualquer relatório, segue este formato, para que a síntese e a tabela de decisões saiam direto deles:

- **Tela/estado:** Treino, durante o descanso.
- **Problema:** o relógio de 72 px fica atrás do teclado quando a pessoa ajusta a carga da próxima série. [medido: captura a 360 px, persona Ana, série 2]
- **Evidência:** uso em relance domina nos apps de atividade [fonte: Gouveia, Karapanos e Hassenzahl 2015, UbiComp; um estudo]. A pessoa deixa o celular no banco entre séries [opinião].
- **Proposta:** o ajuste de carga fecha o teclado e volta ao relógio; o relógio nunca sai do terço superior da tela.
- **Efeito esperado:** 0 estado em que o relógio fica coberto; 1 toque a menos por série ajustada.
- **Custo e risco:** pequeno; muda `Treino.tsx` e um teste e2e.

Selos como em `docs/pesquisa/00-metodo.md`: robusta, moderada, um estudo, consenso. Norma técnica (WCAG, guias de plataforma) entra como consenso. Estudo que você só viu no resumo leva a marca "(resumo)". Nada de inventar estudo, número ou citação: se não achar a fonte, escreva "[opinião]".
</formato_dos_relatorios>

<como_trabalhar>
1. Pense antes de agir em cada fase: escreva para si o que precisa saber, o que já sabe e o que vai medir, e só então lance agentes ou escreva código.
2. Para o Gustavo, escreva curto, em pt-BR, com imagem sempre que a decisão for visual. Diga o que está bom e o que está fraco, com evidência; o que for opinião sua, marque como opinião. Quando não souber, diga que não sabe.
3. O Gustavo decide; você recomenda. Nas tabelas de decisão, nada vem pré-marcado, mas cada linha traz a sua recomendação e o motivo.
4. Medir por script, não à mão: capturas, contagem de toques, contraste, toque, daltonismo, Lighthouse. Os scripts ficam em `scripts/design/redesign/` e rodam de novo com um comando.
5. Privacidade: nada de `privado/` em nada versionado; testes, capturas e protótipo só com as personas fictícias de `tests/personas/`.
6. Git: um branch próprio a partir da `main` (`redesign-visual`), commits pequenos em pt-BR e no imperativo. A `main` só recebe com o ok do Gustavo.
7. O Boneco e o domínio só mudam com a aprovação do Gustavo, em decisão separada, nunca dentro de um lote de design.
8. Ao fim de cada fase e de cada lote, pare, mostre e espere.
</como_trabalhar>
