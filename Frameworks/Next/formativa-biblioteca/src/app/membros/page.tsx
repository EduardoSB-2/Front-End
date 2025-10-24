"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Membro { _id: string; nome: string; email: string; funcao: string; }

export default function MembrosPage() {
  const router = useRouter();
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "", funcao: "membro" });

  useEffect(() => { fetchMembros(); }, []);

  const fetchMembros = async () => {
    try {
      const response = await fetch("/api/membro");
      if (response.ok) setMembros(await response.json());
      else setError("Erro ao carregar membros");
    } catch { setError("Erro ao conectar com o servidor"); } finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/membro", {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowForm(false); setFormData({ nome: "", email: "", senha: "", funcao: "membro" }); fetchMembros();
      } else setError("Erro ao criar membro");
    } catch { setError("Erro ao conectar com o servidor"); }
  };

  const handleLogout = async () => { await fetch('/api/logout', { method: 'POST' }); router.push("/login"); };

  if (loading) return <div className="container"><p>Carregando membros...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;

  return (
    <div className="container">
      <header>
        <h1>Cadastro de Usuários</h1>
        <div className="actions">
          <button className="btn primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Novo Membro"}
          </button>
          <button className="btn ghost" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>Novo Membro</h3>
          <input type="text" placeholder="Nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Senha" value={formData.senha} onChange={(e) => setFormData({...formData, senha: e.target.value})} required />
          <select value={formData.funcao} onChange={(e) => setFormData({...formData, funcao: e.target.value})}>
            <option value="membro">Membro</option>
            <option value="bibliotecario">Bibliotecário</option>
          </select>
          <button type="submit" className="btn primary">Criar</button>
        </form>
      )}

      <main className="grid">
        {membros.map((membro) => (
          <div key={membro._id} className="card">
            <h3>{membro.nome}</h3>
            <p><strong>Email:</strong> {membro.email}</p>
            <p><strong>Função:</strong> {membro.funcao}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
