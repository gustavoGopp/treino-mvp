# Lote A3 · Stiff unilateral com kettlebell (`stiff-unilateral-kettlebell`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé numa perna (a direita, a de perto na vista de lado), joelho levemente solto, o kettlebell de 12 kg na mão esquerda (a do lado oposto à perna de apoio); dobra o quadril, o tronco vai à frente e a perna livre sobe para trás em linha com ele, até o tronco ficar quase paralelo ao chão, e volta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/stiff-unilateral-kettlebell.md`. Cartão do app: `src/conteudo/exercicios/stiff-unilateral-kettlebell.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/stiff-unilateral-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/stiff-unilateral-kettlebell.ts`, sobre o núcleo dos stiffs (`exercicios/dobrar-o-quadril.ts`), o mesmo do stiff unilateral com halter aprovado. Sem regra nova: usa as regras dos stiffs (`regras/stiffs.ts`).
- Quadros grandes: `../quadros/stiff-unilateral-kettlebell.png`. **Sem folha** (o exercício não tinha animação).

## Mudança no núcleo comum (`dobrar-o-quadril.ts`), aditiva

O núcleo só tinha a carga numa mão na direita (o halter do stiff unilateral). Acrescentei uma variação, `'kettlebellOposta'`, ao tipo `MaosDoStiff`, e o que ela precisa, sem mudar as outras:

- a carga na mão esquerda (`maoDaCarga`), com o kettlebell seguro pelo meio da barra de cima da alça, pendendo na vertical; a mão direita pende, solta;
- a mão desce numa linha um pouco para dentro do pé de apoio (`kettlebell.paraDentroDoPe`), para a bola passar rente à canela pela frente (com a mão na vertical do ombro esquerdo, a bola não encontrava a perna de apoio e o braço ia para trás até bater na coxa da perna livre: o kettlebell ficava atrás da perna);
- o perfil do braço com 49 pontos em vez de 25 só nesta variação (com 25, o alisamento afastava a bola 4,4 cm da coxa no começo da descida, e a regra "rente às pernas" pede no máximo 4).

`node scripts/animacao-nova/preparo.mjs` não mudou o preparo de nenhuma animação aprovada (só os arquivos deste exercício e o registro), e a conferência dos outros stiffs continua igual.

## Onde os números saem

A ficha da técnica diz pouco ("numa perna, kettlebell na mão do lado oposto"; "dobrar o quadril com as costas retas, a perna livre em linha com o tronco"); o cartão acrescenta "joelho levemente solto", "tronco quase paralelo ao chão" e "quadril de frente para o chão". O resto vem do stiff unilateral com halter aprovado, número a número (joelho de apoio, perna livre, pescoço, os erros), com selo `desenho` e fonte `aprovado`. As escolhas novas, selo `desenho`: a linha da mão (9 cm para dentro do meio do pé de apoio) e a folga da bola à perna (0,6 cm, a mesma do halter). A ficha não diz por onde o kettlebell passa; escolhi "perto da perna de apoio", como o halter.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé numa perna, joelho levemente solto | consenso | o pé direito não sai do lugar (0 cm); em pé, o quadril dobra 6° e o peito fica 1,3° à frente da vertical | sim |
| Kettlebell na mão do lado oposto à perna de apoio | consenso | o kettlebell pende da mão esquerda, na vertical, pelo meio da barra da alça (0 cm da mão ao centro da pegada) | sim |
| Dobra o quadril, joelho levemente solto e fixo | consenso | o quadril dobra 91° e vai 14,3 cm para trás; o joelho de apoio fica entre 10° e 16° | sim |
| Embaixo: tronco quase paralelo ao chão | consenso | o peito fica a 10,7° da horizontal | sim |
| A perna livre para trás, em linha com o tronco | consenso | embaixo, a perna livre faz 2° com a linha do tronco | sim |
| Costas retas | consenso | a lombar não dobra além da curva de repouso (0°) | sim |
| Quadril de frente para o chão | consenso | os dois quadris na mesma altura (0 cm de diferença) | sim |
| O kettlebell perto da perna (desenho, como o halter aprovado) | desenho | da bola à pele da coxa ou da canela, de −0,3 a 2,5 cm na descida; embaixo, a base fica a 13 cm do chão e a bola a 5,4 cm da pele do pé | sim |
| Equilíbrio numa perna | consenso | o centro de massa (corpo + kettlebell) fica sobre o meio do pé de apoio (0 cm), para a frente e de lado: a bacia vai 11 cm para a direita, para cima do pé, contra o peso do kettlebell à esquerda | sim |
| Descida ~2–3 s; volta empurrando o quadril à frente | consenso | 2,5 s e 1,4 s; o ritmo é suave (salto de 13,5% do pico); o último quadro emenda no primeiro (0 cm) | sim |

**Conferência automática: 0 falha, 2 avisos**, os mesmos do stiff unilateral aprovado: (1) as linhas da ficha que são escolha de desenho; (2) de lado, os posteriores quase não aparecem (62 cm²) e o modo Músculos abre de três quartos, de trás (215 cm²; o aprovado: 218 e 64). O texto da regra do equilíbrio diz "corpo + halter" (o texto é comum aos stiffs, em `regras/stiffs.ts`); a conta inclui o kettlebell.

## As vistas

As do stiff unilateral aprovado: **de lado** (padrão: a dobra do quadril, a perna livre em linha e o kettlebell descendo junto à canela) e **de três quartos, de trás** (o quadril de frente para o chão, o erro de abrir o quadril e os posteriores). De lado, o kettlebell e o braço que o segura ficam do lado de lá da perna de apoio; o braço vazio, do lado de cá, pende na frente.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Arredondar as costas | de lado | a lombar dobra 24° e a torácica 6° além da curva de repouso, e a bacia inclina 12° menos que no certo (o mesmo desenho do aprovado) |
| Abrir o quadril | três quartos, de trás | a bacia gira 24° para o lado da perna livre: o quadril esquerdo sobe (o mesmo desenho do aprovado) |
| Dobrar o joelho de apoio | de lado | o joelho de apoio dobra 55° (no certo, 16°) e o tronco inclina só 42°: vira um agachamento numa perna; a perna livre fica dobrada atrás (o mesmo desenho do erro "Agachar" do aprovado) |

Nenhum erro ficou fora.

## O equipamento

O kettlebell da tabela de objetos (modelo de competição, medidas de fabricante; 12 kg), desenhado pelo gerador realista, como nos kettlebells aprovados. A parede para a mão livre ("se precisar", no cartão) não é desenhada: de lado ela ficaria entre quem olha e o corpo.

## Correções já feitas que esta animação respeita

- Glúteos em laranja (secundários) e "os dois stiffs ficam iguais" (revisão de anatomia, 02/11): os mesmos papéis do stiff unilateral aprovado.
- O kettlebell pende na vertical da mão.

## O que não ficou bom

- **De lado, o kettlebell fica atrás da perna de apoio e da mão vazia.** Ele aparece (a bola é maior que a canela), mas o braço que o segura fica quase todo escondido. Quem olha de relance pode achar que o kettlebell está na mão de perto. Na vista de três quartos, de trás, isso se lê melhor. Trocar o lado da perna de apoio deixaria o músculo principal do lado de lá na vista de lado (o motor usa a direita para o lado que trabalha).
- **No tema escuro, de três quartos, o kettlebell quase some** atrás da canela (só a borda clara e a alça aparecem).
- **Na regra "rente às pernas" a bola chega a −0,3 cm da pele** (dentro do tolerado, −0,5), no quadro em pé, na frente da coxa.
