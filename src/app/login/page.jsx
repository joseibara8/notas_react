"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();
  const [mensaje_correo, setMensaje_correo] = useState("");
  const [mensaje_contraseña, setMensaje_contraseña] = useState("");
  const [mensaje_exito, setMensaje_exito] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(true);

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
    const data = await res.json();
    setMensaje_exito(data.mensaje);
    setMensaje_correo("");
    setMensaje_contraseña("");

    if (!res.ok) {
      if (data.error_correo) {
        setMensaje_correo(data.error_correo);
        mensaje_exito("");
        return;
      }
      if (data.error_contraseña) {
        setMensaje_contraseña(data.error_contraseña);
        mensaje_exito("");
        return;
      }
    }

    router.push("/");
  }

  return (
    <main className="login-contenedor">
      <form className="login-formulario" onSubmit={onSubmit}>
        <h1 className="login-titulo">Iniciar sesión</h1>

        <p className="login-descripcion">Bienvenido de nuevo a tus notas.</p>

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
        {mensaje_correo !== "" && (
          <p className="mensaje-error">{mensaje_correo}</p>
        )}

        <label className="login-label" htmlFor="contraseña">
          Contraseña
        </label>

        <div className="contenedor_contraseña">
        <input
          className="login-input"
          id="contraseña"
          type={mostrarPassword ? "text" : "password"}
          placeholder="Escribe tu contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button
          type="button"
          className="boton-visibility"
          onClick={() => setMostrarPassword(!mostrarPassword)}
          aria-label={
            mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {mostrarPassword ? "visibility" : "visibility_off"}
          </span>
        </button>
        </div>

        {mensaje_contraseña !== "" && (
          <p className="mensaje-error1">{mensaje_contraseña}</p>
        )}

        <button className="login-boton" type="submit">
          Entrar
        </button>
        {mensaje_exito !== "" && (
          <p className="mensaje-exito">{mensaje_exito}</p>
        )}

        <p className="login-enlace">
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </main>
  );
}
