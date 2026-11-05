# Prompt: o R4 do boneco (erro sobre o certo, rótulos fora do corpo, vista pelo movimento) e as 12 animações do elástico

> Escrito ao fim da auditoria independente (05/11/2026), a pedido do Gustavo, que aprovou a direção do R4 com as propostas 1 a 3 da Parte D de `docs/revisoes/auditoria-fable.md`. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir o **marco R4 do boneco** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o numa frase.

**O que ele decidiu (05/11/2026).** Depois de ver a folha-piloto `docs/revisoes/auditoria-fable/erros-piloto.png`, aprovou a direção do R4 com três mudanças, nesta ordem, e **sem estilo novo de boneco**: o esqueleto, as poses e os músculos ficam como estão. O que muda é a cena (o erro, os rótulos e a vista), não o corpo. Com as três aprovadas folha a folha, saem as **12 animações do elástico**, que esperam o R4 desde 04/11.

Leia primeiro:
- o `CLAUDE.md`, que traz os princípios não negociáveis (precisão vale mais que quantidade; exercício sem animação aprovada aparece como cartão de texto; mudanças no motor passam pela regressão visual);
- `docs/revisoes/auditoria-fable.md`, Parte D (D.2: o que o boneco não mostra bem, com os exemplos; D.3: as propostas com custo e caminho; D.4: a folha-piloto) e Parte E.3 (a fila);
- `docs/revisoes/boneco-acabamento/relatorio-auditor.md` (a auditoria do acabamento A2, que já pôs no motor o "fantasma só no que muda", a mão em luva, o tronco inteiro e os membros que afinam);
- `docs/pesquisa/animacoes/README.md` (o ritual de cada animação) e `docs/prompts/sessao-catalogo-continuacao.md`, seção "O ritual de cada folha";
- `src/engine/estilo/index.ts` (a cena do Boneco: `cenaEstilo`, `fantasmaDif`, `erroSobreOCerto`, `caixaPerto`, `vistaDaMiniatura`), `src/engine/estilo/corpo.ts` (o corpo), `src/engine/desenho.ts` (`TX`, os rótulos; `VIEWS`), `src/features/guia/Guia.tsx` (a tela do guia: qual vista e qual modo abrem).

## Regras desta sessão
- **Conta:** o projeto é acessado só pelas contas pessoais do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca pela da Futurum. Tudo o que é produzido fica no git, e só no git: **nada de publicar páginas, artefatos ou documentos fora do repositório.**
- **Não mexa no branch `r3-uso-real`** (o R3, uso real, roda noutra sessão). `privado/` nunca é versionado nem usado; as personas de teste são fictícias (`tests/personas/`).
- **Branch de trabalho:** crie uma nova a partir da `main` (`d3d2711` ou mais recente), com um nome como `r4-boneco`. A `main` já tem tudo da auditoria. Ida para a `main` só no fim, depois de `npm run check`, `npm run test:e2e` e `npm run auditoria` (duas rodadas com arquivos idênticos), por merge ou rebase, **sem forçar push**, e avisando o Gustavo para exportar os dados do app antes ("Meus dados" → "Guardar uma cópia").
- **Rede:** está 100% liberada. Leia o que precisar, registre em `docs/pesquisa/fontes.md` com o status de leitura (`00-metodo.md` define `verificado-busca`, `resumo-PubMed`, `texto-completo` e `NÃO VERIFICADO`), e nunca contorne bloqueio anti-robô. Nada de inventar estudo.
- **Nenhuma animação improvisada.** Toda animação passa pela folha (`node scripts/folha-animacao.mjs <id> <saida.png> --estilo=a`), pela medida (`node scripts/medir-animacao.mjs <id>`: ik = 0 na animação e em cada erro; mãos a 10–14 cm no objeto seguro com as duas; objeto encostado no corpo quando apoiado nele; nenhum objeto "voando") e pela conferência escrita "o que a fonte pede × o que o boneco faz (medido) × confere?" (modelos em `docs/revisoes/catalogo/conferencia/`).
- **Linhas de base:** `tests/visual/linha-de-base/estilo-a.json` é a linha de base do Boneco (hash do SVG de cada quadro); `novas.json` e `motor.json` são as do motor. Uma mudança de cena muda centenas de quadros de uma vez: **só regrave depois de o Gustavo aprovar as folhas** (`ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor`, depois sem a variável para confirmar; `ATUALIZAR_NOVAS=1` para as animações novas). Mudança só de CSS (cores) não muda o hash, então também precisa de aprovação visual.
- **Decisões, uma por vez:** mostre a folha, a medida e as opções, sem nada marcado de antemão; o que for grande (tirar uma vista, mudar a convenção de cores, mexer no corpo) fica como opção para o Gustavo, com a sua recomendação marcada. O que você decidir sozinho fica registrado com o porquê.
- **Commits pequenos, em pt-BR e no imperativo**, com push. Ao fim do marco: `docs/devlog.md` (o que mudou, uma imagem, o rascunho de post), `docs/backlog.md` e parar para a revisão do Gustavo.

