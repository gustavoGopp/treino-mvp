# Backlog (fora do MVP)

Ideias e requisitos para depois do MVP. Nada aqui entra sem passar pelo plano.

- **Nutrição.** Precisa suportar restrições alimentares religiosas e culturais (ex.: kashrut, halal) como **regra dura**: separação carne × laticínios, certificação de industrializados, inclusive suplementos lácteos.
- Login e sincronização na nuvem.
- Pagamentos.
- App nativo.
- Recursos sociais.
- Integração com relógios.
- Outros objetivos: emagrecimento, força máxima, corrida.
- Treinador humano.
- Cardio prescrito (no MVP fica só como texto informativo).
- Deload automático (no MVP o app só sugere).
- **Triagem com perguntas de acompanhamento** (como no PAR-Q+ oficial e no ACSM 2015), em vez de bloquear em qualquer "sim". Só depois de confirmar a licença do PAR-Q+ e com revisão de um CREF. Motivo e números em `docs/pesquisa/09-decisoes-m3.md`, seção 8.


## Pendências do lado do Gustavo
- **Antes de mandar o link a alguém (R5c, 07/11/2026; detalhes no devlog, "R5c"):**
  - **Teto de gasto:** confirmado em 08/11 (saldo de US$ 4,97, recarga automática desligada). Manter a recarga desligada; ao ligar a foto, comprar créditos conforme o uso.
  - **Ligar a foto, quando quiser:** um código de convite por pessoa em `CONVITES` e `VITE_FOTO=ligada` na Vercel, e um novo deploy. Até lá, a foto fica desligada (decisão de 08/11).
  - *(Opcional)* **Quem responde e o contato:** `VITE_RESPONSAVEL` e `VITE_CONTATO_EMAIL` na Vercel. Sem eles, os termos apontam para quem mandou o link. Ficam fora do repositório de propósito.
  - A revisão por um advogado foi **dispensada** pelo Gustavo em 08/11.
  - **No iPhone, uma vez:** abrir o link no Safari, ver o aviso de instalar, instalar e conferir se o app instalado começa vazio (o texto já diz "pode começar vazio" e manda exportar antes; não achei documento da Apple que confirme) e se o ícone novo aparece.
- **Depois do R5a (opcional):** exportar os dados no celular ("Meus dados" → "Guardar uma cópia") e rodar, no computador, `npm run ler-export -- caminho/do/arquivo.json`. Só os números agregados vão para o devlog, se você quiser; o arquivo nunca entra no git. Eles decidem os gatilhos da semana leve e do "estagnado".
- **Levar a `main` nova para o redesign.** A sessão de qualidade dos treinos foi para a `main` em 06/11 (`6cb49d5`). Colar `prompts/recado-redesign-qualidade-treinos.md` na sessão do redesign visual: o merge não tem conflito, e só o `fontes.json` precisa ser regerado.
- **Sessão de desenvolvimento 2:** colar `prompts/sessao-desenvolvimento-2.md` numa sessão nova (a 1ª, `prompts/sessao-desenvolvimento.md`, conduziu os marcos do R5, todos feitos). Ela conduz os pacotes D1 (o app diz o que faz), D2 (nada se perde), D3 (os ajustes do treino com medida) e D4 (mais leve, sem o motor antigo), um de cada vez, parando ao fim de cada um para a sua revisão. A ordem é a recomendada em 19/11; dá para mudar antes de colar.
- **Chave da Anthropic.** Confirmar que a chave e os convites estão no projeto `treino-mvp` da Vercel, o que atende `treino-mvp-sigma.vercel.app`.
- **Projetos extras na Vercel.** Avaliar apagar `treino-mvp-huks` e `treino-mvp-yej6`, criados em 31/10/2026. Eles repetem cada deploy.
- **Cronometrar o cadastro no celular (critério 1, R1).** O teste automático conta 13 toques e 0 caractere para quem não tem condição nenhuma, desde 21/11/2026 contando a tela de equipamento, nos quatro atalhos (lote M1); falta a sua medição de tempo no celular, uma vez (meta: até 1 min).
- **Confirmar a menor anilha da sua academia (T8).** Sem resposta, o app usa 2 kg (opinião).
- **Criar o banco do limite compartilhado** (opcional): na Vercel, Marketplace → Upstash for Redis (plano grátis), ligado ao projeto `treino-mvp`. Ele cria `KV_REST_API_URL` e `KV_REST_API_TOKEN`, e o código do R5c (`api/_lib/limite.ts`) passa a usar o banco sozinho. Sem o banco, vale o contador em memória por instância.

## Decididos no replanejamento de 01/11/2026
Detalhes em `planejamento/2026-11-diagnostico.md`, `PLANO-MVP.md` e `pesquisa-v2/`.
- **Não fazer agora:**
  - foto do corpo e biotipo (sem evidência de benefício e com dado sensível);
  - idade, peso corporal, sexo e altura no perfil (nenhuma regra os usa).
- **De lado por decisão do Gustavo:** revisão por profissional de Educação Física e triagem com perguntas de acompanhamento.
- **Depois do uso real (R5):**
  - as animações que faltam, por frequência; 14 delas nunca aparecem em programa nenhum;
  - desenhos novos de equipamento;
  - termos de uso e formulário de opinião, se o app for aberto a outras pessoas.
- **Cartões de texto dos exercícios antigos sem animação** (R0c): os 29 novos já têm cartão; os ~40 que vinham de antes (cadeira extensora, ponte, leg press…) ainda mostram "animação em breve" com os músculos. Escrever a partir de uma ficha de técnica, como os novos.
- **Vários locais (R1b), para depois:**
  - apagar um local (hoje dá para renomear, editar o equipamento e trocar o principal, mas não apagar);
  - no local com mais equipamento que o principal, o dia só troca o que não é possível; não acrescenta a vaga que o principal não tinha (ex.: a extensora na academia do bairro do Bruno). Ideia: oferecer "aqui dá para fazer também…";
  - a calibração na volta de uma pausa de mais de 26 semanas depende das pausas detectadas sozinhas (R2).
- **Esteira no inventário antigo (R1):** a esteira saiu da lista de treino, mas fica no inventário de quem já a tinha marcado, sem efeito no programa, para o app não apagar um dado sem a pessoa pedir. A decidir: tirá-la quando a pessoa salvar o equipamento de novo.
- **Lacunas do gerador para avançados com academia completa:** entram no R0 (aproveitar o equipamento).
- **Boneco mais humano, estética do formulário, cadastro mais rápido, peso inicial e acompanhamento:** viraram os marcos R1, R2 e R4 do `PLANO-MVP.md`.

## Do R2 (02/11/2026)
- **Tabela de Nuzzo 2024 (repetições × % da carga máxima):** com o texto completo, a calibração poderia usá-la no lugar da fórmula de Brzycki (pesquisa-v2/07, seção 9).
- **Acima de 65 anos** a pausa pesa mais e a manutenção pede mais, mas o app não pergunta a idade (decisão do Gustavo: fica fora).
- **Gráfico da evolução:** hoje é uma lista da melhor série de cada treino; um gráfico simples pode entrar depois do uso real (R3).

## Do R4 (02/11/2026)
- **Boneco no estilo A em todas as animações:** feito no próprio R4, a pedido do Gustavo (`devlog.md`, R4, continuação). Falta a rodada com o especialista (`revisoes/r4-roteiro-especialista.md`); os ajustes que ela pedir mudam a linha de base `estilo-a.json`, com nova aprovação.
- **Leveza do B no A:** o B foi o mais agradável de ver. Perguntar ao especialista se vale um contorno mais fino ou menos linhas no A.
- **Face pull, vista de cima:** corrigido no Boneco e na Silhueta (corda e cabo mais leves, rótulo fora da caixa da fase). No Clássico fica como no guia original.
- **Enquadramento da puxada unilateral:** a câmera inclui a torre inteira, e o corpo ocupa um quarto do palco. Aproximar só o corpo ajudou pouco no teste do R4 (a mão vai lá em cima); reavaliar com o especialista.
- **Retorno do Gustavo sobre o Boneco publicado (02/11):** o músculo que trabalha ficou muito bom, e a vista de trás da puxada também; ele prefere o Boneco. O ponto fraco é **a clareza do movimento** ("deixar mais nítido o que ele está fazendo"): fica para a sessão de design.
- **Próximas sessões, nesta ordem** (o Gustavo deixou a ordem com a sessão do R4): 1) **auditoria do treino** (`prompts/sessao-auditoria-treino.md`): a base de exercícios e a qualidade do programa, com teste de estresse; 2) **anatomia dos exercícios**, com o prompt rascunhado ao fim da auditoria; 3) **design**, com a clareza do movimento. O treino precisa estar certo antes de ficar bonito, e a auditoria pode mudar a base em que as outras duas trabalham.

## Da auditoria do treino (02/11/2026)
Detalhes, números e exemplos em `revisoes/auditoria-treino.md`; a frequência de cada exercício em `revisoes/auditoria/inventario.md`.
- **Fichas e cartões dos 37 exercícios ainda sem guia** (achado 2; o lote 1 entrou na auditoria). Lotes de 5 pela frequência medida: 2) flexão de joelho, rosca, elevação lateral, crucifixo e remada com elástico; 3) stiff com elástico, afundo com o peso do corpo, abertura e puxada com elástico, e o 1º que vier na lista. A mesma ordem serve para a fila das animações do R5.
- **2ª vaga para o músculo prioritário abaixo da meta, quando há tempo** (achado 5): ombro lateral prioritário abaixo em ~44% dos casos sem dor; o dia mais longo para em ~54 min com 90 a 150 min escolhidos. Muda os programas da Carla e do Bruno.
- **Escada por exercício no peso do corpo e no elástico** (achado 8): a da flexão já aprovada (`equipamento.flexao-por-supino`) e os elásticos pela intensidade (1 a N); rever as faixas largas (8–20, 12–25, 15–30), com que a escada quase não anda.
- **Cascata no 2º local** (achado novo, durante as correções): trocar primeiro todas as vagas com equivalente e só depois preencher as que não têm.
- **Para a sessão do R3:** medir no export do Gustavo quantas sugestões viram "estagnado" (achado 11). No modelo da auditoria, com progresso lento e normal, metade das sugestões fica "estagnado", e 2 exercícios estagnados sugerem a semana leve.

## Do equipamento mínimo (03/11/2026)
Detalhes em `revisoes/equipamento-minimo.md` e `pesquisa-v2/10-equipamento-minimo.md`. Os itens decididos na sessão de fechamento (04/11: as 9 folhas aprovadas, kettlebell, suspensão, tempo que sobra, lista de casa, flexão com as mãos fechadas, avisos juntos) estão na seção "Decisões da sessão de fechamento" do relatório; aqui fica só o que continua aberto.
- **Remada invertida na mesa:** não entrou. Não há estudo de segurança, o app não vê a mesa e o acidente é grave. Reabrir só se aparecer estudo ou se a lista "o que tem em casa" existir.
- **Mochila, galão e outros objetos como carga:** não entram (decisão do Gustavo).
- **"Estagnado"** continua em ~48% das sessões do simulador de peso do corpo, com o progresso lento do modelo: medir no export do R3 (achado 11 da auditoria).

## Do catálogo completo (04/11/2026)
Detalhes em `revisoes/catalogo-completo.md`, `revisoes/catalogo/fila.md` e `pesquisa-v2/11-catalogo-completo.md`.
- **As 12 animações do elástico longo: feitas no R4 (05/11/2026)**, com as 4 entradas da auditoria (`revisoes/elastico/README.md`, `revisoes/r4/README.md`). O que sobra desta linha: nada.
- **Os outros 55 sem animação**, em blocos, com a frequência medida e o custo (`revisoes/catalogo/fila.md`): A) 11 só com halter e banco (321 mil prescrições, nenhuma peça nova); C) 13 máquinas de perna e smith (228 mil; peça nova); B) 9 de polia com acessórios pequenos; D) 10 de barra longa e rack; E) 14 de estações e máquinas de tronco. 21 deles não têm ficha nem cartão.
- **Seção "Diagnóstico do treino-mvp"** (`revisoes/equipamento-minimo/secao-diagnostico.html`): colar na página só pela conta pessoal do Gustavo, nunca pela conta de trabalho. Fica no git até lá.
- **Outros objetivos, opção (c) de `pesquisa-v2/12-outros-objetivos.md`:** um marco novo, fora do MVP, com pelo menos um destes: cardio prescrito (saúde e cutting), orientação de nutrição com um parceiro nutricionista, programa de força máxima com periodização e estimativa de 1RM. Pede tema de pesquisa próprio com selos, triagem nova, guias novos e mudanças no `PLANO-MVP.md` e no `CLAUDE.md`; a nutrição traz dado ainda mais sensível (LGPD) e, provavelmente, um profissional responsável. Risco: atrasar o MVP antes da validação com usuários. O Gustavo escolheu a opção (b), a pergunta de objetivo, já implementada.
- **Pendências de leitura — resolvido em 06/11:** as duas já estavam em `fontes.md` desde 05/11 e os resumos foram relidos na sessão de próximos passos (frente E). Texto original: Larsen 2025 do leg press (PMID 40113586; criar a chave `larsen2025b`, hoje citado no `04` sem chave) e o título de `kassiano2026` (PMID 41379528: "back squat" nas fichas do agachamento × "smith" em `fontes.md` e no `08`).
- **Correções das animações originais do guia** (`revisoes/catalogo/conferencia/antigas.md`): a rosca na polia (barra reta de largura fixa) está corrigida em revisão, mas as 25 originais são conferidas contra o HTML do guia (`tests/motor/equivalencia.spec.ts`, `motor.json`); aprovar uma correção pede decidir se o guia original deixa de ser a referência dessa animação. Três notas menores sem correção: pegada da barra fixa (1,8× os ombros), joelho de trás do búlgaro (14 cm) e altura dos halteres no stiff (joelho).
- **Medida da fita de suspensão:** o motor não calibra a fita (comprimento fixo pela pose); `scripts/medir-animacao.mjs` imprime o caminho da âncora a cada pegador por pose para o autor conferir. Se uma animação futura pedir a fita esticando (argolas com elástico), a peça ganha a calibração da `band`.

