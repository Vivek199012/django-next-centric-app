"use server";

import { getCurrentUser } from "@/actions/server/fetch.user";
import { PageProvider } from "@/components/providers/page-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Page = async () => {
    const user = (await getCurrentUser()) as User;

    return (
        <PageProvider>
            <Card>
                <CardHeader>
                    <CardTitle>Hey, {user.username}!</CardTitle>
                    <CardDescription>
                        This is your dashboard, displaying your profile
                        information
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p>Username: {user.username}</p>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>

                    <Link href="/reset-password">Reset password</Link>
                    <Link href="/reset-password-confirm">Reset password</Link>
                </CardContent>
            </Card>
        </PageProvider>
    );
};

export default Page;
