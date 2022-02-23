 /* eslint-disable */ 

//Next
import { GetStaticPaths, GetStaticProps } from 'next';


//Prismic
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'

///Style
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

//React
import { useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlinePersonOutline } from 'react-icons/md'

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

 export default function Post(){

return (
      <>
        <main className={styles.Container}>
          <div className={styles.posts}>
            <h1>Criando um app CRA do zero</h1>
            <time> <AiOutlineCalendar/> 
                  calendar
            </time>
            <p>author <MdOutlinePersonOutline /> </p>
          

          </div>
        </main>
        </>


        )
        };


export const getStaticPaths : GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['posts.title', 'post.banner', 'posts.author', 'post.content'],
    pageSize:1,
  });

  return {
    paths: [
      

    ],
    fallback: 'blocking'
  
  }
  console.log('gestaticprops', JSON.stringify(postsResponse, null, 2))
  // const todo = ''
};

export const getStaticProps = async ({params}) => {

  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  const post = { 
    first_publication_date: response?.data.first_publication_date?? null,
    data: {
      title: response?.data.title,
      subtitle: response?.data.subtitle,
      author: response?.data.author,
      banner: response?.data.banner,
      content: RichText.asHtml(response?.data.content)   
    },
  };
  return { 
    props: {
      post
    }
  }
};