import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const protectedPaths = ["/dashboard", "/reservations"];
  const { pathname } = request.nextUrl;


  // Check if the requested path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // Allow non-protected paths to pass through
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth")?.value;
  // If no token and trying to access protected path, redirect to login
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const apiUrl = `http://${process.env.ROFISH_SERVER_HOST || "localhost"}:${process.env.ROFISH_SERVER_PORT || "8080"}/api/auth/roles`;

    const response = await axios.get(apiUrl, {
      headers: {
      Authorization: `Bearer ${token}`,
      },
    });

    const roles = response.data.roles || [];

    // Check if user has at least USER role for protected paths
    if (!roles.includes("USER")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Additional checks for admin-only paths
    const isAdminPath = pathname.startsWith("/dashboard");

    if (isAdminPath && !roles.includes("ADMIN")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If auth check fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reservations/:path*",
    // Add other protected paths here if needed
  ],
};