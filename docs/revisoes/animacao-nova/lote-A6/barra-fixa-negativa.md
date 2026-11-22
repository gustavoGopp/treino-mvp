# Lote A6 · Barra fixa só na descida (`barra-fixa-negativa`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Começa em cima, com o queixo acima da barra, os cotovelos dobrados e os pés fora da caixa (joelhos dobrados, pés para trás); desce devagar até os braços estenderem; depois põe os pés na caixa, que fica à frente, e sobe de novo pelas pernas, com as mãos paradas na barra (o braço não puxa); no alto, tira os pés da caixa e o ciclo recomeça. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/barra-fixa-negativa.md`. Cartão do app: `src/conteudo/exercicios/barra-fixa-negativa.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/barra-fixa-negativa.json`.
- Animação: `src/engine/novo/exercicios/barra-fixa-negativa.ts`, sobre o núcleo do corpo pendurado (`exercicios/pendurado.ts`); o corpo de cima faz o caminho da barra fixa aprovada (`barra-fixa-base.ts`) de trás para a frente. Regras medidas: `src/engine/novo/regras/barra-fixa-negativa.ts` (cinco novas) e as do corpo pendurado (`regras/pendurado.ts`).
- Peça nova: a caixa de salto (`pecas-de-cena/caixa-de-salto.ts`, medidas em `dados/objetos/caixa-de-salto.json`). A estação é a da barra fixa (`pecas-de-cena/barra-fixa.ts`), numa regulagem mais baixa (ver "Mudança em arquivo comum").
- Quadros grandes: `../quadros/barra-fixa-negativa.png`. **Sem folha.**

## Onde os números saem

A ficha da técnica dá: subir pelo apoio, nunca pular (um estudo, quedas: `shabbir2026`); descer em 3 a 5 s até os braços estenderem (consenso); pegada pronada, um pouco mais aberta que os ombros (consenso). O resto saiu da barra fixa aprovada (a pegada a 1,5 vez os ombros, o topo com o queixo 3 cm acima da barra, o tronco um pouco para trás e a cabeça atrás da barra, a ordem em que o braço e a escápula se movem), com a fonte `barra` em cada linha, ou é escolha de desenho com o motivo. Três linhas da barra fixa mudaram e viraram desenho próprio: a escápula embaixo (−5°, e não +4°: o cartão pede "ombros longe das orelhas" até o fim), a bacia em cima (−9°, e não −6°) e o pescoço em cima (−14°, e não −8°): com as pernas para trás, o corpo fica uns 5 cm mais à frente no prumo, e com os números da barra fixa a cabeça encostava na barra na descida (−1,3 cm, medido).

**A volta.** O ciclo tem duas partes (u de 0 a 1, a descida; de 1 a 2, a volta). Na volta, a bacia, o tronco e os braços fazem o mesmo caminho da descida ao contrário, só que levados pelas pernas: os pés vão à caixa (por uma curva que sobe antes de ir à frente, para passar por cima da beirada), as pernas empurram o corpo ao alto e, no fim, o calcanhar sobe 15° (a pessoa fica na ponta dos pés para o queixo passar da barra, sem a perna travar). O ritmo da volta é próprio: uma tabela do caminho (121 poses, gravada no preparo) faz o corpo andar por igual, em vez de herdar o ritmo da descida.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Começa em cima: queixo acima da barra, cotovelos dobrados, peito perto da barra | consenso | o queixo fica 3 cm acima do alto da barra, o cotovelo dobra 134,8° e o peito fica a 6,3 cm da barra | sim |
| Tire os pés do apoio | consenso | em cima, os pés ficam para trás, 11,6 cm acima do tampo e atrás da caixa; na descida inteira, as pernas ficam a no mínimo 2,3 cm da caixa | sim |
| Descida de 3 a 5 s | consenso | fase de 4 s; o queixo desce 53,7 cm, e se move em 3,6 s dela (no começo e no fim, a velocidade vai a zero sem tranco) | sim |
| Até os braços estenderem | consenso | no fim da descida, o cotovelo dobra 8° (o mesmo da barra fixa embaixo) | sim |
| Ombros longe das orelhas | consenso | do alto do ombro à base do crânio, ao longo do tronco: no mínimo 18,4 cm na descida (em pé, parado: 18,7 cm; limite: 1 cm a menos) | sim |
| Pegada pronada, um pouco mais aberta que os ombros | consenso | palmas para a frente (o polegar 90% para dentro); mãos a 1,5 vez a largura dos ombros (61,2 cm de centro a centro) | sim |
| Corpo parado na descida | consenso | o centro de massa fica a 0 cm da vertical da barra | sim |
| As mãos na barra; o corpo não atravessa a barra | consenso | a pegada fica no eixo da barra e não anda no ciclo inteiro (0 cm); a pele fica a no mínimo 2,5 cm da barra | sim |
| Suba pelo apoio, não pela barra | um estudo | na volta, os pés apoiam no tampo e não se mexem enquanto o corpo sobe; as mãos ficam paradas na barra, e o cotovelo dobra de 8° a 135° só porque o corpo sobe. A regra automática da ficha só vê a descida; a volta foi olhada nos quadros e medida à parte (101 quadros do ciclo): os pés pousam no tampo (0 cm); quando o calcanhar sobe, a ponta do pé amassa até 1 cm no tampo; a coxa passa rente à beirada de trás (0 cm) quando os joelhos sobem | sim, com as duas notas (a olho e medida à parte) |

