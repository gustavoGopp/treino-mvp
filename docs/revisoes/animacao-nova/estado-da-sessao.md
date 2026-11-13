# Estado da sessão da animação nova (pausada em 13/11/2026)

A sessão parou **antes do fim da etapa 1**, por decisão do Gustavo: primeiro definir o desenho do Boneco, numa sessão própria (`prompt-sessao-desenho-do-boneco.md`, nesta pasta). Quando houver a conclusão, esta sessão continua daqui. Ramo: `claude/loving-hamilton-c4ji83`. Nada foi para a `main` e nada mudou no app.

## O que o Gustavo viu e o que ele disse (13/11/2026)

| Mostrado | Onde está | O que ele disse |
|---|---|---|
| Manequim de formas ovais gerado por fórmula, com contorno e com sombra (`src/engine/novo/corpo3d.ts` + `desenho.ts`, em SVG) | não há imagem guardada; o código ficou | "esse boneco que você está desenhando tá ficando terrível e eu vou querer refazer ele completamente". Marcou que incomodavam: cabeça e rosto, formato do corpo, sombra e acabamento, e o conjunto todo. |
| Corpo realista: malha humana do MakeHuman (domínio público), em três acabamentos (traço, ilustração, volume) | as faixas 4 a 7 de `prototipos/opcoes-de-boneco.png` usam a mesma malha | "por mais que ele fique interessante, eu acho que fica meio esquisito para absorver, não fica muito agradável para quem está vendo o treino". |
| Quadro com oito estilos: pictograma, cápsulas com contorno, manequim articulado, massinha, desenho a traço, silhueta, atleta estilizado, vidro com ossos, mais o mapa de músculos | `prototipos/opcoes-de-boneco.png` | "eu confesso que não estou gostando de nada [...] eu ainda prefiro o boneco mais simples, que tem hoje, mas que não é o que eu quero ter pro final". |

Leitura minha (opinião): as três tentativas partiram da técnica e esperaram o desenho sair bonito. Falta um desenho pensado como ilustração, e falta saber de que tipo de figura o Gustavo gosta.

## O que existe no ramo e não depende da aparência

| O que | Onde | Estado |
|---|---|---|
| Pesquisa: proporções, articulações, músculos e ossos, objetos, biomecânica dos 4 exercícios, ilustração e movimento, técnica de desenho, estilos de figura | `pesquisa/01` a `08` | pronta, cada arquivo com fontes, status de leitura e lacunas |
| O que já foi decidido e corrigido no boneco de hoje | `correcoes-ja-feitas.md` | pronto |
| Medição das 90 animações de hoje, quadro a quadro | `diagnostico/medidas-de-hoje.md` e `.json`; `scripts/animacao-nova/medir-hoje.mjs` | pronta: 38 com tranco de velocidade, 15 com contato que desliza, 7 atravessando o chão, 6 de 6 fitas mudando de comprimento |
| Peças de cena e os 49 desenhos de cartão contra as medidas reais | `diagnostico/objetos-de-hoje.md` e imagens | pronto |
| Tabela do corpo, com fonte linha a linha (ANSUR II, homens e mulheres de IMC normal) | `src/engine/novo/dados/corpo-*.json`; gerada por `scripts/animacao-nova/gerar-corpo.mjs` | 62 medidas lidas, 16 derivadas, 13 provisórias (listadas pela conferência) |
| Tabelas de objetos, amplitudes e massas dos segmentos | `src/engine/novo/dados/objetos.json`, `amplitudes.json`, `segmentos.json` | objetos com 14 medidas provisórias |
| Esqueleto novo: coluna com as curvas, clavícula e escápula que acompanham o braço, antebraço que gira, mão com referencial próprio, pé que dobra na bola | `src/engine/novo/esqueleto.ts` | funciona nos 4 exercícios |
| Fichas de movimento e animações do goblet, supino reto, puxada unilateral e flexão (cada número com selo e fonte) | `src/engine/novo/dados/movimentos/`, `src/engine/novo/exercicios/` | primeira versão |
| Conferência automática, `npm run conferir:animacao` | `src/engine/novo/conferir.ts`; relatório em `prototipos/conferencia.md` | roda; resta 1 falha (o antebraço fora da linha do cabo na puxada, 50,8°) e avisos de amplitude acima da média |
| Peças de cena com medida de tabela: halter, banco reto, anilha, coluna de polia, estribo, colchonete | `src/engine/novo/pecas.ts` | primeira versão |

## O que existe e depende da aparência (pode ser descartado ou reaproveitado)

- **Malha humana do MakeHuman** (`src/engine/novo/dados/malha.json`, 13.380 pontos, cerca de 290 kB compactada; licença CC0 escrita nos arquivos de origem) presa ao esqueleto e ajustada à tabela (`malha.ts`): variante lisa (rosto alisado), regiões provisórias de músculo, short, tênis e cabelo por região, dedos que fecham na pegada. Os ajustes de corpo masculino, feminino e musculoso ficam em `makehumancommunity/makehuman-assets`, que esta sessão não teve permissão de acessar.
- **Pintor em WebGL sem biblioteca** (`gl.ts`): chapado, três tons, volume suave, contorno, recorte na cor do fundo.
- **Formas próprias** (`corpo3d.ts`, `manequim.ts`, `figuras.ts`): manequim oval (recusado), manequim articulado, pictograma, cápsulas, ossos à mostra.
- **O quadro dos oito estilos:** `node scripts/animacao-nova/opcoes-de-boneco.mjs` gera `prototipos/opcoes-de-boneco.png`.

## O que falta da etapa 1 (fica para depois da decisão do boneco)

- `referencias.md` e `diagnostico.md`: estavam sendo montados a partir dos arquivos acima quando a sessão parou; confira se os dois arquivos existem nesta pasta e se estão completos.
- `proposta.md`: não escrita (depende do boneco).
- `prototipos/` com os quatro exercícios nas direções escolhidas, as folhas ao lado das de hoje e os três cartões de equipamento: não feitos (dependem do boneco).
- Medir peso do pacote e fluidez num celular simples: não feito.
- A falha da puxada na conferência e as 27 medidas provisórias das tabelas.

## Observações

- O primeiro commit desta sessão (`5fda7f6`) saiu com "Gustavo Gopp" como autor, por engano meu; os seguintes usam a identidade configurada no repositório. A correção pedia reescrever o histórico já enviado e foi recusada pela própria ferramenta; fica registrado.
- `package.json` ganhou só a linha do comando `conferir:animacao`.
