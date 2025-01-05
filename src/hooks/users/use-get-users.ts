import { GetAllUsers, GetUser } from "@/api/users/users"
import { QueryKeyPrefix } from "@/constants/query-keys.constants"
import { UseParams } from "@/types"
import { useQuery } from "@tanstack/react-query"
/**
 * getting all the users or specific user based on the sub and username
 * @param payload 
 * @returns 
 */
export const useGetAllUsers = (payload: UseParams) => {
    return useQuery({
        queryKey: [QueryKeyPrefix.USER, payload],
        queryFn: async () => {
            const user = await GetAllUsers(payload)
            return user.data
        },
    })
}
/**
 * getting sepecific user details based on the id
 * @param id 
 * @returns 
 */
export const useGetUser = (id: string) => {
    return useQuery({
        queryKey: [QueryKeyPrefix.USER, id],
        queryFn: async () => {
            const user = await GetUser(id)
            return user.data
        },
    })
}