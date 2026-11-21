# Pedidos ao conteúdo (animações restantes, fases A, B e C)

De 20/11/2026. Tudo o que a frente das animações restantes achou no texto dos cartões, na lista de músculos da biblioteca e nos desenhos de equipamento, juntado num lugar só. **Nada abaixo foi alterado**: nem `src/conteudo/`, nem `src/domain/biblioteca/exercicios.json`, nem `public/equipamento/`. Cada item diz de onde veio e o que a animação ou o texto do guia fez enquanto isso. Quem decide é o Gustavo, um item por vez.

As fontes de origem, de onde estes itens foram copiados: `textos/pedidos.md` (fases A, B e C, 18/11), `../animacao-nova/lote-C3/pedidos-avulsos.md` (18/11), `notas-para-o-fechamento.md` e as conferências escritas de cada lote (`../animacao-nova/lote-*/`).

## 1. O texto do cartão que parece errado

O texto do guia animado copiou os campos do cartão como estão (a conferência `scripts/animacao-nova/conferir-textos-restantes.ts` exige isso). O que parece errado ficou aqui.

| Exercício | Campo do cartão | O que parece errado | Fonte | O que o texto do guia fez |
|---|---|---|---|---|
| `triceps-elastico-alto` | `montagem`, 2º item | "pise com o pé inteiro sobre ele": o elástico fica preso no alto (âncora de porta ou barra fixa); ninguém pisa nele. É o aviso comum dos elásticos sob o pé. | o próprio cartão (`setupEq`, `setupBody`); ficha da técnica, seção Segurança | a nota junta a montagem sem esse trecho |
| `coice-elastico` | `montagem` | "pise com o pé inteiro sobre ele": o laço vai na sola do pé e as pontas ficam sob as mãos. | o próprio cartão (`setupBody`); ficha, linha Posição | a nota fica só com a conferência das rachaduras e o aviso do rosto |
| `abertura-elastico` | `montagem` | "pise com o pé inteiro sobre ele": o elástico fica entre as mãos, sem nada para prender. | o próprio cartão (`setupEq`: "nada para prender"); ficha, seção Segurança | a nota usa a conferência das rachaduras e o fim do erro "Soltar uma ponta" |
| `afundo-tras` | `range`, 1º item | "Início: em pé, pés juntos", mas a posição (`setupBody`) diz "pés na largura do quadril". | o próprio cartão; ficha, linha Posição ("pés na largura do quadril"; `nsca2021`, não verificado) | nada: o texto do guia só usa os rótulos ("em pé", "embaixo") |
| `supino-barra` | `montagem` | Não pede as travas nas anilhas, e a regra pede para as barras; os outros cinco cartões com barra longa ou W trazem. | regra `seguranca.montagem` ("barras: travas nas anilhas"; `docs/pesquisa/regras.md`) | a nota seguiu o cartão, sem as travas |
| `supino-smith` | `setupEq`, 2º item, e `montagem` | "Travas de segurança logo acima do peito" não combina com a amplitude do próprio cartão ("barra encosta de leve no peito") nem com a regra, que no smith pede as travas **logo abaixo** do ponto mais baixo. O cartão do `supino-barra` diz "logo abaixo da altura do peito". | o próprio cartão (`exec`, `range`); regra `seguranca.montagem` ("smith e hack: travas logo abaixo do ponto mais baixo"); ficha, linha Montagem | a nota e a conferência seguiram o cartão ("logo acima do peito") |
| `remada-invertida` | `montagem`, 2º item | "No smith, barra travada nos ganchos" não pede as travas de segurança, e a regra pede no smith as travas logo abaixo do ponto mais baixo. A animação (feita no smith) as pôs 6 cm abaixo da barra. | regra `seguranca.montagem` ("smith e hack: travas logo abaixo do ponto mais baixo"; `docs/pesquisa/regras.md`); `../animacao-nova/lote-C3/remada-invertida.md` (tabela, 1ª linha) | a nota seguiu o cartão, sem as travas de segurança (20/11) |
| `remada-invertida` | `setupEq` | "Barra firme na altura da cintura": no smith, a animação pôs a barra no pino mais perto que deixa o corpo deitado, 9,9 cm abaixo da cintura (o pino de cima, a 110 cm, deixava o corpo a 45° da vertical). Mesmo assim o corpo fica entre 55° e 73° da vertical, mais em pé que a remada invertida comum, quase deitada. Não parece erro do cartão; fica anotado porque o guia mostra a barra um pouco abaixo do que o texto diz. | o próprio cartão; ficha, linha Preparo (`nsca2021`, não verificado); `../animacao-nova/lote-C3/remada-invertida.md` ("Qual barra" e o risco) | nada: o texto segue o cartão ("na altura da cintura") e mantém as três barras (rack, smith, barra de praça) no `vary` (20/11) |

**Recomendação:** os três do smith e do supino com barra (com a trava da remada invertida) são de segurança e vêm primeiro (a regra já diz o certo); os três "pise com o pé" são o aviso comum copiado para onde não serve; o do afundo é uma palavra.

