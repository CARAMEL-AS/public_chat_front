import { API } from '../actions/api';

const initialData = process.env.REACT_APP_PROD

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case API:
            return action.payload
        default:
            return state
    }
}

export default reducer;