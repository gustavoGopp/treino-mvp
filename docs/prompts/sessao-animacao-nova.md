# Prompt: a animação nova (o Boneco, os movimentos, os músculos e os desenhos dos objetos, refeitos com precisão)

> Escrito em 12/11/2026, a pedido do Gustavo, na mesma linha do `sessao-frontend-novo.md`. Aquele prompt refaz as telas e proíbe tocar no Boneco; este é o contrário: refaz **só** as animações e os desenhos dos objetos, e não toca nas telas. As duas sessões podem correr em paralelo, cada uma no seu ramo. Cole o texto abaixo, a partir de "Você vai conduzir", numa sessão nova.

---

Você vai conduzir a sessão da **animação nova** do treino-mvp, um web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada sessão com um guia animado (o "Boneco"), o temporizador de descanso e as sugestões de progressão.

**O pedido do Gustavo (12/11/2026).** Refazer por completo as animações dos exercícios e os desenhos dos objetos (os aparelhos e acessórios que aparecem na cena e os desenhos dos cartões de equipamento), usando as versões de hoje como rascunho e buscando algo **muito mais sofisticado e, principalmente, muito mais preciso**: nas proporções do corpo, nos movimentos, nos músculos, nas medidas dos objetos. Cuidado até os mínimos detalhes.

**Quem é o Gustavo.** É o dono do app. Não é programador nem da área de exercício, anatomia ou design. Fala de produto e de experiência, e decide olhando. Ele aprova cada animação pela folha de contatos. Ele decide o produto; as decisões técnicas são suas, sempre com o motivo e o efeito medido.

**As versões de hoje são rascunho.** Tudo no desenho está liberado: o corpo (hoje um esqueleto de medidas fixas em `src/engine/esqueleto.ts`), a forma dos membros, do tronco, da cabeça, das mãos e dos pés, os músculos (`src/engine/estilo/musculos.ts`), as poses e o ritmo de cada exercício (`src/engine/exercicios/`), as peças da cena (`src/engine/desenho.ts`: halter, torre, cabo, elástico, banco, barra e as demais), as vistas e a câmera, as cores do desenho, os 49 desenhos de `public/equipamento/` e até a técnica de desenho (o SVG gerado por código de hoje ou outra, se a pesquisa mostrar que vale). O que as versões de hoje têm de valioso é o **conteúdo já conferido**: a ficha de cada exercício, a lista de erros, os músculos principais e secundários e o que o Gustavo corrigiu folha a folha. Isso é o ponto de partida, não se joga fora.

**O que não está liberado** são os princípios do `CLAUDE.md`. Em resumo:
- **Precisão vale mais que quantidade, e nada de animação improvisada.** Toda afirmação sobre o corpo, o movimento ou o objeto tem medida e fonte. Animação nova só entra no app depois de aprovada pelo Gustavo na folha. Até lá, o app continua mostrando a aprovada de hoje.
- **Determinístico e testável.** A mesma entrada gera o mesmo quadro. Nada de vídeo, de imagem gerada por modelo nem de movimento "ajustado a olho" sem medida. Toda mudança passa pela regressão visual.
- **Evidência.** Técnica, amplitude e músculos vêm de `docs/pesquisa/` e `docs/pesquisa-v2/`, com selo e fonte. Vídeo é referência visual, nunca fonte de regra. Nada de inventar estudo.
- **Uso na academia.** O desenho precisa ser entendido em 2 segundos, numa tela pequena, com o celular na mão, nos temas claro e escuro, por quem tem daltonismo, e respeitar `prefers-reduced-motion`. Sofisticado não é carregado: detalhe que não ajuda a entender o exercício sai.
- **Funciona sem rede e é leve.** Nenhum pedido externo, nenhum arquivo pesado baixado depois. O peso do pacote e a fluidez no celular simples são medidos antes e depois.
- **O domínio fica fora.** O gerador, as regras e o estado guardado não mudam nesta sessão.

## 0. Antes de começar

