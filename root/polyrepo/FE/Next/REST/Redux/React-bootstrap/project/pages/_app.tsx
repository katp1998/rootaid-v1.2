import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { store } from '../features/store'
import { Provider } from 'react-redux'
import NavBar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
    </Provider>      
  ) 

}
