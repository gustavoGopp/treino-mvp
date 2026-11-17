## 2. Princípios obrigatórios (valem como regra do motor novo)

**A. Tudo tem medida real, declarada em tabela, com fonte**

- **Uma tabela do corpo** (em cm e em graus), em arquivo de dados validado com zod: o comprimento e a espessura de cada segmento, a posição de cada articulação, a amplitude permitida de cada movimento articular. Cada linha com a fonte. O código do desenho lê a tabela; nenhum número do corpo fica solto no código.
- **Uma tabela dos músculos:** para cada músculo desenhado, a origem e a inserção como pontos presos aos ossos, a camada (qual passa por cima de qual) e a regra de forma (como engrossa ao encurtar). Com a fonte.
- **Uma tabela dos objetos:** as medidas reais de cada peça (o comprimento da barra, o diâmetro da anilha, a altura do banco, a largura da pegada, o curso da polia). Com a fonte. O mesmo objeto tem a mesma medida na cena e no desenho do cartão de equipamento.
- **Uma ficha do movimento por exercício:** os ângulos de cada articulação na posição inicial e na final, a trajetória do objeto, o tempo de cada fase, os pontos de contato (o que fica preso no chão, no banco, na barra). Cada linha vem da ficha da técnica, com o selo.
- **Um corpo só, coerente em todas as vistas.** De lado, de frente, de trás e de cima é a mesma pessoa, com as mesmas medidas. Mais de um corpo (por exemplo um feminino e um masculino) é decisão do Gustavo, e cada um tem a sua tabela.
- **Conferência automática:** `npm run conferir:animacao` percorre todos os quadros de todas as animações e falha quando: uma proporção sai da tabela; um ângulo passa da amplitude; um pé ou uma mão que deveria estar preso desliza; um objeto atravessa o corpo ou "voa"; um cabo, um elástico ou uma fita muda de comprimento sem motivo; a velocidade dá um salto; a esquerda e a direita divergem num exercício simétrico; o músculo realçado não é o do conteúdo; uma medida de objeto diverge da tabela. O relatório sai por exercício, em cm e graus. Rode ao fim de cada animação.

**B. Vinte cuidados para a animação não parecer improvisada**

1. O movimento nasce nas articulações certas, na ordem certa (a escápula acompanha o braço; a pelve acompanha a lombar; o joelho segue a ponta do pé).
2. Nenhuma articulação dobra para onde não dobra, nem além do que dobra.
3. O ritmo é o do exercício: a descida controlada e a subida mais rápida onde a ficha pede, com aceleração e desaceleração, sem movimento de robô nem de mola.
4. O peso aparece: o corpo se equilibra sobre os pés, o halter pende na vertical, o cabo fica reto e esticado, o elástico afina ao esticar.
5. Os contatos são firmes: a mão fecha em volta da barra com o polegar no lugar, o pé fica inteiro no chão, as costas encostam no banco onde devem encostar.
6. A mão e o pé são desenhados de verdade (dedos, polegar, calcanhar), na medida em que a pegada e o apoio fazem parte da técnica.
7. A cabeça e o olhar seguem a técnica (o pescoço neutro, sem cabeça solta).
8. O músculo está no lugar certo, com a forma certa, preso aos ossos certos, e muda de forma com o movimento.
9. Principal, secundário e "só ajuda" se distinguem sem depender só da cor (daltonismo), e a legenda diz o mesmo que o conteúdo.
10. A vista padrão de cada modo é a que mostra melhor o que aquele modo ensina, escolhida por medida (quanto do movimento e do músculo fica visível), não por hábito.
11. Nada importante fica escondido atrás do próprio corpo ou do aparelho; quando não há como, uma segunda vista ou um corte resolve.
12. O objeto é reconhecível por quem nunca o viu, na cena e no cartão, e não se confunde com o vizinho (supino × desenvolvimento, extensora × flexora, smith × rack).
13. O objeto funciona: a polia gira para o lado certo, a pilha de pesos sobe quando o cabo é puxado, o banco inclina no eixo real, a barra entra no suporte.
14. O erro aparece como erro de verdade, medido contra o certo, no instante em que a diferença é maior; erro de ritmo é mostrado em movimento.
15. Rótulos e setas ficam fora do corpo, não se sobrepõem e somem quando não ajudam.
16. Um traço só: a mesma espessura de linha, o mesmo nível de detalhe e a mesma luz no corpo, nos músculos e nos objetos, em todas as animações.
17. Legível no tamanho da miniatura, a 320 px e sob a luz forte da academia, nos temas claro e escuro, com contraste conferido.
18. O quadro parado também ensina: com `prefers-reduced-motion`, os quadros-chave bastam para entender o exercício.
19. O ciclo fecha sem tranco: o último quadro emenda no primeiro.
20. Cada detalhe é conferido a olho na folha em tamanho grande, por você e por um revisor independente, além da conferência automática.

