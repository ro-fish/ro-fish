import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("auth")?.value;
  try {
    const response = await axios.get("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return NextResponse.next();
    }
  } catch (error) {}

  return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: ["/dashboard/:path*", "/reservation/:path*"],
};
