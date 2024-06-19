import { getToken } from "@/lib/authentication/server/authActions";
import { fetcher } from "@/lib/authentication/server/fetcher";

export const loggedIn = async () => {
    if (!getToken("access") || !getToken("refresh")) {
        return false;
    }

    const loggedIn = await fetcher("/auth/users/me");
    return loggedIn ? true : false;
};
