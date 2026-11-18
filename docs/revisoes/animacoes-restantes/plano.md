# Plano: as animações dos 81 exercícios que ainda são cartão de texto

De 17/11/2026. Parte A do prompt `docs/prompts/sessao-animacoes-restantes.md`. Os lotes estão em `lotes.json` (é desse arquivo que o script do efeito no treino lê); a frequência vem do teste de estresse regenerado hoje (`npm run auditoria:estresse` e `auditoria:base`: 149.760 programas fictícios, `docs/revisoes/auditoria/inventario.md`); o efeito no treino vem de `scripts/animacao-nova/efeito-no-treino.ts` (resultado em `efeito-no-treino.json`).

## 0. Decidido pelo Gustavo

| Decisão | O que ele disse, e quando |
|---|---|
| O modo de aprovação das 90 continua: quem integra confere tudo quadro a quadro e leva a ele só as de maior risco | "pode continuar assim" (17/11/2026) |
| As animações entram no app (o `animacaoId` na biblioteca e o texto do guia) uma vez por fase, depois de A, de B e de C | "liga por fase" (17/11/2026) |
| A rosca Scott no banco inclinado e a barra fixa só na descida, como estão | "pode aprovar a rosca scott assim" (17/11/2026); "pode aprovar a barra negativa assim" (18/11/2026) |
| A fase A não entra no app antes de uma sessão do gerador definir, com fonte, a ordem entre os exercícios equivalentes (hoje, com todos animados, o desempate vira a ordem alfabética do nome interno); enquanto isso, seguem as fases B e C e o texto do guia dos 42 | "pode seguir com a sua recomendação" (18/11/2026); prompt em `docs/prompts/sessao-desempate-do-gerador.md` |

## 1. Em uma frase, e a recomendação

São 81 exercícios em 11 lotes e três fases: **A** (42, com peças que o motor já desenha), **B** (10, com barra) e **C** (29, com máquina ou banco novo). Recomendo a ordem A → B → C, e, dentro de cada fase, o lote mais prescrito primeiro; a primeira máquina é a **cadeira flexora**, a mais prescrita das 81 (64 mil vagas no estresse, a 10ª do app). Duas coisas pedem decisão do Gustavo antes de as animações entrarem no app: **quando ligar** (seção 4: recomendo uma vez por fase, e não a cada lote) e **o que o gerador faz quando todas tiverem animação** (seção 4.3: o último desempate vira a ordem alfabética do nome interno).

A contagem por fase difere um pouco da do prompt (42 / 11 / 28): a rosca Scott pede o banco Scott, que é peça nova, e por isso fica nas máquinas (C3); a remada invertida pede a "barra baixa" (a barra do smith ou do suporte), e fica também em C3.

## 2. Os lotes

"Vagas" = quantas vezes o exercício foi prescrito nos 149.760 programas do estresse. Dentro do lote, a ordem é a da frequência.

