import { NextResponse } from "next/server";
import { pool } from "@/libs/db";



export async function GET(request, { params }) {

    const result = await pool.query(
        "SELECT * FROM notas"
    );
    console.log(result.rows);

    return NextResponse.json(result.rows);
}

export async function POST(request, { params }) {

    const {titulo, tarea} = await request.json();
    const nuevaNota = await pool.query(
        "INSERT INTO notas (titulo, tarea) VALUES ($1, $2) RETURNING *",
        [titulo, tarea]
    );
    console.log(nuevaNota.rows);
    return NextResponse.json("nota creada " );
}
