import { USER_SIGN_IN, USER_SIGN_OUT, USER_SIGN_UP, USER_DELETE } from '../actions/user';

const initialData = null;

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case USER_SIGN_IN || USER_SIGN_UP:
            return action.payload;
        case USER_SIGN_OUT || USER_DELETE:
            return initialData;
        default:
            return state
    }
}

export default reducer;