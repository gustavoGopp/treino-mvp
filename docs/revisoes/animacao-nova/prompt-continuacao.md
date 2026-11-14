# Prompt: continuar a animação nova (fechar o corpo e seguir para os lotes)

> Escrito em 14/11/2026, a pedido do Gustavo, no fim da sessão que fez a etapa 1 no ramo `claude/loving-hamilton-c4ji83`. Ele deu o ok para seguir ("dou o ok, mas faça o prompt para continuarmos de uma nova sessão"). O texto abaixo da linha é o prompt inteiro: a nova sessão deve lê-lo e segui-lo.

---

Você vai continuar a sessão da **animação nova** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência e conduz cada treino com um guia animado de execução (o "Boneco").

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e **decide olhando**: mostre a imagem, o antes ao lado do depois, e uma decisão por vez, com a sua recomendação e nada pré-marcado. Explique em pt-BR simples, sem jargão; termo técnico inevitável, explicado em uma frase. Ele responde curto ("pode ser", "ficou como eu quero") e muda de ideia quando vê.

**O que esta frente faz.** Refaz por completo as animações dos exercícios e os desenhos dos objetos, para ficarem mais sofisticados e, acima de tudo, mais precisos: proporções do corpo, movimentos, músculos e medidas dos objetos, tudo com medida e fonte. O que as versões de hoje têm de valioso é o conteúdo já conferido (a ficha de cada exercício, os erros, os músculos, o que o Gustavo corrigiu folha a folha): isso é ponto de partida, não se joga fora.

**O que não está liberado** são os princípios do `CLAUDE.md`: precisão acima de quantidade e nada de animação improvisada; determinístico e testável (sem vídeo, sem imagem gerada por modelo, sem ajuste "a olho"); evidência com selo e fonte; uso na academia (entendido em 2 segundos, tela pequena, temas claro e escuro, daltonismo, `prefers-reduced-motion`); sem rede e leve, com peso e fluidez medidos; e o domínio fica fora (o gerador, as regras e o estado guardado não mudam).

## 0. Antes de começar

1. Confirme onde está: `git rev-parse --show-toplevel` e `git branch --show-current`. Nunca trabalhe na `main`.
2. Traga o trabalho da sessão anterior para o seu ramo:
   - `git fetch origin claude/loving-hamilton-c4ji83`
   - `git merge origin/claude/loving-hamilton-c4ji83`
3. Traga a `main` para o seu ramo (nunca o contrário): `git fetch origin main` e `git merge origin/main`. A `main` mudou bastante desde que aquele ramo nasceu: o visual do app foi trocado, o `src/styles.css` foi quase todo reescrito e o Boneco animado passou a aparecer também na tela do treino (`src/features/treino/PalcoTreino.tsx`), além do guia (`src/features/guia/Guia.tsx`). Ela não tocou `src/engine/`, `public/equipamento/`, `tests/motor/` nem `tests/visual/`. O ramo anterior não mexeu no `src/styles.css`; o conflito esperado é pequeno (a linha do comando `conferir:animacao` no `package.json`). Depois do merge, rode `npm ci` e `npm run check`.
4. Leia o `CLAUDE.md` e, nesta ordem, **olhando as imagens**:
   - `docs/revisoes/animacao-nova/proposta.md` (comece pela seção 0: o retorno do Gustavo; depois as seções 2, 5 e 9);
   - `docs/revisoes/animacao-nova/estado-da-sessao.md`;
   - `docs/revisoes/boneco-desenho/decisao.md` (a ficha do desenho aprovado) e `final/prancha-cinza.png` e `prancha-pele.png`;
   - em `docs/revisoes/animacao-nova/prototipos/`: `conferencia-do-desenho-cinza.png`, as quatro `folha-*.png`, `erros.png`, `equipamento-realista.png`, `conferencia.md` e `medidas.json`; abra também `index.html` no navegador;
   - `docs/revisoes/animacao-nova/tabelas.md`, `diagnostico.md` e `referencias.md` (consulta).
