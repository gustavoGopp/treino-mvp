# Prompt: o treino para todos (a qualidade do programa gerado, para qualquer pessoa que use o app)

> Escrito em 12/11/2026, a pedido do Gustavo, na mesma linha do `sessao-frontend-novo.md` e do `sessao-animacao-nova.md`. Aqueles refazem as telas e o Boneco; este cuida do coração do app: o treino que o gerador recomenda. As três sessões podem correr em paralelo, cada uma no seu ramo. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir a sessão do **treino para todos** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**O pedido do Gustavo (12/11/2026).** Levar a qualidade do treino recomendado ao nível mais alto possível: a quantidade (séries, exercícios, dias, minutos), os exercícios escolhidos, a ordem, a eficiência do tempo, a progressão ao longo das semanas e tudo o mais que a pesquisa mostrar que importa. Nas palavras dele: **este é o coração do app; sem um bom treino recomendado, todo o resto perde o sentido.**

**Não é o treino do Gustavo. É o treino de qualquer pessoa.** O alvo desta sessão são todos os programas que o app pode vir a gerar, para as pessoas diferentes que vão usá-lo: quem nunca treinou e quem treina há dez anos; quem tem uma academia completa, um par de halteres ou nada; 2 dias de 30 minutos ou 6 dias de 90; quem quer ganhar músculo, manter na dieta, ficar mais forte ou cuidar da saúde; quem tem dor no ombro ou no joelho; quem volta de uma pausa; quem é jovem e quem passou dos 60. O caso do Gustavo é uma linha entre muitas, com o mesmo peso das outras. Melhorar um perfil piorando outro não é melhoria.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício. Fala de produto e de experiência, e decide olhando exemplos concretos. Ele decide o produto; as decisões técnicas são suas, sempre com o motivo, a fonte e o efeito medido.

**As regras de hoje são rascunho.** Tudo no gerador está liberado para ser questionado: as metas de volume, as divisões, as vagas de cada dia, a escolha e o desempate dos exercícios, a ordem, as faixas de repetições, o descanso, a distância da falha, os cortes de tempo, o uso do tempo que sobra, as técnicas para economizar tempo, a progressão, a semana leve, a volta de pausa, a biblioteca de exercícios e até as perguntas do cadastro (se a pesquisa mostrar que falta saber algo da pessoa para o treino ser bom, proponha). Uma regra de hoje só fica se continuar sendo a melhor depois da pesquisa e da medida. O que já foi medido e decidido (a régua, as revisões cegas, o que foi recusado e por quê) é o ponto de partida: não repita, mas pode reabrir com evidência nova.

**O que não está liberado** são os princípios do `CLAUDE.md`. Em resumo:
- **Evidência.** Toda regra tem selo (robusta, moderada, um estudo, consenso de treinadores) e fonte lida. Nada de inventar estudo. Opinião sua vai marcada como opinião e não vira regra sozinha.
- **Determinístico e testável.** O treino sai de regras e dados, nunca de texto livre de um modelo. A mesma entrada gera a mesma saída; sem `Math.random` nem `Date.now` em `src/domain/`. Toda regra tem teste.
- **Segurança.** Com dor, sinal de alerta ou triagem positiva, o app recua, oferece alternativa e recomenda avaliação profissional. Não diagnostica. Nenhuma melhoria de "eficiência" passa por cima disso.
- **Privacidade.** Dado de saúde é sensível. Pergunta nova no cadastro só se mudar o treino de forma medida, com o mínimo necessário, e fica no aparelho.
- **Escopo.** Só treino de força. Nutrição, cardio prescrito, deload automático e objetivos fora da força continuam fora; o que a pesquisa trouxer nessa linha vai para o `docs/backlog.md`.
- **Honestidade.** Quando o equipamento da pessoa não permite um bom treino para um músculo, o app diz isso e diz o que resolveria. Não finge.

## 0. Antes de começar

