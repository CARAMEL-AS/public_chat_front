import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FriendCell = (props) => {

    const { friend, index } = props;
    const dispatch = useDispatch();
    const selectedFriend = useSelector(state => state.selectFriend);
    const [friendOpacity, setFriendOpacity] = useState(0);
    const [friendNameSize, setFriendNameSize] = useState(14);
    const [dimentions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const clickHandler = async () => {
        await dispatch({type: 'SELECT_FRIEND', payload: friend.id});
    }

    const mouseEnter = () => {
        setFriendNameSize(friendNameSize + 2)
        setDimensions({
            height: dimentions.height + 5,
            width: dimentions.width + 5
        })
    }

    const mouseLeave = () => {
        setFriendNameSize(friendNameSize - 2)
        setDimensions({
            height: dimentions.height - 5,
            width: dimentions.width - 5
        })
    }

    const animateFriend = () => {
        setFriendOpacity(1);
    }

    useEffect(() => {
        animateFriend();
        window.addEventListener('resize', () =>{
            setDimensions({
                height: window.innerHeight/14,
                width: window.innerWidth/5.5
            })
        })
    },[])
    // fontSize: friendNameSize

    return (
        <li onClick={clickHandler} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key={index} style={{height: '10%', width: '95%', backgroundColor: 'rgba(255,255,255,0.3)', listStyleType: 'none', borderRadius: 8, opacity: friendOpacity, marginTop: '3%', transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease", cursor: 'pointer', border: selectedFriend === friend.id  ?'1px solid #f7797d' : ''}}>
            <div style={{flexDirection: 'row', display: 'flex', height: '100%'}}>
                <div style={{width: '100%', height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                    <div style={{marginLeft: '2%'}}>
                        <img style={{height: 40, width: 40, borderRadius: 50}} src={friend.image} />
                    </div>
                    <div style={{width: '100%', height: '100%', marginLeft: '2%', overflowX: 'hidden'}}>
                        <p style={{ width: '100%', fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginTop: '4%'}}>{friend.username}</p>
                        <p style={{ width: '95%', fontSize: 12, fontWeight: '400', color: 'rgba(255,255,255,0.5)', marginTop: '-6%'}}>{friend.email}</p>
                    </div>
                    <div style={{width: '25%', height: '100%'}}>
                        <p style={{fontWeight: 'bold', color: friend.online ? '#32cd32' : '#d1001c', fontSize: 11}}>{friend.online ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default FriendCell;
