import "./page.css";
import TaskCard from "@/components/TaskCard";
import New from "@/components/new";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import { pool } from "@/libs/db";

async function LoadTask() {
  const session = await getIronSession(
    await cookies(),
    sessionOptions
  );

  if (!session.user?.id) {
    redirect("/login");
  }

  const result = await pool.query(
    "SELECT * FROM notas WHERE usuario_id = $1 ORDER BY id DESC",
    [session.user.id]
  );

  return result.rows;
}

export default async function HomePage() {
  const tasks = await LoadTask();
  console.log(
  "Fechas recibidas en HomePage:",
  tasks.map((task) => ({
    id: task.id,
    titulo: task.titulo,
    create_time: task.create_time,
  }))
);

  return (
    <div>
      <Navbar></Navbar>
      <div className="homePage">
        <New />

        <div className="box">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
          
        </div>
      </div>
    </div>
  );
}