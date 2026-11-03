# Equipamento mínimo: quem não tem nada, ou tem um aparelho só (03/11/2026)

> Revisão independente do cenário de equipamento mínimo: treinar no quarto, na sala ou no hotel, sem nada ou com um aparelho só. Tudo foi medido com dados fictícios e pode ser refeito com `npm run auditoria`, que gera os mesmos números a cada rodada (duas rodadas completas deram arquivos idênticos). Os números completos estão em `docs/revisoes/equipamento-minimo/`:
> - `estresse.md`: **483.840 programas**. São 52 cenários: o inventário vazio, os 46 itens sozinhos e 5 pares de casa. Eles dão 42 programas diferentes, porque itens que não abrem nenhum exercício caem na classe do vazio. Cada um foi cruzado com 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor (inclusive o punho);
> - `cobertura.md`: quantos exercícios cada cenário abre, por músculo e por vaga, em cada nível;
> - `progressao.md`: o "praticante simulado", 16 semanas em 26 exercícios de peso do corpo e de um aparelho só.
>
> A pesquisa está em `docs/pesquisa-v2/10-equipamento-minimo.md`, com as 7 perguntas. A seção para a página "Diagnóstico do treino-mvp" está pronta em `docs/revisoes/equipamento-minimo/secao-diagnostico.html`. Esta conta não conseguiu abrir a página publicada (o artefato aparece como "não encontrado"), então ela ainda não foi colada lá. Os selos seguem `docs/pesquisa/00-metodo.md`. O que é opinião minha está marcado **[opinião]**. **Nada mudou no app**: cada item espera a sua decisão, Gustavo.

## Em uma frase
O cenário mínimo continua **seguro e honesto**: em quase meio milhão de programas, nenhum exercício carrega uma região com dor forte, nenhum dia fica vazio e todo músculo abaixo da meta tem aviso com o motivo verdadeiro. Mas, sem nada, **5 músculos ficam com zero série em 100% dos programas** (costas, ombro lateral, ombro de trás, bíceps e posteriores da coxa). Em algumas divisões, um dia chamado **"Puxar" sai com panturrilha e abdominal**. A progressão **não sobe em 30 de 52 casos simulados**. E o app **não diz o que resolveria**.

## O que está bom (medido)
| O que | Resultado |
|---|---|
| Dor acima de 5 numa região | 0 exercício que carrega a região marcada, nos 423.360 programas com dor |
| Região que o padrão de movimento carrega e o dado não marca | 0 ocorrência |
| Dias vazios ou só com abdominal | 0, em todos os cenários e dores (a regra `selecao.dia-sem-principal` segura) |
| Motivo do aviso | 0 caso de "nenhum exercício possível" dito para um músculo que tinha exercício possível |
| Aviso de meta | todo músculo com meta abaixo do limiar tem aviso, em todos os cenários |
| Determinismo | duas rodadas completas geram arquivos idênticos |
| Números de 02/11 | o vazio reproduz a tabela da auditoria: peito 5,1, tríceps 2,6, quadríceps 6,2, glúteos 8,1, panturrilha 7,5, abdômen 4,3 e 0 nos outros cinco |

Isso continua valendo com as propostas abaixo: nenhuma delas tira um exercício por dor nem mexe na triagem.

## Os achados, por prioridade
Prioridade = gravidade × frequência. Gravidade **alta**: segurança, ou o app prescreve ou ensina algo errado; **média**: o treino fica pior do que poderia; **baixa**: texto ou detalhe.

| # | Achado | Gravidade | Frequência | Esforço |
|---|---|---|---|---|
| 1 | Dia de "Puxar" ou "Superior" sem tronco nem braço, com um aviso que não é verdade | alta | 192.744 dias; 7.296 sem dor nenhuma, em 22 das 42 classes | pequeno |
| 2 | Sem nada para puxar: 4 músculos com zero série, sem aviso da vaga e sem dizer o que resolve | média | 100% dos programas em 33 dos 52 cenários | pequeno (avisos) a médio (exercícios) |
| 3 | Posteriores da coxa com zero série sem equipamento | média | 100% em 38 dos 52 cenários | médio |
| 4 | Guia: o cenário com menos animação do app | alta (regra do projeto) | 22% sem guia nenhum no vazio; 70% com elásticos | pequeno a médio (família P) |
| 5 | A progressão de peso do corpo e de elástico quase não anda | média | 30 de 52 casos simulados não sobem em 16 semanas | médio |
| 6 | Um aparelho só abre quase nada (kettlebell, paralelas, bola, step, suspensão) | média | 8 dos 9 aparelhos de casa | pequeno a médio |
| 7 | O tempo sobra, e o app não explica por quê | baixa | sem nada, o dia mais longo para em ~42 min com 60 a 150 min escolhidos | pequeno |
| 8 | O app não sabe se há mesa, porta, cadeira firme ou onde prender o elástico | média | todo exercício novo de casa; hoje, a puxada e o face pull com elástico | médio |
| 9 | Sem nada e com dor no punho, no ombro ou no cotovelo, o tronco inteiro sai | baixa (o app avisa certo) | 1.880 dias de superior sem tronco no vazio, por dor | pequeno |
| 10 | Avançado sem nada: o app não diz que o peso do corpo pode ter teto | baixa | todo avançado no vazio | pequeno |

