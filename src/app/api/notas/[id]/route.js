
import { NextResponse } from "next/server";
import { pool } from "@/libs/db";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const result = await pool.query(
      "SELECT * FROM notas WHERE id = $1",
      [id]
    );

    console.log(result.rows);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Nota no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener la nota" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    const result = await pool.query(
      "DELETE FROM notas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Nota no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      mensaje: "Nota eliminada correctamente",
      nota: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar la nota" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { titulo, tarea } = await request.json();

  try {
    const result = await pool.query(
      `UPDATE notas
       SET titulo = COALESCE($1, titulo),
           tarea = COALESCE($2, tarea)
       WHERE id = $3
       RETURNING *`,
      [titulo ?? null, tarea ?? null, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Nota no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar la nota" },
      { status: 500 }
    );
  }
}
