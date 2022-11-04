import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '../store/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    
    {/* Wrap Components with context provider */}
    <UserContextProvider>
      
      <Component {...pageProps} />

    </UserContextProvider>
    
  </>
}
