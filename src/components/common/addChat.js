import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGroup } from '../../helper/api';
import InputField from './inputField';
import Button from './button';
import FriendSelection from './friendSelection';
import CloseIcon from '../../assets/close.png';

const AddChat = () => {
    
    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const friends = useSelector(state => state.friends);
    const newChat = useSelector(state => state.newChat);
    const [pageOpacity, setPageOpacity] = useState(0);
    const [newFormData, setNewFormData] = useState({
        name: '',
        friends: []
    })
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const closeFormHandler = async () => {
        await dispatch({type: 'CLOSE_NEW_FORM' });
    }

    const displayForm = () => {
        setPageOpacity(1);
    }

    const hideForm = () => {
        setPageOpacity(0);
        closeFormHandler();
    }

    const textChangeHandler = (e) => {
        setNewFormData({...newFormData, name: e})
    }

    const onSelectChange = (friendId, checkStatus) => {
        if(checkStatus) {
            setNewFormData({...newFormData, friends: [...newFormData.friends, friendId]})
        } else {
            setNewFormData({...newFormData, friends: newFormData.friends.filter(friend => friend !== friendId)})
        }
    }

    const buttonClickHandler = async () => {
        try {
            const resp = await createGroup(user.id, newFormData, api)
            if(!resp?.error) {
                hideForm();
            } else {
                await dispatch({type: 'ERROR', payload: resp?.error});
            }
        } catch (e) {
            await dispatch({type: 'ERROR', payload: 'Opps! Server Error, continue using Chat-App'});
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth});
        })
    },[])

    useEffect(() => {
        if(newChat) {
            displayForm();
        }
    },[newChat])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, opacity: pageOpacity, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>
            <div style={{height: dimentions.height/1.2, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div onClick={hideForm} style={{width: '100%', height: '4%', display: 'flex', justifyContent: 'flex-end'}}>
                    <img src={CloseIcon} style={{cursor: 'pointer', height: 20, width: 20, marginRight: '3%', marginTop: '2%'}} />
                </div>
                <p style={{marginTop: '1%', marginBottom: '-1%', color: 'rgba(0,0,0,0.6)', fontSize: 18, fontWeight: 'bold'}}>New Group Form</p>
                <InputField type='text' placeholder='Name' onChangeText={textChangeHandler} />
                <p style={{fontSize: 15, color: 'rgba(0,0,0,0.4)', marginTop: '5%'}}>Please select friends to join you in new group</p>
                <div style={{width: '70%', height: '50%', border: '1px solid rgba(0,0,0,0.6)', borderRadius: 10, marginBottom: '-4%', overflowY: 'scroll'}}>
                    {friends && friends.filter(friend => friend.id !== user.id).map((friend, index) => {
                        return (
                            <FriendSelection key={index} friend={friend} index={index} select={onSelectChange} selected={newFormData.friends} last={index === friends.length - 2} />
                        )
                    })}
                </div>
                <Button action='Create' onClick={buttonClickHandler} disabled={newFormData.name.trim().length === 0 || newFormData.friends.length === 0} />
            </div>
        </div>
    )
}

export default AddChat;