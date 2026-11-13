# Viabilidade: como reproduzir o desenho escolhido por código, em qualquer pose

Análise, sem implementação. Vale para os dois desenhos de `decisao.md` (o cinza, padrão, e o de cor de pele, opção). O que está marcado **medido** foi medido nesta sessão, neste contêiner (Node 22, sem celular); o resto é análise minha (**opinião**) e precisa de teste.

## Como as pranchas foram feitas (e o que isso prova)

As pranchas desta sessão já saem de código, sem imagem gerada por modelo e sem desenho de terceiros:

- o **esqueleto de medidas reais** da sessão da animação nova (`src/engine/novo/esqueleto.ts`) dá a posição das articulações em cada pose (`scripts/boneco-desenho/poses.mjs` só lê);
- cada parte do corpo é uma **forma própria em 2D**, com um perfil desenhado à mão de cada lado (as tabelas de `scripts/boneco-desenho/boneco-prova.mjs`), presa às articulações (`figura.mjs` e `tinta.mjs`);
- os **grupos musculares** são formas presas à parte do corpo em que ficam (`musculos-prova.mjs`);
- a saída é **SVG em texto**, como no motor de hoje.

Isso prova que o desenho aprovado é reproduzível por regra, com a mesma entrada dando a mesma saída. **Não prova** que ele sai em qualquer vista: os perfis foram desenhados para duas vistas (de lado; e de frente e de costas só na pose em pé).

## O que o motor precisa cobrir

Vistas usadas pelas 90 animações de hoje (**medido**, contando `views:` em `src/engine/exercicios/`):

| Vista | Animações que a usam | Coberta pelas pranchas? |
|---|---|---|
| De lado | 86 | sim |
| De frente | 32 | só em pé |
| De cima | 16 | não |
| De trás | 14 | só em pé |
| "Zoom" | 4 | não |

Ou seja: só com as formas 2D por vista não dá. Um membro que aponta para quem olha (a coxa no agachamento visto de frente) encurta, e o perfil desenhado de lado não sabe encurtar.

## Os caminhos

| Caminho | Como é | Reproduz o desenho aprovado? | Qualquer vista? | Peso | Sem rede | Regressão por texto |
|---|---|---|---|---|---|---|
| **A. Formas 2D por vista** (o das pranchas) | um perfil desenhado à mão por parte e por vista | sim, exatamente | não: faltam de cima, de frente e de trás fora da pose em pé | o menor | sim | sim |
| **B. Formas próprias em 3D, com os perfis desenhados** | cada parte vira uma fileira de seções ovais: a largura vem do perfil de frente, a profundidade do perfil de lado; o contorno em cada vista é calculado | de lado e de frente, por construção (a conferir); nas outras vistas, o que a forma der | sim | pequeno (ver abaixo) | sim | sim |
| **C. Malha humana + pintor na placa de vídeo** | a malha do MakeHuman e o pintor em WebGL da sessão pausada | não: o traço de 1,25 px, as linhas dos grupos e o chapado pedem máscaras e texturas novas; e foi o caminho que ele achou "esquisito para absorver" | sim | cerca de 290 kB só de malha (número da sessão pausada) | sim | não: a placa de vídeo não garante o mesmo pixel entre aparelhos (`pesquisa/07`, sessão pausada) |

**Recomendação (opinião): o caminho B**, tendo as pranchas desta sessão como gabarito visual.

Por quê: a sessão pausada já tem o corpo em seções ovais (`src/engine/novo/corpo3d.ts`: cada anel tem meia-largura e raio para a frente e para trás) e um desenhista que calcula o contorno em qualquer vista e devolve SVG (`src/engine/novo/desenho.ts`). O "manequim de formas ovais" que o Gustavo recusou usava essa mesma técnica, mas com as seções saídas direto da tabela de medidas, sem desenho. A diferença agora é que há um desenho aprovado para as seções imitarem: o perfil de lado dá os raios da frente e de trás de cada anel, e o perfil de frente dá a meia-largura (a diferença entre o lado de dentro e o de fora vira um pequeno deslocamento do centro do anel). Não é preciso malha nem placa de vídeo.

O caminho A continua útil como **gabarito**: o motor do caminho B deve ser comparado com as pranchas finais, de lado e de frente, antes de qualquer outra coisa.

## O que foi medido

Tamanho do SVG de um quadro no tamanho de palco, com o músculo (**medido**; `final/medidas.json`):

