import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatCell from './chatCell';

const Groups = (props) => {

    const { select } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const chats = useSelector(state => state.chat);

    const selectDefaultChat = async () => {
        await dispatch({type: 'SELECT_CHAT', payload: chats[0].id})
    }

    useEffect(() => {selectDefaultChat()}, [])
    useEffect(() => {},[chats])

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowY: 'scroll', flexDirection: 'column'}}>
            {chats.length > 0 ? chats.map((chat, index) => {
                return <ChatCell key={index} chat={chat} index={index} select={select} />
            }) : (
                <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <p style={{color: 'rgba(255,255,255,0.8)', width: '90%', textAlign: 'center', fontSize: 18}}>Hey <strong>{user.username}</strong>!</p>
                    <p style={{color: 'rgba(255,255,255,0.5)', width: '90%', textAlign: 'center', fontSize: 13, marginTop: '-2%'}}>To start conversation, please select friend and start chatting!</p>
                </div>
            )}
        </div>
    )
}

export default Groups;