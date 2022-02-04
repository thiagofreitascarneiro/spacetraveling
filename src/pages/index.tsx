/* eslint-disable */ 
// eslint-disable-next-line

import { GetStaticProps } from 'next';

// se refere as propriedades que o componente pode receber
import { AppProps } from 'next/app';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  const todo = ''

  return(
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <p>Hello Bob</p>
    </body>
    </html>
   
  )
}

// export const getStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query('');

//   const todo = ''
// };
