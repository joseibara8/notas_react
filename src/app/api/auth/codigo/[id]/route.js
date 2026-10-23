import { NextResponse } from "next/server";
import { pool } from "@/libs/db";


export async function GET(request, { params }) {
    const { id } = await params;
    const result = await pool.query(
        "SELECT * FROM usuarios_pendientes WHERE id = $1",
      [id]
    );
    console.log(result.rows);

    return NextResponse.json(result.rows);
}
