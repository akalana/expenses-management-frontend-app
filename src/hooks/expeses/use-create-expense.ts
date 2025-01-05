import {
    MutationKeyAction,
    QueryKeyPrefix,
} from "@/constants/query-keys.constants"
import { ICreateExpense } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { CreateExpense } from "@/api/expenses/expenses"
import { toast } from "react-toastify"
/**
 * this hook use for create the expenses uder the user
 * @param userId 
 * @returns 
 */
export const useCreateExpense = (userId: string) => {
    const client = useQueryClient()

    return useMutation({
        mutationKey: [QueryKeyPrefix.EXPENSES, MutationKeyAction.CREATE],
        mutationFn: async (payload: ICreateExpense) => {
            return await CreateExpense(userId, payload)
        },
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [QueryKeyPrefix.EXPENSES] })
            toast.success("Create expense succfully", {
                position: 'top-right'
            })
        },
        onError: (error) => {
            toast.success(`Error expense create process- ${error.message}`, {
                position: 'top-right'
            })
        },
    })
}
