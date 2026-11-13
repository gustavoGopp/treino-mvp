# Proporções do corpo para a figura articulada: medidas lidas em fontes públicas

Data de acesso de todas as fontes: 12/11/2026. Unidades em cm, salvo indicação. Nenhum número foi escrito de memória: os valores abaixo foram lidos nos arquivos ou páginas indicados nesta sessão, ou calculados por script a partir dos CSV. Onde não deu para conferir, está marcado NÃO VERIFICADO.

Convenção das tabelas ANSUR II: "média (P5–P95)", calculadas por mim com Python sobre os CSV (percentis por interpolação linear). Amostra: 4.082 homens e 1.986 mulheres, militares dos EUA, 2012. A própria página do ANSUR avisa que a amostra não representa a população civil dos EUA. Os CSV estão em mm; converti para cm.

## Fontes

| chave | citação | URL | tipo | status de leitura | licença / observação |
|---|---|---|---|---|---|
| ANSUR2 | Gordon CC et al. 2012 (dados publicados em 2017). ANSUR II, arquivos `ANSUR_II_MALE_Public.csv` e `ANSUR_II_FEMALE_Public.csv` | https://tools.openlab.psu.edu/publicData/ANSUR_II_MALE_Public.csv e https://tools.openlab.psu.edu/publicData/ANSUR_II_FEMALE_Public.csv (descrição em https://www.openlab.psu.edu/ansur2/) | levantamento militar, base de dados | texto-completo (baixei os dois CSV e calculei) | A página do openlab diz "publicly available data files"; não achei a palavra "licença" nem "domínio público" na página. Obra do governo dos EUA, mas a licença exata NÃO VERIFICADA. Os valores ficaram só neste arquivo, nada foi copiado para o código |
| ANSUR2-REL | Gordon CC et al. 2015. 2012 Anthropometric Survey of U.S. Army Personnel: Methods and Summary Statistics. NATICK/TR-15/007 | citado na página https://www.openlab.psu.edu/ansur2/ | relatório técnico | verificado-busca (só a referência; o PDF não foi lido) | os números deste arquivo vêm do CSV, não do relatório |
| ASB1 | NASA Reference Publication 1024. Anthropometric Source Book, Vol. I: Anthropometry for Designers. Webb Associates, 1978 | https://ntrs.nasa.gov/api/citations/19790003563/downloads/19790003563.pdf (606 páginas, OCR com ruído) | levantamento NASA, livro de referência | texto-completo nas tabelas citadas (li as tabelas por OCR; não li o livro inteiro) | domínio público (publicação do governo dos EUA; a licença não aparece no PDF, é inferência) |
| DC-CNB | Almeida HA, Ascenso RMT, Oliveira ESG, Ferreira LCR, Spahiu T. Validation of the Drillis & Contini correlation model in current anthropometric data. 11º Congresso Nacional de Biomecânica, Sesimbra, 2025 (2 páginas) | https://cnb2025.tecnico.ulisboa.pt/prog_cnb2025_web/abstracts_cnb225/ID_387_794_Resumo%20CNB2025%20-%20Drillis%20%20Contini_Final.pdf | resumo de congresso (fonte SECUNDÁRIA, reproduz a figura de Drillis & Contini) | texto-completo (li a figura 1 como imagem) | direitos do artigo; só transcrevi números |
| DC1966 | Drillis R, Contini R. Body segment parameters. Report 1163-03 (outras fontes citam 1166-03), New York University, 1966 | só citado via DC-CNB e ASB1 (lista de referências) | relatório técnico | NÃO VERIFICADO (original não localizado) | |
| Winter | Winter DA. Biomechanics and Motor Control of Human Movement (livro-texto) | busca web não achou a tabela em página pública | livro-texto | NÃO VERIFICADO (não abri) | |
| Dempster55 | Dempster WT. Space requirements of the seated operator. WADC TR 55-159, 1955 | só via ASB1 (cita definições de centros articulares) | relatório | NÃO VERIFICADO no original; trechos lidos em ASB1 | |
| deLeva96 | de Leva P. Adjustments to Zatsiorsky-Seluyanov's segment inertia parameters. J Biomech 29(9):1223-1230, 1996. DOI 10.1016/0021-9290(95)00178-6 | https://ebm.ufabc.edu.br/wp-content/uploads/2013/12/Leva-1996.pdf (não abriu: erro de certificado TLS no curl; HTTP 503 no WebFetch) | artigo | resumo (via Europe PMC) | |
| IBGE-POF | IBGE. Pesquisa de Orçamentos Familiares 2008-2009: Antropometria e estado nutricional de crianças, adolescentes e adultos no Brasil. Rio de Janeiro, 2010 | https://biblioteca.ibge.gov.br/visualizacao/livros/liv45419.pdf | pesquisa oficial | texto-completo da Tabela 1.1 (Brasil) | publicação oficial do IBGE; licença NÃO VERIFICADA |
| Harrington07 | Harrington ME, Zavatsky AB, Lawson SE, Yuan Z, Theologis TN. Prediction of the hip joint centre in adults, children, and patients with cerebral palsy based on MRI. J Biomech 40(3):595-602, 2007. DOI 10.1016/j.jbiomech.2006.02.003 | resumo via Europe PMC (https://www.ebi.ac.uk/europepmc/webservices/rest/search) | artigo | resumo | texto completo não obtido (core.ac.uk devolveu 403) |
| Vialle05 | Vialle R, Levassor N, Rillardon L, Templier A, Skalli W, Guigui P. Radiographic analysis of the sagittal alignment and balance of the spine in asymptomatic subjects. J Bone Joint Surg Am 87(2), 2005. DOI 10.2106/jbjs.d.02043 | resumo via Europe PMC | artigo | resumo | 300 voluntários assintomáticos, em pé |
| Wu02 | Wu G et al. ISB recommendation on definitions of joint coordinate system... part I: ankle, hip, and spine. J Biomech 2002. DOI 10.1016/s0021-9290(01)00222-6 | Europe PMC | norma/recomendação | resumo | o resumo não traz definições de centros articulares |
| Wu05 | Wu G et al. ISB recommendation... part II: shoulder, elbow, wrist and hand. J Biomech 2005. DOI 10.1016/j.jbiomech.2004.05.042 | Europe PMC | norma/recomendação | resumo | idem |
| PNS-guia | Fiocruz/PNS. Guia para a realização do exame de antropometria 2019 | https://www.pns.icict.fiocruz.br/wp-content/uploads/2021/03/Guia-para-a-realizacao-do-exame-de-antropometria-2019.pdf | guia | baixado; não li as tabelas (só os resultados de busca) | |

Páginas que não abriram ou foram bloqueadas: PMC (CAPTCHA, não contornei), wiki.has-motion.com (403), core.ac.uk (403), redalyc (403), agenciadenoticias.ibge.gov.br (403), openlab.psu.edu/2018/02/05/proportionality-constants (404), ebm.ufabc.edu.br (TLS/503). NASA-STD-3000 vol. 1 seção 3 e CAESAR: não localizei PDF público.

## A. Comprimentos dos segmentos como fração da estatura (H)

Atenção: a figura de DC-CNB tem rótulos numéricos legíveis, mas a atribuição de cada número a uma medida (por exemplo, o que é 0,936H e 0,870H) vem da geometria do desenho e da comparação com o ANSUR. Marquei como "inferido". Os valores em si foram lidos na imagem.

| medida | homem | mulher | unidade | fonte | onde na fonte | observação |
|---|---|---|---|---|---|---|
| Altura do topo da cabeça | 1,000 | 1,000 | H | DC-CNB | fig. 1 | por definição |
| Altura 0,936H (inferido: olhos) | 0,936 | (sem separação por sexo) | H | DC-CNB | fig. 1, cota esquerda | inferido; ANSUR não mede altura dos olhos em pé; comparar altura sentada dos olhos abaixo |
| Altura 0,870H (inferido: queixo/cervical) | 0,870 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR cervicale/estatura = 0,864 (H) e 0,857 (M) |
| Altura do ombro | 0,818 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR acromial/estatura = 0,820 e 0,820: confere |
| Altura 0,630H (inferido: cotovelo) | 0,630 | (sem separação) | H | DC-CNB | fig. 1 | inferido, NÃO VERIFICADO |
| Altura 0,485H (inferido: punho) | 0,485 | (sem separação) | H | DC-CNB | fig. 1 | inferido, NÃO VERIFICADO |
| Altura 0,377H (inferido: ponta dos dedos/articulação dos dedos) | 0,377 | (sem separação) | H | DC-CNB | fig. 1 | inferido, NÃO VERIFICADO |
| Altura do quadril (trocânter) | 0,530 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR trocânter/estatura = 0,513 (H) e 0,519 (M) |
| Altura do joelho | 0,285 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR joelho meio da patela/estatura = 0,278 e 0,276 |
| Altura do tornozelo | 0,039 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR maléolo lateral/estatura = 0,042 e 0,039 |
| Cota 0,720H (inferido: altura de alcance/outra) | 0,720 | | H | DC-CNB | fig. 1 | rótulo ambíguo; NÃO VERIFICADO |
| Cota vertical 0,520H | 0,520 | | H | DC-CNB | fig. 1, lado direito | rótulo ambíguo; NÃO VERIFICADO |
| Cabeça (queixo-vértex, cota vertical) | 0,130 | (sem separação) | H | DC-CNB | fig. 1 | inferido |
| Braço (ombro-cotovelo) | 0,186 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR acrômio-radial/estatura = 0,191 e 0,191 |
| Antebraço | 0,146 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR radial-estiloide/estatura = 0,153 e 0,148 |
| Mão | 0,108 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR comprimento da mão/estatura = 0,110 e 0,111 |
| Largura 0,129H (inferido: meia largura dos ombros) | 0,129 | | H | DC-CNB | fig. 1 | inferido |
| Largura 0,259H (inferido: largura dos ombros) | 0,259 | | H | DC-CNB | fig. 1 | inferido; ANSUR biacromial/estatura = 0,237 (H), 0,224 (M); bideltóidea 0,291 e 0,277 |
| Largura 0,174H (inferido: largura do tórax) | 0,174 | | H | DC-CNB | fig. 1 | inferido; ANSUR largura do tórax/estatura = 0,165 e 0,165 |
| Largura 0,191H (inferido: largura dos quadris) | 0,191 | | H | DC-CNB | fig. 1 | inferido; ANSUR largura dos quadris/estatura = 0,197 (H), 0,217 (M) |
| Comprimento do pé | 0,152 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR comprimento do pé/estatura = 0,154 e 0,151 |
| Largura do pé | 0,055 | (sem separação) | H | DC-CNB | fig. 1 | ANSUR largura do pé/estatura = 0,058 e 0,057 |
| Coxa (comprimento do elo) | 40,40 / **43,22** / 46,06 (P5/P50/P95) | 36,88 / **39,53** / 42,13 | cm | ASB1 | Cap. IV, Tabela 4 (p. IV-14), população de brancos dos EUA projetada para 1985 | OCR com ruído; derivado de equações de osso longo × razões de Dempster 1964 |
| Perna (elo) | 38,89 / **42,10** / 45,33 | 34,75 / **37,41** / 40,00 | cm | ASB1 | Cap. IV, Tabela 4 | idem |
| Braço (elo) | 28,65 / **30,48** / 32,34 | 26,14 / **27,83** / 29,48 | cm | ASB1 | Cap. IV, Tabela 4 | idem |
| Antebraço (elo, via ulna) | 25,57 / **27,11** / 28,66 | 22,73 / **24,13** / 25,48 | cm | ASB1 | Cap. IV, Tabela 4 | idem |
| Antebraço (elo, via rádio) | 25,92 / **27,54** / 29,18 | 22,72 / **24,13** / 25,52 | cm | ASB1 | Cap. IV, Tabela 4 | idem |
| Elo clavicular | 35,2% da largura biacromial | idem | % | ASB1 (cita Dempster 1955) | Cap. IV, texto antes da Tabela 4 (p. IV-14) | coeficiente masculino; NÃO VERIFICADO no original |
| Elo transpélvico | 37,2% do comprimento do fêmur | idem | % | ASB1 (cita Dempster 1955) | idem | idem |
| Elo do pé | 30,6% do comprimento do pé | idem | % | ASB1 | idem | OCR; confirmar |
| Elo da mão | "20.677 do úmero" (OCR) | | | ASB1 | idem | OCR ilegível (provavelmente 20,6%); NÃO VERIFICADO |
| Centro de massa da cabeça | z = 0,17 × (tragion-vértex) (altura); x = profundidade do tragion à parede (origem) | | | ASB1 | Cap. IV, Tabela 12 (p. IV-32/33) | referência é a origem do sistema de eixos do livro |
| Centro de massa do tronco | z = 0,42 × (suprasternale-trocânter); x = 0,44 × profundidade da cintura no umbigo; y = 0,5 × largura da cintura | | | ASB1 | Tabela 12 | |
| Centro de massa do braço / antebraço / coxa / perna | 0,48 / 0,41 / 0,41 / 0,44 do comprimento do elo (a partir da articulação proximal, por interpretação) | idem | | ASB1 | Tabela 12 | direção da medida não conferida |
| Centro de massa da mão / pé | 0,51 × comprimento da palma / 0,44 × comprimento do pé (a partir do calcanhar) | idem | | ASB1 | Tabela 12 | |
| de Leva 1996 (frações de massa, CM por sexo) | NÃO VERIFICADO | NÃO VERIFICADO | | deLeva96 | só o resumo foi lido; o PDF não abriu | |
| Dempster 1955 (frações de massa) | NÃO VERIFICADO | NÃO VERIFICADO | | Dempster55 | | |
| Distância ombro-quadril (centros articulares, sentado ereto) | 47,4 | | cm | ASB1 (cita Geoffrey 1961, 12 homens) | Cap. IV, texto antes da Tabela 4 (p. IV-14/15) | só homens; amostra pequena |

Comparação útil: como o ANSUR é uma amostra militar de 175,6 cm (H) e 162,8 cm (M), as frações de Drillis & Contini (um valor só, sem sexo) ficam dentro de 0,01 a 0,02 H do ANSUR nas alturas e comprimentos de membros. A diferença entre os sexos aparece nas larguras (ver B).

## B. Levantamentos públicos: ANSUR II (média e P5–P95, por sexo)

Cada linha foi calculada por mim a partir do CSV baixado.

| medida | homem | mulher | unidade | fonte | onde na fonte | observação |
|---|---|---|---|---|---|---|
| Estatura | 175.6 (164.8–187.0) | 162.8 (152.5–174.0) | cm | ANSUR2 | CSV, coluna `stature` |  |
| Altura acromial | 144.1 (133.9–154.6) | 133.5 (124.2–143.4) | cm | ANSUR2 | CSV, coluna `acromialheight` |  |
| Altura cervical (C7) | 151.7 (141.6–162.3) | 139.6 (130.0–149.8) | cm | ANSUR2 | CSV, coluna `cervicaleheight` | cervicale |
| Altura do trocânter | 90.1 (82.4–98.5) | 84.5 (77.4–91.9) | cm | ANSUR2 | CSV, coluna `trochanterionheight` |  |
| Altura do joelho (meio da patela) | 48.8 (44.3–53.6) | 44.9 (40.8–49.3) | cm | ANSUR2 | CSV, coluna `kneeheightmidpatella` |  |
| Altura do epicôndilo femoral lateral | 49.2 (44.9–53.7) | 46.6 (42.2–51.1) | cm | ANSUR2 | CSV, coluna `lateralfemoralepicondyleheight` | proxy do eixo do joelho |
| Altura do maléolo lateral | 7.3 (6.4–8.3) | 6.3 (5.4–7.1) | cm | ANSUR2 | CSV, coluna `lateralmalleolusheight` |  |
| Altura da virilha | 84.6 (77.1–92.5) | 78.2 (71.2–85.7) | cm | ANSUR2 | CSV, coluna `crotchheight` |  |
| Altura suprasternal | 143.9 (134.1–154.0) | 133.0 (123.6–142.8) | cm | ANSUR2 | CSV, coluna `suprasternaleheight` |  |
| Largura biacromial | 41.6 (38.4–44.7) | 36.5 (33.5–39.6) | cm | ANSUR2 | CSV, coluna `biacromialbreadth` |  |
| Largura bideltóidea | 51.0 (45.9–56.7) | 45.0 (40.6–49.9) | cm | ANSUR2 | CSV, coluna `bideltoidbreadth` |  |
| Largura do tórax | 28.9 (26.1–32.0) | 26.9 (24.1–30.2) | cm | ANSUR2 | CSV, coluna `chestbreadth` | definição exata (nível) não conferida no relatório |
| Profundidade do tórax | 25.4 (21.1–29.8) | 24.7 (20.5–29.6) | cm | ANSUR2 | CSV, coluna `chestdepth` |  |
| Largura da cintura | 32.6 (27.2–38.5) | 30.0 (25.0–35.6) | cm | ANSUR2 | CSV, coluna `waistbreadth` |  |
| Profundidade da cintura | 23.8 (18.8–30.0) | 21.3 (16.9–27.1) | cm | ANSUR2 | CSV, coluna `waistdepth` |  |
| Largura dos quadris | 34.6 (30.8–38.7) | 35.4 (31.1–40.0) | cm | ANSUR2 | CSV, coluna `hipbreadth` | em pé |
| Profundidade das nádegas | 24.6 (20.4–29.1) | 23.3 (19.6–27.7) | cm | ANSUR2 | CSV, coluna `buttockdepth` |  |
| Largura bicristal (bi-ilíaca) | 27.5 (24.7–30.5) | 27.3 (23.7–31.0) | cm | ANSUR2 | CSV, coluna `bicristalbreadth` |  |
| Comprimento da cabeça | 19.9 (18.8–21.1) | 19.0 (17.8–20.2) | cm | ANSUR2 | CSV, coluna `headlength` |  |
| Largura da cabeça | 15.4 (14.6–16.3) | 14.8 (14.0–15.6) | cm | ANSUR2 | CSV, coluna `headbreadth` |  |
| Tragion-topo da cabeça | 13.1 (12.1–14.1) | 12.7 (11.6–13.7) | cm | ANSUR2 | CSV, coluna `tragiontopofhead` | não é menton-vértex |
| Menton-sellion | 12.3 (11.2–13.4) | 11.3 (10.4–12.3) | cm | ANSUR2 | CSV, coluna `mentonsellionlength` | não é menton-vértex; não há menton-vértex no CSV |
| Largura bizigomática | 14.3 (13.3–15.3) | 13.4 (12.5–14.3) | cm | ANSUR2 | CSV, coluna `bizygomaticbreadth` |  |
| Circunferência da cabeça | 57.4 (54.8–60.1) | 56.1 (53.2–59.7) | cm | ANSUR2 | CSV, coluna `headcircumference` |  |
| Circunferência do pescoço | 39.8 (36.0–44.3) | 33.0 (30.2–36.3) | cm | ANSUR2 | CSV, coluna `neckcircumference` |  |
| Circunferência do pescoço na base | 43.5 (39.5–47.9) | 37.1 (34.0–40.5) | cm | ANSUR2 | CSV, coluna `neckcircumferencebase` |  |
| Circ. do braço fletido | 35.8 (30.3–41.8) | 30.6 (25.9–36.0) | cm | ANSUR2 | CSV, coluna `bicepscircumferenceflexed` | só há fletido; braço relaxado não existe no CSV |
| Circ. do antebraço (fletido) | 31.0 (27.5–34.8) | 26.4 (23.5–29.6) | cm | ANSUR2 | CSV, coluna `forearmcircumferenceflexed` |  |
| Circ. do punho | 17.6 (16.2–19.1) | 15.5 (14.2–16.8) | cm | ANSUR2 | CSV, coluna `wristcircumference` |  |
| Circ. da coxa | 62.5 (53.2–72.3) | 61.6 (52.7–71.1) | cm | ANSUR2 | CSV, coluna `thighcircumference` |  |
| Circ. da panturrilha | 39.2 (34.6–44.3) | 37.3 (32.8–42.3) | cm | ANSUR2 | CSV, coluna `calfcircumference` |  |
| Circ. do tornozelo | 22.9 (20.6–25.4) | 21.6 (19.3–24.2) | cm | ANSUR2 | CSV, coluna `anklecircumference` |  |
| Comprimento ombro-cotovelo | 36.4 (33.4–39.4) | 33.4 (30.7–36.3) | cm | ANSUR2 | CSV, coluna `shoulderelbowlength` | pontos de medida não conferidos no relatório |
| Acrômio-radial | 33.5 (30.7–36.5) | 31.1 (28.3–34.0) | cm | ANSUR2 | CSV, coluna `acromionradialelength` |  |
| Radial-estiloide | 26.8 (24.4–29.5) | 24.1 (21.8–26.8) | cm | ANSUR2 | CSV, coluna `radialestylionlength` |  |
| Comprimento da mão | 19.3 (17.7–21.0) | 18.1 (16.5–19.9) | cm | ANSUR2 | CSV, coluna `handlength` |  |
| Largura da mão (metacarpos) | 8.8 (8.1–9.6) | 7.8 (7.2–8.5) | cm | ANSUR2 | CSV, coluna `handbreadth` |  |
| Comprimento da palma | 11.7 (10.7–12.7) | 10.9 (10.0–11.9) | cm | ANSUR2 | CSV, coluna `palmlength` |  |
| Comprimento do pé | 27.1 (25.0–29.3) | 24.6 (22.6–26.8) | cm | ANSUR2 | CSV, coluna `footlength` |  |
| Largura do pé | 10.2 (9.4–11.1) | 9.3 (8.5–10.1) | cm | ANSUR2 | CSV, coluna `footbreadthhorizontal` |  |
| Largura do calcanhar | 7.2 (6.4–8.2) | 6.7 (6.0–7.6) | cm | ANSUR2 | CSV, coluna `heelbreadth` |  |
| Calcanhar-bola do pé (ball of foot length) | 20.1 (18.4–21.8) | 18.2 (16.7–19.8) | cm | ANSUR2 | CSV, coluna `balloffootlength` |  |
| Altura sentado | 91.8 (86.0–97.7) | 85.7 (80.3–91.2) | cm | ANSUR2 | CSV, coluna `sittingheight` |  |
| Peso (kg) | 85.5 (64.0–111.0) | 67.8 (51.0–87.0) | kg | ANSUR2 | CSV, coluna `weightkg` | coluna em hectogramas, dividi por 10 |
| Idade (anos) | 30.2 (19.0–47.0) | 28.9 (19.0–45.0) | anos | ANSUR2 | CSV, coluna `Age` |  |

Medidas pedidas que NÃO existem no CSV do ANSUR II: distância entre as ASIS; menton-vértex (altura da cabeça) — existem só tragion-vértex e menton-sellion; circunferência do braço relaxado; largura e profundidade do tórax "no nível do mamilo" e não há largura interna da pelve. Valores equivalentes (aproximação, não substituição): bicristal (cristas ilíacas) no lugar da ASIS.

Frações de H calculadas por mim com as médias acima (média da medida dividida pela média da estatura): acromial 0,820 (H) / 0,820 (M); cervical 0,864 / 0,857; trocânter 0,513 / 0,519; joelho 0,278 / 0,276; maléolo lateral 0,042 / 0,039; largura biacromial 0,237 / 0,224; bideltóidea 0,291 / 0,277; largura dos quadris 0,197 / 0,217; bicristal 0,157 / 0,168; largura do pé 0,058 / 0,057; comprimento do pé 0,154 / 0,151; comprimento da mão 0,110 / 0,111; altura sentado 0,523 / 0,526.

NASA-STD-3000 vol. 1 seção 3 e CAESAR: não consegui PDF público; sem números. NHANES: não consultei (sem medidas de segmento na lista).

## C. Centros articulares em relação a pontos palpáveis

| medida | homem | mulher | unidade | fonte | onde na fonte | observação |
|---|---|---|---|---|---|---|
| Glenoumeral (Dempster) | "região média da massa óssea palpável da cabeça e tuberosidades do úmero; com o braço abduzido ~45°, uma linha perpendicular ao eixo do braço partindo da margem externa do acrômio divide a articulação ao meio" | idem | definição | ASB1 (citando Dempster 1955, p. 125) | Apêndice A, definições de centros articulares (p. IV-60) | tradução minha; o texto original é aspas de Dempster |
| Cotovelo | ponto médio da linha entre (1) o ponto palpável mais baixo do epicôndilo medial do úmero e (2) um ponto 8 mm acima do radiale | idem | definição | ASB1 (Dempster 1955) | p. IV-61 | |
| Punho | face palmar: prega distal do punho no tendão do palmar longo, ou ponto médio entre o estiloide radial e o centro do pisiforme; face dorsal: sulco entre semilunar e capitato, alinhado com o metacarpo III | idem | definição | ASB1 (Dempster 1955) | p. IV-61 | |
| Quadril | ponta do trocânter maior do fêmur, 0,4 polegada (aprox. 1 cm) anterior ao ponto mais lateral do trocânter | idem | definição | ASB1 (Dempster 1955) | p. IV-61 | versão simplificada de Dempster; não é o centro da cabeça femoral |
| Joelho | ponto médio da linha entre os centros das convexidades posteriores dos côndilos femorais | idem | definição | ASB1 (Dempster 1955) | p. IV-61 | |
| Tornozelo | nível da linha entre a ponta do maléolo lateral da fíbula e um ponto 5 mm distal ao maléolo tibial | idem | definição | ASB1 (Dempster 1955) | p. IV-61 | |
| Cabeça/pescoço | ponto médio do espaço entre os côndilos occipitais e a primeira vértebra cervical | idem | definição | ASB1 | p. IV-60 | |
| Pescoço/tórax | ponto médio do espaço entre C7 e T1 | idem | definição | ASB1 | p. IV-60 | |
| Tórax/lombar | ponto médio do espaço entre T12 e L1 | idem | definição | ASB1 | p. IV-60 | |
| Lombossacra | ponto médio do espaço entre L5 e S1 | idem | definição | ASB1 | p. IV-60 | |
| Centro do quadril por regressão (Bell 1990, Harrington 2007, Leardini 1999) | NÃO VERIFICADO (coeficientes não obtidos) | NÃO VERIFICADO | | Harrington07 | resumo | o resumo diz que os melhores preditores são profundidade pélvica (ântero-posterior), largura pélvica e comprimento da perna (súpero-inferior), profundidade e largura pélvica (médio-lateral); erro máximo de 31 mm em adultos (8 adultos, MRI) |
| Distância entre os dois centros do quadril | NÃO VERIFICADO | NÃO VERIFICADO | | | | |
| Glenoumeral por Meskers 1998 / Rab 2002 | NÃO VERIFICADO | NÃO VERIFICADO | | | | busca no Europe PMC não retornou resumos úteis |
| ISB Wu 2002 / 2005 (eixos e centros) | NÃO VERIFICADO | NÃO VERIFICADO | | Wu02, Wu05 | resumo | os resumos só descrevem o objetivo |

Aproximações de apoio, a partir do ANSUR (não substituem a literatura): largura entre os quadris em pé (média 34,6 H / 35,4 M) e bicristal (27,5 H / 27,3 M). Altura do epicôndilo femoral lateral: 49,2 H / 46,6 M; altura do maléolo lateral: 7,3 H / 6,3 M.

## D. Mão e pé

| medida | homem | mulher | unidade | fonte | onde na fonte | observação |
|---|---|---|---|---|---|---|
| Comprimento da mão | 19,3 (17,7–21,0) | 18,1 (16,5–19,9) | cm | ANSUR2 | coluna `handlength` | ver tabela B |
| Largura da mão (metacarpos) | 8,8 (8,1–9,6) | 7,8 (7,2–8,5) | cm | ANSUR2 | coluna `handbreadth` | |
| Comprimento da palma | 11,7 (10,7–12,7) | 10,9 (10,0–11,9) | cm | ANSUR2 | coluna `palmlength` | palma/mão = 0,60 (H) e 0,60 (M) (calculado por mim) |
| Circunferência da mão | 21,2 (19,5–23,0) | 18,7 (17,3–20,2) | cm | ANSUR2 | coluna `handcircumference` | |
| Comprimento dos dedos, falanges, polegar, diâmetro de preensão | NÃO VERIFICADO | NÃO VERIFICADO | | | | colunas não existem no CSV; não achei tabela pública lida |
| Comprimento do pé | 27,1 (25,0–29,3) | 24,6 (22,6–26,8) | cm | ANSUR2 | coluna `footlength` | |
| Largura do pé | 10,2 (9,4–11,1) | 9,3 (8,5–10,1) | cm | ANSUR2 | coluna `footbreadthhorizontal` | |
| Comprimento calcanhar-bola do pé | 20,1 (18,4–21,8) | 18,2 (16,7–19,8) | cm | ANSUR2 | coluna `balloffootlength` | bola/pé = 0,74 (H) e 0,74 (M), calculado por mim. A dobra do pé (cabeças dos metatarsos) fica a ~74% do comprimento do pé a partir do calcanhar |
| Largura do calcanhar | 7,2 (6,4–8,2) | 6,7 (6,0–7,6) | cm | ANSUR2 | coluna `heelbreadth` | |
| Altura do maléolo lateral (posição do tornozelo na vertical) | 7,3 (6,4–8,3) | 6,3 (5,4–7,1) | cm | ANSUR2 | coluna `lateralmalleolusheight` | |
| Posição do tornozelo ao longo do pé (horizontal) | NÃO VERIFICADO | NÃO VERIFICADO | | | | só há Dempster 30,6% do comprimento do pé (ASB1) para o elo do pé |
| Altura do peito do pé | NÃO VERIFICADO | NÃO VERIFICADO | | | | não existe no CSV |

## E. Coluna e tronco

| medida | homem | mulher | unidade | fonte | onde na fonte | observação |
|---|---|---|---|---|---|---|
| Lordose lombar máxima, em pé | 60 (DP 10) | (amostra mista; não separado no resumo) | graus | Vialle05 | resumo, Resultados | 300 assintomáticos |
| Inclinação sacral (sacral slope) | 41 (DP 8,4) | idem | graus | Vialle05 | resumo | |
| Inclinação pélvica (pelvic tilt) | 13 (DP 6) | idem | graus | Vialle05 | resumo | é a inclinação pélvica em pé; valor médio, não uma regra por sexo |
| Incidência pélvica | 55 (DP 10,6) | idem | graus | Vialle05 | resumo | |
| Deslocamento sagital de T9 | 10,3 (DP 3,1) | idem | graus | Vialle05 | resumo | |
| Cifose torácica em pé | NÃO VERIFICADO | NÃO VERIFICADO | graus | Vialle05 | resumo corta antes | o resumo cita o parâmetro, mas o valor não está no trecho lido |
| Lordose cervical | NÃO VERIFICADO | NÃO VERIFICADO | | | | |
| Comprimento das regiões cervical, torácica e lombar | NÃO VERIFICADO | NÃO VERIFICADO | | | | |
| Altura sentado | 91,8 (86,0–97,7) | 85,7 (80,3–91,2) | cm | ANSUR2 | coluna `sittingheight` | |
| Altura cervical menos altura do trocânter (comprimento do tronco em pé) | 61,6 | 55,0 | cm | ANSUR2 | calculado por mim: média de `cervicaleheight` menos média de `trochanterionheight` | cálculo próprio, não é medida direta |
| Largura biacromial / bicristal | 41,6 / 27,5 | 36,5 / 27,3 | cm | ANSUR2 | ver tabela B | |
| Largura / profundidade do tórax | 28,9 / 25,4 | 26,9 / 24,7 | cm | ANSUR2 | `chestbreadth`, `chestdepth` | |
| Circunferência do tórax | 105,9 (92,2–120,7) | 94,7 (82,4–109,4) | cm | ANSUR2 | `chestcircumference` | |
| Circunferência da cintura | 94,1 (76,8–113,1) | 86,1 (71,0–104,0) | cm | ANSUR2 | `waistcircumference` | |
| Circunferência dos quadris/nádegas | 102,0 (89,9–114,9) | 102,1 (90,1–115,6) | cm | ANSUR2 | `buttockcircumference` | |
| Dimensões da caixa torácica e da pelve (ossos) | NÃO VERIFICADO | NÃO VERIFICADO | | | | |

## F. Brasil

Mediana de estatura de adultos, Brasil, total (urbano + rural), IBGE POF 2008-2009, Tabela 1.1 (lida no PDF). Valores são medianas, e a pesquisa mediu peso e altura (não são autorreferidos; a POF usa medida direta, conforme o título e a tabela; não li o capítulo de método nesta sessão).

| faixa | homem | mulher | unidade | fonte | onde na fonte | observação |
|---|---|---|---|---|---|---|
| 18 anos | 172,6 | 161,1 | cm | IBGE-POF | Tabela 1.1 (Brasil), linhas de "18 anos" | mediana |
| 19 anos | 172,0 | 161,2 | cm | IBGE-POF | idem | |
| 20 a 24 anos | 173,0 | 161,1 | cm | IBGE-POF | idem | |
| 25 a 29 anos | 173,0 | 160,7 | cm | IBGE-POF | idem | |
| 30 a 34 anos | 171,6 | 160,0 | cm | IBGE-POF | idem | |
| 35 a 44 anos | 171,0 | 159,4 | cm | IBGE-POF | idem | |
| 45 a 54 anos | 169,9 | 158,3 | cm | IBGE-POF | idem | |
| 55 a 64 anos | 168,2 | 156,6 | cm | IBGE-POF | idem | |
| 65 a 74 anos | NÃO LIDO | 155,0 | cm | IBGE-POF | idem | masculino não conferido |
| Tabela antropométrica brasileira de segmentos (ex.: INT 1988) | NÃO VERIFICADO | NÃO VERIFICADO | | | | não localizei página pública |

Leitura prática: para a estatura de referência de 25 a 34 anos, as medianas ficam em torno de 172 cm (H) e 160 cm (M); o ANSUR americano é cerca de 3 a 4 cm maior (175,6 / 162,8, médias). A escolha da estatura de referência é do projeto; esta pesquisa só fornece os números. Observação: o guia da PNS/Fiocruz (resultado de busca) diz que a série de altura das mulheres está desalinhada das tendências internacionais; não li o guia a fundo.

## O que não consegui conferir

- Tabela original de Drillis & Contini 1966 e a tabela de Winter. Só a figura reproduzida em DC-CNB (2025), com rótulos de cotas ambíguos.
- de Leva 1996 (tabelas de massa e centro de massa por sexo): o PDF não abriu (TLS/503); só o resumo.
- Dempster 1955 no original.
- Coeficientes de regressão do centro do quadril (Bell 1990, Harrington 2007, Leardini 1999) e distância entre os dois centros; centro glenoumeral (Meskers 1998, Rab 2002); definições ISB de Wu 2002 e 2005.
- Distância entre as ASIS, menton-vértex e braço relaxado (não existem no ANSUR II CSV).
- NASA-STD-3000 vol. 1 seção 3, CAESAR, NHANES.
- Falanges, polegar, diâmetro de preensão, altura do peito do pé, posição do tornozelo ao longo do pé.
- Cifose torácica e lordose cervical, comprimentos de região da coluna, ângulo normal por sexo.
- Tabelas brasileiras de segmentos (INT 1988) e médias (não medianas) de estatura da POF; a faixa masculina de 65 a 74 anos.
- Licença formal do CSV do ANSUR II.
- Rótulos exatos (o que é 0,936H, 0,870H, 0,630H, 0,485H, 0,377H, 0,720H, 0,520H) na figura de Drillis & Contini.

## Divergências entre fontes

- Segmentos de membro: Drillis & Contini (braço 0,186H, antebraço 0,146H) versus ANSUR II (acrômio-radial 0,191H; radial-estiloide 0,153H em homens). Com H = 175,6, D&C dá braço 32,7 cm e antebraço 25,6 cm; ANSUR dá 33,5 e 26,8. Diferença de 1 a 1,2 cm, dentro do erro de 2 cm que DC-CNB atribui ao modelo.
- Elo do braço: NASA (elo, 50º percentil, homem) 30,48 cm; ANSUR acrômio-radial 33,5 cm. São medidas diferentes (centro articular × ponto ósseo), não conflito.
- Largura dos ombros: D&C 0,259H (inferido) versus ANSUR biacromial 0,237H (H) e 0,224H (M); bideltóidea 0,291H e 0,277H. A figura do D&C não separa por sexo, e a mulher tem ombros mais estreitos.
- Largura dos quadris: D&C 0,191H; ANSUR 0,197H (H) e 0,217H (M). A figura do D&C vale para um corpo masculino médio.
- Estatura de referência: ANSUR II (média) 175,6 / 162,8 cm; IBGE POF (mediana, 25 a 29 anos) 173,0 / 160,7 cm.
- O relatório NASA (1978) projeta uma população de 1985 (brancos); tudo no ASB1 é dessa projeção, não de medida.
- Número do relatório de Drillis & Contini: 1163-03 (DC-CNB) versus 1166-03 (outras fontes citadas em buscas).
