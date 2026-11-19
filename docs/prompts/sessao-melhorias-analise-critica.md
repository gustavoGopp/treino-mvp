# Prompt: sessão de melhorias da análise crítica do treino-mvp (os lotes M0 a M6, um de cada vez)

> Escrito em 19/11/2026, pela sessão que fez a análise crítica do app inteiro (`docs/revisoes/analise-critica/`), depois que o Gustavo leu o relatório e respondeu às perguntas dele. As decisões estão em `docs/revisoes/analise-critica/decisoes-e-plano.md`. A ordem dos lotes foi recomendada por aquela sessão, pelo critério "o que mais faz um desconhecido desistir do app ou não voltar"; o Gustavo pode mudá-la antes de colar. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova. A mesma sessão pode conduzir vários lotes, parando ao fim de cada um; se ficar longa demais, comece outra com este mesmo texto.
>
> **Existe outro prompt em aberto**, `docs/prompts/sessao-desenvolvimento-2.md` (pacotes D1 a D4), escrito no mesmo dia a partir do backlog. Os dois se cruzam em dois pontos, ditos abaixo. A ordem recomendada entre eles está no fim de `decisoes-e-plano.md`.

---

Você vai conduzir a **sessão de melhorias da análise crítica** do **treino-mvp**, um web app (PWA, Vite + React + TypeScript) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão. O app já faz a jornada inteira. Uma análise crítica independente (19/11/2026) concluiu que ele é um bom caderno de treino para quem já decidiu usá-lo, e ainda não é um app que um desconhecido entende, termina de configurar e volta a abrir. Esta sessão cuida disso, em sete lotes, **um de cada vez**.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão; quando um termo técnico for inevitável, explique-o numa frase. **Ele pediu para não decidir questões técnicas:** a sessão decide (como fazer, que limiar, como medir), registra o motivo e mostra o efeito medido. Para ele ficam as decisões de produto (o que a pessoa vê e faz, o que o app promete, os textos de segurança) e as aprovações que o `CLAUDE.md` pede. **Uma decisão de cada vez, com imagem do antes e do depois quando houver tela.**

**Para quem é o app agora (decisão de 19/11).** O Gustavo continua sendo o usuário principal, mas amigos já pedem para usar e ele quer o app "redondo para poder compartilhar com qualquer pessoa". Pense em quem nunca viu o app.

**Leia antes de começar.**
- `CLAUDE.md`: princípios, escopo e a seção "Verificação".
- `docs/revisoes/analise-critica/relatorio.md`: o veredito, os 3 principais, o ranking, o que **não mexer** e os problemas que reaparecem. `diario-de-uso.md`: as medidas e as capturas. `decisoes-e-plano.md`: o que o Gustavo decidiu.
- `docs/devlog.md` (as entradas de 12/11 em diante) e `docs/backlog.md`.
- O código: `src/domain/` (regras puras e testadas), `src/engine/novo/` (o motor do Boneco), `src/features/` (as telas), `src/storage/` (o estado guardado).
- Para olhar uma tela com a persona Ana já cadastrada: `node scripts/design/frontend-novo/olhar.mjs` (uso no cabeçalho do arquivo).

**O que a análise mandou proteger.** Não piore nada disto: o registro com um toque a partir da 2ª série; a tela de descanso; o "Senti algo"; trocar exercício; entrar sem conta; a acessibilidade (0 falhas no verificador, toques de 44 px ou mais); o funcionamento sem internet; o modo escuro e o movimento reduzido; o tom sem culpa ("nunca uma sequência que zera", sem vermelho e sem "você falhou"); a decisão de 16/11 de manter nível de evidência e fonte fora das telas.

**Os lotes, na ordem recomendada.**

| # | Lote | Por que nesta ordem |
|---|---|---|
| M0 | **O nome** | É barato, e a abertura, o cartão e os textos dependem dele |
| M1 | **A porta** | É onde um desconhecido desiste antes de ver o app: 21 e 24 toques para quem treina no prédio ou em casa, contra 13 na academia completa |
| M2 | **O guia chega** | O Boneco é o que o app tem de seu, e hoje chega pequeno e pela metade |
| M3 | **A primeira sessão fala a língua de quem começa** | O iniciante não entende a notação e vê a carga cair sem motivo |
| M4 | **O descanso avisa** | Incomoda todo treino; depende de teste em aparelho de verdade |
| M5 | **Um motivo para voltar** | Nada traz a pessoa de volta na primeira e na segunda semana |
| M6 | **A triagem** | Para quem responde a verdade; texto de segurança, pede mais cuidado |