---

### 1. Um dia chamado "Puxar" com panturrilha e abdominal
**Problema.** Sem nada para puxar, a vaga "puxar" não tem exercício, e a regra `selecao.dia-sem-principal` enche o dia com o que houver. O dia continua com o nome "Puxar" ou "Superior", e o aviso diz que entraram "outros possíveis **para os músculos do dia** (panturrilha em pé no chão)". Isso não é verdade: panturrilha não é músculo de um dia de puxar. Em outros casos, o "Superior" fica com **um exercício só e 10 minutos**, mesmo com 60 ou 90 minutos disponíveis. As divisões com dia de puxar (superior/inferior e empurrar/puxar/pernas) continuam sendo oferecidas a quem não tem nada para puxar.

**Exemplos** (`estresse.md`, `dia.superior-sem-superior`; casos gerados pelo app):
- vazio · iniciante · Superior/Inferior + Empurrar/Puxar/Pernas (5 dias) · 60 min: Superior = flexão 3 (10 min); Empurrar = flexão 3 (10 min); **Puxar = panturrilha 2, abdominal 2 (9 min)**.
- só paralelas · intermediário · Empurrar/Puxar/Pernas 2x · 60 min: **Puxar A = panturrilha e abdominal; Puxar B = búlgaro e abdominal**.
- só kettlebell · intermediário · Superior/Inferior 2x · 60 min: Superior A e B = **flexão 3, e só** (10 min cada).

**Evidência.** consenso (`consenso-projeto`): o nome do dia e o texto precisam dizer a verdade (`CLAUDE.md`, evidência e segurança). Divisões equivalentes rendem o mesmo com o mesmo volume (`divisao.equivalencia`, moderada): a escolha da divisão é de encaixe na rotina, então tirar do caminho uma divisão que o equipamento não preenche não custa crescimento.

**Proposta.** (a) Corrigir o texto: quando o preenchimento pega um músculo de fora do dia, dizer "entram exercícios de outros músculos". (b) Com nada para puxar, a tela de divisão mostra primeiro as divisões de corpo todo e marca as que têm dia de puxar com "seu equipamento não tem exercício de puxar". A pessoa continua podendo escolher. (c) Teste: nenhum dia de nome "Puxar" ou "Superior" sem tronco nem braço, sem aviso.

**Esforço.** Pequeno.

### 2. Sem nada para puxar, a vaga some calada e o app não diz o que resolve
**Problema.**
- Com o inventário vazio, **15 das 22 funções ficam sem opção** (`cobertura.md`, iniciante). São as 14 que a auditoria já tinha listado, mais a adução, que é opcional.
- `resolver(vaga)` devolve nulo e a vaga some do dia (`src/domain/gerador/index.ts`, ~linha 248).
- Só a extensora, a abdução e a panturrilha sentada têm `lacuna`. Nas outras 11, a pessoa só vê o aviso do músculo: "costas 0 de 6 séries, porque nenhum exercício possível com o seu equipamento".
- O "empurrar vertical" some **sem aviso nenhum**, porque o ombro da frente não tem meta. Isso é aceitável: a flexão dá séries indiretas.
- **Nenhum aviso**, em 483.840 programas, diz o que resolveria (0 avisos com "compre" ou equivalente).
- O aviso `equipamento.sem-puxada-vertical` **nunca aparece quando não há puxar nenhum** (0 vezes), porque só dispara quando a puxada cai para uma remada.

**Exemplos** (`estresse.md`, `vaga.so-aviso-do-musculo.*` e `equilibrio.sem-puxar`):
- vazio · iniciante · Corpo todo A/B · 20 min: A = agachamento 2, flexão 2, panturrilha 4; B = afundo 2, flexão 2, abdominal 4. **4 séries de empurrar e nenhuma de puxar.**
- só kettlebell · avançado · Corpo todo A/B/C · 120 min: goblet, flexão e abdominal; costas, ombros, bíceps e posteriores em 0.
- vazio · avançado · Corpo todo 4x · 60 min · **prioridade costas**: "costas 0 de 14", e nada mais.

