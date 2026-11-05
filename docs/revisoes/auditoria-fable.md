# Auditoria independente do treino-mvp (04/11/2026)

> Feita por outro modelo (Fable), sem ter participado de nenhuma sessão anterior, na branch `claude/focused-shannon-7243on`. O pedido do Gustavo: mapear o projeto, julgar a qualidade dos exercícios, apontar o que falta, olhar a animação como um treinador olha um vídeo do aluno e **decidir e executar** as pendências do catálogo. Tudo o que foi decidido aqui está registrado com o porquê; o que é grande ou irreversível ficou como opção, com a minha recomendação marcada.
>
> **Limites desta sessão.** O PubMed continuou bloqueado (`pubmed.ncbi.nlm.nih.gov` e `eutils` não respondem). Não li nenhum estudo novo: toda afirmação técnica abaixo se apoia nas fontes que o projeto já tem em `docs/pesquisa/fontes.md`, com o selo que elas têm lá, ou está marcada como **consenso** (prática de treinadores, sem estudo) ou **[opinião]** (minha). Nada foi inventado. Não testei num celular de verdade nem com uma mão só.

## Em uma olhada
| O que | Estado ao fim da sessão |
|---|---|
| Exercícios na biblioteca | **139** (eram 135): 66 com animação aprovada, 52 com cartão de texto, 21 sem guia nenhum (eram 21; o agachamento com barra ganhou cartão e 4 entradas novas entraram com cartão) |
| Animações aprovadas | **66** (eram 52): as 14 em revisão foram aprovadas, uma a uma, pela conferência escrita e pela medida |
| Correções de animações antigas | as 2 aprovadas (pike e rosca na polia); o guia original deixou de ser a referência da rosca na polia |
| Gerador | 2 correções de regra, achadas ao medir as entradas novas: o teto semanal já no mínimo de séries, e a ordem dos complementos |
| Programas das personas | a Ana não muda; o Bruno e o Diego ganham a extensão de joelho com elástico (vaga obrigatória); o Diego perde o face pull do dia B por falta de minutos (antes × depois na Parte C) |
| Folha-piloto do boneco | `docs/revisoes/auditoria-fable/erros-piloto.png`: o modo Erros de hoje ao lado de uma proposta, em 6 exercícios (Parte D) |
| Testes | `npm run check` passando (615 unitários, eram 600); projeto `motor` passando com as linhas de base regravadas |

---

## Parte A. O mapa do projeto

**O que existe.** Um app web instalável (PWA), em pt-BR, que monta um programa de hipertrofia com o equipamento que a pessoa tem e conduz cada treino com um guia animado (o Boneco), temporizador de descanso e sugestão de carga. Tudo fica no aparelho; a única função no servidor é a que manda a foto do equipamento para a IA (`api/vision.ts`). O código é dividido em: regras puras e testadas (`src/domain/`), o motor de animação sem React (`src/engine/`), as telas (`src/features/`), os textos do guia (`src/conteudo/`) e o armazenamento no aparelho (`src/storage/`).

**Como o programa é montado** (`src/domain/gerador/index.ts`, função `gerarPrograma`):
1. **Perfil e inventário → o que é possível.** Cada exercício pede capacidades (ex.: "polia alta + corda"); cada item do inventário dá as suas (`src/domain/taxonomia/equipamentos.ts`, 49 itens). Saem os exercícios acima da complexidade do nível, os que a pessoa pediu para evitar e os que carregam uma região com dor acima de 5.
2. **Divisão → dias → vagas.** A pessoa escolhe entre divisões equivalentes para os seus dias (`divisoes.ts`). Cada dia é uma lista de **vagas**, e cada vaga pede uma **função** (ex.: "puxar vertical", "tríceps acima da cabeça"), nunca um equipamento (`funcoes.json`, 22 funções).
3. **Vaga → exercício.** Cada função lista exercícios em **níveis de preferência**; o gerador usa o 1º nível em que há algum exercício possível e, dentro dele, desempata por: dor leve, estabilidade (só iniciante), carga disponível, variedade entre os dias, "prefiro este", animação aprovada e, por fim, a ordem alfabética.
4. **Séries.** Todo exercício começa com 2 séries; depois o gerador distribui séries, uma a uma, para o músculo mais longe da meta, sem passar de 4 por exercício, 10 por músculo por sessão e 20 por semana (série indireta vale meia).
5. **Tempo.** Se não cabe nos minutos: aquecimento só específico, superséries, drop set, menos exercícios, menos séries (`cortarTempo`), sem zerar músculo nenhum.
6. **Porquê e avisos.** Cada escolha grava a regra que a justificou (`regraId`), com selo e fonte; todo músculo abaixo da meta ganha um aviso com o motivo verdadeiro.

**Onde estão as regras e as fontes.** A tabela única de regras é `docs/pesquisa/regras.md` (134 regras, cada uma com selo e chaves de fonte); `src/domain/regras/regras.json` é gerado dela e um teste falha se os dois divergirem. As fontes ficam em `docs/pesquisa/fontes.md`: 233 entradas, das quais 146 com o resumo lido no PubMed, 45 confirmadas só por busca e 42 marcadas como não verificadas. A pesquisa que embasa a escolha dos exercícios está em `docs/pesquisa-v2/04` (por músculo) e `11` (catálogo); a de segurança em `06`; a de progressão em `07`.

**O que é testado e como.**
- 615 testes unitários (Vitest) sobre `src/domain/` e o motor: regras, gerador (inclusive 1.944 combinações de perfil × divisão × minutos × nível × dor, com propriedades como "nenhum músculo acima do teto" e "todo aviso aponta para uma regra"), progressão, triagem, anatomia (biblioteca × texto × desenho), legenda, personas com snapshots revisados. Cobertura de `src/domain/` acima de 96% em quase todos os arquivos (`npm run test:cobertura`).
- 43 testes no navegador (Playwright): cadastro, treino, guia, locais, foto, acompanhamento, e as medidas de toque (≥ 44 px) e contraste em todas as telas, nos dois temas.
- Regressão visual do motor: as 25 animações do guia original comparadas quadro a quadro com o HTML original (`motor.json`), e as novas e o Boneco comparados com a linha de base aprovada (`novas.json`, `estilo-a.json`).
- Testes do repositório: nada de `privado/`, `.env` ou foto versionado; textos proibidos; regras sincronizadas.
- `npm run auditoria`: 149.760 programas fictícios, o praticante simulado de 16 semanas, o inventário com a frequência de cada exercício, a tabela de anatomia, o equipamento mínimo e o mapa do catálogo; duas rodadas têm de dar arquivos idênticos.