Antes de cada lote, confira no `docs/devlog.md` e no `git log origin/main` se ele já foi feito, e veja se outra sessão mexe nos mesmos arquivos (`git for-each-ref --sort=-committerdate refs/remotes --count=10`). Se houver choque, registre e pergunte ao Gustavo antes de seguir.

**Cruzamentos conhecidos.**
- **Sessão das animações** (`claude/great-dirac-cabwvh`, em andamento em 19/11): não toque em `src/engine/novo/` nem no campo `animacaoId` de `src/domain/biblioteca/exercicios.json` até ela ir para a `main`.
- **D1** (`sessao-desenvolvimento-2.md`) confere as regras contra o código e já cita `rir.calibracao`: a mudança da regra de acerto da carga (M3) se faz num lugar só.
- **D2** leva ao Gustavo a saída da triagem para quem não foi avaliado (pedido 11 de `docs/revisoes/frontend-novo/pedidos-ao-dominio.md`): o M6 inclui isso; um dos dois faz.

### M0. O nome

O app se chama "treino-mvp" por decisão antiga ("a marca fica para depois da validação", `docs/PLANO-MVP.md:13`). Em 19/11 o Gustavo decidiu dar o nome agora. Os candidatos e a preferência da análise estão no fim de `decisoes-e-plano.md`.

1. **Decisão do Gustavo:** o nome. Antes de aplicar, procure o escolhido na base de marcas do INPI e nas duas lojas de aplicativos, e mostre o que achou.
2. Troque onde a pessoa vê: `index.html:11`; o manifesto (`vite.config.ts:52-53`, `name` e `short_name`); o título das páginas (`src/features/app/ui.tsx:284`); `src/features/termos/Termos.tsx:38`; `src/features/dados/Dados.tsx:93,272`; a mensagem e o nome do arquivo de cópia (`src/storage/arquivo.ts:19,23`); o assunto do e-mail (`src/domain/dados/index.ts:116`).
3. **Não troque** o que identifica os dados guardados: `APP_ID` (`src/storage/arquivo.ts:4`) e as chaves de armazenamento. Uma cópia feita antes da troca tem de continuar entrando.

**Aceite:** nenhuma tela, ícone, título ou arquivo novo mostra "treino-mvp"; um teste garante que uma cópia antiga é aceita.

### M1. A porta

**O que a análise mediu** (`relatorio.md`, principal 1): da abertura ao programa, 13 toques com "Academia completa", 21 com "Condomínio", 24 com "Casa". A diferença são os detalhes obrigatórios do equipamento, pedidos depois do toque em "Gerar meu programa", com erro em vermelho em campos que a pessoa não viu. A abertura não diz o que a pessoa recebe. Não existe "nunca treinei".

**Decisão do Gustavo (19/11): "programa na hora".** Os atalhos "Condomínio" e "Casa" passam a gerar o programa com um kit típico, e o ajuste fica para depois. Isso **revoga** "os detalhes que mudam o programa continuam sendo perguntados" (`src/domain/taxonomia/atalhos.ts:5`; `docs/devlog.md:446`).

