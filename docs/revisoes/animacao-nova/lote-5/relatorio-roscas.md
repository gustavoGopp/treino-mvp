# Lote 5 · Relatório das roscas

Ramo: `worktree-agent-a33336ceb3c36b7f8` (a partir de `539dc0b`). Entreguei 3 das 4: **alternada, martelo e kettlebell**. **A inclinada ficou de fora**: não consegui uma pose sem defeito visível (motivo abaixo). O rascunho dela está guardado no ramo local `lote5-rascunho-rosca-inclinada` (commit `b512878`, fora do ramo de entrega, para não ser integrado sem querer).

Núcleo comum novo: `src/engine/novo/exercicios/dobrar-o-cotovelo.ts` (o úmero parado no tórax, o antebraço dobra como dobradiça, a pegada sai do polegar, o halter atravessa a palma, o kettlebell gira em volta da alça; o corpo em pé sai do equilíbrio pelo `dobrarOQuadril` dos stiffs e fica parado). Regras novas, com nome próprio da família: `src/engine/novo/regras/roscas.ts`. Nas alternadas, o braço direito sobe com u de 0 a 1 e o esquerdo com u de 2 a 3 (u = 0 e u = 2 são a mesma pose): as fases da ficha de movimento ficam iguais às do app.

## rosca-alternada
- **Conferência automática:** 0 falha, 3 avisos (linhas de desenho: joelho, abertura do braço, supinação, peso do halter; antebraço em "só ajuda", correção de 04/11; a vista de lado não serve ao modo Músculos, que fica de frente: 192 cm² contra 53).
- **O que não ficou bom:** os braços ficam abertos 17° e a palma a 64° da neutra (não 90°). Com o halter de 33 cm da tabela e a palma para a frente, a cabeça de dentro entra 3 a 4 cm na coxa com o braço colado; testei abertura 8–17°, braço à frente 0–12°, cotovelo embaixo 6–15° e supinação 50–75°, e só essa combinação não atravessa a coxa em nenhum quadro. De frente, embaixo, os halteres ficam bem do lado de fora das coxas (`quadros/rosca-alternada.png`, "frontal:tec:f0"), e o texto do app diz "cotovelos encostados".
- **Risco de o Gustavo não gostar: médio**, pela abertura dos braços de frente; de lado não aparece.

## rosca-martelo
- **Conferência automática:** 0 falha, 3 avisos (linhas de desenho: abertura do braço e peso do halter; antebraço "só ajuda"; vista de lado não serve ao modo Músculos).
- **O que não ficou bom:** de frente, a cabeça do halter cobre a mão embaixo e em parte no topo (`quadros/rosca-martelo.png`, "frontal:tec:f0"): é a geometria (a cabeça da frente fica entre a mão e quem olha), a mesma limitação registrada em 04/11. O topo vai a 130° (a cabeça de trás encostaria no braço a partir de ~135°). Troquei o rótulo "polegar para cima" da animação de hoje por "sobe sem girar a mão" (do app), porque embaixo o polegar aponta para a frente.
- **Risco: baixo.** Braço quase colado (6°), pegada neutra medida em 0° o ciclo todo.

## rosca-kettlebell
- **Conferência automática:** 0 falha, 2 avisos (linhas de desenho: abertura do braço, folga da bola no antebraço, cotovelo da mão livre; antebraço "só ajuda").
- **O que não ficou bom:** de frente, no topo, a bola cobre parte do braço (o bíceps aparece com 96 cm², metade das roscas com halter); de lado, no topo, o punho fica acima da alça (a mão fecha na barra e os dedos seguem o antebraço) (`quadros/rosca-kettlebell.png`, "lateral:tec:f1").
- **Risco: baixo a médio**, pelo punho acima da alça no topo. A bola pende no ponto mais baixo que o giro em volta da alça deixa (1,7° no máximo) e chega a 2,1 cm do antebraço no topo; o braço fica a 6°.

## rosca-inclinada (não entregue)
- **O que fiz:** a peça de cena do banco regulável (`pecas-de-cena/banco-inclinado.ts`, no desenho do banco reto, com as medidas de `bancoRegulavel`), o corpo sentado que se apoia sozinho (quadril no canto do banco, costas, nádega e nuca no estofado, com o pescoço no máximo 15° para trás) e três regras (braço na vertical, costas e cabeça no encosto, halter fora do banco).
- **Por que não entreguei:** com o braço na vertical e a palma para a frente, o antebraço sobe ao lado do quadril e da cintura (o cotovelo pende na altura do quadril), e a cabeça de dentro do halter de 33 cm atravessa o quadril, a coxa ou a cintura no meio e no topo da subida: −4,6 cm com o encosto a 60°, braço aberto 20° e supinação 60°; −6,6 cm com o encosto a 45°. Testei encosto 45–60°, abertura 10–40°, supinação 0–75°, topo 90–145° e os pés mais juntos. Só não atravessa com o braço aberto 30–40° e a palma a 45–50° (braços em "V" de frente, palma mais para dentro: contradiz "braços pendurados na vertical" e "palmas para a frente" e falha a regra da palma), ou com a pegada quase neutra (25°). Nenhuma das duas está no padrão. Caminhos possíveis, para decidir com o Gustavo: um halter mais curto na tabela (com fonte), ou aceitar na ficha a palma girando de neutra embaixo para supinada em cima.
- **Risco, se fosse entregue como está no rascunho: alto.**

## Arquivos comuns que mexi
Nenhum além das linhas nos registros: `exercicios/registro.ts` (3 linhas) e `regras/registro.ts` (1 linha). O núcleo dos stiffs (`dobrar-o-quadril.ts`) foi só importado, sem mudança. Não regenerei nem incluí os arquivos gerais (`npm run conferir:animacao` rodou sem falha nas 42 animações e eu desfiz `conferencia.*`). `npm run check` passou (57 arquivos, 896 testes).

## Medidas provisórias (selo `desenho`)
- Alternada: joelho 5°, braço aberto 17°, supinação 64°, halter 11,3 kg; erros (balanço 12° + 6° de lombar, cotovelo 35° à frente, curta 55°).
- Martelo: braço aberto 6°, halter 11,3 kg; os mesmos erros.
- Kettlebell: braço aberto 6°, folga da bola no antebraço 1 cm, cotovelo da mão livre 8°; a massa do kettlebell (12 kg) já era `desenho` na tabela.
- Inclinada (rascunho): o comprimento do assento do banco regulável (34 cm) continua `provisoria` na tabela.

## Commits (ramo `worktree-agent-a33336ceb3c36b7f8`)
- `98d00fe` Lote 5: rosca alternada com halteres
- `e995670` Lote 5: rosca martelo com halteres
- `72bc0f2` Lote 5: rosca com kettlebell
- o último commit traz este relatório (o hash está na resposta)
- Fora da entrega: `b512878` no ramo `lote5-rascunho-rosca-inclinada` (rascunho da inclinada, não integrar).
