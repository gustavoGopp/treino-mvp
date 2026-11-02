# Prompt: marco R3 (uso real)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 02/11/2026, ao fim da sessão do marco R2. Depois que a sessão começar, este arquivo pode ser apagado (o git guarda o histórico).

---

<contexto>
Você vai conduzir o **marco R3 (uso real)** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado. O dono é o Gustavo. Ele não é programador: fala de produto e de experiência, e prefere explicações simples e visuais, em pt-BR, sem jargão. Quando um termo técnico for inevitável, explique-o em uma frase.

O R3 é diferente dos marcos anteriores: **o centro dele não é código, é o Gustavo treinar 4 semanas só com o app.** A sessão prepara esse uso, acompanha o Gustavo semana a semana, faz as correções pequenas que o uso pedir e, no fim, registra os critérios 3 e 5 do plano.

**Onde o projeto está (02/11/2026)**
- M0 a M5, R0b, R0c, R1, R1b e **R2** estão aprovados e na `main` (ver `docs/devlog.md`, entradas R1b e R2). A pesquisa v2 (`docs/pesquisa-v2/`, T1 a T7 e T9) está aprovada.
- **O que o R2 deixou pronto** (é o que o Gustavo vai usar):
  - **Pausas detectadas sozinhas:** `src/domain/sessao/bloco.ts` (`hojeNoPrograma`, `blocoAtual`, `semanaNoBloco`, `faixaDaPausa`). Até 13 dias, nada muda; 14 a 20, RIR +1 no 1º treino de cada dia; 21 ou mais, um bloco novo com a volta gradual e a carga da volta já preenchida (`cargaDaVolta` em `src/domain/sessao/index.ts`). A semana do programa conta as semanas com treino.
  - **Acompanhamento:** `src/domain/acompanhamento/` (`semana.ts`, `evolucao.ts`, `semana-leve.ts`, `tempo.ts`, `volta.ts`); telas em `src/features/acompanhamento/` (`/semana`, `/evolucao/:exId`), a faixa "A sua semana" no topo do Seu treino, a caixa "Bem-vindo de volta!" e o toque "hoje foi" no fim do treino.
  - **Calibração do tempo:** depois de 3 treinos, o app pergunta se ajusta a estimativa (`tempo.calibracao`); só muda com o aceite.
  - **Estado salvo:** versão 7 (`src/storage/esquema.ts`, migrações em `src/storage/migracao.ts`). A exportação e a importação em JSON ficam em "Meus dados".
  - **Testes:** 480 unitários e 60 no navegador.
- **Os critérios do plano** (`docs/PLANO-MVP.md`, seção a):
  - 1 (cadastro rápido): o teste conta 13 toques e 0 caractere; **falta a cronometragem do Gustavo no celular**;
  - 2, 4 e 6: cumpridos (R0 a R2);
  - **3 (foto do equipamento): falta o eval com as fotos reais** (recall ≥ 85% e precisão ≥ 90% nos itens com confiança alta);
  - **5 (uso real): é o R3** (4 semanas, 10 sessões ou mais, os 5 maiores incômodos);
  - 7 (animações): as 31 aprovadas seguem com 0 pixel de diferença; falta conferir que todo exercício do programa do Gustavo tem animação;
  - 8 (uso no celular): Lighthouse ≥ 90 foi medido no M3 e no M5; **as telas novas do R2 ainda não foram medidas**, nem "uma sessão inteira com uma mão".
- **Pendências do Gustavo** (`docs/backlog.md`): a chave da Anthropic na Vercel, a cronometragem do cadastro, a menor anilha da academia dele.
- **Decisões do Gustavo que valem agora:**
  - o público principal é ele mesmo, sem profissional de Educação Física por agora;
  - ficam fora: foto do corpo, biotipo, idade, peso, sexo e altura;
  - exercício sem animação aprovada aparece como cartão de texto, nunca com animação improvisada;
  - nada vem pré-marcado, e nada muda no programa sem a escolha da pessoa;
  - as personas dos testes são fictícias (`tests/personas/`);
  - o R4 (experimento do boneco) acontece durante o R3, **em outra sessão**: não entra aqui.
