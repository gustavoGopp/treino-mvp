# Lote C1 · Mesa flexora (deitado) (`mesa-flexora`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado de bruços na mesa flexora, com o joelho no eixo da máquina e o rolo logo acima do calcanhar; os joelhos dobram até o rolo chegar perto do glúteo e voltam até as pernas quase estenderem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/mesa-flexora.md`. Cartão do app: `src/conteudo/exercicios/mesa-flexora.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/mesa-flexora.json`.
- Animação: `src/engine/novo/exercicios/mesa-flexora.ts`. Regras medidas: `src/engine/novo/regras/mesa-flexora.ts`.
- A máquina (peça nova): `src/engine/novo/pecas-de-cena/mesa-flexora.ts`, medidas em `src/engine/novo/dados/objetos/mesa-flexora.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-mesa-flexora.png`.
- Quadros grandes: `../quadros/mesa-flexora.png`. **Sem folha** ao lado da animação de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras (consenso, `nsca2021`, não verificado). O que ela não dá em número saiu da flexão de joelho com elástico aprovada (deitado de bruços, a mesma técnica: o joelho quase estendido a 12°, a lombar, o ritmo, o erro do quadril) ou é de desenho, com o motivo na ficha de movimento. **O corpo não é posto a olho no estofado:** os joelhos ficam na linha do eixo (o joelho alinhado com o eixo, a ficha); a coxa gira em volta do joelho e a bacia inclina até a pele da coxa e da frente da bacia encostar no estofado das coxas e a da barriga e do peito encostar no estofado do peito (1 cm de amassado), medido na superfície do Boneco. **O rolo também não:** a distância dele à canela é a que deixa a pele encostada nele (0,3 cm de amassado), medida na pele, 3 cm acima do centro do tornozelo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de bruços, quadril apoiado | consenso | a coxa e a frente da bacia ficam a −1 cm do topo do estofado das coxas, a barriga e o peito a −1 cm do topo do estofado do peito (negativo = afunda no estofado; a parte de cima do peito fica de 2 a 4 cm acima, porque o tórax é mais curvo que a barriga); a bacia não se mexe (0 cm). O quadril fica dobrado 13° (a dobra do estofado); a lombar fica 16° menos curva que em pé | sim |
| O joelho alinhado com o eixo da máquina | consenso | o centro de cada joelho fica a 0 cm da linha do eixo, o ciclo todo | sim |
| Mãos nos pegadores | consenso | as mãos fecham nos pegadores, à frente e abaixo da ponta do estofado do peito (0 cm), com o cotovelo dobrado 94° | sim |
| Rolo ajustado logo acima do calcanhar | consenso | o rolo encosta atrás da perna, 1,1 cm acima do centro do tornozelo (no tendão), a −0,3 cm da pele (amassa o estofado do rolo), o ciclo todo | sim |
| Pés relaxados, pernas quase estendidas | consenso | o joelho começa dobrado 12°; o pé fica solto, 30° além do ângulo reto com a canela | sim |
| Dobra os joelhos até o rolo chegar perto do glúteo, sem levantar o quadril | consenso | o joelho vai a 125° (a ficha não dá o ângulo; a média de referência é 140°); no fim, o rolo fica a 9,4 cm do glúteo; a bacia não sai do lugar | sim |
| Volta ~2–3 s até as pernas quase estenderem | consenso | dobra em 1,1 s, pausa de 0,4 s, volta em 2,5 s até 12°; o último quadro emenda no primeiro (0 cm) | sim |
| A máquina funciona (o cuidado 13) | consenso | a alavanca gira com a canela (diferença de 0°); as placas do pino sobem 21,7 cm, exatamente o arco do came (raio de 11 cm × ângulo girado) | sim |

**Conferência automática (`node scripts/animacao-nova/conferir.mjs mesa-flexora`): 0 falha, 2 avisos.** (1) As linhas da ficha de movimento que são escolha de desenho (`lombar`, `cervical`, `estofado.amassa`, `quadro.ate`, `rolo.amassa`, `placas`). (2) O modo Músculos abre de cima (posteriores: 596 cm²); de lado, o músculo quase não aparece (67 cm²), porque os posteriores ficam na parte de trás da coxa, virada para cima.

