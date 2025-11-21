'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { APIProvider } from '@vis.gl/react-google-maps'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={googleMapsApiKey}>
        {children}
      </APIProvider>
    </QueryClientProvider>
  )
}
