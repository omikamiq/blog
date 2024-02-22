import React from 'react';
import { useParams } from 'react-router-dom';
import { articlesAPI } from '../../services/articles';
import Article from '../Article/Article';
import styles from './SingleArticle.module.css';

const SingleArticle: React.FC = () => {
  const { slug } = useParams();
  const { data } = articlesAPI.useGetSingleArticleQuery({
    slug,
  });
  return (
    data && (
      <div className={styles.single_article}>
        <Article data={data.article} />
      </div>
    )
  );
};

export default SingleArticle;
