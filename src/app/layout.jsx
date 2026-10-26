
import "./globals.css";

export const metadata = {
  title: "Mis tareas",
  description: "Aplicación para gestionar tareas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
