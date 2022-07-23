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
import selectFriend from './reducers/select_friend';
import selectTab from './reducers/select_tab';
import hoverTab from './reducers/hover_tab';
import error from './reducers/error';

const store = configureStore({
  reducer: combineReducers({
    api, user, friends, chat, chatId, selectFriend, selectTab, hoverTab, error
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
