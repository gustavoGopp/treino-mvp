# Supino sentado na máquina (`supino-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** supino na máquina ou supino articulado (`supino_maquina`, novo)
- **Função do T3:** empurrar horizontal (peito, 1ª função). Selo da função no T3: um estudo.
- **Frequência estimada:** 0,31 vaga por semana na academia completa. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Ajuste | Banco na altura em que os pegadores ficam na linha do meio do peito | consenso | `nsca2021` (não verificado) |
| Posição | Costas e escápulas apoiadas, pés no chão | consenso | `nsca2021` (não verificado) |
| Movimento | Empurra até quase estender os cotovelos, sem travar; volta até um alongamento confortável do peito | consenso | `nsca2021` (não verificado) |
| Cotovelos | ~30–60° do tronco | consenso | `tecnica.supino-halteres.cotovelos` por analogia |

## Por que assim
Máquina e peso livre deram o mesmo ganho de tamanho e de força num ensaio que mediu cada músculo (Hernández-Belmonte 2023) e numa meta-análise (Haugen 2023) (robusta). A máquina é mais estável, o que favorece o iniciante (`selecao.estabilidade`).

## Erros a animar
1. **Banco baixo ou alto demais** (pegador fora da linha do peito).
2. **Tirar as costas** do encosto.
3. **Travar os cotovelos** com força.

## Músculos
Primário: peito. Secundários: ombro anterior e tríceps. Na biblioteca: `peito`; secundários `ombro_anterior`, `triceps`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número); na articulada de anilhas, kg de anilhas por lado, por passos.

## Fontes
- `hernandezbelmonte2023`: Hernández-Belmonte A, Martínez-Cava A, Buendía-Romero Á et al. Free-Weight and Machine-Based Training Are Equally Effective on Strength and Hypertrophy: Challenging a Traditional Myth. Med Sci Sports Exerc 2023;55(12):2316-2327. PMID 37535335. Resumo lido no PubMed em 01/11/2026.
- `haugen2023`: Haugen ME, Vårvik FT, Larsen S et al. Effect of free-weight vs. machine-based strength training on maximal strength, hypertrophy and jump performance – a systematic review and meta-analysis. BMC Sports Sci Med Rehabil 2023;15(1):103. PMID 37582807. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/supino-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (peito; ombro anterior e tríceps; igual à biblioteca); a nota, dos erros "Banco na altura errada" e "Tirar as costas" e da linha Ajuste | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Ajuste, Posição e Cotovelos da tabela de técnica | consenso | `nsca2021` (não verificado); `tecnica.supino-halteres.cotovelos` (por analogia) |
| Variações (`vary`) | linha Cotovelos (~30–60° do tronco) e as linhas Ajuste, Posição e Movimento | consenso | `nsca2021` (não verificado); `tecnica.supino-halteres.cotovelos` (por analogia) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/supino-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a altura do banco foi para a conferência. A ficha não diz onde fica o eixo da máquina nem quanto o pegador sobe no caminho (a animação pôs o eixo acima da cabeça, de desenho). O desenho do equipamento de hoje é de anilhas, e a animação é de pilha (o `carga` do cartão já fala das duas). O erro 1 da ficha ("Banco baixo ou alto demais") tem outro título no cartão ("Banco na altura errada"); o texto seguiu o cartão. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.
