import { FRIENDS, FRIENDS_ERROR } from '../actions/friends';

const initialData = []

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case FRIENDS:
            return action.payload
        case FRIENDS_ERROR:
            return initialData
        default:
            return state
    }
}

export default reducer;