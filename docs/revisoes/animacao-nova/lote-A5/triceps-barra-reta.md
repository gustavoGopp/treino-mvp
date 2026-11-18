# Lote A5 · Tríceps na polia com barra reta (`triceps-barra-reta`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de frente para a torre, a meio passo; polia no alto, a barra reta curta da polia nas duas mãos, por cima, na largura dos ombros; o tronco 15° à frente. Os cotovelos ficam parados ao lado das costelas e só os antebraços descem até os braços ficarem retos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-barra-reta.md`. Cartão do app: `src/conteudo/exercicios/triceps-barra-reta.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-barra-reta.json`.
- Animação: `src/engine/novo/exercicios/triceps-barra-reta.ts` (o corpo como no tríceps na corda aprovado; a coluna e o cabo de `polia-bracos.ts`; a barra de `pecas-de-cena/polia-braco-barra-reta.ts`, a mesma da rosca na polia). Regra nova: `src/engine/novo/regras/uma-torre.ts` (`triceps-barra-antebraco-acima-da-horizontal`).
- Quadros grandes: `../quadros/triceps-barra-reta.png`. Sem folha: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá número. As distâncias saíram do tríceps na corda aprovado (`triceps-corda.json`: pés, joelhos destravados, peito a 15°, pescoço, braço ao lado das costelas, cabo a 20° da vertical em cima e o erro do tronco), cada linha com a fonte `corda`. Dois números saem do texto: em cima, "os antebraços passam um pouco da horizontal" (o cotovelo dobra 105°, o antebraço fica 15° acima da horizontal); embaixo, "braços retos" (o cotovelo estende até 4°, ou até onde a barra passa a 1,5 cm das coxas: a conta dá 5,7°). A largura da pegada segue a correção de 04/11 da rosca na polia (a barra reta tem largura fixa: mãos a 36–38 cm).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polia no alto, com a barra reta | consenso | a roldana no ponto mais alto da coluna (193 cm), 69 cm à frente do meio da pelve; o cabo sai da ponta do mosquetão a 15° da vertical em cima e 23° embaixo | sim |
| Em pé de frente para a torre, tronco um pouco inclinado | consenso | o peito 15° à frente da vertical, parado (0° de variação; a lombar e a torácica não mudam) | sim |
| Cotovelos junto ao corpo | consenso | a pele do braço a 0,2 cm da pele do tronco; o braço 15° à frente da linha do tronco (na vertical) | sim |
| Mãos na barra na largura dos ombros | consenso | os centros das mãos a 36,8 cm, o ciclo todo (a distância entre os centros dos ombros); cada mão no eixo da barra (0 cm) | sim |
| Pegada por cima (a barra reta) | consenso | o polegar para dentro, ao longo da barra (100%); a pronação do antebraço fica em 90° (aviso: acima da média de 80°, abaixo do máximo de 108°) | sim |
| Estende os cotovelos com os cotovelos parados | consenso | o cotovelo anda 0 cm (no mundo e no tronco) enquanto vai de 105° a 5,7° | sim |
| Embaixo, os braços retos | consenso | o cotovelo dobra 5,7° (a barra passa a 3,2 cm da pele das coxas) | sim |
| Volta (~2 s) até os antebraços passarem um pouco da horizontal | consenso | 2 s; em cima, o antebraço 15° acima da horizontal | sim |
| O cabo reto da roldana à barra; a pilha sobe | desenho | o cabo passa a no mínimo 6 cm da pele; anda 50,3 cm e a pilha sobe 25,1 cm (a relação 2:1) | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) A pronação do antebraço em 90° (é a pegada por cima numa barra reta; dentro do máximo observado). (2) As linhas da ficha de movimento que são escolha de desenho (`pe.z`, `pelve.z`, `cervical`, `cabeca`, `braco.paraDentro`, `barra.folga`, `cabo.inclinacao`, `pilha.folga`; as seis primeiras vêm do tríceps na corda). (3) O modo Músculos abre de trás (tríceps: 218 cm²); de lado, ele aparece pouco (56 cm²), como no tríceps na corda.

## As vistas

As mesmas do tríceps na corda aprovado: **de lado** (padrão: o cotovelo parado, o antebraço que desce, o tronco, o cabo e a pilha) e **de trás** (os cotovelos colados; é a vista do erro de abrir os cotovelos e a padrão do modo Músculos). De trás, a barra fica escondida pelo corpo (só as pontas aparecem embaixo). De três quartos de frente, a barra aparece inteira, mas o corpo fica menor e o erro dos cotovelos se lê pior.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir os cotovelos | de trás, em cima | as mãos seguem na barra, no mesmo lugar; o cotovelo gira para fora: o braço abre 39° para o lado e vai 26° à frente (o certo: 0° e 15°), e o cotovelo anda 20 cm |
| Usar o tronco | de lado, embaixo | o peito vai de 15° a 34° à frente enquanto a barra desce, com a torácica 8° arredondada (como no tríceps na corda) |
| Volta curta | de lado, em cima | em cima, o cotovelo dobra só 55° (o certo: 105°): o antebraço para bem abaixo da horizontal |

Nenhum erro ficou sem desenho.

## O equipamento

- **Coluna de polia:** a da tabela de objetos, cortada em cima a 208 cm (a roldana e o carrinho aparecem; o corpo fica maior no quadro).
- **Barra reta:** a de 20 pol da Rogue (`dados/objetos/polia-braco-barra-reta.json`, a mesma da rosca na polia, que é o acessório "barra reta para polia" da taxonomia). A altura da aba e o mosquetão seguem provisórios (sem ficha).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Vale a da rosca na polia (04/11): a barra reta não "encolhe"; as mãos ficam a 36,8 cm o ciclo todo.

## O que não ficou bom

- **O rótulo "estende até o fim"** (no punho) tem o fio cruzando o antebraço no quadro de cima, porque o lado da torre não tem espaço e os dois textos ficam à esquerda; o mesmo acontece no "só o antebraço se mexe" da rosca na polia aprovada. Tentei pôr o texto acima do corpo: o quadro abria até mostrar a coluna inteira e o fio cruzava a cabeça.
- **De trás, a barra não aparece** no quadro de cima (fica atrás do corpo). O erro de abrir os cotovelos se lê pelos braços.
- **A força do cabo não entra no equilíbrio**, como em todas as animações na polia.
