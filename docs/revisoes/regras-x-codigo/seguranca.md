# Segurança, acompanhamento e avaliador: relatório do conferente

> Relatório de um conferente independente (22/11/2026), que recebeu a regra, a frase e o código, sem hipótese da sessão. É matéria-prima: cada divergência só vale depois de conferida pela sessão no código (coluna "situação" de `../regras-x-codigo.md`). As linhas citadas são as do dia da conferência.

# D1: conferência regra × frase × código (grupo segurança, acompanhamento, avaliador)

Só leitura. Nada do repositório foi alterado; `privado/` não foi lida. Os testes não foram rodados: a conferência é de leitura do código.

Resultado: 8 batem, 7 com o código divergindo, 1 com a frase divergindo, 1 que não está no app.

| id | classificação | onde no código (arquivo:linha) | evidência |
|---|---|---|---|
| acompanhamento.semana | o código diverge (borda) | `src/domain/acompanhamento/semana.ts:71-76` | Semana de segunda a domingo, séries efetivas fracionadas, meta prescrita e janela de 8 semanas batem. O estado "mantendo" sai para qualquer valor acima de 0 (0,5 série indireta), e a regra e a frase dizem "1 ou mais". |
| acompanhamento.mensagens | bate | `src/domain/acompanhamento/semana.ts:144-151, 195-223`; `src/features/acompanhamento/Semana.tsx:133-148` | As 4 mensagens e a oferta de menos dias (3 das 4 últimas semanas com treino abaixo do planejado; só muda no toque) são as da regra. |
| acompanhamento.evolucao | o código diverge | `src/domain/acompanhamento/evolucao.ts:52-62` | Carga maior que a da sessão anterior vira só "subiu a carga", sem olhar a faixa de repetições e sem "recorde". A regra e a frase definem recorde também como "mais carga com repetições dentro da faixa". |
| avaliador.gravidade | a frase diverge | `src/domain/avaliador/index.ts:155-203, 506`; `src/features/entenda/Entenda.tsx:151` | As gravidades e o veredito batem. A frase diz que o avaliador mede "um digitado com exercícios da biblioteca", e o app não tem tela para digitar um programa: só avalia o programa salvo. |
| avaliador.empurrar-puxar | bate | `src/domain/avaliador/index.ts:454-463`; `src/domain/gerador/index.ts:1606-1622`; `src/domain/gerador/familias.ts:99` | Limite de 1,5, só quando há como puxar; o gerador sobe séries de puxar enquanto passar e houver lugar. Ver observação 1. |
| seguranca.triagem | bate | `src/domain/triagem/index.ts:78-116`; `src/domain/gerador/index.ts:467-468`; `src/features/programa/Programa.tsx:70-92` | Qualquer "sim" (fora o caso só osteoarticular) bloqueia o gerador e pausa o programa até a liberação confirmada; a mensagem recomenda médico ou profissional de Educação Física. |
| seguranca.triagem.osteoarticular | bate | `src/domain/triagem/index.ts:80, 87-95`; `src/features/onboarding/Triagem.tsx:179-217` | "Sim" só no osteoarticular com região marcada não bloqueia; a tela pede a nota de 0 a 10 por região, que entra em `efeitoDaDor`. |
| seguranca.triagem.nenhuma | bate | `src/features/onboarding/Triagem.tsx:48-52, 129-165, 226-243` | Pergunta geral com as 9 curtas, as completas a um toque, "Não, nenhuma" grava "não" nas 9, e a outra saída pede a confirmação das não marcadas. Ver observação 2. |
| seguranca.triagem.texto | bate | `src/domain/triagem/index.ts:14-28`; `src/features/onboarding/Triagem.tsx:152` | Perguntas próprias, com o aviso "não é o questionário oficial". Ver observação 3. |
| seguranca.alerta.cardiovascular | bate | `src/domain/triagem/index.ts:156-161`; `src/features/treino/Treino.tsx:490-494`; `src/features/treino/Resumo.tsx:75-99`; `src/features/treino/acoes.ts:68, 149-170`; `src/domain/sessao/index.ts:41-45` | Os 4 sinais encerram o treino, a tela orienta o SAMU 192, o próximo treino fica bloqueado até a confirmação, e "Toquei sem querer" vale 15 minutos. Ver observações 4 e 5. |
| seguranca.alerta.musculoesqueletico | o código diverge (parcial) | `src/features/treino/Treino.tsx:1168-1177`; `src/domain/triagem/index.ts:150-166` | "Senti algo" tem 3 sinais que encerram o exercício e 1 de cauda equina. "Estalo com dor" e "dor irradiada" não têm opção, e "perda de força progressiva nas pernas" cai em "Perda de força estranha", que só encerra o exercício. |
| seguranca.dor.escala | o código diverge | `src/features/treino/Treino.tsx:466-489, 1185-1193`; `src/features/treino/acoes.ts:112-122`; `src/domain/triagem/index.ts:125-142`; `src/domain/acompanhamento/semana-leve.ts:33-44, 86-94` | Limites (0–2, 3–5, > 5), redução, nota guardada e aviso de 2 treinos seguidos batem. Não existe a pergunta de dor por série: a nota só entra por "Senti algo". "Piora no treino seguinte" não é detectada. |
| seguranca.dor.programa | bate | `src/domain/triagem/index.ts:66-70`; `src/domain/gerador/index.ts:163-176, 230, 518-535, 815-819, 1659-1667`; `src/domain/biblioteca/exercicios.json` | > 5 ou sem nota exclui, 3–5 desfavorece no desempate, 0–5 traz o lembrete, sem exercício nenhum o programa não é montado. Os ajoelhados e em quatro apoios têm `joelho`; os dois agachamentos com barra nas costas têm `ombro`. |
| seguranca.sem-diagnostico | o código diverge (leve) | `src/features/entenda/Entenda.tsx:374-382`; `src/features/onboarding/BoasVindas.tsx:67-72`; `src/features/termos/Termos.tsx:47-48` | "Não diagnostica" e a regra prática da dor muscular estão na tela. Nenhum texto do app cita CREF: a recomendação é de "profissional de Educação Física". |
| seguranca.estalo-sem-dor | não está no app | não achei o código (só `src/domain/regras/selos.json:155`) | Nenhuma tela pergunta por estalo e nenhuma regra do gerador o usa. A frase não promete tela, mas também não diz que é só referência. |
| seguranca.montagem | o código diverge (parcial) | `src/features/treino/Treino.tsx:348-352`; `src/features/programa/Programa.tsx:644-648`; `src/domain/gerador/index.ts:1814-1815`; `src/conteudo/exercicios/rosca-scott.json` | Smith, hack, panturrilha sentada, hip thrust, suspensão e os itens de casa têm a montagem no guia. Os exercícios com barra livre não têm a tag `montagem` (sem atalho no treino, sem nota na folha do programa, sem o porquê), e a rosca scott com barra W não cita as travas em lugar nenhum. |
| treino.leitura | o código diverge | `src/features/programa/ComoLer.tsx:5-6`; `src/features/entenda/Entenda.tsx:38-45, 134-136` | As 5 linhas e a 6ª do iniciante batem. As definições saíram do programa em 16/11 e ficam em "Entenda o treino", num bloco sempre fechado; a regra e a frase ainda dizem "aberto no programa até o 1º treino terminado". |