1. **Kit típico nos dois atalhos.** O mecanismo existe: `padroes` (`src/domain/taxonomia/atalhos.ts:24-36`), hoje só em "Academia completa" (`:99`), aplicado por `aplicarAtalho` (`src/features/onboarding/inventarioForm.ts:352`). O tipo já aceita halteres e banco que declina; falta para anilhas, manoplas e elásticos. **O atalho de casa passa a supor halteres comuns**, não de montar. Os valores típicos são seus, marcados como "[opinião]", como já é feito no atalho da academia; escolha o lado conservador (menos carga, e "não" nos "sim ou não").
2. **Corrigir depois.** Hoje o seletor de carga só lista o que o inventário tem (`src/features/treino/Treino.tsx:629,917`). Acrescente uma saída do tipo "não tenho esse peso", que pergunta uma vez o mais pesado, grava pelo caminho que "Meus locais" já usa (`src/features/locais/Locais.tsx:79-86`) e aproveita o aviso que já existe ("Versão nova do programa", `src/features/programa/Programa.tsx:87,174-179`). E uma linha no programa: "Montado para um kit típico. Ajustar".
3. **"Nunca treinei".** Entra em `TEMPOS_DE_TREINO` (`src/domain/nivel/index.ts:7`). Não faz a pergunta da pausa e conta como zero semana parada, para a pessoa cair na fase de aprendizado, e não na volta de pausa (`src/domain/gerador/index.ts:2173`), que hoje lhe dá 1 série (`:2241`) e um texto sobre "a carga que você usava antes da pausa".
4. **A abertura.** O diagnóstico do redesenho já pedia "uma frase, o Boneco em movimento (é o produto) e o 'Começar'" (`docs/revisoes/frontend-novo/diagnostico.md:63`). Volte a dizer o que a pessoa recebe, em uma frase, e mostre o Boneco. Não há componente pronto de Boneco animado pequeno (a `Miniatura` é parada; o animado sai de `pedirCiclo`, usado no guia e no palco do treino): decida entre parado e animado pelo peso medido. **O aviso de segurança continua inteiro e à vista.**
5. **Os erros.** Em `src/features/onboarding/Inventario.tsx:252-259`, o toque em "Gerar meu programa" marca todos os campos de uma vez, e a mensagem não some enquanto a pessoa preenche. O erro aparece no campo que ela mexeu ou tentou fechar, e some ao corrigir. "Manopla" ganha explicação ou outro nome.

**Decisões do Gustavo, uma por vez, com imagem:** a frase da abertura; o texto de "Montado para um kit típico".

**Aceite:** da abertura ao programa em **15 toques ou menos nos quatro atalhos, contando a tela de equipamento** (hoje o teste confere 11 e pula essa tela: `tests/e2e/onboarding.spec.ts:151-169`; ele passa a contá-la); `tests/unit/inventario-form.test.ts:205` reescrito para a decisão nova, e um teste igual para o atalho de casa; quem escolhe "Nunca treinei" nunca recebe exercício com 1 série; personas e régua antes e depois, porque o programa de quem usa os atalhos muda.

### M2. O guia chega

**O que a análise mediu** (`relatorio.md`, principal 2): no treino, o Boneco tem de 70 a 134 px de altura conforme o celular, as legendas saem com letra de 8 px, e tocar nele só pausa (`src/features/treino/PalcoTreino.tsx:176`). Para ver grande, a pessoa sai do treino. Em telas baixas, o rótulo da fase cobre a cabeça (`src/styles.css:726`, com o palco na altura mínima de `:822-824`). E 81 dos 171 exercícios não têm animação ligada, entre eles todos os de barra e de máquina.

1. **Ampliar sem sair do treino.** Tocar no Boneco abre o movimento grande por cima da tela, com "fechar"; a pausa vira um botão próprio. Já existe a folha reutilizável (`src/features/app/Folha.tsx:42`). O guia completo (`src/features/guia/Guia.tsx`) depende da rota (`:68`): extraia o palco para um componente que sirva aos dois. A regra "em celular baixo é o Boneco que encolhe, nunca o registro" (`docs/revisoes/frontend-novo/proposta.md:318`) continua valendo para o tamanho de repouso.
2. **A cabeça.** O rótulo da fase não pode cobrir o desenho em nenhuma tela de 320 × 568 a 412 × 839.
3. **O descanso como hora de aprender** (se couber): a tela de descanso tem espaço sobrando em volta do relógio (`.descanso-topo`); mostrar ali, maior, o movimento da próxima série. Não estrague a clareza dessa tela, que é a melhor do app.
4. **Ligar as animações de barra e de máquina.** Só **depois** que a sessão das animações for para a `main`. Em 19/11 o ramo dela tinha 169 animações aprovadas e o catálogo ligava 90. Combine com o Gustavo quem liga.

**Aceite:** o Boneco ampliado ocupa metade da tela ou mais, sem sair do treino, com o descanso correndo por baixo; um teste de tela para a cabeça descoberta em cinco tamanhos (320 × 568, 360 × 640, 375 × 667, 390 × 664, 412 × 839); depois do item 4, 95% ou mais dos exercícios com animação nos programas das personas de academia; o peso da tela medido antes e depois.

