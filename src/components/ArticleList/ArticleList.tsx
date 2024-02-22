import React, { useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

import Article from '../Article/Article';
import { articlesAPI } from '../../../src/services/articles';
import { Iarticle } from '../../../src/types/article';
import styles from './ArticleList.module.css';

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const pageQuery = searchParams.get('page') || '';
  const { data: articles } = articlesAPI.useGetAllArticlesQuery({
    offset: (+pageQuery - 1) * 5,
  });

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log(pageNumber);
    const strPageNumber = '' + pageNumber;
    setSearchParams({ page: strPageNumber });
  };

  return (
    <div className={styles.article_list}>
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
