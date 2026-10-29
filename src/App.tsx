import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Guia } from './features/guia/Guia';

function Inicio() {
  return (
    <main className="shell">
      <h1>Olá!</h1>
      <p>
        Em breve: monte um treino de hipertrofia só com o equipamento que você tem, com guia animado de cada exercício.
      </p>
      <Link className="cta" to="/guia">
        Ver o guia de execução
      </Link>
      <p className="muted">treino-mvp · versão de desenvolvimento</p>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/guia" element={<Navigate to="/guia/supino-inclinado" replace />} />
        <Route path="/guia/:id" element={<Guia />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
