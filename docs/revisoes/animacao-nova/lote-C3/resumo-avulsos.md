# Lote C3 · Avulsos: resumo (a máquina de abdominal, a tornozeleira e quatro animações)

De 18/11/2026. As últimas animações da fase C deste grupo: o abdominal na máquina, o coice e a abdução na polia com a tornozeleira e a remada invertida (antes, só cartão de texto). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## As peças

### A máquina de abdominal (`pecas-de-cena/abdominal-maquina.ts`, `dados/objetos/abdominal-maquina.json`)

Folha: `docs/revisoes/animacoes-restantes/pecas/folha-abdominal-maquina.png` (`node scripts/animacao-nova/folha-pecas.mjs abdominal-maquina`).

- **Medidas com fonte:** 133 × 117 × 148 cm (Life Fitness SS-AB, manual público Insignia, p. 8; a mesma da pesquisa, LF-HS26); Hammer Strength HS-ABC 158 × 89 × 143, Movement 141 × 114 × 146, Technogym MK83 139 × 103 × 140 (pesquisa, seção 13.1); estofados de 6,5 cm (Precor). **Como funciona, do manual da Life Fitness:** o assento regula para o apoio da lombar ficar na lombar; as mãos nos pegadores só guiam; as almofadas sobre o peito, num braço que gira num eixo atrás e ao lado da lombar.
- **Derivadas do corpo:** o assento a 40,3 cm (a coxa na horizontal, os pés no chão, o joelho a 90°); o apoio da lombar encostado nas costas; **o eixo no polo da rotação do tórax** do começo ao fim do abdominal (26,1 cm acima do centro do quadril, 3,6 cm atrás dele); as almofadas sobre o peito; os pegadores à frente do peito, logo abaixo das almofadas; as hastes por fora dos cotovelos de quem treina (45,8 cm do meio) e à frente do peito; os rolos sobre o peito do pé.
- **De desenho:** o assento, o apoio da lombar, as almofadas (16 × 9 cm, 15 cm entre os centros), os pegadores, os rolos, o came (20 cm), a pilha, os tubos.
- **Funciona:** o braço inteiro (as hastes, as almofadas e os pegadores) gira no eixo, o came enrola o cabo e as placas sobem o arco do came (7,2 cm em 42°).
- **Diferente do cartão de hoje:** o cartão gira o braço num eixo alto, atrás da cabeça, e não tem o apoio da lombar.

### A tornozeleira (`pecas-de-cena/tornozeleira.ts`, `dados/objetos/tornozeleira.json`)

Folha: `docs/revisoes/animacoes-restantes/pecas/folha-tornozeleira.png`.

- **Medidas com fonte (páginas públicas, 18/11/2026):** Gymreapers Ankle Straps: faixa de 10 × 4 pol (25,4 × 10,2 cm), neoprene de 7 mm, argola em D de aço, velcro. Power Systems 50760: 2 × 16 pol, nylon com neoprene, argola em D, velcro.
- **Derivada:** fechada no tornozelo da tabela (21,9 cm), sobram 3,5 cm de velcro.
- **De desenho:** 2 cm acima do centro do tornozelo (como a caneleira aprovada); a tira de velcro de 4 cm.
- **Provisórias (`a-conferir`):** a argola em D (5 × 3,6 cm, fio de 0,6 cm) e o mosquetão (8 cm): nenhuma ficha dá.
- O pegador do elástico no tornozelo (`pegador-no-tornozelo.ts`) não foi reaproveitado: é uma pegada rígida, e a tornozeleira é uma faixa em volta da canela. A coluna, a roldana e o cabo são os aprovados (`pecas.ts`, `equipamento.ts`, `exercicios/polia-bracos.ts`, sem mudança).

## As animações

| | Abdominal na máquina | Coice na polia | Abdução na polia | Remada invertida |
|---|---|---|---|---|
| Conferência automática | 0 falha, 1 aviso (linhas de desenho) | 0 falha, 1 aviso (linhas de desenho) | 0 falha, 2 avisos (linhas de desenho; o glúteo não aparece de frente) | 0 falha, 2 avisos (ritmo 17,1%; linhas de desenho) |
| Vistas | de lado e de três quartos | de lado e de três quartos, por trás | de frente e de trás | de lado e de três quartos, por trás |
| Erros desenhados | puxar com os braços; só dobrar o quadril | arquear a lombar; dobrar o joelho; embalar | inclinar o tronco; girar o pé para fora | quadril caído; puxar com o queixo; descida solta |
| Erros sem desenho | nenhum | nenhum | **embalar a perna** (ritmo; como o "Balançar a perna" da abdução com elástico, que já está em `SEM_DESENHO`) | nenhum |
| Conferência escrita | `abdominal-maquina.md` | `coice-polia.md` | `abducao-polia.md` | `remada-invertida.md` |
| Quadros grandes | `../quadros/abdominal-maquina.png` | `../quadros/coice-polia.png` | `../quadros/abducao-polia.png` | `../quadros/remada-invertida.png` |
| Risco de o Gustavo não gostar | médio | médio | médio | médio |

