# Relatório: supino inclinado, ponte com os pés na bola, nórdico e remada apoiada

Ramo: `worktree-agent-a4d58eedeff02b1fd`, a partir de `d538233`. Entreguei os quatro. Commits: `edb94a5` (supino inclinado), `2da1db6` (ponte com os pés na bola), `4883070` (nórdico), `3d3a324` (remada apoiada) e o commit deste relatório (o último do ramo). Não fiz push. A conferência oficial (corpo do homem) dá 0 falha nas quatro e em todas as outras animações; `npm run check` passa. Conferi também o corpo da mulher. O que deu nela está abaixo.

## 1. `supino-inclinado` (lote 3)
- **Conferência:** 0 falha, 2 avisos: as linhas de desenho da ficha e a vista de lado, que não serve ao modo Músculos (de cima: 455 cm²; de lado: 84 cm²). Na mulher: 0 falha.
- **Como ficou:** banco a 30°, com o ângulo num rótulo ("encosto ~30°: um terço entre deitado e sentado") e uma marca no banco, de lado: a linha do chão tracejada a partir da dobradiça, o arco e "30°". Glúteo, costas e cabeça apoiados (o estofado amassa de 0,7 a 1 cm), cotovelos a 45° do tronco, medidos no plano das costas (regra nova, porque a do supino reto mede visto de cima), antebraço vertical (0°). Halter de 25 lb: no topo, os dois ficam a 2,5 cm um do outro, porque o braço abre o que for preciso (9° no homem). O halter fica a 8 cm do ombro e a 8,6 cm do peito.
- **O que não ficou bom:** o rótulo do encosto ocupa cinco linhas (o lado do encosto é estreito); de lado, embaixo, o halter de perto passa na frente do queixo (é a geometria, sem contato); a marca "30°" é pequena e fica junto da haste (`quadros/supino-inclinado.png`, "lateral:tec:f0" e "f1").
- **Risco:** baixo a médio, pelo rótulo comprido.
- **Provisórias:** `apoio.amassa` (1 cm), `cervical.min` (−15°), `pes.aFrente` (52 cm), `braco.topo.abre` (9° no mínimo), `halteres.folgaNoTopo` (2,5 cm); os erros (cotovelo a 85°, punho a 40°, quadril sobe 12 cm com a lombar a −14°).

## 2. `ponte-pes-bola` (lote 6)
- **Conferência:** 0 falha, 3 avisos: dorsiflexão de 27,2° (o pé gira metade do giro da canela); as linhas de desenho; os posteriores em "só ajuda", que é a correção `SO_AJUDA`. Na mulher: 0 falha.
- **Como ficou:** a bola parada (0 cm). O calcanhar não sai do lugar na bola (o pé rola 2,8 cm). Ombros, quadril e joelhos ficam em linha no topo (180°), e embaixo o glúteo fica a 2,4 cm do chão. Costas e cabeça no chão. A altura da bacia e a dobra do pescoço foram suavizadas: o núcleo dava trancos de até 42% na cabeça.
- **O que não ficou bom:** o joelho dobra ~39° no topo (até 42° no meio da subida), e a ficha diz "joelhos um pouco dobrados" (`quadros/ponte-pes-bola.png`, "lateral:tec:f1"). É a conta, com a bola de 65 cm parada e o quadril quase no chão embaixo: para dobrar menos, a perna teria de ficar mais que estendida embaixo. A animação de hoje faz o mesmo. De três quartos, a bola ocupa um terço do quadro.
- **Risco:** médio (o joelho).
- **Provisórias:** `pe.angulo` (10°), `bola.alemDoCalcanhar` (14 cm), `pe.acompanha` (0,5), `pe.afundaNaBola` (1 cm), `bracos.alcance`, `ombro.z`; `joelho.baixo` (10°) e `quadril.folgaEmbaixo` (2,5 cm), sem número na ficha; os erros.

