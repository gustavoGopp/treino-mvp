// Quem responde pelo app e como falar com ele (P2, P5). Vem de variáveis de ambiente do build (Vercel), nunca do código:
// nenhum dado pessoal vai para o repositório (CLAUDE.md). Sem as variáveis, as telas dizem "fale com quem te mandou o link".
//   VITE_CONTATO_EMAIL: e-mail do canal de problemas e dos pedidos sobre dados (LGPD, art. 18; Res. CD/ANPD 2/2022, art. 11).
//   VITE_RESPONSAVEL: nome de quem mantém o app (LGPD, art. 9º, III).

export const CONTATO_EMAIL: string = (import.meta.env.VITE_CONTATO_EMAIL ?? '').trim();
export const RESPONSAVEL: string = (import.meta.env.VITE_RESPONSAVEL ?? '').trim();
