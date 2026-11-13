# Músculos e ossos: origem, inserção, camada, coordenadas e medidas internas

Pesquisa feita em 12/11/2026 (nesta sessão). Idioma: pt-BR. Regra seguida: nenhum número, origem ou inserção veio de memória; o que não foi lido está marcado NÃO VERIFICADO. Onde só achei em fonte secundária, a fonte secundária está nomeada. Nenhum desenho ou imagem foi copiado.

Arquivos baixados e usados para extração ficaram em `/tmp/claude-0/-home-user-treino-mvp/43c91038-39e8-5e07-9109-1ca19fd1607d/scratchpad/musculos/` (não versionados).

## Resumo em 8 linhas

1. Texto de Gray 1918 (20a ed.) lido em texto completo (OCR do Internet Archive): origem, inserção, ação e forma de 39 músculos/partes (Parte 1), mais comprimento das regiões da coluna e níveis vertebrais de referência (Parte 3). Domínio público: serve.
2. OpenStax A&P 2e (cap. 11) está hoje sob **CC BY-NC-SA 4.0** (rodapé de cada página), não CC BY 4.0: serve só como conferência de leitura.
3. Modelos OpenSim: Gait2392 (CC BY 3.0), Arm26 (CC BY 3.0) e Rajagopal 2016 (MIT, pelo SimTK) servem com crédito. MoBL-ARMS (uso não comercial) e o modelo escapulotorácico de Seth (CC BY-NC) **não servem**.
4. Não há modelo aberto utilizável com músculos do ombro e do tronco superior (peitoral, deltoide, grande dorsal, trapézio, romboides, serrátil): essas posições vêm só dos textos (Parte 1), sem coordenadas.
5. Coordenadas extraídas: articulações, massas, marcadores e pontos de trajeto de glúteos, quadríceps, isquiotibiais, adutores, panturrilha, tibial anterior, eretores e oblíquos (Gait2392/Rajagopal) e tríceps, bíceps e braquial (Arm26).
6. Hip: Gait2392 tem o centro do quadril a (-70,7; -66,1; +-83,5) mm do ponto médio das EIAS; Rajagopal, (-56,3; -78,5; +-77,3) mm da origem da pelve dele.
7. Não consegui: Meskers 1998 e Rab 2002 (ombro vs acrômio), Leardini 1999, de Leva 1996 (PDF original), Buryanov & Kotiuk 2010, falanges e polegar.
8. Divergências relevantes estão no fim.

## Fontes

Data de acesso de todas: 12/11/2026. "serve?" = pode alimentar o app comercial com crédito (MIT, Apache 2.0, BSD, ISC, CC0, CC BY); "só leitura" = pode ser lido para conferir, mas nada de código, dado ou imagem dela entra no app.

| chave | citação | URL | tipo | status de leitura | licença | serve para o app? |
|---|---|---|---|---|---|---|
| GRAY1918 | Gray H. (1918). Anatomy of the Human Body, 20a ed., revisada por W. H. Lewis. Lea & Febiger, Filadélfia e Nova York. Texto OCR (4,7 MB) | https://archive.org/download/anatomyofhumanbo1918gray/anatomyofhumanbo1918gray_djvu.txt | livro-texto/atlas, domínio público | texto-completo (busca e leitura dos trechos citados). O OCR tem erros ("Glutseus", "qoqqxx"); números conferidos no contexto | domínio público (edição de 1918) | sim (texto); imagens do livro não foram usadas |
| OSX-A&P2e | Betts J.G., Young K.A., Wise J.A., et al. (2022). Anatomy and Physiology 2e, cap. 11.1 a 11.6. OpenStax | https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs (e 11-1, 11-2, 11-3, 11-4, 11-6 com o mesmo prefixo) | livro-texto aberto | texto-completo parcial: o HTML estático traz só uma parte das tabelas (tabela do cíngulo peitoral e da mão, no 11.5; sem as tabelas de úmero e antebraço) | CC BY-NC-SA 4.0 (rodapé: "licensed under a Creative Commons Attribution-NonCommercial-ShareAlike License") | só leitura (NC e SA) |
| OSIM-G2392 | Delp S.L., Loan J.P., Hoy M.G., Zajac F.E., Topp E.L., Rosen J.M., Thelen D.G., Anderson F.C., Seth A. Modelo Gait2392 (gait2392_thelen2003muscle.osim) | https://raw.githubusercontent.com/opensim-org/opensim-models/master/Models/Gait2392_Simbody/gait2392_thelen2003muscle.osim | modelo de código aberto | texto-completo (arquivo inteiro, 576 KB, lido por script) | CC BY 3.0 (texto no campo credits do .osim) | sim, com crédito |
| OSIM-G2354 | Mesmo modelo, versão reduzida (Gait2354) | .../Models/Gait2354_Simbody/gait2354_simbody.osim | modelo de código aberto | cabeçalho/credits lidos; não extraí | CC BY 3.0 (credits do .osim) | sim, com crédito (não usei) |
| OSIM-ARM26 | Reinbolt J., Seth A., Habib A., Hamner S. (adaptado de Holzbaur K., 2004). Arm26 | .../Models/Arm26/arm26.osim | modelo de código aberto | texto-completo (arquivo, 90 KB) | CC BY 3.0 (credits do .osim) | sim, com crédito |
| OSIM-RAJ | Rajagopal A., Dembia C.L., DeMers M.S., Delp D.D., Hicks J.L., Delp S.L. (2016). Rajagopal2016.osim | .../Models/Rajagopal/Rajagopal2016.osim e README.txt do mesmo diretório | modelo de código aberto | texto-completo (arquivo, 875 KB) | o .osim e o README do repositório não trazem licença; a página do SimTK mostra "MIT Use Agreement" (Copyright 2015 Stanford University) | sim (MIT), mantendo o aviso de copyright |
| SIMTK-FB | Página do projeto Full Body Model, SimTK | https://simtk.org/projects/full_body | página do projeto | texto-completo da licença (HTML) | MIT (texto completo da licença lido na página) | referência da licença do Rajagopal |
| RAJ2016 | Rajagopal A. et al. (2016). Full-body musculoskeletal model for muscle-driven simulation of human gait. IEEE Trans Biomed Eng. doi:10.1109/TBME.2016.2586891 (cópia no PMC) | https://pmc.ncbi.nlm.nih.gov/articles/PMC5507211/ | artigo | texto-completo (primeiros 100 mil de 111 mil caracteres) | direitos do IEEE ("Personal use of this material is permitted ...") | só leitura (o modelo é MIT; o artigo não) |
| OSIMWIKI-G2392 | OpenSim Confluence. Gait 2392 and 2354 Models (id 53086215), via API REST pública | https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53086215 | página didática | texto-completo | não informada na página; a tabela de modelos informa CC BY 3.0 | só leitura |
| OSIMWIKI-MODELS | OpenSim Confluence. Musculoskeletal Models (id 53090607) | https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53090607 | página didática (tabela de modelos e licenças) | texto-completo | não informada | só leitura |
| SIMTK-MOBL | Saul K.R., Hu X., Goehler C.M., et al. (2015). MoBL-ARMS Dynamic Upper Limb (SimTK upexdyn) | https://simtk.org/projects/upexdyn | modelo de código aberto (página) | texto da licença lido; o .osim NÃO foi baixado | BSD 3-Clause "solely for non-commercial purposes ... commercial use requires a commercial license" | **não serve** |
| SIMTK-SCAP | Seth A. et al. Model of the Scapulothoracic Joint (SimTK scapulothoracic) | https://simtk.org/projects/scapulothoracic | modelo de código aberto (página) | texto da licença lido; .osim não baixado | "Creative Commons Attribution-NonCommercial License" | **não serve** |
| RAITERI2016 | Raiteri B.J., Cresswell A.G., Lichtwark G.A. (2016). Three-dimensional geometrical changes of the human tibialis anterior muscle and its central aponeurosis measured with 3D ultrasound during isometric contractions. PeerJ 4:e2260 | https://pmc.ncbi.nlm.nih.gov/articles/PMC4974924 | artigo | texto-completo (lido por WebFetch; tabela 2) | CC BY 4.0 | sim, com crédito |
| DICK2017 | Dick T.J.M., Wakeling J.M. (2017). Shifting gears: dynamic muscle shape changes and force-velocity behavior in the medial gastrocnemius. J Appl Physiol 123(6):1433-1442 | https://pmc.ncbi.nlm.nih.gov/articles/PMC5814684 | artigo | texto-completo (100 mil de 101 mil caracteres) | só "Copyright 2017 American Physiological Society"; licença NÃO confirmada | só leitura |
| AZIZI2008 | Azizi E., Brainerd E.L., Roberts T.J. (2008). Variable gearing in pennate muscles. PNAS 105(5):1745-1750 | https://pmc.ncbi.nlm.nih.gov/articles/PMC2234215 | artigo | verificado-busca (só o resumo, via resultado de busca; texto não aberto) | não conferida | só leitura |
| DELEVA-BMC | de Leva P. (1996). Adjustments to Zatsiorsky-Seluyanov's segment inertia parameters. J Biomech 29(9):1223-1230 — tabelas reproduzidas no repositório de Duarte M. (BMClab/BMC, pasta data) | https://raw.githubusercontent.com/demotu/BMC/master/data/BSPmale_ZdeLeva.txt (e BSPfemale_ZdeLeva.txt, BSPlandmarks_ZdeLeva.txt) | página didática / dados de repositório (fonte secundária) | texto-completo dos três arquivos; o artigo original NÃO abriu (ebm.ufabc.edu.br: erro de certificado TLS; WebFetch: 503) | repositório com CC BY 4.0 (LICENSE.txt) | sim, com crédito ao de Leva e ao repositório, mas é cópia secundária |
| PYCGM2 | Código do pyCGM2, modelDecorator.py (funções bellRegression e harringtonRegression) | https://raw.githubusercontent.com/pyCGM2/pyCGM2/master/pyCGM2/Model/modelDecorator.py | código (fonte secundária dos coeficientes) | texto-completo das funções | licença do repositório NÃO verificada (LICENSE não encontrado nos caminhos testados) | só leitura (reimplementar a partir dos artigos originais) |
| SINCLAIR2013 | Sinclair J., Bottoms L. (2013). Methods of determining hip joint centre: their influence on the 3-D kinematics of the hip and knee during the fencing lunge. Human Movement 14(3):229-237 | https://hummov.awf.wroc.pl/pdf-183338-104309?filename=Methods-of-determining-hi.pdf | artigo (fonte secundária para Bell) | texto-completo (PDF) | sem declaração lida | só leitura |
| FIORENTINO2015 | Fiorentino N.M. et al. (2016). Accuracy of functional and predictive methods to calculate the hip joint center ... Ann Biomed Eng 44(7):2168-2180 | https://pmc.ncbi.nlm.nih.gov/articles/PMC4893978 | artigo | texto-completo (via WebFetch) | não declarada | só leitura |
| HARRINGTON2007 | Harrington M.E., Zavatsky A.B., Lawson S.E.M., Yuan Z., Theologis T.N. (2007). Prediction of the hip joint centre in adults, children, and patients with cerebral palsy based on MRI. J Biomech 40(3):595-602 | https://www.ndorms.ox.ac.uk/publications/64367 | artigo | verificado-busca (só resumo; coeficientes lidos no PYCGM2) | não conferida | só leitura |
| BELL1990 | Bell A.L., Pedersen D.R., Brand R.A. (1990). A comparison of the accuracy of several hip center location prediction methods. J Biomech 23:617-621 | (não aberto) | artigo | NÃO VERIFICADO (valores vistos só em PYCGM2 e SINCLAIR2013) | -- | só leitura |
| LEARDINI1999 | Leardini A. et al. (1999). Validation of a functional method for the estimation of hip joint centre location. J Biomech 32(1):99-103 | (não aberto) | artigo | NÃO VERIFICADO | -- | -- |
| MESKERS1998 | Meskers C.G.M., van der Helm F.C.T., Rozendaal L.A., Rozing P.M. (1998). In vivo estimation of the glenohumeral joint rotation center from scapular bony landmarks by linear regression. J Biomech 31(1):93-96 | https://repository.tudelft.nl/record/uuid:0cdfe13b-ac8e-4039-8b49-f10a8793c31a | artigo | NÃO VERIFICADO (conexão recusada/503; só confirmei a existência) | -- | -- |
| RAB2002 | Rab G., Petuskey K., Bagley A. (2002). A method for determination of upper extremity kinematics. Gait Posture 15(2):113-119 | (não aberto) | artigo | NÃO VERIFICADO (só descrito como método de deslocamento constante a partir do marcador do acrômio, em resumo de busca) | -- | -- |
| ZAPPALA2021 | Zappalá M., Lightbourne S., Heneghan N.R. (2021). The relationship between thoracic kyphosis and age, and normative values across age groups: a systematic review of healthy adults. J Orthop Surg Res 16:447 | https://pmc.ncbi.nlm.nih.gov/articles/PMC8268398 | artigo (revisão sistemática) | texto-completo (100 mil de 118 mil caracteres) | CC BY 4.0 | sim, com crédito |
| GUO2018 | Guo G.-M., Li J., Diao Q.-X., et al. (2018). Cervical lordosis in asymptomatic individuals: a meta-analysis. J Orthop Surg Res 13:147 | https://pmc.ncbi.nlm.nih.gov/articles/PMC6003173/ | artigo (meta-análise) | texto-completo (via WebFetch) | CC BY 4.0 | sim, com crédito |
| OSNAYA2025 | Osnaya-Moreno H., Jiménez-Murat Y., Garzón Ortega V.H., et al. (2025). Anthropometric characteristics of metacarpal bones in the Mexican population. Cureus 17(4):e82659 | https://pmc.ncbi.nlm.nih.gov/articles/PMC12093037/ | artigo | texto-completo (tabelas 2 a 6) | CC BY 4.0 | sim, com crédito |
| BEREDJIKIAN2025 | Beredjiklian P.K. et al. (2025). Correlation between adult height and metacarpal length using advanced imaging modalities. Arch Bone Jt Surg 13(6):345-348 | https://pmc.ncbi.nlm.nih.gov/articles/PMC12238854/ | artigo | texto-completo | CC BY-NC 4.0 | só leitura |
| SINGH2026 | Singh S., Wong K.Y., Zafiropoulos G. (2026). A retrospective radiographic study of metacarpal and phalangeal length proportions. Cureus 18(10):e118834 | https://pmc.ncbi.nlm.nih.gov/articles/PMC13723288 | artigo | texto-completo; não traz comprimentos absolutos nem razões por dedo úteis (só testes de proporção áurea) | CC BY 4.0 | sem dado aproveitável |
| BURYANOV2010 | Buryanov A., Kotiuk V. (2010). Proportions of hand segments. Int J Morphol 28(3):755-758 | https://www.scielo.cl/scielo.php?script=sci_arttext&pid=S0717-95022010000300015 | artigo | **não abriu** (desafio anti-robô da Cloudflare, HTTP 403; não contornei). NÃO VERIFICADO | -- | -- |
| WELCOME2014 | Welcome D.E. et al. (2014). The effects of vibration-reducing gloves on finger vibration. Int J Ind Ergon 44(1):45-59 | https://pmc.ncbi.nlm.nih.gov/articles/PMC4630214/ | artigo | texto-completo (só tabela 1: comprimento da mão, n=7) | não declarada | só leitura |
| PATTED2020 | Patted S.M., Kumar A., Halawar R.S. (2020). Morphometric analysis of clavicle and its medullary canal: a CT study. Indian J Orthop 54(Suppl 2):283-291 | https://pmc.ncbi.nlm.nih.gov/articles/PMC7609512/ | artigo | texto-completo (via WebFetch) | não declarada ("© Indian Orthopaedics Association 2020") | só leitura |
| IIO2026 | Iio R., Blackman J., Spangenberg G.W., et al. (2026). Population-specific statistical shape modeling of the Japanese shoulder. JSES Int 10(4):101714 | https://pmc.ncbi.nlm.nih.gov/articles/PMC13273566/ | artigo | texto-completo (via WebFetch) | CC BY-NC-ND 4.0 | só leitura |
| BODYPARTS3D | BodyParts3D/Anatomography, DBCLS (Japão) | https://dbarchive.biosciencedbc.jp/data/bodyparts3d/20110915/README_e.html | atlas 3D | verificado-busca (README visto só em resultado de busca; a página lifesciencedb.jp não traz licença) | CC BY-SA 2.1 Japão (segundo o README resumido na busca) | não serve (SA); só referência de leitura |
| Z-ANATOMY | Z-Anatomy (Kervyn G. e colaboradores), baseado no BodyParts3D | https://github.com/Z-Anatomy/The-blend | atlas 3D | verificado-busca (resultado de busca citando o repositório; o site z-anatomy.com só carrega por JavaScript) | CC BY-SA 4.0 (segundo o repositório, via busca) | não serve (SA); só referência de leitura |
| WIKIMEDIA-COMMONS | Wikimedia Commons (imagens de anatomia) | https://commons.wikimedia.org | repositório de imagens | NÃO consultado (nenhuma imagem foi aberta). A API da Wikisource devolveu limite de requisições | licença varia por arquivo; domínio público para as pranchas de Gray, CC BY-SA para muitas outras | verificar arquivo por arquivo |
| BARTLEBY | Gray 1918 em bartleby.com/107 | https://www.bartleby.com/107/ | atlas | **não abriu** (HTTP 403 em curl e em WebFetch); usei o texto do Internet Archive | -- | -- |
| ANATOMYTOOL | AnatomyTOOL | https://anatomytool.org/content/licenses | atlas/imagens | **não abriu** (HTTP 503) | NÃO VERIFICADO | -- |
| KENHUB-TMA | Kenhub e TeachMeAnatomy | -- | páginas didáticas | NÃO consultados (conteúdo proprietário; não usei nem como conferência) | direitos reservados (NÃO VERIFICADO nesta sessão) | só conferência |


