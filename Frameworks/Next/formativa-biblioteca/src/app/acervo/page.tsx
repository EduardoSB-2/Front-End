"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Livro {
  _id: string;
  titulo: string;
  autor: string;
  ISBN: string;
  status: string;
}

export default function AcervoPage() {
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ titulo: "", autor: "", ISBN: "" });

  useEffect(() => { fetchLivros(); }, []);

  const fetchLivros = async () => {
    try {
      const response = await fetch("/api/livros");
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
      } else {
        setError("Erro ao carregar livros");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/livros", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({ titulo: "", autor: "", ISBN: "" });
        fetchLivros();
      } else {
        setError("Erro ao criar livro");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push("/login");
  };

  if (loading) return <div className="container"><p>Carregando acervo...</p></div>;
  if (error) return <div className="container"><p className="error">{error}</p></div>;

  return (
    <div className="container">
      <header>
        <h1>Acervo Online</h1>
        <div className="actions">
          <button className="btn primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "Novo Livro"}
          </button>
          <button className="btn ghost" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
          <h3>Novo Livro</h3>
          <input type="text" placeholder="Título" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} required />
          <input type="text" placeholder="Autor" value={formData.autor} onChange={(e) => setFormData({...formData, autor: e.target.value})} required />
          <input type="text" placeholder="ISBN" value={formData.ISBN} onChange={(e) => setFormData({...formData, ISBN: e.target.value})} required />
          <button type="submit" className="btn primary">Criar</button>
        </form>
      )}

      <main className="grid">
        {livros.map((livro) => (
          <div key={livro._id} className="card">
            <h3>{livro.titulo}</h3>
            <p><strong>Autor:</strong> {livro.autor}</p>
            <p><strong>ISBN:</strong> {livro.ISBN}</p>
            <span className={livro.status === "Disponível" ? "status success" : "status warning"}>
              {livro.status}
            </span>
          </div>
        ))}
      </main>
    </div>
  );
}
