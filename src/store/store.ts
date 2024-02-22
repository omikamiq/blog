import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { articlesAPI } from '../services/articles';

const rootReducer = combineReducers({
  [articlesAPI.reducerPath]: articlesAPI.reducer,
});

export const defaultStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesAPI.middleware),
});
