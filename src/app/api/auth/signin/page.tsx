"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Oval } from "react-loader-spinner"

/**
 * SignIn component to handle authentication and redirect logic.
 *
 * - If the user is unauthenticated, it triggers Keycloak sign-in.
 * - If the user is authenticated, it redirects to the home page ('/dashboard').
 * - Displays a loading message while the authentication status is determined.
 */
export default function SignIn() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    // Redirects to Keycloak sign-in if the user is not authenticated
    if (status === "unauthenticated") {
      signIn("keycloak")
    }
    // Redirects to the home page if the user is authenticated
    else if (status === "authenticated") {
      router.push("/setup")
    }
  }, [router, status]) // Dependencies: re-run effect when 'router' or 'status' changes

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-gray-300 p-8">
        <Oval
          ariaLabel="oval-loading"
          height={48}
          strokeWidth={4}
          visible={true}
          width={48}
          color={"#155199"}
          secondaryColor={"#7396C4"}
        />
      </div>
    </div>
  )
}