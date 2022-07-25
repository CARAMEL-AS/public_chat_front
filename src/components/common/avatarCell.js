import React from 'react';

const AvatarCell = (props) => {

    const { avatar, onSelect, selected } = props;

    return (
        <div style={{height: 90, width: 90, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div onClick={() => onSelect(avatar)} style={{height: 70, width: 70, borderRadius: 100, backgroundColor: selected === avatar ? 'blue' : 'rgba(0,0,0,0)', margin: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                <img src={avatar} style={{height: 68, width: 68, borderRadius: 100}} />
            </div>
        </div>
    )
}

export default AvatarCell;