## Da auditoria independente (04/11/2026, Fable)
Detalhes, medidas e o porquê de cada item em `revisoes/auditoria-fable.md`.
- **R4 do boneco: feito em 05/11/2026** (propostas 1 a 3 aprovadas e no app; `devlog.md`, `revisoes/r4/README.md`). **O que ficou da Parte D.3** para um próximo marco de cena, por prioridade: 4) **câmera perto do corpo também no modo Técnica** quando o corpo ocupa menos de 70% do palco (`montarSvgEstilo`, `perto`; muda o enquadramento de ~15 animações de polia e suspensão); 5) **vista de cima na adução deitada** (com e sem caneleira), como na abdução (dados do exercício; uma folha por animação); 6) **mão por cima do disco de frente** e um traço do polegar na pegada neutra (`corpo.ts`; muda as 13 animações com halter: é mudança de corpo, não de cena); 7) **sombra no chão** sob os pés e as mãos (pista de profundidade barata; ganho pequeno). E duas ideias do R4: **a miniatura do cartão pela vista do movimento** (hoje fica no modo Músculos, decisão do Gustavo) e **a linha-guia do rótulo movido que atravessa o corpo** quando a âncora está escondida (a mão livre na coxa, na remada sem banco): uma 2ª passada que prefira o lado da âncora resolveria.
- **Fila dos sem animação:** ordem A, C, B, D, E; antes de animar, ficha e cartão dos 5 mais prescritos sem guia nenhum (panturrilha no leg press, puxada com barra reta, afundo para trás, desenvolvimento unilateral com halter, leg press).
- **Duas entradas propostas e não feitas** (C.1): rosca direta com barra longa e tríceps francês sentado com barra W ou reta, para quem só tem barra. Cada uma pede ficha e cartão.
- **"Prefiro este" entre níveis** (B.6): a preferência só vale dentro do mesmo nível da função; como os níveis são por carga, não por evidência, quem prefere o goblet ao leg press não consegue. Ideia: a preferência puxa um exercício do nível seguinte quando a diferença entre os níveis for só de carga.
- **Texto do "porquê" do nível 2** (B.2): "sem as opções preferidas no seu equipamento, entra a melhor possível" soa como "pior"; trocar por "opções equivalentes; a 1ª preferência só pede mais carga disponível" quando a diferença for de carga.
- **2º empurrar de quem não tem banco inclinável** (B.4): um 2º supino (no chão, com halteres) no lugar do crucifixo como "empurrar inclinado". Ideia, sem efeito medido.
- **"Estagnado" em 3 sessões** (F.2): medir no export do R3 antes de mudar; opções: 4 sessões, ou só quando o total de repetições não subiu em nenhuma das 3. E a sugestão com uma saída por vez, começando pela mais simples.
- **Texto do bloqueio da triagem** (F.1): dizer que pressão controlada com liberação do médico costuma ser uma conversa rápida, para a barreira não virar desistência; sem mudar a triagem.
- **"RIR" explicado na primeira vez em cada tela** e a ordem dos avisos de meta (primeiro o que a pessoa pode mudar) (F.3).
- **Testes** (F.4): propriedade para a sugestão de carga ao vivo com histórico por semente; propriedade larga do gerador (todas as divisões × personas × prioridades × níveis, com teto, piso e "nenhum músculo zerado sem aviso"); captura em PNG do Boneco (a linha de base protege o SVG, não a cor); e2e de importação de um export das versões 4 e 5.
- **`zod` 4** (F.7): o `npm audit` acusa o zod 3 (alto, exaustão de memória com coleções grandes; risco prático baixo no app) e o react-router (moderado). Subir o zod é mudança de API em `src/domain/` inteiro: numa branch própria, com `npm run check` como rede.
- **PubMed:** a rede das sessões voltou a alcançar o PubMed (06/11). As leituras de Larsen 2025 e de `kassiano2026` estavam feitas desde 05/11 (frente E da sessão de próximos passos).
- **Licença do PAR-Q+** (lida em 05/11/2026, `parq2025`): usar o texto oficial num app exige autorização escrita da PAR-Q+ Collaboration (eparmedx@gmail.com), possivelmente com taxa. Decidir: pedir a autorização (e então usar a versão oficial em português, `schwartz2021`) ou seguir com as perguntas próprias, que a tela já apresenta como "não é o questionário oficial". Vale junto com a revisão do profissional de Educação Física.
- **Textos de segurança a partir do Guia do Ministério da Saúde 2021** (`ms2021`, licença CC BY-NC-SA): as listas oficiais em pt-BR de contraindicações e de condições que pedem acompanhamento (p. 43) podem substituir frases do app, com a fonte citada.

## Da qualidade dos treinos gerados (06/11/2026)
- **A prioridade puxa frequência** (D-4): quando a meta do prioritário passa do teto de 10 séries por sessão e a divisão o treina 1 vez por semana, ativar a vaga dele noutro dia. Cobre a "2ª vaga do prioritário quando há tempo" da auditoria de 02/11. No avançado, pernas prioritárias ficam abaixo da meta em 96% dos programas. Medir antes.
- **Recomendar até 2 grupos de foco no cadastro** (D-3), sem bloquear; "pernas" conta como 3 músculos.
- **Modo "só este grupo"** (D-5): se vier, nunca zerar os outros; usar o piso de manutenção (`volume.manutencao.piso`).
- **Mais séries para todos quando sobra tempo** (E-c): na academia completa, 25,5% dos programas de 45 min ou mais usam menos de 70% dos minutos, porque a lista de vagas do dia e o teto de 4 séries por exercício param o dia em 55 a 65 min. É mudança de regra de volume para todo mundo: precisa de decisão e medida próprias.
- **A barra fixa que encaixa baixo** (B.4): um atributo no cadastro do item abre a remada invertida para quem só tem a barra; hoje `barra_baixa` exige rack ou smith.
- **Ombro posterior no grupo "ombros"** (B.9) [opinião do pesquisador]; efeito no Bruno e na Carla.
- **Abdução com peso 0,5 e o glúteo fora dos secundários das flexões de joelho** (B.17): é [opinião]; listar o efeito na biblioteca e na anatomia antes.
- **Nórdico invertido no nível 3 da extensora** (B.14): só um estudo sem grupo controle; não recomendado numa vaga obrigatória.
- **Ombro posterior como vaga-base num dia** (C.5) e **ordem dos complementos** (C.6): medir em 45 min antes.
- **Panturrilha no degrau** (B.20, 2ª parte): exercício novo com o calcanhar abaixo do degrau da escada; precisa de cartão textual e, depois, de animação aprovada.
- **Custo da proteção do abdômen** (F.5): na Ana, o abdominal protegido tirou 2 séries do búlgaro, um exercício de foco. Se o Gustavo achar alto, proteger com 2 séries e sem passar dos minutos.
- **Dias de 30 min acima do tempo** (F.9): com a proteção do abdômen e da panturrilha, 40% dos programas de 30 min têm um dia acima do tempo (eram 26%), sempre com aviso. Proposta: com 30 min ou menos, proteger com 2 séries e trocar por um isolador do mesmo dia em vez de somar.
- **O mesmo exercício em todos os dias no Corpo todo 6x** (F.9): 39,9% dos programas da grade (eram 29,8%), puxado pelos cenários sem equipamento com 6 dias.
- **O ombro lateral no Corpo todo 6x**: sem a vaga de empurrar vertical (como nos outros corpos todos), o ombro lateral fica sem a meia série do pike em quem não tem como puxar.

## Da sessão de próximos passos (06 e 07/11/2026)
Detalhes, números e o motivo de cada item em `revisoes/proximos-passos.md` e nos relatórios de `revisoes/proximos-passos/`. Os marcos decididos (R5a, R5-CL, R5d, R5-anim, R5b, R5c) estão no `PLANO-MVP.md`, seção i; aqui fica o que **não** entrou neles.
- **Itens da qualidade dos treinos (06/11), com a medida da frente A** (`proximos-passos/a-qualidade.md`):
  - **D-4 (a prioridade puxa frequência):** trocada pela **D-4c** (o 2º exercício do prioritário), que entra no R5d. A D-4 como escrita quase não tem efeito (o teto da sessão explica 4 de 5.301 casos).
  - **D-3 ("escolha até 2"):** entra no R5d.
  - **E-c (usar o tempo que sobra para todos):** **descartada em 07/11**: contradiz o foco e o "foco com manutenção" aprovado em 06/11 (medido: o foco cai de 17,4% para 16,2% das séries).
  - **F.5 e F.9 (30 min acima do tempo; o mesmo exercício em todos os dias; o ombro lateral no Corpo todo 6x):** feitos (os dois primeiros no R5-CL; o ombro lateral no R5a).
  - **Panturrilha no degrau (B.20):** entra no R5-CL, como apoio, sem item novo no cadastro.
  - **Não recomendados, com a medida:** C.5 (o ombro de trás sai em 273 programas de 45 min), B.17 e B.9 ([opinião]), B.14 (um estudo sem controle), B.4 (sem ganho de volume; risco não estudado), D-5 (+1,1 ponto de foco). C.6 é pequeno demais para um marco.
- **Recusados na biblioteca ampliada, com o motivo medido** (`proximos-passos/g-biblioteca-ampliada.md`, seção 2): a **rosca sem carga** (um estudo, `counts2016`; a revisão cega mostrou que ela ocupa o tempo do foco; reabrir se o texto completo sustentar e o foco já estiver resolvido); o **crucifixo no chão com halteres** (tirava os multiarticulares do dia de empurrar do iniciante com 30 min); a **elevação lateral na parede sem carga** (nenhum dado no deltoide); a **panturrilha com halter numa perna** para quem só tem halteres (alongava o dia; o corte tirava quadríceps); o desempate **"animado primeiro"** (repetir havendo opção em 29,5% dos programas).
- **Recusados no corpo livre** (`pesquisa-v2/16-corpo-livre-e-casa.md`): porta com toalha, batente, lençol na porta, remada sob a mesa, puxada deslizante no chão (0 estudo; o único dado novo sobre treinar pendurado em casa é de lesão, `shabbir2026`); superman como série de costas; rosca isométrica com toalha e auto-resistida; mergulho na cadeira e entre cadeiras; parada de mão; pseudo-planche; crucifixo deslizante; flexão com palma; sissy squat, good morning, extensão de quadril de bruços, calcanhar elevado, pistol livre, afundo lateral, prancha, dead bug, hollow e Copenhagen. **Para depois:** resistência manual de um parceiro (há ensaios, mas a dose depende de outra pessoa).
- **Costas sem algo para puxar:** nenhum programa de treinador, vídeo com credencial ou estudo dá saída honesta (`pesquisa-v2/17`). O app continua avisando que falta algo para puxar e que um elástico resolve.
- **A ancoragem do elástico:** não existe capacidade no cadastro; hoje o cartão diz onde prender. Junto, o aviso de segurança do elástico com a fonte nova (`ng2022`: em 11 de 11 lesões de olho, o elástico escapou da ancoragem).
- **Depois do R3, com o export:** os gatilhos da semana leve e do "estagnado" (`proximos-passos/d-longo-prazo.md`, opção 2), a recalibração quando a faixa de repetições muda (objetivo, nível) e a revisão do nível oferecida aos ~6 meses. A **variação por blocos** (`a-qualidade.md`, pacote D) só se o uso mostrar tédio ou platô (sem ganho de músculo, moderada).
- **"Monte o seu treino" do zero** (`proximos-passos/b-monte-e-avaliador.md`, opção c): depois do R5b, com a versão nova do estado decidida uma vez só, junto com a v8 do redesign. **Ler um programa por foto ou texto com IA** (opção d): só depois dele (estimativa: US$ 0,05 a 0,10 por programa lido).
- **Trocas e prévia** (`proximos-passos/c-fluxo.md`, opção C): alternativas do mesmo equipamento quando não há outro; "usar sempre este"; mostrar o que muda antes de "Atualizar programa".
- **Revisão por um profissional de Educação Física (CREF) e o PAR-Q+ oficial:** continuam "de lado" (decisão de 01/11); reavaliar antes de abrir o app a desconhecidos (não para família e amigos).
- **O resto da fila de animação**, pela frequência medida na grade de 108.900 programas (`proximos-passos/g-biblioteca-ampliada.md`, seção 4), depois dos 5 de corpo livre do R5-anim.
- **Dependências** (`zod` 4, react-router 7, vitest 5) e os **testes de propriedade** da F.4: numa branch própria, depois do lote técnico do redesign, que mexe nos mesmos arquivos.

## Do R5c, abrir para família e amigos (07/11/2026)
- ~~**A letra do Google Fonts**~~ feito em 10/11/2026: o redesign serve a letra do próprio app (`tests/e2e/letra.spec.ts`), e a linha do Google saiu dos termos.
- **"Como ler o seu treino" no 1º toque em "RIR"** em cada tela (B2, 2ª parte): ficou só a folha no programa. Pedido ao design (item 16).
- **Medir sem dado pessoal (B7):** formulário de opinião fora do app e a soma diária do log da visão (só números). Não feito: não colete nada sem decisão do Gustavo.
- **Lembrete de cópia por e-mail ou na nuvem:** fora do MVP (login e nuvem). O lembrete fica no aparelho (`dados.copia`).
- **O consentimento da foto ganhar versão** (se o texto da foto mudar, pedir de novo): hoje a data fica no `localStorage` sem versão do texto. Fazer junto da revisão do advogado, se ele pedir.

