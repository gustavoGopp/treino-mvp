# Lote C1 · As cadeiras (cadeira flexora e cadeira extensora): resumo

De 18/11/2026. Uma peça nova (a cadeira extensora) e duas animações (a cadeira flexora, na peça aprovada, e a cadeira extensora). Nada disso está aprovado nem ligado às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## A peça nova: cadeira extensora

- Código: `src/engine/novo/pecas-de-cena/cadeira-extensora.ts`. Medidas: `src/engine/novo/dados/objetos/cadeira-extensora.json`. Folha: `docs/revisoes/animacoes-restantes/pecas/folha-cadeira-extensora.png` (`node scripts/animacao-nova/folha-pecas.mjs cadeira-extensora`): o cartão de hoje ao lado, no tamanho do cartão e ampliado, a máquina funcionando (a alavanca no começo e no fim, as placas subindo), a flexora aprovada ao lado (para ver que não se confundem) e a tabela das medidas.
- **Reaproveita a flexora:** a peça é a mesma função da flexora aprovada (`cadeiraFlexora`), com um modelo (`ModeloDaCadeira`) que diz de onde vêm as medidas, se há trava das coxas, para que lado a pilha sobe e onde ficam as alças. Com o modelo padrão (a flexora), o desenho, os volumes e os pontos são exatamente os de antes (comparados byte a byte). A extensora não tem trava das coxas, o assento é reto e mais alto, o rolo fica embaixo, na frente da canela, e as placas sobem quando a alavanca vai para a frente.

| Medida | Valor | Tipo | Fonte |
|---|---|---|---|
| Comprimento × largura | 167 × 106 cm | medida | Life Fitness SS-LE (catálogo 2026, p. 214); HS-LE 120 × 105, Movement Next 137 × 110, Precor RSL0605 155 × 127 |
| Altura da torre | 148 cm | medida | Precor RSL0605 ("Weight Stack Tower Height", página pública e ficha em PDF, lidas em 18/11/2026); LF 148 |
| Espessura dos estofados | 6,5 cm | medida | Precor RSL0605 ("Upholstery total thickness is 2.5 inches (65 mm)") |
| Inclinação do assento | 0° | desenho | o cartão de hoje (assento reto); nenhuma ficha dá |
| Altura do assento | 56 cm | desenho | o pé fora do chão com o joelho bem dobrado |
| Eixo: 9 cm acima e 5 cm à frente da borda do assento | — | desenho | o centro do joelho de quem senta (o da flexora) |
| Encosto: 62 cm, 20° da vertical, 16 cm de curso | — | desenho | o da flexora; "recline-o um pouco" (o cartão do app) |
| Alavanca até 48 cm; rolo Ø 11 × 44 cm; came Ø 22 cm | — | desenho | o cartão de hoje; a canela da tabela do corpo |
| Alças: a borracha começa 8 cm atrás do meio do assento | — | desenho | ao lado do quadril, para as mãos chegarem com o tronco encostado |
| Pilha: 15 placas, 75 × 26 × 12 cm | — | desenho | a da flexora |

O cartão de hoje é 37% a 54% mais estreito que as fichas porque põe a pilha atrás do assento; a peça nova põe a pilha ao lado, como as fichas e a flexora aprovada.

## As animações

| Id | Conferência automática | Erros desenhados | Sem desenho | Risco |
|---|---|---|---|---|
| `cadeira-flexora` | 0 falha, 1 aviso (linhas de desenho) | os quatro: Rolo da coxa solto, Dar tranco, Joelho fora do eixo, Não estender na volta | nenhum | médio |
| `cadeira-extensora` | 0 falha, 1 aviso (linhas de desenho) | os quatro: Dar tranco, Tirar o quadril do banco, Joelho fora do eixo, Descer rápido | nenhum | médio |

Conferências escritas: `cadeira-flexora.md` e `cadeira-extensora.md`. Quadros grandes: `../quadros/cadeira-flexora.png` e `../quadros/cadeira-extensora.png`.

O núcleo comum, `exercicios/cadeira-de-joelho.ts`, põe o corpo na máquina por condições (o joelho no eixo, o glúteo no assento, as costas no encosto) e regula a máquina para o corpo como quem treina faz antes da série (o encosto, o rolo, a trava, a posição inicial). A alavanca acompanha a canela (o rolo encosta nela sem escorregar), e as placas sobem o arco do came. As regras novas ficam em `regras/cadeiras.ts`.

## Mudanças em arquivo comum (todas aditivas)

- `pecas-de-cena/cadeira-flexora.ts` (a peça aprovada): o modelo (`ModeloDaCadeira`, padrão = a flexora) e duas opções desligadas por padrão (`OpcoesDaPeca`): `travaAParte` (a trava das coxas numa peça à parte, para ser pintada por cima das coxas) e `cantosRedondos` (os estofados, na conferência, sem os cantos vivos que o desenho não tem). Sem o modelo e as opções, a peça desenha o mesmo SVG de antes.
- `scripts/animacao-nova/folha-pecas.mjs`: a folha da extensora.
- Uma linha em cada registro (objetos, regras, exercícios) e o preparo dos dois ids (`dados/preparo/cadeira-*.json` e o `registro.ts` gerado).

## O que pode não agradar

- Na flexora, as alças da peça aprovada ficam à frente do quadril: as mãos só chegam a elas com o tronco 6° à frente do encosto e os ombros 25° à frente. A ficha permite inclinar o tronco à frente, mas o número é de desenho.
- A trava aprovada cobre do joelho ao meio da coxa (22 cm), não só "logo acima do joelho".
- Nas duas, as medidas que fazem a máquina funcionar (altura do assento, eixo, alavanca, alças) são de desenho: nenhuma ficha pública lida as dá.
