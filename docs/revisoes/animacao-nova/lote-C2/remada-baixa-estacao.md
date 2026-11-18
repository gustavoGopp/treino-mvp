# Lote C2 · Remada baixa na estação (`remada-baixa-estacao`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no banco comprido da estação de remada, de frente para a torre, os pés nas chapas da plataforma, os joelhos levemente dobrados, o tronco quase vertical e parado; o triângulo nas duas mãos. Os braços puxam o triângulo até o abdômen, os cotovelos rentes ao corpo, e o devolvem até estenderem, com as escápulas à frente. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/remada-baixa-estacao.md`. Cartão do app: `src/conteudo/exercicios/remada-baixa-estacao.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-baixa-estacao.json`.
- Animação: `src/engine/novo/exercicios/remada-baixa-estacao.ts`. Os braços, o caminho das mãos e os erros de balançar e de arredondar seguem a remada baixa aprovada (`exercicios/remada-baixa.ts`), com a conta copiada e as funções comuns de `polia-puxar.ts` (`frenteParaOPeito`, `folgaDaBarriga`), sem mudar nada delas.
- Peça nova: a estação de remada baixa (`pecas-de-cena/estacao-remada.ts`, a torre de `pecas-de-cena/torre-da-estacao.ts`, `dados/objetos/estacao-remada.json`); a folha dela é `docs/revisoes/animacoes-restantes/pecas/folha-estacao-remada.png`. O triângulo é o aprovado (`pecas-de-cena/triangulo-remada.ts`).
- Regras medidas: `src/engine/novo/regras/estacoes.ts`.
- Quadros grandes: `../quadros/remada-baixa-estacao.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem números. O que ela não dá saiu da remada baixa aprovada (as mãos 19 cm acima do quadril, a folga de 1 cm da barriga, os cotovelos que dobram 8° no começo, as escápulas à frente e para trás, os erros) e das animações sentadas aprovadas (o glúteo afunda 1 cm), com selo `desenho` e a fonte dita em cada linha. Os joelhos levemente dobrados ficaram em 25° e o tronco em 3° à frente, parado ("tronco quase vertical", "tronco parado"). O que o corpo resolve (calibrado uma vez): a altura do quadril (o glúteo e as coxas no banco), onde fica a plataforma (a sola inteira na chapa inclinada, o joelho a 25°), o caminho das mãos (reto e horizontal, a 1 cm da barriga no fim e com o cotovelo a 8° no começo) e a altura da polia baixa (o alto dela na altura das mãos: o cabo horizontal).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado, pés na plataforma, joelhos levemente dobrados | consenso | o glúteo afunda 1 cm no banco (42 cm do chão); a bola e o calcanhar a 0 cm da chapa (inclinada 22°), parados no ciclo (0 cm); o joelho dobra 25° | sim |
| Tronco quase vertical; "tronco parado" (cartão) | consenso | o peito fica a 3° à frente da vertical o ciclo todo; a base do pescoço não anda (0 cm) | sim |
| Na volta, as escápulas vão à frente sem dobrar a lombar | consenso | a lombar não dobra além da curva de repouso (0°); a clavícula vai à frente no começo e volta 18,4° até o fim | sim |
| Início: braços estendidos, escápulas à frente (cartão) | consenso | no começo o cotovelo dobra 8° | sim |
| Puxa até as mãos chegarem ao abdômen | consenso | no fim, o meio das mãos fica 40,4 cm abaixo da base do pescoço, ao longo do tronco (a cintura fica a 45; a linha do peito, a 22,1), e a pele das mãos a 1 cm da barriga | sim |
| Cotovelos rentes ao corpo, o ombro pouco aberto | consenso / um estudo | o braço se afasta no máximo 12,9° do lado do tronco; o antebraço entra no máximo 0,3 cm na pele da cintura (passa rente) | sim |
| Pegada fechada no triângulo | um estudo | o antebraço fica de 76,8° a 79,6° (90° = palmas uma para a outra), nas pegadas a 15,2 cm uma da outra | sim |
| A polia baixa alinhada com o assento; o cabo quase horizontal | consenso | o cabo fica a 0° da horizontal o ciclo todo (a polia baixa a 64,3 cm do chão, o alto dela na altura das mãos, 69,8 cm) | sim |
| O triângulo e o cabo livres do corpo e da máquina | desenho | passam a no mínimo 4,6 cm da pele (da coxa) e a 12,6 cm da máquina (as chapas, a coluna da polia, o banco) | sim |
| O cabo sai reto da polia até a ponta do triângulo; a pilha sobe o que o cabo anda (1:1) | desenho | a saída fica na borda da polia (5,5 cm do centro) e a ponta do triângulo a 15,9 cm do meio das mãos o ciclo todo; o cabo anda 30,4 cm e as placas sobem 30,4 cm (a relação 1:1 da estação) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs remada-baixa-estacao`): 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`assento.amassa`, `assento.quadril`, `pes.meiaDistancia`, `pes.bolaAo`, `pes.paraFora`, `cervical`, `cabeca`, `maos.acimaDoQuadril`, `cotovelo.paraFora`, `cotovelo.paraFora.inicio`, `escapula.elev.inicio`, `escapula.elev.fim`, `placas`, `pilha.folga`). (2) O modo Músculos abre de trás (as costas: 834 cm²); de lado o principal aparece pouco (176 cm²). Ritmo: salto de 11,3% da velocidade de pico (limite 25%).

