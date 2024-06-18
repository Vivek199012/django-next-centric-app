// "use client";

// import { fetcher } from '@/lib/authentication';
// import { useRouter } from 'next/navigation'
// import React from 'react'
// import useSWR from "swr";
// import { logout, removeTokens } from '@/lib/authentication';
// import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { getCurrentUser } from '@/actions/server/fetch.user';

// const Page = () => {
//     const router = useRouter();
//     const { data: user } = useSWR("/auth/users/me", fetcher);

//     getCurrentUser().then(res => console.log(res));

//     const handleLogout = () => {
//         logout()
//             .res(() => {
//                 removeTokens();
//                 router.push("/");
//             })
//             .catch(() => {
//                 removeTokens();
//                 router.push("/");
//             })
//     };

//     return (
//         // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//         //     <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
//         //         <h1 className="text-2xl font-bold mb-4">Hi, {user?.username}!</h1>
//         //         <p className="mb-4">Your account details:</p>
//         //         <ul className="mb-4">
//         //             <li>Username: {user?.username}</li>
//         //             <li>Email: {user?.email}</li>
//         //         </ul>
//         //         <button
//         //             onClick={handleLogout}
//         //             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
//         //         >
//         //             Disconnect
//         //         </button>
//         //     </div>
//         // </div>
//         <div>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Hi, {user?.username}!</CardTitle>
//                     <CardDescription>
//                         Overview of your profile
//                     </CardDescription>
//                 </CardHeader>

//             </Card>
//         </div>
//     )
// }

// export default Page

"use server";

import { getCurrentUser } from "@/actions/server/fetch.user";
import { NextResponse } from "next/server";
import React from "react";

const Page = async () => {
    const user = await getCurrentUser();

    return <div>Page</div>;
};

export default Page;
