"use client"

import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"

// Define the prop types for the component
interface SessionProviderWrapperProps {
  children: ReactNode // 'ReactNode' is more appropriate for 'children' in React
}

const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({
  children,
}) => {
  const refreshInterval = Number(process.env.NEXT_PUBLIC_SESSION_REFRESH_TIME ) || 60 // Fallback to 60 seconds if invalid

  return (
    <SessionProvider
      refetchOnWindowFocus={true}
      refetchInterval={refreshInterval}
    >
      {children}
    </SessionProvider>
  )
}

export default SessionProviderWrapper
