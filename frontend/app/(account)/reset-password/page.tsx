import { PageProvider } from "@/components/providers/page-provider";
import { ResetPasswordForm } from "@/components/app/forms/reset-password/reset-password-form";
import React from "react";

const Page = () => {
    return (
        <PageProvider>
            <ResetPasswordForm />
        </PageProvider>
    );
};

export default Page;