5. Percorra o motor novo: `src/engine/novo/` (`esqueleto.ts`, `boneco.ts`, `equipamento.ts`, `cena.ts`, `conferir.ts`, `movimento.ts`, `pecas.ts`, `exercicios/`, `dados/`, `realista/`) e os scripts em `scripts/animacao-nova/`.
6. Em até 5 linhas, diga ao Gustavo o que entendeu e o plano. Não precisa esperar outro ok para começar: ele já deu. As paradas obrigatórias estão nas seções 5 e 6.

## 1. Regras de isolamento

- **Ramo próprio.** Nunca faça commit, merge ou push na `main`. A ida para a `main` é só com o ok do Gustavo, por merge sem forçar, avisando para ele exportar os dados do app antes.
- **Conta.** Só as contas pessoais do Gustavo. Tudo fica no git, e só no git. Nunca abra pull request sem ele pedir.
- **Pode alterar:** `src/engine/`, `public/equipamento/`, o bloco do palco e do desenho no `src/styles.css` (as cores e classes do Boneco, não as das telas), `scripts/` de animação e de desenho (inclusive `scripts/desenhos-equipamento/`), `tests/motor/`, `tests/visual/` e `docs/revisoes/animacao-nova/`. Em `src/features/`, só o mínimo para ligar o desenho novo ao palco (os dois: guia e treino), à miniatura e ao Worker. O `docs/revisoes/r4-roteiro-especialista.md` pode ser atualizado para o corpo novo (seção 5). O `docs/devlog.md` e o `docs/backlog.md`, só no fechamento (seção 6).
- **Não altere:** `src/domain/`, `src/storage/`, `api/`, as telas (são de outra frente), `tests/unit/` das regras, `tests/personas/` e o `CLAUDE.md`.
- **Texto técnico e músculos do exercício** (`src/conteudo/exercicios/`, a lista de principais e secundários): não corrija em silêncio. Anote em `docs/revisoes/animacao-nova/pedidos-ao-conteudo.md`, com a fonte, e leve ao Gustavo como decisão separada. `npm run auditoria:anatomia` tem que continuar fechando.
- **Fronteira com a frente do frontend:** ela é dona da moldura (o palco, os controles, os modos na tela); esta é dona do que aparece dentro do palco. Antes de fechar cada etapa, veja o que mudou na `main` (`git fetch origin main` e `git diff`, só leitura).
- **Dados.** Folhas, protótipos e testes usam só as personas fictícias. `privado/` nunca entra. Nenhum e-mail nem dado pessoal no repositório (`tests/repo/privacidade.test.ts`; ele também estoura o tempo com arquivos de texto enormes numa linha só, como uma malha em JSON).
- **Pesquisa.** Só páginas públicas; nada de login, área paga, CAPTCHA ou contorno de bloqueio. Não copie desenho, modelo 3D, ilustração nem tela de terceiros. Código, modelo ou dado só com licença compatível (MIT, Apache 2.0, ISC, BSD, CC0, CC BY com crédito); "só para pesquisa" e "não comercial" não entram. Sem custo e com poucas dependências.
- **Limite de uso.** Subagentes em lotes de no máximo 4 por vez, cada um gravando o resultado em arquivo antes de responder. Leitura e busca em modelo mais simples, com o modelo dito no pedido; a síntese é sua.
- **Commits** pequenos, em pt-BR, no imperativo. Push só no ramo desta sessão.

## 2. Princípios obrigatórios (valem como regra do motor novo)

**A. Tudo tem medida real, declarada em tabela, com fonte**

