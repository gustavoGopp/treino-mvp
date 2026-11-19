# Como o projeto confere o próprio trabalho

Escrito em 19/11/2026, a pedido do Gustavo, depois de ler dois textos da Anthropic: o artigo "How the Claude Code team thinks about verification" (Addy Osmani, 16/11/2026, https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/) e a página do Code Mode na documentação do Claude Code (https://code.claude.com/docs/en/code-mode). A pergunta era se eles fazem sentido para o treino-mvp e como aplicar o que dizem de forma permanente.

## 1. O que os textos dizem, em poucas linhas

**O artigo de verificação.** Quem programa com o Claude não lê mais cada linha que ele escreve; o que dá confiança é o Claude conseguir **provar** que o trabalho está certo antes de dizer "pronto". As ideias centrais:

1. **Rodar o app de verdade vale mais que os testes.** Teste de unidade passa com a tela quebrada; o teste que percorre o app como uma pessoa (o nosso Playwright) é o mais difícil de enganar. A equipe guarda um roteiro chamado `verify` no repositório, que o Claude segue antes de cada commit.
2. **Do mais barato ao mais caro**, e o pesado antes de enviar: quem envia sem testar gasta a verificação do GitHub num erro que podia ter pego antes.
3. **Uma lista de conferência que dispara pelo diff:** cada item tem um gatilho que se lê nos arquivos mudados, a conferência e o incidente que o criou. O Claude roda só os que batem (3 a 10), e ninguém precisa decorar o que já deu errado.
4. **Três rodadas e para:** se uma conferência ainda falha depois de 3 tentativas, o Claude chama a pessoa.
5. **Uma mudança não pode reescrever o que a julga** (o gabarito do teste, as regras de revisão).
6. **Teste que falha às vezes:** proibido pular, pôr espera ou tentar de novo até passar.
7. **Portão novo começa observando:** antes de barrar, só registra o que teria barrado, para achar alarmes falsos.
8. **Cada falha que escapou vira regra**, e as regras são podadas para continuarem valendo o tempo que custam.
9. Três tipos de teste que valem o investimento: de ponta a ponta, de propriedade (milhares de entradas tentando derrubar uma afirmação) e diferencial (o antigo e o novo com as mesmas entradas).

**O Code Mode.** Um modo experimental em que o Claude, em vez de pedir uma ferramenta por vez, escreve um pequeno programa que faz várias chamadas de uma vez (útil para mudanças repetidas em muitos arquivos). Ele **só funciona no terminal do computador**: não funciona nas sessões na nuvem (claude.ai/code, onde este projeto é feito), nem no app para desktop. E não pode ser ligado pelo repositório: cada pessoa liga na configuração do próprio computador.

## 2. Faz sentido para o treino-mvp?

**O artigo, sim, e boa parte já existia.** O projeto já tinha, sem esse nome: os testes de tela com Playwright (180 testes, com toque, contraste, texto cortado e zoom de 200%), os testes de propriedade (as 672 combinações de dor do gerador, as variações das personas), os testes diferenciais (o motor portado comparado quadro a quadro com o guia original; a auditoria que roda duas vezes e compara), os gabaritos que só mudam com o ok do Gustavo e a regra de nunca repetir teste visual ("falha visual é sempre real").

**O que faltava** apareceu nas duas falhas de 13 e 17/11: o que rodava aqui não era o que o GitHub rodava (sem a cobertura, um teste estourou o tempo só lá), e uma tela passava aqui por 2,6 px e quebrava lá. As lições foram para o backlog, mas uma lição no backlog depende de alguém lembrar dela. O que faltava era transformar as lições em coisas que rodam sozinhas.

**O Code Mode, não, por agora.** Ele não funciona nas sessões na nuvem, que é onde o projeto é feito, é experimental ("pode mudar ou ser removido em qualquer versão") e não se liga pelo repositório. Se um dia o Gustavo usar o Claude Code no terminal do computador, dá para experimentar ligando `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1` na configuração pessoal (`~/.claude/settings.json`). Não muda nada no código do app.

**O que também ficou de fora, e por quê:**
- **Uma biblioteca de testes de propriedade (fast-check):** os testes de propriedade daqui varrem todas as combinações de propósito (são poucas e o gerador é determinístico), o que é mais forte que sortear. Uma dependência nova não compra nada agora (princípio da simplicidade).
- **O `REVIEW.md`:** só o serviço de revisão automática de pull requests (o Code Review no GitHub) lê esse arquivo; o `/code-review` das sessões lê o `CLAUDE.md`. Por isso o que importa para revisar ficou no `CLAUDE.md`. Se um dia esse serviço for ligado no repositório, vale criar o `REVIEW.md` apontando para a mesma seção.
- **Medir os revisores** (refazer incidentes antigos e ver se a revisão acharia): faz sentido numa equipe com muitos pull requests; aqui seria mais custo que ganho.

## 3. O que passou a existir

| Peça | Onde | O que faz |
|---|---|---|
| **Um comando só para "conferir tudo"** | `npm run verificar` (`scripts/verificacao/verificar.mjs`) | Roda lint, tipos, unitários **com cobertura** e todos os testes de tela, do mais barato ao mais caro, parando no primeiro erro. **A verificação do GitHub chama este mesmo comando** (`.github/workflows/ci.yml`), e um teste (`tests/repo/verificacao.test.ts`) falha se alguém voltar a listar os passos separados lá. O que passa aqui passa lá. |
| **O roteiro de verificação** | `.claude/skills/verificar/SKILL.md` | O passo a passo que o Claude segue antes de dizer "pronto", antes de commit de código e antes de enviar: ler o diff, camada barata, itens da lista, **abrir as telas mudadas no app de verdade** (com a persona Ana, no tamanho de celular e a 206 px) e relatar a evidência. |
| **A lista de conferência** | `docs/verificacao/lista.md` | 12 itens, cada um com gatilho no diff, conferência e a falha ou regra que o criou (o tempo dos testes com cobertura, a margem de 2,6 px, o estilo que a política de segurança barra, a migração que não volta atrás…). |
| **O gancho de parada** | `scripts/verificacao/ao-parar.mjs` | Quando o Claude termina uma resposta tendo mudado código, roda o `npm run check` sozinho. Se falha, o Claude recebe o erro e continua para consertar; na 3ª rodada seguida, recebe a ordem de parar e explicar ao Gustavo. Não roda se só mudou texto, se o mesmo conteúdo já passou, ou se há testes rodando em segundo plano. |
| **O portão do envio** | `scripts/verificacao/portao-envio.mjs` | Antes de cada `git push` que leva código, confere se aquele conteúdo passou pelo `npm run verificar`. **Começa em modo observar:** não barra, registra e avisa o Claude para dizer no relato. Pode passar a barrar (modo exigir) depois de algumas semanas sem alarme falso. |
| **A guarda dos gabaritos** | `scripts/verificacao/guarda-gabarito.mjs` | Quando um comando ou uma edição regravaria os snapshots das personas ou as linhas de base do motor, o Claude Code pede a confirmação da pessoa na tela. Antes era só uma regra escrita. |
| **As regras no `CLAUDE.md`** | seção "Verificação" | O que "pronto" quer dizer, as três rodadas, o teste que falha às vezes, o gabarito intocável e como a lista cresce. |

Os ganchos ficam em `.claude/settings.json`, que vai junto com o repositório: valem em toda sessão do Claude Code neste projeto, na nuvem ou no computador. O estado deles (o que já passou, o registro do portão) fica em `.verificacao/`, fora do git.

## 4. Manter

- **Quando algo escapar** (passou aqui e quebrou no GitHub, ou o Gustavo achou): acrescentar à `lista.md` o item que teria pego, com o gatilho, a conferência e a origem. Se dá para virar teste automático, melhor ainda; aí o item vira um lembrete do teste.
- **Padrão de revisão** só vira item depois de aparecer em pelo menos dois marcos.
- **Podar:** no fechamento de cada marco, olhar a lista e tirar o que um teste já cobre ou o que não acionou nada há muito tempo.
- **O portão do envio:** depois de 2 a 3 semanas em modo observar, olhar o `.verificacao/registro.log` das sessões (e o que o Claude relatou) e decidir se passa a barrar. Mudar o modo é uma linha em `portao-envio.mjs`, com o motivo no devlog.
- **Tempo:** a camada barata leva cerca de 1,5 min; a completa, cerca de 8 min, dos quais 6,5 são os testes de tela (medidas de 19/11/2026, numa sessão na nuvem). Se a completa passar de 10 min, vale separar os testes de tela por área para o roteiro rodar só os que o diff aciona.
