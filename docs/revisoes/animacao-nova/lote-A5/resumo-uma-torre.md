# Lote A5 · Numa torre de polia: resumo (puxada e tríceps com a barra reta, rosca de costas para a torre, pull-through)

De 18/11/2026. As quatro primeiras animações destes exercícios (antes, só cartão de texto), todas numa coluna de polia só. Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## O que foi feito

| | Puxada com barra reta (`puxada-barra-reta`) | Tríceps com barra reta (`triceps-barra-reta`) | Rosca de costas (`rosca-polia-costas`) | Pull-through (`pull-through`) |
|---|---|---|---|---|
| Posição | ajoelhado de frente, polia no alto | em pé de frente, polia no alto | em pé de costas, polia embaixo, estribo | em pé de costas, polia embaixo, corda entre as pernas |
| Conferência automática | 0 falha, 3 avisos (flexão plantar do tornozelo ajoelhado, como na puxada unilateral; linhas de desenho; o modo Músculos abre de três quartos por trás) | 0 falha, 3 avisos (pronação de 90° da pegada por cima; linhas de desenho; o modo Músculos abre de trás, como no tríceps na corda) | 0 falha, 3 avisos (supinação de 91°; linhas de desenho; o antebraço "só ajuda", como nas outras roscas) | 0 falha, 2 avisos (linhas de desenho; o modo Músculos abre de três quartos por trás) |
| Vistas | de três quartos por trás e de lado (as da puxada unilateral) | de lado e de trás (as do tríceps na corda) | de lado e de três quartos de frente | de lado e de três quartos por trás |
| Erros desenhados | os 3: deitar o tronco para trás, puxar pela nuca, volta curta | os 3: abrir os cotovelos, usar o tronco, volta curta | os 3: trazer o cotovelo para a frente, girar o tronco, carga demais (o ombro que vai para a frente, como diz a descrição do cartão) | os 3: puxar com os braços, arredondar a lombar, inclinar para trás no topo |
| Erros não desenhados | nenhum | nenhum | nenhum | nenhum |
| Conferência escrita | `puxada-barra-reta.md` | `triceps-barra-reta.md` | `rosca-polia-costas.md` | `pull-through.md` |
| Quadros grandes | `../quadros/puxada-barra-reta.png` | `../quadros/triceps-barra-reta.png` | `../quadros/rosca-polia-costas.png` | `../quadros/pull-through.png` |
| Risco de o Gustavo não gostar | médio | baixo | médio | médio |

O que mais pesa em cada risco:

- **Puxada:** a barra de 20 pol (a mesma da rosca e do tríceps, o único acessório "barra reta para polia" do app) é curta para uma puxada: com a pegada um pouco mais aberta que os ombros, as mãos chegam às pontas. De três quartos por trás o corpo fica pequeno (a coluna alta) e a barra no peito fica escondida; é o mesmo enquadramento da puxada unilateral aprovada.
- **Tríceps:** sai do tríceps na corda aprovado, trocando a corda pela barra. O que sobra é o fio de um rótulo que cruza o antebraço (como na rosca na polia aprovada).
- **Rosca de costas:** o erro "Carga demais" é sutil (o ombro anda 5 cm à frente, o que a clavícula do Boneco deixa); o fio do rótulo do cotovelo atravessa o tronco.
- **Pull-through:** os pés ficaram a 42 cm entre as bolas ("um pouco mais abertos que o quadril", que tem 32,4 cm), para a corda e as mãos passarem entre as coxas sem encostar; a cena é larga (a coluna 1,4 m atrás) e o corpo fica menor que no stiff, com o rótulo de lado acima do corpo.

## Arquivos

- Novos: `src/engine/novo/exercicios/<id>.ts` e `dados/movimentos/<id>.json` dos quatro, `dados/preparo/<id>.json`, e `src/engine/novo/regras/uma-torre.ts` (dez regras com nomes próprios da família: `puxada-barra-*`, `triceps-barra-*`, `rosca-costas-*`, `pull-through-*`).
- Uma linha por exercício em `exercicios/registro.ts` e uma em `regras/registro.ts`. O `dados/preparo/registro.ts` é regravado pelo `preparo.mjs`.
- **Mudança em arquivo comum (aditiva):** `exercicios/polia-bracos.ts` ganhou no `PedidoEmPe` o campo opcional `giro` (o giro da coluna, metade na lombar e metade na torácica, com a bacia parada), para o erro "Girar o tronco" da rosca de costas. Sem ele nada muda: o `preparo.mjs` regravado não mudou o preparo de nenhuma animação aprovada.
- Reaproveitados como estão: `dobrarOQuadril`, `alcanceDoBraco`, `maoNoAngulo`, `bracoAte` e `folgaDasPernas` (`dobrar-o-quadril.ts`); `montarEmPe`, `equilibrar`, `colunasECabos`, `estriboNaMao`, `torreComRoldanaEm`, `polegarDaPegada` (`polia-bracos.ts`); `frenteParaOPeito` (`polia-puxar.ts`); `bracoDaRosca` (`dobrar-o-cotovelo.ts`); as peças da barra reta e da corda. Nenhuma peça nem objeto novo.
- Regras que já existiam e servem, usadas como estão: as do tríceps na corda (cotovelo parado e colado, estende embaixo, tronco parado), as da polia de braço (barra na largura dos ombros, barra fora do corpo, cabos livres, pilha de cada coluna), a da corda do tríceps francês (corda na mão, corda livre), `palmas-para-baixo`, `braco-estendido-no-comeco`, `braco-estendido-embaixo-na-rosca`, `palma-para-a-frente-na-rosca`, `ombro-desce`, `tronco-quase-parado`, `lombar-neutra`, `dobra-no-quadril`, `em-pe-sem-jogar-o-tronco-para-tras`, `peso-no-meio-do-pe`, `polia-puxar-ajoelhado-no-colchonete`.

## Pontos para quem integra

- `npm run check`: só falha o teste esperado (`tests/unit/motor-novo-ponte.test.ts`, "todas as animações estão aprovadas e no catálogo"). Com a máquina carregada (outras sessões rodando ao mesmo tempo), dois testes demorados passaram do tempo, um em cada rodada: a propriedade do R1 ("dor em 1 ou 2 regiões", 6 s) e o de e-mail pessoal em `tests/repo/privacidade.test.ts` (5,9 s); rodados sozinhos, passam. Não mexi em `src/domain/` nem em `tests/`.
- `npm run conferir:animacao` (todas as animações) foi morto pela máquina (falta de memória) nesta sessão; conferi uma a uma as minhas quatro e as quatro aprovadas que usam o núcleo `polia-bracos.ts` (rosca na polia, crucifixo na polia, crucifixo invertido na polia, face pull): 0 falha. `preparo.mjs conferir`: as tabelas conferem (126 exercícios).
- Não há folha (`prototipos.mjs so-folhas` compara com a animação de hoje, que não existe).
- Em nenhuma das quatro a força do cabo entra no equilíbrio (como em todas as animações na polia).
- Primeiro quadro (calibração) no computador: puxada 40 ms, tríceps 12 ms, rosca de costas 116 ms, pull-through 97 ms (a rosca na polia aprovada leva 101 ms); nenhuma conta passou por `calibragem`.
