import toonavatar from 'cartoon-avatar';
import axios from 'axios';

export const getWelcome = async () => {
    return await axios.get(`${process.env.REACT_APP_API}`)
    .then(data => { return data })
    .catch(err => { return err })
}

export const singIn = async (email, password, method, api, name = '', photo = toonavatar.generate_avatar()) => {
    return await axios.get(`${api}user?email=${email}&password_digest=${password}&name=${name}&image=${photo}&method=${method}`)
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const signup = async (email, password, image, api) => {
    return await axios.post(`${api}user`,{
        email,
        password_digest: password,
        image
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const createGroup = async (user_id, newForm, api) => {
    return await axios.post(`${api}group/new`,{
        user_id,
        name: newForm.name,
        friends: newForm.friends
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const sendMessage = async (user_id, message, group_id, api) => {
    return await axios.post(`${api}message`, {
        user_id,
        group_id,
        message
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const updateUserName = async (user_id, username, api) => {
    return await axios.patch(`${api}user/${user_id}`, {
        user_id,
        username
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const updateImage = async (user_id, image, api) => {
    return await axios.post(`${api}user/${user_id}/update/profilePic`, {
        user_id,
        image
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const apologies = async (user_id, api) => {
    return await axios.post(`${api}clear/warning`, {
        user_id
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const uSignout = async (user_id, api) => {
    return await axios.post(`${api}user/${user_id}/signout`, {
        id: user_id
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const deleteAccount = async (user_id, api) => {
    return await axios.post(`${api}user/${user_id}`, {
        id: user_id
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const verifyAcc = async (user_id, code, api) => {
    return await axios.post(`${api}/user/${user_id}/verify`, {
        user_id,
        code
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const updateLang = async (user_id, language, api) => {
    return await axios.post(`${api}setting/update/${user_id}/lang`, {
        user_id,
        language
    })
    .then(data => {
        return data?.data || data.response.data?.error
    })
    .catch(err => {
        return err.response.data?.error
    })
}

export const translate = async (locale, q) => {
    return await axios.post(`${process.env.REACT_APP_translate_URI}key=${process.env.REACT_APP_GOOGLE_API}`, {
        q,
        source: locale.prev,
        target: locale.current,
        format: 'text'
    })
    .then(data => {
        return data?.data.data.translations[0].translatedText || data.response.data.error
    })
    .catch(err => {
        return err.response.data.error
    })
}

