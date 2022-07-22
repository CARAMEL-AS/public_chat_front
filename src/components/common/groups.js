import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatCell from './chatCell';

const Groups = (props) => {

    const { select } = props;
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chat);

    const selectDefaultChat = async () => {
        await dispatch({type: 'SELECT_CHAT', payload: chats[0].id})
    }

    useEffect(() => {selectDefaultChat()}, [])
    useEffect(() => {},[chats])

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowY: 'scroll', flexDirection: 'column'}}>
            {chats.map((chat, index) => {
                return <ChatCell key={index} chat={chat} index={index} select={select} />
            })}
        </div>
    )
}

export default Groups;