# 2. Panorama: cada variável do treino contra a evidência mais recente

> Pesquisa de 01/11/2026. Todas as fontes tiveram o **resumo oficial lido no PubMed** (resumo-PubMed, com PMID); o texto completo não foi lido. A coluna "regra atual" remete a `docs/pesquisa/regras.md`.

## Resumo
**As regras numéricas do app estão, na maior parte, de acordo com a evidência mais recente.**
- Duas fontes que estavam pendentes desde 29/10 agora foram lidas no PubMed: o posicionamento do ACSM de 2026 e a meta-análise de Pelland 2026. As duas **confirmam** o núcleo: volume semanal, séries fracionadas, proximidade da falha e liberdade de carga.
- **O que estava fraco não eram os números, e sim a montagem:** divisão, vagas e escolha dos exercícios (ver `01` e o tema 3).
- Há **quatro ajustes** propostos, na tabela abaixo.

| Variável | O que a evidência diz agora | Regra atual | Muda? |
|---|---|---|---|
| **Volume semanal** | Mais volume, mais crescimento, com retorno decrescente (Pelland 2026, 67 estudos). O ACSM 2026 cita ≥ 10 séries por semana como o que melhora a hipertrofia. | `volume.semanal.*` (≥ 10 > < 10; alvos por nível) | **Confirma.** A pendência 1 do M0-R (Pelland 2026) fica conferida no resumo. |
| **Série indireta** | O método "fracionado" (indireta = 0,5) teve a evidência relativa mais forte entre os três testados (Pelland 2026). | `volume.serie-indireta.peso` = 0,5 | **Confirma.** Pode subir de moderada para robusta. |
| **Frequência** | Neutra para hipertrofia com volume igual; positiva para força (Pelland 2026; Schoenfeld 2019). | `frequencia.*` | **Confirma.** A frequência vira consequência da divisão escolhida (ver `01`). |
| **Proximidade da falha** | Falha não é superior a parar antes (Refalo 2023, meta-análise). Numa meta-regressão exploratória, a hipertrofia melhora quanto mais perto da falha, e a força não depende disso (Robinson 2024). O ACSM 2026 diz que treinar até a falha não mudou o resultado de forma consistente. | `rir.falha.nao-necessaria`; `rir.alvo` (1–3) | **Confirma.** Manter RIR 0–3 nos isoladores e 1–3 nos compostos. |
| **Carga (faixa de repetições)** | Todas as prescrições promoveram hipertrofia de forma parecida; carga alta é melhor para força (Currier 2023, rede com 119 estudos de hipertrofia; ACSM 2026). | `reps.equivalencia-cargas` (6–30) | **Confirma.** |
| **Descanso** | Pequena vantagem acima de 60 s; **nenhuma diferença apreciável acima de ~90 s** (Singer 2024, meta-análise bayesiana). | `descanso.por-tipo`: compostos 2–3 min para intermediário e avançado | **Ajuste 1:** baixar o padrão dos compostos para ~90–120 s em todos os níveis (2–3 min como opção). Economiza vários minutos por treino sem perda esperada. |
| **Ordem dos exercícios** | Não muda a hipertrofia; a força cresce mais no que vem primeiro (Nunes 2021, 11 estudos). | `ordem.sessao` | **Confirma.** |
| **Periodização** | Não muda a hipertrofia com volume igual (Moesgaard 2022, 35 estudos; Grgic 2017, 13 estudos); ajuda a força em treinados. O ACSM 2026 concorda. | Não há periodização no app | **Confirma** que o app não precisa de periodização para hipertrofia. Mantém simples. |
| **Progressão** | Progredir por repetições ou por carga deu resultados parecidos em 8 semanas (Plotkin 2022). | `progressao.*` (dupla progressão) | **Confirma.** |
| **Semana leve (deload)** | Uma semana leve no meio de 9 semanas não mudou a hipertrofia e **reduziu um pouco a força** (Coleman 2024, um estudo). | `deload.semana-leve` (só sugerida) | **Ajuste 2:** manter só sugerida e deixar claro que é para fadiga ou dor, não uma necessidade para crescer. |
| **Técnicas para economizar tempo** | Drop set: mesma hipertrofia em menos tempo, às vezes metade a um terço (Sødal 2023, meta-análise). Sistemas avançados: sem superioridade em hipertrofia; rest-pause com vantagem modesta (Tsartsapakis 2026). Séries pareadas: reduzem a duração em ~40–50% (Chien 2026, estudos agudos). | `tempo.corte` (escada: menos exercícios → aquecimento → bi-set → drop set → menos séries) | **Ajuste 3:** drop set e séries pareadas sobem na escada, antes de cortar exercício. Hoje o app só "sugere no texto" o drop set. |
| **Máquina ou peso livre** | Mesmo crescimento (Haugen 2023, 13 estudos); o tipo de equipamento não muda o resultado de forma consistente (ACSM 2026). | `selecao.estabilidade` | **Confirma.** Base para o gerador tratar máquina e peso livre como iguais (`planejamento/2026-11-catalogo-equipamentos.md`). |
| **Variar exercícios** | Variar de forma **sistemática** ajuda o crescimento regional; variar demais e ao acaso pode atrapalhar (Kassiano 2022, revisão com 8 estudos). | `selecao.variacao` | **Confirma.** |
| **Posição alongada** | Repetições parciais na posição alongada deram resultado parecido com a amplitude completa em treinados; a recomendação é **enfatizar a posição alongada** (Wolf 2025). | `selecao.amplitude` e afins | **Confirma.** Detalhe por músculo no tema 3. |
| **Sobrecarga na descida** | O ACSM 2026 cita a sobrecarga excêntrica entre o que melhora a hipertrofia. | Não existe no app | **Ajuste 4 (em estudo):** avaliar no tema 4 se cabe de forma segura, por exemplo uma descida mais lenta e mais pesada em máquinas. Não entra sem estudo próprio. |
| **Pessoas acima de 60 anos** | Um volume baixo já melhora bastante a função e a massa magra; para força, um volume maior ajuda (Radaelli 2025, metanálise em rede com 151 ensaios). | Sem regra por idade | Para o tema 5. Reforça não pedir idade enquanto não houver uma regra que a use. |
| **Mulheres** | Ganho relativo parecido com o dos homens (Roberts 2020, já citado no diagnóstico). | Sem regra por sexo | **Confirma**: não pedir sexo no perfil. |

