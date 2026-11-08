# Frente B: "Monte o seu treino" e o avaliador (06/11/2026)

**Em uma olhada.** Montei um protótipo do **avaliador**: uma função pura que recebe qualquer programa (o gerado, um editado ou um copiado de fora com exercícios da biblioteca) e o perfil, e devolve achados com `regraId` e selo. Quase tudo de que ele precisa **já existe no domínio** (volume por músculo, metas, tetos, estimador de tempo, triagem, dor por região, funções). Faltam três coisas: algumas funções que hoje só existem dentro do gerador, regras que o gerador garante "por construção" e nunca precisou conferir, e duas regras novas (empurrar × puxar, frente × trás da coxa). Numa amostra de 2.682 programas do gerador, o avaliador diz **"está bom" em 59,8%**. Em mais 23% o achado é um que o gerador já avisa (foco abaixo da meta, dia mais longo que os minutos). **Em 17,4% ele acha algo que o gerador não avisa**, e isso revelou 3 problemas reais do gerador. Nos 4 programas publicados que digitei (protocolos de ensaios, texto completo no PMC), ele aponta o que um treinador apontaria: 6 a 10 séries num exercício só, posteriores e panturrilha zerados, dias de 95 min num orçamento de 60. **Recomendo a opção (a), só o avaliador**, aplicado ao programa gerado e como régua dos testes, antes de qualquer editor.

---

## 1. O que existe hoje

**O que a pessoa pode mudar.** O "Prefiro este" vale entre equivalentes do mesmo nível da função (`selecao.preferencia`, `src/features/programa/Prefiro.tsx`). A troca pela alternativa vale só na sessão (`prescricaoDaVaga`, `src/domain/sessao/index.ts:73`). Ela pode ainda evitar exercícios e equipamentos (`restricoes`) e escolher a divisão entre as oferecidas (`divisao.recomendacao`). Não dá para montar nem editar um programa.

**O que o avaliador pode reaproveitar sem mudar nada** (todos exportados por `src/domain/gerador/index.ts`, salvo nota):

| peça | onde | serve para |
|---|---|---|
| `volumePorMusculo`, `seriesDeVolume` | `gerador/index.ts:821`, `:112` | séries por músculo, com a indireta a 0,5 (`volume.serie-indireta.peso`) e o drop set valendo 2 (`tempo.drop-set`) |
| `metasDoPerfil`, `MUSCULOS_COM_META` | `:117`, `:109` | meta (`volume.semanal.alvo`) e piso (`volume.semanal.minimo-eficaz`, 4; abdômen `volume.semanal.abdomen`) |
| `VOLUME` (teto 20, sessão 10, 2–4 por exercício, máximo do nível) | `regras/index.ts:24` | `volume.semanal.teto-padrao`, `volume.sessao.teto`, `volume.series-por-exercicio`, `volume.semanal.maximo` |
| `minutos`, `colchaoDe`, `exerciciosPorSessao` | `:946`, `:65`, `regras/index.ts:85` | tempo de cada dia (`tempo.serie`, `tempo.transicao`, `tempo.aquecimento`, `tempo.colchao`) |
| `contextoDeSelecao` (`possiveis`, `naFuncao`, `escolher`, `alternativasDe`, `caps`) | `:130` | o que é possível com o equipamento, o nível e a dor; as alternativas |
| `avaliarTriagem`, `efeitoDaDor`, `lembretesDeDor` | `triagem/index.ts:59,71`; `gerador:778` | dor > 5 exclui a região, 3–5 desfavorece, 0–5 dá lembrete (`seguranca.dor.programa`) |
| `FUNCAO`, `funcoesDoExercicio` | `gerador/funcoes.ts` | a função de cada exercício (`selecao.funcao-da-vaga`) e os isoladores obrigatórios (`obrigatoria`) |
| `REGRAS` (141, com selo e fontes) | `regras/index.ts:12` | o selo de cada achado |

**O que só existe dentro do gerador e teria de sair para fora:** `prescrever` (RIR, descanso, `rir.carga-baixa`, ajuste de `objetivo.forca.*`; `index.ts:512-565`, interna), `cabeNoTetoSemanal` (`:272`) e `motivoEstrutural` (`:630`). A primeira é indispensável para dar prescrição a um exercício que a pessoa acrescentou.

**O que o gerador garante por construção e nunca confere** (o avaliador teria de conferir):
- séries por exercício entre 2 e 4, e no máximo 10 por músculo na sessão. Só um teste confere isso (`gerador.test.ts:231`), e a sessão só é checada para o músculo principal (ver seção 2);
- a frequência mínima (`frequencia.musculo`), que vem da divisão;
- as 2 funções que se complementam nos músculos grandes (`selecao.exercicios-por-musculo`), que vêm dos modelos de dia (`divisoes.ts`). Um teste confere isso só na academia completa (`gerador.test.ts:452`);
- os isoladores obrigatórios (`selecao.isolador-obrigatorio`): o modelo põe a vaga;
- a complexidade até o nível: é um filtro (`NIVEL_COMPLEXIDADE_MAX`) **sem `regraId` próprio**;
- o equilíbrio empurrar × puxar: **não há regra**. Só existe "nunca o 3º empurrar num dia sem puxar" (`selecao.vaga-sem-equipamento`, `index.ts:344`) e `divisao.sem-puxar`. Frente × trás da coxa também não tem regra (as metas dos dois são iguais).

