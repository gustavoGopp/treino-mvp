# Lote 5 · Rosca inclinada com halteres (`rosca-inclinada`)

De 15/11/2026. A quarta rosca do lote 5, que tinha ficado de fora (`relatorio-roscas.md`): com o halter de 25 lb (33 cm) a cabeça de dentro atravessava o quadril. Terminada a partir do rascunho do colega (`b512878`) com o **halter sextavado de 10 lb** (`dados/objetos/halter-leve.json`). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-inclinada.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-inclinada.json`.
- Animação: `src/engine/novo/exercicios/rosca-inclinada.ts` (o braço e o halter vêm do núcleo `exercicios/dobrar-o-cotovelo.ts`).
- Banco: `src/engine/novo/pecas-de-cena/banco-regulavel.ts`, a peça única do banco regulável (junta o banco provisório do `desenvolvimento` e o banco inclinado do rascunho; ver "O equipamento").
- Regras medidas: `src/engine/novo/regras/roscas.ts` (`braco-na-vertical-na-inclinada`, `costas-e-cabeca-no-encosto-na-inclinada`, `halter-perto-do-ombro-na-inclinada`, `halter-fora-do-banco`).
- Folha ao lado da de hoje: `../prototipos/folha-rosca-inclinada.png`. Quadros grandes: `../quadros/rosca-inclinada.png`.

## Como cada quadro é resolvido

- **Sentado e apoiado:** o encosto a 60°. A bacia desce até a nádega e a coxa apoiarem no assento e vai para trás até o sacro apoiar no encosto; o tronco inclina até as costas apoiarem; o pescoço dobra para trás até a nuca apoiar (no máximo 15° além da curva de repouso). O estofado amassa 1 cm. Nada disso é número escolhido.
- **O braço:** pende na vertical do mundo (atrás da linha do tronco), aberto 25° para o lado; só o antebraço sobe, como dobradiça. O polegar fica 85° para fora (palma para a frente).
- **O halter:** o sextavado de 10 lb (26,7 cm, cabeças de 10,2 cm). O cabo atravessa a palma e a mão segura encostada na cabeça de dentro (o halter corre 2,2 cm para o lado do polegar: o cabo livre tem 13 cm e a mão, 8,6 cm de largura). A massa (4,5 kg) entra nas cargas.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sente com as costas e a cabeça apoiadas, pés firmes no chão | consenso | o estofado amassa 1 cm sob as costas, 0,7 cm sob a nuca e 1 cm sob a nádega e a coxa; os pés e a pelve não saem do lugar (0 cm) | sim |
| Encosto a 45–60° (app) | consenso | 60° | sim (ver "O que não ficou bom") |
| Braços pendurados na vertical, atrás da linha do tronco | consenso | de lado, o braço fica a 0° da vertical o ciclo todo; o cotovelo fica 14,7 cm atrás da linha do tronco; de frente, o braço abre 25° | sim de lado; de frente, abertos |
| Palmas para a frente | consenso | antebraço supinado 85° o ciclo todo (90° = palma toda para a frente; a média da população é 87,5°) | sim |
| Ombros encostados no banco | consenso | a base do pescoço não anda (0 cm) | sim |
| Embaixo: braço quase estendido | consenso | o cotovelo dobra 8° | sim |
| Dobre só o cotovelo; o braço continua na vertical | consenso | o cotovelo anda 0 cm enquanto dobra de 8° a 132° | sim |
| Topo: halter perto do ombro, sem levar o cotovelo à frente | consenso | a pegada fica a 26,3 cm do centro do ombro (7,2 cm abaixo dele), com o braço a 0° da vertical | sim |
| ~1 s subindo, ~2–3 s descendo | consenso | 1,1 s e 2,4 s, pausa de 0,6 s embaixo e 0,4 s em cima; salto de velocidade de 6,1% | sim |
| O halter não atravessa o corpo (desenho) | — | a menor folga entre as cabeças do halter (medida até a quina do sextavado) e a pele é −0,3 cm (no meio e no topo da subida, junto à cintura e ao peito); a regra aceita até −0,5 cm | sim (ver abaixo) |
| O halter não atravessa o banco nem o chão (desenho) | — | folga mínima de 9 cm (do estofado) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-inclinada`): **0 falha, 3 avisos**: as linhas de desenho da ficha de movimento (`apoio.amassa`, `cervical.min`, `pes.meiaDistancia`, `pes.aFrente`, `braco.paraFora`, `maos.supinacao`, `maos.encostaNaCabeca`, `carga`); o antebraço em "só ajuda" (correção de 04/11 das roscas, fora da lista do conteúdo); e a vista de lado, que não serve ao modo Músculos (de frente 192 cm² do bíceps, de lado 50 cm²): o modo Músculos fica de frente.

