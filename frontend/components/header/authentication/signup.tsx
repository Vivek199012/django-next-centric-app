import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signup = () => {
    return (
        <Button className="px-4" size="sm" variant="outline">
            <Link href="/signup">Signup</Link>
        </Button>
    );
};

export default Signup;
