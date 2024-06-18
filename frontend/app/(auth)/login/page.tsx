import { LoginForm } from "@/components/app/forms/authentication/login-form";
import { PageProvider } from "@/components/providers/page-provider";

const Login = () => {
    return (
        <PageProvider className="flex items-center">
            <LoginForm />
        </PageProvider>
    );
};

export default Login;
