# Agachamento no hack (agachamento articulado) (`hack`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** hack (`hack`, novo)
- **Função do T3:** agachar (quadríceps, 1ª função). Selo da função no T3: um estudo.
- **Frequência estimada:** 0,38 vaga por semana na academia completa. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Costas e ombros apoiados no encosto, ombros sob as almofadas; pés no meio da plataforma, na largura do quadril ou dos ombros | consenso | `nsca2021` (não verificado) |
| Trava | Solta a trava de segurança antes da 1ª repetição e trava de novo ao terminar | consenso | `nsca2021` (não verificado); `seguranca-t5` |
| Profundidade | Desce até o joelho passar de 90°, sem a lombar descolar do encosto | consenso (por analogia com o agachamento completo, `kubo2019`; inferência) | `kubo2019` |
| Joelhos | Na direção dos pés, sem fechar para dentro | consenso | `nsca2021` (não verificado) |
| Cadência | ~2–3 s descendo; sobe sem travar os joelhos no topo | moderada | `cadencia.repeticao` |

## Por que assim
Com o tronco apoiado, o hack permitiu cargas maiores e ativou menos os músculos do tronco que o agachamento livre (Clark 2019, 10 homens, EMG; selo: um estudo; EMG não mede crescimento). Num ensaio com 70 mulheres, um programa que alternava leg press, hack e agachamento no smith cresceu a coxa tanto quanto repetir sempre o leg press (Kassiano et al. 2025, *Res Q Exerc Sport*; um estudo). Máquina e peso livre dão o mesmo crescimento (Haugen 2023; robusta). Para quem quer só treinar a perna, sem pedir equilíbrio do tronco, o hack é uma opção equivalente ao agachamento livre.

## Erros a animar
1. **Descer pouco** (amplitude curta).
2. **Lombar descola** do encosto no fundo.
3. **Joelhos para dentro**.
4. **Travar os joelhos** com força no topo.

## Músculos
Primários: quadríceps e glúteos. Secundário: adutores. Na biblioteca: `quadriceps`; secundário `gluteos`.

## Como a carga sobe (para a progressão e a calibração do T6)
Anilhas no trenó, registradas como **kg de anilhas por lado**. O peso do trenó é desconhecido e varia por fabricante. Por isso a calibração do T6 não usa a fórmula: sobe e desce em passos do menor par de anilhas (ver o `08`, seção 1).

## Fontes
- `clark2019`: Clark DR, Lambert MI, Hunter AM. Trunk Muscle Activation in the Back and Hack Squat at the Same Relative Loads. J Strength Cond Res 2019;33 Suppl 1:S60-S69. PMID 28704312. Resumo lido no PubMed em 01/11/2026.
- `kassiano2025var`: Kassiano W, Costa B, Kunevaliki G et al. Muscle Hypertrophy and Strength Adaptations to Systematically Varying Resistance Exercises. Res Q Exerc Sport 2025;96(2):371-381. PMID 39388663. Resumo lido no PubMed em 01/11/2026.
- `haugen2023`: Haugen ME, Vårvik FT, Larsen S et al. Effect of free-weight vs. machine-based strength training on maximal strength, hypertrophy and jump performance – a systematic review and meta-analysis. BMC Sports Sci Med Rehabil 2023;15(1):103. PMID 37582807. Resumo lido no PubMed em 01/11/2026.
- `kubo2019`: Kubo K, Ikebukuro T, Yata H et al. Effects of squat training with different depths on lower limb muscle volumes. Eur J Appl Physiol 2019;119(9):1933-1942. PMID 31230110. Resumo lido no PubMed em 01/11/2026.
- `seguranca-t5`: Cartão de "montagem segura" aprovado no T5 (`docs/pesquisa-v2/06-populacoes-e-seguranca.md`); consenso do projeto.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/hack.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (quadríceps e glúteos; adutores) e a biblioteca; a nota, do erro "Lombar descola" e da linha Profundidade | consenso | `nsca2021` (não verificado); `kubo2019` (a profundidade, por analogia) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Trava, Posição e Joelhos da tabela de técnica | consenso | `nsca2021` (não verificado); `seguranca-t5` |
| Variações (`vary`) | linha Posição (os pés na largura do quadril ou dos ombros), linhas Profundidade e Joelhos e o erro "Travar os joelhos" | consenso | `nsca2021` (não verificado); `kubo2019` (por analogia) |
| Nota (`note`) | a montagem do cartão (a linha Trava) | consenso | `nsca2021` (não verificado); `seguranca-t5` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/hack.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a linha "Na biblioteca" diz só os glúteos como secundário; a biblioteca já soma os adutores, como a própria seção Músculos ("Secundário: adutores"), e o `feel` seguiu a biblioteca. A ficha não diz o ângulo da chapa dos pés (na animação, 15°, do desenho do equipamento, sem fonte). A linha Cadência (~2–3 s descendo; moderada) não está no cartão, e o texto do guia não a acrescentou. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.
