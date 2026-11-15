# Proposta da animação nova (etapa 1)

De 13/11/2026. Ramo `claude/loving-hamilton-c4ji83`. Nada foi para a `main` e nada mudou no app: o motor novo vive em `src/engine/novo/`, que nenhuma tela importa.

Este documento fecha a etapa 1 e para aqui. As etapas 2 e 3 só começam com o seu sim.

## 0-B. Fechamento do corpo (sessão nova, 14 e 15/11/2026)

Ramo `claude/friendly-goldberg-hwf6dl`, com o ramo anterior e a `main` já juntados (o único conflito foi a linha do comando no `package.json`). Nada foi para a `main` e nada mudou no app. Esta seção é a mais recente; as seções de 0 a 12 abaixo são o registro da etapa 1.

### O que foi feito

| O que | Como ficou | Onde olhar |
|---|---|---|
| A faixa escura no pescoço visto de cima | Não era a dobra do pescoço: era um defeito de pintura (um trecho do contorno da cabeça entrava no sentido contrário e abria um buraco). Corrigido; some em todas as vistas | `parada-do-corpo/1-flexao-de-cima.png` |
| A mão espalmada vista de cima | Desenho novo da mão vista pelo dorso: mesma luva com polegar, 18,4 cm de comprimento (o da mão aprovada), 8,6 cm de largura (ANSUR II), pontas dos dedos em arco e três linhas finas entre os dedos. A mão apoiada passa a ser pintada antes do braço, com o seu contorno | a mesma imagem |
| A sombra do banco vista de cima | Tirada: a sombra do chão só aparece nas vistas inclinadas | `prototipos/folha-supino-reto.png` |
| Os rótulos de técnica | O motor novo passou a ter os rótulos do guia de hoje. O texto fica parado, fora do corpo, e um fio o liga ao ponto que se mexe; linhas-guia tracejadas onde o guia de hoje tinha | `parada-do-corpo/3-rotulos.png` |
| O nome do erro pequeno nas cenas largas | A letra passou a ser uma fração da largura do quadro: 11 px (rótulos) e 12 px (erro) num palco de 360 px, na cena estreita e na larga. O corpo voltou a ficar no meio do quadro | a mesma imagem e `prototipos/erros.png` |
| A pegada do goblet | As mãos em concha por baixo da cabeça de cima do halter, abertas num V de 22 graus, com a quina da cabeça apoiada na palma | `parada-do-corpo/2-goblet-pegada.png` |
| A tabela dos músculos (bloco A) | Os 15 grupos do desenho ganharam origem, inserção, camada, forma e fonte (Gray 1918), em `src/engine/novo/dados/musculos.json`, validado na carga | `tabelas.md`, seção dos músculos |
| A conferência dos músculos | `npm run conferir:animacao` passou a medir: se cada forma está na parte do corpo certa, se quem cobre é pintado depois, se as pontas ficam onde a fonte diz e se o músculo realçado é o do conteúdo do app | `prototipos/conferencia.md` |
| As medidas provisórias | Das 13 do corpo, 6 ganharam fonte; das 16 dos objetos, 7. Ficam 7 e 9 | `pesquisa/09` e `pesquisa/10`; `tabelas.md` |
| O roteiro do especialista | Reescrito para o corpo novo | `docs/revisoes/r4-roteiro-especialista.md` |
| Pedidos ao conteúdo | Um achado: o ângulo dos cotovelos no supino aparece como 30–60° na pesquisa e 30–70° no texto do app | `pedidos-ao-conteudo.md` |

### O que a conferência dos músculos achou

- **Corrigido:** o trapézio era pintado antes do grande dorsal e o peitoral antes do abdômen; pela anatomia é o contrário (o trapézio cobre a borda de cima do dorsal). A ordem agora sai da tabela.
- **Aviso, para decidir:** a ponta de baixo do trapézio fica a 126,5 cm do chão, 4,9 cm acima da 12ª vértebra torácica (121,6 cm no esqueleto), que é onde a fonte diz que ela chega.
- **Aviso, para decidir:** o reto abdominal termina a 102,8 cm, na linha da cintura; a origem dele é no púbis, mais abaixo. No desenho aprovado a bacia fica lisa.
- **Medido, sem aviso:** o deltoide desce até 46% do braço (a fonte: o meio do úmero); o grande dorsal desce até 108 cm (a crista ilíaca fica a 106,5); o quadríceps vai até o joelho.
- **Nas quatro âncoras, o músculo realçado bate com o conteúdo do app.** Três diferenças aceitas, a confirmar: o abdômen como "só ajuda" na flexão, o trapézio como secundário na puxada e o deltoide inteiro onde o conteúdo pede só a parte da frente ou a de trás.
- **Ainda não feito:** a forma do músculo não engrossa ao encurtar (a regra está na tabela, com a fonte; o desenho ainda não a segue).

