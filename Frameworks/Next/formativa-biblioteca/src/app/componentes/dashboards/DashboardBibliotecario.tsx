"use client";

import { useRouter } from "next/navigation";

export default function DashboardBibliotecario() {
  const router = useRouter();

  function handleLogout() {
    fetch('/api/logout', { method: 'POST' }).then(() => router.push("/login"));
  }

  return (
    <div className="app-container">
      <div className="spaced" style={{ marginBottom: 16 }}>
        <div>
          <h2>Bem-vindo, Bibliotecário!</h2>
          <p className="small">Painel Principal do Bibliotecário</p>
        </div>
        <div className="row gap-8">
          <button className="btn secondary" onClick={() => router.push("/acervo")}>Acervo Online</button>
          <button className="btn secondary" onClick={() => router.push("/membros")}>Cadastro de Usuários</button>
          <button className="btn secondary" onClick={() => router.push("/emprestimos")}>Empréstimos e Devoluções</button>
          <button className="btn ghost" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
