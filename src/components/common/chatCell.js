import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectMembers } from '../../helper/dataHandler';
import toonavatar from 'cartoon-avatar';
import Lottie from 'react-lottie';
import newAnim from '../../assets/new.json';
import { translateContent } from '../../helper/dataHandler';

const ChatCell = (props) => {

    const { chat, index } = props;
    const dispatch = useDispatch();
    const locale = useSelector(state => state.locale);
    const allFriends = useSelector(state => state.friends);
    const selectedChat = useSelector(state => state.selectedChat);
    const [members, setMembers] = useState([])
    const [status, setStatus] = useState({
        lastSeenCount: Object.keys(chat.messages).length,
        totalMessages: Object.keys(chat.messages).length,
    });
    
    const [dimentions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const getRandomImage = () => {
        return toonavatar.generate_avatar()
    }

    const onSelectChat = async () => {
        const translatedMessages = await translateContent(locale, chat.messages);
        await dispatch({type: 'CHANGE_CHAT', payload: {id: chat.id, title: chat.name ? chat.name : 'New Chat!', messages: translatedMessages}});
    }

    useEffect(() => {
        window.addEventListener('resize', () =>{
            setDimensions({
                height: window.innerHeight/14,
                width: window.innerWidth/5.5
            })
        })
    },[])

    useEffect(() => {
        const getData = () => {
            let membersData = [];
            const ids = [chat.admin, ...chat.members];
            ids.forEach(id => {
                const member = collectMembers(id, allFriends)
                membersData.push(member.length > 0 && member[0])
            })
            setMembers(membersData);
        }
        getData();
    },[])

    useEffect(() => {
        if(selectedChat.id === chat.id) {
            setStatus({lastSeenCount: Object.keys(chat.messages).length, totalMessages: Object.keys(chat.messages).length})
        } else if(selectedChat.id !== chat.id && status.lastSeenCount !== Object.keys(chat.messages).length) {
            setStatus({...status, totalMessages: Object.keys(chat.messages).length})
        }
    },[chat, selectedChat])

    return (
        <li key={index} onClick={onSelectChat} style={{height: '10%', width: '95%', display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.3)', listStyleType: 'none', borderRadius: 8, opacity: 1, marginTop: '3%', transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease", cursor: 'pointer'}}>
            <div style={{width: '100%', height: '45%', display: 'flex', alignItems: 'center'}}>
                <p style={{fontSize: 15, fontWeight: 'bold', color: 'rgba(0,0,0,0.9)', paddingLeft: '4%', width: '70%'}}>{chat?.name ? chat?.name : 'New Chat'}</p>
                {status.lastSeenCount !== status.totalMessages && (
                    <div style={{width: '30%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%'}}>
                        <Lottie 
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: newAnim,
                                rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                                }}
                            }
                            height={50}
                            width={50}
                            style={{marginTop: '-6%'}}
                        />
                    </div>
                )}
            </div>
            <div style={{width: '100%', height: '55%', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '5%'}}>
                <div style={{width: '67%'}}>
                    {members.map((member, index) => {
                        if(member.image.length > 0) {
                            return <img key={index} style={{borderRadius: 50, height: 20, width: 20, border: '1px solid white', marginLeft: index !== 0 ? '-3%' : '2%'}} src={member.image} alt={'Friend Image'} />
                        } else {
                            return <img key={index} style={{borderRadius: 50, height: 20, width: 20, border: '1px solid white', marginLeft: index !== 0 ? '-3%' : '2%'}} src={getRandomImage()} alt={'Friend Image'} />
                        }
                    })}
                </div>
                <div style={{width: '30%'}}>
                    <p style={{fontSize: 12}}><strong style={{fontWeight: 'bold', color: 'rgba(255,255,255,0.5)'}}>{Object.keys(chat.messages).length}</strong> messages</p>
                </div>
            </div>
        </li>
    )
}

export default ChatCell;
