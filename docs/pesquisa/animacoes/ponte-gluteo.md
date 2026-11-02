# Ponte de glúteo (peso do corpo) (`ponte-gluteo`)

Exercício da biblioteca desde antes do R0c, sem animação nem cartão até a auditoria do treino (02/11/2026), que o achou entre os mais prescritos (`docs/revisoes/auditoria/inventario.md`). **Ficha de técnica para o cartão de texto; a animação, se vier, sai desta ficha.**

- **Equipamento:** nenhum (o chão; um colchonete ajuda)
- **Função:** extensão de quadril para o glúteo (`extensao-quadril`, nível 2), atrás do hip thrust e do glúteo na máquina

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Deitado de costas, joelhos dobrados, pés no chão na largura do quadril, calcanhares a cerca de um palmo dos glúteos; braços ao lado do corpo | consenso | `nsca2021` (não verificado) |
| Subida | Empurra o chão pelos calcanhares até ombros, quadril e joelhos ficarem em linha; pausa de ~1 s no topo | consenso | `nsca2021` (não verificado) |
| Coluna | O quadril é que sobe: sem arquear a lombar no topo; costelas para baixo | consenso | `nsca2021` (não verificado) |
| Descida | Controlada, até o quadril quase encostar no chão | consenso | `nsca2021` (não verificado) |

## Por que assim
Num ensaio de 9 semanas, hip thrust e agachamento cresceram o glúteo de forma parecida (Plotkin 2023; um estudo). A ponte com barra teve EMG de glúteo maior que o hip thrust (Kennedy 2024), mas EMG não mede crescimento: a ponte fica como alternativa equivalente na mesma função (consenso). Sem carga, ela depende da escada de dificuldade (mais repetições, pausa, uma perna) ou do halter sobre o quadril (`ponte-gluteo-halter`).

## Erros comuns
1. **Arquear a lombar** no topo em vez de estender o quadril.
2. **Empurrar pela ponta dos pés**: o calcanhar sai do chão.
3. **Joelhos caindo para dentro** na subida.
4. **Subir pouco**: o quadril não alinha com o tronco e as coxas.

## Músculos
Primário: glúteos. **Sem secundário** desde a revisão de anatomia (02/11/2026, achado 1): no hip thrust, com o joelho dobrado como na ponte, os posteriores quase não cresceram (Plotkin 2023, `plotkin2023`; **um estudo**). A ponte segue o hip thrust por ter a mesma posição do joelho (consenso, inferência do projeto). Detalhes em `docs/revisoes/anatomia.md`.

## Como a carga sobe
Peso do corpo, pela escada de dificuldade (`progressao.incremento.peso-corporal`): mais repetições, pausa no topo, uma perna só e, com halteres, a ponte com halter.

## Fontes
- `plotkin2023`: Plotkin DL et al. Hip thrust and back squat training elicit similar gluteus muscle hypertrophy… Front Physiol 2023;14:1279170. PMID 37877099.
- `kennedy2024`: Kennedy D et al. Electromyographic differences… between the barbell hip thrust and barbell glute bridge. Sports Biomech 2024. PMID 35586943.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.
