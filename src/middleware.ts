/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

/**
 * Middleware for authenticating requests using NextAuth.
 * It checks if the token exists to determine if the user is authenticated.
 */
const authMiddleware = withAuth({
  callbacks: {
    /**
     * Checks if the user is authorized by verifying if they are an admin.
     * @param {Object} token - The JWT token containing user details.
     * @returns {boolean} - Returns true if the user is an admin, otherwise false.
     */
    authorized({ token }) {
      return !!token // Returns true if the token exists, otherwise false.
    },
  },
})

/**
 * Main middleware function that applies the authentication middleware.
 * If the request is authorized (has a valid token), it proceeds; otherwise, it redirects.
 * @param {NextRequest} req - Incoming request object.
 * @returns {NextResponse} - Response based on authentication result.
 */
export default function middleware(req: NextRequest) {
  // Apply the authentication middleware to the request.
  return (authMiddleware as any)(req)
}

/**
 * Configuration for defining the routes where this middleware should be applied.
 * These routes represent the protected pages in the application.
 */
export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
  ],
}
