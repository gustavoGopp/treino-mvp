# Revisão de anatomia (02/11/2026)

> Revisão independente dos músculos de cada exercício, nos três lugares em que eles aparecem: a **biblioteca** (`musculos.primarios` e `musculos.secundarios`, que contam o volume: o secundário vale meia série), os **textos** (`target` e `feel` do guia; `target` do cartão) e o **desenho** do Boneco (a lista de músculos de cada animação). A tabela completa, gerada pelos dados, está em `docs/revisoes/anatomia/tabela.md` (`npm run auditoria:anatomia`).
>
> Os selos seguem `docs/pesquisa/00-metodo.md`. Os estudos com PMID tiveram o **resumo lido no PubMed** nesta sessão (resumo-PubMed); nenhum texto completo foi lido. EMG (a atividade elétrica do músculo) entra só como apoio: **EMG não mede crescimento**. O que é opinião minha está marcado **[opinião]**. Nada mudou no app: cada item espera a decisão do Gustavo.

## Em uma frase
A anatomia do app está **coerente nos textos e nos cartões**: nenhum texto deixa de citar o músculo principal, e os 38 cartões batem com a biblioteca. Os problemas estão em **dois lugares**: (1) a biblioteca conta os **posteriores da coxa na ponte e no hip thrust**, e o único ensaio que mediu isso mostra que eles quase não crescem ali; (2) **o desenho e a conta divergem** em 4 exercícios muito prescritos (o desenho realça como principal o glúteo do afundo, do búlgaro e do stiff unilateral e o deltoide lateral do desenvolvimento) e, na elevação lateral, **realça o trapézio que o texto manda não sentir**.

## O que está bom (medido)
| O que | Resultado |
|---|---|
| Principal no texto | nos 69 exercícios com guia, todo músculo principal da biblioteca aparece no `target` |
| Cartões de texto | os 38 batem com a biblioteca |
| Os três lugares | 48 dos 69 batem sem nenhuma marca; das 21 marcas restantes, 11 são só informação (músculo que ajuda, mostrado no desenho e não contado) |
| Costas no desenho | as remadas realçam o dorsal e o meio das costas, as puxadas realçam o dorsal com o meio das costas em laranja, e os textos dizem o mesmo ("meio das costas e dorsal") |
| Isoladores com ensaio de hipertrofia | extensora (reto femoral; Kinoshita 2026), flexora sentada (Maeo 2021), panturrilha em pé (Kinoshita 2023), tríceps acima da cabeça (Maeo 2023): os músculos marcados batem com o que os ensaios mediram |
| Origem e inserção no desenho | os 22 músculos de `src/engine/estilo/musculos.ts` têm origem e inserção comentadas, coerentes com a anatomia descritiva (`r4-estilo-do-boneco.md`, seção 3) |

## Os achados, por prioridade
Prioridade = gravidade × frequência. **Gravidade alta:** o app ensina errado, ou a conta do volume erra muito. **Média:** a conta ou o desenho fica impreciso e isso muda o treino ou o que a pessoa aprende. **Baixa:** texto, detalhe ou exercício quase nunca prescrito. A frequência vem do teste de estresse (3,0 milhões de prescrições; `docs/revisoes/auditoria/inventario.md`).

