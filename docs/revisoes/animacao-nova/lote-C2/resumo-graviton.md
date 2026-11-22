# Lote C2 · Resumo do grupo graviton

De 18/11/2026. Uma peça nova (o graviton) e duas animações novas no motor novo: a barra fixa e o mergulho assistidos no graviton. Até aqui os dois só apareciam como cartão de texto. Nada ligado às telas: quem integra registra em `aprovados.ts` e no catálogo.

## A peça: graviton

- Arquivos: `src/engine/novo/pecas-de-cena/graviton.ts`, `src/engine/novo/dados/objetos/graviton.json`; folha `docs/revisoes/animacoes-restantes/pecas/folha-graviton.png` (o cartão de hoje no tamanho do cartão e ampliado, a peça nova de dois ângulos, a almofada em cima e embaixo com a pilha, e a tabela das medidas), feita por `scripts/animacao-nova/folha-pecas.mjs graviton`.
- **Medidas de fabricante:** o tamanho total da Life Fitness SS-ADC (163 × 149 × 222 cm), com a Hammer Strength HS-ADC (117 × 115 × 221), a Matrix VS-S601 (142,8 × 152,8 × 219,7, ficha pública em PDF) e a Atlantis D131 (144 × 141,8 × 233,4, página pública) como segunda e terceira fichas; o diâmetro das alças (3,9 cm) da Atlantis; a pilha de 85 kg da Life Fitness.
- **De desenho, com o motivo na tabela:** a altura das alças de barra (212 cm) e de paralela (118 cm), o vão das paralelas (50,8 cm, o das paralelas aprovadas), o eixo da alavanca dos joelhos (82 cm do chão, nas colunas, 55 cm à frente das alças), o raio da alavanca até o joelho (59 cm), o topo da almofada 5 cm abaixo da linha do eixo, o came (30 cm), o batente de cima (34°), a almofada (44 × 38 × 7 cm, do cartão de hoje), a torre, a pilha e os degraus (do cartão de hoje).
- **Como a almofada anda:** nenhuma ficha lida diz. Ficou numa alavanca que gira num eixo preso às colunas, como no cartão de hoje (a Atlantis fala de "a linear bearing mechanism", sem dizer de quê). O eixo do cartão (a 46 cm, no pé das colunas) subiu para 82 cm, porque com ele embaixo o joelho não alcançaria o alto da barra.
- **A máquina funciona:** os joelhos empurram a almofada para baixo, a alavanca gira, o came enrola o cabo e as placas sobem (o arco do came, conferido por regra); a almofada é paralela à linha do eixo e fica 5 cm abaixo dela, e assim o centro do joelho cai nessa linha e a almofada gira sem escorregar debaixo dele.

## As animações

| Id | Conferência automática | Erros desenhados | Risco |
|---|---|---|---|
| `barra-fixa-graviton` | 0 falha, 2 avisos (escolhas de desenho; as diferenças de músculos já aceitas na barra fixa) | Encurtar a descida; Balançar | médio |
| `mergulho-graviton` | 0 falha, 1 aviso (escolhas de desenho) | Descer demais; Ombros encolhidos | médio |

Os braços, as escápulas e o tronco usam os números das animações aprovadas (a barra fixa e o mergulho), linha a linha. A diferença está no que segura o corpo: os joelhos na almofada, e não o equilíbrio sobre as mãos. A bacia sai do braço que alcança a alça com a dobra de cotovelo pedida (a conta das aprovadas) e do joelho no arco da almofada. Todos os erros do cartão foram desenhados; nenhum ficou sem desenho.

## Mudança em arquivo comum

- Nenhuma no motor. `exercicios/pendurado.ts`, `exercicios/mergulho.ts` e `exercicios/abdominal.ts` são usados como estão (as funções já eram exportadas).
- `scripts/animacao-nova/folha-pecas.mjs`: só o trecho novo da folha do graviton (e a peça no pacote).
- Uma linha em cada registro (objetos, regras, exercícios) e os arquivos de preparo dos dois ids.

## O que não ficou bom (e o risco)

- **A almofada inclina** de −29° a +26° na barra (de +12° a −13° no mergulho), porque gira com a alavanca: no topo da barra, os pés ficam levantados atrás. Se o Gustavo preferir a almofada sempre na horizontal (um trilho), a troca é na peça e no núcleo. É o maior risco de ele não gostar (**médio**).
- **O mergulho mostra pouco o peito no modo Músculos** (de lado, 142 cm², contra 464 cm² de frente no mergulho aprovado): de frente, a alavanca fica à frente das coxas.
- **As alças de barra são duas, uma de cada lado** (como no cartão de hoje), e não uma barra: no topo, o peito passa 10,7 cm à frente da linha delas.
- A alça de paralela ficou 10 cm abaixo da do cartão de hoje (118 cm), e o eixo da alavanca 36 cm acima, ambas escolhas de desenho para o corpo da tabela.
