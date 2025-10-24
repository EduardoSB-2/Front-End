"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Livro { _id: string; titulo: string; autor: string; ISBN: string; status: string; }
interface Membro { _id: string; nome: string; email: string; }
interface Emprestimo {
  _id: string;
  livroId: { titulo: string; autor: string; ISBN: string };
  membroId: { nome: string; email: string };
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal?: string;
  status: string;
}

export default function EmprestimosPage() {
  const router = useRouter();
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ livroId: "", membroId: "", dataDevolucaoPrevista: "" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [emprestimosRes, livrosRes, membrosRes] = await Promise.all([
        fetch("/api/emprestimos"), fetch("/api/livros"), fetch("/api/membro")
      ]);
      if (emprestimosRes.ok) setEmprestimos(await emprestimosRes.json());
      if (livrosRes.ok) setLivros((await livrosRes.json()).filter((l: Livro) => l.status === "Disponível"));
      if (membrosRes.ok) setMembros(await membrosRes.json());
    } catch { setError("Erro ao conectar com o servidor"); } finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/emprestimos", {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, dataDevolucaoPrevista: new Date(formData.dataDevolucaoPrevista) })
      });
      if (response.ok) {
        setShowForm(false); setFormData({ livroId: "", membroId: "", dataDevolucaoPrevista: "" }); fetchData();
      } else { setError("Erro ao criar empréstimo"); }
    } catch { setError("Erro ao conectar com o servidor"); }
  };

  const handleDevolver = async (id: string) => {
    try {
      const response = await fetch(`/api/emprestimos/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'devolver' })
      });
      if (response.ok) fetchData(); else setError("Erro ao devolver livro");
    } catch { setError("Erro ao conectar com o servidor"); }
  };

  const handleLogout = async () => { await fetch('/api/logout', { method: 'POST' }); router.push("/login"); };

  if (loading) return <div className="container"><p>Carregando empréstimos...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;

  return (
    <div className="container">
      <header>
        <h1>Empréstimos e Devoluções</h1>
        <div className="actions">
          <button className="btn primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Novo Empréstimo"}
          </button>
          <button className="btn ghost" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>Novo Empréstimo</h3>
          <select value={formData.livroId} onChange={(e) => setFormData({...formData, livroId: e.target.value})} required>
            <option value="">Selecione um livro</option>
            {livros.map((livro) => <option key={livro._id} value={livro._id}>{livro.titulo} - {livro.autor}</option>)}
          </select>
          <select value={formData.membroId} onChange={(e) => setFormData({...formData, membroId: e.target.value})} required>
            <option value="">Selecione um membro</option>
            {membros.map((membro) => <option key={membro._id} value={membro._id}>{membro.nome} - {membro.email}</option>)}
          </select>
          <input type="date" value={formData.dataDevolucaoPrevista} onChange={(e) => setFormData({...formData, dataDevolucaoPrevista: e.target.value})} required min={new Date().toISOString().split('T')[0]} />
          <button type="submit" className="btn primary">Criar Empréstimo</button>
        </form>
      )}

      <main className="grid">
        {emprestimos.map((emprestimo) => (
          <div key={emprestimo._id} className="card">
            <h3>{emprestimo.livroId.titulo}</h3>
            <p><strong>Autor:</strong> {emprestimo.livroId.autor}</p>
            <p><strong>Membro:</strong> {emprestimo.membroId.nome}</p>
            <p><strong>Data Empréstimo:</strong> {new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</p>
            <p><strong>Devolução Prevista:</strong> {new Date(emprestimo.dataDevolucaoPrevista).toLocaleDateString()}</p>
            <span className={emprestimo.status === "ativo" ? "status warning" : "status success"}>{emprestimo.status}</span>
            {emprestimo.status === "ativo" && <button className="btn primary" onClick={() => handleDevolver(emprestimo._id)}>Devolver Livro</button>}
          </div>
        ))}
      </main>
    </div>
  );
}
