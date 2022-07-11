export const handleUsersList = (obj) => {
    let newArr = []
    for(let key in obj) {
        newArr.push(obj[key])
    }
    return newArr
}

export const findUser = (arr, id) => {
    const user = arr.filter(user => user?.id === id)
    return user.length > 0 ? user.username : 'Anonymous'
}