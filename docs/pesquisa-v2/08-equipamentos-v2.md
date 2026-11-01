# 8. Equipamentos, segunda versão (tema T7)

> Pesquisa de 01/11/2026. Os estudos têm o **resumo oficial lido no PubMed** (resumo-PubMed, com PMID), salvo quando marcados **não verificado**. O texto completo não foi lido: o PMC e as editoras estavam bloqueados nas sessões anteriores, e esta sessão não insistiu. Os selos seguem `docs/pesquisa/00-metodo.md`. EMG mede ativação e **não mede crescimento**: estudo de EMG nunca sustenta sozinho uma afirmação de hipertrofia.
>
> Medições **[medido]** com o gerador real e scripts temporários fora do repositório. Estimativas **[estimativa]** com um modelo das vagas por função do T3, também fora do repositório (seção 6). **[opinião]** marca o que é julgamento meu. Nada aqui muda `regras.md`, os dados ou o código sem a aprovação do Gustavo.
>
> Base do marco **R0c** (catálogo) e de partes do **R0b** (vagas por função) e do **R1** (atalhos na tela de equipamento).

## Resumo
1. **A lista final tem 46 equipamentos**: os 25 de hoje e 21 novos. Todos permitem pelo menos 1 exercício (a conferência achou um furo de hoje: a polia simples **fixa** não abre nenhum exercício; a correção está na seção 1), com uma exceção declarada: a **esteira**, que é cardio e fica fora do escopo. Proponho que ela continue só para a foto não a confundir com outra coisa, sem aparecer na lista de treino. O multifuncional entra **por capacidade**: ele não tem exercício próprio. A pessoa marca as estações que o dela tem (puxador, remada, extensora…), e cada estação vale como a máquina equivalente.
2. **Entram 29 exercícios** (os 8 pedidos no T3 e os que faltavam para todo equipamento ter uso) e o agachamento livre passa a ser descrito **profundo**. São 30 fichas de técnica novas em `docs/pesquisa/animacoes/`, cada linha com selo e fonte.
3. **Numa academia completa, as vagas por função mais os exercícios novos levariam o gerador de 32 para cerca de 62 exercícios usados, e as máquinas de 8% para cerca de 40% das vagas** **[estimativa]**. A extensora passa de nunca para ~1,5 vez por semana. A meta do R0 (45 ou mais) fica folgada.
4. **3 atalhos na tela de equipamento**: "casa com halteres e elásticos", "condomínio com multifuncional" e "academia completa". O atalho é um botão que a pessoa toca; nada vem marcado antes (decisão 7 do M3). Depois do toque, ela tira o que não tem.
5. **Cada equipamento diz como a carga sobe**, em 5 tipos: kg conhecido, placa da torre, anilhas numa máquina (o peso do trenó é desconhecido), contrapeso (no graviton, **mais placa = mais fácil**) e degrau. Isso fecha a calibração e a volta de pausa do T6.
6. **A fila das animações** tem 71 exercícios sem animação. O que mais rende por unidade de esforço: (a) as 13 que o motor já desenha, (b) a peça "máquina de perna com alavanca" (extensora, flexora, glúteo, abdutora) e (c) o desenho do elástico. A barra longa e o smith rendem pouco por enquanto.
7. **Foto:** os ids novos entram sozinhos no esquema. O texto do pedido ao modelo precisa de 14 "dicas para não confundir" (hack × leg press, voador × polia, multifuncional × estação de polia, smith × rack…). O eval com fotos reais roda na máquina do Gustavo e precisa da chave da Anthropic (pendência do backlog).

## 1. A lista final de equipamentos (pergunta 1, parte 1)

**Regra:** por capacidade, não por item (`03`, seção "Como o gerador deve tratar o equipamento"). Um equipamento novo só vira id quando muda o que dá para treinar, ou quando a foto precisa distingui-lo. Por isso ficam de fora como ids próprios a "extensora e flexora combinadas" e a "abdutora separada da adutora": a primeira é coberta pelos dois ids que já existem, e a segunda vira um id só (na maioria das academias as duas funções ficam no mesmo aparelho **[opinião]**).

Legenda: ✔ existe hoje; ◐ existe mas sem exercício que o use; ✚ novo.

| Família | Id | Nome na tela | Hoje | Capacidades que dá | Como a carga sobe |
|---|---|---|---|---|---|
| Pesos livres | `halteres_fixos` | Halteres fixos | ✔ | `halteres` | kg conhecido |
| | `anilhas_e_manoplas` | Anilhas e manoplas para montar halteres | ✔ | `halteres` | kg conhecido |
| | `barra_longa` | Barra longa e anilhas | ✔ | `barra_longa` (+ `rack` se houver) | kg conhecido (atributos novos: peso da barra e menor anilha) |
| | `barra_w` | Barra W | ✔ | `barra_w` | kg conhecido |
| | `barra_hexagonal` | Barra hexagonal | ✚ | `barra_hexagonal` | kg conhecido (peso da barra e menor anilha) |
| | `kettlebell` | Kettlebell | ✚ | `kettlebell` | kg conhecido (lista dos pesos, como os halteres fixos) |
| Bancos e apoios | `banco_reto` | Banco reto | ✔ | `banco` | — |
| | `banco_regulavel` | Banco regulável | ✔ | `banco`, `banco_inclinavel`, `banco_declinavel` | — |
| | `banco_scott` | Banco Scott | ✚ | `banco_scott` | — (carga da barra W ou do halter) |
| | `banco_romano` | Banco romano (hiperextensão) | ✚ | `banco_romano` | degrau, depois kg segurado |
| | `rack_de_agachamento` | Rack ou gaiola | ✔ | `rack`, `barra_baixa` | — |
| | `smith` | Smith | ◐ → ✔ | `smith`, `barra_baixa` | anilhas na máquina |
| Polias | `estacao_polia_dupla` | Polia dupla (crossover) | ✔ | `polia`, `polia_dupla`, `polia_alta`, `polia_baixa`, `estribo` | placa da torre |
| | `polia_simples` | Polia simples | ✔ | `polia`, mais `polia_alta` e `polia_baixa` se for regulável. **Proposta:** trocar `alturaRegulavel` por `altura` (alta, baixa ou regulável), porque hoje uma polia simples fixa não abre nenhum exercício **[medido]** | placa da torre |
| | `estacao_puxada` | Puxador alto (estação de puxada) | ✚ | `puxador`, `polia_alta` | placa da torre |
| | `estacao_remada` | Remada baixa (estação) | ✚ | `remada_estacao`, `polia_baixa` | placa da torre |
| | `multifuncional` | Multifuncional (várias estações numa torre só) | ✚ | conforme as estações marcadas (abaixo) | placa da torre |
| | `acessorio_polia_*` (corda, triângulo, barra reta, estribo) | Acessórios da polia | ✔ | `corda`, `triangulo`, `barra_reta_polia`, `estribo` | — |
| | `acessorio_polia_tornozeleira` | Tornozeleira | ◐ → ✔ | `tornozeleira` | — |
| Máquinas de tronco | `supino_maquina` | Supino na máquina ou articulado | ✚ | `supino_maquina` | placa ou anilhas |
| | `voador` | Voador (peck deck) | ✚ | `voador` (+ `voador_invertido` se o atributo `invertido`) | placa |
| | `desenvolvimento_maquina` | Desenvolvimento na máquina | ✚ | `desenvolvimento_maquina` | placa |
| | `remada_articulada` | Remada articulada | ✚ | `remada_articulada` | placa ou anilhas |
| | `graviton` | Graviton (barra e mergulho assistidos) | ✚ | `graviton` | contrapeso (ao contrário) |
| | `rosca_maquina` | Máquina de rosca | ✚ | `rosca_maquina` | placa |
| | `triceps_maquina` | Máquina de tríceps | ✚ | `triceps_maquina` | placa |
| | `abdominal_maquina` | Máquina de abdominal | ✚ | `abdominal_maquina` | placa |
| Máquinas de perna | `leg_press` | Leg press | ✔ | `leg_press` | anilhas na máquina |
| | `hack` | Hack (agachamento articulado) | ✚ | `hack` | anilhas na máquina |
| | `cadeira_extensora` | Cadeira extensora | ✔ (o gerador nunca escolhe) | `cadeira_extensora` | placa |
| | `cadeira_flexora` | Cadeira flexora | ✔ | `cadeira_flexora` | placa |
| | `mesa_flexora` | Mesa flexora | ✔ (o gerador nunca escolhe) | `mesa_flexora` | placa |
| | `cadeira_abdutora_adutora` | Cadeira abdutora e adutora | ✚ | `abdutora`, `adutora` | placa |
| | `gluteo_maquina` | Glúteo na máquina | ✚ | `gluteo_maquina` | placa |
| | `panturrilha_em_pe_maquina` | Panturrilha em pé (máquina) | ✚ | `panturrilha_em_pe` | placa ou anilhas |
| | `panturrilha_sentada_maquina` | Panturrilha sentada (máquina) | ✚ | `panturrilha_sentada` | anilhas na máquina |
| Peso do corpo e acessórios | `barra_fixa` | Barra fixa | ✔ | `barra_fixa` | degrau |
| | `paralelas` | Paralelas | ◐ → ✔ | `paralelas` | degrau, depois kg |
| | `suspensao` | Suspensão (fitas tipo TRX) | ✚ | `suspensao` | degrau (inclinação do corpo) |
| | `elasticos` | Elásticos | ✔ | `elastico` | degrau |
| | `step` | Step | ✔ | `step` | — |
| | `bola_suica` | Bola suíça | ✔ | `bola_suica` | — |
| Cardio | `esteira` | Esteira | ✔ | nenhuma | **fora do escopo**: fica só para a foto (seção 4) |

