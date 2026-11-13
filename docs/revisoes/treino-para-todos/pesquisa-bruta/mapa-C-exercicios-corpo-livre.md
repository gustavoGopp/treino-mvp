# Mapa C: o que já se sabe e o que falta (exercícios por grupamento, corpo livre e casa, equipamentos)

Fontes lidas por inteiro: `docs/pesquisa/00-metodo.md` e, em `docs/pesquisa-v2/`: `13-exercicios-por-grupamento.md` (abrevio **[13]**), `16-corpo-livre-e-casa.md` (**[16]**), `03-universo-de-equipamentos.md` (**[03]**), `08-equipamentos-v2.md` (**[08]**). Só leitura; nada foi alterado no repositório. "Não tratado" = os quatro documentos não dizem.

## 0. Chaves de leitura (de `00-metodo.md`)

- **Selos:** robusta (várias meta-análises, ou meta-análise grande + ECRs), moderada (uma meta-análise, ou alguns ECRs coerentes, ou um único grupo consistente), um estudo (um ensaio ou preprint), consenso (prática de treinadores, posicionamentos, inferência do projeto). O selo vai para o número, não para o tema; quando uma regra mistura evidência forte com número escolhido pelo projeto, vale o selo mais fraco. EMG e modelagem biomecânica são só apoio indireto (EMG não mede hipertrofia).
- **Status de leitura das fontes:** *verificado-busca* (citação existe e bate com o registro; número não conferido no artigo), *NÃO VERIFICADO*, *resumo-PubMed* (resumo oficial lido), *texto-completo* (artigo inteiro lido; só esse degrau confere número). Regra de metodologia: antes de virar constante em `src/domain/`, a fonte principal tem de ser aberta; regra só em fontes NÃO VERIFICADAS fica provisória e o app não cita o estudo; diretrizes com texto bloqueado (ACSM 2026, NSCA, PAR-Q+) não servem como fonte de números.
- **Limitações gerais da literatura** (`00-metodo.md`, "Limitações gerais"): amostras de 10 a 40; homens jovens; não treinados; 6 a 12 semanas; medidas indiretas; técnica decidida por EMG/modelagem.
- **Em [13], [16], [08]** "[opinião]" marca julgamento de quem pesquisou. [13] diz no cabeçalho que nada ali muda `regras.md`, dados ou código até decisão do Gustavo. **Quase todo texto completo lido nestes documentos é de poucas fontes** (ver §4.2); o resto é resumo-PubMed.
- **Fontes retratadas, nunca usar:** Barbalho 2020 JSCR (PMID 29781936) e 2020 EJSS (31072272) sobre isoladores [13 cabeçalho; Bíceps/tríceps P9]; Quintana-Cepedal 2025 (Copenhagen, 40827942) [16 Parte 3, fontes novas]. `barbalho2020` (hip thrust, 31975359) não está marcado, mas "usar com reserva" [13 Glúteos 2a]. `barbalho2021` (32252103) é usado como apoio em peito e glúteos e é do mesmo primeiro autor (o documento não discute isso explicitamente; "não citar" vale para os dois retratados).

---

## 1. Por músculo

Convenção: **Melhores exercícios / por quê** | **Frequência (exercícios por semana)** | **Em aberto**. Fonte = autor+ano (PMID; status). O PMID/chave é o que o documento dá; quando o doc só dá a chave (`kassiano2025var` etc.), cito a chave.

### 1.1 Peito [13 §Peito; 16 Parte 1]

- **Melhores:** um empurrar multiarticular com carga até perto da falha é a base. Supino/flexão cresceram o peito igual com carga igualada: Kikuchi 2017 (`kikuchi2017`, 29541130; texto-completo; 18 não treinados, 8 sem., flexão ajustada a 40% de 1RM do supino; espessura 17,0→20,8 mm nos dois) — **um estudo**. Só isolador cresce menos que multi: Barbalho 2021 (32252103; resumo-PubMed; 30 mulheres treinadas, 6 meses) — **moderada** para "multi > isolador sozinho" [13 Peito 2], mas é de autor com retratações em outro tema. Voador sozinho cresceu as duas porções (+17–21%), 1 série ≈ 3 séries: Pinto 2025 (40266636; resumo-PubMed) — **um estudo** [13 Peito 1b; 08 §2 "Achados novos"].
- **Por quê (regional/estabilidade/carga):** inclinado dá a **parte de cima** (2º espaço intercostal) mas só em **não treinados**, 1 dia/sem.: Chaves 2020 (32922646; **texto-completo**, PMC7449336; 47 homens, +0,62 cm vs reto, IC 0,23–1,0; reto+inclinado não superou o inclinado sozinho) — **um estudo**. Posição alongada (crucifixo): nenhum ensaio no peito; meta-análise de 12 estudos (outros músculos) achou efeito trivial: Varovic 2025 (40570881; resumo-PubMed) — **moderada (trivial)**, "peito alongado" = **consenso** [13 Peito 1e].
- **Frequência:** nenhum ensaio testou 1 × 2 exercícios de peito com volume igualado. Variar ≈ repetir no total, com volume igual (em coxa): Kassiano 2025var (39388663), Bazvalle 2019 (31881066), Fonseca 2014 (24832974), Kassiano 2022 (35438660), todos resumo-PubMed — **moderada**; "1 empurrar basta para o total do peito" é transposição (consenso para o peito) [13 Peito 1a]. A regra do app `selecao.exercicios-por-musculo` pede 2 funções complementares (consenso).
- **Sem equipamento:** flexão e flexão fechada cobrem a meta (6 séries em 2 dias; 12 em 3 dias × 4) [13 Peito 3]; falta posição alongada com carga e ênfase na parte de cima. Flexão com pés elevados é só mais carga (Ebben 2011, 21873902; resumo-PubMed), **sem EMG nem ensaio da cabeça clavicular** [13 Peito P5; 16 Parte 1 §3].
- **Em aberto:** ECR flexão × supino com medida de músculo 2019–2026 não existe; só 2 estudos (Kikuchi 2017; Kotarsky 2018, 29466268 — 4 semanas, nenhum mudou espessura); inclinado em treinados; crucifixo somado ao supino; encurtar × preencher a vaga vazia [13 Peito 6].

### 1.2 Costas: latíssimo e trapézio/romboides [13 §Costas; 16 Parte 2]

(O doc trata "costas" como um músculo do app; trapézio e romboides entram só como "meio das costas". **Costas/meio não tem seção própria**: não tratado separadamente. Ver 1.17.)

- **Melhores:** **nenhum ensaio** compara puxada × remada nem 1 × 2 exercícios de costas [13 Costas 1a, 2a]. Único dado de crescimento do latíssimo: puxada + remada sentada 2–3×/sem., 8 sem., área do latíssimo por ressonância em 18 novatos (p = 0,024): Paoli 2016 (27258300; texto-completo, PMC4924172) — **um estudo**. Não houve grupo comparando só um exercício.
- **Por quê:** a regra "vertical + horizontal" é anatomia + princípio de variação sistemática (Kassiano 2022, 35438660) — **consenso** [13 Costas 2a]. Nenhuma entrada de comprimento/amplitude para costas (`teixeira2022`, 35992501, é EMG de pullover) [13 Costas 2b].
- **EMG como apoio (não crescimento):** remada invertida ativa mais o latíssimo medial (Park 2015, 25282576); pronada ativa mais trapézio inferior que supinada (Youdas 2010, 21068680); barra fixa 117–130% da contração máxima; pegadas, larguras: latíssimo igual (Andersen 2014, 24662157; Dickie 2017, 28011412; Lusk 2010, 20543740; Buonsenso 2025, 40981044; Padovan 2024, 38689585) [13 Costas 1c, 3c].
- **Substitutos:** suspensão = tradicional no bíceps e vasto lateral em 42 idosos, **costas não medidas**: Soligon 2020 (32700098; resumo-PubMed) — **um estudo**; invertida: Fenwick 2009 (19197209), Youdas 2016 (26422610), Vural 2023 (37738266; resumo-PubMed; carga ~72,6% de 1RM com pés no aparelho), Aguilera-Castells 2020 (29902124) — consenso (EMG) [13 Costas 3a]. Elástico: força = convencional em meta-análise de 8 estudos, Lopes 2019 (30815258), hipertrofia **não achei** — moderada (força)/consenso (hipertrofia) [13 Costas 3d]. Barra fixa: **nenhum ensaio de hipertrofia** (83 resultados, nenhum) [13 Costas 3b].
- **Frequência:** "2 exercícios (vertical + horizontal)" = consenso. Com só barra fixa, 1 exercício × 2–4 séries × 2 dias = no máximo 8 séries/sem.; proposta é 2ª pegada (pronada + supinada) e até 2 exercícios de costas por sessão, ≤ 10 séries [13 Costas 3b, P1, 5]. Variação regional: coxa/braço, não costas.
- **Sem nada para puxar:** **custo = 0 séries de costas** (72 de 72 programas "Corpo livre" medidos) [16 Parte 2 §1]. Porta com toalha, batente, lençol, mesa, puxada deslizante no chão: 0 estudos de EMG/crescimento/segurança. Dado de lesão com barra fixa (inclusive de porta): ~41 mil idas ao PS em EUA 2015–2024, quase metade com trauma de cabeça/rosto; Shabbir 2026 (42945744; resumo-PubMed) — **um estudo** (levantamento). Superman e Y-T-W **não** cobrem latíssimo. Remada/puxada com resistência manual de parceiro tem ensaios (Dorgo 2023, 37949578: 84 jovens, 14 sem., massa magra ≈ pesos; Terrazas 2025, 40325759; Chulvi-Medrano 2017, 28912651) mas ficou fora (backlog) [16 Parte 2 §3-4].
- **Em aberto:** hipertrofia regional do latíssimo/trapézio; pegada e hipertrofia; remada invertida/suspensão medindo as costas; barra fixa; pullover [13 Costas 6]. Barra baixa de porta de encaixe: segurança do encaixe baixo "não tem estudo" [13 Costas P2].

