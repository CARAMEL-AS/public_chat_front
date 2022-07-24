import React, { useState, useEffect } from 'react';

const FriendSelection = (props) => {

    const { friend, index, select, last } = props;
    const [checked, setChecked] = useState(false);

    const onSelectionChange = () => {
        select(friend.id, !checked)
        setChecked(!checked)
    }

    return (
        <div style={{width: '100%', height: '18%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: index === 0 ? '1.5%' : 0}}>
            <div style={{width: '100%', height: '97%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <p style={{width: '80%', fontSize: 16, fontWeight: '800', color: 'rgba(0,0,0,0.6)'}}>{friend.username}</p>
                <input value={checked} type="checkbox" style={{width: 20, height: 20}} onChange={onSelectionChange} />
            </div>
            {!last && <div style={{width: '80%', border: '0.5px solid rgba(0,0,0,0.1)'}} />}
        </div>
    )
}

export default FriendSelection;