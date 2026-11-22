# Lote A1 · Crucifixo inverso com halteres, peito apoiado no banco inclinado (`crucifixo-inverso`)

De 17/11/2026. Primeira animação deste exercício: até aqui ele aparecia no app só como cartão de texto, e não existe animação de hoje para comparar. De bruços no encosto do banco regulável, um halter leve em cada mão; os braços abrem para os lados, com os cotovelos levemente dobrados e fixos, até perto da linha dos ombros. **Ainda não aprovada nem ligada ao app** (quem integra registra em `aprovados.ts` e no catálogo).

- Ficha da técnica: `docs/pesquisa/animacoes/crucifixo-inverso.md`; texto do app: `src/conteudo/exercicios/crucifixo-inverso.json`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/crucifixo-inverso.json`.
- Animação: `src/engine/novo/exercicios/crucifixo-inverso.ts`. A cena e o corpo deitado são os da remada apoiada aprovada (`remada-apoiada.ts`, exportados como `baseNoEncostoDaRemada`); os braços são próprios.
- Regras novas: `src/engine/novo/regras/crucifixo-inverso.ts`.
- Quadros grandes: `../quadros/crucifixo-inverso.png`. Sem folha (não há animação de hoje para pôr ao lado).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco a ~30–45° | consenso | encosto a 45°, o mesmo da remada apoiada aprovada (a ponta de cima da faixa; ver "Por que 45°") | sim |
| Deitado de bruços, peito apoiado | consenso | o peito e a barriga amassam 1 cm no encosto, do começo ao fim; o alto do esterno fica 4 cm antes da ponta e o queixo 10,2 cm além dela (o rosto fica fora do estofado) | sim |
| Pés no chão | consenso | na ponta dos pés, dos dois lados do banco, 14,8 cm para fora da lateral do estofado; as pernas ficam a 0,6 cm das peças do banco; os pés não se mexem (0 cm) | sim |
| Halteres pendurados, palmas uma para a outra | consenso | no começo, a linha do ombro à mão fica 8° da vertical; o polegar aponta para a frente (no máximo 2,6° fora dessa direção no ciclo): embaixo, as palmas ficam uma para a outra; o halter fica a 49 cm do chão | sim |
| Cotovelos levemente dobrados e fixos | consenso | o cotovelo fica dobrado 15° o ciclo todo (de 15° a 15°) | sim |
| Abre os braços para os lados | consenso | a mão vai 54,6 cm para o lado e sobe 57,5 cm, sem andar para a frente nem para trás (0 cm) | sim |
| Até os braços chegarem perto da linha dos ombros | consenso | no fim, a linha do ombro à mão fica 5° abaixo da horizontal e, vista de cima, na linha dos ombros (0°); a mão fica 5,5 cm abaixo do ombro | sim |
| Pausa curta em cima; descida controlada | consenso | topo parado 0,5 s; descida em 2,2 s (subida em 1,2 s: a ficha não dá número) | sim |
| Sem encolher os ombros | consenso | a clavícula fica 2° abaixo do ritmo normal do ombro o ciclo todo (sobe no máximo −2° além dele) | sim |
| Sem juntar as escápulas com força (correção do achado 5) | consenso | no fim, a clavícula fica só 2° atrás do ritmo: a escápula acompanha o braço e não se junta (na remada apoiada, que junta as escápulas, são 10°); no começo, 4° à frente, com os braços pendurados | sim |
| O peito apoiado tira o embalo: o tronco não se mexe | consenso | a base do pescoço se move 0 cm; a lombar fica na curva de repouso (0°) | sim |
| Os halteres não batem no corpo nem no banco | desenho | a carga fica a no mínimo 2,1 cm da pele e 9 cm das peças do banco | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs crucifixo-inverso`): **0 falha, 2 avisos**. Os avisos: as linhas da ficha de movimento que são escolha de desenho (`inicio.fora`, `cotovelo.paraTras`, `carga`) e a vista de lado, que não serve ao modo Músculos (o ombro de trás não aparece de lado; ela não está entre as vistas do exercício, só aparece no aviso porque o relatório mede todas). O ritmo fica suave (salto de 4,4%, limite de 15%); o corpo amassa o estofado 1 cm (tolerância 2,5 cm); a elevação do braço chega a 89°.

### Por que 45°, e de onde vem o corpo deitado

O cartão dá "cerca de 30–45°". A remada com o peito apoiado (aprovada) usa a mesma cena com o encosto a 45° e já resolveu, com medida, o peito no encosto, o queixo além da ponta, as pernas fora do banco e os pés na ponta, no chão. Usar a mesma cena dá ao Gustavo um banco e uma pose que ele já viu e aprovou, e os 45° deixam o halter longe do chão com os braços pendurados (49 cm). Os números do corpo deitado ficam na ficha da remada (`remada-apoiada.json`: `tronco.maisDeitado`, `peito.abaixoDaPonta`, `joelho`, `pes.*`, `cervical`) e não foram repetidos aqui; a fonte `remada` da ficha diz isso.

### O arco dos braços

