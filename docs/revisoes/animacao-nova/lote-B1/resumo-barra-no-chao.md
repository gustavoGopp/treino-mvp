# Lote B1 · Resumo: as três animações com a barra longa (terra romeno, remada curvada, hip thrust)

De 18/11/2026. Três exercícios que eram cartão de texto ganharam animação no motor novo, todos com a barra longa com anilhas já mostrada ao Gustavo (`pecas-de-cena/barra-longa.ts`, sem mudança). **Nenhum está aprovado nem ligado às telas**: quem integra registra em `aprovados.ts` e no catálogo do guia (o teste da ponte "todas as animações estão aprovadas e no catálogo" falha na cópia de trabalho até lá, como esperado).

| Exercício | Conferência automática | Vistas (a primeira abre) | Erros desenhados | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `terra-romeno-barra` | 0 falha, 2 avisos (linhas de desenho; Músculos abre de três quartos, de trás) | de lado; três quartos, de trás | os 3 do cartão | médio: anilhas de 5 kg (ver abaixo) e, de lado, a anilha ainda cobre a mão |
| `remada-barra` | 0 falha, 2 avisos (linhas de desenho; Músculos abre de três quartos, de trás) | de lado; três quartos, de trás | os 3 do cartão | médio: anilhas de 5 kg; de lado a anilha cobre a mão e a barra cobre a coxa no fim |
| `hip-thrust` | 0 falha, 2 avisos (linhas de desenho; Músculos abre de lado) | de lado; três quartos, de frente | os 4 do cartão | médio a alto: banco desenhado atrás do corpo de lado, "quadril perto do chão" em 12 cm, o erro "Banco desliza" sem o lugar de antes do banco |

Conferências escritas: `terra-romeno-barra.md`, `remada-barra.md`, `hip-thrust.md` (nesta pasta). Quadros grandes: `../quadros/<id>.png`.

## A decisão que vale para os três: anilhas de 5 kg (24 cm)

Comecei com a anilha de 20 kg (45 cm), a do exemplo da folha da barra. De lado (a vista que mostra o quadril indo para trás, a puxada e o quadril subindo), a anilha de perto fica entre quem olha e o corpo e cobria justamente o que cada exercício ensina: as mãos e as pernas no terra romeno ("barra rente às pernas"), o braço e a barriga na remada ("barra na barriga"), o quadril e o glúteo no hip thrust. Nas vistas de três quartos, a barra de 2,2 m atravessada alarga o quadro e o corpo fica pequeno (60% da altura, contra 85% no stiff aprovado) quando há rótulos. Com a anilha de 5 kg (24 cm), as três se leem de lado. A barra fica com 30 kg, que entram no equilíbrio; é carga de quem está aprendendo (o cartão do terra romeno pede começar com a barra vazia). **Se o Gustavo quiser a anilha grande, a vista padrão dos três tem de mudar.** O número está na ficha de cada um (`anilhas`, selo `desenho`): trocar é uma linha.

## Mudanças em arquivo comum

Nenhuma mudança em arquivo comum: só arquivos novos e uma linha em cada registro (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`). O núcleo dos stiffs (`dobrar-o-quadril.ts`) e `ponte.ts` são só importados (funções que já eram exportadas). O preparo das animações aprovadas não mudou (o `preparo.mjs` só gravou os três arquivos novos e o `registro.ts` gerado).

Arquivos novos comuns aos três: `exercicios/com-barra-longa.ts` (a pele desenhada amostrada com densidade, para medir a folga de uma barra fina), `regras/barra-longa.ts` (as regras da família), `pecas-de-cena/banco-atravessado.ts` (o banco reto da tabela girado, para o hip thrust) e `dados/objetos/almofada-da-barra.json` (a almofada, com as medidas da ficha pública da Rogue AbMat Barbell Pad).

## Erros não desenhados

Nenhum: os dez erros dos três cartões têm consequência visível e estão desenhados. O "Banco desliza" (só "falha de montagem" no cartão) virou o banco deslizando 18 cm para trás com o corpo indo junto e os joelhos abrindo; a distância é escolha de desenho.

## Pedidos ao conteúdo

- A ficha da técnica do hip thrust propõe os posteriores como secundário; a biblioteca (`src/domain/biblioteca/exercicios.json`) conta só o glúteo. A animação segue a biblioteca (só glúteo, principal).
