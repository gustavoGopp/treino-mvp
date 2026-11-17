# Rodada de correção: pike e extensão de tríceps

Ramo `worktree-agent-af2799493be848cf6`, alinhado a `3effee9` antes de começar. Não fiz push.

| Commit | O que entrou |
|---|---|
| `9497bb6` | correção do pike |
| `d43f123` | correção da extensão de tríceps |
| o último commit do ramo | este relatório |

Regenerei os quadros grandes e as folhas com o corpo atual e atualizei as conferências escritas (`pike.md`, `extensao-triceps-peso-corpo.md`). Antes do commit, desfiz os arquivos gerais regenerados.

- `npm run conferir:animacao`: sem falha em todas as animações.
- Lint e tipos: passam.
- Testes: na rodada inteira falharam dois testes de `tests/unit/equipamento-minimo.test.ts`, que não tem relação com estas animações; rodado sozinho, o arquivo passa (15 de 15). É o teste intermitente já anotado no projeto.
- Nenhuma regra nova. A regra `cabeca-desce-entre-as-maos` mudou de critério (ver o pike) e manteve o nome, que é só desta família.

## Pike

**O que mudou:**
- **Segunda vista: `quina`, no lugar de `frontal`.** Testei `quina`, `quinaTras`, `cima` e `posterior` nos três instantes.
  - Na `frontal` e na `posterior`, as costas e o quadril tapam a cabeça. Na `quinaTras`, as pernas ficam na frente. Na `cima`, só se veem as costas.
  - Na `quina`, a cabeça desce entre as mãos e os cotovelos vão para trás. O erro "cotovelos abertos" passou para ela.
- **A cabeça embaixo** passou do centro das palmas para 8 cm à frente dele, entre o punho e a ponta dos dedos. De lado, ela não se embola mais com a mão de perto. O ponto mais baixo da cabeça fica a 5 cm do chão (o rosto, mais alto).
  - A regra `cabeca-desce-entre-as-maos` agora pede a cabeça entre o punho e a ponta dos dedos e a pelo menos 3 cm do chão.
- **O calcanhar** passou de 30° para 35°: com a cabeça mais à frente, a dorsiflexão do tornozelo passava da média.

**A profundidade não deu para aumentar.** O cotovelo vai a 97,5° (hoje, 132°). O que limita é a cabeça chegar ao chão:
- Com o ponto mais baixo da cabeça a 5 cm do chão, o cotovelo fica entre 93° e 108°, para qualquer distância entre mãos e pés (de 80 a 110 cm) e qualquer lugar da cabeça (de 0 a 25 cm à frente das palmas).
- Mesmo com a cabeça encostando no chão, o cotovelo pararia em ~107°.

**Conferência automática:** 0 falha e 2 avisos (a extensão do punho, 71° contra a média de 70°, e as linhas de desenho).

**Ainda falha:** nada da seção 8 que eu tenha visto.

**Risco de o Gustavo não gostar: médio,** pela descida mais curta que a de hoje (quadro `pike:lateral:tec:f1` em `quadros/pike.png`).

## Extensão de tríceps com o peso do corpo

**O que mudou:**
- **A bancada** (`pecas-de-cena/bancada.ts`) ganhou volume e luz, como o banco e a cadeira: gabinete e rodapé em prismas de pé, tampo de pedra que passa da frente, gaveta e duas portas com juntas e puxadores cromados.
  - A frente só é desenhada quando está virada para quem olha. Em peças separadas, as portas vazavam pelo lado da bancada na vista de três quartos.
- **As mãos ficam espalmadas.** A ficha e o cartão dizem "mãos no apoio", e não "segurar a beirada".
- **Vistas: `lateral` e `cima`.** Testei `quina`, `quinaTras` e `cima`.
  - De cima se veem a cabeça descendo entre os antebraços, os cotovelos para a frente e o tríceps (182 cm²; de lado, 56 cm²).
  - Na `quinaTras`, o tríceps quase some, e o modo Músculos voltaria para a vista de lado, onde ele não aparece.
  - Os quadros grandes trazem também uma `quinaTras` em cor de pele, para mostrar a bancada.
- **A pose foi mantida.** Ficou longe da de hoje porque a ficha e as amplitudes exigem:
  - a ficha pede "embaixo, braços acima da cabeça", e a de hoje deixa o braço a ~81° do tronco;
  - com os pés a 112 cm (os de hoje) e o braço acima da cabeça, o punho espalmado dobra 109° (o máximo observado é 95°: falha);
  - com os pés a 125 cm, o punho dobra 80° (aviso); com 132 cm, 68°.

**Conferência automática:** 0 falha e 5 avisos:
- elevação do braço de 179,9° (é o braço na linha do tronco);
- dorsiflexão do tornozelo de 25°;
- supinação do antebraço de 94°;
- as linhas de desenho;
- a vista de lado não serve ao modo Músculos.

**Ainda falha:** de lado, embaixo, a cabeça fica atrás do braço de perto (quadro `extensao-triceps-peso-corpo:lateral:tec:f1`). De perfil é inevitável, com os braços dos dois lados da cabeça; na vista de cima ela aparece.

**Risco de o Gustavo não gostar: alto,** porque a pose fica longe da aprovada hoje (corpo mais deitado, pés mais longe, braço acima da cabeça).

## Arquivos comuns

Nenhum arquivo comum mexido nesta rodada. Os arquivos alterados são só os desta família:

- `pike.json`
- `pike.ts`
- `extensao-triceps-peso-corpo.json` (as vistas voltaram a ser as já gravadas)
- `regras/apoio-no-chao.ts`
- `pecas-de-cena/bancada.ts`
- as conferências escritas, os quadros e as folhas