## Parte 1 — Músculos (origem, inserção, ação, camada, forma, mudança ao contrair)

Fonte primária: Gray 1918, 20a edição, lida em texto completo (OCR do Internet Archive, domínio público). A tradução e o resumo são meus; entre aspas estão os adjetivos de Gray no original. A coluna "fonte" traz a página aproximada da edição (número impresso no OCR). A coluna "camada" só afirma o que Gray escreve; quando é inferência, está dito; quando não achei, "NÃO VERIFICADO". "Forma" usa o adjetivo do livro; a classificação em leque/fuso/faixa/penado é minha só quando o livro dá a palavra.

| músculo | origem | inserção | ação | camada | forma | muda ao contrair | fonte |
|---|---|---|---|---|---|---|---|
| Peitoral maior, parte clavicular | Face anterior da metade esternal da clavícula | Crista do tubérculo maior do úmero, por tendão plano de ~5 cm de largura, em duas lâminas (a lâmina anterior recebe as fibras claviculares e as esternais mais altas) | Com o braço elevado pelo deltoide, baixa-o junto com grande dorsal e redondo maior; sozinho, aduz, leva o braço à frente (cruzando o peito) e o gira para dentro | Superficial: "situado na parte superior e anterior do peito"; a aponeurose do oblíquo externo é coberta por ele e dá origem às suas fibras inferiores | Leque grosso ("thick, fan-shaped"); fibras claviculares descem oblíquas para lateral; o tendão é torcido (fibras profundas e inferiores sobem mais, passando por trás) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (Myologia, p. 436-437 e ação p. 437) |
| Peitoral maior, parte esternocostal | Metade da largura da face anterior do esterno, até a cartilagem da 6a ou 7a costela; cartilagens de todas as costelas verdadeiras (exceto, com frequência, a 1a ou a 7a); aponeurose do oblíquo externo | Mesma crista do tubérculo maior do úmero (lâmina posterior do tendão, que sobe mais alto) | Idem: aduz e roda para dentro; abaixa o braço previamente elevado | Superficial, como acima | Fibras da parte inferior do esterno e das cartilagens baixas sobem para lateral; as médias são horizontais | Idem | GRAY1918 |
| Deltoide, parte anterior (clavicular) | Borda anterior e face superior do terço lateral da clavícula | Tuberosidade deltóidea, no meio da face lateral do corpo do úmero (tendão único e espesso) | Fibras anteriores, assistidas pelo peitoral maior, levam o braço à frente; o deltoide todo eleva o braço até o ângulo reto com o tronco | Superficial: "cobre a articulação do ombro à frente, atrás e lateralmente" | Triangular, grosso; as fibras convergem; a parte do acrômio é bipenada ("arise in a bipenniform manner") a partir de 4 septos tendinosos que descem do acrômio e 3 que sobem da inserção | Gray não dá medida. Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 439-440) |
| Deltoide, parte lateral (acromial) | Margem lateral e face superior do acrômio | Mesma tuberosidade deltóidea | Elevação do braço (abdução) até a horizontal | Superficial | Bipenada, fibras oblíquas entre septos tendinosos (descrição de Gray para a parte do acrômio) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 |
| Deltoide, parte posterior (espinal) | Lábio inferior da borda posterior da espinha da escápula, até a superfície triangular da extremidade medial | Mesma tuberosidade deltóidea | Fibras posteriores, auxiliadas pelo redondo maior e pelo grande dorsal, levam o braço para trás | Superficial | Fibras vão obliquamente para frente e lateral; inseridas nas margens do tendão inferior (não bipenadas) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 |
| Grande dorsal | Processos espinhosos das 6 vértebras torácicas inferiores; lâmina posterior da fáscia toracolombar (que o prende às espinhas lombares e sacrais, ao ligamento supraespinhal e à parte posterior da crista ilíaca); lábio externo da crista ilíaca lateral ao sacroespinal; 3-4 costelas inferiores por digitações | Fundo do sulco intertubercular do úmero, por tendão quadrilátero de ~7 cm, que passa à frente do tendão do redondo maior; sobe mais alto no úmero que o tendão do peitoral maior | Deprime o úmero e o leva para trás, rodando-o para dentro (golpe para baixo); com o braço fixo, ajuda na inspiração forçada e puxa o tronco para frente (escalada) | Superficial: cobre a região lombar e a metade inferior da região torácica; cruza o ângulo inferior da escápula; contorna a borda inferior do redondo maior | Triangular, plano, estreitando-se num fascículo no úmero; torcido sobre si mesmo (fibras superiores ficam posteriores e depois inferiores) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 432-434 e ação p. 434) |
| Redondo maior | Área oval da face dorsal do ângulo inferior da escápula; septos fibrosos entre ele e o redondo menor e o infraespinal | Crista do tubérculo menor do úmero, por tendão plano de ~5 cm, atrás do tendão do grande dorsal (separados por uma bolsa) | Ajuda o grande dorsal a levar para baixo e para trás o úmero previamente elevado | Descrito em relação ao grande dorsal (o tendão do grande dorsal passa à frente do dele). Camada geral NÃO VERIFICADO | Espesso e algo achatado ("thick but somewhat flattened") | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 442) |
| Trapézio, parte superior (fibras superiores) | Protuberância occipital externa; terço medial da linha nucal superior; ligamento nucal (inferência minha: as fibras superiores "descem para lateral", logo saem da origem alta; Gray não separa por parte) | Borda posterior do terço lateral da clavícula | Com a cabeça fixa, eleva a ponta do ombro (carregar peso); o músculo todo retrai a escápula; os dois lados juntos puxam a cabeça para trás | Superficial: cobre a parte superior e posterior do pescoço e dos ombros | Triangular plano; os dois trapézios juntos formam um trapézio/losango; origem por aponeurose elíptica entre C6 e T3 | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 432 e ação p. 434) |
| Trapézio, parte média | Gray descreve uma origem só para o músculo (protuberância occipital, linha nucal, ligamento nucal, espinhosas de C7 e de todas as torácicas, supraespinhal); não separa por parte. Pelo trajeto "horizontal" das fibras médias, vêm da região entre C7 e as torácicas altas (inferência minha; a aponeurose central vai de C6 a T3) | Margem medial do acrômio e lábio superior da borda posterior da espinha da escápula | Retrai a escápula; as fibras médias e inferiores a giram, elevando o acrômio | Superficial | Fibras horizontais | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918. Nota: a divisão exata de quais vértebras alimentam cada parte NÃO está dada por Gray; só "as fibras médias correm horizontais" |
| Trapézio, parte inferior (fibras inferiores) | Espinhosas das torácicas, a quarta ponta do losango corresponde à 12a torácica (Gray); por trajeto "para cima e lateral", as inferiores vêm das torácicas baixas (inferência minha) | Terminam numa aponeurose que desliza sobre a superfície triangular lisa na extremidade medial da espinha e se insere num tubérculo no ápice dela | Ajuda a deprimir a escápula; com as médias, gira a escápula (eleva o acrômio) | Superficial | Fibras sobem para lateral e convergem em aponeurose | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 |
| Romboide maior | Processos espinhosos de T2, T3, T4 e T5; ligamento supraespinhal | Arco tendinoso preso acima à parte inferior da superfície triangular na raiz da espinha e abaixo ao ângulo inferior; o arco se liga à borda vertebral por membrana fina | Leva o ângulo inferior para trás e para cima (rotação leve da escápula); com as fibras médias e inferiores do trapézio, retrai a escápula | Profundo ao trapézio (inferência: Gray diz que os nervos cutâneos "pierce the Rhomboidei and Trapezius", ou seja, o romboide vem primeiro, de dentro para fora; o triângulo de ausculta tem o romboide maior no assoalho, limitado pelo trapézio e pelo grande dorsal) | Lâmina muscular plana com fibras oblíquas (forma NÃO descrita por adjetivo em Gray) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 434-435; relações: p. 434 e nervos dorsais) |
| Romboide menor | Parte inferior do ligamento nucal; processos espinhosos de C7 e T1 | Base da superfície triangular lisa na raiz da espinha da escápula | Idem (retração e leve rotação) | Idem | Faixa estreita, separada do maior por pequeno intervalo | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 |
| Serrátil anterior | Digitações carnosas das faces externas e bordas superiores das 8-9 costelas superiores (a 1a digitação vem da 1a e 2a costelas) e fáscia dos intercostais | Face ventral da borda vertebral da escápula: 1a digitação no ângulo medial; 2a e 3a em lâmina triangular na borda quase toda; 5-6 inferiores convergem num leque que se insere no ângulo inferior | No conjunto leva a escápula para frente e levanta a borda vertebral (empurrar); fibras inferiores rodam a escápula e, junto ao trapézio, elevam o acrômio; fixa a escápula quando o deltoide eleva o braço | Entre as costelas e a escápula, na parede lateral do tórax (entre a parede costal e a escápula) | Lâmina fina; as inferiores formam um "fan-shaped mass"; interdigita com o oblíquo externo e com o grande dorsal | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 438-439); confere com OSX115 (origem: costelas 1-8 ou 1-9; inserção: face anterior da borda vertebral da escápula) |
| Infraespinal | Dois terços mediais da fossa infraespinal; cristas da face; fáscia infraespinal | Impressão média do tubérculo maior do úmero (tendão desliza sobre a borda lateral da espinha e cruza a cápsula posterior do ombro) | Roda o úmero para fora; ajuda a levar o braço para trás; protege a articulação por trás | Cobre a fossa infraespinal, coberto por fáscia infraespinal, que o separa dos redondos. Posição em relação ao trapézio e ao deltoide NÃO VERIFICADO | Triangular e espesso, fibras convergindo para um tendão | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 441) |
| Bíceps braquial | Cabeça curta: ápice do processo coracoide (tendão achatado, junto com o coracobraquial). Cabeça longa: tubérculo supraglenoidal, no limite superior da cavidade glenoidal, contínua com o lábio glenoidal; o tendão passa sobre a cabeça do úmero e desce no sulco intertubercular | Parte posterior rugosa da tuberosidade do rádio; do tendão sai o lacertus fibrosus (aponeurose bicipital) pelo lado medial | Flexor do cotovelo e, menos, do ombro; supinador potente | Na frente do braço ("placed on the front of the arm"); relação em camadas com o braquial NÃO VERIFICADO | Fusiforme longo ("long fusiform muscle"), dois ventres | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 443-444) |
| Braquial | Metade inferior da face anterior do úmero, começando acima na inserção do deltoide (que abraça em dois processos angulares); septos intermusculares (mais o medial) | Tuberosidade da ulna e depressão rugosa da face anterior do processo coronoide | Flexor do antebraço; defesa importante da articulação do cotovelo | Cobre a frente do cotovelo e a metade inferior do úmero (camada relativa ao bíceps NÃO VERIFICADO) | Fibras convergem a um tendão espesso | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 444) |
| Braquiorradial | Dois terços superiores da crista supracondilar lateral do úmero; septo intermuscular lateral | Lado lateral da base do processo estiloide do rádio (tendão plano, acima do meio do antebraço) | Flexor do cotovelo, mas só depois que a flexão foi iniciada pelo bíceps e braquial | Superficial: "o músculo mais superficial do lado radial do antebraço" | Ventre curto e tendão longo (fibras terminam acima do meio do antebraço) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 451-452) |
| Tríceps braquial, cabeça longa | Tubérculo infraglenoidal da escápula (tendão achatado, misturado à cápsula do ombro) | Tendão comum: face superior posterior do olécrano, com faixa que segue lateralmente sobre o ancôneo para a fáscia do antebraço | Grande extensor do antebraço; a cabeça longa ajuda redondo maior e grande dorsal a levar o úmero para trás e aduzir | Dorso do braço; a cabeça longa desce entre o redondo menor e o redondo maior; a cabeça medial é profunda (origem na face posterior do úmero abaixo do sulco do nervo radial) | Três cabeças, uma lâmina tendinosa comum ("two aponeurotic laminae") que começa no meio do músculo | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 444-445) |
| Tríceps braquial, cabeça lateral | Face posterior do corpo do úmero entre a inserção do redondo menor e a parte alta do sulco do nervo radial; borda lateral do úmero; septo lateral | Mesmo tendão (olécrano) | Extensor do cotovelo | Posição em camadas NÃO VERIFICADO (Gray só diz que as cabeças ficam "no dorso do braço") | Fibras convergem ao tendão | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 |
| Tríceps braquial, cabeça medial | Face posterior do úmero abaixo do sulco do nervo radial, da inserção do redondo maior até 2,5 cm da tróclea; borda medial e septo medial | Mesmo tendão (olécrano); parte das fibras desce direto ao olécrano | Extensor do cotovelo (a menor cabeça, mais profunda) | Profunda, entre as outras duas na parte alta ("narrow and pointed above") | Estreita e pontuda em cima | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 |
| Flexores do antebraço (grupo superficial: pronador redondo, flexor radial do carpo, palmar longo, flexor ulnar do carpo, flexor superficial dos dedos) | Epicôndilo medial do úmero, por tendão comum (mais fáscia e septos); o flexor ulnar tem origem também no olécrano e na ulna | NÃO lidas nesta sessão (só as origens) | Flexão do punho e dos dedos; o pronador roda o rádio sobre a ulna; auxiliam a flexão do cotovelo | Lado volar (anterior) do antebraço; o grupo superficial recobre o profundo (flexor profundo dos dedos, flexor longo do polegar, pronador quadrado) | Fusiformes com tendões longos (descrição de Gray do palmar longo: "slender, fusiform") | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 445-451). Origem confirmada; inserções distais só parcialmente lidas |
| Extensores do antebraço (extensor comum dos dedos, extensor ulnar do carpo, extensores radiais do carpo, extensor do dedo mínimo) | Epicôndilo lateral do úmero, por tendão comum (extensor radial longo: crista supracondilar lateral) | NÃO lidas nesta sessão (só as origens e as ações) | Estendem punho e dedos; antagonistas diretos dos flexores e pronadores; extensor radial longo abduz a mão; o extensor ulnar inclina a mão ao lado ulnar | Dorso e lado lateral do antebraço; braquiorradial é o mais superficial do lado radial e cobre parcialmente o extensor radial longo | Fusiformes com tendões longos | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 451-453) |
| Reto abdominal | Crista do púbis (tendão lateral, o maior) e ligamentos sobre a sínfise púbica (tendão medial) | Cartilagens das costelas 5, 6 e 7 (três porções); algumas fibras no processo xifoide | Flexiona a coluna e abaixa o tórax; de cima, flexiona a pelve sobre a coluna; com pelve fixa, curva o tronco para frente | Frente do abdome, de cada lado da linha alba ("separated from its fellow ... by the linea alba"); bainha do reto e relação com o oblíquo externo NÃO lidas em detalhe | Faixa longa e plana, mais larga e fina em cima que embaixo; cruzada por 3 intersecções tendinosas (umbigo, xifoide, meio do caminho) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 415-416, 418) |
| Oblíquo externo do abdome | Superfícies externas e bordas inferiores das 8 costelas inferiores, por 8 digitações carnosas (alternadas com serrátil anterior e grande dorsal) | Fibras de baixo (costelas inferiores): metade anterior do lábio externo da crista ilíaca; as demais terminam em aponeurose que segue para a linha alba, o ligamento inguinal (EIAS-tubérculo púbico) e a linha pectínea | Com a pelve fixa, flexiona o tronco para frente (ambos os lados); um lado: inclina o tronco para o mesmo lado e o gira para o lado oposto; comprime as vísceras | Superficial: "o maior e mais superficial dos três músculos planos" do abdome | Fino, plano, quadrilátero irregular; fibras descem para frente e medial | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 409-410, 417-418) |
| Eretores da espinha (sacroespinal: iliocostal, longuíssimo, espinal) | Tendão largo preso à crista medial do sacro, aos processos espinhosos lombares e de T11-T12, ao ligamento supraespinhal, ao lábio interno posterior da crista ilíaca e às cristas laterais do sacro; funde-se às fibras do glúteo máximo | Iliocostal lombar: bordas inferiores dos ângulos das 6-7 costelas inferiores; longuíssimo torácico: pontas dos processos transversos de todas as torácicas e 9-10 costelas inferiores; continua para cervical e cabeça | Mantém a coluna ereta; curva o tronco para trás (contrabalança peso à frente); um lado: inclina o tronco | Cobertos pela fáscia toracolombar nas regiões lombar e torácica e pela fáscia nucal no pescoço; ficam no sulco ao lado da coluna | Massa carnosa larga que se divide na parte lombar alta em três colunas (iliocostal, longuíssimo, espinal) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 397-400 e ação) |
| Glúteo máximo | Linha glútea posterior do ílio e osso logo acima e atrás; face posterior da parte inferior do sacro e lado do cóccix; aponeurose do sacroespinal; ligamento sacrotuberal; fáscia glútea que cobre o glúteo médio | Parte superior e maior (mais fibras superficiais da parte inferior): trato iliotibial da fáscia lata; fibras profundas inferiores: tuberosidade glútea do fêmur, entre o vasto lateral e o adutor magno | Estende o fêmur; com ponto fixo embaixo, puxa a pelve para trás para voltar à postura ereta (com isquiotibiais); parte inferior aduz e roda para fora | Superficial: "o músculo mais superficial da região glútea"; cobre o glúteo médio na parte posterior | Massa quadrilátera, larga e grossa, de fascículos paralelos agrupados em grandes feixes por septos ("remarkably coarse") | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 474-475) |
| Glúteo médio | Face externa do ílio entre a crista ilíaca e a linha glútea posterior (acima) e a linha glútea anterior (abaixo); fáscia glútea | Crista oblíqua na face lateral do trocânter maior (tendão plano forte) | Abduz a coxa com o membro estendido; essencial para sustentar o corpo sobre uma perna; fibras anteriores giram a coxa para dentro | Profundo ao glúteo máximo no terço posterior; nos dois terços anteriores coberto só pela aponeurose glútea | Largo, espesso, radiado ("broad, thick, radiating") | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 475, ação p. 475-476) |
| Reto femoral | Tendão reto: espinha ilíaca ântero-inferior (EIAI); tendão refletido: sulco acima da borda do acetábulo | Base da patela (aponeurose larga e espessa que se estreita), depois ligamento patelar até a tuberosidade da tíbia | Estende a perna; ajuda a flexionar a coxa na pelve | Meio da frente da coxa; é a porção superficial do quadríceps | Fusiforme, fibras superficiais bipenadas ("fusiform ... bipenniform") | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 470-471) |
| Vasto lateral | Linha intertrocantérica (parte superior), bordas anterior e inferior do trocânter maior, lábio lateral da tuberosidade glútea e metade superior do lábio lateral da linha áspera; aponeurose que cobre 3/4 superiores do músculo | Borda lateral da patela, misturando-se ao tendão do quadríceps; expansão para a cápsula do joelho | Estende a perna | Lado lateral do fêmur, que ele cobre dos trocânteres aos côndilos junto com os outros vastos | A maior porção do quadríceps; massa carnosa fixada a aponeurose profunda | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 470-471) |
| Vasto medial | Metade inferior da linha intertrocantérica, lábio medial da linha áspera, parte superior da linha supracondilar medial, tendões do adutor longo e magno, septo intermuscular medial | Borda medial da patela e tendão do quadríceps; expansão para a cápsula | Estende a perna; puxa a patela medialmente e para cima | Lado medial do fêmur; junto ao vasto intermédio ("inseparavelmente unidos") | Fibras descem para frente, presas a aponeurose profunda | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 471) |
| Vasto intermédio | Faces anterior e lateral do corpo do fêmur nos 2/3 superiores; parte inferior do septo lateral | Aponeurose superficial que forma a parte profunda do tendão do quadríceps (base da patela) | Estende a perna | Profundo: em contato com o fêmur, sob o reto femoral ("when the Rectus femoris has been reflected") | Fibras terminam em aponeurose superficial | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 471) |
| Bíceps femoral (cabeças longa e curta) | Longa: impressão inferior e medial da tuberosidade isquiática (tendão comum com o semitendíneo) e ligamento sacrotuberal. Curta: lábio lateral da linha áspera (e prolongamento lateral até 5 cm do côndilo lateral) e septo lateral | Lado lateral da cabeça da fíbula (e, por pequena faixa, côndilo lateral da tíbia); o tendão se divide em duas partes que abraçam o ligamento colateral fibular | Flexiona a perna; com ponto fixo embaixo, sustenta a pelve e puxa o tronco para trás; roda a perna levemente para fora com o joelho semiflexionado | Região posterior e lateral da coxa; a cabeça longa cruza o nervo ciático | Ventre fusiforme (cabeça longa) com aponeurose posterior | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 478-479) |
| Semitendíneo | Impressão inferior e medial da tuberosidade isquiática (tendão comum com bíceps femoral); aponeurose que une os dois por ~7,5 cm | Parte superior da face medial do corpo da tíbia, quase até a crista anterior (atrás do tendão do sartório e abaixo do do grácil, ao qual se une) | Flexiona a perna; roda para dentro; estende o quadril com ponto fixo na perna | Posterior e medial da coxa; tendão de inserção longo | Fusiforme, "notável pelo longo tendão"; intersecção tendinosa no meio | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 479) |
| Semimembranáceo | Impressão superior e lateral da tuberosidade isquiática (tendão grosso, acima e lateral ao bíceps e ao semitendíneo) | Sobretudo no sulco horizontal na face posterior-medial do côndilo medial da tíbia; expansões ao côndilo lateral do fêmur (ligamento poplíteo oblíquo), à fáscia do poplíteo e ao colateral tibial | Flexiona a perna; ajuda a rodar para dentro; estende o quadril | Posterior e medial; fica sob o semitendíneo (Gray: "tendon of origin... above and lateral" aos outros, aponeurose cobrindo a frente do músculo; relação exata de profundidade NÃO VERIFICADO) | Aponeurose de origem em cima, aponeurose de inserção embaixo (penado em sentido amplo; Gray não usa a palavra) | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 479) |
| Adutor longo | Frente do púbis, no ângulo entre crista e sínfise (tendão estreito e plano) | Linha áspera, entre o vasto medial e o adutor magno (aponeurose) | Aduz a coxa com força (grupo de adutores); gira para fora | Superficial: "o mais superficial dos três adutores", no mesmo plano do pectíneo | Triangular, ventre largo | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 472-473, ação p. 473) |
| Adutor magno | Pequena parte do ramo inferior do púbis; ramo do ísquio; margem externa da parte inferior da tuberosidade isquiática | Fibras púbicas: linha do trocânter maior à linha áspera, medial ao glúteo máximo; fibras isquiáticas: linha áspera e parte alta do prolongamento medial; porção medial (fibras da tuberosidade): tubérculo adutor do côndilo medial do fêmur | Os três adutores e o pectíneo aduzem a coxa com força; pela obliquidade da inserção na linha áspera giram a coxa para fora | Profundo aos outros adutores (relação exata NÃO VERIFICADO); lado medial da coxa | Grande, triangular; massa medial espessa, quase vertical | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 473) |
| Gastrocnêmio (cabeças medial e lateral) | Medial: depressão na parte superior e posterior do côndilo medial do fêmur; lateral: impressão no lado do côndilo lateral e superfície posterior acima dele; ambas também na cápsula do joelho | Tendão calcâneo (de Aquiles), junto com o sóleo, na parte média da face posterior do calcâneo | Extensor (flexão plantar) do tornozelo; com ponto fixo embaixo, flete o fêmur sobre a tíbia | Superficial: "o músculo mais superficial e forma a maior parte da panturrilha" | Duas cabeças; fibras partem de aponeuroses e "unem-se em ângulo" numa rafe tendinosa (classificação minha: penado); a cabeça medial é mais grossa e desce mais | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. Dado específico lido: MG humano, 10 ciclistas (DICK2017): espessura muda 1,6 a 2,6 mm (média de repouso 15,3 mm), fascículos encurtam até ~20 mm; o volume é assumido quase constante. | GRAY1918 (p. 482-483); DICK2017 (texto-completo PMC, licença não confirmada) |
| Sóleo | Parte posterior da cabeça da fíbula e terço superior da face posterior da fíbula; linha poplítea e terço médio da borda medial da tíbia; arco tendinoso entre as origens | Tendão calcâneo (com o gastrocnêmio) | Extensor do tornozelo; em pé, fixa a perna sobre o pé e impede cair para frente | Profundo ao gastrocnêmio: "situado logo à frente do gastrocnêmio" | Largo e plano; aponeurose posterior que engrossa e se estreita | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. | GRAY1918 (p. 483) |
| Tibial anterior | Côndilo lateral e metade a dois terços superiores da face lateral da tíbia; membrana interóssea; fáscia profunda; septo para o extensor longo dos dedos | Face medial e inferior do primeiro cuneiforme e base do primeiro metatarso | Flexiona o pé no tornozelo (dorsiflexão); com o tibial posterior, inverte o pé | Lado lateral da tíbia, na frente da perna (superficial com tendão visível no terço inferior); cobre os vasos tibiais anteriores e o nervo fibular profundo na parte alta | Grosso e carnoso em cima, tendinoso embaixo; fibras descem verticais | Sem medida específica lida para este músculo. Regra geral: AZIZI2008 (resumo) e RAITERI2016 (texto) tratam o músculo como de volume ~constante: ao encurtar, engrossa. Dado específico lido (TA humano, 12 voluntários, 3D ultrassom, isométrico até 50% da CVM): a espessura aumentou 2,5 +/- 0,8 mm e a área da seção 63 +/- 48 mm2 no meio do músculo; a largura quase não mudou (+0,4 +/- 1,7 mm); o volume ficou ~constante; fascículos encurtaram e a penação aumentou (valores só em figura, não lidos). Repouso: penação 10,9 graus (superficial), comprimento de fascículo 68,6 mm (superficial). | GRAY1918 (p. 480); RAITERI2016 (texto-completo, CC BY 4.0) |

