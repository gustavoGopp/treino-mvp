# Lote B1 · Desenvolvimento em pé com barra (`desenvolvimento-barra`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, dois passos atrás dos ganchos do suporte, a barra de 30 kg (barra de 20 kg e uma anilha de 5 kg de cada lado) apoiada na parte de cima do peito sobe rente ao rosto até os braços quase estenderem, com a barra sobre os ombros, e volta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento-barra.md`. Cartão do app: `src/conteudo/exercicios/desenvolvimento-barra.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/desenvolvimento-barra.json`.
- Animação: `src/engine/novo/exercicios/desenvolvimento-barra.ts`. O corpo em pé é o dos desenvolvimentos em pé aprovados (o núcleo `exercicios/dobrar-o-quadril.ts`, sem mudança, com o quadril parado no ângulo do equilíbrio médio da subida). Regras medidas: `src/engine/novo/regras/barra-no-suporte.ts` (as de lombar, tronco, pernas e equilíbrio são as já existentes).
- Quadros grandes: `../quadros/desenvolvimento-barra.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

O caminho da barra é calculado, não escolhido:

- **Embaixo**, a barra fica na altura do alto do esterno (8 cm abaixo da base do pescoço, pela tabela do corpo: 151,5 − 143,5 cm), encostada na pele, achada vindo de fora até tocar a superfície do Boneco.
- **Em cima**, sobre o centro dos ombros, na altura em que o cotovelo dobra 10° ("quase estender").
- **No meio**, a barra sobe "rente ao rosto": em cada centímetro de altura, a frente do queixo e do rosto dá o ponto mais para trás onde a barra pode passar a 1,5 cm da pele; o caminho é o fio esticado do peito até em cima que contorna esses pontos (o lado de fora deles). Por isso ele vai 8,3 cm para a frente enquanto passa pelo queixo e pelo rosto e depois volta para cima dos ombros.
- **A cabeça sai do caminho**: o pescoço estende até 12° enquanto a barra passa pelo rosto e volta ao lugar quando ela passa da testa (escolha de desenho; a ficha não dá número). Para o movimento da cabeça não dar tranco, a ida e a volta são lentas: com a barra no peito, a cabeça já está 6,6° para trás.
- **A mão**: embaixo, a barra apoia na base da mão, com o punho dobrado para trás (40° pedidos, 47° medidos com o antebraço); assim os cotovelos ficam à frente da barra, como a ficha pede. Na subida o punho endireita e fica reto em cima.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, abdômen e glúteos firmes | consenso | centros dos pés a 9 cm do meio (os do quadril a 8,35); joelhos a 8°, parados (de 8° a 8°); a lombar não arqueia (0°); a base do pescoço não sai do lugar (0 cm) | sim |
| Barra apoiada na parte de cima do peito | consenso | embaixo, a barra fica a 0 cm da pele, 8 cm abaixo da base do pescoço (o alto do esterno), a 143 cm do chão | sim |
| Pegada pouco mais aberta que os ombros | consenso | o centro de cada mão a 25 cm do meio da barra (os ombros a 20,4 cm) | sim |
| Cotovelos um pouco à frente da barra | consenso | embaixo, os cotovelos ficam 1,3 cm à frente dela; o cotovelo dobra 147° | sim (por pouco) |
| Empurra para cima, rente ao rosto | consenso | a barra passa a 1,5 cm da pele do queixo e do rosto no ponto mais perto, sem bater; o pescoço estende até 12° | sim |
| Até quase estender os cotovelos, com a barra sobre os ombros | consenso | em cima, a barra a 207,2 cm do chão, 1,4 cm da vertical dos ombros; o cotovelo dobra 10° | sim |
| ~2 s descendo, até a barra voltar à parte de cima do peito | consenso | 2 s de descida até o mesmo ponto; 1,3 s de subida; o último quadro emenda no primeiro (0 cm); o maior salto de velocidade é 14,2% do pico (a cabeça; limite 15%) | sim |
| Sem jogar o tronco; o peso sobre os pés | consenso | o centro de massa (corpo + 30 kg) anda de 2,4 cm atrás a 4,9 cm à frente do meio do pé (o limite é um quarto do pé, 5 cm), com o quadril parado | sim (no limite) |
| Barra no rack na altura do peito | consenso | o berço do gancho a 130 cm do chão (a altura do peito da tabela é 129,4 cm) | sim |
| Travas nas anilhas | consenso | as presilhas de mola aparecem nas mangas | sim |

**Conferência automática: 0 falha, 2 avisos.** As linhas da ficha de movimento que são escolha de desenho (`pegada.meia`, `punho.extensao`, `barra.folgaDoRosto`, `cabeca.paraTras`, `cabeca.entra`, `cabeca.sai`, `caminho.passo`, `carga.anilhas`, `suporte.passos`); e, no modo Músculos, de frente a frente do ombro mede 0 cm² (o desenvolvimento em pé com halteres aprovado também: 35 e 0 cm²), então o modo Músculos abre de lado (56 cm²). O cotovelo dobra no máximo 147,3° (embaixo), dentro da média.

## As vistas

**De lado** (padrão): mostra o que o cartão ensina com palavras, a barra rente ao rosto e sobre os ombros, a cabeça saindo do caminho, a lombar e as pernas paradas. **De frente**: a pegada, a barra subindo pela frente do rosto até acima da cabeça. O desenvolvimento em pé com halteres aprovado abre de frente porque, de lado, o halter passava na frente do rosto; aqui a barra precisa passar rente ao rosto, e é de lado que isso se vê.

Na vista de lado, as anilhas são pintadas atrás do corpo (a de perto cobriria a cabeça); a estrutura do suporte é cenário; os pinos, no furo mais baixo (50 cm), passam atrás das pernas.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arquear a lombar | de lado | em cima, a lombar arqueia 20° e as costas de cima 8°; o peito vai para trás (o tórax a 17,4° para trás) e a barra fica 17,9 cm atrás do meio do pé (no certo, 5,4 cm), o quadril indo para a frente pelo equilíbrio (os números dos desenvolvimentos em pé aprovados) |
| Impulso com as pernas | de lado | embaixo os joelhos dobram 30° e o tronco inclina 6°; na subida eles estendem e empurram a barra (o dos aprovados) |
| Descida curta | de frente | a descida para com a barra na altura da testa (169,4 cm do chão, a meio caminho entre os olhos e o alto da cabeça), e não no peito |

## O equipamento

- **Barra longa** (IWF), anilha de 5 kg (24 cm de diâmetro) e presilhas: 30 kg.
- **Suporte** novo: ganchos a 130 cm; os pinos no furo mais baixo (50 cm), porque o cartão não pede pinos neste exercício. A barra embaixo fica a 45 cm dos montantes (dois passos para trás, como no agachamento).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Dos desenvolvimentos em pé aprovados vêm a postura, os joelhos soltos e os números dos erros de arquear a lombar e de impulso com as pernas.

## O que não ficou bom

- **O caminho da barra vai 8,3 cm para a frente** ao passar pelo queixo: com a cabeça indo só 12° para trás, é o que a frente do rosto deixa. Uma pessoa de verdade também recua a cabeça (sem girar) e inclina um pouco o corpo para trás; o esqueleto não tem o recuo da cabeça sem giro, e inclinar o corpo seria o erro de arquear.
- **Com a barra no peito, a cabeça já está 6,6° para trás** (olhando um pouco para cima): é o preço de o movimento da cabeça não dar tranco na conferência (o salto de velocidade ficou em 14,2%, perto do limite de 15%).
- **Os cotovelos ficam à frente da barra por pouco** (1,3 cm). Para ir mais à frente, o cotovelo teria de ir para dentro, na frente do peito.
- **O equilíbrio fica no limite** (o centro de massa anda até 4,9 cm à frente do meio do pé; o limite é 5 cm): é a barra indo para a frente em volta do rosto.
- **O corpo fica menor no quadro de lado** que no agachamento: a barra em cima chega a 2,07 m e a anilha passa disso.
- **O suporte é diferente do cartão de hoje** (gaiola × suporte aberto; ver `resumo-suporte.md`).
