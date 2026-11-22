# Lote B2 · Supino reto no smith (`supino-smith`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado no banco reto, embaixo da barra do smith; as mãos um pouco mais abertas que os ombros; a barra desce na guia até encostar de leve no meio do peito e sobe sem travar os cotovelos. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/supino-smith.md`. Cartão do app: `src/conteudo/exercicios/supino-smith.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-smith.json`.
- Animação: `src/engine/novo/exercicios/supino-smith.ts`; o corpo deitado no banco é o do supino com halteres aprovado (`supino-reto.ts`: a bacia, a coluna, a cabeça apoiada a 3 cm da ponta do banco, os pés no chão). Peça: `src/engine/novo/pecas-de-cena/smith.ts`. Regras medidas: `src/engine/novo/regras/smith.ts`.
- Quadros grandes: `../quadros/supino-smith.png`. **Sem folha** ao lado da animação de hoje.

## Onde os números saem

A ficha da técnica dá em número só a pegada ("até ~1,5 vez" os ombros) e os cotovelos (~30–60° do tronco). O resto vem do supino com halteres aprovado (o corpo no banco, as escápulas, o ritmo) ou de medida no Boneco.

**O que é medido e não escolhido:**

- **Onde a barra encosta.** A linha do meio do peito é a dos mamilos da tabela do corpo (`altura.peito`, ANSUR II, 22,1 cm abaixo de C7 em pé, levada para o tronco deitado), mais 2 cm para os pés. Embaixo, a barra fica na altura em que a superfície dela encosta de leve na pele (afunda 0,5 cm), medida nos anéis do tronco e do trapézio (calibração guardada `supino-smith:fundo:0`).
- **O banco no lugar certo.** A barra não sai da guia: é a máquina que fica posta de modo que a linha da guia passe por esse ponto de baixo. O banco é posto pela cabeça, como no supino com halteres aprovado.
- **A barra em cima.** Ela sobe na guia até o cotovelo ainda dobrar 12° (calibração `supino-smith:cima`).
- **Os braços.** As mãos fecham na barra a 30,5 cm do meio; o cotovelo aponta a 45° do tronco; o resto do braço sai do alcance. O ângulo do braço com o tronco e o do antebraço com a vertical são medidos.
- **A trava.** O carro para nela com a barra 1,5 cm abaixo do ponto onde ela encosta no peito.

A guia sobe 7° para o lado da cabeça: a barra sobe um pouco na direção dos ombros (a ficha da Life Fitness dá os 7° e não diz o lado).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| A barra só anda na guia (a máquina) | medida (Life Fitness) | o centro da barra fica a 0 cm da linha da guia; de cima até embaixo anda 40,4 cm, a 7° da vertical, sem andar de lado | sim |
| Banco centrado sob a barra: ela desce na linha do meio do peito | consenso | embaixo, o centro da barra fica 2 cm para os pés da linha dos mamilos | sim |
| Desce até encostar de leve no peito | consenso | embaixo, a superfície da barra fica a −0,5 cm da pele (encosta e afunda meio centímetro); antes de chegar embaixo, nunca entra mais que isso | sim |
| Pegada um pouco mais aberta que os ombros (até ~1,5 vez) | consenso | 61 cm de uma mão à outra: 1,5 vez a largura biacromial (40,8 cm) | sim |
| Cotovelos a ~30–60° do tronco ("seta", não "T") | consenso | embaixo, o braço faz 44,8° com o tronco, visto de cima | sim |
| Antebraços quase verticais embaixo | consenso | embaixo, o antebraço fica a 18,5° da vertical (o cotovelo um pouco por fora da mão) | sim, no limite de 20° (ver abaixo) |
| Em cima, cotovelos quase estendidos, sem travar | consenso | em cima, o cotovelo dobra 12° | sim |
| Escápulas juntas e para baixo | consenso | as do supino com halteres aprovado (9° para trás, 4° para baixo); os ombros ficam no banco | sim |
| Travas logo acima do peito | consenso | as travas param a barra 1,5 cm abaixo de onde ela encosta; no movimento certo a barra não chega nelas | sim (ver a leitura abaixo) |
| Descida controlada, subida sem tranco | consenso | 2,5 s descendo, 0,45 s embaixo ("encosta de leve"), 1,3 s subindo; o maior salto de velocidade é 8,6% do pico (limite 15%); o último quadro emenda no primeiro (0 cm) | sim |

A carga: a barra de 9 kg do smith e uma anilha de 10 kg de cada lado (29 kg).

