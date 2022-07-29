import React, { useState, useEffect } from 'react';
import sendIcon from '../../assets/sendIcon.png';

const GifCell = (props) => {

    const { gif }  = props;
    const [displaySend, setDisplaySend] = useState(0);

    const mouseEnter = () => {
        setDisplaySend(1);
    }

    const mouseLeave = () => {
        setDisplaySend(0);
    }

    useEffect(() => {},[])

    return (
        <img onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{height: '95%', width: '100%', marginTop: '0.4%', marginLeft: '1%', marginRight: '1%', borderRadius: 8}} src={gif.embed_url} />
    )

}

export default GifCell;