# Prompt: o treino novo (a qualidade do programa recomendado, revista de ponta a ponta)

> Escrito em 12/11/2026, a pedido do Gustavo, na mesma linha do `sessao-frontend-novo.md` e do `sessao-animacao-nova.md`. Aqueles refazem as telas e o Boneco; este cuida do coração do app: o treino que o gerador recomenda. As três sessões podem correr em paralelo, cada uma no seu ramo. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir a sessão do **treino novo** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**O pedido do Gustavo (12/11/2026).** Rever por completo a qualidade do treino recomendado: a quantidade (séries, dias, minutos), os exercícios escolhidos, a eficiência, a progressão e tudo mais que você entender que vale desenvolver. Nas palavras dele: **este é o coração do app; sem um bom treino recomendado, todo o resto se torna ineficiente.** O objetivo é que um bom treinador, olhando a semana de qualquer pessoa sem saber de onde ela veio, assine embaixo.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Ele decide o produto; as decisões técnicas são suas, sempre com o motivo, a fonte e o efeito medido.

**O gerador de hoje é rascunho.** Tudo no treino está liberado para ser questionado: as metas de volume por músculo e por nível, como se conta a série indireta, as divisões e a frequência, a tabela de funções e a ordem de escolha dos exercícios, os desempates, as faixas de repetição, o esforço e o descanso, os cortes de tempo e o uso do tempo que sobra, as técnicas de economia de tempo, a progressão e a semana leve, o que muda com o nível, o objetivo, o foco, a dor e o equipamento, a própria biblioteca de exercícios, e também **os instrumentos que medem tudo isso** (a régua e o avaliador), porque foram feitos pelo mesmo projeto que eles julgam. O que o projeto já tem de valioso é a pesquisa lida, as regras com fonte, as medidas e as decisões do Gustavo: é o ponto de partida, não se joga fora nem se repete.

**O que não está liberado** são os princípios do `CLAUDE.md`. Em resumo:
- **Evidência.** Toda regra tem número, selo e fonte (`docs/pesquisa/00-metodo.md`). O selo vai para o número, não para o tema. Nada de inventar estudo; fonte não lida no original aparece como não verificada. Opinião de treinador é "consenso", nunca mais que isso. "Liberado" quer dizer liberado para mudar **com fonte e medida**, não por gosto.
- **Determinístico e testável.** O treino sai de regras e dados, nunca de texto livre de um modelo. A mesma entrada gera a mesma saída. Sem `Math.random` nem `Date.now` em `src/domain/`.
- **Segurança.** A triagem, a dor e as restrições continuam mandando. O app não diagnostica.
- **Dados separados do código,** validados com zod.
- **Escopo.** Só treino de força. Nutrição, cardio prescrito e deload automático continuam fora do MVP: se a pesquisa mostrar que algum deles pesa muito no resultado, registre e leve ao Gustavo como decisão, sem implementar.
- **Privacidade.** Só personas fictícias nos testes e nos documentos. `privado/` nunca é versionado.

## 0. Antes de começar

