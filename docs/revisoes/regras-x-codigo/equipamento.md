# Equipamento, locais, dados e privacidade: relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# D1 — conferência das 18 regras de equipamento, visão, privacidade e dados

Só leitura. Além de ler o código, rodei o gerador com `npx tsx` num script fora do repositório
(`scratchpad/d1/a.ts`) para os exemplos marcados com "(rodado)". Não rodei o app no navegador nem os testes.

Resumo: 9 batem, 7 com o código divergente, 1 com a frase divergente, 1 que não está no app.

| id | classificação | onde no código (arquivo:linha) | evidência |
|---|---|---|---|
| equipamento.fim-da-escada | o código diverge | `src/domain/progressao/index.ts:314-319`; `src/features/treino/Treino.tsx:603-616`; `src/features/entenda/Entenda.tsx:243` | O texto do aviso existe e bate (até umas 30, sem compra), mas a sugestão do treino mostra só "Hoje: mesma carga"; o aviso só aparece em Meus dados → Entenda o treino. |
| local.treino-do-dia | bate | `src/domain/locais/index.ts:70-207`; `src/features/treino/acoes.ts:23-37`; `src/features/treino/Treino.tsx:360-363` | Troca pela mesma função com o desempate do gerador, motivo "aqui não tem…", séries/RIR/descanso da vaga e repetições do que entrou. Duas notas abaixo. |
| equipamento.escada-carga-leve | o código diverge | `src/domain/progressao/index.ts:274-278, 320-325`; `src/features/treino/Treino.tsx:614` | A ordem de 5 passos não é executada: é uma frase resumida (sem "3–4 s", "≤ 8 s", "1,5 repetição"), que só aparece em Entenda; o 5º passo nunca acontece para halter. |
| equipamento.bfr | não está no app | (não achei código: nenhuma ocorrência fora de `regras.json`, `selos.json` e da frase) | Não há exercício nem método de restrição de fluxo. A frase ("O app nunca pede esse método") deixa claro e é verdadeira. |
| equipamento.capacidades | bate | `src/domain/taxonomia/equipamentos.ts:8-60, 153-209`; `src/domain/taxonomia/atalhos.ts:131` | 49 itens (contado, rodado); multifuncional pelas estações marcadas, polia simples pela altura; a esteira não dá capacidade e fica fora da lista (`SO_NA_FOTO`). |
| equipamento.caneleira | bate | `src/domain/gerador/funcoes.json:15` (extensora), `:20-21` (abdução, adução); `src/domain/gerador/index.ts:1776-1784` | Extensão sentado, abdução e adução deitado de lado existem; na extensora a caneleira está no nível abaixo da cadeira extensora. Nota abaixo (abre mais 3 exercícios). |
| equipamento.mini-band | bate | `src/domain/taxonomia/equipamentos.ts:207`; `src/domain/progressao/escadas.ts:40, 60-65` | Capacidade própria (`mini_band`, separada de `elastico`); a escada usa `inventario.mini_band.intensidades`. Nota abaixo (abre mais 3 exercícios). |
| equipamento.roda-abdominal | a frase diverge | `src/domain/gerador/index.ts:164-176, 229`; `src/domain/gerador/funcoes.json:23`; `tests/unit/catalogo.test.ts:94-102` | Fora do iniciante (complexidade 3) e alternativa no abdômen: bate. Mas só sai com dor lombar acima de 5 (ou sem nota); com 3 a 5 continua no programa. |
| equipamento.atalhos | bate | `src/domain/taxonomia/atalhos.ts:42-112`; `src/features/onboarding/inventarioForm.ts:354-370`; `src/features/programa/Programa.tsx:214-218` | Kits 2–10 kg + 3 elásticos, 2–12 kg + banco sem declinar, 2–40 kg + polia regulável + lado conservador; não desmarca; "Corpo livre" desmarca tudo; "kit típico" some com o 1º treino feito. |
| equipamento.menor-anilha | o código diverge | `src/features/treino/Treino.tsx:1049-1057` (barra); `:965-979` (anilha, ok); `src/domain/sessao/index.ts:175-180` | Nas máquinas de anilha o menos/mais anda no passo. Nas barras, a sugestão anda de 2 × a menor anilha, mas o menos/mais anda de 2,5 em 2,5 kg, fixo. |
| equipamento.sem-puxada-vertical | o código diverge | `src/domain/gerador/funcoes.json:5`; `src/domain/gerador/index.ts:193-199, 233`; aviso em `:830-838` | Invertida e remada com halter estão no mesmo nível, e o desempate "mais carga possível" põe o halter na frente da invertida. O pullover não existe na biblioteca. O aviso bate. |
| equipamento.sem-ancoragem | o código diverge | `src/domain/gerador/index.ts:2148-2153`; `tests/unit/equipamento-minimo.test.ts:99, 163-170` | O aviso lista os músculos de fato sem exercício: "costas, ombro lateral e bíceps". O ombro de trás tem exercício (abertura em T) desde 07/11; regra e frase dizem "ombro de trás". |
| equipamento.flexao-por-supino | o código diverge | `src/domain/progressao/escadas.json` (chave `flexao`); `src/conteudo/exercicios/flexao.json:9`; `src/domain/progressao/index.ts:261-270` | A escada bate com a regra. A flexão inclinada ("como diz o cartão") não existe: nem no cartão, nem na escada, nem na sugestão. |
| visao.desambiguacao | bate | `src/domain/visao/index.ts:138-156, 170-171`; `scripts/eval-vision.ts:3, 49-52` | 16 dicas (contadas), todas no pedido; no eval, item de "nao_tem" com confiança alta é falso positivo grave e reprova. |
| privacidade.foto | bate | `src/features/app/privacidade.tsx:14-45`; `src/features/onboarding/FotoEquipamento.tsx:39-65, 166-213`; `src/features/dados/Dados.tsx:135, 311-330`; `src/features/onboarding/BoasVindas.tsx:88` | As 3 telas usam o mesmo texto (Anthropic, EUA, 30 dias, servidor não guarda); caixa desmarcada trava "Escolher fotos"; data só no `localStorage`; "Retirar" apaga a chave. |
| dados.copia | o código diverge | `src/domain/dados/index.ts:9-12, 46-54` (ok); `src/features/programa/Programa.tsx:449-469`; `src/styles.css:194` | 3 treinos, 7 dias e "Agora não" por 7 dias batem. Mas o lembrete fica acima de "Começar o treino" (o botão é preso embaixo, depois dele), e não abaixo. |
| dados.instalar-iphone | bate | `src/domain/dados/index.ts:64-72`; `src/features/app/avisos.tsx:10-14, 36-66` | iPhone/iPad (inclusive o iPad que se apresenta como Mac) fora da tela de início: aviso com os passos até "Entendi" (guardado no `localStorage`); instalado, nada. |
| dados.persistente | bate | `src/storage/idb.ts:122-140`; `src/features/app/estado.tsx:87`; `src/features/dados/Dados.tsx:139-149, 244` | Pede no 1º salvar; Meus dados avisa quando negou e diz quando aceitou (na folha "Guardar uma cópia"). Nota: o texto entre aspas da frase não é o da tela. |