## As vistas

**De lado** (padrão do modo Técnica: a estação inteira, os pés na plataforma, o cabo horizontal, o triângulo indo e voltando do abdômen, o tronco parado e as placas subindo) e **de trás** (os cotovelos rentes, as escápulas, o erro dos cotovelos abertos; padrão do modo Músculos). A remada aprovada abre de três quartos pela frente; aqui, de três quartos, o banco comprido e a torre também cabem (é o último quadro de `../quadros/remada-baixa-estacao.png`), mas de lado o cabo horizontal e a plataforma se leem melhor. De frente a torre fica na frente do corpo; de cima, a cabeça some nos ombros.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Balançar o tronco | de lado | o peito vai de 22° à frente no começo a 16° para trás no fim: o corpo vai para trás para puxar (a remada aprovada: 30° e 16°; aqui, à frente, menos, porque as pernas estão quase estendidas) |
| Arredondar a lombar | de lado | no começo (o fim da volta) a lombar curva 14° e a parte de cima das costas 24° além da curva de repouso, e o pescoço estende 10° para o olhar não ir ao chão; a curva se desfaz na puxada |
| Cotovelos abertos | de trás | no fim o braço se afasta 35,7° do lado do tronco (o certo: 12,9°): os cotovelos vão para os lados, com as mãos ainda no triângulo |

## O equipamento

- **Estação de remada baixa (peça nova):** o tamanho das fichas da Technogym Low Row MK80 (142 × 118,5 × 137,5 cm) e da Nautilus Impact Low Row (228,6 × 72 × 218). **Relação do cabo 1:1, da ficha da Nautilus** ("Pulley ratio 1:1"; a Bells of Steel também); a plataforma inclinada ("angled low-row footplate", Bells of Steel), sem o ângulo: 22°, o do cartão de hoje. A torre tem a altura da Technogym. Desenhada com 193 cm de comprimento (entre as duas fichas). A altura do banco, onde fica a plataforma (104 cm do meio do banco, para o corpo da tabela), a altura da polia baixa (64 cm) e o número de placas: de desenho. Espessura das placas: provisória (a da coluna de polia).
- **O cabo** sai da ponta do triângulo, passa entre as chapas dos pés, dá a volta por cima da polia baixa, desce por dentro da coluna dela, corre no chão até o pé da torre, sobe até a roldana do alto e desce até a haste do pino.
- **Triângulo:** o aprovado (Rogue, 15,2 cm entre as pegadas), nas mãos o tempo todo.
- **A pintura:** o banco é cenário (atrás do corpo, que senta nele); a plataforma, a polia baixa, a torre, o triângulo e o cabo, na ordem de profundidade (de lado, o pé fica por cima da chapa).

## Mudança em arquivo comum

A mesma de `puxada-frente.md`: a conferência da pilha lê a relação do objeto que o cabo declara (aqui, `estacaoRemada`, 1:1); sem o campo, nada muda.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício (ele nunca teve animação). Da remada baixa aprovada: o cabo horizontal, a folga de 1 cm da barriga, os cotovelos que passam rentes, o tronco que não passa da vertical.

## O que não ficou bom

- **A polia baixa fica a 64 cm do chão, numa coluna acima das chapas dos pés,** para o cabo sair na horizontal na altura das mãos (a ficha: "alinhada com o assento; o cabo quase horizontal"; a regra aprovada aceita até 10°). Em muitas estações a polia fica mais baixa, entre os pés, e o cabo sobe uns 15° até as mãos; preferi a ficha.
- **De lado o corpo fica um pouco menor que na remada aprovada** (as pernas estendidas até a plataforma e a torre logo depois alargam a cena).
- **O banco é uma peça só, sem regulagem;** a plataforma foi posta onde o corpo da tabela dobra o joelho 25° (numa academia, quem senta é que escolhe onde se senta no banco).

**Risco de o Gustavo não gostar: baixo a médio.** O corpo e os erros seguem a remada aprovada, a conferência passa sem falha e as duas vistas se leem; o risco está na peça nova (a polia baixa alta, numa coluna, e as medidas de função de desenho).
