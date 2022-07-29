import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidetab from '../common/sidetab';
import ChatIcon from '../../assets/chat.png'
import FriendIcon from '../../assets/friends.png';
import HistoryIcon from '../../assets/history.png';
import SettingsIcon from '../../assets/settings.png';
import { dateToTime } from '../../helper/dateHandler';
import { findUser, getUserImage } from '../../helper/dataHandler';
import { sendMessage } from '../../helper/api';
import Friends from '../common/friends';
import History from '../common/history';
import Settings from '../common/settings';
import { sortMessages, translateMessages } from '../../helper/dataHandler';
import { getDatabase, ref, update } from "firebase/database";
import newIcon from '../../assets/add.png';
import { GiphyFetch } from '@giphy/js-fetch-api';
import MessageBox from '../common/messageBox';
import Groups from "../common/groups";
import {
    BrowserRouter as Router,
    // Routes,
    // Route,
    Link,
} from 'react-router-dom';

const Chat = (props) => {

    const dispatch = useDispatch();
    const { logout, inAppropriate } = props;
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const allUsers = useSelector(state => state.friends);
    const chat = useSelector(state => state.chat)
    const selectedChat = useSelector(state => state.selectedChat);
    const tabSelected = useSelector(state => state.selectTab);
    const gifs = new GiphyFetch(process.env.REACT_APP_GIPHY_API)
    const [message, setMessage] = useState('');
    const scrollRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const newChatHandler = async () => {
        await dispatch({type: 'OPEN_NEW_FORM', payload: true})
    }

    const updateTypingFB = async (e) => {
        try {
            let newMessage = {};
            const db = getDatabase();
            newMessage[`/users/${user.id}/`] = { ...user, online: true, typing: e.length > 0 ? true : false };
            update(ref(db), newMessage);
        } catch (e) {
            await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    const typingMessageHandler = (e) => {
        setMessage(e.target.value);
        updateTypingFB(e.target.value)
    }

    const messageSendAttempt = async () => {
        try {
            const resp = await sendMessage(user.id, message, selectedChat.id, api);
            if(!resp?.errors) {
                await dispatch({type: 'ERROR', payload: resp?.errors[0]});
            } else if(resp?.error) {
                await dispatch({type: 'ERROR', payload: 'Not allowed to send inappropriate messages!'});
                inAppropriate(resp.warningCount)
            }
            setMessage('')
            updateTypingFB('');
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Failed to connect to server.'});
        }
    }

    const getTrendingGifs = async () => {
        const trending = await gifs.trending({limit: 10 })
        console.log('Trending Gifs: ',trending.data);
    }

    const renderMessage = (content, index, myMessage) => {
        return (
            <li key={index} style={{width: dimensions.width/4, height: 'auto', marginBottom: '1%', listStyleType: 'none'}}>
                <div style={{width: '100%', height: dimensions.height/25, display: 'flex', alignItems: 'center', paddingLeft: '2%', marginTop: '1%'}}>
                    <img style={{height: 32, width: 32, borderRadius: 50, marginRight: '1.8%'}} src={getUserImage(allUsers, content.user_id)} alt={'Friend Image'}/>
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
        getTrendingGifs();
        window.addEventListener('resize', () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[])

    return (
        <div style={{height: dimensions.height, width: dimensions.width, backgroundColor: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center'}}>
            <div style={{height: dimensions.height, width: dimensions.width/4.6, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{width: '75%'}}>
                        <p style={{fontWeight: 'bold', fontSize: 20, color: 'white', marginLeft: '8%'}}>{tabSelected}</p>
                    </div>
                    <div style={{width: '15%'}}>
                        {tabSelected === 'Chats' && <img onClick={newChatHandler} style={{height: 30, width: 30, cursor: 'pointer'}} src={newIcon} />}
                    </div>
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
                        {tabSelected === 'Friends' ? <Friends all={allUsers} user={user} /> : tabSelected === 'History' ? <History messages={chat} myId={user.id} /> : tabSelected === 'Settings' ? <Settings user={user} logout={logout} allUsers={allUsers} /> : <Groups />}
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
                        {selectedChat && sortMessages(selectedChat.messages).map((msg, index) => {
                            return <div key={index} style={{width: '80%', display: 'flex', justifyContent: msg.user_id === user?.id ? 'flex-end' : 'flex-start'}}>
                                {renderMessage(msg, index, msg.user_id === user?.id)}
                            </div>
                        })}
                        <div ref={scrollRef} />
                    </div>
                </ul>
                <MessageBox messageSend={messageSendAttempt} typing={typingMessageHandler} message={message} />
            </div>
            <div style={{height: dimensions.height, position: 'absolute', right: 0, paddingTop: '10%'}}>
                <Router>
                    <Link to={'/friends'}>
                        <Sidetab title='Friends' icon={FriendIcon} />
                    </Link>
                    <Link to={'/chats'}>
                        <Sidetab title='Chats' icon={ChatIcon} />
                    </Link>
                    <Link to={'/history'}>
                        <Sidetab title='History' icon={HistoryIcon} />
                    </Link>
                    <Link to={'/settings'}>
                        <Sidetab title='Settings' icon={SettingsIcon} />
                    </Link>
                </Router>
            </div>
        </div>
    )
}

export default Chat;
