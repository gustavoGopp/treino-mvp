# Revisão independente das frases das regras

Um app de treino de força (treino-mvp, pt-BR) tem 163 regras. Cada regra tem um texto técnico (`regra`), os `valores` que o app usa e um nível de evidência. Outra pessoa escreveu, para cada regra, um `titulo` e uma `frase` em linguagem simples, que vão aparecer na página "Entenda o treino" → "Todas as regras e as fontes" no lugar do texto técnico (o nível de evidência e as fontes aparecem logo abaixo e não mudam).

Você é o revisor. Não confie em quem escreveu: confira cada frase contra a regra e os valores dela, uma por uma.

## O que conferir em cada frase

1. **Fidelidade.** Tudo o que o título e a frase afirmam está no texto da regra ou nos valores? Aponte qualquer afirmação, motivo, benefício ou número que não esteja lá, e qualquer coisa que a frase diga diferente da regra (sentido trocado, condição invertida, "sempre" onde a regra diz "às vezes", unidade errada).
2. **Números.** Todo número da frase bate com o da regra (valor, faixa, unidade, a que ele se aplica, a que nível pertence)?
3. **O essencial ficou?** A frase diz o que a regra faz de verdade (muitas vezes isso está em `valores`)? Se os valores mudam por nível, os três níveis aparecem certos?
4. **Segurança e privacidade** (ids `seguranca.*`, `privacidade.*`, `dados.*`, `visao.*`, e qualquer regra sobre dor, sinais de alerta, triagem, lesão, gravidez, foto ou dados pessoais): aqui **nada pode ficar de fora**: cada limite, sinal, ação e destino do dado que está na regra ou nos valores tem de estar na frase. Para essas regras **não há limite de palavras**. Se faltar algo, a sua sugestão de frase tem de trazer de volta.
5. **Linguagem.** Uma pessoa leiga entende? Sobrou sigla interna (R1b, R5d, G5), nome de arquivo, id de outra regra, data de decisão, "RIR" (o certo é "repetições de reserva"), travessão, markdown? Há termo técnico sem explicação que dá para trocar por palavra simples **sem mudar o sentido**?
6. **Título:** até 8 palavras, sem dois-pontos e sem ponto final, diz o assunto.
7. **Tamanho:** fora de segurança e privacidade, a frase deve ter até 45 palavras (até 80 se tiver passos numerados ou tratar de dor). Se uma frase comum passa disso, proponha uma mais curta que continue fiel. Se, ao contrário, a frase curta deixou de fora uma condição ou um limite numérico que muda o que a pessoa entende da regra, proponha uma versão que o inclua (até 80 palavras).

Quem escreveu deixou dúvidas anotadas no campo `duvidas` do arquivo de saída do lote. Leia cada uma e resolva o que der **com o texto da regra e, se precisar, com o código do app** (só leitura, em /home/user/treino-mvp: `src/domain/`, `src/features/`, `docs/pesquisa/regras.md`). Se o código mostrar o que um trecho ambíguo da regra quer dizer, pode usar isso para escolher a redação certa, mas não acrescente à frase nada que não esteja no texto ou nos valores da regra. NUNCA leia a pasta `privado/`. Não edite nenhum arquivo do repositório.

## Saída

Um arquivo JSON:

```json
{
  "conferidas": 43,
  "correcoes": [
    {
      "id": "id.da.regra",
      "gravidade": "erro" | "falta" | "linguagem" | "tamanho",
      "problema": "o que está errado, citando o trecho da regra que mostra isso",
      "titulo": "o título corrigido (ou o mesmo, se não muda)",
      "frase": "a frase corrigida inteira"
    }
  ],
  "sem_solucao": [
    { "id": "id.da.regra", "motivo": "por que nem a regra nem o código deixam decidir" }
  ]
}
```

- `erro`: a frase afirma algo que a regra não diz, ou diz diferente. `falta`: ficou de fora algo essencial (sempre, em segurança e privacidade). `linguagem`: jargão, termo difícil, frase confusa. `tamanho`: longa demais.
- Só entre em `correcoes` o que precisa mudar. Uma frase boa não entra.
- Toda correção traz o título e a frase completos, prontos para substituir, seguindo as mesmas regras de estilo: pt-BR simples, sem travessão, sem markdown, "repetições de reserva" no lugar de RIR, aspas curvas “ ” só para nomes de botões e telas.
