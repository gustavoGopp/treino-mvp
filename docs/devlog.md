# Devlog

Diário do desenvolvimento em público. Uma entrada por marco.

---

## M0: Fundação (29/10/2026)

**O que mudou**
- Projeto criado com Vite + React + TypeScript, instalável como app (PWA), em pt-BR.
- Qualidade automática: lint, checagem de tipos, testes unitários (Vitest) e testes no navegador simulando um celular (Playwright). Tudo roda no CI a cada push.
- Teste de privacidade: o CI falha se qualquer dado pessoal, foto ou segredo for versionado.
- O guia de execução original (25 animações, 4 treinos) entrou em `referencia/` como ponto de partida. O QA dele continua passando: **0 falhas de IK** em todos os exercícios e erros.
- Plano do MVP aprovado em `docs/PLANO-MVP.md`, com regras do projeto em `CLAUDE.md` e licença "todos os direitos reservados".

**Decisões**
- **Vite em vez de Next.js.** O app roda inteiro no celular. O único serviço no servidor é enviar a foto para a IA, então montar páginas no servidor seria complexidade sem ganho.
- **Sem login no MVP.** Os dados ficam no aparelho (LGPD: dado de saúde é sensível), com exportação em JSON.
- **Etapa de pesquisa antes das regras (M0-R).** Antes de codar o gerador, cada regra de treino vai ser levantada com fonte e nível de evidência.

**No ar**
- Produção: https://treino-mvp-sigma.vercel.app (deploy automático a cada push na `main`, com pré-visualização em cada PR).
- CI verde na primeira rodada: https://github.com/gustavoGopp/treino-mvp/actions/runs/40935289634

**Imagens:** `img/m0-inicio.png` (o app vazio) e `img/m0-guia-original.png` (o guia que vai ser migrado).

**Rascunho de post para o LinkedIn**
> Comecei a construir em público um app de treino para quem treina com o que tem: academia de prédio, casa, academia pequena.
>
> A origem: mandei fotos da academia do meu prédio para o Claude, ele identificou os equipamentos, montou um programa de hipertrofia baseado em evidência e criou um guia animado de execução. Funcionou tão bem que virou projeto.
>
> Hoje foi o marco zero: projeto criado, testes automáticos e uma regra que me orgulha: o CI quebra se algum dado pessoal for parar no repositório.
>
> Duas decisões que valem para qualquer produto:
> 1. O treino sai de regras testáveis, não de texto livre de IA. A mesma entrada sempre gera o mesmo treino.
> 2. Antes de escrever as regras, vem uma etapa de pesquisa com fonte e nível de evidência em cada uma.
>
> Próximo passo: a pesquisa. Sigo contando por aqui.

---

## M0-R: Pesquisa (29/10/2026)

**O que mudou**
- `docs/pesquisa/` com 8 blocos (volume, intensidade, progressão, seleção, equipamento limitado, tempo, segurança, técnica), a tabela `regras.md` (77 regras com valor por nível, selo de evidência e fonte) e a bibliografia `fontes.md` (114 fontes).
- Um teste no CI garante que nenhuma regra fica sem selo ou fonte e que toda fonte citada está na bibliografia.
- Anexo de auditoria do programa de referência: o que se confirma, o que ajustar, o que muda. Nada é alterado sem aprovação.
- As divergências do guia foram resolvidas sem mexer nas animações: o texto do programa passa a seguir o guia na remada baixa (polia na altura do umbigo) e aceita as três pegadas na barra fixa.

**Decisões**
- **Selos honestos.** Das 77 regras, só 5 têm evidência robusta; 47 são consenso de treinadores. O app vai mostrar isso para quem usa, em vez de vender certeza.
- **Verificação pendente.** A rede desta sessão bloqueou PubMed e editoras, então as fontes foram conferidas por busca. 52 das 114 seguem marcadas "NÃO VERIFICADO" até a leitura do texto completo.
- **BFR fica fora**, porque pressupõe supervisão. Se aparecer sinal cardiovascular, o app encerra a sessão e orienta procurar o SAMU (192).

