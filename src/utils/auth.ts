import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import { authOptions } from "@/lib/options"
import { CustomToken } from "@/types"

/**
 * Retrieves the access token from the session.
 * - Server-side: Uses `getServerSession` to get the session.
 * - Client-side: Uses `getSession` to get the session.
 *
 * @returns {Promise<string | null>} The access token, or null if not found.
 */
export const getAccessToken = async (): Promise<string | null> => {
  let session: CustomToken | null = null

  // Check if running on the server-side
  if (typeof window === "undefined") {
    try {
      // Fetch the session on the server-side
      session = (await getServerSession(authOptions)) as CustomToken | null
    } catch (error) {
      console.error("Error fetching server-side session:", error)
      return null
    }
  } else {
    try {
      // Fetch the session on the client-side
      session = (await getSession()) as CustomToken | null
    } catch (error) {
      console.error("Error fetching client-side session:", error)
      return null
    }
  }

  // Return the access token if available, or null
  return session?.accessToken ?? null
}
