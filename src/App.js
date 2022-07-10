import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import Home from './components/home';

const App = () => {

  const initializeFirebase = () => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId,
      measurementId: process.env.REACT_APP_measurementId,
    };
    initializeApp(firebaseConfig);
  }

  useEffect(() => {
    initializeFirebase();
  },[])

  return (
    <div>
      <Home />
    </div>
  )
}

export default App;