**Imagem:** não houve tela nova neste marco. O "visual" é a tabela de `docs/pesquisa/regras.md`.

**Rascunho de post para o LinkedIn**
> Antes de escrever uma linha do gerador de treino, fiz a pesquisa: 8 temas, 114 fontes e 77 regras, cada uma com um selo de evidência.
>
> A parte mais interessante foi descobrir o quanto a ciência *não* sabe:
> • Só 5 das 77 regras têm evidência robusta (volume semanal e proximidade da falha, por exemplo).
> • 47 são consenso de treinadores: progressão de carga, readaptação depois de uma pausa, deload.
> • Algumas "verdades de academia" não têm estudo nenhum, como a altura certa da polia numa remada.
>
> A decisão de produto: o app vai mostrar o selo de cada recomendação. Quem treina merece saber o que é ciência e o que é prática razoável.
>
> E quando a evidência é fraca, o app avisa em vez de inventar.

---

## M1: Motor de animação no app (29/10/2026)

**O que mudou**
- O motor do guia (um HTML de ~1.800 linhas) virou módulos TypeScript em `src/engine/`: matemática, esqueleto com IK, desenho, cena e **um arquivo por exercício** (26).
- Os textos dos exercícios (setup, execução, amplitude, respiração, cues, checklist, erros) saíram do código e foram para `src/conteudo/exercicios/*.json`, com validação em zod.
- Nova tela **`/guia/:id`** no app, com a mesma interface do guia: treinos, palco animado, fases e respiração, vistas, modos Técnica/Erros/Músculos/Trajetória, cues, checklist e detalhes.
- Três redes de segurança no CI:
  1. **Equivalência do motor:** 4.968 quadros (26 exercícios × vistas × modos × erros × 24 tempos) geram o mesmo SVG, caractere por caractere, que o guia original. O IK continua com 0 falhas.
  2. **Regressão visual:** o palco do app é comparado com o guia original (que serve de referência) em 208 situações, com **0 pixel de diferença**.
  3. **Conteúdo:** todo exercício animado tem texto, e todo erro animado tem título e descrição.

**Decisões**
- **Port mecânico, gerado por script** (`scripts/extrair-motor.mjs`), em vez de reescrever à mão. Reescrever é onde entram regressões; gerar por script deixa a mudança auditável e repetível.
- **A equivalência roda no Chromium, não no Node.** O Node usa outra versão do motor JavaScript, e algumas funções matemáticas diferem no último bit (15ª casa decimal). Isso mudava 9 quadros isolados. Testar no mesmo motor que gerou a linha de base elimina o falso alarme.
- **A remada baixa e a barra fixa ficam como estão nas animações**, conforme a pesquisa do M0-R. Só o texto do programa de referência muda, e isso fica para o M2.
- O temporizador de descanso volta no M5, junto com a tela de treino.

**Imagem:** `img/m1-guia.gif` (supino inclinado no app, modo Técnica).

**Rascunho de post para o LinkedIn**
> Migrar código sem quebrar nada: como tirei um motor de animação de um HTML de 1.800 linhas e coloquei num app, sem mudar um único pixel.
>
> 1. Antes de mexer, fotografei o original: 4.968 quadros, cada um guardado como uma "impressão digital" (hash).
> 2. Um script fez a migração mecânica. Ninguém reescreveu à mão, então não entrou nenhum "aproveitei e melhorei".
> 3. Um teste compara cada quadro novo com a impressão digital do original. Hoje o resultado é 4.968 de 4.968, e 0 pixel de diferença nas 208 telas comparadas.
>
> A surpresa: o mesmo código dava resultados diferentes no Node e no Chrome na 15ª casa decimal. O teste pegou isso no primeiro dia.
>
> Agora o guia animado é peça do app, e qualquer mudança futura na animação passa por essa rede de segurança.

