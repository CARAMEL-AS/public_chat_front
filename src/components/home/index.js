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
import { translate } from '../../helper/api';

const Home = () => {

    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const newChat = useSelector(state => state.newChat);
    const imagePicker = useSelector(state => state.imagePicker);
    const languagePicker = useSelector(state => state.languagePicker)
    const [displayAuth, setDisplayAuth] = useState(true);
    const [displayVerify, setDisplayVerify] = useState(false);
    const [punishment, setPunishment] = useState({
        visible: false,
        count: 0
    });

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
            uLogin[`/users/${user.id}/`] = { ...user, online: true };
            await update(ref(db), uLogin);
            await dispatch({type: 'ERROR', payload: `Welcome ${user.username}`});
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    const fbLogout = async () => {
        try {
            let uLogout = {};
            const db = getDatabase();
            uLogout[`/users/${user.id}/`] = { ...user, online: false };
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
                if(snapshot.val()) {
                    await dispatch({type: 'ALL_CHATS', payload: filterMyChats(snapshot.val())})
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
        window.addEventListener("beforeunload", (ev) => {  
            ev.preventDefault();
            return userLogoutAttempt();
        });
    },[])

    const testTranslate = async () => {
        console.log('Testing in Home, index.js')
        const resp = await translate('Hello World', 'hi')
        console.log('translated: ',resp)
    }

    useEffect(() => {
        testTranslate();
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
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', background: "linear-gradient(to right, #355C7D, #6C5B7B, #C06C84)"}}>
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