## Divergências

### acompanhamento.semana: "mantendo" abaixo de 1 série

- Regra: "4 estados em cores neutras: na meta (≥ meta), crescendo (≥ 4), mantendo (≥ 1), ainda não treinou nesta semana (0)".
- Frase: "Estados: na meta, crescendo (4 ou mais), mantendo (1 ou mais) ou ainda não treinou."
- Código, `src/domain/acompanhamento/semana.ts:71-76`:
  ```ts
  if (feitas <= 0) return 'sem-treino';
  if (feitas >= meta) return 'na-meta';
  if (feitas >= VOLUME.minimoEficazPiso) return 'crescendo';
  return 'mantendo';
  ```
  Não há o corte em 1: tudo entre 0 e 4 é "mantendo".
- Exemplo: na semana, a pessoa fez 1 série efetiva de supino e nada de tríceps direto. O tríceps soma 0,5 (indireta) e aparece como "0,5 de 10 · mantendo" (`Semana.tsx:124-126`), e a regra só dá "mantendo" a partir de 1.
- Conserto em uma linha: ou o código ganha o corte em 1, ou a regra e a frase passam a dizer "mantendo (acima de 0)".

### acompanhamento.evolucao: "recorde" por mais carga não existe

- Regra: 'marcas "subiu a carga" e "recorde" (mais repetições com a mesma carga, ou mais carga com repetições dentro da faixa)'.
- Frase: "com as marcas 'subiu a carga' e 'recorde' (mais repetições com a mesma carga, ou mais carga com as repetições dentro da faixa)".
- Código, `src/domain/acompanhamento/evolucao.ts:52-62`:
  ```ts
  if (v > valorDaCarga(ult.carga) + 1e-9) marcas.push('subiu-a-carga');
  else {
    const antes = anteriores.filter((p) => valorDaCarga(p.carga) >= v - 1e-9);
    if (antes.length && m.reps > Math.max(...antes.map((p) => p.reps))) marcas.push('recorde');
  }
  ```
  A função não recebe a faixa de repetições. Com carga maior que a da sessão anterior, a marca é sempre "subiu a carga" e nunca "recorde".
