import React, { useEffect, useState } from 'react';

const InputField = (props) => {

    const { placeholder, type, onChangeText } = props;
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
        <div style={{height: dimensions.height/15, width: dimensions.width/5, marginTop: '4%', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input type={type} style={{height: '75%', width: '85%', fontSize: dimensions.width/120, fontWeight: '800', outline: 'none', borderRadius: 8, paddingLeft: '3%'}} placeholder={placeholder} onChange={(e) => onChangeText(e.target.value)}/>
        </div>
    )
}

export default InputField;