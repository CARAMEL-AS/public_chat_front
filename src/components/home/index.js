import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { getWelcome } from '../../helper/api';
import Auth from '../auth';
import Chat from '../chat';

const Home = () => {

    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);

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

    useEffect(() => {
        getChat();
        apiWelcome()
    },[])

    useEffect(() => {
        console.log('Chat: ',chat)
    },[chat])

    return (
        <div>
            <Chat user={user}/>
            {!user && <Auth setUser={setUser} />}
        </div>
    )
}

export default Home;