**Invariantes de `tests/unit/gerador.test.ts` que viram checagens do avaliador:** "nada exige equipamento fora do inventário, nem carrega articulação com dor > 5, nem passa da complexidade" (`:210`), "tempo dentro do orçamento, ou aviso" (`:223`), "nenhum músculo acima do teto; séries por exercício entre 1 e 4" (`:231`), "nenhum isolador antes de um multiarticular" (`:313`), "todo músculo abaixo do limiar aparece num aviso" (`:326`).

**O protótipo** (`frente-b/avaliador.ts`, descartável, ~330 linhas) tem 8 blocos de checagem: (1) segurança e possibilidade por exercício; (2) séries por exercício e por sessão; (3) semana contra a meta e o piso, teto e frequência; (4) funções que se complementam; (5) isoladores obrigatórios e flexora sentada; (6) empurrar × puxar e frente × trás da coxa; (7) tempo; (8) ordem (só informa). Cada achado tem uma de 5 gravidades: **segurança** (bloqueia), **alerta** (forte, não bloqueia), **ajustar**, **limite** (o equipamento, a dor ou o tempo impedem; nada a ajustar) e **info**. O veredito é "está bom" quando não há segurança, alerta nem ajustar. O avaliador também distingue "não cabe mais nos seus dias e minutos" (limite) de "dá para trocar séries de um músculo com folga" (ajustar).

## 2. O que falta, medido

**Personas** (`medir.ts`, seção 1): **Bruno, Diego e Fábio: está bom.** Ana: 1 ajustar (o dia C leva ~46 min em 45: `tempo.corte`, que o gerador já avisa) e 6 limites (pernas e glúteos de foco ficam abaixo de 8 porque não cabe mais em 45 min). Carla: 1 (`volume.semanal.alvo`, já avisado). Elisa: 1 (`volume.semanal.minimo-eficaz`, já avisado) e 7 limites (sem equipamento).

**20 programas da grade** (10 cenários × 2 níveis, com dias, minutos, foco e dor em rodízio fixo): 12 "está bom". Nos outros 8, só 3 achados não estão nos avisos do gerador (`selecao.exercicios-por-musculo`).

**Amostra da grade de qualidade**: 1 a cada 300 casos, as mesmas dimensões de `scripts/auditoria/qualidade.ts`, 2.682 programas, ~10 s num processo.

| recorte | programas | está bom | com achado que o gerador não avisa |
|---|---:|---:|---:|
| todos | 2.682 | **59,8%** | **17,4%** |
| cenários comuns (atalhos e personas) | 585 | 50,3% | 18,8% |
| iniciante / intermediário / avançado | 897 / 890 / 895 | 75,4% / 56,2% / 47,8% | 11,8% / 19,6% / 21% |
| 30 min | 531 | 42,2% | 15,3% |
| bloqueado (segurança) | — | **0%**: nenhum programa gerado carrega uma região com dor > 5, pede um equipamento ausente ou passa da complexidade | — |

| regra do achado | programas | % | % sem aviso do gerador |
|---|---:|---:|---:|
| `volume.semanal.alvo` (foco abaixo da meta) | 628 | 23,4% | 0% |
| `selecao.exercicios-por-musculo` | 305 | 11,4% | 9,7% |
| `tempo.corte` (dia mais longo que os minutos) | 254 | 9,5% | 0% |
| proposta: empurrar × puxar | 184 | 6,9% | 6,9% |
| `volume.semanal.minimo-eficaz` | 59 | 2,2% | 0% |
| proposta: frente × trás da coxa | 31 | 1,2% | 1,2% |
| `volume.sessao.teto` | 14 | 0,5% | 0,5% |

