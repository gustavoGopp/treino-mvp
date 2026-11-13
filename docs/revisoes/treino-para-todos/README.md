# Treino para todos: etapa 1 (12 e 13/11/2026)

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

`PROT` liga uma regra do protótipo por vez (`joelho`, `usa-tempo`, `escolha`, `sem-repetir`, `fadiga`, `dor`, `curto`, `tecnicas`, `iniciante-simples`); sem ele, todas; `PROT=nada` deixa o protótipo igual ao app. Cada rodada mede 680.625 programas e leva cerca de 9 minutos em 4 processos.

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
