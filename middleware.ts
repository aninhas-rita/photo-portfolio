import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "admin_session";

// Edge middleware can't use Node's `crypto` module, so this is a tiny
// dependency-free hash — good enough to make the cookie value unguessable
// without the real password; it's not meant to replace real auth for a
// multi-admin or public-facing login.
async function hash(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedCookieValue(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD || "changeme";
  return hash(password);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === "/admin/login" || pathname === "/api/admin/auth";
  if (isAuthRoute) return NextResponse.next();

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await expectedCookieValue();
  const authed = cookie === expected;

  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
