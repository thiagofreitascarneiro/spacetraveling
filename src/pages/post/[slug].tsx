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

export default function Post(): PostProps {
  // const = Todo
}
export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['posts.title', 'post.banner', 'posts.author', 'post.content'],
    pageSize:1,
  });
  
  //console.log(JSON.stringify(postsResponse, null, 2))
  // const todo = ''
};

export const getStaticProps = async ({context}) => {
  const prismic = getPrismicClient();
  const { slug } = context;
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug, 
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