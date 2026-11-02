# Prompt: auditoria do treino (a base de exercícios e a qualidade do programa)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 02/11/2026, ao fim do marco R4. É a 1ª de 3 sessões pedidas pelo Gustavo: auditoria do treino → anatomia
> dos exercícios → design. A ordem foi escolhida porque o treino precisa estar certo antes de ficar bonito, e porque esta
> auditoria pode mudar a base de exercícios em que as outras duas vão trabalhar.

---

<contexto>
Você vai conduzir a **auditoria do treino** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador nem da área de exercício, anatomia ou design: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

O seu papel é o de um **auditor e revisor independente**: entender por completo a base de exercícios e o programa que o app monta, testar com muitos casos e dizer, com evidência, o que está bom, o que falta, o que sobra, o que agregaria e como melhorar a **qualidade da entrega do treino** — mais do que o visual.

**Onde o projeto está (02/11/2026)**
- M0 a M5, R0b, R0c, R1, R1b, R2 e **R4** estão aprovados e na `main` (ver `docs/devlog.md`). A pesquisa v2 (`docs/pesquisa-v2/`, T1 a T7 e T9) está aprovada.
- **O R3 (uso real) está em andamento noutra sessão:** o Gustavo treina 4 semanas só com o app (02/11 a 29/11), e as correções pequenas do R3 vão no branch `r3-uso-real`. **Não mexa nesse branch.** O que esta auditoria achar sobre o programa pode virar proposta para o R5.
- **A base que você vai auditar:**
  - **102 exercícios** em `src/domain/biblioteca/exercicios.json` (validados com zod em `src/domain/biblioteca/index.ts`), cada um com função, equipamento, músculos, nível e alternativas;
  - **46 equipamentos** em `src/domain/taxonomia/equipamentos.ts` e os atalhos de cenário em `src/domain/taxonomia/atalhos.ts`;
  - **as funções por músculo** (as "vagas" que o gerador preenche) em `src/domain/gerador/funcoes.json` e `funcoes.ts`, com a pesquisa em `docs/pesquisa-v2/04-exercicios-por-musculo.md`;
  - **o gerador** em `src/domain/gerador/` (`index.ts`, `divisoes.ts`, `opcoes.ts`): divisão, vagas, séries, tempo, ordem da sessão;
  - **as regras com selo e fonte** em `docs/pesquisa/regras.md` (o arquivo de dados é `src/domain/regras/regras.json`) e as fontes em `docs/pesquisa/fontes.md`;
  - **a pesquisa v2:** divisão e frequência (`01`), panorama da evidência (`02`), universo de equipamentos (`03`), exercícios por músculo (`04`), montagem da sessão (`05`), populações e segurança (`06`), progressão e acompanhamento (`07`), equipamentos v2 e a fila das animações (`08`), trocas e locais (`09`);
  - **progressão, sessão e acompanhamento** em `src/domain/progressao/`, `src/domain/sessao/` e `src/domain/acompanhamento/`; triagem e dor em `src/domain/triagem/`;
  - **os textos de técnica** em `src/conteudo/exercicios/*.json` (as 32 animações) e os cartões de texto dos exercícios sem animação;
  - **as personas fictícias** em `tests/personas/index.ts` (Ana, Bruno, Carla, Diego e o 2º local do Bruno), os snapshots em `tests/unit/__snapshots__/` e os testes de propriedade em `tests/unit/gerador.test.ts` (que já varrem perfil × inventário).
- **O guia visual:** 32 animações, todas no boneco novo (o "Boneco", padrão desde o R4). Não é o foco aqui: anatomia e design têm sessões próprias depois desta.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo, sem profissional de Educação Física por agora;
  - ficam fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada;
  - nada vem pré-marcado, e nada muda no programa sem a escolha da pessoa;
  - fora do MVP: nutrição, login e nuvem, pagamentos, app nativo, social, relógios, outros objetivos, treinador humano, cardio prescrito e deload automático (`CLAUDE.md`).
</contexto>

<tarefa>
Conduzir a auditoria em quatro partes. O aceite é: **o Gustavo decide, item a item, o que entra, o que vai para o backlog e o que fica como está.**

**Parte A: entender a base inteira**
1. Um **inventário** dos 102 exercícios: função, equipamento, músculos (principal e secundários), nível, articulações que carrega e o que acontece com dor, alternativas, se tem animação ou cartão, as fontes da técnica e **quantas vezes aparece** nos programas gerados (vaga e alternativa).
2. O **mapa da cobertura:** para cada músculo e cada função, quantos exercícios existem em cada cenário de equipamento (casa com halteres e elásticos, condomínio com multifuncional, academia completa) e quais vagas ficam com uma opção só ou nenhuma.