---

## M2: O gerador de programa (29/10/2026)

**O que mudou**
- **Taxonomia de equipamentos** (25 itens) e **capacidades** derivadas do inventário. "Polia alta" vale tanto para a polia simples regulável quanto para a estação dupla. O app também calcula as cargas de halter possíveis com as anilhas disponíveis.
- **Biblioteca de 73 exercícios**, em dados validados. Os 25 que têm animação apontam para o guia; os outros aparecem como cartão de texto.
- **Regras:** `src/domain/regras/regras.json` é gerado direto de `docs/pesquisa/regras.md`, e um teste falha se os dois saírem de sincronia. Cada decisão do gerador guarda o id da regra que a justifica, com selo e fontes.
- **Gerador determinístico:** escolhe a divisão pelos dias, filtra por equipamento, nível e dor, escolhe os exercícios por padrão de movimento, distribui o volume (série indireta = meia série; teto por sessão), ordena, prescreve, corta para caber no tempo e monta a readaptação.
- **Triagem** no estilo do PAR-Q+ (qualquer "sim" bloqueia até a pessoa confirmar a liberação), escala de dor e sinais de alerta.
- **Progressão:** dupla progressão, incrementos (halter, placa de polia, escada de peso do corpo), salto grande, carga leve demais, estagnação e semana leve só sugerida.
- **Testes:**
  - 4 personas fictícias com snapshots;
  - 432 combinações de perfil × inventário testadas por propriedade (determinismo, equipamento, dor, complexidade, tempo, volume, porquê);
  - cobertura mínima de 90% no CI (hoje 99,8% das linhas).
- O programa de referência recebeu os ajustes aprovados da auditoria do M0-R.

**Resultado no caso real** (teste privado, fora do git): **25 de 25 exercícios** iguais ao programa montado à mão. A diferença de séries semanais por grupo ficou entre −2 e +2.

**Decisões**
- **Modelos de divisão como dados**, com preferências por vaga (ex.: "inclinado" na primeira vaga de peito). A escolha é auditável e fácil de testar.
- **Semana leve nunca automática**, como definido no escopo do MVP.
- **Ordem da sessão:** multiarticulares primeiro e, dentro de cada tipo, os grupos prioritários primeiro. Por isso, nos dias de pernas de quem prioriza superiores, a rosca vem antes da panturrilha. A pesquisa mostra que a ordem quase não muda a hipertrofia.
- **Tela `/dev/gerador`** para inspecionar o resultado. Ela só existe em desenvolvimento e não vai para o site publicado.

**Imagem:** `img/m2-gerador.png` (tela de inspeção: cada decisão com o seu selo de evidência).

**Rascunho de post para o LinkedIn**
> Quando o gerador de treino ficou pronto, rodei com o meu caso real: as fotos da academia do meu prédio e o meu perfil. Ele chegou nos mesmos 25 exercícios do programa que eu tinha montado à mão com o Claude, com diferença de no máximo 2 séries por grupo muscular.
>
> E sem usar IA para gerar o treino. São regras, dados e testes:
> • 73 exercícios, cada um com o equipamento que exige;
> • 77 regras, cada uma com um selo de evidência (só 5 são "robustas");
> • 432 combinações de perfil e equipamento testadas automaticamente: o mesmo pedido sempre gera o mesmo treino, ninguém recebe exercício para um equipamento que não tem, e ninguém com dor no joelho recebe exercício que carrega o joelho.
>
> Cada escolha no programa vem com o "porquê" e o selo da regra. A IA fica com o que ela faz melhor: reconhecer os equipamentos na foto.

---

## M2.1: Ajustes da revisão independente (30/10/2026)