1. Confirme onde você está: `git rev-parse --show-toplevel` e `git branch --show-current`. Se o ramo for `main`, pare e crie um ramo novo a partir dela antes de qualquer mudança.
2. Leia o `CLAUDE.md` e o critério de qualidade do guia no `docs/PLANO-MVP.md`.
3. Leia a história do Boneco, para não repetir o que já foi decidido nem perder o que já foi corrigido:
   - `docs/pesquisa/animacoes/README.md` (o ritual de cada animação) e `r4-estilo-do-boneco.md` (a pesquisa do estilo), e as fichas por exercício na mesma pasta;
   - `docs/revisoes/anatomia.md` e `scripts/auditoria/anatomia-regras.ts` (os músculos conferidos; quem "só ajuda");
   - `docs/revisoes/boneco-acabamento/relatorio-auditor.md`, `docs/revisoes/r4/README.md`, `docs/revisoes/auditoria-fable.md` (Parte D: o que o Boneco não mostra bem) e `docs/revisoes/r5-anim/`;
   - `docs/revisoes/catalogo/conferencia/` (o modelo "o que a fonte pede × o que o boneco faz, medido × confere?") e `fila.md`;
   - `docs/revisoes/r4-roteiro-especialista.md` (a rodada com um especialista humano, que ficou pendente);
   - no `docs/backlog.md`, "Do R4", "Do catálogo completo", "Da auditoria independente", "Do redesign, lotes 3 e 5" (os desenhos de equipamento que se confundem) e "Do R5-anim" (os limites de desenho: o polegar, o boneco de bruços visto de frente, os cotovelos da ponte com kettlebell);
   - no `docs/devlog.md`, as entradas do R4, do catálogo, do R5-anim e do redesign (os 49 desenhos, refeitos em 3 rodadas com o Gustavo).
4. Percorra `src/engine/` inteiro, `src/features/guia/Guia.tsx`, `src/features/programa/` (a miniatura e o Worker do Boneco), `scripts/folha-animacao.mjs`, `medir-animacao.mjs`, `aprovar-animacao.mjs`, `tests/motor/`, `tests/visual/linha-de-base/` e `referencia/qa/check-motor.cjs`.
5. Em até 5 linhas, diga ao Gustavo o que entendeu e o plano da etapa 1. Não precisa esperar o ok para pesquisar: a parada obrigatória é no fim da etapa 1.

## 1. Regras de isolamento

- **Ramo próprio.** Nunca faça commit, merge ou push na `main`. A ida para a `main` é só com o ok do Gustavo, por merge sem forçar.
- **Conta.** Só as contas pessoais do Gustavo, nunca a da Futurum. Tudo fica no git, e só no git.
- **Pode alterar:** `src/engine/`, `public/equipamento/`, o bloco do palco e do desenho no `src/styles.css` (as cores e classes do Boneco, não as das telas), `scripts/` de animação e de desenho, `tests/motor/`, `tests/visual/` e a pasta nova `docs/revisoes/animacao-nova/`. Em `src/features/`, só o mínimo para ligar o desenho novo ao palco, à miniatura e ao Worker.
- **Não altere:** `src/domain/`, `src/storage/`, `api/`, as telas (são da sessão do frontend novo), `tests/unit/` das regras, `tests/personas/` e o `CLAUDE.md`.
- **Texto técnico e músculos do exercício** (`src/conteudo/exercicios/`, a lista de principais e secundários): se a pesquisa mostrar que algo está errado ou impreciso, não corrija em silêncio. Anote em `docs/revisoes/animacao-nova/pedidos-ao-conteudo.md`, com a fonte, e leve ao Gustavo como decisão separada. A auditoria de anatomia (`npm run auditoria:anatomia`) tem que continuar fechando: o músculo realçado no desenho é o que o conteúdo diz.
- **Fronteira com a sessão do frontend novo:** ela é dona da moldura (o palco, os controles, os modos na tela); esta é dona do que aparece dentro do palco. Antes de fechar cada etapa, veja o que mudou na `main` (`git fetch origin main` e `git diff`, só leitura).
- **Dados.** Folhas, protótipos e testes usam só as personas fictícias. `privado/` nunca entra.
- **Limite de uso.** Pesquisa em lotes de no máximo 4 subagentes por vez, cada um gravando o resultado em arquivo antes de responder.

## 2. Etapa 1: pesquisa, diagnóstico e direção (termina com parada para o Gustavo)

### 2.1 Pesquisa

Procure nas fontes mais diversas possíveis; o objetivo é chegar ao desenho final com as melhores referências, não com as primeiras. Para cada fonte, registre o status de leitura como em `docs/pesquisa/00-metodo.md`. Os nomes abaixo são pontos de partida para conferir, não fatos: confirme cada um na fonte antes de usar.

