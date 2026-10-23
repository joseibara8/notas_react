
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import { NextResponse } from "next/server";
import { pool } from "@/libs/db";



export async function GET() {
  try {
    const session = await getIronSession(
      await cookies(),
      sessionOptions
    );

    if (!session.user?.id) {
      return NextResponse.json(
        { error: "Debes iniciar sesión" },
        { status: 401 }
      );
    }

    const result = await pool.query(
      "SELECT * FROM notas WHERE usuario_id = $1 ORDER BY id DESC",
      [session.user.id]
    );

    await pool.query(
      "DELETE FROM usuarios_pendientes WHERE expires_at <= NOW()"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al cargar notas:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {

     const session = await getIronSession(
      await cookies(),
      sessionOptions
    );
     if (!session.user?.id) {
      return NextResponse.json(
        { error: "Debes iniciar sesión" },
        { status: 401 }
      );
    }

    const {titulo, tarea} = await request.json();
     const nuevaNota = await pool.query(
      `INSERT INTO notas (titulo, tarea, usuario_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [titulo, tarea, session.user.id]
    );
    

    console.log(nuevaNota.rows);
    return NextResponse.json("nota creada " );
}


