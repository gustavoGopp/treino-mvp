# Motor de animação do guia — notas técnicas

Notas para quem vai portar `guia-execucao-fase1.html` para o produto. O arquivo é único (~160 KB), em JavaScript puro, desenha em SVG e não usa bibliotecas. As fontes vêm do Google Fonts (Barlow Condensed e IBM Plex Sans). Tem tema claro e escuro, via tokens CSS em `:root`, `prefers-color-scheme` e `[data-theme]`.

## Conteúdo hoje
- 4 treinos (abas): Torso A, Membros A, Torso B e Membros B. São 26 entradas em `EX` e 25 animações únicas, porque `elevacao-lateral-b` é um clone de `elevacao-lateral` com outra prescrição.
- Para cada exercício: animação em 1 ou 2 vistas e 4 modos (Técnica, Erros, Músculos, Trajetória), controles ▶ ⏸ ⏮ e câmera lenta, faixa do tempo de cada fase, indicador de respiração (INSPIRA, EXPIRA ou FIRME), 3 cues, checklist de 5 segundos, setup, execução e tempo, amplitude, onde sentir, erros, o que varia de pessoa para pessoa, e temporizador de descanso entre séries.
- A rota do dia fica no hash: `#torso-a`, `#membros-a`, `#torso-b`, `#membros-b`.

| id | exercício | vistas | erros | polia |
|---|---|---|---|---|
| supino-inclinado | Supino inclinado com halteres | lateral + top | 3 | |
| barra-fixa | Barra fixa | posterior + lateral | 3 | |
| remada-baixa | Remada baixa com triângulo | lateral + posterior | 3 | sim |
| crucifixo-polia | Crucifixo na polia (crossover) | frontal + top | 3 | sim |
| elevacao-lateral | Elevação lateral unilateral na polia | frontal + lateral | 3 | sim |
| face-pull | Face pull com corda | lateral + top | 3 | sim |
| abdominal-polia | Abdominal na polia com corda | lateral | 2 | sim |
| goblet | Agachamento goblet com calcanhar elevado | lateral + frontal | 3 | |
| stiff | Stiff com halteres | lateral | 3 | |
| afundo | Afundo estático com halteres | lateral + frontal | 3 | |
| panturrilha | Panturrilha unilateral no step | lateral + zoom | 2 | (torre só como apoio) |
| rosca-polia | Rosca direta na polia com barra reta | lateral | 2 | sim |
| triceps-corda | Tríceps na polia com corda | lateral | 2 | sim |
| supino-reto | Supino reto com halteres | lateral + top | 3 | |
| remada-apoiada | Remada com halteres, peito apoiado | lateral + posterior | 3 | |
| desenvolvimento | Desenvolvimento sentado com halteres | frontal + lateral | 3 | |
| puxada-unilateral | Puxada unilateral ajoelhado na polia alta | posterior + lateral | 3 | sim |
| flexao | Flexão de braço | lateral + top | 3 | |
| elevacao-halteres | Elevação lateral com halteres | frontal + lateral | 3 | |
| elevacao-joelhos | Elevação de joelhos na barra fixa | lateral | 2 | |
| bulgaro | Agachamento búlgaro com apoio | lateral + frontal | 3 | (torre só como apoio) |
| flexao-bola | Flexão de joelho na bola suíça | lateral | 3 | |
| panturrilha-b | Panturrilha em pé no step | lateral + zoom | 2 | (torre só como apoio) |
| rosca-inclinada | Rosca inclinada com halteres | lateral | 3 | |
| triceps-frances | Tríceps francês na polia com corda | lateral + frontal | 3 | sim |

## Sistema de coordenadas
- Unidade em cm, com o chão em `y = 0`.
- `X` aponta para a esquerda da pessoa, `Y` para cima e `Z` para a frente da pessoa.
- As vistas ficam em `VIEWS`, e cada uma tem a sua projeção `proj(v) → [x_tela, y_tela, profundidade]`:
  - `lateral`: câmera do lado direito da pessoa, `[Z, −Y, −X]`
  - `frontal`: `[X, −Y, Z]`
  - `posterior`: `[−X, −Y, −Z]`
  - `top`: `[X, Z, Y]`
  - `zoom`: igual à lateral, com enquadramento próprio em `ex.bounds.zoom`
- `fit(ex, view)` calcula o enquadramento 4:3 automaticamente, com espaço reservado para o HUD. `ex.bounds[view] = [x0, x1, y0, y1]` sobrescreve esse cálculo.

## Corpo (`skel(pose)`)
- Medidas em `B = {lum:22, thor:29, neck:20, head:10.5, sh:19, shDrop:3, hip:9, ua:31, fa:32, th:43, sk:43, foot:17, heel:6, wrist:7}`.
- Pontos que a função devolve:
  - `P` (quadril/pelve), `M` (lombar), `N` (base do pescoço), `Hc` (centro da cabeça)
  - os eixos do tronco `uT, fT, xT`
  - para cada lado `side.R` e `side.L`: `S` ombro, `E` cotovelo, `H`/`G` mão ou pegada, `W` punho, `Hp` quadril, `K` joelho, `A` tornozelo, `toe`, `heel`
