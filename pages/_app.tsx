import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'

const AppState = ({ children }: any) => {
  return (
    <>
      <AuthProvider>
        {children}
      </AuthProvider>
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return <AppState>
    <Component {...pageProps} />
  </AppState>
}

export default MyApp
