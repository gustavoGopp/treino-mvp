# Lote A3 · Crucifixo invertido curvado com halteres (`crucifixo-invertido-curvado`)

De 17/11/2026. Primeira animação deste exercício: até aqui ele aparecia no app só como cartão de texto, e não existe animação de hoje para comparar. Em pé, sem banco, o tronco bem inclinado à frente com as costas retas, um halter leve em cada mão; os braços abrem para os lados, com os cotovelos levemente dobrados e fixos, até perto da linha dos ombros, com o tronco parado. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo).

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-invertido-curvado.md`; cartão do app: `src/conteudo/exercicios/crucifixo-invertido-curvado.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-invertido-curvado.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-invertido-curvado.ts`. O corpo parado sai do núcleo do stiff (`dobrarOQuadril`, de `dobrar-o-quadril.ts`, já exportada), com a postura da remada curvada com halteres aprovada; o arco dos braços é o do crucifixo inverso no banco (mesma conta, reescrita no arquivo, porque a função de lá lê a ficha dela); usa `bracoNaLinha` e `dobrar` (`na-fita.ts`) e `halterNaMao` (`dobrar-o-cotovelo.ts`), já exportadas. **Nenhum arquivo comum mudou.**
- Regras: nenhuma nova. Usa as do crucifixo inverso (`regras/crucifixo-inverso.ts`: braços pendurados no começo, cotovelos fixos, abre para os lados, até a linha dos ombros, escápulas sem encolher nem juntar, palmas uma para a outra), as das remadas (`tronco-bem-inclinado`, `tronco-parado-na-remada`, `carga-livre-do-corpo-e-do-banco`), a dos ombros (`peso-perto-do-meio-do-pe`) e a comum `lombar-neutra`.
- Quadros grandes: `../quadros/crucifixo-invertido-curvado.png`. Sem folha (não há animação de hoje para pôr ao lado).

## Onde os números saem

A ficha da técnica dá a posição (pés na largura do quadril, joelhos levemente dobrados, tronco "bem inclinado, perto de 45° ou mais", costas retas, halteres pendurados), o movimento (abre para os lados, cotovelos levemente dobrados e fixos, até perto da linha dos ombros), o tronco parado e a descida controlada, tudo por consenso (`nsca2021`, não verificado). Os números que ela não dá saíram de duas animações aprovadas: a **remada curvada com halteres** (a postura curvada sem apoio: joelhos a 20°, peito a 62°, pescoço; os erros de arredondar as costas e de subir o tronco) e o **crucifixo inverso no banco**, aprovado por delegação ontem (o arco: começo 8° para fora, fim 5° abaixo da horizontal, cotovelo a 15° apontando para fora e um pouco para trás; as escápulas; o halter leve; os erros de encolher e de dobrar os cotovelos).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, joelhos levemente dobrados | consenso | pés a 9 cm do meio, parados (0 cm); joelhos a 20° o ciclo todo | sim |
| Tronco bem inclinado (perto de 45° ou mais) | consenso | o peito fica a 63,3° da vertical (26,7° da horizontal); o quadril dobra 89,7° | sim |
| Costas retas | consenso | a lombar fica na curva de repouso (0°) | sim |
| Tronco parado, sem subir a cada repetição | consenso | a base do pescoço e a bacia andam 0 cm; o tórax gira 0° | sim |
| (Equilíbrio, mecânica) | consenso | o centro de massa (corpo + halteres) fica sobre o meio do pé: anda de 0 a 0 cm dele (os braços abrem para o lado, sem ir à frente nem para trás) | sim |
| Halteres pendurados, palmas uma para a outra | consenso | no começo, a linha do ombro à mão fica 8° da vertical; o polegar aponta para a frente (no máximo 2,6° fora): embaixo as palmas ficam uma para a outra; o centro da mão fica a 46 cm do chão, na altura do joelho | sim |
| Cotovelos levemente dobrados e fixos | consenso | o cotovelo fica dobrado 15° o ciclo todo (de 15° a 15°) | sim |
| Abre os braços para os lados | consenso | a mão vai 54,6 cm para o lado e sobe 57,5 cm, sem andar para a frente nem para trás (0 cm) | sim |
| Até perto da linha dos ombros | consenso | no fim, a linha do ombro à mão fica 5° abaixo da horizontal e, vista de cima, na linha dos ombros (0°); o centro da mão fica 5,5 cm abaixo do ombro | sim |
| Sem encolher os ombros nem juntar as escápulas (correção do achado 5) | consenso | a clavícula fica 2° abaixo do ritmo normal do ombro o ciclo todo; no fim, só 2° atrás do ritmo (a remada, que junta as escápulas, chega a 10°) | sim |
| Os halteres não batem no corpo | desenho | a carga fica a no mínimo 2,1 cm da pele (12 cm das pernas e do tronco, sem contar a mão e o antebraço que seguram) | sim |
| Pausa curta em cima, descida controlada | consenso | topo parado 0,5 s ("tronco parado"); descida em 2,2 s; subida em 1,2 s (a ficha não dá número) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs crucifixo-invertido-curvado`): **0 falha, 1 aviso**. O aviso: as linhas da ficha de movimento que são escolha de desenho (`cervical`, `cabeca`, `inicio.fora`, `cotovelo.paraTras`, `carga`). O ritmo fica suave (salto de 4,4% no cotovelo, na subida); a simetria e o ciclo fecham em 0 cm; a elevação do braço chega a 88,4°.

