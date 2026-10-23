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
  const { nombre, correo, contraseña } = await request.json();
  if (!emailRegex.test(correo)) {
    return Response.json({ error: "Correo inválido" }, { status: 400 });
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al enviar el correo");
    }
    console.log("Correo enviado");
    res.send("exito al registrarse");
  });

  console.log(nuevaUsuario.rows);
  return NextResponse.json({
    id: nuevaUsuario.rows[0].id
});
}
