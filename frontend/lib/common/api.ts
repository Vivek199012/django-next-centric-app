import wretch from "wretch";

export const api = wretch(process.env.NEXT_PUBLIC_API!).accept(
    "application/json",
);
