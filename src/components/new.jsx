"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./new.css";

export default function New() {
  const [titulo, setTitulo] = useState("");
  const [tarea, setTarea] = useState("");
  const router = useRouter();


  
  /*---------------GET-------------*/ 
  async function onSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        tarea,
      }),
    });

    if (!res.ok) {
      console.error("No se pudo crear la nota");
      return;
    }

    const data = await res.json();
    console.log(data);

    setTitulo("");
    setTarea("");

    router.refresh();
  }
  



  return (
    
      <form className="formulario" onSubmit={onSubmit}>
        <h1>Crear nueva nota</h1>

        <input
          name="titulo"
          placeholder="Título..."
          type="text"
          className="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          name="tarea"
          placeholder="Contenido..."
          className="texto"
          rows="3"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
        />

        <button className="boton" type="submit">
          Enviar
        </button>
      </form>
 
  );
}