# Lote 1: agachamentos, afundos e búlgaros

Começado em 15/11/2026, depois de o Gustavo fechar o corpo. São as 10 animações de hoje desta família; o goblet é uma das quatro âncoras e já está feito.

| Animação | Estado | O que exige de novo |
|---|---|---|
| `goblet` | âncora, pronta; falta a aprovação na folha | nada |
| `agachamento-peso-corpo` | **aprovada pelo Gustavo em 15/11/2026** ("aprovada"); conferência escrita em [agachamento-peso-corpo.md](agachamento-peso-corpo.md). Registrada em `src/engine/novo/aprovados.ts`; falta ligar o motor novo às telas e gravar a linha de base visual | nada |
| `agachamento-elastico` | **aprovada pelo Gustavo em 15/11/2026** ("aprovada"); conferência escrita em [agachamento-elastico.md](agachamento-elastico.md). Registrada em `src/engine/novo/aprovados.ts`; falta ligar às telas | feito: o elástico em tubo com pegadores, com as medidas do fabricante |
| `afundo` | **aprovada pelo Gustavo em 15/11/2026** ("aprovada"); conferência escrita em [afundo.md](afundo.md). Registrada em `src/engine/novo/aprovados.ts`; falta ligar às telas | feito: os halteres pendendo ao lado do corpo, sobre a peça comum dos afundos estáticos (`afundo-estatico.ts`) |
| `afundo-peso-corpo` | **aprovada pelo Gustavo em 15/11/2026** ("aprovada"); conferência escrita em [afundo-peso-corpo.md](afundo-peso-corpo.md). Registrada em `src/engine/novo/aprovados.ts`; falta ligar às telas | feito: o núcleo dos afundos (`afundar.ts`) |
| `afundo-tras-peso-corpo` | **aprovada pelo Gustavo em 15/11/2026** ("aprovada, segue para o búlgaro"); conferência em [afundo-tras-peso-corpo.md](afundo-tras-peso-corpo.md) | feito: o passo, com o pé de trás passando pelo ar |
| `afundo-kettlebell` | **aprovada pelo Gustavo em 15/11/2026** ("aprovada"); conferência escrita em [afundo-kettlebell.md](afundo-kettlebell.md). Registrada em `src/engine/novo/aprovados.ts`; falta ligar às telas | feito: o kettlebell com as medidas do fabricante |
| `bulgaro` | **aprovada pelo Gustavo em 15/11/2026** ("Eu estou aprovando e gostando de tudo que você está fazendo"); conferência em [bulgaro.md](bulgaro.md) | feito: o pé de trás no banco (núcleo dos búlgaros), a coluna como cenário |
| `bulgaro-peso-corpo` | feita por subagente e conferida por quem integra em 15/11/2026; **aprovada por delegação** (risco baixo); conferência em [bulgaro-peso-corpo.md](bulgaro-peso-corpo.md) | feito: a cadeira encostada na parede |
| `bulgaro-suspensao` | feita por subagente e conferida por quem integra em 15/11/2026; **para o Gustavo ver** (risco médio); conferência em [bulgaro-suspensao.md](bulgaro-suspensao.md) | feito: a fita de suspensão (peça reutilizável) |

Ritual de cada animação (seção 6 do `prompt-continuacao.md`): reler as correções já feitas dela; a ficha de movimento a partir da ficha da técnica; as poses; a conferência automática sem falha; a conferência escrita "o que a fonte pede × o que o boneco faz (medido) × confere?"; a folha ao lado da de hoje. Nada entra no app sem a aprovação do Gustavo na folha.

Os agachamentos usam o núcleo comum `src/engine/novo/exercicios/agachar.ts` (os pés, a flexão do joelho e o equilíbrio do corpo com a carga). Os afundos e os búlgaros vão precisar de um núcleo próprio: as duas pernas fazem coisas diferentes e o apoio é um pé à frente e outro atrás.