### Medidas, depois das mudanças

Coincidência com as pranchas aprovadas (`conferir-desenho.mjs`, cinza): de frente 97,8%, de lado 99,3%, de costas 97,7%, agachamento 96,2% (era 96,6%: a mão virou concha), flexão 95,0%, supino 97,5%, puxada 98,4%.

Conferência automática: 0 falha nas quatro. O punho no goblet passou de 35° para cerca de 65° de extensão (a média normal é 70°): é próprio da pegada por baixo do halter.

Peso (`scripts/animacao-nova/peso.mjs`, compactado, sem o zod):

| Pacote | Compactado |
|---|---|
| Motor de hoje, com os 90 exercícios | 48,0 kB |
| Motor novo com as 4 âncoras, como está | 45,6 kB (era 42,2: entraram os rótulos e a mão nova) |
| O mesmo, sem os textos de fonte | 38,8 kB |
| Só o motor novo, sem exercício | 35,0 kB (30,2 sem os textos) |
| Cada exercício, junto com os outros | cerca de 2,7 kB (2,2 sem os textos) |
| Cada exercício, carregado sozinho | de 4,1 a 5,3 kB (inclui as peças que ele divide com os outros) |

Conta minha, não medida: com os 90 exercícios num pacote só, o novo ficaria perto de 230 kB sem os textos, quase cinco vezes o de hoje. As duas medidas propostas se confirmam: tirar os textos de fonte (corta de 15% a 20%) e carregar cada exercício ao abrir (o motor fica em 30 a 35 kB e cada exercício soma de 4 a 5 kB). Para o app funcionar sem rede, os 90 pedaços ainda seriam baixados e guardados, aos poucos.

Tempo por quadro (CPU 4 vezes mais lenta, com outras tarefas rodando na mesma máquina durante a medida): da segunda volta em diante, de 2,5 a 6,5 ms de média; na primeira volta, de 6 a 17 ms, com picos acima de 16,7 ms no goblet e na puxada. A faixa é parecida com a da etapa 1, um pouco pior; como a máquina estava ocupada, não dá para dizer que os rótulos pesaram. Vale medir de novo com a máquina parada.

### O que não ficou bom, ou não foi feito

- **A mão na flexão vista de cima continua meio escondida.** É a geometria: na flexão, a mão fica debaixo do ombro e do braço. O desenho melhorou; a leitura dessa vista ainda é fraca.
- **O antebraço na flexão fica uns 30° fora da vertical embaixo** (o cotovelo sai 13 cm para fora da mão), com as mãos 6 cm além dos ombros e os cotovelos a ~45°. De lado, o braço de perto aparece como uma forma meio quadrada. Não mexi: é pergunta para o treinador.
- **Dois riscos pequenos na cintura** aparecem na flexão vista de cima, no começo (onde o tronco encontra a bacia).
- **Lighthouse e bloqueio da tela do guia não foram medidos:** o motor novo ainda não está ligado ao app (a lista de exercícios aprovados está vazia). Só dá para medir quando a primeira âncora aprovada entrar.
- **Celular de verdade:** não medido.
- **`npm run test:e2e` não foi rodado:** o app não mudou. `npm run check` (896 testes) e `npm run auditoria:anatomia` passam.
- **A revisão independente** foi disparada duas vezes. Na primeira, no modelo mais capaz, os dois revisores pararam por limite de uso antes de gravar o parecer. Refeita no modelo seguinte (Opus): ver abaixo.

### A revisão independente

REVISAO_PENDENTE

## 0. Depois do retorno do Gustavo (13/11/2026)

Ele olhou as folhas e apontou três coisas. O que foi feito em cada uma:

