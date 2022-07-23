import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';

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
        },3000);
        setRaiseLevel(-100)
    }

    const displayAlertBox = (val) => {
        setTimeout(() => {
            hideAlertBox();
        },5000)
        setRaiseLevel(30);
    }

    useEffect(() => {
        if(error.length > 0) {
            displayAlertBox()
        }
    },[error])

    return (
        <div style={{position: 'absolute', bottom: raiseLevel, backgroundColor: '#d1001c', height: '8%', width: '55%', borderRadius: 5, transition: "all 0.3s ease", WebkitTransition: "all 0.3s ease", MozTransition: "all 0.3s ease",}}>
            <p style={{marginLeft: '5%', fontWeight: 'bold', fontSize: 17, color: 'white'}}>{error}</p>
        </div>
    )
}

export default AlertDialog;