- **Proporções do corpo (antropometria):** tabelas públicas de comprimento, largura e circunferência dos segmentos do corpo e das posições dos centros das articulações, para homem e mulher adultos (por exemplo as tabelas clássicas de biomecânica de Winter, Dempster e Drillis e Contini, os levantamentos públicos da NASA e do exército dos EUA). Proporções da mão, do pé, da cabeça, da caixa torácica e da pelve.
- **Como cada articulação se move:** amplitudes normais por articulação (tabelas de referência de goniometria), o ritmo entre o braço e a escápula, o ritmo entre a lombar e a pelve, a coluna por regiões, a rotação do antebraço, o punho, o tornozelo e o apoio do pé.
- **Anatomia dos músculos:** origem, inserção, forma, camadas e como cada músculo muda de forma ao encurtar e ao alongar. Atlas e livros de acesso livre (por exemplo OpenStax, Gray de domínio público, Wikimedia Commons, atlas 3D abertos), com a licença de cada imagem consultada.
- **Biomecânica de cada exercício:** a trajetória da barra, do halter e do cabo, os ângulos nas posições inicial e final, o que muda com a pegada e com a inclinação do banco, o tempo de subida e de descida. Artigos (PubMed, PMC), manuais de associações de treinamento e o que já está em `docs/pesquisa/` e `docs/pesquisa-v2/`.
- **Medidas dos objetos:** normas e fichas técnicas públicas (federações de levantamento para barra, anilhas e banco; fichas de fabricantes para máquinas, polias, bancos reguláveis, kettlebells, elásticos, bolas e fitas de suspensão). Altura, largura, diâmetro da pegada, curso, ângulos de regulagem.
- **Ilustração e animação didática:** como a ilustração médica e os melhores atlas de musculação mostram o músculo em ação; os princípios de animação que servem a um movimento realista (aceleração e desaceleração, arcos, peso, antecipação só onde existe no movimento real); pesquisas sobre o que ajuda a aprender um movimento por animação (ângulo de visão, velocidade, realce, setas).
- **Técnica de desenho no navegador:** bibliotecas e projetos de código aberto de figura articulada, cinemática inversa, músculo paramétrico e desenho vetorial ou 3D leve; modelos musculoesqueléticos abertos; dados abertos de captura de movimento. Registre a licença de cada um e se ela permite o uso num app. Vale também o caminho de continuar com o motor próprio, sem dependência.
- **Produtos de referência:** como os melhores apps e atlas de exercício mostram a execução (só por páginas públicas, artigos, análises e imagens publicadas).
- **X, Reddit, Hacker News e blogs:** críticas de treinadores, fisioterapeutas, ilustradores e animadores sobre o que as animações de exercício costumam errar.

Regras da pesquisa:

- Só páginas públicas. Nada de login, área paga, CAPTCHA ou contorno de bloqueio; se a página não abre, passe para a próxima.
- Não copie desenho, modelo 3D, ilustração nem tela de terceiros. Referência é para aprender a medida e o princípio. Código, modelo ou dado só com licença compatível (MIT, Apache 2.0, ISC, BSD, CC0, CC BY com o crédito); licença "só para pesquisa" ou "não comercial" não serve.
- Sem custo e com poucas dependências: cada dependência nova mostra o peso que soma e o que seria preciso escrever sem ela.
- Evidência com selo e fonte; opinião sua marcada como opinião.
- Subagentes de busca e leitura em modelo mais simples, com `model` explícito e briefing autossuficiente. A síntese é sua.

Registre em `docs/revisoes/animacao-nova/referencias.md`, agrupado por tema (proporções, articulações, músculos, biomecânica por família de exercício, objetos, ilustração e movimento, técnica de desenho, acessibilidade). Meta: pelo menos 60 referências úteis, de pelo menos 6 tipos de fonte, e **nenhuma medida sem fonte**.

### 2.2 Princípios obrigatórios

Estes dois blocos entram como regra do motor novo. A pesquisa pode acrescentar, não tirar.

**A. Tudo tem medida real, declarada em tabela, com fonte**

