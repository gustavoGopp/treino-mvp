# M6. A triagem: o registro do lote

> Aberto em 22/11/2026, no ramo `claude/m6-a-triagem`, a partir da `main` (`f9d1442`). Roteiro: `docs/prompts/sessao-melhorias-analise-critica.md`, seção "M6. A triagem". Nada daqui foi para a `main`.
>
> **Não houve revisão por profissional de saúde.** Quem escreveu não é da área. A regra nova entra com o selo "consenso" e as fontes, e fica marcada como "espera a revisão de um profissional". O app não diagnostica.

## O antes, medido em 22/11/2026

Persona fictícia: 55 anos, pressão alta controlada com remédio, o médico não restringiu exercício. Ela responde a verdade. Imagens em 390 × 844, feitas por `capturas.mjs`.

| Passo | Tela | Imagem |
|---|---|---|
| 1 | "Alguma destas vale para você?" Toca em "Sim, alguma" | `1-pergunta-geral-antes.png` |
| 2 | "Quais valem para você?" Marca "Problema no coração ou pressão alta" e "Remédio para doença crônica" | `2-marcar-antes.png` |
| 3 | "Nenhuma destas vale para você? Você não marcou estas 7" (a terceira passada pelas mesmas perguntas) | `3-seguinte-antes.png` |
| 4 | "Vamos pausar o programa automático" | `4-resultado-antes.png` |

- **5 toques, e ela para no bloqueio.** Não chega ao programa.
- As saídas da pausa eram duas: marcar a caixinha "Confirmo que fui avaliado e liberado" (2 toques e passa, sem pergunta nenhuma) ou "Revisar respostas" (mudar o que respondeu sobre a saúde).
- As mesmas perguntas passam três vezes pela tela: a lista curta, a lista para marcar e a folha das não marcadas.
- Quem tem pressão alta e toma remédio marca **duas** perguntas (a do coração ou pressão e a do remédio). A regra nova tem de tratar as duas juntas, senão o remédio da pressão bloqueia sozinho.

## A regra proposta (ainda não está em `docs/pesquisa/regras.md`)

Ela só entra em `regras.md` depois que o Gustavo aprovar os textos, uma decisão de cada vez. Base: a "Regra proposta" de `docs/pesquisa-v2/23-dor-pressao-alta-e-gestacao.md` (P8, linha 81).

**`seguranca.triagem.pressao`** (nome provisório). Selo: **consenso**. Espera revisão de profissional.

1. A pergunta do coração e a da pressão alta passam a ser duas.
2. Quem marca **pressão alta** (com ou sem "remédio para doença crônica", se o remédio for só o da pressão) responde perguntas de seguimento, com texto próprio do app:
   - a pressão está controlada? (o médico disse que está, ou as medidas recentes ficam abaixo de 160 por 90);
   - o médico restringiu exercício?
   - o remédio contínuo é só o da pressão? (só para quem marcou o remédio).
3. **Controlada, sem restrição, e nenhum outro "sim": o programa é liberado com cuidados**, à vista no programa: esforço moderado, longe da falha; respirar sem prender o ar; parar se vier tontura, dor no peito, falta de ar fora do normal ou palpitação.
4. **Qualquer outra resposta bloqueia**, inclusive "não sei": pressão não controlada ou não medida, restrição do médico, remédio para outra doença.
5. **Todos os outros "sim" continuam bloqueando** como hoje: coração, dor no peito, tontura ou desmaio, outra doença crônica, remédio (sem ser só o da pressão), médico que pediu acompanhamento, gravidez, doença aguda. A dor em osso e articulação segue a regra dela (`seguranca.triagem.osteoarticular`).
6. A liberação por caixinha continua valendo, para quem já a tinha e para os bloqueios que ficam.

**Fontes** (todas já em `docs/pesquisa/fontes.md`):
- `paluch2024` (declaração da AHA, texto completo lido): quem tem pressão alta controlada pode fazer treino de força de intensidade baixa a moderada, com respiração adequada; consultar o médico sobre contraindicações. Os valores de pressão da figura **não foram lidos**.
- `barroso2020` (diretriz brasileira, seção lida): recomenda treino de força 2 a 3 dias por semana a quem tem pressão alta.
- `parq2025` (texto completo lido): libera quem responde "não" às perguntas de seguimento da pressão (dificuldade de controle; pressão de repouso de 160 por 90 ou mais, ou não sabe). **O texto dele não é copiado**: a licença exige autorização por escrito.
- `edwards2023` (só o resumo): treino de força reduz a pressão de repouso.

