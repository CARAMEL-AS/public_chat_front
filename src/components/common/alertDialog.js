import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import CloseIcon from '../../assets/close.png';

const AlertDialog = () => {
    
    const dispatch = useDispatch();
    const [raiseLevel, setRaiseLevel] = useState(-100);
    const error = useSelector(state => state.error);

    const clearError = async () => {
        await dispatch({type: 'CLEAR_ERROR' })
    }

    const hideAlertBox = async () => {
        setTimeout(() => {
            clearError();
        },500);
        setRaiseLevel(-100)
    }

    const displayAlertBox = (val) => {
        setTimeout(() => {
            hideAlertBox();
        },3000)
        setRaiseLevel(30);
    }

    useEffect(() => {
        if(error.length > 0) {
            setTimeout(() => {
                displayAlertBox()
            },300)
        }
    },[error])

    return (
        <div style={{position: 'absolute', bottom: raiseLevel, backgroundColor: '#d1001c', height: '8%', width: '55%', borderRadius: 5, transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <p style={{marginLeft: '5%', fontWeight: 'bold', fontSize: 17, color: 'white', width: '89%'}}>{error}</p>
            <div onClick={hideAlertBox} style={{cursor: 'pointer'}}>
                <img style={{height: 20, width: 20}} src={CloseIcon} />
            </div>
        </div>
    )
}

export default AlertDialog;