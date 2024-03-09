import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { articlesAPI } from '../../services/articles';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from 'antd-style';
import like_btn from '../../assets/like_btn.svg';
import styles from './Article.module.css';

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
  const theme = useTheme();
  const { slug } = useParams();
  const token = useTypedSelector((token) => token.token);
  const [liked, setLiked] = useState(data.favorited);
  const [favoriteArticle, { data: favoriteData }] =
    articlesAPI.useFavoriteArticleMutation();
  const [unfavoriteArticle, { data: unfavoriteData }] =
    articlesAPI.useUnfavoriteArticleMutation();

  const likeHandler = () => {
    if (liked) {
      unfavoriteArticle({ slug: data.slug, token: token.token });
      setLiked((value) => false);
    }
    if (!liked) {
      favoriteArticle({ slug: data.slug, token: token.token });
      setLiked((value) => true);
    }
  };
  return (
    <div
      className={styles.wrapper}
      style={{
        color: theme.colorTextBase,
        background: theme.colorBgBase,
      }}
    >
      <div className={styles.left}>
        <div className={styles.title_and_like_wrapper}>
          <Link to={`/articles/${data.slug}`} className={styles.title}>
            {data.title}
          </Link>

          <button
            type='button'
            className={styles.likes}
            onClick={() => likeHandler()}
          >
            <img
              src={like_btn}
              alt='like_btn'
              className={data.favorited ? styles.liked_btn : styles.unliked_btn}
            />
          </button>
          <div className={styles.like_counter}>{data.favoritesCount}</div>
        </div>
        <div className={styles.tags_wrapper}>
          {data.tagList
            ?.map((tag) => (
              <div
                className={styles.tag}
                style={{
                  background: theme.colorPrimaryBg,
                }}
              >
                {tag}
              </div>
            ))
            .slice(0, 3)}
        </div>
        <div className={styles.text_wrapper}>{data.description}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.name_and_data_wrapper}>
          <div className={styles.author_name}>{data.author.username}</div>
          <div
            className={styles.publication_data}
            style={{
              color: theme.colorTextBase,
            }}
          >
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
