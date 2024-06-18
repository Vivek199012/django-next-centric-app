import React from "react";
import { cn } from "@/lib/utils";

export const PageProvider: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className }) => {
    return (
        <div className={cn("w-full container my-4", className)}>{children}</div>
    );
};