## Parte 2 — Modelos musculoesqueléticos abertos (OpenSim)

**Convenção de eixos do OpenSim** (confirmada nos arquivos: gravidade `0 -9.80665 0` no Rajagopal2016.osim, o eixo y é vertical): x para a frente, y para cima, z para a direita do sujeito. Unidades: metros e radianos. Todas as coordenadas abaixo estão no sistema do osso indicado (osso-pai), lado direito. O lado esquerdo é o espelho (z com sinal trocado). Origem de cada osso (Gait2392, texto da página de documentação, OSIMWIKI-G2392): pelve = ponto médio entre as duas EIAS (espinhas ilíacas ântero-superiores); fêmur = centro da cabeça femoral; tíbia = ponto médio entre os epicôndilos femorais; tálus = ponto médio entre os ápices dos maléolos.

Arquivos baixados em 12/11/2026 de `raw.githubusercontent.com/opensim-org/opensim-models/master/Models/...` (a API do GitHub não estava liberada na sessão; a listagem de pastas foi lida pela página web do repositório). Pastas existentes em `Models/`: Arm26, BouncingBlock, DoublePendulum, Gait10dof18musc, Gait2354_Simbody, Gait2392_Simbody, Hamner, Jumper, Leg39, Leg6Dof9Musc, Pendulum, Rajagopal, Rajagopal_OpenSense, SoccerKick, ToyLanding, Tug_of_War, WalkerModel, WristModel. **Não existe MoBL-ARMS nem modelo de ombro com músculos nesse repositório.**

