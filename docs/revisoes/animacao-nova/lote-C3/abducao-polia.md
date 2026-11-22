# Lote C3 · Abdução na polia com tornozeleira (`abducao-polia`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de lado para a coluna de polia, a mão de dentro no trilho da torre; a tornozeleira na perna de fora, presa ao cabo da roldana mais baixa; a perna abre para o lado e volta cruzando à frente da outra. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-polia.md`. Cartão do app: `src/conteudo/exercicios/abducao-polia.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-polia.json`.
- Animação: `src/engine/novo/exercicios/abducao-polia.ts`, com o núcleo novo `exercicios/polia-no-tornozelo.ts` (a perna livre, a coluna baixa, a tornozeleira e o cabo, que o coice na polia também usa). O corpo segue a abdução com elástico aprovada (`exercicios/abducao-elastico.ts`, sem mudança: a mesma conta do equilíbrio sobre o pé de apoio, refeita aqui com a mão na torre). Peça nova: a tornozeleira (`pecas-de-cena/tornozeleira.ts`, `dados/objetos/tornozeleira.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-tornozeleira.png`). A coluna de polia é a aprovada (`pecas.ts`, `equipamento.ts`), cortada em cima a 150 cm.
- Regras: as da abdução em pé (`regras/abducao-em-pe.ts`), as do quadril (`regras/quadril-abrir-e-fechar.ts`), as das polias (`regras/polia-bracos.ts`) e as novas de `regras/avulsos-c3.ts`.
- Quadros grandes: `../quadros/abducao-polia.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, de lado para a torre, mão na torre para equilíbrio | consenso | a mão de dentro fecha no trilho da torre, a 112 cm do chão (0 cm do eixo, parada), o cotovelo a ~25°; a de fora na cintura | sim |
| Polia no ponto mais baixo | consenso | o carrinho a 17,8 cm (o mais baixo da coluna aprovada) | sim |
| Tornozeleira na perna mais longe da polia | consenso | na perna de fora, a borda de baixo 2 cm acima do centro do tornozelo, assentada (0,7 cm além da pele = o neoprene) | sim |
| Começo: perna cruzada à frente da outra | consenso | a coxa 8° para dentro e 17° à frente: o tornozelo de fora passa para o lado do de apoio e fica 23,2 cm à frente dele; as pernas não se tocam (0,3 cm) | sim |
| Leva a perna para o lado, joelho estendido, pé para a frente | um estudo | a perna abre de −7,6° a 30°, o joelho a 0°, os dedos a 0° da frente do corpo | sim |
| Tronco reto, sem inclinar para o lado oposto | consenso | a bacia não sobe nem gira (0°), o tronco não inclina (0°) | sim |
| (O peso no pé de apoio) | consenso | o centro de massa a 37% do calcanhar à ponta do pé de apoio, sobre o eixo dele; o corpo anda para o lado do apoio enquanto a perna abre | sim |
| O cabo da roldana ao tornozelo, a pilha que sobe | consenso | o cabo passa na frente do pé de apoio, a no mínimo 6,5 cm da pele; anda 44,7 cm e a pilha sobe 22,4 cm (relação 2:1) | sim |

**Conferência automática: 0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho).

## As vistas

**De frente** (padrão): a perna abrindo e cruzando, o tronco reto, os dedos para a frente, o cabo até a roldana. **De trás** (segunda e a do modo Músculos: o glúteo do lado que abre, 217 cm²; de frente ele não aparece).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Inclinar o tronco | de frente | o tronco cai 12,9° para o lado da torre e a bacia sobe 6° do lado da perna que abre (os números da abdução com elástico aprovada) |
| Girar o pé para fora | de frente | a perna gira 35° para fora e os dedos apontam para o lado |
| Embalar a perna | **sem desenho** | "A perna vai com impulso": é ritmo, sem pose diferente da certa. É o mesmo caso do "Balançar a perna" da abdução com elástico aprovada, que está em `SEM_DESENHO`; quem integra põe este lá também |

## O que não ficou bom

- **Visto de frente, a coluna fica de perfil** (estreita, só o trilho e os montantes); a roldana e a pilha aparecem pequenas. É o lado em que a pessoa fica dela.
- **A tornozeleira tem a argola e o mosquetão provisórios** (nenhuma ficha lida dá a medida) e, a 320 px, a argola some: lê-se a faixa escura com o velcro azul e o cabo.
- Cruzada, a perna de fora passa a 0,3 cm da outra: dentro da regra, mas rente.

**Risco de o Gustavo não gostar: médio** (a tornozeleira é peça nova e provisória em parte; o corpo segue a abdução aprovada).