| Lote | Exercícios (na ordem em que serão feitos) | Vagas | Núcleos que servem | O que falta no motor |
|---|---|---:|---|---|
| **A1** halteres no banco (6) | rosca Scott no banco inclinado, crucifixo no banco plano, crucifixo inverso, tríceps testa, crucifixo inclinado, supino no chão | 205 mil | `supino-reto`, `supino-inclinado` (deitado no banco), `remada-apoiada` (peito no banco inclinado), `dobrar-o-cotovelo` (roscas), `triceps-frances-base`, `troncoDeCostas` (`flexao-joelho`) | o arco do crucifixo deitado; deitado no chão com halteres; o braço apoiado no encosto (Scott) |
| **A2** elástico e mini band (11) | tríceps no elástico alto, abdução em pé com elástico, elevação lateral unilateral com elástico, rosca martelo com elástico, coice em quatro apoios com elástico, abertura com elástico, remada curvada com elástico, remada unilateral com elástico, extensão de joelho com mini band, abdução deitado com mini band, caminhada lateral com mini band | 114 mil | `elastico-faixa` (o caminho do elástico), `remada`, `dobrar-o-quadril`, `elevar-o-braco`, `dobrar-o-cotovelo`, `triceps-corda` com a âncora no alto, `quadril-sentado-na-cadeira`, `quadril-abrir-deitado`, a mini band | **quatro apoios** (serve também ao coice com caneleira, A4); **passo lateral** (os pés saem do lugar: a caminhada); perna livre em pé com a mão na parede (abdução) |
| **A3** halteres e kettlebell em pé (9) | afundo para trás alternado, crucifixo invertido curvado, tríceps francês unilateral, desenvolvimento unilateral com halter, agachamento com 2 halteres, elevação lateral unilateral com apoio, stiff unilateral com kettlebell, desenvolvimento em pé com halteres, goblet com kettlebell | 81 mil | `afundo-tras-peso-corpo`, `agachar`, `empurrar-para-cima`, `elevar-o-braco`, `triceps-frances-base`, `dobrar-o-quadril`, `stiff-unilateral` | nada novo; a mão livre num apoio (a parede, já usada como cena) |
| **A4** sentado ou deitado, com halter ou caneleira (6) | crucifixo invertido sentado, rosca concentrada, elevação lateral deitado de lado, coice com caneleira, elevação lateral com caneleira, crucifixo invertido com caneleira | 60 mil | `quadril-sentado-na-cadeira` (a cadeira), `dobrar-o-cotovelo`, `quadril-deitado-de-lado`, `elevar-o-braco`, a caneleira | o peito nas coxas, sentado; quatro apoios (de A2) |
| **A5** na polia (7) | puxada ajoelhado com barra reta, tríceps com barra reta, rosca de costas para a torre, supino inclinado entre as torres, crucifixo de baixo para cima, pull-through, supino entre as torres | 35 mil | `polia-bracos`, `polia-puxar` (ajoelhado, como o abdominal na polia), `triceps-corda`, a barra reta da polia, o banco entre as duas torres (`crucifixo-polia` + `supino-reto`), a corda | nada novo |
| **A6** pendurado, paralelas e suspensão (3) | barra só na descida, mergulho nas paralelas, remada alta na suspensão | 17 mil | `barra-fixa-base` e `pendurado`, as paralelas (`elevacao-joelhos-paralelas`), `na-fita` (`yt-suspensao`) | a caixa para subir na barra (peça simples) |
| **B1** barra longa, W e hexagonal (8) | hip thrust, agachamento livre, supino reto com barra, terra romeno, desenvolvimento em pé, rosca com barra W, remada curvada, terra com barra hexagonal | 60 mil | `ponte`, `agachar`, `supino-reto`, `dobrar-o-quadril`, `empurrar-para-cima`, `dobrar-o-cotovelo`, `remada` | **a barra rígida nas duas mãos** (as duas pegadas presas a um objeto só); a barra nas costas; os ombros apoiados no banco (hip thrust) |
| **B2** smith (2) | agachamento no smith, supino no smith | 6 mil | `agachar`, `supino-reto` | a barra que só anda na guia |
| **C1** máquinas de perna (9) | cadeira flexora, cadeira extensora, panturrilha no leg press, coice na máquina, adutora, abdutora, leg press, mesa flexora, hack | 202 mil | `quadril-sentado-na-cadeira` (sentado), `elevar-o-calcanhar` | **sentado ou deitado numa máquina com uma alavanca que gira num eixo** (o joelho alinhado ao eixo; o rolo que acompanha a perna); o leg press e o hack (o corpo deitado num trilho inclinado) |
| **C2** máquinas de tronco (9) | puxada pela frente, supino na máquina, remada articulada, desenvolvimento na máquina, voador, remada baixa na estação, voador invertido, barra no graviton, mergulho no graviton | 46 mil | `polia-puxar`, `pendurado`, as paralelas, `empurrar-para-cima` | os braços de máquina que giram (voador, supino, desenvolvimento, remada articulada); a plataforma do graviton que empurra os joelhos |
| **C3** braço, panturrilha, abdômen e bancos (11) | abdominal na máquina, rosca na máquina, panturrilha sentada, panturrilha em pé na máquina, rosca Scott, coice na polia, abdução na polia, tríceps na máquina, abdominal no banco declinado, hiperextensão, remada invertida | 91 mil | `dobrar-o-cotovelo`, `elevar-o-calcanhar`, `abdominal`, `polia-bracos` | a tornozeleira na polia; o banco romano e o banco Scott; a barra baixa |

