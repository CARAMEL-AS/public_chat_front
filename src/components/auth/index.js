import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './login';
import Signup from './signup';
import Lottie from 'react-lottie';
import helloAnim from '../../assets/hello.json';
import googleAnim from '../../assets/google.json';
import facebookAnim from '../../assets/facebook.json';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { singIn } from '../../helper/api';

const FADE_OUT_TIME = 300;

const Auth = () => {

    const dispatch = useDispatch();
    const [facebookAuthProvider, setFacebookAuthProvider] = useState(null);
    const [googleAuthProvider, setGoogleAuthProvider] = useState(null);
    const user = useSelector(state => state.user);
    const api = useSelector(state => state.api);
    const [pageOpacity, setPageOpacity] = useState(1);
    const [login, setLogin] = useState(true);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const getProvider = () => {
        setGoogleAuthProvider(new GoogleAuthProvider());
        setFacebookAuthProvider(new FacebookAuthProvider());
    }

    const animatePage = () => {
        if(user) {
            setPageOpacity(0);
        } else {
            setPageOpacity(1);
        }
    }

    const socialAccountLogin = async (name, email, photo, method) => {
        try {
            const resp = await singIn(email, process.env.REACT_APP_SOCIAL_PASS, method, api, name, photo);
            if(!resp?.error) {
                await dispatch({type: 'CHANGE_LANGUAGE', payload: resp.setting.language});
                await dispatch({type: 'USER_SIGN_IN', payload: resp});
                await dispatch({type: 'ERROR', payload: `Welcome ${resp.username}`});
            } else {
                await dispatch({type: 'ERROR', payload: !resp?.error})
            }
        } catch (e) {

        }
        //await dispatch({type: 'ERROR', payload: `Welcome ${name}, throught ${method}`})
    }

    const googleSignInAttempt = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
        .then( async (result) => {
            const user = result.user;
            if(!user.emailVerified) {
                socialAccountLogin(user.displayName, user.email, user.photoURL, 'Google');
            } else {
                await dispatch({type: 'ERROR', payload: 'Your email is not verified by Google.'});
            }
        }).catch(async (error) => {
            await dispatch({type: 'ERROR', payload: 'Google Error!'});
        });
    }

    const facebookSignInAttempt = () => {
        const auth = getAuth();
        signInWithPopup(auth, facebookAuthProvider)
        .then( async (result) => {
            const user = result.user;
            if(!user.emailVerified) {
                socialAccountLogin(user.displayName, user.email, user.photoURL, user.emailVerified, 'Facebook');
            } else {
                await dispatch({type: 'ERROR', payload: 'Your email is not verified by Facebook.'});
            }
        }).catch( async (error) => {
            await dispatch({type: 'ERROR', payload: 'Facebook Error!'});
        });
    }

    useEffect(() => {
        animatePage()
    },[user])

    useEffect(() => {
        getProvider();
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth});
        })
    },[])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pageOpacity, transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease"}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: 0}}>
                <div>
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: helloAnim,
                            rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                            }}
                        }
                        height={200}
                        width={200}
                    />
                </div>
            </div>
            <div style={{height: dimentions.height/1.5, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div>
                    <p style={{fontSize: dimentions.width/55, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)'}}>Welcome to Chat App</p>
                </div>
                <div style={{width: '100%', height: '90%', display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{width: '35%', height: '100%'}}>
                        <div style={{width: '100%', height: '100%', borderTopWidth: '5px', borderTopColor: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', zIndex: 1}}>
                            <div style={{marginLeft: '10%', height: '20%', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: 8, border: '0.1px solid rgba(0,0,0,0.1)'}}>
                                <p onClick={() => setLogin(true)} style={{fontSize: login ? dimentions.width/110 : dimentions.width/150, fontWeight: login ? '800' : '500', color: 'rgba(0,0,0,0.5)', cursor: 'pointer', margin: 0, marginBottom: '6%', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease"}}>LOGIN</p>
                                <p onClick={() => setLogin(false)} style={{fontSize: !login ? dimentions.width/110 : dimentions.width/150, fontWeight: !login ? '800' :' 500', color: 'rgba(0,0,0,0.5)', cursor: 'pointer', margin: 0, marginTop: '6%', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease"}}>SIGNUP</p>
                            </div>
                            <p style={{width: '80%', marginTop: '15%', marginLeft: '10%', fontSize: 11, color: 'rgba(0,0,0,0.3)'}}>If you have friends who are as weird as you, then you have everything.</p>
                        </div>
                    </div>
                    <div style={{height: '80%', width: 0.5, backgroundColor: 'rgba(0,0,0,0.2)'}} />
                    <div style={{width: '70%', height: '100%'}}>
                        <div style={{height: !login ? '90%' : '70%', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                            {login ? <Login /> : <Signup />}
                        </div>
                        {login && (
                            <>
                                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1%'}}>
                                    <p style={{fontSize: 11, color: 'rgba(0,0,0,0.2)'}}>Or Sign-in with</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', height: 75, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '-2%'}}>
                                <div onClick={facebookSignInAttempt} style={{cursor: 'pointer', marginRight: '2.5%'}}>
                                    <Lottie 
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: facebookAnim,
                                            rendererSettings: {
                                            preserveAspectRatio: "xMidYMid slice"
                                            }}
                                        }
                                        height={50}
                                        width={50}
                                    />
                                </div>
                                <div onClick={googleSignInAttempt} style={{cursor: 'pointer', marginLeft: '2.5%'}}>
                                    <Lottie 
                                        options={{
                                            loop: true,
                                            autoplay: true,
                                            animationData: googleAnim,
                                            rendererSettings: {
                                            preserveAspectRatio: "xMidYMid slice"
                                            }}
                                        }
                                        height={35}
                                        width={35}
                                        style={{borderRadius: 50}}
                                    />
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth