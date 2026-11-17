# Prompt: o texto do app, de ponta a ponta (cortar muito)

> Para colar no início de uma nova sessão do Claude Code com o repositório `gustavoGopp/treino-mvp`.
> Escrito em 16/11/2026, ao fim da frente da animação nova, a pedido do Gustavo. Parte da `main` já com o motor novo
> do Boneco e a opção cor de pele.

---

<contexto>
Você vai conduzir a **revisão completa do texto** do **treino-mvp**, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz o treino com um guia animado (o "Boneco"). O dono é o Gustavo. Ele não é programador nem da área de exercício ou de design: fala de produto e de experiência, **decide olhando imagens** e quer uma decisão por vez, em português simples, com a sua recomendação.

**O pedido dele, em 16/11/2026:** "focar completamente no texto do app, procurar por referências e diminuir muito a quantidade massiva que hoje o app apresenta de informações e escrita. Por exemplo, os dois bonecos na hora de escolher sequer precisam de um texto: pode ser só uma indicação para escolher o avatar e clicar em um dos dois. Esses tipos de ajustes de textos não essenciais precisam ser revistos completamente."

**O que já foi feito sobre isso (não refaça, parta daqui):**
- `docs/revisoes/frontend-novo/textos/estudo-dos-textos.md` (13/11/2026): a medida do texto de 41 telas, duas pesquisas de referências (`pesquisa/01-regras-de-texto.md`, 48 fontes; `pesquisa/02-como-os-apps-mostram-texto.md`, 38 fontes e 20 apps), 10 regras e 5 etapas. A **etapa 1** foi aplicada em 11 telas: de 6.311 para 5.019 palavras à vista, de 55 para 30 blocos longos, de 63 para 16 selos à vista. A regra daquela etapa foi "uma linha na tela, o resto a um toque".
- **As etapas 2 a 5 continuam abertas** (o resto do texto das telas; o guia; as frases que vêm das regras e das fichas; os termos e a folha da foto). Estão no `docs/backlog.md`, em "Do frontend novo", e os 12 pedidos de texto às regras, em `docs/revisoes/frontend-novo/pedidos-ao-dominio.md`.

**O que muda agora:** o Gustavo olhou o app depois da etapa 1 e ainda acha a quantidade de texto "massiva". Ele quer ir muito além de mudar o texto de lugar. A pergunta de cada palavra deixa de ser "onde ponho isto?" e passa a ser **"isto precisa existir?"**. Onde a imagem, o ícone, o número, a posição ou o próprio controle já dizem, o texto sai. O exemplo dele é a folha "Estilo do Boneco" de Meus dados (`src/features/dados/EstiloBoneco.tsx`): hoje tem título, uma frase de explicação e, em cada uma das duas opções, um nome e uma descrição; ele quer só os dois bonecos para tocar, com no máximo uma indicação curta.
</contexto>

<o_que_nao_se_perde>
Leia o `CLAUDE.md` inteiro antes de qualquer coisa. Destes pontos o corte não passa:

1. **Segurança.** O que a pessoa precisa para não se machucar fica à vista, curto e com a ação ("Sentiu dor ou tontura? Pare e procure avaliação."). A triagem no estilo do PAR-Q+, o "Senti algo" e os sinais de alerta não perdem conteúdo. Pode encurtar a frase; não pode esconder nem tirar.
2. **Evidência.** Toda regra do gerador e todo texto técnico têm nível de evidência e fonte. Eles podem ficar a um toque (como já estão em boa parte), mas **não podem deixar de existir nem de ser alcançáveis**.
3. **Privacidade (LGPD).** O que o app faz com os dados e com a foto continua dito por inteiro em algum lugar alcançável. Na tela pode ficar uma frase; o texto completo fica a um toque. Não tire conteúdo dos termos nem da folha da foto sem o ok explícito do Gustavo (ele dispensou a revisão por advogado em 08/11/2026; a decisão de mexer é dele).
4. **Acessibilidade.** Quando um texto visível sai, o nome acessível fica: todo botão, opção e imagem que a pessoa toca continua com nome para o leitor de tela (`aria-label` ou texto oculto), área de toque de 44 px ou mais, e nada que dependa só de cor. Um ícone sem nome não substitui uma palavra.
5. **Precisão técnica.** O texto de execução dos exercícios (`src/conteudo/exercicios/`) pode ser reorganizado e encurtado, mas não pode passar a dizer outra coisa. Mudança de sentido técnico pede fonte.
6. **As regras do treino não mudam.** Em `src/domain/` você pode reescrever a **frase** que uma regra gera (aviso, porquê, fase, sugestão), nunca a regra. O gerador continua determinístico e os testes das regras continuam passando.
</o_que_nao_se_perde>

<tarefa>
**Parte A: o inventário de todo o texto.** Meça antes de propor.
- Refaça a medição que já existe (comando na seção 9 do estudo; roteiro em `scripts/design/frontend-novo/capturas.spec.ts`) e **amplie o que ela cobre**: todas as telas e todas as folhas que abrem, os estados vazios, de carregando e de erro, os avisos (instalar, cópia, sem rede), os dois temas e mais de uma persona de `tests/personas/` (quem tem restrição de saúde e quem tem pouco equipamento vê textos que a Ana não vê).
- Para cada texto, registre: onde aparece, quantas palavras, de quem é (tela, domínio, conteúdo ou jurídico) e **para que serve**: ação, estado, número, segurança, definição, justificativa, privacidade, ou descreve o que já se vê. Gere por script; a tabela é a base de tudo.
- Inclua o que a etapa 1 não tocou e ainda pesa: o guia (de 295 a 340 palavras por modo), os termos (793), a folha da foto (194), "Saúde: quais valem" (195), a folha do "por quê?" do treino (202), editar local (125), experiência (121), equipamento (110) e as frases longas que vêm das regras.

