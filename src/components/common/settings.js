import React, { useEffect, useState } from 'react';
import { updateUserName, deleteAccount } from '../../helper/api';
import { getDatabase, ref, update } from "firebase/database";
import { getFbId } from '../../helper/dataHandler';

const Settings = (props) => {

    const { user, logout, allUsers, del } = props;
    const [userNameInput, setUserNameInput] = useState(user?.username ? user.username : 'Jatt Coder')

    const updateNameHandler = async () => {
        await updateUserName(user.id, userNameInput);
        let userName = {};
        const db = getDatabase();
        userName['/users/' + getFbId(user.id, allUsers)] = { ...user, username: userNameInput };
        console.log('Path: ',userName)
        await update(ref(db), userName);
    }

    const deleteAccountHandler = async () => {
        await deleteAccount(user.id)
        let deleteAcc = {};
        const db = getDatabase();
        deleteAcc['/users/' + getFbId(user.id, allUsers)] = {...user, email: 'deleted', online: false};
        await update(ref(db), deleteAcc);
        del(null);
    }

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: '100%', height: '20%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{color: 'rgba(255,255,255,0.4)', fontWeight: '800'}}>User Name</p>
                <input value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} style={{width: '70%', height: '30%', borderRadius: 8, textAlign: 'center', fontWeight: 'bold', marginTop: '-2%'}} />
            </div>
            <div onClick={updateNameHandler} display={user?.username !== userNameInput && userNameInput.length > 0} style={{width: '86%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: user?.username !== userNameInput && userNameInput.length > 0 ? '#3E629F' : 'rgba(0,0,0,0.2)', borderRadius: 8, cursor: 'pointer'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>UPDATE</p>
            </div>
            <div style={{position: 'absolute', bottom: '0%', width: '100%', height: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div onClick={logout} style={{width: '86%', height: '40%', backgroundColor: 'green', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                    <p style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>LOG OUT</p>
                </div>
                <div onClick={deleteAccountHandler} style={{cursor: 'pointer'}}>
                    <p style={{color: '#ff0628', fontWeight: 'bold', fontSize: 14}}>DELETE ACCOUNT</p>
                </div>
            </div>
        </div>
    )
}

export default Settings;