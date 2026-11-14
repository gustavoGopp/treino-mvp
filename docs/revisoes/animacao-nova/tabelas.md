# Tabelas do bloco A (corpo, músculos, objetos e fichas de movimento)

Gerado por `node scripts/animacao-nova/tabelas-md.mjs` a partir dos arquivos de `src/engine/novo/dados/`. Nenhum número foi digitado neste documento: se um valor estiver errado, o erro está no arquivo de dados, e é lá que se corrige.

Tipos de linha: **medida** (lida na fonte), **derivada** (calculada de medidas, com a conta descrita), **provisória** (ainda sem fonte lida; a conferência lista todas e nenhuma animação vai para o app com provisória sem o ok do Gustavo) e **desenho** (escolha de desenho, sem pretensão de medida).

## Corpo: homem

População: ANSUR II (militares dos EUA, 2012), homens, IMC de 18,5 a 24,9; n = 1061; média de cada medida. 91 linhas: 62 medidas, 16 derivadas, 13 provisórias.

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
| `pe.calcanharAoTornozelo` | 6,7 cm | **provisória** | a-conferir | posição do tornozelo ao longo do pé (25% do comprimento): sem fonte lida |
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
| `raio.bracoRelaxadoSobreFletido` | 0,93 razão | **provisória** | a-conferir | o ANSUR II só mede o braço contraído; a razão relaxado/contraído ainda não tem fonte lida |
| `cabeca.comp` | 19,7 cm | medida | ansur2 | coluna headlength (da testa à nuca) |
| `cabeca.largura` | 15,2 cm | medida | ansur2 | coluna headbreadth |
| `cabeca.mentoAoNasio` | 12,1 cm | medida | ansur2 | coluna mentonsellionlength (do queixo à raiz do nariz) |
| `cabeca.larguraDoRosto` | 13,9 cm | medida | ansur2 | coluna bizygomaticbreadth |
| `cabeca.orelhaAltura` | 6,2 cm | medida | ansur2 | coluna earlength |
| `cabeca.alturaSobreEstatura` | 0,13 fração da estatura | medida | drillis-contini-via-cnb2025 | figura 1 (cota vertical da cabeça; fonte secundária) (do queixo ao topo) |
| `cabeca.altura` | 22,85 cm | derivada | drillis-contini-via-cnb2025 | cabeca.alturaSobreEstatura × estatura |
| `altura.baseDoCranio` | 162,8 cm | derivada | ansur2 | estatura − cabeca.tragionAoTopo (a articulação da cabeça com o pescoço fica perto da altura do tragion) |
| `quadril.meiaDistancia` | 8,7 cm | **provisória** | a-conferir | metade da distância entre os dois centros do quadril: a conferir (Bell 1990, Harrington 2007 ou modelo OpenSim) |
| `ombro.meiaDistancia` | 18,4 cm | derivada | ansur2 | largura.biacromial / 2 − 2,0 (centro do ombro para dentro da borda do acrômio: provisório) |
| `ombro.centroAFrente` | 0 cm | **provisória** | a-conferir | centro do ombro sobre a linha do quadril, de lado (linha de prumo da postura: a conferir) |
| `l5s1.acima` | 12 cm | **provisória** | a-conferir | altura de L5–S1 acima do centro do quadril: a conferir (crista ilíaca − 1 vértebra lombar) |
| `l5s1.atras` | 4,5 cm | **provisória** | a-conferir | recuo de L5–S1 atrás do centro do quadril: a conferir |
| `coluna.lombarGray` | 18 cm | medida | gray1918 | coluna vertebral, comprimentos por região (a conferir no texto (pesquisa 03)) |
| `coluna.toracicaGray` | 28 cm | medida | gray1918 | idem |
| `coluna.cervicalGray` | 12,5 cm | medida | gray1918 | idem |
| `coluna.lordoseLombar` | 50 graus | **provisória** | a-conferir | curva lombar em pé de L1 a L5 (Vialle 2005 dá 60 de lordose máxima incluindo o sacro): a conferir |
| `coluna.cifoseToracica` | 40 graus | **provisória** | a-conferir | curva torácica em pé: sem fonte lida |
| `coluna.lordoseCervical` | 30 graus | **provisória** | a-conferir | curva cervical em pé: sem fonte lida |
| `clavicula.retracaoRepouso` | 23 graus | medida | ludewig2009 | fig. 5-A (repouso) |
| `clavicula.elevacaoRepouso` | 11 graus | medida | ludewig2009 | fig. 5-A (repouso) |
| `clavicula.retracaoNaElevacao` | 16 graus | medida | ludewig2009 | fig. 5-A: aumento do repouso à elevação máxima do braço |
| `clavicula.elevacaoNaElevacao` | 6 graus | medida | ludewig2009 | fig. 5-A: aumento do repouso à elevação máxima do braço |
| `escapula.rotacaoParaCimaRepouso` | 11 graus | medida | ludewig2009 | fig. 5-C (repouso) |
| `escapula.rotacaoParaCimaNaElevacao` | 39 graus | medida | ludewig2009 | fig. 5-C: aumento do repouso à elevação máxima do braço |
| `escapula.rotacaoInternaRepouso` | 37 graus | medida | ludewig2009 | fig. 5-C (repouso): o plano da escápula |
| `clavicula.comp` | 15 cm | **provisória** | a-conferir | comprimento da clavícula: a conferir (pesquisa 03) |
| `esterno.meiaDistanciaDasClaviculas` | 2,5 cm | **provisória** | a-conferir | da linha do meio até a articulação da clavícula com o esterno: sem fonte lida |
| `escapula.altura` | 15,5 cm | **provisória** | a-conferir | do ângulo superior ao inferior: a conferir (pesquisa 03) |
| `escapula.largura` | 10,5 cm | **provisória** | a-conferir | da borda medial à cavidade do ombro: a conferir (pesquisa 03) |

