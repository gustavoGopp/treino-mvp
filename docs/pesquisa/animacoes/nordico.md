# Flexão nórdica (`nordico`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): `flexao-joelho`, peso do corpo, complexidade 3 (só intermediário e avançado), tag `montagem`. **Animação nova, em revisão, com pose nova** (`src/engine/exercicios/revisao/nordico.ts`; folha em `../../revisoes/equipamento-minimo/folhas/nordico.png`). Até a aprovação, o app mostra o cartão de texto (`src/conteudo/exercicios/nordico.json`), com a montagem obrigatória.

- **Equipamento:** nenhum que o app veja: uma âncora firme para os calcanhares (sofá ou cama pesados, ou alguém segurando os tornozelos), uma almofada para os joelhos e espaço livre à frente
- **Função:** a única flexão de joelho sem equipamento com ensaio de hipertrofia (P3)
- **Desenho:** pose nova. O sofá é feito de caixas (BOX: assento por cima dos calcanhares, encosto e pés do lado de lá); a almofada sob os joelhos é uma caixa fina. O motor não tem peça de sofá

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Âncora | Calcanhares presos sob o assento de um sofá; tíbias no chão; joelhos numa almofada | consenso | P3, "Onde ancorar os pés em casa" (guias de treinadores na busca; nenhum lido na íntegra) |
| Posição | Ajoelhado, corpo reto: joelho, quadril e cabeça em linha; mãos na frente do peito | consenso | P3; P6 (joelhos apoiados no chão) |
| Descida | O corpo inteiro gira para a frente em torno dos joelhos, sem dobrar o quadril, **devagar: 4 s na animação (3 a 5 s no texto)**, em duas metades iguais | consenso (a cadência); moderada (que o nórdico cresce os posteriores) | tabela 5.3 (escada: "descida de 3–5 s até onde controla"); `maeo2024`, `morin2025` |
| Mãos | Quando a descida passa do ponto que se controla, as mãos tocam o chão e os cotovelos dobram, como numa flexão, aparando o corpo | consenso | P6, texto de montagem ("use as mãos para aparar a descida, como numa flexão") |
| Volta | Empurra o chão com as mãos e volta a ficar ajoelhado (a volta assistida é o degrau 4 da escada) | consenso | tabela 5.3 |
| Começo assistido | Não animado (é texto): começar com descidas curtas e as mãos ajudando, e subir o volume aos poucos | um estudo (assistido dói menos, mesmo ganho de força); consenso (a escada) | `ishoi2025`; `behan2023`; tabela 5.3 |

## Por que assim
Em dois grupos de pesquisa independentes, o nórdico aumentou o volume dos posteriores: +11% em 12 semanas (`maeo2024`, 42 homens; menos que a flexão excêntrica com o quadril dobrado, +18%) e crescimento de partes diferentes das do stiff (`morin2025`). Selo **moderada** para "cresce os posteriores"; **um estudo** para "cresce menos que a flexora com o quadril dobrado". Na espessura muscular de jogadores de futebol, só o volume alto mostrou aumento; o volume baixo deu força, mas não espessura (`cholp2025`, meta-análise de 11 estudos). Para força e arquitetura, volume baixo bastou (`cuthbert2020`).

**A 1ª sessão pesa:** 24 repetições baixaram a força por 3 dias e a amplitude por 4, com dor no 2º e no 3º dia; a mesma sessão 4 semanas depois causou menos dano (`coratella2025`, **um estudo**). Subir o volume rápido doeu mais (`behan2023`, **um estudo**). O nórdico assistido por elástico deu ganho de força parecido, com menos dor, em jovens atletas (`ishoi2025`, **um estudo**; a transferência para adultos em casa é inferência). Por isso o texto avisa da dor dos primeiros dias e o cartão começa pela descida assistida.

**Fora do app:** a prevenção de lesão (meta-análise de 2019 e reanálise de 2021, NÃO VERIFICADAS) não entra: é assunto de esporte.

## Erros animados
1. **Dobrar o quadril** (`quadril`): a coxa fica mais em pé e o tronco cai para a frente.
2. **Desabar no começo** (`desaba`): perde o controle logo no início e cai nas mãos (no erro, o corpo chega às mãos na primeira metade da descida).

## Músculos
Primário: posteriores da coxa. Sem secundário. É o que a biblioteca conta (`posteriores` / —). Selo: **moderada** (crescimento dos posteriores, `maeo2024`, `morin2025`). **[opinião]** Os glúteos e a lombar firmam o quadril estendido, mas a biblioteca não os conta, e o desenho não os mostra.