### 2.0 Resumo de licenças

| modelo | arquivo | licença (onde li) | serve para app comercial com crédito? |
|---|---|---|---|
| Gait2392 (Delp, Loan, Hoy, Zajac, Topp, Rosen, Thelen, Anderson, Seth) | `Models/Gait2392_Simbody/gait2392_thelen2003muscle.osim` | Texto no campo `<credits>` do próprio .osim: "License: Creative Commons (CCBY 3.0). You are free to distribute, remix, tweak, and build upon this work, even commercially, as long as you credit us for the original creation. http://creativecommons.org/licenses/by/3.0/". A tabela de modelos do wiki do OpenSim também diz "Creative Commons CCBBY 3.0" (sic). | **Sim**, com crédito aos autores (CC BY 3.0). |
| Gait2354 (versão reduzida) | `Models/Gait2354_Simbody/gait2354_simbody.osim` | Mesmo texto CC BY 3.0 no `<credits>`; acrescenta que o número de músculos foi reduzido "and is not intended to be used in research". | Sim, com crédito. Não usei (menos músculos). |
| Arm26 (Reinbolt, Seth, Habib, Hamner; adaptado de Holzbaur) | `Models/Arm26/arm26.osim` | `<credits>`: "License: Creative Commons (CCBY 3.0). You are free to distribute, remix, tweak, and build upon this work, even commercially, as long as you credit us for the original creation." Publicação: Holzbaur, Murray, Delp 2005, Ann Biomed Eng 33:829-840. | **Sim**, com crédito. Só tem tríceps, bíceps e braquial, 2 graus de liberdade. |
| Rajagopal 2016 full body (Rajagopal, Dembia, DeMers, Delp, Hicks, Delp) | `Models/Rajagopal/Rajagopal2016.osim` | O .osim e o README.txt do repositório **não trazem licença**. A página do projeto no SimTK (`simtk.org/projects/full_body`) mostra o acordo de uso "MIT Use Agreement": "Copyright (c) 2015, Stanford University. Permission is hereby granted, free of charge, to ... use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies ... The above copyright notice and this permission notice shall be included in all copies". Divergência: o artigo no PMC (IEEE TBME) diz "Personal use of this material is permitted ... permission ... must be obtained from the IEEE" (isso vale para o texto do artigo, não para o modelo). | **Sim** (MIT), mantendo o aviso de copyright; o repositório opensim-models não tem arquivo LICENSE visível (página raiz lida via WebFetch), então a licença vem da página do SimTK. |
| MoBL-ARMS (Saul et al. 2015) | SimTK `upexdyn` (`MobL_ARMS_OpenSim41_unimanual_tutorial.zip`, `MobL_ARMS_OpenSim3_bimanual_model.zip`) | Texto lido na página do SimTK (HTML público, 12/11/2026): "open sourced solely for non-commercial purposes ... under the BSD 3-Clause License below ... commercial use requires a commercial license". | **NÃO serve** (uso comercial exige licença comercial). Não baixei o .osim. Divergência: a tabela do wiki do OpenSim lista esse modelo como "MIT" (Jul/2014); vale a redação atual do SimTK, a mais restritiva. |
| Modelo da articulação escapulotorácica (Seth et al., 2016/2019) | SimTK `scapulothoracic` (`ScapulothorachicJoint_Shoulder.osim`) | Acordo "Creative Commons ANC Use Agreement": "Creative Commons Attribution-NonCommercial License" (texto lido na página). | **NÃO serve** (NC). |

Resultado: **não encontrei nenhum modelo de ombro/tronco superior com músculos (peitoral, deltoide, grande dorsal, trapézio, romboides, serrátil) com licença que sirva** (MIT, BSD sem restrição, Apache, CC0, CC BY). O Rajagopal2016 tem tronco e braços só com atuadores de torque ("17 torque actuators", artigo PMC5507211), sem músculos do ombro. Para essas estruturas as origens e inserções vêm só dos livros-texto (Parte 1).

### 2.1 Gait2392 (CC BY 3.0) — pelve, coluna lombar ("back"), perna e tronco

Sujeito: "The default, unscaled version of these models represents a subject that is about 1.8 m tall and has a mass of 75.16 kg" (página Gait 2392 and 2354 Models, wiki do OpenSim; OSIMWIKI-G2392). A soma das massas dos corpos no .osim dá 75.165 kg (conferido por script). Massas: pelve 11.777; fêmur 9.3014; tíbia 3.7075; tálus 0.1; calcâneo 1.25; dedos 0.2166; tronco (inclui cabeça, braços e a coluna toda, um só segmento) 34.2366 kg. Centro de massa do tronco: (-0.03, 0.32, 0) m no sistema do tronco.

**Articulações (posição na estrutura do osso-pai; a posição na estrutura do filho é 0 0 0, salvo onde indicado):**

| articulação | osso pai | x | y | z | observação |
|---|---|---|---|---|---|
| ground_pelvis | ground | 0 | 0 | 0 | 6 GDL livres |
| hip_r (quadril direito) | pelvis | -0.0707 | -0.0661 | +0.0835 | centro da cabeça femoral em relação ao ponto médio das EIAS; 3 rotações (flexão eixo z, adução eixo x, rotação eixo y); distância entre os dois centros = 2 x 0.0835 = 0.1670 m |
| hip_l | pelvis | -0.0707 | -0.0661 | -0.0835 | espelho |
| knee_r | femur_r | 0 | 0 | 0 | a posição da tíbia em relação ao fêmur é uma função do ângulo do joelho (splines em `knee_r`); não é ponto fixo |
| ankle_r | tibia_r | 0 | -0.43 | 0 | tálus; distância joelho-tornozelo = 0.43 m |
| subtalar_r | talus_r | -0.04877 | -0.04195 | +0.00792 | calcâneo |
| mtp_r | calcn_r | 0.1788 | -0.002 | +0.00108 | dedos |
| back (lombar) | pelvis | -0.1007 | +0.0815 | 0 | origem do tronco (3 rotações: extensão eixo z, inclinação lateral eixo x, rotação eixo y; faixa de -90 a +90 graus em cada) |

O modelo não tem ombro nem braço. Não há marcadores no arquivo (0 `<Marker>`).

**Trajeto dos músculos (lado direito; pontos de passagem em ordem origem -> inserção).** Colunas: Fmax = `max_isometric_force`; l_fibra_ót = `optimal_fiber_length`; l_tendão = `tendon_slack_length`; penação = `pennation_angle_at_optimal`. "condicional" = ponto ativo só numa faixa do ângulo (rad) da junta. "MovingPathPoint" = ponto cuja posição é função do ângulo do joelho (valor avaliado com o joelho em 0). Nomes: glut_max1/2/3 = glúteo máximo (partes superior, média, inferior segundo a página do modelo); glut_med1/2/3 = glúteo médio (3 partes; qual é anterior/posterior NÃO VERIFICADO no texto); rect_fem = reto femoral; vas_* = vastos; bifemlh/bifemsh = bíceps femoral cabeça longa/curta; add_mag1/2/3 = adutor magno (3 partes); med_gas/lat_gas = gastrocnêmio medial/lateral; ercspn = eretor da espinha; intobl/extobl = oblíquo interno/externo. O .osim não traz reto abdominal.