### 1.3 Ombro anterior [13 §Ombro; 16 Parte 1]

- **Melhores:** os empurrares bastam. Supino 10 semanas (13 treinados × 11 controles, ressonância) cresceu o deltoide **anterior**: Lanza 2024 (39593465; resumo-PubMed; texto Elsevier não lido) — **um estudo**. `ombro_anterior` não tem meta própria (fora de `MUSCULOS_COM_META`) [13 Ombro §2].
- **Frequência:** não tratado como quantidade por semana; entra pelo empurrar.
- **Sem equipamento:** pike = nível 3, **nenhum estudo** (EMG ou hipertrofia); pike com pés elevados idem; parada de mão fora (risco de queda; enquete com 321 praticantes: 56,7% com dor crônica no punho; Martonovich 2025, 41133562 — **um estudo**, amostra autosselecionada) [16 Parte 1 §3, candidatos].
- **Em aberto:** desenvolvimento sozinho ou somado ao supino no deltoide: nenhum ensaio [13 Ombro 2b, 6].

### 1.4 Ombro lateral [13 §Ombro; 16]

- **Melhores:** elevação lateral. Único ensaio de hipertrofia do deltoide lateral: 24 treinados, 8 sem., 10 séries/sem. em 2 dias até a falha, +3,3–4,6%, halter = polia, parte alta = baixa: Larsen 2025 (`larsen2025`, PMID 40692697 como grafado em [13 Ombro 1a]; **texto-completo** no Europe PMC, PMC12277279) — **um estudo**.
- **Por quê:** supino **não** cresce o deltoide médio (Lanza 2024, um estudo); curva de resistência não parece importar (halter × polia; Nunes 2020, 32823490, polia × barra na Scott) — **moderada** (2 ensaios, músculos diferentes) [13 Ombro 3d].
- **Desenvolvimento conta 0,5 série:** convenção usada no próprio Larsen 2025; EMG (Franke 2015, 24947920; Padovan 2026b, 42713087; Rabello 2024, 39593452) — **consenso** (0,5), moderada só para a ideia geral de contar fração (Pelland 2026, 41343037) [13 Ombro 2b].
- **Frequência:** 1 exercício direto/sem. (2 se prioridade) = consenso; Larsen é 1 exercício.
- **Sem equipamento:** **não existe elevação lateral com peso do corpo**; fica a zero (68,9% dos programas "vazio", 73–75% com só barra fixa/suspensão na grade) com aviso; garrafa/galão fora por decisão do Gustavo; parada de mão fora. Isometria na parede/"sem carga": nenhum dado no deltoide [13 Ombro 3a; 16 Parte 1 §3].
- **Em aberto:** 1 × 2 exercícios no deltoide; parcial alongada/polia atrás do corpo; elástico × halter em hipertrofia do ombro [13 Ombro 6]. Programa de 2 dias: elevação lateral só no dia A (2 séries, abaixo do piso 4) [13 Ombro P4].

### 1.5 Ombro posterior [13 §Ombro; 16 Parte 2]

- **Melhores:** **nenhum ensaio de hipertrofia do deltoide posterior com exercício algum** [13 Ombro 1c; 16 Parte 2 §3]. Escolha = **consenso** + EMG: voador invertido > remada > puxada (Franke 2015, 12 treinados); na remada sentada o posterior é motor principal (Padovan 2026, 41562724). Face pull, crucifixo invertido (halter, polia) equivalentes por consenso.
- **Frequência:** 1 direto/sem. (2 se prioridade) consenso; remadas/puxadas contam 0,5 por série; sem prioridade (6 séries de costas) as indiretas dão 3, abaixo do piso 4 [13 Ombro 2d]. "ombros" como prioridade sobe só o lateral (P6 propõe incluir o posterior, [opinião]).
- **Elástico:** crucifixo invertido com elástico ativa menos o posterior e mais o médio e o trapézio que o halter (29 pessoas; Bergquist 2018, 29599855) — "alternativa viável" [13 Ombro 3c].
- **Sem equipamento:** a abertura em T de bruços sem carga ativa trapézio médio/inferior (3 EMGs: Ekstrom 2003, Lim 2015 25642047, Yu 2024 39084328) — **moderada** só para o trapézio; deltoide posterior e crescimento: **consenso** [16 Parte 2 §3]. Proposta: `abertura-t-deitado`, nível 3, "entra com cuidado".
- **Em aberto:** posterior com remada/puxada/face pull (22 resultados, nenhum de hipertrofia) [13 Ombro 6]; se a abertura em T sem carga ativa o deltoide posterior; se chega perto da falha em ≤ 30 reps [16 Parte 2, perguntas 4–5].

### 1.6 Bíceps [13 §Bíceps e tríceps; 16 Parte 2]

- **Melhores:** uma rosca basta para o total do músculo: 5 ensaios (inclinada × Scott: Kobayashi 2026, 42829982; Kassiano 2025c, 39809454 [63 mulheres]; Zabaleta-Korta 2023, 37559762; Scott barra × polia Nunes 2020, 32823490; ombro estendido × neutro Larsen 2026, 41988507) — **moderada**, todos em não treinados ou pouco treinados [13 Bíceps 1a].
- **Por quê (posição alongada/regional):** inclinada cresce mais a parte proximal, Scott a distal (diferença de 0,08–0,10 cm em Kassiano 2025c) — **moderada** para "diferença regional pequena", consenso para "2 exercícios por semana são necessários"; Larsen 2026 (perfil igualado): ângulo do ombro sozinho não muda nada; Varovic 2025 (trivial) [13 Bíceps 1b]. Rosca em comprimento inicial: Sato 2021 (34616309; +8,9% × +3,4%, 24 não treinados) e Pedrosa 2023 (36828324; 19 mulheres; soma das áreas igual) — **um estudo** cada ("rende mais"); moderada ("não rende menos") [13 Bíceps 1g].
- **Multi vs. isolador:** "multi basta" vale para o total do bíceps (meta-análise Rosa 2022, 7 estudos, trivial; Gentil 2013, 23537028, 29 não treinados; Gentil 2015, 26244600, **medido só por circunferência**, n = 10/grupo) — moderada; contra: rosca cresceu **o dobro** da remada por série (+11,1% × +5,2%, 10 não treinados, Mannarino 2021, 31268995) — **um estudo** [13 Bíceps 1f]. Por série indireta: 0,5 = **um estudo** (a direção "entre 0 e 1" é moderada) [13 Bíceps 6].
- **Frequência:** 1 rosca basta para o total; 2 cobrem regiões. Treinar empurrar/puxar no mesmo dia ou separados: mesmo bíceps/tríceps (22 treinados, Gonçalves Dias 2026, 41379532) — um estudo.
- **Sem equipamento:** bíceps = 0 sem ancoragem (100% dos programas "vazio"). **Saída nova:** contrair ao máximo sem carga cresceu a espessura **igual** à rosca a 70% de 1RM em 13 pessoas, um braço de cada lado, 18 sessões: Counts 2016 (27329807; **só resumo**, texto Elsevier não lido; resumo não dá séries/reps/descanso/nível de treino) — **um estudo**; co-contração bíceps+tríceps +4% em 12 sem., 0 em 4 sem.: Maeo 2014 (24368554; 9 treinando/7 controle) — **um estudo**, 2 ensaios do mesmo grupo. Isometria com toalha: sem estudo (Zou 2023, 36900849: só isometria **até a falha a 50% da força** cresceu) [16 Parte 2 §3].
- **Em aberto:** Counts 2016 em treinados; contar a série sem carga (1 ou menos); texto completo pendente [16 Parte 2 "Perguntas em aberto"]; ensaio de pegada de barra fixa e crescimento; replicação.

### 1.7 Tríceps [13 §Bíceps e tríceps; 16 Parte 1]

- **Melhores:** exercício com o braço acima da cabeça: cabeça longa +28,5% × +19,6% e tríceps inteiro +19,9% × +13,9% vs. braço ao lado, com 34–39% menos carga: Maeo 2023 (35819335; resumo-PubMed; 21 pessoas, 12 sem.) — **um estudo** (efeito moderado a grande). O supino sozinho **não** cresceu a área do tríceps e a extensão deitada sim; cabeça lateral cresce mais com supino: Brandão 2020 (32149887; 43 homens, 8 sem., ressonância) — **um estudo** [13 Bíceps 1d-1e]. Replicação de Maeo 2023 por outro grupo: nenhuma [13 Bíceps 6].
- **Sem equipamento:** flexão e flexão fechada dão tríceps total ~4,5–7,5 séries; extensão acima da cabeça = **vazia**. EMG: mãos juntas ativam mais o tríceps (Cogley 2005, 16095413; Marcolin 2015, 26488636; Intziegianni 2026, 41892990; **moderada** para "ativa mais", consenso para "cresce mais"); mãos afastadas nunca deram mais peito. Proposta: extensão com peso do corpo (mãos num apoio fixo; ombro a 90–120°) — posição = **um estudo**, versão com peso do corpo = **consenso**, nenhum estudo [16 Parte 1 §3, 5].
- **Em aberto:** ensaio de hipertrofia com flexão fechada, mergulho no banco, extensão com peso do corpo (suspensão, "tiger bend") [13 Bíceps 6].

### 1.8 Quadríceps [13 §Quadríceps; 16 Parte 3]

