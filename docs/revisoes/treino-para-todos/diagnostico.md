# Diagnóstico: o retrato medido do treino que o app recomenda hoje

> Sessão "treino para todos", etapa 1 (12 e 13/11/2026). Só mede: nada em `src/domain/` mudou. Todos os programas vêm de personas e cenários fictícios. Os números saem de `scripts/auditoria/retrato.ts` (os 20 cuidados, em `cuidados.ts`, na população de `populacao.ts`) e estão inteiros em [`medidas/hoje/retrato.md`](medidas/hoje/retrato.md). As propostas e o efeito medido de cada uma estão em [`proposta.md`](proposta.md); as doze pessoas-exemplo, em [`exemplos/`](exemplos/).

## Em uma olhada

1. **O nível e o tempo da pessoa quase não mudam o treino quando ela não escolhe um foco.** Sem foco, todo músculo fica com cerca de 6 séries por semana, para o iniciante e para o avançado, com 30 ou com 90 minutos. Um avançado com academia completa e 5 dias de 90 min recebe dias de 26 a 46 min, com 2 séries de quase tudo. Na conta ponderada, 1 em cada 4 programas tem o dia típico abaixo de 70% do tempo pedido; entre quem escolhe 75 ou 90 min, são 6 e 8 em cada 10.
2. **Metade dos intermediários e avançados treina com a média dos músculos abaixo da faixa do próprio nível** (52 em cada 100 programas, conta ponderada; 77 em cada 100 dos avançados). As diretrizes falam em 10 séries ou mais por músculo por semana; a média ponderada de hoje é 7,3.
3. **O pior grupo é quem tem 30 minutos.** Só 9 em cada 100 programas de 30 min saem sem nenhum defeito (conta ponderada): 16 passam do tempo, 48 têm um músculo com menos de 4 séries, 30 esquecem um músculo por completo. Os 400 piores programas da população são todos de 30 min.
4. **Com dor forte, o dia desmonta.** Com dor 7 no cotovelo, 46 em cada 100 programas têm um dia com menos de 3 exercícios ou sem nenhum exercício grande; no quadril, 32; no ombro, 31. Há "treinos" de 5 a 12 minutos com um ou dois exercícios de braço.
5. **A escolha do exercício cai na animação e na ordem alfabética.** Em 8 de cada 10 programas (ponderada) pelo menos um exercício foi escolhido por ter animação, e em 9 de cada 10, pela ordem alfabética, havendo um equivalente sem uso. Na academia completa, o 1º exercício de puxar sai "puxada unilateral ajoelhado na polia" em vez da puxada comum no puxador.
6. **Achado de segurança.** Com dor forte no joelho, 43 em cada 100 programas (ponderada) ainda prescrevem um exercício feito de joelhos no chão (a puxada e o abdominal ajoelhados): a biblioteca não diz que eles carregam o joelho.
7. **O iniciante recebe demais para aprender e técnicas de quem já treina.** 86 em cada 100 programas de iniciante têm mais de 12 exercícios diferentes na semana; 37 em cada 100 usam bi-set ou drop set.
8. **Ao longo dos meses, o aviso de "três sessões sem melhora" aparece em metade dos treinos** de quem progride no ritmo normal (24 de 48 sessões do iniciante simulado, 36 do intermediário, 41 do avançado).
9. **O que está bem:** a segurança da régua (0 exercício impossível, acima do nível ou numa região com dor forte, em 680.625 programas), a ordem do dia (0 isolador antes de exercício grande), o equilíbrio empurrar × puxar e frente × trás da coxa (menos de 1 em 100 fora da faixa), a honestidade dos avisos (0 músculo abaixo de 4 séries sem aviso) e a estabilidade (15 min a mais não tiram nenhum exercício).

Na revisão cega, três revisores no papel de treinadores deram ao treino de hoje, em média, **5,5 em eficiência, 5,8 em adequação à pessoa e 5,3 em "agradável de fazer"** (de 1 a 10; 2ª rodada, 18 pessoas; na 1ª rodada, 5,6, 5,8 e 5,4). As críticas que mais se repetem batem com a medida: tempo mal usado, 2 séries de tudo, dor que vira "tirar o músculo da semana", técnica de intermediário para iniciante.

---

## 1. O mapa de quem usa o app

### 1.1 As dimensões

