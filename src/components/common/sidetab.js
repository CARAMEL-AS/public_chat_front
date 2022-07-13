import React, { useState, useEffect} from 'react';

const Sidetab = (props) => {

    const { title, icon, selection, tab } = props;
    const [selected, setSelected] = useState(null);
    const [tabWidth, setTabWidth] = useState(50);
    const [titleOpacity, setTitleOpacity] = useState(0);

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
        if(selected) {
            openTab()
        } else {
            closeTab()
        }
    },[selected])

    return(
        <div onClick={() => selection(title)} onMouseEnter={() => setSelected(title)} onMouseLeave={() => setSelected(null)} style={{
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
            }} src={icon}  alt='IMG'/>
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