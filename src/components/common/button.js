import React, { useState, useEffect } from 'react';

const Button = (props) => {

    const { disabled, action, onClick } = props;
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[])

    return (
        <div onClick={onClick} disabled={disabled} style={{height: dimensions.height/14, width: dimensions.width/4.9, marginTop: '6%', borderRadius: '8px', justifyContent: 'center', alignItems: 'center', display: 'flex', backgroundColor: disabled ? 'rgba(0,0,0,0.3)' : 'red', cursor: 'pointer'}}>
            <p style={{fontSize: dimensions.width/110, fontWeight: 'bold', color: 'white'}}>{action}</p>
        </div>
    )
}

export default Button;