import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Button from './button';

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

    const hidePicker = () => {

    }

    const displayPicker = async () => {
        await setPageOpacity(1);
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
                
            </div>
        </div>
    )
}

export default Language