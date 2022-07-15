export const getWelcome = async () => {
    return await fetch(`${process.env.REACT_APP_API}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const getAuth = async (email, password) => {
    return await fetch(`${process.env.REACT_APP_API}user?email=${email}&password_digest=${password}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const signup = async (email, password) => {
    return await fetch(`${process.env.REACT_APP_API}user`, {
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
    .then(data => {
        console.warn('Sign Up Data: ',data)
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const sendMessage = async (user_id, message) => {
    return await fetch(`${process.env.REACT_APP_API}message`, {
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

export const updateUserName = async (user_id, username) => {
    return await fetch(`${process.env.REACT_APP_API}/user/${user_id}`, {
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

export const apologies = async (user_id) => {
    return await fetch(`${process.env.REACT_APP_API}clear/warning`, {
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

export const uSignout = async (user_id) => {
    return await fetch(`${process.env.REACT_APP_API}user/${user_id}/signout`, {
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

export const deleteAccount = async (user_id) => {
    return await fetch(`${process.env.REACT_APP_API}user/${user_id}`, {
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