**Evidência.**
- robusta (`volume.semanal.dose-resposta`): zero série não cresce o músculo.
- consenso: sem algo para segurar e puxar, ou uma carga para levantar, **não existe exercício de puxar**. Não achei estudo de mesa, porta com toalha, mochila ou "superman" (`10-equipamento-minimo.md`, pergunta 2).
- um estudo (Park 2015, EMG): o "superman" ativa menos o latíssimo que a remada invertida, então não conta como costas.
- O custo da ausência, pelas regras do projeto: nada para puxar = costas 0, bíceps 0 e ombro de trás 0. Uma remada de 3 séries em 2 dias dá costas 6, bíceps 3 e ombro de trás 3 (pergunta 2, tabela do custo).

**Proposta.**
- (a) `lacuna` nas funções de puxar, bíceps, ombro lateral e ombro de trás, com o que falta e o que resolveria. Exemplo: "Sem nada para puxar: costas, bíceps e ombro de trás ficam sem treino. Um jogo de elásticos resolve a remada sem precisar de porta". O texto depende da sua pergunta 2.
- (b) Uma regra `equipamento.sem-ancoragem`: o app **não inventa** exercício de costas sem ancoragem nem carga, e diz isso.
- (c) Teste de propriedade: toda vaga sem opção tem aviso, com motivo verdadeiro.
- (d) Exercícios com objeto doméstico, se você aprovar (pergunta 4).

**Esforço.** Pequeno para (a), (b) e (c); médio para (d).

### 3. Posteriores da coxa com zero série
**Problema.** Sem flexora, halter ou elástico, nenhum exercício trabalha os posteriores. A "flexão de joelho" tenta "dobrar o quadril" (`seNada`), que também está vazia. Isso dá zero série em **100% dos programas** de 38 dos 52 cenários: o vazio, a barra fixa, a suspensão, o kettlebell, as paralelas e o step.

**Exemplos** (`estresse.md`, `volume.zero.posteriores`):
- vazio · iniciante · Corpo todo A/B · 20 min (o programa do achado 2): agachamento e afundo, nenhum posterior.
- só barra fixa · intermediário · Corpo todo A/B/C · 45 min: barra fixa, flexão, agachamento, afundo, ponte; posteriores 0 de 6.
- só suspensão · iniciante · Superior/Inferior 2x · 60 min: posteriores 0 de 6.

**Evidência.**
- **moderada** para "o nórdico cresce os posteriores": dois grupos de pesquisa (Maeo 2024, 42 homens, ressonância; Morin 2025) e uma meta-análise em atletas que viu espessura com volume alto (Cholp 2025).
- **um estudo** para "cresce menos que a flexão de joelho com o quadril dobrado" (+11% × +18%).
- **um estudo** para a dor: a 1ª sessão derruba a força por 3 dias, subir o volume rápido dói mais e o nórdico assistido dói menos (`coratella2025`, `behan2023`, `ishoi2025`).
- **consenso** para a flexão de joelho deslizante, uma toalha no chão liso. É o mesmo movimento da flexão na bola, que já está na biblioteca, e não tem nenhum estudo.

**Proposta.** Dois exercícios no nível 3 da "flexão de joelho": a **flexão deslizante**, para todos, e o **nórdico**, só para intermediário e avançado (complexidade 3), começando assistido e com 1 a 2 séries. **Estimativa** (rodada da grade com 1 caso a cada 8 numa cópia da biblioteca com os 4 exercícios do pacote A): no vazio, os posteriores vão de **0 para ~5,5 séries por semana**, e os programas com zero caem de 100% para ~9%.

**Esforço.** Médio (2 fichas, 2 cartões e a regra `selecao.nordico`).

### 4. O cenário com menos guia do app
**Problema.**
- **No vazio:** 59% das prescrições têm animação e 22% não têm guia nenhum. Os três sem nada são justamente o **agachamento, o afundo e o búlgaro com o peso do corpo**, embora o motor já tenha as animações com halteres desses três (`goblet`, `afundo`, `bulgaro`).
- **Com elásticos:** 70% sem guia nenhum (barra de porta + elásticos, 64%).
- **Exercícios novos:** baixam a fatia com animação. Na estimativa, ela cai de 59% para 44% com o pacote A e para 26% com o pacote B, porque exercício novo é cartão de texto até a sua aprovação.

**Exemplos** (`estresse.md`, seção "Guia"): vazio, 22% sem nada; só elásticos, 70%; elásticos + barra de porta, 64%.

