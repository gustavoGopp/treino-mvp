# Testes e2e ajustados ao pacote 2 (15/11/2026)

Programa da Ana usado como referência (gerado com um script temporário fora do repositório e conferido com `tests/unit/__snapshots__/gerador.test.ts.snap`):

- **Corpo todo A (17 séries):** goblet 4 × 8–15 · supino reto 2 × 6–10 · ponte de glúteo com halter 2 × 10–20 · remada unilateral 2 × 8–12 **cada lado** · flexão de joelho deslizante 4 × 8–15 · tríceps francês 3 × 10–15.
- **Corpo todo B (15):** stiff · supino reto · remada unilateral (cada lado) · panturrilha · rosca alternada · crucifixo invertido sentado.
- **Corpo todo C (15):** afundo 2 × 8–12 **cada lado** · flexão · ponte com halter · remada curvada · panturrilha · abdominal.
- Na semana 1 (fase de aprendizado, 0,75 das séries), a tela do Corpo todo A mostra: 3 × 8–15, 2 × 6–10, 2 × 10–20, 2 × 8–12 cada lado, 3 × 8–15, 2 × 10–15.

Só foram editados arquivos `tests/e2e/*.spec.ts` (cinco). Nenhum helper mudou. Nenhum `expect` foi apagado, nada de `.skip`/`.fixme`. Sem commit.

## Resultado final

| Arquivo | Resultado |
| --- | --- |
| `tests/e2e/acompanhamento.spec.ts` | 7 de 7 passam |
| `tests/e2e/correcoes-auditoria.spec.ts` | 8 de 8 passam |
| `tests/e2e/locais.spec.ts` | 2 de 2 passam |
| `tests/e2e/onboarding.spec.ts` | 16 de 16 passam |
| `tests/e2e/treino.spec.ts` | 16 de 16 passam (eram 15; entrou 1 teste novo, ver o item 9) |
| `npx eslint tests/e2e` | limpo |
| `npx tsc --noEmit -p .` | limpo |

A última rodada de cada arquivo foi com o build feito pelo próprio Playwright, sobre o código como está agora na pasta.

## Os dez testes

### 1. `acompanhamento.spec.ts` › "volta depois de 22 dias: a mensagem sem culpa, menos séries e a carga 10% menor já preenchida"
- **O que prova:** depois de 22 dias parada, o cartão de hoje vira "Bem-vindo de volta!", com cerca de metade das séries, RIR 3–4 e a carga 10% abaixo da última, já preenchida.
- **Mudou no esperado:**
  - séries do cartão: `9 de 15` → `9 de 17` (o A inteiro foi de 15 para 17; a metade continua 9);
  - título do 1º exercício: "Agachamento búlgaro com apoio" → "Agachamento goblet com calcanhar elevado";
  - meta do exercício: `2 × 8–12 cada lado` → `2 × 8–15` (igualdade exata mantida; sem "cada lado", porque o goblet é de dois lados).
- **Sem mudança:** "Hoje: 9 kg", "Última vez: 10 kg. Volta da pausa: 10% mais leve", carga `9`, textos da volta.
- **Intenção:** igual. O "cada lado" na meta do treino não era o assunto deste teste; ficou coberto no teste novo do item 9.

### 2. `correcoes-auditoria.spec.ts` › "com um treino aberto, o programa não é gerado de novo: a mudança espera o treino terminar"
- **O que prova:** com um treino aberto, marcar "algo a evitar" não troca o exercício por baixo do treino; a tela avisa, o treino segue no mesmo exercício e, terminado o treino, "Atualizar" tira o exercício.
- **Mudou:** o exercício aberto e marcado para evitar: búlgaro → goblet (5 ocorrências: título do treino ×2, a caixa de "algo a evitar", a contagem 1 antes e 0 depois).
- **Intenção:** igual, e conferida: o goblet continua no programa enquanto o treino está aberto (contagem 1) e sai depois do "Atualizar" (contagem 0). Com o búlgaro, a contagem 1 falhava, porque ele não está mais no programa.