| Dimensão | O que o app aceita | O que o retrato mede | O que fica de fora |
|---|---|---|---|
| Nível | iniciante, intermediário, avançado (pelo tempo de treino e pela confiança na técnica) | os 3 | a revisão do nível ao longo dos meses (hoje não existe) |
| Objetivo | ganhar músculo, manter na dieta, ficar mais forte, saúde | ganhar músculo em tudo; "ficar mais forte" numa rodada à parte (só ele muda números) | "manter na dieta" e "saúde" geram o mesmo programa de "ganhar músculo" (só o texto muda) |
| Dias | 2 a 6 | os 5 | 1 dia por semana (o app não oferece) |
| Minutos | 30, 45, 60, 75, 90 ou outro | os 5 da tela | "outro" (20, 120, 150 min), medido só no estresse antigo (`docs/revisoes/auditoria/estresse.md`) |
| Equipamento | 49 itens, em qualquer combinação, com detalhes (pesos, placas, acessórios) | 55 cenários: os 6 atalhos, 6 de personas, nada, 38 itens sozinhos e 4 pares de casa | combinações livres de 3 ou mais itens fora dos atalhos; variações de peso dos halteres além das 4 do retrato |
| Foco | qualquer conjunto dos 7 grupos | 11: nenhum, cada grupo, superiores (4), inferiores (2), peito + costas | as outras 117 combinações (3 focos de regiões diferentes, 5 ou mais) |
| Dor | 7 regiões, nota de 0 a 10 cada, em qualquer combinação | 15 situações: sem dor e cada região com 4 e com 7 | duas regiões ao mesmo tempo; nota 0 a 2 (só lembrete); o pescoço (o cadastro não tem) |
| Volta de pausa | 4 faixas no cadastro; pausas detectadas no uso | não muda o programa da semana cheia, só as 2 semanas de volta | as semanas de volta e de aprendizado não passam pelos 20 cuidados |
| Divisão escolhida à mão | 13 divisões | a recomendada de cada número de dias | as 8 alternativas (medidas no estresse antigo) |
| Exercícios e aparelhos a evitar | qualquer lista | nenhuma | tudo |
| Mais de um local de treino | sim | não | tudo (medido no estresse antigo, 5 pares de locais) |
| "Prefiro este" e a margem pessoal de tempo | sim | não | tudo |
| Idade, sexo, peso | o app não pergunta | — | ver a seção 5.3 e `proposta.md`, "perguntas novas" |

A população do retrato: 55 cenários × 3 níveis × 5 números de dias × 5 durações × 11 focos × 15 situações de dor = **680.625 programas** (a régua oficial media 108.900, sem os 75 min e só com dor 7 no ombro e no joelho).

### 1.2 As duas contas, e os pesos

- **Grade:** cada combinação vale igual. Serve para achar os cantos ruins. Nela, 470 mil dos 680 mil programas são de quem tem um aparelho só (38 dos 55 cenários), gente rara.
- **Ponderada:** cada combinação vale pela fatia estimada de pessoas. Serve para saber o que a maioria recebe.

**Os pesos são estimativa minha, sem dado de uso real** (tudo fica no aparelho de cada pessoa, e não há estudo com a distribuição de quem usa um app assim). A lógica de cada um:

| Dimensão | Pesos | Por quê |
|---|---|---|
| Equipamento | academia completa 40%; academia de bairro 8%; condomínio 12% e prédio com polia 3%; casa com halteres e elásticos 10%; só halteres (com ou sem banco) 8%; só elásticos (com ou sem barra, step ou suspensão) 5%; sem nada 8%; barra fixa, kettlebell ou suspensão sozinhos 2%; os outros 33 itens sozinhos, 4% no total | quem procura um programa de musculação treina, na maioria, em academia; o condomínio e a casa vêm depois; "um aparelho só" quase não existe |
| Nível | iniciante 45%, intermediário 35%, avançado 20% | a maior parte de quem baixa um app de treino está começando ou voltando; a régua de nível do app classifica para baixo na dúvida |
| Dias | 2: 10%; 3: 35%; 4: 28%; 5: 20%; 6: 7% | 3 e 4 dias são o mais comum em academias; 6 é raro |
| Minutos | 30: 12%; 45: 28%; 60: 38%; 75: 12%; 90: 10% | 60 min é o treino típico; falta de tempo é a barreira mais citada (`24-objetivos-e-adesao.md`) |
| Foco | nenhum 35%; um grupo 40% (glúteos 9, braços 7, pernas 6, peito 5, abdômen 5, costas 4, ombros 4); superiores 8%; inferiores 9%; peito + costas 8% | o cadastro não obriga a escolher; glúteos e braços são os pedidos mais comuns |
| Dor | sem dor 78%; lombar 6%; joelho 5%; ombro 5%; cotovelo, punho, quadril e tornozelo 1,5% cada; 60% com nota 4 e 40% com nota 7 | lombar, joelho e ombro são as queixas mais comuns em quem treina (`23-dor-pressao-alta-e-gestacao.md`) |