## Os dois lados (aviso de 18/11)

Medido nos dois lados do corpo, dentro das bordas do apoio: no abdominal, as duas almofadas no peito (−0,2 a 0,6 cm da face; cada uma cabe no peito, a no máximo 5,3 cm da pele em todo ponto até 80% das bordas, e o centro do contato a no máximo 30% do centro à borda), as duas mãos nos pegadores, os dois pés sob os rolos (dentro do comprimento deles) e os dois lados do glúteo no assento; no coice, as duas mãos nos montantes da torre; na remada, as duas mãos inteiras na barra (a 26,2 cm dos carros) e os dois calcanhares no chão. Na abdução, a mão de dentro está no trilho e a de fora na cintura (a pose aprovada da abdução com elástico); a tornozeleira e o cabo são de uma perna só. Olhei o membro de longe em cada vista declarada.

## Mudanças em arquivos comuns

Nenhuma no núcleo, nas peças comuns ou nas animações aprovadas (o preparo delas não mudou). Arquivos novos: as duas peças e os objetos, o núcleo `exercicios/polia-no-tornozelo.ts`, os quatro exercícios e as fichas de movimento, as regras `regras/avulsos-c3.ts`, mais uma linha em cada registro. `scripts/animacao-nova/folha-pecas.mjs` ganhou as seções `abdominal-maquina` e `tornozeleira`, sem mudar as outras. As regras aprovadas reusadas como estão: `polia-puxar-coluna-enrola`, as da abdução em pé, `quadril-dedos-para-a-frente`, `quadril-pernas-sem-se-atravessar`, `polia-braco-cabos-livres-do-corpo`, `polia-braco-pilha-de-cada-coluna`, `corpo-em-linha`, `calcanhares-no-chao`, `pendurado-maos-na-barra`, `pendurado-nao-atravessa-a-barra`, `barra-fixa-pegada-pronada`, `cotovelo-passa-as-costas`, `escapulas-se-juntam`.

## Pontos para quem integra

- O teste da ponte que falha ("todas as animações estão aprovadas e no catálogo") é o esperado. Pôr `'abducao-polia': ['Embalar a perna']` em `SEM_DESENHO`.
- O `dados/preparo/registro.ts` é o gerado pelo `preparo.mjs`; ele gravou só os quatro arquivos novos (com as calibrações) e as linhas do registro.
- Pedidos ao conteúdo: `pedidos-avulsos.md` (os posteriores no coice; o cartão de equipamento do abdominal).

## A revisão de 18/11 (o abdominal e o coice voltaram)

O integrador aprovou a abdução na polia e a remada invertida, e devolveu os outros dois:
- **Abdominal na máquina:** de lado, o pegador ficava na frente dos olhos. As mãos foram para a frente do peito, logo abaixo das almofadas (o manual só diz "grip handles"), e as hastes do braço da máquina sobem pelos lados, por fora dos cotovelos, e vêm à frente do peito: nada passa na altura do rosto, e a almofada de perto aparece no peito. Regra nova, nos dois lados: as hastes e os pegadores livres do corpo (0,9 cm) e da cabeça (11,1 cm).
- **Coice na polia:** o joelho que trabalha dobrava 34° no meio do chute. Agora fica em 8° o ciclo todo (a regra mede até 15° em todos os quadros): a bacia sobe 3,9° do lado que trabalha, em volta do quadril de apoio, parada, e a coluna devolve a inclinação (o tórax fica reto). O tronco mais inclinado e a perna começando mais à frente não mudam a altura do quadril, e o joelho de apoio mais dobrado a abaixa.

## O que não ficou bom (o principal; o resto em cada conferência)

- **Coice:** a bacia fica 3,9° mais alta do lado que trabalha (de trás, se percebe pouco).
- **Abdominal:** de frente, as hastes do braço da máquina passam na frente dos braços e a máquina fica larga; a peça difere do cartão de hoje.
- **Remada:** a descida solta se lê pelo braço travado e pelo ombro, não por um corpo mais baixo.
- **Tornozeleira:** argola e mosquetão provisórios; a 320 px a argola some.
