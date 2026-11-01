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

---

## Animações novas: a primeira (01/11/2026)

- **Remada unilateral com halter apoiada no banco**, a primeira animação criada depois do guia original. Ela aparece nos 3 dias do programa da Ana. Tem ficha de técnica com fontes (`pesquisa/animacoes/remada-unilateral.md`), 2 vistas, 3 erros e 0 falhas de cinemática. O Gustavo aprovou.
- **Processo para as próximas 47** (`pesquisa/animacoes/README.md`): pesquisa → poses → verificação automática → folha de contatos (`node scripts/folha-animacao.mjs <id>`) → aprovação → linha de base.
- **Animações aprovadas ficam congeladas.** A regressão do motor ganhou uma linha de base para as animações novas (`tests/visual/linha-de-base/novas.json`). Uma animação no motor sem linha de base aprovada faz o CI falhar.

**Imagem:** `img/anim-remada-unilateral.png` (folha de contatos).

---

## M5: Treinar com o app (01/11/2026)

**O que mudou**
- **Treino do dia.** O programa abre no próximo treino da rotação (A → B → C), com o botão "Começar o treino". A tela mostra a prescrição da semana em que a pessoa está (na fase de aprendizado, menos séries e RIR 3–4).
- **Um exercício por vez**, com a imagem do guia, a meta (séries × repetições × RIR), o lembrete de aquecimento no primeiro multiarticular de cada região e o link "Ver como fazer".
- **Registro de cada série com um toque:** carga conforme o equipamento (só as cargas de halter que o inventário permite; placa na polia; degrau da escada no peso do corpo e no elástico), repetições com − e + e RIR em 5 botões. A série seguinte já vem com os valores da anterior.
- **Temporizador de descanso** portado do guia original: começa sozinho depois da série, com bipes, vibração, ±15 s e pedido de tela ligada. Conta pelo horário de término, então continua certo se o celular bloquear.
- **"Senti algo":** dor no peito, falta de ar, tontura ou batimento irregular encerram o treino e orientam ligar para o SAMU (192). Dor articular aguda, formigamento ou perda de força encerram o exercício e oferecem a alternativa. A nota de dor segue a escala de 0 a 10. O app não diagnostica.
- **Trocar exercício** (equipamento ocupado ou dor) vale só para aquela sessão, e o histórico guarda o que de fato foi feito.
- **Fim do treino:** resumo e, para cada exercício, a sugestão da próxima vez (subir, manter, reduzir, voltar ou estagnado), com o motivo e a regra. No treino seguinte, a carga sugerida aparece no topo.
- **Dados:** o histórico entra no estado salvo (esquema versão 2). Foi a primeira migração real (da versão 1 para a 2), com teste. O treino em andamento sobrevive a fechar o app.
- **Testes:** 219 unitários; 5 E2E novos (sessão completa, retomar treino, troca, dor > 5, dor no peito). Lighthouse com acessibilidade 100 nas telas do treino.

**Decisões (com pesquisa, em `pesquisa/10-decisoes-m5.md`)**
- Rotação em vez de dia fixo da semana: o que importa é o volume semanal e treinar cada músculo ~2x por semana, não o dia exato.
- A dica de RIR avisa que as pessoas costumam subestimar a reserva em ~1 repetição, mas o app não corrige o número sozinho.
- Na primeira sessão de cada exercício, o app não sugere carga. O peso inicial sugerido vai para o replanejamento depois do M4.

**GIF:** `img/m5-treino.gif` (a Ana registra duas séries, descansa e vê o resumo).

**Rascunho de post para o LinkedIn**
> O app de treino agora serve para treinar. Abro o treino do dia, vejo o exercício com a animação, marco carga, repetições e quantas ainda conseguiria fazer, e o descanso começa sozinho, com bipe e vibração.
>
> No fim, cada exercício recebe a sugestão da próxima vez: subir a carga, manter ou reduzir, sempre com o motivo e a regra. A regra principal é a dupla progressão: primeiro as repetições sobem; quando todas as séries chegam ao topo da faixa por 2 treinos seguidos, a carga sobe.
>
> E tem um botão "Senti algo". Dor no peito ou tontura encerram o treino e orientam ligar para o 192. Dor numa articulação encerra só aquele exercício e oferece uma alternativa. O app não diagnostica, mas também não deixa ninguém "treinar com dor 7".

---

## M4: Foto do equipamento (01/11/2026)

