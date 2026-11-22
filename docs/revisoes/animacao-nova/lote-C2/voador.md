# Lote C2 · Voador (peck deck) (`voador`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no voador, as costas no encosto, as mãos nos pegadores verticais; cada braço da máquina gira num eixo vertical no alto, sobre o ombro, e as mãos abrem até um pouco antes da linha dos ombros e fecham à frente do peito, com os cotovelos levemente dobrados e fixos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/voador.md`. Cartão do app: `src/conteudo/exercicios/voador.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/voador.json`.
- Animação: `src/engine/novo/exercicios/voador.ts`, sobre o núcleo novo `exercicios/no-voador.ts` (o mesmo do voador invertido). Regras medidas: `src/engine/novo/regras/voador.ts`.
- A máquina: `src/engine/novo/pecas-de-cena/voador.ts`, medidas em `src/engine/novo/dados/objetos/voador.json`, folha em `docs/revisoes/animacoes-restantes/pecas/folha-voador.png`.
- Quadros grandes: `../quadros/voador.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras, sem número. O manual público da Life Fitness (linha Insignia, Pectoral Fly / Rear Deltoid SS-FLY, p. 28) dá o que virou regra: **o assento na altura em que o cotovelo fica um pouco abaixo do ombro**, com as mãos nos pegadores verticais ("Adjust the seat height so elbows are slightly below shoulders, when holding the vertical handles"); **os braços giram em volta do ombro** ("rotate the handles out and about the shoulder"), e os desenhos de cima do manual põem os eixos sobre os ombros; e a volta não deixa as placas descansarem. O ritmo (abrir em ~2,5 s, pausa curta aberto, fechar em ~1,5 s) e a folga de 3 cm entre as mãos fechadas saem do crucifixo com halteres aprovado.

**O movimento não é escolhido quadro a quadro:** a mão fica presa no pegador, que anda num arco em volta do eixo do braço da máquina; o eixo passa pelo centro do ombro, e o cotovelo resolve sozinho. A bacia é posta uma vez por corpo (gravada pelo `preparo.mjs`): o glúteo no assento, amassando 1 cm, e o centro dos ombros sob os eixos no meio do arco. O raio do arco, a altura do assento e o lugar do encosto saem do corpo da tabela sentado na máquina (ver a peça).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão, e a Life Fitness) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Os braços giram em volta do ombro ("about the shoulder") | consenso | o centro do ombro fica a no máximo 0,3 cm (na horizontal) do eixo do braço da máquina | sim |
| As mãos presas nos pegadores | consenso | o centro da mão a 0 cm do centro do pegador vertical, o ciclo todo; o polegar para cima | sim |
| Cotovelos levemente dobrados e fixos | consenso | o cotovelo fica dobrado de 20,1° a 22,4° do fechado ao aberto (2,3° de diferença: o ritmo da escápula move o ombro ~3 mm ao longo do arco, e a mão presa no pegador muda um pouco o ângulo) | sim |
| Banco na altura em que os pegadores ficam na linha do meio do peito; cotovelo um pouco abaixo do ombro (Life Fitness) | consenso | assento a 46 cm; o centro do cotovelo 3,7 a 3,8 cm abaixo do centro do ombro; a mão 2,2 a 2,5 cm abaixo dele | sim |
| Costas no encosto, escápulas juntas | consenso | as costas a −0,5 cm da face do encosto (o estofado amassa), do começo ao fim; o glúteo a −1 cm do tampo do assento; a base do pescoço anda 0 cm; a clavícula 7° para trás e 3° para baixo, parada | sim |
| Abre até alongar, sem levar os braços para trás da linha do ombro | consenso | aberto, a linha do ombro à mão fica a 84,8° da frente, 5,2° antes da linha dos ombros | sim |
| Fecha à frente do peito | consenso | fechado, as mãos ficam a 2,1 cm uma da outra, 61,6 cm à frente dos ombros | sim |
| A volta sem deixar as placas descansarem (Life Fitness) | consenso | as placas do pino ficam de 1,7 cm (aberto) a 18,7 cm (fechado) acima das de baixo, o arco do came (erro de 0 cm) | sim |
| O ritmo | desenho | abrir 2,5 s, pausa 0,45 s, fechar 1,5 s; salto de velocidade de 3,6% do pico (limite 25%) | sim |

Pés firmes no chão, na largura do quadril, o joelho a 84°. Pescoço e cabeça: com o tronco deitado com o encosto (a bacia 12° para trás), o pescoço dobra 10° para o olhar ficar à frente.

**Conferência automática: 0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho: `bacia`, `lombar`, `cervical`, `cabeca`, `assento.amassa`, `pes.meiaDistancia`, `pes.frente`, `psi.meio`). O modo Músculos serve nas duas vistas.

## As vistas

**De cima** (a que o app abre, como os crucifixos aprovados: decisão do Gustavo de 05/11/2026) e **de frente**. De cima se veem o arco das mãos, o cotovelo fixo e os pegadores; a viga, os eixos e os braços da máquina acima dos pegadores são cortados (cobririam a cabeça e os braços de quem senta), como a travessa do smith, e a cabeça ganha o contorno próprio (`vies.cabeca`, a opção do Boneco da abdutora). De frente se veem os eixos sobre os ombros, os braços da máquina descendo até os pegadores e a pilha subindo na torre, atrás do corpo, à direita. De lado, o braço de perto aponta para quem olha quando abre; de três quartos, a máquina encolhe o corpo.

Dois cortes de ilustração (a parte pintada atrás do corpo, como a alavanca da máquina de glúteo): de frente, com as mãos fechadas, os braços da máquina descem dos eixos até os pegadores passando na frente do rosto; o corpo e os braços são pintados por cima deles. O pegador vertical fica 10 cm ao lado do braço da máquina, para o braço passar ao lado da cabeça, e não na frente do rosto.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Abrir demais | de cima | aberto, a linha do ombro à mão vai a 111,7° da frente (21,7° atrás da linha dos ombros, em vez de 5,2° antes dela): a posição inicial regulada longe demais (125°, em vez de 104°) |
| Tirar as costas | de três quartos, por trás | aberto, o tronco sai do encosto: a bacia gira 10° e as costas de cima 6° para a frente; a base do pescoço anda 12,4 cm para a frente. A mão continua presa no pegador e o cotovelo no mesmo ângulo (20,3°): o arco anda junto com o ombro, e os braços ficam 9° mais para trás (94,2°) |
| Dobrar e esticar os cotovelos | de cima | fechando, os ombros vão para a frente (a clavícula 20° à frente) e, com a mão presa no pegador, o cotovelo dobra até 46,8° (o certo, 22,4°), como no fim de um supino; abrindo, estica de novo |

"Dobrar e esticar os cotovelos": com o eixo sobre o ombro e a mão presa no pegador, o cotovelo só pode dobrar se o ombro chegar perto da mão; o desenho mostra essa consequência (os ombros vão para a frente quando as mãos fecham), e não uma mão que sai do pegador.

## O equipamento

O voador novo (ver a folha e o resumo do grupo, `resumo-voador.md`): o tamanho total das fichas da Movement, da Life Fitness, da Precor e da Hammer Strength; os eixos sobre os ombros, o raio do arco, a altura do assento e o lugar do encosto saem do corpo da tabela. A mesma máquina faz o voador invertido: o encosto anda na guia e o assento sobe.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Do crucifixo com halteres aprovado vêm o ritmo, a folga entre as mãos e a vista de cima como a padrão.

## Mudanças em arquivo comum

Nenhuma. A máquina, o núcleo e as regras são arquivos novos; os registros ganharam uma linha cada; `scripts/animacao-nova/folha-pecas.mjs` ganhou a seção do voador, sem mudar as outras. Usa `viesNaVista` e `vies.cabeca`, opções que já existiam.

## O que não ficou bom

- **O cotovelo varia 2,3°** (de 20,1° a 22,4°), e não zero: o ombro do Boneco anda ~3 mm com a direção do braço (o ritmo da escápula com o tronco deitado), e a mão presa no pegador não deixa o cotovelo parado. A regra aceita até 2,5° (a do crucifixo aceita 2°).
- **De frente, o corpo ocupa pouco mais da metade da altura do quadro**: a máquina tem 199 cm (a viga dos eixos, a da Movement) e a cabeça de quem senta fica a ~135 cm. Cortar a viga tiraria do quadro os eixos sobre os ombros, que é o que explica a máquina.
- **De frente, com as mãos fechadas, os braços da máquina descem e somem atrás da cabeça** (o corte de ilustração): eles estão na frente do rosto, de verdade.
- **De cima, a base da coluna e um pedaço da torre aparecem no alto do quadro**, cortados pela borda.
- **"Tirar as costas" fica na vista de três quartos por trás, com o corpo menor**: de lado, o nome do erro caía em cima da torre.
- **O encosto é curto (32 cm) e começa 43 cm acima do assento**: ele também é o apoio do peito do invertido, e embaixo dele passam as coxas de quem senta virado para ele. No voador, a lombar fica sem apoio.
- **Os ângulos (84,8° aberto, −12° fechado) são escolhas**: a ficha só diz "até alongar, sem passar da linha do ombro" e "à frente do peito".

## Correção de 19/11 (auditoria, pequenos)

**O achado da auditoria: de cima, o alto do encosto é pintado sobre o alto das costas. Confirma-se.** No desenho real, de cima, 2 anéis do tronco ficam na frente do encosto e por cima dele na tela e são pintados por baixo dele: a borda da frente do encosto cortava o alto das costas em linha reta. A causa: o encosto entra na ordem pelo centro dele (104,2), acima do centro do corpo (96,3), e o alto das costas passa acima do topo dele.

**O que mudou.** Subir o corpo na ordem não servia: os joelhos passariam por cima dos pegadores e os braços ficariam por baixo do tronco. A peça (`pecas-de-cena/voador.ts`) ganhou a opção `encostoAtrasDeCima`, desligada por padrão: de cima, o encosto, com o tubo e a barra que o prendem por trás, vai para trás na ordem de pintura (o desenho não muda). O núcleo `no-voador.ts` a repassa (opção nova, desligada por padrão); o voador a liga com 12 cm (linha nova da ficha, `pintura.encostoAtrasDeCima`). O voador invertido não muda.

| de cima | antes | depois |
|---|---|---|
| anéis do tronco por baixo do encosto | 2 de 2 | 0 de 2 |

**Conferência nova:** `voador-costas-por-cima-do-encosto` (`regras/voador.ts`): nas duas vistas e na de cada erro (também a de três quartos de trás), na técnica e nos três erros, os anéis da cabeça, do tronco e dos braços, antebraços, coxas e canelas dos dois lados contra o encosto. Depois: passa.

**Conferência automática:** 0 falha, 1 aviso (o de antes; a lista das linhas de desenho ganhou `pintura.encostoAtrasDeCima`). Preparo: as calibrações do voador têm a chave com as opções do núcleo, e a chave ganhou a opção nova; os valores não mudam. Quadros refeitos.

**O que ainda não ficou bom:** nada que eu tenha visto nos quadros de cima, de frente e de três quartos de trás.