</contexto>

<tarefa>
Conduzir o **marco R3**, em três partes. O aceite do plano é: **os critérios 3 e 5 registrados no devlog.**

**Parte A: preparar o uso (nesta sessão, antes de o Gustavo começar)**
1. **Produção:** confirmar que o app publicado tem o R2 (o deploy da `main` na Vercel) e que ele se instala no celular. Se algo faltar, diga o que o Gustavo precisa fazer, passo a passo.
2. **Critério 8 nas telas novas:** medir a acessibilidade (Lighthouse, celular) em "A sua semana", na evolução, na caixa de volta e no fim do treino com o "hoje foi"; conferir áreas de toque de 44 px ou mais e o uso com uma mão. Corrigir o que ficar abaixo de 90, com teste.
3. **Critério 7:** conferir, com o programa que o Gustavo vai usar, se todo exercício tem animação aprovada. O programa real dele fica no aparelho e em `privado/`: leia de lá, mas registre só o resultado (quantos exercícios, quais sem animação), nunca o perfil.
4. **Um guia curto para o Gustavo**, numa página visual em linguagem simples:
   - instalar o app no celular e cadastrar os locais dele;
   - exportar os dados toda semana ("Meus dados" → exportar), que é o backup e o que ele manda para a sessão;
   - o que é um "incômodo" (algo no app que atrapalhou, confundiu ou demorou) e como anotar na hora, com um toque, sem atrapalhar o treino;
   - o que vai acontecer nas 4 semanas e quando a sessão olha os dados.
   Para os incômodos, proponha ao Gustavo um registro simples que ele use no celular (por exemplo, uma página com uma lista que guarda o que ele escreve). Dor e saúde ficam só no app: o registro de incômodos é sobre o app, não sobre o corpo.
5. **Eval da foto (critério 3):** as fotos reais e o gabarito estão em `privado/`, no computador do Gustavo, e a chave da Anthropic fica no `.env` dele. Ofereça os dois caminhos e deixe ele escolher: conectar esta sessão à pasta do projeto no computador dele (Remote Control) e rodar `npm run eval:visao` lá, ou ele mesmo rodar o comando com um passo a passo. Registre só os números (recall, precisão, falsos positivos graves, custo e tempo por modelo), nunca as fotos nem o gabarito.
6. **Pendências pequenas:** a menor anilha da academia dele (ele informa no app; se mudar o programa, o aviso "Há uma versão nova" oferece atualizar) e a cronometragem do cadastro no celular (critério 1), que ele mede uma vez.

**Parte B: acompanhar as 4 semanas (uma conversa por semana, nesta sessão ou numa nova com este mesmo prompt)**
1. A cada semana, o Gustavo manda o arquivo exportado e os incômodos anotados. O arquivo dele é dado de saúde (LGPD): guarde em `privado/` ou na pasta temporária da sessão, **nunca em arquivo versionado**, e não copie nada dele para o código, os testes, o devlog ou a página.
2. Responda em poucas linhas, sem culpa e sem comparação com outras pessoas:
   - quantas sessões e quantas semanas com treino;
   - o que o app fez de certo e de errado: pausas detectadas, cargas sugeridas e calibradas, tempo real × estimado, semana leve, trocas de local;
   - os incômodos da semana, agrupados, com uma proposta para cada um (corrigir agora, backlog ou não mexer).
3. **Correções pequenas** entram durante as 4 semanas, cada uma com o ok do Gustavo:
   - pequena = texto, layout, um botão, um bug, sem regra nova e sem mudar a saída do gerador;
   - cada correção com teste, num branch `r3-uso-real` criado a partir da `main`, e na `main` só depois do ok dele (é a `main` que vai para o celular);
   - o que mexe em regra, no gerador ou nos snapshots das personas vai para a lista do R5, com o motivo, e não entra no R3;
   - antes de cada correção chegar à `main`, lembre o Gustavo de exportar os dados (o estado salvo continua na versão 7; se uma correção precisar mudar o formato, ela não é pequena).