Mudar os pesos muda os números da coluna "ponderada", não a lista dos problemas: os três primeiros achados aparecem nas duas contas.

### 1.3 O que as personas do projeto deixavam de fora

Cinco das 6 personas dos testes têm foco; a única sem foco treina sem equipamento. **O caso mais comum (academia, sem foco) não tinha persona**, e é nele que o treino mais encolhe. Por isso entraram 6 personas novas (`tests/personas/todos.ts`): Gilberto (67 anos, começando), Íris (só elásticos), Jonas (2 dias de 30 min), Kátia (avançada sem equipamento), Leandro (dor no joelho) e Marina (ficar mais forte).

---

## 2. Os 20 cuidados, medidos

"Defeito": o programa não deveria sair assim. "Nota": gosto e consenso de treinadores. % dos programas que falham; o pior grupo é o recorte (equipamento, nível, minutos, dias, foco ou dor) com a maior fatia na grade.

| # | Cuidado | Como foi medido | Grade | Ponderada | Pior grupo | Veredito |
|---:|---|---|---:|---:|---|---|
| 1 | O dia começa pelo mais pesado e técnico e termina pelos isoladores | isolador antes de exercício grande; abdominal fora do fim | 0% | 0% | — | **bem** |
| | | o exercício mais técnico (complexidade 3) não é o 1º da região (nota) | 12,5% | 9,9% | 2 dias (22,5%) | atenção |
| 2 | Exercícios e séries combinam com os minutos | exercícios por dia fora da faixa dos minutos (nota) | 20,2% | 4,6% | dor 7 no cotovelo (56,8%) | atenção |
| | | dia de 5 exercícios ou mais com 2 séries em todos (nota) | 24,0% | 21,8% | 6 dias (61,3%) | **mal** |
| 3 | O treino usa o tempo pedido | dia mais longo acima de 110% dos minutos | 4,0% | 3,0% | 30 min (16,0%) | mal em 30 min |
| | | dia típico abaixo de 70% dos minutos, sem aviso | 3,2% | 15,2% | atalhos de equipamento (14,3%) | **mal** |
| | | dia típico abaixo de 70% dos minutos, com ou sem aviso (nota) | 38,3% | 24,7% | 90 min (79,9%) | **mal** |
| 4 | Cada músculo na faixa do nível; nenhum esquecido; sem séries soltas | músculo sem nenhuma série, havendo exercício | 7,4% | 10,4% | 30 min (29,9%) | mal em 30 min |
| | | músculo com mais de 0 e menos de 4 séries | 12,5% | 21,3% | 30 min (47,7%) | **mal** |
| | | músculo abaixo da faixa do nível com tempo sobrando | 37,9% | 28,1% | 90 min (68,2%) | **mal** |
| 5 | Corpo equilibrado | empurrar ÷ puxar acima de 1,5 | 0,5% | 0,4% | foco em peito (3,6%) | **bem** |
| | | frente ÷ trás da coxa fora de 0,5 a 2 | 0,1% | 0,0% | dor 7 no quadril (1,8%) | **bem** |
| | | ombro da frente ÷ de trás acima de 2 (nota) | 4,2% | 0,5% | 30 min (11,6%) | bem |
| 6 | O foco aparece, sem zerar o resto | foco abaixo da meta com tempo e exercício | 1,7% | 0,1% | 90 min (4,8%) | bem |
| | | o foco não passa da mediana dos outros (nota) | 9,7% | 7,2% | foco em pernas (33,6%) | atenção |
| | | com foco, outro músculo abaixo de 4 séries | 12,3% | 13,8% | 30 min (47,0%) | mal em 30 min |
| 7 | Semana bem distribuída | mais de 10 séries de um músculo num dia | 0% | 0% | — | **bem** |
| | | o mesmo músculo com 3 séries diretas ou mais em dias seguidos (nota) | 13,8% | 4,8% | 4 dias (31,9%) | atenção |
| 8 | O melhor exercício que o equipamento permite, por regra e não por alfabeto | escolhido por ter animação, com equivalente sem uso (nota) | 32,9% | 82,1% | pares de casa (93,3%) | **mal** |
| | | escolhido pela ordem alfabética, com equivalente sem uso (nota) | 73,9% | 93,3% | atalhos (91,2%) | **mal** |
| 9 | Variedade sem perder a prática | o mesmo exercício em todos os dias havendo outro do mesmo nível | 0,4% | 0,2% | dor 7 no ombro (2,3%) | bem |
| | | idem, sem opção do mesmo nível (nota) | 16,6% | 5,5% | iniciante (40,7%) | limite do equipamento |
| 10 | Sem redundância no dia | dois exercícios da mesma função no dia (nota) | 31,9% | 14,2% | foco em pernas (54,9%) | atenção (parte é de propósito) |
| | | três exercícios ou mais do mesmo músculo no dia (nota) | 6,3% | 17,3% | atalhos (24,3%) | atenção |
| 11 | Repetições, reserva e descanso combinam com o exercício | auditoria das regras (seção 5): 2 valores de descanso para tudo; faixas por tipo de exercício são consenso | — | — | — | atenção |
| 12 | Dá para progredir | exercício sem próximo passo (uma carga só, ou já no último degrau) | 5,0% | 2,5% | avançado (7,7%) | atenção |
| 13 | Fadiga pensada | dois exercícios seguidos que carregam a lombar sem apoio (nota) | 10,5% | 30,2% | atalhos (31,4%) | **mal** |
| | | três ou mais no dia (nota) | 4,1% | 4,7% | pares de casa (12,6%) | atenção |
| | | três seguidos que dependem da pegada (nota) | 0% | 0% | — | bem |
| 14 | Segurança primeiro, e o que sobra ainda funciona | exercício impossível, acima do nível ou em região com dor forte | 0% | 0% | — | **bem** (com a ressalva do item 6 do resumo) |
| | | dia com menos de 3 exercícios ou sem exercício grande | 10,6% | 2,0% | dor 7 no cotovelo (46,4%) | **mal com dor** |
| 15 | Técnica de tempo só onde ajuda e para quem sabe | iniciante com bi-set ou drop set (nota) | 9,5% | 16,6% | iniciante (28,4%; com 30 min, 67,6%) | atenção |
| | | bi-set entre dois exercícios grandes (nota) | 21,5% | 28,5% | 30 min (51,8%) | atenção |
| 16 | Iniciante: pouco e simples; avançado: estímulo suficiente | iniciante com mais de 12 exercícios diferentes na semana (nota) | 18,9% | 38,7% | iniciante (56,6%) | **mal** |
| | | intermediário ou avançado com a média abaixo da faixa do nível (nota) | 47,9% | 51,6% | avançado (77,4%) | **mal** |
| 17 | Limites ditos com honestidade | músculo abaixo de 4 séries sem aviso que o cite | 0% | 0% | — | **bem**; mas o aviso não diz o item que resolveria (decisão do Gustavo de 03/11) |
| 18 | Estável | 15 min a mais: exercícios que somem | 0,1% | 0,0% | — | **bem** |
| | | um step a mais | 6,9% | 5,8% | — | bem |
| | | elásticos a mais | 36,7% | 13,8% | um aparelho só | esperado: o elástico abre exercícios em quase toda função |
| 19 | As semanas seguintes fazem sentido | simulação de meses (seção 7) | — | — | — | **mal** no aviso de platô |
| 20 | O porquê bate com o programa | o texto diz "cabem ~N exercícios" e há dia com mais | 5,0% | 5,7% | 30 min (21,2%) | atenção |
| | | o texto diz "todos ficam com ~6 séries" e um músculo tem 9 ou mais, ou menos de 4 | 7,6% | 23,2% | sem foco (83,3%) | **mal** |