### M3. A primeira sessão fala a língua de quem começa

**O que a análise achou** (`relatorio.md`, itens 5 e 6 do ranking; a lista de textos está em `diario-de-uso.md`):
- "2 × 8–15", "RIR 3–4", "Calibrar", "acerto da carga", "mantendo", "0,5 de 3,5" aparecem sem explicação. O glossário é bom, mas está a três toques (`DefinicoesDoTreino`, `src/features/programa/ComoLer.tsx:7`).
- **A carga cai para quem ficou dentro da meta.** A tela mostra a faixa inteira (8 a 15 repetições, sobrando 3 ou 4) e a regra só aceita o meio dela (`src/domain/progressao/calibracao.ts:19-21,50`). Quem faz 8 repetições sobrando 3, que é o número que a tela traz preenchido, vê a carga cair série após série.
- A semana leve do começo não se anuncia: o programa mostra "1 ×" e menos minutos que o pedido, sem dizer por quê.

1. **Quatro frases, a zero toque de onde a dúvida nasce:** a notação por extenso; a reserva em palavras ("sobrando 3 ou 4"); "semana leve: metade das séries" no programa; o motivo quando a carga muda. A decisão de 16/11 fica: nada de nível de evidência nem fonte na tela. Use o `PorQue` (`src/features/app/ui.tsx:79`) para o resto.
2. **A regra de acerto da carga.** A tela e a regra têm de dizer a mesma coisa: ou a regra aceita a faixa mostrada, ou a tela mostra o alvo de verdade, ou o número preenchido sai do meio da faixa. É mudança de regra: selo, fonte e a regra escrita antes do código. A pesquisa do projeto admite que os números dessa regra "são do projeto" (`docs/pesquisa-v2/07-progressao-e-acompanhamento.md:126`). **Se o D1 já tratou disso, não refaça.**
3. **"Calibrar" e "acerto da carga"** viram palavras que se entendem (já é o pedido 10 de `docs/revisoes/frontend-novo/pedidos-ao-dominio.md`).

**Decisões do Gustavo:** as quatro frases; qual das três saídas do item 2.

**Aceite:** um teste "dentro da meta mostrada, o app mantém a carga"; cada frase com teste de tela; nenhuma sigla sem explicação na primeira vez em cada tela.

### M4. O descanso avisa

**O que a análise achou** (`relatorio.md`, item 4): o aviso de fim é três bipes de Web Audio, uma vibração e a tela que inverte (`src/features/treino/Temporizador.tsx:89-112,172-180`). Não há notificação. Quem sai do app no descanso não é avisado. No iPhone, o Web Audio respeita a chave do silencioso e não há vibração: é provável que nada avise nem com o app aberto.

**Decisão do Gustavo (19/11):** "o que você recomendar e for gratuito". Ele usa Android; a maioria dos amigos, iPhone; e quer "que todos tivessem capacidade de fazer as mesmas coisas". Isso **revoga** "sem notificação no MVP" (`docs/revisoes/redesign/proposta.md:332`), só para o descanso. As fontes sobre o que um site consegue em cada celular estão em `docs/revisoes/analise-critica/mercado.md`; parte foi vista só pelo resumo da busca, então **confira antes de construir**.

1. **Medir primeiro.** Peça ao Gustavo o teste de 5 minutos no Android dele e, a um amigo, no iPhone: descanso de 1 minuto com o app aberto, em outro app, com a tela bloqueada, e no silencioso. Anote se tocou, vibrou e apareceu. A tabela decide o resto.
2. **Passo 1, sem servidor:** som de arquivo no lugar do Web Audio (pelas fontes, não é calado pela chave do silencioso no iPhone); a hora do fim visível ("descanso até 14:32"). O descanso começa em `src/features/treino/Treino.tsx:180-181`.
3. **Passo 2, aviso com a tela bloqueada:** o service worker hoje é gerado (`vite.config.ts:42`) e precisa de um trecho próprio para receber o aviso; a função nova fica em `api/` (a política de `vercel.json`, `connect-src 'self'`, já permite). Só serviço gratuito. Peça a permissão na hora em que ela faz sentido (no primeiro descanso), em palavras simples. No iPhone só funciona com o app instalado na tela de início: diga isso na tela.
4. **Privacidade.** O endereço de aviso sai do aparelho. Não é dado de saúde, mas "tudo fica no aparelho" (`CLAUDE.md`) ganha uma exceção: atualize o texto "o que sai daqui" e proponha ao Gustavo a frase nova do `CLAUDE.md`. Nada de treino ou de saúde vai junto.
5. **Honestidade:** onde iPhone e Android não ficarem iguais, o app diz o que aquele celular consegue. Aplicativo de loja está fora (não é gratuito); registre no backlog o que só ele resolveria.

