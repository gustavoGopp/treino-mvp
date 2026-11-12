# Guia: abrir o app para família e amigos (Gustavo, 08/11/2026)

O passo a passo do que fica com o Gustavo depois do R5c. Nada aqui precisa de código. Os endereços são do Claude Console
(Anthropic) e da Vercel; os nomes dos menus podem mudar um pouco com o tempo.

**Endereço do app:** https://treino-mvp-sigma.vercel.app

---

## Parte 1. Mandar o link agora, sem a foto (já está pronto)

A foto está desligada: ninguém precisa de código, e nada sai do celular de ninguém.

**1. Teste você mesmo uma vez (5 minutos).** Abra o link no celular, faça o cadastro até "Seu treino" e veja se está tudo
certo. Se tiver um iPhone por perto (seu ou de alguém), abra no Safari e confira:
- aparece a faixa "Instale o app para não perder seus dados";
- depois de instalar, o ícone na tela de início é o halter verde;
- o app instalado abre vazio ou com o que você fez no Safari (anote no devlog: o aviso já pede para exportar antes).

**2. Mande a mensagem.** Modelo para copiar:

> Oi! Estou testando um app de treino que eu fiz. Ele monta um treino com o equipamento que você tem e mostra como fazer
> cada exercício. É de graça e os seus dados ficam só no seu celular.
>
> Link: https://treino-mvp-sigma.vercel.app
>
> 1. Abra o link e **instale na tela de início**:
>    - iPhone: no Safari, toque em Compartilhar (o quadrado com a seta) → "Adicionar à Tela de Início".
>    - Android: no Chrome, toque nos 3 pontinhos → "Instalar app" (ou "Adicionar à tela inicial").
> 2. Abra pelo ícone e faça o cadastro (leva uns minutos).
> 3. De vez em quando, em "Meus dados", toque em "Exportar meus dados": é a sua cópia de segurança.
>
> Se algo der errado, a tela mostra "Avisar um problema": copie o texto e me mande.

**3. Quando alguém avisar um problema,** a pessoa vai te mandar um texto com "Versão", "Aparelho" e "Tela". Cole esse texto numa
sessão do Claude Code com o repositório.

---

## Parte 2. Ligar a foto para os amigos (quando quiser)

São 4 etapas: créditos, chave, convites e ligar. Faça na ordem.

### Etapa A. Créditos na Anthropic (o seu teto de gasto)
1. Entre em https://platform.claude.com com a sua conta pessoal (não a conta de trabalho).
2. Menu da esquerda → **Gastos** → **Cobrança e pagamentos**.
3. Confira que aparece **"A recarga automática está desativada"**. Deixe assim: é ela que garante que o gasto nunca passa do saldo.
4. Hoje o saldo é **US$ 4,97**. Dá para uns 35 envios de 5 fotos (estimativa). Se quiser mais, toque em **Comprar créditos**
   e compre só o que aceita gastar (ex.: US$ 5).
5. Para acompanhar: **Gastos** → **Custo e gastos** mostra quanto já foi usado.

### Etapa B. A chave da API na Vercel (confira se já existe)
1. Entre em https://vercel.com → abra o projeto **treino-mvp**.
2. **Settings** (Configurações) → **Environment Variables** (Variáveis de ambiente).
3. Procure **`ANTHROPIC_API_KEY`** na lista.
   - **Se já existe:** pule para a etapa C.
   - **Se não existe:**
     1. No Claude Console: menu → **API keys** (Chaves da API) → **Create key** (Criar chave). Dê o nome `treino-mvp-vercel`.
     2. Copie a chave (começa com `sk-ant-`). Ela só aparece uma vez. **Nunca cole em chat, e-mail ou no repositório.**
     3. Na Vercel, em Environment Variables: **Key** = `ANTHROPIC_API_KEY`, **Value** = a chave, marque **Production** e
        **Preview**, e toque em **Save**.

### Etapa C. Um código de convite por pessoa
1. Invente um código para cada amigo: curto, sem espaço e difícil de adivinhar. Use o nome e 4 letras ou números
   misturados, por exemplo: `ANA-7Q4K`, `JOAO-M2XP`, `MAE-H8RT`. Maiúsculas ou minúsculas tanto faz.
