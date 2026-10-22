"use client";

import { useState } from "react";
import "./login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    // Aquí conectaremos el inicio de sesión con la API después.
    console.log({
      correo,
      contraseña,
    });
  }

  return (
    <main className="login-contenedor">
      <form className="login-formulario" onSubmit={onSubmit}>
        <h1 className="login-titulo">Iniciar sesión</h1>

        <p className="login-descripcion">
          Bienvenido de nuevo a tus notas.
        </p>

        <label className="login-label" htmlFor="correo">
          Correo electrónico
        </label>

        <input
          className="login-input"
          id="correo"
          type="email"
          placeholder="ejemplo@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label className="login-label" htmlFor="contraseña">
          Contraseña
        </label>

        <input
          className="login-input"
          id="contraseña"
          type="contraseña"
          placeholder="Escribe tu contraseña"
          value={contraseña}
          onChange={(e) => setcontraseña(e.target.value)}
          required
        />

        <button className="login-boton" type="submit">
          Entrar
        </button>

        <p className="login-enlace">
          ¿No tienes una cuenta?{" "}
          <a href="/register">Regístrate</a>
        </p>
      </form>
    </main>
  );
}