import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, expectedCookieValue } from "@/middleware";

export async function POST(request: NextRequest) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  const configured = process.env.ADMIN_PASSWORD || "changeme";

  if (!password || password !== configured) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const value = await expectedCookieValue();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 2 weeks
  });
  return res;
}
