import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import Home from './components/home';

const App = () => {

  const initializeFirebase = () => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDy1y6hnBp05fkUE6IJMwEMjyJsTMBmBdI',
      authDomain: 'invite-me-9a07f.firebaseapp.com',
      databaseURL: 'https://invite-me-9a07f-default-rtdb.firebaseio.com',
      projectId: 'invite-me-9a07f',
      storageBucket: 'invite-me-9a07f.appspot.com',
      messagingSenderId: '499646330100',
      appId: '1:499646330100:web:9775b5fa3fb98c01a75aa1',
      measurementId: 'G-QWFRK8LQC',
    };
    initializeApp(firebaseConfig);
  }

  useEffect(() => {
    initializeFirebase();
  },[])

  return (
    <div style={{background: "linear-gradient(to right, rgba(0,0,0,0), rgba(211,211,211, 0.09), rgba(0,0,0,0))"}}>
      <Home />
    </div>
  )
}

export default App;