2. Anote numa lista **só sua** (no seu celular, fora do repositório) quem recebeu qual código.
3. Na Vercel → **Settings** → **Environment Variables**:
   - Se `CONVITES` não existe: **Add** → **Key** = `CONVITES`, **Value** = os códigos separados por vírgula, sem espaço:
     `ANA-7Q4K,JOAO-M2XP,MAE-H8RT`. Marque **Production** e **Preview** → **Save**.
   - Se já existe: toque nos 3 pontinhos ao lado → **Edit** → acrescente os códigos novos com vírgula → **Save**.

### Etapa D. Ligar a foto
1. Ainda em Environment Variables: **Add** → **Key** = `VITE_FOTO`, **Value** = `ligada` (assim, minúsculo), marque
   **Production** e **Preview** → **Save**.
2. **Publique de novo** (sem isso, nada muda: a Vercel só lê as variáveis numa publicação nova):
   1. Aba **Deployments** (Publicações).
   2. Na primeira linha (a mais recente, com a etiqueta **Production**), toque nos 3 pontinhos → **Redeploy** → confirme.
   3. Espere 1 a 2 minutos até ficar **Ready** (pronto).
3. **Teste no seu celular:**
   1. Abra o app (se estiver instalado, feche e abra de novo; pode precisar abrir 2 vezes para pegar a versão nova).
   2. **Meus dados** → **Ver meus locais** → **Editar nome e equipamento**.
   3. Deve aparecer **"Reconhecer pela foto"** com a caixa **"Antes de enviar: para onde vai a foto"**.
   4. Marque "Autorizo…", digite **um** dos códigos e escolha 1 foto. Em alguns segundos aparece "O que encontramos nas fotos".
   5. Se aparecer "Código de convite inválido": confira o código em `CONVITES` e se você fez o Redeploy.
      Se aparecer "ainda não está configurado": falta a `ANTHROPIC_API_KEY` (etapa B).
      Se aparecer "Não foi possível analisar as fotos agora": veja se há saldo (etapa A).
4. **Mande o código para cada amigo**, só o dele:
   > A foto do equipamento está ligada. Em "Meus dados" → "Ver meus locais" → "Editar nome e equipamento", marque a
   > autorização, digite o código **ANA-7Q4K** e mande até 5 fotos do lugar onde você treina. Não precisa fotografar
   > pessoas. Se preferir, a lista de equipamento faz o mesmo.

### Se um código vazar (alguém repassou)
Vercel → **Settings** → **Environment Variables** → `CONVITES` → **Edit** → apague só aquele código → **Save** →
**Deployments** → **Redeploy**. Os outros continuam funcionando.

### Para desligar a foto de novo
Vercel → **Environment Variables** → `VITE_FOTO` → 3 pontinhos → **Delete** → **Redeploy**.

---

## Parte 3. Opcionais (só se quiser)

**Seu nome e e-mail nos termos e no "Avisar um problema".** Hoje os termos dizem que o responsável é "quem te mandou o
link". Para trocar: Environment Variables → `VITE_RESPONSAVEL` = seu nome, e `VITE_CONTATO_EMAIL` = o e-mail que você quer
mostrar (fica público no app) → **Save** → **Redeploy**. Com o e-mail, o botão abre o e-mail da pessoa com a mensagem pronta.

**Limite de fotos que vale entre todos os servidores (Upstash, grátis).** Só faz diferença com muita gente; o saldo já
protege o bolso. Vercel → projeto **treino-mvp** → aba **Storage** (ou **Marketplace**) → **Upstash** (Redis) → criar
no plano grátis e **conectar ao projeto treino-mvp**. Ele cria sozinho as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`
→ **Redeploy**. O app passa a usar o banco sem mais nada.

---

## Resumo em uma linha por etapa
| Quando | O quê | Onde |
|---|---|---|
| Agora | Testar no celular e mandar o link | o app |
| Para ligar a foto | Recarga automática desligada; créditos se quiser | Claude Console → Gastos → Cobrança e pagamentos |
| Para ligar a foto | `ANTHROPIC_API_KEY` existe | Vercel → Settings → Environment Variables |
| Para ligar a foto | `CONVITES` com um código por pessoa | Vercel → Settings → Environment Variables |
| Para ligar a foto | `VITE_FOTO` = `ligada` e Redeploy | Vercel → Environment Variables e Deployments |
| Se vazar | Tirar o código e Redeploy | Vercel |
