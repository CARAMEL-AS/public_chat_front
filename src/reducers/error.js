import { USER_ERROR } from '../actions/user';

const initialData = ''

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'ERROR':
            return action.payload;
        case 'CLEAR_ERROR':
            return initialData;
        case 'USER_SIGN_OUT':
            return initialData;
        default:
            return state
    }
}

export default reducer;