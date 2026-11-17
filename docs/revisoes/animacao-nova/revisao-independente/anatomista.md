# Parecer de anatomia: o boneco novo e as quatro animações

> Parecer escrito por um **revisor automático (modelo Opus)** no papel de
> anatomista (professor de anatomia e cinesiologia). **Não foi escrito por
> uma pessoa da área.** Data: 15/11/2026. Só leitura: nenhum código nem
> dado foi alterado. As fontes clássicas citadas (Gray, Netter, Moore,
> Kapandji, Neumann) são citadas pelo conteúdo, sem página.

Material olhado: as 12 folhas de `quadros/` (cada uma aberta e ampliada
nos pontos citados), as pranchas cinza e pele, `regras-do-motor.md`,
`tabelas.md`, `boneco.json` (chave `musculos`), `musculos.json`, os
`papeis` dos quatro `exercicios/<id>.ts`, `conferencia.md`, o conteúdo
(`src/conteudo/exercicios/<id>.json` e `biblioteca/exercicios.json`) e as
pesquisas 03 e 09.

Como ler os nomes das imagens: `goblet-musculos.png, goblet:frontal:mus:f1`
quer dizer a folha `goblet-musculos.png`, o quadro com essa legenda.

---

## (a) Resumo

**Nota de correção anatômica: 3 de 5.** O esqueleto está bem medido
(segmentos, alturas e amplitudes batem com ANSUR e CDC), mas o desenho dos
músculos e dos erros ainda ensina coisas erradas em pontos visíveis.

As 5 correções mais importantes, em ordem:

1. **Separar o deltoide em três e o trapézio em superior × médio/inferior, por lado.** Hoje o deltoide inteiro acende no supino, na flexão e na puxada, e o trapézio dos dois lados (com a parte que encolhe o ombro) acende na puxada de um braço só.
2. **Nenhuma vista de músculos pode ficar sem o principal.** No goblet de frente nada acende; os adutores nunca aparecem; o grande dorsal some na lateral da puxada; o peitoral some na vista de cima da flexão.
3. **Prender as formas aos ossos certos:** reto abdominal até o púbis (hoje para ~11 cm acima); trapézio subindo pelo pescoço até o crânio e chegando ao acrômio; peitoral descendo abaixo do mamilo e convergindo para o úmero; grande dorsal sem subir até a espinha da escápula.
4. **A escápula tem que aparecer no contorno:** braço acima da cabeça e puxada esticada sem rotação da escápula visível; "ombro encolhido" e "ombros saem do banco" quase invisíveis.
5. **Refazer três erros e um ângulo:** flexão "quadril cai" atravessa o chão e dobra no quadril (não na lombar); goblet "lombar arredonda" põe o tronco na horizontal e dobra no lugar errado; cotovelo a 162° no fim da puxada passa do que o músculo deixa dobrar.

---

## (b) Respostas aos 6 itens

### 1. Proporções e forma do corpo