**Quem tem o problema: o avaliador ou o gerador?** (`diagnostico.ts`, mesma amostra)
- **Eram do avaliador, e corrigi.** (1) A frequência contava só os dias com o músculo como principal; o bíceps com 4 séries indiretas aparecia em "0 dias". (2) O glúteo não aceitava o stiff como extensão de quadril. (3) O avaliador cobrava a 2ª função mesmo com os dias cheios. Antes das correções, o "está bom" ficava em 30,9%.
- **Gerador, problema real 1: o teto da sessão não vale para as séries indiretas.** Ao subir uma série, o gerador confere o teto de 10 só para o músculo principal do exercício (`index.ts:474`). Num dia de pernas, o glúteo chega a 12. São 14 programas em 2.682 (0,5%). Na grade inteira, a estimativa por proporção é de ~4,7 mil programas.
- **Gerador, problema real 2: sem o stiff, o glúteo fica só com agachar e afundo.** No Corpo todo A/B, a extensão de quadril só entra com glúteo de foco (`divisoes.ts:182`). Quando o stiff não é possível (sem carga, ou com dor lombar acima de 5), a ponte de glúteo, que é possível, não entra. São 169 programas (6,3%).
- **Gerador, problema real 3: dois afundos no lugar de agachar + afundo.** O nível 2 da vaga de agachar inclui o búlgaro (`funcoes.json`). No desempate, ele ganha do goblet, e o dia fica com búlgaro + afundo, os dois do mesmo padrão. São 64 programas (2,4%).
- **Questão de definição, a decidir.** (a) A flexão em duas vagas (reta e inclinada) conta como 2 funções para o gerador (`selecao.peitoral-inclinado`), mas não para o avaliador: 30 programas (1,1%). (b) A remada que ocupa a vaga de puxada vertical já tem aviso (`equipamento.sem-puxada-vertical`), mas o avaliador por padrão de movimento sugere a puxada com elástico, que a tabela de funções põe atrás da remada: 38 programas. **Para não divergir, o avaliador definitivo deve medir pela tabela de funções (`FUNCAO`), como o gerador, e não pelo padrão de movimento.**
- **Regra nova.** Empurrar × puxar abaixo de 2/3 aparece em 6,9% dos programas, mais com foco em ombros (28 de 208) e em peito + braços (27 de 206). Hoje nenhuma regra limita isso.

**Programas publicados** (`classicos.ts`, digitados com exercícios da biblioteca, avaliados com o inventário da Carla, intermediário, 60 min, sem foco):

| programa | achados (ajustar/alerta) | os principais |
|---|---:|---|
| Corpo todo 3x, 3 séries (Schoenfeld 2019) | 9 | quadríceps com 27 séries (teto 20); posteriores, panturrilha e abdômen com 0; frente × trás da coxa |
| o mesmo, 5 séries | 38 | 21 exercícios com 5 séries; quadríceps com 15 numa sessão; dias de ~95 min |
| ABC clássica (Thomas e Burns 2016) | 15 | 6 a 9 séries num exercício; bíceps (13,5) e tríceps (15) num dia só; sem extensora; abdômen com 3 |
| 5 dias, 1x por músculo (Carneiro 2024) | 17 | 10 séries num exercício; peito, costas e quadríceps com uma função só; sem extensora nem tríceps acima da cabeça |

Nota sobre Carneiro 2024: o texto diz 75 séries por semana, mas as séries por exercício da seção 2.6 somam 85. Digitei as da seção 2.6.

### Três saídas completas (texto do protótipo, sem tela)

**1. ABC clássica de Thomas e Burns 2016**, veredito: ajustar
```
peito 9 · costas 9 · ombro lateral 7,5 · ombro posterior 4,5 · bíceps 13,5 · tríceps 15 · quadríceps 9 ·
posteriores 9 · glúteos 7,5 · panturrilha 9 · abdômen 3 (meta 6, piso 4; tudo 1 dia por semana)
Empurrar 12 × puxar 9. Tempo: A ~68 min; B ~51 min; C ~70 min (orçamento 60).
AJUSTAR [volume.series-por-exercicio · moderada] Supino reto com halteres, elevação lateral, tríceps na corda,
        puxada, rosca alternada, cadeira flexora: 6 séries; panturrilha em pé: 9. Acima de 4, divida entre 2 exercícios ou 2 dias.
AJUSTAR [volume.sessao.teto · um estudo] A: tríceps 15 séries neste treino; B: bíceps 13,5. Acima de 10, leve para outro dia.
AJUSTAR [frequencia.musculo · consenso] bíceps 13,5 e tríceps 15 em 1 dia: divida em pelo menos 2 dias.
AJUSTAR [volume.semanal.abdomen · consenso] abdômen: 3 séries, abaixo do piso de 4.
AJUSTAR [selecao.isolador-obrigatorio · moderada] Falta extensora (o reto femoral).
AJUSTAR [tempo.corte · consenso] A ~68 min e C ~70 min, mais que os 60 min.
info    [ordem.sessao · moderada] C: isolador antes de multiarticular (a hipertrofia é a mesma).
```

