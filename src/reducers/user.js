import { USER_SIGN_IN, USER_SIGN_OUT, USER_ERROR, USER_SIGN_UP } from '../actions/user';

const initialData = {
    data: null,
    error: null
}

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case USER_SIGN_IN || USER_SIGN_UP:
            let userTempState = state;
            userTempState.data = action.payload;
            userTempState.error = null;
            return userTempState;
        case USER_ERROR:
            let tempState = state;
            tempState.data = null;
            tempState.error = action.payload;
            return tempState;
        case USER_SIGN_OUT:
            return initialData;
        default:
            return state
    }
}

export default reducer;