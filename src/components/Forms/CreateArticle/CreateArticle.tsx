import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { articlesAPI } from '../../../services/articles';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFieldArray,
} from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { useTheme } from 'antd-style';
import Loader from '../../Loader/Loader';
import styles from './CreateArticle.module.css';

type FieldType = {
  title: string;
  description: string;
  body: string;
  tags?: { value: string }[];
};

const CreateArticle = () => {
  const theme = useTheme();
  const [finished, setFinished] = useState(false);
  const { slug } = useParams();
  const {
    data: articleData,
    isSuccess,
    isLoading,
  } = articlesAPI.useGetSingleArticleQuery({
    slug,
  });

  useEffect(() => {
    if (slug) {
      if (articleData) {
        if (articleData.article.tagList.length === 0) append({ value: '' });
        for (let tag of articleData.article.tagList) {
          append({ value: tag });
        }
      }
    } else append({ value: '' });
  }, [articleData]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const [createArticle, { data: createData, error: createError }] =
    articlesAPI.useCreateArticleMutation();
  const [editArticle, { data: editData, error: editError }] =
    articlesAPI.useEditArticleMutation();

  const token = useTypedSelector((state) => state.token);

  const { data: currentUser } = articlesAPI.useGetCurrentUserQuery(token);

  const submit: SubmitHandler<FieldType> = (updatedData) => {
    if (slug) {
      editArticle({
        article: {
          title: updatedData.title,
          description: updatedData.description,
          body: updatedData.body,
          tagList: updatedData.tags?.map((tag) => tag.value),
        },
        token: token.token,
        slug: slug,
      });
      setFinished(true);
    } else {
      createArticle({
        article: {
          title: updatedData.title,
          description: updatedData.description,
          body: updatedData.body,
          tagList: updatedData.tags?.map((tag) => tag.value),
        },
        token: token.token,
      });
      setFinished(true);
    }
  };

  const formError: SubmitErrorHandler<FieldType> = (error) => {
    console.log(error);
  };

  if (!token?.token) return <Navigate to={'/sign-in'} />;
  if (finished) return <Navigate to={'/articles'} />;
  if (isLoading) return <Loader />;

  return (
    <div
      className={styles.page}
      style={{
        color: theme.colorTextBase,
        background: theme.colorPrimaryBg,
      }}
    >
      <form
        className={styles.wrapper}
        onSubmit={handleSubmit(submit, formError)}
        style={{
          color: theme.colorTextBase,
          background: theme.colorBgBase,
        }}
      >
        <div className={styles.title}>
          {slug ? 'Edit article' : 'Create new article'}
        </div>

        <div className={styles.input_label}>Title</div>
        <input
          type='text'
          defaultValue={slug && articleData && articleData.article.title}
          className={
            errors.title
              ? `${styles.input} ${styles.input_error}`
              : styles.input
          }
          placeholder='Title'
          {...register('title', { required: true })}
        />
        <div className={styles.error}>
          {errors.title && 'Title can not be empty!'}
        </div>

        <div className={styles.input_label}>Short description</div>
        <textarea
          defaultValue={slug && articleData && articleData.article.description}
          className={
            errors.description
              ? `${styles.text_area_description} ${styles.input_error}`
              : styles.text_area_description
          }
          placeholder='Short description'
          {...register('description', { required: true })}
        />
        <div className={styles.error}>
          {errors.description && 'Description can not be empty!'}
        </div>

        <div className={styles.input_label}>Text</div>
        <textarea
          defaultValue={slug && articleData && articleData.article.body}
          className={
            errors.body
              ? `${styles.text_area} ${styles.input_error}`
              : styles.text_area
          }
          placeholder='Text'
          {...register('body', { required: true })}
        />
        <div className={styles.error}>
          {errors.body && 'Body can not be empty!'}
        </div>

        <div className={styles.input_label}>Tags</div>

        {fields.map((tag, index, fields) => {
          return (
            <div className={styles.tag_wrapper}>
              <input
                type='text'
                key={tag.id}
                className={
                  errors.tags
                    ? `${styles.tag} ${styles.input_error}`
                    : styles.tag
                }
                placeholder='Tag'
                {...register(`tags.${index}.value` as const)}
              />
              {(index != 0 || fields.length > 1) && (
                <Button
                  danger
                  className={styles.delete_btn}
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              )}
              {index === fields.length - 1 && (
                <Button
                  htmlType='button'
                  className={styles.add_tag_btn}
                  onClick={() => {
                    append({ value: '' });
                  }}
                >
                  Add tag
                </Button>
              )}
            </div>
          );
        })}

        <Button type='primary' htmlType='submit' className={styles.btn}>
          Save
        </Button>
      </form>
      <div>
        {(editError && JSON.stringify(editError)) ||
          (createError && JSON.stringify(createError))}
      </div>
    </div>
  );
};

export default CreateArticle;
