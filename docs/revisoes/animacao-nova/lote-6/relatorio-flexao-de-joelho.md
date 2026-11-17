# Lote 6 · Relatório: flexões de joelho deitado (deslizante e com elástico)

De 15/11/2026. Ramo `worktree-agent-a3ddf5adc5d32b588`, sobre o d28725f. Commits: `98812cd` (deslizante), `b84968a` (elástico) e o deste relatório. Sem push, merge nem pull request. A flexão na suspensão não foi feita (a fita é de outro colega); o núcleo `exercicios/flexao-joelho.ts` já tem a ponte de costas (`ponteDeCostas`) com o apoio do calcanhar como parâmetro, para ela.

Conferências escritas: `flexao-joelho-deslizante.md` e `flexao-joelho-elastico.md` (nesta pasta). `npm run check` passa; `npm run conferir:animacao` sem falha em todas as 13 animações.

## Flexão de joelho deslizante (`flexao-joelho-deslizante`)

- **Conferência automática: 0 falha, 2 avisos.** (1) Provisórios: `joelho.fim` 120°, `quadril.folgaNoInicio` 5 cm, e três de posição (ombro na cena, mãos). (2) Músculos: de três quartos, de trás, os posteriores não aparecem; a vista padrão do modo Músculos é a de lado (67 cm²).
- Posição (lida na ficha e na animação de hoje): de costas, braços no chão, calcanhares numa toalha, quadril em ponte, fora do chão o tempo todo. Medido: glúteo de 5 a 19 cm do chão; no fim, ombro–quadril–joelho a 177°; costas e cabeça no chão (0 a 0,3 cm); o calcanhar desliza 64,7 cm sobre a toalha, que anda com ele (pé a 0 cm do tampo); pé em ângulo reto com a canela (correção de 04/11).
- **O que não ficou bom:** no fim o calcanhar fica a ~18 cm da pele do glúteo ("perto" não tem número); no erro "Arquear a lombar" a linha ombro–quadril–joelho medida nos centros quase não muda (175°), o erro aparece na curva das costas e pode não ler na miniatura; o ombro anda 1,7 cm (limite meu de 2 cm); a toalha de lado é só uma linha; o rótulo "ombros, quadril e joelhos em linha" já aparece no início, quando ainda não estão em linha.
- **Risco de o Gustavo não gostar: baixo a médio.** A pose segue a ficha e a de hoje de perto e todas as regras medem ok; o que pode incomodar é o erro da lombar pouco legível e o calcanhar não tão perto do glúteo.

## Flexão de joelho com elástico (`flexao-joelho-elastico`)

- **Conferência automática: 0 falha, 3 avisos.** (1) Cabos: a conferência comum espera o elástico mais esticado no começo (como no agachamento); aqui a ficha pede mais esticado com os joelhos dobrados (1,2 → 2,2 vezes, nunca além das 3 do fabricante): aviso esperado, e a regra própria `elastico-estica-mais-no-fim` dá ok. (2) Provisórios: `joelho.fim` 115°, `tornozelo.flexaoPlantar` 55°, `testa.altura`, `maos.meiaDistancia`, `colchonete.z`, `ancora.altura`. (3) Músculos: de lado aparece pouco (67 cm²); a vista padrão é de cima (645 cm²).
- Posição (lida na ficha): **de bruços** num colchonete, quadril no colchonete, testa nos braços, elástico preso num ponto firme e baixo atrás dos pés, pontas por trás dos tornozelos. Medido: bacia e joelhos parados (0 cm), testa no dorso das mãos (0 cm), pegador 5,1 cm atrás e 4 cm acima do tornozelo, alça da âncora a 1,5 cm do chão.
- O item Ritmo sai "sem movimento": a conferência comum não acompanha a canela, que é a única coisa que se mexe. **O ritmo deste exercício não foi medido de fato.**
- **O que não ficou bom:** de lado o corpo fica pequeno no quadro (a porta fica a 159 cm do quadril, porque o tubo de 122 cm tem de estar só um pouco esticado com as pernas estendidas); o tronco não fica reto (ombros a 27 cm do chão, a barriga entra 1,5 cm no colchonete); a testa apoia nas mãos espalmadas, e não nos antebraços cruzados (cruzados ficaria assimétrico); o pegador é a pegada rígida atravessada atrás do tornozelo; porta lisa, sem batente.
- **Risco de o Gustavo não gostar: médio a alto.** Troquei o poste baixo da animação aprovada de hoje pela porta com âncora (a ficha pede móvel ou porta; o poste não tinha medida), a cena de lado ficou larga com o corpo pequeno, e a pose de bruços com a cabeça nas mãos é nova no motor.

## Arquivos comuns que mexi

Só as linhas dos três registros, como o guia pede: `exercicios/registro.ts` (2 linhas), `regras/registro.ts` (1 linha), `dados/objetos/registro.ts` (2 linhas: `toalha`, `porta`). Nenhum outro arquivo comum, script, `boneco.ts`, `conferir.ts` ou núcleo dos outros foi alterado. Os arquivos gerais regenerados (`prototipos/conferencia.*`) foram desfeitos antes de cada commit.

Arquivos novos: `exercicios/flexao-joelho.ts` (núcleo), `exercicios/flexao-joelho-deslizante.ts`, `exercicios/flexao-joelho-elastico.ts`, `regras/flexao-joelho.ts`, `pecas-de-cena/toalha.ts`, `pecas-de-cena/porta-com-ancora.ts`, `dados/objetos/toalha.json`, `dados/objetos/porta.json`, as duas fichas de movimento, as duas conferências escritas, as duas folhas e os dois quadros.

A segunda vista da deslizante é `quinaTras` e não `quina`: o script das folhas (`prototipos.mjs`) não tem `quina` no mapa das vistas de hoje e quebra; preferi não mexer no script.

## Medidas provisórias

- Objetos (`tipo: provisoria`, `fonte: a-conferir`): espessura da toalha (0,4 cm por camada; a ficha do fabricante só dá o peso); vão sob a porta (1 cm); comprimento da alça da âncora do lado de cá (6 cm). O colchonete (100 × 50 × 1,5 cm) já era provisório na tabela.
- Medidas com fonte, mas lidas por resumo automático de página de varejo: toalha de mão 16 × 30 pol (Zogics), folha de porta 210 × 80 × 3,5 cm (Vert, Telhanorte), espuma da âncora 5 × 4 × 1 pol (Stroops, Vitality Medical). Não abri as fichas técnicas dos fabricantes; a da Decathlon e a da Hospeco devolveram 403.
- Escolhas de desenho nas fichas de movimento (listadas pela conferência): deslizante `joelho.fim`, `quadril.folgaNoInicio`, `ombro.z`, `maos.abaixoDoOmbro`, `maos.paraFora`; elástico `joelho.fim`, `tornozelo.flexaoPlantar`, `testa.altura`, `maos.meiaDistancia`, `colchonete.z`, `ancora.altura`, e o 1,2 vez de `elastico.esticaNoInicio` (selo consenso pelo texto do app, mas o número é meu). O limite de 2 cm para o ombro andar e o de 90° para "joelhos bem dobrados" nas regras também são meus (a ficha não dá número).

## Músculos

Os posteriores da coxa existem no desenho (`dados/musculos.json`, grupo `posteriores`), assim como o glúteo. Nada faltou. A panturrilha fica fora da deslizante, como a ficha da técnica decidiu.
