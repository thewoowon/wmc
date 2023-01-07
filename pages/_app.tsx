import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/style_matter.js.css'
import '../styles/tailwindcss.css'
import { SessionProvider } from 'next-auth/react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { useEffect } from 'react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  })

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg-black">
          <Header></Header>
          <Component {...pageProps} />
          <Footer></Footer>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  )
}
