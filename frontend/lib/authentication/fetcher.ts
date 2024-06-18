import wretch, { Wretch } from "wretch";
import { handleJWTRefresh, storeToken, getToken } from "./authActions";

const api = () => {
    return wretch(process.env.NEXT_PUBLIC_API!)
        .auth(`Bearer ${getToken("access")}`)
        .catcher(401, async (_, request: Wretch) => {
            try {
                const { access } = (await handleJWTRefresh().json()) as {
                    access: string;
                };
                storeToken(access, "access");

                return request
                    .auth(`Bearer ${access}`)
                    .fetch()
                    .unauthorized(() => {
                        window.location.replace("/");
                    })
                    .json();
            } catch (error) {
                window.location.replace("/");
            }
        });
};

export const fetcher = (url: string): Promise<any> => {
    return api().get(url).json();
};
