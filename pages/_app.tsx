import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/tailwindcss.css'
import { SessionProvider } from 'next-auth/react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import Script from 'next/script'
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

  useEffect(() => {
    const MIN_DURATION = 5
    const body = document.querySelector('body')

    function makeSnowflake() {
      const snowflake = document.createElement('div')
      const delay = Math.random() * 10
      const initialOpacity = Math.random()
      const duration = Math.random() * 5 + MIN_DURATION

      snowflake.classList.add('snowflake-void')
      snowflake.innerText = '❄️'
      snowflake.style.left = Math.random() * window.innerWidth + 'px'
      snowflake.style.animationDelay = delay + 's'
      snowflake.style.opacity = initialOpacity + ''
      snowflake.style.animation = `snowFall ${duration}s linear infinite`

      body?.appendChild(snowflake)

      setTimeout(() => {
        body?.removeChild(snowflake)
        makeSnowflake()
      }, (duration + delay) * 1000)
    }

    function removeSnowflake() {
      const snowflake = document.querySelector('.snowflake-void')
      if (snowflake) {
        snowflake.remove()
      }
    }
    makeSnowflake()
    for (let i = 0; i < 100; i++) {
      setTimeout(makeSnowflake, i * 200)
    }
  }, [])

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
