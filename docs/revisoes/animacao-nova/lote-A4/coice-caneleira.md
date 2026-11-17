# Lote A4 · Coice de glúteo em quatro apoios com caneleira (`coice-caneleira`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em quatro apoios num colchonete, mãos sob os ombros, joelhos sob o quadril, costas retas; uma caneleira presa no tornozelo direito. Com o joelho dobrado o tempo todo, a coxa direita vai de sob o quadril até a linha do tronco, levando o pé para trás e para cima. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/coice-caneleira.md` ("o mesmo do coice com elástico"). Cartão do app: `src/conteudo/exercicios/coice-caneleira.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/coice-caneleira.json`. As linhas do corpo, do caminho da coxa e dos erros são as do coice com elástico (aprovado por delegação), com a fonte dita em cada uma; sai o elástico, entra a massa da caneleira.
- Animação: `src/engine/novo/exercicios/coice-caneleira.ts`, sobre o núcleo `exercicios/quatro-apoios.ts` (`emQuatroApoios`, `calibrarQuatroApoios`), **usado como está**: o núcleo e o coice com elástico não mudaram (o preparo do coice com elástico ficou igual). A pose da perna que trabalha (a coxa atrás da vertical, o joelho a 90°, o pé em ângulo reto; nos erros, a bacia que vira ou rola) é a mesma conta do coice com elástico, reescrita neste arquivo (lá ela não é exportada, e exportá-la levaria junto a ficha do elástico). A caneleira é a peça aprovada (`pecas-de-cena/caneleira.ts`, `caneleiraNaPerna`), no tornozelo direito, sem mudança.
- Regras: todas já existiam e servem igual: `quatro-apoios-maos-e-joelhos`, `coice-coxa-na-linha-do-tronco`, `coice-quadril-nao-gira` (`regras/quatro-apoios.ts`) e `quadril-caneleira-presa-no-tornozelo` (`regras/quadril-abrir-e-fechar.ts`, que mede a caneleira na canela direita e o ponto mais baixo dela contra o tampo). Nenhuma regra nova.
- Quadros grandes: `../quadros/coice-caneleira.png`. Sem folha (não há animação de hoje).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Quatro apoios: mãos sob os ombros | consenso | o centro da palma a no máximo 2 cm da vertical do ombro; o cotovelo dobrado 5°; as mãos não saem do lugar (0 cm) | sim |
| Joelhos sob o quadril | consenso | o joelho de apoio a 0 cm da vertical do quadril, no tampo do colchonete (−0,4 cm: amassa), parado (0 cm) | sim |
| Costas retas, abdômen firme | consenso | a lombar 6° menos curva que em pé, parada (a bacia gira 0° no ciclo); a linha dos ombros ao quadril sobe 15,8° à frente (a mesma conta do coice com elástico: braços mais longos que as coxas) | sim |
| Início: joelho sob o quadril | consenso | a coxa 12° atrás da vertical, o joelho ~1 cm acima do colchonete | sim |
| Estende até a coxa ficar na linha do tronco | consenso | no alto, a coxa faz 0° com a linha do tronco (o joelho a 0 cm dela) | sim |
| "Lombar parada" | consenso | a bacia e a lombar não se mexem no ciclo (0°) | sim |
| Com o joelho dobrado | consenso | o joelho a 90° do começo ao fim | sim |
| Quadril de frente para o chão | consenso | a linha dos quadris a 0° da horizontal; a bacia anda 0 cm; a coxa abre 0° para o lado | sim |
| Caneleira bem presa no tornozelo | consenso | o centro da faixa fica a 7,4 cm do centro do tornozelo, ao longo da canela, o ciclo todo (a borda de baixo a 2 cm); o ponto mais baixo dela, embaixo, fica 6,6 cm acima do colchonete | sim |
| Coice ~1 s, pausa curta, volta ~2 s | consenso | 1 s, 0,6 s, 2 s; o maior salto de velocidade é 5,2% do pico | sim |
| Colchonete | consenso | o colchonete da tabela (100 × 50 × 1,5 cm, provisório) sob as mãos e os joelhos; as pontas dos pés passam da ponta de trás dele (como no coice com elástico) | em parte |