- Parâmetros de pose:
  - `P: [x, y, z]`
  - `lumbar`, `thor`, `neck`: inclinação em graus. 0 é em pé, valor positivo inclina à frente e −90 é deitado de costas com a cabeça em −Z.
  - `roll`
  - escápula: `pro`/`proR`/`proL` (protração), `elev`/`elevR` (elevação), `rotR`/`scapRot`
  - `wrist`, `wristDir`
- Braço (`armR`; `armL` espelha `armR` quando omitido), em cinco formas:
  - `{ua:[az,el], fa:[az,el]}`: cinemática direta. `az` 0 é frente, 90 é para fora e 180 é trás; `el` +90 é para cima.
  - `{ikS:[lat,y,z], poleRel}`: alvo da mão no mundo, com `lat` espelhado por lado; IK de 2 ossos.
  - `{sph:[az,el,r]}`: alvo em coordenadas esféricas a partir do ombro.
  - `{head:[...]}`: alvo relativo à cabeça.
  - `{tr:[...]}`: alvo relativo ao tronco.
- Perna (`legR`; `legL` espelha quando omitido), em duas formas:
  - `{th, sh, ft}`: cinemática direta.
  - `{ikS:[lat,y,z], poleRel, ft:[az,el], heelV}`: alvo do tornozelo. `heelV` define a posição do calcanhar em relação ao tornozelo.
- `ik2` conta as falhas de alcance em `IKFAIL`. O QA exige 0 falhas.

## Estrutura de um exercício (`EX.push({...})`)
```
id, name, short, rx, target, sets, setLbl?, setUnit?, rest:{opts:[s...], def, note?}
views:[...], base:{pose comum}, keys:{nome:{diferenças da pose}}
seq:[{path:[keys], dur, kind:'hold'|'conc'|'ecc', label, tempo, breath:'INSPIRA'|'EXPIRA'|'FIRME'}]
ext:[início, fim], extLabels, paths:{vista:[[ponto, lado, rótulo]]}
tower|towers:{x,z,ac,out,py}, noCable?, ropeAttach?, barAttach?, bounds?
equip(sk), guides:{vista(sk)}
muscles:{p:[[id,'RL'|'R'|'L']], s:[...]}, feel, feelNote
setupEq[], setupBody[], exec[[kind,título,descrição]], range[], breath, cues[3], check[5], vary, note?
errors:[{id, title, view, desc, keys:{sobrescritas por quadro}, base?}]
```
- `prep(ex)` mescla `base` com `keys` e calcula os tempos de `seq`. Cada erro é aplicado como sobrescrita das poses corretas.
- `calib(ex)` mede o comprimento do cabo e a faixa de subida da pilha de placas.
- Os ids de músculo ficam em `MUS`: pecClav, pecStern, deltAnt, deltLat, deltPost, lats, midTrap, upTrap, biceps, triceps, forearm, quads, hams, glutes, calf, erect, rectus, obliq.

## Desenho
- Primitivas 3D projetadas, todas com ordenação por profundidade e `o.layer` (0 fundo, 1 corpo e equipamento, 2 músculos e guias, 3–4 sobreposições) e `o.bias`:
  - `L3` linha
  - `PL3` polilinha
  - `PG3` polígono
  - `C3` círculo, com raio em cm
  - `BOX` caixa: envoltória convexa dos 8 vértices projetados
  - `TX` texto: `dx`/`dy` em px × `KS`, ou `o.scr` para coordenadas de tela
  - `PATH2` trajetória
  - `ARROW3` seta
- Equipamentos:
  - `dumbbell(G, direção, cls)`
  - `tower(t, subida)`: torre de polia, desenhada sempre atrás com bias −400
  - `cable` e `rope`: cabo e corda
  - `liftOf`: subida da pilha
  - `pullBar()`: barra fixa
- `scene(ex, view, mode, t, errIdx)` devolve o SVG de um quadro. Os modos são:
  - `tec`: guias
  - `err`: figura vermelha do erro sobre um fantasma verde da forma correta
  - `mus`: músculos
  - `traj`: fantasmas do início e do fim, trajetórias e seta de carga

## Interface
- `DAYS` agrupa os exercícios por treino.
- `state = {day, ex, view, mode, err, playing, slow, t}`.
- Temporizador de descanso (`RT`): mostra a faixa do programa, ±15 s, bipe via Web Audio (iniciado por toque), vibração quando o aparelho suporta, wake lock e contador de séries. As séries marcadas ficam salvas por dia em `localStorage['guia-series']`, com try/catch.

## QA
- `window.__guia = {EX, skel, poseAt, scene, VIEWS, fit, check(), sheet(ids)}`.
  - `check()` lista, por exercício e por erro, as falhas de IK e a calibração do cabo.
  - `sheet(ids)` desenha uma folha de contatos com todas as vistas × modos × quadros-chave.
- O script `qa/check-motor.cjs` roda as duas funções com o Playwright. Foi assim que cada exercício foi validado visualmente: folha de contatos → correção → nova folha.

## Limitações e pendências conhecidas
- As animações são esquemáticas (bonecos), não anatômicas. Os músculos são formas simples.
- Na remada baixa, a animação mostra a polia na altura do umbigo, mas o programa ainda diz "ponto mais baixo". A decisão está pendente.
- A barra fixa aparece como "pegada pronada" no guia, e o programa diz "neutra ou aberta".
- Dados e código estão misturados no mesmo arquivo; no produto, os dados dos exercícios devem ficar separados.
- As alternativas do programa ("Se estiver ocupado") ainda não têm animação.