**O que mudou**
- **Reconhecer pela foto.** Na tela do equipamento, a pessoa digita o código de convite e escolhe até 5 fotos. O app mostra o que encontrou, com o motivo ("foto 1, no batente"), e a pessoa responde "Tenho" ou "Não tenho" para cada item. Só entra na lista o que ela confirmar; a lista por desenhos continua lá.
- **Privacidade no aparelho.** Antes de sair do celular, cada foto é reduzida para no máximo 1.568 px e regravada como um JPEG novo, o que descarta os metadados (câmera, data e GPS). Um teste monta uma foto com GPS e confere que o que chega ao servidor não tem esses dados.
- **Uma função no servidor** (`api/vision.ts`): confere o convite, o limite por aparelho e por IP e o tamanho das fotos; chama o Claude com saída estruturada (só os 25 ids da taxonomia são possíveis); valida a resposta de novo e devolve as sugestões. Não guarda nada, e o log não leva imagem. Se o modelo recusar, a API refaz o pedido em outro modelo; se mesmo assim falhar, o app volta para a lista.
- **Testes:** validação da resposta do modelo, regras do pedido (convite, limite, formato, erros), EXIF fora da foto, fluxo completo com a API simulada e a garantia de que a chave não aparece no código do navegador.
- **Eval pronto para rodar** (`npm run eval:visao`): mede recall, precisão, falsos positivos graves, custo e tempo dos modelos Haiku 5.5, Sonnet 5.5 e Opus 5.5 com as fotos e o gabarito de `privado/`.

**Decisões (em `pesquisa/11-decisoes-m4.md`)**
- 1.568 px no lado maior: menos tokens por foto e 5 fotos cabem no limite da função. Os modelos mais novos aceitam até 2.576 px; o eval pode medir se ajuda a ler os números dos halteres.
- Modelo padrão: Opus 5.5, trocável por variável de ambiente. Pelo plano, fica o mais barato que atingir recall ≥ 85% e precisão ≥ 90%; a escolha sai do eval.
- O limite diário fica na memória da função, o que basta para o beta fechado com convite. Antes de abrir o beta, ele vai para um contador compartilhado (anotado no backlog).

**Imagem:** `img/m4-foto.png` (sugestões da foto com "Tenho / Não tenho"; persona fictícia e API simulada).

**Para funcionar em produção (depende do Gustavo):** cadastrar `ANTHROPIC_API_KEY` e `CONVITES` na Vercel, definir o teto de gasto no console da Anthropic e rodar o eval com as fotos reais. Até lá, a foto responde "ainda não está configurado" e a lista funciona normalmente.

**Rascunho de post para o LinkedIn**
> Agora dá para tirar foto da academia e o app sugere os equipamentos. Mas ele só sugere: cada item aparece com o motivo ("foto 1, no batente") e a pessoa responde "tenho" ou "não tenho". Nada entra no treino sem confirmação.
>
> E a foto sai do celular sem a localização. Antes do envio, o app redesenha a imagem e grava um arquivo novo, o que apaga os dados de câmera, data e GPS. Escrevi um teste que monta uma foto com GPS e confere que o servidor nunca recebe essa informação.
>
> Próximo passo: medir o acerto com as fotos reais da academia e escolher o modelo mais barato que acerta pelo menos 85% dos equipamentos sem inventar o que não existe.

---

## Animações: lote 1 aprovado (01/11/2026)

O Gustavo aprovou mais 5 animações: **panturrilha no chão, abdominal no chão, rosca alternada, tríceps francês com halter e stiff unilateral**. Com a remada unilateral, são 6 animações novas, todas com 0 falhas de cinemática e congeladas na regressão visual (`tests/visual/linha-de-base/novas.json`). Agora a persona Ana tem animação em quase todos os exercícios do programa. As fichas com as fontes estão em `pesquisa/animacoes/`, e três estudos foram conferidos no PubMed (Maeo 2023, Kassiano 2023 e 2025).

---

## Replanejamento (01/11/2026)

Uma sessão de estudo, sem código novo, revisou o projeto inteiro. Ela usou o app como as personas fictícias, rodou os testes e o gerador e pesquisou cada ideia. O diagnóstico está em `planejamento/2026-11-diagnostico.md`. Os documentos intermediários foram depois consolidados:
- `2026-11-diagnostico.md`: o diagnóstico;
- as decisões, incorporadas ao `PLANO-MVP.md`;
- a avaliação de equipamentos, levada para `pesquisa-v2/03-universo-de-equipamentos.md`.

**O que o diagnóstico encontrou**
- A base técnica é sólida: 239 testes unitários, 21 testes no navegador e 99,8% das regras cobertas.
- **Três problemas que confundem quem treina** passavam em todos os testes:
  - marcar "ombro" na triagem tirava todos os exercícios de peito, costas e ombros;
  - o guia mostrava a prescrição do programa de referência, e não a da pessoa;
  - alguns textos diziam o contrário do app.
- **O app não percebe pausas durante o uso.** Depois de um mês parada, uma persona recebia mais séries e mais esforço, quando a regra de readaptação manda o contrário.
- **Numa academia completa, o gerador usa 32 dos 60 exercícios possíveis.** As máquinas ficam em 8%, e a cadeira extensora nunca entra, porque os modelos de cada dia copiam o programa de referência.

**Decisões do Gustavo**
- O público principal é ele mesmo. Família e amigos podem testar, mas o plano não depende disso.
- O sucesso passa a ser medido pelo uso dele e pelo acompanhamento do progresso no app: treinos feitos, séries por músculo, carga depois de faltar.
- O cadastro deve levar até 1 minuto para quem não tem condição de saúde nem dor, com um botão "academia completa".
- O boneco atual fica, e um boneco diferente será testado num exercício para comparar.
- A revisão por profissional de Educação Física e a triagem com perguntas de acompanhamento ficam de lado.
- Foto do corpo, biotipo, idade, peso e sexo no perfil: não agora.
- **Primeiro passo:** aproveitar melhor o equipamento disponível (marco R0), antes das correções (R1) e do acompanhamento (R2).

