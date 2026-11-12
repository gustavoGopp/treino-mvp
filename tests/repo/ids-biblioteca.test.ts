import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { IDS_ANTIGOS } from '../../src/storage/ids';

// O id de um exercício fica guardado no aparelho de quem o registrou (histórico, programa, preferências). Este arquivo
// é a lista de todos os ids que já foram publicados; um id só pode sair da biblioteca se entrar em IDS_ANTIGOS
// (src/storage/ids.ts), com o id novo ou com null. Sem isso, o registro de quem usou o exercício ficaria sem dono.
const PUBLICADOS = JSON.parse(readFileSync('tests/repo/ids-biblioteca.json', 'utf8')) as string[];
const naBiblioteca = new Set(BIBLIOTECA.map((e) => e.id));

it('nenhum id publicado sai da biblioteca sem entrar em IDS_ANTIGOS (src/storage/ids.ts)', () => {
  const sumiram = PUBLICADOS.filter((id) => !naBiblioteca.has(id) && !(id in IDS_ANTIGOS));
  expect(sumiram, 'ids que saíram da biblioteca sem migração: acrescente cada um a IDS_ANTIGOS, com o id novo ou null').toEqual([]);
});

it('todo id da biblioteca está na lista de publicados (acrescente o id novo a tests/repo/ids-biblioteca.json)', () => {
  expect(BIBLIOTECA.map((e) => e.id).filter((id) => !PUBLICADOS.includes(id))).toEqual([]);
});

it('IDS_ANTIGOS só cita ids que saíram, e todo destino existe na biblioteca', () => {
  for (const [antigo, novo] of Object.entries(IDS_ANTIGOS)) {
    expect(naBiblioteca.has(antigo), `${antigo} ainda está na biblioteca`).toBe(false);
    expect(PUBLICADOS, `${antigo} nunca foi publicado`).toContain(antigo);
    if (novo !== null) expect(naBiblioteca.has(novo), `${antigo} → ${novo}: o destino não existe`).toBe(true);
  }
});
