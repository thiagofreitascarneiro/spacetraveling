 /* eslint-disable */ 

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  const todo = ''


export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query('');

  const todo = ''
};

export const getStaticProps = async context => {
  const prismic = getPrismicClient();
  //const response = await prismic.getByUID('');

  const todo = ''
};

return (
  <>  
    <Head>
        
    </Head>

    <main className={styles.container}>
        <div className={styles.posts}>
            <a>
              <time> 06 de fev</time>
              <strong>titulo</strong>
              <p>conteudo</p>
            </a> 
        </div>
    </main>

  
  
  </>

)