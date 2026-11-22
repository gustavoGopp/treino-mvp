# Lote C1 · Adução na cadeira adutora (`aducao-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na cadeira abdutora e adutora, as costas no encosto, as mãos nos pegadores, os pés nos apoios com os joelhos a 90° e as almofadas por dentro dos joelhos; das pernas abertas até um alongamento confortável, elas fecham até as almofadas quase se tocarem e voltam controlando. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/aducao-maquina.md`. Cartão do app: `src/conteudo/exercicios/aducao-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/aducao-maquina.json`.
- Animação: `src/engine/novo/exercicios/aducao-maquina.ts`, sobre o mesmo núcleo da abdução na máquina (`exercicios/quadril-na-maquina.ts`). Regras medidas: `src/engine/novo/regras/cadeira-abdutora.ts`.
- A máquina: a mesma da abdução (`pecas-de-cena/cadeira-abdutora.ts`), com as almofadas giradas para dentro dos joelhos, como na Precor RSL0626 ("rotating thigh pads") e na Life Fitness SS-HAA ("Position knee pads inside of the knees").
- Quadros grandes: `../quadros/aducao-maquina.png`. **Sem folha** ao lado da animação de hoje.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem número. Do manual público da Life Fitness (SS-HAA e SS-HAD, p. 22 e 24): os pés nos apoios com os joelhos a 90°, as almofadas por dentro dos joelhos, as mãos nos pegadores e a pausa breve no fim ("Hold the inward extreme position briefly"). A posição sentada, o tempo de cada fase e o modo de girar a perna são os da abdução na máquina (ver `abducao-maquina.md`). **O fim do movimento não é um ângulo escolhido:** as pernas fecham até os cantos de trás das almofadas (as de 6,5 cm da Precor, entre os joelhos) ficarem a pouco mais de 1 cm um do outro, o que dá 11° de abertura em cada coxa.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado com as costas no encosto | consenso | o glúteo e a coxa a −1 cm do tampo do assento; as costas a 0 cm do encosto e o glúteo a 1,3 cm; o peito inclina 18,7° da vertical | sim |
| "Hold the handles" (Life Fitness) | consenso | as mãos a 0 cm do meio dos pegadores, paradas | sim |
| Pés nos apoios, joelhos a 90° (Life Fitness) | consenso | o joelho a 90,0°; a sola a 0 cm do topo do apoio; a bola do pé anda 0 cm em cima dele | sim |
| Almofadas do lado de dentro dos joelhos | consenso | por dentro, de −0,2 a −0,1 cm da pele (o estofado amassa 1 a 2 mm); o joelho anda 0 cm em relação à almofada | sim |
| Pernas abertas até um alongamento confortável | consenso | no começo, cada coxa a 34° (abaixo da média de 40° da AAOS); os joelhos a 63 cm um do outro; as placas do pino 3,9 cm acima das outras | sim |
| Fecha até as almofadas quase se tocarem | consenso | cada coxa fecha até 11°; os cantos de trás das almofadas a 1,2 cm um do outro; os joelhos a 32,5 cm | sim |
| Volta controlando, sem forçar a abertura | consenso | volta em 2 s, até os 34° do começo (8° antes do fim da máquina); salto de velocidade de 4,3% do pico (limite 15%) | sim |
| Placas sem bater | consenso | as placas sobem o arco do came, de 3,9 a 15,1 cm (erro de 0 cm), e nunca descem até as de baixo | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`bacia`, `cervical`, `cabeca`, `assento.amassa`, `inicio`). (2) O modo Músculos abre de cima (adutores: 138 cm²); de frente os adutores não aparecem (0 cm²), porque as coxas apontam para quem olha.

## As vistas

Medido e olhado: **de frente** (padrão do modo Técnica: os joelhos fechando contra as almofadas, as placas subindo na torre) e **de cima** (as coxas girando em volta do quadril e a parte de dentro delas, onde estão os adutores; é a vista do modo Músculos). De lado, a almofada e o braço de perto cobrem o joelho e o movimento (que é para os lados) não aparece.

