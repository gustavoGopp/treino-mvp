# Medidas do motor de hoje (90 animações)

> Gerado por `node scripts/animacao-nova/medir-hoje.mjs`. Não editar à mão. Cada animação é amostrada a 60 quadros por segundo (n = round(T × 60), t = i/n × T). Coordenadas em cm; ângulos em graus. Os números completos estão em `medidas-de-hoje.json`.

## Resumo

- Animações medidas: **90**.
- Com algum contato que **desliza** (extensão de 0,5 a 4 cm; suspeito de contato que deveria estar preso): **15**.
- Com algum ponto que **atravessa o chão** (y < −0,5 cm em dedo do pé, calcanhar, pegada ou joelho): **7**.
- Com **salto de velocidade** com razão salto/pico > 0,3 (tranco): **38**; > 0,15: **64**. (Só entram pontos com velocidade de pico ≥ 5 cm/s; o quadro n−1 → 0 conta, como no laço do app.)
- Que passam do **máximo observado** de alguma amplitude (joelho, cotovelo, quadril, ombro, dorsiflexão, flexão plantar): **1**; que passam da média de alguma (inclui o punho): **43**.
- Com fita de suspensão: 6; **fita que muda de comprimento > 1 cm**: **6**.
- Com cabo ou elástico: 26.
- IK que falha (IKFAIL > 0) no ciclo correto: **0**; em algum erro animado: **0**.
- Ciclo que não fecha (último quadro a mais de 3 cm do primeiro, ou a mais de 3 passos médios): **0**.
- Simetria: 52 animações só têm músculos primários 'RL' (deveriam ser simétricas); **9** delas têm diferença > 3 cm entre o esquerdo e o espelho do direito (G, E, K, A).
- Distância entre as mãos varia mais de 8 cm no ciclo: 36.
- Sem nenhum alerta: **42**.

### De onde vem a coluna "uso (%)"

Vem de `docs/revisoes/auditoria/inventario.md`, coluna **vaga** (quantas vezes o exercício foi prescrito no teste de estresse de 149.760 programas fictícios). Ligação exercício → animação por `animacaoId` em `src/domain/biblioteca/exercicios.json` (quando mais de um exercício usa a mesma animação, as vagas são somadas). **uso (%) = vagas ÷ programas × 100**, isto é, prescrições por 100 programas: como o mesmo exercício pode entrar em mais de um dia do mesmo programa, o valor pode passar de 100 e não é a "fatia de programas que têm o exercício". Há uso para 90 das 90 animações; as demais ficam em branco (o inventário não traz o exercício). `regua.json`, `regua.md` e `catalogo/grade.json` só têm contagens por cenário e defeitos, sem frequência por exercício, e não foram usados.

### Como ler a tabela

- Colunas de ângulo: o pico (máximo) no ciclo entre os dois lados. `!` = acima da média normal; `!!` = acima do máximo observado (CDC, Soucie 2011). Normal (média / máximo): joelho 140/164, cotovelo 148/166, quadril 132/159, ombro 170/192, dorsiflexão 15/48, flexão plantar 57/90; punho: AAOS extensão 70, flexão 80.
- Punho: o motor mede a dobra sem sinal (não sabe se é flexão ou extensão); por isso `!` usa 70 (o menor dos dois) e não há máximo.
- Elevação do braço = ângulo entre o braço (S→E) e o eixo do tronco para baixo; é comparada com a flexão do ombro (170/192).
- Contatos que deslizam: ponta (toe, heel, G, K) e lado, com a extensão do caminho em cm.
- Maior salto de velocidade: razão salto/pico; ponto; fase em que ocorre. Razão < 0,15 = suave.
- Fecho: maior distância (cm) entre o último quadro e o primeiro, entre os pontos P, N, Hc, G, E, K (R/L), e quantos passos médios isso vale (≈ 1× = fecha bem).
- Simetria: maior diferença (cm) entre o lado esquerdo e o espelho do direito para G, E, K, A.
- Cabo/fita: comprimento mín–máx (cm) no ciclo, por id. Para a fita, Δ = mudança da fita mais longa do quadro.
- exc/conc: segundos de fase excêntrica / concêntrica.

## Tabela por animação