- **Uma tabela do corpo** (em cm e em graus), em arquivo de dados validado com zod: o comprimento e a espessura de cada segmento, a posição de cada articulação, a amplitude permitida de cada movimento articular. Cada linha com a fonte. O código do desenho lê a tabela; nenhum número do corpo fica solto no código.
- **Uma tabela dos músculos:** para cada músculo desenhado, a origem e a inserção como pontos presos aos ossos, a camada (qual passa por cima de qual) e a regra de forma (como engrossa ao encurtar). Com a fonte.
- **Uma tabela dos objetos:** as medidas reais de cada peça (o comprimento da barra, o diâmetro da anilha, a altura do banco, a largura da pegada, o curso da polia). Com a fonte. O mesmo objeto tem a mesma medida na cena e no desenho do cartão de equipamento.
- **Uma ficha do movimento por exercício:** os ângulos de cada articulação na posição inicial e na final, a trajetória do objeto, o tempo de cada fase, os pontos de contato (o que fica preso no chão, no banco, na barra). Cada linha vem da ficha da técnica, com o selo.
- **Um corpo só, coerente em todas as vistas.** De lado, de frente, de trás e de cima é a mesma pessoa, com as mesmas medidas. Mais de um corpo (por exemplo um feminino e um masculino) é decisão do Gustavo, e cada um tem a sua tabela.
- **Conferência automática:** `npm run conferir:animacao` percorre todos os quadros de todas as animações e falha quando: uma proporção sai da tabela; um ângulo passa da amplitude; um pé ou uma mão que deveria estar preso desliza; um objeto atravessa o corpo ou "voa"; um cabo, um elástico ou uma fita muda de comprimento sem motivo; a velocidade dá um salto; a esquerda e a direita divergem num exercício simétrico; o músculo realçado não é o do conteúdo; uma medida de objeto diverge da tabela. O relatório sai por exercício, em cm e graus. Rode ao fim de cada animação.

**B. Vinte cuidados para a animação não parecer improvisada**

1. O movimento nasce nas articulações certas, na ordem certa (a escápula acompanha o braço; a pelve acompanha a lombar; o joelho segue a ponta do pé).
2. Nenhuma articulação dobra para onde não dobra, nem além do que dobra.
3. O ritmo é o do exercício: a descida controlada e a subida mais rápida onde a ficha pede, com aceleração e desaceleração, sem movimento de robô nem de mola.
4. O peso aparece: o corpo se equilibra sobre os pés, o halter pende na vertical, o cabo fica reto e esticado, o elástico afina ao esticar.
5. Os contatos são firmes: a mão fecha em volta da barra com o polegar no lugar, o pé fica inteiro no chão, as costas encostam no banco onde devem encostar.
6. A mão e o pé são desenhados de verdade (dedos, polegar, calcanhar), na medida em que a pegada e o apoio fazem parte da técnica.
7. A cabeça e o olhar seguem a técnica (o pescoço neutro, sem cabeça solta).
8. O músculo está no lugar certo, com a forma certa, preso aos ossos certos, e muda de forma com o movimento.
9. Principal, secundário e "só ajuda" se distinguem sem depender só da cor (daltonismo), e a legenda diz o mesmo que o conteúdo.
10. A vista padrão de cada modo é a que mostra melhor o que aquele modo ensina, escolhida por medida (quanto do movimento e do músculo fica visível), não por hábito.
11. Nada importante fica escondido atrás do próprio corpo ou do aparelho; quando não há como, uma segunda vista ou um corte resolve.
12. O objeto é reconhecível por quem nunca o viu, na cena e no cartão, e não se confunde com o vizinho (supino × desenvolvimento, extensora × flexora, smith × rack).
13. O objeto funciona: a polia gira para o lado certo, a pilha de pesos sobe quando o cabo é puxado, o banco inclina no eixo real, a barra entra no suporte.
14. O erro aparece como erro de verdade, medido contra o certo, no instante em que a diferença é maior; erro de ritmo é mostrado em movimento.
15. Rótulos e setas ficam fora do corpo, não se sobrepõem e somem quando não ajudam.
16. Um traço só: a mesma espessura de linha, o mesmo nível de detalhe e a mesma luz no corpo, nos músculos e nos objetos, em todas as animações.
17. Legível no tamanho da miniatura, a 320 px e sob a luz forte da academia, nos temas claro e escuro, com contraste conferido.
18. O quadro parado também ensina: com `prefers-reduced-motion`, os quadros-chave bastam para entender o exercício.
19. O ciclo fecha sem tranco: o último quadro emenda no primeiro.
20. Cada detalhe é conferido a olho na folha em tamanho grande, por você e por um revisor independente, além da conferência automática.

