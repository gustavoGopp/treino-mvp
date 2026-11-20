# Lote B2 · Agachamento no smith (`agachamento-smith`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé no smith, a barra no alto das costas, os pés um pouco à frente da linha da barra; desce até a coxa passar da horizontal e sobe. A barra só anda na guia, inclinada 7° (Life Fitness SSM). **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/agachamento-smith.md`. Cartão do app: `src/conteudo/exercicios/agachamento-smith.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/agachamento-smith.json`.
- Animação: `src/engine/novo/exercicios/agachamento-smith.ts`. Peça: `src/engine/novo/pecas-de-cena/smith.ts` (medidas em `dados/objetos/smith.json`; folha da peça em `docs/revisoes/animacoes-restantes/pecas/folha-smith.png`). Regras medidas: `src/engine/novo/regras/smith.ts`.
- Quadros grandes: `../quadros/agachamento-smith.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras: pés um pouco à frente da linha da barra, na largura dos ombros; coxa até a horizontal ou abaixo; costas retas; barra no alto das costas; travas logo abaixo do ponto mais baixo. O que ela não dá em número saiu dos agachamentos aprovados (a abertura das pontas dos pés, os joelhos em cima, o ritmo) ou é escolha de desenho, com o motivo em cada linha da ficha de movimento.

**O que é medido e não escolhido:**

- **Onde a barra encosta nas costas.** O centro da barra fica 4 cm abaixo de C7–T1 e encosta na pele do Boneco (afunda 0,5 cm): a profundidade da pele das costas nessa altura é medida nos anéis do tronco, do pescoço e do trapézio (calibração guardada `agachamento-smith:costas`).
- **Onde fica o quadril.** Os pés ficam parados; a flexão do joelho e a inclinação da bacia são as da ficha; o lugar do quadril no arco em volta do tornozelo sai da condição de a barra cair na linha da guia. A barra não sai da guia; quem se ajusta é o quadril.
- **A trava.** O carro para na trava com a barra 3 cm abaixo do ponto mais baixo do movimento certo (calibração `agachamento-smith:fundo`).

**Para que lado a guia inclina.** A ficha da Life Fitness dá os 7° e não diz o lado. O desenho põe o alto da guia para a frente de quem agacha: a barra desce um pouco para trás (para o lado dos calcanhares), que é o que deixa sentar para trás com os pés à frente. No supino, o alto da guia fica para o lado da cabeça.

**O equilíbrio.** No smith a guia segura a barra para a frente e para trás. Com os pés à frente da barra, quem agacha senta para trás encostado nela: o centro de massa (corpo + barra) fica atrás do meio do pé, mas a conferência confere que ele fica sempre sobre o apoio dos pés (do calcanhar à ponta). Com o tronco mais inclinado que os 18° da ficha, o quadril vai mais para trás (a barra não sai da guia) e o centro de massa sai do calcanhar: é isso que segura o tronco quase em pé.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| A barra só anda na guia (a máquina) | medida (Life Fitness) | o centro da barra fica a 0 cm da linha da guia; de cima até embaixo anda 47,5 cm, a 7° da vertical, sem andar de lado | sim |
| Barra no alto das costas | consenso | 4 cm abaixo de C7–T1, sobre o trapézio; a superfície da barra a −0,5 cm da pele (encostada) o ciclo inteiro | sim |
| Pés um pouco à frente da linha da barra, na largura dos ombros | consenso | o meio do pé fica 6,1 cm à frente da barra em cima e 11,9 cm embaixo (a barra desce para trás na guia); centro de cada pé a 20,4 cm do meio (meia largura biacromial), pontas 15° para fora | sim |
| Coxa até a horizontal ou abaixo | um estudo | embaixo, o centro do quadril fica 0,9 cm abaixo do centro do joelho; o joelho dobra 118° e o quadril 109° | sim |
| Costas retas | consenso | a lombar não dobra além da curva de repouso (0°); o peito inclina 4° em cima e 19° embaixo | sim |
| Os joelhos seguem os pés (dos agachamentos aprovados) | consenso | o joelho anda a 2,2° da direção do pé, visto de cima; embaixo, fica 0,8 cm à frente da ponta do pé | sim |
| Em pé, sem travar os joelhos | consenso | em cima, o joelho dobra 8° | sim |
| Travas logo abaixo do ponto mais baixo | consenso | as travas param a barra 3 cm abaixo do ponto mais baixo dela; no movimento certo a barra não chega nelas | sim |
| Peso sobre os pés (mecânica) | — | o centro de massa fica de 1,3 cm (em cima) a 8,3 cm (embaixo) atrás do meio do pé, sempre sobre o calcanhar (1,3 cm à frente dele embaixo) | sim |
| Descida controlada, subida | consenso | 2,4 s descendo, 0,45 s embaixo, 1,3 s subindo; o maior salto de velocidade é 6,5% do pico (limite 15%); o último quadro emenda no primeiro (0 cm) | sim |

As mãos fecham na barra a 36 cm do meio (72 cm de uma mão à outra), com os cotovelos para baixo e para trás; o cotovelo dobra 144° (dentro da tabela; com as mãos a 31 cm ele passava da média). A carga: a barra de 9 kg do smith e uma anilha de 10 kg de cada lado (29 kg).

**Conferência automática: 0 falha, 3 avisos.** (1) A dorsiflexão do tornozelo chega a 29,4° (acima da média da tabela, dentro do máximo): é a canela embaixo. (2) As linhas da ficha de movimento que são escolha de desenho (`tronco.baixo`, `barra.amassa`, `pegada.meia`, `anilhas`, `quadro.ate`). (3) De frente, o quadríceps quase não aparece (as coxas viram de ponta para quem olha), como no agachamento com halteres aprovado; o modo Músculos abre de lado (363 cm²).

## As vistas

- **De lado** (a que o app abre): mostra os pés à frente da barra, a profundidade, as costas e a guia inclinada. **De lado, a guia, o carro e a anilha do lado de perto vão para trás do corpo** (o lado direito da máquina é desenhado como cenário): sem isso, a anilha de 45 cm cobria a cabeça e as costas, e a guia passava por cima da mão. É um corte de ilustração; o lado de longe fica na ordem certa de profundidade.
- **De frente:** mostra a pegada, a barra atrás do pescoço e as duas guias. As anilhas ficam atrás dos montantes da frente (de frente, a anilha está de perfil e o montante a tapa).
- A de três quartos foi testada: a máquina inteira entra na frente e em volta do corpo e o quadro vira um emaranhado de tubos; ficou de fora.

A máquina é cortada pelo quadro a 196 cm (um pouco acima da cabeça): os 237 cm inteiros encolhiam o corpo.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Descer pouco | de lado | o joelho para em 62° (no certo, 118°): o quadril fica 28,4 cm acima do joelho |
| Pés embaixo da barra | de lado | a máquina fica 6 cm mais para a frente e a linha da barra cai no meio do pé. Sem como encostar na barra, o quadril e o tronco saem do equilíbrio (centro de massa sobre o meio do pé): o tronco já sai inclinado em pé (16,5° contra 4,3°) e, embaixo, o joelho passa 10,7 cm da ponta do pé (no certo, 0,8 cm), a canela deita (dorsiflexão 43,8° contra 26,7°) e o quadril fica 10,9 cm acima do joelho |
| Esquecer a trava | — | **não desenhado**: começar ou terminar sem as travas não muda nada na pose do exercício (seção 9 do guia). As travas estão desenhadas no lugar certo no movimento certo. Quem integra põe a exceção em `SEM_DESENHO` do teste da ponte |

Sobre "Pés embaixo da barra": a ficha diz "o tronco tomba para a frente e o joelho sobrecarrega". As duas coisas aparecem, mas em instantes diferentes: o tronco mais inclinado se vê em pé e no meio da descida (16,5° e 18,5°, contra 4,3° e 11,8°); embaixo, o tronco do erro fica menos inclinado que o certo (13,7° contra 19,3°), porque o certo senta para trás encostado na barra. O quadro parado do erro é o de baixo (instante 1), com as pernas destacadas: o joelho passando da ponta do pé.

## O equipamento

- **Smith:** a peça nova (Life Fitness SSM: 221 × 125 × 237 cm, guia a 7°, ganchos a cada 16 cm, barra de 9 kg, 8 pinos de anilha; o resto é desenho). A barra fica solta (o gancho em pé) no exercício; as travas, 3 cm abaixo do ponto mais baixo.
- **Anilhas:** as de 10 kg da tabela (45 cm, IWF), uma de cada lado.

## Correções já feitas que esta animação respeita

Nenhuma registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). O par "smith × suporte de agachamento" que se confunde no cartão está lá (linha 142): a peça nova trata dele (ver o resumo do lote).

## O que não ficou bom

- **O lado de perto da máquina atrás do corpo.** De lado, a guia e a anilha do lado direito aparecem atrás das costas, quando na academia estariam na frente. Tentei sem o corte: a anilha cobria a cabeça e a guia cortava a mão.
- **O fio de "costas retas"** atravessa o braço embaixo (o braço fica atrás das costas, segurando a barra).
- **O erro dos pés** mostra o joelho e a canela no quadro parado; o tronco que "tomba" só se vê em movimento (ver acima).
- **O centro de massa embaixo fica a 1,3 cm da borda do calcanhar.** É a leitura de quem encosta na barra; a conferência só exige que fique sobre o apoio. Se o Gustavo preferir o peso no meio do pé, o tronco fica em pé o tempo todo (1° a 3°) e o joelho passa 15 cm da ponta do pé (testei com os pés 6 cm à frente: parece um agachamento frontal, não um smith com os pés à frente).

## Correção de 20/11 (fio ou peso dentro do corpo)

A conferência dos pesos (`conferir-pintura.ts`, tolerância de 1 cm) acusava **a barra do smith 1,4 cm dentro do tronco**, no ciclo inteiro e nos dois erros (pior em u = 0,69). O apoio da barra no trapézio é contato pedido pela técnica; o que passava da conta era o quanto ela afundava.

**A causa, medida.** A barra era posta 0,5 cm dentro da pele das costas (`barra.amassa`), de propósito ("ela apoia, não flutua"). Contra a pele desenhada (a pele densa, o casco que o desenho liga de um anel ao outro), ela afundava mesmo 0,5 cm; a conferência dos pesos mede cada ponto da barra contra a seção oval de cada anel e, nas costas, onde a seção é muito achatada (1,8 cm para trás e 15 cm para o lado), lia 1,3 a 1,4 cm. A regra `peso-fora-do-corpo` (tolerância 0,5 cm) lia 0,8 cm. Com a barra encostada em 0 cm, a conferência dos pesos já passava (0 cm), mas a regra ainda lia 0,6 cm: ela procura a borda da seção de 5 em 5 graus e, numa elipse tão achatada, um ponto que entra meio milímetro nela conta perto de 0,6 cm. Com a barra a 0,05 cm da pele, ela lê 0.

**A mudança.**

- A barra encosta nas costas sem afundar: a superfície dela fica a 0,05 cm da pele desenhada (`barra.folga`, no lugar de `barra.amassa`), 0,55 cm mais para trás no corpo. Na tela, continua encostada (meio milímetro é menos que o traço do contorno).
- Para o corpo fazer o mesmo movimento, a máquina vai junto com a barra: os pés ficam 6,55 cm à frente da linha da barra em cima (`pes.aFrente`, eram 6). Sem isso, a barra na guia empurrava o quadril 0,55 cm para a frente e o tornozelo dobrava 0,6° a mais. No movimento certo, o quadril, os joelhos, o tronco e os tornozelos ficam iguais (a diferença é menor que 0,02 cm e 0,02°); só as mãos, que seguram a barra, vão 0,55 cm para trás com ela (cotovelo 143,4°, eram 143,8°).
- O quadro mede a máquina onde ela ficava (`quadro.pesAFrente`, 6 cm): com o quadro 0,55 cm maior, o rótulo "costas retas" pulava para o outro lado do corpo. O quadro, a miniatura e os rótulos ficam como estavam (o preparo só muda na altura do fundo, que as travas usam).
- No erro "Pés embaixo da barra", a máquina continua com a linha da barra no meio do pé; como a barra fica 0,55 cm mais para trás no corpo, o equilíbrio põe o tronco um pouco mais inclinado: 17,4° em pé (eram 16,5°) e 14,6° embaixo (eram 13,7°); o joelho passa 0,2 cm menos da ponta do pé. O erro se lê igual.

| medido (homem) | antes | depois |
|---|---|---|
| a barra dentro do tronco, conferência dos pesos (pior em u = 0,69) | 1,4 cm | 0 cm (nada além da tolerância) |
| a barra dentro do tronco, regra `peso-fora-do-corpo` | 0,8 cm | 0 cm |
| a superfície da barra até a pele das costas (`barra-no-alto-das-costas`) | −0,5 cm | 0 cm |
| o meio do pé à frente da barra, em cima e embaixo | 6,1 e 11,9 cm | 6,6 e 12,4 cm |
| as travas abaixo do ponto mais baixo da barra | 3 cm | 3 cm |
| dorsiflexão do tornozelo (máximo) | 29,4° | 29,4° |

A ficha liga `peso-fora-do-corpo`: no estado de antes ela falha (0,8 cm, no tronco, no erro "Descer pouco"); no de agora, passa (em 193 quadros, o peso não entra no corpo). O antes e depois está em `../correcao-das-antigas/agachamento-smith-fio-ou-peso.png`; os quadros grandes foram regravados e olhados vista por vista, de lado e de frente, nos dois erros e nos dois lados do corpo. A conferência automática dá **0 falha e 3 avisos** (antes: 1 falha, a dos pesos, e 3 avisos); a pintura continua sem achado.

**O que ainda não ficou bom.**
- A regra `peso-fora-do-corpo` mede mal uma seção muito achatada (a borda de 5 em 5 graus): um ponto que mal entra nas costas conta como 0,6 cm. Não mexi na regra, que é comum a todas as animações; por isso a barra fica a 0,05 cm da pele, e não em 0.
