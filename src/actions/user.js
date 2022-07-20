export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_ERROR = 'USER_ERROR';
export const USER_SIGN_OUT = 'USER_SIGN_IN';
export const USER_SIGN_UP = 'USER_SIGN_UP';

export const signup = (user_id) => {
    return async (dispatch) => {
        try {
            return await fetch(`${process.env.REACT_APP_API}user`, {
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
                dispatch({type: USER_SIGN_UP, payload: data})
            })
            .catch(err => {
                dispatch({type: USER_ERROR, payload: err});
            })
        } catch (err) {
            dispatch({type: USER_ERROR, payload: err});
        }
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        try {
            return await fetch(`${process.env.REACT_APP_API}user?email=${email}&password_digest=${password}`)
            .then(res => res.json())
            .then(data => {
                dispatch({type: USER_SIGN_IN, payload: data})
            })
            .catch(err => {
                dispatch({type: USER_ERROR, payload: err})
            })
        } catch (err) {
            dispatch({type: USER_ERROR, payload: err})
        }
    }
}

export const signOut = (user_id) => {
    return async (dispatch) => {
        try {
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
                dispatch({type: USER_SIGN_OUT, payload: data})
            })
            .catch(err => {
                dispatch({type: USER_ERROR, payload: err});
            })
        } catch (err) {
            dispatch({type: USER_ERROR, payload: err});
        }
    }
}