O `PLANO-MVP.md` recebeu os critérios (seção a) e os marcos (seção i) novos. Os antigos ficam no mesmo arquivo, para histórico.

**Atualização (01/11/2026, mais tarde).** O Gustavo pediu um passo atrás antes de qualquer código: refazer a base do programa com um estudo aprofundado, para todos e para ele, sem tomar como certo o programa pessoal de referência.
- **Novo marco P (pesquisa v2),** em `docs/pesquisa-v2/`.
- **O critério "repetir 80% do programa de referência" saiu.** Agora o critério é "só regras com selo e fonte, com revisão da montagem".
- **Novidade de método:** a rede desta sessão abre o PubMed, e os estudos passam a ter o resumo oficial lido.
- **Primeiros resultados:**
  - divisão dividida ou corpo todo dá o mesmo crescimento com o mesmo volume (meta-análises de 2019, 2024 e 2026), então a divisão vira uma escolha da pessoa entre opções equivalentes;
  - as regras numéricas do app foram confirmadas pela evidência mais recente (ACSM 2026, Pelland 2026), com 4 ajustes propostos;
  - foi montado um universo de cerca de 45 equipamentos.

---

## R0b: O gerador com a divisão escolhida e as vagas por função (01/11/2026)

**O que mudou**
- **A divisão é escolhida pela pessoa.** São 12 opções, de 2 a 6 dias, na ordem da pesquisa (`pesquisa-v2/01`). Na rotina, um passo opcional, "Como prefere dividir?", mostra quantas vezes cada músculo treina e quantos exercícios cabem por treino. A recomendada vem explicada e nada vem marcado; se a pessoa pular, vale a recomendada. A clássica (ABC, ABCD, ABCDE) só aparece quando as metas cabem em 1 treino por músculo, com o aviso de que faltar a um dia tira a semana daquele músculo. 6 dias passa a ser aceito.
- **Cada vaga pede uma função, não um aparelho.** Os modelos de dia viraram listas de funções (agachar, flexão de joelho, tríceps acima da cabeça…). A tabela 2.1 do T7 virou dado validado (`src/domain/gerador/funcoes.json`), em níveis: o 1º é a 1ª escolha, e máquina e peso livre valem o mesmo. Saiu o campo `ordem` da biblioteca, que era cópia do programa de referência. O desempate passou a ser, nesta ordem: estabilidade (só para iniciante), carga possível, variedade entre os dias e animação aprovada.
- **Extensora, tríceps acima da cabeça e panturrilha em pé entram sempre que houver equipamento.** A extensora, que nunca aparecia, agora entra 2 vezes por semana na academia completa.
- **Glúteo:** a ponte passou para o padrão novo "extensão de quadril", e entraram os padrões de abdução e adução e o músculo adutores (sem meta).
- **Tempo:**
  - o descanso dos multiarticulares caiu para 105 s em todos os níveis;
  - o número de exercícios por treino segue a tabela do T4 (45 min → 6, 60 → 8, 75 → 10);
  - a escada de cortes começa pelas técnicas que mantêm o volume: superséries, depois drop set na última série dos isoladores, que agora é prescrição e pode ser registrado no treino com as quedas de carga;
  - só depois vêm menos exercícios e menos séries, primeiro nos músculos não prioritários.
- **Avisos com o motivo verdadeiro:** "sem cadeira extensora…", "nenhum exercício possível com o seu equipamento", "com 50 min cabem cerca de 6 exercícios…", "a divisão treina este músculo 2x por semana…".
- **Semana leve:** só com sinal (estagnação, fadiga ou dor), sem o gatilho de tempo.
- **Regras:** `regras.md` ganhou 14 regras e teve 14 revistas, todas com selo e fonte. `fontes.md` ganhou 17 fontes, com o status novo "resumo-PubMed" (resumo oficial lido).
- **Estado salvo:** versão 3, com a divisão escolhida e a migração 2 → 3, que não inventa escolha. Os programas já salvos continuam válidos.
- **Testes:** 293 unitários (eram 239), entre eles:
  - as divisões;
  - a tabela de funções;
  - cada regra nova;
  - a escada de cortes testada direto ("um prioritário nunca perde séries antes de um não prioritário");
  - a varredura de 1.296 combinações;
  - as metas do R0.

  No navegador, há um teste novo de ponta a ponta para a escolha da divisão.

