import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp, getApps } from "firebase/app";
import Home from './components/home';
import { selectApi } from './actions/api';
import AlertDialog from './components/common/alertDialog';
import LocaleScreen from './components/common/localeScreen';
import supportedLanguages from './resources/supportedLangs.json';

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const error = useSelector(state => state.error);
  const locale = useSelector(state => state.locale);
  const [displayLocaleScreen, setDisplayLocaleScreen] = useState(false);
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
    dispatch(selectApi());
    initializeFirebase();
  },[])

  useEffect(() => {
    if(getApps().length > 0) {
      setLoading(false)
    }
  },[getApps()])

  useEffect(() => {
    if(user && supportedLanguages[user.setting.language] !== locale) {
      setDisplayLocaleScreen(true)
    }
  },[locale])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      { !loading && <Home /> }
      { error && <AlertDialog /> }
      { displayLocaleScreen && <LocaleScreen visible={displayLocaleScreen} close={setDisplayLocaleScreen} />}
    </div>
  )
}

export default App;