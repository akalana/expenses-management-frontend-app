/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    MutationKeyAction,
    QueryKeyPrefix,
} from "@/constants/query-keys.constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteExpense } from "@/api/expenses/expenses"
import { toast } from "react-toastify"
/**
 * delete the expenses based on the user
 * @param userId 
 * @param id 
 * @returns 
 */
export const useDeleteExpense = () => {
    const client = useQueryClient()
    return useMutation({
        mutationKey: [QueryKeyPrefix.EXPENSES, MutationKeyAction.DELETE],
        mutationFn: async (data: any) => {
            return await DeleteExpense(data.userId, data.id)
        },
        onSuccess: () => {
            toast.success('Succsfully delete the expense');
            client.invalidateQueries({ queryKey: [QueryKeyPrefix.EXPENSES] })
        },
        onError: (error) => {
            toast.error(`Failed expense delete request - ${error.message}`)
        },
    })
}