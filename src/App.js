import React, { useEffect, useState } from 'react';
import { initializeApp, getApps } from "firebase/app";
import Home from './components/home';

const App = () => {

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if(getApps().length > 0) {
      setLoading(false)
    }
  },[getApps()])

  return (
    <div style={{background: "linear-gradient(to right, rgba(0,0,0,0), rgba(211,211,211, 0.09), rgba(0,0,0,0))"}}>
      { !loading && <Home />}
    </div>
  )
}

export default App;