**Total:** 46 ids (25 de hoje e 21 novos). A bicicleta e o elíptico não entram: são cardio, que o MVP não prescreve.

**Multifuncional, por capacidade.** Atributos propostos (checklist "o que o seu tem?"): `puxador`, `remadaBaixa`, `extensora`, `flexora`, `voador`, `supino` (sim ou não), `placas` e `kgPorPlaca` (opcionais). Cada "sim" liga a capacidade da máquina equivalente: `puxador` → `puxador` e `polia_alta`; `remadaBaixa` → `remada_estacao` e `polia_baixa`; `extensora` → `cadeira_extensora`; `flexora` → `cadeira_flexora`; `voador` → `voador`; `supino` → `supino_maquina`. **[opinião]**: não achei lista de fabricante nem estudo sobre o que um multifuncional "típico" tem. As estações acima são as que aparecem nos guias de condomínio citados no `03` (não verificados).

### 1.1 Como a carga sobe, por tipo (para a progressão e a calibração do T6)

| Tipo | Equipamentos | O que a pessoa registra | Passo de subida | Calibração na 1ª série (T6, seção 2.3) |
|---|---|---|---|---|
| **kg conhecido** | halteres, kettlebell, barra longa, barra W, barra hexagonal | kg total (com a barra) | próximo peso da lista; na barra, o menor par de anilhas | fórmula até 12 repetições, arredondada para baixo no inventário (como hoje) |
| **placa da torre** | polias, estações, multifuncional, máquinas com torre | número da placa | ±1 placa; 2 se estiver leve demais (`progressao.carga-leve`) | só passos (como a polia no T6) |
| **anilhas numa máquina** | leg press, hack, smith, panturrilha sentada, supino e remada articulados de anilha | kg de anilhas **por lado** | o menor par de anilhas | **só passos**: o peso do trenó (ou da barra do smith) é desconhecido, então a conta multiplicativa da fórmula erraria. Se a pessoa informar esse peso, vira kg total e a fórmula volta a valer |
| **contrapeso** | graviton | número da placa de contrapeso | **−1 placa = progredir** (mais placa = mais ajuda) | passos com o sentido invertido. Quando a ajuda chega a zero, o exercício vira a versão livre (barra fixa, mergulho) |
| **degrau** | peso do corpo, paralelas, suspensão, banco romano, elásticos | degrau da escada | próximo degrau (`progressao.incremento.peso-corporal`) | um degrau abaixo (como hoje) |

**Atributos novos de inventário** (todos opcionais; sem eles, o app pergunta na 1ª série):
- `barra_longa`, `barra_hexagonal`: `pesoBarraKg`, `menorAnilhaKg`;
- `leg_press`, `hack`, `smith`, `panturrilha_sentada_maquina`: `menorAnilhaKg`;
- `kettlebell`: `pesosKg` (lista);
- máquinas com torre: `placas` e `kgPorPlaca`, como na polia;
- `voador`: `invertido`; `triceps_maquina`: `acimaDaCabeca`;
- `graviton`: `placas`.

O `menorAnilhaKg` é perguntado uma vez e vale para todos os itens de anilha. O valor padrão vai para o R0c **[opinião: 2 kg, a confirmar com a academia do Gustavo no T8]**.

## 2. O que cada equipamento novo permite (pergunta 1, parte 2)

A coluna "prioridade" diz em que nível da função o exercício entra: **1** = 1ª escolha, entre equivalentes (≈); **2** = só se nada do nível 1 for possível. Dentro do mesmo nível, o gerador escolhe por estabilidade (só para iniciante), carga possível e variedade entre os dias (`04`, seção 1). O selo é o da função no T3, revisto onde o T7 achou evidência nova (em **negrito**).

