"use server";

import { getCurrentUser } from "@/actions/server/fetch.user";
import { PageProvider } from "@/components/providers/page-provider";

const Page = async () => {
    const user = await getCurrentUser();

    return (
        <PageProvider>
            <div>{JSON.stringify(user)}</div>;
        </PageProvider>
    )

};

export default Page;
