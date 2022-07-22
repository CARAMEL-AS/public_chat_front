import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import api from './reducers/api';
import user from './reducers/user';
import friends from './reducers/friends';
import chat from './reducers/chat';
import chatId from './reducers/chat_id';

const store = configureStore({
  reducer: combineReducers({
    api, user, friends, chat, chatId
  })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