1. Confirme onde você está: `git rev-parse --show-toplevel` e `git branch --show-current`. Se o ramo for `main`, pare e crie um ramo novo a partir dela antes de qualquer mudança.
2. Leia o `CLAUDE.md`, a seção do gerador no `docs/PLANO-MVP.md` e `docs/pesquisa/00-metodo.md` (os selos e os status de leitura).
3. Leia o que já existe, para não recomeçar do zero:
   - `docs/pesquisa/regras.md` (a tabela única das regras; dela sai `src/domain/regras/regras.json`) e `docs/pesquisa/fontes.md`;
   - `docs/pesquisa-v2/` inteiro, começando por `README.md` e `PLANO-DOS-TEMAS.md` (os 17 temas já pesquisados, inclusive populações, objetivos, prioridade, corpo livre e biblioteca ampliada);
   - `docs/revisoes/auditoria-treino.md`, `auditoria-fable.md` (Partes B e C), `qualidade-treinos.md`, `proximos-passos.md` e a pasta `proximos-passos/` (em especial `a-qualidade.md`, `d-longo-prazo.md` e `g-biblioteca-ampliada.md`: a régua, as revisões cegas por treinadores, o que foi recusado);
   - `docs/revisoes/qualidade/` (`regua.md`, `grade.md`, `avaliador.md`, `caso-gustavo.md`) e `docs/revisoes/auditoria/` (`estresse.md`, `progressao.md`);
   - no `docs/devlog.md`, as entradas da qualidade dos treinos, do R5-CL, do R5d, do R5a e do R5b; no `docs/backlog.md`, tudo o que ficou pendente dessas sessões.
4. Percorra `src/domain/` inteiro (`gerador/`, `biblioteca/`, `progressao/`, `acompanhamento/`, `avaliador/`, `nivel/`, `triagem/`, `sessao/`, `regras/`), `scripts/auditoria/` (a grade, a régua, o estresse, a progressão) e `tests/unit/` com os registros dos programas das personas (`tests/personas/`).
5. Rode `npm run auditoria` e guarde os números de partida. Em 10/11, a régua media 108.900 programas, com 85,9% dos programas sem dor sem nenhum defeito e 74,3% dos programas com dor; confira os números de hoje.
6. Em até 5 linhas, diga ao Gustavo o que entendeu e o plano da etapa 1. Não precisa esperar o ok para pesquisar: a parada obrigatória é no fim da etapa 1.

## 1. Regras de isolamento

- **Ramo próprio.** Nunca faça commit, merge ou push na `main`. A ida para a `main` é só com o ok do Gustavo, por merge sem forçar, avisando para exportar os dados do app antes.
- **Conta.** Só as contas pessoais do Gustavo, nunca a da Futurum. Tudo fica no git, e só no git.
- **Pode alterar:** `src/domain/`, `docs/pesquisa/`, `docs/pesquisa-v2/` (temas novos, numerados a partir do 18), `scripts/auditoria/`, `tests/unit/`, `tests/personas/` (personas novas, sempre fictícias) e a pasta nova `docs/revisoes/treino-para-todos/`. Na etapa 1, nada em `src/domain/` muda na `main` nem no app: os testes de regra nova são feitos em protótipo, no ramo.
- **Não altere:** `src/engine/` e os desenhos (são da sessão da animação nova), as telas em `src/features/` e o `src/styles.css` (são da sessão do frontend novo), `api/` e o `CLAUDE.md`.
- **O que depender das outras sessões vira pedido escrito:** tela ou texto de tela em `docs/revisoes/treino-para-todos/pedidos-ao-design.md`; exercício que passa a ser muito usado e ainda é cartão de texto em `pedidos-a-animacao.md`, com a frequência medida.
- **O estado guardado** (`src/storage/`): pergunta nova no cadastro ou campo novo no programa muda o que fica salvo no celular de quem já usa. Só com decisão do Gustavo, com migração e teste, e juntando as mudanças numa versão só.
- **Quem já usa o app** vê "Há uma versão nova do seu programa" quando o gerador muda. Por isso as mudanças chegam em poucos pacotes, cada um com o antes e o depois, e não a conta-gotas.
- **Dados.** Só personas fictícias. `privado/` nunca é versionado, copiado nem usado em exemplos. Não conte com dados de uso real: tudo fica no aparelho de cada pessoa.
- **Limite de uso.** Pesquisa em lotes de no máximo 4 subagentes por vez, cada um gravando o resultado em arquivo antes de responder.

