# Catálogo completo: relatório da continuação (04/11/2026)

> Sessão de continuação do catálogo completo (`docs/prompts/sessao-catalogo-continuacao.md`), na branch `claude/focused-shannon-7243on`, ainda fora da `main`. Princípio que guiou tudo: **nada entra no app sem o "aprovar" do Gustavo**; o que a sessão fez foi deixar cada decisão pronta para ele, com a folha, a medida e a conferência escrita.

## Em uma olhada
| O que | Estado |
|---|---|
| Peças novas no motor (`src/engine/desenho.ts`) | 5, como funções novas: fita de suspensão, paralelas, caneleira, laço da mini-band (sobre a peça `band`) e roda abdominal. Mais a forma clássica dos adutores (`MUS.adutores`). Nenhuma animação aprovada mudou de desenho (as linhas de base `motor.json`, `novas.json` e `estilo-a.json` continuam passando) |
| Animações novas em revisão | **14**, com folha (`docs/revisoes/catalogo/folhas/`), medidas (`scripts/medir-animacao.mjs`) e conferência escrita (`docs/revisoes/catalogo/conferencia/`): suspensão (6), bola e paralelas (3), caneleiras (3), mini-band (1) e roda (1). Todas com `ik=0` na animação e em cada erro |
| Textos do guia prontos | 14, em `src/conteudo/revisao/`, validados contra o schema, com os mesmos erros da pose |
| Conferência das 40 antigas | feita: 38 batem com a ficha; 2 correções em revisão (pike, rosca na polia); 25 fichas curtas novas para as do guia original (`docs/revisoes/catalogo/conferencia/antigas.md`) |
| Fila dos outros 69 | montada por frequência e custo (`docs/revisoes/catalogo/fila.md`), para a decisão do Gustavo |
| Auditoria e mapa do catálogo | regravados com os 135 exercícios; duas rodadas dão arquivos idênticos; a versão de 110 ficou em `docs/revisoes/catalogo-completo/antes-110/` |
| Programas das personas | **não mudam** com a aprovação das 14 (medido com as 6 personas e o 2º local do Bruno) |
| Testes | `npm run check` passando (600 unitários); e2e e motor rodados no fim (ver "Testes") |

## O que o Gustavo precisa decidir (uma coisa por vez)
1. **As 14 folhas**, família a família: suspensão (`conferencia/suspensao.md`), bola e paralelas (`bola-paralelas.md`), caneleiras (`caneleiras.md`), mini-band e roda (`mini-band-roda.md`). Cada "aprovar" vira `node scripts/aprovar-animacao.mjs <id> <id>`, a entrada em `SO_AJUDA`/`LISTA` que a conferência indica, e a regravação de `novas.json` e `estilo-a.json`. Os programas das personas não mudam; o que muda é o guia: 14 cartões de texto viram animação.
2. **As 2 correções** (`conferencia/antigas.md`): o pike (mãos plantadas; diferença pequena) e a rosca na polia (barra reta de largura fixa). A da rosca pede decidir se o guia original deixa de ser a referência dessa animação (`tests/motor/equivalencia.spec.ts`).
3. **A fila** (`fila.md`): a ordem dos blocos (proposta: A, C, B, D, E), até onde ir, e se os 12 do elástico continuam esperando o R4.
4. **A ida para a `main`** (rebase ou merge, sem forçar), depois das aprovações que ele quiser.

## O mapa do catálogo: antes × depois
O "antes" é o mapa versionado na sessão anterior, gerado com **110 exercícios** (52 classes de cenário, 5.616 programas na monotonia). O "depois" é o mapa regravado nesta continuação com os **135** (55 classes, 5.940 programas). Nenhuma animação foi aprovada entre os dois, então a diferença é só dos exercícios e dos itens novos. Vaga = função do gerador; "0" = nenhuma opção; "1" = uma só (o gerador repete sempre a mesma). Os números são iniciante / avançado.

| Cenário | Vagas com 0, antes | depois | Vagas com 1 só, antes | depois |
|---|---:|---:|---:|---:|
| Casa com halteres e elásticos (atalho) | 4 / 4 | 4 / 4 | 13 / 13 | 10 / 10 |
| Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola, caneleiras, mini-band, roda) | 4 / 4 | **1 / 1** | 6 / 6 | 8 / 8 |
| Condomínio com multifuncional (atalho) | 4 / 4 | 4 / 4 | 11 / 11 | 10 / 10 |
| Condomínio + os "às vezes tem" e todas as estações | 3 / 3 | **1 / 1** | 7 / 7 | 8 / 8 |
| Só halteres (2 a 20 kg), sem banco | 5 / 5 | 5 / 5 | 13 / 12 | 10 / 9 |
| Halteres de 1 a 12 kg e banco reto (a Ana) | 4 / 4 | 4 / 4 | 12 / 11 | 11 / 10 |
| Banco reto + halteres leves | 4 / 4 | 4 / 4 | 12 / 11 | 11 / 10 |
| Halteres de 2 a 10 kg + bola suíça | 5 / 5 | 5 / 5 | 13 / 13 | 9 / 9 |
| Suspensão + elásticos | 4 / 4 | 4 / 4 | 16 / 16 | 15 / 15 |
| Só anilhas e manoplas | 5 / 5 | 5 / 5 | 13 / 12 | 10 / 9 |
| Só bola suíça | 11 / 11 | 11 / 11 | 9 / 9 | 7 / 7 |
| Só polia dupla com altura regulável | 7 / 7 | **4 / 4** | 11 / 10 | 14 / 13 |
| Só halteres fixos | 5 / 5 | 5 / 5 | 13 / 12 | 10 / 9 |
| Só kettlebell | 11 / 11 | **7 / 7** | 9 / 8 | 14 / 13 |
| Só paralelas | 11 / 11 | 11 / 11 | 9 / 7 | 8 / 6 |
| Só fitas de suspensão (novo cenário) | — | 7 / 7 | — | 12 / 12 |
| Só caneleiras de peso (novo) | — | 8 / 8 | — | 12 / 11 |
| Só mini-band (novo) | — | 10 / 10 | — | 10 / 9 |
| Só roda abdominal (novo) | — | 11 / 11 | — | 9 / 7 |
| Só hack ou pendular (novo nome) | — | 11 / 11 | — | 9 / 8 |
| Academia completa + tudo (a Carla) | — | 0 / 0 | — | 4 / 4 |
| Os outros 32 cenários | iguais | iguais | iguais | iguais |

