# Estado da sessão da animação nova (13/11/2026, fim da etapa 1)

A etapa 1 está entregue e a sessão está **parada, esperando a decisão do Gustavo**. Ramo: `claude/loving-hamilton-c4ji83`. Nada foi para a `main` e nada mudou no app.

Comece por **`proposta.md`**: ela resume tudo, lista as decisões pedidas e diz onde está cada arquivo.

## O que aconteceu, em ordem

1. Pesquisa, diagnóstico das 90 animações de hoje, tabela do corpo com fonte, esqueleto novo, fichas de movimento e conferência automática (12 e 13/11).
2. Três tentativas de corpo recusadas pelo Gustavo (manequim de fórmula, malha realista, quadro de oito estilos). Lição: primeiro o desenho, depois a técnica.
3. Uma sessão própria decidiu o desenho do Boneco (`docs/revisoes/boneco-desenho/`): cinza como padrão e cor de pele como opção.
4. Esta sessão trouxe aquele trabalho (merge do ramo `claude/vigilant-lovelace-rkqoz1`), levou o desenho aprovado para o motor e o conferiu contra as pranchas. O Gustavo avisou que o desenho do motor não estava igual ao aprovado; a comparação medida mostrou 81% de frente e 93% de lado, e o desenho foi corrigido até 97 a 99%.
5. As quatro âncoras foram refeitas no desenho aprovado, com página animada, folhas ao lado das de hoje, conferência sem falhas, três cartões de equipamento e medidas de peso e de fluidez.

## O que está no ramo

| O que | Onde |
|---|---|
| Proposta, com as decisões pedidas | `proposta.md` |
| Referências | `referencias.md` |
| Diagnóstico do que existe hoje | `diagnostico.md`, `diagnostico/` |
| Tabelas do bloco A | `tabelas.md` (gerado de `src/engine/novo/dados/`) |
| Pesquisa por assunto | `pesquisa/01` a `08` |
| Protótipos, folhas, conferências, cartões e medidas | `prototipos/` |
| Motor novo (fora do app) | `src/engine/novo/` (o gerador realista do equipamento está em `src/engine/novo/realista/`) |
| Scripts | `scripts/animacao-nova/` |

## Comandos

- `npm run conferir:animacao`: a conferência automática das animações novas.
- `node scripts/animacao-nova/conferir-desenho.mjs [cinza|pele]`: o aprovado, o do motor e a diferença.
- `node scripts/animacao-nova/prototipos.mjs`: a página, as folhas e as medidas.
- `node scripts/animacao-nova/cena-realista.mjs`: o equipamento das cenas, peças simples ao lado do desenho realista.
- `node scripts/animacao-nova/tabelas-md.mjs`: regenera `tabelas.md`.
- `node scripts/animacao-nova/levar-desenho.mjs`: traz as tabelas do desenho aprovado para os dados do motor.

## O que ficou por fazer (está na proposta)

- Baixar o tempo por quadro (o novo é 2 a 3 vezes mais lento que o de hoje num celular lento simulado).
- Rótulos de técnica e destaque da parte que erra no modo Erros.
- Formas de músculo que o desenho não separa (porções do deltoide, do peitoral e do trapézio, eretores e outras).
- Fonte para as 13 medidas provisórias do corpo e as 16 dos objetos.
- Trazer a `main` para este ramo antes da etapa 2 (ela mudou o visual do app e criou um segundo palco, na tela do treino).

## Observações

- O primeiro commit desta sessão (`5fda7f6`) saiu com "Gustavo Gopp" como autor, por engano meu; os seguintes usam a identidade configurada no repositório. A correção pedia reescrever o histórico já enviado e foi recusada pela ferramenta; fica registrado.
- Os experimentos recusados (malha do MakeHuman, pintor WebGL, os oito estilos) saíram do ramo e continuam no histórico (commit `356269a`). O arquivo da malha fazia o teste de privacidade estourar o tempo.
- O `package.json` ganhou só a linha do comando `conferir:animacao`.
- O `docs/devlog.md` não foi atualizado: fica fora das pastas que esta sessão pode alterar.