- **Melhores:** um exercício de agachar/afundo com o volume certo cresce os vastos como outro (Kinoshita 2026, 41630124, texto-completo no projeto, leg press × extensora vastos +7,1% × +4,9%; Amanuma 2025, 41316621, n = 8 mulheres, afundo ≈ leg press; Kassiano 2025var) — **moderada**. **Reto femoral** precisa de extensão de joelho: +13,2% × +1,1% (Kinoshita 2026), Kassiano 2026 (41379528; 63 mulheres: extensora > smith para o reto femoral; smith > extensora para o vasto lateral), Zabaleta-Korta 2021 (34743671), Kubo 2019 (31230110) — **moderada** (3 ensaios de 3 grupos), com um estudo pequeno contra (Amanuma, n = 8) [13 Quad 1a-1b].
- **Profundidade:** até o paralelo (90°) basta; quarto de agachamento rende menos (Bloomquist 2013, 23604798, 17 homens, 12 sem.); Kubo 2019, Larsen 2025b (leg press; 41283547), Hammami 2025 (40113586) sem diferença — um estudo cada, direções opostas; moderada para "completa ≥ parcial" (Pallares 2021; Wolf 2023) [13 Quad 2b].
- **Unilateral × bilateral:** para o total, unilateral = bilateral (Kassiano 2025, 39794667) — moderada. Agachar × afundo cobrem regiões diferentes (Núñez 2018, 29590139; 27 jogadores, 6 sem., aparelho inercial: lateral slide cresceu mais vasto medial, meio agachamento o vasto lateral) — um estudo. **Agachar + afundo × 2 agachamentos com volume igual: não achei** [13 Quad 1c, 6].
- **Frequência:** "agachar (ou afundo) + extensora" é o par sustentado (moderada); "agachar + afundo" = consenso.
- **Peso do corpo:** cresce quando a série vai até perto da falha ou progride: Ogawa 2023 (37133323; 37 adultos 30–64 anos, 8 sem.; **texto não abriu os números**), Wei 2023 (37598268; 13 sedentárias; progressão bilateral→unilateral ≈ barra), Takai 2013 (24149726; 94 meninos). **Não cresce** com repetições fixas folgadas: Yoshiko 2021 (33767255), Hirono 2023 (36853505), Yoshimoto 2016 (27336797); Lasevicius 2022 (31895290: extensora a 30% 1RM, +7,8% até a falha × +2,8% sem) — moderada (carga baixa até a falha) / um estudo cada [13 Quad 3a]. Búlgaro com carga +9,3% (Wang 2026, 41983008); búlgaro só com peso do corpo: **nenhum ensaio**. Sem extensora: nórdico invertido (Alonso-Fernández 2019, 30293403; 26 pessoas, **sem controle**, periódico fechado; EMG 2024, 39214520, diz que não ativa mais que agachamentos com peso do corpo), flexão de quadril isométrica (Ema 2018, 29117442; 37 não treinados, 4 sem.) — um estudo fraco; sissy squat: 0 estudos [13 Quad 3c; 16 Parte 3 §3.1].
- **Em aberto:** ensaio em treinados com agachamento de peso do corpo (nenhum); extensão com caneleira/elástico com hipertrofia medida; flexão dinâmica de quadril e reto femoral; agachamento com calcanhar elevado só EMG (Ameer 2026, 41143978) [13 Quad 6; 16 Parte 3].

### 1.9 Posteriores da coxa [13 §Posteriores; 16 Parte 3]

- **Melhores (um exercício basta):** cada exercício testado sozinho cresceu o grupo (não treinados, 9–12 sem.): flexora sentada +14% e deitada +9% (Maeo 2021, 33009197, texto-completo no projeto); nórdico +11% (Maeo 2024, 38857522, **texto-completo**; Morin 2025, 40644669); stiff +7%; terra romeno ≈ nórdico (+10%, Crawford 2025, 40085810; 32 pessoas); flexão excêntrica com quadril dobrado +18% — **moderada** (3 grupos independentes, n 20–42) [13 Post 1a].
- **Por quê (regional):** flexão de joelho com quadril estendido (nórdico) cresce mais ST (+20–27%) e BFcc (+22%); quadril dobrado (flexora sentada, stiff, extensão a 45°) cresce mais BFcl (+19% × +5%) e SM (+14% × 0) — **moderada** (Maeo/Balshaw, Morin/Nordez, Bourne/Lazarczuk: Bourne 2017, 27660368; Lazarczuk 2024, 39297348; Frouin 2024, 38515303; Mitsuya 2026, 42958421 apoio indireto) [13 Post 1b]. A flexora sentada já cresce BFcl e SM.
- **Frequência:** "1 com 10+ séries/sem. cresce os posteriores" moderada; "2 de tipos diferentes cobrem todas as cabeças" moderada; "2 > 1 no total" consenso. Nórdico: precisa de 2–3 séries de 8–12 para mudar espessura em atletas (Cholp 2025, 41178985, texto-completo; Presland 2018, 29572976; Pollard 2019, 30629773) [13 Post 3a].
- **Sem equipamento:** posteriores são o músculo menos prejudicado (0% a zero na grade); o custo é de **cobertura de cabeças** (sem "dobrar o quadril": BFcl +5%, SM 0% só com o nórdico) e, no iniciante, de séries (1 exercício/dia: 6/sem.). **Flexão deslizante: nenhum ensaio de hipertrofia** (só EMG de reabilitação); stiff com peso do corpo: nenhum ensaio; isometria longa a 30% da força cresceu a área em 8 sem. (Nakao 2023, 37729512; 28 pessoas) é apoio indireto [13 Post 3b-3c].
- **Em aberto:** nórdico × flexora sentada cabeça a cabeça; 1 × N séries vs. 2 × N/2; mulheres, meia-idade, casa sem supervisão (ECRs são de homens jovens; Crawford 2025 tem 15 mulheres de 32 sem separar por sexo) [13 Post 6].

### 1.10 Glúteos [13 §Glúteos; 16 Parte 3]

- **Melhores:** um exercício de extensão de quadril basta para o glúteo máximo: meta-análise de 2025 (12 ensaios, 318 pessoas), SMD 0,74 (um exercício, 7 ensaios) e 0,68 (combinação, 6 ensaios): Krause Neto 2025 (40276368; texto-completo) — **moderada**. Hip thrust ≈ agachamento profundo: Plotkin 2023 (37877099; texto-completo no projeto; 34 não treinados, 9 sem.), Bartolomei 2025 (39539142; 19 treinados, 6 sem.) — **moderada**; ordem "agachar profundo ≥ hip thrust" = consenso. Barbalho 2020 (31975359; agachamento +9,4% × hip thrust +3,7%) com reserva (falhas de método, autor com retratações) [13 Glúteos 2a].
- **Por quê (regional):** extensão de quadril na polia unilateral +9% (padrão de baixo), abdução +5% (padrão de cima e glúteo médio/mínimo +4%): Attarieh 2026 (42842490; resumo-PubMed; 17 pessoas, pernas comparadas na mesma pessoa) — **um estudo**. Agachamento completo +6,7% × meio +2,2% (Kubo 2019).
- **Frequência:** 1 exercício de extensão de quadril basta; "2 é melhor": **não achei** (consenso). Leg press + stiff +6,0% × + hip thrust +9,3%, mas com **mais séries** (Kassiano 2024, DOI 10.47206/ijsc.v4i1.284, fora do PubMed) — um estudo, não igualado.
- **Séries indiretas:** reais; não inflam (Kubo 2019; leg press +13–18% na meta-análise). O que infla: abdução contada como série inteira de "glúteos"; flexões de joelho com glúteo secundário (nenhum ensaio) — (i) um estudo, (ii) [opinião] [13 Glúteos 6].
- **Sem equipamento:** **nunca fica vazio** (custo 0 séries); o custo é de carga. Ponte com peso do corpo: **nenhum ensaio** (só EMG/fisio); Wei 2023 (agachamentos de 10 níveis) cresceu o glúteo como barra a 60–80% 1RM — um estudo. Ponte bilateral passa de 30 reps para quem treina; unilateral/pausa como degrau = consenso. Abdução deitada sem carga: **nenhum ensaio**; conta só se 15–30 reps terminarem perto da falha (consenso; "0,5" é [opinião]) [13 Glúteos 3a-3b]. Prancha lateral e Copenhagen: ficam fora ([16 Parte 3]: força modelada de Collings 2023, 36918403; Copenhagen **não aumentou** espessura dos adutores em 12 jovens atletas, Alonso-Calvete 2021, 34948565).
- **Em aberto:** ponte (bi/uni) e hipertrofia; abdução sem carga; afundo/búlgaro/step-up e hipertrofia do glúteo (só EMG); stiff isolado; comprimento muscular no glúteo [13 Glúteos 6].

### 1.11 Adutores e abdutores [13 §Quad/Glúteos; 08; 16]

- **Abdutores (glúteo médio/mínimo):** ver 1.10 (Attarieh 2026, um estudo). Abdução máquina/polia = "um estudo" (era consenso) [08 §2]. Mini-band e caneleira abrem a abdução em casa (`equipamento.mini-band`, um estudo `attarieh2026`) [13 Glúteos 2.1].
- **Adutores:** **não são um dos 12 músculos com meta**; decidido em 01/11/2026 que contam no volume sem meta (como o ombro anterior) e a cadeira adutora fica opcional [08 topo, §9]. **Falta ensaio de hipertrofia com a máquina adutora** [08 §9]. Agachamento completo/afundo e o afundo lateral crescem o adutor (Núñez 2018: +11,1% no adutor com afundo lateral; Plotkin 2023: agachamento cresceu mais quadríceps e adutor) — um estudo [13 Quad 1c; Glúteos 2a]. Copenhagen: maior força (Collings 2026, 41931009; força modelada, 15 pessoas) mas sem crescimento no ECR de Alonso-Calvete 2021 — não entra [16 Parte 3].
- **Em aberto:** exercício de adutor com evidência direta de hipertrofia; quantas séries; sem equipamento (afundo lateral/cossack: nada além de força modelada de exercício parecido).

### 1.12 Panturrilha [13 §Panturrilha; 16 Parte 3]