| # | Achado | Gravidade | Frequência | Efeito nas personas |
|---|---|---|---|---|
| 1 | Posteriores contados na ponte, na ponte com halter e no hip thrust | média | 8,6% das prescrições | Ana, Carla e Diego mudam 1 série; a Ana ganha um aviso |
| 2 | O desenho realça o glúteo como principal no afundo, no búlgaro e no stiff unilateral; a biblioteca conta como secundário | média | 7,0% | só o desenho (nenhuma, se o desenho seguir a biblioteca) |
| 3 | Elevação lateral: o desenho realça o trapézio que o texto manda não sentir | média | 5,8% | só o desenho |
| 4 | Desenvolvimento: desenho e texto põem o deltoide lateral como principal; a biblioteca conta como secundário | média | 1,2% (animação); 2,3% (todas as versões) | só o desenho e o texto (nenhuma, se seguirem a biblioteca) |
| 5 | Crucifixos invertidos contam "costas", mas o cartão manda não juntar as escápulas | média | 2,9% | Ana: costas 7,5 → 6 (se tirar) |
| 6 | Adutores: contados no afundo e no agachamento com barra, mas não no goblet, no hack, no smith nem no leg press | baixa | 2,7% (os que ganhariam) | nenhuma no volume (adutores não têm meta) |
| 7 | As 9 fichas novas copiam os músculos da biblioteca, sem fonte | baixa | 16,5% (os 9 exercícios) | — |
| 8 | Músculos que o gerador não conta, mostrados no desenho (antebraço, lombar, oblíquos, abdômen, panturrilha, frente do ombro) | baixa | vários | — |
| 9 | A cópia `elevacao-lateral-b` aparece duas vezes no catálogo do guia | baixa | todo mundo que abre o catálogo | — |
| 10 | Hiperextensão: o cartão não diz que a lombar trabalha | baixa | 0 (nunca é a 1ª escolha) | — |
| 11 | Terra com barra hexagonal: a classificação está certa | — (sem ação) | 0 | — |
| 12 | Mergulho: peito e tríceps como principais, sem evidência para mudar | baixa | 0,1% | nenhuma (nenhuma persona faz mergulho) |
| 13 | Secundários que o texto do guia não cita (bíceps nas remadas, adutores no afundo) | baixa | vários | — |

---

### 1. Posteriores contados na ponte e no hip thrust
**Problema.** A ponte (a mais prescrita entre as de glúteo: 129 mil com halter e 64 mil sem), o hip thrust e os coices contam os **posteriores da coxa como secundário** (meia série por série). A conta acha que a pessoa treina mais posterior do que treina. Por isso, às vezes, o stiff ou a flexora ganham uma série a menos.

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| Em 9 semanas, o hip thrust cresceu o glúteo tanto quanto o agachamento; os **posteriores quase não cresceram** em nenhum dos dois grupos ("little to no growth"), medidos por ressonância. | um estudo (iniciantes) | `plotkin2023` (PMID 37877099) |
| No agachamento completo e no meio agachamento, os posteriores **não mudaram de volume** em 10 semanas. | um estudo | `kubo2019` (PMID 31230110) |
| Anatomia: na ponte e no hip thrust o joelho fica dobrado. Os posteriores cruzam o joelho e o quadril, e com o joelho dobrado ficam encurtados, o que reduz a força que conseguem fazer no quadril. | consenso (anatomia; é uma inferência minha a partir do comprimento do músculo) | anatomia descritiva |
| A biblioteca já trata assim o agachamento: ele **não** conta os posteriores. A ponte fica fora dessa lógica. | — | `exercicios.json` |

**Proposta.** Tirar os posteriores dos secundários da **ponte, ponte com halter e hip thrust** (há um ensaio para o hip thrust; a ponte é a mesma posição do joelho). Os **coices** **[opinião]**, pela mesma posição do joelho dobrado. A ficha da ponte (`ponte-gluteo.md`) já cita Plotkin 2023, mas não tirou essa conclusão.

**Efeito nas personas** (simulado em memória, sem gravar):
- **Ana:** os posteriores vão de 8 para 7 séries por semana e ela ganha o aviso "posteriores 7 de 8"; no dia B, o stiff unilateral sobe de 3 para 4 séries, e a panturrilha, a rosca e o crucifixo invertido perdem 1 série cada.
- **Carla:** o stiff sobe de 3 para 4 séries.
- **Bruno:** os posteriores vão de 9 para 8, sem mudar exercício.
- **Diego:** a rosca com elástico desce de 3 para 2 séries.

Um teste confere que nenhum exercício de extensão de quadril com o joelho dobrado (padrão `extensao-quadril`) conta os posteriores.

