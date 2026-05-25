import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieName, verifyPassword } from "@/lib/auth";

type LoginRequest = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as LoginRequest;
  const adminEmail = process.env.ADMIN_EMAIL ?? "kudret@kudreto.com";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const authSecret = process.env.AUTH_SECRET;

  if (!passwordHash || !authSecret) {
    return NextResponse.json(
      {
        error: "Admin auth ayarları eksik.",
      },
      { status: 500 },
    );
  }

  const isValidEmail = email?.trim().toLowerCase() === adminEmail.toLowerCase();
  const isValidPassword = password ? verifyPassword(password, passwordHash) : false;

  if (!isValidEmail || !isValidPassword) {
    return NextResponse.json(
      {
        error: "E-posta veya şifre hatalı.",
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: sessionCookieName,
    value: createSessionToken(adminEmail, authSecret),
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
