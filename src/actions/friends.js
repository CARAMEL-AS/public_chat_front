import { getDatabase, ref, onValue } from "firebase/database";
import { handleUsersList } from '../helper/dataHandler';

export const FRIENDS = 'FRIENDS';
export const FRIENDS_ERROR = 'FRIENDS_ERROR';

export const setFriends = () => {
    return async (dispatch) => {
        const db = getDatabase();
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            if(snapshot) {
                dispatch({type: 'FRIENDS', payload: handleUsersList(snapshot.val())})
            }
        });
    }
}

export const friendsError = (err) => {
    return async (dispatch) => {
        dispatch({type: FRIENDS_ERROR, payload: err})
    }
}