1. **O erro não ficava claro, principalmente de frente** (o joelho para dentro no agachamento). O modo Erros foi refeito: só a parte do corpo que erra fica em vermelho, uma linha vermelha mostra onde ela está, uma linha tracejada verde mostra onde deveria estar, o corpo do movimento certo continua tracejado por trás e o nome do erro fica fora do corpo, com um fio até o ponto. No agachamento, o joelho agora cai para dentro conforme a pessoa desce e continua assim embaixo (antes o erro sumia justamente no fundo), com 9 cm de desvio medidos na ficha. Os 12 erros das quatro âncoras estão em `prototipos/erros.png`, ao lado dos de hoje.
2. **A mão no halter parecia solta.** No goblet, as mãos deixaram de ser punhos fechados ao lado do halter: agora ficam em concha, com a palma encostada nos dois lados da cabeça de cima, os dedos para cima e o polegar para o peito, como a ficha da técnica descreve.
3. **Os equipamentos ficaram piores que os de hoje.** Concordo. A direção que ele deu depois: partir dos cartões de hoje, com aquele realismo (pode simplificar um pouco, não muito), para a pessoa chegar na academia, olhar e reconhecer o aparelho.

   O que descobri: os 49 cartões de hoje não são desenhos soltos. Saem de um gerador por código (`scripts/desenhos-equipamento/realista/`), em 3D, com materiais em quatro tons, estofado com costura, anilha com aro e sombra macia. Por isso dá para usar **o mesmo gerador** para desenhar o equipamento dentro das cenas das animações, em qualquer vista, com as medidas da tabela de objetos.

   **Feito, com o sim dele ("pode seguir com o equipamento realista e refazer a polia"):**

   - O gerador dos cartões foi levado para dentro do motor (`src/engine/novo/realista/base.mjs`, com os tipos ao lado). Os scripts dos 49 cartões passaram a importá-lo de lá: é um arquivo só, sem cópia.
   - Cada exercício agora diz, pelo nome, as peças que usa (halter, anilha, banco reto, coluna de polia, estribo, cabo, colchonete), e `src/engine/novo/equipamento.ts` desenha cada uma com o gerador, com as medidas da tabela de objetos, na vista da cena.
   - **A coluna da polia foi refeita:** base, estrutura de quatro colunas, guias cromadas, pilha de placas (as de cima sobem com o cabo, pelo curso do cabo dividido pela relação da máquina), trilho com os furos de regulagem, carrinho e roldana na altura pedida, estribo com fita e o cabo.
   - No tema escuro os materiais escuros (grafite, ferro, borracha) sobem de tom, para não sumirem no fundo.
   - As quatro animações, a página e as folhas já usam o equipamento realista. As peças simples ficaram só para a conferência (onde o corpo encosta, onde o cabo passa).

   A comparação está em `prototipos/equipamento-realista.png` (peças simples, realista, tema escuro, cor de pele, e os cartões de hoje dessas peças). Os três cartões simples que eu tinha feito saíram do ramo: os 49 cartões de hoje ficam.

   Peso e tempo, medidos de novo com o equipamento realista: o gerador soma cerca de 6,5 kB ao pacote (o motor novo com as 4 âncoras vai a 41,4 kB compactados) e o tempo por quadro ficou na mesma faixa de antes (tabela da seção 5).

   Conferido: depois da mudança de lugar do gerador, regerei os 49 cartões e nenhum arquivo de `public/equipamento/` mudou (saem idênticos, byte a byte).

   O que falta no equipamento: refazer com medidas reais os aparelhos que o diagnóstico mostrou mais estreitos que os de verdade; e as peças dos próximos lotes (banco regulável, barra fixa, kettlebell, elástico e outras), que hoje só existem como cartão.

   A pegada do goblet também foi refinada depois: a mão agora é uma concha, com os dedos dobrando sobre a cabeça de cima do halter.

4. **O equipamento realista e a polia refeita foram aprovados** ("ficou como eu quero", 14/11/2026). Com isso, o passo seguinte foi a fluidez, que era o que impedia qualquer animação nova de entrar no app. Está resolvida nas quatro âncoras (seção 5): da segunda volta do ciclo em diante, cada quadro leva de 2 a 5 ms no celular lento simulado, menos que o guia de hoje.

O que ainda não ficou bom depois dessas mudanças: o nome do erro sai pequeno nas cenas largas (a puxada, com a coluna inteira no quadro), e o rótulo é só o título do erro, sem os rótulos de técnica.

## 1. Em uma página

- **O desenho** é o que você escolheu em 13/11/2026 na sessão do desenho do Boneco: o **cinza** como padrão e o **cor de pele** como opção na configuração (`docs/revisoes/boneco-desenho/decisao.md`).
- **A técnica** é a que aquela sessão recomendou: o corpo em seções ovais calculadas pelo motor, com as seções tiradas dos perfis desenhados à mão, e saída em SVG. Sem vídeo, sem imagem gerada por modelo, sem biblioteca nova.
- **O motor reproduz o desenho aprovado em 97 a 99%** nas poses das pranchas (medido, seção 2). O que sobra são cinco pontos em que o desenho aprovado contradiz a medida real ou ele mesmo; estão listados, com a minha recomendação, para você decidir olhando.
- **As quatro âncoras** (goblet, supino reto, puxada unilateral e flexão) estão refeitas, com a página animada, as folhas ao lado das de hoje e a conferência automática sem nenhuma falha.
- **O custo que apareceu, e foi resolvido:** o novo era de 2 a 3 vezes mais lento para desenhar que o de hoje. Depois de três cortes (seção 5), num celular lento simulado (CPU 4 vezes mais lenta) cada quadro leva de 5 a 14 ms na primeira volta do ciclo e de 2 a 5 ms dali em diante, contra 5 a 7,5 ms hoje. O preço é memória: o desenho pronto da animação que está na tela fica guardado (de 6 a 13 MB).
- **O que eu recomendo:** aprovar a direção, decidir os pontos da seção 9 e seguir para a etapa 2 em lotes, começando pelas famílias que reaproveitam as cenas das âncoras.