| músculo | Fmax (N) | l_fibra_ót (m) | l_tendão (m) | penação (rad) | # | tipo ponto | osso | x | y | z | notas |
|---|---|---|---|---|---|---|---|---|---|---|---|
| glut_med1_r | 819 | 0.0535 | 0.078 | 0.1396 | 1 | fixo | pelvis | -0.0408 | 0.0304 | 0.1209 |  |
| glut_med1_r |  |  |  |  | 2 | fixo | femur_r | -0.0218 | -0.0117 | 0.0555 |  |
| glut_med2_r | 573 | 0.0845 | 0.053 | 0 | 1 | fixo | pelvis | -0.0855 | 0.0445 | 0.0766 |  |
| glut_med2_r |  |  |  |  | 2 | fixo | femur_r | -0.0258 | -0.0058 | 0.0527 |  |
| glut_med3_r | 653 | 0.0646 | 0.053 | 0.3316 | 1 | fixo | pelvis | -0.1223 | 0.0105 | 0.0648 |  |
| glut_med3_r |  |  |  |  | 2 | fixo | femur_r | -0.0309 | -0.0047 | 0.0518 |  |
| semimem_r | 1288 | 0.08 | 0.359 | 0.2618 | 1 | fixo | pelvis | -0.1192 | -0.0975 | 0.0715 |  |
| semimem_r |  |  |  |  | 2 | ConditionalPonto | tibia_r | -0.0348 | -0.0352 | -0.0189 | condicional, faixa -0.55850500000000003 0.17453299999999999 coord  |
| semimem_r |  |  |  |  | 3 | fixo | tibia_r | -0.0270 | -0.0477 | -0.0196 |  |
| semiten_r | 410 | 0.201 | 0.2555 | 0.08727 | 1 | fixo | pelvis | -0.1263 | -0.1099 | 0.0604 |  |
| semiten_r |  |  |  |  | 2 | ConditionalPonto | tibia_r | -0.0420 | -0.0286 | -0.0228 | condicional, faixa -0.33161299999999999 0.17453299999999999 coord  |
| semiten_r |  |  |  |  | 3 | fixo | tibia_r | -0.0332 | -0.0528 | -0.0229 |  |
| semiten_r |  |  |  |  | 4 | fixo | tibia_r | -0.0113 | -0.0746 | -0.0245 |  |
| semiten_r |  |  |  |  | 5 | fixo | tibia_r | 0.0027 | -0.0956 | -0.0193 |  |
| bifemlh_r | 896 | 0.109 | 0.326 | 0 | 1 | fixo | pelvis | -0.1260 | -0.1026 | 0.0694 |  |
| bifemlh_r |  |  |  |  | 2 | fixo | tibia_r | -0.0301 | -0.0360 | 0.0294 |  |
| bifemlh_r |  |  |  |  | 3 | fixo | tibia_r | -0.0234 | -0.0563 | 0.0343 |  |
| bifemsh_r | 804 | 0.173 | 0.089 | 0.4014 | 1 | fixo | femur_r | 0.0050 | -0.2111 | 0.0234 |  |
| bifemsh_r |  |  |  |  | 2 | fixo | tibia_r | -0.0301 | -0.0360 | 0.0294 |  |
| bifemsh_r |  |  |  |  | 3 | fixo | tibia_r | -0.0234 | -0.0563 | 0.0343 |  |
| add_long_r | 627 | 0.138 | 0.11 | 0.1047 | 1 | fixo | pelvis | -0.0316 | -0.0836 | 0.0169 |  |
| add_long_r |  |  |  |  | 2 | fixo | femur_r | 0.0050 | -0.2111 | 0.0234 |  |
| add_mag1_r | 381 | 0.087 | 0.06 | 0.08727 | 1 | fixo | pelvis | -0.0732 | -0.1174 | 0.0255 |  |
| add_mag1_r |  |  |  |  | 2 | fixo | femur_r | -0.0045 | -0.1211 | 0.0339 |  |
| add_mag2_r | 343 | 0.121 | 0.12 | 0.05236 | 1 | fixo | pelvis | -0.0831 | -0.1192 | 0.0308 |  |
| add_mag2_r |  |  |  |  | 2 | fixo | femur_r | 0.0054 | -0.2285 | 0.0227 |  |
| add_mag3_r | 488 | 0.131 | 0.249 | 0.08727 | 1 | fixo | pelvis | -0.1111 | -0.1141 | 0.0488 |  |
| add_mag3_r |  |  |  |  | 2 | fixo | femur_r | 0.0070 | -0.3837 | -0.0266 |  |
| glut_max1_r | 573 | 0.142 | 0.125 | 0.08727 | 1 | fixo | pelvis | -0.1195 | 0.0612 | 0.0700 |  |
| glut_max1_r |  |  |  |  | 2 | fixo | pelvis | -0.1291 | 0.0012 | 0.0886 |  |
| glut_max1_r |  |  |  |  | 3 | fixo | femur_r | -0.0457 | -0.0248 | 0.0392 |  |
| glut_max1_r |  |  |  |  | 4 | fixo | femur_r | -0.0277 | -0.0566 | 0.0470 |  |
| glut_max2_r | 819 | 0.147 | 0.127 | 0 | 1 | fixo | pelvis | -0.1349 | 0.0176 | 0.0563 |  |
| glut_max2_r |  |  |  |  | 2 | fixo | pelvis | -0.1376 | -0.0520 | 0.0914 |  |
| glut_max2_r |  |  |  |  | 3 | fixo | femur_r | -0.0426 | -0.0530 | 0.0293 |  |
| glut_max2_r |  |  |  |  | 4 | fixo | femur_r | -0.0156 | -0.1016 | 0.0419 |  |
| glut_max3_r | 552 | 0.144 | 0.145 | 0.08727 | 1 | fixo | pelvis | -0.1556 | -0.0314 | 0.0058 |  |
| glut_max3_r |  |  |  |  | 2 | fixo | pelvis | -0.1529 | -0.1052 | 0.0403 |  |
| glut_max3_r |  |  |  |  | 3 | fixo | femur_r | -0.0299 | -0.1041 | 0.0135 |  |
| glut_max3_r |  |  |  |  | 4 | fixo | femur_r | -0.0060 | -0.1419 | 0.0411 |  |
| rect_fem_r | 1169 | 0.114 | 0.31 | 0.08727 | 1 | fixo | pelvis | -0.0295 | -0.0311 | 0.0968 |  |
| rect_fem_r |  |  |  |  | 2 | ConditionalPonto | femur_r | 0.0334 | -0.4030 | 0.0019 | condicional, faixa -2.6179899999999998 -1.45997 coord  |
| rect_fem_r |  |  |  |  | 2 | MovingPonto | tibia_r | 0.0618 | 0.0210 | 0.0014 | MovingPathPoint, valor com a coordenada da junta em 0 (varia com o ângulo do joelho) |
| vas_med_r | 1294 | 0.089 | 0.126 | 0.08727 | 1 | fixo | femur_r | 0.0140 | -0.2099 | 0.0188 |  |
| vas_med_r |  |  |  |  | 2 | fixo | femur_r | 0.0356 | -0.2769 | 0.0009 |  |
| vas_med_r |  |  |  |  | 3 | ConditionalPonto | femur_r | 0.0370 | -0.4048 | -0.0125 | condicional, faixa -2.6179899999999998 -1.21004 coord  |
| vas_med_r |  |  |  |  | 4 | ConditionalPonto | femur_r | 0.0274 | -0.4255 | -0.0131 | condicional, faixa -2.6179899999999998 -1.78006 coord  |
| vas_med_r |  |  |  |  | 2 | MovingPonto | tibia_r | 0.0560 | 0.0218 | -0.0146 | MovingPathPoint, valor com a coordenada da junta em 0 (varia com o ângulo do joelho) |
| vas_int_r | 1365 | 0.087 | 0.136 | 0.05236 | 1 | fixo | femur_r | 0.0290 | -0.1924 | 0.0310 |  |
| vas_int_r |  |  |  |  | 2 | fixo | femur_r | 0.0335 | -0.2084 | 0.0285 |  |
| vas_int_r |  |  |  |  | 3 | ConditionalPonto | femur_r | 0.0343 | -0.4030 | 0.0055 | condicional, faixa -2.6179899999999998 -1.4199999999999999 coord  |
| vas_int_r |  |  |  |  | 2 | MovingPonto | tibia_r | 0.0555 | 0.0253 | 0.0018 | MovingPathPoint, valor com a coordenada da junta em 0 (varia com o ângulo do joelho) |
| vas_lat_r | 1871 | 0.084 | 0.157 | 0.08727 | 1 | fixo | femur_r | 0.0048 | -0.1854 | 0.0349 |  |
| vas_lat_r |  |  |  |  | 2 | fixo | femur_r | 0.0269 | -0.2591 | 0.0409 |  |
| vas_lat_r |  |  |  |  | 3 | ConditionalPonto | femur_r | 0.0361 | -0.4030 | 0.0205 | condicional, faixa -2.6179899999999998 -1.21004 coord  |
| vas_lat_r |  |  |  |  | 4 | ConditionalPonto | femur_r | 0.0253 | -0.4243 | 0.0184 | condicional, faixa -2.6179899999999998 -1.92004 coord  |
| vas_lat_r |  |  |  |  | 2 | MovingPonto | tibia_r | 0.0600 | 0.0196 | 0.0165 | MovingPathPoint, valor com a coordenada da junta em 0 (varia com o ângulo do joelho) |
| med_gas_r | 1558 | 0.06 | 0.39 | 0.2967 | 1 | fixo | femur_r | -0.0190 | -0.3929 | -0.0235 |  |
| med_gas_r |  |  |  |  | 2 | ConditionalPonto | femur_r | -0.0300 | -0.4022 | -0.0258 | condicional, faixa -0.78539800000000004 0.17453299999999999 coord  |
| med_gas_r |  |  |  |  | 3 | fixo | calcn_r | 0.0000 | 0.0310 | -0.0053 |  |
| lat_gas_r | 683 | 0.064 | 0.38 | 0.1396 | 1 | fixo | femur_r | -0.0220 | -0.3946 | 0.0272 |  |
| lat_gas_r |  |  |  |  | 2 | ConditionalPonto | femur_r | -0.0300 | -0.4018 | 0.0274 | condicional, faixa -0.78539800000000004 0.17453299999999999 coord  |
| lat_gas_r |  |  |  |  | 3 | fixo | calcn_r | 0.0000 | 0.0310 | -0.0053 |  |
| soleus_r | 3549 | 0.05 | 0.25 | 0.4363 | 1 | fixo | tibia_r | -0.0024 | -0.1533 | 0.0071 |  |
| soleus_r |  |  |  |  | 2 | fixo | calcn_r | 0.0000 | 0.0310 | -0.0053 |  |
| tib_ant_r | 905 | 0.098 | 0.223 | 0.08727 | 1 | fixo | tibia_r | 0.0179 | -0.1624 | 0.0115 |  |
| tib_ant_r |  |  |  |  | 2 | fixo | tibia_r | 0.0329 | -0.3951 | -0.0177 |  |
| tib_ant_r |  |  |  |  | 3 | fixo | calcn_r | 0.1166 | 0.0178 | -0.0305 |  |
| ercspn_r | 2500 | 0.12 | 0.03 | 0 | 1 | fixo | pelvis | -0.1400 | 0.0439 | 0.0436 |  |
| ercspn_r |  |  |  |  | 2 | fixo | torso | -0.0550 | 0.1100 | 0.0241 |  |
| intobl_r | 900 | 0.1 | 0.1 | 0 | 1 | fixo | pelvis | -0.0400 | 0.0700 | 0.1157 |  |
| intobl_r |  |  |  |  | 2 | fixo | torso | 0.0700 | 0.1600 | 0.0150 |  |
| extobl_r | 900 | 0.12 | 0.14 | 0 | 1 | fixo | pelvis | -0.0300 | -0.0636 | 0.0100 |  |
| extobl_r |  |  |  |  | 2 | fixo | torso | 0.0650 | 0.1100 | 0.1100 |  |


Observação importante sobre o tronco: no Gait2392 o eretor da espinha e os oblíquos são **linhas retas de 2 pontos** entre a pelve e o único segmento "torso"; não há costelas, vértebras nem escápula. Servem para a direção da linha de ação e a altura relativa, não para o contorno.

### 2.2 Rajagopal 2016 full body (MIT pelo SimTK) — perna, pelve, tronco e braços (braços sem músculos)

Sujeito: "The model's bony geometry and dimensions reflect those of a 75 kg, 170 cm tall male" (artigo, PMC5507211, RAJ2016). Soma das massas no .osim = 75.337 kg (script). Massas (kg): pelve 11.777; fêmur 9.3014; tíbia 3.7075; patela 0.0862; tálus 0.1; calcâneo 1.25; dedos 0.2166; tronco 26.8266; úmero 2.0325; ulna 0.6075; rádio 0.6075; mão 0.4575. Centro de massa do tronco (-0.03, 0.32, 0) m; do úmero (0, -0.1645, 0) m.

**Articulações (lado direito; osso-pai, posição da articulação no sistema do pai):**

| articulação | osso pai | x | y | z | observação |
|---|---|---|---|---|---|
| hip_r | pelvis | -0.056276 | -0.07849 | +0.07726 | distância entre os dois quadris = 0.15452 m; faixas: flexão -30 a +120 graus; adução -50 a +30; rotação -40 a +40 |
| walker_knee_r | femur_r | -0.00809 | -0.40796 | -0.00275 | (com rotação do quadro `-1.64157 1.44618 1.5708` rad; ponto do filho tibia_r em `-0.00809 -0.00353 -0.00148`) |
| ankle_r | tibia_r | -0.01 | -0.40 | 0 | pino com eixo inclinado |
| subtalar_r | talus_r | -0.04877 | -0.04195 | 0.00792 | |
| mtp_r | calcn_r | 0.1788 | -0.002 | 0.00108 | |
| back (lombar) | pelvis | -0.1007 | 0.0815 | 0 | origem do tronco; 3 rotações, faixa de -90 a +90 graus |
| acromial_r (ombro, glenoumeral) | torso | 0.003155 | 0.3715 | 0.17 | 3 rotações: flexão (eixo z) -90 a +90 graus, adução (eixo x) -120 a +90, rotação (eixo y) -90 a +90; o ombro é uma junta esférica fixa no tronco (sem movimento da escápula) |
| elbow_r | humerus_r | 0.013144 | -0.286273 | -0.009595 | pino; a origem do filho (ulna) fica nesse ponto; distância ombro-cotovelo = ~0.287 m (norma do vetor, cálculo meu) |
| radioulnar_r | ulna_r | -0.006727 | -0.013007 | 0.026083 | pronação/supinação |
| radius_hand_r (punho) | radius_r | -0.008797 | -0.235841 | 0.01361 | articulação universal (flexão e desvio) |

**Marcadores anatômicos** (de superfície, no .osim; úteis como pontos de referência, não são ossos; lado direito; osso = sistema de referência):

| marcador | osso | x | y | z |
|---|---|---|---|---|
| RACR (acrômio) | torso | -0.0030 | 0.4250 | 0.1300 |
| C7 | torso | -0.0850 | 0.4350 | 0.0017 |
| CLAV (incisura/clavícula-esterno) | torso | 0.0400 | 0.3800 | 0.0170 |
| RASH (ombro anterior) | torso | 0.0500 | 0.3715 | 0.1700 |
| RPSH (ombro posterior) | torso | -0.0500 | 0.3715 | 0.1700 |
| RASI (EIAS) | pelvis | 0.0095 | 0.0181 | 0.1285 |
| RPSI (EIPS) | pelvis | -0.1550 | 0.0350 | 0.0450 |
| RLEL / RMEL (epicôndilos úmero) | humerus_r | 0.0150 / 0.0022 | -0.2800 / -0.2860 | 0.0400 / -0.0460 |
| RLFC / RMFC (côndilos do fêmur) | femur_r | 0 / 0 | -0.4040 / -0.4040 | 0.0500 / -0.0500 |
| RLMAL / RMMAL (maléolos) | tibia_r | -0.0050 / 0.0060 | -0.3888 / -0.3888 | 0.0530 / -0.0380 |
| RTOE | calcn_r | 0.2050 | 0.0297 | -0.0300 |

Cálculos feitos a partir dessas tabelas (aritmética minha, não está escrito na fonte): centro do quadril em relação ao marcador RASI, no sistema da pelve do Rajagopal: (-0.056276 - 0.0095, -0.07849 - 0.0181, 0.07726 - 0.1285) = (-0.0658, -0.0966, -0.0512) m. Centro do ombro em relação ao marcador RACR: (0.003155 + 0.003, 0.3715 - 0.425, 0.17 - 0.13) = (+0.0062, -0.0535, +0.0400) m. Atenção: marcador de pele, não osso; o ponto do acrômio no sujeito real fica na pele sobre o osso.

**Trajeto dos músculos** (mesmas colunas da 2.1; nomes: glmax1/2/3, glmed1/2/3, recfem, vasmed/vasint/vaslat, bflh/bfsh, semimem, semiten, addlong, addmag Dist/Isch/Mid/Prox, gasmed/gaslat, soleus, tibant). Aqui as articulações do joelho usam o patella_r como osso intermediário dos quadríceps. O modelo não tem eretores, oblíquos nem reto abdominal.

