"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();

 async function onSubmit(e) {
    e.preventDefault();

    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo,
        contraseña,
      
      }),
    });

    if (!res.ok) {
      console.error("No se pudo CREAR EL USUARIO");
      return;
    }
  router.push("/")
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
          onChange={(e) => setContraseña(e.target.value)}
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