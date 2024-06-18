import { fetcher } from "@/lib/authentication";
import { NextResponse } from "next/server";

export async function getCurrentUser() {
    return NextResponse.json({
        error: "An error occurred while fetching the user",
    });
}
