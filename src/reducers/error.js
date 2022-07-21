import { USER_ERROR } from '../actions/user';

const initialData = {
    type: null,
    error: null
}

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case USER_ERROR:
            return {
                type: 'USER',
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer;