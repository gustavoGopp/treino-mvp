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

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/goblet-kettlebell.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (quadríceps; glúteos) e a biblioteca (que soma os adutores); a nota, da linha Movimento ("o mais fundo possível sem dor") e do erro "Calcanhar sai do chão" | consenso | mesma técnica do `goblet` aprovado; `kubo2019` (profundidade) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Pegada e Cotovelos da tabela; a posição do cartão | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Movimento e Cotovelos da tabela | consenso | `kubo2019`; `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/goblet-kettlebell.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a seção Músculos da ficha diz só glúteos como secundário; a biblioteca soma os adutores, e o `feel` seguiu a biblioteca. A ficha não diz o que varia de pessoa para pessoa além da profundidade.
