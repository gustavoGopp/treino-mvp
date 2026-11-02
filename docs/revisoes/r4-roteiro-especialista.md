# Roteiro para o especialista: o boneco do guia de treino (R4)

Obrigado por ajudar. Leva uns 30 a 45 minutos. Não precisa saber nada de programação.

## O que é o app
O **treino-mvp** é um app de celular, em português, que monta um programa de musculação com o equipamento que a pessoa
tem e mostra **como fazer cada exercício** com um boneco animado. Durante o treino, a pessoa olha o celular por poucos
segundos, entre uma série e outra, muitas vezes com uma mão só. O boneco precisa ser entendido **rápido e numa tela pequena**.

O guia tem 4 modos: **Técnica** (o movimento, com dicas curtas), **Músculos** (os músculos que trabalham em cor),
**Erros** e **Trajetória**. Nesta rodada só olhamos **Técnica** e **Músculos**.

## O que mudou e o que queremos saber
O boneco antigo era feito de traços (hoje se chama **Clássico**). Em 02/11/2026 o app passou a usar um boneco novo,
o **Boneco**: braços e pernas com espessura, tronco e cabeça cheios, contorno escuro e articulações marcadas, e os
músculos com forma de músculo. O principal aparece em **vermelho** e os secundários em **laranja**. Existe ainda a
**Silhueta**, um corpo liso sem contorno. As três ficam em "Meus dados" → "Estilo do boneco".

Queremos saber se o Boneco **ensina bem e está correto** antes de criar as próximas animações nele. Os exercícios que
motivaram a mudança foram a **puxada unilateral ajoelhado na polia alta**, vista de trás, e o **agachamento goblet**.

## O material
1. **O app**, no celular: https://treino-mvp-sigma.vercel.app/guia/puxada-unilateral (não precisa de cadastro).
   Em cada exercício dá para trocar a vista (de lado, de frente, de trás), o modo (Técnica, Erros, Músculos e
   Trajetória), ver em câmera lenta e pausar. As setas passam para o próximo exercício (32 no total).
2. **Para comparar os estilos:** https://treino-mvp-sigma.vercel.app/dados → "Estilo do boneco" → Boneco, Clássico ou
   Silhueta. Depois volte ao guia.
3. **A lista dos músculos realçados**, com origem e inserção, está no fim deste roteiro.

## O que avaliar (de 1 a 5, e um comentário curto quando quiser)
| | Boneco | Clássico | Silhueta |
|---|---|---|---|
| **Clareza do movimento**: dá para entender o que o corpo faz, em 2 segundos? | | | |
| **Leitura do músculo**: dá para ver qual músculo trabalha? | | | |
| **Correção anatômica**: os músculos estão no lugar certo e com a forma certa (para um desenho simplificado)? | | | |
| **Legibilidade no celular**: funciona no tamanho real, e na miniatura do cartão? | | | |
| **Consistência entre as vistas**: o mesmo boneco de lado, de frente e de trás parece a mesma pessoa? | | | |

## As perguntas
1. O Boneco explica bem o movimento? Melhor ou pior que o Clássico e a Silhueta? Por quê?
2. Em qual dá para ver que músculo trabalha? Algum músculo está no lugar errado, grande ou pequeno demais, ou faltando?
3. Qual é mais agradável de ver?
4. Na vista de trás da puxada, o que ainda confunde? O que você tiraria?
5. O que você mudaria no Boneco antes de criarmos as próximas animações nele?
6. **Só se for da área de anatomia:** os músculos escolhidos fazem sentido para esses dois exercícios? Faltou algum
   importante, ou sobrou algum que só polui?
7. **Só se for da área de design:** cor, espessura do traço, contraste e tamanho estão bons para uma tela de celular
   olhada de relance? E no modo escuro do celular?

## Como devolver
Do jeito mais fácil para você:
- **Uma mensagem ou um documento** com as respostas numeradas (1 a 7) e, se quiser, a tabela de notas. Prints com
  rabiscos são muito bem-vindos.

O Gustavo junta o retorno, e cada mudança pedida é registrada antes de levar o estilo para os outros exercícios.

## Lista dos músculos realçados
**Puxada unilateral** (só o lado que puxa):
- Principal (vermelho): grande dorsal (das vértebras torácicas baixas e lombares, da fáscia toracolombar, da crista
  ilíaca e das últimas costelas até o úmero) e redondo maior (do ângulo inferior da escápula até o úmero).
- Secundários (laranja): trapézio médio e inferior, romboides, deltoide posterior e bíceps.
- De trás o bíceps não aparece (está na frente do braço); de lado, romboides e trapézios ficam escondidos.

**Agachamento goblet** (os dois lados):
- Principal (vermelho): quadríceps.
- Secundários (laranja): glúteos e adutores. De lado os adutores ficam escondidos; de frente, os glúteos.

As fontes e o que é escolha de desenho estão em `docs/pesquisa/animacoes/r4-estilo-do-boneco.md`.

---

### Para o Gustavo: quem chamar
- **Designer gráfico com experiência em ilustração didática** (infográfico, livro didático, app de saúde): enxerga
  melhor a **leitura rápida**, o que chama o olho primeiro, cor, contraste, espessura e se funciona no celular e na
  miniatura. É quem melhor diz "qual dos três estilos" e "o que tirar".
- **Profissional de Educação Física ou de Fisioterapia** (alguém que ensina exercício ou anatomia): enxerga melhor se
  o **músculo está no lugar certo**, se o **movimento está correto** e se os músculos escolhidos fazem sentido. É quem
  melhor diz "está certo" e "falta ou sobra algum músculo".
- Se der para ter só um: para escolher o estilo, o designer; para não ensinar errado, o profissional de Educação
  Física ou Fisioterapia. As perguntas 6 e 7 são as específicas de cada um.