**Conferência automática: 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`barra.amassa`, `cabeca.folgaNoBanco`, `anilhas`, `quadro.ate`). (2) De lado, o peito quase não aparece (84 cm²); o modo Músculos abre de cima (465 cm²), como no supino com halteres aprovado (465 e 84 cm²).

**O limite do antebraço.** A regra "antebraços quase verticais embaixo" usa o mesmo limite do braço "na vertical" do supino no chão aprovado (20°, `regras/deitado-no-chao.ts`). Com a barra encostando no peito do Boneco, a mão fica 21 cm acima do centro do ombro, e com a pegada a 1,5 vez os ombros o cotovelo não chega embaixo da mão: na linha exata dos mamilos (com o cotovelo a 50° e a pegada de 1,4 a 1,5 vez os ombros) o antebraço ficava de 20° a 23°; 2 cm para os pés, com o cotovelo a 45°, fica a 18,5°. Para chegar a uns 13° foi preciso a barra 7 cm abaixo dos mamilos (fora do "meio do peito"); com a pegada mais fechada, piora.

**A trava "logo acima do peito".** Lida ao pé da letra, a trava acima do peito não deixaria a barra encostar nele, e o cartão pede que ela encoste de leve. A leitura do desenho: a trava fica logo abaixo do ponto mais baixo da barra (1,5 cm), ou seja, para a barra antes de ela afundar no peito.

## As vistas

- **De lado** (a que o app abre no modo Técnica): mostra a barra descendo na guia até o peito e o banco no lugar. Como no agachamento, **a guia, o carro e a anilha do lado de perto vão para trás do corpo** (cenário): sem isso, a anilha de 45 cm cobria o peito e as mãos.
- **De cima** (a do modo Músculos): mostra a barra sobre o meio do peito e os cotovelos em seta. De cima, a travessa do alto da máquina não é desenhada (ela cobriria o corpo); as guias e os montantes aparecem como pontos e traços dos dois lados.
- Testei as de três quartos (pela frente e por trás) e as de frente e de trás: a máquina enche o quadro e o corpo fica pequeno e escondido entre as guias.

A máquina é cortada pelo quadro a 135 cm (acima da barra em cima e das anilhas).

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Banco fora do lugar | de lado | o banco (e quem deita nele) fica 14 cm mais para a cabeça; a barra, presa na guia, desce 15,8 cm além da linha dos mamilos, na barriga; em cima, o braço quase trava (2°) porque a barra fica para os pés |
| Cotovelos em T | de cima | o braço vai a 86,5° do tronco (no certo, 44,8°); a mão fica na barra |
| Quicar a barra | — | **não desenhado**: "a barra bate no peito para ganhar impulso" é erro de ritmo. No quadro parado, a barra que quica e a que encosta de leve ficam no mesmo lugar (encostada no peito); a diferença é a velocidade com que chega e sai. Quem integra põe a exceção em `SEM_DESENHO` do teste da ponte |

## O equipamento

- **Smith:** a peça nova (ver o resumo do lote e `folha-smith.png`), com o alto da guia para o lado da cabeça e as travas 1,5 cm abaixo do ponto onde a barra encosta.
- **Banco reto:** o da tabela (IPF e Rogue), o mesmo do supino com halteres aprovado. Ele passa entre as bases dos dois lados da máquina (não há travessa no chão).
- **Anilhas:** as de 10 kg da tabela (45 cm, IWF), uma de cada lado.

## Correções já feitas que esta animação respeita

Nenhuma registrada para este exercício. Do supino com halteres aprovado vale a cabeça apoiada no banco (3 cm da ponta).

## O que não ficou bom

- **Os rótulos de lado ficam em cima da guia.** A cena deitada é larga, e o rótulo "barra no meio do peito" (e o nome do erro "Banco fora do lugar") vai para cima do corpo, exatamente onde sobe a guia: o texto fica por cima de dois traços finos (a guia e a régua). Tentei: sem rótulo de lado (o nome da trajetória deixa de caber e some), rótulos de três quartos (em cima dos montantes) e de cima com o quadro até a ponta da barra (o corpo ficava pequeno). Ficou um rótulo de lado e um de cima ("cotovelos em seta, não em T", acima da cabeça).
- **O antebraço embaixo a 18,5° da vertical** (ver acima): passa no limite de 20° do supino no chão aprovado, mas não é "quase vertical" de 10°.
- **O modo Trajetória mostra só a barra**: com o cotovelo junto, o nome do cotovelo não cabia e sumia (como no supino no chão aprovado). De cima, o nome "barra" fica em cima da manga da barra.
- **O lado de perto da máquina atrás do corpo**, como no agachamento.
