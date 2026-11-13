# Diagnóstico do que existe hoje: animações, corpo, músculos e equipamento

## 1. Abertura

Este documento junta o que já foi medido sobre o Boneco de hoje. O único número medido depois da consolidação é a tabela dos ossos da seção 2. As 90 animações aprovadas foram medidas quadro a quadro, a 60 quadros por segundo, pelo script `scripts/animacao-nova/medir-hoje.mjs` (os dados de uso vêm do teste de estresse com 149.760 programas fictícios; não há dado de pessoa real). Resultado geral: 42 das 90 não têm nenhum alerta e 48 têm pelo menos um. 38 têm **tranco de velocidade** (a velocidade de um ponto muda de repente entre dois quadros seguidos; a razão salto/pico passa de 0,3), 64 passam de 0,15; 15 têm contato que desliza (mão, pé ou joelho que devia ficar parado e anda de 0,5 a 4 cm); 7 têm parte do corpo atravessando o chão; 6 têm fita de suspensão que muda mais de 1 cm de comprimento (as 6 que usam fita); 1 passa do máximo observado de alguma amplitude e 43 passam da média. O motor não falhou em nenhuma conta de articulação (IK com falha: 0) e nenhum ciclo deixou de fechar.

Fontes deste documento: `diagnostico/medidas-de-hoje.md` e `.json`, `diagnostico/objetos-de-hoje.md`, `diagnostico/folhas-de-hoje.md`, `correcoes-ja-feitas.md`, `pesquisa/01-proporcoes-do-corpo.md`, `pesquisa/03-musculos-e-ossos.md` e `src/engine/novo/dados/corpo-homem.json`.

## 2. O corpo de hoje contra as tabelas

Os ossos do boneco de hoje foram medidos direto no motor do app (em pé, no primeiro quadro da elevação lateral; distância entre os centros das juntas) e comparados com a tabela nova (`src/engine/novo/dados/corpo-homem.json`, ANSUR II, homem de 175,8 cm):

| Parte | Hoje (cm) | Tabela nova (cm) | Diferença (cm) |
|---|---|---|---|
| braço (ombro ao cotovelo) | 31 | 30,5 (`braco.comp`, medida) | +0,5 |
| antebraço (cotovelo ao punho) | 25 | 26,8 (`antebraco.comp`, medida) | −1,8 |
| coxa (quadril ao joelho) | 43 | 41,3 (`coxa.comp`, derivada) | +1,7 |
| perna (joelho ao tornozelo) | 43 | 42,1 (`perna.comp`, derivada) | +0,9 |
| distância entre os ombros (centros) | 38 | 36,8 (`ombro.meiaDistancia` × 2, derivada) | +1,2 |
| distância entre os quadris (centros) | 18 | 17,4 (`quadril.meiaDistancia` × 2, provisória) | +0,6 |
| altura do quadril | 93 | 90,6 (`altura.trocanter`, medida) | +2,4 |
| pé (do calcanhar à ponta) | 22,1 | 26,9 (`pe.comp`, medida) | −4,8 |

Leitura: os ossos longos de hoje estão a menos de 2 cm da média medida, com a perna um pouco comprida e o antebraço um pouco curto. O pé de hoje é quase 5 cm mais curto que o medido (os pontos "calcanhar" e "ponta" do motor de hoje podem não ser as extremidades do pé; a diferença vale como ordem de grandeza). A altura do ombro e a da cabeça não foram comparadas, porque o motor de hoje guarda o centro da junta e a tabela guarda pontos da pele (acrômio, topo da cabeça). As larguras do corpo de hoje (raio de cada cápsula) não foram comparadas uma a uma: o corpo de hoje é feito de cápsulas de raio fixo, e o novo tem perfil que muda ao longo de cada parte.

`medidas-de-hoje.md` e `medidas-de-hoje.json` não trazem essas medidas; trazem ângulos de articulação, posições de pontos, velocidades, contatos, cabos e fitas.

O que os arquivos dizem do corpo de hoje, sem número de segmento:

- Alcance: a roda abdominal tem alcance limitado "pelos braços do boneco (57 cm)" (`correcoes-ja-feitas.md`, seção 4).
- Forma: a mão é uma luva sem dedos (o polegar não aparece); o acabamento A2 tem tronco num só desenho, pelve que cobre o começo da coxa, membros que afinam e ombros arredondados (decisão de 04/11).
- Pose deitada de lado: o motor mantém a pelve nivelada e os dois quadris caem no mesmo ponto na vista de lado.
- O motor mede o ombro só como o ângulo entre o braço e o tronco; não há modelo de pé separado do tornozelo; não há torção de antebraço nem rotação de quadril (`medidas-de-hoje.md`, "O que o motor não permite medir").
- Faixas de amplitude usadas como régua nas medidas (média e máximo observados): joelho 140 e 164 graus, cotovelo 148 e 166, quadril 132 e 159, ombro 170 e 192, dorsiflexão 15 e 48, flexão plantar 57 e 90, punho 70 (média).

A tabela nova, que serve de régua, é `src/engine/novo/dados/corpo-homem.json`: 91 medidas de um homem de estatura 175,8 cm (ANSUR II, IMC de 18,5 a 24,9, n = 1061). Por fonte: 50 medidas diretas e 14 derivadas do ANSUR II, 7 de Ludewig 2009 (ombro), 3 de Gray 1918, 1 da NASA RP-1024, 2 de Drillis e Contini (via fonte secundária) e 1 derivada de ANSUR com NASA. **13 estão marcadas como provisórias ("a-conferir", sem fonte lida ainda).** Larguras da tabela nova: biacromial 40,8 cm, bideltoide 47,8, peito 27,6, cintura 29, quadril 32,4. Em `pesquisa/01-proporcoes-do-corpo.md` ficaram sem conferir, entre outras: as tabelas originais de Drillis e Contini e de Winter, de Leva 1996 (tabelas de massa e centro de massa), a distância entre os dois centros do quadril, o centro da articulação do ombro, falanges e polegar. Para fechar a comparação seria preciso medir o corpo do boneco de hoje (`src/engine/estilo/corpo.ts`), o que este diagnóstico não fez.

## 3. Os músculos de hoje contra o atlas

**Também não há comparação medida entre os músculos desenhados hoje e o atlas novo.** O que os arquivos dizem:

- Base nova (`pesquisa/03-musculos-e-ossos.md`): origem, inserção, ação, camada e forma de 39 músculos ou partes (Gray 1918, domínio público); coordenadas de glúteos, quadríceps, posteriores, adutores, panturrilha, tibial anterior, eretores, oblíquos, tríceps, bíceps e braquial (modelos Gait2392, Rajagopal 2016 e Arm26). **Não há coordenadas** de peitoral maior, deltoide, grande dorsal, redondo maior, trapézio, romboides, serrátil anterior nem infraespinal: essas posições vêm só dos textos. Sobre como o músculo muda de forma ao contrair, só há medida para o tibial anterior e o gastrocnêmio medial.
- Sobra no desenho de hoje: o desenho mostra músculos que o gerador não conta (trapézio superior, antebraço, lombar, oblíquos, abdômen, panturrilha, frente do ombro); desde 03/11 eles aparecem listrados de laranja ("só ajuda a firmar"). 15 animações tinham laranja que só ajuda; em 9 todo o laranja era assim.
- Falta ou fica pequeno: os adutores na vista de frente do afundo e do búlgaro têm 30 e 14 px², contra 430 px² da perna de trás (o quadríceps principal tem 36 e 17 px²); de trás o bíceps não aparece; romboides e trapézios ficam por cima das escápulas e escondidos de lado; no face pull os músculos principais quase não aparecem (0,02% do palco de lado, 0% de cima); o desenho não separa glúteo médio e máximo.
- Divergência registrada: o roteiro do especialista descreve só "principal em vermelho e secundários em laranja" e não cita as listras, decididas depois. A rodada com o especialista humano não aconteceu.
- Formas de hoje com decisão registrada: 02/11 revisão de anatomia (13 achados; 11 entram), 04/11 forma dos adutores criada para a adução, abdução com glúteo em vermelho, extensão com quadríceps em vermelho.

