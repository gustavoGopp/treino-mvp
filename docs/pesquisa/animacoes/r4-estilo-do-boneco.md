# R4: estilo do boneco — por que a vista de trás não se lê, o que dizem as fontes e a anatomia a mostrar

Marco R4 (experimento do boneco), 02/11/2026. Selos de `../00-metodo.md`. Este arquivo não cria regra do gerador: ele
apoia o desenho dos protótipos A e B (`src/engine/estilo/`) e a revisão do especialista.

## 1. Por que a vista de trás da puxada unilateral não se lê

Imagem: `reports/r4/a-puxada-tras-atual.png` (gerada pelo Playwright; a pasta `reports/` fica fora do git).
Na linha de cima, o quadro como o app mostra; na de baixo, cada camada sozinha.

| O que confunde | De onde vem (`src/engine/desenho.ts`) |
|---|---|
| **Forma do tronco.** O tronco são dois polígonos (ombros → cintura → quadril) que afinam para baixo: na vista de trás, vira um **triângulo invertido** cinza, sem cintura, sem ombro e sem quadril. | `body()`: `PG3([R.S, L.S, Ml, Mr])` e `PG3([Mr, Ml, L.Hp, R.Hp])`; na vista de trás a borda tem 3,5 de espessura, contra 16 na lateral. |
| **Os triângulos menores.** As escápulas são **dois triângulos claros com contorno escuro** por cima do tronco. Sem rótulo, parecem recortes ou setas, não ossos. | `scapPts()` e `PG3(..., 'scap')`. |
| **Sobreposição.** Coluna tracejada amarela com pontos, escápulas, seta da guia e, no modo músculos, o dorsal: tudo empilhado numa área de uns 25 px de largura no celular. | `PL3(sp, 'sp')` e `C3(..., 'spd')`; as guias da puxada. |
| **Contraste.** Tronco cinza médio (`--torso`), membros quase pretos e grossos (`--fig`), cabeça vazia (só o anel). O olho vai para braços e pernas, e o tronco parece um objeto de fundo. | classes `.tor`, `.bn`, `.hd` em `src/styles.css`. |
| **Realce do músculo.** O dorsal é um polígono vermelho **meio transparente** (62%) por cima do cinza: a cor fica turva e a forma não lembra o músculo. O deltoide posterior é um círculo e o bíceps uma linha grossa, também transparentes, por cima do braço preto. | `MUS.lats`, `MUS.deltPost`, `MUS.biceps`; `--mus-p` e `--mus-s` com transparência. |
| **Tamanho.** A caixa da vista inclui a torre inteira (2,4 m): o corpo ajoelhado ocupa só um quarto da altura do palco. Isso não é estilo, é enquadramento, e soma com tudo acima. | `fit()` em `src/engine/cena.ts`. |

O que **não** é problema: as poses e a cinemática (IK = 0); o movimento em si se entende de lado.

## 2. Como as boas ilustrações de exercício mostram o músculo que trabalha

| Afirmação | Selo | Fonte |
|---|---|---|
| Realçar o que é essencial (cor, seta, destaque) ajuda a aprender com imagens: efeito pequeno a médio na compreensão e na transferência, maior em quem sabe pouco do assunto. | **moderada** (meta-análise, 27 estudos, N = 2.464) | `richter2016` |
| O mesmo efeito do realce aparece numa meta-análise maior, mais forte na retenção do que na transferência. | **moderada** (meta-análise; números lidos em resumo de terceiros) | `schneider2018` (não verificado no original) |
| Animação ensina um pouco melhor que imagem parada, sobretudo em movimento (conhecimento procedural e motor). A vantagem é discutida em reanálises posteriores. | **moderada**, contestada | `hoffler2007` |
| Boneco esquemático, figura 3D estilizada e vídeo real: as pessoas **preferiram** o vídeo, mas **aprenderam igual** (64 iniciantes em tênis). Quem sabe pouco nem sempre sabe para onde olhar numa imagem realista. | **um estudo** | `lucas2019` (só o resumo, por busca) |
| Não há estudo comparando boneco de traço com figura cheia ou silhueta para aprender um exercício de musculação. | — | busca do diagnóstico (seção 5.1) e desta pesquisa |
| Silhueta preenchida em tom neutro, **cor só no músculo alvo**, e o mínimo de linhas por dentro do corpo. | **consenso** (convenção de design de material de exercício e de anatomia; sem estudo que teste) | prática comum em ilustração didática |
| Contorno anatômico **simplificado** (a forma geral do músculo, sem fibras e sem relevo) em vez de atlas detalhado, quando a imagem é pequena. | **opinião** (escolha de design deste projeto, para a tela do celular) | — |
| Cor sólida no lugar de transparência, vermelho no principal e laranja nos secundários. | **decisão do Gustavo** (02/11/2026) | — |

O que isso muda nos protótipos: o realce precisa ser **distinto** (cor sólida, forma reconhecível) e o resto precisa
**sair do caminho** (menos linhas, sem triângulos, sem pontilhado). Nada disso prova que A ou B ensina melhor: é por
isso que o R4 é um experimento com a decisão do Gustavo e a revisão de um especialista, não uma conclusão.

## 3. A anatomia que a figura precisa mostrar

Origem e inserção resumidas de referências de anatomia descritiva, conferidas por busca (status `verificado-busca`).
O livro-texto aberto planejado (OpenStax *Anatomy and Physiology 2e*, cap. 11) não pôde ser aberto: o endereço
openstax.org não está liberado na rede desta sessão. As fontes divergem em alguns níveis vertebrais (anotado abaixo);
para o desenho, a diferença de uma vértebra não muda a forma. **A forma exata desenhada é simplificação de design.**

