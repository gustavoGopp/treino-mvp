# Lote A5 · Pull-through na polia baixa com corda (`pull-through`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de costas para a torre, dois passos à frente dela, os pés mais abertos que o quadril; polia embaixo, a corda nas duas mãos, passando entre as pernas. O quadril vai para trás com a coluna reta e os joelhos quase no mesmo ângulo; as mãos descem pela frente das coxas e passam entre os joelhos; na subida, o quadril vai à frente até ficar em pé, e os braços só seguram. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/pull-through.md`. Cartão do app: `src/conteudo/exercicios/pull-through.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/pull-through.json`.
- Animação: `src/engine/novo/exercicios/pull-through.ts` (o movimento de `dobrar-o-quadril.ts`, o núcleo dos stiffs, chamado direto com as mãos na corda; a coluna e o cabo de `polia-bracos.ts`; a corda de `pecas-de-cena/corda-triceps.ts`). Regras novas: `src/engine/novo/regras/uma-torre.ts` (`pull-through-bracos-so-seguram`, `pull-through-maos-entre-as-pernas`, `pull-through-polia-atras`).
- Quadros grandes: `../quadros/pull-through.png`. Sem folha: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá número; ela segue, por analogia, o stiff com halteres. Do stiff aprovado (e do núcleo de dobrar o quadril) saem os joelhos quase no mesmo ângulo, o pescoço na linha do tronco, os braços quase estendidos (4°), o equilíbrio (o centro de massa sobre o meio do pé), os tempos e o erro da coluna arredondada. "Dois passos à frente" é o dobro do passo da puxada unilateral: a roldana 140 cm atrás do meio da pelve em pé. **A largura dos pés e o caminho das mãos saem da medida.** O braço vai de 10° à frente da vertical (em pé) a 30° atrás dela (embaixo), devagar no começo (o quadrado do avanço): as mãos descem pela frente das coxas, onde as coxas quase se tocam, e só vão para trás perto dos joelhos, onde há espaço. Com o braço indo para trás por igual, a corda entrava 0,8 cm na parte de dentro das coxas no meio da descida, com os pés a 20 cm do meio. Com o caminho de agora, os pés ficaram a 21 cm do meio (42 cm entre as bolas; o quadril tem 32,4 cm de largura): a corda passa a 1,9 cm das coxas e as mãos a 0,4 cm (a 20 cm, as folgas caem para 1,6 e 0,3 cm).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polia embaixo, com a corda | consenso | a roldana a 17,8 cm (o ponto mais baixo da coluna); a corda da tabela (`corda-triceps`), cada ramo esticado da mão à bucha (25,2 cm) | sim |
| De costas para a torre, dois passos à frente | consenso | a roldana 140 cm atrás do meio da pelve, em pé | sim |
| Pés um pouco mais abertos que o quadril, joelhos um pouco dobrados | consenso | a bola dos pés a 21 cm do meio (42 cm entre elas); o joelho dobra 12° em pé e 20° embaixo | sim (um pouco mais que "um pouco": ver "o que não ficou bom") |
| A corda passando entre as pernas, segura com as duas mãos | consenso | as mãos lado a lado, cada uma num ramo; a corda e o cabo passam a no mínimo 1,9 cm da pele (da coxa) | sim |
| Descida (~2 s): empurra o quadril para trás, com a coluna reta | consenso | 2 s; o quadril dobra 80,6° e vai 20,3 cm para trás; a lombar não dobra além da curva de repouso (0°); o peito vai de 1,3° a 63° à frente | sim |
| Deixando as mãos passarem entre as pernas | consenso | embaixo, o centro das mãos entre os joelhos e 4,9 cm atrás do centro deles; no ciclo, a pele das mãos fica a no mínimo 0,4 cm da pele das pernas | sim |
| Sobe até ficar em pé, sem passar | consenso | em pé, o quadril dobra 6,4° e o peito fica 1,3° à frente da vertical | sim |
| Os braços só seguram a corda | consenso | o cotovelo fica em 4° o ciclo todo | sim |
| O peso sobre os pés | consenso | o centro de massa a 0 cm do meio do pé | sim |
| A pilha sobe | desenho | o cabo anda 27,1 cm e a pilha sobe 13,6 cm (a relação 2:1): mais alta em pé (as mãos à frente, o cabo mais longo), embaixo no fundo | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas de desenho da ficha (`joelho.baixo`, `tronco.baixo`, `braco.cima`, `maos.folga`, `pilha.folga`). (2) O modo Músculos abre de três quartos por trás (posteriores: 402 cm²); de lado, aparecem pouco (68 cm²).

## As vistas

