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
| Porta fechada, com a âncora de porta embaixo (`porta`) | `altura` | 210 cm | medida | vert-porta | altura da folha de porta |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `larg` | 80 cm | medida | vert-porta | largura da folha de porta |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `esp` | 3,5 cm | medida | vert-porta | espessura da folha de porta |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `vao` | 1 cm | **provisória** | a-conferir | vão entre a folha e o chão, por onde passa a fita da âncora |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `ancoraComp` | 12,7 cm | medida | stroops-ancora | comprimento da espuma da âncora: 5 pol |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `ancoraLarg` | 10,2 cm | medida | stroops-ancora | largura da espuma da âncora: 4 pol |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `ancoraAlt` | 2,5 cm | medida | stroops-ancora | altura da espuma da âncora: 1 pol |
| Porta fechada, com a âncora de porta embaixo (`porta`) | `alcaComp` | 6 cm | **provisória** | a-conferir | quanto a alça de fita sai do vão da porta, do lado de quem treina (a ficha não dá o comprimento da fita) |
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
| Toalha de mão, dobrada ao meio, sob os calcanhares (`toalha`) | `larg` | 40,6 cm | medida | zogics-toalha | o lado menor da toalha de mão: 16 pol; dobrada ao meio, fica atravessada sob os dois calcanhares |
| Toalha de mão, dobrada ao meio, sob os calcanhares (`toalha`) | `comp` | 76,2 cm | medida | zogics-toalha | o lado maior da toalha de mão: 30 pol; dobrada ao meio, fica com 38,1 cm na direção em que os calcanhares deslizam |
| Toalha de mão, dobrada ao meio, sob os calcanhares (`toalha`) | `esp` | 0,4 cm | **provisória** | a-conferir | espessura de uma camada de felpa: a ficha do fabricante dá o peso (4,5 lb por dúzia), não a espessura; dobrada, são duas camadas |

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
- `vert-porta`: Vert, folha de porta lisa de madeira 210 x 80 x 3,5 cm (Telhanorte); https://www.telhanorte.com.br/folha-de-porta-lisa-de-madeira-210x80x3-5cm-primer-vert-1223704/p (lida em 15/11/2026 por resumo automático de busca: "210cm x 80cm x 3,5cm"). A mesma medida aparece nas folhas de porta MGM e Casablanca (MadeiraMadeira) e na Eucatex (35 mm)
- `stroops-ancora`: Stroops, Door Anchor (ANCRFOAM); https://www.vitalitymedical.com/stroops-door-anchor.html (lido em 15/11/2026 por resumo automático da página: "Length: 5 Inches", "Width: 4 Inches", "Height: 1 Inch")
- `trx-comeco`: TRX, How to Get Started With Your TRX Suspension Trainer; https://www.trxtraining.com/train/how-to-get-started-with-your-trx-suspension-trainer (lido em 15/11/2026): "the bottom of the Suspension Anchor hangs at about six feet from the ground [...] This is the ideal height to perform all TRX exercises"
- `trx-seis`: TRX, Six Procedures (material de treinamento do fabricante, PDF público hospedado pela Truman State University); https://recreation.truman.edu/files/2020/02/TRX-Six-Procedures-PDF.pdf (lido em 15/11/2026), procedimento 3, Heels in: "Adjust the Suspension Trainer so the bottom of each foot cradle is at mid calf length or about eight to 12 inches off the ground"
- `trx-pro4`: TRX, TRX PRO4 System; https://www.trxtraining.com/pages/trx-pro4-system (lido em 15/11/2026): "TRX Suspension Anchor [...] Measuring at 38\" x 2\" x 0.5\"" e "Accommodating anchor heights of 7-9ft"
- `zogics-toalha`: Zogics, 16x30 Hand Towel, 450A Series, 4.5lb (12 Towels); https://www.zogics.com/wholesale-towels/16x30-hand-towel-450a-series-4-5lb (lido em 15/11/2026 por resumo automático da página: "16" x 30"", "4.5 lbs/dozen"). A mesma medida de 16 x 30 pol aparece em várias marcas de toalha de mão (Oxford, Hospeco, Standard Textile)

## Fichas de movimento

