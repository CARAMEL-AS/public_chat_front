import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { getWelcome } from '../../helper/api';
import Auth from '../auth';
import Chat from '../chat';
import { handleUsersList } from '../../helper/dataHandler';

const Home = () => {

    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const apiWelcome = async () => {
        console.log('API: ',await getWelcome())
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
        getChat();
        getUsers();
        apiWelcome()
    },[])

    useEffect(() => {
        console.log('Chat: ',chat)
    },[chat])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Chat user={user} allUsers={allUsers} chat={chat}/>
            {!user && <Auth setUser={setUser} />}
        </div>
    )
}

export default Home;