**Evidência.** regra do projeto (`CLAUDE.md`, qualidade do guia). O custo por família está em `pesquisa-v2/08`, seção 6: a família P custa 1 unidade e não tem nada novo no motor.

**Proposta.** Animações da família P, uma folha por vez, para a sua aprovação: **agachamento, afundo e búlgaro com o peso do corpo** (as poses de hoje sem os halteres), a **barra fixa supinada** e, se entrarem, a **flexão fechada** e a **flexão deslizante**. Até a aprovação, cada um aparece como cartão de texto. Fila: pergunta 5.

**Esforço.** Pequeno a médio (1 unidade cada, mais as fichas e cartões que faltam).

### 5. A progressão sem kg quase não anda
**Problema.** A escada é uma só para tudo: mais repetições → descida de 3 s → variação mais difícil → carga externa. Ela só sobe com todas as séries no topo de faixas largas (8–20, 12–25, 15–30). No praticante simulado, que é um modelo:
- **30 de 52 casos não sobem nenhuma vez em 16 semanas.** A flexão não sobe nem começando no meio da faixa, porque a 1ª série precisa ir de 14 para 22 repetições.
- **808 das 1.664 sessões** viram "estagnado" (3 sessões sem melhora).
- A mediana da 1ª subida é a **semana 15**.
- O 4º degrau ("carga externa ou elástico mais forte") é oferecido a quem não tem carga, ou tem um elástico só. Isso se lê no código; no modelo, ninguém chegou lá.
- Com um par só de halteres ou um kettlebell só, não há carga maior: fica só o texto da escada.

**Exemplos** (`progressao.md`):
- flexão (8–20): 0 subida em 16 semanas, nos dois começos;
- remada com elástico (10–20, 3 intensidades): a intensidade informada não é usada;
- agachamento com o peso do corpo (15–30): a 1ª série precisa ir de 16 para 32.

**Evidência.**
- moderada (pergunta 1): até ~30–35 repetições perto da falha cresce como carga alta, também em treinados.
- um estudo (`lasevicius2022`): com carga baixa, parar longe da falha não cresce.
- **consenso** para toda escada e para a largura da faixa: ninguém testou uma ordem de degraus, nem comparou faixas largas e estreitas.
- O achado 8 da auditoria (backlog, R5) está reconfirmado com números.

**Proposta.** Escada por exercício (`progressao.escada-por-exercicio`; pergunta 5, tabela 5.3), com:
- a flexão pela escada já aprovada (`equipamento.flexao-por-supino`), com degraus intermediários;
- o elástico subindo pela intensidade de 1 a N (`progressao.escada-elastico`);
- faixas de 5 a 8 repetições de largura, com topo até 20 (`reps.faixa.degrau`);
- um aviso de fim de escada (`equipamento.fim-da-escada`).

**Esforço.** Médio: mexe na progressão e nos snapshots de quem usa peso do corpo e elástico (o Diego).

### 6. Um aparelho só abre quase nada
**Problema** (`cobertura.md`, iniciante, exercícios possíveis):
- **o vazio:** 7 exercícios;
- **kettlebell, suspensão, bola e paralelas:** 8 cada, ou seja, um a mais que o vazio. As paralelas, para o iniciante, abrem zero, porque o mergulho só vale do intermediário em diante (`selecao.mergulho`);
- **step:** 9; **barra fixa:** 10;
- **elásticos:** 19; **halteres sem banco:** 21;
- **sozinhos não abrem nada:** a polia simples (falta o pegador), o banco reto, o regulável e o Scott, os acessórios de polia e a esteira.

Com um kettlebell só, o app trata o item como se só servisse ao goblet.

**Exemplos:**
- só kettlebell · intermediário · Superior/Inferior 2x · 60 min: Superior A e B = flexão 3, e só;
- só paralelas · iniciante: o programa do vazio;
- só suspensão: remada sim; ombros, posteriores e braços em 0.

**Evidência.**
- robusta (`haugen2023`, `selecao.equivalencia-equipamento`): o equipamento não decide o crescimento, então um kettlebell de 12 kg vale como um halter de 12 kg nos exercícios de um peso só (consenso, por essa equivalência).
- um estudo: flexão na suspensão (`kohiruimaki2019`, 8 homens, sem controle) e suspensão ≈ treino tradicional em idosos (`soligon2020`).

**Proposta.** (a) **Kettlebell como halter** (`equipamento.kettlebell-como-halter`) nos exercícios com um peso só: remada unilateral curvada, stiff unilateral, afundo com o peso no peito, desenvolvimento unilateral e ponte com peso. Só muda dados. (b) Flexão na suspensão (um estudo). (c) A polia simples sozinha pede um pegador: a tela de equipamento poderia lembrar disso. Os outros exercícios propostos para a suspensão, as paralelas, a bola e o step vão para o backlog **[opinião]**: rendem pouco por exercício.

