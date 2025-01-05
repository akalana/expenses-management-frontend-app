import { getAccessToken } from "@/utils"
import axios, { AxiosInstance } from "axios"
import { signOut } from "next-auth/react"

// Define the base URL for the Axios instance
const BASE_URL = process.env.NEXT_PUBLIC_API_URL
/**
 * Function to create an Axios instance with authorization headers.
 * - If an access token is available, it adds the `Authorization` header.
 * - Handles 401 Unauthorized errors by calling NextAuth's signOut function.
 *
 * @returns {Promise<AxiosInstance>} A configured Axios instance.
 */
const useAxiosInstance = async (): Promise<AxiosInstance> => {
  // Fetch the access token asynchronously
  const accessToken = await getAccessToken()

  // Create an Axios instance with the base URL and headers
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  })

  // Add a response interceptor to handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // If we receive a 401 error, trigger signOut
      if (error.response?.status === 401) {
        await signOut({ callbackUrl: "/" })
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default useAxiosInstance