### 2. Glúteo principal no desenho, secundário na conta (afundo, búlgaro, stiff unilateral)
**Problema.** No desenho, o afundo e o búlgaro mostram **quadríceps e glúteo** em vermelho (principal), e o stiff unilateral, **posteriores e glúteo**. Na biblioteca, o glúteo é **secundário** nos três (meia série). O stiff com dois pés (a mesma função) mostra o glúteo em laranja: os dois stiffs se desenham diferente. O desenho ensina uma coisa e a conta faz outra.

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| No agachamento profundo, o glúteo máximo cresceu tanto quanto o quadríceps (+6,7% contra +4,9%) e mais que no meio agachamento. | um estudo | `kubo2019` |
| O leg press cresceu o glúteo máximo em 15,4%. | um estudo | `kinoshita2026` (PMID 41630124) |
| O agachamento cresceu o glúteo tanto quanto o hip thrust. | um estudo | `plotkin2023` |
| Para o afundo, o búlgaro e o stiff unilateral, **não achei ensaio que medisse o crescimento do glúteo**. | — | busca desta sessão |
| A contagem pela metade do secundário é uma aproximação. | moderada | `volume.serie-indireta.peso` (Pelland 2026) |

A evidência sugere que, nos exercícios de joelho com o quadril bem dobrado, o glúteo cresce mais do que "meia série" faz pensar. Mas os estudos são de agachamento e leg press, não de afundo. E a auditoria já mostrou o glúteo **acima do máximo** do iniciante pelas séries indiretas (achado 12 da auditoria).

**Duas saídas:**
- **(a) o desenho segue a biblioteca:** glúteo em laranja nos três. Muda 3 animações (folha a folha) e nada no treino.
- **(b) a biblioteca segue o desenho:** glúteo principal nos afundos e búlgaros (e nas versões sem carga). No volume semanal de glúteo: Bruno 8 → 11; Ana 10 → 14 (o afundo dela sobe de 3 para 4 séries); Diego 5,5 → 6,5; Carla 8,5 → 10.

**[opinião]** A saída (a). A evidência de "glúteo como principal" é de outros exercícios, e a (b) empurra o glúteo ainda mais para cima do máximo. No stiff unilateral, a (a) também deixa os dois stiffs iguais.

### 3. Elevação lateral: o desenho realça o trapézio que o texto manda não sentir
**Problema.** As duas animações da elevação lateral (com halteres, a 3ª mais prescrita, e na polia) mostram o **trapézio superior** em laranja ("trabalha junto"). O texto diz: "Se sentir o pescoço ou o trapézio, o ombro provavelmente está subindo junto com o braço". A pessoa vê em destaque o músculo que o texto apresenta como sinal de erro.

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| Ao levantar o braço para o lado, o trapézio superior ajuda a girar a escápula para cima; ele trabalha, mesmo sem encolher. | consenso (anatomia descritiva; não conferi em estudo) | anatomia descritiva |
| Na elevação lateral, a frente do ombro também trabalha (21% da contração máxima, contra 30% do deltoide lateral). | um estudo (EMG) | `campos2020` (PMID 33312291) |

Os dois trabalham, então o desenho não está errado na anatomia. O conflito é de **ensino**: o laranja diz "sinta aqui", e o texto diz "se sentir aqui, está errado".

**Proposta [opinião].** Tirar o trapézio superior das duas elevações laterais e manter a frente do ombro em laranja. No desenvolvimento, o trapézio fica: lá o texto não fala dele. Muda 2 animações (folha a folha).

### 4. Desenvolvimento: deltoide lateral principal no desenho e no texto, secundário na conta
**Problema.** O desenho do desenvolvimento com halteres realça **a frente e a lateral do ombro** em vermelho, e o texto diz "Deltoide anterior e lateral". Na biblioteca, só a frente é principal; a lateral é secundária (meia série), em todas as 5 versões.

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| No desenvolvimento, o deltoide lateral trabalhou quase tanto quanto na elevação lateral (28% contra 30% da contração máxima); a frente do ombro trabalhou mais no desenvolvimento (33%). | um estudo (EMG, 13 homens treinados) | `campos2020` |
| **Não achei ensaio** que medisse o crescimento do deltoide lateral com o desenvolvimento. O ensaio da elevação lateral (Larsen 2025) mediu só a elevação. | — | `larsen2025` (PMID 40692697); busca desta sessão |
| Uma descrição de Larsen 2025 diz que os autores contaram cada série de desenvolvimento como meia série para o deltoide lateral. Isso está nos métodos, que eu não li. | **não verificado** | `larsen2025` (texto completo não lido) |