| id | uso (%) | joelho máx | cotovelo máx | quadril máx | ombro máx | tornozelo (dorsi máx) | punho máx | contatos que deslizam (cm) | maior salto de velocidade (razão; ponto; fase) | fecho do ciclo | simetria | cabo/fita (mín–máx) | exc/conc (s) | alertas |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |
| supino-inclinado | 39,2 | 89 | 120 | 28 | 120 | -19 | 0 | – | 0,16; E_R; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | – | 2,5/1,3 (total 4,8) | – |
| barra-fixa | 11,2 | 34 | 144 | 10 | 161 | -37 | 0 | – | 0,97; E_R; Descida · excêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,6/1,5 (total 5,1) | tranco |
| remada-baixa | 5,3 | 84 | 93 | 98 | 66 | -16 | 0 | – | 0,52; Hc; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | a 38–92 | 2,1/1,1 (total 4,7) | tranco |
| crucifixo-polia | 9,0 | 3 | 20 | 27 | 89 | -4 | 0 | – | 0,12; E_R; Fechamento · concêntrica | 0,0 cm (0,0× o passo) | 39,8 (deveria ser simétrico) | r 47–143; l 47–143 | 2,5/1,3 (total 4,8) | assimétrico |
| elevacao-lateral | 23,5 | 3 | 122 | 6 | 100 | -18 | 0 | – | 0,29; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 55,2 | a 92–180 | 2,1/1,3 (total 4,0) | – |
| face-pull | 5,5 | 3 | 133 | 1 | 107 | -20 | 0 | – | 0,08; G_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | a 46–119 | 2,0/1,0 (total 4,4) | – |
| abdominal-polia | 23,6 | 105 | 135 | 60 | 107 | -75 | 0 | – | 0,07; N; Enrolar · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | a 90–144 | 2,0/1,5 (total 4,9) | – |
| goblet | 23,6 | 135 | 140 | 124 | 34 | 11 | 0 | – | 0,24; K_R; Subida · concêntrica | 0,1 cm (0,5× o passo) | 0,0 (deveria ser simétrico) | – | 2,4/1,3 (total 4,7) | – |
| stiff | 66,2 | 21 | 14 | 97 | 59 | -10 | 0 | – | 0,63; K_R; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | – | 2,5/1,3 (total 4,8) | tranco |
| afundo | 58,4 | 101 | 1 | 92 | 4 | 48 ! | 0 | – | 0,18; K_R; Subida · concêntrica | 0,1 cm (0,4× o passo) | 80,3 | – | 2,3/1,3 (total 4,5) | – |
| panturrilha | 35,8 | 56 | 49 | 11 | 60 | 32 ! | 0 | toe_R 1,0 | 0,85; E_L; Subida · concêntrica | 0,0 cm (0,0× o passo) | 80,6 | – | 2,0/1,0 (total 5,8) | contato desliza, tranco |
| rosca-polia | 1,4 | 3 | 139 | 3 | 6 | -18 | 0 | – | 0,05; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | a 77–128 | 2,4/1,1 (total 4,3) | – |
| triceps-corda | 15,5 | 3 | 106 | 7 | 16 | -14 | 0 | – | 0,10; G_R; Extensão · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | a 64–130 | 2,0/1,0 (total 3,9) | – |
| supino-reto | 56,4 | 91 | 110 | 15 | 90 | -17 | 0 | – | 0,25; E_R; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | – | 2,5/1,3 (total 4,8) | – |
| remada-apoiada | 40,9 | 49 | 102 | 45 | 48 | 33 ! | 0 | – | 0,19; E_R; Puxada · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | – | 2,1/1,1 (total 4,7) | – |
| desenvolvimento | 21,2 | 86 | 105 | 76 | 165 | -20 | 0 | – | 0,14; E_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,4/1,3 (total 4,5) | – |
| puxada-unilateral | 15,2 | 97 | 154 ! | 1 | 146 | -76 | 0 | – | 0,18; G_R; Puxada · concêntrica | 0,0 cm (0,1× o passo) | 119,1 | a 64–132 | 2,0/1,0 (total 4,0) | – |
| flexao | 44,2 | 16 | 130 | 8 | 52 | 47 ! | 80 ! | G_R 3,1; G_L 3,1 | 0,85; K_R; Subida · concêntrica | 0,1 cm (0,3× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,0 (total 3,8) | contato desliza, tranco |
| elevacao-halteres | 102,6 | 3 | 20 | 11 | 100 | -18 | 0 | – | 0,20; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,1/1,3 (total 4,0) | – |
| elevacao-joelhos | 3,0 | 93 | 17 | 73 | 168 | -45 | 0 | – | 0,24; E_R; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 | – | 2,0/1,1 (total 4,0) | – |
| bulgaro | 29,4 | 120 | 127 | 104 | 33 | -6 | 0 | – | 0,11; K_R; Subida · concêntrica | 0,0 cm (0,2× o passo) | 97,5 | – | 2,3/1,3 (total 4,5) | – |
| flexao-bola | 25,6 | 95 | 6 | 13 | 68 | 24 ! | 0 | G_R 1,7; G_L 1,7 | 0,35; N; Puxada · concêntrica | 0,0 cm (0,1× o passo) | 0,0 | – | 2,0/1,2 (total 4,3) | contato desliza, tranco |
| panturrilha-b | 21,6 | 21 | 48 | 11 | 60 | 32 ! | 0 | toe_R 1,0; toe_L 1,0 | 0,84; E_L; Subida · concêntrica | 0,0 cm (0,0× o passo) | 80,3 (deveria ser simétrico) | – | 2,0/1,0 (total 5,8) | contato desliza, tranco, assimétrico |
| rosca-inclinada | 26,1 | 86 | 135 | 48 | 40 | -20 | 0 | – | 0,36; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,4/1,1 (total 4,5) | tranco |
| triceps-frances | 11,7 | 24 | 144 | 55 | 173 ! | -8 | 0 | – | 0,34; G_R; Extensão · concêntrica | 0,0 cm (0,0× o passo) | 68,1 (deveria ser simétrico) | a 39–91 | 2,3/1,1 (total 4,3) | atravessa o chão, tranco, assimétrico |
| remada-unilateral | 7,2 | 98 | 113 | 90 | 50 | -2 | 0 | – | 0,09; E_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 59,6 | – | 2,1/1,1 (total 4,7) | – |
| panturrilha-chao | 22,8 | 11 | 89 | 8 | 34 | -14 | 0 | – | 0,05; P; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,0/1,0 (total 4,6) | – |
| abdominal-chao | 69,8 | 112 | 142 | 56 | 37 | -52 | 0 | – | 0,08; Hc; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,0/1,0 (total 4,3) | – |
| rosca-alternada | 26,9 | 3 | 146 | 3 | 6 | -19 | 0 | – | 0,50; E_R; Direito sobe · concêntrica | 0,0 cm (0,0× o passo) | 62,4 (deveria ser simétrico) | – | 4,4/2,2 (total 7,9) | tranco, assimétrico |
| triceps-frances-halter | 32,4 | 89 | 154 ! | 84 | 164 | -17 | 0 | – | 0,15; G_R; Extensão · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,4/1,1 (total 4,4) | – |
| stiff-unilateral | 30,9 | 31 | 14 | 105 | 81 | -9 | 0 | – | 0,18; P; Subida · concêntrica | 0,0 cm (0,1× o passo) | 123,0 | – | 2,5/1,4 (total 4,8) | atravessa o chão |
| agachamento-peso-corpo | 9,2 | 140 | 4 | 134 ! | 106 | 23 ! | 0 | – | 0,28; K_R; Subida · concêntrica | 0,1 cm (0,4× o passo) | 0,0 (deveria ser simétrico) | – | 2,4/1,3 (total 4,7) | – |
| afundo-peso-corpo | 17,8 | 101 | 99 | 92 | 48 | 48 ! | 0 | – | 0,18; K_R; Subida · concêntrica | 0,1 cm (0,4× o passo) | 80,3 | – | 2,3/1,3 (total 4,5) | – |
| bulgaro-peso-corpo | 2,3 | 120 | 99 | 104 | 48 | -6 | 0 | – | 0,11; K_R; Subida · concêntrica | 0,0 cm (0,2× o passo) | 97,5 | – | 2,3/1,3 (total 4,5) | – |
| barra-fixa-supinada | 8,4 | 34 | 153 ! | 10 | 172 ! | -37 | 0 | – | 0,99; E_R; Descida · excêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,6/1,5 (total 5,1) | tranco |
| ponte-gluteo | 26,5 | 133 | 4 | 58 | 58 | -18 | 0 | G_R 1,3; G_L 1,3 | 0,22; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,2 (total 4,7) | contato desliza |
| flexao-fechada | 9,2 | 16 | 125 | 8 | 43 | 47 ! | 80 ! | G_R 3,0; G_L 3,0 | 0,82; K_R; Subida · concêntrica | 0,1 cm (0,3× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,0 (total 3,8) | contato desliza, tranco |
| pike | 9,5 | 24 | 132 | 109 | 150 | 24 ! | 80 ! | G_R 1,9; G_L 1,9 | 0,41; K_R; Subida · concêntrica | 0,1 cm (0,5× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,0 (total 3,8) | contato desliza, tranco |
| flexao-joelho-deslizante | 34,1 | 90 | 12 | 15 | 48 | 46 ! | 0 | G_R 1,8; G_L 1,8 | 0,21; P; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,5/1,2 (total 4,8) | contato desliza |
| nordico | 15,1 | 88 | 137 | 1 | 37 | -73 | 60 | K_R 0,7; K_L 0,7 | 0,71; K_R; Volta · concêntrica | 0,0 cm (0,1× o passo) | 0,0 | – | 4,6/1,6 (total 6,8) | contato desliza, tranco |
| remada-unilateral-sem-banco | 12,0 | 42 | 104 | 100 | 36 | 12 | 0 | – | 0,30; E_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 50,0 | – | 2,1/1,1 (total 4,7) | – |
| rosca-martelo | 18,0 | 3 | 146 | 3 | 6 | -19 | 0 | – | 0,50; E_R; Direito sobe · concêntrica | 0,0 cm (0,0× o passo) | 62,4 (deveria ser simétrico) | – | 4,4/2,2 (total 7,9) | tranco, assimétrico |
| triceps-frances-polia-unilateral | 0,0 | 21 | 135 | 53 | 174 ! | -14 | 0 | – | 0,35; G_R; Extensão · concêntrica | 0,0 cm (0,0× o passo) | 123,8 | a 135–192 | 2,3/1,1 (total 4,3) | atravessa o chão, tranco |
| remada-unilateral-polia | 0,0 | 42 | 103 | 96 | 36 | 12 | 0 | – | 0,14; E_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 50,0 | a 58–109 | 2,1/1,1 (total 4,7) | – |
| crucifixo-invertido-polia | 8,9 | 19 | 20 | 21 | 91 | -1 | 0 | – | 0,05; G_R; Abertura · concêntrica | 0,0 cm (0,0× o passo) | 26,0 (deveria ser simétrico) | r 90–173; l 90–173 | 2,2/1,1 (total 4,3) | assimétrico |
| remada-unilateral-kettlebell | 0,0 | 42 | 104 | 100 | 36 | 12 | 0 | – | 0,30; E_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 50,0 | – | 2,1/1,1 (total 4,7) | – |
| stiff-kettlebell | 6,3 | 21 | 14 | 97 | 60 | -10 | 0 | – | 0,63; K_R; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | – | 2,5/1,3 (total 4,8) | tranco |
| rosca-kettlebell | 0,7 | 3 | 146 | 3 | 6 | -19 | 0 | – | 0,50; E_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 62,4 | – | 2,2/1,1 (total 4,2) | tranco |
| triceps-frances-kettlebell | 1,5 | 89 | 154 ! | 84 | 164 | -17 | 0 | – | 0,15; G_R; Extensão · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,4/1,1 (total 4,4) | – |
| afundo-kettlebell | 3,0 | 101 | 140 | 92 | 17 | 48 ! | 0 | – | 0,18; K_R; Subida · concêntrica | 0,1 cm (0,4× o passo) | 80,3 | – | 2,3/1,3 (total 4,5) | – |
| desenvolvimento-unilateral-kettlebell | 0,9 | 3 | 150 ! | 3 | 174 ! | -19 | 0 | – | 0,27; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 104,0 | – | 2,4/1,3 (total 4,5) | – |
| ponte-kettlebell | 3,6 | 133 | 72 | 58 | 36 | -18 | 0 | – | 0,22; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,2 (total 4,7) | – |
| remada-suspensao | 0,0 | 30 | 133 | 15 | 76 | -27 | 0 | – | 0,78; K_R; Puxada · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | fita f 84–86 (Δ2,6) | 2,1/1,1 (total 4,7) | tranco, fita muda |
| rosca-suspensao | 0,0 | 26 | 126 | 13 | 142 | -44 | 0 | – | 0,53; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | fita f 84–86 (Δ1,8) | 2,1/1,1 (total 4,3) | tranco, fita muda |
| yt-suspensao | 0,0 | 34 | 80 | 17 | 119 | -22 | 0 | – | 0,88; K_R; Abertura em T · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | fita f 107–111 (Δ4,1) | 2,1/1,1 (total 4,7) | tranco, fita muda |
| triceps-suspensao | 3,3 | 25 | 123 | 13 | 178 ! | 6 | 0 | – | 0,51; G_R; Extensão · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | fita f 103–105 (Δ1,9) | 2,0/1,1 (total 4,0) | tranco, fita muda |
| flexao-joelho-suspensao | 0,0 | 102 | 12 | 17 | 51 | 34 ! | 0 | G_R 2,8; G_L 2,8 | 0,62; G_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | fita f 181–182 (Δ1,6) | 2,5/1,2 (total 4,8) | contato desliza, tranco, fita muda |
| bulgaro-suspensao | 0,0 | 98 | 99 | 104 | 48 | -17 | 0 | – | 0,11; K_R; Subida · concêntrica | 0,0 cm (0,2× o passo) | 98,7 | fita f 178–181 (Δ2,4) | 2,3/1,3 (total 4,5) | fita muda |
| abdominal-bola | 19,2 | 106 | 142 | 52 | 39 | -11 | 0 | – | 0,08; Hc; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,0/1,0 (total 4,3) | – |
| ponte-pes-bola | 0,0 | 43 | 3 | 46 | 75 | -25 | 0 | G_R 1,9; G_L 1,9 | 0,08; Hc; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,2 (total 4,7) | contato desliza |
| elevacao-joelhos-paralelas | 0,5 | 93 | 53 | 73 | 33 | -45 | 0 | – | 0,22; P; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,0/1,1 (total 4,0) | – |
| extensao-joelho-caneleira | 8,1 | 89 | 58 | 86 | 36 | -10 | 0 | – | – | 0,0 cm (0,0× o passo) | 60,1 | – | 2,0/1,1 (total 4,6) | – |
| abducao-caneleira | 9,4 | 86 | 146 | 50 | 99 | 31 ! | 0 | – | 0,28; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 60,1 | – | 2,0/1,1 (total 4,6) | – |
| aducao-caneleira | 11,4 | 107 | 122 | 94 | 178 ! | 5 | 0 | – | 0,43; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 61,6 | – | 2,0/1,1 (total 4,6) | tranco |
| abducao-mini-band | 0,0 | 90 | 58 | 84 | 36 | -16 | 0 | – | 0,08; K_R; Abertura · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | f 24–62; t 24–62 | 2,0/1,1 (total 4,6) | – |
| roda-abdominal | 0,3 | 93 | 34 | 65 | 71 | -71 | 30 | K_R 2,1; K_L 2,1 | 0,49; K_R; Volta · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,5/1,5 (total 5,0) | contato desliza, tranco |
| flexao-joelho-elastico | 41,6 | 87 | 141 | 17 | 138 | -24 | 0 | – | 0,57; K_R; Flexão · concêntrica | 0,0 cm (0,1× o passo) | 0,0 | R 50–90; L 50–90 | 2,4/1,1 (total 4,5) | atravessa o chão, tranco |
| rosca-elastico | 15,6 | 3 | 146 | 3 | 6 | -19 | 0 | – | 0,50; E_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | R 76–137; L 76–137 | 2,2/1,1 (total 4,2) | tranco |
| elevacao-lateral-elastico | 15,7 | 3 | 20 | 11 | 100 | -18 | 0 | – | 0,20; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | R 78–151; L 78–151 | 2,1/1,3 (total 4,0) | – |
| crucifixo-elastico | 21,5 | 3 | 20 | 27 | 89 | -4 | 0 | – | 0,12; E_R; Fechamento · concêntrica | 0,0 cm (0,0× o passo) | 39,8 (deveria ser simétrico) | R 102–139; L 102–139 | 2,5/1,3 (total 4,8) | assimétrico |
| stiff-elastico | 18,8 | 21 | 14 | 97 | 59 | -10 | 0 | – | 0,63; K_R; Subida · concêntrica | 0,0 cm (0,1× o passo) | 0,0 (deveria ser simétrico) | R 40–76; L 40–76 | 2,5/1,3 (total 4,8) | tranco |
| remada-elastico | 15,6 | 24 | 119 | 112 | 54 | -6 | 0 | – | 0,52; Hc; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | R 36–88; L 36–88 | 2,1/1,1 (total 4,7) | atravessa o chão, tranco |
| face-pull-elastico | 9,6 | 3 | 133 | 1 | 107 | -20 | 0 | – | 0,08; G_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | R 70–126; L 70–126 | 2,0/1,0 (total 4,4) | – |
| puxada-elastico | 13,5 | 97 | 154 ! | 1 | 146 | -76 | 0 | – | 0,69; E_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | R 62–129; L 62–129 | 2,0/1,0 (total 4,0) | tranco |
| triceps-elastico-acima | 11,0 | 13 | 130 | 23 | 152 | 3 | 0 | – | 0,40; G_R; Extensão · concêntrica | 0,0 cm (0,0× o passo) | 50,0 (deveria ser simétrico) | R 151–199; L 151–197 | 2,3/1,1 (total 4,3) | tranco, assimétrico |
| desenvolvimento-elastico | 8,8 | 3 | 105 | 2 | 171 ! | -19 | 0 | – | 0,14; E_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | R 166–202; L 166–202 | 2,4/1,3 (total 4,5) | – |
| agachamento-elastico | 11,5 | 140 | 152 ! | 134 ! | 29 | 23 ! | 0 | – | 0,28; K_R; Subida · concêntrica | 0,1 cm (0,4× o passo) | 0,0 (deveria ser simétrico) | R 64–134; L 64–134 | 2,4/1,3 (total 4,7) | – |
| flexao-elastico | 0,8 | 16 | 130 | 8 | 52 | 47 ! | 80 ! | G_R 3,1; G_L 3,1 | 0,85; K_R; Subida · concêntrica | 0,1 cm (0,3× o passo) | 0,0 (deveria ser simétrico) | R 36–67; L 36–67 | 2,0/1,0 (total 3,8) | contato desliza, tranco |
| abducao-deitado | 28,1 | 86 | 146 | 50 | 99 | 31 ! | 0 | – | 0,28; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 60,1 | – | 2,0/1,1 (total 4,6) | – |
| aducao-deitado | 54,2 | 107 | 122 | 94 | 178 ! | 5 | 0 | – | 0,43; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 61,6 | – | 2,0/1,1 (total 4,6) | tranco |
| extensao-joelho-elastico | 31,9 | 89 | 58 | 86 | 36 | -10 | 0 | – | – | 0,0 cm (0,0× o passo) | 60,1 | r 95–135 | 2,0/1,1 (total 4,6) | – |
| panturrilha-sentada-halter | 32,8 | 97 | 59 | 96 | 33 | 16 ! | 0 | toe_R 1,2; toe_L 1,2 | 0,16; E_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,0/1,0 (total 4,4) | contato desliza, atravessa o chão |
| panturrilha-degrau | 91,3 | 21 | 67 | 11 | 43 | 32 ! | 0 | toe_R 1,0; toe_L 1,0 | 0,68; E_L; Subida · concêntrica | 0,0 cm (0,0× o passo) | 69,0 (deveria ser simétrico) | – | 2,5/1,0 (total 5,0) | contato desliza, tranco, assimétrico |
| abdominal-invertido | 41,5 | 90 | 40 | 92 | 24 | -26 | 0 | – | 0,56; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 | – | 2,0/1,0 (total 4,4) | tranco |
| extensao-triceps-peso-corpo | 6,3 | 10 | 128 | 5 | 81 | 25 ! | 0 | – | 0,89; K_R; Volta · concêntrica | 0,0 cm (0,2× o passo) | 0,0 (deveria ser simétrico) | – | 2,5/1,1 (total 4,5) | tranco |
| abertura-t-deitado | 9,9 | 14 | 0 | 10 | 90 | -36 | 0 | – | 0,05; G_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,0 (total 4,4) | atravessa o chão |
| flexao-pes-elevados | 19,1 | 15 | 135 | 7 | 73 | 65 !! | 80 ! | – | 0,84; K_R; Subida · concêntrica | 0,1 cm (0,4× o passo) | 0,0 (deveria ser simétrico) | – | 2,5/1,0 (total 4,3) | tranco, acima do máximo: dorsiflexao |
| ponte-gluteo-halter | 73,8 | 133 | 72 | 58 | 21 | -18 | 0 | – | 0,22; K_R; Subida · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,0/1,2 (total 4,7) | – |
| remada-curvada-halteres | 21,4 | 17 | 104 | 96 | 47 | -35 | 0 | – | 0,07; E_R; Puxada · concêntrica | 0,0 cm (0,0× o passo) | 0,0 (deveria ser simétrico) | – | 2,1/1,1 (total 4,3) | – |
| afundo-tras-peso-corpo | 8,0 | 101 | 99 | 92 | 48 | 48 ! | 0 | – | 0,90; K_R; Volta · concêntrica | 0,0 cm (0,1× o passo) | 80,3 | – | 2,6/1,5 (total 5,0) | tranco |

## As 15 piores em cada critério

### Contato que desliza (maior extensão, cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | flexao | 3,1 cm: G_R 3,1; G_L 3,1 |
| 2 | flexao-elastico | 3,1 cm: G_R 3,1; G_L 3,1 |
| 3 | flexao-fechada | 3,0 cm: G_R 3,0; G_L 3,0 |
| 4 | flexao-joelho-suspensao | 2,8 cm: G_R 2,8; G_L 2,8 |
| 5 | roda-abdominal | 2,1 cm: K_R 2,1; K_L 2,1 |
| 6 | pike | 1,9 cm: G_R 1,9; G_L 1,9 |
| 7 | ponte-pes-bola | 1,9 cm: G_R 1,9; G_L 1,9 |
| 8 | flexao-joelho-deslizante | 1,8 cm: G_R 1,8; G_L 1,8 |
| 9 | flexao-bola | 1,7 cm: G_R 1,7; G_L 1,7 |
| 10 | ponte-gluteo | 1,3 cm: G_R 1,3; G_L 1,3 |
| 11 | panturrilha-sentada-halter | 1,2 cm: toe_R 1,2; toe_L 1,2 |
| 12 | panturrilha | 1,0 cm: toe_R 1,0 |
| 13 | panturrilha-b | 1,0 cm: toe_R 1,0; toe_L 1,0 |
| 14 | panturrilha-degrau | 1,0 cm: toe_R 1,0; toe_L 1,0 |
| 15 | nordico | 0,7 cm: K_R 0,7; K_L 0,7 |

### Salto de velocidade (razão salto/pico)

| # | id | valor |
| ---: | --- | --- |
| 1 | barra-fixa-supinada | 0,99 (E_R; Descida · excêntrica; salto 107,2 cm/s, pico 108,3 cm/s) |
| 2 | barra-fixa | 0,97 (E_R; Descida · excêntrica; salto 99,5 cm/s, pico 102,4 cm/s) |
| 3 | afundo-tras-peso-corpo | 0,90 (K_R; Volta · concêntrica; salto 174,3 cm/s, pico 193,6 cm/s) |
| 4 | extensao-triceps-peso-corpo | 0,89 (K_R; Volta · concêntrica; salto 36,1 cm/s, pico 40,7 cm/s) |
| 5 | yt-suspensao | 0,88 (K_R; Abertura em T · concêntrica; salto 83,4 cm/s, pico 94,3 cm/s) |
| 6 | panturrilha | 0,85 (E_L; Subida · concêntrica; salto 31,8 cm/s, pico 37,3 cm/s) |
| 7 | flexao | 0,85 (K_R; Subida · concêntrica; salto 37,0 cm/s, pico 43,5 cm/s) |
| 8 | flexao-elastico | 0,85 (K_R; Subida · concêntrica; salto 37,0 cm/s, pico 43,5 cm/s) |
| 9 | panturrilha-b | 0,84 (E_L; Subida · concêntrica; salto 31,9 cm/s, pico 38,1 cm/s) |
| 10 | flexao-pes-elevados | 0,84 (K_R; Subida · concêntrica; salto 30,8 cm/s, pico 36,8 cm/s) |
| 11 | flexao-fechada | 0,82 (K_R; Subida · concêntrica; salto 35,5 cm/s, pico 43,5 cm/s) |
| 12 | remada-suspensao | 0,78 (K_R; Puxada · concêntrica; salto 45,8 cm/s, pico 58,9 cm/s) |
| 13 | nordico | 0,71 (K_R; Volta · concêntrica; salto 6,1 cm/s, pico 8,7 cm/s) |
| 14 | puxada-elastico | 0,69 (E_R; Puxada · concêntrica; salto 96,7 cm/s, pico 140,4 cm/s) |
| 15 | panturrilha-degrau | 0,68 (E_L; Subida · concêntrica; salto 25,5 cm/s, pico 37,5 cm/s) |

### Mais acima do máximo de amplitude (pico ÷ máximo observado, maior entre as amplitudes)

| # | id | valor |
| ---: | --- | --- |
| 1 | flexao-pes-elevados | dorsiflexao 65° (máximo 48°; 135%) |
| 2 | afundo | dorsiflexao 48° (máximo 48°; 100%) |
| 3 | afundo-peso-corpo | dorsiflexao 48° (máximo 48°; 100%) |
| 4 | afundo-kettlebell | dorsiflexao 48° (máximo 48°; 100%) |
| 5 | afundo-tras-peso-corpo | dorsiflexao 48° (máximo 48°; 100%) |
| 6 | flexao | dorsiflexao 47° (máximo 48°; 98%) |
| 7 | flexao-elastico | dorsiflexao 47° (máximo 48°; 98%) |
| 8 | flexao-fechada | dorsiflexao 47° (máximo 48°; 97%) |
| 9 | flexao-joelho-deslizante | dorsiflexao 46° (máximo 48°; 96%) |
| 10 | triceps-frances-halter | cotovelo 154° (máximo 166°; 93%) |
| 11 | triceps-frances-kettlebell | cotovelo 154° (máximo 166°; 93%) |
| 12 | triceps-suspensao | ombro 178° (máximo 192°; 93%) |
| 13 | puxada-unilateral | cotovelo 154° (máximo 166°; 93%) |
| 14 | aducao-caneleira | ombro 178° (máximo 192°; 93%) |
| 15 | aducao-deitado | ombro 178° (máximo 192°; 93%) |

### Ciclo que não fecha (distância do último ao primeiro quadro, cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | goblet | 0,1 cm (até 0,5× o passo médio) |
| 2 | agachamento-peso-corpo | 0,1 cm (até 0,4× o passo médio) |
| 3 | agachamento-elastico | 0,1 cm (até 0,4× o passo médio) |
| 4 | flexao-pes-elevados | 0,1 cm (até 0,4× o passo médio) |
| 5 | pike | 0,1 cm (até 0,5× o passo médio) |
| 6 | afundo | 0,1 cm (até 0,4× o passo médio) |
| 7 | flexao | 0,1 cm (até 0,3× o passo médio) |
| 8 | afundo-peso-corpo | 0,1 cm (até 0,4× o passo médio) |
| 9 | flexao-fechada | 0,1 cm (até 0,3× o passo médio) |
| 10 | afundo-kettlebell | 0,1 cm (até 0,4× o passo médio) |
| 11 | flexao-elastico | 0,1 cm (até 0,3× o passo médio) |
| 12 | remada-apoiada | 0,0 cm (até 0,1× o passo médio) |
| 13 | extensao-triceps-peso-corpo | 0,0 cm (até 0,2× o passo médio) |
| 14 | supino-inclinado | 0,0 cm (até 0,1× o passo médio) |
| 15 | supino-reto | 0,0 cm (até 0,1× o passo médio) |

### Assimetria em animação que deveria ser simétrica (cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | panturrilha-b | 80,3 cm {"G":80.31,"E":31.2,"K":0,"A":0} |
| 2 | panturrilha-degrau | 69,0 cm {"G":68.99,"E":21.91,"K":0,"A":0} |
| 3 | triceps-frances | 68,1 cm {"G":0,"E":0,"K":31.33,"A":68.07} |
| 4 | rosca-alternada | 62,4 cm {"G":62.44,"E":3.24,"K":0,"A":0} |
| 5 | rosca-martelo | 62,4 cm {"G":62.44,"E":3.24,"K":0,"A":0} |
| 6 | triceps-elastico-acima | 50,0 cm {"G":0,"E":0,"K":21.33,"A":49.98} |
| 7 | crucifixo-polia | 39,8 cm {"G":0,"E":0,"K":19.91,"A":39.82} |
| 8 | crucifixo-elastico | 39,8 cm {"G":0,"E":0,"K":19.91,"A":39.82} |
| 9 | crucifixo-invertido-polia | 26,0 cm {"G":0,"E":0,"K":12.14,"A":26} |
| 10 | supino-inclinado | 0,0 cm {"G":0,"E":0,"K":0,"A":0} |
| 11 | barra-fixa | 0,0 cm {"G":0,"E":0,"K":0,"A":0} |
| 12 | remada-baixa | 0,0 cm {"G":0,"E":0,"K":0,"A":0} |
| 13 | face-pull | 0,0 cm {"G":0,"E":0,"K":0,"A":0} |
| 14 | goblet | 0,0 cm {"G":0,"E":0,"K":0,"A":0} |
| 15 | stiff | 0,0 cm {"G":0,"E":0,"K":0,"A":0} |

### Fita que muda de comprimento (cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | yt-suspensao | 4,1 cm: fita f 107–111 (Δ4,1) |
| 2 | remada-suspensao | 2,6 cm: fita f 84–86 (Δ2,6) |
| 3 | bulgaro-suspensao | 2,4 cm: fita f 178–181 (Δ2,4) |
| 4 | triceps-suspensao | 1,9 cm: fita f 103–105 (Δ1,9) |
| 5 | rosca-suspensao | 1,8 cm: fita f 84–86 (Δ1,8) |
| 6 | flexao-joelho-suspensao | 1,6 cm: fita f 181–182 (Δ1,6) |

### Cabo ou elástico com maior variação de comprimento (cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | crucifixo-polia | r 47–143; l 47–143 |
| 2 | elevacao-lateral | a 92–180 |
| 3 | crucifixo-invertido-polia | r 90–173; l 90–173 |
| 4 | face-pull | a 46–119 |
| 5 | elevacao-lateral-elastico | R 78–151; L 78–151 |
| 6 | agachamento-elastico | R 64–134; L 64–134 |
| 7 | puxada-unilateral | a 64–132 |
| 8 | puxada-elastico | R 62–129; L 62–129 |
| 9 | triceps-corda | a 64–130 |
| 10 | rosca-elastico | R 76–137; L 76–137 |
| 11 | triceps-frances-polia-unilateral | a 135–192 |
| 12 | face-pull-elastico | R 70–126; L 70–126 |
| 13 | remada-baixa | a 38–92 |
| 14 | abdominal-polia | a 90–144 |
| 15 | remada-elastico | R 36–88; L 36–88 |

### Atravessa o chão (menor altura, cm; mais negativo primeiro)

| # | id | valor |
| ---: | --- | --- |
| 1 | stiff-unilateral | toe_R y mín -7,72 cm |
| 2 | triceps-frances-polia-unilateral | toe_R y mín -5,02 cm |
| 3 | remada-elastico | heel_R y mín -2,64 cm |
| 4 | triceps-frances | toe_L y mín -2,02 cm |
| 5 | flexao-joelho-elastico | toe_R y mín -2,02 cm |
| 6 | abertura-t-deitado | toe_R y mín -2,02 cm |
| 7 | panturrilha-sentada-halter | heel_R y mín -1,55 cm |

### Mãos: maior variação da distância entre elas (cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | crucifixo-polia | 4,6–162,0 cm |
| 2 | crucifixo-elastico | 4,6–162,0 cm |
| 3 | crucifixo-invertido-polia | 14,5–163,1 cm |
| 4 | yt-suspensao | 32,0–137,4 cm |
| 5 | elevacao-halteres | 45,4–145,2 cm |
| 6 | elevacao-lateral-elastico | 45,4–145,2 cm |
| 7 | puxada-unilateral | 62,2–121,5 cm |
| 8 | desenvolvimento | 40,3–96,2 cm |
| 9 | desenvolvimento-elastico | 40,3–96,2 cm |
| 10 | elevacao-lateral | 65,0–119,1 cm |
| 11 | supino-inclinado | 41,0–92,7 cm |
| 12 | desenvolvimento-unilateral-kettlebell | 61,9–110,6 cm |
| 13 | supino-reto | 41,0–89,1 cm |
| 14 | triceps-frances-polia-unilateral | 89,7–129,2 cm |
| 15 | face-pull | 18,0–54,0 cm |

### Erro animado mais longe do certo (cm)

| # | id | valor |
| ---: | --- | --- |
| 1 | barra-fixa | balanco: 78,1 cm (toe_R, t = 3,51 s, Descida · excêntrica) |
| 2 | barra-fixa-supinada | balanco: 78,1 cm (toe_R, t = 3,51 s, Descida · excêntrica) |
| 3 | yt-suspensao | cotovelo: 72,8 cm (E_R, t = 1,57 s, T · segura) |
| 4 | ponte-gluteo-halter | e2: 66,8 cm (G_L, t = 1,70 s, Topo · segura) |
| 5 | remada-curvada-halteres | e4: 64,1 cm (E_R, t = 1,59 s, Fim · segura) |
| 6 | nordico | desaba: 63,2 cm (W_R, t = 2,64 s, Descida lenta · excêntrica) |
| 7 | stiff-unilateral | agachar: 60,4 cm (A_R, t = 3,03 s, Embaixo · alongado) |
| 8 | rosca-suspensao | cotovelo: 57,6 cm (E_R, t = 2,92 s, Descida · excêntrica) |
| 9 | triceps-frances-halter | abre: 57,3 cm (G_R, t = 1,05 s, Extensão · concêntrica) |
| 10 | triceps-frances-kettlebell | abre: 57,3 cm (G_R, t = 1,05 s, Extensão · concêntrica) |
| 11 | triceps-suspensao | cotovelo: 50,5 cm (E_R, t = 1,87 s, Descida · excêntrica) |
| 12 | elevacao-lateral | frontal: 50,4 cm (G_R, t = 1,63 s, Linha do ombro) |
| 13 | elevacao-halteres | frontal: 50,4 cm (G_R, t = 1,63 s, Linha do ombro) |
| 14 | elevacao-lateral-elastico | frontal: 50,4 cm (G_R, t = 1,63 s, Linha do ombro) |
| 15 | abdominal-invertido | lombar: 49,6 cm (toe_R, t = 0,00 s, Embaixo) |

### IK que falha (chamadas no ciclo correto; erros somam à parte)

| # | id | valor |
| ---: | --- | --- |


### Mais frequentes nos programas com alerta (uso % das animações que têm algum alerta)

| # | id | valor |
| ---: | --- | --- |
| 1 | panturrilha-degrau | 91,3 % — contato desliza, tranco, assimétrico |
| 2 | stiff | 66,2 % — tranco |
| 3 | aducao-deitado | 54,2 % — tranco |
| 4 | flexao | 44,2 % — contato desliza, tranco |
| 5 | flexao-joelho-elastico | 41,6 % — atravessa o chão, tranco |
| 6 | abdominal-invertido | 41,5 % — tranco |
| 7 | panturrilha | 35,8 % — contato desliza, tranco |
| 8 | flexao-joelho-deslizante | 34,1 % — contato desliza |
| 9 | panturrilha-sentada-halter | 32,8 % — contato desliza, atravessa o chão |
| 10 | stiff-unilateral | 30,9 % — atravessa o chão |
| 11 | rosca-alternada | 26,9 % — tranco, assimétrico |
| 12 | ponte-gluteo | 26,5 % — contato desliza |
| 13 | rosca-inclinada | 26,1 % — tranco |
| 14 | flexao-bola | 25,6 % — contato desliza, tranco |
| 15 | panturrilha-b | 21,6 % — contato desliza, tranco, assimétrico |


## O que o motor não permite medir

- Dobra do punho sem sinal (flexão ou extensão): só existe o ângulo entre os dois segmentos. Não há máximo observado para ele aqui.
- Não há modelo de pé separado do tornozelo: a dorsiflexão usa o vetor tornozelo→dedo (toe) e a flexão plantar vem do mínimo desse mesmo ângulo.
- Torção do antebraço (pronação/supinação), rotação do quadril e abdução do ombro não existem como ângulo: o ombro é medido só como o ângulo entre o braço e o tronco.
- Colisão entre corpo e equipamento não é medida (só o chão em y = 0 para pontas do pé, calcanhar, pegada e joelho).
- Cabo e elástico: `_cab` guarda só o menor comprimento por quadro; como cada id é chamado uma vez por quadro, o valor por quadro é o comprimento. Fita: só há min e max por quadro, e a variação usa a fita mais longa.
