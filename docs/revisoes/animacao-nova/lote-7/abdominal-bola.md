# Lote 7 · Abdominal na bola suíça (`abdominal-bola`)

De 15/11/2026. **Ainda não foi revisto pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/abdominal-bola.md`. Texto do app: `src/conteudo/exercicios/abdominal-bola.json` (só leitura). Animação de hoje: `src/engine/exercicios/abdominal-bola.ts` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abdominal-bola.json`.
- Animação: `src/engine/novo/exercicios/abdominal-bola.ts`, sobre o núcleo dos abdominais (`exercicios/abdominal.ts`: `bracosCruzados`, `pernasDobradas` e, novos, `regioesDasCostas` e `entraNaBola`) e a bola suíça pronta (`pecas-de-cena/bola-suica.ts`, sem mudança).
- Regras medidas novas: `src/engine/novo/regras/abdominais.ts` (`abdominal-bola-lombar-na-bola`, `abdominal-bola-escapulas-saem-da-bola`, `abdominal-bola-cabeca-nao-cai`); reaproveitada: `abdominal-maos-no-peito`.
- Folha ao lado da de hoje: `../prototipos/folha-abdominal-bola.png`. Quadros grandes: `../quadros/abdominal-bola.png`.

## Como a pose é montada

A bola de 65 cm fica parada no chão (centro em z = 0); a cabeça para −z. A bacia inclina 80° para trás e fica parada (`pelve` nos contatos): em z, onde o meio da lombar (L3) cai 15 cm à frente do centro da bola (para o lado dos pés); em y, onde a pele das costas, da lombar às escápulas, entra na bola o que ela amassa (1 cm). Embaixo, a torácica estende 10° além da curva de repouso e as costas acompanham a curva da bola, com a lombar e a parte de cima das costas encostadas nela; o pescoço fica 5° dobrado (a cabeça não cai para trás). Daí a coluna enrola: a torácica dobra 45° e a lombar 5°, o pescoço acompanha como no abdominal no chão, e as escápulas saem da bola. Os pés ficam no chão na largura do quadril, com a canela em pé (o joelho dobra 72° no homem e 62° na mulher). As mãos cruzadas no peito são as do abdominal no chão. A bola não rola nem muda de forma no desenho: "amassar" é a pele entrar 1 cm na esfera desenhada.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Bola sob a parte de baixo das costas; pés no chão na largura do quadril; joelhos dobrados; mãos cruzadas no peito | consenso | a pele da lombar entra na bola de −0,5 a 0,8 cm (encosta; no topo, 0,5 cm de folga); tornozelos na largura dos quadris, canela em pé, pés parados (0 cm); os punhos não andam em relação ao tórax | sim |
| Embaixo, as costas acompanham a curva da bola, sem deixar a cabeça cair | consenso | a pele das costas na altura das escápulas entra 1 cm na bola (encosta); a cabeça 5° dobrada sobre o alto do tórax além do que dobra em pé | sim |
| Enrola a parte de cima das costas; não precisa sentar | consenso | no topo, as escápulas ficam a 2,7 cm da bola e o tórax (T12 a C7) a 36,7° da horizontal (5° embaixo) | sim |
| Bola parada: quem mexe é o tronco | consenso | a bola anda 0 cm; nenhum ponto do corpo entra mais de 1,3 cm nela | sim |
| O pescoço acompanha o tronco | consenso | de 5° a 13° de flexão da cabeça sobre o alto do tórax | sim |
| ~1 s subindo, 1 s parado, ~2 s descendo | consenso | 1 s, 1 s, 2 s, com 0,5 s parado embaixo | sim |

Conferência automática (homem e mulher): **0 falha, 1 aviso** (os provisórios: a posição do corpo na bola, quanto ela amassa, os ângulos do tronco e as medidas das mãos, que a ficha não dá em número). Ponto mais baixo do corpo 0 cm; ritmo 5,3% (ok). O quadril fica em 8° de extensão no homem e 17,8° na mulher (o corpo quase deitado sobre a bola, as coxas descendo aos joelhos), dentro do normal.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Puxar o pescoço | a coluna enrola só 30% do certo (o tórax a 15° da horizontal e as escápulas encostadas na bola, a 0,1 cm) e a cabeça dobra 50° sobre o pescoço: o queixo vai ao peito |
| Rolar a bola | as pernas empurram: a bola rola 14 cm para o lado da cabeça (a costura gira com ela), a bacia vai junto, o joelho abre de 72° para 59°, e o tronco sobe 20° em bloco, sem enrolar, assentado de novo na bola |
| Subir até sentar | o quadril dobra 15° além do enrolar certo: o tórax vai a 57° da horizontal e a lombar sai da bola (3,1 cm de folga) |

## Correções já feitas que esta animação respeita

04/11: a bola tem raio de 32,5 cm (a de 65 cm da tabela de objetos; a correção de hoje fala em raio 28) e é desenhada parada; o oblíquo, no guia de hoje, entra como "só ajuda": aqui fica fora, porque a ficha da técnica diz "Primário: abdômen. Sem secundário (B.3.2)".

## Músculos e vistas

Só o abdômen, principal. Vistas: de lado (padrão de Técnica) e de três quartos de frente (`quina`), a padrão do modo Músculos pela medida (175 cm² contra 143 cm² de lado). De frente, a bola tapa o corpo; de cima, ele parece em pé.

## O que não ficou bom

- A bola não amassa no desenho: ela é a esfera da peça pronta e a pele das costas entra 1 cm nela. Achatar a bola no alto pediria mudar a peça (`bola-suica.ts`), que é de outro exercício.
- De lado, os antebraços tapam parte do reto do abdômen (como no abdominal no chão).
- No erro "Subir até sentar", o tronco para a 57° da horizontal: mais que isso, a cabeça subia tanto que o quadro abria e o corpo ficava pequeno em todas as vistas de lado (o nome do erro não cabia ao lado). O fio do nome do erro passa pela cabeça.
- O quadril fica um pouco estendido (8° no homem, 17,8° na mulher): é o corpo deitado sobre a bola com as coxas descendo aos joelhos. Com a bacia menos inclinada, as costas não encostavam na bola embaixo (a bola ficava só sob a lombar e o tórax no ar).
