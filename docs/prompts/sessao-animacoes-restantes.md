# Prompt: as animações dos 81 exercícios que ainda são cartão de texto

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 17/11/2026, depois que a frente da animação nova foi para a `main` (commit `4c06ec6`), a pedido do
> Gustavo.

---

<contexto>
Você vai **animar os 81 exercícios do treino-mvp que hoje aparecem como cartão de texto**, no mesmo motor e com o mesmo padrão das 90 animações que já estão no app. O treino-mvp é um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco"). O dono é o Gustavo. Ele não é programador nem da área de exercício: fala de produto e de experiência, **decide olhando imagens** e quer uma decisão por vez, em português simples, com a sua recomendação.

**O pedido dele, em 17/11/2026:** "quero que você faça agora um prompt para fazer animação de todos os treinos restantes que faltam".

**Onde o projeto está**
- A biblioteca tem **171 exercícios** (`src/domain/biblioteca/exercicios.json`). **90 têm animação** (`animacaoId` preenchido) e **81 têm só o cartão de texto** (`animacaoId: null`). Todos os 81 já têm a ficha da técnica, com fonte (`docs/pesquisa/animacoes/<id>.md`), e o cartão (`src/conteudo/cartoes.ts` e `src/conteudo/exercicios/<id>.json`).
- O motor é um só: `src/engine/novo/` (um corpo em três dimensões, com medidas reais; cada movimento sai de uma ficha com números, selo e fonte; uma conferência automática mede cada animação quadro a quadro). O código de `src/engine/` fora de `novo/` é o motor de antes: não é mais usado pelo app e não é para mexer.
- Como as 90 foram feitas, o que deu errado e o que ficou pendente: `docs/devlog.md` ("Animação nova"), `docs/backlog.md` ("Da animação nova") e `docs/revisoes/animacao-nova/` (`andamento.md`, `qa.md`, `estado-da-sessao.md`).

**Os 81, por equipamento** (a lista com o equipamento de cada um sai de `src/domain/biblioteca/exercicios.json`, campo `requer`):
- **42 usam peças que o motor já desenha** (halteres, banco, banco inclinado, polias, elástico, mini band, caneleira, kettlebell, fita de suspensão, barra fixa, paralelas). São os mais diretos: novas poses sobre cenas e núcleos que existem.
- **11 usam barra** (barra longa com anilhas, barra W, barra hexagonal, suporte e smith): supino, agachamento, desenvolvimento, remada, terra romeno, terra hexagonal, hip thrust, roscas, agachamento e supino no smith. A barra com anilhas é objeto novo.
- **28 usam máquina ou banco que o motor ainda não tem** (leg press, hack, cadeira extensora, cadeira flexora, mesa flexora, abdutora, adutora, voador, voador invertido, puxador, remada articulada, remada na estação, supino, desenvolvimento, rosca, tríceps e abdominal na máquina, glúteo na máquina, panturrilha em pé e sentada, graviton, banco romano, banco Scott, banco declinado, barra baixa, tornozeleira na polia). Cada máquina é uma peça nova, com partes que se mexem.
</contexto>

<como_se_faz_uma_animacao>
Leia antes de tudo, nesta ordem: `CLAUDE.md`; `docs/revisoes/animacao-nova/como-fazer-uma-animacao.md` (o guia de quem faz: o que entregar, o ritual, o motor em uma página, os comandos, os erros comuns e o padrão de qualidade da seção 8); `docs/revisoes/animacao-nova/prompt-continuacao.md`, seção 2B (os vinte cuidados); e duas animações prontas de famílias diferentes, com a ficha e a conferência escrita de cada uma (`src/engine/novo/exercicios/`, `dados/movimentos/`, `docs/revisoes/animacao-nova/lote-*/`).

O ritual não muda, e nenhum passo é opcional:
1. Reler a ficha da técnica do exercício e as correções já feitas em exercícios parecidos (`docs/revisoes/animacao-nova/correcoes-ja-feitas.md`).
2. Preencher a ficha do movimento, cada número com selo e fonte.
3. Fazer as poses sobre um núcleo que já exista; criar um núcleo novo só quando nenhum serve.
4. Passar na conferência automática sem falha (`node scripts/animacao-nova/conferir.mjs <id>`).
5. Escrever a conferência "o que a fonte pede × o que o boneco faz (medido) × confere?".
6. Gerar os quadros grandes e **olhar cada um**: começo, meio e fim em cada vista, o modo Músculos, cada erro, o tema escuro e o cor de pele.

Quatro coisas que as 90 ensinaram e que valem desde o primeiro exercício:
- **O primeiro desenho tem de sair rápido.** Conta de tentativa e erro com centenas de poses passa por `calibragem()`, e depois de mudar qualquer exercício roda-se `node scripts/animacao-nova/preparo.mjs` (grava o que vem calculado de antemão, um arquivo por exercício). Sem isso, o guia levou até 7 segundos para abrir.
- **Nada de estilo embutido no desenho** (`style="..."`): a política de segurança do app barra. Use classe no `estilo.css`.
- **Delegar não baixa a qualidade.** Defeito visível é consertado antes de a animação contar como pronta.
- **Passar nos testes do motor não é funcionar no app.** Rode `npm run test:e2e` a cada lote e abra o exercício no app de verdade.
</como_se_faz_uma_animacao>