1. Confirme onde você está: `git rev-parse --show-toplevel` e `git branch --show-current`. Se o ramo for `main`, pare e crie um ramo novo a partir dela antes de qualquer mudança.
2. Leia o `CLAUDE.md` e o `docs/PLANO-MVP.md`.
3. Leia o que o projeto já sabe, para não repetir pesquisa nem reabrir decisão sem motivo novo:
   - `docs/pesquisa/00-metodo.md`, `regras.md` e `fontes.md`; os temas de `docs/pesquisa/` e de `docs/pesquisa-v2/` (que prevalece onde houver conflito), com o `PLANO-DOS-TEMAS.md`;
   - `docs/revisoes/auditoria-treino.md`, `auditoria-fable.md`, `qualidade-treinos.md`, `proximos-passos.md` e a pasta `proximos-passos/` (as 7 frentes, em especial a qualidade, o longo prazo e a biblioteca ampliada, com as revisões cegas);
   - `docs/revisoes/qualidade/` (a régua, a grade, o avaliador, o caso do Gustavo) e `docs/revisoes/auditoria/`;
   - no `docs/devlog.md`, as entradas da qualidade dos treinos, do R5-CL, do R5d, do R5a e do R5b;
   - no `docs/backlog.md`, tudo o que é do gerador e da progressão: **é a lista do que já se sabe que está fraco.** Entre outros: nada para puxar sem equipamento; o avançado sem carga com agachamento de 12 a 20; os halteres leves demais; o tempo que sobra sem uso na academia completa; os dias de 30 min acima do tempo; o mesmo exercício todos os dias no corpo todo de 6 dias; a barra só na descida em todos os dias; o desempate entre equivalentes pela ordem do nome; o foco nas pernas que não cabe; a fita e a mini-band pouco usadas; os gatilhos da semana leve e do "estagnado"; a revisão por um profissional de Educação Física, que ficou de lado.
4. Percorra `src/domain/` inteiro (o gerador, as funções e famílias, as divisões, a biblioteca, as regras, a progressão e as escadas, a sessão, o acompanhamento, o avaliador, o nível, a triagem), `scripts/auditoria/` e `tests/personas/`.
5. Rode `npm run check` e `npm run auditoria` e guarde os números de partida.
6. Em até 5 linhas, diga ao Gustavo o que entendeu e o plano da etapa 1. Não precisa esperar o ok para pesquisar: a parada obrigatória é no fim da etapa 1.

## 1. Regras de isolamento

- **Ramo próprio.** Nunca faça commit, merge ou push na `main`. A ida para a `main` é só com o ok do Gustavo, por merge sem forçar, avisando para exportar os dados do app antes ("Meus dados" → "Guardar uma cópia").
- **Conta.** Só as contas pessoais do Gustavo, nunca a da Futurum. Tudo fica no git, e só no git.
- **Pode alterar:** `src/domain/`, os textos que saem das regras, `docs/pesquisa/` e `docs/pesquisa-v2/` (temas novos na numeração de lá), `scripts/auditoria/`, `tests/unit/`, `tests/personas/` e a pasta nova `docs/revisoes/treino-novo/`.
- **Não altere:** `src/engine/` e as animações (são da sessão da animação nova), as telas e o `src/styles.css` (são da sessão do frontend novo), `api/` e o `CLAUDE.md`. O que o treino novo precisar mostrar na tela vira pedido em `docs/revisoes/treino-novo/pedidos-ao-design.md`; até lá, use os componentes de hoje no mínimo necessário.
- **O estado guardado** (`src/storage/`): quem já usa o app não pode perder os dados nem o histórico. Mudança no estado é decisão separada do Gustavo, com migração e teste.
- **Exercício novo na biblioteca** entra com ficha, fonte e cartão de texto, nunca com animação. Anote na fila de animação com a frequência medida.
- **Os testes de ponta a ponta** que conferem o conteúdo de um programa podem mudar quando o programa muda: diga quais e por quê. Nunca apague nem pule um teste para ficar verde.
- **Antes de fechar cada etapa,** veja o que mudou na `main` (`git fetch origin main` e `git diff`, só leitura).
- **Limite de uso.** Pesquisa em lotes de no máximo 4 subagentes por vez, cada um gravando o resultado em arquivo antes de responder.

## 2. Etapa 1: pesquisa, retrato e proposta (termina com parada para o Gustavo)

### 2.1 Pesquisa

Procure nas fontes mais diversas possíveis; o objetivo é chegar às regras finais com as melhores referências, não com as primeiras. A base do projeto é de fins de outubro e começo de novembro de 2026: procure primeiro **o que saiu ou mudou desde então** e **o que a base não cobre**. Os nomes abaixo são pontos de partida para conferir, não fatos.

