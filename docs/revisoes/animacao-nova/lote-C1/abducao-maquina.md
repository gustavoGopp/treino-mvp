# Lote C1 · Abdução na cadeira abdutora (`abducao-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado na cadeira abdutora e adutora, as costas no encosto um pouco deitado, as mãos nos pegadores ao lado do assento, os pés nos apoios com os joelhos a 90° e as almofadas por fora dos joelhos; as pernas abrem até o fim confortável, seguram ~1 s e voltam sem deixar as placas baterem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-maquina.md`. Cartão do app: `src/conteudo/exercicios/abducao-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-maquina.json`.
- Animação: `src/engine/novo/exercicios/abducao-maquina.ts`, sobre o núcleo novo dos exercícios na cadeira abdutora (`exercicios/quadril-na-maquina.ts`), que a adução na máquina também usa. Regras medidas: `src/engine/novo/regras/cadeira-abdutora.ts`.
- A máquina: `src/engine/novo/pecas-de-cena/cadeira-abdutora.ts`, medidas em `src/engine/novo/dados/objetos/cadeira-abdutora.json`, folha em `docs/revisoes/animacoes-restantes/pecas/folha-cadeira-abdutora-adutora.png`.
- Quadros grandes: `../quadros/abducao-maquina.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem número. O manual público da Life Fitness (linha Insignia, SS-HAA e SS-HAB, p. 22 e 23) dá dois pontos que viraram regra: **os pés nos apoios com os joelhos a 90°** ("Sit down with feet on foot pegs so knees are bent 90 degrees") e as **mãos nos pegadores** ("Hold the handles"), além da pausa no fim ("Hold the outward extreme position briefly", que o cartão do app também pede: "Segura ~1 s"). O tempo de abrir (~1 s) e de voltar (~2 s) é o da abdução com mini band aprovada.

**O movimento não é escolhido quadro a quadro:** a coxa, a perna e o pé giram juntos em volta de um eixo vertical que passa pelo centro de cada quadril (sentado, com o quadril dobrado, abrir a perna é girar a coxa no plano do assento), e o braço da máquina gira no mesmo eixo. A altura da bacia sai do glúteo apoiado no assento (medido na superfície do Boneco) e a inclinação da coxa sai da sola no apoio do pé com o joelho a 90° (0,5° abaixo da horizontal); as duas contas ficam gravadas pelo `preparo.mjs`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado com as costas no encosto | consenso | o glúteo e a coxa a −1 cm do tampo do assento (amassam 1 cm); as costas a 0 cm do encosto (deitado 15°) e o glúteo a 1,3 cm; o peito inclina 18,7° da vertical; a curva da lombar de repouso deixa um vão de ~5 cm na cintura | sim |
| "Hold the handles" (Life Fitness) | consenso | as mãos a 0 cm do meio dos pegadores, paradas no ciclo | sim |
| Pés nos apoios, joelhos a 90° (Life Fitness) | consenso | o joelho a 90,0° em todo o ciclo; a sola a 0 cm do topo do apoio; a bola do pé anda 0 cm em cima dele; o meio do pé dentro do apoio | sim |
| Almofadas do lado de fora dos joelhos | consenso | por fora, de 0 a 0,1 cm da pele; o joelho anda 0 cm em relação à almofada (o eixo do braço fica a 0 cm do centro do quadril, na horizontal) | sim |
| "Início: pernas fechadas, placas sem encostar" | consenso | no começo, cada coxa a 8° (os joelhos a 28 cm um do outro, os quadris a 16,7 cm) e as placas do pino 3,9 cm acima das outras | sim |
| Abre as pernas até o fim confortável | consenso | cada coxa abre até 36° (abaixo da média de 40° da AAOS, medida em pé); os joelhos chegam a 65 cm um do outro; a perna não muda de inclinação (0°) | sim |
| Pausa ~1 s aberto | consenso | pausa de 1 s em cima | sim |
| Volta controlando, sem deixar as placas baterem | consenso | volta em 2 s; o ritmo é suave (salto de 4,3% da velocidade de pico, limite 15%); as placas nunca descem abaixo de 3,9 cm | sim |
| Tronco parado, sem embalar | consenso | a base do pescoço anda 0 cm; a bacia não sai do lugar (0 cm) | sim |
| A máquina funciona | — | as placas sobem o arco do came (28 cm × o ângulo girado, erro de 0 cm): de 3,9 a 17,6 cm | sim |

Pescoço e cabeça: com o tronco deitado 18,7°, o pescoço dobra 12° e a cabeça 6° para o olhar voltar para a frente (a cabeça fica de frente, 0° da horizontal).

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`bacia`, `cervical`, `cabeca`, `assento.amassa`, `inicio`). (2) O modo Músculos abre de lado (glúteo: 155 cm²); de frente e de cima, sentado, o glúteo não aparece (0 cm²).

## As vistas

Medido e olhado: **de frente** (padrão do modo Técnica: os joelhos abrindo contra as almofadas, as placas subindo na torre ao lado), **de cima** (as coxas girando em volta do quadril, que é o que o movimento é) e **de lado** (o tronco parado no encosto; é a vista do erro de embalar e a do modo Músculos). De três quartos o braço da máquina de perto cobre o joelho e a perna. De lado, a almofada da perna de perto cobre o joelho.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Embalar o tronco | de lado | no fim da abertura, o corpo sai do encosto e vai para a frente: a bacia gira 16°, a lombar 8° e as costas de cima 10° para a frente; a base do pescoço anda 25 cm; o pescoço volta 24° para o olhar seguir à frente (sem isso, a cabeça caía no peito) |
| Abrir pouco | de frente | cada coxa abre só 16° (a certa, 36°): os joelhos a 40 cm um do outro, em vez de 65 |
| Soltar a volta | de frente | a volta cai de uma vez até o fim da máquina: as coxas fecham até 0° (os joelhos a 17 cm, em vez de 28) e as placas do pino batem nas de baixo (0 cm, em vez de 3,9) |

"Soltar a volta" é um erro de ritmo; o que se desenha é a consequência que o cartão dá ("As placas batem"): o começo de cada repetição fica 8° antes do fim da máquina (onde as placas descansam), e no erro a perna chega até ele.

## O equipamento

A cadeira abdutora e adutora nova (ver a folha e o resumo do grupo, `resumo-abdutora.md`): o tamanho total da Life Fitness SS-HAA, a espessura dos estofados e o encosto "um pouco deitado" da Precor RSL0626; o eixo de cada braço embaixo do centro do quadril, as almofadas e os apoios dos pés saem do corpo da tabela. A torre fica à esquerda de quem senta (no cartão, à direita), para ficar atrás do corpo de lado.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Da abdução com mini band aprovada vem a pausa de 1 s e o modo de ler o movimento de frente.

## Mudanças em arquivo comum

Um acréscimo em `boneco.ts`: a opção `vies.cabeca`, desligada por padrão (ver a correção no fim deste arquivo). A máquina, o núcleo e as regras são arquivos novos; os registros ganharam uma linha cada. De frente, o corpo é pintado mais para a frente (`viesNaVista`, opção que o quadro já tinha), para ficar por cima do eixo e das engrenagens que estão atrás das canelas.

## O que não ficou bom

- **De frente, as coxas viram uma mancha clara.** Com o quadril dobrado e a coxa apontando para quem olha, o Boneco desenha o colo como uma forma só, de borda redonda embaixo (como a abdução com mini band aprovada, de frente). Os joelhos e as canelas se leem; as coxas, não.
- **De frente, as mãos somem atrás das coxas** quando as pernas abrem (os braços são pintados atrás delas, como na abdução com mini band aprovada); no começo elas aparecem nos pegadores.
- **O corpo ocupa cerca de três quartos da altura do quadro de frente**: a torre (148 cm) é mais alta que a cabeça de quem senta (139 cm) e fica no quadro, à direita, porque é nela que se vê as placas subindo (e batendo, no erro de soltar a volta).
- **O rótulo do erro de embalar** fica entre a torre e o encosto, de lado; o fio do rótulo "tronco parado" desce por trás da cabeça até a base do pescoço.
- **De cima, a torre e o fundo da base são cortados pela borda do quadro** (de propósito: sem o corte, o corpo ficava pequeno).
- **O ângulo de 36° e o de 8° do começo são escolhas**: a ficha da técnica não dá número (só "até o fim confortável" e "pernas fechadas, placas sem encostar").

## Correção de 18/11 (a vista de cima)

Na revisão, a cabeça não aparecia na vista de cima, e uma linha preta solta subia do encosto até a borda do quadro. **As causas:**

- **A cabeça.** O Boneco desenha o corpo com um contorno só, por fora. De cima, sentado, a cabeça fica dentro da silhueta dos ombros: ela era pintada, mas sem contorno e da mesma cor do tronco, e sumia. Além disso, o corpo inteiro era pintado na altura média dele (~90 cm), e o alto do encosto (118 cm) ia por cima. Nas vistas de cima aprovadas de quem está em pé ou sentado (a elevação lateral, por exemplo), a cabeça também não aparece; nas de quem está deitado, aparece.
- **A linha preta** era o cabo, que corre no chão do came até a polia do pé da torre, e a torre é cortada pelo quadro.

**O que mudou:**

- O Boneco ganhou uma opção nova, desligada por padrão: `vies.cabeca` > 0 pinta a cabeça (e o cabelo) de novo por cima do corpo, com o contorno próprio, como já se fazia com o polegar por cima da mão. A mudança em `boneco.ts` só acrescenta esse trecho e não muda nada nas animações aprovadas: nenhuma usa a chave `cabeca` no `vies`.
- O quadro da máquina usa a opção só na vista de cima e sobe o corpo e os braços na ordem de pintura (`viesNaVista.cima`), para ficarem por cima do encosto.
- O cabo não é desenhado quando a vista é de cima (nem na folha da peça); nas outras vistas continua.
