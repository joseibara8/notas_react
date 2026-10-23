export const sessionOptions = {
  cookieName: "notas_session",
  password: process.env.SESSION_SECRET,

  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};