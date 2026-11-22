# M6. A triagem: o registro do lote

> Aberto e feito em 22/11/2026, no ramo `claude/m6-a-triagem`, a partir da `main` (`f9d1442`). Roteiro: `docs/prompts/sessao-melhorias-analise-critica.md`, seção "M6. A triagem". **Nada daqui foi para a `main`: espera o ok do Gustavo.**
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

## O depois, medido em 22/11/2026

A mesma persona, respondendo a mesma verdade (`capturas.mjs`):

| Passo | Tela | Imagem |
|---|---|---|
| 1 | "Alguma destas vale para você?", agora com 10 itens: "Problema no coração" e "Pressão alta" separados | `1-pergunta-geral-depois.png` |
| 2 | Marca "Pressão alta" e "Remédio para doença crônica"; cada uma abre as suas perguntas | `2-marcar-seguimento-vazio-depois.png`, `2-marcar-depois.png` |
| 3 | "Pode seguir, com estes cuidados" | `3-cuidados-depois.png` |
| 4 | Segue para "Experiência" e chega ao programa | teste de tela |

| | Antes | Depois |
|---|---|---|
| Pressão controlada, com remédio, sem restrição | 5 toques e para na pausa | 8 toques e segue, com 4 cuidados à vista |
| Vezes que as mesmas perguntas passam pela tela | 3 | 2 |
| Saídas da pausa | caixinha ou mudar as respostas | caixinha, "Vou procurar avaliação e volto depois" ou revisar |
| "Não sei" se a pressão está controlada, pressão não controlada, restrição do médico | pausa | pausa (`4-pausa-depois.png`, `5-pausa-volto-depois-depois.png`) |
| Cada um dos outros "sim" | pausa | pausa (um teste por pergunta) |

## A regra (em `docs/pesquisa/regras.md`: `seguranca.triagem.pressao`)

O texto abaixo foi a proposta; a regra entrou com o ok geral do Gustavo de 22/11 ("faça e termine todos os pontos restantes"). Uma diferença: a fonte `edwards2023` saiu da regra, porque não tem linha em `docs/pesquisa/fontes.md` (só o resumo tinha sido lido).

Base: a "Regra proposta" de `docs/pesquisa-v2/23-dor-pressao-alta-e-gestacao.md` (P8, linha 81).

**`seguranca.triagem.pressao`**. Selo: **consenso**. Espera revisão de profissional.

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

**O que as fontes não sustentam, dito com clareza:**
- "Longe da falha" e os cuidados em si são **consenso**; a pesquisa do projeto não achou ensaio para eles.
- O número 160 por 90 vem do PAR-Q+; limites de outras diretrizes não foram verificados.
- A própria pesquisa do projeto diz que afrouxar o bloqueio "exige revisão profissional". O Gustavo decidiu seguir em 19/11/2026; a regra registra que essa revisão não houve.

## Decisões técnicas da sessão

| Decisão | Motivo |
|---|---|
| **Versão nova do estado guardado (9 → 10), com o ok do Gustavo em 22/11.** | Sem subir a versão, um app antigo (aba velha, cópia importada) leria o estado novo, jogaria fora o "sim" da pressão alta e liberaria o programa sem pergunta nenhuma. Com a versão nova, o app antigo recusa o estado. |
| O "sim" da pressão alta **não entra nas 9 respostas guardadas**: ele é a presença do seguimento (`triagem.pressao`) | O cadastro de quem não tem pressão alta fica idêntico ao de antes: o mesmo resumo das entradas e o mesmo programa. Ninguém vê "Versão nova do programa" por causa do M6, e nenhum snapshot das personas mudou. A migração não muda nada além do número da versão. |
| O "sim" antigo em "coração ou pressão alta" continua como "sim" em coração | Nada é inventado: o dado antigo não diz qual dos dois era. Continua bloqueando, e a liberação por caixinha de quem já a tinha continua valendo. Quem tem só pressão alta refaz a triagem quando quiser. |
| Pressão controlada **mais** outro "sim" (inclusive dor em osso e articulação) pausa | É a letra da decisão: "todos os outros 'sim' continuam bloqueando". O lado conservador. |
| **O programa não muda** para quem tem pressão alta: os cuidados são orientação, à vista | Mudar a prescrição (repetições, reserva) mexe no gerador e pede personas e régua antes e depois. Ficou no backlog, com o motivo. O 1º cuidado diz "pelo menos 2 sobrando, mesmo que o treino peça menos". |
| Os cuidados aparecem em três lugares: antes de seguir, como 1º aviso do programa até o 1º treino, e sempre em "Entenda o treino" | A fila de avisos do início mostra uma mensagem por vez; um aviso permanente esconderia os outros. |
| As respostas do seguimento são botões largos, um por linha | Lado a lado, ficavam com 42 px de largura com a letra em 200% (o verificador de toque acusou). |
| No 1º cadastro, respostas guardadas que pausam o programa deixam o passo da triagem **pendente** | Quem escolheu "volto depois" cai na tela da pausa ao reabrir o app. Com o cadastro já feito, nada muda: a pausa aparece em "Programa pausado", que tem a saída para "Meus dados". |
| A triagem com respostas guardadas que pausam **abre direto na tela da pausa** | Evita mais uma passada pelas perguntas. |
| A folha "Você não marcou estas N" saiu | Era a terceira passada. As perguntas inteiras continuam na tela de marcar. Muda `seguranca.triagem.nenhuma`. |
| O teste da migração monta o estado da versão 9 a partir de uma persona, e não de um arquivo gravado pelo app | Como o da 8 → 9. A migração não muda nenhum campo. |

