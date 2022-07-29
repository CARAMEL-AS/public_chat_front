import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Button from './button';
import toonavatar from 'cartoon-avatar';
import AvatarCell from './avatarCell';
import { updateImage } from '../../helper/api';
import { getDatabase, ref, update } from "firebase/database";
import CloseIcon from '../../assets/close.png';

const ImagePicker = (props) => {
    
    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const picker = useSelector(state => state.imagePicker);
    const [avatars, setAvatars] = useState([]);
    const [testImage, setTestImage] = useState('');
    const [pageOpacity, setPageOpacity] = useState(0);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const displayPicker = async () => {
        await setPageOpacity(1);
    }

    const hidePicker = async () => {
        setTimeout( async () => {
            await dispatch({type: 'CLOSE_IMAGE_PICKER'})
        },300)
        await setPageOpacity(0);
    }

    const updateFb = async () => {
        let updateUImg = {};
        const db = getDatabase();
        updateUImg[`/users/${user.id}/`] = { ...user, image: testImage, online: true };
        await update(ref(db), updateUImg);
        hidePicker();
    }

    const updateImg = async () => {
        try {
            const resp = await updateImage(user.id, testImage, api);
            if(!resp?.error) {
                await dispatch({type: 'USER_UPDATE_IMAGE', payload: testImage});
                await dispatch({type: 'ERROR', payload: 'Yaay! Image updated!'});
                updateFb();
            } else {
                await dispatch({type: 'ERROR', payload: resp?.error});
            }
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Failed to connect to server.'});
        }
    }

    const onSelect = (avatar) => {
        setTestImage(avatar)
    }

    const generateAvatars = () => {
        let tempAvatars = []
        for(let i = 1; i < 15; i++) {
            const maleAvatar = toonavatar.generate_avatar({"gender":"male","id":i});
            const femaleAvatar = toonavatar.generate_avatar({"gender":"female","id":i});
            tempAvatars.push(maleAvatar, femaleAvatar)
        }
        setAvatars(tempAvatars)
    }

    useEffect(() => {
        generateAvatars();
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth});
        })
    },[])

    useEffect(() => {
        if(user) {
            setTestImage(user.image)
        }
    },[user])

    useEffect(() => {
        if(picker) {
            displayPicker();
        }
    },[picker])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease", opacity: pageOpacity}}>
            <div style={{height: dimentions.height/1.2, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div onClick={hidePicker} style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                    <img src={CloseIcon} style={{cursor: 'pointer', height: 20, width: 20, marginRight: '3%', marginTop: '2%'}} alt={'New Image'} />
                </div>
                <div style={{height: 145, width: 145, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-1%'}} alt={'New Image'}>
                    <img src={testImage} style={{height: 140, width: 140, borderRadius: 100}} />
                </div>
                <div style={{width: '50%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '2%'}} />
                <div style={{width: '80%', height: '50%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 8, marginTop: '1%', marginBottom: '-3%', overflowY: 'scroll', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gridGap: '3px', justifyContent: 'center', alignItems: 'center'}}>
                    {avatars.map((avatar, index) => {
                        return (
                            <AvatarCell key={index} avatar={avatar} onSelect={onSelect} selected={testImage.length > 0 ? testImage : user.image} />
                        )
                    })}
                </div>
                <Button action='UPDATE' onClick={updateImg} disabled={testImage === user.image} />
            </div>
        </div>
    )
}

export default ImagePicker