## 2. O desenho no motor: quanto ficou igual ao aprovado

O comando `node scripts/animacao-nova/conferir-desenho.mjs` desenha, na mesma pose e no mesmo tamanho, o aprovado (o código das pranchas), o do motor e a diferença, e mede quanto as duas silhuetas coincidem. As imagens estão em `prototipos/conferencia-do-desenho-cinza.png` e `prototipos/conferencia-do-desenho-pele.png`.

| Pose da prancha | Cinza | Cor de pele |
|---|---|---|
| Em pé, de frente | 97,8% | 97,7% |
| Em pé, de lado | 99,3% | 99,0% |
| Em pé, de costas | 97,8% | 97,9% |
| Agachamento | 96,6% | 96,4% |
| Supino | 97,4% | 97,2% |
| Puxada, ajoelhado | 98,4% | 98,2% |
| Flexão | 94,9% | 94,5% |

O agachamento caiu de 97,8% para 96,6% depois que a mão do goblet virou uma concha a pedido do Gustavo: na prancha aprovada ela era um punho fechado. No começo desta retomada a coincidência era de 81% de frente e 93% de lado. O que foi acertado: os braços afastados do corpo em pé, a dobra do pescoço de lado, as pontas arredondadas dos membros, o pé de base chata, a mão e o polegar com contorno, a posição dos músculos de frente, o glúteo por cima da coxa, o short opaco que vira véu só quando há músculo trabalhando debaixo dele, o cabelo e o contorno na cor de cada parte.

### As cinco diferenças que sobraram (decisão sua)

Em todas, chegar a 100% significaria desenhar algo que a medida ou a anatomia não confirma. A minha recomendação está na última coluna.

| # | Onde | O aprovado | O motor | Recomendo |
|---|---|---|---|---|
| 1 | Pé, visto de frente | 12,7 cm de largura, forma de sino igual dos dois lados | 9,9 cm (largura do pé no ANSUR II), mais a abertura do pé | manter a medida real; se você preferir o pé mais largo do desenho, é uma linha |
| 2 | Mão solta | 18,4 cm de comprimento de lado e 16,2 cm de frente (os dois desenhos não combinam) | 18,4 cm nas duas vistas | manter 18,4 cm |
| 3 | Polegar no punho fechado, de lado | sempre desenhado por cima da mão | só aparece quando o polegar está mesmo virado para quem olha (no supino, de lado, ele fica do outro lado da mão) | manter o do motor |
| 4 | Pé na flexão | reto, de ponta | os dedos dobram e apoiam no chão | manter o do motor |
| 5 | Perna do outro lado, de lado | não aparece | aparece um pouco atrás, porque os pés ficam afastados e abertos de verdade | manter o do motor |

Uma coisa do aprovado que eu reproduzi mesmo sendo um efeito do traço: a linha escura do pescoço de lado. Ela nasce da dobra entre o pescoço e o tronco e, como no aprovado, não aparece de frente nem de costas.

### Vistas que você ainda não tinha visto

O desenho só tinha sido aprovado em pé (de frente, de lado e de costas) e de lado nas poses. Nas folhas desta etapa aparecem pela primeira vez: o agachamento de frente, o supino e a flexão de cima, e a puxada de trás. Elas saem do mesmo corpo, sem desenho novo. Olhe com atenção: é aqui que pode haver surpresa.

O que eu mesmo acho que ainda não está bom nessas vistas (opinião minha, olhando as folhas):

- **A mão espalmada vista de cima** (flexão): ficou tosca, parece uma pata. A mão só foi desenhada de lado e de frente; de cima ela precisa de um desenho próprio.
- **A dobra do pescoço vista de cima** (flexão e supino): aparece como uma faixa escura entre a cabeça e os ombros. De lado ela é igual à do aprovado; de cima chama atenção demais.
- **O agachamento de frente, embaixo:** as coxas apontam para quem olha, e o músculo da coxa aparece pequeno. É o que a vista mostra de verdade, mas lê pior que de lado.
- **A puxada de trás:** o corpo fica na frente da coluna da polia e as duas se misturam um pouco.

## 3. Técnica recomendada e as alternativas descartadas

**Recomendada: motor próprio, em SVG, com o corpo em seções (caminho B da sessão do desenho).** Cada parte do corpo é uma fileira de seções ovais. O perfil desenhado de lado dá o raio para a frente e para trás; o perfil desenhado de frente dá a largura. O contorno em qualquer vista é calculado, e o resultado é texto SVG, como hoje. Os músculos, a rótula e as linhas dos dedos são desenhos presos à superfície. Tudo é determinístico: a mesma pose dá o mesmo desenho.

