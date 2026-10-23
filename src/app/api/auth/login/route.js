import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";

export async function POST(request) {
  try {
    const { correo, contraseña } = await request.json();

    const resultado_correo = await pool.query(
      "SELECT id, correo, contraseña FROM usuarios WHERE correo = $1",
      [correo],
    );

    if (resultado_correo.rows.length === 0) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 },
      );
    }

    const usuario = resultado_correo.rows[0];

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!coincide) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 },
      );
    }

    const session = await getIronSession(await cookies(), sessionOptions);

    session.user = {
      id: usuario.id,
    };

    await session.save();

    return NextResponse.json({
      mensaje: "Inicio de sesión correcto",
      id: usuario.id,
    });
  } catch (error) {
    console.error("Error en login:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