## Divergências

### 1. equipamento.fim-da-escada — o código diverge (o aviso não está na sugestão do treino)

- **Regra:** "no último degrau, com a série no topo, o app avisa de forma sutil, **na própria sugestão**, que dali em diante é buscar repetições até ~30…"
- **Frase:** "No último degrau, com a série no topo da faixa, **a sugestão avisa** com discrição…"
- **Código:** o domínio escreve o texto certo (`src/domain/progressao/index.ts:314-319`: "Você chegou ao último degrau deste exercício. Daqui em diante, busque mais repetições, até umas 30; acima disso, o peso do corpo rende menos."). Mas a sugestão na tela do treino não mostra o motivo: `src/features/treino/Treino.tsx:612-616` mostra só `s.proxima ? 'Hoje: …' : 'Hoje: mesma carga'`. O fim do treino mostra só "Manter" (`src/features/treino/Resumo.tsx:161-162`). O `s.motivo` só é renderizado em `src/features/entenda/Entenda.tsx:243` (Meus dados → Entenda o treino → "Os exercícios: por que cada um e a próxima carga"). O comentário em `Treino.tsx:601-602` diz que o motivo "fica no por quê?", mas não há "por quê?" ali.
- **Exemplo:** Corpo livre, flexão no último degrau ("mãos em dois apoios…"), 2 sessões seguidas com todas as séries no topo. No treino aparece "Hoje: mesma carga"; nada diz que a escada acabou nem fala das 30 repetições.
- **Detalhes menores:** o aviso exige o topo em 2 sessões seguidas com o mesmo degrau (`:300`), o que a regra não diz; na barra fixa só na descida, o texto é outro (`progressao.negativa-para-barra`, `:308-313`).
- **Conserto em uma linha:** decidir se o aviso volta à linha da sugestão do treino ou se a regra e a frase passam a dizer "em Entenda o treino".

