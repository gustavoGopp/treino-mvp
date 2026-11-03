# Prompt: sessão de catálogo completo e fechamento do equipamento mínimo

> Rascunho escrito ao fim da sessão de equipamento mínimo (03/11/2026), a pedido do Gustavo. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir a **sessão de catálogo completo e fechamento do equipamento mínimo** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco").
- **Quem é o Gustavo:** o dono do app. Ele não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão.
- **Termo técnico:** quando for inevitável, explique-o numa frase.

Seu papel tem três partes:
1. **Fechar a etapa anterior:** decidir com ele o que ficou em aberto e levar o trabalho para a `main`.
2. **Fazer a pesquisa mais completa possível do catálogo de exercícios:** todos os padrões de movimento, do iniciante ao avançado, com todo equipamento que faça sentido, inclusive os que a taxonomia ainda não tem. A meta é uma gama diversa de treinos, sempre com o melhor treino possível para cada pessoa.
3. **Responder com evidência a pergunta do Gustavo sobre outros objetivos**, como cutting, força e condicionamento, e apresentar as opções para ele decidir.

## Onde o projeto está (fim de 03/11/2026)
- **Na `main`:** tudo até a reformulação visual (ver `docs/devlog.md`).
- **R3 (uso real) em andamento noutra sessão:** o Gustavo treina 4 semanas só com o app, no branch `r3-uso-real`. **Não mexa nesse branch.**
- **A sessão de equipamento mínimo** está no branch `claude/affectionate-shannon-16bhl3`, **ainda fora da `main`**:
  - leia `docs/revisoes/equipamento-minimo.md` (achados, decisões do Gustavo, antes × depois), `docs/pesquisa-v2/10-equipamento-minimo.md` (pesquisa) e `docs/devlog.md` (a entrada "Equipamento mínimo").
  - **O que entrou:**
    - o atalho "Corpo livre";
    - 4 exercícios de peso do corpo: flexão com as mãos juntas, pike, flexão de joelho deslizante e nórdico;
    - a escada de dificuldade própria de cada exercício (`src/domain/progressao/escadas.json`), com o elástico pelas intensidades e faixas mais estreitas;
    - o aviso de quando não há nada para puxar, sem sugerir compra;
    - a divisão de corpo todo recomendada quando não há puxar;
    - o corte de tempo que nunca zera um músculo;
    - as personas Elisa (sem nada) e Fábio (só barra de porta), o teste de propriedade e o e2e do "Corpo livre".
  - **Decisões do Gustavo que valem agora:**
    - o app **não sugere compra**: "se a pessoa marcou que não tem nada, ela não tem nada"; sugere só exercícios;
    - **mochila, galão e objetos improvisados não entram como carga**;
    - a remada invertida na mesa não entra, pelo mesmo motivo e pela segurança;
    - **todos os exercícios devem ter animação**, que é "a parte mais importante";
    - o aviso de limite do peso do corpo é sutil, só no fim da escada.
- **As 9 animações em revisão** (folhas em `docs/revisoes/equipamento-minimo/folhas/`, poses em `src/engine/exercicios/revisao/`, textos em `src/conteudo/revisao/`) **esperam a aprovação do Gustavo, folha a folha**:
  - agachamento, afundo e búlgaro com o peso do corpo;
  - barra fixa supinada;
  - ponte de glúteo;
  - flexão com as mãos juntas, pike, flexão de joelho deslizante e nórdico.
  - Até lá, cada uma aparece como cartão de texto.
- **Os snapshots** das personas (Ana, Diego, Bruno, e os novos de Elisa e Fábio) foram regravados no branch e **esperam a revisão do Gustavo**. O antes × depois está no relatório.
- **A base de hoje:**
  - 110 exercícios em `src/domain/biblioteca/exercicios.json` (schema zod em `src/domain/biblioteca/index.ts`);
  - 46 equipamentos em `src/domain/taxonomia/equipamentos.ts`, tratados por capacidade; o peso do corpo é a capacidade `apoio`, sempre presente;
  - 22 funções (as "vagas" do gerador) em `src/domain/gerador/funcoes.json`;
  - as regras com selo em `docs/pesquisa/regras.md` (geram `src/domain/regras/regras.json` com `node scripts/gerar-regras.mjs`);
  - as fontes em `docs/pesquisa/fontes.md` (formato exigido por `tests/repo/pesquisa.test.ts`).
