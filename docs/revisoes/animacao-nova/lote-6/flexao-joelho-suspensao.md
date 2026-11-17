# Lote 6 · Flexão de joelho na suspensão (`flexao-joelho-suspensao`)

De 15/11/2026. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-joelho-suspensao.md`. Texto do app: `src/conteudo/exercicios/flexao-joelho-suspensao.json` (só leitura). Animação de hoje: `src/engine/exercicios/flexao-joelho-suspensao.ts`; conferência antiga: `docs/revisoes/catalogo/conferencia/suspensao.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-joelho-suspensao.json`.
- Animação: `src/engine/novo/exercicios/flexao-joelho-suspensao.ts`, sobre `ponteDeCostas` (núcleo `exercicios/flexao-joelho.ts`), com dois campos opcionais novos: `piso` (as costas e a cabeça num colchonete) e `alvoDoPe` (o pé preso pela fita, no lugar da altura do apoio). A fita é a peça `pecas-de-cena/suspensao.ts`, sem mudança.
- Regras novas (`regras/flexao-joelho.ts`): `flexao-joelho-calcanhar-no-berco` e `flexao-joelho-ombros-no-colchonete`; reaproveitadas: `quadril-fora-do-chao` e `em-linha-no-fim`.
- Folha: `../prototipos/folha-flexao-joelho-suspensao.png`. Quadros grandes: `../quadros/flexao-joelho-suspensao.png`.

## Como a pose é montada

O mesmo movimento da deslizante (de costas, braços no chão, a bacia inclinando do quadril um pouco fora do chão ao corpo quase em linha), com três diferenças:

1. **A fita.** O comprimento sai dela pendurada a prumo, com o fundo do berço a um palmo e meio do chão (30,5 cm, o maior da faixa do fabricante, `alcaAlturaMax`): 151,3 cm pelo caminho da fita (a fita inteira desce 30 cm e se divide). A âncora fica a 182,9 cm (a altura "ideal" do fabricante) e, em z, sobre os pés, 25 cm para o lado da cabeça do calcanhar do início (escolha de desenho: o arco dos calcanhares fica mais raso). A cada quadro, a coxa gira até o fundo de cada berço ficar a esse comprimento da âncora: a fita não estica (`fios`, `estica: false`, medida) e os calcanhares andam num arco.
2. **O berço.** O fundo do berço fica atrás do centro do calcanhar, na direção da fita, a um "raio do calcanhar" medido na superfície do pé em cinco pontos do caminho (o meio entre o menor e o maior). Achado quadro a quadro, ele saltaria entre os pontos da superfície.
3. **O colchonete** sob os ombros e a cabeça (o app e a montagem segura), de 1,5 cm; ele acaba antes do quadril. As mãos ficam no chão, fora dele.
4. **A fita é cenário** (`cenario: true`): a âncora a 1,8 m encolheria o corpo deitado; o quadro corta a fita em cima, como fazia a animação de hoje. De lado, por isso, o berço fica atrás do pé.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Alças a um palmo e meio do chão; colchonete sob os ombros | consenso | o fundo do berço pendurado a 30,5 cm; colchonete de 1,5 cm sob os ombros e a cabeça | sim |
| Deitado de costas, pés embaixo da âncora, calcanhares nas alças, braços no chão | consenso | no início a fita fica a 9,4° do prumo; o pé fica de −0,6 a 0,7 cm do fundo do berço (dentro dele, amassando, ou encostado); mãos espalmadas no chão, paradas (0 cm) | sim |
| A fita não estica; os calcanhares pendem da âncora num arco | consenso (correção de 04/11) | comprimento de 151,3 a 151,3 cm; o fundo do berço sempre a 151,3 cm da âncora; o calcanhar anda 55,3 cm para o corpo e o berço vai de 33,9 a 35 cm do chão, descendo um pouco e subindo de novo (o arco passa embaixo da âncora) | sim |
| Quadril fora do chão o tempo todo | consenso | a pele do glúteo fica de 6,5 a 34,3 cm do chão | sim |
| Puxada em ~1 s; volta em ~2 s, sem o quadril encostar | consenso | 1,2 s e 2,5 s (como a deslizante e a de hoje) | sim |
| Com os joelhos dobrados, ombros, quadril e joelhos em linha | consenso | 171° de lado no fim (a regra da família aceita 170°); o joelho dobra 110° | **em parte**: deixei 9° de folga (ver abaixo) |
| Calcanhares em direção ao glúteo | consenso | no fim, o calcanhar fica 45,7 cm à frente do centro do quadril (28 na deslizante) | **em parte** (ver abaixo) |
| Ombros no colchonete, cabeça apoiada | consenso | costas (ou a base da nuca) de −0,1 a 0,2 cm do tampo; cabeça a 0 cm; o ombro não escorrega (0,2 cm), mas o centro dele sobe 4,1 cm | sim, com a nota |

Conferência automática (homem): **0 falha, 2 avisos**. No corpo da mulher, 0 falha. Amplitudes: joelho até 110°, quadril até 12° de flexão, ponto mais baixo do corpo −0,2 cm (também nos erros). Avisos: (1) Ritmo, 20,2% (cabeça, na puxada): com o quadril subindo tanto, o pescoço dobra depressa para a cabeça continuar apoiada; abaixo dos 25% de falha. (2) Provisórios: `joelho.fim`, `quadril.folgaNoInicio`, `quadril.fim`, `pe.angulo`, `fita.ancoraParaACabeca`, `fita.tronco`, `ombro.z`, `colchonete.z`, `maos.alcance`, `maos.paraFora`.

**A regra dos ombros.** A da deslizante (`ombros-e-cabeca-no-chao`) limita a 2 cm o quanto o centro do ombro anda. Aqui, com os pés no alto, o quadril sobe a 48 cm e o tronco gira em volta da parte de cima das costas: o centro do ombro sobe 4 cm porque a escápula rola no colchonete, e não há pose dentro da ficha que evite isso. Escrevi uma regra própria (`flexao-joelho-ombros-no-colchonete`) que mede o que a ficha pede (costas e cabeça no tampo, o ombro sem escorregar, limite 1 cm) e informa a subida. É uma regra diferente da do colega, e não a mesma afrouxada: quem integra deve decidir se aceita.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril encosta no chão | o quadril cai até o glúteo ficar a 0,3 cm do chão; os joelhos só chegam a 70° (com o quadril no chão e os calcanhares presos no alto, a fita não deixa dobrar mais); a linha fica em 124° |
| Arquear a lombar | a lombar arqueia 25° e a barriga sobe (quadril a 19° de flexão); a linha ombro–quadril–joelho, nos centros, dá 177° |
| Puxar pouco | o joelho para a 50° (40% do caminho); o calcanhar fica 80 cm à frente do quadril |

## Correções já feitas que esta animação respeita

- 04/11 (suspensões): a fita não estica; o comprimento sai da pose. A fita do pé tem 151 cm aqui (cerca de 180 na de hoje, com a âncora a 205 cm): uso a altura do fabricante da tabela de objetos.
- A correção da deslizante (pé em ângulo reto com a canela) vale aqui: o calcanhar fica no berço com a ponta do pé para cima.

## Músculos e vistas

Posteriores da coxa (principal) e glúteo (secundário), como a biblioteca conta para a flexão na bola. Vistas: de lado (padrão; Músculos, 67 cm²) e de três quartos de frente (`quina`), que mostra as duas fitas, os berços e o colchonete. Testei `quinaTras` (o tronco tapa as pernas e o principal some) e `cima` (o corpo deitado vira uma figura de frente, sem ler o movimento).

## O que não ficou bom

- **Linha e calcanhar no glúteo não cabem juntos.** Com os calcanhares no alto (o berço não desce dos 30 cm), dobrar mais os joelhos com o corpo em linha faz o quadril subir até o tronco ficar quase em pé sobre a nuca (com 120°, quadril a 54 cm e o pescoço muito dobrado: olhei e ficou feio). Fiquei com 110° e 171° na linha: o calcanhar termina 46 cm à frente do quadril, mais longe do glúteo que na deslizante.
- No fim, o pescoço fica dobrado (o queixo vai para o peito): é a cabeça apoiada com o tronco inclinado uns 40°. Não parece quebrado nos quadros, mas é a parte mais estranha da pose.
- De lado, a fita é uma linha fina e o berço fica atrás do pé (a fita é cenário); o berço só se vê de três quartos. No tema escuro a fita quase some.
- A âncora e a viga ficam fora do quadro (cortadas em cima).
