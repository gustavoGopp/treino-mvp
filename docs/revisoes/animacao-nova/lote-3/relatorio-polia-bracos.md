# Relatório · braços na polia (`polia-braco`), 15/11/2026

Os quatro foram entregues, nesta ordem, um commit cada, no ramo `worktree-agent-a72667242c28d1a37` (a partir de `d538233`). Conferência automática de todas as animações: 0 falha. Lint e tipos passam; nos testes, dois testes antigos (`estilo.test.ts`, `gerador.test.ts`) estouraram o tempo com a máquina cheia (carga 10 em 4 núcleos) e passam rodados à parte; nenhum teste olha o motor novo.

| Exercício | Commit | Documento |
|---|---|---|
| `crucifixo-polia` | `691fd85` | `lote-3/crucifixo-polia.md` |
| `crucifixo-invertido-polia` | `fc70ded` | `lote-3/crucifixo-invertido-polia.md` |
| `face-pull` | `1e5bede` | `lote-4/face-pull.md` |
| `rosca-polia` | `bc09e1b` | `lote-5/rosca-polia.md` |

O núcleo comum é novo: `exercicios/polia-bracos.ts` (corpo em pé parado com os pés lado a lado ou um à frente do outro; braço pela linha do ombro à mão; pegada por supinação; colunas com cabo e pilha próprios). Regras em `regras/polia-bracos.ts` (ids `polia-braco-*`).

## Arquivos comuns que mexi