**Parte B: referências.** Parta das duas pesquisas que já existem e complete o que falta para este pedido, que é mais radical que o anterior:
- como apps bons de treino e de hábito fazem telas com quase nenhum texto: escolha de avatar ou de aparência, cadastro por toque, estado vazio, configuração, fim de treino;
- quando um ícone ou uma imagem substitui bem uma palavra e quando piora (há pesquisa sobre ícone sem rótulo);
- o que os guias de plataforma e de linguagem simples dizem sobre rótulo, título e texto de ajuda.
Só páginas públicas: nada de login, área paga, CAPTCHA ou contorno de bloqueio. Não copie tela nem ilustração de terceiros. Cada afirmação com a fonte e o nível de sustentação (`docs/pesquisa/00-metodo.md`); o que for opinião sua, marcado como opinião. **Não invente estudo nem número.** Diga também onde a evidência é fraca (o estudo de 13/11 já anotou que quase tudo sobre leitura é de tela de computador).

**Parte C: a proposta, tela por tela, em imagem.** Para cada texto do inventário, uma de cinco saídas: **tirar**; **trocar** por imagem, ícone, número ou pelo próprio controle; **encurtar**; **levar para um toque**; **manter**. Use o teste: "se eu tirar isto, a pessoa erra, se machuca, ou fica sem saber o que fazer?". Se a resposta for não, sai.
- Comece pelo exemplo dele, "Estilo do Boneco", e mostre duas ou três versões lado a lado, da mais enxuta para a menos.
- Monte as folhas de antes e depois por fluxo: cadastro; início e programa; treino; guia; fim e semana; Meus dados e Meus locais; termos e foto; avisos e erros.
- Em cada folha, a contagem de palavras à vista antes e depois. Proponha uma meta por tipo de tela e defenda-a com as referências (a etapa 1 usou "frase de até 20 palavras; na tela do treino, até 12", e blocos de 25 palavras ou mais como sinal de alerta; a meta agora deve ser bem mais dura).
- **Pare a cada fluxo e espere a decisão do Gustavo**, com nada pré-marcado. Só o que ele aprovar vai para o app.

**Parte D: aplicar o aprovado,** fluxo por fluxo, com os testes acompanhando.
- Vários testes conferem texto: `tests/repo/textos.test.ts`, os de ponta a ponta que acham botão e título pelo nome (`tests/e2e/`), os critérios de toque, contraste e texto cortado (`tests/e2e/criterios.ts`, `cenarios.spec.ts`) e `npm run conferir:tokens`. Atualize o teste junto com o texto; **nunca afrouxe um teste de segurança, de privacidade ou de acessibilidade para passar**.
- Depois de cada fluxo: `npm run check`, `npm run test:e2e`, a medição de novo e um commit pequeno.

**Parte E: fechamento.** A entrada no `docs/devlog.md` (o antes e o depois em imagem, a tabela de palavras por tela, o rascunho de post), as pendências no `docs/backlog.md`, e o resumo para o Gustavo. Pare para a revisão dele.

**Fica fora:** as regras do gerador e os números do treino (`src/domain/`, fora as frases), o motor e os desenhos do Boneco (`src/engine/`), o que fica guardado no aparelho (`src/storage/`), a função de visão (`api/`) e as personas. Se a tela precisar de um ícone ou de uma imagem nova para dispensar um texto, proponha e mostre antes de fazer.
</tarefa>

<como_trabalhar>
1. Leia primeiro: `CLAUDE.md`, `docs/revisoes/frontend-novo/textos/estudo-dos-textos.md` e as duas pesquisas dele, `docs/revisoes/frontend-novo/pedidos-ao-dominio.md`, as seções "Do frontend novo" e "Da animação nova" do `docs/backlog.md` e as duas últimas entradas do `docs/devlog.md`.
2. **Trabalhe num ramo novo a partir da `main`.** Nunca faça commit, merge ou push na `main`; nunca abra pull request sem ele pedir. Commits pequenos, em pt-BR, no imperativo.
3. **Fale com o Gustavo em português simples.** Uma decisão por vez, com imagem e com a sua recomendação. Ele não lê código nem tabela comprida: a tabela fica no repositório; para ele vai a imagem e uma frase.
4. **Mostre o app de verdade**, não um desenho: as imagens saem do app rodando (Playwright, 390 × 844, temas claro e escuro), com as personas fictícias. `privado/` nunca entra em nada.
5. Pode usar subagentes para o inventário e para a pesquisa, no máximo quatro por vez, cada um gravando o resultado em arquivo. A qualidade não cai por delegar: confira você mesmo cada tela antes de mostrar.
6. Se cortar um texto mudar uma decisão anterior dele (o estudo de 13/11 lista três que já mudaram), diga qual é e peça o ok.
7. Onde você tiver dúvida se um texto é de segurança ou de privacidade, trate como se fosse e pergunte.
</como_trabalhar>

<criterio_de_pronto>
- Todo texto do app está no inventário, com dono e função, e teve uma das cinco saídas, aprovada pelo Gustavo.
- As palavras à vista caíram muito em todos os fluxos, com o número de antes e de depois por tela, e nenhuma tela fora dos termos tem bloco de texto corrido.
- Segurança à vista; evidência, fonte e privacidade alcançáveis; todo controle com nome acessível.
- `npm run check`, `npm run test:e2e` e `npm run conferir:tokens` passando; `git diff origin/main -- src/domain` só com frases, sem mudança de regra.
- Devlog, backlog e resumo escritos; nada na `main` sem o ok dele.
</criterio_de_pronto>
