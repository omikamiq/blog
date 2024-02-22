import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { defaultStore } from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={defaultStore}>
    <App />
  </Provider>
);
