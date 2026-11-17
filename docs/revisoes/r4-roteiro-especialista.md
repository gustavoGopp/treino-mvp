# Roteiro para o especialista: o corpo novo do boneco do guia de treino

> Atualizado em 14/11/2026 para o corpo novo da animação nova (`docs/revisoes/animacao-nova/`). A versão de 02/11/2026, que comparava o Boneco de hoje com o Clássico e a Silhueta, está no histórico do git.

Obrigado por ajudar. Leva uns 40 a 60 minutos. Não precisa saber nada de programação.

## O que é o app
O **treino-mvp** é um app de celular, em português, que monta um programa de musculação com o equipamento que a pessoa
tem e mostra **como fazer cada exercício** com um boneco animado. Durante o treino, a pessoa olha o celular por poucos
segundos, entre uma série e outra, muitas vezes com uma mão só. O boneco precisa ser entendido **rápido e numa tela pequena**.

O guia tem 4 modos: **Técnica** (o movimento, com dicas curtas ao lado do corpo), **Músculos** (os músculos que
trabalham em cor), **Erros** (a parte do corpo que erra em vermelho, com o movimento certo tracejado atrás) e
**Trajetória**.

## O que mudou e o que queremos saber
Estamos refazendo todas as animações com um **corpo novo**, de proporções reais (um homem de 175,8 cm, com as medidas
do levantamento ANSUR II), desenhado por cálculo a partir de tabelas de medidas. Há dois desenhos do mesmo corpo: o
**cinza**, com as linhas dos grupos musculares (o padrão), e o **cor de pele**, de short e tênis. O músculo principal
aparece em **vermelho**, o secundário em **laranja** (no cor de pele, num tom claro do vermelho) e o que só ajuda a
firmar aparece **listrado**.

Quatro animações estão prontas e servem de prova: **agachamento goblet com calcanhar elevado**, **supino reto com
halteres**, **puxada unilateral ajoelhado na polia alta** e **flexão de braço**. As outras 86 serão feitas com o mesmo
corpo. Por isso queremos saber **agora** se o corpo, os músculos e o movimento estão corretos: mudar o corpo depois
obriga a refazer tudo.

## O material
Nada disto está no app ainda. O material fica em `docs/revisoes/animacao-nova/`:

1. **As animações**, numa página que abre sozinha no navegador, sem internet: `prototipos/index.html`. Dá para trocar
   o exercício, a vista, o modo, o erro, o desenho (cinza ou cor de pele) e o tema (claro ou escuro).
2. **Os quadros em tamanho grande**, três imagens por exercício: `revisao-independente/quadros/<exercício>-tecnica.png`,
   `-musculos.png` e `-erros.png`.
3. **As folhas que comparam com o guia de hoje** ("hoje" em cima, "novo" embaixo): `prototipos/folha-goblet.png`,
   `folha-supino-reto.png`, `folha-puxada-unilateral.png`, `folha-flexao.png` e `erros.png`.
4. **O corpo parado**, de frente, de lado e de costas: `../boneco-desenho/final/prancha-cinza.png` e `prancha-pele.png`.
5. **As tabelas**, para quem quiser conferir número: `tabelas.md` (medidas do corpo, amplitudes das articulações,
   origem e inserção de cada músculo desenhado, medidas dos objetos e a ficha de cada movimento) e
   `prototipos/conferencia.md` (os ângulos medidos em cada animação, contra a amplitude normal).

## O que avaliar (de 1 a 5, e um comentário curto quando quiser)
| | Cinza | Cor de pele |
|---|---|---|
| **Clareza do movimento**: dá para entender o que o corpo faz, em 2 segundos? | | |
| **Técnica correta**: posição inicial, final, amplitude, pegada, pés e ritmo estão como você ensinaria? | | |
| **Leitura do músculo**: dá para ver qual músculo trabalha? | | |
| **Correção anatômica**: proporções, articulações e músculos estão no lugar certo e com a forma certa (para um desenho simplificado)? | | |
| **Legibilidade no celular**: funciona no tamanho real, e na miniatura do cartão? | | |
| **Consistência entre as vistas**: de lado, de frente, de trás e de cima parece a mesma pessoa? | | |

