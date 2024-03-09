import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination, Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { articlesAPI } from '../../../src/services/articles';
import { Iarticle } from '../../../src/types/article';
import { useTheme } from 'antd-style';
import Loader from '../Loader/Loader';
import Article from '../Article/Article';
import styles from './ArticleList.module.css';

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const pageQuery = searchParams.get('page') || '';
  const token = useTypedSelector((token) => token.token);
  const { data: articles, isLoading } = articlesAPI.useGetAllArticlesQuery({
    offset: (+pageQuery - 1) * 5,
    token: token.token,
  });
  const theme = useTheme();

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log(pageNumber);
    const strPageNumber = '' + pageNumber;
    setSearchParams({ page: strPageNumber });
  };
  if (isLoading) return <Loader />;
  return (
    <div
      className={styles.article_list}
      style={{
        color: theme.colorTextBase,
        background: theme.colorPrimaryBg,
      }}
    >
      {articles &&
        articles.articles?.map((article: Iarticle) => {
          console.log(article);
          return <Article data={article} />;
        })}
      <Pagination
        current={+pageQuery}
        onChange={onChange}
        pageSize={5}
        showQuickJumper
        total={articles && articles.articlesCount}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ArticleList;
