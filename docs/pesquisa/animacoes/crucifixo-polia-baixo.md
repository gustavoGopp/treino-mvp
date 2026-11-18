# Crucifixo na polia de baixo para cima (`crucifixo-polia-baixo`)

Exercício da biblioteca: `crucifixo-polia-baixo` (padrão isolador-peito). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | As duas polias embaixo, um estribo em cada. | consenso | `nsca2021` (não verificado) |
| Posição | Em pé no meio das torres, um pé à frente, tronco reto. Braços ao lado do corpo, um pouco atrás, cotovelos levemente dobrados. | consenso | `nsca2021` (não verificado) |
| Subida | Leva as mãos para a frente e para cima, até se encontrarem na altura do peito ou do queixo. | consenso | `nsca2021` (não verificado) |
| Volta | ~2 s. Volta abrindo os braços até sentir o peito alongar. | consenso | `nsca2021` (não verificado) |

## Por que assim
Entra na biblioteca como **empurrar inclinado, crucifixo (peito alongado)** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
- `selecao.crucifixo-complemento` (selo: um estudo; fontes em `../regras.md`): Crucifixo ou voador (peito alongado) como complemento do empurrar, não como substituto.
- `selecao.peitoral-inclinado` (selo: um estudo; fontes em `../regras.md`): Incluir uma variação inclinada para a porção superior do peitoral (razoável, não obrigatória).
A técnica segue, por analogia, o crucifixo na polia (`crucifixo-polia`).

## Erros do cartão
1. **Dobrar e esticar os cotovelos**: Vira um empurrar e tira o trabalho do peito.
2. **Balançar o tronco**: Usar o corpo para subir a carga.
3. **Encolher os ombros**: Subir os ombros junto leva o trabalho para o trapézio.

## Músculos
Na biblioteca: primário `peito`; secundários: ombro_anterior.

## Como a carga sobe
Registre o número da placa da torre. Para progredir, +1 placa.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/crucifixo-polia-baixo.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: peito; ombro anterior) e o alvo do cartão (parte de cima); a nota, dos erros "Encolher os ombros" e "Dobrar e esticar os cotovelos" | consenso | `nsca2021` (não verificado); `selecao.peitoral-inclinado` (um estudo) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Subida da tabela ("na altura do peito ou do queixo") | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/crucifixo-polia-baixo.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não diz o que varia de pessoa para pessoa; o `vary` usa a altura das mãos que o cartão já dá. A seção Músculos só repete os ids da biblioteca, sem selo próprio.
