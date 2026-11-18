# Lote B1 · Levantamento terra romeno com barra (`terra-romeno-barra`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, a barra longa com uma anilha de 5 kg de cada lado nas mãos, rente às coxas; o quadril vai para trás, a barra desliza rente às pernas até o meio da canela e volta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/terra-romeno-barra.md`. Cartão do app: `src/conteudo/exercicios/terra-romeno-barra.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/terra-romeno-barra.json`.
- Animação: `src/engine/novo/exercicios/terra-romeno-barra.ts`, sobre o núcleo dos stiffs (`exercicios/dobrar-o-quadril.ts`, só importado; nada mudou nele). O que os três exercícios com barra têm em comum (a pele desenhada amostrada com densidade, para medir a folga da barra): `exercicios/com-barra-longa.ts`. Regras medidas: `src/engine/novo/regras/barra-longa.ts`.
- A barra: a peça `pecas-de-cena/barra-longa.ts` já mostrada ao Gustavo, sem mudança.
- Quadros grandes: `../quadros/terra-romeno-barra.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica diz que o terra romeno segue o stiff com halteres. Os ângulos que ela não dá em número (joelho em cima e embaixo, cotovelo, os erros) saem da ficha de movimento do stiff aprovado, com selo `desenho` e fonte `stiff`. O que é do exercício: pés na largura do quadril, pegada na largura dos ombros (mãos por fora das coxas), a barra "rente às pernas" e o fim "no meio da canela" (cartão). A inclinação do tronco embaixo não é escolhida: é a que leva a barra ao meio da canela.

**A barra rente é medida na pele desenhada.** O núcleo dos stiffs leva a carga às pernas com um tubo oval (a tabela do corpo); com a barra fina, ele a deixava a 3 a 4 cm da coxa desenhada. Aqui o braço gira até a barra ficar a 0,5 cm da pele desenhada (amostrada com 8 seções entre cada duas do desenho e 36 pontos por seção) e o contorno é alisado como no stiff aprovado.

**As anilhas são as de 5 kg (24 cm), e não as de 20 kg (45 cm).** Com a de 45 cm, de lado, a anilha de perto cobria as mãos, os joelhos e metade das coxas: "barra rente às pernas" não se via (o quadro `quadros/terra-romeno-barra.png` de rascunho com 20 kg está descrito em "O que não ficou bom"). A barra com as anilhas pesa 30 kg, e os 30 kg entram no equilíbrio. O cartão pede começar com a barra vazia para acertar o movimento; 30 kg é carga de quem está aprendendo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, joelhos um pouco dobrados | consenso | pés a 18 cm (centros), parados no ciclo (0 cm); em cima o joelho dobra 8° | sim |
| Barra rente às coxas, pegada na largura dos ombros | consenso | em cima a barra fica a 0,5 cm da coxa; pegadas a 44 cm (centros dos ombros a 36,8 cm); o lado de dentro da mão a 17,6 cm do meio, a coxa vai até 17 cm (as mãos por fora dela) | sim |
| Coluna reta | consenso | a lombar não dobra além da curva de repouso (0°) | sim |
| ~2–3 s, empurra o quadril para trás | consenso | descida de 2,5 s; o quadril dobra 108° e vai 18,4 cm para trás; o joelho fica entre 8° e 15° | sim |
| Desce a barra rente às pernas | consenso | da barra à pele da coxa ou da canela, de 0,5 a 1,9 cm na descida (medido na pele desenhada) | sim |
| Fim: barra abaixo dos joelhos ou no meio da canela | consenso | embaixo, a barra a 28,2 cm do chão, a 50,5% da canela; o peito fica a 93° da vertical (o tronco na horizontal) | sim |
| Sobe levando o quadril para a frente, até ficar em pé | consenso | em pé, o quadril dobra 6,6° e o peito fica 1,3° à frente da vertical | sim |
| A barra é rígida (as duas mãos a seguram e ela se move inteira) | — | as mãos ficam a 0 cm da barra, sempre a 44 cm uma da outra, e a barra não sai da horizontal (0 cm) | sim |
| O peso aparece | mecânica | o centro de massa (corpo + 30 kg) fica a no máximo 0,1 cm do meio do pé | sim |

Ritmo: o maior salto de velocidade é de 10% do pico (limite 15%). O ciclo emenda (0 cm).

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`joelho.cima`, `joelho.baixo`, `cotovelo`, `cotovelo.paraFora`, `anilhas`). (2) O modo Músculos abre de três quartos, de trás (posteriores: 410 cm²); de lado eles aparecem pouco (67 cm²), igual ao stiff aprovado.

## As vistas

**De lado** (padrão do modo Técnica, como o stiff aprovado): mostra o quadril indo para trás, a coluna reta e a barra (o meio da anilha) passando rente à linha das pernas. **Três quartos, de trás** (segunda vista e padrão do modo Músculos): mostra as mãos na barra por fora das coxas e os posteriores. Testei também três quartos de frente (`quina`): a barra rente às coxas se lê melhor, mas a barra de 2,2 m atravessada alarga o quadro e, com os rótulos, o corpo ficava com 60% da altura do quadro (no stiff aprovado, 85%); sem rótulos ali, não ensinava nada a mais que o lado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar a lombar | de lado | embaixo, a bacia inclina 12° menos e a lombar dobra 24° (a torácica 6°): a barra desce além do certo, a 25 cm do chão (o certo: 28 cm) |
| Virar um agachamento | de lado | os joelhos dobram 62° e o quadril desce 13 cm; o tronco fica a 43° da vertical; a barra para na altura do joelho (48 cm) |
| Barra longe das pernas | de lado | a barra desce 16 cm à frente das pernas, à mesma altura do certo (com o tronco menos inclinado: 84°); o quadril vai 8 cm mais para trás para equilibrar |

## O equipamento

- **Barra longa** com uma anilha de 5 kg (24 cm) de cada lado e as presilhas: a peça já mostrada ao Gustavo, sem mudança.
- Nenhum objeto novo.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Do stiff aprovado vêm os joelhos quase parados e o contorno da carga rente às pernas.

## O que não ficou bom

- **As anilhas de 5 kg.** Tentei primeiro a de 20 kg (45 cm, a do exemplo da folha da barra): de lado ela cobria as mãos, os joelhos e metade das coxas em todo o ciclo, e o principal ("barra rente às pernas") não se via; de três quartos de frente a barra alargava o quadro. Com a de 24 cm, a anilha de perto ainda cobre o joelho de passagem, mas a barra se lê rente à perna. Se o Gustavo quiser a anilha grande, a vista padrão teria de mudar.
- **De lado, a anilha de perto cobre a mão** e parte da perna no meio da descida; a mão fechada na barra se vê na vista de três quartos, de trás.
- **Embaixo o tronco fica na horizontal** (93° da vertical) para a barra chegar ao meio da canela: é o que a ficha pede, mas é uma descida funda para quem tem os posteriores curtos (a ficha diz que depende da flexibilidade). Com `maos.embaixo` maior (abaixo do joelho), ele inclina menos.
