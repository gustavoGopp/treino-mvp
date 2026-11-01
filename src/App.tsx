import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EstadoProvider } from './features/app/estado';
import { Dados } from './features/dados/Dados';
import { Guia } from './features/guia/Guia';
import { BoasVindas } from './features/onboarding/BoasVindas';
import { Inventario } from './features/onboarding/Inventario';
import { Nivel } from './features/onboarding/Nivel';
import { Restricoes } from './features/onboarding/Restricoes';
import { Rotina } from './features/onboarding/Rotina';
import { Triagem } from './features/onboarding/Triagem';
import { Programa } from './features/programa/Programa';
import { Resumo } from './features/treino/Resumo';
import { Treino } from './features/treino/Treino';

// Só em desenvolvimento: fora do bundle de produção.
const GeradorDev = import.meta.env.DEV ? lazy(() => import('./features/dev/GeradorDev').then((m) => ({ default: m.GeradorDev }))) : null;

export function App() {
  return (
    <EstadoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          <Route path="/comecar/triagem" element={<Triagem />} />
          <Route path="/comecar/nivel" element={<Nivel />} />
          <Route path="/comecar/rotina" element={<Rotina />} />
          <Route path="/comecar/inventario" element={<Inventario />} />
          <Route path="/comecar/restricoes" element={<Restricoes />} />
          <Route path="/programa" element={<Programa />} />
          <Route path="/treino" element={<Treino />} />
          <Route path="/treino/fim" element={<Resumo />} />
          <Route path="/dados" element={<Dados />} />
          <Route path="/guia" element={<Navigate to="/guia/supino-inclinado" replace />} />
          <Route path="/guia/:id" element={<Guia />} />
          {GeradorDev && (
            <Route
              path="/dev/gerador"
              element={
                <Suspense fallback={null}>
                  <GeradorDev />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </EstadoProvider>
  );
}