<o_que_e_diferente_das_90>
As 90 já tinham animação no motor de antes; estas 81 nunca tiveram. Isso traz cinco trabalhos que não existiram antes:

1. **O texto do guia animado.** O cartão de texto tem menos campos que o conteúdo de um exercício animado. Faltam "onde sentir" e a nota dele, a respiração, a lista de conferência, as variações e os rótulos de técnica (compare um cartão com `src/conteudo/exercicios/supino-inclinado.json` e veja `src/conteudo/schema.ts`). Esse texto é técnico: sai da ficha da técnica, com o nível de evidência e a fonte, e **não se inventa**. O que a ficha não disser, pesquise (só páginas públicas, com a fonte anotada) ou deixe de fora e anote.
2. **Os erros desenhados.** Cada cartão lista os erros comuns. A animação desenha cada um, com o mesmo título e na mesma ordem (o teste `tests/unit/motor-novo-ponte.test.ts` confere). Erro de ritmo ainda não tem desenho no motor (está no backlog): proponha como resolver antes de pular.
3. **As peças novas.** A barra com anilhas e cerca de 25 máquinas e bancos. Cada peça nasce do cartão de equipamento que já existe (`public/equipamento/`, feito por `scripts/desenhos-equipamento/`), com **medidas de fabricante, com fonte**, na tabela de objetos. A máquina tem de funcionar: o braço gira no eixo real, a pilha de pesos sobe quando o cabo é puxado, o banco regula. O diagnóstico da etapa anterior achou cartões de máquina de 30% a 60% mais estreitos que as fichas dos fabricantes: confira a medida antes de copiar a forma.
4. **A ligação com a biblioteca muda o treino gerado.** Para a animação aparecer, o exercício ganha `animacaoId` em `src/domain/biblioteca/exercicios.json`. Só que o gerador usa esse campo como **último critério de desempate** entre exercícios equivalentes ("o que o guia já mostra animado", em `src/domain/gerador/index.ts`). Cada exercício que ganha animação pode passar a ser escolhido no lugar de outro. A cada lote, meça o que mudou nos programas das personas (`tests/personas/`) e no teste de estresse (`npm run auditoria`), mostre ao Gustavo em português simples ("a Ana passa a fazer X no lugar de Y") e só então atualize os testes. **Não mude a regra do desempate**; quando todos tiverem animação, ele deixa de pesar sozinho.
5. **Os testes que hoje protegem o cartão de texto.** `tests/unit/conteudo.test.ts` exige que todo cartão seja de exercício sem animação; `tests/unit/motor-novo-ponte.test.ts` exige que toda animação do motor esteja aprovada e no catálogo do guia (`src/engine/novo/dados/catalogo-do-guia.json`), o que não vale enquanto houver animação em andamento; e alguns testes de ponta a ponta usam um exercício de cartão de texto como exemplo (`treino.spec.ts`, `correcoes-auditoria.spec.ts`, `seu-treino.spec.ts`). Ajuste cada um com cuidado e diga o que mudou. O caminho do cartão de texto continua existindo no app, para o exercício cuja animação não carregar: decida com o Gustavo se ele fica e mantenha um teste dele.
</o_que_e_diferente_das_90>

<tarefa>
**Parte A: o plano, antes de animar.** Um documento curto (`docs/revisoes/animacoes-restantes/plano.md`) com:
- os 81 em lotes, por reaproveitamento de cena e por frequência de uso (regere a frequência com `npm run auditoria:base`; o que mais aparece nos programas vem primeiro dentro de cada família);
- a lista das peças novas, cada uma com o cartão de onde parte e a fonte da medida;
- os núcleos que servem a cada lote e os que faltam;
- o que muda no treino gerado quando cada lote entrar (item 4 acima), estimado.
Mostre o plano ao Gustavo em uma página, com a sua recomendação de ordem. A minha: primeiro os 42 que usam peças que já existem; depois a barra; por último as máquinas, começando pelas mais prescritas (no inventário de hoje, `docs/revisoes/auditoria/inventario.md`, a cadeira flexora e a cadeira extensora estão entre os 25 exercícios mais prescritos do app).

**Parte B: as peças novas, com aprovação.** Antes de animar qualquer exercício de barra ou de máquina, mostre a peça: a barra com anilhas e a **primeira máquina** em folha (no tamanho do cartão e ampliada, ao lado do cartão de hoje, com as medidas). O jeito de desenhar máquina é novo e ele precisa ver uma vez. Depois da primeira aprovada, as outras seguem o mesmo padrão e você leva a ele só as que fugirem dele.