**Esforço.** Pequeno para (a); médio para (b).

### 7. O tempo sobra, e o app não explica
**Problema.** No vazio, os exercícios possíveis acabam antes do tempo. O dia mais longo para em **~42 min (mediana)** com 60, 90, 120 ou 150 min escolhidos, e 97% dos programas de 90 min usam menos de 70% do tempo. Os dias de superior chegam a ter **10 minutos**. Nenhum aviso explica que o limite é o equipamento, e não os minutos.

**Exemplos** (`estresse.md`, seção "Tempo"):
- vazio · intermediário · Superior/Inferior 2x · 90 min: dias de 10, 24, 10 e 37 min;
- só kettlebell · avançado · Corpo todo A/B/C · 120 min: dias de 23, 22 e 39 min;
- só step · 60 min: 2,7 exercícios por dia, dia mais longo de 44 min.

**Evidência.** robusta: mais séries semanais, mais crescimento (`volume.semanal.dose-resposta`). Mas o teto de 4 séries por exercício e de 10 por sessão (`volume.series-por-exercicio`, `volume.sessao.teto`, moderada) segura o volume com tão poucos exercícios. O que falta é exercício, não tempo.

**Proposta.** Um aviso honesto quando o dia mais longo usa menos de ~70% do tempo por falta de exercício: "Com o seu equipamento, o treino dura cerca de X min; mais tempo não acrescenta exercício. Um jogo de elásticos abriria mais N exercícios." O texto do item depende da pergunta 2. Os exercícios novos também ajudam: na estimativa, com os pacotes A e B, o dia de 90 min do vazio vai de ~41 para ~61 min.

**Esforço.** Pequeno.

### 8. O app não sabe o que há em casa
**Problema.** A capacidade `apoio` é sempre verdadeira ("parede, porta, cadeira"). Mas o búlgaro sem peso pede um sofá ou uma cadeira firme. A puxada, o face pull e o crucifixo com elástico pedem um ponto onde prender o elástico. E todo exercício novo de casa depende de algo: mesa robusta, porta que tranca, sofá pesado para o nórdico, chão liso para a flexão deslizante, degrau. O app não pergunta nada disso.

**Exemplos:**
- só elásticos: a puxada com elástico entra no puxar vertical sem perguntar se há onde prender;
- vazio: o búlgaro com o peso do corpo entra sem perguntar pela cadeira;
- o nórdico proposto pede uma âncora para os calcanhares.

**Evidência.** consenso (`seguranca.montagem`; `kerr2010`, `coffey2026`): os acidentes (queda, pancada) são a maior causa de pronto-socorro na musculação. Há relatos de caso de elástico que solta e machuca o olho (Heyn 2023, consenso: relato de caso não dá taxa).

**Proposta [opinião].** Uma lista curta e opcional de "o que tem em casa", declarada pela pessoa e nunca pela foto: cadeira firme sem rodinhas, sofá ou cama pesados, chão liso, degrau e onde prender o elástico. Cada item libera os exercícios que dependem dele (`equipamento.casa-apoios`). E o texto de montagem segura de casa nos cartões (`seguranca.montagem` revista). Nada vem pré-marcado.

**Esforço.** Médio (taxonomia, tela e testes).

### 9. Com dor no punho, no ombro ou no cotovelo, sem nada, o tronco inteiro sai
**Problema.** A flexão é o único exercício de tronco do vazio. Com dor acima de 5 no punho, no ombro ou no cotovelo, ela sai, e os dias de superior ficam só com pernas. Num caso, o "Superior A" tem **6 min, com panturrilha 3**. O app avisa certo ("por causa da dor no punho"), e isso é seguro.

**Exemplos** (`estresse.md`, seção "Segurança"):
- vazio · iniciante · Superior/Inferior + Corpo todo · 20 min · punho 7: Superior A = panturrilha 3;
- vazio · intermediário · Corpo todo A/B/C · 45 min · ombro 7: sem nenhum exercício de tronco;
- só barra fixa · ombro 7: a barra e a flexão saem.

**Evidência.** consenso (`tecnica.flexao.punho` proposta): a flexão com as mãos fechadas ou sobre pegadores deixa o punho reto. O único estudo achado é em cadáver e está NÃO VERIFICADO. O app não diagnostica (`CLAUDE.md`).

**Proposta.** Manter a exclusão como está. Com o punho marcado de 3 a 5 (dor leve), o cartão da flexão sugere as mãos fechadas numa toalha ou sobre pegadores. Não muda nada com dor acima de 5.

