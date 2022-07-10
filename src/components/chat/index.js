import React, { useEffect, useState } from 'react';

const Chat = (props) => {

    const { user } = props;
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[])

    return (
        <div style={{height: dimensions.height, width: dimensions.width, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{height: dimensions.height/1.5, width: dimensions.width/2, backgroundColor: 'white', borderRadius: '20px', display: 'flex', justifyContent: 'center'}}>
                <p style={{fontSize: 23, fontWeight: 'bold', marginTop: '5%'}}>Welcome to Chat App</p>
            </div>
        </div>
    )
}

export default Chat;