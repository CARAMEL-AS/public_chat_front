import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Login from './login';
import Signup from './signup';
import Lottie from 'react-lottie';
import helloAnim from '../../assets/hello.json';

const FADE_OUT_TIME = 300;

const Auth = () => {

    const user = useSelector(state => state.user);
    const [pageOpacity, setPageOpacity] = useState(1);
    const [login, setLogin] = useState(true);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const animatePage = () => {
        if(user) {
            setPageOpacity(0);
        } else {
            setPageOpacity(1);
        }
    }

    useEffect(() => {
        animatePage()
    },[user])

    useEffect(() => {
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
                <div style={{height: dimentions.height/2.2, width: dimentions.width/2.4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                    {login ? <Login /> : <Signup />}
                </div>
                <div onClick={() => setLogin(!login)} style={{width: dimentions.width/3, borderTopWidth: '5px', borderTopColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', display: 'flex', zIndex: 1}}>
                    <p style={{fontSize: dimentions.width/100, fontWeight: 'bold', color: 'rgba(0,0,0,0.5)', cursor: 'pointer'}}>{login ? 'SIGNUP' : 'LOGIN'}</p>
                </div>
            </div>
        </div>
    )
}

export default Auth