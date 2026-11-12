# Sessão: corrigir tudo o que a auditoria geral deixou em aberto

> Prompt para uma sessão nova. Cole o texto abaixo inteiro.

---

Você vai corrigir, do mais grave ao menos grave, todos os pontos que a auditoria geral de 12/11/2026 achou e não corrigiu. O objetivo é terminar sem nenhuma imprecisão conhecida no app: nenhuma regra que sugira o que não existe, nenhum número na tela que não bata com o que o código calcula, nenhum texto que cite o que não está lá, nenhum documento que descreva um estado antigo.

## Antes de começar

1. Leia `CLAUDE.md` (os princípios não são negociáveis) e a seção "Da auditoria geral (12/11/2026)" de `docs/backlog.md`: ela é a lista de trabalho, com o arquivo de cada ponto. Leia também a entrada "Auditoria geral do projeto" em `docs/devlog.md`, para saber o que já foi corrigido e não refazer.
2. Rode `npm ci`, `npm run check` e `npm run test:e2e -- --trace off` e anote os números. A linha de base é 837 testes unitários e 145 e2e passando. Se não bater, pare e me diga.
3. Confira cada ponto no código antes de mexer. A auditoria leu o código de 12/11; se algo já mudou ou o ponto não se reproduz, diga isso e siga, sem inventar correção.

## Como trabalhar em cada ponto

- **Reproduza primeiro.** Escreva o teste que falha (Vitest para regra em `src/domain/`, Playwright para tela) e só então corrija. O teste fica no repositório. Para as correções de tela, confirme que o teste falha no código antigo.
- **Corrija a causa, não o sintoma.** Se dois lugares calculam a mesma coisa de jeitos diferentes, fica um só.
- **Um commit por ponto**, pequeno, no imperativo, em pt-BR.
- **Regra do gerador ou da progressão que muda** precisa do nível de evidência e da fonte (`docs/pesquisa/`, `docs/pesquisa-v2/`). Se não houver fonte para a regra nova, marque como consenso ou opinião do projeto, como o código já faz, e nunca invente estudo. Depois de mexer no gerador, rode `npm run auditoria` e olhe o diff de `docs/revisoes/`: nenhum defeito da régua pode piorar. Se um número mudar, mostre o antes e o depois.
- **Mudança de formato do estado salvo** ganha versão nova e migração em `src/storage/migracao.ts`, com teste de um estado antigo real. Nenhuma mudança pode deixar ilegível o que já está guardado no aparelho de alguém.
- **Motor de animação:** qualquer mudança passa pela regressão visual, com 0 pixel de diferença nas animações aprovadas.
- Nada de `privado/`, e-mail ou dado pessoal no repositório. O teste de privacidade agora procura e-mails.

## Ordem

Siga os blocos na ordem. Dentro de cada um, a ordem do backlog.

**1. Alto**
- Erro ao salvar invisível durante o treino: mostrar no treino, no programa e no resumo, com o caminho para exportar.
- Dependências com alerta no `npm audit`: veja a pergunta 2 abaixo.
- Histórico do git com e-mails: veja a pergunta 1 abaixo. Não reescreva o histórico sem a minha resposta.

**2. Médio: segurança e dados**
- Dor acima de 5 antes da 1ª série fica registrada e entra no aviso de dor repetida.
- O programa não pode ser gerado de novo com um treino aberto.
- Um id de exercício desconhecido não pode deixar o estado ilegível; e um teste do repositório que falhe se um id sair da biblioteca sem migração.
- Campos que entraram no estado sem versão nova (`rotina.objetivo`, `respostas.semanaLeveEm`).
- `halteres_fixos` com mínimo maior que o máximo, passo absurdo, e `anilhas_e_manoplas` sem anilha: validar no formulário, tratar o que já estiver salvo na migração, e só então endurecer o esquema.
- Limite da foto: a cota volta quando o modelo falha; registrar no log quando o limite cai para a memória; limite de tamanho coerente com o da Vercel; tempo máximo na chamada ao modelo.
- Content-Security-Policy em `vercel.json`, testada com o service worker e os estilos em linha.