## 3. O que já está decidido (não reabra)

| Decisão | O que ele disse, e quando |
|---|---|
| O desenho do Boneco: o **cinza** com as linhas do corpo é o padrão e o **cor de pele** (short, tênis, cabelo) é opção na configuração | "pode ser 1.1 e 10.1. Vamos deixar esses 2 como opções para a pessoa escolher na configuração e o cinza como default" (13/11, na sessão do desenho; ficha em `docs/revisoes/boneco-desenho/decisao.md`) |
| A técnica: motor próprio em SVG, com o corpo em seções tiradas dos perfis desenhados à mão | recomendada pela sessão do desenho; o motor reproduz as pranchas em 97 a 99% (medido por `scripts/animacao-nova/conferir-desenho.mjs`) |
| O modo Erros: só a parte que erra em vermelho, a linha do erro, a linha tracejada do certo e o nome fora do corpo | "PNG está funcionando agora" (13/11), olhando `prototipos/erros.png` |
| A pegada do goblet em concha | "pode ficar um pouco mais natural, mas já ficou bem melhor" (13/11): está aceita, com espaço para refinar |
| O equipamento: partir dos cartões de hoje, com aquele realismo, para a pessoa reconhecer o aparelho na academia. Os 49 cartões de hoje ficam; o equipamento das cenas sai do mesmo gerador (`src/engine/novo/realista/base.mjs`) com as medidas da tabela | "eu quero aquela realidade [...] que a pessoa chega na academia, olha e realmente parece com aquilo" (13/11); "sim, pode seguir com o equipamento realista e refazer a polia" (13/11); "ficou como eu quero" (14/11) |
| Seguir para a próxima etapa | "dou o ok" (14/11) |

Lições que custaram caro nesta frente, para não repetir:

- **Primeiro o desenho, depois a técnica.** Três corpos feitos a partir da técnica foram recusados (manequim de fórmula, malha realista, quadro de oito estilos).
- **"Igual ao aprovado" se mede, não se afirma.** O Gustavo avisou que o desenho do motor não estava igual; a comparação medida mostrou 81% de frente. Antes de dizer que algo reproduz o aprovado, rode a comparação e mostre a imagem.
- **Diga o que não ficou bom, sem ele perguntar.** Ele confia mais quando o relato traz os pontos fracos junto.
- **Ele escreve no meio do trabalho.** Responda em uma linha e siga; mantenha-o informado em frases curtas enquanto trabalha.

## 4. O que está em aberto (pergunte, uma por vez, com imagem e recomendação)

Estão na seção 9 da `proposta.md`, com a recomendação da sessão anterior. Nenhuma foi respondida ainda:

1. As cinco diferenças entre o motor e as pranchas (pé de frente com a medida real de 9,9 cm contra 12,7 cm do desenho; mão solta com 18,4 cm nas duas vistas; polegar no punho fechado; pé na flexão; perna do outro lado de lado).
2. As vistas novas (de frente, de cima e de trás fora da pose em pé): estão boas o bastante? Pontos fracos conhecidos: a mão espalmada vista de cima ficou tosca; a dobra do pescoço aparece demais de cima; no agachamento de frente o músculo da coxa fica pequeno; na puxada de trás o corpo se mistura com a coluna.
3. Da sessão do desenho: a cor do músculo secundário (laranja no cinza, tom claro no cor de pele); o short no tema escuro (contraste de 1,2 para 1); um tom de pele ou vários; um corpo só ou um segundo; a bolinha da junta-chave; o estilo Silhueta.
4. O custo de memória da animação (de 6 a 13 MB enquanto uma animação está na tela; conta feita, não medida no aparelho) e a primeira volta da puxada, que ainda pode perder quadros num celular lento.
5. As medidas provisórias (13 do corpo e 16 dos objetos, marcadas em `tabelas.md`).
6. Os músculos que o desenho não separa (as três porções do deltoide, o peitoral de cima, as porções do trapézio, romboides, redondo maior, eretores): o guia de hoje desenha essas porções.
7. O corpo de referência: homem, IMC normal, 175,8 cm (ANSUR II).