### 3. `correcoes-auditoria.spec.ts` › "a folha recebe as regras de .app, a de baixo fica inerte e o foco volta a quem abriu"
- **O que prova:** folha sobre folha (a do exercício e a do selo): a de baixo fica inerte, as regras de `.app` chegam à folha, o foco volta a quem abriu.
- **Mudou:** só o exercício cuja folha é aberta (búlgaro → goblet). O exercício era apenas a porta de entrada.
- **Intenção:** igual. A folha do goblet também tem o selo "ver de onde vem", e todas as verificações seguintes passam sem mudança.

### 4. `locais.spec.ts` › "cadastra o 2º local, escolhe onde treinar hoje, vê a troca explicada e calibra a carga no aparelho novo"
- **O que prova:** com um 2º local sem halteres, a prévia e o treino mostram a troca com o motivo, e a 1ª série no aparelho novo calibra a carga.
- **Mudou:** o texto da troca, nos dois lugares (prévia e treino): "Aqui não tem halteres: agachamento búlgaro com apoio → leg press." → "Aqui não tem halteres: agachamento goblet com calcanhar elevado → leg press."
- **Sem mudança:** o destino (leg press), a calibração (8 kg por lado × 20, RIR 4+, "Ficou leve: na próxima série, 12 kg por lado"), o local lembrado.
- **Intenção:** igual.

### 5. `locais.spec.ts` › "\"prefiro este\" nas alternativas: um toque marca, outro desfaz, e o programa oferece a versão nova"
- **O que prova:** na folha do exercício, "Prefiro X" marca, "desfazer" desmarca, e o programa oferece (e deixa de oferecer) a versão nova.
- **Mudou:** a folha aberta: búlgaro → goblet. O teste continua tocando no 2º botão "Prefiro" (o 1º é o do próprio exercício).
- **Conferido na tela:** os botões da folha do goblet são "Prefiro agachamento goblet com calcanhar elevado", "Prefiro agachamento com 2 halteres ao lado do corpo" e "Prefiro agachamento búlgaro com apoio". O 2º é um equivalente de verdade: marcado, aparece "Há uma versão nova do seu programa."; desfeito, o aviso some.
- **Intenção:** igual.

### 6. `onboarding.spec.ts` › "do zero ao programa em menos de 5 minutos (persona Ana)"
- **O que prova:** o cadastro da Ana leva ao programa: as abas dos dias, a lista com séries × repetições, as miniaturas, a folha do exercício com o RIR da semana e o porquê, os avisos, e o caminho da folha ao guia.
- **Mudou:**
  - 1ª linha da lista: `/^\d × 8–12 cada lado$/` → `/^\d × 8–15$/` (o goblet);
  - **somada** uma verificação: a linha da remada unilateral (4ª do Corpo todo A) tem `/^\d × 8–12 cada lado$/`. Assim a regra de exibição do "cada lado" na lista do programa continua coberta;
  - folha aberta: `/Agachamento búlgaro/` → `/Agachamento goblet/` (duas vezes);
  - endereço do guia: `/guia/bulgaro?de=programa&dia=corpo-a&ex=bulgaro` → `/guia/goblet?de=programa&dia=corpo-a&ex=goblet`.
- **Sem mudança:** "RIR 3–4" na folha e no guia; o porquê "Vaga de agachar, para o quadríceps, o seu foco: N das N séries da semana" (na folha do goblet: "4 das 6 séries da semana (a meta é 10)"); o Corpo todo B com 1 cartão de texto e o stiff.
- **Intenção:** igual, com uma verificação a mais.