**Sem nenhum defeito** (nenhuma medida do tipo "defeito" falha): 36,3% na grade e 35,9% na ponderada. Na régua oficial da G5, que mede menos coisas, são 80,3% e 79,0% (86,4% sem dor, 79,9% com dor), coerente com os 86,1% e 74,3% publicados em 10/11.

### Por grupo (régua oficial: programas sem nenhum defeito)

| Recorte | Sem defeito | | Recorte | Sem defeito |
|---|---:|---|---|---:|
| 30 min | 67,6% | | dor 7 no cotovelo | 50,0% |
| 45 min | 85,7% | | dor 7 no quadril | 62,6% |
| 60 min | 86,4% | | dor 7 no ombro | 65,4% |
| 75 min | 82,9% | | dor 7 no punho | 74,5% |
| 90 min | 79,0% | | dor 7 na lombar | 83,1% |
| iniciante | 81,3% | | dor 7 no joelho | 84,6% |
| intermediário | 81,1% | | dor 4, em qualquer região | 86,4% |
| avançado | 78,6% | | sem dor | 86,4% |

---

## 3. Em ordem de quantas pessoas atinge × quão grave é

| # | Problema | Quem atinge (ponderada) | Gravidade | Onde ver |
|---:|---|---|---|---|
| 1 | Sem foco, o volume não acompanha o nível nem o tempo: ~6 séries por músculo, dias curtos | 35% das pessoas não escolhem foco; 1 em 4 programas com o dia abaixo de 70% do tempo; metade dos intermediários e avançados abaixo da faixa | alta: é dose de treino (evidência robusta na direção) | exemplos da Marina, do Jonas e do Perfil X2 |
| 2 | A escolha entre exercícios equivalentes cai na animação ou no alfabeto | 8 a 9 em cada 10 programas têm pelo menos um caso | média: o exercício funciona, mas o programa "parece de máquina" e o básico some | Marina: puxada unilateral ajoelhada em vez da puxada comum |
| 3 | 30 minutos: passa do tempo, esquece músculos, séries soltas | 12% das pessoas; 9 em 10 com defeito | alta para esse grupo: é o piso da população | Jonas, Elisa |
| 4 | Dor forte desmonta o dia (5 a 12 min, 1 ou 2 exercícios) | ~9% das pessoas têm dor 7 em alguma região; 1 em 3 com ombro, cotovelo ou quadril | alta: a pessoa com dor recebe o pior treino | Perfil X3 |
| 5 | Exercício ajoelhado com dor forte no joelho | 2% das pessoas (dor 7 no joelho), 43 em 100 delas | segurança | Leandro |
| 6 | Iniciante com exercícios demais para aprender e com bi-set e drop set | 45% das pessoas são iniciantes; 86 em 100 com mais de 12 exercícios; 37 em 100 com técnica de tempo | média: consenso de treinadores, unânime na revisão cega | Gilberto, Ana |
| 7 | Dois exercícios seguidos castigando a lombar sem apoio | 30 em 100 programas | baixa a média: consenso, sem ensaio | Marina: agachamento com barra → stiff → remada |
| 8 | O aviso de "sem melhora" em metade dos treinos, por meses | todos, depois das primeiras semanas | média: mina a sensação de progresso | seção 7 |
| 9 | O porquê do volume não bate ("~6 séries" quando não é) | 23 em 100 programas | baixa: texto | — |
| 10 | Quem é forte e não tem carga recebe o exercício de base | ~3% (avançado ou intermediário sem nada ou só com elástico) | média para o grupo; nota 4,3 a 5,7 na revisão cega | Kátia |
| 11 | Sem nada para puxar, costas e bíceps a zero | 8% (sem nada) | limite real do equipamento, dito com honestidade; decisão do Gustavo de 03/11 mantida | Kátia, Elisa |

