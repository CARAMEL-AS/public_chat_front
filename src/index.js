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
import selectTab from './reducers/select_tab';
import hoverTab from './reducers/hover_tab';
import newChat from './reducers/new_chat';
import imagePicker from './reducers/image_picker';
import languagePicker from './reducers/language';
import error from './reducers/error';
import locale from './reducers/locale';
import selectedChat from './reducers/selected_chat';

const store = configureStore({
  reducer: combineReducers({
    api, user, friends, chat, selectedChat, selectTab, hoverTab, newChat, imagePicker, languagePicker, locale, error
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
