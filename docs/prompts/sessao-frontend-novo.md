# Prompt: o frontend novo (pesquisa, direção visual e reconstrução)

> Escrito em 12/11/2026, a pedido do Gustavo, como adaptação ao treino-mvp de um prompt que ele usou em outro projeto (um app interno de dados, para computador). O que mudou na adaptação: o treino-mvp é um PWA de celular, usado na academia com uma mão só, e já passou por um redesign completo (05 a 08/11/2026, `docs/revisoes/redesign/`). As regras de espaçamento e os 20 cuidados vieram do prompt original e foram ajustados ao celular. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir a sessão do **frontend novo** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**O pedido do Gustavo (12/11/2026).** Refazer por completo o frontend do app (`src/features/`, `src/styles.css`) para que ele tenha a estética e o acabamento de um aplicativo profissional da melhor qualidade, partindo de uma pesquisa ampla de referências.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e decide olhando. Ele decide o produto; as decisões técnicas são suas, sempre com o motivo e o efeito medido.

**Tudo está liberado.** Não trate o que cada tela mostra e destaca hoje como o que ela deve mostrar. Se a pesquisa e o diagnóstico indicarem outras prioridades, outra ordem, outra navegação, telas a mais ou a menos, isso está permitido: proponha. O redesign de 05 a 08/11 (cor "Giz e grafite", letra Atkinson Hyperlegible Next, as 16 peças, a navegação de baixo) é o ponto de partida do diagnóstico, não um limite.

**O que não está liberado** são os princípios do `CLAUDE.md`, que valem inteiros. Em resumo:
- **O Boneco e o motor não mudam nesta sessão.** Eles estão sendo refeitos por outra sessão, em outro ramo (`docs/prompts/sessao-animacao-nova.md`); aqui você cuida só da moldura. Desenhe o palco para receber um desenho que vai mudar: não dependa das cores nem das proporções do Boneco de hoje. Nenhum byte em `src/engine/`, e as linhas de base do desenho continuam iguais. O guia animado tem que existir e ser a peça central do treino; a moldura dele (o palco, os controles, os modos, o texto em volta) você pode refazer como entender melhor. Exercício sem animação aprovada continua como cartão de texto.
- **Segurança à mão.** O "Senti algo" sempre à vista no treino, a triagem no estilo do PAR-Q+, a nota de segurança no guia.
- **Evidência a um toque.** O selo e a fonte de cada regra continuam acessíveis (o "por quê?"), sem ocupar a frente da tela.
- **Privacidade.** Tudo no aparelho; nenhum pedido externo novo (a letra é servida pelo próprio app); nada de `privado/`.
- **Uso na academia.** Celular primeiro, uma mão só, ação principal perto do polegar, toque de 44 px ou mais, `prefers-reduced-motion`, funciona sem rede.
- **O domínio fica fora.** Regra de treino continua em `src/domain/`, determinística. A interface não inventa regra nem texto técnico.

## 0. Antes de começar

1. Confirme onde você está: `git rev-parse --show-toplevel` e `git branch --show-current`. Se o ramo for `main`, pare e crie um ramo novo a partir dela antes de qualquer mudança.
2. Leia o `CLAUDE.md` e o `docs/PLANO-MVP.md`.
3. Leia o que já existe sobre o frontend:
   - `docs/revisoes/redesign/proposta.md` e `medidas.md` (o redesign de 05 a 08/11: os princípios, as decisões do Gustavo, as medidas de antes e depois) e a entrada "Redesign visual" do `docs/devlog.md`;
   - `docs/revisoes/design.md` e `design-v2.md` (as duas rodadas anteriores);
   - no `docs/backlog.md`, as seções "Do redesign" (o que ficou pendente);
   - `docs/prompts/sessao-design.md` (como as sessões de design anteriores trabalharam).
4. Percorra `src/App.tsx` (as rotas), `src/features/` (as telas), `src/features/app/ui.tsx` (as peças), `src/styles.css` (os tokens e os estilos) e `tests/e2e/` (o que os testes exigem da interface: toque, contraste, letra, foco, orçamento de peso, uso sem rede).
5. Em até 5 linhas, diga ao Gustavo o que entendeu e o plano da etapa 1. Não precisa esperar o ok para pesquisar: a parada obrigatória é no fim da etapa 1.