4. O programa dele só muda quando ele pede.

**Parte C: fechar o marco (depois das 4 semanas)**
1. **Critério 5:** o número de sessões registradas (meta: 10 ou mais) e os **5 maiores incômodos**, escolhidos com o Gustavo.
2. **Critério 3:** os números do eval da foto, contra a meta.
3. **Critérios 1, 7 e 8:** o que foi medido na parte A e na cronometragem.
4. **Proposta de escopo do R5** (`docs/PLANO-MVP.md`, seção i): o que o uso mostrou, cada item com o motivo e o próprio aceite. Entre os candidatos que já estão no backlog: o gráfico da evolução, as animações que faltam, os cartões de texto dos exercícios antigos, apagar um local e "aqui dá para fazer também…".
5. O devlog do R3, com os números, uma imagem e o rascunho de post.

Fica fora do R3:
- o R4 (experimento do boneco), que tem a sua própria sessão;
- regra nova, mudança no gerador e pesquisa nova (vão para o R5);
- abrir o app para outras pessoas (termos de uso e limite compartilhado da visão ficam para o R5).

**Pronto quando:**
- os critérios 3 e 5 estão registrados no devlog, com os números;
- o critério 8 foi medido nas telas do R2;
- as correções do R3 estão na `main`, cada uma com o ok do Gustavo, e `npm run check` e `npm run test:e2e` passam;
- a lista dos 5 maiores incômodos e a proposta do R5 foram aprovadas pelo Gustavo.
</tarefa>

<como_trabalhar>
1. **Leia primeiro:**
   - o `CLAUDE.md` e o `docs/devlog.md` (entradas R1b e R2);
   - o `docs/PLANO-MVP.md` (seções a e i) e o `docs/backlog.md`;
   - `scripts/eval-vision.ts` (o eval da foto) e `src/features/dados/` (exportar e importar);
   - as telas do R2 em `src/features/acompanhamento/`.
2. **Plano antes de mexer:** mostre ao Gustavo, em linguagem simples, como vão ser as 4 semanas (o que ele faz, o que a sessão faz e quando), o guia e o registro de incômodos. Pergunte o que só ele pode decidir: por exemplo, o caminho do eval da foto, o dia da semana do check-in e onde ele quer anotar os incômodos. Só comece com o ok dele.
3. **Privacidade (LGPD):** nada de `privado/`, do arquivo exportado ou do perfil real do Gustavo vai para arquivo versionado, teste, devlog, post ou página. `tests/repo/privacidade.test.ts` tem de continuar passando. Nos registros, só números e descrições sem dado pessoal.
4. **Determinístico:** sem `Math.random` nem `Date.now` em `src/domain/`.
5. **Segurança:** a regra de dor, os sinais de alerta e o "pare e use a alternativa" valem igual. Se o Gustavo relatar dor que se repete, lembre a recomendação de avaliação profissional; o app não diagnostica.
6. **Sem culpa:** semanas com menos treinos são dado, não falha. Nunca "você falhou", "perdeu" ou "deveria".
7. **Commits:** pequenos, em pt-BR e no imperativo, no branch `r3-uso-real`. A `main` recebe cada correção só com o ok do Gustavo.
8. **Visual para o Gustavo:** a página "Diagnóstico do treino-mvp" (https://claude.ai/artifact/CSoACEwQ4zikyku3WXCn3s):
   - leia a página antes de editar;
   - acrescente no topo uma seção do R3 e atualize-a a cada semana: sessões, semanas com treino, incômodos e correções;
   - as imagens vão como arquivos da página, de uma pasta ignorada pelo git, como `reports/`;
   - nada de dado pessoal na página.

Ao fim de cada semana, diga em poucas linhas o que o app acertou, o que errou, o que foi corrigido e o que precisa da decisão do Gustavo.

Ao fim do marco, atualize o devlog e pare para a revisão.
</como_trabalhar>