**O que ficou fora do MVP e por quê** (`CLAUDE.md`, `docs/backlog.md`): nutrição, login e nuvem, pagamentos, app nativo, social, relógios, cardio prescrito, deload automático, treinador humano e outros objetivos além da hipertrofia (a pergunta de objetivo entrou em 04/11, só "ficar mais forte" muda números). O motivo comum: validar o núcleo (programa certo, guia certo, uso real) antes de crescer, e não entrar em dados mais sensíveis (nutrição) sem profissional responsável.

### Pontos fortes
| Ponto | Onde |
|---|---|
| **Determinismo de verdade.** A mesma entrada dá a mesma saída; não há `Math.random` nem `Date.now` em `src/domain/`; a auditoria roda duas vezes e compara por hash | `src/domain/gerador/index.ts`; `scripts/auditoria/` |
| **Regra com selo e fonte em tudo**, inclusive nos avisos; o app mostra o "porquê" com o nível de evidência | `docs/pesquisa/regras.md`; campo `porque` do programa |
| **Vaga por função, não por equipamento**, com níveis de preferência: é o que permite trocar de local, "prefiro este" e o mapa do catálogo | `src/domain/gerador/funcoes.json` |
| **Segurança medida:** em 112 mil programas com dor, nenhum exercício carrega a região; todo músculo abaixo da meta tem aviso com o motivo | `docs/revisoes/auditoria-treino.md`; `tests/unit/gerador.test.ts` |
| **Anatomia conferida em 3 lugares** (biblioteca × texto × desenho), com testes que travam a coerência | `tests/unit/anatomia.test.ts`, `legenda.test.ts` |
| **Animação só com folha, medida e conferência escrita;** sem animação aprovada, cartão de texto | `docs/pesquisa/animacoes/README.md`; `docs/revisoes/catalogo/conferencia/` |
| **Privacidade no lugar certo:** a foto é reduzida e perde os metadados no aparelho; o servidor não guarda nada e os logs só têm números; teste do repositório contra `privado/` | `src/lib/imagem.ts`; `api/vision.ts`; `tests/repo/privacidade.test.ts` |
| **Acessibilidade medida por script:** 0 toque abaixo de 44 px e 0 texto abaixo do contraste mínimo em todas as telas, nos 2 temas, a 360 px; `prefers-reduced-motion` respeitado no guia | `tests/e2e/telas.spec.ts`; `src/features/guia/Guia.tsx` |

### Riscos
| Risco | Onde | O que fiz ou proponho |
|---|---|---|
| **A técnica de quase todo exercício vem de "consenso"** (o manual da NSCA, não verificado, é a referência de técnica em quase todas as fichas). A evidência de hipertrofia decide a *escolha* do exercício; a *forma* de fazer é prática de treinadores | `docs/pesquisa/animacoes/*.md` | Está dito com honestidade em cada ficha. Fica a recomendação do plano: revisão por um profissional de Educação Física antes do beta aberto (o roteiro do especialista já existe) |
| **Um terço das prescrições sem animação** (33,9% antes desta sessão; medido no estresse) | `docs/revisoes/catalogo/fila.md` | As 14 aprovadas hoje tiram 67,7 mil prescrições dessa conta; o resto está na fila (Parte E.3) |
| **21 exercícios sem guia nenhum**, inclusive o agachamento com barra, que é a 1ª escolha de agachar na academia completa (o dia Inferior da Carla) | `src/conteudo/exercicios/` | Cartão do agachamento com barra escrito nesta sessão, a partir da ficha; os outros 20 estão na fila com "sem ficha nem cartão" |
| **O teto semanal não era conferido no preenchimento das vagas**, só na distribuição de séries: no modelo de 6 dias, três vagas de glúteo somavam 21 já no mínimo de séries | `src/domain/gerador/index.ts` | Corrigido e testado (Parte C) |
| **A ordem dos complementos** deixava um complemento do grupo prioritário (abdução) tirar o único exercício direto de outro músculo (ombro posterior) | `src/domain/gerador/index.ts` | Corrigido: o único exercício direto de um músculo com meta vem antes (Parte C) |
| **Dependências com aviso de segurança:** `zod` (alto: exaustão de memória com coleções grandes) e `react-router` (moderado) | `package.json` | Risco baixo no app (o pedido da API é validado à mão, com limites de tamanho e de número de fotos antes do zod); a correção do zod é uma versão maior (4.x), com mudanças de API: opção para o Gustavo (Parte F) |
| **O R4 do boneco bloqueia 12 animações do elástico** (311 mil prescrições) | `docs/backlog.md` | A Parte D propõe um R4 pequeno e concreto, com a folha-piloto já feita, para destravar |
| **O guia original ainda é referência de 24 animações antigas**, que não têm ficha completa (só a ficha curta de 04/11) | `tests/motor/equivalencia.spec.ts` | A partir de hoje, uma animação original corrigida ganha linha de base própria (lista `CORRIGIDAS`); as outras continuam presas ao HTML até alguém decidir corrigi-las |

---

## Parte B. A qualidade dos exercícios escolhidos

Método: para cada uma das 22 funções de `funcoes.json`, comparei a ordem dos níveis com a pesquisa `04` e `11`, e a fonte em `fontes.md`; conferi os músculos primários e secundários dos 139 exercícios; li o desempate no código; e olhei a complexidade dos 9 exercícios fora do iniciante.

