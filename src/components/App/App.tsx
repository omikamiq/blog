import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { defaultStore } from '../../store/store';

import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import SingleArticle from '../SingleArticle/SingleArticle';
import SignUp from '../Forms/SignUp/SignUp';
import SignIn from '../Forms/SignIn/SignIn';
import Profile from '../Forms/Profile/Profile';
import CreateArticle from '../Forms/CreateArticle/CreateArticle';
import styles from './App.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path='/articles' element={<ArticleList />} />
          <Route path='/articles/:slug' element={<SingleArticle />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/new-article' element={<CreateArticle />} />
          <Route path='/articles/:slug/edit' element={<CreateArticle />} />
          <Route path='' element={<ArticleList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
