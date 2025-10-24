import "./globals.css";

export const metadata = {
  title: "Gerenciamento de Biblioteca ",
  description: "Sistema de organização de empréstimos e devoluções de livro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-wrapper">
          <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            <h1>Biblioteca Comunitária Ler é Viver
            </h1>
          </header>
          <main style={{ padding: 16 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
