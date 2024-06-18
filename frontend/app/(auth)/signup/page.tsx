import { SignupForm } from "@/components/app/forms/authentication/sign-up-form";
import { PageProvider } from "@/components/providers/page-provider";

const Page = () => {
    return (
        <PageProvider className="flex items-center">
            <SignupForm />
        </PageProvider>
    );
};

export default Page;
