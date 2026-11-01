# Mergulho nas paralelas (`mergulho`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** paralelas (`paralelas`, hoje ◐)
- **Função do T3:** empurrar (peito e tríceps), no nível de baixo da 1ª função de peito (com a flexão). Complexidade alta: só intermediário e avançado.
- **Frequência estimada:** 0 vaga na academia completa (o supino vem antes); dá uso às paralelas, que hoje não têm exercício. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Braços estendidos nas paralelas, ombros longe das orelhas | consenso | `nsca2021` (não verificado) |
| Descida | Tronco levemente inclinado à frente; desce até o braço ficar quase paralelo ao chão, sem dor no ombro | consenso | `nsca2021` (não verificado) |
| Subida | Empurra até estender os cotovelos sem travar | consenso | `nsca2021` (não verificado) |

## Por que assim
Nas paralelas, a ativação de pico do tríceps foi maior que no mergulho no banco, e o mergulho no banco exigiu mais extensão do ombro (McKenzie 2022; EMG; um estudo). Os autores chamam a atenção para quem tem histórico de dor no ombro. Por isso o exercício leva a articulação `ombro` (a triagem exclui) e complexidade 3 (só intermediário e avançado; `NIVEL_COMPLEXIDADE_MAX`).

## Erros a animar
1. **Descer demais** com o ombro rolando para a frente.
2. **Balançar** as pernas.
3. **Amplitude curta**.

## Músculos
Primários: peito e tríceps. Secundário: ombro anterior. Proposta: `peito`, `triceps`; secundário `ombro_anterior`.

## Como a carga sobe (para a progressão e a calibração do T6)
Peso do corpo: escada de degraus (`progressao.incremento.peso-corporal`) e depois carga externa (halter entre os pés ou cinto com anilha), em kg.

## Fontes
- `mckenzie2022`: McKenzie A, Crowley-McHattan Z, Meir R et al. Bench, Bar, and Ring Dips: Do Kinematics and Muscle Activity Differ? Int J Environ Res Public Health 2022;19(20):13211. PMID 36293792. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.
