import React from 'react';

const AvatarCell = (props) => {

    const { avatar, onSelect } = props;

    return (
        <div onClick={() => onSelect(avatar)} style={{height: 70, width: 70, borderRadius: 100, marginLeft: '1%', marginRight: '1%', marginTop: '1%', marginBottom: '1%', cursor: 'pointer'}}>
            <img src={avatar} style={{height: 68, width: 68, borderRadius: 100}} />
        </div>
    )
}

export default AvatarCell;