## 1. Regras de isolamento

- **Ramo próprio.** Trabalhe só no ramo desta sessão. Nunca faça commit, merge ou push na `main`. A ida para a `main` é só com o ok do Gustavo, por merge sem forçar.
- **Conta.** Só as contas pessoais do Gustavo, nunca a da Futurum. Tudo fica no git, e só no git.
- **Pode alterar:** `src/features/`, `src/styles.css`, `src/App.tsx`, `src/main.tsx`, `index.html`, `public/` (ícones e letra), `tests/e2e/` (para acompanhar a interface nova), `scripts/design/` e a pasta nova `docs/revisoes/frontend-novo/`.
- **Não altere:** `src/domain/`, `src/engine/`, `src/conteudo/`, `src/storage/` (o estado guardado e as migrações), `api/`, `docs/pesquisa/`, `docs/pesquisa-v2/`, `tests/unit/`, `tests/motor/`, `tests/visual/`, `tests/personas/`, `referencia/` e o `CLAUDE.md`.
- **Se faltar um dado ou uma função do domínio**, anote em `docs/revisoes/frontend-novo/pedidos-ao-dominio.md`, com o motivo. Cada pedido é uma decisão separada do Gustavo; não mude o domínio nem o estado guardado por conta própria.
- **Se outra sessão estiver mexendo na `main`:** antes de fechar cada etapa, veja o que mudou em `src/features/` e `src/styles.css` na `main` (`git fetch origin main` e `git diff` contra `origin/main`, só leitura) e leve as mudanças para o desenho novo.
- **Dados.** Capturas, protótipos e testes usam só as personas fictícias (`tests/personas/`). `privado/` nunca é lido para isso nem versionado.
- **Limite de uso.** Pesquisa em lotes de no máximo 4 subagentes por vez, cada um gravando o resultado em arquivo antes de responder, para nada se perder se o limite interromper.

## 2. Etapa 1: pesquisa e direção visual (termina com parada para o Gustavo)

### 2.1 Pesquisa de referências

Procure nas fontes mais diversas possíveis. O objetivo é chegar ao desenho final com as melhores referências, não com as primeiras. O redesign anterior já pesquisou retenção, cadastro, treino ao vivo, organização e cor (`docs/revisoes/redesign/agente-*.md`): leia antes e não repita; esta pesquisa é sobre **acabamento e estética**.

- **GitHub:** sistemas de componentes e bibliotecas para React no celular (por exemplo Radix, React Aria, Base UI, Vaul, Motion, bibliotecas de gráficos leves), aplicativos de código aberto com interface de referência (inclusive apps de treino abertos) e listas "awesome" de design para celular e PWA. Registre a licença de cada um.
- **X (Twitter):** fios e publicações de designers e engenheiros de interface sobre acabamento, tipografia, espaçamento, números grandes, movimento e como tirar a "cara de IA" de uma interface.
- **Reddit:** discussões e críticas em comunidades de UI, UX, web design, React, PWA e de quem treina (o que as pessoas elogiam e detestam nos apps de treino que usam).
- **Hacker News, blogs e artigos:** textos de equipes de produto sobre o desenho de aplicativos de celular de alto acabamento (Linear, Things, Arc, Airbnb, Duolingo, Apple Fitness e afins) e sobre PWA que parece app nativo.
- **Sistemas de design públicos:** Apple HIG, Material 3, GitHub Primer, Shopify Polaris, Atlassian, IBM Carbon, Vercel Geist. O peso maior vai para o que trata de celular, toque, folhas, navegação de baixo e tipografia de números.
- **Produtos de referência em treino e saúde** (Hevy, Strong, Fitbod, Nike Training Club, Apple Fitness, Strava, Whoop, Gentler Streak e afins): o que fazem no registro de série com uma mão, no temporizador de descanso, no guia de execução, no resumo do treino, no gráfico de evolução, no cadastro e nos estados vazios.
- **Galerias públicas** de interface de celular e de visualização de dados.

Regras da pesquisa:

- Só páginas públicas. Nada de login, área paga, CAPTCHA ou contorno de bloqueio; se a página não abre, passe para a próxima. X e Reddit pela busca na web e pelas páginas públicas.
- Aplicativos de treino de terceiros: como referência visual, só por artigos, análises, páginas públicas e imagens publicadas. Não copie marca, logotipo, ilustração nem tela de produto de terceiros: referência é para aprender o princípio, não para reproduzir.
- **Nada do que for lido aqui vira regra de treino.** Regra e texto técnico só entram por `docs/pesquisa/`, com selo e fonte, e não nesta sessão.
- Não copie código sem licença compatível (MIT, Apache 2.0, ISC, BSD). Letra só com licença livre (SIL OFL ou equivalente), servida pelo próprio app.
- Sem custo e com poucas dependências (princípio "Simplicidade" do `CLAUDE.md`): só bibliotecas gratuitas e de código aberto, e cada dependência nova precisa se pagar. Mostre o peso que ela soma ao pacote (o teste `tests/e2e/orcamento.spec.ts` trava o limite) e o que seria preciso escrever sem ela.
- Princípio de design com evidência leva selo e fonte, como em `docs/pesquisa/00-metodo.md`; o que for opinião sua vai marcado como opinião. Nada de inventar estudo.
- Subagentes de busca e leitura em modelo mais simples, com `model` explícito e briefing autossuficiente (objetivo, onde procurar, estas regras, formato da resposta). A síntese é sua.

Para cada referência aproveitada, registre em `docs/revisoes/frontend-novo/referencias.md`: endereço, tipo de fonte, o princípio ou a peça que se aproveita, e a licença quando for código. Agrupe por tema (espaçamento, tipografia, cor, números e gráficos, navegação, registro da série e temporizador, guia e palco do Boneco, cadastro e formulários, folhas e diálogos, estados, movimento, acessibilidade). Meta: pelo menos 60 referências úteis, de pelo menos 6 tipos de fonte diferentes.

### 2.2 Princípios obrigatórios (pedidos pelo Gustavo)

Estes dois blocos entram como regra do sistema de design, não como sugestão. A pesquisa pode acrescentar princípios, não tirar estes.

**A. Grade de 8 pontos, com tokens**

- Uma escala única de espaçamento, declarada como tokens: 4 (meio passo, ajuste fino entre ícone e texto), 8, 16, 24, 32, 48, 64. Nenhum componente usa valor fora da escala. A escala de hoje (`--e1` a `--e6` no `src/styles.css`) tem o 12, que sai; se algum caso pedir mesmo o 12, leve ao Gustavo como decisão, com a captura.
- A escala vale para tudo: margem, respiro interno, distância entre cartões (16 ou 24), margens laterais da tela (16 no celular, 24 ou 32 em telas largas), respiro de cartões e painéis (16 ou 24), folhas e diálogos (24).
- Alturas de botões e campos em 48, 56 ou 64. As alturas de 32 e 40 do prompt original não valem aqui: o `CLAUDE.md` pede toque de 44 px ou mais. Elemento menor que isso só se não for tocável.
- As alturas e as letras continuam em `rem`, para a letra maior do sistema valer (o teste `letra.spec.ts` confere 125% e zoom de 200%).
- Proximidade comunica relação: elementos do mesmo grupo ficam perto (8), grupos diferentes ficam longe (24 ou 32). O que organiza é o contraste entre as distâncias; prefira distância a bordas e divisórias.
- O objetivo não é pôr 8 em tudo, e sim manter relações proporcionais e previsíveis.
- **Conferência automática:** um comando (`npm run conferir:tokens`, script em `scripts/design/` ou regra de lint) que falha quando aparece espaçamento, altura ou raio fora dos tokens em `src/styles.css` e em `src/features/`. O desenho do Boneco (`src/engine/` e o bloco do palco) fica de fora da conferência, com a exceção escrita no próprio script. Rode ao fim de cada tela.

**B. Vinte cuidados para a interface não parecer feita por IA** (adaptados a um app de treino no celular)

