# Glúteo na máquina (coice) (`coice-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** máquina de glúteo (`gluteo_maquina`, novo)
- **Função do T3:** extensão de quadril para o glúteo (glúteos, 2ª função). Selo da função no T3: um estudo.
- **Frequência estimada:** 0,75 vaga por semana na academia completa. Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Tronco apoiado (peito ou antebraços na almofada), um pé na plataforma ou na alavanca; o outro joelho apoiado | consenso | `nsca2021` (não verificado) |
| Movimento | Empurra para trás estendendo o quadril até a coxa alinhar com o tronco; volta até o quadril dobrar ~90° | consenso | `nsca2021` (não verificado) |
| Coluna | A lombar não arqueia no fim; o movimento é do quadril | consenso | `nsca2021` (não verificado) |

## Por que assim
Num ensaio com 17 pessoas, a extensão de quadril unilateral **na polia** cresceu mais o glúteo máximo que a abdução (+9% × +5%), sobretudo a parte de baixo, medido em ressonância (Attarieh 2026; um estudo). A máquina faz o mesmo movimento com apoio. Aplicar o resultado a ela é inferência (selo: consenso).

## Erros a animar
1. **Arquear a lombar** para subir mais a perna.
2. **Girar o quadril** para o lado.
3. **Soltar** a volta sem controle.

## Músculos
Primário: glúteos. Secundário: posteriores. Proposta: `gluteos`; secundário `posteriores`; padrão `extensao-quadril`; unilateral.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número), como a polia. Em máquinas de anilha, kg de anilha por passos.

## Fontes
- `attarieh2026`: Attarieh P, Nunes JP, Khani S et al. Regional Hypertrophy of the Gluteal Muscles Is Task-Specific: Differential Responses to 10 Weeks of Hip Extension Versus Hip Abduction Training. J Strength Cond Res 2026 (publicado on-line antes da versão impressa). PMID 42842490. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/coice-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos e a biblioteca (glúteos); a nota, do erro "Arquear a lombar" e da linha Coluna | consenso | `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição e Coluna da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linha Posição (o peito ou os antebraços na almofada; o pé na plataforma ou na alavanca), linhas Movimento e Coluna e o erro "Girar o quadril" | consenso | `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/coice-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a seção Músculos dá os posteriores como secundário; a biblioteca não tem secundário, e o `feel` seguiu a biblioteca (anotado em `pedidos.md`). O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor. A ficha não diz como regular a máquina (a conferência da animação subiu a almofada dos joelhos até o quadril cair na linha do eixo, `docs/revisoes/animacao-nova/lote-C1/coice-maquina.md`); como o cartão não tem montagem, o texto não fala disso. O cartão e a ficha descrevem a máquina de quatro apoios; o desenho do equipamento (`public/equipamento/gluteo_maquina.svg`) é de uma máquina em pé (anotado em `pedidos.md`). O erro "Soltar a volta" não tem desenho (está em `SEM_DESENHO`): o texto o mantém.
