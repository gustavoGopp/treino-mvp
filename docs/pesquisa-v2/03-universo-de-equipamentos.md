# 3. Universo de equipamentos (primeira versão, 01/11/2026)

> Objetivo: listar o que academias, condomínios e casas costumam ter, sem partir do equipamento do Gustavo, e organizar para o gerador. **Não há lista oficial** de aparelhos por academia no Brasil. As fontes abaixo são guias de condomínio, páginas de rede de academia e lojas. Por isso, a classificação de "comum" é **[opinião]**, apoiada nelas.
>
> Base de evidência para tratar todos como opções válidas: máquina e peso livre dão o mesmo crescimento muscular (Haugen 2023, PMID 37582807), e o tipo de equipamento não muda o resultado de forma consistente (ACSM 2026, PMID 41843416).

## Os 4 cenários típicos
| Cenário | O que costuma ter | Fontes |
|---|---|---|
| **Casa** | Elásticos, halteres ajustáveis, barra de porta, às vezes banco e kettlebell | `docs/pesquisa/05-equipamento-limitado.md` |
| **Condomínio** | "Multifuncional com torre de pesos", banco, halteres, colchonetes, bola; às vezes anilhas e barras | [Condomínio S/C](https://condominiosc.com.br/secoes/condominio-e-cia/5201-guia-completo-para-montar-uma-academia-no-seu-condominio-com-sucesso), [Sindiconet](https://www.sindiconet.com.br/informese/academias-em-condominios-convivencia-espaco-fitness/amp) (não verificados) |
| **Academia de bairro ou rede** | Área de peso livre mais uma linha de máquinas. Redes grandes padronizam os equipamentos entre unidades, sem publicar a lista. | [FM2S sobre a Smart Fit](https://www.fm2s.com.br/blog/smart-fit) (não verificado) |
| **Academia completa** | Tudo acima, mais máquinas específicas: hack, abdutora e adutora, voador, graviton, panturrilha… | [orçamento de montagem](https://form.jotform.com/61616630519657), [ArchiExpo](https://www.archiexpo.com/pt/fabricante-arquitetura-design/aparelho-musculacao-cadeira-abdutora-49197.html) (não verificados) |

## Lista universal proposta (por família)

Legenda da coluna "Hoje no app": ✔ existe; ◐ existe mas sem exercício que o use; ✘ não existe.

| Família | Equipamento | Hoje no app | O que abre (padrões de movimento) |
|---|---|---|---|
| **Pesos livres** | Halteres fixos; halteres montáveis (anilhas e manoplas) | ✔ | quase tudo |
| | Barra longa e anilhas | ✔ | agachar, dobrar o quadril, empurrar, puxar |
| | Barra W | ✔ | rosca, tríceps |
| | Barra hexagonal | ✘ | levantamento terra com menos carga na lombar |
| | Kettlebell | ✘ | swing, goblet, remada |
| **Bancos e apoios** | Banco reto; banco regulável (inclina, às vezes declina) | ✔ | empurrar, remada apoiada |
| | Banco Scott | ✘ | rosca apoiada |
| | Banco romano (hiperextensão) | ✘ | extensão de quadril (glúteos, posteriores, lombar) |
| | Rack ou gaiola | ✔ | agachamento, supino e desenvolvimento com barra |
| | Smith | ◐ (só a remada invertida) | agachamento, supino, hip thrust e afundo guiados |
| **Polias** | Polia dupla (crossover); polia simples | ✔ | quase tudo, com acessórios |
| | Acessórios: corda, triângulo, barra reta, estribo | ✔ | — |
| | Tornozeleira | ◐ | coice e abdução de quadril na polia |
| | Puxador alto (estação de puxada) | ✘ | puxada vertical sentada |
| | Remada baixa (estação) | ✘ (só pela polia) | puxada horizontal sentada |
| | Multifuncional ou multiestação | ✘ | puxada, remada, voador, extensora numa peça só |
| **Máquinas de tronco** | Supino articulado ou máquina de peito | ✘ | empurrar horizontal guiado |
| | Voador (peck deck), com posição invertida | ✘ | peito isolado; ombro posterior |
| | Desenvolvimento em máquina | ✘ | empurrar vertical guiado |
| | Remada articulada | ✘ | puxar horizontal guiado |
| | Graviton (barra e paralela assistidas) | ✘ | barra fixa e mergulho para quem ainda não consegue |
| | Máquinas de braço (rosca, tríceps) e de abdominal | ✘ | isoladores guiados |
| **Máquinas de perna** | Leg press | ✔ | agachar guiado |
| | Hack (agachamento articulado) | ✘ | agachar guiado |
| | Cadeira extensora | ✔ (mas o gerador nunca escolhe) | quadríceps isolado |
| | Cadeira flexora; mesa flexora | ✔ | posteriores; a sentada tem a melhor evidência (Maeo 2021, PMID 33009197) |
| | Cadeira abdutora e adutora | ✘ | glúteo médio; adutores |
| | Glúteo em máquina (coice) | ✘ | glúteo isolado |
| | Panturrilha em pé ou sentada (máquina) | ✘ | panturrilha com carga alta |
| **Peso do corpo e acessórios** | Barra fixa | ✔ | puxada vertical |
| | Paralelas | ◐ | mergulho |
| | Suspensão (tipo TRX) | ✘ | remada e flexão |
| | Elásticos; step; bola suíça | ✔ | — |
| **Cardio** | Esteira, bicicleta, elíptico | ✔ (só esteira) | fora do escopo (cardio não é prescrito no MVP) |

**Total:** 25 equipamentos hoje, cerca de 45 na lista universal. Desses 25, 3 estão marcados ◐ e não servem a nenhum exercício (paralelas e tornozeleira) ou servem a quase nada (smith).

## Como o gerador deve tratar o equipamento (proposta)
1. **Por capacidade, não por item.** O app já faz isso, por exemplo "polia alta" vale para a polia simples regulável ou para a estação dupla. A lista nova só acrescenta capacidades, como "puxada vertical guiada", "abdução de quadril" e "extensão de joelho".
2. **Máquina e peso livre valem o mesmo** na escolha. A estabilidade pesa a favor só para iniciante (`selecao.estabilidade`).
3. **Cada padrão de movimento com pelo menos 2 alternativas de equipamento diferente**, para quando o aparelho estiver ocupado.
4. **Atalhos de cenário na tela:** "academia completa", "condomínio com multifuncional", "casa com halteres e elásticos". Eles marcam um conjunto típico que a pessoa ajusta. É uma escolha explícita, nada vem pré-marcado (decisão 7 do M3).

## Linha de base medida (01/11/2026)
Medido com o gerador real e scripts temporários, fora do repositório. Estes números são o ponto de partida dos critérios do marco R0.
- **Uso numa academia completa:** em 144 programas da persona Carla (3 níveis × 4 opções de dias × 4 durações × 3 escolhas de prioridade), o gerador usa **32 dos 60 exercícios possíveis**.
- **Peso das máquinas:** elas ocupam **8%** dos exercícios dos programas; polia 40%, halter 34%, barra 9%, peso do corpo 9%.
- **Nunca escolhidos:** a cadeira extensora e a mesa flexora. Nenhum modelo de dia tem vaga de extensora de joelho, nem de glúteo isolado.
- **Glúteos:** um único exercício principal, a ponte.
- **Carla** (avançada, academia completa, 5 × 75 min, prioridade em pernas): posteriores 8 de 14 e panturrilha 8 de 14, com o dia "Superiores C" usando 39 dos 75 min.
- **Metas do R0:** 45 ou mais exercícios distintos na academia completa; 0 equipamento marcado sem exercício possível (redação aprovada no T7, `08`, seção 3.1); 2 ou mais alternativas de outro equipamento para cada exercício; meta de cada músculo atingida, ou aviso com o motivo verdadeiro.

## O que ainda falta nesta frente
- **O que cada exercício novo pede**, e quais têm evidência por músculo. Isso vem do tema 3 (escolha dos exercícios).
- **Como a foto reconhece os equipamentos novos.** O esquema da visão precisa dos ids novos, e o eval precisa de exemplos.
- **Desenho dos cartões** dos ~20 equipamentos novos, e o custo das animações de máquina. O motor não tem desenho de máquina hoje.
