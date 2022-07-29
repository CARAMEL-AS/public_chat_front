import { translate } from './api';

export const handleUsersList = (obj) => {
    let newArr = []
    for(let key in obj) {
        newArr.push({...obj[key], fbId: key})
    }
    return newArr
}

export const getUserImage = (friends, id) => {
    return friends && friends.length > 0 ? friends.filter(friend => friend.id === id)[0].image : '';
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
            fbId = allUsers[userId].fbId;
            break;
        }
    }
    return fbId;
}

const objectToArray = (messages) => {
    let arr = [];
    for(let messageFbId in messages) {
        arr.push(messages[messageFbId])
    }
    return arr;
}

export const bubbleSort = (a, b) => {
    return new Date(a.created_at) > new Date(b.created_at)
}

export const sortMessages = (messages) => {
    const mess = objectToArray(messages);
    for(let i = 0; i < mess.length; i++) {
        for(let o = 0; o < mess.length; o++) {
            if((o + 1) < mess.length) {
                const res = bubbleSort(mess[o], mess[o+1])
                if(res) {
                    const backup = mess[o]
                    mess[o] = mess[o+1]
                    mess[o+1] = backup
                }
          }
        }
    }
    return mess;
}

export const collectMembers = (id, allFriends) => {
    return allFriends.filter(friend => friend.id === id);
}

export const checkIfChatExists = (friendId, chats) => {
    return chats.filter(chat => chat.admin === friendId || chat.members === friendId)
}

export const getLocaleName = (locale, languages) => {
    let name = '';
    for(let key in languages) {
        if(languages[key] === locale) {
            name = key;
            break;
        }
    }
    return name;
}

export const translateMessages = async (locale, message) => {
    return !message.includes('GIF: ') ? await translate(locale, message) || message : message;
}

export const translateContent = async (locale, data) => {
    let translatedMessages = [];
    for(let key in data) {
        const info = data[key];
        translatedMessages.push({...info, message: locale.prev === locale.current ? info.message : await translateMessages(locale, info.message)});
    }
    return translatedMessages;
}