---

## 4. Os 20 piores perfis de hoje

Os 400 programas com mais cuidados em falta são todos de 30 minutos. Abaixo, 20 deles, um por tipo de equipamento, dias e presença de dor forte, e depois os piores de cada duração maior. "+bi" = em bi-set; "+drop" = com drop set. Os nomes são os ids dos exercícios.

{{PIORES}}

### Os piores de 45, 60, 75 e 90 minutos

{{PIORES_POR_MIN}}

---

## 5. Cada regra de hoje contra a pesquisa

As 163 regras de `docs/pesquisa/regras.md` têm hoje estes selos: 113 consenso, 28 moderada, 15 um estudo, 7 robusta. A pesquisa desta sessão (temas 18 a 26) releu 116 fontes e trouxe 114 novas. O quadro abaixo junta as regras por família; "confirmada" quer dizer que a pesquisa nova não achou motivo para mudar.

### 5.1 Regras a ajustar ou contrariadas

| Regra (id) | O que diz hoje | O que a pesquisa diz | Veredito | Fonte |
|---|---|---|---|---|
| `volume.semanal.alvo`, `tempo.sobra-series` | sem foco, todos os músculos em ~6 séries; o tempo que sobra só vira série nos dias com vaga vazia | 4 séries é o mínimo detectável; as diretrizes pedem 10 ou mais; mais séries rendem mais, com retorno decrescente; nada sustenta parar em 6 quando há tempo | **a ajustar** (a direção é robusta; os números 8, 12 e 14 são consenso) | `pelland2026`, `acsm2026`, `schoenfeld2021`; tema 18 |
| `volume.semanal.minimo`, `.maximo` (faixas por nível) | 6 a 10, 10 a 16, 12 a 20 | nenhum ensaio valida faixas por nível; o que varia é a tolerância e o tempo | **sem evidência** (consenso; fica como teto e como ritmo, não como achado) | tema 18 |
| `selecao.funcao-da-vaga` (o desempate) | dor leve; estabilidade (iniciante); carga; variedade; preferência; animação; alfabeto | os dois últimos não são critérios de treino; falta "o exercício de referência e de dois lados antes do raro e de um lado só" e, para o iniciante, "o mais simples primeiro" | **a ajustar** (consenso) | `kassiano2025`, `haugen2023`; temas 20 e 25 |
| `tempo.corte` (bi-set e drop set) | para todos os níveis, entre quaisquer exercícios que não competem | não aconselhados em exercícios livres pesados; drop set melhor em isoladores; nada sobre iniciantes | **a ajustar**: sem barra livre no bi-set; sem drop set para o iniciante (consenso) | `iversen2021`, `zhang2025`, `sodal2023`; tema 21 |
| `progressao.estagnacao` | "estagnado" depois de 3 sessões sem melhora, para todos | o ganho de força desacelera muito com o tempo de treino; nenhum ensaio define a janela; 3 sessões dispara em metade dos treinos simulados | **a ajustar** (consenso): a janela cresce com o nível | `steele2023`; tema 21 |
| `descanso.por-tipo` | 1 min 45 s nos exercícios grandes, 1 min 15 s nos isoladores | o consenso da IUSCA é 2 min ou mais e 60 a 90 s; a meta-análise vê benefício pequeno acima de 60 s e nada claro acima de ~90 s | **a ajustar, com custo**: ver `proposta.md`, "o que não vale a pena mexer agora" | `singer2024`, `schoenfeld2021`; tema 19 |
| `rir.alvo` (iniciante: 2 a 3 de reserva nos grandes, 1 a 2 nos isoladores) | igual para séries curtas e longas | a reserva relatada erra ~1 repetição para menos, e mais acima de 12 repetições | **a ajustar** em séries longas (moderada): pedido de texto, não de número | `halperin2022`; tema 19 |
| `objetivo.forca.faixa-compostos` | só os 2 primeiros exercícios grandes, só para intermediário e avançado | não há ensaio que justifique deixar o iniciante de fora; a força pede o mesmo movimento 2 vezes por semana | **a ajustar** (consenso): fica para um pacote posterior | `currier2023`, `acsm2026`; tema 24 |
| biblioteca: puxada e abdominal ajoelhados | não carregam o joelho | ajoelhar com dor forte no joelho é pressão direta com o joelho todo dobrado | **contrariada pelo bom senso clínico** (consenso; achado da revisão cega) | tema 23; seção 8 |