## 5. O que falta para fechar o corpo e o motor (termina com parada para o Gustavo)

Feito na sessão anterior: o corpo, o esqueleto, as tabelas, as quatro âncoras (goblet, supino reto, puxada unilateral, flexão), a conferência automática sem falha, o equipamento realista dessas quatro, e a fluidez (de 2 a 5 ms por quadro da segunda volta em diante, com a CPU 4 vezes mais lenta; o guia de hoje leva de 5 a 7,5 ms).

Falta:

- **Acertos de desenho já conhecidos:** a mão espalmada vista de cima; a dobra do pescoço vista de cima; a sombra do banco na vista de cima (aparece como mancha atrás do corpo); o nome do erro pequeno nas cenas largas; os rótulos de técnica ("joelho na direção do pé" e outros), que o novo ainda não tem, fora do corpo; a pegada do goblet "um pouco mais natural".
- **A tabela dos músculos** (bloco A): as 16 formas do desenho foram desenhadas à mão e ainda não foram conferidas contra o atlas (`pesquisa/03`), nem têm origem, inserção e camada declaradas. Decida com o Gustavo as porções que faltam (item 6 da seção 4).
- **Revisão independente:** dois subagentes no modelo mais capaz, um no papel de anatomista e outro no de treinador, só com as folhas, as tabelas e os blocos A e B, sem a sua conclusão no briefing. Atualize `docs/revisoes/r4-roteiro-especialista.md` para o corpo novo e ofereça a rodada com um especialista humano ao Gustavo.
- **Medidas que faltam:** o bloqueio da tela e o Lighthouse do guia, e o peso do pacote contra os de hoje (`docs/revisoes/redesign/medidas.md`, `tests/e2e/orcamento.spec.ts`); se houver como, um celular de verdade. As duas medidas de peso propostas (tirar os textos de fonte do que vai para o app; carregar cada exercício ao abrir) precisam de medição.
- **Fonte para as medidas provisórias,** ou a decisão do Gustavo caso a caso.
- **Pare** e mostre ao Gustavo as quatro âncoras prontas, cada uma na sua folha ao lado da de hoje. O corpo só é dado como fechado com o ok dele; mudar o corpo depois refaz todas as folhas.

## 6. As animações e os objetos, em lotes (só depois do corpo fechado)

