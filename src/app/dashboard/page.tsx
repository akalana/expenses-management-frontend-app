/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signOut, useSession } from "next-auth/react";

const Page = () => {
    const { data: session }: any = useSession()
    return (<div>
         <h1>{JSON.stringify(session?.accessToken)}</h1>
         <br></br>
        <h1>{JSON.stringify(session?.user)}</h1>
        <button onClick={()=>signOut()}>Sign Out</button>
    </div>)
}

export default Page;