import { NextResponse } from "next/server";
import { pool } from "@/libs/db";



export async function POST(request, { params }) {
  const { nombre, correo, contraseña,id} = await request.json();


  const nuevaUsuario = await pool.query(
    "INSERT INTO usuarios (nombre, correo,contraseña) VALUES ($1, $2, $3) RETURNING *",
    [nombre, correo, contraseña],
  );
   const eliminar_usuarios = await pool.query(
      "DELETE FROM usuarios_pendientes WHERE id = $1 ",
      [id]
    );
    console.log(eliminar_usuarios.rows);
  console.log(nuevaUsuario.rows);
  return NextResponse.json({
    id: nuevaUsuario.rows[0].id
});
}