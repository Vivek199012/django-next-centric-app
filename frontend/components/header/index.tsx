import React from "react";
import { ModeToggle } from "./theme-switch";
import Login from "./authentication/login";
import Signup from "./authentication/signup";
import { getCurrentUser } from "@/actions/server/fetch.user";
import Logout from "./authentication/logout";
import { loggedIn } from "@/actions/server/logged-in";

const Header = async () => {
    const isLoggedIn = await loggedIn();

    console.log(isLoggedIn);

    return (
        <header className="py-4 dark:bg-black bg-gray-100 shadow-lg dark:shadow-gray-50/5 shadow-black/10 border-b-[1px] dark:border-b-gray-200/20 border-b-gray-800/20">
            <div className="m-auto container">
                <div className="flex items-center justify-between">
                    <ModeToggle />

                    <div className="flex gap-2">
                        {!isLoggedIn ? <><Login />
                            <Signup /></> : <Logout />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
