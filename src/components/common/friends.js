import React, { useState, useEffect } from 'react';
import FriendCell from '../common/friendCell';

const Friends = (props) => {

    const { all, user } = props;

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowY: 'scroll', flexDirection: 'column'}}>
            {all.map((friend, index) => {
                return <FriendCell friend={friend} index={index} user={user} />
            })}
        </div>
    )
}

export default Friends;