**Parte B: teste de estresse (muitos casos, reproduzível)**
1. Um script versionado (por exemplo `scripts/auditoria/estresse.ts`) que gera **milhares de programas** variando perfil × inventário × locais × dias por semana × minutos × nível × dor por região × prioridades, sempre com dados fictícios. O gerador é determinístico: a mesma entrada gera a mesma saída.
2. Medir e mostrar, com números:
   - **volume:** séries por músculo contra a meta, músculos sempre abaixo, excesso, e o equilíbrio entre empurrar e puxar e entre joelho e quadril;
   - **escolha:** exercícios que nunca aparecem, os que aparecem demais, vagas sem opção, monotonia entre os dias;
   - **tempo:** a sessão cabe nos minutos escolhidos, e o aviso aparece quando não cabe;
   - **segurança:** com dor por região, nada carrega a articulação que dói acima do limite, e o aviso diz o motivo verdadeiro;
   - **progressão:** com os saltos de carga reais de cada equipamento (halteres fixos, placas, anilhas, elásticos, peso do corpo), se a progressão funciona ou trava;
   - **casos-limite:** equipamento mínimo, 1 ou 6 dias, 20 ou 120 minutos, iniciante com dor em 2 regiões, só peso do corpo.
3. Para cada problema, **3 exemplos concretos** (a persona ou a combinação, o programa gerado e o que está errado).

**Parte C: contra a evidência e a prática**
1. **O que falta:** exercícios ou variações que agregariam (por músculo, por cenário de equipamento, por nível), com selo e fonte. Exemplo de pergunta: um músculo depende de um exercício só num cenário comum?
2. **O que sobra:** exercícios redundantes, pouco úteis, arriscados para o nível ou que nunca seriam escolhidos.
3. **A qualidade dos textos:** técnica, segurança, erros comuns e "onde sentir" de cada cartão e de cada animação, conferidos contra as fontes.
4. **O programa como um todo:** o que deixaria o treino melhor para quem treina (escolhas, ordem, séries, descanso, progressão, trocas), sempre com evidência.

**Parte D: relatório e decisão**
1. `docs/revisoes/auditoria-treino.md`: os achados **priorizados por gravidade × frequência**, cada um com o problema, os exemplos, a evidência (selo de `docs/pesquisa/00-metodo.md`), a proposta e o esforço.
2. Uma seção nova na página **"Diagnóstico do treino-mvp"** ([link](https://claude.ai/artifact/CSoACEwQ4zikyku3WXCn3s)), visual e em linguagem simples, logo abaixo da seção do R4. A sessão do R3 também atualiza essa página: leia a versão atual logo antes de cada publicação. Nada de dado pessoal.
3. **Parada para a decisão do Gustavo**, item a item, com nada pré-marcado.
4. Só depois, as **correções aprovadas**, num branch próprio (`auditoria-treino`), cada uma com teste; regra nova ou revista entra em `regras.md` com selo e fonte; os snapshots das personas só mudam com revisão do Gustavo.
5. Ao fim: o devlog atualizado e um **rascunho do prompt da sessão de anatomia**, com o que esta auditoria encontrou sobre os músculos de cada exercício.

**Fica fora**
- O visual do boneco, a anatomia do desenho e o design (as duas sessões seguintes).
- O branch `r3-uso-real` e o acompanhamento do uso real.
- Qualquer mudança no programa, no gerador ou nos snapshots sem o ok do Gustavo.

**Pronto quando**
- o inventário, o mapa da cobertura e o script do teste de estresse estão versionados, com os números;
- o relatório e a seção da página estão prontos;
- as decisões do Gustavo estão registradas, e as correções aprovadas entraram com teste;
- `npm run check` e `npm run test:e2e` passam;
- o devlog e o rascunho do prompt de anatomia estão escritos, e a sessão parou para a revisão.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:** `CLAUDE.md`, `docs/PLANO-MVP.md` (seções a e i), `docs/backlog.md`, `docs/devlog.md` (as entradas R0c a R4), `docs/pesquisa/00-metodo.md`, `docs/pesquisa-v2/README.md` e os temas `04`, `05` e `08`, `docs/pesquisa/regras.md` e o código do gerador.
2. **Postura de auditor:** não confie nas conclusões anteriores só porque foram aprovadas. Reconfira e aponte o que estiver fraco. Mas diga também o que está bom: o objetivo é saber onde a base está forte e onde está fraca.
3. **Evidência:** toda afirmação técnica tem selo (robusta, moderada, um estudo ou consenso) e fonte. Nada de estudo inventado. Fonte não lida no original fica como não verificada (`docs/pesquisa/00-metodo.md`). O que for opinião sua, diga que é.
4. **Plano antes de mexer:** mostre ao Gustavo, em linguagem simples, o que vai medir e como, antes de rodar o teste de estresse grande. Pergunte só o que só ele pode decidir.
5. **Precisão vale mais que quantidade** (`CLAUDE.md`): melhor 10 achados certos e bem mostrados do que 50 rasos.
6. **Privacidade:** nada de `privado/` em arquivo versionado; os testes e as imagens usam as personas fictícias; `tests/repo/privacidade.test.ts` tem de continuar passando. Se o Gustavo mandar o export dele, guarde-o fora do git e registre só números.
7. **Regressão:** as 32 animações e a linha de base do Boneco (`tests/visual/linha-de-base/estilo-a.json`) não mudam nesta sessão.
8. **Commits:** pequenos, em pt-BR e no imperativo, no branch `auditoria-treino`, criado a partir da `main`. A `main` só recebe algo com o ok do Gustavo; antes, lembre-o de exportar os dados ("Meus dados" → "Guardar uma cópia"), porque ele está usando o app no R3.
9. Ao fim, atualize o devlog e pare para a revisão.
</como_trabalhar>
