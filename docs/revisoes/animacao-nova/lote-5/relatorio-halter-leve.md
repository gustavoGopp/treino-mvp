# Lote 5 · Relatório do halter leve

Ramo: `worktree-agent-ad13b15f38a1b8282` (a partir de `8d6851d`). Entreguei os quatro itens, na ordem pedida.

## 1. O halter novo (`src/engine/novo/dados/objetos/halter-leve.json`, objeto `halterLeve`)

Halter sextavado emborrachado de **10 lb (4,5 kg)**:

| medida | valor | fonte |
|---|---|---|
| comprimento total | 26,7 cm (10,5 pol) | RitFit, Hex Dumbbells Technical Specification (`ritfit-hex`, a mesma ficha do halter de 25 lb) |
| largura da cabeça | 10,2 cm (4 pol) | RitFit |
| altura da cabeça | 9,1 cm (3,6 pol) | RitFit |
| diâmetro do cabo | 2,8 cm (1,1 pol) | RitFit (o Titan de 10 lb dá 28 mm, igual) |
| comprimento livre do cabo | 13,0 cm (5,125 pol) | **outro fabricante:** Titan Fitness, 10 lb Rubber Hex Dumbbells (página pública; a RitFit não publica essa coluna) |
| massa | 4,5 kg (10 lb) | RitFit |

Nada ficou provisório. Ressalva: a página da Titan foi lida por resumo automático (como a de 25 lb já era).

A peça aceita o tamanho por um campo opcional `objeto` (o id na tabela; sem ele, `'halter'`) em `pecas.ts` (`halter()` e o tipo `Peca`) e em `equipamento.ts` (o desenho realista). Conferi: `npm run conferir:animacao` sem falha, e os quadros de `afundo` e `supino-reto` saíram idênticos byte a byte antes e depois.

## 2. `rosca-inclinada` (nova)

- **Conferência:** 0 falha, 3 avisos (linhas de desenho; antebraço "só ajuda"; vista de lado não serve ao modo Músculos, que fica de frente: 192 cm² contra 50).
- **Como fechou:** halter de 10 lb, encosto a 60°, braço na vertical de lado (0°), aberto 25° de frente, palma a 85°, topo a 132° (pegada a 26,3 cm do ombro), e a mão encostada na cabeça de dentro do halter (o halter corre 2,2 cm para o lado do polegar: o cabo tem 13 cm e a mão, 8,6). A cabeça do halter fica a −0,2/−0,3 cm da pele na quina do sextavado (no meio e no topo, cintura e peito), dentro da tolerância da regra (−0,5) e invisível nos quadros. Regras novas com nome da família: `halter-perto-do-ombro-na-inclinada` e `costas-e-cabeca-no-encosto-na-inclinada` (a do rascunho tinha o mesmo id de uma regra dos ombros e a conferência parava).
- **O que ainda não ficou bom:** de frente, os braços formam um "V" de 25° (`quadros/rosca-inclinada.png`, "frontal:tec:f0"); a ficha diz "braços pendurados na vertical". Abaixo de 25°, com a palma para a frente, a cabeça de dentro entra 1 a 4 cm no quadril, na cintura ou no peito: testei abertura de 8° a 34°, encosto 45–60°, palma 62–90°, topo 118–140°, braço até 5° atrás e as escápulas. O encosto ficou em 60° (a ponta mais em pé da faixa do app): a 45° bate mais. O pé foi a 57 cm do quadril para os dois rótulos de lado irem para o lado do encosto sem o fio cruzar o corpo.
- **Banco:** ficou um só desenho, `pecas-de-cena/banco-regulavel.ts` (`bancoRegulavelNaCena`): o do `desenvolvimento`, que pinta o assento atrás das coxas (no do rascunho, de frente, o assento ficava por cima das coxas), com o trilho debaixo do encosto do rascunho; o assento agora vai 50 cm para trás na pintura (eram 30). Apaguei `banco-inclinado.ts` e `banco-regulavel-provisorio.ts`. O `desenvolvimento` usa a mesma peça: 0 falha, quadros e folha refeitos, conferência escrita (`lote-3/desenvolvimento.md`) atualizada.
- **Risco de o Gustavo não gostar: médio**, pelo "V" dos braços de frente.

