import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { uSignout } from '../../helper/api';
import Auth from '../auth';
import Chat from '../chat';
import Verify from '../common/verify';
import { handleUsersList } from '../../helper/dataHandler';
import Punishment from '../common/punishment';
import AddChat from '../common/addChat';
import ImagePicker from '../common/imagePicker';
import Language  from '../common/language';
import { translateContent } from '../../helper/dataHandler';
import { colors } from '../../resources/colors';
import './style.css';

const Home = () => {

    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const locale = useSelector(state => state.locale);
    const newChat = useSelector(state => state.newChat);
    const imagePicker = useSelector(state => state.imagePicker);
    const languagePicker = useSelector(state => state.languagePicker);
    const selectedChat = useSelector(state => state.selectedChat);
    const [backgroundColors, setBackgroundColors] = useState(colors)
    const [displayAuth, setDisplayAuth] = useState(true);
    const [displayVerify, setDisplayVerify] = useState(false);
    const [punishment, setPunishment] = useState({
        visible: false,
        count: 0
    });

    const animateColors = () => {
        setInterval(() => {
            const tempColors = backgroundColors;
            tempColors.splice(0, 0, backgroundColors[backgroundColors.length - 1]);
            tempColors.splice(backgroundColors.length - 1, 1)
            setBackgroundColors(tempColors)
        },200)
    }

    const filterMyChats = (allChats) => {
        let chatList = [];
        for(let key in allChats) {
            const chat = allChats[key];
            if(chat.members.includes(user.id) || chat.admin === user.id) {
                chatList.push(allChats[key]);
            }
        }
        return chatList;
    }

    const inAppropriateMessage = (count) => {
        setPunishment({
            visible: true,
            count
        });
    }

    const checkIfUserHasPunishment = () => {
        setPunishment({
            visible: user.appwarnings && user.appwarnings.length > 0,
            count: user.appwarnings && user.appwarnings.length > 0 ? user.appwarnings[0].count : 0
        })
    }

    const userLogoutAttempt = async () => {
        if(user) {
            fbLogout()
            await uSignout(user.id, api)
            await dispatch({type: 'USER_SIGN_OUT'})
        }
    }

    const fbLogin = async () => {
        try {
            let uLogin = {};
            const db = getDatabase();
            uLogin[`/users/${user.id}/`] = { ...user, online: true, deleted: false };
            await update(ref(db), uLogin);
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    const fbLogout = async () => {
        try {
            let uLogout = {};
            const db = getDatabase();
            uLogout[`/users/${user.id}/`] = { ...user, online: false, deleted: false };
            await update(ref(db), uLogout);
            await dispatch({type: 'ERROR', payload: `Bye ${user.username}! See Ya soon`});
        } catch (err) {
            //await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    const getChat = async () => {
        try {
            const db = getDatabase();
            const starCountRef = ref(db, 'chats/');
            onValue(starCountRef, async (snapshot) => {
                if(snapshot.val() && snapshot.val().length > 0) {
                    const myChats = filterMyChats(snapshot.val());
                    await dispatch({type: 'ALL_CHATS', payload: myChats})
                    if(!selectedChat?.id && myChats.length > 0) {
                        const defaultChat = myChats[myChats.length - 1];
                        const translated = await translateContent(locale, defaultChat.messages);
                        await dispatch({type: 'DEFAULT_CHAT', payload: {id: defaultChat.id, title: defaultChat.name, messages: translated}})
                    }
                }
            });
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    const getUsers = async () => {
        try {
            const db = getDatabase();
            const starCountRef = ref(db, 'users/');
            onValue(starCountRef, (snapshot) => {
                if(snapshot) {
                    dispatch({type: 'FRIENDS', payload: handleUsersList(snapshot.val())})
                }
            });
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    useEffect(() => {
        animateColors();
        window.addEventListener("beforeunload", (ev) => {  
            ev.preventDefault();
            return userLogoutAttempt();
        });
    },[])

    useEffect(() => {
        getUsers();
    },[])

    useEffect(() => {
        if(user) {
            setTimeout(() => {
                setDisplayAuth(false);
                if(!user.accverify.verified) {
                    setDisplayVerify(true)
                } else {
                    setDisplayVerify(false);
                }
            }, 600)
            getChat();
            fbLogin();
            checkIfUserHasPunishment();
        } else {
            userLogoutAttempt();
            setTimeout(() => {
                setDisplayAuth(true)
            }, 600)
        }
    },[user])

    return (
        <div className='backgroundColors' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'}}>
            <Chat logout={userLogoutAttempt} inAppropriate={inAppropriateMessage} />
            {displayAuth && <Auth />}
            {displayVerify && <Verify ulogout={userLogoutAttempt}/>}
            {user && punishment.visible && punishment.count > 0 && <Punishment uId={user.id} count={punishment.count} close={setPunishment} />}
            {newChat && <AddChat />}
            {imagePicker && <ImagePicker />}
            {languagePicker && <Language />}
        </div>
    )
}

export default Home;