### 2. equipamento.escada-carga-leve — o código diverge (a ordem fixa não é executada nem mostrada inteira)

- **Regra:** "1) repetições até ~30; 2) unilateral ou variação mais difícil; 3) excêntrica de 3–4 s (≤ 8 s por repetição); 4) pausa no alongamento ou 1,5 repetição; 5) `equipamento.fim-da-escada`".
- **Frase:** "A ordem é fixa: 1) … 2) … 3) descida de 3 a 4 segundos, com até 8 segundos por repetição; 4) pausa no alongamento ou 1,5 repetição; 5) aviso discreto de que a escada acabou."
- **Código:** para carga em kg, não há degraus guardados; há só duas frases:
  - `src/domain/progressao/index.ts:320-325`: "Não há carga maior disponível: siga a escada (mais repetições até ~30, unilateral, descida lenta, pausa)." Sem "3–4 s", sem "≤ 8 s", sem "1,5 repetição".
  - `:274-278`: "…siga a escada: mais repetições (até ~30), descida lenta ou pausa no alongamento." Aqui falta também o passo 2 (unilateral).
  - O 5º passo (`equipamento.fim-da-escada`) só é devolvido quando `carga.tipo === 'degrau'` (`:314`): nunca para halter.
  - Como no item 1, essas frases só aparecem em Entenda; no treino é "Hoje: mesma carga" (`Treino.tsx:614`).
- **Exemplo:** kit de casa (halteres de 2 a 10 kg), agachamento com 10 kg, topo da faixa em 2 sessões. A sugestão é "manter" para sempre, com a mesma frase; a pessoa nunca recebe a ordem dos passos nem o aviso de fim de escada.
- **Observação:** o aviso do programa com este id (`src/domain/gerador/index.ts:839-844`, "Pouca carga para as pernas…") usa uma condição que não está na regra: sem leg press nem rack e halter mais pesado abaixo de 20 kg.
- **Conserto em uma linha:** ou a frase passa a dizer que é uma orientação (não um passo a passo do app), ou o texto da sugestão ganha os 4 passos completos.

### 3. equipamento.roda-abdominal — a frase diverge (omite o limite da dor)

- **Regra:** "sai com dor lombar (a lombar está nas articulações do exercício)". O mecanismo é o geral da dor (`seguranca.dor.programa`).
- **Frase:** "…e sai do programa **se você tem dor lombar**."
- **Código:** só a dor acima de 5 (ou sem nota) exclui (`src/domain/gerador/index.ts:164` e `:175-176`); de 3 a 5 só desfavorece no desempate (`:229`). O teste confirma: "com dor lombar acima de 5, sai" (`tests/unit/catalogo.test.ts:94, 102`).
- **Exemplo (rodado):** intermediário, 3 dias, inventário só com a roda abdominal, dor lombar 5: a roda abdominal está no Corpo todo C. Com dor 6, sai (junto com os outros exercícios que carregam a lombar).
- **Conserto em uma linha:** "…e sai do programa com dor lombar acima de 5".

### 4. equipamento.menor-anilha — o código diverge (nas barras, o menos e o mais não andam no passo)

- **Regra:** "no treino, a carga destas máquinas e barras é anotada livremente (o número aceita qualquer valor digitado, e **o menos e o mais andam no passo**)". A lista inclui barra longa e barra hexagonal.
- **Frase:** "A menor anilha é o passo das sugestões de carga no leg press, hack, smith, panturrilha sentada, barra longa e barra hexagonal."
- **Código:** nas máquinas de anilha, certo (`src/features/treino/Treino.tsx:970-971`: `passo = menorAnilhaKg ?? 2`, por lado). Nas barras, a sugestão usa `passoKg: 2 * menor` a partir do peso da barra (`src/domain/sessao/index.ts:175-180`), mas o `ControleCarga` nem recebe esse passo: `Treino.tsx:1057` faz `(k ?? 0) + dir * 2.5`, fixo (comentário em `:1049`: "barra e máquina, de 2,5 em 2,5").
- **Exemplo:** barra longa, menor anilha 2 kg (padrão). A sugestão vai de 20 para 24 kg; tocar em "+" a partir de 20 dá 22,5 kg, carga que não se monta com anilhas de 2 kg. Mudar a menor anilha em "Meus locais" para 5 kg não muda o "+".
- **Observação:** em kg mostrados, o passo real é um par de anilhas (2 × a menor: 4 kg com o padrão), tanto na barra quanto no total das máquinas ("40 kg de anilhas" → "44 kg"); a frase diz "a menor anilha é o passo… o app usa 2 kg". A barra W anda no padrão de 2 kg e não tem como mudar (o esquema dela não guarda `menorAnilhaKg`).
- **Conserto em uma linha:** passar `passoKg` e `baseKg` ao `ControleCarga` e usá-los no menos/mais.

