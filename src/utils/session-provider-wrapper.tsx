"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react"

// Define the prop types for the component
interface SessionProviderWrapperProps {
  children: ReactNode // 'ReactNode' is more appropriate for 'children' in React
}

const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({
  children,
}) => {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )
  //
  const refreshInterval = Number(process.env.NEXT_PUBLIC_SESSION_REFRESH_TIME) || 60 // Fallback to 60 seconds if invalid

  return (
    <SessionProvider
      refetchOnWindowFocus={true}
      refetchInterval={refreshInterval}
    >
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default SessionProviderWrapper