## Os textos de segurança que entraram, todos num lugar

O Gustavo aprovou em 22/11 a subida da versão e mandou terminar. **Ele não leu estes textos um por um.** Ficam aqui para a leitura dele antes da `main`.

| Onde | Texto |
|---|---|
| Pergunta, curta e inteira | "Problema no coração" / "Algum médico já disse que você tem problema no coração?" |
| Pergunta, curta e inteira | "Pressão alta" / "Algum médico já disse que você tem pressão alta?" |
| Seguimento | "A sua pressão está controlada?" (Sim, Não, Não sei). Ajuda: "Controlada: o médico disse que está, ou as medidas recentes ficam abaixo de 160 por 90 (16 por 9)." |
| Seguimento | "Algum médico pediu para você evitar ou limitar exercício?" (Sim, Não) |
| Seguimento do remédio | "O remédio é só o da pressão?" (Sim, Não) |
| Erro | "Responda às perguntas sobre a pressão." |
| Tela dos cuidados | "Pode seguir, com estes cuidados" / "Pressão alta controlada e sem restrição do médico." / "Depois, os cuidados ficam em “Entenda o treino”, em Meus dados." / "Entendi, continuar" |
| Cuidado 1 | "Fique no esforço moderado: termine cada série com pelo menos 2 repetições sobrando, mesmo que o treino peça menos." |
| Cuidado 2 | "Respire o tempo todo. Não prenda o ar para fazer força." |
| Cuidado 3 | "Pare o treino se vier tontura, dor no peito, falta de ar fora do normal ou palpitação. Se não passar em poucos minutos, ligue para o SAMU (192)." |
| Cuidado 4 | "Se a pressão sair do controle ou o médico mudar a orientação, refaça a triagem." |
| Aviso do programa | "Pressão alta: treine com estes cuidados." / "Pressão alta: os cuidados" |
| Pausa, saída nova | "Vou procurar avaliação e volto depois" / "Respostas guardadas neste aparelho. Quando tiver a liberação, abra o app e confirme aqui." |
| Pausa, frase trocada | Antes: "O app guarda só a data da confirmação, neste aparelho." Depois: "As respostas e a data da confirmação ficam só neste aparelho." |
| "Entenda o treino" | "Quem tem pressão alta controlada, sem restrição do médico, treina com cuidados. Qualquer outra resposta sobre a pressão pede a avaliação antes." |

## O aceite

| Aceite do roteiro | Como foi conferido |
|---|---|
| A persona de 55 anos com pressão controlada chega ao programa respondendo a verdade | `tests/e2e/onboarding.spec.ts`, "M6: quem tem pressão alta controlada..." |
| Cada um dos outros "sim" continua bloqueando, um teste por pergunta | `tests/unit/triagem.test.ts`: 8 testes do "sim" sozinho, 8 do "sim" junto com a pressão controlada, 3 das respostas do seguimento que pausam |
| A regra aparece em "Entenda o treino" | a frase em "Por que o app pergunta e sugere" e a regra na lista de todas as regras (`tests/repo`, `tests/e2e/entenda.spec.ts`) |
| A liberação antiga por caixinha continua valendo | `tests/unit/armazenamento.test.ts`, "versão 9 → 10" |
| A saída para quem ainda não foi avaliado, e o fim da terceira passada | `tests/e2e/onboarding.spec.ts` |

## O que não dá para conferir daqui

- As telas foram vistas num navegador de teste (Chromium, 390 × 844), não num celular de verdade.
- Nenhum profissional de saúde leu a regra nem os textos.
- O inventário de textos (`scripts/textos/`) ainda cita a folha que saiu e as "9 perguntas"; é ferramenta de uma sessão passada, fora da verificação, e não foi refeito.