- Exemplo 1: supino 20 kg × 12 e depois 22 kg × 9 (faixa 8–12, a maior carga da história). Pela regra é recorde; o app mostra só "subiu a carga" (o teste E1, `tests/unit/evolucao.test.ts:18-24`, fixa esse comportamento).
- Exemplo 2: 20 kg × 12 e depois 24 kg × 3 (fora da faixa). O app marca "subiu a carga" do mesmo jeito; a condição "dentro da faixa" não é conferida em marca nenhuma.
- Conserto em uma linha: ou a regra e a frase passam a dizer que recorde é só "mais repetições com a mesma carga ou com uma maior", ou a função recebe a faixa e marca o recorde de carga.

### avaliador.gravidade: a frase promete avaliar um programa digitado

- Regra: "mede qualquer programa (o gerado, ou um digitado com exercícios da biblioteca)".
- Frase: "O avaliador mede qualquer programa, o gerado pelo app ou um digitado com exercícios da biblioteca".
- Código: a função aceita os dois (`src/domain/avaliador/index.ts:155`), mas o único uso em tela é `src/features/entenda/Entenda.tsx:151`, com o programa salvo. Não há rota nem tela para digitar um programa (`src/App.tsx:56-94`).
- Exemplo: quem lê a frase em "Entenda o treino" e procura onde digitar o treino que já faz não encontra.
- Conserto em uma linha: a frase diz "mede o seu programa" até existir a tela de programa digitado.

### seguranca.alerta.musculoesqueletico: sinais da regra sem opção na tela

- Regra: "Dor articular aguda ou pontual, estalo com dor, formigamento, dormência ou dor irradiada, perda de força incomum; sinais de cauda equina (dormência na região que encosta num selim, retenção ou perda de controle da urina ou das fezes, perda de força progressiva nas pernas, ciática aguda nas duas pernas) pedem atendimento urgente".
- Frase: "Os sinais: dor aguda ou em pontada numa articulação, estalo com dor, formigamento, dormência ou dor que se espalha (irradiada), perda de força incomum. O app encerra o exercício, oferece uma alternativa…".
- Código, `src/features/treino/Treino.tsx:1168-1177`: as opções são "Dor aguda ou em pontada numa articulação", "Formigamento ou dormência", "Perda de força estranha" e, para a cauda equina, "Dormência entre as pernas ou descontrole da urina ou das fezes". Não há "estalo com dor" nem "dor irradiada".
- Exemplo 1: estalo no ombro com dor 4. A pessoa só tem a nota de dor; com 4, `avaliarDor` devolve "ajustar" (`src/domain/triagem/index.ts:133-140`) e o exercício continua. Pela regra e pela frase, o exercício seria encerrado.
- Exemplo 2: fraqueza que aumenta nas duas pernas. A opção que serve é "Perda de força estranha", que só encerra o exercício e diz "Se o sintoma continuar, procure avaliação profissional" (`triagem/index.ts:162-166`). A regra põe esse sinal entre os de atendimento urgente. A frase é honesta sobre qual sinal o "Senti algo" tem, então aqui a divergência é só do código com a regra.
- O que bate: encerra o exercício, abre a troca pela alternativa (`Treino.tsx:496-499`), recomenda avaliação se continuar; o sinal de cauda equina encerra o treino e manda ao pronto-socorro (`Resumo.tsx:68-74`).
- Conserto em uma linha: acrescentar "Estalo com dor" e "Dor que se espalha" às opções que encerram o exercício (texto de segurança: revisão do Gustavo).

### seguranca.dor.escala: não há pergunta de dor por série, e a piora não é detectada