## 4. Cada animação aprovada

Lido assim: `salto` é a razão salto/pico de velocidade (acima de 0,3 é tranco; ponto e fase onde ocorre); `deslize` é quanto um contato que devia ficar parado anda, em cm; `chão` é a menor altura de um ponto que passou de −0,5 cm (atravessa o chão); `fita` é a faixa de comprimento em cm e a variação Δ; `acima da média` lista amplitudes que passam da média normal (`!!` quando passam do máximo observado). A régua de amplitude é CDC (Soucie 2011) e AAOS no punho. "Folha de hoje" é o caminho em `folhas-de-hoje.md`: 31 estão em `diagnostico/folhas-hoje/` e 59 já existiam em outras pastas de revisão. Todas as 90 têm folha.

| exercício (id) | o que a ficha pede | o que o boneco faz (medido) | problemas | folha de hoje |
| --- | --- | --- | --- | --- |
| supino-inclinado | ver ficha em src/conteudo/exercicios/supino-inclinado.json | salto 0,16 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/supino-inclinado.png |
| barra-fixa | ver ficha em src/conteudo/exercicios/barra-fixa.json | salto 0,97 (E_R, Descida · excêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/barra-fixa.png |
| remada-baixa | ver ficha em src/conteudo/exercicios/remada-baixa.json | salto 0,52 (Hc, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/remada-baixa.png |
| crucifixo-polia | ver ficha em src/conteudo/exercicios/crucifixo-polia.json | salto 0,12 (E_R, Fechamento · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | assimétrico (39,8 cm entre esquerdo e espelho do direito) | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/crucifixo-polia.png |
| elevacao-lateral | ver ficha em src/conteudo/exercicios/elevacao-lateral.json | salto 0,29 (G_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/elevacao-lateral.png |
| face-pull | ver ficha em src/conteudo/exercicios/face-pull.json | salto 0,08 (G_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/face-pull.png |
| abdominal-polia | ver ficha em src/conteudo/exercicios/abdominal-polia.json | salto 0,07 (N, Enrolar · concêntrica) · sem deslize · não atravessa o chão · acima da média: flexão plantar 75,3° (média 57°) | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/abdominal-polia.png |
| goblet | ver ficha em src/conteudo/exercicios/goblet.json | salto 0,24 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/goblet.png |
| stiff | ver ficha em src/conteudo/exercicios/stiff.json | salto 0,63 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/stiff.png |
| afundo | ver ficha em src/conteudo/exercicios/afundo.json | salto 0,18 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 47,9° (média 15°) | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/afundo.png |
| panturrilha | ver ficha em src/conteudo/exercicios/panturrilha.json | salto 0,85 (E_L, Subida · concêntrica) · deslize toe_R 1,0 cm · não atravessa o chão · acima da média: dorsiflexão 32° (média 15°) | contato desliza, tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/panturrilha.png |
| rosca-polia | ver ficha em src/conteudo/exercicios/rosca-polia.json | salto 0,05 (G_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/rosca-polia.png |
| triceps-corda | ver ficha em src/conteudo/exercicios/triceps-corda.json | salto 0,10 (G_R, Extensão · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/triceps-corda.png |
| supino-reto | ver ficha em src/conteudo/exercicios/supino-reto.json | salto 0,25 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/supino-reto.png |
| remada-apoiada | ver ficha em src/conteudo/exercicios/remada-apoiada.json | salto 0,19 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 33,1° (média 15°) | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/remada-apoiada.png |
| desenvolvimento | ver ficha em src/conteudo/exercicios/desenvolvimento.json | salto 0,14 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/desenvolvimento.png |
| puxada-unilateral | ver ficha em src/conteudo/exercicios/puxada-unilateral.json | salto 0,18 (G_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 154,1° (média 148°); flexão plantar 75,5° (média 57°) | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/puxada-unilateral.png |
| flexao | ver ficha em src/conteudo/exercicios/flexao.json | salto 0,85 (K_R, Subida · concêntrica) · deslize G_R 3,1, G_L 3,1 cm · não atravessa o chão · acima da média: dorsiflexão 46,8° (média 15°); punho 80° (média 70°) | contato desliza, tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/flexao.png |
| elevacao-halteres | ver ficha em src/conteudo/exercicios/elevacao-halteres.json | salto 0,20 (G_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/elevacao-halteres.png |
| elevacao-joelhos | ver ficha em src/conteudo/exercicios/elevacao-joelhos.json | salto 0,24 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/elevacao-joelhos.png |
| bulgaro | ver ficha em src/conteudo/exercicios/bulgaro.json | salto 0,11 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/bulgaro.png |
| flexao-bola | ver ficha em src/conteudo/exercicios/flexao-bola.json | salto 0,35 (N, Puxada · concêntrica) · deslize G_R 1,7, G_L 1,7 cm · não atravessa o chão · acima da média: dorsiflexão 24,1° (média 15°) | contato desliza, tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/flexao-bola.png |
| panturrilha-b | ver ficha em src/conteudo/exercicios/panturrilha-b.json | salto 0,84 (E_L, Subida · concêntrica) · deslize toe_R 1,0, toe_L 1,0 cm · não atravessa o chão · acima da média: dorsiflexão 31,9° (média 15°) | contato desliza, tranco, assimétrico (80,3 cm) | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/panturrilha-b.png |
| rosca-inclinada | ver ficha em src/conteudo/exercicios/rosca-inclinada.json | salto 0,36 (G_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/rosca-inclinada.png |
| triceps-frances | ver ficha em src/conteudo/exercicios/triceps-frances.json | salto 0,34 (G_R, Extensão · concêntrica) · sem deslize · chão: toe_L -2,02 cm · acima da média: ombro 172,7° (média 170°) | atravessa o chão, tranco, assimétrico (68,1 cm) | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/triceps-frances.png |
| remada-unilateral | ver ficha em src/conteudo/exercicios/remada-unilateral.json | salto 0,09 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · acima da média: flexão plantar 75,3° (média 57°) | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/remada-unilateral.png |
| panturrilha-chao | ver ficha em src/conteudo/exercicios/panturrilha-chao.json | salto 0,05 (P, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/panturrilha-chao.png |
| abdominal-chao | ver ficha em src/conteudo/exercicios/abdominal-chao.json | salto 0,08 (Hc, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/abdominal-chao.png |
| rosca-alternada | ver ficha em src/conteudo/exercicios/rosca-alternada.json | salto 0,50 (E_R, Direito sobe · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco, assimétrico (62,4 cm) | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/rosca-alternada.png |
| triceps-frances-halter | ver ficha em src/conteudo/exercicios/triceps-frances-halter.json | salto 0,15 (G_R, Extensão · concêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 154,3° (média 148°) | nenhum | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/triceps-frances-halter.png |
| stiff-unilateral | ver ficha em src/conteudo/exercicios/stiff-unilateral.json | salto 0,18 (P, Subida · concêntrica) · sem deslize · chão: toe_R -7,72 cm · acima da média: flexão plantar 71,3° (média 57°) | atravessa o chão | docs/revisoes/animacao-nova/diagnostico/folhas-hoje/stiff-unilateral.png |
| agachamento-peso-corpo | ver ficha em src/conteudo/exercicios/agachamento-peso-corpo.json | salto 0,28 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: quadril 134,1° (média 132°); dorsiflexão 23,2° (média 15°) | nenhum | docs/revisoes/equipamento-minimo/folhas/agachamento-peso-corpo.png |
| afundo-peso-corpo | ver ficha em src/conteudo/exercicios/afundo-peso-corpo.json | salto 0,18 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 47,9° (média 15°) | nenhum | docs/revisoes/equipamento-minimo/folhas/afundo-peso-corpo.png |
| bulgaro-peso-corpo | ver ficha em src/conteudo/exercicios/bulgaro-peso-corpo.json | salto 0,11 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/equipamento-minimo/folhas/bulgaro-peso-corpo.png |
| barra-fixa-supinada | ver ficha em src/conteudo/exercicios/barra-fixa-supinada.json | salto 0,99 (E_R, Descida · excêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 152,9° (média 148°); ombro 172,1° (média 170°) | tranco | docs/revisoes/equipamento-minimo/folhas/barra-fixa-supinada.png |
| ponte-gluteo | ver ficha em src/conteudo/exercicios/ponte-gluteo.json | salto 0,22 (K_R, Subida · concêntrica) · deslize G_R 1,3, G_L 1,3 cm · não atravessa o chão · amplitudes na faixa | contato desliza | docs/revisoes/equipamento-minimo/folhas/ponte-gluteo.png |
| flexao-fechada | ver ficha em src/conteudo/exercicios/flexao-fechada.json | salto 0,82 (K_R, Subida · concêntrica) · deslize G_R 3,0, G_L 3,0 cm · não atravessa o chão · acima da média: dorsiflexão 46,6° (média 15°); punho 80° (média 70°) | contato desliza, tranco | docs/revisoes/equipamento-minimo/folhas/flexao-fechada.png |
| pike | ver ficha em src/conteudo/exercicios/pike.json | salto 0,41 (K_R, Subida · concêntrica) · deslize G_R 1,9, G_L 1,9 cm · não atravessa o chão · acima da média: dorsiflexão 23,8° (média 15°); punho 80° (média 70°) | contato desliza, tranco | docs/revisoes/equipamento-minimo/folhas/pike.png |
| flexao-joelho-deslizante | ver ficha em src/conteudo/exercicios/flexao-joelho-deslizante.json | salto 0,21 (P, Puxada · concêntrica) · deslize G_R 1,8, G_L 1,8 cm · não atravessa o chão · acima da média: dorsiflexão 46,2° (média 15°) | contato desliza | docs/revisoes/equipamento-minimo/folhas/flexao-joelho-deslizante.png |
| nordico | ver ficha em src/conteudo/exercicios/nordico.json | salto 0,71 (K_R, Volta · concêntrica) · deslize K_R 0,7, K_L 0,7 cm · não atravessa o chão · acima da média: flexão plantar 73,8° (média 57°) | contato desliza, tranco | docs/revisoes/equipamento-minimo/folhas/nordico.png |
| remada-unilateral-sem-banco | ver ficha em src/conteudo/exercicios/remada-unilateral-sem-banco.json | salto 0,30 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/remada-unilateral-sem-banco.png |
| rosca-martelo | ver ficha em src/conteudo/exercicios/rosca-martelo.json | salto 0,50 (E_R, Direito sobe · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco, assimétrico (62,4 cm) | docs/revisoes/catalogo/folhas/rosca-martelo.png |
| triceps-frances-polia-unilateral | ver ficha em src/conteudo/exercicios/triceps-frances-polia-unilateral.json | salto 0,35 (G_R, Extensão · concêntrica) · sem deslize · chão: toe_R -5,02 cm · acima da média: ombro 173,6° (média 170°) | atravessa o chão, tranco | docs/revisoes/catalogo/folhas/triceps-frances-polia-unilateral.png |
| remada-unilateral-polia | ver ficha em src/conteudo/exercicios/remada-unilateral-polia.json | salto 0,14 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/remada-unilateral-polia.png |
| crucifixo-invertido-polia | ver ficha em src/conteudo/exercicios/crucifixo-invertido-polia.json | salto 0,05 (G_R, Abertura · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | assimétrico (26,0 cm) | docs/revisoes/catalogo/folhas/crucifixo-invertido-polia.png |
| remada-unilateral-kettlebell | ver ficha em src/conteudo/exercicios/remada-unilateral-kettlebell.json | salto 0,30 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/remada-unilateral-kettlebell.png |
| stiff-kettlebell | ver ficha em src/conteudo/exercicios/stiff-kettlebell.json | salto 0,63 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/catalogo/folhas/stiff-kettlebell.png |
| rosca-kettlebell | ver ficha em src/conteudo/exercicios/rosca-kettlebell.json | salto 0,50 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/catalogo/folhas/rosca-kettlebell.png |
| triceps-frances-kettlebell | ver ficha em src/conteudo/exercicios/triceps-frances-kettlebell.json | salto 0,15 (G_R, Extensão · concêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 154,3° (média 148°) | nenhum | docs/revisoes/catalogo/folhas/triceps-frances-kettlebell.png |
| afundo-kettlebell | ver ficha em src/conteudo/exercicios/afundo-kettlebell.json | salto 0,18 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 47,9° (média 15°) | nenhum | docs/revisoes/catalogo/folhas/afundo-kettlebell.png |
| desenvolvimento-unilateral-kettlebell | ver ficha em src/conteudo/exercicios/desenvolvimento-unilateral-kettlebell.json | salto 0,27 (G_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 150,1° (média 148°); ombro 174° (média 170°) | nenhum | docs/revisoes/catalogo/folhas/desenvolvimento-unilateral-kettlebell.png |
| ponte-kettlebell | ver ficha em src/conteudo/exercicios/ponte-kettlebell.json | salto 0,22 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/ponte-kettlebell.png |
| remada-suspensao | ver ficha em src/conteudo/exercicios/remada-suspensao.json | salto 0,78 (K_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · fita 83,5 a 86,1 (Δ2,6) cm · acima da média: flexão plantar 60,3° (média 57°) | tranco, fita muda | docs/revisoes/catalogo/folhas/remada-suspensao.png |
| rosca-suspensao | ver ficha em src/conteudo/exercicios/rosca-suspensao.json | salto 0,53 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · fita 84,2 a 86 (Δ1,8) cm · acima da média: flexão plantar 60,3° (média 57°) | tranco, fita muda | docs/revisoes/catalogo/folhas/rosca-suspensao.png |
| yt-suspensao | ver ficha em src/conteudo/exercicios/yt-suspensao.json | salto 0,88 (K_R, Abertura em T · concêntrica) · sem deslize · não atravessa o chão · fita 107,1 a 111,2 (Δ4,1) cm · acima da média: flexão plantar 65° (média 57°) | tranco, fita muda | docs/revisoes/catalogo/folhas/yt-suspensao.png |
| triceps-suspensao | ver ficha em src/conteudo/exercicios/triceps-suspensao.json | salto 0,51 (G_R, Extensão · concêntrica) · sem deslize · não atravessa o chão · fita 102,8 a 104,7 (Δ1,9) cm · acima da média: ombro 178,4° (média 170°) | tranco, fita muda | docs/revisoes/catalogo/folhas/triceps-suspensao.png |
| flexao-joelho-suspensao | ver ficha em src/conteudo/exercicios/flexao-joelho-suspensao.json | salto 0,62 (G_R, Puxada · concêntrica) · deslize G_R 2,8, G_L 2,8 cm · não atravessa o chão · fita 180,6 a 182,1 (Δ1,6) cm · acima da média: dorsiflexão 33,6° (média 15°) | contato desliza, tranco, fita muda | docs/revisoes/catalogo/folhas/flexao-joelho-suspensao.png |
| bulgaro-suspensao | ver ficha em src/conteudo/exercicios/bulgaro-suspensao.json | salto 0,11 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · fita 178,4 a 180,8 (Δ2,4) cm · acima da média: flexão plantar 57,3° (média 57°) | fita muda | docs/revisoes/catalogo/folhas/bulgaro-suspensao.png |
| abdominal-bola | ver ficha em src/conteudo/exercicios/abdominal-bola.json | salto 0,08 (Hc, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/abdominal-bola.png |
| ponte-pes-bola | ver ficha em src/conteudo/exercicios/ponte-pes-bola.json | salto 0,08 (Hc, Subida · concêntrica) · deslize G_R 1,9, G_L 1,9 cm · não atravessa o chão · amplitudes na faixa | contato desliza | docs/revisoes/catalogo/folhas/ponte-pes-bola.png |
| elevacao-joelhos-paralelas | ver ficha em src/conteudo/exercicios/elevacao-joelhos-paralelas.json | salto 0,22 (P, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/elevacao-joelhos-paralelas.png |
| extensao-joelho-caneleira | ver ficha em src/conteudo/exercicios/extensao-joelho-caneleira.json | salto: sem ponto com pico acima de 5 cm/s · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/extensao-joelho-caneleira.png |
| abducao-caneleira | ver ficha em src/conteudo/exercicios/abducao-caneleira.json | salto 0,28 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 31,1° (média 15°) | nenhum | docs/revisoes/catalogo/folhas/abducao-caneleira.png |
| aducao-caneleira | ver ficha em src/conteudo/exercicios/aducao-caneleira.json | salto 0,43 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: ombro 178° (média 170°) | tranco | docs/revisoes/catalogo/folhas/aducao-caneleira.png |
| abducao-mini-band | ver ficha em src/conteudo/exercicios/abducao-mini-band.json | salto 0,08 (K_R, Abertura · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/abducao-mini-band.png |
| roda-abdominal | ver ficha em src/conteudo/exercicios/roda-abdominal.json | salto 0,49 (K_R, Volta · concêntrica) · deslize K_R 2,1, K_L 2,1 cm · não atravessa o chão · acima da média: flexão plantar 73,7° (média 57°) | contato desliza, tranco | docs/revisoes/catalogo/folhas/roda-abdominal.png |
| flexao-joelho-elastico | ver ficha em src/conteudo/exercicios/flexao-joelho-elastico.json | salto 0,57 (K_R, Flexão · concêntrica) · sem deslize · chão: toe_R -2,02, toe_L -2,02 cm · amplitudes na faixa | atravessa o chão, tranco | docs/revisoes/elastico/folhas/flexao-joelho-elastico.png |
| rosca-elastico | ver ficha em src/conteudo/exercicios/rosca-elastico.json | salto 0,50 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/elastico/folhas/rosca-elastico.png |
| elevacao-lateral-elastico | ver ficha em src/conteudo/exercicios/elevacao-lateral-elastico.json | salto 0,20 (G_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/elastico/folhas/elevacao-lateral-elastico.png |
| crucifixo-elastico | ver ficha em src/conteudo/exercicios/crucifixo-elastico.json | salto 0,12 (E_R, Fechamento · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | assimétrico (39,8 cm) | docs/revisoes/elastico/folhas/crucifixo-elastico.png |
| stiff-elastico | ver ficha em src/conteudo/exercicios/stiff-elastico.json | salto 0,63 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/elastico/folhas/stiff-elastico.png |
| remada-elastico | ver ficha em src/conteudo/exercicios/remada-elastico.json | salto 0,52 (Hc, Puxada · concêntrica) · sem deslize · chão: heel_R -2,64, heel_L -2,64 cm · amplitudes na faixa | atravessa o chão, tranco | docs/revisoes/elastico/folhas/remada-elastico.png |
| face-pull-elastico | ver ficha em src/conteudo/exercicios/face-pull-elastico.json | salto 0,08 (G_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/elastico/folhas/face-pull-elastico.png |
| puxada-elastico | ver ficha em src/conteudo/exercicios/puxada-elastico.json | salto 0,69 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 153,8° (média 148°); flexão plantar 75,5° (média 57°) | tranco | docs/revisoes/elastico/folhas/puxada-elastico.png |
| triceps-elastico-acima | ver ficha em src/conteudo/exercicios/triceps-elastico-acima.json | salto 0,40 (G_R, Extensão · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco, assimétrico (50,0 cm) | docs/revisoes/elastico/folhas/triceps-elastico-acima.png |
| desenvolvimento-elastico | ver ficha em src/conteudo/exercicios/desenvolvimento-elastico.json | salto 0,14 (E_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: ombro 170,5° (média 170°) | nenhum | docs/revisoes/elastico/folhas/desenvolvimento-elastico.png |
| agachamento-elastico | ver ficha em src/conteudo/exercicios/agachamento-elastico.json | salto 0,28 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: cotovelo 152,2° (média 148°); quadril 134,1° (média 132°); dorsiflexão 23,2° (média 15°) | nenhum | docs/revisoes/elastico/folhas/agachamento-elastico.png |
| flexao-elastico | ver ficha em src/conteudo/exercicios/flexao-elastico.json | salto 0,85 (K_R, Subida · concêntrica) · deslize G_R 3,1, G_L 3,1 cm · não atravessa o chão · acima da média: dorsiflexão 46,8° (média 15°); punho 80° (média 70°) | contato desliza, tranco | docs/revisoes/elastico/folhas/flexao-elastico.png |
| abducao-deitado | ver ficha em src/conteudo/exercicios/abducao-deitado.json | salto 0,28 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 31,1° (média 15°) | nenhum | docs/revisoes/catalogo/folhas/abducao-deitado.png |
| aducao-deitado | ver ficha em src/conteudo/exercicios/aducao-deitado.json | salto 0,43 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: ombro 178° (média 170°) | tranco | docs/revisoes/catalogo/folhas/aducao-deitado.png |
| extensao-joelho-elastico | ver ficha em src/conteudo/exercicios/extensao-joelho-elastico.json | salto: sem ponto com pico acima de 5 cm/s · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/catalogo/folhas/extensao-joelho-elastico.png |
| panturrilha-sentada-halter | ver ficha em src/conteudo/exercicios/panturrilha-sentada-halter.json | salto 0,16 (E_R, Subida · concêntrica) · deslize toe_R 1,2, toe_L 1,2 cm · chão: heel_R -1,55, heel_L -1,55 cm · acima da média: dorsiflexão 15,8° (média 15°) | contato desliza, atravessa o chão | docs/revisoes/catalogo/folhas/panturrilha-sentada-halter.png |
| panturrilha-degrau | ver ficha em src/conteudo/exercicios/panturrilha-degrau.json | salto 0,68 (E_L, Subida · concêntrica) · deslize toe_R 1,0, toe_L 1,0 cm · não atravessa o chão · acima da média: dorsiflexão 31,9° (média 15°) | contato desliza, tranco, assimétrico (69,0 cm) | docs/revisoes/r5-anim/folhas/panturrilha-degrau.png |
| abdominal-invertido | ver ficha em src/conteudo/exercicios/abdominal-invertido.json | salto 0,56 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | tranco | docs/revisoes/r5-anim/folhas/abdominal-invertido.png |
| extensao-triceps-peso-corpo | ver ficha em src/conteudo/exercicios/extensao-triceps-peso-corpo.json | salto 0,89 (K_R, Volta · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 25° (média 15°) | tranco | docs/revisoes/r5-anim/folhas/extensao-triceps-peso-corpo.png |
| abertura-t-deitado | ver ficha em src/conteudo/exercicios/abertura-t-deitado.json | salto 0,05 (G_R, Subida · concêntrica) · sem deslize · chão: toe_R -2,02, toe_L -2,02 cm · amplitudes na faixa | atravessa o chão | docs/revisoes/r5-anim/folhas/abertura-t-deitado.png |
| flexao-pes-elevados | ver ficha em src/conteudo/exercicios/flexao-pes-elevados.json | salto 0,84 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 64,9° (máx. 48°) !!; punho 80° (média 70°) | tranco, amplitude acima do máximo (dorsiflexão) | docs/revisoes/r5-anim/folhas/flexao-pes-elevados.png |
| ponte-gluteo-halter | ver ficha em src/conteudo/exercicios/ponte-gluteo-halter.json | salto 0,22 (K_R, Subida · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/r5-anim/folhas/ponte-gluteo-halter.png |
| remada-curvada-halteres | ver ficha em src/conteudo/exercicios/remada-curvada-halteres.json | salto 0,07 (E_R, Puxada · concêntrica) · sem deslize · não atravessa o chão · amplitudes na faixa | nenhum | docs/revisoes/r5-anim/folhas/remada-curvada-halteres.png |
| afundo-tras-peso-corpo | ver ficha em src/conteudo/exercicios/afundo-tras-peso-corpo.json | salto 0,90 (K_R, Volta · concêntrica) · sem deslize · não atravessa o chão · acima da média: dorsiflexão 47,9° (média 15°) | tranco | docs/revisoes/r5-anim/folhas/afundo-tras-peso-corpo.png |

As 31 folhas em `diagnostico/folhas-hoje/` (geradas com `node scripts/folha-animacao.mjs <id> ... --estilo=a2`) são: abdominal-chao, abdominal-polia, afundo, barra-fixa, bulgaro, crucifixo-polia, desenvolvimento, elevacao-halteres, elevacao-joelhos, elevacao-lateral, face-pull, flexao-bola, flexao, goblet, panturrilha-b, panturrilha-chao, panturrilha, puxada-unilateral, remada-apoiada, remada-baixa, remada-unilateral, rosca-alternada, rosca-inclinada, rosca-polia, stiff-unilateral, stiff, supino-inclinado, supino-reto, triceps-corda, triceps-frances-halter e triceps-frances (cada uma como `<id>.png`). As outras 59 estão em `docs/revisoes/equipamento-minimo/folhas/` (9), `docs/revisoes/catalogo/folhas/` (30), `docs/revisoes/elastico/folhas/` (12) e `docs/revisoes/r5-anim/folhas/` (8).

Outros números por animação que estão no `medidas-de-hoje.json` e não cabem na tabela: cabo ou elástico (26 animações, por exemplo crucifixo-polia com cabo de 47 a 143 cm, elevacao-lateral de 92 a 180 cm, crucifixo-invertido-polia de 90 a 173 cm); distância entre as mãos que varia mais de 8 cm no ciclo (36; pode ser normal em crucifixos e elevações, pois as mãos abrem e fecham); tempo de fase excêntrica e concêntrica (por exemplo barra-fixa 2,6 s e 1,5 s).

## 5. Peças de cena e os 49 desenhos de equipamento

Fonte: `diagnostico/objetos-de-hoje.md` (diagnóstico de 12/11/2026). Medidas reais só de `pesquisa/04-objetos.md`, pela chave citada; "BUSCA" é medida só de resumo de busca, não verificada, e não conta como comparação. Conversão de polegada para cm é do documento (conv.). Diferença = (código − real) ÷ real. Imagens: `docs/revisoes/animacao-nova/diagnostico/equipamento-hoje-cartao.png` (49 cartões a 96 px, fundo claro e escuro), `equipamento-hoje-ampliado-1.png`, `equipamento-hoje-ampliado-2.png` e `equipamento-hoje-ampliado-3.png` (300 px), todos na mesma pasta.

Resumo do arquivo: das 58 linhas comparáveis de peças de cena, 21 têm diferença maior que 10%, 7 ficam dentro de 10%, 4 dependem e 26 não têm medida de referência. Entre os 49 cartões, cerca de 12 não têm referência (total ou parcial), e o padrão contra as fichas de máquina é largura 30% a 60% menor.

### 5.1 Peças de cena do motor (`src/engine/desenho.ts`)

| peça | medida de hoje (cm) | medida real (fonte) | diferença | problema |
| --- | --- | --- | --- | --- |
| halter, comprimento total | 22 (cabo 16 e cabeças) | 24,1 a 38,6 (RITFIT-HEX, 5 a 60 lb, conv.) | −9% a −43% | peça única para todos os pesos, só bate com o halter mais leve |
| halter, diâmetro da cabeça | Ø14, redonda | 6,6 a 16,3 de altura (RITFIT-HEX) | dentro da faixa | fabricantes lidos são sextavados, a cena é redonda |
| halter, Ø do cabo | 2,6 | 2,8 a 3,3 (RITFIT-HEX); 2,5 a 3,5 (ROGUE-HEX) | −7% a −21% | cabo fino |
| halter, comprimento do cabo e espessura da cabeça | cabo 16, cabeça 4 | sem medida de referência | n/a | sem referência |
| halter antigo `dumbbell` | cabo 18, Ø14 | sem medida de referência | n/a | só no teste de equivalência, já fora do app |
| halter vertical (goblet) | cabo 20, barras de 18 | 24,1 a 38,6 de comprimento; cabeça 7,6 a 18,8 (RITFIT-HEX) | dentro (≈ 5 lb a 60 lb) | parece halter pesado e curto ao mesmo tempo |
| kettlebell, altura | 21 (22 com a alça) | 28 (ELEIKO-KB); 28,2 (ROGUE-CKB) | −21% a −25% | pequeno |
| kettlebell, Ø do corpo | 18 | 20,8 (ROGUE-CKB) | −13% | pequeno |
| kettlebell, Ø da alça | 2,4 | 3,3 (ROGUE-CKB); 3,0 a 4,4 (ROGUE-KB) | −27% | alça fina |
| kettlebell, distância entre hastes | 10 (uma mão) ou 10 a 14 (duas) | 12,3 (ROGUE-CKB) | −19% a +14% | depende |
| kettlebell, base plana | esfera sem base | base Ø14 (ROGUE-CKB) | n/a | só importa se apoiado no chão (na cena é sempre segurado) |
| torre da polia, altura | 238 | 240 (LF-DAPS); 237 (LF-HS26); 239 (LF-CC) | −0,8% a +0,4% | dentro |
| torre, largura x profundidade da coluna | 20 x 14 | LF-DAPS 114 x 158 e LF-CC 381 x 72 são da estação inteira | n/a | sem referência para a coluna |
| torre, pilha de pesos | 14 x 44 x 10 | placa da pilha: não encontrada | n/a | sem referência |
| torre, Ø da polia | 6,4 | 15,2 (ROGUE-SLING, polia de rack) | −58% | polia pequena (referência é de rack, não de máquina) |
| torre, altura da polia | mín. 12, máx. 212 | LF-DAPS: 17 a 200 | mín. −29% (−5 cm); máx. +6% | a mínima é pouca coisa em cm |
| pilha sobe quanto do curso do cabo | razão 0,5, teto 95 | LF-CC 2:1 (0,5); LF-DAPS 4:1 (0,25); ROGUE-SLING 1:1; curso 366 cm ÷ 4 = 91,5 | 0% contra 2:1; +100% contra 4:1; −50% contra 1:1 | depende da máquina; o teto de 95 bate (+4%) |
| cabo de aço, espessura | 1 | 0,64 (ROGUE-SLING, 1/4 pol) | +57% | cabo grosso |
| corda de tríceps | 28 de cada lado, pontas Ø4,8 | 71 de comprimento total (28 pol, ROGUE-TRI); cabo duplicado ≈ 29 | −61% ou −21% (leitura ambígua) | conferir se 28 foi lido como cm em vez de polegada |
| pegador do elástico | 9 de comprimento, Ø2,6 | sem medida de referência | n/a | sem referência |
| faixa do elástico, largura | 3,4 (afina até 1,9) | 0,64 a 10,2 conforme a faixa (RBANDITZ) | +19% contra Robust; −24% contra Power | fica entre duas faixas |
| poste do elástico | Ø5, base 14 x 14 x 4 | sem medida de referência | n/a | convenção de desenho |
| barra fixa, Ø | 3,4 | 2,86 (ROGUE-JAM) | +19% | grossa |
| barra fixa, comprimento e pontas | 124 reta; 160 com pontas | parte lisa central 44 (ROGUE-JAM); total não informado | n/a | sem referência |
| barra fixa, altura | 230 (travessa a 238) | instalação: não verificado | n/a | sem referência |
| barra fixa, afastamento da parede | 8 | 17,8 (ROGUE-JAM) | −55% | comparação fraca (a cena desenha pórtico) |
| fita de suspensão, âncora | 205 | 183 a 188 (BUSCA) | +9% a +12% | só busca |
| fita, largura e pegador | tronco 2,4; fitas 1,8; pegador 9 | TRX sem medidas; argola 38 mm (BUSCA) | n/a | sem referência |
| paralelas | 50 entre barras, 60 de comprimento, Ø3,4, altura 105 | distância 45 a 60, diâmetro não confirmado | n/a | sem referência confirmada |
| caneleira | caixa 13 x 13 x 9 | sem medida de referência | n/a | sem referência |
| mini-band, largura | 3,4 | 5,1 (RAWX-MINI) | −33% | estreita |
| mini-band, comprimento do laço | depende da pose | 30,5 (RAWX-MINI) | não medido | falta rodar `scripts/medir-animacao.mjs abducao-mini-band` |
| roda abdominal | Ø18, largura 3,2 | Ø18,4 e 36,8 entre empunhaduras (BUSCA) | −2% (BUSCA) | só busca |

### 5.2 Objetos desenhados dentro de cada exercício (`equip()`)

| peça | medida de hoje (cm) | medida real (fonte) | diferença | problema |
| --- | --- | --- | --- | --- |
| banco reto do supino, largura | 26 | 29 a 32 (IPF26); 30,5 (ROGUE-FB) | −10% a −19% | estreito |
| banco reto, altura do topo | 45 | 42 a 45 (IPF26); 45,7 (ROGUE-FB) | 0% a −1,5% | dentro |
| banco reto, comprimento | 108 | 122 mínimo (IPF26); 119 (ROGUE-FB) | −11,5% e −9% | curto |
| banco reto, espessura do estofado | 5 | 6,35 (ROGUE-FB); 7 (GYMGEAR-MAB) | −21% e −29% | fino |
| banco curto, altura do topo | 47,5 | 42 a 45 (IPF26); faixa típica 41 a 46 | +5% a +13% | o supino reto usa 45 e estes 47,5 |
| banco curto, largura | 26 | faixa típica 27 a 31 | −4% a −16% | estreito |
| banco curto, comprimento do assento | 34 | sem medida de referência | n/a | sem referência |
| banco da remada unilateral | 112 x 26, topo a 46,5 | 122 mínimo (IPF26); altura 43 a 47 | −8% (comprimento); +3% a +8% (altura) | dentro |
| banco inclinado (supino inclinado), estofado | 108 total; topo a 48,6 | 132 (ROGUE-AB3); altura 44,5 | −18% (comprimento); +9% (altura) | curto |
| banco do desenvolvimento, estofado | 102 total; encosto a 78 graus | 132 (ROGUE-AB3) | −23% | curto; 78 graus não está nos ângulos da referência |
| banco da rosca inclinada, estofado | 106 total; encosto a 50 graus | 132 (ROGUE-AB3) | −20% | curto |
| banco da remada apoiada | assento 22 x 26, topo 45,5; encosto 80 x 28 a 40 graus | encosto separado: nenhuma ficha lida | n/a | sem referência |
| banco da remada baixa | 90 x 26 x 6, topo 45 | sem medida de referência | n/a | espessura 6 é a maior de todos |
| banco do búlgaro, altura | topo a 45; 26 x 62 | 42 a 45 (IPF26) | 0% | dentro |
| apoio do pé traseiro (búlgaro, peso do corpo) | 42 x 40, topo 45 | sem medida de referência | n/a | sem referência |
| anilha sob o calcanhar (goblet) | duas caixas 14 x 18 x 3,2 | sem medida de referência (anilha 5 kg: Ø23 a 26 x 2,65, IWF20) | n/a | desenhada como caixa, não como disco |
| colchonete | 60 x 1,2 x comprimentos de 88, 100, 140, 148 e 190 | sem medida de referência | n/a | mesma peça com 5 comprimentos |
| almofada, toalha e tapete dos joelhos | 44 x 2,4 x 24; 44 x 2,4 x 28; 48 x 3,2 x 52 | sem medida de referência | n/a | sem referência |
| bola suíça | Ø56 | 55 (150 a 160 cm de altura), 65, 75 (MERRITHEW) | +2% contra 55; −14% contra 65 | o motor não sabe a altura da pessoa |
| degrau (step) | 68 x 15 x 32 | superfície 108 x 41; alturas 9, 15, 21 (GG-STEP) | altura 0%; comprimento −37%; largura −22% | superfície bem menor |
| caixa de apoio dos pés (flexão com pés elevados) | 80 x 45 x 54 | sem medida de referência | n/a | sem referência |
| bancada (extensão de tríceps) | 70 x 90 x 56 | sem medida de referência | n/a | sem referência |
| parede da panturrilha | 90 x 180 x 4 | sem medida de referência | n/a | sem referência |
| apoio dos pés (panturrilha sentada) | 44 x 8 x 12 | sem medida de referência | n/a | sem referência |
| sofá do nórdico | assento 100 x 16 x 36, encosto 96 x 36 x 8 | sem medida de referência | n/a | sem referência |

A mesma peça muda de medida entre exercícios: altura do topo do banco de 45 a 48,6 (3,6 cm, 8%), comprimento do colchonete de 88 a 190, ângulo do encosto de 30 a 78 graus.

### 5.3 Os 49 desenhos de cartão (`public/equipamento/`)

As proporções são do modelo 3D que gera o cartão (comprimento x largura x altura em cm), não do SVG. "Confunde com" vem da imagem a 96 px.

| arquivo | medida de hoje | medida real (fonte) | diferença | problema |
| --- | --- | --- | --- | --- |
| halteres_fixos.svg | cabo 13, Ø do cabo 3,4, total 23,8 a 32,1, cabeça Ø12 a 21 | cabo 2,8 a 3,3; total 24,1 a 38,6; cabeça 6,6 a 16,3 (RITFIT-HEX) | cabo +3%; total −1% a −17%; cabeça +30% | nenhum de identificação |
| anilhas_e_manoplas.svg | anilhas Ø32 a 17; manopla 44, Ø2,8 | anilhas Ø450 a 90 mm (ROGUE-STEEL); barra regulável 35, cabo 25 mm (BUSCA) | anilhas na série; manopla +26% e cabo +12% (BUSCA) | nenhum de identificação |
| kettlebell.svg | altura/Ø 1,29; alça/corpo 0,135 | 1,36 e 0,159 (ROGUE-CKB) | −5% e −15% | nenhum de identificação |
| caneleiras.svg | faixa 96 x 26, velcro 34 | sem medida de referência | n/a | confunde com acessorio_polia_tornozeleira |
| banco_reto.svg | 120 x 28, espessura 9, topo 48 | 119 x 30,5, topo 45,7, estofado 6,35 (ROGUE-FB) | comprimento +1%; largura −8%; topo +5%; espessura +42% | confunde com step |
| banco_regulavel.svg | assento 38 x 28; encosto 82 a 40 graus; base 112 | estofado 132, largura 28,6, altura 44,5, base 143,5 (ROGUE-AB3) | estofado −9%; largura −2%; assento +10%; base −22% | nenhum de identificação |
| banco_scott.svg | altura 92; base 96 x 52 | 119 x 84 x 117 (LF-HS26); 100 x 92 x 110 (HS24) | altura/comprimento 0,96 contra 0,98 e 1,10; largura/comprimento 0,54 contra 0,71 e 0,92 | confunde com rosca_maquina |
| banco_romano.svg | base 116 x 54; altura ~95 | 127 x 94 x 97 (LF-HS26); 150 x 72 x 110 (HS24) | altura/comprimento +8% a +12% | confunde com hack |
| estacao_polia_dupla.svg | torres 42 x 34 x 222; ~303 entre as extremas | 381 x 72 x 239 (LF-CC) | altura −7%; largura −20% | confunde com smith e rack em tamanho pequeno |
| polia_simples.svg | torre 34 x 30 x 210 | 240 (LF-DAPS) | altura −12% | só uma coluna, a "máquina" some; confunde com estacao_puxada |
| acessorio_polia_corda.svg | ~66 de altura, pontas Ø6,4 | 71 total (ROGUE-TRI) | −7% | confunde com acessorio_polia_triangulo e suspensao; a corda lê como garfo a 96 px |
| acessorio_polia_triangulo.svg | V de 36 de altura, 30 de base | sem medida de referência | n/a | confunde com acessorio_polia_estribo |
| acessorio_polia_barra_reta.svg | barra 54, Ø3,2 | sem medida de referência | n/a | nenhum de identificação |
| acessorio_polia_estribo.svg | alça 20 x 21, pegador Ø4,8 | sem medida de referência | n/a | confunde com acessorio_polia_triangulo |
| acessorio_polia_tornozeleira.svg | anel Ø20, largura 10 | sem medida de referência | n/a | confunde com caneleiras |
| estacao_puxada.svg | torre 34 x 30 x 220; barra 70 | 145 x 142 x 194 (LF-HS26); 138 x 84 x 227 (HS24); 153 x 137,5 x 195 (MV-NEXT); barra 122 (GG-LAT) | altura −3% a +13%; barra −43% | pequena a 96 px; confunde com multifuncional |
| estacao_remada.svg | banco 130; torre 190 | sem ficha de estação de remada baixa | n/a | sem referência |
| multifuncional.svg | base 134 x 92; torre 210 | 105 x 175 x 181 (LF-UC); 124 x 112 x 175 (TG Multi Hip), não verificado | altura +16% a +20% | confunde com estacao_puxada e voador |
| barra_fixa.svg | batente 91 x 222; barra 73, Ø3,8, a 192 | Ø2,86 (ROGUE-JAM); altura e comprimento sem referência | Ø +33% | nenhum de identificação |
| barra_longa.svg | total 220; Ø2,6; manga 42 x Ø5; entre mangas 136; anilha Ø45 | total 220, Ø2,8, manga 41,5 x 5, entre mangas 131, anilha 45 (IWF20) | 0%; −7% a −10%; +1%; +4%; 0% | confunde com barra_w à distância |
| barra_w.svg | total 120; manga 24 | 131,6 e manga 23 (ELEIKO-CURL) | −9% e +4% | confunde com barra_longa |
| paralelas.svg | barras a 58, comprimento 82, Ø4,8, altura 106 | sem medida de referência | n/a | confunde com rack_de_agachamento |
| barra_hexagonal.svg | hexágono 48 x 68; cabos a 24; manga Ø5 x 30 | largura 72,4; cabos 63,5 centro a centro; manga 40,6 (ROGUE-TB1) | largura −34%; espaçamento −62%; manga −26% | desproporcional |
| rack_de_agachamento.svg | base 118 x 120; altura 224 | 197 x 168 x 192 (LF-HS26); 150 x 176 x 186 (HS24); suportes 100 a 170 (IPF26) | altura +17% a +20%; base −21% a −40% | confunde com smith |
| smith.svg | base 90 x 200; altura 230 | 125 x 221 x 237 (LF-HS26); 127 x 220 x 237 (HS24) | altura −3%; comprimento −9%; largura −28% | confunde com rack_de_agachamento |
| cadeira_extensora.svg | 158 x 64 x 160 | 167 x 106 x 148; 120 x 105 x 163; 137 x 110 x 146 | largura/comprimento −37% a −54% | confunde com cadeira_flexora |
| cadeira_flexora.svg | 170 x 64 x 160 | 156 x 102 x 148; 140 x 87 x 140; 153 x 108 x 146 | altura/comprimento −1% a −6%; largura −26% a −41% | confunde com cadeira_extensora |
| mesa_flexora.svg | 160 x 50 x ~90 | 159 x 106 x 148; 166 x 100 x 140; 155 x 108 x 146 | altura −33% a −40% | confunde com panturrilha_sentada_maquina |
| supino_maquina.svg | 144 x 80 x 172 | 144 x 144 x 148; 105 x 145 x 163; 124 x 138 x 146; 141 x 143 x 167 | largura/comprimento −45% a −60% | confunde com desenvolvimento_maquina e remada_articulada |
| voador.svg | ~106 x 98 x 200 | 203 x 198 x 204; 125 x 143 x 181; 158 x 135 x 199 | +31% a +90% (altura/comprimento) | confunde com triceps_maquina e multifuncional |
| desenvolvimento_maquina.svg | 120 x 80 x ~170 | 164 x 145 x 185; 153 x 143 x 163; 155 x 144 x 146 | +26% a +51% | confunde com supino_maquina e remada_articulada |
| remada_articulada.svg | 140 x 80 x ~155 | 124 x 140 x 148; 133 x 87 x 181; 120 x 129 x 146 | −8% a −19% | confunde com supino_maquina e desenvolvimento_maquina |
| graviton.svg | 124 x 80 x 236 | 163 x 149 x 222; 117 x 115 x 221 | altura +6%; largura −30% a −46% | confunde com panturrilha_em_pe_maquina |
| rosca_maquina.svg | 120 x 76 x 150 | 122 x 160 x 148; 115 x 105 x 140; 123 x 146 x 146 | +3% a +5%; largura −28% a −52% | confunde com banco_scott e gluteo_maquina |
| triceps_maquina.svg | 124 x 80 x 170 | 135 x 111 x 148; 115 x 112 x 140; 126 x 108 x 146 | +12% a +25% | confunde com abdominal_maquina e voador |
| abdominal_maquina.svg | 144 x 80 x 170 | 134 x 118 x 148; 158 x 89 x 143; 141 x 114 x 146; 139 x 103 x 140 | +7% a +30% | confunde com triceps_maquina |
| gluteo_maquina.svg | 160 x 60 x 150 | 186 x 98 x 148; 166 x 100 x 183; 102 x 90 x 146 | altura dentro; largura −33% a −40% | confunde com rosca_maquina; "genérico" no backlog |
| panturrilha_em_pe_maquina.svg | 108 x 80 x ~200 | 148 x 115 x 182 (HS) | +50%; comprimento −27% | confunde com graviton |
| panturrilha_sentada_maquina.svg | 110 x 40 x ~66 | 155 x 74 x 107; 124 x 84 x 137; 155 x 82 x 140 | −13% a −45% | confunde com mesa_flexora |
| leg_press.svg | 216 x 68 x ~110; trilho a 45° | 229 x 171 x 158; 238 x 219 x 137; 176 x 130 x 145 | altura/comprimento −12% a −38%; largura −48% a −69% | confunde com hack |
| hack.svg | 172 x 68 x ~123; guia a 47° | 216 x 155 x 153 (HS24) | altura/comprimento +1%; largura −56% | confunde com leg_press; sem versão pendular |
| cadeira_abdutora_adutora.svg | 112 x 106 x 171 | 160 x 168 x 148; 155 x 67 x 140; 167 x 81 x 146 | altura/lado maior +70% | confunde com cadeira_extensora |
| esteira.svg | 192 x 78 x ~146 | 209 x 92 x 142; 212 x 92 x 147 (LF-HS26); superfície a 24 (TG-HOME) | altura/comprimento +10%; largura/comprimento −8%; superfície −21% a −33% | nenhum de identificação |
| elasticos.svg | tubo 3,4 em arco de 100; pegador 18 x 9 | faixas planas de 0,64 a 10,2; tubos com pegadores: sem medida (RBANDITZ) | n/a | confunde com mini_band; forma (tubo) diferente da cena (faixa) |
| mini_band.svg | espessura/Ø 0,06 (7 / 112) | 12 x 2 pol, 30,5 x 5,1 (RAWX-MINI) | desenho 8 vezes mais fino (hipótese do documento) | confunde com elasticos; não parece faixa |
| step.svg | 100 x 38 x 18 | 108 x 41 x 9, 15 ou 21 (GG-STEP) | −7%; −7%; altura +20% contra 15 | confunde com banco_reto |
| bola_suica.svg | Ø ≈ 96 de 120 do desenho | 55 a 75 (MERRITHEW) | não mensurável | nenhum de identificação |
| suspensao.svg | fita 67; pegador 18 (0,27 da fita) | TRX sem medidas; argola BUSCA | n/a | confunde com acessorio_polia_corda e triângulo; pegador 2,5 vezes maior que na cena |
| roda_abdominal.svg | roda Ø22, largura 8, eixo 44 | Ø18,4 e 36,8 entre empunhaduras (BUSCA) | Ø +22% contra a cena; eixo/Ø 2,0 igual | parece pneu ou anilha |

Coerência entre cena e cartão (12 objetos que aparecem nos dois): só a bola, o step (no cartão) e o kettlebell (na proporção) batem razoavelmente; nos outros 9 a forma ou as medidas não batem (halter redondo contra sextavado, banco com espessura 5 contra 9, barra fixa em pórtico de 230 contra batente de 192, elástico faixa contra tubo, mini-band faixa plana contra aro fino, caneleira caixa contra faixa comprida, paralelas +16% a +41%, roda +22%).

## 6. Problemas em ordem de gravidade x frequência

Critério: primeiro o que mais atrapalha quem imita o movimento, depois o que mais se repete. Os números vêm dos arquivos.

1. **Tranco de velocidade.** A velocidade de um ponto muda de repente entre dois quadros, e o movimento parece engasgar ou estalar. Aparece em 38 das 90 animações (razão salto/pico acima de 0,3) e em 64 acima de 0,15. Atrapalha porque a pessoa copia o ritmo do boneco e um tranco parece uma batida ou um solavanco que a execução correta não tem. Exemplos: barra-fixa-supinada (0,99), barra-fixa (0,97), afundo-tras-peso-corpo (0,90). Entre as de maior uso estão panturrilha-degrau (91,3 prescrições por 100 programas), stiff (66,2) e aducao-deitado (54,2).
2. **Cartões de equipamento que se confundem a 96 px.** São 15 grupos entre os 49 desenhos (3 já conhecidos, 12 novos, 2 de confiança alta), e o cartão é o que a pessoa usa para marcar o que tem. Exemplos: supino_maquina, desenvolvimento_maquina e remada_articulada; cadeira_extensora e cadeira_flexora; smith e rack_de_agachamento.
3. **Peças de cena e cartões fora da medida real.** 21 das 58 linhas de peças de cena passam de 10% de diferença e as máquinas do cartão têm largura 30% a 60% menor que as fichas. Atrapalha porque o equipamento desenhado não parece o da academia e muda a escala do corpo ao lado. Exemplos: roldana da polia (Ø6,4 contra 15,2, −58%), kettlebell (altura −21% a −25%), supino_maquina (largura −45% a −60%).
4. **Contato que desliza.** Mão, pé ou joelho que devia ficar parado anda de 0,7 a 3,1 cm. Aparece em 15 animações. Atrapalha porque a base de apoio parece escorregar, o oposto do que o texto manda. Exemplos: flexao e flexao-elastico (3,1 cm), flexao-fechada (3,0), flexao-joelho-suspensao (2,8).
5. **Amplitude acima da média normal.** 43 animações passam da média de alguma articulação (inclui o punho) e 1 passa do máximo observado. Atrapalha porque mostra uma posição extrema como se fosse a regra, e perto do limite a pessoa pode forçar a articulação. Exemplos: flexao-pes-elevados (dorsiflexão 65° contra máximo de 48°, a única acima do máximo), os quatro afundos (dorsiflexão 48°, no limite), triceps-suspensao (ombro 178°, média 170°).
6. **Assimetria em animação que devia ser simétrica.** 9 das 52 animações com músculos primários dos dois lados têm diferença de mais de 3 cm entre o lado esquerdo e o espelho do direito. Atrapalha porque a pessoa vê um lado fazendo mais que o outro. Exemplos: panturrilha-b (80,3 cm), panturrilha-degrau (69,0), triceps-frances (68,1).
7. **Parte do corpo atravessa o chão.** 7 animações têm dedo do pé, calcanhar, pegada ou joelho abaixo de −0,5 cm. Atrapalha porque quebra a leitura de onde está o apoio. Exemplos: stiff-unilateral (−7,72 cm), triceps-frances-polia-unilateral (−5,02), remada-elastico (−2,64).
8. **Fita de suspensão que muda de comprimento.** Aparece nas 6 animações com fita, com variação de 1,6 a 4,1 cm. Atrapalha porque a fita parece esticar, o que a fita real não faz. Exemplos: yt-suspensao (4,1 cm), remada-suspensao (2,6), bulgaro-suspensao (2,4).
9. **Barra fixa, halter e kettlebell de cena e de cartão são objetos diferentes.** Exemplo no arquivo: pórtico de 230 cm e Ø3,4 na cena contra batente de 192 cm e Ø3,8 no cartão (referência Ø2,86). Afeta barra-fixa, barra-fixa-supinada e as 7 animações com kettlebell.
10. **Distância entre as mãos que varia mais de 8 cm.** 36 animações. Pode não ser erro (crucifixos e elevações abrem e fecham as mãos de verdade, como crucifixo-polia de 4,6 a 162,0 cm), mas o arquivo só mediu, não julgou.

## 7. O que este diagnóstico não mediu

- As larguras e a estatura do corpo de hoje: só os comprimentos dos ossos foram comparados com `corpo-homem.json` (seção 2).
- Os músculos do boneco de hoje (tamanho, posição, forma) contra o atlas novo: só há o que os documentos de decisão dizem, sem medida.
- A dobra do punho tem só um valor sem sinal (não se sabe se é flexão ou extensão); por isso não há máximo observado para o punho.
- Não há modelo de pé separado do tornozelo (a dorsiflexão usa o vetor tornozelo até o dedo); não existem como ângulo a torção do antebraço, a rotação do quadril e a abertura do ombro para o lado (o ombro é só o ângulo entre braço e tronco).
- Colisão entre corpo e equipamento não é medida; só o chão (y = 0) para ponta do pé, calcanhar, pegada e joelho.
- Cabo e elástico: guarda só o menor comprimento por quadro. Fita: só mínimo e máximo por quadro, e a variação usa a fita mais longa.
- O tranco só conta pontos com velocidade de pico de pelo menos 5 cm/s; as animações extensao-joelho-caneleira e extensao-joelho-elastico ficaram sem ponto que entre nessa conta.
- "O que a ficha pede" não está nos arquivos de medida; a conferência contra a ficha de cada exercício não foi refeita aqui.
- Cartões: as medidas são do modelo 3D e não do SVG, e a comparação com as fichas de máquina usa só as fichas lidas; foi o primeiro cotejo (o gerador diz que as medidas eram "aproximadas", nunca conferidas). Ficaram sem medida de referência: comprimento do assento e do encosto do banco, altura de instalação da barra fixa, distância das paralelas, caneleiras, anilha de calcanhar, pegadores e tubos de elástico, espessura das faixas, fita de suspensão, placa da pilha, diâmetro do cabo com capa, ângulo do hack e do smith, colchonete, caixas e bancadas. Medidas marcadas "BUSCA" não verificadas não contam como comparação.
- Medidas de peça de cena foram lidas do código-fonte, não medidas na tela; o aspecto dos cartões foi visto a 96 px (no app o cartão tem 112 x 84 px), e tema escuro, celular de verdade e miniatura não foram olhados na auditoria do acabamento.
- A técnica de quase todo exercício vem de consenso e não de fonte verificada (NSCA não verificado); a rodada com o especialista humano não aconteceu.
- Os valores de uso (prescrições por 100 programas) vêm do teste de estresse com 149.760 programas fictícios e podem passar de 100 porque o mesmo exercício entra em mais de um dia do mesmo programa.
