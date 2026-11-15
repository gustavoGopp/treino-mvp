# Tabelas do bloco A (corpo, músculos, objetos e fichas de movimento)

Gerado por `node scripts/animacao-nova/tabelas-md.mjs` a partir dos arquivos de `src/engine/novo/dados/`. Nenhum número foi digitado neste documento: se um valor estiver errado, o erro está no arquivo de dados, e é lá que se corrige.

Tipos de linha: **medida** (lida na fonte), **derivada** (calculada de medidas, com a conta descrita), **provisória** (ainda sem fonte lida; a conferência lista todas e nenhuma animação vai para o app com provisória sem o ok do Gustavo) e **desenho** (escolha de desenho, sem pretensão de medida).

## Corpo: homem

População: ANSUR II (militares dos EUA, 2012), homens, IMC de 18,5 a 24,9; n = 1061; média de cada medida. 92 linhas: 69 medidas, 17 derivadas, 6 provisórias.

| medida | valor | tipo | fonte | onde na fonte |
|---|---|---|---|---|
| `estatura` | 175,8 cm | medida | ansur2 | coluna stature |
| `altura.maleolo` | 7,2 cm | medida | ansur2 | coluna lateralmalleolusheight (altura do eixo do tornozelo (Dempster, via NASA RP-1024: nível da ponta do maléolo lateral)) |
| `altura.joelho` | 49,3 cm | medida | ansur2 | coluna lateralfemoralepicondyleheight (altura do eixo do joelho (passa pelos epicôndilos)) |
| `altura.trocanter` | 90,6 cm | medida | ansur2 | coluna trochanterionheight (altura do centro do quadril (Dempster, via NASA RP-1024: nível da ponta do trocânter maior)) |
| `altura.cristaIliaca` | 106,5 cm | medida | ansur2 | coluna iliocristaleheight |
| `altura.cintura` | 106,5 cm | medida | ansur2 | coluna waistheightomphalion |
| `altura.costela10` | 112 cm | medida | ansur2 | coluna tenthribheight |
| `altura.peito` | 129,4 cm | medida | ansur2 | coluna chestheight |
| `altura.axila` | 133,2 cm | medida | ansur2 | coluna axillaheight |
| `altura.supraesternal` | 143,5 cm | medida | ansur2 | coluna suprasternaleheight |
| `altura.acromio` | 143,6 cm | medida | ansur2 | coluna acromialheight |
| `altura.cervical` | 151,5 cm | medida | ansur2 | coluna cervicaleheight (ponta do processo espinhoso de C7, na pele) |
| `altura.virilha` | 85,3 cm | medida | ansur2 | coluna crotchheight |
| `altura.nadega` | 89,3 cm | medida | ansur2 | coluna buttockheight |
| `altura.punho` | 84 cm | medida | ansur2 | coluna wristheight |
| `cabeca.tragionAoTopo` | 13 cm | medida | ansur2 | coluna tragiontopofhead |
| `perna.comp` | 42,1 cm | derivada | ansur2 | altura.joelho − altura.maleolo |
| `coxa.comp` | 41,3 cm | derivada | ansur2 | altura.trocanter − altura.joelho |
| `braco.acromioRadial` | 33,4 cm | medida | ansur2 | coluna acromionradialelength |
| `braco.comp` | 30,5 cm | medida | nasa-rp1024 | cap. IV, tabela 4: elo do braço, percentil 50 (do centro do ombro ao centro do cotovelo; população projetada, não o mesmo recorte do ANSUR) |
| `ombro.centroAbaixoDoAcromio` | 3,7 cm | derivada | ansur2+nasa-rp1024 | braco.acromioRadial + 0,8 (eixo do cotovelo 8 mm acima do radial: Dempster via NASA RP-1024) − braco.comp |
| `antebraco.comp` | 26,8 cm | medida | ansur2 | coluna radialestylionlength (do radial ao estiloide: usado como distância do eixo do cotovelo ao centro do punho) |
| `mao.comp` | 19,2 cm | medida | ansur2 | coluna handlength |
| `mao.palma` | 11,5 cm | medida | ansur2 | coluna palmlength |
| `mao.largura` | 8,6 cm | medida | ansur2 | coluna handbreadth |
| `mao.punhoAoCentroDaPegada` | 6,9 cm | derivada | ansur2 | forearmcenterofgriplength − radialestylionlength − 1,0 (recuo do olécrano atrás do eixo: provisório) |
| `pe.comp` | 26,9 cm | medida | ansur2 | coluna footlength |
| `pe.calcanharABola` | 19,9 cm | medida | ansur2 | coluna balloffootlength (do calcanhar às cabeças dos metatarsos: onde o pé dobra) |
| `pe.largura` | 9,9 cm | medida | ansur2 | coluna footbreadthhorizontal |
| `pe.larguraCalcanhar` | 7 cm | medida | ansur2 | coluna heelbreadth |
| `pe.calcanharAoTornozelo` | 7 cm | derivada | fathi2018 | 0,26 × comprimento do pé (calcanhar ao maléolo lateral 70,19 mm para um pé de 270,03 mm); antes: 6,7 cm (25% do pé, sem fonte) |
| `tornozelo.larguraMaleolos` | 7,3 cm | medida | ansur2 | coluna bimalleolarbreadth |
| `largura.biacromial` | 40,8 cm | medida | ansur2 | coluna biacromialbreadth |
| `largura.bideltoide` | 47,8 cm | medida | ansur2 | coluna bideltoidbreadth |
| `largura.peito` | 27,6 cm | medida | ansur2 | coluna chestbreadth |
| `prof.peito` | 22,6 cm | medida | ansur2 | coluna chestdepth |
| `largura.cintura` | 29 cm | medida | ansur2 | coluna waistbreadth |
| `prof.cintura` | 20,3 cm | medida | ansur2 | coluna waistdepth |
| `largura.quadril` | 32,4 cm | medida | ansur2 | coluna hipbreadth |
| `prof.nadega` | 21,7 cm | medida | ansur2 | coluna buttockdepth |
| `largura.bicristal` | 26,6 cm | medida | ansur2 | coluna bicristalbreadth |
| `ombro.compDoOmbro` | 15 cm | medida | ansur2 | coluna shoulderlength (do lado do pescoço ao acrômio, pela pele) |
| `circ.pescoco` | 37,3 cm | medida | ansur2 | coluna neckcircumference |
| `raio.pescoco` | 5,94 cm | derivada | ansur2 | circ.pescoco / 2π |
| `circ.pescocoBase` | 41,3 cm | medida | ansur2 | coluna neckcircumferencebase |
| `raio.pescocoBase` | 6,57 cm | derivada | ansur2 | circ.pescocoBase / 2π |
| `circ.bracoFletido` | 32,3 cm | medida | ansur2 | coluna bicepscircumferenceflexed (bíceps contraído, cotovelo a 90°: é o braço no fim da rosca) |
| `raio.bracoFletido` | 5,14 cm | derivada | ansur2 | circ.bracoFletido / 2π |
| `circ.antebraco` | 29 cm | medida | ansur2 | coluna forearmcircumferenceflexed |
| `raio.antebraco` | 4,62 cm | derivada | ansur2 | circ.antebraco / 2π |
| `circ.punho` | 17 cm | medida | ansur2 | coluna wristcircumference |
| `raio.punho` | 2,71 cm | derivada | ansur2 | circ.punho / 2π |
| `circ.coxa` | 56,1 cm | medida | ansur2 | coluna thighcircumference (na dobra do glúteo) |
| `raio.coxa` | 8,93 cm | derivada | ansur2 | circ.coxa / 2π |
| `circ.coxaBaixa` | 37,7 cm | medida | ansur2 | coluna lowerthighcircumference (logo acima do joelho) |
| `raio.coxaBaixa` | 6 cm | derivada | ansur2 | circ.coxaBaixa / 2π |
| `circ.panturrilha` | 36,4 cm | medida | ansur2 | coluna calfcircumference (no ponto mais largo) |
| `raio.panturrilha` | 5,79 cm | derivada | ansur2 | circ.panturrilha / 2π |
| `circ.tornozelo` | 21,9 cm | medida | ansur2 | coluna anklecircumference (no ponto mais fino) |
| `raio.tornozelo` | 3,49 cm | derivada | ansur2 | circ.tornozelo / 2π |
| `raio.bracoRelaxadoSobreFletido` | 0,93 razão | medida | isak-atletas | razão entre o braço relaxado e o contraído, de 0,90 a 0,93 nos cinco grupos (média 0,92); o ANSUR II só mede o braço contraído |
| `cabeca.comp` | 19,7 cm | medida | ansur2 | coluna headlength (da testa à nuca) |
| `cabeca.largura` | 15,2 cm | medida | ansur2 | coluna headbreadth |
| `cabeca.mentoAoNasio` | 12,1 cm | medida | ansur2 | coluna mentonsellionlength (do queixo à raiz do nariz) |
| `cabeca.larguraDoRosto` | 13,9 cm | medida | ansur2 | coluna bizygomaticbreadth |
| `cabeca.orelhaAltura` | 6,2 cm | medida | ansur2 | coluna earlength |
| `cabeca.alturaSobreEstatura` | 0,13 fração da estatura | medida | drillis-contini-via-cnb2025 | figura 1 (cota vertical da cabeça; fonte secundária) (do queixo ao topo) |
| `cabeca.altura` | 22,85 cm | derivada | drillis-contini-via-cnb2025 | cabeca.alturaSobreEstatura × estatura |
| `altura.baseDoCranio` | 162,8 cm | derivada | ansur2 | estatura − cabeca.tragionAoTopo (a articulação da cabeça com o pescoço fica perto da altura do tragion) |
| `quadril.meiaDistancia` | 8,35 cm | medida | gait2392 | metade da distância entre os dois centros do quadril no modelo: 8,35 cm (o Rajagopal 2016 dá 7,7); antes: 8,7 cm (sem fonte) |
| `ombro.meiaDistancia` | 18,4 cm | derivada | ansur2 | largura.biacromial / 2 − 2,0 (centro do ombro para dentro da borda do acrômio: provisório) |
| `ombro.centroAFrente` | 0 cm | **provisória** | a-conferir | centro do ombro sobre a linha do quadril, de lado (linha de prumo da postura: a conferir) |
| `l5s1.acima` | 12 cm | **provisória** | a-conferir | altura de L5–S1 acima do centro do quadril: a conferir. A conta sobre o Gait2392 daria 14,8 cm, e o canto de S1 medido em radiografia (Chanplakorn 2011) fica a 11,6 cm; o revisor no papel de anatomista recomendou manter 12 |
| `l5s1.atras` | 3 cm | **provisória** | a-conferir | recuo de L5–S1 atrás do centro do quadril: cerca de 3 cm por conta feita sobre o modelo Gait2392 (a origem do tronco do modelo, lida como L5–S1, é inferência); antes: 4,5 cm. Continua sem medida direta |
| `coluna.lombarGray` | 18 cm | medida | gray1918 | coluna vertebral, comprimentos por região (a conferir no texto (pesquisa 03)) |
| `coluna.toracicaGray` | 28 cm | medida | gray1918 | idem |
| `coluna.cervicalGray` | 12,5 cm | medida | gray1918 | idem |
| `coluna.lordoseLombar` | 50 graus | **provisória** | a-conferir | curva lombar em pé de L1 a L5 (Vialle 2005 dá 60 de lordose máxima incluindo o sacro): a conferir |
| `coluna.cifoseToracica` | 40 graus | medida | zappala2021 | curva torácica em pé, T1–T12: de 39 a 44 graus nos adultos saudáveis |
| `coluna.lordoseCervical` | 16,4 graus | medida | guo2018 | curva cervical em pé, de C2 a C7, em adultos sem sintoma (3.597 pessoas): 16,4 graus; antes: 30 graus (sem fonte) |
| `clavicula.retracaoRepouso` | 23 graus | medida | ludewig2009 | fig. 5-A (repouso) |
| `clavicula.elevacaoRepouso` | 11 graus | medida | ludewig2009 | fig. 5-A (repouso) |
| `clavicula.retracaoNaElevacao` | 16 graus | medida | ludewig2009 | fig. 5-A: aumento do repouso à elevação máxima do braço |
| `clavicula.elevacaoNaElevacao` | 6 graus | medida | ludewig2009 | fig. 5-A: aumento do repouso à elevação máxima do braço |
| `escapula.rotacaoParaCimaRepouso` | 11 graus | medida | ludewig2009 | fig. 5-C (repouso) |
| `escapula.rotacaoParaCimaNaElevacao` | 39 graus | medida | ludewig2009 | fig. 5-C: aumento do repouso à elevação máxima do braço |
| `escapula.rotacaoInternaRepouso` | 37 graus | medida | ludewig2009 | fig. 5-C (repouso): o plano da escápula |
| `clavicula.comp` | 15 cm | medida | patted2020 | comprimento da clavícula em homens: 149,67 mm (uma segunda fonte, TC de 26 homens, dá 15,3 cm) |
| `esterno.meiaDistanciaDasClaviculas` | 2,5 cm | **provisória** | a-conferir | da linha do meio até a articulação da clavícula com o esterno: sem fonte lida |
| `escapula.altura` | 16 cm | medida | yoo2012 | do ângulo superior ao inferior, escápulas masculinas: 159,8 mm; antes: 15,5 cm (sem fonte) |
| `escapula.largura` | 10,5 cm | medida | yoo2012 | da base da espinha à borda posterior da cavidade glenoide, escápulas masculinas: 105,0 mm |
| `altura.pubis` | 90,6 cm | **provisória** | a-conferir | altura da crista do púbis, em pé: tomada igual à do trocânter (90,6 cm), por falta de medida; o ANSUR II não mede o púbis. É onde o reto abdominal termina no desenho |

Fontes do corpo:

- `ansur2`: Gordon CC et al. 2012 Anthropometric Survey of U.S. Army Personnel (ANSUR II). CSV públicos: https://www.openlab.psu.edu/ansur2/ (médias calculadas em 12/11/2026; scripts/animacao-nova/dados/ansur2-medias.json)
- `nasa-rp1024`: NASA Reference Publication 1024, Anthropometric Source Book, vol. I (1978), cap. IV. https://ntrs.nasa.gov/citations/19790003563
- `drillis-contini-via-cnb2025`: Drillis & Contini 1966, lido na figura reproduzida por Almeida et al., 11º Congresso Nacional de Biomecânica, 2025 (fonte secundária)
- `ludewig2009`: Ludewig PM et al. Motion of the shoulder complex during multiplanar humeral elevation. J Bone Joint Surg Am 2009;91(2):378-389 (lido no PMC por resumo automático: conferir os números)
- `gray1918`: Gray H. Anatomy of the Human Body, 20ª ed., 1918 (domínio público)
- `a-conferir`: Sem fonte lida ainda: valor provisório, listado pela conferência
- `fathi2018`: Estudo antropométrico do pé, 290 homens de 18 a 30 anos (Urmia, Irã), paquímetro; https://brieflands.com/articles/healthscope-14063; lido em docs/revisoes/animacao-nova/pesquisa/09-fontes-das-medidas-provisorias-do-corpo.md, item 1
- `isak-atletas`: Circunferência do braço relaxado e contraído (ISAK) em cinco grupos de atletas homens: razão de 0,90 a 0,93; https://pmc.ncbi.nlm.nih.gov/articles/PMC5969204/ e https://pmc.ncbi.nlm.nih.gov/articles/PMC13692339/; docs/revisoes/animacao-nova/pesquisa/09, item 2. São atletas, não a população geral
- `zappala2021`: Zappalà M, Lightbourne S, Heneghan NR. J Orthop Surg Res 2021;16:447 (revisão sistemática, adultos saudáveis; CC BY 4.0); https://pmc.ncbi.nlm.nih.gov/articles/PMC8268398; docs/revisoes/animacao-nova/pesquisa/03 e 09, item 8
- `patted2020`: Patted SM, Kumar A, Halawar RS. Indian J Orthop 2020;54(Suppl 2):283-291 (TC, sul da Índia; homens 149,67 ± 9,6 mm); https://pmc.ncbi.nlm.nih.gov/articles/PMC7609512/; docs/revisoes/animacao-nova/pesquisa/03 e 09, item 10
- `yoo2012`: Yoo, Chung, Park, Chang, Paik. Clinics in Shoulder and Elbow 2012;15(2):73 (TC de 102 escápulas de 51 cadáveres coreanos, 62 masculinas); https://koreascience.kr/article/JAKO201212049742666; docs/revisoes/animacao-nova/pesquisa/09, itens 12 e 13
- `gait2392`: Delp SL e cols. Modelo Gait2392 do OpenSim (gait2392_thelen2003muscle.osim, CC BY 3.0), lido em docs/revisoes/animacao-nova/pesquisa/03-musculos-e-ossos.md, seção 2.1, e em docs/revisoes/animacao-nova/pesquisa/09, item 3. É um modelo de um homem de cerca de 1,80 m, não uma medida de população
- `guo2018`: Guo G-M e cols. Cervical lordosis in asymptomatic individuals: a meta-analysis. J Orthop Surg Res 2018;13:147 (CC BY 4.0); https://pmc.ncbi.nlm.nih.gov/articles/PMC6003173; docs/revisoes/animacao-nova/pesquisa/09, item 9

## Corpo: mulher

População: ANSUR II (militares dos EUA, 2012), mulheres, IMC de 18,5 a 24,9; n = 936; média de cada medida. 91 linhas: 62 medidas, 16 derivadas, 13 provisórias.

A tabela da mulher tem as mesmas linhas, com os valores da mesma população (mulheres). Está em `src/engine/novo/dados/corpo-mulher.json`; o desenho aprovado do Boneco só existe para o corpo do homem (ver proposta.md, decisões).

## Amplitudes das articulações

media = valor médio de referência (passar dele gera aviso); max = maior valor observado na amostra (passar dele é falha). Em graus.

| movimento | média | máximo observado | fonte |
|---|---|---|---|
| joelho.flexao | 140° | 164° | cdc |
| cotovelo.flexao | 148° | 166° | cdc |
| quadril.flexao | 132° | 159° | cdc |
| quadril.extensao | 18,5° | 42° | cdc |
| quadril.abducao | 40° | 60° | aaos |
| ombro.elevacao | 170° | 192° | cdc |
| tornozelo.dorsiflexao | 14,8° | 48° | cdc |
| tornozelo.flexaoPlantar | 56,7° | 90° | cdc |
| antebraco.pronacao | 80° | 108° | cdc |
| antebraco.supinacao | 87,5° | 131° | cdc |
| punho.extensao | 70° | 95° | aaos |
| punho.flexao | 80° | 95° | aaos |
| dedosDoPe.extensao | 70° | 90° | aaos |

Fontes: `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011; tabelas do CDC, Normal Joint Range of Motion Study (674 pessoas de 2 a 69 anos, movimento passivo). Lido em 12/11/2026: docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1; `aaos`: American Academy of Orthopaedic Surgeons, Joint Motion (1965), lida em transcrição secundária: docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A3. Só o valor de referência, sem máximo observado; `a-conferir`: Sem fonte lida ainda: limite provisório

## Músculos do desenho

O desenho aprovado tem 21 formas (Desenho do Boneco aprovado pelo Gustavo em 13/11/2026 (docs/revisoes/boneco-desenho/decisao). As formas foram desenhadas à mão sobre o corpo de medidas reais, em três vistas. Desde 14/11/2026 cada grupo tem a sua linha na tabela abaixo (origem, inserção, camada e fonte), e `npm run conferir:animacao` confere o desenho contra ela: a parte do corpo em que a forma está, a ordem de pintura, as pontas das formas contra os pontos de referência da fonte e se o músculo realçado é o do conteúdo. O resultado está em `prototipos/conferencia.md`.

| forma | desenhada de | o que o guia de hoje desenha no lugar (src/engine/estilo/musculos.ts) |
|---|---|---|
| abdomen | lado, frente | retoAbdominal |
| peitoral | lado, frente | peitoralEst, peitoralClav (duas formas) |
| dorsal | lado, costas | dorsal, redondoMaior |
| gluteo | lado, costas | gluteos |
| posteriores | lado, costas | posteriores |
| quadriceps | lado, frente | quadriceps |
| panturrilha | lado, frente, costas | panturrilha |
| patela | lado, frente | (não é músculo: a rótula, sempre em linha) |
| triceps | lado, costas | triceps |
| biceps | lado, frente | biceps |
| deltoide | lado, frente, costas | deltAnt, deltLat, deltPost (três formas) |
| deltAnt | lado, frente |  |
| deltLat | lado, frente, costas |  |
| deltPost | lado, costas |  |
| trapezio | frente, costas | trapSuperior, trapMedio, trapInferior, romboides (quatro formas) |
| obliquos | frente | obliquos |
| adutores | frente | adutores |
| tibial | frente | (não há no guia de hoje) |
| antebraco | frente, costas | antebraco |
| trapSup | costas |  |
| trapMedInf | costas |  |

O que o guia de hoje desenha e o desenho novo ainda não tem como forma própria: as três porções do deltoide, o peitoral clavicular, as três porções do trapézio e os romboides, o redondo maior e os eretores da espinha. Enquanto não houver, a porção vira a forma inteira (está listado nas decisões de proposta.md).

### De onde sai, onde prende e por cima de quem passa

| grupo do desenho | músculos reais | origem (osso do boneco: onde) | inserção | a massa fica em | atravessa | camada; cobre | forma | fonte | grupo do conteúdo | o que o desenho não separa |
|---|---|---|---|---|---|---|---|---|---|---|
| Peitoral maior (`peitoral`) | peitoral maior, parte clavicular; peitoral maior, parte esternocostal | tronco: metade esternal da clavícula; face anterior do esterno até a cartilagem da 6ª ou 7ª costela; cartilagens das costelas verdadeiras | braco: crista do tubérculo maior do úmero | tronco | ombro | superficial; cobre abdomen | leque | GRAY1918, p. 436–437 | peito | parte clavicular (o peitoral de cima); parte esternocostal |
| Deltoide (`deltoide`) | deltoide anterior; deltoide lateral; deltoide posterior | tronco: terço lateral da clavícula, acrômio e espinha da escápula | braco: tuberosidade deltóidea, no meio da face lateral do úmero | braco | ombro | superficial; cobre peitoral, biceps, triceps | triangular | GRAY1918, p. 439–440 | ombro_anterior, ombro_lateral, ombro_posterior |  |
| Trapézio (`trapezio`) | trapézio superior; trapézio médio; trapézio inferior | tronco: protuberância occipital, ligamento nucal, processos espinhosos de C7 e de todas as torácicas (a ponta de baixo corresponde à 12ª torácica) | tronco: terço lateral da clavícula, acrômio e espinha da escápula | tronco | escapula | superficial; cobre dorsal | triangular plano | GRAY1918, p. 432 e 434 | costas | romboides (ficam por baixo dele) |
| Grande dorsal (`dorsal`) | grande dorsal; redondo maior | tronco: processos espinhosos das 6 torácicas inferiores, fáscia toracolombar, crista ilíaca e 3 ou 4 costelas inferiores | braco: fundo do sulco intertubercular do úmero | tronco | ombro | superficial | triangular plano | GRAY1918, p. 432–434 | costas | redondo maior |
| Bíceps braquial (`biceps`) | bíceps braquial; braquial | tronco: processo coracoide e tubérculo supraglenoidal da escápula | ante: tuberosidade do rádio | braco | ombro, cotovelo | superficial | fuso | GRAY1918, p. 443–444 | biceps |  |
| Tríceps braquial (`triceps`) | tríceps, cabeça longa; tríceps, cabeça lateral; tríceps, cabeça medial | tronco: tubérculo infraglenoidal da escápula (cabeça longa) e face posterior do úmero (cabeças lateral e medial) | ante: olécrano da ulna | braco | ombro, cotovelo | superficial | três cabeças num tendão comum | GRAY1918, p. 444–445 | triceps |  |
| Músculos do antebraço (`antebraco`) | flexores do antebraço (grupo superficial); extensores do antebraço; braquiorradial | braco: epicôndilos medial e lateral do úmero e crista supracondilar lateral | mao: ossos do carpo, do metacarpo e dedos (inserções distais só parcialmente lidas) | ante | cotovelo, punho | superficial | fusos com tendões longos | GRAY1918, p. 445–453 | (nenhum) |  |
| Reto abdominal (`abdomen`) | reto abdominal | pelve: crista do púbis e sínfise púbica | tronco: cartilagens das costelas 5, 6 e 7 e processo xifoide | tronco | lombar | superficial | faixa longa e plana, com 3 intersecções | GRAY1918, p. 415–418 | abdomen |  |
| Oblíquo externo (`obliquos`) | oblíquo externo do abdome | tronco: superfícies externas das 8 costelas inferiores | pelve: crista ilíaca, linha alba e ligamento inguinal | tronco | lombar | superficial | plano, quadrilátero | GRAY1918, p. 409–410 | abdomen |  |
| Glúteo máximo (`gluteo`) | glúteo máximo; glúteo médio | pelve: linha glútea posterior do ílio, sacro e cóccix | coxa: trato iliotibial e tuberosidade glútea do fêmur | pelve | quadril | superficial; cobre posteriores | massa quadrilátera larga | GRAY1918, p. 474–475 | gluteos | glúteo médio |
| Quadríceps (`quadriceps`) | reto femoral; vasto lateral; vasto medial; vasto intermédio | pelve: espinha ilíaca ântero-inferior (reto femoral) e corpo do fêmur (vastos) | canela: patela e, pelo ligamento patelar, tuberosidade da tíbia | coxa | quadril, joelho | superficial | quatro porções num tendão comum | GRAY1918, p. 470–471 | quadriceps |  |
| Posteriores da coxa (`posteriores`) | bíceps femoral; semitendíneo; semimembranáceo | pelve: tuberosidade isquiática (e linha áspera, na cabeça curta do bíceps) | canela: cabeça da fíbula e face medial da tíbia | coxa | quadril, joelho | superficial | fusos | GRAY1918, p. 478–479 | posteriores |  |
| Adutores (`adutores`) | adutor longo; adutor magno | pelve: púbis e ísquio | coxa: linha áspera e tubérculo adutor do fêmur | coxa | quadril | superficial | triangular | GRAY1918, p. 472–473 | adutores |  |
| Panturrilha (`panturrilha`) | gastrocnêmio; sóleo | coxa: côndilos do fêmur (gastrocnêmio); fíbula e tíbia (sóleo) | pe: calcâneo, pelo tendão calcâneo | canela | joelho, tornozelo | superficial | duas cabeças | GRAY1918, p. 482–483 | panturrilha |  |
| Tibial anterior (`tibial`) | tibial anterior | canela: côndilo lateral e face lateral da tíbia | pe: primeiro cuneiforme e base do primeiro metatarso | canela | tornozelo | superficial | grosso em cima, tendão embaixo | GRAY1918, p. 480 | (nenhum) |  |
| Deltoide, parte da frente (`deltAnt`) | deltoide anterior (clavicular) | tronco: borda anterior e face superior do terço lateral da clavícula | braco: tuberosidade deltóidea, no meio da face lateral do úmero | braco | ombro | superficial | triangular | GRAY1918, p. 439–440 | ombro_anterior |  |
| Deltoide, parte do lado (`deltLat`) | deltoide lateral (acromial) | tronco: margem lateral e face superior do acrômio | braco: tuberosidade deltóidea, no meio da face lateral do úmero | braco | ombro | superficial | triangular | GRAY1918, p. 439–440 | ombro_lateral |  |
| Deltoide, parte de trás (`deltPost`) | deltoide posterior (espinal) | tronco: borda posterior da espinha da escápula | braco: tuberosidade deltóidea, no meio da face lateral do úmero | braco | ombro | superficial | triangular | GRAY1918, p. 439–440 | ombro_posterior |  |
| Trapézio, parte de cima (`trapSup`) | trapézio superior | tronco: protuberância occipital, linha nucal e ligamento nucal | tronco: borda posterior do terço lateral da clavícula | tronco | escapula | superficial | triangular plano | GRAY1918, p. 432 e 434 | costas |  |
| Trapézio, partes do meio e de baixo (`trapMedInf`) | trapézio médio; trapézio inferior; romboides (ficam por baixo dele) | tronco: processos espinhosos de C7 e das torácicas, até a 12ª | tronco: acrômio e espinha da escápula | tronco | escapula | superficial | triangular plano | GRAY1918, p. 432 e 434 | costas |  |

Osso de cada parte do boneco: tronco = coluna, costelas, esterno, clavícula e escápula; pelve = bacia e sacro; braco = úmero; ante = rádio e ulna; mao = carpo, metacarpo e dedos; coxa = fêmur; canela = tíbia e fíbula; pe = ossos do pé.

**Regra de forma.** O músculo mantém o volume: ao encurtar, engrossa. No desenho, a forma fica presa à superfície da parte do corpo e encurta com ela; o engrossamento ainda não é desenhado. Estado: a forma não engrossa ao encurtar: pendente.

Fontes: `GRAY1918`: Gray H. Anatomy of the Human Body, 20ª ed. (1918), domínio público; lido em docs/revisoes/animacao-nova/pesquisa/03-musculos-e-ossos.md, Parte 1; `RAITERI2016`: Raiteri BJ, Cresswell AG, Lichtwark GA. PeerJ 2016;4:e2260 (CC BY 4.0): tibial anterior, 12 voluntários; a espessura aumenta 2,5 mm e a largura quase não muda, com o volume constante

## Objetos

| objeto | medida | valor | tipo | fonte | onde na fonte |
|---|---|---|---|---|---|
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `comp` | 33 cm | medida | ritfit-hex | comprimento total, 25 lb: 13 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `cabecaLargura` | 13,7 cm | medida | ritfit-hex | largura da cabeça, 25 lb: 5,4 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `cabecaAltura` | 12,2 cm | medida | ritfit-hex | altura da cabeça, 25 lb: 4,8 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `caboDiam` | 3,3 cm | medida | ritfit-hex | diâmetro do cabo, 15 a 60 lb: 1,3 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `caboComp` | 13 cm | medida | titan-hex | comprimento livre do cabo de um halter sextavado de 25 lb: 5,125 pol = 13,0 cm |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `massa` | 11,3 kg | medida | ritfit-hex | 25 lb |
| Banco reto (`bancoReto`) | `comp` | 122 cm | medida | ipf2026 | seção 2.6: comprimento não menor que 1,22 m |
| Banco reto (`bancoReto`) | `larg` | 30,5 cm | medida | rogue-fb | Bench Pad Width: 12 pol (IPF: 29 a 32 cm) |
| Banco reto (`bancoReto`) | `altura` | 43,5 cm | derivada | ipf2026 | meio da faixa da seção 2.6: 42 a 45 cm do piso ao topo do estofado |
| Banco reto (`bancoReto`) | `estofado` | 6,35 cm | medida | rogue-fb | Pad Thickness: 2,5 pol |
| Banco reto (`bancoReto`) | `baseLarg` | 56 cm | medida | hs2024 | largura total do Flat Bench FW-FB: 22 pol |
| Banco reto (`bancoReto`) | `tubo` | 5,1 cm | medida | rogue-fb2 | lado menor do tubo de 2x3 pol: 2 pol = 5,08 cm; antes: 5 cm (sem fonte) |
| Anilha de ferro de 10 lb sob o calcanhar (`anilhaCalcanhar`) | `diam` | 22,8 cm | medida | rogue-steel | Plate Diameter, 10 lb: 228 mm |
| Anilha de ferro de 10 lb sob o calcanhar (`anilhaCalcanhar`) | `esp` | 2,4 cm | **provisória** | a-conferir | espessura da anilha de 10 lb: a Rogue não informa |
| Coluna de polia regulável (crossover) (`torre`) | `altura` | 239 cm | medida | lf-cc | Dimensions: 94 pol de altura |
| Coluna de polia regulável (crossover) (`torre`) | `poliaMax` | 193 cm | medida | lf-cc | altura do carrinho: até 76 pol |
| Coluna de polia regulável (crossover) (`torre`) | `poliaMin` | 17,8 cm | medida | lf-cc | altura do carrinho: a partir de 7 pol |
| Coluna de polia regulável (crossover) (`torre`) | `relacao` | 2 razão | medida | lf-cc | relação do cabo 2:1: a pilha sobe metade do que o cabo anda |
| Coluna de polia regulável (crossover) (`torre`) | `prof` | 72 cm | medida | lf-cc | Dimensions: 28,5 pol de profundidade da base |
| Coluna de polia regulável (crossover) (`torre`) | `colunaLarg` | 30 cm | **provisória** | a-conferir | largura da coluna com a carenagem da pilha: nenhuma ficha lida informa |
| Coluna de polia regulável (crossover) (`torre`) | `roldanaDiam` | 11 cm | medida | bodysolid-pcco90x | diâmetro da roldana: 110 mm; antes: 11,5 cm (sem fonte) |
| Coluna de polia regulável (crossover) (`torre`) | `caboDiam` | 0,64 cm | medida | rogue-sling | cabo de aço de 1/4 pol (sem a capa) |
| Coluna de polia regulável (crossover) (`torre`) | `pilhaLarg` | 22 cm | **provisória** | a-conferir | largura das placas da pilha: nenhuma ficha lida informa |
| Coluna de polia regulável (crossover) (`torre`) | `placaEsp` | 2,5 cm | **provisória** | a-conferir | espessura de cada placa da pilha: nenhuma ficha lida informa |
| Coluna de polia regulável (crossover) (`torre`) | `placas` | 16 un | desenho | desenho | número de placas desenhadas na pilha (uma pilha de 200 lb da Body-Solid tem 20 placas de 10 lb) |
| Estribo (pegador de uma mão) (`estribo`) | `pegadaComp` | 12,7 cm | medida | rogue-estribo | comprimento da pegada: 5 pol = 12,7 cm; antes: 12,5 cm (sem fonte) |
| Estribo (pegador de uma mão) (`estribo`) | `pegadaDiam` | 3,2 cm | medida | rogue-estribo | diâmetro da pegada: opção de 32 mm |
| Estribo (pegador de uma mão) (`estribo`) | `altura` | 15 cm | **provisória** | a-conferir | da pegada ao elo do cabo: sem medida lida |
| Colchonete (`colchonete`) | `comp` | 100 cm | **provisória** | a-conferir | sem medida lida |
| Colchonete (`colchonete`) | `larg` | 50 cm | **provisória** | a-conferir | sem medida lida |
| Colchonete (`colchonete`) | `esp` | 1,5 cm | **provisória** | a-conferir | sem medida lida |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `estofadoComp` | 132 cm | medida | rogue-ab3 | comprimento do estofado inteiro (encosto + assento): 52 pol |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `larg` | 28,6 cm | medida | rogue-ab3 | largura do estofado de vinil: 11,25 pol |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `altura` | 44,5 cm | medida | rogue-ab3 | altura do estofado na posição plana: 17,5 pol |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `vao` | 2,5 cm | medida | rogue-ab3 | espaço entre o assento e o encosto: 1 pol |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `baseComp` | 143,5 cm | medida | rogue-ab3 | comprimento da base: 56,5 pol |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `baseLarg` | 62,9 cm | medida | rogue-ab3 | largura traseira da base: 24,75 pol |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `encostoMax` | 85 graus | medida | rogue-ab3 | maior ângulo do encosto (10 posições, de 0 a 85) |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `estofado` | 7 cm | medida | gymgear-mab | espessura do estofado: 70 mm (outro modelo; a ficha da Rogue não informa) |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `assentoComp` | 34 cm | **provisória** | a-conferir | comprimento só do assento: nenhuma ficha lida separa assento e encosto |
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `tubo` | 7,6 cm | medida | rogue-ab3-tubo | lado do tubo de 3x3 pol: 7,62 cm; antes: 6 cm (sem fonte) |
| Elástico em tubo, com pegadores (`elastico`) | `comp` | 121,9 cm | medida | rogue-tubo | comprimento do tubo em repouso, sem os pegadores: 48 pol |
| Elástico em tubo, com pegadores (`elastico`) | `tuboDiam` | 1,2 cm | derivada | workoutz-tubo | diâmetro de fora do tubo em repouso: de 0,95 cm (o mais fraco) a 1,49 cm (o mais forte); usado o meio da faixa |
| Elástico em tubo, com pegadores (`elastico`) | `pegadorComp` | 12,7 cm | medida | rogue-tubo | comprimento da pegada: 5 pol |
| Elástico em tubo, com pegadores (`elastico`) | `pegadorDiam` | 3,3 cm | medida | rogue-tubo | diâmetro da pegada: 1 5/16 pol = 33,3 mm |
| Elástico em tubo, com pegadores (`elastico`) | `fita` | 8,9 cm | derivada | rogue-tubo | da pegada até a ponta do tubo: (65 pol de ponta a ponta − 48 do tubo − 2 × 5 dos pegadores) / 2 = 3,5 pol; a ficha não dá este número direto |
| Elástico em tubo, com pegadores (`elastico`) | `esticaAte` | 3 vezes | medida | theraband-manual | alongamento máximo: 3 vezes o comprimento em repouso (outro fabricante; a Rogue calcula a resistência a 2,5 vezes e não dá o máximo) |
| Kettlebell (modelo de competição) (`kettlebell`) | `altura` | 28,2 cm | medida | rogue-ckb | altura total, da base ao alto da alça: 11,1 pol |
| Kettlebell (modelo de competição) (`kettlebell`) | `corpoLarg` | 20,8 cm | medida | rogue-ckb | largura do corpo (a bola): 8,19 pol |
| Kettlebell (modelo de competição) (`kettlebell`) | `alcaDiam` | 3,3 cm | medida | rogue-ckb | diâmetro da alça: 33 mm |
| Kettlebell (modelo de competição) (`kettlebell`) | `alcaLarg` | 12,3 cm | medida | rogue-ckb | distância entre as duas hastes da alça: 123 mm |
| Kettlebell (modelo de competição) (`kettlebell`) | `baseDiam` | 14 cm | medida | rogue-ckb | diâmetro da base: 5,5 pol |
| Kettlebell (modelo de competição) (`kettlebell`) | `massa` | 12 kg | desenho | desenho | o peso desenhado: um dos pesos do modelo (8 a 48 kg, todos do mesmo tamanho) |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `altura` | 90 cm | medida | cubro-metod | altura total com o tampo: 80 + 8 (pés) + 2 (tampo) |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `tampoEsp` | 2 cm | medida | cubro-metod | espessura padrão do tampo |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `rodape` | 8 cm | medida | cubro-metod | altura dos pés do gabinete (atrás do rodapé) |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `prof` | 60 cm | medida | cubro-metod | profundidade padrão do gabinete |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `balanco` | 2 cm | **provisória** | a-conferir | quanto o tampo passa da frente do gabinete (sem medida lida) |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `rodapeRecuo` | 5 cm | **provisória** | a-conferir | quanto o rodapé fica para dentro da frente do gabinete (sem medida lida) |
| Bancada de cozinha (gabinete de base com tampo), o apoio fixo na altura da cintura (`bancada`) | `larg` | 120 cm | desenho | desenho | o trecho de bancada desenhado (só precisa caber as duas mãos) |
| Bola suíça (bola de exercício) de 65 cm (`bolaSuica`) | `diam` | 65 cm | medida | gymnic-grayline | diâmetro nominal da bola de 65 cm, a indicada para quem tem de 1,60 a 1,83 m (o Boneco tem 1,76 m) |
| Bola suíça (bola de exercício) de 65 cm (`bolaSuica`) | `amassa` | 1,5 cm | **provisória** | desenho-bola | quanto a bola cheia e firme achata em cima do chão com o peso das pernas: o centro desce isso, e a parte de baixo fica reta. A ficha não dá número; a medida real depende da pressão |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `assentoAltura` | 45,1 cm | medida | ikea-stefan | Seat height: 17 3/4 pol (do chão ao tampo do assento) |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `assentoLarg` | 41,9 cm | medida | ikea-stefan | Seat width: 16 1/2 pol |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `assentoProf` | 37,1 cm | medida | ikea-stefan | Seat depth: 14 5/8 pol (da borda da frente do assento ao encosto) |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `altura` | 89,9 cm | medida | ikea-stefan | Height: 35 3/8 pol (do chão ao alto do encosto) |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `prof` | 48,9 cm | medida | ikea-stefan | Depth: 19 1/4 pol (da borda da frente ao fundo do encosto, por fora) |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `assentoEsp` | 3 cm | **provisória** | a-conferir | espessura do tampo do assento: a ficha não traz |
| Cadeira firme de quatro pés, com encosto (`cadeira`) | `peLado` | 3,5 cm | **provisória** | a-conferir | lado da seção quadrada de cada pé da cadeira: a ficha não traz |
| Corda de tríceps (puxador de corda para a polia) (`cordaTriceps`) | `comp` | 71,1 cm | medida | rogue-corda | comprimento total, com as pontas de borracha: 28 pol |
| Corda de tríceps (puxador de corda para a polia) (`cordaTriceps`) | `ramo` | 29,2 cm | medida | rogue-corda | cada ramo da corda dobrada, do anel à ponta: cerca de 11,5 pol |
| Corda de tríceps (puxador de corda para a polia) (`cordaTriceps`) | `diam` | 2,5 cm | medida | livingfit-corda | diâmetro da corda: 1 pol = 25 mm (outro fabricante) |
| Corda de tríceps (puxador de corda para a polia) (`cordaTriceps`) | `pontaDiam` | 4,5 cm | **provisória** | a-conferir | diâmetro da ponta de borracha: nenhuma ficha lida informa |
| Corda de tríceps (puxador de corda para a polia) (`cordaTriceps`) | `pontaComp` | 4 cm | **provisória** | a-conferir | comprimento da ponta de borracha: nenhuma ficha lida informa |
| Corda de tríceps (puxador de corda para a polia) (`cordaTriceps`) | `anelDiam` | 4 cm | **provisória** | a-conferir | diâmetro da bucha do meio, por onde o mosquetão prende: nenhuma ficha lida informa |
| Elástico longo em laço (faixa de 41 pol, tipo "super band") (`elasticoLongo`) | `compDeitado` | 104,1 cm | medida | rubberbanditz-41 | comprimento do laço deitado (achatado), em repouso: 41 pol |
| Elástico longo em laço (faixa de 41 pol, tipo "super band") (`elasticoLongo`) | `comp` | 208,3 cm | derivada | rubberbanditz-41 | a volta inteira do laço em repouso: 2 × 41 pol (o laço deitado tem duas camadas); é contra ela que a conferência mede quanto a faixa estica |
| Elástico longo em laço (faixa de 41 pol, tipo "super band") (`elasticoLongo`) | `larg` | 1,27 cm | medida | rubberbanditz-41 | largura da faixa média (Medium, 1/2 pol); a Serious Steel #1 tem a mesma largura |
| Elástico longo em laço (faixa de 41 pol, tipo "super band") (`elasticoLongo`) | `esp` | 0,45 cm | medida | seriousSteel-41 | espessura da faixa: 4,5 mm (outro fabricante, a mesma faixa de 41 pol e 1/2 pol) |
| Elástico longo em laço (faixa de 41 pol, tipo "super band") (`elasticoLongo`) | `esticaAte` | 2,5 vezes | medida | rubberbanditz-41 | a faixa estica até 2,5 vezes o comprimento em repouso (a Serious Steel mede a tensão até 2,5 vezes) |
| Elástico longo em laço (faixa de 41 pol, tipo "super band") (`elasticoLongo`) | `pegadaDiam` | 2,2 cm | **provisória** | a-conferir | a faixa franzida dentro da mão fechada (a ficha não dá; escolha de desenho a partir da largura e da espessura) |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `degrauAltura` | 17 cm | medida | nbr9077 | altura h do degrau: o meio da faixa de 16 a 18 cm |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `degrauPiso` | 29,5 cm | derivada | nbr9077 | largura b do degrau pela fórmula de Blondel, no meio da faixa: 2 × 17 + b = 63,5 cm |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `larg` | 90 cm | desenho | nbr9077 | largura da escada: a norma pede no mínimo 80 cm (uma unidade de passagem); o valor exato é escolha de desenho |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `corrimaoAltura` | 86 cm | medida | nbr9077 | o corrimão acima da linha das quinas dos degraus: o meio da faixa de 80 a 92 cm |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `corrimaoDiam` | 4,5 cm | medida | nbr9077 | diâmetro do corrimão: dentro da faixa de 38 a 65 mm |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `degraus` | 3 un | desenho | nbr9077 | quantos degraus o quadro mostra (só os primeiros: o resto da escada sai do quadro) |
| Escada reta com corrimão (os primeiros degraus) (`escada`) | `montanteLado` | 3 cm | **provisória** | a-conferir | seção dos montantes que sustentam o corrimão: a norma não dá |
| Halter sextavado emborrachado de 10 lb (4,5 kg) (`halterLeve`) | `comp` | 26,7 cm | medida | ritfit-hex | comprimento total (Total Length), 10 lb: 10,5 pol = 26,67 cm |
| Halter sextavado emborrachado de 10 lb (4,5 kg) (`halterLeve`) | `cabecaLargura` | 10,2 cm | medida | ritfit-hex | largura da cabeça (Head Width), 10 lb: 4 pol = 10,16 cm |
| Halter sextavado emborrachado de 10 lb (4,5 kg) (`halterLeve`) | `cabecaAltura` | 9,1 cm | medida | ritfit-hex | altura da cabeça (Head Height), 10 lb: 3,6 pol = 9,14 cm |
| Halter sextavado emborrachado de 10 lb (4,5 kg) (`halterLeve`) | `caboDiam` | 2,8 cm | medida | ritfit-hex | diâmetro do cabo (Handle Diameter), 5 e 10 lb: 1,1 pol = 2,79 cm; o Titan de 10 lb dá 28 mm |
| Halter sextavado emborrachado de 10 lb (4,5 kg) (`halterLeve`) | `caboComp` | 13 cm | medida | titan-hex-10 | comprimento livre do cabo do halter sextavado de 10 lb: 5,125 pol = 13,0 cm (a RitFit não publica essa coluna) |
| Halter sextavado emborrachado de 10 lb (4,5 kg) (`halterLeve`) | `massa` | 4,5 kg | medida | ritfit-hex | 10 lb = 4,54 kg |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `altura` | 210 cm | medida | vert-porta | altura da folha de porta |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `larg` | 80 cm | medida | vert-porta | largura da folha de porta |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `esp` | 3,5 cm | medida | vert-porta | espessura da folha de porta |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `vao` | 1 cm | **provisória** | a-conferir | vão entre a folha e o chão, por onde passa a fita da âncora |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `ancoraComp` | 12,7 cm | medida | stroops-ancora | comprimento da espuma da âncora: 5 pol |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `ancoraLarg` | 10,2 cm | medida | stroops-ancora | largura da espuma da âncora: 4 pol |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `ancoraAlt` | 2,5 cm | medida | stroops-ancora | altura da espuma da âncora: 1 pol |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `alcaComp` | 6 cm | **provisória** | a-conferir | quanto a alça de fita sai do vão da porta, do lado de quem treina (a ficha não dá o comprimento da fita) |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `batenteLarg` | 7 cm | **provisória** | a-conferir | largura do batente (e da guarnição) em volta da folha, vista de frente |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `batenteProf` | 10 cm | **provisória** | a-conferir | profundidade do batente na parede |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `macanetaAltura` | 105 cm | **provisória** | a-conferir | altura da maçaneta do chão |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `macanetaDaBorda` | 6 cm | **provisória** | a-conferir | distância do centro da maçaneta à borda da folha |
| Step de academia (plataforma com dois apoios), na altura mais baixa (`step`) | `comp` | 102 cm | medida | lifespan-reebok-step | comprimento (L): 102 cm; fica atravessado, de um lado ao outro da pessoa |
| Step de academia (plataforma com dois apoios), na altura mais baixa (`step`) | `prof` | 38,5 cm | medida | lifespan-reebok-step | largura (W): 38,5 cm; é a profundidade de quem sobe nele |
| Step de academia (plataforma com dois apoios), na altura mais baixa (`step`) | `altura` | 15 cm | medida | lifespan-reebok-step | a mais baixa das três alturas (15, 20 e 25 cm) |
| Step de academia (plataforma com dois apoios), na altura mais baixa (`step`) | `tapeteEsp` | 1,5 cm | desenho | cartao-step | o tapete de borracha por cima da plataforma |
| Step de academia (plataforma com dois apoios), na altura mais baixa (`step`) | `plataformaEsp` | 5,5 cm | desenho | cartao-step | a plataforma escura, sob o tapete |
| Step de academia (plataforma com dois apoios), na altura mais baixa (`step`) | `apoioLarg` | 18 cm | desenho | cartao-step | cada um dos dois apoios claros embaixo da plataforma, perto das pontas |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `ancoraAltura` | 182,9 cm | medida | trx-comeco | onde a fita se prende (a ponta de baixo da fita de ancoragem, com o mosquetão): cerca de 6 pés do chão, a altura que o fabricante chama de ideal para todos os exercícios |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `alcaAlturaMin` | 20,3 cm | medida | trx-seis | o fundo do berço do pé, com a fita pendurada, no meio da canela: cerca de 8 pol do chão (o menor da faixa) |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `alcaAlturaMax` | 30,5 cm | medida | trx-seis | o fundo do berço do pé, com a fita pendurada, no meio da canela: cerca de 12 pol do chão (o maior da faixa) |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `ancoraLarg` | 5,1 cm | medida | trx-pro4 | largura da fita de ancoragem (Suspension Anchor): 2 pol |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `ancoraComp` | 96,5 cm | medida | trx-pro4 | comprimento da fita de ancoragem (Suspension Anchor): 38 pol; enrolada no ponto firme, só a ponta de baixo aparece |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `fitaLarg` | 3,8 cm | **provisória** | a-conferir | largura de cada fita: a página do fabricante não traz (1,5 pol, a largura comum de fita de náilon) |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `mosquetaoComp` | 10 cm | **provisória** | a-conferir | comprimento do mosquetão que liga a fita à âncora: a página do fabricante não traz |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `pegadorComp` | 14 cm | **provisória** | a-conferir | comprimento do pegador de mão (espuma): a página do fabricante só diz "padded handles" |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `pegadorDiam` | 3,5 cm | **provisória** | a-conferir | diâmetro do pegador de mão: a página do fabricante não traz |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `bercoLarg` | 9 cm | **provisória** | a-conferir | largura do berço do pé (a alça onde entra o peito do pé): a página do fabricante não traz |
| Fita de suspensão (tipo TRX): âncora, mosquetão, fitas, pegadores e berços do pé (`suspensao`) | `bercoAlt` | 6 cm | **provisória** | a-conferir | quanto o berço do pé desce abaixo do pegador, onde o peito do pé apoia: a página do fabricante não traz |
| Toalha de mão, dobrada em quatro no comprimento, sob os calcanhares (`toalha`) | `larg` | 40,6 cm | medida | zogics-toalha | o lado menor da toalha de mão: 16 pol; fica atravessada sob os dois calcanhares, com a largura inteira |
| Toalha de mão, dobrada em quatro no comprimento, sob os calcanhares (`toalha`) | `comp` | 76,2 cm | medida | zogics-toalha | o lado maior da toalha de mão: 30 pol; dobrada em quatro, fica com 19 cm na direção em que os calcanhares deslizam |
| Toalha de mão, dobrada em quatro no comprimento, sob os calcanhares (`toalha`) | `esp` | 0,5 cm | **provisória** | a-conferir | espessura de uma camada de felpa: a ficha do fabricante dá o peso (4,5 lb por dúzia), não a espessura; dobrada em quatro, são quatro camadas (2 cm) |

Fontes dos objetos:

- `ritfit-hex`: RitFit. Hex Dumbbells Pairs and Sets, Technical Specification (tabela por peso). https://www.ritfitsports.com/pages/hex-dumbbells-pairs-and-sets-technical-specification (lido em 12/11/2026)
- `ipf2026`: International Powerlifting Federation. Technical Rules Book 2026, seções 2.3 e 2.6 (lido em 12/11/2026)
- `rogue-fb`: Rogue Fitness. Flat Utility Bench 2.0, especificações (lido em 12/11/2026)
- `hs2024`: Hammer Strength. Catálogo 2024, tabela Benches and storage, p. 63: Flat Bench FW-FB
- `rogue-steel`: Rogue Fitness. Steel Plates, tabela Plate Diameter (lido em 12/11/2026)
- `lf-cc`: Life Fitness. Adjustable Cable Crossover LCM-CC, campo Dimensions e especificações (lido em 12/11/2026)
- `rogue-sling`: Rogue Fitness. Monster Lite Slinger, Specs: cabo de aço de 1/4 pol (lido em 12/11/2026)
- `a-conferir`: Sem ficha lida ainda: valor provisório, listado pela conferência
- `rogue-ab3`: Rogue Fitness. Adjustable Bench 3.0, Gear specs (lido em 12/11/2026; docs/revisoes/animacao-nova/pesquisa/04, seção 4)
- `gymgear-mab`: Gym Gear. Pro Series Multi Adjustable Bench, Technical specifications (lido em 12/11/2026; pesquisa/04, seção 4)
- `titan-hex`: Titan Fitness, 25 lb Rubber Hex Dumbbells; https://titan.fitness/products/25-lb-rubber-hex-dumbbells; lido em docs/revisoes/animacao-nova/pesquisa/10-fontes-das-medidas-provisorias-dos-objetos.md (página lida por resumo automático; é outro fabricante que o do resto do halter)
- `rogue-fb2`: Rogue, Flat Utility Bench 2.0 (tubo de 2x3 pol); https://www.roguefitness.com/rogue-flat-utility-bench-2-0; docs/revisoes/animacao-nova/pesquisa/10-fontes-das-medidas-provisorias-dos-objetos.md
- `bodysolid-pcco90x`: Body-Solid, manual do Powerline PCCO90X Cable Crossover (PDF); https://cdn.shopify.com/s/files/1/0941/2604/files/PCCO90X-180716.pdf; docs/revisoes/animacao-nova/pesquisa/10-fontes-das-medidas-provisorias-dos-objetos.md (outro fabricante que o da coluna)
- `rogue-estribo`: Rogue, Single Handle Cable Attachment; https://www.roguefitness.com/single-handle-cable-attachment; docs/revisoes/animacao-nova/pesquisa/10-fontes-das-medidas-provisorias-dos-objetos.md
- `rogue-ab3-tubo`: Rogue, Adjustable Bench 3.0 (tubo de 3x3 pol); https://www.roguefitness.com/rogue-adjustable-bench-3-0; docs/revisoes/animacao-nova/pesquisa/10-fontes-das-medidas-provisorias-dos-objetos.md
- `desenho`: Escolha de desenho, sem medida de fabricante: quantidade ou detalhe que não muda a medida do objeto
- `rogue-tubo`: Rogue, Tube Bands; https://www.roguefitness.com/rogue-tube-bands; lido em docs/revisoes/animacao-nova/pesquisa/11-medidas-do-elastico.md (página lida por resumo automático)
- `workoutz-tubo`: Workoutz, Resistance Exercise Tubes; diâmetro interno e parede por nível; docs/revisoes/animacao-nova/pesquisa/11-medidas-do-elastico.md (página lida por resumo automático; o diâmetro de fora é conta: interno + 2 × parede)
- `theraband-manual`: TheraBand (Hygenic), manual de uso (PDF, cópia de terceiro); docs/revisoes/animacao-nova/pesquisa/11-medidas-do-elastico.md
- `rogue-ckb`: Rogue, Competition Kettlebells (o mesmo tamanho para todos os pesos, de 8 a 48 kg); https://www.roguefitness.com/rogue-competition-kettlebells; lido em docs/revisoes/animacao-nova/pesquisa/04-objetos.md, seção 6 (página lida por resumo automático)
- `cubro-metod`: Cubro, IKEA METOD structures catalogue (central de ajuda); https://helpcenter.cubrodesign.com/en/ikea-metod-structures-catalogue; lido em 15/11/2026: "the base units measure 80 cm", "with IKEA's standard 8 cm legs, they reach 88 cm", "the countertop, whose standard measurement is 2 cm", "resulting in a total height of 90 cm, which is the standard in most kitchens", "have a standard depth of 60 cm"
- `gymnic-grayline`: Gymnic (Ledragomma), bolas de exercício: página pública do revendedor Gray Line Medical (https://www.graylinemedical.com/products/gymnic-balls), guia de tamanhos lido em 15/11/2026: "55cm (21"): users 4'8" - 5'3"", "65cm (25"): users 5'3" - 6'0"", "75cm (29"): users 6'0" - 6'7""
- `desenho-bola`: Escolha de desenho da animação da flexão de joelho na bola (lote 2 do motor novo), sem medida de fabricante
- `ikea-stefan`: IKEA, cadeira STEFAN (madeira maciça, quatro pés, sem rodinhas, não dobrável), campo Product size; https://www.ikea.com/us/en/p/stefan-chair-brown-black-00211088/ (lido em 15/11/2026; medidas em polegadas, convertidas a 2,54 cm)
- `rogue-corda`: Rogue Fitness, Tricep Rope Attachment, página do produto; https://www.roguefitness.com/tricep-rope-attachment (lido em 15/11/2026): "28” (including rubber ends)", "Approximately 11.5” once doubled", "Durable Nylon Rope construction"
- `livingfit-corda`: living.fit, Tricep rope for cable machine, página do produto; https://www.living.fit/collections/cable-pull-tricep-grips/products/tricep-rope-for-cable-machine (lido em 15/11/2026): "total length with end caps 26 inches / 660 millimeters", "1 inch / 25 millimeters" (outro fabricante; a Rogue não dá o diâmetro)
- `rubberbanditz-41`: RubberBanditz, 41" Resistance Band; https://www.rubberbanditz.com/41-in-resistance-band/ (lida em 15/11/2026 por resumo automático da página: tabela de tamanhos "Lay Flat Length" 41" em todas as faixas; "Each band is 41" [104 cm] in length"; "Medium [...] 1/2" wide band"; "Each band is can stretch 2.5 times its resting length")
- `seriousSteel-41`: Serious Steel Fitness, 41" Mini Resistance Band #1 (5-35 lbs); https://www.living.fit/products/41-mini-resistance-band-5-35-lbs (lida em 15/11/2026 por resumo automático da página: "4.5mm thick, 5-35 lb, 1/2" wide, 41" long"; "first reading at 6" and last at 2.5x length")
- `nbr9077`: ABNT NBR 9077:2001, Saídas de emergência em edifícios, na cópia pública do Ministério Público do RJ; https://www.mprj.mp.br/documents/20184/74453/nbr_9077_saidas_de_emergencia_em_edificios_2001.pdf (lido em 15/11/2026). 4.7.3.1: "a) ter altura h [...] compreendida entre 16,0 cm e 18,0 cm [...]; b) ter largura b [...] dimensionada pela fórmula de Blondel: 63 cm ≤ (2h + b) ≤ 64 cm". 4.8.2.1: "Os corrimãos devem estar situados entre 80 cm e 92 cm acima do nível do piso, sendo, em escadas, esta medida tomada verticalmente" (da linha que une as quinas dos degraus, 4.8.1.2). 4.8.2.3: "No caso de secção circular, seu diâmetro varia entre 38 mm e 65 mm"
- `titan-hex-10`: Titan Fitness, 10 lb Rubber Hex Dumbbells (par); https://titan.fitness/products/10-lb-rubber-hex-dumbbells (lido em 15/11/2026, página lida por resumo automático): "Handle Length: 5.125-in.", "Overall Length: 11-in.", "Overall Width: 4.5-in.", "Handle Diameter: 28 mm" (outro fabricante que o do resto do halter leve)
- `vert-porta`: Vert, folha de porta lisa de madeira 210 x 80 x 3,5 cm (Telhanorte); https://www.telhanorte.com.br/folha-de-porta-lisa-de-madeira-210x80x3-5cm-primer-vert-1223704/p (lida em 15/11/2026 por resumo automático de busca: "210cm x 80cm x 3,5cm"). A mesma medida aparece nas folhas de porta MGM e Casablanca (MadeiraMadeira) e na Eucatex (35 mm)
- `stroops-ancora`: Stroops, Door Anchor (ANCRFOAM); https://www.vitalitymedical.com/stroops-door-anchor.html (lido em 15/11/2026 por resumo automático da página: "Length: 5 Inches", "Width: 4 Inches", "Height: 1 Inch")
- `lifespan-reebok-step`: Lifespan Fitness, Reebok Step (White & Black), seção de especificações; https://www.lifespanfitness.com.au/products/reebok-step-white-black (lido em 15/11/2026): "Occupancy Size: 102 (L) x 38.5 (W) x 25 (H) (cm)" e as três alturas reguláveis, 15, 20 e 25 cm
- `cartao-step`: Cartão de equipamento do step no app (scripts/desenhos-equipamento/realista/itens.mjs, `step`): dois apoios claros embaixo, a plataforma escura e o tapete de borracha na cor de ação por cima. As proporções das partes vêm daí; o total segue a ficha do fabricante
- `trx-comeco`: TRX, How to Get Started With Your TRX Suspension Trainer; https://www.trxtraining.com/train/how-to-get-started-with-your-trx-suspension-trainer (lido em 15/11/2026): "the bottom of the Suspension Anchor hangs at about six feet from the ground [...] This is the ideal height to perform all TRX exercises"
- `trx-seis`: TRX, Six Procedures (material de treinamento do fabricante, PDF público hospedado pela Truman State University); https://recreation.truman.edu/files/2020/02/TRX-Six-Procedures-PDF.pdf (lido em 15/11/2026), procedimento 3, Heels in: "Adjust the Suspension Trainer so the bottom of each foot cradle is at mid calf length or about eight to 12 inches off the ground"
- `trx-pro4`: TRX, TRX PRO4 System; https://www.trxtraining.com/pages/trx-pro4-system (lido em 15/11/2026): "TRX Suspension Anchor [...] Measuring at 38\" x 2\" x 0.5\"" e "Accommodating anchor heights of 7-9ft"
- `zogics-toalha`: Zogics, 16x30 Hand Towel, 450A Series, 4.5lb (12 Towels); https://www.zogics.com/wholesale-towels/16x30-hand-towel-450a-series-4-5lb (lido em 15/11/2026 por resumo automático da página: "16" x 30"", "4.5 lbs/dozen"). A mesma medida de 16 x 30 pol aparece em várias marcas de toalha de mão (Oxford, Hospeco, Standard Textile)

## Fichas de movimento

Uma por exercício refeito, em `src/engine/novo/dados/movimentos/`. Selos: robusta, moderada, um estudo, consenso (de treinadores) e desenho (escolha de desenho dentro do que a ficha da técnica pede).

### Abdominal na bola suíça (crunch) (`abdominal-bola`)

Ficha da técnica: `docs/pesquisa/animacoes/abdominal-bola.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pelve.frente` | -80 graus | desenho | hoje | a bacia inclina 80° para trás: o glúteo fica na frente da bola, as coxas descem um pouco até os joelhos e o tronco fica quase deitado sobre a bola ("bola sob a parte de baixo das costas") |
| `lombar.base` | 0 graus | desenho | desenho | a lombar na curva de repouso, apoiada no alto da bola |
| `bola.lombar` | 15 cm | desenho | ficha | o meio da lombar (L3) fica 15 cm à frente do centro da bola (para o lado dos pés): a bola sob a parte de baixo das costas, e as costas encostam nela da lombar às escápulas |
| `bola.amassa` | 1 cm | desenho | app | a bola cheia amassa 1 cm sob as costas (a pele entra 1 cm na esfera desenhada); a ficha não dá número |
| `toracica.base` | -10 graus | desenho | ficha | embaixo, a parte de cima das costas estende 10° além da curva de repouso, acompanhando a curva da bola ("o tronco começa um pouco estendido sobre ela") |
| `toracica.topo` | 45 graus | desenho | chao | no topo, a parte de cima das costas enrola 45° a partir da posição de baixo |
| `lombar.topo` | 5 graus | desenho | ficha | no topo, a lombar dobra mais 5° ("aproximando as costelas do quadril"); ela continua na bola |
| `cervical.base` | 5 graus | consenso | ficha | embaixo, o pescoço 5° dobrado a partir do pescoço reto de quem está em pé: a cabeça não cai para trás |
| `cervical.topo` | 8 graus | consenso | chao | no topo, o pescoço acompanha o tronco: 8° a partir do pescoço reto, como no abdominal no chão |
| `cabeca.topo` | 5 graus | consenso | chao | no topo, a cabeça dobra 5° sobre o pescoço (o queixo levemente recolhido) |
| `canela.aFrente` | 0 cm | desenho | desenho | pés no chão, joelhos dobrados (a ficha não dá o ângulo): o pé fica com o tornozelo sob o joelho (a canela em pé), o que serve aos dois corpos |
| `maos.x` | -1 cm | desenho | chao | mãos cruzadas no peito: as mesmas medidas do abdominal no chão |
| `maos.y` | -25 cm | desenho | chao | mãos cruzadas no peito: o punho 25 cm abaixo da base do pescoço |
| `maos.abaixo` | 3 cm | desenho | chao | o punho esquerdo 3 cm abaixo do direito |
| `maos.acima` | 3 cm | desenho | chao | o antebraço esquerdo por cima do direito |
| `maos.poloFora` | 1,5 fração | desenho | chao | para onde o cotovelo aponta: para fora |
| `maos.poloPes` | 1 fração | desenho | chao | para onde o cotovelo aponta: para os pés |
| `maos.poloTras` | 0,3 fração | desenho | chao | para onde o cotovelo aponta: para as costas |
| `erro.pescoco.toracica` | 0,3 fração | desenho | app | erro: as escápulas mal saem da bola (a torácica enrola 30% do certo) |
| `erro.pescoco.cervical` | 30 graus | desenho | app | erro: o pescoço dobra 30° a partir do pescoço reto (junto com erro.pescoco.cabeca) |
| `erro.pescoco.cabeca` | 20 graus | desenho | app | erro: a cabeça dobra mais 20° sobre o pescoço: o queixo vai ao peito |
| `erro.rola.anda` | 14 cm | desenho | app | erro: as pernas empurram e a bola rola 14 cm para o lado da cabeça |
| `erro.rola.tronco` | 20 graus | desenho | app | erro: o tronco sobe 20° em bloco, sem enrolar (a bacia gira com ele) |
| `erro.senta.quadril` | 20 graus | desenho | app | erro: o quadril dobra 15° e o tronco sobe até quase sentar |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima da bola | pausa | 0,5 s | inspira | costas na curva | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Topo · contrai | pausa | 1 s | expira | 1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- a bola sob a parte de baixo das costas, parada; o corpo apoia sem atravessá-la (consenso)
- embaixo, as costas acompanham a curva da bola; no topo, as escápulas fora da bola, sem sentar (consenso)
- o pescoço acompanha o tronco: a cabeça não cai para trás embaixo nem o queixo vai ao peito em cima (consenso)
- mãos cruzadas no peito, sem puxar a cabeça (consenso)

Erros desenhados:

- Puxar o pescoço (vista: lateral): o queixo vai ao peito e as escápulas mal saem da bola
- Rolar a bola (vista: lateral): as pernas empurram, a bola rola para o lado da cabeça e o tronco sobe em bloco, sem enrolar
- Subir até sentar (vista: lateral): o quadril dobra e o tronco sobe até quase sentar; a lombar sai da bola

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/abdominal-bola.md): consenso de treinadores (B.2.6; nsca2021, não verificado); a técnica do abdômen é a do abdominal no chão aprovado
- `app`: Texto do app (src/conteudo/exercicios/abdominal-bola.json), que sai da ficha
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/abdominal-bola.ts): as distâncias que a ficha não dá em número
- `chao`: Ficha de movimento do abdominal no chão do motor novo (dados/movimentos/abdominal-chao.json): a mesma técnica do tronco, do pescoço e das mãos
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Abdominal no chão (crunch) (`abdominal-chao`)

Ficha da técnica: `docs/pesquisa/animacoes/abdominal-chao.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `lombar.base` | 15 graus | desenho | app | deitado, a lombar firme ("lombar apoiada no chão", "abdômen firme" no app): a curva da lombar achata 15° além da de repouso, e a bacia inclina até o glúteo e as costas encostarem juntos no chão |
| `toracica.topo` | 45 graus | desenho | ficha | no topo, a parte de cima da coluna enrola 55° (a torácica) até as escápulas saírem do chão; a ficha pede a escápula fora do chão e não dá ângulo |
| `lombar.topo` | 5 graus | desenho | ficha | no topo, a lombar enrola só mais 5°: a parte de baixo dela e a bacia continuam apoiadas |
| `cervical.topo` | 8 graus | consenso | ficha | no topo, o pescoço acompanha o tronco: 8° de flexão a partir do pescoço reto de quem está em pé (o olhar vai para os joelhos, sem o queixo ir ao peito) |
| `cabeca.topo` | 5 graus | consenso | ficha | no topo, a cabeça dobra 5° sobre o pescoço (o queixo levemente recolhido, sem encostar no peito) |
| `joelho` | 90 graus | desenho | hoje | joelhos dobrados, pés no chão (a ficha e o app não dão o ângulo): o pé fica onde o joelho dobra 90° (o pé a 48 cm da bacia na animação de hoje) |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena, deitado (só posiciona a cena) |
| `maos.x` | -1 cm | desenho | app | mãos cruzadas no peito: o punho direito fica 8 cm para o lado esquerdo do meio do peito (a mão espalmada no peito do outro lado) |
| `maos.y` | -25 cm | desenho | app | o punho direito fica 12 cm abaixo da base do pescoço, ao longo do tórax |
| `maos.abaixo` | 3 cm | desenho | desenho | o punho esquerdo fica 3 cm abaixo do direito |
| `maos.acima` | 3 cm | desenho | desenho | o antebraço esquerdo passa por cima do direito: o punho esquerdo fica 6 cm mais à frente do peito (a espessura do antebraço) |
| `maos.poloFora` | 1,5 fração | desenho | desenho | para onde o cotovelo aponta, no referencial do tórax: o peso da direção para fora (junto com maos.poloPes) |
| `maos.poloPes` | 1 fração | desenho | desenho | para onde o cotovelo aponta: o peso da direção para os pés (os cotovelos junto do corpo) |
| `maos.poloTras` | 0,3 fração | desenho | desenho | para onde o cotovelo aponta: o peso da direção para as costas (deitado, os cotovelos descem ao lado do corpo) |
| `erro.pescoco.toracica` | 0,3 fração | desenho | app | erro: as escápulas mal saem do chão (a torácica enrola 30% do certo) |
| `erro.pescoco.cervical` | 30 graus | desenho | app | erro: o pescoço dobra 30° a partir do pescoço reto (junto com erro.pescoco.cabeca) |
| `erro.pescoco.cabeca` | 20 graus | desenho | app | erro: a cabeça dobra mais 20° sobre o pescoço: o queixo vai ao peito |
| `erro.lombar.quadril` | 30 graus | desenho | app | erro: o quadril dobra 30° (a bacia gira em volta do quadril e a lombar sai do chão: vira um abdominal completo) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Deitado | pausa | 0,5 s | inspira | lombar no chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Topo · contrai | pausa | 1 s | expira | 1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- enrola a parte de cima da coluna até tirar as escápulas do chão (consenso)
- a lombar e a bacia continuam apoiadas no chão (consenso)
- o pescoço acompanha o tronco, sem o queixo ir ao peito (consenso)
- mãos cruzadas no peito, sem puxar a cabeça (consenso)

Erros desenhados:

- Puxar o pescoço (vista: lateral): o queixo vai ao peito e as escápulas mal saem do chão
- Subir a lombar (vista: lateral): o quadril dobra e a lombar sai do chão: vira um abdominal completo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/abdominal-chao.md): consenso de treinadores (nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/abdominal-chao.json), que sai da ficha
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/abdominal-chao.ts): as distâncias que a ficha não dá em número
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Abdominal invertido no chão (`abdominal-invertido`)

Ficha da técnica: `docs/pesquisa/animacoes/abdominal-invertido.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `lombar.base` | 15 graus | desenho | desenho | deitado, a lombar firme: a curva da lombar achata 15° além da de repouso (a mesma base do abdominal no chão), e a bacia inclina até o glúteo e as costas encostarem juntos no chão |
| `pelve.enrola` | 40 graus | desenho | hoje | no alto, a pelve enrola 40° em direção ao peito (a lombar dobra o mesmo tanto e o tórax fica deitado): o quadril sai do chão (37° na animação de hoje, com o quadril 13 cm acima do chão) |
| `joelho` | 90 graus | consenso | ficha | joelhos dobrados a ~90°, mantidos no ciclo |
| `coxa.vertical` | 0 graus | consenso | ficha | embaixo, as coxas na vertical (0° da vertical); daí em diante elas andam presas à bacia |
| `pe.plantar` | 55 graus | desenho | desenho | os pés soltos, com a ponta 55° esticada além do ângulo reto com a canela |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `maos.alcance` | 0,95 fração | desenho | hoje | braços no chão ao lado do corpo, palmas para baixo: o punho fica, na direção dos pés, a 95% do braço mais o antebraço a partir do ombro (como na ponte de glúteo) |
| `maos.paraFora` | 10 cm | desenho | hoje | os braços um pouco abertos (o braço não cobre o tronco de lado) |
| `erro.embalo.pelve` | 1,3 fração | desenho | app | erro: o embalo leva a pelve além do certo (30% a mais de giro) |
| `erro.embalo.quadril` | 15 graus | desenho | app | erro: as pernas são jogadas para a cabeça: o quadril dobra mais 15° |
| `erro.maos.alcance` | 0,6 fração | desenho | app | erro: as mãos empurram o chão perto do quadril, com os cotovelos dobrados (o punho a 60% do braço mais o antebraço a partir do ombro) |
| `erro.lombar.quadril` | 25 graus | desenho | app | erro: na descida, as pernas vão longe demais: as coxas passam 25° da vertical, para longe da cabeça |
| `erro.lombar.lombar` | -25 graus | desenho | app | erro: a lombar arqueia 25° e sai do chão |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,5 s | inspira | coxas na vertical | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| No alto · contrai | pausa | 1 s | expira | 1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `mao.R`, `mao.L`.

Regras que a conferência mede:

- as costas de cima, os ombros e a cabeça ficam no chão (consenso)
- enrola a pelve em direção ao peito, tirando o quadril do chão; embaixo, o quadril no chão (consenso)
- embaixo, coxas na vertical; joelhos a ~90° o ciclo inteiro (consenso)

Erros desenhados:

- Jogar as pernas (vista: lateral): o embalo leva as pernas para a cabeça e o quadril sobe além do certo
- Empurrar com as mãos (vista: lateral): as mãos apertam o chão perto do quadril, com os cotovelos dobrados: os braços fazem a força
- Arquear a lombar na descida (vista: lateral): as pernas descem além da vertical e a lombar arqueia, fora do chão

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/abdominal-invertido.md): consenso (Pursuit Physical Therapy, vídeo; escamilla2006b)
- `app`: Texto do app (src/conteudo/exercicios/abdominal-invertido.json), que sai da ficha
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/abdominal-invertido.ts): as distâncias que a ficha não dá em número
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Abertura em T deitado de bruços, sem carga (`abertura-t-deitado`)

Ficha da técnica: `docs/pesquisa/animacoes/abertura-t-deitado.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `lombar` | 10 graus | desenho | desenho | de bruços, a lombar dobra 10° além da curva de repouso (o peito e a frente da bacia encostam juntos), como na flexão de joelho com elástico |
| `pe.plantar` | 60 graus | desenho | desenho | os pés soltos, quase em linha com a canela (o peito do pé virado para o chão); a ficha não fala do pé |
| `pe.folga` | 0,3 cm | desenho | desenho | o peito do pé encosta no chão (0,3 cm): o joelho dobra o pouco que isso pede |
| `maos.folgaEmbaixo` | 3 cm | desenho | hoje | embaixo, as mãos quase tocam o chão: o ponto mais baixo da mão fica 3 cm acima dele (a mão sai a 4 cm do chão na animação de hoje) |
| `bracos.topo` | 10 graus | desenho | app | no alto, os braços sobem até 10° acima da linha dos ombros ("na altura do corpo ou um pouco acima") |
| `bracos.abertura` | 90 graus | um estudo | ficha | braços em T: a 90° do corpo, vistos de cima |
| `cotovelo` | 5 graus | consenso | app | cotovelos estendidos (5° de folga, sem travar) |
| `erro.cabeca.graus` | 35 graus | desenho | app | erro: a cabeça dobra 35° para trás sobre o pescoço e a testa sai da toalha |
| `erro.encolher.elev` | 20 graus | desenho | app | erro: os ombros sobem para as orelhas (a clavícula sobe 20° além do certo) |
| `erro.embalo.topo` | 30 graus | desenho | app | erro: os braços são jogados até 30° acima da linha dos ombros |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,5 s | inspira | mãos quase no chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| No alto · segura | pausa | 1 s | firme | 1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pelve`.

Regras que a conferência mede:

- de bruços, testa na toalha, sem levantar a cabeça (um estudo)
- braços em T, cotovelos estendidos (um estudo)
- embaixo, as mãos quase tocam o chão; em cima, os braços na altura do corpo ou um pouco acima (consenso)
- sem encolher os ombros (consenso)

Erros desenhados:

- Levantar a cabeça (vista: quinaTras): o pescoço dobra para trás e a testa sai da toalha
- Encolher os ombros (vista: quinaTras): os ombros sobem para as orelhas
- Jogar os braços (vista: frontal): os braços são lançados alto demais

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/abertura-t-deitado.md): posição (um estudo: lim2015, yu2024); movimento (consenso: TSAOG, vídeo)
- `app`: Texto do app (src/conteudo/exercicios/abertura-t-deitado.json), que sai da ficha
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/abertura-t-deitado.ts): as distâncias que a ficha não dá em número
- `correcao`: Correções já feitas em 10/11/2026 (docs/revisoes/animacao-nova/correcoes-ja-feitas.md, linhas da abertura-t-deitado): abre de frente, a vista de cima mostra o corpo deitado
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Afundo com kettlebell no peito (`afundo-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/afundo-kettlebell.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 39,5 cm | desenho | hoje | passo largo: quanto o tornozelo do pé da frente fica à frente do quadril (na animação aprovada de hoje: 39,5 cm) |
| `peDeTras.atrasDoQuadril` | 47 cm | desenho | hoje | passo largo: quanto a ponta do pé de trás (a bola do pé) fica atrás do quadril (na animação aprovada de hoje, o tornozelo de trás fica 40,5 cm atrás, com o calcanhar levantado) |
| `peDeTras.calcanhar` | 66 graus | desenho | desenho | pé de trás na ponta: quanto o calcanhar sobe; a ficha não dá número |
| `joelho.cima` | 14 graus | consenso | ficha | em cima: a perna da frente quase estendida, sem travar o joelho (como no afundo com o peso do corpo) |
| `joelhoDeTras.aoChao` | 4 cm | consenso | ficha | embaixo: o joelho de trás fica a poucos centímetros do chão (da pele do joelho ao chão) |
| `tronco` | 4 graus | consenso | ficha | tronco quase vertical |
| `erro.valgo.joelho` | 6 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro |
| `erro.tronco` | 36 graus | desenho | desenho | erro: o tronco cai para a frente |
| `erro.raso.fracao` | 0,4 fração | desenho | hoje | erro: desce só 40% do caminho (como na animação de hoje) |
| `maos.abaixoDeC7` | 14 cm | desenho | desenho | kettlebell junto ao peito: altura das mãos, na alça, abaixo da base do pescoço (no alto do peito); a ficha não dá número |
| `kettlebell.folgaNoPeito` | 0,8 cm | desenho | desenho | a bola encosta no peito: folga entre a bola e a pele |
| `carga` | 12 kg | desenho | objetos | o kettlebell desenhado (12 kg); entra no equilíbrio |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,3 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso)
- embaixo, o joelho de trás fica a poucos centímetros do chão (consenso)
- o tronco fica quase vertical (consenso)
- o pé da frente fica inteiro no chão (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente sai da linha do pé, para dentro
- Tronco cai para a frente (vista: lateral): o kettlebell puxa o peito: o tronco inclina para a frente em vez de ficar quase vertical
- Descer pouco (vista: lateral): desce só 40% do caminho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/afundo-kettlebell.md): mesma pose do afundo com o peso do corpo e mesma pegada do goblet com kettlebell; consenso de treinadores
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/afundo-kettlebell.ts): o tamanho do passo e a posição do quadril entre os pés, que a ficha não dá em número
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Afundo estático com o peso do corpo (`afundo-peso-corpo`)

Ficha da técnica: `docs/pesquisa/animacoes/afundo-peso-corpo.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 39,5 cm | desenho | hoje | passo largo: quanto o tornozelo do pé da frente fica à frente do quadril (na animação aprovada de hoje: 39,5 cm) |
| `peDeTras.atrasDoQuadril` | 47 cm | desenho | hoje | passo largo: quanto a ponta do pé de trás (a bola do pé) fica atrás do quadril (na animação aprovada de hoje, o tornozelo de trás fica 40,5 cm atrás, com o calcanhar levantado) |
| `peDeTras.calcanhar` | 66 graus | desenho | desenho | pé de trás na ponta: quanto o calcanhar sobe; a ficha não dá número |
| `joelho.cima` | 14 graus | consenso | ficha | em cima: a perna da frente quase estendida, sem travar o joelho |
| `joelhoDeTras.aoChao` | 4 cm | consenso | ficha | embaixo: o joelho de trás fica a poucos centímetros do chão (da pele do joelho ao chão) |
| `tronco` | 4 graus | consenso | ficha | tronco quase vertical |
| `maos.naCintura.acima` | 11 cm | desenho | desenho | mãos na cintura: altura da mão acima do centro do quadril |
| `erro.valgo.joelho` | 6 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro |
| `erro.tronco` | 36 graus | desenho | desenho | erro: o tronco cai para a frente |
| `erro.raso.fracao` | 0,4 fração | desenho | hoje | erro: desce só 40% do caminho (como na animação de hoje) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,3 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso)
- embaixo, o joelho de trás fica a poucos centímetros do chão (consenso)
- o tronco fica quase vertical (consenso)
- o pé da frente fica inteiro no chão (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente sai da linha do pé, para dentro
- Tronco cai para a frente (vista: lateral): o tronco inclina para a frente em vez de ficar quase vertical
- Descer pouco (vista: lateral): desce só 40% do caminho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/afundo-peso-corpo.md): mesma pose do afundo aprovado; consenso de treinadores (nsca2021, não verificado)
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/afundo-peso-corpo.ts): o tamanho do passo e a posição do quadril entre os pés, que a ficha não dá em número
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Afundo para trás com o peso do corpo (`afundo-tras-peso-corpo`)

Ficha da técnica: `docs/pesquisa/animacoes/afundo-tras-peso-corpo.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 39,5 cm | desenho | hoje | passo largo: quanto o tornozelo do pé da frente fica à frente do quadril (na animação aprovada de hoje: 39,5 cm) |
| `peDeTras.atrasDoQuadril` | 47 cm | desenho | hoje | passo largo: quanto a ponta do pé de trás (a bola do pé) fica atrás do quadril (na animação aprovada de hoje, o tornozelo de trás fica 40,5 cm atrás, com o calcanhar levantado) |
| `peDeTras.calcanhar` | 66 graus | desenho | desenho | pé de trás na ponta: quanto o calcanhar sobe; a ficha não dá número |
| `joelho.cima` | 8 graus | consenso | ficha | em pé: joelhos quase estendidos, sem travar |
| `joelhoDeTras.aoChao` | 4 cm | consenso | ficha | embaixo: o joelho de trás fica a poucos centímetros do chão (da pele do joelho ao chão) |
| `tronco` | 4 graus | consenso | ficha | tronco quase vertical |
| `maos.naCintura.acima` | 11 cm | desenho | desenho | mãos na cintura: altura da mão acima do centro do quadril |
| `erro.valgo.joelho` | 6 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro |
| `erro.raso.fracao` | 0,4 fração | desenho | hoje | erro: desce só 40% do caminho (como na animação de hoje) |
| `passo.quandoApoia` | 0,6 fração | desenho | desenho | em que ponto do caminho (0 = em pé, 1 = embaixo) a ponta do pé de trás apoia no chão |
| `passo.altura` | 10 cm | desenho | desenho | altura máxima da ponta do pé de trás no ar durante o passo (na animação de hoje o tornozelo passa a 22 cm; a ficha não dá número) |
| `erro.tras.quadril` | 13 cm | desenho | hoje | erro: quanto o quadril fica mais para trás, perto do pé de trás (13 cm na animação de hoje) |
| `erro.tras.tronco` | -4 graus | desenho | hoje | erro: o tronco recua (4 graus para trás na animação de hoje) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | pés juntos, firme o abdômen | consenso |
| Passo e descida · excêntrica | exc | 2,6 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | peso no pé da frente | consenso |
| Volta · concêntrica | conc | 1,5 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- o passo para trás é largo (consenso)
- embaixo, o joelho de trás quase toca o chão (consenso)
- o tronco fica quase vertical (consenso)
- embaixo, o peso fica no pé da frente (consenso)
- o pé da frente não sai do lugar (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente cai para dentro na descida
- Descer pouco (vista: lateral): desce só 40% do caminho do afundo
- Empurrar com o pé de trás (vista: lateral): o quadril fica para trás, perto do pé de trás, e o tronco recua: a perna de trás faz a força

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/afundo-tras-peso-corpo.md): consenso (Kyle Sela e Hinge Health, vídeos não conferidos por dentro); a posição do afundo é a do afundo com o peso do corpo aprovado
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/afundo-tras-peso-corpo.ts) e a conferência dela (docs/revisoes/r5-anim/conferencia/afundo-tras-peso-corpo.md): o tamanho do passo, a altura do pé no ar e os erros
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Afundo estático com halteres (`afundo`)

Ficha da técnica: `docs/pesquisa/animacoes/afundo.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 39,5 cm | desenho | hoje | passo largo: quanto o tornozelo do pé da frente fica à frente do quadril (na animação aprovada de hoje: 39,5 cm) |
| `peDeTras.atrasDoQuadril` | 47 cm | desenho | hoje | passo largo: quanto a ponta do pé de trás (a bola do pé) fica atrás do quadril (na animação aprovada de hoje, o tornozelo de trás fica 40,5 cm atrás, com o calcanhar levantado) |
| `peDeTras.calcanhar` | 66 graus | desenho | desenho | pé de trás na ponta: quanto o calcanhar sobe; a ficha não dá número |
| `joelho.cima` | 14 graus | consenso | guia | em cima: os joelhos quase estendidos; a ficha manda parar um pouco antes de estender totalmente |
| `joelhoDeTras.aoChao` | 4 cm | consenso | guia | embaixo: o joelho de trás fica a poucos centímetros do chão (da pele do joelho ao chão) |
| `tronco` | 4 graus | consenso | guia | tronco quase vertical |
| `erro.valgo.joelho` | 6 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro |
| `erro.tronco` | 36 graus | desenho | desenho | erro: o tronco cai para a frente |
| `erro.raso.fracao` | 0,4 fração | desenho | hoje | erro: desce só 40% do caminho (como na animação de hoje) |
| `peDeTras.calcanhar.cima` | 50 graus | desenho | desenho | em cima, o calcanhar de trás fica mais baixo (o pé menos na ponta), para os dois joelhos ficarem quase estendidos como a ficha pede |
| `bracos.paraFora` | 7 graus | desenho | desenho | braços pendendo ao lado do corpo: quanto abrem para o halter não bater na coxa |
| `carga` | 11,3 kg | desenho | objetos | cada halter desenhado (25 lb); entram no equilíbrio |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,3 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- em cima, os dois joelhos ficam quase estendidos (consenso)
- a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso)
- embaixo, o joelho de trás fica a poucos centímetros do chão (consenso)
- embaixo, a coxa da frente fica perto da horizontal (consenso)
- o tronco fica quase vertical (consenso)
- o pé da frente fica inteiro no chão (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente sai da linha do pé, para dentro
- Tronco cai para a frente (vista: lateral): o tronco inclina para a frente em vez de ficar quase vertical
- Descer pouco (vista: lateral): desce só 40% do caminho

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/afundo.md: consenso de treinadores
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/afundo.ts): o tamanho do passo e a posição do quadril entre os pés, que a ficha não dá em número
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Agachamento com elástico (`agachamento-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/agachamento-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.cima` | 8 graus | consenso | ficha | em cima: joelhos quase estendidos, sem travar |
| `joelho.baixo` | 126 graus | consenso | ficha | embaixo: quadril na altura do joelho ou abaixo, com o calcanhar apoiado; a média de flexão do joelho é 140 (cdc) |
| `tronco.cima` | 3 graus | consenso | ficha | em pé |
| `tronco.baixo` | 33 graus | desenho | desenho | inclinação do peito embaixo, com a lombar neutra: como no agachamento com o peso do corpo (33), porque sem a anilha sob o calcanhar o tornozelo limita mais a descida; a ficha não dá número |
| `pes.meiaDistancia` | 19 cm | consenso | ficha | pés um pouco mais abertos que o quadril (meia largura do quadril: 16,2) |
| `pes.paraFora` | 15 graus | consenso | ficha | pontas levemente para fora |
| `erro.raso.joelho` | 72 graus | desenho | desenho | erro: parar alto |
| `erro.valgo.joelho` | 9 cm | desenho | desenho | erro: quanto cada joelho cai para dentro da linha do pé |
| `elastico.folgaNoJoelho` | 1,5 cm | desenho | desenho | com o joelho dobrado, o tubo passa por fora do joelho: folga entre o tubo e a pele |
| `maos.aFrenteDoOmbro` | 13 cm | desenho | desenho | cada mão segura o pegador na frente do ombro: quanto a pegada fica à frente do centro do ombro; a ficha não dá número |
| `maos.acimaDoOmbro` | 2 cm | desenho | desenho | altura da pegada em relação ao centro do ombro |
| `erro.lombar.tronco` | 45 graus | desenho | desenho | erro: o peito cai (inclinação do peito embaixo; no certo são 27) |
| `erro.lombar.lombar` | 35 graus | desenho | desenho | erro: a lombar arredonda: a bacia gira 17 graus para trás em relação ao certo e a lombar dobra o que falta até o peito |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | elástico mais esticado | consenso |
| Descida · excêntrica | exc | 2,4 s | firme | ~2–3 s | consenso |
| Embaixo · sem quicar | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- embaixo, o quadril fica na altura do joelho ou abaixo (consenso)
- o joelho segue a direção da ponta do pé (consenso)
- o calcanhar fica apoiado: o peso no meio do pé (consenso)
- a lombar não arredonda (consenso)

Erros desenhados:

- Joelhos para dentro (vista: frontal): os joelhos saem da linha dos pés, para dentro
- Tronco cai e a lombar arredonda (vista: lateral): o tronco inclina demais e a lombar flexiona
- Descer pouco (vista: lateral): para com o joelho a 72° em vez de 126°

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/agachamento-elastico.md): mesma posição do goblet aprovado; consenso de treinadores (nsca2021, não verificado)
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `equilibrio`: Em pé, parado, a projeção do centro de massa cai dentro do apoio dos pés (mecânica); a ficha pede o calcanhar apoiado
- `objetos`: src/engine/novo/dados/objetos.json
- `fisica`: Física do elástico: a força cresce com o quanto ele estica (como a ficha da técnica registra); a borracha não muda de volume, então o tubo afina ao esticar
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Agachamento com o peso do corpo (`agachamento-peso-corpo`)

Ficha da técnica: `docs/pesquisa/animacoes/agachamento-peso-corpo.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.cima` | 8 graus | consenso | ficha | em cima: joelhos quase estendidos, sem travar |
| `joelho.baixo` | 126 graus | moderada | amplitude | embaixo: agachamento completo, com o quadril abaixo da altura do joelho (decisão do Gustavo em 04/11/2026); a média de flexão do joelho é 140 (cdc) |
| `tronco.cima` | 3 graus | consenso | ficha | em pé |
| `tronco.baixo` | 33 graus | desenho | desenho | inclinação do peito embaixo: a ficha pede um pouco mais que no goblet (27), com a lombar neutra, e não dá número |
| `pes.meiaDistancia` | 19 cm | consenso | ficha | pés um pouco mais abertos que o quadril (meia largura do quadril: 16,2) |
| `pes.paraFora` | 15 graus | consenso | ficha | pontas levemente para fora |
| `bracos.paraDentro` | 7 graus | desenho | desenho | braços estendidos à frente, na altura dos ombros, com as mãos se aproximando: quanto cada braço fecha para o meio; a ficha não dá número |
| `cotovelo` | 6 graus | desenho | desenho | braços estendidos, sem travar o cotovelo |
| `erro.raso.joelho` | 72 graus | desenho | desenho | erro: parar alto |
| `erro.valgo.joelho` | 9 cm | desenho | desenho | erro: quanto cada joelho cai para dentro da linha do pé |
| `erro.calcanhar.sobe` | 14 graus | desenho | desenho | erro: quanto o pé gira na bola, tirando o calcanhar do chão (cerca de 5 cm, como na folha aprovada em 04/11/2026) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,4 s | firme | ~2–3 s | consenso |
| Embaixo · sem quicar | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- embaixo, o quadril fica abaixo da altura do joelho (moderada)
- o joelho segue a direção da ponta do pé (consenso)
- o calcanhar fica apoiado: o peso no meio do pé (consenso)
- a lombar não arredonda (consenso)

Erros desenhados:

- Joelhos para dentro (vista: frontal): os joelhos saem da linha dos pés, para dentro
- Calcanhar sai do chão (vista: lateral): o pé gira na bola e o peso vai para a ponta do pé
- Descer pouco (vista: lateral): para com o joelho a 72° em vez de 126°

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/agachamento-peso-corpo.md): mesma base do goblet aprovado; consenso de treinadores (nsca2021, não verificado)
- `amplitude`: Amplitude completa: pallares2021 e kassiano2023a (moderada: amplitude completa igual ou melhor que a parcial na hipertrofia); kubo2019 (um estudo: agachar fundo cresceu mais glúteo e adutores), como registrado na ficha da técnica
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `equilibrio`: Em pé, parado, a projeção do centro de massa cai dentro do apoio dos pés (mecânica); a ficha pede o calcanhar apoiado
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Búlgaro com o peso do corpo (`bulgaro-peso-corpo`)

Ficha da técnica: `docs/pesquisa/animacoes/bulgaro-peso-corpo.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 42,5 cm | desenho | aprovado | pé da frente longe da cadeira: quanto o tornozelo da frente fica à frente do quadril (o mesmo do búlgaro aprovado: 42,5 cm) |
| `peDeTras.tornozeloAtrasDoQuadril` | 43,5 cm | desenho | aprovado | quanto o tornozelo do pé de trás, apoiado no assento, fica atrás do quadril (o mesmo do búlgaro aprovado: 43,5 cm) |
| `peDeTras.tornozeloDaBorda` | 3 cm | desenho | aprovado | quanto o tornozelo de trás fica para dentro da borda do assento: o peito do pé inteiro apoia (3 cm, como no banco do búlgaro aprovado) |
| `joelho.cima` | 14 graus | consenso | ficha | em cima: joelho da frente quase estendido; a ficha manda parar antes de travar |
| `joelhoDeTras.aoChao` | 5 cm | consenso | ficha | embaixo: o joelho de trás fica a poucos centímetros do chão (da pele do joelho ao chão); 5 cm e não os 4 do búlgaro aprovado porque o assento da cadeira fica 1,6 cm mais alto que o banco: assim o quadril para na mesma altura do aprovado e a coxa da frente não passa de 15 graus abaixo da horizontal |
| `tronco` | 15 graus | consenso | ficha | tronco levemente inclinado à frente (a ficha não dá número; o mesmo do búlgaro aprovado) |
| `maos.naCintura.acima` | 11 cm | desenho | desenho | mãos na cintura: altura da mão acima do centro do quadril (a mesma do afundo com o peso do corpo) |
| `erro.valgo.joelho` | 5 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro (o mesmo do búlgaro aprovado) |
| `erro.perto.maisPerto` | 18 cm | desenho | hoje | erro: quanto o pé da frente fica mais perto da cadeira (18 cm na animação de hoje) |
| `erro.perto.calcanhar` | 34 graus | desenho | hoje | erro: quanto o calcanhar da frente sobe embaixo (34 graus a mais na animação de hoje) |
| `erro.raso.fracao` | 0,47 fração | desenho | hoje | erro: desce só 47% do caminho (como na animação de hoje) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,5 s | inspira | firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,3 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- em cima, o joelho da frente fica quase estendido (consenso)
- a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso)
- embaixo, o joelho de trás fica a poucos centímetros do chão (consenso)
- embaixo, a coxa da frente fica perto da horizontal ou um pouco abaixo (consenso)
- o tronco fica levemente inclinado à frente (consenso)
- o pé da frente fica inteiro no chão, com o calcanhar apoiado (consenso)
- o peito do pé de trás fica apoiado no assento da cadeira, com o cadarço para baixo (consenso)
- o peso fica na perna da frente (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente sai da linha do pé, para dentro
- Pé da frente perto da cadeira (vista: lateral): o pé da frente fica 18 cm mais perto da cadeira e o calcanhar sobe na descida
- Descer pouco (vista: lateral): desce só 47% do caminho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/bulgaro-peso-corpo.md): a mesma pose do búlgaro aprovado, sem o halter e sem a coluna, com o pé de trás no assento de uma cadeira firme; consenso de treinadores
- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/bulgaro.md, de onde a ficha do búlgaro com o peso do corpo tira a pose: consenso de treinadores
- `aprovado`: Búlgaro com apoio do motor novo, aprovado pelo Gustavo em 15/11/2026 (src/engine/novo/dados/movimentos/bulgaro.json): as distâncias dos pés ao quadril, tiradas da animação aprovada de hoje
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/bulgaro-peso-corpo.ts): os erros, que a ficha não dá em número
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Búlgaro com o pé de trás na suspensão (`bulgaro-suspensao`)

Ficha da técnica: `docs/pesquisa/animacoes/bulgaro-suspensao.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 42,5 cm | desenho | aprovado | pé da frente longe da alça: quanto o tornozelo da frente fica à frente do quadril (o mesmo do búlgaro aprovado: 42,5 cm) |
| `peDeTras.tornozeloAtrasDoQuadril` | 43,5 cm | desenho | aprovado | em cima, quanto o tornozelo do pé de trás, na alça, fica atrás do quadril (o mesmo do búlgaro aprovado: 43,5 cm) |
| `fita.alcaAFrenteDaAncora` | 4 cm | desenho | desenho | em cima, quanto o fundo do berço fica à frente da vertical da âncora: a fita quase a prumo, o pé pendurado; como ele anda 8 cm para trás, embaixo fica 4 cm atrás dela |
| `fita.peVaiParaTras` | 8 cm | desenho | hoje | quanto o fundo do berço (e o pé de trás) anda para trás no arco da fita, de cima até embaixo (8 cm na animação de hoje) |
| `fita.contatoAteOTornozelo` | 10 cm | desenho | desenho | o peito do pé apoia no berço perto do tornozelo, não nos dedos: o ponto de apoio é o mais baixo do pé a até 10 cm do tornozelo (visto de lado) |
| `fita.flexaoPlantarEmCima` | 52 graus | desenho | aprovado | em cima, o pé gira no berço até o tornozelo de trás ficar esticado como no búlgaro aprovado (52°, abaixo da média de 57°); na descida ele volta à inclinação do banco |
| `fita.bercoFolga` | 1,5 cm | desenho | desenho | folga do berço: as tiras laterais passam a esta distância de cada lado do pé, e se juntam a esta distância acima do ponto mais alto do pé e do tornozelo |
| `fita.giroDaFita` | 45 graus | desenho | desenho | quanto a fita gira em volta do comprimento: a 45°, a face larga aparece de lado e de frente (a fita real torce um pouco) |
| `joelho.cima` | 14 graus | consenso | guia | em cima: joelho da frente quase estendido; a ficha manda parar antes de travar |
| `joelhoDeTras.aoChao` | 4 cm | consenso | guia | embaixo: o joelho de trás vai em direção ao chão e fica a poucos centímetros dele (da pele do joelho ao chão), como no búlgaro aprovado |
| `tronco` | 15 graus | consenso | ficha | tronco levemente inclinado à frente (a ficha não dá número; o mesmo do búlgaro aprovado) |
| `maos.naCintura.acima` | 11 cm | desenho | desenho | mãos na cintura: altura da mão acima do centro do quadril (a mesma do afundo com o peso do corpo) |
| `erro.valgo.joelho` | 5 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro (o mesmo do búlgaro aprovado) |
| `erro.empurra.peMaisAtras` | 14 cm | desenho | hoje | erro: a perna de trás estica e empurra a alça 14 cm mais para trás (como na animação de hoje) |
| `erro.empurra.quadrilAtras` | 9 cm | desenho | hoje | erro: o quadril vai 9 cm para trás (como na animação de hoje) |
| `erro.empurra.fracao` | 0,8 fração | desenho | hoje | erro: o quadril desce só 80% do caminho (na animação de hoje, para 6 cm acima do certo) |
| `erro.raso.fracao` | 0,47 fração | desenho | hoje | erro: desce só 47% do caminho (como na animação de hoje) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,5 s | inspira | firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,3 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- em cima, o joelho da frente fica quase estendido (consenso)
- a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso)
- embaixo, o joelho de trás fica a poucos centímetros do chão (consenso)
- embaixo, a coxa da frente fica perto da horizontal (consenso)
- o tronco fica levemente inclinado à frente (consenso)
- o pé da frente fica inteiro no chão, com o calcanhar apoiado (consenso)
- o peso fica na perna da frente (consenso)
- o peito do pé de trás fica no berço da alça, com o cadarço para baixo (consenso)
- a alça fica na altura do meio da canela (consenso)
- na descida, o pé de trás vai para trás com a fita, que não estica (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente sai da linha do pé, para dentro
- Empurrar com o pé de trás (vista: lateral): a perna de trás estica e empurra a alça para trás; o quadril recua e desce menos
- Descer pouco (vista: lateral): desce só 47% do caminho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/bulgaro-suspensao.md): de costas para a âncora, peito do pé de trás na alça à altura do meio da canela; a mesma lógica do búlgaro com o peso do corpo; consenso de treinadores (nsca2021, não verificado)
- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/bulgaro.md, de onde vem a pose dos búlgaros: consenso de treinadores
- `aprovado`: Búlgaro com apoio do motor novo, aprovado pelo Gustavo em 15/11/2026 (src/engine/novo/dados/movimentos/bulgaro.json): as distâncias dos pés ao quadril
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/bulgaro-suspensao.ts) e a conferência dela (docs/revisoes/catalogo/conferencia/suspensao.md): quanto o pé de trás anda com a fita e os erros, que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos/suspensao.json: a altura da âncora e a do berço no meio da canela, das páginas do fabricante
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Agachamento búlgaro com apoio (`bulgaro`)

Ficha da técnica: `docs/pesquisa/animacoes/bulgaro.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, como trilhos (os centros do quadril ficam a 8,35 cm do meio) |
| `peDaFrente.aFrenteDoQuadril` | 42,5 cm | desenho | hoje | pé da frente longe do banco: quanto o tornozelo da frente fica à frente do quadril (na animação aprovada de hoje: 42,5 cm) |
| `peDeTras.tornozeloAtrasDoQuadril` | 43,5 cm | desenho | hoje | quanto o tornozelo do pé de trás, apoiado no banco, fica atrás do quadril (na animação aprovada de hoje: 43,5 cm) |
| `peDeTras.tornozeloDaBorda` | 3 cm | desenho | hoje | quanto o tornozelo de trás fica para dentro da borda do banco: o peito do pé inteiro apoia no estofado (3 cm na animação de hoje) |
| `joelho.cima` | 14 graus | consenso | guia | em cima: joelho da frente quase estendido; a ficha manda parar antes de travar |
| `joelhoDeTras.aoChao` | 4 cm | consenso | guia | embaixo: o joelho de trás fica a poucos centímetros do chão (da pele do joelho ao chão) |
| `tronco` | 15 graus | consenso | guia | tronco levemente inclinado à frente (a ficha não dá número; na animação de hoje, 14 a 16 graus) |
| `apoio.maoAoLado` | 47 cm | desenho | hoje | mão de apoio na coluna da estação: distância da mão ao meio do corpo (47 cm na animação de hoje) |
| `apoio.maoAltura` | 100 cm | desenho | hoje | mão de apoio: altura da mão na coluna (100 cm na animação de hoje) |
| `apoio.maoAFrenteDoQuadril` | 12,5 cm | desenho | hoje | mão de apoio: quanto fica à frente do quadril (12,5 cm na animação de hoje) |
| `bracos.paraFora` | 7 graus | desenho | desenho | braço do halter pendendo ao lado do corpo: quanto abre para o halter não bater na coxa |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb); entra no equilíbrio |
| `erro.valgo.joelho` | 5 cm | desenho | desenho | erro: quanto o joelho da frente cai para dentro |
| `erro.perto.maisPerto` | 19 cm | desenho | hoje | erro: quanto o pé da frente fica mais perto do banco (19 cm na animação de hoje) |
| `erro.perto.calcanhar` | 34 graus | desenho | hoje | erro: quanto o calcanhar da frente sobe embaixo (34 graus a mais na animação de hoje) |
| `erro.raso.fracao` | 0,47 fração | desenho | hoje | erro: desce só 47% do caminho (como na animação de hoje) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,5 s | inspira | firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,3 s | firme | ~2–3 s | consenso |
| Embaixo | pausa | 0,4 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- em cima, o joelho da frente fica quase estendido (consenso)
- a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso)
- embaixo, o joelho de trás fica a poucos centímetros do chão (consenso)
- embaixo, a coxa da frente fica perto da horizontal ou um pouco abaixo (consenso)
- o tronco fica levemente inclinado à frente (consenso)
- o pé da frente fica inteiro no chão, com o calcanhar apoiado (consenso)
- o peito do pé de trás fica apoiado no banco, com o cadarço para baixo (consenso)
- o peso fica na perna da frente (consenso)
- a mão livre segura a coluna da estação só para equilibrar: fica parada (consenso)

Erros desenhados:

- Joelho da frente para dentro (vista: frontal): o joelho da frente sai da linha do pé, para dentro
- Pé da frente perto do banco (vista: lateral): o pé da frente fica 19 cm mais perto do banco e o calcanhar sobe na descida
- Descer pouco (vista: lateral): desce só 47% do caminho

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/bulgaro.md: consenso de treinadores
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/bulgaro.ts): as distâncias dos pés ao quadril, a posição da mão de apoio e os erros, que a ficha não dá em número
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Desenvolvimento unilateral em pé com kettlebell (`desenvolvimento-unilateral-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento-unilateral-kettlebell.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 8 graus | desenho | desenho | joelhos destravados (a ficha não dá número) |
| `bacia` | 0 graus | consenso | ficha | tronco parado, em pé |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `maoLivre.acima` | 8 cm | consenso | ficha | a outra mão na cintura (acima do centro da bacia, como nos afundos) |
| `braco.baixo.elevacao` | -60 graus | consenso | ficha | embaixo, kettlebell na altura do ombro com o cotovelo junto ao corpo: o úmero fica 60° abaixo da horizontal (com o antebraço na vertical, a mão chega à altura do ombro) |
| `braco.baixo.frente` | 92 graus | desenho | desenho | embaixo, o cotovelo à frente das costelas, junto ao corpo (92° à frente do plano do corpo, visto de cima) |
| `braco.topo.elevacao` | 82 graus | consenso | ficha | no topo, o braço estendido acima da cabeça: o úmero a 8° da vertical (com o antebraço na vertical, o cotovelo dobra 8°, sem travar) |
| `braco.topo.frente` | 80 graus | desenho | desenho | o braço sobe quase no plano da frente do corpo, com o cotovelo à frente (pegada neutra: palma para dentro), e termina sobre o ombro, um pouco à frente. Num plano mais para o lado, a frente do ombro some atrás do braço no topo |
| `mao.giro.baixo` | 0 graus | desenho | desenho | embaixo, a palma para dentro (pegada neutra na alça): o dorso da mão e do antebraço fica para fora, onde a bola apoia |
| `mao.giro.topo` | 30 graus | desenho | desenho | no topo, a mão girou 30° (a palma vai um pouco para a frente) |
| `kettlebell.bolaParaFora` | 0,3 fração | consenso | ficha | a bola do lado de fora do antebraço: ela fica do lado do dorso da mão, puxada um pouco para fora |
| `kettlebell.folga` | 0,3 cm | desenho | desenho | a bola apoiada no antebraço: a folga entre a bola e a pele (o ângulo da bola sai dela) |
| `erro.arco.lombar` | -20 graus | desenho | hoje | erro: a lombar arqueia 20° no topo (hoje: −28 com o pescoço) |
| `erro.arco.toracica` | -8 graus | desenho | hoje | erro: as costas de cima estendem 8° |
| `erro.arco.bacia` | 6 graus | desenho | desenho | erro: a bacia inclina 6° à frente (a lombar arqueia sobre ela) |
| `erro.jogar.joelho` | 30 graus | desenho | hoje | erro: embaixo os joelhos dobram 30° para dar o impulso e estendem na subida |
| `erro.jogar.bacia` | 6 graus | desenho | hoje | erro: embaixo o tronco inclina 6° à frente |
| `erro.punho` | 35 graus | desenho | hoje | erro: embaixo o kettlebell puxa a mão para trás e o punho dobra 35° |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,45 s | inspira | na altura do ombro | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |
| Topo | pausa | 0,4 s | firme | tronco parado | consenso |
| Descida · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- embaixo, kettlebell na altura do ombro (consenso)
- o kettlebell apoiado no antebraço (consenso)
- embaixo, cotovelo junto ao corpo (consenso)
- punho reto, alinhado com o antebraço (consenso)
- empurra para cima (o antebraço na vertical) (consenso)
- em cima, o braço estendido acima da cabeça (consenso)
- o kettlebell passa sem bater na cabeça (consenso)
- sem arquear a lombar (consenso)
- tronco parado, sem jogar o peso (consenso)
- a outra mão na cintura (consenso)
- o centro de massa (corpo + kettlebell) fica perto do meio do pé, com o quadril parado (consenso)

Erros desenhados:

- Arquear a lombar (vista: lateral): a lombar arqueia e o peito vai para trás para subir o peso
- Jogar o peso com as pernas (vista: lateral): os joelhos dobram embaixo e estendem para dar o impulso
- Punho dobrado para trás (vista: lateral): embaixo, o kettlebell puxa a mão para trás e o punho dobra

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/desenvolvimento-unilateral-kettlebell.md): em pé, pés na largura do quadril; kettlebell apoiado no antebraço, na altura do ombro, cotovelo junto ao corpo, punho reto, a bola do lado de fora do antebraço; empurra até o braço estender acima da cabeça, sem jogar o peso e sem arquear a lombar; tronco parado, a outra mão na cintura; ~1 s subindo, ~2 s descendo: consenso de treinadores (B.2.6; nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/desenvolvimento-unilateral-kettlebell.json): tempos das fases ('~1–1,5 s' subindo, '~2–3 s' descendo), as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/desenvolvimento-unilateral-kettlebell.ts): os erros
- `equilibrio`: Em pé, parado, a projeção do centro de massa (corpo + carga) cai dentro do apoio dos pés (mecânica)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Desenvolvimento sentado com halteres (`desenvolvimento`)

Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `encosto` | 78 graus | consenso | app | encosto a 75–80° da horizontal, não a 90°: o desenho usa 78° |
| `bacia` | -16 graus | desenho | desenho | a bacia inclina para trás o bastante para a coluna, com as curvas de repouso, ficar paralela ao encosto (a ficha só diz 'costas apoiadas') |
| `cabeca` | 4 graus | desenho | desenho | a cabeça apoiada, com o queixo um pouco recolhido para o olhar ir à frente (a extensão do pescoço sai do contato da nuca com o encosto) |
| `estofado.afunda` | 1 cm | desenho | desenho | quanto as nádegas, as costas e a nuca afundam no estofado |
| `pes.meiaDistancia` | 16 cm | desenho | desenho | pés firmes no chão, um pouco mais afastados que o quadril, para a base ficar firme (a ficha não dá número) |
| `pes.aFrente` | 56 cm | desenho | desenho | onde a bola do pé apoia, à frente da dobradiça do banco: a canela fica quase em pé (a ficha não dá número) |
| `braco.baixo.elevacao` | -24 graus | consenso | guia | embaixo, os halteres na altura das orelhas: o úmero fica 24° abaixo da horizontal (com o antebraço na vertical, é o que leva a mão à altura da orelha) |
| `braco.baixo.frente` | 30 graus | consenso | app | cotovelos um pouco à frente do corpo: 30° à frente do plano do corpo, no meio da faixa de ~20° a ~45° do texto do app |
| `braco.topo.elevacao` | 80 graus | consenso | guia | no topo, cotovelos quase estendidos: o úmero fica 10° fora da vertical (com o antebraço na vertical, o cotovelo dobra 10°) |
| `braco.topo.frente` | 30 graus | consenso | guia | no topo, o braço sobre o ombro: o cotovelo continua à frente |
| `carga` | 11,3 kg | desenho | objetos | cada halter desenhado (25 lb, o da tabela de objetos) |
| `erro.arco.lombar` | -22 graus | desenho | hoje | erro: a lombar arqueia 22° no topo (hoje: −28) |
| `erro.arco.toracica` | -8 graus | desenho | hoje | erro: as costas de cima também estendem 8° |
| `erro.arco.bacia` | 14 graus | desenho | desenho | erro: a bacia inclina 14° à frente no assento e as costas de baixo saem do encosto; o peito vai para trás |
| `erro.cotovelo.frente` | -15 graus | desenho | hoje | erro: embaixo, os cotovelos ficam 15° atrás da linha do corpo |
| `erro.curta.elevacao` | 35 graus | desenho | hoje | erro: a descida para com o úmero 35° acima da horizontal, os halteres acima da cabeça |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,45 s | inspira | altura das orelhas | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |
| Topo | pausa | 0,4 s | firme | cotovelos quase estendidos | consenso |
| Descida · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- sentado com as costas e a cabeça apoiadas (consenso)
- a lombar não arqueia (costas no encosto) (consenso)
- embaixo, halteres na altura das orelhas (ou um pouco abaixo) (consenso)
- cotovelos um pouco à frente do corpo (de ~20° a ~45°) (consenso)
- antebraços na vertical (consenso)
- em cima, braços quase estendidos sobre os ombros (consenso)
- os halteres sobem sem bater na cabeça e sem bater um no outro (consenso)

Erros desenhados:

- Arquear a lombar (vista: lateral): a lombar arqueia, as costas de baixo saem do encosto e o peito vai para trás
- Cotovelos para trás (vista: cima): embaixo, os cotovelos abrem atrás da linha do corpo
- Descer pouco (vista: frontal): a descida para com os halteres acima da cabeça

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/desenvolvimento.md e no texto do app (src/conteudo/exercicios/desenvolvimento.json): consenso de treinadores
- `app`: Texto do app (src/conteudo/exercicios/desenvolvimento.json): 'Encosto a 75–80°, não a 90°'; campo 'vary': 'O quanto os cotovelos ficam à frente (de ~20° a ~45°) depende de como o seu ombro se sente'
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/desenvolvimento.ts): tempos das fases e erros
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Elevação lateral com halteres (`elevacao-halteres`)

Ficha da técnica: `docs/pesquisa/animacoes/elevacao-halteres.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 10 graus | desenho | desenho | joelhos destravados (a ficha não dá número) |
| `tronco` | 12 graus | desenho | desenho | tronco levemente inclinado à frente: a bacia inclina 12° com a coluna neutra (a ficha não dá número) |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `plano.baixo` | 75 graus | consenso | guia | embaixo, os halteres na frente das coxas: o braço pende no plano 75° à frente do plano do corpo e passa para o de 30° ao subir. Com o halter de 10 lb (26,7 cm), a mão fica 16 cm para fora do meio do corpo, na frente da coxa; a elevação embaixo sai da folga (com o de 25 lb, o plano era 55° e a mão ficava a 23 cm, ao lado da coxa) |
| `plano.transicao` | 0,5 fração | desenho | desenho | o braço passa do plano de baixo para o da subida na primeira metade do caminho (depois sobe só no plano da subida); com 40%, a volta de 75° para 30° dava um salto de velocidade de 17% no cotovelo |
| `plano` | 30 graus | consenso | app | o braço sobe para fora e um pouco à frente do corpo: 30° à frente do plano do corpo, no meio da faixa de ~20° a ~40° do texto do app |
| `braco.topo` | 96 graus | consenso | guia | em cima, o braço na linha do ombro: elevação do úmero no tronco que deixa o cotovelo na altura do centro do ombro (com o tronco inclinado 12°, o braço fica quase horizontal) |
| `cotovelo` | 15 graus | desenho | desenho | cotovelos levemente dobrados, o mesmo ângulo o movimento todo (a ficha não dá número) |
| `cotovelo.giro` | 50 graus | desenho | desenho | 'cotovelo conduz': no alto, o úmero gira 50° para dentro e o plano em que o cotovelo dobra inclina para baixo, com o cotovelo um pouco acima da mão (a ficha não dá número) |
| `polegar.paraCima` | 15 graus | consenso | app | no alto, o polegar fica 15° acima da pegada neutra (o texto do app aceita mão neutra ou polegar levemente para cima) |
| `carga.folga` | 1,5 cm | desenho | desenho | embaixo, os halteres ficam perto das coxas: a folga entre a cabeça do halter e a pele da coxa. A elevação do braço embaixo sai desta folga |
| `carga` | 4,5 kg | desenho | objetos | halteres leves (a ficha: 'halteres leves'): o sextavado de 10 lb da tabela de objetos (dados/objetos/halter-leve.json); entram no equilíbrio |
| `erro.encolher.elev` | 18 graus | desenho | desenho | erro: a clavícula sobe 18° além do ritmo normal do ombro no alto (o trapézio de cima sobe o ombro) |
| `erro.frontal.plano` | 80 graus | desenho | desenho | erro: no alto, o braço fica 80° à frente do plano do corpo (quase uma elevação frontal) |
| `erro.balanco.frente` | 30 graus | desenho | hoje | erro: o tronco começa mais inclinado à frente (30°) para pegar impulso |
| `erro.balanco.tras` | -10 graus | desenho | hoje | erro: no alto, o tronco foi jogado para trás (com a lombar arqueada, o peito fica cerca de 9° atrás da vertical) |
| `erro.balanco.lombar` | -12 graus | desenho | hoje | erro: a lombar arqueia 12° no alto |
| `erro.balanco.joelho` | 24 graus | desenho | hoje | erro: os joelhos dobram 24° embaixo e estendem para dar o impulso |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,4 s | inspira | ombros baixos | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |
| Linha do ombro | pausa | 0,3 s | firme | pausa curta | consenso |
| Descida · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- tronco levemente inclinado à frente (consenso)
- o braço sobe para fora e um pouco à frente do corpo (de ~20° a ~40°) (consenso)
- em cima, o braço na linha do ombro (consenso)
- cotovelos levemente dobrados, o cotovelo um pouco acima da mão (consenso)
- o ombro não sobe junto com o braço (ombro longe da orelha) (consenso)
- embaixo, os halteres perto das coxas, sem atravessá-las (consenso)
- sem embalo: o tronco fica parado (consenso)
- o centro de massa (corpo + halteres) fica perto do meio do pé (na metade do meio, do calcanhar à bola), com o quadril parado (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o tronco começa mais inclinado e é jogado para trás para dar o impulso, com a lombar arqueada
- Encolher os ombros (vista: frontal): a clavícula sobe além do ritmo normal: os ombros vão em direção às orelhas
- Virar elevação frontal (vista: cima): os braços sobem à frente do corpo, e não para o lado

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/elevacao-halteres.md e no texto do app (src/conteudo/exercicios/elevacao-halteres.json): consenso de treinadores
- `app`: Texto do app (src/conteudo/exercicios/elevacao-halteres.json), campo 'vary': 'O plano exato do braço (de ~20° a ~40° à frente do corpo) depende da postura da sua escápula. A mão pode ficar neutra ou com o polegar levemente para cima'
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/elevacao-halteres.ts): tempos das fases e erros
- `equilibrio`: Em pé, parado, a projeção do centro de massa (corpo + carga) cai dentro do apoio dos pés (mecânica); a ficha não diz onde no pé, e o desenho usa o meio do pé
- `objetos`: Tabela de objetos: src/engine/novo/dados/objetos/halter-leve.json (halter sextavado de 10 lb, RitFit e Titan)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Elevação lateral unilateral na polia (`elevacao-lateral`)

Ficha da técnica: `docs/pesquisa/animacoes/elevacao-lateral.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | pés na largura do quadril (a ficha não diz; é a postura em pé dos outros exercícios) |
| `joelho` | 8 graus | desenho | desenho | joelhos destravados (a ficha não dá número) |
| `tronco` | 0 graus | consenso | guia | tronco reto (a ficha permite inclinar um pouco para longe da torre; o desenho fica no reto) |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `plano.baixo` | 105 graus | consenso | guia | embaixo, a mão na frente do quadril, com o cabo tenso: o braço pende um pouco à frente e para dentro (no plano 105° à frente do lado). A elevação embaixo sai da folga até a coxa |
| `plano.transicao` | 0,6 fração | desenho | desenho | o braço passa do plano de baixo (na frente do quadril) para o da subida nos primeiros 60% do caminho (depois sobe só no plano da subida) |
| `plano` | 30 graus | consenso | app | o braço sobe para fora e um pouco à frente do corpo: 30° à frente do plano do corpo, no meio da faixa de ~20° a ~40° do texto do app |
| `braco.topo` | 95 graus | consenso | guia | em cima, o braço na linha do ombro: elevação do úmero no tronco que deixa o cotovelo na altura do centro do ombro |
| `cotovelo` | 15 graus | desenho | desenho | cotovelo levemente dobrado, o mesmo ângulo o movimento todo (a ficha não dá número) |
| `cotovelo.giro` | 50 graus | desenho | desenho | 'cotovelo conduz': no alto, o úmero gira 50° para dentro e o cotovelo fica um pouco acima da mão (a ficha não dá número) |
| `polegar.paraCima` | 15 graus | consenso | app | no alto, o polegar fica 15° acima da pegada neutra (o texto do app aceita mão neutra ou polegar levemente para cima) |
| `carga.folga` | 3 cm | desenho | desenho | embaixo, a mão (como uma esfera de 4 cm) fica a 3 cm da pele da coxa |
| `mao.raio` | 4 cm | desenho | desenho | a mão fechada no estribo, como uma esfera, na conta da folga até a coxa |
| `torre.maoAoLado` | 58 cm | consenso | app | de lado para a torre, a cerca de um passo dela: a mão livre segura o trilho da coluna a 58 cm do meio do corpo (hoje: torre a 52 cm) |
| `torre.maoAltura` | 112 cm | desenho | desenho | a mão livre segura o trilho na altura da cintura |
| `torre.aFrente` | 6 cm | desenho | desenho | a coluna fica 6 cm à frente do meio do corpo, para o cabo passar na frente das pernas |
| `pilha.folga` | 2 cm | consenso | guia | cabo tenso embaixo: a pilha já sai 2 cm do repouso (como na puxada) |
| `erro.encolher.elev` | 18 graus | desenho | desenho | erro: a clavícula sobe 18° além do ritmo normal do ombro no alto (o trapézio de cima sobe o ombro) |
| `erro.frontal.plano` | 80 graus | desenho | desenho | erro: no alto, o braço fica 80° à frente do plano do corpo (quase uma elevação frontal) |
| `erro.balanco.frente` | 18 graus | desenho | hoje | erro: o tronco começa inclinado à frente para pegar impulso |
| `erro.balanco.tras` | -10 graus | desenho | hoje | erro: no alto, o tronco foi jogado para trás (com a lombar arqueada, o peito fica cerca de 9° atrás da vertical) |
| `erro.balanco.lombar` | -12 graus | desenho | hoje | erro: a lombar arqueia 12° no alto |
| `erro.balanco.joelho` | 22 graus | desenho | hoje | erro: os joelhos dobram 22° embaixo e estendem para dar o impulso |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,4 s | inspira | cabo tenso | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |
| Linha do ombro | pausa | 0,3 s | firme | pausa curta | consenso |
| Descida · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- o braço sobe para fora e um pouco à frente do corpo (de ~20° a ~40°) (consenso)
- em cima, o braço na linha do ombro (consenso)
- cotovelo levemente dobrado e um pouco acima da mão (consenso)
- o ombro não sobe junto com o braço (ombro longe da orelha) (consenso)
- embaixo, a mão na frente do quadril, sem atravessar a coxa (consenso)
- o cabo passa na frente do corpo, reto da polia ao estribo (consenso)
- a outra mão segura a coluna da torre, parada (consenso)
- tronco reto e parado (consenso)
- o centro de massa fica perto do meio do pé (na metade do meio, do calcanhar à bola), com o quadril parado (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o tronco começa inclinado e é jogado para trás para dar o impulso, com a lombar arqueada
- Encolher o ombro (vista: frontal): a clavícula sobe além do ritmo normal: o ombro vai em direção à orelha
- Virar elevação frontal (vista: cima): o braço sobe à frente do corpo, e não para o lado

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/elevacao-lateral.md e no texto do app (src/conteudo/exercicios/elevacao-lateral.json): consenso de treinadores
- `app`: Texto do app (src/conteudo/exercicios/elevacao-lateral.json), campo 'vary': 'O plano exato do braço (de ~20° a ~40° à frente do corpo) depende da postura da sua escápula. A mão pode ficar neutra ou com o polegar levemente para cima'; 'Fique de lado para a torre, a cerca de um passo dela'
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/elevacao-lateral.ts): a torre à esquerda, a 52 cm do meio do corpo, os tempos das fases e os erros
- `equilibrio`: Em pé, parado, a projeção do centro de massa (corpo) cai dentro do apoio dos pés (mecânica)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

Ficha da técnica: `docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `maos.alemDoOmbro` | 0 cm | consenso | guia | mãos na largura dos ombros: o centro da pegada na linha do centro do ombro (18,4 cm do meio do corpo) |
| `maos.dentroDaBeirada` | 1 cm | desenho | desenho | mãos espalmadas no tampo, junto da beirada: o centro do punho fica 1 cm para dentro dela |
| `pes.atrasDaBeirada` | 132 cm | desenho | desenho | distância no chão da bola do pé à beirada da bancada. Hoje as mãos ficam a ~125 cm do tornozelo (~112 da bola do pé); com 112, embaixo o cotovelo passa à frente da mão e o punho dobra 109° (o máximo observado é 95°): os pés recuam até o cotovelo ficar atrás da beirada |
| `pes.meiaDistancia` | 8,7 cm | desenho | pike | pés na largura do quadril |
| `calcanhar.sobe` | 30 graus | desenho | pike | apoio na ponta dos pés, com o calcanhar levantado e parado |
| `joelho` | 5 graus | consenso | guia | corpo reto: pernas estendidas |
| `cotovelo.cima` | 25 graus | desenho | hoje | em cima: braços estendidos (hoje: 28° de dobra) |
| `testa.aoApoio` | 6 cm | desenho | desenho | embaixo: a testa chega perto do apoio (a menor distância da cabeça à bancada; a ficha não dá número) |
| `pescoco.flexao` | 0 graus | desenho | desenho | pescoço e cabeça na linha do corpo |
| `erro.quadril.dobra` | 26 graus | desenho | hoje | erro: o quadril dobra (hoje: 24°), o tronco fica mais em pé sobre as mãos |
| `erro.cotovelos.abre` | 1 fração | desenho | desenho | erro: os cotovelos apontam para os lados em vez de para a frente |
| `erro.falha.testa` | 0,5 cm | desenho | desenho | erro: o cotovelo cede e a testa chega ao tampo |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Braços estendidos | pausa | 0,45 s | inspira | corpo reto, inclinado | consenso |
| Descida · excêntrica | exc | 2,5 s | inspira | 2 a 3 s | consenso |
| Embaixo | pausa | 0,5 s | firme | testa perto da bancada | consenso |
| Volta · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- corpo reto; só os cotovelos dobram (consenso)
- cotovelos apontando para a frente (consenso)
- embaixo, a testa chega perto do apoio, sem bater (consenso)
- embaixo, braços acima da cabeça (um estudo)

Erros desenhados:

- Dobrar o quadril (vista: lateral): o quadril dobra e fica para trás e para cima
- Abrir os cotovelos (vista: cima): os cotovelos vão para os lados
- Ir até a falha (vista: lateral): o cotovelo cede e a testa chega ao apoio

Fontes desta ficha:

- `guia`: Ficha da técnica (docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md) e cartão do app (src/conteudo/exercicios/extensao-triceps-peso-corpo.json): consenso (Jacob Zemer, vídeo, em 17, G2); a posição do braço acima da cabeça tem um estudo (maeo2023)
- `hoje`: Animação de hoje (src/engine/exercicios/extensao-triceps-peso-corpo.ts, aprovada em 10/11/2026) e a conferência dela (docs/revisoes/r5-anim/conferencia/extensao-triceps-peso-corpo.md)
- `pike`: O núcleo da família (exercicios/apoio-no-chao.ts): pés na ponta com o calcanhar parado, como no pike
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de joelho na bola suíça (`flexao-bola`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-bola.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.inicio` | 6 graus | consenso | guia | começo: pernas estendidas (sem travar o joelho; o número é de desenho) |
| `joelho.fim` | 90 graus | consenso | guia | fim: joelhos a ~90°, pés apoiados em cima da bola |
| `bracos.abertura` | 30 graus | consenso | guia | braços no chão, abertos ~30° do corpo, palmas para baixo |
| `bracos.alcance` | 0,97 fração | desenho | desenho | a mão fica a 97% do comprimento do braço mais o antebraço, a partir do ombro: o cotovelo quase estendido, sem travar |
| `erro.volta.folga` | 1 cm | desenho | desenho | erro: na volta, o quadril desce até ficar a 1 cm do chão (encosta) |
| `erro.curta.fracao` | 0,45 fração | desenho | desenho | erro: puxa só até 45% do caminho (o joelho para longe de 90°) |
| `pe.afundaNaBola` | 1 cm | desenho | desenho | o pé afunda 1 cm na bola onde apoia (a bola cheia cede um pouco sob o calcanhar e a sola) |
| `ombro.z` | -40 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `erro.quadril.sobe` | 0,15 fração | desenho | desenho | erro: a bacia sobe só 15% do que sobe no certo; o quadril dobra para o pé chegar à bola |
| `bola.alemDoCalcanhar` | 7 cm | desenho | desenho | com as pernas estendidas, o calcanhar apoia 7 cm atrás do alto da bola (do lado do corpo), e a panturrilha passa por cima dela; no fim, o pé deita no alto da bola |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Pernas estendidas | pausa | 0,5 s | inspira | quadril alto | consenso |
| Puxada · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Joelhos a ~90° | pausa | 0,6 s | firme | segura | consenso |
| Volta · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `mao.R`, `mao.L`.

Regras que a conferência mede:

- começo: ombros, quadril e calcanhares em linha (consenso)
- fim: ombros, quadril e joelhos em linha (consenso)
- fim: joelhos a ~90° (consenso)
- a puxada sobe ainda mais o quadril (consenso)
- o quadril não encosta no chão (consenso)
- deitado de costas: as costas e a cabeça ficam apoiadas no chão, e os ombros não escorregam (consenso)
- calcanhares em cima da bola no começo; pés apoiados em cima dela no fim (consenso)
- coxas e canelas não atravessam a bola (consenso)

Erros desenhados:

- Quadril cai ao puxar (vista: lateral): o quadril dobra e desce quando os joelhos dobram
- Quadril encosta no chão na volta (vista: lateral): o quadril desce até o chão entre as repetições
- Puxar pouco (vista: lateral): para com os joelhos longe de 90°

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/flexao-bola.md e no texto do app: consenso de treinadores
- `hoje`: Animação de hoje (src/engine/exercicios/flexao-bola.ts, port do guia original, aprovada): distâncias que a ficha não dá em número
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de braço com elástico (`flexao-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `cotovelo.cima` | 10 graus | consenso | flexao | em cima: braços estendidos (sem travar) |
| `peito.aoChao` | 5 cm | consenso | flexao | embaixo: peito a poucos centímetros do chão |
| `maos.alemDoOmbro` | 12 cm | consenso | flexao | mãos um pouco mais abertas que os ombros: a borda de dentro da mão fica 2 cm para fora da linha de fora do ombro (meia largura bideltoide 23,9 + meia largura da mão 4,3 + 2 = 30,2 cm do meio do corpo; o centro do ombro fica a 18,4). Antes eram 6 cm, que punham a mão debaixo do ombro, e não para fora dele |
| `maos.abaixoDoOmbro` | 13 cm | consenso | flexao | mãos na linha do meio do peito (distância do ombro em direção aos pés, com o corpo embaixo) |
| `cotovelos.doTronco` | 45 graus | consenso | flexao | cotovelos indo para trás, a meio caminho do tronco |
| `pes.meiaDistancia` | 8,7 cm | consenso | flexao | pés na largura do quadril |
| `tornozelo.dorsiflexao` | 10 graus | desenho | desenho | apoio na ponta dos pés: o tornozelo fica perto do neutro |
| `joelho` | 4 graus | consenso | flexao | pernas estendidas (corpo em prancha) |
| `escapula.retracaoEmbaixo` | 8 graus | desenho | desenho | as escápulas se aproximam na descida; a ficha não dá número |
| `erro.quadril.queda` | 16 graus | desenho | desenho | erro: o quadril cai (extensão da lombar somada) |
| `erro.cot.doTronco` | 88 graus | desenho | desenho | erro: cotovelos abertos a ~90° |
| `erro.curta.fracao` | 0,5 fração | desenho | desenho | erro: desce só até a metade |
| `elastico.abaixoDeC7` | 12 cm | consenso | ficha | o meio do elástico passa pelas costas na altura das escápulas, abaixo do pescoço: 12 cm abaixo da base do pescoço (C7), ao longo da coluna. O número é escolha de desenho (a ficha não dá) |
| `elastico.voltaNaMao` | 22 cm | desenho | desenho | o tubo que uma volta em cada mão gasta: o contorno da mão, 2 × (largura da mão 8,6 + espessura ~2,5 cm). Entra na conta do quanto o tubo estica |
| `elastico.folgaNasCostas` | 0,6 cm | desenho | desenho | o tubo fica por cima da pele das costas (metade do diâmetro do tubo) |
| `elastico.atrasDoOmbro` | 3 cm | desenho | desenho | o tubo passa por fora da parte de trás do ombro, 3 cm para o lado das costas a partir do centro do ombro, a caminho da mão |
| `erro.pescoco.abaixoDeC7` | -3 cm | desenho | desenho | erro: o elástico sobe para o pescoço, 3 cm acima da base dele (C7) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,4 s | inspira | elástico mais esticado | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |
| Embaixo | pausa | 0,35 s | firme | peito perto do chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- corpo em linha reta da cabeça aos calcanhares (consenso)
- embaixo, o peito chega perto do chão (consenso)
- cotovelos para trás, a meio caminho do tronco (consenso)
- o meio do elástico passa pelas costas, na altura das escápulas (abaixo do pescoço) (consenso)
- cada ponta do elástico fica presa entre a palma e o chão (consenso)

Erros desenhados:

- Quadril cai (vista: lateral): a lombar arqueia e o quadril sai da linha
- Cotovelos abertos a 90° (vista: cima): os cotovelos vão para os lados
- Descer pouco (vista: lateral): desce só até a metade
- Elástico sobe para o pescoço (vista: cima): o meio do elástico passa no pescoço, e não nas escápulas

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-elastico.md): consenso de treinadores (nsca2021, não verificado; seguranca.montagem); a posição, a descida e a subida são as da flexao aprovada
- `flexao`: A ficha de movimento da flexão aprovada (src/engine/novo/dados/movimentos/flexao.json), que veio do guia original (consenso de treinadores): a ficha da técnica pede a mesma prancha e o mesmo caminho dos braços
- `corpo`: Tabela do corpo do Boneco (src/engine/novo/dados/corpo-homem.json)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de braço com as mãos juntas (`flexao-fechada`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-fechada.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `cotovelo.cima` | 10 graus | consenso | flexao | em cima: braços estendidos (sem travar) |
| `peito.aoChao` | 5 cm | consenso | flexao | embaixo: peito a poucos centímetros do chão |
| `maos.alemDoOmbro` | -4 cm | consenso | hoje | mãos na largura dos ombros, um pouco menos: o centro da mão fica 4 cm para dentro do centro do ombro (14,4 cm do meio do corpo, como na animação de hoje, a 14 cm); a borda de fora da mão fica por dentro da linha de fora dos ombros. A ficha não dá a distância |
| `maos.abaixoDoOmbro` | 14 cm | desenho | desenho | mãos abaixo da parte de baixo do peito: 14 cm do ombro em direção aos pés, com o corpo embaixo, 3,5 cm além da linha dos mamilos (o centro do ombro fica 10,5 cm acima dela: altura.peito da tabela do corpo). Com 16 cm a mão ficaria mais embaixo do peito, mas em cima o punho passaria do máximo de extensão (96,8°, máximo 95°). Na flexão são 13 cm (a linha do meio do peito) |
| `cotovelos.doTronco` | 12 graus | consenso | hoje | cotovelos para trás, rentes ao corpo (o número é a direção para onde o cotovelo aponta; a conferência mede o ângulo do braço com o tronco, visto de cima) |
| `pes.meiaDistancia` | 8,7 cm | consenso | flexao | pés na largura do quadril |
| `tornozelo.dorsiflexao` | 10 graus | desenho | desenho | apoio na ponta dos pés: o tornozelo fica perto do neutro |
| `joelho` | 4 graus | consenso | flexao | pernas estendidas (corpo em prancha) |
| `escapula.retracaoEmbaixo` | 8 graus | desenho | desenho | as escápulas se aproximam na descida; a ficha não dá número |
| `erro.quadril.queda` | 16 graus | desenho | desenho | erro: o quadril cai (extensão da lombar somada) |
| `erro.cot.doTronco` | 130 graus | desenho | desenho | erro: cotovelos abertos para os lados (a direção para onde o cotovelo aponta; medido de cima, o braço faz 72,5° com o tronco, como no erro da flexão) |
| `erro.curta.fracao` | 0,5 fração | desenho | desenho | erro: desce só até a metade |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,4 s | inspira | prancha | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |
| Embaixo | pausa | 0,35 s | firme | peito perto das mãos | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- corpo em linha reta da cabeça aos calcanhares (consenso)
- embaixo, o peito chega perto das mãos (a poucos centímetros do chão) (consenso)
- de cima, as mãos ficam por dentro da linha dos ombros (consenso)
- cotovelos para trás, rentes ao corpo (consenso)

Erros desenhados:

- Cotovelos abertos para os lados (vista: cima): os cotovelos vão para os lados
- Quadril cai (vista: lateral): a lombar arqueia e o quadril sai da linha
- Descer pouco (vista: lateral): desce só até a metade

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-fechada.md): consenso de treinadores (nsca2021, não verificado); a base do desenho é a flexao aprovada
- `flexao`: A ficha de movimento da flexão aprovada (src/engine/novo/dados/movimentos/flexao.json), que veio do guia original (consenso de treinadores): a ficha da técnica manda usar as mesmas poses do tronco e das pernas
- `hoje`: Animação de hoje (src/engine/exercicios/flexao-fechada.ts, aprovada): distâncias que a ficha não dá em número
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de joelho deslizando os pés no chão (`flexao-joelho-deslizante`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-joelho-deslizante.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.inicio` | 10 graus | consenso | app | início: pernas quase estendidas, com o quadril ainda fora do chão |
| `joelho.fim` | 120 graus | desenho | desenho | fim: calcanhares perto do glúteo; a ficha não dá o ângulo (é o que põe o calcanhar a poucos centímetros do glúteo com ombros, quadril e joelhos em linha) |
| `quadril.folgaNoInicio` | 5 cm | desenho | desenho | início: quadril um pouco elevado (da pele do glúteo ao chão); a ficha diz "um pouco" e não dá número |
| `quadril.fim` | 0 graus | consenso | ficha | fim: ombros, quadril e joelhos em linha (a coxa continua a linha do ombro ao quadril) |
| `pe.angulo` | 0 graus | consenso | correcao | o pé em ângulo reto com a canela, apoiado no calcanhar (a correção de 04/11: antes o pé apontava para cima, como na ponta do pé) |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `maos.abaixoDoOmbro` | 56 cm | desenho | desenho | braços no chão ao lado do corpo, palmas para baixo: a mão fica a 56 cm do ombro em direção aos pés, com o cotovelo quase estendido e o braço deitado no chão |
| `maos.paraFora` | 6 cm | desenho | desenho | as mãos um pouco para fora da linha dos ombros, para o braço não encostar no tronco |
| `erro.quadril.folga` | 0,3 cm | desenho | desenho | erro: o quadril cai até encostar no chão durante a puxada |
| `erro.lombar.lombar` | -15 graus | desenho | desenho | erro: a lombar arqueia 15 graus para subir o quadril (barriga para cima): a bacia sobe uns 6 cm acima da linha ombro–joelho |
| `erro.curta.fracao` | 0,4 fração | desenho | desenho | erro: para com os joelhos ainda pouco dobrados (40% do caminho) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Pernas estendidas | pausa | 0,5 s | inspira | quadril fora do chão | consenso |
| Puxada · concêntrica | conc | 1,2 s | expira | ~1 s | consenso |
| Joelhos dobrados | pausa | 0,6 s | firme | quadril alto | consenso |
| Volta · excêntrica | exc | 2,5 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `mao.R`, `mao.L`.

Regras que a conferência mede:

- o quadril fica fora do chão o tempo todo (consenso)
- os ombros ficam no chão, sem sair do lugar, e a cabeça apoiada (consenso)
- com os joelhos dobrados, ombros, quadril e joelhos em linha (consenso)
- os calcanhares deslizam na toalha: ficam apoiados nela e andam para perto do glúteo (consenso)

Erros desenhados:

- Quadril encosta no chão (vista: lateral): o quadril cai até o chão enquanto os calcanhares vêm
- Arquear a lombar (vista: lateral): a lombar arqueia 15° e a bacia sobe acima da linha ombro–joelho
- Puxar pouco (vista: lateral): para com os joelhos pouco dobrados, os calcanhares longe do glúteo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-joelho-deslizante.md): a mesma técnica da flexão na bola do guia original, consenso de treinadores
- `app`: Texto do app (src/conteudo/exercicios/flexao-joelho-deslizante.json), que sai da ficha
- `correcao`: Correção já feita em 04/11/2026 (docs/revisoes/animacao-nova/correcoes-ja-feitas.md, linha da flexao-joelho-deslizante): toalha centrada sob o calcanhar e pé em ângulo reto com a canela
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/flexao-joelho-deslizante.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos/toalha.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de joelho com elástico (`flexao-joelho-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-joelho-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.inicio` | 12 graus | consenso | app | início: joelhos quase estendidos, elástico um pouco esticado |
| `joelho.fim` | 115 graus | desenho | desenho | fim: joelhos bem dobrados, calcanhares perto do glúteo; a ficha não dá o ângulo (com o quadril estendido, o reto femoral limita a flexão do joelho) |
| `tornozelo.flexaoPlantar` | 55 graus | desenho | desenho | o pé solto, um pouco esticado (a ponta do pé não toca o chão com as pernas quase estendidas); a ficha não fala do pé |
| `lombar.deitado` | 10 graus | desenho | desenho | deitado de bruços, a lombar dobra 10 graus além da curva de repouso (a curva se achata no colchonete): o peito e a frente da bacia encostam juntos e o tórax fica deitado reto |
| `escapulas.protracao` | 20 graus | desenho | desenho | com os braços à frente da cabeça, os ombros descem para o colchonete (protração da clavícula) |
| `testa.altura` | 4,7 cm | desenho | desenho | a testa apoia no dorso das mãos espalmadas no chão ("testa apoiada nos braços dobrados"): altura do dorso da mão espalmada, medida no Boneco: 4,7 cm do chão |
| `maos.meiaDistancia` | 7 cm | desenho | desenho | as mãos lado a lado sob a testa: distância de cada punho ao meio do corpo |
| `colchonete.z` | -8 cm | desenho | desenho | onde fica o meio do colchonete (de 100 cm) em relação ao quadril: do peito aos joelhos; a cabeça e as mãos ficam no chão à frente dele |
| `elastico.esticaNoInicio` | 1,2 vezes | consenso | app | "afaste-se do ponto até o elástico ficar um pouco esticado com as pernas estendidas": 1,2 vez o comprimento em repouso (o número é escolha de desenho) |
| `elastico.acimaDoTornozelo` | 4 cm | consenso | ficha | os pegadores em volta dos tornozelos, por trás, logo acima do calcanhar: com o pé enfiado no pegador, a pegada fica na frente do tornozelo, 4 cm acima do centro dele, ao longo da canela, e a fita dá a volta e se junta atrás, onde sai o tubo |
| `elastico.noQuadro` | 30 cm | desenho | desenho | quanto do tubo, a partir do tornozelo, entra no enquadramento; dali até a porta ele é cenário e sai pela borda do quadro |
| `ancora.altura` | 1,5 cm | desenho | objetos | a alça da âncora sai pelo vão de baixo da porta: onde o tubo dá a volta, a 1,5 cm do chão |
| `erro.quadril.sobe` | 12 cm | desenho | desenho | erro: a bacia sobe 12 cm do colchonete, com o peito e os joelhos parados |
| `erro.tranco.alem` | 20 graus | desenho | desenho | erro: no embalo, o joelho passa 20 graus do fim |
| `erro.tranco.quadril` | 4 cm | desenho | desenho | erro: no embalo, a bacia descola 4 cm do colchonete |
| `erro.curta.ida` | 0,55 fração | desenho | desenho | erro: dobra só 55% do caminho |
| `erro.curta.volta` | 0,25 fração | desenho | desenho | erro: na volta, para a 25% do caminho, sem estender |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Pernas estendidas | pausa | 0,5 s | inspira | elástico já esticado | consenso |
| Flexão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Joelhos dobrados | pausa | 0,5 s | firme | pausa curta | consenso |
| Volta · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pelve`, `joelho.R`, `joelho.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- deitado de bruços, o quadril encostado no colchonete e a testa apoiada nos braços (consenso)
- no fim, joelhos bem dobrados, calcanhares em direção ao glúteo (consenso)
- o elástico estica mais com os joelhos dobrados e já está um pouco esticado com as pernas estendidas (consenso)
- as pontas do elástico ficam em volta dos dois tornozelos, por trás, logo acima do calcanhar (consenso)

Erros desenhados:

- Quadril sobe do chão (vista: lateral): a bacia sobe 12 cm do colchonete e o quadril dobra
- Dar tranco (vista: lateral): no embalo, os calcanhares passam do fim (o joelho dobra 20° a mais) e o quadril descola do colchonete
- Puxar pouco ou não estender na volta (vista: lateral): dobra só até a metade e não estende na volta

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-joelho-elastico.md): a técnica da mesa flexora, consenso de treinadores (nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/flexao-joelho-elastico.json), que sai da ficha
- `fisica`: Física do elástico: a força cresce com o quanto ele estica (a ficha da técnica registra); a borracha não muda de volume, então o tubo afina ao esticar
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/flexao-joelho-elastico.ts; conferência em docs/revisoes/elastico/conferencia/flexao-joelho-elastico.md): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json (colchonete, elástico em tubo) e src/engine/novo/dados/objetos/porta.json (porta e âncora de porta)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de joelho na suspensão (`flexao-joelho-suspensao`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-joelho-suspensao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.inicio` | 10 graus | consenso | app | início: pernas quase estendidas, com o quadril ainda fora do chão |
| `joelho.fim` | 110 graus | desenho | deslizante | fim: calcanhares em direção ao glúteo; a ficha não dá o ângulo. Com os pés no alto (o calcanhar não desce da altura da alça), dobrar mais o joelho com o corpo em linha faz o quadril subir até o tronco ficar quase em pé sobre a nuca; 110 graus é o meio-termo escolhido olhando os quadros |
| `quadril.folgaNoInicio` | 5 cm | desenho | deslizante | início: quadril um pouco fora do chão (da pele do glúteo ao chão); a ficha diz "um pouco" e não dá número |
| `quadril.fim` | 9 graus | desenho | desenho | fim: ombros, quadril e joelhos em linha (a ficha), com 9 graus de folga (171°, dentro dos 170° da regra da família): em linha exata o quadril sobe mais e o pescoço dobra mais |
| `pe.angulo` | 0 graus | desenho | deslizante | o pé em ângulo reto com a canela, o calcanhar no berço (como a correção da deslizante) |
| `fita.alcaDoChao` | 30,5 cm | consenso | app | a fita ajustada com o fundo do berço, pendurado, a um palmo e meio do chão (o app); é o maior da faixa do fabricante, 8 a 12 pol (objetos/suspensao.json, alcaAlturaMax). No início, com os pés embaixo da âncora, o calcanhar fica nessa altura |
| `fita.ancoraParaACabeca` | 25 cm | desenho | desenho | a âncora sobre os pés (o app: "os pés embaixo da âncora"): quanto ela fica para o lado da cabeça do calcanhar no início |
| `fita.tronco` | 30 cm | desenho | desenho | quanto a fita desce inteira, da âncora, antes de se dividir em duas, uma para cada pé |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `colchonete.z` | -80 cm | desenho | app | o colchonete sob os ombros e a cabeça (o app: "um colchonete sob os ombros"): o centro dele em z, para ele acabar antes do quadril |
| `maos.alcance` | 0,95 fração | desenho | deslizante | braços no chão ao lado do corpo, palmas para baixo: o punho fica, na direção dos pés, a 95% do braço mais o antebraço a partir do ombro |
| `maos.paraFora` | 6 cm | desenho | deslizante | as mãos um pouco para fora da linha dos ombros, para o braço não encostar no tronco |
| `erro.quadril.folga` | 0,3 cm | desenho | desenho | erro: o quadril cai até encostar no chão durante a puxada |
| `erro.quadril.joelho` | 70 graus | desenho | desenho | erro: com o quadril caído e os calcanhares presos no alto, os joelhos só dobram até 70 graus (a fita não estica) |
| `erro.lombar.lombar` | -25 graus | desenho | desenho | erro: a lombar arqueia 25 graus para subir o quadril (barriga para cima) |
| `erro.curta.fracao` | 0,4 fração | desenho | desenho | erro: para com os joelhos ainda pouco dobrados (40% do caminho) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Pernas estendidas | pausa | 0,5 s | inspira | quadril fora do chão | consenso |
| Puxada · concêntrica | conc | 1,2 s | expira | ~1 s | consenso |
| Joelhos dobrados | pausa | 0,6 s | firme | quadril alto | consenso |
| Volta · excêntrica | exc | 2,5 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `mao.R`, `mao.L`.

Regras que a conferência mede:

- o quadril fica fora do chão o tempo todo (consenso)
- os ombros ficam no colchonete, sem sair do lugar, e a cabeça apoiada (consenso)
- com os joelhos dobrados, ombros, quadril e joelhos em linha (consenso)
- os calcanhares nos berços da fita, que pende da âncora sobre os pés: no início os pés ficam embaixo da âncora, e os calcanhares andam num arco em volta da âncora até perto do glúteo (consenso)

Erros desenhados:

- Quadril encosta no chão (vista: lateral): o quadril cai até o chão enquanto os calcanhares vêm
- Arquear a lombar (vista: lateral): a lombar arqueia 25° e a barriga sobe, fora da linha ombro–joelho
- Puxar pouco (vista: lateral): para com os joelhos pouco dobrados, os calcanhares longe do glúteo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-joelho-suspensao.md): a mesma técnica da flexão na bola e da deslizante, consenso de treinadores (B.2.6)
- `app`: Texto do app (src/conteudo/exercicios/flexao-joelho-suspensao.json), que sai da ficha
- `deslizante`: Ficha de movimento da flexão de joelho deslizante (dados/movimentos/flexao-joelho-deslizante.json): o mesmo movimento, os mesmos números de desenho
- `correcao`: Correção já feita em 04/11/2026 (docs/revisoes/animacao-nova/correcoes-ja-feitas.md, linha das suspensões): a fita não estica; fita do pé com cerca de 180 cm, escolha de desenho (docs/revisoes/catalogo/conferencia/suspensao.md)
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/flexao-joelho-suspensao.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos/suspensao.json (fita, âncora, berço do pé) e src/engine/novo/dados/objetos.json (colchonete)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão com os pés elevados (`flexao-pes-elevados`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao-pes-elevados.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `cotovelo.cima` | 10 graus | consenso | ficha | em cima: empurra até os braços estenderem, sem travar |
| `peito.aoChao` | 5 cm | consenso | ficha | embaixo: o peito quase toca o chão |
| `maos.alemDoOmbro` | 12 cm | consenso | ficha | mãos um pouco mais abertas que os ombros: a borda de dentro da mão fica 2 cm para fora da linha de fora do ombro (meia largura bideltoide 23,9 + meia largura da mão 4,3 + 2 = 30,2 cm do meio do corpo; o centro do ombro fica a 18,4). Antes eram 6 cm, que punham a mão debaixo do ombro, e não para fora dele |
| `maos.abaixoDoOmbro` | 0 cm | desenho | desenho | a linha das mãos (distância do ombro em direção aos pés, com o corpo embaixo). A ficha não dá a linha; com os pés elevados o ombro quase não anda para trás na subida, e as mãos na linha do meio do peito (13 cm, a flexão) dobrariam o punho além do máximo em cima |
| `cotovelos.doTronco` | 45 graus | consenso | ficha | cotovelos a ~45° do corpo |
| `pes.meiaDistancia` | 8,7 cm | consenso | flexao | pés na largura do quadril |
| `tornozelo.dorsiflexao` | 25 graus | desenho | desenho | pontas dos pés no apoio, com o corpo inclinado para baixo: o tornozelo estende (valor negativo = ponta do pé), para os dedos não dobrarem além do máximo |
| `joelho` | 4 graus | consenso | ficha | pernas estendidas (corpo reto da cabeça aos calcanhares) |
| `escapula.retracaoEmbaixo` | 8 graus | desenho | desenho | as escápulas se aproximam na descida; a ficha não dá número |
| `erro.quadril.queda` | 16 graus | desenho | desenho | erro: o quadril cai (extensão da lombar somada) |
| `erro.cot.doTronco` | 88 graus | desenho | desenho | erro: cotovelos abertos em T, a ~90° do corpo |
| `erro.curta.fracao` | 0,5 fração | desenho | desenho | erro: desce só até a metade |
| `pes.daBordaDoBanco` | 3 cm | desenho | desenho | a ponta do banco fica 3 cm além das pontas dos dedos: os pés apoiam inteiros no tampo, perto da borda |
| `banco.pontaNoQuadro` | 45 cm | desenho | desenho | do banco, o quadro precisa mostrar os 45 cm da ponta onde os pés apoiam; o resto pode ser cortado pela borda |
| `pescoco.extensao` | 16 graus | desenho | desenho | em cima, o pescoço um pouco estendido (o olhar vai para o chão um pouco à frente das mãos) |
| `cabeca.extensao` | -10 graus | desenho | desenho | o queixo um pouco recolhido sobre o pescoço (a cabeça dobra 10°), para o rosto não se jogar para trás |
| `cabeca.aoChao` | 5 cm | desenho | desenho | embaixo, o rosto fica no mínimo a 5 cm do chão: com a cabeça abaixo dos pés, ela chega ao chão antes do peito, e a descida para aí |
| `pescoco.extensaoEmbaixo` | 50 graus | desenho | desenho | embaixo, o pescoço estende mais, contra o tronco inclinado para baixo, e o olhar vai para o chão à frente das mãos: com a cabeça em linha com o corpo, o rosto bateria no chão antes do peito. Contra o chão, o rosto fica virado só uns 30° para a frente |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,4 s | inspira | prancha | consenso |
| Descida · excêntrica | exc | 2,5 s | inspira | 2 a 3 s | consenso |
| Embaixo | pausa | 0,35 s | firme | peito perto do chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- corpo reto da cabeça aos calcanhares (consenso)
- embaixo, o peito quase toca o chão (consenso)
- cotovelos a ~45° do corpo (consenso)
- pés no apoio firme, sem sair do lugar (consenso)
- a cabeça fica abaixo do quadril, sem bater no chão (consenso)

Erros desenhados:

- Quadril caído ou alto demais (vista: lateral): a lombar arqueia e o quadril cai abaixo da linha
- Descer pouco (vista: lateral): desce só até a metade
- Cotovelos abertos em T (vista: cima): os cotovelos vão para os lados, a ~90° do corpo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-pes-elevados.md): consenso de treinadores, com ebben2011 (docs/pesquisa/fontes.md) para a posição e a subida
- `tempo`: tempo.serie, citado na ficha da técnica para a descida de ~2 a 3 s (consenso)
- `flexao`: A ficha de movimento da flexão aprovada (src/engine/novo/dados/movimentos/flexao.json), que veio do guia original (consenso de treinadores): a ficha da técnica pede a mesma posição das mãos, dos cotovelos e do corpo
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão de braço (`flexao`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `cotovelo.cima` | 10 graus | consenso | guia | em cima: braços estendidos (sem travar) |
| `peito.aoChao` | 5 cm | consenso | guia | embaixo: peito a poucos centímetros do chão |
| `maos.alemDoOmbro` | 12 cm | consenso | guia | mãos um pouco mais abertas que os ombros: a borda de dentro da mão fica 2 cm para fora da linha de fora do ombro (meia largura bideltoide 23,9 + meia largura da mão 4,3 + 2 = 30,2 cm do meio do corpo; o centro do ombro fica a 18,4). Antes eram 6 cm, que punham a mão debaixo do ombro, e não para fora dele |
| `maos.abaixoDoOmbro` | 13 cm | consenso | guia | mãos na linha do meio do peito (distância do ombro em direção aos pés, com o corpo embaixo) |
| `cotovelos.doTronco` | 45 graus | consenso | guia | cotovelos indo para trás, a meio caminho do tronco |
| `pes.meiaDistancia` | 8,7 cm | consenso | guia | pés na largura do quadril |
| `tornozelo.dorsiflexao` | 10 graus | desenho | desenho | apoio na ponta dos pés: o tornozelo fica perto do neutro |
| `joelho` | 4 graus | consenso | guia | pernas estendidas (corpo em prancha) |
| `escapula.retracaoEmbaixo` | 8 graus | desenho | desenho | as escápulas se aproximam na descida; a ficha não dá número |
| `erro.quadril.queda` | 16 graus | desenho | desenho | erro: o quadril cai (extensão da lombar somada) |
| `erro.cot.doTronco` | 88 graus | desenho | desenho | erro: cotovelos abertos a ~90° |
| `erro.curta.fracao` | 0,5 fração | desenho | desenho | erro: desce só até a metade |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,4 s | inspira | prancha | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |
| Embaixo | pausa | 0,35 s | firme | peito perto do chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- corpo em linha reta da cabeça aos calcanhares (consenso)
- embaixo, o peito fica a poucos centímetros do chão (consenso)
- cotovelos a meio caminho entre o tronco e os lados (consenso)

Erros desenhados:

- Quadril cai (vista: lateral): a lombar arqueia e o quadril sai da linha
- Cotovelos abertos a 90° (vista: cima): os cotovelos vão para os lados
- Descer pouco (vista: lateral): desce só até a metade

Fontes desta ficha:

- `guia`: Guia original do projeto, como registrado em docs/pesquisa/animacoes/flexao.md: consenso de treinadores
- `aaos`: Tabela de amplitudes da AAOS, lida em transcrição secundária (docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A3)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Agachamento goblet com calcanhar elevado (`goblet`)

Ficha da técnica: `docs/pesquisa/animacoes/goblet.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `joelho.cima` | 8 graus | consenso | guia | em cima: joelhos quase estendidos, sem travar |
| `joelho.baixo` | 126 graus | consenso | guia | embaixo: quadril na altura do joelho ou abaixo; a média de flexão do joelho é 140 (cdc) |
| `tronco.cima` | 3 graus | consenso | guia | em pé, peito alto |
| `tronco.baixo` | 27 graus | desenho | desenho | inclinação do tronco embaixo, com o peito alto e a lombar neutra; a ficha não dá número |
| `pes.meiaDistancia` | 19 cm | consenso | guia | pés um pouco mais abertos que o quadril (meia largura do quadril: 16,2) |
| `pes.paraFora` | 15 graus | consenso | guia | pontas levemente para fora |
| `maos.aberturaDaConcha` | 22 graus | desenho | desenho | quanto cada mão abre para fora, a partir da vertical do halter, para a cabeça de cima apoiar na palma; a ficha pede as mãos em concha embaixo da anilha de cima e não dá número |
| `maos.giroParaFrente` | 20 graus | desenho | desenho | quanto a mão fica girada para a frente em volta do halter (o polegar do lado do peito) |
| `maos.meiaEspessuraDaPalma` | 1,6 cm | desenho | desenho | do meio da mão até a pele da palma, onde a cabeça do halter apoia |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb); entra no equilíbrio |
| `erro.raso.joelho` | 72 graus | desenho | desenho | erro: parar alto |
| `erro.lombar.tronco` | 45 graus | desenho | desenho | erro: o peito cai (inclinação do peito embaixo; no certo são 27) |
| `erro.lombar.lombar` | 35 graus | desenho | desenho | erro: a lombar arredonda: a bacia gira 17 graus para trás em relação ao certo e a lombar dobra o que falta até o peito |
| `erro.valgo.joelho` | 9 cm | desenho | desenho | erro: quanto cada joelho cai para dentro da linha do pé |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,4 s | firme | ~2–3 s | consenso |
| Embaixo · sem quicar | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- embaixo, o quadril fica na altura do joelho ou abaixo (consenso)
- o joelho segue a direção da ponta do pé (consenso)
- o peso fica no meio do pé, com o calcanhar apoiado (consenso)
- a lombar não arredonda (consenso)

Erros desenhados:

- Joelhos para dentro (vista: frontal): os joelhos saem da linha dos pés, para dentro
- Tronco cai e a lombar arredonda (vista: lateral): o tronco inclina demais e a lombar flexiona
- Descer pouco (vista: lateral): para com o joelho a 72° em vez de 126°

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/goblet.md: consenso de treinadores
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `equilibrio`: Em pé, parado, a projeção do centro de massa cai dentro do apoio dos pés (mecânica); a ficha pede o peso no meio do pé
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Panturrilha em pé no step (`panturrilha-b`)

Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-bilateral-step.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 4 graus | consenso | guia | joelhos quase estendidos e parados (a ficha não dá número: 4 graus) |
| `bola.daBeirada` | 2 cm | desenho | desenho | a bola dos pés apoia 2 cm para dentro da borda do step; os calcanhares ficam no ar |
| `calcanhar.embaixo` | 6,4 cm | desenho | hoje | alongado: o calcanhar 6,4 cm abaixo da borda do step (como na animação de hoje); a ficha pede 'o mais baixo que der' |
| `calcanhar.topo` | 13,9 cm | desenho | hoje | topo: o calcanhar 13,9 cm acima do step (como na animação de hoje); a ficha pede 'o mais alto possível' |
| `apoio.maoAoLado` | 47 cm | desenho | bulgaro | a mão esquerda na coluna da estação, 47 cm à esquerda do meio do corpo (como no búlgaro) |
| `apoio.maoAltura` | 105 cm | desenho | desenho | a mão na coluna a 118 cm do chão (no búlgaro, 100 cm com os pés no chão; aqui o corpo está 15 cm mais alto, no step) |
| `apoio.maoAFrenteDaBola` | 5 cm | desenho | desenho | a mão na coluna 5 cm à frente da bola do pé (mais à frente, de lado ela aparecia na frente do tronco, segurando o nada: a coluna é cenário e não é desenhada de perfil) |
| `bracos.paraFora` | 7 graus | desenho | bulgaro | o braço do halter pende ao lado do corpo, 7 graus afastado para o halter não bater na coxa |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb); entra no equilíbrio |
| `step.x` | -22 cm | desenho | desenho | o meio do step fica 22 cm à direita do meio do corpo, para a base da coluna caber à esquerda |
| `erro.curta.calcanhar` | 1,5 cm | desenho | hoje | erro: embaixo o calcanhar para 1,5 cm acima da borda do step, sem passar dela (como na animação de hoje) |
| `erro.joelho.flexao` | 25 graus | desenho | hoje | erro: embaixo os joelhos dobram 25 graus e esticam na subida, dando impulso (na animação de hoje o quadril cai 7 cm) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado · pausa | pausa | 2 s | inspira | 2 s | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,8 s | firme | ~1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os joelhos ficam quase estendidos e parados (consenso)
- alongado: os calcanhares abaixo da borda do step (consenso)
- topo: o mais alto possível na ponta dos pés (13,9 cm acima do step) (consenso)
- o centro de massa fica sobre a bola dos pés: o corpo sobe reto, sem balançar para a frente (consenso)
- a mão na estação só equilibra: fica parada (consenso)

Erros desenhados:

- Não descer os calcanhares (vista: lateral): embaixo os calcanhares param acima da borda do step
- Dobrar e esticar os joelhos (vista: lateral): embaixo os joelhos dobram 25 graus e esticam na subida

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/panturrilha-bilateral-step.md e no texto do app (src/conteudo/exercicios/panturrilha-b.json): consenso de treinadores. As pontas dos dois pés (a bola do pé) na borda do step, calcanhares para fora; pés na largura do quadril, apontando para a frente; joelhos quase estendidos e parados; um halter numa mão e a outra mão na estação
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/panturrilha-b.ts): o calcanhar de 6,4 cm abaixo a 13,9 cm acima do step de 15 cm e os erros
- `bulgaro`: Ficha de movimento do búlgaro aprovado (src/engine/novo/dados/movimentos/bulgaro.json): a mão livre na coluna da estação ao lado do corpo (47 cm do meio) e o braço do halter afastado 7 graus
- `objetos`: src/engine/novo/dados/objetos.json (halter de 25 lb) e dados/objetos/step.json (Reebok Step, 15 cm)
- `equilibrio`: Na ponta dos pés, o apoio é só a bola dos pés: o centro de massa (corpo + halter) tem de ficar sobre ela, para a frente, e entre os dois pés, de lado (mecânica); a mão só equilibra
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Panturrilha em pé no chão (`panturrilha-chao`)

Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-chao.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 4 graus | consenso | ficha | joelhos estendidos, sem travar (a ficha não dá número: 4 graus de folga) |
| `calcanhar.topo` | 12 cm | desenho | hoje | em cima, o calcanhar sobe o máximo: 12 cm acima do chão (o que a animação aprovada de hoje sobe); a ficha não dá número |
| `parede.aFrenteDaBola` | 40 cm | desenho | hoje | a face da parede fica 31 cm à frente da bola do pé (44 cm à frente do tornozelo, como hoje) |
| `maos.altura` | 145 cm | desenho | hoje | o centro das palmas na parede, a 128 cm do chão (como hoje) |
| `maos.meiaDistancia` | 20 cm | desenho | hoje | cada palma a 20 cm do meio do corpo (como hoje) |
| `livre.sobe` | 6 cm | desenho | desenho | no topo, a bola do pé que sai do chão sobe 6 cm acima do pé de apoio ('tire um pé do chão'; a ficha não dá número) |
| `livre.atras` | 12 cm | desenho | desenho | o pé que sai do chão vai 12 cm para trás, com o joelho dobrado, para não encostar no outro |
| `erro.curta.fracao` | 0,5 fração | desenho | hoje | erro: o calcanhar sobe só a metade (como hoje) |
| `erro.joelho.flexao` | 30 graus | desenho | hoje | erro: embaixo os joelhos dobram 30 graus e esticam na subida, dando impulso (na animação de hoje o quadril cai 8,6 cm) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,6 s | inspira | os dois calcanhares no chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s, com as duas pernas | consenso |
| Topo · segura | pausa | 0,5 s | firme | segure 1 s | consenso |
| Topo · tira um pé | conc | 0,6 s | firme | tire um pé do chão | um estudo |
| Descida · excêntrica | exc | 3 s | inspira | ~3 s, numa perna só | um estudo |
| Embaixo · volta o pé | conc | 0,6 s | inspira | volte o outro pé | um estudo |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- os joelhos ficam estendidos, sem travar, e parados (consenso)
- em cima, o calcanhar sobe o máximo (12 cm acima do apoio) (consenso)
- o centro de massa fica sobre a bola do pé: o corpo sobe reto, sem balançar para a frente (consenso)
- as mãos na parede só equilibram: ficam paradas (consenso)

Erros desenhados:

- Subida curta (vista: lateral): o calcanhar sobe só a metade
- Dobrar os joelhos (vista: lateral): embaixo os joelhos dobram e esticam na subida, dando impulso

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/panturrilha-chao.md) e texto do app (src/conteudo/exercicios/panturrilha-chao.json): em pé, pés na largura do quadril, mãos na parede só para equilibrar, joelhos estendidos sem travar; consenso (nsca2021, não verificado)
- `nakamura2025`: Nakamura M et al. Eur J Appl Physiol 2025;125(9):2625–2635, PMID 40229595 (resumo lido no PubMed): subir com as duas pernas e descer em 3 s com uma só, com o peso do corpo, aumentou a espessura do músculo (um estudo; regra selecao.panturrilha-alongada e seção 'Uma perna de cada vez' da ficha da técnica)
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/panturrilha-chao.ts): o quanto o calcanhar sobe (de 7 a 19 cm do tornozelo ao chão, 12 cm), a parede a 44 cm à frente do tornozelo, as mãos a 128 cm do chão e 20 cm do meio do corpo, e os erros
- `equilibrio`: Na ponta dos pés, o apoio é só a bola do pé: o centro de massa (corpo + carga) tem de ficar sobre ela para o corpo subir reto, sem balançar para a frente (mecânica)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Panturrilha no degrau da escada (`panturrilha-degrau`)

Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-degrau.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 4 graus | consenso | ficha | joelhos estendidos, sem travar (a ficha não dá número: 4 graus de folga) |
| `bola.daBeirada` | 2 cm | desenho | desenho | a bola do pé apoia 2 cm para dentro da beirada do degrau ('a ponta dos pés na beirada'); o calcanhar fica no ar |
| `calcanhar.embaixo` | 6 cm | um estudo | kassiano2023b | embaixo, o calcanhar fica bem abaixo do degrau: 6 cm abaixo da beirada (6,4 cm na animação de hoje); limitado pela dorsiflexão (ver a conferência escrita) |
| `calcanhar.topo` | 13,9 cm | desenho | hoje | em cima, na ponta dos pés: o calcanhar 13,9 cm acima do degrau (como na animação de hoje); a ficha não dá número |
| `corrimao.aFrenteDaBola` | 22 cm | desenho | desenho | a mão esquerda segura o corrimão 22 cm à frente da bola do pé |
| `corrimao.aoLado` | 40 cm | desenho | desenho | o corrimão fica 40 cm à esquerda do meio do corpo (a pessoa no meio de uma escada de 90 cm, o corrimão 5 cm para dentro da borda) |
| `bracoLivre.paraFora` | 6 graus | desenho | desenho | o braço direito, solto, pende ao lado do corpo, 6 graus afastado |
| `erro.curta.calcanhar` | 0 cm | desenho | hoje | erro: o calcanhar só desce até a altura do degrau (na animação de hoje, 1,5 cm acima dela) |
| `erro.puxar.troncoEmbaixo` | -3 graus | desenho | hoje | erro: embaixo, o corpo pende para trás, pendurado no braço (hoje: 6 graus na lombar e no tórax; aqui o corpo inteiro inclina em linha e o tronco só 3 graus) |
| `erro.puxar.troncoEmCima` | 4 graus | desenho | hoje | erro: na subida, o braço puxa o corpo para a frente; o corpo inclina em linha e o tronco mais 4 graus (hoje, 16 graus só no tronco, que dobrava o corpo) |
| `erro.puxar.cm` | 8 cm | desenho | desenho | erro: com o braço puxando, o centro de massa sai da vertical da bola do pé (até 8 cm à frente em cima e 4,8 cm atrás embaixo) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo · pausa | pausa | 1,5 s | inspira | 1 a 2 s, sem quicar | um estudo |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Descida · excêntrica | exc | 2,5 s | inspira | 2 a 3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os joelhos ficam estendidos, sem travar, e parados (consenso)
- embaixo, o calcanhar fica bem abaixo do degrau (um estudo)
- em cima, na ponta dos pés (13,9 cm acima do degrau) (consenso)
- o centro de massa fica sobre a bola do pé: o corpo sobe reto, sem balançar para a frente (consenso)
- a mão no corrimão só equilibra: fica parada (consenso)

Erros desenhados:

- Descer pouco (vista: lateral): o calcanhar para na altura do degrau, sem passar a beirada
- Puxar com a mão (vista: lateral): o braço dobra e puxa o corpo para a frente na subida; embaixo, o corpo pende para trás, pendurado no braço

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/panturrilha-degrau.md) e texto do app (src/conteudo/exercicios/panturrilha-degrau.json): a ponta dos pés na beirada do degrau, os calcanhares no ar, pés na largura do quadril, uma mão no corrimão só para equilibrar, subida na ponta dos pés; consenso (Renaissance Periodization, vídeo não conferido por dentro; kinoshita2023)
- `kassiano2023b`: Kassiano W et al. J Strength Cond Res 2023;37(9):1746–1753, PMID 37015016 (resumo lido no PubMed): a metade de baixo do movimento, com o músculo alongado, cresceu mais (um estudo): o calcanhar desce bem abaixo do degrau, com pausa
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/panturrilha-degrau.ts): o calcanhar de 6,4 cm abaixo a 13,9 cm acima do degrau (do tornozelo ao degrau de 15 cm), o ritmo e os erros
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1): dorsiflexão média 14,8°, máximo observado 48°
- `objetos`: src/engine/novo/dados/objetos/escada.json (ABNT NBR 9077:2001: degrau, piso e corrimão)
- `equilibrio`: Na ponta dos pés, o apoio é só a bola do pé: o centro de massa (corpo + carga) tem de ficar sobre ela para o corpo subir reto, sem balançar para a frente (mecânica); a mão só equilibra
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Panturrilha sentada com halter no joelho (`panturrilha-sentada-halter`)

Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-sentada-halter.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, apontando para a frente |
| `joelho` | 90 graus | consenso | ficha | joelhos a ~90° com o calcanhar na altura do apoio; a distância do apoio ao banco sai deste ângulo |
| `assento.amassa` | 1 cm | desenho | desenho | o glúteo e a coxa afundam 1 cm no estofado do banco |
| `banco.frenteDoQuadril` | 10 cm | desenho | desenho | a ponta do banco fica 10 cm à frente do centro do quadril: sentado na ponta, a coxa sai do banco |
| `bola.daBeirada` | 2 cm | desenho | desenho | a bola do pé apoia 2 cm para dentro da beirada do degrau baixo (o step, na altura de 15 cm); o calcanhar fica no ar |
| `calcanhar.embaixo` | 8,5 cm | um estudo | kassiano2023b | embaixo, o calcanhar desce 8,5 cm abaixo da beirada do apoio ('até o alongamento máximo'; a ficha não dá número): com o joelho dobrado e a canela inclinada para trás, é o que leva a dorsiflexão perto da média do CDC (14,8°); com 5 cm ela ficava em 2° |
| `calcanhar.topo` | 10 cm | desenho | hoje | em cima, o calcanhar 10 cm acima do apoio (com 11 cm a flexão plantar passava da média do CDC, 56,7°) (na animação de hoje, o tornozelo sobe 12 cm do alongado ao topo) |
| `halter.doJoelho` | 8 cm | desenho | hoje | o halter deitado atravessado sobre a coxa direita, perto do joelho: o cabo a 8 cm do centro do joelho, ao longo da coxa (na animação de hoje, 6 cm) |
| `maoL.paraDentro` | 0,6 proporção | desenho | desenho | a mão esquerda vem do outro lado do corpo: os dedos apontam para o joelho e um pouco para dentro (para o lado direito), quanto para o lado em relação a para a frente |
| `toalha.esp` | 2 cm | desenho | objetos | a toalha de mão dobrada em quatro entre o halter e a coxa (4 camadas de 0,5 cm) |
| `erro.curta.fracao` | 0,4 fração | desenho | hoje | erro: o calcanhar só faz 40% do caminho, embaixo e em cima (como hoje) |
| `erro.tronco.lombar` | -10 graus | desenho | hoje | erro: na subida a lombar estende 10 graus e o tronco vai para trás (hoje, 14 graus) |
| `erro.tronco.toracica` | -12 graus | desenho | hoje | erro: as costas de cima vão 12 graus para trás (hoje, 16 graus) |
| `erro.halter.doJoelho` | 22 cm | desenho | hoje | erro: o halter escorrega para o meio da coxa, 22 cm do joelho (na animação de hoje, 14 cm mais para trás) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |
| Embaixo · alongado | pausa | 1 s | firme | ~1 s | um estudo |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme |  | consenso |

Contatos que não podem sair do lugar: `pelve`, `pe.R`, `pe.L`.

Regras que a conferência mede:

- sentado, os joelhos a ~90° (consenso)
- embaixo, o calcanhar desce até o alongamento máximo, abaixo do apoio (um estudo)
- em cima, o calcanhar o mais alto possível (10 cm acima do apoio) (consenso)
- o tronco fica reto e parado (consenso)
- o halter deitado sobre a coxa, perto do joelho (consenso)

Erros desenhados:

- Amplitude curta (vista: lateral): o calcanhar sobe pouco e desce pouco
- Levantar o tronco (vista: lateral): na subida o tronco vai para trás e sobe com o halter
- Halter escorregando (vista: lateral): o halter escorrega para o meio da coxa, e as mãos vão com ele

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/panturrilha-sentada-halter.md) e texto do app (src/conteudo/exercicios/panturrilha-sentada-halter.json): sentado, joelhos a ~90°, pés na largura do quadril, ponta dos pés num apoio baixo (uma anilha, um livro grosso, um degrau); o halter deitado sobre a coxa, perto do joelho, sobre uma toalha dobrada, segurado com as duas mãos; tronco reto e parado; consenso (nsca2021, não verificado)
- `kassiano2023b`: Kassiano W et al. J Strength Cond Res 2023;37(9):1746–1753, PMID 37015016 (resumo lido no PubMed): a parte alongada rendeu mais (um estudo): a ponta dos pés num apoio para o calcanhar descer, pausa de ~1 s embaixo
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/panturrilha-sentada-halter.ts): o tornozelo sobe 12 cm do alongado ao topo, o halter perto do joelho, a ordem das fases (começa pela descida) e os erros
- `objetos`: src/engine/novo/dados/objetos.json (banco reto, halter de 25 lb), dados/objetos/step.json (o step como degrau baixo) e dados/objetos/toalha.json (a toalha de mão dobrada em quatro: 2 cm)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Panturrilha unilateral no step (`panturrilha`)

Ficha da técnica: `docs/pesquisa/animacoes/panturrilha.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | o pé de apoio (direito) a 9 cm do meio do corpo, na linha do quadril |
| `joelho` | 4 graus | consenso | guia | joelho da perna de apoio quase estendido e parado (a ficha não dá número: 4 graus) |
| `bola.daBeirada` | 2 cm | desenho | desenho | a bola do pé apoia 2 cm para dentro da borda do step; o calcanhar fica no ar |
| `calcanhar.embaixo` | 6,4 cm | desenho | hoje | alongado: o calcanhar 6,4 cm abaixo da borda do step (como na animação de hoje); a ficha pede 'o mais baixo que der' |
| `calcanhar.topo` | 13,9 cm | desenho | hoje | topo: o calcanhar 13,9 cm acima do step (como na animação de hoje); a ficha pede 'o mais alto possível' |
| `livre.coxa` | 5 graus | desenho | hoje | a perna livre dobrada atrás: a coxa 5 graus à frente da vertical (na animação de hoje, quase na vertical) |
| `livre.joelho` | 50 graus | desenho | hoje | a perna livre: o joelho dobrado 50 graus (na animação de hoje, a canela 38 graus abaixo da horizontal), o pé atrás, longe do step |
| `livre.tornozelo` | 25 graus | desenho | desenho | o pé solto aponta 25 graus para baixo (relaxado) |
| `apoio.maoAoLado` | 40 cm | desenho | bulgaro | a mão esquerda na coluna da estação, 47 cm à esquerda do meio do corpo (como no búlgaro) |
| `apoio.maoAltura` | 110 cm | desenho | desenho | a mão na coluna a 118 cm do chão (no búlgaro, 100 cm com os pés no chão; aqui o corpo está 15 cm mais alto, no step) |
| `apoio.maoAFrenteDaBola` | 5 cm | desenho | desenho | a mão na coluna 5 cm à frente da bola do pé (mais à frente, de lado ela aparecia na frente do tronco, segurando o nada: a coluna é cenário e não é desenhada de perfil) |
| `bracos.paraFora` | 7 graus | desenho | bulgaro | o braço do halter pende ao lado do corpo, 7 graus afastado para o halter não bater na coxa |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb); entra no equilíbrio |
| `step.x` | -32 cm | desenho | desenho | o meio do step fica 22 cm à direita do meio do corpo, para a base da coluna caber à esquerda |
| `erro.curta.calcanhar` | 1,5 cm | desenho | hoje | erro: embaixo o calcanhar para 1,5 cm acima da borda do step, sem passar dela (como na animação de hoje) |
| `erro.joelho.flexao` | 25 graus | desenho | hoje | erro: embaixo o joelho dobra 25 graus e estica na subida, dando impulso (na animação de hoje o quadril cai 7 cm) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado · pausa | pausa | 2 s | inspira | 2 s | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,8 s | firme | ~1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- o joelho da perna de apoio fica quase estendido e parado (consenso)
- alongado: o calcanhar abaixo da borda do step (consenso)
- topo: o mais alto possível na ponta do pé (13,9 cm acima do step) (consenso)
- o centro de massa fica sobre a bola do pé: o corpo sobe reto, sem balançar para a frente (consenso)
- a mão na torre só equilibra: fica parada (consenso)

Erros desenhados:

- Não descer o calcanhar (vista: lateral): embaixo o calcanhar para acima da borda do step
- Dobrar e esticar o joelho (vista: lateral): embaixo o joelho dobra 25 graus e estica na subida

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/panturrilha.md e no texto do app (src/conteudo/exercicios/panturrilha.json): consenso de treinadores. A bola do pé na borda do step, calcanhar para fora; a outra perna dobrada atrás, sem apoiar; joelho de apoio quase estendido e parado; halter na mão do mesmo lado; a outra mão na torre
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/panturrilha.ts): o calcanhar de 6,4 cm abaixo a 13,9 cm acima do step de 15 cm, a perna livre dobrada atrás e os erros
- `bulgaro`: Ficha de movimento do búlgaro aprovado (src/engine/novo/dados/movimentos/bulgaro.json): a mão livre na coluna da estação ao lado do corpo (47 cm do meio) e o braço do halter afastado 7 graus
- `objetos`: src/engine/novo/dados/objetos.json (halter de 25 lb) e dados/objetos/step.json (Reebok Step, 15 cm)
- `equilibrio`: Na ponta do pé, o apoio é só a bola do pé: o centro de massa (corpo + halter) tem de ficar sobre ela, para a frente e de lado (mecânica); a mão só equilibra
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Flexão com o quadril alto (pike) (`pike`)

Ficha da técnica: `docs/pesquisa/animacoes/pike.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `maos.alemDoOmbro` | 12 cm | consenso | flexao | mãos um pouco mais abertas que os ombros: o mesmo afastamento da flexão aprovada (centro da mão a 30,2 cm do meio do corpo) |
| `maos.aFrenteDosPes` | 94 cm | desenho | hoje | distância no chão da bola do pé ao centro da palma (hoje: o punho a ~107 cm do tornozelo). Quanto mais perto, mais em pé fica o tronco (cartão, 'vary') |
| `pes.meiaDistancia` | 8,7 cm | consenso | flexao | pés na largura do quadril, como na flexão |
| `calcanhar.sobe` | 35 graus | desenho | hoje | apoio na ponta dos pés: o calcanhar fica levantado e parado (hoje: o calcanhar a ~9 cm do chão); 35° deixa a dorsiflexão do tornozelo embaixo dentro da média |
| `joelho` | 5 graus | consenso | guia | pernas estendidas (o cartão aceita os joelhos um pouco dobrados) |
| `quadril.cima` | 105 graus | desenho | hoje | em cima: a flexão do quadril que faz o V de cabeça para baixo (hoje: 100 a 109°) |
| `cotovelo.cima` | 10 graus | consenso | guia | em cima: braços estendidos (sem travar), como na flexão |
| `cabeca.aoChao` | 5 cm | desenho | desenho | embaixo: o ponto mais baixo da cabeça a poucos centímetros do chão ('perto do chão, sem encostar'; a ficha não dá número) |
| `cabeca.naLinhaDasMaos` | 8 cm | desenho | desenho | embaixo: o ponto mais baixo da cabeça na linha das mãos, 8 cm à frente do centro das palmas (entre o punho e a ponta dos dedos). Com a cabeça no centro das palmas (0 cm), de lado ela se embolava com a mão de perto e o antebraço; a ficha pede 'até a linha delas', sem número |
| `cotovelos.doTronco` | 45 graus | consenso | guia | cotovelos para trás, a meio caminho entre o tronco e os lados (cartão, erro 'cot') |
| `pescoco.flexao` | 0 graus | desenho | desenho | pescoço e cabeça na linha do tronco (a ficha não diz para onde olhar) |
| `erro.quadril.ombrosAFrente` | 8 cm | desenho | desenho | erro: embaixo, os ombros passam 8 cm à frente das mãos (vira flexão) |
| `erro.cot.doTronco` | 88 graus | desenho | desenho | erro: cotovelos abertos a ~90° |
| `erro.curta.fracao` | 0,45 fração | desenho | desenho | erro: desce só até menos da metade |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,4 s | inspira | quadril alto | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |
| Embaixo | pausa | 0,35 s | firme | cabeça perto do chão | consenso |
| Subida · concêntrica | conc | 1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- o quadril continua alto: fica acima dos ombros e os ombros não passam à frente das mãos (consenso)
- embaixo, a cabeça fica perto do chão, sem encostar, na linha das mãos e entre elas (consenso)
- pernas estendidas o ciclo inteiro (consenso)
- cotovelos para trás, a meio caminho entre o tronco e os lados (consenso)

Erros desenhados:

- Quadril desce e vira flexão (vista: lateral): o quadril baixa e os ombros passam à frente das mãos
- Cotovelos abertos para os lados (vista: quina): os cotovelos vão para os lados
- Descer pouco (vista: lateral): a cabeça para longe do chão

Fontes desta ficha:

- `guia`: Ficha da técnica (docs/pesquisa/animacoes/pike.md) e cartão do app (src/conteudo/exercicios/pike.json): consenso de treinadores, sem estudo (P4 de docs/pesquisa-v2/10-equipamento-minimo.md)
- `flexao`: A flexão aprovada no motor novo (dados/movimentos/flexao.json), de onde a ficha da técnica manda partir: mãos, punho e dedos iguais
- `hoje`: Animação de hoje (src/engine/exercicios/pike.ts, aprovada em 04/11/2026), medida em docs/revisoes/animacao-nova/diagnostico/medidas-de-hoje.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Ponte de glúteo com halter (`ponte-gluteo-halter`)

Ficha da técnica: `docs/pesquisa/animacoes/ponte-gluteo-halter.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `quadril.folgaEmbaixo` | 1,5 cm | desenho | desenho | embaixo: o quadril quase encosta no chão (da pele do glúteo ao chão); a ficha diz "quase" e não dá número |
| `quadril.topo` | 0 graus | consenso | ponte | em cima: ombros, quadril e joelhos em linha (o ângulo no quadril, de lado, é 180°) |
| `canela.topo` | 0 graus | consenso | correcao | em cima, a canela fica em pé (na vertical): é o que põe o pé no chão; embaixo, a conferência mede a distância do calcanhar ao glúteo (cerca de um palmo, na ficha) |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `carga.aFrenteDoQuadril` | 0 cm | consenso | ficha | o halter deitado de través na dobra do quadril: embaixo, ele assenta onde fica mais baixo, entre a barriga e as coxas (a dobra); daí anda preso à bacia e desce na vertical até encostar no corpo. Este número o empurra além da dobra (0 = na dobra) |
| `maos.naCabeca.acima` | 2 cm | desenho | hoje | cada mão segura uma cabeça pela ponta de fora ("as mãos seguram as anilhas pelos lados", conferência de hoje): o centro da pegada fica na face de fora, 2 cm acima do eixo do cabo |
| `maos.naCabeca.diam` | 6 cm | desenho | desenho | o quanto a mão fecha em volta da ponta da cabeça (o diâmetro da pegada) |
| `maos.poloFora` | 0,6 proporção | desenho | correcao | para onde o cotovelo aponta: para fora (0,6) e para baixo (−1 na vertical), até o chão ao lado da cintura (correção de 10/11) |
| `maos.poloCabeca` | 0,6 proporção | desenho | correcao | o cotovelo aponta também um pouco para o lado da cabeça (o antebraço sobe do chão ao halter) |
| `maos.alcance` | 0,95 fração | desenho | hoje | só no erro do halter rolando: a mão que solta vai ao chão ao lado do corpo, como na ponte sem carga (o punho a 95% do braço mais o antebraço a partir do ombro) |
| `maos.paraFora` | 10 cm | desenho | hoje | só no erro do halter rolando: a mão que solta fica 10 cm para fora da linha do ombro |
| `erro.lombar.lombar` | -22 graus | desenho | desenho | erro: no topo, a lombar arqueia 22 graus |
| `erro.lombar.bacia` | 0,7 fração | desenho | desenho | erro: a bacia inclina menos o equivalente a 70% do que a lombar arqueia (o quadril não estende tudo) |
| `erro.rola.lado` | 14 cm | desenho | hoje | erro: o halter escorrega 14 cm para o lado direito (como na animação de hoje) e assenta de novo no corpo, com a cabeça da direita para fora do quadril |
| `erro.calcanhar.calc` | 40 graus | desenho | desenho | erro: o calcanhar sobe até o pé ficar 40 graus da horizontal, na ponta do pé |
| `erro.raso.fracao` | 0,4 fração | desenho | desenho | erro: o quadril para em 40% do caminho |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Deitado | pausa | 0,5 s | inspira | firme o abdômen | consenso |
| Subida · concêntrica | conc | 1,2 s | expira | ~1 s | consenso |
| Topo · segura | pausa | 1 s | firme | ~1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `costas`.

Regras que a conferência mede:

- ombros e cabeça ficam no chão o tempo todo, sem os ombros saírem do lugar (consenso)
- embaixo, o quadril quase encosta no chão (consenso)
- em cima, ombros, quadril e joelhos em linha (consenso)
- sem arquear a lombar no topo (consenso)
- empurra pelos calcanhares: o pé inteiro fica no chão (consenso)
- pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; no topo, a canela em pé (consenso)
- as duas mãos seguram o halter o tempo todo, pelas pontas (consenso)
- o halter deitado de través na dobra do quadril, apoiado (sem atravessar a barriga nem as coxas), sobe e desce com o quadril (consenso)

Erros desenhados:

- Arquear a lombar no topo (vista: lateral): no topo, a lombar arqueia e a barriga sobe, com o quadril menos estendido
- Halter rolando (vista: cima): a mão esquerda solta e o halter escorrega para o lado direito, na lateral do quadril
- Empurrar pela ponta dos pés (vista: lateral): o calcanhar sai do chão e o pé fica na ponta
- Subir pouco (vista: lateral): o quadril para em 40% do caminho, abaixo da linha ombro–joelho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/ponte-gluteo-halter.md): consenso de treinadores (nsca2021, não verificado; seguranca-t5)
- `ponte`: Ficha da ponte sem carga (docs/pesquisa/animacoes/ponte-gluteo.md): a mesma ponte, consenso
- `app`: Texto do app (src/conteudo/exercicios/ponte-gluteo-halter.json), que sai da ficha
- `correcao`: Correções já feitas (docs/revisoes/animacao-nova/correcoes-ja-feitas.md): 04/11, na ponte, ombro, quadril e joelho em linha e canela em pé; 10/11, na ponte com halter, cotovelos apoiados no chão ao lado da cintura ("o braço está estranho")
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/ponte-gluteo-halter.ts) e a conferência dela (docs/revisoes/r5-anim/conferencia/ponte-gluteo-halter.md): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json (halter)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Ponte de glúteo (`ponte-gluteo`)

Ficha da técnica: `docs/pesquisa/animacoes/ponte-gluteo.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `quadril.folgaEmbaixo` | 1,5 cm | desenho | desenho | embaixo: o quadril quase encosta no chão (da pele do glúteo ao chão); a ficha diz "quase" e não dá número |
| `quadril.topo` | 0 graus | consenso | ficha | em cima: ombros, quadril e joelhos em linha (o ângulo no quadril, de lado, é 180°) |
| `canela.topo` | 0 graus | consenso | correcao | em cima, a canela fica em pé (na vertical): é o que põe o pé no chão; embaixo, a conferência mede a distância do calcanhar ao glúteo (cerca de um palmo, na ficha) |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `maos.alcance` | 0,95 fração | desenho | hoje | braços no chão ao lado do corpo, palmas para baixo, cotovelo quase estendido: o punho fica, na direção dos pés, a 95% do braço mais o antebraço a partir do ombro (54,4 cm no homem) |
| `maos.paraFora` | 10 cm | desenho | hoje | os braços um pouco abertos (a ficha: "um pouco abertos", para o braço não cobrir o tronco de lado) |
| `erro.lombar.lombar` | -22 graus | desenho | desenho | erro: no topo, a lombar arqueia 22 graus |
| `erro.lombar.bacia` | 0,7 fração | desenho | desenho | erro: a bacia inclina menos o equivalente a 70% do que a lombar arqueia (o quadril não estende tudo) |
| `erro.calcanhar.calc` | 40 graus | desenho | desenho | erro: o calcanhar sobe até o pé ficar 40 graus da horizontal, na ponta do pé |
| `erro.raso.fracao` | 0,4 fração | desenho | desenho | erro: o quadril para em 40% do caminho |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Deitado | pausa | 0,5 s | inspira | firme o abdômen | consenso |
| Subida · concêntrica | conc | 1,2 s | expira | ~1 s | consenso |
| Topo · segura | pausa | 1 s | firme | ~1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `mao.R`, `mao.L`.

Regras que a conferência mede:

- ombros e cabeça ficam no chão o tempo todo, sem os ombros saírem do lugar (consenso)
- embaixo, o quadril quase encosta no chão (consenso)
- em cima, ombros, quadril e joelhos em linha (consenso)
- sem arquear a lombar no topo (consenso)
- empurra pelos calcanhares: o pé inteiro fica no chão (consenso)
- pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; no topo, a canela em pé (consenso)

Erros desenhados:

- Arquear a lombar no topo (vista: lateral): no topo, a lombar arqueia e a barriga sobe, com o quadril menos estendido
- Empurrar pela ponta dos pés (vista: lateral): o calcanhar sai do chão e o pé fica na ponta
- Subir pouco (vista: lateral): o quadril para em 40% do caminho, abaixo da linha ombro–joelho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/ponte-gluteo.md): consenso de treinadores (nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/ponte-gluteo.json), que sai da ficha
- `correcao`: Correção já feita em 04/11/2026 (docs/revisoes/animacao-nova/correcoes-ja-feitas.md, linha da ponte-gluteo): no topo, ombro, quadril e joelho em linha e canela em pé
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/ponte-gluteo.ts): as distâncias que a ficha não dá em número
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Ponte de glúteo com kettlebell (`ponte-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/ponte-kettlebell.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `quadril.folgaEmbaixo` | 1,5 cm | desenho | desenho | embaixo: o quadril quase encosta no chão (da pele do glúteo ao chão); a ficha diz "quase" e não dá número |
| `quadril.topo` | 0 graus | consenso | ponte | em cima: ombros, quadril e joelhos em linha (o ângulo no quadril, de lado, é 180°) |
| `canela.topo` | 0 graus | consenso | correcao | em cima, a canela fica em pé (na vertical): é o que põe o pé no chão; embaixo, a conferência mede a distância do calcanhar ao glúteo (cerca de um palmo, na ficha) |
| `ombro.z` | -50 cm | desenho | desenho | onde ficam os ombros na cena (só posiciona a cena; os ombros não saem do lugar) |
| `carga.aFrenteDoQuadril` | 0 cm | consenso | ficha | o kettlebell deitado de lado sobre o quadril, a base para os pés e a alça para a cabeça: embaixo, a bola assenta onde fica mais baixa, entre a barriga e as coxas (a dobra); daí anda presa à bacia e desce na vertical até encostar no corpo. Este número a empurra além da dobra (0 = na dobra) |
| `kettlebell.tomba` | 25 graus | desenho | desenho | deitado de lado, a alça para a cabeça, inclinada 25 graus abaixo da horizontal (embaixo): o kettlebell tomba para o lado da barriga, como faria apoiado só na bola; se a alça encostar na barriga, a bola sobe o que for preciso |
| `maos.cotoveloNoChao` | 0,3 cm | desenho | correcao | embaixo, o braço fica deitado no chão ao lado do corpo (o cotovelo apoiado, como a correção de 10/11 da ponte com halter): o ponto mais baixo do braço e do antebraço a 0,3 cm do chão; daí sai para onde o cotovelo aponta, para fora |
| `maos.poloCabeca` | 0,6 proporção | desenho | correcao | o cotovelo aponta também um pouco para o lado da cabeça (o antebraço sobe do chão à alça) |
| `maos.alcance` | 0,95 fração | desenho | hoje | só para achar onde o kettlebell assenta (os braços no chão não entram na conta): o punho a 95% do braço mais o antebraço a partir do ombro |
| `maos.paraFora` | 10 cm | desenho | hoje | idem: a mão 10 cm para fora da linha do ombro |
| `erro.lombar.lombar` | -22 graus | desenho | desenho | erro: no topo, a lombar arqueia 22 graus |
| `erro.lombar.bacia` | 0,7 fração | desenho | desenho | erro: a bacia inclina menos o equivalente a 70% do que a lombar arqueia (o quadril não estende tudo) |
| `erro.calcanhar.calc` | 40 graus | desenho | desenho | erro: o calcanhar sobe até o pé ficar 40 graus da horizontal, na ponta do pé |
| `erro.raso.fracao` | 0,4 fração | desenho | desenho | erro: o quadril para em 40% do caminho |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Deitado | pausa | 0,5 s | inspira | firme o abdômen | consenso |
| Subida · concêntrica | conc | 1,2 s | expira | ~1 s | consenso |
| Topo · segura | pausa | 1 s | firme | ~1 s | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `costas`.

Regras que a conferência mede:

- ombros e cabeça ficam no chão o tempo todo, sem os ombros saírem do lugar (consenso)
- embaixo, o quadril quase encosta no chão (consenso)
- em cima, ombros, quadril e joelhos em linha (consenso)
- sem arquear a lombar no topo (consenso)
- empurra pelos calcanhares: o pé inteiro fica no chão (consenso)
- pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; no topo, a canela em pé (consenso)
- as duas mãos seguram o kettlebell o tempo todo, uma de cada lado da alça (consenso)
- o kettlebell deitado de lado sobre o quadril, apoiado (sem atravessar a barriga nem as coxas), sobe e desce com o quadril (consenso)

Erros desenhados:

- Arquear a lombar no topo (vista: lateral): no topo, a lombar arqueia e a barriga sobe, com o quadril menos estendido
- Empurrar pela ponta dos pés (vista: lateral): o calcanhar sai do chão e o pé fica na ponta
- Subir pouco (vista: lateral): o quadril para em 40% do caminho, abaixo da linha ombro–joelho

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/ponte-kettlebell.md): consenso (B.2.6 e a ponte de glúteo)
- `ponte`: Ficha da ponte sem carga (docs/pesquisa/animacoes/ponte-gluteo.md): a mesma ponte, consenso
- `app`: Texto do app (src/conteudo/exercicios/ponte-kettlebell.json), que sai da ficha
- `correcao`: Correções já feitas (docs/revisoes/animacao-nova/correcoes-ja-feitas.md): 04/11, na ponte, ombro, quadril e joelho em linha e canela em pé; 04/11, o kettlebell nunca fica solto entre as mãos (a alça passa pelas duas mãos); 10/11, na ponte com halter, cotovelos apoiados no chão ao lado da cintura (a correção que ficou pendente na ponte com kettlebell)
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/ponte-kettlebell.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json (kettlebell)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Puxada com elástico ancorado no alto (`puxada-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/puxada-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco` | -6 graus | consenso | app | tronco reto ou levemente inclinado para trás |
| `joelhos.meiaDistancia` | 8,7 cm | consenso | app | joelhos na largura do quadril |
| `cotovelo.alongado` | 12 graus | consenso | unilateral | início: braços estendidos para cima e um pouco à frente (o da puxada unilateral) |
| `ombro.sobe` | 10 graus | consenso | unilateral | alongado: deixe os ombros subirem (elevação da clavícula além do ritmo normal) |
| `ombro.desce` | -6 graus | consenso | unilateral | fim: ombros para baixo |
| `braco.fim.atras` | 6 graus | consenso | unilateral | fim: cotovelos ao lado das costelas, um pouco atrás do tronco |
| `braco.fim.fora` | 14 graus | desenho | unilateral | fim: o braço um pouco afastado do tronco, para o cotovelo passar ao lado das costelas |
| `ancora.noTopo` | 1 sim | consenso | app | o meio do elástico preso no topo de uma porta fechada, com a âncora de porta do lado de lá |
| `elastico.esticaNoInicio` | 1,12 vezes | consenso | app | com os braços estendidos, o elástico já um pouco esticado: a distância até a porta sai daqui ("a cerca de um passo") |
| `elastico.noQuadro` | 38 cm | desenho | desenho | quanto do tubo, a partir de cada mão, fica no enquadramento; dali até a porta, ele é cenário (sai pela borda do quadro) |
| `colchonete.z` | -20 cm | desenho | desenho | o meio do colchonete, sob os joelhos e as canelas |
| `erro.tronco` | -30 graus | desenho | unilateral | erro: jogar o tronco para trás |
| `erro.encolher` | 14 graus | desenho | unilateral | erro: os ombros continuam encolhidos no fim |
| `erro.curta` | 0,45 fração | desenho | unilateral | erro: volta só até a metade |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | ombros sobem | consenso |
| Puxada · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Fim | pausa | 0,5 s | firme | o elástico mais esticado | consenso |
| Volta · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `joelho.R`, `joelho.L`, `pe.R`, `pe.L`.

Regras que a conferência mede:

- primeiro os ombros descem: no fim, mais baixos que no alongado (consenso)
- tronco parado, sem jogar para trás (consenso)
- fim: cotovelos ao lado das costelas, mãos perto dos ombros (consenso)
- o antebraço segue a linha do elástico, que puxa a mão para a âncora (desenho)
- o tubo vai das mãos à âncora sem entrar no corpo (desenho)
- uma ponta em cada mão (consenso)

Erros desenhados:

- Jogar o tronco para trás (vista: lateral): o tronco inclina 30° para trás no fim
- Ombros encolhidos (vista: posterior): os ombros continuam encolhidos no fim
- Não alongar em cima (vista: lateral): volta só até a metade

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/puxada-elastico.md): consenso de treinadores; o corpo ajoelhado e o caminho do braço são os da puxada-unilateral aprovada
- `app`: Texto do app (src/conteudo/exercicios/puxada-elastico.json)
- `unilateral`: Ficha de movimento da puxada unilateral ajoelhado (src/engine/novo/dados/movimentos/puxada-unilateral.json): o corpo ajoelhado, o braço e os erros
- `hoje`: A animação de hoje (src/engine/exercicios/puxada-elastico.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json (objeto elastico: o tubo com pegadores de 48 pol) e src/engine/novo/dados/objetos/porta.json (porta e âncora de porta)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Puxada unilateral ajoelhado na polia alta (`puxada-unilateral`)

Ficha da técnica: `docs/pesquisa/animacoes/puxada-unilateral.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco` | -8 graus | consenso | guia | tronco levemente inclinado para trás (a ficha aceita reto ou levemente inclinado; inclinado, o cotovelo dobra menos no fim) |
| `cotovelo.alongado` | 12 graus | consenso | guia | início: braço estendido para cima e para a frente |
| `ombro.sobe` | 10 graus | consenso | guia | alongado: deixe o ombro subir (elevação da clavícula além do ritmo normal) |
| `ombro.desce` | -6 graus | consenso | guia | fim: ombro para baixo |
| `braco.fim.atras` | 6 graus | consenso | guia | fim: cotovelo ao lado das costelas, um pouco atrás do tronco |
| `braco.fim.fora` | 12 graus | desenho | desenho | fim: o braço um pouco afastado do tronco, para o cotovelo passar ao lado das costelas |
| `torre.distancia` | 70 cm | consenso | guia | ajoelhe de frente para a torre, a cerca de meio passo (dos joelhos à base; o passo de um homem de 1,76 m tem perto de 70 a 75 cm). Mais perto que isto o cabo fica tão em pé que o cotovelo dobra além de 155 graus no fim |
| `joelhos.meiaDistancia` | 8,7 cm | consenso | guia | joelhos na largura do quadril |
| `erro.tronco` | -30 graus | desenho | desenho | erro: jogar o tronco para trás |
| `erro.encolher` | 14 graus | desenho | desenho | erro: o ombro continua encolhido no fim |
| `erro.curta` | 0,45 fração | desenho | desenho | erro: volta só até a metade |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | ombro sobe | consenso |
| Puxada · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Fim | pausa | 0,5 s | firme | segura | consenso |
| Volta · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `joelho.R`, `joelho.L`, `pe.R`, `pe.L`.

Regras que a conferência mede:

- o antebraço segue a linha do cabo (o cabo fica reto, da polia à mão) (desenho)
- no fim, o ombro está mais baixo que no início (consenso)
- o tronco quase não se move (consenso)

Erros desenhados:

- Jogar o tronco para trás (vista: lateral): o tronco inclina 30° para trás no fim
- Ombro encolhido (vista: quinaTras): a clavícula continua elevada no fim
- Não alongar em cima (vista: lateral): volta só até a metade

Fontes desta ficha:

- `guia`: Guia original do projeto, como registrado em docs/pesquisa/animacoes/puxada-unilateral.md: consenso de treinadores
- `ludewig2009`: Ludewig PM et al. Motion of the shoulder complex during multiplanar humeral elevation. J Bone Joint Surg Am 2009 (a clavícula e a escápula acompanham o braço; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, C2)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Remada curvada com halteres (`remada-curvada-halteres`)

Ficha da técnica: `docs/pesquisa/animacoes/remada-curvada-halteres.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco.inclinacao` | 62 graus | desenho | hoje | tronco 'bem inclinado': o peito a 62° da vertical, parado a série toda (hoje: ~60°; a ficha não dá número) |
| `joelho` | 20 graus | consenso | ficha | joelhos 'levemente dobrados': 20°, parados |
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril (os centros do quadril ficam a 8,35 cm do meio) |
| `cervical` | -10 graus | desenho | desenho | pescoço na linha das costas, um pouco estendido: o olhar vai ao chão à frente |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `braco.inicio.atras` | 3 graus | desenho | desenho | começo: braço estendido, pendurado embaixo do ombro (o cotovelo dobra só 3°, sem travar) |
| `braco.inicio.fora` | 8 graus | desenho | desenho | começo: o braço pende quase na vertical do ombro, um pouco para fora (o halter passa ao lado do joelho) |
| `braco.fim.alemDasCostas` | 26 graus | consenso | unilateral | fim: 'cotovelo passando a linha do tronco': o braço fica 26° além da linha das costas |
| `braco.fim.fora` | 16 graus | consenso | unilateral | fim: cotovelo 'perto do corpo': o braço se afasta só 16° do lado do tronco, o bastante para o halter passar ao lado do quadril |
| `escapula.prot.inicio` | 6 graus | desenho | hoje | começo: 'ombro solto um pouco para baixo': a escápula vai à frente (hoje: +6) |
| `escapula.retr.fim` | 10 graus | desenho | hoje | fim: a escápula se junta à coluna (hoje: −6; aqui −10, como na remada na suspensão, porque o ritmo do ombro devolve parte do recuo) |
| `escapula.elev.inicio` | 1 graus | desenho | hoje | começo: a escápula como hoje (+1) |
| `escapula.elev.fim` | -1 graus | desenho | hoje | fim: ombro baixo, longe da orelha (hoje: −1) |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb), um em cada mão; entra no equilíbrio |
| `erro.arredondar.lombar` | 22 graus | desenho | hoje | erro: a lombar curva 22° além da curva de repouso (hoje: lombar de 74 para 60) |
| `erro.arredondar.toracica` | 22 graus | desenho | hoje | erro: a parte de cima das costas curva 22° (hoje: torácica de 76 para 100) |
| `erro.arredondar.cervical` | 10 graus | desenho | desenho | erro: o pescoço estende para o olhar não ir ao peito |
| `erro.subir.tronco` | 25 graus | desenho | hoje | erro: o tronco sobe 25° na puxada para dar embalo (hoje: de ~60° para ~35°) |
| `erro.encolher.elev` | 8 graus | desenho | hoje | erro: os ombros sobem para as orelhas no fim (hoje: +8 na escápula) |
| `erro.soBracos.atras` | 12 graus | desenho | hoje | erro: o cotovelo quase não vai para trás (fica embaixo do ombro, 12° atrás da vertical) |
| `erro.soBracos.cotovelo` | 75 graus | desenho | hoje | erro: o antebraço dobra 75° para a frente, como numa rosca; o halter não chega ao quadril |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Braços estendidos | pausa | 0,45 s | inspira | pausa curta | consenso |
| Puxada · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Fim · segura | pausa | 0,6 s | firme | pausa curta | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- costas retas (a lombar não arredonda) (consenso)
- tronco parado: sem subir o tronco para ajudar (consenso)
- tronco bem inclinado (consenso)
- fim: cotovelos atrás do tronco (consenso)
- cotovelos para trás, perto do corpo (consenso)
- fim: halteres perto do quadril (consenso)
- começo: braços estendidos (consenso)
- os halteres pendem sem atravessar as pernas nem o tronco (consenso)
- no fim as escápulas se juntam (consenso)
- pegada neutra (palmas uma para a outra) (consenso)

Erros desenhados:

- Arredondar as costas (vista: lateral): a lombar e a parte de cima das costas curvam
- Subir o tronco (vista: lateral): o tronco levanta na puxada para dar embalo
- Encolher os ombros (vista: posterior): os ombros sobem para as orelhas
- Puxar só com os braços (vista: lateral): o cotovelo fica embaixo do ombro e só dobra, como numa rosca

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/remada-curvada-halteres.md): em pé, pés na largura do quadril, joelhos levemente dobrados; dobra o quadril até o tronco ficar bem inclinado, costas retas; halteres pendurados, pegada neutra; leva os cotovelos para trás, perto do corpo, até os halteres chegarem perto do quadril; tronco parado; consenso de treinadores (nsca2021, não verificado)
- `app`: Cartão do app (src/conteudo/exercicios/remada-curvada-halteres.json): palmas uma para a outra, ~1 s puxando, pausa curta, ~2 s voltando, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/remada-curvada-halteres.ts): tronco ~60°, as escápulas (+6 no começo, −6 no fim) e os erros (subir o tronco de ~60° para ~35°, encolher +8, puxar só com os braços), que a ficha não dá em número
- `stiff`: O núcleo do stiff (src/engine/novo/exercicios/dobrar-o-quadril.ts): o quadril para trás com o centro de massa sobre o meio do pé
- `unilateral`: A ficha de movimento da remada unilateral no banco (src/engine/novo/dados/movimentos/remada-unilateral.json): o mesmo braço que puxa
- `objetos`: src/engine/novo/dados/objetos.json: o halter
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Remada sentada com elástico (`remada-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/remada-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | os pés na largura do quadril (a ficha não dá) |
| `joelho` | 20 graus | consenso | app | pernas estendidas, joelhos um pouco dobrados (a ficha não dá número) |
| `pe.paraFrente` | 15 graus | desenho | hoje | o pé fica quase em pé, com os dedos para cima e 15° para a frente: a sola fica de frente para as mãos e o elástico não escapa |
| `nadega.afunda` | 1 cm | desenho | desenho | a nádega afunda 1 cm no colchonete |
| `tronco.inicio` | 12 graus | consenso | ficha | alongado: tronco até ~10–15° inclinado à frente |
| `tronco.fim` | 0 graus | consenso | ficha | fim: o tronco volta à vertical |
| `cervical` | 4 graus | desenho | desenho | pescoço na linha do tronco, o queixo um pouco recolhido |
| `braco.inicio.abaixo` | 23 graus | desenho | hoje | alongado: os braços estendidos para os pés, 23° abaixo da horizontal (hoje: mãos 29 cm acima e 64 cm à frente da pelve) |
| `cotovelo.inicio` | 14 graus | consenso | ficha | alongado: braços estendidos, sem travar o cotovelo (o alvo da mão; medido, o cotovelo fica um pouco mais estendido, porque o ombro vai à frente com a escápula) |
| `maos.fim.fora` | 5 cm | desenho | desenho | fim: o centro da mão fica 5 cm para fora do lado da cintura (mãos ao lado do abdômen) |
| `maos.fim.acima` | 2 cm | desenho | desenho | fim: a mão fica 2 cm acima da linha da cintura (ao lado do abdômen) |
| `maos.fim.frente` | 2 cm | desenho | desenho | fim: a mão fica 2 cm à frente do meio da cintura, de lado; o cotovelo passa para trás do tronco |
| `maos.polegarParaDentro` | 0,35 fração | desenho | suspensao | palmas uma para a outra: o polegar para cima e um pouco para dentro (o da remada na suspensão) |
| `escapula.prot.inicio` | 6 graus | consenso | suspensao | alongado: as escápulas abertas, à frente com o braço |
| `escapula.retr.fim` | 10 graus | consenso | suspensao | fim: as escápulas se juntam |
| `escapula.elev.fim` | -1 graus | consenso | suspensao | ombros baixos no fim |
| `elastico.voltaNaMao` | 2,4 cm | desenho | objetos | raio da volta que o tubo dá em cada mão, por cima do pegador ("segure curto"): sem ela, o tubo de 48 pol fica frouxo com os braços estendidos |
| `elastico.voltas` | 2 voltas | desenho | objetos | quantas voltas o tubo dá em cada mão (com uma, ele começa frouxo) |
| `colchonete.z` | 30 cm | desenho | desenho | o meio do colchonete, à frente da pelve |
| `erro.balanco.tronco` | -14 graus | desenho | hoje | erro: no fim, o tronco vai 14° para trás da vertical (a lombar puxa) |
| `erro.balanco.inicio` | 24 graus | desenho | hoje | erro: no alongado, o tronco vai 24° à frente |
| `erro.arred.lombar` | 16 graus | desenho | hoje | erro: no alongado, a lombar dobra 16° além da neutra (hoje: 16) |
| `erro.arred.toracica` | 22 graus | desenho | hoje | erro: e a torácica 22° (hoje: 14 a 44) |
| `erro.encolher.elev` | 8 graus | desenho | suspensao | erro: os ombros sobem no fim (hoje: +7 na escápula) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,45 s | inspira | pausa curta | consenso |
| Puxada · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Segura contraído | pausa | 1 s | firme | 1 s | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pelve`.

Regras que a conferência mede:

- o tronco vai de ~10–15° à frente, no alongado, à vertical no fim, com a lombar neutra (consenso)
- no fim, mãos ao lado do abdômen e cotovelos atrás da linha do tronco (consenso)
- cotovelos rentes ao corpo (consenso)
- as escápulas se juntam no fim (consenso)
- palmas uma para a outra (consenso)
- o meio do elástico passa pela sola dos dois pés (consenso)
- o tubo vai das mãos aos pés sem entrar no corpo (desenho)
- cada mão segura uma ponta (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o tronco vai para trás no fim e a lombar puxa
- Arredondar a coluna no alongamento (vista: lateral): no alongado, a lombar e as costas de cima arredondam
- Encolher os ombros no fim (vista: posterior): os ombros sobem em direção às orelhas

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/remada-elastico.md): consenso de treinadores; o tronco e o caminho dos braços são os da remada-baixa aprovada
- `app`: Texto do app (src/conteudo/exercicios/remada-elastico.json)
- `suspensao`: Ficha de movimento da remada na suspensão (src/engine/novo/dados/movimentos/remada-suspensao.json): a escápula e o braço no fim
- `hoje`: A animação de hoje (src/engine/exercicios/remada-elastico.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json (objeto elastico: o tubo com pegadores de 48 pol; colchonete)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Remada na suspensão (`remada-suspensao`)

Ficha da técnica: `docs/pesquisa/animacoes/remada-suspensao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | pés na largura do quadril (os centros do quadril ficam a 8,35 cm do meio) |
| `pes.alemDaAncora` | -20 cm | desenho | desenho | o fundo do calcanhar fica 20 cm antes da vertical da âncora. Hoje fica 30 cm além dela, com a âncora a 205 cm; com a âncora na altura do fabricante (183 cm), a fita sem esticar e os pés além dela, as mãos só chegam ao peito com o corpo quase em pé e a fita quase vertical. Com os pés 20 cm antes, a fita fica perto da perpendicular ao corpo no fim, como na remada de verdade |
| `pe.pontaSobe` | 25 graus | desenho | desenho | calcanhares no chão: a ponta do pé sobe 25° do chão e fica parada; o corpo gira no tornozelo |
| `joelho` | 4 graus | consenso | ficha | corpo reto: pernas estendidas, sem travar |
| `corpo.inicio` | 55 graus | desenho | hoje | no início, o corpo fica 55° da vertical, inclinado para trás (hoje: 55°); daí sai o comprimento da fita |
| `maos.polegarParaDentro` | 0,35 fração | desenho | desenho | palmas uma para a outra: o polegar aponta para cima e um pouco para dentro (0,35 da direção para dentro para 1 da direção para cima, no tronco) |
| `pescoco.flexao` | 4 graus | desenho | desenho | pescoço na linha do corpo, o queixo um pouco recolhido |
| `braco.fim.atras` | 30 graus | desenho | desenho | no fim, o braço fica 30° atrás da linha do tronco (o cotovelo vai para trás, em direção ao quadril); com o antebraço na linha da fita, isso leva a mão ao lado do peito (a ficha não dá número) |
| `braco.fim.fora` | 14 graus | consenso | ficha | cotovelos rentes: no fim, o braço se afasta só 14° do lado do tronco |
| `escapula.prot.inicio` | 6 graus | desenho | hoje | braços estendidos: as escápulas vão à frente com o braço (hoje: +6) |
| `escapula.retr.fim` | 10 graus | desenho | hoje | no fim, as escápulas se juntam (hoje: −6; aqui −10, porque o ritmo do ombro devolve parte do recuo quando o braço desce) |
| `escapula.elev.fim` | -1 graus | desenho | hoje | ombros baixos no fim (hoje: −1) |
| `erro.quadril.dobra` | 34 graus | desenho | hoje | erro: o quadril cai e dobra 34° no fim (hoje: o tronco fica 16° mais deitado e o quadril 10 cm mais baixo) |
| `erro.encolher.elev` | 7 graus | desenho | hoje | erro: os ombros sobem (hoje: +7 na escápula) |
| `erro.curta.fracao` | 0,5 fração | desenho | hoje | erro: a volta para na metade do caminho (hoje: na pose do meio) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Braços estendidos | pausa | 0,45 s | inspira | corpo reto | consenso |
| Puxada · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Mãos ao lado do peito | pausa | 1 s | firme | 1 s | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pegador.R`, `pegador.L`.

Regras que a conferência mede:

- corpo reto, do calcanhar à cabeça (consenso)
- calcanhares no chão, parados (consenso)
- as mãos seguram os pegadores o ciclo inteiro (consenso)
- a fita não estica: o corpo sobe enquanto as mãos vêm ao corpo (consenso)
- no fim, as mãos chegam ao lado do peito (consenso)
- cotovelos rentes ao corpo (consenso)
- o antebraço fica na linha da fita, que puxa a mão (consenso)
- as escápulas se juntam no fim (consenso)
- palmas viradas uma para a outra (consenso)

Erros desenhados:

- Quadril cai (vista: lateral): o corpo dobra no quadril: o quadril desce e o tronco fica mais em pé
- Encolher os ombros (vista: posterior): os ombros sobem em direção às orelhas
- Não estender os braços (vista: lateral): a volta para na metade: os braços não estendem

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/remada-suspensao.md): de frente para a âncora, corpo reto e inclinado para trás, calcanhares no chão, braços estendidos; puxa até as mãos ao lado do peito, cotovelos rentes; consenso de treinadores (nsca2021, não verificado)
- `app`: Cartão do app (src/conteudo/exercicios/remada-suspensao.json): palmas viradas uma para a outra, escápulas se juntam no fim, ~1 s puxando, 1 s parado, ~2 s voltando, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/remada-suspensao.ts) e a conferência dela (docs/revisoes/catalogo/conferencia/suspensao.md): o ângulo do corpo no início, onde ficam os pés, as escápulas e os erros, que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos/suspensao.json: a altura da âncora (página do fabricante)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Remada unilateral com kettlebell (mão livre na coxa) (`remada-unilateral-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-kettlebell.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco.inclinacao` | 55 graus | desenho | hoje | tronco inclinado à frente: o peito a 55° da vertical, parado a série toda (hoje: ~45–60°; a ficha não dá número) |
| `cervical` | -10 graus | desenho | desenho | pescoço na linha das costas, um pouco estendido: o olhar vai ao chão à frente |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `pes.paraFora` | 2 cm | desenho | desenho | de frente, cada pé 2 cm para fora da linha do quadril |
| `joelho.frente` | 30 graus | desenho | hoje | o joelho da frente dobrado (hoje: dobrado; a ficha não dá número); o pé vai para a frente até o joelho ficar nesse ângulo |
| `joelho.tras` | 8 graus | desenho | desenho | a perna de trás quase estendida, sem travar; o pé vai para trás até o joelho ficar nesse ângulo |
| `pe.tras.calcanhar` | 15 graus | desenho | desenho | o pé de trás com o calcanhar um pouco levantado (15°), a bola do pé no chão |
| `pes.passo` | 66 cm | desenho | desenho | pés afastados, um à frente do outro: 66 cm de um tornozelo ao outro, de frente para trás (a ficha não dá número); daí sai a altura do quadril |
| `apoio.cotovelo` | 12 graus | desenho | desenho | o braço de apoio quase estendido, firme na coxa; daí sai o ponto da coxa em que a mão apoia |
| `braco.inicio.atras` | 3 graus | desenho | desenho | começo: braço estendido, pendurado embaixo do ombro (o cotovelo dobra só 3°, sem travar) |
| `braco.inicio.fora` | 8 graus | desenho | desenho | começo: o braço pende quase na vertical do ombro, um pouco para fora (o halter passa ao lado do joelho) |
| `braco.fim.alemDasCostas` | 26 graus | consenso | unilateral | fim: 'cotovelo passando a linha do tronco': o braço fica 26° além da linha das costas |
| `braco.fim.fora` | 16 graus | consenso | unilateral | fim: cotovelo 'perto do corpo': o braço se afasta só 16° do lado do tronco, o bastante para o halter passar ao lado do quadril |
| `escapula.prot.inicio` | 6 graus | desenho | hoje | começo: 'ombro solto um pouco para baixo': a escápula vai à frente (hoje: +6) |
| `escapula.retr.fim` | 10 graus | desenho | hoje | fim: a escápula se junta à coluna (hoje: −6; aqui −10, como na remada na suspensão, porque o ritmo do ombro devolve parte do recuo) |
| `escapula.elev.inicio` | 1 graus | desenho | hoje | começo: a escápula como hoje (+1) |
| `escapula.elev.fim` | -1 graus | desenho | hoje | fim: ombro baixo, longe da orelha (hoje: −1) |
| `erro.girar.giro` | 18 graus | desenho | hoje | erro: o peito abre para o lado do braço que puxa, a coluna gira 18° no fim (hoje: 18°) |
| `erro.girar.lombar` | 0,35 fração | desenho | desenho | erro: quanto do giro fica na lombar (o resto na torácica) |
| `erro.arredondar.lombar` | 22 graus | desenho | hoje | erro: a lombar curva 22° além da curva de repouso (hoje: lombar de 74 para 60) |
| `erro.arredondar.toracica` | 22 graus | desenho | hoje | erro: a parte de cima das costas curva 22° (hoje: torácica de 76 para 100) |
| `erro.arredondar.cervical` | 10 graus | desenho | desenho | erro: o pescoço estende para o olhar não ir ao peito |
| `erro.curta.fracao` | 0,45 fração | desenho | hoje | erro: a volta para perto da metade do caminho (hoje: na pose do meio) |
| `kettlebell.folga` | 1 cm | desenho | desenho | o kettlebell pende da alça; se o antebraço chegar perto, a bola fica a 1 cm dele |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,45 s | inspira | pausa curta | consenso |
| Puxada · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Segura contraído | pausa | 1 s | firme | 1 s | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- costas retas (a lombar não arredonda) (consenso)
- tronco parado, sem girar durante a série (consenso)
- tronco inclinado à frente (consenso)
- um pé à frente do outro, o do lado do kettlebell atrás (consenso)
- mão livre firme na coxa da frente (consenso)
- a mão livre fica parada na coxa (consenso)
- fim: cotovelo passando a linha das costas (consenso)
- cotovelo para trás, perto do corpo (consenso)
- fim: kettlebell ao lado do quadril (consenso)
- começo: braço estendido, kettlebell embaixo do ombro (consenso)
- o kettlebell pende embaixo da mão sem atravessar o corpo (consenso)
- no fim a escápula se junta à coluna (consenso)
- pegada neutra (palma virada para o corpo) (consenso)

Erros desenhados:

- Girar o tronco (vista: quinaTras): o peito abre para o lado do braço que puxa: o ombro direito sobe
- Arredondar as costas (vista: lateral): a lombar e a parte de cima das costas curvam
- Não estender o braço (vista: lateral): a volta para no meio: o braço não estende embaixo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/remada-unilateral-kettlebell.md): pés afastados, um à frente do outro, o pé do lado do kettlebell atrás; mão livre firme na coxa da frente; tronco inclinado à frente, costas retas, sem girar; cotovelo para trás e em direção ao quadril, o kettlebell termina ao lado do quadril; palma virada para o corpo; consenso de treinadores (nsca2021, não verificado; B.2.6)
- `app`: Cartão do app (src/conteudo/exercicios/remada-unilateral-kettlebell.json): kettlebell embaixo do ombro no começo, cotovelo passando a linha das costas no fim, ~1 s puxando, 1 s parado, ~2 s voltando, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/remada-unilateral-kettlebell.ts): o tronco inclinado ~45–60°, o joelho da frente dobrado, as escápulas (proR +6 no começo, −6 no fim) e o giro do erro (−18), que a ficha não dá em número
- `unilateral`: A ficha de movimento da remada unilateral no banco (src/engine/novo/dados/movimentos/remada-unilateral.json): o mesmo braço que puxa
- `objetos`: src/engine/novo/dados/objetos.json: o kettlebell
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Remada unilateral com halter, sem banco (mão livre na coxa) (`remada-unilateral-sem-banco`)

Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral-sem-banco.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco.inclinacao` | 55 graus | desenho | hoje | tronco inclinado à frente: o peito a 55° da vertical, parado a série toda (hoje: ~45–60°; a ficha não dá número) |
| `cervical` | -10 graus | desenho | desenho | pescoço na linha das costas, um pouco estendido: o olhar vai ao chão à frente |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `pes.paraFora` | 2 cm | desenho | desenho | de frente, cada pé 2 cm para fora da linha do quadril |
| `joelho.frente` | 30 graus | desenho | hoje | o joelho da frente dobrado (hoje: dobrado; a ficha não dá número); o pé vai para a frente até o joelho ficar nesse ângulo |
| `joelho.tras` | 8 graus | desenho | desenho | a perna de trás quase estendida, sem travar; o pé vai para trás até o joelho ficar nesse ângulo |
| `pe.tras.calcanhar` | 15 graus | desenho | desenho | o pé de trás com o calcanhar um pouco levantado (15°), a bola do pé no chão |
| `pes.passo` | 66 cm | desenho | desenho | pés afastados, um à frente do outro: 66 cm de um tornozelo ao outro, de frente para trás (a ficha não dá número); daí sai a altura do quadril |
| `apoio.cotovelo` | 12 graus | desenho | desenho | o braço de apoio quase estendido, firme na coxa; daí sai o ponto da coxa em que a mão apoia |
| `braco.inicio.atras` | 3 graus | desenho | desenho | começo: braço estendido, pendurado embaixo do ombro (o cotovelo dobra só 3°, sem travar) |
| `braco.inicio.fora` | 8 graus | desenho | desenho | começo: o braço pende quase na vertical do ombro, um pouco para fora (o halter passa ao lado do joelho) |
| `braco.fim.alemDasCostas` | 26 graus | consenso | unilateral | fim: 'cotovelo passando a linha do tronco': o braço fica 26° além da linha das costas |
| `braco.fim.fora` | 16 graus | consenso | unilateral | fim: cotovelo 'perto do corpo': o braço se afasta só 16° do lado do tronco, o bastante para o halter passar ao lado do quadril |
| `escapula.prot.inicio` | 6 graus | desenho | hoje | começo: 'ombro solto um pouco para baixo': a escápula vai à frente (hoje: +6) |
| `escapula.retr.fim` | 10 graus | desenho | hoje | fim: a escápula se junta à coluna (hoje: −6; aqui −10, como na remada na suspensão, porque o ritmo do ombro devolve parte do recuo) |
| `escapula.elev.inicio` | 1 graus | desenho | hoje | começo: a escápula como hoje (+1) |
| `escapula.elev.fim` | -1 graus | desenho | hoje | fim: ombro baixo, longe da orelha (hoje: −1) |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb), na mão direita |
| `erro.girar.giro` | 18 graus | desenho | hoje | erro: o peito abre para o lado do braço que puxa, a coluna gira 18° no fim (hoje: 18°) |
| `erro.girar.lombar` | 0,35 fração | desenho | desenho | erro: quanto do giro fica na lombar (o resto na torácica) |
| `erro.arredondar.lombar` | 22 graus | desenho | hoje | erro: a lombar curva 22° além da curva de repouso (hoje: lombar de 74 para 60) |
| `erro.arredondar.toracica` | 22 graus | desenho | hoje | erro: a parte de cima das costas curva 22° (hoje: torácica de 76 para 100) |
| `erro.arredondar.cervical` | 10 graus | desenho | desenho | erro: o pescoço estende para o olhar não ir ao peito |
| `erro.curta.fracao` | 0,45 fração | desenho | hoje | erro: a volta para perto da metade do caminho (hoje: na pose do meio) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,45 s | inspira | pausa curta | consenso |
| Puxada · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Segura contraído | pausa | 1 s | firme | 1 s | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- costas retas (a lombar não arredonda) (consenso)
- tronco parado, sem girar durante a série (consenso)
- tronco inclinado à frente (consenso)
- um pé à frente do outro, o do lado do halter atrás (consenso)
- mão livre firme na coxa da frente (consenso)
- a mão livre fica parada na coxa (consenso)
- fim: cotovelo passando a linha das costas (consenso)
- cotovelo para trás, perto do corpo (consenso)
- fim: halter ao lado do quadril (consenso)
- começo: braço estendido, halter embaixo do ombro (consenso)
- o halter pende embaixo da mão sem atravessar o corpo (consenso)
- no fim a escápula se junta à coluna (consenso)
- pegada neutra (palma virada para o corpo) (consenso)

Erros desenhados:

- Girar o tronco (vista: quinaTras): o peito abre para o lado do braço que puxa: o ombro direito sobe
- Arredondar as costas (vista: lateral): a lombar e a parte de cima das costas curvam
- Não estender o braço (vista: lateral): a volta para no meio: o braço não estende embaixo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/remada-unilateral-sem-banco.md): pés afastados, um à frente do outro, o pé do lado do halter atrás; mão livre firme na coxa da frente; tronco inclinado à frente, costas retas, sem girar; cotovelo para trás e em direção ao quadril, o halter termina ao lado do quadril; palma virada para o corpo; consenso de treinadores (nsca2021, não verificado; B.2.6)
- `app`: Cartão do app (src/conteudo/exercicios/remada-unilateral-sem-banco.json): halter embaixo do ombro no começo, cotovelo passando a linha das costas no fim, ~1 s puxando, 1 s parado, ~2 s voltando, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/remada-unilateral-sem-banco.ts): o tronco inclinado ~45–60°, o joelho da frente dobrado, as escápulas (proR +6 no começo, −6 no fim) e o giro do erro (−18), que a ficha não dá em número
- `unilateral`: A ficha de movimento da remada unilateral no banco (src/engine/novo/dados/movimentos/remada-unilateral.json): o mesmo braço que puxa
- `objetos`: src/engine/novo/dados/objetos.json: o halter
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Remada unilateral com halter apoiada no banco (`remada-unilateral`)

Ficha da técnica: `docs/pesquisa/animacoes/remada-unilateral.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco.inclinacao` | 75 graus | consenso | ficha | costas quase paralelas ao chão: o peito inclina 75° da vertical (15° acima da horizontal), parado a série toda |
| `cervical` | -8 graus | desenho | desenho | pescoço na linha das costas, um pouco estendido: o olhar vai ao chão um pouco à frente |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `apoio.cotovelo` | 6 graus | desenho | desenho | o braço de apoio quase estendido, sem travar; daí sai o ângulo da coxa de apoio |
| `apoio.maoAFrente` | 0 cm | consenso | ficha | a mão de apoio embaixo do ombro (o meio da palma na vertical do ombro) |
| `apoio.maoParaDentro` | 2 cm | desenho | desenho | a mão de apoio um pouco para dentro da linha do ombro, sobre o estofado |
| `joelho.afunda` | 0,5 cm | desenho | desenho | o joelho de apoio amassa o estofado meio centímetro |
| `canela.desce` | 3 graus | desenho | desenho | a canela de apoio deitada no estofado, um pouco inclinada para trás (o joelho é mais grosso que o tornozelo) |
| `pe.R.paraFora` | 10 cm | consenso | app | o outro pé no chão, 'um pouco para o lado': 10 cm para fora da linha do quadril |
| `joelho.R` | 10 graus | consenso | app | o joelho do pé no chão 'levemente dobrado' |
| `joelho.R.folga` | 0,5 cm | desenho | desenho | num corpo de pernas curtas, o quadril fica 0,5 cm abaixo do mais alto em que o pé direito ainda chega ao chão com o joelho no ângulo da ficha |
| `banco.alemDaMao` | 6 cm | desenho | desenho | a ponta da frente do banco fica 6 cm além dos dedos da mão de apoio |
| `braco.inicio.atras` | 3 graus | desenho | desenho | começo: braço estendido, pendurado embaixo do ombro (o cotovelo dobra só 3°, sem travar) |
| `braco.inicio.fora` | 8 graus | desenho | desenho | começo: o braço pende quase na vertical do ombro, um pouco para fora (o halter passa ao lado do joelho) |
| `braco.fim.alemDasCostas` | 26 graus | consenso | app | fim: 'cotovelo passando a linha do tronco': o braço fica 26° além da linha das costas |
| `braco.fim.fora` | 16 graus | consenso | app | fim: cotovelo 'perto do corpo': o braço se afasta só 16° do lado do tronco, o bastante para o halter passar ao lado do quadril |
| `escapula.prot.inicio` | 6 graus | desenho | hoje | começo: 'ombro solto um pouco para baixo': a escápula vai à frente (hoje: +6) |
| `escapula.retr.fim` | 10 graus | desenho | hoje | fim: a escápula se junta à coluna (hoje: −6; aqui −10, como na remada na suspensão, porque o ritmo do ombro devolve parte do recuo) |
| `escapula.elev.inicio` | 1 graus | desenho | hoje | começo: a escápula como hoje (+1) |
| `escapula.elev.fim` | -1 graus | desenho | hoje | fim: ombro baixo, longe da orelha (hoje: −1) |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb), na mão direita |
| `erro.girar.giro` | 18 graus | desenho | hoje | erro: o peito abre para o lado do braço que puxa, a coluna gira 18° no fim (hoje: 18°) |
| `erro.girar.lombar` | 0,35 fração | desenho | desenho | erro: quanto do giro fica na lombar (o resto na torácica) |
| `erro.arredondar.lombar` | 22 graus | desenho | hoje | erro: a lombar curva 22° além da curva de repouso (hoje: lombar de 74 para 60) |
| `erro.arredondar.toracica` | 22 graus | desenho | hoje | erro: a parte de cima das costas curva 22° (hoje: torácica de 76 para 100) |
| `erro.arredondar.cervical` | 10 graus | desenho | desenho | erro: o pescoço estende para o olhar não ir ao peito |
| `erro.curta.fracao` | 0,45 fração | desenho | hoje | erro: a volta para perto da metade do caminho (hoje: na pose do meio) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,45 s | inspira | pausa curta | consenso |
| Puxada · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Segura contraído | pausa | 1 s | firme | 1 s | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `joelho.L`, `mao.L`, `pelve`.

Regras que a conferência mede:

- costas retas (a lombar não arredonda) (consenso)
- tronco parado, sem girar durante a série (consenso)
- costas quase paralelas ao chão (~15° acima da horizontal) (consenso)
- joelho e mão do mesmo lado no banco, a mão embaixo do ombro (consenso)
- a mão de apoio fica parada no banco (consenso)
- fim: cotovelo passando a linha do tronco (consenso)
- cotovelo perto do corpo (consenso)
- fim: halter ao lado do quadril (consenso)
- começo: braço estendido (consenso)
- o halter pende embaixo da mão sem atravessar o corpo nem o banco (consenso)
- no fim a escápula se junta à coluna (consenso)
- pegada neutra (palma virada para o banco) (consenso)

Erros desenhados:

- Girar o tronco (vista: quinaTras): o peito abre para o lado do braço que puxa: o ombro direito sobe
- Arredondar as costas (vista: lateral): a lombar e a parte de cima das costas curvam para cima
- Não estender o braço (vista: lateral): a volta para no meio: o braço não estende embaixo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/remada-unilateral.md): joelho e mão do mesmo lado no banco plano, mão embaixo do ombro, o outro pé no chão; costas retas, quase paralelas ao chão (~15° acima da horizontal), sem girar; cotovelo para trás e em direção ao quadril, halter termina ao lado do quadril; pegada neutra; consenso de treinadores (nsca2021, não verificado)
- `app`: Cartão do app (src/conteudo/exercicios/remada-unilateral.json): o outro pé um pouco para o lado com o joelho levemente dobrado, ombro solto para baixo no começo, cotovelo passando a linha do tronco no fim, ~1 s puxando, 1 s parado, ~2 s voltando, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/remada-unilateral.ts): as escápulas (proR +6 no começo, −6 no fim), o giro do erro (−18) e as curvas do erro de arredondar, que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json: o banco reto e o halter
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Rosca alternada com halteres (`rosca-alternada`)

Ficha da técnica: `docs/pesquisa/animacoes/rosca-alternada.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 5 graus | desenho | desenho | em pé, joelhos estendidos sem travar (a ficha não dá número) |
| `braco.paraFora` | 6 graus | desenho | desenho | o braço ao lado do tronco, aberto 6° (como na rosca martelo e nos braços pendurados do desenho aprovado do Boneco); com o halter de 10 lb a cabeça de dentro não entra na coxa; a ficha diz 'cotovelo ao lado do tronco' e não dá número |
| `braco.aFrente` | 5 graus | desenho | desenho | o braço 5° à frente da linha do tronco, ainda ao lado dele (a regra aceita até 10°): na vertical, com a palma para a frente, a cabeça de dentro do halter raspa a frente da coxa no começo da subida (−0,3 cm medido) |
| `cotovelo.baixo` | 12 graus | consenso | ficha | embaixo, o braço estendido, sem travar o cotovelo (12°: com 8°, a cabeça de dentro do halter fica 0,1 cm dentro da coxa no começo da subida) |
| `cotovelo.cima` | 132 graus | consenso | app | em cima, o halter perto do ombro (a ficha não dá número; a regra mede a distância da mão ao ombro); a flexão média do cotovelo é 148° (cdc) |
| `maos.supinacao` | 85 graus | desenho | desenho | palmas para a frente: o polegar gira 85° da posição neutra para fora (a supinação média é 87,5°, cdc) |
| `carga` | 4,5 kg | desenho | objetos | cada halter desenhado: o sextavado de 10 lb (dados/objetos/halter-leve.json); entram no equilíbrio |
| `erro.balanco.tronco` | 12 graus | desenho | hoje | erro: o peito vai para trás enquanto o halter sobe (o impulso); o quadril vai à frente pelo equilíbrio |
| `erro.balanco.lombar` | 6 graus | desenho | hoje | erro: parte do balanço é a lombar arqueando |
| `erro.cotovelo.braco` | 35 graus | desenho | hoje | erro: o cotovelo vai à frente (o braço sobe 35° à frente do tronco) e o ombro assume o movimento |
| `erro.cotovelo.cotovelo` | 115 graus | desenho | hoje | erro: com o cotovelo à frente, o antebraço dobra menos (o halter chega à altura do queixo, e não do rosto) |
| `erro.curta.cotovelo` | 55 graus | desenho | hoje | erro: embaixo, o cotovelo para dobrado 55° (hoje: 55°) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,5 s | inspira | braços estendidos | consenso |
| Direito sobe · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | halter perto do ombro | consenso |
| Direito desce · excêntrica | exc | 2,2 s | inspira | ~2 s | consenso |
| Esquerdo sobe · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | halter perto do ombro | consenso |
| Esquerdo desce · excêntrica | exc | 2,2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- o cotovelo fica parado ao lado do tronco e só o antebraço sobe (consenso)
- tronco parado, sem jogar o corpo para trás (consenso)
- embaixo, o braço estendido (consenso)
- em cima, o halter perto do ombro, com o cotovelo ainda ao lado do tronco (consenso)
- palmas para a frente (consenso)
- o halter fica na mão e não atravessa a coxa, o tronco nem o braço (consenso)
- um braço de cada vez: o outro espera embaixo (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o peito vai para trás e o quadril à frente para dar impulso ao halter
- Cotovelo vai para a frente (vista: lateral): o braço sobe à frente do tronco e o ombro assume o movimento
- Não estender o braço (vista: lateral): embaixo, o cotovelo fica dobrado: o braço não estende

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/rosca-alternada.md): em pé, pés na largura do quadril, halteres ao lado do corpo, palmas para a frente; um braço de cada vez, o cotovelo parado ao lado do tronco e só o antebraço sobe; tronco parado; ~1 s subindo, ~2 s descendo; consenso de treinadores (nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/rosca-alternada.json): as fases (embaixo, subida, topo, descida, outro braço), 'halter perto do ombro', 'cotovelo ainda ao lado do tronco', as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/rosca-alternada.ts): as durações das fases, a amplitude do cotovelo e os erros
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: Tabela de objetos: src/engine/novo/dados/objetos/halter-leve.json (halter sextavado de 10 lb, RitFit e Titan)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Rosca com elástico (`rosca-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/rosca-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | ficha | os dois pés no meio do elástico, na largura do quadril, apontando para a frente |
| `joelho` | 5 graus | consenso | app | joelhos destravados (a ficha não dá número; o da rosca alternada aprovada) |
| `braco.paraFora` | 12 graus | desenho | desenho | o braço ao lado do tronco, aberto 12° para o pegador (12,7 cm, atravessado na palma) não bater na coxa; a ficha diz "cotovelos encostados ao lado do tronco" |
| `braco.aFrente` | 0 graus | consenso | ficha | o braço na vertical, parado ao lado do tronco |
| `cotovelo.baixo` | 8 graus | consenso | alternada | embaixo, o braço estendido, sem travar o cotovelo |
| `cotovelo.cima` | 132 graus | consenso | alternada | em cima, as mãos perto dos ombros (o da rosca alternada aprovada) |
| `maos.supinacao` | 80 graus | consenso | ficha | palmas para a frente: o polegar gira 80° da posição neutra para fora (a supinação média é 87,5°, cdc); sem halter, a palma vira quase toda para a frente |
| `elastico.folgaNaPerna` | 0,8 cm | desenho | objetos | o tubo passa rente ao lado de fora da perna: o raio do tubo e a roupa |
| `erro.balanco.tronco` | 12 graus | desenho | alternada | erro: o peito vai para trás enquanto as mãos sobem (o impulso); o quadril vai à frente pelo equilíbrio |
| `erro.balanco.lombar` | 6 graus | desenho | alternada | erro: parte do balanço é a lombar arqueando |
| `erro.cotovelo.braco` | 35 graus | desenho | alternada | erro: os cotovelos vão à frente (o braço sobe 35° à frente do tronco) |
| `erro.cotovelo.cotovelo` | 115 graus | desenho | alternada | erro: com o cotovelo à frente, o antebraço dobra menos |
| `erro.curta.cotovelo` | 55 graus | desenho | alternada | erro: embaixo, o cotovelo para dobrado 55° |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,5 s | inspira | braços estendidos | consenso |
| Subida · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | o elástico mais esticado | consenso |
| Descida · excêntrica | exc | 2,2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os cotovelos ficam parados ao lado do tronco e só os antebraços sobem (consenso)
- tronco parado, sem jogar o corpo para trás (consenso)
- embaixo, os braços estendidos (consenso)
- em cima, as mãos perto dos ombros, com os cotovelos ainda ao lado do tronco (consenso)
- palmas para a frente (consenso)
- os dois pés pisam no meio do elástico, no meio da sola, inteiros no chão (consenso)
- o tubo sobe pelo lado de fora das pernas, sem entrar nelas (desenho)
- cada mão segura um pegador (consenso)
- os dois antebraços sobem juntos (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o peito vai para trás e o quadril à frente para dar impulso
- Cotovelos vão para a frente (vista: lateral): os braços sobem à frente do tronco e o ombro assume o movimento
- Não estender os braços (vista: lateral): embaixo, os cotovelos ficam dobrados: os braços não estendem

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/rosca-elastico.md): consenso de treinadores; a postura e o caminho do antebraço são os da rosca-alternada aprovada
- `app`: Texto do app (src/conteudo/exercicios/rosca-elastico.json)
- `alternada`: Ficha de movimento da rosca alternada aprovada (src/engine/novo/dados/movimentos/rosca-alternada.json): os mesmos ângulos do braço e do cotovelo e os mesmos erros
- `hoje`: A animação de hoje (src/engine/exercicios/rosca-elastico.ts): as distâncias que a ficha não dá em número
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: src/engine/novo/dados/objetos.json (objeto elastico: o tubo com pegadores de 48 pol)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Rosca inclinada com halteres (`rosca-inclinada`)

Ficha da técnica: `docs/pesquisa/animacoes/rosca-inclinada.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `encosto` | 60 graus | consenso | app | o encosto a 60° do chão, a ponta mais em pé da faixa do app (45–60°): a 45° o tronco fica mais deitado e o halter atravessa o quadril e a coxa no meio da subida (medido) |
| `apoio.amassa` | 1 cm | desenho | desenho | costas, nádega e nuca apoiadas: quanto o estofado amassa sob o corpo |
| `toracica` | 0 graus | consenso | ficha | costas apoiadas no encosto: a torácica na curva de repouso |
| `cervical.min` | -15 graus | desenho | desenho | a nuca apoia no encosto com o pescoço dobrado para trás no máximo 15° além da curva de repouso (para o pescoço não 'quebrar' para a cabeça encostar) |
| `cabeca` | 0 graus | consenso | ficha | a cabeça na linha do pescoço, apoiada |
| `pes.meiaDistancia` | 16 cm | desenho | desenho | pés firmes no chão, um pouco mais afastados que o quadril, dos dois lados do banco (a ficha não dá número) |
| `pes.aFrente` | 57 cm | desenho | desenho | a bola do pé 57 cm à frente do quadril, com a canela um pouco inclinada para a frente (a ficha não dá número; com o pé mais perto, o rótulo do cotovelo ia para o lado de dentro e o fio cruzava o corpo) |
| `braco.paraFora` | 25 graus | desenho | desenho | os braços pendem na vertical (vistos de lado), abertos 25° para o lado: com a palma para a frente e o braço menos aberto, a cabeça de dentro do halter de 10 lb entra no quadril, na cintura ou no peito no meio e no topo da subida (medido: 20° dá −1,4 cm; 25° dá −0,2 cm); a ficha não dá número |
| `cotovelo.baixo` | 8 graus | consenso | ficha | embaixo, o braço quase estendido, sem relaxar o ombro para a frente |
| `cotovelo.cima` | 132 graus | consenso | ficha | em cima, até onde o cotovelo vai sem sair da vertical: o halter perto do ombro (a ficha não dá número; hoje: 135°; a regra mede a distância da pegada ao ombro) |
| `maos.supinacao` | 85 graus | desenho | desenho | palmas para a frente: o polegar gira 85° da posição neutra para fora (a supinação média é 87,5°, cdc) |
| `maos.encostaNaCabeca` | 2,2 cm | desenho | desenho | a mão segura o cabo encostada na cabeça de dentro (do lado do dedo mínimo): o halter corre esse tanto para o lado do polegar (o cabo de 13 cm tem 4,4 cm a mais que a largura da mão, 8,6 cm) |
| `carga` | 4,5 kg | desenho | objetos | cada halter desenhado: o sextavado de 10 lb (dados/objetos/halter-leve.json); entram no equilíbrio |
| `erro.cotovelo.braco` | 45 graus | desenho | hoje | erro: o braço sai da vertical e vai 45° à frente (hoje: 52°) |
| `erro.cotovelo.cotovelo` | 115 graus | desenho | hoje | erro: com o braço à frente, o cotovelo dobra menos |
| `erro.ombro.tronco` | 18 graus | desenho | hoje | erro: o tronco sai do encosto e vai 18° para a frente, girando em volta do quadril |
| `erro.ombro.braco` | 20 graus | desenho | hoje | erro: o braço também vai à frente (hoje: 28°) |
| `erro.ombro.protracao` | 10 graus | desenho | hoje | erro: o ombro vai para a frente (a escápula sai do encosto) |
| `erro.curta.cotovelo` | 55 graus | desenho | hoje | erro: embaixo, o cotovelo para dobrado 55° (hoje: 55°) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo · alongado | pausa | 0,6 s | inspira | braço estendido | consenso |
| Subida · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | braço na vertical | consenso |
| Descida · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- dobre só o cotovelo; o braço continua na vertical, atrás da linha do tronco (consenso)
- costas, ombros e cabeça apoiados no encosto, e a nádega no assento (consenso)
- os ombros não saem do encosto (consenso)
- embaixo, o braço quase estendido (consenso)
- em cima, o halter perto do ombro, sem levar o cotovelo à frente (o braço continua na vertical) (consenso)
- palmas para a frente (consenso)
- o halter fica na mão e não atravessa o corpo (consenso)
- o halter não atravessa o banco nem o chão (consenso)

Erros desenhados:

- Cotovelos vão para a frente (vista: lateral): o braço sai da vertical e vai à frente; a frente do ombro passa a ajudar
- Ombros saem do encosto (vista: lateral): o tronco e os ombros vão para a frente para ajudar a subir
- Não estender embaixo (vista: lateral): a volta para na metade: o braço não estende embaixo

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/rosca-inclinada.md): sente com as costas e a cabeça apoiadas, pés firmes no chão; braços pendurados na vertical, atrás da linha do tronco; palmas para a frente, ombros encostados no banco; dobre só o cotovelo, o braço continua na vertical; ~1 s subindo, ~2–3 s descendo; consenso de treinadores (guia original; nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/rosca-inclinada.json): 'encosto a 45–60°; quanto mais deitado, mais o bíceps alonga', as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/rosca-inclinada.ts): as fases, a amplitude do cotovelo e os erros
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: Tabela de objetos: src/engine/novo/dados/objetos/halter-leve.json (halter sextavado de 10 lb, RitFit e Titan) e src/engine/novo/dados/objetos.json (banco regulável)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Rosca com kettlebell (`rosca-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/rosca-kettlebell.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | app | pés na largura do quadril, apontando para a frente |
| `joelho` | 5 graus | consenso | app | em pé, joelhos destravados (o texto do app não dá número) |
| `braco.paraFora` | 6 graus | desenho | desenho | o braço junto ao corpo, aberto 6° (como os braços pendurados do desenho aprovado do Boneco); a bola (20,8 cm), pendurada embaixo da mão, fica 3 cm fora da coxa; a ficha diz 'cotovelo junto ao corpo' e não dá número |
| `braco.aFrente` | 0 graus | consenso | ficha | o braço na vertical, parado junto ao corpo (o cotovelo não vai à frente) |
| `cotovelo.baixo` | 8 graus | consenso | ficha | embaixo, o braço estendido, sem travar o cotovelo |
| `cotovelo.cima` | 130 graus | consenso | ficha | em cima, a mão perto do ombro (a ficha não dá número; a regra mede a distância da mão ao ombro) |
| `maos.supinacao` | 85 graus | consenso | ficha | palma para a frente: o polegar gira 85° da posição neutra para fora (a supinação média é 87,5°, cdc); com a alça quase na horizontal, a bola pende embaixo da mão |
| `kettlebell.folga` | 1 cm | desenho | desenho | quando o antebraço sobe, a bola encosta nele: a folga entre a bola e a pele do antebraço |
| `livre.cotovelo` | 8 graus | desenho | app | a outra mão solta ao lado do corpo, o cotovelo quase estendido |
| `erro.balanco.tronco` | 12 graus | desenho | alternada | erro: o peito vai para trás enquanto o kettlebell sobe (o impulso), como na alternada |
| `erro.balanco.lombar` | 6 graus | desenho | alternada | erro: parte do balanço é a lombar arqueando |
| `erro.cotovelo.braco` | 35 graus | desenho | alternada | erro: o cotovelo vai à frente (o braço sobe 35° à frente do tronco) |
| `erro.cotovelo.cotovelo` | 110 graus | desenho | alternada | erro: com o cotovelo à frente, o antebraço dobra menos |
| `erro.curta.cotovelo` | 55 graus | desenho | hoje | erro: embaixo, o cotovelo para dobrado 55° (hoje: 55°) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,5 s | inspira | braço estendido | consenso |
| Subida · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | mão perto do ombro | consenso |
| Descida · excêntrica | exc | 2,2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- o cotovelo fica junto ao corpo, parado (consenso)
- sobe sem balançar o tronco (consenso)
- desce até estender o braço (consenso)
- sobe até a mão chegar perto do ombro (consenso)
- uma mão na alça, palma para a frente (consenso)
- a bola fica pendurada embaixo da mão e não atravessa a coxa nem o antebraço (consenso)
- a bola fica pendurada embaixo da mão (na vertical) até encostar no antebraço (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o peito vai para trás e o quadril à frente para dar impulso ao kettlebell
- Cotovelo vai para a frente (vista: lateral): o braço sobe à frente do tronco e o ombro assume o movimento
- Não estender o braço (vista: lateral): embaixo, o cotovelo fica dobrado: o braço não estende

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/rosca-kettlebell.md): uma mão na alça, palma para a frente, a bola pendurada embaixo da mão; cotovelo junto ao corpo, parado; sobe até a mão chegar perto do ombro, sem balançar o tronco; desce até estender o braço; ~1 s subindo, ~2 s descendo; consenso de treinadores (B.2.6, B.3.2; nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/rosca-kettlebell.json): em pé, joelhos destravados, a outra mão solta ao lado do corpo, um braço por série, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/rosca-kettlebell.ts): parte da rosca alternada aprovada (mesmo corpo e mesmo braço), as fases e os erros
- `alternada`: Rosca alternada do motor novo (lote 5, src/engine/novo/dados/movimentos/rosca-alternada.json): o mesmo corpo e os mesmos erros
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Rosca martelo com halteres (`rosca-martelo`)

Ficha da técnica: `docs/pesquisa/animacoes/rosca-martelo.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | app | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho` | 5 graus | consenso | app | em pé, joelhos destravados (o texto do app não dá número) |
| `braco.paraFora` | 6 graus | desenho | desenho | o braço ao lado do tronco, aberto 6° (como os braços pendurados do desenho aprovado do Boneco); com o cabo para a frente, as cabeças do halter não batem na coxa; a ficha diz 'cotovelos encostados ao lado do tronco' e não dá número |
| `braco.aFrente` | 0 graus | consenso | ficha | o braço na vertical, parado ao lado do tronco (o cotovelo não vai à frente) |
| `cotovelo.baixo` | 8 graus | consenso | ficha | embaixo, o braço estendido, sem travar o cotovelo |
| `cotovelo.cima` | 130 graus | consenso | ficha | em cima, os halteres perto dos ombros (a ficha não dá número; a regra mede a distância da mão ao ombro); com o cabo de pé, a cabeça de trás do halter encosta no braço a partir de ~135° |
| `maos.supinacao` | 0 graus | consenso | ficha | pegada neutra: o polegar aponta para a frente do antebraço (para cima no topo), palmas uma para a outra, sem girar |
| `carga` | 4,5 kg | desenho | objetos | cada halter desenhado: o sextavado de 10 lb (dados/objetos/halter-leve.json); entram no equilíbrio |
| `erro.balanco.tronco` | 12 graus | desenho | alternada | erro: o peito vai para trás enquanto o halter sobe (o impulso), como na alternada |
| `erro.balanco.lombar` | 6 graus | desenho | alternada | erro: parte do balanço é a lombar arqueando |
| `erro.cotovelo.braco` | 35 graus | desenho | alternada | erro: o cotovelo vai à frente (o braço sobe 35° à frente do tronco) e o ombro assume o movimento |
| `erro.cotovelo.cotovelo` | 110 graus | desenho | alternada | erro: com o cotovelo à frente, o antebraço dobra menos (o halter fica à frente do queixo) |
| `erro.curta.cotovelo` | 55 graus | desenho | hoje | erro: embaixo, o cotovelo para dobrado 55° (hoje: 55°) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Embaixo | pausa | 0,5 s | inspira | palmas uma para a outra | consenso |
| Direito sobe · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | palma ainda para dentro | consenso |
| Direito desce · excêntrica | exc | 2,2 s | inspira | ~2 s | consenso |
| Esquerdo sobe · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Topo | pausa | 0,4 s | firme | palma ainda para dentro | consenso |
| Esquerdo desce · excêntrica | exc | 2,2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os cotovelos ficam encostados ao lado do tronco, parados (consenso)
- tronco parado, sem balançar (consenso)
- estende os braços embaixo (consenso)
- sobe até os halteres chegarem perto dos ombros (consenso)
- pegada neutra: palmas uma para a outra o tempo todo, sem girar (consenso)
- o halter fica na mão e não atravessa a coxa, o tronco nem o braço (consenso)
- um braço de cada vez: o outro espera embaixo (consenso)

Erros desenhados:

- Balançar o tronco (vista: lateral): o peito vai para trás e o quadril à frente para dar impulso ao halter
- Cotovelos vão para a frente (vista: lateral): o braço sobe à frente do tronco e o ombro assume o movimento
- Não estender os braços (vista: lateral): embaixo, os cotovelos ficam dobrados: os braços não estendem

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/rosca-martelo.md): pegada neutra, palmas viradas uma para a outra o tempo todo, sem girar; cotovelos encostados ao lado do tronco, parados; sobe até os halteres chegarem perto dos ombros; ~1 s subindo, ~2 s descendo; estende os braços embaixo; consenso de treinadores (B.2.6; nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/rosca-martelo.json): em pé, joelhos destravados, um braço de cada vez, 'sem girar a mão', 'palma ainda virada para dentro' no topo, as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/rosca-martelo.ts): parte da rosca alternada aprovada (mesmo corpo, mesmo caminho do braço, mesmas fases e erros), com o halter de pé em relação ao antebraço
- `alternada`: Rosca alternada do motor novo (lote 5, src/engine/novo/dados/movimentos/rosca-alternada.json): o mesmo corpo, as mesmas fases e os mesmos erros
- `cdc`: Soucie JM et al. Range of motion measurements: reference values and a database for comparison studies. Haemophilia 2011 (tabelas do CDC; docs/revisoes/animacao-nova/pesquisa/02-articulacoes.md, A1)
- `objetos`: Tabela de objetos: src/engine/novo/dados/objetos/halter-leve.json (halter sextavado de 10 lb, RitFit e Titan)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Rosca na suspensão (`rosca-suspensao`)

Ficha da técnica: `docs/pesquisa/animacoes/rosca-suspensao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | remada | pés na largura do quadril (como na remada) |
| `pes.alemDaAncora` | -20 cm | desenho | remada | o fundo do calcanhar fica 20 cm antes da vertical da âncora (como na remada; hoje: 30 cm além, com a âncora a 205 cm) |
| `pe.pontaSobe` | 25 graus | desenho | remada | calcanhares no chão: a ponta do pé sobe 25° e fica parada |
| `joelho` | 4 graus | consenso | ficha | corpo reto: pernas estendidas, sem travar |
| `corpo.inicio` | 55 graus | desenho | hoje | no início, o corpo fica 55° da vertical (hoje: 55°); daí sai o comprimento da fita |
| `maos.polegarParaCima` | 0,4 fração | desenho | desenho | palmas para cima: o polegar aponta para fora e um pouco para cima (0,4 da direção para cima para 1 da direção para fora, no tronco), para o antebraço não passar da supinação comum |
| `pescoco.flexao` | 4 graus | desenho | desenho | pescoço na linha do corpo, o queixo um pouco recolhido |
| `cotovelo.fim` | 115 graus | desenho | desenho | no fim, o cotovelo dobra 115°: as mãos chegam perto da testa (a ficha não dá número; a regra mede a distância da mão à cabeça) |
| `erro.quadril.dobra` | 34 graus | desenho | remada | erro: o quadril cai e dobra 34° no fim (como na remada) |
| `erro.cotovelo.atras` | 30 graus | desenho | remada | erro: os cotovelos descem até a posição final da remada (braço 30° atrás do tronco) |
| `erro.cotovelo.fora` | 14 graus | desenho | remada | erro: na posição da remada, o braço rente ao corpo (14°) |
| `erro.curta.fracao` | 0,5 fração | desenho | hoje | erro: a volta para na metade do caminho (hoje: na pose do meio) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Braços estendidos | pausa | 0,45 s | inspira | corpo reto | consenso |
| Subida · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Mãos perto da testa | pausa | 0,6 s | firme | cotovelos altos | consenso |
| Descida · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pegador.R`, `pegador.L`.

Regras que a conferência mede:

- corpo reto, do calcanhar à cabeça (consenso)
- calcanhares no chão, parados (consenso)
- as mãos seguram os pegadores o ciclo inteiro (consenso)
- palmas para cima (consenso)
- a fita não estica: o corpo sobe enquanto as mãos vêm à testa (consenso)
- os cotovelos ficam altos e parados (consenso)
- no fim, as mãos chegam perto da testa (consenso)

Erros desenhados:

- Quadril cai (vista: lateral): o corpo dobra no quadril: o quadril desce e o tronco fica mais em pé
- Cotovelos descem (vista: lateral): os cotovelos descem e as mãos vão ao peito: vira uma remada
- Não estender os braços (vista: lateral): a volta para na metade: os braços não estendem

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/rosca-suspensao.md): de frente para a âncora, palmas para cima, braços estendidos à frente; corpo reto e inclinado para trás, calcanhares no chão (a mesma posição da remada na suspensão); dobra os cotovelos e traz as mãos para perto da testa, cotovelos altos e parados; consenso de treinadores (nsca2021, não verificado)
- `app`: Cartão do app (src/conteudo/exercicios/rosca-suspensao.json): ~1 s subindo, ~2 s descendo; cotovelos apontando para a âncora; as dicas e os erros
- `remada`: Remada na suspensão do motor novo (lote 4, src/engine/novo/dados/movimentos/remada-suspensao.json): a mesma posição de partida (pés, ângulo do corpo, comprimento da fita), como a ficha pede
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/rosca-suspensao.ts) e a conferência dela (docs/revisoes/catalogo/conferencia/suspensao.md): o ângulo de partida, a pausa e os erros
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Stiff com elástico (`stiff-elastico`)

Ficha da técnica: `docs/pesquisa/animacoes/stiff-elastico.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho.cima` | 8 graus | desenho | stiff | em pé: joelhos levemente dobrados (a ficha não dá número) |
| `joelho.baixo` | 15 graus | desenho | stiff | embaixo: o ângulo do joelho fica quase igual ao de cima (a ficha: 'esse ângulo fica quase igual a série toda') |
| `tronco.cima` | 0 graus | consenso | guia | em pé: quadril estendido, sem jogar o tronco para trás |
| `maos.embaixo` | 0,5 fração da canela | consenso | stiff | embaixo, as mãos param na mesma altura que no stiff com halteres (meio da canela); a ficha diz que isso depende da flexibilidade. A inclinação do tronco embaixo sai desta altura |
| `cervical` | 0 graus | consenso | guia | pescoço na linha do tronco ('coluna longa do quadril à cabeça') |
| `cabeca` | 0 graus | consenso | guia | cabeça na linha do pescoço |
| `maos.meiaDistancia` | 13 cm | desenho | desenho | mãos na frente das coxas, palmas para você: cada mão a 13 cm do meio do corpo (os centros do quadril ficam a 8,35), um pouco para fora, para o tubo subir pelo lado de fora da perna |
| `cotovelo` | 4 graus | desenho | desenho | braços quase estendidos, sem travar o cotovelo |
| `cotovelo.paraFora` | 1 proporção | desenho | desenho | os cotovelos apontam para trás e para fora (quanto para fora em relação a para trás), com as palmas para as pernas |
| `carga.folga` | 0,5 cm | desenho | desenho | 'mãos rentes às pernas': a folga entre a mão fechada e a pele da coxa ou da canela; a volta do elástico por cima da mão quase encosta na perna |
| `erro.arred.lombar` | 24 graus | desenho | desenho | erro: a lombar arredonda (flexão além da curva de repouso, embaixo) |
| `erro.arred.toracica` | 6 graus | desenho | desenho | erro: as costas de cima também curvam um pouco |
| `erro.arred.bacia` | 12 graus | desenho | desenho | erro: a bacia inclina menos que no certo (quem dobra é a lombar) |
| `erro.agachar.joelho` | 62 graus | desenho | desenho | erro: os joelhos dobram e o quadril desce |
| `erro.agachar.tronco` | 42 graus | desenho | desenho | erro: o tronco inclina pouco (vira um agachamento) |
| `erro.longe.folga` | 16 cm | desenho | desenho | erro: as mãos descem longe das pernas (folga embaixo) |
| `mao.raio` | 4 cm | desenho | desenho | raio da mão fechada no pegador (metade da espessura do punho fechado): é o que fica rente às pernas |
| `elastico.voltaNaMao` | 4,5 cm | desenho | desenho | raio da volta do elástico por cima da mão fechada |
| `elastico.folgaNaPerna` | 1 cm | desenho | desenho | onde a linha reta da mão ao pé entraria na perna, o tubo passa por fora dela, com esta folga |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | aqui o elástico pesa mais | consenso |
| Descida · excêntrica | exc | 2,5 s | firme | ~2–3 s | consenso |
| Embaixo · alongado | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- a lombar não arredonda (coluna neutra) (consenso)
- quem dobra é o quadril: o quadril vai para trás e os joelhos ficam levemente dobrados, quase no mesmo ângulo (consenso)
- em pé, o quadril fica estendido, sem jogar o tronco para trás (consenso)
- as mãos descem rentes às coxas e às canelas, sem atravessar as pernas (consenso)
- o centro de massa (corpo) fica sobre o meio do pé (consenso)

Erros desenhados:

- Coluna arredondada (vista: lateral): a bacia para de inclinar e a lombar arredonda para descer mais
- Agachar em vez de levar o quadril para trás (vista: lateral): os joelhos dobram e o quadril desce, com o tronco pouco inclinado
- Mãos longe das pernas (vista: lateral): as mãos descem à frente, longe das pernas

Fontes desta ficha:

- `guia`: Ficha da técnica (docs/pesquisa/animacoes/stiff-elastico.md) e texto do app (src/conteudo/exercicios/stiff-elastico.json): a técnica do stiff aprovado, com o elástico preso embaixo dos pés no lugar dos halteres; consenso de treinadores (nsca2021, não verificado)
- `equilibrio`: Em pé, parado, a projeção do centro de massa (corpo + carga) cai dentro do apoio dos pés (mecânica); a ficha não diz onde no pé, e o desenho usa o meio do pé
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado
- `stiff`: A ficha de movimento do stiff com halteres (src/engine/novo/dados/movimentos/stiff.json): a ficha da técnica manda partir do stiff aprovado
- `fisica`: Física do elástico: a força cresce com o quanto ele estica (como a ficha da técnica registra); a borracha não muda de volume, então o tubo afina ao esticar

### Stiff com kettlebell (`stiff-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/stiff-kettlebell.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho.cima` | 8 graus | desenho | stiff | em pé: joelhos levemente dobrados (a ficha não dá número) |
| `joelho.baixo` | 15 graus | desenho | stiff | embaixo: o ângulo do joelho fica quase igual ao de cima (a ficha: 'esse ângulo fica quase igual a série toda') |
| `tronco.cima` | 0 graus | consenso | guia | em pé: quadril estendido, sem jogar o tronco para trás |
| `maos.embaixo` | 0,65 fração da canela | desenho | desenho | embaixo, as mãos param a 65% da canela (do tornozelo ao joelho), um pouco acima do stiff com halteres (50%): a bola do kettlebell, que pende 22 cm abaixo das mãos, para acima do peito do pé em vez de encostar nele. A ficha diz que até onde o kettlebell chega depende da flexibilidade e que se desce só até onde as costas continuam retas. A inclinação do tronco embaixo sai desta altura |
| `cervical` | 0 graus | consenso | guia | pescoço na linha do tronco ('coluna longa do quadril à cabeça') |
| `cabeca` | 0 graus | consenso | guia | cabeça na linha do pescoço |
| `cotovelo` | 4 graus | desenho | desenho | braços quase estendidos, sem travar o cotovelo |
| `cotovelo.paraFora` | 1 proporção | desenho | desenho | os cotovelos apontam para trás e para fora (quanto para fora em relação a para trás), com as palmas para as pernas |
| `carga.folga` | 1 cm | desenho | desenho | 'kettlebell rente às pernas', sem bater nas canelas: a folga entre a bola do kettlebell e a pele da coxa ou da canela |
| `erro.arred.lombar` | 24 graus | desenho | desenho | erro: a lombar arredonda (flexão além da curva de repouso, embaixo) |
| `erro.arred.toracica` | 6 graus | desenho | desenho | erro: as costas de cima também curvam um pouco |
| `erro.arred.bacia` | 12 graus | desenho | desenho | erro: a bacia inclina menos que no certo (quem dobra é a lombar) |
| `erro.agachar.joelho` | 62 graus | desenho | desenho | erro: os joelhos dobram e o quadril desce |
| `erro.agachar.tronco` | 42 graus | desenho | desenho | erro: o tronco inclina pouco (vira um agachamento) |
| `erro.longe.folga` | 16 cm | desenho | desenho | erro: o kettlebell desce longe das pernas (folga embaixo) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,5 s | firme | ~2–3 s | consenso |
| Embaixo · alongado | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- a lombar não arredonda (coluna neutra) (consenso)
- quem dobra é o quadril: o quadril vai para trás e os joelhos ficam levemente dobrados, quase no mesmo ângulo (consenso)
- em pé, o quadril fica estendido, sem jogar o tronco para trás (consenso)
- o kettlebell desce perto das pernas, sem bater nas canelas, sem atravessar as pernas (consenso)
- o kettlebell não bate nas pernas nem nos pés (segurança: segurar firme e não deixar o kettlebell bater nas canelas) (consenso)
- o centro de massa (corpo + kettlebell) fica sobre o meio do pé (consenso)

Erros desenhados:

- Coluna arredondada (vista: lateral): a bacia para de inclinar e a lombar arredonda para descer mais
- Agachar em vez de levar o quadril para trás (vista: lateral): os joelhos dobram e o quadril desce, com o tronco pouco inclinado
- Kettlebell longe das pernas (vista: lateral): o kettlebell desce à frente, longe das pernas

Fontes desta ficha:

- `guia`: Ficha da técnica (docs/pesquisa/animacoes/stiff-kettlebell.md, pesquisa-v2/11-catalogo-completo.md B.2.6) e texto do app (src/conteudo/exercicios/stiff-kettlebell.json): a mesma técnica do stiff aprovado, com o kettlebell seguro pela alça com as duas mãos; consenso de treinadores (nsca2021, não verificado)
- `equilibrio`: Em pé, parado, a projeção do centro de massa (corpo + carga) cai dentro do apoio dos pés (mecânica); a ficha não diz onde no pé, e o desenho usa o meio do pé
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado
- `stiff`: A ficha de movimento do stiff com halteres (src/engine/novo/dados/movimentos/stiff.json): a ficha da técnica manda partir do stiff aprovado

### Stiff unilateral com halter (`stiff-unilateral`)

Ficha da técnica: `docs/pesquisa/animacoes/stiff-unilateral.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | stiff | onde o pé de apoio (o direito) fica no chão, a partir do meio; a bacia vai para cima dele |
| `joelho.cima` | 10 graus | desenho | desenho | em pé numa perna: o joelho de apoio levemente dobrado (a ficha não dá número) |
| `joelho.baixo` | 16 graus | desenho | desenho | embaixo: o joelho de apoio fica quase no mesmo ângulo ('levemente dobrado e fixo') |
| `tronco.cima` | 0 graus | consenso | ficha | início: em pé numa perna |
| `tronco.baixo` | 78 graus | consenso | ficha | fim: 'tronco quase paralelo ao chão' (inclinação do peito; 90 = horizontal) |
| `livre.coxa.cima` | -4 graus | desenho | desenho | em pé: a coxa da perna livre pende quase na vertical, um pouco à frente (negativo = à frente), com o pé logo atrás do pé de apoio |
| `livre.joelho.cima` | 62 graus | desenho | desenho | em pé: o joelho da perna livre dobra o bastante para o pé sair do chão |
| `livre.joelho.baixo` | 4 graus | desenho | desenho | embaixo: a perna livre quase estendida, na linha do tronco |
| `livre.tornozelo` | 10 graus | desenho | desenho | o pé da perna livre, um pouco esticado (dedos para baixo, embaixo) |
| `cervical` | -6 graus | consenso | ficha | 'olhar à frente e para baixo': o pescoço quase na linha do tronco, um pouco estendido |
| `cabeca` | 0 graus | consenso | ficha | cabeça na linha do pescoço |
| `cotovelo` | 4 graus | desenho | stiff | braços quase estendidos, sem travar o cotovelo |
| `cotovelo.paraFora` | 1 proporção | desenho | stiff | os cotovelos apontam para trás e para fora, com a palma para a perna |
| `carga.folga` | 0,6 cm | desenho | desenho | 'halter perto da perna': a folga entre a cabeça do halter e a pele da perna de apoio |
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb), na mão direita, do lado da perna de apoio; entra no equilíbrio |
| `erro.abre.giro` | 24 graus | desenho | desenho | erro: a bacia gira em torno do tronco para o lado da perna livre (o quadril esquerdo sobe) |
| `erro.arred.lombar` | 24 graus | desenho | stiff | erro: a lombar arredonda (flexão além da curva de repouso, embaixo) |
| `erro.arred.toracica` | 6 graus | desenho | stiff | erro: as costas de cima também curvam um pouco |
| `erro.arred.bacia` | 12 graus | desenho | stiff | erro: a bacia inclina menos que no certo (quem dobra é a lombar) |
| `erro.agachar.joelho` | 55 graus | desenho | desenho | erro: o joelho de apoio dobra muito |
| `erro.agachar.tronco` | 42 graus | desenho | desenho | erro: o tronco inclina pouco (vira um agachamento numa perna) |
| `erro.agachar.livre.joelho` | 60 graus | desenho | desenho | erro: a perna livre fica para trás com o joelho dobrado, como num agachamento numa perna |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | apoio numa perna | consenso |
| Descida · excêntrica | exc | 2,5 s | firme | ~2–3 s | consenso |
| Embaixo · alongado | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,4 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`.

Regras que a conferência mede:

- a coluna fica reta (a lombar não arredonda) (consenso)
- o quadril vai para trás, com o joelho de apoio levemente dobrado e fixo (consenso)
- em pé numa perna, o quadril estendido (consenso)
- fim: tronco quase paralelo ao chão (consenso)
- fim: a perna livre na mesma linha do tronco (consenso)
- quadril nivelado o tempo todo (consenso)
- halter perto da perna, sem atravessá-la (consenso)
- o centro de massa (corpo + halter) cai sobre o pé de apoio (consenso)

Erros desenhados:

- Abrir o quadril (vista: quinaTras): a bacia gira para o lado da perna livre: o quadril esquerdo sobe
- Arredondar as costas (vista: lateral): a bacia para de inclinar e a lombar arredonda
- Agachar (vista: lateral): o joelho de apoio dobra muito e o quadril desce

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/stiff-unilateral.md) e texto do app (src/conteudo/exercicios/stiff-unilateral.json): consenso de treinadores (nsca2021, não verificado); a mesma lógica do stiff aprovado
- `stiff`: A ficha de movimento do stiff com halteres (src/engine/novo/dados/movimentos/stiff.json)
- `equilibrio`: Numa perna só, a projeção do centro de massa (corpo + halter) cai sobre o pé de apoio (mecânica); o desenho usa o meio do pé, para a frente e de lado
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Stiff com halteres (`stiff`)

Ficha da técnica: `docs/pesquisa/animacoes/stiff.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | consenso | guia | pés na largura do quadril, apontando para a frente (os centros do quadril ficam a 8,35 cm do meio) |
| `joelho.cima` | 8 graus | desenho | desenho | em pé: joelhos levemente dobrados (a ficha não dá número) |
| `joelho.baixo` | 15 graus | desenho | desenho | embaixo: o ângulo do joelho fica quase igual ao de cima (a ficha: 'esse ângulo fica quase igual a série toda') |
| `tronco.cima` | 0 graus | consenso | guia | em pé: quadril estendido, sem jogar o tronco para trás |
| `maos.embaixo` | 0,5 fração da canela | consenso | guia | embaixo, os halteres chegam perto do meio da canela (do tornozelo ao joelho: 0 = tornozelo, 1 = joelho); a ficha diz que isso vale para muita gente e depende da flexibilidade. A inclinação do tronco embaixo sai desta altura |
| `cervical` | 0 graus | consenso | guia | pescoço na linha do tronco ('coluna longa do quadril à cabeça') |
| `cabeca` | 0 graus | consenso | guia | cabeça na linha do pescoço |
| `maos.meiaDistancia` | 17 cm | desenho | objetos | halteres na frente das coxas, lado a lado: cada mão fica a meio comprimento do halter (16,5 cm) mais meio centímetro do meio do corpo, para os dois halteres não baterem |
| `cotovelo` | 4 graus | desenho | desenho | braços quase estendidos, sem travar o cotovelo |
| `cotovelo.paraFora` | 1 proporção | desenho | desenho | os cotovelos apontam para trás e para fora (quanto para fora em relação a para trás), com as palmas para as pernas |
| `carga.folga` | 1 cm | desenho | desenho | 'halteres rentes às pernas': a folga entre a cabeça do halter e a pele da coxa ou da canela |
| `carga` | 11,3 kg | desenho | objetos | cada halter desenhado (25 lb); entram no equilíbrio |
| `erro.arred.lombar` | 24 graus | desenho | desenho | erro: a lombar arredonda (flexão além da curva de repouso, embaixo) |
| `erro.arred.toracica` | 6 graus | desenho | desenho | erro: as costas de cima também curvam um pouco |
| `erro.arred.bacia` | 12 graus | desenho | desenho | erro: a bacia inclina menos que no certo (quem dobra é a lombar) |
| `erro.agachar.joelho` | 62 graus | desenho | desenho | erro: os joelhos dobram e o quadril desce |
| `erro.agachar.tronco` | 42 graus | desenho | desenho | erro: o tronco inclina pouco (vira um agachamento) |
| `erro.longe.folga` | 16 cm | desenho | desenho | erro: os halteres descem longe das pernas (folga embaixo) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em pé | pausa | 0,5 s | inspira | respire e firme o abdômen | consenso |
| Descida · excêntrica | exc | 2,5 s | firme | ~2–3 s | consenso |
| Embaixo · alongado | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- a lombar não arredonda (coluna neutra) (consenso)
- quem dobra é o quadril: o quadril vai para trás e os joelhos ficam levemente dobrados, quase no mesmo ângulo (consenso)
- em pé, o quadril fica estendido, sem jogar o tronco para trás (consenso)
- os halteres descem rentes às coxas e às canelas, sem atravessar as pernas (consenso)
- embaixo, os halteres chegam perto do meio da canela (consenso)
- o centro de massa (corpo + halteres) fica sobre o meio do pé (consenso)

Erros desenhados:

- Coluna arredondada (vista: lateral): a bacia para de inclinar e a lombar arredonda para descer mais
- Agachar em vez de levar o quadril para trás (vista: lateral): os joelhos dobram e o quadril desce, com o tronco pouco inclinado
- Halteres longe das pernas (vista: lateral): os halteres descem à frente, longe das pernas

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/stiff.md e no texto do app (src/conteudo/exercicios/stiff.json): consenso de treinadores
- `equilibrio`: Em pé, parado, a projeção do centro de massa (corpo + carga) cai dentro do apoio dos pés (mecânica); a ficha não diz onde no pé, e o desenho usa o meio do pé
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Supino reto com halteres (`supino-reto`)

Ficha da técnica: `docs/pesquisa/animacoes/supino-reto.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `cabeca.folgaNoBanco` | 3 cm | desenho | desenho | do topo da cabeça à ponta do banco: a ficha pede glúteo, costas e cabeça apoiados no banco e não dá número (pedido do Gustavo em 15/11/2026: a cabeça estava baixa demais no banco) |
| `cotovelos.doTronco` | 50 graus | consenso | tecnica08 | cotovelos a ~30–60° do tronco |
| `braco.cima` | 80 graus | consenso | guia | topo: halteres sobre os ombros, cotovelos quase estendidos (braço a 80° acima da horizontal: cotovelo a 10°) |
| `braco.baixo` | -14 graus | consenso | guia | embaixo: cotovelos um pouco abaixo da linha do tronco (braço abaixo da horizontal) |
| `pegada.giro` | 25 graus | consenso | guia | pegada levemente neutra: palmas giradas 20–30° uma para a outra |
| `escapula.retracao` | 9 graus | consenso | guia | escápulas levemente juntas; a ficha não dá número |
| `escapula.depressao` | 4 graus | consenso | guia | escápulas para baixo; a ficha não dá número |
| `pes.meiaDistancia` | 22 cm | consenso | guia | pés um pouco mais abertos que o quadril |
| `carga` | 11,3 kg | desenho | objetos | cada halter desenhado (25 lb) |
| `erro.cot.doTronco` | 88 graus | desenho | desenho | erro: cotovelos abertos a ~90° |
| `erro.escap.protracao` | 16 graus | desenho | desenho | erro: os ombros saem do banco no topo |
| `erro.curta.braco` | 28 graus | desenho | desenho | erro: para longe do peito |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Topo | pausa | 0,6 s | inspira | respire | consenso |
| Descida · excêntrica | exc | 2,5 s | inspira | ~2–3 s | consenso |
| Embaixo · sem quicar | pausa | 0,45 s | firme | pausa curta | consenso |
| Subida · concêntrica | conc | 1,3 s | expira | ~1–1,5 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- antebraço na vertical durante todo o movimento (consenso)
- cotovelos a 30–60° do tronco (consenso)
- no topo, os halteres ficam sobre os ombros (consenso)

Erros desenhados:

- Cotovelos abertos a ~90° (vista: cima): o braço fica perpendicular ao tronco
- Ombros saem do banco no topo (vista: lateral): a clavícula vai à frente e o ombro descola do banco
- Descer pouco (vista: lateral): para com o braço 28° acima da horizontal

Fontes desta ficha:

- `guia`: Guia original do projeto, como registrado em docs/pesquisa/animacoes/supino-reto.md: consenso de treinadores
- `tecnica08`: docs/pesquisa/08-tecnica-guia.md, conclusão 4 (tecnica.supino-halteres.cotovelos): consenso com apoio biomecânico
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps na polia com corda (`triceps-corda`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-corda.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 11 cm | consenso | guia | pés na largura do quadril: cada bola do pé a 11 cm do meio |
| `pe.z` | 12 cm | desenho | desenho | a bola dos pés, à frente do meio da pelve |
| `pelve.z` | -3 cm | desenho | desenho | a pelve um pouco atrás, para o peso ficar sobre o meio dos pés com o tronco inclinado |
| `joelho` | 10 graus | consenso | guia | joelhos destravados (a ficha não dá número; a altura da pelve sai daqui) |
| `tronco.inclinacao` | 15 graus | consenso | guia | tronco levemente inclinado à frente (o texto do app: de reto até ~20°, preferência): o eixo do tórax, da vertical |
| `cervical` | -6 graus | desenho | desenho | o pescoço estende um pouco a partir da linha do tronco inclinado: o olhar à frente |
| `cabeca` | -4 graus | desenho | desenho | a cabeça acompanha o pescoço: o olhar à frente, não para o chão |
| `braco.frente` | 15 graus | consenso | guia | cotovelos colados nas laterais do tronco: o braço na linha do tronco, sem ir à frente |
| `braco.paraDentro` | 2 graus | desenho | desenho | o braço vai um pouco para o meio, até o cotovelo encostar ao lado das costelas |
| `cotovelo.alto` | 112 graus | consenso | guia | em cima: cotovelos dobrados, mãos na altura do peito (a ficha não dá número; a conferência mede a altura das mãos) |
| `cotovelo.baixo` | 4 graus | consenso | guia | embaixo: cotovelo totalmente estendido |
| `maos.meiaDistancia.alto` | 6,5 cm | desenho | desenho | em cima, as mãos perto uma da outra, cada uma num ramo, junto da ponta de borracha |
| `antebraco.giroParaFora.baixo` | 0 graus | consenso | guia | embaixo, a corda abre: o antebraço gira para fora em volta do braço e leva as mãos para os lados das coxas (a conferência mede a abertura) |
| `cabo.inclinacao` | 20 graus | desenho | hoje | em cima, o cabo sai da roldana um pouco à frente da bucha: de frente para a coluna, a cerca de meio passo |
| `erro.cotovelo.frente` | 45 graus | desenho | desenho | erro: em cima, o braço sobe à frente e sai do tronco |
| `erro.cotovelo.cotovelo` | 115 graus | desenho | desenho | erro: em cima, com o braço à frente, o cotovelo dobra mais e as mãos sobem acima do peito |
| `erro.tronco.inclinacao` | 34 graus | desenho | desenho | erro: o tronco debruça sobre a corda enquanto as mãos descem |
| `erro.tronco.toracica` | 8 graus | desenho | hoje | erro: as costas arredondam um pouco ao debruçar |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Em cima | pausa | 0,4 s | inspira | cotovelos colados | consenso |
| Extensão · concêntrica | conc | 1 s | expira | ~1 s | consenso |
| Embaixo · corda aberta | pausa | 0,5 s | firme | contrai | consenso |
| Volta · excêntrica | exc | 2 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os cotovelos ficam no mesmo lugar do início ao fim: só o antebraço se mexe (consenso)
- cotovelos colados nas laterais do tronco (consenso)
- em cima, mãos na altura do peito, cotovelos dobrados (consenso)
- embaixo, cotovelo totalmente estendido (consenso)
- no fim, abra a corda levando as mãos para os lados das coxas (consenso)
- tronco levemente inclinado à frente (até ~20°) e parado (consenso)
- a corda e o cabo passam sem encostar no corpo (desenho)
- cada mão fecha num ramo da corda, perto da ponta de borracha, e o ramo fica esticado até a bucha (desenho)

Erros desenhados:

- Cotovelos sobem e saem do tronco (vista: lateral): em cima, o braço sobe à frente e o cotovelo sai do lado do tronco
- Debruçar o tronco (vista: lateral): o tronco debruça sobre a corda enquanto as mãos descem

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/triceps-corda.md e no texto do app (src/conteudo/exercicios/triceps-corda.json): consenso de treinadores
- `hoje`: A animação de hoje (src/engine/exercicios/triceps-corda.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json e src/engine/novo/dados/objetos/corda-triceps.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps acima da cabeça com elástico (`triceps-elastico-acima`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-elastico-acima.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | cada pé a 9 cm do meio, de frente (a ficha só pede um pé à frente do outro) |
| `pe.frente.z` | 22 cm | desenho | hoje | a bola do pé da frente (o direito), à frente do meio do corpo: o passo de hoje |
| `pe.tras.z` | -12 cm | desenho | hoje | a bola do pé de trás (o esquerdo), atrás do meio do corpo (hoje: 26 cm; mais curto para o pé de trás ficar inteiro no chão, pisando no elástico, com o joelho de trás destravado) |
| `pe.tras.calcanhar` | 0 graus | consenso | ficha | o pé de trás fica inteiro no chão: ele pisa no meio do elástico, no meio da sola |
| `pelve.z` | -5 cm | desenho | desenho | o meio da pelve fica um pouco atrás do meio dos dois pés (o peso um pouco mais na perna de trás, que pisa no elástico) |
| `joelho.frente` | 20 graus | consenso | ficha | joelhos destravados: o da frente dobra um pouco (a ficha não dá número; a altura da pelve sai daqui) |
| `tronco.inclinacao` | 3 graus | consenso | ficha | tronco quase vertical, abdômen firme (a ficha não pede inclinação; hoje o tronco fica quase em pé) |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `braco.elevacao` | 172,5 graus | consenso | frances | braços acima da cabeça, ao lado das orelhas (o francês aprovado usa 168° com o tronco inclinado 27°; aqui, com o tronco em pé, 172,5° (a elevação média do ombro é 170°): o braço fica quase vertical e as mãos ficam sobre a cabeça em cima) |
| `braco.paraDentro` | 6 graus | desenho | frances | o braço vai um pouco para o meio: cotovelos perto da cabeça, sem abrir (o do francês aprovado) |
| `cotovelo.alongado` | 135 graus | consenso | frances | alongado: mãos atrás da cabeça, cotovelos bem dobrados (o do francês aprovado) |
| `cotovelo.estendido` | 8 graus | consenso | frances | fim: cotovelos estendidos, sem travar |
| `maos.meiaDistancia` | 7 cm | desenho | ficha | as duas mãos juntas atrás da cabeça, segurando a ponta de cima do laço |
| `elastico.folga` | 0,6 cm | desenho | objetos | a faixa passa rente ao corpo: metade da espessura (0,45 cm) e a camiseta |
| `erro.abre.fora` | 22 graus | desenho | desenho | erro: os cotovelos abrem para os lados (no alongado) |
| `erro.abre.volta` | 1 fração | desenho | desenho | erro: os cotovelos abrem na volta e fecham estendendo (as mãos continuam juntas na faixa) |
| `erro.cotovelo.elevacao` | 135 graus | desenho | desenho | erro: no alongado o braço desce à frente (vira um pullover) |
| `erro.cotovelo.cotovelo` | 100 graus | desenho | desenho | erro: com o braço mais baixo, o cotovelo dobra menos no alongado (as mãos passam acima da cabeça) |
| `erro.curta.cotovelo` | 90 graus | consenso | ficha | erro: para com o cotovelo a 90° |
| `erro.arco.lombar` | 12 graus | desenho | desenho | erro: a lombar arqueia enquanto as mãos sobem |
| `erro.arco.toracica` | 4 graus | desenho | desenho | erro: as costas de cima também estendem |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | mãos atrás da cabeça | consenso |
| Extensão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Braços estendidos | pausa | 0,4 s | firme | o elástico mais esticado | consenso |
| Volta · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os cotovelos ficam no mesmo lugar do início ao fim: só o antebraço se mexe (consenso)
- braços ao lado das orelhas, cotovelos perto da cabeça, sem abrir para os lados (consenso)
- embaixo, mãos atrás da cabeça, cotovelos bem dobrados (consenso)
- em cima, cotovelos estendidos (consenso)
- tronco quase vertical e parado, abdômen firme, sem arquear (consenso)
- o pé de trás pisa no meio do elástico, no meio da sola, e fica inteiro no chão (consenso)
- a faixa sobe pelas costas rente ao corpo, sem entrar nele (desenho)
- as duas mãos seguram juntas a ponta de cima do laço, atrás da cabeça (consenso)

Erros desenhados:

- Abrir os cotovelos (vista: frontal): os cotovelos se afastam da cabeça, para os lados
- Cotovelos sobem e descem (vista: lateral): no alongado o braço desce à frente e o ombro entra no movimento
- Arquear as costas (vista: lateral): a lombar e as costas de cima arqueiam enquanto as mãos sobem
- Não alongar atrás da cabeça (vista: lateral): a volta para com o cotovelo a 90°, sem levar as mãos para trás da cabeça

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/triceps-elastico-acima.md) e texto do app (src/conteudo/exercicios/triceps-elastico-acima.json): consenso de treinadores; a posição dos braços é a do triceps-frances e do triceps-frances-halter aprovados
- `frances`: Ficha de movimento do tríceps francês aprovado (src/engine/novo/dados/movimentos/triceps-frances.json): os mesmos ângulos do braço e do cotovelo
- `hoje`: A animação de hoje (src/engine/exercicios/triceps-elastico-acima.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos/elastico-longo.json (elástico longo em laço, 41 pol)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps francês sentado com halter (`triceps-frances-halter`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-halter.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco.inclinacao` | 0 graus | consenso | ficha | sentado com as costas retas: o eixo do tórax na vertical |
| `nadega.afunda` | 1,5 cm | desenho | desenho | quanto a nádega afunda no estofado do banco |
| `pes.meiaDistancia` | 16 cm | desenho | hoje | pés firmes no chão, um pouco mais abertos que o quadril |
| `coxa.inclinacao` | 0 graus | desenho | desenho | a coxa quase na horizontal (o banco tem a altura do joelho) |
| `pes.aFrenteDoJoelho` | 4 cm | desenho | desenho | o tornozelo um pouco à frente do joelho |
| `banco.daPonta` | 14 cm | desenho | desenho | a ponta da frente do banco fica 14 cm à frente do meio da pelve: sentado na ponta, o banco segue para trás |
| `banco.noQuadro` | 40 cm | desenho | desenho | só a ponta do banco entra no enquadramento |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço, olhando à frente |
| `braco.elevacao` | 165 graus | consenso | ficha | cotovelos apontando para cima, perto da cabeça: o braço a 165° do braço pendurado, no referencial do tronco (abaixo da elevação média de 170°) |
| `braco.paraDentro` | 8 graus | desenho | desenho | o braço vai para o meio o bastante para as duas mãos ficarem juntas no halter, com os cotovelos perto da cabeça |
| `cotovelo.alongado` | 130 graus | consenso | ficha | alongado: halter atrás da cabeça, cotovelos bem dobrados (a ficha não dá número; abaixo da flexão máxima média de 148°) |
| `cotovelo.estendido` | 8 graus | consenso | ficha | braços estendidos acima da cabeça, sem travar |
| `maos.meiaDistancia` | 6 cm | consenso | correcao | as duas mãos juntas sob a cabeça de cima do halter, 12 cm entre os centros |
| `palma.espessura` | 1,8 cm | desenho | desenho | do centro da mão à palma, onde a cabeça de cima do halter apoia |
| `carga.giro.alongado` | 112 graus | desenho | desenho | no alongado, o halter pende quase na vertical atrás da cabeça: o eixo do halter, girado a partir do antebraço |
| `carga.giro.estendido` | 26 graus | desenho | desenho | estendido, o halter fica acima da cabeça, um pouco inclinado (a cabeça de baixo passa atrás dos antebraços); o punho estende 62° |
| `erro.abre.fora` | 20 graus | desenho | desenho | erro: os cotovelos abrem para os lados (no alongado) |
| `erro.abre.volta` | 1 fração | desenho | desenho | erro: os cotovelos abrem na volta e fecham estendendo (em cima as duas mãos continuam juntas no halter) |
| `erro.arco.lombar` | 14 graus | desenho | desenho | erro: a lombar arqueia (estende além da curva de repouso) enquanto o halter sobe |
| `erro.arco.toracica` | 4 graus | desenho | desenho | erro: as costas de cima também estendem |
| `erro.curta.cotovelo` | 75 graus | desenho | desenho | erro: o halter não desce atrás da cabeça (para com o cotovelo a 75°) |
| `maos.dedosGiro` | -5 graus | desenho | desenho | os dedos seguem o antebraço, girados 5° na palma para dentro (positivo = para fora): assim a pronação do antebraço fica abaixo do máximo observado (108°) no alongado e no estendido |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | halter atrás da cabeça | consenso |
| Extensão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Braços estendidos | pausa | 0,4 s | firme | halter acima da cabeça | consenso |
| Volta · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- os cotovelos ficam parados: só os antebraços descem atrás da cabeça e voltam (consenso)
- cotovelos apontando para cima, perto da cabeça, sem abrir para os lados (consenso)
- início: halter atrás da cabeça, cotovelos bem dobrados (consenso)
- fim: braços estendidos acima da cabeça (consenso)
- sentado com as costas retas (consenso)
- o halter passa atrás da cabeça sem encostar na cabeça, na nuca, nas costas nem no banco (desenho)
- as duas mãos juntas sob a cabeça de cima do halter, 12 cm entre elas (consenso)

Erros desenhados:

- Abrir os cotovelos (vista: frontal): os cotovelos se afastam da cabeça, para os lados
- Arquear as costas (vista: lateral): a lombar e as costas de cima arqueiam enquanto o halter sobe
- Amplitude curta (vista: lateral): o halter para acima da cabeça, sem descer atrás dela

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/triceps-frances-halter.md) e texto do app (src/conteudo/exercicios/triceps-frances-halter.json): consenso de treinadores (nsca2021, não verificado)
- `correcao`: Correção de 04/11/2026 registrada em docs/revisoes/animacao-nova/correcoes-ja-feitas.md: mãos juntas na anilha, 12 cm
- `familia`: O tríceps francês na polia com corda (src/engine/novo/dados/movimentos/triceps-frances.json): o mesmo braço acima da cabeça
- `hoje`: A animação de hoje (src/engine/exercicios/triceps-frances-halter.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps francês sentado com kettlebell (`triceps-frances-kettlebell`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-kettlebell.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco.inclinacao` | 0 graus | consenso | ficha | sentado com as costas retas: o eixo do tórax na vertical |
| `nadega.afunda` | 1,5 cm | desenho | halter | quanto a nádega afunda no estofado do banco |
| `pes.meiaDistancia` | 16 cm | desenho | halter | pés firmes no chão, um pouco mais abertos que o quadril |
| `coxa.inclinacao` | 0 graus | desenho | halter | a coxa quase na horizontal (o banco tem a altura do joelho) |
| `pes.aFrenteDoJoelho` | 4 cm | desenho | halter | o tornozelo um pouco à frente do joelho |
| `banco.daPonta` | 14 cm | desenho | halter | a ponta da frente do banco fica 14 cm à frente do meio da pelve: sentado na ponta, o banco segue para trás |
| `banco.noQuadro` | 40 cm | desenho | halter | só a ponta do banco entra no enquadramento |
| `cervical` | 0 graus | desenho | halter | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | halter | cabeça na linha do pescoço, olhando à frente |
| `braco.elevacao` | 165 graus | consenso | ficha | cotovelos apontando para cima, perto da cabeça: o braço a 165° do braço pendurado, no referencial do tronco (como no halter) |
| `braco.paraDentro` | 8 graus | desenho | halter | o braço vai para o meio o bastante para as duas mãos ficarem nas hastes da alça, com os cotovelos perto da cabeça |
| `cotovelo.alongado` | 130 graus | consenso | ficha | alongado: kettlebell atrás da cabeça, cotovelos para cima (a ficha não dá número; como no halter) |
| `cotovelo.estendido` | 8 graus | consenso | ficha | braços estendidos acima da cabeça, sem travar |
| `maos.meiaDistancia` | 6,15 cm | consenso | objetos | as duas mãos nas hastes da alça ("chifres"): a meia distância entre as hastes do kettlebell da tabela (123 mm) |
| `carga.giro.alongado` | 115 graus | consenso | ficha | no alongado, a bola para baixo, atrás da cabeça: o eixo do kettlebell (da base à alça) quase na vertical, girado a partir do antebraço |
| `carga.giro.estendido` | 72 graus | desenho | desenho | estendido, o kettlebell fica deitado atrás das mãos, acima da cabeça, com o eixo quase perpendicular ao antebraço (o punho reto) |
| `erro.abre.fora` | 20 graus | desenho | halter | erro: os cotovelos abrem para os lados (no alongado) |
| `erro.abre.volta` | 1 fração | desenho | halter | erro: os cotovelos abrem na volta e fecham estendendo (em cima as duas mãos continuam na alça) |
| `erro.arco.lombar` | 14 graus | desenho | halter | erro: a lombar arqueia (estende além da curva de repouso) enquanto o kettlebell sobe |
| `erro.arco.toracica` | 4 graus | desenho | halter | erro: as costas de cima também estendem |
| `erro.curta.cotovelo` | 75 graus | desenho | halter | erro: o kettlebell não desce atrás da cabeça (para com o cotovelo a 75°) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | kettlebell atrás da cabeça | consenso |
| Extensão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Braços estendidos | pausa | 0,4 s | firme | kettlebell acima da cabeça | consenso |
| Volta · excêntrica | exc | 2,4 s | inspira | ~2–3 s, devagar | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pelve`.

Regras que a conferência mede:

- os cotovelos ficam parados: só os antebraços descem o kettlebell atrás da cabeça e voltam (consenso)
- cotovelos apontando para cima, perto da cabeça, sem abrir para os lados (consenso)
- início: kettlebell atrás da cabeça, cotovelos bem dobrados (consenso)
- fim: braços estendidos acima da cabeça (consenso)
- sentado com as costas retas (consenso)
- o kettlebell passa atrás da cabeça sem encostar na cabeça, na nuca, nas costas nem no banco (consenso)
- as duas mãos pelos lados da alça (a alça passa pelas duas mãos), a bola para baixo (consenso)

Erros desenhados:

- Abrir os cotovelos (vista: frontal): os cotovelos se afastam da cabeça, para os lados
- Arquear as costas (vista: lateral): a lombar e as costas de cima arqueiam enquanto o kettlebell sobe
- Amplitude curta (vista: lateral): o kettlebell para acima da cabeça, sem descer atrás dela

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/triceps-frances-kettlebell.md, B.2.6) e texto do app (src/conteudo/exercicios/triceps-frances-kettlebell.json): consenso de treinadores
- `correcao`: Correção de 04/11/2026 registrada em docs/revisoes/animacao-nova/correcoes-ja-feitas.md: o kettlebell nunca fica solto entre as mãos; a alça passa pelas duas mãos e a bola fica embaixo do meio
- `halter`: O tríceps francês sentado com halter (src/engine/novo/dados/movimentos/triceps-frances-halter.json), a base do desenho pela ficha da técnica
- `objetos`: src/engine/novo/dados/objetos.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps francês unilateral na polia, com estribo (`triceps-frances-polia-unilateral`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-polia-unilateral.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | cada pé a 9 cm do meio, de frente (a ficha só pede um pé à frente do outro) |
| `pe.frente.z` | 30 cm | desenho | frances | a bola do pé da frente (o direito), à frente do meio do corpo: passo como o de hoje |
| `pe.tras.z` | -30 cm | desenho | frances | a bola do pé de trás (o esquerdo), atrás do meio do corpo |
| `pe.tras.calcanhar` | 30 graus | desenho | frances | o calcanhar de trás sobe (o pé de trás apoia na ponta, como no passo de hoje) |
| `pelve.z` | -2 cm | desenho | desenho | o meio da pelve fica quase no meio dos dois pés |
| `joelho.frente` | 16 graus | consenso | frances | joelhos destravados: o da frente dobra um pouco (a ficha não dá número; a altura da pelve sai daqui) |
| `tronco.inclinacao` | 18 graus | desenho | hoje | tronco um pouco inclinado à frente (a ficha não dá número; a animação de hoje inclina o tronco um pouco): o eixo do tórax, da vertical |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `braco.elevacao` | 168 graus | consenso | ficha | braços acima da cabeça, ao lado das orelhas: o braço a 168° do braço pendurado, no referencial do tronco (estendido, o braço fica perto da linha do tronco) |
| `braco.paraDentro` | 6 graus | desenho | desenho | o braço vai um pouco para o meio: cotovelos à frente, perto da cabeça, sem abrir |
| `cotovelo.alongado` | 135 graus | consenso | ficha | alongado: mãos atrás da cabeça, cotovelos bem dobrados (a ficha não dá número; abaixo da flexão máxima média de 148°) |
| `cotovelo.estendido` | 8 graus | consenso | ficha | fim: cotovelos estendidos, sem travar |
| `maos.meiaDistancia` | 5 cm | consenso | ficha | no alongado, a mão atrás da cabeça, um pouco para o lado do braço que trabalha (o centro da mão a 5 cm do meio do tronco) |
| `erro.abre.fora` | 22 graus | desenho | desenho | erro: os cotovelos abrem para os lados (no alongado) |
| `erro.curta.cotovelo` | 90 graus | consenso | ficha | erro: para com o cotovelo a 90° |
| `erro.abre.volta` | 1 fração | desenho | desenho | erro: os cotovelos abrem na volta e fecham estendendo (em cima ficam perto da cabeça; as mãos continuam na corda) |
| `polia.altura` | 22 cm | consenso | hoje | polia embaixo: o carro a 22 cm do chão (montagem conferida em 04/11) |
| `cabo.inclinacao` | 64 graus | desenho | desenho | no alongado, o cabo desce do estribo até a roldana a 64° da horizontal, por trás das costas: a distância da coluna sai daqui |
| `maoNaCintura.x` | 15,5 cm | desenho | desenho | a outra mão na cintura (texto do app): o punho ao lado da crista do quadril, a esta distância do meio da pelve |
| `maoNaCintura.acima` | 3 cm | desenho | desenho | o punho um pouco acima da crista do quadril |
| `maoNaCintura.z` | -3 cm | desenho | desenho | o punho um pouco atrás do meio da pelve (os dedos vão para a frente) |
| `erro.arco.lombar` | 14 graus | desenho | desenho | erro: a lombar arqueia (estende além da curva de repouso) enquanto o halter sobe |
| `erro.arco.toracica` | 4 graus | desenho | desenho | erro: as costas de cima também estendem |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | mão atrás da cabeça | consenso |
| Extensão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Braço estendido | pausa | 0,4 s | firme | mão acima da cabeça | consenso |
| Volta · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- cotovelo apontando para cima; só o antebraço se mexe (consenso)
- cotovelo apontando para cima, perto da cabeça, sem abrir para o lado (consenso)
- início: mão atrás da cabeça, tríceps alongado (consenso)
- fim: braço estendido acima da cabeça (consenso)
- base escalonada, abdômen firme: o tronco não arqueia nem se mexe (consenso)
- o cabo passa por trás do corpo, sem encostar nele (consenso)
- a outra mão na cintura (consenso)

Erros desenhados:

- Abrir o cotovelo (vista: frontal): o cotovelo abre para o lado
- Arquear as costas (vista: lateral): a lombar e as costas de cima arqueiam para subir o estribo
- Amplitude curta (vista: lateral): a volta para com o cotovelo a 90°, sem levar a mão atrás da cabeça

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/triceps-frances-polia-unilateral.md) e texto do app (src/conteudo/exercicios/triceps-frances-polia-unilateral.json): consenso de treinadores; a posição do braço segue o triceps-frances e o triceps-frances-halter aprovados
- `frances`: A ficha de movimento do tríceps francês na polia (src/engine/novo/dados/movimentos/triceps-frances.json): o mesmo braço e o mesmo passo
- `hoje`: A animação de hoje (src/engine/exercicios/triceps-frances-polia-unilateral.ts) e a correção de 04/11 (polia a 20/22 cm do chão nos tríceps unilaterais; docs/revisoes/animacao-nova/correcoes-ja-feitas.md)
- `objetos`: src/engine/novo/dados/objetos.json (coluna de polia, estribo)
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps francês na polia com corda (`triceps-frances`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | cada pé a 9 cm do meio, de frente (a ficha só pede um pé à frente do outro) |
| `pe.frente.z` | 30 cm | desenho | hoje | a bola do pé da frente (o direito), à frente do meio do corpo: passo como o de hoje |
| `pe.tras.z` | -30 cm | desenho | hoje | a bola do pé de trás (o esquerdo), atrás do meio do corpo |
| `pe.tras.calcanhar` | 30 graus | desenho | hoje | o calcanhar de trás sobe (o pé de trás apoia na ponta, como no passo de hoje) |
| `pelve.z` | -2 cm | desenho | desenho | o meio da pelve fica quase no meio dos dois pés |
| `joelho.frente` | 16 graus | consenso | guia | joelhos destravados: o da frente dobra um pouco (a ficha não dá número; a altura da pelve sai daqui) |
| `tronco.inclinacao` | 27 graus | consenso | guia | tronco inclinado à frente ~25–30°: o eixo do tórax, da vertical |
| `cervical` | 0 graus | desenho | desenho | pescoço na linha do tronco |
| `cabeca` | 0 graus | desenho | desenho | cabeça na linha do pescoço |
| `braco.elevacao` | 168 graus | consenso | guia | braços acima da cabeça, ao lado das orelhas: o braço a 168° do braço pendurado, no referencial do tronco (estendido, o braço fica perto da linha do tronco) |
| `braco.paraDentro` | 6 graus | desenho | desenho | o braço vai um pouco para o meio: cotovelos à frente, perto da cabeça, sem abrir |
| `cotovelo.alongado` | 135 graus | consenso | guia | alongado: mãos atrás da cabeça, cotovelos bem dobrados (a ficha não dá número; abaixo da flexão máxima média de 148°) |
| `cotovelo.estendido` | 8 graus | consenso | guia | fim: cotovelos estendidos, sem travar |
| `maos.meiaDistancia` | 7 cm | desenho | desenho | no alongado, as duas mãos perto uma da outra atrás da cabeça, cada uma num ramo da corda |
| `maos.meiaDistancia.estendido` | 10 cm | desenho | desenho | estendido, as mãos se afastam um pouco (a corda abre em V da bucha às mãos) |
| `polia.acimaDoOmbro` | 0 cm | consenso | guia | carro mais ou menos na altura do ombro: a roldana na altura do centro do ombro, no alongado |
| `cabo.alongado` | 42 cm | desenho | desenho | da bucha da corda à roldana, no alongado: o passo à frente que deixa o cabo tenso |
| `erro.abre.fora` | 22 graus | desenho | desenho | erro: os cotovelos abrem para os lados (no alongado) |
| `erro.cotovelo.elevacao` | 135 graus | desenho | desenho | erro: no alongado o braço desce à frente (vira um pullover) |
| `erro.curta.cotovelo` | 90 graus | consenso | guia | erro: para com o cotovelo a 90° |
| `erro.abre.volta` | 1 fração | desenho | desenho | erro: os cotovelos abrem na volta e fecham estendendo (em cima ficam perto da cabeça; as mãos continuam na corda) |
| `erro.cotovelo.cotovelo` | 100 graus | desenho | desenho | erro: com o braço mais baixo, o cotovelo dobra menos no alongado (as mãos passam acima da cabeça, sem entrar nela) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Alongado | pausa | 0,5 s | inspira | mãos atrás da cabeça | consenso |
| Extensão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| Braços estendidos | pausa | 0,4 s | firme | na linha do tronco | consenso |
| Volta · excêntrica | exc | 2,4 s | inspira | ~2–3 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`.

Regras que a conferência mede:

- os cotovelos ficam no mesmo lugar do início ao fim: só o antebraço se mexe (consenso)
- cotovelos apontando para a frente, perto da cabeça, sem abrir para os lados (consenso)
- embaixo, mãos atrás da cabeça, cotovelos bem dobrados (consenso)
- em cima, cotovelos estendidos (consenso)
- tronco inclinado à frente ~25–30° (consenso)
- a corda e o cabo passam sem encostar na cabeça nem no corpo (desenho)
- cada mão fecha num ramo da corda, perto da ponta de borracha, e o ramo fica esticado até a bucha (desenho)

Erros desenhados:

- Cotovelos abrem para os lados (vista: frontal): os cotovelos se afastam da cabeça, para os lados
- Cotovelos sobem e descem (vista: lateral): no alongado o braço desce à frente e o ombro entra no movimento
- Não alongar atrás da cabeça (vista: lateral): a volta para com o cotovelo a 90°, sem levar as mãos para trás da cabeça

Fontes desta ficha:

- `guia`: Guia original do projeto (referencia/guia-execucao-fase1.html), como registrado em docs/pesquisa/animacoes/triceps-frances.md e no texto do app (src/conteudo/exercicios/triceps-frances.json): consenso de treinadores
- `hoje`: A animação de hoje (src/engine/exercicios/triceps-frances.ts): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json e src/engine/novo/dados/objetos/corda-triceps.json
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### Tríceps na suspensão (mãos à testa) (`triceps-suspensao`)

Ficha da técnica: `docs/pesquisa/animacoes/triceps-suspensao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | desenho | pés na largura do quadril |
| `pes.atrasDaAncora` | 50 cm | desenho | desenho | a bola do pé fica 50 cm atrás da vertical da âncora. Hoje fica 30 cm atrás, com a âncora a 205 cm; com a âncora na altura do fabricante (183 cm) e 30 cm, a fita passava a 0,2 cm da cabeça: os pés recuam até a fita passar por cima dela |
| `calcanhar.sobe` | 35 graus | desenho | apoio | na ponta dos pés, o calcanhar levantado 35° e parado (como na extensão de tríceps com o peso do corpo); o corpo gira no tornozelo |
| `joelho` | 4 graus | consenso | ficha | corpo reto como numa prancha: pernas estendidas |
| `corpo.inicio` | 25 graus | desenho | hoje | no começo, o corpo fica 25° à frente da vertical, quase em pé (hoje: 25°); daí sai o comprimento da fita |
| `pescoco.flexao` | 0 graus | desenho | desenho | pescoço e cabeça na linha do corpo |
| `ombro.flexao` | 115 graus | consenso | ficha | o braço fica 115° à frente do braço pendurado, no tronco (dentro dos ~90–120° da ficha): com o corpo a 25°, os braços estendidos ficam na altura dos ombros |
| `maos.polegarGira` | 20 graus | desenho | desenho | palmas para baixo: o polegar aponta para dentro, girado 20° para cima em volta do antebraço, para o antebraço não passar da pronação comum |
| `cotovelo.fim` | 100 graus | desenho | desenho | no fim, o cotovelo dobra 100°: as mãos chegam perto da testa (a ficha não dá número; a regra mede a distância da mão à cabeça) |
| `erro.quadril.dobra` | 16 graus | desenho | hoje | erro: a barriga desce e o quadril estende 16° (hoje: lombar 16–18° à frente do tórax) |
| `erro.quadril.lombar` | 10 graus | desenho | hoje | erro: a lombar arqueia 10° além da curva de repouso |
| `erro.cotovelo.abre` | 50 graus | desenho | hoje | erro: o cotovelo abre 50° para o lado |
| `erro.cotovelo.flexao` | 70 graus | desenho | hoje | erro: o cotovelo desce, o braço fica a 70° do braço pendurado (como numa flexão de braço) |
| `erro.curta.fracao` | 0,45 fração | desenho | hoje | erro: desce só 45% do caminho (hoje: para na pose do meio) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Braços estendidos | pausa | 0,45 s | inspira | corpo reto, inclinado à frente | consenso |
| Descida · excêntrica | exc | 2 s | inspira | ~2 s | consenso |
| Mãos perto da testa | pausa | 0,5 s | firme | cotovelos parados | consenso |
| Extensão · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pegador.R`, `pegador.L`.

Regras que a conferência mede:

- corpo reto como numa prancha (consenso)
- os pés apoiam na ponta, parados (desenho)
- as mãos seguram os pegadores o ciclo inteiro (consenso)
- palmas para baixo (consenso)
- a fita não estica: o corpo vai à frente enquanto as mãos vêm à testa (consenso)
- os cotovelos apontam para a frente e ficam parados (consenso)
- no fim, as mãos chegam perto da testa (consenso)
- a fita passa por cima da cabeça, não no pescoço (consenso)

Erros desenhados:

- Quadril cai (vista: lateral): a barriga desce e a lombar arqueia
- Cotovelos abrem ou descem (vista: quinaTras): os cotovelos abrem para os lados e descem: vira uma flexão de braço
- Descer pouco (vista: lateral): desce só 45% do caminho: as mãos param longe da testa

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/triceps-suspensao.md): de costas para a âncora, palmas para baixo, braços estendidos à frente na altura dos ombros; corpo reto como numa prancha, inclinado à frente, começando quase em pé; dobra os cotovelos e leva as mãos à testa com o corpo indo à frente; cotovelos apontando para a frente e parados; ombro flexionado a ~90–120° (B.2.4, opinião); consenso de treinadores (nsca2021, não verificado)
- `app`: Cartão do app (src/conteudo/exercicios/triceps-suspensao.json): a fita passa por cima da cabeça, não no pescoço; ~2 s descendo, ~1 s estendendo; as dicas e os erros
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/triceps-suspensao.ts) e a conferência dela (docs/revisoes/catalogo/conferencia/suspensao.md): o ângulo do corpo no começo, onde ficam os pés e os erros
- `apoio`: Extensão de tríceps com o peso do corpo do motor novo (src/engine/novo/dados/movimentos/extensao-triceps-peso-corpo.json): os pés na ponta com o calcanhar levantado e parado
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

### T e Y na suspensão (`yt-suspensao`)

Ficha da técnica: `docs/pesquisa/animacoes/yt-suspensao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `pes.meiaDistancia` | 9 cm | desenho | remada | pés na largura do quadril |
| `pes.alemDaAncora` | -35 cm | desenho | desenho | o fundo do calcanhar fica 35 cm antes da vertical da âncora (hoje: 12 cm além, com a âncora a 205 cm). Com os braços retos, no T as mãos ficam longe da âncora: com os pés mais perto (como na remada) a fita fica curta e o corpo teria de passar da vertical |
| `pe.pontaSobe` | 25 graus | desenho | remada | calcanhares no chão: a ponta do pé sobe 25° e fica parada |
| `joelho` | 4 graus | consenso | ficha | corpo reto: pernas estendidas, sem travar |
| `corpo.inicio` | 65 graus | desenho | hoje | no início, o corpo fica 65° da vertical (hoje: 60°); daí sai o comprimento da fita. Com 60° e a âncora do fabricante, o corpo terminava quase a prumo (9,6°) |
| `pescoco.flexao` | 4 graus | desenho | desenho | pescoço na linha do corpo, o queixo um pouco recolhido |
| `braco.dobra` | 10 graus | consenso | ficha | braços quase retos: o cotovelo dobra 10° o movimento inteiro |
| `T.abertura` | 90 graus | consenso | ficha | no T, o braço abre até 90° da frente, no tronco: as mãos na linha dos ombros |
| `T.altura` | 0 graus | consenso | ficha | no T, o braço fica na altura do ombro, no tronco (0° = perpendicular ao tronco): as mãos na linha dos ombros |
| `maos.polegarParaCima` | 0,3 fração | desenho | desenho | palmas para baixo: o polegar aponta para dentro e um pouco para cima, para o antebraço não passar da pronação comum |
| `escapula.prot.inicio` | 5 graus | desenho | hoje | braços à frente: as escápulas vão à frente com o braço (hoje: +5) |
| `escapula.retr.fim` | 10 graus | desenho | hoje | no T, as escápulas se juntam (hoje: −6; aqui −10, porque o ritmo do ombro devolve parte do recuo) |
| `escapula.elev.fim` | -1 graus | desenho | hoje | ombros baixos no T (hoje: −1) |
| `erro.cotovelo.atras` | 20 graus | desenho | hoje | erro: os cotovelos dobram e as mãos vêm ao peito, como numa remada (braço 20° atrás do tronco) |
| `erro.cotovelo.fora` | 35 graus | desenho | hoje | erro: na remada errada, o braço se afasta 35° do lado do tronco |
| `erro.encolher.elev` | 7 graus | desenho | hoje | erro: os ombros sobem (hoje: +7 na escápula) |
| `erro.quadril.dobra` | 34 graus | desenho | remada | erro: o quadril cai e dobra 34° no fim (como na remada) |

| fase | tipo | duração | respiração | ritmo | selo |
|---|---|---|---|---|---|
| Braços à frente | pausa | 0,45 s | inspira | corpo reto | consenso |
| Abertura em T · concêntrica | conc | 1,1 s | expira | ~1 s | consenso |
| T · segura | pausa | 1 s | firme | 1 s | consenso |
| Volta · excêntrica | exc | 2,1 s | inspira | ~2 s | consenso |

Contatos que não podem sair do lugar: `pe.R`, `pe.L`, `pegador.R`, `pegador.L`.

Regras que a conferência mede:

- corpo reto, do calcanhar à cabeça (consenso)
- calcanhares no chão, parados (consenso)
- as mãos seguram os pegadores o ciclo inteiro (consenso)
- palmas para baixo (consenso)
- braços quase retos (consenso)
- no T, as mãos chegam na linha dos ombros (consenso)
- as escápulas se juntam no T (consenso)
- a fita não estica: o corpo sobe junto (consenso)

Erros desenhados:

- Dobrar os cotovelos (vista: posterior): os cotovelos dobram e as mãos vêm ao peito: vira uma remada
- Encolher os ombros (vista: posterior): os ombros sobem em direção às orelhas
- Quadril cai (vista: lateral): o corpo dobra no quadril: o quadril desce e o tronco fica mais em pé

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/yt-suspensao.md): de frente para a âncora, palmas para baixo, braços estendidos à frente; corpo reto e inclinado para trás (a mesma posição da remada); T: abre os braços quase retos até as mãos na linha dos ombros, juntando as escápulas; o exercício base é o T, o Y fica no texto; consenso de treinadores (nsca2021, não verificado)
- `app`: Cartão do app (src/conteudo/exercicios/yt-suspensao.json): ~1 s abrindo, 1 s parado, ~2 s voltando; o corpo sobe junto; as dicas e os erros
- `remada`: Remada na suspensão do motor novo (lote 4): os pés, a ponta do pé e o erro do quadril
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/yt-suspensao.ts) e a conferência dela (docs/revisoes/catalogo/conferencia/suspensao.md): o ângulo de partida, as escápulas e os erros
- `desenho`: Escolha de desenho desta animação, dentro do que a ficha pede; a conferência mede o resultado

