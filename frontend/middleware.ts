import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { loggedIn } from "./actions/server/logged-in";

export async function middleware(request: NextRequest) {
    const isLoggedIn = await loggedIn();

    if (
        !isLoggedIn &&
        (request.nextUrl.pathname === "/signup" ||
            request.nextUrl.pathname === "/login")
    ) {
        return NextResponse.next();
    }

    if (!isLoggedIn && request.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
};