## 2. Os músculos: a ficha da técnica e a biblioteca não dizem o mesmo

A conferência automática falha se a animação realça um músculo que a biblioteca não lista. Por isso, em todos os casos abaixo, a animação e o "onde sentir" (`feel`) do guia seguem a **biblioteca**.

| Exercício | A ficha da técnica | A biblioteca | Fonte |
|---|---|---|---|
| `goblet-kettlebell` | secundário: glúteos | soma os adutores | ficha, seção Músculos; `textos/pedidos.md`, fase A |
| `agachamento-smith` | `quadriceps`; secundário `gluteos` | soma os adutores | ficha, seção Músculos; `textos/pedidos.md`, fase B |
| `hip-thrust` | secundário: posteriores | sem secundário | ficha, seção Músculos; `textos/pedidos.md`, fase B; `../animacao-nova/lote-B1/resumo-barra-no-chao.md` |
| `coice-maquina` | secundário: posteriores | sem secundário | ficha, seção Músculos; `textos/pedidos.md`, fase C |
| `coice-polia` | secundário: posteriores | sem secundário | ficha (`docs/pesquisa/animacoes/coice-polia.md`, Músculos); `../animacao-nova/lote-C3/pedidos-avulsos.md`, item 1. Se os posteriores entrarem na biblioteca, basta pôr `'posteriores:R': 's'` em `papeis` (`src/engine/novo/exercicios/coice-polia.ts`) |
| `voador-invertido` | secundário: costas (meio do trapézio) | sem secundário | ficha, seção Músculos; `textos/pedidos.md`, fase C |
| `hiperextensao` | secundário: lombar (eretores, fora dos 12 músculos) | sem secundário | ficha, seção Músculos; `textos/pedidos.md`, fase C. **Não parece erro**: a lombar não é um dos 12 músculos do app |

**Recomendação:** decidir de uma vez a regra para o secundário que a ficha propõe e a biblioteca não tem (soma ou não soma), e aplicar nos seis primeiros juntos; mudar a biblioteca muda o volume semanal contado pelo gerador, e por isso é decisão do domínio, com o efeito medido.

## 3. Os desenhos de equipamento que não são a máquina da animação

O desenho que a pessoa marca na tela de equipamento (`public/equipamento/<cartão>.svg`) e a peça que a animação usa às vezes são máquinas diferentes. A peça nova segue as fichas de fabricante e a ficha da técnica; o cartão não foi mexido.

| Equipamento | O desenho de hoje | A peça da animação | Fonte |
|---|---|---|---|
| Máquina de glúteo (`gluteo_maquina`) | em pé | de quatro apoios, como pedem o cartão do exercício e a ficha da técnica do `coice-maquina` (Precor GSL0617, Atlantis C-122) | `textos/pedidos.md`, fase C; `../animacao-nova/lote-C1/coice-maquina.md` ("Qual máquina") e `resumo-deitado.md`. **Feito em 21/11**: o Gustavo escolheu a de quatro apoios ("pode ficar com a de quatro apoios e redesenhar o cartão"); o cartão foi redesenhado com as medidas da peça da animação (`coice-maquina-as-duas.png`, `cartao-gluteo-maquina.png`) |
| Máquina de tríceps (`triceps_maquina`) | a de mergulho sentado (pegadores ao lado do quadril, como a LF SS-TP) | a de braço apoiado à frente (HS-TE, Precor RSL0208), como a ficha da técnica | `textos/pedidos.md`, fase C; `../animacao-nova/lote-C3/resumo-bracos.md`. O `vary` do guia diz que esta é a de braço apoiado |
| Abdominal na máquina (`abdominal_maquina`) | o braço gira num eixo alto, atrás da cabeça, sem apoio da lombar | o eixo baixo, ao lado da lombar, com o apoio (manual público da Life Fitness) | `../animacao-nova/lote-C3/pedidos-avulsos.md`, item 3 |
| Supino, desenvolvimento e remada articulada na máquina | de anilhas (pinos com uma anilha de cada lado) | de pilha, com a torre ao lado, como todas as fichas lidas e o texto do app ("a placa da torre") | `../animacao-nova/lote-C2/resumo-empurrar.md` e `resumo-articulada.md` |
| Suporte de agachamento (`rack_de_agachamento`) | uma gaiola de quatro colunas | o suporte aberto das fichas (LF LBR-OS, HS OSR), aprovado pelo Gustavo em 18/11 ("aprovo") | `../animacao-nova/lote-B1/resumo-suporte.md` |
| Barra hexagonal (`barra_hexagonal`) | os cabos deitados ao longo das mangas, a 24 cm um do outro | os cabos atravessam o hexágono, a 63,5 cm (Rogue TB-1) | `../animacao-nova/lote-B1/resumo-barras-especiais.md` |
| Panturrilha em pé na máquina (`panturrilha_em_pe_maquina`) | as almofadas correm num carro na vertical | as almofadas num braço que gira, como nas fotos das fichas (HS-SC, Atlantis M118) | `../animacao-nova/lote-C3/resumo-panturrilhas.md` |
| Cadeiras flexora e extensora, mesa flexora, panturrilha sentada | menores que as fichas: a cadeira flexora 26% a 41% mais estreita, a extensora 37% a 54%, a mesa 33% a 40% mais baixa, a panturrilha sentada 13% a 45% menor (nas cadeiras, a pilha atrás do assento) | a medida das fichas, a pilha ao lado | `plano.md`, seção 3; `../animacao-nova/lote-C1/resumo-cadeiras.md` |