### B.1 Onde a ordem dos níveis segue a evidência
| Função | Nível 1 | Por quê | Selo | Confere? |
|---|---|---|---|---|
| Tríceps acima da cabeça (obrigatória) | francês com halter, na polia, elástico, máquina, kettlebell | braço acima da cabeça cresceu mais a cabeça longa (+28,5% × +19,6%) | um estudo, efeito grande (`maeo2023`) | sim |
| Flexão de joelho | cadeira flexora > mesa > bola/elástico > deslizante/nórdico/suspensão | sentada +14% × deitada +9%; o nórdico cresceu menos que a flexão com o quadril dobrado | um estudo cada (`maeo2021`, `maeo2024`) | sim |
| Panturrilha em pé (obrigatória) | máquina, leg press, step; no chão só no nível 2 | em pé +9–12% × sentada +1–2%; a parte alongada rende mais, e no chão ela se perde | um estudo cada (`kinoshita2023`, `kassiano2023b`) | sim, inclusive o chão no nível 2 |
| Extensora (obrigatória) | cadeira extensora > caneleira (e, desde hoje, elástico) | só a extensora cresce o reto femoral; a caneleira carrega o lado curto | moderada (3 ensaios); consenso para a caneleira | sim |
| Elevação lateral | halteres ≈ polia > elástico | halter = polia em treinados | um estudo (`larsen2025`) | sim |
| Crucifixo (complemento) | voador, polia, halteres > elástico | 1 série de voador ≈ 3 em não treinados; complemento, não substituto | um estudo (`pinto2025`) | sim |
| Glúteo (extensão de quadril) | hip thrust, coice na máquina > ponte, coice na polia, hiperextensão… | hip thrust ≈ agachamento (um estudo) e agachamento > hip thrust (outro); nenhum diz que o hip thrust é melhor | um estudo cada (`plotkin2023`, `barbalho2020`) | sim; o nível 1 é por carga, não por evidência |
| Abdução | máquina, polia > caneleira, mini-band > (hoje) deitado sem carga | abdução cresceu o glúteo médio e mínimo (+4%) | um estudo (`attarieh2026`) | sim |

### B.2 Onde o nível não é evidência, e sim "carga disponível"
Em várias funções, o nível 1 reúne os aparelhos que permitem **mais carga** (barra, leg press, hack, smith para agachar; hip thrust e coice na máquina para o glúteo; polia para o tríceps complemento), e o nível 2 as versões com halter, kettlebell ou o peso do corpo. A evidência diz que **o equipamento não decide o crescimento** (robusta: `haugen2023`, `hernandezbelmonte2023`), então o critério real do nível é a progressão de carga, que é legítima (consenso). **O problema é o texto:** o "porquê" de quem cai no nível 2 diz "sem as opções preferidas no seu equipamento, entra a melhor possível", o que soa como "pior". Para quem só tem halteres, o goblet não é pior que o leg press. **Opção (pequena, recomendo):** trocar o texto por "opções equivalentes para crescer; a 1ª preferência só pede mais carga disponível" quando a diferença entre os níveis for de carga (`porqueDoExercicio`, `src/domain/gerador/index.ts`).

### B.3 Bíceps: o nível 1 é inferência a partir de um estudo
Nível 1: Scott, inclinada, polia por trás do corpo, máquina; nível 2: polia em pé, barra W, alternada, martelo, suspensão, kettlebell. A base (`04`, `11`): inclinada ≈ Scott no total dos flexores, com partes diferentes crescendo mais em cada uma (`kobayashi2026`, um estudo); Scott ≈ polia por trás (`attarieh2025`, um estudo). **Nenhum ensaio comparou essas posições com a rosca em pé comum.** Ou seja: a separação em dois níveis é uma inferência razoável ("posição do ombro muda a parte que cresce"), não uma comparação medida. Não muda nada no treino (todas são equivalentes para o total do músculo, e quem só tem halteres faz a alternada ou a martelo). Registro para o selo não parecer maior do que é: **um estudo + inferência**, e o texto do `04` já diz isso.

### B.4 "Empurrar inclinado" sem banco inclinável vira crucifixo
A função `empurrar-inclinado` tem no nível 2 os crucifixos (polia, halteres, voador) e no nível 3 a flexão. Quem tem só banco reto (a Ana) recebe nessa vaga o crucifixo com halteres, que também é a 1ª opção da vaga `crucifixo`. O gerador evita repetir no mesmo dia e varia entre os dias, então não há erro; mas a vaga que se chama "inclinado" passa a cumprir o papel de "2º empurrar" com um isolador. A evidência do inclinado é fraca (um estudo em não treinados, `chaves2020`; "razoável, não obrigatória"), e o `04` prevê o crucifixo como complemento. **Sem ação**; só o nome da vaga engana um pouco. **[opinião]** Um 2º supino (no chão, com halteres) seria tão bom quanto um crucifixo como 2º empurrar de quem não tem banco inclinável; fica como ideia para o `backlog.md`.

### B.5 Músculos primários e secundários: certos, com duas incoerências pequenas
- A contagem de meia série para o secundário é o método com a evidência relativa mais forte entre os testados (`pelland2026`; moderada). Faz sentido.
- A revisão de anatomia de 02/11 acertou os pontos grandes (posteriores fora da ponte; costas fora dos crucifixos invertidos; adutores em todo agachar). Conferi os 139: a lista bate com a pesquisa.
- **Incoerência 1:** a barra fixa supinada e a puxada com elástico contam só o bíceps como secundário; a barra fixa pronada e a puxada na máquina contam bíceps **e ombro posterior**. O movimento é o mesmo (puxar o braço para baixo e para trás; consenso de anatomia). Efeito medido numa cópia: o Diego muda (a barra fixa vai de 2 para 3 séries no dia A, porque o ombro posterior passa a receber meia série) e o Fábio também. **Não corrigi:** ao tentar, os testes de anatomia mostraram que a mudança puxa o desenho da barra fixa supinada (o ombro posterior teria de aparecer em laranja, com nova linha de base) e o texto do guia (citar o secundário). Não é "pequena e segura"; fica como **opção, recomendo fazer** junto com a próxima regravação da linha de base do Boneco.
- **Incoerência 2:** o mergulho conta o tríceps por inteiro; os supinos e a flexão contam meia. Já decidido pelo Gustavo em 02/11 (manter); sem evidência para mudar. Concordo.

