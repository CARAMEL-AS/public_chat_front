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

export const signup = async (email, password, image, api) => {
    return await fetch(`${api}user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password_digest: password,
            image
        })
    })
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const createGroup = async (user_id, newForm, api) => {
    return await fetch(`${api}group/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            name: newForm.name,
            friends: newForm.friends
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        return data
    })
    .catch(err => console.log('Error: ',err))
}

export const sendMessage = async (user_id, message, group_id, api) => {
    return await fetch(`${api}message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            group_id,
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
    return await fetch(`${api}user/${user_id}`, {
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

export const updateImage = async (user_id, image, api) => {
    return await fetch(`${api}user/${user_id}/update/profilePic`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            image
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

export const updateLang = async (user_id, language, api) => {
    return await fetch(`${api}setting/update/${user_id}/lang`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            language
          })
    })
    .then(res => { return res.json() })
    .then(resp => {
        return resp
    })
    .catch(err => console.log('Error: ',err))
}

export const translate = async (locale, q) => {
    console.log('Message: ',q);
    console.log('Locale: ',locale)
    return await fetch(`${process.env.REACT_APP_translate_URI}key=${process.env.REACT_APP_GOOGLE_API}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q,
            source: locale.prev,
            target: locale.current,
            format: 'text'
          })
    })
    .then(res => { return res.json() })
    .then(resp => {
        return resp.data.translations[0].translatedText
    })
    .catch(err => console.log('Error: ',err))
}

