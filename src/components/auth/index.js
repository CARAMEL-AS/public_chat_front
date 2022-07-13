import React, { useEffect, useState} from 'react';
import Login from './login';
import Signup from './signup';
import Lottie from 'react-lottie';
import helloAnim from '../../assets/hello.json';

const Auth = (props) => {

    const { setUser } = props;
    const [login, setLogin] = useState(true);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth});
        })
    },[])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{height: dimentions.height/1.5, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div>
                    <p style={{fontSize: 25, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)'}}>Welcome to Chat App</p>
                </div>
                <div style={{height: dimentions.height/2.2, width: dimentions.width/2.4, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                    {login ? <Login setUser={setUser} /> : <Signup setUser={setUser} />}
                </div>
                <div onClick={() => setLogin(!login)} style={{width: dimentions.width/3, borderTopWidth: '5px', borderTopColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <p style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.5)', cursor: 'pointer'}}>{login ? 'SIGNUP' : 'LOGIN'}</p>
                </div>
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
                        height={220}
                        width={220}
                        style={{position: 'absolute', right: dimentions.height/2, bottom: dimentions.height/9}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Auth