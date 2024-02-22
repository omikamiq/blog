import React from 'react';
import Markdown from 'react-markdown';
import styles from './Article.module.css';
import like_btn from '../../assets/like_btn.svg';
import { Link, useParams } from 'react-router-dom';

import { Iarticle } from '../../../src/types/article';

interface articleProps {
  data: Iarticle;
}

const formatData = (unformatedDate: string) => {
  const date = new Date(Date.parse(unformatedDate));
  return `${date.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} `;
};

const Article: React.FC<articleProps> = ({ data }) => {
  const { slug } = useParams();
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title_and_like_wrapper}>
          <Link to={`/articles/${data.slug}`} className={styles.title}>
            {data.title}
          </Link>

          <button type='button' className={styles.likes}>
            <img src={like_btn} alt='like_btn' />
          </button>
          <div className={styles.like_counter}>12</div>
        </div>
        <div className={styles.tags_wrapper}>
          {data.tagList
            ?.map((tag) => <div className={styles.tag}>{tag}</div>)
            .slice(0, 3)}
        </div>
        <div className={styles.text_wrapper}>{data.description}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.name_and_data_wrapper}>
          <div className={styles.author_name}>{data.author.username}</div>
          <div className={styles.publication_data}>
            {formatData(data.createdAt)}
          </div>
        </div>
        <img className={styles.author_avatar} src={data.author.image}></img>
      </div>
      <Markdown className={styles.full_text}>{slug && data.body}</Markdown>
    </div>
  );
};

export default Article;
