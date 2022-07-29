import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Sidetab = (props) => {

    const { title, icon } = props;
    const dispatch = useDispatch();
    const hoverTab = useSelector(state => state.hoverTab);
    const [tabWidth, setTabWidth] = useState(50);
    const [titleOpacity, setTitleOpacity] = useState(0);

    const tabPressHandler = async () => {
        await dispatch({type: 'SELECT_TAB', payload: title});
    }

    const enterTab = async () => {
        dispatch({type: 'HOVER_TAB', payload: title});
    }

    const leaveTab = async () => {
        dispatch({type: 'HOVER_TAB', payload: ''});
    }

    const closeTab = () => {
        setTimeout(() => {
            setTabWidth(50)
        },100)
        setTitleOpacity(0)
    }

    const openTab = () => {
        setTimeout(() => {
            setTitleOpacity(1)
        },100)
        setTabWidth(100)
    }

    useEffect(() => {
        if(hoverTab === title) {
            openTab()
        } else {
            closeTab()
        }
    },[hoverTab])

    return(
        <div onClick={tabPressHandler} onMouseEnter={enterTab} onMouseLeave={leaveTab} style={{
            width: tabWidth,
            height: '5%',
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            marginTop: '8%',
            paddingRight: '5%',
            borderRadius: 7,
            cursor: 'pointer',
            background: "linear-gradient(to right, #355C7D, #6C5B7B, #C06C84)",
            transition: "all 0.3s ease",
            WebkitTransition: "all 0.3s ease",
            MozTransition: "all 0.3s ease",
        }}>
            <img style={{
                height: 30,
                width: 30,
                marginRight: '3.5%',
                marginLeft: '4%',
            }} src={icon}  alt='Icon'/>
            <p style={{
                fontSize: 15,
                fontWeight: 'bold',
                opacity: titleOpacity,
                color: 'white',
                transition: "all 0.3s ease",
                WebkitTransition: "all 0.3s ease",
                MozTransition: "all 0.3s ease",
            }}>{title}</p>
        </div>
    )
}

export default Sidetab;