**Esforço.** Pequeno (texto do cartão).

### 10. O avançado sem nada não sabe que o peso do corpo pode ter teto
**Problema.** O app monta o programa do avançado no vazio como o de qualquer um, sem dizer nada sobre o limite do peso do corpo.

**Evidência.** Não achei estudo de hipertrofia com calistenia em treinados que tenha durado o bastante: o único, `kotarsky2018`, durou 4 semanas, e nem o grupo do supino cresceu. O teto é dedução: quando nem a variação mais difícil leva a série perto da falha em ~30 repetições, a carga ficou abaixo do que os estudos testaram (`lasevicius2018`, `lasevicius2022`, um estudo cada). Pergunta 1, seção 1.2.

**Proposta.** Pergunta 6.

---

## Exercícios novos propostos
Precisão vale mais que quantidade (`CLAUDE.md`). A lista abaixo é o que eu recomendo **[opinião]**; o resto da pesquisa (rosca isométrica, superman, sissy squat, remada na porta…) fica de fora ou no backlog, com o motivo, em `10-equipamento-minimo.md`. Todos entram com `carga: "peso-corpo"` e `animacaoId: null`, com ficha e cartão de texto. A escada de cada um está na pergunta 5, tabela 5.3; as articulações, na pergunta 6, tabela 6.1.

| Exercício (id) | Função e nível em `funcoes.json` | Músculos (principal / secundário) | `requer` | Articulações | Faixa | Escada (resumo) | Selo | Fontes | Referência visual (não assistida) |
|---|---|---|---|---|---|---|---|---|---|
| Flexão fechada `flexao-fechada` | tríceps (complemento), nível 2, ao lado do mergulho | tríceps, peito / ombro (frente) | `apoio` | ombro, cotovelo, punho | 8–15 | inclinada → chão → pés elevados | moderada (EMG: ativa mais o tríceps); um estudo (a flexão cresce o tríceps) | `cogley2005`, `marcolin2015`, `kikuchi2017` | vídeos "Close-Grip Push Ups" (canal não confirmado) |
| Flexão de joelho deslizante `flexao-joelho-deslizante` | flexão de joelho, nível 3, ao lado da flexão na bola | posteriores / glúteos | `apoio` (+ chão liso, item 8) | joelho | 8–15 | bilateral → só a volta lenta → uma perna | consenso | `maeo2021` (por analogia) | The Prehab Guys, "Single Leg Hamstring Curl – Slider" |
| Nórdico `nordico` (complexidade 3) | flexão de joelho, nível 3 | posteriores / — | `apoio` (+ âncora para os calcanhares, item 8) | joelho | 4–8 descidas | assistido → descida de 3–5 s → completo; 1–2 séries no começo | moderada (cresce); um estudo (dor; < flexora sentada) | `maeo2024`, `morin2025`, `cholp2025`, `behan2023`, `coratella2025`, `ishoi2025` | E3 Rehab, "How to Set Up, Perform, & Program Nordic Hamstring Curls" |
| Pike `pike` | empurrar vertical, nível 3 (alternativa) | ombro (frente) / tríceps, peito | `apoio` | ombro, cotovelo, punho | 6–12 | pike → pés na cadeira (intermediário) | consenso | — | FitnessFAQs, "Are You Doing Pike Push-Ups Correctly?" |
| Remada com mochila ou galão `remada-unilateral-objeto` (**só se a pergunta 4 for "sim"**) | puxar horizontal e puxar vertical, nível 3 | costas / bíceps, ombro (trás) | `carga_improvisada` (nova, declarada) | ombro, cotovelo, lombar | 10–16 | repetições → descida lenta → mais peso na mochila | consenso (objeto = halter); robusta (carga baixa até a falha) | `schoenfeld2017b`, `lopez2021` | "How To Do a Row at Home" (canal não confirmado) |
| Rosca, elevação lateral, tríceps francês e crucifixo invertido com objeto (4 ids `*-objeto`; **só se a pergunta 4 for "sim"**) | bíceps, elevação lateral, tríceps acima da cabeça e ombro de trás, último nível | o da função | `carga_improvisada` | os do padrão (6.1) | 12–20 | repetições → pausa → mais peso | consenso; um estudo para o tríceps acima da cabeça (`maeo2023`) | `maeo2023`, `larsen2025` | — |
| Remada invertida na mesa `remada-invertida-mesa` (**só se a pergunta 3 for "sim"**) | puxar horizontal e vertical, nível 2, ao lado da remada invertida | costas / bíceps, ombro (trás) | `mesa_robusta` (nova, declarada) | ombro, cotovelo | 8–15 | corpo inclinado → horizontal → pés elevados | um estudo (EMG da remada invertida numa barra); consenso (mesa) | `fenwick2009`, `youdas2016` | "Stronger Back at Home! How to Do Inverted Rows with a Table" (canal não confirmado) |

