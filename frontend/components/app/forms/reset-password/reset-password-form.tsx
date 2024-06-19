"use client";

import React from "react";

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
import { useRouter } from "next/navigation";
import { useHydration } from "@/hooks/useHydration";
import { resetPassword } from "@/lib/authentication/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type IFormData = {
    email: string;
};

export const ResetPasswordForm = () => {
    const form = useForm<IFormData>({
        defaultValues: {
            email: "",
        },
    });

    const router = useRouter();
    const { toast } = useToast();
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

    const onSubmit = async (data: IFormData) => {
        setLoading(true);

        try {
            await resetPassword(data.email).res();

            toast({
                variant: "default",
                title: "Success",
                description: "Email sent successfully!",
                duration: 1500,
            });
        } catch (error: any) {
            if (typeof error.message === "string") {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message,
                    duration: 1500,
                });
                return;
            }

            const parsedError = JSON.parse(error.message);

            for (const [key, value] of Object.entries(parsedError)) {
                form.setError(key as any, {
                    type: "manual",
                    message: (value as string[]).join(", "),
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="container mx-auto max-w-[850px]">
            <CardHeader>
                <CardTitle className="text-3xl">Reset Password</CardTitle>
                <CardDescription>
                    Please provide your email address to reset your password.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Form {...form}>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            autoComplete="email"
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

                        <Button
                            className="my-2"
                            type="submit"
                            disabled={loading || !hydrated}
                        >
                            {loading || !hydrated ? <LoaderState /> : "Submit"}
                        </Button>
                    </Form>
                </form>
            </CardContent>
        </Card>
    );
};
