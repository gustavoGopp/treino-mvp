# Lote A2 · Abertura com o elástico entre as mãos, sem ponto de ancoragem (`abertura-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, braços estendidos à frente na altura do peito, palmas para baixo, o elástico longo em laço dobrado entre as mãos, um pouco esticado; os braços, quase retos, abrem para os lados e um pouco para cima até a faixa chegar perto do peito. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/abertura-elastico.md`. Cartão do app: `src/conteudo/exercicios/abertura-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abertura-elastico.json`.
- Animação: `src/engine/novo/exercicios/abertura-elastico.ts`, sobre o corpo em pé do núcleo `polia-bracos.ts` (`montarEmPe`, `equilibrar`, `bracoNoArco`, já exportados: o corpo do face pull com elástico e o braço dos crucifixos na polia aprovados), a faixa do elástico longo (`pecas-de-cena/elastico-longo.ts`) e o caminho que contorna o corpo (`elastico-faixa.ts`).
- Regras medidas novas: `src/engine/novo/regras/abertura-elastico.ts` (seis, com o prefixo `abertura-elastico-`).
- Quadros grandes: `../quadros/abertura-elastico.png`. **Sem folha** ao lado da de hoje: este exercício não tinha animação.

## Qual elástico, e onde a mão segura: o elástico fecha a conta

O cartão só diz "um elástico, segurado com as duas mãos" e a ficha diz que "pegada mais fechada estica mais". Com o tubo com pegadores (48 pol), segurando pelos pegadores as mãos teriam de começar a 140 cm uma da outra, com os braços já abertos. Por isso a faixa é o **elástico longo em laço** da tabela (41 pol, 208 cm de volta inteira, estica até 2,5 vezes; o mesmo do tríceps com elástico acima da cabeça aprovado), dobrado: cada mão fecha sobre as duas camadas, e o resto do laço fica pendurado do lado de fora do punho (13 cm). No começo, as mãos ficam a 76 cm uma da outra (o centro de cada uma a 38 cm do meio, escolha de desenho) e a faixa entre elas está 1,05 vez esticada ("um pouco esticado"); disso sai o comprimento em repouso entre as mãos, 72,4 cm. No fim as mãos ficam a 161 cm e a faixa entre elas estica **2,2 vezes** (o máximo do fabricante é 2,5).

Tentei antes segurar o laço pelas duas pontas (sem nada pendurado): as mãos teriam de começar a ~100 cm uma da outra, com os braços a 30° da frente, e não "à frente". E com a pegada a ~65 cm, a faixa passaria de 2,5 vezes no fim.

A conferência automática mede o laço inteiro (as duas camadas e as pontas penduradas, que não esticam): de 1 a 1,9 vez. O quanto estica a faixa entre as mãos é a regra nova `abertura-elastico-esticado-entre-as-maos`, que lê o comprimento em repouso numa marca do quadro.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, braços estendidos à frente, na altura do peito | um estudo / consenso | no começo, o braço fica 18° aberto a partir da frente (visto de cima) e o centro da mão a 128 cm (o peito do corpo em pé fica a 129 cm) | sim |
| Palmas para baixo | um estudo | o polegar fica de −13° a 5° da horizontal, sempre virado para a outra mão (o antebraço prona de 20° a 50° a partir da pegada neutra) | sim |
| O elástico entre as mãos, um pouco esticado, seguro com a mão inteira | consenso | a faixa estica 1,05 vez no começo; o centro de cada mão fica a 0 cm dela | sim |
| Abrir para os lados e um pouco para cima, em diagonal | um estudo | o braço abre de 18° a 76° a partir da frente e a mão sobe 13,6 cm (de 128 a 141 cm) | sim |
| Braços quase retos | consenso | o cotovelo dobra 8° o ciclo todo | sim |
| Fim: braços abertos, elástico perto do peito, abaixo do rosto | consenso | a faixa fica a 2 cm da pele do peito, a 141 cm do chão, 11 cm abaixo do queixo; junto dos punhos ela encosta na frente dos antebraços (passa a 0,4 cm da pele, sem entrar) | sim |
| Ombros baixos | consenso | a clavícula sobe 0° além do ritmo normal do ombro | sim |
| ~1 s abrindo, pausa curta, ~2 s voltando | consenso | 1,1 s, 0,4 s e 2,1 s (mais 0,4 s no começo); salto de velocidade de 4,7% (limite 15%) | sim |
| O corpo parado | consenso | a base do pescoço não se mexe (0 cm); os pés parados; o centro de massa dentro do apoio | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) O laço inteiro estica mais no fim do que no primeiro quadro (o aviso mede "mais esticado no começo"; aqui ele estica ao abrir, como deve). (2) As linhas de escolha de desenho: `pes.meiaDistancia`, `joelho`, `tronco`, `cervical`, `cabeca` (do face pull com elástico aprovado) e `inicio.maos` (onde a mão segura a faixa). (3) De cima o ombro de trás não aparece (0 cm²); o modo Músculos abre de trás (52 cm²).

## As vistas