### 5.2 Regras confirmadas (por família)

| Família | Regras | Veredito | Fonte principal |
|---|---|---|---|
| Dose-resposta, série indireta 0,5, teto de 10 por sessão e 20 por semana | `volume.semanal.dose-resposta`, `.serie-indireta.peso`, `.sessao.teto`, `.teto-padrao` | confirmadas; o 0,5 foi o melhor ajuste da meta-regressão; o teto por sessão segue com um preprint e consenso | tema 18 |
| Divisões equivalentes, frequência | `divisao.*`, `frequencia.*` | confirmadas (para a força, a frequência ajuda) | tema 18 |
| Cargas equivalentes perto da falha; falha não necessária | `reps.equivalencia-cargas`, `rir.falha.nao-necessaria` | confirmadas (robusta) | tema 19 |
| Máquina = peso livre; posição alongada; isoladores obrigatórios | `selecao.equivalencia-equipamento`, `.comprimento-longo`, `.isolador-obrigatorio` e as 4 de "um estudo" | confirmadas com ressalva: ensaios pequenos; "igual" é falta de evidência de diferença | temas 20 e 26 |
| Ordem da sessão | `ordem.sessao` | confirmada (não muda a hipertrofia) | tema 20 |
| Manter os exercícios no bloco; variar não rende mais | `selecao.manter-no-bloco`, `.variacao` | confirmadas | temas 20 e 25 |
| Dupla progressão e incrementos | `progressao.subir`, `.manter`, `.salto-grande`, `.incremento.*` | confirmadas (moderada na direção; números consenso) | tema 21 |
| Semana leve só com sinal | `deload.semana-leve` | confirmada | tema 21 |
| Volta de pausa | `readaptacao.*` | direção compatível; percentuais consenso | tema 21 |
| Fase de aprendizado do iniciante | `iniciante.fase-aprendizado` | sem ensaio; consenso; fica | tema 22 |
| Cutting = mesmo programa; saúde = mesmo programa | `objetivo.cutting.*`, `objetivo.saude.texto` | confirmadas | tema 24 |
| Triagem e dor | `seguranca.*` | não avaliadas para mudança: são do profissional (seção 5.3) | tema 23 |

