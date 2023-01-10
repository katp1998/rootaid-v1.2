import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NavBar from '../components/NavBar';

import {AuthProvider} from '../context/AuthProvider'

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <>
    <AuthProvider>
    <NavBar/>
    <Component {...pageProps} />
    </AuthProvider>
    
    </>
  )

  
}
