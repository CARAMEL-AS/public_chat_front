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
import selectTab from './reducers/select_tab';
import hoverTab from './reducers/hover_tab';
import newChat from './reducers/new_chat';
import imagePicker from './reducers/image_picker';
import languagePicker from './reducers/language';
import error from './reducers/error';

const store = configureStore({
  reducer: combineReducers({
    api, user, friends, chat, chatId, selectTab, hoverTab, newChat, imagePicker, languagePicker, error
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