**2. Corpo todo 3x de Schoenfeld 2019, 3 séries**, veredito: ajustar
```
peito 9 · costas 18 · ombro lateral 4,5 · bíceps 9 · tríceps 9 · quadríceps 27 · posteriores 0 · glúteos 9 · panturrilha 0 · abdômen 0
Empurrar 18 × puxar 18. Tempo: ~60 min por dia (orçamento 60).
AJUSTAR [volume.semanal.teto-padrao · moderada] quadríceps: 27 séries por semana; acima de 20, o ganho extra é pequeno e incerto.
AJUSTAR [volume.semanal.minimo-eficaz · moderada] posteriores e panturrilha: 0 de ~4, e os dias estão cheios;
        costas tem 18 e quadríceps 27: troque séries ou um exercício de lá para cá.
AJUSTAR [volume.semanal.abdomen · consenso] abdômen: idem.
AJUSTAR [selecao.exercicios-por-musculo · consenso] peito só com supino reto; glúteos só com agachar.
AJUSTAR [selecao.isolador-obrigatorio · moderada] faltam o tríceps acima da cabeça e a panturrilha em pé.
AJUSTAR [proposta: equilíbrio da coxa · opinião] 0 séries de posteriores para 27 de quadríceps.
info    [volume.semanal.maximo · consenso] costas: 18, acima do máximo do nível (16).
```

**3. Programa gerado da Ana** (iniciante, halteres de 1 a 12 kg e banco reto, 3 × 45 min, foco em glúteos e pernas), veredito: ajustar (só o tempo)
```
quadríceps 6/8 · posteriores 6/8 · glúteos 10/8 · panturrilha 7/8 (foco); demais 4 a 6 (meta 6, piso 4)
Empurrar 6 × puxar 6. Tempo: A ~42; B ~44; C ~46 min (orçamento 45).
AJUSTAR [tempo.corte · consenso] C: ~46 min, mais que os 45 (o gerador já avisa).
LIMITE  [volume.semanal.alvo] quadríceps, posteriores e panturrilha abaixo de 8: não cabe mais em 3 × 45 min; para chegar lá, mais minutos, mais dias ou menos focos.
LIMITE  [selecao.exercicios-por-musculo] peito e quadríceps com uma função só: com 45 min, os dias já estão cheios. Costas: o equipamento não abre outra.
```

**Segurança (trecho).** Fiz uma edição fictícia: o Bruno copiou o programa gerado sem dor, depois marcou dor 7 no ombro e acrescentou um desenvolvimento. Resultado: veredito **bloqueado**, com 19 achados `seguranca.dor.programa` ("Carrega o ombro, marcado com dor acima de 5 hoje: sai do programa enquanto a dor não baixar; no lugar: rosca alternada... Procure avaliação profissional."). A tela deve agrupar os achados: 19 linhas iguais não se leem (ver os pedidos de design).

## 3. O que a evidência diz

| pergunta | resposta | selo | fontes (status) |
|---|---|---|---|
| Medir um programa por séries semanais por músculo faz sentido? | Sim: o volume semanal é a variável com a dose-resposta mais clara para a hipertrofia. | robusta | `schoenfeld2017a`, `pelland2026` (em `fontes.md`); `volume.semanal.dose-resposta` |
| E pela frequência? | Com o mesmo volume, a frequência quase não muda a hipertrofia. Ela serve para distribuir as séries, por isso o avaliador só cobra o mínimo `ceil(volume/10)`. | robusta (efeito); consenso (o mínimo) | `schoenfeld2019a`, `pelland2026`; `frequencia.musculo` |
| A divisão importa? | Não, com o volume igual: o avaliador não julga a divisão, só o volume e as funções. | robusta | `ramoscampo2024`, `acsm2026`; `divisao.equivalencia`. Thomas 2016 (novo, abaixo) e Carneiro 2024 (novo) empatam em massa magra |
| "Equilibrado", para um treinador? | Funções complementares nos músculos grandes; isolador para o que o multiarticular não cobre; não empilhar empurrar sem puxar. | moderada (funções); consenso (o número 2; empurrar × puxar, com apoio de caso-controle) | `selecao.exercicios-por-musculo`; `selecao.isolador-obrigatorio`; `kolber2014`, `kolber2017` (resumo-PubMed, já em `fontes.md`); `pesquisa-v2/14`, 6f |
| Um limiar de empurrar × puxar? | Não há ensaio prospectivo; o 2/3 do protótipo é meu. | [opinião] | `pesquisa-v2/14`, "Não achei" |
| Frente × trás da coxa? | O app já dá a mesma meta aos dois; o limiar de 1/2 é meu. Não procurei estudo de lesão por razão de força. | [opinião] | — |
| Quem escolhe a própria carga treina leve demais? | Iniciantes escolheram cargas abaixo do recomendado. | um estudo | `glass2004` (resumo-PubMed, já em `fontes.md`) |
| A carga escolhida pela pessoa rende menos? | Em 49 mulheres na pós-menopausa, a carga escolhida pela própria pessoa não foi inferior à imposta em massa e força; a equivalência não ficou demonstrada. | um estudo | Assis Silva 2025 (novo, resumo-PubMed) |
| O treino supervisionado rende mais? | Em 18 homens moderadamente treinados, o grupo supervisionado usou cargas maiores e ganhou mais força. | um estudo | Mazzetti 2000 (novo, resumo-PubMed) |
| Escolher (autonomia) ajuda a aderência? | A motivação autônoma se associa a mais exercício e mais aderência a longo prazo (66 estudos, na maioria observacionais). Escolher a ordem dos exercícios não mudou desempenho nem prazer em atletas jovens. | moderada (associação); um estudo (escolha da ordem) | Teixeira 2012 (novo, resumo-PubMed; PMC disponível); Watson 2020 (novo, resumo-PubMed) |
| Programa montado pela própria pessoa contra programa prescrito, com desfecho de hipertrofia? | Não achei ensaio. A busca no PubMed ("self-selected resistance training program autonomy") devolveu 1 resultado fora do tema. | — | "não achei" |
| O que apps de mercado fazem? | Alguns mostram as séries por músculo de uma rotina montada pela pessoa e um "mapa" de músculos treinados. Descrição de memória, **não conferida nesta sessão**; não é evidência. | [mercado] | — |