**O que cada pacote muda** (**estimativa**: a mesma grade, com 1 caso a cada 8, numa cópia da biblioteca fora do app; o pacote "objeto" foi simulado como se a pessoa tivesse declarado ter uma mochila ou um galão):

| Vazio, séries por semana (média) | costas | ombro lateral | ombro (trás) | bíceps | tríceps | posteriores | peito | programas sem puxar | com animação |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Hoje | 0 | 0 | 0 | 0 | 2,5 | 0 | 5,1 | 100% | 59% |
| A: flexão fechada, deslizante, nórdico, pike | 0 | 0 | 0 | 0 | 4,8 | 5,5 | 6,6 | 100% | 44% |
| A + objeto doméstico (5) | 3,9 | 5,9 | 4,0 | 6,6 | 6,1 | 4,8 | 5,9 | 0% | 27% |
| A + objeto + mesa | 6,7 | 5,7 | 5,3 | 7,5 | 6,1 | 4,8 | 5,9 | 0% | 26% |

Também **[estimativa]**: os dias de "superior sem tronco" caem de 24.092 para 273 (na amostra) com os pacotes A e B; com elásticos, os pacotes quase não mudam nada (o elástico já cobre essas funções). A queda da coluna "com animação" é o argumento da pergunta 5.

---

## Perguntas que só você decide
Nada vem marcado. Para cada uma: a evidência, o efeito medido e as opções.

### 1. "Não tenho nada" vira um botão no cadastro?
- **Hoje:** só o texto de ajuda "Sem nada marcado, o programa usa o peso do corpo". Os 3 atalhos são casa, condomínio e academia (`equipamento.atalhos`).
- **Evidência:** consenso (decisão de produto; `consenso-projeto`). Não há estudo que diga qual tela é melhor.
- **Efeito:** a escolha fica explícita, como as outras, e o app pode mostrar logo o que falta e o que resolveria (achados 2 e 7). Nenhum número do programa muda.
- **Opções:** (a) um 4º atalho, "Só o peso do corpo", que não marca nada e mostra o resumo do que fica de fora; (b) deixar como está; (c) outra.

### 2. O app pode sugerir comprar um item? Qual primeiro, e com que texto?
- **Evidência:**
  - Elásticos: moderada para força (`lopes2019`) e um estudo para hipertrofia, em idosas (`harper2025`).
  - Barra fixa: EMG (`youdas2010`, `youdas2016`).
  - Suspensão: o único ensaio de hipertrofia dos três, em idosos (`soligon2020`).
  - A regra `equipamento.escada-carga-leve` já termina em "sugerir comprar carga"; o vazio não tem equivalente.
- **Efeito medido** (`estresse.md`):

| Item comprado (sozinho, sobre o vazio) | costas | ombro lateral | ombro (trás) | bíceps | posteriores | funções de tronco vazias que ele preenche |
|---|---:|---:|---:|---:|---:|---:|
| Nenhum | 0 | 0 | 0 | 0 | 0 | — |
| Elásticos (1 intensidade) | 8,0 | 5,8 | 4,5 | 7,3 | 7,1 | 8 de 9 |
| Barra fixa de porta | 5,3 | 0 | 1,5 | 2,7 | 0 | 1 de 9 |
| Suspensão | 5,9 | 0 | 3,0 | 3,0 | 0 | 2 de 9 (as duas de puxar, com a mesma remada) |

- **[opinião]** O elástico primeiro: é o único que faz remada sem porta (preso nos pés) e preenche 8 das 9 funções de tronco vazias. A barra de porta vem depois, se o batente aceitar.
- **Texto possível:** "Sem nada para puxar, costas, bíceps e ombro de trás ficam sem treino. Um jogo de elásticos resolve: com ele, o programa ganha remada, rosca e elevação lateral."
- **Opções:** (a) sugerir, com o elástico primeiro; (b) sugerir os três, lado a lado, com a tabela acima, sem ordem; (c) não sugerir compra, só dizer o que falta; (d) outra.

