"use client";

import { useHydration } from "@/hooks/useHydration";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ ...props }, ref) => {
        const [hydrated] = useHydration();

        return (
            <>
                {hydrated ? (
                    <Input ref={ref} {...props} />
                ) : (
                    <Skeleton className="flex h-9 w-full rounded-md px-3 py-1 text-sm file:text-sm file:font-medium " />
                )}
            </>
        );
    },
);

FormInput.displayName = "FormInput";