## 4. Valor para quem usa

- **Quem já treina e tem um programa próprio** (o público do Gustavo; entre as personas, a Carla e o Bruno): hoje o app descarta o programa dela. Com o avaliador, ela copia o programa e ouve, com o selo, o que um treinador diria. Nos 3 programas publicados que avaliei, os achados são concretos e fáceis de agir: dividir 6 a 10 séries, pôr posteriores e panturrilha, caber nos minutos. **Momento:** na primeira semana, ao copiar o programa, e depois a cada mudança.
- **Quem usa o programa gerado** (todas as personas): pouco muda. Em 60% dos casos o avaliador diz "está bom", e em mais 23% repete o que o gerador já avisa. O ganho é indireto: os 3 problemas do gerador da seção 2, corrigidos uma vez.
- **O orquestrador e os testes:** uma régua comum. As invariantes espalhadas pelo `gerador.test.ts` viram uma função só, e a grade passa a ter um "está bom" por programa.
- **Sem exagero:** não há estudo que mostre ganho de músculo ou de aderência por "montar o próprio treino". O que há é associação entre autonomia e aderência (Teixeira 2012) e um sinal de que quem treina sozinho escolhe cargas mais leves (`glass2004`, Mazzetti 2000). O avaliador não confere a carga.

## 5. Opções

| | (a) Só o avaliador | (b) Avaliador + edição do gerado | (c) Avaliador + montar do zero | (d) Etapa futura: ler por IA |
|---|---|---|---|---|
| **O que é** | `src/domain/avaliador/` puro, aplicado ao programa salvo (seção "Sobre o programa") e usado nos testes e na auditoria. Inclui as 3 correções do gerador. | (a) + acrescentar, tirar e trocar exercício, mudar séries e ordem, num programa que nasceu do gerador. | (b) + criar dias e programa do zero com a biblioteca (o caso "copiar o meu programa"). | (c) + foto ou texto do programa de fora, transcrito para exercícios da biblioteca. |
| **Esforço** | 2 a 3 dias | +4 a 6 (total 6 a 9) | +3 a 4 (total 9 a 13) | +3 a 5, depois de (c) |
| **Risco** | baixo: não muda o que a pessoa vê no treino | médio: mexe no estado guardado e no "Atualizar programa" | médio-alto: a pessoa pode montar algo sem sentido (o avaliador orienta) | alto: custo, privacidade e erro de leitura |
| **Regra** | 3 regras novas em `regras.md`: `avaliador.equilibrio.empurrar-puxar` (consenso), `avaliador.equilibrio.coxa` ([opinião]) e `selecao.complexidade-nivel` (o filtro de hoje ganha `regraId`); correção de `volume.sessao.teto` para as indiretas | `edicao.escolha-da-pessoa` (o "porquê" de um exercício que a pessoa pôs) | idem | `visao.programa` (a IA só transcreve) |
| **Dado** | nenhum | nenhum | nenhum | sinônimos de nome de exercício (pt-BR e inglês) na biblioteca |
| **Armazenamento** (`src/storage/`) | nada | versão nova (8 ou 9, ver abaixo), com migração e teste | a mesma da (b) | nada além da (c) |
| **Depende de** | `prescrever` exportado (para (b) em diante) | (a) | (b) | (c); a função de visão do `api/` |
| **Choque com o redesign** | só o pedido de tela da saída | a tela do programa vira editável (o redesign desenhou a lista e a folha do exercício) | idem, mais um fluxo novo no cadastro | idem |
| **Choque com o R3** | as 3 correções mudam alguns programas gerados (6,3% + 2,4% + 0,5% da amostra): avisar o Gustavo, que está em uso real | o programa dele pode ficar editado e não ser mais "atualizável" sem cuidado | idem | — |

### O desenho da edição (vale para (b) e (c))

**Modelo de dado.** O programa salvo ganha um campo `origem`: `'gerador'` (hoje), `'editado'` (nasceu do gerador e foi mudado) ou `'montado'` (do zero). Com `'editado'`, guarda também `base`, o programa gerado de onde saiu (o mesmo `Programa`, com o `entradasHash` dele). Cada exercício pode ganhar `escolhido: true`. O formato continua o `Programa` (`esquema.ts:83`), que já aceita qualquer exercício da biblioteca (`exercicioId` com `refine`). `metas` e `volumeSemanal` são recalculados por `metasDoPerfil` e `volumePorMusculo` a cada edição, porque `resumoDaSemana` lê `programa.metas` (`acompanhamento/semana.ts:94`). O `avisos` do programa editado passa a ser a saída do avaliador.