| Quadro | Hoje | Cinza novo | Cor de pele novo |
|---|---|---|---|
| Agachamento de lado | 14,2 kB (2,2 kB comprimido), 54 formas, 1 recorte | 16,0 kB (3,8 kB), 38 caminhos, 1 recorte | 22,0 kB (4,3 kB), 53 caminhos, 7 recortes |
| Supino de lado | 16,5 kB (2,6 kB), 58 formas, 1 recorte | 16,1 kB (3,7 kB), 38 caminhos, 1 recorte | 20,2 kB (4,2 kB), 48 caminhos, 7 recortes |
| Cabo de lado | 15,9 kB (3,0 kB), 61 formas, 1 recorte | 18,7 kB (4,3 kB), 47 caminhos, 1 recorte | 22,8 kB (4,7 kB), 57 caminhos, 7 recortes |
| Em pé de frente | 16,1 kB (2,7 kB), 54 formas, 2 recortes | 26,9 kB (4,9 kB), 69 caminhos, nenhum recorte | 29,4 kB (5,2 kB), 73 caminhos, 2 recortes |

- **Tempo para gerar o texto de um quadro**, em Node, neste contêiner: de 0,5 a 1,2 ms (**medido**, média de 200 quadros). Não é medida de celular e não inclui o navegador desenhar o SVG.
- **Código de desenho desta sessão**, empacotado: 28 kB minificado, 11 kB comprimido (**medido**; `figura.mjs`, `tinta.mjs`, `musculos-prova.mjs` e as tabelas). É um teto: o motor final reaproveita as tabelas de perfil e de músculo e as regras de pintura, não este código.
- **Miniatura:** o quadro do agachamento cai para 11,9 kB (cinza) e 17,6 kB (cor de pele), porque somem as linhas do corpo (**medido**).

Leitura: o quadro novo tem de 0% a 80% mais texto que o de hoje, conforme a pose. Vem de duas coisas: as linhas dos grupos musculares (muitos caminhos pequenos) e o truque do contorno único, que escreve cada forma duas vezes (uma para o traço, outra para o preenchimento). A segunda tem conserto conhecido: definir a forma uma vez e referenciá-la duas (**opinião**, não testado).

## O que funciona sem rede

Tudo: são regras e tabelas no próprio pacote do app, sem imagem, sem fonte externa, sem malha e sem biblioteca nova. O desenho continua sendo texto, então pode continuar saindo do Worker do Boneco, como hoje.

## Riscos

1. **Os músculos em 3D.** Hoje cada grupo muscular é um desenho plano, um para a vista de lado e outro para a de frente ou de costas. No caminho B eles precisam virar regiões na superfície de cada parte (posição ao longo do osso e ângulo em volta dele), para aparecerem certos em qualquer vista e sumirem quando ficam do lado de longe. É o maior trabalho novo, e o resultado precisa bater com as pranchas.
2. **Recortes no SVG.** O desenho de cor de pele usa 7 recortes por quadro (o músculo por baixo do short e as linhas do corpo que não podem aparecer sobre ele). A pesquisa da sessão pausada registrou que recorte que referencia outro elemento do SVG é caro no Safari (`docs/revisoes/animacao-nova/pesquisa/07-tecnica-de-desenho.md`, só resumo de busca). No caminho B dá para trocar o recorte por geometria: a barra do short é um corte reto na coxa.
3. **Traço fixo em pixels.** 1,25 px no palco e 0,8 px nas linhas de dentro pedem que o traço não cresça com o zoom da câmera. Em tela de densidade 1 (celular simples), 0,8 px vira borrão: talvez as linhas do corpo devam sumir abaixo de certo tamanho da figura, como na miniatura.
4. **Vistas nunca desenhadas.** De cima e de frente fora da pose em pé não têm gabarito: o Gustavo ainda não viu o desenho nessas vistas.
5. **Reaprovação.** O corpo é um só para as 90 animações: todas mudam, as linhas de base da regressão visual mudam, e a regra do projeto é não regravar linha de base só para o teste passar.
6. **Dois desenhos.** O cinza e o de cor de pele diferem na geometria (short, tênis, cabelo), não só na cor: a regressão precisa cobrir os dois, nos dois temas.
7. **Contraste.** Os pontos fracos medidos estão em `decisao.md` (o músculo secundário na cor de pele; o short claro no tema escuro).
8. **Fora do desenho.** Rótulos, linhas-guia, modo Erros e modo Trajetória não foram redesenhados para a figura nova.

## O que precisa ser testado, nesta ordem

1. Montar as seções ovais a partir dos perfis desenhados e comparar com as pranchas finais, de lado e de frente, sobrepondo as imagens. Se não bater, o caminho B não reproduz o desenho aprovado.
2. Mostrar ao Gustavo as vistas que ele ainda não viu (de cima; agachamento de frente; puxada de trás), antes de animar.
3. Redesenhar os grupos musculares como regiões da superfície e conferir contra as pranchas.
4. Medir num celular simples: quadros por segundo com cerca de 50 a 70 caminhos por quadro, com e sem os recortes, no Safari do iPhone e no Chrome do Android.
5. Conferir o traço de 1,25 px e as linhas de 0,8 px em tela de densidade 1 e de densidade 3, nos dois temas.
6. Fechar os itens em aberto de `decisao.md` com o Gustavo (contraste do secundário, tom de pele, segunda pessoa, junta-chave, Silhueta).