**3. Médio: regras do treino** (é aqui que mora a imprecisão do modelo)
- "Subir" confere a carga em todas as séries, não só na 1ª.
- Os minutos do dia são recalculados quando uma fase muda as séries (`aplicarFase`), com a margem pessoal de tempo quando houver.
- Dias sem nenhum exercício: texto verdadeiro, ou o programa não sai como "ok".
- A oferta de menos dias não aparece depois de uma pausa nem diz "1 vez por semana" para zero treinos.
- "Suba dois degraus" só quando existem dois degraus.
- "Reduza a carga" e o ajuste por dor quando não há carga menor (placa 1, halter mais leve, degrau fora da escada).
- `panturrilha-chao`: bilateral nos dados e unilateral no texto. Decida pelo que a fonte diz e alinhe os dois.
- Um formatador de carga só, sem `toLocaleString` dentro de `src/domain/`; o `localeCompare` que sobrou em `locais/index.ts`.
- Lógica duplicada que pode divergir: as duas definições de empurrar e puxar, `regiaoDe` e `INFERIORES` em três lugares (com os adutores tratados diferente), `LIMITE_DO_DIA`, `POR_ID`, `razaoCoxa`, `resumoSessao` contra `seriesEfetivas` (o drop set conta 1 num e 2 no outro). Uma definição de cada.
- Textos com números escritos à mão ("1 min 45 s", "4", "10", "20") passam a usar as constantes.
- `regras.json` e `selos.json` validados com zod na carga, como o resto dos dados.
- Os 20 exercícios sem animação nem cartão: escrever o cartão de texto de cada um, com fonte, no padrão dos 61 que existem.
- Testes fracos apontados pela auditoria (`sessao.test.ts`, `locais.test.ts`, `dados-copia.test.ts`, `objetivo.test.ts`): passam a afirmar o que o nome diz.

**4. Baixo: tela**
- O descanso e a nota de dor pendente sobrevivem à ida ao guia; o `AudioContext` é fechado; os bipes param quando o tempo passa de zero.
- Ids repetidos no drop set (`useId`) e nas miniaturas.
- A folha dentro do alcance das regras de `.app` (cor dos links, `prefers-reduced-motion`), o foco devolvido a quem abriu, a folha de baixo inerte.
- Importação que falha não fica guardada: tenta de novo.
- Mensagens da foto em pt-BR para cada tipo de erro.
- Os termos citam só botões que existem; o RIR "4+" igual em todo lugar; chave duplicada no resumo.
- CSS sem uso e ajudantes repetidos: apague só o que o `grep` em `src/` confirmar que não é usado, e rode o e2e inteiro depois.

**5. Baixo: repositório**
- `docs/PLANO-MVP.md` e `docs/pesquisa-v2/README.md` com o estado real dos marcos.
- As fontes citadas em `pesquisa-v2` que faltam em `pesquisa/fontes.md`: liste as chaves por script, inclua as que você conseguir conferir no PubMed (`scripts/pesquisa/pubmed.py`) e marque as outras como não verificadas. Corrija a citação com o PMID cortado em `pesquisa-v2/01`. Não escreva referência de memória.
- CI: uma execução por PR, bloco `permissions`, e `vite-node`, `playwright` e `tsx` declarados no `package.json`.
- `scripts/` no lint e no typecheck, ou fora do repositório: veja a pergunta 3.
- `@ts-nocheck` no motor: tire dos arquivos escritos à mão (`estilo/`, `desenho.ts`, `cena.ts`) e corrija os tipos; os exercícios do port ficam como estão se a tipagem pedir reescrever a animação.
- Comentários que mentem ("gerado por… não editar à mão", "82 animações", o teste `guia-visual.spec.ts` que nunca existiu) e o campo `chave` de `motor.json`, que ninguém lê.

## Perguntas para mim, logo no começo

Faça estas quatro de uma vez, antes de começar, e siga com o que não depende delas enquanto eu respondo:

1. **Histórico do git:** reescrever para tirar os e-mails (muda todos os hashes e pede `push --force` na `main`), ou deixar como está?
2. **Dependências:** subir zod 3 → 4, react-router 6 → 7 e vitest 3 → 5 nesta sessão (um PR por biblioteca), ou só o que não quebra?
3. **Sobras:** apagar `scripts/design/` (74 arquivos), `scripts/gif/divisao.spec.ts`, as 27 imagens sem referência em `docs/img/`, `LEIA-ME.md` e `PROMPT-INICIAL.md`, ou mover para uma pasta de histórico?
4. **"Subir" com cargas diferentes na sessão:** exigir a mesma carga em todas as séries, ou aceitar séries mais leves desde que a 1ª esteja no topo?

## Ao terminar

- `npm run check`, `npm run test:e2e -- --trace off` e `npm run auditoria` passando, com os números no relato.
- Cada item da seção "Da auditoria geral" do backlog riscado ou apagado; o que não foi feito fica lá com o motivo em uma linha.
- Entrada no `docs/devlog.md` com o que mudou e o rascunho de post, e pare para a minha revisão.
- No relato final, separe: corrigido e testado; corrigido sem teste (e por quê); não corrigido (e por quê); não se reproduziu. Não diga que algo foi validado se você não rodou.
