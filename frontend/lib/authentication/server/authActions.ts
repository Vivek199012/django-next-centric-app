import { cookies } from "next/headers";
import { Token } from "@/lib/authentication/common/types";
import { api } from "@/lib/common/api";

export const storeToken = (token: string, type: Token) => {
    cookies().set(type + "Token", token);
};

export const getToken = (type: Token) => {
    return cookies().get(type + "Token")?.value;
};

export const removeTokens = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};

export const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};