- **Melhores:** exercício **em pé** (ou leg press com joelho esticado). Em pé +12,4%/+9,2% × sentada +1,7%/+0,6% (gastrocnêmio); sóleo igual nas duas (+2,1% × +2,9%): Kinoshita 2023 (38156065; texto-completo no projeto) — **um estudo** (efeito grande); o sóleo também cresce com a em pé em outros 3 ensaios (Kassiano 2024b, 38684187 [12 séries: +12,7% sóleo]; Fujiwara 2010, 20453430; Weiss 1988, 3340658) — **moderada** [13 Pant 2b].
- **Amplitude (posição alongada):** só a metade de baixo (calcanhar abaixo) +15,2% medial × completa +6,7% × só a de cima +3,4% (Kassiano 2023b, 37015016; leg press, 42 mulheres) — **um estudo**; parciais alongadas depois da falha: 3 ensaios, não superiores com volume igualado (Larsen 2025a, 39995432; Larsen 2025e, 40850937; Goli 2026, 42006449; Pedrosa 2026, 41777276) — **moderada**; revisão 2026: o ganho do alongado aparece **quando há carga externa relevante na posição alongada** [13 Pant 2d].
- **Volume:** 12 séries/sem. > 6 (Kassiano 2024b, 61 mulheres, 6 sem.) — um estudo. Frequência: todos os ensaios usaram **um** exercício; 2 exercícios não testados.
- **Sem equipamento:** chão sem degrau = só a metade de cima (a que menos cresceu); bilateral subindo e descendo rápido **não cresceu**, uma perna com descida de 3 s cresceu +9,1% (Nakamura 2025, 40229595; 15 sedentários); unilateral até a falha dá mediana de 25 reps em 500 adultos (Visser 2025, 40020545; menos em mulheres e sedentários) — um estudo; bilateral quase sempre passa de 30 reps = [opinião] (inferência). Degrau de escada: proposta; foi decidido como "alternativa sem móvel" [13 Pant 3-4; 16 Parte 3].
- **Treinados:** 27 treinados, 6 sem., alta carga × oclusão: **nenhum** cresceu (Kataoka 2022, 34981201) — um estudo [13 Pant 3c].
- **Em aberto:** 1 × 2 exercícios; chão × degrau (comparação direta); repetições da bilateral até a falha; agachamento/afundo e gastrocnêmio (só Wei 2023, não separa); causa dos ~22% de zero em academia (não investigada) [13 Pant 6].

### 1.13 Abdômen [13 §Abdômen; 16 Parte 3]

- **Melhores:** **não existe ensaio de hipertrofia que compare exercícios de abdômen entre si, nem programa com e sem trabalho direto** [13 Abd, resumo]. Sinais fracos de crescimento do reto: Pilates 36 sem., 9 mulheres, +21% sem controle (Dorado 2012, 22357302); flexão na suspensão até a falha +27% em 8 homens sem controle (Kohiruimaki 2019, 31466083); tenistas +58% observacional (Sanchis-Moysi 2010, 21209832) — um estudo cada. **Novo** em [16]: ECR em idosos em que o treino de tronco aumentou a área do reto contra controle (+2,08 cm²): Shahtahmassebi 2019 (30859637; resumo-PubMed) — um estudo (idosos); EMG: invertido inclinado entre os que mais ativam o reto (Escamilla 2006b, 16649890), mas ativa o reto femoral.
- **Frequência/volume:** "um exercício de flexão de tronco basta" = consenso; meta de 4 séries/sem. = **consenso** (curva de Schoenfeld 2017a extrapolada de membros), **não moderada**. Faixa ~6–30 perto da falha vale (robusta, Schoenfeld 2017b, 28834797); carga muito leve (20% 1RM) cresce menos (Lasevicius 2018); >30 reps: nenhum dado.
- **Necessidade de trabalho direto com agachamento/terra:** EMG discorda (Hamlyn 2007, 18076231: sem mudança; Oliva-Lozano 2020, 32560185; Martuscello 2013 não mediu o reto; Saeterbakken 2019: afundo ativa menos que prancha) — consenso (manter trabalho direto).
- **Equipamento:** custo em séries **zero em todos os cenários** (chão basta). O problema é de **montagem**: 11,6% dos programas com 0 série; sai nos cortes de tempo [13 Abd §2-3].
- **Em aberto:** dose-resposta; ensaio de hipertrofia com e sem trabalho direto; comparação entre crunch/prancha/roda/elevação; série >30 reps; carga × sem carga (só agudo, Sullivan 2023, 37621710); ensaios 2024–2026 do reto em adultos saudáveis [13 Abd 6].

### 1.14 Antebraço

**Não tratado.** A única menção é "variações de pegada e antebraço" numa revisão de EMG (Padovan 2024 etc.) dentro de 13 §Costas 3c. Nenhum exercício, volume ou evidência de antebraço/pegada como músculo-alvo.

### 1.15 Lombar / eretores

**Não tratada como músculo-alvo.** [16 Parte 2 §2] registra que "o eretor da coluna não é um músculo do app (`MUSCULOS` não tem eretores nem trapézio)". O que aparece é só risco/apoio: superman ativa eretor e multífido (reabilitação); extensão de tronco no chão mudou a espessura do multífido **agudamente**, não crescimento (Kellis 2025, 39832495); hiperextensão com carga cresceu BFcl (Bourne 2017); good morning sem peso fora (Vigotsky 2015, 25653899, só com barra); flexão com um braço só deu a maior compressão lombar em 12 variações (Freeman 2006, 16540847; 10 universitários); flexão explosiva e com um braço carregam mais a lombar [16 Parte 1 e 3]. Sem proposta de volume, exercício direto ou "lombar × posteriores".

### 1.16 Pescoço

**Não tratado**, exceto como contexto: o único ensaio de resistência auto-aplicada é de pescoço em adolescentes, mediu **força** (Attwood 2022, 34558993) e foi citado para dizer que não há ensaio de hipertrofia de bíceps com auto-resistência [16 Parte 2 §3].

### 1.17 Trapézio (e "costas/meio")

**Sem seção própria.** Trapézio médio e inferior aparecem como alvo de EMG da abertura em T/Y (Ekstrom 2003; Lim 2015; Yu 2024; Rabello 2024; moderada só para "ativa") e como "romboides/trapézio" dentro de costas [13 §Costas; 16 Parte 2]. O trapézio **não é músculo do app** [16 Parte 2 §2]. Nenhum ensaio de hipertrofia de trapézio/romboides (`13 Costas 1c`). "Costas/latíssimo" × "costas/meio" não se separam nos documentos: não tratado.

---

## 2. Peso do corpo e casa [16 inteiro; 13 por grupamento "Sem equipamento"]

### 2.1 Princípio geral de evidência

- **Carga baixa até perto da falha cresce como carga alta** (faixa até ~30–35 reps): **robusta** para a regra geral (Schoenfeld 2017b, 28834797; López 2021, 33433148, 28 estudos; Lasevicius 2018/2022); **moderada** nos treinados e no teto [16 Parte 3 §3.2]. Teto de ~30 repetições = `reps.teto.carga-limitada`, **consenso** [13 Costas 3d].
- Parar longe da falha com carga baixa não cresce: Lasevicius 2022 (extensora a 30% 1RM +7,8% × +2,8%); Yoshiko 2021 e Hirono 2023 (idosos, 100 agachamentos/dia ou 4×35 até a cadeira: sem mudança) [13 Quad 3a].
- **Ressalva importante de tipo de população:** os ensaios de peso do corpo são de **sedentários, jovens, mulheres, crianças, idosos**; "ensaio em treinados de agachamento com peso do corpo: nenhum" [13 Quad 6].

### 2.2 Até onde vai, por músculo (resumo dos documentos)

| Músculo | Sem equipamento | Evidência | Selo | Onde |
|---|---|---|---|---|
| Peito | Cobre meta (flexão, flexão fechada); falta posição alongada com carga e parte de cima | Kikuchi 2017 flexão ≈ supino com carga igualada, 8 sem., não treinados (texto-completo) | um estudo | [13 Peito 1d, 3] |
| Tríceps | Total ~4,5–7,5 séries pela flexão; cabeça longa/alongada vazia (proposta: extensão no apoio) | Maeo 2023, Brandão 2020; extensão com peso do corpo: nenhum estudo | um estudo (posição) + consenso | [16 P1 §3] |
| Ombro anterior | Pike (nível 3); 0,5 por série | nenhum estudo | consenso | [13 Ombro 3a; 16 P1] |
| Ombro lateral | **Zero** | nenhuma versão com peso do corpo | consenso | [13 Ombro 3a] |
| Ombro posterior | Só abertura em T (trapézio) | 3 EMGs | moderada (trapézio) / consenso | [16 P2] |
| Costas | **Zero** (72/72 programas) | porta/toalha/mesa: sem estudo; barra fixa de porta: Shabbir 2026 | consenso; um estudo (lesões) | [16 P2] |
| Bíceps | Zero, ou "rosca sem carga" (pendente) | Counts 2016 (resumo) | um estudo | [16 P2] |
| Quadríceps | Agachamento/afundo/búlgaro; reto femoral fraco | Ogawa 2023, Wei 2023, Takai 2013; nórdico invertido sem controle | um estudo cada | [13 Quad 3] |
| Posteriores | Flexão deslizante, nórdico; sem "dobrar o quadril" | nórdico +11% (Maeo 2024); deslizante sem ensaio | moderada (nórdico) / consenso | [13 Post 3] |
| Glúteos | Ponte, afundo, abdução deitada | Wei 2023 (agachamentos); ponte sem ensaio | um estudo / consenso | [13 Glúteos 3] |
| Panturrilha | Chão; degrau recomendado | Nakamura 2025; Kassiano 2023b | um estudo | [13 Pant 3] |
| Abdômen | Chão basta; custo 0 | sinais fracos | consenso | [13 Abd] |

### 2.3 Flexão × supino (e variações) [13 Peito 1d; 16 Parte 1]

