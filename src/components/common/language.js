import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import supportedLangs from '../../resources/supportedLangs.json';
import { updateLang } from '../../helper/api';
import CloseIcon from '../../assets/close.png';

const Language = () => {
    
    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const languagePicker = useSelector(state => state.languagePicker);
    const [pageOpacity, setPageOpacity] = useState(0);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const hidePicker = async () => {
        setTimeout( async () => {
            await dispatch({type: 'CLOSE_LANGUAGE_PICKER'})
        },300)
        await setPageOpacity(0);
    }

    const displayPicker = async () => {
        await setPageOpacity(1);
    }

    const selectLanguage = async (language) => {
        try {
            const resp = await updateLang(user.id, language, api);
            if(!resp.error) {
                await dispatch({type: 'CHANGE_LANGUAGE', payload: language});
                await dispatch({type: 'USER_UPDATE_LANGUAGE', payload: language});
                hidePicker();
            } else {
                await dispatch({type: 'ERROR', payload: resp});
            }
        } catch (err) {
            await dispatch({type: 'ERROR', payload: 'Opps! Failed to connect to server.'});
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
        if(languagePicker) {
            displayPicker();
        }
    },[languagePicker])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease", opacity: pageOpacity}}>
            <div style={{height: dimentions.height/1.5, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div onClick={hidePicker} style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                    <img src={CloseIcon} style={{cursor: 'pointer', height: 20, width: 20, marginRight: '3%', marginTop: '2%'}} alt={'Language Image'} />
                </div>
                <p style={{fontSize: 16, fontWeight: '500', color: 'rgba(0,0,0,0.6)', marginTop: '-1%', marginBottom: 0}}>Select your <strong style={{color: 'green'}}>preferred</strong> language!</p>
                <p style={{fontSize: 12, color: 'rgba(0,0,0,0.4)', marginBottom: '1%', marginTop: 0}}>Only messages will be translated!</p>
                <div style={{height: '75%', width: '90%', overflowY: 'scroll', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)', padding: '2%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gridGap: '12px'}}>
                    {Object.keys(supportedLangs).map((key, index) => {
                        return (
                            <div onClick={() => selectLanguage(key)} key={index} style={{borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.6)', marginLeft: '1%', marginRight: '1%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <p style={{fontSize: 13, fontWeight: '500', color: 'rgba(0,0,0,0.6)', paddingTop: '1%', paddingBottom: '1%', paddingLeft: '1%', paddingRight: '1%'}}>{key}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Language