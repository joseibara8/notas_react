"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./codigo.css";
import { useRouter } from "next/navigation";

export default function Codigo() {
    const router = useRouter();

    const [codigo_recivido, setcodigo_recivido] = useState("");
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function LoadUser() {
            try {
                const res = await fetch("/api/auth/register");

                if (!res.ok) {
                    console.error("Error al cargar el usuario");
                    return;
                }

                const data = await res.json();
                setUsuario(data);
            } catch (error) {
                console.error("Error en la petición:", error);
            }
        }

        LoadUser();
    }, []);

    function onSubmit(e) {
        e.preventDefault();

    console.log("Botón presionado");
    console.log("Usuario:", usuario);
    console.log("Código ingresado:", codigo_recivido);

    router.push("/login");
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