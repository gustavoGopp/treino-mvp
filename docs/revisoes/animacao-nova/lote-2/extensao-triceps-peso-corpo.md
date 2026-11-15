# Lote 2 · Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

De 15/11/2026. Mãos espalmadas no tampo de uma bancada de cozinha (90 cm), junto da beirada; pés para trás, na ponta; corpo reto e inclinado. Só os cotovelos dobram, apontando para a frente, até a testa chegar perto da bancada. **Ainda não foi vista pelo Gustavo.** Não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md`. Cartão: `src/conteudo/exercicios/extensao-triceps-peso-corpo.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/extensao-triceps-peso-corpo.json`.
- Animação: `src/engine/novo/exercicios/extensao-triceps-peso-corpo.ts`, sobre o núcleo da família (`exercicios/apoio-no-chao.ts`, o mesmo do pike).
- Peça nova: `src/engine/novo/pecas-de-cena/bancada.ts`, com as medidas em `src/engine/novo/dados/objetos/bancada.json`.
- Regras medidas novas: `src/engine/novo/regras/apoio-no-chao.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-extensao-triceps-peso-corpo.png`. Quadros grandes: `../quadros/extensao-triceps-peso-corpo.png`.

## Chão ou bancada?

O pedido desta rodada falava em "no chão". A ficha da técnica e o cartão pedem **um apoio fixo na altura da cintura** (bancada, pia ou parede). O chão de joelhos é só o último degrau da progressão. Como a ficha manda, a animação usa a bancada, como a de hoje, e **o antebraço não apoia em nada**. Por isso, a conferência do chão mede 0 cm: só os pés tocam o chão.

## Como a pose é montada

O corpo reto gira em torno dos tornozelos (calcanhar levantado e parado, joelho a 5°). Um ângulo só descreve a pose: a inclinação do corpo em relação à vertical. As mãos ficam paradas no tampo, e os braços alcançam as mãos com os cotovelos apontando para a frente, na linha do corpo.

- **Em cima**, a inclinação sai do cotovelo pedido (25° de dobra, o de hoje).
- **Embaixo**, sai de quanto a cabeça chega perto da bancada: 6 cm do tampo, da quina ou da frente, o que estiver mais perto.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Apoio fixo na altura da cintura | consenso | bancada de cozinha com o tampo a 90 cm (gabinete de 80 cm + pés de 8 cm + tampo de 2 cm, medidas de um fabricante; ver "O equipamento") | sim |
| Mãos no apoio na largura dos ombros, braços estendidos | consenso | as mãos ficam espalmadas no tampo, com o punho 1 cm para dentro da beirada e o centro do punho na linha do ombro (18,4 cm do meio do corpo); elas não saem do lugar (0 cm). Em cima, o cotovelo dobra 25° | sim |
| Pés para trás, corpo inclinado e reto | consenso | ponta dos pés parada (0 cm), a 132 cm da beirada; em cima, o corpo fica 42° inclinado da vertical; ombro, quadril e tornozelo fazem no mínimo 176,6° (180° = reto) | sim |
| Descida de ~2 a 3 s: só os cotovelos dobram, apontando para a frente | consenso | 2,5 s; o cotovelo vai de 25° a 106°; o corpo inclina de 42° a 52° sem dobrar; embaixo, o plano do braço abre 0,6° do plano do meio do corpo (cotovelo reto para a frente) | sim |
| Até a testa chegar perto do apoio | consenso | embaixo, a cabeça fica a 6,0 cm da bancada, logo atrás da quina; no caminho, nunca mais perto que isso | sim |
| Embaixo: braços acima da cabeça, cotovelos dobrados | um estudo (posição) | embaixo, o braço fica elevado 178° em relação ao tronco, na linha do corpo, além da cabeça; o cotovelo fica 27 cm acima do tampo e 9 cm atrás da beirada | sim |
| Volta em ~1 s até os braços ficarem retos | consenso | 1,1 s, pelo mesmo caminho | sim |
| Músculos: tríceps principal, sem secundário | um estudo / consenso | `triceps` principal. A vista padrão do modo Músculos é a de cima (182 cm² visíveis, contra 56 de lado) | sim |

**Ombro e punho.** A elevação do braço vai de 122° (em cima) a 178° (embaixo), acima da média de 170° (aviso) e abaixo do máximo observado de 192°. O braço na linha do tronco é o que a ficha pede. A clavícula sobe de 15,7° a 17,0° (ritmo automático). O punho dobra para trás de 37° a 68° (média 70°).

**Por que os pés ficaram mais longe que hoje.** Com os pés a 112 cm da beirada (a medida de hoje), a cabeça passava por cima do tampo e o cotovelo ficava à frente da mão. Com a mão espalmada, o punho dobrava 109°, acima do máximo observado (95°): a conferência acusava falha. Com 132 cm, o cotovelo fica atrás da beirada e o punho dobra no máximo 68°.

Conferência automática: **0 falha, 5 avisos.**

1. A elevação do braço chega a 179,9° no ciclo, acima da média de 170°.
2. A dorsiflexão do tornozelo chega a 25° embaixo, acima da média de 15° e abaixo do máximo de 48°.
3. A supinação do antebraço chega a 94,1°, com a mão espalmada e o cotovelo para a frente. Não ajustei essa medida, que é a do motor para essa mão; vale olhar.
4. As linhas que são escolha de desenho: `maos.dentroDaBeirada`, `pes.atrasDaBeirada`, `pes.meiaDistancia`, `calcanhar.sobe`, `cotovelo.cima`, `testa.aoApoio` e `pescoco.flexao`.
5. A vista de lado não serve ao modo Músculos (o tríceps fica atrás do braço).

O ritmo fica suave (salto de 9,3%), e o corpo não entra na bancada (0 cm).

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Dobrar o quadril | de lado | o quadril dobra 28,5° (hoje 24°), sobe de 63 para 77 cm e vai para trás; o cotovelo dobra só 88° (o certo: 106°) |
| Abrir os cotovelos | de cima | os cotovelos vão a 39 cm do meio do corpo (o certo: 18); o plano do braço abre 68° |
| Ir até a falha | de lado | o cotovelo cede até 115° e a cabeça chega a 0,5 cm do tampo, logo atrás da quina |

## O equipamento

**Bancada de cozinha** (peça nova, `pecas-de-cena/bancada.ts`): o gabinete de base, o tampo e o rodapé recuado. As medidas vêm de uma página pública que descreve a linha METOD (Cubro, central de ajuda, lida em 15/11/2026): gabinete de 80 cm, pés de 8 cm, tampo de 2 cm, altura total de 90 cm e profundidade de 60 cm.

Ficaram **provisórias** (`a-conferir`): quanto o tampo passa da frente do gabinete (2 cm) e o recuo do rodapé (5 cm). A largura desenhada (120 cm) é escolha de desenho.

Hoje a bancada é uma caixa `BOX` lisa a 90 cm. A peça nova é desenhada com o gerador realista, e a peça de hoje não tinha cartão.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- "Ganhou a vista de cima (o erro 'abrir os cotovelos' só aparece de cima)": as vistas são `lateral` e `cima`, e o erro abre de cima.
- "Bancada = `BOX` a 90 cm": a mesma altura, agora com a peça desenhada.
- "Erro `falha` é de fim de série, e o quadro mostra só a repetição em que a testa chega ao apoio": é o que o erro desenha (0,5 cm do tampo).

## O que não ficou bom

- **A pose é bem diferente da de hoje, que foi aprovada.** Hoje o corpo fica mais em pé (32° a 47°), o cotovelo desce abaixo da beirada e o braço não chega acima da cabeça (cerca de 81° em relação ao tronco). Aqui o corpo fica mais deitado (42° a 52°), os pés mais longe (132 contra ~112 cm) e o braço vai à linha do tronco (178°), que é o que a ficha pede ("braços acima da cabeça"). Este é o maior risco desta folha.
- **As mãos estão espalmadas, e não segurando a beirada.** Espalmada, a mão fica parada e a conferência mede o contato. Segurando a quina, o punho giraria em volta dela.
- **A elevação do braço (178°) e a supinação do antebraço (94°)** passam da média. São avisos, e vale um olhar de quem conhece o exercício.
- **De lado, embaixo, a cabeça some entre os braços,** perto da quina, e o rótulo "só o cotovelo dobra" fica em cima do cotovelo, junto da cabeça.
- **O tríceps não aparece de lado:** o modo Músculos abre de cima.