Conferência automática (`node scripts/animacao-nova/conferir.mjs coice-caneleira`): **0 falha, 3 avisos**, os mesmos do coice com elástico menos o do elástico. (1) Flexão plantar de 80,7° no pé de apoio (o peito do pé no colchonete). (2) Extensão do punho de 92,7° (a mão espalmada sob o ombro). (3) As linhas de desenho (`cotovelo`, `cervical`, `pe.flexaoPlantar`, `colchonete.recua`, `caneleira.massa`).

## As vistas

**De lado** (a primeira, a que o app abre, e a padrão do modo Músculos: 155 cm² de glúteo contra 107 de três quartos): a coxa chegando à linha do tronco, a lombar parada e a caneleira no tornozelo. **De três quartos pela frente** (`quina`, a segunda): o corpo inteiro em quatro apoios e a perna subindo com a caneleira.

**Por que não de três quartos por trás**, como o coice com elástico: a faixa da caneleira é pintada por cima da perna inteira (o corpo e a perna de perto saem num contorno só, e a faixa tem de ficar por cima da canela). De trás, embaixo, a canela aponta para quem olha e o calcanhar fica entre a faixa e quem olha; a faixa aparecia como um disco azul por cima do calcanhar (`quinaTras:tec:f0`). No alto, de trás, a faixa fica certa (`quinaTras:tec:f1`, que está nos quadros). De três quartos pela frente, nada passa na frente da faixa.

## Erros

O cartão tem três erros. Dois viraram desenho, na ordem do app (os do coice com elástico, com os mesmos números); um ficou de fora.

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar no fim | de lado | a coxa passa 20° da linha do tronco (a caneleira sobe 15,5 cm a mais) e a bacia vira 14° para a frente: a lombar arqueia 14°, com o peito parado |
| Girar o quadril | de trás | a bacia rola 16° para o lado da perna que trabalha, em volta do quadril de apoio, e a coxa abre 20° para fora: a caneleira vai 18 cm para o lado |
| Parar longe da falha | — | **não desenhado:** é esforço (quantas repetições faltavam), sem nenhuma consequência visível no movimento; quem integra põe a exceção na lista `SEM_DESENHO` do teste da ponte |

## O equipamento

- **Caneleira de 2 lb** (`dados/objetos/caneleira.json`, 0,91 kg): a da abdução com caneleira aprovada, no tornozelo direito, o velcro do lado de fora. Entra no equilíbrio (a carga no centro da faixa).
- **Colchonete** (`dados/objetos.json`, medidas provisórias): o mesmo do coice com elástico, no mesmo lugar.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Não há correção registrada para este id (ele nunca teve animação).
- **Achado 1 da revisão de anatomia:** sem posteriores no coice (só o glúteo da perna que trabalha, `gluteo:R`).
- **Caneleira** (seção 3, peças de cena): a faixa acompanha a canela e fica vermelha na figura do erro.

## O que não ficou bom

- **No erro de girar o quadril (de trás), no começo da volta animada,** a faixa aparece por cima do calcanhar, pelo mesmo motivo da vista de três quartos por trás (ver "As vistas"). O quadro parado do erro (no alto) fica certo. Consertar pede pintar a faixa entre a canela e o pé, e o Boneco pinta o corpo e a perna de perto num contorno só: não mexi no desenho do corpo.
- **As pontas dos pés passam da ponta de trás do colchonete** (100 cm, medida provisória da tabela), como no coice com elástico.
- **As costas sobem 15,8° para os ombros** (as proporções com "mãos sob os ombros, joelhos sob o quadril"), como no coice com elástico.
- **O rótulo "coxa na linha do tronco"** aponta para o joelho, que no começo está embaixo: o texto fala do fim do movimento (o mesmo do coice com elástico).
