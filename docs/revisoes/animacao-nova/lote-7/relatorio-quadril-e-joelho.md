# Lote 7 · Relatório da família quadril e joelho (abdução, adução, mini band, extensão com caneleira)

De 15/11/2026. Os seis exercícios foram feitos, na ordem pedida. Ramo: `worktree-agent-a0afa0bf130515260` (sem push, merge nem pull request).

| Exercício | Falhas | Avisos | Risco de o Gustavo não gostar |
|---|---|---|---|
| `abducao-deitado` | 0 | 1 | **médio** |
| `aducao-deitado` | 0 | 2 | **médio** |
| `abducao-caneleira` | 0 | 1 | **médio** |
| `aducao-caneleira` | 0 | 2 | **médio** |
| `abducao-mini-band` | 0 | 3 | **médio** |
| `extensao-joelho-caneleira` | 0 | 1 | **baixo** |

## Por exercício

**`abducao-deitado`** (quadros: `quadros/abducao-deitado.png`). Avisos: as linhas de desenho da ficha de movimento. É o primeiro corpo deitado de lado do motor novo: deitado sobre o lado esquerdo, de costas para quem vê (vista padrão `frontal`, segunda `cima`; o erro de rolar o quadril vai na `quina`, que não está entre as duas vistas, porque de frente e de cima ele não se lê). O que não ficou bom depois de tentar: (1) para a cabeça apoiar no braço sem o pescoço dobrar 45°, o ombro de baixo sobe 30° de clavícula além do ritmo do braço (escolha de desenho, sem fonte; com isso o pescoço inclina 14°); (2) um degrauzinho de 1–2 px na emenda da cabeça com o pescoço, de costas (vem do desenho do corpo); (3) a mão de cima, espalmada no chão atrás do corpo, aparece pelo vão debaixo da cabeça (`frontal:tec:f0`); (4) o glúteo do modo Músculos é um bloco, e o desenho não tem glúteo médio. Risco médio: a pose é nova e o ombro de baixo encolhido é invenção de desenho.

**`aducao-deitado`** (quadros: `quadros/aducao-deitado.png`). Avisos: as linhas de desenho e o modo Músculos (de cima, os adutores não aparecem). Deitado sobre o lado direito (quem trabalha é o `R`, a perna de baixo) e **de frente para quem vê**, porque o desenho dos adutores fica na face da frente da coxa (de costas, 0 cm² em todas as vistas; de frente, 69 cm²). O que não ficou bom: o mesmo ombro de baixo; a mão de cima cruza na frente do peito; a canela da perna de cima tapa parte dos adutores no topo. Risco médio: a abdução fica de costas e a adução de frente (pode parecer incoerente lado a lado).

**`abducao-caneleira`** (quadros: `quadros/abducao-caneleira.png`). Avisos: as linhas de desenho. A pose da `abducao-deitado` com a peça nova da caneleira. O que não ficou bom: **sem colchonete**, embora a ficha peça (o da tabela tem 100 × 50 cm provisórios, curto para o corpo deitado, e a peça de `pecas.ts` deita ao longo de z; não mexi em `pecas.ts`); a caneleira vai sempre para a frente da perna na pintura (nas vistas do lote, sem problema); a caneleira não fica vermelha no erro (a correção de 04/11 pedia). Risco médio (o mesmo da abdução, mais o colchonete).

**`aducao-caneleira`** (quadros: `quadros/aducao-caneleira.png`). Avisos: as linhas de desenho e o modo Músculos de cima. A pose da `aducao-deitado` com a caneleira na perna de baixo (a faixa fica 4,8 cm acima do chão embaixo). O que não ficou bom: o mesmo da `aducao-deitado` e o colchonete. Risco médio.

**`abducao-mini-band`** (quadros: `quadros/abducao-mini-band.png`). Avisos: as linhas de desenho; o modo Músculos (de frente, o glúteo não aparece; de lado, 155 cm²); e a regra do elástico, que espera a faixa mais esticada no começo do ciclo (aqui o ciclo começa fechado, na ordem do cartão; ela estica de 1,4 a 2,3 vezes, máximo do fabricante 2,5). Sentado na beira da cadeira firme (núcleo sentado novo), a mini band (peça nova) em volta das coxas, 8 cm acima dos joelhos. O que não ficou bom: de frente, a faixa se lê como um anel em volta do colo (é a geometria certa, mas pode confundir; de três quartos ela se lê melhor, só que de três quartos os joelhos abrindo não aparecem); o glúteo médio não existe no desenho; a cadeira é pintada atrás do corpo (`cenario`), sem ordem por profundidade de verdade. Risco médio: o anel de frente.

