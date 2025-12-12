"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number | string) => {
    if (!confirm("Tem certeza que deseja excluir esta pessoa?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/pessoa/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to delete pessoa ${id}`);
      }

      // Remove from local state
      setPessoas((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      console.error("Failed to delete pessoa:", err);
      alert("Erro ao excluir pessoa. Veja o console para mais detalhes.");
    }
  };

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pessoa");
        //console.log("Fetch response:", res);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        //console.log("Fetched data:", data);
        setPessoas(Array.isArray(data.details) ? data.details : []);
      } catch (err) {
        console.error("Failed to fetch pessoas:", err);
        setPessoas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoas();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <header>
          <h1 className="container">Pessoas</h1>
        </header>

        <div className="container">
          <div className="toolbar">
            <div></div>
            <Link href="/form_pessoa">
              <button className="btn">Nova Pessoa</button>
            </Link>
          </div>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th className="desktop-only">Email</th>
                  <th className="desktop-only">Telefone</th>
                  <th >Ações</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center">Carregando...</td>
                  </tr>
                ) : pessoas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">Nenhuma pessoa encontrada.</td>
                  </tr>
                ) : (
                  pessoas.map((p: any) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nome}</td>
                      <td className="desktop-only">{p.email ?? "—"}</td>
                      <td className="desktop-only">{p.telefone ?? "—"}</td>
                      <td>
                        <div className="actions">
                          {/* <Link href={`/pessoa/${p.id}`}><button className="btn ghost">Ver</button></Link> */}
                          <Link href={`/form_pessoa?id=${p.id}`}><button className="btn ghost">Editar</button></Link>
                          <button className="btn ghost" onClick={() => handleDelete(p.id)}>Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
