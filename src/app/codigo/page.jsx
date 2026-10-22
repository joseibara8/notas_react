"use client";

import { useState } from "react";
import Link from "next/link";
import "./codigo.css";

export default function Codigo() {
  const [codigo, setCodigo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Aquí puedes conectar la validación del código con tu API.
    console.log("Código ingresado:", codigo);
  }

  return (
    <main className="codigo-contenedor">
      <form className="codigo-formulario" onSubmit={handleSubmit}>
        <h1 className="codigo-titulo">Confirma tu correo</h1>

        <p className="codigo-descripcion">
          Ingresa el código de confirmación que enviamos
          a tu correo electrónico.
        </p>

        <label className="codigo-label" htmlFor="codigo">
          Código de confirmación
        </label>

        <input
          className="codigo-input"
          id="codigo"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="Ingresa tu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />

        <button className="codigo-boton" type="submit">
          Confirmar código
        </button>

        <p className="codigo-enlace">
          ¿Te equivocaste?{" "}
          <Link href="/login">Volver al inicio de sesión</Link>
        </p>
      </form>
    </main>
  );
}