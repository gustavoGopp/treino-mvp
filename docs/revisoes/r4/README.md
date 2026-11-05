# R4 do Boneco: as folhas para o Gustavo decidir e aprovar (05/11/2026)

O R4 muda a **cena** (o erro, os rótulos e a vista), não o corpo: o esqueleto, as poses e os músculos ficam como estão. Tudo aqui foi gerado pelo motor com `scripts/folha-erros.mjs` (e, mais adiante, `scripts/folha-rotulos.mjs`); nenhuma linha de base foi regravada ainda. Como ler cada folha: a coluna "hoje" é o modo Erros que está no app desde o acabamento A2 (a figura que erra em vermelho cheio e o certo em palitos verdes); as outras colunas são a proposta aprovada em direção (o certo é a figura cheia; só a parte do corpo que erra aparece em vermelho tracejado, com o nome do erro ao lado).

## Proposta 1: o erro sobre o certo

### Decisão (a): o instante do quadro de erro — `erros-instante.png`
Três colunas: **hoje**, **proposta no meio da 3ª fase** (o instante que a folha sempre usou) e **proposta no instante da maior diferença** (o motor mede, em cada um de 48 instantes do ciclo, quanto o certo e o errado se afastam, em cm, e escolhe o maior; determinístico).
- O que a folha mostra: em "não estender o braço" (remada sem banco, rosca martelo, suspensão) e "descer pouco" (goblet), o meio da 3ª fase é justamente onde o certo e o errado coincidem, e a proposta fica quase sem vermelho; no instante da maior diferença, o erro aparece inteiro. Nos outros erros as duas colunas são parecidas.
- A diferença máxima de cada erro está escrita embaixo do título (em cm).
- Opções: (1) o instante da maior diferença (é o que o guia já faz ao abrir o modo Erros, nesta branch); (2) manter o meio da 3ª fase.
- **Minha recomendação: (1).** É medido, e resolve o "encolher quase não se vê" de 04/11.

### Decisão (b): o equipamento da pose errada — `erros-equipamento.png`
Hoje o certo leva o equipamento, e o halter "errado" não aparece. A coluna da direita desenha também o equipamento da pose errada, em vermelho translúcido e tracejado, só quando a mão que erra se afasta mais de 3 cm.
- O que a folha mostra: ajuda onde o objeto é o que denuncia o erro (halteres longe das pernas no stiff; "virar elevação frontal"; a rosca com o cotovelo à frente); nos outros, fica um borrão vermelho em cima do halter certo.
- Opções: (1) sem o equipamento errado (só a parte do corpo); (2) com o equipamento errado, translúcido.
- **Minha recomendação: (2).** O halter é o que a pessoa olha; ver os dois halteres, o cinza e o vermelho, dá a distância do erro.

### Decisão (c): os erros pequenos — `erros-pequenos.png`
"Erro pequeno" é o que não move nenhuma parte do corpo mais de 3 cm. Medido nas 66 animações: **só um**, o punho dobrado com o kettlebell (0 cm: o corpo não muda, a bola cai para trás). Os erros de escápulas ("encolher os ombros") movem o braço inteiro de 7 a 10 cm e já entram na proposta como os outros.
- Colunas: **hoje**; **modo de hoje só nesse erro**; **a figura errada inteira em contorno vermelho** (o que o piloto de 04/11 fazia); **só o objeto da pose errada em vermelho, com o nome do erro na mão** (o que esta branch faz hoje).
- **Minha recomendação: a última.** É a única que mostra o que de fato muda (o kettlebell), e segue a mesma regra da decisão (b).

### Decisão (d): a legenda e o tema escuro — `erros-tema-escuro.png`
- A legenda do modo Erros no app passou de "erro (vermelho) / execução correta (verde)" para **"execução correta" (a cor do boneco) / "a parte que erra (tracejado)" (vermelho)**. Só texto e HTML; não muda nenhum quadro.
- A folha mostra 4 exercícios no tema escuro: o vermelho tracejado sobre o boneco cinza-escuro, e o rótulo com a borda da cor do palco.
- Opções: (1) como está; (2) pedir outra cor para a parte que erra no tema escuro (é só CSS, sem mudar a linha de base).

### O lote inteiro: `erros/pagina-01.png` a `erros/pagina-06.png`
Todos os erros das 66 animações (189 erros), 11 exercícios por página, nas colunas **hoje × proposta (maior diferença)**, com as opções (b) e (c) **desligadas** (o que a decisão escolher entra antes da regravação). Para aprovar: um "aprovar" por página, ou a lista do que não convence (exercício e erro).

Depois dos quatro "aprovar": a linha de base `tests/visual/linha-de-base/estilo-a.json` é regravada (só os quadros de erro mudam; os de técnica, músculos e trajetória continuam com o mesmo hash).

## Proposta 2: rótulos fora do corpo