**De lado** (padrão: o quadril que vai para trás, a coluna reta, os braços que só seguram e o cabo que vai para a polia) e **de três quartos por trás** (a corda entre as pernas, até a roldana; os posteriores e o glúteo; é a vista padrão do modo Músculos). De trás, a coluna fica na frente do corpo; de três quartos de frente, a corda entre as pernas some atrás das coxas.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Puxar com os braços | de lado, em pé | os cotovelos dobram 75° (o certo: 4°) e as mãos sobem a corda até a frente do quadril, com o quadril ainda dobrado 34° (o peito a 23°): os braços subiram no lugar do quadril |
| Arredondar a lombar | de lado, embaixo | a lombar dobra 24° e a torácica 6°, e a bacia inclina 12° a menos (como no stiff): o quadril dobra 75° (o certo: 87°) |
| Inclinar para trás no topo | de lado, em pé | o peito vai 10,7° para trás da vertical, com a lombar arqueada 16° |

Nenhum erro ficou sem desenho.

## O equipamento

- **Coluna de polia:** a da tabela de objetos, cortada em cima a 120 cm (a polia está embaixo).
- **Corda:** a da tabela (`dados/objetos/corda-triceps.json`), a mesma do tríceps e do abdominal. Aqui cada mão segura o ramo com a ponta de borracha do lado do polegar e a corda sai pelo lado do dedo mínimo, para a bucha (é a ponta que segura a corda contra o puxão do cabo); a peça desenha a ponta sempre do lado de fora da mão.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Do stiff: a coluna longa (pescoço na linha do tronco) e os joelhos quase no mesmo ângulo.

## O que não ficou bom

- **Os pés ficaram bem abertos** para "um pouco mais abertos que o quadril": 42 cm entre as bolas dos pés (o quadril tem 32,4 cm; os acrômios, 40,8 cm), porque com menos as folgas da corda e das mãos até as coxas ficam no limite. Na academia a corda costuma raspar nas coxas; o desenho não deixa atravessar.
- **A cena é larga** (a coluna 1,4 m atrás): de lado, o rótulo "quadril para trás" fica acima do corpo e o fio desce por cima do tronco; tirei o segundo rótulo dessa vista ("braços só seguram" foi para a de três quartos) para os fios não se cruzarem. O corpo fica menor que no stiff aprovado, que não tem coluna.
- **No modo Trajetória**, os nomes "mãos" e "quadril" ficam acima do corpo, com os fios por cima dele (mesmo motivo).
- **A força do cabo não entra no equilíbrio**, como em todas as animações na polia: de verdade, o cabo puxa as mãos para trás e a pessoa se inclina um pouco mais à frente.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (M10) achou que, de lado, no começo e no meio, a corda, que passa entre as pernas, era pintada por cima da coxa de perto (e, pequeno, de três quartos por trás, por cima da pelve). **Causa:** cada ramo da corda é um item, pintado pela profundidade do meio dele, e saía à frente do item do corpo (o tronco com as pernas de perto, pintado pela média deles).

**O que mudou.** Só no exercício: `viesNaVista` traz o corpo e o braço de perto (juntos, para o braço continuar por cima do corpo, como antes) 10 cm para a frente da corda de lado e 12 cm de três quartos por trás. A regra nova `pull-through-corda-pintada-no-lugar` mede os dois ramos, as pontas de borracha, a bucha e o cabo contra cada parte do corpo, dos dois lados, nas duas vistas (as mãos, nos ramos, não contam).

**Antes → depois** (pior quadro, cm de folga de pintura): de lado, a perna direita, que esconde a corda, −6,1 → 3,9; de três quartos por trás, −7,8 → 4,2; a perna esquerda (atrás da corda) 5,9 e 18,3, sem mudança; o tronco 26,3 → 38,3. A regra falha no estado antigo e passa no novo; a conferência automática dá 0 falha e os mesmos 2 avisos.

Como a ordem de pintura é medida (a regra nova, com o núcleo em `src/engine/novo/regras/ordem-de-pintura.ts`): em cada vista do guia (as do exercício e as dos erros), a cada 3 quadros do movimento certo e em cada erro no começo, no meio e no fim, um raio sai de cada ponto do eixo da peça até quem olha e de cada ponto da pele virada para quem olha (a 85% do raio) até quem olha; se ele atravessa o corpo (os dois lados, cada grupo à parte), aquela parte do corpo tem de ser pintada depois do item que pinta a peça; se atravessa a peça, antes. A folga é a diferença de profundidade de pintura (cm; negativa = ordem errada). Contam só os cruzamentos de 4 pontos ou mais; a pele que fica dentro de outra parte do corpo ou dentro da própria peça não conta; quando a mesma parte esconde e é escondida pela mesma peça, vale o lado com mais pontos.

**O que ainda não ficou bom.** Os antebraços continuam entrando na pelve e na cintura (pequeno da auditoria): por isso o raio diz que a coxa de perto "esconde" o braço, o que só é verdade porque o braço está dentro dela. Não mexi na pose.
