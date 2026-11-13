# Decisão tomada em 13/11/2026: o escolhido em contorno, só no cadastro e no equipamento

Achado I4 da 2ª rodada de revisão (`../../revisao-cadastro-dados-locais.md`): a opção escolhida e a ação principal têm a mesma cara (bloco invertido).

- `hoje-e-proposta-claro.png` e `hoje-e-proposta-escuro.png`: em cima, o app de hoje; embaixo, a proposta. Seis telas em 390 px: rotina, nível, série do treino, equipamento, início e fim do treino.
- `escolhido-em-contorno.patch`: a mudança, só em `src/styles.css` (10 regras). **Não está aplicada no app.** Para aplicar depois do sim do Gustavo: `git apply docs/revisoes/frontend-novo/capturas/decisao-escolhido/escolhido-em-contorno.patch`, e então rodar `npm run conferir:tokens`, `npm run check` e `npm run test:e2e`.

O que a proposta ganha: o botão principal volta a ser o único bloco preto da tela. O que ela perde: o escolhido fica mais discreto onde não há círculo nem caixa marcada (o valor da reserva na série do treino, a aba do dia, a categoria do equipamento, a vista do guia), e isso se lê pior de longe.

## O que o Gustavo decidiu

Das três opções (contorno só no cadastro e no equipamento; contorno em tudo; deixar como estava), ficou a 1ª. Está aplicada em `src/styles.css`:

- **Contorno:** as opções com círculo ou caixa marcada (`.opcao`), o lugar pronto (`.lugar-linha`), os cartões de item (`.item-eq`), as categorias do equipamento, os valores da folha de um item e o "tenho / não tenho" da foto.
- **Continua bloco invertido:** o valor da reserva e da nota de dor no treino, as abas do dia no início, "Hoje foi", a vista e o "Lento" do guia; e, em 320 px, as opções em linha, que ali não têm o círculo.

O arquivo `escolhido-em-contorno.patch` é a opção 2 (contorno em tudo) e fica só como registro: **não aplicar por cima** do que está no app.