- Flexão comum carrega ~64% do peso do corpo (de joelhos ~49%) [13 Peito 1d]. Em moderadamente treinados (23 homens, 4 sem.) flexão ≈ supino no 1RM, **ninguém mudou espessura** (curto demais). Em avançados: força igual em 5 sem., sem medir músculo. **De 2019 a 2026 não há ECR novo flexão × supino com medida de músculo** [13 Peito 1d, 6; 16 P1].
- EMG de variações: mãos juntas ativam mais o tríceps e pelo menos tanto o peito (3 EMGs, moderada para "ativa", consenso para "cresce"); mãos afastadas **não** dão mais peito (Kim 2016, 27064571; Gottschall 2018, 29809073; Intziegianni 2026); flexão inclinada baixa a ativação de todos (revisão de escopo, 30 estudos; Kowalski 2022, 35599715); flexão declinada: **sem EMG da cabeça clavicular** e só um preprint de modelagem (Zhang 2023, não sustenta selo) [16 P1 §3].
- Punho neutro (mãos fechadas): menos carga em punho/cotovelo e **mais no ombro** (Polovinets 2026, 42269686; 14 homens) — um estudo [16 P1 §3].

### 2.4 Como progredir sem carga [16 Parte 1, 3; escadas]

- **Escadas** (`escadas.json`): descida lenta (3 s), pausa, pés/ombros elevados, 1,5 repetição, unilateral, déficit, amplitude maior. 13 escadas do corpo livre têm 24 menções de descida lenta, 18 de pausa, 4 de 1,5 rep, 6 de unilateral, 8 de pés/ombros elevados, 3 de amplitude maior; isometria longa, parciais, rest-pause e drop set mecânico têm 0 [16 Parte 3 §3.2].
- **Tempo/cadência:** duas meta-análises de 2025 dão efeito mínimo da cadência (Enes 2025, 42709703: 14 estudos, diferença trivial a favor do rápido; Amdi 2025, 40692176: 9 estudos, hipertrofia incerta); muito lento (>10 s) parece pior — **moderada**. Logo a descida lenta serve **como degrau porque leva a série perto da falha antes das ~30 reps, não porque "lento cresce mais"** ([opinião] de [16]). Tanimoto 2006 (16339347): tensão contínua a 50% cresceu como 80% (24 não treinados) — um estudo.
- **Unilateral:** progressão bilateral→unilateral ≈ barra (Wei 2023, um estudo); unilateral = bilateral para o total (Kassiano 2025, moderada); panturrilha unilateral com descida 3 s (Nakamura 2025); step-up só serve como degrau intermediário (Hatfield 2017, 27984498: tarefa **menos** exigente do quadril sem carga); agachamento numa perna até a cadeira: EMG excêntrica maior que búlgaro/afundo (23 pessoas) — um estudo (EMG) [16 Parte 3 §3.1].
- **Pausa na repetição, 1,5 repetição:** não há ensaio de hipertrofia (consenso) [16 §3.2].
- **Isometria no comprimento longo:** revisão (Oranchuk 2019, 30580468; só no `10`, ainda fora de `fontes.md`) e ≈ isotônica no quadríceps em 23 treinados (Varovic 2025b, 40911904) — moderada/um estudo. Parciais alongadas na panturrilha: ver 1.12. Pré-exaustão: não traz ganho (Trindade 2019; Hermann 2026, 42516618). Nenhum método avançado supera séries comuns (Cowley 2026, 41951916: rede bayesiana; g = 0,046 em 23 estudos de treinados recreacionais) — **moderada** [16 §3.2].
- **Drop set mecânico** (flexão → inclinada): nenhum estudo (consenso); drop set com carga ≈ séries comuns.

### 2.5 O que dizem sobre quem já é forte

- **Flexão:** "para quem já faz > 30 flexões, a série deixa de contar (`schoenfeld2017b`): o preenchimento só adia o fim da escada, não o resolve" [13 Peito P2 risco]. Existe `equipamento.fim-da-escada` (regra citada; texto não lido por mim) [16 P2 "Proposta"].
- **Ponte bilateral** passa de 30 reps em poucas semanas; unilateral/pausa deve ser o ponto de partida do intermediário/avançado (consenso) [13 Glúteos 3a, P8]. Agachamento bilateral fica leve; escada para sem step termina em "1,5 reps com descida de 3 s" com duas pernas → degrau novo "uma perna até a cadeira" (um estudo EMG) [16 Parte 3 §2-3].
- **Barra fixa:** o avançado "passa do piso de carga sem lastro" (consenso) e o iniciante muitas vezes faz 0 reps [13 Costas 3b].
- **Panturrilha:** bilateral >30 reps ([opinião]); em treinados responde pouco em 6 sem. (Kataoka 2022).
- **Abdômen:** com >30 reps subir o degrau (descida, pausa, peso no peito com objeto da casa [opinião]); série com 40+ reps como efetiva: nenhum estudo.
- **Evidência em treinados para peso do corpo: nenhuma** (agachamento) [13 Quad 6]. Isometria longa em treinados: Varovic 2025b. Rosca sem carga em treinados: "nenhum estudo" [16 P2 Perguntas em aberto 2].
- Meta-análises: cresce o treinado com carga baixa (moderada), mas todos os ensaios de peso do corpo concretos são de populações destreinadas.

### 2.6 Faixas de repetições altas (o que está nos documentos)

- Faixa de eficácia 6–30 perto da falha (robusta, `schoenfeld2017b`); teto prático ~30 (consenso). Carga muito leve (20% de 1RM) cresce menos (Lasevicius 2018) — [13 Abd Q1c].
- Faixas de biblioteca citadas: flexão 8–15; pike 6–12; abdominal 12–20 (`reps.faixa.degrau`, consenso); extensão de tríceps com peso do corpo 10–15; panturrilha (ensaio) 15–20 RM; abertura em T 15–30; rosca sem carga [10,15] ([opinião]: Counts 2016 não dá as repetições); nórdico proposto 6–10 (ensaios 6–12; faixa atual 4–8); abdução deitada 15–30 reps. Origem dessas faixas é "consenso/[opinião]", não ensaio.
- Descanso curto: 30 s ≈ 150 s com carga baixa até a falha (Fink 2017, 27984843; 21 pessoas) e 20RM/30 s > 8RM/3 min no braço (Fink 2018, 28032435) — um estudo cada; meta-análise dá vantagem pequena >60 s (Singer 2024) — `descanso.piso` mantido [16 §3.2].

### 2.7 O que declaram não saber (corpo livre)

- Qualquer ensaio de hipertrofia com **pike, flexão declinada, arqueiro, pseudo-planche, extensão de tríceps com peso do corpo, stiff sem peso, ponte (bi/uni), abdução sem carga, step-up/búlgaro/afundo para trás só com peso do corpo, deslizante, nórdico invertido com controle, mergulho na cadeira, elevação lateral deitado** [16 P1, P3; 13 §6 de cada grupamento].
- Se a flexão com pés elevados enfatiza a parte de cima do peito [13 Peito 6; 16 P1].
- Segurança de mesa, porta, toalha, lençol: nada [16 P2]. Rabdomiólise por flexões: relato de caso, NÃO VERIFICADO (Suzuki 2017, 28500110) [16 P1 §3].
- Se o app consegue dosar estímulo sem carga ("aperte o máximo"): a pessoa estima mal a própria força na isometria (Keller 2018, 29176386; 20 adultos) e RIR/dupla progressão não existem sem carga [16 P2 "Como o app prescreveria"].
- Se, sem puxar, empilhar empurrar é prejudicial: sem ensaio prospectivo; caso-controle (Kolber 2010/2014/2017) = consenso [16 §3.3].
- Divisão: com o mesmo volume, Superior/Inferior × corpo todo empatam (**robusta**: Ramos-Campo 2024, Schoenfeld 2019a, Pelland 2026); medido: sem puxar o dia de superiores tem 19–29 min e 2–3 exercícios [16 §3.3].

---

## 3. Equipamentos [03; 08; 13; 16]

### 3.1 Base de evidência geral

- **Máquina e peso livre dão o mesmo crescimento** (Haugen 2023, 37582807; texto-completo no projeto) — **robusta** [03 topo; 13 Costas 4]; "o tipo de equipamento não muda o resultado de forma consistente" (ACSM 2026, 41843416) [03 topo] — *texto da diretriz ACSM 2026 não foi lido* (00-metodo: diretrizes com texto bloqueado não servem para números). Hernández-Belmonte 2023 (37535335) sustenta o mesmo [13 Costas 4; 08 §7.1].
- **Não há lista oficial do que cada lugar tem no Brasil**; "comum" é [opinião], apoiada em guias de condomínio e páginas de rede **não verificados** [03 topo; 08 §3, §9].
- Cenários típicos: Casa, Condomínio, Academia de bairro/rede, Academia completa [03]. Atalhos de tela: "casa com halteres e elásticos", "condomínio com multifuncional", "academia completa"; nada vem pré-marcado [08 §3].
- Capacidades: o gerador trata equipamento **por capacidade**, máquina = peso livre, estabilidade só pesa para iniciante (`selecao.estabilidade`), ≥ 2 alternativas por padrão [03 "Como o gerador deve tratar"].

### 3.2 O que cada tipo permite e como a carga sobe [08 §1, §1.1, §2]

| Tipo | O que permite | Como a carga sobe (incremento) | Calibração 1ª série |
|---|---|---|---|
| **kg conhecido** (halteres fixos/montáveis, kettlebell, barra longa/W/hexagonal) | quase tudo; barra: agachar, dobrar quadril, empurrar, puxar; hexagonal: terra com menos carga na lombar; kettlebell: swing, goblet, remada | próximo peso da lista; na barra, o menor par de anilhas | fórmula até 12 reps, arredondada para baixo |
| **placa da torre** (polias, estações, multifuncional, máquinas de torre) | polia: quase tudo; estações de puxada/remada; supino, voador, desenvolvimento, remada articulada, máquinas de braço/abdômen, extensora, flexora, abdutora, glúteo, panturrilha | ±1 placa; 2 se leve demais (`progressao.carga-leve`) | só passos |
| **anilhas numa máquina** (leg press, hack, smith, panturrilha sentada, supino/remada de anilha) | agachar guiado, etc. | menor par de anilhas por lado | só passos: peso do trenó/barra do smith é desconhecido |
| **contrapeso** (graviton) | barra fixa/mergulho assistidos | −1 placa = progredir (mais placa = mais fácil); ao zerar vira versão livre | passos invertidos |
| **degrau** (peso do corpo, paralelas, suspensão, banco romano, elásticos) | ver escadas | próximo degrau (`progressao.incremento.peso-corporal`) | um degrau abaixo |

