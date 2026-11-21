# Prompt: sessão de desenvolvimento 2 do treino-mvp (os pacotes D1 a D4, um de cada vez)

> Escrito em 19/11/2026, a pedido do Gustavo ("monte o prompt para a próxima sessão de desenvolvimento"), depois que os marcos do R5 e as sessões temáticas (treino para todos, frontend novo, animação nova, textos e verificação) foram para a `main`. A ordem dos pacotes foi recomendada por esta sessão, a partir do que ficou aberto no `docs/backlog.md`; o Gustavo pode mudá-la antes de colar. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova. A mesma sessão pode conduzir vários pacotes, parando ao fim de cada um; se ficar longa demais, comece outra com este mesmo prompt, que ela retoma pelo `docs/devlog.md`.

---

Você vai conduzir a **sessão de desenvolvimento 2** do **treino-mvp**, um web app (PWA, Vite + React + TypeScript) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino na academia ou em casa com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão. O app já faz a jornada inteira e está pronto para ser aberto a família e amigos. Esta sessão cuida do que ainda pode **enganar, perder dados ou atrapalhar no meio do treino**, antes que mais gente use. São quatro pacotes, **um de cada vez**, com parada ao fim de cada um.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão; quando um termo técnico for inevitável, explique-o numa frase. **Ele pediu para não decidir questões técnicas:** a sessão decide (como fazer, que limiar, como medir), registra o motivo e mostra o efeito medido. Para ele ficam só as decisões de produto (o que a pessoa vê e faz, o que o app promete, os textos de segurança) e as aprovações que o `CLAUDE.md` pede. **Uma decisão por vez, com imagem** quando for de tela. Cada pacote abaixo lista as decisões dele; não tome nenhuma delas sozinho.

**Onde o projeto está (leia antes de começar).**
- **Princípios, escopo e verificação:** `CLAUDE.md`. A seção "Verificação" é nova (19/11): o roteiro `.claude/skills/verificar/SKILL.md`, a lista de conferência `docs/verificacao/lista.md` e os ganchos de `.claude/settings.json`. O porquê está em `docs/verificacao/README.md`.
- **Histórico:** `docs/devlog.md` (as entradas de 12/11 em diante contam o estado atual) e `docs/backlog.md` (as seções "Da sessão treino para todos", "Do frontend novo", "Da animação nova", "Da sessão de textos" e "Da verificação permanente" são a fonte destes pacotes).
- **Plano:** `docs/PLANO-MVP.md`, seção i.
- **O código:** `src/domain/` (funções puras e testadas: o gerador, a progressão, o acompanhamento, os locais, a triagem, o avaliador), `src/engine/novo/` (o motor do Boneco em uso; o resto de `src/engine/` é o motor antigo, fora do app), `src/features/` (as telas), `src/conteudo/` (fichas, cartões e as frases das regras), `src/storage/` (o estado guardado, **versão 9**), `scripts/auditoria/` (a população de 680 mil programas, a régua da G5, a grade), `tests/` (unitários, e2e, motor, repositório e as personas fictícias de `tests/personas/`).
- **Para olhar uma tela com a persona Ana já cadastrada:** `node scripts/design/frontend-novo/olhar.mjs` (uso no cabeçalho do arquivo e no passo 4 do roteiro de verificação).

**Os pacotes, na ordem recomendada.**

| # | Pacote | Por que nesta ordem | Esforço |
|---|---|---|---|
| D1 | **O app diz o que faz** | Uma regra que promete o que o app não faz engana quem treina, e a revisão das frases achou 3 casos assim sem procurar | 2–3 dias |
| D2 | **Nada se perde no meio do caminho** | Dados apagados sem aviso e a nota de dor escondida são os riscos mais sérios para quem usa | 3–4 dias |
| D3 | **Os ajustes do treino que já têm medida** | Defeitos do programa medidos na sessão "treino para todos" e deixados para depois | 3–4 dias |
| D4 | **Mais leve e sem o motor antigo** | Limpeza e peso: importa, mas não engana nem perde nada | 2–3 dias |

Antes de começar, confira no `docs/devlog.md` e no `git log origin/main` se algum pacote já foi feito (por esta sessão ou por outra) e retome do próximo. Veja também se outra sessão está mexendo nos mesmos arquivos (os ramos com commits recentes: `git for-each-ref --sort=-committerdate refs/remotes --count=10`); se estiver, registre o choque e pergunte ao Gustavo antes de seguir.

### D1. O app diz o que faz (a conferência regra por regra)

As 166 regras de `docs/pesquisa/regras.md` têm uma frase simples em "Entenda o treino" (`src/conteudo/frases-das-regras.json`), e as frases passaram a mostrar os `valores` de cada regra. A revisão das frases (17/11) só foi ao código nas dúvidas, e mesmo assim achou três regras que o app não cumpria (`rir.calibracao`, `volume.manutencao.piso` e o bloqueio depois do alerta do coração). Pode haver outras.

