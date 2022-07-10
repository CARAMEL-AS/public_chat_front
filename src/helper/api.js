export const getWelcome = async () => {
    return await fetch(`${process.env.REACT_APP_API}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}

export const getAuth = async () => {
    return await fetch(`${process.env.REACT_APP_API}`)
    .then(res => { return res.json() })
    .then(data => { return data })
    .catch(err => console.log('Error: ',err))
}