Todos os incrementos acima são **consenso** [08 §7.1] — "nenhum estudo diz quanto importa" o desconhecimento do peso do trenó [08 §9]. Valor padrão de menor anilha 2 kg é [opinião], a confirmar [08 §1.1].

### 3.3 Máquinas [08 §2, §9; 13]

- Equivalência máquina = peso livre = polia: **robusta** (Haugen 2023). Ordem dentro do nível é por carga/estabilidade, não por crescimento [13 Costas 4].
- **Sem ensaio de hipertrofia** para hack, smith (como exercício comparado), supino/desenvolvimento na máquina, remada articulada, voador invertido, graviton, mergulho, kettlebell, banco romano, suspensão, abdominal e adutora na máquina; base é EMG, biomecânica, equivalência e consenso [08 §9]. Busca sem resultado: assisted pull-up em máquina, goblet kettlebell × halter, máquina de tríceps, crucifixo máquina × polia [08 §9, buscas].
- Onde há ensaio: leg press × extensora (Kinoshita 2026); extensora × smith (Kassiano 2026); voador (Pinto 2025); hip thrust, coice na polia, abdução (Attarieh 2026); panturrilha em pé (Kinoshita 2023); triceps-maquina acima da cabeça por analogia a Maeo 2023 [08 §2].
- Máquina de braço, tríceps em máquina: selo "um estudo (Maeo 2023)" só se `acimaDaCabeca`.
- Selos de função em [08 §2] (por função, não por ensaio comparando máquinas): puxada na estação, remada na estação, desenvolvimento na máquina, remada articulada, graviton: **consenso**; supino na máquina, hack, smith: um estudo (a "um estudo" aqui vem da própria função, não de ensaio com a máquina) — **inconsistência a notar**: em [08] o selo "um estudo" aparece para hack/smith/supino na máquina, mas §9 diz que não há ensaio de hipertrofia com eles.
- Multifuncional: **[opinião]**, "não achei lista de fabricante nem estudo sobre o que um multifuncional típico tem" [08 §1].
- Estimativa pós-R0b/R0c academia completa: ~62 exercícios usados e ~40% máquinas nas vagas (modelo simplificado, nível intermediário; **estimativa**, não medida) [08 §3.1, §6.1].

### 3.4 Elástico [13; 16; 08]

- Força: elástico = carga convencional, meta-análise de 8 estudos (Lopes 2019, 30815258) — **moderada**.
- **Hipertrofia: nenhum ensaio** com elástico em ombro, costas ou outros músculos; meta-análises são de idosos/doentes; busca `elastic AND deltoid AND hypertrophy` 0 úteis [13 Ombro 3c, 6; Bíceps 6; Costas 3d]. Selo: **consenso (por inferência)**.
- EMG: crucifixo invertido com elástico ativa um pouco menos o deltoide posterior e mais o médio/trapézio que o halter (29 pessoas, Bergquist 2018, 29599855) — "alternativa viável".
- **Curva de resistência:** halter × polia no deltoide lateral e polia × barra na rosca Scott crescem igual; elástico e halter têm o mesmo sentido de curva — **moderada** ("não muda a hipertrofia": 2 ensaios, músculos diferentes). O elástico fica no nível 2 pela **progressão grossa de carga**, não porque "cresce menos" [13 Ombro 3d, P8].
- Elástico (`elastico`) "não pede ancoragem" no catálogo, mas a puxada com elástico pede ancoragem alta: suposta, achado do `10`, ainda aberto [13 Costas 3 "elástico"].
- Elástico sob os pés (stiff, agachamento) limitado em carga (consenso) [13 Post 3d]; `ponte-elastico` proposto sem estudo (o único com faixa, Short 2021, **NÃO VERIFICADO**) [13 Glúteos P5]. Elástico na panturrilha: "pouco prático (consenso)" [13 Pant 3].
- Custo de animação: o motor não desenha elástico (peça nova, +6 unidades) [08 §6.2].

### 3.5 Kettlebell [08; 13]

- Nenhum estudo próprio. Goblet com kettlebell × halter: busca sem resultado [08 §9]. Selos "um estudo" para goblet-kettlebell em [08 §2] são por analogia ao goblet. Carga: lista de pesos (`pesosKg`), salto >~10% aplica `progressao.salto-grande` e escada de carga leve [08 §1.1, §7.1]. Aparece em 12 menções no [13] como opção nos níveis (rosca, tríceps francês, desenvolvimento unilateral, remada, stiff, goblet). **Em [16] (corpo livre) não aparece.**

### 3.6 Suspensão [13; 08]

- Hipertrofia: 1 ensaio em 42 idosos, 12 sem., 3 séries até a falha: suspensão = tradicional no bíceps (+21,6% × +23,4%) e vasto lateral (+14,1% × +13,0%); **costas não medidas** (Soligon 2020) — um estudo [13 Costas 3a].
- EMG: invertida maior ativação do latíssimo e menor carga lombar entre 3 remadas (n = 7); 4 variações em barra portátil >61% (n = 26); remada na suspensão com pés no aparelho ≈ 72,6% de 1RM e = remada com barra (n = 12 atletas; Vural 2023); revisão de 18 estudos de EMG: suspensão = tradicional, não mais [13 Costas 3a].
- Progressão por **ângulo do corpo** (degrau). **Nenhum ensaio com Y-T na suspensão**; tríceps na suspensão (ombro 90–120°) ficou no complemento por decisão [13 Ombro 3g; Bíceps §3 item 3]. Só suspensão: ombro lateral a zero em 74,6% dos programas.

### 3.7 Barra fixa, paralelas, barra baixa [13; 08]

- Barra fixa: nenhum ensaio de hipertrofia; capacidade `barra_baixa` = só rack ou smith, então a barra de porta **não** abre a remada invertida (achado de código) [13 Costas §2]; proposta: pergunta "encaixa baixo?" com segurança do encaixe sem estudo.
- Mergulho nas paralelas: um estudo (EMG), McKenzie 2022 (36293792); complexidade 3 [08 §2, §7.1].
- Barra fixa com toalha ≈ tradicional na EMG (15 treinados; Snarr 2017, 28828073), **não** valida toalha na porta [16 P2 §3].

---

## 4. Pontos fracos

### 4.1 Conclusões com selo "consenso" (por tema; só as que carregam decisões do gerador)

Os documentos repetem "consenso" muitas vezes; listo por grupamento as conclusões centrais:

- **Peito [13 §Peito]:** motivo "peito alongado" do crucifixo; "2 exercícios de peito"; crucifixo como complemento (nenhum ensaio somado ao supino); flexão declinada = só carga; nível dos exercícios por carga/progressão; ordem de preenchimento da vaga vazia (P2).
- **Costas [13 §Costas]:** "2 funções (vertical + horizontal)"; ordem dentro do nível; custo = 0 sem ancoragem; 2ª pegada de barra fixa; elástico = inferência; EMG de pegada; superman/Y-T-W não contam.
- **Ombro [13 §Ombro]:** "1 exercício direto por semana, 2 se prioridade" para o posterior; 0,5 para desenvolvimento e remadas; "precisa do isolador quando as costas não são prioridade"; elástico ≈ halter; pike sem estudo; ausência de elevação lateral com peso do corpo; ordem dentro do nível 1 do posterior (só EMG).
- **Bíceps/tríceps [13]:** "2 exercícios por semana são necessários" para o bíceps; níveis 1 × 2 do bíceps sem evidência de total; tríceps com peso do corpo; flexão fechada "ativa mais" (EMG, sem ensaio de crescimento); 3 exercícios de "variar entre blocos".
- **Quadríceps [13]:** agachar + afundo; caneleira e elástico na extensora (lado curto); "qual das opções b ou c" na vaga vazia.
- **Posteriores [13]:** "2 > 1 no total"; deslizante ≈ nórdico; ordem romeno/stiff > hiperextensão > elástico; stiff com peso do corpo fora.
- **Glúteos [13]:** hip thrust vs agachamento ordem; "2 é melhor"; abdução 0,5 [opinião]; abdução deitada só se 15–30 perto da falha; ponte unilateral como degrau; comprimento muscular.
- **Panturrilha [13]:** que 2 exercícios não rendem mais (não testado); "unilateral antes de mais séries".
- **Abdômen [13]:** meta de 4 séries, "um exercício basta", ordem das vagas, escada.
- **Quando falta vaga [13 §Resumo]:** a decisão entre (a) avisar, (b) 2ª variação, (c) mais séries, (d) encurtar é consenso apoiado em dose-resposta (Pelland 2026) e em Kataoka 2026 ("músculos não competem", um estudo), nunca testado diretamente [13 Peito 6; Bíceps 6].
- **Corpo livre [16]:** quase todas as linhas de candidatos (flexão aberta/diamante/arqueiro/pseudo-planche/pike/mergulho; abertura em T para o deltoide; rosca auto-resistida; isometria com toalha) são consenso ou EMG; o custo = 0 de costas é "consenso (sem estudo)".
- **Equipamentos [03, 08]:** lista de "comuns", atalhos de cenário, multifuncional "típico", incrementos de carga, calibração por passos, valor 2 kg, custos de animação (todos [opinião] ou consenso).

### 4.2 Conclusões "um estudo" (as que sustentam constantes)