### 3. A remada invertida na mesa entra?
- **Evidência:** a remada invertida numa barra ativa muito o latíssimo, com pouca carga lombar (um estudo, EMG: `fenwick2009`, `youdas2016`). Para a mesa, **nenhum estudo**, nem de segurança. A pessoa fica deitada embaixo, e se a mesa virar, cai em cima dela. O app não vê a mesa.
- **Os dois pesquisadores divergiram.** Um escreveu um texto de montagem ("só mesa pesada, de madeira maciça, sem vidro; teste com metade do peso"). O outro recomendou não entrar.
- **Efeito estimado:** costas no vazio de ~3,9 para ~6,7 séries, se o objeto doméstico também entrar; sozinha, ela é a única remada do vazio.
- **Opções:** (a) entrar, com a montagem segura em destaque e só se a pessoa declarar a mesa (item 8); (b) entrar só como alternativa, nunca como 1ª escolha; (c) não entrar.

### 4. Objeto doméstico (mochila, galão) entra como carga?
- **Evidência:** robusta para "carga baixa até perto da falha cresce como carga alta" (`schoenfeld2017b`, `lopez2021`). **Nenhum estudo** com objeto doméstico. A mochila não tem kg confiável; 1 L de água ≈ 1 kg.
- **Efeito estimado:** é o que mais muda o vazio, porque tira costas, bíceps e ombros do zero (tabela dos pacotes).
- **Como registrar:** uma capacidade declarada, `carga_improvisada`, marcada pela pessoa, nunca pela foto. A progressão vai por repetições e por "mais peso na mochila", sem prometer kg.
- **Opções:** (a) entrar, com os 5 exercícios; (b) entrar só a remada; (c) não entrar.

### 5. A fila das animações muda?
- **Hoje:** a fila aprovada em 01/11 (`pesquisa-v2/08`, seção 6) é família P → máquina de perna → elástico → …, porque o público principal treina numa academia.
- **Efeito medido:** sem nada, 22% das prescrições não têm guia nenhum (agachamento, afundo e búlgaro sem peso); com elásticos, 70%. Os exercícios novos baixam a fatia com animação de 59% para 26 a 44% (estimativa).
- **Custo:** os de peso do corpo são família P, 1 unidade cada e nada novo no motor. São o agachamento, o afundo e o búlgaro sem peso, a barra supinada, a flexão fechada e a deslizante. O nórdico e o pike pedem pose nova (família M, 2 unidades). A mesa, a cadeira e a toalha pedem peça nova no motor (+6 na 1ª).
- **Opções:** (a) os 4 P que já existem no app (agachamento, afundo e búlgaro sem peso, e a barra supinada) entram já nesta sessão, antes da máquina de perna; (b) só os P dos exercícios novos que você aprovar; (c) a fila fica como está; (d) outra.

### 6. Avançado sem nada: o app avisa que o peso do corpo pode ter teto?
- **Evidência:** **não achei estudo** de calistenia em treinados longo o bastante, nem a favor nem contra um teto. O que existe é a dedução da pergunta 1, seção 1.2, e um estudo com 20% de 1RM que cresceu menos (`lasevicius2018`).
- **Efeito:** só texto.
- **Opções:**
  - (a) Avisar pelo comportamento, e não pelo nível. O aviso só aparece quando um exercício chega ao último degrau e a 1ª série passa de 30 repetições em 2 sessões: "Você chegou ao fim do que o peso do corpo oferece para este músculo…" (`equipamento.fim-da-escada`, consenso).
  - (b) Avisar de antemão todo avançado que escolhe "nada".
  - (c) Não avisar.

---

## Decisões do Gustavo
A preencher na revisão, item a item. Nada está marcado.

| # | Item | Decisão |
|---|---|---|
| 1 | Dia de "Puxar" sem puxar: texto verdadeiro e divisões de corpo todo primeiro | |
| 2 | Aviso por vaga sem opção (`lacuna`) e `equipamento.sem-ancoragem` | |
| 3 | Flexão de joelho deslizante e nórdico | |
| 4 | Animações da família P (agachamento, afundo, búlgaro sem peso, barra supinada) | |
| 5 | Escada por exercício, elástico pela intensidade e faixas mais estreitas | |
| 6 | Kettlebell como halter; flexão na suspensão | |
| 7 | Aviso de tempo que sobra por falta de exercício | |
| 8 | Lista "o que tem em casa" e montagem segura de casa | |
| 9 | Cartão da flexão com as mãos fechadas (dor leve no punho) | |
| 10 | Flexão fechada e pike | |
| P1 | Botão "não tenho nada" | |
| P2 | Sugestão de compra | |
| P3 | Remada invertida na mesa | |
| P4 | Objeto doméstico como carga | |
| P5 | Fila das animações | |
| P6 | Aviso de teto para o avançado | |
| — | Personas novas (Elisa, sem nada; Fábio, só barra de porta), teste de propriedade e e2e do cadastro vazio | |