### B.6 Desempate e equivalência
- O desempate (`contextoDeSelecao`) segue a regra escrita, na ordem escrita. A "animação aprovada" como penúltimo critério é uma boa ideia de produto; ela não muda a evidência.
- **Limite do "prefiro este":** a preferência só vale entre exercícios do **mesmo nível** da função. Quem tem leg press e halteres e prefere o goblet não consegue, porque o goblet está no nível 2. Como os níveis são por carga, não por evidência (B.2), isso contraria a equivalência (robusta). **Opção (média):** deixar a preferência puxar um exercício do nível seguinte quando a diferença entre os níveis for só de carga. Vai para o `backlog.md`.
- As alternativas (`selecao.equivalencia`) vêm da mesma função, de outro equipamento primeiro: certo e testado.

### B.7 Complexidade
Só 9 dos 139 ficam fora do iniciante (barra longa × 5, mergulho, nórdico, búlgaro na suspensão, roda). Intermediário e avançado veem as mesmas opções. Concordo com a análise do `11`: nada está errado a ponto de mudar o que o iniciante vê. Duas incoerências pequenas, sem efeito no gerador (complexidade 1 e 2 dão o mesmo resultado): o agachamento no smith (2) é tão guiado quanto o hack (1); o crucifixo com halteres (1) leva o ombro ao fim da amplitude com a carga longe, como um 2. **Sem ação.**

### B.8 O que encontrei de errado de verdade (e corrigi)
Os dois achados do gerador saíram da medição da Parte C, não da leitura:
1. **Teto semanal no preenchimento das vagas.** As vagas entram todas com 2 séries e só a distribuição de séries conferia o teto de 20. No modelo de 6 dias (superior/inferior 3x) com glúteos como prioridade, as três vagas de glúteo (ponte + abdução em cada dia inferior) mais as séries indiretas do búlgaro, do stiff e da flexão deslizante somavam **21** já no mínimo. Antes de hoje isso não aparecia porque a vaga de abdução ficava vazia em casa. Regra: `volume.semanal.teto-padrao` diz "nunca acima" (moderada). **Correção:** um complemento (ou uma vaga só de prioridade) não entra se, já no mínimo, passar do teto de algum músculo. Teste novo em `tests/unit/gerador.test.ts`.
2. **Ordem dos complementos.** Quando as vagas não cabem nos minutos, os complementos dos grupos prioritários entravam antes dos outros. Com a abdução possível, na Ana (3 × 45 min, glúteos e pernas) a abdução sem carga tirava o crucifixo invertido, **o único exercício direto do ombro posterior**, que caía para 3 séries por semana (abaixo do piso de 4 a 6, `volume.semanal.minimo-eficaz`, moderada). **Correção:** o complemento que é o único exercício direto de um músculo com meta vem antes dos complementos prioritários; depois vêm os prioritários; depois os outros. O programa da Ana voltou a ser o aprovado em 02/11. Regra registrada em `tempo.exercicios-por-sessao`.

---

## Parte C. Falta exercício importante?

Olhei por músculo e pelos 55 cenários de `docs/revisoes/catalogo/cenarios.md`. Separei em três casos.

### C.1 (a) Faltava na biblioteca: 4 entradas acrescentadas e 2 propostas
Medição numa cópia do repositório, com `npm run auditoria:catalogo` antes e depois (vagas vazias somadas nos 55 cenários, iniciante; e os programas das 6 personas).

| Entrada | Vaga (nível) | Músculos | Selo e fonte | Vagas vazias (soma dos 55 cenários) | Personas |
|---|---|---|---|---|---|
| **Abdução de quadril deitado de lado, sem carga** `abducao-deitado` | abdução (nível 3) | glúteos | um estudo para a abdução (`attarieh2026`); consenso para a versão sem carga; robusta para carga baixa perto da falha até ~30 repetições (`schoenfeld2017b`, `lasevicius2018`) | 431 → 383 | nenhuma (com 45 min não cabe; com 60 min entra na Ana) |
| **Adução de quadril deitado de lado, sem carga** `aducao-deitado` | adução (nível 3) | adutores | consenso (adução isolada sem ensaio); `kubo2019`, `kinoshita2026` para o músculo | 431 → 382 | nenhuma |
| **Extensão de joelho sentado com elástico** `extensao-joelho-elastico` | extensora (nível 2, com a caneleira) | quadríceps | moderada para a extensora (`kinoshita2026`, `kassiano2026`, `zabaletakorta2021`); consenso para o elástico, com o mesmo aviso da caneleira (lado curto, `pedrosa2022`) | 431 → 425 | **Bruno e Diego** ganham a extensão nos dias de perna (vaga obrigatória) |
| **Panturrilha sentada com halter no joelho** `panturrilha-sentada-halter` | panturrilha sentada (nível 2) | panturrilha (sóleo) | um estudo para a posição sentada (`kinoshita2023`); consenso para a versão com halter | 431 → 419 | nenhuma |
| *(proposta, não feita)* Rosca direta com barra longa | bíceps (nível 2) | bíceps | consenso | 431 → 430 | nenhuma |
| *(proposta, não feita)* Tríceps francês sentado com barra W ou reta | tríceps acima da cabeça (nível 1) | tríceps | um estudo para a posição (`maeo2023`); consenso para a barra | 431 → 429 | nenhuma |
| **As 4 juntas** | | | | **431 → 313**; a casa com halteres e elásticos vai de 4 para 0 vagas vazias; a Ana de 4 para 1; o Bruno de 4 para 0 | |

As duas propostas não feitas servem a quem só tem barra (cenários raros: "só barra longa", "só barra W"); cada uma pede ficha e cartão, e eu preferi gastar esse esforço nas que mudam cenários comuns. Ficam como opção.

**Por que não propus mais.** Olhei o que um treinador sentiria falta e o que a evidência sustenta: pullover (nenhum ensaio; a regra já o deixa como acessório), remada na mesa (decisão do Gustavo), flexão na suspensão (decisão do Gustavo), nórdico invertido para o reto femoral sem máquina (só EMG, não verificado), Copenhagen para os adutores (ensaios em atletas, não lidos), elevação lateral com kettlebell leve (precisaria de uma condição de peso que `funcoes.json` não tem). Nenhum passa no filtro "evidência ou consenso claro + vaga que muda".

