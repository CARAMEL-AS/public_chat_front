import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp, getApps } from "firebase/app";
import Home from './components/home';
import { selectApi } from './actions/api';
import AlertDialog from './components/common/alertDialog';
import LocaleScreen from './components/common/localeScreen';
import supportedLanguages from './resources/supportedLangs.json';
import { GiphyFetch } from '@giphy/js-fetch-api'

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const error = useSelector(state => state.error);
  const locale = useSelector(state => state.locale);
  const gifs = useSelector(state => state.gifs);
  const [displayLocaleScreen, setDisplayLocaleScreen] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log('Gif Initialized: ',gifs)

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

  const initializeGiphy = async () => {
      await dispatch({type: 'INITIALIZE_GIPHY', payload: new GiphyFetch(process.env.REACT_APP_GIPHY_API)})
  }

  useEffect(() => {
    dispatch(selectApi());
    initializeFirebase();
    initializeGiphy();
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
    <div style={{background: "linear-gradient(to right, rgba(0,0,0,0), rgba(211,211,211, 0.09), rgba(0,0,0,0))", display: 'flex', justifyContent: 'center'}}>
      { !loading && <Home /> }
      { error && <AlertDialog /> }
      { displayLocaleScreen && <LocaleScreen visible={displayLocaleScreen} close={setDisplayLocaleScreen} />}
    </div>
  )
}

export default App;