### 7. `treino.spec.ts` › "sessão completa: registra as séries, descansa e recebe a sugestão para a próxima vez"
- **O que prova:** a sessão inteira: a 1ª série calibra a carga (pesada → desce pela fórmula), a série perto do alvo vira a de trabalho, o descanso, o resumo com "Manter" e, no treino seguinte, a carga sugerida.
- **Mudou:**
  - título: búlgaro → goblet;
  - carga calibrada depois de 8 kg × 9 com RIR 2: `7 kg` → `6 kg` (mensagem "Ficou pesada: na próxima série, 6 kg." e o campo da carga);
  - série de trabalho: `7 kg × 11 · RIR 2` → `6 kg × 11 · RIR 2`;
  - carga sugerida no treino A seguinte: `7` → `6`.
- **Por que os números mudam (não é defeito):** a calibração mira o meio da faixa mais o meio do RIR. Na faixa 8–12 do búlgaro o alvo era 13,5; na 8–15 do goblet é 15. Com os mesmos toques (8 kg × 9, RIR 2 = 11 até a falha), a fórmula de Brzycki dá 8 × 22 ÷ 26 = 6,8 → 6 kg (antes, 7,2 → 7 kg). Conferido em `src/domain/progressao/calibracao.ts`.
- **Observação:** a 2ª série (6 kg × 11, RIR 2 = 13) fica exatamente na borda do "perto do alvo" (alvo 15, folga de 2). Passa e é determinístico, mas está no limite; antes ficava a 0,5 do alvo. Mantive os mesmos toques para o teste continuar o mesmo; se quiserem folga, basta um toque a mais em "Mais uma repetição".
- **Intenção:** igual.

### 8. `treino.spec.ts` › "trocar pela alternativa vale só para esta sessão"
- **O que prova:** trocar pelo 1º da folha de troca mostra "No lugar de …, só neste treino".
- **Mudou:** `/No lugar de agachamento búlgaro/` → `/No lugar de agachamento goblet/`.
- **Intenção:** igual.

### 9. `treino.spec.ts` › "R1: aberto pelo treino, o guia do búlgaro mostra a prescrição da semana da Ana (RIR 3–4), não a da referência"
- **O que prova:** o guia aberto pelo treino mostra a prescrição da semana da Ana (séries, faixa, "cada lado", RIR 3–4, descanso, fase), e não a do programa de referência ("por perna", RIR 1–2); o checklist pede a carga para o RIR da semana; as abas são as do dia dela; "Voltar ao treino" volta.
- **Este era o teste cujo assunto incluía o exercício de um lado só.** Virou dois:
  - **Renomeado:** "R1: aberto pelo treino, o guia do **goblet** mostra a prescrição da semana da Ana (RIR 3–4), não a da referência". Mudou: título → goblet; meta lida com `/^(\d+) × 8–15$/` (antes `/^(\d+) × 8–12/`; agora exige que não haja "cada lado"); endereço `/guia/bulgaro?de=treino` → `/guia/goblet?de=treino`; prescrição `Semana 1: N × 8–12 cada lado · RIR 3–4 · descanso 1:45 · fase de aprendizado` → `Semana 1: N × 8–15 · RIR 3–4 · descanso 1:45 · fase de aprendizado` (texto exato). As demais verificações ficaram todas (sem "RIR 1–2", sem "por perna", "Carga para RIR 3–4", sem a aba "Torso A", a volta ao treino).
  - **Novo:** "R1: no exercício de um lado só (o afundo), o treino e o guia dizem \"cada lado\" na prescrição da Ana, não \"por perna\"". Começa o Corpo todo C, cujo 1º exercício é o afundo estático com halteres (um lado só, e com "2 por perna · RIR 1–2 · 1,5 min" no programa de referência, como o búlgaro). Verifica: a meta do treino `N × 8–12 cada lado` (exata), o endereço `/guia/afundo?de=treino`, a prescrição `Semana 1: N × 8–12 cada lado · RIR 3–4 · descanso 1:45 · fase de aprendizado`, sem "RIR 1–2" e sem "por perna", "Carga para RIR 3–4" e a volta ao treino.
