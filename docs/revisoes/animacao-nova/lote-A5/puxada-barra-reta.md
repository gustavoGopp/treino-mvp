# Lote A5 · Puxada ajoelhado na polia alta com barra reta (`puxada-barra-reta`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Ajoelhado no colchonete, de frente para a torre, a meio passo dela; polia no alto, a barra reta nas duas mãos, por cima, um pouco mais aberta que os ombros. Os braços começam estendidos para cima, na direção da polia, e puxam a barra até a parte de cima do peito, com os cotovelos para baixo e para trás. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/puxada-barra-reta.md`. Cartão do app: `src/conteudo/exercicios/puxada-barra-reta.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/puxada-barra-reta.json`.
- Animação: `src/engine/novo/exercicios/puxada-barra-reta.ts` (ajoelhado como na puxada unilateral e no abdominal na polia aprovados; a coluna e o cabo de `polia-bracos.ts`; a barra de `pecas-de-cena/polia-braco-barra-reta.ts`). Regras novas: `src/engine/novo/regras/uma-torre.ts` (`puxada-barra-pegada-mais-aberta`, `puxada-barra-no-alto-do-peito`, `puxada-barra-cotovelos-para-baixo-e-para-tras`).
- Quadros grandes: `../quadros/puxada-barra-reta.png`. Sem folha: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá número; ela segue, por analogia, a puxada unilateral ajoelhado. Da ficha de movimento dela (aprovada) saem a coluna a 70 cm dos joelhos, os joelhos na largura do quadril, a coxa quase vertical, o ombro que sobe 10° no alongado e desce 6° no fim, os tempos e o erro do tronco. **O começo não é um ângulo escolhido:** a barra fica na linha que vai do meio dos ombros à roldana, onde cada braço chega com o cotovelo dobrado 8° (o cabo puxa a barra para a polia). **O fim também não:** a barra fica 6 cm abaixo do centro dos ombros (ao longo do tronco), a 1 cm da pele do peito, medida na superfície do Boneco. No caminho, a barra desce em linha reta, à frente do rosto.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polia no alto, com a barra reta | consenso | a roldana a 193 cm (o ponto mais alto da coluna), 54 cm à frente dos joelhos; o cabo a 27° da vertical no começo e 19° no fim | sim |
| Ajoelhado de frente para a torre | consenso | a pele dos joelhos no colchonete (−0,4 cm), os joelhos a 17,4 cm um do outro (os quadris a 16,7 cm), o peito do pé no colchonete | sim |
| A uma distância em que os braços ficam estendidos para cima | consenso | no começo, o cotovelo dobra 8°; a barra 52 cm acima e 37 cm à frente do centro dos ombros | sim |
| Pegada um pouco mais aberta que os ombros | consenso | os centros das mãos a 42 cm, o ciclo todo (os centros dos ombros a 34,9 cm; os acrômios a 40,8 cm); a beirada de fora de cada mão a 0,1 cm da ponta da barra | sim (ver "o que não ficou bom") |
| Pegada por cima | consenso | o polegar para dentro, ao longo da barra (100%) | sim |
| Tronco reto | consenso | o peito 6° atrás da vertical, parado (a base do pescoço anda 0 cm) | sim |
| Puxa a barra até a parte de cima do peito | consenso | no fim, o centro da barra 10 cm abaixo da fúrcula do esterno (a linha das axilas fica a 10,3 cm), a barra a 1,1 cm da pele do peito | sim |
| Cotovelos para baixo e para trás | consenso | no fim, o centro do cotovelo 26,7 cm abaixo do centro do ombro e 4 cm atrás dele; o cotovelo dobra 143° | sim (o cotovelo dobra 143°, perto da média da tabela, 148°) |
| Volta (~2 s) até os braços estenderem, deixando as costas alongarem | consenso | 2 s; o ombro sobe de novo no alongado: a ponta do ombro desce 5,1 cm do começo ao fim | sim |
| A barra passa à frente do rosto; o cabo reto; a pilha sobe | desenho | a barra a no mínimo 1,1 cm da pele (do peito, no fim); o cabo a no mínimo 11,6 cm da pele; o cabo anda 63,8 cm e a pilha sobe 31,9 cm | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) A flexão plantar do tornozelo em 80,7° (o peito do pé no colchonete, ajoelhado; o mesmo aviso da puxada unilateral aprovada). (2) As linhas de desenho da ficha (`coxa.inclinacao`, `cervical`, `cabeca`, `barra.folga`, `pilha.folga`). (3) O modo Músculos abre de três quartos por trás (as costas: 594 cm²); de lado, aparecem pouco (176 cm²).

## As vistas

As mesmas da puxada unilateral aprovada: **de três quartos por trás** (padrão: os dois braços puxando, as costas, a coluna e o cabo) e **de lado** (a barra que desce à frente do rosto até o peito, o tronco reto). De trás, a coluna fica atrás do corpo e a barra também; de lado, o principal (as costas) quase não aparece.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Deitar o tronco para trás | de lado, no fim | o peito vai de 6° a 32° atrás da vertical enquanto a barra desce; a base do pescoço anda 21,6 cm para trás e para baixo |
| Puxar pela nuca | de três quartos por trás, no fim | o pescoço dobra 22° e a cabeça 10° (a cabeça vai à frente); a barra desce por cima e atrás da cabeça até 9 cm acima do centro dos ombros, atrás do pescoço, a 2 cm da pele; os cotovelos abrem para os lados (o braço 66° para o lado; o certo, 28°) e o cotovelo dobra 160° |
| Volta curta | de lado, no começo | a volta para em 45% do caminho: o cotovelo fica dobrado 113° (o certo: 8°) e o ombro não sobe |