| Alternativa | Licença | Peso (minificado / compactado) | Fluidez e determinismo | Por que não |
|---|---|---|---|---|
| Malha humana do MakeHuman com pintor WebGL próprio | CC0 (lida nos arquivos de origem) | cerca de 290 kB compactados só a malha | fluida; resultado pode variar entre placas de vídeo | você viu e recusou o resultado ("fica meio esquisito para absorver") |
| three.js | MIT (lida) | 392 kB / 89 kB, mais 422 kB / 105 kB do núcleo (medido; teto, sem remoção de código morto) | não é igual bit a bit entre aparelhos | pesa o dobro do motor de hoje inteiro, para desenhar um boneco chapado |
| Rive | MIT (campo de licença do pacote) | 684 kB / 152 kB de código, mais 2,26 MB / 941 kB de WebAssembly (medido) | não verificado | pesado, e a animação passaria a ser feita num editor, à mão: perde a medida |
| dotLottie | MIT (campo de licença) | 161 kB / 31 kB, mais 1,2 MB / 492 kB de WebAssembly (medido) | não verificado | o mesmo problema: quadro desenhado, não calculado |
| Spine | licença própria: cada usuário do produto precisa de licença do editor | não medido | | licença incompatível |
| Captura de movimento (AMASS) | só pesquisa e uso não comercial | | | proibida pelas regras desta sessão |
| Captura de movimento (CMU) | não verificada (o site não abriu) | | | sem licença lida, não entra |

Os números e as fontes de cada linha estão em `pesquisa/07-tecnica-de-desenho.md`. Os experimentos que você recusou (malha, pintor WebGL, os oito estilos) saíram do ramo nesta etapa e continuam no histórico do git (commit `356269a`); a imagem `prototipos/opcoes-de-boneco.png` ficou como registro.

## 4. As tabelas do bloco A

Estão todas em **`tabelas.md`**, geradas direto dos arquivos de dados (nenhum número digitado):

| Tabela | Onde está o dado | Estado |
|---|---|---|
| Corpo | `src/engine/novo/dados/corpo-homem.json` e `corpo-mulher.json` | ANSUR II, homens e mulheres de IMC normal; 62 medidas lidas, 16 derivadas, 13 provisórias |
| Amplitudes | `dados/amplitudes.json` | CDC (Soucie 2011) e AAOS; passar da média gera aviso, passar do máximo é falha |
| Massas dos segmentos | `dados/segmentos.json` | de Leva 1996 |
| Músculos | `dados/boneco.json` | 16 formas do desenho aprovado; posição ainda não conferida contra o atlas |
| Objetos | `dados/objetos.json` | 7 objetos; 16 medidas provisórias |
| Ficha de movimento | `dados/movimentos/<id>.json` | 4 fichas (as âncoras), cada número com selo e fonte |

**Um corpo só.** O esqueleto, o desenho, a conferência e o centro de massa leem a mesma tabela. O comprimento de cada osso não muda durante o movimento (a conferência mede: desvio de 0 cm).

**Conferência automática** (`npm run conferir:animacao`, relatório em `prototipos/conferencia.md`): proporções, amplitudes, contatos, chão, objetos, cabos, ritmo, simetria, fecho do ciclo, equilíbrio, regras da ficha e itens provisórios.

| Animação | Quadros conferidos | Falhas | Avisos |
|---|---|---|---|
| Goblet | 279 | 0 | 3 |
| Supino reto | 291 | 0 | 1 |
| Puxada unilateral | 240 | 0 | 3 |
| Flexão | 225 | 0 | 4 |

Os avisos são amplitudes acima da média (dentro do máximo observado) e linhas marcadas como escolha de desenho. A falha que havia na puxada (o antebraço fora da linha do cabo) foi corrigida: agora o antebraço segue o cabo durante o movimento todo, e a flexão do cotovelo é consequência.

**As 13 medidas provisórias do corpo:** altura do calcanhar ao tornozelo, a razão entre o braço relaxado e o fletido, a meia distância entre os quadris, a posição do centro do ombro, a posição de L5/S1 (2 linhas), as três curvas da coluna, o comprimento da clavícula, a meia distância entre as clavículas e a altura e a largura da escápula. Nenhuma define a silhueta; todas definem onde as juntas ficam por dentro. **As 16 dos objetos:** estão marcadas em `tabelas.md` (espessura da anilha, largura da coluna da polia, estribo, colchonete, tubos dos bancos e outras).

## 5. Peso e fluidez (medido)

