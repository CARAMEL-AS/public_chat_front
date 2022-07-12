import React, { useEffect, useState } from 'react';
import Sidetab from '../common/sidetab';
import FriendIcon from '../../assets/friends.png';
import HistoryIcon from '../../assets/history.png';
import SettingsIcon from '../../assets/settings.png';
import { dateToTime } from '../../helper/dateHandler';
import { findUser} from '../../helper/dataHandler';
import { sendMessage } from '../../helper/api';
import Friends from '../common/friends';

const Chat = (props) => {

    const { user, allUsers, chat } = props;
    const [tabSelected, setTabSelected] = useState('Friends');
    const [message, setMessage] = useState('');
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const messageSendAttempt = async () => {
        const resp = await sendMessage(user.id, message);
        if(!resp?.error || !resp?.errors) {
            setMessage('')
        }
    }

    const renderOthersMessage = (content, index) => {
        return (
            <li key={index} style={{minWidth: dimensions.width/4, maxWidth: dimensions.width/2, minHeight: dimensions.height/9, marginBottom: '4%', listStyleType: 'none'}}>
                <div style={{width: '100%', height: dimensions.height/25, display: 'flex', alignItems: 'center', paddingLeft: '2%'}}>
                    <p style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.6)'}}>{findUser(allUsers, content.user_id)}</p>
                    <p style={{marginLeft: '1%', color: 'rgba(0,0,0,0.3)', fontWeight: 'bold'}}> - {dateToTime(content.created_at)}</p>
                </div>
                <div style={{width: '100%', minHeight: dimensions.height/15, backgroundColor: 'red', borderRadius: 7, display: 'flex', alignItems: 'center', paddingLeft: '3%'}}>
                    <p style={{color: 'white', fontWeight: '700'}}>{content.message}</p>
                </div>
            </li>
        )
    }

    const renderMyMessage = (content, index) => {
        return (
            <li>

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
        <div style={{height: dimensions.height, width: dimensions.width, backgroundColor: 'white', display: 'flex', alignItems: 'center'}}>
            <div style={{height: dimensions.height, width: dimensions.width/4.6, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>{tabSelected}</p>
                </div>
                <div style={{width: dimensions.width/4.6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'absolute', top: '8%', width: dimensions.width/5, height: dimensions.height/1.25, borderRadius: 8, border: '1px solid rgba(255,255,255,0.6)', alignSelf: 'center'}}>
                        {tabSelected === 'Friends' ? <Friends /> : null}
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: 0, marginLeft: '1%'}}>
                    <p style={{fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: '-13%'}}>Chat App</p>
                    <p style={{color: 'rgba(255,255,255,0.8)', fontWeight: '400', fontStyle: 'italic'}}>Aftab Sidhu</p>
                </div>
            </div>
            <div style={{height: dimensions.height, width: dimensions.width/1.28, backgroundColor: 'white'}}>
                <div style={{position: 'absolute', bottom: '10%', backgroundColor: 'white', height: dimensions.height/1.2, width: dimensions.width/1.285, alignItems: 'flex-end', display: 'flex'}}>
                    <ul>
                        {Object.keys(chat).map((message, index) => {
                            const msg = chat[message];
                            return msg.user_id === user?.id ? renderMyMessage(msg, index)  : renderOthersMessage(msg, index)
                        })}
                    </ul>
                </div>
                <div style={{height: dimensions.height/10, width: dimensions.width/1.5, backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', bottom: '1%', marginLeft: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 7}}>
                    <div style={{height: '76%', width: '80%', borderRadius: 7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} style={{height: '80%', width: '100%', outline: 'none', borderRadius: 7, paddingLeft: '2%', fontSize: 18}} placeholder={'Message'}/>
                    </div>
                    <div onClick={messageSendAttempt} style={{height: '73%', width: '10%', backgroundColor: 'red', marginLeft: '2%', borderRadius: 7, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                        <p style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Send</p>
                    </div>
                </div>
            </div>
            <div style={{height: dimensions.height, position: 'absolute', right: 0, paddingTop: '10%'}}>
                <Sidetab title='Friends' icon={FriendIcon} selection={setTabSelected} />
                <Sidetab title='My Messages' icon={HistoryIcon} selection={setTabSelected} />
                <Sidetab title='Settings' icon={SettingsIcon} selection={setTabSelected} />
            </div>
        </div>
    )
}

export default Chat;