Uma sessão separada, sem o contexto de quem escreveu o código, revisou três pontos do M2. Ela leu o código e a pesquisa, rodou os testes e fez experimentos próprios. O relatório está em `revisoes/2026-10-30-revisao-m2.md`. As quatro recomendações foram aprovadas e aplicadas:

1. **Ordem da sessão.** A ordem gerada estava boa, mas o texto da regra `ordem.sessao` descrevia outra. A regra agora diz o que o código faz: multiarticular → prioridade → modelo de divisão → core por último. Um teste de propriedade garante isso.
2. **Cortes de tempo que respeitam a prioridade.** Antes, a Ana (que prioriza pernas) recebia o mesmo volume com ou sem prioridade. Agora há um piso por músculo (prioritário: mínimo do nível; demais: 4, contando também a meia série indireta). Os cortes começam pelos não prioritários, e o passo "menos exercícios" voltou a funcionar. O app avisa, músculo por músculo, o que ficou abaixo da meta e se a causa é tempo ou equipamento. A panturrilha ganhou uma 2ª vaga nos modelos de 2 e 3 dias, e o aquecimento ficou mais realista. Resultado da Ana em quadríceps, posteriores, glúteos e panturrilha: de 6/6/6/4 para 8/6/7/6.
3. **Escolhas calculadas.** Quando o programa não atinge as metas ou não cabe no tempo, `opcoesDeAjuste` testa "+1 dia", "+15 min" e "um grupo prioritário a menos" e mostra só o que melhora. A tela fica para o M3.
4. **Regressão visual determinística.** O falso alarme vinha da rasterização do Chromium, que não é determinística. Agora ela roda num fio só, sem novas tentativas, com trace e artefato quando falha. Foram 78 de 78 testes em 3 rodadas locais (624 quadros), com 0 pixel de diferença.

A revisão também achou um defeito real: um corte de séries numa remada podia derrubar o deltoide posterior, que recebe volume indireto, abaixo do piso. Está corrigido e coberto por teste.

**Caso real** (teste privado): continua com 25/25 exercícios e diferença de ±2 séries por grupo.

---

## M3: Onboarding, inventário e programa (31/10/2026)

**O que mudou**
- **As primeiras telas de verdade.** A pessoa sai da primeira abertura com o programa pronto em 6 passos: boas-vindas e aviso, triagem, experiência, rotina, equipamento e restrições.
- **Triagem** com as 9 perguntas próprias do app. Qualquer "sim" pausa o programa automático e mostra o motivo; a pessoa só segue se confirmar que foi avaliada e liberada (o app guarda só a data, nada sobre o profissional). "Sim" apenas na pergunta osteoarticular pede as regiões e tira do programa os exercícios que as carregam.
- **Nível** calculado por uma função nova em `src/domain/nivel/` (tempo de treino contínuo, pausa e confiança na técnica). Na dúvida, para baixo; a pessoa pode baixar o nível, nunca subir.
- **Inventário por cartões com desenho** dos 25 itens, em 7 categorias, com os atributos que mudam a prescrição (faixa e passo dos halteres, anilhas, polia regulável, banco que declina, elásticos). Nada vem pré-preenchido. A foto ficou com o lugar reservado para o M4.
- **Tela do programa:** divisão, dias, séries × repetições, RIR, descanso, minutos estimados, fases, avisos de meta por músculo, alternativas, o "porquê" de cada decisão com o selo de evidência e o link para o guia animado (ou o cartão "animação em breve").
- **Ajustes calculados na tela.** Quando o programa fica abaixo da meta ou passa do tempo, a pessoa vê as opções ("4 treinos de 50 min", "3 treinos de 65 min"…) com o que cada uma resolve. Nenhuma vem pré-selecionada; escolher uma gera o programa de novo.
- **Dados no aparelho:** IndexedDB com esquema versionado, migração testada e pedido de armazenamento persistente. Exportação e importação em JSON, com validação; um arquivo inválido não altera nada.
- **Acessibilidade:** Lighthouse 100 em acessibilidade nas 8 telas (celular), alvos de toque de 44 px ou mais, foco visível, rótulos sempre visíveis e `prefers-reduced-motion`. Um token de cor novo para links resolveu o único problema de contraste sem mexer no guia (que continua com 0 pixel de diferença).

