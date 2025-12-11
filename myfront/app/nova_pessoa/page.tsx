"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [titulo, setTitulo] = useState("Cadastrar Pessoa");

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

            <form id="formPessoa">
              <input type="hidden" id="id" />

              <div className="full">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Digite o nome" />
              </div>

              <div className="full">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="email@exemplo.com" />
              </div>

              <div className="full">
                <label htmlFor="telefone">Telefone (opcional)</label>
                <input type="tel" id="telefone" placeholder="(xx) xxxxx-xxxx" />
              </div>

              <div className="actions full">
                <Link href="/">
                  <button className="btn ghost">Cancelar</button>
                </Link>
                <button type="button" className="btn">Salvar</button>
              </div>
            </form>
          </div>        

      </main>
    </div>
  );
}