Ordem das máquinas dentro de C: pelas mais prescritas (C1 primeiro). C2 vem antes de C3, apesar de ter menos vagas, porque as nove de C2 dividem as mesmas peças (o assento de máquina, os braços que giram) e C3 é uma mistura de peças avulsas.

## 3. As peças novas

Cada peça parte do cartão de equipamento que já existe (`public/equipamento/<cartão>.svg`, feito por `scripts/desenhos-equipamento/realista/itens.mjs`) e leva as medidas de fabricante já lidas em `docs/revisoes/animacao-nova/pesquisa/04-objetos.md` (seções 1, 2, 4 e 13). As medidas gerais (comprimento × largura × altura) estão lá; **as medidas que fazem a máquina funcionar** (altura do assento, posição do eixo, comprimento da alavanca, ângulo do trilho) quase nunca aparecem nas fichas comerciais e terão de vir dos manuais públicos dos fabricantes ou, na falta, do corpo (o eixo da cadeira se alinha ao joelho, por regra da técnica), com o selo `desenho` e o motivo.

| Peça | Para | Cartão de onde parte | Fonte da medida | O que falta |
|---|---|---|---|---|
| Barra longa com anilhas e presilhas | hip thrust, agachamento, supino, terra romeno, desenvolvimento e remada com barra | `barra_longa` | IWF20 e IPF26 (220 cm, pegada Ø2,8, 131 cm entre mangas, manga Ø5 × 41,5); anilhas IWF20 e ROGUE-STEEL (Ø45 a 9) | espessura das anilhas de ferro de academia (a Rogue não informa: a IWF dá o máximo) |
| Suporte de agachamento (rack) | agachamento, supino, desenvolvimento com barra | `rack_de_agachamento` | LF-HS26 (LBR-OS) e HS24 (OSR); IPF26 para a altura dos ganchos | largura interna útil |
| Barra W | rosca com barra W, rosca Scott | `barra_w` | ELEIKO-CURL (131,6 cm, manga Ø5) | ângulos da curva (só "angled shape") |
| Barra hexagonal | terra hexagonal | `barra_hexagonal` | ROGUE-TB1 (226 × 72 cm, cabos a 63,5 cm) | — |
| Smith | B2, hip thrust (opção), remada invertida | `smith` | LF-HS26 (SSM), HS24 (HSSM, HSSMV) | ângulo da guia (só busca: 7°); fica provisório ou vertical (HSSMV) |
| Cadeira flexora | C1 | `cadeira_flexora` | LF-HS26 (SS-SLC 156 × 102 × 148), HS24 (HS-SLC 140 × 87 × 140), MV-NEXT | altura do assento, eixo, rolos; o cartão de hoje é 26% a 41% mais estreito |
| Cadeira extensora | C1 | `cadeira_extensora` | LF SS-LE, HS-LE, MV-NEXT | idem; o cartão é 37% a 54% mais estreito |
| Mesa flexora | C1 | `mesa_flexora` | LF SS-LC, HS-LC, MV-NEXT | ângulo do estofado; o cartão é 33% a 40% mais baixo |
| Leg press 45° | leg press, panturrilha no leg press | `leg_press` | MAGNUM-LP, GG-LP, HS PL-LP | ângulo do encosto e do trilho (só o nome "45°") |
| Hack | hack | `hack` | HS PL-HSQ (uma ficha só) | ângulo do trilho; segunda ficha |
| Abdutora / adutora | C1 | `cadeira_abdutora_adutora` | LF SS-SHB/HAD, HS-HAB/HAD, MV-NEXT | eixo das almofadas |
| Glúteo na máquina | coice na máquina | `gluteo_maquina` | LF SS-GL, HS-HG, MV-NEXT | — |
| Puxador | puxada pela frente | `estacao_puxada` | LF SS-PD, HS-PD, MV-NEXT | posição do rolo da coxa |
| Remada na estação | remada baixa na estação | `estacao_remada` | TG MK80 (TG-HOME) e as fichas de polia | apoio dos pés |
| Remada articulada | remada articulada | `remada_articulada` | LF SS-RW, HS-RW, MV-NEXT | — |
| Supino na máquina | supino na máquina | `supino_maquina` | LF SS-CP, HS-CP, MV-NEXT, TG MK70 | — |
| Desenvolvimento na máquina | desenvolvimento na máquina | `desenvolvimento_maquina` | LF SS-SP, HS-SP, MV-NEXT | — |
| Voador (e invertido) | voador, voador invertido | `voador` | LF SS-FLY, HS-FLY, MV-NEXT | se o mesmo aparelho serve aos dois (a maioria dos peck deck de academia serve) |
| Rosca na máquina | rosca na máquina | `rosca_maquina` | LF SS-BC, HS-BC, MV-NEXT | — |
| Tríceps na máquina | tríceps na máquina | `triceps_maquina` | LF SS-TP, HS-TE, MV-NEXT, TG MK45 | — |
| Abdominal na máquina | abdominal na máquina | `abdominal_maquina` | LF SS-AB, HS-ABC, MV-NEXT, TG MK83 | — |
| Panturrilha em pé | panturrilha em pé na máquina | `panturrilha_em_pe_maquina` | HS-SC (uma ficha só) | segunda ficha |
| Panturrilha sentada | panturrilha sentada | `panturrilha_sentada_maquina` | HS PL-CALF, LF SPLCALF | o cartão é 13% a 45% menor |
| Graviton | barra e mergulho no graviton | `graviton` | LF SS-ADC, HS-ADC | altura da plataforma dos joelhos |
| Banco romano | hiperextensão | `banco_romano` | LF LBR-BE, HS BW-BE, MV-NEXT | ângulo (45° ou horizontal) |
| Banco Scott | rosca Scott | `banco_scott` | LF LBR-BC, HS FW-AC | ângulo do apoio do braço |
| Banco declinado | abdominal no banco declinado | `banco_regulavel` (declina) | LF LBR-DB, HS FW-DB | ângulo da declinação |
| Tornozeleira de polia | coice e abdução na polia | `acessorio_polia_tornozeleira` | nenhuma medida lida | tudo (provisória) |
| Caixa para subir na barra | barra só na descida | (sem cartão) | — | peça simples de cenário (selo `desenho`) |

