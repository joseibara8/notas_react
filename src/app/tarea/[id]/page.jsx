import Link from "next/link";
import TaskCard from "@/components/TaskCard";
import "./page.css";

export default async function TareaEdit({ params }) {
  
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/notas/${id}`
  );

  if (!res.ok) {
    return <h1>Error al cargar la nota</h1>;
  }

  const nota = await res.json();

  return (
    <div className="caja">
      <TaskCard task={nota} modoEdicion={true} />
      <Link className="volver" href={"/" }>
        Volver
        </Link>
    </div>
  );
}
