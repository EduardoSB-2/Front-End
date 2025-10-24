"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Emprestimo {
  _id: string;
  livroId: { titulo: string; autor: string; ISBN: string };
  membroId: { nome: string; email: string };
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal?: string;
  status: string;
}

export default function MeusEmprestimosPage() {
  const router = useRouter();
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchMeusEmprestimos(); }, []);

  const fetchMeusEmprestimos = async () => {
    try {
      const response = await fetch("/api/emprestimos");
      if (response.ok) {
        const data = await response.json();
        setEmprestimos(data.filter((emp: Emprestimo) => emp.status === "ativo"));
      } else {
        setError("Erro ao carregar empréstimos");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => { await fetch('/api/logout', { method: 'POST' }); router.push("/login"); };

  if (loading) return <div className="container"><p>Carregando seus empréstimos...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;

  return (
    <div className="container">
      <header>
        <h1>Meus Empréstimos</h1>
        <button className="btn ghost" onClick={handleLogout}>Logout</button>
      </header>

      <main className="grid">
        {emprestimos.length === 0 ? (
          <p>Você não possui empréstimos ativos.</p>
        ) : (
          emprestimos.map((emprestimo) => (
            <div key={emprestimo._id} className="card">
              <h3>{emprestimo.livroId.titulo}</h3>
              <p><strong>Autor:</strong> {emprestimo.livroId.autor}</p>
              <p><strong>Data Empréstimo:</strong> {new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</p>
              <p><strong>Devolução Prevista:</strong> {new Date(emprestimo.dataDevolucaoPrevista).toLocaleDateString()}</p>
              <span className="status warning">{emprestimo.status}</span>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
