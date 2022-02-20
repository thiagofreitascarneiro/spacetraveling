 /* eslint-disable */ 

import { GetStaticPaths, GetStaticProps } from 'next';

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

export default function Post(): PostProps {
  return(

    <h1>Bob</h1>
  )
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query('
  
  
  
  ');
  

  const todo = ''
};

export const getStaticProps = async ({context}) => {
  const prismic = getPrismicClient();
  const { slug } = context;
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug, 
    first_publication_date: response?.data.first_publication_date?? null,
    data: {
      title: response.data.title,
      banner: {
        url: response.data,
      },
      author: response.data.author,
      content: {
        heading: response.data,
        body: {
          text: response.data,
        }[],
      }[],
    };

  }
};