## 2. Etapa 1: pesquisa, retrato medido e proposta (termina com parada para o Gustavo)

### 2.1 Pesquisa

Comece pelo que falta, não pelo que já existe: faça primeiro a lista das perguntas que os 17 temas de `docs/pesquisa-v2/` não respondem ou respondem com evidência fraca, e pesquise essas. Procure nas fontes mais diversas possíveis.

- **Literatura científica** (PubMed, PMC, Crossref, periódicos abertos): revisões e meta-análises primeiro, depois os estudos. Os temas, no mínimo:
  - quanto fazer: séries por músculo por semana, por nível; a dose mínima que ainda funciona; o ponto em que mais deixa de render; frequência por músculo; quanto cabe numa sessão;
  - quão pesado e quão perto da falha; faixas de repetições por tipo de exercício e de equipamento; descanso entre séries;
  - que exercício escolher: o que muda entre exercícios para o mesmo músculo (posição alongada, estabilidade, facilidade de pôr carga, amplitude), multiarticular × isolador, quanto de variedade ajuda e quanto atrapalha;
  - a ordem dentro da sessão e a interferência entre exercícios (fadiga da lombar, da pegada, do mesmo músculo em dias seguidos);
  - eficiência do tempo: superséries, drop sets, descanso curto, o que dá para cortar sem perder resultado;
  - a progressão ao longo de meses: como subir a carga com cada tipo de equipamento, quando aliviar, o que fazer no platô, a volta depois de parar;
  - pouco equipamento e corpo livre: até onde vai, e como manter o estímulo para quem já é forte;
  - as pessoas diferentes: iniciantes, mulheres, pessoas acima de 60, quem está acima do peso, quem volta de pausa longa, quem tem dor em cada articulação, pressão alta, gestação (o que muda no treino e o que é só da triagem);
  - os outros objetivos dentro da força: manter músculo na dieta, ficar mais forte, saúde;
  - o que faz a pessoa continuar treinando: duração, variedade, sensação de progresso, treino de que ela gosta.
- **Diretrizes e posicionamentos** de entidades de medicina do esporte, de treinamento de força e de saúde pública.
- **Como bons treinadores montam programas:** programas públicos e livros de treinadores com formação e histórico, guias de associações. Entra como "consenso de treinadores", nunca como evidência de estudo.
- **O que as pessoas criticam em treinos gerados por aplicativo** (Reddit, X, fóruns e análises): o que faz um programa parecer genérico, mal montado ou "de máquina".
- **O que os aplicativos de referência fazem** na montagem e na progressão, só pelo que é público (páginas, artigos, documentação, análises).

Regras da pesquisa:

- Só páginas públicas. Nada de login, área paga, CAPTCHA ou contorno de bloqueio; o que não abrir fica como `NÃO VERIFICADO`.
- Toda fonte nova entra em `docs/pesquisa/fontes.md` com o status de leitura. Afirmação tirada só do resumo diz que veio do resumo.
- Não copie programa, tabela nem texto de terceiros. Referência é para aprender o princípio.
- Onde os estudos discordam, mostre os dois lados e o tamanho do efeito; não escolha o que convém.
- Diga com clareza o que a ciência **não** sabe. Onde não há evidência, a regra é consenso ou opinião, e leva esse nome.
- Subagentes de busca e leitura em modelo mais simples, com `model` explícito e briefing autossuficiente. A síntese é sua, e um subagente crítico independente confere as afirmações mais importantes na fonte, sem ver a sua conclusão.

