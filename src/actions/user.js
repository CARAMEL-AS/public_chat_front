import { getDatabase, ref, update } from "firebase/database";
import { getFbId } from '../helper/dataHandler';
import { useSelector } from 'react-redux';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_ERROR = 'USER_ERROR';
export const USER_SIGN_OUT = 'USER_SIGN_IN';
export const USER_SIGN_UP = 'USER_SIGN_UP';
export const USER_DELETE = 'USER_DELETE';
export const USER_VERIFIED = 'USER_VERIFIED';

const fbDelAccount = async (user, allFriends) => {
    let uDelAcc = {};
    const db = getDatabase();
    uDelAcc['/users/' + getFbId(user.id, allFriends)] = { ...user, online: false, delete: true };
    await update(ref(db), uDelAcc);
}

const fbAccountLogout = async (user, allFriends) => {
    let uLogout = {};
    const db = getDatabase();
    uLogout['/users/' + getFbId(user.id, allFriends)] = { ...user, online: false, delete: false };
    await update(ref(db), uLogout);
}

const fbAccountLogin = async (user, allFriends) => {
    let uLogin = {};
    const db = getDatabase();
    uLogin['/users/' + getFbId(user.id, allFriends)] = { ...user, online: true, delete: false };
    await update(ref(db), uLogin);
}

export const signUp = (user_id) => {
    return async (dispatch) => {
        try {
            return await fetch(`${useSelector(state => state.api)}user`, {
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
                if(!data?.error) {
                    dispatch({type: USER_SIGN_UP, payload: data})
                } else {
                    dispatch({type: USER_ERROR, payload: data?.error});
                }
            })
            .catch(err => {
                dispatch({type: USER_ERROR, payload: err});
            })
        } catch (err) {
            dispatch({type: USER_ERROR, payload: err});
        }
    }
}

export const signIn = (email, password, allFriends) => {
    return async (dispatch) => {
        try {
            console.log('URL: ',`${useSelector(state => state.api)}user?email=${email}&password_digest=${password}`)
            return await fetch(`${useSelector(state => state.api)}user?email=${email}&password_digest=${password}`)
            .then(res => res.json())
            .then(data => {
                if(!data?.error) {
                    fbAccountLogin(data, allFriends)
                    dispatch({type: USER_SIGN_IN, payload: data})
                } else {
                    throw data?.error
                }
            })
            .catch(err => {
                throw err
            })
        } catch (err) {
            throw err
        }
    }
}

export const signOut = (user_id, user, allFriends) => {
    return async (dispatch) => {
        try {
            return await fetch(`${useSelector(state => state.api)}user/${user_id}/signout`, {
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
                fbAccountLogout(user, allFriends)
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

export const deleteAcc = (user_id, user, allFriends) => {
    return async (dispatch) => {
        try {
            return await fetch(`${useSelector(state => state.api)}user/${user_id}`, {
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
                fbDelAccount(user, allFriends)
                dispatch({type: USER_DELETE, payload: data})
            })
            .catch(err => {
                dispatch({type: USER_ERROR, payload: err});
            })
        } catch (err) {
            dispatch({type: USER_ERROR, payload: err});
        }
    }
}