Só as linhas dos três registros (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`). Não mexi em `pecas.ts`, `equipamento.ts`, `conferir.ts`, no desenho do corpo nem nos núcleos dos outros: `dobrar-o-cotovelo.ts` (`bracoDaRosca`), `dobrar-o-quadril.ts` (`folgaDasPernas`, `alcanceDoBraco`) e `na-fita.ts` (`bracoNaLinha`) são só importados. Também reaproveito, sem mudar, as regras `triceps-frances-corda-*`, `cotovelo-parado-na-rosca`, `braco-estendido-embaixo-na-rosca`, `carga-perto-do-ombro-no-topo`, `palma-para-a-frente-na-rosca` e `tronco-quase-parado`. Peça e objeto novos: `pecas-de-cena/polia-braco-barra-reta.ts` e `dados/objetos/polia-braco-barra-reta.json`.

Com dois cabos, a conferência geral mede a pilha da primeira coluna (`marcas.pilha`) contra cada cabo; a regra `polia-braco-pilha-de-cada-coluna` mede cada pilha (`pilha`, `pilha2`) contra o seu cabo. Nos dois crucifixos os dois cabos andam o mesmo (96,0 e 103,9 cm), e as duas medidas passam.

## Crucifixo na polia — risco médio

- Conferência: 0 falha; avisos: linhas de desenho (pés, calcanhar de trás, onde cai o peso, pescoço, cabeça, abertura das colunas, altura da mão no alongado, supinação) e o peitoral, que não aparece de cima (padrão do modo Músculos: de frente, 499 cm²).
- Não ficou bom: de lado, no erro "Usar o tronco", o cabo passa na frente do tronco (não encosta; as colunas de cenário não aparecem de perfil) (`lateral:err:f1:tronco`). O cabo corre a 3 cm do antebraço no fim do fechamento; para isso o cotovelo aponta um pouco para baixo.
- Risco médio: o pé à frente, a altura das mãos no fim (21 cm abaixo de C7 no tórax) e o cotovelo um pouco para baixo são escolhas que o dono pode querer diferentes; as colunas estão a 96 cm do meio (hoje: 84) para a mão não ficar sobre a coluna de frente.
- Provisórias: `pes.meiaDistancia`, `pe.tras.calcanhar`, `peso.partilha`, `polia.meiaDistancia`, `arco.inicio.el`, `mao.supinacao.*` (selo desenho).

## Crucifixo invertido na polia — risco médio

- Conferência: 0 falha; avisos: linhas de desenho e, de trás, o ombro posterior some no começo (braços à frente: 0 cm²; 112 no fim); a padrão do modo Músculos é a de cima (69 cm² no pior instante).
- Não ficou bom: de lado, no erro "Jogar o tronco para trás", o cabo da direita cruza o rosto no desenho (em 3D passa a mais de 40 cm) (`lateral:err:f1:balanco`). De cima, o corpo fica no alto do quadro, pequeno, porque as colunas estão 125 cm à frente: mais perto, os cabos cruzados passavam pelas mãos no meio da abertura (0,1 cm medido). Para os antebraços cruzados não se atravessarem, o braço direito começa 6° por cima e o esquerdo 6° por baixo; a altura média dos braços é acertada para os dois cabos terem o mesmo comprimento (senão as pilhas não sobem juntas).
- Risco médio: o quadro de cima com o corpo pequeno e a montagem (colunas 110 cm para o lado, 125 cm à frente; hoje: 84 e 55).
- Provisórias: `polia.meiaDistancia`, `inicio.desnivel`, `desnivel.some`, `mao.supinacao.*`, `pilha.folga`, joelho, tronco, pescoço, cabeça.

## Face pull — risco médio

- Conferência: 0 falha; avisos: linhas de desenho e, de cima, o ombro de trás não aparece no fim (0 cm²). A conferência dos músculos passa pela vista de lado.
- **Áreas do ombro de trás (`deltPost`) medidas, em cm², no começo / meio / fim:** de lado 47 / 47 / 37; de três quartos por trás 34 / 57 / 88; de trás 0 / 50 / 116; de cima 54 / 56 / 0; de frente 30 / 0 / 0; de três quartos pela frente 37 / 14 / 0. O pior instante da de lado era 30 (fim) com o cotovelo 2,5 cm atrás da linha do ombro; com ele 5,6 cm atrás (dentro de "cotovelos na linha do corpo", a regra aceita até 10 cm) passou a 37. Não mexi no desenho do corpo. Quem integra pode preferir corrigir o desenho do músculo e voltar o cotovelo para a linha do ombro.
- Não ficou bom: com a corda de 29 cm (Rogue), as mãos não passam de 14 cm do meio sem a corda encostar no rosto; os antebraços sobem inclinados para dentro (cotovelo a 132°), e não na vertical. A corda passa a 1,2 cm do rosto no fim. De lado, no fim, o braço de perto cobre parte do rosto. No erro "encolher" (de trás), a cabeça só vai 1,6 cm à frente.
- Risco médio: os antebraços inclinados e a mão 10 cm à frente do trágio.
- Provisórias: joelho, pescoço, cabeça, `inicio.maos`, `fim.aFrente`.

## Rosca na polia baixa — risco baixo

- Conferência: 0 falha; avisos: supinação de 90,8°, linhas de desenho (pescoço, cabeça, ângulo de carregamento de 2°, folga da barra) e o antebraço como "só ajuda" (fora da lista do conteúdo, como nas outras roscas).
- Não ficou bom: embaixo o cotovelo fica a 14,5° (com 10°, a barra de 50,8 cm entrava nas coxas; a regra aceita até 15°). A trajetória do cotovelo não aparece porque ele não anda.
- Vistas: de lado e de três quartos pela frente (de frente, a coluna cobre o corpo). Padrão do modo Músculos: três quartos (119 cm²).
- Provisórias: a altura da aba (5 cm) e o mosquetão (8 cm) da barra (`tipo: provisoria`, `fonte: a-conferir`); `antebraco.paraFora`, `barra.folga`.

## Fontes externas lidas

- Rogue Stainless Straight Lat Bar (https://www.roguefitness.com/de/en/rogue-stainless-straight-lat-bar), lida por resumo automático: 20 pol, 28,5 mm, 6,6 lb, aba de 3/8 pol. O guia de produto da Rogue (support.roguefitness.com) respondeu 403 e não foi lido.