A **primeira máquina** a mostrar ao Gustavo (Parte B) é a cadeira flexora, junto com a barra com anilhas.

## 4. O que muda no treino gerado

O gerador escolhe entre exercícios equivalentes por uma lista de critérios; o último é "o que o guia já mostra animado" (`src/domain/gerador/index.ts`). Cada exercício que ganha animação passa a empatar com os que já têm, e o desempate seguinte decide. Medido numa amostra de 3.751 programas do estresse (1 em 40) e nas seis personas (o Bruno também no 2º local), ligando os lotes um por um, cada um somado aos anteriores:

| Depois do lote | Programas da amostra que mudam |
|---|---:|
| A1 (halteres no banco) | 16% |
| A2 (elástico e mini band) | 31% |
| A3 (em pé) | 73% |
| A4 (sentado ou deitado) | 77% |
| A5 (polia) | 80% |
| A6 a C1 | 80 a 81% |
| C2 (máquinas de tronco) | 83% |
| C3 (todos animados) | 82% |

### 4.1 Nas personas, em português simples

- **Depois de A1:** o Bruno passa a fazer o crucifixo inverso no banco inclinado no lugar do face pull com corda, o crucifixo inclinado com halteres no lugar do crucifixo na polia, e a rosca Scott no banco inclinado no lugar da rosca na polia baixa de costas para a torre. A Carla, as mesmas duas primeiras trocas e a rosca Scott no banco no lugar da rosca na máquina.
- **Depois de A2:** o Diego passa a fazer a remada curvada em pé com elástico no lugar da remada sentada com elástico, e o coice em quatro apoios com elástico no lugar da ponte de glúteo.
- **Depois de A3:** a Ana e o Bruno passam a fazer o agachamento com 2 halteres no lugar do búlgaro; o Bruno, o crucifixo invertido curvado no lugar do crucifixo invertido na polia; a Carla, o desenvolvimento unilateral com halter no lugar do com kettlebell.
- **Depois de A5:** o Bruno e a Carla, o tríceps com barra reta no lugar do tríceps com corda.
- **Depois de B1 a C3 (só a Carla, que tem academia completa):** supino na máquina no lugar do supino com halteres, puxada no puxador no lugar da puxada unilateral, remada articulada no lugar da remada baixa com triângulo, desenvolvimento com barra no lugar do com kettlebell.
- A Elisa e o Fábio não mudam.