**Decisões (com pesquisa)**
As 8 perguntas do plano foram respondidas por pesquisa, não por preferência. O documento está em `pesquisa/09-decisoes-m3.md`. Duas recomendações mudaram:
- **Sem exemplo dentro do campo.** Testes da Nielsen Norman Group mostram que o placeholder some ao digitar e atrapalha; o exemplo virou texto de ajuda acima do campo.
- **Nenhum ajuste pré-selecionado.** Numa meta-análise com 58 estudos, a opção pré-marcada é escolhida bem mais vezes; pré-marcar seria decidir pela pessoa.

E um alerta registrado no backlog: a nossa triagem é mais rígida que o PAR-Q+ oficial, que faz perguntas de acompanhamento antes de encaminhar. Cerca de 28% dos adultos das capitais têm hipertensão diagnosticada (Vigitel 2023), e todos cairiam no bloqueio.

**Decisão do Gustavo:** todos os exercícios terão animação. A pesquisa apoia: numa meta-análise de 26 estudos, a animação ensinou movimento melhor que imagens paradas, com vantagem maior em tarefas motoras. Os 48 exercícios que faltam entram no próximo marco, em 4 lotes revisados.

**Defeitos que os testes pegaram antes de você ver**
- Depois de importar, o app dizia "há uma versão nova do seu programa" sem mudança nenhuma: o zod devolve as chaves em outra ordem. A comparação agora ignora a ordem.
- Ao recarregar, os formulários abriam vazios porque liam o estado antes do IndexedDB terminar. As telas agora só aparecem depois da carga.

**Ajustes depois da revisão do Gustavo (31/10)**
- **Pausa sem contar semanas.** "Há quantas semanas está sem treinar?" virou 4 opções de um toque (treinando, ~2 semanas, 3 semanas a 6 meses, mais de 6 meses), alinhadas aos limites de readaptação e de nível. Um teste garante o alinhamento.
- **Equipamento por desenho.** Os 25 itens viraram cartões com um desenho simples, para quem não sabe o nome do aparelho. Os detalhes são por toque: valores comuns de halter e manopla (com "Outro"), anilhas com contador de pares por peso, manoplas e elásticos com um toque.
- **Treino direto ao ponto.** A tela do programa abre no treino: abas por dia e um cartão por exercício com a imagem do guia (no modo músculos), séries × repetições em destaque e descanso. Tocar no cartão abre o guia animado. Ajustes viram uma faixa com "Ver opções"; avisos, porquês e volume ficam em "Sobre o programa".

**GIF:** `img/m3-jornada.gif` (a persona fictícia Ana, do zero ao programa).

**Rascunho de post para o LinkedIn**
> Até ontem, o app de treino que estou construindo em público tinha um "cérebro" (77 regras com fonte, 73 exercícios, 432 combinações testadas) e nenhuma tela. Hoje ele ganhou as primeiras telas: em 6 passos, a pessoa sai com um programa de hipertrofia montado só com o equipamento que tem.
>
> Antes de desenhar, pesquisei cada decisão de interface como pesquiso as de treino. Duas coisas mudaram por causa disso:
> • nenhum campo traz exemplo dentro dele, porque testes com usuários mostram que isso atrapalha mais do que ajuda;
> • quando o programa não cabe no tempo, o app mostra as opções ("4 treinos de 50 min" ou "3 de 65 min"), mas não marca nenhuma. A opção pré-marcada é escolhida muito mais vezes, e a decisão tem que ser de quem treina.
>
> Tudo fica no celular da pessoa. Sem login, sem servidor, com exportação em um arquivo.
