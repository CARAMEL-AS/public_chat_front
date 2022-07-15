import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getWelcome, uSignout } from '../../helper/api';
import Auth from '../auth';
import Chat from '../chat';
import { handleUsersList } from '../../helper/dataHandler';
import { getFbId } from '../../helper/dataHandler';
import Punishment from '../common/punishment';

const Home = () => {

    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [punishment, setPunishment] = useState({
        visible: false,
        count: 0
    });

    const apiWelcome = async () => {
        
    }

    const inAppropriateMessage = (count) => {
        setPunishment({
            visible: true,
            count
        });
    }

    const checkIfUserHasPunishment = () => {
        setPunishment({
            visible: user.appwarnings.length > 0,
            count: user.appwarnings[0].count
        })
    }

    const userLogoutAttempt = async () => {
        fbLogout()
        const resp = await uSignout(user.id)
        setUser(null)
    }

    const fbLogin = async () => {
        let uLogin = {};
        const db = getDatabase();
        uLogin['/users/' + getFbId(user.id, allUsers)] = { ...user, online: true };
        console.log('ULogin: ',uLogin)
        await update(ref(db), uLogin);
    }

    const fbLogout = async () => {
        let uLogout = {};
        const db = getDatabase();
        uLogout['/users/' + getFbId(user.id, allUsers)] = { ...user, online: false };
        console.log('Ulogout: ',uLogout)
        await update(ref(db), uLogout);
    }

    const getChat = async () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'messages/');
        onValue(starCountRef, (snapshot) => {
            setChat(snapshot.val())
        });
    }

    const getUsers = async () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            setAllUsers(handleUsersList(snapshot.val()))
        });
    }

    useEffect(() => {
        window.addEventListener("beforeunload", (ev) => {  
            ev.preventDefault();
            return userLogoutAttempt();
        });
    },[])

    useEffect(() => {
        getChat();
        getUsers();
        apiWelcome()
    },[])

    useEffect(() => {
        if(user) {
            fbLogin();
            checkIfUserHasPunishment();
        }
    },[user])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', background: "linear-gradient(to right, #355C7D, #6C5B7B, #C06C84)"}}>
            <Chat user={user} allUsers={allUsers} chat={chat} logout={userLogoutAttempt} inAppropriate={inAppropriateMessage}/>
            {!user && <Auth setUser={setUser} />}
            {user && punishment.visible && punishment.count > 0 && <Punishment uId={user.id} count={punishment.count} close={setPunishment} />}
        </div>
    )
}

export default Home;
