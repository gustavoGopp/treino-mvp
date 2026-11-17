# Lote 6 · Correção das flexões de joelho deitado (deslizante e com elástico)

De 15/11/2026, pedida por quem integra depois do aviso do Gustavo sobre a qualidade. Ramo `worktree-agent-a3ddf5adc5d32b588`, sobre o `3effee9`. Commits: `44ec3d4` (deslizante), `cdd49b7` (elástico) e o deste relatório. Sem push.

Passei os nove itens da seção 8 do guia nos quadros grandes regenerados (com o corpo novo na cintura), com cor de pele e tema escuro. `npm run conferir:animacao`: nenhuma falha em nenhuma animação. `npm run check`: lint e tipos ok; os 896 testes passam (rodando a suíte inteira sozinha; com a máquina carregada, três testes pesados do gerador estouraram o tempo de 5 s e passaram ao repetir).

## Flexão de joelho deslizante (`44ec3d4`)

O que mudou:
- **Segunda vista:** `quinaTras` → `quina` (três quartos, de frente, como na flexão na bola). Testei `quina`, `cima` e `quinaTras`: de cima o corpo vira uma figura em pé, sem a ponte; de trás ele é visto pela cabeça. Na `quina` o principal aparece (41 cm²), e o aviso de músculo que não aparecia saiu.
- **Rótulos:** três → dois ("quadril fora do chão", "calcanhar no glúteo"). Saiu "ombros, quadril e joelhos em linha", que aparecia no começo, quando o corpo ainda não está em linha (a regra `em-linha-no-fim` continua medindo: 177°).
- **Erro "arquear a lombar":** refeito. A bacia fica na inclinação do certo e a lombar arqueia 15°: a bacia sobe 9,5 cm a mais que no certo e sai da linha ombro–joelho (ombro–quadril–joelho a 163°, contra 177° no certo). A linha do erro passa por ombro, bacia e joelho; a do certo, tracejada, fica reta. Quadro parado no fim, onde a diferença é maior.
- **Toalha:** dobrada em quatro no comprimento (40,6 × 19 cm, 2 cm de altura, com as duas metades da dobra desenhadas), em azul-petróleo, que se separa do chão cinza nas duas vistas e no tema escuro.

Conferência automática: 0 falha, 1 aviso (as escolhas de desenho da ficha).

O que ainda não ficou como eu queria: no fim, o calcanhar fica a uns 18 cm da pele do glúteo (`quadros/flexao-joelho-deslizante.png`, terceiro quadro). Tentei 130° de joelho: o calcanhar chega mais perto, mas a coxa dá um salto de velocidade (30% do pico, falha de ritmo); voltei a 120°.

**Risco de o Gustavo não gostar: baixo.**

## Flexão de joelho com elástico (`cdd49b7`)

O que mudou:
- **Enquadramento:** a porta, a âncora e o tubo além de 30 cm do tornozelo viraram cenário (pintados atrás do corpo e fora do enquadramento); o tubo sai pela borda do quadro em direção à porta. O corpo deitado passa a ocupar a largura do quadro, como a deslizante e a flexão na bola.
- **Pose de bruços:** o tórax ficava inclinado 11° para cima, com os ombros a 27 cm do chão. Agora a lombar achata 10° e as escápulas vão 20° à frente: o peito e a frente da bacia encostam juntos no colchonete, o tórax fica deitado reto e o centro do ombro fica a 18 cm do chão. A testa continua no dorso das mãos, com os cotovelos para fora.
- **Pegador:** o pé fica enfiado no pegador. A pegada atravessa a frente do tornozelo, 4 cm acima do centro dele, e a fita dá a volta pelos lados até a ponta do tubo, que sai de trás (peça nova `pecas-de-cena/pegador-no-tornozelo.ts`, com as medidas do pegador da tabela).
- **Porta:** ganhou batente (dois montantes e a travessa, em madeira) e maçaneta (roseta e alavanca), no gerador realista. Como é cenário, aparece só cortada na borda; de cima, nem entra.
- **Rótulos:** três → dois ("quadril no chão", "calcanhar no glúteo").
- **Erro "dar tranco":** a folha mostra o erro no começo ou no fim da subida, e nos dois o quadro era igual ao certo. Agora o quadro parado é o fim: no embalo, os calcanhares passam do fim (joelho a 135°, 115° no certo) e a bacia descola 4 cm do colchonete.

Conferência automática: 0 falha, 3 avisos: (1) o elástico fica mais esticado no fim, como a ficha pede, e a conferência comum espera o contrário (a regra própria `elastico-estica-mais-no-fim` dá ok); (2) as escolhas de desenho da ficha; (3) de lado, os posteriores aparecem pouco (67 cm²): a vista padrão do modo Músculos é a de cima (645 cm²).

O que ainda não ficou como eu queria:
- O item Ritmo sai "sem movimento": a conferência comum não acompanha a canela, que é a única parte que se mexe. O ritmo deste exercício não é medido.
- A testa apoia no dorso das mãos lado a lado, e não nos antebraços cruzados (cruzados, o corpo ficaria assimétrico e a simetria falharia).
- De lado, no começo, o pegador sob o tornozelo aparece pequeno, como um traço com um ponto (`quadros/flexao-joelho-elastico.png`, primeiro quadro); de cima ele se lê bem.

**Risco de o Gustavo não gostar: médio.** A troca do poste da animação aprovada pela porta com âncora continua, e a pose de bruços com a testa nas mãos é nova no motor.

## Arquivos comuns e núcleo

- `exercicios/flexao-joelho.ts` (núcleo): só acréscimos opcionais em `OpcoesDeBrucos` (`lombar`, `prot`), usados só pelo `deitadoDeBrucos`; sem eles, o resultado é o de antes. `ponteDeCostas` não mudou.
- `regras/flexao-joelho.ts`: só o texto da regra `elastico-atras-dos-tornozelos` (o que mede é a ponta do tubo, atrás do tornozelo).
- Nenhum outro arquivo comum, script ou registro foi mexido. Os arquivos gerais regenerados foram desfeitos antes dos commits.

## Medidas provisórias novas

`toalha.esp` passou de 0,4 para 0,5 cm por camada (continua provisória). Na porta: `batenteLarg` 7 cm, `batenteProf` 10 cm, `macanetaAltura` 105 cm, `macanetaDaBorda` 6 cm, todas provisórias (`a-conferir`). Na ficha do elástico: `lombar.deitado` 10°, `escapulas.protracao` 20°, `elastico.noQuadro` 30 cm, `erro.tranco.alem` 20°, `erro.tranco.quadril` 4 cm (escolhas de desenho).
