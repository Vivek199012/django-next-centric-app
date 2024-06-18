import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
    return (
        <Button className="px-4" size="sm" variant="outline">
            <Link href="/login">Login</Link>
        </Button>
    );
};

export default Login;
