import { NextResponse } from "next/server";
import { pool } from "@/libs/db";


export async function POST(request, { params }) {
  const { nombre, correo, contraseña } = await request.json();


  const nuevaUsuario = await pool.query(
    "INSERT INTO usuarios (nombre, correo,contraseña) VALUES ($1, $2, $3) RETURNING *",
    [nombre, correo, contraseña],
  );


  console.log(nuevaUsuario.rows);
  return NextResponse.json({
    id: nuevaUsuario.rows[0].id
});
}
