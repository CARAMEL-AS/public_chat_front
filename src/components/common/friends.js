import React, { useState, useEffect } from 'react';
import FriendCell from '../common/friendCell';

const Friends = (props) => {

    const { all } = props;

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowY: 'scroll', flexDirection: 'column'}}>
            {all.map((friend, index) => {
                return <FriendCell friend={friend} index={index} />
            })}
        </div>
    )
}

export default Friends;