Nenhum erro ficou sem desenho. No erro da nuca, o caminho da barra é uma curva por cima da cabeça (o controle 6 cm acima do alto da cabeça); medido em 41 pontos do erro, a barra nunca chega a menos de 2 cm da pele.

## O equipamento

- **Coluna de polia:** a da tabela de objetos, cortada em cima a 208 cm (de lado, o quadro é largo e mostra a coluna inteira).
- **Barra reta:** a de 20 pol (50,8 cm) da Rogue, a mesma da rosca e do tríceps (a taxonomia tem um acessório só, "barra reta para polia").
- **Colchonete:** o da tabela (medidas provisórias), como na puxada unilateral.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Da puxada unilateral, valem o ombro que sobe em cima e desce no fim e a coluna a meio passo; da rosca na polia, a barra de largura fixa.

## O que não ficou bom

- **A barra de 20 pol é curta para uma puxada.** Com a pegada "um pouco mais aberta que os ombros" (42 cm entre os centros das mãos, 1,2 cm além dos acrômios), as mãos chegam às pontas da barra (0,1 cm de sobra). Uma barra de puxada costuma ser mais longa; como o app tem um acessório só ("barra reta para polia"), mantive a mesma peça das outras animações. Se o Gustavo quiser a pegada mais aberta, é preciso uma barra longa nova, com ficha de fabricante.
- **De três quartos por trás, no fim, a barra fica escondida pelo corpo** (está à frente do peito). De lado ela aparece.
- **O corpo fica menor no quadro de três quartos** (a coluna de 2,39 m entra inteira de lado e quase inteira de três quartos), do mesmo tamanho da puxada unilateral aprovada.
- **De lado, o fio do rótulo "estende tudo na volta"** cruza o cabo para chegar ao punho. Troquei a dica "peito aberto" (que apontava para o ombro e cruzava o fio do cotovelo) por esta, que fica do outro lado.
- **A força do cabo não entra no equilíbrio**, como em todas as animações na polia.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (M7) achou que, no erro "Puxar pela nuca", de três quartos por trás, o cabo atravessa a cabeça (3,9 cm) e o pescoço (2,6 cm), e a fita do engate entra 1,6 cm no pescoço. A animação saiu da aprovação até a correção.

**A causa.** No fim do erro, a barra fica atrás do pescoço, rente à nuca (2 cm), e o cabo sobe dela até a roldana, no alto e à frente: com o pescoço dobrado só 22° e o queixo 10°, a cabeça ficava na linha do cabo.

**A mudança** (só no erro, dentro do que a ficha diz: "a cabeça vai à frente e a barra desce atrás dela, até a nuca"):

1. O pescoço dobra 30° (era 22°; `erro.nuca.cervical`) e o queixo vai ao peito 16° (era 10°; `erro.nuca.cabeca`): a cabeça vai mais à frente e para baixo.
2. A barra para 12 cm acima do centro dos ombros (era 9; `erro.nuca.acima`) e a 5 cm da pele da nuca (era 2; `erro.nuca.folga`).
3. O cabo do erro é desenhado em dois trechos, partidos no ponto mais perto do alto da cabeça, cada um pintado na sua profundidade: de três quartos por trás, o trecho que desce por trás da cabeça até a barra aparece por cima dela (um trecho só era pintado inteiro atrás do corpo, e o cabo parecia passar por dentro da cabeça). O ciclo certo e os outros erros continuam com o cabo inteiro.

**A regra nova** (comum, `cabos-fora-do-corpo-nos-erros`, em `regras/vistas-do-guia.ts`, ligada só nas fichas do tríceps com barra reta, da puxada com barra reta e da rosca de costas): em cada erro, em 6 instantes (0, 1/4, 1/2, 3/4, 1 e o instante do erro), cada cabo e cada fita do engate (os fios do quadro, fora os riscos da pilha), de meio em meio centímetro, contra o corpo inteiro (os dois lados): quanto entram em cada parte, medido na elipse do anel do Boneco interpolado ali. Não podem entrar mais de 0,5 cm. Ficam de fora as mãos que seguram e, delas, o antebraço a até 8 cm do punho, como na regra do cabo no ciclo (`polia-braco-cabos-livres-do-corpo`, que só olha o ciclo certo).

| | antes (`1828c0e`) | depois |
|---|---|---|
| "Puxar pela nuca": quanto o cabo entra no corpo (pior instante) | **4,4 cm (cabeça)** | passa a 1 cm da cabeça |
| "Deitar o tronco para trás" e "Volta curta" | a fita do engate passa a 0,6 cm da cabeça | igual |
| no fim do erro: pescoço, queixo, barra acima dos ombros, barra à nuca | 22°, 10°, 9 cm, 2 cm | 30°, 16°, 12 cm, 5 cm |

Rodada no estado de antes (o exercício e a ficha de `1828c0e`, com a regra nova), a conferência dá **1 falha** (esta regra). No estado novo: **0 falhas**, os mesmos avisos de antes.

**Olhado nos quadros** (`quadros/puxada-barra-reta.png`, e de três quartos por trás a 30%, 60%, 80% e 100% do erro): a barra passa por cima da cabeça e desce atrás dela até a nuca; o cabo sobe da barra por cima da nuca e do alto da cabeça até a roldana. No tema escuro e no cor de pele, igual.

**O que ainda não ficou bom.** A barra para a 5 cm da nuca, e não encostada nela: é o que deixa o cabo passar por cima da cabeça com a cabeça dobrada só até onde o pescoço vai sem forçar. A cabeça baixa mais que antes (46° somando pescoço e cabeça).