**Conferência automática: 0 falha, 4 avisos.** (1) A flexão do joelho chega a 148,9° (acima da média da tabela, abaixo do máximo): é o fundo da volta, com os pés no tampo e os braços ainda estendidos. Com a caixa de 76 cm e a barra a 221,6 cm, o corpo tem de subir 54 cm só pelas pernas, e isso começa num agachamento fundo (ver "O que não ficou bom"). (2) As linhas de desenho da ficha de movimento. (3) Músculos: o meio das costas aparece como secundário dentro de "costas", e o antebraço como "só ajuda", como na barra fixa aprovada. (4) O modo Músculos abre de trás (o dorsal: 519 cm²); de três quartos ele quase não aparece (142 cm²). Ritmo: o maior salto de velocidade fica em 14,9% do pico (limite 15%), na volta: é o item mais apertado.

## As vistas

**De três quartos pela frente** (padrão do modo Técnica): é a única em que se lê, de relance, que os pés saem da caixa, que ela fica à frente, a descida e a volta pelas pernas. **De trás** (segunda vista, padrão do modo Músculos: o dorsal): mostra os ombros longe das orelhas e os erros dos braços. De lado, a barra fica de ponta (um ponto) e a estação some (é cenário de perfil, como na barra fixa); a caixa e a volta se leem bem, mas o dorsal não aparece: ficou de fora. De trás, o primeiro desenho tinha os joelhos menos dobrados, e os pés pareciam pisar na caixa: os joelhos passaram a dobrar 100°, e os pés ficam claramente acima dela.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Soltar o corpo | de trás | o fim da queda: o ombro leva o tranco (a escápula sobe até a orelha: o alto do ombro fica a 13,8 cm da base do crânio, contra 18,4 cm no certo; a clavícula a 30° de elevação, contra 12°), a cabeça afunda entre os ombros e o cotovelo chega travado (2°) |
| Pular para chegar ao alto | três quartos | em vez de subir pela caixa, pula: no alto, os pés estão no ar, 16 cm acima do tampo e à frente (no certo, eles ficam para trás); na volta, os pés saem da caixa no meio da subida |
| Parar no meio | de trás | a descida para com o cotovelo dobrado 80° (o certo: 8°); o queixo fica 16 cm acima de onde fica no certo |

"Soltar o corpo" é em parte ritmo (a descida vira queda); desenhei a consequência visível que o cartão dá ("o ombro leva um tranco"), no instante do fim da queda. No erro, a animação mantém o ritmo da descida certa: a queda rápida não aparece em movimento (seria o campo de ritmo por erro, proposto no plano, seção 5, que o motor ainda não tem).

## O equipamento

- **Caixa de salto:** a Rogue Flat Pack Games Box (30 × 24 × 20 pol, "can be turned on any side"), de pé no lado de 30 pol (76,2 cm), com 61 cm de lado a lado e 50,8 cm de trás para a frente. A espessura do compensado (3/4 pol) e as alças vêm só de um comentário de cliente na página: `provisoria` e `desenho`. Desenhada no gerador realista, como bloco de compensado com os cantos levemente arredondados e o recorte das alças.
- **Estação de barra fixa:** a mesma torre da barra fixa, uma regulagem abaixo da mais alta (221,6 cm; a torre sobe em 7 degraus de 2 ¾ pol, ProsourceFit). Na mais alta (228,6 cm), de pé na caixa de 76 cm, a perna não alcançava o tampo com o queixo acima da barra (faltavam 3,4 cm, medido).

## Mudança em arquivo comum

`pecas-de-cena/barra-fixa.ts`: `estacaoDeBarra` ganhou um terceiro parâmetro opcional, `altura` (por omissão, a da tabela). A chave de desenho (`fixa`) só muda quando a altura não é a da tabela, e o preparo da barra fixa, da barra supinada e da elevação de joelhos na barra não mudou (o `preparo.mjs` não regravou nenhum deles; `npm run conferir:animacao` sem falha em todas).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Da barra fixa: a pegada a 1,5 vez os ombros (a correção da pegada de hoje, 1,8×, não se repete) e o ombro de trás em laranja (decisão de 06/11, que vale para a barra fixa e a supinada; a biblioteca lista o ombro de trás também aqui).

## O que não ficou bom

- **O agachamento fundo no começo da volta** (o joelho a 149°, o quadril a 132°): é o que a geometria pede para subir pela caixa sem puxar, mas é a pose menos natural do ciclo. Uma pessoa de verdade muitas vezes sobe uma perna de cada vez; aqui as duas sobem juntas (a animação é simétrica).
- **Os rótulos de três quartos** ("desça devagar", "suba pelo apoio") ficam sobre o montante da estação, que é cenário; tentei pontos do lado de lá do corpo e o rótulo acima da cabeça, e ficou pior (o corpo encolhia ou o fio cruzava o corpo).
- **De trás, embaixo,** as pernas ficam desenhadas por cima da caixa (que está mais longe de quem olha): pode parecer que a pessoa está dentro dela.
- **A ponta do pé amassa até 1 cm no tampo** quando o calcanhar sobe, no alto da volta (o pé é resolvido pelo tornozelo, rígido, para o joelho não pular entre dois jeitos de resolver; no chão, a conferência aceita 1,5 cm). Com o calcanhar subindo 20°, eram 1,4 cm; com 10°, a perna ficava quase esticada e o joelho dava tranco (17% do pico) ao sair da caixa. **A coxa passa rente à beirada de trás da caixa** (0 cm) quando os joelhos sobem.
- **O ciclo é longo** (8,6 s: 4 s de descida e 3,6 s de volta): com a volta mais curta, o tranco passava do limite.
- **"Soltar o corpo" e "Pular" mostram a consequência, não o movimento rápido** (ver "Erros").