## Fontes lidas nesta etapa (resumo-PubMed)
| Chave proposta | Referência | PMID |
|---|---|---|
| `acsm2026` (substitui a pendência) | Currier BS, D'Souza AC, Fiatarone Singh MA et al. ACSM Position Stand. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews. *Med Sci Sports Exerc* 2026;58(4):851-872. doi:10.1249/mss.0000000000003897 | 41843416 |
| `pelland2026` | Pelland JC, Remmert JF, Robinson ZP et al. The Resistance Training Dose Response… *Sports Med* 2026;56(2):481-505. doi:10.1007/s40279-025-02344-w | 41343037 |
| `ramoscampo2024` | Ramos-Campo DJ et al. Efficacy of Split Versus Full-Body Resistance Training… *J Strength Cond Res* 2024;38(7):1330-1340. doi:10.1519/jsc.0000000000004774 | 38595233 |
| `schoenfeld2019a` | Schoenfeld BJ, Grgic J, Krieger J. How many times per week should a muscle be trained… *J Sports Sci* 2019;37(11):1286-1295 | 30558493 |
| `schoenfeld2016a` | Schoenfeld BJ, Ogborn D, Krieger JW. Effects of Resistance Training Frequency… *Sports Med* 2016;46(11):1689-1697 | 27102172 |
| `currier2023` | Currier BS, Mcleod JC, Banfield L et al. Resistance training prescription… Bayesian network meta-analysis. *Br J Sports Med* 2023;57(18):1211-1220 | 37414459 |
| `refalo2023` | Refalo MC, Helms ER, Trexler ET et al. Influence of Resistance Training Proximity-to-Failure… *Sports Med* 2023;53(3):649-665 | 36334240 |
| `robinson2024` | Robinson ZP, Pelland JC, Remmert JF et al. Exploring the Dose-Response Relationship Between Estimated Resistance Training Proximity to Failure… *Sports Med* 2024;54(9):2209-2231 | 38970765 |
| `singer2024` | Singer A, Wolf M, Generoso L et al. Give it a rest… *Front Sports Act Living* 2024;6:1429789 | 39205815 |
| `nunes2021` | Nunes JP, Grgic J, Cunha PM et al. What influence does resistance exercise order have… *Eur J Sport Sci* 2021;21(2):149-157 | 32077380 |
| `moesgaard2022` | Moesgaard L, Beck MM, Christiansen L et al. Effects of Periodization… *Sports Med* 2022;52(7):1647-1666 | 35044672 |
| `grgic2017b` | Grgic J, Mikulic P, Podnar H et al. Effects of linear and daily undulating periodized… *PeerJ* 2017;5:e3695 | 28848690 |
| `plotkin2022` | Plotkin D, Coleman M, Van Every D et al. Progressive overload without progressing load?… *PeerJ* 2022;10:e14142 | 36199287 |
| `coleman2024` | Coleman M, Burke R, Augustin F et al. Gaining more from doing less? The effects of a one-week deload… *PeerJ* 2024;12:e16777 | 38274324 |
| `sodal2023` | Sødal LK, Kristiansen E, Larsen S et al. Effects of Drop Sets on Skeletal Muscle Hypertrophy… *Sports Med Open* 2023;9(1):66 | 37523092 |
| `tsartsapakis2026` | Tsartsapakis I, Zafeiroudi A, Kouthouris C et al. Effects of Advanced Resistance Training Systems… *J Funct Morphol Kinesiol* 2026;11(1):80 | 41718208 |
| `chien2026` | Chien KY, Chan TH, Lin TR et al. Effects of Different Paired-Set Configurations… *J Funct Morphol Kinesiol* 2026;11(3):370 | 42783664 |
| `haugen2023` | Haugen ME, Vårvik FT, Larsen S et al. Effect of free-weight vs. machine-based strength training… *BMC Sports Sci Med Rehabil* 2023;15(1):103 | 37582807 |
| `kassiano2022` | Kassiano W, Nunes JP, Costa B et al. Does Varying Resistance Exercises Promote Superior Muscle Hypertrophy… *J Strength Cond Res* 2022;36(6):1753-1762 | 35438660 |
| `wolf2025` | Wolf M, Androulakis Korakakis P, Piñero A et al. Lengthened partial repetitions elicit similar muscular adaptations… *PeerJ* 2025;13:e18904 | 39959841 |
| `radaelli2025` | Radaelli R, Rech A, Molinari T et al. Effects of Resistance Training Volume… in Older Adults… *Sports Med* 2025;55(1):167-192 | 39405023 |
| `plotkin2023` | Plotkin DL, Rodas MA, Vigotsky AD et al. Hip thrust and back squat training elicit similar gluteus muscle hypertrophy… *Front Physiol* 2023;14:1279170. doi:10.3389/fphys.2023.1279170 | 37877099 |
| `maeo2021` | Maeo S, Huang M, Wu Y et al. Greater Hamstrings Muscle Hypertrophy but Similar Damage Protection after Training at Long versus Short Muscle Lengths. *Med Sci Sports Exerc* 2021;53(4):825-837. doi:10.1249/mss.0000000000002523 | 33009197 |
| Ensaios de divisão | Schoenfeld 2015 (25932981); Zaroni 2019 (31260419); Lasevicius 2019 (31531139); Bartolomei 2021 (32168178); Evangelista 2021 (34468591) | — |

Ao aprovar, as chaves entram em `docs/pesquisa/fontes.md` com o status novo "resumo-PubMed" e a data. As que já existem lá mudam de status.
