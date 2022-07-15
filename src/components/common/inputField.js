import React, { useEffect, useState } from 'react';

const InputField = (props) => {

    const { placeholder, type, onChangeText} = props;
    const [dimensions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[])

    return (
        <div style={{height: dimensions.height/15, width: dimensions.width/5, marginTop: '4%', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none'}}>
            <input type={type} style={{height: '85%', width: '99%', fontSize: dimensions.width/100, fontWeight: 'bold', outline: 'none', borderRadius: 8, border: '2px solid #28C3D2'}} placeholder={placeholder} onChange={(e) => onChangeText(e.target.value)}/>
        </div>
    )
}

export default InputField;