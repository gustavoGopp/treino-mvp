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
(em andamento: a folha-piloto entra aqui)

## Proposta 3: a vista que abre é a do maior movimento
(em andamento: a lista medida entra aqui)
