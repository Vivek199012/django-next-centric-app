"use server";

import { getCurrentUser } from "@/actions/server/fetch.user";

const Page = async () => {
    const user = await getCurrentUser();

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

export default Page;