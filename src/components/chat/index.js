import React, { useEffect, useState } from 'react';
import Sidetab from '../common/sidetab';
import FriendIcon from '../../assets/friends.png';
import HistoryIcon from '../../assets/history.png';
import SettingsIcon from '../../assets/settings.png';
import { dateToTime } from '../../helper/dateHandler';
import { findUser} from '../../helper/dataHandler';
import { sendMessage } from '../../helper/api';
import Friends from '../common/friends';
import History from '../common/history';

const Chat = (props) => {

    const { user, allUsers, chat } = props;
    const [tabSelected, setTabSelected] = useState('Friends');
    const [message, setMessage] = useState('');
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const messageSendAttempt = async () => {
        const resp = await sendMessage(1, message);
        if(!resp?.error || !resp?.errors) {
            setMessage('')
        }
    }

    const renderMessage = (content, index, myMessage) => {
        return (
            <li key={index} style={{width: dimensions.width/4, height: 'auto', marginBottom: '1%', listStyleType: 'none'}}>
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
        window.addEventListener('resize', () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[chat, allUsers])

    return (
        <div style={{height: dimensions.height, width: dimensions.width, backgroundColor: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center'}}>
            <div style={{height: dimensions.height, width: dimensions.width/4.6, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>{tabSelected}</p>
                </div>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'absolute', top: '8%', width: dimensions.width/5, height: dimensions.height/1.25, borderRadius: 8, border: '1px solid rgba(255,255,255,0.6)', alignSelf: 'center'}}>
                        {tabSelected === 'Friends' ? <Friends all={allUsers} /> : tabSelected === 'My Messages' ? <History messages={chat} /> : null}
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
                        {Object.keys(chat).map((message, index) => {
                            const msg = chat[message];
                            return <div style={{width: '80%', display: 'flex', justifyContent: msg.user_id === user?.id ? 'flex-end' : 'flex-start'}}>
                                {renderMessage(msg, index, msg.user_id === user?.id)}
                            </div>
                        })}
                    </div>
                </ul>
                <div style={{height: dimensions.height/10, width: dimensions.width/1.5, backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', bottom: '1%', marginLeft: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 7}}>
                    <div style={{height: '76%', width: '80%', borderRadius: 7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} style={{height: '80%', width: '100%', outline: 'none', borderRadius: 7, paddingLeft: '2%', fontSize: 18}} placeholder={'Message'}/>
                    </div>
                    <div onClick={messageSendAttempt} style={{height: '73%', width: '10%', backgroundColor: '#32cd32', marginLeft: '2%', borderRadius: 7, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <p style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Send</p>
                    </div>
                </div>
            </div>
            <div style={{height: dimensions.height, position: 'absolute', right: 0, paddingTop: '10%'}}>
                <Sidetab title='Friends' icon={FriendIcon} selection={setTabSelected} tab={tabSelected} />
                <Sidetab title='My Messages' icon={HistoryIcon} selection={setTabSelected} tab={tabSelected} />
                <Sidetab title='Settings' icon={SettingsIcon} selection={setTabSelected} tab={tabSelected} />
            </div>
        </div>
    )
}

export default Chat;