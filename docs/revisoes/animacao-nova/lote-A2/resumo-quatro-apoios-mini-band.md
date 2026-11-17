# Lote A2 · Quatro apoios e mini-band: resumo (coice com elástico, extensão de joelho, abdução deitado e caminhada lateral com mini-band)

De 17/11/2026. As quatro primeiras animações destes exercícios (antes, só cartão de texto). A caminhada lateral teve uma segunda volta no mesmo dia (o passo e o meio agachado não se viam; ver a conferência escrita dela). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## O que foi feito

| | Abdução deitado com mini-band | Extensão de joelho com mini-band | Caminhada lateral com mini-band | Coice em quatro apoios com elástico |
|---|---|---|---|---|
| Conferência automática | 0 falha, 2 avisos | 0 falha, 2 avisos | 0 falha, 4 avisos | 0 falha, 4 avisos |
| Vistas (a primeira é a do app) | de frente, de cima | de três quartos, de lado | de três quartos pela frente, de frente, de três quartos por trás | de lado, de três quartos por trás |
| Erros desenhados | os 3 do cartão | 2 de 3 | os 3 do cartão | 2 de 3 |
| Erros não desenhados | — | "Parar longe da falha" (esforço, sem consequência visível) | — | "Chutar com embalo" (só ritmo, sem consequência visível) |
| O elástico | mini-band, 1,1 a 2,3 vezes | mini-band, 1,1 a 2,3 vezes | mini-band, 1,3 a 1,9 vez | elástico longo em laço, 1,3 a 1,6 vez |
| Conferência escrita | `abducao-deitado-mini-band.md` | `extensao-joelho-mini-band.md` | `caminhada-lateral-mini-band.md` | `coice-elastico.md` |
| Risco de o Gustavo não gostar | baixo | médio | médio | médio |

Os avisos de todas incluem o mesmo: o elástico no primeiro quadro do ciclo é o menos esticado, e a regra geral espera o mais esticado ali (é a forma destes exercícios; a abdução com mini-band aprovada tem o mesmo aviso).

## Peças e núcleos novos

- **Quatro apoios** (`exercicios/quatro-apoios.ts`): núcleo genérico (mãos sob os ombros, joelhos sob o quadril, costas retas, no colchonete); o exercício dá a pose da perna que trabalha e o que vai no pé. Serve ao coice com caneleira (lote A4).
- **A mini-band nos tornozelos** (`lacoNasCanelas`, em `pecas-de-cena/mini-band.ts`): as canelas podem ficar longe de paralelas; cada uma é cortada na perpendicular dela.
- **O pé que sai do chão** (a caminhada): o contato `pe.R:noChao`, que vale só enquanto o pé apoia.

## Mudanças em arquivos comuns (todas aditivas)

1. `src/engine/novo/conferir.ts`: o contato terminado em `:noChao` (a caminhada lateral é o primeiro exercício em que nenhum pé fica parado o ciclo inteiro). Os contatos que já existiam são lidos como antes.
2. `src/engine/novo/pecas-de-cena/mini-band.ts` (peça da abdução com mini-band aprovada): a função `lacoNasCanelas` e o campo opcional `parte` no `Laco` (por omissão, `coxa`).
3. `src/engine/novo/exercicios/elastico-faixa.ts` (núcleo dos elásticos aprovados): o campo opcional `aceita` em `OpcoesDoFio` (um filtro dos pontos da pele que o elástico contorna; o coice precisa que o elástico ignore a perna de apoio).

`npm run conferir:animacao`: sem falha nas 100 animações. `preparo.mjs`: só mudaram os quatro arquivos novos e o `registro.ts`; nenhum preparo de animação aprovada mudou.

## Pontos para quem integra

- `npm run check`: lint e tipos limpos; nos testes, só falham os dois esperados de `tests/unit/motor-novo-ponte.test.ts`: "todas as animações estão aprovadas e no catálogo" (as quatro não foram aprovadas) e "os erros de cada animação nova têm os títulos do texto do app" (falta pôr em `SEM_DESENHO` as duas exceções: `coice-elastico` "Chutar com embalo" e `extensao-joelho-mini-band` "Parar longe da falha").
- O `dados/preparo/registro.ts` vai no último commit (é gerado e lista os quatro).
- O colchonete continua com as medidas provisórias da tabela (100 × 50 × 1,5 cm): no coice, as pontas dos pés passam da ponta de trás dele.
