# Panturrilha no leg press (`panturrilha-leg-press`)

Exercício da biblioteca: `panturrilha-leg-press` (padrão panturrilha). **Cartão de texto, sem animação**: a ficha foi escrita em 12/11/2026, na sessão que corrigiu a auditoria geral, porque o exercício aparecia como "Sem guia ainda". **Para a revisão do Gustavo.**

## Técnica do cartão
| Ponto | O que o cartão diz | Selo | Fonte |
|---|---|---|---|
| Preparo | Leg press com a trava de segurança fechada durante toda a série. Anilhas iguais dos dois lados. | consenso | `nsca2021` (não verificado) |
| Posição | Costas e quadril apoiados, joelhos estendidos, sem travar. Só a ponta dos pés na borda de baixo da plataforma, calcanhares para fora. | consenso | `nsca2021` (não verificado) |
| Descida | ~2 s. Deixa os calcanhares descerem até a panturrilha alongar bem. | consenso | `nsca2021` (não verificado) |
| Embaixo | Segura 1 s alongado. | consenso | `nsca2021` (não verificado) |
| Subida | Empurra com a ponta dos pés o máximo que conseguir. | consenso | `nsca2021` (não verificado) |
| Montagem segura | Mantenha a trava de segurança fechada: com só a ponta dos pés na plataforma, o pé pode escapar. Pés secos e tênis que não escorrega. | consenso | `seguranca.montagem` |

## Por que assim
Entra na biblioteca como **panturrilha em pé** (as funções de `src/domain/gerador/funcoes.json`; a escolha por função está em `../../pesquisa-v2/04-exercicios-por-musculo.md`).
- `selecao.alongado` (selo: moderada; fontes em `../regras.md`): Quando há opção com o músculo mais alongado e evidência para aquele músculo, ela vem primeiro na função.
- `selecao.panturrilha-alongada` (selo: um estudo; fontes em `../regras.md`): Panturrilha com ênfase no alongamento (calcanhar abaixo do apoio, pausa embaixo), de preferência em pé.
A técnica segue, por analogia, a panturrilha no step (`panturrilha`) e a regra `selecao.panturrilha-alongada`.

## Erros do cartão
1. **Movimento curto**: Subir e descer só um pouco, com carga alta.
2. **Dobrar os joelhos**: Usar as coxas para empurrar a plataforma.
3. **Quicar embaixo**: Bater e voltar sem a pausa tira o trabalho da parte alongada.

## Músculos
Na biblioteca: primário `panturrilha`; secundários: nenhum.

## Como a carga sobe
Registre os kg de anilhas de cada lado (sem contar o trenó ou a barra da máquina). Para progredir, o menor par de anilhas.

## Fontes
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/panturrilha-leg-press.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (na biblioteca: panturrilha, sem secundário); a nota, do erro "Dobrar os joelhos" e das linhas Posição e Subida | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Preparo, Posição e Montagem segura da tabela | consenso | `nsca2021` (não verificado); `seguranca.montagem` |
| Variações (`vary`) | linhas Descida, Embaixo e Subida e o erro "Quicar embaixo"; a pausa embaixo segue a regra da panturrilha alongada | consenso; um estudo (a regra) | `nsca2021` (não verificado); `selecao.panturrilha-alongada` |
| Nota (`note`) | a montagem do cartão, num texto só (a trava fechada a série inteira; pés secos e tênis que não escorrega) | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/panturrilha-leg-press.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha (escrita em 12/11 para tirar o "Sem guia ainda") não diz nada que varie de pessoa para pessoa: o `vary` só traz o que não muda. A seção Músculos só repete os ids da biblioteca, sem selo próprio. O erro "Quicar embaixo" não tem desenho (está em `SEM_DESENHO`): o texto o mantém, e o `vary` repete a pausa embaixo.
