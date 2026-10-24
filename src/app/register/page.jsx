"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./register.css";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarcontraseña, setConfirmarcontraseña] = useState("");
  const [nombre_vacio, setNombre_vacio] = useState("");
  const [correo_vacio, setCorreo_vacio] = useState("");
  const [contraseña_vacia, setContraseña_vacia] = useState("");
  const [contraseña2_vacia, setContraseña2_vacia] = useState("");
  const [contraseñas_difierentes, setContraseñas_difierentes] = useState("");
  const [correo_invalido, setCorreo_invalido] = useState("");

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
        contraseña,
        confirmarcontraseña,
      }),
    });

    const data = await res.json();
    setCorreo_invalido("");
    setCorreo_vacio("");
    setNombre_vacio("");
    setContraseña_vacia("");
    setContraseña2_vacia("");
    setContraseñas_difierentes("")

    if (!res.ok) {
      if (data.nombre_vacio) {
        setNombre_vacio(data.nombre_vacio);
        return;
      }
      if (data.correo_vacio) {
        setCorreo_vacio(data.correo_vacio);
        return;
      }
      if (data.contraseña_vacia) {
        setContraseña_vacia(data.contraseña_vacia);
        return;
      }
      if (data.contraseña2_vacia) {
        setContraseña2_vacia(data.contraseña2_vacia);
        return;
      }
      if (data.contraseñas_diferentes) {
        setContraseñas_difierentes(data.contraseñas_diferentes);
        return;
      }
      if (data.correo_invalido) {
        setCorreo_invalido(data.correo_invalido);
        return;
      }
    }

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
        />
        {nombre_vacio !== "" && <p className="mensaje-error">{nombre_vacio}</p>}

        <label className="registro-label" htmlFor="correo">
          Correo electrónico
        </label>

        <input
          className="registro-input"
          id="correo"
          placeholder="ejemplo@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {correo_vacio !== "" && <p className="mensaje-error">{correo_vacio}</p>}

        {correo_invalido !== "" && (
          <p className="mensaje-error">{correo_invalido}</p>
        )}

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
        />
        {contraseña_vacia !== "" && (
          <p className="mensaje-error">{contraseña_vacia}</p>
        )}
        {contraseñas_difierentes !== "" && (
          <p className="mensaje-error">{contraseñas_difierentes}</p>
        )}

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
        />
        {contraseña2_vacia !== "" && (
          <p className="mensaje-error">{contraseña2_vacia}</p>
        )}
        {contraseñas_difierentes !== "" && (
          <p className="mensaje-error">{contraseñas_difierentes}</p>
        )}

        <button className="registro-boton" type="submit">
          Registrarme
        </button>

        <p className="registro-enlace">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </main>
  );
}
