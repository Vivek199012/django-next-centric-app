"use client";

import { register as signup } from "@/lib/authentication/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useHydration } from "@/hooks/useHydration";

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
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

export const SignupForm = () => {
    const form = useForm<IFormData>({
        defaultValues: {
            email: "",
            username: "",
            first_name: "",
            last_name: "",
            password: "",
        },
    });

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

        signup(data)
            .json(() => {
                router.push("/");
            })
            .catch((error: any) => {
                for (const [key, value] of Object.entries(
                    JSON.parse(error.message),
                )) {
                    form.setError(key as any, {
                        type: "manual",
                        message: (value as string[]).join(", "),
                    });
                }

                form.setError("root", {
                    type: "manual",
                    message: error.json.detail,
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Card className="container mx-auto max-w-[850px]">
            <CardHeader>
                <CardTitle className="text-3xl">Sign up</CardTitle>
                <CardDescription>Sign up for a free account</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Form {...form}>
                        <FormField
                            name="first_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            className={getErrorClass(
                                                "first_name",
                                            )}
                                            placeholder="First Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your first name will be displayed on
                                        your profile.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="last_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            className={getErrorClass(
                                                "last_name",
                                            )}
                                            placeholder="Last Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your last name will be displayed on your
                                        profile.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            className={getErrorClass("email")}
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We'll never share your email with anyone
                                        else.
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
                            Already have an account?
                            <Link
                                className="text-blue-400 font-semibold"
                                href="/login"
                            >
                                Login
                            </Link>
                        </div>

                        <Button
                            className="my-2"
                            type="submit"
                            disabled={loading || !hydrated}
                        >
                            {loading || !hydrated ? <LoaderState /> : "Sign up"}
                        </Button>
                    </Form>
                </form>
            </CardContent>
        </Card>
    );
};
