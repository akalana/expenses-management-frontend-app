
import { UpdateExpense } from "@/api/expenses/expenses"
import {
    MutationKeyAction,
    QueryKeyPrefix,
} from "@/constants/query-keys.constants"
import { IUpdateUser } from "@/types/user/user.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
/**
 * this hook is using for update expenses item based on the user and id
 * @param id 
 * @returns 
 */
export const useUpdateExpense = (userId: string, id: string) => {
    const client = useQueryClient();
    return useMutation({
        mutationKey: [QueryKeyPrefix.EXPENSES, MutationKeyAction.UPDATE],
        mutationFn: async (data: IUpdateUser) => {
            return await UpdateExpense(userId, id, data)
        },
        onSuccess: () => {
            toast.success('Update expenses succussfully updated', {
                position: "top-right",
            })
        },
        onError: (error) => {
            toast.error(`Can not update the expense - ${error.message}`, {
                position: "top-right"
            })
        },
        onSettled: () => {
            client.invalidateQueries({ queryKey: [QueryKeyPrefix.EXPENSES] })
        },
    })
}
