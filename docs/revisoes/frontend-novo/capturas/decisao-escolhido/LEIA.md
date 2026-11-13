# Decisão em aberto: o escolhido em contorno

Achado I4 da 2ª rodada de revisão (`../../revisao-cadastro-dados-locais.md`): a opção escolhida e a ação principal têm a mesma cara (bloco invertido).

- `hoje-e-proposta-claro.png` e `hoje-e-proposta-escuro.png`: em cima, o app de hoje; embaixo, a proposta. Seis telas em 390 px: rotina, nível, série do treino, equipamento, início e fim do treino.
- `escolhido-em-contorno.patch`: a mudança, só em `src/styles.css` (10 regras). **Não está aplicada no app.** Para aplicar depois do sim do Gustavo: `git apply docs/revisoes/frontend-novo/capturas/decisao-escolhido/escolhido-em-contorno.patch`, e então rodar `npm run conferir:tokens`, `npm run check` e `npm run test:e2e`.

O que a proposta ganha: o botão principal volta a ser o único bloco preto da tela. O que ela perde: o escolhido fica mais discreto onde não há círculo nem caixa marcada (o valor da reserva na série do treino, a aba do dia, a categoria do equipamento, a vista do guia), e isso se lê pior de longe.