| Equipamento | Exercício (ficha) | Função do T3 | Selo da função | Prioridade |
|---|---|---|---|---|
| `barra_hexagonal` | [terra-hexagonal](../pesquisa/animacoes/terra-hexagonal.md) | agachar (quadríceps e glúteos) | um estudo | 2 (carga alta sem rack) |
| `kettlebell` | [goblet-kettlebell](../pesquisa/animacoes/goblet-kettlebell.md) | agachar | um estudo | 2 (≈ goblet com halter) |
| `banco_scott` | [rosca-scott](../pesquisa/animacoes/rosca-scott.md) | bíceps com o braço à frente | um estudo | 1 (alterna com a inclinada entre blocos) |
| `banco_romano` | [hiperextensao](../pesquisa/animacoes/hiperextensao.md) | dobrar o quadril; também extensão de quadril | um estudo (Morin 2025, no T3) | 2 |
| `smith` | [agachamento-smith](../pesquisa/animacoes/agachamento-smith.md) | agachar | um estudo | 1 |
| | [supino-smith](../pesquisa/animacoes/supino-smith.md) | empurrar horizontal | um estudo | 1 |
| | [hip-thrust](../pesquisa/animacoes/hip-thrust.md) (versão no smith) | extensão de quadril (glúteo) | um estudo | 1 |
| | `remada-invertida` (já existe) | puxar horizontal | consenso | 2 |
| `acessorio_polia_tornozeleira` | [abducao-polia](../pesquisa/animacoes/abducao-polia.md) | abdução de quadril | **um estudo** (era consenso; Attarieh 2026) | 1 |
| | [coice-polia](../pesquisa/animacoes/coice-polia.md) | extensão de quadril (glúteo) | um estudo | 2 |
| `estacao_puxada` (ou multifuncional) | [puxada-frente](../pesquisa/animacoes/puxada-frente.md) | puxar vertical | consenso | 1 |
| `estacao_remada` (ou multifuncional) | [remada-baixa-estacao](../pesquisa/animacoes/remada-baixa-estacao.md) | puxar horizontal | consenso | 1 |
| `supino_maquina` | [supino-maquina](../pesquisa/animacoes/supino-maquina.md) | empurrar horizontal | um estudo | 1 (estável: favorece o iniciante) |
| `voador` | [voador](../pesquisa/animacoes/voador.md) | crucifixo (peito alongado) | **um estudo** (era consenso; Pinto 2025) | 1 |
| | [voador-invertido](../pesquisa/animacoes/voador-invertido.md) | ombro posterior | consenso | 1 |
| `desenvolvimento_maquina` | [desenvolvimento-maquina](../pesquisa/animacoes/desenvolvimento-maquina.md) | empurrar vertical | consenso | 1 |
| `remada_articulada` | [remada-articulada](../pesquisa/animacoes/remada-articulada.md) | puxar horizontal | consenso | 1 |
| `graviton` | [barra-fixa-graviton](../pesquisa/animacoes/barra-fixa-graviton.md) | puxar vertical | consenso | 1 (para quem não faz a barra) |
| | [mergulho-graviton](../pesquisa/animacoes/mergulho-graviton.md) | empurrar (peito e tríceps) | um estudo (EMG) | 2 |
| `paralelas` | [mergulho](../pesquisa/animacoes/mergulho.md) | empurrar (peito e tríceps) | um estudo (EMG) | 2 (complexidade 3) |
| `rosca_maquina` | [rosca-maquina](../pesquisa/animacoes/rosca-maquina.md) | bíceps com o braço à frente | um estudo | 1 |
| `triceps_maquina` | [triceps-maquina](../pesquisa/animacoes/triceps-maquina.md) | tríceps, complemento (braço à frente) | um estudo (Maeo 2023) | 2; 1 se `acimaDaCabeca` |
| `abdominal_maquina` | [abdominal-maquina](../pesquisa/animacoes/abdominal-maquina.md) | flexão de tronco com carga | consenso | 1 |
| `hack` | [hack](../pesquisa/animacoes/hack.md) | agachar | um estudo | 1 |
| `cadeira_abdutora_adutora` | [abducao-maquina](../pesquisa/animacoes/abducao-maquina.md) | abdução de quadril | **um estudo** | 1 |
| | [aducao-maquina](../pesquisa/animacoes/aducao-maquina.md) | adução (adutores, sem meta) | consenso | fora das vagas padrão |
| `gluteo_maquina` | [coice-maquina](../pesquisa/animacoes/coice-maquina.md) | extensão de quadril (glúteo) | um estudo (por analogia com a polia) | 1 |
| `panturrilha_em_pe_maquina` | [panturrilha-em-pe-maquina](../pesquisa/animacoes/panturrilha-em-pe-maquina.md) | panturrilha em pé | um estudo (efeito grande) | 1 |
| `panturrilha_sentada_maquina` | [panturrilha-sentada](../pesquisa/animacoes/panturrilha-sentada.md) | panturrilha sentada (sóleo) | um estudo | complemento |
| `suspensao` | [remada-suspensao](../pesquisa/animacoes/remada-suspensao.md) | puxar horizontal | um estudo (EMG) | 2; 1ª opção sem puxada vertical |
| `barra_longa` + `rack` | [agachamento-barra](../pesquisa/animacoes/agachamento-barra.md) (já existe; vira "profundo") | agachar | um estudo | 1 |
| `barra_longa` + `banco` | [hip-thrust](../pesquisa/animacoes/hip-thrust.md) | extensão de quadril (glúteo) | um estudo | 1 |

**Os equipamentos que já existiam e não eram usados:**
- `cadeira_extensora` e `mesa_flexora` já têm exercício. Faltava a **vaga**: no R0b, a extensora entra pela `selecao.isolador-obrigatorio` (T3), e a mesa flexora fica no nível 2 da flexão de joelho, atrás da cadeira flexora (`selecao.flexora-sentada`).
- `barra_w` ganha a rosca Scott; `smith`, `paralelas` e `tornozeleira` ganham os exercícios acima.

**Achados novos que mudam selos do T3:**
- **Glúteos.** Num ensaio de 10 semanas com 17 pessoas (ressonância), a extensão de quadril unilateral na polia cresceu mais o glúteo máximo que a abdução (+9% × +5%). A abdução cresceu a parte de cima do glúteo máximo e um pouco o glúteo médio e o mínimo (+4%) (Attarieh 2026; um estudo). Isso sustenta a ordem do T3 (agachar ou afundo → hip thrust, ponte ou coice → abdução como complemento) e tira a abdução do "consenso".
- **Peito.** O voador sozinho cresceu as duas porções do peitoral em iniciantes, e 1 série rendeu o mesmo que 3 (Pinto 2025; um estudo). O crucifixo ou voador como complemento deixa de ser só consenso; ele continua **complemento**, porque não há comparação com o supino.
- **Bíceps.** Scott na polia ≈ rosca com o braço atrás do corpo, na polia (Attarieh 2025, 15 homens; um estudo), e Scott com barra ≈ Scott na polia (Nunes 2020; um estudo). Reforça o "≈" do T3 entre a Scott e a inclinada.
- **Extensora.** Mais um ensaio, agora com 63 mulheres: a extensora cresceu mais o reto femoral e o agachamento no smith cresceu mais o vasto lateral (Kassiano 2026; um estudo). Na mesma direção, Zabaleta-Korta 2021 (um estudo). Isso reforça a `selecao.isolador-obrigatorio`.

### 2.1 As funções e os níveis, como dado para o R0b
É a tabela que o gerador do R0b vai usar para preencher cada vaga (proposta; os ids novos estão em itálico). O nível 1 é a 1ª escolha; os exercícios do mesmo nível são equivalentes.

