# Lote B1 · Supino reto com barra (`supino-barra`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado no banco reto, dentro do suporte, com os olhos embaixo da barra nos ganchos; a barra de 40 kg (barra de 20 kg e uma anilha de 10 kg de cada lado) desce do alto, sobre os ombros, até tocar de leve o meio do peito, e volta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/supino-barra.md`. Cartão do app: `src/conteudo/exercicios/supino-barra.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-barra.json`.
- Animação: `src/engine/novo/exercicios/supino-barra.ts`. O corpo no banco é o do supino reto com halteres aprovado (`exercicios/supino-reto.ts`, sem mudança: a conta foi repetida aqui, sem importar de lá). Regras medidas: `src/engine/novo/regras/barra-no-suporte.ts`.
- Peças: o banco reto da tabela, a barra longa e o suporte novo (`pecas-de-cena/suporte.ts`).
- Quadros grandes: `../quadros/supino-barra.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá um número só (cotovelos a ~30–60° do tronco). O resto vem do supino reto com halteres aprovado (o corpo no banco, a cabeça a 3 cm da ponta, as escápulas, os pés), com selo e fonte em cada linha. O caminho da barra **não é escolhido**: em cima, ela fica sobre o centro dos ombros, na altura em que o cotovelo dobra 10° (o "quase estendidos, sem travar" do aprovado); embaixo, na linha do meio do peito (a do mamilo, 22,1 cm abaixo da base do pescoço pela tabela do corpo), encostada na pele, achada vindo de fora até a barra tocar a superfície do Boneco. Entre os dois, a barra anda em linha reta. A regulagem do suporte também sai da conta: os ganchos sobre os olhos (onde o Boneco desenha os olhos) e no primeiro furo 4 cm abaixo da barra em cima; as travas no primeiro furo 2 cm abaixo da barra no peito.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco plano dentro do rack | consenso | o banco passa entre os montantes do suporte, com a cabeça a 3 cm da ponta (o do aprovado) | sim |
| Deitado, olhos embaixo da barra | consenso | a barra nos ganchos fica sobre os olhos (0 cm de diferença, de lado) | sim |
| A barra numa altura que você alcança com os cotovelos quase estendidos | consenso | o berço do gancho a 105 cm do chão (a IPF regula de 75 a 110): a barra nos ganchos fica 5,9 cm abaixo da barra em cima | sim |
| Pés firmes no chão | consenso | os pés não saem do lugar (0 cm) | sim |
| Escápulas juntas e para baixo, apoiadas no banco | consenso | escápulas 9° juntas e 4° para baixo (as do aprovado); o quadril não sai do lugar (0 cm) | sim |
| Pegada um pouco mais aberta que os ombros, punhos retos | consenso | o centro de cada mão a 30 cm do meio da barra (os ombros a 20,4 cm); o punho fica reto (0°) | sim |
| Em cima: braços quase estendidos, barra sobre os ombros | consenso | a barra a 112,3 cm do chão, 0,8 cm da vertical dos ombros; o cotovelo dobra 10° | sim |
| ~2 s descendo até tocar de leve o meio do peito | consenso | 2 s; embaixo a barra fica a 0 cm da pele, 22,1 cm abaixo da base do pescoço (a linha do mamilo, 22,1 cm); no caminho, nunca entra no corpo; ela anda 40,6 cm para baixo e 11,8 cm para o lado dos pés | sim |
| Cotovelos a ~30–60° do tronco | consenso | embaixo, o braço faz 49,9° com o tronco, visto de cima | sim |
| Empurra até quase estender os cotovelos, sem travar | consenso | 1,3 s de subida pelo mesmo caminho; o último quadro emenda no primeiro (0 cm); o maior salto de velocidade é 8,7% do pico | sim |
| Travas de segurança logo abaixo da altura do peito | consenso | o topo das travas a 67,5 cm; com a barra no peito, elas ficam logo abaixo dela e a barra fica 13,5 cm para dentro da ponta delas | sim |
| Anilhas iguais dos dois lados | consenso | uma anilha de 10 kg de cada lado, com a presilha | sim |

**Conferência automática: 0 falha, 2 avisos.** As linhas da ficha de movimento que são escolha de desenho (`cabeca.folgaNoBanco`, `pegada.meia`, `carga.anilhas`, `ganchos.abaixo`, `pinos.folga`) e, no modo Músculos, a vista de lado (o peito aparece pouco, 84 cm², contra 465 cm² de cima, igual ao supino reto aprovado): o modo Músculos abre de cima.

**A ponta do banco.** A IPF pede que a cabeça do banco passe 22 cm (± 5) do centro dos montantes; aqui passa 8,8 cm. Com a cabeça a 3 cm da ponta (o pedido do Gustavo no supino reto aprovado) e os olhos embaixo da barra nos ganchos (o cartão), não sobra mais banco atrás dos montantes. É medida de banco de competição; num rack de academia não há essa regra.

## As vistas

Como no supino reto aprovado: **de lado** (padrão do modo Técnica: a barra descendo até o peito, a altura dos ganchos e das travas) e **de cima** (os cotovelos a ~50°; padrão do modo Músculos).

Na vista de lado, as anilhas (45 cm) são pintadas atrás do corpo (a anilha de perto cobriria o peito e o braço); o montante, o pino e o quadro do chão do suporte são cenário, atrás do corpo; o gancho fica na ordem certa. De cima, o que se vê do suporte são os trilhos do chão, os pinos e o alto dos montantes, dos dois lados do banco.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Quicar a barra no peito | **não desenhado** | é erro de ritmo: a descrição ("Usar o peito como mola tira o trabalho do músculo e machuca") não diz nenhuma consequência visível. Fica fora da ficha de movimento; quem integra põe a exceção em `SEM_DESENHO`. O quadro de baixo tem a pausa "Toca o peito · sem quicar" (0,4 s) |
| Cotovelos abertos a 90° | de cima | embaixo, o braço fica a 88° do tronco (o certo: 49,9°), como no supino reto aprovado |
| Tirar o quadril do banco | de lado | o quadril sobe 12 cm (de 53,7 para 65,7 cm do chão); as costas de cima ficam no banco (a base do pescoço não sai do lugar) e os pés também; o tronco gira 11° e o joelho abre de 86° para 65° |

## O equipamento

- **Banco reto** da tabela de objetos (o mesmo do supino reto aprovado).
- **Barra longa** (IWF), anilha de 10 kg (45 cm de diâmetro, 3,5 cm de espessura, provisória) e presilhas: 40 kg.
- **Suporte** novo: ganchos a 105 cm, travas a 67,5 cm, com 50 cm de comprimento (a medida da IPF).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md`. Do supino reto aprovado vale a da cabeça apoiada perto da ponta do banco (3 cm), pedida pelo Gustavo em 15/11/2026.

## O que não ficou bom

- **Embaixo, o cotovelo passa abaixo do tampo do banco** (40,5 cm do chão; o tampo fica a 43,5 cm). Ele fica do lado de fora do banco, então não o atravessa, mas na vista de lado o braço cruza a borda do estofado. É a conta: a barra toca o peito 22 cm acima do ombro e o antebraço mais a mão medem 33,7 cm.
- **De cima, o suporte vira um desenho de trilhos e quadrados** (o chão, os pinos e o alto dos montantes): reconhece-se como aparelho, mas não como "rack" à primeira vista.
- **O suporte é diferente do cartão de hoje** (gaiola × suporte aberto; ver `resumo-suporte.md`).
- **A ponta do banco passa só 8,8 cm dos montantes** (a IPF pede 22): ver acima.