**O que mudou em cada persona** (o antes e o depois completo está na página "Diagnóstico do treino-mvp")
- **Ana:** continua corpo todo A/B/C, com cerca de 6 exercícios por treino. Ganha a ponte de glúteo 2x por semana, e a panturrilha vai de 6 para 8 séries. O agachar vira o búlgaro, que pesa mais por perna com halteres leves. Só o ombro posterior fica abaixo do mínimo, porque nenhum exercício dele é possível com halteres e banco reto.
- **Bruno:** Superior/Inferior 2x. Os braços saem do dia de pernas, e o superior fica com 12 séries por músculo. No tempo que o descanso economizou, coube mais exercício: os dias de superior chegam a 66–70 min. A barra fixa vira alternativa das puxadas na polia.
- **Carla:** Superior/Inferior + Empurrar/Puxar/Pernas. Entra a cadeira extensora 2x por semana, e quadríceps e posteriores vão de 12 e 8 para 14 séries. A panturrilha fica em 8 de 14, com aviso.
- **Diego:** continua corpo todo A/B/C, com 6 exercícios. Entra a ponte, e não há superséries nas 2 semanas de aprendizado.

**Metas do R0, medidas com o equipamento da Carla** (540 programas: 3 níveis × 12 divisões × 5 durações × 3 escolhas de prioridade)

| Meta | Hoje | Falta, para o R0c |
|---|---|---|
| 45 ou mais exercícios distintos | **39** de 60 possíveis | 6 exercícios; os 29 novos do R0c cobrem com folga |
| 0 equipamento sem exercício possível | 1: as **paralelas** (a esteira fica fora por decisão) | o mergulho |
| 2 ou mais alternativas de outro equipamento | 12 exercícios com menos | os pares em máquina: voador invertido, desenvolvimento, tríceps, panturrilha em pé, hip thrust e glúteo na máquina |
| aviso com o motivo verdadeiro | todo músculo abaixo da meta tem aviso com motivo | — |

As listas exatas ficam em `tests/unit/metas-r0.test.ts`, para o R0c zerar.

**Decisões do Gustavo (01/11/2026)** — os snapshots das 4 personas foram revistos e aprovados, e as 3 recomendações ficam:
1. Animação aprovada como desempate entre equivalentes **[opinião]**: fica.
2. Sem drop set nas semanas de RIR 3–4 (fase de aprendizado e 1ª semana depois de uma pausa) **[opinião]**: fica.
3. Barra fixa ou puxada na polia, quando há as duas: fica a regra atual (a polia ganha pelo critério "carga possível"; a barra fixa é alternativa).

**Imagem:** `img/r0b-divisao.png` (o passo "Como prefere dividir?").

**Rascunho de post para o LinkedIn**
> Corpo todo, ABC ou superior/inferior? Com o mesmo volume semanal, as meta-análises de 2019, 2024 e 2026 não acharam diferença de crescimento. Então o meu app de treino parou de escolher por você.
>
> Agora a pessoa diz quantos dias tem, e o app mostra as divisões que cabem, recomenda uma e explica o motivo, sem deixar nada marcado. Quem quer o ABC clássico pode escolher, com um aviso honesto: faltou ao dia de perna, ficou a semana sem perna.
>
> A outra mudança é mais funda. Cada vaga do treino deixou de pedir um aparelho ("supino com halteres") e passou a pedir uma função ("empurrar horizontal"). O equipamento só diz o que é possível. Máquina e peso livre valem o mesmo, porque os estudos dizem isso. Resultado: numa academia completa, a cadeira extensora, que nunca aparecia, entra 2 vezes por semana, porque é o que cresce a parte da coxa que o agachamento não pega.
>
> E quando o treino não cabe no tempo, o app primeiro junta exercícios em superséries e usa drop set, e só depois corta. Cada decisão tem um selo de evidência, e onde é opinião minha, está escrito "opinião".

## R0c: O catálogo ampliado (01/11/2026)

**O que mudou**
- **Equipamento:**
  - de 25 para 46 itens, por capacidade (pesquisa-v2/08, seção 1);
  - o multifuncional vale pelas estações que a pessoa marca (puxador, remada, extensora, flexora, voador, supino);
  - a polia simples passa a ser "no alto", "embaixo" ou "regulável", e a fixa deixou de ser inútil;
  - a tela pergunta só o que muda o programa: as estações, a altura da polia, os pesos do kettlebell, se o voador inverte e se o tríceps na máquina é acima da cabeça;
  - os 21 itens novos aparecem só com o nome, porque os desenhos ficam para depois.
- **Exercícios:**
  - entraram os 29 da pesquisa, todos sem animação. Cada um tem um **cartão de texto** tirado da ficha de técnica: montagem segura, posição, execução, amplitude, dicas, erros e como a carga sobe;
  - o agachamento livre virou "profundo";
  - os adutores entram como secundário dos agachamentos profundos e do afundo.
- **Vagas:**
  - a tabela de funções (2.1) está completa;
  - entram a panturrilha sentada e a adução como complementos, só com pernas ou glúteos como prioridade e se houver tempo;
  - a máquina de tríceps vale como "acima da cabeça" só quando o braço fica acima da cabeça.
- **Alternativas:** passaram a ser todas as da mesma função. Aparecem 3, e o resto fica em "ver mais".
- **Registro da carga, nos 5 tipos da pesquisa:**
  - placa nas máquinas com torre;
  - **kg de anilhas por lado** nas máquinas de anilha (leg press, hack, smith, panturrilha sentada), subindo o menor par (2 kg até a pessoa informar; opinião);
  - **contrapeso** no graviton, onde progredir é tirar placa. Sem placa para tirar, a sugestão é passar para a barra fixa ou o mergulho livre;
  - o kettlebell sobe pela lista de pesos.