| Função | Nível 1 | Nível 2 | Nível 3 |
|---|---|---|---|
| Empurrar horizontal | supino com halteres, supino com barra, *supino na máquina*, *supino no smith* | supino na polia, flexão, *mergulho*, *mergulho no graviton* | flexão com elástico |
| Empurrar inclinado | supino inclinado com halteres, supino inclinado na polia | crucifixos e *voador* | flexão |
| Crucifixo (peito alongado) | *voador*, crucifixo na polia, crucifixo com halteres, crucifixo na polia de baixo | crucifixo com elástico | — |
| Puxar vertical | barra fixa, *puxada pela frente*, puxada com barra reta, puxada unilateral, *barra no graviton* | remada invertida, *remada na suspensão*, remada unilateral (`equipamento.sem-puxada-vertical`) | puxada com elástico |
| Puxar horizontal | remada baixa, *remada na estação*, *remada articulada*, remada apoiada, remada unilateral | remada invertida, *remada na suspensão*, remada com barra | remada com elástico |
| Empurrar vertical (opcional) | desenvolvimento com halteres, *na máquina*, com barra, unilateral | com elástico | — |
| Elevação lateral | com halteres, na polia | com elástico | — |
| Ombro posterior | *voador invertido*, crucifixo inverso, face pull | face pull com elástico | — |
| Bíceps | *rosca Scott*, rosca inclinada, rosca na polia por trás, *rosca na máquina* | rosca na polia, com barra W, alternada | com elástico |
| Tríceps acima da cabeça | francês na polia, francês com halter, com elástico | — | — |
| Tríceps (complemento) | na corda, na barra reta, *na máquina* | *mergulho* | — |
| Agachar | agachamento livre *profundo*, leg press, *hack*, *smith* | goblet, búlgaro, *terra hexagonal*, *goblet com kettlebell* | com elástico, peso do corpo |
| Afundo | búlgaro, afundo, afundo para trás | com o peso do corpo | — |
| Extensora | cadeira extensora | — (lacuna explicada) | — |
| Flexão de joelho | cadeira flexora | mesa flexora | na bola, com elástico (se nada: dobrar o quadril) |
| Dobrar o quadril | terra romeno, stiff, stiff unilateral | *hiperextensão*, pull-through | stiff com elástico |
| Extensão de quadril (glúteo) | *hip thrust*, *glúteo na máquina* | ponte, *coice na polia*, *hiperextensão* | — |
| Abdução | *na máquina*, *na polia* | — | — |
| Panturrilha em pé | *na máquina*, no leg press, no step (unilateral e bilateral) | no chão | — |
| Panturrilha sentada (complemento) | *na máquina* | — | — |
| Abdômen | na polia, *na máquina*, no banco declinado | elevação de joelhos, no chão | — |

## 3. Atalhos de cenário (pergunta 2)

**Como funciona** (marco R1): na tela de equipamento, acima da lista por desenhos, 3 botões. Nenhum vem selecionado. Tocar num atalho marca o conjunto típico, e a pessoa tira o que não tem. Os "às vezes tem" aparecem logo abaixo, desmarcados, a um toque cada. É uma escolha explícita (decisão 7 do M3). O esboço está na página do diagnóstico.

**[opinião]** Não há lista oficial do que cada lugar tem no Brasil (`03`). Os conjuntos abaixo vêm dos guias de condomínio, das páginas de rede e das lojas do `03` (não verificados) e do meu julgamento. A "academia de bairro" não ganha atalho próprio: ela usa "academia completa" e tira o que falta. Um 4º botão seria mais uma escolha na tela, para uma diferença que a pessoa resolve em poucos toques.

| Atalho | Marca | "Às vezes tem" (desmarcados) |
|---|---|---|
| **Casa com halteres e elásticos** | halteres montáveis (pergunta as anilhas), elásticos | banco reto ou regulável, barra fixa de porta, kettlebell, suspensão, step, bola suíça |
| **Condomínio com multifuncional** | multifuncional (puxador e remada marcados; extensora, flexora, voador e supino para a pessoa confirmar), banco regulável, halteres fixos (pergunta a faixa), bola suíça | barra longa, barra W, barra fixa, elásticos, step, kettlebell |
| **Academia completa** | polia dupla e simples com os 5 acessórios, barra fixa, paralelas, graviton, bancos (reto, regulável, Scott, romano), halteres fixos, barra longa, barra W, barra hexagonal, rack, smith, leg press, hack, extensora, cadeira e mesa flexora, abdutora e adutora, glúteo na máquina, panturrilha em pé e sentada, estação de puxada e de remada, supino, voador (pergunta se inverte), desenvolvimento, remada articulada, máquinas de rosca, tríceps e abdominal, step | kettlebell, elásticos, bola suíça, suspensão |

### 3.1 O que cada atalho libera
**Hoje** **[medido]**: gerador atual, só com os ids de hoje, em 144 programas por cenário (3 níveis × 4 opções de dias × 4 durações × 3 escolhas de prioridade). O condomínio foi aproximado como "polia simples regulável + extensora", porque o multifuncional não existe hoje.

| Cenário (ids de hoje) | Exercícios possíveis | Exercícios usados | Máquinas nas vagas | Vagas com animação | O que fica marcado e não serve |
|---|---|---|---|---|---|
| Casa (halteres + elásticos) | 29 | 20 | 0% | 56% | nada |
| Casa + banco + barra fixa | 36 | 24 | 0% | 70% | nada |
| Condomínio | 49 | 26 | 0% | 83% | a extensora: marcada e nunca usada |
| Academia completa | 73 | **32** | **8%** | 79% | barra W, smith, extensora, mesa flexora, paralelas, tornozeleira (e bola e elásticos, redundantes numa academia) |

**Depois do R0b e do R0c** **[estimativa; modelo da seção 6]**:

| Cenário | Exercícios possíveis | Exercícios usados | Máquinas nas vagas | O que muda |
|---|---|---|---|---|
| Casa | 29 | 19 | 0% | quase nada: a casa já usava o que tinha. Sem banco, a flexão vira o empurrar principal. Abdução e extensora ficam como lacunas explicadas |
| Casa + extras (banco, barra fixa, kettlebell, suspensão) | 38 | 22 | 0% | o kettlebell divide a vaga do goblet |
| Condomínio | 34 | 27 | 11% | a extensora passa a ~1,5 vez por semana; a puxada e a remada das estações entram |
| Academia completa | 87 | **~62** | **~40%** | a extensora ~1,5 por semana, a cadeira flexora ~1,75, glúteo em máquina ou hip thrust ~1,5, abdução ~0,75 |

**O que ainda fica sem vaga na academia completa** **[estimativa]**: barra hexagonal, banco romano, paralelas e a adutora. Elas ficam como **alternativas** (aparelho ocupado, dor, troca de bloco), porque o nível 1 da função já tem opção. Isso conflita com a meta do R0 "0 equipamento marcado sem uso". Proponho reescrever a meta: "0 equipamento marcado **sem exercício possível**, e todo exercício possível aparece como vaga ou como alternativa" (decisão do Gustavo, seção 9).

## 4. Reconhecimento por foto (pergunta 3)

**O que muda no código (R0c):**
1. **Ids:** o enum do esquema sai de `ITEM_IDS` (`src/domain/visao/index.ts`), então os 21 ids novos entram sozinhos. O modelo continua sem poder inventar um id.
2. **Atributos que a foto pode estimar** (a acrescentar em `atributos`, que hoje é fechado): `multifuncional` (`puxador`, `remadaBaixa`, `extensora`, `flexora`, `voador`, `supino`) e `kettlebell` (`pesosKg`, pelos números pintados). Placas, peso da barra e menor anilha **não**: a foto raramente mostra isso com clareza **[opinião]**, e o app pergunta na 1ª série.
3. **Instruções** (`instrucoes()`): acrescentar as dicas da tabela abaixo, em uma linha cada, e a regra "esteira, bicicleta e elíptico: liste só a esteira; eles não entram no treino".