**Duas saídas:**
- **(a) o desenho e o texto seguem a biblioteca:** lateral em laranja e texto "Frente do ombro; a lateral ajuda". Muda 1 animação e 1 texto; o treino não muda.
- **(b) a biblioteca segue o desenho:** lateral principal nas 5 versões. Como a meta do ombro lateral é a mesma, o gerador **tira séries de elevação lateral** para pôr no desenvolvimento: Bruno perde 3 séries de elevação na semana e ganha 1 de desenvolvimento; Carla perde 4 de elevação e ganha 2 de desenvolvimento.

**[opinião]** A saída (a). Com EMG parecida e sem ensaio, contar o desenvolvimento por inteiro trocaria um isolador com ensaio (a elevação lateral) por um multiarticular sem ensaio, para o músculo em que a auditoria já achou a prioridade abaixo da meta (achado 5 da auditoria).

### 5. Crucifixos invertidos contam "costas", mas o cartão manda não juntar as escápulas
**Problema.** O face pull, o crucifixo inverso, o crucifixo invertido curvado e o voador invertido têm o ombro posterior como principal e **"costas"** como secundário. No app, "costas" é o grupo **dorsal + meio das costas** (o desenho das remadas realça os dois). Nos crucifixos invertidos, quem conta é o meio das costas (romboides e trapézio médio, que juntam as escápulas), não o dorsal. Só que o cartão do crucifixo inverso diz: "Sem encolher os ombros nem juntar as escápulas com força: quem trabalha é a parte de trás do ombro". O face pull, ao contrário, diz "entre as escápulas".

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| Abrir os braços para trás na altura do ombro (abdução horizontal) é feito pelo deltoide posterior e pelos rotadores externos (infraespinal); o dorsal puxa o braço **para baixo** e não participa desse movimento. | consenso (anatomia descritiva) | `lumen-lat`; anatomia descritiva |
| No voador invertido, a pegada neutra aumentou a atividade do deltoide posterior e do infraespinal (o estudo não mediu o trapézio). | um estudo (EMG) | `schoenfeld2013` (PMID 23302754) |
| O meio das costas (trapézio médio e romboides) fixa e aproxima a escápula; trabalha mais quando a técnica pede para juntar as escápulas. | consenso | anatomia descritiva |
| Para o ombro posterior, **não há ensaio de hipertrofia** comparando exercícios. | — | `pesquisa-v2/04` |

**Duas saídas:**
- **(a)** tirar "costas" dos 3 crucifixos invertidos e manter no face pull, que junta as escápulas. Na Ana, as costas vão de 7,5 para 6 séries na semana; no Bruno e na Carla, a remada ou a puxada ganham 1 série.
- **(b)** manter como está e mudar o texto do cartão para "junte as escápulas no fim".

**[opinião]** A saída (a): a técnica do cartão (sem juntar as escápulas) é a que isola o ombro posterior, que é o objetivo da vaga. A Ana fica com menos costas, mas o número fica mais honesto.

### 6. Adutores: a lista está incompleta
**Problema.** Os adutores são secundários no afundo (com halteres, sem carga e para trás), no búlgaro (com e sem carga) e no agachamento com barra. **Não são** no goblet (com halter e com kettlebell), no agachamento com halteres, sem carga, com elástico ou no smith, no hack, no leg press nem no terra hexagonal. O desenho do goblet já mostra os adutores (decisão do R4, por Kubo 2019), e o texto do goblet diz "parte de dentro da coxa trabalha junto". O desenho do afundo e do búlgaro não mostra os adutores que a biblioteca conta.

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| O agachamento completo cresceu os adutores mais que o meio agachamento (+6,2% contra +2,7%). | um estudo | `kubo2019` |
| O agachamento cresceu os adutores mais que o hip thrust. | um estudo | `plotkin2023` |
| O leg press cresceu o adutor magno (+6,2%); a extensora, não. | um estudo | `kinoshita2026` |
| O adutor magno tem uma parte que estende o quadril (inervada como os posteriores), mais forte com o quadril bem dobrado. | consenso (anatomia descritiva) | anatomia descritiva |
| Para o afundo e o búlgaro, não achei ensaio sobre os adutores. | — | busca desta sessão |

