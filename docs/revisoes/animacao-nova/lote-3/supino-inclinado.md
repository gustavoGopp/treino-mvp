# Lote 3 · Supino inclinado com halteres (`supino-inclinado`)

De 15/11/2026. Pedido em especial pelo Gustavo (`../pedidos-ao-conteudo.md`, item 3): o encosto a ~30°, com o ângulo escrito num rótulo e a dica do app para achar o encaixe sem transferidor ("um terço do caminho entre deitado e sentado"). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/supino-inclinado.md`; o ângulo do banco, `docs/pesquisa/08-tecnica-guia.md`, conclusão 3; os cotovelos, conclusão 4.
- Ficha de movimento: `src/engine/novo/dados/movimentos/supino-inclinado.json`.
- Animação: `src/engine/novo/exercicios/supino-inclinado.ts`.
- Banco: `src/engine/novo/pecas-de-cena/banco-regulavel.ts`, com um campo opcional novo, `marcaDoAngulo` (ver "O equipamento").
- Regras medidas: `src/engine/novo/regras/supino-inclinado.ts` (`supino-inclinado-encosto-30`, `supino-inclinado-apoiado-no-banco`, `supino-inclinado-cotovelos-30-60`, `supino-inclinado-cotovelo-abaixo-do-tronco`, `supino-inclinado-halteres-nao-batem`); usadas como estão: `antebraco-na-vertical` e `halter-sobre-o-ombro-no-topo` (`conferir.ts`) e `carga-livre-do-corpo-e-do-banco` (`regras/remadas.ts`).
- Folha ao lado da de hoje: `../prototipos/folha-supino-inclinado.png`. Quadros grandes: `../quadros/supino-inclinado.png`.

## Como cada quadro é resolvido

- **Sentado e apoiado** (o mesmo método da rosca inclinada): o encosto a 30°. A bacia desce até a nádega e o alto da coxa (até 18 cm do quadril) apoiarem no assento e vai para trás até o sacro apoiar no encosto; o tronco inclina para trás em volta do quadril até as costas apoiarem; o pescoço dobra para trás até a nuca apoiar (no máximo 15° além da curva de repouso). O estofado amassa 1 cm. Só a nádega e o alto da coxa contam no assento porque, no corpo da mulher (pernas mais curtas), a coxa desce para o joelho e passa da borda do assento, e a busca da altura do quadril se perdia.
- **O braço:** embaixo, o úmero fica a 45° do eixo do tronco (para os pés), medido no plano das costas, e 12° abaixo dele; no topo, quase na vertical do mundo, aberto para fora o mínimo de 9° ou o que for preciso para as cabeças de dentro dos dois halteres ficarem 2,5 cm uma da outra (com os ombros mais estreitos da mulher, abre mais: o halter fica a 5,9 cm da vertical do ombro no homem e a 7,8 cm na mulher). Entre os dois, a direção gira pelo caminho mais curto. O antebraço fica sempre na vertical do mundo.
- **A pegada:** palmas giradas 25° uma para a outra; escápulas 9° para trás e 4° para baixo (os mesmos do supino reto).
- **O halter:** o sextavado de 25 lb da tabela (33 cm). O de 10 lb ficava pequeno para um supino; com o de 25 lb, os halteres não se batem (a abertura do topo se ajusta) e não encostam no ombro nem no peito.

## O que a fonte pede × o que o boneco faz (medido) × confere?

Medidas no corpo do homem; entre parênteses, no da mulher (a conferência roda nos dois).

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Encosto a ~30° (aceitável de 15° a 45°) | um estudo | encosto a 30°; a linha do quadril ao ombro fica a 21,6° (22,2°), porque o quadril fica mais alto que o estofado e o ombro mais perto dele | sim |
| Glúteo, costas e cabeça apoiados a série toda | consenso | o estofado amassa 1 cm sob as costas, 0,7 cm (1 cm) sob a nuca e 1 cm sob a nádega, em todos os quadros; a pelve e os pés não saem do lugar (0 cm) | sim |
| Pés firmes no chão, um pouco mais abertos que o quadril | consenso | bola do pé a 22 cm do meio, 52 cm à frente do quadril, calcanhar no chão | sim |
| Antebraço na vertical | consenso | desvio máximo de 0° | sim |
| Cotovelos a ~30–60° do tronco | consenso | 45°, medido no plano das costas (a regra do supino reto mede visto de cima, o que, com o tronco inclinado, distorce o ângulo; por isso a regra própria) | sim |
| Topo: halteres sobre os ombros, cotovelos quase estendidos | consenso | o halter fica a 5,9 cm (7,8 cm) da vertical do ombro; o cotovelo dobra 11° (16°) | sim |
| Embaixo: halteres na altura do peito, cotovelos um pouco abaixo da linha do tronco | consenso | o braço fica 12° abaixo do plano das costas; o halter, 5,4 cm (4,4 cm) abaixo da linha dos ombros, ao longo do tronco; o cotovelo dobra 118,5° (119°) | sim |
| Sem bater um halter no outro | consenso | folga mínima de 2,5 cm entre as cabeças, no topo | sim |
| O halter não bate no ombro, no peito nem no banco | consenso | 8 cm (5,1 cm) do braço e 8,6 cm (6,2 cm) do peito; o mais perto é o antebraço, ao lado da mão, a 0,4 cm (0,1 cm), que é onde a cabeça do halter fica; 16,8 cm do banco | sim |
| ~2–3 s descendo, ~1–1,5 s subindo, pausa curta embaixo | consenso | 2,5 s, 1,3 s, pausas de 0,6 s e 0,45 s; maior salto de velocidade 4,6% (4,4%) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs supino-inclinado`): **0 falha, 2 avisos** (nos dois corpos): as linhas de desenho da ficha de movimento (`apoio.amassa`, `cervical.min`, `pes.aFrente`, `braco.topo.abre`, `halteres.folgaNoTopo`, `carga`) e a vista de lado, que não serve ao modo Músculos (de cima 455 cm² do peitoral; de lado 84 cm²): o modo Músculos fica de cima.