## As vistas

- **De lado** (padrão do modo Técnica): mostra o joelho no eixo (o came atrás dele), o rolo acompanhando a canela, o quadril no estofado e a pilha subindo atrás da cabeça.
- **De cima** (padrão do modo Músculos, 596 cm²): os posteriores das duas coxas e o rolo atravessado sobre as pernas.
- De três quartos por trás (`quinaTras`), a torre e o estofado ocupam o quadro; ficou fora das duas vistas.

## Erros (os do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Levantar o quadril | de lado | o quadril sobe 9 cm do estofado (o joelho fica no eixo e a coxa gira em volta dele); a bacia vira 28° para a frente e a lombar arqueia o mesmo tanto, com o peito no estofado; no fim, o quadril mede 56° de flexão (o certo: 13°) |
| Rolo no lugar errado | de lado | o rolo regulado no meio da panturrilha (a 55% da canela, a 26 cm do eixo; o certo fica a 41 cm), e não logo acima do calcanhar. O corpo faz o movimento certo, por isso o desenho não pinta parte do corpo de vermelho (como no erro do elástico no pescoço, aprovado): a linha vai do joelho ao tornozelo e o ponto marca o tornozelo, onde o rolo devia estar |

**Sem desenho:** "Volta solta" ("deixar a placa cair perde a parte alongada") é erro de ritmo: a pose é a mesma do movimento certo, só mais rápida na volta. Não inventei consequência; o guia mostra o movimento certo com o texto do erro, como o "Soltar a volta" do supino entre as torres. Quem integra põe a exceção em `SEM_DESENHO` do teste da ponte.

## O equipamento

A mesa flexora é peça nova (folha `folha-mesa-flexora.png`). O tamanho total vem das fichas da Life Fitness SS-LC (159 × 106 × 148 cm), da Hammer Strength HS-LC, da Movement Next e da Precor RSL0606; a espessura dos estofados (6,5 cm) e a frase do estofado inclinado que alinha o joelho com o eixo, da Precor. A dobra no quadril (o das coxas sobe 20°, o do peito desce 10°), a altura do eixo (64 cm) e o resto de dentro da máquina são de desenho. O came, a alavanca, o rolo e a pilha têm as medidas da cadeira flexora aprovada e são desenhados do mesmo jeito; a cadeira flexora não mudou (nem o desenho, nem o preparo). No quadro, a torre de 148 cm é cortada pela borda em 112 cm (como a torre da polia).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). O cartão de hoje da mesa flexora se confundia com o da panturrilha sentada (`diagnostico/objetos-de-hoje.md`, par 9): a peça nova tem a torre, a dobra e a alavanca do joelho, e a folha mostra os dois cartões lado a lado.

## O que não ficou bom

- **A dobra do estofado é mais marcada que a do cartão de hoje** (20° no das coxas, contra uns 10° no cartão). Com 10°, a barriga do Boneco ficava no alto da dobra e o peito não deitava no estofado (só deitava com a lombar dobrando 60°, uma corcunda). Nenhuma ficha dá o ângulo.
- **A parte de cima do peito fica de 2 a 4 cm acima do estofado** (o tórax do Boneco é mais curvo que a barriga); de lado, lê-se como o peito apoiado.
- **A torre fica atrás da cabeça e dos braços, na vista de lado.** No meio do estofado ela ficava atrás do quadril e os rótulos caíam sobre ela; na ponta da frente, os rótulos ficam livres, mas a cabeça e as mãos se desenham na frente dos montantes.
- **No modo Trajetória, os nomes "rolo" e "calcanhar" ficam um sobre o outro** (os dois caminhos andam juntos, a 6 cm um do outro).
- **O erro do rolo não pinta o corpo de vermelho:** o que erra é a regulagem da máquina.