**Proposta.** Adutores como secundário nos 9 exercícios de agachar profundo e no leg press e no terra hexagonal. **Efeito: nenhum no treino.** Os adutores não têm meta (decisão de 01/11) e não travam os cortes de tempo. Nas personas, só o número "adutores" do Diego muda (de 1 para 2,5); nenhum exercício e nenhum aviso muda. **[opinião]** Também pôr os adutores em laranja no desenho do afundo e do búlgaro, para o desenho bater com a conta (2 animações; dá para fazer junto com o achado 2).

### 7. As 9 fichas novas: os músculos copiam a biblioteca, sem fonte
**Problema.** As fichas do lote 1 (ponte, crucifixo com halteres, crucifixo inverso, extensora, flexora sentada) e as 4 novas da auditoria (remada curvada, crucifixo invertido curvado, ponte com halter, supino no chão) dizem os músculos numa linha ("como na biblioteca"), sem selo nem fonte. A técnica tem selo; os músculos, não.

**Conferência, uma a uma:**
| Ficha | Músculos | Veredito |
|---|---|---|
| extensora | quadríceps (sobretudo reto femoral) | **certo**: `kinoshita2026` (reto femoral +13,2% na extensora) |
| flexora sentada | posteriores | **certo**: Maeo 2021 (já em `pesquisa-v2/04`) |
| crucifixo com halteres | peito; frente do ombro | certo (consenso; igual ao crucifixo na polia) |
| remada curvada com halteres | costas; bíceps e ombro posterior | certo (consenso; igual às outras remadas) |
| supino no chão | peito; frente do ombro e tríceps | certo (consenso; igual aos outros supinos) |
| ponte e ponte com halter | glúteos; **posteriores** | **rever**: achado 1 |
| crucifixo inverso e crucifixo invertido curvado | ombro posterior; **costas (meio)** | **rever**: achado 5 |

**Proposta.** Na seção "Músculos" das 9 fichas, uma linha com o selo e a fonte (ou "consenso: igual a X"), e a correção do que for decidido nos achados 1 e 5.

### 8. Músculos que o gerador não conta, mas o desenho mostra
O desenho mostra em laranja músculos que ajudam e que o gerador não conta:
- **trapézio superior** (elevações laterais e desenvolvimento; ver achado 3);
- **antebraço** (roscas, barra fixa, elevação de joelhos);
- **lombar** (os dois stiffs);
- **oblíquos** (os 3 abdominais);
- **abdômen** (flexão de braço e tríceps francês na polia, para segurar o tronco);
- **panturrilha** (flexão de joelho na bola);
- **frente do ombro** (elevações laterais).

Todos trabalham de verdade como ajudantes ou estabilizadores (consenso de anatomia; para a frente do ombro na elevação, `campos2020`). Na maioria, o texto diz o mesmo (por exemplo: "o antebraço também trabalha"; "a lombar trabalha um pouco para segurar a postura").

**Decisão para o Gustavo:** ficam só no desenho (como hoje), saem do desenho, ou passam a contar? **[opinião]** Ficar só no desenho, exceto o trapézio da elevação lateral (achado 3). Contar não faz sentido: o gerador não tem meta para eles, e o trabalho de estabilizar não é o estímulo que a meta mede. Se a sessão de design quiser, pode diferenciar "ajuda" de "secundário que conta" na legenda.

### 9. A cópia `elevacao-lateral-b`
**Problema.** A animação `elevacao-lateral-b` é uma cópia exata de `elevacao-lateral`: o mesmo movimento, os mesmos músculos e o mesmo texto. Vinha do guia original, em que tinha outra prescrição (séries e repetições). Desde o R1, a prescrição sai do programa, e **nenhum exercício da biblioteca aponta para ela**. Mesmo assim, ela aparece no **catálogo do guia**, ao lado da original, com o mesmo nome: "Elevação lateral unilateral na polia" duas vezes.

**Proposta.** Remover a cópia: o arquivo do motor, o texto, as entradas das duas linhas de base (`motor.json` e `estilo-a.json`) e a exceção em `tests/unit/dados-dominio.test.ts`. Remover uma folha da linha de base pede o seu ok.

### 10. Hiperextensão: a lombar trabalha e o cartão não diz
**Problema.** O cartão diz "Glúteos e posteriores da coxa". A lombar não aparece.

