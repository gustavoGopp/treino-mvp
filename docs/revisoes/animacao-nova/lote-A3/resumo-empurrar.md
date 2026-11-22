# Lote A3 · Resumo dos três "empurrar" em pé (17/11/2026)

Três exercícios que eram cartão de texto ganharam a primeira animação no motor novo, cada um num commit:

| Exercício | Núcleo | Conferência automática | Risco de o Gustavo não gostar |
|---|---|---|---|
| `desenvolvimento-unilateral` (um halter, em pé) | `empurrar-para-cima.ts` (variação nova `'halter'`) | 0 falha, 2 avisos | médio |
| `desenvolvimento-em-pe-halteres` (dois halteres, em pé) | `empurrar-para-cima.ts` (variação nova `'halteres-em-pe'`) | 0 falha, 2 avisos | baixo |
| `triceps-frances-unilateral-halter` (um halter, em pé) | `triceps-frances-base.ts` (variação nova `'halter-unilateral'`) | 0 falha, 1 aviso | baixo |

Os avisos são: nos três, as linhas da ficha de movimento que são escolha de desenho; nos dois desenvolvimentos, a segunda vista (de frente) que não serve ao modo Músculos (a frente do ombro some nela no meio e em cima).

## Decisões que valem para o Gustavo olhar

- **"Na altura do ombro", e não "das orelhas".** Os dois cartões dos desenvolvimentos em pé pedem o halter na altura do(s) ombro(s); o sentado aprovado pede "das orelhas". Embaixo, o centro da mão fica 5,7 cm acima da ponta do ombro (o sentado: na altura da orelha).
- **No topo, o cotovelo vai 70° à frente** (o sentado: 30°; o com kettlebell: 80°). Com 30°, de lado, a frente do ombro sumia atrás do braço no topo (0 cm², falha). Com o braço quase na vertical, isso move o cotovelo uns 6 cm.
- **O tríceps francês unilateral é em pé**, porque a ficha da técnica pede só o halter (cadeira ou banco opcionais) e o cartão põe o banco como preferência. **A outra mão fica na cintura**, como no unilateral na polia aprovado. A primeira versão desenhava a sugestão do cartão (a outra mão segurando o cotovelo, "se quiser"), mas o braço esquerdo cruzava por cima da cabeça e tapava o rosto; na revisão de quem integra (17/11), a mão foi para a cintura, e a vista de frente voltou a servir (o tríceps com 90 cm² de frente, o rosto livre).

## Erros

Todos os nove erros dos cartões são pose ou têm consequência visível, e foram desenhados: inclinar para o lado (a coluna dobra 14° para o lado oposto ao halter), arquear a lombar (nos três), embalo das pernas (os joelhos dobram 30° embaixo e estendem para empurrar), descida curta e descer pouco (nos três), abrir o cotovelo (22° para fora). Nenhum ficou de fora; a lista `SEM_DESENHO` do teste da ponte não precisa de nada destes três.

## Mudanças em arquivos comuns (todas aditivas; o preparo das animações aprovadas não mudou)

- `exercicios/empurrar-para-cima.ts`: as variações `'halter'` e `'halteres-em-pe'` (o corpo em pé do kettlebell com a pegada do sentado) e o erro `'lado'` (inclinar para o lado). Duas condições que eram escritas pelo que não é kettlebell passaram a nomear o kettlebell, com o mesmo resultado.
- `exercicios/dobrar-o-quadril.ts`: o campo opcional `lado` (a coluna dobra para a esquerda, metade na lombar e metade na torácica). Sem ele, nada muda.
- `exercicios/triceps-frances-base.ts`: a variação `'halter-unilateral'` (em pé pela conta do estribo; o halter atravessa a mão fechada; a mão esquerda na cintura, a mesma função do estribo).
- Regras novas, em arquivos próprios: `regras/desenvolvimentos-em-pe.ts` (`carga-na-altura-do-ombro`, `tronco-sem-inclinar-para-o-lado`, `pernas-paradas`) e `regras/triceps-frances-unilateral-halter.ts` (`triceps-frances-halter-livre-do-corpo`; a mão na cintura usa a regra do unilateral na polia). Essa regra mede a cabeça do halter como cilindro de pontas planas: a regra dos tríceps com as duas mãos a mede como cápsula, e com o cabo atravessando a mão a ponta arredondada entra no punho (0,4 cm "do antebraço" numa cabeça que fica a mais de 1 cm da pele).

`npm run check`: só falha o teste da ponte "todas as animações estão aprovadas e no catálogo do guia", com os três ids novos (esperado: quem integra registra). `node scripts/animacao-nova/preparo.mjs conferir`: as tabelas conferem.

## O que não ficou bom

- **Desenvolvimentos, de lado:** embaixo o halter de perto se projeta na frente do queixo (ele está fora da cabeça, a 6,7 cm), e no topo o braço passa na frente do rosto. É o mesmo do desenvolvimento com kettlebell aprovado.
- **Tríceps francês unilateral:** de frente, embaixo, o halter some atrás da cabeça (a vista de lado mostra onde ele está).
- **Desenvolvimento unilateral, erro de inclinar:** o braço sobe na vertical do mundo enquanto o tronco dobra; a ficha não diz o que o braço faz.