- **Foto:** os 46 ids, a altura da polia, as estações e os pesos do kettlebell como atributos, e as 14 dicas para não confundir aparelhos (hack × leg press, voador × polia, smith × rack…).
- **Regras:** 7 novas e 2 revistas em `regras.md`, todas com selo e fonte; `fontes.md` ganhou 26 fontes.
- **Estado salvo:** versão 4. A polia simples regulável vira "regulável"; a fixa fica sem altura até a pessoa dizer, sem inventar.
- **Testes:** 331 unitários (eram 293) e 50 no navegador (eram 49). A meta de 45 exercícios e as outras metas do R0 agora passam no teste.

**Metas do R0, com a Carla** (que agora tem os 46 equipamentos; 540 programas)

| Meta | R0b | R0c |
|---|---|---|
| 45 ou mais exercícios distintos | 39 | **54** (de 102 possíveis) |
| Nenhum equipamento sem exercício possível | paralelas e esteira | **só a esteira** (decidido) |
| Todo exercício possível como vaga ou alternativa | faltava 1 | **todos** |
| 2 ou mais alternativas de outro equipamento | 12 com menos | **só a adução** (não há outro exercício de adutores) |
| Máquinas nas vagas | 17% | 31% |
| Vagas com animação aprovada | 64% | 55% |

**O que mudou em cada persona**
- **Ana, Bruno e Diego:** os mesmos exercícios, os mesmos minutos. Muda só a conta: os adutores aparecem no volume, sem meta. A Ana ganha um aviso: "sem panturrilha sentada na máquina, o complemento para o sóleo fica de fora", porque pernas é prioridade dela.
- **Carla:**
  - entram a adução (2x), a panturrilha sentada, o coice na máquina (no lugar da ponte), a rosca na máquina e o abdominal na máquina;
  - a panturrilha sobe de 8 para 12 séries (a meta é 14);
  - o dia de Pernas vai de 54 para 67 min.

**Imagens:** `img/r0c-equipamento.png` (o multifuncional e as estações) e `img/r0c-cartao.png` (o cartão de texto do hack).

**Decisões do Gustavo (01/11/2026)** — o marco foi aprovado, com os snapshots das 4 personas:
1. **Leg press:** o desempate fica como está, e o leg press segue nas alternativas. Entra uma funcionalidade nova, a **preferência** ("prefiro este" entre equivalentes), que vale nos próximos programas e nas trocas entre locais (marco R1b).
2. **Adução sem alternativa:** aprovada como exceção.
3. **Aviso da panturrilha sentada** para quem prioriza pernas sem a máquina: aprovado.

**Ideia nova do Gustavo, que virou o marco R1b:** cadastrar mais de um local (por exemplo, a academia do prédio e a do bairro) e fazer o treino de um no outro, com trocas inteligentes de aparelho e sem perder o progresso.

**Fica para depois:** os atalhos de cenário, a esteira fora da lista e a pergunta da menor anilha (R1); as animações dos exercícios novos (pela fila da seção 6); os desenhos dos 21 equipamentos; e a calibração por tipo de carga (R2).

**Rascunho de post para o LinkedIn**
> Meu app de treino sabia o que fazer com halteres e polia. Numa academia de verdade, metade dos aparelhos ficava sem uso: o hack, o voador, a cadeira abdutora, o graviton.
>
> Agora ele conhece 46 equipamentos e 102 exercícios. Ele trata o equipamento pelo que dá para fazer com ele: o multifuncional do condomínio vale pelas estações que você marca, e a polia de altura fixa finalmente serve para alguma coisa.
>
> Duas escolhas de que gosto. Exercício sem animação aprovada aparece como um cartão de texto, escrito a partir de uma ficha de técnica com fonte, nunca como um desenho improvisado. E cada aparelho diz como a carga sobe: no leg press você anota as anilhas por lado, porque ninguém sabe quanto pesa o trenó; no graviton, progredir é tirar placa, porque ali mais peso é mais ajuda.

## R1: Nada contradiz o programa, e o cadastro leva cerca de 1 minuto (01/11/2026)

**O que mudou**
- **Triagem** (regra de segurança aprovada pelo Gustavo antes do código):
  - um botão "Nenhuma se aplica a mim" marca "não" nas 9 perguntas; a pessoa ainda vê as perguntas e toca em "Continuar" (`seguranca.triagem.nenhuma`);
  - o "sim" na pergunta de osso e articulação deixa de tirar a região inteira. Ela pede a região e a **dor de hoje, de 0 a 10**, e segue a regra de dor que já existia (`seguranca.triagem.osteoarticular`, revista; `seguranca.dor.programa`, nova):
    - acima de 5, os exercícios que carregam a região saem;
    - de 3 a 5, no desempate, o app prefere os que poupam a região;
    - até 5, o exercício que carrega a região ganha um lembrete ("se doer acima de 5 numa série, pare e use a alternativa").
  - o resto da triagem não muda, e a proposta da seção 9 do T5 continua só registrada.