1. **Confira cada regra contra o código**: os valores, as condições e o que a tela mostra. Use subagentes em paralelo, cada um com um grupo de regras, a frase, o texto da regra e acesso ao código, **sem a sua hipótese**; cada achado é conferido por você no código antes de entrar. Registre o resultado em `docs/revisoes/regras-x-codigo.md`, regra por regra: **bate**, **o código diverge**, **a frase diverge** ou **não está no app** (e se a frase diz isso).
2. **O que você decide e faz:** onde o código contraria a regra num detalhe técnico (um valor, um arredondamento, uma condição esquecida), conserte o código com um teste que prenda a regra. Se o conserto muda programas, valem as regras do D3 (personas e régua antes e depois).
3. **O que vai para o Gustavo, uma por vez:** quando consertar muda o que o app promete ou faz para a pessoa (a regra diz uma coisa, o app faz outra, e as duas são razoáveis), mostre as duas opções em palavras simples e espere. Junto, o pedido 8 de `docs/revisoes/frontend-novo/pedidos-ao-dominio.md`: uma fonte "título não conferido" aparece para a pessoa ou fica só no repositório?
4. **De carona:** "Entenda o treino" baixa o arquivo das regras e o das fontes assim que abre, e o comentário em `Entenda.tsx` diz o contrário (`backlog.md`, "Da sessão de textos", achados).

**Aceite:** as 166 regras classificadas; nenhuma divergência sem conserto ou sem decisão do Gustavo; nenhuma regra que "não está no app" sem a frase dizer isso; um teste novo para cada conserto.

### D2. Nada se perde no meio do caminho

O que ficou aberto nas revisões do frontend novo e da sessão de textos que pode fazer a pessoa perder dados ou se perder no treino (`backlog.md`, "Do frontend novo" e "Da sessão de textos"; os pareceres em `docs/revisoes/frontend-novo/revisao-*.md`).

- **Trazer uma cópia substitui tudo** com um botão neutro, ativo mesmo sem arquivo, sem oferecer guardar antes (I13). Depois de apagar os dados, nada diz "dados apagados", e a confirmação tem três saídas (A13).
- **Gerar o programa de novo num toque**, pela ação de ajuste do início, sem confirmar nem desfazer (início, item 9).
- **Não há como apagar um local** (A16).
- **O guia completo carrega os textos de todos os exercícios de uma vez:** se um arquivo falha ao baixar (sem rede, versão nova publicada), a tela cai na tela de erro (pedido 9 de `pedidos-ao-dominio.md`; item 30 do revisor).
- **A nota de dor no "Senti algo"**, o uso mais comum da folha, fica abaixo da dobra: em 390 × 844 é preciso rolar, e em 320 px ela vem depois das 7 opções (item 10 do revisor; "Da sessão de textos").
- **Acessibilidade no treino** (item 31): depois de salvar a série, o foco cai no corpo da página (deveria ir para o descanso); o botão "Série feita" desligado sai da ordem de foco; no guia, nada recebe o foco ao abrir.

**Decisões do Gustavo, uma por vez, com imagem:** encerrar o treino por um sinal de alerta pede confirmação ou continua com um toque (pedido 7: rapidez em emergência contra toque sem querer)? A triagem que pausa o programa ganha uma saída para quem ainda não foi avaliado, e com que texto (pedido 11; texto de segurança)? Gerar o programa de novo pede confirmação antes ou oferece desfazer depois?

**Estado guardado:** prefira soluções que não mudem o esquema. Se alguma precisar de versão nova (desfazer a geração guardando o programa anterior, por exemplo), pare e pergunte: versão nova pede migração com teste, não volta atrás e obriga o Gustavo a exportar os dados antes da junção.

**Aceite:** um teste de tela para cada item (trazer uma cópia oferece guardar antes e não age sem arquivo; apagar diz que apagou; o programa não é refeito sem a escolha da pessoa; o local apaga e o programa segue válido; o guia sem rede mostra o que tem e um aviso, sem a tela de erro; a nota de dor visível sem rolar em 390 × 844 e em 320 × 640; o foco no descanso depois de salvar a série).

### D3. Os ajustes do treino que já têm medida

Defeitos do programa medidos pela sessão "treino para todos" e deixados para depois (`backlog.md`, "fechamento da etapa 2" e "pacote 5"). Faça na ordem; cada um é uma mudança separada, com a regra primeiro.