| músculo | Fmax (N) | l_fibra_ót (m) | l_tendão (m) | penação (rad) | # | tipo ponto | osso | x | y | z | notas |
|---|---|---|---|---|---|---|---|---|---|---|---|
| addlong_r | 916.8 | 0.1082 | 0.1318 | 0.1378 | 1 | fixo | pelvis | -0.0076 | -0.0889 | 0.0189 | ; wrap: AL_at_femshaft_r |
| addlong_r |  |  |  |  | 2 | fixo | femur_r | 0.0113 | -0.2394 | 0.0158 |  |
| addmagDist_r | 597.3 | 0.1772 | 0.08738 | 0.1947 | 1 | fixo | pelvis | -0.0740 | -0.1277 | 0.0398 | ; wrap: AMdist_at_femshaft_r |
| addmagDist_r |  |  |  |  | 2 | fixo | femur_r | 0.0112 | -0.2625 | 0.0193 |  |
| addmagIsch_r | 597.3 | 0.1562 | 0.2163 | 0.168 | 1 | fixo | pelvis | -0.0896 | -0.1298 | 0.0417 | ; wrap: AMisch_at_condyles_r |
| addmagIsch_r |  |  |  |  | 2 | fixo | femur_r | 0.0048 | -0.3880 | -0.0327 |  |
| addmagMid_r | 597.3 | 0.1377 | 0.04663 | 0.2073 | 1 | fixo | pelvis | -0.0527 | -0.1207 | 0.0285 | ; wrap: AMmid_at_femshaft_r |
| addmagMid_r |  |  |  |  | 2 | fixo | femur_r | 0.0024 | -0.1624 | 0.0292 |  |
| addmagProx_r | 597.3 | 0.1056 | 0.04032 | 0.3115 | 1 | fixo | pelvis | -0.0310 | -0.1076 | 0.0137 | ; wrap: AMprox_at_femshaft_r |
| addmagProx_r |  |  |  |  | 2 | fixo | femur_r | -0.0153 | -0.0789 | 0.0320 |  |
| bflh_r | 1313 | 0.0976 | 0.3252 | 0.1759 | 1 | fixo | pelvis | -0.1040 | -0.1191 | 0.0586 |  |
| bflh_r |  |  |  |  | 2 | fixo | tibia_r | -0.0337 | -0.0350 | 0.0253 |  |
| bflh_r |  |  |  |  | 3 | fixo | tibia_r | -0.0287 | -0.0455 | 0.0303 |  |
| bfsh_r | 557.1 | 0.1103 | 0.1058 | 0.2642 | 1 | fixo | femur_r | 0.0050 | -0.2111 | 0.0234 | ; wrap: BF_at_gastroc_r |
| bfsh_r |  |  |  |  | 2 | fixo | tibia_r | -0.0301 | -0.0419 | 0.0318 |  |
| gaslat_r | 1575 | 0.0588 | 0.3761 | 0.2102 | 1 | fixo | femur_r | -0.0030 | -0.3814 | 0.0277 | ; wrap: GasLat_at_shank_r,Gastroc_at_condyles_r |
| gaslat_r |  |  |  |  | 2 | fixo | calcn_r | 0.0044 | 0.0310 | -0.0053 |  |
| gasmed_r | 3116 | 0.051 | 0.3987 | 0.1657 | 1 | fixo | femur_r | 0.0080 | -0.3788 | -0.0208 | ; wrap: GasMed_at_shank_r,Gastroc_at_condyles_r |
| gasmed_r |  |  |  |  | 2 | fixo | calcn_r | 0.0044 | 0.0310 | -0.0053 |  |
| glmax1_r | 983.8 | 0.147 | 0.04884 | 0.354 | 1 | fixo | pelvis | -0.1231 | 0.0345 | 0.0563 | ; wrap: Gmax1_at_pelvis_r |
| glmax1_r |  |  |  |  | 2 | fixo | pelvis | -0.1257 | -0.0242 | 0.0779 |  |
| glmax1_r |  |  |  |  | 3 | fixo | femur_r | -0.0444 | -0.0326 | 0.0302 |  |
| glmax1_r |  |  |  |  | 4 | fixo | femur_r | -0.0277 | -0.0566 | 0.0470 |  |
| glmax2_r | 1406 | 0.157 | 0.06789 | 0.3674 | 1 | fixo | pelvis | -0.1317 | 0.0087 | 0.0462 | ; wrap: Gmax2_at_pelvis_r |
| glmax2_r |  |  |  |  | 2 | fixo | pelvis | -0.1344 | -0.0609 | 0.0813 |  |
| glmax2_r |  |  |  |  | 3 | fixo | femur_r | -0.0450 | -0.0584 | 0.0252 |  |
| glmax2_r |  |  |  |  | 4 | fixo | femur_r | -0.0156 | -0.1016 | 0.0419 |  |
| glmax3_r | 947.8 | 0.167 | 0.06972 | 0.3824 | 1 | fixo | pelvis | -0.1300 | -0.0525 | 0.0090 | ; wrap: Gmax3_at_pelvis_r |
| glmax3_r |  |  |  |  | 2 | fixo | pelvis | -0.1273 | -0.1263 | 0.0435 |  |
| glmax3_r |  |  |  |  | 3 | fixo | femur_r | -0.0281 | -0.1125 | 0.0094 |  |
| glmax3_r |  |  |  |  | 4 | fixo | femur_r | -0.0060 | -0.1419 | 0.0411 |  |
| glmed1_r | 1093 | 0.073 | 0.05582 | 0.3166 | 1 | fixo | pelvis | -0.0445 | 0.0245 | 0.1172 |  |
| glmed1_r |  |  |  |  | 2 | fixo | femur_r | -0.0218 | -0.0117 | 0.0555 |  |
| glmed2_r | 765.1 | 0.073 | 0.06525 | 0.3166 | 1 | fixo | pelvis | -0.0850 | 0.0316 | 0.0675 |  |
| glmed2_r |  |  |  |  | 2 | fixo | femur_r | -0.0258 | -0.0058 | 0.0527 |  |
| glmed3_r | 871.2 | 0.073 | 0.04523 | 0.3166 | 1 | fixo | pelvis | -0.1152 | -0.0073 | 0.0526 |  |
| glmed3_r |  |  |  |  | 2 | fixo | femur_r | -0.0309 | -0.0047 | 0.0518 |  |
| recfem_r | 2192 | 0.0759 | 0.4485 | 0.217 | 1 | fixo | pelvis | -0.0240 | -0.0388 | 0.0933 | ; wrap: KnExt_at_fem_r |
| recfem_r |  |  |  |  | 2 | fixo | patella_r | 0.0100 | 0.0490 | 0.0007 |  |
| recfem_r |  |  |  |  | 3 | fixo | patella_r | 0.0121 | 0.0437 | -0.0010 |  |
| recfem_r |  |  |  |  | 4 | fixo | patella_r | 0.0050 | 0.0025 | 0.0000 |  |
| recfem_r |  |  |  |  | 5 | fixo | tibia_r | 0.0326 | -0.0631 | -0.0005 |  |
| semimem_r | 2201 | 0.069 | 0.3476 | 0.2546 | 1 | fixo | pelvis | -0.0987 | -0.1140 | 0.0614 | ; wrap: SM_at_condyles_r |
| semimem_r |  |  |  |  | 2 | fixo | tibia_r | -0.0290 | -0.0417 | -0.0196 |  |
| semiten_r | 591.3 | 0.193 | 0.2472 | 0.2413 | 1 | fixo | pelvis | -0.1038 | -0.1253 | 0.0515 | ; wrap: ST_at_condyles_r |
| semiten_r |  |  |  |  | 2 | fixo | tibia_r | -0.0312 | -0.0508 | -0.0229 |  |
| semiten_r |  |  |  |  | 3 | fixo | tibia_r | 0.0019 | -0.0773 | -0.0117 |  |
| soleus_r | 6195 | 0.044 | 0.2768 | 0.3814 | 1 | fixo | tibia_r | -0.0076 | -0.0916 | 0.0098 |  |
| soleus_r |  |  |  |  | 2 | fixo | calcn_r | 0.0044 | 0.0310 | -0.0053 |  |
| tibant_r | 1227 | 0.0683 | 0.2405 | 0.1952 | 1 | fixo | tibia_r | 0.0154 | -0.1312 | 0.0162 |  |
| tibant_r |  |  |  |  | 2 | fixo | tibia_r | 0.0251 | -0.1906 | 0.0128 |  |
| tibant_r |  |  |  |  | 3 | fixo | tibia_r | 0.0233 | -0.3659 | -0.0132 |  |
| tibant_r |  |  |  |  | 4 | fixo | calcn_r | 0.1166 | 0.0178 | -0.0305 |  |
| vasint_r | 1697 | 0.0993 | 0.2022 | 0.0631 | 1 | fixo | femur_r | 0.0290 | -0.1924 | 0.0310 | ; wrap: KnExt_at_fem_r |
| vasint_r |  |  |  |  | 2 | fixo | femur_r | 0.0335 | -0.2084 | 0.0285 |  |
| vasint_r |  |  |  |  | 3 | fixo | patella_r | 0.0058 | 0.0480 | -0.0006 |  |
| vasint_r |  |  |  |  | 4 | fixo | patella_r | 0.0050 | 0.0025 | -0.0004 |  |
| vasint_r |  |  |  |  | 5 | fixo | tibia_r | 0.0326 | -0.0632 | 0.0004 |  |
| vaslat_r | 5149 | 0.0994 | 0.2206 | 0.2529 | 1 | fixo | femur_r | 0.0048 | -0.1854 | 0.0349 | ; wrap: KnExt_at_fem_r |
| vaslat_r |  |  |  |  | 2 | fixo | femur_r | 0.0269 | -0.2591 | 0.0409 |  |
| vaslat_r |  |  |  |  | 3 | fixo | patella_r | 0.0103 | 0.0423 | 0.0141 |  |
| vaslat_r |  |  |  |  | 4 | fixo | patella_r | 0.0050 | 0.0025 | 0.0073 |  |
| vaslat_r |  |  |  |  | 5 | fixo | tibia_r | 0.0325 | -0.0634 | 0.0051 |  |
| vasmed_r | 2748 | 0.0968 | 0.1999 | 0.4222 | 1 | fixo | femur_r | 0.0140 | -0.2099 | 0.0188 | ; wrap: KnExt_at_fem_r |
| vasmed_r |  |  |  |  | 2 | fixo | femur_r | 0.0356 | -0.2769 | 0.0009 |  |
| vasmed_r |  |  |  |  | 3 | fixo | patella_r | 0.0063 | 0.0445 | -0.0170 |  |
| vasmed_r |  |  |  |  | 4 | fixo | patella_r | 0.0050 | 0.0025 | -0.0085 |  |
| vasmed_r |  |  |  |  | 5 | fixo | tibia_r | 0.0319 | -0.0636 | -0.0068 |  |


### 2.3 Arm26 (CC BY 3.0) — tríceps, bíceps e braquial

Modelo de 2 graus de liberdade (ombro e cotovelo) adaptado do modelo de Holzbaur (2005). Corpos: `base` (representa tronco/escápula, massa 0), `r_humerus` (1.864572 kg) e `r_ulna_radius_hand` (1.534315 kg). Sem altura do sujeito no arquivo (NÃO VERIFICADO em fonte). Atenção: o segmento `base` foi posicionado no ombro (a articulação `offset` a põe em y = 0.8 m acima do solo).

| articulação | osso pai | x | y | z |
|---|---|---|---|---|
| r_shoulder | base | -0.017545 | -0.007 | 0.17 |
| r_elbow | r_humerus | 0.0061 | -0.2904 | -0.0123 |

Marcadores: acrômio em `base` (-0.0126, 0.04, 0.17); epicôndilo em `r_humerus` (0.005, -0.2904, 0.03); estiloide do rádio em `r_ulna_radius_hand` (-0.0011, -0.2356, 0.0943). Distância ombro-cotovelo (norma do vetor do cotovelo no úmero) ~0.2907 m.

| músculo | Fmax (N) | l_fibra_ót (m) | l_tendão (m) | penação (rad) | # | tipo ponto | osso | x | y | z | notas |
|---|---|---|---|---|---|---|---|---|---|---|---|
| TRIlong | 798.5 | 0.134 | 0.143 | 0.2094 | 1 | fixo | base | -0.0537 | -0.0137 | 0.1472 | ; wrap: TRI,TRIlonghh,TRIlongglen |
| TRIlong |  |  |  |  | 2 | fixo | r_humerus | -0.0271 | -0.1144 | -0.0066 |  |
| TRIlong |  |  |  |  | 3 | fixo | r_humerus | -0.0318 | -0.2264 | -0.0122 |  |
| TRIlong |  |  |  |  | 4 | fixo | r_humerus | -0.0174 | -0.2676 | -0.0121 |  |
| TRIlong |  |  |  |  | 5 | fixo | r_ulna_radius_hand | -0.0219 | 0.0105 | -0.0008 |  |
| TRIlat | 624.3 | 0.1138 | 0.098 | 0.1571 | 1 | fixo | r_humerus | -0.0060 | -0.1265 | 0.0043 | ; wrap: TRI |
| TRIlat |  |  |  |  | 2 | fixo | r_humerus | -0.0234 | -0.1453 | 0.0093 |  |
| TRIlat |  |  |  |  | 3 | fixo | r_humerus | -0.0318 | -0.2264 | -0.0122 |  |
| TRIlat |  |  |  |  | 4 | fixo | r_humerus | -0.0174 | -0.2676 | -0.0121 |  |
| TRIlat |  |  |  |  | 5 | fixo | r_ulna_radius_hand | -0.0219 | 0.0105 | -0.0008 |  |
| TRImed | 624.3 | 0.1138 | 0.0908 | 0.1571 | 1 | fixo | r_humerus | -0.0084 | -0.1369 | -0.0091 | ; wrap: TRI |
| TRImed |  |  |  |  | 2 | fixo | r_humerus | -0.0260 | -0.1514 | -0.0108 |  |
| TRImed |  |  |  |  | 3 | fixo | r_humerus | -0.0318 | -0.2264 | -0.0122 |  |
| TRImed |  |  |  |  | 4 | fixo | r_humerus | -0.0174 | -0.2676 | -0.0121 |  |
| TRImed |  |  |  |  | 5 | fixo | r_ulna_radius_hand | -0.0219 | 0.0105 | -0.0008 |  |
| BIClong | 624.3 | 0.1157 | 0.2723 | 0 | 1 | fixo | base | -0.0392 | 0.0035 | 0.1479 | ; wrap: BIClonghh |
| BIClong |  |  |  |  | 2 | fixo | base | -0.0289 | 0.0139 | 0.1564 |  |
| BIClong |  |  |  |  | 3 | fixo | r_humerus | 0.0213 | 0.0179 | 0.0103 |  |
| BIClong |  |  |  |  | 4 | fixo | r_humerus | 0.0238 | -0.0051 | 0.0120 |  |
| BIClong |  |  |  |  | 5 | fixo | r_humerus | 0.0135 | -0.0283 | 0.0014 |  |
| BIClong |  |  |  |  | 6 | fixo | r_humerus | 0.0107 | -0.0774 | -0.0016 |  |
| BIClong |  |  |  |  | 7 | fixo | r_humerus | 0.0170 | -0.1212 | 0.0002 |  |
| BIClong |  |  |  |  | 8 | fixo | r_humerus | 0.0228 | -0.1754 | -0.0063 |  |
| BIClong |  |  |  |  | 9 | fixo | r_ulna_radius_hand | 0.0075 | -0.0484 | 0.0218 |  |
| BICshort | 435.6 | 0.1321 | 0.1923 | 0 | 1 | fixo | base | 0.0047 | -0.0123 | 0.1348 |  |
| BICshort |  |  |  |  | 2 | fixo | base | -0.0071 | -0.0400 | 0.1451 |  |
| BICshort |  |  |  |  | 3 | fixo | r_humerus | 0.0112 | -0.0758 | -0.0110 |  |
| BICshort |  |  |  |  | 4 | fixo | r_humerus | 0.0170 | -0.1212 | -0.0108 |  |
| BICshort |  |  |  |  | 5 | fixo | r_humerus | 0.0228 | -0.1754 | -0.0063 |  |
| BICshort |  |  |  |  | 6 | fixo | r_ulna_radius_hand | 0.0075 | -0.0484 | 0.0218 |  |
| BRA | 987.3 | 0.0858 | 0.0535 | 0 | 1 | fixo | r_humerus | 0.0068 | -0.1739 | -0.0036 | ; wrap: TRI |
| BRA |  |  |  |  | 2 | fixo | r_ulna_radius_hand | -0.0032 | -0.0239 | 0.0009 |  |


