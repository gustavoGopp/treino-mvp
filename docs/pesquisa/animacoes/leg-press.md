# Leg press (`leg-press`)

Exercício da biblioteca: `leg-press` (padrão agachar). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Encosto e assento ajustados para o quadril ficar apoiado no fundo do movimento. Anilhas iguais dos dois lados. | consenso | `nsca2021` (não verificado) |
| Posição | Costas e quadril apoiados, pés no meio da plataforma, na largura do quadril ou dos ombros. Mãos nos pegadores. | consenso | `nsca2021` (não verificado) |
| Descida | ~2–3 s. Dobra os joelhos até passarem de 90°, sem o quadril descolar do assento. | consenso | `nsca2021` (não verificado) |
| Subida | Empurra a plataforma até quase estender os joelhos, sem travar. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Solte a trava de segurança só com os pés firmes na plataforma e trave de novo antes de tirar os pés. Nunca ponha as mãos nos joelhos nem entre a plataforma e o batente. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **agachar** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, o agachamento no hack (`hack`).

## Erros do cartão
1. **Descer pouco**: Amplitude curta com carga alta trabalha menos a coxa.
2. **Quadril descola no fundo**: A lombar arredonda e recebe a carga: desça só até onde o quadril fica apoiado.
3. **Travar os joelhos**: Esticar com força no topo joga a carga na articulação.
4. **Joelhos para dentro**: Fechar os joelhos na subida.

## Músculos
Na biblioteca: primário `quadriceps`; secundários: gluteos, adutores.

## Como a carga sobe
Registre os kg de anilhas de cada lado (sem contar o trenó ou a barra da máquina). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/leg-press.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: quadríceps; glúteos e adutores) e o alvo do cartão; a nota, do erro "Quadril descola no fundo" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Posição (os pés na largura do quadril ou dos ombros), linhas Descida e Subida e o erro "Joelhos para dentro" (as dicas do cartão) | consenso | `nsca2021` (não verificado) |
| Nota (`note`) | a regulagem da linha Preparo (encosto e assento para o quadril ficar apoiado no fundo) e a montagem do cartão, num texto só | consenso | `nsca2021` (não verificado); `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/leg-press.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não dá o ângulo do encosto nem da chapa (na animação, o encosto a 40° é derivado do corpo e a chapa 10° mais em pé vem do desenho do equipamento) e não cita estudo. A seção Músculos só repete os ids da biblioteca, sem selo próprio.
