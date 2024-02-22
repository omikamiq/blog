import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    registerNewUser: build.mutation({
      query: ({ token, user }) => ({
        url: `/users`,
        method: 'POST',
        body: { user: { ...user } },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    loginUser: build.mutation({
      query: ({ token, user }) => ({
        url: `/users/login`,
        method: 'POST',
        body: { user: { ...user } },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
