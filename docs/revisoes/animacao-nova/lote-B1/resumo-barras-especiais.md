# Lote B1 · Barras especiais: resumo (barra W e barra hexagonal)

De 18/11/2026. Duas peças novas (a barra W e a barra hexagonal) e as duas animações que as usam (`rosca-barra-w` e `terra-hexagonal`), que até aqui eram cartão de texto. Nada foi registrado como aprovado: quem integra põe as duas em `aprovados.ts` e no catálogo do guia. O teste da ponte "todas as animações estão aprovadas e no catálogo" falha na cópia de trabalho por isso, como previsto.

## As peças

| Peça | Medidas com fonte | De desenho (sem fonte) | Folha |
|---|---|---|---|
| Barra W (`pecas-de-cena/barra-w.ts`, `dados/objetos/barra-w.json`) | Eleiko Curl Bar 50 mm (ficha 3061174): 131,6 cm, 12 kg, mangas de 5 cm com 23 cm carregáveis, rebordo de 2 cm; entre as mangas, 81,6 cm (derivada; a Rogue Curl Bar dá 80 cm). Rogue Curl Bar: pegada de 2,85 cm | **os ângulos da curva** (23° a parte de fora, 34° a de dentro: os do cartão de hoje) e onde ficam as dobras (24, 13 e 6 cm do meio); o diâmetro do rebordo (7 cm). Procurei os ângulos nas páginas públicas da Eleiko, da Rogue, da Titan, da Force USA e da PRx: nenhuma dá; a única medida em graus (30°) é de uma barra W de encaixe no rack, de outro formato, e veio só de resumo de busca | `docs/revisoes/animacoes-restantes/pecas/folha-barra-w.png` |
| Barra hexagonal (`pecas-de-cena/barra-hexagonal.ts`, `dados/objetos/barra-hexagonal.json`) | Rogue TB-1 Trap Bar 2.0 (página do produto): 226,1 × 72,4 cm, altura 7,6 cm, tubo quadrado de 3,81 cm, cabos de 3,4 cm a 63,5 cm de centro a centro, mangas de 4,85 cm com 40,6 cm carregáveis, 27,2 kg, pintura preta | o hexágono de ponta a ponta (128 cm: o que sobra tirando as mangas), o ângulo das pontas (120°, hexágono regular), o batente (2,5 × 7 cm) | `docs/revisoes/animacoes-restantes/pecas/folha-barra-hexagonal.png` |

As anilhas (20, 10 e 5 kg) e a presilha são as da barra longa, reaproveitadas como estão. O cartão de hoje da barra hexagonal tinha os cabos deitados ao longo das mangas, a 24 cm um do outro; na peça nova eles atravessam o hexágono da frente para trás, a 63,5 cm. O cartão de hoje (`public/equipamento/*.svg`) não foi mexido.

## As animações

| Exercício | Conferência automática | Erros desenhados | Vistas | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `rosca-barra-w` (`lote-B1/rosca-barra-w.md`) | 0 falha, 2 avisos (linhas de desenho; o antebraço como "só ajuda", como nas outras roscas) | os três: balançar o tronco, cotovelos para a frente, descida curta | de lado (padrão), três quartos | **baixo a médio**: é a rosca na polia aprovada com outra barra; de lado, a barra W não se distingue de uma reta |
| `terra-hexagonal` (`lote-B1/terra-hexagonal.md`) | 0 falha, 2 avisos (a flexão do quadril embaixo passa da média, 135°; linhas de desenho) | os três: arredondar a lombar, quadril sobe antes, soltar a barra | três quartos (padrão), de lado | **médio**: de lado a anilha tapa muito; a barra anda 7 cm para trás no caminho; o ângulo do fundo (joelho a 90°) é escolha de desenho |

## Mudanças em arquivos comuns

- **Nenhuma** no núcleo do motor, nas peças comuns nem nas animações aprovadas: o preparo de nenhuma delas mudou.
- Acréscimos: uma linha em cada registro (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`); o arquivo de regras novo `regras/barras-especiais.ts`; as duas folhas no script `scripts/animacao-nova/folha-pecas.mjs` (o mesmo padrão da folha da barra longa); os dois arquivos de preparo novos e o `dados/preparo/registro.ts` regravado por `preparo.mjs`.

## O que fica para quem decide

- O ângulo da curva da barra W não tem fonte. Se alguém achar a ficha de um fabricante com os ângulos, basta trocar `anguloFora`, `anguloDentro` e as dobras no `barra-w.json`: a rosca recalcula a pegada sozinha (a largura das mãos vem da peça), mas a conferência precisa ser rodada de novo.
- O fundo do terra hexagonal (joelho a 90°, peito a 57°) é uma escolha entre o agachamento e o terra; os estudos da ficha só dizem "menos joelho e mais tronco que o agachamento".
