import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice';
import { articlesAPI } from '../services/articles';

const rootReducer = combineReducers({
  [articlesAPI.reducerPath]: articlesAPI.reducer,
  token: tokenSlice,
});

export const defaultStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
