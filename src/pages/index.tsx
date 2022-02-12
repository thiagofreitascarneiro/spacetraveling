/* eslint-disable */ 
// eslint-disable-next-line



// se refere as propriedades que o componente pode receber




// SASS
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


//Next
import Head from 'next/head';
import { AppProps } from 'next/app';
import { GetStaticProps } from 'next';

//Prismic
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../services/prismic';

interface Post {
  slug: string;
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


export default function Home({ posts }: HomeProps ) {
  return(
    <>  
      <main className={styles.Container}>
        <div className={styles.PostPage}>
         { posts.map(post => (
          <a key={post.slug}>
            <h1><strong>{post.title} </strong></h1>
            <time>{post.updatedAt}</time>
            <p>{post.excerpt}</p>
          </a>

         )) 
         
         }
            
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
  Prismic.predicates.at('document.type', 'post')
], {
    fetch: ['post.title', 'post.content'],
    pageSize: 5,
})

  console.log(JSON.stringify(postsResponse, null, 2))
  
  const posts = postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title as string,
          subtitle: post.data.content.heading.find(content => content.type === 'paragraph')?.text ?? '',
          author: post.data.author as string,
        },
    }
    
  })

  console.log('posts11234', posts)
  
  return {
    props: {
      posts
    }
  }
};
