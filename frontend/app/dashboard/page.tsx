"use server";

import { getCurrentUser } from "@/actions/server/fetch.user";
import { PageProvider } from "@/components/providers/page-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
    const user = await getCurrentUser() as User;

    return (
        <PageProvider>
            <Card>
                <CardHeader>
                    <CardTitle>Hey, {user.username}!</CardTitle>
                    <CardDescription>This is your dashboard, displaying your profile information</CardDescription>
                </CardHeader>

                <CardContent>
                    <p>Username: {user.username}</p>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                </CardContent>
            </Card>
        </PageProvider>
    );
};

export default Page;