**Decisões do Gustavo:** o texto do pedido de permissão; a frase nova de privacidade.

**Aceite:** a tabela do item 1 refeita depois de cada passo, nos dois celulares; o texto de privacidade atualizado; um teste de tela para o pedido de permissão recusado (o app continua funcionando igual).

### M5. Um motivo para voltar

**O que a análise achou** (`relatorio.md`, principal 3, já com as correções): não há aviso para treinar; a recepção de volta só existe com 14 dias ou mais (`src/domain/acompanhamento/volta.ts:23`); o fim do treino são três números e uma lista "Calibrar · próxima"; a semana abre com uma tabela de séries por músculo; a frase "6 de 8 semanas com treino" só existe para leitor de tela (`src/features/acompanhamento/Semana.tsx:79`).

**O que fica:** "motivação sem manipulação", no que ela tem de certo: sem culpa, sem sequência que zera (`docs/revisoes/redesign/proposta.md:47`; `docs/devlog.md:623`). **O que muda:** reconhecer o que a pessoa fez e facilitar a volta não é manipular.

1. **O fim do treino em palavras:** "2º treino da semana. Falta 1." e o que melhorou. Os dados existem: `resumoDaSemana` (`src/domain/acompanhamento/semana.ts:91`) e `marcasDaSessao` (`src/domain/acompanhamento/evolucao.ts:86`).
2. **A recepção entre 3 e 13 dias,** no tom da que já existe.
3. **A semana abre pelas semanas com treino,** visíveis; a tabela de músculos vai para uma gaveta.
4. **"Quando é o próximo?"** cria um compromisso na agenda do celular (um arquivo de calendário). Quem lembra é a agenda. Sem servidor.
5. **O cartão da semana:** uma imagem com os treinos da semana e as semanas seguidas, enviada pelo botão de compartilhar do celular, com a alternativa de salvar. O desenho está em `decisoes-e-plano.md`. O projeto já desenha em canvas (`src/lib/imagem.ts:37-41`). **Só frequência, nunca carga.** Isso muda, na letra, "sem recursos sociais" (`CLAUDE.md`, Escopo): proponha ao Gustavo a frase nova.

**Decisões do Gustavo:** os textos do fim do treino e da recepção; o desenho do cartão; a frase do `CLAUDE.md`.

**Aceite:** cada texto com teste de tela; o cartão sai pelo compartilhar e, onde não houver, salva a imagem; nenhuma tela usa vermelho ou "você falhou"; a persona que falta 9 dias é recebida.

### M6. A triagem

**O que a análise achou** (`relatorio.md`, item 7): qualquer "sim" bloqueia o programa (`avaliarTriagem`, em `src/domain/triagem/index.ts`), e o bloqueio abre com uma caixinha. Quem tem pressão alta controlada, que é comum depois dos 50, bate num muro por ser honesto. Duas análises anteriores já tinham dito isso.

**Decisão do Gustavo (19/11):** "não acho que precise ficar assim", e, sobre até onde mudar, "como você entender mais correto". A sessão da análise escolheu o que segue. Isso **revoga** "de lado por decisão do Gustavo: [...] triagem com perguntas de acompanhamento" (`docs/backlog.md:39`).

1. **Perguntas de seguimento para o caso comum,** com **texto próprio** (o do questionário original exige autorização por escrito): para pressão alta ou remédio contínuo, se está controlada e se o médico restringiu exercício. Controlada e sem restrição: libera **com cuidados** (intensidade moderada, respirar sem prender o ar, parar com tontura ou dor no peito). Qualquer outra resposta, e todos os outros "sim", continuam bloqueando. A base é a "Regra proposta" de `docs/pesquisa-v2/23-dor-pressao-alta-e-gestacao.md:81`. A pergunta de hoje junta coração e pressão alta: separe.
2. **A regra antes do código:** selo "consenso", as fontes, e o registro de que **não houve revisão por profissional de saúde**. O modelo de um detalhe extra numa pergunta já existe (as dores do item de osso e articulação, `src/features/onboarding/Triagem.tsx:179`). Se precisar de versão nova do estado guardado, pare e pergunte.
3. **A saída para quem ainda não foi avaliado** (pedido 11), e o fim da terceira passada pelas mesmas perguntas.