- **O teste de estresse:** `npm run auditoria` roda a auditoria do treino (`scripts/auditoria/`, 149.760 programas) e o cenário mínimo (`scripts/auditoria/minimo*.ts`, 483.840 programas), sempre com resultado reproduzível.
- **A pesquisa:** `scripts/pesquisa/pubmed.py s <termos>` e `a <PMIDs>`. O PubMed às vezes devolve uma página anti-robô quando há muitas buscas seguidas. Espere e repita; se não abrir, registre como **NÃO VERIFICADO**.

## Parte A: fechar o que ficou em aberto (debate com o Gustavo)
Apresente cada item com a evidência, o efeito medido e as opções, **sem nada pré-marcado**. Ele decide item a item.

1. **As 9 folhas de animação, uma a uma.** Mostre cada PNG e diga o que olhar:
   - **as 3 de perna sem os adutores no desenho:** a biblioteca os conta como secundários, e o teste de anatomia do "achado 6" quebra na aprovação se as entradas não forem para `src/engine/estilo/musculos.ts`;
   - **a ponte:** pela geometria real, o quadril sobe pouco;
   - **o nórdico:** as mãos amortecem a descida, e a âncora dos calcanhares é um sofá feito de caixas;
   - **o pike:** a vista de frente vira um bloco.
   - Só com o ok dele:
     - rode `node scripts/aprovar-animacao.mjs <animacao> <exercicio>`;
     - regrave `novas.json` (`ATUALIZAR_NOVAS=1 npx playwright test --project=motor`);
     - regrave `estilo-a.json` (`ATUALIZAR_ESTILO_A=1 npx playwright test --project=motor estilo-a`).
2. **Os snapshots das personas**, com o antes e o depois do relatório.
3. **Kettlebell valendo como halter** nos exercícios de um peso só (remada unilateral, stiff unilateral, afundo com o peso no peito, desenvolvimento unilateral, ponte com peso).
   - Selo: consenso, pela equivalência robusta de equipamento (`haugen2023`).
   - Hoje o kettlebell sozinho abre 1 exercício.
4. **Flexão na suspensão** e os outros exercícios propostos para a suspensão, as paralelas, a bola e o step (`pesquisa-v2/10`, pergunta 5).
5. **Aviso de tempo que sobra por falta de exercício.** Sem nada, o dia mais longo para em ~50 min com 90 min escolhidos.
6. **Lista "o que tem em casa":** cadeira firme, sofá ou cama pesados, chão liso, degrau, onde prender o elástico. A pessoa declara, nunca a foto. É o que permitiria saber se o búlgaro, o nórdico e a puxada com elástico são possíveis.
7. **Flexão com as mãos fechadas** no cartão de quem tem dor leve no punho.
8. **Juntar o aviso da vaga e os avisos por músculo.** Sem nada, a pessoa vê "Sem algo para puxar" e mais 4 avisos.
9. **Animações do elástico.** Com elásticos, 62% das prescrições ainda não têm guia. Pede a peça nova no motor: o custo está em `pesquisa-v2/08`, seção 6.
10. **A seção da página "Diagnóstico do treino-mvp".**
    - Ela está pronta em `docs/revisoes/equipamento-minimo/secao-diagnostico.html`.
    - A sessão anterior não conseguiu abrir a página; peça ao Gustavo o acesso.
    - Leia a versão publicada logo antes de publicar, porque outras sessões também a atualizam.
11. **Levar para a `main`.**
    - Lembre o Gustavo de exportar os dados antes ("Meus dados" → "Guardar uma cópia"), porque ele está no R3.
    - Combine com a sessão do R3 como o `r3-uso-real` recebe as mudanças. Ele treina com o app agora: **nenhuma mudança no programa dele sem o ok dele**.

## Parte B: o catálogo completo de exercícios (pesquisa aprofundada)
O Gustavo quer **uma gama diversa de treinos, do iniciante ao avançado, sempre o melhor treino possível para cada pessoa**, e quer **incluir exercícios de outros aparelhos que ficaram de fora**. Guarde o princípio do projeto: **precisão vale mais que quantidade** (`CLAUDE.md`). Um exercício só entra se tiver três coisas:
- base com selo (estudo de hipertrofia, EMG como apoio indireto, ou consenso dito como consenso);
- uma forma segura de ser guiado;
- a garantia de que não é uma repetição inútil de outro exercício.