Fontes do corpo:

- `ansur2`: Gordon CC et al. 2012 Anthropometric Survey of U.S. Army Personnel (ANSUR II). CSV públicos: https://www.openlab.psu.edu/ansur2/ (médias calculadas em 12/11/2026; scripts/animacao-nova/dados/ansur2-medias.json)
- `nasa-rp1024`: NASA Reference Publication 1024, Anthropometric Source Book, vol. I (1978), cap. IV. https://ntrs.nasa.gov/citations/19790003563
- `drillis-contini-via-cnb2025`: Drillis & Contini 1966, lido na figura reproduzida por Almeida et al., 11º Congresso Nacional de Biomecânica, 2025 (fonte secundária)
- `ludewig2009`: Ludewig PM et al. Motion of the shoulder complex during multiplanar humeral elevation. J Bone Joint Surg Am 2009;91(2):378-389 (lido no PMC por resumo automático: conferir os números)
- `gray1918`: Gray H. Anatomy of the Human Body, 20ª ed., 1918 (domínio público)
- `a-conferir`: Sem fonte lida ainda: valor provisório, listado pela conferência

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

O desenho aprovado tem 16 formas (Desenho do Boneco aprovado pelo Gustavo em 13/11/2026 (docs/revisoes/boneco-desenho/decisao). As formas foram desenhadas à mão sobre o corpo de medidas reais, em três vistas; a posição de cada uma sobre o osso ainda **não foi conferida contra o atlas** (pesquisa/03): isso entra na etapa 2, antes de cada lote.

| forma | desenhada de | o que o guia de hoje desenha no lugar (src/engine/estilo/musculos.ts) |
|---|---|---|
| peitoral | lado, frente | peitoralEst, peitoralClav (duas formas) |
| abdomen | lado, frente | retoAbdominal |
| dorsal | lado, costas | dorsal, redondoMaior |
| gluteo | lado, costas | gluteos |
| posteriores | lado, costas | posteriores |
| quadriceps | lado, frente | quadriceps |
| panturrilha | lado, frente, costas | panturrilha |
| patela | lado, frente | (não é músculo: a rótula, sempre em linha) |
| triceps | lado, costas | triceps |
| biceps | lado, frente | biceps |
| deltoide | lado, frente, costas | deltAnt, deltLat, deltPost (três formas) |
| trapezio | frente, costas | trapSuperior, trapMedio, trapInferior, romboides (quatro formas) |
| obliquos | frente | obliquos |
| adutores | frente | adutores |
| tibial | frente | (não há no guia de hoje) |
| antebraco | frente, costas | antebraco |

O que o guia de hoje desenha e o desenho novo ainda não tem como forma própria: as três porções do deltoide, o peitoral clavicular, as três porções do trapézio e os romboides, o redondo maior e os eretores da espinha. Enquanto não houver, a porção vira a forma inteira (está listado nas decisões de proposta.md).

## Objetos

| objeto | medida | valor | tipo | fonte | onde na fonte |
|---|---|---|---|---|---|
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `comp` | 33 cm | medida | ritfit-hex | comprimento total, 25 lb: 13 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `cabecaLargura` | 13,7 cm | medida | ritfit-hex | largura da cabeça, 25 lb: 5,4 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `cabecaAltura` | 12,2 cm | medida | ritfit-hex | altura da cabeça, 25 lb: 4,8 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `caboDiam` | 3,3 cm | medida | ritfit-hex | diâmetro do cabo, 15 a 60 lb: 1,3 pol |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `caboComp` | 13 cm | **provisória** | a-conferir | comprimento livre do cabo entre as cabeças: nenhuma ficha lida informa |
| Halter sextavado emborrachado de 25 lb (11,3 kg) (`halter`) | `massa` | 11,3 kg | medida | ritfit-hex | 25 lb |
| Banco reto (`bancoReto`) | `comp` | 122 cm | medida | ipf2026 | seção 2.6: comprimento não menor que 1,22 m |
| Banco reto (`bancoReto`) | `larg` | 30,5 cm | medida | rogue-fb | Bench Pad Width: 12 pol (IPF: 29 a 32 cm) |
| Banco reto (`bancoReto`) | `altura` | 43,5 cm | derivada | ipf2026 | meio da faixa da seção 2.6: 42 a 45 cm do piso ao topo do estofado |
| Banco reto (`bancoReto`) | `estofado` | 6,35 cm | medida | rogue-fb | Pad Thickness: 2,5 pol |
| Banco reto (`bancoReto`) | `baseLarg` | 56 cm | medida | hs2024 | largura total do Flat Bench FW-FB: 22 pol |
| Banco reto (`bancoReto`) | `tubo` | 5 cm | **provisória** | a-conferir | lado do tubo da estrutura: nenhuma ficha lida informa |
| Anilha de ferro de 10 lb sob o calcanhar (`anilhaCalcanhar`) | `diam` | 22,8 cm | medida | rogue-steel | Plate Diameter, 10 lb: 228 mm |
| Anilha de ferro de 10 lb sob o calcanhar (`anilhaCalcanhar`) | `esp` | 2,4 cm | **provisória** | a-conferir | espessura da anilha de 10 lb: a Rogue não informa |
| Coluna de polia regulável (crossover) (`torre`) | `altura` | 239 cm | medida | lf-cc | Dimensions: 94 pol de altura |
| Coluna de polia regulável (crossover) (`torre`) | `poliaMax` | 193 cm | medida | lf-cc | altura do carrinho: até 76 pol |
| Coluna de polia regulável (crossover) (`torre`) | `poliaMin` | 17,8 cm | medida | lf-cc | altura do carrinho: a partir de 7 pol |
| Coluna de polia regulável (crossover) (`torre`) | `relacao` | 2 razão | medida | lf-cc | relação do cabo 2:1: a pilha sobe metade do que o cabo anda |
| Coluna de polia regulável (crossover) (`torre`) | `prof` | 72 cm | medida | lf-cc | Dimensions: 28,5 pol de profundidade da base |
| Coluna de polia regulável (crossover) (`torre`) | `colunaLarg` | 30 cm | **provisória** | a-conferir | largura da coluna com a carenagem da pilha: nenhuma ficha lida informa |
| Coluna de polia regulável (crossover) (`torre`) | `roldanaDiam` | 11,5 cm | **provisória** | a-conferir | diâmetro da roldana do carrinho: só há a de 6 pol de uma polia de rack (Rogue), que é outro aparelho |
| Coluna de polia regulável (crossover) (`torre`) | `caboDiam` | 0,64 cm | medida | rogue-sling | cabo de aço de 1/4 pol (sem a capa) |
| Coluna de polia regulável (crossover) (`torre`) | `pilhaLarg` | 22 cm | **provisória** | a-conferir | largura das placas da pilha: nenhuma ficha lida informa |
| Coluna de polia regulável (crossover) (`torre`) | `placaEsp` | 2,5 cm | **provisória** | a-conferir | espessura de cada placa da pilha: nenhuma ficha lida informa |
| Coluna de polia regulável (crossover) (`torre`) | `placas` | 16 un | **provisória** | a-conferir | número de placas desenhadas |
| Estribo (pegador de uma mão) (`estribo`) | `pegadaComp` | 12,5 cm | **provisória** | a-conferir | comprimento da pegada: sem medida lida |
| Estribo (pegador de uma mão) (`estribo`) | `pegadaDiam` | 3,2 cm | **provisória** | a-conferir | diâmetro da pegada: sem medida lida |
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
| Banco regulável (encosto de 0 a 85 graus) (`bancoRegulavel`) | `tubo` | 6 cm | **provisória** | a-conferir | lado do tubo da estrutura: nenhuma ficha lida informa |

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

## Fichas de movimento

Uma por exercício refeito, em `src/engine/novo/dados/movimentos/`. Selos: robusta, moderada, um estudo, consenso (de treinadores) e desenho (escolha de desenho dentro do que a ficha da técnica pede).

### Flexão de braço (`flexao`)

Ficha da técnica: `docs/pesquisa/animacoes/flexao.md`. Movimento simétrico (os dois lados fazem o mesmo).

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `cotovelo.cima` | 10 graus | consenso | guia | em cima: braços estendidos (sem travar) |
| `peito.aoChao` | 5 cm | consenso | guia | embaixo: peito a poucos centímetros do chão |
| `maos.alemDoOmbro` | 6 cm | consenso | guia | mãos um pouco mais abertas que os ombros (de cada lado) |
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
| `carga` | 11,3 kg | desenho | objetos | o halter desenhado (25 lb); entra no equilíbrio |
| `erro.raso.joelho` | 72 graus | desenho | desenho | erro: parar alto |
| `erro.lombar.tronco` | 52 graus | desenho | desenho | erro: o peito cai |
| `erro.lombar.lombar` | 34 graus | desenho | desenho | erro: a lombar arredonda (flexão somada à curva de repouso) |
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

### Puxada unilateral ajoelhado na polia alta (`puxada-unilateral`)

Ficha da técnica: `docs/pesquisa/animacoes/puxada-unilateral.md`. Movimento de um lado só.

| parâmetro | valor | selo | fonte | o que é |
|---|---|---|---|---|
| `tronco` | -4 graus | consenso | guia | tronco reto ou levemente inclinado para trás |
| `cotovelo.alongado` | 12 graus | consenso | guia | início: braço estendido para cima e para a frente |
| `ombro.sobe` | 10 graus | consenso | guia | alongado: deixe o ombro subir (elevação da clavícula além do ritmo normal) |
| `ombro.desce` | -6 graus | consenso | guia | fim: ombro para baixo |
| `braco.fim.atras` | 12 graus | consenso | guia | fim: cotovelo ao lado das costelas, um pouco atrás do tronco |
| `braco.fim.fora` | 12 graus | desenho | desenho | fim: o braço um pouco afastado do tronco, para o cotovelo passar ao lado das costelas |
| `torre.distancia` | 62 cm | consenso | guia | ajoelhe de frente para a torre, a cerca de meio passo (dos joelhos à base) |
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
- Ombro encolhido (vista: posterior): a clavícula continua elevada no fim
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