| Par fácil de confundir | Pista visual para o modelo | Gravidade do erro **[opinião]** |
|---|---|---|
| hack × leg press | hack: a pessoa fica em pé ou quase, costas num encosto inclinado e almofadas sobre os ombros. Leg press: sentada ou deitada, empurra uma plataforma com os pés | média (os dois são "agachar") |
| voador × polia dupla (crucifixo na polia) | voador: assento com encosto e dois braços presos à máquina, sem cabos soltos. Polia dupla: duas torres altas, com cabos e pegadores soltos | **alta** (a polia libera ~16 exercícios) |
| multifuncional × estação de polia | multifuncional: uma estrutura com assento fixo, puxador alto com almofada de coxa e às vezes extensora ou voador. Estação de polia: torre(s) sem assento | **alta** |
| smith × rack | smith: barra presa em trilhos verticais. Rack: barra solta, apoiada em ganchos | **alta** (supino e agachamento livres exigem rack) |
| extensora × flexora × abdutora/adutora | extensora: almofada na frente da canela, embaixo. Cadeira flexora: almofada atrás do calcanhar e outra sobre a coxa. Abdutora/adutora: almofadas dos lados dos joelhos | média |
| mesa flexora × banco romano | mesa: a pessoa deita de bruços, com almofada atrás dos tornozelos. Banco romano: apoio no quadril e trava dos pés, inclinado a 45° ou reto | média |
| panturrilha em pé × sentada × hack | em pé: almofadas nos ombros e um degrau pequeno para a ponta dos pés. Sentada: almofada sobre os joelhos, pessoa sentada | média |
| supino na máquina × desenvolvimento na máquina | pegadores à frente do peito × acima dos ombros (algumas máquinas fazem os dois) | baixa |
| remada articulada × supino na máquina | remada: almofada no peito e pegadores à frente, para puxar. Supino: encosto atrás, para empurrar | baixa |
| estação de puxada × estação de remada | puxada: barra no alto e almofada de coxa. Remada: assento baixo, apoio para os pés e cabo baixo (muitas vezes na mesma torre) | baixa |
| banco Scott × banco regulável | Scott: almofada inclinada para os braços na frente do assento | média |
| graviton × paralelas × barra fixa | graviton: plataforma para os joelhos e torre de pesos. Paralelas e barra fixa: barras sem torre | média |
| barra hexagonal × barra longa | hexagonal: moldura em forma de hexágono, com a pessoa dentro e pegadores dos lados | média |
| suspensão × elásticos | suspensão: fitas de nylon com fivelas e pegadores. Elásticos: borracha colorida | baixa |

**Plano do eval** (roda na máquina do Gustavo, com `privado/`; aqui só o plano):
1. **Fotos:** para cada equipamento novo que a academia dele tiver, ao menos 2 fotos de ângulos diferentes. Para cada par confundível, ao menos 1 foto em que só um dos dois aparece. Só fotos dele ou de quem autorizar, sem rostos, guardadas em `privado/` (LGPD; `CLAUDE.md`). O que a academia dele não tiver fica "sem medida" até haver fotos.
2. **Gabarito** (`privado/gabarito.json`): o formato não muda (`tem` e `nao_tem`). O par confundível ausente vai em `nao_tem`, e o eval já conta isso como **falso positivo grave**. Proposta: listar no relatório as confusões por par.
3. **Critérios:** os do plano (recall ≥ 85% e precisão ≥ 90% nas sugestões de confiança alta, 0 falso positivo grave). Novo: acerto das estações do multifuncional.
4. **Pré-requisito:** a `ANTHROPIC_API_KEY` na máquina dele (pendência do `docs/backlog.md`). O comando continua `npm run eval:visao`.
5. **Custo:** a lista de ids e as dicas aumentam o texto do pedido. O eval já mede o custo por chamada; vale conferir se o modelo escolhido continua o mais barato que passa.

## 5. Lista final de exercícios a acrescentar

29 exercícios novos e 1 revisto. Cada um tem ficha de técnica em `docs/pesquisa/animacoes/<id>.md`, com selo em cada linha e fontes com o nível de leitura. Até a animação ser aprovada, cada um aparece como **cartão de texto** (`CLAUDE.md`).

| Id | Padrão (proposta) | Músculo primário | Pede | Carga |
|---|---|---|---|---|
| `hack` | agachar | quadríceps | `hack` | anilhas na máquina |
| `agachamento-smith` | agachar | quadríceps | `smith` | anilhas na máquina |
| `terra-hexagonal` | agachar | quadríceps, glúteos | `barra_hexagonal` | kg |
| `goblet-kettlebell` | agachar | quadríceps | `kettlebell` | kg (lista) |
| `supino-smith` | empurrar-h | peito | `smith` + `banco` | anilhas na máquina |
| `supino-maquina` | empurrar-h | peito | `supino_maquina` | placa |
| `mergulho` | empurrar-h | peito, tríceps | `paralelas` | degrau |
| `mergulho-graviton` | empurrar-h | peito, tríceps | `graviton` | contrapeso |
| `voador` | isolador-peito | peito | `voador` | placa |
| `puxada-frente` | puxar-v | costas | `puxador` | placa |
| `barra-fixa-graviton` | puxar-v | costas | `graviton` | contrapeso |
| `remada-baixa-estacao` | puxar-h | costas | `remada_estacao` | placa |
| `remada-articulada` | puxar-h | costas | `remada_articulada` | placa |
| `remada-suspensao` | puxar-h | costas | `suspensao` | degrau |
| `desenvolvimento-maquina` | empurrar-v | ombro anterior | `desenvolvimento_maquina` | placa |
| `voador-invertido` | isolador-ombro-posterior | ombro posterior | `voador_invertido` | placa |
| `rosca-scott` | isolador-biceps | bíceps | `banco_scott` + `barra_w` ou `halteres` | kg |
| `rosca-maquina` | isolador-biceps | bíceps | `rosca_maquina` | placa |
| `triceps-maquina` | isolador-triceps | tríceps | `triceps_maquina` | placa |
| `hiperextensao` | dobrar-quadril | glúteos, posteriores | `banco_romano` | degrau |
| `hip-thrust` | **extensao-quadril** (novo) | glúteos | `barra_longa` + `banco`, ou `smith` + `banco` | kg ou anilhas |
| `coice-maquina` | extensao-quadril | glúteos | `gluteo_maquina` | placa |
| `coice-polia` | extensao-quadril | glúteos | `polia_baixa` + `tornozeleira` | placa |
| `abducao-maquina` | **abducao-quadril** (novo) | glúteos | `abdutora` | placa |
| `abducao-polia` | abducao-quadril | glúteos | `polia_baixa` + `tornozeleira` | placa |
| `aducao-maquina` | **aducao-quadril** (novo) | **adutores** (novo, sem meta) | `adutora` | placa |
| `panturrilha-em-pe-maquina` | panturrilha | panturrilha | `panturrilha_em_pe` | placa ou anilhas |
| `panturrilha-sentada` | panturrilha | panturrilha | `panturrilha_sentada` | anilhas na máquina |
| `abdominal-maquina` | core | abdômen | `abdominal_maquina` | placa |
| `agachamento-barra` (revisto) | agachar | quadríceps | sem mudança | kg; tag nova `profundo` |