### 5.3 O que a pesquisa diz sobre o que o app não pergunta

| Dado | O treino mudaria como? | Para quantas pessoas | Evidência | Recomendação |
|---|---|---|---|---|
| Sexo | não mudaria | — | ganho relativo igual (`refalo2025`); sem base para ciclo ou menopausa | **não perguntar** |
| Peso e altura | não mudaria; a calibração na 1ª série já acerta os exercícios com o peso do corpo | — | sem ensaio de programa diferente | **não perguntar** |
| Idade exata | não é necessária | — | — | **não perguntar** |
| "Tenho 60 anos ou mais" (sim ou não, opcional) | mais apoio e máquinas no começo, volta de pausa mais lenta, nada de bi-set de exercícios grandes | sem dado do Brasil; nos pesos desta sessão, não está modelado | quase tudo consenso; volume baixo já serve (`radaelli2025`) | **decisão do Gustavo**: ganho pequeno e de consenso; ver `proposta.md` |
| "Tenho 18 anos ou mais" | o app não deveria montar treino para menor sem supervisão | — | posicionamentos pedem supervisão | **decisão do Gustavo** (toca os termos e o estado guardado) |

---

## 6. A biblioteca

A tabela completa (16 cenários principais × 11 músculos, e a contagem nos 55) está em [`medidas/biblioteca.md`](medidas/biblioteca.md). O resumo:

- **Nos cenários comuns não falta exercício.** Academia, bairro, condomínio, casa, halteres e elásticos têm exercício direto para todos os 11 músculos, e o iniciante não perde nenhum músculo pelo limite de complexidade.
- **Onde falta de verdade:** sem nada para puxar (8% das pessoas, estimativa), costas e bíceps ficam sem exercício; o ombro lateral fica sem exercício em 35 dos 55 cenários (13,8% das pessoas), inclusive com kettlebell, suspensão ou barra fixa sozinhos.
- **Opções "de 1ª escolha" são poucas fora da academia:** glúteos e abdômen não têm nenhuma em 50,8% e 56,9% das pessoas (falta hip thrust, máquina ou polia), e o programa usa o 2º nível da função. Isso é limite do equipamento, não defeito da biblioteca.
- **O que a revisão cega mostrou que falta:**
  1. uma **flexão mais fácil** (mãos elevadas num apoio firme): hoje a flexão de braço no chão é o degrau mais baixo, e aparece em 84% dos programas da grade. Quem não faz 8 flexões (muitos iniciantes) não tem para onde descer;
  2. **dizer que os exercícios ajoelhados carregam o joelho** (puxada unilateral ajoelhado, puxada ajoelhado com barra reta, abdominal na polia ajoelhado);
  3. para quem é forte e não tem carga, **o degrau de partida não aparece na semana** (a tela mostra "agachamento com o peso do corpo", e o degrau "1,5 repetição" só no treino).
- **Exercícios muito usados que ainda são cartão de texto:** a lista com a frequência medida, hoje e na proposta, está em [`pedidos-a-animacao.md`](pedidos-a-animacao.md).

---

## 7. O longo prazo

O que já se sabia (frente D de 06/11 e `docs/revisoes/auditoria/progressao.md`), conferido hoje com `npm run auditoria:progressao`: nos 15 casos de equipamento, 11 "andam", 2 fazem vaivém (2 pares de halteres muito espaçados; elevação lateral na polia), 1 não sobe (halter no teto) e 1 trava (panturrilha no chão só com elásticos). Nenhuma carga sugerida fora do que a pessoa tem.

O que esta sessão mediu a mais (`scripts/auditoria/prototipo/longo-prazo.ts`, [`medidas/longo-prazo.md`](medidas/longo-prazo.md); o corpo é um modelo, sem pretensão de evidência):