**O antes × depois das personas** (snapshots regravados depois desta tabela, `npx vitest run -u`):
- **Ana:** não muda. (Antes da correção da ordem dos complementos, a abdução sem carga tirava o crucifixo invertido do dia B; a correção devolveu o programa aprovado em 02/11.)
- **Bruno, no prédio:** Inferior A ganha `extensao-joelho-elastico 2×12–20` (o búlgaro vai de 3 para 2 séries); Inferior B ganha a mesma extensão (o afundo vai de 3 para 2); o aviso da extensora some; os minutos sobem de 36 para 40 e de 51 para 55. **Na academia do bairro** (2º local), a extensão com elástico troca pela cadeira extensora, que antes não entrava ali (um limite conhecido do R1b que a vaga preenchida resolve sozinha).
- **Diego:** Corpo todo B ganha `extensao-joelho-elastico 2×12–20` e **perde o face pull com elástico** (o dia de 45 min tem 6 vagas-base, e a extensora obrigatória não sai nos cortes); o ombro posterior cai de 4 para 3 séries e ganha o aviso de meta. É a regra `selecao.isolador-obrigatorio` funcionando como aprovada; para o Diego (prioridade peito e costas), o custo é o ombro posterior. **Se o Gustavo preferir** o face pull do Diego à extensão com elástico, a saída limpa é a extensão com elástico no nível 3 da extensora (depois da caneleira), não a volta da vaga vazia. **[opinião]** Mantenho como está: a extensora tem evidência moderada e o face pull é consenso.

### C.2 (b) Existe, mas sem animação: a fila
Depois das 14 aprovadas hoje, 73 exercícios estão sem animação (69 da fila + os 4 novos). Os números da fila (`docs/revisoes/catalogo/fila.md`) continuam valendo; a decisão sobre ela está na Parte E.3. O que fiz agora, por ser barato e importante:
- **Cartão do agachamento com barra** (`src/conteudo/exercicios/agachamento-barra.json`), escrito a partir da ficha que já existia. Era o único exercício do programa da Carla sem guia nenhum, e a 1ª escolha de agachar em toda academia completa.
- Os outros 20 sem ficha nem cartão somam 127 mil prescrições no estresse (4,1% do total); os maiores: panturrilha no leg press (21,7 mil), puxada com barra reta (17,3 mil), afundo para trás (16,8 mil), desenvolvimento unilateral com halter (13,6 mil), leg press (9,7 mil). Proposta: ficha + cartão desses 5 antes de qualquer animação do bloco C.

### C.3 (c) A vaga não tem como ser preenchida, e tudo bem
| Vaga | Sem o quê | Por que está certo deixar vazia |
|---|---|---|
| Crucifixo (peito alongado) | sem banco, polia, voador nem elástico | o crucifixo no chão corta a parte alongada, que é o motivo da vaga (`11`, B.2.4); o empurrar horizontal já cobre o peito |
| Elevação lateral | sem halter, polia nem elástico | não existe elevação lateral com o peso do corpo (`10`); o desenvolvimento conta meia série |
| Tríceps acima da cabeça | sem carga nenhuma | o tríceps na suspensão fica a 90–120° de ombro, não "acima da cabeça" (`11`); a flexão fechada cobre o complemento |
| Puxar vertical | sem barra fixa, polia alta nem elástico | as remadas cobrem as costas (`equipamento.sem-puxada-vertical`); sem nada para puxar, o aviso diz a verdade |
| Panturrilha sentada | sem máquina nem halter | é complemento do sóleo; a panturrilha em pé é a que cresce (`kinoshita2023`) |
| Adução | só sem chão (nunca) | hoje a versão deitada preenche; a adução é complemento sem meta |

---

## Parte D. A animação

Olhei as 52 folhas aprovadas (`docs/revisoes/boneco-acabamento/lote/` e `docs/revisoes/catalogo/folhas/`), as 14 em revisão, as 2 correções e a folha do elástico, como um treinador olha um vídeo do aluno. Também medi as 14 de novo com `scripts/medir-animacao.mjs` (ik = 0 em todas, fita de comprimento fixo nas de suspensão, mãos na largura real da pegada).

### D.1 O que está certo
- **As poses.** Nas 68 animações que olhei, não encontrei uma pose que ensine errado: profundidade do agachamento, cotovelo parado nas roscas e no tríceps, escápulas nas remadas, quadril alto no pike, corpo reto na suspensão. As medidas das conferências batem com as fichas dentro de 1–3 cm.
- **Os músculos.** Vermelho para o principal, laranja para o secundário, listrado para o que só ajuda: coerente com a biblioteca (os testes travam isso) e é o que o Gustavo mais elogiou.
- **A vista principal.** De lado para as roscas, o tríceps, a remada e o stiff; de trás para a puxada; de frente para a elevação lateral e o goblet. São as vistas em que o movimento que importa aparece.
- **O objeto nas mãos.** Depois da correção de hoje, nenhuma barra "encolhe"; o halter encosta no corpo quando apoiado nele; a fita da suspensão não estica; as mãos ficam a 10–14 cm no objeto seguro com as duas.
- **O fantasma só no que muda** (acabamento A2) já existe: no erro, o verde aparece só na cadeia do corpo que difere.

### D.2 O que o boneco ainda não mostra bem (com exemplos nas folhas)
1. **O erro não salta aos olhos.** A figura que erra é vermelha cheia; o certo é um boneco de palitos verde por cima. Vermelho × verde tem contraste de claridade baixo (1,4:1, já medido na auditoria do acabamento) e os dois têm "tipos" diferentes (volume × palito). Em "arredondar as costas" (remada sem banco) e "quadril cai" (remada na suspensão), a pessoa precisa procurar onde está a diferença. É exatamente o retorno do Gustavo de 04/11 ("a visualização do treino e do erro").
2. **Rótulos em cima da figura.** "cotovelos parados, apontando à frente" passa por cima do braço no tríceps na suspensão; "corpo reto, do calcanhar à cabeça" encosta na linha do chão; "mão livre na coxa" aponta para uma mão que está atrás do tronco (remada sem banco, de lado). O rótulo ajuda quando fica fora do corpo e atrapalha quando fica em cima.
3. **A figura pequena quando o equipamento é alto.** Na suspensão, a âncora a 205 cm entra no quadro e o corpo ocupa pouco mais de metade da altura; na puxada e na polia, a torre inteira. O modo Músculos já aproxima a câmera quando o corpo ocupa menos de 70% do palco; o modo Técnica, não.
4. **Profundidade.** De lado, o braço que vai para o lado (elevação lateral) parece ir para a frente; o erro "frontal" fica quase igual ao certo. O lado de longe mais claro ajuda, mas não resolve. A vista de frente resolve, e ela já é a principal da elevação lateral; o que falta é a regra de escolher a vista do modo Técnica pelo movimento (item D.3, proposta 3).
5. **Deitado de lado** (abdução e adução com caneleira): de lado, o corpo deitado vira uma faixa achatada; a vista de cima, acrescentada na abdução, é o que salva. A adução não tem a vista de cima.
6. **A mão.** O acabamento A2 pôs a mão em luva, mas de frente o disco do halter cobre a mão (rosca martelo, "topo": dois borrões pretos). "Polegar para cima" continua sem nada no desenho que o confirme.