## Por que 25° de abertura e a mão encostada na cabeça

Com o braço na vertical e a palma para a frente, o antebraço sobe ao lado do quadril e da cintura (o cotovelo fica na altura do quadril) e, no topo, o halter fica atravessado na frente do peito. Medido com o halter de 10 lb, a folga mínima da cabeça de dentro no corpo:

| abertura do braço | mão no meio do cabo | mão encostada na cabeça (2,2 cm) |
|---|---|---|
| 12° | −4,3 cm (quadril) | — |
| 16° | — | −2,2 cm (quadril) |
| 20° | −2,7 cm (cintura) | −1,4 cm (coxa) |
| 25° | −1,9 cm | −0,2 cm (cintura, no ciclo); −0,3 cm com os erros |
| 30° | −0,5 a −1,1 cm | — |

Testei também o encosto a 45° e 55° (pior: o tronco mais deitado põe a cintura no caminho), a palma de 62° a 90°, o topo de 118° a 140°, o braço até 5° atrás da vertical e as escápulas mais para trás ou mais para a frente: nenhum deu folga positiva com o braço menos aberto. O resto que sobra (−0,2 a −0,3 cm) é na quina do sextavado e não se vê nos quadros.

## As vistas

- **De lado** (padrão da técnica): o braço na vertical (com o prumo), os ombros no encosto e o antebraço subindo. Os dois rótulos ficam do lado do encosto, e o fio só cruza o estofado.
- **De frente:** os dois braços e o bíceps (padrão do modo Músculos). Testei a de três quartos (`quina`): o banco e o corpo se leem melhor e a abertura do braço quase some, mas só um bíceps aparece no modo Músculos.

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Cotovelos vão para a frente (de lado) | o braço sai da vertical e vai 45° à frente enquanto o cotovelo dobra 115° |
| Ombros saem do encosto (de lado) | o tronco gira 18° para a frente em volta do quadril, o braço vai 20° à frente e o ombro 10° (escápula) |
| Não estender embaixo (de lado) | embaixo, o cotovelo para dobrado 55° |

## O equipamento

- **Halter:** o sextavado de 10 lb da tabela (`halterLeve`), pelo campo novo `objeto` da peça `halter`.
- **Banco regulável:** havia dois desenhos provisórios (o do `desenvolvimento`, `banco-regulavel-provisorio.ts`, e o do rascunho, `banco-inclinado.ts`), com as mesmas medidas e os mesmos volumes da conferência. Ficou um só, `pecas-de-cena/banco-regulavel.ts`: a base é a do `desenvolvimento`, que pinta o assento atrás das coxas (no rascunho, de frente, o assento aparecia por cima das coxas), com o trilho debaixo do encosto do outro. O assento agora vai 50 cm para trás na pintura (eram 30: de frente, na rosca, as coxas mais deitadas ainda ficavam por baixo dele). O `desenvolvimento` usa a mesma peça: continua com 0 falha e os quadros e a folha foram refeitos.

## Correções já feitas que esta animação respeita

- Antebraço "só ajuda" (listrado) nas roscas (04/11, `SO_AJUDA`).
- A vista de lado como principal nas roscas (04/11) na técnica; de frente no modo Músculos (medido).

## Músculos

Bíceps (principal) e antebraço (só ajuda). O braquial não existe como grupo no desenho.

## O que não ficou bom

- **De frente, os braços abrem 25°** (`quadros/rosca-inclinada.png`, "frontal:tec:f0"): a ficha diz "braços pendurados na vertical"; de lado eles estão na vertical (0°), mas de frente formam um "V". Abertos menos que isso, com a palma para a frente, a cabeça de dentro do halter entra 1 a 4 cm no quadril, na cintura ou no peito (tabela acima). A saída seria aceitar na ficha a palma neutra embaixo, girando para a frente na subida.
- **Encosto a 60°, não 45°:** o app aceita 45–60°; a 45° o tronco fica mais deitado e o halter atravessa a cintura (−3 a −5 cm).
- **A mão encosta na cabeça de dentro do halter** (2,2 cm fora do meio do cabo): é como muita gente segura na rosca supinada, mas é escolha de desenho, sem fonte.
- **O pé foi 5 cm mais à frente** (57 cm do quadril; a canela inclina 5°) para os dois rótulos de lado ficarem do lado do encosto, sem o fio cruzar o corpo.