- **Uma tabela do corpo** (em cm e em graus), em arquivo de dados validado com zod: o comprimento e a espessura de cada segmento, a posição de cada articulação, a amplitude permitida de cada movimento articular. Cada linha com a fonte. O código do desenho lê a tabela; nenhum número do corpo fica solto no código.
- **Uma tabela dos músculos:** para cada músculo desenhado, a origem e a inserção como pontos presos aos ossos, a camada (qual passa por cima de qual) e a regra de forma (como engrossa ao encurtar). Com a fonte.
- **Uma tabela dos objetos:** as medidas reais de cada peça (o comprimento da barra, o diâmetro da anilha, a altura do banco, a largura da pegada, o curso da polia). Com a fonte. O mesmo objeto tem a mesma medida na cena e no desenho do cartão de equipamento.
- **Uma ficha do movimento por exercício:** os ângulos de cada articulação na posição inicial e na final, a trajetória do objeto, o tempo de cada fase, os pontos de contato (o que fica preso no chão, no banco, na barra). Cada linha vem da ficha da técnica, com o selo.
- **Um corpo só, coerente em todas as vistas.** De lado, de frente, de trás e de cima é a mesma pessoa, com as mesmas medidas. Se a proposta tiver mais de um corpo (por exemplo um feminino e um masculino), é decisão do Gustavo, e cada um tem a sua tabela.
- **Conferência automática:** um comando (`npm run conferir:animacao`) que percorre todos os quadros de todas as animações e falha quando: uma proporção sai da tabela; um ângulo passa da amplitude; um pé ou uma mão que deveria estar preso desliza; um objeto atravessa o corpo ou "voa"; um cabo, um elástico ou uma fita muda de comprimento sem motivo; a velocidade dá um salto; a esquerda e a direita divergem num exercício simétrico; o músculo realçado não é o do conteúdo; uma medida de objeto diverge da tabela. O relatório sai por exercício, em cm e graus. Rode ao fim de cada animação.

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

### 2.3 O que entregar no fim da etapa 1

Tudo em `docs/revisoes/animacao-nova/`:

- **`referencias.md`:** a pesquisa, como descrito acima.
- **`diagnostico.md`:**
  - **o corpo de hoje contra as tabelas:** cada medida de `esqueleto.ts` e de `estilo/corpo.ts` ao lado da medida de referência, com a diferença em cm e em porcentagem;
  - **os músculos de hoje contra o atlas:** origem, inserção e forma de cada um;
  - **cada animação aprovada** (confira a contagem; o devlog de 10/11 fala em 90), numa tabela: o que a ficha pede, o que o boneco de hoje faz (medido quadro a quadro) e os problemas à luz dos blocos A e B, com a folha de hoje como imagem;
  - **cada peça da cena e cada um dos 49 desenhos de equipamento** contra a medida real;
  - os problemas em ordem de gravidade × frequência (quantos programas usam o exercício: `docs/revisoes/qualidade/regua.md`).
- **`proposta.md`:**
  - a direção: o corpo, as mãos e os pés, os músculos, o movimento, os objetos, as vistas e a câmera, as cores e o traço, o modo Erros, os rótulos, o quadro parado;
  - a técnica de desenho recomendada, as alternativas descartadas e por quê, com licença, peso no pacote e fluidez medida num celular simples;
  - as tabelas do bloco A, já preenchidas para o corpo e para os exercícios-âncora;
  - o plano: primeiro o corpo e o motor, depois as animações em lotes (pela frequência de uso), depois os objetos dos cartões; quantas folhas por parada;
  - como o app convive com o velho e o novo até o fim (a recomendação e as opções: trocar tudo de uma vez no fim, ou por lote);
  - o destino dos estilos Clássico e Silhueta e do teste de equivalência com o guia original (`tests/motor/equivalencia.spec.ts`, `referencia/`);
  - as decisões que dependem do Gustavo.
- **`prototipos/`:** duas ou três direções, cada uma com **quatro exercícios-âncora** refeitos por inteiro, escolhidos para cobrir os casos difíceis: o agachamento goblet (em pé, de lado, com halter), o supino reto (deitado, com banco), a puxada unilateral na polia (cabo, de trás) e a flexão de braço (chão, corpo livre). Para cada um: a animação rodando numa página HTML, a folha de contatos (os quadros-chave em cada vista, os músculos, a trajetória e os erros), nos temas claro e escuro, no tamanho do palco e no da miniatura, **ao lado da versão de hoje**, e o relatório da conferência automática. Mais **três desenhos de cartão de equipamento** em cada direção (o banco regulável, a estação de polia e os halteres). O Gustavo decide olhando: os protótipos são a parte mais importante da entrega.

Faça commit no ramo desta sessão, com push, e pare. Relate em linguagem simples, em poucas linhas: as direções, a sua recomendação e por quê, o que cada uma custa (tempo, peso, risco) e os caminhos completos dos protótipos e das folhas. Espere a escolha dele.

## 3. Etapa 2: o corpo e o motor (só depois do sim do Gustavo)