Os temas novos entram em `docs/pesquisa-v2/` (18 em diante), no formato dos anteriores. Meta: pelo menos 60 fontes úteis novas ou relidas no original, com as perguntas em aberto listadas.

### 2.2 Princípios obrigatórios

Estes dois blocos entram como regra do trabalho. A pesquisa pode acrescentar, não tirar.

**A. A população inteira, medida**

- **O mapa de quem usa o app.** Escreva quem são as pessoas que o app precisa atender bem, por dimensão: nível, objetivo, dias, minutos, equipamento (os 55 cenários e os que faltarem), foco, dor (todas as articulações do cadastro, em mais de uma intensidade), volta de pausa, divisão escolhida à mão, exercícios e aparelhos a evitar, mais de um local de treino. Diga o que a grade de hoje cobre e o que ela deixa de fora.
- **O que o app não pergunta e talvez devesse.** O cadastro hoje não sabe idade, sexo nem peso. Para cada dado que a pesquisa indicar, responda: o treino mudaria como, para quantas pessoas, com que evidência? Vale o custo de perguntar um dado sensível? Cada um é uma decisão do Gustavo.
- **Toda regra é medida na população inteira, antes e depois.** Nenhuma mudança entra olhando só um caso.
- **Duas contas, sempre:** a grade inteira (cada combinação vale igual, para achar os cantos ruins) e uma conta com pesos (as combinações mais prováveis valem mais, para saber o que a maioria vai receber). Os pesos são uma estimativa sua, escrita e justificada; diga que são estimativa.
- **Os piores primeiro.** Além da média, olhe o pior grupo: qual perfil recebe o pior treino hoje, e por quê. O objetivo é subir o piso, não só a média.
- **A régua cresce.** Cada cuidado do bloco B que puder ser medido vira uma medida na régua (`scripts/auditoria/regua.ts`), com o limite e a fonte. O avaliador do app (`src/domain/avaliador/`) e a régua têm de medir igual.
- **Os dois níveis da régua continuam:** nenhum defeito pode piorar em relação à `main`, em nenhum grupo; uma mudança só entra se melhora alguma nota.
- **O tempo conta.** Além do programa da primeira semana, simule meses de uso (`npm run auditoria:progressao`): a carga sobe de um jeito possível com o equipamento da pessoa? A semana leve vem na hora certa? O que a pessoa ouve em 24 semanas faz sentido?
- **Olho de treinador.** Número não basta. Uma amostra de programas, espalhada pela população e incluindo os piores, passa por revisão cega: subagentes no papel de treinadores independentes recebem só as semanas e um briefing, sem saber qual versão é qual, e dão notas (eficiente, adequada à pessoa, agradável de fazer) com a crítica por escrito.

**B. Vinte cuidados para o treino não parecer montado por máquina** (o que um bom treinador nunca deixaria passar)

