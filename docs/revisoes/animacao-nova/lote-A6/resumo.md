# Lote A6 · Pendurado, paralelas e suspensão: resumo (barra só na descida, mergulho, remada alta na suspensão)

De 18/11/2026. As três primeiras animações destes exercícios (antes, só cartão de texto). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## O que foi feito

| | Mergulho nas paralelas (`mergulho`) | Remada alta na suspensão (`face-pull-suspensao`) | Barra fixa só na descida (`barra-fixa-negativa`) |
|---|---|---|---|
| Conferência automática | 0 falha, 2 avisos (linhas de desenho; de lado o peito quase não aparece) | 0 falha, 2 avisos (linhas de desenho; o ombro de trás aparece pouco: 54 cm² na melhor vista) | 0 falha, 4 avisos (joelho a 149° no fundo da volta; linhas de desenho; trapézio e antebraço como na barra fixa; de três quartos o dorsal quase não aparece) |
| Vistas | de lado e de frente | três quartos de trás e de lado | três quartos pela frente e de trás |
| Base | `pendurado.ts` e as paralelas aprovadas, como estão | `na-fita.ts` como está; o caminho das mãos do face pull com corda | `pendurado.ts`; o caminho da barra fixa de trás para a frente; a caixa de salto (peça nova); a estação da barra fixa numa regulagem mais baixa |
| Erros desenhados | os 3 do cartão: descer demais, balançar, amplitude curta (de lado) | os 3 do cartão: quadril caído (de lado), cotovelos baixos (três quartos), dar impulso (de lado) | os 3 do cartão: soltar o corpo (de trás), pular para chegar ao alto (três quartos), parar no meio (de trás) |
| Erros não desenhados | nenhum | nenhum | nenhum (mas "soltar o corpo" mostra a consequência, o tranco no ombro, e não a queda rápida) |
| Conferência escrita | `mergulho.md` | `face-pull-suspensao.md` | `barra-fixa-negativa.md` |
| Quadros grandes | `../quadros/mergulho.png` | `../quadros/face-pull-suspensao.png` | `../quadros/barra-fixa-negativa.png` |
| Risco de o Gustavo não gostar | baixo | médio | alto |

## Mudanças em arquivos comuns (só aditivas)

- `pecas-de-cena/barra-fixa.ts`: `estacaoDeBarra` ganhou o parâmetro opcional `altura` (por omissão, a da tabela, 228,6 cm). A barra só na descida usa 221,6 cm, uma regulagem abaixo (a torre da ProsourceFit sobe em degraus de 2 ¾ pol): na mais alta, de pé na caixa de 76 cm, a perna não alcançava o tampo com o queixo acima da barra (faltavam 3,4 cm). A chave de desenho só muda quando a altura não é a da tabela; o preparo da barra fixa, da supinada e da elevação de joelhos na barra não mudou.
- Peça e objeto novos: `pecas-de-cena/caixa-de-salto.ts` e `dados/objetos/caixa-de-salto.json` (Rogue Flat Pack Games Box, 30 × 24 × 20 pol, lida na página do fabricante; a espessura do compensado e as alças só de um comentário de cliente, `provisoria` e `desenho`).
- Regras novas: `regras/mergulho.ts`, `regras/face-pull-suspensao.ts`, `regras/barra-fixa-negativa.ts` (ids com o nome da família).
- Uma linha por arquivo em `exercicios/registro.ts`, `regras/registro.ts` e `dados/objetos/registro.ts`; o `dados/preparo/registro.ts` é o gerado pelo `preparo.mjs`.
- Conferido: `npm run conferir:animacao` sem falha em todas as 125 animações, e o preparo confere; o `preparo.mjs` só gravou os três arquivos novos e o registro.

## Pontos para quem integra

- `npm run check`: lint e tipos passam; falha só o teste esperado da ponte ("todas as animações estão aprovadas e no catálogo do guia"). Os títulos dos erros batem com o app nos três (nenhum vai para `SEM_DESENHO`).
- O que olhar primeiro: a **barra só na descida**. A volta pela caixa (os pés vão à caixa, as pernas empurram o corpo ao alto, o calcanhar sobe um pouco no fim) é movimento inventado pelo desenho a partir de uma frase do cartão ("suba de novo pelo apoio"), começa num agachamento fundo pendurado na barra e é a pose menos natural do lote; o ritmo da volta fica em 14,9% do pico (o limite é 15%); a ponta do pé amassa até 1 cm no tampo quando o calcanhar sobe. A regra automática da ficha só olha a descida; a volta foi medida à parte (ver a conferência escrita).
- No **face pull na suspensão**, a primeira vista é a de três quartos por trás: de lado, no fim, o pegador fica desenhado por cima da orelha.