- **Intenção:** igual, somando os dois. No teste do goblet, o "sem por perna" continua verdadeiro mas prova menos (a referência do goblet não tem "por perna"; ela difere por "RIR 1–2" e "2 min"); por isso a parte do "por perna" foi levada ao afundo, onde ela vale como antes.

### 10. `treino.spec.ts` › "terminar no meio do treino pede confirmação; \"Continuar treinando\" volta ao exercício"
- **O que prova:** terminar no meio pede confirmação, oferece descartar quando não há série, e "Continuar treinando" volta ao mesmo exercício.
- **Mudou:** o título do exercício a que se volta: búlgaro → goblet.
- **Intenção:** igual.

## Fora da lista dos dez, mas ajustado

### `onboarding.spec.ts` › "lote 3: \"algo a evitar\" fica em Meus dados e gera o programa de novo sem o exercício escolhido"
- Este teste **passava**, mas sem provar nada: marcava o búlgaro para evitar e conferia que o búlgaro não estava no programa, e ele já não está desde o pacote 2.
- **Mudou:** o exercício marcado e a contagem 0 no fim: búlgaro → goblet. **Somada** uma verificação no começo: o goblet está no programa antes de ser marcado (contagem 1), para o teste não voltar a passar no vazio.
- **Conferido na tela:** com o goblet em "evitar", o Corpo todo A passa a abrir com "Agachamento búlgaro com apoio · 3 × 8–12 cada lado".

## Deixado como está

- `tests/e2e/cenarios.spec.ts` › "zoom200 · fim-e-semana": não toquei, não rodei e não marquei como pendente, como pedido.
- `tests/e2e/guia.spec.ts:72` cita `/guia/bulgaro-suspensao`: é outro exercício (o guia do catálogo), sem relação com o programa da Ana. Sem mudança.

## Efeitos reais notados na tela (nenhum é defeito dos testes)

1. **A calibração do 1º exercício da Ana desce um halter a mais** com a mesma 1ª série (8 kg × 9, RIR 2): 6 kg em vez de 7 kg, porque a faixa do goblet é 8–15. É consequência direta da troca de exercício, pela regra de calibração como ela está escrita.
2. **Preferir o 2º equivalente do goblet troca animação por cartão de texto.** O 2º "Prefiro" do goblet é o "agachamento com 2 halteres ao lado do corpo"; aceita a versão nova, ele entra no Corpo todo A como "guia em texto" (sem animação). Não comparei com o que o 2º "Prefiro" do búlgaro fazia antes do pacote 2.
3. **Na Academia sem halteres, a lista de trocas do Corpo todo A tem 5 linhas:** goblet → leg press; supino reto → flexão de braço; ponte com halter → ponte de glúteo; remada unilateral → barra fixa só na descida; tríceps francês → extensão de tríceps com o peso do corpo. O teste só confere a 1ª (como antes).
4. **A folha do goblet cita o búlgaro no porquê:** "Entre as que sobram, equivale a agachamento búlgaro com apoio e às outras do mesmo tipo, que ficam como alternativa." Coerente com a ordem de referência.

## Sobre o ambiente (para quem rodar depois)

- Durante o trabalho apareceu uma mudança em `src/styles.css` (a regra `.m-num`, 21:31) que **não é minha**: não editei nada fora de `tests/e2e/`. Parece ser a correção do zoom de 200% de outra sessão.
- Por alguns minutos (21:29 a 21:36) mantive um `vite preview` na porta 4173 para não refazer o build a cada rodada. Encerrei esse processo (só ele) ao notar a mudança em `styles.css`: quem rodou o Playwright nesse intervalo pode ter reaproveitado o meu servidor, com um build anterior à mudança do estilo. Vale repetir qualquer rodada feita nesse intervalo.
- A auditoria em segundo plano (`vite-node scripts/auditoria/...`) não foi tocada e seguia rodando ao fim.
- O script temporário e o teste de observação ficaram fora do repositório e foram apagados.
