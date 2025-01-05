/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/users/use-update-user";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  maxExpensesLimit: number;
};
//
const Page = () => {
  const { data: session, update }: any = useSession();
  //
  const updateUserMutation = useUpdateUser(session?.user.id);
  //
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (payload: FormData) => {
   
    const res = await updateUserMutation.mutateAsync({ ...payload, maxExpensesLimit: Number(payload.maxExpensesLimit) })

    if (res.status === 200) {
      await update({ user: { ...session?.user, maxExpensesLimit: Number(payload.maxExpensesLimit) } });

      reset();
      redirect('/dashboard')
    }
  };
  //
  useEffect(() => {
    if (session?.user.maxExpensesLimit > 0) {
      redirect('/dashboard')
    }
    return () => { }
  }, [session])
  //
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter the monthly limit</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input id="input" placeholder="Enter the max limit" type="number"
              {...register("maxExpensesLimit", {
                required: "This field is required",
                min: { value: 1, message: "Limit must be at least 1" },
              })} />
            {errors.maxExpensesLimit && (
              <p className="text-red-500 text-sm mt-1">{errors.maxExpensesLimit.message}</p>
            )}
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </div>
    </div>
  )
}
//
export default Page;