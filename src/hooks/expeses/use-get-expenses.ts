import { GetAllExpenses, GetExpense } from "@/api/expenses/expenses"
import { QueryKeyPrefix } from "@/constants/query-keys.constants"
import { UseParams } from "@/types"
import { useQuery } from "@tanstack/react-query"

/**
 * getting all the expenses uder the specific user
 * @param payload 
 * @returns 
 */
export const useGetAllExpenses = (userId: string, payload: UseParams) => {
    return useQuery({
        queryKey: [QueryKeyPrefix.EXPENSES, payload],
        queryFn: async () => {
            const user = await GetAllExpenses(userId, payload)
            return user.data
        },
    })
}
/**
 * getting specific expenses details based on the user
 * @param id 
 * @returns 
 */
export const useGetExpense = (userId: string, id: string) => {
    return useQuery({
        queryKey: [QueryKeyPrefix.EXPENSES, id],
        queryFn: async () => {
            const user = await GetExpense(userId, id)
            return user.data
        },
    })
}