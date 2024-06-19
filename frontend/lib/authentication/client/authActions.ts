import Cookies from "js-cookie";
import { api } from "@/lib/authentication/common/api";
import { type Token } from "@/lib/authentication/common/types";

type RegisterProps = {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

type LoginProps = {
    username: string;
    password: string;
};

type ResetPasswordProps = {
    new_password: string;
    re_new_password: string;
    token: string;
    uid: string;
};

export const storeToken = (token: string, type: Token) => {
    Cookies.set(type + "Token", token);
};

export const getToken = (type: Token) => {
    return Cookies.get(type + "Token");
};

export const removeTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

export const register = (props: RegisterProps) => {
    const { username, email, password, first_name, last_name } = props;
    return api.post(
        { email, username, password, first_name, last_name },
        "/auth/users/",
    );
};

export const login = (props: LoginProps) => {
    const { username, password } = props;
    return api.post({ username, password }, "/auth/jwt/create");
};

export const logout = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/logout/");
};

export const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};

export const resetPassword = (email: string) => {
    return api.post({ email }, "/auth/users/reset_password/");
};

export const resetPasswordConfirm = (props: ResetPasswordProps) => {
    const { uid, token, new_password, re_new_password } = props;
    return api.post(
        { uid, token, new_password, re_new_password },
        "/auth/users/reset_password_confirm/",
    );
};