**Migração.** Hoje o estado está na versão 7 (`VERSAO_ESTADO`, `esquema.ts:13`), com migrações N → N+1 testadas em `armazenamento.test.ts` (`:91` a `:276`). A mudança é aditiva: a migração 7 → 8 não inventa nada, e o programa salvo fica `origem` ausente, que vale "gerador". **O redesign já pediu a versão 8** para `rotina.diasPlanejados` (pedido 2 da proposta). Se ele entrar antes, esta vira 8 → 9. Teste: um estado v7 migra sem mudar o programa, e um programa editado passa pela exportação e volta igual.

**Progressão, histórico, locais, semana leve e volta da pausa.**
- Progressão e histórico são por `exId` (`historicoDoExercicio`, `sessao/index.ts:191`): seguem iguais. Um exercício novo começa pela calibração (`progressao.calibracao`), e o histórico do que saiu fica na Evolução.
- O 2º local troca por função. Para um exercício sem `funcao`, `diaNoLocal` já cai na 1ª função do exercício (`locais/index.ts:72`); todo exercício da biblioteca está em alguma função? **A conferir num teste** (se algum não estiver, ele só fica quando é possível no local).
- Semana leve, readaptação e fase de aprendizado aplicam fatores às séries de qualquer dia (`aplicarFase`, `gerador:1248`): servem como estão.
- `proximoDia` usa os `id` dos dias (`sessao/index.ts:52`): os dias editados guardam o `id`, e um dia novo ganha um `id` novo e estável.
- Com `origem` diferente de `'gerador'`, a calibração do tempo (`acompanhamento/tempo.ts:35`) segue valendo, porque usa os minutos estimados.

**"Atualizar programa" com um programa editado.** Hoje `Programa.tsx:69` compara o gerado de novo com o salvo (`mesmoConteudo`) e oferece a troca. Com um programa editado, essa diferença existe sempre, e a troca apagaria o trabalho da pessoa. Regra proposta: com `origem` `'editado'` ou `'montado'`, o app nunca substitui sozinho. Ele mostra "O app montaria outro programa com os seus dados de agora" e três saídas: **manter o meu** (o padrão), **ver o novo lado a lado**, **trocar pelo novo** (com confirmação; o meu fica guardado como `anterior` para desfazer). Reaplicar as minhas edições sobre o novo é o que um registro de operações permitiria, e fica para depois: guardar o programa inteiro é mais simples, e a pessoa decide.

**Export/import.** O JSON exporta o `Estado` inteiro (`arquivo.ts:7`), então `origem`, `base` e `anterior` vão juntos. O `refine` de `exercicioId` já recusa exercício fora da biblioteca. Teste: o estado com programa editado passa pela exportação e volta igual (como `armazenamento.test.ts:229`).

### Riscos: o que bloqueia e o que só orienta

- **Bloqueia (segurança; princípio do `CLAUDE.md`):** a triagem com um "sim" sem liberação (`seguranca.triagem`) e o exercício que carrega uma região com dor acima de 5, ou sem nota (`seguranca.dor.programa`). O exercício sai do treino do dia, o app oferece a alternativa que poupa a região e recomenda avaliação profissional, como no programa gerado. Na sessão continuam valendo `seguranca.dor.escala` e os alertas (`seguranca.alerta.*`).
- **Alerta forte, sem bloquear:** um equipamento que não está no local, um exercício marcado para evitar, a complexidade acima do nível (mergulho, nórdico e roda abdominal para iniciante).
- **Só orienta:** volume, teto, frequência, funções, isoladores, equilíbrio, tempo e ordem. A pessoa pode manter um programa de 10 séries num exercício; o app diz o porquê, com o selo, e não insiste a cada abertura.
- **Sem sentido de propósito:** um dia vazio ou um programa sem nenhum exercício não se salva. É uma regra de tela, não do avaliador.

### Etapa futura: ler um programa de fora por IA (fora da proposta principal)