### 5. equipamento.sem-puxada-vertical — o código diverge (a preferência entre as remadas; o pullover)

- **Regra:** "manter o volume de costas com remadas (**invertida > unilateral com halter > puxada com elástico ancorado alto**); pullover só como acessório".
- **Frase:** "…nesta preferência: invertida, unilateral com halter, puxada com elástico preso no alto. O pullover é só acessório."
- **Código:** `src/domain/gerador/funcoes.json:5` põe `remada-invertida` e `remada-unilateral-halter` (e a curvada com halteres) no **mesmo** nível; dentro do nível, o desempate põe antes quem "deixa pôr mais carga" (`src/domain/gerador/index.ts:193-199` e `:233`): halter vale 1 ou 2, peso do corpo vale 0. A puxada com elástico fica no nível abaixo (bate). Não há pullover na biblioteca (`src/domain/biblioteca/exercicios.json`: nenhuma ocorrência).
- **Exemplo (rodado):** intermediário, 3 dias, halteres 2–10 kg + banco reto + smith (que dá a barra baixa da invertida). A vaga de puxar vertical recebe "remada curvada com halteres" nos dias A e C; a remada invertida não entra em dia nenhum. Só com smith + elásticos, aí sim entra a invertida.
- **Aviso:** bate com a parte R5-CL da regra (`:830-838`): com a puxada de elástico no programa, diz "a puxada é só com o elástico"; sem ela, "só com remadas" (rodado nos dois casos).
- **Conserto em uma linha:** ou a invertida sobe um nível na função, ou a regra e a frase passam a dizer que, entre as remadas, vale o desempate do gerador; e tirar o pullover da frase.

### 6. equipamento.sem-ancoragem — o código diverge (a lista de músculos do aviso)

- **Regra:** "um aviso da vaga diz que **costas, bíceps e ombro de trás** ficam sem exercício e que o resto do corpo segue no programa".
- **Frase:** "Um aviso diz que costas, bíceps e ombro de trás ficam sem exercício…"
- **Código:** `src/domain/gerador/index.ts:2148-2153` monta a lista com os músculos que de fato ficaram sem exercício: `Sem algo para puxar ou levantar: ${listaDeNomes(semExercicio)} ficam sem exercício…`. O teste fixa a lista do corpo livre em `['biceps', 'costas', 'ombro_lateral']` e diz por quê: "Desde o R5-CL (07/11/2026), o ombro de trás tem a abertura em T sem carga: sai da lista" (`tests/unit/equipamento-minimo.test.ts:163-170`).
- **Exemplo (rodado):** iniciante, 3 dias, inventário vazio: "Sem algo para puxar ou levantar: costas, ombro lateral e bíceps ficam sem exercício. Não precisa fazer nada: o resto do corpo segue no programa." O ombro de trás tem séries.
- **O resto bate:** não inventa exercício de costas, não sugere compra (teste em `:93-99`).
- **Conserto em uma linha:** regra e frase: "diz quais músculos ficam sem exercício (em geral costas, bíceps e ombro lateral)".

### 7. equipamento.flexao-por-supino — o código diverge (a flexão inclinada não existe no app)

- **Regra:** "quem não chega ao mínimo da faixa no chão faz a inclinada, **como diz o cartão**"; valores: "mais fácil: inclinada (mãos numa cadeira ou bancada)".
- **Frase:** "Quem não chega ao mínimo da faixa no chão faz a inclinada, com as mãos numa cadeira ou bancada."
- **Código:** a escada bate (`escadas.json`, chave `flexao`: descida de 3 s → pés elevados → pés elevados com descida de 3 s → mãos em dois apoios ou pausa de 2 s). Mas o cartão `src/conteudo/exercicios/flexao.json` não fala da inclinada em nenhum campo; não há exercício "flexão inclinada" na biblioteca; e, abaixo do mínimo em 2 sessões no 1º degrau, a sugestão é "…não há carga menor aqui: faça menos repetições ou use a alternativa" (`src/domain/progressao/index.ts:261-270`).
- **Exemplo:** iniciante em corpo livre que faz 5 flexões (faixa 8–15) em duas sessões: nenhuma tela manda apoiar as mãos numa cadeira ou bancada.
- **Segundo ponto, no mesmo cartão:** `flexao.json:9` diz "Quando passar de 20 repetições, pés no step", o que contradiz a escada (topo da faixa em 15, e o degrau seguinte é a descida de 3 s, não os pés elevados).
- **Conserto em uma linha:** pôr a inclinada no cartão (e trocar a linha dos 20) ou tirar a promessa da regra e da frase.

