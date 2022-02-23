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
import  Link  from 'next/link'

//Prismic
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../services/prismic';

//React
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlinePersonOutline } from 'react-icons/md'
import { useEffect, useState } from 'react';

//Others
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import id from 'date-fns/esm/locale/id/index.js';
import Post from './post/[slug]';

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
  posts: Post[];
  postsPagination: PostPagination;
}



export default function Home({ postsPagination }: HomeProps ) {

  
  const [contentPost, setContentPost] = useState<PostPagination>(postsPagination)
  
  console.log('hellow', contentPost)

   function handleNextPage() {
     fetch(contentPost.next_page)
      .then(response => response.json())
      .then(responseData => setContentPost({
        next_page: responseData.next_page,
        results: [
          ...contentPost.results,
          ...responseData?.results.map(post => {
            return {
              uid: post.uid,
              data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author
              },
              first_publication_date: post.first_publication_date
            }
          })
        ]
      }))
      .catch(err => console.log(err.message))
  }
 

  return(
    <>  
      <main className={styles.Container}>
        <div className={styles.PostPage}>
         {contentPost?.results.map(post => (
           <Link href={`/post/${post.slug}`}>
              <a key={post.uid}>
                <h1><strong>{post.data.title} </strong></h1>
                <p className={styles.Subtitle}>{post.data.subtitle}</p>
                <br/>
                <time> <AiOutlineCalendar/> 
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', { locale: ptBR })}
                </time>
                <p className={styles.Author}> <MdOutlinePersonOutline /> {post.data.author}</p>
                
                <br/>
                <br/>
              </a>
           </Link>
         )) 
         }
         
        </div>
            
       
        {contentPost?.next_page && 
          <button 
            onClick={handleNextPage} 
            className={styles.LoadPost} 
            type="button">Carregar mais posts
          </button>
        }

      </main>
      
      
    </>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
  Prismic.Predicates.at('document.type', 'post')
], {
    fetch: ['posts.title', 'posts.subtitle','posts.author'],
    pageSize:4,
})


let posts: Post[] = []

 // console.log(JSON.stringify(postsResponse, null, 2))
  

  if (postsResponse?.results) {
   posts= postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title as string,
          subtitle: post.data.subtitle ? post.data.subtitle: '' as string,
          author: post.data.author? post.data.author: '' as string,
        },
    };  
  })
}
  
  const postsPagination = {
    next_page: postsResponse?.next_page ?? null,
    results: posts,
  };

  
  return {
    props: {
      postsPagination,
      },
      redirect: 60 * 30 // 30 minutos
    }
};


