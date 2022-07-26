import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import supportedLanguages from '../../resources/supportedLangs.json';
import { getLocaleName } from '../../helper/dataHandler';
import Lottie from 'react-lottie';
import backgroundAnim from '../../assets/background.json';

const MESSAGE_STYLES = {fontSize: 17, fontWeight: '300', color: 'rgba(0,0,0,0.6)', margin: 0, marginBottom: '7%', textAlign: 'center'}

const LocaleScreen = (props) => {

    const { visible, close } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const locale = useSelector(state => state.locale);
    const [language, setLanguage] = useState('');
    const [pageOpacity, setPageOpacity] = useState(0);
    const [innerPageBottom, setInnerPageBottom] = useState(-500);
    const [message, setMessage] = useState(1);
    const [messageOpacity, setMessageOpacity] = useState(0);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const closePage = () => {
        close(false);
    }

    const hidePage = () => {
        setTimeout( async () => {
            setMessageOpacity(0);
            closePage();
            await dispatch({type: 'ERROR', payload: `Yaay! Messages translated successfully`})
        },1000)
        setPageOpacity(0);
        setInnerPageBottom(-500);
    }

    const swapMessage = () => {
        setTimeout(() => {
            setTimeout(() => {
                setMessageOpacity(1);
            },100)
            setMessage(2);
        },700)
        setMessageOpacity(0);
    }

    const displayPage = () => {
        setTimeout(() => {
            setTimeout(() => {
                setTimeout(() => {
                    swapMessage();
                },5000)
                setTimeout(() => {
                    hidePage();
                },10000)
                setInnerPageBottom(0);
                setPageOpacity(1);
                setMessageOpacity(1);
            },1000)
            setInnerPageBottom(-400);
        },1000)
        setPageOpacity(0.4);
        setInnerPageBottom(-300);
    }

    const message1 = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '17%'}}>
                <p style={MESSAGE_STYLES}>Translating all messages</p>
                <p style={MESSAGE_STYLES}>to <strong>{language}</strong></p>
            </div>
        )
    }

    const message2 = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '17%'}}>
                <p style={MESSAGE_STYLES}><strong>Thank You!</strong> for you patience</p>
                <p style={MESSAGE_STYLES}>Taking you back!</p>
            </div>
        )
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
        if(visible && locale.prev !== locale.current) {
            displayPage();
        } else if (locale.prev === locale.current) {
            closePage();
        }
    },[])

    useEffect(() => {
        if(!user) {
            hidePage();
        }
    },[user])

    useEffect(() => {
        setLanguage(getLocaleName(locale.current, supportedLanguages))
    },[])

    return(
        <div style={{height: dimentions.height, width: dimentions.width, opacity: pageOpacity, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', transition: "all 0.7s ease", WebkitTransition: "all 0.7s ease", MozTransition: "all 0.7s ease"}}>
            <div style={{height: dimentions.height, width: dimentions.width, position: 'absolute', bottom: innerPageBottom, backgroundColor: `rgba(255,255,255,1)`, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: "all 1s ease", WebkitTransition: "all 1s ease", MozTransition: "all 1s ease"}}>
                <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: backgroundAnim,
                        rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                        }}
                    }
                    height={'90%'}
                    width={'50%'}
                />
                <div style={{position: 'absolute', opacity: messageOpacity, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)', transition: "all 0.7s ease", WebkitTransition: "all 0.7s ease", MozTransition: "all 0.7s ease"}}>
                    {message === 1 ? message1() : message2()}
                </div>
            </div>
        </div>
    )
}

export default LocaleScreen;