Peito: inclinado → parte de cima (Chaves 2020); flexão ≈ supino (Kikuchi 2017); voador (Pinto 2025). Ombro: deltoide lateral cresce com elevação lateral 10 séries/sem. (Larsen 2025); supino não cresce o deltoide médio (Lanza 2024). Tríceps: braço acima da cabeça (Maeo 2023); supino não cresce o tríceps (Brandão 2020). Bíceps: rosca 2× remada por série (Mannarino 2021); rosca inicial (Sato 2021); rosca sem carga (Counts 2016, **resumo**) e co-contração (Maeo 2014). Quadríceps: agachamento/afundo com peso do corpo (Ogawa 2023, Wei 2023, Takai 2013), nórdico invertido (Alonso 2019, **sem controle**), flexão de quadril isométrica (Ema 2018). Posteriores: ST/SM regionais com 3 grupos = moderada, mas `selecao.nordico` ainda "um estudo". Glúteos: coice na polia/abdução (Attarieh 2026), leg press + stiff + hip thrust (Kassiano 2024, não igualado). Panturrilha: em pé > sentada (Kinoshita 2023), alongada (Kassiano 2023b), 12 > 6 séries (Kassiano 2024b), peso do corpo (Nakamura 2025), normas de reps (Visser 2025). Abdômen: Pilates, suspensão, ECR em idosos (Shahtahmassebi 2019). Corpo livre: contrair o bíceps sem carga, co-contração, Shabbir 2026, Martonovich 2025, EMG de variações.

### 4.3 Conclusões marcadas "[opinião]" (julgamento de quem pesquisou)

"Opção 1 [recomendada]" em [16 P1 §6]; complexidade 3 da flexão com pés elevados; mãos fechadas e ombro; contração máxima tende a prender a respiração; faixas `[10,15]` da rosca sem carga; ponte bilateral sai da faixa; abdução 0,5; recomendação C (manter corpo todo) e D (não agora); "ganho +1 a +3 p.p." (cálculo linear de `15`); bilateral da panturrilha >30 reps; peso do braço (~2–3 kg) leve demais para elevação lateral deitada; "diferença regional parece vir do perfil de carga" (bíceps); "o 'peito a zero' de 19% no vazio vem das variantes com dor"; "abdômen custa pouco tempo"; etc.

### 4.4 Fontes só de resumo, não verificadas, retratadas ou fracas

- **Quase tudo é resumo-PubMed.** **Texto-completo lido** (citados nos 4 docs): Chaves 2020, Kikuchi 2017, Larsen 2025, Krause Neto 2025, Maeo 2024, Cholp 2025, Paoli 2016, Haugen 2023, Maeo 2021, Plotkin 2023, Kinoshita 2023/2026 (no projeto) e partes do Intziegianni 2026 e Kowalski 2022. O restante é resumo-PubMed ou verificado-busca.
- **Números que não foram conferidos no artigo** (resumo apenas): Lanza 2024 (Elsevier não lido); Counts 2016 (Elsevier não lido); Ogawa 2023 (XML não abriu números); Larsen 2026, Kobayashi 2026 etc.; "Kassiano 2024" glúteo (fora do PubMed; resumo na página do periódico).
- **NÃO VERIFICADO:** Suzuki 2017 (rabdomiólise; 28500110; "só o título"); Mier 2014 (Crossref, resumo não achado); Short 2021 (faixa de elástico); `nsca2021` (manual de técnica NSCA, fonte de "quase todas as linhas de posição" das fichas) [08 §9]; Padovan 2025/2026 PMID não confirmado igual [08 §9]; PMID 39214520 EMG nórdico invertido "não lido" em [13 Quad 3c] mas "resumo lido agora" em [16 §3.1].
- **Preprints:** Remmert 2025 (teto de ~10 séries por sessão; sem revisão por pares — metodologia manda revalidar); Zhang 2023 (Research Square, não sustenta selo) [16 P1 §3].
- **Retratados/evitados:** ver §0 (Barbalho x2; Quintana-Cepedal 2025). `barbalho2021` e `barbalho2020` usados com ressalva.
- **Diretriz sem texto:** ACSM 2026 (PMID 41843416) citada em [03] e `acsm2026` em [16 §3.3] — metodologia diz que não serve para números até ler o original.
- **PMIDs com inconsistência de grafia entre trechos:** Larsen 2025 aparece como 40692697 no [13 Ombro] (e no [13 Pant] `larsen2025a` é 39995432 e `larsen2025e` 40850937). Conferir.
- **Estudos curtos/pequenos/diferentes do alvo:** Amanuma 2025 (n = 8); Counts 2016 (n = 13); Maeo 2014 (9 treinando); Alonso-Fernández 2019 (sem controle); Dorado 2012 (9, sem controle); Kohiruimaki 2019 (8, sem controle); Wei 2023 (13); Nakamura 2025 (15); Kataoka 2022 treinados 6 sem. sem crescimento; Kotarsky 2018 (4 sem.).
- **Populações:** quase todos os ensaios regionais são de homens jovens não treinados; Kassiano 2025c e Kassiano 2026 trazem 63 mulheres; idosos: Soligon 2020, Yoshiko, Hirono, Shahtahmassebi; crianças: Takai 2013, Yoshimoto 2016.
- **Medidas fracas:** Gentil 2015 (circunferência do braço); EMG em vez de crescimento em quase todo exercício de peso do corpo; modelagem (Collings 2023/2026, Kipp 2022).
- **Estimativas e modelos próprios:** frequência ~62 exercícios, 40% máquinas [08 §3.1, §6]; custos em séries por cenário "cálculo pelas regras do projeto" (não resultado de estudo) em quase todo [13]; "+1–3 p.p." [16 §3.3]; grade com amostra 1/200 [13].

### 4.5 Dúvidas declaradas em aberto (explícitas nos documentos)

Perguntas em aberto para o Gustavo [16 P1, P2, P3] (escada da flexão e pés elevados; complexidade; animação; punho × ombro; texto para quem quer ombros; Counts 2016 séries/reps/descanso/nível; rosca sem carga em treinados; contagem 1 ou menos; abertura em T chega à falha; deltoide posterior ativa?; aceitar dose "aperte o máximo"; modo dupla; tempo que sobra; pistol/cadeira; parciais e isometria exigem novo registro; prancha lateral/Copenhagen; persona de corpo livre). Em [13]: a decisão de Gustavo sobre todas as propostas; abdômen a priorizar; P6 de "ombros" incluir posterior; `selecao.nordico` faixa; extensão acima da cabeça com suspensão; etc.

---

## 5. Perguntas não tratadas ou tratadas só de relance

**(i) Diferença de resultado entre exercícios do mesmo músculo com evidência direta de hipertrofia.**
*Tratada* para: bíceps (inclinada × Scott: sem diferença no total; regional 0,08–0,10 cm), tríceps (overhead × lateral; supino × extensão), quadríceps (leg press × extensora; smith × extensora; afundo × leg press), posteriores (flexora sentada/deitada, nórdico, stiff, terra romeno; **mas ensaios separados, grupos e amostras diferentes**), glúteo (hip thrust ≈ agachamento; polia × abdução), panturrilha (em pé × sentada), deltoide lateral (halter = polia), peito (flexão ≈ supino; inclinado × reto).
*Não tratada ou sem ensaio:* costas (**nenhuma comparação direta**), deltoide posterior (nenhum ensaio), abdômen (nenhum), peito (supino × máquina × crucifixo diretamente), "ranking" geral entre exercícios do mesmo músculo, diferença em **treinados** (quase tudo é não treinado), comparação nórdico × flexora sentada cabeça a cabeça, magnitude relativa por série.

**(ii) Faixas de repetições por tipo de exercício/equipamento.**
Tratado só no geral (6–30 perto da falha, robusta; teto ~30, consenso) e em faixas da biblioteca sem fonte ensaio (consenso/[opinião]). **Não tratado:** se a faixa ótima difere entre multiarticular × isolador, máquina × livre × elástico, ou grupo muscular (ex.: panturrilha, ombro lateral, abdômen); descanso por tipo; nenhuma discussão de "alta repetição para músculo X". A única faixa de ensaio específica é panturrilha 15–20 RM (Kassiano 2024b) e o teste de unilateral (mediana 25).

**(iii) Interferência entre exercícios na mesma sessão (lombar, pegada).**
**Praticamente não tratado.** O que há: teto de ~10 séries do mesmo músculo por sessão (Remmert 2025, preprint); ordem empurrar/puxar no mesmo dia ≈ dias separados (Gonçalves Dias 2026, 22 treinados); pré-exaustão não traz ganho (Trindade 2019; Hermann 2026); "ordem.sessao" = core por último (consenso); preocupação com lombar em exercícios isolados (flexão arqueiro, terra hexagonal) e "mais um exercício unilateral pesado no mesmo dia (fadiga, tempo)" [13 Quad Q1 risco]. **Não tratado:** fadiga lombar de stiff/terra + remada curvada/agachamento no mesmo dia; fadiga de pegada (remada antes de puxada/rosca); sinergistas fatigados (ombro antes de supino/tríceps); número de exercícios com o mesmo músculo secundário na sessão e seu efeito. 

**(iv) Estabilidade (máquina × livre) e hipertrofia.**
Tratado só por equivalência: máquina = peso livre = polia (Haugen 2023, robusta) e estabilidade favorece iniciante (consenso, `selecao.estabilidade`) [03; 08 §2; 13 Costas 4]. **Não tratado:** efeito da instabilidade/estabilidade sobre hipertrofia por si; comparação direta guiado × não guiado por exercício; para treinados; suspensão/bola instável × estável (só EMG); smith × barra livre (Kassiano 2026 compara extensora × smith, não smith × livre).

**(v) Amplitude parcial × completa.**
Tratado em partes: agachamento até o paralelo basta (Kubo 2019, Larsen 2025b, Hammami 2025 sem diferença; Bloomquist 2013 quarto rende menos), `selecao.amplitude` completa ≥ parcial (Pallares 2021; Wolf 2023, moderada); panturrilha: metade alongada +15,2% × completa +6,7% × metade encurtada +3,4% (um estudo; Kassiano 2023b) e parciais alongadas pós-falha ≈ completa (3 ensaios; moderada); rosca em comprimento inicial (um estudo, 2 ensaios); comprimento muscular trivial em meta-análise (Varovic 2025, 12 estudos, outros músculos). **Não tratado:** amplitude parcial × completa em peito, costas, ombro, tríceps com ensaio direto; peso do corpo (o chão limita a panturrilha); parcial em treinados fora panturrilha/quadríceps.