Leitura da tabela: tríceps longo nasce em `base` (escápula, no modelo) e as três cabeças convergem para o olécrano (ponto 5 no antebraço, x = -0.0219, y = 0.0105). Bíceps: duas cabeças em `base`, inserção no rádio (tuberosidade) em (0.0075, -0.0484, 0.0218). Braquial: do úmero distal ao antebraço (ulna). Os parâmetros de arquitetura (penação 0.2094 rad = 12 graus no tríceps longo; 0.1571 rad = 9 graus nas cabeças lateral e medial; 0 no bíceps e no braquial) vêm do arquivo; são valores do modelo, não medidas minhas.


## Parte 3 — Ossos e medidas internas

Todos os valores abaixo foram lidos na fonte nesta sessão. "H" = homem, "M" = mulher.

### 3.1 Coluna vertebral, curvas e cifose/lordose

| medida | valor | fonte | onde na fonte |
|---|---|---|---|
| Comprimento médio da coluna no homem | ~71 cm | GRAY1918 | seção "The Vertebral Column as a Whole", p. 114 (texto OCR): "its average length in the male is about 71 cm" |
| Parte cervical | 12,5 cm | GRAY1918 | mesma frase: "the cervical part measures 12.5 cm." |
| Parte torácica | ~28 cm | GRAY1918 | "the thoracic about 28 cm." |
| Parte lombar | 18 cm | GRAY1918 | "the lumbar 18 cm." |
| Sacro + cóccix | 12,5 cm | GRAY1918 | "the sacrum and coccyx 12.5 cm." (OCR: "qoqqxx"); soma 12,5+28+18+12,5 = 71 |
| Coluna feminina | ~61 cm | GRAY1918 | "The female column is about 61 cm. in length." |
| Parcela dos discos intervertebrais | ~1/4 do comprimento (sem as duas primeiras vértebras); proporcionalmente maior nas partes cervical e lombar que na torácica | GRAY1918 | p. 289, parágrafo sobre as fibrocartilagens intervertebrais |
| Número de vértebras | 7 cervicais, 12 torácicas, 5 lombares, 5 sacrais (fundidas), 4 coccígeas | GRAY1918 | início do capítulo "The Vertebral Column" (texto de abertura) |
| Extensão das curvas | cervical: do ápice do dente do áxis ao meio de T2 (convexa à frente); torácica: do meio de T2 ao meio de T12 (côncava à frente), ponto mais saliente atrás = espinhoso de T7; lombar: do meio de T12 ao ângulo sacrovertebral, mais marcada na mulher; pélvica: do sacro ao cóccix | GRAY1918 | "Curves", p. 114 |
| Cifose torácica "normal" em pé (graus) | 20 a 40 graus é o intervalo tradicional (citado a Roaf 1960, introduzido "sem evidência de apoio"); a Scoliosis Research Society sugere 20 a 60. Os dados agrupados por Cobb mostram médias que crescem com a idade: T5-T12 ~26 (<40 anos), ~30 (40-60), ~33 (>60); T4-T12 ~34, ~40, ~48; T1-T12 ~39 a 44 nas faixas somadas. 65% dos indivíduos tinham mais de 40 graus. Erro de medida do Cobb: 3 graus | ZAPPALA2021 | Introdução (intervalo e SRS); Tabela 4 e Resultados (médias por nível e idade; valores aproximados, lidos pelo extrator de página e não conferidos célula a célula); "Cobb standard error 3 graus" na seção de método |
| Lordose cervical C2-C7 em pé (graus) | Cobb C2-C7: 12,71 [IC 95% 6,59 a 18,84] (1046 indivíduos); tangente posterior: 18,55 [14,48 a 22,63] (2551); conjunto: 16,43 [12,69 a 20,17] (11 estudos, 3597 indivíduos). Entre 64% e 68% tinham curvatura lordótica | GUO2018 | Resultados e Conclusão. Divergência interna: o texto dá 63,99% nos Resultados e "aproximadamente 68%" na Conclusão |

### 3.2 Pelve, quadril e ombro

| medida | valor | fonte | onde na fonte |
|---|---|---|---|
| Distância entre os dois centros do quadril, Gait2392 (H, 1,8 m, 75,16 kg) | 2 x 83,5 = 167,0 mm | OSIM-G2392 | `hip_r`/`hip_l`, quadro do pelve, z = +-0,0835 m |
| Idem, Rajagopal (H, 1,70 m, 75 kg) | 2 x 77,26 = 154,5 mm | OSIM-RAJ | `hip_r`/`hip_l`, z = +-0,07726 m |
| Centro do quadril em relação ao ponto médio das EIAS, Gait2392 | (x, y, z) = (-70,7; -66,1; +83,5) mm; x para trás é negativo, y para baixo é negativo, z para o lado direito | OSIM-G2392 (+ OSIMWIKI-G2392 para a definição "pelvic frame at the midpoint of the line connecting the two anterior superior iliac spines") | hip_r, frame pelvis_offset |
| Centro do quadril em relação ao marcador da EIAS, Rajagopal | (-65,8; -96,6; -51,2) mm (cálculo meu: hip menos marcador RASI no mesmo frame). Cuidado: marcador de pele, origem de pelve diferente da de Gait2392 | OSIM-RAJ | hip_r e marcador RASI (0,0095; 0,0181; 0,1285) m |
| Regressão de Bell (segunda fonte, origem no ponto médio das EIAS, PW = distância entre as EIAS) | lateral = 0,36 x PW; ântero-posterior = -0,19 x PW (PYCGM2) ou 22% atrás da EIAS (SINCLAIR2013); súpero-inferior = -0,19 x PW (PYCGM2, ver divergência) ou 30% abaixo (SINCLAIR2013: "14% medial, 22% posterior and 30% distal from the ipsilateral ASIS"). Pelo valor lateral, a distância entre os dois centros é 0,72 x PW; com 167 mm do Gait2392 isso dá PW ~232 mm (cálculo meu), compatível com a largura de pelve de 228,8 mm da tabela 1 de FIORENTINO2015 | PYCGM2; SINCLAIR2013; FIORENTINO2015 (origem e PW) | PYCGM2: função `bellRegression`; SINCLAIR2013: seção "Material and methods"; FIORENTINO2015: "pelvis anatomical origin, defined at the midway point between the left and right ASIS markers", Tabela 1. Artigo original de Bell NÃO VERIFICADO |
| Regressão de Harrington (eixos: x à frente, y para cima, z para a direita; mm; PW = distância entre as EIAS, PD = profundidade da pelve, LL = comprimento da perna; origem no centro da pelve) | modelo completo: AP = -0,24 PD - 9,9; vertical = -0,16 PW - 0,04 LL - 7,1; ML = +-(0,28 PD + 0,16 PW + 7,9). Só PW: AP = -0,138 PW - 10,4; vertical = -0,305 PW - 10,9; ML = +-(0,33 PW + 7,3). Só LL: AP = -0,041 LL - 6,3; vertical = -0,083 LL - 7,9; ML = +-(0,0874 LL + 5,4). O código subtrai ainda metade do diâmetro do marcador e a espessura da base nos termos AP (ajuste do pyCGM2 para marcadores, não faz parte da regressão original). Erros máximos no artigo: 31 mm (adultos), 26 mm (crianças), 31 mm (paralisia cerebral) | PYCGM2 (coeficientes; a variante PW-only e LL-only vem da modificação de Sangeux 2015, citada no código); HARRINGTON2007 (resumo, via busca) | PYCGM2: `harringtonRegression`. A ordem dos eixos do artigo original NÃO foi conferida; a inferência acima vem da matriz de rotação do código |
| Regressão de Leardini 1999 | NÃO VERIFICADO | -- | -- |
| Centro do ombro em relação ao acrômio, regressão de Meskers 1998 | NÃO VERIFICADO (artigo não abriu) | MESKERS1998 | -- |
| Centro do ombro em relação ao acrômio, método de Rab 2002 | NÃO VERIFICADO (só sei que é um deslocamento constante a partir do marcador do acrômio) | RAB2002 | -- |
| Centro do ombro menos marcador do acrômio, Rajagopal (no frame do tronco) | (+6,2; -53,5; +40,0) mm (cálculo meu: ombro menos marcador RACR). Marcador de pele, não osso | OSIM-RAJ | `acromial_r` (0,003155; 0,3715; 0,17) m e RACR (-0,003; 0,425; 0,13) m |
| Centro do ombro menos marcador do acrômio, Arm26 | (-5,0; -47,0; 0,0) mm (cálculo meu); o acrômio fica ~47 mm acima e ~5 mm à frente do centro da articulação | OSIM-ARM26 | `r_shoulder` (-0,017545; -0,007; 0,17) m e marcador `r_acromion` (-0,0126; 0,04; 0,17) m |
| Posição do ombro e da coluna em relação à pelve (Rajagopal/Gait2392) | articulação lombar a (-0,1007; 0,0815; 0) m da origem da pelve; ombro a (0,0032; 0,3715; +-0,17) m da origem do tronco. Logo, do centro do quadril (y = -0,0785) ao ombro: 0,0785 + 0,0815 + 0,3715 = 0,5315 m na vertical (soma minha) | OSIM-RAJ | `back` e `acromial_r` |

### 3.3 Segmentos do corpo, de Leva 1996

Lido nos arquivos de dados do repositório BMClab/BMC (cópia secundária das tabelas de de Leva ajustadas a partir de Zatsiorsky-Seluyanov), licença CC BY 4.0 do repositório. Convenção segundo o caderno do mesmo repositório: massa = fração da massa corporal; CM = posição do centro de massa como fração do comprimento do segmento, **medida a partir da extremidade proximal** (r = r_p + CM x (r_d - r_p)); Rg = raio de giração como fração do comprimento do segmento. Siglas dos pontos (arquivo BSPlandmarks): VERT = vértice, MIDG = ponto médio dos dois gônios, SUPR = incisura jugular, XYPH = xifóide, OMPH = umbigo, MIDH = ponto médio dos dois centros do quadril, MIDS = ponto médio dos dois centros do ombro, CERV = ponta do espinhoso de C7, SJC/EJC/WJC = centros do ombro/cotovelo/punho, MET3 = metacarpo do 3o dedo (ponto distal palpável, dorso da mão), DAC3 = ponta do 3o dedo, STYL = estiloide do rádio, HJC/KJC/AJC = centros do quadril/joelho/tornozelo, HEEL = ponto posterior do calcanhar, TTIP = ponta do dedo mais longo, LMAL = maléolo lateral, SPHY = esfírio da tíbia. A tabela original foi feita com 100 homens e 15 mulheres jovens (descrição no caderno de Duarte, citando Zatsiorsky 2002).

