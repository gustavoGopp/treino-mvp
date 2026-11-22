# Abdução de quadril na polia com tornozeleira (`abducao-polia`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** polia baixa + tornozeleira (`polia_*`, `acessorio_polia_tornozeleira`)
- **Função do T3:** abdução de quadril (glúteos, 3ª função).
- **Frequência estimada:** 0,38 vaga por semana na academia completa (divide a vaga com a máquina). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Em pé, de lado para a torre, tornozeleira na perna mais longe da polia; mão na torre para equilíbrio; polia no ponto mais baixo | consenso | `nsca2021` (não verificado) |
| Movimento | Leva a perna para o lado, cruzando a outra na volta, com o joelho estendido e o pé apontando para a frente | um estudo (é o exercício do ensaio) | `attarieh2026` |
| Tronco | Reto, sem inclinar para o lado oposto | consenso | `nsca2021` (não verificado) |

## Por que assim
É o exercício de abdução do ensaio de Attarieh 2026 (10 semanas, ressonância): cresceu a parte de cima do glúteo máximo (+10% na região proximal) e pouco o glúteo médio e o mínimo (+4%) (um estudo).

## Erros a animar
1. **Inclinar o tronco** para o lado.
2. **Girar o pé para fora** (vira outro movimento).
3. **Embalar** a perna.

## Músculos
Primário: glúteos. Proposta: `gluteos`; padrão `abducao-quadril`; unilateral.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número).

## Fontes
- `attarieh2026`: Attarieh P, Nunes JP, Khani S et al. Regional Hypertrophy of the Gluteal Muscles Is Task-Specific: Differential Responses to 10 Weeks of Hip Extension Versus Hip Abduction Training. J Strength Cond Res 2026 (publicado on-line antes da versão impressa). PMID 42842490. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (20/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/abducao-polia.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (glúteos; igual à biblioteca), o alvo do cartão ("médio e parte de cima") e "Por que assim" (cresceu a parte de cima do glúteo máximo); a nota, dos erros "Inclinar o tronco" e "Girar o pé para fora" (vira outro movimento) e da linha Tronco | um estudo (a parte de cima do glúteo); consenso (a nota) | `attarieh2026`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição, Tronco e Movimento (o pé apontando para a frente) da tabela de técnica | consenso; o pé para a frente, um estudo | `nsca2021` (não verificado); `attarieh2026` |
| Variações (`vary`) | linhas Posição (a mão na torre para equilíbrio), Movimento e Tronco e o erro "Embalar" (a ficha não traz variação: o `vary` só diz o que não muda) | consenso; o movimento, um estudo | `nsca2021` (não verificado); `attarieh2026` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/abducao-polia.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não dá número para a abertura nem para o quanto a perna cruza na volta (a animação vai de 7,6° cruzada a 30° aberta, de desenho) e não diz onde fica a outra mão (a animação a pôs na cintura; o texto não fala dela). A ficha não traz variação. O cartão não tem montagem. O erro "Embalar a perna" não tem desenho (está em `SEM_DESENHO`): o texto o mantém. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.
