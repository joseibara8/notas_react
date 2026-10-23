"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./codigo.css";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Codigo() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [codigo_recivido, setcodigo_recivido] = useState("");
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
  console.log("EL USEEFFECT SE EJECUTÓ");

  async function LoadUser() {
    console.log("ENTRÉ A LOADUSER");

    try {
      const res = await fetch(`/api/auth/codigo/${id}`);
        
        
      const data = await res.json();
      setUsuario(data);
      console.log("ID recibido:", id);
        console.log("Respuesta de la API:", data);
    } catch (error) {
      console.error("ERROR EN LOADUSER:", error);
    }
  }

  LoadUser();
}, [id]);

    function onSubmit(e) {
  e.preventDefault();
 if (!usuario) {
    console.log("El usuario todavía no está cargado");
    return;
  }

  if (usuario[0].codigo != codigo_recivido) {
    console.log("Los códigos no coinciden");
    return;
  }

  router.push("/login")
}

    return (
        <main className="codigo-contenedor">
            <form className="codigo-formulario" >
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
                    value={codigo_recivido}
                    onChange={(e) => setcodigo_recivido(e.target.value)}
                    required
                />

                <button className="codigo-boton"
                 type="submit"
                  onClick={onSubmit}>
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