- Construa o corpo novo, os músculos e as peças de cena a partir das tabelas, ao lado do motor de hoje (o app continua mostrando o de hoje).
- Feche os quatro exercícios-âncora na direção escolhida, com a conferência automática limpa.
- **Revisão independente:** dois subagentes no modelo mais capaz, um no papel de anatomista e outro no de treinador, só com as folhas, as tabelas e os blocos A e B, sem a sua conclusão no briefing. Atualize o roteiro do especialista humano (`docs/revisoes/r4-roteiro-especialista.md`) para o corpo novo e ofereça a rodada ao Gustavo.
- Meça a fluidez (o tempo de cada quadro num celular simples simulado, o bloqueio da tela, o Lighthouse do guia) e o peso do pacote contra os de hoje (`docs/revisoes/redesign/medidas.md`, `tests/e2e/orcamento.spec.ts`).
- **Pare** e mostre ao Gustavo as quatro âncoras prontas. O corpo só é dado como fechado com o ok dele; mudar o corpo depois refaz todas as folhas.

## 4. Etapa 3: as animações e os objetos, em lotes

- **Uma animação por vez,** na ordem aprovada, pelo ritual: a ficha do movimento preenchida a partir da ficha da técnica; as poses; a conferência automática limpa; a conferência escrita "o que a fonte pede × o que o boneco faz (medido) × confere?"; a folha de contatos ao lado da de hoje.
- **Nada do que o Gustavo já corrigiu se perde:** antes de cada animação, releia as correções dela nas folhas e no devlog (por exemplo os cotovelos apoiados na ponte com halter) e confira que a nova as respeita.
- **Pare a cada lote de folhas** (o tamanho combinado na proposta) e espere a aprovação, folha a folha, com nada pré-marcado. Só então a animação é aprovada e a linha de base nova é gravada. As linhas de base de hoje só são substituídas com a aprovação.
- **Os objetos dos cartões:** os 49 desenhos de `public/equipamento/` refeitos a partir da mesma tabela de medidas das peças de cena, em lotes, com uma folha de comparação (hoje × novo, no tamanho do cartão e ampliado) e o teste de quem se confunde com quem.
- **Os exercícios que hoje são cartão de texto continuam cartão de texto.** Animar exercício novo é outro marco; anote na fila o que o corpo novo facilita.
- **A cada lote:** `npm run conferir:animacao`, `npm run check`, `npm run test:e2e`, `npm run auditoria:anatomia`, e um commit pequeno, em pt-BR e no imperativo, por animação.
- **Critério de pronto:**
  - todas as animações hoje aprovadas refeitas e aprovadas pelo Gustavo, e os 49 desenhos também;
  - a conferência automática sem nenhuma exceção não justificada (cada exceção escrita, com o motivo e o ok dele);
  - os 20 cuidados conferidos, animação por animação, numa tabela em `docs/revisoes/animacao-nova/qa.md`;
  - nenhuma tabela com medida sem fonte;
  - `npm run check`, `npm run test:e2e` e `npm run auditoria` limpos; o gerador e as personas sem nenhuma mudança (`git diff origin/main -- src/domain` vazio);
  - fluidez e peso iguais ou melhores que os de hoje, ou a diferença mostrada e aceita.
- **Fechamento:** a entrada no `docs/devlog.md` (o antes e o depois em imagem ou GIF, a tabela de medidas, o rascunho de post), as pendências no `docs/backlog.md`, os pedidos ao conteúdo, e o resumo final para o Gustavo. Pare para a revisão dele; a junção com a `main` só com o ok, avisando para exportar os dados do app antes.

## 5. Como falar com o Gustavo

Português, sem jargão; termo técnico inevitável (de anatomia, inclusive), explicado em uma frase. Evidência sempre: a folha, a medida em cm ou em graus, o caminho do arquivo. Sempre o antes ao lado do depois. Uma decisão por vez, com a sua recomendação e nada pré-marcado.

## 6. O que não fazer

- Não ponha no app nenhuma animação nem desenho sem a aprovação dele na folha.
- Não ajuste pose "a olho" para ficar bonito contra a medida; se a medida parece errada, volte à fonte.
- Não use vídeo, imagem gerada por modelo, nem desenho, modelo 3D ou captura de movimento de terceiros sem licença compatível.
- Não acrescente detalhe que piora a leitura em 2 segundos na tela pequena.
- Não mude o gerador, as regras, o estado guardado nem as telas.
- Não corrija texto técnico nem lista de músculos por conta própria: é pedido ao conteúdo, com fonte.
- Não anime exercício que hoje é cartão de texto.
