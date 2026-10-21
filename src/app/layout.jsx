
import "./globals.css";

export const metadata = {
  title: "Mis tareas",
  description: "Aplicación para gestionar tareas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
