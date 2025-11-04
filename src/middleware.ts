import { NextRequest, NextResponse } from "next/server";
import { pageRoutes } from "./utils/constants/routes";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const isUserRoute = request.nextUrl.pathname.startsWith("/user");

  let isTokenValid = false;
  if (token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      const now = Math.floor(Date.now() / 1000);
      isTokenValid = payload.exp && payload.exp > now;
    } catch {
      isTokenValid = false;
    }
  }

  if (isAuthRoute && isTokenValid) {
    return NextResponse.redirect(
      new URL(pageRoutes.user.dashboard, request.url)
    );
  }

  if (isUserRoute && !isTokenValid) {
    return NextResponse.redirect(
      new URL(pageRoutes.auth.login, request.url)
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Protect all routes except:
     * - static files
     * - public
     * - auth
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