**O que está bom.** As alturas do joelho, do trocânter, do punho e do
acrômio batem com a tabela; a ponta dos dedos cai no meio da coxa (cerca de
38% da estatura, como esperado); a cabeça mede 0,13 da estatura; braço,
antebraço, coxa e perna não variam (conferência: desvio 0). Mão fechada no
halter e pé apoiado (prancha, "A mão segurando o halter" e "O pé
apoiado") estão corretos: polegar por fora, calcanhar, arco, maléolo
lateral marcado. O corpo é reconhecível como a mesma pessoa de frente, de
lado, de costas e de cima.

**Problemas.**

- **Pescoço que some e reaparece (impreciso).** De lado e de frente
  (prancha cinza, "De lado"; `goblet-tecnica.png, lateral:tec:f0`;
  `supino-reto-tecnica.png, lateral:tec:f1`) a cabeça encosta no ombro e
  o pescoço vira um entalhe escuro sob o queixo. Na vista de cima
  (`flexao-tecnica.png, cima:tec:f0`) o pescoço aparece longo. Pela
  tabela, de C7 (151,5 cm) à base do crânio (162,8 cm) são ~11 cm, e o
  queixo fica ~9 cm acima do acrômio. Hoje o pescoço visível de frente é
  menor que isso, e de lado quase não existe. O entalhe escuro parece
  defeito de desenho (gosto/impreciso).
- **Perfil sem curvas (impreciso).** De lado (prancha, "De lado"; e
  `goblet-tecnica.png, lateral:tec:f0`) o tronco é quase uma tábua: peito
  plano, cifose torácica e lordose lombar pouco visíveis, nádega pequena. A
  tabela pede 40° de cifose e 50° de lordose; o contorno não mostra isso.
  Importa para ensinar "coluna neutra".
- **Mão em forma de luva (impreciso).** Na flexão (`flexao-tecnica.png,
  lateral:tec:f0`) a mão apoiada é uma placa sem dedos nem polegar. O
  cuidado B6 pede dedos e polegar onde o apoio é técnica; na flexão é.
- **Coxa de frente no agachamento fundo (impreciso).** Em
  `goblet-tecnica.png, frontal:tec:f1` as coxas, vistas em escorço, viram
  duas "almofadas" sem joelho nem patela, e o marcador "joelho" cai no
  meio da coxa.
- **Braço que sai do ombro como junta de boneco (impreciso, ver item 2).**
  Com o braço para cima (prancha, "Braços acima da cabeça";
  `puxada-unilateral-tecnica.png, posterior:tec:f0`) não há prega da axila
  nem continuação do grande dorsal para o braço.

### 2. Articulações no movimento

Conferi os ângulos do relatório contra os quadros.

| exercício | ângulo | veredito |
|---|---|---|
| goblet | joelho 126°, quadril 125° | aceitável. O quadril abaixo do joelho está certo. Nota: 125° de flexão só na articulação do quadril já é perto do limite com o joelho dobrado (Kapandji). Em agachamentos mais fundos (86 animações), parte disso terá de vir da pelve e da lombar. |
| goblet | dorsiflexão 23° (aviso) | aceitável. A média do CDC (14,8°) é medida sem carga; com o peso do corpo o tornozelo dobra mais. O aviso pode cair. |
| goblet | lombar 0° além do repouso | aceitável. |
| supino | cotovelo 10–104°, braço 50–83°, 14° abaixo do tronco embaixo | aceitável. |
| supino | pronação 15° (conferência) | **a conferir.** A ficha pede palmas giradas 20–30° a partir da pegada pronada (ou seja, ~60° de pronação), e a vista de cima (`supino-reto-tecnica.png, cima:tec:f1`) mostra o cabo quase atravessado, de pegada quase pronada. Ou a medida, ou a ficha, ou o desenho está trocado. |
| puxada | cotovelo 162° (aviso) | **erro.** No fim da puxada a mão encosta no ombro (`puxada-unilateral-musculos.png, lateral:mus:f1`). Com carga, a flexão ativa do cotovelo para por volta de 145°, porque o bíceps encosta no antebraço (Kapandji). E a ficha pede o cotovelo ao lado das costelas, não a mão no ombro. Usar 100–130°. |
| puxada | flexão plantar 81° (aviso) | aceitável para ajoelhado com o peito do pé no chão (parte vem do meio do pé). Opção de gosto: dedos dobrados apoiados. |
| puxada | clavícula 5–26°, ombro 16–139° | os números estão certos (Ludewig), **mas o contorno não acompanha**: em `posterior:tec:f0` e `f1` as linhas do trapézio e da escápula são as mesmas. Erro de ensino, porque o exercício é sobre a escápula. |
| flexão | punho 78–94° (aviso) | impreciso. 94° é praticamente o máximo da AAOS (95°), com o peso do corpo em cima. Mover a mão um pouco para os pés ou aceitar 90° como teto. |
| flexão | dedos do pé 77° (aviso) | aceitável na ponta dos pés. |
| flexão | corpo 177°, cotovelos 41° | aceitável. |

**A escápula acompanha o braço?** Nos dados, sim (clavícula e escápula
têm ângulos da Ludewig 2009). No desenho, só em parte: o ponto do ombro
sobe e desce, mas o tronco desenhado (trapézio, borda da escápula, axila)
não muda de forma. Na puxada esticada (`posterior:tec:f0`) a escápula do
lado que puxa deveria girar para cima e para fora (ritmo
escapuloumeral, Inman, citado em Neumann e Kapandji), com o ângulo
inferior indo para a axila. No supino e na flexão a diferença é pequena e
o desenho atual passa.

**A pelve acompanha a lombar?** No goblet certo, a lombar fica parada e a
pelve gira junto com o tronco: aceitável. No erro "lombar arredonda" falta
justamente a pelve girar para trás (retroversão), ver item 5.

**Ombro de lado.** Em `puxada-unilateral-tecnica.png, lateral:tec:f0` o
centro do ombro aparece no contorno da frente do peito, à frente do
pescoço. Com o braço acima da cabeça a cavidade da escápula vai para a
frente e para cima, mas aqui parece à frente demais (impreciso; conferir
com a medida `ombro.centroAFrente`, item 6).

### 3. Músculos: os 15 grupos

Os 15 grupos (a patela é a 16ª forma e não é músculo). "Erro" = ensina
errado; "impreciso" = passa num desenho simples, mas dá para melhorar.

| grupo | vistas | veredito |
|---|---|---|
| Reto abdominal | frente, lado | **erro.** De frente vai de 127,6 a 102,8 cm. A origem é a crista do púbis (Gray, Netter), que fica um pouco acima da virilha (85,3 cm): faltam ~10–12 cm embaixo, toda a parte abaixo do umbigo. Na flexão (`flexao-musculos.png, lateral:mus:f1`) a faixa listrada cobre só a metade de cima do abdome, e é a parte de baixo que segura o quadril. Topo no processo xifoide e cartilagens 5–7: certo. As três intersecções: certas. |
| Oblíquo externo | frente | impreciso. Para em 104,6 cm, perto da crista ilíaca; a borda de baixo deveria seguir até o ligamento inguinal, na frente. |
| Peitoral maior | frente, lado, cima | **impreciso.** Borda de baixo em 128,8 cm, praticamente na altura do mamilo (129,4). Num homem a borda de baixo passa pela 5ª–6ª costela, abaixo do mamilo, e forma a prega da frente da axila (Gray, Netter). Na vista de cima do supino (`supino-reto-musculos.png, cima:mus:f1`) são dois retângulos que não afinam para o úmero; de lado é uma oval solta no peito. Deveria ser leque com o vértice no braço. |
| Deltoide | frente, lado, costas | forma e inserção aceitáveis (ponta no meio do úmero, Gray). **Erro de uso**: é uma forma só (ver item 4). |
| Trapézio | frente, costas | **erro de forma.** Atrás começa em 153,4 cm (base do pescoço), mas a origem vai até o occipital (~162,8 cm): falta a parte do pescoço, a mais visível e a que encolhe o ombro. Para os lados vai até 14,8 cm do meio, e o acrômio fica a ~20 cm: não chega ao acrômio. A ponta de baixo, 4,9 cm acima de T12: ver abaixo. |
| Grande dorsal | lado, costas | impreciso. Embaixo chega perto da linha do meio e da crista ilíaca: bom. Em cima sobe até 140 cm, na altura da espinha da escápula, cobrindo a região do infraespinal e do redondo; a borda de cima passa pelo ângulo inferior da escápula (T7, ~131 cm) e vai para a axila (133 cm). Na puxada (`puxada-unilateral-musculos.png, posterior:mus:f1`) parece uma faixa lateral estreita porque o trapézio cobre a metade de dentro: aceitável. |
| Bíceps | frente, lado | aceitável (fuso do terço médio ao cotovelo). Na lateral da puxada, com o cotovelo a 162°, a forma laranja parece estar na face de trás do braço; com o cotovelo menos dobrado isso se resolve. |
| Tríceps | lado, costas | aceitável. |
| Antebraço | frente, costas | aceitável. |
| Glúteo (máximo + médio) | lado, costas | aceitável. De 82,6 a 100,4 cm atrás. De lado, no goblet (`goblet-musculos.png, lateral:mus:f1`), aparece só como uma calota atrás da pelve; poderia subir mais em direção ao sacro (impreciso leve). |
| Quadríceps | frente, lado | aceitável de lado (vai até a patela). **De frente com o joelho dobrado não aparece** (item 4). |
| Posteriores | lado, costas | aceitável. |
| Adutores | frente | impreciso. Terminam a 0,6 da coxa; o adutor magno, que a tabela inclui, vai até o tubérculo adutor, perto do joelho. Como só existem de frente, e de frente o goblet falha, nunca aparecem. |
| Panturrilha | frente, lado, costas | aceitável. |
| Tibial anterior | frente | aceitável. |

**Os três pontos medidos pela conferência:**

- **Trapézio 4,9 cm acima de T12: impreciso, aceitável.** São cerca de
  duas vértebras (ponta em T10 em vez de T12). O que pesa mais é a forma:
  falta a parte do pescoço e a chegada ao acrômio (acima). Corrigir os três
  juntos.
- **Reto abdominal terminando na cintura: erro.** Ensina que o abdome
  acaba no umbigo. Levar a borda de baixo até perto da virilha (a tabela
  pode ganhar a altura do púbis; na falta dela, a virilha é um limite
  razoável).
- **Peitoral terminando no mamilo: impreciso.** Descer a borda de baixo
  alguns centímetros e fazer o canto de fora subir até a axila.

### 4. Papéis (principal, secundário, só ajuda)

| exercício | desenho | conteúdo | veredito |
|---|---|---|---|
| goblet | quadríceps P; glúteo S; adutores S | quadríceps P; glúteos, adutores S | **papéis corretos**. Mas, de frente, nada acende (`goblet-musculos.png, frontal:mus:f1`; na versão pele aparece uma mancha marrom, não vermelha), e de lado os adutores não aparecem. Faltaria eretores da espinha como "só ajuda" (seguram o tronco), quando existirem. |
| supino | peitoral P; deltoide S; tríceps S | peito P; ombro anterior, tríceps S | **erro**: o deltoide inteiro acende, inclusive a parte de trás, que não trabalha aqui. Serrátil anterior seria "só ajuda" (não existe no desenho; opcional). |
| puxada | dorsal (dir.) P; bíceps (dir.) S; deltoide (dir.) S; trapézio (os dois lados) S | costas P; bíceps, ombro posterior S | **erro**: (1) o trapézio inteiro acende, dos dois lados, inclusive a parte de cima, que encolhe o ombro: é o erro que a própria animação ensina a evitar; (2) o deltoide inteiro em vez do posterior; (3) na lateral (`lateral:mus:f1`) o principal some. O certo: grande dorsal e redondo maior P (lado que puxa); trapézio médio/inferior e romboides S ou "só ajuda" (lado que puxa); deltoide posterior e bíceps S. |
| flexão | peitoral P; deltoide S; tríceps S; abdome "só ajuda" | peito P; tríceps, ombro anterior S; o texto cita o abdômen | papéis certos, com o mesmo erro do deltoide inteiro. Abdome como "só ajuda" bate com o texto (`feel`), mas não com a lista do conteúdo: acrescentar ao conteúdo. Serrátil anterior (empurra a escápula para a frente no alto) seria o "só ajuda" mais importante que falta. Na vista de cima o peitoral não aparece. |

**Porções que faltam.** Minha divisão, pensando em puxadas, remadas,
desenvolvimentos e elevações:

- **Indispensáveis antes de seguir:**
  - deltoide anterior, lateral e posterior (três formas): o
    desenvolvimento é anterior + lateral, a elevação lateral é lateral, o
    crucifixo invertido e as remadas abertas são posterior;
  - trapézio superior separado do médio + inferior: o encolhimento é
    superior; remada e puxada são médio + inferior (ação oposta ao
    superior);
  - eretores da espinha: terra, stiff, hiperextensão e remada curvada não
    se ensinam sem eles;
  - tudo isso por lado (direito e esquerdo), para os exercícios de um
    braço.
- **Podem ficar num grupo só:**
  - romboides com o trapézio médio (ficam por baixo dele e fazem a mesma
    coisa: aproximar as escápulas);
  - redondo maior com o grande dorsal (mesma ação, mesmo destino no
    úmero);
  - peitoral clavicular com o resto, até existir supino inclinado ou
    crucifixo inclinado; aí separar.
- **Desejáveis, não urgentes:** serrátil anterior (flexão, supino) e o
  manguito de trás (infraespinal e redondo menor) se a biblioteca tiver
  rotação externa.

### 5. Erros desenhados

| erro | onde | veredito |
|---|---|---|
| Joelhos para dentro (valgo) | `goblet-erros.png, frontal:err:f1:valgo` e `f0.5` | anatomicamente certo (o joelho cai para dentro da linha do pé, o pé fica no lugar). Embaixo os joelhos chegam a se tocar: **levemente exagerado**, mas didático. No meio da descida (`f0.5`) está na medida certa. |
| Tronco cai e lombar arredonda | `goblet-erros.png, lateral:err:f1:lombar` e `f0.5:lombar` | **erro e exagerado.** Embaixo o tronco fica quase na horizontal, a cabeça na altura do joelho: com o halter no peito a pessoa cairia para a frente. A dobra aparece na transição entre tórax e lombar, sem a pelve girar para trás. O erro real do fundo do agachamento é a pelve girar para trás com a lombar flexionando (o "butt wink"), curva entre L3 e o sacro. No meio (`f0.5`) a curva aparece nas costas de cima e no pescoço, que é cifose torácica, não lombar. Separar em dois erros (tronco cai demais; lombar arredonda embaixo) ou desenhar só a lombar. Conferir também a conta: 34° de flexão sobre 50° de lordose de repouso deixa a lombar com 16° de lordose, ou seja, só reta, não arredondada. |
| Descer pouco | `goblet-erros.png, lateral:err:f1:raso` | correto. |
| Cotovelos abertos a ~90° | `supino-reto-erros.png, cima:err:f1:cot`; `flexao-erros.png, cima:err:f1:cot` | correto nas duas: braço perpendicular ao tronco visto de cima. |
| Ombros saem do banco no topo | `supino-reto-erros.png, lateral:err:f1:escap` e `f0.5:escap` | **fraco demais.** Só o braço fica vermelho e sobe uns centímetros; o contorno das costas continua colado no banco. O erro é a escápula ir para a frente (protração): o ombro de trás descola do banco e sobe em direção ao teto. Além disso, o quadro `f1` é o fundo do movimento, e o rótulo diz "no topo". |
| Descer pouco (supino) | `supino-reto-erros.png, lateral:err:f1:curta` | correto. |
| Quadril cai | `flexao-erros.png, lateral:err:f1:quadril` e `f0.5:quadril` | **erro.** Embaixo, o tronco vermelho atravessa o chão (vários centímetros abaixo da linha do piso). A dobra está no centro do quadril, com tronco e pernas retos: isso é extensão do quadril, não "lombar arqueada", que é o que a ficha descreve. O peito também desce junto, e no erro real o peito fica onde está e só a barriga cai. |
| Descer pouco (flexão) | `flexao-erros.png, lateral:err:f1:curta` | correto. |
| Jogar o tronco para trás | `puxada-unilateral-erros.png, lateral:err:f1:tronco` | impreciso. Tamanho certo (30°), mas o giro todo sai do quadril com a coxa parada na vertical: 30° de extensão do quadril, acima da média de 18,5° (CDC). Na vida real a coxa inclina um pouco para trás (giro no joelho) e a lombar estende. |
| Ombro encolhido | `puxada-unilateral-erros.png, posterior:err:f1:encolher` | **fraco demais.** O braço sobe, mas o contorno do ombro e do pescoço é igual ao do certo (`puxada-unilateral-tecnica.png, posterior:tec:f1`). Encolher é o acrômio subir e a parte de cima do trapézio estufar e encurtar o pescoço daquele lado. Depende de o trapézio ter a parte do pescoço (item 3). |
| Não alongar em cima | `puxada-unilateral-erros.png, lateral:err:f1:curta` | correto. |

### 6. As sete medidas provisórias

| medida | hoje | parecer |
|---|---|---|
| `quadril.meiaDistancia` | 8,7 cm | **aceitável, mas trocar para ~8,3.** As fontes lidas (dois modelos OpenSim e a regra de Bell) ficam entre 7,7 e 8,35. A diferença no desenho é de 4 mm por lado e não se vê; trocar só porque há fonte e não custa nada. Atenção: `pes.meiaDistancia` e `joelhos.meiaDistancia` da flexão e da puxada usam o mesmo 8,7 como "largura do quadril". |
| `ombro.centroAFrente` | 0 cm | **aceitável.** A linha de prumo clássica (Kendall) passa pelo meio do ombro e um pouco atrás do centro do quadril; o modelo dá ~2,7 cm atrás. Para um desenho, 0 a −2 cm dá na mesma. Manter 0 com a nota "convenção da linha de prumo" ou usar −2. Conferir, porém, por que na puxada esticada o ombro parece à frente do peito (item 2). |
| `l5s1.acima` | 12 cm | **aceitável; discordo da troca para 14,5.** A crista ilíaca fica 15,9 cm acima do centro do quadril (106,5 − 90,6) e marca o nível de L4–L5 (linha supracristal, Moore); L5–S1 fica uma vértebra abaixo, perto de 12 cm. A radiografia (Chanplakorn) põe o canto de trás de S1 a 11,6 cm. Como o topo do sacro desce para a frente, o centro do disco fica na mesma altura ou um pouco abaixo desse canto, não acima. O 14,8 do modelo de marcha é a origem do tronco do modelo, que a própria pesquisa não garante ser L5–S1. Manter 12, com essas duas notas. |
| `l5s1.atras` | 4,5 cm | **mudar para ~3 cm.** 4,5 cm fica atrás até do canto de trás de S1 (4,1 cm na radiografia), e o centro do disco fica à frente desse canto. 3 cm bate com o modelo e com a anatomia. |
| `coluna.lordoseLombar` | 50° | **aceitável, mas definir o que mede.** Se a curva do motor vai de L1 até o disco L5–S1 (é o que o desenho parece fazer, porque a curva começa em L5–S1), o valor comparável é o de L1 a S1, ~60° (Vialle) ou 65° (Cobb T12–S1, Oakley): então 50° é pouco, e o perfil reto do item 1 confirma. Se for só de L1 a L5, 40°. Escolher a definição e o número que corresponde. |
| `coluna.lordoseCervical` | 30° | **mudar para ~16–20°.** A meta-análise de 3597 pessoas (Guo 2018) dá 12,7° a 18,6° conforme o método. O efeito no desenho é pequeno, porque o pescoço quase não aparece; mas 30° deixa o queixo mais à frente do que o normal. |
| `esterno.meiaDistanciaDasClaviculas` | 2,5 cm | **aceitável.** A fonte parcial dá 2,66 cm; a diferença não se vê. Manter com a nota "fonte parcial". |

---

## (c) Tabela final

| achado | onde (imagem e vista) | gravidade | o que fazer |
|---|---|---|---|
| Deltoide inteiro acende onde o conteúdo pede só uma porção | `supino-reto-musculos.png` cima e lateral; `flexao-musculos.png` lateral; `puxada-unilateral-musculos.png` posterior | erro | Dividir em anterior, lateral e posterior antes das próximas animações. |
| Trapézio inteiro, dos dois lados, acende na puxada de um braço | `puxada-unilateral-musculos.png, posterior:mus:f1` | erro | Separar superior × médio/inferior, por lado; acender só médio/inferior do lado que puxa. |
| Goblet de frente sem nenhum músculo realçado | `goblet-musculos.png, frontal:mus:f1` (cinza e pele) | erro | Fazer quadríceps e adutores acompanharem a coxa em escorço; conferência deve falhar se o principal some na vista padrão. |
| Adutores nunca aparecem no goblet | `goblet-musculos.png` lateral e frontal | erro | Resolver junto com o item acima ou dar outra vista. |
| Grande dorsal some na lateral da puxada | `puxada-unilateral-musculos.png, lateral:mus:f1` | impreciso | Desenhar a borda do dorsal no flanco, abaixo da axila. |
| Peitoral some na vista de cima da flexão | `flexao-musculos.png, cima:mus:f1` | impreciso | Usar a lateral como vista padrão do modo Músculos (regra B10). |
| Reto abdominal termina ~11 cm acima do púbis | prancha "Em pé, de frente"; `flexao-musculos.png, lateral:mus:f1` | erro | Levar a borda de baixo até perto da virilha; pôr a altura do púbis na tabela. |
| Trapézio sem a parte do pescoço e sem chegar ao acrômio | prancha "De costas, com o músculo"; `puxada-unilateral-musculos.png` posterior | erro | Subir até a base do crânio; levar a borda de fora até o acrômio e a espinha da escápula. |
| Ponta de baixo do trapézio 4,9 cm acima de T12 | prancha "De costas, com o músculo" | impreciso | Baixar até T12 junto com a correção da forma. |
| Peitoral termina no mamilo e não converge para o úmero | `supino-reto-musculos.png` cima e lateral | impreciso | Descer a borda de baixo para a 5ª–6ª costela; afinar em leque até a axila. |
| Grande dorsal sobe até a espinha da escápula | prancha "De costas, com o músculo" | impreciso | Borda de cima pelo ângulo inferior da escápula (~T7) até a axila. |
| Escápula não muda o contorno com o braço para cima | `puxada-unilateral-tecnica.png, posterior:tec:f0`; prancha "Braços acima da cabeça" | erro | Deformar trapézio e borda da escápula com a rotação para cima; prega da axila com o braço elevado. |
| Cotovelo a 162° no fim da puxada | `puxada-unilateral-musculos.png, lateral:mus:f1` | erro | Fim com cotovelo a 100–130°, ao lado das costelas. |
| Flexão "quadril cai" atravessa o chão | `flexao-erros.png, lateral:err:f1:quadril` | erro | Aplicar a regra do chão aos quadros de erro; manter o peito na altura do certo. |
| Flexão "quadril cai" dobra no quadril, não na lombar | `flexao-erros.png, lateral:err:f1` e `f0.5` | impreciso | Pôr a curva na lombar, com a pelve girando para a frente. |
| Goblet "lombar arredonda" com tronco quase horizontal | `goblet-erros.png, lateral:err:f1:lombar` | erro | Reduzir a queda do tronco; mostrar a pelve girando para trás e a curva entre L3 e o sacro; conferir equilíbrio no erro. |
| Goblet "lombar arredonda" no meio mostra curva torácica | `goblet-erros.png, lateral:err:f0.5:lombar` | erro | Mesma correção; a curva não pode estar nas costas de cima. |
| 34° de flexão sobre 50° de lordose não arredonda a lombar | `tabelas.md`, ficha do goblet | impreciso | Revisar a conta ou o texto do erro. |
| Joelhos se tocam no valgo | `goblet-erros.png, frontal:err:f1:valgo` | gosto | Reduzir um pouco (por exemplo 6–7 cm por lado). |
| "Ombros saem do banco" quase invisível e rotulado no fundo | `supino-reto-erros.png, lateral:err:f1:escap` | erro | Mostrar o ombro de trás descolando do banco; usar o quadro do topo. |
| "Ombro encolhido" quase invisível | `puxada-unilateral-erros.png, posterior:err:f1:encolher` | erro | Subir o acrômio e estufar o trapézio superior; depende da forma nova do trapézio. |
| Tronco para trás só com extensão do quadril | `puxada-unilateral-erros.png, lateral:err:f1:tronco` | impreciso | Dividir o giro entre joelho (coxa inclina) e lombar. |
| Pegada do supino: 15° na conferência, quase pronada no desenho | `supino-reto-tecnica.png, cima:tec:f1`; `conferencia.md` | impreciso | Conferir a medida de pronação contra a ficha (20–30° a partir da pronação). |
| Punho a 94° na flexão | `conferencia.md`; `flexao-tecnica.png` | impreciso | Teto de ~90° ou mão um pouco mais para os pés. |
| Pescoço quase ausente de lado, longo de cima; entalhe escuro sob o queixo | prancha "De lado"; `goblet-tecnica.png` e `supino-reto-tecnica.png` lateral; `flexao-tecnica.png` cima | impreciso | Mostrar ~9 cm de pescoço de frente e de lado; tirar o entalhe. |
| Perfil sem cifose, lordose e nádega visíveis | prancha "De lado"; `goblet-tecnica.png, lateral:tec:f0` | impreciso | Contorno das costas seguir as curvas da tabela. |
| Mão da flexão sem dedos | `flexao-tecnica.png, lateral:tec:f0` | impreciso | Desenhar dedos e polegar no apoio (B6). |
| Coxa em escorço sem joelho | `goblet-tecnica.png, frontal:tec:f1` | impreciso | Mostrar patela e joelho; pôr o marcador no joelho. |
| Ombro à frente do peito na puxada esticada | `puxada-unilateral-tecnica.png, lateral:tec:f0` | impreciso | Conferir a posição do ombro com a escápula girada. |
| Trajetória "peito" sai da base do pescoço | `flexao-musculos.png, lateral:traj:f1` | impreciso | Usar um ponto no esterno. |
| Músculos na versão pele com pouco contraste | `goblet-musculos.png` e `supino-reto-musculos.png`, versões pele | gosto | Conferir contraste do vermelho e do laranja sobre a pele. |
| Papéis sem serrátil, eretores e trapézio médio/inferior | `exercicios/*.ts` (`papeis`) | impreciso | Criar as formas (item 4) e incluir como secundário ou "só ajuda". |
| Abdome "só ajuda" na flexão fora da lista do conteúdo | `flexao.ts` × `biblioteca/exercicios.json` | impreciso | Acrescentar abdome à lista do conteúdo. |
| `quadril.meiaDistancia` 8,7 | `tabelas.md` | impreciso | Trocar para ~8,3. |
| `ombro.centroAFrente` 0 | `tabelas.md` | gosto | Manter 0 (convenção) ou −2. |
| `l5s1.acima` 12 | `tabelas.md` | aceitável | Manter 12; não trocar para 14,5. |
| `l5s1.atras` 4,5 | `tabelas.md` | impreciso | Trocar para ~3. |
| `coluna.lordoseLombar` 50° | `tabelas.md` | impreciso | Definir L1–L5 (40°) ou L1–S1 (~60°). |
| `coluna.lordoseCervical` 30° | `tabelas.md` | impreciso | Trocar para ~16–20°. |
| `esterno.meiaDistanciaDasClaviculas` 2,5 | `tabelas.md` | aceitável | Manter, com "fonte parcial". |