## 3. `rosca-alternada` (e `rosca-martelo`)

- **Alternada:** 0 falha, 3 avisos (linhas de desenho; antebraço "só ajuda"; vista de lado não serve ao modo Músculos). Braços a 6° (eram 17°) e palma a 85° (era 64°). Para a cabeça de dentro não raspar a frente da coxa no começo da subida, o braço fica 5° à frente da linha do tronco (a regra aceita até 10°) e o cotovelo embaixo a 12° (era 8°). Folga mínima −0,1/−0,2 cm na quina, embaixo; não se vê. Testei a mão encostada na cabeça (não ajuda aqui) e a palma a 90° (−1,0 cm).
- **O que não ficou bom:** os 5° à frente (de lado mal se vê, "lateral:tec:f0"); a palma a 85° e não 90°.
- **Risco: baixo.**
- **Martelo:** passou ao mesmo halter (olhei os quadros: de frente a cabeça cobre menos a mão e o bíceps). 0 falha, 3 avisos (os mesmos de antes); folga de 2,1 cm. A cabeça ainda cobre parte da mão de frente embaixo ("frontal:tec:f0"), como já estava registrado. **Risco: baixo.**

## 4. `elevacao-halteres`

- **Conferência:** 0 falha, 3 avisos (linhas de desenho; frente do ombro "só ajuda"; vista de cima não serve ao modo Músculos, 10 cm² contra 78).
- **Embaixo, na frente das coxas:** só trocar o halter levava a mão de 23 para 21,7 cm do meio do corpo (ainda ao lado da coxa). Com o braço pendendo no plano de 75° (era 55°), a mão fica a 16 cm, na frente da coxa, com a cabeça a 2,7 cm da pele. A transição do plano passou de 40% para 50% do caminho (com 40%, o ritmo dava aviso de 16,8%; agora 13,4%). A massa na conta é a do halter, 4,5 kg (eram 5 kg de desenho).
- **O que não ficou bom:** no começo da subida o braço sai mais para a frente antes de abrir para o lado; de cima, embaixo, os halteres ficam meio escondidos pelos ombros ("cima:tec:f0"); o fio de "leva a mão para longe" passa por cima do outro halter embaixo ("frontal:tec:f0"), como já passava.
- **Risco: baixo a médio**, pelo começo da subida mais à frente.

## Arquivos comuns que mexi (mínimo aditivo)

- `src/engine/novo/pecas.ts` e `src/engine/novo/equipamento.ts`: o campo opcional `objeto` do halter (sem ele, nada muda).
- `src/engine/novo/dados/objetos/registro.ts`: uma linha.
- Núcleos de família (não estão na lista de comuns, mas são de outros lotes): `exercicios/dobrar-o-cotovelo.ts` (opção `halter` em `criarRoscaEmPe`; `halterNaMao` com o id do halter e o deslocamento para o polegar, ambos opcionais) e `exercicios/elevar-o-braco.ts` (opção `halter` em `criarElevacao`); `exercicios/empurrar-para-cima.ts` (só a troca do banco).
- Não incluí os arquivos gerais: `npm run conferir:animacao` rodou sem falha nas 49 animações e desfiz `conferencia.*`. `npm run check` passou (57 arquivos, 896 testes).

## Commits (ramo `worktree-agent-ad13b15f38a1b8282`)

- `2ec5ab4` Acrescenta o halter sextavado de 10 lb à tabela de objetos
- `b0f30d5` Lote 5: rosca inclinada com o halter de 10 lb e um só banco regulável (traz o rascunho `b512878` por cherry-pick, no mesmo commit)
- `886a7de` Lote 5: rosca alternada e martelo com o halter de 10 lb
- o último commit, "Lote 5: elevação lateral com o halter de 10 lb", traz também este relatório (o hash está na resposta)
