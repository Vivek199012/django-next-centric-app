"use client";

import { login, storeToken } from "@/lib/authentication/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useHydration } from "@/hooks/useHydration";
import { useToast } from "@/components/ui/use-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormInput } from "@/components/app/forms/components/form-input";
import { LoaderState } from "@/components/app/forms/components/loader-state";
import { cn } from "@/lib/utils";
import Link from "next/link";

type IFormData = {
    username: string;
    password: string;
};

export const LoginForm = () => {
    const form = useForm<IFormData>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [hydrated] = useHydration();

    const getErrorClass = (k: keyof IFormData) => {
        if (form.formState.errors[k]?.message) {
            return cn(
                form.formState.errors[k]?.message,
                "border-destructive placeholder:text-destructive text-destructive",
            );
        }
    };

    const onSubmit = (data: IFormData) => {
        setLoading(true);

        login(data)
            .json((data) => {
                storeToken(data.access, "access");
                storeToken(data.refresh, "refresh");
                router.push("/dashboard");
                router.refresh();
            })
            .catch((error: any) => {
                const parsedError = JSON.parse(error.message);

                if (parsedError.detail) {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: parsedError.detail,
                        duration: 1500,
                    });
                } else {
                    for (const [key, value] of Object.entries(parsedError)) {
                        form.setError(key as any, {
                            type: "manual",
                            message: (value as string[]).join(", "),
                        });
                    }

                    form.setError("root", {
                        type: "manual",
                        message: error.json.detail,
                    });
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <Card className="container mx-auto max-w-[850px]">
            <CardHeader>
                <CardTitle className="text-3xl">Login</CardTitle>
                <CardDescription>
                    Welcome back! Please enter your credentials to log in.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Form {...form}>
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            autoComplete="username"
                                            className={getErrorClass(
                                                "username",
                                            )}
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your username is a unique identifier for
                                        your account.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            autoComplete="current-password"
                                            type="password"
                                            className={getErrorClass(
                                                "password",
                                            )}
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We'll never share your password with
                                        anyone else.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex text-sm gap-1 leading-7 mt-3">
                            Don't have an account?
                            <Link
                                className="text-blue-400 font-semibold"
                                href="/signup"
                            >
                                Sign up
                            </Link>
                        </div>

                        <Button
                            className="my-2"
                            type="submit"
                            disabled={loading || !hydrated}
                        >
                            {loading || !hydrated ? <LoaderState /> : "Login"}
                        </Button>
                    </Form>
                </form>
            </CardContent>
        </Card>
    );
};