Medidas em `prototipos/medidas.json`, geradas por `scripts/animacao-nova/prototipos.mjs`.

**Peso do código** (minificado e compactado):

| Pacote | Compactado |
|---|---|
| Motor de hoje, com os 90 exercícios | 48,0 kB |
| Motor novo, sem nenhum exercício (motor, corpo, desenho, objetos e o gerador do equipamento) | 31,7 kB |
| Motor novo com as 4 âncoras | 42,2 kB (mais o zod, que o app já carrega) |
| Cada exercício novo | cerca de 1,7 kB (medido: 5,1 kB para 3) |

Projeção minha (não medida): com os 90 exercícios, o novo ficaria perto de 180 kB, mais de três vezes o de hoje. Quase metade de cada ficha é texto de fonte, que o app não precisa carregar para desenhar. Proponho duas medidas, a confirmar com medição na etapa 2: tirar os textos de fonte do que vai para o app (eles continuam nos arquivos e nos documentos) e carregar cada exercício só quando for aberto, guardando para uso sem rede.

**Tempo por quadro**, no Chromium com a CPU 4 vezes mais lenta, palco de 360 px (montar o SVG, trocar no palco e forçar o layout), desenho cinza, com o equipamento realista:

| Animação | Hoje (média) | Novo, antes dos cortes (média) | Novo, primeira volta do ciclo (média) | Novo, da segunda volta em diante (média / 95% dos quadros abaixo de) | SVG de um quadro: hoje / novo antes / novo agora |
|---|---|---|---|---|---|
| Goblet | 5,9 a 7,6 ms | 12,6 a 12,9 ms | 7,6 a 14,4 ms | 2,7 a 2,8 ms / 3,9 ms | 14 kB / 51 kB / 29 kB |
| Supino reto | 5,2 a 6,0 ms | 11,8 a 13,2 ms | 9,2 a 12,4 ms | 3,4 a 3,6 ms / 5,3 ms | 14 kB / 58 kB / 31 kB |
| Puxada unilateral | 5,5 a 7,0 ms | 19,1 a 20,4 ms | 14,3 a 14,8 ms | 4,9 a 5,1 ms / 7,4 ms | 15 kB / 104 kB / 52 kB |
| Flexão | 5,8 a 6,7 ms | 9,9 a 10,4 ms | 7,5 a 9,1 ms | 1,9 a 4,7 ms / 5,6 ms | 14 kB / 44 kB / 24 kB |

Cada faixa junta os modos Técnica e Músculos. A medição oscila alguns milissegundos de uma rodada para outra. O limite para 60 quadros por segundo é 16,7 ms.

O que foi feito (14/11/2026), sem mudar o desenho:

1. **Contas que não mudam deixaram de ser refeitas a cada quadro.** A posição de cada músculo de frente e de costas sobre o tronco era procurada de novo em todo quadro; agora é procurada uma vez. Só isso cortou até um terço do tempo nas vistas de frente, de cima e de trás.
2. **O texto do SVG ficou mais curto.** As coordenadas passaram a ser escritas como diferença do ponto anterior, com os mesmos valores arredondados (sem acumular erro). As seções de cada membro passaram a ficar nas estações em que os perfis aprovados foram desenhados, em vez de passos iguais: menos pontos e a mesma curva das pranchas. O recorte que dá contorno à coxa quando ela passa na frente do tronco deixou de ser repetido para as duas pernas e só entra quando a coxa cruza mesmo o tronco.
3. **O desenho pronto de cada instante fica guardado.** O movimento se repete igual a cada volta do ciclo; da segunda volta em diante, o quadro já está montado e só é posto na tela.

Conferido: antes e depois dos cortes 1 e 2 (texto curto e contas guardadas), o desenho ficou igual pixel a pixel, salvo 21 pixels em 13 milhões, todos na borda do traço. Com as seções nas estações aprovadas, a coincidência com as pranchas subiu um pouco (de lado, de 99,2% para 99,3%). A conferência automática continua sem falha nas quatro.

Testado e descartado: separar o equipamento parado (a coluna da polia, o banco) numa camada desenhada uma vez só. Funcionou e dava o mesmo desenho, mas a parte parada pesa pouco (7,7 kB na coluna da polia); quase todo o texto de cada quadro é o corpo. Sem ganho medido, o código saiu.

**O que isto custa, e o que falta:**

- **Memória.** O desenho pronto da animação que está na tela fica guardado: até 241 quadros de 24 a 52 kB, isto é, de 6 a 13 MB (conta feita, não medida no aparelho). Ao trocar de exercício, vista, modo, desenho ou tema, o que estava guardado é descartado. Se for demais para celulares fracos, dá para guardar menos instantes (120 em vez de 240), ao custo de passos de até 0,5 cm.
- **A primeira volta** do ciclo ainda é montada quadro a quadro. Na puxada, de trás, fica em 14 a 15 ms de média e passa de 16,7 ms em alguns quadros (pior caso de 18 a 25 ms): nos primeiros 4 segundos, num celular lento, ela pode perder alguns quadros. Nas outras três, a primeira volta fica dentro do limite na média.
- **Não foi medido** um celular de verdade (só a CPU simulada).

