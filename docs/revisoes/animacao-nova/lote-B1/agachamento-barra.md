# Lote B1 · Agachamento livre com barra, profundo (`agachamento-barra`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, a barra de 60 kg (barra de 20 kg e uma anilha de 20 kg de cada lado) no alto das costas, dois passos atrás dos ganchos do suporte; desce até a coxa passar da horizontal e volta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/agachamento-barra.md`. Cartão do app: `src/conteudo/exercicios/agachamento-barra.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/agachamento-barra.json`.
- Animação: `src/engine/novo/exercicios/agachamento-barra.ts`, sobre o núcleo dos agachamentos aprovados (`exercicios/agachar.ts`, sem mudança). A folga entre a barra e a pele sai de `exercicios/barra-nas-costas.ts` (novo, comum às três animações com barra). Regras medidas: `src/engine/novo/regras/barra-no-suporte.ts` (nova família).
- Peças: a barra longa (`pecas-de-cena/barra-longa.ts`, já mostrada) e o suporte novo (`pecas-de-cena/suporte.ts`; folha em `docs/revisoes/animacoes-restantes/pecas/folha-suporte.png`).
- Quadros grandes: `../quadros/agachamento-barra.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá quase tudo em palavras. Duas coisas aqui **não são escolhidas, são calculadas**:

- **A inclinação do tronco.** O cartão pede que "o tronco incline o necessário para a barra ficar sobre o meio do pé", e o núcleo dos agachamentos já põe o centro de massa (corpo + barra) sobre o meio do pé. Com as duas condições, sobra uma inclinação só para cada flexão do joelho. Ela é calculada uma vez por corpo numa tabela de nove joelhos (de 8° a 126°) e lida com uma curva suave entre eles.
- **Onde a barra encosta.** O centro da barra fica 3 cm abaixo da base do pescoço (C7), ao longo do tronco (barra alta, sobre o trapézio: escolha de desenho, porque a ficha não dá número), e a distância até a pele das costas sai da superfície do Boneco, vindo de fora até encostar.

O resto que a ficha não dá em número saiu dos agachamentos aprovados (joelho em cima e embaixo, pés, erros), com selo `desenho` e o motivo em cada linha da ficha de movimento.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Barra apoiada no alto das costas, sobre o trapézio | consenso | o centro da barra fica a 5,2 cm da base do pescoço, encostado na pele das costas (folga de 0 a 0 cm no ciclo); a pele dos ombros e dos braços fica a 3,4 cm ou mais | sim |
| Mãos um pouco mais abertas que os ombros | consenso | o centro de cada mão a 28 cm do meio da barra (os ombros a 20,4 cm); o cotovelo aponta para baixo e para trás, 21 cm atrás da mão e 29 cm abaixo dela | sim (aviso: o cotovelo dobra 154,8°; ver abaixo) |
| Pés na largura dos ombros ou um pouco mais, pontas levemente para fora | consenso | centros dos pés a 20,4 cm do meio; pontas 15° para fora; os pés não saem do lugar (0 cm) | sim |
| Desce até a coxa passar da linha horizontal | um estudo | o joelho vai de 8° a 126°; embaixo, o quadril fica 1,1 cm abaixo do joelho | sim |
| Quadril e joelhos dobram juntos; o joelho acompanha a ponta do pé e pode passar dela | consenso | o joelho anda numa direção a 6,4° da do pé, visto de cima; embaixo ele passa 12,5 cm à frente do meio do pé | sim |
| O tronco inclina o necessário para a barra ficar sobre o meio do pé | consenso | a barra fica exatamente sobre o meio do pé do começo ao fim (desvio de 0 cm); o tórax inclina 16,1° em pé e 25,8° embaixo | sim |
| Calcanhares no chão; peso no meio do pé | consenso | o centro de massa (corpo + 60 kg) fica a no máximo 0,3 cm do meio do pé; o calcanhar não sai do chão | sim |
| Coluna neutra | consenso | a lombar não dobra além da curva de repouso (0°) | sim |
| ~2–3 s descendo, sem quicar; subida firme | moderada | 2,5 s de descida, 0,45 s parado embaixo, 1,4 s de subida; o maior salto de velocidade é 4,8% do pico (limite 15%) | sim |
| Barra no rack na altura do meio do peito | consenso | o berço do gancho fica a 130 cm do chão (a altura do peito da tabela é 129,4 cm; o gancho vai num furo, de 2,5 em 2,5 cm) | sim |
| Pinos de segurança um pouco abaixo do ponto mais baixo | consenso | o topo dos pinos fica a 90 cm; embaixo, a barra passa 4,3 cm acima deles e 8,7 cm para dentro da ponta (eles a pegariam) | sim |
| Tirar a barra com dois passos para trás | consenso | a barra fica a 45 cm do centro dos montantes (30,8 cm atrás da ponta do gancho): desce sem bater nele | sim |
| Travas nas anilhas | consenso | as presilhas de mola aparecem nas mangas | sim |

**Dois avisos de amplitude**, os dois consequência do que a ficha pede:

- **O cotovelo dobra 154,8°** (média 148°, máximo observado 166°). Com a barra encostada nas costas e as mãos a 28 cm do meio, a mão fica a uns 16 cm do ombro: o braço tem de dobrar quase todo. É o que acontece de verdade no agachamento com barra alta; com as mãos mais abertas, dobraria menos.
- **O tornozelo dobra 34,4°** (média 14,8°, máximo 48°). Com a barra e o centro de massa sobre o meio do pé, o tronco fica mais em pé (25,8° embaixo) que no agachamento com halteres aprovado (33°), e o joelho vai mais para a frente. É o agachamento de barra alta que a ficha descreve; o aprovado com halteres dá 27,2°.

**Conferência automática: 0 falha, 4 avisos.** (1) e (2) acima; (3) as linhas da ficha de movimento que são escolha de desenho (`barra.abaixoDaC7`, `pegada.meia`, `carga.anilhas`, `suporte.passos`, `pinos.folga`); (4) o modo Músculos abre de lado (quadríceps: 334 cm²); de frente o principal mede 0 cm², igual aos agachamentos aprovados (o de halteres: 323 e 0 cm²).

## As vistas

**De lado** (padrão): a barra sobre o meio do pé, a profundidade, o tronco e o suporte à frente, com o gancho e o pino. **De frente**: os joelhos na linha dos pés, a pegada e a barra inteira entre os montantes. As duas como nos agachamentos aprovados.

**A anilha de perto, na vista de lado.** A anilha de 45 cm, centrada na barra, cobriria a cabeça e os ombros. Ela (com as mangas, os rebordos e as presilhas) é pintada atrás do corpo, onde cai no mesmo lugar da tela que a anilha de longe: o que se vê é a anilha de trás. Foi uma opção acrescentada à barra (`pontasAtras`), que não muda o desenho dela sem a opção.

**O suporte, na vista de lado.** O montante, o pino e o quadro do chão são cenário, pintados atrás do corpo (de perfil, o de perto e o de longe caem no mesmo lugar). O gancho é desenhado na ordem certa e entra no enquadramento.

## Erros (os quatro do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Meio agachamento | de lado | a descida para com o joelho a 90° (o meio agachamento do estudo de Kubo): a barra para a 119,7 cm, e o quadril fica 19,7 cm acima do joelho |
| Joelhos para dentro | de frente | embaixo, cada joelho cai 9 cm para dentro da linha do pé (o dos agachamentos aprovados) |
| Lombar arredonda no fundo | de lado | embaixo, a lombar dobra 35° além da curva de repouso e a bacia gira para trás; o peito cai 10° a mais (35,8°). Com mais que isso a barra desceria até os pinos: com 10°, ela fica a 4 cm deles |
| Calcanhar sai do chão | de lado | o pé gira 14° na bola, o calcanhar sobe 4,8 cm e o centro de massa vai para a bola do pé: a barra sai 9,3 cm para a frente do meio do pé |

## O equipamento

- **Barra longa** da tabela (IWF: 220 cm, pegada de 2,8 cm), com uma anilha de 20 kg (45 cm) e a presilha de cada lado: 60 kg no equilíbrio.
- **Suporte** novo (`objetos/suporte.json`): montantes de 192 cm (Life Fitness LBR-OS), quadro do chão de 150 cm (Hammer Strength OSR), vão de 110 cm (IPF), ganchos e pinos na regulagem da IPF (passos de 2,5 cm; pinos de 50 cm). Aqui: ganchos a 130 cm, pinos a 90 cm.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Dos agachamentos aprovados vêm o joelho embaixo, a abertura dos pés e os erros de valgo e de calcanhar.

## O que não ficou bom

- **O suporte é diferente do cartão de hoje**: o cartão é uma gaiola de quatro colunas; as fichas lidas são de suportes abertos de duas colunas, e foi esse o desenho. Um cartão e uma cena com aparelhos diferentes podem confundir quem tem a gaiola na academia (ver `resumo-suporte.md`).
- **O montante fica perto do rosto na vista de lado** (a uns 25 cm em pé): com pinos de 50 cm (IPF), a barra não pode ir muito mais longe dos ganchos e ainda ficar sobre os pinos.
- **O cotovelo bem dobrado (154,8°)** fica no aviso, como explicado acima.
- **De frente**, os montantes passam à frente da pessoa na cena real; aqui eles são pintados atrás dela. Como não cruzam o corpo nessa vista, não se nota.
