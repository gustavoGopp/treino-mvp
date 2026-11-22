# Lote A4 · Crucifixo invertido sentado, com o peito nas coxas, com halteres (`crucifixo-invertido-sentado`)

De 17/11/2026. Primeira animação deste exercício: até aqui ele aparecia no app só como cartão de texto, e não existe animação de hoje para comparar. Sentado na ponta da cadeira firme (encostada na parede), pés juntos no chão, o tronco inclinado até o peito encostar nas coxas, um halter leve em cada mão pendurado atrás das panturrilhas; os braços abrem para os lados, cotovelos levemente dobrados e fixos, até a altura dos ombros. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo).

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-invertido-sentado.md`; cartão do app: `src/conteudo/exercicios/crucifixo-invertido-sentado.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-invertido-sentado.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-invertido-sentado.ts`, sobre dois núcleos novos:
  - `exercicios/sentado-na-ponta.ts`: sentado na ponta da cadeira com o tronco inclinado (a altura da bacia e o lugar dos pés calibrados com a bacia já inclinada; a calibração de `quadril-sentado-na-cadeira.ts` é feita com o tronco reto e não serve) e a medida de quanto uma parte do corpo entra noutra (`entraNasPartes`, a mesma conta do `entraNoTronco` de `polia-puxar.ts`, para quaisquer partes). A rosca concentrada também usa.
  - `exercicios/crucifixo-invertido-sentado-base.ts`: o núcleo dos dois crucifixos invertidos sentados (com halteres e com caneleira). O arco dos braços é o do crucifixo invertido curvado aprovado (a mesma conta, reescrita, porque a de lá lê a ficha dela).
- Regras novas: `regras/sentado-na-ponta.ts` (sentado na ponta; peito nas coxas, parado; pescoço na linha das costas; halteres pendurados; atrás das panturrilhas; carga livre do corpo, da cadeira e do chão; braços livres das pernas). Usa também as do crucifixo inverso (`regras/crucifixo-inverso.ts`): cotovelos fixos, abre para os lados, até a linha dos ombros, escápulas, palmas.
- Cena: a cadeira (`pecas-de-cena/cadeira.ts`) e a parede da extensão de joelho com caneleira aprovada, como cenário. **Nenhum arquivo comum mudou** (a cadeira e `quadril-sentado-na-cadeira.ts` só são importados).
- Quadros grandes: `../quadros/crucifixo-invertido-sentado.png`. Sem folha (não há animação de hoje).

## Onde os números saem

A ficha da técnica dá a posição (sentado, peito nas coxas, halteres pendurados; consenso, `17`, G3) e o movimento (abrir para os lados até a altura dos ombros, cotovelos quase retos; um estudo de modelagem, `zhu2025`). O cartão acrescenta "na ponta da cadeira", "pés juntos", "atrás das panturrilhas", "palmas uma para a outra", "sem juntar as escápulas" e o ritmo (~1 s, pausa curta, ~2 s). O arco dos braços, o cotovelo, as escápulas, o halter leve e os erros de encolher e de virar remada saem do **crucifixo invertido curvado** aprovado; a cadeira e o glúteo no assento, da **extensão de joelho com caneleira** aprovada. Duas coisas não são escolhidas, são medidas:

- **A inclinação do tronco** é a que faz a pele do peito (a metade de cima do tronco) encostar na metade de baixo das coxas, amassando 1 cm (`peito.amassa`). Com a coluna dobrada 15° na lombar e 15° na torácica, a bacia inclina 67° e o peito fica a 92° da vertical (deitado nas coxas).
- **O começo do braço**: com o peito nas coxas o ombro fica a 66,6 cm do chão, e o braço do ombro ao centro da mão tem 64 cm; na vertical, o halter tocaria o chão. O braço pende 8° para trás (atrás das panturrilhas) e abre para o lado só o que deixa o halter 2 cm acima do chão (`inicio.folgaDoChao`): 23,3° da vertical.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado na ponta da cadeira, pés juntos no chão | consenso | o centro do quadril a 12 cm da borda; glúteo e coxa 1 cm dentro do tampo (o estofado amassa), parados; pés a 6 cm do meio, chapados (0 cm do chão), parados | sim |
| Peito nas coxas | consenso | a pele do peito amassa 1 cm a das coxas, do começo ao fim (de 1 a 1 cm); a base do pescoço anda 0 cm | sim |
| (O corpo não atravessa as coxas) | desenho | a barriga, junto da dobra do quadril, entra 3,8 cm nas coxas (sentado reto, na extensão aprovada, são 1,8 cm: é a carne que se junta na virilha); nos quadros grandes não se vê atravessar | sim, com nota |
| Pescoço neutro | desenho | a cabeça fica no máximo 3,8° fora do ângulo que faz com o alto das costas de pé; a 15,7 cm das pernas | sim |
| Halteres pendurados atrás das panturrilhas, palmas uma para a outra | consenso | o halter fica 2 cm acima do chão, 8,2 cm atrás da pele de trás da panturrilha; o polegar aponta para a frente (no máximo 4,7° fora); a linha do ombro à mão fica 23,3° da vertical (o chão não deixa menos) | sim, com nota |
| Cotovelos levemente dobrados (quase retos) e fixos | um estudo / consenso | 15° o ciclo todo | sim |
| Abre os braços para os lados | um estudo | a mão vai 39,6 cm para o lado e sobe 52,9 cm; anda 8,2 cm para a frente (é a volta de "atrás das panturrilhas" para o lado) | sim |
| Até a altura dos ombros | um estudo | no fim, a linha do ombro à mão fica 5° abaixo da horizontal, na linha dos ombros (0°) | sim |
| Pausa curta, sem juntar as escápulas; ombros longe das orelhas | consenso | a clavícula fica 2° abaixo do ritmo o ciclo todo; no fim, 2° atrás do ritmo (a remada chega a 10°) | sim |
| A carga não bate no corpo nem na cadeira | desenho | a carga fica a no mínimo 2,1 cm da pele, 20,8 cm da cadeira e 2 cm do chão; o braço não entra nas pernas | sim |
| ~1 s, pausa curta, ~2 s | consenso | 0,5 s pendurado, 1 s abrindo, 0,5 s no alto, 2 s descendo; salto de velocidade de 5,2% do pico (limite 15%) | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) A flexão do quadril chega a 144,8° (média da tabela 132°, máximo observado 159°): é o preço do peito nas coxas com a coluna só um pouco dobrada (15° + 15°). Com 25° + 25° o quadril ficava em 130°, mas as costas viravam uma corcunda; com 10° + 10°, 147°. Fiquei no meio. (2) As linhas de desenho da ficha (`joelho`, `assento.amassa`, `lombar`, `toracica`, `cervical`, `cabeca`, `inicio.folgaDoChao`, `cotovelo.paraTras`, `carga`).

## As vistas

- **De três quartos, de trás** (`quinaTras`, a que o app abre, como no crucifixo invertido curvado aprovado): mostra as costas deitadas nas coxas e os dois braços abrindo; o ombro de trás aparece (59 cm²).
- **De cima** (segunda, padrão do modo Músculos: 60 cm²): o T dos braços, como nos crucifixos que abrem de cima (decisão de 05/11).
- Testadas e descartadas: **de frente**, os joelhos tapam o tronco e a cabeça; **de trás**, a cadeira fica entre quem olha e o corpo e, como cenário, é pintada atrás dele (leitura errada); **de lado**, o braço de perto vem na direção de quem olha e o halter cobre o rosto (o ombro de trás não aparece: 0 cm²).

## Erros (os três do cartão, mesmo título, mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Levantar o tronco | três quartos, de trás | enquanto os braços abrem, a bacia endireita 25°: o peito sai 9 cm das coxas e a base do pescoço sobe 25,5 cm (o curvado aprovado sobe o tronco 25°) |
| Virar remada | três quartos, de trás | o braço abre como o certo, mas o cotovelo dobra até 85° e a mão fica pendurada embaixo dele (como no curvado aprovado) |
| Encolher os ombros | três quartos, de trás | no fim, a clavícula sobe 18° além do certo (os ombros vão para as orelhas). De cima o título caía em cima da cadeira |

## O equipamento

- **Halteres:** o sextavado de 10 lb da tabela (`dados/objetos/halter-leve.json`), o do curvado aprovado; o cabo de frente para trás.
- **Cadeira:** a cadeira firme da tabela (assento a 45,1 cm), encostada na parede, como cenário.

## Correções já feitas que esta animação respeita

- Crucifixos invertidos (achado 5 da revisão de anatomia): só o ombro de trás, sem secundário; as escápulas não se juntam com força (2° atrás do ritmo).
- Erros com o mesmo título e a mesma ordem do cartão; rótulos em minúsculas, sem ponto, no máximo dois por vista.

## O que não ficou bom

- **O começo não é "na vertical".** Com o peito nas coxas, o ombro fica a 66,6 cm do chão e o braço com o halter não cabe pendurado reto: ele começa 23,3° aberto (e 8° para trás). Lê-se como "pendurado junto do chão", mas o halter fica a 42 cm do meio, um pouco para fora das pernas. Tentei: tirar o ombro para a frente do começo (4° → 0°) e baixar a folga do chão (3 → 2 cm); dobrar mais o cotovelo ganha 1 cm só. A regra do crucifixo inverso (até 15° da vertical) não serve aqui; a regra nova pede o halter o mais baixo que o chão deixa (a até 5 cm dele) e mostra o ângulo.
- **A flexão do quadril (144,8°)** passa da média da tabela (aviso), pelo motivo acima.
- **A barriga entra 3,8 cm nas coxas** na medida dos anéis (a referência sentada reta é 1,8 cm). Não aparece nos quadros, mas é número a conferir.
- **De três quartos, a cadeira** fica entre quem olha e o corpo, e é pintada atrás dele (cenário). Lê-se bem como "sentado na ponta", mas não é a ordem real.
- **A janela da axila** (o fundo entre o braço de perto e as costas) aparece como um recorte claro no meio do corpo nos quadros de três quartos, como no curvado.
