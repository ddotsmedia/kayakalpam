import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface AdminSession {
  isAdmin: boolean;
}

export const sessionOptions = {
  cookieName: "kayakalpam_admin",
  password: process.env.ADMIN_SECRET as string,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 8,
  },
};

export async function getSession() {
  return getIronSession<AdminSession>(await cookies(), sessionOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) return null;
  return session;
}