- **Literatura científica** (PubMed, PMC, Crossref; rede liberada): meta-análises, revisões e ensaios sobre volume e dose-resposta, frequência, proximidade da falha, faixas de repetição, descanso, amplitude e treino em posição alongada, crescimento por região do músculo, escolha e variação de exercícios, ordem, técnicas de economia de tempo (bi-set, drop set, descanso-pausa), dose mínima eficaz, progressão de carga, estagnação e semanas leves, treino com o peso do corpo e com elástico, carga leve levada perto da falha, iniciantes, pessoas mais velhas, diferenças entre homens e mulheres, manutenção de músculo na dieta, força máxima, adesão e desistência.
- **Posicionamentos e diretrizes** de associações (ACSM, NSCA e afins) e consensos publicados.
- **Programas de referência:** os protocolos de ensaios publicados (o projeto já tem 4 em `tests/unit/programas-publicados.ts`) e os programas mais recomendados por treinadores com formação e por comunidades (inclusive os de peso do corpo e de equipamento mínimo). Servem de comparação e de "consenso", nunca de regra por si.
- **Treinadores e divulgadores que citam fonte** (blogs, boletins de revisão de pesquisa, vídeos com credencial): para achar estudo, para o consenso de prática e para as críticas ao que os estudos não cobrem.
- **Reddit, X, Hacker News e fóruns de treino:** o que as pessoas reclamam dos programas gerados por app (longo demais, repetitivo, exercício estranho, progressão que trava), e por que largam.
- **Produtos de referência:** como os melhores apps de treino montam, ajustam e fazem progredir o programa (só por páginas públicas, artigos, análises e documentação publicada).

Regras da pesquisa:

- Só páginas públicas. Nada de login, área paga, CAPTCHA ou contorno de bloqueio.
- Cada fonte entra em `docs/pesquisa/fontes.md` com o status de leitura; cada conclusão recebe exatamente um selo. Estudo de ativação elétrica do músculo (EMG) não prova crescimento.
- Onde a fonte nova contradiz uma regra de hoje, registre o conflito, o que cada lado sustenta e a sua leitura. Não troque a regra em silêncio.
- Subagentes de busca e leitura em modelo mais simples, com `model` explícito e briefing autossuficiente. A síntese é sua. Um subagente crítico, sem ver a sua síntese, confere as afirmações mais importantes na fonte.

Meta: pelo menos 60 fontes novas úteis, de pelo menos 6 tipos, registradas por tema em `docs/revisoes/treino-novo/referencias.md` e nos temas de `docs/pesquisa-v2/`.

### 2.2 Princípios obrigatórios

A pesquisa pode acrescentar, não tirar.

**A. Toda mudança tem fonte, número e efeito medido**

- **A regra primeiro:** nenhuma linha do gerador muda antes de a regra estar em `docs/pesquisa/regras.md`, com selo e fonte.
- **Nenhuma mudança sem o antes e o depois:** das personas (as 6 de sempre e as 12 da régua, em `tests/personas/`) e da grade inteira (`npm run auditoria`).
- **A régua em dois níveis:** nenhum defeito pode piorar em relação à `main`; uma mudança só entra se melhora alguma nota. O custo (o que piora) é sempre mostrado.
- **A régua não se move junto com o gol.** Se a régua ou o avaliador precisarem mudar (um defeito que eles não veem, um limite sem fonte), isso é um pacote próprio, aprovado antes: mede-se a `main` com a régua nova, e só depois se mexe no gerador.
- **Validação de fora, além dos números:** revisão cega por treinadores simulados (subagentes no modelo mais capaz, cada um só com as semanas embaralhadas e um briefing, sem saber qual versão é qual), comparação com os programas de referência, e um roteiro pronto para um profissional de Educação Física de verdade olhar, se o Gustavo quiser. Revisão simulada é opinião, não evidência, e fica marcada assim.
- **Honestidade:** quando o equipamento, o tempo ou a dor não deixam o treino ser bom, o app diz o que falta e o próximo passo, em vez de fingir.