1. Cada dia é um treino de verdade: começa pelo exercício mais pesado e mais técnico e termina pelos isoladores, numa ordem que faz sentido.
2. O número de exercícios e de séries combina com os minutos que a pessoa tem.
3. O treino usa o tempo pedido: não estoura e não sobra muito sem aviso.
4. Cada músculo recebe na semana um volume dentro da faixa do nível da pessoa. Nenhum fica esquecido, e nenhum fica com uma ou duas séries soltas que não servem para nada.
5. O corpo fica equilibrado: empurrar e puxar, frente e trás da coxa, frente e trás do ombro.
6. O foco que a pessoa escolheu aparece de verdade, sem zerar o resto.
7. A semana é bem distribuída: cada músculo treina com a frequência certa e descansa o bastante antes de ser cobrado de novo.
8. O exercício escolhido é o melhor que o equipamento da pessoa permite para aquele músculo, e a razão da escolha é uma regra com fonte, não a ordem alfabética.
9. Há variedade na semana sem perder a prática: o mesmo exercício não aparece em todos os dias quando existe outro tão bom.
10. Não há redundância dentro do dia: dois exercícios que fazem a mesma coisa enquanto outra função fica sem nada.
11. Repetições, distância da falha e descanso combinam com o exercício, com o objetivo e com o equipamento (corpo livre e elástico pedem faixas diferentes das da barra).
12. Dá para progredir: com o equipamento que a pessoa tem, existe um próximo passo possível (mais carga, mais repetições, um degrau mais difícil), e o app sabe qual é.
13. A fadiga dentro da sessão é pensada: nada de dois exercícios que castigam a lombar ou a pegada em seguida, quando há como evitar.
14. A segurança vem antes: dor, complexidade acima do nível e triagem mudam o treino, e mudam para algo que ainda funciona.
15. Técnica para economizar tempo só entra onde ajuda e para quem já sabe treinar.
16. O iniciante recebe pouco, simples e fácil de aprender. O avançado recebe estímulo suficiente mesmo com pouco equipamento.
17. Os limites são ditos com honestidade: o que não dá para treinar bem com aquele equipamento, e o item mais barato que resolveria.
18. O programa é estável: uma mudança pequena no cadastro (5 minutos a mais, um halter a mais) muda pouco o programa. Nada de efeito dominó.
19. As semanas seguintes fazem sentido: a progressão, a semana leve, a volta de pausa e o platô funcionam por seis meses, não só no primeiro dia.
20. Cada escolha tem um porquê em uma frase, que bate com o que o programa de fato fez.

### 2.3 O que entregar no fim da etapa 1

Tudo em `docs/revisoes/treino-para-todos/` (a pesquisa em `docs/pesquisa-v2/`):

- **A pesquisa:** os temas novos, as fontes e as perguntas em aberto, como descrito acima.
- **`diagnostico.md`, o retrato medido de hoje:**
  - o mapa de quem usa o app e o que a grade deixa de fora;
  - cada um dos 20 cuidados medido na população: quantos programas falham, em quais grupos, com exemplos;
  - os 20 piores perfis de hoje, cada um com o programa que recebe e o que há de errado nele;
  - cada regra de hoje contra a pesquisa: confirmada, a ajustar, sem evidência ou contrariada, com a fonte;
  - a biblioteca: para cada músculo e cada cenário de equipamento, quantas opções boas existem e onde falta exercício;
  - o longo prazo: o que a simulação de meses mostra;
  - a revisão cega da amostra, com as notas e as críticas dos treinadores;
  - tudo em ordem de quantas pessoas atinge × quão grave é.
- **`proposta.md`:**
  - as mudanças, da mais importante para a menos, cada uma com: o problema em uma frase, a regra nova, o selo e a fonte, **o efeito medido num protótipo** (a régua antes e depois, na grade inteira e na conta com pesos, e o pior grupo), o que piora e para quem, e o que muda para quem já usa;
  - as perguntas novas do cadastro, se houver, cada uma com o ganho medido;
  - os exercícios a acrescentar ou a tirar da biblioteca, com a fonte e o efeito;
  - o que a pesquisa sugere e fica fora do escopo (vai para o backlog);
  - o que não vale a pena mexer, e por quê;
  - o plano em pacotes, com a ordem;
  - a recomendação sobre uma revisão por um profissional de Educação Física antes de abrir o app a desconhecidos (hoje está "de lado" no backlog);
  - as decisões que dependem do Gustavo.
