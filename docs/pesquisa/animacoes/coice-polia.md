# Glúteo na polia com tornozeleira (coice) (`coice-polia`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** polia baixa + tornozeleira (`polia_*`, `acessorio_polia_tornozeleira`, hoje ◐)
- **Função do T3:** extensão de quadril para o glúteo (glúteos, 2ª função), no nível abaixo do hip thrust e da máquina.
- **Frequência estimada:** 0 vaga na academia completa (a máquina e o hip thrust vêm antes); entra quando só há polia e tornozeleira. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | De frente para a torre, mãos apoiadas nela, tornozeleira presa na perna que trabalha; polia no ponto mais baixo | consenso | `nsca2021` (não verificado) |
| Movimento | Leva a perna para trás com o joelho quase estendido até a coxa passar um pouco da linha do corpo; volta até a frente do corpo | um estudo (é o exercício do ensaio) | `attarieh2026` |
| Tronco | Levemente inclinado à frente, sem arquear a lombar no fim | consenso | `nsca2021` (não verificado) |

## Por que assim
É o exercício do ensaio de Attarieh 2026: 10 semanas, cerca de 10 séries por semana. A extensão de quadril na polia cresceu o glúteo máximo em 9% (mais na parte de baixo) e quase não cresceu o glúteo médio e o mínimo (+2%) (um estudo).

## Erros a animar
1. **Arquear a lombar** para levar a perna mais longe.
2. **Dobrar o joelho** e transformar em flexora.
3. **Embalar** o tronco.

## Músculos
Primário: glúteos. Secundário: posteriores. Proposta: `gluteos`; secundário `posteriores`; padrão `extensao-quadril`; unilateral.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número), +1 placa por vez (`progressao.incremento.polia`).

## Fontes
- `attarieh2026`: Attarieh P, Nunes JP, Khani S et al. Regional Hypertrophy of the Gluteal Muscles Is Task-Specific: Differential Responses to 10 Weeks of Hip Extension Versus Hip Abduction Training. J Strength Cond Res 2026 (publicado on-line antes da versão impressa). PMID 42842490. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (20/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/coice-polia.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos e a biblioteca (glúteos); a nota, dos erros "Arquear a lombar" e "Dobrar o joelho" (vira uma flexora) e das linhas Movimento e Tronco | consenso; o joelho quase estendido e a coxa um pouco além da linha do corpo, um estudo (é o exercício do ensaio) | `nsca2021` (não verificado); `attarieh2026` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição, Tronco e Movimento (o joelho quase estendido) da tabela de técnica | consenso; o joelho, um estudo | `nsca2021` (não verificado); `attarieh2026` |
| Variações (`vary`) | linhas Movimento e Tronco e o erro "Embalar" (a ficha não traz variação: o `vary` só diz o que não muda) | consenso; o movimento, um estudo | `nsca2021` (não verificado); `attarieh2026` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/coice-polia.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a seção Músculos dá os posteriores como secundário; a biblioteca não tem secundário, e o `feel` seguiu a biblioteca (já em `docs/revisoes/animacoes-restantes/pedidos-ao-conteudo.md`, seção 2). A ficha não dá número para o "joelho quase estendido" nem para o "um pouco além da linha do corpo", nem diz a altura das mãos na torre: a animação, em pé como pedem a ficha e o cartão, ficou com o joelho a 8° o ciclo todo, a coxa 8,9° além da linha do corpo e a bacia 3,9° mais alta do lado que trabalha, para o pé passar sem tocar o chão (de desenho; `docs/revisoes/animacao-nova/lote-C3/coice-polia.md`); o texto não fala da bacia. A ficha não traz variação. O cartão não tem montagem. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.