**B. Vinte perguntas que um bom treinador faria olhando a semana**

1. Cada músculo recebe séries suficientes para crescer, e nenhum recebe mais do que rende?
2. O foco que a pessoa escolheu aparece de verdade?
3. O corpo está equilibrado (empurrar e puxar, frente e trás da coxa, um lado e o outro)?
4. Cada músculo grande é treinado em mais de um movimento, incluindo um que o trabalhe alongado, quando o equipamento permite?
5. Cada exercício é o melhor possível com o que a pessoa tem, e o desempate tem motivo de treino (não a ordem do nome)?
6. O exercício é do nível da pessoa: nem difícil demais para aprender, nem fácil demais para render?
7. A carga disponível serve? Quando o halter é leve demais ou o salto entre pesos é grande demais, há uma saída (mais repetições perto da falha, um lado por vez, cadência, um degrau mais difícil)?
8. A ordem dentro do treino faz sentido?
9. A combinação do dia faz sentido (nada de exercício perdido no dia errado, nem um músculo pequeno com todas as séries empilhadas num dia só sem motivo)?
10. O dia cabe nos minutos de verdade, contando aquecimento, troca de aparelho e descanso?
11. O tempo é bem gasto: usa o que a pessoa tem, e as técnicas de economia de tempo aparecem só para quem e onde cabem?
12. As repetições, o esforço e o descanso são os certos para aquele exercício e aquele objetivo?
13. A frequência de cada músculo e a recuperação entre os dias estão certas?
14. Há variedade suficiente para não enjoar e constância suficiente para progredir?
15. A progressão diz o que fazer na próxima vez e funciona por meses: o que acontece quando trava, quando falta, quando a faixa de repetições estoura, quando é hora de trocar um exercício ou de uma semana leve?
16. A primeira semana do iniciante é segura e dá para aprender? A volta depois de faltar também?
17. Com dor ou restrição, o programa contorna sem esvaziar o treino?
18. Os quatro objetivos (ganhar músculo, manter na dieta, ficar mais forte, saúde) mudam o treino de fato, cada um como a evidência pede?
19. Quando não cabe ou falta equipamento, o app diz com clareza e dá o próximo passo?
20. A pessoa vai querer voltar amanhã? (duração, esforço percebido, exercícios de que gosta: adesão também é resultado)

### 2.3 O que entregar no fim da etapa 1

Tudo em `docs/revisoes/treino-novo/`:

- **`referencias.md`:** a pesquisa, por tema, com o que confirma, o que contradiz e o que acrescenta às regras de hoje.
- **`retrato.md`:** o treino de hoje, medido:
  - **regra por regra** (todas as de `regras.md`): o selo ainda vale? a fonte foi lida? há evidência nova? o número é da fonte ou é escolha do projeto?
  - **a régua e o avaliador contra a pesquisa:** o que eles medem bem, o que não veem, que limite não tem fonte;
  - **as 18 personas e a grade** à luz das 20 perguntas, com exemplos concretos de semanas boas e ruins;
  - **a comparação com os programas de referência** (o que os bons programas fazem e o app não faz, e o contrário);
  - **uma revisão cega de partida** (as 18 semanas de hoje, por 3 treinadores simulados independentes), para ter a linha de base da opinião;
  - **o longo prazo simulado:** o que o app recomenda a uma pessoa fictícia ao longo de 6 meses de registros simulados (progride? trava? repete para sempre?);
  - os problemas em ordem de gravidade × frequência (em quantos programas aparece, e quanto pesa no resultado).
- **`proposta.md`:**
  - as mudanças em **pacotes**, do maior efeito para o menor, cada um com a regra, o selo, a fonte, o efeito esperado, o custo e o risco;
  - para os 3 ou 4 pacotes mais importantes, **um protótipo medido** (num ramo ou script descartável): a régua antes e depois e as semanas das personas que mudam;
  - o que foi considerado e descartado, e por quê;
  - o que fica fora do MVP, mas a pesquisa mostrou que pesa;
  - os pedidos ao design e ao estado guardado;
  - as decisões que dependem do Gustavo, uma por vez, com a recomendação.