- **Dor num lugar só:** a dor saiu de "Restrições", que virou "O que evitar (opcional)", com um resumo da dor informada na triagem.
- **Aviso com o motivo verdadeiro:** "peito 0 de 12 séries, porque os exercícios que carregam o ombro ficaram de fora por causa da dor no ombro (7 hoje)". Antes, o aviso dizia "nenhum exercício possível com o seu equipamento". A vaga que a dor esvazia deixa de virar aviso de falta de equipamento e recebe um exercício possível de outro músculo do mesmo dia (`selecao.dia-sem-principal`, nova).
- **Teto semanal:** a distribuição das séries passou a conferir o teto de 20 séries em todos os músculos do exercício, e não só no músculo da vaga. O caso apareceu no teste de propriedade novo; nenhuma persona mudou por isso.
- **Minutos por toque:** 30, 45, 60, 75, 90 ou "Outro".
- **Equipamento:**
  - os 3 atalhos do T7 ("casa com halteres e elásticos", "condomínio com multifuncional", "academia completa"). Nenhum vem marcado; o toque marca o conjunto, sem desmarcar o que a pessoa já tinha, e os "às vezes tem" aparecem logo abaixo, desmarcados (`equipamento.atalhos`, nova). Os detalhes que mudam o programa continuam sendo perguntados;
  - a pergunta única "qual a menor anilha?", quando há leg press, hack, smith, panturrilha sentada, barra longa ou hexagonal. Ela é gravada em cada item; sem resposta, vale 2 kg (`equipamento.menor-anilha`, nova; opinião);
  - a esteira saiu da lista. A foto ainda a reconhece e diz que o cardio não entra no treino.
- **Guia com a prescrição da pessoa:** aberto pelo programa ou pelo treino, ele mostra a semana dela ("Semana 1: 2 × 8–12 cada lado · RIR 3–4 · descanso 1:45 · fase de aprendizado"), as abas do dia dela, "Voltar ao treino" e o checklist "Carga para RIR 3–4". Numa troca, vale a vaga com as repetições da alternativa. Sem contexto, é o catálogo, sem prescrição.
- **Textos de técnica:** saíram o campo `rx` e os outros campos da prescrição de referência (séries e descanso), o "RIR 1–2" fixo dos checklists, os "até 10 kg" e "1–10 kg" e a nota "o programa diz polia no ponto mais baixo".
- **Textos corrigidos:**
  - a privacidade nas boas-vindas e em "Meus dados" (a foto é enviada sem localização e não fica guardada);
  - "(em breve)" e "cerca de 5 minutos";
  - "última registrada" na volta de pausa (`readaptacao.semana1`, só o texto);
  - "mais repetições × 12", que virou "peso do corpo × 12";
  - o README.
- **Estado salvo, versão 5:** a dor fica só em `triagem.dores`. A migração não inventa nada:
  - a região antiga entra sem nota e continua excluída até a pessoa dar a nota;
  - a nota dada em "Restrições" vem junto;
  - a resposta da pergunta osteoarticular não muda.
- **Regras:** 5 novas e 2 revistas em `regras.md`, todas com selo e fonte.
- **Testes:**
  - 362 unitários (eram 331) e 53 no navegador (eram 50);
  - teste de propriedade do R1: as 4 personas, com dor acima de 5 em 1 ou 2 regiões, em cada divisão possível. Nenhum dia fica sem exercício principal, e todo grupo grande com 0 série tem o aviso com o motivo;
  - no navegador:
    - o cadastro sem condição sai com 0 caractere e 13 toques;
    - a Ana abre o búlgaro pelo treino e vê RIR 3–4;
    - a triagem pede a nota;
    - o atalho "academia completa";
  - uma busca no repositório barra "Nada é enviado para servidor", "(em breve)" e "última registrada".
- **Regressão visual do guia:** o teste fixa a altura do cabeçalho do exercício nas duas páginas (a original e a do app). A prescrição do cabeçalho agora é da pessoa, e, com outra altura de texto, o palco descia meio pixel. O SVG continua idêntico, caractere por caractere, e os 26 palcos, pixel a pixel.

**Medido (personas fictícias, Pixel 7 simulado)**

| | Antes | Depois |
|---|---|---|
| Toques da Ana até o programa (sem a tela de equipamento) | 28 | **13** |
| Caracteres digitados | 2 | **0** |
| Toques na tela de equipamento (Ana) | — | 6 |
| Lugares onde a dor é perguntada | 2 | **1** |
| Guia do búlgaro aberto pelo treino (Ana, semana 1) | "3 × 8–12 por perna · RIR 1–2 · 1,5 min" | "2 × 8–12 cada lado · RIR 3–4 · descanso 1:45" |

