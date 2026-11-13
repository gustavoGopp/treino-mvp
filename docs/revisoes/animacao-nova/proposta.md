# Proposta da animação nova (etapa 1)

De 13/11/2026. Ramo `claude/loving-hamilton-c4ji83`. Nada foi para a `main` e nada mudou no app: o motor novo vive em `src/engine/novo/`, que nenhuma tela importa.

Este documento fecha a etapa 1 e para aqui. As etapas 2 e 3 só começam com o seu sim.

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

O que ainda não ficou bom depois dessas mudanças: o nome do erro sai pequeno nas cenas largas (a puxada, com a coluna inteira no quadro), e o rótulo é só o título do erro, sem os rótulos de técnica.

## 1. Em uma página

- **O desenho** é o que você escolheu em 13/11/2026 na sessão do desenho do Boneco: o **cinza** como padrão e o **cor de pele** como opção na configuração (`docs/revisoes/boneco-desenho/decisao.md`).
- **A técnica** é a que aquela sessão recomendou: o corpo em seções ovais calculadas pelo motor, com as seções tiradas dos perfis desenhados à mão, e saída em SVG. Sem vídeo, sem imagem gerada por modelo, sem biblioteca nova.
- **O motor reproduz o desenho aprovado em 97 a 99%** nas poses das pranchas (medido, seção 2). O que sobra são cinco pontos em que o desenho aprovado contradiz a medida real ou ele mesmo; estão listados, com a minha recomendação, para você decidir olhando.
- **As quatro âncoras** (goblet, supino reto, puxada unilateral e flexão) estão refeitas, com a página animada, as folhas ao lado das de hoje e a conferência automática sem nenhuma falha.
- **O custo que apareceu:** o novo é mais pesado para desenhar. Num celular lento (simulado com a CPU 4 vezes mais lenta), cada quadro leva de 8 a 20 ms na média, contra 5 a 7 ms hoje. A puxada passa do limite de 60 quadros por segundo. Há um plano para baixar isso (seção 5), e ele precisa ser cumprido antes de qualquer animação entrar no app.
- **O que eu recomendo:** aprovar a direção, decidir os pontos da seção 9 e seguir para a etapa 2 em lotes, começando pelas famílias que reaproveitam as cenas das âncoras.

## 2. O desenho no motor: quanto ficou igual ao aprovado

O comando `node scripts/animacao-nova/conferir-desenho.mjs` desenha, na mesma pose e no mesmo tamanho, o aprovado (o código das pranchas), o do motor e a diferença, e mede quanto as duas silhuetas coincidem. As imagens estão em `prototipos/conferencia-do-desenho-cinza.png` e `prototipos/conferencia-do-desenho-pele.png`.

| Pose da prancha | Cinza | Cor de pele |
|---|---|---|
| Em pé, de frente | 97,7% | 97,7% |
| Em pé, de lado | 99,2% | 99,0% |
| Em pé, de costas | 97,7% | 97,8% |
| Agachamento | 97,8% | 97,5% |
| Supino | 97,4% | 97,2% |
| Puxada, ajoelhado | 98,4% | 98,2% |
| Flexão | 94,9% | 94,5% |

No começo desta retomada a coincidência era de 81% de frente e 93% de lado. O que foi acertado: os braços afastados do corpo em pé, a dobra do pescoço de lado, as pontas arredondadas dos membros, o pé de base chata, a mão e o polegar com contorno, a posição dos músculos de frente, o glúteo por cima da coxa, o short opaco que vira véu só quando há músculo trabalhando debaixo dele, o cabelo e o contorno na cor de cada parte.

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
| Motor novo, sem nenhum exercício (motor, corpo, desenho, objetos e o gerador do equipamento) | 31,0 kB |
| Motor novo com as 4 âncoras | 41,4 kB (mais o zod, que o app já carrega) |
| Cada exercício novo | cerca de 1,7 kB (medido: 5,1 kB para 3) |

Projeção minha (não medida): com os 90 exercícios, o novo ficaria perto de 180 kB, mais de três vezes o de hoje. Quase metade de cada ficha é texto de fonte, que o app não precisa carregar para desenhar. Proponho duas medidas, a confirmar com medição na etapa 2: tirar os textos de fonte do que vai para o app (eles continuam nos arquivos e nos documentos) e carregar cada exercício só quando for aberto, guardando para uso sem rede.

**Tempo por quadro**, no Chromium com a CPU 4 vezes mais lenta, palco de 360 px (montar o SVG, trocar no palco e forçar o layout):

| Animação | Hoje (média) | Novo, cinza (média) | Novo, cinza (95% dos quadros abaixo de) | SVG de um quadro: hoje / novo |
|---|---|---|---|---|
| Goblet | 4,9 a 6,8 ms | 12,6 a 12,9 ms | 18,9 ms | 14 kB / 51 kB |
| Supino reto | 6,0 a 6,7 ms | 11,8 a 13,2 ms | 19,5 ms | 14 kB / 58 kB |
| Puxada unilateral | 5,6 a 7,1 ms | 19,1 a 20,4 ms | 33,6 ms | 15 kB / 104 kB |
| Flexão | 5,0 a 6,3 ms | 9,9 a 10,4 ms | 14,3 ms | 14 kB / 44 kB |

Esta é a medição com o equipamento realista. Cada faixa junta os modos Técnica e Músculos. A medição oscila alguns milissegundos de uma rodada para outra (numa rodada anterior a puxada chegou a 24 ms de média e 35 ms no pior caso); o que se repete em todas é a proporção: o novo leva de 2 a 3 vezes o tempo do de hoje.

O limite para 60 quadros por segundo é 16,7 ms. O novo fica dentro dele em três das quatro âncoras na média, encosta ou passa no pior caso do goblet e do supino, e a puxada passa sempre. **Isto é um risco real e não está resolvido.** Mais da metade do tempo é só montar o texto do SVG (7 a 12 ms). O plano, em ordem de ganho esperado:

1. Separar o que não se mexe (a coluna da polia, o banco, o colchonete) numa camada desenhada uma vez, e redesenhar só o corpo e o que se move.
2. Guardar o desenho pronto de cada quadro depois da primeira volta do ciclo (o movimento se repete igual).
3. Reduzir o número de pontos de cada contorno onde a forma não muda.

Meta que proponho para a etapa 2: média de até 12 ms e pior caso de até 16 ms nas quatro âncoras, medidos do mesmo jeito. Sem atingir a meta, nenhuma animação nova entra no app.

O que não foi medido: um celular de verdade (só a CPU simulada) e o consumo de memória.

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
13. **Meta de fluidez** da seção 5 e as duas medidas de peso (tirar os textos de fonte do app; carregar cada exercício ao abrir).
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
