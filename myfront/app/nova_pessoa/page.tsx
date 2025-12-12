"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [titulo, setTitulo] = useState("Cadastrar Pessoa");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verifica se existe ?id= na URL (executa apenas no cliente)
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      setTitulo("Editar Pessoa");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      
           <div className="card container">

            <h1 id="titulo">{titulo}</h1>

            <form id="formPessoa" onSubmit={(e) => e.preventDefault()}>
              <div className="full">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome"
                />
              </div>

              <div className="full">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="full">
                <label htmlFor="telefone">Telefone (opcional)</label>
                <input
                  type="tel"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(xx) xxxxx-xxxx"
                />
              </div>

              <div className="actions full">
                <Link href="/">
                  <button className="btn ghost" type="button">Cancelar</button>
                </Link>
                <button
                  type="button"
                  className="btn"
                  onClick={async () => {
                    if (!nome || !email) {
                      alert('Preencha nome e email');
                      return;
                    }
                    setLoading(true);
                    try {
                      const res = await fetch('http://localhost:5000/api/pessoa', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nome, email, telefone }),
                      });

                      if (!res.ok) {
                        const text = await res.text();
                        throw new Error(text || res.statusText);
                      }

                      alert('Pessoa salva com sucesso');
                      window.location.href = '/';
                    } catch (err) {
                      alert('Erro ao salvar: ' + (err instanceof Error ? err.message : String(err)));
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>        

      </main>
    </div>
  );
}