**(vi) Unilateral × bilateral.**
Tratado pouco: unilateral = bilateral para o total do quadríceps (Kassiano 2025, 39794667; moderada); progressão bilateral→unilateral ≈ barra (Wei 2023, um estudo); para outros músculos só por extensão ("em outros músculos", consenso para posteriores). **Não tratado:** unilateral × bilateral em costas, peito, ombro, glúteo, bíceps, tríceps, panturrilha com ensaio; efeito do **déficit bilateral**; custo de tempo; estabilidade.

**(vii) Manter estímulo com pouco peso para avançados (tempo sob tensão, pausas, BFR, isometria alongada).**
Tratado em parte no [16 §3.2]: tempo/cadência efeito mínimo (2 meta-análises 2025); pausa na repetição e 1,5 repetição **sem ensaio**; tensão contínua um estudo (Tanimoto 2006); isometria longa ≈ completa em 23 treinados (um estudo) e revisão; parciais alongadas; pré-exaustão sem ganho; descanso curto; drop set/rest-pause/myo-reps ≈ séries comuns; **nenhum método avançado supera** (Cowley 2026; g ≈ 0,046). **BFR/oclusão:** só aparece como comparador numa linha de panturrilha (Kataoka 2022: nenhum cresceu em treinados), **sem seção nem recomendação**; "BFR" não aparece nos documentos. Não tratado: como o avançado, sem carga, chega ao estímulo (ex.: stiff sem peso fora; flexão fica fácil) — o texto manda o degrau seguinte da escada e `equipamento.fim-da-escada`; sem prova de que séries em tempo/isometria compensem em avançado **sem equipamento**.

**(viii) Elástico × peso livre para hipertrofia.**
**Tratado só indiretamente:** força = convencional (meta-análise de 8, moderada), EMG com elástico ≈ halter no crucifixo invertido (menos posterior, mais médio/trapézio), curva de resistência não parece importar (2 ensaios em outros exercícios). **Não há ensaio de hipertrofia com elástico** em nenhum músculo trabalhado (adultos jovens); nenhuma meta-análise de hipertrofia com elástico específica (só população clínica). Selo para o app: consenso/inferência [13 Ombro 3c-3d; Bíceps 6; Costas 3d].

---

## 6. As 20 perguntas mais importantes sem resposta ou com resposta fraca

Ordenadas por impacto no gerador/produto (grau: SR = sem resposta; FRACA = resposta de um estudo/consenso).

1. **Quanto crescem costas** com puxada × remada, e com 1 × 2 exercícios, com volume igual? (SR; só Paoli 2016 mede o par vs. nada) [13 Costas 1a, 2a].
2. **Barra fixa/remada invertida/suspensão cresce o latíssimo?** Nenhum ensaio mede o músculo das costas com peso do corpo; a suspensão só em bíceps/quadríceps de idosos [13 Costas 3a-3b; 16 P2].
3. **Deltoide posterior:** que exercício o cresce e com quantas séries? (SR; "1 direto/sem." é consenso; 0,5 por remada é convenção) [13 Ombro 1c, 2d].
4. **O que vale como estímulo para costas/ombro lateral sem equipamento?** (FRACA: custo = zero, sem alternativa; resistência manual de parceiro tem ensaios mistos mas ficou em backlog) [13; 16 P2].
5. **Counts 2016** (rosca sem carga): protocolo (séries/reps/descanso), população treinada ou não, replicação? Hoje é um resumo de 13 pessoas. A dose "aperte o máximo" não é mensurável pelo app [16 P2].
6. **Extensão de tríceps com peso do corpo (acima da cabeça com ombro 90–120°)** cresce a cabeça longa como a versão com carga? (analogia; nenhum ensaio) [16 P1; 13 Bíceps 6].
7. **Flexão com pés elevados** enfatiza a parte de cima do peito? E flexão × supino em **treinados**, medindo músculo? (SR) [13 Peito 6; 16 P1].
8. **Ponte bilateral/unilateral, abdução deitada, stiff sem peso, deslizante, búlgaro com peso do corpo:** cresce o músculo-alvo? Quantas reps até a falha para quem treina? (SR; só EMG/inferência) [13 Glúteos 6; Post 3b-3c].
9. **Treinados (não só novatos):** o que cresce com peso do corpo ou cargas leves? (SR em agachamento; panturrilha em pé não cresceu em treinados em 6 sem.) [13 Quad 6; Pant 3c].
10. **Quando o peso do corpo/elástico para de funcionar** (>30 reps): isometria longa, parciais, pausas e BFR substituem carga? (FRACA: isometria em 23 treinados; BFR não tratado; método "avançado" não supera séries comuns) [16 §3.2].
11. **Elástico × peso livre em hipertrofia** (qualquer músculo, adultos jovens). (SR) [13 Ombro 6; Bíceps 6].
12. **1 exercício com mais séries × 2 exercícios com o mesmo volume** em peito, costas, ombros, glúteos, panturrilha, posteriores (SR; só coxa/braço) — base de `selecao.exercicios-por-musculo` [13 Resumo; Peito 6; Post 6; Glúteos 6].
13. **Dose-resposta (séries/semana) do abdômen, antebraço, panturrilha e deltoide:** "4 séries" do abdômen é extrapolação; 12 > 6 na panturrilha é um estudo [13 Abd; Pant 1c].
14. **Interferência na sessão:** lombar (stiff/terra/remada/agachamento no mesmo dia), pegada (remada → puxada/rosca), ordem dos exercícios e teto de séries por sessão (preprint). Quanto custa em hipertrofia o 2º exercício que repete lombar/pegada? (SR) [não tratado].
15. **Amplitude parcial × completa** em peito, costas, ombros, tríceps: quando a posição alongada importa? Efeito regional trivial em meta-análise, mas só em outros músculos e sem peito [13 Peito 1e; Glúteos 6].
16. **Estabilidade (máquina guiada × livre × suspensão/instável)** e hipertrofia: sem ensaio; só equivalência e consenso para iniciantes [03; 08 §2].
17. **Unilateral × bilateral** fora do quadríceps: costas, peito, ombro, glúteo, panturrilha, bíceps. (SR) [13 Quad; Post].
18. **Segurança** de barra de porta/encaixe baixo, mesa, porta com toalha: nenhum dado; barra fixa (Shabbir 2026) tem ~4 mil idas ao PS/ano nos EUA, mas sem taxa por uso. Impacto em escolhas de produto [16 P2; 13 Costas P2].
19. **Máquinas específicas** (hack, smith, supino/desenvolvimento/remada articulada, voador invertido, graviton, abdominal/adutora): hipertrofia direta? Todos "um estudo"/"consenso" por analogia. E **multifuncional "típico"** e **conjunto "comum" de equipamentos brasileiros** (sem fonte oficial) [08 §9; 03].
20. **Adutores, eretores/lombar, trapézio, antebraço e pescoço:** quais exercícios, que volume, com que evidência? Fora do app (sem meta ou sem presença) e sem ensaio de hipertrofia de adutor em máquina; Copenhagen não cresceu espessura [08 §9; 16 P3].

(Observação: a regra do app de contar 0,5 por série indireta é só "um estudo" para o 0,5 [13 Bíceps 6]; fica como candidata a pergunta 21 se for preciso estender a lista: Pelland 2026 não estimou o peso ótimo, e Mannarino 2021 sugere ~0,47 para remada→bíceps, Brandão 2020 sugere menos de 0,5 para supino→cabeça longa do tríceps.)

---

## Anexo A. Inconsistências e pontos a conferir encontrados na leitura

1. **Larsen 2025:** há várias chaves `larsen2025*` (deltoide lateral 40692697; panturrilha `larsen2025a` 39995432 e `larsen2025e` 40850937; leg press `larsen2025b`); o documento usa a mesma grafia de autor/ano para estudos diferentes, o que pede cuidado ao citar. Não conferi os PMIDs fora dos documentos.
2. **Counts 2016** é "um estudo" com **resumo** apenas, mas [16 P2] recomenda "incluir `rosca-sem-carga`" só depois de ler o texto completo; as faixas `[10,15]` são [opinião].
3. **PMID 39214520** (EMG do nórdico invertido): "não lido" em [13 Quad 3c] e "resumo lido agora" em [16 §3.1]; os dois documentos são do mesmo dia.
4. **[08] §2** dá selo "um estudo" para hack, smith, supino na máquina etc., mas [08 §9] diz que não há ensaio de hipertrofia com eles; o "um estudo" vem da função (por analogia).
5. **Panturrilha unilateral no degrau:** [13 Pant P4] chama `panturrilha-unilateral-degrau`; [16 Parte 3] propõe `panturrilha-degrau`; a diferença de nome e escada não está reconciliada.
6. **Abdômen:** [13] diz "não há programa com e sem trabalho direto"; [16 P3] acrescenta Shahtahmassebi 2019 (idosos) e pede atualização do selo.
7. **Peito, voador:** [08] sobe o selo do voador a "um estudo" (Pinto 2025); [13 P3] mantém "peito alongado" como consenso: não é contradição, mas as duas afirmações são sobre coisas diferentes (voador cresce × motivo alongado).
8. **Barbalho:** retratados 2 ensaios (isoladores) [13]; `barbalho2021` (isolador sozinho cresce menos) e `barbalho2020` (hip thrust) são usados sob "reserva" em [13]; [16] não usa Barbalho 2019 "por cautela".
9. **Haugen 2023** é "texto-completo no projeto" e é a base "robusta" para equivalência; ACSM 2026 (também citada em [03]) não foi lida no texto.
10. **Alvo de séries e "metas":** [13] e [16] calculam "séries por semana" por regras do projeto, não por ensaio; os números de grade vêm de amostra 1/200.
