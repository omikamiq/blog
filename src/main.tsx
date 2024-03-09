import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { defaultStore } from './store/store';
import { ThemeProvider } from 'antd-style';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={defaultStore}>
    <ThemeProvider
      theme={(appearance) => {
        if (appearance === 'dark') {
          return {
            token: {
              colorPrimary: 'gray',
            },
          };
        }

        return {
          token: {
            colorPrimary: 'blue',
          },
        };
      }}
    >
      <App />
    </ThemeProvider>
  </Provider>
);
