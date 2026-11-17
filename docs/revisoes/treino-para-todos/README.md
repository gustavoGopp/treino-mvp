# Treino para todos (12 a 17/11/2026)

> **Etapa 2 fechada no ramo da sessão, em 17/11/2026. Nada foi para a `main`.** O resumo para decidir está em [`fechamento-etapa-2.md`](fechamento-etapa-2.md); as doze pessoas, com a semana de antes ao lado da de agora, em [`exemplos-finais/`](exemplos-finais/README.md); a revisão cega final, em [`revisao-cega/final/`](revisao-cega/final/README.md); a régua por grupo, na última seção de [`qa.md`](qa.md). **Em 17/11, com o ok do Gustavo, a `main` foi trazida para dentro do ramo (três junções no dia, porque ela andava) e tudo foi verificado de novo** (seção 9.1 do fechamento). Falta a decisão dele sobre o passo 2: juntar o ramo na `main`.

| Para | Abra |
|---|---|
| Decidir o próximo passo | [`fechamento-etapa-2.md`](fechamento-etapa-2.md) |
| Ver doze pessoas, antes e depois | [`exemplos-finais/`](exemplos-finais/README.md) |
| Ver cada pacote, com as decisões | [`pacote-1.md`](pacote-1.md), [`pacote-0.md`](pacote-0.md), [`pacote-3.md`](pacote-3.md), [`pacote-2.md`](pacote-2.md), [`pacote-4.md`](pacote-4.md), [`pacote-5.md`](pacote-5.md) |
| Rever as frases das regras que mudaram (texto que aparece no app) | [`frases-das-regras.md`](frases-das-regras.md) |
| Ver todos os números, por grupo | [`qa.md`](qa.md) e [`medidas/final/retrato.md`](medidas/final/retrato.md) |
| Ver o que depende das outras sessões | [`pedidos-ao-design.md`](pedidos-ao-design.md), [`pedidos-a-animacao.md`](pedidos-a-animacao.md) |

## Como a etapa 2 andou (histórico)

> **Etapa 2 em andamento, no ramo da sessão.** O Gustavo disse sim à decisão 1 (o tempo que sobra vira série para todos). O pacote 1 (o tempo que sobra vira série) foi feito e revisto por ele em 13/11: [`pacote-1.md`](pacote-1.md). O pacote 0 (com dor forte no joelho, ninguém ajoelha) foi feito e revisto em 14/11: [`pacote-0.md`](pacote-0.md). O pacote 3 (a dor que não desmonta a semana, os 30 minutos e as duplas) está feito e parado para a revisão dele: [`pacote-3.md`](pacote-3.md). A régua por grupo dos três está em [`qa.md`](qa.md). O resto desta página descreve a etapa 1. **Pacote 2 (a escolha entre exercícios equivalentes), em 15/11: feito, medido e parado para a revisão do Gustavo; relatório em [`pacote-2.md`](pacote-2.md).** Em 16/11 o Gustavo decidiu as cinco questões do pacote 2 (os registros regravados; a trava do empurrar do foco fica; o hip thrust não muda sem fonte; os resíduos aceitos, com as correções no backlog) e escolheu o próximo: **o pacote 4, o do iniciante.** **Pacote 4 (o corte de tempo revisto e o iniciante), em 16/11: feito, medido e parado para a revisão do Gustavo; relatório em [`pacote-4.md`](pacote-4.md).** Em 16/11 o Gustavo decidiu as quatro questões do pacote 4 (a prática do iniciante e a dupla de lombar como último recurso ficam; o limite de 6 exercícios terá um teste próprio depois) e escolheu o próximo: **o pacote 5, o aviso de "sem melhora".** **Pacote 5, em 16/11: feito (com a decisão do Gustavo de guardar o nível no programa, versão 9 dos dados), medido e parado para a revisão; relatório em [`pacote-5.md`](pacote-5.md).** Com ele, a proposta inteira está no ramo; falta o fechamento da etapa 2.

