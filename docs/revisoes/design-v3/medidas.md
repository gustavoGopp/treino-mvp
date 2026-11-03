# Medidas: acessibilidade e leitura (design v3, papel 6)

> Fase 1, medida em 03/11/2026 no app publicado (branch `main`, depois da reformulação visual), com a persona fictícia Ana.
> Scripts: `scripts/design/palavras.spec.ts` (palavras, toques, altura) e `scripts/design/capturas.spec.ts` + `medir.ts` (toque, contraste, botão principal).
> Números brutos: `medidas-claro.json`, `medidas-escuro.json`, `medidas-pequeno.json` (nesta pasta) e `../design/medidas-*.json`.

## Como se mede
- **Palavras:** o texto visível do conteúdo (`main`), sem o topo. "À vista" conta só o que está na 1ª tela, sem rolar.
- **Leitura:** 200 palavras por minuto. É uma aproximação para leitura silenciosa no celular, em pt-BR **[opinião]**. Brysbaert 2019 (meta-análise, inglês) achou cerca de 238 por minuto em texto informativo. Em português e no celular, o número deve ser menor, por isso o arredondamento para baixo.
- **Toques:** cada clique ou marcação que a pessoa faz até chegar ao programa. "Voltar" e rolar não contam.
- **Altura:** a altura da página dividida pela altura da tela (1 = cabe sem rolar).
- **Toque e contraste:** WCAG 2.2, critérios 2.5.8 (toque) e 1.4.3 (contraste), com o piso do projeto de 44 px. Tema claro e escuro a 412 × 915 (Pixel 7) e tema claro a 360 × 740.

## Antes (hoje)

### Leitura e toques no cadastro (412 px, tema claro)
| # | Tela | Palavras | À vista | Leitura | Controles | Altura | Toques até aqui |
|---:|---|---:|---:|---:|---:|---:|---:|
| 1 | Boas-vindas | 180 | 116 | ~54 s | 2 | 1,49 | 0 |
| 2 | Triagem (lista das 9) | 171 | 130 | ~51 s | 2 | 1,52 | 1 |
| 3 | Nível, 1ª pergunta | 35 | 35 | ~11 s | 3 | 1,00 | 2 |
| 4 | Nível, as 3 respondidas | 118 | 118 | ~35 s | 11 | 1,79 | 5 |
| 5 | Rotina | 40 | 40 | ~12 s | 5 | 1,00 | 6 |
| 6 | Rotina, respondida | 98 | 98 | ~29 s | 19 | 1,48 | 9 |
| 7 | Equipamento, ao abrir | 203 | 86 | ~61 s | 51 | 4,21 | 10 |
| 8a | Equipamento, "monto a lista" (halteres e banco) | 263 | 190 | ~79 s | 72 | 4,93 | 15 |
| 8b | Equipamento, "academia completa" | 383 | 97 | ~115 s | 92 | 6,65 | 11 |
| 9 | Tudo certo? | 27 | 27 | ~8 s | 6 | 1,00 | 16 / 12 |
| 10 | Seu treino (o programa) | ~180 | ~105 | ~54 s | 10 a 12 | 2,15 | 17 / 13 |

**Somando a última forma de cada tela até o programa:** cerca de **860 palavras** ("monto a lista") e **980** ("academia completa"), ou seja, **4,3 a 4,9 minutos** para quem lesse tudo. **17 e 13 toques**, nenhum caractere digitado.

A 360 px, as palavras são as mesmas e as telas ficam mais altas: a boas-vindas tem 1,92 telas, a triagem 1,78, o nível 2,05 e o equipamento com "academia completa" 7,81.

### Onde está o botão principal (sem rolar?)
| Tela | 412 px | 360 px |
|---|---|---|
| Boas-vindas, "Entendi, vamos começar" | a 130% da altura: **fora da vista** | a 171%: **fora** |
| Triagem, "Nenhuma vale para mim" | a 125%: **fora** (de propósito, depois da lista) | a 147%: **fora** |
| Nível, "Continuar" | a 158%: **fora** | a 182%: **fora** |
| Equipamento, "Continuar" | fixo embaixo: à vista | à vista |
| Tudo certo?, "Gerar meu programa" | a 73%: à vista | a 83%: à vista |

### Toque e contraste
- **0 área de toque abaixo de 44 px e 0 texto abaixo do contraste mínimo** em todas as telas do cadastro e do início, nos dois temas e a 360 px. A reformulação visual resolveu isso. **O problema de hoje não é acessibilidade técnica: é quantidade de texto e de rolagem.**
- **Não medido por script:** a ordem do foco com teclado, os nomes que o leitor de tela anuncia e o texto sobre imagem. Na implementação, a proposta é conferir à mão com o leitor de tela do Android (TalkBack) as telas novas. Uma biblioteca de checagem automática (`@axe-core/playwright`) seria uma dependência nova: só entra se o Gustavo quiser.

### Detalhes achados na medição
- No "Tudo certo?", a prioridade aparece em minúscula ("pernas"), enquanto as outras linhas começam em maiúscula.
- Na triagem, o texto "Nenhuma vale para mim" aparece 2 vezes (na explicação e no botão), e "consenso de especialistas" aparece 2 vezes.

## Metas para o depois **[opinião, para o Gustavo aprovar]**
| Medida | Hoje | Meta |
|---|---:|---:|
| Palavras na 1ª tela | 180 | **até 50**, com o resto a um toque |
| Botão principal da 1ª tela à vista a 360 px | não | **sim** |
| Palavras até "Nenhuma vale para mim" (triagem) | 171 | **até 100**, sem tirar nenhuma condição |
| Palavras até o programa ("academia completa") | ~980 | **até 400** |
| Toques até o programa ("academia completa") | 13 | **até 13** (não piorar) |
| Toque < 44 px e contraste baixo | 0 | **0** (continua no teste `tests/e2e/telas.spec.ts`) |

Na implementação, `palavras.spec.ts` vira a medida do depois, e as metas aprovadas viram teste.

## Fontes
- Brysbaert M (2019). How many words do we read per minute? A review and meta-analysis of reading rate. *Journal of Memory and Language* 109:104047. DOI 10.1016/j.jml.2019.104047. **NÃO VERIFICADO** (citação de memória; o número só calibra a estimativa de tempo, não vira regra).
- W3C (2023). WCAG 2.2, critérios 1.4.3, 2.5.8 e 2.5.5 (consenso).

## Depois (03/11/2026, com a design v3 implementada)
Medido pelo mesmo script, no fluxo novo (`medidas-depois-claro.json`, `-escuro`, `-pequeno`). Desde a implementação, a conta de palavras ignora o texto só para leitor de tela (`.sr`, que o selo novo usa) e o conteúdo recolhido; o "antes" não tinha nenhum dos dois.

| Meta | Hoje (antes) | Meta | Depois |
|---|---:|---:|---:|
| Palavras na 1ª tela | 180 | até 50 (aprovada: até 75) | **49** |
| Botão da 1ª tela à vista a 360 px | não | sim | **sim** (fixo embaixo) |
| Palavras na triagem | 171 | até 100 | **149** (não alcançada: as 9 condições inteiras) |
| Palavras até o programa ("academia completa") | ~980 | até 400 (aprovada: até 500) | **~550** com a prioridade, ~510 sem (não alcançada) |
| Toques até o programa ("academia completa") | 13 | até 13 | **12** (com a prioridade: 9 sem ela) |
| Toque < 44 px e contraste baixo | 0 | 0 | **0** |

`tests/e2e/leitura.spec.ts` trava: as telas de pergunta sem rolar a 412 px e no máximo 560 palavras até o programa.
