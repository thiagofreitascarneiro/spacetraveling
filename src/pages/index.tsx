/* eslint-disable */ 
// eslint-disable-next-line

import { GetStaticProps } from 'next';

// se refere as propriedades que o componente pode receber
import { AppProps } from 'next/app';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Head from 'next/head';


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
    <>  
      <main className={styles.Container}>
        <div className={styles.PostPage}>
            <a>
              <h1><strong>Como utilizar Hooks </strong></h1>
              <time>5 de feveireiro de 2022</time>
              <p>Pensando em sincronização 
                em vez de ciclos de vida.</p>
            </a>
        </div>
      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query('');

//   const todo = ''
// };
