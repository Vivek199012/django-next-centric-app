import { fetcher } from "@/lib/authentication/client";

export async function getCurrentUser() {
    try {
        return await fetcher("/auth/users/me");
    } catch (error) {
        return error;
    }
}