## As perguntas
1. O corpo novo explica bem o movimento? Melhor ou pior que o boneco de hoje (as imagens "hoje" das folhas)? Por quê?
2. Alguma articulação dobra para onde não dobra, ou além do que dobra? O ombro, a escápula, o punho e a coluna se
   comportam como num corpo de verdade nos quatro exercícios?
3. Algum músculo está no lugar errado, grande ou pequeno demais, ou preso ao osso errado? Pontos que nós mesmos
   medimos e queremos a sua opinião: a ponta de baixo do trapézio fica 4,9 cm acima da 12ª vértebra torácica; o reto
   abdominal termina na linha da cintura, acima do púbis; o peitoral termina na altura do mamilo.
4. O desenho tem **um deltoide só, um peitoral só e um trapézio só**, e não tem romboides, redondo maior nem eretores
   da espinha. Quais dessas porções fazem falta para ensinar puxadas, remadas, desenvolvimentos e elevações? Quais
   podem ficar como um grupo só?
5. **A técnica**, exercício por exercício: o que você corrigiria? Olhe em especial a pegada do halter no goblet (mãos
   em concha por baixo da cabeça de cima), a largura das mãos e os cotovelos na flexão, o caminho do halter no supino
   e o alongamento em cima na puxada.
6. **Os erros**: cada erro desenhado acontece de verdade, na forma em que acontece? Dá para ler de relance? Falta
   algum erro mais comum?
7. **Os rótulos de técnica** (as dicas escritas ao lado do corpo) dizem a coisa certa e são as mais úteis para um
   iniciante?
8. **O equipamento** (halter, anilha sob o calcanhar, banco, coluna de polia, puxador) parece com o que se encontra
   na academia? As medidas e a posição em relação ao corpo estão plausíveis?
9. **Só se for da área de design:** cor, espessura do traço, contraste e tamanho estão bons para uma tela de celular
   olhada de relance? E no tema escuro? O secundário em laranja (cinza) e em tom claro (cor de pele) se distingue do
   principal sem depender só da cor?
10. O que você mudaria no corpo **antes** de fazermos as outras 86 animações com ele?

## Como devolver
Do jeito mais fácil para você:
- **Uma mensagem ou um documento** com as respostas numeradas (1 a 10) e, se quiser, a tabela de notas. Prints com
  rabiscos são muito bem-vindos.

O Gustavo junta o retorno, e cada mudança pedida é registrada antes de o corpo ser dado como fechado.

## Lista dos músculos realçados
- **Agachamento goblet** (os dois lados): principal, quadríceps; secundários, glúteos e adutores. De lado os adutores
  ficam escondidos; de frente, os glúteos.
- **Supino reto com halteres:** principal, peitoral maior; secundários, deltoide (a parte da frente) e tríceps.
- **Puxada unilateral** (só o lado que puxa): principal, grande dorsal; secundários, trapézio, deltoide (a parte de
  trás) e bíceps. De trás o bíceps não aparece; de lado, o trapézio fica escondido.
- **Flexão de braço:** principal, peitoral maior; secundários, deltoide (a parte da frente) e tríceps; só ajuda a
  firmar, o reto abdominal.

A origem, a inserção e a fonte de cada grupo estão em `docs/revisoes/animacao-nova/tabelas.md`, na seção dos músculos.

---

### Para o Gustavo: quem chamar
- **Profissional de Educação Física ou de Fisioterapia** (alguém que ensina exercício ou anatomia): enxerga melhor se
  o **movimento está correto**, se o **músculo está no lugar certo** e se os músculos escolhidos fazem sentido. É quem
  melhor responde as perguntas 2 a 8. Para fechar o corpo, é a pessoa mais importante.
- **Designer gráfico com experiência em ilustração didática** (infográfico, livro didático, app de saúde): enxerga
  melhor a **leitura rápida**, o que chama o olho primeiro, cor, contraste, espessura e se funciona no celular e na
  miniatura. É quem melhor responde as perguntas 1 e 9.
- Uma primeira rodada já foi feita por dois revisores automáticos independentes (um no papel de anatomista e outro no
  de treinador), só com as imagens e as tabelas: os pareceres estão em
  `docs/revisoes/animacao-nova/revisao-independente/`. Eles ajudam a achar erro, mas **não substituem** uma pessoa da
  área.