**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| Na hiperextensão a 45°, o glúteo trabalhou mais que na máquina de extensão lombar (como no stiff), e o posterior trabalhou mais que nos outros dois; os eretores da espinha (a lombar) trabalharam **tanto quanto** no stiff e na máquina de extensão lombar. | um estudo (EMG, 15 mulheres treinadas) | `andersen2021` (PMID 33948095) |

**Proposta.** Biblioteca como está (glúteos e posteriores; a lombar não é músculo do gerador). No cartão, que não tem o campo "onde sentir": `target` "Glúteos e posteriores da coxa (a lombar segura a coluna)". Prescrições: 0 (nunca é a 1ª escolha), então é só texto.

### 11. Terra com barra hexagonal: a classificação está certa
**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| Comparada à barra reta, a barra hexagonal deu **menos** momento (esforço) no quadril e na lombar e **mais** no joelho. | um estudo (biomecânica, 19 levantadores) | `swinton2011` (PMID 21659894) |
| A barra hexagonal teve mais EMG no quadríceps (vasto lateral) e menos no posterior (bíceps femoral) e na lombar. | um estudo (EMG, 20 homens) | `camara2016` (PMID 26840440) |

Ou seja: é um movimento entre o agachar e o dobrar o quadril, mais perto do agachar que o terra com barra reta. A biblioteca já diz isso: função "agachar"; quadríceps e glúteos como principais; posteriores como secundário. **Sem ação**, além de entrar na lista dos adutores (achado 6). Prescrições: 0 (só aparece como alternativa).

### 12. Mergulho: sem evidência para mudar
**Evidência.**
| Afirmação | Selo | Fonte |
|---|---|---|
| No mergulho nas paralelas, peito e tríceps trabalham bastante; o tríceps trabalhou mais nas paralelas que no banco. | um estudo (EMG, 13 homens) | `mckenzie2022` (PMID 36293792) |
| Não achei ensaio de hipertrofia do mergulho. | — | busca desta sessão |

Nos supinos e na flexão, a biblioteca conta o tríceps como secundário. No mergulho, conta por inteiro. A anatomia não decide: o cotovelo estende sob o peso do corpo inteiro, mas não há estudo que meça. Trocar o tríceps para secundário **não muda nada nas personas** (nenhuma faz mergulho), e ele é 0,1% das prescrições.

**Duas saídas:** manter, ou tríceps secundário por coerência com os supinos. **[opinião]** Manter. Sem evidência, a escolha é arbitrária, e manter não custa nada.

### 13. Secundários que o texto do guia não cita
Em 7 guias, o texto não cita um secundário que a biblioteca conta:
- o bíceps e o ombro posterior nas remadas e na puxada unilateral;
- o ombro posterior na barra fixa;
- os adutores no afundo e no búlgaro;
- a frente do ombro na flexão.

Os textos dizem **onde sentir**, e esses músculos trabalham sem que a pessoa precise prestar atenção neles. **[opinião]** Não mexer, exceto se o achado 6 levar os adutores para o desenho.