| Nível (ritmo de ganho de força do modelo) | Em quantas das 48 sessões de um exercício, em 24 semanas, a pessoa lê "três sessões sem melhora" | Vezes em que a carga sobe |
|---|---:|---:|
| iniciante (+1% por semana) | 24 | 1,9 |
| intermediário (+0,4%) | 36 | 0,7 |
| avançado (+0,15%) | 41 | 0,5 |

Para um intermediário, ganhar 1 repetição leva semanas; o app trata isso como platô e repete o aviso com 4 saídas genéricas. O que a pessoa ouve em 6 meses não faz sentido: é o cuidado 19 em falta.

Também continuam abertos (do mapa do que já foi medido): o nível nunca é reavaliado (a regra do próprio app reclassificaria aos ~6 meses); o programa não muda sozinho ao longo dos meses (séries fixas não são erro, segundo a pesquisa; subir séries com o tempo tem base só para força, em treinados); a semana leve continua só com sinal (confirmado).

---

## 8. A revisão cega

**Como foi feita.** 18 pessoas fictícias (as 12 dos exemplos e 6 perfis tirados dos piores grupos e do caso mais comum), cada uma com a semana de hoje e a da proposta: 36 páginas embaralhadas por um hash fixo, sem o nome da pessoa e sem dizer qual versão é qual. Três revisores (subagentes no papel de treinadores, cada um com um olhar: eficiência, adequação e segurança, "parece treinador ou máquina") deram 3 notas de 1 a 10 por página e escreveram o principal problema e o que mudariam. Foram duas rodadas: a 1ª com a 1ª versão da proposta; a 2ª depois dos ajustes que a 1ª pediu, com revisores novos e outro embaralhamento. **É opinião de treinador simulado, não evidência**; cada revisor tem a sua régua, e só vale comparar hoje × proposta dentro da mesma rodada.

**As notas do treino de hoje** (média dos 3 revisores, 18 pessoas): {{CEGA_HOJE}}. As notas da proposta e a comparação por pessoa estão em `proposta.md`, seção 3, e em [`revisao-cega/`](revisao-cega/).

**As críticas ao treino de hoje que mais se repetem** (aparecem nos três revisores, nas duas rodadas):
1. **Tempo mal usado, para os dois lados.** Avançados com 5 dias de 90 min treinam 26 a 46 min; a intermediária com dor no ombro recebe dias de 12 min; quem tem 30 min recebe dias de 36 a 40.
2. **"Parece soma de planilha".** Muitos exercícios com 2 séries cada; isoladores de ombro e braço com mais séries que os exercícios grandes; bi-sets arbitrários, com o par do 1º exercício aparecendo em 3º na lista e com séries diferentes entre os dois.
3. **Dor vira "tirar o músculo da semana".** Semana sem peito, costas e ombro com dor no ombro; exercício ajoelhado três vezes com dor 7 no joelho.
4. **Iniciante e pessoa de 67 anos com técnica de intermediário.** Búlgaro em bi-set, bola suíça, drop set, 8 exercícios por dia, flexão sem versão mais fácil.
5. **Estímulo fraco com pouco equipamento para quem é forte**, e costas a zero sem nada para puxar.

**O que eles elogiaram no treino de hoje:** a reserva de repetições e o descanso que mudam com o nível e com o tipo de exercício; os bi-sets de músculos opostos em treinos de 30 min; a adaptação ao equipamento sem improviso (elásticos, barra de porta, degrau); nenhum exercício numa articulação com dor forte, fora o caso dos ajoelhados.

---

## 9. O que este diagnóstico não mede

- **Resultado real.** Nenhuma medida aqui é músculo ganho; são regras conferidas, consenso de treinadores e um corpo simulado.
- **As semanas de aprendizado e de volta de pausa**, as divisões escolhidas à mão, os exercícios a evitar, o 2º local e duas dores ao mesmo tempo: ficam com o estresse antigo (`docs/revisoes/auditoria/estresse.md`), que não tem os 20 cuidados.
- **O que as pessoas de verdade fazem.** Os pesos são estimativa; quando o Gustavo tiver o export do próprio uso (e o de amigos), os gatilhos de platô e de semana leve devem ser recalibrados com ele.
- **Pessoas de 60 anos ou mais, gestantes e hipertensos:** o app não os distingue (ou os bloqueia), e nada aqui muda isso.
