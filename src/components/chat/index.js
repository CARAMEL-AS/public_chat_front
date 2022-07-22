import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Sidetab from '../common/sidetab';
import ChatIcon from '../../assets/chat.png'
import FriendIcon from '../../assets/friends.png';
import HistoryIcon from '../../assets/history.png';
import SettingsIcon from '../../assets/settings.png';
import { dateToTime } from '../../helper/dateHandler';
import { findUser} from '../../helper/dataHandler';
import { sendMessage } from '../../helper/api';
import Friends from '../common/friends';
import History from '../common/history';
import Settings from '../common/settings';
import { sortMessages } from '../../helper/dataHandler';
import { getDatabase, ref, update } from "firebase/database";
import {
    BrowserRouter as Router,
    // Routes,
    // Route,
    Link
} from 'react-router-dom';

const Chat = (props) => {

    const { logout, inAppropriate } = props;
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const allUsers = useSelector(state => state.friends);
    const chat = useSelector(state => state.chat)
    const [selectedChat, setSelectedChat] = useState({
        id: null,
        messages: null
    })
    const [tabSelected, setTabSelected] = useState('Friends');
    const [message, setMessage] = useState('');
    const scrollRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const updateTypingFB = (e) => {
        try {
            let newMessage = {};
            const db = getDatabase();
            newMessage[`/users/${user.id}/`] = { ...user, online: true, typing: e.length > 0 ? true : false };
            update(ref(db), newMessage);
        } catch (e) {
            
        }
    }

    const typingMessageHandler = (e) => {
        setMessage(e.target.value);
        updateTypingFB(e.target.value)
    }

    const messageSendAttempt = async () => {
        const resp = await sendMessage(user.id, message, selectedChat.id, api);
        if(resp?.error || resp?.errors) {
            inAppropriate(resp.warningCount)
        }
        setMessage('')
        updateTypingFB('');
    }

    const renderMessage = (content, index, myMessage) => {
        return (
            <li style={{width: dimensions.width/4, height: 'auto', marginBottom: '1%', listStyleType: 'none'}}>
                <div style={{width: '100%', height: dimensions.height/25, display: 'flex', alignItems: 'center', paddingLeft: '2%'}}>
                    <p style={{fontWeight: '400', color: 'white', fontSize: 15}}>{findUser(allUsers, content.user_id)}</p>
                    <p style={{marginLeft: '1%', color: 'white', fontWeight: '400', fontSize: 13}}> - {dateToTime(content.created_at)}</p>
                </div>
                <div style={{width: '100%', minHeight: dimensions.height/15, backgroundColor: myMessage ? '#f7797d' : '#3E629F', borderRadius: 7, display: 'flex', alignItems: 'center', paddingLeft: '3%', paddingRight: '3%'}}>
                    <p style={{color: 'white', fontWeight: '700', wordBreak: 'break-all'}}>{content.message}</p>
                </div>
            </li>
        )
    }

    useEffect(() => {
        if(scrollRef) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    },[selectedChat])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[allUsers])

    useEffect(() => {
        if(!user) {
            setTabSelected('Friends')
        }
    },[user])

    useEffect(() => {
        if(chat.length > 0) {
            setSelectedChat({
                id: chat[0].id,
                messages: chat[0].messages
            })
        }
    },[chat])

    return (
        <div style={{height: dimensions.height, width: dimensions.width, backgroundColor: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center'}}>
            <div style={{height: dimensions.height, width: dimensions.width/4.6, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>{tabSelected}</p>
                </div>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'absolute', top: '8%', width: dimensions.width/5, height: dimensions.height/1.25, borderRadius: 8, border: '1px solid rgba(255,255,255,0.6)', alignSelf: 'center'}}>
                        {/* <Router>
                            <Routes>
                                <Route index path={'friends' || '*'} element={<Friends all={allUsers} />}/>
                                <Route path="history" element={<History messages={chat} />}/>
                                <Route path="settings" element={<Settings user={user} logout={logout} />}/>
                            </Routes>
                        </Router> */}
                        {tabSelected === 'Friends' ? <Friends all={allUsers} user={user} /> : tabSelected === 'History' ? <History messages={chat} myId={user.id} /> : <Settings user={user} logout={logout} allUsers={allUsers} />}
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: 0, marginLeft: '1%'}}>
                <p style={{fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: '-13%'}}>Chat App</p>
                    <p style={{color: 'rgba(255,255,255,0.8)', fontWeight: '400', fontStyle: 'italic'}}>Aftab Sidhu</p>
                </div>
            </div>
            <div style={{height: dimensions.height, width: dimensions.width/1.28, backgroundColor: 'rgba(0,0,0,0)'}}>
                <ul>
                    <div style={{position: 'absolute', bottom: '13%', backgroundColor: 'rgba(0,0,0,0)', height: dimensions.height/1.2, width: dimensions.width/1.285, justifyContent: 'flex-end', overflowY: 'scroll',}}>
                        {sortMessages(selectedChat.messages).map((msg, index) => {
                            return <div key={index} style={{width: '80%', display: 'flex', justifyContent: msg.user_id === user?.id ? 'flex-end' : 'flex-start'}}>
                                {renderMessage(msg, index, msg.user_id === user?.id)}
                            </div>
                        })}
                        <div ref={scrollRef} />
                    </div>
                </ul>
                <div style={{height: dimensions.height/10, width: dimensions.width/1.5, backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', bottom: '1%', marginLeft: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 7}}>
                    <div style={{height: '76%', width: '80%', borderRadius: 7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <input value={message} onChange={typingMessageHandler} style={{height: '80%', width: '100%', outline: 'none', borderRadius: 7, paddingLeft: '2%', fontSize: 18, backgroundColor: '#434343', color: 'white'}} placeholder={'Message'}/>
                    </div>
                    <div onClick={messageSendAttempt} style={{height: '73%', width: '10%', backgroundColor: '#32cd32', marginLeft: '2%', borderRadius: 7, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <p style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Send</p>
                    </div>
                </div>
            </div>
            <div style={{height: dimensions.height, position: 'absolute', right: 0, paddingTop: '10%'}}>
                <Router>
                    <Link to={'/chats'}>
                        <Sidetab title='Chats' icon={ChatIcon} selection={setTabSelected} tab={tabSelected} />
                    </Link>
                    <Link to={'/friends'}>
                        <Sidetab title='Friends' icon={FriendIcon} selection={setTabSelected} tab={tabSelected} />
                    </Link>
                    <Link to={'/history'}>
                        <Sidetab title='History' icon={HistoryIcon} selection={setTabSelected} tab={tabSelected} />
                    </Link>
                    <Link to={'/settings'}>
                        <Sidetab title='Settings' icon={SettingsIcon} selection={setTabSelected} tab={tabSelected} />
                    </Link>
                </Router>
            </div>
        </div>
    )
}

export default Chat;