**Bruno com o ombro marcado** (caso novo; antes, qualquer nota dava o mesmo resultado)
- **Antes:** peito, costas e ombros com 0 série. O Superior A ficava só com a rosca alternada, e o aviso falava em falta de equipamento.
- **Dor 0 a 2 hoje:** o mesmo programa de quem não tem dor, com o lembrete nos 18 exercícios que usam o ombro.
- **Dor 3 a 5:** os mesmos grupos. Todo exercício de tronco dele usa o ombro, e o lembrete diz que nenhum equivalente poupa a região.
- **Dor 7:** os exercícios do ombro saem. O aviso diz o motivo verdadeiro e recomenda avaliação, e o Superior A ganha o tríceps na polia, que poupa o ombro.

**O que mudou em cada persona**
- **Ana:** passa de 50 para **45 min**, como na seção b do plano, porque 50 não é botão. Sai o crucifixo, 4 exercícios perdem 1 série e os treinos ficam com 42 a 43 min. Entra o aviso "abaixo da meta semanal por falta de tempo: quadríceps 6 de 8; posteriores da coxa 7 de 8". Com 50 min, o programa sai idêntico ao do R0c.
- **Bruno, Carla e Diego:** nenhuma mudança (os snapshots não mudaram).

**Imagens:** `img/r1-guia-antes-depois.png` (o guia do búlgaro antes e depois) e `img/r1-jornada.gif` (a jornada da Ana, do zero ao programa, sem digitar).

**Decisões do Gustavo (01/11/2026)**: o marco foi aprovado por inteiro e foi para a `main`.
1. **Ana com 45 min:** aprovada, com o snapshot revisto.
2. **`selecao.dia-sem-principal`:** aprovada.
3. **Regressão visual com o cabeçalho fixo nas duas páginas:** aprovada.

**Fica para o R1b:** vários locais com trocas inteligentes, a calibração da carga na 1ª série e o "prefiro este". Os atalhos e a menor anilha só mexem no formulário de um inventário, e a menor anilha fica em cada item, sem amarrar o app a um local só.

**Rascunho de post para o LinkedIn**
> Um "sim" honesto custava caro no meu app. Quem respondia que teve um problema no ombro no último ano perdia todo o treino de peito, costas e ombros, mesmo sem dor nenhuma hoje. E o aviso ainda culpava o equipamento.
>
> Agora a pergunta segue com outra: "e hoje, dói? de 0 a 10". Até 5, o programa continua, com um lembrete para parar se doer numa série. Acima de 5, os exercícios da região saem, e o app diz o motivo verdadeiro e recomenda avaliação.
>
> No mesmo pacote, o cadastro de quem não tem nenhuma condição caiu para 13 toques, sem digitar nada, e o guia passou a mostrar a prescrição da sua semana, não a de um programa de exemplo. Nada no app pode contradizer o seu programa.

## R1b: Vários locais, trocas explicadas e progresso que não se perde (01/11/2026)

**Pesquisa antes do código** (`pesquisa-v2/09-trocas-e-locais.md`, tema T9, aprovada pelo Gustavo):
- equivalentes crescem o músculo igual (máquina × peso livre; moderada, Haugen 2023 e Heidel 2022);
- a força é em parte específica do aparelho, e boa parte do ganho de carga no começo é coordenação (moderada; um estudo);
- não há conversão confiável de carga entre aparelhos: de −17% a +8% conforme o par (três estudos, um cada);
- a proteção contra a dor muscular passa de uma variação para outra (um estudo); sobre a carga, ninguém mediu;
- daí a regra: a troca leva a semana, a fase, a prescrição da vaga e o histórico; a carga do exercício novo recomeça pela calibração na 1ª série, e nunca se converte carga de um aparelho para outro.

