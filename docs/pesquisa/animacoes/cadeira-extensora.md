# Cadeira extensora (`cadeira-extensora`)

Exercício da biblioteca desde antes do R0c, sem animação nem cartão até a auditoria do treino (02/11/2026), que o achou entre os mais prescritos (`docs/revisoes/auditoria/inventario.md`). **Ficha de técnica para o cartão de texto; a animação, se vier, sai desta ficha.**

- **Equipamento:** cadeira extensora (ou a estação do multifuncional)
- **Função:** extensora, o isolador obrigatório do quadríceps (`extensora`, nível 1; `selecao.isolador-obrigatorio`)

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Encosto ajustado para o joelho ficar alinhado com o eixo da máquina; o rolo apoia na frente da canela, logo acima do pé | consenso | `nsca2021` (não verificado) |
| Subida | Estende os joelhos até quase esticar; pausa de ~1 s em cima | consenso | `nsca2021` (não verificado) |
| Descida | Controlada, até os joelhos dobrarem bem (a posição em que a coxa alonga), sem bater as placas | consenso | `selecao.alongado` |
| Corpo | Quadril encostado no banco e mãos nas alças: o tronco não ajuda | consenso | `nsca2021` (não verificado) |

## Por que assim
A extensora cresceu o reto femoral, a parte do quadríceps que cruza o quadril e que o leg press e os agachamentos quase não crescem (Kinoshita 2026; um estudo, coerente com Zabaleta-Korta 2021 e Kassiano 2026). Por isso ela é obrigatória quando há a máquina (`selecao.isolador-obrigatorio`, moderada).

## Erros comuns
1. **Dar tranco** para subir.
2. **Tirar o quadril do banco.**
3. **Joelho fora do eixo** da máquina.
4. **Descer rápido** e bater as placas.

## Músculos
Primário: quadríceps (sobretudo o reto femoral). **Um estudo**: na extensora, o reto femoral cresceu +13,2% (contra +1,1% no leg press), e os vastos cresceram tanto quanto no leg press (Kinoshita 2026, PMID 41630124; resumo-PubMed). Conferido na revisão de anatomia (02/11/2026).

## Como a carga sobe
Placa da torre: +1 placa (`progressao.incremento.polia`).

## Fontes
- `kinoshita2026`: PMID 41630124 (`docs/pesquisa/fontes.md`).
- `zabaletakorta2021`: PMID 34743671.
- `kassiano2026`: PMID 41379528.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Encosto reclinado (lido em 05/11/2026)
Com o quadril a 40° (encosto reclinado) em vez de 90° (sentado reto), o reto femoral cresceu mais em 22 homens não treinados, 10 semanas, evidência bayesiana "extrema"; o vasto lateral cresceu igual (`larsen2025c`, PMID 39699974; **um estudo**, não treinados). Entra no cartão como "se o encosto reclina, recline-o um pouco". A mesma lógica vale, em tese, para a extensão sentada com caneleira ou elástico (encostar as costas e abrir o quadril), mas ninguém testou fora da máquina (**consenso**).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/cadeira-extensora.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (quadríceps, sobretudo o reto femoral) e "Por que assim" (a parte do quadríceps que cruza o quadril); a nota, dos erros "Tirar o quadril do banco" e "Descer rápido" e da linha Corpo | um estudo (o reto femoral); consenso (a nota) | `kinoshita2026`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Ajuste e Corpo da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | o equipamento do cabeçalho, a seção "Encosto reclinado" (se o encosto reclina, recline-o um pouco) e as linhas Subida e Descida | um estudo (o encosto); consenso | `larsen2025c` (PMID 39699974, citado na seção "Encosto reclinado"); `selecao.alongado`; `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/cadeira-extensora.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a regulagem (o encosto que põe o joelho no eixo e o rolo logo acima do pé) foi para a conferência. A chave `larsen2025c` está só na seção "Encosto reclinado", e não na lista de Fontes. A ficha não dá números para a regulagem (a conferência da animação regulou o encosto e o rolo pelo corpo, e o assento a 56 cm é de desenho). O `vary` repete o "recline um pouco" do cartão, sem o resultado do estudo (fica no cartão, na posição).
