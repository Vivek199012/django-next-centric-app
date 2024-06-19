"use client";

import { Button } from "@/components/ui/button";
import { logout, removeTokens } from "@/lib/authentication/client";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter()

    const handleLogout = () => {
        logout()
            .res(() => {
                removeTokens();
                router.push("/login");
                router.refresh();
            }).catch(() => {
                removeTokens();
                router.push("/login");
                router.refresh()
            })
    }

    return (
        <Button onClick={handleLogout} className="px-4" size="sm" variant="outline">
            Logout
        </Button>
    )
}

export default Logout;