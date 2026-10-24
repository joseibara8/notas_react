import { NextResponse } from "next/server";
import { pool } from "@/libs/db";
import bcrypt from "bcrypt";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request, { params }) {
  const { nombre, correo, contraseña,confirmarcontraseña } = await request.json();
  if (nombre == "") {
      return NextResponse.json(
        { nombre_vacio: "*nombre vacio*" },
        { status: 401 },
      )
      
    }
    if (correo == "") {
      return NextResponse.json(
        { correo_vacio: "*correo vacio*" },
        { status: 401 },
      )
    }
    if (contraseña == "") {
      return NextResponse.json(
        { contraseña_vacia: "*contraseña vacio*" },
        { status: 401 },
      )
    }
    if (confirmarcontraseña == "") {
      return NextResponse.json(
        { contraseña2_vacia: "*contraseña de confirmacion vacia*" },
        { status: 401 },
      )
    }
    if (confirmarcontraseña != contraseña) {
      return NextResponse.json(
        { contraseñas_diferentes: "*las contraseñas no coiciden*" },
        { status: 401 },
      )
    }
  if (!emailRegex.test(correo)) {
    return Response.json({ correo_invalido: "Correo inválido" }, { status: 400 });
  }

  const codigo = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: "registropagina8@gmail.com",
    to: correo,
    subject: "Código de confirmación",
    text: ` Hola no compartas el siguiente codigo Tu código de confirmación es: ${codigo}`,
  };
  const expires_at = new Date(Date.now() + 5 * 60 * 1000);
  const passwordHash = await bcrypt.hash(contraseña, 10);
  const nuevaUsuario = await pool.query(
    "INSERT INTO usuarios_pendientes (nombre, correo,contraseña,expires_at,codigo) VALUES ($1, $2, $3,$4,$5) RETURNING id ",
    [nombre, correo, passwordHash, expires_at,codigo],
  );

  try {
  await transporter.sendMail(mailOptions);

  console.log("Correo enviado");

  return NextResponse.json({
    mensaje: "Registro pendiente; correo enviado",
    id: nuevaUsuario.rows[0].id,
  });
} catch (error) {
  console.error("Error al enviar el correo:", error);

  return NextResponse.json(
    { error: "No se pudo enviar el correo" },
    { status: 500 }
  );
}
}