## Fontes
- `kubo2019`: Kubo K, Ikebukuro T, Yata H. Effects of squat training with different depths on lower limb muscle volumes. Eur J Appl Physiol 2019;119(9):1933-1942. PMID 31230110. resumo-PubMed (02/11/2026).
- `plotkin2023`: Plotkin DL, Rodas MA, Vigotsky AD et al. Hip thrust and back squat training elicit similar gluteus muscle hypertrophy and transfer similarly to the deadlift. Front Physiol 2023;14:1279170. PMID 37877099. resumo-PubMed (02/11/2026).
- `kinoshita2026`: Kinoshita M, Maeo S, Kobayashi Y et al. Hypertrophic Effects of Single- versus Multi-Joint Exercise: A Direct Comparison between Knee Extension and Leg Press. Med Sci Sports Exerc 2026;58(7):1566-1580. PMID 41630124. resumo-PubMed (02/11/2026).
- `campos2020`: Campos YAC, Vianna JM, Guimarães MP et al. Different Shoulder Exercises Affect the Activation of Deltoid Portions in Resistance-Trained Individuals. J Hum Kinet 2020;75:5-14. PMID 33312291. resumo-PubMed (02/11/2026).
- `larsen2025`: Larsen S, Wolf M, Schoenfeld BJ et al. Dumbbell versus cable lateral raises for lateral deltoid hypertrophy: an experimental study. Front Physiol 2025;16:1611468. PMID 40692697. resumo-PubMed (02/11/2026); a contagem do desenvolvimento como meia série, vista só numa descrição dos métodos, é **não verificada**.
- `schoenfeld2013`: Schoenfeld B, Sonmez RGT, Kolber MJ et al. Effect of hand position on EMG activity of the posterior shoulder musculature during a horizontal abduction exercise. J Strength Cond Res 2013;27(10):2644-9. PMID 23302754. resumo-PubMed (02/11/2026).
- `andersen2021`: Andersen V, Pedersen H, Fimland MS et al. Comparison of Muscle Activity in Three Single-Joint, Hip Extension Exercises in Resistance-Trained Women. J Sports Sci Med 2021;20(2):181-187. PMID 33948095. resumo-PubMed (02/11/2026).
- `swinton2011`: Swinton PA, Stewart A, Agouris I et al. A biomechanical analysis of straight and hexagonal barbell deadlifts using submaximal loads. J Strength Cond Res 2011;25(7):2000-9. PMID 21659894. resumo-PubMed (02/11/2026).
- `camara2016`: Camara KD, Coburn JW, Dunnick DD et al. An Examination of Muscle Activation and Power Characteristics While Performing the Deadlift Exercise With Straight and Hexagonal Barbells. J Strength Cond Res 2016;30(5):1183-8. PMID 26840440. resumo-PubMed (02/11/2026).
- `mckenzie2022`: McKenzie A, Crowley-McHattan Z, Meir R et al. Bench, Bar, and Ring Dips: Do Kinematics and Muscle Activity Differ? Int J Environ Res Public Health 2022;19(20):13211. PMID 36293792. resumo-PubMed (02/11/2026).
- `lumen-lat` e a anatomia descritiva (origem, inserção e ação): as mesmas de `docs/pesquisa/animacoes/r4-estilo-do-boneco.md`, seção 3 (verificado-busca). O livro-texto aberto (OpenStax) continua fora da rede da sessão.
- Uma modelagem do agachamento (Vigotsky e Bryanton, 2016) sobre a parte do adutor magno na extensão do quadril foi vista só em resumos de terceiros: **não verificada**, e não foi usada.

## Decisões do Gustavo
Decididas em 02/11/2026, item a item, sem nada pré-marcado.

| # | Achado | Decisão |
|---|---|---|
| 1 | Posteriores na ponte e no hip thrust (e nos coices) | **entra agora:** tirar dos 3 e dos 2 coices |
| 2 | Glúteo no afundo, no búlgaro e no stiff unilateral | **entra agora:** (a) o desenho segue a biblioteca (glúteo em laranja) |
| 3 | Trapézio superior no desenho da elevação lateral | **entra agora:** sai do desenho das 2 elevações laterais |
| 4 | Deltoide lateral no desenvolvimento | **entra agora:** (a) o desenho e o texto seguem a biblioteca (lateral como secundário) |
| 5 | "Costas" nos crucifixos invertidos | **entra agora:** (a) sai dos 3 crucifixos invertidos; fica no face pull |
| 6 | Adutores | **entra agora:** completar a lista (9 exercícios) e o desenho do afundo e do búlgaro |
| 7 | Selo e fonte nos músculos das 9 fichas | **entra agora** |
| 8 | Músculos não contados no desenho | **ficam só no desenho** (exceto o trapézio da elevação lateral, item 3) |
| 9 | Remover a cópia `elevacao-lateral-b` | **entra agora** |
| 10 | Lombar no cartão da hiperextensão | **entra agora** |
| 12 | Mergulho | **mantém** (peito e tríceps principais) |
| 13 | Secundários fora do texto do guia | **entra agora:** uma frase curta nos 7 guias |

As mudanças no desenho valem para o Boneco (o estilo padrão, `src/engine/estilo/musculos.ts`). O estilo clássico continua igual ao guia original, que é o que o teste de equivalência confere.
