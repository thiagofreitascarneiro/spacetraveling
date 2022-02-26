 /* eslint-disable */ 

//Next
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';


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
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: any;
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

 export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

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
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['post'],
    pageSize:1,
  });

  const response = posts.results.map(post => {
    return { params: {slug: post.uid} };
  })

  return {
    paths: response,
    fallback: true
  
  }
  
  console.log('gestaticprops', JSON.stringify(posts, null, 2))
};


export const getStaticProps = async ({ params }) => {

  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  const post: Post = { 
    uid: response.uid,
    first_publication_date: response?.data.first_publication_date,
    data: {
      title: Array.isArray(response.data.title) ? 
      RichText.asText(response.data.title) : response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: response.data.banner,
      content: response.data.content.map((value: any) => {
        return {
          heading: value.heading,
          body: value.body,
        };
      }),
    }
 
  };
  return { 
    props: {
      post
    }
  }
};