1. **O aviso de "sem melhora" se repete a cada treino** depois que dispara (17 de 48 sessões no simulador): avisar uma vez e voltar a avisar só depois de outra janela. É mudança de regra e de tela.
2. **Com 3 focos ou mais, a série que sobra vai para o braço enquanto a perna está no mínimo** (o Bruno: bíceps de 12,5 para 13,5 séries, pernas com 8).
3. **Pernas sem equipamento com dor forte no ombro passam do tempo** (dia de 51 a 54 min em 45 min): o corte de tempo não alcança esse dia.

**Como medir (como nos marcos do R5):** antes e depois nas 6 personas, na população (`scripts/auditoria/`) e na régua da G5. **Nenhum defeito pode piorar** em relação à `main`, e só entra o que melhora alguma nota. Se o programa muda de forma visível, faça a **revisão cega**: um subagente no papel de treinador independente recebe só as semanas das personas, a `main` e a versão nova embaralhadas, e um briefing, sem acesso ao repositório. É opinião de treinador simulado, não evidência; serve para achar o que a régua não mede. Regra nova ou mudada vai antes para `docs/pesquisa/regras.md` (selo e fonte) e ganha a frase simples, que o teste `tests/repo/frases-das-regras.test.ts` exige.

**Decisões do Gustavo:** a frase do aviso de "sem melhora"; regravar os snapshots das personas (só depois de ele ver o antes e o depois; o gancho pede a confirmação). O resto dos "para medir depois" do backlog (a Carla com dias curtos, o hip thrust e a lombar, a rosca Scott e o ombro) fica fora: ou pede fonte, ou pede uma decisão de produto que ainda não foi tomada.

**Aceite:** os três defeitos medidos antes e depois, com a tabela no devlog; nenhum par "grupo × defeito" pior; a revisão cega sem persona pior, se houver mudança visível.

### D4. Mais leve e sem o motor antigo

- **Apagar o motor antigo** (`backlog.md`, "Da animação nova", "Para apagar de vez"), nesta ordem: levar a auditoria de anatomia para o motor novo; trocar a pessoa dos cartões de equipamento; aposentar o laboratório (`/lab/boneco`) e as folhas de comparação; então apagar o código de `src/engine/` fora de `novo/`, os testes dele, as três linhas de base antigas e as regras de CSS do desenho de antes. As linhas de base são gabaritos: apagar pede o ok do Gustavo (o gancho pergunta). A regressão do motor novo continua com 0 pixel de diferença.
- **O peso:** a tela do programa baixa 275 kB de código na primeira visita (o limite do teste subiu de 220 para 285 kB). Tirar os textos de fonte das fichas do pacote de cada exercício economiza cerca de um terço do motor. Meça antes e depois e, se baixar, desça o limite de `tests/e2e/orcamento.spec.ts` junto.
- **A primeira volta pesada** de seis animações (de 12 a 27 ms por pose no computador): calcular de antemão, como já é feito com o enquadramento (`scripts/animacao-nova/preparo.mjs`), se a medida mostrar ganho.
- **A margem de 206 px como teste de verdade** (`backlog.md`, "Da verificação permanente"): uma folga mínima de alguns pixels nos cenários de zoom de 200%, para não depender de alguém olhar. Quando o teste existir, encurte o item 5 de `docs/verificacao/lista.md`.

**Decisões do Gustavo:** apagar as linhas de base antigas.

**Aceite:** nenhuma tela de produção nem ferramenta em uso depende de `src/engine/` fora de `novo/`; o peso medido antes e depois; o teste da margem falhando numa tela de propósito apertada e passando nas reais.

### Como conduzir cada pacote

1. **Ramo:** trabalhe no ramo que a sessão recebeu ou num ramo novo a partir da `main` atualizada. Nunca direto na `main`.
2. **Meça antes** o que o pacote vai mudar (os testes, a população, o peso, as telas) e guarde o antes.
3. **Uma mudança por vez**, cada uma com o seu commit e o seu teste.
4. **Verifique como o `CLAUDE.md` manda:** o roteiro `.claude/skills/verificar/SKILL.md` antes de dizer "pronto", antes de commit de código e antes de enviar. Os ganchos ajudam: ao parar, o `npm run check` roda sozinho se a sessão mudou código (deixe-o rodar; ele leva cerca de 1,5 min); antes de cada `git push`, o portão confere se o conteúdo passou pelo `npm run verificar` (por enquanto só avisa; diga no relato quando ele avisar); regravar ou apagar um gabarito pede confirmação. Teste que falha às vezes é defeito a investigar, não azar (foi assim que a sessão de 19/11 achou o botão que piscava no cartão de texto).
5. **Decisões técnicas:** tome-as você, com o motivo e a medida, e registre-as no devlog ("decidido pela sessão").
6. **Fechamento de cada pacote:** `npm run verificar` limpo; `docs/devlog.md` (o que mudou para quem usa, uma tabela de antes e depois, uma imagem quando houver tela, o rascunho de post); `docs/backlog.md` (o que saiu e o que ficou); a linha do pacote em `docs/PLANO-MVP.md`, seção i; e a lista de conferência podada (`docs/verificacao/lista.md`: saem os itens que um teste passou a cobrir; entra o que escapou).
7. **Pare e espere o Gustavo** ao fim de cada pacote: mostre, em linguagem simples, o que mudou para quem usa, os números e o que ficou de fora. Com o ok dele, leve à `main` por merge, sem forçar push. Se o pacote mudou a versão do estado guardado, avise antes para ele exportar os dados do app ("Meus dados" → "Guardar uma cópia"). **Depois de enviar à `main`, acompanhe a verificação do GitHub até o fim** (ela leva cerca de 13 min) e só então envie outro commit à `main`: um envio novo cancela a verificação que está rodando. Se ela falhar, conserte com o ok dele. Só então comece o pacote seguinte.