## Onde o projeto está (05/11/2026)
- **139 exercícios** na biblioteca, **66 com animação aprovada**, 52 com cartão de texto, 21 sem guia nenhum. 73 esperam animação (`docs/revisoes/catalogo/fila.md`, mais as 4 entradas da auditoria, que vão para o topo do bloco A).
- **O Boneco** (estilo `a`, acabamento A2) é o padrão do app. O modo Erros desenha a figura que erra em vermelho cheio e o certo em palitos verdes só nas cadeias que mudam mais de 3 cm (`fantasmaDif`). O modo Músculos abre na vista em que o músculo principal aparece mais (`vistaDaMiniatura`) e aproxima a câmera quando o corpo ocupa menos de 70% do palco (`caixaPerto`, `PERTO_ABAIXO_DE`). O modo Técnica abre na 1ª vista de `views` e não aproxima a câmera.
- **A chave do piloto já está no motor, desligada:** `CTX.ACABAMENTO.erroInvertido` em `src/engine/estilo/index.ts` (função `erroSobreOCerto`), com as classes `.gh-e`, `.hd-ge` e `.lbl-e` em `src/styles.css`, e o script `scripts/piloto-erros.mjs`, que liga a chave só para gerar a folha. O título do erro vem do texto do guia (`src/conteudo/exercicios/<id>.json`, `errors[].title`); o motor lê `e.titulo` se existir.
- **As 12 animações do elástico:** a peça `band` está em `src/engine/desenho.ts`; a 1ª pose (remada sentada com elástico) está em `src/engine/exercicios/revisao/remada-elastico.ts`, com a folha em `docs/revisoes/elastico/folhas/remada-elastico.png` e o texto em `src/conteudo/revisao/remada-elastico.json`; os 12 têm cartão de texto e ficha. A lista, por frequência: flexão de joelho, rosca, elevação lateral, crucifixo, stiff, remada sentada, face pull, puxada ancorada no alto, tríceps acima da cabeça, desenvolvimento, agachamento e flexão de braço com elástico (bloco F da fila; 311 mil prescrições no estresse).
- **O retorno do Gustavo** que motivou o R4 (04/11, na folha do elástico): "precisa aprimorar ainda o boneco, em especial a visualização do treino e do erro". O que a sessão de então viu de fraco nessa folha: de lado, o braço da frente cobre o tronco e as mãos; de trás, sentado no chão, as pernas e o elástico somem; nos erros, a figura vermelha e o esqueleto verde se misturam, e o "encolher" quase não se vê.

## O que fazer, nesta ordem
### 1. Proposta 1: o erro sobre o certo (ligar no app)
O certo é a figura cheia; só a parte do corpo que erra aparece em vermelho tracejado grosso, com o nome do erro ao lado da junta que mais se afasta. Para erros pequenos (sem cadeia que mude 3 cm: escápulas, pegada), cai no modo de hoje.
- Ligue `erroInvertido` no acabamento padrão (`acabamento(ex)` em `estilo/index.ts`) e faça a tela do guia passar o título do erro ao motor (hoje só o script faz isso).
- Decida com folhas, uma família de erro por vez: (a) o instante do quadro de erro: hoje é o meio da 3ª fase; proponha escolher o instante em que a diferença entre o certo e o errado é maior (determinístico, medido em cm); (b) o que fazer com o equipamento da pose errada (hoje o certo leva o equipamento; o halter "errado" não aparece); (c) os erros pequenos: mostrar o certo cheio e o errado inteiro em contorno vermelho fino, ou manter o modo de hoje; (d) a legenda do guia (hoje "vermelho = errado, verde = certo") e o tema escuro.
- Gere uma folha com **todos os erros de todas as 66 animações** (um script a partir de `scripts/piloto-erros.mjs`), em páginas, e mostre ao Gustavo em lotes de 10 a 12 exercícios. Só depois do "aprovar" de cada lote, regrave `estilo-a.json`.
- Teste: um teste unitário que confere que, no modo Erros, o SVG tem o rótulo do erro e só as cadeias que mudam em vermelho (conte os `gh-e`), em 3 exercícios conhecidos; e que um erro pequeno cai no modo de hoje.