### D.3 Propostas, por prioridade (custo e caminho)
| # | Proposta | Resolve | Caminho | Custo | Linha de base |
|---:|---|---|---|---|---|
| 1 | **Erro sobre o certo** (folha-piloto feita): o certo é a figura cheia, e só a parte do corpo que erra aparece em vermelho tracejado grosso, com o nome do erro ao lado da junta que mais se afasta. Para erros pequenos (escápulas), cai no modo de hoje | D.2.1 | `src/engine/estilo/index.ts`, chave `CTX.ACABAMENTO.erroInvertido` (já no código, desligada); classes `.gh-e`, `.hd-ge`, `.lbl-e` em `styles.css`; o título do erro vem do texto do guia | feito como piloto; ligar no app: horas; aprovação folha a folha dos erros | muda só os quadros de erro de `estilo-a.json` |
| 2 | **Rótulos fora do corpo:** um passo depois de desenhar, que move qualquer rótulo cuja âncora cai dentro da caixa do corpo para a faixa de cima ou de baixo do palco, com uma linha fina até o ponto | D.2.2 | `TX` em `desenho.ts` guarda a âncora; um passo em `cenaEstilo` reposiciona | 1 dia | muda os quadros de técnica com rótulo |
| 3 | **A vista que abre é a que mostra o maior movimento:** para cada vista, projetar a trajetória da mão ou do pé (`paths`) e abrir o modo Técnica na vista em que ela é mais longa na tela (como o modo Músculos já abre na vista em que o músculo aparece mais) | D.2.4 | `src/features/guia/Guia.tsx` + uma função no motor, determinística | horas | nenhuma (é a escolha da vista inicial, não o desenho) |
| 4 | **Câmera perto do corpo também no modo Técnica** quando o corpo ocupa menos de 70% do palco, mantendo o topo do equipamento visível só na trajetória | D.2.3 | `montarSvgEstilo` (`perto`) | horas | muda o enquadramento de ~15 animações |
| 5 | **Vista de cima na adução deitada**, como na abdução | D.2.5 | dados do exercício (`views`) | horas, com folha nova | uma animação |
| 6 | **Mão por cima do disco de frente** (hoje só de lado) e um traço do polegar na pegada neutra | D.2.6 | `corpo.ts` (`membro`, camada do halter) | 1–2 dias | muda as 13 animações com halter |
| 7 | **Sombra no chão** sob os pés e as mãos (pista de profundidade barata) | D.2.4, em parte | `corpoNovo` | horas | muda tudo; ganho pequeno **[opinião]** |

**O que eu faria [opinião]:** 1, 2 e 3 como o marco R4 "de verdade", nesta ordem. Os três atacam o que o Gustavo apontou (a visualização do erro e do movimento), nenhum muda o esqueleto nem as poses, e o 3 nem muda a linha de base. Com os três aprovados, as 12 animações do elástico saem no mesmo boneco.

### D.4 A folha-piloto
`docs/revisoes/auditoria-fable/erros-piloto.png`: 6 exercícios (remada sem banco, rosca martelo, goblet, stiff, elevação lateral, remada na suspensão), cada erro em duas colunas, **hoje** e **proposta**. Gerada por `node scripts/piloto-erros.mjs`, sem mudar nenhuma linha de base (a chave só é ligada dentro do script). O que ela mostra:
- "Arredondar as costas": hoje, um boneco verde inteiro por cima do vermelho; na proposta, o corpo certo e só a coluna e a cabeça erradas em vermelho tracejado, com o nome do erro ao lado.
- "Descer pouco" (goblet) e "Quadril cai" (suspensão): a diferença fica na altura do quadril, e é só isso que aparece.
- O que a proposta não resolve: erros que são só de escápula ou de pegada (sem cadeia que mude 3 cm) continuam no modo de hoje; e o rótulo pode ficar perto da borda em figuras largas (o piloto já escolhe o lado com mais espaço).

**Não propus um estilo novo de boneco.** O esqueleto, as poses e os músculos estão bons; o que falta é o erro, os rótulos e a vista, que são mudanças de cena, não de corpo. Por isso não fiz folha-piloto de estilo.

### D.5 Sobre o retorno do Gustavo (o elástico espera o R4)
A folha da remada com elástico (`docs/revisoes/elastico/folhas/remada-elastico.png`) tem os mesmos problemas das outras, não problemas próprios: o rótulo "elástico na sola dos pés" em cima do pé, o erro "encolher" quase invisível (escápulas), o corpo pequeno de trás. As poses são dados, e o estilo é aplicado por cima a todas: fazer as 12 poses do elástico agora e aprová-las depois do R4 não desperdiça nada, só adia o "aprovar". Respeitei a decisão dele (Parte E.3) e deixo o argumento registrado.

---

## Parte E. As decisões pendentes, decididas e executadas

### E.1 As 14 animações em revisão: todas aprovadas
Critério: a conferência escrita de cada família (`docs/revisoes/catalogo/conferencia/`), a folha e a medida refeita nesta sessão (`node scripts/medir-animacao.mjs <id>`: ik = 0 na animação e nos erros em todas as 14; a fita da suspensão a 85–86 cm nas de braço, 111 no T, 103–105 no tríceps e 178–182 nas de pé; mãos a 32 cm na remada, 28 na rosca, 23 na roda). Em nenhuma encontrei pose que ensinasse errado, objeto solto ou mão fora da largura da pegada.

