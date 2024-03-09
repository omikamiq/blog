import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IuserRegisterResponse,
  IerrorResponse,
  IuserRegisterArg,
} from '../types/article';

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getAllArticles: build.query({
      query: ({ token, offset }) => ({
        url: '/articles',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          limit: 5,
          offset,
        },
      }),
      providesTags: (result) => ['Post'],
    }),
    getSingleArticle: build.query({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: (result) => ['Post'],
    }),
    getCurrentUser: build.query({
      query: ({ token }) => ({
        url: `/user`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: (result) => ['Post'],
    }),
    registerNewUser: build.mutation({
      query: ({ user }) => ({
        url: `/users`,
        method: 'POST',
        body: { user: { ...user } },
      }),
      invalidatesTags: ['Post'],
    }),
    loginUser: build.mutation({
      query: ({ user }) => ({
        url: `/users/login`,
        method: 'POST',
        body: { user: { ...user } },
      }),
    }),
    updateUser: build.mutation({
      query: ({ user, token }) => ({
        url: `/user`,
        method: 'PUT',
        body: { user },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    createArticle: build.mutation({
      query: ({ article, token }) => ({
        url: `/articles`,
        method: 'POST',
        body: { article },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    editArticle: build.mutation({
      query: ({ article, token, slug }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    deleteArticle: build.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    favoriteArticle: build.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    unfavoriteArticle: build.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