### Puxada unilateral (vista de trás e de lado)
| Músculo | Papel no desenho | Origem → inserção | Ação que importa aqui | Fonte |
|---|---|---|---|---|
| Grande dorsal | principal | processos espinhosos das vértebras torácicas baixas e lombares, fáscia toracolombar, crista ilíaca e últimas costelas → sulco intertubercular do úmero (passa em volta do redondo maior) | puxa o braço para baixo e para trás (extensão e adução do ombro) | `lumen-lat`; `wiki-lat` |
| Redondo maior | principal (pedido do Gustavo) | face posterior do ângulo inferior da escápula → lábio medial do sulco intertubercular do úmero | ajuda o dorsal na extensão e adução | `wiki-romb` e materiais de anatomia por busca |
| Trapézio médio | secundário | processos espinhosos de C7 a T4 ou T1 a T5 (**fontes divergem**) → acrômio e espinha da escápula | aproxima a escápula da coluna | busca (cartões de estudo; divergentes) |
| Trapézio inferior | secundário | processos espinhosos de T4/T6 a T12 (**fontes divergem**) → espinha da escápula, parte medial | desce a escápula ("ombro desce") | busca (divergentes) |
| Romboides (maior e menor) | secundários | processos espinhosos de C7–T1 (menor) e T2–T5 (maior) → borda medial da escápula | aproximam e giram a escápula para baixo | `wiki-romb` |
| Deltoide posterior | secundário (já na lista do app) | espinha da escápula → tuberosidade deltoidea do úmero | extensão do ombro | materiais de anatomia por busca |
| Bíceps braquial | secundário | processo coracoide e tubérculo supraglenoidal → tuberosidade do rádio | flexão do cotovelo | materiais de anatomia por busca |

Por que esses: o app já lista costas como principal e bíceps e ombro posterior como secundários (ficha
`puxada-frente.md`); a ativação maior do dorsal e a participação do bíceps e do trapézio inferior vêm de estudos de EMG
(`lusk2010`, `youdas2010`; ver `../08-tecnica-guia.md`). EMG mostra ativação, não crescimento.

**Escolhas de desenho (não anatomia):** de trás, o bíceps não aparece (fica na frente do braço); de lado, os romboides e
os trapézios ficam escondidos atrás da escápula e só aparecem o dorsal, o deltoide posterior e o bíceps. Os trapézios
ficam por cima dos romboides, como no corpo (o trapézio é mais superficial). Só o lado que puxa (o direito) é realçado.

### Goblet (vista de lado e de frente)
| Músculo | Papel no desenho | Origem → inserção | Fonte |
|---|---|---|---|
| Quadríceps | principal | reto femoral na espinha ilíaca anteroinferior; vastos no corpo do fêmur → tendão do quadríceps na patela e, pelo ligamento patelar, na tuberosidade da tíbia | busca (materiais de anatomia) |
| Glúteo máximo | secundário | ílio posterior, sacro e cóccix → tuberosidade glútea do fêmur e trato iliotibial | busca |
| Adutores (longo, curto, magno) | secundários (pedido do Gustavo) | púbis e ísquio → linha áspera do fêmur; o magno até o tubérculo adutor | busca |

Por que esses: o agachamento completo aumentou mais o volume dos **adutores** (+6,2% contra +2,7%) e do **glúteo
máximo** (+6,7% contra +2,2%) do que o meio agachamento (Kubo 2019; **um estudo**, resumo lido no PubMed em
02/11/2026). O quadríceps é o principal na biblioteca do app (ficha `goblet-kettlebell.md`).

**Escolhas de desenho:** de lado, os adutores ficam escondidos (parte de dentro da coxa) e o glúteo aparece; de frente, o
glúteo fica escondido e os adutores aparecem na parte de dentro das coxas.

## Fontes
- `richter2016`: Richter J, Scheiter K, Eitel A. Signaling text-picture relations in multimedia learning: A comprehensive meta-analysis. Educ Res Rev 2016;17:19-36. doi:10.1016/j.edurev.2015.12.003. Resumo conferido por busca em 02/11/2026 (r = 0,17; IC 95% 0,11–0,22).
- `schneider2018`: Schneider S, Beege M, Nebel S, Rey GD. A meta-analysis of how signaling affects learning with media. Educ Res Rev 2018;23:1-24. **Não verificado** no original (tamanhos de efeito vistos só em resumos de terceiros).
- `hoffler2007`: Höffler TN, Leutner D. Instructional animation versus static pictures: A meta-analysis. Learn Instr 2007;17(6):722-738. doi:10.1016/j.learninstruc.2007.09.013. Resumo conferido por busca em 02/11/2026; ver as reanálises citadas lá (Berney & Bétrancourt 2016; Ploetzner et al. 2020).
- `lucas2019`: Lucas T. Exploring the effect of realism at the cognitive stage of complex motor skill learning. E-Learning and Digital Media 2019;16(3):242-266. doi:10.1177/2042753019835893. Resumo conferido por busca em 02/11/2026; texto completo não lido.
- `kubo2019`: já em `../fontes.md` (PMID 31230110). Resumo relido no PubMed em 02/11/2026.
- `lumen-lat`: Loyola University Chicago, LUMEN Gross Anatomy Dissector, *Latissimus dorsi*. https://www.lumen.luc.edu/lumen/meded/grossanatomy/dissector/muscles/lat.htm (por busca).
- `wiki-lat` e `wiki-romb`: Wikipedia, *Latissimus dorsi muscle* e *Rhomboid major muscle* (base Gray's Anatomy). Por busca; usar só como conferência.
- Origem e inserção dos demais músculos: resumos de busca em materiais de anatomia (cartões de estudo e páginas didáticas), com as divergências anotadas acima. **A conferir pelo especialista** (roteiro em `../../revisoes/r4-roteiro-especialista.md`).
