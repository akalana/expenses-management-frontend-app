/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session }: any = useSession()
    console.log(session)
    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Enter the monthly limit</h1>
          <form className="space-y-4">
            <div>
              <Input id="input" placeholder="Enter the max limit" type="number" />
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </div>
      </div>
    )
}

export default Page;