**Leitura.** O "só kettlebell" caiu de 11 para 7 vagas vazias (as 7 animações da família anterior e os exercícios de um peso só); a polia dupla, de 7 para 4; a casa com os "às vezes tem", de 4 para 1. A suspensão sozinha abre 15 das 22 vagas (7 vazias: crucifixo, elevação lateral, extensora, abdução, adução, panturrilha sentada e tríceps acima da cabeça, que o doc 11 previa). As 14 animações novas **não mudam este mapa**: elas mudam o guia (cartão → animação) e o desempate entre equivalentes, não as opções de cada vaga.

## O que muda nos programas das personas
Nada. Com uma cópia da biblioteca em que as 14 têm `animacaoId`, os programas das 6 personas (Bruno, Ana, Diego, Carla, Elisa, Fábio) e o do 2º local do Bruno saem idênticos aos de hoje: os exercícios novos são do nível 2 das suas vagas, e na academia os do nível 1 continuam ganhando. Os snapshots (`tests/unit/__snapshots__/`) não precisam ser regravados na aprovação. (A checagem do método: tirar todas as animações da cópia muda o programa do Diego, agachamento com o peso do corpo → com elástico, então a cópia é a que o gerador lê.)

## As decisões tomadas pela sessão (sem o Gustavo, para ele conferir)
- **Fita de suspensão sem calibração:** a fita não estica; o comprimento sai da pose, e o script de medida imprime o caminho da âncora a cada pegador por pose (a conferência exige variação de ± 2 cm). Nas quatro de pé, o corpo gira sobre os calcanhares e sobe enquanto as mãos vêm ao corpo; o ângulo do tronco em cada fase vem dessa geometria.
- **O T na suspensão é animado; o Y fica no texto** (a ficha já dizia que o Y entra só no último degrau).
- **Remada na suspensão animada junto** com as outras cinco (é a base das de braço); os ids dos erros do cartão (`e1`, `e2`, `e3`) viraram `quadril`, `encolher`, `curta`.
- **Deitado de lado** (abdução e adução com caneleira): o motor mantém a pelve nivelada, então os dois quadris caem no mesmo ponto na vista de lado; a abdução ganhou a vista de cima para mostrar a perna atrás da linha do corpo e o erro de levá-la à frente.
- **Âncora da suspensão a 205 cm** e os comprimentos das fitas são escolhas de desenho (a figura cabe na tela com a fita visível), não medidas de produto; o mesmo para a altura das paralelas (105 cm).
- **Correções das originais:** preparadas em revisão, sem aprovar, porque a equivalência com o guia original é uma decisão de produto.

## Testes
- `npm run check`: lint, typecheck e 600 testes unitários passando (os arquivos em `revisao/` ficam fora do app e dos testes).
- `npm run test:e2e` (`playwright test`, e2e e motor): 48 testes. 45 passaram de primeira; os 3 que falharam eram asserções com os nomes antigos dos cartões "Hack" e "Suspensão (TRX)" e a escada da subida no step, mudados na sessão anterior (commit `9c4231b`) sem ajustar os e2e; ajustados às palavras da tela (`Hack ou pendular`, `Suspensão (TRX) ou argolas`, o 5º degrau) e passando. O projeto `motor` passou: as linhas de base das 52 animações aprovadas (`motor.json`, `novas.json`, `estilo-a.json`) não mudaram com as peças novas.
- `npm run auditoria` duas vezes: arquivos idênticos (comparados por hash).

## Pendências
- **PubMed bloqueado** na rede da sessão (`pubmed.ncbi.nlm.nih.gov`, `eutils.ncbi.nlm.nih.gov`): Larsen 2025 do leg press (`larsen2025b`) e o título de `kassiano2026` seguem por ler. Para a próxima sessão ler, o host precisa ser liberado nas configurações de rede do ambiente.
- As 17 fontes do `10` fora de `fontes.md` e as 14 não verificadas: listadas no `backlog.md`.