## Erros (os dois do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir demais | de cima | a máquina regulada aberta demais: o começo força a virilha, cada coxa a 55° (a certa, 34°; acima da média de 40° da AAOS e abaixo do máximo, 60°); os joelhos a 84 cm um do outro, em vez de 63 |
| Bater as placas | de frente | a volta sem controle vai até o fim da máquina: cada coxa a 42° (em vez de 34°) e as placas do pino batem nas de baixo (0 cm, em vez de 3,9) |

"Bater as placas" é um erro de ritmo; o que se desenha é a consequência que o cartão dá (a volta sem controle e as placas batendo): as pernas passam do começo certo até onde a máquina para.

## O equipamento

A mesma cadeira da abdução, com a almofada girada para dentro (ver a folha da peça e `resumo-abdutora.md`). Na adução, as placas sobem quando as pernas fecham (a posição inicial da máquina fica aberta, a 42°).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação).

## Mudanças em arquivo comum

Um acréscimo em `boneco.ts`: a opção `vies.cabeca`, desligada por padrão (ver a correção no fim deste arquivo). Fora isso, só a linha no registro dos exercícios.

## O que não ficou bom

- **O corpo ocupa cerca de dois terços da altura do quadro de frente**: com as pernas abertas, os braços da máquina chegam a 70 cm do meio de cada lado, e a torre (148 cm) fica no quadro. Tentei pôr o rótulo acima do corpo para fechar o quadro: o corpo cresceu pouco e o fio do rótulo cruzava o ombro; voltei.
- **Só um rótulo** ("volta controlando", de frente). "Abre só até o confortável" ficava em cima da torre de frente e, de cima, o fio atravessava o corpo; o erro "Abrir demais" mostra o mesmo ponto.
- **De frente, as coxas viram uma mancha clara** (o colo, com a coxa apontando para quem olha), como na abdução.
- **De frente, os suportes das almofadas passam na frente dos joelhos** (elas vêm do montante à frente do pé e giram para dentro): no fim, cobrem um pouco a parte de dentro dos joelhos.
- **Os ângulos de 34° (começo) e 55° (abrir demais) são escolhas**: a ficha só diz "alongamento confortável".

## Correção de 18/11 (a vista de cima)

Na revisão, a cabeça não aparecia na vista de cima, e uma linha preta solta subia do encosto até a borda do quadro. **As causas:**

- **A cabeça.** O Boneco desenha o corpo com um contorno só, por fora. De cima, sentado, a cabeça fica dentro da silhueta dos ombros: ela era pintada, mas sem contorno e da mesma cor do tronco, e sumia. Além disso, o corpo inteiro era pintado na altura média dele (~90 cm), e o alto do encosto (118 cm) ia por cima. Nas vistas de cima aprovadas de quem está em pé ou sentado (a elevação lateral, por exemplo), a cabeça também não aparece; nas de quem está deitado, aparece.
- **A linha preta** era o cabo, que corre no chão do came até a polia do pé da torre, e a torre é cortada pelo quadro.

**O que mudou:**

- O Boneco ganhou uma opção nova, desligada por padrão: `vies.cabeca` > 0 pinta a cabeça (e o cabelo) de novo por cima do corpo, com o contorno próprio, como já se fazia com o polegar por cima da mão. A mudança em `boneco.ts` só acrescenta esse trecho e não muda nada nas animações aprovadas: nenhuma usa a chave `cabeca` no `vies`.
- O quadro da máquina usa a opção só na vista de cima e sobe o corpo e os braços na ordem de pintura (`viesNaVista.cima`), para ficarem por cima do encosto.
- O cabo não é desenhado quando a vista é de cima (nem na folha da peça); nas outras vistas continua.
