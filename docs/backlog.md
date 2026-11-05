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
- **Chave da Anthropic.** Confirmar que a chave e os convites estão no projeto `treino-mvp` da Vercel, o que atende `treino-mvp-sigma.vercel.app`.
- **Projetos extras na Vercel.** Avaliar apagar `treino-mvp-huks` e `treino-mvp-yej6`, criados em 31/10/2026. Eles repetem cada deploy.
- **Cronometrar o cadastro no celular (critério 1, R1).** O teste automático conta 13 toques e 0 caractere para quem não tem condição nenhuma (sem a tela de equipamento); falta a sua medição de tempo no celular, uma vez, e a da tela de equipamento com "academia completa" (meta: até 15 s).
- **Confirmar a menor anilha da sua academia (T8).** Sem resposta, o app usa 2 kg (opinião).
- **Limite da visão compartilhado** entre instâncias, antes de abrir o app para outras pessoas. Hoje o contador fica na memória de cada instância (`pesquisa/11-decisoes-m4.md`). O Vercel KV foi descontinuado; o caminho é o Redis (Upstash) pelo Marketplace da Vercel.

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
- **As 12 animações do elástico longo esperam o R4 do boneco** (decisão do Gustavo, 04/11: "precisa aprimorar ainda o boneco, em especial a visualização do treino e do erro"). A peça `band` está no motor e a 1ª folha (remada sentada) em `src/engine/exercicios/revisao/remada-elastico.ts`; os 12 têm cartão de texto. São 311 mil prescrições no estresse (bloco F da fila): a família mais pedida sem guia animado. Depois do R4: flexão de joelho, rosca, elevação lateral, crucifixo, stiff, remada, face pull, puxada, tríceps acima da cabeça, desenvolvimento, agachamento e flexão de braço com elástico.
- **Os outros 55 sem animação**, em blocos, com a frequência medida e o custo (`revisoes/catalogo/fila.md`): A) 11 só com halter e banco (321 mil prescrições, nenhuma peça nova); C) 13 máquinas de perna e smith (228 mil; peça nova); B) 9 de polia com acessórios pequenos; D) 10 de barra longa e rack; E) 14 de estações e máquinas de tronco. 21 deles não têm ficha nem cartão.
- **Seção "Diagnóstico do treino-mvp"** (`revisoes/equipamento-minimo/secao-diagnostico.html`): colar na página só pela conta pessoal do Gustavo (gustavogopp@gmail.com ou gustavogopp2@gmail.com), nunca pela da Futurum. Fica no git até lá.
- **Outros objetivos, opção (c) de `pesquisa-v2/12-outros-objetivos.md`:** um marco novo, fora do MVP, com pelo menos um destes: cardio prescrito (saúde e cutting), orientação de nutrição com um parceiro nutricionista, programa de força máxima com periodização e estimativa de 1RM. Pede tema de pesquisa próprio com selos, triagem nova, guias novos e mudanças no `PLANO-MVP.md` e no `CLAUDE.md`; a nutrição traz dado ainda mais sensível (LGPD) e, provavelmente, um profissional responsável. Risco: atrasar o MVP antes da validação com usuários. O Gustavo escolheu a opção (b), a pergunta de objetivo, já implementada.
- **17 fontes do `pesquisa-v2/10-equipamento-minimo.md` ainda fora de `pesquisa/fontes.md`** (resumo lido, chave citada, ficha por escrever): `alizadeh2020`, `andersen2022`, `bello2025`, `carvalho2022`, `ekstrom2003`, `gavanda2026`, `hammert2026`, `heyn2023`, `lees2025`, `martins2013`, `morton2016`, `oranchuk2019`, `schoenfeld2016c`, `snarr2017`, `terada2022`, `tsuzuku2018`, `vargasmolina2026`. Mais 14 marcadas como não verificadas no `10` (`bourne2017`, `callaghan1998`, os quatro `nordico-*`, `patelofemoral2023`, `ponte-plataforma2025`, `ponte-unilateral2017`, `cadeiras-criancas2014`, `moveis-criancas2021`, `flexao-forca1995`, `flexao-punho2018`, `lombar-reabilitacao2008`).
- **Pendências de leitura (o PubMed segue bloqueado na rede da sessão):** Larsen 2025 do leg press (PMID 40113586; criar a chave `larsen2025b`, hoje citado no `04` sem chave) e o título de `kassiano2026` (PMID 41379528: "back squat" nas fichas do agachamento × "smith" em `fontes.md` e no `08`).
- **Correções das animações originais do guia** (`revisoes/catalogo/conferencia/antigas.md`): a rosca na polia (barra reta de largura fixa) está corrigida em revisão, mas as 25 originais são conferidas contra o HTML do guia (`tests/motor/equivalencia.spec.ts`, `motor.json`); aprovar uma correção pede decidir se o guia original deixa de ser a referência dessa animação. Três notas menores sem correção: pegada da barra fixa (1,8× os ombros), joelho de trás do búlgaro (14 cm) e altura dos halteres no stiff (joelho).
- **Medida da fita de suspensão:** o motor não calibra a fita (comprimento fixo pela pose); `scripts/medir-animacao.mjs` imprime o caminho da âncora a cada pegador por pose para o autor conferir. Se uma animação futura pedir a fita esticando (argolas com elástico), a peça ganha a calibração da `band`.

## Da auditoria independente (04/11/2026, Fable)
Detalhes, medidas e o porquê de cada item em `revisoes/auditoria-fable.md`.
- **R4 do boneco, aprovado pelo Gustavo em 05/11/2026 (propostas 1 a 3; prompt em `prompts/sessao-r4-boneco.md`)** (Parte D.3): 1) o erro sobre o certo (folha-piloto pronta em `revisoes/auditoria-fable/erros-piloto.png`; a chave `erroInvertido` já está no motor, desligada); 2) rótulos fora do corpo; 3) a vista do modo Técnica escolhida pelo movimento. Depois: câmera perto do corpo no modo Técnica, vista de cima na adução deitada, mão por cima do disco de frente. Com 1 a 3 aprovados, os 12 do elástico saem no mesmo boneco.
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
- **PubMed** continua bloqueado na rede das sessões: as leituras pendentes de 04/11 (Larsen 2025 do leg press, o título de `kassiano2026`) seguem por fazer.
- **Licença do PAR-Q+** (lida em 05/11/2026, `parq2025`): usar o texto oficial num app exige autorização escrita da PAR-Q+ Collaboration (eparmedx@gmail.com), possivelmente com taxa. Decidir: pedir a autorização (e então usar a versão oficial em português, `schwartz2021`) ou seguir com as perguntas próprias, que a tela já apresenta como "não é o questionário oficial". Vale junto com a revisão do profissional de Educação Física.
- **Textos de segurança a partir do Guia do Ministério da Saúde 2021** (`ms2021`, licença CC BY-NC-SA): as listas oficiais em pt-BR de contraindicações e de condições que pedem acompanhamento (p. 43) podem substituir frases do app, com a fonte citada.

