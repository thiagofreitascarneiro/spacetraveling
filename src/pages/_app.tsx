 /* eslint-disable */ 


import { AppProps } from 'next/app';
import Home from '.';
import Header from '../components/Header';
import '../styles/globals.scss';

import HomeProps from './index'



function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return( 
    <>
      <Header />
      <Component {...pageProps} />
      <Home postsPagination={undefined} />
      
    </>
  )
}

export default MyApp;
