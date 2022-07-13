export const handleUsersList = (obj) => {
    let newArr = []
    for(let key in obj) {
        newArr.push(obj[key])
    }
    return newArr
}

export const findUser = (arr, id) => {
    const user = arr.filter(user => user?.id === id )
    return user.length > 0 ? user[0].username : 'Anonymous'
}

export const myMessages = (messages, id) => {
    let myMessages = []
    for(let mess in messages) {
        if(messages[mess].user_id === id) {
            myMessages.push(messages[mess])
        }
    }
    return myMessages;
}

export const getFbId = (myId, allUsers) => {
    let fbId = '';
    for(let userId in allUsers) {
        if(allUsers[userId].id === myId) {
            fbId = userId;
            break;
        }
    }
    return fbId;
}