- Regra: "Dor por série numa escala de 0 a 10 (pergunta opcional)" e "piora na sessão seguinte ou dura > 1–2 semanas: recomendar avaliação".
- Frase: "A pergunta da dor em cada série é opcional, de 0 a 10." e "Se a dor piora no treino seguinte ou dura mais de 1 a 2 semanas, o app recomenda avaliação."
- Código, ponto 1: o formulário da série não tem campo de dor. `SerieRegistrada.dor` só é escrita por `anotarDor` e `comDor` (`src/features/treino/acoes.ts:112-122`), chamadas pelo "Senti algo" (`Treino.tsx:466-489`). Em `Treino.tsx` a palavra "dor" só aparece na leitura da série feita (linha 176) e nessa folha.
- Código, ponto 2: a recomendação de avaliação só sai com nota de 3 ou mais nas 2 últimas vezes (`src/domain/acompanhamento/semana-leve.ts:33-44, 86-94`) ou com nota acima de 5 (`triagem/index.ts:127-132`). Nada compara a nota de hoje com a do treino anterior, e nada mede semanas de dor.
- Exemplo 1: quem faz 3 séries com dor 3 e não toca em "Senti algo" termina o treino sem nota nenhuma; nenhuma tela perguntou.
- Exemplo 2: dor 2 no supino num treino e dor 5 no seguinte (piorou). O app mostra só "Reduza a carga em 10–20%, encurte a amplitude ou desacelere…", sem falar em avaliação; a regra e a frase dizem que ele recomenda.
- O que bate: 0–2 segue, 3–5 ajusta, > 5 encerra e abre a alternativa; sem carga menor o texto não manda reduzir; a nota fica na última série ou no exercício e vale como a de uma série (`src/domain/sessao/index.ts:339-345`); a 1ª sugestão do treino seguinte reduz ou indica a alternativa (`src/domain/progressao/index.ts:212-229`); 2 treinos seguidos com 3 ou mais trazem o aviso.
- Conserto em uma linha: a frase e a regra passam a dizer "a nota de dor é dada em 'Senti algo'" e "nota de 3 ou mais em 2 treinos seguidos"; ou o app ganha a pergunta e a comparação.

### seguranca.sem-diagnostico: o app não cita o CREF

- Regra: "recomenda profissional com CREF".
- Frase: "o app recomenda um profissional de Educação Física com registro no CREF".
- Código: "CREF" só existe em `regras.json` e em `frases-das-regras.json`. As telas dizem "médico ou profissional de Educação Física" (`src/domain/triagem/index.ts:113`, `src/features/onboarding/Triagem.tsx:117`, `src/features/entenda/Entenda.tsx:375`).
- Exemplo: na tela de bloqueio da triagem, a pessoa confirma "fui avaliado e liberado por um médico ou profissional de Educação Física", sem a exigência do registro.
- O que bate: "O app não diagnostica" em 4 telas, a regra prática da dor muscular (`Entenda.tsx:378-382`), e nenhum nome de lesão nos textos de tela que procurei.
- Conserto em uma linha: ou os textos ganham "com registro no CREF", ou a regra e a frase tiram o CREF.

### seguranca.estalo-sem-dor: não está no app

- Regra: "Estalo no ombro sem dor: não gera restrição; com dor, instabilidade ou perda de força aplica `seguranca.alerta.musculoesqueletico`".
- Frase: "Estalo no ombro sem dor não gera nenhuma restrição. Se vier com dor, instabilidade ou perda de força, vale a regra dos sinais de alerta em músculos e articulações."
- Código: não achei. A palavra "estalo" não aparece em `src/features`, `src/domain` (fora os dados da regra) nem em `api/`.
- A frase se lê como informação geral e não promete tela. Ela não diz que é só referência, e a 2ª metade remete a uma regra cujo "estalo com dor" também não tem opção em "Senti algo" (ver acima).

### seguranca.montagem: barra livre sem a marca de montagem

