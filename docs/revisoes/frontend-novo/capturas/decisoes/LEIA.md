# As três decisões que os revisores deixaram para o Gustavo

Cada folha traz o app de hoje em cima e a proposta embaixo, em 390 px. As propostas **não estão aplicadas no app**: cada uma está guardada num arquivo de alteração (`.patch`), para aplicar só depois do sim. Os achados estão em `../../qa.md`, seção 6.2.

| # | Decisão | Folha | Alteração guardada | O que muda |
|---|---|---|---|---|
| 1 | O selo "consenso" em frases que não são regra de treino (achados I6 e 24) | `1-selo-claro.png` | `1-selo-fonte.patch` | Nas regras de privacidade, de onde os dados ficam, de locais e de registro (`privacidade.*`, `dados.*`, `local.*`, `registro.*`), a palavra do selo passa a ser "fonte". A folha que abre é a mesma, com o nível e as fontes. As regras de treino e de segurança continuam mostrando o nível. |
| 2 | A ação principal do fim do treino (achado 16) | `2-fim-do-treino.png` (3 opções, em 390 claro e 320 escuro; refeita em 13/11/2026, depois dos textos enxutos) | `2-fim-voltar-ao-inicio.patch` (opção 2) e `2-fim-ver-a-semana-presa.patch` (opção 3) | "Voltar ao início" vira a ação principal, presa embaixo; "Ver a sua semana" vira secundária, no lugar em que está hoje. |
| 3 | O fundo cinza dos botões secundários, fraco sob luz forte (achado 13) | `3-botoes-cinza-claro.png`, `3-botoes-cinza-escuro.png` | `3-contorno-nos-botoes-cinza.patch` | Tudo que se toca e tem fundo cinza ganha um contorno de 1 px na cor da borda (4,2:1 contra o fundo). |

Para aplicar uma delas: `git apply docs/revisoes/frontend-novo/capturas/decisoes/<arquivo>.patch`, e então `npm run conferir:tokens`, `npm run check` e `npm run test:e2e`.

## Andamento

- **Decisão 1 (selo "fonte"): aplicada em 13/11/2026**, a pedido do Gustavo (opção 1 de 3). O arquivo `1-selo-fonte.patch` fica só como registro: não aplicar de novo.
- **Decisão 2 (fim do treino): aplicada em 13/11/2026**, opção 2 de 3 ("Voltar ao início" presa embaixo). Os dois arquivos `2-*.patch` ficam só como registro.
- Decisão 3 (contorno nos botões cinza): aberta.