"Diverso" quer dizer **cobrir todo músculo, em todo nível e em todo cenário de equipamento**, e não quer dizer inflar a lista.

### B.1 O mapa do que existe e do que falta (medido, por script)
1. Monte a grade **músculo × padrão de movimento × nível (iniciante, intermediário, avançado) × equipamento** com a biblioteca de hoje. Mostre onde há 0 ou 1 opção. Estenda `scripts/auditoria/base.ts` ou crie um script novo ligado ao `npm run auditoria`.
2. Para cada cenário (os atalhos casa, condomínio e academia; o vazio; cada item sozinho; os pares de casa), mostre:
   - quantas opções cada vaga tem por nível;
   - o que falta para o avançado e para o iniciante;
   - onde a escolha do gerador repete sempre o mesmo exercício (monotonia).

### B.2 As perguntas da pesquisa (perguntas fechadas, buscas registradas, selo por número)
No método de `docs/pesquisa-v2/PLANO-DOS-TEMAS.md`. O resultado vai em `docs/pesquisa-v2/11-catalogo-completo.md`.
1. **Por músculo**, os 12 com meta, mais o ombro anterior e os adutores:
   - quais exercícios têm evidência de crescer mais, e por quê (posição alongada, amplitude, carga possível, estabilidade);
   - o que serve como variação no mesmo nível;
   - o que serve como progressão do iniciante ao avançado.
   - Atualize `pesquisa-v2/04` onde houver estudo novo.
2. **Por nível.**
   - O que o iniciante deve fazer primeiro: estabilidade e técnica simples (`selecao.estabilidade`).
   - O que só faz sentido no avançado: técnicas como parciais alongadas, excêntrica acentuada e unilateral com mais amplitude.
   - Onde a complexidade 1 a 3 da biblioteca está errada.
3. **Equipamentos que ainda não estão na taxonomia.** Para cada um: o que destrava, a evidência, a segurança, se dá para reconhecer na foto, e se vale um item novo ou basta uma capacidade. **[opinião]** Candidatos a avaliar:
   - argolas (rings);
   - paralelas baixas (parallettes);
   - roda abdominal;
   - colete de peso;
   - caneleiras de peso;
   - mini-band (elástico curto);
   - landmine (barra apoiada no canto);
   - GHD (banco de flexora nórdica);
   - hiperextensão reversa;
   - pullover na máquina;
   - agachamento pendular e belt squat;
   - máquina de abdução em pé;
   - polia com mais acessórios (corda dupla, barra V, tornozeleira);
   - prancha de equilíbrio e discos deslizantes;
   - "sandbag" e saco de areia, que são cargas reais à venda e diferentes de objetos improvisados (o Gustavo decide se entram).
   - **Lembre:** mochila, galão e móveis improvisados não entram (decisão de 03/11/2026).
4. **Exercícios que ficaram de fora em cada equipamento que já existe.** Exemplos a conferir:
   - **kettlebell:** remada, swing (é de potência; serve para hipertrofia?), stiff;
   - **suspensão:** flexão, rosca, tríceps, Y/T, flexão de joelho, búlgaro;
   - **barra fixa:** levantamento de pernas, barra com pegada neutra;
   - **paralelas:** elevação de joelhos;
   - **bola:** ponte e abdominal;
   - **step:** subida no step;
   - **banco:** hip thrust com o peso do corpo;
   - **polia:** pull-through, kickback, elevação Y;
   - **máquinas:** variações de pegada e de amplitude;
   - **halteres:** pullover, rosca martelo, Arnold, tríceps coice.
   - Diga quais rendem uma vaga nova ou um degrau numa escada, e quais só duplicam o que já existe.
5. **Escadas de progressão.** Estenda `escadas.json` a todo exercício de peso do corpo e de suspensão novo, com o selo de cada degrau. Nenhuma escada pede o que a pessoa não marcou.
6. **Segurança de cada exercício novo:**
   - as articulações que ele carrega (`tests/unit/articulacoes.test.ts`);
   - a montagem segura (`seguranca.montagem`);
   - para quem ele não serve (triagem e dor por região).
