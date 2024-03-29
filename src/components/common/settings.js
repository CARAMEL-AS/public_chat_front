import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserName, deleteAccount } from '../../helper/api';
import { getDatabase, ref, update } from "firebase/database";
import { getFbId } from '../../helper/dataHandler';
import { getLocaleName } from '../../helper/dataHandler';
import supportedLanguages from '../../resources/supportedLangs.json';

const Settings = (props) => {

    const { logout } = props;
    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const allUsers = useSelector(state => state.friends);
    const locale = useSelector(state => state.locale)
    const [userNameInput, setUserNameInput] = useState(user?.username ? user.username : 'Jatt Coder');

    const openImagePicker = async () => {
        await dispatch({type: 'OPEN_IMAGE_PICKER'})
    }

    const openLanguagePicker = async () => {
        await dispatch({type: 'OPEN_LANGUAGE_PICKER'})
    }

    const updateNameHandler = async () => {
        try {
            await updateUserName(user.id, userNameInput, api);
            let userName = {};
            const db = getDatabase();
            userName[`/users/${user.id}`] = { ...user, username: userNameInput, deleted: false, online: true };
            await update(ref(db), userName);
            await dispatch({type: 'USER_UPDATE_NAME', payload: userNameInput})
        } catch (e) {
            // ignore error
        }
    }

    const deleteAccountHandler = async () => {
        try {
            await logout();
            const resp = await deleteAccount(user.id, api);
            let deleteAcc = {};
            const db = getDatabase();
            deleteAcc[`/users/${user.id}`]  = {...user, deleted: true, online: false};
            await update(ref(db), deleteAcc);
        } catch (e) {
            console.log('Delete Error: ',e)
            // ignore error
        }
    }

    useEffect(() => {},[user])

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{ width: '100%', height: '43%', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 0}}>
                <div style={{marginTop: '10%', backgroundColor: 'white', borderRadius: 50}}>
                    <div onClick={openImagePicker} style={{height: 95, width: 95, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={user.image} style={{height: 93, width: 93, borderRadius: 50, cursor: 'pointer'}} alt={'My Image'} />
                    </div>
                </div>
                <p style={{color: 'rgba(255,255,255,0.4)', fontWeight: '800'}}>User Name</p>
                <input value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} style={{width: '70%', height: '15%', borderRadius: 8, textAlign: 'center', fontWeight: 'bold', marginTop: '-2%'}} />
            </div>
            <div onClick={updateNameHandler} disabled={user?.username !== userNameInput && userNameInput.length > 0} style={{width: '86%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: user?.username !== userNameInput && userNameInput.length > 0 ? '#3E629F' : 'rgba(0,0,0,0.2)', borderRadius: 8, cursor: 'pointer'}}>
                <p style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>UPDATE</p>
            </div>
            <div style={{width: '75%', height: 0.5, backgroundColor: 'rgba(255,255,255,0.3)', marginTop: '10%'}} />
            <div onClick={openLanguagePicker} style={{width: '70%', height: '8%', backgroundColor: 'white', borderRadius: 8, fontWeight: 'bold', marginTop: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', cursor: 'pointer'}}>
                <p style={{color: 'rgba(0,0,0,0.3)', fontWeight: '400', fontSize: 12, marginBottom: 0, marginTop: 0}}>Language</p>
                <p style={{color: 'rgba(0,0,0,0.7)', fontSize: 15, marginBottom: 0, marginTop: '1%'}}>{getLocaleName(locale.current, supportedLanguages)}</p>
            </div>
            <div style={{position: 'absolute', bottom: '-3%', width: '100%', height: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div onClick={logout} style={{width: '86%', height: '40%', backgroundColor: 'green', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                    <p style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>LOG OUT</p>
                </div>
                <div onClick={deleteAccountHandler} style={{cursor: 'pointer'}}>
                    <p style={{color: '#ff0628', fontWeight: '800', fontSize: 10}}>DELETE ACCOUNT</p>
                </div>
            </div>
        </div>
    )
}

export default Settings;