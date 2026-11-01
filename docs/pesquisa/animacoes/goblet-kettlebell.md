# Agachamento goblet com kettlebell (`goblet-kettlebell`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** kettlebell (`kettlebell`, novo)
- **Função do T3:** agachar (quadríceps, nível de baixo, junto com o goblet com halter).
- **Frequência estimada:** 0,50 vaga por semana na casa com extras (divide com o goblet com halter). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Pegada | Kettlebell junto ao peito, mãos nas laterais da alça, base para baixo | consenso | `nsca2021` (não verificado) |
| Movimento | Igual ao goblet com halter aprovado: desce entre os joelhos o mais fundo possível sem dor, tronco ereto | consenso | mesma técnica do `goblet` aprovado; `kubo2019` para a profundidade |
| Cotovelos | Apontando para baixo, entre os joelhos no fundo | consenso | `nsca2021` (não verificado) |

## Por que assim
É o mesmo movimento do `goblet`, com outro objeto de carga. **Não achei estudo comparando kettlebell e halter no agachamento**. A equivalência vem da regra de que o tipo de carga não muda o crescimento se a série chega perto da falha (`selecao.equivalencia-equipamento`; moderada).

## Erros a animar
1. **Tronco tomba** para a frente.
2. **Descer pouco**.
3. **Calcanhar sai do chão**.

## Músculos
Primário: quadríceps. Secundário: glúteos. Na biblioteca: `quadriceps`; secundário `gluteos`.

## Como a carga sobe (para a progressão e a calibração do T6)
**Peso do kettlebell**, da lista que a pessoa tem (atributo `pesosKg`), como nos halteres fixos. Os saltos costumam ser grandes (por exemplo 8 → 12 → 16 kg [opinião]): a escada de carga leve (`equipamento.escada-carga-leve`) entra antes de subir.

## Fontes
- `kubo2019`: Kubo K, Ikebukuro T, Yata H et al. Effects of squat training with different depths on lower limb muscle volumes. Eur J Appl Physiol 2019;119(9):1933-1942. PMID 31230110. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.
