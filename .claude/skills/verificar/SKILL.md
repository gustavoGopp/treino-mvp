---
name: verificar
description: Roteiro de verificação do treino-mvp. Use antes de dizer que uma mudança está pronta, antes de cada commit que mexe em código e sempre antes de enviar (git push) ou de levar algo à main. Lê o diff, roda as camadas de teste da mais barata à mais cara, os itens da lista de conferência que o diff aciona, abre as telas mudadas no app de verdade e relata a evidência.
---

# Verificar uma mudança no treino-mvp

"Pronto" quer dizer **conferido com evidência**, não "o código parece certo". Este roteiro é o mesmo para qualquer mudança; o que muda é quanto dele o diff aciona. O porquê de cada passo está em `docs/verificacao/README.md`.

## 1. Ler o que mudou

```bash
git status --short
git diff --name-only "$(git merge-base HEAD origin/main)"
```

Separe o que é **texto livre** (Markdown fora de `docs/pesquisa/` e `docs/pesquisa-v2/`: não muda nenhum teste) do resto. Se só mudou texto livre, a verificação é reler o texto; pare aqui.

## 2. Camada barata: `npm run check` (cerca de 1,5 min)

Lint, tipos e unitários. O gancho de parada já roda isto sozinho quando a sessão mudou código, mas rode antes de cada commit de código. Para iterar num arquivo, `npx vitest run <arquivo>` é mais rápido; o `check` inteiro vem antes do commit.

## 3. Lista de conferência: só os itens que o diff aciona

Abra `docs/verificacao/lista.md`, compare o gatilho de cada item com os arquivos do passo 1 e faça a conferência dos que batem (em geral de 2 a 5). Diga no relato quais itens rodaram e quais não se aplicavam.

## 4. Olhar o app (sempre que uma tela, o estilo ou o motor mudou)

Teste passar não prova que a tela está boa. Abra o app de verdade, no tamanho de celular, com a persona fictícia Ana já cadastrada:

```bash
npm run build
node scripts/design/frontend-novo/olhar.mjs .verificacao/telas 412x915 claro programa=/programa
MARGEM=1 node scripts/design/frontend-novo/olhar.mjs .verificacao/telas/estreita 206x420 claro programa=/programa
```

- Rotas: `/`, `/programa`, `/semana`, `/treino`, `/treino/fim`, `/guia/<id>`, `/dados`, `/entenda`, `/locais`, `/comecar/...`. Toques depois de `>>` (o nome do botão ou link): `treino=/programa>>Começar`.
- Variações quando fizer sentido: `escuro` no lugar de `claro`, `LETRA=125`, `PARADO=1` (movimento reduzido), `INTEIRA=1` (página inteira).
- **Olhe as imagens** (`.verificacao/telas/*.png`, com a ferramenta de ler arquivo) e leia a linha de cada tela: erro no console, rolagem para o lado ou algo além da margem é falha.
- Para um fluxo novo (tocar, preencher, voltar), escreva ou estenda um teste em `tests/e2e/`: ele vira a prova permanente do fluxo.
- Para o motor: `npx playwright test --project=motor` e `npm run conferir:animacao`.

## 5. Camada completa: `npm run verificar` (cerca de 5 a 6 min)

O mesmo que a verificação do GitHub roda: lint, tipos, unitários **com cobertura** e todos os testes de tela, parando no primeiro erro. Obrigatório antes de enviar código e sempre antes de levar algo à `main`. Quando passa, carimba o conteúdo conferido, e o portão do envio reconhece o carimbo. Rode-o sem nada pesado em paralelo (outra rodada de testes, a auditoria): testes disputando o processador estouram limites de tempo.

## 6. Quando algo falha

- **Ache a causa e conserte o código.** Não pule o teste, não afrouxe o que ele confere, não acrescente esperas nem novas tentativas. Um teste que falha às vezes é um defeito a investigar, não azar; se a causa não aparecer, registre no backlog o que foi tentado e pergunte ao Gustavo antes de mexer no teste.
- **Um teste perto do limite de tempo:** meça (com a cobertura ligada) antes de subir o limite, e escreva a medida no comentário do teste.
- **Nunca mude o que julga a mudança** no mesmo passo: snapshots das personas, linhas de base do motor, limites dos testes e a régua só mudam com o motivo medido, e gabaritos só com o ok do Gustavo (o gancho pede a confirmação).
- **Três rodadas.** Se a mesma conferência ainda falha depois de 3 tentativas de conserto, pare e explique ao Gustavo, em linguagem simples, o que falha, o que já tentou e o que precisa dele.
- **Falha que já existia** (aparece também na `main`, sem relação com o diff): não conserte escondido no meio da mudança. Registre no backlog e diga no relato.

## 7. Relatar a evidência

No fim, diga em poucas linhas, em pt-BR simples:
- o que rodou e o resultado de cada camada (com os números: testes, tempo);
- quais itens da lista o diff acionou;
- as telas olhadas (e as imagens, quando o Gustavo precisar ver);
- o que **não** rodou e por quê (ex.: "só texto livre", "sem tela mudada").

Se algo escapou desta verificação e apareceu depois (no GitHub ou com o Gustavo), acrescente o item que teria pegado em `docs/verificacao/lista.md`, com a origem.
