export const getWelcome = async () => {
    return await fetch(`${process.env.REACT_APP_API}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const getAuth = async (email, password) => {
    return await fetch(`${process.env.REACT_APP_TEST_URL}user?email=${email}&password_digest=${password}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const signup = async (email, password) => {
    return await fetch(`${process.env.REACT_APP_TEST_URL}user`, {
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
    return await fetch(`${process.env.REACT_APP_TEST_URL}message`, {
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
        console.warn('Message: ',data)
        return data
    })
    .catch(err => console.log('Error: ',err))
}