- **`semanas/`:** uma página HTML simples, para ele abrir no celular, com a semana de 6 personas **antes e depois** lado a lado em linguagem de gente (o nome do exercício, as séries, os minutos, o que mudou e por quê, em uma frase). O Gustavo não é da área e decide olhando: esta página é a parte mais importante da entrega.

Faça commit no ramo desta sessão, com push, e pare. Relate em linguagem simples, em poucas linhas: os 3 maiores problemas do treino de hoje, os pacotes propostos, a sua recomendação de ordem e os caminhos completos dos arquivos. Espere a escolha dele.

## 3. Etapa 2: os pacotes, um por vez (só depois do sim do Gustavo)

- **Para cada pacote aprovado, nesta ordem:** a regra em `regras.md`; o teste que falha; a mudança no domínio; `npm run check`; a grade e a régua (antes e depois, com o custo); as 18 personas (antes e depois); a revisão cega; o texto do "por quê" e dos avisos; um commit pequeno, em pt-BR e no imperativo.
- **Pare ao fim de cada pacote** e mostre ao Gustavo o que mudou nas semanas, com a página de antes e depois. As mudanças nos programas das personas (os registros de teste) são aprovadas por ele.
- **Se um pacote piorar um defeito ou a revisão cega,** não entra como está: meça as saídas, escolha com o motivo, ou devolva ao backlog com o número.
- **Critério de pronto:**
  - todos os pacotes aprovados feitos, cada um com a medida;
  - nenhum defeito da régua pior que na `main`; mais programas sem nenhum defeito do que hoje;
  - na revisão cega final, as notas "eficiente" e "adequada" maiores que as de partida, e nenhuma persona pior em mais de uma rodada;
  - as 20 perguntas respondidas persona por persona numa tabela em `docs/revisoes/treino-novo/qa.md`, com o que ainda é "não" e por quê;
  - nenhuma regra sem selo e fonte; `npm run check`, `npm run test:e2e` e `npm run auditoria:verificar` limpos;
  - `src/engine/` e as telas sem mudança além do mínimo combinado.
- **Fechamento:** a entrada no `docs/devlog.md` (o antes e o depois de um caso, a tabela da régua, a revisão cega, o rascunho de post), o `docs/backlog.md` atualizado (o que saiu da lista e o que entrou), os pedidos ao design, o aviso do que muda no programa de quem já usa o app, e o resumo final para o Gustavo. Pare para a revisão dele; a junção com a `main` só com o ok.

## 4. Como falar com o Gustavo

Português, sem jargão; termo técnico inevitável, explicado em uma frase. Evidência sempre: o número, a semana de antes e de depois, o caminho do arquivo. Diga o nível de evidência em palavras simples ("vários estudos apontam", "um estudo só", "é prática de treinador"). Uma decisão por vez, com a sua recomendação e nada pré-marcado.

## 5. O que não fazer

- Não mude regra sem fonte, nem número sem medida.
- Não troque o determinismo por texto livre de modelo, em nenhuma parte do treino.
- Não mude a régua para o resultado ficar bonito.
- Não trate opinião de treinador simulado, vídeo ou fórum como evidência.
- Não aumente o treino por aumentar: mais séries e mais minutos só onde a evidência e o tempo da pessoa pedem.
- Não zere músculo nenhum por causa do foco, nem contorne a triagem, a dor ou as restrições.
- Não ponha exercício improvisado sem pesquisa de segurança (porta com toalha, mesa, batente já foram recusados com motivo: reabra só com fonte nova).
- Não mexa no Boneco, nas animações nem nas telas.
- Não mude o estado guardado sem decisão separada.
