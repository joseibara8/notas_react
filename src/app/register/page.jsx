"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./register.css";

export default function Registro() {
const [nombre, setNombre] = useState("");
const [correo, setCorreo] = useState("");
const [contraseña, setContraseña] = useState("");
const [confirmarcontraseña, setConfirmarcontraseña] = useState("");
const router = useRouter();

 async function onSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        contraseña
      }),
    });

    if (!res.ok) {
      console.error("No se pudo crear el usuario");
      return;
    }

    const data = await res.json();
    console.log(data + "si");

    setNombre("");
    setCorreo("");
    setContraseña("");
    
    router.push(`/codigo/${data.id}`);
  }

return (
<main className="registro-contenedor">
<form className="registro-formulario" onSubmit={onSubmit}>
<h1 className="registro-titulo">Crear cuenta</h1>

    <p className="registro-descripcion">
      Regístrate para comenzar a guardar tus notas.
    </p>

    <label className="registro-label" htmlFor="nombre">
      Nombre
    </label>
    <input
      className="registro-input"
      id="nombre"
      type="text"
      placeholder="Tu nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      required
    />

    <label className="registro-label" htmlFor="correo">
      Correo electrónico
    </label>
    
    <input
      className="registro-input"
      id="correo"
      type="email"
      placeholder="ejemplo@correo.com"
      value={correo}
      onChange={(e) => setCorreo(e.target.value)}
      required
    />

    <label className="registro-label" htmlFor="contraseña">
      Contraseña
    </label>
    <input
      className="registro-input"
      id="contraseña"
      type="contraseña"
      placeholder="Crea una contraseña"
      value={contraseña}
      onChange={(e) => setContraseña(e.target.value)}
      required
    />

    <label className="registro-label" htmlFor="confirmarcontraseña">
      Confirmar contraseña
    </label>
    <input
      className="registro-input"
      id="confirmarcontraseña"
      type="contraseña"
      placeholder="Repite tu contraseña"
      value={confirmarcontraseña}
      onChange={(e) => setConfirmarcontraseña(e.target.value)}
      required
    />

    <button className="registro-boton" type="submit">
      Registrarme
    </button>

    <p className="registro-enlace">
      ¿Ya tienes una cuenta?{" "}
      <a href="/login">Inicia sesión</a>
    </p>
  </form>
</main>

);
}