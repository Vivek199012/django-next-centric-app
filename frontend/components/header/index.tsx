import React from "react";
import { ModeToggle } from "./theme-switch";
import Login from "./authentication/login";
import Signup from "./authentication/signup";

const Header = () => {
    return (
        <header className="py-4 dark:bg-black bg-gray-100 shadow-lg dark:shadow-gray-50/5 shadow-black/10 border-b-[1px] dark:border-b-gray-200/20 border-b-gray-800/20">
            <div className="m-auto container">
                <div className="flex items-center justify-between">
                    <ModeToggle />

                    <div className="flex gap-2">
                        <Login />
                        <Signup />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
