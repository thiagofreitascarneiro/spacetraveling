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
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { MdOutlinePersonOutline } from 'react-icons/md'


// Outros
import ptBR from 'date-fns/locale/pt-BR';
import format from 'date-fns/format';

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

  function timePost(content:any): string {
    const words = content
      .map((item:any) => {
        return RichText.asText(item.body).split(' ');
      })
      .reduce((acc, curr) => [...curr, ...acc], [])
      .filter(i => i !== '');

    const min = Math.ceil(words.length / 200);

    return `${min} min`;
  }


return (
      <>
      {router.isFallback ? (
        <div>Carregando...</div>
      ) : (
        <main className={styles.Container}>
          <div className={styles.posts}>
            <div className={styles.banner}>
              <img src={post.data.banner.url} alt="banner" />
            </div>
            <div>
              <h2>{post.data.title}</h2>
              <div className={styles.commonStyles}>
                <time>
                  <FiCalendar />

                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
                <span>
                  <FiUser />
                  {post.data.author}
                </span>
                <time>
                  <FiClock />
                  {timePost(post.data.content)}
                </time>
              </div>
              {post.data.content.map(content => {
                return (
                  <div key={content.heading}>
                    <h3>{content.heading}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(content.body)
                          ? RichText.asHtml(content.body)
                          : content.body,
                      }}
                    />
                  </div>
                );
              })}
            </div>

          </div>
        </main>
         )}
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