1. Sem selos e etiquetas de enfeite: selo só quando carrega informação (o nível de evidência carrega; "novo" e "recomendado" soltos, não).
2. Sem rótulo redundante (título que repete o que o conteúdo já diz).
3. Sem itálico solto em palavras ao acaso.
4. Uma família de letra só. Fonte monoespaçada só onde ajuda de verdade; para carga, repetições e relógio, use os números tabulares da própria letra.
5. Um sistema de design de verdade: tokens e peças reutilizadas, nada desenhado tela a tela.
6. Mostrar o conteúdo real em primeiro plano (o exercício, a carga, o Boneco), não moldura em volta dele.
7. O principal de cada tela é o maior elemento dela (no descanso, o relógio; na série, a carga e as repetições; no guia, o palco).
8. Agrupar por espaçamento (bloco A).
9. Títulos específicos: dizem o que a tela mostra, com o número quando houver ("Superior A, 5 exercícios", não "Seu treino").
10. Uma ação principal por tela, com destaque claro e perto do polegar; as demais, discretas.
11. Uma cor de destaque, usada com parcimônia e sempre com o mesmo sentido. As cores do Boneco (músculo principal, secundário, erro, trajetória) são do desenho e não entram nessa conta, mas a interface não pode disputar com elas.
12. Ícones de uma família só, mesmo traço e mesmo tamanho.
13. Sem enfeite: nada de degradê, brilho, sombra pesada ou ilustração que não informa. Os 49 desenhos de equipamento informam e ficam.
14. Raio interno = raio externo menos o respiro (cantos aninhados coerentes).
15. Contraste de texto suficiente (WCAG AA no mínimo), inclusive no texto secundário, no modo escuro e sob a luz forte da academia.
16. Quebra de linha de títulos cuidada (sem palavra órfã; `text-wrap: balance` onde couber), conferida também em 320 px e com a letra a 125%.
17. Alinhamento conferido a olho na captura de tela, não só pelo número.
18. Números tabulares em todo relógio, carga, repetição, tabela e gráfico (o número não pode "dançar" quando muda).
19. Estado em toda espera e em todo vazio: carregando (o motor do Boneco, a leitura da foto), vazio (primeira semana sem treino, evolução sem registro) e erro, sempre com a orientação do que fazer. Inclui o uso sem rede.
20. Movimento só como resposta útil a uma ação (curto, discreto, respeitando `prefers-reduced-motion`). A animação do Boneco é conteúdo, não enfeite, e segue as regras dela.

### 2.3 O que entregar no fim da etapa 1

Tudo em `docs/revisoes/frontend-novo/`:

- **`referencias.md`:** a pesquisa, como descrito acima.
- **`diagnostico.md`:** o frontend atual, tela por tela, com captura (gerada por script do Playwright, com a persona Ana, em 390 px e 320 px, nos temas claro e escuro) e os problemas à luz dos blocos A e B. As telas: boas-vindas, saúde (triagem), nível, rotina, equipamento (inclusive a foto), início (programa, com o cartão "Hoje"), a folha do exercício, treino (a série, o descanso, o "Senti algo", o "⋯"), fim do treino, semana, evolução, guia (os modos), locais, Meus dados e termos. Além dos problemas de acabamento, diga **o que cada tela deveria priorizar** e hoje não prioriza: é aqui que o "tudo está liberado" entra.
- **`proposta.md`:**
  - a direção visual (tipografia, cores, tokens de espaçamento, raio e sombra, navegação, o registro da série, o temporizador, a moldura do guia, números e gráficos, formulários do cadastro, folhas e diálogos, estados, modo claro e escuro, movimento, acessibilidade);
  - o que muda de conteúdo e de prioridade em cada tela, e por quê;
  - as bibliotecas recomendadas, com justificativa, licença e peso, e o que foi descartado e por quê;
  - o plano de reconstrução tela por tela, com a ordem;
  - as decisões que dependem do Gustavo.
- **`prototipos/`:** duas ou três direções visuais de duas telas, o **início** (com o cartão "Hoje") e o **treino** (a série e o descanso, com o Boneco real no guia), em HTML estático com dados da persona Ana, cada uma com captura em modo claro e escuro, no tamanho de celular. Aproveite o que já existe para pôr o Boneco real num protótipo (`scripts/design/prototipo/`, `docs/revisoes/redesign/prototipo/`). O Gustavo decide olhando, de preferência no próprio celular: os protótipos são a parte mais importante da entrega.

Faça commit no ramo desta sessão, com push, e pare. Relate em linguagem simples, em poucas linhas: as direções, a sua recomendação e por quê, e os caminhos completos dos protótipos e das capturas (e o link da prévia do ramo, se houver, para ele abrir no celular). Espere a escolha dele.

