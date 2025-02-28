import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("sign_in", req.url));
  }
  try {
    // gets the user role from token
    const  role  = jwt.verify(token, process.env.JWT_SECRET!);

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/student") && role !== "STUDENT") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/teacher") && role !== "TEACHER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/sign_in", req.url));
  }
}

export const config = {
  matcher: ["/:path*", "/teacher/:path*"], // Protect Student & Teacher dashboards
};