**O que as fontes não sustentam, dito com clareza:**
- "Longe da falha" e os cuidados em si são **consenso**; a pesquisa do projeto não achou ensaio para eles.
- O número 160 por 90 vem do PAR-Q+; limites de outras diretrizes não foram verificados.
- A própria pesquisa do projeto diz que afrouxar o bloqueio "exige revisão profissional". O Gustavo decidiu seguir em 19/11/2026; a regra registra que essa revisão não houve.

## Decisões técnicas da sessão

| Decisão | Motivo |
|---|---|
| **O estado guardado precisa de versão nova (9 → 10). Parado, à espera do ok do Gustavo.** | Separar coração de pressão cria uma resposta nova. Sem subir a versão, um app antigo (aba velha, cópia importada) leria o estado novo, jogaria fora a resposta "pressão alta" e liberaria o programa sem pergunta nenhuma. Com a versão nova, o app antigo recusa o estado. A migração não inventa nada: o "sim" antigo em "coração ou pressão alta" fica como "coração" (continua bloqueando, e a liberação antiga por caixinha continua valendo); "pressão alta" entra como "não". |
| No 1º cadastro, respostas guardadas que pausam o programa deixam o passo da triagem **pendente** (`passoCompleto`, `src/storage/esquema.ts`) | Quem escolheu "volto depois" tem de cair na tela da pausa ao reabrir o app, e não nas perguntas de experiência, rotina e equipamento, para no fim dar em "Programa pausado". Com o cadastro já feito, nada muda: a pausa aparece na tela do programa, que tem a saída para "Meus dados". |
| A triagem com respostas guardadas que bloqueiam **abre direto na tela da pausa** | Evita mais uma passada pelas perguntas. "Revisar respostas" leva à lista para marcar, já com o que a pessoa marcou. |
| A 3ª saída **não precisou de campo novo** no estado | Guarda as respostas sem a liberação, que é o que "refazer a triagem" já fazia. |

## O que está feito no ramo

| O quê | Onde | Teste |
|---|---|---|
| Um teste por pergunta: cada "sim" sozinho bloqueia (8 testes; o de osso e articulação tem o dele) | `tests/unit/triagem.test.ts` | o próprio |
| A 3ª saída da pausa (pedido 11): "Vou procurar avaliação e volto depois" guarda as respostas; ao voltar, a pessoa cai na pausa | `src/features/onboarding/Triagem.tsx`, `src/storage/esquema.ts` | `tests/e2e/onboarding.spec.ts` ("M6: quem ainda não foi avaliado..."), `tests/unit/armazenamento.test.ts` |

Imagem da pausa com a saída nova: `pausa-com-saida-proposta.png`. **Os dois textos dela são proposta e esperam o Gustavo** (decisão 5 da fila abaixo).

## A fila de decisões do Gustavo (uma de cada vez)

| # | Decisão | Estado |
|---|---|---|
| 0 | Ok para a versão nova do estado guardado (9 → 10) | **perguntado em 22/11** |
| 1 | A pergunta que separa coração de pressão alta. Imagens: `decisao-1-pergunta-geral-antes-e-depois.png`, `decisao-1-marcar-antes-e-depois.png` | **perguntado em 22/11** |
| 2 | Seguimento: "a pressão está controlada?" (texto e respostas) | a levar |
| 3 | Seguimento: "o médico restringiu exercício?" | a levar |
| 4 | Seguimento do remédio: "é só o da pressão?" | a levar |
| 5 | Os cuidados, um por um (esforço moderado; respirar; quando parar), e onde aparecem | a levar |
| 6 | Os textos da 3ª saída: o botão "Vou procurar avaliação e volto depois" e o aviso "Respostas guardadas neste aparelho. Quando tiver a liberação, abra o app e confirme aqui." | a levar |
| 7 | A frase "O app guarda só a data da confirmação, neste aparelho.", na tela da pausa: com a 3ª saída, as respostas também ficam guardadas (os Termos já dizem isso). Proposta de troca a levar | a levar |
| 8 | O fim da terceira passada: tirar a folha "Você não marcou estas 7". Muda `seguranca.triagem.nenhuma`, aprovada por ele em 06/11 | a levar |
| 9 | A frase da regra em "Entenda o treino" | a levar |

## O que não dá para conferir daqui

- As telas foram vistas num navegador de teste (Chromium, 390 × 844), não num celular de verdade.
- Nenhum profissional de saúde leu a regra nem os textos.
