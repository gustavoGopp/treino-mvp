# Lote A4 · Deitado de lado e caneleiras: resumo (elevação lateral deitado, elevação lateral com caneleira, coice com caneleira)

De 17/11/2026. As três primeiras animações destes exercícios (antes, só cartão de texto). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## O que foi feito

| | Elevação lateral deitado (`elevacao-lateral-deitado`) | Elevação lateral com caneleira (`elevacao-lateral-caneleira`) | Coice com caneleira (`coice-caneleira`) |
|---|---|---|---|
| Conferência automática | 0 falha, 2 avisos (linhas de desenho; a frente do ombro "só ajuda") | 0 falha, 3 avisos (linhas de desenho; a frente do ombro "só ajuda"; de cima o principal quase não aparece, como na elevação com halteres) | 0 falha, 3 avisos (pé de apoio e punho em quatro apoios, como no coice com elástico; linhas de desenho) |
| Vistas | de frente e de cima | de frente e de cima | de lado e de três quartos pela frente |
| Base | o corpo deitado da abdução aprovada (`quadril-deitado-de-lado.ts`) e o braço das elevações (`noPlano`) | o núcleo das elevações (`elevar-o-braco.ts`), com um modo novo `'caneleira'` | o núcleo de quatro apoios (`quatro-apoios.ts`), como está |
| Erros desenhados | os 3 do cartão: rolar o corpo (três quartos), jogar o halter (de frente), dobrar demais o cotovelo (de frente) | 2 de 3: encolher os ombros (de frente), balançar o corpo (de lado) | 2 de 3: arquear a lombar no fim (de lado), girar o quadril (de trás) |
| Erros não desenhados | nenhum | "Parar longe da falha" (esforço, sem consequência visível) | "Parar longe da falha" (idem) |
| Conferência escrita | `elevacao-lateral-deitado.md` | `elevacao-lateral-caneleira.md` | `coice-caneleira.md` |
| Quadros grandes | `../quadros/elevacao-lateral-deitado.png` | `../quadros/elevacao-lateral-caneleira.png` | `../quadros/coice-caneleira.png` |
| Risco de o Gustavo não gostar | médio | baixo | baixo |

## Mudanças em arquivos comuns (só aditivas)

- `exercicios/elevar-o-braco.ts`: o modo `'caneleira'` em `MaosDaElevacao` (mão relaxada, a carga no centro da caneleira, a caneleira na folga e no desenho). Os modos que já existiam seguem iguais.
- `pecas-de-cena/caneleira.ts`: a função nova `caneleiraNoAntebraco` (a mesma faixa em volta do antebraço, logo acima do punho). O desenho da faixa e `caneleiraNaPerna` não mudaram.
- Uma linha em `exercicios/registro.ts` por exercício e uma em `regras/registro.ts` por arquivo de regras novo (`regras/elevacao-lateral-deitado.ts`, `regras/elevacao-lateral-caneleira.ts`). O `dados/preparo/registro.ts` é o gerado pelo `preparo.mjs`.
- Conferido: `npm run conferir:animacao` sem falha em todas as animações; o `preparo.mjs` só gravou os três arquivos novos e o registro (o preparo das aprovadas não mudou, inclusive o do coice com elástico e o das elevações e caneleiras).

## Pontos para quem integra

- `npm run check`: lint e tipos passam; falham só os dois testes esperados da ponte (`tests/unit/motor-novo-ponte.test.ts`): "todas as animações estão aprovadas e no catálogo" (as três não estão) e "os erros têm os títulos do app" para `elevacao-lateral-caneleira` e `coice-caneleira`, que esperam `'Parar longe da falha'` na lista `SEM_DESENHO`.
- Não há folha (não há animação de hoje para comparar).
- O que olhar primeiro: a elevação deitado de lado **de frente**, onde os joelhos dobrados se leem como pernas estendidas (ver a conferência escrita); e o coice com caneleira, que ficou com a segunda vista diferente da do coice com elástico (três quartos pela frente, e não por trás), pelo motivo dito na conferência escrita.