### 2. Proposta 2: rótulos fora do corpo
Um passo depois de desenhar: qualquer rótulo de técnica (`lbl-g`) cuja âncora cai dentro da caixa do corpo vai para a faixa de cima ou de baixo do palco (a que tiver espaço), com uma linha fina até o ponto. Rótulos que já estão fora não se movem.
- Caminho: `TX` em `desenho.ts` guarda a âncora 3D e o texto; `cenaEstilo` (modo `tec`) faz o reposicionamento com a caixa do corpo ao longo do ciclo (`caixaPerto` tem a conta). Determinístico, sem sobreposição entre rótulos (empilhe na faixa).
- Os piores casos para a folha-piloto: tríceps na suspensão ("cotovelos parados" sobre o braço), remada na suspensão ("corpo reto" na linha do chão), remada sem banco ("mão livre na coxa" apontando para uma mão escondida), remada com elástico ("elástico na sola dos pés" em cima do pé), face pull de cima.
- Mesma regra: piloto de 6 exercícios lado a lado com o atual, aprovação, depois o lote inteiro e a linha de base.

### 3. Proposta 3: a vista que abre é a que mostra o maior movimento
O modo Técnica abre na vista em que a trajetória da mão ou do pé (`paths`) é mais longa na tela: projete o caminho de `paths[view]` em cada vista e escolha a maior (como `vistaDaMiniatura` faz com a área do músculo). Empate (menos de 15% de diferença) mantém a 1ª vista de `views`.
- Caminho: uma função no motor (`src/engine/estilo/index.ts`), usada em `src/features/guia/Guia.tsx` e na miniatura do cartão do treino. **Não muda nenhuma linha de base** (é a escolha da vista inicial).
- Liste quais exercícios mudam de vista inicial (medido) e mostre ao Gustavo antes de ligar. Suspeitos: elevação lateral (de frente), abdução e adução deitado (de cima), remada com elástico.
- Teste unitário com a lista medida.

### 4. Enquanto as folhas esperam o "aprovar": as 12 poses do elástico
As poses são dados; a cena é aplicada por cima. Faça as 12 poses em `src/engine/exercicios/revisao/`, cada uma com folha, medida e conferência escrita (`docs/revisoes/elastico/conferencia/`), a partir da remada sentada já feita e das animações aprovadas mais parecidas (a rosca alternada, a elevação com halteres, o crucifixo na polia, o stiff, o face pull, a puxada unilateral, o tríceps francês, o desenvolvimento, o agachamento com o peso do corpo e a flexão). A âncora do elástico (porta, pé, poste) é escolha de desenho: diga qual e por quê, e mostre o elástico esticando com a fase (a peça `band` calibra).
- Texto completo do guia para cada uma (`src/conteudo/revisao/<id>.json`, schema `conteudoExercicioSchema`), com os mesmos ids de erro do cartão.
- **Medido na auditoria:** animar as 12 muda o desempate entre equivalentes e pode mudar os programas das personas que têm elástico (Diego, Bruno, Carla): meça com `npx vitest run` antes de aprovar, mostre o antes e o depois, e só então `npx vitest run -u`.
- Aprovação: `node scripts/aprovar-animacao.mjs <id> <id>` e `git add -A`, `SO_AJUDA`/`LISTA` conforme a conferência, `npm run check`, um commit por animação, linhas de base no fim.

### 5. Depois das 12: as 4 entradas da auditoria
Abdução e adução deitado sem carga (das caneleiras, sem a peça), panturrilha sentada com halter (do corpo sentado da extensão com caneleira, com o halter 3D no joelho) e extensão de joelho com elástico (da extensão com caneleira, com a peça `band` presa atrás). São 237 mil prescrições no estresse e nenhuma peça nova. Mesmo ritual.

### 6. Fechamento
`npm run check`, `npm run test:e2e`, `npm run auditoria` duas vezes com `diff` vazio; a ida para a `main`; `docs/devlog.md` (entrada "R4: o erro sobre o certo…", com uma imagem antes × depois e o rascunho de post); `docs/backlog.md` com o que ficou (as propostas 4 a 7 da Parte D: câmera perto do corpo no modo Técnica, vista de cima na adução, mão por cima do disco de frente, sombra no chão); o recado ao R3 (`docs/prompts/recado-r3-<nome>.md`) com o que entrou e o que muda no programa do Gustavo.

## O que não fazer
- Não mude o corpo (`corpo.ts`), o esqueleto nem as poses aprovadas; o R4 é de cena.
- Não troque a convenção de cores sem o Gustavo decidir (a proposta 9 da auditoria do acabamento, "certo em azul ou tracejado escuro", é opção, não decisão).
- Não regrave linha de base sem folha aprovada.
- Não anime nada fora da lista acima sem medir o efeito nos programas.