**De cima** (padrão do modo Técnica): é onde o arco dos braços e a faixa se leem, como nos crucifixos e no face pull (decisão do Gustavo de 05/11/2026 de abrir de cima os exercícios de arco). **De trás** (padrão do modo Músculos): o ombro de trás e os ombros baixos. De frente a faixa e os braços se leem bem no fim, mas o ombro de trás não aparece; de lado, os dois braços se sobrepõem.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Dobrar os cotovelos | de cima | os cotovelos dobram até 80° e vão para trás, e os braços abrem 15° menos: as mãos param a 123 cm uma da outra (o certo: 161 cm). Vira uma remada |
| Encolher os ombros | de trás | a clavícula sobe 16° além do ritmo normal (30° contra 14°) |
| Soltar uma ponta | de três quartos | a mão esquerda abre e o braço dela vai 20° mais para trás; a faixa, solta, volta para a mão direita e a ponta passa a 9 cm da frente do rosto |

"Soltar uma ponta": o cartão diz a consequência ("o elástico volta no rosto"); o desenho é o instante em que a ponta solta passa na frente do rosto. A curva da faixa no ar, os 20° do braço e os 9 cm são escolha de desenho.

## O equipamento

- **Elástico:** o laço de 41 pol da tabela (`dados/objetos/elastico-longo.json`, RubberBanditz e Serious Steel), desenhado como faixa chata que estreita ao esticar. As duas camadas entre as mãos aparecem como uma faixa só; as pontas do laço, penduradas fora dos punhos, não esticam.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Valem as dos exercícios de arco (abrir de cima, 05/11) e as do elástico (a faixa afina ao esticar; rótulos fora do corpo, em minúsculas).

## O que não ficou bom

- **De trás, no começo, os braços parecem dobrados**: estendidos à frente, eles ficam encurtados nessa vista e o cotovelo (8°) parece dobrar mais. É a vista do modo Músculos; no modo Técnica (de cima) os braços se leem retos.
- **As pontas do laço penduradas** aparecem de trás e de frente como dois "ganchos" azuis embaixo das mãos. São o que acontece de verdade quando se segura o laço mais fechado, mas são um detalhe a mais.
- **O erro "soltar uma ponta"** é o mais fraco: a faixa no ar é uma curva escolhida (o motor não simula a faixa voltando), e de três quartos o braço direito aponta para quem olha.
- **A faixa encosta na frente dos antebraços no fim** (0,4 cm da pele): é o que acontece com a faixa perto do peito, mas no desenho de cima ela parece passar por cima dos antebraços.

## Risco de o Gustavo não gostar

**Médio.** A técnica confere em tudo e a vista de cima se lê bem, mas há duas escolhas que ele não viu em nenhuma aprovada: o laço dobrado com as pontas penduradas (para o elástico fechar a conta) e o erro "soltar uma ponta" com a faixa no ar.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (G4) achou que, de cima, a cabeça some dentro da silhueta dos ombros: o Boneco pinta o corpo com um contorno só, por fora, e de cima a cabeça fica sobre os ombros, mais perto de quem olha; sem linha nenhuma entre os dois, sobrava só o calombo do rosto. A animação saiu da aprovação até a correção.

**A mudança.** O quadro liga, só na vista de cima, a opção `cabeca` do Boneco (acréscimo de 18/11, o mesmo do quadril na máquina da fase C): a cabeça é pintada de novo por cima do corpo, com o contorno próprio. Nada mais muda: a pose, o equipamento, as outras vistas e os erros ficam como estavam. Vale também para o erro "Dobrar os cotovelos", que o guia mostra de cima.

**A regra nova** (comum, `cabeca-aparece-em-cada-vista`, em `src/engine/novo/regras/vistas-do-guia.ts`, ligada só nesta ficha e nas das outras três da mesma correção): em cada vista que o guia mostra (as do exercício e as dos erros), no ciclo (5 instantes) e em cada erro na vista dele (começo, meio, fim e o instante do erro), mede o ângulo entre o eixo do tórax e a direção de quem olha, a fração do contorno da cabeça na tela que cai dentro da silhueta do tronco (pescoço, tronco, cintura e bacia) e quanto a cabeça fica mais perto de quem olha que o tronco. A cabeça "sumiria" quando o eixo fica a até 30° de quem olha, mais de 35% do contorno dela cai dentro da silhueta e ela está na frente; aí o quadro tem de ligar o contorno próprio dela (`cabeca` em `vies` ou `viesNaVista` daquela vista). De frente, de lado e de três quartos, em pé, só o queixo ou a nuca encostam na silhueta (17% a 22% do contorno, a 76° a 90°): a regra não pede nada ali. A cabeça é do meio do corpo: não tem lado.

| vista de cima (a primeira vista, e a do erro "Dobrar os cotovelos") | antes (`1828c0e`) | depois |
|---|---|---|
| quadros de cima em que a cabeça sumiria (ciclo e erro) / com contorno próprio | 8 / **0** | 8 / 8 |
| eixo do tórax e quem olha; contorno da cabeça dentro da silhueta; a cabeça à frente do tronco | 0°; 100%; 12,8 cm | iguais (a pose não mudou) |

Rodada no estado de antes (o exercício de `1828c0e`, com a regra nova na ficha), a conferência dá **1 falha** (esta regra). No estado novo: **0 falhas**, os mesmos avisos de antes.

**Olhado nos quadros** (`quadros/abertura-elastico.png`): de cima, nos três instantes, no modo Músculos, no tema escuro e no cor de pele, a cabeça aparece inteira, redonda, por cima dos ombros, e o rosto deixa de ser um calombo solto. De frente nada muda.

**O que ainda não ficou bom.** De cima, o principal (a lateral do ombro) continua quase escondido (é o aviso de antes: a vista de cima serve para o arco do braço, não para o músculo). A mesma cabeça sumida existe em animações antigas aprovadas que esta correção não toca (ver a resposta da sessão).