- Regra: "Montagem segura no cartão e no guia dos exercícios com travas, apoios ou ancoragem … barras: travas nas anilhas".
- Frase: "O cartão e o guia dos exercícios com travas, apoios ou ancoragem mostram a montagem segura … Barras: travas nas anilhas."
- Código: o atalho "Montagem segura: veja antes da série" (`Treino.tsx:348-352`), a nota na folha do exercício no programa (`Programa.tsx:644-648`) e o porquê (`gerador/index.ts:1814-1815`) dependem da tag `montagem`. Sem a tag: `supino-barra`, `remada-barra`, `desenvolvimento-barra`, `rosca-barra-w`, `terra-romeno-barra`, `rosca-scott` (todos `carga: barra` em `src/domain/biblioteca/exercicios.json`).
- Os 5 primeiros têm a nota "Montagem segura: travas nas anilhas" no guia (`src/conteudo/exercicios/<id>.json`, campo `note`), então a regra vale no guia e falha só nos outros 3 lugares. A `rosca-scott` não tem nota e o texto dela não cita travas.
- Exemplo: rosca scott com barra W e anilhas. Nem o guia, nem o treino, nem a folha do programa falam das travas.
- Texto da própria página, `src/features/entenda/Entenda.tsx:392`: "Exercício com barra, rack, fita ou barra fixa traz a montagem segura antes da série." `barra-fixa`, `barra-fixa-supinada` e `elevacao-joelhos` não têm nota de montagem (só a `barra-fixa-negativa` tem).
- O que bate: smith e hack, panturrilha sentada, hip thrust, suspensão, e os itens de casa (cadeira sem rodinhas no búlgaro, calcanhares do nórdico, chão liso na flexão deslizante) estão no guia.
- Conserto em uma linha: pôr a tag `montagem` nos 6 exercícios com barra e a nota das travas na rosca scott.

### treino.leitura: a regra e a frase descrevem a tela de antes de 16/11

- Regra: "aberto no programa até o 1º treino terminado, depois recolhido".
- Frase: "Fica aberto até o 1º treino terminado, depois recolhido."
- Código: `src/features/programa/ComoLer.tsx:5-6` registra que as definições "saíram do início … e moram na página 'Entenda o treino'". Lá, o bloco é um `<details>` sem `open` (`Entenda.tsx:38-45, 134-136`): sempre fechado, antes e depois do 1º treino. Nenhum código olha se já houve treino.
- Exemplo: programa recém-gerado, nenhum treino feito. A tela do programa não mostra as definições, e em "Entenda o treino" o bloco "Como ler o treino" está fechado.
- Conserto em uma linha: atualizar a regra e a frase para "em 'Entenda o treino', num bloco que a pessoa abre" (a mudança de 16/11 foi decisão do Gustavo; o texto ficou para trás).

## Observações menores (não contadas como divergência)

1. **avaliador.empurrar-puxar.** A regra fala em "funções de empurrar (horizontal, inclinado, vertical, crucifixo)"; o código conta pelo padrão do movimento (`src/domain/biblioteca/index.ts:94-97`), de propósito, segundo o comentário. A única diferença na biblioteca de hoje é a `flexao-fechada` (função de tríceps, padrão de empurrar), que entra na conta. A frase diz só "séries de empurrar" e está certa.
2. **seguranca.triagem.nenhuma.** Quem refaz a triagem com um "sim" já salvo cai direto na tela de marcar (`Triagem.tsx:38`), e não na pergunta geral; o botão de voltar leva a ela.
3. **seguranca.triagem.texto.** O aviso "não é o questionário oficial" só aparece na folha "Ver as perguntas completas" (`Triagem.tsx:152`). Na tela "Quais valem para você?", que também mostra as 9 perguntas inteiras, ele não aparece.
4. **seguranca.alerta.cardiovascular.** A opção da tela é "Dor, pressão ou aperto no peito" (`Treino.tsx:1169`), sem o "ou irradiado" da regra e da frase. A mensagem do domínio (`triagem/index.ts:159`) não tem o "ou for intenso", mas não chega à tela: quem aparece é o texto de `Resumo.tsx:78`, que tem "ou for forte".
5. **"Toquei sem querer".** `podeVoltarDoAlerta` (`acoes.ts:157-162`) vale também para o encerramento por cauda equina; a regra do musculoesquelético não fala dos 15 minutos.
6. **acompanhamento.mensagens.** As frases da semana ("2 de 4 treinos. Se der, o … cabe até domingo") só aparecem em "Entenda o treino" (`Entenda.tsx:264`); a tela "A sua semana" mostra o número e não o texto. "X das últimas 8 semanas com treino" está só no rótulo de leitor de tela (`Semana.tsx:76`); à vista ficam o título "Últimas N semanas" e as bolinhas.
7. **acompanhamento.mensagens.** A oferta de menos dias tem condições que a regra não cita: só com 3 dias ou mais planejados, só depois de 4 semanas de histórico, e some por 28 dias depois de "Manter" (`semana.ts:203-204`).
