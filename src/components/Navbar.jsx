"use client";
import "./navbar.css";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  async function cerrarSesion() {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.replace("/login");
      router.refresh();
    }
    }


  return (
    <nav className="navbar">
      <h1>Creador de notas</h1>
        <button
          type="button"
          className="cerrar_session"
          onClick={cerrarSesion}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
          Logout
          </span>
        </button>
    </nav>
  );
}