**O que mudou**
- **Locais:** em "Meus locais", cada local tem um nome que a pessoa escolhe (chips "Prédio", "Academia", "Casa", "Trabalho" ou texto) e o seu equipamento, na mesma tela do cadastro, com os atalhos, a foto e a menor anilha. Um toque escolhe o local principal, para o qual o programa é montado.
- **Onde vou treinar hoje?** Com 2 locais ou mais, aparece antes de começar, com o último local usado já escolhido e todos à vista. A prévia mostra cada troca com o motivo ("Aqui não tem polia alta: puxada unilateral → barra fixa").
- **Treino do dia no local** (`local.treino-do-dia`, nova): cada vaga que não é possível ali troca pelo equivalente da mesma função, com o mesmo desempate do gerador (o código de escolha passou a ser um só, `contextoDeSelecao`). Séries, RIR e descanso da vaga ficam; as repetições são as do exercício que entrou. Sem equivalente, primeiro outro movimento do mesmo músculo, depois outro músculo do dia (`selecao.dia-sem-principal`); se nada for possível, a vaga sai com o motivo, e nenhum dia fica sem exercício principal. As alternativas do "pare e use a alternativa" são as do local.
- **Calibração na 1ª série** (`progressao.calibracao`, nova; os casos C1 a C7 do T6): em toda 1ª vez de um exercício, e na 1ª vez de uma máquina de placa, anilhas ou contrapeso num local. Série a série, nos 5 tipos de carga. A série de acerto fica no histórico, marcada como "acerto da carga", e fora da dupla progressão. O texto diz "Você já faz X; aqui é a 1ª vez", sem número do exercício antigo.
- **Progresso que não se perde** (`progressao.troca-equivalente`, nova): o histórico segue o exercício em qualquer local. Halteres, kettlebell, barra e peso do corpo continuam a progressão em qualquer local; se o local não tem o peso, vale o maior abaixo, com o aviso. Nas máquinas, cada local tem a sua carga (decisão do Gustavo).
- **"Prefiro este"** (`selecao.preferencia`, nova): nos detalhes do exercício e no "Trocar exercício", entre equivalentes do mesmo nível da função. Entra no desempate antes da animação e da ordem alfabética, vale no próximo programa (o aviso "Há uma versão nova do seu programa" oferece atualizar) e nas trocas de local, aparece no "porquê", e um toque desfaz. A dor acima de 5 tira o preferido igual.
- **Estado salvo, versão 6:** `locais`, `localPrincipalId`, `ultimoLocalId`, `preferidos`, o local de cada sessão e a marca de acerto nas séries. A migração 5 → 6 põe o inventário de antes no 1º local, "Meu local", sem tocar em atributo; não inventa principal, último local nem preferência. As sessões antigas contam como do 1º local. Exportação e importação continuam, e um arquivo da versão 5 entra já com o 1º local.
- **Regras:** 4 novas (`progressao.calibracao`, `progressao.troca-equivalente`, `local.treino-do-dia`, `selecao.preferencia`) e 2 revistas (`selecao.funcao-da-vaga`, `selecao.equivalencia`), todas com selo e fonte; `fontes.md` ganhou 12 fontes.
- **Testes:** 408 unitários (eram 362) e 55 no navegador (eram 53), entre eles:
  - C1 a C7 da calibração e os 5 tipos de carga;
  - o Bruno faz o Superior A no prédio e na academia do bairro, com as trocas explicadas, e o supino com halteres continua a progressão;
  - a Carla num local sem rack: sem preferência entra o hack, com "prefiro o leg press" entra o leg press;
  - propriedades: 4 personas × 6 locais × 2 semanas, nenhum exercício exige o que o local não tem e todo dia tem exercício principal; 8 treinos alternando locais, nenhum histórico é apagado nem misturado;
  - no navegador: o 2º local, a escolha de onde treinar, a troca com o motivo e a calibração no leg press.

**Snapshots**
- **Ana, Bruno, Carla e Diego, sem 2º local e sem preferência:** os 4 snapshots não mudaram. O programa sai idêntico, inclusive o hash.
- **Novo, Bruno na academia do bairro** (halteres de 2 a 30 kg, banco regulável, barra fixa, paralelas, leg press, extensora e flexora, sem polia):
  - Superior A: puxada unilateral → barra fixa; francês na polia → francês com halter; crucifixo na polia → com halteres; face pull → crucifixo inverso;
  - Inferior A e B: flexão de joelho na bola ou com elástico → cadeira flexora; panturrilha no step → no leg press; abdominal na polia → no chão;
  - Superior B: remada baixa → remada apoiada; puxada com barra reta → barra fixa; elevação lateral na polia → com halteres; rosca na polia → rosca inclinada; tríceps na corda → mergulho.
- **Novo, Carla com "prefiro o leg press":** no Inferior, o leg press entra no lugar do agachamento livre (4 × 8–15 em vez de 4 × 6–10). Os minutos não mudam; os adutores (sem meta) vão de 7,5 para 5,5 séries.

**O que mudou em cada persona**
- **Ana, Carla e Diego:** o programa é o mesmo. Muda o 1º treino de cada exercício: em vez de "escolha uma carga", vem a calibração.
- **Bruno:** igual no prédio. Na academia do bairro, o mesmo dia troca o que é de polia, com o motivo, e a carga dos halteres segue.

**Imagem:** `img/r1b-locais.png` (onde vou treinar hoje, a troca explicada e a calibração no leg press).

**Fica para o R2:** pausas detectadas sozinhas (e com elas a calibração na volta de mais de 26 semanas), "a sua semana", evolução por exercício e semana leve sugerida. No backlog: apagar um local e oferecer o que o local a mais permite.

**Rascunho de post para o LinkedIn**
> Eu treino em dois lugares: a academia do prédio e uma do bairro. Meu app de treino só conhecia um.
>
> Agora cada local tem o seu equipamento, e antes de começar eu escolho onde treino hoje, com um toque. O treino do dia se ajusta: "aqui não tem polia alta: puxada → barra fixa". As séries e o descanso ficam os mesmos.
>
> A parte difícil foi o progresso. Fui aos estudos: o músculo cresce igual na máquina e no peso livre, mas a carga não passa de um aparelho para o outro. No supino, os halteres levantaram 17% menos que a barra; a máquina, 8% mais. Então o app não inventa conta. Na 1ª vez num aparelho, ele pede uma carga fácil e acerta pela 1ª série: "ficou leve: na próxima, 12 kg por lado". O histórico segue o exercício, em qualquer lugar.
>
> E entrou o "prefiro este": entre exercícios equivalentes, eu escolho. A preferência nunca passa por cima da dor.