**Regras de sempre**
- **Conta:** o projeto é acessado só pelas contas pessoais do Gustavo, nunca pela conta de trabalho. Tudo o que é produzido fica no git, e só no git: nada de publicar páginas, artefatos ou documentos fora do repositório.
- **Dados:** `privado/` nunca é versionado, copiado nem usado em fixtures, README, devlog ou posts. As personas de teste são fictícias (`tests/personas/`). `tests/repo/privacidade.test.ts` tem de continuar passando.
- **Não mexa no ramo `r3-uso-real`** (o uso real do Gustavo).
- **Gerador determinístico:** a mesma entrada dá a mesma saída; sem `Math.random` nem `Date.now` em `src/domain/`. A lógica "vaga por função, nunca por equipamento" fica.
- **Evidência:** toda afirmação técnica leva selo e fonte (`docs/pesquisa/00-metodo.md`); o que é prática de treinadores é "consenso"; o que vem de apps é "[mercado]"; a sua opinião é "[opinião]". Fonte nova entra em `docs/pesquisa/fontes.md` com o status de leitura, conferida no PubMed ou no Crossref. Nunca contorne bloqueio anti-robô; nada de inventar estudo. Toda regra nova precisa estar alcançável em "Entenda o treino", com a sua frase simples.
- **Segurança:** dor articular, dor aguda, formigamento, tontura ou perda de força incomum interrompem o exercício, oferecem uma alternativa e recomendam avaliação profissional. O app não diagnostica. Texto de segurança só muda com a revisão do Gustavo.
- **Qualidade do guia:** exercício sem animação aprovada aparece como cartão textual, nunca com animação improvisada; mudanças no motor passam pela regressão visual (as animações aprovadas com 0 pixel de diferença).
- **Escopo:** fora do MVP ficam nutrição, login e nuvem, pagamentos, app nativo, social, relógios, cardio prescrito e deload automático. Ideias novas vão para `docs/backlog.md`. Não proponha de novo o que o backlog descartou sem um motivo novo e medido.
- **Fora desta sessão** (cada um tem dono ou pede gente de verdade): as etapas 2 a 5 do estudo dos textos (sessão de textos); as decisões abertas da animação nova (o segundo corpo, o cor de pele); o uso real, o iPhone, o leitor de tela de verdade e o export do Gustavo; a triagem com perguntas de acompanhamento (de lado por decisão dele).
- **Commits** pequenos, descritivos, no imperativo, em pt-BR, com push. Use a data de hoje do ambiente nas mensagens e nos documentos.
- **Subagentes:** use-os para pesquisa, conferência e revisão em paralelo, cada um com a pergunta e o material (não a sua hipótese); confira o que eles trouxerem antes de registrar.

**Comandos**
- `npm run dev`: servidor local.
- `npm run check`: lint, tipos e testes unitários (a camada barata, cerca de 1,5 min).
- `npm run verificar`: o mesmo que o GitHub roda (lint, tipos, unitários com cobertura e testes de tela; cerca de 8 min). Rode sem nada pesado em paralelo.
- `npm run test:e2e -- --trace off`: só os testes de tela (Playwright, build + preview); o Chromium instalado precisa da versão fixada 1.63.0.
- `npm run auditoria` e `npm run auditoria:verificar`: as grades de estresse, duas rodadas idênticas.
- `npm run conferir:animacao`: a conferência do motor novo.

**O que não fazer**
- Não pule a parada ao fim de um pacote, nem leve à `main` sem o ok do Gustavo.
- Não mude o gerador sem o antes e o depois das personas e da população, nem regrave snapshots ou linhas de base sem o ok.
- Não use IA no lugar das regras do gerador; a IA só reconhece equipamento nas fotos e, se fizer sentido, redige explicações a partir do que as regras escolheram.
- Não afirme nada sobre treino sem selo e fonte.