7. **Vídeos de referência visual** para cada exercício novo: canal e título, marcados como "referência visual de movimento, não fonte de regra". Nenhum vídeo entra no app.

Para cada pergunta, entregue:
- a tabela Princípio / O que a evidência diz / Selo / Fontes;
- o que fica sem resposta;
- as buscas registradas.

Fonte não lida no original fica como NÃO VERIFICADO; o que for opinião vem marcado [opinião]. "Não achei estudo" é uma resposta válida, e melhor que uma fonte duvidosa.

### B.3 A lista de entrada (para a decisão do Gustavo)
Uma tabela com cada exercício ou equipamento proposto. Para cada um:
- função e nível em `funcoes.json`, músculos, `requer`, `articulacoes`, faixa e escada;
- selo e fonte;
- o custo da animação (família P, M ou peça nova no motor; `pesquisa-v2/08`, seção 6);
- o efeito estimado nos números do B.1 (estimativa marcada como tal: rode a grade numa cópia da biblioteca, fora do app, como fez a sessão anterior).

Ordene por "quanto melhora o treino de quem tem aquele equipamento" ÷ "custo".

## Parte C: outros objetivos (a pergunta do Gustavo)
**A pergunta, nas palavras dele:** "os treinos são só para hipertrofia, ou uma pessoa que quer outro tipo de treino, um cutting ou algo que não seja ganhar massa, consegue também?"

**O estado de hoje:**
- o app monta só programa de hipertrofia;
- `CLAUDE.md` e `docs/PLANO-MVP.md` põem "outros objetivos (emagrecimento, força, corrida)", nutrição e cardio prescrito **fora do MVP**;
- mudar isso é decisão do Gustavo, e pede uma mudança no plano.

**Perguntas da pesquisa:**
1. **Cutting** (perder gordura mantendo o músculo):
   - o que muda no treino de força durante o déficit calórico: volume, intensidade, frequência, proximidade da falha;
   - o que é da nutrição (fora do MVP);
   - o treino de hipertrofia de hoje serve para manter o músculo no déficit? Com que selo?
2. **Força máxima:** o que muda (faixa de repetições, descanso, especificidade) e quanto o programa de hoje já entrega.
3. **Saúde e condicionamento geral:**
   - o que as diretrizes pedem (OMS 2020, Guia do Ministério da Saúde 2021, ACSM);
   - quanto do programa de hoje já cumpre a parte de força;
   - o que faltaria (aeróbio, que é cardio prescrito e está fora).
4. **Para cada objetivo, o que o app poderia fazer sem sair do MVP.** Exemplos:
   - um texto honesto na escolha do objetivo;
   - um ajuste de faixa ou de descanso com selo;
   - nada, se a evidência não sustentar.
   - E o que exigiria sair do MVP: nutrição, cardio, outros esportes.

**Entregável:** `docs/pesquisa-v2/12-outros-objetivos.md`, no formato da v2, e as opções para o Gustavo, com o efeito e o esforço de cada uma:
- (a) continuar só com hipertrofia, com um texto claro de que o app é para isso;
- (b) uma pergunta de objetivo com ajustes pequenos dentro do treino de força;
- (c) levar ao plano um marco novo, fora do MVP de hoje.

**Nada muda no produto sem a decisão dele.**

## Parte D: as correções aprovadas
Num branch próprio, a partir da `main` atualizada, ou do branch que a sessão fixar:
- **Exercícios e equipamentos novos:**
  - entrada em `exercicios.json` e `funcoes.json`, e em `equipamentos.ts` quando for equipamento;
  - ficha em `docs/pesquisa/animacoes/<id>.md` e cartão em `src/conteudo/exercicios/<id>.json`;
  - fontes em `fontes.md` e regras em `regras.md`, primeiro, com selo;
  - testes passando.
- **Animações:** pelo ritual de `docs/pesquisa/animacoes/README.md`:
  - poses em `src/engine/exercicios/revisao/` com `ik=0` e a folha de contatos;
  - aprovação do Gustavo folha a folha;
  - só então a linha de base.
  - As 31 animações aprovadas e as que ele aprovar nesta sessão não mudam sem novo ok.