## O ângulo do encosto

- **Rótulo** (de lado): "encosto ~30°: um terço entre deitado e sentado", com o fio até a lombar (o fio cruza só o estofado, do lado do encosto). É a dica que o texto do app já usa.
- **Marca no banco** (de lado): da dobradiça sai uma linha tracejada na horizontal, um arco até o encosto e o número "30°". A marca só aparece quando o banco está de perfil (de cima ou de frente o arco viraria um traço), e aparece em todos os modos.
- **O número do furo** ("nível 2, 3, 4") não entra: não é padronizado entre fabricantes (`../pedidos-ao-conteudo.md`, item 3).

## As vistas

- **De lado** (padrão da técnica): o encosto e o ângulo, o antebraço na vertical (com o prumo), a descida até o peito.
- **De cima:** o ângulo dos cotovelos (a "seta", e não o "T") e os dois halteres; padrão do modo Músculos (o peitoral inteiro aparece). Testei a de três quartos (`quina`): o banco se lê melhor, mas o ângulo dos cotovelos some e o peitoral aparece menos.

## Erros

| Erro (texto do app) | Vista | O que o boneco faz |
|---|---|---|
| Cotovelos abertos a ~90° | de cima | embaixo, o braço vai a 85° do tronco (o "T") |
| Punho dobrado para trás | de lado | o punho dobra 40° para trás e o halter fica atrás da linha do antebraço, para o lado da cabeça |
| Quadril sai do banco | de lado | o quadril sobe 12 cm (e anda 3 cm para os pés) e a lombar arqueia 14°; o tronco gira em volta das costas apoiadas: a base do pescoço não escorrega no encosto, e o tronco fica 4° mais plano |

## O equipamento

- **Banco regulável:** a peça única (`pecas-de-cena/banco-regulavel.ts`), com o encosto a 30°. Mudança aditiva: o campo opcional `marcaDoAngulo` na interface `BancoRegulavel`, que desenha a marca do ângulo. Sem o campo, o desenho é o de antes: os quadros do `desenvolvimento` e da `rosca-inclinada` saíram iguais byte a byte, e a conferência de todas as animações continua sem falha.
- **Halter:** o sextavado de 25 lb da tabela, pelo campo `objeto` da peça.

## Correções já feitas que esta animação respeita

- O ângulo do cotovelo vale 30–60° (`../pedidos-ao-conteudo.md`, item 1), e não 30–70° como o rótulo de hoje.
- A cabeça apoiada no banco (pedido do Gustavo para o supino reto, 15/11): aqui ela apoia no encosto, com a nuca no estofado.

## Músculos

Peitoral (principal), frente do ombro e tríceps (secundários). O texto do app diz "parte de cima (porção clavicular)": o desenho não separa as partes do peitoral (`dados/musculos.json`, `naoSepara`), então o peitoral inteiro fica realçado.

## O que não ficou bom

- **O rótulo do encosto ocupa cinco linhas** (`quadros/supino-inclinado.png`, "lateral:tec:f0"): o lado do encosto é estreito no quadro, e o texto quebra em linhas curtas. Tentei encurtar ("encosto ~30°", sem o "a"); mais curto que isso perde a dica do app.
- **De lado, embaixo, o halter de perto passa na frente do queixo** ("lateral:tec:f1"): é a geometria do supino inclinado (antebraço na vertical, halter ao lado do alto do peito, tronco inclinado), e não um contato: o halter fica a 8,6 cm do peito. Passei os cotovelos de 50° para 45° do tronco, o que desceu o halter 2 cm ao longo do tronco.
- **A marca "30°" fica junto da haste do encosto** e é pequena: dá para ler, mas não salta aos olhos.
