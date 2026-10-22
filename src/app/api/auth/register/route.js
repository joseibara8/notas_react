import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import bcrypt from "bcrypt";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





export async function POST(request, { params }) {
    
  const {nombre, correo,contraseña} = await request.json();
  if (!emailRegex.test(correo)) {
        return Response.json(
    { error: "Correo inválido" },
    { status: 400 }
  )
  }
  const passwordHash = await bcrypt.hash(contraseña, 10);
  const nuevaUsuario = await pool.query(
      "INSERT INTO usuarios (nombre, correo,contraseña) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo,passwordHash]
  );
  console.log(nuevaUsuario.rows);
  return NextResponse.json("usuario creado " );
  

}
export async function GET(request, { params }) {

    const {nombre, correo,contraseña} = await request.json();
    const nuevaUsuario = await pool.query(
        "SELECT * FROM usuarios",
        [nombre, correo,contraseña]
    );
    console.log(nuevaUsuario.rows);
    return NextResponse.json("usuario creado " );
}
