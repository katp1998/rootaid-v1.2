import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'

import NavBar from '../components/NavBar';

import {AuthContextProvider} from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <>
    <AuthContextProvider>
    <NavBar/>
    <Component {...pageProps} />
    </AuthContextProvider>
    
    </>
  )

  
}
