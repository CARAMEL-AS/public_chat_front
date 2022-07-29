import React, { useState, useEffect } from 'react';

const MessageBox = (props) => {

    const { messageSend, typing, message } = props;
    const [displayMessageBox, setDisplayMessageBox] = useState(true);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
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
        <div style={{height: dimensions.height/10, width: dimensions.width/1.5, backgroundColor: 'rgba(0,0,0,0)', position: 'absolute', bottom: '1%', marginLeft: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 7}}>
            {displayMessageBox ? (
                <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <div>
                        <p>GIF</p>
                    </div>
                    <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <div style={{height: '90%', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <input value={message} onChange={typing} style={{height: '80%', width: '100%', outline: 'none', borderRadius: 50, paddingLeft: '2%', fontSize: 18, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', opacity: 1}} placeholder={'Message'}/>
                        </div>
                        <div onClick={messageSend} style={{height: '80%', width: '10%', backgroundColor: '#32cd32', marginLeft: '1%', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <p style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Send</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>

                </div>
            )}
        </div>
    )
}

export default MessageBox;