## 3. `nordico` (lote 6)
- **Conferência:** 0 falha, 4 avisos: flexão plantar de 73,8° (o peito do pé esticado, de quem está ajoelhado com o calcanhar preso); pronação de 94,4° na mão espalmada no chão; as linhas de desenho; de três quartos, o principal quase não aparece (o modo Músculos fica de lado). Na mulher: 0 falha.
- **Como ficou:** peça de cena nova, o sofá (`pecas-de-cena/sofa.ts`), com as medidas da ficha pública do IKEA HYLTARP em `dados/objetos/sofa.json` (altura livre debaixo dele: 14 cm). O calcanhar aperta 0,5 cm a parte de baixo do sofá, 7 cm para dentro da borda. O colchonete da tabela vai dobrado ao meio sob os joelhos e as canelas. Corpo reto (178,4°), girando em volta dos joelhos até 61° em 3,8 s. As mãos esperam na frente do peito, tocam o chão e amortecem, como numa flexão. A volta foi dividida em duas fases no toque das mãos, porque o cotovelo dava tranco.
- **O que não ficou bom:** na mulher, o calcanhar fica 0,5 cm abaixo da parte de baixo do sofá, encostado mas sem apertar: a regra aceita até 1 cm de folga, a tolerância de contato das outras regras. De três quartos, o sofá (232 cm) ocupa metade do quadro. O fio de "calcanhares presos" desce por cima do sofá. Do sofá, só o braço do lado de lá é desenhado, e os pés dele são pintados atrás do corpo.
- **Risco:** médio (o sofá é desenho novo e grande na vista de três quartos).
- **Provisórias:** do sofá, `almofadaEsp` (14 cm) e `peLado` (4 cm), com fonte `a-conferir`; da ficha, `almofada.amassa`, `calcanhar.sobOSofa`, `calcanhar.aperta`, `maos.aparam`, `maos.alcance`, `maos.aFrente`, `embaixo.giro`, e os erros.

## 4. `remada-apoiada` (lote 4)
- **Conferência:** 0 falha, 2 avisos: as linhas de desenho e a vista de lado, que não serve ao modo Músculos (fica a de três quartos, de trás). **Na mulher: 2 falhas.** O queixo fica 2,1 cm antes da ponta: com as pernas mais curtas, o peito desce no encosto até o pé alcançar o chão. E a cabeça do halter fica 0,1 cm dentro do antebraço, junto ao punho.
- **Como ficou:** o banco girado (o encosto sobe para onde a pessoa olha), a 45°, com o encosto da tabela. O banco passa entre as pernas, e os pés ficam no chão dos dois lados, na ponta dos pés, com o joelho a 15° (como a animação de hoje, que põe os pés a 24 cm do meio; aqui, 34 cm). O tronco fica 8° mais deitado que o encosto: o peito apoia (1 cm), o queixo passa 10,2 cm da ponta e as coxas não encostam no banco (0,6 cm de folga). O cotovelo vai a 28° para fora, porque com 16° o halter entrava na lateral do encosto.
- **O que não ficou bom:** os pés ficam dos lados do banco, e a ficha diz "atrás": atrás do assento, as pernas atravessariam o encosto. As duas falhas na mulher, e o encosto a 40°, 35° e 30° não resolvem. O tronco mais deitado que o encosto deixa a barriga 2,2 cm acima do estofado.
- **Risco:** médio (no homem fecha e se lê bem; na mulher, duas regras falham).
- **Provisórias:** `tronco.maisDeitado` (8°), `apoio.amassa`, `pes.meiaDistancia` (34 cm, abre mais se a perna encostar no banco), `pes.calcanhar` (40°), `cervical`, `cabeca`, os do braço e da escápula (os das outras remadas, com o fim a 28° para fora) e os erros.

## Arquivos comuns que mexi (todos com campo opcional; sem ele, nada muda)
- `pecas-de-cena/banco-regulavel.ts`: `marcaDoAngulo` (a marca do ângulo, para o supino) e `sobe` (meia volta do banco, para a remada), com `noBanco` e `direcaoNoBanco`. Quando o banco está girado e a câmera olha de trás da pessoa, o encosto é pintado atrás do corpo. Os quadros do `desenvolvimento` e da `rosca-inclinada` saíram iguais byte a byte, e a conferência deles não mudou.
- `exercicios/remada.ts` (o núcleo do colega do lote 4): `folgaExtra` em `OpcoesDaRemada`, uma folga a mais que os braços que puxam respeitam, aqui a do halter até o banco. As outras quatro remadas continuam com 0 falha.
- Os três registros (uma linha por exercício, regra e objeto).
- Não mexi em `pecas.ts`, `equipamento.ts` nem no desenho do corpo. Não incluí os arquivos gerais regenerados.