Os outros campos de cada um (`complexidade`, `faixaReps`, `articulacoes`, `tags`) seguem a ficha e o padrão da biblioteca. Eles serão escritos no R0c, com os testes de esquema. Destaques: o `mergulho` com complexidade 3 e a articulação `ombro`; o `terra-hexagonal` e a `hiperextensao` com `lombar`. A `ponte-gluteo` muda de `dobrar-quadril` para `extensao-quadril`.

## 6. Frequência estimada e fila das animações

### 6.1 Como a frequência foi estimada **[estimativa]**
O gerador de hoje não tem vagas por função (isso é do R0b). Por isso montei um modelo fora do repositório:
- **Modelos de dia por função**, tirados do T3 (`04`, seção 4) e das divisões do `01`: corpo todo A/B (2 dias), A/B/C (3), superior/inferior 2x (4) e superior/inferior + empurrar/puxar/pernas (5). São 6 a 8 vagas por dia, o que cabe em ~60 min pela tabela do T4.
- **Cada vaga** usa os níveis da tabela 2.1. O peso da vaga é dividido igualmente entre as opções possíveis do 1º nível disponível. Exemplo: na academia completa, a vaga "agachar" vale 1/4 para o agachamento livre, o leg press, o hack e o smith.
- **Inventário** de cada cenário igual ao atalho da seção 3, sem ajustes.
- **Frequência** = vagas por semana, média das 4 opções de dias. Na fila, soma dos 4 cenários (casa, casa com extras, condomínio, academia completa), com o mesmo peso.

**Limites do modelo:** é o nível intermediário. Para o iniciante, a estabilidade favorece as máquinas, então elas subiriam. Os minutos e as prioridades não entram. O peso igual entre os cenários dá à casa um peso que talvez não reflita quem usa o app: o Gustavo treina numa academia. No T8, a fila pode ser reordenada pelo inventário real dele.

### 6.2 O custo de cada animação **[opinião, calibrada no lote 1]**
O motor (`src/engine/desenho.ts`) já desenha o corpo, os halteres, o banco (reto e inclinado), a torre da polia com cabos, a corda e a barra, a barra fixa, o step e a bola. Ele **não** desenha o elástico, a barra longa com anilhas, o rack, o smith nem as máquinas.

| Classe | O que é | Custo | Base |
|---|---|---|---|
| **P** | Variação de uma pose existente, com peças que o motor já tem | 1 unidade | Lote 1: 5 animações P com fichas, entregues para revisão no mesmo bloco de trabalho em que a 1ª animação nova foi aprovada e congelada (commits das 00:25 às 01:30 de 01/11) **[medido no histórico]** |
| **M** | Pose nova; acessório simples feito com as primitivas atuais (caixa, linha, círculo): estação de cabo, tornozeleira, banco Scott ou romano, paralelas, graviton, fitas, kettlebell | 2 unidades | **[opinião]** |
| **Peça nova** | Desenho novo no motor, com contato de mãos e pés e checagem de cinemática: elástico; barra longa + anilhas + rack; smith; máquina de perna com alavanca; máquina de tronco com alavanca; trenó em trilho | +6 unidades na 1ª animação da família; as seguintes custam 2 | **[opinião]**; toda peça nova passa pela regressão visual |

A revisão do Gustavo (a folha de contatos) é por lote e não entra nas unidades.

### 6.3 A fila, por família (o que rende mais por unidade de esforço)
| Ordem | Família | Exercícios | Vagas por semana somadas | Custo (unidades) | Vagas por unidade |
|---|---|---|---|---|---|
| 1 | **P** (nada novo no motor) | 13 | 13,3 | 13 | 1,02 |
| 2 | **Elástico** | 12 | 12,0 | 30 | 0,40 |
| 3 | **Máquina de perna com alavanca** | 7 | 6,1 | 20 | 0,31 |
| 4 | **M** (acessórios simples, estações de cabo) | 16 | 5,7 | 32 | 0,18 |
| 5 | **Trenó em trilho** (leg press, hack, panturrilha) | 4 | 1,6 | 14 | 0,12 |
| 6 | **Máquina de tronco com alavanca** | 8 | 2,4 | 22 | 0,11 |
| 7 | **Barra longa + rack** | 9 | 1,9 | 24 | 0,08 |
| 8 | **Smith** (depende da barra) | 2 | 0,7 | 10 | 0,07 |
| | **Total** | **71** | | **165** | |

**Recomendação [opinião]:** lote 2 = família P. Depois, a **máquina de perna antes do elástico**, apesar da conta: o elástico só fica na frente por causa do cenário casa, e o público principal é o Gustavo, numa academia. A extensora e a cadeira flexora são as máquinas que mais aparecem e hoje são cartão de texto. A barra longa e o smith ficam por último. Decisão do Gustavo (seção 9).

### 6.4 A fila, exercício por exercício (frequência estimada)
Vagas por semana somadas nos 4 cenários; entre parênteses, só na academia completa. ✚ = exercício novo.

