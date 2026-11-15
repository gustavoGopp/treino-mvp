# Estado da sessão da animação nova (15/11/2026, fechamento do corpo)

Ramo: `claude/friendly-goldberg-hwf6dl` (traz o ramo `claude/loving-hamilton-c4ji83` da etapa 1 e a `main`). Nada foi para a `main` e nada mudou no app: o motor novo vive em `src/engine/novo/`, que nenhuma tela importa.

Comece por **`proposta.md`, seção 0-B**: o que esta sessão fez, o que a conferência achou, as medidas e o que não ficou bom. O prompt que abriu a sessão está em `prompt-continuacao.md`.

## Onde a sessão parou

**Parada obrigatória da seção 5 do prompt: o corpo só é dado como fechado com o ok do Gustavo.** Nenhum lote começou.

**A revisão independente mudou a recomendação: o corpo ainda não está pronto para fechar.** O esqueleto e as medidas passaram; o desenho dos músculos (porções do deltoide e do trapézio, quatro formas presas no lugar errado), a escápula, o fim da puxada e dois erros precisam de uma rodada de correção. A lista, com o que proponho em cada item, está na `proposta.md`, seção 0-B, "A revisão independente".

**A rodada de correção foi feita em 15/11, com o ok do Gustavo** (proposta, seção 0-B, "A rodada de correção"). Feito: as porções do deltoide e do trapézio, quatro formas de músculo redesenhadas, a vista do modo Músculos por medida, o fim da puxada (152°), o erro da lombar, a seta do ombro, os nomes da Trajetória e três medidas internas. **Não feito: a escápula no contorno.** Falta o ok dele no lado a lado dos músculos (`parada-do-corpo/6-musculos-antes-e-depois.png`) e na vista de três quartos da puxada (`7-puxada-de-tras-e-tres-quartos.png`).

**Já decidido pelo Gustavo em 15/11:** a pegada do goblet em concha fica; o corpo subiu no banco do supino (a cabeça estava baixa demais). As outras decisões estão na lista abaixo e devem ser levadas uma por vez, com imagem.

## O que esta sessão fez (14 e 15/11)

1. Juntou o ramo da etapa 1 e a `main`; `npm run check` passando.
2. Acertos de desenho: a faixa escura do pescoço visto de cima (era defeito de pintura), a mão espalmada vista pelo dorso, a sombra do banco de cima, os rótulos de técnica fora do corpo, o nome do erro com letra de tamanho fixo, a pegada do goblet em concha por baixo do halter.
3. Tabela dos músculos (origem, inserção, camada, fonte) e a conferência do desenho contra ela, inclusive se o músculo realçado é o do conteúdo.
4. Fonte para 13 das 29 medidas provisórias (ficam 7 do corpo e 9 dos objetos).
5. Medida de peso do pacote, com e sem os textos de fonte e com o exercício carregado à parte.
6. Roteiro do especialista reescrito para o corpo novo; pedidos ao conteúdo anotados.
7. Revisão independente por dois revisores automáticos (anatomista e treinador): `revisao-independente/`.

## Decisões abertas (nenhuma respondida ainda)

Da etapa 1 (proposta, seção 9), continuam todas. As desta sessão:

0. **As formas corrigidas dos músculos e as porções:** ficam? (`parada-do-corpo/6-musculos-antes-e-depois.png`). Depois: a vista de três quartos na puxada; a escápula no contorno (não feita).
1. **A mão espalmada nova:** ficou como ele quer? (`parada-do-corpo/1-flexao-de-cima.png`). A pegada do goblet já foi aprovada em 15/11.
2. **Os rótulos de técnica** fora do corpo, com fio: é assim? (`parada-do-corpo/3-rotulos.png`)
3. **A ponta do trapézio** 4,9 cm acima de onde a fonte diz, e **o abdômen** que termina na cintura: esticar as duas formas muda o desenho aprovado.
4. **As porções que o desenho não separa** (deltoide, peitoral de cima, trapézio, romboides, redondo maior, eretores): quais desenhar antes dos lotes 3 e 4.
5. **As medidas que continuam provisórias** e as que a fonte daria diferente (meia distância do quadril, L5–S1, lordose lombar e cervical): mudam a posição das juntas por dentro; a cervical pode mexer no pescoço de lado.
6. **O peso:** tirar os textos de fonte do pacote e carregar cada exercício ao abrir.
7. **Os achados da revisão independente**, e se ele quer a rodada com uma pessoa da área (`docs/revisoes/r4-roteiro-especialista.md`).
8. **O ângulo dos cotovelos no supino** no texto do app (`pedidos-ao-conteudo.md`).

## O que está no ramo

| O que | Onde |
|---|---|
| Proposta, com o fechamento do corpo na seção 0-B | `proposta.md` |
| Imagens da parada do corpo | `parada-do-corpo/` |
| Folhas ao lado das de hoje, erros, equipamento, página animada, conferência, medidas | `prototipos/` |
| Revisão independente (quadros grandes, regras e pareceres) | `revisao-independente/` |
| Tabelas do bloco A | `tabelas.md` (gerado de `src/engine/novo/dados/`) |
| Pesquisa por assunto | `pesquisa/01` a `10` |
| Pedidos ao conteúdo | `pedidos-ao-conteudo.md` |
| Motor novo (fora do app) | `src/engine/novo/` |
| Scripts | `scripts/animacao-nova/` |

## Comandos

- `npm run conferir:animacao`: a conferência automática (movimento e músculos).
- `node scripts/animacao-nova/conferir-desenho.mjs [cinza|pele]`: o aprovado, o do motor e a diferença.
- `node scripts/animacao-nova/prototipos.mjs [so-pagina|so-folhas|so-erros|so-medidas]`: a página, as folhas e as medidas de tempo.
- `node scripts/animacao-nova/olhar.mjs <saida.png> <id:vista:modo:instante[:erro][:estilo][:tema]> ...`: quadros em tamanho grande, para conferir a olho.
- `node scripts/animacao-nova/peso.mjs`: o peso do pacote.
- `node scripts/animacao-nova/tabelas-md.mjs`: regenera `tabelas.md`.
- `node scripts/animacao-nova/levar-desenho.mjs`: traz as tabelas do desenho aprovado para os dados do motor (e põe os músculos na ordem das camadas).

## O que ficou por fazer

- Lighthouse e bloqueio da tela do guia: só quando a primeira âncora aprovada estiver ligada ao app.
- Medir num celular de verdade; medir de novo o tempo por quadro com a máquina parada.
- A forma do músculo engrossar ao encurtar.
- Ligar o motor novo aos dois palcos, à miniatura e ao Worker (seção 6 do prompt), só depois do corpo fechado.
- `npm run test:e2e` não foi rodado nesta sessão: o app não mudou.

## Observações

- O `docs/devlog.md` e o `docs/backlog.md` não foram tocados: só no fechamento da frente.
- A revisão independente foi disparada primeiro no modelo mais capaz; os dois revisores pararam por limite de uso (volta em 19/11) sem gravar parecer. Foi refeita no modelo Opus.