Uma por exercício refeito, em `src/engine/novo/dados/movimentos/`. Selos: robusta, moderada, um estudo, consenso (de treinadores) e desenho (escolha de desenho dentro do que a ficha da técnica pede).

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
- Cotovelos abertos a 90° (vista: quinaTras): os cotovelos vão para os lados
- Descer pouco (vista: lateral): desce só até a metade
- Elástico sobe para o pescoço (vista: quinaTras): o meio do elástico passa no pescoço, e não nas escápulas

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
| `erro.lombar.lombar` | -25 graus | desenho | desenho | erro: a lombar arqueia 25 graus para subir o quadril (barriga para cima) |
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
- Arquear a lombar (vista: lateral): a lombar arqueia 25° e a barriga sobe, fora da linha ombro–joelho
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
| `testa.altura` | 4,7 cm | desenho | desenho | a testa apoia no dorso das mãos espalmadas no chão ("testa apoiada nos braços dobrados"): altura do dorso da mão espalmada, medida no Boneco: 4,7 cm do chão |
| `maos.meiaDistancia` | 7 cm | desenho | desenho | as mãos lado a lado sob a testa: distância de cada punho ao meio do corpo |
| `colchonete.z` | -8 cm | desenho | desenho | onde fica o meio do colchonete (de 100 cm) em relação ao quadril: do peito aos joelhos; a cabeça e as mãos ficam no chão à frente dele |
| `elastico.esticaNoInicio` | 1,2 vezes | consenso | app | "afaste-se do ponto até o elástico ficar um pouco esticado com as pernas estendidas": 1,2 vez o comprimento em repouso (o número é escolha de desenho) |
| `elastico.acimaDoTornozelo` | 4 cm | consenso | ficha | os pegadores em volta dos tornozelos, por trás, logo acima do calcanhar: o centro do pegador fica 4 cm acima do centro do tornozelo, ao longo da canela |
| `ancora.altura` | 1,5 cm | desenho | objetos | a alça da âncora sai pelo vão de baixo da porta: onde o tubo dá a volta, a 1,5 cm do chão |
| `erro.quadril.sobe` | 12 cm | desenho | desenho | erro: a bacia sobe 12 cm do colchonete, com o peito e os joelhos parados |
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
- Dar tranco (vista: lateral): no meio da subida, os calcanhares já estão quase no fim (embalo)
- Puxar pouco ou não estender na volta (vista: lateral): dobra só até a metade e não estende na volta

Fontes desta ficha:

- `ficha`: Ficha da técnica (docs/pesquisa/animacoes/flexao-joelho-elastico.md): a técnica da mesa flexora, consenso de treinadores (nsca2021, não verificado)
- `app`: Texto do app (src/conteudo/exercicios/flexao-joelho-elastico.json), que sai da ficha
- `fisica`: Física do elástico: a força cresce com o quanto ele estica (a ficha da técnica registra); a borracha não muda de volume, então o tubo afina ao esticar
- `hoje`: Animação aprovada no guia de hoje (src/engine/exercicios/flexao-joelho-elastico.ts; conferência em docs/revisoes/elastico/conferencia/flexao-joelho-elastico.md): as distâncias que a ficha não dá em número
- `objetos`: src/engine/novo/dados/objetos.json (colchonete, elástico em tubo) e src/engine/novo/dados/objetos/porta.json (porta e âncora de porta)
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

### Flexão com o quadril alto (pike) (`pike`)

Ficha da técnica: `docs/pesquisa/animacoes/pike.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `maos.alemDoOmbro` | 12 cm | consenso | flexao | mãos um pouco mais abertas que os ombros: o mesmo afastamento da flexão aprovada (centro da mão a 30,2 cm do meio do corpo) |
| `maos.aFrenteDosPes` | 94 cm | desenho | hoje | distância no chão da bola do pé ao centro da palma (hoje: o punho a ~107 cm do tornozelo). Quanto mais perto, mais em pé fica o tronco (cartão, 'vary') |
| `pes.meiaDistancia` | 8,7 cm | consenso | flexao | pés na largura do quadril, como na flexão |
| `calcanhar.sobe` | 30 graus | desenho | hoje | apoio na ponta dos pés: o calcanhar fica levantado e parado (hoje: o calcanhar a ~9 cm do chão) |
| `joelho` | 5 graus | consenso | guia | pernas estendidas (o cartão aceita os joelhos um pouco dobrados) |
| `quadril.cima` | 105 graus | desenho | hoje | em cima: a flexão do quadril que faz o V de cabeça para baixo (hoje: 100 a 109°) |
| `cotovelo.cima` | 10 graus | consenso | guia | em cima: braços estendidos (sem travar), como na flexão |
| `cabeca.aoChao` | 5 cm | desenho | desenho | embaixo: o ponto mais baixo da cabeça a poucos centímetros do chão ('perto do chão, sem encostar'; a ficha não dá número) |
| `cabeca.naLinhaDasMaos` | 0 cm | consenso | guia | embaixo: o ponto mais baixo da cabeça na linha das mãos (o centro das palmas), entre elas |
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
- Cotovelos abertos para os lados (vista: frontal): os cotovelos vão para os lados
- Descer pouco (vista: lateral): a cabeça para longe do chão

Fontes desta ficha:

- `guia`: Ficha da técnica (docs/pesquisa/animacoes/pike.md) e cartão do app (src/conteudo/exercicios/pike.json): consenso de treinadores, sem estudo (P4 de docs/pesquisa-v2/10-equipamento-minimo.md)
- `flexao`: A flexão aprovada no motor novo (dados/movimentos/flexao.json), de onde a ficha da técnica manda partir: mãos, punho e dedos iguais
- `hoje`: Animação de hoje (src/engine/exercicios/pike.ts, aprovada em 04/11/2026), medida em docs/revisoes/animacao-nova/diagnostico/medidas-de-hoje.json
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