## 3. Etapa 2: reconstrução (só depois do sim do Gustavo)

- **Primeiro o sistema:** tokens (espaçamento, cor, tipografia, raio, sombra, movimento), as peças de base (`src/features/app/ui.tsx` ou uma pasta de peças, se a proposta pedir) e a moldura de navegação. Depois as telas, na ordem aprovada, uma por vez.
- **Nenhuma função se perde sem decisão.** Tudo o que o app faz hoje continua funcionando, a não ser o que o Gustavo aprovou tirar ou mudar na proposta: o cadastro inteiro e a triagem, os locais e o equipamento por foto, o programa e a troca de exercício ("Prefiro"), a série com "Desfazer", o descanso, o "Senti algo" com a alternativa, a tela acesa, o fim do treino, a semana, a semana leve, a evolução, os 4 modos do guia, o cartão de texto dos exercícios sem animação, o "por quê?" com o selo e a fonte, exportar e apagar os dados, o estilo do Boneco, o uso sem rede e a instalação como app.
- **A cada tela:**
  - conferir no navegador com a persona Ana (console sem erros; estados de carregamento, vazio e erro; modo claro e escuro; 320 px, 390 px e uma largura de tablet; letra a 125%; `prefers-reduced-motion`);
  - rodar `npm run conferir:tokens` e `npm run check`;
  - guardar a captura de antes e depois em `docs/revisoes/frontend-novo/capturas/`;
  - fazer um commit pequeno, em pt-BR e no imperativo.
- **Os testes acompanham a interface, não o contrário.** Teste de ponta a ponta que quebra porque a tela mudou é reescrito para a tela nova, conferindo a mesma coisa. Nunca apague nem pule um teste de toque, contraste, letra, foco, orçamento ou uso sem rede para ficar verde. O peso do pacote só sobe com o número mostrado ao Gustavo.
- **O motor não muda:** `tests/motor/` passa sem regravar nenhuma linha de base. Se alguma falhar, a mudança está errada.
- **Revisão independente** ao fim de cada bloco de telas: um subagente no modelo mais capaz, só com o código, as capturas e os blocos A e B como roteiro, sem a sua conclusão no briefing.
- **Medidas de antes e depois**, nas mesmas réguas do redesign (`docs/revisoes/redesign/medidas.md`): Lighthouse (desempenho e acessibilidade), JavaScript da 1ª tela, palavras à vista, toques do cadastro, ação principal à vista sem rolar. Nenhuma pode piorar sem o Gustavo saber.
- **Critério de pronto:**
  - todas as telas refeitas no padrão novo;
  - `npm run check` e `npm run test:e2e` limpos;
  - `npm run conferir:tokens` sem nenhuma exceção além do Boneco;
  - `src/engine/` e `src/domain/` sem nenhuma mudança (`git diff origin/main -- src/engine src/domain` vazio);
  - os 20 cuidados conferidos tela por tela numa tabela em `docs/revisoes/frontend-novo/qa.md`.
- **Fechamento:** a entrada no `docs/devlog.md` (o que mudou, as capturas de antes e depois, a tabela de medidas, o rascunho de post), as pendências no `docs/backlog.md`, e o resumo final para o Gustavo: o ramo, o que mudou, o que mudou de prioridade em cada tela, as pendências, os pedidos ao domínio e o que precisa ser conciliado com a `main`. Pare para a revisão dele; a junção com a `main` só com o ok.

## 4. Como falar com o Gustavo

Português, sem jargão; termo técnico inevitável, explicado em uma frase. Evidência sempre (captura, contagem, caminho do arquivo). Uma decisão por vez, com a sua recomendação e nada pré-marcado.

## 5. O que não fazer

- Não mexa no Boneco, no motor nem nas linhas de base.
- Não mude regra de treino, texto técnico, selo ou fonte.
- Não mude o estado guardado (quem já usa o app não pode perder os dados).
- Não troque a letra servida pelo app por uma letra buscada em outro servidor, nem acrescente qualquer pedido externo.
- Não ponha animação improvisada num exercício que hoje é cartão de texto.
- Não desenhe para o computador primeiro: o celular na academia é o caso principal.
