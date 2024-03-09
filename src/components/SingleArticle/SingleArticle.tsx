import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { articlesAPI } from '../../services/articles';
import { Button, Popconfirm } from 'antd';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Article from '../Article/Article';
import Loader from '../Loader/Loader';
import { useTheme } from 'antd-style';
import styles from './SingleArticle.module.css';

const SingleArticle: React.FC = () => {
  const theme = useTheme();
  const [deleted, setDeleted] = useState(false);
  const [edit, setEdit] = useState(false);
  const { slug } = useParams();
  const token = useTypedSelector((token) => token.token);
  const { data: articleData, isLoading } = articlesAPI.useGetSingleArticleQuery(
    {
      slug: slug,
      token: token.token,
    }
  );
  const { data: currentUser } = articlesAPI.useGetCurrentUserQuery(token);
  const [deleteArticle, { data: deleteData }] =
    articlesAPI.useDeleteArticleMutation();

  const deleteHandler = () => {
    deleteArticle({
      slug: slug,
      token: token.token,
    });
    setDeleted(true);
  };

  const EditHandler = () => {
    setEdit(true);
  };

  if (deleted) return <Navigate to={'/articles'} />;
  if (edit) return <Navigate to={`/articles/${slug}/edit`} />;
  if (isLoading) return <Loader />;
  return (
    articleData && (
      <div
        className={styles.single_article}
        style={{
          background: theme.colorPrimaryBg,
        }}
      >
        {currentUser &&
          articleData.article.author.username === currentUser.user.username && (
            <div className={styles.btn_wrapper}>
              <Popconfirm
                title='Delete the task'
                description='Are you sure to delete this task?'
                onConfirm={() => deleteHandler()}
                okText='Yes'
                cancelText='No'
              >
                <Button
                  danger
                  style={{
                    background: theme.colorBgBase,
                  }}
                  className={styles.delete_btn}
                >
                  Delete
                </Button>
              </Popconfirm>

              <Button
                style={{
                  background: theme.colorBgBase,
                }}
                className={styles.edit_btn}
                onClick={() => EditHandler()}
              >
                Edit
              </Button>
            </div>
          )}

        <Article data={articleData.article} />
      </div>
    )
  );
};

export default SingleArticle;
