import React, { useState, useEffect} from 'react';
import { myMessages } from '../../helper/dataHandler';

const History = (props) => {

    const { messages, myId } = props;
    const [myMess, setMyMess] = useState([]);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const getMyMessages = () => {
        setMyMess(myMessages(messages, myId));
    }

    const renderMessage = (content, index) => {
        return (
            <li key={index} style={{ height: 'auto', width: '90%', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 8, marginTop: index === 0 ? '5%' : '2%', marginBottom: '2%', listStyleType: 'none', transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>
                <p style={{color: 'white', marginLeft: '3%', wordBreak: 'break-all'}}>{content.message}</p>
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
    },[])

    useEffect(() => {
        getMyMessages();
    },[messages])

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowY: 'scroll', flexDirection: 'column'}}>
            {myMess.map((message, index) => {
                return renderMessage(message);
            })}
        </div>
    )
}

export default History;