## Do R5-CL (07 e 08/11/2026)
Detalhes e números em `devlog.md` ("R5-CL") e em `revisoes/qualidade/regua.md`.
- **A fila de animação dos exercícios novos: os 5 de corpo livre foram feitos no R5-anim (10/11/2026)** (`devlog.md`, "R5-anim"; `revisoes/r5-anim/README.md`). O resto da fila está em "Do R5-anim", abaixo.
- **O marco seguinte** (`revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 5): **o foco que muda a distribuição** (o prioritário recebe quase o mesmo que o resto, e o tempo que sobra vai para músculos que não são foco: no caso do Gustavo, as pernas com 11 a 12 séries e costas e bíceps a 0); **o 1º degrau da escada pelo nível** (o avançado sem nada recebe os mesmos exercícios do iniciante); **a regressão da barra fixa** (o iniciante recebe a barra antes da barra só na descida).
- **A régua:** o D1 (empurrar ÷ puxar) segue o limite escrito, 1,5, e dá 6,1% na `main`, contra 0,9% no protótipo, cuja leitura exata se perdeu. Rever com o R5d (o foco em peito ou ombros sobe o empurrar de propósito) se o limite deve considerar o foco. Faltam na régua as medidas que o protótipo não publicou: C3 (o aviso quando o foco não cabe), D2 (sem como puxar, nenhum empurrar a mais) e E2 a E4.
- **Os 5 exercícios novos que só aparecem como alternativa** (o desenvolvimento em pé, a elevação lateral unilateral e a deitado com halter, a remada unilateral com elástico e a caminhada lateral com mini-band): ficam pelo desempate. Rever se a troca do dia mostrar que eles são escolhidos.
- **Os degraus propostos em `pesquisa-v2/16` e `17` para exercícios que já existem** (o agachamento com uma perna até a cadeira, a flexão arqueiro, a prancha lateral com abdução, o abdominal com a toalha sob a lombar, o texto "no step ou num degrau de escada"): não entraram neste marco, que ficou nos 32 exercícios. Entram com o 1º degrau pelo nível.


## Do R5a, o registro que não engana (08/11/2026)
Detalhes e números em `devlog.md` ("R5a").
- **As 6 telas pedidas ao design** (`revisoes/proximos-passos.md`, 2.5, itens 1 a 6): a dor registrada na série e no fim; o fim com exercício interrompido ("Interrompido: búlgaro, dor aguda", antes de "Para a próxima vez"); corrigir uma série ou apagar um treino na Semana e na Evolução (a função `corrigirSerie` já existe); a semana leve recusada como uma linha em "A sua semana"; a frase do fim da calibração. Hoje há só o mínimo funcional (ver o devlog).
- **A nota de dor sem série onde ficar:** quem dá dor acima de 5 antes da 1ª série de um exercício tem o exercício encerrado, e a nota não fica em lugar nenhum (o estado guarda a dor só na série). Guardar a dor no exercício pede um campo novo no estado: decidir junto da v8 do redesign, uma vez só.
- **Extensão de quadril nos cortes de tempo:** 0,8% dos programas da grade de 55 cenários (426, todos de 30 a 60 min, em cenários de um item só: caneleiras, glúteo na máquina, polia, rack, smith, suspensão…) perdem a ponte ou o coice no corte de tempo, como qualquer complemento que não é foco. Decidir se o glúteo ganha proteção como o abdômen e a panturrilha (`tempo.musculo-protegido`).
- **O D1 (empurrar ÷ puxar) no Corpo todo A/B:** a ponte que entra pela falta do stiff passa o D1 de 1,5 em mais 22 programas sem dor (1,2% → 1,3%), abaixo da linha de base. Rever junto do R5d (o foco) ou do avaliador (R5b), que já vão mexer no equilíbrio.
- **Orçamento do pacote da tela do programa:** com o R5d e o R5a juntos, 219,8 kB comprimidos para um limite de 220 (`tests/e2e/orcamento.spec.ts`). O R5a enxugou o texto das próprias regras para caber (as medições ficam no devlog). O próximo marco que crescer o domínio precisa de uma decisão: separar o `regras.json` do pacote inicial (as regras só aparecem no "por quê?") ou rever o limite com o design. **Resolvido no R5b (09/11):** o texto das regras saiu do pacote inicial (fica só o selo); ver "Do R5b".
- **O simulador da frente D** ficou no scratchpad, como o relatório pediu. Se ele voltar a ser usado (os gatilhos pelo export, a revisão do nível), vale versioná-lo em `scripts/auditoria/`.
- **Depois do R3, com o export** (`npm run ler-export`): os gatilhos numéricos da semana leve e do "estagnado" (3 sessões, 2 exercícios), que o R5a não mexeu.

## Do redesign, lote 2 (06/11/2026)
Achados ao refazer a tela do treino. Nada disso mudou no lote, porque mexe no domínio ou na regra: fica para o Gustavo decidir.
- **A nota de dor do "Senti algo" não é gravada na série.** A pessoa escolhe de 0 a 10 e o app responde na hora, mas a nota não vai para o registro, e o domínio lê `dor ≥ 3` na série para sugerir a carga seguinte. Corrigir pede gravar a nota na série aberta (e decidir o que fazer se ainda não houver série).
- **Na barra, o "+/−" da carga anda de 2,5 kg** sem olhar a menor anilha do inventário, embora `opcoesCarga()` já devolva `passoKg`. Quem tem anilhas de 1 kg (2 kg a mais na barra) não consegue marcar 22 kg pelos botões.
- **Testes:** os toques nas folhas falhavam às vezes porque a folha ainda estava subindo; `folhaPronta` (`tests/e2e/jornada.ts`) espera a animação terminar. Usar em todo teste novo que toque numa folha.

## Do redesign, lote 4 (07/11/2026)
- **Pedido 2 ao domínio, "Quando você costuma treinar?"** (aprovado em 06/11): pergunta opcional depois do 1º treino, para o início dizer "hoje é dia de treino" ou "próximo: sexta". Muda o estado guardado (versão 8, com migração e teste) e acrescenta uma função ao domínio. Ficou fora do lote 4 para ter uma parada própria: antes, lembrar de exportar os dados ("Meus dados" → "Guardar uma cópia").
- **O fim do treino com sugestão de semana leve** é a tela mais longa do grupo (cerca de 100 palavras à vista). Uma ideia: a oferta da semana leve no fim do treino em 1 linha, como no início, com o bloco numa folha.

## Do redesign, lotes 3 e 5 (08/11/2026)
- **Desenhos do equipamento que se confundem no tamanho do cartão** (`scripts/design/redesign/desenhos-v2/`):
  - supino × desenvolvimento na máquina, extensora × flexora e smith × rack;
  - polia simples e puxador alto ficam pequenos;
  - a corda parece um garfo e o hack não tem a versão pendular. (A máquina de glúteo, que era genérica e em pé, foi redesenhada de quatro apoios em 21/11, como a animação do coice.)

  Refazer quando o Gustavo apontar quais incomodam no uso.
- **O caminho "Item por item" do equipamento** ficou 2 toques mais longo para a Ana (abrir a lista, a categoria "Bancos", o "Pronto" dos halteres). Uma ideia: a categoria abrir pelo 1º item ainda não marcado. Medir com a cronometragem do Gustavo antes de mudar.
- **Pedido 4 ao domínio, o resumo curto da calibração:** ficou de fora, por decisão do Gustavo em 06/11. O protótipo resolve sem ele.
- **Tema claro ou escuro escolhido no app:** hoje o app segue o tema do celular. O protótipo tinha a linha "Tema"; ela só entra como função nova.
- **O nome do app** continua treino-mvp até a validação com usuários (decisão de 06/11). O ícone novo já entrou.
- **Voltar o pacote inicial para menos de 150 kB.** Na junção do redesign com a main (08/11), o R5-CL e o R5c levaram a boas-vindas de 147 para 167 kB comprimidos, e o programa de 189 para 213 kB. O desempenho segue de 90 a 100, e o teste de orçamento passou a 175 e 220 kB. O maior peso é `regras.json`, com 28 kB comprimidos e o texto de todas as regras: o selo precisa só do nível na hora, e o texto e as fontes poderiam vir quando a folha abre. Isso mexe em como o domínio expõe as regras, então pede uma decisão própria.
- **Acessibilidade 96 no Lighthouse em 3 rotas (`target-size`):** uma linha da lista fica parcialmente atrás da barra fixa de baixo no momento da medição. Não é um botão pequeno; depende da altura do conteúdo, que cresceu com o R5c. Os testes do app (toque de 44 px e foco coberto) passam. Uma ideia é reservar a altura da barra no fim da página.

## Do R5d (08/11/2026)
Detalhes e números em `devlog.md` ("R5d") e em `revisoes/qualidade/regua.md`.
- **O foco invisível que resta:** 30 min (31,3%) e o foco nas pernas (44,2%). Três músculos com meta alta não cabem em pouco tempo; a nota do "até 2" e o aviso de focos que competem explicam. Ideia a medir: com "pernas" e 30 min, sugerir mais minutos no próprio cadastro.
- **O aceite do caso do Gustavo:** as pernas ficam em 9–10, não no piso (6), porque a versão com as pernas no piso encurtava os treinos e foi a mais criticada na revisão cega. Se o Gustavo preferir treinos mais curtos com as pernas no piso, a distância de 6 séries (`volume.prioridade.foco-primeiro`) vira uma escolha de produto.
- **As críticas dos treinadores que não são do foco:** puxar improvisado sem equipamento (remada sob a mesa, toalha na porta: pede pesquisa de segurança e de evidência); abdominal com 4 séries num dia só e elevação lateral no dia de pernas (a montagem das vagas); drop sets e superséries para o iniciante fora da fase de aprendizado; halteres leves sem elevação lateral nem rosca; fita e mini-band pouco usadas; o avançado sem carga vê o exercício base na semana (o degrau inicial só aparece no treino).
- **A barra só na descida em todos os dias** do iniciante que só tem a barra (B2): os treinadores pediram para alternar com isometria no alto e remada australiana (a barra baixa, B.4, segue fora). Ela entra na fila de animação: hoje é cartão de texto.
- **Os degraus propostos em `pesquisa-v2/16` e `17` para exercícios que já existem** (a flexão arqueiro, o agachamento até a cadeira e outros) seguem fora: o degrau inicial pelo nível usou as escadas de hoje.
- **A tela do "escolha até 2"** (pedido ao design): a ajuda e a nota abaixo dos grupos entraram com os componentes de hoje.

## Do R5b, o avaliador e o porquê (09/11/2026)
Detalhes e números em `devlog.md` ("R5b") e os textos para revisar em `revisoes/r5b/textos.md`.
- **As 3 telas pedidas ao design** (`revisoes/proximos-passos.md`, 2.5, itens 7 a 9): "Como está o seu programa" com os achados agrupados por tipo e a tabela por músculo recolhida (o avaliador já devolve `musculos` e os minutos de cada dia); a folha do exercício com o porquê específico primeiro e os 4 genéricos recolhidos; a semana com a meta do programa (hoje, uma frase ao lado do estado do músculo). O item 10 ("estagnado" com uma saída por vez) segue na fila do design.
- **"Monte o seu treino"** (o editor e o montar do zero): rascunho do prompt em `prompts/sessao-monte-o-seu.md`, com a versão nova do estado combinada com o redesign (uma só).
- **O que o avaliador ainda pede para ajustar nos programas do gerador** (11,5% da grade reduzida, todos já avisados pelo gerador): sobretudo o foco abaixo da meta com uma série que ainda cabe (a panturrilha da Ana: o corte de tempo tira séries por ordem e não volta para ver se uma cabe) e dias acima de 110% dos minutos em que um bi-set resolveria. Medir se vale o gerador fazer o que o avaliador sugere, depois dos cortes.
- **106 programas da grade inteira (0,01%) com um "ajustar" que o gerador não avisa**, todos fora da grade reduzida (com dor ou em cenários de um item só): a troca a partir do que sobra no glúteo (ex.: stiff unilateral → abdução, com dor no joelho) e a coxa fora da faixa com lugar para corrigir. Exemplos em `revisoes/qualidade/grade.md`, `avaliador.ajustar-sem-aviso`. Decidir se o gerador faz essas trocas ou se o avaliador as trata como limite.
- **A flexão fechada** conta como empurrar na régua da G5 (pelo padrão de movimento) e não no avaliador (a tabela de funções a põe só no tríceps). É 1 exercício; decidir se ele entra no empurrar da tabela, para os dois medirem igual.
- **A faixa "Há uma versão nova do seu programa" aparece também quando só os textos mudam** (a comparação olha o programa inteiro). Toda mudança de texto do porquê ou dos avisos a faz aparecer para quem já tem programa, sem nenhuma troca de exercício. Uma ideia: comparar só os exercícios, as séries e os dias, e atualizar os textos sozinho; mexe em como o programa salvo é atualizado, então pede uma decisão.
- **O gerador ficou ~15% mais lento** (a régua depois dos cortes e o porquê específico; ~2 ms por programa). Não pesa no app (um programa por vez); a grade de qualidade leva mais. Se incomodar, a régua pode rodar só quando um músculo grande tem uma família.
- **Voltar a boas-vindas para menos de 150 kB:** com o texto das regras fora do pacote inicial, a boas-vindas baixa 149,9 kB e a tela do programa 195,4 kB comprimidos; o teste de orçamento continua com os limites de 175 e 220 kB. Baixar os limites é decisão do design.

## Do R5-anim (10/11/2026)
Detalhes e números em `devlog.md` ("R5-anim"), `revisoes/r5-anim/README.md` e `revisoes/qualidade/regua.md` ("Uso de cada exercício").
- **O resto da fila de animação**, pelos programas sem dor em que cada um aparece (grade da régua, 36.300 programas sem dor, medida em 10/11 depois do lote 2). O lote 2 animou a ponte com halter, a remada curvada com halteres e o afundo para trás. Restam **81 exercícios em cartão de texto**. Os próximos sem peça nova (halter, banco e o corpo): crucifixo com halteres (9,2%), tríceps testa com halteres (8,6%), crucifixo invertido curvado (8,5%), crucifixo invertido sentado (8,3%), tríceps francês unilateral com halter (7,1%), crucifixo inverso (7,0%). As máquinas (cadeira flexora 8,7%, cadeira extensora 8,3%, puxada pela frente 7,3%) pedem peça nova (bloco C de `revisoes/catalogo/fila.md`). Os outros, abaixo de 5% cada.
- **Nas personas, o que ainda é cartão:** a Carla (11 exercícios de máquina e barra; o Inferior e o Pernas com 5 cartões cada), o Bruno (5; o Superior B com 4: puxada com barra reta, desenvolvimento unilateral, rosca na polia de costas e crucifixo com halteres), a Ana (ponte com halter, crucifixo invertido sentado), o Diego e o Fábio (barra só na descida). A Elisa já não tem nenhum.
- **O desempate entre equivalentes animados cai na ordem do nome** (3 vezes até agora, todas aceitas pelo Gustavo em 10/11). Com o abdominal invertido, o Fábio trocou a elevação de joelhos na barra pelo abdominal invertido (Inferior B); com a remada curvada, a Ana trocou a remada sem banco pela curvada (Corpo todo C, 43 → 41 min); com o afundo para trás, o Fábio trocou o búlgaro pelo afundo para trás (Inferior A), e o nórdico caiu de 3 para 2 séries (posteriores 10 → 9 por semana). Os dois de cada troca são do mesmo nível e agora os dois têm animação, e o último critério é o id. A escolha fica arbitrária, e o búlgaro (complexidade 2) saiu da semana do Fábio; um critério de variedade ou de dificuldade dentro do nível seria melhor. É regra do gerador: fica para o marco do gerador.
- **Limites de desenho que apareceram nas folhas** (aprovadas assim): os polegares para cima da abertura em T não aparecem (a mão é uma luva); de frente, o boneco deitado de bruços parece de pé; o "encolher" deitado (7 cm) fica pequeno na vista de cima; o "quicar" e o "ir até a falha" são erros de ritmo, que o quadro parado não mostra (a animação, sim). Um traço do polegar entra com a proposta 6 da auditoria (mão por cima do disco), que é mudança de corpo.
- **Os cotovelos da ponte com kettlebell** (aprovada em 04/11): ficam abertos e no ar, como os da ponte com halter que o Gustavo achou estranhos em 10/11 (corrigidos lá: apoiados no chão, ao lado da cintura). Corrigir também na ponte com kettlebell pede uma folha própria, a aprovação e a regravação da linha de base dessa animação.


## Da auditoria geral (12/11/2026)

O que sobrou depois da sessão de correções de 12/11/2026 (`devlog.md`, "Correções da auditoria geral"), cada item com o motivo. O resto da lista original foi corrigido e saiu daqui.

**Segurança e dados**
- **O id do aparelho da foto vem do cliente** (`api/_lib/pedido.ts`): sem login (fora do MVP) não há como conferi-lo; o que segura o gasto é o limite por IP e o teto mensal na Anthropic. Fica como está. O resto do ponto foi corrigido em 12/11/2026 (cota devolvida, log, tamanho, tempo máximo).
- **Dependências com alerta no `npm audit`** (20; 3 em produção: zod 3, react-router 6; os críticos são do vitest 3, só no desenvolvimento): todas as correções são versões maiores (zod 4, react-router 7, vitest 5). **Fica (decidido em 12/11/2026):** conferido de novo, `npm audit fix` sem `--force` não tira nenhum dos 20 alertas; cada versão maior entra num PR próprio, fora da sessão de correções.

**Regras do treino**
- **O gerador deixa passar um ajuste de empurrar ÷ puxar que o avaliador sugere, sem avisar** (`avaliador.ajustar-sem-aviso`: 210 de 911.625 programas, 0,02%; eram 106): desde 12/11/2026 a flexão fechada conta como empurrar (pelo padrão do movimento), e em programas como "elásticos, avançado, 3 dias, 45 min, foco em peito e braços, lombar 7" sobra "empurrar 14 × puxar 8" com a sugestão de acrescentar uma remada. A passada da régua no gerador não aplica nem avisa. No mesmo conjunto, o D1 caiu de 7.335 para 5.519.
- **A animação da `panturrilha-chao` mostra a descida com as duas pernas**: em 12/11/2026 os dados, o porquê e o cartão foram alinhados à fonte (subir com as duas e descer em 3 s com uma só; `nakamura2025`), e o cartão avisa da diferença. Falta o Gustavo decidir: refazer a animação (folha a folha) ou mostrar o exercício como cartão de texto.

**Tela**
- **Não medido nesta sessão**: o tempo máximo de 50 s da chamada ao modelo da foto (sem fotos reais nem chave); as listras das miniaturas por variável de CSS no Safari (conferido só no Chromium); o cabeçalho Content-Security-Policy na Vercel de verdade (o e2e roda a mesma política na prévia local; a barra de ferramentas das prévias da Vercel deve ser barrada por ela).
- **Para a revisão do Gustavo**: os textos dos 20 cartões novos e das fichas de técnica; a troca dos rótulos citados nos termos (o texto jurídico não mudou, mas o advogado revisa os termos); os limites dos halteres (passo de 0,25 kg, 200 kg), que são opinião do projeto.
- **CSS do motor sem uso aparente** (`.ea-*`, `.eb-*`, `.lbl-m` e outras, cerca de 30): os nomes são montados no motor por prefixo e sufixo, então o `grep` não prova que estão sem uso; ficaram. Em 12/11/2026 saíram as 12 classes das telas que o `grep` confirmou (28 regras, cerca de 3 kB) e os ajudantes repetidos.

**Repositório**
- **Histórico do git**: os e-mails pessoais e o nome do empregador saíram dos arquivos, mas continuam nos commits antigos. Apagar de lá pede reescrever o histórico. **Fica como está (decidido em 12/11/2026):** reescrever muda todos os hashes, quebra os ramos e os PRs abertos e pede `push --force` na `main`.
- **O motor segue com `@ts-nocheck` em 96 de 105 arquivos** (os exercícios do port e os 4 arquivos de base dele: `esqueleto.ts`, `math.ts`, `svg.ts`, `qa.ts`): tipá-los pede reescrever a animação. Em 12/11/2026 saiu de `desenho.ts`, `cena.ts` e `estilo/` (tipos em `engine/tipos.ts`, sem `any`, regressão do motor sem diferença). Achado da tipagem, sem mudança de comportamento: o estilo `a2` chega a funções cujo tipo declarado é `a` ou `b` (`vistaDaMiniatura`, `montarSvgEstilo`), e as classes saem `ea2-…`; conferir se é o desejado.

## Da sessão "treino para todos", etapa 1 (12 e 13/11/2026)

Detalhes e números em `revisoes/treino-para-todos/` (`diagnostico.md`, `proposta.md`, `exemplos/`). Nada mudou no app; o que está abaixo é o que **não** entra na proposta, ou o que espera decisão.

**Esperando a decisão do Gustavo** (`proposta.md`, seção 10)
- As 9 decisões da proposta: o tempo que sobra vira série para todos (reabre o E-c descartado em 07/11), os exercícios de referência antes da animação, os ajoelhados fora com dor forte no joelho, a semana em corpo todo quando a dor esvazia um dia, o iniciante sem drop set, a janela do aviso de "sem melhora", a pergunta "60 anos ou mais", a revisão por profissional, a ordem das entregas.

**Para a etapa 2 (se a proposta for aprovada), com protótipo e medida antes de entrar**
- **Zerar os resíduos do protótipo:** empurrar ÷ puxar acima de 1,5 sobe 0,1 a 0,4 ponto em alguns grupos; frente ÷ trás da coxa, 0,1 a 0,6 ponto com dor forte no quadril; o dia acima do tempo com 3 dias, de 4,9% para 5,2%. O critério de pronto é nenhum defeito pior em nenhum grupo.
- **Dias próprios para o iniciante** (dois treinos que se alternam, com 5 ou 6 exercícios): os três revisores pedem; o limite de 6 com os dias de hoje foi medido e recusado (músculos esquecidos: 10,4% → 14,1% dos iniciantes).
- **Quem é forte e não tem carga:** uma perna de cada vez na vaga de agachar; hoje a regra das 2 famílias do quadríceps devolve o agachamento comum. Mexer nas duas regras juntas.
- **A ordem da lista do afundo sem carga** (o mais simples primeiro): o Fábio trocou o afundo para trás pelo búlgaro sem motivo de treino, e um revisor baixou a nota.
- **"Ficar mais forte":** o mesmo movimento 2 vezes por semana, mais séries nos levantamentos, e o iniciante incluído (`pesquisa-v2/24`); hoje só os 2 primeiros exercícios grandes de cada dia mudam.
- **Mais séries por igual dentro do dia:** a Marina recebe 4 séries de supino e 2 de puxada no mesmo treino; a regra leva cada músculo ao alvo, e não iguala os exercícios do dia.
- **A reserva (RIR) em séries longas:** a pessoa erra ~1 repetição para menos, e mais acima de 12 (`halperin2022`); texto, não número.
- **O descanso dos exercícios grandes** (1 min 45 s × os 2 min do consenso da IUSCA): não medido; custaria 2 a 3 min por treino de 60.

**Para um profissional de Educação Física e um fisioterapeuta (pauta em `proposta.md`, seção 9)**
- Dor acima de 5: tirar tudo o que carrega a articulação ou trocar por variações toleradas (com dor 7 no joelho, o quadríceps fica com zero séries).
- O que carrega cada articulação: a panturrilha no leg press com dor no joelho; o agachamento com a barra nas costas e a rosca Scott com dor no ombro.
- A triagem mais rígida que o PAR-Q+ 2025 (pressão alta, doença crônica e remédio contínuo controlados; gestação).
- Barra fixa só na descida, flexão nórdica sem apoio e duplas de exercícios grandes para iniciantes e pessoas de 60 anos ou mais.

**Fora do escopo (a pesquisa sugere; o MVP não cobre)**
- Nutrição no objetivo "manter na dieta"; atividade aeróbia no objetivo "saúde"; treino de potência para 60 anos ou mais; semana leve planejada e periodização (sem ganho nos ensaios); restrição de fluxo sanguíneo e excêntrica acentuada.

**Medidas e scripts que ficaram**
- `scripts/auditoria/retrato.ts` (os 20 cuidados em 680.625 programas, grade e ponderada), `cuidados.ts`, `populacao.ts` (os pesos são estimativa: recalibrar quando houver uso real), `estabilidade.ts`, `biblioteca-cobertura.ts`, `comparar-retratos.ts`, `piores.ts`, `exemplos.ts`, `exemplos-paginas.ts`, `ver.ts` e o protótipo em `scripts/auditoria/prototipo/`. O retrato ainda não entrou em `npm run auditoria` nem em `auditoria:verificar`: entra na etapa 2, quando as medidas virarem parte da régua e do avaliador do app.
- O retrato não cobre: as semanas de aprendizado e de volta de pausa, as divisões escolhidas à mão, os exercícios a evitar, o 2º local, duas dores ao mesmo tempo, e os objetivos (só "ficar mais forte" muda números, e não foi medido nesta etapa).

## Da sessão "treino para todos", etapa 2, pacote 1 (13/11/2026)

Detalhes em `revisoes/treino-para-todos/pacote-1.md` e `qa.md`. O pacote está no ramo da sessão, esperando a revisão do Gustavo.

**Medido e recusado (não tentar de novo sem motivo novo)**
- **As séries a mais no meio da montagem do dia** (a 1ª versão do protótipo): tomavam o lugar de exercícios; em treinos de 30 min, um dia ficava sem exercício grande, e o empurrar passava do puxar com foco em peito. Entrou a versão que age no fim, com o programa pronto.
- **O iniciante com séries em todos os exercícios até o alvo de 8** (`PROT=usa-tempo,inic-tudo` no protótipo): na revisão cega, a nota caiu em 2 de 5 iniciantes com tempo sobrando (dia no limite, 3 a 4 séries nos exercícios pequenos). Entrou "só os exercícios grandes, até 3 séries". Rever no pacote 4, quando o iniciante tiver menos exercícios por dia: em dois perfis com folga de tempo (4 dias de 60 min e 3 de 75), a versão recusada teve a nota mais alta.
- **Séries a mais em dia com bi-set ou drop set:** o dia já está no limite; a série a mais deixava os dois exercícios da dupla com séries diferentes e passava de 0,45 série por minuto.

**Ficou de fora, com o número**
- **Dias de treino seguidos:** "o mesmo músculo com 3 séries diretas ou mais em dias seguidos" foi de 4,8% para 5,3% dos programas (ponderada). O gerador não sabe quais dias são seguidos na semana da pessoa, e não há regra sobre isso em `regras.md`; pede pesquisa (recuperação entre sessões) e, talvez, a ordem dos dias na rotina.
- **Quem tem 3 grupos de foco ou mais** continua com dias curtos (o Inferior A do Bruno, 40 min em 70): o foco fica na meta e os outros músculos, 6 séries abaixo. O aviso novo de `tempo.sobra` diz isso quando o dia típico fica abaixo de 70%.
- **O iniciante:** quase todo o ganho na régua vem do aviso, e não do tempo usado; as séries sobem de 56,5 para 57,1 por semana, em média.
- **O dia de 5 exercícios ou mais com 2 séries em todos** cai de 21,8% para 15,1% (ponderada); a 1ª versão chegava a 11,4%, à custa dos defeitos acima.

## Da sessão "treino para todos", etapa 2, pacote 0 (14/11/2026)

Detalhes em `revisoes/treino-para-todos/pacote-0.md` e `qa.md`. O pacote está no ramo da sessão, esperando a revisão do Gustavo.

**Medido e recusado (não tentar de novo sem motivo novo)**
- **Trocar também a vaga de um isolador que a dor esvazia** (o tríceps acima da cabeça, com dor no ombro): o substituto entrava com 4 séries e estourava os treinos de 30 min; com dor 7 no ombro, "dia acima do tempo" ia de 626 para 793 programas de 45.375. A troca ficou só para a vaga de exercício grande.
- **Trocar a vaga por qualquer função do mesmo músculo, sem olhar o tipo:** a vaga do agachamento virava a cadeira extensora e o dia ficava sem exercício grande (em uma amostra de 28.875 programas com dor forte, 96 ganhavam esse defeito).

**Ficou de fora, com o número**
- **Quem só tem puxada ajoelhada** (só elásticos; só a estação de polia dupla) e marca dor forte no joelho fica só com remadas; foram as duas pessoas com nota menor na revisão cega (−1,0 e −0,7). O remédio é de conteúdo: a versão sentada das puxadas (`pedidos-a-animacao.md`).
- **Resíduo na contagem bruta:** 28 pares de grupo e defeito sobem de 1 a 8 programas em relação à `main` (nenhum mais de 0,05 ponto; nos totais nenhum sobe): programas que cruzam um limite da régua porque a lista de exercícios encolheu.
- **A extensão de tríceps com o peso do corpo** tem o último degrau de dificuldade "no chão, de joelhos": o app pode sugerir esse degrau a quem tem dor no joelho. Não mexi (é a progressão, e o exercício em si não ajoelha); fica para a pauta do profissional.
- **A panturrilha no leg press e o agachamento com a barra nas costas** com dor no joelho e no ombro: os revisores voltaram a apontar; continua na pauta do profissional (`proposta.md`, seção 9).
- **A remada de um lado só com elástico "sob o pé da frente"** pede base em passo; um revisor apontou que isso carrega o joelho com dor. Conferir o texto de execução.

## Da sessão "treino para todos", etapa 2, pacote 3 (15/11/2026)

Detalhes em `revisoes/treino-para-todos/pacote-3.md` e `qa.md`. O pacote está no ramo da sessão, esperando a revisão do Gustavo.

**Medido e recusado (não tentar de novo sem motivo novo)**
- **Proibir a dupla com exercício livre com barra, proibir a dupla de dois exercícios que carregam a lombar e tirar o drop set do iniciante:** as três põem treinos curtos acima do tempo (em 23.470 programas da amostra: 11, 35 e 9 ganham um dia acima de 110%). Para entrarem, o corte de tempo (`tempo.corte`) precisa de outra saída antes das duplas e do drop set (menos séries, ou menos exercícios para o iniciante). Fazer junto com o pacote 4.
- **Trocar a divisão por causa da dor sem olhar o custo:** 301 de 35.292 programas com dor forte ganhavam um músculo sem nenhuma série, e 32 tiravam a coxa do equilíbrio. A regra que entrou tem as travas.

**Decidido e feito em 15/11**
- **O Corpo todo 6x para quem tem dor forte** (antes, só o recuo de `divisao.sem-puxar`): entrou; os programas com um dia fraco foram de 41.471 para 29.159.

**Para medir depois**
- **Uma folga de 5 a 10% do tempo no 2º passo de `tempo.sobra-series` (pacote 1):** é a terceira vez que os revisores baixam a nota de um dia cheio até o limite (o Leandro e o iniciante do condomínio, no pacote 1; o avançado de 5 × 75 min com dor na lombar e foco em pernas, agora: as mesmas duas páginas tiveram +0,3 num painel e −3,3 no outro). A Marina e o avançado de 90 min, que também enchem o tempo, foram os que mais subiram; por isso é para medir, e não para mudar já.
- **O foco em "pernas" leva a panturrilha junto até o máximo do nível** (16 séries no avançado): três revisores chamaram de volume demais. A regra é a do foco primeiro (R5d); rever com o pacote 2 ou 4.
- **As notas que sobem com o corpo todo:** o mesmo músculo em dias seguidos (5,3% → 5,9% dos programas, ponderada) e o mesmo exercício em todos os dias sem opção (16,6% → 18,7%, grade). Pede a mesma pesquisa sobre dias seguidos anotada no pacote 1.

## Da sessão "treino para todos", etapa 2, pacote 2 (15/11/2026)

Detalhes em `revisoes/treino-para-todos/pacote-2.md` e `qa.md`. O pacote está no ramo da sessão, esperando a revisão do Gustavo.

**Medido e recusado (não tentar de novo sem motivo novo)**
- **"Para o iniciante, o exercício mais simples primeiro":** em 23.470 programas da amostra, 300 iniciantes deixam de ter mais de 12 exercícios diferentes na semana, mas 4 programas ganham um dia fraco (iniciante com dor forte no quadril) e o supino com halteres, animado, dá lugar a máquinas em cartão de texto. Volta no pacote do iniciante, com decisão do Gustavo.
- **Dois lados antes de um lado só também com halter e kettlebell (a versão larga):** a revisão cega achou duas pessoas piores (dor leve na lombar: terra romeno com barra no lugar do stiff de um lado só; avançado com halteres de até 20 kg). Entrou a versão estreita (máquina, polia e barra).
- **Poupar a série de puxar no corte de tempo:** só 20 de 23.470 programas mudam; não é o caminho do defeito.

**Para medir depois**
- **A razão empurrar ÷ puxar na distribuição inicial das séries:** quem treina 2 dias e quer peito ficou com 65 programas a mais acima de 1,5 (1.955 → 2.020 de 136.125), porque a 4ª série do supino do foco sai da distribuição inicial, e a trava nova só vale no laço das séries.
- **O 4º exercício do foco quando o dia tem tempo e já está no número máximo de exercícios:** é o que deixa o avançado de 2 dias de 75 ou 90 min com o foco abaixo da meta (10.212 programas; +44 neste pacote, porque os dias ficaram mais curtos).
- **O hip thrust para quem marcou dor leve na lombar:** três revisores contaram como carga na lombar; a biblioteca não marca. Pede fonte (tema de dor).
- **A puxada ajoelhado com barra reta como 2ª puxada da semana** (34,7% dos programas, ponderada): os revisores a chamam de exótica. Rever a ordem da lista (a barra fixa ou a remada antes dela) quando houver a versão sentada.
- **A semana leve chega uma semana mais cedo para quem repete exercícios nos dois dias de Superior** (o Bruno): efeito da escolha nova sobre a contagem de "3 treinos sem progresso". Conferir no pacote 5.

**Decidido em 16/11 (pacote 2)**
- A trava do empurrar do foco fica. Os resíduos do pacote foram aceitos; as duas correções de cima ("a razão na distribuição inicial" e "o 4º exercício do foco") continuam para medir.
- **O hip thrust e a dor leve na lombar:** não muda sem fonte. Pergunta para o tema de dor da pesquisa: o hip thrust com barra carrega a lombar a ponto de entrar na lista de articulações do exercício?
- O próximo pacote é o 4 (o iniciante).

## Da sessão "treino para todos", etapa 2, pacote 4 (16/11/2026)

Detalhes em `revisoes/treino-para-todos/pacote-4.md` e `qa.md`. O pacote está no ramo da sessão, esperando a revisão do Gustavo.

**Medido e recusado (não tentar de novo sem motivo novo)**
- **Limite de 6 exercícios por treino para o iniciante de 3 dias ou mais** (com trava de custo): na população, o foco abaixo da meta sobe 179 programas e os programas sem defeito dos 20 cuidados caem de 57,5% para 50,0% (ponderada); na revisão cega de 8 iniciantes, a nota de eficiência cai de 6,21 para 5,96 (o tempo sobra). Os três que sobem são de 3 dias de 60 min: a forma estreita ("3 dias, até 60 min") fica para um teste próprio.
- **"O mais simples primeiro" para o iniciante, com trava de custo:** continua criando dia fraco (4 de 23.470) e troca animação por cartão. Segunda recusa.
- **Proibir a dupla com barra livre e tirar o drop set do iniciante, como último recurso:** continuam criando empurrar ÷ puxar acima de 1,5 e dia fraco em 2 a 4 programas de 23.470. Segunda recusa.

**Para medir depois**
- **As travas de custo ficam por dentro da montagem de uma divisão; a semana remontada pela dor é escolhida por fora:** com dor forte no quadril, 12 a 15 programas a mais ficam com dia fraco ou com empurrar ÷ puxar acima de 1,5 (de 45.375). Levar a comparação "com e sem a regra" para fora da troca de divisão.
- **O iniciante de 5 dias de 60 min** recebe sessões de 26 a 46 min e os revisores acham demais para quem começa (nota 14 a 15 de 30, a mais baixa dos iniciantes). É assunto de divisão e de frequência, não deste pacote.
- **A elevação lateral de um lado só na polia para o iniciante da academia:** ganha da com halteres por ser "estável" (o critério do iniciante vem antes do de dois lados). Rever a marca de estável dos exercícios de polia de um lado só.
- **Quem quer glúteos em casa com halteres** fica sem ponte de glúteo com halter em 30 min (3,5 a 4 séries de glúteo): os três revisores apontaram.

**Decidido em 16/11 (pacote 4)**
- A prática do iniciante e a dupla de lombar como último recurso ficam.
- **O limite de 6 exercícios para o iniciante de 3 dias de até 60 min** terá um teste próprio (medida na população e revisão cega só dele), depois do pacote 5.
- O próximo pacote é o 5 (o aviso de "sem melhora").

## Da sessão "treino para todos", etapa 2, pacote 5 (16/11/2026)

Detalhes em `revisoes/treino-para-todos/pacote-5.md`. O pacote está no ramo da sessão, esperando a revisão do Gustavo.

**Para medir ou decidir depois**
- **Recalibrar a janela do aviso de "sem melhora" (4, 8 e 16 sessões) com um export de uso real** (decisão de 02/11): os números são escolha do projeto, sem estudo.
- **Uma vez parado, o aviso se repete a cada treino** (17 de 48 sessões no simulador, nos três níveis). Avisar uma vez e voltar a avisar só depois de outra janela é uma mudança de tela e de regra; não foi feita.
- **Oferecer a revisão do nível aos ~6 meses** (a regra do próprio app reclassificaria): pede estado novo e tela.
- **A carência de 3 semanas depois de uma pausa** deixou de fazer diferença para a estagnação do intermediário e do avançado (a janela só enche depois dela). Rever se a carência ainda precisa existir para esse sinal.
- **Um teste antigo ainda fraco:** "as sessões da semana leve ficam fora da dupla progressão" não distingue a sessão leve que ficou de fora da que contou; precisa de um treino normal depois da semana leve.


## Da sessão "treino para todos", fechamento da etapa 2 (17/11/2026)

Detalhes em `revisoes/treino-para-todos/fechamento-etapa-2.md`. A etapa 2 está fechada no ramo da sessão; a junção com a `main` espera a decisão do Gustavo.

**Feito no fechamento**
- **A marca do ombro:** o agachamento livre com barra e o do Smith passaram a marcar o ombro (`seguranca.dor.programa`; `tests/unit/articulacoes.test.ts`). Sai da pauta do profissional o item "o agachamento com a barra nas costas com dor no ombro" (pacote 0). A panturrilha no leg press com dor no joelho continua lá.

**Para medir ou decidir depois (em ordem de recomendação)**
- **O limite de 6 exercícios para o iniciante de 3 dias de até 60 min: no app e na `main` desde 18/11, com a decisão do Gustavo** (`revisoes/treino-para-todos/teste-limite-6.md`, seções 7 e 8; regra `tempo.exercicios-do-iniciante`). O custo aceito: em cerca de 1 de cada 7 desses iniciantes, a panturrilha, o ombro de trás ou o ombro lateral ficam com um exercício só na semana (4 séries, abaixo da faixa de 6). Para medir depois: dar a esses músculos um 2º exercício dentro dos 6 mexendo na ordem das vagas do dia (o abdômen num dia só foi medido e recusado: melhora 4 programas e aumenta as duplas); e, se o limite se mostrar bom, testar o iniciante de 3 dias de 75 e 90 min (a forma larga foi recusada em 16/11 por causa de quem treina 5 dias).
- **Com 3 focos ou mais, a série que sobra não deveria ir para o braço enquanto a perna está no mínimo:** o Bruno foi a única pessoa com nota menor na revisão final (eficiência 5,7 → 5,3; bíceps de 12,5 para 13,5 séries, pernas com 8).
- **Quem tem muito tempo fica com dias curtos** (a Carla: dias de 43 a 48 min em 75): o teto de séries segura o tempo que sobra. Decidir o que fazer com a sobra (mais um exercício? outro teto para o avançado?).
- **Pernas sem equipamento com dor forte no ombro: dia acima do tempo.** 4 programas de 45.375 (quem só tem o Smith) passaram a receber esse treino com a marca do ombro; o defeito é o de quem não tem equipamento (dia de 51 a 54 min em 45; 34 em 30). O corte de tempo não alcança esse dia.
- **A rosca Scott com dor forte no ombro:** 2 de 3 revisores contaram como carga no ombro; a biblioteca não marca. Pede fonte, junto com a pergunta do hip thrust e a lombar (pacote 2).
- **Com dor forte, o app tira o grupo inteiro** (dor 7 no ombro: peito, costas e ombros com zero série). Os revisores pedem movimento adaptado (amplitude, pegada). O app não diagnostica; qualquer mudança aqui passa pela pauta do profissional.
- **Para o objetivo de força, a escolha entre barra e halteres** (a Marina ficou sem supino com barra e sem desenvolvimento): pede fonte.
- **Idade e equilíbrio:** a flexão de joelho na bola suíça e a panturrilha no degrau para o Gilberto (67 anos). O app não pergunta nada sobre equilíbrio; ligado à decisão 7 da proposta ("tenho 60 anos ou mais"), que ficou em "não agora".

**Na junção com a `main`**
- **Para o design rever (17/11):** o nome das fases na barra de tempo do guia em tela estreita. A correção de uma linha em `src/styles.css` (autorizada pelo Gustavo) resolve o goblet com zoom de 200%, não a causa (`revisoes/treino-para-todos/pedidos-ao-design.md`, item 9).
- **Lição da junção (17/11):** antes de mandar qualquer coisa para a `main`, rodar o que a verificação automática roda (`npm run lint`, `npm run typecheck`, `npm run test:cobertura` e `npm run test:e2e`), e não só `npm run check`. Com a cobertura ligada os testes ficam mais lentos: um teste do gerador estourou os 5 s lá e passou aqui. Vale também olhar os testes de propriedade que ficam perto do limite (os de `equipamento-minimo.test.ts` levam cerca de 2 s cada, com o limite padrão de 5 s).
- **Passo 1, feito em 17/11:** a `main` está dentro do ramo (três junções no dia), com `check`, testes de tela, a medida da população e a auditoria conferidos (`revisoes/treino-para-todos/fechamento-etapa-2.md`, seção 9.1).
- **As 13 frases das regras que a etapa 2 criou ou mudou: aprovadas pelo Gustavo em 17/11** (`revisoes/treino-para-todos/frases-das-regras.md`). As de `tempo.sobra-series` e `tempo.corte` entraram na lista das regras longas do teste e recuperaram os limites que tinham perdido. A sessão de textos pode rever a redação.
- **Passo 2, feito em 17/11, com o ok do Gustavo:** o ramo foi juntado na `main`, sem forçar (`revisoes/treino-para-todos/fechamento-etapa-2.md`, seção 9.2).

## Do frontend novo (13/11/2026)

O que sobrou da reconstrução na direção "Placar" (`devlog.md`, "Frontend novo"; conferência em `revisoes/frontend-novo/qa.md`).

**Do revisor independente** (`revisoes/frontend-novo/revisao-bloco-2.md`; os números são os do parecer)
- **23. A etiqueta "FIRME" no palco do guia** não se explica (é a respiração). O texto vem do motor: pedido 5 em `pedidos-ao-dominio.md`.
- **25. Legenda do modo Técnica com duas amostras da mesma cor** ("linhas de referência" e "articulações", o mesmo verde): diferenciar pela forma (traço e círculo). As amostras usam as cores do desenho do Boneco.
- **26. Linha de controles do guia**: pausar, voltar e "Lento" ficam à esquerda, com a vista (Lateral, Frontal) na linha de baixo; e o cartão marca "escolhido" de 3 jeitos (bloco preto, traço sob a aba, negrito na lista de erros). Pede um redesenho do cartão do palco.
- **29. Folha do "por quê?"**: o texto da regra é o maior elemento e traz referências internas ("revista no R2"); o link "abrir a fonte" quebra no meio e tem cerca de 18 px de altura; fonte "título não conferido" aparece para a pessoa (pedido 8).
- **31. Acessibilidade, o que faltou**: depois de salvar a série, o foco cai no corpo da página (deveria ir para o descanso); o botão "Série feita" desligado sai da ordem de foco (hoje a frase "Falta…" fica logo abaixo dele); no guia, nada recebe o foco ao abrir; o nome do exercício vem depois do palco na ordem de leitura.
- **32. Miudezas**: "Calibração: Ficou pesada: …" com dois dois-pontos (pedido 6); as notas de dor de 0 a 10 quebram em 6 + 5; ícones de 20 e de 24 px na mesma barra; na tela invertida do fim do descanso, a miniatura continua clara e uma folha aberta sai no tema normal; "Desmarcar tudo" ligado sem nada marcado; o título da folha "Trocar só neste treino por:" termina em dois-pontos.
- **10 (em parte). "Senti algo" em 320 px**: a nota de dor de 0 a 10, o uso mais comum, fica abaixo da dobra da folha, depois das 7 opções; e encerrar o treino por um sinal de alerta não pede confirmação (pedido 7).
- **22 (em parte). Linha do tempo do guia**: o cursor passa por cima das palavras "descida" e "subida".
- **30 (em parte). O guia completo sem estado de carregando nem de erro**: tela em branco enquanto carrega; se um arquivo de texto falhar, cai na tela de erro (pedido 9).

**Do que só eu conferi**
- **Revisão independente dos outros blocos (feita em 13/11/2026)**: dois pareceres, 85 achados, nenhum bloqueio; 37 corrigidos, 18 em parte e 30 não feitos (`revisoes/frontend-novo/qa.md`, seção 6.2). O que sobrou está logo abaixo.
- **O "selo" atrás do "por quê?"**: a proposta B2 previa um "por quê?" por bloco, juntando as regras do bloco. Ficou feito no treino (reserva, sugestão de carga) e na prescrição do guia; em "Sobre o programa", na folha do exercício e na semana, o selo continua no fim de cada frase.
- **Contraste dos fundos cinza**: o fundo do botão secundário e dos botões de valor (#E9E9E6 sobre #F6F6F4) passa nos testes de texto, mas é fraco como forma sob luz forte. Opção: uma borda fina na cor da borda.
- **Celular de 320 × 640**: o registro da série não cabe em 75% da tela, então a tela rola e o palco fica em cima, sem as abas dos modos (que seguem no guia completo, pelo livro do cabeçalho). Emagrecer o registro nesse tamanho devolveria as abas.
- **O conferidor de tokens não olha letra nem largura**: o botão principal usa um 9º tamanho de letra (1,1875rem), fora dos 8 tokens, e passa.
- **O Lighthouse acusa uma linha da lista meio coberta pela barra presa** (início 97, Meus dados 96 de acessibilidade): dar à lista uma folga no fim, do tamanho da barra presa embaixo, para a última linha visível nunca ficar pela metade sob ela.
- **Um teste intermitente**: "o cartão de texto que não baixou avisa, tenta de novo e, se o navegador guardou a falha, oferece recarregar" (`correcoes-auditoria.spec.ts`). Contagem de 13/11/2026 na máquina da sessão: falhou em 4 das 6 rodadas em que `npm run test:e2e` rodou logo depois de `npm run check`; passou nas outras 11 rodadas completas (3 delas com o rastro ligado), em 15 repetições sozinho e nas 5 verificações do GitHub. Na falha, 5 s depois do toque em "Recarregar o app" a tela ainda era a de antes de recarregar. É compatível com a recarga passar de 5 s com a máquina ocupada, mas a causa não foi vista num rastro. Opção: dar ao teste uma espera maior depois de recarregar (a conferência continua a mesma). Não se sabe se já acontecia antes desta sessão. **Feito em 17/11/2026**: o teste passou a esperar o recarregamento terminar (15 s no máximo); o que ele confere não mudou. Tinha falhado em 2 rodadas completas seguidas naquele dia e passou na rodada final.
- **Não medido**: o app instalado num iPhone e num Android de verdade (tudo foi conferido no Chromium, em tamanhos simulados); o leitor de tela de verdade (TalkBack, VoiceOver).

**Da 2ª rodada de revisão** (`revisoes/frontend-novo/revisao-inicio-fim-semana.md` e `revisao-cadastro-dados-locais.md`; os números são os dos pareceres)
- **Uma decisão do Gustavo ainda aberta**: o fundo cinza dos botões secundários (13), com a comparação em `revisoes/frontend-novo/capturas/decisoes/3-botoes-cinza-*.png`. Já tomadas em 13/11/2026: o escolhido em contorno no cadastro e no equipamento (I4); o selo "fonte" nas frases que não são regra de treino (I6 e 24); e "Voltar ao início" como ação principal do fim do treino, presa embaixo (16).
- **Início**: a ação de ajuste do programa gera tudo de novo num toque, sem confirmar nem desfazer (9); a folha "Avisos" com um aviso só repete o título "Ajustes possíveis" (26); "Semana 1" (do programa) logo acima de "A sua semana" (do calendário) (38); as abas não mostram qual dia já foi feito na semana (39); a miniatura do Boneco na lista tem 64 px, e antes tinha cerca de 96 (42); "Sobre o programa" repete o que ficou abaixo da meta em 3 lugares e tem a linha solta "Corpo todo A/B/C." (37); a ação principal é a última na ordem de foco (40).
- **Fim e semana**: "Hoje foi: (opcional)" e "Nada vem marcado." (32); a semana sem treino não tem link para o treino (33); as linhas de "Sua evolução" não mostram a última série (35); o "↑" das marcas é um caractere, não o ícone (30); o tom do "mantendo" nas barras tem contraste baixo (13).
- **Cadastro**: "Refazer a triagem" passa pelos 4 passos do cadastro (I1); os botões da triagem ficam depois da lista das 9 condições, e há 2 selos na tela (I5); o "código de convite" da foto não é explicado e a folha da foto não tem ação principal (I11); "Gerar meu programa" sempre aceso, sem dizer com o que vai gerar (A5); "Item por item" não mostra que está aberto (A6); a busca sem a lupa e sem anunciar "Nada com…" (A7); cartões de item com faixa vazia e nomes em alturas diferentes (A8); a folha dos halteres com grupos colados e "Pronto" que fecha em branco (A10); duas perguntas seguidas no equipamento e três ao editar um local (A4); os dias por semana em 3 + 2 esticados em 390 px (A1); a barra de progresso cheia no passo 4 (A21); a caixa "Seu nível" com cara de opção (A22).
- **Meus dados, locais, termos e erro**: o texto de privacidade ocupa metade da 1ª tela de Meus dados (I7); "Importar dados" não diz que substitui tudo nem oferece guardar antes (I13); a confirmação de apagar tem três saídas, e depois de apagar não há "dados apagados" (A13); o campo de arquivo tem rótulo diferente do nome acessível (A14); não há como apagar um local (A16; já não havia antes); na tela de erro, título e botão com o mesmo texto e o link dos termos com menos de 44 px (A18); o mesmo aviso do navegador em 4 lugares (A26).
- **Miudezas das duas**: a área de toque do selo invade a 1ª opção logo abaixo (A3); cantos aninhados de 8 dentro de 8 (A24); aspas retas em 3 textos (A23); as 9 caixas de "Quais valem" sem `fieldset` e `legend` (A25); no tema escuro a folha tem a cor da página, só com uma linha fina em cima (A20).

**Pedidos ao domínio e ao conteúdo**: os 12 itens de `revisoes/frontend-novo/pedidos-ao-dominio.md` (título curto dos avisos, nome curto do exercício, legenda da trajetória por exercício, a reserva em palavras, o rótulo da respiração, a frase da calibração, confirmar o encerramento por sinal de alerta, fonte não conferida, o índice de textos do guia, um nome só para a série de acerto, a saída "volto depois da avaliação" na triagem que pausa, os textos das fases e dos porquês).

**Para conciliar com a `main`**
- `package.json` ganhou o comando `conferir:tokens`; `vite.config.ts` trocou a cor de fundo do app instalado e incluiu o arquivo de licença dos ícones; `index.html` pré-carrega a letra nova. Os três ficam fora da lista do que a sessão podia alterar e foram mudados no mínimo necessário.
- `scripts/icones-app.mjs` (fora da lista) continua gerando o ícone índigo; o ícone novo sai de `scripts/design/frontend-novo/icone-app.mjs`. Na junção, vale ficar com um só.

**Estudo dos textos (13/11/2026): etapa 1 aplicada, etapas 2 a 5 abertas**
- O estudo, as referências e as 10 regras estão em `revisoes/frontend-novo/textos/estudo-dos-textos.md`. A etapa 1 (as 11 telas do exemplo) foi aprovada e aplicada em 13/11/2026: de 6.311 para 5.019 palavras à vista nas 41 telas medidas, de 55 para 30 blocos longos e de 63 para 16 selos à vista.
- **Falta:** etapa 2 (o resto do texto das telas: experiência, equipamento, editar local, tela de erro, avisos de instalar e de cópia, rótulos longos); etapa 3 (o guia: o que fica aberto e o que fica a um toque); etapa 4 (frases do domínio e do conteúdo, em sessão própria: título curto dos avisos, porquês mais curtos, um nome só para a série de acerto); etapa 5 (termos e folha da foto em camadas, com revisão jurídica).
- **Para conferir com gente de verdade:** os estudos de leitura usados são de computador, e esconder texto pode piorar para quem não toca. Vale observar 2 ou 3 pessoas usando a abertura e o início e ver se acham "o que o app não faz", "Como ler o seu treino" e os avisos de "Sobre o programa".
- **Conferir a margem a 206 px antes de juntar com a main**: `MARGEM=1 node scripts/design/frontend-novo/olhar.mjs <pasta> 206x420 claro <telas>` lista o que passa da margem da página. Em 13/11/2026 uma tela passou nos testes locais por 2,6 px e falhou na verificação do GitHub, onde a letra renderiza um pouco mais larga. Vale virar um teste de verdade (uma folga mínima de alguns pixels no cenário de zoom de 200%).

## Da animação nova (14 a 16/11/2026)

O que sobrou de refazer as 90 animações no motor novo (`devlog.md`, "Animação nova"; a conferência, animação por animação, em `revisoes/animacao-nova/qa.md`; o estado de cada uma em `revisoes/animacao-nova/andamento.md`).

**Decididas pelo Gustavo em 16/11/2026** ("Não quero olhar mais nenhuma, pode ligar a opção, tirar o motor de hoje, e fazer o resto necessário")
- **A abdução sentada com mini band** foi aprovada depois de um ajuste que ele pediu (de frente, a mão aparecia dentro da faixa; agora a coxa que abre a esconde). Com ela, as 90 estão no app.
- **As 67 aprovadas por delegação** ficam como estão; as imagens de todas continuam em `revisoes/animacao-nova/quadros/` e `prototipos/`.
- **O cor de pele** virou a opção de "Meus dados" → "Estilo do Boneco" (o cinza é o padrão). Quem tinha a Silhueta ou outro desenho de antes guardado passa ao cinza.
- **O motor de hoje saiu do app**, com o Boneco de antes e a Silhueta: o Worker do Boneco só carrega o motor novo.

**Decisões ainda abertas** (uma por vez, com imagem)
- **A junção com a `main`**: tudo está no ramo `claude/friendly-goldberg-hwf6dl`; falta o ok dele.
- **O segundo corpo**: a tabela da mulher existe e a conferência roda nela; duas regras falham na `remada-baixa` e duas na `remada-apoiada`. O app usa só o corpo do homem.
- **Do cor de pele**, que entrou com as recomendações da proposta sem ele olhar uma a uma: o secundário num tom claro do vermelho (no cinza é laranja); um tom de pele só; e, no tema escuro, o short claro com pouco contraste contra a pele.
- **Do corpo**: a ponta do trapézio 4,9 cm acima de onde a fonte diz; o abdômen que termina na cintura; o glúteo médio e as outras porções que o desenho não separa; a forma do músculo engrossar ao encurtar.

**O código do motor de hoje continua no repositório, fora do app**
- `src/engine/` (menos a pasta `novo/`) não é mais carregado por nenhuma tela de produção, mas ainda serve a ferramentas: a auditoria de anatomia (`npm run auditoria:anatomia`), a pessoa dos cartões de equipamento (`scripts/desenhos-equipamento/realista/pessoa.mjs`), as folhas de comparação "hoje × novo" (`scripts/animacao-nova/prototipos.mjs`, `antes-e-depois.mjs`) e o laboratório do Boneco (`/lab/boneco`, que só existe em desenvolvimento e nas prévias). Os testes dele continuam rodando (`tests/unit/` e `tests/motor/equivalencia.spec.ts` e `estilo-a.spec.ts`, com as linhas de base).
- **Para apagar de vez**: levar a auditoria de anatomia para o motor novo (hoje ela confere um desenho que o app não mostra mais; a conferência nova já mede se o músculo realçado é o do conteúdo), trocar a pessoa dos cartões, aposentar o laboratório e as folhas de comparação, e então apagar o código, os testes, as três linhas de base antigas e as regras de CSS do desenho de antes em `src/styles.css` (`.estilo-a`, `.estilo-b`, `.ea-*`, `.eb-*`).

**O que não ficou no nível**
- **Erro de ritmo sem desenho**: "Quicar embaixo", da panturrilha no degrau, não foi desenhado (o motor novo ainda não muda o tempo das fases por erro; ideia: `fases` opcionais por erro na ficha e em `cena.ts`). Nesse erro o app mostra o movimento certo.
- **Face pull com elástico**: os antebraços não chegam à vertical.
- **De três quartos, na abdução com mini band**, aparece entre as pernas um pedaço solto do trecho de baixo da faixa.
- **A legenda do modo Técnica fala de "articulações"**, que o desenho novo não marca com bolinha (só o ponto de cada rótulo).
- **A primeira volta de seis animações é pesada** (abdução deitado e com caneleira, ponte com os pés na bola, panturrilha no chão e no degrau, stiff de uma perna): de 12 a 27 ms por pose no computador, o que num celular lento dá uma primeira volta aos trancos; da segunda em diante o desenho já está guardado. A conta por quadro é uma medida da pele contra o piso a cada pose (`pernaNoPiso`, em `quadril-deitado-de-lado.ts`, e parecidas).
- **Pintura por profundidade**: o corpo é pintado parte por parte, cada parte numa profundidade só. A cadeira e as colunas de cenário ficam sempre atrás do corpo (`cenario`), e a mini band decide sozinha o que as pernas escondem. Uma pintura por profundidade de verdade dispensaria esses casos.
- **Rótulo só aponta para ponto do corpo**: não dá para apontar para uma peça (a faixa, o banco).
- **Sem revisor independente por animação**: a revisão independente foi do corpo e das regras do motor. Nas animações por delegação, quem fez foi um subagente e quem conferiu foi quem integrou.

**Medidas**
- **Provisórias**: 6 do corpo e 42 dos objetos seguem sem fonte lida (`revisoes/animacao-nova/tabelas.md` marca cada uma).
- **Não medido**: num celular de verdade (tudo foi medido no Chromium, com a CPU 4 vezes mais lenta); o Lighthouse do guia; a memória com a animação na tela.
- **Peso**: os textos de fonte das fichas de movimento vão no pacote de cada exercício; tirá-los economiza cerca de um terço do motor (36 kB contra 49 kB compactado). A tela do programa baixa 275 kB de código na primeira visita (eram 209 kB com o motor de antes), e o limite do teste (`tests/e2e/orcamento.spec.ts`) subiu de 220 para 285 kB. Caminhos para baixar: tirar os textos de fonte; ou desenhar as miniaturas na hora de publicar, para a tela do programa não precisar do motor. O app instalado guarda 668 arquivos (3,8 MB; eram 4,1 MB com os dois motores).

**Ideias**
- **Dizer em que nível pôr o banco**, por modelo de banco (pedido do Gustavo em 15/11; `revisoes/animacao-nova/pedidos-ao-conteudo.md`, item 3).
- **Refazer os cartões de equipamento fora de medida** no gerador realista, com a folha de comparação (previsto na seção 6 do prompt da frente; não foi feito).

**Pedidos ao conteúdo**: os 6 itens de `revisoes/animacao-nova/pedidos-ao-conteudo.md` (o ângulo dos cotovelos no supino; os músculos que a conferência mostra diferentes; o nível do banco; "meio passo" da torre na puxada; "quase nenhuma tensão embaixo" no agachamento com elástico; e os que vieram das famílias). Nada foi alterado em `src/conteudo/`.

**Para conciliar com a `main`**
- Fora da lista do que a frente podia alterar, mudaram no mínimo necessário: `package.json` (o comando `conferir:animacao`), `vite.config.ts` (o Worker em módulos, para carregar cada exercício só ao abrir), `src/main.tsx` (as duas folhas de estilo do motor novo), `.gitattributes` (os registros de uma linha por item) e três testes que esperavam o desenho de hoje (`tests/e2e/guia.spec.ts`, `tests/e2e/correcoes-auditoria.spec.ts`, `tests/unit/ids-do-desenho.test.ts`).
- Em `src/features/`: o Worker do Boneco (só o motor novo), o pedido com o tema da tela, a preferência de desenho (`app/estiloBoneco.ts`, agora `cinza` ou `pele`), a folha "Estilo do Boneco" de Meus dados e, no guia, o nome das vistas e a legenda. `src/domain/`, `src/storage/`, `api/`, as personas e o `CLAUDE.md` não mudaram.
- **Depois de mudar um exercício do motor novo**, regravar as tabelas calculadas de antemão: `node scripts/animacao-nova/preparo.mjs`.

## Da sessão de textos (16 e 17/11/2026)

O que sobrou do corte de texto (`devlog.md`, "Bem menos texto"; o registro das decisões em `revisoes/textos/proposta.md`).

**Para decidir com o Gustavo** (uma por vez, com imagem)
- **A junção com a `main`**: feita em 17/11/2026, com o ok dele ("pode juntar com a main"), por avanço direto, sem pull request.
- **As frases das regras em "Entenda o treino"**: aprovadas e aplicadas em 17/11/2026 (`src/conteudo/frases-das-regras.json`; `devlog.md`, "As regras em linguagem simples"). Os guias de redação e de revisão ficaram em `revisoes/textos/frases-das-regras/`, para as regras novas: toda regra nova precisa da sua frase, e o teste `tests/repo/frases-das-regras.test.ts` falha sem ela.
- **Achados da revisão das frases, nas regras**: arrumados em 17/11/2026, a pedido dele ("faça o necessário para arrumar os achados"). `progressao.reduzir` passou a remeter à regra da nota de dor (o app sempre reduziu 10–20% com dor); `descanso.piso` virou "≥ 60 s"; `selecao.elastico-ampliado` diz "os 8"; `volume.semanal.minimo` diz o que o mínimo faz; `rir.calibracao` e `volume.manutencao.piso` dizem que ainda não estão no app; e os sinais de cauda equina ganharam palavras simples na regra e um sinal no "Senti algo", que encerra o treino e manda a um pronto-socorro.
- **O bloqueio depois do alerta do coração**: feito em 17/11/2026 ("pode juntar ao main e fazer o que resta"). `seguranca.alerta.cardiovascular` dizia que o app bloqueia novos treinos até a pessoa confirmar a avaliação, e o app só orientava. Agora o início mostra "Treino pausado por segurança", sem o botão de começar, até a pessoa marcar "Confirmo que fui avaliado e liberado por um médico" (`revisoes/textos/folhas/12-bloqueio-depois-do-alerta.png`). O Gustavo viu a imagem depois de aplicado, não antes: se quiser outra redação ou outro desenho, é só dizer. Dois pontos em aberto: apagar o treino encerrado ("Apagar este treino") também desfaz o bloqueio, o que serve para o toque por engano; e o sinal de cauda equina não bloqueia, porque a regra dele não pede.
- **Uma conferência regra por regra contra o código** ainda não foi feita: as frases simples passaram a mostrar os `valores` das regras, e os revisores só foram ao código nas dúvidas. Os dois casos de regra sem código (`rir.calibracao`, `volume.manutencao.piso`) e o do bloqueio apareceram assim; pode haver outros.
- **A nota de dor no "Senti algo"** ficou mais abaixo na folha com o sinal novo (em 390 × 844, precisa rolar para ver os números).
- **A medição de palavras** (`scripts/textos/`) não foi refeita depois das frases das regras, do sinal novo e do bloqueio: os resumos em `revisoes/textos/depois/` são de antes delas (commit `2784be0`). O roteiro pode precisar de ajuste: as frases novas não estão classificadas, e um roteiro que encerra o treino por dor no peito agora encontra o início bloqueado.
- **As outras frases que vêm do domínio** (avisos do programa, porquês de cada exercício, fases, ajustes possíveis): agora aparecem só em "Entenda o treino" e na folha de ajustes, e continuam longas.
- **A caixa de consentimento da foto e os termos** ficaram inteiros por decisão (opção A). A opção B (resumo à vista, o resto a um toque) está em `revisoes/textos/folhas/9-foto.png`, se ele quiser rever.

**Achados**
- **"Entenda o treino" baixa o arquivo das regras e o das fontes assim que abre**, e não só quando o bloco "Todas as regras e as fontes" é aberto (o comentário em `Entenda.tsx` diz o contrário). Não quebra nada; custa um download a mais nessa página.
- **"Última cópia: nenhuma cópia ainda"** (Meus dados) é uma frase do domínio (`textoUltimaCopia`) que ainda dá para encurtar.
- **As mensagens de validação de Experiência e Rotina** não entram na medição: o roteiro não chega a elas.
- **`scripts/design/frontend-novo/capturas.spec.ts`** (o roteiro de fotos de 13/11) só foi atualizado em parte para a estrutura nova; o roteiro em uso é o de `scripts/textos/`.
- **A conta do início** na comparação carrega o texto que foi para "Entenda o treino" (as telas "Sobre o programa" e "Como ler" mantêm o nome antigo para casar com a medição de antes).

**Não medido**: o leitor de tela de verdade nas telas novas (a página "Entenda o treino" e os nomes acessíveis que ficaram no lugar do texto) e um aparelho de verdade.

## Das animações restantes (20/11/2026)

O que sobrou de animar os 81 exercícios que eram cartão de texto (`devlog.md`, "As 81 animações restantes"; o estado de cada uma em `revisoes/animacao-nova/andamento.md`, a partir de "As animações restantes"; o plano em `revisoes/animacoes-restantes/plano.md`; as notas em `revisoes/animacoes-restantes/notas-para-o-fechamento.md`).

**Ligar as fases A, B e C no app** (decisões do Gustavo: "liga por fase", 17/11; a fase A só depois da sessão do desempate, "pode seguir com a sua recomendação", 18/11)
- **Antes de tudo, a sessão do desempate** (`prompts/sessao-desempate-do-gerador.md`): com as 81 animadas, o último critério do gerador ("o que o guia já mostra animado") deixa de separar alguém, e a ordem alfabética do nome interno passa a decidir. Na amostra de 3.751 programas do estresse, 82,5% mudam com as 81 ligadas (`revisoes/animacoes-restantes/efeito-no-treino.json`). Essa sessão avisa aqui quando a fase A puder ser ligada.
- **O que a ligação pede, a cada fase** (plano, seções 4, 6, 7 e 8): o `animacaoId` dos exercícios em `src/domain/biblioteca/exercicios.json` (a única mudança permitida em `src/domain/`); o texto do guia de `revisoes/animacoes-restantes/textos/<id>.json` no lugar do cartão em `src/conteudo/exercicios/<id>.json`; os ids no catálogo do guia (`src/engine/novo/dados/catalogo-do-guia.json`) e fora de `ESPERAM_A_LIGACAO` (`src/engine/novo/aprovados.ts`); o efeito nas personas mostrado ao Gustavo em português simples ("a Ana passa a fazer X no lugar de Y") e, só depois do ok dele, os instantâneos do gerador e os testes das personas regravados; `npm run auditoria`; os testes que protegem o cartão de texto (`tests/unit/conteudo.test.ts`, a lista `SEM_DESENHO` de `tests/unit/motor-novo-ponte.test.ts` e os de ponta a ponta que usam um cartão como exemplo: `treino.spec.ts`, `correcoes-auditoria.spec.ts`, `seu-treino.spec.ts`); e o peso da tela do programa (`tests/e2e/orcamento.spec.ts`), porque o dia passa a trazer as peças novas e a folga é pequena.
- **Duas decisões que a ligação leva ao Gustavo:** o campo "como registrar e subir a carga" (`carga`), que o guia animado não tem (recomendação: manter, com um campo novo na tela do guia); e o cartão de texto (`CartaoTexto`) como reserva para a animação que não carrega (recomendação: manter, com um teste que force a falha).
- ~~**O texto do guia de quatro exercícios do C3 não foi escrito**~~ feito em 20/11/2026: `abdominal-maquina`, `coice-polia`, `abducao-polia` e `remada-invertida` ganharam o texto em `revisoes/animacoes-restantes/textos/`, como os outros 77; `scripts/animacao-nova/conferir-textos-restantes.ts` confere os 81 (a lista `PARCIAIS` ficou vazia). Dois itens novos da remada invertida (a trava de segurança no smith e a altura da barra) estão em `revisoes/animacoes-restantes/pedidos-ao-conteudo.md`, seção 1.

**O pintor por pares** (`revisoes/animacao-nova/estudo-do-pintor.md`, "Etapa 2"; a lista em `src/engine/novo/pintor-ligado.ts`)
- **Ligado em 17 animações** (lote 1, 5; lote 2, 12), todas aprovadas pelo Gustavo pelas folhas; o `coice-maquina`, do lote 2, ficou em revisão pelo tipo de máquina até 21/11, quando o Gustavo escolheu a de quatro apoios.
- **Os lotes 3 a 6** (12, 13, 13 e 15 animações, na ordem da tabela do estudo): a folha e a folha-resumo de cada lote, a conferência de cada animação e o ok do Gustavo; meio dia por lote.
- **O `voador`** (e a `hiperextensao`) só entram com o ajuste do pintor (`pecaComPeca: 'contorno'` e `contatoNoRemendo`, em `PADRAO`, desligados), que muda o desenho de três animações do lote 1 já aprovadas (`remada-unilateral`, até 0,71% da figura; `abdominal-declinado` e `triceps-testa-halteres`, até 0,08%). Falta a folha dessas três, o pintor de hoje × com o ajuste, para o Gustavo decidir.
- **As 18 que esperam conserto** (por pares, ganham um achado novo, quase sempre de 1 a 3 cm², na linha em que o corpo encosta na peça): `crucifixo-inclinado-halteres`, `supino-inclinado-polia`, `hip-thrust`, `abducao-caneleira`, `flexao-elastico`, `ponte-kettlebell`, `remada-curvada-elastico`, `abdominal-maquina`, `remada-unilateral-elastico`, `panturrilha-em-pe-maquina`, `coice-caneleira`, `elevacao-halteres`, `stiff-elastico`, `elevacao-lateral`, `aducao-caneleira`, `puxada-frente`, `rosca-polia-costas`, `crucifixo-elastico`. O conserto é no exercício ou na forma 3D da peça, uma a uma (1 a 2 dias); o recorte pela grade de 1 cm e a grade de 0,5 cm no pintor foram medidos e não resolvem.
- **As 4 que não ganham nada** com o pintor (a mesma área pintada errada): `abertura-elastico`, `desenvolvimento`, `pull-through` e `rosca-concentrada`. Não ligar; se a conferência acusar nelas, o conserto é no exercício.
- **As 77 sem achado** ficam desligadas: ligar só mudaria desenho aprovado.
- **O celular de entrada:** com a CPU 6× mais lenta, a primeira volta das máquinas com o pintor engasga (a `mesa-flexora`, 94 de 132 quadros atrasados, até 430 ms; a `aducao-maquina` e o `voador-invertido`, até 265 e 255 ms). O plano B (a ordem de pintura calculada de antemão, só nas máquinas: até 31 kB comprimidos a mais ao abrir o exercício e 1,4 MB a mais no repositório) foi medido e não foi feito; é decisão do Gustavo, se o engasgo pesar.
- **Tirar as correções que sobram** nas animações ligadas (os três `vies` da mão do lote 1), uma a uma, com a conferência.

**Decisões do Gustavo em aberto** (uma por vez, com imagem)
- **`coice-maquina`:** a máquina de quatro apoios (a do cartão do exercício e da ficha da técnica) ou a em pé (a do desenho de equipamento e das fichas da Life Fitness, da Hammer Strength e da Movement). **Decidido em 21/11:** a de quatro apoios ("pode ficar com a de quatro apoios e redesenhar o cartão"); aprovada, e o cartão foi redesenhado.
- **`panturrilha-leg-press`:** a primeira animação com o quadro só na perna (o corpo cortado; campo novo e opcional `enquadra`) e uma vista só, para o tornozelo se ler. **Aprovada em 21/11** ("pode aprovar a só na perna").
- **O ajuste do pintor** e **o plano B do celular de entrada** (acima). **Decidido em 21/11** ("pode seguir assim", "pode aprovar esse e todos os restantes"): o ajuste vale só por animação (`AJUSTE_DO_PINTOR`, em `pintor-ligado.ts`), no `voador` e na `hiperextensao`, que entraram no pintor novo e passam na conferência; o plano B não é feito até alguém reclamar.
- **Os pedidos ao conteúdo** (`revisoes/animacoes-restantes/pedidos-ao-conteudo.md`): **decididos em 21/11, pela recomendação.** Os textos dos cartões foram corrigidos (as travas, o "pise com o pé", os pés do afundo) e os desenhos de equipamento, refeitos. **Fica para a sessão do gerador:** o músculo secundário que a ficha propõe e a biblioteca não tem (seção 2), porque muda o volume semanal contado.
- **A máquina de tríceps de mergulho sentado** como um segundo equipamento (o cartão de hoje era ela; a animação e o cartão novo são a de braço apoiado à frente). Decidir se o cadastro ganha os dois.
- **A junção com a `main`**: nada foi para a `main`.

**Os cartões de equipamento que diferem das peças novas** (`public/equipamento/`, não mexidos; detalhes no pedido ao conteúdo, seção 3)
- **Tríceps na máquina:** o cartão é a de mergulho sentado; a peça segue a ficha da técnica (braço apoiado à frente). Decidir se o cartão muda e se o app precisa de um segundo equipamento.
- ~~**Glúteo na máquina:** o cartão é em pé; a animação é de quatro apoios.~~ Feito em 21/11: o cartão foi redesenhado de quatro apoios.
- **Supino, desenvolvimento e remada articulada na máquina (anilha × pilha):** os cartões são de anilhas; as peças são de pilha, como as fichas e o texto do app.
- ~~**Barra hexagonal:** no cartão os cabos correm ao longo das mangas, a 24 cm; na peça (Rogue TB-1) atravessam o hexágono, a 63,5 cm.~~ Feito em 21/11: o cartão foi redesenhado com a peça.
- ~~**Suporte:** o cartão é uma gaiola; a peça é o suporte aberto que o Gustavo aprovou.~~ Feito em 21/11: o cartão é o suporte aberto.
- E ainda: o abdominal na máquina (no cartão, eixo alto e sem apoio da lombar), a panturrilha em pé (no cartão, um carro na vertical; na peça, um braço que gira) e as cadeiras, a mesa e a panturrilha sentada, menores que as fichas (a panturrilha em pé, as cadeiras, a mesa e a panturrilha sentada foram redesenhadas com as peças em 21/11, `revisoes/animacoes-restantes/cartoes-pernas-rack-e-barra.png`). Recomendação: refazer os cartões com as peças novas, no gerador realista (`scripts/desenhos-equipamento/`), com a folha de comparação.

**Pontos fracos que não foram corrigidos**
- **A conferência automática sai com falha em 45 das 81 novas** (medido em 20/11, todas de pintura; todas aprovadas desde 21/11, quando o Gustavo aprovou o `coice-maquina`), e por isso `npm run conferir:animacao` sai com erro. As 90 antigas não têm falha (38 com aviso de pintura, fio ou peso). O caminho: os lotes 3 a 6 do pintor por pares e o conserto uma a uma do que ele não resolve. Os 4 casos de fio e os 2 de peso dentro do corpo foram corrigidos no mesmo dia.
- **O laço do coice com elástico passa perto da sola do pé** (até 3,6 cm, perto da sola). A conferência de fios não conta o pé e aceita; a regra `cabos-fora-do-corpo-nos-erros` ficou desligada nesse exercício. Contornar o pé pelo tornozelo ou pela ponta piorou a pintura de trás, porque pé e perna são um item só.
- **O cenário pintado atrás do corpo de propósito** (`cenario`): no smith e no glúteo na máquina, de lado, a parte de perto da máquina passa atrás do corpo; no `mergulho`, a estrutura das paralelas também. A conferência de pintura não conta esses casos (são escolha declarada) e o pintor por pares não os toca.
- **A barra reta da polia, de 20 polegadas, é curta para a puxada** (`puxada-barra-reta`): as mãos ficam na ponta dela.
- **A almofada do banco romano** fica 5,4 cm abaixo do mínimo da ficha da Body-Solid (83,6 contra 89 cm), para a barriga do corpo da tabela não entrar nela.
- **Medidas de desenho, sem ficha:** os ângulos da barra W, a argola e o mosquetão da tornozeleira, a guia do smith (uma ficha só), e a altura do assento, o eixo e o braço da maioria das máquinas (derivados do corpo, com o selo `desenho`).
- **Erros sem desenho:** 19 erros, um em cada uma de 19 das 81 animações, mostram o movimento certo com o texto do erro (lista `SEM_DESENHO`): 13 de ritmo e 6 sem consequência visível. A proposta para os de ritmo (um ritmo próprio por erro na ficha do movimento; plano, seção 5) não foi feita.
- **Os pequenos da auditoria das fases A e B** (18 linhas das tabelas por exercício, como rótulos de cotovelo que apontam para o punho) não foram revistos um a um; parte pode ter sumido com as correções de pintura, sem conferência dedicada.
- **A `mesa-flexora` de três quartos** não foi conferida (a vista não é declarada); onde o calcanhar fica pouco acima do rolo, o furo do recorte aparece como dentes de milímetros na borda do rolo.

**Pequenos que sobraram**
- `tests/repo/privacidade.test.ts` passa perto do limite de tempo (5,3 s) quando a máquina está carregada; sozinho, passa. Em 20/11, na rodada completa com a máquina carregada, o teste do que vem calculado de antemão (`tests/unit/motor-novo-ponte.test.ts`) passou dos 5 s; sozinho, passa.
- **O primeiro quadro mais lento:** a `abducao-deitado-mini-band` leva 372 ms no computador e 1,6 s com a CPU 4× mais lenta até o primeiro quadro (`scripts/animacao-nova/tempo-ate-o-primeiro-quadro.mjs`); é o núcleo que mede a pele contra o chão a cada pose, o mesmo da `abducao-caneleira` (387 ms e 1,5 s). Das 81, 10 passam de 500 ms com a CPU 4×.
- No `coice-maquina`, de três quartos, a joelheira é pintada sobre a coxa de apoio e, no erro "Arquear a lombar", o antebraço entra 3,2 cm nas almofadas dos braços (auditoria da fase C); fica para depois da decisão da máquina.
- A cadeira extensora teve o recorte do rolo corrigido e aprovado por delegação em 20/11, mas continua fora do pintor por pares (é do lote 3).

**Os pontos cegos da conferência**
- **A regra de contato de 1 cm** da conferência de pintura (o ponto só conta se a parte que devia aparecer está mais de 1 cm à frente da outra e a mais de 1 cm fora dela) apaga o que acontece na linha em que a pele encosta na peça: o calcanhar que encosta no rolo da mesa flexora, no fim, só é conferido pela regra própria da mesa. O pintor por pares usa a mesma tolerância, então um erro comum aos dois some dos dois.
- **A beira do furo:** onde uma peça é furada para mostrar o corpo (o rolo da mesa flexora e da extensora), a pele que aparece num ponto da grade (0,5 cm) junto da borda do furo não conta.
- **O resto:** a grade de 0,5 cm deixa passar fendas e lascas menores; peça contra peça não é medida; peça sem forma 3D (`g3` ou `C.geo`) não é vista; o desenho cor de pele não é medido.

**Não medido**
- **Num celular de verdade:** o tempo até o primeiro quadro e a primeira volta com o pintor foram medidos no Chromium, com a CPU limitada pelo CDP (4× e 6×), nunca num aparelho. O Lighthouse do guia e a memória com uma máquina na tela também não.

## Da verificação permanente (19/11/2026)

O porquê e a manutenção estão em `verificacao/README.md`.
- **Na `main` desde 19/11/2026** (`b55a98b`), com a verificação do GitHub passando pelo comando novo.
- **Decidir se o portão do envio passa a barrar** (modo exigir em `scripts/verificacao/portao-envio.mjs`): depois de 2 a 3 semanas observando, conferir nos relatos das sessões quantos envios de código saíram sem o `verificar` e se houve alarme falso.
- **A margem de 206 px como teste de verdade** (item 5 da lista): hoje é uma conferência do roteiro com `MARGEM=1`; vale uma folga mínima de alguns pixels nos cenários de zoom de 200%, para não depender de alguém olhar.
- **Se o `verificar` passar de 10 min:** separar os testes de tela por área, para o roteiro rodar só os que o diff aciona antes do commit (o `verificar` inteiro continua antes de enviar).
- **Fora por agora, com o motivo:** o Code Mode (não funciona nas sessões na nuvem; experimental); uma biblioteca de testes de propriedade (os daqui varrem todas as combinações, o que é mais forte que sortear); o `REVIEW.md` (só o serviço de revisão de pull requests do GitHub o lê; o que importa ficou no `CLAUDE.md`).

## Das melhorias da análise crítica, lote M1, a porta (21/11/2026)

O que foi feito está no devlog ("A porta"). Ficou para depois:
- **Os valores do kit típico são opinião, sem fonte** (casa: halteres de 2 a 10 kg e 3 elásticos; condomínio: halteres de 2 a 12 kg, banco sem declinar). O teste com cinco pessoas (o fecho do plano de melhorias) é a hora de conferir: anotar o que cada uma tem de verdade e quantas usam "Meus pesos são outros".
- **"Meus pesos são outros" só pergunta o halter mais pesado.** Quem tem um par só, ou pesos salteados, ainda precisa de "Meus locais" para dizer peso por peso. Se o teste com gente mostrar que isso é comum, a folha ganha "tenho só este par".
- **A saída só existe na lista dos halteres fixos.** Placas de máquina, anilhas e elásticos não têm lista (sobem de degrau em degrau), então não precisam; o kettlebell e a caneleira saem do que a própria pessoa marcou.
- **A linha "Montado para um kit típico" some depois do 1º treino,** mesmo que a pessoa não tenha ajustado nada. Não guarda nada no estado (sai da comparação do equipamento com o kit), e por isso não distingue "conferi e está certo" de "ainda não olhei".
- **No celular de 320 × 568 a abertura fica sem o Boneco,** para o aviso de segurança caber inteiro. Vale rever se o M2 criar um Boneco menor que ainda ensine.
- **O Boneco da abertura mostra sempre o agachamento goblet.** Trocar de exercício a cada visita, ou mostrar um do lugar da pessoa, fica como ideia.
- **O M2 pede um palco do Boneco que sirva ao treino e ao guia;** o Boneco da abertura (`BonecoAbertura.tsx`) é um terceiro uso do mesmo laço de quadros e deve entrar nessa junção.
- **Os roteiros de fotos de `scripts/textos/`** citam linhas de `Inventario.tsx` e o nome antigo "Anilhas e manoplas": não rodam na verificação e não foram atualizados.
- **Um padrão para as anilhas e as manoplas** não foi criado: o atalho de casa deixou de supor halteres de montar, e quem os tem responde os detalhes (com a explicação de "manopla").
- **Carga digitada (22/11):** o campo abre numa folha e a pessoa ainda precisa tocar nele para o teclado subir; pôr o cursor direto no campo economiza um toque. As listas (halteres, kettlebell, caneleira) e as placas não aceitam digitação: seguem pela lista e pelo menos e mais.
- **Halteres de montar ainda pedem a contagem das anilhas** (quem marca o item fora do atalho). A decisão de 22/11 falava das anilhas da academia; se for para valer também aqui, a lista de cargas dos halteres de montar passa a ser livre.

## Da tela do treino, 1ª parte do M2 (22/11/2026)

O estudo está em `revisoes/melhorias/m2/estudo-da-tela-do-treino.md`.
- **O peso da tela do programa tem 3 kB de folga** (287,0 de 290 kB, medido em 22/11 no pacote D2). Estava a 0,4 kB depois da junção com a `main` das animações e passou do limite no D2; a folga veio de tirar do pacote inicial o formulário de equipamento, que tinha entrado com a linha do kit típico. Qualquer coisa nova no pacote inicial come essa folga. Vale achar o que pode sair dele (os textos das regras já estão no backlog) antes do próximo lote que mexer em telas.
- **O Boneco de repouso continua com 13% a 18% da tela.** A ideia B (o guia grande abre sozinho na 1ª vez de cada exercício) foi feita em 22/11. A ideia A (o menos e o mais ao lado do número, que daria uns 22%) não foi pedida.
- **O "já vi" da 1ª vez fica na memória da aba,** não nos dados: fechar o app no meio do 1º exercício e abrir de novo mostra o guia outra vez. Guardar isso de vez pediria um campo novo no estado.
- **A 320 × 568, na folha da 1ª vez,** "Lento" e os ângulos ficam atrás do "Entendi" até rolar.
- **No palco pequeno, as legendas do desenho ficam ilegíveis** (letra de poucos pontos). Com o toque que amplia, elas poderiam sair do repouso e ficar só no grande; mexe no desenho do motor.
- **O ampliado não tem o "voltar ao começo"** nem os erros um a um, que continuam no guia completo (o livro do cabeçalho).
- **Exercícios deitados** (supino, prancha) não foram medidos no estudo: ocupam a largura, não a altura.

## Do pacote D2, nada se perde no meio do caminho (22/11/2026)

O que foi feito está no devlog. Ficou para depois:
- **O "Desfazer" do programa vale só enquanto a pessoa está na tela.** Sair ou fechar o app perde a volta. Guardar o programa anterior nos dados resolveria, com uma versão nova do estado.
- **A volta do alerta vale por 15 minutos.** Depois disso, o toque errado só se resolve marcando "fui avaliado". Vale ouvir quem usa antes de mexer no prazo.
- **O guia completo ainda baixa os textos de todos os exercícios num pedaço só.** A falha deixou de derrubar o app; repartir o pedaço fica para o pacote D4 (peso).
- **A saída da triagem para quem ainda não foi avaliado** (pedido 11) está no lote M6.
- **O histórico não diz em que local cada treino foi feito** depois que o local é apagado: a sessão guarda o código do local, e o nome some com ele.


## Da ligação das 81 animações, resto do M2 (22/11/2026)

O que foi feito está no devlog. Ficou para depois:
- **A Íris tem um dia de 50 min em 45** (1 min acima do limite de 110%) desde que todo exercício tem animação. Na régua inteira o defeito ficou igual. O corte de tempo deixa passar esse caso: olhar no pacote D4.
- **A conferência de anatomia do desenho só cobre as 90 animações do motor de antes.** Levar `scripts/auditoria/anatomia-regras.ts` para o motor novo (D4).
- **O texto "carga" dos 81 guias está nos dados e não aparece no app;** 6 ainda dizem "de cada lado". Ou sai dos dados, ou é reescrito e ganha lugar no guia.
- **Músculos secundários de 6 exercícios** (goblet com kettlebell, agachamento no smith, hip thrust, coice na máquina, coice na polia, voador invertido): pedido aberto em `revisoes/animacoes-restantes/pedidos-ao-conteudo.md`, seção 2. É decisão à parte.
- **Só com halteres, a vaga do ombro de trás pode ficar de fora** quando o único equivalente já entrou no lugar da remada (cenário do achado 10, `tests/unit/locais.test.ts`). O aviso diz a verdade; vale olhar a ordem das trocas.
- **A tela da série a 360 × 640, em exercício de peso do corpo com montagem,** fica sem o Boneco em repouso (o registro ocupa a tela); o guia ampliado continua a um toque.
- **Juntar os três palcos (treino, guia, abertura) num componente só.** Não muda nada para quem usa e mexe em três telas já conferidas: fica para o pacote D4, junto com repartir os textos do guia.
- **No descanso, o Boneco do "a seguir" some em celular baixo (até 700 px de altura),** como já sumia: ali não há o toque para o guia ampliado.
- **O peso da tela do programa está a 2,2 kB do limite.**

## Da conferência regra por regra, pacote D1 (22/11/2026)

A tabela inteira está em `revisoes/regras-x-codigo.md`. Ficou para depois:

**Para o pacote D3 (mudam programas: medir personas e régua antes e depois).** Apontados pelos conferentes com exemplo rodado; a sessão não reproduziu.
- `selecao.peitoral-inclinado`: com 5 ou 6 dias de 30 min e sem banco inclinável, o dia de Empurrar sai com dois crucifixos e nenhum supino.
- `selecao.triceps-acima-cabeca`: 717 de 6.840 programas (todos de 30 min) ficam sem o tríceps acima da cabeça.
- `selecao.complementos`: o tríceps não está nas famílias de complementos (1 exercício onde a regra diz 2).
- `selecao.estabilidade`: 13 dos 21 exercícios de polia não têm a marca "estável".
- `selecao.panturrilha-alongada`: a panturrilha no chão entra com o degrau possível, com foco em pernas.
- `selecao.dia-sem-principal`: o aviso culpa a dor por um dia fraco que já existia sem ela.
- `selecao.aducao-complemento`: no corte de tempo sai o abdominal antes da adução.
- `volume.semanal.minimo`: o foco que já está abaixo do mínimo perde mais séries no corte (1.814 de 10.920 programas com foco).
- `volume.semanal.maximo`: o máximo do nível só vale no tempo que sobra (40% dos programas de iniciante têm músculo acima de 10).
- `volume.equilibrio-coxa`: com divisão escolhida, 95 de 28.224 programas saem da razão.
- `tempo.sobra-series`: a trava do iniciante só vale no 2º passo.
- `tempo.superserie`: a tela do treino não conduz a dupla (cada série ganha o descanso inteiro, e o tempo estimado conta 15 s); o iniciante com pausa no cadastro recebe dupla nas semanas 1 e 2.
- `iniciante.fase-aprendizado`: o iniciante que declara pausa fica sem a fase de aprendizado.
- `readaptacao.gatilho`: a reserva a mais da pausa de 2 semanas volta quando a pessoa muda a rotina.
- `divisao.sem-puxar`: sem equipamento de puxar, a tela da rotina marca como recomendada a divisão errada, e com 6 dias o aviso manda escolher uma opção que a tela não oferece.

**Outros.**
- `rir.serie-efetiva`: o registro vai até "4 ou mais", guardado como 4; separar o "5 ou mais" muda o dado guardado.
- `equipamento.fim-da-escada` e `equipamento.escada-carga-leve`: o aviso de fim da escada e a ordem dos passos só aparecem em "Entenda o treino"; no treino é "Hoje: mesma carga".
- `equipamento.flexao-por-supino`: a flexão com as mãos apoiadas mais alto (inclinada) não existe no app.
- `selecao.item-sozinho-ampliado`: o guia da extensão de joelho com mini-band não diz que a evidência com elástico é fraca.
- De carona do D1, não feito: "Entenda o treino" baixa o arquivo das regras e o das fontes assim que abre, e o comentário em `Entenda.tsx` diz o contrário.
- O pedido 8 de `revisoes/frontend-novo/pedidos-ao-dominio.md` (a fonte "título não conferido" aparece para a pessoa?) segue para o Gustavo.

## Do M4, o descanso avisa (22/11/2026)

**O que só um aplicativo de loja resolveria** (fora do escopo: não é gratuito; `revisoes/analise-critica/decisoes-e-plano.md`, "Avisos do descanso"):
- O descanso visível na tela de bloqueio, contando o tempo (o que o Hevy e o Strong fazem). Não há equivalente para um site.
- A vibração no iPhone. Um site não vibra no iPhone.
- O som do aviso no iPhone com garantia. Há relato de aviso de site que chega sem som (fórum da Apple, 728022); só o aparelho diz.

**Do passo 2, por fazer ou por medir:**
- A entrega do aviso num Android e num iPhone de verdade (a linha C da tabela de `revisoes/melhorias/m4/README.md`).
- O limite de 300 pedidos de aviso por IP por dia é opinião; rever com o uso.
- Se o som de arquivo parar a música no iPhone (linha E da tabela), medir a saída técnica `navigator.audioSession` antes de levar a escolha ao Gustavo.
- Os textos de privacidade já aprovados que dizem que a foto é a única coisa que sai do aparelho (`privacidade.tsx`, a regra `privacidade.foto`, os termos) esperam a frase nova do Gustavo.