**Recomendação:** refazer os desenhos de equipamento com as peças novas (o gerador realista de `scripts/desenhos-equipamento/` e a folha de comparação já existem), começando pelos que mostram outra máquina (glúteo, tríceps, abdominal). No da máquina de tríceps, decidir antes se o app precisa de um segundo equipamento para a de mergulho.

## 4. Medidas que ficaram fora da ficha ou sem fonte

| Peça | O quê | Fonte |
|---|---|---|
| Banco romano (`hiperextensao`) | a almofada fica a 83,6 cm, 5,4 cm abaixo do mínimo da ficha da Body-Solid (89 cm), para a barriga do corpo da tabela não entrar nela (dito no código) | `notas-para-o-fechamento.md`; `../animacao-nova/lote-C3/hiperextensao.md` |
| Tornozeleira de polia | a argola em D e o mosquetão: nenhuma ficha pública lida dá a medida | `../animacao-nova/lote-C3/pedidos-avulsos.md`, item 4 |
| Barra reta da polia (`puxada-barra-reta`) | a de 20 polegadas da tabela é curta para a puxada: as mãos ficam na ponta dela | `notas-para-o-fechamento.md`; `../animacao-nova/andamento.md` |
| Barra W | os ângulos da curva (23° e 34°) são os do cartão de hoje; nenhuma página pública lida dá | `../animacao-nova/lote-B1/resumo-barras-especiais.md` |
| Smith | a guia a 7° vem da ficha da Life Fitness SSM; nenhuma segunda ficha | `plano.md`, seção 3; `../animacao-nova/andamento.md` |

## 5. Os erros do cartão que a animação não desenha

O cartão descreve só ritmo ou só esforço, sem pose diferente da certa. Nesses erros o guia mostra o movimento certo com o texto do erro (como já fazia a panturrilha no degrau). A lista é a `SEM_DESENHO` de `tests/unit/motor-novo-ponte.test.ts`: 19 erros em 19 das 81 animações.

- **Ritmo** (o erro é a velocidade): "Carga pesada demais" (`crucifixo-inverso`), "Balançar a perna" (`abducao-elastico`), "Chutar com embalo" (`coice-elastico`), "Soltar a volta" (`supino-polia`, `supino-inclinado-polia`, `coice-maquina`), "Quicar a barra no peito" (`supino-barra`), "Quicar a barra" (`supino-smith`), "Volta solta" (`mesa-flexora`), "Quicar embaixo" (`panturrilha-leg-press`), "Quicar" (`panturrilha-em-pe-maquina`), "Embalar" (`hiperextensao`), "Embalar a perna" (`abducao-polia`).
- **Sem consequência visível:** "Parar longe da falha" (`extensao-joelho-mini-band`, `elevacao-lateral-caneleira`, `coice-caneleira`, `crucifixo-invertido-caneleira`), "Não testar o ponto alto" (`triceps-elastico-alto`), "Esquecer a trava" (`agachamento-smith`).

Não é pedido de mudança no texto: é para o conteúdo saber que, nesses 19, o guia não tem desenho do erro. A proposta para os de ritmo (um ritmo próprio por erro na ficha do movimento) está no `plano.md`, seção 5, e no backlog.

## 6. O que a ligação ainda precisa decidir no texto

- **"Como registrar e subir a carga"** (`carga`, em todos os cartões) não tem lugar no texto do guia animado. Ou o guia ganha esse campo (uma mudança pequena na tela), ou a informação sai (a progressão já vem do programa). O texto do guia dos 81 guarda o campo, para não perder nada. Recomendação: manter, com o campo novo (`plano.md`, seção 6).
- **Os quatro últimos do lote C3** (`abdominal-maquina`, `coice-polia`, `abducao-polia` e `remada-invertida`) ganharam o texto do guia em 20/11, do cartão e da ficha, como os outros 77; `conferir-textos-restantes.ts` confere agora os 81 (o lote C3 inteiro; `PARCIAIS` ficou vazio). O que faltou na ficha de cada um está na seção "Texto do guia (20/11/2026)" dela.
- **O caminho do cartão de texto** (`CartaoTexto`): com as 171 animadas, nenhum exercício terá cartão; ele continua servindo quando a animação não carrega. Recomendação: mantê-lo, com um teste que force a falha de carga (`plano.md`, seção 8).
