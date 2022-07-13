import React, { useState, useEffect } from 'react';

const Friends = (props) => {

    const { all } = props;
    const [friendOpacity, setFriendOpacity] = useState(0);
    const [friendNameSize, setFriendNameSize] = useState(14);
    const [dimentions, setDimensions] = useState({
        height: window.innerHeight/14,
        width: window.innerWidth/5.5
    })

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

    const renderFriend = (friend, index) => {
        return (
            <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key={index} style={{height: '10%', width: '95%', backgroundColor: 'rgba(255,255,255,0.3)', listStyleType: 'none', borderRadius: 8, opacity: friendOpacity, transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>
                <div style={{flexDirection: 'row', display: 'flex'}}>
                    <div style={{width: '78%', marginLeft: '3%', marginTop: '-3%'}}>
                        <p style={{fontWeight: 'bold', color: 'white', fontSize: friendNameSize, transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>{friend.username}</p>
                    </div>
                    <div style={{marginTop: '-3%'}}>
                        <p style={{fontWeight: 'bold', color: 'white', fontSize: 11}}>{friend.online ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
                <p style={{marginTop: '-4%', marginLeft: '3%', fontSize: 12, color: 'white'}}>{friend.email}</p>
            </li>
        )
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

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'scroll'}}>
            <div style={{width: '100%', height: '97%', display: 'flex', justifyContent: 'center'}}>
                {all.map((friend, index) => {
                    return renderFriend(friend, index);
                })}
            </div>
        </div>
    )
}

export default Friends;