- **Testes:**
  - o teste de propriedade de `tests/unit/equipamento-minimo.test.ts` estendido aos equipamentos novos;
  - snapshots das personas só com a revisão do Gustavo, mostrando o antes e o depois;
  - `npm run check`, `npm run test:e2e` e `npm run auditoria` passando;
  - a tabela antes × depois no relatório.
- **Fim:**
  - o devlog atualizado: o que mudou, uma imagem e o rascunho de post;
  - o backlog com o que ficou para depois, e o motivo;
  - a parada para a revisão.

## Fica fora
- O branch `r3-uso-real` e o acompanhamento do uso real.
- Nutrição, cardio prescrito, BFR (`equipamento.bfr`) e o resto do que o `CLAUDE.md` tira do MVP, a menos que o Gustavo decida mudar o plano na Parte C.
- Qualquer regra, número ou exercício sem selo e fonte.
- Qualquer mudança no programa, nos snapshots ou no Boneco sem o ok do Gustavo.

## Como trabalhar
1. **Leia primeiro:**
   - `CLAUDE.md`, `docs/PLANO-MVP.md`, `docs/backlog.md` e `docs/devlog.md` (da auditoria do treino em diante);
   - `docs/revisoes/equipamento-minimo.md` e `docs/pesquisa-v2/10-equipamento-minimo.md`;
   - `docs/pesquisa-v2/04`, `08` e `09`;
   - `docs/pesquisa/00-metodo.md`, `docs/pesquisa/regras.md` e `docs/pesquisa/animacoes/README.md`;
   - `src/domain/gerador/index.ts`, `funcoes.json`, `src/domain/progressao/escadas.ts` e `tests/personas/index.ts`.
2. **Plano antes de medir:** mostre ao Gustavo, em linguagem simples, o que vai medir, como, e as perguntas da pesquisa. Pergunte só o que só ele decide.
3. **Postura de auditor:** reconfira as conclusões anteriores, aponte o que estiver fraco e diga também o que está bom.
4. **Evidência:**
   - selo por número, nunca por tema;
   - EMG mede ativação, não crescimento;
   - "ausência de estudo não é prova de que algo não funciona", mas também não vira regra com selo acima de consenso;
   - opinião marcada como opinião.
5. **Ajudantes em paralelo.** A pesquisa é grande; divida por músculo ou por equipamento entre ajudantes, com as mesmas regras de selo, e confira você mesmo as fontes que mais pesam. Duas lições da sessão anterior:
   - **o PubMed bloqueia com muitas buscas ao mesmo tempo:** até 3 ajudantes, e espere quando bloquear;
   - **`scripts/folha-animacao.mjs` agora grava um HTML por exercício,** mas confira cada folha que um ajudante entregar antes de mostrá-la ao Gustavo.
6. **Determinismo e dados separados do código:**
   - sem `Math.random` nem `Date.now` em `src/domain/`;
   - exercícios, funções, escadas e regras em dados validados com zod.
7. **Privacidade:** nada de `privado/` em arquivo versionado; `tests/repo/privacidade.test.ts` continua passando.
8. **Commits:** pequenos, em pt-BR, no imperativo.
9. **A `main`** só recebe algo com o ok do Gustavo, depois de ele exportar os dados.

## Perguntas para o Gustavo (apresente com a evidência e o efeito, sem nada pré-marcado)
1. Cada uma das 9 folhas de animação, e os snapshots revistos.
2. Os itens 3 a 9 da Parte A.
3. Quais equipamentos novos entram na taxonomia (Parte B.3), e se "sandbag" e saco de areia contam como carga real ou como improvisados.
4. Quais exercícios novos entram, e em que ordem as animações deles são feitas.
5. Outros objetivos: (a), (b) ou (c) da Parte C.

## Pronto quando
- As decisões da Parte A estão registradas, e as folhas aprovadas estão no app e na linha de base.
- O mapa do catálogo está versionado e ligado ao `npm run auditoria`.
- `docs/pesquisa-v2/11-catalogo-completo.md` e `12-outros-objetivos.md` respondem às perguntas, com selos, lacunas e buscas registradas.
- Os exercícios e equipamentos aprovados entraram com ficha, cartão, teste e, quando aprovada, animação.
- `npm run check`, `npm run test:e2e` e `npm run auditoria` passam, com a tabela antes × depois.
- O devlog e o backlog estão atualizados, e a sessão parou para a revisão.
