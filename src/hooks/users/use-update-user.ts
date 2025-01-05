import { UpdateUser } from "@/api/users/users"
import {
    MutationKeyAction,
    QueryKeyPrefix,
} from "@/constants/query-keys.constants"
import { IUpdateUser } from "@/types/user/user.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
/**
 * this hook is using for update the user expenses limit
 * @param id 
 * @returns 
 */
export const useUpdateUser = (id: string) => {
    const client = useQueryClient()

    return useMutation({
        mutationKey: [QueryKeyPrefix.USER, MutationKeyAction.UPDATE],
        mutationFn: async (data: IUpdateUser) => {
            return await UpdateUser(id, data)
        },
        onSuccess: () => {
            toast.success('User expenses limit succussfully updated', {
                position: "top-right",
            })
        },
        onError: (error) => {
            toast.error(`Can not update the user expenses limit - ${error.message}`, {
                position: "top-right"
            })
        },
        onSettled: () => {
            client.invalidateQueries({ queryKey: [QueryKeyPrefix.USER] })
        },
    })
}