### 4.2 Quando ligar: a cada lote ou a cada fase

O programa fica guardado no aparelho; quando o gerador passa a dar outro, a tela do programa oferece "Atualizar". Ligar a cada lote faz isso até 11 vezes, com trocas que às vezes se desfazem no lote seguinte (a rosca do Bruno, por exemplo, troca em A1 e volta a trocar em A5). **Recomendo ligar uma vez por fase** (depois de A, de B e de C): as animações de cada fase entram juntas no app, e o programa muda três vezes. A alternativa mais rápida para o usuário (ligar a cada lote) é a do prompt; a mais estável (ligar tudo no fim) deixa 81 animações prontas fora do app por muito tempo.

### 4.3 O que o gerador faz quando todas tiverem animação

Com as 171 animadas, o critério "tem o guia animado" deixa de separar alguém, e o próximo é a **ordem alfabética do nome interno do exercício** (`ordemFixa`, que só existe para a mesma entrada dar a mesma saída). É por isso que, no fim, o agachamento com 2 halteres (`agachamento-halteres`) ganha do goblet (`goblet`) e do búlgaro (`bulgaro`), o coice com elástico (`coice-elastico`) ganha da ponte de glúteo (`ponte-gluteo`) e a rosca concentrada ganha da rosca martelo: 331, 309, 153 e 118 casos na amostra. Hoje esse critério está escondendo uma escolha que nunca foi feita por evidência. Não mudo a regra (o prompt proíbe e ela é do gerador), mas recomendo levar à frente do gerador, antes de ligar a fase A, a pergunta: "entre exercícios do mesmo nível, qual vem primeiro?" (uma ordem de preferência nos níveis das funções, com fonte, resolveria).

## 5. Erros que não têm desenho óbvio

Cada cartão lista os erros comuns, e a animação desenha cada um, com o mesmo título e na mesma ordem. A maioria é pose (desenha-se a consequência, como nas 90: "Ir até a falha" virou a repetição em que a forma cede). Sobram três tipos:

1. **Ritmo** (o erro é a velocidade): "Quicar o cotovelo", "Quicar a barra" (2), "Quicar embaixo", "Quicar", "Descer rápido", "Dar tranco" (2), "Soltar a volta" (3), "Volta solta", "Descida solta", "Soltar o corpo", "Soltar o peso embaixo". São 16. **Proposta:** a ficha de movimento ganha, por erro, um ritmo próprio (as fases do erro: a descida em 0,3 s e um quique embaixo, por exemplo), e o guia mostra o erro em movimento; o quadro parado mostra o instante do quique ou do tranco, com a parte em vermelho. É uma mudança pequena no motor (um campo opcional na ficha e em `cena.ts`), já anotada no backlog. A alternativa é a de hoje para a panturrilha no degrau: o guia mostra o movimento certo com o texto do erro.
2. **Sem consequência visível**: "Parar longe da falha" (4: caneleiras e mini band), "Não testar o ponto alto" (tríceps no elástico alto), "Esquecer a trava" (agachamento no smith). **Proposta:** o guia mostra o movimento certo com o texto do erro (como na panturrilha no degrau), e o teste da ponte lista essas exceções uma a uma.
3. **Carga** ("Carga pesada demais", "Carga demais"): desenha-se a consequência que o cartão descreve (o embalo, o ombro que sobe).

## 6. O texto do guia

O cartão tem menos campos que o texto do guia animado. Para cada exercício faltam: onde sentir e a nota (`feel`, `feelNote`), a respiração (`breath`), a lista de conferência (`check`), as variações (`vary`) e os rótulos do contorno (`extLabels`). De onde cada um sai:

- **onde sentir**: dos músculos da ficha da técnica e da biblioteca (principal e secundários), com a fonte da ficha;
- **conferência e variações**: da montagem e da técnica da ficha (o que o cartão já diz, organizado);
- **rótulos do contorno**: as posições de começo e fim da amplitude (`range`);
- **respiração**: as 81 fichas não falam de respiração. A base do projeto já tem a fonte: MacDougall 1985 (`macdougall1985`, citado em `pesquisa-v2/06`): a pressão sobe mais perto da falha e com a respiração presa. O texto segue o das 90 animadas ("inspire na descida, solte o ar na subida, sem prender a série inteira"), com o selo consenso e essa fonte. Nada além disso.
- **a montagem segura** do cartão (`montagem`, em 35 dos 81) vai para a nota do guia (`note`), que aparece à vista em todos os modos, como nas 90.
- **o texto "como registrar e subir a carga"** (`carga`, em todos os cartões) não tem lugar no texto do guia animado. É uma decisão da ligação: ou o guia ganha esse campo (uma mudança pequena na tela do guia), ou a informação sai (a progressão já vem do programa). Recomendo manter, com o campo novo.

Antes de escrever, sigo as regras de texto aprovadas na sessão de textos (`docs/revisoes/textos/proposta.md`, a versão mínima do guia).

## 7. Os testes que mudam

- `tests/unit/conteudo.test.ts`: "todo exercício animado tem texto, e todo texto tem animação" compara com o motor de antes (`src/engine`, que tem as 90 antigas); passa a comparar com o motor novo. "Todo cartão é de exercício sem animação" continua valendo enquanto houver cartão.
- `tests/unit/motor-novo-ponte.test.ts`: "todas as animações aprovadas e no catálogo" continua; as exceções de erro sem desenho entram na lista `SEM_DESENHO`, uma a uma.
- Testes de ponta a ponta que usam um cartão de texto como exemplo (`treino.spec.ts`, `correcoes-auditoria.spec.ts`, `seu-treino.spec.ts`): passam a usar o exercício que for cartão por último (a decisão do item 8).
- Os testes das personas e os instantâneos do gerador (`tests/unit/__snapshots__/`) mudam com as trocas da seção 4, depois do ok.

## 8. O caminho do cartão de texto

Quando o último exercício for animado, nenhum exercício terá cartão. O componente do cartão (`CartaoTexto` em `src/features/treino/`) ainda serve para o caso de a animação não carregar. **Recomendo mantê-lo**, com um teste que force a falha de carga e confira que o cartão aparece; os cartões dos 81 ficam guardados (o arquivo do texto do guia é um superconjunto deles).

## 9. Peso e tempo

Hoje a tela do programa baixa 275 kB na primeira visita (limite 285 kB). Cada exercício do motor novo é baixado sozinho, quando aparece; o que pesa na tela do programa são as peças comuns. Meço a cada lote, com o tempo até o primeiro quadro de cada animação nova.