- **`exemplos/`, a parte mais importante:** doze pessoas fictícias bem diferentes entre si (as 6 personas do projeto e mais 6 que cubram o que elas não cobrem, por exemplo uma pessoa de mais de 60 anos começando, alguém só com elástico, alguém com 2 dias de 30 minutos, alguém avançado sem equipamento, alguém com dor no joelho, alguém que quer ficar mais forte). Para cada uma, uma página em linguagem simples: quem é, **a semana que o app dá hoje ao lado da semana proposta**, o que mudou e por quê, e o que um treinador disse das duas. O Gustavo não é da área e decide olhando: é por estes exemplos que ele vai julgar.

Faça commit no ramo desta sessão, com push, e pare. Relate em linguagem simples, em poucas linhas: o que o retrato mostrou, as três mudanças que mais importam e por quê, o que você recomenda fazer primeiro, e os caminhos completos dos exemplos. Espere a escolha dele.

## 3. Etapa 2: as mudanças (só depois do sim do Gustavo)

- **Um pacote por vez, uma regra por vez dentro do pacote.** A ordem de cada regra: primeiro em `docs/pesquisa/regras.md`, com selo e fonte; depois o teste; depois o código; depois a medida.
- **A cada regra:**
  - a régua antes e depois, na grade inteira e na conta com pesos, por grupo;
  - os programas de todas as personas antes e depois, com cada mudança explicada; registro de teste que muda é mostrado ao Gustavo, nunca regravado em silêncio;
  - `npm run check` limpo e um commit pequeno, em pt-BR e no imperativo.
- **A cada pacote:**
  - `npm run auditoria` em duas rodadas, com os arquivos idênticos (o gerador continua determinístico);
  - a revisão cega: os mesmos perfis, a `main` e a versão nova embaralhadas, por treinadores independentes;
  - a simulação de meses refeita;
  - os doze exemplos atualizados;
  - **parada para o Gustavo**, com o antes e o depois.
- **Uma mudança que não melhora a medida não entra,** mesmo que pareça certa. Fica registrada com o número, para ninguém tentar de novo sem motivo.
- **Critério de pronto:**
  - os 20 cuidados medidos na régua (os que são mensuráveis), com o resultado por grupo numa tabela em `docs/revisoes/treino-para-todos/qa.md`;
  - nenhum defeito pior que na `main` em nenhum grupo, e o pior grupo melhor do que era;
  - a revisão cega com nenhuma persona pior e as notas médias maiores;
  - toda regra com selo, fonte e teste; nenhuma regra sem dono em `regras.md`;
  - `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos;
  - `src/engine/` e as telas sem mudança além do combinado.
- **Fechamento:** a entrada no `docs/devlog.md` (o retrato antes e depois, dois ou três exemplos de pessoas, a tabela da régua, a revisão cega e o rascunho de post), o `docs/backlog.md`, os pedidos ao design e à animação, e o resumo final para o Gustavo. Pare para a revisão dele; a junção com a `main` só com o ok.

## 4. Como falar com o Gustavo

Português, sem jargão; termo técnico inevitável, explicado em uma frase. Sempre com um exemplo de pessoa: "a Ana, que treina 3 dias de 45 minutos com halteres, recebia isto e passa a receber isto". Número com o tamanho do grupo ("em 13 de cada 100 programas"). Uma decisão por vez, com a sua recomendação e nada pré-marcado. Diga o que a ciência sabe, o que é costume de treinador e o que é aposta sua, sem misturar.

## 5. O que não fazer

- Não otimize para o caso do Gustavo, nem para a média: olhe a população e o pior grupo.
- Não mude regra sem fonte, nem com base em vídeo, blog ou no que "todo mundo faz" sem dar esse nome ao selo.
- Não troque o determinismo por texto livre de modelo, sorteio ou data.
- Não afrouxe a segurança para ganhar volume, variedade ou tempo.
- Não acrescente pergunta ao cadastro sem ganho medido e sem a decisão dele.
- Não esconda um limite do equipamento com um exercício improvisado e sem evidência.
- Não regrave registro de teste nem linha de base da régua para ficar verde.
- Não mexa no Boneco nem nas telas: o que precisar delas vira pedido escrito.
