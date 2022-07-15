import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import typeAnim from '../../assets/type2.json';

const FriendCell = (props) => {

    const { friend, index, user } = props;
    const [friendOpacity, setFriendOpacity] = useState(0);
    const [friendNameSize, setFriendNameSize] = useState(14);
    const [dimentions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

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
        <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key={index} style={{height: dimentions.height/0.8, width: dimentions.width/1, backgroundColor: 'rgba(255,255,255,0.3)', listStyleType: 'none', borderRadius: 8, opacity: friendOpacity, marginTop: '3%', transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>
            <div style={{flexDirection: 'row', display: 'flex'}}>
                <div style={{width: '78%', marginLeft: '3%', marginTop: '-3%'}}>
                    <p style={{fontWeight: 'bold', color: 'white', fontSize: dimentions.width/17, transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>{friend.username}</p>
                </div>
                <div style={{marginTop: '-3%'}}>
                    <p style={{fontWeight: 'bold', color: friend.online ? '#32cd32' : '#d1001c', fontSize: dimentions.width/25}}>{friend.online ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex'}}>
                <div style={{width: '80%'}}>
                    <p style={{fontSize: dimentions.width/18, marginTop: '-4%', marginLeft: '3%', color: 'white'}}>{friend.email}</p>
                </div>
                {friend.typing && (
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: typeAnim,
                            rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                            }}
                        }
                        height={30}
                        width={30}
                        style={{marginTop: '-6%'}}
                    />
                )}
            </div>
        </li>
    )
}

export default FriendCell;