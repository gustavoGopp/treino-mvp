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
- **Sessão de desenvolvimento:** colar `prompts/sessao-desenvolvimento.md` numa sessão nova. Ela conduz os marcos R5a, R5-CL, R5d, R5-anim, R5b e R5c, um de cada vez, parando ao fim de cada um para a sua revisão (a sessão de próximos passos foi feita em 06–07/11; `revisoes/proximos-passos.md`, parte 3). O R5-anim pode correr numa sessão à parte, junto do R5d, com `prompts/sessao-r5-animacao-corpo-livre.md`.
- **Chave da Anthropic.** Confirmar que a chave e os convites estão no projeto `treino-mvp` da Vercel, o que atende `treino-mvp-sigma.vercel.app`.
- **Projetos extras na Vercel.** Avaliar apagar `treino-mvp-huks` e `treino-mvp-yej6`, criados em 31/10/2026. Eles repetem cada deploy.
- **Cronometrar o cadastro no celular (critério 1, R1).** O teste automático conta 13 toques e 0 caractere para quem não tem condição nenhuma (sem a tela de equipamento); falta a sua medição de tempo no celular, uma vez, e a da tela de equipamento com "academia completa" (meta: até 15 s).
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
  - a máquina de glúteo é genérica, a corda parece um garfo e o hack não tem a versão pendular.

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

O que a auditoria achou e não corrigiu, porque pede uma decisão do Gustavo ou muda uma regra. Em ordem de gravidade.

**Segurança e dados**
- **O id do aparelho da foto vem do cliente** (`api/_lib/pedido.ts`): sem login (fora do MVP) não há como conferi-lo; o que segura o gasto é o limite por IP e o teto mensal na Anthropic. Fica como está. O resto do ponto foi corrigido em 12/11/2026 (cota devolvida, log, tamanho, tempo máximo).
- **Dependências com alerta no `npm audit`** (20; 3 em produção: zod 3, react-router 6; os críticos são do vitest 3, só no desenvolvimento): todas as correções são versões maiores (zod 4, react-router 7, vitest 5). **Fica (decidido em 12/11/2026):** conferido de novo, `npm audit fix` sem `--force` não tira nenhum dos 20 alertas; cada versão maior entra num PR próprio, fora da sessão de correções.

**Regras do treino**
- **A oferta de menos dias aparece depois de uma pausa**, com "você treinou cerca de 1 vez por semana" para 4 semanas sem treino (`acompanhamento/semana.ts`).
- **"Suba dois degraus" quando só existe um degrau acima** (`progressao/index.ts`).
- **`panturrilha-chao` está como bilateral**, mas o texto manda fazer uma perna de cada vez.
- **20 exercícios da biblioteca não têm animação nem cartão** (supino com barra, leg press, mesa flexora, remada com barra…): aparecem como "Sem guia ainda", e o CLAUDE.md pede o cartão de texto.

**Tela**
- **O descanso e a nota de dor pendente se perdem ao sair do treino** (abrir o guia no meio do descanso para o temporizador).
- **Ids repetidos no drop set** (`ControleCarga`: `carga-rotulo`, `carga-kg`) e nas miniaturas (`mh-listras`, os recortes do corpo): o rótulo aponta para o 1º controle.
- **A folha fica fora de `.app`**: a cor dos links e o `prefers-reduced-motion` do CSS não chegam ao conteúdo dela.
- **Uma importação que falha (sem rede, versão nova publicada) fica guardada até recarregar** (`regras/carregar.ts`, `conteudo/cartoes.ts`, `programa/desenhoFora.ts`).
- **Mensagens da foto**: qualquer erro de rede vira "Sem conexão", e a foto que o navegador não abre (HEIC) mostra o texto em inglês.
- **Os termos citam botões que não existem** ("Refazer a triagem e o perfil", "Exportar meus dados").
- **CSS sem uso** (cerca de 25 classes: `.shell`, `.cta`, `.faixa`, `.cartoes-eq`, `.fs-topo`…) e ajudantes repetidos (`faixa`, `tempo`, `dataCurta`, `POR_ID`, três formatadores de carga).

**Repositório**
- **Histórico do git**: os e-mails pessoais e o nome do empregador saíram dos arquivos, mas continuam nos commits antigos. Apagar de lá pede reescrever o histórico. **Fica como está (decidido em 12/11/2026):** reescrever muda todos os hashes, quebra os ramos e os PRs abertos e pede `push --force` na `main`.
- **`scripts/design/**` (74 arquivos) e `scripts/gif/divisao.spec.ts`**: sobras das sessões de design; 8 clicam em "Entendi, vamos começar", que não existe mais. O motor (`src/engine`) segue com `@ts-nocheck` em 101 de 103 arquivos.