**Decisões do Gustavo, uma por vez:** cada pergunta nova e cada cuidado, palavra por palavra. É texto de segurança.

**Aceite:** uma persona de 55 anos com pressão controlada chega ao programa respondendo a verdade; cada um dos outros "sim" continua bloqueando (um teste por pergunta); a regra aparece em "Entenda o treino"; a liberação antiga por caixinha continua valendo para quem já a tinha.

### Depois dos lotes: gente de verdade

O Gustavo decidiu ver pessoas usando **só depois das melhorias**. Deixe pronto, em uma página, o roteiro: cinco pessoas que nunca viram o app, cada uma com o seu equipamento; o que observar (chega ao programa sem ajuda? em quanto tempo? onde para?); e o teste do cartão da semana no grupo da família, por 4 semanas. Nada disso coleta dado dentro do app.

### Como conduzir cada lote

1. **Ramo:** trabalhe no ramo que a sessão recebeu ou num ramo novo a partir da `main` atualizada. Nunca direto na `main`.
2. **Meça antes** o que o lote vai mudar (os toques, as telas, as personas, o peso) e guarde o antes. As medidas da análise estão em `diario-de-uso.md`; refaça-as no commit da hora.
3. **Uma mudança por vez,** cada uma com o seu commit e o seu teste.
4. **Verifique como o `CLAUDE.md` manda:** o roteiro `.claude/skills/verificar/SKILL.md` antes de dizer "pronto", antes de commit de código e antes de enviar; `npm run verificar` antes de enviar código.
5. **Decisões técnicas:** tome-as você, com o motivo e a medida, e registre-as no devlog.
6. **Fechamento de cada lote:** `npm run verificar` limpo; `docs/devlog.md` (o que mudou para quem usa, o antes e o depois, uma imagem, o rascunho de post); `docs/backlog.md`; `docs/PLANO-MVP.md`; e as frases do `CLAUDE.md` que o lote muda, **com o ok do Gustavo**.
7. **Pare e espere o Gustavo** ao fim de cada lote. Com o ok dele, leve à `main` por merge, sem forçar push. Se o lote mudou a versão do estado guardado, avise antes para ele guardar uma cópia.

**Regras de sempre**
- **Conta:** tudo o que é produzido fica no git, e só no git. Nada de publicar páginas, artefatos ou documentos fora do repositório.
- **Dados:** `privado/` nunca é versionado, copiado nem citado. As personas de teste são fictícias. `tests/repo/privacidade.test.ts` tem de continuar passando.
- **Gerador determinístico:** a mesma entrada dá a mesma saída; sem `Math.random` nem `Date.now` em `src/domain/`.
- **Evidência:** toda afirmação técnica leva selo e fonte; o que é prática de treinadores é "consenso"; a sua opinião é "[opinião]". Nada de inventar estudo. Toda regra nova tem de estar alcançável em "Entenda o treino".
- **Segurança:** o app não diagnostica. Texto de segurança só muda com a revisão do Gustavo.
- **Qualidade do guia:** exercício sem animação aprovada aparece como cartão textual, nunca com animação improvisada; mudanças no motor passam pela regressão visual.
- **Uso na academia:** celular primeiro, uma mão só, toques de 44 px ou mais, contraste, movimento reduzido.
- **Commits** pequenos, descritivos, no imperativo, em pt-BR.

**O que não fazer**
- Não pule a parada ao fim de um lote, nem leve à `main` sem o ok do Gustavo.
- Não mude o gerador nem a progressão sem o antes e o depois das personas, nem regrave snapshots ou linhas de base sem o ok.
- Não proponha feed, seguidores, comentários nem placar por carga: a análise os descartou, com motivo.
- Não proponha aplicativo de loja: não é gratuito.
- Não afirme nada sobre treino ou sobre saúde sem selo e fonte.
