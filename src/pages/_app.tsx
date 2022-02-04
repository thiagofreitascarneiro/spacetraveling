 /* eslint-disable */ 


import { AppProps } from 'next/app';
import Home from '.';
import Header from '../components/Header';
import '../styles/globals.scss';



function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return( 
    <>
      <Header />
      <Component {...pageProps} />
      <Home />
      
    </>
  )
}

export default MyApp;
