import React, { useEffect } from 'react';
import FriendCell from '../common/friendCell';

const Friends = (props) => {

    const { all, user } = props;

    useEffect(() => {},[all])

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowY: 'scroll', flexDirection: 'column'}}>
            {all.map((friend, index) => {
                return <FriendCell key={index} friend={friend} index={index} user={user} />
            })}
        </div>
    )
}

export default Friends;