### O piloto: `rotulos-piloto.png`
Seis exercícios (tríceps na suspensão, remada na suspensão, remada sem banco, remada com elástico, face pull e agachamento com o peso do corpo), em cada vista, os quatro quadros do ciclo em duas linhas: **hoje** e **proposta**. A regra, aplicada por cima de qualquer animação (não muda nenhuma pose):
- o rótulo de técnica cujo texto passa por cima do corpo em algum instante do ciclo é movido para o lugar livre mais perto da âncora (dentro do palco, abaixo da caixa da fase do app, fora do corpo, sem cruzar outro rótulo), com uma linha fina tracejada até o ponto; de preferência, um lugar cuja linha não atravesse o corpo;
- o deslocamento é fixo para o ciclo inteiro: o rótulo acompanha a âncora sem pular de lado entre os quadros;
- um rótulo largo demais para caber ao lado do corpo é quebrado em duas linhas (na vírgula ou no espaço do meio);
- o rótulo que já está fora não se move (encostar de leve no pé ou na mão não conta);
- sem lugar no palco, fica onde está (o pior caso é o de hoje).
- Medido nas 66 animações, na largura do app: 58 das 172 linhas de rótulo se movem; 114 ficam como estão.

O que o piloto mostra: no tríceps na suspensão, "cotovelos parados, apontando à frente" sai de cima do braço e vai para a esquerda, em duas linhas; na remada sem banco, "mão livre na coxa" sai de dentro do tronco e aponta para a mão escondida com a linha; na remada na suspensão de trás, "escápulas se juntam no fim" sai de cima da cabeça. Na remada com elástico e no face pull nada muda (os rótulos já estavam fora). Limite conhecido: a linha até o ponto atravessa o corpo quando a âncora está escondida atrás dele (a mão livre na coxa).

### O lote inteiro: `rotulos/pagina-01.png` a `rotulos/pagina-09.png`
As 66 animações, 8 por página, hoje × proposta. Para aprovar: um "aprovar" por página, ou a lista do que não convence.

Depois do "aprovar": a linha de base `estilo-a.json` é regravada (os quadros de técnica com rótulo movido mudam de hash).

## Proposta 3: a vista que abre é a do maior movimento

A regra (`vistaDoMovimento`, em `src/engine/estilo/index.ts`): para cada vista do exercício, o motor projeta a trajetória da mão (ou do pé, ou do quadril: a 1ª trajetória de `paths`) ao longo da fase concêntrica e mede o comprimento do caminho na tela, em fração da largura do palco daquela vista. O modo Técnica abre na vista em que o caminho é mais longo; empate (menos de 15% de diferença) mantém a 1ª vista; uma vista só ganha se o movimento nela percorre pelo menos 8% da largura do palco (abaixo disso é ruído). A vista "Detalhe" (zoom) não concorre. Só a vista inicial muda: nenhum quadro muda, nenhuma linha de base muda. A miniatura do cartão continua no modo Músculos (decisão do Gustavo, 05/11).

**Medido nas 66 animações** (comprimento do caminho por vista, em fração da largura do palco): **3 mudam de vista inicial**.

| Exercício | Vistas (a 1ª é a de hoje) | Comprimento por vista | Abre em |
|---|---|---|---|
| Crucifixo na polia | frontal, top | frontal 0,25 · top 0,55 | **top** (muda) |
| Face pull com corda | lateral, top | lateral 0,14 · top 0,20 | **top** (muda) |
| Crucifixo invertido na polia | frontal, top | frontal 0,23 · top 0,51 | **top** (muda) |
| Barra fixa supinada | posterior, lateral | posterior 0,04 · lateral 0,07 | posterior (a lateral vence por 75%, mas é ruído: abaixo de 0,08) |
| Elevação lateral (suspeita da auditoria) | frontal, lateral | frontal 0,22 · lateral 0,19 | frontal (já era) |
| Elevação com halteres | frontal, lateral | frontal 0,27 · lateral 0,25 | frontal (já era) |
| Abdução com caneleira (suspeita) | lateral, top | lateral 0,21 · top 0,05 | lateral (já era: deitado de lado, a perna sobe na vertical) |
| Desenvolvimento unilateral com kettlebell | frontal, lateral | frontal 0,20 · lateral 0,22 | frontal (empate: menos de 15%) |
| YT na suspensão | posterior, lateral | posterior 0,17 · lateral 0,19 | posterior (empate) |
| Os outros 57 | | a 1ª vista vence ou empata | não mudam |

A remada com elástico (em revisão) será medida quando entrar no app (lateral 0,22 × posterior 0,15 na pose de hoje: fica de lado).

Opções: (1) ligar com os 3 que mudam; (2) ligar, mas manter o face pull de lado (a altura do cotovelo é o que mais erra); (3) não ligar. **Minha recomendação: (1)**: nos dois crucifixos, de cima se vê o arco das mãos e o cotovelo "levemente dobrado e fixo", que de frente somem; no face pull, de cima se vê as mãos abrindo ao lado da cabeça. A tabela inteira dos 66 está no teste `tests/unit/vista-inicial.test.ts` (a lista dos que mudam é fixa: se uma pose mudar, o teste avisa). A regra já está no motor; **no app fica desligada até o "aprovar"** (é uma linha em `Guia.tsx`).
