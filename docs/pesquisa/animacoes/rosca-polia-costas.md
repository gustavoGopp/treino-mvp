# Rosca na polia baixa, de costas para a torre (`rosca-polia-costas`)

Exercício da biblioteca: `rosca-polia-costas` (padrão isolador-biceps). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Polia embaixo, com o estribo. | consenso | `nsca2021` (não verificado) |
| Posição | De costas para a torre, um passo à frente, com o estribo numa mão. O braço fica um pouco atrás do corpo, palma para a frente. | consenso | `nsca2021` (não verificado) |
| Subida | Dobra o cotovelo até a mão chegar perto do ombro, com o cotovelo parado atrás do corpo. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Desce até o braço quase estender, atrás do corpo. | consenso | `nsca2021` (não verificado) |

## Por que assim
Entra na biblioteca como **bíceps** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
Nenhuma regra de seleção própria: a técnica abaixo é consenso de treinadores, e a ficha não cita estudo.
A técnica segue, por analogia, a rosca na polia (`rosca-polia`).

## Erros do cartão
1. **Trazer o cotovelo para a frente**: Perde a posição alongada, que é o motivo deste exercício.
2. **Girar o tronco**: Rodar o corpo para ajudar a subir.
3. **Carga demais**: Se o ombro for para a frente, a carga está alta.

## Músculos
Na biblioteca: primário `biceps`; secundários: nenhum.

## Como a carga sobe
Registre o número da placa da torre. Para progredir, +1 placa.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/rosca-polia-costas.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: bíceps, sem secundário) e a amplitude do cartão ("bíceps alongado"); a nota, dos erros "Carga demais" e "Trazer o cotovelo para a frente" | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo e Posição da tabela | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Subida e Descida da tabela e o erro "Girar o tronco" | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/rosca-polia-costas.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não diz nada que varie de pessoa para pessoa: o `vary` só traz o que não muda. A seção Músculos só repete os ids da biblioteca, sem selo próprio.
