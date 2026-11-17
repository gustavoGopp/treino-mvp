# Inventário de todo o texto do app (16/11/2026)

A medida de antes de qualquer corte desta sessão: **458 telas, folhas e estados**, com as 6 personas fictícias de `tests/personas/` e mais a "Ana com um sim na saúde", em 390 × 844. O app medido é o do commit `0b80e68` (a folha "Estilo do Boneco" já estava na versão nova, de 6 palavras; antes tinha 52).

## Os arquivos

| Arquivo | O que é |
|---|---|
| `inventario.md` | O resumo: por fluxo, por função do texto, por dono, tela por tela, e os 60 textos que mais pesam |
| `inventario.csv` | A tabela inteira: uma linha por texto por tela (11.687 linhas), com palavras, dono, função e como a função foi decidida |
| `textos-unicos.csv` | Cada texto uma vez só (2.070), com as telas em que aparece |
| `cobertura.md` | Toda rota, folha, bloco que abre, aviso e mensagem de erro do código × a tela que o colheu; o que não foi alcançado e por quê; a comparação com as 41 telas medidas em 13/11 |
| `colheita.json` | O que o roteiro colheu do app rodando, sem classificação (inclui os nomes que só o leitor de tela ouve) |
| `capturas/` | As 1.115 imagens (69 MB). **Não são versionadas**: o roteiro as refaz |

## Os números

- **66.352 palavras somadas** nas 458 telas (a mesma frase conta em cada tela em que aparece); **cerca de 20.500 palavras** de texto diferente.
- A régua é a mesma de 13/11 (`palavrasNaTela`, `palavrasAVista`, blocos de 25 palavras ou mais, selos): 37 das 41 telas antigas dão o mesmo número; as 4 diferenças estão explicadas no `cobertura.md`.
- Nenhum botão, link, campo ou imagem com função ficou sem nome para o leitor de tela (0 em 458 telas).

## De quem é e para que serve cada texto

**Dono** (quem pode mudar): `tela` (`src/features`), `domínio` (frases e nomes que vêm das regras, `src/domain`), `conteúdo` (fichas dos exercícios e fontes, `src/conteudo`), `jurídico` (termos e privacidade), `motor` (rótulos do desenho). O script procura o texto no código; texto montado na hora vale pelo trecho que mais aparece.

**Função** (para que serve): ação, opção, título ou rótulo, estado, número, segurança, definição, justificativa, privacidade, instrução, descreve o que já se vê. O pedido listava oito; entraram três (opção, título ou rótulo, instrução) porque boa parte do texto de uma tela é o próprio controle.

**Limite, dito às claras:** a função sai de regras do script (a peça: botão, opção, título; e palavras como "dor" ou "aparelho") e, onde nenhuma regra pegou, de padrões escritos à mão (`scripts/textos/funcoes-a-mao.json`). A coluna `como_funcao` diz qual foi. É uma classificação para orientar o corte, não um julgamento texto a texto: a decisão de **tirar, trocar, encurtar, levar para um toque ou manter** é feita fluxo a fluxo, em `../proposta.md`, olhando cada tela.

## Como refazer

```bash
npx playwright test -c scripts/textos/playwright.config.ts --trace off
```

```bash
node scripts/textos/classificar.mjs
```

O primeiro comando percorre o app (cerca de 6 minutos; constrói o app e serve na porta 4174) e grava `colheita.json`, `cobertura.md` e as capturas. O segundo classifica e grava os dois CSV e o `inventario.md`. Para ter de novo as capturas de antes dos cortes, rode o primeiro num checkout do commit `0b80e68`.

## O que a colheita não cobre

- 10 textos que não aparecem numa sessão de navegador simulado (listados no `cobertura.md`, com o texto copiado do código).
- Amostra, não tudo: um selo aberto por tela (não as mais de 100 regras) e 7 guias mais 1 cartão de texto (não as 171 fichas de exercício).
- Só Chromium, em tamanhos simulados; nenhum aparelho de verdade.