## Montagem segura
Obrigatória (tag `montagem`; `seguranca.montagem`). Texto da tabela 6.1 (P6), no cartão: "Prenda os calcanhares sob um sofá ou cama pesados, ou peça para alguém segurar seus tornozelos. Antes da 1ª repetição, puxe com força e confira que nada se mexe. Ponha uma almofada sob os joelhos. Deixe espaço livre à frente e use as mãos para aparar a descida, como numa flexão." Selo: consenso (nenhum estudo testou onde ancorar os pés em casa nem o risco de a âncora soltar; P3).
Texto comum da P6 para móvel de casa **[opinião; consenso com `kerr2010` e `coffey2026`]**: "Móvel de casa não foi feito para treino. Antes da 1ª série, empurre e puxe para ver se ele escorrega, balança ou levanta."

## Como a carga sobe
Peso do corpo, pela escada do nórdico (tabela 5.3, proposta): só a descida, com as mãos amortecendo → descida de 3–5 s até onde controla → descida completa → descida e volta empurrando com as mãos → completo. Faixa 4–8. Selo: moderada para o nórdico crescer os posteriores (`cholp2025`); consenso para a escada e a faixa.

## Referência visual
Referência visual de movimento, **não fonte de regra; não assistido nesta sessão** (P7; o Gustavo confere o canal ao abrir).
- E3 Rehab (pela busca), "How to Set Up, Perform, & Program Nordic Hamstring Curls (Progressions…)": https://www.youtube.com/watch?v=_e9vFU9-tkc
- Canal não confirmado, "3 Simple Ways to Setup Nordic Hamstring Curls (Without a Partner)": https://www.youtube.com/watch?v=9XOaewLMMrs

## Fontes
Chaves de `docs/pesquisa-v2/10-equipamento-minimo.md`, "Fontes novas" (ainda fora de `../fontes.md`, salvo onde está dito). Em todas, **resumo oficial lido no PubMed** na sessão de equipamento mínimo (03/11/2026); texto completo não lido.
- `maeo2024`: Maeo S, Balshaw TG, Nin DZ, et al. Hamstrings Hypertrophy Is Specific to the Training Exercise: Nordic Hamstring versus Lengthened State Eccentric Training. Med Sci Sports Exerc 2024;56(10):1893–1905. PMID 38857522.
- `morin2025` (já em `../fontes.md`): Morin et al. 2025, stiff versus nórdico (título não conferido). PMID 40644669. Resumo lido no PubMed na pesquisa v2.
- `cholp2025`: Cholp J, Zemková E. Effect of high vs. low volume of the nordic hamstring curl on hamstring muscle architecture and eccentric strength in soccer players: a systematic review and meta-analysis. Front Physiol 2025;16:1631205. PMID 41178985.
- `cuthbert2020`: Cuthbert M, Ripley N, McMahon JJ, et al. The Effect of Nordic Hamstring Exercise Intervention Volume on Eccentric Strength and Muscle Architecture Adaptations. Sports Med 2020;50(1):83–99. PMID 31502142.
- `coratella2025`: Coratella G, Cè E, D'Orlando A, et al. Muscle Damage and the Repeated-bout Effect After a Typical Nordic Hamstring Exercise Session. Int J Sports Med 2025;46(10):759–767. PMID 40280182.
- `behan2023`: Behan FP, Opar DA, Vermeulen R, et al. The dose-response of pain throughout a Nordic hamstring exercise intervention. Scand J Med Sci Sports 2023;33(4):542–546. PMID 36651719.
- `ishoi2025`: Ishøi L, Meincke S, Lund AP, et al. Less pain, same gain? A randomized controlled trial comparing assisted- versus non-assisted Nordic Hamstring exercise training in elite youth football players. Phys Ther Sport 2025;73:39–47. PMID 40056728.
- `kerr2010` (PMID 20139328) e `coffey2026` (PMID 41118234), já em `../fontes.md`: lesões de musculação atendidas em pronto-socorro nos EUA (títulos e autores não conferidos). **Resumo lido no PubMed** na pesquisa v2. Apoiam só o texto comum de móvel de casa (P6).
- NÃO VERIFICADOS, não usados: `nordico-prevencao2019` (PMID 30808663) e `nordico-reanalise2021` (PMID 34520846).