### Por que 62° (e não 45°)

A ficha diz "perto de 45° ou mais". A remada curvada aprovada, que tem a mesma postura e o mesmo núcleo, usa 62°, e o crucifixo invertido curvado é feito com o tronco perto da horizontal em quase todo material de treino: com o tronco mais deitado, abrir os braços para os lados trabalha o ombro de trás contra a gravidade. Ficou o número da remada aprovada (o Gustavo já viu essa postura), dentro do "ou mais" da ficha.

### O arco dos braços

O mesmo do crucifixo inverso no banco: a linha do ombro à mão gira em volta da direção para a frente do mundo, de pendurada a perto da horizontal, para o lado. Com o peito a 63°, isso é abrir o braço no plano do tronco (abdução horizontal), o movimento do ombro de trás. A mão mantém o polegar para a frente: embaixo as palmas ficam uma para a outra (o cartão); em cima, viradas para o chão. O halter pende da mão, com o cabo de frente para trás.

### A vista

| Vista | O que se lê |
|---|---|
| três quartos, de trás (`quinaTras`, **a padrão**) | o tronco inclinado com as costas retas, o arco dos dois braços e o ombro de trás; é a única que mostra tudo de relance |
| de trás (`posterior`, a segunda) | o arco inteiro no plano da tela, simétrico (um "T" no fim), como no crucifixo inverso; o ombro de trás tem a maior área (72 cm²) |
| de lado (`lateral`) | mostra bem o tronco e as costas, mas os braços vêm na direção de quem olha e o halter de perto tapa a cabeça no topo; serve só ao erro de arredondar (com os braços pendurados) |

A de trás sozinha engana: com a câmera na horizontal e o tronco inclinado para longe dela, o corpo parece de pé, como numa elevação lateral (`posterior:tec:f0` e `f1` nos quadros). Por isso ela é a segunda, e a que abre é a de três quartos de trás, que deixa ver que a pessoa está curvada.

## Erros

O cartão tem quatro erros; os quatro viraram desenho, na ordem do app.

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar as costas ("a lombar perde a posição") | de lado, braços pendurados (instante 0) | a lombar e as costas de cima curvam 22° cada, a série toda; a bacia vira para trás o bastante para a base do pescoço ficar na mesma altura (o peito vai de 63° a 75° da vertical): as costas fazem uma corcunda. Os halteres ficam a 10 cm das pernas. Fica curvo a série toda (a perda de posição não depende do braço), e o quadro parado é o de braços pendurados: de lado, com os braços abertos, o halter de perto tapava a cabeça |
| Subir o tronco ("embalo a cada repetição") | três quartos, de trás | o tronco levanta 25° em volta do quadril enquanto os braços abrem: o peito vai de 63° a 38° da vertical e a base do pescoço sobe 19 cm |
| Encolher os ombros ("o trapézio assume") | de trás | no fim, a clavícula sobe 18° além do certo (16° além do ritmo); o centro do ombro sobe 1,2 cm e a ponta do ombro mais |
| Dobrar os cotovelos ("vira uma remada") | de trás | o braço sobe como o certo, mas o cotovelo dobra até 85° e a mão fica pendurada 33,7 cm abaixo dele: uma remada com os cotovelos abertos |

## O equipamento

- **Halter sextavado de 10 lb** (`dados/objetos/halter-leve.json`): o cartão pede "um par de halteres leves". O mesmo do crucifixo inverso e da elevação com halteres.
- Sem banco nem peça de cena: só o chão.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- **Achado 5 da revisão de anatomia** (linha 189): os crucifixos invertidos contam só o ombro de trás e não juntam as escápulas. Respeitada: `papeis` só tem `deltPost`, e a regra mede a clavícula só 2° atrás do ritmo no fim.
- **05/11, crucifixos abrem de cima** (linha 60): valia para os crucifixos em pé na polia, de tronco reto, em que de cima se via o arco das mãos. Aqui, com o tronco curvado, de cima se vê só as costas e os braços em cruz (sem o tronco inclinado); a de três quartos de trás mostra o arco e a postura. Vale olhar.

## O que não ficou bom

- **O ombro de trás no modo Músculos** aparece pequeno: de trás, no topo, é uma faixa fina em cima de cada ombro; de três quartos, uma mancha no ombro de perto (`quinaTras:mus:f0.5`). É o mesmo do crucifixo inverso; não há vista "de trás e de cima" no motor.
- **A vista de trás parece de pé** (ver "A vista"). Ficou como segunda, porque é onde o arco e os erros de encolher e de dobrar os cotovelos se leem melhor.
- **O fio do rótulo "Subir o tronco"** passa por cima do braço de perto (`quinaTras:err:f1:e2`); o texto fica fora do corpo.
- **O tempo da subida (1,2 s)** é escolha de desenho: a ficha não dá número.