| Família | Animações | Decisão | Observações que ficam para o R4 (não impedem a aprovação) |
|---|---|---|---|
| Suspensão | remada, rosca, T, tríceps, flexão de joelho, búlgaro | **aprovadas** | o corpo fica pequeno por causa da âncora (D.3, proposta 4); rótulo sobre o braço no tríceps (proposta 2) |
| Bola e paralelas | abdominal na bola, ponte com os pés na bola, elevação de joelhos | **aprovadas** | o joelho um pouco dobrado na ponte é o que a ficha pede |
| Caneleiras | extensão de joelho, abdução, adução deitado | **aprovadas** | a adução merece a vista de cima, como a abdução (proposta 5) |
| Mini-band e roda | abdução sentado, roda ajoelhado | **aprovadas** | — |

Executado por animação: `node scripts/aprovar-animacao.mjs`, as entradas em `SO_AJUDA` (antebraço na rosca; oblíquos no abdominal na bola, na elevação nas paralelas e na roda; posteriores na ponte com os pés na bola) e em `LISTA` (adutores no búlgaro na suspensão), `AJUDANTES` (posteriores na ponte com os pés na bola), a remada na suspensão fora da lista dos 29 sem animação (28 agora), `npm run check` e um commit por animação (as 3 caneleiras num commit só, porque dividem o índice do motor). As linhas de base foram regravadas e conferidas sem as variáveis. **Nenhum programa de persona mudou** com as 14 (conferido pelos snapshots). O script de aprovação ganhou uma correção: ele não trocava o import de `compartilhado` ao tirar o arquivo da pasta `revisao/`.

### E.2 As 2 correções: aprovadas, e o guia original deixa de ser a referência da rosca na polia
- **Pike:** as mãos plantadas (10–11 cm de altura e 42–44 cm entre elas nas três poses). Diferença visual pequena, correção certa. Aprovada; `novas.json` e `estilo-a.json` regravados.
- **Rosca na polia:** a barra reta de largura fixa (36–38 cm, a largura dos ombros, como o texto pede), em vez de "encolher" 9 cm no meio da subida. Aprovada. **A decisão de produto:** o HTML do guia original era a referência porque garantia que o port do motor não mudou nada; hoje a referência de técnica é a ficha com fonte (`CLAUDE.md`), e as 25 originais ganharam ficha em 04/11. Então: uma original corrigida, com a folha antes × depois aprovada, passa a ter linha de base própria, gravada do motor, como as novas. Implementado em `tests/motor/equivalencia.spec.ts` com a lista `CORRIGIDAS` (hoje só `rosca-polia`): as outras 24 continuam comparadas quadro a quadro com o guia (4.632 quadros). As 3 notas sem correção (pegada da barra fixa a 1,8× os ombros, joelho de trás do búlgaro a 14 cm, halteres do stiff na altura do joelho) continuam como estão: o texto do app admite a variação.

### E.3 A fila dos sem animação
**Decisão:** a ordem dos blocos fica **A, C, B, D, E** (como proposto), com duas mudanças de método:
1. **Antes de animar, ficha e cartão dos 5 mais prescritos sem guia nenhum** (C.2): panturrilha no leg press, puxada com barra reta, afundo para trás, desenvolvimento unilateral com halter e leg press. Um cartão custa menos que uma animação e tira o "sem guia ainda" de 69 mil prescrições.
2. **Os 12 do elástico continuam esperando o R4**, por decisão do Gustavo (04/11). Minha recomendação (D.5): o R4 pode ser pequeno (propostas 1 a 3) e as poses do elástico podem ser feitas em paralelo, porque o estilo é aplicado por cima; o que espera é só o "aprovar".

**Até onde fui nesta sessão:** o que está registrado em "Executado" abaixo. Não animei o bloco A: cada animação pede folha, medida, conferência escrita e texto completo do guia, e preferi gastar a sessão nas decisões, na medição e nas correções do gerador, que mudam o treino de muita gente, a uma animação a mais.

### E.4 A ida para a `main`
Ver "Executado" abaixo e o recado ao R3 (`docs/prompts/recado-r3-catalogo-completo.md`). **Antes de abrir o app atualizado no celular, exporte os dados** ("Meus dados" → "Guardar uma cópia"): a versão nova muda o esquema do armazenamento (o campo "objetivo", versão com migração testada), e a cópia é a rede de segurança, como nas idas anteriores.

### Outras decisões pequenas tomadas nesta sessão
- **Cartão do agachamento com barra** (C.2), a partir da ficha.
- **Ombro posterior na barra fixa supinada e na puxada com elástico** (B.5): medido e **deixado como opção**, porque muda o desenho e o texto da barra fixa supinada.

---

## Parte F. Outros pontos

### F.1 Segurança e triagem
**O que vi.** 9 perguntas no estilo do PAR-Q+ (`src/domain/triagem/index.ts`); qualquer "sim" bloqueia a geração até a pessoa confirmar a avaliação, salvo osso e articulação, que marca a região e pergunta a dor de hoje. Durante o treino: dor acima de 5 interrompe o exercício e oferece a alternativa; sinais cardiovasculares encerram a sessão e orientam o SAMU; o app nunca nomeia lesão (`seguranca.*`, consenso, `warburton2011`, `riebe2015`).
**A evidência.** A pesquisa `06` conferiu a triagem contra o ACSM 2015 e a OMS 2020 e concluiu que ela **não deixa passar ninguém que as diretrizes mandariam parar**; o problema é o contrário: ela para gente que as diretrizes mandariam treinar (pressão controlada, gestação sem complicação, doença crônica estável). A proposta revisada está registrada e **não aplicada**, por decisão do Gustavo, até a revisão de um profissional com CREF.
**Minha opinião.** Concordo em não aplicar sem o profissional: errar para o lado conservador é o erro certo num app sem supervisão. O que recomendo **agora**, sem mudar a triagem: no texto do bloqueio, dizer que "pressão controlada com liberação do médico" é um caso em que a conversa costuma ser rápida, para a barreira não virar desistência (a pesquisa `06` cita que o excesso de encaminhamento vira barreira ao exercício; consenso). É só texto; opção para o Gustavo.
**Medido.** Nos 149.760 programas do estresse, nenhum exercício carrega uma região com dor acima de 5 (auditoria de 02/11; refeito hoje).

