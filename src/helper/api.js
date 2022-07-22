export const getWelcome = async () => {
    return await fetch(`${process.env.REACT_APP_API}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const getAuth = async (email, password, api) => {
    return await fetch(`${api}user?email=${email}&password_digest=${password}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const signup = async (email, password, api) => {
    return await fetch(`${api}user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password_digest: password
        })
    })
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const sendMessage = async (user_id, message, api) => {
    return await fetch(`${api}message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            message
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const updateUserName = async (user_id, username, api) => {
    return await fetch(`${api}/user/${user_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            username
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const apologies = async (user_id, api) => {
    return await fetch(`${api}clear/warning`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        console.warn('Apologies Resp: ',data)
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const uSignout = async (user_id, api) => {
    return await fetch(`${api}user/${user_id}/signout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: user_id
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        console.warn('Logout Resp: ',data)
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const deleteAccount = async (user_id, api) => {
    return await fetch(`${api}user/${user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: user_id
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        console.warn('delete account: ',data)
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const verifyAcc = async (user_id, code, api) => {
    return await fetch(`${api}/user/${user_id}/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            code
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        console.warn('delete account: ',data)
        return data
    })
    .catch(err => console.log('Error: ',err))
}

