import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/actions/server/fetch.user";

export async function middleware(request: NextRequest) {
    const user = await getCurrentUser();

    if (!user && request.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
};