Meta que eu tinha proposto (média de até 12 ms e pior caso de até 16 ms): atingida nas quatro da segunda volta em diante; na primeira volta, atingida em três e não na puxada.

## 6. Plano em lotes

Ordem pela reutilização das cenas e das peças já feitas, e não por frequência de uso: eu não medi quantas vezes cada exercício aparece nos programas gerados (isso exigiria rodar o gerador sobre as personas; posso fazer na etapa 2, se você quiser a ordem por frequência).

| Lote | Famílias (animações de hoje) | Quantas | O que exige de novo |
|---|---|---|---|
| 0 | as 4 âncoras | 4 | pronto nesta etapa (falta o seu ok nas folhas) |
| 1 | agachamentos, afundos, búlgaros | 10 | kettlebell, elástico, fita de suspensão, banco como apoio do pé |
| 2 | flexões, pike, extensão de tríceps no chão | 9 | bola, elástico, fita, degrau |
| 3 | supino inclinado, crucifixos, desenvolvimentos, elevações de braço | 10 | banco regulável (já feito), polia dupla |
| 4 | puxadas, barra fixa, remadas, face pull, YT | 16 | barra fixa, corda da polia, banco de apoio |
| 5 | roscas e tríceps | 14 | corda, barra, banco inclinado |
| 6 | stiff, pontes, nórdico, panturrilhas | 14 | degrau, apoio do nórdico |
| 7 | abdominais, roda, elevação de joelhos, abdução, adução, extensão de joelho, abertura deitado | 13 | paralelas, roda, caneleira, mini band |

Soma: 90. Cada lote segue o mesmo rito: ficha de movimento com fonte, animação, conferência sem falha, folha ao lado da de hoje, o seu ok por exercício, e só então a entrada no app. Os exercícios que hoje são cartão de texto continuam cartão de texto.

Os 49 desenhos de cartão de equipamento entram junto com o lote que usa a peça. Os três cartões simples que esta etapa tinha feito saíram do ramo depois do retorno do Gustavo (seção 0): os 49 cartões de hoje ficam, e o equipamento das cenas passou a sair do mesmo gerador deles.

## 7. Como o velho e o novo convivem

- O motor novo fica em `src/engine/novo/` e o de hoje não muda. O app escolhe por exercício: se o exercício está na lista dos refeitos e aprovados, usa o novo; senão, usa o de hoje. A lista começa vazia.
- Nada muda no gerador, nas regras nem no que fica salvo no aparelho. A escolha do desenho (cinza ou cor de pele) seria um valor a mais na preferência de estilo que já existe.
- Regressão visual: uma linha de base nova, só do motor novo, em `tests/visual/`; a de hoje continua valendo para os exercícios que ainda usam o motor de hoje. A conferência automática vira teste em `tests/motor/`.
- **A `main` mudou desde que este ramo nasceu** (conferido em 13/11/2026, só leitura): o sistema visual do app foi trocado, o `src/styles.css` foi quase todo reescrito e o Boneco animado passou a aparecer também na tela do treino (`src/features/treino/PalcoTreino.tsx`), além do guia (`src/features/guia/Guia.tsx`). Nada disso tocou `src/engine/`, `public/equipamento/`, `tests/motor/` nem `tests/visual/`. Este ramo não mexeu no `src/styles.css` (as cores do motor novo estão em `src/engine/novo/estilo.css` e em `cssDoBoneco`). Antes da etapa 2, trago a `main` para dentro deste ramo e ligo o novo nos dois palcos, que agora são dois.
- O `docs/devlog.md` não foi atualizado por mim: ele fica fora das pastas que esta sessão pode alterar. O texto para ele está no meu relato.

## 8. Os estilos Clássico e Silhueta, e o teste de equivalência

Hoje a configuração tem três estilos: Boneco (padrão), Clássico e Silhueta. O teste `tests/motor/equivalencia.spec.ts` compara o Clássico com o guia original, quadro a quadro.

Proposta: durante a etapa 2, nada muda nesses três. Cada exercício aprovado no motor novo ganha os dois desenhos novos (cinza e cor de pele) e deixa de oferecer Clássico e Silhueta, porque eles dependem do esqueleto antigo. Quando o último lote for aprovado, o Clássico e a Silhueta saem da configuração, e o teste de equivalência sai junto com o motor antigo. Até lá ele continua rodando para os exercícios que ainda usam o motor de hoje. A alternativa (redesenhar a Silhueta no corpo novo) é possível e barata, se você quiser mantê-la: é o corpo novo sem contorno e sem linhas.