**Parte C: as animações, em lotes.** O modo de aprovação é o que ele escolheu para as 90:
- em 15/11/2026: "a gente pode delegar vários subagentes para fazer todos de uma vez e depois você só me manda [as que] você achar que tem mais chance de eu não gostar";
- no mesmo dia: "o fato de eu ter delegado fazer todos juntos não quer dizer que a gente pode diminuir a qualidade da entrega";
- em 16/11/2026, ao fechar: "Não quero olhar mais nenhuma".
Ou seja: você confere cada animação quadro a quadro, conserta o que estiver errado, registra em `src/engine/novo/aprovados.ts` como aprovada por delegação (com a frase dele) e **leva a ele só as de maior risco**: pose muito diferente do que o cartão descreve, máquina nova, escolha de desenho que contraria a ficha, ou qualquer coisa de que você mesmo não gostou. Uma por vez, com imagem. Na primeira mensagem, confirme com ele em uma linha que continua assim.

A cada lote: `npm run conferir:animacao`, `node scripts/animacao-nova/preparo.mjs`, `npm run check`, `npm run test:e2e`, a linha de base nova (`ATUALIZAR_MOTOR_NOVO=1 npx playwright test --project=motor motor-novo`, conferindo que as animações antigas não mudaram), `docs/revisoes/animacao-nova/andamento.md` e `qa.md` atualizados (`node scripts/animacao-nova/qa-md.mjs`), e um commit pequeno por animação.

**Parte D: fechamento.** A entrada no `docs/devlog.md` (imagem das peças novas e de alguns exercícios, a tabela de medidas, o que mudou nos treinos gerados, o rascunho de post), as pendências no `docs/backlog.md`, os pedidos ao conteúdo, e o resumo para o Gustavo. Pare para a revisão dele.

**Fica fora:** as regras do gerador e os números do treino (em `src/domain/`, só o campo `animacaoId` da biblioteca muda); o que fica guardado no aparelho (`src/storage/`); a função de visão (`api/`); as personas; as telas (em `src/features/`, só o mínimo para ligar); o corpo e o traço aprovados do Boneco; e as 90 animações que já estão no app (se achar defeito numa delas, anote e pergunte).
</tarefa>

<como_trabalhar>
1. **Trabalhe num ramo novo a partir da `main`.** Nunca faça commit, merge ou push na `main`; nunca abra pull request sem ele pedir. Commits pequenos, em pt-BR, no imperativo. Traga a `main` para o ramo antes de cada lote: **outra sessão pode estar revendo os textos do app** (`docs/prompts/sessao-textos.md`) e mexendo em `src/conteudo/` e nas telas. Se ela já tiver regras aprovadas para o texto do guia, o texto novo que você escrever segue essas regras.
2. **Subagentes:** no máximo quatro por vez, um por família, cada um em cópia de trabalho própria do git e gravando o resultado em arquivo antes de responder. A cópia de trabalho pode nascer num commit antigo: o pedido tem de mandar avançar para o commit certo e ligar o `node_modules` da raiz. O guia deles é o `como-fazer-uma-animacao.md`; atualize-o com o que for aprendendo. Quem integra é você: junta, roda tudo, olha cada quadro.
3. **Pesquisa:** só páginas públicas; nada de login, área paga, CAPTCHA ou contorno de bloqueio. Não copie desenho, modelo 3D, ilustração nem tela de terceiros. Medida de fabricante com a página e a data em que foi lida. **Não invente estudo nem número**; o que for escolha de desenho leva o selo "desenho".
4. **Peso e tempo:** a tela do programa baixa 275 kB na primeira visita, com limite de 285 kB no teste (`tests/e2e/orcamento.spec.ts`). Peça nova pesa: meça a cada lote e, se o limite estourar, mostre o número e a opção antes de subir o limite. Meça também o tempo até o primeiro quadro de cada animação nova.
5. **Fale com o Gustavo em português simples.** Ele não lê código nem tabela comprida: para ele vai a imagem e uma frase. `privado/` nunca entra em nada.
6. O que você não conseguir fazer bem, diga: a lista do que não ficou bom faz parte da entrega.
</como_trabalhar>

<criterio_de_pronto>
- Os 171 exercícios com animação aprovada, ou a lista dos que ficaram de fora, com o motivo e o ok dele.
- A conferência automática sem falha em todas; cada exceção escrita, com o motivo.
- Toda peça nova com medida e fonte; nenhuma máquina "de enfeite" (as partes que se mexem, mexem).
- O texto novo do guia com nível de evidência e fonte; nada inventado.
- O que mudou nos treinos gerados, mostrado a ele e aceito; `git diff origin/main -- src/domain` só com o campo `animacaoId`.
- `npm run check`, `npm run test:e2e`, `npm run conferir:animacao` e `npm run auditoria` passando; o tempo até o primeiro quadro e o peso medidos.
- Devlog, backlog e resumo escritos; nada na `main` sem o ok dele.
</criterio_de_pronto>