| segmento | extremos (proximal-distal) | massa H | massa M | CM H | CM M | Rg sag/trans/long H | Rg sag/trans/long M |
|---|---|---|---|---|---|---|---|
| Head | VERT-MIDG | 0.0694 | 0.0668 | 0.5976 | 0.5894 | 0.362/0.376/0.312 | 0.33/0.359/0.318 |
| Trunk | SUPR-MIDH | 0.4346 | 0.4257 | 0.4486 | 0.4151 | 0.372/0.347/0.191 | 0.357/0.339/0.171 |
| Upper trunk | SUPR-XYPH | 0.1596 | 0.1545 | 0.2999 | 0.2077 | 0.716/0.454/0.659 | 0.746/0.502/0.718 |
| Middle trunk | XYPH-OMPH | 0.1633 | 0.1465 | 0.4502 | 0.4512 | 0.482/0.383/0.468 | 0.433/0.354/0.415 |
| Lower trunk | OMPH-MIDH | 0.1117 | 0.1247 | 0.6115 | 0.492 | 0.615/0.551/0.587 | 0.433/0.402/0.444 |
| Upper arm | SJC-EJC | 0.0271 | 0.0255 | 0.5772 | 0.5754 | 0.285/0.269/0.158 | 0.278/0.26/0.148 |
| Forearm | EJC-WJC | 0.0162 | 0.0138 | 0.4574 | 0.4559 | 0.276/0.265/0.121 | 0.261/0.257/0.094 |
| Hand | WJC-MET3 | 0.0061 | 0.0056 | 0.79 | 0.7474 | 0.628/0.513/0.401 | 0.531/0.454/0.335 |
| Thigh | HJC-KJC | 0.1416 | 0.1478 | 0.4095 | 0.3612 | 0.329/0.329/0.149 | 0.369/0.364/0.162 |
| Shank | KJC-AJC | 0.0433 | 0.0481 | 0.4395 | 0.4352 | 0.251/0.246/0.102 | 0.267/0.263/0.092 |
| Foot | HEEL-TTIP | 0.0137 | 0.0129 | 0.4415 | 0.4014 | 0.257/0.245/0.124 | 0.299/0.279/0.139 |
| Head 2 | VERT-CERV | 0.0694 | 0.0668 | 0.5002 | 0.4841 | 0.303/0.315/0.261 | 0.271/0.295/0.261 |
| Trunk 2 | CERV-MIDH | 0.4346 | 0.4257 | 0.5138 | 0.4964 | 0.328/0.306/0.169 | 0.307/0.292/0.147 |
| Trunk 3 | MIDS-MIDH | 0.4346 | 0.4257 | 0.431 | 0.3782 | 0.384/0.358/0.197 | 0.379/0.361/0.182 |
| Upper trunk 2 | CERV-XYPH | 0.1596 | 0.1545 | 0.5066 | 0.505 | 0.505/0.32/0.465 | 0.466/0.314/0.449 |
| Forearm 2 | EJC-STYL | 0.0162 | 0.0138 | 0.4608 | 0.4592 | 0.278/0.267/0.122 | 0.263/0.259/0.095 |
| Hand 2 | WJC-DAC3 | 0.0061 | 0.0056 | 0.3624 | 0.3427 | 0.288/0.235/0.184 | 0.244/0.208/0.154 |
| Hand 3 | STYL-DAC3 | 0.0061 | 0.0056 | 0.3691 | 0.3502 | 0.285/0.233/0.182 | 0.241/0.206/0.152 |
| Hand 4 | STYL-MET3 | 0.0061 | 0.0056 | 0.7948 | 0.7534 | 0.614/0.502/0.392 | 0.519/0.443/0.327 |
| Shank 2 | KJC-LMAL | 0.0433 | 0.0481 | 0.4459 | 0.4416 | 0.255/0.249/0.103 | 0.271/0.267/0.093 |
| Shank 3 | KJC-SPHY | 0.0433 | 0.0481 | 0.4524 | 0.4481 | 0.258/0.253/0.105 | 0.275/0.271/0.094 |

Onde na fonte: arquivos `BSPmale_ZdeLeva.txt` e `BSPfemale_ZdeLeva.txt` (colunas Segment, Endpoints, Mass, CM Long, Rg Sag, Rg Trans, Rg Long). O original (J Biomech 29:1223-1230) não abriu nesta sessão.

### 3.4 Mão

| medida | valor | fonte | onde na fonte |
|---|---|---|---|
| Comprimento axial dos metacarpos 1 a 5, adultos mexicanos (n=400; 215 homens, 185 mulheres), radiografia AP | 1o: 48,17 (DP 4,46) / 47,76; 2o: 69,42 (5,87) / 69,40; 3o: 68,06 (5,87) / 68,04; 4o: 60,98 (5,71) / 61,05; 5o: 54,01 (4,55) / 53,94 mm (os dois números por osso = as duas linhas F e M da tabela; a tabela e o texto trocam F e M, então não atribuo por sexo; a diferença entre os sexos é <0,5 mm) | OSNAYA2025 | Tabelas 2 a 6 |
| Razões entre metacarpos (cálculo meu a partir da linha acima) | 1o/3o ~0,71; 2o/3o ~1,02; 4o/3o ~0,90; 5o/3o ~0,79 | OSNAYA2025 | derivado |
| Referência cruzada (CT, 40 adultos, só leitura por ser CC BY-NC) | índice 67,7; médio 66,1; anular 58,0; mínimo 52,3 mm (sem polegar) | BEREDJIKIAN2025 | resultados |
| Comprimento da mão (ponta do médio à prega do punho) | 193,7 mm de média, n=7, DP 4,03; amostra pequena demais para proporção | WELCOME2014 | Tabela 1 |
| Comprimento das falanges em relação ao comprimento da mão | NÃO VERIFICADO (Buryanov e Kotiuk 2010 não abriu; SINGH2026 só testa proporções áureas, sem mm) | -- | -- |
| Comprimento do polegar (falanges proximal e distal) | NÃO VERIFICADO (um resultado de busca citava 29,5 e 20,4 mm para as falanges do polegar numa amostra esquelética de n=80, mas não abri o artigo) | -- | -- |
| Proporção da mão (NASA, Alexander e Viktor) | NÃO VERIFICADO (não consultados); as proporções de mão já medidas pelo ANSUR II que você tem servem de referência | -- | -- |

### 3.5 Escápula, clavícula e esterno

| medida | valor | fonte | onde na fonte |
|---|---|---|---|
| Comprimento médio da clavícula | 142,5 +- 12,2 mm (n=64 clavículas); H 149,67 +- 9,6; M 135,46 +- 10,3 (população do sul da Índia, TC) | PATTED2020 | Resultados e Tabela 2 |
| Altura e largura da escápula (população japonesa, idosos de artroplastia, CT; grupos por sexo e estatura) | altura: F 132,0 +- 8,5 a 146,0 +- 9,7 mm; H 146,0 +- 7,4 a 165,0 +- 7,0 mm. Largura: F 90,1 +- 4,1 a 99,6 +- 5,2; H 97,7 +- 5,8 a 110,0 +- 4,1 mm. Definição dos pontos de medida: NÃO lida | IIO2026 | Tabela V; só leitura (CC BY-NC-ND), idade média 76 anos, estatura em 3 faixas |
| Escápula e clavícula em Gray 1918 | Gray não dá comprimento médio nem altura/largura. Descreve a escápula como "flat, triangular bone" com 3 bordas e 3 ângulos; clavícula "curved somewhat like the italic letter f", quase horizontal, logo acima da 1a costela | GRAY1918 | escápula: p. 202-203; clavícula: abertura da seção "The Clavicle" |
| Comprimento do esterno | ~17 cm no adulto, maior no homem | GRAY1918 | seção "The Sternum", p. 120 |

### 3.6 Níveis vertebrais e costais (Gray 1918, capítulo de anatomia de superfície)

| medida | valor | fonte | onde na fonte |
|---|---|---|---|
| Raiz da espinha da escápula | na altura da ponta do processo espinhoso de T3 | GRAY1918 | "Surface Anatomy and Surface Markings", p. 1306 (trecho sobre o dorso) |
| Ângulo inferior da escápula | na altura da ponta do espinhoso de T7; apoia-se contra a 7a costela; o ângulo medial se apoia na 2a costela | GRAY1918 | p. 1306; p. 1332 (marcadores do membro superior) |
| Linha horizontal pelo ângulo inferior (braços ao lado) | corta o esterno entre a 4a e a 5a costela, a 5a costela na linha do mamilo e a 9a costela junto à coluna (citação de Treves) | GRAY1918 | p. 1308-1309 |
| Ponto mais alto da crista ilíaca | na altura do espinhoso de L4; o plano transtubercular corta o corpo de L5 | GRAY1918 | p. 1306 e seção "Lower Extremity. Bony Landmarks" (página não anotada) |
| EIAS e EIPS | EIAS na altura do promontório sacral; EIPS na altura do espinhoso de S2 | GRAY1918 | seção "Lower Extremity. Bony Landmarks" (EIAS); p. 1306 (EIPS) |
| Incisura jugular do esterno | no mesmo plano horizontal que a borda inferior do corpo de T2 | GRAY1918 | p. 1308 |
| Ângulo do esterno | na altura de T5 (palavras de Gray); corresponde à 2a cartilagem costal | GRAY1918 | p. 1308 |
| Junção corpo-processo xifoide | na fibrocartilagem entre T9 e T10 | GRAY1918 | p. 1308 |
| Pico da cifose torácica | espinhoso de T7 é o ponto mais saliente atrás | GRAY1918 | p. 114 |
| Triângulo de ausculta | limitado pelo trapézio, grande dorsal e borda vertebral da escápula; o assoalho é o romboide maior | GRAY1918 | p. 434 |

Nota: Gray fala em "dorsal vertebrae" em alguns trechos de 1918; mantive T1-T12 como no texto "thoracic". Os níveis de Gray são com a pessoa em pé e braços ao lado, em livro de 1918; não foram comparados com o atlas moderno.

## O que não consegui conferir

- Bartleby (Gray 1918), AnatomyTOOL: não abriram (403 e 503). Wikisource: a API devolveu limite de requisições. Usei o texto do Internet Archive.
- Nenhuma imagem da Wikimedia Commons foi consultada: não há licença por imagem a registrar.
- OpenStax 11.5 e 11.6: o HTML estático traz só parte das tabelas (sem as de úmero, antebraço e coxa/perna). Só usei a tabela do cíngulo peitoral como conferência (serrátil, trapézio, romboides).
- MoBL-ARMS e o modelo escapulotorácico: os .osim não foram baixados (licença não comercial). Logo não há coordenadas de peitoral maior, deltoide, grande dorsal, redondo maior, trapézio, romboides, serrátil anterior ou infraespinal.
- Rajagopal2016: o modelo não tem músculos do tronco superior nem dos braços ("17 torque actuators").
- Pontos de trajeto "móveis" (quadríceps no Gait2392) dependem do ângulo do joelho; dei o valor com o joelho a 0 grau. A função completa está nas splines do arquivo.
- Meskers 1998, Rab 2002, Leardini 1999 e o artigo original de Bell 1990: NÃO VERIFICADO.
- de Leva 1996 (artigo original): não abriu (erro de certificado TLS no servidor ebm.ufabc.edu.br, não desativei a verificação; WebFetch 503; wiki.has-motion.com 403). Usei cópia secundária.
- Buryanov e Kotiuk 2010: Cloudflare bloqueou (não contornei). Falanges, polegar e razões da mão: NÃO VERIFICADO.
- Dados de mudança de forma ao contrair: só tenho medidas para o tibial anterior (Raiteri 2016) e o gastrocnêmio medial (Dick e Wakeling 2017). Para bíceps, quadríceps etc. não li valores (Hodges 2003 não abriu; os resultados de busca de quadríceps não traziam a variação de espessura de repouso para contração). A regra de volume constante vem de AZIZI2008 e RAITERI2016; esta última afirma "muscle volume remained relatively constant" (variação de segmentação de 1 a 5%).
- Valores da Tabela 4 de ZAPPALA2021 (médias por nível): lidos por extração de página, não conferidos célula a célula.
- Licença de DICK2017, PATTED2020, WELCOME2014, FIORENTINO2015 não declarada na página; tratei como só leitura.
- Forma (leque, fuso, faixa, penado) só onde Gray usa a palavra ou onde marquei "classificação minha". Camada (quem passa por cima de quem) só onde Gray diz; o resto está marcado.
- Altura do sujeito no Arm26: NÃO VERIFICADO.
- Z-Anatomy e BodyParts3D: licença só pelo resultado de busca (verificado-busca); não abri o README oficial.

## Divergências

1. **Licença do OpenStax**: o pedido supôs CC BY 4.0; o rodapé de cada página de 2026 diz CC BY-NC-SA 4.0. Tratado como só leitura.
2. **MoBL-ARMS**: a tabela de modelos do wiki do OpenSim lista "MIT" (jul/2014); a página atual do SimTK diz "solely for non-commercial purposes" sob BSD 3-Clause. Valeu a mais restritiva: não serve.
3. **Rajagopal2016.osim**: sem licença no arquivo e no README do repositório opensim-models; MIT só aparece na página do SimTK. O artigo no PMC tem copyright do IEEE (vale para o texto).
4. **Coeficientes de Bell**: lateral 0,36 x PW coincide (14% medial a partir da EIAS), mas o ântero-posterior é -0,19 x PW no código do pyCGM2 e 22% atrás no texto de Sinclair e Bottoms; o súpero-inferior é -0,19 x PW no pyCGM2 e 30% abaixo em Sinclair e Bottoms (um resumo de busca do wiki da Visual3D também falava em -0,3, não aberto por mim). Valores originais de Bell NÃO VERIFICADO.
5. **Origem da pelve**: Gait2392 usa o ponto médio das EIAS; o Rajagopal usa outra origem (o quadril fica em x = -0,0563 contra -0,0707), então as duas tabelas de quadril não se comparam diretamente.
6. **Massa do tronco**: 34,24 kg no Gait2392 (inclui cabeça e braços) e 26,83 kg no Rajagopal (os braços são segmentos à parte). Alturas: 1,80 m (Gait2392) e 1,70 m (Rajagopal).
7. **Cervical**: Cobb C2-C7 (12,7 graus) e tangente posterior (18,6 graus) diferem em ~6 graus no mesmo trabalho (GUO2018); o texto de GUO2018 também traz 63,99% e 68% de lordose para a mesma pergunta.
8. **Metacarpos mexicanos**: as tabelas de OSNAYA2025 trocam as linhas F e M em relação ao texto.
9. **Cifose "normal"**: o intervalo 20 a 40 graus é citado a Roaf 1960 sem evidência segundo ZAPPALA2021, que também cita 20 a 60 (SRS) e médias de Cobb acima de 40 para T1-T12.
10. **Gray vs. atlas moderno**: Gray coloca o ângulo do esterno em T5, o ângulo inferior da escápula em T7 e a raiz da espinha em T3 (padrão de 1918, em pé, braços ao lado). Não conferi contra fonte moderna.
11. **Nome do modelo do ombro**: o SimTK chama a licença do modelo escapulotorácico de "Creative Commons ANC Use Agreement", mas o texto é Attribution-NonCommercial.