- **Como o velho e o novo convivem:** o motor novo fica em `src/engine/novo/` e o de hoje não muda. O app escolhe por exercício: usa o novo só para o exercício refeito **e aprovado pelo Gustavo na folha**; para os outros, o de hoje. A lista começa vazia. Ligue nos dois palcos (`Guia.tsx` e `PalcoTreino.tsx`), na miniatura e no Worker, com o mínimo de mudança. A escolha entre cinza e cor de pele entra na preferência de estilo que já existe. Para a animação, use `svgAnimado` (guarda o desenho pronto de cada instante); para folhas e testes, `svgDaCena`.
- **Uma animação por vez,** na ordem da seção 6 da `proposta.md` (por reaproveitamento de cenas; se o Gustavo preferir por frequência de uso, meça com o gerador sobre as personas), pelo ritual: a ficha do movimento preenchida a partir da ficha da técnica; as poses; a conferência automática limpa; a conferência escrita "o que a fonte pede × o que o boneco faz (medido) × confere?"; a folha de contatos ao lado da de hoje.
- **Nada do que o Gustavo já corrigiu se perde:** antes de cada animação, releia as correções dela (`docs/revisoes/animacao-nova/correcoes-ja-feitas.md`, as folhas e o devlog) e confira que a nova as respeita.
- **Pare a cada lote de folhas** e espere a aprovação, folha a folha, com nada pré-marcado. Só então a animação é aprovada, entra na lista do app e a linha de base nova é gravada em `tests/visual/`. As linhas de base de hoje só são substituídas com a aprovação.
- **O equipamento:** cada peça nova de cena (banco regulável, barra fixa, kettlebell, elástico, fita de suspensão, bola e as demais) é desenhada com o gerador realista, a partir do cartão de hoje dessa peça, com as medidas reais na tabela de objetos. Os cartões de hoje ficam; os que o diagnóstico mostrou fora de medida (máquinas de 30% a 60% mais estreitas que as fichas dos fabricantes) ou que se confundem a 96 px são refeitos no mesmo gerador, em lotes, com uma folha de comparação (hoje × novo, no tamanho do cartão e ampliado) e o teste de quem se confunde com quem. Depois de mexer no gerador, regere os 49 cartões e confira que só mudou o que era para mudar.
- **Os exercícios que hoje são cartão de texto continuam cartão de texto.**
- **Clássico e Silhueta:** nada muda neles enquanto houver exercício no motor de hoje; a proposta (seção 8) é tirá-los, com o teste de equivalência, quando o último lote for aprovado. É decisão do Gustavo.
- **A cada lote:** `npm run conferir:animacao`, `npm run check`, `npm run test:e2e`, `npm run auditoria:anatomia`, e um commit pequeno por animação.
- **Critério de pronto:** todas as animações hoje aprovadas refeitas e aprovadas pelo Gustavo; a conferência automática sem exceção não justificada (cada exceção escrita, com o motivo e o ok dele); os 20 cuidados conferidos, animação por animação, numa tabela em `docs/revisoes/animacao-nova/qa.md`; nenhuma tabela com medida sem fonte; `npm run check`, `npm run test:e2e` e `npm run auditoria` limpos; o gerador e as personas sem nenhuma mudança (`git diff origin/main -- src/domain` vazio); fluidez e peso iguais ou melhores que os de hoje, ou a diferença mostrada e aceita.
- **Fechamento:** a entrada no `docs/devlog.md` (o antes e o depois em imagem ou GIF, a tabela de medidas, o rascunho de post), as pendências no `docs/backlog.md`, os pedidos ao conteúdo, e o resumo final para o Gustavo. Pare para a revisão dele; a junção com a `main` só com o ok.

## 7. Comandos

- `npm run conferir:animacao`: a conferência automática das animações novas (relatório em `prototipos/conferencia.md`).
- `node scripts/animacao-nova/conferir-desenho.mjs [cinza|pele]`: o aprovado, o do motor e a diferença, com a porcentagem de coincidência.
- `node scripts/animacao-nova/prototipos.mjs [so-pagina|so-folhas|so-erros|so-medidas]`: a página animada, as folhas ao lado das de hoje, a folha dos erros e as medidas de peso e de tempo por quadro.
- `node scripts/animacao-nova/cena-realista.mjs`: o equipamento das cenas, peças simples ao lado do realista.
- `node scripts/animacao-nova/tabelas-md.mjs`: regenera `tabelas.md` dos arquivos de dados.
- `node scripts/desenhos-equipamento/todos.mjs <pasta de saída das folhas>`: regenera os 49 cartões em `public/equipamento/` (passe uma pasta de rascunho para as folhas, para não escrever em `docs/img/`).
- `npm run check`, `npm run test:e2e`, `npm run auditoria:anatomia`.

A medição de tempo por quadro oscila alguns milissegundos de uma rodada para outra: compare faixas, não um número só.

## 8. O que não fazer

- Não ponha no app nenhuma animação nem desenho sem a aprovação dele na folha.
- Não ajuste pose "a olho" para ficar bonito contra a medida; se a medida parece errada, volte à fonte.
- Não use vídeo, imagem gerada por modelo, nem desenho, modelo 3D ou captura de movimento de terceiros sem licença compatível.
- Não acrescente detalhe que piora a leitura em 2 segundos na tela pequena.
- Não mude o gerador, as regras, o estado guardado nem as telas.
- Não corrija texto técnico nem lista de músculos por conta própria: é pedido ao conteúdo, com fonte.
- Não anime exercício que hoje é cartão de texto.
- Não mude o desenho aprovado do Boneco nem o nível de realismo do equipamento sem mostrar a ele, lado a lado, e ter o ok.
