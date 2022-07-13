import React, { useEffect, useState } from 'react';
import { uSignout } from '../../helper/api';

const Settings = (props) => {

    const { user, logout } = props;
    const [userNameInput, setUserNameInput] = useState(user?.username ? user.username : 'Jatt Coder')
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        })
    },[])

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: '100%', height: '20%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{color: 'rgba(255,255,255,0.4)', fontWeight: '800'}}>User Name</p>
                <input value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} style={{width: '70%', height: '30%', borderRadius: 8, textAlign: 'center', fontWeight: 'bold', marginTop: '-2%'}} />
            </div>
            <div onClick={logout} display={user?.username !== userNameInput} style={{width: '86%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: user?.username !== userNameInput ? '#3E629F' : 'rgba(0,0,0,0.2)', borderRadius: 8, cursor: 'pointer'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>UPDATE</p>
            </div>
            <div style={{position: 'absolute', bottom: '0%', width: '100%', height: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div style={{width: '86%', height: '40%', backgroundColor: 'green', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>LOG OUT</p>
                </div>
                <div>
                    <p style={{color: '#ff0628', fontWeight: 'bold', fontSize: 14}}>DELETE ACCOUNT</p>
                </div>
            </div>
        </div>
    )
}

export default Settings;