| # | Exercício | Família | Custo | Vagas/semana |
|---|---|---|---|---|
| 1 | ponte-gluteo | P | 1 | 4,50 (0) |
| 2 | flexao-joelho-elastico | Elástico | 2 | 3,50 (0) |
| 3 | crucifixo-halteres | P | 1 | 3,25 (0,25) |
| 4 | cadeira-extensora | Máquina de perna | 2 (+6 da peça) | 3,00 (1,50) |
| 5 | face-pull-elastico | Elástico | 2 | 2,50 (0) |
| 6 | cadeira-flexora | Máquina de perna | 2 | 1,75 (1,75) |
| 7 | puxada-elastico | Elástico | 2 | 1,75 (0) |
| 8 | triceps-elastico-acima | Elástico | 2 | 1,75 (0) |
| 9 | crucifixo-inverso | P | 1 | 1,67 (0,42) |
| 10 | remada-elastico | Elástico | 2 | 1,50 (0) |
| 11 | afundo-tras | P | 1 | 1,50 (0,33) |
| 12 | desenvolvimento-unilateral | P | 1 | 1,38 (0,12) |
| 13 | puxada-barra-reta | M | 2 | 1,23 (0,35) |
| 14 | puxada-frente ✚ | M | 2 | 1,23 (0,35) |
| 15 | crucifixo-elastico | Elástico | 2 | 1,00 (0) |
| 16 | coice-maquina ✚ | Máquina de perna | 2 | 0,75 (0,75) |
| 17 | hip-thrust ✚ | Barra longa | 2 | 0,75 (0,75) |
| 18 | remada-baixa-estacao ✚ | M | 2 | 0,68 (0,30) |
| 19 | supino-inclinado-polia | M | 2 | 0,50 (0,50) |
| 20 | abdominal-declinado | M | 2 | 0,50 (0,50) |
| 21 | abdominal-maquina ✚ | Máquina de tronco | 2 | 0,50 (0,50) |
| 22 | goblet-kettlebell ✚ | M | 2 | 0,50 (0) |
| 23 | panturrilha-em-pe-maquina ✚ | Trenó | 2 | 0,44 (0,44) |
| 24 | panturrilha-leg-press | Trenó | 2 | 0,44 (0,44) |
| 25 | voador-invertido ✚ | Máquina de tronco | 2 | 0,42 (0,42) |
| 26 | abducao-maquina ✚ | Máquina de perna | 2 | 0,38 (0,38) |
| 27 | abducao-polia ✚ | M | 2 | 0,38 (0,38) |
| 28 | agachamento-barra | Barra longa | 2 | 0,38 (0,38) |
| 29 | agachamento-smith ✚ | Smith | 2 | 0,38 (0,38) |
| 30 | hack ✚ | Trenó | 2 | 0,38 (0,38) |
| 31 | leg-press | Trenó | 2 | 0,38 (0,38) |
| 32 | rosca-maquina ✚ | Máquina de tronco | 2 | 0,38 (0,38) |
| 33 | rosca-polia-costas | P | 1 | 0,38 (0,38) |
| 34 | rosca-scott ✚ | M | 2 | 0,38 (0,38) |
| 35 | barra-fixa-graviton ✚ | M | 2 | 0,35 (0,35) |
| 36 | terra-romeno-barra | Barra longa | 2 | 0,33 (0,33) |
| 37 | triceps-barra-reta | P | 1 | 0,33 (0,08) |
| 38 | supino-barra | Barra longa | 2 | 0,31 (0,31) |
| 39 | supino-maquina ✚ | Máquina de tronco | 2 | 0,31 (0,31) |
| 40 | supino-smith ✚ | Smith | 2 | 0,31 (0,31) |
| 41 | remada-articulada ✚ | Máquina de tronco | 2 | 0,30 (0,30) |
| 42 | crucifixo-polia-baixo | P | 1 | 0,25 (0,25) |
| 43 | panturrilha-sentada ✚ | Máquina de perna | 2 | 0,25 (0,25) |
| 44 | voador ✚ | Máquina de tronco | 2 | 0,25 (0,25) |
| 45 | desenvolvimento-barra | Barra longa | 2 | 0,12 (0,12) |
| 46 | desenvolvimento-maquina ✚ | Máquina de tronco | 2 | 0,12 (0,12) |
| 47 | triceps-maquina ✚ | Máquina de tronco | 2 | 0,08 (0,08) |

**Os outros 24** ficam com 0 vaga no modelo e só aparecem como alternativas ou em inventários fora dos 4 atalhos. São eles: afundo-peso-corpo, agachamento-halteres, agachamento-peso-corpo, barra-fixa-supinada, bulgaro-peso-corpo (P); agachamento-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, flexao-elastico, rosca-elastico, stiff-elastico (elástico); aducao-maquina e mesa-flexora (máquina de perna); coice-polia ✚, hiperextensao ✚, mergulho ✚, mergulho-graviton ✚, pull-through, remada-suspensao ✚, supino-polia (M); remada-barra, remada-invertida, rosca-barra-w, terra-hexagonal ✚ (barra longa). A ordem entre eles segue a família.

## 7. Mudanças propostas (só com aprovação)

### 7.1 Para `docs/pesquisa/regras.md`
- **`equipamento.capacidades` (nova):** o gerador trata o equipamento por capacidade; a lista final é a da seção 1; o multifuncional liga as capacidades das estações marcadas. Consenso (decisão do projeto, apoiada em `haugen2023` e `hernandezbelmonte2023`).
- **`equipamento.atalhos` (nova):** 3 atalhos de cenário, nenhum pré-marcado, com os conjuntos da seção 3. Consenso (decisão 7 do M3 e decisão do Gustavo no replanejamento).
- **`progressao.incremento.polia`:** passa a valer para "polia e máquinas com torre: +1 placa".
- **`progressao.incremento.maquina-anilha` (nova):** máquinas de anilha registram kg de anilhas por lado e sobem o menor par; a calibração vai por passos, sem fórmula, salvo se o peso do trenó for informado. Consenso.
- **`progressao.incremento.assistido` (nova):** no graviton, progredir = tirar uma placa de contrapeso; ao zerar, o exercício vira a versão livre. Consenso.
- **`progressao.incremento.halteres`:** acrescentar o kettlebell ("próximo peso da lista; salto acima de ~10% aplica `progressao.salto-grande` e a escada de carga leve"). Consenso.
- **`progressao.calibracao`** (proposta do T6): a fórmula só vale quando o kg total é conhecido (halter, kettlebell, barra); torre, máquina de anilha e contrapeso vão por passos.
- **`selecao.gluteo` (nova; revisa a ordem do T3 para glúteos):** agachar profundo ou afundo → extensão de quadril (hip thrust, glúteo na máquina, ponte, coice) → abdução como complemento. Um estudo (`plotkin2023`, `kubo2019`, `attarieh2026`).
- **`selecao.isolador-obrigatorio`** (proposta do T3): acrescentar `kassiano2026` e `zabaletakorta2021` às fontes da extensora. Continua moderada.
- **Selo do complemento de peito** (T3): "consenso" passa a "um estudo" para "o voador cresce o peitoral" (`pinto2025`). Continua complemento.
- **`selecao.mergulho` (nova):** mergulho nas paralelas só para intermediário e avançado (complexidade 3), com a articulação `ombro`. Consenso, com `mckenzie2022`.
- **`seguranca.montagem`** (cartão do T5): estender aos exercícios novos com travas e apoios (smith, hack, panturrilha sentada, hip thrust com banco travado, suspensão bem ancorada). Consenso.
- **`visao.desambiguacao` (nova):** as dicas da seção 4 entram no pedido ao modelo; o eval conta o par confundível ausente como falso positivo grave. Consenso.
- **Fontes novas para `fontes.md`** (resumo-PubMed, 01/11/2026): Attarieh 2025 (40082069), Attarieh 2026 (42842490), Nunes 2020 (32823490), Contreras 2015 (26214739), Kennedy 2024 (35586943), Krause Neto 2020 (32132843), Paz 2022 (35500965), Collings 2026 (41931009), Schwanbeck 2009 (19855308), Schick 2010 (20093960), Farias 2017 (27669189), Kassiano 2026 (41379528), Zabaleta-Korta 2021 (34743671), Kassiano 2025 *Res Q Exerc Sport* (39388663), Clark 2019 (28704312), Swinton 2011 (21659894), Stahl 2024 (38662880), Lawrence 2019 (30946266), Aguilera-Castells 2020 (29902124), McKenzie 2022 (36293792), Pinto 2025 (40266636), Escamilla 2006 (16494072), Saeterbakken 2013 (23096062), Franke 2015 (24947920), Rabello 2024 (39593452), Di Fonza 2026 (42647355), Padovan 2025 (41562724, a conferir com a chave `padovan2026` do `08-tecnica-guia.md`).