### 8. dados.copia — o código diverge (a posição do lembrete)

- **Regra:** "o lembrete fica **abaixo de 'Começar o treino'** e nunca o cobre".
- **Frase:** "O lembrete fica abaixo de 'Começar o treino' e nunca cobre esse botão."
- **Código:** `src/features/programa/Programa.tsx:449` renderiza `<LembreteCopia>` no fluxo da página, depois da lista de exercícios e **antes** de `<div className="acao-fixa">` (`:453-469`), que é `position:sticky;bottom:0` (`src/styles.css:194`). Na tela, o lembrete fica acima do botão, que está preso embaixo. "Nunca cobre" continua verdade.
- **Exemplo:** 3 treinos feitos, nenhuma cópia: o lembrete aparece ao fim da lista de exercícios, e "Começar o treino" fica abaixo dele, colado na barra.
- **O resto bate:** `TREINOS_PARA_LEMBRAR = 3`, `DIAS_PARA_LEMBRAR = 7`, "Agora não" grava a data e esconde por 7 dias (`src/domain/dados/index.ts:46-54`); Meus dados mostra "Última cópia: há N dias / hoje / nenhuma cópia ainda" (`Dados.tsx:205, 241`).
- **Conserto em uma linha:** regra, frase e o comentário de `avisos.tsx:69`: "fica depois dos exercícios, acima do botão, e nunca o cobre".

### 9. equipamento.bfr — não está no app

- **Regra:** "nunca prescrever". **Frase:** "O app nunca pede esse método. Ele funciona, mas exige triagem, pressão ajustada para cada pessoa e supervisão."
- **Código:** não achei código (busca por bfr, restrição de fluxo, oclusão, kaatsu, manguito em `src/` e `api/`: só `regras.json`, `selos.json` e a frase). A regra é cumprida por ausência; nenhum teste a protege.
- **A frase deixa claro** que o app não faz; não promete nada.

## Notas sobre as que batem (não são divergência, mas valem a leitura)

- **local.treino-do-dia:** (a) antes de cair em `selecao.dia-sem-principal`, o código tenta a função substituta (`seNada`: flexão de joelho ↔ dobrar o quadril) e carimba a troca como `local.treino-do-dia` com o texto "Mesma função, a mesma prescrição da vaga" (`src/domain/locais/index.ts:113-126`), embora a função seja outra. (b) Quando a vaga tinha drop set e o exercício que entrou não permite, as séries viram `x.series + 1` (`:91`), uma exceção a "a prescrição da vaga fica" que a regra não cita.
- **equipamento.caneleira:** regra e frase citam 3 exercícios; a biblioteca abre mais 3 com a caneleira (elevação lateral, crucifixo invertido sentado, coice em quatro apoios; `funcoes.json`, linhas das funções elevação lateral, ombro posterior e extensão de quadril).
- **equipamento.mini-band:** regra e frase citam só a abdução sentado; a biblioteca tem também caminhada lateral, abdução deitado de lado e extensão de joelho sentado com mini-band (esta na vaga da extensora, `funcoes.json:15`).
- **dados.persistente:** a frase cita entre aspas "pode apagar se faltar espaço: instale o app e exporte uma cópia"; o texto da tela é "Este navegador pode apagar seus dados. Guarde uma cópia." e, no "por quê", "…pode apagá-los se faltar espaço. Instalar o app na tela inicial ajuda; exportar uma cópia protege." (`Dados.tsx:139-149`). Mesmo sentido, outra redação. O "aceitou" só aparece dentro da folha "Guardar uma cópia" (`:244`).
- **dados.instalar-iphone:** o texto do aviso na tela diz "um site que fica 7 dias sem ser aberto" (`avisos.tsx:48`), mais simples que a regra ("7 dias de uso do Safari sem visita"); a frase da regra está certa.
- **privacidade.foto:** com `VITE_FOTO` desligada no build, as telas dizem "Nada sai do aparelho" (`privacidade.tsx:15`) e a tela da foto some; a frase descreve o caso com a foto ligada. A data do aceite é gravada no 1º envio, e não ao marcar a caixa (`FotoEquipamento.tsx:61-65`).
- **equipamento.atalhos:** conferi os valores dos kits e o preenchimento "só onde está sem resposta" no código; não abri a tela.
