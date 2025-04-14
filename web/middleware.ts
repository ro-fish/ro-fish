import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/dashboard'],
};

export const middleware = (request: NextRequest) => {
    console.log("Middleware triggered");
    // const token = request.cookies.get("auth")?.value;

    // const isLoggedIn = !!token; // FIXME: better checks

    // if (!isLoggedIn) {
        // Redirect to the login page if not logged in
        return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next();
}