## Etapa 1

O pedido do Gustavo: levar o treino recomendado ao nível mais alto possível, para qualquer pessoa que o app possa atender. Esta pasta é a etapa 1: pesquisa, retrato medido e proposta. **Nada mudou no app.** A etapa 2 (as mudanças) só começa com a decisão dele.

| Para | Abra |
|---|---|
| Decidir olhando exemplos | [`exemplos/`](exemplos/README.md): doze pessoas, a semana de hoje ao lado da proposta, e o que os revisores disseram |
| Ver o que a proposta muda e o que ela pede de decisão | [`proposta.md`](proposta.md) (as decisões estão na seção 10) |
| Ver o retrato de hoje, medido | [`diagnostico.md`](diagnostico.md) |
| Ver todos os números | [`medidas/hoje/retrato.md`](medidas/hoje/retrato.md) e [`medidas/proposta/retrato.md`](medidas/proposta/retrato.md); [`medidas/biblioteca.md`](medidas/biblioteca.md), [`medidas/estabilidade.md`](medidas/estabilidade.md), [`medidas/longo-prazo.md`](medidas/longo-prazo.md) |
| Ler a pesquisa | `docs/pesquisa-v2/`, temas 18 a 26 (o 26 é a conferência independente na fonte) |
| Ver as revisões cegas, com as páginas e a chave | [`revisao-cega/`](revisao-cega/) |
| Ver o que depende das outras sessões | [`pedidos-ao-design.md`](pedidos-ao-design.md), [`pedidos-a-animacao.md`](pedidos-a-animacao.md) |
| Ver de onde a pesquisa partiu | [`mapa-das-lacunas/`](mapa-das-lacunas/): o que os 17 temas e as revisões anteriores já respondiam, e o que faltava |

## Como refazer as medidas

```bash
npx vite-node scripts/auditoria/retrato.ts -- --saida docs/revisoes/treino-para-todos/medidas/hoje
```

```bash
npx vite-node scripts/auditoria/retrato.ts -- --motor scripts/auditoria/prototipo/gerador.ts --saida docs/revisoes/treino-para-todos/medidas/proposta
```

```bash
PROT=usa-tempo npx vite-node scripts/auditoria/retrato.ts -- --motor scripts/auditoria/prototipo/gerador.ts --saida /tmp/usa-tempo
```

`PROT` liga uma regra do protótipo por vez (`joelho`, `usa-tempo`, `escolha`, `sem-repetir`, `fadiga`, `dor`, `curto`, `tecnicas`, `iniciante-simples`); sem ele, todas; `PROT=nada` deixa o protótipo igual à `main` de antes da etapa 2; `PROT=app`, igual ao app do ramo (só as regras já adotadas). Para comparar dois geradores caso a caso (onde um defeito aparece ou some), `scripts/auditoria/novos-defeitos.ts`. Cada rodada mede 680.625 programas e leva cerca de 9 minutos em 4 processos.

```bash
npx vite-node scripts/auditoria/comparar-retratos.ts -- antes/retrato.json depois/retrato.json --grupos
```

```bash
npx vite-node scripts/auditoria/ver-prot.ts -- academia intermediario 4 60
```

O último mostra o programa de um perfil fictício, hoje e no protótipo (cenário, nível, dias, minutos, focos, objetivo, dor).

## O que é de quem

- A síntese, as decisões técnicas e as medidas são da sessão. As decisões de produto são do Gustavo.
- Os temas de pesquisa vêm de pesquisadores de leitura (subagentes), com a regra de não inventar e o status de leitura de cada fonte; as afirmações centrais foram conferidas por verificadores que não viram as conclusões.
- As notas das revisões cegas são de revisores simulados no papel de treinadores: opinião, não evidência.
- Os pesos da conta ponderada são estimativa (`diagnostico.md`, seção 1.2).