O braço gira em volta da direção para a frente (do mundo, e não do tronco): de pendurado a perto da horizontal, para o lado. Assim a mão sobe pelo lado sem ir à frente nem para trás, que é o "abre para os lados" do cartão, e no fim os braços ficam na linha dos ombros (um "T" visto de trás). O cotovelo aponta para fora (para onde o braço abre) e um pouco para trás; o antebraço dobra 15° para dentro. A mão mantém o polegar para a frente: embaixo, as palmas ficam uma para a outra (o cartão); em cima, viram para o chão, que é o que acontece com essa pegada quando o braço abre para o lado.

### A vista, por medida

Medidas no ciclo (`areaDoPrincipal`, a área do ombro de trás virada para quem olha, no pior de começo, meio e fim; e o caminho da mão na tela):

| Vista | Ombro de trás (cm²) | Caminho da mão na tela (cm) |
|---|---|---|
| de trás (`posterior`) | 71,7 | 86,9 |
| de frente (`frontal`) | 62,2 | 86,9 |
| três quartos, de trás (`quinaTras`) | 59,6 | 73,8 |
| três quartos (`quina`) | 52,6 | 63,0 |
| de cima (`cima`) | 28,1 | 53,9 |
| de lado (`lateral`) | 0 | 60,0 |

Ficaram **de trás** (a padrão: o arco inteiro fica no plano da tela, simétrico, como no crucifixo invertido na polia aprovado) e **três quartos de trás** (a segunda: é a única que mostra ao mesmo tempo o peito apoiado no encosto, o arco e o ombro de trás). De frente mede bem, mas o desenho vira um borrão: vê-se o alto da cabeça e a barriga por baixo, com o banco entre as pernas. De lado o músculo some e os braços vêm na direção de quem olha.

## Erros

O cartão tem quatro erros; três viraram desenho, na ordem do app.

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Encolher os ombros ("o trapézio assume o trabalho") | de trás | no fim, a clavícula sobe 18° além do certo (16° além do ritmo); o centro do ombro sobe 1,8 cm e a ponta do ombro bem mais (a linha do erro passa acima da tracejada) |
| Dobrar os cotovelos ("vira uma remada") | de trás | o braço sobe como o certo (o cotovelo 2,7 cm abaixo do ombro), mas o cotovelo dobra até 85° e a mão fica pendurada 33,7 cm abaixo dele: uma remada com os cotovelos abertos; a mão fica 45 cm longe de onde ficaria no certo |
| Tirar o peito do banco ("dá embalo com o tronco") | três quartos, de trás | o tronco levanta 18° do encosto enquanto os braços abrem, com a lombar arqueando 6°: a base do pescoço sobe 14,8 cm e o peito fica 7 cm longe do estofado |
| Carga pesada demais ("o movimento sai com tranco") | **não desenhado** | a descrição do cartão e a ficha só falam do tranco, que é ritmo e não pose; o motor ainda não desenha erro de ritmo (backlog). Não inventei uma consequência que o texto não diz. **O teste `motor-novo-ponte` ("os erros... na mesma ordem") falha neste id até quem integra pôr o título em `SEM_DESENHO`, como a "Quicar embaixo" da panturrilha no degrau.** |

## O equipamento

- **Banco regulável** (`dados/objetos.json`, `bancoRegulavel`, ficha da Rogue AB-3), girado meia volta como na remada apoiada, encosto a 45°.
- **Halter sextavado de 10 lb** (`dados/objetos/halter-leve.json`): o cartão pede "um par de halteres leves". O cabo fica de frente para trás; de trás, a cabeça do halter tapa a mão (é o que se vê de verdade).

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- **Achado 5 da revisão de anatomia:** só o ombro de trás, sem secundário (sai "costas"), e as escápulas não se juntam com força. Respeitada: `papeis` só tem `deltPost`, e a regra nova mede que a clavícula fica 2° atrás do ritmo no fim (menos da metade do que a remada usa para "juntar").
- **05/11, crucifixos abrem de cima:** valia para os crucifixos de pé na polia, porque de cima se via o arco das mãos. Aqui o corpo está deitado a 45° e a vista de cima mostra pouco (28 cm² de músculo, 54 cm de caminho da mão, o tronco encurtado); a medida pediu a de trás. Não é a mesma situação, mas vale olhar.

## O que não ficou bom

- **O ombro de trás no modo Músculos, de trás, no topo:** com o tronco a 45° e a câmera na horizontal, o músculo aparece como uma faixa fina em cima de cada ombro (em `posterior:mus:f1`). Ele se lê bem no começo e em três quartos de trás (`quinaTras:mus:f0.5`). O modo Músculos escolhe a vista pela maior área no pior instante, e a de trás ganha (72 contra 60 cm²); não há vista "de trás e de cima" no motor. Tentei a de cima (28 cm²) e a de frente (borrão).
- **O corpo fica médio no quadro de trás:** o quadro precisa caber os braços abertos (quase 1,7 m de mão a mão) e o corpo deitado é baixo; ele ocupa pouco mais da metade da altura do quadro.
- **De trás, a mão some atrás da cabeça do halter** (o cabo aponta para a câmera). É a geometria real; de três quartos a mão aparece.
- **O tempo da subida (1,2 s)** é escolha de desenho: a ficha não dá número.
