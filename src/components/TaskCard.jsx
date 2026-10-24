
"use client";

import { useState } from "react";
import "./taskcard.css";
import { useRouter } from "next/navigation";

export default function TaskCard({ task, modoEdicion = false }) {
  const router = useRouter();

  const [titulo, setTitulo] = useState(task.titulo ?? "");
  const [tarea, setTarea] = useState(task.tarea ?? "");
console.log("Datos de la nota:", task);
console.log("Fecha de creación:", task.create_time);
  const id = task.id;

  async function onUpdate(e) {
    e.preventDefault();

    const res = await fetch("/api/notas/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        tarea,
      }),
    });

    if (!res.ok) {
      console.error("No se pudo actualizar la nota");
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function onDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    const res = await fetch("/api/notas/" + id, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("No se pudo eliminar la nota");
      return;
    }

    router.refresh();
  }

 
  // MODO EDICIÓN
  if (modoEdicion) {
    return (
      <form className="caja" onSubmit={onUpdate}>
        <div className="task">
          <h2 className="titulo-editar">Edita</h2>

          <textarea
            className="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            rows={1}
          />

          <textarea
            className="tarea"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
          />

          <div className="box-botones">
            
<p className="fecha">
  {task.create_time
    ? new Date(task.create_time).toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Mazatlan",
      })
    : ""}
</p>

            <button
              type="button"
              className="actualizar"
              onClick={() => router.push("/")}
            >
              Cancelar
            </button>

            <button type="submit"
             className="eliminar"
             onClick={onUpdate}>
              Guardar
            </button>
          </div>
        </div>
      </form>
    );
  }


  // MODO NORMAL
  return (
    <div className="caja">
      <div className="task">
        <textarea
          className="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          rows={1}
          readOnly
        />

        <textarea
          className="tarea"
          value={task.tarea ?? ""}
          readOnly
        />

        <div className="box-botones">
          <p className="fecha">
  {task.create_time
    ? new Date(task.create_time).toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Mazatlan",
      })
    : ""}
</p>

          <button
            type="button"
            className="actualizar"
            onClick={() => router.push("/tarea/" + task.id)}
          >
            Actualizar
          </button>

          <button
            type="button"
            className="eliminar"
            onClick={onDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
