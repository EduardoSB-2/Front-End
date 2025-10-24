import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "@/utils/auth";

// Rotas que exigem login (painel admin)
const protectedRoutes = ["/dashboards"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const token = request.cookies.get("authToken")?.value;

    // Se não tiver token -> manda pra login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verifica se é admin
    if (!validateToken(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboards/:path*"], // só protege rotas do dashboard
};