### 7.2 Para os dados
- **`src/domain/taxonomia/equipamentos.ts`:**
  - 21 ids novos em `ITENS`;
  - os atributos da seção 1.1 em `inventarioSchema`;
  - as capacidades novas em `CAPACIDADES`: `barra_hexagonal`, `kettlebell`, `banco_scott`, `banco_romano`, `smith`, `tornozeleira`, `puxador`, `remada_estacao`, `supino_maquina`, `voador`, `voador_invertido`, `desenvolvimento_maquina`, `remada_articulada`, `graviton`, `rosca_maquina`, `triceps_maquina`, `abdominal_maquina`, `hack`, `abdutora`, `adutora`, `gluteo_maquina`, `panturrilha_em_pe`, `panturrilha_sentada`, `suspensao`;
  - `polia_alta` e `polia_baixa` passam a valer também para as estações e para o multifuncional;
  - `polia_simples` troca `alturaRegulavel` por `altura` (`alta`, `baixa` ou `regulavel`), e a polia fixa passa a dar `polia_alta` ou `polia_baixa` (hoje ela só dá `polia`, que nenhum exercício pede);
  - `cadeira_extensora`, `cadeira_flexora`, `voador` e `supino_maquina` também valem pelas estações marcadas do multifuncional;
  - uma função `cargasKettlebell`.
- **`src/domain/biblioteca/index.ts`:**
  - `MUSCULOS` ganha `adutores` (sem meta, como o `ombro_anterior`);
  - `PADROES` ganha `extensao-quadril`, `abducao-quadril` e `aducao-quadril`;
  - `carga` ganha `anilha`, `assistida` e `kettlebell`.
- **`exercicios.json`:**
  - os 29 exercícios da seção 5, com `animacaoId: null`;
  - `agachamento-barra` com a tag `profundo`;
  - `ponte-gluteo` no padrão `extensao-quadril`;
  - `adutores` como secundário dos agachamentos profundos e do afundo (Kubo 2019; Plotkin 2023);
  - o campo `ordem` sai no R0b (T3), substituído pela tabela 2.1.

## 8. O que muda no app
- **R0b (gerador):** as vagas por função usam a tabela 2.1 como dado. A extensora entra sempre que houver (`selecao.isolador-obrigatorio`). Os padrões de glúteo são novos. A meta do R0 sobre "equipamento sem uso" é reescrita (seção 3.1).
- **R0c (catálogo):**
  - taxonomia com 46 ids e 29 exercícios novos (cartão de texto até a animação ser aprovada);
  - os tipos de carga novos no registro da série (kg de anilha por lado, contrapeso);
  - a visão com os ids, os atributos e as dicas;
  - os desenhos da lista de equipamentos para os 21 itens novos;
  - as animações em lotes, na ordem da seção 6, cada uma com a folha de contatos para aprovação.
- **R1 (cadastro rápido):**
  - os 3 atalhos na tela de equipamento, sem nada pré-marcado;
  - "academia completa" é o botão que o Gustavo pediu;
  - a pergunta única "qual a menor anilha?" quando houver item de anilha;
  - a esteira sai da lista de treino (continua reconhecida na foto).
- **R2 (acompanhamento):** a calibração e a volta de pausa do T6 usam os 5 tipos de carga da seção 1.1.

## 9. O que fica sem resposta
- **A lista do que é "comum" não tem fonte oficial** no Brasil (`03`). Os atalhos e o multifuncional "típico" são opinião, apoiada em guias não verificados.
- **Sem ensaio de hipertrofia** para hack, smith (como exercício comparado), supino e desenvolvimento na máquina, remada articulada, voador invertido, graviton, mergulho, kettlebell, banco romano, suspensão, abdominal e adutora na máquina. A base é EMG, biomecânica, a equivalência máquina = peso livre (robusta) e consenso.
- **Adutores:** não estão entre os 12 músculos com meta. Proponho tratá-los como o ombro anterior (contam, mas sem meta), e a máquina adutora fica opcional. **Decisão do Gustavo.**
- **Meta do R0 "0 equipamento sem uso":** barra hexagonal, banco romano, paralelas e adutora ficam sem vaga na academia completa. Proponho reescrever a meta (seção 3.1). **Decisão do Gustavo.**
- **Ordem dos lotes de animação:** a conta põe o elástico antes da máquina de perna. Eu recomendo a máquina de perna antes (seção 6.3). **Decisão do Gustavo.**
- **A frequência é estimativa** de um modelo simplificado (nível intermediário, ~8 vagas por dia, cenários com o mesmo peso). O número real sai do gerador do R0b. Vale medir de novo antes de abrir cada lote.
- **Os custos das animações são opinião**, calibrados por um único lote, sem peça nova no motor. A 1ª peça nova (provavelmente a máquina de perna) vai mostrar o custo real.
- **O valor padrão da menor anilha** (2 kg) é opinião; confirmar na academia do Gustavo (T8).
- **Peso do trenó e da barra do smith:** sem eles, a calibração é por passos, menos precisa. Nenhum estudo diz quanto isso importa.
- **Eval da foto:** não rodou. Depende da chave da Anthropic na máquina do Gustavo e de fotos dos aparelhos novos. Os pares que a academia dele não tiver ficam sem medida.
- **Busca sem resultado útil:** EMG ou hipertrofia com barra assistida em máquina, goblet com kettlebell × halter, máquina de tríceps, crucifixo na máquina × na polia. Registradas abaixo.
- **`nsca2021`** (manual de técnica da NSCA) continua não verificado, e é a fonte de consenso de quase todas as linhas de posição das fichas.
- **Padovan:** o `08-tecnica-guia.md` cita `padovan2026` com PMID não verificado. O estudo lido aqui (PMID 41562724) tem data de publicação de dezembro de 2025, e provavelmente é o mesmo. Conferir na entrada de `fontes.md`.

## Buscas registradas (PubMed, 01/11/2026)
`hack squat electromyography`; `preacher curl hypertrophy`; `hip thrust electromyography gluteus`; `hip abduction machine gluteus medius`; `pec deck electromyography pectoralis` (nada); `Smith machine free weight squat electromyography`; `hexagonal barbell deadlift`; `back extension hyperextension gluteus electromyography`; `suspension training inverted row electromyography`; `assisted pull-up machine` (nada útil); `pec deck fly pectoralis`; `chest fly machine electromyography` (nada); `machine chest press free weight bench hypertrophy` (nada); `lat pulldown electromyography grip`; `seated row electromyography latissimus`; `seated calf raise soleus`; `hack squat leg press`; `dip exercise shoulder`; `back extension exercise electromyography`; `assisted pull-up electromyography` (nada útil); `adductor hypertrophy training`; `abdominal crunch machine electromyography`; `pec deck`; `dumbbell fly cable crossover pectoralis` (nada); `Smith machine bench press electromyography`; `Smith machine hypertrophy`; `kettlebell goblet squat` (nada útil); `reverse fly rear deltoid electromyography` (nada); `shoulder press machine dumbbell electromyography` (nada útil); `hip abduction training hypertrophy gluteus medius`; `glute kickback electromyography` (nada); `inverted row suspension electromyography`; `hack squat`; `machine squat hypertrophy quadriceps`; `seated shoulder press electromyography`; `posterior deltoid exercises electromyography`; `hip adduction exercise adductor`; `lat pulldown hypertrophy`; `chin-up assisted band` (nada).