- **O que seria:** a pessoa fotografa ou cola o texto do programa. A função do `api/` devolve só uma lista de `{dia, exId da biblioteca, séries, repetições}`, em saída estruturada cujo esquema enumera os 139 ids da biblioteca, e marca como "não reconheci" o que não bate. A pessoa confere linha a linha antes de salvar. **A avaliação continua das regras:** a IA não opina sobre o programa, como já acontece com o equipamento (`CLAUDE.md`).
- **Custo por programa lido (estimativa, de conta e não de medição):** entrada de ~6 mil tokens (1 a 2 fotos de até ~1.568 tokens cada, pelo redimensionamento de `docs/pesquisa/11-decisoes-m4.md`, mais ~3 mil da lista de exercícios) e saída de ~1,5 a 3,5 mil tokens. Pelos preços da tabela da API (cache de 06/10/2026): Opus 5.5, $4 e $20 por milhão, dá **~US$ 0,05 a 0,10 por programa**; Sonnet 5.5, $2 e $10, dá ~US$ 0,02 a 0,05; Haiku 5.5, $0,10 e $0,50, dá ~US$ 0,002. A leitura acontece uma vez por programa, não por treino.
- **Privacidade (LGPD):** um programa de treino, sozinho, diz pouco sobre a saúde. Mas uma foto de caderno pode trazer nome, anotações de lesão ou de remédio, e no app o programa fica junto da triagem e da dor, que são dado sensível. Vale a regra das fotos de equipamento: redimensionar e tirar os metadados no aparelho, não guardar no servidor, não registrar a imagem no log e pedir o consentimento na tela. O texto colado passa pelo mesmo caminho.
- **Determinismo:** a IA entra só na transcrição, que a pessoa confirma. O programa salvo e a avaliação são os mesmos para a mesma lista confirmada.

## 6. Recomendação

**(a) Só o avaliador, agora.** Depois, **(c) direto** (montar do zero, que inclui editar o gerado) quando o Gustavo quiser abrir para quem já treina. A (b) sozinha não vale como um passo separado.

Por quê:
1. É barato (2 a 3 dias) e não toca no estado guardado, que o redesign também vai mexer (versão 8).
2. Achou 3 problemas reais no gerador: o teto da sessão com as séries indiretas (0,5%), o glúteo sem extensão de quadril no Corpo todo A/B (6,3%) e os dois afundos (2,4%). Também vira a régua do orquestrador e dos testes.
3. O público que o Gustavo descreveu (quem já tem um programa) precisa do avaliador antes do editor. Sem ele, montar o próprio treino é só uma planilha.
4. A evidência não promete ganho de músculo nem de aderência por montar o próprio treino; promete, no máximo, motivação mais autônoma. O avaliador entrega o que tem selo: volume, funções, tetos e tempo.

Para a (a) ficar firme, há duas condições. **Medir pela tabela de funções (`FUNCAO`)**, não pelo padrão de movimento, para não divergir do gerador. E **decidir o limiar de empurrar × puxar** (2/3 é minha opinião).

---

## Pedidos à sessão de design

1. **Saída do avaliador, em "Sobre o programa".** Motivo: 2.682 programas medidos; em 60% a resposta é "está bom", e a tela precisa dizer isso em 1 linha. Os achados, quando houver, vêm agrupados por músculo e por tipo: o programa de 5 séries de Schoenfeld deu 38 achados, 21 deles iguais ("5 séries num exercício só"), e o Bruno com dor deu 19 de segurança iguais. Esboço:
   ```
   Como está o seu programa                    [selo]
   ✓ Está bom: nada a ajustar.
   ─ ou ─
   ! Segurança: 19 exercícios carregam o ombro (dor 7 hoje)   [ver]
   ▸ Ajustar (3)   séries demais num exercício (21) · posteriores e panturrilha sem série · dias de ~95 min em 60
   ▸ Limites (2)   o que o seu equipamento ou os seus minutos não permitem
   ```
   Usar a superfície "alerta" do redesign para segurança, "aviso" para ajustar e "informação" para limite.
2. **Tabela por músculo** (séries, meta, dias), recolhida por padrão, com a mesma linha de 56 px do redesign. Motivo: é a base de cada achado de volume, e hoje já existe no programa (`Programa.tsx:484`).
3. **Editor (só se a opção (c) entrar):** na folha do exercício, "Trocar por..." (as alternativas e, em "ver mais", a biblioteca filtrada por músculo), o stepper de séries (de 1 a 10, com o achado aparecendo acima de 4) e "Tirar". No dia, arrastar para reordenar e "+ exercício". Áreas de 44 px e uso com uma mão.
4. **"Atualizar programa" com um programa editado:** um diálogo com "Manter o meu" como primário, "Ver o novo lado a lado" e "Trocar pelo novo" (confirmado). Motivo: hoje a comparação (`Programa.tsx:69`) daria sempre "versão nova" e apagaria as edições.

## Pedidos ao domínio

1. **Exportar `prescrever`** (RIR, descanso, `rir.carga-baixa`, `objetivo.forca.*`) e `cabeNoTetoSemanal` do gerador, sem mudar a saída (o snapshot igual prova isso).
2. **Corrigir `volume.sessao.teto` para as séries indiretas** (`index.ts:474` e a sobra em `:594`). Teste: nenhum músculo com mais de 10 séries fracionadas numa sessão, na amostra.
3. **Glúteo no Corpo todo A/B sem stiff:** quando a vaga de dobrar o quadril fica sem exercício (equipamento ou dor), a extensão de quadril entra. Teste: glúteo com 2 funções em todo programa em que a ponte é possível.
4. **Desempate na vaga de agachar:** no nível 2, preferir o padrão "agachar" quando o dia (ou a semana) já tem um afundo.
5. **Regras novas em `regras.md`:** `avaliador.equilibrio.empurrar-puxar` (consenso; o limiar a decidir), `avaliador.equilibrio.coxa` ([opinião]) e `selecao.complexidade-nivel` (o filtro `NIVEL_COMPLEXIDADE_MAX` ganha `regraId`). Para a edição: `edicao.escolha-da-pessoa`.
6. **Decidir** se a flexão em duas vagas (reta e inclinada) conta como 2 funções do peito (`selecao.peitoral-inclinado`).

