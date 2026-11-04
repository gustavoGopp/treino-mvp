# Extensão de joelho sentado, com caneleira (`extensao-joelho-caneleira`)

Exercício aprovado pelo Gustavo em 04/11/2026, com o item novo **caneleiras** (`../../pesquisa-v2/11-catalogo-completo.md`, B.2.3 e B.3.3; rascunho W1, "Caneleiras de peso"). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/extensao-joelho-caneleira.json`).

- **Equipamento:** caneleiras de peso (`caneleiras`, com os kg de cada uma) e uma cadeira firme, um banco ou a beira de uma cama ou sofá firme.
- **Função:** extensora, o isolador obrigatório do quadríceps (`selecao.isolador-obrigatorio`), que hoje fica vazia em todo cenário de casa (B.1). O ganho é **estimado, não medido** (B.3.3).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Caneleira bem presa no tornozelo; cadeira firme, sem rodinhas, encostada na parede (ou banco); sem eles, beira de cama ou sofá firme, alta o bastante para o pé ficar fora do chão | consenso | `seguranca.montagem` (em casa: móvel testado, cadeira firme sem rodinhas) |
| Posição | Sentado, costas retas, mãos na lateral do assento; coxas apoiadas; uma perna de cada vez | consenso | mesma lógica da `cadeira-extensora`; `nsca2021` (não verificado) |
| Subida | Estende o joelho até quase esticar, sem tranco; a coxa não sai do assento | consenso | mesma regra da `cadeira-extensora` |
| Pausa | ~1 s em cima, onde a caneleira pesa mais | consenso | `consenso-projeto` (biomecânica, abaixo) |
| Descida | ~2 s, controlada, até o joelho dobrar bem | consenso | `tempo.serie` |

## Por que assim (e o aviso honesto)
- **A extensora cresce o reto femoral**, a parte do quadríceps que o agachamento e o leg press quase não crescem (`kinoshita2026`, `kassiano2026`, `zabaletakorta2021`; **moderada**, três ensaios, três grupos). Por isso a vaga é obrigatória quando o equipamento permite.
- **Mas a caneleira não é a cadeira extensora.** Com o peso preso no tornozelo e a pessoa sentada, o esforço é máximo com o **joelho esticado** (quadríceps curto) e quase zero com o joelho a 90° (quadríceps alongado). É física, não estudo (**consenso**, biomecânica; W1). É o contrário do que `selecao.alongado` prefere: na extensora, a parcial com o joelho bem dobrado cresceu mais em algumas regiões da coxa (`pedrosa2022`; **um estudo**, mulheres não treinadas). Se a extensão com o esforço no lado curto cresce o reto femoral, **ninguém testou** (W1, "O que fica sem resposta").
- **Pode ficar leve para quem já treina.** A carga máxima da caneleira é pequena **[opinião]**: para o quadríceps de um treinado, a série pode não chegar perto da falha mesmo com muitas repetições. Qualquer carga que leve a série perto da falha entre ~6 e ~30 repetições serve (`schoenfeld2017b`, `lasevicius2018`; **robusta** para a faixa larga, **moderada** em treinados; B.2.5); acima disso, ninguém testou bem.
- O único ensaio com pesos pequenos presos ao corpo foi em pessoas com mais de 50 anos, diabetes tipo 2 e possível sarcopenia: saquinhos de 0,5 a 1 kg melhoraram a massa muscular contra um grupo parado (`chien2022`; **um estudo**, população diferente). Não diz nada sobre adultos treinados.
- W1 deixou ao dono do produto a escolha entre esta extensora "pior", com o aviso, e a vaga vazia; o exercício foi aprovado em 04/11/2026, e o aviso vai no cartão (campo `carga` e `range`).

## Erros comuns
1. **Chutar a perna** com tranco (`tranco`).
2. **Tirar a coxa do assento** ou jogar o tronco para trás (`quadril`).
3. **Deixar a perna cair** na descida (`cai`).

## Segurança
- **Montagem:** fivela bem fechada (a caneleira não pode escorregar para o pé); cadeira firme, sem rodinhas, não dobrável, encostada na parede (`seguranca.montagem`; consenso).
- **Para quem não serve:** com dor na frente do joelho, a extensão com o joelho esticado sob carga pode incomodar (W1; **consenso**). O cartão manda parar antes do ponto que dói (`seguranca.dor.escala`: 3–5, encurtar a amplitude) e, se a dor continuar, parar o exercício e procurar avaliação.
- **Articulação [opinião, pelo padrão da `cadeira-extensora`]:** joelho. Dor de hoje acima de 5 no joelho tira o exercício.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`). Caminhar ou correr com caneleira não é prescrito (W1).

## Músculos
Primário: quadríceps (o cartão não promete o reto femoral: ver acima). Sem secundário. Selo: **consenso** para este exercício; **moderada** só para a extensora de máquina.

## Como a carga sobe
Caneleira: a próxima da lista (atributo `pesosKg`, como no kettlebell; `progressao.incremento.halteres` por analogia, com `progressao.salto-grande` quando o salto passa de ~10%). Sem caneleira mais pesada, a `equipamento.escada-carga-leve` (já é unilateral): mais repetições → descida de 3 s → 1,5 repetição. **Consenso**. A pausa no alongamento (passo 4 da escada) não serve aqui, porque com o joelho dobrado a caneleira quase não pesa; por isso o cartão usa a 1,5 repetição **[opinião]**.

## Referência visual
> Nenhum vídeo levantado no catálogo (B.2.7 não cobre as caneleiras). Termo sugerido: "seated knee extension ankle weight".

## Fontes
- `kinoshita2026`, `kassiano2026`, `zabaletakorta2021`, `pedrosa2022`, `chien2022`, `schoenfeld2017b`, `lasevicius2018` (já em `../fontes.md`).
- `consenso-projeto` (a curva de esforço da caneleira, por biomecânica).
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.