## 9. Decisões para você

Da sessão do desenho (continuam abertas):

1. **Cor do músculo secundário.** No cinza é laranja; no cor de pele é um tom claro do vermelho. Duas regras ou uma? Recomendo manter as duas: cada uma foi a que deu contraste no seu fundo.
2. **Short no tema escuro.** O short claro quase se confunde com a pele (contraste de 1,2 para 1). Recomendo um short mais escuro nesse tema.
3. **Tom de pele.** Um só ou a pessoa escolhe? Recomendo um só no começo; as cores já estão separadas, e acrescentar tons depois é simples.
4. **Corpo.** Só o homem ou uma segunda pessoa? A tabela da mulher existe, mas o desenho aprovado é só do homem. Recomendo fechar os 90 com um corpo e decidir depois.
5. **A bolinha da junta-chave** do boneco de hoje não entrou no desenho novo. Recomendo deixar fora do corpo e, se fizer falta no modo Técnica, pôr como marca por cima.
6. **O estilo Silhueta** continua? Ver seção 8.

Desta etapa:

7. **As cinco diferenças da seção 2** (pé de frente, mão, polegar, pé na flexão, perna do outro lado).
8. **As vistas novas** (frente, cima e trás fora da pose em pé): estão boas o bastante para seguir?
9. **O modo Erros.** Refeito depois do seu retorno (seção 0): só a parte que erra em vermelho, as duas linhas e o nome fora do corpo. Falta você dizer se agora o erro se lê de relance, olhando `prototipos/erros.png`.
10. **Rótulos de técnica** ("joelho na direção do pé" e outros): o novo ainda não tem. Entram na etapa 2, fora do corpo.
11. **Músculos que o desenho não separa** (as três porções do deltoide, o peitoral de cima, as porções do trapézio, romboides, redondo maior, eretores). Hoje o guia desenha essas porções. Recomendo pedir essas formas à mesma linha de desenho antes do lote que precisa delas (lotes 3 e 4). Na puxada de um lado só, o trapézio aparece inteiro por falta da metade.
12. **Corpo de referência:** homem, IMC normal, 175,8 cm (ANSUR II). Confirmar.
13. **Fluidez e peso.** A fluidez está resolvida (seção 5); falta você dizer se aceita o custo de memória (de 6 a 13 MB enquanto uma animação está na tela) e a primeira volta da puxada um pouco mais pesada. As duas medidas de peso continuam propostas (tirar os textos de fonte do app; carregar cada exercício ao abrir).
14. **As medidas provisórias** (13 do corpo e 16 dos objetos): sigo procurando fonte na etapa 2; as que não tiverem fonte ficam marcadas, e você decide caso a caso.

## 10. Pedidos ao conteúdo

Nenhum texto técnico nem lista de músculos foi alterado. Não encontrei, nas quatro âncoras, nada no conteúdo que precise de correção. `npm run auditoria:anatomia` continua passando (171 exercícios com guia; 136 batem nos três lugares; 5 com marca a conferir, os mesmos de antes). Por isso `pedidos-ao-conteudo.md` não foi criado.

## 11. O que foi conferido no fim

- `npm run check`: 57 arquivos, 896 testes, tudo passando (inclusive o de privacidade, que falhava por um e-mail citado na pesquisa e depois por lentidão com o arquivo da malha; os dois saíram).
- `npm run conferir:animacao`: 0 falhas nas quatro âncoras.
- `npm run auditoria:anatomia`: passa.
- `npm run test:e2e` não foi rodado: o app não mudou.
- Dados: só as personas fictícias e o corpo de referência do ANSUR II. Nada de `privado/`.

## 12. Onde está cada coisa

| O que | Onde |
|---|---|
| Página com as quatro animações (abre sozinha, sem rede) | `prototipos/index.html` |
| Folhas ao lado das de hoje | `prototipos/folha-goblet.png`, `folha-supino-reto.png`, `folha-puxada-unilateral.png`, `folha-flexao.png` |
| Aprovado × motor × diferença | `prototipos/conferencia-do-desenho-cinza.png` e `-pele.png` |
| Conferência automática | `prototipos/conferencia.md` |
| Os 12 erros das âncoras, hoje e novo | `prototipos/erros.png` |
| Equipamento das cenas com o realismo dos cartões de hoje | `prototipos/equipamento-realista.png` |
| Peso e tempo por quadro | `prototipos/medidas.json` |
| Tabelas do bloco A | `tabelas.md` |
| Referências | `referencias.md` |
| Diagnóstico do que existe hoje | `diagnostico.md` |