## Fontes novas (para conferência)

| autor e ano | título | periódico | PMID / DOI | status |
|---|---|---|---|---|
| Thomas MH, Burns SP (2016) | Increasing Lean Mass and Strength: A Comparison of High Frequency Strength Training to Lower Frequency Strength Training | Int J Exerc Sci 9(2):159–167 | PMID 27182422; PMC4836564; DOI 10.70252/HDLQ5133 | texto completo lido no PMC (tabelas 2 e 3) |
| Carneiro MAS, Nunes PRP, Souza MVC, Assumpção CO, Orsatti FL (2024) | Full-body resistance training promotes greater fat mass loss than a split-body routine in well-trained males: A randomized trial | Eur J Sport Sci 24(6):846–854 | PMID 38874955; PMC11236007; DOI 10.1002/ejsc.12104 | texto completo lido no PMC (seção 2.6) |
| Assis Silva SH, de Lima ML, Assumpção CO, Souza MVC, Orsatti FL (2025) | Equivalence of self-selected versus imposed intensity in resistance training: effects on muscle mass, strength, and performance in postmenopausal women | Menopause (online ahead of print) | PMID 40367240; DOI 10.1097/GME.0000000000002535 | resumo lido no PubMed |
| Mazzetti SA, Kraemer WJ, Volek JS, et al. (2000) | The influence of direct supervision of resistance training on strength performance | Med Sci Sports Exerc 32(6):1175–1184 | PMID 10862549; DOI 10.1097/00005768-200006000-00023 | resumo lido no PubMed |
| Teixeira PJ, Carraça EV, Markland D, Silva MN, Ryan RM (2012) | Exercise, physical activity, and self-determination theory: a systematic review | Int J Behav Nutr Phys Act 9:78 | PMID 22726453; PMC3441783; DOI 10.1186/1479-5868-9-78 | resumo lido no PubMed |
| Watson K, Halperin I, Aguilera-Castells J, Dello Iacono A (2020) | A comparison between predetermined and self-selected approaches in resistance training: effects on power performance and psychological outcomes among elite youth athletes | PeerJ 8:e10361 | PMID 33240664; PMC7666817; DOI 10.7717/peerj.10361 | resumo lido no PubMed |

Já registrada, mas usada aqui pela primeira vez como programa: `schoenfeld2019b` (PMID 30153194). Li o texto completo no PMC (PMC6303131, seção "RT Procedures"; DOI 10.1249/MSS.0000000000001764): o `fontes.md` pode passar de "verificado-busca" para "texto-completo" e ganhar o DOI. **Não usei programas de treinadores de livro ou site** (Starting Strength, 5×5 e similares): os sites e livros não estão na rede liberada, e esses programas pedem o levantamento terra, que a biblioteca não tem.

## Como reproduzir

Os scripts ficam em `/tmp/claude-0/-home-user-treino-mvp/4613f7ac-a8aa-59f1-871a-0fe029cac2fa/scratchpad/frente-b/` e serão descartados. Eles rodam a partir da própria pasta (o `vite-node` chamado de dentro do repositório recusa caminhos de fora dele):

```
cd /tmp/claude-0/-home-user-treino-mvp/4613f7ac-a8aa-59f1-871a-0fe029cac2fa/scratchpad/frente-b
/home/user/treino-mvp/node_modules/.bin/vite-node medir.ts --amostra 300   # ~10 s, 1 processo
/home/user/treino-mvp/node_modules/.bin/vite-node diagnostico.ts 300
```

- `avaliador.ts`: o avaliador. `avaliar(programa, perfil, inventario)` devolve o veredito, os achados, a tabela por músculo e os minutos; `deGerado(nome, programa)` converte um programa do gerador; `textoDaAvaliacao` gera o texto.
- `classicos.ts`: os 4 programas publicados, digitados com exercícios da biblioteca; cada escolha de equipamento que o artigo não diz está anotada.
- `medir.ts`: mede as personas, os 20 programas da grade, a amostra de 1 em 300 (com a cobertura pelos avisos do gerador) e os programas publicados. Escreve `saida/medicoes.md` e `saida/saidas-completas.md`.
- `diagnostico.ts`: agrupa os achados de funções que se complementam por músculo, com um exemplo de cada, para separar os erros do avaliador dos do gerador.