**`extensao-joelho-caneleira`** (quadros: `quadros/extensao-joelho-caneleira.png`). Aviso: as linhas de desenho. Sentado na cadeira encostada na parede, só a canela sobe (a coxa gira 0°), joelho de 88° a 10°. O que não ficou bom: o pé fica só 4,3 cm acima do chão embaixo (a cadeira tem 45,1 cm; com o joelho mais dobrado o pé encostava); os rótulos e o nome de um erro ficam por cima da parede, do lado esquerdo (do direito, o fio cruzava a perna esticada); o item de ritmo da conferência sai "sem movimento" (ela não acompanha a canela). Risco baixo.

## Arquivos comuns que mexi, e por quê

- `src/engine/novo/esqueleto.ts`: **um campo opcional novo**, `cervicalLado` (a inclinação do pescoço para o lado), somado na região cervical como `lombarLado` e `toracicaLado` já faziam. Sem ele, a cabeça deitada de lado não tinha como apoiar no braço de baixo. Nada do que existia mudou; `npm run conferir:animacao` segue sem falha em todas as animações.
- Uma linha por arquivo nos três registros (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`).
- Mais nada comum. Para deitar de lado não foi preciso campo novo de tronco: a bacia gira 180° (`giro`), tomba 90° (`lado`), e rolar para trás é a inclinação `frente` (com o corpo tombado, ela gira em volta do eixo do corpo). Arquivos novos da família: `exercicios/quadril-deitado-de-lado.ts`, `quadril-abrir-deitado.ts`, `quadril-fechar-deitado.ts`, `quadril-sentado-na-cadeira.ts`, `regras/quadril-abrir-e-fechar.ts`, `regras/extensao-joelho-caneleira.ts`, `pecas-de-cena/caneleira.ts`, `pecas-de-cena/mini-band.ts`, `dados/objetos/caneleira.json`, `dados/objetos/mini-band.json`.

## Medidas provisórias

- Caneleira (`dados/objetos/caneleira.json`): massa, comprimento, largura e espessura são da Cuff Original de 2 lb (página pública da Global Industrial); **provisória** a largura da tira de velcro (4 cm); de desenho, a borda 2 cm acima do tornozelo.
- Mini band (`dados/objetos/mini-band.json`): comprimento, largura e espessura da Synergee de 12 pol (living.fit); o máximo de 2,5 vezes é de outro fabricante (RubberBanditz, a mesma faixa de 12 pol), porque a Synergee não diz.
- Colchonete: não usado (o da tabela é todo provisório).
- Nas fichas de movimento, as linhas de selo `desenho` que a conferência lista: o braço de baixo (abre 28°, cotovelo 15°, ombro +30° de clavícula), a mão de cima, a perna de baixo dobrada (45° e 90°), a flexão plantar, a massa da caneleira (a ficha não dá a carga), o pé de cima da adução (40 cm abaixo do quadril, 20° de giro), o joelho a 90° sentado e o quanto o assento amassa.

## Outros avisos

- Nos erros "rolar o quadril" da abdução, a vista do erro (`quina`) não está entre as duas vistas do exercício. Se o app só oferece as duas, é preciso decidir.
- As vistas padrão foram escolhidas olhando os quadros: deitado de lado, `frontal`; mini band, `frontal`; extensão, `lateral`.

## Ramo e commits

Ramo `worktree-agent-a0afa0bf130515260`:

- `9997353` Lote 7: abdução de quadril deitado de lado, sem carga
- `7a39f80` Lote 7: adução de quadril deitado de lado, sem carga
- `ab5f56b` Lote 7: abdução de quadril deitado de lado, com caneleira
- `0f750a9` Lote 7: adução de quadril deitado de lado, com caneleira
- `c7391ef` Lote 7: abdução de quadril sentado, com mini band
- o último: Lote 7: extensão de joelho sentado, com caneleira (com este relatório; o hash está na resposta)