### F.2 Progressão e acompanhamento
**O que vi.** Dupla progressão por exercício (`sugerirProgressao`): segurança primeiro (dor), depois salto grande, abaixo do mínimo, carga leve, topo da faixa em 2 sessões, estagnação em 3; calibração na 1ª série; escadas por exercício no peso do corpo e no elástico; pausas detectadas sozinhas; "a sua semana"; semana leve só sugerida.
**A evidência.** Progredir por repetições ou por carga deu o mesmo em 8 semanas (`plotkin2022`, um estudo); a semana leve não mudou a hipertrofia (`coleman2024`, um estudo): o app está do lado certo nos dois. A calibração e a volta de pausa são consenso: ninguém testou uma regra dessas, e o `07` diz isso com clareza.
**O que ainda incomoda.** No praticante simulado, com progresso lento, metade das sugestões vira "estagnado" (achado 11 da auditoria de 02/11; o `10` mediu 48% no peso do corpo). "Três sessões sem melhora" é um gatilho curto para quem avança devagar mas avança. **Opção (média, recomendo medir primeiro no export do R3):** contar "estagnado" só depois de 4 sessões, ou só quando o total de repetições não subiu em nenhuma das 3; os dois são consenso. Nada muda sem o dado do R3.
**Um detalhe de texto.** A sugestão "estagnado" lista 4 saídas numa frase ("1) alargue a faixa; 2) reduza 10%…"). Para quem olha o celular entre séries, é informação demais; uma saída por vez, começando pela mais simples (mais repetições), seria mais usável **[opinião]**.

### F.3 Os textos do guia
**O que vi.** Li os cartões e os textos de 20 exercícios. São claros para quem não é da área: frases curtas, verbo no imperativo, "sinta aqui" e "se sentir X, está errado". Os campos das fases dizem "Subida (concêntrica)" e "Descida (excêntrica)": o termo técnico vem entre parênteses, e o guia explica uma vez ("a seta mostra a fase concêntrica"). Dois pontos a melhorar, ambos pequenos:
- "RIR" aparece nos textos de carga e de sugestão. O app o explica no cadastro, mas no meio do treino a sigla pode esquecer. **Opção:** "repetições de reserva (RIR)" na primeira vez em cada tela.
- Os avisos de meta juntam muitas frases numa só caixa (o exemplo da Ana tem 7 frases). Já foram encurtados em 04/11; o que falta é ordem: primeiro o que a pessoa pode mudar (minutos, dias), depois o que não pode (equipamento). **Opção.**

### F.4 Os testes: o que falta cobrir
- `src/domain/`: cobertura acima de 96% em quase tudo; `sessao/index.ts` é a menor (87%), nas linhas da sugestão de carga ao vivo. **Opção:** um teste de propriedade para `sugestaoDoExercicio` com histórico aleatório gerado por semente (determinístico).
- O teto semanal "já no mínimo" não tinha teste porque não tinha caso; agora tem (B.8). Vale um **teste de propriedade mais largo**: todas as divisões × as 6 personas × as 3 prioridades × os 3 níveis, conferindo o teto, o piso e "nenhum músculo zerado sem aviso". Hoje o teste de propriedades varia perfil e divisão, mas com a prioridade fixa da persona.
- O motor: a linha de base protege o SVG, não a imagem. Uma mudança só de CSS (cores) passa no teste e muda o que a pessoa vê. **Opção:** uma captura de 6 quadros em PNG por estilo, comparada com tolerância zero, como já se faz nos e2e.
- Os e2e cobrem o cadastro, o treino, o guia e os locais; não cobrem a importação de um export antigo (a migração do esquema). **Opção:** um teste que importa um JSON das versões 4 e 5 e confere o programa.

### F.5 Acessibilidade e uso com uma mão
**Medido pelo projeto:** 0 toque abaixo de 44 px e 0 texto abaixo do contraste mínimo em todas as telas, nos dois temas, a 360 px (`tests/e2e/telas.spec.ts`); "Série feita" visível sem rolar; barra fixa embaixo; `prefers-reduced-motion` desliga as transições e mostra quadros estáticos no guia. **O que não medi:** o uso real com uma mão na academia (não tenho um celular aqui) e o Lighthouse (não rodei; o critério 8 do plano pede ≥ 90). O que vi no código favorece o uso com uma mão: o que se toca fica embaixo. Fica para o R3.

### F.6 Privacidade (LGPD)
**O que vi.** Tudo no aparelho (IndexedDB), com exportação e importação em JSON pela própria pessoa; a foto é reduzida a 1.568 px e redesenhada num canvas, o que descarta os metadados (inclusive GPS), com teste de que a saída não tem segmento EXIF; o servidor valida convite, limite por aparelho e por IP, tamanho e tipo, não guarda nada e loga só números; a chave da API só no servidor; `privado/` fora do git com teste. Não há dado pessoal no repositório (conferi personas e fixtures).
**O que falta, já conhecido:** o limite da visão fica na memória de cada instância (não compartilhado); termos de uso e aviso de privacidade antes de abrir o app a outras pessoas. Nada a acrescentar: está certo para o MVP de uso próprio.

### F.7 Dependências
Poucas e certas: react, react-router, vite, zod, idb-keyval, o SDK da Anthropic só na API; Playwright fixado em 1.63.0. `npm audit` acusa `zod` (alto: exaustão de memória com coleções grandes) e `react-router` (moderado). O pedido da API é validado à mão com limites (até 5 fotos, tamanho máximo por foto) **antes** de qualquer zod, e o zod valida a resposta do modelo e os dados do próprio aparelho, então o risco prático é baixo. A correção do zod é a versão 4 (mudanças de API em `src/domain/` inteiro): **opção para o Gustavo**, fora desta sessão; recomendo fazer numa branch própria, com o `npm run check` como rede.

---

## Executado nesta sessão (commits na branch, do mais antigo ao mais novo)
