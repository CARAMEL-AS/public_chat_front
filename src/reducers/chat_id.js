const initialData = null

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'SELECT_CHAT':
            return action.payload
        case 'USER_SIGN_OUT':
            return initialData;
        default:
            return state
    }
}

export default reducer;